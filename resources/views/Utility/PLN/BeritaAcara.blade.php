<div class="modal fade" id="modalBerita" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Berita Acara Pembacaan Meter</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row-12 d-flex flex-wrap">
                    <div class="col-lg-5 p-4">
                        <input type="hidden" id="hiddenNomorBA">
                        <div class="acs-div-filter">
                            <label for="nomor-ba">Nomor</label>
                            <input type="number" class="form-control" id="nomor-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="tanggal-ba">Tanggal</label>
                            <input type="date" class="form-control" id="tanggal-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="lwbp-ba">LWBP</label>
                            <input type="number" class="form-control" id="lwbp-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="wbp-ba">WBP</label>
                            <input type="number" class="form-control" id="wbp-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="kvarh-ba">KVARH</label>
                            <input type="number" class="form-control" id="kvarh-ba">
                        </div>

                    </div>
                    <div class="col-lg-5 p-4">
                        <div class="acs-div-filter">
                            <label for="kva-ba">KVA Maks.</label>
                            <input type="number" class="form-control" id="kva-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="jam-ba">Posisi Jam</label>
                            <input type="time" class="form-control" id="posisijam-ba" name="posisijam-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="switch-ba">Time Switch</label>
                            <input type="time" class="form-control" id="timeswitch-ba" name="timeswitch-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="pelanggan-ba">Pelanggan</label>
                            <input type="text" class="form-control" id="pelanggan-ba" name="pelanggan-ba">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="pembaca-ba">Pembaca Meter</label>
                            <input type="text" class="form-control" id="pembaca-ba" name="pembaca-ba">
                        </div>
                    </div>
                    <div class="col-lg-2 p-4">
                        <div class="d-flex gap-2 pt-4 justify-content-end flex-wrap">
                            <button class="btn btn-primary w-100 mb-2" type="button" id="inputButton-ba">Input</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="updateButton-ba">Koreksi</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="deleteButton-ba">Hapus</button>
                            <button class="btn btn-primary w-100 mb-2" type="button" id="saveButton-ba">Proses</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="cancelButton-ba">Batal</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 p-4">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="d-flex gap-2 mb-2">
                                <label for="tanggal">Filter</label>
                            </div>
                            <div class="d-flex gap-2">
                                <h6 class="mt-2">Tahun</h6>
                                <input type="number" class="form-control" id="tahun-ba" name="tahun-ba">
                                <div class="d-flex gap-2">
                                    <button type="submit" id="refreshButton-ba"
                                        class="btn btn-primary">Refresh</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table mt-2" id="table-berita">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Aksi</th>
                                    <th scope="col">Nomor</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">LWBP</th>
                                    <th scope="col">WBP</th>
                                    <th scope="col">KVARH</th>
                                    <th scope="col">KVA Maks.</th>
                                    <th scope="col">Posisi Jam</th>
                                    <th scope="col">Time Switch</th>
                                    <th scope="col">Pelanggan</th>
                                    <th scope="col">Pembaca Meter</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="exitButton-ba"
                    data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
