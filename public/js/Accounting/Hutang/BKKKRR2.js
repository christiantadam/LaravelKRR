$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_okbkk = document.getElementById("btn_okbkk");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let tablekanan = $("#tablekanan").DataTable();
    let tablekiri = $("#tablekiri").DataTable();
    let rowData;

    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;

    let tableatas = $("#tableatas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceBKKKRR2/getPengajuan",
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
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "Id_Bank" },
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
            { data: "IdMataUang_PO" },
            { data: "Id_Jenis_Bayar" },
            { data: "Id_MataUang" },
            { data: "Id_Supplier" },
            { data: "Jenis_Bank" },
        ],
        columnDefs: [{ targets: [10, 11, 12, 13], visible: false }],
    });

    $("#tablepertama tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tableatas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowData = tableatas.row($(this).closest("tr")).data();
                console.log(rowData, this, tableatas);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        }
    );

    $("#tableatas tbody").off("click", "tr");
    $("#tableatas tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tableatas tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const tableatas = $("#tableatas").DataTable();
        let selectedRows = tableatas.rows(".selected").data().toArray();
        id_pembayaran.value = selectedRows[0].Id_Pembayaran;

        tablekanan = $("#tablekanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getPembayaran",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_Bayar",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Rincian_Bayar" },
                { data: "Nilai_Rincian" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_BGCek" },
                { data: "Id_Pembayaran" },
                { data: "Keterangan" },
            ],
            columnDefs: [{ targets: [5, 6], visible: false }],
        });
    });

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        myModal.show();
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_okbkk.addEventListener("click", function (event) {
        event.preventDefault();
        tabletampilBKK = $("#tabletampilBKK").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getBKK",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        month: month.value,
                        year: year.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_Bayar",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Rincian_Bayar" },
                { data: "Nilai_Rincian" },
                // { data: "Kode_Perkiraan" },
                // { data: "Id_Detail_BGCek" },
                // { data: "Id_Pembayaran" },
                // { data: "Keterangan" },
            ],
            columnDefs: [{ targets: [5, 6], visible: false }],
        });
    });
});
