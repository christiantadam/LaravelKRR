$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_proses = document.getElementById("btn_proses");
    let tanggal = document.getElementById("tanggal");
    let tanggal2 = document.getElementById("tanggal2");
    let noFaktur = document.getElementById("noFaktur");
    let totalPenagihan = document.getElementById("totalPenagihan");
    let totalPembayaran = document.getElementById("totalPembayaran");
    let notaKredit = document.getElementById("notaKredit");
    let sisaTagihan = document.getElementById("sisaTagihan");
    let lunas = document.getElementById("lunas");
    let idBKM = document.getElementById("idBKM");
    // let table_atas = $("#table_atas").DataTable({
    // });

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
    tanggal.valueAsDate = firstDayOfMonth;
    tanggal2.valueAsDate = new Date();

    let = table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "AnalisaStatusPelunasan/displayData",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    tanggal: tanggal.value,
                    tanggal2: tanggal2.value,
                });
            },
        },
        columns: [
            {
                data: "Tgl_Pelunasan",
                // render: function (data) {
                //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                // },
            },
            { data: "NamaCust" },
            { data: "Id_Penagihan" },
            { data: "Jenis_Pembayaran" },
            { data: "NilaiPelunasan" },
            { data: "Nilai_Penagihan" },
            { data: "Terbayar" },
            { data: "Lunas" },
            { data: "Id_BKM" },
        ],
        // columnDefs: [{ targets: [5], visible: false }],
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "AnalisaStatusPelunasan/displayData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                        tanggal2: tanggal2.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Pelunasan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "NamaCust" },
                { data: "Id_Penagihan" },
                { data: "Jenis_Pembayaran" },
                { data: "NilaiPelunasan" },
                { data: "Nilai_Penagihan" },
                { data: "Terbayar" },
                { data: "Lunas" },
                { data: "Id_BKM" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        noFaktur.value = data.Id_Penagihan;
        totalPenagihan.value = data.Nilai_Penagihan;
        totalPembayaran.value = data.Terbayar;
    });
});
