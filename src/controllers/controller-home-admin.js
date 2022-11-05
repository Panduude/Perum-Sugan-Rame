const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  homeAdmin(req, res) {
    let id = req.session.userid;
    pool.connect((err, connection) => {
      if (err) throw err;
      connection.query(`SELECT * FROM berita`,(error, results) => {
          if (error) throw error;
        //   res.json(results.rows)
          res.render("index-admin", {
            url: "http://localhost:5050/",
            userName: req.session.username,
            role: req.session.role,
            berita: results.rows
          })
        });
      connection.release();
    });
  },
};