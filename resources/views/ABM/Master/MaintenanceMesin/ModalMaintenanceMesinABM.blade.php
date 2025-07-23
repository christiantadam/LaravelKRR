<!-- Modal untuk Tambah Mesin ABM -->
<div class="modal fade" id="tambahMesinABMModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahMesinABMLabel">Tambah Mesin </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="namaMesin">Nama Mesin</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="namaMesin" name="namaMesin">
                    </div>
                </div>
                <div class="form-group">
                    <label for="speedMesin">Speed Mesin</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="speedMesin" name="speedMesin">
                    </div>
                </div>
                <div class="form-group">
                    <label for="lokasiMesin">Lokasi</label>
                    <div class="input-group">
                        <select name="select_lokasiMesin" id="select_lokasiMesin" class="form-control">
                            <option disabled selected>-- Pilih Lokasi --</option>
                            @foreach ($lokasi as $l)
                                <option value="{{ $l->IdLokasi }}">{{ $l->Lokasi }} |
                                    {{ $l->IdLokasi }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
