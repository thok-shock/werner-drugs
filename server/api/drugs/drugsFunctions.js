const {pool} = require("../../database/pool");
const { updateQueryGenerator } = require("../../queries/updateQuery");
const columnNames = require("./columnNames");

function getDrugInformation(name) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM drugs WHERE name = ?', [name], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function getAllDrugs() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM drugs;', (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function updateDrug(fields) {
    return new Promise((resolve, reject) => {
        let {query, values} = updateQueryGenerator('drugs', columnNames, fields)
        pool.query(query, values, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function addSideEffect(drug_id, side_effect_id) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO drugs_joins_side_effects (drug_id, side_effect_id) VALUES (?,?);', [drug_id, side_effect_id], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function removeSideEffect(drug_id, side_effect_id) {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM drugs_joins_side_effects WHERE drug_id = ? AND side_effect_id = ?;', [drug_id, side_effect_id], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function getSideEffectsOfDrug(drug_name) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT se.* FROM side_effects AS se JOIN drugs_joins_side_effects AS bridge ON se.id = bridge.side_effect_id JOIN drugs ON bridge.drug_id = drugs.id WHERE drugs.name = ?", [drug_name], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function createDrug(name) {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO drugs (name) VALUES (?)", [name], (err, rows) => {
            if (err) reject(err);
            resolve(rows)
        })
    })
}

module.exports = {getDrugInformation, updateDrug, addSideEffect, getSideEffectsOfDrug, removeSideEffect, createDrug, getAllDrugs}