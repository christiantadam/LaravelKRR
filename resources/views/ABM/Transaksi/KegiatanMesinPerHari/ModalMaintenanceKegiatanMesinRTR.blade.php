<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinRTRModal" tabindex="-1" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinRTRLabel">Tambah Kegiatan Mesin Printing</h5>
                <button type="button" class="close" id="closeTambahKegiatanMesinRTRModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLogMesinRTR">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLogMesinRTR"
                                    name="tanggalLogMesinRTR">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.3">
                            <label for="shiftRTR">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftRTR" id="shiftRTR" class="form-control"
                                    placeholder="[A] [B] [C]">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.4">
                            <label for="namaMesinRTR">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesinRTR" id="namaMesinRTR"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="orderAktifRTR">Order Aktif</label>
                    <div class="input-group">
                        <div id="orderAktifRTR" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.25">
                            <label for="hasilKgRTR">Hasil KG</label>
                            <div class="input-group">
                                <input type="number" name="hasilKgRTR" id="hasilKgRTR" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25">
                            <label for="hasilLBRRTR">Hasil LBR</label>
                            <div class="input-group">
                                <input type="number" name="hasilLBRRTR" id="hasilLBRRTR" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.35">
                            <label for="afalanSettingLembar">Afalan Setting LBR</label>
                            <div class="input-group">
                                <input type="number" name="afalanSettingLembar" id="afalanSettingLembar"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="divAlasanEditRTR">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="alasanEdit">Alasan Edit</label>
                            <div class="input-group">
                                <input type="text" name="alasanEdit" id="alasanEdit" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesRTR">Proses</button>
            </div>
        </div>
    </div>
</div>
