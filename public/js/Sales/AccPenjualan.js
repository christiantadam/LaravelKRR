let closeModalButton = document.getElementById("closeModalButton");
let divisi = document.getElementById("divisi");
let form_accJualBarcode = document.getElementById("form_accJualBarcode");
let hapusButton = document.getElementById("hapusButton");
let id_transaksi = document.getElementById("id_transaksi");
let id_type = document.getElementById("id_type");
let jumlah_konversi = document.getElementById("jumlah_konversi");
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let max_do = document.getElementById("max_do");
let max_doSatuan = document.getElementById("max_doSatuan");
let min_do = document.getElementById("min_do");
let min_doSatuan = document.getElementById("min_doSatuan");
let modalContent = document.getElementById("modalContent");
let modalOverlay = document.getElementById("modalOverlay");
let nama_barang = document.getElementById("nama_barang");
let nama_customer = document.getElementById("nama_customer");
let no_sp = document.getElementById("no_sp");
let objek = document.getElementById("objek");
let pilihButton = document.getElementById("pilihButton");
let pilihSemuaButton = document.getElementById("pilihSemuaButton");
let prosesButton = document.getElementById("prosesButton");
let saldo_primer = document.getElementById("saldo_primer");
let saldo_primerDikeluarkan = document.getElementById(
    "saldo_primerDikeluarkan"
);
let saldo_primerDikeluarkanSatuan = document.getElementById(
    "saldo_primerDikeluarkanSatuan"
);
let saldo_primerSatuan = document.getElementById("saldo_primerSatuan");
let saldo_sekunder = document.getElementById("saldo_sekunder");
let saldo_sekunderDikeluarkan = document.getElementById(
    "saldo_sekunderDikeluarkan"
);
let saldo_sekunderDikeluarkanSatuan = document.getElementById(
    "saldo_sekunderDikeluarkanSatuan"
);
let saldo_sekunderSatuan = document.getElementById("saldo_sekunderSatuan");
let saldo_tritier = document.getElementById("saldo_tritier");
let saldo_tritierDikeluarkan = document.getElementById(
    "saldo_tritierDikeluarkan"
);
let saldo_tritierDikeluarkanSatuan = document.getElementById(
    "saldo_tritierDikeluarkanSatuan"
);
let saldo_tritierSatuan = document.getElementById("saldo_tritierSatuan");
let sub_kelompok = document.getElementById("sub_kelompok");
// let table_AccPenjualan = document.getElementById("table_AccPenjualan");
let tgl_mohonDO = document.getElementById("tgl_mohonDO");
//#region Set Input Filter

//#endregion

//#region Table

$("#table_AccPenjualan").DataTable({
    data: data,
    columns: [
        { data: "IdTransaksi" },
        { data: "IdType" },
        { data: "NamaType" },
        { data: "Primer" },
        { data: "Sekunder" },
        { data: "Tritier" },
        { data: "KodeBarang" },
    ],
});
$("#table_AccPenjualan tbody").on("click", "tr", function () {
    const table = $("#table_AccPenjualan").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");
    const selectedRowData = table.rows(".selected").data().toArray()[0];
    const IdTransaksi = selectedRowData.IdTransaksi;
    const IdType = selectedRowData.IdType;
    const KodeBarang = selectedRowData.KodeBarang;

    fetch("/accPenjualanTampilData/" + IdTransaksi)
        .then((response) => response.json())
        .then((data) => {
            divisi.value = data[0].NamaDivisi;
            objek.value = data[0].NamaObjek;
            kelompok_utama.value = data[0].NamaKelompokUtama;
            kelompok.value = data[0].NamaKelompok;
            sub_kelompok.value =
                data[0].IdSubKelompok + " - " + data[0].NamaSubKelompok;
            saldo_primer.value = data[0].SaldoPrimer;
            saldo_primerSatuan.value = data[0].SatuanPrimer;
            saldo_sekunder.value = data[0].SaldoSekunder;
            saldo_sekunderSatuan.value = data[0].SatuanSekunder;
            saldo_tritier.value = data[0].SaldoTritier;
            saldo_tritierSatuan.value = data[0].SatuanTritier;
            id_transaksi.value = data[0].IdTransaksi;
            id_type.value = data[0].IdType;
            nama_barang.value = data[0].NamaType;
            nama_customer.value = data[0].NamaCust;
            no_sp.value = data[0].IDSuratPesanan;

            //convert value date yyyy-MM-dd hh:mm:SS.sss into yyyy-MM-dd
            let originalDate = data[0].TglDO;
            let parts = originalDate.split(" ")[0].split("-");
            let formattedDate = parts[0] + "-" + parts[1] + "-" + parts[2];
            tgl_mohonDO.value = formattedDate;

            max_do.value = data[0].MaxKirimDO;
            max_doSatuan.value = data[0].SatuanJual;
            min_do.value = data[0].MinKirimDO;
            min_doSatuan.value = data[0].SatuanJual;
            saldo_primerDikeluarkan.value = 0;
            saldo_primerDikeluarkanSatuan.value = data[0].SatuanPrimer;
            saldo_sekunderDikeluarkan.value = 0;
            saldo_sekunderDikeluarkanSatuan.value = data[0].SatuanSekunder;
            saldo_tritierDikeluarkan.value = 0;
            saldo_tritierDikeluarkanSatuan.value = data[0].SatuanTritier;
            jumlah_konversi.value = 0;

            fetch("/accPenjualanTampilBarcode/" + IdType + "/" + KodeBarang)
                .then((response) => response.json())
                .then((data_barcode) => {
                    if (data_barcode.length === 0) {
                        alert("This barcode is empty.");
                    } else {
                        modalOverlay.style.display = "flex";
                        let data = [];
                        for (let i = 0; i < data_barcode.length; i++) {
                            data.push([
                                '<input type="checkbox">' + (i + 1),
                                data_barcode[i].Expr3,
                                data_barcode[i].Expr2,
                                data_barcode[i].Qty_Primer,
                                data_barcode[i].Qty_sekunder,
                                data_barcode[i].Qty,
                                data_barcode[i].Tgl_mutasi,
                            ]);
                        }
                        const dataTable = $(
                            "#table_AccBarcodePenjualan"
                        ).DataTable(); // Store the DataTable instance

                        // Clear and destroy the existing DataTable
                        dataTable.clear().destroy();

                        // Add the data rows
                        dataTable.rows.add(data);

                        // Redraw the DataTable
                        dataTable.draw();

                        $("#table_AccBarcodePenjualan tbody").off(
                            "click",
                            "tr"
                        );

                        $("#table_AccBarcodePenjualan tbody").on(
                            "click",
                            "tr",
                            function () {
                                let tritier = 0;
                                let sekunder = 0;
                                let primer = 0;

                                const checkbox = $(this).find(
                                    "input[type='checkbox']"
                                );
                                checkbox.prop(
                                    "checked",
                                    !checkbox.prop("checked")
                                );

                                const selectedCheckboxes = $(
                                    "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
                                );
                                const selectedRowData = [];

                                selectedCheckboxes.each(function () {
                                    const row = $(this).closest("tr");
                                    const rowData = dataTable.row(row).data();
                                    selectedRowData.push(rowData);
                                    primer += parseFloat(rowData[3]);
                                    sekunder += parseFloat(rowData[4]);
                                    tritier += parseFloat(rowData[5]);
                                });
                                saldo_primerDikeluarkan.value = primer;
                                saldo_sekunderDikeluarkan.value = sekunder;
                                saldo_tritierDikeluarkan.value = tritier;

                                if (
                                    saldo_sekunderSatuan.value == "MTR" &&
                                    max_doSatuan.value == "YARD"
                                ) {
                                    jumlah_konversi.value =
                                        (tritier / 915) * 1000;
                                    jumlah_konversi.readOnly = true;
                                }
                            }
                        );
                    }
                });
        });
});

//#endregion

//#region Load Form

tgl_mohonDO.valueAsDate = new Date();

//#endregion

//#region Add event listener

closeModalButton.addEventListener("click", function () {
    closeModal();
});
modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
});
pilihButton.addEventListener("click", function () {
    closeModal();
});
pilihSemuaButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']"
    );
    // console.log(checkboxes);
    const dataTable = $("#table_AccBarcodePenjualan").DataTable();
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;

        let tritier = 0;
        let sekunder = 0;
        let primer = 0;
        const selectedCheckboxes = $(
            "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
        );
        const selectedRowData = [];

        selectedCheckboxes.each(function () {
            const row = $(this).closest("tr");
            const rowData = dataTable.row(row).data();
            selectedRowData.push(rowData);
            primer += parseFloat(rowData[3]);
            sekunder += parseFloat(rowData[4]);
            tritier += parseFloat(rowData[5]);
        });

        saldo_primerDikeluarkan.value = primer;
        saldo_sekunderDikeluarkan.value = sekunder;
        saldo_tritierDikeluarkan.value = tritier;

        if (
            saldo_sekunderSatuan.value == "MTR" &&
            max_doSatuan.value == "YARD"
        ) {
            jumlah_konversi.value = (tritier / 915) * 1000;
            jumlah_konversi.readOnly = true;
        }
    });
    closeModal();
    prosesButton.focus();
    // console.log(checkboxes);
});

hapusButton.addEventListener("click", function () {
    const selectedCheckboxes = $(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
    );
    if (selectedCheckboxes.length > 0) {
        submitForm();
    } else {
        alert("Belum ada barcode yang dipilih");
    }
});

prosesButton.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedCheckboxes = $(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
    );
    const dataTable = $("#table_AccBarcodePenjualan").DataTable();
    const selectedRowData = [];
    let noindeks = [];

    selectedCheckboxes.each(function () {
        const row = $(this).closest("tr");
        const rowData = dataTable.row(row).data();
        selectedRowData.push(rowData);
        // console.log(selectedRowData);
    });

    for (let i = 0; i < selectedRowData.length; i++) {
        noindeks = selectedRowData[i][1];

        let noindeksInput = document.createElement("input");
        noindeksInput.type = "hidden";
        noindeksInput.name = "noindeks[]";
        noindeksInput.value = noindeks;
        form_accJualBarcode.appendChild(noindeksInput);
    }

    let kodebarang = selectedRowData[0][2];

    if (selectedCheckboxes.length < 0) {
        alert("Tolong pilih barcode dulu!");
        return; // Exit the function if a checked checkbox is not found
    }
    if (saldo_primerDikeluarkanSatuan.value == max_doSatuan.value) {
        if (
            parseFloat(saldo_primerDikeluarkan.value) <
                parseFloat(min_do.value) ||
            parseFloat(saldo_primerDikeluarkan.value) > parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Primer Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    } else if (saldo_sekunderDikeluarkanSatuan.value == max_doSatuan.value) {
        if (
            parseFloat(saldo_sekunderDikeluarkan.value) <
                parseFloat(min_do.value) ||
            parseFloat(saldo_sekunderDikeluarkan.value) >
                parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Sekunder Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    } else if (saldo_tritierDikeluarkanSatuan.value == max_doSatuan.value) {
        if (
            parseFloat(saldo_tritierDikeluarkan.value) <
                parseFloat(min_do.value) ||
            parseFloat(saldo_tritierDikeluarkan.value) >
                parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Tritier Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    }

    if (
        saldo_primerDikeluarkanSatuan.value !== max_doSatuan.value &&
        saldo_sekunderDikeluarkanSatuan.value !== max_doSatuan.value &&
        saldo_tritierDikeluarkanSatuan.value !== max_doSatuan.value
    ) {
        if (parseInt(jumlah_konversi.value) <= 0) {
            alert("Jumlah Konversi Harus Lebih Besar '0' !");
            return;
        } else if (
            parseFloat(jumlah_konversi.value) < parseFloat(min_do.value) ||
            parseFloat(jumlah_konversi.value) > parseFloat(max_do.value)
        ) {
            alert(
                "Jumlah Konversi Yang Dikeluarkan Kurang dari MinDo atau Melebihi MaxDO !"
            );
            return;
        }
    }

    /*if (
        saldo_primerDikeluarkan.value > saldo_primer.value ||
        saldo_sekunderDikeluarkan.value > saldo_sekunder.value ||
        saldo_tritierDikeluarkan.value > saldo_tritier.value
    ) {
        alert("Jumlah Barang Di Gudang Tidak Mencukupi");
        return;
    }*/

    if (
        (saldo_primerDikeluarkanSatuan.value !== "NULL" &&
            parseInt(saldo_primerDikeluarkan.value) > 0) ||
        (saldo_primerDikeluarkanSatuan.value == "NULL" &&
            parseInt(saldo_primerDikeluarkan.value) == 0)
    ) {
        if (
            (saldo_sekunderDikeluarkanSatuan.value !== "NULL" &&
                parseInt(saldo_sekunderDikeluarkan.value) > 0) ||
            (saldo_sekunderDikeluarkanSatuan.value == "NULL" &&
                parseInt(saldo_sekunderDikeluarkan.value) == 0)
        ) {
            if (
                (saldo_tritierDikeluarkanSatuan.value !== "NULL" &&
                    parseInt(saldo_tritierDikeluarkan.value) > 0) ||
                (saldo_tritierDikeluarkanSatuan.value == "NULL" &&
                    parseInt(saldo_tritierDikeluarkan.value) == 0)
            ) {
                let kodebarangInput = document.createElement("input");
                kodebarangInput.type = "hidden";
                kodebarangInput.name = "kodebarang";
                kodebarangInput.value = kodebarang;
                form_accJualBarcode.appendChild(kodebarangInput);

                let jumlahdicentangInput = document.createElement("input");
                jumlahdicentangInput.type = "hidden";
                jumlahdicentangInput.name = "jumlahDicentang";
                jumlahdicentangInput.value = selectedCheckboxes.length;
                form_accJualBarcode.appendChild(jumlahdicentangInput);

                form_accJualBarcode.submit();
            }
        }
    }
});

//#endregion

//#region Function

function closeModal() {
    modalOverlay.style.display = "none";
}

function submitForm() {
    // Get the values you need for the form submission
    const selectedCheckboxes = $(
        "#table_AccBarcodePenjualan tbody input[type='checkbox']:checked"
    );
    const dataTable = $("#table_AccBarcodePenjualan").DataTable();
    const selectedRowData = [];
    let noindeks = [];

    selectedCheckboxes.each(function () {
        const row = $(this).closest("tr");
        const rowData = dataTable.row(row).data();
        selectedRowData.push(rowData);
        // console.log(selectedRowData);
    });

    for (let i = 0; i < selectedRowData.length; i++) {
        noindeks.push(selectedRowData[i][1]);
    }
    let kodebarang = selectedRowData[0][2];

    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // Create a form element dynamically
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "/AccPenjualan/" + kodebarang;

    // Create hidden input fields for the parameters
    let kodebarangInput = document.createElement("input");
    kodebarangInput.type = "hidden";
    kodebarangInput.name = "kodebarang";
    kodebarangInput.value = kodebarang;
    form.appendChild(kodebarangInput);

    let noindeksInput = document.createElement("input");
    noindeksInput.type = "hidden";
    noindeksInput.name = "noindeks";
    noindeksInput.value = noindeks;
    form.appendChild(noindeksInput);

    // Create CSRF token input field
    let csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token";
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
}

//#endregion
