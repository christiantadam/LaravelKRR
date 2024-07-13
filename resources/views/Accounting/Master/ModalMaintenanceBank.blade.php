<div class="modal fade" id="modalBank" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelBank">Tambah Bank</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-container col-md-12">
                    {{-- <form method="POST" action="{{ url('MaintenanceBank') }}" id="formkoreksi">
                        {{ csrf_field() }} --}}
                    <input type="hidden" name="_method" id="methodkoreksi">
                    <!-- Form fields go here -->
                    <div style="display: flex;flex-direction:row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="idBank" style="width: 51%">Id. Bank</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" style="width: 100%" id="idBank"
                                        name="idBank">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="namaBank" style="width: 51%">Nama Bank</label>
                                <div class="input-group">
                                    <select id="namaBankselect" name="namaBankselect" class="form-control"
                                        style="width: 400px;">
                                        <option disabled selected>-- Pilih Bank --</option>
                                        @foreach ($maintenanceBank as $mb)
                                            <option value="{{ $mb->Id_Bank }}">{{ $mb->Nama_Bank }}</option>
                                        @endforeach
                                    </select>
                                    <input type="text" id="isiNamaBank" name="isiNamaBank" style="display: none;"
                                        class="form-control" id="isiNamaBank">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="idBank" style="width: 51%">Id. Bank</label>
                                <div>
                                    <div class="col-auto">
                                        <input type="radio" name="jenisBankSelect" value="E"
                                            id="jenisBankSelect" checked>Eksterent
                                    </div>
                                    <div class="col-auto">
                                        <input type="radio" name="jenisBankSelect" value="I"
                                            id="jenisBankSelect">Interent
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="statusAktif" style="width: 51%">Status Aktif</label>
                                <div class="input-group">
                                    <input type="checkbox" name="statusAktif" id="statusAktif" checked>Aktif
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodePerkiraanSelect" style="width: 100%;">Kode Perkiraan</label>
                                <div class="input-group" style="display: flex; align-items: center;">
                                    <input type="hidden" id="ketKodePerkiraan" name="ketKodePerkiraan"
                                        class="form-control">
                                    <select name="kodePerkiraanSelect" id="kodePerkiraanSelect" class="form-control"
                                        style="width: auto">
                                        <option disabled selected>-- Pilih Kode Perkiraan --</option>
                                        @foreach ($kodePerkiraan as $kp)
                                            <option value="{{ $kp->NoKodePerkiraan }}">{{ $kp->NoKodePerkiraan }} |
                                                {{ $kp->Keterangan }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="noRekening" style="width: 51%">No. Rekening</label>
                                <div class="input-group">
                                    <input type="text" name="noRekening" id="noRekening" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="saldoBank" style="width: 51%">Saldo Bank</label>
                                <div class="input-group">
                                    <input type="text" name="saldoBank" id="saldoBank" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="alamat" style="width: 51%">Alamat</label>
                                <div class="input-group">
                                    <input type="text" name="alamat" id="alamat" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kota" style="width: 51%">Kota</label>
                                <div class="input-group">
                                    <input type="text" name="kota" id="kota" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="telp" style="width: 51%">Telp</label>
                                <div class="input-group">
                                    <input type="text" name="telp" id="telp" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="person" style="width: 51%">Person</label>
                                <div class="input-group">
                                    <input type="text" name="person" id="person" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="hp" style="width: 51%">HP</label>
                                <div class="input-group">
                                    <input type="text" name="hp" id="hp" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- <div class="d-flex">
                        <input type="submit" name="isi" id="btnIsi" value="Isi" class="btn btn-primary">
                        <input type="submit" name="koreksi" id="btnKoreksi" value="Koreksi"
                            class="btn btn-warning">
                        <input type="submit" name="hapus" id="btnHapus" value="Hapus" class="btn btn-danger">
                        <input type="submit" name="proses" id="btnProses" value="Proses" class="btn btn-success"
                            disabled>
                        <input type="submit" name="batal" id="btnBatal" value="Batal" class="btn btn-danger"
                            style="display: none">
                    </div> --}}
                    {{-- </form> --}}
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-end">
                <button type="button" class="btn btn-primary" id="saveButtonTeknisi">Simpan</button>
                <button type="button text-end" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
