let redisplay = document.getElementById("redisplay");
let formDaftarHarga = document.getElementById("formDaftarHarga");
let tabelData = document.getElementById("tabelData");
let kdbarang = document.getElementById("search_kode_barang");

let kdBarangAslinya;
tabelData.style.display = "none";
redisplay.disabled = true;
formDaftarHarga.addEventListener("change", function (event) {
    redisplay.disabled = !radioButtonIsSelected();
    redisplay.focus();
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
    tabelData.style.display = "block";
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
        ajax: {
            url: "/DaftarHargaRedisplay",
            type: "GET",
            data: function (data) {
                (data.nm_brg = nm_brg),
                    (data.req = req),
                    (data.sup = sup),
                    (data.kdbrg = kdbrg);
            },
        },
        columns: [
            { data: "Kd_div" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "Nama_satuan" },
            { data: "NM_SUP" },
            { data: "KOTA1" },
            { data: "NEGARA1" },
            { data: "Hrg_trm" },
            { data: "Id_MataUang_BC" },
            { data: "Nama" },
            {
                data: "Tgl_order",
                render: function (data, type, row) {
                    let parts = data.split(" ")[0].split("-");
                    console.log(parts);

                    let tgl = parts[1] + "-" + parts[2] + "-" + parts[0];
                    return tgl + ' ' + data.split(" ")[1];
                },
            },
        ],
    });
}
