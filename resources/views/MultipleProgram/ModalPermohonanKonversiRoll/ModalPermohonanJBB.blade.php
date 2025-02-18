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
                <div style="display: flex; flex-direction: row;gap:0.5%;margin: 8px;">
                    <div class="card" style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;">
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 12%">
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
                            <div class="form-group" style="width: 15%">
                                <label for="warna">Warna Dominan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_warnaDominanAsal"
                                        name="input_warnaDominanAsal" placeholder="Warna Dominan">
                                </div>
                            </div>
                            <div class="form-group" style="width: 15%">
                                <label for="barcode">Barcode Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_barcodeAsal"
                                        name="input_barcodeAsal"
                                        placeholder="000000000-000000000 (indeks)-(kode barang)">
                                </div>
                            </div>
                            <div class="form-group" style="width: 46.5%">
                                <label for="saldo_terakhirAsal">Saldo Terakhir Type Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_terakhirPrimerAsal"
                                        name="saldo_terakhirPrimerAsal" style='width:19%' placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirPrimerAsal"
                                        name="satuan_saldoTerakhirPrimerAsal" style='width:10%'
                                        placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="saldo_terakhirSekunderAsal"
                                        name="saldo_terakhirSekunderAsal" style='width:19%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirSekunderAsal"
                                        name="satuan_saldoTerakhirSekunderAsal" style='width:10%'
                                        placeholder="Satuan Sekunder">
                                    <input type="text" class="form-control" id="saldo_terakhirTritierAsal"
                                        name="saldo_terakhirTritierAsal" style='width:19%' placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTritierAsal"
                                        name="satuan_saldoTerakhirTritierAsal" style='width:10%'
                                        placeholder="Satuan Tritier">
                                </div>
                            </div>
                        </div>
                        <div class="card" id="div_tabelAsalKonversi">
                            <h3>Tabel Asal Konversi</h3>
                            <div style="overflow:auto">
                                <table id="table_daftarAsalKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Id Type Asal</th>
                                            <th>Nama Type Asal</th>
                                            <th>Pengeluaran Primer</th>
                                            <th>Pengeluaran Sekunder</th>
                                            <th>Pengeluaran Tritier</th>
                                            <th>Barcode</th>
                                            <th>IdSubKelompok</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="card" id="div_tabelTujuanKonversi">
                            <h3>Tabel Tujuan Konversi</h3>
                            <div style="overflow:auto;">
                                <table id="table_daftarTujuanKonversi">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th>Id Type Tujuan</th>
                                            <th>Nama Type Tujuan</th>
                                            <th>Hasil Konversi Primer</th>
                                            <th>Hasil Konversi Sekunder</th>
                                            <th>Hasil Konversi Tritier</th>
                                            <th>Sub Kelompok Tujuan</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 32%">
                                <label for="divisi">Divisi</label>
                                <div class="input-group">
                                    <select name="select_divisiTujuan" id="select_divisiTujuan" class="form-control">
                                        <option disabled selected>-- Pilih Divisi --</option>
                                        @foreach ($divisi as $d)
                                            <option value="{{ $d->IdDivisi }}">{{ $d->NamaDivisi }} |
                                                {{ $d->IdDivisi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="objek">Objek</label>
                                <div class="input-group">
                                    <select name="select_objekTujuan" id="select_objekTujuan" class="form-control">
                                        <option disabled selected>-- Pilih Objek --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="kelompokUtama">Kelompok Utama</label>
                                <div class="input-group">
                                    <select name="select_kelompokUtamaTujuan" id="select_kelompokUtamaTujuan"
                                        class="form-control">
                                        <option disabled selected>-- Pilih Kelompok Utama --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 32%">
                                <label for="kelompok">Kelompok</label>
                                <div class="input-group">
                                    <select name="select_kelompokTujuan" id="select_kelompokTujuan"
                                        class="form-control">
                                        <option disabled selected>-- Pilih Kelompok --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 32%">
                                <label for="subKelompok">Sub Kelompok</label>
                                <div class="input-group">
                                    <select name="select_subKelompokTujuan" id="select_subKelompokTujuan"
                                        class="form-control">
                                        <option disabled selected>-- Pilih Sub Kelompok --</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" id="div_PIBTujuan" style="visibility:hidden;width: 32%">
                                <label for="PIB_tujuan">PIB Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="PIB_tujuan" name="PIB_tujuan"
                                        placeholder="PIB">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="typeTujuan">Type Tujuan</label>
                            <div class="input-group">
                                <select name="select_typeTujuan" id="select_typeTujuan" class="form-control">
                                    <option disabled selected>-- Pilih Type --</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 39%;border:none;margin:0.5%;">
                                <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanPrimer"
                                        name="saldo_terakhirTujuanPrimer" style='width:23%;'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanPrimer"
                                        name="satuan_saldoTerakhirTujuanPrimer" style='width:10%;'
                                        placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanSekunder"
                                        name="saldo_terakhirTujuanSekunder"style='width:23%;'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirTujuanSekunder"
                                        name="satuan_saldoTerakhirTujuanSekunder" style='width:10%;'
                                        placeholder="Satuan Sekunder">
                                    <input type="text" class="form-control" id="saldo_terakhirTujuanTritier"
                                        name="saldo_terakhirTujuanTritier" style='width:23%;'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTujuanTritier"
                                        name="satuan_saldoTerakhirTujuanTritier" style='width:10%;'
                                        placeholder="Satuan Tritier">
                                </div>
                            </div>
                            <div class="form-group" style="width: 59%;border:none;margin:0.5%;">
                                <label for="hasil_konversiTujuan">Hasil Konversi</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="hasil_konversiPrimerTujuan"
                                        name="hasil_konversiPrimerTujuan" style='width:18%'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control" id="satuan_primerTujuan"
                                        name="satuan_primerTujuan" style='width:10%' placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="hasil_konversiSekunderTujuan"
                                        name="hasil_konversiSekunderTujuan" style='width: 18%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control" id="satuan_sekunderTujuan"
                                        name="satuan_sekunderTujuan" style='width:10%' placeholder="Satuan Sekunder">
                                    <input type="text" class="form-control" id="hasil_konversiTritierTujuan"
                                        name="hasil_konversiTritierTujuan" style='width:18%'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control" id="satuan_tritierTujuan"
                                        name="satuan_tritierTujuan" style='width:10%' placeholder="Satuan Tritier">
                                    <button class="btn btn-info" id="button_timbangTujuanKonversi"
                                        style='width:13%;margin:0 0 0 1%' disabled>Timbang</button>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 75%;">
                                <button class="btn btn-success" id="button_tambahTujuanKonversi">Tambah
                                    Tujuan</button>
                                <button class="btn btn-primary" id="button_updateTujuanKonversi">Update
                                    Tujuan</button>
                                <button class="btn btn-danger" id="button_hapusTujuanKonversi">Hapus
                                    Tujuan</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
