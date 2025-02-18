<!-- Modal untuk Tambah Tujuan Konversi -->
<div class="modal fade" id="tambahTujuanModalTanpaBarcode" tabindex="-1">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahTujuanModalLabelTanpaBarcode">Tambah Konversi </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalBodyTambahTujuanKonversiTanpaBarcode">
                <div style="display: flex; flex-direction: row;gap:1%;border: 1px solid rgba(0, 0, 0, 0.5);padding:0.5%;margin: 0.5%;"
                    class="card" id="div_headerFormTambahTujuanKonversiTanpaBarcode">
                    <div class="form-group" style="width: 15%">
                        <label for="tanggal">Tanggal Konversi</label>
                        <div class="input-group">
                            <input type="date" class="form-control" id="input_tanggalKonversiTanpaBarcode"
                                name="input_tanggalKonversiTanpaBarcode">
                        </div>
                    </div>
                    <div class="form-group" style="width: 10%">
                        <label for="shift">Shift</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="id_shiftTanpaBarcode"
                                name="id_shiftTanpaBarcode" placeholder="[P] [S] [M]">
                        </div>
                    </div>
                    <div class="form-group" style="width: 32%">
                        <label for="divisi">Divisi</label>
                        <div class="input-group">
                            <select name="select_divisiTanpaBarcode" id="select_divisiTanpaBarcode"
                                class="form-control">
                                <option disabled selected>Pilih Divisi</option>
                                @foreach ($divisi as $d)
                                    <option value="{{ $d->IdDivisi }}">{{ $d->NamaDivisi }} | {{ $d->IdDivisi }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;border: 1px solid rgba(0, 0, 0, 0.5);"
                    class="card" id="div_asalKonversiTanpaBarcode">
                    <h5 class="modal-title">Asal Konversi </h5>
                    <div class="card-body">
                        <div style="display: flex; flex-direction: row;">
                            <div style="width: 100%;display: flex; flex-direction: column;">
                                <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_objekAsalTanpaBarcode">Objek</label>
                                        <div class="input-group">
                                            <select name="select_objekAsalTanpaBarcode"
                                                id="select_objekAsalTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Objek Asal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_kelompokUtamaAsalTanpaBarcode">Kelompok Utama</label>
                                        <div class="input-group">
                                            <select name="select_kelompokUtamaAsalTanpaBarcode"
                                                id="select_kelompokUtamaAsalTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Kelompok Utama Asal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_kelompokAsalTanpaBarcode">Kelompok</label>
                                        <div class="input-group">
                                            <select name="select_kelompokAsalTanpaBarcode"
                                                id="select_kelompokAsalTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Kelompok Asal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_subKelompokAsalTanpaBarcode">Sub Kelompok</label>
                                        <div class="input-group">
                                            <select name="select_subKelompokAsalTanpaBarcode"
                                                id="select_subKelompokAsalTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Sub Kelompok Asal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 69%">
                                <label for="select_typeAsalTanpaBarcode">Type Asal</label>
                                <div class="input-group">
                                    <select name="select_typeAsalTanpaBarcode" id="select_typeAsalTanpaBarcode"
                                        class="form-control">
                                        <option disabled selected>Pilih Type Asal</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" id="div_PIBAsalTanpaBarcode" style="visibility:hidden;width: 29%">
                                <label for="PIB_asalTanpaBarcode">PIB Type Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="PIB_asalTanpaBarcode"
                                        name="PIB_asalTanpaBarcode" placeholder="PIB">
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 49%;border:none;">
                                <label for="saldo_terakhirAsal">Saldo Terakhir Type Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_terakhirPrimerAsalTanpaBarcode"
                                        name="saldo_terakhirPrimerAsalTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Primer" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirPrimerAsalTanpaBarcode"
                                        name="satuan_saldoTerakhirPrimerAsalTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Primer" readonly>
                                    <input type="text" class="form-control"
                                        id="saldo_terakhirSekunderAsalTanpaBarcode"
                                        name="saldo_terakhirSekunderAsalTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirSekunderAsalTanpaBarcode"
                                        name="satuan_saldoTerakhirSekunderAsalTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="saldo_terakhirTritierAsalTanpaBarcode"
                                        name="saldo_terakhirTritierAsalTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Tritier" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirTritierAsalTanpaBarcode"
                                        name="satuan_saldoTerakhirTritierAsalTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Tritier" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 49%;border:none;">
                                <label for="jumlah_pemakaian">Jumlah Pemakaian</label>
                                <div class="input-group">
                                    <input type="text" class="form-control"
                                        id="jumlah_pemakaianPrimerTanpaBarcode"
                                        name="jumlah_pemakaianPrimerTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control"
                                        id="satuan_primerJumlahPemakaianTanpaBarcode"
                                        name="satuan_primerJumlahPemakaianTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Primer" readonly>
                                    <input type="text" class="form-control"
                                        id="jumlah_pemakaianSekunderTanpaBarcode"
                                        name="jumlah_pemakaianSekunderTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control"
                                        id="satuan_sekunderJumlahPemakaianTanpaBarcode"
                                        name="satuan_sekunderJumlahPemakaianTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="jumlah_pemakaianTritierTanpaBarcode"
                                        name="jumlah_pemakaianTritierTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control"
                                        id="satuan_tritierJumlahPemakaianTanpaBarcode"
                                        name="satuan_tritierJumlahPemakaianTanpaBarcode" style='width:8%'
                                        placeholder="Satuan Tritier" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;border: 1px solid rgba(0, 0, 0, 0.5);"
                    class="card" id="div_tujuanKonversiTanpaBarcode">
                    <h5 class="modal-title">Tujuan Konversi </h5>
                    <div class="card-body">
                        <div style="display: flex; flex-direction: row;">
                            <div style="width: 100%;display: flex; flex-direction: column;">
                                <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_objekTujuanTanpaBarcode">Objek</label>
                                        <div class="input-group">
                                            <select name="select_objekTujuanTanpaBarcode"
                                                id="select_objekTujuanTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Objek Tujuan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_kelompokUtamaTujuanTanpaBarcode">Kelompok Utama</label>
                                        <div class="input-group">
                                            <select name="select_kelompokUtamaTujuanTanpaBarcode"
                                                id="select_kelompokUtamaTujuanTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Kelompok Utama Tujuan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_kelompokTujuanTanpaBarcode">Kelompok</label>
                                        <div class="input-group">
                                            <select name="select_kelompokTujuanTanpaBarcode"
                                                id="select_kelompokTujuanTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Kelompok Tujuan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 48%">
                                        <label for="select_subKelompokTujuanTanpaBarcode">Sub Kelompok</label>
                                        <div class="input-group">
                                            <select name="select_subKelompokTujuanTanpaBarcode"
                                                id="select_subKelompokTujuanTanpaBarcode" class="form-control">
                                                <option disabled selected>Pilih Sub Kelompok Tujuan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 69%">
                                <label for="select_typeTujuanTanpaBarcode">Type Tujuan</label>
                                <div class="input-group">
                                    <select name="select_typeTujuanTanpaBarcode" id="select_typeTujuanTanpaBarcode"
                                        class="form-control">
                                        <option disabled selected>Pilih Type Tujuan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" id="div_PIBTujuanTanpaBarcode"
                                style="visibility:hidden;width: 29%">
                                <label for="PIB_tujuanTanpaBarcode">PIB Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="PIB_tujuanTanpaBarcode"
                                        name="PIB_tujuanTanpaBarcode" placeholder="PIB">
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 49%;border:none;">
                                <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control"
                                        id="saldo_terakhirPrimerTujuanTanpaBarcode"
                                        name="saldo_terakhirPrimerTujuanTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Primer" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirPrimerTujuanTanpaBarcode"
                                        name="satuan_saldoTerakhirPrimerTujuanTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Primer" readonly>
                                    <input type="text" class="form-control"
                                        id="saldo_terakhirSekunderTujuanTanpaBarcode"
                                        name="saldo_terakhirSekunderTujuanTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirSekunderTujuanTanpaBarcode"
                                        name="satuan_saldoTerakhirSekunderTujuanTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="saldo_terakhirTritierTujuanTanpaBarcode"
                                        name="saldo_terakhirTritierTujuanTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Tritier" readonly>
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirTritierTujuanTanpaBarcode"
                                        name="satuan_saldoTerakhirTritierTujuanTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Tritier" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 49%;border:none;">
                                <label for="jumlah_pemasukan">Jumlah Pemasukan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control"
                                        id="jumlah_pemasukanPrimerTanpaBarcode"
                                        name="jumlah_pemasukanPrimerTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Primer">
                                    <input type="text" class="form-control"
                                        id="satuan_primerJumlahPemasukanTanpaBarcode"
                                        name="satuan_primerJumlahPemasukanTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Primer" readonly>
                                    <input type="text" class="form-control"
                                        id="jumlah_pemasukanSekunderTanpaBarcode"
                                        name="jumlah_pemasukanSekunderTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control"
                                        id="satuan_sekunderJumlahPemasukanTanpaBarcode"
                                        name="satuan_sekunderJumlahPemasukanTanpaBarcode" style='width:10%'
                                        placeholder="Satuan Sekunder" readonly>
                                    <input type="text" class="form-control"
                                        id="jumlah_pemasukanTritierTanpaBarcode"
                                        name="jumlah_pemasukanTritierTanpaBarcode" style='width:23%'
                                        placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control"
                                        id="satuan_tritierJumlahPemasukanTanpaBarcode"
                                        name="satuan_tritierJumlahPemasukanTanpaBarcode" style='width:8%'
                                        placeholder="Satuan Tritier" readonly>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:1%;">
                            <div class="form-group" style="width: 75%;">
                                <button class="btn btn-success" id="button_tambahTujuanKonversiTanpaBarcode">Tambah
                                    Tujuan</button>
                                <button class="btn btn-info" id="button_updateTujuanKonversiTanpaBarcode">Update
                                    Tujuan</button>
                                <button class="btn btn-danger" id="button_hapusTujuanKonversiTanpaBarcode">Hapus
                                    Tujuan</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin: 0.5%;" class="card" id="div_tabelTujuanKonversiTanpaBarcode">
                    <div style="margin: 0.5%;overflow:auto">
                        <table id="table_daftarTujuanKonversiTanpaBarcode">
                            <thead>
                                <tr style="white-space: nowrap">
                                    <th>Id Type Tujuan</th>
                                    <th>Nama Type Tujuan</th>
                                    <th>Jumlah Pengeluaran Primer</th>
                                    <th>Satuan Primer</th>
                                    <th>Jumlah Pengeluaran Sekunder</th>
                                    <th>Satuan Sekunder</th>
                                    <th>Jumlah Pengeluaran Tritier</th>
                                    <th>Satuan Tritier</th>
                                    <th>Id Sub Kelompok</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesTanpaBarcode">Proses</button>
            </div>
        </div>
    </div>
</div>
