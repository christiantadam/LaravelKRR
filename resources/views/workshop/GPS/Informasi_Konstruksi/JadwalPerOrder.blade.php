@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Jadwal Per Order
                    </div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="NoOrder" class="form-label">Nomor Order</label>
                                    <input type="text" class="form-control" name="NoOrder">
                                </div>
                                <div class="mb-3">
                                    <label for="divisi" class="form-label">Divisi</label>
                                    <input type="text" class="form-control" name="divisi">
                                </div>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <p for="Kode_Barang" class="form-label">Kode Barang</p>
                                            <input type="text" class="form-control" name="Kode_Barang">
                                        </div>
                                        <div class="col-6">
                                            <p for="NoGambarRev" class="form-label">Nomor Gambar Rev</p>
                                            <input type="text" class="form-control" name="NoGambarRev">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="NamaBarang" class="form-label">Nama Barang</label>
                                    <input type="text" class="form-control" name="NamaBarang">
                                </div>
                                <div class="mb-3">
                                    <label for="Mesin" class="form-label">Mesin</label>
                                    <input type="text" class="form-control" name="Mesin">
                                </div>
                                <div class="mb-3">
                                    <label for="Pengorder" class="form-label">Pengorder</label>
                                    <input type="text" class="form-control" name="Pengorder">
                                </div>
                                <div class="mb-3">
                                    <label for="KetOrder" class="form-label">Keterangan Order</label>
                                    <input type="text" class="form-control" name="KetOrder">
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
                        <div class="mb-3">
                            {{-- width: 110vh; height: 7vh; --}}
                            <label for="NamaBagian" class="form-label">Nama Bagian</label><br>
                            <select class="form-select" name="NamaBagian" style="width: 36vh; height: 5vh;">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <table class="table" style="padding-top: 15px">
                            <thead class="table-dark">
                                <tr>
                                    <th>Nomor</th>
                                    <th>Tanggal Start</th>
                                    <th>WorkStation</th>
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
                            <tbody>
                                <tr>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>john@example.com</td>
                                    <td>wdwadw</td>
                                    <td>wdawdawd</td>
                                    <td>wdawdawd</td>
                                    <td>wdawdawd</td>
                                    <td>wdawdawd</td>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>john@example.com</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
