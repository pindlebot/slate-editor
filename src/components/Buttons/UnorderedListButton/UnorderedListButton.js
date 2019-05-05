import React from 'react'
import { blockTypes } from '../../../fixtures'
import UnorderedListIcon from '../../Icons/UnorderedListIcon'
import ToolbarButton from '../../ToolbarButton'
import { Block } from 'slate'

class UnorderedListButton extends React.Component {
  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  unwrapBlock = () => {
    const { editor } = this.props
    editor
      .setBlocks(blockTypes.UNSTYLED)
      .unwrapBlock(blockTypes.UL)
  }

  isActive = () => {
    const { editor } = this.props
    if (!editor) return false
    const { value } = editor
    return value.blocks.some(block => {
      return Boolean(value.document.getClosest(block.key, parent => parent.type === blockTypes.UL))
    })
  }

  handleClick = (event) => {
    event.preventDefault()
    const { editor } = this.props
    const { value } = editor
    const { document } = value

    // Handle the extra wrapping required for list buttons.
    const isList = this.hasBlock(blockTypes.LI)
    const isType = this.isActive()

    if (isList && isType) {
      this.unwrapBlock()
    } else if (isList) {
      editor
        .unwrapBlock(blockTypes.OL)
        .wrapBlock(blockTypes.UL)
    } else {
      editor
        .setBlocks(blockTypes.LI)
        .wrapBlock(blockTypes.UL)
    }
  }

  render () {
    const active = this.isActive()
    console.log({ active })
    return (
      <ToolbarButton
        onMouseDown={this.handleClick}
        active={active}
      >
        <UnorderedListIcon />
      </ToolbarButton>
    )
  }
}

export default UnorderedListButton

