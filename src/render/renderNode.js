import React from 'react'
import { blockTypes } from '../fixtures'
import CodeBlock from '../components/CodeBlock'
import CodeBlockLine from '../components/CodeBlockLine'
import Image from '../components/ImageBlock'
import Gist from '../components/Gist'

const renderNode = (props, editor, next) => {
  const { attributes, children, node, isFocused } = props
  console.log(props)
  switch (node.type) {
    case blockTypes.BLOCKQUOTE:
      return <blockquote {...attributes}>{children}</blockquote>
    case blockTypes.UL:
      return <ul {...attributes}>{children}</ul>
    case blockTypes.H1:
      return <h1 {...attributes}>{children}</h1>
    case blockTypes.H2:
      return <h2 {...attributes}>{children}</h2>
    case blockTypes.H3:
      return <h3 {...attributes}>{children}</h3>
    case blockTypes.LI:
      return <li {...attributes}>{children}</li>
    case blockTypes.OL:
      return <ol {...attributes}>{children}</ol>
    case blockTypes.IMAGE:
      const src = node.data.get('src')
      return <Image src={src} selected={isFocused} {...attributes} />
    case blockTypes.CODE:
      return <CodeBlock {...props} />
    case blockTypes.CODE_LINE:
      return <CodeBlockLine {...props} />
    case blockTypes.TABLE:
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )
    case blockTypes.TABLE_ROW:
      return <tr {...attributes}>{children}</tr>
    case blockTypes.TABLE_CELL:
      return <td {...attributes}>{children}</td>
    case blockTypes.LINK:
      const { data } = node
      const href = data.get('href')
      console.log(href)
      return (
        <a {...attributes} href={href}>
          {children}
        </a>
      )
    case blockTypes.GIST:
      return <Gist {...props} />
    default:
      return next()
  }
}

export default renderNode
