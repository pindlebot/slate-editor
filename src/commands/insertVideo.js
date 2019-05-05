import { blockTypes } from '../fixtures'

const insertVideo = (editor, src) => {
  editor.insertBlock({
    type: blockTypes.VIDEO,
    data: { src }
  })
}

export default insertVideo
