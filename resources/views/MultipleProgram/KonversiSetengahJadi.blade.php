@extends('layouts.appJumboBag')
@section('content')
@section('title', 'Konversi JBB Barang Jadi')
<style>
    .swal2-container .select2-dropdown {
        z-index: 10000 !important;
    }

    .swal2-container .select2-container {
        width: 100% !important;
        /* Ensure the Select2 component spans the modal width */
    }

    .swal2-container .select2-selection {
        height: auto !important;
        /* Fix the height to auto */
    }

    .swal2-container .swal2-input {
        height: auto !important;
        /* Make sure the input fields take the proper height */
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKonversi" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Konversi</div>
                </button>
                <input type="hidden" name="divisiUser" id='divisiUser' value={{ $id }}>
                <input type="hidden" name="nomorUser" id="nomorUser" value={{ $nomorUser }}>
                <div class="card-header">Konversi JBB Potong ke Barang Jadi</div>
                <div id="div_tabelDaftarKonversi" style="margin:0.5%">
                    <h3>Tabel Daftar Konversi</h3>
                    <div style="overflow:auto">
                        <table id="table_daftarKonversi">
                            <thead>
                                <tr style="white-space: nowrap">
                                    <th>Kode Barang JBB Tujuan</th>
                                    <th>Id Type Tujuan</th>
                                    <th>Nama Type Tujuan</th>
                                    <th>Hasil Primer</th>
                                    <th>Hasil Sekunder</th>
                                    <th>Hasil Tritier</th>
                                    <th>Id Konversi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal untuk Detail Transaksi Konversi -->
{{-- <div class="modal fade" id="detailKonversiModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="detailKonversiModalLabel">Detail Konversi </h5>
                <button type="button" data-bs-dismiss="modal" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="margin: 0.5%;" class="card" id="detail_konversiModalDivTabelAsalKonversi">
                    <h3>Tabel Asal Konversi</h3>
                    <div style="margin: 0.5%;overflow:auto">
                        <table id="detail_konversiModalTableDaftarAsalKonversi">
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
                <div style="margin: 0.5%;" class="card" id="detail_konversiModalDivTabelTujuanKonversi">
                    <h3>Tabel Tujuan Konversi</h3>
                    <div style="margin: 0.5%;overflow:auto">
                        <table id="detail_konversiModalTableDaftarTujuanKonversi">
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
                <button type="submit" class="btn btn-success btn-acc" id="button_modalACC">Proses ACC</button>
            </div>
        </div>
    </div>
</div> --}}

<!-- Modal untuk Tambah Tujuan Konversi -->
<div class="modal fade" id="tambahTujuanModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahTujuanModalLabel">Tambah Konversi </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex; flex-direction: row;gap:0.5%;margin: 8px;">
                    <div class="card" style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;">
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 32%">
                                <label for="divisiAsal">Divisi Asal</label>
                                <div class="input-group">
                                    <select name="select_divisiAsal" id="select_divisiAsal" class="form-control">
                                        <option disabled selected>Pilih Divisi Asal</option>
                                        @foreach ($divisi as $d)
                                            <option value="{{ $d->IdDivisi }}">{{ $d->NamaDivisi }} |
                                                {{ $d->IdDivisi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="customerSelect">Customer</label>
                                <div class="input-group">
                                    <select name="customerSelect" id="customerSelect" style="width: 100%;"
                                        class="form-control">
                                        <option disabled selected>Pilih Customer</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="kodeBarangSelect">Kode Barang Tabel Hit.</label>
                                <div class="input-group">
                                    <select name="kodeBarangSelect" id="kodeBarangSelect" style="width: 100%;"
                                        class="form-control">
                                        <option disabled selected>Pilih Kode Barang</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card" id="div_tabelAsalKonversi">
                            <h3>Tabel Asal Konversi</h3>
                            <div style="overflow:auto">
                                <table id="table_daftarAsalKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Kode Komponen</th>
                                            <th>Nama Komponen</th>
                                            <th>Panjang x Lebar</th>
                                            <th>Quantity</th>
                                            <th>Id Type Inventory</th>
                                            <th>Nama Type Inventory</th>
                                            <th>Jumlah Pemakaian Primer</th>
                                            <th>Jumlah Pemakaian Sekunder</th>
                                            <th>Jumlah Pemakaian Tritier</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 32%">
                                <label for="objek">Objek</label>
                                <div class="input-group">
                                    <select name="select_objekTujuan" id="select_objekTujuan" class="form-control">
                                        <option disabled selected>-- Pilih Objek --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="kelompokUtama">Kelompok Utama</label>
                                <div class="input-group">
                                    <select name="select_kelompokUtamaTujuan" id="select_kelompokUtamaTujuan"
                                        class="form-control">
                                        <option disabled selected>-- Pilih Kelompok Utama --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 32%">
                                <label for="kelompok">Kelompok</label>
                                <div class="input-group">
                                    <select name="select_kelompokTujuan" id="select_kelompokTujuan"
                                        class="form-control">
                                        <option disabled selected>-- Pilih Kelompok --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="subKelompok">Sub Kelompok</label>
                                <div class="input-group">
                                    <select name="select_subKelompokTujuan" id="select_subKelompokTujuan"
                                        class="form-control">
                                        <option disabled selected>-- Pilih Sub Kelompok --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" id="div_PIBTujuan" style="visibility:hidden;width: 32%">
                                <label for="PIB_tujuan">PIB Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="PIB_tujuan" name="PIB_tujuan"
                                        placeholder="PIB">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="typeAsal">Type Asal</label>
                            <div class="input-group">
                                <select name="select_typeAsal" id="select_typeAsal" class="form-control">
                                    <option disabled selected>Pilih Type Asal</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 49%;border:none;margin:0.5%;">
                                <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanPrimer"
                                        name="saldo_terakhirTujuanPrimer" style='width:23%;'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanPrimer"
                                        name="satuan_saldoTerakhirTujuanPrimer" style='width:10%;'
                                        placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanSekunder"
                                        name="saldo_terakhirTujuanSekunder"style='width:23%;'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirTujuanSekunder"
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
                            <div class="form-group" style="width: 49%;border:none;margin:0.5%;">
                                <label for="hasil_konversiTujuan">Hasil Konversi</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="hasil_konversiPrimerTujuan"
                                        name="hasil_konversiPrimerTujuan" style='width:23%'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_primerTujuan"
                                        name="satuan_primerTujuan" style='width:10%' placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="hasil_konversiSekunderTujuan"
                                        name="hasil_konversiSekunderTujuan" style='width:23%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control" id="satuan_sekunderTujuan"
                                        name="satuan_sekunderTujuan" style='width:10%' placeholder="Satuan Sekunder">
                                    <input type="text" class="form-control" id="hasil_konversiTritierTujuan"
                                        name="hasil_konversiTritierTujuan" style='width:23%'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control" id="satuan_tritierTujuan"
                                        name="satuan_tritierTujuan" style='width:8%' placeholder="Satuan Tritier">
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
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 32%">
                                <label for="divisi">Divisi Tujuan</label>
                                <div class="input-group">
                                    <select name="select_divisiTujuan" id="select_divisiTujuan" class="form-control">
                                        <option disabled selected>Pilih Divisi</option>
                                        @foreach ($divisi as $d)
                                            <option value="{{ $d->IdDivisi }}">{{ $d->NamaDivisi }}
                                                |{{ $d->IdDivisi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="type">Type Tujuan</label>
                                <div class="input-group">
                                    <select name="select_typeTujuan" id="select_typeTujuan" class="form-control">
                                        <option disabled selected>Pilih Type Tujuan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 10%">
                                <label for="shift">Shift</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_shift" name="id_shift"
                                        placeholder="[P] [S] [M]">
                                </div>
                            </div>
                            <div class="form-group" style="width: 15%">
                                <label for="warna">Warna Dominan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_warnaDominanAsal"
                                        name="input_warnaDominanAsal" placeholder="Warna Dominan">
                                </div>
                            </div>
                            <div class="form-group" style="width: 15%">
                                <label for="barcode">Barcode Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_barcodeAsal"
                                        name="input_barcodeAsal"
                                        placeholder="000000000-000000000 (indeks)-(kode barang)">
                                </div>
                            </div>
                            <div class="form-group" style="width: 58.5%">
                                <label for="saldo_terakhirAsal">Saldo Terakhir Type Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_terakhirPrimerAsal"
                                        name="saldo_terakhirPrimerAsal" style='width:23%'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirPrimerAsal"
                                        name="satuan_saldoTerakhirPrimerAsal" style='width:10%'
                                        placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="saldo_terakhirSekunderAsal"
                                        name="saldo_terakhirSekunderAsal" style='width:23%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirSekunderAsal"
                                        name="satuan_saldoTerakhirSekunderAsal" style='width:10%'
                                        placeholder="Satuan Sekunder">
                                    <input type="text" class="form-control" id="saldo_terakhirTritierAsal"
                                        name="saldo_terakhirTritierAsal" style='width:23%'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTritierAsal"
                                        name="satuan_saldoTerakhirTritierAsal" style='width:10%'
                                        placeholder="Satuan Tritier">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>

@if ($id == 'JBBPotong')
    <script src="{{ asset('js/MultipleProgram/KonversiSetengahJadiJBBPotong.js') }}"></script>
@elseif ($id == 'ABMPotong')
    <script src="{{ asset('js/MultipleProgram/KonversiSetengahJadiABMPotong.js') }}"></script>
@elseif ($id == 'ADSPotong')
    <script src="{{ asset('js/MultipleProgram/KonversiSetengahJadiADSPotong.js') }}"></script>
@else
    <script>
        console.log('Belum ada file .js');
    </script>
@endif
@endsection
