@extends('layouts.appJumboBag') @section('content')
@section('title', 'Tabel Hitungan Tubing OPP')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/JumboBag/TabelHitungan.css') }}" rel="stylesheet">
<div class="container-fluid">
    <style>
        button {
            cursor: pointer;
        }

        button:disabled {
            cursor: default;
        }

        .input-error {
            outline: 1px solid red;
            text-decoration-color: red;
        }
    </style>
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
                                    <input type="text" name="customer" id="customer" style="width: 80%" disabled>
                                    <input type="hidden" name="id_customer" id="id_customer">
                                    <button style="width: 20%" id="btn_customer" disabled>...</button>
                                </div>
                                <div style="display: flex;flex-direction: row; gap: 2%; width:100%">
                                    <input type="text" style="width: 20%" name="komponen" id="komponen" disabled>
                                    <input type="text" style="width: 60%" name= "nama_barang" id="nama_barang"
                                        disabled>
                                    <button style="width: 20%" id="btn_nama_barang" disabled>...</button>
                                </div>
                            </div>
                            <div style="display: flex;flex-direction: column; gap: 5%; width:20%">
                                <label for="tanggal">Tanggal:</label>
                                <label style="white-space: nowrap" for="tanggal_update">Tanggal Update:</label>
                            </div>
                            <div style="display: flex;flex-direction: column; gap: 5%; width:20%">
                                <input type="date" name="tanggal" id="tanggal" disabled>
                                <input type="date" name="tanggal_update" id="tanggal_update" disabled>
                            </div>
                        </div>
                        <div style="width: 100%">
                            <legend>Body</legend>
                            <div style="display: flex; flex-direction: row;gap:2%">
                                <div style="width:10%">
                                    <label for="body_bentuk">Bentuk:</label>
                                </div>
                                <div style="width:20%">
                                    <input type="text" name="body_bentuk" id="body_bentuk" style="width:100%"
                                        placeholder="[C] / [S]" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="body_panjang">Panjang:</label>
                                    <label for="body_lebar">Lebar:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" name="body_panjang" id="body_panjang" style="width:100%"
                                        disabled>
                                    <input type="text" name="body_lebar" id="body_lebar" style="width:100%" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="body_diameter">Diameter:</label>
                                    <label for="body_tinggi">Tinggi:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" name="body_diameter" id="body_diameter" style="width:100%"
                                        disabled>
                                    <input type="text" name="body_tinggi" id="body_tinggi" style="width:100%"
                                        disabled>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:4%; padding-right: 4%">
                                <label for="body_model">Model:</label>
                                <div style="display: flex; flex-direction: row;width:80%">
                                    <input type="text" id="id_body_model" name="id_body_model" style="width:20%"
                                        disabled>
                                    <input type="text" name="body_model" id="body_model" style="width:80%" disabled>
                                </div>
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
                                    <input type="text" name="cerobongAtas_bentuk" id="cerobongAtas_bentuk"
                                        style="width:100%" placeholder="[C] / [S]" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongAtas_panjang">Panjang:</label>
                                    <label for="cerobongAtas_lebar">Lebar:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" name="cerobongAtas_panjang" id="cerobongAtas_panjang"
                                        style="width:100%" disabled>
                                    <input type="text" name="cerobongAtas_lebar" id="cerobongAtas_lebar"
                                        style="width:100%" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongAtas_diameter">Diameter:</label>
                                    <label for="cerobongAtas_tinggi">Tinggi:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" name="cerobongAtas_diameter" id="cerobongAtas_diameter"
                                        style="width:100%" disabled>
                                    <input type="text" name="cerobongAtas_tinggi" id="cerobongAtas_tinggi"
                                        style="width:100%" disabled>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:4%; padding-right: 4%">
                                <label for="cerobongAtas_model">Model:</label>
                                <div style="display: flex; flex-direction: row;width:80%">
                                    <input type="text" id="id_cerobongAtas_model" name="id_cerobongAtas_model"
                                        style="width:20%" disabled>
                                    <input type="text" name="cerobongAtas_model" id="cerobongAtas_model"
                                        style="width:80%" disabled>
                                </div>
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
                                    <input type="text" name="cerobongBawah_bentuk" id="cerobongBawah_bentuk"
                                        style="width:100%" placeholder="[C] / [S]" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongBawah_panjang">Panjang:</label>
                                    <label for="cerobongBawah_lebar">Lebar:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" name="cerobongBawah_panjang" id="cerobongBawah_panjang"
                                        style="width:100%" disabled>
                                    <input type="text" name="cerobongBawah_lebar" id="cerobongBawah_lebar"
                                        style="width:100%" disabled>
                                </div>
                                <div style="width:10%">
                                    <label for="cerobongBawah_diameter">Diameter:</label>
                                    <label for="cerobongBawah_tinggi">Tinggi:</label>
                                </div>
                                <div style="width:18%">
                                    <input type="text" name="cerobongBawah_diameter" id="cerobongBawah_diameter"
                                        style="width:100%" disabled>
                                    <input type="text" name="cerobongBawah_tinggi" id="cerobongBawah_tinggi"
                                        style="width:100%" disabled>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:4%; padding-right: 4%">
                                <label for="cerobongBawah_model">Model:</label>
                                <div style="display: flex; flex-direction: row;width:80%">
                                    <input type="text" id="id_cerobongBawah_model" name="id_cerobongBawah_model"
                                        style="width:20%" disabled>
                                    <input type="text" name="cerobongBawah_model" id="cerobongBawah_model"
                                        style="width:80%" disabled>
                                </div>
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
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_jarak">Jarak:</label>
                                    <label style="width:100%; margin-bottom: 8%"
                                        for="reinforced_warnaBelt">Warna:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_tinggiloop">Tinggi
                                        Loop:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_SF">SF:</label>
                                    <label style="width:100%; margin-bottom: 8%"
                                        for="reinforced_printing">Printing(Y/N):</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_warna">Warna:</label>
                                    <label style="width:100%; margin-bottom: 8%" for="reinforced_inner">Inner:</label>
                                </div>
                                <div style="width:30%">
                                    <input style="width:100%; margin-bottom: 1%" type="text"
                                        name="reinforced_lebar" id="reinforced_lebar" name="reinforced_lebar"
                                        placeholder="Lebar" disabled>
                                    <input style="width:100%; margin-bottom: 1%" type="text"
                                        name="reinforced_jarak" id="reinforced_jarak" placeholder="Jarak" disabled>
                                    <div style="width: 100%; display: flex; flex-direction: row; gap: 1%">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            name="reinforced_warnaBelt" id="reinforced_warnaBelt" placeholder="Warna"
                                            disabled>
                                        <input type="hidden" name="id_reinforced_warnaBelt"
                                            id="id_reinforced_warnaBelt">
                                        <button id="btn_reinforced_warnaBelt" disabled>...</button>
                                    </div>
                                    <input style="width:100%; margin-bottom: 1%" type="text"
                                        name="reinforced_tinggiloop" id="reinforced_tinggiloop"
                                        placeholder="Tinggi Loop" disabled>
                                    <div style="width: 100%; display: flex; flex-direction: row; gap: 1%">
                                        <input style="width:50%; margin-bottom: 1%" type="text"
                                            name="reinforced_SF1" id="reinforced_SF1" placeholder="S" disabled> :
                                        <input style="width:50%; margin-bottom: 1%" type="text"
                                            name="reinforced_SF2" id="reinforced_SF2" placeholder="F" disabled>
                                    </div>
                                    <input style="width:100%; margin-bottom: 1%" type="text"
                                        id="reinforced_printing" name="reinforced_printing" placeholder="(Y/N)"
                                        disabled>
                                    <div style="width: 100%; display: flex; flex-direction: row; gap: 1%">
                                        <input style="width:100%; margin-bottom: 1%" type="text"
                                            id="reinforced_warna" name="reinforced_warna" placeholder="Warna"
                                            disabled>
                                        <input type="hidden" name="id_reinforced_warna" id="id_reinforced_warna">
                                        <button id="btn_reinforced_warna" disabled>...</button>
                                    </div>
                                    <input style="width:100%; margin-bottom: 1%" type="text" id="reinforced_inner"
                                        name="reinforced_inner" placeholder="Inner" disabled>
                                </div>
                                <div style="display: flex; flex-direction: column;width:25%">
                                    <label for="reinforced_jumlah">Jumlah:</label>
                                    <label for="reinforced_beltrope">Belt /
                                        Rope:</label>
                                    <label for="reinforced_loop">Loop:</label>
                                    <label for="reinforced_SWL">SWL:</label>
                                    <label for="reinforced_stdwaktu">Std Waktu:</label>
                                    <label for="reinforced_lami">Lami:</label>
                                    <label for="reinforced_tebal">Tebal(µ):</label>
                                    <div style="align-self: center">
                                        <input type="checkbox" name="reinforced_seal" id="reinforced_seal"
                                            disabled>Seal
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; width:25%">
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        name="reinforced_jumlah" id="reinforced_jumlah" placeholder="Jumlah"
                                        disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        id="reinforced_beltrope" name="reinforced_beltrope"
                                        placeholder="[B] / [R] / [N]" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text" id="reinforced_loop"
                                        name="reinforced_loop" placeholder="Loop" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text" id="reinforced_SWL"
                                        name="reinforced_SWL" placeholder="SWL" disabled>
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        id="reinforced_stdwaktu" name="reinforced_stdwaktu" placeholder="Std Waktu"
                                        disabled>
                                    <div style="width: 100%; display: flex; flex-direction: row; gap: 1%">
                                        <input style="width:100%; margin-bottom: 2%" type="text"
                                            id="reinforced_lami" name="reinforced_lami" placeholder="Lami" disabled>
                                        <input type="hidden" name="id_reinforced_lami" id="id_reinforced_lami">
                                        <button id="btn_reinforced_lami" disabled>...</button>
                                    </div>
                                    <input style="width:100%; margin-bottom: 2%" type="text"
                                        name="reinforced_tebal" id="reinforced_tebal" placeholder="Tebal" disabled>
                                </div>
                            </div>
                            {{-- <div style="display: flex; flex-direction: row;gap:5px; width:100%">
                            </div>
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
                            </div> --}}
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
                <div style="text-align: left;">
                    <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                        <label for="kode-komponen">Kode Komponen</label>
                        <input id="kode-komponen" class="input" readonly>
                    </div>
                    <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                        <label for="nama">Nama</label>
                        <input id="nama" class="input" readonly>
                    </div>
                    <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                        <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <label for="panjang">Panjang</label>
                                <div style="width: 100%">
                                    <input id="panjang" class="input" style="width: 90%"> CM
                                </div>
                            </div>
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <label for="tebal">Tebal</label>
                                <input id="tebal" class="input" style="width: 90%"> Gram/M
                            </div>
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <label for="totalBerat">Total Berat</label>
                                <input id="totalBerat" class="input">
                            </div>
                        </div>
                        <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <label for="lebar">Lebar</label>
                                <div style="width: 100%">
                                    <input id="lebar" class="input" style="width: 90%"> CM
                                </div>
                            </div>
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <label for="quantity">Quantity</label>
                                <input id="quantity" class="input">
                            </div>
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <label for="kounter">Kounter</label>
                                <input id="kounter" class="input" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <table id="example">
                        <thead>
                            <tr>
                                <th>Seq.</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>22</td>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Ashton Cox</td>
                                <td>Junior Technical Author</td>
                                <td>San Francisco</td>
                                <td>2009/01/12</td>
                                <td>$86,000</td>
                            </tr>
                            <tr>
                                <td>41</td>
                                <td>Cedric Kelly</td>
                                <td>Senior Javascript Developer</td>
                                <td>Edinburgh</td>
                                <td>2012/03/29</td>
                                <td>$433,060</td>
                            </tr>
                            <tr>
                                <td>55</td>
                                <td>Airi Satou</td>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>2008/11/28</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>21</td>
                                <td>Brielle Williamson</td>
                                <td>Integration Specialist</td>
                                <td>New York</td>
                                <td>2012/12/02</td>
                                <td>$372,000</td>
                            </tr>
                            <tr>
                                <td>46</td>
                                <td>Herrod Chandler</td>
                                <td>Sales Assistant</td>
                                <td>San Francisco</td>
                                <td>2012/08/06</td>
                                <td>$137,500</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>Rhona Davidson</td>
                                <td>Integration Specialist</td>
                                <td>Tokyo</td>
                                <td>2010/10/14</td>
                                <td>$327,900</td>
                            </tr>
                            <tr>
                                <td>26</td>
                                <td>Colleen Hurst</td>
                                <td>Javascript Developer</td>
                                <td>San Francisco</td>
                                <td>2009/09/15</td>
                                <td>$205,500</td>
                            </tr>
                            <tr>
                                <td>18</td>
                                <td>Sonya Frost</td>
                                <td>Software Engineer</td>
                                <td>Edinburgh</td>
                                <td>2008/12/13</td>
                                <td>$103,600</td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td>Jena Gaines</td>
                                <td>Office Manager</td>
                                <td>London</td>
                                <td>2008/12/19</td>
                                <td>$90,560</td>
                            </tr>
                            <tr>
                                <td>23</td>
                                <td>Quinn Flynn</td>
                                <td>Support Lead</td>
                                <td>Edinburgh</td>
                                <td>2013/03/03</td>
                                <td>$342,000</td>
                            </tr>
                            <tr>
                                <td>14</td>
                                <td>Charde Marshall</td>
                                <td>Regional Director</td>
                                <td>San Francisco</td>
                                <td>2008/10/16</td>
                                <td>$470,600</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>Haley Kennedy</td>
                                <td>Senior Marketing Designer</td>
                                <td>London</td>
                                <td>2012/12/18</td>
                                <td>$313,500</td>
                            </tr>
                            <tr>
                                <td>54</td>
                                <td>Tatyana Fitzpatrick</td>
                                <td>Regional Director</td>
                                <td>London</td>
                                <td>2010/03/17</td>
                                <td>$385,750</td>
                            </tr>
                            <tr>
                                <td>37</td>
                                <td>Michael Silva</td>
                                <td>Marketing Designer</td>
                                <td>London</td>
                                <td>2012/11/27</td>
                                <td>$198,500</td>
                            </tr>
                            <tr>
                                <td>32</td>
                                <td>Paul Byrd</td>
                                <td>Chief Financial Officer (CFO)</td>
                                <td>New York</td>
                                <td>2010/06/09</td>
                                <td>$725,000</td>
                            </tr>
                            <tr>
                                <td>35</td>
                                <td>Gloria Little</td>
                                <td>Systems Administrator</td>
                                <td>New York</td>
                                <td>2009/04/10</td>
                                <td>$237,500</td>
                            </tr>
                            <tr>
                                <td>48</td>
                                <td>Bradley Greer</td>
                                <td>Software Engineer</td>
                                <td>London</td>
                                <td>2012/10/13</td>
                                <td>$132,000</td>
                            </tr>
                            <tr>
                                <td>45</td>
                                <td>Dai Rios</td>
                                <td>Personnel Lead</td>
                                <td>Edinburgh</td>
                                <td>2012/09/26</td>
                                <td>$217,500</td>
                            </tr>
                            <tr>
                                <td>17</td>
                                <td>Jenette Caldwell</td>
                                <td>Development Lead</td>
                                <td>New York</td>
                                <td>2011/09/03</td>
                                <td>$345,000</td>
                            </tr>
                            <tr>
                                <td>57</td>
                                <td>Yuri Berry</td>
                                <td>Chief Marketing Officer (CMO)</td>
                                <td>New York</td>
                                <td>2009/06/25</td>
                                <td>$675,000</td>
                            </tr>
                            <tr>
                                <td>29</td>
                                <td>Caesar Vance</td>
                                <td>Pre-Sales Support</td>
                                <td>New York</td>
                                <td>2011/12/12</td>
                                <td>$106,450</td>
                            </tr>
                            <tr>
                                <td>56</td>
                                <td>Doris Wilder</td>
                                <td>Sales Assistant</td>
                                <td>Sidney</td>
                                <td>2010/09/20</td>
                                <td>$85,600</td>
                            </tr>
                            <tr>
                                <td>36</td>
                                <td>Angelica Ramos</td>
                                <td>Chief Executive Officer (CEO)</td>
                                <td>London</td>
                                <td>2009/10/09</td>
                                <td>$1,200,000</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Gavin Joyce</td>
                                <td>Developer</td>
                                <td>Edinburgh</td>
                                <td>2010/12/22</td>
                                <td>$92,575</td>
                            </tr>
                            <tr>
                                <td>51</td>
                                <td>Jennifer Chang</td>
                                <td>Regional Director</td>
                                <td>Singapore</td>
                                <td>2010/11/14</td>
                                <td>$357,650</td>
                            </tr>
                            <tr>
                                <td>20</td>
                                <td>Brenden Wagner</td>
                                <td>Software Engineer</td>
                                <td>San Francisco</td>
                                <td>2011/06/07</td>
                                <td>$206,850</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Fiona Green</td>
                                <td>Chief Operating Officer (COO)</td>
                                <td>San Francisco</td>
                                <td>2010/03/11</td>
                                <td>$850,000</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Shou Itou</td>
                                <td>Regional Marketing</td>
                                <td>Tokyo</td>
                                <td>2011/08/14</td>
                                <td>$163,000</td>
                            </tr>
                            <tr>
                                <td>39</td>
                                <td>Michelle House</td>
                                <td>Integration Specialist</td>
                                <td>Sidney</td>
                                <td>2011/06/02</td>
                                <td>$95,400</td>
                            </tr>
                            <tr>
                                <td>40</td>
                                <td>Suki Burks</td>
                                <td>Developer</td>
                                <td>London</td>
                                <td>2009/10/22</td>
                                <td>$114,500</td>
                            </tr>
                            <tr>
                                <td>47</td>
                                <td>Prescott Bartlett</td>
                                <td>Technical Author</td>
                                <td>London</td>
                                <td>2011/05/07</td>
                                <td>$145,000</td>
                            </tr>
                            <tr>
                                <td>52</td>
                                <td>Gavin Cortez</td>
                                <td>Team Leader</td>
                                <td>San Francisco</td>
                                <td>2008/10/26</td>
                                <td>$235,500</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Martena Mccray</td>
                                <td>Post-Sales support</td>
                                <td>Edinburgh</td>
                                <td>2011/03/09</td>
                                <td>$324,050</td>
                            </tr>
                            <tr>
                                <td>24</td>
                                <td>Unity Butler</td>
                                <td>Marketing Designer</td>
                                <td>San Francisco</td>
                                <td>2009/12/09</td>
                                <td>$85,675</td>
                            </tr>
                            <tr>
                                <td>38</td>
                                <td>Howard Hatfield</td>
                                <td>Office Manager</td>
                                <td>San Francisco</td>
                                <td>2008/12/16</td>
                                <td>$164,500</td>
                            </tr>
                            <tr>
                                <td>53</td>
                                <td>Hope Fuentes</td>
                                <td>Secretary</td>
                                <td>San Francisco</td>
                                <td>2010/02/12</td>
                                <td>$109,850</td>
                            </tr>
                            <tr>
                                <td>30</td>
                                <td>Vivian Harrell</td>
                                <td>Financial Controller</td>
                                <td>San Francisco</td>
                                <td>2009/02/14</td>
                                <td>$452,500</td>
                            </tr>
                            <tr>
                                <td>28</td>
                                <td>Timothy Mooney</td>
                                <td>Office Manager</td>
                                <td>London</td>
                                <td>2008/12/11</td>
                                <td>$136,200</td>
                            </tr>
                            <tr>
                                <td>34</td>
                                <td>Jackson Bradshaw</td>
                                <td>Director</td>
                                <td>New York</td>
                                <td>2008/09/26</td>
                                <td>$645,750</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Olivia Liang</td>
                                <td>Support Engineer</td>
                                <td>Singapore</td>
                                <td>2011/02/03</td>
                                <td>$234,500</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Bruno Nash</td>
                                <td>Software Engineer</td>
                                <td>London</td>
                                <td>2011/05/03</td>
                                <td>$163,500</td>
                            </tr>
                            <tr>
                                <td>31</td>
                                <td>Sakura Yamamoto</td>
                                <td>Support Engineer</td>
                                <td>Tokyo</td>
                                <td>2009/08/19</td>
                                <td>$139,575</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>Thor Walton</td>
                                <td>Developer</td>
                                <td>New York</td>
                                <td>2013/08/11</td>
                                <td>$98,540</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>Finn Camacho</td>
                                <td>Support Engineer</td>
                                <td>San Francisco</td>
                                <td>2009/07/07</td>
                                <td>$87,500</td>
                            </tr>
                            <tr>
                                <td>44</td>
                                <td>Serge Baldwin</td>
                                <td>Data Coordinator</td>
                                <td>Singapore</td>
                                <td>2012/04/09</td>
                                <td>$138,575</td>
                            </tr>
                            <tr>
                                <td>42</td>
                                <td>Zenaida Frank</td>
                                <td>Software Engineer</td>
                                <td>New York</td>
                                <td>2010/01/04</td>
                                <td>$125,250</td>
                            </tr>
                            <tr>
                                <td>27</td>
                                <td>Zorita Serrano</td>
                                <td>Software Engineer</td>
                                <td>San Francisco</td>
                                <td>2012/06/01</td>
                                <td>$115,000</td>
                            </tr>
                            <tr>
                                <td>49</td>
                                <td>Jennifer Acosta</td>
                                <td>Junior Javascript Developer</td>
                                <td>Edinburgh</td>
                                <td>2013/02/01</td>
                                <td>$75,650</td>
                            </tr>
                            <tr>
                                <td>15</td>
                                <td>Cara Stevens</td>
                                <td>Sales Assistant</td>
                                <td>New York</td>
                                <td>2011/12/06</td>
                                <td>$145,600</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>Hermione Butler</td>
                                <td>Regional Director</td>
                                <td>London</td>
                                <td>2011/03/21</td>
                                <td>$356,250</td>
                            </tr>
                            <tr>
                                <td>25</td>
                                <td>Lael Greer</td>
                                <td>Systems Administrator</td>
                                <td>London</td>
                                <td>2009/02/27</td>
                                <td>$103,500</td>
                            </tr>
                            <tr>
                                <td>33</td>
                                <td>Jonas Alexander</td>
                                <td>Developer</td>
                                <td>San Francisco</td>
                                <td>2010/07/14</td>
                                <td>$86,500</td>
                            </tr>
                            <tr>
                                <td>43</td>
                                <td>Shad Decker</td>
                                <td>Regional Director</td>
                                <td>Edinburgh</td>
                                <td>2008/11/13</td>
                                <td>$183,000</td>
                            </tr>
                            <tr>
                                <td>16</td>
                                <td>Michael Bruce</td>
                                <td>Javascript Developer</td>
                                <td>Singapore</td>
                                <td>2011/06/27</td>
                                <td>$183,000</td>
                            </tr>
                            <tr>
                                <td>19</td>
                                <td>Donna Snider</td>
                                <td>Customer Support</td>
                                <td>New York</td>
                                <td>2011/01/25</td>
                                <td>$112,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/JumboBag/TabelHitungan.js') }}"></script>
@endsection
