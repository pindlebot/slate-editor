import * as React from 'react'
import { Dropzone } from 's3-dropzone'
import PropTypes from 'prop-types'

class DropzoneModal extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    insertImage: PropTypes.func.isRequired,
    createImage: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired
  }

  static defaultProps = {
    images: [],
    open: false
  }

  state = {
    images: []
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    const { config } = nextProps
    const images = nextProps.images
      .map(img => ({
        src: config.endpoint + img.url,
        id: img.id,
        key: img.id
      }))
    if (images && images.length !== prevState.images.length) {
      return { images }
    }
    return null
  }

  onClickAway = (evt) => {
    // this.props.onOverrideModal(undefined)
  }

  mapFileToParams = file => {
    const { refId } = this.props
    const key = `static/${refId}/${file.name}`
    return {
      Fields: {
        key: key,
        'Content-Type': file.type
      }
    }
  }

  handleClick = (evt, type, upload) => {
    const images = this.state.images
    let image = images.find(img => img.id === upload.id)
    if (!image) return
    if (type === 'insert') {
      this.props.insertImage(
        image.src
      )
      this.onClickAway()
    } else if (type === 'delete') {
      this.props.deleteImage({ id: image.id })
    }
  }

  done = (err, uploads) => {
    if (err) console.warn(err)
    const { refId } = this.props
    while (uploads.length) {
      this.props.createImage({ postId: refId, url: uploads.shift().key })
    }
  }

  render () {
    if (!this.props.open) return null
    return (
      <Dropzone
        onClose={this.onClickAway}
        done={this.done}
        uploads={this.state.images}
        handleClick={this.handleClick}
        mapFileToParams={this.mapFileToParams}
        {...this.props.config}
      />
    )
  }
}

export default DropzoneModal
