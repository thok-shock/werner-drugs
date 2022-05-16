const express = require('express')
const drugsRouter = require('./drugs/drugsAPI')
const { sideEffectsRouter } = require('./side-effects/sideEffectsAPI')
const { userRouter } = require('./users/usersAPI')

const apiRouter = express.Router()

apiRouter.use('/drugs', drugsRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/side-effects', sideEffectsRouter)

module.exports = apiRouter