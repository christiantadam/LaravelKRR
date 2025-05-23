<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahPermohonanOrderKerjaModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahPermohonanOrderKerjaLabel">Tambah Order Kerja </h5>
                <button type="button" class="close" id="closeModalButton">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="jenisOrderKerja">Jenis Order Kerja</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="jenis_order_kerja" id="jenisOrderWoven"
                            value="Woven" checked>
                        <label class="form-check-label" for="jenisOrder1">Woven</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="jenis_order_kerja" id="jenisOrderAdstar"
                            value="Adstar">
                        <label class="form-check-label" for="jenisOrder2">ADStar</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="NomorOrderKerja">Nomor Order Kerja</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="NomorOrderKerja" name="NomorOrderKerja">
                    </div>
                    <span id="cekNomorOrderKerja"></span>
                </div>
                <div class="form-group">
                    <label for="suratPesanan">Surat Pesanan</label>
                    <div class="input-group">
                        <select name="select_suratPesananTujuan" id="select_suratPesananTujuan" class="form-control">
                            <option disabled selected>-- Pilih Surat Pesanan --</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="namaBarang">Nama Barang</label>
                    <div class="input-group">
                        <div id="namaBarang" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="tanggal">Tanggal Rencana Mulai Kerja</label>
                    <div class="input-group">
                        <input type="date" class="form-control" id="input_tanggalRencanaMulaiKerja"
                            name="input_tanggalRencanaMulaiKerja">
                    </div>
                </div>
                <div class="form-group">
                    <label for="tanggal">Tanggal Rencana Selesai Kerja</label>
                    <div class="input-group">
                        <input type="date" class="form-control" id="input_tanggalRencanaSelesaiKerja"
                            name="input_tanggalRencanaSelesaiKerja">
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProses">Proses</button>
            </div>
        </div>
    </div>
</div>
