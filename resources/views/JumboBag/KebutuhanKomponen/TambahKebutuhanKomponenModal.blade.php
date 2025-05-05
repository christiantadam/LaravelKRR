<div class="modal fade" id="tambahKebutuhanKomponenModal" tabindex="-1">
    <div class="modal-dialog" style="max-width: 50%;">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="md_title">Tambah Kebutuhan Komponen</h1>
                <button type="button" class="close" data-bs-dismiss="modal" id="closeModalButton">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="form_tambahLogMaintenanceMesin">
                    <div class="row">
                        <div class="col-md-11" style="padding-right: 5%">
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="kodeBarangJBB">Kode Barang JBB</label>
                                </div>
                                <div class="col-md-7">
                                    <select name="kodeBarangJBB" id="kodeBarangJBB" class="form-select"
                                        style="width: 100%"></select>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <label for="jumlahKebutuhan">Jumlah Kebutuhan</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="number" id="jumlahKebutuhan" name="jumlahKebutuhan"
                                        class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <label for="tanggalKebutuhan">Tanggal Kebutuhan</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="date" id="tanggalKebutuhan" name="tanggalKebutuhan"
                                        class="form-control form-control-sm">
                                    <input type="date" id="tanggalDeadlineKebutuhan" name="tanggalDeadlineKebutuhan"
                                        class="form-control form-control-sm" style="display: none">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="modal_ok" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
