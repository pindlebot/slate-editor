
import * as url from 'url'
import fromPairs from 'lodash.frompairs'

const chars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\xA0': '&nbsp;',
  '"': '&quot;'
}

export function encodeContent (text) {
  return Object.keys(chars).reduce((acc, key) => {
    return acc.split(key).join(chars[key])
  }, text)
}

export function decodeContent (text) {
  return Object.keys(chars).reduce((acc, key) => {
    return acc.split(chars[key]).join(key)
  }, text)
}

export function getAttributes (match) {
  const [tag, name, attributes = ''] = match
  let data = attributes.split(/\s(?![\w\s]*")/g)
    .map(attrib => attrib.replace(/["']/g, ''))
    .map(attrib => [
      attrib.split('=')[0],
      attrib.split('=')[1] ? attrib.split('=')[1] : true
    ])
    .filter(attrib => attrib[0] !== '')
  data = fromPairs(data)

  return {
    ...data,
    tag,
    name
  }
}

export function getType ({ src }) {
  const host = url.parse(src).host

  switch (host) {
    case 'gist.github.com':
      return 'atomic:gist'
    default:
      return 'atomic:script'
  }
}

export function handleHtml (text) {
  if (!/<script/.test(text)) return
  text = decodeContent(text).trim()
  const RE = /<([^/>\s]+)\s?([^>]+)>/g
  let attributes = { embed: undefined }
  let matchArr
  while ((matchArr = RE.exec(text)) !== null) {
    let attrib = getAttributes(matchArr)
    if (attrib.src && attrib.name === 'script') {
      attributes.tag = attrib.tag + '</script>'
      attributes.src = attrib.src
    } else if (!attributes.embed) {
      attributes.embed = text
    }
  }
  return attributes
}

export const appendCss = (css) => {
  const head = document.head
  const style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
}