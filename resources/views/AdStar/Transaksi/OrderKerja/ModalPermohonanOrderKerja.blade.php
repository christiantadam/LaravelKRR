<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahPermohonanOrderKerjaModal" tabindex="-1" data-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahPermohonanOrderKerjaLabel">Tambah Order Kerja </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div id="div_select_orderKerjaPrinting" class="form-group" style="flex: 0.44">
                            <label for="select_orderKerjaPrinting">Order Kerja Printing</label>
                            <div class="input-group">
                                <select name="select_orderKerjaPrinting" id="select_orderKerjaPrinting"
                                    class="form-control">
                                    <option disabled selected>-- Pilih Order Kerja Printing --</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 0.12">
                            <label for="NomorOrderKerja">Nomor Order Kerja</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="NomorOrderKerja" name="NomorOrderKerja">
                            </div>
                            <span id="cekNomorOrderKerja"></span>
                        </div>
                        <div id="div_select_suratPesananTujuan" class="form-group"style="flex: 0.44">
                            <label for="suratPesanan">Surat Pesanan</label>
                            <div class="input-group">
                                <select name="select_suratPesananTujuan" id="select_suratPesananTujuan"
                                    class="form-control">
                                    <option disabled selected>-- Pilih Surat Pesanan --</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.3">
                            <label for="customer">Customer</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="customerSuratPesanan"
                                    name="customerSuratPesanan" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="jumlahPesanan">Jumlah</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="jumlahPesanan" name="jumlahPesanan" min=0
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="kodeBarang">Kode Barang</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="kodeBarangJadi" name="kodeBarangJadi"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="sisaSaldo">Sisa Saldo</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="sisaSaldo" name="sisaSaldo">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.35">
                            <label for="packingSuratPesanan">Packing</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="packingSuratPesanan"
                                    name="packingSuratPesanan">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="namaBarang">Nama Barang</label>
                    <div class="input-group">
                        <div id="namaBarang" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <label id="label_kodeBarang">Kode Barang</label>
                <div class="pb-2">
                    <div class="mb-2 align-content-center"style="flex: 0.05">
                        <div class="input-group">
                            <input type="checkbox" class="from-control form-check-input ml-0" id="checkbox_patchIsEqual"
                                name="checkbox_patchIsEqual" value=1>
                            <label for="checkbox_patchIsEqual" class="from-control form-check-label ml-3">Patch Atas
                                dan Patch Bawah Sama</label>
                        </div>
                    </div>
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="mb-2"style="flex: 0.1">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangBody" id="kodeBarangBody"
                                    placeholder="KB Body ">
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangValve"
                                    id="kodeBarangValve" placeholder="KB Valve ">
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.4">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangBody" id="namaBarangBody"
                                    placeholder="Nama Barang Body" readonly>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangValve"
                                    id="namaBarangValve" placeholder="Nama Barang Valve" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.1">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPatchAtas"
                                    id="kodeBarangPatchAtas" placeholder="KB Patch Atas">
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPatchBawah"
                                    id="kodeBarangPatchBawah" placeholder="KB Patch Bawah">
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.4">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPatchAtas"
                                    id="namaBarangPatchAtas" placeholder="Nama Barang Patch Atas" readonly>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPatchBawah"
                                    id="namaBarangPatchBawah" placeholder="Nama Barang Patch Bawah" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div id="div_select_tabelHitungan" class="form-group" style="flex: 0.44">
                            <label for="select_tabelHitungan">KB Tabel Hit.</label>
                            <div class="input-group">
                                <select name="select_tabelHitungan" id="select_tabelHitungan" class="form-control">
                                    <option disabled selected>-- Pilih Kode Barang Tabel Hitungan --</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="form-group"style="flex: 0.25">
                            <label for="input_ukuran">Ukuran</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="text" class="form-control" id="input_ukuran" name="input_ukuran"> CM
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.25">
                            <label for="input_rajutan">Rajutan</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_rajutan" name="input_rajutan">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_denier">Denier</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_denier" name="input_denier">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_airPermeability">Air Permeability</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_airPermeability"
                                    name="input_airPermeability">Nm³/h
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_warnaKarung">Warna Karung</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_warnaKarung"
                                    name="input_warnaKarung">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_lebarBB">Lebar BB</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_lebarBB" name="input_denier">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.2">
                            <label for="input_kertas">Kertas</label>
                            <div class="input-group align-items-center">
                                <input type="number" class="form-control" id="input_kertas" name="input_kertas">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.2">
                            <label for="input_inner">Inner</label>
                            <div class="input-group align-items-center">
                                <input type="number" class="form-control" id="input_inner" name="input_inner">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.2">
                            <label for="input_spoonBond">Spoon Bond</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_spoonBond"
                                    name="input_spoonBond">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.2">
                            <label for="input_lami">Lami</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_lami" name="input_lami">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.2">
                            <label for="input_opp">OPP</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_opp" name="input_opp">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 id="title_Body">Body</h4>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.45">
                            <label for="input_roll">Roll Body</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_roll" name="input_roll">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.45">
                            <label for="input_corakBody">Corak Body</label>
                            <div class="input-group">
                                <input type="text" name="input_corakBody" id="input_corakBody"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_drumKliseBody">Drum Klise</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_drumKliseBody"
                                    name="input_drumKliseBody">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 id="title_PatchAtas">Patch Atas</h4>
                <div class="py-2" id="div_rollPatchAtas">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.275">
                            <label for="input_rollPatchAtas" id="label_rollPatchAtas">Roll Patch
                                Atas</label>
                            <div class="input-group">
                                <input type="text" name="input_rollPatchAtas" id="input_rollPatchAtas"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.275">
                            <label for="input_corakPatchAtas" id="label_corakPatchAtas">Corak Patch Atas</label>
                            <div class="input-group">
                                <input type="text" name="input_corakPatchAtas" id="input_corakPatchAtas"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_panjangPotonganPatchAtas" id="label_panjangPotonganPatchAtas">Panjang
                                Potongan Atas</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_panjangPotonganPatchAtas"
                                    name="input_panjangPotonganPatchAtas">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_lebarPotonganPatchAtas" id="label_lebarPotonganPatchAtas">Lebar
                                Potongan Atas</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_lebarPotonganPatchAtas"
                                    name="input_lebarPotonganPatchAtas">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 id="title_PatchBawah">Patch Bawah</h4>
                <div class="py-2" id="div_rollPatchBawah">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.275">
                            <label for="input_rollPatchBawah">Roll Patch Bawah</label>
                            <div class="input-group">
                                <input type="text" name="input_rollPatchBawah" id="input_rollPatchBawah"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.275">
                            <label for="input_corakPatchBawah">Corak Patch Bawah</label>
                            <div class="input-group">
                                <input type="text" name="input_corakPatchBawah" id="input_corakPatchBawah"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_panjangPotonganPatchBawah">Panjang Potongan Bawah</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_panjangPotonganPatchBawah"
                                    name="input_panjangPotonganPatchBawah">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_lebarPotonganPatchBawah">Lebar Potongan Bawah</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_lebarPotonganPatchBawah"
                                    name="input_lebarPotonganPatchBawah">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 id="title_Valve">Valve</h4>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.6">
                            <label for="input_rollValve">Roll Valve</label>
                            <div class="input-group">
                                <input type="text" name="input_rollValve" id="input_rollValve"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_lebarValve">Lebar Valve</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_lebarValve"
                                    name="input_lebarValve">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.15">
                            <label for="input_panjangValve">Panjang Valve</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_panjangValve"
                                    name="input_panjangValve">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_keteranganWoven">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="input_keterangan">Keterangan</label>
                            <div class="input-group">
                                <textarea class="form-control" name="input_keterangan" id="input_keterangan"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="width: 100%; gap: 0.5%;">
                        <div class="form-group"style="flex: 0.3;" id="div_gambar_holePuncher">
                            <label for="gambar_holePuncher">Upload Gambar Contoh Packing</label>
                            <div class="input-group">
                                <input type="file" class="form-control-file" id="gambar_holePuncher"
                                    name="gambar_holePuncher" accept="image/*" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.7;" id="div_previewGambar_contohPacking">
                            <label>Preview Gambar Hole Puncher</label>
                            <div id="imagePreview" style="padding: 10px; max-width: 500px; max-height: 500px;">
                                <img id="previewImg" src="#" alt="Preview Image"
                                    style="max-width: 500px; max-height: 500px;border: 1px solid black;display: none;padding:10px;" />
                            </div>
                            <br>
                            <button type="button" class="btn btn-secondary" id="clearImage"
                                style="width:100px">Clear</button>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
