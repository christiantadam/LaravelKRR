<div class="modal fade" id="manualVerifyModal" tabindex="-1">
    <div class="modal-dialog modal-custom-full">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Manual Verify</h5>
                <button type="button" class="close" data-bs-dismiss="modal">x</button>
            </div>

            <div class="modal-body">
                <input type="hidden" id="id_userManualVerify">

                <div class="table-responsive">
                    <table id="table_daftarCustomerManualVerify" class="table w-100">
                        <thead>
                            <tr>
                                <th>Nama Customer</th>
                                <th>Alamat</th>
                                <th>Alamat Kirim</th>
                                <th>Kota</th>
                                <th>Kota Kirim</th>
                                <th>NPWP</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <button class="btn btn-add btn-primary my-2">Add (+)</button>

                <div class="table-responsive">
                    <table id="table_daftarKoneksiCustomerManualVerify" class="table w-100">
                        <thead>
                            <tr>
                                <th>Nama Customer</th>
                                <th>Kota</th>
                                <th>NPWP</th>
                                <th>Nama User</th>
                                <th>Nama Perusahaan</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .modal-custom-full {
        max-width: 98%;
        width: 98%;
        margin: 10px auto;
    }
    .modal-custom-full .modal-content {
        height: 95vh;
    }
    .modal-custom-full .modal-body {
        overflow-y: auto;
    }
    tr.selected {
        background-color: #cce5ff !important;
    }
    .dataTables_wrapper {
        width: 100%;
    }
</style>
