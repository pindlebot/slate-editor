import React from 'react'
import PropTypes from 'prop-types'
import { markTypes, blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'

class HeadingButton extends React.Component {

  state = {
    show: false
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({ show: true })
  }

  applyHeading = type => (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    this.props.editor.setBlocks(type)
    this.setState({ show: false })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render () {
    return (
      <div style={{ display: 'flex' }}>
        <ToolbarButton onMouseDown={this.handleClick} onMouseUp={this.handleClose}>
          H
        </ToolbarButton>
        {this.state.show && (
          <React.Fragment>
            <ToolbarButton onMouseUp={this.applyHeading(blockTypes.H1)}>H1</ToolbarButton>
            <ToolbarButton onMouseUp={this.applyHeading(blockTypes.H2)}>H2</ToolbarButton>
            <ToolbarButton onMouseUp={this.applyHeading(blockTypes.H3)}>H3</ToolbarButton>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default HeadingButton
