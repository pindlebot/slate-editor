import React from 'react'
import { blockTypes, markTypes } from './fixtures'

const rules = [{
  serialize (obj, children) {
    if (!obj.type) {
      return
    }
    switch (obj.type) {
      case blockTypes.UNSTYLED:
        return (<p>{children}</p>)
      case blockTypes.CODE:
        return (<pre><code>{obj.text}</code></pre>)
      case blockTypes.CODE_LINE:
        return null
      case blockTypes.IMAGE:
        return (<img src={obj.data.get('url')} />)
      case blockTypes.OL:
        return (
          <ul>{children}</ul>
        )
      case blockTypes.UL:
        return (
          <ul>{children}</ul>
        )
      case blockTypes.LI:
        return (
          <li>{children}</li>
        )
      case blockTypes.BLOCKQUOTE:
        return (<blockquote>{children}</blockquote>)
      case blockTypes.H1:
        return (
          <h1>{children}</h1>
        )
      case blockTypes.H2:
        return (
          <h2>{children}</h2>
        )
      case blockTypes.H3:
        return (
          <h3>{children}</h3>
        )
      case blockTypes.TABLE:
        return (
          <table>{children}</table>
        )
      case blockTypes.TABLE_ROW:
        return (
          <tr>{children}</tr>
        )
      case blockTypes.TABLE_CELL:
        return (
          <td>{children}</td>
        )
      case blockTypes.GIST:
        const str = obj.data.get('tag')
        return str.endsWith('</script>') ? str : `${str}</script>`
      case markTypes.BOLD:
        return (<strong>{children}</strong>)
      case markTypes.ITALIC:
        return (<em>{children}</em>)
      case markTypes.CODE:
        return (<code>{children}</code>)
      case markTypes.UNDERLINE:
        return children
      default:
        console.warn(`No serializer defined for ${obj.type}`)
        return children
    }
  }
}]

export default rules
