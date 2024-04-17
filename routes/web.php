<?php
use function foo\func;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Extruder\ExtruderController;
use App\Http\Controllers\Extruder\ExtruderNet\BenangController;
use App\Http\Controllers\Extruder\ExtruderNet\KonversiController;
use App\Http\Controllers\Extruder\ExtruderNet\MasterController;
use App\Http\Controllers\Extruder\ExtruderNet\OrderController;
use App\Http\Controllers\Extruder\ExtruderNet\PencatatanController;
use App\Http\Controllers\Extruder\BeratKomposisi\BeratController;
use App\Http\Controllers\Extruder\BeratKomposisi\KomposisiController;
use App\Http\Controllers\Extruder\WarehouseTerima\WarehouseController;
use function PHPUnit\Framework\assertDirectoryIsReadable;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    if (Auth::guest())
        return view('auth/login');
    else
        return redirect('/home');
});

//Auth::routes();

Route::get('/test', 'App\Http\Controllers\testController@index'); //untuk registrasi user password

Route::get('/login', 'App\Http\Controllers\LoginController@index')->name('login');
Route::post('Register', 'App\Http\Controllers\LoginController@Register')->name('register');
Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout')->name('logout');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', 'App\Http\Controllers\HomeController@index')->name('home');

    #region Beli
    Route::get('Beli', 'App\Http\Controllers\HomeController@Beli');

    Route::resource('ListOrder', App\Http\Controllers\Beli\Transaksi\ListOrderController::class);
    Route::resource('DaftarHarga', App\Http\Controllers\Beli\Informasi\DaftarHargaController::class);
    Route::resource('Approve', App\Http\Controllers\Beli\Transaksi\ApproveController::class);
    Route::resource('FinalApprove', App\Http\Controllers\Beli\Transaksi\FinalApproveController::class);
    Route::resource('MaintenanceOrderPembelian', App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController::class);
    Route::resource('CariType', App\Http\Controllers\Beli\Informasi\CariTypeController::class);
    Route::resource('Supplier', App\Http\Controllers\Beli\Master\SupplierController::class);
    Route::resource('HistoryPembelianMaster', App\Http\Controllers\Beli\Master\HistoryPembelianMasterController::class);
    Route::resource('MaintenanceKodeBarang', App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController::class);
    Route::resource('BatalTransfer', App\Http\Controllers\Beli\Master\BatalTransferController::class);
    Route::resource('PurchaseOrder', App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class);
    Route::resource('IsiSupplierHarga', App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController::class);
    Route::resource('ReturBTTB', App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController::class);
    Route::resource('IsiBeaImpor', App\Http\Controllers\Beli\TransaksiBeli\IsiBeaController::class);
    Route::resource('CreateBTTB', App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController::class);
    Route::resource('KoreksiStatusBeli', App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController::class);
    Route::resource('ListOrderSudahAppManager', App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController::class);
    Route::resource('TransferBarang', App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController::class);
    Route::get('/IsiSupplierHarga/{id}/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@redisplay')->name('isisupplierharga.redisplay');
    Route::post('/Supplier/{id}', 'App\Http\Controllers\Beli\Master\SupplierController@destroy')->name('supplier.destroy');
    Route::get('/options/supplierselect/{id}', 'App\Http\Controllers\Beli\Master\SupplierController@getSupplier');
    Route::get('/HistoryPembelianMasterRedisplay', 'App\Http\Controllers\Beli\Master\HistoryPembelianMasterController@redisplay')->name('historypembelianmaster.redisplay');
    Route::get('/Maintenance/KodeBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@kodeBarang')->name('maintenancekodebarang.kodebarang');
    Route::get('/Maintenance/Data', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@data')->name('maintenancekodebarang.data');
    Route::get('/Maintenance/Kategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@kategori')->name('maintenancekodebarang.kategori');
    Route::get('/Maintenance/SubKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@subKategori')->name('maintenancekodebarang.subkategori');
    Route::get('/Maintenance/NamaBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@namaBarang')->name('maintenancekodebarang.namabarang');
    Route::get('/Maintenance/CekNamaBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@cekNamaBarang')->name('maintenancekodebarang.ceknamabarang');
    Route::post('/Maintenance/TambahKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@tambahKategori')->name('maintenancekodebarang.tambahkateegori');
    Route::post('/Maintenance/Isi', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@isi')->name('maintenancekodebarang.isi');
    Route::post('/Maintenance/Koreksi', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@koreksi')->name('maintenancekodebarang.koreksi');
    Route::post('/Maintenance/ProsesHapus', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@prosesHapus')->name('maintenancekodebarang.hapus');
    Route::post('/Maintenance/TambahSubKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@tambahSubKategori')->name('maintenancekodebarang.tambahsubkategori');
    Route::post('/BatalTransfer/Proses', 'App\Http\Controllers\Beli\Master\BatalTransferController@batal')->name('bataltransfer.proses');
    Route::get('/GETPurchaseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@redisplay');
    Route::get('/GETOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@display');
    Route::get('/GETPost', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@show1');
    Route::get('/GETabel', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@showtbl');
    Route::get('/OpenReviewPO', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reviewPO');
    Route::put('/OpenReviewPO/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@printReviewPO');
    Route::get('/OpenReviewBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reviewBTTB');
    Route::put('/OpenReviewBTTB/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@printReviewBTTB');
    Route::post('/PurchaseOrder/Cancel/Close', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@cancel');
    Route::post('/PurchaseOrder/Cancel/Close1', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@cancel1');
    Route::get('/get/dataPermohonanDivisi/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisi');
    Route::get('/get/dataPermohonanUser/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUser');
    Route::get('/get/dataPermohonanOrder/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrder');
    Route::get('/get/dataPermohonanDivisiNyantol/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisiNyantol');
    Route::get('/get/dataPermohonanUserNyantol/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUserNyantol');
    Route::get('/get/dataPermohonanOrderNyantol/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrderNyantol');
    Route::put('/PurchaseOrderr/create/CloseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@closeOrder');
    Route::put('/PurchaseOrderr/create/BackCreatePO', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@backCreatePO');
    Route::get('/openFormCreateSPPB/create', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@openFormCreateSPPB');
    Route::get('/openFormCreateSPPB/create/DaftarSupplier', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@daftarSupplier');
    Route::get('/openFormCreateSPPB/create/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@print');
    Route::post('/openFormCreateSPPB/create/Submit', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@submit');
    Route::put('/openFormCreateSPPB/create/Update', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@update');
    Route::put('/openFormCreateSPPB/create/Remove', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@remove');
    Route::put('/openFormCreateSPPB/create/Reject', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reject');
    Route::put('/openFormCreateSPPB/create/Post', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@post');
    Route::put('/IsiSupplierHarga/{id}/Approve', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@approve')->name('isisupplierharga.approve');
    Route::get('/IsiSupplierHarga/{id}/DaftarData', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@daftarData')->name('isisupplierharga.daftardata');
    Route::get('/IsiSupplierHarga/{id}/DaftarSupplier', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@daftarSupplier')->name('isisupplierharga.daftarsupplier');
    Route::put('/IsiSupplierHarga/{id}/Reject', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@reject')->name('isisupplierharga.reject');
    Route::get('/RReturBTTB/Display', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@po');
    Route::get('/RReturBTTB/GETRetur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@kdbrg');
    Route::get('/RReturBTTB/checkInvPenyesuaian', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@checkInvPenyesuaian');
    Route::post('/RReturBTTB/InvInsertTmp', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@invInsertTmp');
    Route::post('/RReturBTTB/AccHangus', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@accHangus');
    Route::put('/RReturBTTB/Batal', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@batal');
    Route::put('/RReturBTTB/Retur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@retur');
    Route::get('/Create', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@createbttb');
    Route::get('/Drop1', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@drop1');
    Route::get('/GetTabel', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@drop1');
    Route::get('/CCreateBTTB/CreateNoBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@createNoBTTB');
    Route::get('/CCreateBTTB/SetStatusPO', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@setStatusPO');
    Route::get('/CCreateBTTB/Print', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@print');
    Route::post('/CCreateBTTB/PostData', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@post');
    Route::get('/TransferBrg/Divisi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@divisi')->name('transferbarang.divisi');
    Route::get('/TransferBrg/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@redisplay')->name('transferbarang.redisplay');
    Route::get('/TransferBarang/TransferBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@show');
    Route::get('/TransferBarang/TransferBTTB/LoadData', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadData')->name('transferbttb.loaddata');
    Route::get('/TransferBarang/TransferBTTB/LoadSatuan', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadSatuan')->name('transferbttb.loadsatuan');
    Route::get('/TransferBarang/TransferBTTB/DataDivisi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@divisiBTTB')->name('transferbttb.datadivisi');
    Route::get('/TransferBarang/TransferBTTB/DataObjek', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@objek')->name('transferbttb.dataobjek');
    Route::get('/TransferBarang/TransferBTTB/LoadKelomDLL', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadKelomDLL')->name('transferbttb.loadkelomdll');
    Route::put('/TransferBarang/TransferBTTB/Koreksi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@koreksi')->name('transferbttb.koreksi');
    Route::post('/TransferBarang/TransferBTTB/Transfer', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@transfer')->name('transferbttb.transfer');
    Route::get('/StatusBeli/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController@redisplay')->name('koreksistatusbeli.redisplay');
    Route::post('/StatusBeli/Update', 'App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController@update')->name('koreksistatusbeli.update');
    Route::get('/ListOrderAppManager/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@redisplay')->name('listordersudahappmanager.redisplay');
    Route::get('/ListOrderAppManager/RedisplayNoOrder', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@redisplayNoOrder')->name('listordersudahappmanager.redisplayNoOrder');
    Route::get('/ListOrderAppManager/Divisi', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@divisi')->name('listordersudahappmanager.divisi');
    Route::get('/ListOrder/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@show')->name('listorder.show');
    Route::get('/ListOrder/{divisi}/{tglAwal}/{tglAkhir}/{Me}/Filter', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@Filter')->name('listorder.filter');
    Route::get('/Approve/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ApproveController@show')->name('approve.show');
    Route::post('/Approve/{id}/up', 'App\Http\Controllers\Beli\Transaksi\ApproveController@update')->name('approve.update');
    Route::get('/FinalApprove/{id}/show', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@show')->name('finalapprove.show');
    Route::post('/FinalApprove/{id}/up', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@update')->name('finalapprove.update');
    Route::get('/MaintenanceOrderPembeliann/CekNoTrans', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekNoTrans')->name('maintenanceorderpembelian.ceknotrans');
    Route::get('/MaintenanceOrderPembeliann/KodeBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kodeBarang')->name('maintenanceorderpembelian.kodebarang');
    Route::get('/MaintenanceOrderPembeliann/Data', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@data')->name('maintenanceorderpembelian.data');
    Route::get('/MaintenanceOrderPembeliann/Kategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kategori')->name('maintenanceorderpembelian.kategori');
    Route::get('/MaintenanceOrderPembeliann/SubKategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@subKategori')->name('maintenanceorderpembelian.subkategori');
    Route::get('/MaintenanceOrderPembeliann/KodeBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kodeBarang')->name('maintenanceorderpembelian.kodebarang');
    Route::get('/MaintenanceOrderPembeliann/Data', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@data')->name('maintenanceorderpembelian.data');
    Route::get('/MaintenanceOrderPembeliann/Kategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kategori')->name('maintenanceorderpembelian.kategori');
    Route::get('/MaintenanceOrderPembeliann/SubKategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@subKategori')->name('maintenanceorderpembelian.subkategori');
    Route::get('/MaintenanceOrderPembeliann/NamaBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@namaBarang')->name('maintenanceorderpembelian.namabarang');
    Route::get('/MaintenanceOrderPembeliann/Golongan', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@golongan')->name('maintenanceorderpembelian.golongan');
    Route::get('/MaintenanceOrderPembeliann/MesinGolongan', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@mesinGolongan')->name('maintenanceorderpembelian.mesingolongan');
    Route::get('/MaintenanceOrderPembeliann/Saldo', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@saldo')->name('maintenanceorderpembelian.saldo');
    Route::get('/MaintenanceOrderPembeliann/CekNoTrans', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekNotrans')->name('maintenanceorderpembelian.ceknotrans');
    Route::post('/MaintenanceOrderPembeliann/Save', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@save')->name('maintenanceorderpembelian.save');
    Route::put('/MaintenanceOrderPembeliann/Submit', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@submit')->name('maintenanceorderpembelian.submit');
    Route::delete('/MaintenanceOrderPembeliann/Delete', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@delete')->name('maintenanceorderpembelian.delete');
    Route::get('/DaftarHargaRedisplay', 'App\Http\Controllers\Beli\Informasi\DaftarHargaController@redisplay')->name('daftarharga.redisplay');
    Route::get('/CariTypeSearch', 'App\Http\Controllers\Beli\Informasi\CariTypeController@searchData')->name('caritype.search');
    #endregion

    #region Sales
    Route::get('Sales', 'App\Http\Controllers\HomeController@Sales');

    Route::resource('Customer', App\Http\Controllers\Sales\Master\CustomerController::class);
    Route::get('/Customer/{id}/show', 'App\Http\Controllers\Sales\Master\CustomerController@show')->name('customer.show');
    Route::post('/Customer/{id}/up', 'App\Http\Controllers\Sales\Master\CustomerController@update')->name('customer.update');
    // Route::get('Sales/Master/Customer/getDetail/{idcust}', 'ControllerCustomer@getDetail');
    Route::get('Customer/{IDCust}', 'CustomerController@show');
    Route::post('/Customer/{id}', 'App\Http\Controllers\Sales\Master\CustomerController@destroy')->name('customer.destroy');
    Route::post('getallcustomer', 'App\Http\Controllers\Sales\Master\CustomerController@getallcustomer');
    Route::resource('Billing', App\Http\Controllers\Sales\Master\BillingController::class);
    Route::get('/Billing/{id}/show', 'App\Http\Controllers\Sales\Master\BillingController@show')->name('billing.show');
    Route::post('/Billing/{id}/up', 'App\Http\Controllers\Sales\Master\BillingController@update')->name('billing.update');
    Route::get('Billing/{IDCust}', 'BillingController@show');
    Route::post('/Billing/{id}', 'App\Http\Controllers\Sales\Master\BillingController@destroy')->name('billing.destroy');
    Route::resource('Expeditor', App\Http\Controllers\Sales\Master\ExpeditorController::class);
    Route::get('/Expeditor/{id}/show', 'App\Http\Controllers\Sales\Master\ExpeditorController@show')->name('expeditor.show');
    Route::post('/Expeditor/{id}/up', 'App\Http\Controllers\Sales\Master\ExpeditorController@update')->name('expeditor.update');
    Route::get('Expeditor/{IDCust}', 'ExpeditorController@show');
    Route::post('/Expeditor/{id}', 'App\Http\Controllers\Sales\Master\ExpeditorController@destroy')->name('expeditor.destroy');
    Route::resource('SuratPesanan', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController::class);
    Route::resource('SuratPesananManager', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController::class);
    // Route::resource('SuratPesananDirektur', SuratPesananDirekturController::class);
    Route::resource('PenyesuaianSuratPesanan', App\Http\Controllers\Sales\Transaksi\SuratPesanan\PenyesuaianSuratPesananController::class);
    //Route::get('SuratPesanan', [SuratPesananController::class, 'index'])->name('suratpesanan.index');
    Route::get('/SuratPesanan/{id}/show', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@show')->name('suratpesanan.show');
    Route::post('/SuratPesanan/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@update')->name('suratpesanan.update');
    Route::get('/editSP/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@edit')->name('suratpesanan.edit');
    Route::get('/SuratPesanan/createRobby', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@createRobby');
    Route::get('SuratPesanan/{IDCust}', 'SuratPesananController@show');
    Route::post('/SuratPesanan/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@destroy')->name('suratpesanan.destroy');
    Route::post('/SuratPesananManager/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@update')->name('suratpesananmanager.update');
    Route::post('/SuratPesananManager/upall', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@updateAll');
    Route::get('/SuratPesananManager/penyesuaian/suratpesanan', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@penyesuaian');
    Route::get('/penyesuaian/{suratPesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@getPenyesuaianSP');
    Route::post('/penyesuaiansp/koreksi', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@koreksiPenyesuaianSP');
    Route::post('/penyesuaiansp/batalsp', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@batalspPenyesuaianSP');
    Route::post('/batalsplokal/{nosp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@batalspPenyesuaianSP');
    Route::post('/SuratPesananManager/upPenyesuaian', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@updatePenyesuaian');
    Route::get('/options/kategori/{kategoriUtama}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getKategori');
    Route::get('/options/subKategori/{kategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSubKategori');
    Route::get('/options/namaBarang/{subKategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getNamaBarang');
    Route::get('/options/namaBarangExport/{subKategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getNamaBarangExport');
    Route::get('/satuan/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSatuanBarang');
    Route::get('/satuan1/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSatuanBarang1');
    Route::get('/displaybarang/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getDisplayBarang');
    Route::get('/saldoinventory/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSaldoInventory');
    Route::get('/beratstandard/{kode_barang}', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getBeratStandard');
    Route::get('/deletedetail/{id_pesanan}', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@deleteDetailPesanan');
    // Route::post('/tambahmantap', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@store');
    // Route::post('/submit-form', [SuratPesananController::class, 'submitForm']);
    Route::post('splokal', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@splokal')->name('splokal');
    // Route::any('splokal', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@splokal')->name('splokal');
    Route::resource('SuratPesananEkspor', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController::class);
    Route::get('/options/spekspor/kelompok/{kelompokUtama}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getKelompok');
    Route::get('/options/spekspor/subKelompok/{kelompok}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getSubKelompok');
    Route::get('/options/spekspor/namaBarang/{subKelompok}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getNamaBarang');
    Route::get('/options/spekspor/kodeBarang/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getKodeBarang');
    Route::get('/options/spekspor/isiSatuan/{idtype}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@isiSatuanInv');
    Route::get('/cekNoSPEkspor/{noSp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@cekNoSP');
    Route::get('/displaybarangekspor/{idtype}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@getDisplayBarangEkspor');
    Route::get('/deleteDetailBarangEksport/{idpesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@deleteDetailBarangEksport');
    Route::post('spekspor', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@spekspor')->name('spekspor');
    Route::post('penyesuaianEkspor/{noSp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@penyesuaian')->name('penyesuaianEkspor');
    Route::post('batalSPEkspor/{noSp}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananEksportController@batalSP')->name('batalSPEkspor');
    Route::resource('DeliveryOrder', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController::class);
    Route::resource('DeliveryOrderManager', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController::class);
    Route::resource('InputPEB', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\InputPEBController::class);
    Route::post('/DeliveryOrder/{id}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@destroy')->name('deliveryorder.destroy');
    Route::post('/DeliveryOrder/{id}/up', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@update')->name('deliveryorder.update');
    Route::post('/DeliveryOrderManager/up', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController@update')->name('deliveryordermanager.update');
    Route::get('/DeliveryOrderManager/BatalDo/index', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController@indexDestroy')->name('deliveryordermanager.destroy');
    Route::post('/DeliveryOrderManager/destroy', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController@destroy');
    Route::get('/options/nomorsp/{customer}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getSuratPesanan');
    Route::get('/options/id_pesanan/{nomor_sp}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getIdPesanan');
    Route::get('/options/barang/{id_pesanan}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getBarang');
    Route::get('/options/kelompokutama/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getKelompokUtama');
    Route::get('/options/kelompok/{kelompokUtama}/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getKelompok');
    Route::get('/options/subkelompok/{kelompokUtama}/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getSubKelompok');
    Route::get('/options/saldo/{subKelompok}/{kodeBarang}', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getSaldo');
    Route::get('/options/nomorDO', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController@getNomorDeliveryOrder');
    Route::post('dopeb', 'App\Http\Controllers\Sales\Transaksi\DeliveryOrder\InputPEBController@dopeb')->name('dopeb');
    Route::resource('SuratJalan', App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController::class);
    Route::resource('SuratJalanManager', App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanManagerController::class);
    Route::resource('PascaKirim', App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController::class);
    Route::post('/SuratJalan/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@destroy')->name('suratjalan.destroy');
    Route::post('/SuratJalan/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@update')->name('suratjalan.update');
    Route::post('/SuratJalanManager/up', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanManagerController@update')->name('suratjalanmanager.update');
    Route::get('/options/suratpesanan/{customer}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getSuratPesanan');
    Route::get('/options/deliveryorder/{suratpesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getDeliveryOrder');
    Route::get('/options/customer/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getCustomer');
    Route::get('/options/pascakirimsp/{customer}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController@getSuratPesanan');
    Route::get('/options/barangpesanan/{suratpesanan}/{suratjalan}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController@getBarangPesanan');
    Route::get('/options/returkirim/{kodebarang}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\PascaKirimController@getReturKirim');
    Route::get('/options/nomorSJ', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getNomorSuratJalan');
    Route::get('/options/editSJ/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratJalan\SuratJalanController@getDetailSuratJalan');
    Route::resource('CetakSP', App\Http\Controllers\Sales\Cetak\CetakSPController::class);
    Route::resource('CetakDO', App\Http\Controllers\Sales\Cetak\CetakDOController::class);
    Route::resource('CetakSJ', App\Http\Controllers\Sales\Cetak\CetakSJController::class);
    Route::resource('CetakSPEkspor', App\Http\Controllers\Sales\Cetak\CetakSPEksportController::class);
    Route::resource('CetakPI', App\Http\Controllers\Sales\Cetak\CetakPIController::class);
    Route::get('/nosp/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getSuratPesananSelect');
    Route::get('/nospeksport/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSPEksportController@getSuratPesananSelect');
    Route::get('/nopieksport/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakPIController@getSuratPesananSelect');
    Route::get('/jenisspekspor/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakSPEksportController@getSuratPesananText');
    Route::get('/jenispiekspor/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakPIController@getSuratPesananText');
    Route::get('/text/suratpesanan/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getSuratPesananText');
    Route::get('/options/jenissp/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getJenisSp');
    Route::get('/viewprint/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getViewPrint');
    Route::get('/viewprinteksport/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakSPEksportController@getViewPrint');
    Route::get('/viewprintpi/{no_spValue}', 'App\Http\Controllers\Sales\Cetak\CetakPIController@getViewPrint');
    // Route::get('/print/suratpesanan/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@printSuratPesanan');
    Route::get('/dosudahacc/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@getDeliveryOrderSudahACC');
    Route::get('/dobelumacc/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@getDeliveryOrderBelumACC');
    // Route::get('/print/deliveryorder/{nodo}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@printDeliveryOrder');
    Route::get('/optionsCetakSuratJalan/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@getSuratJalan');
    // Route::get('/print/suratjalan/{nosj}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@printSuratJalan');
    Route::get('/cetakSuratJalanPPN/{tanggal}/{nosj}/{jenissj}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@getDataCetakSuratJalan');
    Route::resource('CariBarcode', App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController::class);
    Route::get('/cariBarcodeIdTypeDispresiasi/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@getIdTypeDispresiasi');
    Route::get('/cariBarcodeIdTypeTmpGudang/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@getIdTypeTmpGudang');
    Route::POST('/cariBarcodeFilter/action', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@cariBarcodeFilter');
    Route::resource('BarcodeKerta2', App\Http\Controllers\Sales\ToolPenjualan\BarcodeKerta2Controller::class);
    Route::resource('BatalJual', App\Http\Controllers\Sales\ToolPenjualan\BatalJualController::class);
    Route::get('/batalJualInputBarcode/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\BatalJualController@getInputBarcode');
    Route::post('/BatalJual/up', 'App\Http\Controllers\Sales\ToolPenjualan\BatalJualController@update')->name('bataljual.update');
    Route::resource('GantiRPM', App\Http\Controllers\Sales\ToolPenjualan\GantiRPMController::class);
    Route::resource('HapusCIR', App\Http\Controllers\Sales\ToolPenjualan\HapusCIRController::class);
    Route::resource('PenjualanBarcode', App\Http\Controllers\Sales\ToolPenjualan\PenjualanBarcodeController::class);
    Route::resource('PenjualanNyangkut', App\Http\Controllers\Sales\ToolPenjualan\PenjualanNyangkutController::class);
    Route::resource('SetengahJadiNyangkut', App\Http\Controllers\Sales\ToolPenjualan\SetengahJadiNyangkutController::class);
    Route::resource('ScanBarcode', App\Http\Controllers\Sales\Penjualan\ScanBarcodeController::class);
    Route::get('/scanBarcodeLihatData/{date}', 'App\Http\Controllers\Sales\Penjualan\ScanBarcodeController@scanBarcodeLihatData');
    Route::get('/scanBarcodeDetailData/{idType}/{kodeBarang}/{tglMutasi}', 'App\Http\Controllers\Sales\Penjualan\ScanBarcodeController@scanBarcodeDetailData');
    Route::resource('BarcodeJual', App\Http\Controllers\Sales\Penjualan\BarcodeJualController::class);
    Route::resource('AccPenjualan', App\Http\Controllers\Sales\Penjualan\AccPenjualanController::class);
    Route::delete('AccPenjualan/{kodebarang}/{noindeks}', 'App\Http\Controllers\Sales\Penjualan\AccPenjualanController@destroy');
    Route::get('/accPenjualanTampilData/{idtransaksi}', 'App\Http\Controllers\Sales\Penjualan\AccPenjualanController@accPenjualanTampilData');
    Route::get('/accPenjualanTampilBarcode/{IdType}/{KodeBarang}', 'App\Http\Controllers\Sales\Penjualan\AccPenjualanController@accPenjualanTampilBarcode');
    Route::resource('AccPenjualanCloth', App\Http\Controllers\Sales\Penjualan\AccPenjualanClothController::class);
    #endregion

    #region EDP
    Route::get('/EDP', 'App\Http\Controllers\HomeController@EDP');

    Route::resource('User', App\Http\Controllers\UserController::class);
    Route::post('/User/{id}/up', 'App\Http\Controllers\UserController@update')->name('user.update');
    Route::get('/User/{id}/EditAdmin', 'App\Http\Controllers\UserController@EditAdmin')->name('user.EditAdmin');
    Route::resource('Cartridge', App\Http\Controllers\EDP\CartridgeController::class);
    Route::post('/Cartridge/{id}/up', 'App\Http\Controllers\EDP\CartridgeController@update')->name('cartridge.update');
    Route::resource('PerbaikanCartridge', App\Http\Controllers\EDP\PerbaikanCartridgeController::class);
    Route::get('/PerbaikanCartridge/{id}/show', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@show')->name('perbaikancartridge.show');
    Route::post('/PerbaikanCartridge/{id}/AddCartridgeRefill', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@AddRefill')->name('perbaikancartridge.addrefill');
    Route::get('/PerbaikanCartridge/{id}/{IdCartridge}/{IdPerbaikan}/DelRefill', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@DelCartridgeRefill')->name('perbaikancartridge.DelCartridgeRefill');
    Route::post('/PerbaikanCartridge/{id}/up', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@update')->name('perbaikancartridge.update');
    Route::post('/PerbaikanCartridge/AddService', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@AddService')->name('perbaikancartridge.addservice');
    Route::get('/PerbaikanCartridge/{id}/DetailRefill', 'App\Http\Controllers\EDP\PerbaikanCartridgeController@DetailRefill')->name('perbaikancartridge.DetailRefill');
    Route::resource('Jurnal', App\Http\Controllers\EDP\JurnalController::class);
    Route::get('/Jurnal/{id}/show', 'App\Http\Controllers\EDP\JurnalController@show')->name('jurnal.show');
    Route::post('/Jurnal/{id}/up', 'App\Http\Controllers\EDP\JurnalController@update')->name('jurnal.update');
    Route::get('/Jurnal/{id}/del', 'App\Http\Controllers\EDP\JurnalController@destroy')->name('jurnal.destroy');
    Route::post('/Jurnal/{id}/InputKelompok', 'App\Http\Controllers\EDP\JurnalController@InputKelompok');
    Route::post('/Jurnal/AddKelompok', 'App\Http\Controllers\EDP\JurnalController@storeKelompok');
    Route::post('/Jurnal/Kelompok/{id}/up', 'App\Http\Controllers\EDP\JurnalController@updateKelompok')->name('kelompok.update');
    Route::post('/Jurnal/AddKategori', 'App\Http\Controllers\EDP\JurnalController@storeKategori');
    Route::post('/Jurnal/Kategori/{id}/up', 'App\Http\Controllers\EDP\JurnalController@updateKategori')->name('kategori.update');
    Route::get('/Jurnal/{tglAwal}/{tglAkhir}/Filter', 'App\Http\Controllers\EDP\JurnalController@Filter')->name('jurnal.filter');
    Route::resource('MaintenanceHakAkses', App\Http\Controllers\EDP\MaintenanceHakAksesController::class);
    Route::get('/AllFitur/{IdProgram}/{NomorPegawai}', 'App\Http\Controllers\EDP\MaintenanceHakAksesController@getAllFitur');
    Route::post('/AllFitur/edit', 'App\Http\Controllers\EDP\MaintenanceHakAksesController@EditUserFitur');
    Route::resource('PerbaikanUjiCobaFitur', App\Http\Controllers\EDP\PerbaikanUjiCobaFiturController::class);
    Route::resource('Computer', App\Http\Controllers\EDP\ComputerController::class);
    Route::post('/Computer/TambahSWAL', 'App\Http\Controllers\EDP\ComputerController@TambahSWAL')->name('computer.TambahSWAL');
    Route::post('/Computer/{id}', 'App\Http\Controllers\EDP\ComputerController@destroy')->name('computer.destroy');
    // Route::get('/Computer/FetchOperatingSystems', 'App\Http\Controllers\EDP\ComputerController@FetchOperatingSystems')->name('computer.FetchOperatingSystems');
    #endregion

    /* EXTRUDER */
    #region ExtruderNet
    Route::get('/Extruder/{pageName?}', [ExtruderController::class, 'index']);
    Route::get('/Extruder/WarehouseTerima/{formName?}', [WarehouseController::class, 'index']);
    Route::get('/Extruder/{pageName?}/{formName?}', [ExtruderController::class, 'index']);
    Route::get('/Extruder/Extruder/Master/{formName?}/{namaGedung?}', [MasterController::class, 'index']);
    Route::get('/Extruder/Extruder/Order/{formName?}/{namaGedung?}', [OrderController::class, 'index']);
    Route::get('/Extruder/Extruder/Konversi/{formName?}/{namaGedung?}', [KonversiController::class, 'index']);
    Route::get('/Extruder/Extruder/Benang/{formName?}/{namaGedung?}', [BenangController::class, 'index']);
    Route::get('/Extruder/Extruder/Catat/{formName?}', [PencatatanController::class, 'index']);
    #endregion

    Route::get('/beratStandar/{fun_str}/{fun_data}', [BeratController::class, 'beratStandar']);
    Route::get('/komposisiKonversi/{fun_str}/{fun_data}', [KomposisiController::class, 'komposisiKonversi']);
    Route::get('/warehouseTerima/{fun_str}/{fun_data}', [WarehouseController::class, 'warehouseTerima']);

    #region ExtruderNet - Master (KITE)
    Route::get('/Master/getCekBahanKite/{kode}', [MasterController::class, 'getCekBahanKite']);
    Route::get('/Master/getKiteExtruder/{kode}/{tgl_start?}/{kode_barang?}/{jenis_fas?}/{bahan_pp?}/{benang?}/{meter?}/{roll?}/{meter_awal?}/{hasil?}/{id_order?}/{caco3?}', [MasterController::class, 'getKiteExtruder']);
    Route::get('/Master/getKiteExtOrder/{kode}/{id_order}', [MasterController::class, 'getKiteExtOrder']);
    Route::get('/Master/getKiteExtruder7/{id_order}/{tgl_start}/{bahan_pp}/{caco3}/{benang}', [MasterController::class, 'getKiteExtruder7']);
    #endregion

    #region ExtruderNet - Master (Tropodo)
    Route::get('/Master/getListKomposisiBahan/{id_komposisi}', [MasterController::class, 'getListKomposisiBahan']);
    Route::get('/Master/getDetailBahan/{id_type}', [MasterController::class, 'getDetailBahan']);
    Route::get('/Master/getListKomposisi/{id_divisi}/{id_komposisi?}', [MasterController::class, 'getListKomposisi']);
    Route::get('/Master/getListMesin/{kode}', [MasterController::class, 'getListMesin']);
    Route::get('/Master/getIdDivisiObjek/{id_divisi}', [MasterController::class, 'getIdDivisiObjek']);
    Route::get('/Master/getIdObjekKelompokUtama/{id_objek}/{type?}', [MasterController::class, 'getIdObjekKelompokUtama']);
    Route::get('/Master/getIdKelompokUtamaKelompok/{id_kelompok_utama}/{type?}', [MasterController::class, 'getIdKelompokUtamaKelompok']);
    Route::get('/Master/getCekKelompokMesin/{id_kel}', [MasterController::class, 'getCekKelompokMesin']);
    Route::get('/Master/getIdKelompokSubKelompok/{id_kelompok}', [MasterController::class, 'getIdKelompokSubKelompok']);
    Route::get('/Master/getIdSubKelompokType/{id_sub_kelompok}', [MasterController::class, 'getIdSubKelompokType']);
    Route::get('/Master/getCekKonversi/{id_komposisi}/{id_type}', [MasterController::class, 'getCekKonversi']);
    Route::get('/Master/getCekKomposisi/{id}', [MasterController::class, 'getCekKomposisi']);
    Route::get('/Master/getIdMesin/{id_kel}', [MasterController::class, 'getIdMesin']);

    Route::get('/Master/insKomposisiBahan/{id_komposisi}/{id_objek}/{nama_objek}/{id_kelompok_utama}/{nama_kelompok_utama}/{id_kelompok}/{nama_kelompok}/{id_sub_kelompok}/{nama_sub_kelompok}/{id_type}/{nama_type}/{kd_brg?}/{jumlah_primer}/{sat_primer?}/{jumlah_sekunder}/{sat_sekunder?}/{jumlah_tritier}/{sat_tritier?}/{persentase}/{status_type}/{cadangan?}', [MasterController::class, 'insKomposisiBahan']);
    Route::get('/Master/insMasterKomposisi/{nama_komposisi}/{id_mesin}/{id_divisi}', [MasterController::class, 'insMasterKomposisi']);
    Route::get('/Master/getMasterKomposisi/{id_divisi}', [MasterController::class, 'getMasterKomposisi']);

    Route::get('/Master/updIdKomposisiCounter/{id_divisi}', [MasterController::class, 'updIdKomposisiCounter']);

    Route::get('/Master/delMasterKomposisi/{id_komposisi}', [MasterController::class, 'delMasterKomposisi']);
    Route::get('/Master/delKomposisiBahan1/{id_komposisi}/{id_type}', [MasterController::class, 'delKomposisiBahan1']);
    Route::get('/Master/delKomposisiBahan/{id_komposisi}', [MasterController::class, 'delKomposisiBahan']);
    #endregion

    #region ExtruderNet - Master (Mojosari)
    Route::get('/Master/getListKomposisiBahanMjs/{id_komposisi}', [MasterController::class, 'getListKomposisiBahanMjs']);
    Route::get('/Master/getCekJumlahKomposisi/{kode}/{id_komposisi}/{id_kelompok?}/{jns?}/{persentase?}', [MasterController::class, 'getCekJumlahKomposisi']);
    Route::get('/Master/getPrgBomBarang/{kode}/{kode_barang?}/{id_komposisi?}/{id_kelompok?}/{id_divisi?}/{mesin?}', [MasterController::class, 'getPrgBomBarang']);
    Route::get('/Master/getPrgTypeProduksi/{kode}/{id_kelut}', [MasterController::class, 'getPrgTypeProduksi']);

    Route::get('/Master/insKomposisiBahanMjs/{kode}/{id_komposisi}/{id_type?}/{kd_brg?}/{id_divisi?}/{persentase?}/{primer?}/{sekunder?}/{tritier?}/{cadangan?}/{tmp_tritir?}/{id_type1?}', [MasterController::class, 'insKomposisiBahanMjs']);

    Route::get('/Master/delKomposisiBahanMjs/{id_komposisi}', [MasterController::class, 'delKomposisiBahanMjs']);
    #endregion

    #region ExtruderNet - Form Bagian Order
    Route::get('/Order/getListBenang/{kode}', [OrderController::class, 'getListBenang']);
    Route::get('/Order/insOrderBenang/{gedung}/{tanggal}/{identifikasi}/{kode?}', [OrderController::class, 'insOrderBenang']);
    Route::get('/Order/getNoOrder/{kode?}', [OrderController::class, 'getNoOrder']);
    Route::get('/Order/getNoOrderMjs/', [OrderController::class, 'getNoOrderMjs']);
    Route::get('/Order/insOrderDetail/{id_order}/{type_benang}/{jmlh_primer}/{jmlh_sekunder}/{jmlh_tritier}/{prod_primer}/{prod_sekunder}/{prod_tritier}', [OrderController::class, 'insOrderDetail']);
    Route::get('/Order/updCounterOrder/{id_divisi}', [OrderController::class, 'updCounterOrder']);

    Route::get('/Order/getOrderBlmAcc/{divisi}', [OrderController::class, 'getOrderBlmAcc']);
    Route::get('/Order/getListSpek/{id_order}', [OrderController::class, 'getListSpek']);
    Route::get('/Order/updAccOrder/{id_order}', [OrderController::class, 'updAccOrder']);

    Route::get('/Order/getListBatalOrd/{id_divisi}', [OrderController::class, 'getListBatalOrd']);
    Route::get('/Order/getListOrderBtl/{id_order}', [OrderController::class, 'getListOrderBtl']);
    Route::get('/Order/updStatusOrder/{id_order}/{status}/{ket}', [OrderController::class, 'updStatusOrder']);
    #endregion

    #region ExtruderNet - Form Konversi Mohon
    Route::get('/Konversi/getListKomposisiBahan/{id_komposisi}', [KonversiController::class, 'getListKomposisiBahan']);
    Route::get('/Konversi/getSatuan/{id_type}', [KonversiController::class, 'getSatuan']);
    Route::get('/Konversi/getSaldoBarang/{id_type}', [KonversiController::class, 'getSaldoBarang']);
    Route::get('/Konversi/getDataKonversi/{id_konversi}', [KonversiController::class, 'getDataKonversi']);
    Route::get('/Konversi/getListDetailKonversi/{id_konversi}', [KonversiController::class, 'getListDetailKonversi']);
    Route::get('/Konversi/getListKonversi/{id_divisi}/{kode?}/{datetime?}', [KonversiController::class, 'getListKonversi']);
    Route::get('/Konversi/getIdKonversiInv/{id_konversi}', [KonversiController::class, 'getIdKonversiInv']);
    Route::get('/Konversi/getListMesin/{kode}', [KonversiController::class, 'getListMesin']);
    Route::get('/Konversi/getOrdAccBlmSelesai/{divisi}', [KonversiController::class, 'getOrdAccBlmSelesai']);
    Route::get('/Konversi/getListKomposisi/{kode}/{id_mesin}', [KonversiController::class, 'getListKomposisi']);
    Route::get('/Konversi/getListSpek/{id_order}', [KonversiController::class, 'getListSpek']);
    Route::get('/Konversi/getSaldoInv/{id_type}', [KonversiController::class, 'getSaldoInv']);

    Route::get('/Konversi/insTmpTransaksi/{id_type_transaksi}/{uraian_detail_transaksi}/{id_type}/{saat_awal_transaksi}/{jumlah_keluar_primer}/{jumlah_keluar_sekunder}/{jumlah_keluar_tritier}/{asal_sub_kel}/{id_konversi}', [KonversiController::class, 'insTmpTransaksi']);
    Route::get('/Konversi/insDetailKonversi/{id_konversi}/{id_type}/{jumlah_primer}/{jumlah_sekunder}/{jumlah_tritier}/{presentase?}/{id_konversi_inv}', [KonversiController::class, 'insDetailKonversi']);
    Route::get('/Konversi/insMasterKonversi/{tgl}/{shift}/{awal}/{akhir}/{mesin}/{ukuran}/{denier}/{warna}/{lot_number}/{id_order}/{no_urut}/{id_komp}/{jam1}/{jam2}/{kode?}', [KonversiController::class, 'insMasterKonversi']);
    Route::get('/Konversi/getMasterKonversi/{kode?}', [KonversiController::class, 'getMasterKonversi']);

    Route::get('/Konversi/updListCounter', [KonversiController::class, 'updListCounter']);
    Route::get('/Konversi/getListCounter', [KonversiController::class, 'getListCounter']);
    Route::get('/Konversi/updMasterKonversi/{tgl}/{shift}/{awal}/{akhir}/{ukuran}/{denier}/{warna}/{lot_number}/{jam1}/{jam2}/{id_konv}', [KonversiController::class, 'updMasterKonversi']);

    Route::get('/Konversi/delDetailKonversi/{id_konversi}/{id_konv_inv}', [KonversiController::class, 'delDetailKonversi']);
    Route::get('/Konversi/delKonversi/{id_konversi}', [KonversiController::class, 'delKonversi']);
    #endregion

    #region ExtruderNet - Form Konversi ACC
    Route::get('/Konversi/getListKonvBlmAcc/{id_divisi}', [KonversiController::class, 'getListKonvBlmAcc']);
    Route::get('/Konversi/getListKonvDetail/{id_konversi}', [KonversiController::class, 'getListKonvDetail']);
    Route::get('/Konversi/getPenyesuaianTransaksi/{id_type}/{id_type_transaksi}', [KonversiController::class, 'getPenyesuaianTransaksi']);
    Route::get('/Konversi/getTransaksiKonversi/{id_konv_ext}', [KonversiController::class, 'getTransaksiKonversi']);
    Route::get('/Konversi/getJumlahHutang/{id_type}/{subkel}/{shift}/{tgl}', [KonversiController::class, 'getJumlahHutang']);
    Route::get('/Konversi/getIdTransInv/{id_type}/{subkel}/{tgl}/{shift}', [KonversiController::class, 'getIdTransInv']);
    Route::get('/Konversi/getOrderStatus/{id_order}', [KonversiController::class, 'getOrderStatus']);

    Route::get('/Konversi/updProsesACCKonversi/{id_transaksi}/{id_type}/{waktu_acc}/{keluar_primer}/{keluar_sekunder}/{keluar_tritier}/{masuk_primer}/{masuk_sekunder}/{masuk_tritier}', [KonversiController::class, 'updProsesACCKonversi']);
    Route::get('/Konversi/updProsesHutang/{id_type}/{subkel}/{id_inv}', [KonversiController::class, 'updProsesHutang']);
    Route::get('/Konversi/updACCMasterKonv/{id_konversi}', [KonversiController::class, 'updACCMasterKonv']);

    Route::get('/Konversi/updSaldoOrderDetail/{id_order}/{no_urut_order}/{primer}/{sekunder}/{tritier}', [KonversiController::class, 'updSaldoOrderDetail']);
    Route::get('/Konversi/getSaldoOrderDetail/{id_order}/{no_urut_order}', [KonversiController::class, 'getSaldoOrderDetail']);
    #endregion

    #region ExtruderNet - Form Benang Mohon
    Route::get('/Benang/getListDataNG/{id_konversi}/{tanggal}', [BenangController::class, 'getListDataNG']);
    Route::get('/Benang/getDetailUraianKonvNG/{id_konversi}', [BenangController::class, 'getDetailUraianKonvNG']);
    Route::get('/Benang/getKoreksiSortirNGBlmAcc/{tanggal}', [BenangController::class, 'getKoreksiSortirNGBlmAcc']);
    Route::get('/Benang/getListProdNG/{no_konv}', [BenangController::class, 'getListProdNG']);
    Route::get('/Benang/getCekDataNG/{kode}/{no_konv}/{id_type}', [BenangController::class, 'getCekDataNG']);
    Route::get('/Benang/getListIdKonv1/{id_divisi}/{tanggal}/{shift}/{id_konversi?}/{id_type?}', [BenangController::class, 'getListIdKonv1']);
    Route::get('/Benang/getListIdKonv3/{id_konversi}/{id_type}', [BenangController::class, 'getListIdKonv3']);
    Route::get('/Benang/getListCounter', [BenangController::class, 'getListCounter']);

    Route::get('/Benang/insMasterKonvNG/{tanggal}/{id_konversi_ext}', [BenangController::class, 'insMasterKonvNG']);
    Route::get('/Benang/getMasterKonversiNG', [BenangController::class, 'getMasterKonversiNG']);
    Route::get('/Benang/insDetailKonvNG/{id_konversi_ng}/{id_type}/{jumlah_primer}/{jumlah_sekunder}/{jumlah_tritier}/{id_konv_inv?}', [BenangController::class, 'insDetailKonvNG']);
    Route::get('/Benang/insAsalTmpTrans/{id_type_transaksi}/{uraian_detail_transaksi}/{id_type}/{saat_awal_transaksi}/{jumlah_primer}/{jumlah_sekunder}/{jumlah_tritier}/{asal_sub_kel}/{id_konversi}', [BenangController::class, 'insAsalTmpTrans']);
    Route::get('/Benang/insTujuanTmpTrans/{id_type_transaksi}/{uraian_detail_transaksi}/{id_type}/{saat_awal_transaksi}/{jumlah_keluar_primer}/{jumlah_keluar_sekunder}/{jumlah_keluar_tritier}/{tujuan_sub_kel}/{id_konversi}', [BenangController::class, 'insTujuanTmpTrans']);

    Route::get('/Benang/updDetailKonvNG/{id_konversi}/{id_type}/{j_primer}/{j_sekunder}/{j_tritier}', [BenangController::class, 'updDetailKonvNG']);
    Route::get('/Benang/updTmpTransaksi/{id_transaksi}/{uraian_detail_transaksi}/{jumlah_keluar_primer}/{jumlah_keluar_sekunder}/{jumlah_keluar_tritier}/{tujuan_sub_kelompok?}', [BenangController::class, 'updTmpTransaksi']);

    Route::get('/Benang/delKonversiNG/{id_konversi}', [BenangController::class, 'delKonversiNG']);
    #endregion

    #region ExtruderNet - Form Benang ACC
    Route::get('/Benang/getListIdKonversiNG/{tanggal1}/{tanggal2}/{kode?}', [BenangController::class, 'getListIdKonversiNG']);
    Route::get('/Benang/getDetailDataBenangNG/{id_konversi_ng}', [BenangController::class, 'getDetailDataBenangNG']);
    Route::get('/Benang/getPenyesuaianTransaksi/{kode?}/{id_type?}/{id_type_transaksi?}/{id_transaksi?}/{kode_barang?}/{id_sub_kel?}', [BenangController::class, 'getPenyesuaianTransaksi']);
    Route::get('/Benang/getTransaksiKonversiNG/{id_konversi_ng}', [BenangController::class, 'getTransaksiKonversiNG']);

    Route::get('/Benang/updProsesACCKonversi/{id_transaksi}/{id_type}/{waktu_acc}/{keluar_primer}/{keluar_sekunder}/{keluar_tritier}/{masuk_primer}/{masuk_sekunder}/{masuk_tritier}', [BenangController::class, 'updProsesACCKonversi']);
    Route::get('/Benang/updACCKonversiNG/{id_konversi_ng}', [BenangController::class, 'updACCKonversiNG']);
    #endregion

    #region ExtruderNet - Form Rincian Konversi
    Route::get('/Benang/getKelompokUtama_IdObjek/{id_objek_kelompok_utama}/{type?}', [BenangController::class, 'getKelompokUtama_IdObjek']);
    Route::get('/Benang/getKelompok_IdKelut/{id_kelompok_utama_kelompok}/{type?}', [BenangController::class, 'getKelompok_IdKelut']);
    Route::get('/Benang/getSubKelompok_IdKelompok/{id_kelompok_sub_kelompok}', [BenangController::class, 'getSubKelompok_IdKelompok']);
    Route::get('/Benang/getType_IdSubkel/{id_sub_kelompok_type}', [BenangController::class, 'getType_IdSubkel']);
    Route::get('/Benang/getSaldoBarang/{id_type}', [BenangController::class, 'getSaldoBarang']);
    #endregion

    #region ExtruderNet - Form Catat Gangguan
    Route::get('/Catat/getListIdKomposisi/{tanggal}/{id_mesin}', [PencatatanController::class, 'getListIdKomposisi']);
    Route::get('/Catat/getDisplayShift/{id_konversi}', [PencatatanController::class, 'getDisplayShift']);
    Route::get('/Catat/getListMesin/{kode}', [PencatatanController::class, 'getListMesin']);
    Route::get('/Catat/getListGangguan', [PencatatanController::class, 'getListGangguan']);
    Route::get('/Catat/getListGangguanProd/{bulan}/{tahun}', [PencatatanController::class, 'getListGangguanProd']);
    Route::get('/Catat/getListShift/{id_konversi}', [PencatatanController::class, 'getListShift']);
    Route::get('/Catat/getNoTrans', [PencatatanController::class, 'getNoTrans']);

    Route::get('/Catat/insGangguanProd/{tanggal}/{id_mesin}/{id_gangguan}/{id_konversi?}/{shift}/{awal}/{akhir}/{awal_gangguan}/{akhir_gangguan}/{jumlah_jam}/{jumlah_menit}/{status}/{keterangan}/{jam_user}', [PencatatanController::class, 'insGangguanProd']);
    Route::get('/Catat/updGangguanProd/{no_trans}/{awal}/{akhir}/{jam}/{menit}/{ket}', [PencatatanController::class, 'updGangguanProd']);
    Route::get('/Catat/delGangguanProd/{no_trans}', [PencatatanController::class, 'delGangguanProd']);
    #endregion

    #region ExtruderNet - Form Catat Daya
    Route::get('/Catat/getFaktorKali/{id_mesin}', [PencatatanController::class, 'getFaktorKali']);
    Route::get('/Catat/getKwahMesinPerbulan/{bulan}/{tahun}', [PencatatanController::class, 'getKwahMesinPerbulan']);
    Route::get('/Catat/getListDataKwahMesin/{bulan}/{tahun}', [PencatatanController::class, 'getListDataKwahMesin']);
    Route::get('/Catat/getKwahMesin/{tanggal}/{id_divisi}', [PencatatanController::class, 'getKwahMesin']);

    Route::get('/Catat/insKwahMesin/{tanggal}/{id_mesin}/{jam}/{counter}/{kali}/{jam_user}', [PencatatanController::class, 'insKwahMesin']);
    Route::get('/Catat/updKwahMesin/{id_kwah_mesin}/{counter}', [PencatatanController::class, 'updKwahMesin']);
    Route::get('/Catat/delKwahMesin/{id_kwah}', [PencatatanController::class, 'delKwahMesin']);
    #endregion

    #region ExtruderNet - Form Catat Effisiensi
    Route::get('/Catat/getListAwalProdEff/{tanggal}/{no_mesin}/{shift}', [PencatatanController::class, 'getListAwalProdEff']);
    Route::get('/Catat/getListEffisiensi/{tanggal}/{no_mesin}/{shift}/{awal_produksi}', [PencatatanController::class, 'getListEffisiensi']);
    Route::get('/Catat/getListIdKonversi/{tanggal}/{no_mesin}/{shift}', [PencatatanController::class, 'getListIdKonversi']);
    Route::get('/Catat/getCekDataEff/{tgl}/{mesin}/{shift}/{awal}/{akhir}/{id_konversi}', [PencatatanController::class, 'getCekDataEff']);

    Route::get('/Catat/insEff/{Tanggal}/{IdMesin}/{Shift}/{AwalProduksi}/{AkhirProduksi}/{IdKonversi}/{ScrewRevolution}/{MotorCurrent}/{SlitterWidth}/{NoOfYarn}/{WaterGap}/{RollSpeed3}/{StretchingRatio}/{Relax}/{Denier}/{DenierRata}/{JamUser}', [PencatatanController::class, 'insEff']);
    Route::get('/Catat/updEff/{Tanggal}/{IdMesin}/{Shift}/{AwalProduksi}/{AkhirProduksi}/{IdKonversi}/{ScrewRevolution}/{MotorCurrent}/{SlitterWidth}/{NoOfYarn}/{WaterGap}/{RollSpeed3}/{StretchingRatio}/{Relax}/{Denier}/{DenierRata}/{JamUser}', [PencatatanController::class, 'updEff']);
    Route::get('/Catat/delEff/{Tanggal}/{IdMesin}/{Shift}/{AwalProduksi}/{AkhirProduksi}', [PencatatanController::class, 'delEff']);
    #endregion

    #region ExtruderNet - Form Catat Perawatan
    Route::get('/Catat/getListJnsPerawatan/{id_divisi}', [PencatatanController::class, 'getListJnsPerawatan']);
    Route::get('/Catat/getListWinder/{id_perawatan}/{id_mesin}', [PencatatanController::class, 'getListWinder']);
    Route::get('/Catat/getJenisGangguan/{id_perawatan}', [PencatatanController::class, 'getJenisGangguan']);
    Route::get('/Catat/getJenisPenyebab/{id_perawatan}', [PencatatanController::class, 'getJenisPenyebab']);
    Route::get('/Catat/getJenisPenyelesaian/{id_perawatan}', [PencatatanController::class, 'getJenisPenyelesaian']);
    Route::get('/Catat/getDataPerawatan/{tanggal}', [PencatatanController::class, 'getDataPerawatan']);

    Route::get('/Catat/insPerawatan/{tanggal}/{shift}/{waktu}/{id_perawatan}/{id_mesin}/{no_winder}/{gangguan}/{sebab}/{solusi}/{mulai}/{selesai}/{id_gangguan?}', [PencatatanController::class, 'insPerawatan']);
    Route::get('/Catat/updPerawatan/{shift}/{waktu}/{id_perawatan}/{id_mesin}/{no_winder}/{gangguan}/{sebab}/{solusi}/{mulai}/{selesai}/{kode}/{id_gangguan?}', [PencatatanController::class, 'updPerawatan']);
    Route::get('/Catat/delPerawatan/{kode}', [PencatatanController::class, 'delPerawatan']);
    #endregion

    #region GPS
    Route::get('GPS', 'App\Http\Controllers\HomeController@GPS');

    Route::resource('estimasiJadwal', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController::class);
    Route::get('CekEstimasiKonstruksi/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@CekEstimasiKonstruksi');
    Route::get('LoadDataEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@LoadData');
    Route::get('GetTanggalEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@GetTanggal');
    Route::get('CekjadwalEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@Cekjadwal');
    Route::get('cektanggalEstimasiJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EstimasiJadwalController@cektanggal');

    Route::resource('MaintenanceGambar', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController::class);
    Route::get('LoadDataMaintenanceGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@LoadData');
    Route::get('cekdataestimasiMaintenanceGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@cekdataestimasi');
    Route::get('cekdataMaintenanceGambar/{noOd}/{bagian}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@cekdata');
    Route::get('GetdatabagianMaintenanceGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@Getdatabagian');
    Route::get('cekdatabagianMaintenanceGambar/{noOd}/{Idbag}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\MaintenanceBagianGambarController@cekdatabagian');

    Route::resource('InputJadwalKonstruksi', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController::class);
    Route::get('LoadDataInputJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@LoadData');
    Route::get('cekdataestimasiInputJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@cekdataestimasi');
    Route::get('GetdatabagianInputJadwal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@Getdatabagian');
    Route::get('GetJamKerjaInputJadwal/{worksts}/{estDate}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@GetJamKerja');
    Route::get('CekdatasudahadaInputJadwal/{idBagian}/{estDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@Cekdatasudahada');
    Route::get('Cekestimasidatekonstruksi/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@Cekestimasidatekonstruksi');
    Route::get('HitungSisaJamInputJadwalKons/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\InputJadwalController@HitungSisaJam');

    Route::resource('EditJam', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJamKerjaOptimalController::class);
    Route::get('HitungSisaJamEditJam/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJamKerjaOptimalController@HitungSisaJam');
    Route::get('GetJamKerjaEditJam/{worksts}/{estDate}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJamKerjaOptimalController@GetJamKerja');

    Route::resource('EditPerWorkStation', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerWorkStationController::class);
    Route::get('NoAntriEditPerWorkstation/{worksts}/{date1}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerWorkStationController@NoAntri');
    Route::get('getdatatableEditPerWorkstation/{noAntri}/{date}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerWorkStationController@getdatatable');

    Route::resource('EditPerOrderkonstruksi', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController::class);
    Route::get('LoadDataEditPerOrderKonstruksi/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController@LoadData');
    Route::get('cekEstimasiKonstruksiEditPerOrderKonstruksi/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController@cekEstimasiKonstruksi');
    Route::get('getDataTableEditPerOrderKonstruksi/{noOd}/{idBag}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditJadwalPerOrderController@getDataTable');

    Route::resource('EditEstimasiTanggal', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController::class);
    Route::get('NOFINISHEditEstimasiJadwal/{worksts}/{date1}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@NOFINISH');
    // Route::get('getdatatableEditEstimasiJadwal/{noAntri}/{date}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@getdatatable');
    Route::get('cekestimasiEditEstimasiTanggal/{noOd}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@cekestimasi');
    Route::get('cekestimasikonstruksiEditEstimasiTanggal/{noOd}/{newTgl}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiTanggalController@cekestimasikonstruksi');

    Route::resource('EditEstimasiWaktu', App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController::class);
    Route::get('LoaddataEditEstimasiWaktu/{worksts}/{date1}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@Loaddata');
    Route::get('hitungjamEditEstimasiWaktu/{EstDate}/{worksts}/{noQue}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@hitungjam');
    Route::post('EditJamKerjaKonstruksiEditEstimasiWaktu', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@EditJamKerjaKonstruksi');
    Route::get('HitungJamSisaEditEstimasiWaktu/{EstDate}/{worksts}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@HitungJamSisa');
    Route::get('GetJamKerjaEditEstimasiWaktu/{worksts}/{EstDate}', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi\EditEstimasiWaktuController@GetJamKerja');


    Route::get('FinishJadwalKonstruksi', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksiController@FinishJadwalKonstruksi');
    Route::get('DeleteJadwalPerWorkStation', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksiController@DeleteJadwalPerWorkStation');
    Route::get('DeleteJadwalPerOrder', 'App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksiController@DeleteJadwalPerOrder');

    //gps2
    Route::get('MaintenanceMaterialType', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceMaterialType');
    Route::get('MaintenanceMaterialType', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceMaterialType');
    Route::get('MaintenanceBagianBarang', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceBagianBarang');
    Route::get('InputJadwal', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@InputJadwal');
    Route::get('EditJamKerja', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditJamKerja');
    Route::get('EditPerMesin', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditPerMesin');
    Route::get('EditPerOrder', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditPerOrder');
    Route::get('EditEstimasiTanggalPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditEstimasiTanggal');
    Route::get('EditEstimasiWaktuPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditEstimasiWaktu');
    Route::get('EditJumlahBarang', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@EditJumlahBarang');
    Route::get('FinishJadwalPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@FinishJadwal');
    Route::get('DeletePerMesin', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DeletePerMesin');
    Route::get('DeletePerOrder', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DeletePerOrder');
    Route::get('BiayaProsesMakloon', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@BiayaProsesMakloon');
    Route::get('HargaMaterial', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@HargaMaterial');
    Route::get('MaintenanceDataSPart', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@MaintenanceDataSpart');
    Route::get('NomorOrderKerjaProyek', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@NomorOrderKerjaProyek');
    Route::get('DataPerencanaan', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DataPerencanaan');
    Route::get('DataSelesai', 'App\Http\Controllers\WORKSHOP\Gps\JadwalPengerjaanController@DataSelesai');

    //gps3
    Route::resource('JadwalPerWorkStation', App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksi\JadwalPerWorkStationController::class);
    Route::get('LoaddataJadwalPerWorkStation/{worksts}/{date1}/{date2}', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksi\JadwalPerWorkStationController@Loaddata');


    // Route::get('', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@JadwalPerWorkStation');
    Route::get('JadwalPerOder', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@JadwalPerOrder');
    Route::get('DaftarOrderGambar', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@DaftarOrderGambar');
    Route::get('DaftarEstimasiJadwal', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@DaftarEstimasiJadwal');
    Route::get('GrafikWorkStation', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@GrafikWorkStation');
    Route::get('JadwalKonstruksiPerBulan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@JadwalKonstruksiPerBulan');
    Route::get('HistoriProsesKonstruksi', 'App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksiController@HistoriProsesKonstruksi');

    //gps4
    Route::get('JadwalPerMesinPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@JadwalPerMesinPengerjaan');
    Route::get('JadwalPerOrderPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@JadwalPerOrderPengerjaan');
    Route::get('DaftarOrderKerjaProyek', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@DaftarOrderKerjaProyek');
    Route::get('EDMCNC', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@EDMCNC');
    Route::get('DrillMillScrap', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@DrillMillScrap');
    Route::get('MesinGrinding', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@MesinGrinding');
    Route::get('MesinLas', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@MesinLas');
    Route::get('PunchInjectCasting', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@PunchInjectCasting');
    Route::get('Turning', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@Turning');
    Route::get('Finishing', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@Finishing');
    Route::get('ProsesMakloon', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@Makloon');
    Route::get('PengerjaanPerOrder', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@PengerjaanPerOrder');
    Route::get('PengerjaanPerBulan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@PengerjaanPerBulan');
    Route::get('HistoriProsesPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@HistoriProsesPengerjaan');
    Route::get('DaftarSPerPart', 'App\Http\Controllers\WORKSHOP\Gps\InformasiPengerjaanController@DaftarSPerPart');

    //gps - Laporan
    Route::get('OrderPengerjaanMasuk', 'App\Http\Controllers\WORKSHOP\Gps\LaporanController@OrderPengerjaanMasuk');
    Route::get('HasilPengerjaan', 'App\Http\Controllers\WORKSHOP\Gps\LaporanController@HasilPengerjaan');
    #endregion

    #region Workshop
    Route::get('Workshop', 'App\Http\Controllers\HomeController@Workshop');

    // Workshop - Master
    Route::resource('MaintenanceDivisi', App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceDivisiController::class);
    Route::resource('MaintenanceDrafter', App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceDrafterController::class);
    Route::resource('UpdateNoGambar', App\Http\Controllers\WORKSHOP\Workshop\Master\UpdateNoGambarController::class);
    Route::resource('MaintenanceMesin', App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceMesinController::class);

    Route::get('getdata/{id}', 'App\Http\Controllers\WORKSHOP\Workshop\Master\UpdateNoGambarController@Getdata');
    Route::get('getmesin/{id}', 'App\Http\Controllers\WORKSHOP\Workshop\Master\MaintenanceMesinController@getmesin');

    // Workshop - Transaksi
    Route::resource('MaintenanceOrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController::class);
    Route::get('getalldata/{tgl_awal}/{tgl_akhir}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@GetDataAll');
    Route::get('GatDataForUserOrder/{tgl_awal}/{tgl_akhir}/{iduserOrder}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@GatDataForUserOrder');
    Route::get('mesin/{idDivisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@mesin');
    Route::get('GetBarang/{KdBrg}/{IdDiv}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderGambarController@GetBarang');

    Route::resource('ACCManagerGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerGambarController::class);
    Route::get('getalldatamanager/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerGambarController@GetDataAll');

    Route::resource('ACCDirekturGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturGambarController::class);
    Route::get('getalldataDirektur/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturGambarController@GetAllData');

    Route::resource('PenerimaOrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController::class);
    Route::get('getalldataPenerimaGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@GetAllData');
    Route::get('cekuser/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@cekuser');
    Route::get('cekuserkoreksi/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@cekuserkoreksi');
    Route::get('cekuserprosesmodal/{user}/{kode}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@cekuserprosesmodal');
    Route::get('ceknomorGambar/{nogambar}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@ceknomorGambar');
    Route::get('GetUserDrafterPenerimaOrderGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderGambarController@GetUserDrafter');

    Route::resource('ProsesPembeliGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController::class);
    Route::get('getalldataPembeliGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@GetAllData');
    Route::get('GetDataModalPembeliGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@GetDataModal');
    Route::get('getdataprintGambar/{idorder}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@getdataprint');
    Route::post('UpdateCetakpembeligambar', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ProsesPembeliGambarController@updatedatacetak');

    Route::resource('StatusOrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderGambarController::class);
    Route::get('getalldataStatusOrderGambar/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderGambarController@GetAllData');

    Route::resource('MaintenanceKodeGambar', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceKodeBarangController::class);
    Route::get('getbarangkodeGambar/{noOd}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceKodeBarangController@getbarang');
    Route::get('selectnoGambar/{noOd}/{kode}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceKodeBarangController@selectnoGambar');

    Route::resource('MaintenanceOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController::class);
    Route::get('getalldatakerja/{tgl_awal}/{tgl_akhir}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@GetDataAll');
    Route::get('GatDataForUserOrderkerja/{tgl_awal}/{tgl_akhir}/{iduserOrder}/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@GatDataForUserOrder');
    Route::get('LoadData1/{noGambar}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@LoadData1');
    Route::get('LoadData2/{kdbarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@LoadData2');
    Route::get('LoadData/{kdBarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@LoadData');
    Route::get('Mesinmodal/{idDivisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@mesin');
    Route::post('inputfile', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@inputfile');
    Route::get('selectpdf/{kdBarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@selectpdf');
    Route::post('updatefile', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\MaintenanceOrderKerjaController@updatepdf');

    Route::resource('ACCManagerKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController::class);
    Route::get('getalldataACCManagerKerja/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController@GetDataAll');
    Route::get('LoaddataACCManagerKerja/{id}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController@Loaddata');
    Route::get('getsaldoACCManagerKerja/{kodebarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCManagerKerjaController@getsaldo');

    Route::resource('ACCDirekturKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturKerjaController::class);
    Route::get('getalldataACCDirekturKerja/{tglawal}/{tglakhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturKerjaController@getalldata');
    Route::get('getsaldoACCDirekturKerja/{kode}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCDirekturKerjaController@getdatasaldo');

    Route::resource('ACCPPIC', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCPPICController::class);
    Route::get('ACCCPPIC/{user}/{nomorOrder}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\ACCPPICController@ACCCPPIC');

    Route::resource('PenerimaOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController::class);
    Route::get('getalldataPenerimaOrderKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@GetAllData');
    Route::get('cekuserPenerimaOrderKerja/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@cekuser');
    Route::get('cekuserkoreksiOrderKerja/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@cekuserkoreksi');
    Route::get('namauserPenerimaOrderKerja/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@namauserPenerimaOrderKerja');
    Route::get('LoadStokPenerimaOrderKerja/{kdbarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\PenerimaOrderKerjaController@LoadStok');

    Route::resource('CetakSuratOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController::class);
    Route::get('getalldataCetakSuratOrderKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController@GetAllData');
    Route::get('getdataprintCetakOrderKerja/{idorder}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController@getdataprint');
    Route::post('UpdateCetakSuratOrderKerja', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\CetakOrderKerjaController@updatedatacetak');

    Route::resource('StatusOrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderKerjaController::class);
    Route::get('getalldataStatusOrderKerja/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Transaksi\StatusOrderKerjaController@GetAllData');

    // Workshop - Proyek
    Route::resource('MaintenanceOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController::class);
    Route::get('GetDataAllMaintenanceOrderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GetDataAll');
    Route::get('GatDataForUserOrderMaintenanceOrderKerja/{tgl_awal}/{tgl_akhir}/{iduserOrder}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GatDataForUserOrder');
    Route::get('GetMesinMaintenanceOrderProyek/{idDivisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GetMesin');
    Route::get('GetDataTableMaintenanceOrderProyek/{noOrder}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\MaintenanceOrderProyekController@GetDataTable');

    Route::resource('ACCManagerProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCManagerProyekController::class);
    Route::get('GetDataAllACCManagerProyek/{divisi}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCManagerProyekController@GetDataAll');
    Route::get('GetDataTableACCManagerProyek/{idOrder}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCManagerProyekController@GetDataTable');

    Route::resource('ACCDirekturProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCDirekturProyekController::class);
    Route::get('GetDataAllACCDirekturProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\ACCDirekturProyekController@GetAllData');

    Route::resource('PenerimaOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController::class);
    Route::get('GetDataAllPenerimaOrderProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@GetAllData');
    Route::get('cekuserPenerimaOrderGambar/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@cekuser');
    Route::get('namauserPenerimaOrderProyek/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@namauserPenerimaOrderProyek');
    Route::get('cekuserkoreksiPenerimaOrderProyek/{user}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\PenerimaOrderProyekController@cekuserkoreksi');

    Route::resource('CetakSuratOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController::class);
    Route::get('GetAllDataCetakOrderProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController@GetAllData');
    Route::get('getdataprintCetakOrderProyek/{idorder}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController@getdataprint');
    Route::post('updatedatacetakOrderProyek', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\CetakOrderProyekController@updatedatacetak');

    Route::resource('StatusOrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Proyek\StatusOrderProyekController::class);
    Route::get('GetAllDataStatusOrderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Proyek\StatusOrderProyekController@GetAllData');

    // Workshop - Informasi

    Route::resource('OrderGambarSelesai', App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderGambar::class);
    Route::get('GetAllDataPengorder/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderGambar@GetAllDataPengorder');
    Route::get('GetAllDataPenerima/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderGambar@GetAllDataPenerima');

    Route::resource('OrderKerjaSelesai', App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderKerja::class);
    Route::get('GetAllDataPengorderKerja/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderKerja@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderKerja@GetAllDataPenerima');

    Route::resource('OrderProyekSelesai', App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderProyek::class);
    Route::get('GetAllDataPengorderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderProyek@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\LacakOrderProyek@GetAllDataPenerima');

    Route::resource('NomorGambar', App\Http\Controllers\WORKSHOP\Workshop\Informasi\NomorGambar::class);
    Route::get('getdataNomorGambar/{kdbarang}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\NomorGambar@getdata');

    Route::resource('OrderGambar', App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderGambar::class);
    Route::get('GetAllDataPengorderGambar/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderGambar@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaGambar/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderGambar@GetAllDataPenerima');

    Route::resource('OrderKerja', App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderKerja::class);
    Route::get('GetAllDataPengorderKerja/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderKerja@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaKerja/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderKerja@GetAllDataPenerima');

    Route::resource('OrderProyek', App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderProyek::class);
    Route::get('GetAllDataPengorderProyek/{tgl_awal}/{tgl_akhir}/{div}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderProyek@GetAllDataPengorder');
    Route::get('GetAllDataPenerimaProyek/{tgl_awal}/{tgl_akhir}', 'App\Http\Controllers\WORKSHOP\Workshop\Informasi\OrderProyek@GetAllDataPenerima');
    #endregion
});
