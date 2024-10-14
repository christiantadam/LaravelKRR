<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="md_title">Modal Table</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="form_tambahLogMaintenanceMesin">
                    <div class="row">
                        <div class="col-md-6" style="padding-right: 5%">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="mesin">Mesin</label>
                                </div>

                                <div class="col-md-8">
                                    <select id="mesin" class="form-select form-select-sm">
                                        <option selected>-- Pilih Mesin --</option>
                                        @foreach ($listMesin as $d)
                                            <option value="{{ $d->Id_mesin }}"> {{ $d->Nama_mesin }} </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <label for="nama_sparepart">Nama Sparepart</label>
                                </div>

                                <div class="col-md-8">
                                    <div class="input-group input-group-sm">
                                        <select id="nama_sparepart" class="form-select form-select-sm">
                                            <option selected>-- Pilih Sparepart --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <label for="nama_barang">Nama Barang</label>
                                </div>

                                <div class="col-md-8">
                                    <input type="text" id="nama_barang" class="form-control form-control-sm"
                                        placeholder="Nama Barang">
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <label for="kode_barang">Kode Barang</label>
                                </div>

                                <div class="col-md-8">
                                    <input type="text" id="kode_barang" class="form-control form-control-sm"
                                        placeholder="Kode Barang">
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <label for="jumlah_tritier">Jumlah Pemakaian</label>
                                </div>

                                <div class="col-md-8">
                                    <input type="number" id="jumlah_tritier" class="form-control form-control-sm"
                                        placeholder="0" min="0">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6" style="padding-left: 5%">
                            <div class="row">
                                <div class="col-md-5">
                                    <label for="keterangan">Keterangan Maintenance</label>
                                </div>

                                <div class="col-md-7">
                                    <textarea name="keterangan" id="keterangan" rows="2" class="form-control"></textarea>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center mt-4">
                                <div class="form-check">
                                    <input type="checkbox" id="status_lanjut" class="form-check-input me-2"
                                        value="lanjut" checked>
                                    <label class="form-check-label" for="status_lanjut">Status, centang jika maintenance
                                        selesai</label>
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

{{-- <script src="{{ asset('js/circular/modal-table.js') }}"></script> --}}
