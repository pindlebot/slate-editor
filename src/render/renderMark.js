import clsx from 'clsx'
import React from 'react'
import { markTypes } from '../fixtures'

const renderMark = (props, editor, next) => {
  const { children, mark, attributes } = props
  const { value } = editor
  console.log(value.startBlock.type)
  if (value.startBlock.type === 'code-line') {
    return (
      <span {...attributes} className={clsx('prism-token', 'token', mark.type)}>
        {children}
      </span>
    )
  }
  switch (mark.type) {
    case markTypes.BOLD:
      return <strong {...attributes}>{children}</strong>
    case markTypes.CODE:
      return <code {...attributes}>{children}</code>
    case markTypes.ITALIC:
      return <em {...attributes}>{children}</em>
    case markTypes.UNDERLINE:
      return <u {...attributes}>{children}</u>
    default:
      return next()
  }
}

export default renderMark
