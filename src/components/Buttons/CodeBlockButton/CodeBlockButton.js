import React from 'react'
import PropTypes from 'prop-types'
import { blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import CodeBlockIcon from '../../Icons/CodeBlockIcon'
import { List } from 'immutable'
import { Block, Text } from 'slate'

class CodeBlockButton extends React.Component {
  handleClick = (evt) => {
    evt.preventDefault()
    const { editor } = this.props
    const block = Block.create({
      type: blockTypes.CODE,
      nodes: List([
        Block.create({
          type: blockTypes.CODE_LINE,
          nodes: List([
            Text.create()
          ])
        })
      ])
    })

    editor.insertBlock(block)
  }

  render () {
    const { editor } = this.props
    if (!editor) return false
    console.log(editor.value.startBlock)
    const { value: { startBlock } } = editor
    return (
      <ToolbarButton onMouseDown={this.handleClick} active={startBlock && startBlock.type === blockTypes.CODE_LINE}>
        <CodeBlockIcon />
      </ToolbarButton>
    )
  }
}

export default CodeBlockButton
