import React from 'react'
import PropTypes from 'prop-types'
import ImageIcon from '../../Icons/ImageIcon'
import ToolbarButton from '../../ToolbarButton'
import { blockTypes } from '../../../fixtures'
import insertImage from '../../../commands/insertImage'

class ImageButton extends React.Component {
  static propTypes = {
    editor: PropTypes.object
  }

  handleClick = event => {
    event.preventDefault()
    this.props.openDropzone()
    // const src = window.prompt('Enter the URL of the image:')
    // if (!src) return
    // this.props.editor.command(insertImage, src)
  }

  render () {
    return (
      <ToolbarButton
        // active={isActive}
        onMouseDown={this.handleClick}
      >
        <ImageIcon />
      </ToolbarButton>
    )
  }
}

export default ImageButton
