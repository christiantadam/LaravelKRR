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
                <div class="card-header">Konversi JBB Potong</div>
                <div>
                    <div style="margin: 0.5%;" class="card" id="div_asalKonversi">
                        <div class="card-body">
                            <div style="display: flex; flex-direction: row;gap:1%;margin-bottom: 8px;">
                                <div style="width: 50%">
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group">
                                            <label for="divisi">Divisi</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_divisiAsal"
                                                    name="id_divisi" placeholder="Id Divisi">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_divisiAsal" name="nama_divisi"
                                                    placeholder="Nama Divisi">
                                                <button class="btn" type="button"
                                                    id="button_divisiAsal">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="objek">Objek</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_objekAsal"
                                                    name="id_objek" placeholder="Id Objek">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_objekAsal" name="nama_objek"
                                                    placeholder="Nama Objek">
                                                <button class="btn" type="button" id="button_objekAsal">...</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group">
                                            <label for="kelompokUtama">Kelompok Utama</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_kelompokUtamaAsal"
                                                    name="id_kelompokUtama" placeholder="Id Kel. Utama">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_kelompokUtamaAsal"
                                                    name="nama_kelompokUtama" placeholder="Nama Kelompok Utama">
                                                <button class="btn" type="button"
                                                    id="button_kelompokUtamaAsal">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="kelompok">Kelompok</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_kelompokAsal"
                                                    name="id_kelompok" placeholder="Id Kelompok">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_kelompokAsal" name="nama_kelompok"
                                                    placeholder="Nama Kelompok">
                                                <button class="btn" type="button"
                                                    id="button_kelompokAsal">...</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group" style="width: 50%">
                                            <label for="subKelompok">Sub Kelompok</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_subKelompokAsal"
                                                    name="id_subKelompok" placeholder="Id Sub Kelompok ">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_subKelompokAsal" name="nama_subKelompok"
                                                    placeholder="Nama Sub Kelompok ">
                                                <button class="btn" type="button"
                                                    id="button_subKelompokAsal">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group" id="div_PIBAsal" style="width: 50%;visibility: hidden;">
                                            <label for="PIB_asal">PIB Type Asal</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="PIB_asal"
                                                    name="PIB_asal" placeholder="PIB">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 50%">
                                    <div class="form-group">
                                        <label for="typeAsal">Type Asal</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="id_typeAsal"
                                                name="id_typeAsal" placeholder="Id Type Asal">
                                            <input type="text" class="form-control"
                                                style="width: 40%"id="nama_typeAsal" name="nama_typeAsal"
                                                placeholder="Nama Type Asal">
                                            <button class="btn" type="button" id="button_typeAsal">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="saldo_terakhirAsal">Saldo Terakhir Type Asal</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="saldo_terakhirAsalPrimer"
                                                name="saldo_terakhirAsalPrimer" style='width:23%;'
                                                placeholder="Jumlah Primer">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirAsalPrimer"
                                                name="satuan_saldoTerakhirAsalPrimer" style='width:10%;'
                                                placeholder="Satuan Primer">
                                            <input type="text" class="form-control"
                                                id="saldo_terakhirAsalSekunder"
                                                name="saldo_terakhirAsalSekunder"style='width:23%;'
                                                placeholder="Jumlah Sekunder">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirAsalSekunder"
                                                name="satuan_saldoTerakhirAsalSekunder" style='width:10%;'
                                                placeholder="Satuan Sekunder">
                                            <input type="text" class="form-control" id="saldo_terakhirAsalTritier"
                                                name="saldo_terakhirAsalTritier" style='width:23%;'
                                                placeholder="Jumlah Tritier">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirAsalTritier"
                                                name="satuan_saldoTerakhirAsalTritier" style='width:10%;'
                                                placeholder="Satuan Tritier">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="pemakaianAsal">Jumlah Pemakaian</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="pemakaian_primerAsal"
                                                name="pemakaian_primerAsal" style='width:23%'
                                                placeholder="Jumlah Primer">
                                            <input type="text" class="form-control" id="satuan_primerAsal"
                                                name="satuan_primerAsal" style='width:10%'
                                                placeholder="Satuan Primer">
                                            <input type="text" class="form-control" id="pemakaian_sekunderAsal"
                                                name="pemakaian_sekunderAsal" style='width:23%'
                                                placeholder="Jumlah Sekunder">
                                            <input type="text" class="form-control" id="satuan_sekunderAsal"
                                                name="satuan_sekunderAsal" style='width:10%'
                                                placeholder="Satuan Sekunder">
                                            <input type="text" class="form-control" id="pemakaian_tritierAsal"
                                                name="pemakaian_tritierAsal" style='width:23%'
                                                placeholder="Jumlah Tritier">
                                            <input type="text" class="form-control" id="satuan_tritierAsal"
                                                name="satuan_tritierAsal" style='width:10%'
                                                placeholder="Satuan Tritier">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div style="margin: 0.5%;" class="card" id="div_tabelTujuanKonversi">
                        <div style="margin: 0.5%;overflow:auto">
                            <table id="table_daftarTujuanKonversi">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th>Id Type Tujuan</th>
                                        <th>Nama Type Tujuan</th>
                                        <th>Saldo Primer</th>
                                        <th>Saldo Sekunder</th>
                                        <th>Saldo Tritier</th>
                                        <th>Id Divisi</th>
                                        <th>Id Objek</th>
                                        <th>Id Kelompok Utama</th>
                                        <th>Id Kelompok</th>
                                        <th>Id Sub Kelompok</th>
                                        <th>Nama Divisi Tujuan</th>
                                        <th>Nama Objek Tujuan</th>
                                        <th>Nama Kelompok Utama Tujuan</th>
                                        <th>Nama Kelompok Tujuan</th>
                                        <th>Nama Sub Kelompok Tujuan</th>
                                        <th>Saldo Terakhir Tujuan Primer</th>
                                        <th>Saldo Terakhir Tujuan Sekunder</th>
                                        <th>Saldo Terakhir Tujuan Tritier</th>
                                        <th>Satuan Primer Tujuan</th>
                                        <th>Satuan Sekunder Tujuan</th>
                                        <th>Satuan Tritier Tujuan</th>
                                        <th>Satuan Saldo Terakhir Tujuan Primer</th>
                                        <th>Satuan Saldo Terakhir Tujuan Sekunder</th>
                                        <th>Satuan Saldo Terakhir Tujuan Tritier</th>
                                        <th>Id Tmp Transaksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <br>
                    <div style="margin: 0.5%;" class="card" id="div_tujuanKonversi">
                        <div class="card-body">
                            <div style="display: flex; flex-direction: row;gap:1%;margin-bottom: 8px;">
                                <div style="width: 50%">
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group">
                                            <label for="divisi">Divisi</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_divisiTujuan"
                                                    name="id_divisi" placeholder="Id Divisi">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_divisiTujuan" name="nama_divisi"
                                                    placeholder="Nama Divisi">
                                                <button class="btn" type="button"
                                                    id="button_divisiTujuan">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="objek">Objek</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_objekTujuan"
                                                    name="id_objek" placeholder="Id Objek">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_objekTujuan" name="nama_objek"
                                                    placeholder="Nama Objek">
                                                <button class="btn" type="button"
                                                    id="button_objekTujuan">...</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group">
                                            <label for="kelompokUtama">Kelompok Utama</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control"
                                                    id="id_kelompokUtamaTujuan" name="id_kelompokUtama"
                                                    placeholder="Id Kel. Utama">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_kelompokUtamaTujuan"
                                                    name="nama_kelompokUtama" placeholder="Nama Kelompok Utama">
                                                <button class="btn" type="button"
                                                    id="button_kelompokUtamaTujuan">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="kelompok">Kelompok</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_kelompokTujuan"
                                                    name="id_kelompok" placeholder="Id Kelompok">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_kelompokTujuan" name="nama_kelompok"
                                                    placeholder="Nama Kelompok">
                                                <button class="btn" type="button"
                                                    id="button_kelompokTujuan">...</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group" style="width: 50%;">
                                            <label for="subKelompok">Sub Kelompok</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="id_subKelompokTujuan"
                                                    name="id_subKelompok" placeholder="Id Sub Kelompok ">
                                                <input type="text" class="form-control"
                                                    style="width: 60%"id="nama_subKelompokTujuan"
                                                    name="nama_subKelompok" placeholder="Nama Sub Kelompok ">
                                                <button class="btn" type="button"
                                                    id="button_subKelompokTujuan">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group" id="div_PIBTujuan"
                                            style="width: 50%;visibility:hidden">
                                            <label for="PIB_tujuan">PIB Type Tujuan</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="PIB_tujuan"
                                                    name="PIB_tujuan" placeholder="PIB">
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group" style="width: 75%;">
                                            <button class="btn btn-success" id="button_tambahTujuanKonversi">Tambah
                                                Tujuan</button>
                                            <button class="btn btn-info" id="button_updateTujuanKonversi">Update
                                                Tujuan</button>
                                            <button class="btn btn-danger" id="button_hapusTujuanKonversi">Hapus
                                                Tujuan</button>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 50%">
                                    <div class="form-group">
                                        <label for="typeTujuan">Type Tujuan</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="id_typeTujuan"
                                                name="id_typeTujuan" placeholder="Id Type Tujuan">
                                            <input type="text" class="form-control"
                                                style="width: 40%"id="nama_typeTujuan" name="nama_typeTujuan"
                                                placeholder="Nama Type Tujuan">
                                            <button class="btn" type="button" id="button_typeTujuan">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control"
                                                id="saldo_terakhirTujuanPrimer" name="saldo_terakhirTujuanPrimer"
                                                style='width:23%;' placeholder="Jumlah Primer">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirTujuanPrimer"
                                                name="satuan_saldoTerakhirTujuanPrimer" style='width:10%;'
                                                placeholder="Satuan Primer">
                                            <input type="text" class="form-control"
                                                id="saldo_terakhirTujuanSekunder"
                                                name="saldo_terakhirTujuanSekunder"style='width:23%;'
                                                placeholder="Jumlah Sekunder">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirTujuanSekunder"
                                                name="satuan_saldoTerakhirTujuanSekunder" style='width:10%;'
                                                placeholder="Satuan Sekunder">
                                            <input type="text" class="form-control"
                                                id="saldo_terakhirTujuanTritier" name="saldo_terakhirTujuanTritier"
                                                style='width:23%;' placeholder="Jumlah Tritier">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirTujuanTritier"
                                                name="satuan_saldoTerakhirTujuanTritier" style='width:10%;'
                                                placeholder="Satuan Tritier">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="pemakaianTujuan">Hasil Konversi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="pemakaian_primerTujuan"
                                                name="pemakaian_primerTujuan" style='width:25%'
                                                placeholder="Jumlah Primer">
                                            <input type="text" class="form-control" id="satuan_primerTujuan"
                                                name="satuan_primerTujuan" style='width:8%'
                                                placeholder="Satuan Primer">
                                            <input type="text" class="form-control" id="pemakaian_sekunderTujuan"
                                                name="pemakaian_sekunderTujuan" style='width:25%'
                                                placeholder="Jumlah Sekunder">
                                            <input type="text" class="form-control" id="satuan_sekunderTujuan"
                                                name="satuan_sekunderTujuan" style='width:8%'
                                                placeholder="Satuan Sekunder">
                                            <input type="text" class="form-control" id="pemakaian_tritierTujuan"
                                                name="pemakaian_tritierTujuan" style='width:25%'
                                                placeholder="Jumlah Tritier">
                                            <input type="text" class="form-control" id="satuan_tritierTujuan"
                                                name="satuan_tritierTujuan" style='width:8%'
                                                placeholder="Satuan Tritier">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div style="margin-left:0.5%; margin-right:0.5%" id="div_terakhir">
                        <div class="form-group">
                            <label for="uraianTransaksi">Uraian Transaksi</label>
                            <input type="text" class="form-control" id="uraian_transaksi" name="uraian_transaksi"
                                placeholder="Uraian Transaksi">
                        </div>
                        <button class="btn btn-primary col-1" id="button_isi">Isi</button>
                        <button class="btn btn-warning col-1" id="button_koreksi">Koreksi</button>
                        <button class="btn btn-danger col-1" id="button_hapus">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/MultipleProgram/PermohonanKonversiPotong.js') }}"></script>
@endsection
