<div class="modal fade" id="barcodePrintingModal" tabindex="-1" data-bs-backdrop="static">
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
                                <label for="saldo_typeAsal">Saldo Barang dari Barcode Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="saldo_typePrimerAsal"
                                        name="saldo_typePrimerAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTypePrimerAsal"
                                        name="satuan_saldoTypePrimerAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="saldo_typeSekunderAsal"
                                        name="saldo_typeSekunderAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTypeSekunderAsal"
                                        name="satuan_saldoTypeSekunderAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="saldo_typeTritierAsal"
                                        name="saldo_typeTritierAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_saldoTypetritierAsal"
                                        name="satuan_saldoTypetritierAsal" style="width:13%" readonly>
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
                            <input type="hidden" name="idOrderKerja" id="idOrderKerja">
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
                            {{-- <div class="form-group" style="width: 10%">
                                <label for="select_jenisBobbin">Jenis Bobbin</label>
                                <div class="input-group">
                                    <select name="select_jenisBobbin" id="select_jenisBobbin" class="form-control">
                                        <option value="22">8' Paralon</option>
                                        <option value="10">4' Karton</option>
                                        <option value="11">4' PVC</option>
                                        <option value="9">3' Karton</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="width: 10%">
                                <label for="tebal_rollAwal">Tebal Roll Awal</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="tebal_rollAwal"
                                        name="tebal_rollAwal" min="0">
                                </div>
                            </div>
                            <div class="form-group" style="width: 10%">
                                <label for="tebal_rollAkhir">Tebal Roll Akhir</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="tebal_rollAkhir"
                                        name="tebal_rollAkhir" min="0">
                                </div>
                            </div> --}}
                            <div class="form-group" style="width: 8%">
                                <label for="hasil_pcs">Hasil Pcs</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="hasil_pcs" name="hasil_pcs"
                                        min="0">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%">
                                <label for="hasil_kg">Hasil Kg</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="hasil_kg" name="hasil_kg"
                                        min="0">
                                </div>
                            </div>
                            <div class="form-group" style="width: 8%;align-content: end">
                                <button class="btn btn-primary w-100" id="btn_timbang">Timbang</button>
                            </div>
                            <div class="form-group" style="width: 40%;border:none;">
                                <label for="pemakaian_typeAsal">Pemakaian Barang dari Barcode Asal</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="pemakaian_typePrimerAsal"
                                        name="pemakaian_typePrimerAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_pemakaianTypePrimerAsal"
                                        name="satuan_pemakaianTypePrimerAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="pemakaian_typeSekunderAsal"
                                        name="pemakaian_typeSekunderAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_pemakaianTypeSekunderAsal"
                                        name="satuan_pemakaianTypeSekunderAsal" style="width:13%" readonly>
                                    <input type="text" class="form-control" id="pemakaian_TritierAsal"
                                        name="pemakaian_TritierAsal" style="width:20%" readonly>
                                    <input type="text" class="form-control" id="satuan_pemakaianTritierAsal"
                                        name="satuan_pemakaianTritierAsal" style="width:13%" readonly>
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
