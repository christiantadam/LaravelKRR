$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let idPenagihan = document.getElementById("idPenagihan");
    let fakturPajak = document.getElementById("fakturPajak");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [0], visible: false }],
    });

    table_atas = $("#table_atas").DataTable({
        responsive: false,
        processing: true,
        serverSide: true,
        destroy: true,
        scrollX: true,
        // width: "150%",
        ajax: {
            url: "ACCPenagihanPenjualan/getPenagihan",
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
                data: "Tgl_Penagihan",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NamaCust" },
            { data: "PO" },
            { data: "Nilai_Penagihan" },
            { data: "Nama_MataUang" },
            { data: "Id_Customer" },
            { data: "Id_MataUang" },
            { data: "NilaiKurs" },
            { data: "NamaNPWP" },
            { data: "JnsCust" },
            { data: "IdFakturPajak" },
            { data: "Nama_Jns_PPN" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        idPenagihan.value = data.Id_Penagihan;
        fakturPajak.value = data.IdFakturPajak;

        table_bawah = $("#table_bawah").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "ACCPenagihanPenjualan/getDetailPenagihan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        ID_Penagihan: data.Id_Penagihan,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Surat_jalan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Surat_Jalan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });

    let rowDataArray = [];
    let rowDataPertama;

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                .not(this)
                .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                // rowDataArray.push(rowDataPertama);
                rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Penagihan !== rowDataPertama.Id_Penagihan
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );


});
