import { blockTypes } from '../fixtures'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-scala'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-graphql'
console.log(Prism.languages)

function getContent (token) {
  if (typeof token === 'string') {
    return token
  } else if (typeof token.content === 'string') {
    return token.content
  } else {
    return token.content.map(getContent).join('')
  }
}

const _decorateNode = (node, editor, next) => {
  const others = next() || []
  if (node.type !== 'code-block') return others

  const { document } = editor.value
  const language = node.data.get('language')
  if (!language) return others
  const texts = node.getTexts().toArray()
  const string = texts.map(t => t.text).join('\n')
  const grammar = Prism.languages[language]
  const tokens = Prism.tokenize(string, grammar)
  const decorations = []
  let startText = texts.shift()
  let endText = startText
  let startOffset = 0
  let endOffset = 0
  let start = 0

  for (const token of tokens) {
    startText = endText
    startOffset = endOffset

    const content = getContent(token)
    const newlines = content.split('\n').length - 1
    const length = content.length - newlines
    const end = start + length

    let available = startText.text.length - startOffset
    let remaining = length

    endOffset = startOffset + remaining

    while (available < remaining && texts.length > 0) {
      endText = texts.shift()
      remaining = length - available
      available = endText.text.length
      endOffset = remaining
    }

    if (typeof token !== 'string') {
      const startPath = document.assertPath(startText.key)
      const endPath = document.assertPath(endText.key)

      const dec = {
        anchor: {
          key: startText.key,
          path: startPath,
          offset: startOffset
        },
        focus: {
          key: endText.key,
          path: endPath,
          offset: endOffset
        },
        mark: {
          type: token.type
        }
      }

      decorations.push(dec)
    }

    start = end
  }

  return [...others, ...decorations]
}

const decorateNode = (node, editor, next) => {
  const others = next() || []
  if (node.type !== 'code-block') return others

  const { document } = editor.value
  const language = node.data.get('language')
  if (!language) return others
  const texts = node.getTexts().toArray()
  const string = texts.map(t => t.text).join('\n')
  const grammar = Prism.languages[language]
  const decorations = []
  const tokens = Prism.tokenize(string, grammar)
    .flatMap(tok =>
      Array.isArray(tok.content)
        ? tok.content.map(content => ({ ...tok, content, length: content.length }))
        : tok
    )

  let offset = 0
  let index = 0
  while (index < tokens.length) {
    let token = tokens[index]
    index++
    if (typeof token !== 'string') {
      const startPath = document.assertPath(texts[0].key)
      const endPath = document.assertPath(texts[0].key)
      decorations.push({
        anchor: {
          key: texts[0].key,
          path: startPath,
          offset: offset
        },
        focus: {
          key: texts[0].key,
          path: endPath,
          offset: offset + token.length
        },
        mark: {
          type: token.type
        }
      })
    }
    offset += token.length
  }

  return [...others, ...decorations]
}
export default decorateNode
