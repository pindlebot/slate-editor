import { Block, Text } from 'slate'
import { blockTypes } from '../fixtures'
import { List } from 'immutable'

const insertBlockquote = (editor) => {
  const block = Block.create({
    type: blockTypes.BLOCKQUOTE,
    nodes: List([
      Block.create({
        type: blockTypes.UNSTYLED,
        nodes: List([
          Text.create()
        ])
      })
    ])
  })

  editor.insertBlock(block)
}

export default insertBlockquote
