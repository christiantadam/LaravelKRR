<div class="modal fade" id="tambahTujuanModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahTujuanModalLabel">Tambah Konversi </h5>
                <button type="button" class="close" id="closeModalButton">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex; flex-direction: row;gap:0.5%;margin: 8px;">
                    <div style="display: flex; flex-direction: column;margin: 0.5%;padding:0.5%;">
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 12%">
                                <label for="tanggal">Tanggal Konversi</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="input_tanggalKonversi"
                                        name="input_tanggalKonversi">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="shift">Shift</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_shift" name="id_shift"
                                        placeholder="[P] [S] [M]">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="group">Group</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="group"
                                        name="group" placeholder="[A] [B] [C]">
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
                                    <input type="text" class="form-control" id="saldo_terakhirPrimerBarcodeAsal"
                                        name="saldo_terakhirPrimerAsal" style='width:21%' placeholder="Jumlah Primer">
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirPrimerBarcodeAsal" name="satuan_saldoTerakhirPrimerAsal"
                                        style='width:12%' placeholder="Satuan Primer">
                                    <input type="text" class="form-control" id="saldo_terakhirSekunderBarcodeAsal"
                                        name="saldo_terakhirSekunderAsal" style='width:21%'
                                        placeholder="Jumlah Sekunder">
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirSekunderBarcodeAsal"
                                        name="satuan_saldoTerakhirSekunderAsal" style='width:12%'
                                        placeholder="Satuan Sekunder">
                                    <input type="text" class="form-control" id="saldo_terakhirTritierBarcodeAsal"
                                        name="saldo_terakhirTritierAsal" style='width:21%' placeholder="Jumlah Tritier">
                                    <input type="text" class="form-control"
                                        id="satuan_saldoTerakhirTritierBarcodeAsal"
                                        name="satuan_saldoTerakhirTritierBarcodeAsal" style='width:12%'
                                        placeholder="Satuan Tritier">
                                </div>
                            </div>
                        </div>
                        <div class="card" style="margin: 0.5%;padding:0.5%;" id="div_asalKonversi">
                            <div id="div_konversiTubular" style="display: block">
                                {{-- <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 32%">
                                        <label for="divisi">Divisi</label>
                                        <div class="input-group">
                                            <select name="select_divisiAsal" id="select_divisiAsal"
                                                class="form-control">
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
                                            <select name="select_objekAsal" id="select_objekAsal"
                                                class="form-control">
                                                <option disabled selected>-- Pilih Objek --</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 32%">
                                        <label for="kelompokUtama">Kelompok Utama</label>
                                        <div class="input-group">
                                            <select name="select_kelompokUtamaAsal" id="select_kelompokUtamaAsal"
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
                                            <select name="select_kelompokAsal" id="select_kelompokAsal"
                                                class="form-control">
                                                <option disabled selected>-- Pilih Kelompok --</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 32%">
                                        <label for="subKelompok">Sub Kelompok</label>
                                        <div class="input-group">
                                            <select name="select_subKelompokAsal" id="select_subKelompokAsal"
                                                class="form-control">
                                                <option disabled selected>-- Pilih Sub Kelompok --</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" id="div_PIBAsal" style="visibility:hidden;width: 32%">
                                        <label for="PIB_asal">PIB Type Asal</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="PIB_asal"
                                                name="PIB_asal" placeholder="PIB">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="typeAsal">Type Asal</label>
                                    <div class="input-group">
                                        <select name="select_typeAsal" id="select_typeAsal" class="form-control">
                                            <option disabled selected>-- Pilih Type --</option>
                                        </select>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 44%;border:none;">
                                        <label for="saldo_terakhirAsal">Saldo Terakhir Type Asal</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="saldo_terakhirAsalPrimer"
                                                name="saldo_terakhirAsalPrimer" style='width:20%;'
                                                placeholder="Jumlah Primer">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirAsalPrimer"
                                                name="satuan_saldoTerakhirAsalPrimer" style='width:13%;'
                                                placeholder="Satuan Primer">
                                            <input type="text" class="form-control"
                                                id="saldo_terakhirAsalSekunder"
                                                name="saldo_terakhirAsalSekunder"style='width:20%;'
                                                placeholder="Jumlah Sekunder">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirAsalSekunder"
                                                name="satuan_saldoTerakhirAsalSekunder" style='width:13%;'
                                                placeholder="Satuan Sekunder">
                                            <input type="text" class="form-control" id="saldo_terakhirAsalTritier"
                                                name="saldo_terakhirAsalTritier" style='width:20%;'
                                                placeholder="Jumlah Tritier">
                                            <input type="text" class="form-control"
                                                id="satuan_saldoTerakhirAsalTritier"
                                                name="satuan_saldoTerakhirAsalTritier" style='width:13%;'
                                                placeholder="Satuan Tritier">
                                        </div>
                                    </div>
                                    <div class="form-group" style="width: 55%;border:none;">
                                        <label for="asal_konversi">Hasil Konversi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="asal_konversiPrimer"
                                                name="asal_konversiPrimer" style='width:18%'
                                                placeholder="Jumlah Primer">
                                            <input type="text" class="form-control" id="satuan_primerAsal"
                                                name="satuan_primerAsal" style='width:10%'
                                                placeholder="Satuan Primer">
                                            <input type="text" class="form-control" id="asal_konversiSekunder"
                                                name="asal_konversiSekunder" style='width: 18%'
                                                placeholder="Jumlah Sekunder">
                                            <input type="text" class="form-control" id="satuan_sekunderAsal"
                                                name="satuan_sekunderAsal" style='width:10%'
                                                placeholder="Satuan Sekunder">
                                            <input type="text" class="form-control" id="asal_konversiTritier"
                                                name="asal_konversiTritier" style='width:18%'
                                                placeholder="Jumlah Tritier">
                                            <input type="text" class="form-control" id="satuan_tritierAsal"
                                                name="satuan_tritierAsal" style='width:10%'
                                                placeholder="Satuan Tritier">
                                            <button class="btn btn-info" id="button_timbangAsalKonversi"
                                                style='width:13%;margin:0 0 0 1%' disabled>Timbang</button>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row;gap:1%;">
                                    <div class="form-group" style="width: 75%;">
                                        <button class="btn btn-success" id="button_tambahAsalKonversi">Tambah
                                            Asal</button>
                                        <button class="btn btn-primary" id="button_updateAsalKonversi">Update
                                            Asal</button>
                                        <button class="btn btn-danger" id="button_hapusAsalKonversi">Hapus
                                            Asal</button>
                                    </div>
                                </div> --}}
                            </div>
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
                        <div class="card" style="margin: 0.5%;padding:0.5%;" id="div_tujuanKonversi">
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
                            <div style="display: flex; flex-direction: row;gap:1%;">
                                <div class="form-group" style="width: 32%">
                                    <label for="divisi">Divisi</label>
                                    <div class="input-group">
                                        <select name="select_divisiTujuan" id="select_divisiTujuan"
                                            class="form-control">
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
                                        <select name="select_objekTujuan" id="select_objekTujuan"
                                            class="form-control">
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
                            <div style="display: flex; flex-direction: row;gap:1%;">
                                <div class="form-group" style="width: 44%;border:none;">
                                    <label for="saldo_terakhirTujuan">Saldo Terakhir Type Tujuan</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="saldo_terakhirTujuanPrimer"
                                            name="saldo_terakhirTujuanPrimer" style='width:20%;'
                                            placeholder="Jumlah Primer">
                                        <input type="text" class="form-control"
                                            id="satuan_saldoTerakhirTujuanPrimer"
                                            name="satuan_saldoTerakhirTujuanPrimer" style='width:13%;'
                                            placeholder="Satuan Primer">
                                        <input type="text" class="form-control" id="saldo_terakhirTujuanSekunder"
                                            name="saldo_terakhirTujuanSekunder"style='width:20%;'
                                            placeholder="Jumlah Sekunder">
                                        <input type="text" class="form-control"
                                            id="satuan_saldoTerakhirTujuanSekunder"
                                            name="satuan_saldoTerakhirTujuanSekunder" style='width:13%;'
                                            placeholder="Satuan Sekunder">
                                        <input type="text" class="form-control" id="saldo_terakhirTujuanTritier"
                                            name="saldo_terakhirTujuanTritier" style='width:20%;'
                                            placeholder="Jumlah Tritier">
                                        <input type="text" class="form-control"
                                            id="satuan_saldoTerakhirTujuanTritier"
                                            name="satuan_saldoTerakhirTujuanTritier" style='width:13%;'
                                            placeholder="Satuan Tritier">
                                    </div>
                                </div>
                                <div class="form-group" style="width: 55%;border:none;">
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
                                            name="satuan_sekunderTujuan" style='width:10%'
                                            placeholder="Satuan Sekunder">
                                        <input type="text" class="form-control" id="hasil_konversiTritierTujuan"
                                            name="hasil_konversiTritierTujuan" style='width:18%'
                                            placeholder="Jumlah Tritier">
                                        <input type="text" class="form-control" id="satuan_tritierTujuan"
                                            name="satuan_tritierTujuan" style='width:10%'
                                            placeholder="Satuan Tritier">
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
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
