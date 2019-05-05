import React from 'react'
import PropTypes from 'prop-types'
import { blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import VideoIcon from '../../Icons/VideoIcon'
import AddSrcInput from '../../AddSrcInput'
import insertVideo from '../../../commands/insertVideo'

class VideoButton extends React.Component {
  static propTypes = {
    editor: PropTypes.object
  }

  state = {
    show: false
  }

  submit = (href) => {
    this.props.editor.command(insertVideo, href)
    this.setState({ show: false })
  }

  handleClick = event => {
    event.preventDefault()
    this.setState({ show: true })
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <ToolbarButton
          // active={isActive}
          onMouseDown={this.handleClick}
        >
          <VideoIcon />
        </ToolbarButton>
        {this.state.show && (
          <AddSrcInput submit={this.submit} handleClose={() => this.setState({ show: false })} />
        )}
      </div>
    )
  }
}

export default VideoButton
