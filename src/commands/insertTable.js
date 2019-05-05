import { Block, Text } from 'slate'
import { blockTypes } from '../fixtures'
import { List } from 'immutable'

const insertTable = (editor) => {
  editor.insertBlock(
    Block.create({
      type: blockTypes.TABLE,
      nodes: List([
        Block.create({
          type: blockTypes.TABLE_ROW,
          nodes: List([
            Block.create({
              type: blockTypes.TABLE_CELL,
              nodes: List([Text.create({ text: '1' })])
            }),
            Block.create({
              type: blockTypes.TABLE_CELL,
              nodes: List([Text.create({ text: '2' })])
            }),
            Block.create({
              type: blockTypes.TABLE_CELL,
              nodes: List([Text.create({ text: '3' })])
            })
          ])
        })
      ])
    })
  )
}

export default insertTable
