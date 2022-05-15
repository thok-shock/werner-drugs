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

module.exports = {getDrugInformation, updateDrug}