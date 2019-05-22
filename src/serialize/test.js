const decodeInlineStyleRanges = (block, ranges) => {
  let leaves = []
  let index = 0
  if (!ranges.length) {
    leaves.push({
      object: 'leaf',
      text: block.text,
      marks: []
    })
    return leaves
  }

  while (index < ranges.length) {
    let range = ranges[index]
    if (!index) {
      leaves.push({
        object: 'leaf',
        text: block.text.substring(0, range.offset),
        marks: []
      })
    }

    leaves.push({
      object: 'leaf',
      text: block.text.substring(range.offset, range.offset + range.length),
      marks: [{
        data: {},
        object: 'mark',
        type: range.style.toLowerCase()
      }]
    })

    const offset = index < ranges.length - 1
      ? ranges[index + 1].offset
      : block.text.length

    if (range.offset + range.length < offset) {
      leaves.push({
        object: 'leaf',
        text: block.text.substring(range.offset + range.length, offset),
        marks: []
      })
    }

    index++
  }

  return leaves
}

console.log(JSON.stringify(
  decodeInlineStyleRanges({
    text: 'hello'
  }, [{ offset: 4, length: 1, style: 'italic' }])
))
