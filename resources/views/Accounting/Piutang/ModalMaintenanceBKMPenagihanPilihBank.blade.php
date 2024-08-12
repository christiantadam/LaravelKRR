<!--MODAL PILIH BANK-->
<div class="modal fade" id="pilihBank" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="formPilihBank" method="POST" action="{{ url('DetailPelunasan') }}" id="modalkoreksi">
                <div class="modal-body">
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="idPelunasan" style="margin-right: 10px;">Id.
                                Pelunasan</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="idPelunasan" name="idPelunasan" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="tanggalInput" style="margin-right: 10px;">Tanggal
                                Input</label>
                        </div>
                        <div class="col-md-3">
                            <input type="date" id="tanggalInput" class="form-control" style="width: 100%">
                        </div>
                        <div class="col-md-3">
                            <label for="tanggalTagih" style="margin-right: 10px;">Tanggal
                                Tagih</label>
                        </div>
                        <div class="col-md-3">
                            <input type="date" id="tanggalTagih" name="tanggalTagih" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="jenisBayar" style="margin-right: 10px;">Jenis
                                Bayar</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="jenisBayar" class="form-control" style="width: 100%">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="bankSelect" style="margin-right: 10px;">Bank</label>
                        </div>
                        <div class="col-md-2">
                            <input type="text" id="idBank" name="idBank" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-7">
                            <select name="namaBankSelect" id="namaBankSelect" class="form-control">

                            </select>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="mataUang" style="margin-right: 10px;">Mata
                                Uang</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="mataUang" name="mataUang" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="nilaiPelunasan" style="margin-right: 10px;">Nilai
                                Pelunasan</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="nilaiPelunasan" name="nilaiPelunasan" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-3">
                            <label for="noBukti" style="margin-right: 10px;">No.
                                Bukti</label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" id="noBukti" namee="noBukti" class="form-control"
                                style="width: 100%">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <input type="submit" id="btnProses" name="btnProses" value="Proses"
                                class="btn btn-primary">
                        </div>
                        <div class="col-3">
                        </div>
                        <div class="col-4">
                            <input type="submit" id="btnTutupModal" name="btnTutupModal" value="Tutup"
                                class="btn btn-primary">
                        </div>
                    </div>
                    <input type="hidden" name="detpelunasan" id="detpelunasan" value="datpelunasan">
                </div>
            </form>
        </div>
    </div>
</div>
{{-- <div class="modal fade" id="pilihBank" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal"
    aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM</h5>
            </div>
            <div class="modal-body">
                <div class="form-container col-md-12">
                    <form id="formMaintenanceBank">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method">
                        <!-- Form fields go here -->
                        <div style="display: flex;flex-direction:row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="idBank" style="width: 51%">Id. Bank</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" style="width: 100%" id="idBank"
                                            name="idBank" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="namaBank" style="width: 51%">Nama Bank</label>
                                    <div class="input-group">
                                        <input type="text" id="isiNamaBank" name="isiNamaBank" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="idBank" style="width: 51%">Id. Bank</label>
                                    <div>
                                        <div class="col-auto">
                                            <input type="radio" name="jenisBankSelect" value="E"
                                                id="jenisBankSelect_E" checked>Eksterent
                                        </div>
                                        <div class="col-auto">
                                            <input type="radio" name="jenisBankSelect" value="I"
                                                id="jenisBankSelect_I">Interent
                                        </div>
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
                                <div class="form-group">
                                    <label for="saldoBank" style="width: 51%">Saldo Bank</label>
                                    <div class="input-group">
                                        <input type="text" name="saldoBank" id="saldoBank" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
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
                        <div class="modal-footer d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary" id="prosesButtonModal">Proses</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> --}}
