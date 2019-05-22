import { Block, Mark, Node, Value } from 'slate'
import { Set } from 'immutable'
import { blockTypes } from '../fixtures'

export const mapping = {
  'unstyled': 'paragraph',
  'ordered-list-item': 'list-item',
  'unordered-list-item': 'list-item',
  'header-one': 'header-one',
  'header-two': 'header-two',
  'header-three': 'header-three',
  'header-four': 'header-four',
  'header-five': 'header-five',
  'header-six': 'header-six',
  'code-block': 'code-block',
  'blockquote': 'blockquote',
  'atomic': 'image',
  'atomic:image': 'image',
  'atomic:video': 'video'
}

const decodeInlineStyleRanges = (block, ranges) => {
  let leaves = []
  let index = 0
  if (!ranges.length) {
    leaves.push({
      object: 'leaf',
      text: block.text,
      marks: []
    })
    return leaves
  }

  while (index < ranges.length) {
    let range = ranges[index]
    if (!index) {
      leaves.push({
        object: 'leaf',
        text: block.text.substring(0, range.offset),
        marks: []
      })
    }

    leaves.push({
      object: 'leaf',
      text: block.text.substring(range.offset, range.offset + range.length),
      marks: [{
        data: {},
        object: 'mark',
        type: range.style.toLowerCase()
      }]
    })

    const offset = index < ranges.length - 1
      ? ranges[index + 1].offset
      : block.text.length

    if (range.offset + range.length < offset) {
      leaves.push({
        object: 'leaf',
        text: block.text.substring(range.offset + range.length, offset),
        marks: []
      })
    }

    index++
  }

  return leaves
}

const serialize = (raw) => {
  const { blocks, entityRanges } = raw
  let index = 0
  const acc = []
  while (index < blocks.length) {
    let block = blocks[index]
    index++

    const prevBlock = index && blocks[index - 1]
    const inlineStyleRanges = block.inlineStyleRanges || []
    
    const slateBlock = {
      type: mapping[block.type] || mapping.unstyled,
      object: 'block',
      data: {},
      nodes: [
        {
          object: 'text',
          leaves: [
            {
              text: block.text
            }
          ]
        }
      ]
    }
    if (prevBlock.type === 'blockquote') {

    }
  }
}
