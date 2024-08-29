@extends('layouts.appJumboBag')
@section('content')
@section('title', 'Konversi JBB Potong')
<style>
    .swal-wide {
        width: 75% !important;
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <input type="hidden" name="divisiPotong" id='divisiPotong' value={{ $id }}>
                <div class="card-header">Konversi JBB Potong</div>
                <div style="display: flex; flex-direction: row;gap:0.5%;margin: 8px;">
                    <div class="card"
                        style="display: flex; flex-direction: column;width:20%;margin: 0.5%;padding:0.5%;">
                        <button class="btn" id="button_pilihShift">Pilih Shift</button>
                        <button class="btn" id="button_scanBarcodeAsal">Scan Barcode Asal</button>
                        <hr>
                        <button class="btn" id="button_pilihDivisiTujuan">Pilih Divisi Tujuan</button>
                        <button class="btn" id="button_pilihObjekTujuan">Pilih Objek Tujuan</button>
                        <button class="btn" id="button_pilihKelompokUtamaTujuan">Pilih Kelompok Utama Tujuan</button>
                        <button class="btn" id="button_pilihKelompokTujuan">Pilih Kelompok Tujuan</button>
                        <button class="btn" id="button_pilihSubKelompokTujuan">Pilih Sub Kelompok Tujuan</button>
                        <hr>
                        <button class="btn" id="button_printBarcode">Print Barcode</button>
                        <button class="btn" id="button_accBarcode">ACC Barcode</button>
                    </div>
                    <div class="card"
                        style="display: flex; flex-direction: column;width:78%;margin: 0.5%;padding:0.5%;">
                        <div class="form-group">
                            <label for="pemakaianAsal">Jumlah Pemakaian</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pemakaian_primerAsal"
                                    name="pemakaian_primerAsal" style='width:23%' placeholder="Jumlah Primer">
                                <input type="text" class="form-control" id="satuan_primerAsal"
                                    name="satuan_primerAsal" style='width:10%' placeholder="Satuan Primer">
                                <input type="text" class="form-control" id="pemakaian_sekunderAsal"
                                    name="pemakaian_sekunderAsal" style='width:23%' placeholder="Jumlah Sekunder">
                                <input type="text" class="form-control" id="satuan_sekunderAsal"
                                    name="satuan_sekunderAsal" style='width:10%' placeholder="Satuan Sekunder">
                                <input type="text" class="form-control" id="pemakaian_tritierAsal"
                                    name="pemakaian_tritierAsal" style='width:23%' placeholder="Jumlah Tritier">
                                <input type="text" class="form-control" id="satuan_tritierAsal"
                                    name="satuan_tritierAsal" style='width:10%' placeholder="Satuan Tritier">
                            </div>
                        </div>
                        <div style="margin: 0.5%;" class="card" id="div_tabelAsalKonversi">
                            <h3>Tabel Asal Konversi</h3>
                            <div style="margin: 0.5%;overflow:auto">
                                <table id="table_daftarAsalKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Id Type Asal</th>
                                            <th>Nama Type Asal</th>
                                            <th>Pengeluaran Primer</th>
                                            <th>Pengeluaran Sekunder</th>
                                            <th>Pengeluaran Tritier</th>
                                            <th>Id Tmp Transaksi</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style="margin: 0.5%;" class="card" id="div_tabelTujuanKonversi">
                            <h3>Tabel Asal Konversi</h3>
                            <div style="margin: 0.5%;overflow:auto">
                                <table id="table_daftarTujuanKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Id Type Tujuan</th>
                                            <th>Nama Type Tujuan</th>
                                            <th>Pemasukan Primer</th>
                                            <th>Pemasukan Sekunder</th>
                                            <th>Pemasukan Tritier</th>
                                            <th>Id Tmp Transaksi</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="typeTujuan">Type Tujuan</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="id_typeTujuan" name="id_typeTujuan"
                                    placeholder="Id Type Tujuan">
                                <input type="text" class="form-control" style="width: 60%"id="nama_typeTujuan"
                                    name="nama_typeTujuan" placeholder="Nama Type Tujuan">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="saldo_terakhirTujuanPrimer"
                                    name="saldo_terakhirTujuanPrimer" style='width:23%;' placeholder="Jumlah Primer">
                                <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanPrimer"
                                    name="satuan_saldoTerakhirTujuanPrimer" style='width:10%;'
                                    placeholder="Satuan Primer">
                                <input type="text" class="form-control" id="saldo_terakhirTujuanSekunder"
                                    name="saldo_terakhirTujuanSekunder"style='width:23%;'
                                    placeholder="Jumlah Sekunder">
                                <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanSekunder"
                                    name="satuan_saldoTerakhirTujuanSekunder" style='width:10%;'
                                    placeholder="Satuan Sekunder">
                                <input type="text" class="form-control" id="saldo_terakhirTujuanTritier"
                                    name="saldo_terakhirTujuanTritier" style='width:23%;'
                                    placeholder="Jumlah Tritier">
                                <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanTritier"
                                    name="satuan_saldoTerakhirTujuanTritier" style='width:10%;'
                                    placeholder="Satuan Tritier">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pemakaianTujuan">Hasil Konversi</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pemakaian_primerTujuan"
                                    name="pemakaian_primerTujuan" style='width:23%' placeholder="Jumlah Primer">
                                <input type="text" class="form-control" id="satuan_primerTujuan"
                                    name="satuan_primerTujuan" style='width:10%' placeholder="Satuan Primer">
                                <input type="text" class="form-control" id="pemakaian_sekunderTujuan"
                                    name="pemakaian_sekunderTujuan" style='width:23%' placeholder="Jumlah Sekunder">
                                <input type="text" class="form-control" id="satuan_sekunderTujuan"
                                    name="satuan_sekunderTujuan" style='width:10%' placeholder="Satuan Sekunder">
                                <input type="text" class="form-control" id="pemakaian_tritierTujuan"
                                    name="pemakaian_tritierTujuan" style='width:23%' placeholder="Jumlah Tritier">
                                <input type="text" class="form-control" id="satuan_tritierTujuan"
                                    name="satuan_tritierTujuan" style='width:8%' placeholder="Satuan Tritier">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/MultipleProgram/PermohonanKonversiBarcodePotong.js') }}"></script>
@endsection
