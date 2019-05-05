import React from 'react'
import { blockTypes } from '../../../fixtures'
import OrderedListIcon from '../../Icons/OrderedListIcon'
import ToolbarButton from '../../ToolbarButton'
import { Block } from 'slate'

class OrderedListButton extends React.Component {
  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
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
      editor
        .setBlocks(blockTypes.UNSTYLED)
        .unwrapBlock(blockTypes.OL)
    } else if (isList) {
      editor
        .unwrapBlock(blockTypes.UL)
        .wrapBlock(blockTypes.OL)
    } else {
      editor.setBlocks(blockTypes.LI).wrapBlock(blockTypes.OL)
    }
  }

  render () {
    const active = this.isActive()
    return (
      <ToolbarButton
        onMouseDown={this.handleClick}
        active={active}
      >
        <OrderedListIcon />
      </ToolbarButton>
    )
  }
}

export default OrderedListButton

