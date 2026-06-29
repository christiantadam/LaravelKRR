<!-- Modal untuk Detail Data PDAM -->
<div class="modal fade" id="detailDataPDAMModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="detailDataPDAMLabel">Detail Data PDAM </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex;flex-direction: row;gap: 5px;">
                    <div class="form-group" style="flex: 0.5">
                        <label for="tanggalDataPDAMDetail">Tanggal</label>
                        <div class="input-group">
                            <input type="date" class="form-control" id="tanggalDataPDAMDetail"
                                name="tanggalDataPDAMDetail" readonly>
                        </div>
                    </div>
                    <div class="form-group" style="flex: 0.5">
                        <label for="sumberAirDetail">Sumber Air</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="sumberAirDetail" name="sumberAirDetail"
                                readonly>
                        </div>
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;gap: 5px;">
                    <div class="form-group" style="flex:0.35">
                        <label for="counterSaatIniDetail">Counter Saat Ini</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="counterSaatIniDetail"
                                name="counterSaatIniDetail" readonly>
                        </div>
                    </div>
                    <div class="form-group" style="flex:0.35">
                        <label for="counterSebelumnyaDetail">Counter Sebelumnya</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="counterSebelumnyaDetail"
                                name="counterSebelumnyaDetail" readonly>
                        </div>
                    </div>
                    <div class="form-group" style="flex:0.3">
                        <label for="counterPemakaianDetail">Pemakaian</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="counterPemakaianDetail"
                                name="counterPemakaianDetail" readonly>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="keteranganDetail">Keterangan</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="keteranganDetail" name="keteranganDetail"
                            readonly>
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;gap: 5px;">
                    <div class="form-group" style="flex: 0.4;">
                        <label for="userInputDetail">User Input</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="userInputDetail" name="userInputDetail"
                                readonly>
                        </div>
                    </div>
                    <div class="form-group" style="flex: 0.6;">
                        <label for="timestampInput">Timestamp Input</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="timestampInput" name="timestampInput"
                                readonly>
                        </div>
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;gap: 5px;">
                    <div class="form-group" style="flex: 0.4">
                        <label for="userKoreksiDetail">User Koreksi</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="userKoreksiDetail" name="userKoreksiDetail"
                                readonly>
                        </div>
                    </div>
                    <div class="form-group" style="flex: 0.6">
                        <label for="timestampKoreksi">Timestamp Koreksi</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="timestampKoreksi" name="timestampKoreksi"
                                readonly>
                        </div>
                    </div>
                </div>
                <div id="fotoPreviewDetail" class="d-flex flex-wrap">
                </div>
            </div>
        </div>
    </div>
</div>
