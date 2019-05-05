import React from 'react'

import * as Buttons from '../Buttons'

const buttons = [
  Buttons.ImageButton,
  Buttons.VideoButton,
  Buttons.UnorderedListButton,
  Buttons.OrderedListButton,
  Buttons.BlockquoteButton,
  Buttons.LinkButton,
  Buttons.CodeBlockButton,
  Buttons.CodeBlockLangButton,
  Buttons.HeadingButton,
  Buttons.BoldButton,
  Buttons.ItalicButton,
  Buttons.UnderlineButton,
  Buttons.CodeButton,
  Buttons.TableButton
]

class Toolbar extends React.Component {
  render () {
    if (!this.props.value) return false
    return (
      <div className={'toolbar'}>
        {buttons.map(Button =>
          <Button {...this.props} />
        )}
      </div>
    )
  }
}

export default Toolbar
