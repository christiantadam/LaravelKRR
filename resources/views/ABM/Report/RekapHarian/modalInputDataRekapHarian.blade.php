<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="cetakRekapHarianModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="cetakRekapHarianLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" id="closeCetakRekapHarianModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 0.34">
                            <label for="hasilJahitMulut">Hasil Jahit Mulut</label>
                            <div class="input-group">
                                <input type="number" name="hasilJahitMulut" id="hasilJahitMulut" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.33">
                            <label for="pasangInner">Pasang Inner</label>
                            <div class="input-group">
                                <input type="number" name="pasangInner" id="pasangInner" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.33">
                            <label for="barangRepair">Barang Repair</label>
                            <div class="input-group">
                                <input type="number" name="barangRepair" id="barangRepair" class="form-control"
                                    min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="hasilPressStarpakKG">Hasil Press Starpak (KG)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPressStarpakKG" id="hasilPressStarpakKG"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="hasilPressStarpakLBR">Hasil Press Starpak (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPressStarpakLBR" id="hasilPressStarpakLBR"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="hasilPressWovenKG">Hasil Press Woven (KG)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPressWovenKG" id="hasilPressWovenKG"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="hasilPressWovenLBR">Hasil Press Woven (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPressWovenLBR" id="hasilPressWovenLBR"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="hasilPressNganjukKG">Hasil Press Nganjuk (KG)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPressNganjukKG" id="hasilPressNganjukKG"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="hasilPressNganjukLBR">Hasil Press Nganjuk (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilPressNganjukLBR" id="hasilPressNganjukLBR"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_alasanEditCetakRekapHarian">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="alasanEdit">Alasan Edit</label>
                            <div class="input-group">
                                <input type="text" name="alasanEdit" id="alasanEdit" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesCetakRekapHarian">Proses</button>
            </div>
        </div>
    </div>
</div>
