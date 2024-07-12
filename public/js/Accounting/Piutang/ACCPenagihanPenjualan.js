let tabelListHeader = document.getElementById('tabelListHeader');
let idPenagihan = document.getElementById('idPenagihan');
let fakturPajak = document.getElementById('fakturPajak');
let idMataUang = document.getElementById('idMataUang');
let id_Penagihan = document.getElementById('id_Penagihan');
let tabelDisplayDetail = document.getElementById('tabelDisplayDetail');

let jenisCustomer = document.getElementById('jenisCustomer');
let namaNPWP = document.getElementById('namaNPWP');
let kurs = document.getElementById('kurs');
let idCustomer = document.getElementById('idCustomer');
let nilaiTagihan = document.getElementById('nilaiTagihan');
let YNomor;
let surat;
let adaSJ = false;
let adaSP = false;

let btnProses = document.getElementById('btnProses');
let formkoreksi = document.getElementById('formkoreksi');


fetch("/getDisplayHeader/")
.then((response) => response.json())
.then((options) => {
    console.log(options);

    tabelListHeader = $("#tabelListHeader").DataTable({
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
            { title: "Kurs", data: "NilaiKurs" },
            { title: "Nama NPWP", data: "NamaNPWP" },
            { title: "Jenis Customer", data: "JnsCust" },
            { title: "Id. Faktur Pajak", data: "IdFakturPajak" },
            { title: "Jenis PPN", data: "Nama_Jns_PPN" },
        ]
    });
});

    $("#tabelListHeader tbody").off("click", "tr");
    $("#tabelListHeader tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelListHeader tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelListHeader").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);

        idPenagihan.value = selectedRows[0].Id_Penagihan;
        fakturPajak.value = selectedRows[0].IdFakturPajak;
        idMataUang.value = selectedRows[0].Id_MataUang;
        jenisCustomer.value = selectedRows[0].JnsCust;
        namaNPWP.value = selectedRows[0].NamaNPWP;
        idCustomer.value = selectedRows[0].Id_Customer;
        nilaiTagihan.value = selectedRows[0].Nilai_Penagihan;
        kurs.value = selectedRows[0].NilaiKurs;

        id_Penagihan.value = idPenagihan.value.replace(/\//g, '.');

        fetch("/getDisplayDetail/" + id_Penagihan.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            surat = options[0].Tgl_Surat_jalan;
            // let sp = options[0].Surat_Jalan;

            tabelDisplayDetail = $("#tabelDisplayDetail").DataTable({
                data: options,
                columns: [
                    { title: "Surat Jalan", data: "Surat_Jalan" },
                    { title: "Tanggal Terima Barang", data: "Tgl_Surat_jalan" }
                ]
            });
        });
    });


btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    if (jenisCustomer.value == "PNX" || jenisCustomer.value == "PWX") {
        if(namaNPWP.value == "") {
            alert('Data Tidak dapat di-ACC, Isi dulu Nama dan Alamat NPWPnya !')
        }
    };

    //formkoreksi.submit();

    DisplaySuratJalan();

    fetch("/accCheckCtkSJ/" + id_Penagihan.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        if (options[0].Ada > 0) {
            adaSJ = true;
        };
    });

    fetch("/accCheckCtkSP/" + id_Penagihan.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        if (options[0].Ada > 0) {
            adaSP = true;
        };
    });

    // if (adaSP == true) {

    // }

});

function DisplaySuratJalan() {
    YNomor = "";
    fetch("/getDisplaySuratJalan/" + id_Penagihan.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        if (YNomor != "") {
            YNomor + ", ";
            YNomor = YNomor + surat.toString();
        }
    });
}
