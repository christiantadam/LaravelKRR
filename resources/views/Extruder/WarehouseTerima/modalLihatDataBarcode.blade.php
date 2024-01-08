<div class="modal fade" id="form_lihat_data" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h1 id="ld_title" class="modal-title fs-5">Lihat Data Gelondongan</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <input type="hidden" id="hidden_divisi">

                <h1 id="loading_lbl">
                    <center>Memuat data...</center>
                </h1>

                <div class="row mb-3">
                    <div class="col-lg-3">
                        <span class="aligned-text" style="margin-top: 10px">Tanggal:</span>
                    </div>
                    <div class="col-lg-5">
                        <div class="input-group">
                            <input type="date" id="ld_tanggal" class="form-control">
                            <button type="button" id="btn_refresh" class="btn btn-outline-primary">Refresh</button>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <button type="button" id="btn_semua" class="btn btn-outline-secondary">Lihat Semua</button>
                    </div>
                </div>

                <input type="hidden" id="hid_divisi">
                <input type="hidden" id="hid_objek">

                <table id="table_kirim_gudang" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Tanggal</th>
                            <th>Type</th>
                            <th>Kode Barang</th>
                            <th>No. Indeks</th>
                            <th>Primer</th>
                            <th>Sekunder</th>
                            <th>Tritier</th>
                            <th>Divisi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            {{-- <div class="modal-footer">
                <button type="button" id="ld_cancel" class="btn btn-secondary" data-bs-dismiss="modal">KELUAR</button>
            </div> --}}

        </div>
    </div>
</div>

<script src="{{ asset('js\Extruder\WarehouseTerima\lihatDataBarcode.js') }}"></script>
