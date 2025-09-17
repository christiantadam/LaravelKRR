<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinRTRTanpaOKModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinRTRTanpaOKLabel">Tambah Kegiatan Mesin Printing</h5>
                <button type="button" class="close" id="closetambahKegiatanMesinRTRTanpaOKModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLogMesinRTRTanpaOK">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLogMesinRTRTanpaOK"
                                    name="tanggalLogMesinRTRTanpaOK">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.3">
                            <label for="shiftRTRTanpaOK">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftRTRTanpaOK" id="shiftRTRTanpaOK" class="form-control"
                                    placeholder="[A] [B] [C]">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.4">
                            <label for="namaMesinRTRTanpaOK">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesinRTRTanpaOK" id="namaMesinRTRTanpaOK"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 0.4">
                            <label for="kodeBarangPrintingTanpaOK">Kode Barang Printing</label>
                            <div class="input-group">
                                <input type="text" name="kodeBarangPrintingTanpaOK" id="kodeBarangPrintingTanpaOK"
                                    class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="namaBarangRTRTanpaOK">Nama Barang</label>
                    <div class="input-group">
                        <div id="namaBarangRTRTanpaOK" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.25">
                            <label for="hasilKgRTRTanpaOK">Hasil KG</label>
                            <div class="input-group">
                                <input type="number" name="hasilKgRTRTanpaOK" id="hasilKgRTRTanpaOK" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25">
                            <label for="hasilLBRRTRTanpaOK">Hasil LBR</label>
                            <div class="input-group">
                                <input type="number" name="hasilLBRRTRTanpaOK" id="hasilLBRRTRTanpaOK" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.35">
                            <label for="afalanSettingLembarTanpaOK">Afalan Setting LBR</label>
                            <div class="input-group">
                                <input type="number" name="afalanSettingLembarTanpaOK" id="afalanSettingLembarTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="keteranganKegiatanMesinTanpaOK">Keterangan</label>
                            <div class="input-group">
                                <input type="text" name="keteranganKegiatanMesinTanpaOK" id="keteranganKegiatanMesinTanpaOK"
                                    class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_alasanEditRTRTanpaOK">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="alasanEditTanpaOK">Alasan Edit</label>
                            <div class="input-group">
                                <input type="text" name="alasanEditTanpaOK" id="alasanEditTanpaOK" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesRTRTanpaOK">Proses</button>
            </div>
        </div>
    </div>
</div>
