@extends('Circular.layouts.app')

@section('title')
    Ganti RPM / Shutle
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Ganti RPM / Shutle</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <div class="row pb-2">
                                    <div class="col-sm-2">
                                        <label for="tanggal" class="form-label">Tanggal</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="date" class="form-control" id="tanggal" name="tanggal">
                                    </div>
                                    <div class="col-sm-1">
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="radio" id="gantiRPM" name="opsi" value="gantiRPM">
                                        <label for="gantiRPM">Ganti RPM</label>

                                    </div>
                                    <div class="col-sm-2">
                                        <input type="radio" id="gantiShutle" name="opsi" value="gantiShutle">
                                        <label for="gantiShutle">Ganti Shutle</label>
                                    </div>
                                </div>
                                <div class="row pb-2">
                                    <div class="col-sm-2">
                                        <label for="shift" class="form-label">Shift</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <select class="form-control" id="shift" name="shift">
                                            <option value="shiftN">Pilih Shift ▼</option>
                                            <option value="shiftP">P</option>
                                            <option value="shiftS">S</option>
                                            <option value="shiftM">M</option>
                                        </select>
                                    </div>
                                </div>  
                                <div class="row pb-2">
                                    <div class="col-sm-2">
                                        <label for="nama_mesin" class="form-label">Nama Mesin</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control" id="nama_mesin" name="nama_mesin">
                                    </div>
                                </div>
                                <br>
                                <table class="table" id="table_atas">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>ID. Log</th>
                                            <th>Status Log</th>
                                            <th>Shift</th>
                                            <th>RPM</th>
                                            <th>Shutle</th>
                                            <th>ID. Order</th>
                                            <th>ID. Karyawan</th>
                                            <th>Counter Awal</th>
                                            <th>Counter Akhir</th>
                                            <th>Jam Awal</th>
                                            <th>Jam Akhir</th>
                                            <th>ID. User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                <br>
                                <div class="row pb-2">
                                    <div class="col-sm-2">
                                        <label for="ganti_rpm" class="form-label">Ganti RPM</label>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control" id="ganti_rpm" name="ganti_rpm">
                                    </div>
                                    <div class="col-sm-2">
                                        <button class="btn btn-success" id="btn_proses">Proses</button>
                                    </div>
                                    <div class="col" style="text-align: right;">
                                        <button class="btn btn-danger" id="btn_batal">Batal</button>
                                    </div>
                                </div>
                            </form>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/koreksi/GantiRPMShutle.js') }}"></script>
@endsection
