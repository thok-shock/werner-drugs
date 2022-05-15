const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    req.session.passport ? res.json(req.session.passport) : res.sendStatus('401')
    
})

module.exports = {userRouter}