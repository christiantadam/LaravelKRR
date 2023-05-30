let alasan_reject = document.getElementById("alasan_reject");
let div_tablePO = document.getElementById("div_tablePO");
let harga_subTotal = document.getElementById("harga_subTotal");
let harga_total = document.getElementById("harga_total");
let harga_unit = document.getElementById("harga_unit");
let idr_ppn = document.getElementById("idr_ppn");
let idr_subTotal = document.getElementById("idr_subTotal");
let idr_total = document.getElementById("idr_total");
let idr_unit = document.getElementById("idr_unit");
let jumlah_discount = document.getElementById("jumlah_discount");
let keterangan_internal = document.getElementById("keterangan_internal");
let keterangan_order = document.getElementById("keterangan_order");
let kode_barang = document.getElementById("kode_barang");
let kurs = document.getElementById("kurs");
let mata_uang = document.getElementById("mata_uang");
let mata_uangButton = document.getElementById("mata_uangButton");
let mata_uangSelect = document.getElementById("mata_uangSelect");
let mata_uangText = document.getElementById("mata_uangText");
let nama_barang = document.getElementById("nama_barang");
let nomor_order = document.getElementById("nomor_order");
let nomor_purchaseOrder = document.getElementById("nomor_purchaseOrder");
let payment_term = document.getElementById("payment_term");
let payment_termButton = document.getElementById("payment_termButton");
let payment_termSelect = document.getElementById("payment_termSelect");
let payment_termText = document.getElementById("payment_termText");
let persen_discount = document.getElementById("persen_discount");
let post_poButton = document.getElementById("post_poButton");
let ppn = document.getElementById("ppn");
let qty_delay = document.getElementById("qty_delay");
let qty_order = document.getElementById("qty_order");
let reject_button = document.getElementById("reject_button");
let remove_button = document.getElementById("remove_button");
let sub_kategori = document.getElementById("sub_kategori");
let supplier_button = document.getElementById("supplier_button");
let supplier_select = document.getElementById("supplier_select");
let supplier_text = document.getElementById("supplier_text");
let table_CreatePurchaseOrder = document.getElementById(
    "table_CreatePurchaseOrder"
);
let tanggal_mohonKirim = document.getElementById("tanggal_mohonKirim");
let tanggal_purchaseOrder = document.getElementById("tanggal_purchaseOrder");
let update_button = document.getElementById("update_button");

//#region Form Load

tanggal_purchaseOrder.valueAsDate = new Date();
tanggal_mohonKirim.valueAsDate = new Date();

//#endregion

//#region Input Filter

setInputFilter(
    document.getElementById("idr_ppn"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion

//#region Event Listener

mata_uangButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (mata_uangSelect.style.display == "none") {
        mata_uangSelect.style.display = "inline-block";
        mata_uangText.style.display = "none";
    } else if (mata_uangText.style.display == "none") {
        mata_uangText.style.display = "inline-block";
        mata_uangSelect.style.display = "none";
    }
});

payment_termButton.addEventListener("click", function (event) {
    event.preventDefault();
});

supplier_button.addEventListener("click", function (event) {
    event.preventDefault();
});

update_button.addEventListener("click", function (event) {
    event.preventDefault();
});

reject_button.addEventListener("click", function (event) {
    event.preventDefault();
});

remove_button.addEventListener("click", function (event) {
    event.preventDefault();
});

post_poButton.addEventListener("click", function (event) {
    event.preventDefault();
});
//#endregion
