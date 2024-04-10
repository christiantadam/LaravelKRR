@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Daftar Estimasi Jadwal
                    </div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <input type="radio" name="pilihan" value="Hariini" onclick="tanggalhariini()">
                        <label for="Hariini">Estimasi Tanggal Finish Per Hari ini <span id="hari_ini"
                                style="color: red"></span></label><br>
                        <div class="row">
                            <div class="col-3">
                                <input type="radio" name="pilihan" value="atur" onclick="atur()">
                                <label for="atur">Estimasi Jadwal mulai </label>
                            </div>
                            <div class="col-3">
                                <input type="Date" class="form-control" name="tgl">
                            </div>
                            <p style="padding-top: 8px">s/d</p>
                            <div class="col-3">
                                <input type="Date" class="form-control" name="tgl">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <span style="color: red;">xxxxx ->: Over Time</span>
                                <span style="color: blue; padding-left:10vh;">xxxxx ->: Finish</span>
                            </div>
                            <div class="col-4">
                                <a href="" class="btn btn-primary">OK</a>
                            </div>
                        </div>
                        <table class="table" style="padding-top: 15px">
                            <thead class="table-dark">
                                <tr>
                                    <th>Nomor</th>
                                    <th>Nama Divisi</th>
                                    <th>Nama Barang</th>
                                    <th>Tanggal Start</th>
                                    <th>Tanggal Finish</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>john@example.com</td>
                                    <td>wdwadw</td>
                                    <td>wdawdawd</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="mb-3">
                            <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function tanggalhariini() {
            var dt = new Date();

            var d = dt.getDate();
            var m = dt.getMonth() + 1;
            var y = dt.getFullYear();

            if (d < 10) {
                d = '0' + d;
            }

            if (m < 10) {
                m = '0' + m;
            }

            var formattedDate = d + '-' + m + '-' + y;
            document.getElementById('hari_ini').innerHTML = formattedDate;
        }

        function atur() {
            document.getElementById('hari_ini').innerHTML = '';
        }
    </script>
@endsection
