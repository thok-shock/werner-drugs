const pool = require("../../database/pool");
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

module.exports = {getDrugInformation, updateDrug, addSideEffect}