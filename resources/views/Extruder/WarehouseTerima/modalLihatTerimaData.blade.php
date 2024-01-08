<div class="modal fade" id="form_lihat_data" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h1 id="ld_title" class="modal-title fs-5">Lihat Data</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <h1 id="loading_lbl">
                    <center>Memuat data...</center>
                </h1>

                <div id="tempat_tabel" tabindex="0" class="hidden"></div>
            </div>

            <div class="modal-footer">
                <button type="button" id="ld_confirm" class="btn btn-primary">OK</button>
                <button type="button" id="ld_cancel" class="btn btn-secondary" data-bs-dismiss="modal">BATAL</button>
            </div>

        </div>
    </div>
</div>

<script src="{{ asset('js\Extruder\WarehouseTerima\lihatTerimaData.js') }}"></script>
