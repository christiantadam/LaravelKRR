let tabelSuratJalan = document.getElementById('tabelSuratJalan');
let btnProses = document.getElementById('btnProses');

let idPenagihan = document.getElementById('idPenagihan');
let suratJalan = document.getElementById('suratJalan');
let idCustomer = document.getElementById('idCustomer');
let jatuhTempo = document.getElementById('jatuhTempo');
let suratPesanan = document.getElementById('suratPesanan');

let dataTable;
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

fetch("/getTabelSuratJalan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        dataTable = $("#tabelSuratJalan").DataTable({
            data: options,
            columns: [
                {
                    title: "Id. Penagihan", data: "Id_Penagihan"
                },
                { title: "Id. Pengiriman", data: "IDPengiriman" },
                { title: "Tgl.Jual", data: "Tgl_Penagihan" },
                { title: "Customer", data: "NamaCust" },
                { title: "Nilai Jual", data: "Nilai_Penagihan" },
                { title: "Mata Uang", data: "Nama_MataUang" },
                { title: "Id. Customer", data: "IDCust"},
                { title: "Tgl. Diterima", data: "TanggalDiterima"},
                { title: "Jlh. Diterima Umum", data: "JmlTerimaUmum"}
            ],
        });
});

$("#tabelSuratJalan tbody").off("click", "tr");
$("#tabelSuratJalan tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelSuratJalan tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelSuratJalan").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    idPenagihan.value = selectedRows[0].Id_Penagihan;
    suratJalan.value = selectedRows[0].IDPengiriman;
    jatuhTempo.value = selectedRows[0].TanggalDiterima;
    idCustomer.value = selectedRows[0].IDCust;
    // suratPesanan.value = selectedRows[0].Keterangan;

    btnProses.disabled = false;
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    formkoreksi.submit();
})
