@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Penagihan')

<style>
    /* Ganti warna latar belakang overlay dan atur posisi modal */
    .modal-backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    /* Atur posisi modal */
    .modal-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Penagihan Tanda</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenancePenagihan') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="container fluid">
                                    <div class="row">

                                        <div class="col-md-2 ">
                                            <label for="id">ID Penagihan</label>
                                        </div>
                                        <div class="col-md-2 ">
                                            <select name="nama_select" class="form-control" style="width: 400px;">
                                                <option value="option1">Pilihan 1</option>
                                                <option value="option2">Pilihan 2</option>
                                                <option value="option3">Pilihan 3</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2 d-flex ml-auto">
                                            <label for="id" >Tanggal </label>
                                            <input type="date" name="jenissupplier1" class="form-control" style="width: 100%"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="container fluid">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Supplier</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" name="namaSupplier" id="namaSupplier" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="idSupplier" id="idSupplier" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="supplierSelect" id="supplierSelect" class="form-control" disabled>
                                                <option disabled selected>-- Pilih Supplier --</option>
                                                @foreach ($maintenancePenagihan as $mp)
                                                <option value="{{ $mp->NO_SUP }}">{{ $mp->NO_SUP }} | {{ $mp->NM_SUP }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="container fluid">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">ID Penagihan Supplier</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" name="jenisbayar" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <!--CARD-->
                                <p><div class="container fluid">
                                    <div class="card">
                                        <p><div class="row">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label for="id" style="padding-left: 15px">Mata Uang</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" name="matauang" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label for="id" style="padding-left: 15px">Tagihan</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="number" name="tagihan" class="form-control">
                                                        <input type="submit" name="dirupiahkan" value="DIRUPIAHKAN" class="btn btn-primary" style="width: 100%">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <label for="id">Pembulatan</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <input type="number" name="pembulatan" class="form-control">
                                                        <input type="submit" name="dirupiahkan" value="DIRUPIAHKAN" class="btn btn-primary"><p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="row">
                                                    <div class="col-md-1">
                                                        <input type="checkbox" name="status">
                                                    </div>
                                                    <div class="col-md-9">
                                                        <label for="id">Free of Charge</label>
                                                        <input type="submit" name="keterangan" value="Keterangan" class="btn btn-primary">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p>
                                    <div class="radio-container">
                                        <div>
                                            <input type="radio" name="radiogrup" value="po" id="detailPO" required>
                                            <label for="detailPO">Detail PO</label>
                                        </div>
                                        <button>Tampilkan Surat Jalan</button>
                                        <div>
                                            <input type="radio" name="radiogrup" value="faktur" id="detailFakturPajak" required>
                                            <label for="detailFakturPajak">Detail Faktur Pajak</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="radiogrup" value="pib" id="pib">
                                            <label for="radio_3">PIB</label>
                                        </div>
                                    </div>

                                    <!--TABEL-->
                                    <p>
                                    <div class="table-container">
                                        <div class="table-col">
                                            <table style="width: 80%;" class="table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>ID Div</th>
                                                        <th>SPPB</th>
                                                        <th>Nilai</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div class="table-col">
                                            <table style="width: 105%" class="table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>ID Detail</th>
                                                        <th>NOMOR FAKTUR</th>
                                                        <th>Nilai MURNI</th>
                                                        <th>PAJAK</th>
                                                        <th>Nilai Pajak</th>
                                                        <th>KURS</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>

                                    <div>
                                        <p>
                                        <div style="display: inline-block; vertical-align: middle; padding-right: 180px">
                                            <h6 style="margin: 0;">TOTAL Detail Penagihan</h6>
                                        </div>
                                        <div class="numeric-column" id="numeric-column">
                                            <!-- Angka akan ditambahkan secara dinamis menggunakan JavaScript -->
                                        </div>

                                        <div style="display: inline-block; vertical-align: middle; padding-left: 110px">
                                            <h6 style="margin: 0;">TOTAL Detail Faktur Pajak</h6>
                                        </div>
                                        <div class="numeric-column" id="numeric-column">
                                            <!-- Angka akan ditambahkan secara dinamis menggunakan JavaScript -->
                                        </div>
                                    </div>

                                    <p>
                                    <div class="row">
                                        <div class="col-2">
                                            <input type="submit" name="btnIsiDetail" id="btnIsiDetail" class="btn btn-primary" value="ISI Detail" onclick="validateIsiDetail()"></a>
                                            {{-- <a href="{{ url('MPIsiDetail') }}" type="submit" name="btnIsiDetail2" id="btnIsiDetail2" class="btn btn-primary" hidden>ISI Detail</a> --}}
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" name="btnKoreksiDetail" id="btnKoreksiDetail" value="KOREKSI Detail" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="btnHapusDetail" id="btnHapusDetail" value="HAPUS Detail" class="btn btn-primary" disabled>
                                        </div>
                                    </div>

                                    <hr style="height:2px;">
                                    <div class="row">
                                        <div style="padding-left: 15px">
                                            <input type="submit" name="isi" id="btnIsi" value="ISI" class="btn btn-primary" onclick="clickIsi()">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="koreksi" id="btnKoreksi" value="KOREKSI" class="btn btn-primary" onclick="clickKoreksi()">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="isi" id="btnPrint" value="PRINT" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-9">
                                            <input type="submit" name="batal" id="btnBatal" value="Batal" class="btn btn-primary" style="display: none" onclick="">
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade" id="isiDetailModal" tabindex="-1" role="dialog" aria-labelledby="isiDetailModalLabel" aria-hidden="true">
                                    <div class="modal-dialog " role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="isiDetailModalLabel">Isi Detail Faktur Pajak</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <!-- Tambahkan konten modal di sini -->
                                                <!-- Misalnya, Anda dapat menyertakan beberapa informasi atau formulir untuk diisi -->
                                                <!-- Ganti URL aksi formulir dengan URL yang sesuai untuk menangani pengiriman formulir -->
                                                <form action="{{ url('handle_form_submission_faktur') }}" method="post">
                                                    <div class="container fluid">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <label for="id">Tgl F. Pajak</label>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <input type="date" name="namaSupplier" id="namaSupplier" class="form-control" style="width: 100%">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container fluid">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <label for="id">Nomor Seri</label>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="namaSupplier" id="namaSupplier" class="form-control" style="width: 100%">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container fluid">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <label for="id">Nilai</label>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="namaSupplier" id="namaSupplier" class="form-control" style="width: 100%">
                                                            </div>
                                                            <div class="col-md-3">
                                                                = Harga Murni
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Hutang/MaintenancePenagihan.js') }}"></script>
@endsection
