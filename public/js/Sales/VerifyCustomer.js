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
                    let buttons = '';

                    if (row.IsNPWPExist == 0) {
                        buttons += `
                            <button class="btn btn-danger btn-sm me-1 btn-invalid"
                                data-npwp="${row.NPWP}">
                                NPWP Invalid
                            </button>
                        `;
                    }

                    if (row.Verification != 1 && row.IsNPWPExist == 1) {
                        buttons += `
                            <button class="btn btn-success btn-sm me-1 btn-auto-verify"
                                data-iduser="${data}"
                                data-npwp="${row.NPWP}">
                                Verify
                            </button>
                        `;
                    }

                    if (row.Verification == 1) {
                        buttons += `
                            <button class="btn btn-secondary btn-sm me-1" disabled>
                                Verified
                            </button>
                        `;
                    }

                    if (row.Verification != 1) {
                        buttons += `
                            <button class="btn btn-warning btn-sm btn-manual-verify"
                                data-iduser="${data}">
                                Manual Verify
                            </button>
                        `;
                    }

                    return `<div class="d-flex flex-wrap gap-1">${buttons}</div>`;
                }
            },
        ],
    });
    //#endregion


    //#region Functions

    function submitManualVerify(idUser) {

        $.ajax({
            url: "/VerifyUserCustomer/manualVerify",
            type: "GET",
            data: {
                idUser: idUser,
                namaUser: $("#namaUser").val(),
                email: $("#email").val(),
                namaPerusahaan: $("#namaPerusahaan").val(),
                npwp: $("#npwp").val(),
                noHP: $("#noHP").val(),
                alamatPerusahaan: $("#alamatPerusahaan").val(),
            },
            success: function (res) {

                if (res.error) {
                    Swal.fire("Error", res.error, "error");
                } else {
                    Swal.fire("Success", res.success, "success")
                        .then(() => table_User.ajax.reload());
                }

            },
            error: function () {
                Swal.fire("Error", "Terjadi kesalahan server", "error");
            }
        });
    }


    function loadDetailUser(idUser) {

        $.get("/VerifyUserCustomer/getDetailUser", { idUser }, function (res) {

            let html = `
                <div class="container-fluid text-start">

                    ${inputRow("Nama Customer", "namaUser", res.NamaUser)}
                    ${inputRow("Email", "email", res.Email)}
                    ${inputRow("Nama Perusahaan", "namaPerusahaan", res.NamaPerusahaan)}
                    ${inputRow("NPWP", "npwp", res.NPWP)}
                    ${inputRow("No HP", "noHP", res.NoHP)}

                    <div class="row mb-3">
                        <div class="col-4 d-flex justify-content-between">
                            <span>Alamat</span><span>:</span>
                        </div>
                        <div class="col-8">
                            <textarea id="alamatPerusahaan" class="form-control">${res.AlamatPerusahaan ?? ''}</textarea>
                        </div>
                    </div>

                </div>
            `;

            Swal.fire({
                title: "Edit Customer",
                html: html,
                width: 600,
                showCancelButton: true,
                confirmButtonText: "Verify"
            }).then(result => {

                if (!result.isConfirmed) return;
                submitManualVerify(idUser);
            });

        });
    }


    function inputRow(label, id, value) {
        return `
            <div class="row mb-3 align-items-center">
                <div class="col-4 d-flex justify-content-between text-nowrap">
                    <span>${label}</span><span>:</span>
                </div>
                <div class="col-8">
                    <input id="${id}" class="form-control" value="${value ?? ''}">
                </div>
            </div>
        `;
    }

    //#endregion


    //#region Event Listener

    $("#table_User").on("click", ".btn-invalid", function () {
        Swal.fire("Warning", "NPWP Belum Terdaftar", "warning");
    });


    $("#table_User").on("click", ".btn-auto-verify", function () {

        let btn = $(this);
        let idUser = btn.data("iduser");
        let npwp = btn.data("npwp");

        Swal.fire({
            title: "Konfirmasi",
            text: "Verifikasi user ini?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {

            if (!result.isConfirmed) return;

            btn.prop("disabled", true).text("Processing...");

            $.get("/VerifyUserCustomer/updateVerification", {
                idUser,
                npwp
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

        let originalIdUser = $(this).data("iduser");

        $.get("/VerifyUserCustomer/getCustomerList", function (res) {

            let html = `
                <select id="selectCustomer" class="form-control">
                    <option value="">-- Pilih Customer --</option>
            `;

            res.forEach(c => {
                html += `
                    <option value="${c.IdUser}">
                        ${c.NamaUser} - ${c.NamaPerusahaan}
                    </option>
                `;
            });

            html += `</select>`;

            Swal.fire({
                title: "Pilih Customer",
                html: html,
                showCancelButton: true,
                confirmButtonText: "Pilih"
            }).then(result => {

                if (!result.isConfirmed) return;

                let refUserId = $("#selectCustomer").val();

                if (!refUserId) {
                    Swal.fire("Warning", "Pilih customer terlebih dahulu", "warning");
                    return;
                }

                loadDetailUser(originalIdUser, refUserId);
            });

        });

    });
    //#endregion

});
