@extends('layouts.appJumboBag')
@section('title', 'ACC Permohonan Konversi Potong')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Permohonan Konversi Potong</div>
                    <div class="card-body table-responsive mt-1">
                        <table class="table" id="table_permohonanKonversiPotong">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Kode Konversi</th>
                                    <th>Nama User</th>
                                    <th>Waktu Input (DD-MM-YYYY)</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div>
                            <button class="btn btn-secondary" id="button_pilihSemuaPermohonan">Pilih Semua Permohonan</button>
                            <button class="btn btn-success" id="button_accPermohonanYangDipilih">ACC Permohonan yang Dipilih</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal untuk Detail Permohonan -->
    <div class="modal fade" id="detailPermohonanModal" tabindex="-1" aria-labelledby="detailPermohonanModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" style="max-width: 90%;">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title" id="detailPermohonanModalLabel">Detail Permohonan Konversi </h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
                    <button type="submit" class="btn btn-success btn-acc" id="button_modalACC">Proses ACC</button>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/MultipleProgram/ACCPermohonanKonversiPotong.js') }}"></script>
@endsection
