import { Block } from 'slate'
import { blockTypes } from './fixtures'

const schema = {
  document: {
    last: { type: blockTypes.UNSTYLED },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create(blockTypes.UNSTYLED)
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
  blocks: {
    [blockTypes.UNSTYLED]: {
      nodes: [{
        match: [{ object: 'text' }, { type: 'link' }]
      }]
    },
    [blockTypes.TABLE]: {
      nodes: [{
        match: [{ type: blockTypes.TABLE_ROW }],
        min: 1
      }],
      parent: { object: 'document' },
      normalize: (editor, { code, node, child }) => {
        switch (code) {
          case 'child_type_invalid':
            return editor
              .removeNodeByKey(node.key)
        }
      }
    },
    [blockTypes.TABLE_ROW]: {
      nodes: [{
        match: { type: blockTypes.TABLE_CELL },
        min: 1
      }],
      parent: { type: blockTypes.TABLE },
      normalize: (editor, { code, node, child }) => {
        switch (code) {
          case 'child_type_invalid':
            return editor
              .removeNodeByKey(node.key)
        }
      }
    },
    [blockTypes.TABLE_CELL]: {
      nodes: [{
        match: { object: 'text' }
      }],
      paraent: { type: blockTypes.TABLE_ROW }
    },
    [blockTypes.CODE_LINE]: {
      nodes: [{ match: { object: 'text' } }],
      min: 1,
      max: 1
    },
    [blockTypes.CODE]: {
      nodes: [{
        match: [{ type: blockTypes.CODE_LINE }],
        min: 1,
        max: 1
      }],
      normalize: (editor, { code, node, child }) => {
        switch (code) {
          case 'child_type_invalid':
            return editor
              .removeNodeByKey(node.key)
        }
      }
    },
    [blockTypes.LI]: {
      parent: [{ type: blockTypes.UL }, { type: blockTypes.OL }]
    },
    [blockTypes.OL]: {
      nodes: [{ match: [{ type: blockTypes.LI }, { object: 'text' }] }]
    },
    [blockTypes.UL]: {
      nodes: [{ match: [{ type: blockTypes.LI }, { object: 'text' }] }]
    },
    [blockTypes.IMAGE]: {
      isVoid: true,
    },
    [blockTypes.GIST]: {
      isVoid: true,
    },
    [blockTypes.SCRIPT]: {
      isVoid: true
    }
  },
}

export default schema
