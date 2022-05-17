const {pool} = require("../../database/pool")

function getSideEffectByName(name) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM side_effects WHERE name = ?', [name], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function getAllSideEffects() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM side_effects;', (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function createSideEffect(name, description) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO side_effects (name, description) VALUES (?,?);', [name, description], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

module.exports = {getSideEffectByName, createSideEffect, getAllSideEffects}