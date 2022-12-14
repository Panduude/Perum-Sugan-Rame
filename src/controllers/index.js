const login = require('./controller-login');
const register = require('./controller-register');
const homeAdmin = require('./controller-home-admin');
const homeWarga = require('./controller-home-warga');
const profile = require('./controller-profile');
const berita = require('./controller-detail-berita');
const editProfileDone = require('./controller-edit-profile-done');
const editProfile = require('./controller-edit-profile');
const kelolaPembayaran = require('./controller-kelola-pembayaran');
const dataPembayaran = require('./controller-data-pembayaran');
const prosesPembayaran = require('./controller-proses-pembayaran');
const donePembayaran = require('./controller-done-pembayaran');
const approvePembayaran = require('./controller-approve-pembayaran');
const doneApprove = require('./controller-done-approve');
const buatAkun = require('./controller-buat-akun');
const simpanAkun = require('./controller-simpan-akun');
const buatPembayaran = require('./controller-buat-pembayaran');
const simpanPembayaran = require('./controller-simpan-pembayaran');
const kelolaKeuangan = require('./controller-kelola-keuangan');

module.exports ={
	login,
	register,
	homeAdmin,
	homeWarga,
	profile,
	berita,
	editProfileDone,
	editProfile,
	kelolaPembayaran,
	dataPembayaran,
	prosesPembayaran,
	donePembayaran,
	approvePembayaran,
	doneApprove,
	buatAkun,
	simpanAkun,
	buatPembayaran,
	simpanPembayaran,
	kelolaKeuangan,
};