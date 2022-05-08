const express = require('express')
const drugsRouter = require('./drugs/drugsAPI')

const apiRouter = express.Router()

apiRouter.use('/drugs', drugsRouter)

module.exports = apiRouter