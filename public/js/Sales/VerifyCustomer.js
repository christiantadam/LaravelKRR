jQuery(function ($) {

    //#region Variables
    let csrfToken = $('meta[name="csrf-token"]').attr("content");

    let table_User;
    let tableAvailableCustomer = null;
    let tableConnectedCustomer = null;
    let selectedCustomer = null;


    table_User = $("#table_User").DataTable({
        processing: true,
        responsive: true,
        serverSide: true,
        order: [[0, "asc"]],
        ajax: {
            url: "/VerifyUserCustomer/getDataUser",
            type: "GET",
        },
        columns: [
            { data: "NamaUser" },
            { data: "Email" },
            { data: "NamaPerusahaan" },
            { data: "NPWP" },
            {
                data: "IdUser",
                orderable: false,
                searchable: false,
                render: function (data, type, row) {

                    let buttons = "";

                    if (row.Verification != 1) {
                        buttons += `
                            <button class="btn btn-success btn-sm btn-auto-verify"
                                data-iduser="${data}"
                                data-npwp="${row.NPWP}">
                                Verify
                            </button>
                        `;
                    } else {
                        buttons += `
                            <button class="btn btn-secondary btn-sm" disabled>
                                Verified
                            </button>
                        `;
                    }

                    buttons += `
                        <button class="btn btn-warning btn-sm btn-manual-verify"
                            data-iduser="${data}">
                            Manual Verify
                        </button>
                    `;

                    if (row.IsConnectionExist != 1) {
                        buttons += `
                            <button class="btn btn-info btn-sm btn-list-customer"
                                data-iduser="${data}">
                                List Customer
                            </button>
                        `;
                    } else {
                        buttons += `
                            <button class="btn btn-secondary btn-sm" disabled>
                                List Customer
                            </button>
                        `;
                    }

                    return `<div class="d-flex flex-wrap gap-1">${buttons}</div>`;
                },
            },
        ],
    });

    //#endregion

    //#region Function
    //#endregion

    //#region Event Listener

    $("#table_User").on("click", ".btn-auto-verify", function () {
        let btn = $(this);
        let idUser = btn.data("iduser");
        let npwp = btn.data("npwp");

        Swal.fire({
            title: "Konfirmasi",
            text: "User akan diverifikasi secara otomatis?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {

            if (!result.isConfirmed) return;

            btn.prop("disabled", true).text("Processing...");

            $.get("/VerifyUserCustomer/updateVerification", {
                idUser,
                npwp,
            }, function (res) {

                if (res.error) {
                    Swal.fire("Error", res.error, "error");
                    btn.prop("disabled", false).text("Verify");
                } else {
                    Swal.fire("Success", res.success, "success")
                        .then(() => table_User.ajax.reload());
                }

            }).fail(() => {
                Swal.fire("Error", "Server error", "error");
                btn.prop("disabled", false).text("Verify");
            });

        });
    });

    $("#table_User").on("click", ".btn-manual-verify", function () {
        let idUser = $(this).data("iduser");

        $("#id_userManualVerify").val(idUser);
        $("#manualVerifyModal").modal("show");
    });


    $('#manualVerifyModal').on('shown.bs.modal', function () {

        // reset selection
        selectedCustomer = null;
        $('#table_daftarCustomerManualVerify tr.selected').removeClass('selected');

        // ======================
        // TABLE AVAILABLE
        // ======================
        if ($.fn.DataTable.isDataTable('#table_daftarCustomerManualVerify')) {

            tableAvailableCustomer.ajax.reload(null, false);

        } else {
            tableAvailableCustomer = $("#table_daftarCustomerManualVerify").DataTable({
                processing: true,
                serverSide: true,
                responsive: true,
                scrollX: true,
                autoWidth: false,
                scrollCollapse: true,
                ajax: {
                    url: "/VerifyUserCustomer/getAvailableCustomer",
                    type: "GET",
                    data: function (d) {
                        d.idUser = $("#id_userManualVerify").val();
                    }
                },
                rowId: 'IDCust',
                columns: [
                    { data: "NamaCust" },
                    { data: "Alamat" },
                    { data: "AlamatKirim" },
                    { data: "Kota" },
                    { data: "KotaKirim" },
                    { data: "NPWP" }
                ]
            });

            // SINGLE SELECT EVENT
            $("#table_daftarCustomerManualVerify tbody")
                .off("click")
                .on("click", "tr", function () {

                    let row = tableAvailableCustomer.row(this);
                    let id = row.id();

                    if (!id) return;

                    // clear previous
                    tableAvailableCustomer.$("tr.selected").removeClass("selected");

                    // set new
                    $(this).addClass("selected");
                    selectedCustomer = id;

                    console.log("Selected:", selectedCustomer);
                });
        }


        // ======================
        // TABLE CONNECTED
        // ======================
        if ($.fn.DataTable.isDataTable('#table_daftarKoneksiCustomerManualVerify')) {

            tableConnectedCustomer.ajax.reload(null, false);

        } else {

            tableConnectedCustomer = $("#table_daftarKoneksiCustomerManualVerify").DataTable({
                processing: true,
                serverSide: true,
                responsive: true,
                scrollX: true,
                autoWidth: false,
                scrollCollapse: true,
                ajax: {
                    url: "/VerifyUserCustomer/getConnectedCustomer",
                    type: "GET",
                    data: function (d) {
                        d.idUser = $("#id_userManualVerify").val();
                    }
                },
                columns: [
                    { data: "NamaCust" },
                    { data: "Kota" },
                    { data: "NPWP" },
                    { data: "NamaUser" },
                    { data: "NamaPerusahaan" }
                ]
            });
        }


        // ======================
        // FIX RENDER
        // ======================
        setTimeout(() => {

            if (tableAvailableCustomer) {
                tableAvailableCustomer.columns.adjust();
                if (tableAvailableCustomer.responsive) {
                    tableAvailableCustomer.responsive.recalc();
                }
            }

            if (tableConnectedCustomer) {
                tableConnectedCustomer.columns.adjust();
                if (tableConnectedCustomer.responsive) {
                    tableConnectedCustomer.responsive.recalc();
                }
            }

        }, 300);

    });

    $('.btn-add').on('click', function () {

        let idUser = $("#id_userManualVerify").val();

        if (!selectedCustomer) {
            Swal.fire("Warning", "Pilih 1 customer", "warning");
            return;
        }

        $.ajax({
            url: "/VerifyUserCustomer/addCustomerManual",
            type: "GET",
            data: {
                idUser: idUser,
                customers: [selectedCustomer]
            },
            traditional: true,
            success: function (res) {

                if (res.error) {
                    Swal.fire("Error", res.error, "error");
                    return;
                }

                Swal.fire("Success", res.success, "success");

                selectedCustomer = null;

                tableAvailableCustomer.ajax.reload(null, false);
                tableConnectedCustomer.ajax.reload(null, false);
            },
            error: function () {
                Swal.fire("Error", "Server error", "error");
            }
        });

    });

    $(window).on('resize', function () {
        if (tableAvailableCustomer) {
            tableAvailableCustomer.columns.adjust();
        }

        if (tableConnectedCustomer) {
            tableConnectedCustomer.columns.adjust();
        }
    });

    $('#manualVerifyModal').on('hidden.bs.modal', function () {
        if (tableAvailableCustomer) {
            tableAvailableCustomer.search('').draw();
        }

        if (tableConnectedCustomer) {
            tableConnectedCustomer.search('').draw();
        }

    });

    //#endregion

});
