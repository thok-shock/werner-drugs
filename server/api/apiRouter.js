const express = require('express')
const { blackBoxRouter } = require('./black-box/blackBoxRouter')
const drugsRouter = require('./drugs/drugsAPI')
const { sideEffectsRouter } = require('./side-effects/sideEffectsAPI')
const { userRouter } = require('./users/usersAPI')

const apiRouter = express.Router()

apiRouter.use('/drugs', drugsRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/side-effects', sideEffectsRouter)
apiRouter.use('/black-box-warnings', blackBoxRouter)

module.exports = apiRouter