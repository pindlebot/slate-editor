import React from 'react'
import PropTypes from 'prop-types'
import { blockTypes } from '../../../fixtures'
import ToolbarButton from '../../ToolbarButton'
import TableIcon from '../../Icons/TableIcon'
import insertTable from '../../../commands/insertTable'

class TableButton extends React.Component {
  handleClick = (evt) => {
    const { editor } = this.props
    editor.command(insertTable)
  }

  render () {
    return (
      <ToolbarButton onMouseDown={this.handleClick}>
        <TableIcon />
      </ToolbarButton>
    )
  }
}

export default TableButton
