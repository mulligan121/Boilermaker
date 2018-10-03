const klaw = require('klaw-sync')
const path = require('path')
const fs = require('fs')

// parsers
const parser1 = require('./parsers/parser1')

// assign years to parser for reusability
let assignParsers = {
  parser1: {
    files: ['2003', '2004', '2005', '2006']
  }
}

// get data files
// directories for the data files and the parsers
const dataFiles = klaw(path.join(__dirname, './data'), { nodir: true })
let remainingDataFiles = dataFiles.length - 12 // TODO: remove "x - number" once all parsers are introduced
let results
let year

// Start mongoose connection
const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI

mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected')

    // iterate through data .txt files
    dataFiles.forEach((file) => {
      for (let key in assignParsers) {
        for (let x = 0; x < assignParsers[key].files.length; x++) {
          year = 'Year' + assignParsers[key].files[x]
          if (file.path.includes(assignParsers[key].files[x])) {
            results = fs.readFileSync(file.path).toString().split('\n')
            for (let i = 0; i < results.length; i++) {
              if (key === 'parser1') parser1(year, results[i])
              if (i === results.length - 1) {
                handleRemaining(file.path)
              }
            }
          }
        }
      }
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
  }
}
