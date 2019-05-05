import React from 'react'
import appendStylesheet from 'append-stylesheet'
import clsx from 'clsx'

class EmbeddedGist extends React.Component {
  state = {
    loading: true,
    src: ''
  }

  static gistCallbackId = 0;
  static nextGistCallback = () => 'embed_gist_callback_' + EmbeddedGist.gistCallbackId++;

  componentDidMount () {
    const src = this.props.node.data.get('src')
    let gistCallback = EmbeddedGist.nextGistCallback()

    window[gistCallback] = gist => {
      if (this.state.loading) {
        this.setState({
          loading: false,
          src: gist.div
        })
        appendStylesheet(gist.stylesheet)
      }
    }

    let url = src + 'on?callback=' + gistCallback
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
  }

  render () {
    // const focused = blockProps.focused ? 'focused' : 'unfocused'
    const className = clsx('embed')
    console.log(this.props)
    return (
      <div
        style={{
          wordWrap: 'normal',
          whiteSpace: 'normal'
        }}
        className={'embed'}
        dangerouslySetInnerHTML={{ __html: this.state.src }}
        {...this.props.attributes}
      />
    )
  }
}

export default EmbeddedGist
