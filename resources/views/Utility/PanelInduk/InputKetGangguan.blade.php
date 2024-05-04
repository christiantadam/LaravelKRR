<div class="modal fade" id="KetGangguanModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <input type="hidden" id="hiddenIdKeterangan">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah Keterangan Gangguan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row-lg-12 mb-2">
                    <div class="col-lg-12 d-flex">
                        <input type="text" class="form-control" id="keterangan_gangguan">
                        <div class="ms-2">
                            <button type="button" class="btn btn-primary" id="saveButtongangguan">Proses</button>
                        </div>
                    </div>
                </div>
                <div class="row-lg-12 mb-2">
                    <div class="table-responsive">
                        <table class="table" id="table-ketgangguan">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Aksi</th>
                                    <th scope="col">Keterangan Gangguan</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <div>
                    <button type="button" class="btn btn-primary" id="refreshButtongangguan">Refresh</button>
                    <button type="button" class="btn btn-primary" id="updateButtongangguan">Koreksi</button>
                    <button type="button" class="btn btn-primary" id="deleteButtongangguan">Hapus</button>
                </div>
                <button type="button text-end" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
