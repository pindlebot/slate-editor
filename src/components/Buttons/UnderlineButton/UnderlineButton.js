import React from 'react'
import PropTypes from 'prop-types'
import { markTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import UnderlineIcon from '../../Icons/UnderlineIcon'

class UnderlineButton extends React.Component {

  handleClick = (event) => {
    event.preventDefault()
    this.props.editor.toggleMark(markTypes.UNDERLINE)
  }

  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  render () {
    const isActive = this.hasMark(markTypes.UNDERLINE)
    return (
      <ToolbarButton onMouseDown={this.handleClick} active={isActive}>
        <UnderlineIcon />
      </ToolbarButton>
    )
  }
}

export default UnderlineButton
