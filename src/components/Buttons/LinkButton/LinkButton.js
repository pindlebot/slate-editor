import React from 'react'
import PropTypes from 'prop-types'
import { blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import LinkIcon from '../../Icons/LinkIcon'
import AddSrcInput from '../../AddSrcInput'

function wrapLink (editor, href) {
  editor.wrapInline({
    type: 'link',
    data: { href }
  })

  editor.moveToEnd()
}

function unwrapLink (editor) {
  editor.unwrapInline('link')
}

class LinkButton extends React.Component {
  state = {
    show: false
  }

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  
    const { editor } = this.props
    const { value } = editor
    const hasLinks = this.hasBlock(blockTypes.LINK)

    if (hasLinks) {
      editor.command(unwrapLink)
    } else if (value.selection.isExpanded) {
      this.setState({ show: true })
    }
  }

  submit = (href) => {
    this.props.editor
      .command(wrapLink, href)
    this.setState({ show: false })
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <ToolbarButton onMouseDown={this.handleClick}>
          <LinkIcon />
        </ToolbarButton>
        {this.state.show && (
          <AddSrcInput submit={this.submit} handleClose={() => this.setState({ show: false })} />
        )}
      </div>
    )
  }
}

export default LinkButton
