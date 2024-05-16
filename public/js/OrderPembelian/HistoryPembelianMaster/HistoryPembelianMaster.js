let redisplay = document.getElementById("redisplay");
let formDaftarHarga = document.getElementById("formDaftarHarga");
let tabelData = $("#tabelData").DataTable();
let kdbarang = document.getElementById("search_kode_barang");
let search_kode_barang = document.getElementById("search_kode_barang");
let search_nama_barang = document.getElementById("search_nama_barang");
let search_supplier = document.getElementById("search_supplier");
let search_user = document.getElementById("search_user");
let rbkode_barang = document.getElementById("rbkode_barang");
let rbnama_barang = document.getElementById("rbnama_barang");
let rbsupplier = document.getElementById("rbsupplier");
let rbuser = document.getElementById("rbuser");
let clickEvent = new Event("click");

let kdBarangAslinya;
redisplay.disabled = true;

formDaftarHarga.addEventListener("change", function (event) {
    redisplay.disabled = !radioButtonIsSelected();
});

search_kode_barang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        rbkode_barang.checked = true;
        redisplay.dispatchEvent(clickEvent);
    }
});
search_nama_barang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        rbnama_barang.checked = true;
        redisplay.dispatchEvent(clickEvent);
    }
});
search_supplier.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        rbsupplier.checked = true;
        redisplay.dispatchEvent(clickEvent);
    }
});
search_user.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        rbuser.checked = true;
        redisplay.dispatchEvent(clickEvent);
    }
});

redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedInputValue();
        if (radioButtonChecked === "kode_barang") {
            $("#tabelData").DataTable().clear().destroy();
            redisplayData(null, null, null, value);
            kdbarang.value = kdBarangAslinya;
        } else if (radioButtonChecked === "nama_barang") {
            $("#tabelData").DataTable().clear().destroy();
            redisplayData(value, null, null, null);
        } else if (radioButtonChecked === "supplier") {
            $("#tabelData").DataTable().clear().destroy();
            redisplayData(null, null, value, null);
        } else if (radioButtonChecked === "user") {
            $("#tabelData").DataTable().clear().destroy();
            redisplayData(null, value, null, null);
        }
    } else {
        alert("Silahkan Form Dahulu");
    }
});

function radioButtonIsSelected() {
    let radioButtons = document.getElementsByName("opsi");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return false;
}

function getSelectedInputValue() {
    let radioButtons = document.getElementsByName("opsi");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            let inputText = document.getElementsByName(
                "search_" + radioButtons[i].value
            )[0];
            return inputText.value.trim();
        }
    }
    return false;
}

function redisplayData(nm_brg, req, sup, kdbrg) {
    if (kdbrg != null) {
        while (kdbrg.length < 9) {
            kdbrg = "0" + kdbrg;
        }

        kdBarangAslinya = kdbrg;
    }
    $("#tabelData").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        scrollX: true,
        scrollY: "500px",
        order: [2, "desc"],
        lengthChange: false,
        pageLength: 100,
        ajax: {
            url: "/HistoryPembelianMasterRedisplay",
            type: "GET",
            data: function (data) {
                (data.nm_brg = nm_brg),
                    (data.req = req),
                    (data.sup = sup),
                    (data.kdbrg = kdbrg);
            },
        },
        columns: [
            { data: "No_trans" },
            { data: "Status" },
            {
                data: "Tgl_order",
                width: "100px",
                render: function (data) {
                    let parts = data.split(" ")[0].split("-");
                    let tgl = parts[1] + "-" + parts[2] + "-" + parts[0];
                    return tgl;
                },
            },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            {
                data: "Hrg_trm",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            { data: "Nama_satuan" },
            { data: "NM_SUP" },
            { data: "Nama" },
            { data: "NM_DIV" },
            { data: "nama_sub_kategori" },
            {
                data: "StatusBeli",
                render: function name(data) {
                    if (data == 0) {
                        return "Beli Sendiri";
                    } else {
                        return "Pengadaan Pembelian";
                    }
                },
            },
            { data: "Qty" },
        ],
    });
}
