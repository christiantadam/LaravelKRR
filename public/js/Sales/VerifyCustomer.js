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
                data: "IsNPWPExist",
                render: function (data) {
                    return data == 1
                        ? `<span class="badge bg-success">Valid</span>`
                        : `<span class="badge bg-danger">Tidak Terdaftar</span>`;
                },
            },

            {
                data: "IdUser",
                orderable: false,
                searchable: false,
                render: function (data, type, row) {

                    if (row.IsNPWPExist == 0) {
                        return `
                            <button class="btn btn-danger btn-warning-npwp"
                                data-npwp="${row.NPWP}">
                                NPWP Invalid
                            </button>
                        `;
                    }

                    if (row.Verification == 1) {
                        return `
                            <button class="btn btn-secondary" disabled>
                                Verified
                            </button>
                        `;
                    }

                    return `
                        <button class="btn btn-success btn-verify"
                            data-iduser="${data}"
                            data-npwp="${row.NPWP}">
                            Verify
                        </button>
                    `;
                },
            },
        ],
    });

    //#endregion

    //#region Functions

    //#endregion

    //#region Load Form

    //#endregion

    //#region Event Listener

    $("#table_User").on("click", ".btn-warning-npwp", function () {
        let npwp = $(this).data("npwp");

        Swal.fire({
            icon: "warning",
            title: "NPWP Tidak Ditemukan",
            text: `NPWP Belum Terdaftar.`,
        });
    });


    $("#table_User").on("click", ".btn-verify", function () {
        let btn = $(this);
        let idUser = btn.data("iduser");
        let npwp = btn.data("npwp");

        Swal.fire({
            title: "Konfirmasi",
            text: "Verifikasi user ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (!result.isConfirmed) return;

            btn.prop("disabled", true).text("Processing...");

            $.ajax({
                url: "/VerifyUserCustomer/updateVerification",
                type: "GET",
                data: {
                    idUser: idUser,
                    npwp: npwp,
                    _token: csrfToken,
                },
                success: function (res) {
                    if (res.error) {
                        Swal.fire("Gagal", res.error, "error");
                        btn.prop("disabled", false).text("Verify");
                    } else {
                        Swal.fire("Berhasil", res.success, "success")
                            .then(() => {
                                table_User.ajax.reload();
                            });
                    }
                },
                error: function () {
                    Swal.fire("Error", "Terjadi kesalahan server", "error");
                    btn.prop("disabled", false).text("Verify");
                },
            });
        });
    });

    //#endregion

});
