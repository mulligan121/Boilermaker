const klaw = require('klaw-sync')
const path = require('path')
const fs = require('fs')

// parsers
const parser1 = require('./parsers/parser1')
const parser2 = require('./parsers/parser2')

// assign years to parser for reusability
let assignParsers = {
  parser1: {
    files: ['2003', '2004', '2005', '2006']
  },
  parser2: {
    files: ['2007', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
  }
  /* parser3: {
    files: ['2008']
  } */
}

// get data files
// directories for the data files and the parsers
const dataFiles = klaw(path.join(__dirname, './data'), { nodir: true })
let remainingDataFiles = dataFiles.length - 1 // TODO: remove "x - number" once all parsers are introduced
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
            if (key === 'parser1') {
              parse(parser1, year, results, 0, () => {
                handleRemaining(file.path)
              })
            }
            if (key === 'parser2') {
              parse(parser2, year, results, 0, () => {
                handleRemaining(file.path)
              })
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
    process.exit(0)
  }
}

function parse (parser, year, results, index, next) {
  parser(year, results[index], () => {
    index++
    if (index % 1000 === 0) {
      console.log(year + ': inserted ' + index + ' results.')
    }
    if (index === results.length) {
      next()
    } else {
      parse(parser, year, results, index, next)
    }
  })
}
