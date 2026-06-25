<!-- Modal untuk Tambah Data PDAM -->
<div class="modal fade" id="tambahDataPDAMModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahDataPDAMLabel">Tambah Data PDAM </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: flex;flex-direction: row;gap: 5px;">
                    <div class="form-group" style="flex: 0.4">
                        <label for="tanggalDataPDAM">Tanggal</label>
                        <div class="input-group">
                            <input type="date" class="form-control" id="tanggalDataPDAM" name="tanggalDataPDAM"
                                enterkeyhint="enter">
                        </div>
                    </div>
                    <div class="form-group" style="flex: 0.6">
                        <label for="select_sumberAir">Sumber Air</label>
                        <div class="input-group">
                            <select name="select_sumberAir" id="select_sumberAir" class="form-control">
                                <option disabled selected>-- Pilih Sumber Air --</option>
                                @foreach ($sumberModal as $s)
                                    <option value="{{ $s->IdSumberAir }}">{{ $s->Lokasi }} | {{ $s->NamaSumberAir }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;gap: 5px;">
                    <div class="form-group" style="flex: 0.35">
                        <label for="counterSaatIni">Counter Saat Ini</label>
                        <div class="input-group">
                            <input type="number" class="form-control" id="counterSaatIni" name="counterSaatIni"
                                enterkeyhint="enter">
                        </div>
                    </div>
                    <div class="form-group" style="flex: 0.35">
                        <label for="counterSebelumnya">Counter Sebelumnya</label>
                        <div class="input-group">
                            <input type="number" class="form-control" id="counterSebelumnya" name="counterSebelumnya"
                                readonly>
                        </div>
                    </div>
                    <div class="form-group" style="flex: 0.3">
                        <label for="counterPemakaian">Pemakaian</label>
                        <div class="input-group">
                            <input type="number" class="form-control" id="counterPemakaian" name="counterPemakaian"
                                readonly>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="keterangan">Keterangan</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="keterangan" name="keterangan"
                            enterkeyhint="enter">
                    </div>
                </div>
                <div class="mt-3">
                    <input type="file" id="fileFoto" class="form-control" accept="image/*">
                </div>

                <div class="mt-2">
                    <button type="button" id="btnCameraFoto" class="btn btn-success">Kamera</button>
                    <button class="btn btn-secondary" id="btn_clearPhotos">Clear Photos</button>
                </div>

                <input type="file" id="cameraInput" hidden accept="image/*" capture="environment">

                <div class="mt-3">
                    <span id="jumlahFotoDipilih">
                        0 foto dipilih
                    </span>
                </div>

                <div id="fotoPreview" class="d-flex flex-wrap gap-2 mt-3">
                </div>
                <button type="submit" class="btn btn-success mt-2" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
