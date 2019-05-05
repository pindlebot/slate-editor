import React from 'react'
import clsx from 'clsx'

const ToolbarButton = props => (
  <div className={'button-wrapper'}>
    <button
      className={clsx('button', { active: props.active })}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      type='button'
    >
      {props.children}
    </button>
  </div>
)

export default ToolbarButton

