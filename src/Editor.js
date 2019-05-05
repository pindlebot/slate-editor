import { Editor, getEventTransfer } from 'slate-react'
import { Value, Block, Text } from 'slate'
import { List } from 'immutable'
import React from 'react'
import initialValue from './value.json'
import { isKeyHotkey } from 'is-hotkey'
import './styles.scss'
import { blockTypes, markTypes } from './fixtures'
import getType from './utils/getType'
import renderNode from './render/renderNode'
import renderMark from './render/renderMark'
import decorateNode from './decorators/decorateNode'
import Toolbar from './components/Toolbar'
import schema from './schema'
import Serializer from 'slate-html-serializer'
import * as embed from './utils/embed'
import rules from './rules'
import DropzoneModal from './components/DropzoneModal'
import config from './config'
import 's3-dropzone/lib/styles.css'

const serializer = new Serializer({ rules })

const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

const awsConfig = {
  identityPoolId: config.IDENTITY_POOL_ID,
  region: config.AWS_REGION,
  bucketName: config.AWS_BUCKET_NAME,
  endpoint: config.AWS_BUCKET_URL + '/'
}

class RichTextExample extends React.Component {

  state = {
    value: Value.fromJSON(initialValue),
    dropzone: {
      open: false
    }
  }

  ref = editor => {
    this.editor = editor
  }

  openDropzone = () => {
    this.setState({ dropzone: { open: true } })
  }

  closeDropzone = () => {
    this.setState({ dropzone: { open: false } })
  }

  onChange = ({ value }) => {
    console.log(value.toJS())
    // let html = serializer.serialize(value)
    // console.log(html)
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = markTypes.BOLD
    } else if (isItalicHotkey(event)) {
      mark = markTypes.ITALIC
    } else if (isUnderlinedHotkey(event)) {
      mark = markTypes.UNDERLINE
    } else if (isCodeHotkey(event)) {
      mark = markTypes.CODE
    } else {
      switch (event.key) {
        case ' ':
          return this.onSpace(event, editor, next)
        case 'Backspace':
          return this.onBackspace(event, editor, next)
        case 'Enter':
          return this.onEnter(event, editor, next)
        case 'Tab':
          return this.onTab(event, editor, next)
        default:
          return next()
      }
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  onTab = (event, editor, next) => {
    const { value } = editor
    const { startBlock, selection } = value
    if (startBlock.type === blockTypes.CODE_LINE) {
      event.preventDefault()
      const text = startBlock.getTexts().toArray().flatMap(t => t.text.split('\n'))
        .map(text => `  ${text}`)

      editor
        .insertText(text.join('\n'))
        .select({
          anchor: {
            key: selection.anchor.key,
            offset: selection.anchor.offset
          },
          focus: {
            key: selection.focus.key,
            offset: selection.focus.offset + 2
          }
        })
    }

    if (startBlock.type === blockTypes.TABLE_CELL) {
      event.preventDefault()
      editor.insertBlock(
        Block.create({
          type: blockTypes.TABLE_CELL,
          nodes: List([Text.create()])
        })
      )
    }
  }

  onSpace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.isExpanded) return next()

    const { startBlock } = value
    const { start } = selection
    const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
    const type = getType(chars)
    if (!type) return next()
    if (type === blockTypes.LI && startBlock.type === blockTypes.LI) return next()
    event.preventDefault()

    if (type === blockTypes.BLOCKQUOTE) {
      return editor
        .insertBlock(Block.create({
          type: blockTypes.BLOCKQUOTE,
          nodes: List([
            Block.create({
              type: blockTypes.UNSTYLED,
              nodes: List([Text.create()])
            })
          ])
        }))
        .removeNodeByKey(startBlock.key)
    }

    if (type === blockTypes.LI) {
      return editor.insertBlock(
        Block.create({
          type: blockTypes.UL,
          nodes: List([
            Block.create({
              type: blockTypes.LI,
              nodes: List([Text.create()])
            })
          ])
        })
      ).removeNodeByKey(startBlock.key)
    }

    // if (type === blockTypes.LI) {
    //   editor.wrapBlock(blockTypes.UL)
    // }

    editor.setBlocks(type).moveFocusToStartOfNode(startBlock).delete()
  }

  onBackspace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.isExpanded) return next()
    if (selection.start.offset !== 0) return next()

    const { startBlock } = value
    const startParent = value.document.getParent(startBlock.key)
    const prevSibling = value.document.getPreviousBlock(startBlock.key)
    const nextSibling = value.document.getNextBlock(startBlock.key)
    const isBlockquote = startParent && startParent.type === blockTypes.BLOCKQUOTE

    if (isBlockquote && startParent.nodes.size === 1) {
      return this.unwrapBlock(event, editor)
    }
    if (
      (startBlock.type === blockTypes.UNSTYLED) ||
      (nextSibling && startParent.object !== 'document' && startBlock.type === nextSibling.type)
    ) {
      return next()
    }

    this.unwrapBlock(event, editor)
  }

  unwrapBlock = (event, editor) => {
    const startParent = editor.value.document.getParent(editor.value.startBlock.key)

    event.preventDefault()
    editor.setBlocks(blockTypes.UNSTYLED)

    if (startParent && startParent.object !== 'document') {
      editor.unwrapBlock(startParent.type)
    }
  }

  onEnter = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    const { start, end, isExpanded } = selection
    if (isExpanded) return next()

    const { startBlock } = value
    if (startBlock.type === blockTypes.CODE_LINE) {
      return editor.insertText('\n')
    }

    if (startBlock.type === blockTypes.TABLE_CELL) {
      const parentBlock = value.document.getParent(startBlock.key)
      const table = value.document.getParent(parentBlock.key)
      const text = Text.create({ text: '3' })
      const block = Block.create({
        type: blockTypes.TABLE_ROW,
        nodes: List([
          Block.create({
            type: blockTypes.TABLE_CELL,
            nodes: List([text])
          })
        ])
      })

      return editor
        .insertNodeByKey(table.key, table.nodes.size, block)
        .moveToEndOfNode(text)
    }

    if (start.offset === 0 && startBlock.text.length === 0) {
      const nextSibling = value.document.getNextBlock(startBlock.key)
      if (nextSibling && startBlock.type === nextSibling.type) return next()

      return this.onBackspace(event, editor, next)
    }
    if (end.offset !== startBlock.text.length) return next()

    if (
      startBlock.type !== blockTypes.H1 &&
      startBlock.type !== blockTypes.H2 &&
      startBlock.type !== blockTypes.H3
    ) {
      return next()
    }

    event.preventDefault()
    editor.splitBlock().setBlocks(blockTypes.UNSTYLED)
  }

  onPaste = (event, editor, next) => {
    const transfer = getEventTransfer(event)
    if (transfer.type === 'html') {
      const { document } = serializer.deserialize(transfer.html)
      editor.insertFragment(document)
    }
    const attributes = embed.handleHtml(transfer.text)
    const type = embed.getType(attributes)
    editor.insertBlock(
      Block.create({
        type: type,
        data: attributes
      })
    )
  }

  render () {
    return (
      <div style={{ display: 'flex' }}>
        <DropzoneModal
          insertImage={() => {}}
          deleteImage={() => {}}
          config={awsConfig}
          images={[]}
          open={this.state.dropzone.open}
        />
        <Toolbar
          editor={this.editor}
          value={this.state.value}
          openDropzone={this.openDropzone}
          closeDropzone={this.closeDropzone}
          dropzone={this.state.dropzone}
        />
        <div className={'editor'}>
          <Editor
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={renderNode}
            renderMark={renderMark}
            schema={schema}
            decorateNode={decorateNode}
            onPaste={this.onPaste}
          />
        </div>
      </div>
    )
  }
}

/**
 * Export.
 */

export default RichTextExample