const { pool } = require("../../database/pool")
const { updateQueryGenerator } = require("../../queries/updateQuery")
const columnNames = require("./columnNames")

function getAllWarnings() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM black_box_warnings;', (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function getWarningFromID(id) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM black_box_warnings WHERE id = ?', [id], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function createWarning(name, warning) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO black_box_warnings (name, warning) VALUES (?,?);', [name, warning], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function modifyWarning(obj) {
    return new Promise((resolve, reject) => {
        const {query, values} = updateQueryGenerator('black_box_warnings', columnNames, obj)
        pool.query(query, values, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

module.exports = {getAllWarnings, getWarningFromID, createWarning, modifyWarning}