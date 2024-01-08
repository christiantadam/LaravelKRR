<div class="modal fade" id="form_rincian_konversi" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">

            <div class="modal-header">
                <h1 class="modal-title fs-5">Rincian Konversi</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <div id="asal_konv" class="card">
                    <div class="card-header">Asal Konversi</div>

                    <div class="card-body" style="background: ghostwhite">
                        <div class="row">
                            <div class="col-lg-4">
                                <label for="kelut_rk">Kelompok Utama:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_kelut_rk" class="form-control col-3" style="width: 30%"
                                        disabled>
                                    <input type="text" id="nama_kelut_rk" class="form-control col-7"
                                        style="width: 70%" disabled>
                                </div>

                                <label for="kel_rk">Kelompok:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_kel_rk" class="form-control col-3" style="width: 30%"
                                        disabled>
                                    <input type="text" id="nama_kel_rk" class="form-control col-7" style="width: 70%"
                                        disabled>
                                </div>

                                <label for="subkel_rk">Sub-kelompok:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_subkel_rk" class="form-control col-3"
                                        style="width: 30%" disabled>
                                    <input type="text" id="nama_subkel_rk" class="form-control col-7"
                                        style="width: 70%" disabled>
                                </div>

                                <label for="type_rk">Type:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_type_rk" class="form-control col-3" style="width: 30%"
                                        disabled>
                                    <input type="text" id="nama_type_rk" class="form-control col-7"
                                        style="width: 70%" disabled>
                                </div>
                            </div>

                            <div class="col-lg-8 d-flex align-items-center">
                                <div class="card">
                                    <div class="card-header">Saldo Akhir</div>

                                    <div class="card-body" style="padding: 35px var(--bs-card-spacer-x)">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_primer_asal"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_primer_asal" class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_sekunder_asal"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_sekunder_asal"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_tritier_asal"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_tritier_asal" class="input-group-text">NULL</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="primer_asal" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="sekunder_asal" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="tritier_asal" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tujuan_konv" class="card mt-3">
                    <div class="card-header">Tujuan Konversi</div>

                    <div class="card-body" style="background: ghostwhite">
                        <div class="row">
                            <div class="col-lg-4">
                                <label for="select_kelut_rk">Kelompok Utama:</label>
                                <select id="select_kelut_rk" class="form-select mb-3">
                                    <option disabled selected>-- Pilih Kelompok Utama --</option>
                                    @foreach ($formData['listKelut'] as $d)
                                        <option value="{{ $d->IdKelompokUtama }}">
                                            {{ $d->IdKelompokUtama . ' | ' . $d->NamaKelompokUtama }}</option>
                                    @endforeach
                                </select>

                                <label for="select_kel_rk">Kelompok:</label>
                                <select id="select_kel_rk" class="form-select mb-3">
                                    <option disabled selected>-- Pilih Kelompok --</option>
                                </select>

                                <label for="select_subkel_rk">Sub-kelompok:</label>
                                <select id="select_subkel_rk" class="form-select mb-3">
                                    <option disabled selected>-- Pilih Sub-kelompok --</option>
                                </select>

                                <label for="select_type_rk">Type:</label>
                                <select id="select_type_rk" class="form-select mb-3">
                                    <option disabled selected>-- Pilih Type --</option>
                                </select>
                            </div>

                            <div class="col-lg-8 d-flex align-items-center">
                                <div class="card">
                                    <div class="card-header">Saldo Akhir</div>

                                    <div class="card-body" style="padding: 35px var(--bs-card-spacer-x)">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_primer_tujuan"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_primer_tujuan"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_sekunder_tujuan"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_sekunder_tujuan"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_tritier_tujuan"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_tritier_tujuan"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="primer_tujuan" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="sekunder_tujuan"
                                                            class="form-control" placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="tritier_tujuan"
                                                            class="form-control" placeholder="0">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" id="rk_cancel" class="btn btn-secondary"
                    data-bs-dismiss="modal">CANCEL</button>
                <button type="button" id="rk_confirm" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>

        </div>
    </div>
</div>

<script src="{{ asset('js/Extruder/ExtruderNet/rincianKonversi.js') }}"></script>
