let add_button = document.getElementById("add_button");
let berat_indexInner = document.getElementById("berat_indexInner");
let berat_indexKarung = document.getElementById("berat_indexKarung");
let berat_indexKertas = document.getElementById("berat_indexKertas");
let berat_indexLami = document.getElementById("berat_indexLami");
let berat_inner = document.getElementById("berat_inner");
let berat_innerMeter = document.getElementById("berat_innerMeter");
let berat_karung = document.getElementById("berat_karung");
let berat_karungMeter = document.getElementById("berat_karungMeter");
let berat_kertas = document.getElementById("berat_kertas");
let berat_kertasMeter = document.getElementById("berat_kertasMeter");
let berat_lami = document.getElementById("berat_lami");
let berat_lamiMeter = document.getElementById("berat_lamiMeter");
let berat_standardMeter = document.getElementById("berat_standardMeter");
let berat_standardTotal = document.getElementById("berat_standardTotal");
let berat_standardTotalMeter = document.getElementById(
    "berat_standardTotalMeter"
);
let biaya_lain = document.getElementById("biaya_lain");
let delete_button = document.getElementById("delete_button");
let div_beratStandard = document.getElementById("div_beratStandard");
let div_detailSuratPesanan = document.getElementById("div_detailSuratPesanan");
let div_headerSuratPesanan = document.getElementById("div_headerSuratPesanan");
let div_tabelSuratPesanan = document.getElementById("div_tabelSuratPesanan");
let edit_button = document.getElementById("edit_button");
let enter_kodeBarang = document.getElementById("enter_kodeBarang");
let faktur_pjkBiasa = document.getElementById("faktur_pjkBiasa");
let faktur_pjkSederhana = document.getElementById("faktur_pjkSederhana");
let form_suratPesanan = document.getElementById("form_suratPesanan");
let hapus_button = document.getElementById("hapus_button");
let harga_satuan = document.getElementById("harga_satuan");
let index_inner = document.getElementById("index_inner");
let index_karung = document.getElementById("index_karung");
let index_kertas = document.getElementById("index_kertas");
let index_lami = document.getElementById("index_lami");
let isi_button = document.getElementById("isi_button");
let jenis_bayar = document.getElementById("jenis_bayar");
let jenis_brg = document.getElementById("jenis_brg");
let jenis_sp = document.getElementById("jenis_sp");
let kategori = document.getElementById("kategori");
let kategori_utama = document.getElementById("kategori_utama");
let keterangan = document.getElementById("keterangan");
let kode_barang = document.getElementById("kode_barang");
let list_customer = document.getElementById("list_customer");
let list_noSP = document.getElementById("list_noSP");
let list_sales = document.getElementById("list_sales");
let list_view = $("#list_view").DataTable();
let mata_uang = document.getElementById("mata_uang");
let nama_barang = document.getElementById("nama_barang");
let no_pi = document.getElementById("no_pi");
let no_po = document.getElementById("no_po");
let no_spSelect = document.getElementById("no_spSelect");
let no_spText = document.getElementById("no_spText");
let ppn = document.getElementById("ppn");
let proses = 0;
let qty_pesan = document.getElementById("qty_pesan");
let rencana_kirim = document.getElementById("rencana_kirim");
let satuan_jual = document.getElementById("satuan_jual");
let satuan_primer = document.getElementById("satuan_primer");
let satuan_sekunder = document.getElementById("satuan_sekunder");
let satuan_tritier = document.getElementById("satuan_tritier");
let sub_kategori = document.getElementById("sub_kategori");
let syarat_bayar = document.getElementById("syarat_bayar");
let tgl_pesan = document.getElementById("tgl_pesan");
let tgl_po = document.getElementById("tgl_po");
let total_cost = document.getElementById("total_cost");
let update_button = document.getElementById("update_button");

//#region Load Form

setInputFilter(
    document.getElementById("qty_pesan"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("harga_satuan"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("syarat_bayar"),
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
    document.getElementById("berat_karung"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("berat_inner"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("berat_lami"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("berat_kertas"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);

tgl_pesan.valueAsDate = new Date();
tgl_po.valueAsDate = new Date();
rencana_kirim.valueAsDate = new Date();
isi_button.focus();
div_headerSuratPesanan.classList.toggle("disabled");
div_tabelSuratPesanan.classList.toggle("disabled");
div_detailSuratPesanan.classList.toggle("disabled");
div_beratStandard.classList.toggle("disabled");

//#endregion

//#region enter-enter

no_po.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        tgl_po.focus();
    }
});

tgl_po.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        no_pi.focus();
    }
});

no_pi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        list_sales.focus();
    }
});

mata_uang.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jenis_bayar.focus();
    }
});

syarat_bayar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        faktur_pjkBiasa.focus();
    }
});

faktur_pjkBiasa.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        keterangan.focus();
    }
});

faktur_pjkSederhana.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        keterangan.focus();
    }
});

keterangan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jenis_brg.focus();
    }
});

qty_pesan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        harga_satuan.focus();
    }
});

harga_satuan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        satuan_jual.focus();
    }
});

satuan_jual.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        rencana_kirim.focus();
    }
});

rencana_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_karung.focus();
    }
});

berat_karung.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_inner.focus();
    }
});

berat_inner.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_lami.focus();
    }
});

berat_lami.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_kertas.focus();
    }
});

berat_kertas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_karung.focus();
    }
});

index_karung.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_inner.focus();
    }
});

index_inner.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_lami.focus();
    }
});

index_lami.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_kertas.focus();
    }
});

index_kertas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        biaya_lain.focus();
    }
});

berat_indexKarung.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_indexInner.focus();
    }
});

berat_indexInner.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_indexLami.focus();
    }
});

berat_indexLami.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_indexKertas.focus();
    }
});

berat_indexKertas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        biaya_lain.focus();
    }
});

biaya_lain.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.focus();
    }
});

tgl_pesan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jenis_sp.focus();
    }
});

tgl_po.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        no_pi.focus();
    }
});

jenis_sp.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        list_customer.focus();
    }
});

list_customer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        no_po.focus();
    }
});

list_sales.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mata_uang.focus();
    }
});

jenis_bayar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        syarat_bayar.focus();
    }
});

//#endregion

//#region Add Event Listener

isi_button.addEventListener("click", function (event) {
    // console.log(proses);
    event.preventDefault();

    if (proses == 0) {
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        div_headerSuratPesanan.classList.toggle("disabled");
        // enableElements();
        proses = 1;
        this.innerHTML = "Proses";
        edit_button.innerHTML = "Batal";
        hapus_button.style.display = "none";
        mata_uang.value = "IDR";
        tgl_pesan.focus();
    } else if (proses == 1) {
        //isi
        form_suratPesanan.submit();
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        div_headerSuratPesanan.classList.toggle("disabled");
        // disableElements();
        proses = 0;
        this.innerHTML = "Isi";
        edit_button.innerHTML = "Koreksi";
        hapus_button.style.display = "block";
    } else if (proses == 2) {
        //edit
        form_suratPesanan.action = "/SuratPesanan/" + no_spText.value + "/up";
        form_suratPesanan.submit();

        funcClearHeaderPesanan();
        funcClearInputBarang();
        const table = document.getElementById("list_view");
        for (let i = 1; i < table.rows.length; i++) {
            table.deleteRow(i);
        }
        div_headerSuratPesanan.classList.toggle("disabled");
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        // disableElements();
        proses = 0;
        edit_button.innerHTML = "Koreksi";
        this.innerHTML = "Isi";
        hapus_button.style.display = "block";
    } else if (proses == 3) {
        //delete
        form_suratPesanan.action = "/SuratPesanan/" + no_spText.value;
        form_suratPesanan.submit();
        div_headerSuratPesanan.classList.toggle("disabled");
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        // disableElements();
        proses = 0;
        edit_button.innerHTML = "Koreksi";
        this.innerHTML = "Isi";
        hapus_button.style.display = "block";
    }
});

edit_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        // enableElements();
        div_headerSuratPesanan.classList.toggle("disabled");
        proses = 2;
        this.innerHTML = "Batal";
        isi_button.innerHTML = "Proses";
        hapus_button.style.display = "none";
        mata_uang.value = "IDR";
        list_noSP.disabled = false;

        //harus isi Nomor SP dulu!
        no_spText.focus();
        no_spText.readOnly = false;
        funcHeaderDisabled(true);
    } else {
        no_spSelect.style.display = "none";
        no_spText.style.display = "block";
        no_spText.readOnly = true;
        funcClearHeaderPesanan();
        funcClearInputBarang();
        funcHeaderDisabled(false);
        const table = document.getElementById("list_view");
        for (let i = 1; i < table.rows.length; i++) {
            table.deleteRow(i);
        }
        div_headerSuratPesanan.classList.toggle("disabled");
        // div_tabelSuratPesanan.classList.toggle("disabled");
        div_tabelSuratPesanan.classList.add("disabled");
        div_detailSuratPesanan.classList.add("disabled");
        div_beratStandard.classList.add("disabled");
        // disableElements();
        proses = 0;
        this.innerHTML = "Koreksi";
        isi_button.innerHTML = "Isi";
        hapus_button.style.display = "block";
        jenis_brg.selectedIndex = 0;
    }
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        div_headerSuratPesanan.classList.toggle("disabled");
        // div_tabelSuratPesanan.classList.toggle("disabled");
        // div_detailSuratPesanan.classList.toggle("disabled");
        // div_beratStandard.classList.toggle("disabled");
        no_spText.readOnly = false;
        no_spText.focus();
        funcHeaderDisabled(true);
        // enableElements();
        proses = 3;
        isi_button.innerHTML = "Proses";
        edit_button.innerHTML = "Batal";
        this.style.display = "none";
    }
});

list_noSP.addEventListener("click", function (event) {
    event.preventDefault();
    no_spSelect.style.display = "block";
    no_spSelect.focus();
    no_spText.style.display = "none";
});

no_spSelect.addEventListener("change", function () {
    console.log(this.selectedIndex);
    if (this.selectedIndex !== 0) {
        this.classList.add("input-error");
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

no_spSelect.addEventListener("keypress", function (event) {
    event.preventDefault();
    if (this.selectedIndex !== 0) {
        no_spText.value = this.value;
        this.disabled = true;
        const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
        no_spText.dispatchEvent(enterEvent);
    }
});

no_spText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // console.log(no_spText.value);
        // alert('Kode barang dienter');
        fetch("/editSP/" + no_spText.value)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data[1].length);
                funcHeaderDisabled(false);
                no_spText.readOnly = true;

                // console.log(data[0][0].Tgl_Pesan.substr(0, 10));
                tgl_pesan.value = data[0][0].Tgl_Pesan.substr(0, 10);
                const optionJenisSp = jenis_sp.options;
                for (let i = 0; i < optionJenisSp.length; i++) {
                    const option = optionJenisSp[i];
                    if (option.value === data[0][0].IDJnsSuratPesanan) {
                        option.selected = true;
                        break;
                    }
                }
                const optionCustomer = list_customer.options;
                for (let i = 0; i < optionCustomer.length; i++) {
                    const option = optionCustomer[i];
                    if (option.value === data[0][0].IDCust) {
                        option.selected = true;
                        break;
                    }
                }
                no_po.value = data[0][0].NO_PO;
                tgl_po.value = data[0][0].Tgl_PO.substr(0, 10);
                no_pi.value = data[0][0].NO_PI;
                const optionSales = list_sales.options;
                for (let i = 0; i < optionSales.length; i++) {
                    const option = optionSales[i];
                    if (option.value === data[0][0].IDSales) {
                        option.selected = true;
                        break;
                    }
                }
                mata_uang.value = data[0][0].IDMataUang;
                const optionJenisBayar = jenis_bayar.options;
                for (let i = 0; i < optionJenisBayar.length; i++) {
                    const option = optionJenisBayar[i];
                    if (option.value === data[0][0].IDPembayaran) {
                        option.selected = true;
                        break;
                    }
                }
                syarat_bayar.value = data[0][0].SyaratBayar;
                let JnsFakturPjk = data[0][0].JnsFakturPjk;
                if (JnsFakturPjk == 0) {
                    faktur_pjkBiasa.checked = true;
                } else {
                    faktur_pjkSederhana.checked = true;
                }
                keterangan.value = data[0][0].Ket;

                for (let i = 0; i < data[1].length; i++) {
                    const arraydata = [
                        data[1][i].NamaBarang,
                        data[1][i].IDBarang,
                        data[1][i].HargaSatuan,
                        parseInt(data[1][i].Qty),
                        data[1][i].Satuan,
                        data[1][i].TglRencanaKirim.substr(0, 10),
                        data[1][i].PPN,
                        data[1][i].BERAT_KARUNG,
                        data[1][i].INDEX_KARUNG,
                        data[1][i].HARGA_KARUNG,
                        data[1][i].BERAT_INNER,
                        data[1][i].INDEX_INNER,
                        data[1][i].HARGA_INNER,
                        data[1][i].BERAT_LAMI,
                        data[1][i].INDEX_LAMI,
                        data[1][i].HARGA_LAMI,
                        data[1][i].BERAT_CONDUCTIVE,
                        data[1][i].INDEX_KERTAS,
                        data[1][i].HARGA_KERTAS,
                        data[1][i].HARGA_LAIN2,
                        data[1][i].BERAT_TOTAL,
                        data[1][i].HARGA_TOTAL,
                        data[1][i].BERAT_KARUNG3,
                        data[1][i].BERAT_INNER3,
                        data[1][i].BERAT_LAMI3,
                        data[1][i].BERAT_KERTAS3,
                        data[1][i].BERAT_TOTAL3,
                        data[1][i].IDJnsBarang,
                        data[1][i].IDPesanan,
                    ];
                    // Insert array into a new row
                    funcInsertRow(arraydata);
                }
            });

        tgl_pesan.focus();
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
    }
});

//#endregion

//#region Function

function funcClearHeaderPesanan() {
    tgl_pesan.valueAsDate = new Date();
    jenis_sp.selectedIndex = 0;
    no_spText.value = "";
    list_sales.selectedIndex = 0;
    list_customer.selectedIndex = 0;
    no_po.value = "";
    tgl_po.valueAsDate = new Date();
    no_pi.value = "";
    mata_uang.value = "";
    jenis_bayar.selectedIndex = 0;
    syarat_bayar = "";
    faktur_pjkBiasa.checked = true;
    keterangan.value = "";
}

function funcClearInputBarang() {
    satuan_jual.selectedIndex = 0;
    ppn.value = "";
    satuan_primer.value = "";
    satuan_sekunder.value = "";
    satuan_tritier.value = "";
    kode_barang.readOnly = true;
    kode_barang.value = "";
    berat_karung.value = "";
    berat_karung.readOnly = true;
    berat_inner.value = "";
    berat_inner.readOnly = true;
    berat_lami.value = "";
    berat_lami.readOnly = true;
    berat_kertas.value = "";
    berat_kertas.readOnly = true;
    index_karung.value = "";
    index_karung.readOnly = true;
    index_inner.value = "";
    index_inner.readOnly = true;
    index_lami.value = "";
    index_lami.readOnly = true;
    index_kertas.value = "";
    index_kertas.readOnly = true;
    berat_indexKarung.value = "";
    berat_indexKarung.readOnly = true;
    berat_indexInner.value = "";
    berat_indexInner.readOnly = true;
    berat_indexLami.value = "";
    berat_indexLami.readOnly = true;
    berat_indexKertas.value = "";
    berat_indexKertas.readOnly = true;
    biaya_lain.value = "";
    biaya_lain.readOnly = true;
    total_cost.value = "";
    berat_standardTotal.value = "";
}

function funcHeaderDisabled(bool) {
    tgl_pesan.readOnly = bool;
    jenis_sp.disabled = bool;
    list_customer.disabled = bool;
    no_po.readOnly = bool;
    no_pi.readOnly = bool;
    tgl_po.readOnly = bool;
    list_sales.disabled = bool;
    mata_uang.readOnly = bool;
    jenis_bayar.disabled = bool;
    syarat_bayar.readOnly = bool;
    keterangan.readOnly = bool;
    faktur_pjkBiasa.disabled = bool;
    faktur_pjkSederhana.disabled = bool;
}

function funcInsertRow(array) {
    console.log(array);

    const table = $("#list_view").DataTable();
    table.clear();
    table.row.add(array);
    table.draw();
    $("#list_view tbody").off("click", "tr");
    $("#list_view tbody").on("click", "tr", function () {
        $(this).toggleClass("selected");
        selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows);
    });
}
//#endregion
