const pool = require("../database/pool")

function findOrCreate(googleID, name, email) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE google_id = ?', [googleID], (err, rows) => {
            if (err) reject(err)
            if (rows && rows[0]) {resolve(rows[0])} else {
                pool.query('INSERT INTO users (google_id, name, email) VALUES (?,?,?);', [googleID, name, email], (err, rows) => {
                    if (err) reject(err)
                    pool.query('SELECT * FROM users WHERE google_id = ?', [googleID], (err, rows) => {
                        if (err) reject(err)
                        resolve(rows)
                    })
                })
            }
        })
    })
}

module.exports = findOrCreate