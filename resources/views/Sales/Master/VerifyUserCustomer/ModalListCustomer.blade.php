<div class="modal fade" id="listCustomerModal" tabindex="-1">
    <div class="modal-dialog modal-custom-full">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">List Customer</h5>
                <button type="button" class="close" data-bs-dismiss="modal">x</button>
            </div>

            <div class="modal-body">
                <input type="hidden" id="id_userListCustomer">

                <table id="table_listCustomer" class="table table-bordered">
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

<style>
    .modal-custom-full {
        max-width: 95%;
    }

    .modal-body {
        overflow-x: auto;
    }
</style>

