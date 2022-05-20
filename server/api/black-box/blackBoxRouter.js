const express = require('express')
const { verifyPermissions } = require('../../auth/verifyPermissions')
const {getAllWarnings, getWarningFromID, createWarning} = require('./blackBoxFunctions')

const blackBoxRouter = express.Router()

blackBoxRouter.get('/', (req, res, next) => {
    getAllWarnings()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        next(err)
    })
})

blackBoxRouter.get('/:id', (req, res, next) => {
    getWarningFromID(req.params.id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        next(err)
    })
})

blackBoxRouter.post('/', (req, res, next) => {
    verifyPermissions(req, 1)
    .then(() => {
        if (req.body) {
            createWarning(req.body.name, req.body.warning)
            .then(rows => {
                res.sendStatus(201)
            })
            .catch(err => {
                next(err)
            })
        } else {
            res.sendStatus(400)
        }
    })
    .catch(() => {
        res.sendStatus(403)
    })
})

module.exports = {blackBoxRouter}