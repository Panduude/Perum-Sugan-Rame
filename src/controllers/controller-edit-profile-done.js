const { Template } = require("ejs");
const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  editProfileDone(req, res) {
    let id = req.session.userid;
    let nama = req.body.nama;
    let ttl = req.body.ttl;
    let noktp = req.body.ktp;
    let notlp = req.body.tlp;
    let normh = req.body.rmh;
    let pekerjaan = req.body.pekerjaan;

    pool.connect((err, connection) => {
      if (err) throw err;
      connection.query(
        `UPDATE user_bio SET nama = $1, ttl = $2, no_ktp = $3, no_tlp = $4, no_rumah = $5, pekerjaan = $6 WHERE user_id = $7`,
        [nama, ttl, noktp, notlp, normh, pekerjaan, id], (err, results)=>{
            if (err) throw err;
            res.redirect('/profile')
        }
      );connection.release();
    });
  },
};
