import React from 'react'
import clsx from 'clsx'

class Script extends React.Component {
  state = {
    loading: true
  }

  componentDidMount () {
    const src = this.props.block.getData().get('src')
    let elem = this.ref
    if (src && this.state.loading) {
      this.setState({ loading: false }, () => {
        elem.appendChild(this.createScript(src))
      })
    }
  }

  createScript = src => {
    let tag = document.createElement('script')
    tag.async = false
    tag.src = src
    return tag
  }

  render () {
    const { node } = this.props
    let html = node.data.has('embed')
      ? node.data.get('embed')
      : undefined
    return (
      <div className={clsx('embed')}>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        <div
          style={{
            'wordWrap': 'normal',
            'whiteSpace': 'normal'
          }}
          ref={ref => { this.ref = ref }}
        />
      </div>
    )
  }
}

export default Script
