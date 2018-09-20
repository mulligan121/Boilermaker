const klaw = require('klaw-sync')
const path = require('path')
const fs = require('fs')
const readLines = require('./readLines')

// Start mongoose connection
const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI

mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected')

    // directories for the data files and the parsers
    const dataFiles = klaw(path.join(__dirname, './data'), { nodir: true })
    // TODO: compare the data files with the parsers so we can run them without
    //       the years.
    dataFiles.forEach((file) => {
      let input
      if (file.path.includes('2003')) {
        input = fs.createReadStream(file.path)
        readLines(input)
      }
    })
  })
  .catch(err => console.log('Error: ' + err))
