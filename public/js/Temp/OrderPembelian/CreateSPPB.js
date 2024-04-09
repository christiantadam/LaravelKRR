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
let ppn_text = document.getElementById("ppn_text");
let ppn_select = document.getElementById("ppn_select");
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
console.log(loadPermohonanData);
console.log(loadHeaderData);
$("#table_CreatePurchaseOrder").DataTable({
    data: loadPermohonanData,
    columns: [
        {
            data: "No_trans",
        },
        {
            data: "Kd_brg",
        },
        {
            data: "NAMA_BRG",
        },
        {
            data: "nama_sub_kategori",
        },
        {
            data: "KET",
        },
        {
            data: "Ket_Internal",
        },
        {
            data: "Qty",
            render: function (data) {
                var stringValue = data.replace(".", "").replace(/\.?0*$/, ""); // Remove decimal point and trailing zeros
                var intValue = parseInt(stringValue, 10);
                return intValue;
            },
        },
        {
            data: "Nama_satuan",
        },
        {
            data: "QtyCancel",
        },
        {
            data: "PriceUnit",
            render: function (data) {
                var intValue = parseInt(data);
                var formattedValue = intValue.toLocaleString();
                return formattedValue;
            },
        },
        {
            data: "PriceSub",
            render: function (data) {
                var intValue = parseInt(data);
                var formattedValue = intValue.toLocaleString();
                return formattedValue;
            },
        },
        {
            data: "PPN",
            render: function (data) {
                var stringValue = data.replace(".", "").replace(/\.?0*$/, ""); // Remove decimal point and trailing zeros
                var intValue = parseInt(stringValue, 10);
                return intValue;
            },
        },
        {
            data: "PriceExt",
            render: function (data) {
                var intValue = parseInt(data);
                var formattedValue = intValue.toLocaleString();
                return formattedValue;
            },
        },
        {
            data: "Kurs",
            render: function (data) {
                var intValue = parseInt(data);
                return intValue;
            },
        },
        {
            data: "PriceUnitIDR",
            render: function (data) {
                var intValue = parseInt(data);
                var formattedValue = intValue.toLocaleString();
                return formattedValue;
            },
        },
        {
            data: "PriceSubIDR",
            render: function (data) {
                var intValue = parseInt(data);
                var formattedValue = intValue.toLocaleString();
                return formattedValue;
            },
        },
        {
            data: "PriceUnitIDR_PPN",
            render: function (data) {
                var intValue = parseInt(data);
                return intValue;
            },
        },
        {
            data: "PriceExtIDR",
            render: function (data) {
                var intValue = parseInt(data);
                var formattedValue = intValue.toLocaleString();
                return formattedValue;
            },
        },
        {
            data: "Disc",
            render: function (data) {
                var intValue = parseInt(data);
                return intValue;
            },
        },
        {
            data: "harga_disc",
            render: function (data) {
                var intValue = parseInt(data);
                return intValue;
            },
        },
        {
            data: "DiscIDR",
            render: function (data) {
                var intValue = parseInt(data);

                // Return the formatted value
                return intValue;
            },
        },
    ],
});

$("#table_AccPenjualan tbody").on("click", "tr", function () {
    alert("hehe");
});
//#endregion

//#region Input Filter

setInputFilter(
    document.getElementById("qty_order"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("kurs"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("harga_unit"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("harga_total"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("harga_subTotal"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("ppn_text"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("persen_discount"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("jumlah_discount"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("idr_unit"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("idr_subTotal"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("idr_total"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("kode_barang"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
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
    if (payment_termSelect.style.display == "none") {
        payment_termSelect.style.display = "inline-block";
        payment_termText.style.display = "none";
    } else if (payment_termText.style.display == "none") {
        payment_termText.style.display = "inline-block";
        payment_termSelect.style.display = "none";
    }
});

supplier_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (supplier_select.style.display == "none") {
        supplier_select.style.display = "inline-block";
        supplier_text.style.display = "none";
    } else if (supplier_text.style.display == "none") {
        supplier_text.style.display = "inline-block";
        supplier_select.style.display = "none";
    }
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

//#region Function

//#region
