<div class="modal fade" id="tambahmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah Teknisi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row-lg-12 mb-2">
                    <div class="col-lg-12 d-flex">
                        <label for="teknisi">Teknisi</label>
                    </div>
                    <div class="col-lg-12 d-flex">
                        <select name="teknisi" id="teknisi" class="form-select">
                            <option selected disabled>Pilih Teknisi...</option>
                            @foreach ($teknisi as $data)
                                <option value="{{ $data->IDUser }}">
                                    {{ $data->NamaUser }} - ({{ $data->NomorUser }})
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="row-lg-12 mb-2">
                    <div class="col-lg-12 d-flex">
                        <label for="lokasi">Lokasi</label>
                    </div>
                    <div class="col-lg-12 d-flex">
                        <select name="lokasi" id="lokasi" class="form-select">
                            <option selected disabled>Pilih Lokasi...</option>
                            @foreach ($lokasi as $lok)
                                <option value="{{ $lok->Id_Lokasi }}">
                                    {{ $lok->Lokasi }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-end">
                <button type="button" class="btn btn-primary" id="saveButtonTeknisi">Simpan</button>
                <button type="button text-end" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
