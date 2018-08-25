const RunnerResult = require('../models/runnerResult')

// testing the schema
module.exports = function (app) {
  app.route('/').post((req, res) => {
    const newRunner = new RunnerResult.Year2003({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      age_group: req.body.age_group
    })
    newRunner.save()
      .then(result => {
        res.json(result)
      })
  })
}
