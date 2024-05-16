@extends('layouts.appJumboBag') @section('content')
@section('title', 'Tabel Hitungan Tubing OPP')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/JumboBag/TabelHitungan.css') }}" rel="stylesheet">
<script>
    $(document).ready(function() {
        $('#tabelData').DataTable({});
    });
</script>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="container">
                <form>
                    <div
                        style="display: flex; flex-direction: row; gap:2%; border-bottom:black solid 1px; padding:5px;margin-bottom: 5px">
                        <div style="width: 49%">
                            <div style="display: flex; flex-direction: row;gap:2%">
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <label for="customer">Customer:</label>
                                    <label for="kode-barang">Kode Barang:</label>
                                </div>
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <input type="text" id="customer">
                                    <input type="text" id="kode-barang">
                                </div>
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <label for="tanggal">Tanggal:</label>
                                    <label style="white-space: nowrap" for="tanggal-update">Tanggal Update:</label>
                                </div>
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <input type="date" id="tanggal" value="2024-05-15">
                                    <input type="date" id="tanggal-update" value="2024-05-15">
                                </div>
                            </div>
                            <div style="width: 100%">
                                <legend>Body</legend>
                                <div style="display: flex; flex-direction: row;gap:2%">
                                    <div style="width:10%">
                                        <label for="body-bentuk">Bentuk:</label>
                                        <label for="body-model">Model:</label>
                                    </div>
                                    <div style="width:20%">
                                        <input type="text" id="body-bentuk" style="width:100%">
                                        <input type="text" id="body-model" style="width:100%">
                                    </div>
                                    <div style="width:10%">
                                        <label for="body-panjang">Panjang:</label>
                                        <label for="body-lebar">Lebar:</label>
                                    </div>
                                    <div style="width:18%">
                                        <input type="text" id="body-panjang" style="width:100%">
                                        <input type="text" id="body-lebar" style="width:100%">
                                    </div>
                                    <div style="width:10%">
                                        <label for="body-diameter">Diameter:</label>
                                        <label for="body-tinggi">Tinggi:</label>
                                    </div>
                                    <div style="width:18%">
                                        <input type="text" id="body-diameter" style="width:100%">
                                        <input type="text" id="body-tinggi" style="width:100%">
                                    </div>
                                </div>
                            </div>

                            <div style="width: 100%">
                                <legend>Cerobong Atas</legend>
                                <div style="display: flex; flex-direction: row; gap:2%; width:100%">
                                    <div style="width:10%">
                                        <label for="body-bentuk">Bentuk:</label>
                                        <label for="body-model">Model:</label>
                                    </div>
                                    <div style="width:20%">
                                        <input type="text" id="body-bentuk" style="width:100%">
                                        <input type="text" id="body-model" style="width:100%">
                                    </div>
                                    <div style="width:10%">
                                        <label for="body-panjang">Panjang:</label>
                                        <label for="body-lebar">Lebar:</label>
                                    </div>
                                    <div style="width:18%">
                                        <input type="text" id="body-panjang" style="width:100%">
                                        <input type="text" id="body-lebar" style="width:100%">
                                    </div>
                                    <div style="width:10%">
                                        <label for="body-diameter">Diameter:</label>
                                        <label for="body-tinggi">Tinggi:</label>
                                    </div>
                                    <div style="width:18%">
                                        <input type="number" id="body-diameter" style="width:100%">
                                        <input type="number" id="body-tinggi" style="width:100%">
                                    </div>
                                </div>
                            </div>

                            <div style="width:100%">
                                <legend>Cerobong Bawah</legend>
                                <div style="display: flex; flex-direction: row;gap:2%; width: 100%">
                                    <div style="width:10%">
                                        <label for="body-bentuk">Bentuk:</label>
                                        <label for="body-model">Model:</label>
                                    </div>
                                    <div style="width:20%">
                                        <input type="text" id="body-bentuk" style="width:100%">
                                        <input type="text" id="body-model" style="width:100%">
                                    </div>
                                    <div style="width:10%">
                                        <label for="body-panjang">Panjang:</label>
                                        <label for="body-lebar">Lebar:</label>
                                    </div>
                                    <div style="width:18%">
                                        <input type="text" id="body-panjang" style="width:100%">
                                        <input type="text" id="body-lebar" style="width:100%">
                                    </div>
                                    <div style="width:10%">
                                        <label for="body-diameter">Diameter:</label>
                                        <label for="body-tinggi">Tinggi:</label>
                                    </div>
                                    <div style="width:18%">
                                        <input type="number" id="body-diameter" style="width:100%">
                                        <input type="number" id="body-tinggi" style="width:100%">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 49%">
                            <div>
                                <legend>Reinforced</legend>
                                <div style="display: flex; flex-direction: row;gap:5px; width:100%">
                                    <div style="width:15%">
                                        <label style="width:100%; margin-bottom: 8%"
                                            for="reinforced-lebar">Lebar:</label>
                                        <label style="width:100%; margin-bottom: 8%" for="reinforced-beltrope">Belt /
                                            Rope:</label>
                                        <label style="width:100%; margin-bottom: 8%"
                                            for="reinforced-loop">Loop:</label>
                                        <label style="width:100%; margin-bottom: 8%" for="reinforced-SWL">SWL:</label>
                                        <label style="width:100%; margin-bottom: 8%" for="reinforced-stdwaktu">Std
                                            Waktu:</label>
                                        <label style="width:100%; margin-bottom: 8%"
                                            for="reinforced-lami">Lami:</label>
                                        <label style="width:100%; margin-bottom: 8%"
                                            for="reinforced-warna">Warna:</label>
                                        <label style="width:100%; margin-bottom: 8%"
                                            for="reinforced-inner">Inner:</label>
                                    </div>
                                    <div style="width:30%">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-lebar" placeholder="Lebar">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-beltrope" placeholder="Belt / Rope">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-loop" placeholder="Loop">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-SWL" placeholder="SWL">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-stdwaktu" placeholder="Std Waktu">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-lami" placeholder="Lami">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-warna" placeholder="Warna">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced-inner" placeholder="Inner">
                                    </div>
                                    <div style="display: flex; flex-direction: column;width:25%">
                                        <label for="reinforced-jumlah">Jumlah:</label>
                                        <label for="reinforced-jarak">Jarak:</label>
                                        <label for="reinforced-warna">Warna:</label>
                                        <label for="reinforced-tinggiloop">Tinggi Loop:</label>
                                        <label for="reinforced-SF">SF:</label>
                                        <label for="reinforced-printing">Printing(Y/N):</label>
                                        <label for="reinforced-tebal">Tebal(µ):</label>
                                        <div>
                                            <input type="checkbox" name="reinforced-seal" id="reinforced-seal">Seal
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: column; width:25%">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-jumlah" placeholder="Jumlah">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-jarak" placeholder="Jarak">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-warna" placeholder="Warna">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-tinggiloop" placeholder="Tinggi Loop">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-SF" placeholder="SF">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-printing" placeholder="(Y/N)">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced-tebal" placeholder="Tebal">
                                    </div>
                                </div>
                                <div>
                                    <label for="keterangan">Keterangan:</label>
                                    <textarea id="keterangan" style="width: 100%"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class=" ">
                        <label for="jenis-barang">Jenis Barang:</label>
                        <input type="text" id="jenis-barang">
                    </div>
                    <div style="overflow: auto; margin-top: 2%">
                        <table id="tabelData" class="table table-bordered" style="white-space: nowrap">
                            <thead class="table-primary">
                                <tr>
                                    <th>Kode</th>
                                    <th>Komponen</th>
                                    <th>Panjang</th>
                                    <th>Lebar</th>
                                    <th>WA</th>
                                    <th>WE</th>
                                    <th>Denier</th>
                                    <th>Qty</th>
                                    <th>Berat</th>
                                    <th>Harga/Kg</th>
                                    <th>Harga</th>
                                    <th>Ke</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div style="display: flex; flex-direction: row;width: 100%; gap:2%">
                        <div style="display: flex; flex-direction: row;width: 48%; gap:3%">
                            <button type="button" class="btn btn-info" style="width: 30%">Tambah Komponen</button>
                            <button type="button" class="btn btn-secondary" style="width: 30%">Koreksi Komponen</button>
                            <button type="button" class="btn btn-danger" style="width: 30%">Hapus Komponen</button>
                        </div>
                        <div style="display: flex; flex-direction: row;width: 48%;gap:1%">
                            <label style="width: 10%" for="">Total</label>
                            <input style="width: 30%" type="text" name="" id="">
                            <input style="width: 30%" type="text" name="" id="">
                            <input style="width: 30%" type="text" name="" id="">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: row;width: 100%; gap:2%;margin-top:3%">
                        <button style="width: 10%" class="btn btn-primary">Isi</button>
                        <button style="width: 15%" class="btn btn-warning">Koreksi</button>
                        <button style="width: 15%" class="btn btn-danger">Hapus</button>
                        <button style="width: 15%" class="btn btn-success">Proses</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{{-- <script type="text/javascript" src="{{ asset('js/JumboBag/TabelHitungan.js') }}"></script> --}}
@endsection
