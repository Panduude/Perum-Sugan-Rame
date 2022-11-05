const pool = require("../configs/database");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  simpanPembayaran(req, res) {
    let id = req.session.userid;
    let judul = req.body.judulpembayaran;
    let nominal = req.body.nominalpembayaran;
    pool.connect((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(`
        INSERT INTO pembayaran (judul_approve, ket_approve, status_approve) VALUES ($1, $2, false)`, 
        [judul, nominal], (err, results)=>{
            if (err) {
                throw err;
            }
            res.redirect('/approve-pembayaran');
        })
    });
  },
};
