import { blockTypes } from '../fixtures'

const insertImage = (editor, src, target) => {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: blockTypes.IMAGE,
    data: { src }
  })
}

export default insertImage
