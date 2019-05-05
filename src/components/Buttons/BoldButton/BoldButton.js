import React from 'react'
import PropTypes from 'prop-types'
import { markTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import BoldIcon from '../../Icons/BoldIcon'

class BoldButton extends React.Component {

  handleClick = (event) => {
    event.preventDefault()
    this.props.editor.toggleMark(markTypes.BOLD)
  }

  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  render () {
    const isActive = this.hasMark(markTypes.BOLD)
    return (
      <ToolbarButton onMouseDown={this.handleClick} active={isActive}>
        <BoldIcon />
      </ToolbarButton>
    )
  }
}

export default BoldButton
