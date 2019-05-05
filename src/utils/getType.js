import { blockTypes } from '../fixtures'

const getType = chars => {
  switch (chars) {
    case '*':
    case '-':
    case '+':
      return blockTypes.LI
    case '>':
      return blockTypes.BLOCKQUOTE
    case '#':
      return blockTypes.H1
    case '##':
      return blockTypes.H2
    case '###':
      return blockTypes.H3
    default:
      return null
  }
}

export default getType
