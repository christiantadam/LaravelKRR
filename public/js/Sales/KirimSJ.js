jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let table_SJ = $("#table_SJ").DataTable({
        processing: true,
        responsive: true,
        serverSide: true,
        order: [[4, "desc"]],
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
                data: "IdHeaderKirim",
                render: function (data, type, row) {
                    return `<button class="btn btn-success btn-kirimSJ" data-idHeader=${data} >Kirim SJ</button>`;
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
        let idHeaderKirim = $(this).data("idheader");
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
                        idHeader: idHeaderKirim,
                        _token: csrfToken,
                    },
                    success: function () {
                        Swal.fire(
                            "Berhasil!",
                            "SJ berhasil dikirim.",
                            "success",
                        );
                    },
                });
            }
        });
    });
    //#endregion
});
