const pool = require("../../database/pool");

function getDrugInformation(name) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM drugs WHERE name = ?', [name], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

module.exports = getDrugInformation