
import React from 'react'

function CodeBlock (props) {
  const { editor, node } = props
  const language = node.data.get('language')

  function onChange (event) {
    editor.setNodeByKey(node.key, { data: { language: event.target.value } })
  }

  return (
    <pre>
      <code {...props.attributes}>{props.children}</code>
    </pre>
  )
}

export default CodeBlock
