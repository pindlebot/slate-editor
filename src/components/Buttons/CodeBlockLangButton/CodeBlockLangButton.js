import React from 'react'
import PropTypes from 'prop-types'
import { blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import CodeBlockLangIcon from '../../Icons/CodeBlockLangIcon'
import AddSrcInput from '../../AddSrcInput'
import { Data } from 'slate'

class CodeBlockLangButton extends React.Component {
  state = {
    show: false
  }

  handleClick = (event) => {
    event.preventDefault()

    this.setState({ show: true })
  }

  submit = (language) => {
    const { editor, editor: { value } } = this.props
    const { startBlock } = value
    const startParent = value.document.getParent(startBlock.key)
    editor.setNodeByKey(startParent.key, { data: { language } })
    this.setState({ show: false })
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <ToolbarButton onMouseDown={this.handleClick}>
          <CodeBlockLangIcon />
        </ToolbarButton>
        {this.state.show && (
          <AddSrcInput submit={this.submit} handleClose={() => this.setState({ show: false })} />
        )}
      </div>
    )
  }
}

export default CodeBlockLangButton
