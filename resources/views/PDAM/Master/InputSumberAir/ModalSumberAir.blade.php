<!-- Modal untuk Tambah Sumber Air -->
<div class="modal fade" id="tambahSumberAirModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahSumberAirLabel">Tambah Sumber Air</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="namaSumberAir">Nama Sumber Air</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="namaSumberAir" name="namaSumberAir"
                            enterkeyhint="enter">
                    </div>
                </div>
                <div class="form-group">
                    <label for="select_lokasiSumberAir">Lokasi</label>
                    <div class="input-group">
                        <select name="select_lokasiSumberAir" id="select_lokasiSumberAir" class="form-control">
                            <option disabled selected>-- Pilih Lokasi --</option>
                            @foreach ($lokasi as $l)
                                <option value="{{ $l->Id_Lokasi }}">{{ $l->Lokasi }} |
                                    {{ $l->Id_Lokasi }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
