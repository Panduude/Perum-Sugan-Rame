const pool = require("../configs/database");

pool.on("error", (err) => {
    console.error(err);
})

module.exports = {
    kelolaKeuangan(req, res) {
        let id = req.session.userid;
        pool.connect((err, connection) => {
            if (err) {
                throw err;
            }
            connection.query(
                `SELECT * FROM keuangan ORDER BY id_keuangan`,
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    res.render("kelola-keuangan", {
                        url: "http://localhost:5050/",
                        userName: req.session.username,
                        role: req.session.role,
                        keuangan: result.rows
                      })
                }
            )
        })
    }
}