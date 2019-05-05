import React from 'react'
import PropTypes from 'prop-types'
import { markTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import CodeIcon from '../../Icons/CodeIcon'

class CodeButton extends React.Component {

  handleClick = (event) => {
    event.preventDefault()
    this.props.editor.toggleMark(markTypes.CODE)
  }

  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  render () {
    const isActive = this.hasMark(markTypes.CODE)
    return (
      <ToolbarButton onMouseDown={this.handleClick} active={isActive}>
        <CodeIcon />
      </ToolbarButton>
    )
  }
}

export default CodeButton
