$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let bkk = document.getElementById("bkk");
    let nama_supplier = document.getElementById("nama_supplier");
    let radio_1 = document.getElementById("radio_1");
    let table_bkk = $("#table_bkk").DataTable({
        columnDefs: [{ targets: [3, 4], visible: false }],
    });
    let table_pembayaran = $("#table_pembayaran").DataTable({
        // columnDefs: [{ targets: [3, 4], visible: false }],
    });
    let table_rincian = $("#table_rincian").DataTable({
        // columnDefs: [{ targets: [3, 4], visible: false }],
    });
    let rowDataPertama;
    let krr1 = false;

    let currentDate = new Date();
    bulan.value = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    tahun.value = currentDate.getFullYear();

    radio_1.addEventListener("click", function (event) {
        krr1 = true;
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        if ($.fn.DataTable.isDataTable("#table_bkk")) {
            $("#table_bkk").DataTable().destroy();
        }
        table_bkk = $("#table_bkk").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceKursBKK/checkBKK",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                        krr1: krr1,
                    });
                },
            },
            columns: [
                {
                    data: "Id_BKK",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Nilai_Pembulatan" },
                { data: "Tanggal_BKK" },
                { data: "NM_SUP" },
                { data: "Id_Supplier" },
                { data: "Sym_Supp" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            columnDefs: [{ targets: [5], visible: false }],
        });
    });

    $("#table_bkk tbody").off("click", "tr");
    $("#table_bkk tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#table_bkk tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table_bkk = $("#table_bkk").DataTable();
        let selectedRows = table_bkk.rows(".selected").data().toArray();
        console.log(selectedRows);

        bkk.value = selectedRows[0].Id_BKK;
        nama_supplier.value = selectedRows[0].NM_SUP;

        table_pembayaran = $("#table_pembayaran").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceKursBKK/listBKKClick",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bkk: bkk.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Pembayaran",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_Penagihan" },
                { data: "Jenis_Pembayaran" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Pembayaran" },
                { data: "Kurs_Bayar" },
            ],
            // columnDefs: [{ targets: [5, 6], visible: false }],
        });
    });

    let rowDataArray = [];

    $("#table_pembayaran tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_pembayaran tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_pembayaran.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_pembayaran);

                table_rincian = $("#table_rincian").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "MaintenanceKursBKK/listBayarClick",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                id_pembayaran: rowDataPertama.Id_Pembayaran,
                            });
                        },
                    },
                    columns: [
                        {
                            data: "Id_Pembayaran",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "Id_Detail_Bayar" },
                        { data: "Rincian_Bayar" },
                        { data: "Nilai_Rincian" },
                        { data: "Kode_Perkiraan" },
                        { data: "Kurs" },
                    ],
                    // columnDefs: [{ targets: [5, 6], visible: false }],
                });
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_pembayaran);

                $("#table_rincian tbody").empty();
            }
        }
    );
});
