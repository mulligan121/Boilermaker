const klaw = require('klaw-sync')
const path = require('path')
const fs = require('fs')
const parser1 = require('./parsers/parser1')

let useParser1 = ['2003', '2004', '2005', '2006']

// get data files
// directories for the data files and the parsers
const dataFiles = klaw(path.join(__dirname, './data'), { nodir: true })
let remainingDataFiles = dataFiles.length - 12
let results

// Start mongoose connection
const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI

mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected')

    // TODO: compare the data files with the parsers so we can run them without
    //       the years.
    dataFiles.forEach((file) => {
      useParser1.forEach((dataFile) => {
        if (file.path.includes(dataFile)) {
          results = fs.readFileSync(file.path).toString().split('\n')
          for (let i = 0; i < results.length; i++) {
            parser1(results[i])
            if (i === results.length - 1) {
              handleRemaining(file.path)
            }
          }
        }
      })
    })
  })
  .catch(err => console.error(err))

function handleRemaining (file) {
  // get the file name alone as a string
  file = file.split('/')
  file = file[file.length - 1]
  file = file.replace(/\.[^/.]+$/, '')
  console.log(`Finished parsing/inserting year ${file} into the database.`)
  remainingDataFiles--
  if (remainingDataFiles === 0) {
    console.log('Finished')
    process.exit(0)
  }
}
