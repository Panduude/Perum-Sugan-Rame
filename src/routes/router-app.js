const router = require('express').Router();
const homeControllerAdmin = require('../controllers').homeAdmin;
const homeControllerWarga = require('../controllers').homeWarga;
const profileController = require('../controllers').profile;
const beritaController = require('../controllers').berita;
const editprofileController = require('../controllers').editProfile;
const editprofiledoneController = require('../controllers').editProfileDone;
const kelolaPembayaranController = require('../controllers').kelolaPembayaran;
const dataPembayaranController = require('../controllers').dataPembayaran;
const prosesPembayaranController = require('../controllers').prosesPembayaran;
const donePembayaranController = require('../controllers').donePembayaran;
const approvePembayaranController = require('../controllers').approvePembayaran;
const doneApproveController = require('../controllers').doneApprove;
const kelolaKeuanganController = require('../controllers').kelolaKeuangan;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeControllerAdmin.homeAdmin);
router.get('/index-admin', verifyUser.isLogin, homeControllerAdmin.homeAdmin);
router.get('/index-warga', verifyUser.isLogin, homeControllerWarga.homeWarga);
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/detail-berita/:id', verifyUser.isLogin, beritaController.berita);
router.post('/edit-profile-done', verifyUser.isLogin, editprofiledoneController.editProfileDone);
router.get('/edit-profile', verifyUser.isLogin, editprofileController.editProfile);
router.get('/kelola-pembayaran', verifyUser.isLogin, kelolaPembayaranController.kelolaPembayaran);
router.get('/data-pembayaran/:id', verifyUser.isLogin, dataPembayaranController.dataPembayaran);
router.get('/proses-pembayaran/:id', verifyUser.isLogin, prosesPembayaranController.prosesPembayaran);
router.get('/done-pembayaran', verifyUser.isLogin, donePembayaranController.donePembayaran);
router.get('/approve-pembayaran', verifyUser.isLogin, approvePembayaranController.approvePembayaran);
router.get('/done-approve/:id', verifyUser.isLogin, doneApproveController.doneApprove);
router.get('/kelola-keuangan', verifyUser.isLogin, kelolaKeuanganController.kelolaKeuangan)

module.exports = router;