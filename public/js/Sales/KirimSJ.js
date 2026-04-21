jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let table_SJ = $("#table_SJ").DataTable({
        processing: true,
        responsive: true,
        serverSide: true,
        order: [],
        columnDefs: [{ targets: 5, orderable: false }],
        ajax: {
            url: "/KirimSJ/getDataSJ",
            type: "GET",
        },
        columns: [
            { data: "NamaCust" },
            { data: "IDPengiriman" },
            { data: "IDSuratPesanan" },
            { data: "NamaType" },
            {
                data: "Tanggal",
                render: function (data, type, row) {
                    return moment(data).format("MM/DD/YYYY");
                },
            },
            {
                data: "Status",
                render: function (data) {
                    if (data === 'Pasca Kirim') {
                        return `<span class="badge bg-warning">Pasca Kirim</span>`;
                    }
                    if (data === 'Belum Approve') {
                        return `<span class="badge bg-info">Belum Approve</span>`;
                    }
                    return `<span class="badge bg-danger text-white">Belum Kirim</span>`;
                }
            },
            {
                data: "IDPengiriman",
                render: function (data, type, row) {
                    if (row.Status === 'Pasca Kirim') {
                        return '';
                    }

                    if (row.Status === 'Belum Approve') {
                        return `
                            <button class="btn btn-warning btn-resendSJ"
                                    data-idpengiriman="${data}">
                                Resend Email
                            </button>
                        `;
                    }

                    if (row.IsTTDComplete == 0) {
                        return `
                            <button class="btn btn-secondary" disabled
                                    title="TTD Supir & Satpam belum lengkap">
                                Kirim SJ
                            </button>
                        `;
                    }

                    return `
                        <button class="btn btn-success btn-kirimSJ"
                                data-idpengiriman="${data}">
                            Kirim SJ
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

    //#region Event Listeners
    $("#table_SJ").on("click", ".btn-kirimSJ", function () {

        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");

        // 🚫 CEGAH DOUBLE CLICK
        if ($btn.data("clicked")) return;
        $btn.data("clicked", true);

        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengirim SJ ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

            // 🔒 lock UI swal
            allowOutsideClick: false,
            allowEscapeKey: false,

            showLoaderOnConfirm: true,

            preConfirm: () => {
                return $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "kirimSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    }
                }).then(response => {

                    if (response.error) {
                        throw new Error(response.error);
                    }

                    return response;

                }).catch(error => {

                    Swal.showValidationMessage(
                        error.responseJSON?.error || error.message || 'Terjadi kesalahan'
                    );

                    // ❗ reset klik kalau gagal
                    $btn.data("clicked", false);

                });
            }
        }).then((result) => {

            if (!result.isConfirmed) {
                // ❗ kalau batal → reset
                $btn.data("clicked", false);
                return;
            }

            let response = result.value;

            Swal.fire(
                "Berhasil!",
                response.success,
                "success"
            ).then(() => {
                table_SJ.ajax.reload();
            });

        });

    });

    $("#table_SJ").on("click", ".btn-resendSJ", function () {
        let idPengiriman = $(this).data("idpengiriman");

        Swal.fire({
            title: "Konfirmasi",
            text: "Kirim ulang email ke customer?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim ulang!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "resendSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire("Info", response.error, "info");
                        } else {
                            Swal.fire("Berhasil", response.success, "success");
                        }
                    },
                });
            }
        });
    });

    $("#table_SJ").on("click", ".btn-warningTTD", function () {
        Swal.fire({
            icon: "warning",
            title: "TTD Belum Lengkap",
            text: "Tanda tangan Supir dan Satpam belum lengkap.\nSilakan lakukan Pemeriksaan Barang terlebih dahulu.",
        });
    });
    //#endregion
});
