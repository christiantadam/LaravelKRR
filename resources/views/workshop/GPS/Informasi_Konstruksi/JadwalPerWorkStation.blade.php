@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Jadwal Per WorkStation</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
                        <div class="row">
                            <div class="col-6">
                                {{-- width: 110vh; height: 7vh; --}}
                                <div class="row" style="align-items: center;">
                                    <div class="col-3">
                                        <label for="Workstation" class="form-label">Work Station</label>
                                    </div>
                                    <div class="col-9">
                                        <select class="custom-select" name="WorkStation" style="width: 36vh;height: 5vh;"
                                            id="WorkStation">
                                            <option disabled selected>Pilih Work Station</option>
                                            @foreach ($data as $d)
                                                <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} --
                                                    {{ $d->NamaWorkStation }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <label for="tgl" class="form-label" style="padding-top: 10px">Tanggal</label>
                                <div class="row">
                                    <div class="col-4">
                                        <input type="date" class="form-control" name="tglawal" id="tglawal">
                                    </div>
                                    <p style="padding-top: 8px">s/d</p>
                                    <div class="col-4">
                                        <input type="date" class="form-control" name="tglakhir" id="tglakhir">
                                    </div>
                                    <div class="col-4">
                                        <button type="button" class="btn btn-primary" id="btnok">OK</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 keterangan">
                                <div class="row">
                                    <div class="col-6">
                                        <p style="color:red">xxxxx -> : Emergency</p>
                                        <p style="color:rgb(131, 20, 159)">xxxxx -> : Ditolak</p>
                                        <p style="color:rgb(234, 121, 234)">xxxxx -> : Edit EstDate / diDelete</p>
                                    </div>
                                    <div class="col-6">
                                        <p style="color:rgb(77, 240, 246)">xxxxx -> : Finish, sudah diproses</p>
                                        <p style="color:rgb(2, 106, 4)">xxxxx -> : Finish, disetujui</p>
                                        <p style="color:rgb(213, 163, 12)">xxxxx -> : Finish, tidak disetujui, dijadwal
                                            ulang</p>
                                        <p style="color:rgb(53, 55, 198)">xxxxx -> : Finish Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table" style="padding-top: 15px; width:max-content;" id="TableDatas">
                                <thead class="table-dark" style="white-space:nowrap">
                                    <tr>
                                        <th>Nomor</th>
                                        <th>No Order</th>
                                        <th>Tanggal Start</th>
                                        <th>Divisi</th>
                                        <th>Nama Barang</th>
                                        <th>Nama Bagian</th>
                                        <th>Status Order</th>
                                        <th>Est. Time</th>
                                        <th>Hari ke-</th>
                                        <th>Jadwal Proses Finish</th>
                                        <th>Realtime</th>
                                        <th>Keterangan</th>
                                        <th>Tanggal disetujui</th>
                                        <th>Keterangan tidak disetujui</th>
                                        <th>Tanggal tidak disetujui</th>
                                    </tr>
                                </thead>
                                <tbody> </tbody>
                            </table>
                        </div>
                        <div class="mb-3">
                            <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Andre-WorkShop/GPS/InformasiKonstruksi/JadwalPerWorkstation.js') }}"></script>
@endsection
