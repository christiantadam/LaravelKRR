<div class="modal fade" id="barcodePrintingModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content" id="select2DropdownParent">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="barcodePrintingModalLabel">Tambah Barcode Printing </h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex; flex-direction: row;gap:0.5%;margin: 8px;">
                    <div class="card" style="width: 100%;margin: 0.5%;padding:0.5%;">
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 15%">
                                <label for="input_barcodeAsal">Barcode Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_barcodeAsal"
                                        name="input_barcodeAsal" placeholder="000000000-000000000">
                                </div>
                            </div>
                            <div class="form-group" style="width: 45%">
                                <label for="nama_barangAsal">Nama Barang Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="nama_barangAsal"
                                        name="nama_barangAsal" placeholder="Nama Barang">
                                </div>
                            </div>
                            <div class="form-group" style="width: 40%;border:none;">
                                <label for="saldo_typeAsal">Saldo Type Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_typePrimerAsal"
                                        name="saldo_typePrimerAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTypePrimerAsal"
                                        name="satuan_saldoTypePrimerAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="saldo_typeSekunderAsal"
                                        name="saldo_typeSekunderAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTypeSekunderAsal"
                                        name="satuan_saldoTypeSekunderAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="saldo_terakhirTritierAsal"
                                        name="saldo_terakhirTritierAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTerakhirTritierAsal"
                                        name="satuan_saldoTerakhirTritierAsal" style="width:13%" readonly>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 12%">
                                <label for="input_tanggalKonversi">Tanggal</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="input_tanggalKonversi"
                                        name="input_tanggalKonversi">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="shiftRTR">Shift</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="shiftRTR" name="shiftRTR"
                                        placeholder="[A] [B] [C]">
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%">
                                <label for="select_mesin">Mesin</label>
                                <div class="input-group">
                                    <select name="select_mesin" id="select_mesin" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%" id="div_bagianStarpak">
                                <label for="select_bagianStarpak">Bagian Starpak</label>
                                <div class="input-group">
                                    <select name="select_bagianStarpak" id="select_bagianStarpak"
                                        class="form-control">
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="nomor_ok">Order Kerja</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="nomor_ok" name="nomor_ok"
                                        readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 10%">
                                <label for="kode_barangHasil">Kode Barang Hasil</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kode_barangHasil"
                                        name="kode_barangHasil" readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 38%">
                                <label for="nama_barangHasil">Nama Barang Hasil</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="nama_barangHasil"
                                        name="nama_barangHasil" readonly>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: row;gap:0.5%;">
                            <div class="form-group" style="width: 12%">
                                <label for="select_jenisBobbin">Jenis Bobbin</label>
                                <div class="input-group">
                                    <select name="select_jenisBobbin" id="select_jenisBobbin" class="form-control">
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%">
                                <label for="tebal_rollAwal">Tebal Roll Awal</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="tebal_rollAwal"
                                        name="tebal_rollAwal">
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%">
                                <label for="tebal_rollAkhir">Tebal Roll Akhir</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="tebal_rollAkhir"
                                        name="tebal_rollAkhir">
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%">
                                <label for="hasil_lembar">Hasil Lbr</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="hasil_lembar"
                                        name="hasil_lembar">
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%">
                                <label for="hasil_kg">Hasil Kg</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="hasil_kg" name="hasil_kg"
                                        readonly>
                                </div>
                            </div>
                            <div class="form-group" style="width: 12%;align-content: end">
                                <button class="btn btn-primary" id="btn_timbang">Timbang</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
