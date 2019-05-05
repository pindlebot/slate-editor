import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export default class AddLinkForm extends Component {
  static propTypes = {
    handleClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeholder: 'Enter a URL and press enter'
  }

  state = {
    value: '',
    isInvalid: false
  }

  componentDidMount () {
    // this.input.focus()
  }

  onRef = (node) => { this.input = node }

  onChange = ({ target: { value } }) => {
    const nextState = { value }
    this.setState(nextState)
  }

  onClose = () => {
    this.props.handleClose()
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.submit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      this.onClose()
    }
  }

  submit () {
    let { value } = this.state
    this.input.blur()
    this.props.submit(value)
  }

  render () {
    const { value } = this.state
    const className = clsx('input')

    return (
      <input
        className={className}
        onBlur={this.onClose}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        placeholder={''}
        ref={this.onRef}
        type='text'
        value={value}
        style={{height: '40px', padding: '4px 8px', boxSizing: 'border-box'}}
      />
    )
  }
}