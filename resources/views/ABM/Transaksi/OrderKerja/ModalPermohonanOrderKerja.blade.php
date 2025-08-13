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
                        <div class="form-group" style="flex: 0.2">
                            <label for="jenisOrderKerja">Jenis Order Kerja</label>
                            <div class="input-group">
                                <select name="select_jenisOrderKerja" id="select_jenisOrderKerja" class="form-control">
                                    <option disabled selected>-- Pilih Jenis Order Kerja --</option>
                                    <option value="1">Woven</option>
                                    <option value="2">Starpak</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 0.2">
                            <label for="NomorOrderKerja">Nomor Order Kerja</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="NomorOrderKerja" name="NomorOrderKerja">
                            </div>
                            <span id="cekNomorOrderKerja"></span>
                        </div>
                        <div class="form-group"style="flex: 0.6">
                            {{-- <label for="customer">Customer</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="customerSuratPesanan"
                                    name="customerSuratPesanan" readonly>
                            </div> --}}
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15">
                            <label for="suratPesanan">Surat Pesanan</label>
                            <div class="input-group">
                                <select name="select_suratPesananTujuan" id="select_suratPesananTujuan"
                                    class="form-control">
                                    <option disabled selected>-- Pilih Surat Pesanan --</option>
                                </select>
                            </div>
                        </div>
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
                <label>Kode Barang Hasil Produksi</label>
                <div class="pt-2 hide-important" id="div_kodeBarangHasilProduksiWoven">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        {{-- <div class="mb-2 align-content-center"style="flex: 0.05">
                            <div class="input-group">
                                <input type="checkbox" class="from-control form-check-input ml-0"
                                    id="jenisOrderKerjaPrintingWoven" name="jenisOrderKerjaPrintingWoven" value=1>
                                <label for="jenisOrderKerjaPrintingWoven"
                                    class="from-control form-check-label ml-3">Woven</label>
                            </div>
                        </div> --}}
                        <div class="mb-2"style="flex: 0.15">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPrintingWoven"
                                    id="kodeBarangPrintingWoven" placeholder="KB Printing Woven" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.3">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPrintingWoven"
                                    id="namaBarangPrintingWoven" placeholder="Nama Barang Printing Woven" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.15">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPotongJahitWoven"
                                    id="kodeBarangPotongJahitWoven" placeholder="KB Potong Jahit Woven" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.3">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPotongJahitWoven"
                                    id="namaBarangPotongJahitWoven" placeholder="Nama Barang Potong Jahit Woven"
                                    readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pb-2 hide-important" id="div_kodeBarangHasilProduksiStarpak">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        {{-- <div class="mb-2 align-content-center"style="flex: 0.05">
                            <div class="input-group">
                                <input type="checkbox" class="from-control form-check-input ml-0"
                                    id="jenisOrderKerjaPrintingStarpak" name="jenisOrderKerjaPrintingStarpak" value=1>
                                <label for="jenisOrderKerjaPrintingStarpak"
                                    class="from-control form-check-label ml-3">Starpak</label>
                            </div>
                        </div> --}}
                        <div class="mb-2"style="flex: 0.15">
                            <div class="input-group">
                                <input type="text" class="form-control" name="kodeBarangPrintingStarpak"
                                    id="kodeBarangPrintingStarpak" placeholder="KB Printing Starpak" readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.3">
                            <div class="input-group">
                                <input type="text" class="form-control" name="namaBarangPrintingStarpak"
                                    id="namaBarangPrintingStarpak" placeholder="Nama Barang Printing Starpak"
                                    readonly>
                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.15">
                            <div class="input-group">

                            </div>
                        </div>
                        <div class="mb-2"style="flex: 0.3">
                            <div class="input-group">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="py-2">
                    <div class="d-flex" style="gap: 1%;width: 100%">
                        <div class="d-flex flex-column" style="gap: 5px;flex: 0.3">
                            <div class="form-group"style="flex: 0.1">
                                <label for="input_ukuran">Ukuran</label>
                                <div class="input-group align-items-center" style="gap: 5px">
                                    <input type="text" class="form-control" id="input_ukuran"
                                        name="input_ukuran"> CM
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.15">
                                <label for="input_rajutan">Rajutan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_rajutan"
                                        name="input_rajutan">
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.1">
                                <label for="input_denier">Denier</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="input_denier"
                                        name="input_denier">
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column hide-important" style="gap: 5px;flex: 0.7;"
                            id="div_printingWoven">
                            <div class="d-flex" style="flex: 0.15;gap: 5px;">
                                <div class="form-group"style="flex: 0.2;">
                                    <label for="input_innerWoven">Inner</label>
                                    <div class="input-group" style="gap: 5px">
                                        <input type="text" class="form-control" id="input_innerWoven"
                                            name="input_innerWoven">
                                    </div>
                                </div>
                                <div class="form-group"style="flex: 0.8;">
                                    <label for="input_potongWoven">Potong</label>
                                    <div class="input-group align-items-center" style="gap: 5px">
                                        <input type="text" class="form-control" id="input_potongWoven"
                                            name="input_potongWoven">CM
                                    </div>
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.25">
                                <label for="input_jahitAtasWoven">Jahit Atas</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_jahitAtasWoven"
                                        name="input_jahitAtasWoven">
                                </div>
                            </div>
                            <div class="form-group"style="flex: 0.25">
                                <label for="input_jahitBawahWoven">Jahit Bawah</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="input_jahitBawahWoven"
                                        name="input_jahitBawahWoven">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2 hide-important" id="div_printingStarpak">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_drumKliseStarpak">Drum Klise</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_drumKliseStarpak"
                                    name="input_drumKliseStarpak">CM
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_panjangPotonganStarpak">Panjang Potongan</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_panjangPotonganStarpak"
                                    name="input_panjangPotonganStarpak">CM
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_coronaStarpak">Corona</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_coronaStarpak"
                                    name="input_coronaStarpak">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_printMaxStarpak">Print Max</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_printMaxStarpak"
                                    name="input_printMaxStarpak">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.125">
                            <label for="input_airPermeabilityStarpak">Air Permeability</label>
                            <div class="input-group align-items-center" style="gap: 5px">
                                <input type="number" class="form-control" id="input_airPermeabilityStarpak"
                                    name="input_airPermeabilityStarpak">Nm³/h
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.15">
                            <label for="tanggal">Tanggal Rencana Mulai Kerja</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="input_tanggalRencanaMulaiKerja"
                                    name="input_tanggalRencanaMulaiKerja">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.17">
                            <label for="tanggal">Tanggal Rencana Selesai Kerja</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="input_tanggalRencanaSelesaiKerja"
                                    name="input_tanggalRencanaSelesaiKerja">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.1">
                            <label for="input_jumlahWarna">Jumlah Warna</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="input_jumlahWarna"
                                    name="input_jumlahWarna">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.43">
                            <label for="corakPrinting">Corak Printing</label>
                            <div class="input-group">
                                <input type="text" name="corakPrinting" id="corakPrinting" class="form-control">
                            </div>
                        </div>
                        <div class="form-group hide-important"style="flex: 0.15" id="div_warnaKarungWoven">
                            <label for="input_warnaKarungWoven">Warna Karung</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="input_warnaKarungWoven"
                                    name="input_warnaKarungWoven">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="additionalInputs" class="row mt-2">
                    <!-- Container to add new inputs -->
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.5">
                            <label for="input_keterangan">Keterangan</label>
                            <div class="input-group">
                                <textarea class="form-control" name="input_keterangan" id="input_keterangan"></textarea>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.5">
                            <div class="input-group">

                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
