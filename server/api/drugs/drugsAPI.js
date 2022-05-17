const express = require('express')
const {verifyPermissions} = require('../../auth/verifyPermissions')
const {getDrugInformation, updateDrug, addSideEffect, getSideEffectsOfDrug, removeSideEffect, createDrug, getAllDrugs, addBBWarning, removeBBWarning, getBlackBoxWarningsOfDrug} = require('./drugsFunctions')

const drugsRouter = express.Router()

drugsRouter.get('/', (req, res, next) => {
    getAllDrugs()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        next(err)
    })
})

drugsRouter.get('/:name', (req, res, next) => {
    if (req.session) {
        req.session.lastDrug = `/${req.params.name}`
    }
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
    verifyPermissions(req, 1)
    .then(() => {
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
    .catch(() => {
        res.sendStatus(403)
    })
})

drugsRouter.post('/add-black-box-warning', (req, res, next) => {
    verifyPermissions(req, 1)
    .then(() => {
        if (req.body && req.body.drug_id && req.body.black_box_warning_id) {
            addBBWarning(req.body.drug_id, req.body.black_box_warning_id)
            .then(rows => {
                res.json(rows)
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

drugsRouter.post('/:name', (req, res, next) => {
    verifyPermissions(req, 1)
    .then(() => {
        if (!req.params.name) {
            res.sendStatus(400)
        } else {
            createDrug(req.params.name)
            .then(rows => {
                res.sendStatus(201)
            })
            .catch(err => {
                next(err)
            })
        }
    })
    .catch(() => {
        res.sendStatus(403)
    })
})

drugsRouter.delete('/remove-side-effect', (req, res, next) => {
    verifyPermissions(req, 1)
    .then(() => {
        if (!req.body) {
            res.sendStatus(400)
        } else {
            removeSideEffect(req.body.drug_id, req.body.side_effect_id)
            .then(rows => {
                res.json(rows)
            })
            .catch(err => {
                next(err)
            })
        }
    })
    .catch(() => {
        res.sendStatus(403)
    })
})

drugsRouter.delete('/remove-black-box-warning', (req, res, next) => {
    verifyPermissions(req, 1)
    .then(() => {
        if (req.body && req.body.drug_id && req.body.black_box_warning_id) {
            removeBBWarning(req.body.drug_id, req.body.black_box_warning_id)
            .then(rows => {
                res.json(rows)
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

drugsRouter.get('/get-side-effects-of-drug/:drugName', (req, res, next) => {
    if (!req.params.drugName) {
        res.sendStatus(400)
    } else {
        getSideEffectsOfDrug(req.params.drugName)
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            next(err)
        })
    }
})

drugsRouter.get('/get-black-box-warnings-of-drug/:drugName', (req, res, next) => {
    if (!req.params.drugName) {
        res.sendStatus(400)
    } else {
        getBlackBoxWarningsOfDrug(req.params.drugName)
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            next(err)
        })
    }
})

module.exports = drugsRouter