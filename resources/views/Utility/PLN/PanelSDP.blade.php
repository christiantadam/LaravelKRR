<div class="modal fade" id="modalPanel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" style="width: 80%; max-width: 100%; margin: 20px auto 0;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">PANEL SDP</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row-12 d-flex flex-wrap">
                    <div class="col-lg-5 p-4">
                        <input type="hidden" id="hiddenNomorSDP">
                        <div class="acs-div-filter">
                            <label for="ket_gangguan">Produksi</label>
                            <select class="form-select" aria-label="Default select example" id="produksi-sdp">
                                <option selected disabled>Pilih...</option>
                                @foreach ($sdp as $data)
                                    <option value="{{ $data->NoProduksi }}">
                                        {{ $data->Produksi }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="tanggal-sdp">Tanggal</label>
                            <input type="date" class="form-control" id="tanggal-sdp">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="jam-sdp">Jam</label>
                            <input type="time" class="form-control" id="jam-sdp" name="jam-sdp">
                        </div>
                    </div>
                    <div class="col-lg-5 p-4">
                        <div class="acs-div-filter">
                            <label for="kwh">KWH</label>
                            <input type="number" class="form-control" id="kwh-sdp" name="kwh">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="ket_gangguan">Teknisi</label>
                            <select class="form-select" aria-label="Default select example" id="teknisi-sdp">
                                <option selected disabled>Pilih...</option>
                                @foreach ($teknisi as $data)
                                    <option value="{{ $data->NamaUser }}">
                                        {{ $data->NamaUser }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="ct_faktor">CT Faktor</label>
                            <input type="number" class="form-control" id="ct_faktor-sdp" name="ct_faktor">
                        </div>
                    </div>
                    <div class="col-lg-2 p-4">
                        <div class="d-flex gap-2 pt-4 justify-content-end flex-wrap">
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="inputButton-sdp">Input</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="updateButton-sdp">Koreksi</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="deleteButton-sdp">Hapus</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="saveButton-sdp">Proses</button>
                            <button class="btn btn-primary w-100 mb-2" type="button"
                                id="cancelButton-sdp">Batal</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 p-4">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="d-flex gap-2 mb-2">
                                <label for="tanggal">Filter</label>
                            </div>
                            <div class="d-flex gap-2">
                                <h6 class="mt-2">Bulan</h6>
                                <input type="number" class="form-control" id="bulan-sdp" name="bulan-sdp">
                                <h6 class="mt-2">Tahun</h6>
                                <input type="number" class="form-control" id="tahun-sdp" name="tahun-sdp">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex gap-2 mb-2">
                                <label for="tanggal">Produksi</label>
                            </div>
                            <div class="d-flex gap-2">
                                <select class="form-select" aria-label="Default select example" id="produksiSearch-sdp">
                                    <option selected value="0">Pilih Semua...</option>
                                    @foreach ($sdp as $data)
                                        <option value="{{ $data->NoProduksi }}">
                                            {{ $data->Produksi }}</option>
                                    @endforeach
                                </select>
                                <button type="submit" id="refreshButton-sdp" class="btn btn-primary">Refresh</button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table mt-2" id="table-panelsdp" style="width: 100% !important">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Aksi</th>
                                    <th scope="col">Produksi</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Jam</th>
                                    <th scope="col">KWH</th>
                                    <th scope="col">Teknisi</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="exitButton-sdp"
                    data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
