const express = require('express')
const getDrugInformation = require('./drugsFunctions')

const drugsRouter = express.Router()

drugsRouter.get('/:name', (req, res, next) => {
    if (!req.params.name) {
        res.redirect('/')
    } else {
        getDrugInformation(req.params.name)
        .then(results => {
            if (results && results.length > 0) {
                res.json(results[0])
            } else {
                res.sendStatus(404)
            }
            
        })
        .catch(err => {
            next(err)
        })
    }
})

module.exports = drugsRouter