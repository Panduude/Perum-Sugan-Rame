
const Pool = require('pg').Pool
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    database: "perum-sr",
    password: "panduude"
})

module.exports = pool