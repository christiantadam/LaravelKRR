let tabelatas = $("#tabelatas").DataTable();
let tabelbawah = $("#tabelbawah").DataTable();
let idNotaKredit = document.getElementById('idNotaKredit');
let idCustomer = document.getElementById('idCustomer');
let idMataUang = document.getElementById('idMataUang');
let kredit = document.getElementById('kredit');
let kurs = document.getElementById('kurs');
let statusP = document.getElementById('statusP');
let idnotakredit = document.getElementById('idnotakredit');

let btnProses = document.getElementById('btnProses');
let formkoreksi = document.getElementById('formkoreksi');



fetch("ACCNotaKredit/getTabelHeaderACCNotaKredit/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        tabelatas = $("#tabelatas").DataTable({
            destroy: true,
            data: options,
            columns: [
                { title: "Jenis Nota", data: "NamaNotaKredit" },
                { title: "Tanggal", data: "Tanggal" },
                { title: "Customer", data: "NamaCust" },
                { title: "Nota Kredit", data: "Id_NotaKredit" },
                { title: "No. Penagihan", data: "Id_Penagihan" },
                { title: "Nilai Retur", data: "Nilai" },
                { title: "Mata Uang", data: "Nama_MataUang" },
                { title: "Id Customer", data: "Id_Customer" },
                { title: "Id Mata Uang", data: "Id_MataUang" },
                { title: "Nilai Kurs", data: "NilaiKurs" },
                { title: "Status Pelunasan", data: "Status_Pelunasan" },
            ]
        });
});

$("#tabelatas tbody").off("click", "tr");
    $("#tabelatas tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelatas tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelatas").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);
        idNotaKredit.value = selectedRows[0].Id_NotaKredit;
        idCustomer.value = selectedRows[0].Id_Customer;
        idMataUang.value = selectedRows[0].Id_MataUang;
        kredit.value = selectedRows[0].Nilai;
        kurs.value = selectedRows[0].NilaiKurs;
        statusP.value = selectedRows[0].Status_Pelunasan;

        idnotakredit.value = idNotaKredit.value.replace(/\//g, '.');

        fetch("/getDetailHeaderACCNotaKredit/" + idnotakredit.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options[0].IdRetur != null) {
                tabelbawah = $("#tabelbawah").DataTable({
                    destroy: true,
                    data: options,
                    columns: [
                        { title: "Surat Jalan", data: "SuratJalan" },
                        { title: "No. Retur", defaultContent: "" },
                        { title: "Qty", data: "QtyBrg" },
                        { title: "Harga", data: "HargaSP" },
                        { title: "Satuan", defaultContent: "" },
                        { title: "Harga Baru", data: "HargaPot" }
                    ]
                });
            } else {
                fetch("/getDetailHeaderACCNotaKredit2/" + idNotaKredit.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);

                    tabelbawah = $("#tabelbawah").DataTable({
                        destroy: true,
                        data: options,
                        columns: [
                            { title: "Surat Jalan", data: "SuratJalan" },
                            { title: "No. Retur", data: "IdRetur" },
                            { title: "Qty", data: "QtyKonversi" },
                            { title: "Harga", data: "HargaSatuan" },
                            { title: "Satuan", data: "SatuanJual" },
                            { title: "Harga Baru", defaultContent: "" }
                        ]
                    });
                })

            }
        })
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    $.ajax({
        url: "ACCNotaKredit",
        method: "POST",
        data: new FormData(formkoreksi),
        dataType: "JSON",
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
            alert(response);
        },
    });

    fetch("/getTabelHeaderACCNotaKredit/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        tabelatas = $("#tabelatas").DataTable({
            destroy: true,
            data: options,
            columns: [
                { title: "Jenis Nota", data: "NamaNotaKredit" },
                { title: "Tanggal", data: "Tanggal" },
                { title: "Customer", data: "NamaCust" },
                { title: "Nota Kredit", data: "Id_NotaKredit" },
                { title: "No. Penagihan", data: "Id_Penagihan" },
                { title: "Nilai Retur", data: "Nilai" },
                { title: "Mata Uang", data: "Nama_MataUang" },
                { title: "Id Customer", data: "Id_Customer" },
                { title: "Id Mata Uang", data: "Id_MataUang" },
                { title: "Nilai Kurs", data: "NilaiKurs" },
                { title: "Status Pelunasan", data: "Status_Pelunasan" },
            ]
        });
});
})
