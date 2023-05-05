<?php
use function foo\func;
use Illuminate\Support\Facades\Route;
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

Route::get('/login', 'App\Http\Controllers\LoginController@index')->name('login');
Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout')->name('logout');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', 'App\Http\Controllers\HomeController@index')->name('home');

    #region Beli
    Route::get('Beli', 'App\Http\Controllers\HomeController@Beli');
    #region Master
    #region OrderPembelian
    Route::resource('OrderPembelian', App\Http\Controllers\Beli\OrderPembelianController::class);
    #endregion
    #region ListOrder
    Route::resource('ListOrder', App\Http\Controllers\Beli\ListOrderController::class);
    Route::get('/ListOrder/{id}/show', 'App\Http\Controllers\Beli\ListOrderController@show')->name('listorder.show');
    Route::get('/ListOrder/{divisi}/{tglAwal}/{tglAkhir}/{Me}/Filter', 'App\Http\Controllers\Beli\ListOrderController@Filter')->name('listorder.filter');
    #endregion
    #region Approve
    Route::resource('Approve', App\Http\Controllers\Beli\ApproveController::class);
    Route::get('/Approve/{id}/show', 'App\Http\Controllers\Beli\ApproveController@show')->name('approve.show');
    Route::post('/Approve/{id}/up', 'App\Http\Controllers\Beli\ApproveController@update')->name('approve.update');
    #endregion
    #region FinalApprove
    Route::resource('FinalApprove', App\Http\Controllers\Beli\FinalApproveController::class);
    Route::get('/FinalApprove/{id}/show', 'App\Http\Controllers\Beli\FinalApproveController@show')->name('finalapprove.show');
    Route::post('/FinalApprove/{id}/up', 'App\Http\Controllers\Beli\FinalApproveController@update')->name('finalapprove.update');
    #endregion
    #endregion
    #endregion

    #region User
    Route::resource('User', App\Http\Controllers\UserController::class);
    Route::post('/User/{id}/up', 'App\Http\Controllers\UserController@update')->name('user.update');
    Route::get('/User/{id}/EditAdmin', 'App\Http\Controllers\UserController@EditAdmin')->name('user.EditAdmin');
    #endregion

    #region Sales Master
    Route::get('Sales', 'App\Http\Controllers\HomeController@Sales');

    Route::resource('Customer', App\Http\Controllers\Sales\Master\CustomerController::class);
    Route::get('/Customer/{id}/show', 'App\Http\Controllers\Sales\Master\CustomerController@show')->name('customer.show');
    Route::post('/Customer/{id}/up', 'App\Http\Controllers\Sales\Master\CustomerController@update')->name('customer.update');
    // Route::get('Sales/Master/Customer/getDetail/{idcust}', 'ControllerCustomer@getDetail');
    Route::get('Customer/{IDCust}', 'CustomerController@show');
    Route::post('/Customer/{id}', 'App\Http\Controllers\Sales\Master\CustomerController@destroy')->name('customer.destroy');

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
    #endregion

    #region Sales Surat Pesanan
    Route::resource('SuratPesanan', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController::class);
    Route::resource('SuratPesananManager', App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController::class);
    // Route::resource('SuratPesananDirektur', SuratPesananDirekturController::class);
    Route::resource('PenyesuaianSuratPesanan', App\Http\Controllers\Sales\Transaksi\SuratPesanan\PenyesuaianSuratPesananController::class);
    //Route::get('SuratPesanan', [SuratPesananController::class, 'index'])->name('suratpesanan.index');
    Route::get('/SuratPesanan/{id}/show', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@show')->name('suratpesanan.show');
    Route::post('/SuratPesanan/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@update')->name('suratpesanan.update');
    Route::get('/editSP/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@edit');
    Route::get('SuratPesanan/{IDCust}', 'SuratPesananController@show');
    Route::post('/SuratPesanan/{id}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@destroy')->name('suratpesanan.destroy');
    Route::post('/SuratPesananManager/{id}/up', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@update')->name('suratpesananmanager.update');
    Route::post('/SuratPesananManager/upall', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@updateAll');
    Route::get('/SuratPesananManager/penyesuaian/suratpesanan', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@penyesuaian');
    Route::get('/penyesuaian/{suratPesanan}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@getPenyesuaianSP');
    Route::post('/SuratPesananManager/upPenyesuaian', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananManagerController@updatePenyesuaian');
    Route::get('/options/kategori/{kategoriUtama}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getKategori');
    Route::get('/options/subKategori/{kategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSubKategori');
    Route::get('/options/namaBarang/{subKategori}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getNamaBarang');
    Route::get('/satuan/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSatuanBarang');
    Route::get('/satuan1/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getSatuanBarang1');
    Route::get('/displaybarang/{kode_barang}', 'App\Http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getDisplayBarang');
    Route::get('/beratstandard/{kode_barang}', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@getBeratStandard');
    Route::get('/deletedetail/{id_pesanan}', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@deleteDetailPesanan');
    // Route::post('/tambahmantap', 'App\http\Controllers\Sales\Transaksi\SuratPesanan\SuratPesananController@store');
    Route::post('/submit-form', [SuratPesananController::class, 'submitForm']);

    #endregion

    #region Delivery Order

    Route::resource('DeliveryOrder', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderController::class);
    Route::resource('DeliveryOrderManager', App\Http\Controllers\Sales\Transaksi\DeliveryOrder\DeliveryOrderManagerController::class);
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

    #endregion

    #region Surat Jalan
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
    #endregion

    #region Cetak
    Route::resource('CetakSP', App\Http\Controllers\Sales\Cetak\CetakSPController::class);
    Route::resource('CetakDO', App\Http\Controllers\Sales\Cetak\CetakDOController::class);
    Route::resource('CetakSJ', App\Http\Controllers\Sales\Cetak\CetakSJController::class);
    Route::get('/nosp/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getSuratPesananSelect');
    Route::get('/text/suratpesanan/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getSuratPesananText');
    Route::get('/options/jenissp/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getJenisSp');
    Route::get('/viewprint/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@getViewPrint');
    // Route::get('/print/suratpesanan/{nosp}', 'App\Http\Controllers\Sales\Cetak\CetakSPController@printSuratPesanan');
    Route::get('/dosudahacc/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@getDeliveryOrderSudahACC');
    Route::get('/dobelumacc/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@getDeliveryOrderBelumACC');
    // Route::get('/print/deliveryorder/{nodo}', 'App\Http\Controllers\Sales\Cetak\CetakDOController@printDeliveryOrder');
    Route::get('/options/suratjalan/{tanggal}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@getSuratJalan');
    // Route::get('/print/suratjalan/{nosj}', 'App\Http\Controllers\Sales\Cetak\CetakSJController@printSuratJalan');
    #endregion

    #region Tool Penjualan

    Route::resource('CariBarcode', App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController::class);
    Route::get('/cariBarcodeIdTypeDispresiasi/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@getIdTypeDispresiasi');
    Route::get('/cariBarcodeIdTypeTmpGudang/{kodeBarang}', 'App\Http\Controllers\Sales\ToolPenjualan\CariBarcodeController@getIdTypeTmpGudang');
    Route::resource('BarcodeKerta2', App\Http\Controllers\Sales\ToolPenjualan\BarcodeKerta2Controller::class);
    Route::resource('BatalJual', App\Http\Controllers\Sales\ToolPenjualan\BatalJualController::class);
    Route::resource('GantiRPM', App\Http\Controllers\Sales\ToolPenjualan\GantiRPMController::class);
    Route::resource('HapusCIR', App\Http\Controllers\Sales\ToolPenjualan\HapusCIRController::class);
    Route::resource('PenjualanBarcode', App\Http\Controllers\Sales\ToolPenjualan\PenjualanBarcodeController::class);
    Route::resource('PenjualanNyangkut', App\Http\Controllers\Sales\ToolPenjualan\PenjualanNyangkutController::class);
    Route::resource('SetengahJadiNyangkut', App\Http\Controllers\Sales\ToolPenjualan\SetengahJadiNyangkutController::class);

    #endregion

    #region Penjualan

    Route::resource('ScanBarcode', App\Http\Controllers\Sales\Penjualan\ScanBarcodeController::class);
    Route::resource('BarcodeJual', App\Http\Controllers\Sales\Penjualan\BarcodeJualController::class);
    Route::resource('AccPenjualan', App\Http\Controllers\Sales\Penjualan\AccPenjualanController::class);
    Route::resource('AccPenjualanCloth', App\Http\Controllers\Sales\Penjualan\AccPenjualanClothController::class);

    #endregion

    #region EDP
    Route::get('/EDP', 'App\Http\Controllers\HomeController@EDP');

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
    #endregion
});

Route::get('/test', 'App\Http\Controllers\testController@index');
