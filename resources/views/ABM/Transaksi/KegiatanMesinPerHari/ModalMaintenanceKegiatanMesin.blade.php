<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="tanggalLogMesin">Tanggal Log</label>
                    <div class="input-group">
                        <input type="date" class="form-control" id="tanggalLogMesin" name="tanggalLogMesin">
                    </div>
                </div>
                <div class="form-group">
                    <label for="statusLog">Status Log</label>
                    <div class="input-group">
                        <select name="select_statusLog" id="select_statusLog">
                            @foreach ($listStatusLog as $list)
                                <option value="{{ $list->IdStatusLog }}">{{ $list->Status_Log }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="typeMesin">Type Mesin</label>
                            <div class="input-group">
                                <select name="typeMesin" id="typeMesin">
                                    @foreach ($listTypeMesin as $list)
                                        <option value="{{ $list->Id_Type_Mesin }}">{{ $list->Type_Mesin }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="namaMesin">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesin" id="namaMesin"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="orderAktif">Order Aktif</label>
                    <div class="input-group">
                        <div id="orderAktif" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.2">
                            <label for="shift">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shift" id="shift" class="form-control"
                                    placeholder="[P] [S] [M]">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.4">
                            <label for="kecepatan">Kecepatan</label>
                            <div class="input-group">
                                <input type="number" name="kecepatan" id="kecepatan" class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.4">
                            <label for="hasil">Hasil</label>
                            <div class="input-group">
                                <input type="number" name="hasil" id="hasil" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="jamKerjaAwal">Jam Kerja Awal</label>
                            <div class="input-group">
                                <input type="time" name="jamKerjaAwal" id="jamKerjaAwal" class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <label for="jamKerjaAkhir">Jam Kerja Akhir</label>
                            <div class="input-group">
                                <input type="time" name="jamKerjaAkhir" id="jamKerjaAkhir" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
