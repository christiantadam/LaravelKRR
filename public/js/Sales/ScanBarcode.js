let kode_barcode = document.getElementById("kode_barcode");
let div_tableBarcodeDetail = document.getElementById("div_tableBarcodeDetail");
let div_tableBarcodeData = document.getElementById("div_tableBarcodeData");
let jumlah = document.getElementById("jumlah");
let tanggal_input = document.getElementById("tanggal_input");

//#region Load Form

div_tableBarcodeDetail.style.display = "none";
tanggal_input.valueAsDate = new Date(2023, 3, 20);
kode_barcode.focus();
$(document).ready(function () {
    $("#table_dataBarcode").DataTable();
});

let table = $("#table_dataBarcode").DataTable({
    data: data_kodeBarang,
    columns: [
        { data: null },
        { data: "NamaType" },
        { data: "IdType" },
        { data: "Kode_barang" },
        { data: "Qty_Primer" },
        { data: "Qty_Sekunder" },
        { data: "Qty" },
        { data: "Tgl_mutasi" },
    ],
    columnDefs: [
        {
            searchable: false,
            orderable: false,
            targets: 0,
            render: function (data, type, row, meta) {
                return meta.row + 1;
            },
        },
    ],
});

table.draw();

table.draw();
//#endregion

//#region Add Event Listener

kode_barcode.addEventListener("keypress", function(event){
    if (event.key == "Enter") {
        event.preventDefault();
        if (kode_barcode.value == "") {
            alert("Isi kode barcode lebih dulu!");
            kode_barcode.focus();
        } else {
            let kode_barcodeParts = kode_barcode.split(' - ');
            let kodeBarang = kode_barcodeParts[1];
            let nomorindeks = kode_barcodeParts[0];
            console.log(kodeBarang);
            console.log(nomorindeks);
            fetch("/scanBarcodeCekTmpGudang/" + kodeBarang + "/" + nomorindeks)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const tbody = document.querySelector(
                        "#table_Barcode tbody"
                    );
                    const rows = data.map((item) => {
                        return [
                            item.Tgl_Mutasi.trim(),
                            item.NoIndeks.trim(),
                            item.Kode_barang.trim(),
                            item.IdType.trim(),
                            item.IdDivisi.trim(),
                        ];
                    });

                    const table = $("#table_Barcode").DataTable();
                    table.clear();
                    table.rows.add(rows);
                    table.draw();
                    $("#table_Barcode tbody").on("click", "tr", function () {
                        const table = $("#table_Barcode").DataTable();
                        $(this).toggleClass("selected");
                        selectedRows = table.rows(".selected").data().toArray();
                    });
                });
        }
    }
});

//#endregion
