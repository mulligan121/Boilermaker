const parse2003 = require('./parsers/2003')

// read each line of data
module.exports = (input) => {
  let remaining = ''

  // all file data as buffers
  input.on('data', (data) => {
    // assign the data to remaining
    remaining += data
    // index that the new line is on
    let index = remaining.indexOf('\n')

    // run each line through the parser
    while (index > -1) {
      let line = remaining.substring(0, index)
      remaining = remaining.substring(index + 1)
      parse2003(line)
      index = remaining.indexOf('\n')
    }
  })

  // parse the remaining
  input.on('end', () => {
    if (remaining.length > 0) {
      parse2003(remaining)
    }
  })
}
