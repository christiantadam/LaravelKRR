<!-- Modal untuk Tambah Tujuan Konversi -->
<div class="modal fade" id="tambahTujuanModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahTujuanModalLabel">Tambah Konversi </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex; flex-direction: column;gap:0.5%;margin: 8px;">
                    <div class="card"
                        style="display: flex; flex-direction: row;gap:1%;border: 1px solid rgba(0, 0, 0, 0.5);padding:0.5%;margin: 0.5%;">
                        <div class="form-group" style="width: 15%">
                            <label for="tanggal">Tanggal Konversi</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="input_tanggalKonversi"
                                    name="input_tanggalKonversi">
                            </div>
                        </div>
                        <div class="form-group" style="width: 10%">
                            <label for="shift">Shift</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="id_shift" name="id_shift"
                                    placeholder="[P] [S] [M]">
                            </div>
                        </div>
                        <div class="form-group" style="width: 17%">
                            <label for="divisi">Divisi</label>
                            <div class="input-group">
                                <select name="select_divisi" id="select_divisi" class="form-control">
                                    <option disabled selected>Pilih Divisi</option>
                                    @foreach ($divisi as $d)
                                        <option value="{{ $d->IdDivisi }}">{{ $d->NamaDivisi }} |
                                            {{ $d->IdDivisi }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="width: 22%">
                            <label for="customerSelect">Customer</label>
                            <div class="input-group">
                                <select name="customerSelect" id="customerSelect" style="width: 100%;"
                                    class="form-control">
                                    <option disabled selected>Pilih Customer</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="width: 32%">
                            <label for="kodeBarangSelect">Kode Barang Tabel Hit.</label>
                            <div class="input-group">
                                <select name="kodeBarangSelect" id="kodeBarangSelect" style="width: 100%;"
                                    class="form-control">
                                    <option disabled selected>Pilih Kode Barang</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="card"
                        style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;border: 1px solid rgba(0, 0, 0, 0.5);">
                        <h3>Tujuan Konversi</h3>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 24%">
                                <label for="select_objekTujuan">Objek</label>
                                <div class="input-group">
                                    <select name="select_objekTujuan" id="select_objekTujuan" class="form-control">
                                        <option disabled selected>Pilih Objek Tujuan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 24%">
                                <label for="select_kelompokUtamaTujuan">Kelompok Utama</label>
                                <div class="input-group">
                                    <select name="select_kelompokUtamaTujuan" id="select_kelompokUtamaTujuan"
                                        class="form-control">
                                        <option disabled selected>Pilih Kelompok Utama Tujuan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 24%">
                                <label for="select_kelompokTujuan">Kelompok</label>
                                <div class="input-group">
                                    <select name="select_kelompokTujuan" id="select_kelompokTujuan"
                                        class="form-control">
                                        <option disabled selected>Pilih Kelompok Tujuan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 24%">
                                <label for="select_subKelompokTujuan">Sub Kelompok</label>
                                <div class="input-group">
                                    <select name="select_subKelompokTujuan" id="select_subKelompokTujuan"
                                        class="form-control">
                                        <option disabled selected>Pilih Sub Kelompok Tujuan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 69%">
                                <label for="type">Type Tujuan</label>
                                <div class="input-group">
                                    <select name="select_typeTujuan" id="select_typeTujuan" class="form-control">
                                        <option disabled selected>Pilih Type Tujuan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" id="div_PIBTujuan" style="visibility:hidden;width: 29%">
                                <label for="PIB_tujuan">PIB Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="PIB_tujuan" name="PIB_tujuan"
                                        placeholder="PIB">
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 49%;">
                                <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanPrimer"
                                        name="saldo_terakhirTujuanPrimer" style='width:23%;'
                                        placeholder="Jumlah Primer" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanPrimer"
                                        name="satuan_saldoTerakhirTujuanPrimer" style='width:10%;'
                                        placeholder="Satuan Primer" readonly>
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanSekunder"
                                        name="saldo_terakhirTujuanSekunder"style='width:23%;'
                                        placeholder="Jumlah Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirTujuanSekunder"
                                        name="satuan_saldoTerakhirTujuanSekunder" style='width:10%;'
                                        placeholder="Satuan Sekunder" readonly>
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanTritier"
                                        name="saldo_terakhirTujuanTritier" style='width:23%;'
                                        placeholder="Jumlah Tritier" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanTritier"
                                        name="satuan_saldoTerakhirTujuanTritier" style='width:10%;'
                                        placeholder="Satuan Tritier" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 49%;">
                                <label for="jumlah_pemasukan">Jumlah Pemasukan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="jumlah_pemasukanPrimer"
                                        name="jumlah_pemasukanPrimer" style='width:23%' placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_primerJumlahPemasukan"
                                        name="satuan_primerJumlahPemasukan" style='width:10%'
                                        placeholder="Satuan Primer" readonly>
                                    <input type="text" class="form-control" id="jumlah_pemasukanSekunder"
                                        name="jumlah_pemasukanSekunder" style='width:23%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control" id="satuan_sekunderJumlahPemasukan"
                                        name="satuan_sekunderJumlahPemasukan" style='width:10%'
                                        placeholder="Satuan Sekunder" readonly>
                                    <input type="text" class="form-control" id="jumlah_pemasukanTritier"
                                        name="jumlah_pemasukanTritier" style='width:23%'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control" id="satuan_tritierJumlahPemasukan"
                                        name="satuan_tritierJumlahPemasukan" style='width:8%'
                                        placeholder="Satuan Tritier" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card"
                        style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;border: 1px solid rgba(0, 0, 0, 0.5);">
                        <div id="div_tabelAsalKonversi">
                            <h3>Asal Konversi</h3>
                            <div style="overflow:auto">
                                <table id="table_daftarAsalKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Kode Komponen</th>
                                            <th>Nama Komponen</th>
                                            <th>Panjang x Lebar</th>
                                            <th>Quantity</th>
                                            <th>Nama Type Inventory</th>
                                            <th>Id Type Inventory</th>
                                            <th>Pengeluaran Primer</th>
                                            <th>Satuan Primer</th>
                                            <th>Pengeluaran Sekunder</th>
                                            <th>Satuan Sekunder</th>
                                            <th>Pengeluaran Tritier</th>
                                            <th>Satuan Tritier</th>
                                            <th>Sub Kelompok</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="card" style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;">
                            <div style="display: flex; flex-direction: row;margin: 0.5%;padding:0.5%;">
                                <div
                                    style="width: 90%;display: flex; flex-direction: column;margin-right: 0.5%;border-right: #cbcbcb solid 1px;">
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group" style="width: 48%">
                                            <label for="select_objekAsal">Objek</label>
                                            <div class="input-group">
                                                <select name="select_objekAsal" id="select_objekAsal"
                                                    class="form-control">
                                                    <option disabled selected>Pilih Objek Asal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group" style="width: 48%">
                                            <label for="select_kelompokUtamaAsal">Kelompok Utama</label>
                                            <div class="input-group">
                                                <select name="select_kelompokUtamaAsal" id="select_kelompokUtamaAsal"
                                                    class="form-control">
                                                    <option disabled selected>Pilih Kelompok Utama Asal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display: flex; flex-direction: row;gap:1%;">
                                        <div class="form-group" style="width: 48%">
                                            <label for="select_kelompokAsal">Kelompok</label>
                                            <div class="input-group">
                                                <select name="select_kelompokAsal" id="select_kelompokAsal"
                                                    class="form-control">
                                                    <option disabled selected>Pilih Kelompok Asal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group" style="width: 48%">
                                            <label for="select_subKelompokAsal">Sub Kelompok</label>
                                            <div class="input-group">
                                                <select name="select_subKelompokAsal" id="select_subKelompokAsal"
                                                    class="form-control">
                                                    <option disabled selected>Pilih Sub Kelompok Asal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style="width: 10%;display: flex; flex-direction: column;gap:1%;align-self: center; text-align: center;">
                                    <div class="form-group">
                                        <button class="btn btn-success" id="button_tambahAsalKonversi">Tambah
                                            Asal</button>
                                        <button class="btn btn-info" id="button_updateAsalKonversi">Update
                                            Asal</button>
                                        <button class="btn btn-danger" id="button_hapusAsalKonversi">Hapus
                                            Asal</button>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;gap:1%;">
                                <div class="form-group" style="width: 69%">
                                    <label for="select_typeAsal">Type Asal</label>
                                    <div class="input-group">
                                        <select name="select_typeAsal" id="select_typeAsal" class="form-control">
                                            <option disabled selected>Pilih Type Asal</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" id="div_PIBAsal" style="visibility:hidden;width: 29%">
                                    <label for="PIB_asal">PIB Type Asal</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="PIB_asal" name="PIB_asal"
                                            placeholder="PIB">
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: row;gap:0.5%;">
                                <div class="form-group" style="width: 49%;border:none;margin:0.5%;">
                                    <label for="saldo_terakhirAsal">Saldo Terakhir Type Asal</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="saldo_terakhirPrimerAsal"
                                            name="saldo_terakhirPrimerAsal" style='width:23%'
                                            placeholder="Jumlah Primer" readonly>
                                        <input type="text" class="form-control"
                                            id="satuan_saldoTerakhirPrimerAsal" name="satuan_saldoTerakhirPrimerAsal"
                                            style='width:10%' placeholder="Satuan Primer" readonly>
                                        <input type="text" class="form-control" id="saldo_terakhirSekunderAsal"
                                            name="saldo_terakhirSekunderAsal" style='width:23%'
                                            placeholder="Jumlah Sekunder" readonly>
                                        <input type="text" class="form-control"
                                            id="satuan_saldoTerakhirSekunderAsal"
                                            name="satuan_saldoTerakhirSekunderAsal" style='width:10%'
                                            placeholder="Satuan Sekunder" readonly>
                                        <input type="text" class="form-control" id="saldo_terakhirTritierAsal"
                                            name="saldo_terakhirTritierAsal" style='width:23%'
                                            placeholder="Jumlah Tritier" readonly>
                                        <input type="text" class="form-control"
                                            id="satuan_saldoTerakhirTritierAsal"
                                            name="satuan_saldoTerakhirTritierAsal" style='width:10%'
                                            placeholder="Satuan Tritier" readonly>
                                    </div>
                                </div>
                                <div class="form-group" style="width: 49%;border:none;margin:0.5%;">
                                    <label for="jumlah_pemakaian">Jumlah Pemakaian</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="jumlah_pemakaianPrimer"
                                            name="jumlah_pemakaianPrimer" style='width:23%'
                                            placeholder="Jumlah Primer">
                                        <input type="text" class="form-control" id="satuan_primerJumlahPemakaian"
                                            name="satuan_primerJumlahPemakaian" style='width:10%'
                                            placeholder="Satuan Primer" readonly>
                                        <input type="text" class="form-control" id="jumlah_pemakaianSekunder"
                                            name="jumlah_pemakaianSekunder" style='width:23%'
                                            placeholder="Jumlah Sekunder">
                                        <input type="text" class="form-control"
                                            id="satuan_sekunderJumlahPemakaian" name="satuan_sekunderJumlahPemakaian"
                                            style='width:10%' placeholder="Satuan Sekunder" readonly>
                                        <input type="text" class="form-control" id="jumlah_pemakaianTritier"
                                            name="jumlah_pemakaianTritier" style='width:23%'
                                            placeholder="Jumlah Tritier">
                                        <input type="text" class="form-control" id="satuan_tritierJumlahPemakaian"
                                            name="satuan_tritierJumlahPemakaian" style='width:8%'
                                            placeholder="Satuan Tritier" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
