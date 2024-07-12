let tabelPenagihanPenjualanEx = document.getElementById('tabelPenagihanPenjualanEx');
let idPenagihan = document.getElementById('idPenagihan');
let id_Penagihan = document.getElementById('id_Penagihan');
let tabelDetailPenjualanEx = document.getElementById('tabelDetailPenjualanEx');
let btnProses = document.getElementById('btnProses');

//HIDDEN
let idCustomer = document.getElementById('idCustomer');
let idMataUang = document.getElementById('idMataUang');
let debet = document.getElementById('debet');
let kurs = document.getElementById('kurs');

let methodkoreksi = document.getElementById('methodkoreksi');
let formkoreksi = document.getElementById('formkoreksi');

fetch("/getTabelPenagihanEx/")
.then((response) => response.json())
.then((options) => {
    console.log(options);

    tabelPenagihanPenjualanEx = $("#tabelPenagihanPenjualanEx").DataTable({
        data: options,
        columns: [
            { title: "Tanggal", data: "Tgl_Penagihan" },
            { title: "Id. Penagihan", data: "Id_Penagihan" },
            { title: "Customer", data: "NamaCust" },
            { title: "PO", data: "PO" },
            { title: "Nilai Tagihan", data: "Nilai_Penagihan" },
            { title: "Mata Uang", data: "Nama_MataUang" },
            { title: "Id. Customer", data: "Id_Customer" },
            { title: "Id. Mata Uang", data: "Id_MataUang" },
            { title: "Kurs", data: "NilaiKurs" }
        ]
    });

    $("#tabelPenagihanPenjualanEx tbody").off("click", "tr");
    $("#tabelPenagihanPenjualanEx tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelPenagihanPenjualanEx tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelPenagihanPenjualanEx").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);

        idPenagihan.value = selectedRows[0].Id_Penagihan;

        id_Penagihan.value = idPenagihan.value.replace(/\//g, '.');

        idCustomer.value = selectedRows[0].Id_Customer;
        idMataUang.value = selectedRows[0].Id_MataUang;
        debet.value = selectedRows[0].Nilai_Penagihan;
        kurs.value = selectedRows[0].NilaiKurs;

        fetch("/getDetailPenagihanEx/" + id_Penagihan.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            tabelDetailPenjualanEx = $("#tabelDetailPenjualanEx").DataTable({
                data: options,
                columns: [
                    { title: "Surat Jalan", data: "Surat_Jalan" },
                    { title: "Tanggal Terima Barang", data: "Tgl_Surat_jalan" }
                ]
            });

            });
    })
});

$("#checkbox2").change(function () {
    const table = $("#tabelPenagihanPenjualanEx").DataTable();
    if (this.checked) {
        // Centang kotak centang pada setiap baris dan tambahkan kelas "selected"
        table.rows().every(function () {
            const rowNode = this.node();
            $(rowNode).addClass("selected");
            $("td:first-child", rowNode).find('input[type="checkbox"]').prop("checked", true);
        });
    } else {
        // Hapus centang kotak centang pada setiap baris dan hapus kelas "selected"
        table.rows().every(function () {
            const rowNode = this.node();
            $(rowNode).removeClass("selected");
            $("td:first-child", rowNode).find('input[type="checkbox"]').prop("checked", false);
        });
    }
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    methodkoreksi.value="PUT";
    formkoreksi.action = "/ACCPenagihanPenjualanExport/" + id_Penagihan.value;
    formkoreksi.submit();
})
