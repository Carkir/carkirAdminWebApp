const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.render('editUserForm')
  })

module.exports = app