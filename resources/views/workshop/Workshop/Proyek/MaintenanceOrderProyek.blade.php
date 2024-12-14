@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Order Proyek')
<link href="{{ asset('css/Workshop/Transaksi/MaintenanceOrderGambar.css') }}" rel="stylesheet">
@if (Session::has('success'))
    <div class="alert alert-success">
        {{ Session::get('success') }}
    </div>
@elseif (Session::has('error'))
    <div class="alert alert-danger">
        {{ Session::get('error') }}
    </div>
@endif
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">
                    Maintenance Order Proyek
                </div>

                <div class="card-body">
                    <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-3">
                                    <span class="custom-alignment">Tgl. Order:</span>
                                </div>
                                <div class="col-lg-9">
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal">
                                        </div>
                                        <div class="col-lg-2 d-flex justify-content-center">
                                            <span style="margin-top: 5px;">s/d</span>
                                        </div>
                                        <div class="col-lg-5">
                                            <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-3">
                                    <span class="custom-alignment">Divisi:</span>
                                </div>

                                <div class="col-lg-9">
                                    <select class="form-select" name="KodeDivisi"
                                        style="width: 36vh;
                                    height: 6vh;"
                                        id="kddivisi">
                                        <option disabled selected>Pilih Divisi</option>
                                        @foreach ($divisi as $d)
                                            <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} --
                                                {{ $d->NamaDivisi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top: 10px">
                                <table class="table mt-3" id="tableMaintenanceOrderProyek" style="width: max-content">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>No.Order</th>
                                            <th>Tgl.Order</th>
                                            <th>Nama Proyek</th>
                                            <th>Status Order</th>
                                            <th>Mesin</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <button type="button" class="btn btn-info" id="refresh">Refresh</button>

                        </div>

                        <div class="col-lg-6">
                            <h3 id="lblstatus" style="text-align: center;color:hotpink"> </h3>
                            <div class="row">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">No. Order:</span>
                                </div>

                                <div class="col-lg-5">
                                    <input type="text" name="no_order" class="form-control" id="no_order" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Jumlah:</span>
                                </div>

                                <div class="col-lg-5">
                                    <div class="input-group">
                                        <input type="number" name="jmlh1" class="form-control" id="jmlh1">
                                        <input type="text" name="jmlh2" class="form-control" style="width: 7.5vw;"
                                            id="jmlh2">
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Keterangan Order:</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="text" name="keterangan_order" class="form-control"
                                        id="keterangan_order">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Peng-Order:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="text" name="pengorder" class="form-control" id="pengorder">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">ACC Manager:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="text" name="acc_manager" class="form-control" id="acc_manager" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Manager:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" name="manager" class="form-control" id="manager" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">ACC Direktur:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" name="acc_direktur" class="form-control"
                                        id="acc_direktur" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Tgl. tdk disetujui Manager:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" name="tgl_manager" class="form-control" id="tgl_manager" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Ket. tdk disetujui Manager:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="text" name="ket_manager" class="form-control" id="ket_manager">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Tgl. tdk disetujui Direktur:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" name="tgl_direktur" class="form-control"
                                        id="tgl_direktur" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Ket. tdk disetujui Direktur:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="text" name="ket_direktur" class="form-control"
                                        id="ket_direktur">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Tgl. Ditolak Div. Teknik:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="datetime-local" name="tgl_teknik" class="form-control" id="tgl_teknik" readonly>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Ket. Ditolak Div. Teknik:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="text" name="ket_teknik_tolak" class="form-control"
                                        id="ket_teknik_tolak">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Ket. Ditunda Div. Teknik:</span>
                                </div>

                                <div class="col-lg-6">
                                    <input type="text" name="ket_teknik_tunda" class="form-control"
                                        id="ket_teknik_tunda">
                                </div>
                            </div>

                            <div class="row mt-3 d-flex justify-content-center">
                                <div class="col-lg-12 content-center">
                                    <div>
                                        <button type="button" class="btn btn-success custom-btn" id="isi"
                                            onclick="isiklik()">ISI</button>
                                        <button type="button" class="btn btn-warning custom-btn" id="koreksi"
                                            onclick="klikkoreksi()">KOREKSI</button>
                                        <button type="button" class="btn btn-danger custom-btn"
                                            id="hapus">HAPUS</button>
                                    </div>
                                </div>
                            </div>

                            <div class="keterangan keterangan-padding mt-3">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <span style="color: red;">xxxxx -></span>
                                        <span> : ACC Direktur</span><br>

                                        <span style="color: deeppink;">xxxxx -></span>
                                        <span> : Ditunda Div. Teknik</span><br>

                                        <span style="color: green;">xxxxx -></span>
                                        <span> : Ditolak Div. Teknik</span><br>
                                    </div>

                                    <div class="col-lg-6">
                                        <span style="color: blue;">xxxxx -></span>
                                        <span> : ACC Direktur</span><br>

                                        <span style="color: grey;">xxxxx -></span>
                                        <span> : Tdk disetujui Direktur</span><br>

                                        <span style="color: brown;">xxxxx -></span>
                                        <span> : Tdk disetujui Manager</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="ModalForm" tabindex="-1" role="dialog" aria-labelledby="ModalIsiLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="namadivisimodal" style="padding-left: 15px">Judul Modal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="post" id="FormModal" action="{{ url('MaintenanceOrderProyek') }}">
                {{ csrf_field() }}
                <input type="hidden" name="_method" id="methodForm">
                <input type="hidden" name="iddivmodal" id="iddivmodal">
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <span style="font-weight: bold">Order Kerja</span>
                            </div>
                        </div>
                        <div class="row" style="align-items: center;">
                            <div class="col-3">
                                <span>Tanggal</span>
                            </div>
                            <div class="col-4">
                                <input type="date" name="Tanggalmodal" class="form-control" id="Tanggalmodal"
                                    readonly>
                            </div>
                            <div class="col-2">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="BuatModal" value="Buat">
                                <label class="form-check-label" for="BuatModal">Buat</label>
                            </div>
                            <div class="col-3">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="PerbaikanModal" value="Perbaikan">
                                <label class="form-check-label" for="PerbaikanModal">Perbaikan</label>
                            </div>
                        </div>
                        <div class="row" style="align-items: center;margin-top:10px">
                            <div class="col-3">
                                <span>Nama Proyek</span>
                            </div>
                            <div class="col-9">
                                <input type="text" name="NamaProyekModal" class="form-control"
                                    id="NamaProyekModal">
                            </div>
                        </div>
                        <div class="row" style="align-items: center;margin-top:10px">
                            <div class="col-3">
                                <span>Keterangan</span>
                            </div>
                            <div class="col-9">
                                <input type="text" name="KeteranganModal" class="form-control"
                                    id="KeteranganModal">
                            </div>
                        </div>
                        <div class="row" style="align-items: center; margin-top:10px;">
                            <div class="col-3">
                                <span>Jumlah</span>
                            </div>
                            <div class="col-3">
                                <input type="number" name="Jumlah" class="form-control" id="Jumlah">
                            </div>
                            <div class="col-6">
                                <select class="input" name="SatuanModal" id="SatuanModal">
                                    <option disabled selected>Pilih Satuan</option>
                                    @foreach ($satuan as $s)
                                        <option value="{{ $s->No_Satuan }}">{{ $s->Nama_Satuan }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="row" style="align-items: center;margin-top:10px;">
                            <div class="col-3">
                                <span>Mesin</span>
                            </div>
                            <div class="col-9">
                                <select name="MesinModal" id="MesinModal" class="input">

                                </select>
                            </div>
                        </div>
                        <div class="row" style="align-items: center;margin-top:10px">
                            <div class="col-3">
                                <span>Peng-Order</span>
                            </div>
                            <div class="col-4">
                                <input type="text" name="PengOrderModal" class="form-control" id="PengOrderModal"
                                    style="color: blue" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="ProsesModal"
                        onclick="ProsesKlik()">Proses</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript">
    let user = @json($nomoruser);
    console.log('User number is:', user);
</script>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Proyek/MaintenanceOrderProyek.js') }}"></script>
@endsection
