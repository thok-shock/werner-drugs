const express = require('express')
const {getDrugInformation, updateDrug, addSideEffect} = require('./drugsFunctions')

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

drugsRouter.put('/:name', (req, res, next) => {
    if (req.session.passport && req.session.passport.user && req.session.passport.user.permission > 0) {
        if (!req.params.name || !req.body) {
            res.sendStatus(400)
        } else {
            updateDrug(req.body)
            .then(rows => {
                res.json(rows)
            })
            .catch(err => {
                next(err)
            })
        }
    } else {
        res.sendStatus(403)
    }
})

drugsRouter.post('/add-side-effect', (req, res, next) => {
    if (!req.body) {
        res.sendStatus(400)
    } else {
        addSideEffect(req.body.drug_id, req.body.side_effect_id)
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            next(err)
        })
    }
})

module.exports = drugsRouter