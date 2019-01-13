const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create runner result schema
let RunnerResultsSchema = new Schema({
  salutation: {
    type: String
  },
  first_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  last_name: {
    type: String
  },
  suffix: {
    type: String
  },
  gender: {
    type: String
  },
  age_group: {
    type: String
  },
  age: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  gun_time: {
    type: String
  },
  gun_pace: {
    type: String
  },
  net_time: {
    type: String
  },
  net_pace: {
    type: String
  },
  place_overall: {
    type: String
  },
  place_gender: {
    type: String
  },
  place_in_age_group: {
    type: String
  }
})

let Year2003 = mongoose.model('2003', RunnerResultsSchema)
let Year2004 = mongoose.model('2004', RunnerResultsSchema)
let Year2005 = mongoose.model('2005', RunnerResultsSchema)
let Year2006 = mongoose.model('2006', RunnerResultsSchema)
let Year2007 = mongoose.model('2007', RunnerResultsSchema)
let Year2008 = mongoose.model('2008', RunnerResultsSchema)
let Year2009 = mongoose.model('2009', RunnerResultsSchema)
let Year2010 = mongoose.model('2010', RunnerResultsSchema)
let Year2011 = mongoose.model('2011', RunnerResultsSchema)
let Year2012 = mongoose.model('2012', RunnerResultsSchema)
let Year2013 = mongoose.model('2013', RunnerResultsSchema)
let Year2014 = mongoose.model('2014', RunnerResultsSchema)
let Year2015 = mongoose.model('2015', RunnerResultsSchema)
let Year2016 = mongoose.model('2016', RunnerResultsSchema)
let Year2017 = mongoose.model('2017', RunnerResultsSchema)
let Year2018 = mongoose.model('2018', RunnerResultsSchema)

// get the mongoose model from the schema and export it
module.exports = {
  Year2003,
  Year2005,
  Year2006,
  Year2007,
  Year2004,
  Year2008,
  Year2009,
  Year2010,
  Year2011,
  Year2012,
  Year2013,
  Year2014,
  Year2015,
  Year2016,
  Year2017,
  Year2018
}
