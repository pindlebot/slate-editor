import React from 'react'
import PropTypes from 'prop-types'
import { markTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import ItalicIcon from '../../Icons/ItalicIcon'

class ItalicButton extends React.Component {

  handleClick = (event) => {
    event.preventDefault()
    this.props.editor.toggleMark(markTypes.ITALIC)
  }
  hasMark = type => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type === type)
  }

  render () {
    const isActive = this.hasMark(markTypes.ITALIC)
    return (
      <ToolbarButton onMouseDown={this.handleClick} active={isActive}>
        <ItalicIcon />
      </ToolbarButton>
    )
  }
}

export default ItalicButton
