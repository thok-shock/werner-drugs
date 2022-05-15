const express = require('express')
const drugsRouter = require('./drugs/drugsAPI')
const { userRouter } = require('./users/usersAPI')

const apiRouter = express.Router()

apiRouter.use('/drugs', drugsRouter)
apiRouter.use('/users', userRouter)

module.exports = apiRouter