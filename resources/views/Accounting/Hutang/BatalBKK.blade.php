@extends('layouts.appAccounting')
@section('content')
@section('title', 'Batal BKK')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-7 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Batal BKK</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('BatalBKK') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="row">
                                    <div class="col-md-5">
                                        <input type="radio" name="radiogrup1" value="besar" id="kasBesar" checked>
                                        <label for="kasBesar">Kas Besar</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="radio" name="radiogrup1" value="kecil" id="kasKecil">
                                        <label for="kasKecil">Kas Kecil</label>
                                    </div>
                                </div>
                                <p><div class="row">
                                    <div class="col-md-3">
                                        <label for="bulanTahun">Bulan/Tahun</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="bulanTahun" name="bulanTahun" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br><div class="row">
                                    <div class="col-md-3">
                                        <label for="bkk" style="margin-right: 10px;">BKK</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="idBKKSelect" name="idBKKSelect" class="form-control">

                                        </select>
                                    </div>
                                </div>
                                <hr style="height:2px;">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label for="statusPenagihan">Status Penagihan</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" id="statusPenagihan" name="statusPenagihan" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="row">
                                    <div class="col-md-3">
                                        <label for="mataUang">Mata Uang</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="mataUang" name="mataUang" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="row">
                                    <div class="col-md-3">
                                        <label for="nilaiBKM">Nilai BKK</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" id="nilaiBKK" name="nilaiBKK" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br><div class="row">
                                    <div class="col-md-3">
                                        <label for="statusPelunasan">Status Pelunasan</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="statusPelunasan" name="statusPelunasan" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="row">
                                    <div class="col-md-3">
                                        <label for="statusBatal">Status BATAL</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="date" id="statusBatal" name="statusBatal" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <hr style="height:2px;">
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="alasan" style="margin-right: 10px;">Alasan</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="alasan" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <input type="submit" id="btnProses" name="proses" value="PROSES" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-10">
                                            <input type="submit" id="btnKeluar" name="keluar" value="KELUAR" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Hutang/BatalBKK.js') }}"></script>
@endsection
