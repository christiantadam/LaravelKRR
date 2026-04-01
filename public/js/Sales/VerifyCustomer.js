jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let table_User = $("#table_User").DataTable({
        processing: true,
        responsive: true,
        serverSide: true,
        order: [[4, "desc"]],
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
    $("#table_User").on("click", ".btn-kirimSJ", function () {
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
