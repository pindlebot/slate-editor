import React from 'react'
import PropTypes from 'prop-types'
import { blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import BlockquoteIcon from '../../Icons/BlockquoteIcon'
import insertBlockquote from '../../../commands/insertBlockquote'

class BlockquoteButton extends React.Component {
  handleClick = (evt) => {
    evt.preventDefault()
    this.props.editor.command(insertBlockquote)
  }

  isActive = () => {
    const { editor } = this.props
    if (!editor) return false
    const startBlock = editor.value.startBlock
    if (!startBlock) return false
    const parentBlock = editor.value.document.getParent(startBlock.key)
    return parentBlock && parentBlock.type === blockTypes.BLOCKQUOTE
  }

  render () {
    const active = this.isActive()
    return (
      <ToolbarButton onMouseDown={this.handleClick} active={active}>
        <BlockquoteIcon />
      </ToolbarButton>
    )
  }
}

export default BlockquoteButton
