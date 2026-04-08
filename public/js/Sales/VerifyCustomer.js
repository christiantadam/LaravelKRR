jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let table_User = $("#table_User").DataTable({
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

                    // Jika belum Verifikasi
                    if (row.Verification != 1) {
                        buttons += `
                            <button class="btn btn-success btn-sm me-1 btn-auto-verify"
                                data-iduser="${data}"
                                data-npwp="${row.NPWP}">
                                Verify
                            </button>
                        `;
                    }

                    // Jika sudah Verifikasi
                    if (row.Verification == 1) {
                        buttons += `
                            <button class="btn btn-secondary btn-sm me-1" disabled>
                                Verified
                            </button>
                        `;
                    }

                    // Manual Verify
                    buttons += `
                        <button class="btn btn-warning btn-sm btn-manual-verify"
                            data-iduser="${data}">
                            Manual Verify
                        </button>
                    `;

                    // Jika user belum punya koneksi dengan table customer
                    if (row.IsConnectionExist != 1) {
                        buttons += `
                            <button class="btn btn-info btn-sm me-1 btn-list-customer"
                                data-iduser="${data}"
                                data-npwp="${row.NPWP}">
                                List Customer
                            </button>
                        `;
                    }

                    // Jika user sudah punya koneksi dengan table customer
                    if (row.IsConnectionExist == 1) {
                        buttons += `
                            <button class="btn btn-secondary btn-sm me-1" disabled>
                                List Customer
                            </button>
                        `;
                    }

                    return `<div class="d-flex flex-wrap gap-1">${buttons}</div>`;
                },
            },
        ],
    });
    // let table_daftarCustomerManualVerify = $(
    //     "#table_daftarCustomerManualVerify",
    // ).DataTable({
    //     processing: true,
    //     responsive: true,
    //     serverSide: true,
    //     order: [[0, "asc"]],
    //     ajax: {
    //         url: "/VerifyUserCustomer/getDataCustomer",
    //         type: "GET",
    //     },
    //     columns: [
    //         { data: "NamaUser" },
    //         { data: "Email" },
    //         { data: "NamaPerusahaan" },
    //         { data: "NPWP" },
    //         {
    //             data: "IdUser",
    //             orderable: false,
    //             searchable: false,
    //             render: function (data, type, row) {
    //                 let buttons = "";

    //                 // Jika belum Verifikasi
    //                 if (row.Verification != 1) {
    //                     buttons += `
    //                         <button class="btn btn-success btn-sm me-1 btn-auto-verify"
    //                             data-iduser="${data}"
    //                             data-npwp="${row.NPWP}">
    //                             Verify
    //                         </button>
    //                     `;
    //                 }

    //                 // Jika sudah Verifikasi
    //                 if (row.Verification == 1) {
    //                     buttons += `
    //                         <button class="btn btn-secondary btn-sm me-1" disabled>
    //                             Verified
    //                         </button>
    //                     `;
    //                 }

    //                 // Manual Verify
    //                 buttons += `
    //                     <button class="btn btn-warning btn-sm btn-manual-verify"
    //                         data-iduser="${data}">
    //                         Manual Verify
    //                     </button>
    //                 `;

    //                 // Jika user belum punya koneksi dengan table customer
    //                 if (row.IsConnectionExist != 1) {
    //                     buttons += `
    //                         <button class="btn btn-info btn-sm me-1 btn-list-customer"
    //                             data-iduser="${data}"
    //                             data-npwp="${row.NPWP}">
    //                             List Customer
    //                         </button>
    //                     `;
    //                 }

    //                 // Jika user sudah punya koneksi dengan table customer
    //                 if (row.IsConnectionExist == 1) {
    //                     buttons += `
    //                         <button class="btn btn-secondary btn-sm me-1" disabled>
    //                             List Customer
    //                         </button>
    //                     `;
    //                 }

    //                 return `<div class="d-flex flex-wrap gap-1">${buttons}</div>`;
    //             },
    //         },
    //     ],
    // });
    // let table_daftarKoneksiCustomerManualVerify = $(
    //     "#table_daftarKoneksiCustomerManualVerify",
    // ).DataTable({
    //     processing: true,
    //     responsive: true,
    //     serverSide: true,
    //     order: [[0, "asc"]],
    // });

    let id_userManualVerify = document.getElementById("id_userManualVerify");
    //#endregion

    //#region Functions

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

            $.get(
                "/VerifyUserCustomer/updateVerification",
                {
                    idUser,
                    npwp,
                },
                function (res) {
                    if (res.error) {
                        Swal.fire("Error", res.error, "error");
                        btn.prop("disabled", false).text("Verify");
                    } else {
                        Swal.fire("Success", res.success, "success").then(() =>
                            table_User.ajax.reload(),
                        );
                    }
                },
            ).fail(() => {
                Swal.fire("Error", "Server error", "error");
                btn.prop("disabled", false).text("Verify");
            });
        });
    });

    $("#table_User").on("click", ".btn-manual-verify", function () {
        let originalIdUser = $(this).data("iduser");
        $("#manualVerifyModal").modal("show");
    });

    $("#table_User").on("click", ".btn-list-customer", function () {
        let originalIdUser = $(this).data("iduser");
    });
    //#endregion
});
