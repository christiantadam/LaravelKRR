@extends('layouts.appJumboBag') @section('content')
@section('title', 'Tabel Hitungan Tubing OPP')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/JumboBag/TabelHitungan.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="acs-container">
                <div
                    style="display: flex; flex-direction: row; gap:2%; border-bottom:black solid 1px; padding:5px;margin-bottom: 5px">
                    <div style="width: 49%">
                        <div style="display: flex; flex-direction: row;gap:2%; width:100%">
                            <div style="display: flex;flex-direction: column; gap: 5%; width:20%">
                                <label for="customer">Customer:</label>
                                <label for="kode_barang">Kode Barang:</label>
                            </div>
                            <div style="display: flex;flex-direction: column; gap: 5%; width:40%">
                                <div style="display: flex;flex-direction: row; gap: 2%; width:100%">
                                    <input type="text" id="customer" style="width: 80%" disabled>
                                    <input type="hidden" name="id_customer" id="id_customer">
                                    <button style="width: 20%" id="btn_customer" disabled>...</button>
                                </div>
                                <div style="display: flex;flex-direction: row; gap: 2%; width:100%">
                                    <input type="text" style="width: 20%" id="komponen" disabled>
                                    <input type="text" style="width: 60%" id="nama_barang" disabled>
                                    <button style="width: 20%" id="btn_kode_barang" disabled>...</button>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column; gap: 5%; width:20%">
                                <label for="tanggal">Tanggal:</label>
                                <label style="white-space: nowrap" for="tanggal_update">Tanggal Update:</label>
                            </div>
                            <div style="display: flex;flex-direction: column; gap: 5%; width:20%">
                                <input type="date" id="tanggal" disabled>
                                <input type="date" id="tanggal_update" disabled>
                            </div>
                        </div>
                        <div style="width: 100%">
                            <legend>Body</legend>
                            <div style="display: flex; flex-direction: row;gap:2%">
                                <div style="width:10%">
                                    <label for="body_bentuk">Bentuk:</label>
                                </div>
                                <div style="width:20%">
                                    <input type="text" id="body_bentuk" style="width:100%" placeholder="[C] / [S]"
                                        disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="body_panjang">Panjang:</label>
                                    <label for="body_lebar">Lebar:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" id="body_panjang" style="width:100%" disabled>
                                    <input type="text" id="body_lebar" style="width:100%" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="body_diameter">Diameter:</label>
                                    <label for="body_tinggi">Tinggi:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" id="body_diameter" style="width:100%" disabled>
                                    <input type="text" id="body_tinggi" style="width:100%" disabled>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:4%; padding-right: 4%">
                                <label for="body_model">Model:</label>
                                <input type="text" id="body_model" style="width:100%" disabled>
                                <input type="hidden" id="id_body_model" name="id_body_model">
                                <button style="width: 10%" id="btn_body_model" disabled>...</button>
                            </div>
                        </div>

                        <div style="width: 100%">
                            <legend>Cerobong Atas</legend>
                            <div style="display: flex; flex-direction: row; gap:2%; width:100%">
                                <div style="width:10%">
                                    <label for="cerobongAtas_bentuk">Bentuk:</label>
                                </div>
                                <div style="width:20%">
                                    <input type="text" id="cerobongAtas_bentuk" style="width:100%"
                                        placeholder="[C] / [S]" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongAtas_panjang">Panjang:</label>
                                    <label for="cerobongAtas_lebar">Lebar:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" id="cerobongAtas_panjang" style="width:100%" disabled>
                                    <input type="text" id="cerobongAtas_lebar" style="width:100%" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongAtas_diameter">Diameter:</label>
                                    <label for="cerobongAtas_tinggi">Tinggi:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" id="cerobongAtas_diameter" style="width:100%" disabled>
                                    <input type="text" id="cerobongAtas_tinggi" style="width:100%" disabled>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:4%; padding-right: 4%">
                                <label for="cerobongAtas_model">Model:</label>
                                <input type="text" id="cerobongAtas_model" style="width:100%" disabled>
                                <input type="hidden" id="id_cerobongAtas_model" name="id_cerobongAtas_model">
                                <button style="width: 10%" id="btn_cerobongAtas_model" disabled>...</button>
                            </div>
                        </div>

                        <div style="width:100%">
                            <legend>Cerobong Bawah</legend>
                            <div style="display: flex; flex-direction: row;gap:2%; width: 100%">
                                <div style="width:10%">
                                    <label for="cerobongBawah_bentuk">Bentuk:</label>
                                </div>
                                <div style="width:20%">
                                    <input type="text" id="cerobongBawah_bentuk" style="width:100%"
                                        placeholder="[C] / [S]" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongBawah_panjang">Panjang:</label>
                                    <label for="cerobongBawah_lebar">Lebar:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" id="cerobongBawah_panjang" style="width:100%" disabled>
                                    <input type="text" id="cerobongBawah_lebar" style="width:100%" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongBawah_diameter">Diameter:</label>
                                    <label for="cerobongBawah_tinggi">Tinggi:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" id="cerobongBawah_diameter" style="width:100%" disabled>
                                    <input type="text" id="cerobongBawah_tinggi" style="width:100%" disabled>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:4%; padding-right: 4%">
                                <label for="cerobongBawah_model">Model:</label>
                                <input type="text" id="cerobongBawah_model" style="width:100%" disabled>
                                <input type="hidden" id="id_cerobongBawah_model" name="id_cerobongBawah_model">
                                <button style="width: 10%" id="btn_cerobongBawah_model" disabled>...</button>
                            </div>
                        </div>
                    </div>
                    <div style="width: 49%">
                        <div>
                            <legend>Reinforced</legend>
                            <div style="display: flex; flex-direction: row;gap:5px; width:100%">
                                <div style="width:15%">
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_lebar">Lebar:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_beltrope">Belt /
                                        Rope:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_loop">Loop:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_SWL">SWL:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_stdwaktu">Std
                                        Waktu:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_lami">Lami:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_warna">Warna:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_inner">Inner:</label>
                                </div>
                                <div style="width:30%">
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_lebar"
                                        name="reinforced_lebar" placeholder="Lebar" disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text"
                                        id="reinforced_beltrope" name="reinforced_beltrope" placeholder="Belt / Rope"
                                        disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_loop"
                                        name="reinforced_loop" placeholder="Loop" disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_SWL"
                                        name="reinforced_SWL" placeholder="SWL" disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text"
                                        id="reinforced_stdwaktu" name="reinforced_stdwaktu" placeholder="Std Waktu"
                                        disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_lami"
                                        name="reinforced_lami" placeholder="Lami" disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_warna"
                                        name="reinforced_warna" placeholder="Warna" disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_inner"
                                        name="reinforced_inner" placeholder="Inner" disabled>
                                </div>
                                <div style="display: flex; flex-direction: column;width:25%">
                                    <label for="reinforced_jumlah">Jumlah:</label>
                                    <label for="reinforced_jarak">Jarak:</label>
                                    <label for="reinforced_warnaBelt">Warna:</label>
                                    <label for="reinforced_tinggiloop">Tinggi Loop:</label>
                                    <label for="reinforced_SF">SF:</label>
                                    <label for="reinforced_printing">Printing(Y/N):</label>
                                    <label for="reinforced_tebal">Tebal(µ):</label>
                                    <div>
                                        <input type="checkbox" name="reinforced_seal" id="reinforced_seal"
                                            disabled>Seal
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; width:25%">
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        id="reinforced_jumlah" placeholder="Jumlah" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text" id="reinforced_jarak"
                                        placeholder="Jarak" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        id="reinforced_warnaBelt" placeholder="Warna" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        id="reinforced_tinggiloop" placeholder="Tinggi Loop" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text" id="reinforced_SF"
                                        placeholder="SF" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        id="reinforced_printing" placeholder="(Y/N)" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text" id="reinforced_tebal"
                                        placeholder="Tebal" disabled>
                                </div>
                            </div>
                            <div>
                                <label for="reinforced_keterangan">Keterangan:</label>
                                <textarea id="reinforced_keterangan" name="reinforced_keterangan" style="width: 100%" disabled></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=" ">
                    <label for="jenis_barang">Jenis Barang:</label>
                    <input type="text" id="jenis_barang" name="jenis_barang" disabled>
                </div>
                <div style="overflow: auto; margin-top: 2%;border:1px solid black;border-bottom: none;padding:5px">
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
                <div
                    style="display: flex; flex-direction: row;width: 100%; gap:2%;border:1px solid black;border-top:none;padding: 2px 2px 20px 5px">
                    <div style="display: flex; flex-direction: row;width: 48%; gap:3%">
                        <button type="button" id="tambah_komponen" class="btn btn-info" style="width: 30%"
                            disabled>Tambah Komponen</button>
                        <button type="button" id="koreksi_komponen" class="btn btn-secondary" style="width: 30%"
                            disabled>Koreksi Komponen</button>
                        <button type="button" id="hapus_komponen" class="btn btn-danger" style="width: 30%"
                            disabled>Hapus Komponen</button>
                    </div>
                    <div style="display: flex; flex-direction: row;width: 48%;gap:1%">
                        <label style="width: 10%" for="">Total</label>
                        <input style="width: 30%" type="text" name="total1" id="total1" disabled>
                        <input style="width: 30%" type="text" name="total2" id="total2" disabled>
                        <input style="width: 30%" type="text" name="total3" id="total3" disabled>
                    </div>
                </div>
                <div style="display: flex; flex-direction: row;width: 100%; gap:2%;margin-top:3%">
                    <div
                        style="display: flex; flex-direction: row;width: 60%; gap:2%;border:1px solid black;padding:5px">
                        <button style="width: 20%" id="btn_isi" class="btn btn-primary">Isi</button>
                        <button style="width: 30%" id="btn_koreksi" class="btn btn-warning">Koreksi</button>
                        <button style="width: 30%" id="btn_hapus" class="btn btn-danger">Hapus</button>
                    </div>
                    <div style="display: flex; flex-direction: row;width: 40%; gap:2%;place-content:end">
                        <button style="width: 35%;margin-right:60%" id="btn_proses" class="btn btn-success"
                            disabled>Proses</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/JumboBag/TabelHitungan.js') }}"></script>
@endsection
