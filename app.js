const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

require('roosevelt')().startServer()

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error: ' + err))
