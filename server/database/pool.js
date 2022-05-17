const mysql = require('mysql')

const pool = mysql.createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
})

module.exports = {pool}