const fs = require('fs')

function readLines(input, func) {
  let remaining = ''

  input.on('data', (data) => {
    remaining += data
    let index = remaining.indexOf('\n')
    while (index > -1) {
      let line = remaining.substring(0, index)
      remaining = remaining.substring(index + 1)
      func(line)
      index = remaining.indexOf('\n')
    }
  })

  input.on('end', () => {
    if (remaining.length > 0) {
      func(remaining)
    }
  })
}

function func(data) {
  let array = data.trim().split(/ +/)
  // console.log(typeof data)
  console.log(array)
}

let input = fs.createReadStream('2003.txt')
readLines(input, func)