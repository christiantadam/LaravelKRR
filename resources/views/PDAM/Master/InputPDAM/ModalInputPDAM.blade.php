<!-- Modal untuk Tambah Data PDAM -->
<div class="modal fade" id="tambahDataPDAMModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahDataPDAMLabel">Tambah Data PDAM </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="tanggalDataPDAM">Tanggal</label>
                    <div class="input-group">
                        <input type="datetime-local" class="form-control" id="tanggalDataPDAM" name="tanggalDataPDAM"
                            enterkeyhint="enter">
                    </div>
                </div>
                <div class="form-group">
                    <label for="select_sumberAir">Sumber Air</label>
                    <div class="input-group">
                        <select name="select_sumberAir" id="select_sumberAir" class="form-control">
                            <option disabled selected>-- Pilih Sumber Air --</option>
                            @foreach ($sumberModal as $s)
                                <option value="{{ $s->IdSumberAir }}">{{ $s->NamaSumberAir }} |
                                    {{ $s->Lokasi }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="counterSaatIni">Counter Saat Ini</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="counterSaatIni" name="counterSaatIni"
                            enterkeyhint="enter">
                    </div>
                </div>
                <div class="form-group">
                    <label for="counterSebelumnya">Counter Sebelumnya</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="counterSebelumnya" name="counterSebelumnya"
                            readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="counterPemakaian">Pemakaian</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="counterPemakaian" name="counterPemakaian"
                            readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="keterangan">Keterangan</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="keterangan" name="keterangan"
                            enterkeyhint="enter">
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
