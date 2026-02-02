<div class="modal fade" id="modalTTPIB" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelTTPIB">Pemberitahuan Impor Barang</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span>x</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display:flex; flex-direction: row; gap: 5px">
                    <div style="flex-direction: column; width: 70%;">
                        <div class="form-group">
                            <label for="pib_noPengajuan">No. Pengajuan</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_noPengajuan" name="pib_noPengajuan">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nilai">Nilai</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nilai" name="pib_nilai">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nomorPajak">No. Pajak</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nomorPajak" name="pib_nomorPajak">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nomorKontrak">No. Kontrak</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nomorKontrak"
                                    name="pib_nomorKontrak">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nomorInvoice">No. Invoice</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nomorInvoice"
                                    name="pib_nomorInvoice">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nomorSKBM">No. SKBM</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nomorSKBM" name="pib_nomorSKBM">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nomorSKPPH">No. SKPPH</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nomorSKPPH" name="pib_nomorSKPPH">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_nomorSPPBBC">No. SPPB BC</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_nomorSPPBBC" name="pib_nomorSPPBBC">
                            </div>
                        </div>
                    </div>
                    <div style="flex-direction: column; width: 30%;">
                        <div class="form-group">
                            <label for="pib_idDetail">Id Detail</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_idDetail" name="pib_idDetail"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_space" style="visibility: hidden">Space Kosong</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="pib_space" name="pib_space"
                                    style="visibility: hidden" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_tanggalPIB">Tgl. PIB</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="pib_tanggalPIB" name="pib_tanggalPIB">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_tanggalKontrak">Tgl. Kontrak</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="pib_tanggalKontrak"
                                    name="pib_tanggalKontrak">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_tanggalInvoice">Tgl. Invoice</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="pib_tanggalInvoice"
                                    name="pib_tanggalInvoice">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_tanggalSKBM">Tgl. SKBM</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="pib_tanggalSKBM"
                                    name="pib_tanggalSKBM">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_tanggalSKPPH">Tgl. SKPPH</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="pib_tanggalSKPPH"
                                    name="pib_tanggalSKPPH">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="pib_tanggalSPPBBC">Tgl. SPPB BC</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="pib_tanggalSPPBBC"
                                    name="pib_tanggalSPPBBC">
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;text-align: center;">
                    <button class="btn btn-success" id="pib_buttonSimpan">Simpan</button>
                </div>
            </div>
        </div>
    </div>
</div>
