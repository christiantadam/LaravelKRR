<div class="modal fade" id="modalExpeditor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelExpeditor">Tambah Expeditor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">x</button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div style="gap: 0.5%;width: 50%;border-right: 1px solid lightgray;padding-right: 5px;">
                            <div class="d-flex" style="gap: 0.5%;width: 100%">
                                <div class="form-group" style="flex: 0.65">
                                    <label for="exp_namaExpeditor">Nama Expeditor</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_namaExpeditor"
                                            name="exp_namaExpeditor">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.35">
                                    <label for="exp_contactPerson">Contact Person</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_contactPerson"
                                            name="exp_contactPerson">
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex" style="gap: 0.5%;width: 100%">
                                <div class="form-group" style="flex: 0.8">
                                    <label for="exp_alamatKantor">Alamat Kantor</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_alamatKantor"
                                            name="exp_alamatKantor">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.2">
                                    <label for="exp_kodePos">Kode Pos</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_kodePos" name="exp_kodePos">
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex" style="gap: 0.5%;width: 100%">
                                <div class="form-group" style="flex: 0.325">
                                    <label for="exp_kotaExpeditor">Kota</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_kotaExpeditor"
                                            name="exp_kotaExpeditor">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.35">
                                    <label for="exp_provinsiExpeditor">Provinsi</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_provinsiExpeditor"
                                            name="exp_provinsiExpeditor">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.325">
                                    <label for="exp_negaraExpeditor">Negara</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_negaraExpeditor"
                                            name="exp_negaraExpeditor">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="gap: 0.5%;width: 50%;">
                            <div class="d-flex" style="gap: 0.5%;width: 100%">
                                <div class="form-group" style="flex: 0.25">
                                    <label for="exp_nomorTelepon1">Nomor Telepon 1</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorTelepon1"
                                            name="exp_nomorTelepon1">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.25">
                                    <label for="exp_nomorTelepon2">Nomor Telepon 2</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorTelepon2"
                                            name="exp_nomorTelepon2">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.25">
                                    <label for="exp_nomorHP1">Nomor HP 1</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorHP1"
                                            name="exp_nomorHP1">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.25">
                                    <label for="exp_nomorHP2">Nomor HP 2</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorHP2"
                                            name="exp_nomorHP2">
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex" style="gap: 0.5%;width: 100%">
                                <div class="form-group" style="flex: 0.225">
                                    <label for="exp_nomorTelex">Nomor Telex</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorTelex"
                                            name="exp_nomorTelex">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.225">
                                    <label for="exp_nomorFax1">Nomor Fax1</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorFax1"
                                            name="exp_nomorFax1">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.225">
                                    <label for="exp_nomorFax2">Nomor Fax 2</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_nomorFax2"
                                            name="exp_nomorFax2">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.325">
                                    <label for="exp_emailExpeditor">Email</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="exp_emailExpeditor"
                                            name="exp_emailExpeditor">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success mt-2" id="exp_buttonProses">Proses</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/Expeditor.js') }}"></script>
</script>
