$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let bkk = document.getElementById("bkk");
    let tanggalS = document.getElementById("tanggalS");
    let id_uangS = document.getElementById("id_uangS");
    let supplierS = document.getElementById("supplierS");
    let bayarS = document.getElementById("bayarS");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_kiri = $("#table_kiri").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_kanan = $("#table_kanan").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let rowDataPertama;

    table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "MaintenancePelunasanHutang/getDataAtas",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "NM_SUP",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Tgl_Input" },
            { data: "Id_BKK" },
            { data: "Symbol" },
            { data: "NilaiRincian" },
            { data: "Id_Supplier" },
            { data: "Id_MataUang" },
            { data: "IdUangTagih" },
            { data: "IdUang_Supp" },
        ],
        columnDefs: [{ targets: [7, 8], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
    });

    let rowDataArray = [];

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                // Uncheck all other checkboxes and clear the array
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);

                // Get the data for the selected row
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Clear the array and push the current row data
                rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // Clear the array when the checkbox is unchecked
                rowDataArray = [];
                rowDataPertama = null;

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            $.ajax({
                url: "MaintenancePelunasanHutang/proses",
                type: "GET",
                data: {
                    _token: csrfToken,
                    rowDataArray: rowDataArray,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            bkk.value = rowDataPertama.Id_BKK;
                            tanggalS.value = rowDataPertama.Tgl_Input;
                            id_uangS.value = rowDataPertama.Id_MataUang;
                            supplierS.value = rowDataPertama.Id_Supplier;
                            bayarS.value = rowDataPertama.IdUangTagih;
                            rowDataPertama = null;
                            rowDataArray = [];
                            $("#table_atas").DataTable().ajax.reload();
                        });
                    } else if (response.question) {
                        Swal.fire({
                            text: response.question,
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                            focusConfirm: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $.ajax({
                                    url: "MaintenancePelunasanHutang/prosesDollar",
                                    type: "GET",
                                    data: {
                                        _token: csrfToken,
                                        rowDataArray: rowDataArray,
                                    },
                                    success: function (response) {
                                        if (response.message) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Success!",
                                                text: response.message,
                                                showConfirmButton: true,
                                            }).then(() => {
                                                bkk.value =
                                                    rowDataPertama.Id_BKK;
                                                tanggalS.value =
                                                    rowDataPertama.Tgl_Input;
                                                id_uangS.value =
                                                    rowDataPertama.Id_MataUang;
                                                supplierS.value =
                                                    rowDataPertama.Id_Supplier;
                                                bayarS.value =
                                                    rowDataPertama.IdUangTagih;
                                                rowDataPertama = null;
                                                rowDataArray = [];
                                                $("#table_atas")
                                                    .DataTable()
                                                    .ajax.reload();
                                            });
                                        } else if (response.error) {
                                            Swal.fire({
                                                icon: "info",
                                                title: "Info!",
                                                text: response.error,
                                                showConfirmButton: false,
                                            });
                                        }
                                    },
                                    error: function (xhr) {
                                        alert(xhr.responseJSON.message);
                                    },
                                });
                                // setTimeout(() => {
                                //     jumlah_biayaMBiaya.focus();
                                // }, 300);
                            } else {
                                // tutup_modal.click();
                            }
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.message);
                },
            });
        }
    });
});
