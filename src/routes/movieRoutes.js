const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("Welcome to API for the Movie Search App!")
})

module.exports = router