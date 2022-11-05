const { Template } = require("ejs");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  editProfile(req, res) {
    let id = req.session.userid;
    pool.connect( (err, connection)=> {
      if (err) throw err;
      connection.query(
        `SELECT *
        FROM user_bio
        JOIN table_user
        ON user_bio.user_id = table_user.user_id
        WHERE table_user.user_id = $1;`,
        [id],  (error, results)=> {
          if (error) throw error;
          // res.json(results.rows[0].)
          res.render("edit-profile", {
            url: "http://localhost:5050/",
            userName: req.session.username,
            role: req.session.role,
            nama: results.rows[0].nama,
            email: results.rows[0].user_email,
            noktp: results.rows[0].no_ktp,
            notlp: results.rows[0].no_tlp,
            normh: results.rows[0].no_rumah,
            pekerjaan: results.rows[0].pekerjaan,
            ttl: results.rows[0].ttl,
          });
        }
      );
      connection.release();
    });
  },
};
