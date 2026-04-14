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
                    return `<span class="badge bg-danger text-white">Belum ACC</span>`;
                }
            },
            {
                data: "IDPengiriman",
                render: function (data, type, row) {
                    return `<button class="btn btn-success btn-kirimSJ" data-idpengiriman=${data} >Kirim SJ</button>`;
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
        let idPengiriman = $(this).data("idpengiriman");
        console.log(idPengiriman);

        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengirim SJ ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "kirimSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire("Pemberitahuan", response.error, "info");
                        } else if (response.success) {
                            Swal.fire(
                                "Berhasil!",
                                response.success,
                                "success",
                            ).then(() => {
                                table_SJ.ajax.reload();
                            });
                        }
                    },
                });
            }
        });
    });
    //#endregion
});
