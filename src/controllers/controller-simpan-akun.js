const { Template } = require("ejs");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  simpanAkun(req, res) {
    let id = req.session.userid;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let role = req.body.role;

    pool.connect((err, connection) => {
      if (err) throw err;
      connection.query(
        `
      INSERT INTO table_user (user_email, user_password, user_role, user_name) VALUES ($1, $2, $3, $4);
      `,
        [email, password, role, username],
        (err, results) => {
          if (err) throw err;
          res.redirect('/buat-akun')
          connection.release();
        }
      )
    });
  },
};
