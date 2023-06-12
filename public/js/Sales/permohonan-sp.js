//#region Document get element by id
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
let div_beratStandardMeter = document.getElementById("div_beratStandardMeter");
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
let kodeStJual;
let kodeStPrim;
let kodeStSek;
let kodeStTri;
let trigger = 0;
let div_saldoInventory = document.getElementById("div_saldoInventory");
let table_saldoInventory = document.getElementById("table_saldoInventory");
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

//#endregion

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
div_saldoInventory.classList.toggle("disabled");

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
        add_button.focus();
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
        div_saldoInventory.classList.toggle("disabled");
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
        div_saldoInventory.classList.toggle("disabled");
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
        div_saldoInventory.classList.toggle("disabled");
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
        div_saldoInventory.classList.toggle("disabled");
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
        div_saldoInventory.classList.add("disabled");
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
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        div_saldoInventory.classList.toggle("disabled");
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

jenis_brg.addEventListener("change", function () {
    if (ppn.value === "EXCLUDE") {
        return;
    }
    kode_barang.readOnly = false;
    kode_barang.focus();
    enter_kodeBarang.style.display = "block";
    satuan_primer.value = "";
    satuan_sekunder.value = "";
    satuan_tritier.value = "";
    satuan_jual.selectedIndex = "0";
    kategori_utama.selectedIndex = "0";
    kategori.innerHTML = "";
    sub_kategori.innerHTML = "";
    nama_barang.innerHTML = "";
});

kategori_utama.addEventListener("change", function () {
    // Code to retrieve options for the second select input based on the selected value of the first select input
    let kategoriUtama = this.value; // Use the value of the first select input as the firstValue variable
    enter_kodeBarang.style.display = "none";
    kategori.disabled = false;
    sub_kategori.disabled = false;
    nama_barang.disabled = false;
    kategori.focus();
    fetch("/options/kategori/" + kategoriUtama)
        .then((response) => response.json())
        .then((options) => {
            kategori.innerHTML =
                "<option disabled selected value>-- Pilih Kategori --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.no_kategori;
                optionTag.text = option.nama_kategori;
                kategori.appendChild(optionTag);
            });
            sub_kategori.innerHTML =
                "<option disabled selected value>-- Pilih Sub Kategori --</option>";
            nama_barang.innerHTML =
                "<option disabled selected value>-- Pilih Nama Barang --</option>";
            satuan_jual.disabled = false;
            fetch("/listsatuan/")
                .then((response) => response.json())
                .then((options) => {
                    satuan_jual.innerHTML =
                        "<option selected value>-- Pilih Satuan Jual --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.No_satuan;
                        optionTag.text = option.Nama_satuan;
                        satuan_jual.appendChild(optionTag);
                        satuan_jual.selectedIndex = 0;
                    });
                });
            funcClearInputBarang();
        });
});

kategori.addEventListener("change", function () {
    // Code to retrieve options for the second select input based on the selected value of the first select input
    let kategori = this.value; // Use the value of the first select input as the firstValue variable
    sub_kategori.focus();
    fetch("/options/subKategori/" + kategori)
        .then((response) => response.json())
        .then((options) => {
            sub_kategori.innerHTML =
                "<option disabled selected value>-- Pilih Sub Kategori --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.no_sub_kategori;
                optionTag.text = option.nama_sub_kategori;
                sub_kategori.appendChild(optionTag);
            });
        });
});

sub_kategori.addEventListener("change", function () {
    // Code to retrieve options for the second select input based on the selected value of the first select input
    let subKategori = this.value; // Use the value of the first select input as the firstValue variable
    namaBarang.focus();
    fetch("/options/namaBarang/" + subKategori)
        .then((response) => response.json())
        .then((options) => {
            nama_barang.innerHTML =
                "<option disabled selected value>-- Pilih Nama Barang --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.KD_BRG;
                optionTag.text = option.NAMA_BRG;
                nama_barang.appendChild(optionTag);
            });
        });
});

nama_barang.addEventListener("change", function () {
    let namaBarang = this.value;
    kode_barang.value = namaBarang;
    qty_pesan.focus();
    ppn.value = "EXCLUDE";
    ppn.readOnly = true;
    document.getElementById("kode_barang").readOnly = true;

    //Isi Satuan INV
    fetch("/satuan/" + namaBarang)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            satuan_primer.value =
                data[0].SatPrimer.trim() +
                " (Primer)               -" +
                data[0].ST_PRIM;
            satuan_sekunder.value =
                data[0].SatSekunder.trim() +
                " (Sekunder)               -" +
                data[0].ST_SEK;
            satuan_tritier.value =
                data[0].Nama_satuan.trim() +
                " (Tritier)               -" +
                data[0].ST_TRI;
            kodeStPrim = satuan_primer.value.split("-").pop();
            kodeStSek = satuan_sekunder.value.split("-").pop();
            kodeStTri = satuan_tritier.value.split("-").pop();
            // kodeStJual = data[0].NO_SATUAN_UMUM + ' - ' + data[0].SatUmum;
            // console.log(kodeStJual);
            const options = satuan_jual.options;
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                // console.log(option);
                if (option.value === data[0].NO_SATUAN_UMUM) {
                    option.selected = true;
                    break;
                }
            }
            document.getElementById("satuan_primer").readOnly = true;
            document.getElementById("satuan_sekunder").readOnly = true;
            document.getElementById("satuan_tritier").readOnly = true;
        });
    // console.log(kategoriUtama.value);

    //Jika kategori utama berasal dari KRR-Hasil Produksi, isi Berat Standard
    funcBeratStandard(kategori_utama, namaBarang);
});

kode_barang.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let kodeBarang9digit;
        kodeBarang9digit = document.getElementById("kode_barang");
        // console.log(kodeBarang9digit.value);
        // alert('Kode barang dienter');
        if (kodeBarang9digit.value.length < 9) {
            // alert("kode barang tidak sesuai");
            kodeBarang9digit.value = kode_barang.value.padStart(9, "0");
            // console.log(kodeBarang9digit.value);
        }
        kode_barang.value = kodeBarang9digit.value;
        fetch("/satuan1/" + kode_barang.value)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data[0]);
                const optionKategoriUtama = kategori_utama.options;
                for (let i = 0; i < optionKategoriUtama.length; i++) {
                    const option = optionKategoriUtama[i];
                    if (option.value === data[0].no_kat_utama) {
                        option.selected = true;
                        break;
                    }
                }
                kategori.innerHTML = "";
                sub_kategori.innerHTML = "";
                nama_barang.innerHTML = "";
                //add option kategori sampai nama barang
                let optionKategori = document.createElement("option");
                optionKategori.value = data[0].no_kategori;
                optionKategori.text = data[0].nama_kategori;
                kategori.appendChild(optionKategori);
                let optionSubKategori = document.createElement("option");
                optionSubKategori.value = data[0].no_sub_kategori;
                optionSubKategori.text = data[0].nama_sub_kategori;
                sub_kategori.appendChild(optionSubKategori);
                let optionNamaBarang = document.createElement("option");
                optionNamaBarang.value = data[0].KodeBarang;
                optionNamaBarang.text = data[0].NAMA_BRG;
                nama_barang.appendChild(optionNamaBarang);
                //Isi data satuan
                const optionSatuanJual = satuan_jual.options;
                for (let i = 0; i < optionSatuanJual.length; i++) {
                    const option = optionSatuanJual[i];
                    // console.log(option);
                    if (option.value === data[0].NO_SATUAN_UMUM) {
                        option.selected = true;
                        break;
                    }
                }
                ppn.value = "EXCLUDE";
                ppn.readOnly = true;
                rencana_kirim.valueAsDate = new Date();
                satuan_primer.value = data[0].SatPrimer;
                satuan_sekunder.value = data[0].SatSekunder;
                satuan_tritier.value = data[0].Nama_satuan;
                funcBeratStandard(kode_barang.value);
                funcTampilInv(kode_barang.value);
            });
        qty_pesan.focus();
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
        div_saldoInventory.classList.toggle("disabled");
    }
});

satuan_jual.addEventListener("change", function () {
    if (
        satuan_jual.options[satuan_jual.selectedIndex].text !==
        satuan_sekunder.value.trim()
    ) {
        div_beratStandardMeter.style.display = "block";
        trigger = 1;
    } else if (
        satuan_jual.options[satuan_jual.selectedIndex].text ==
        satuan_sekunder.value.trim()
    ) {
        div_beratStandardMeter.style.display = "none";
        trigger = 0;
    }
});

add_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (kode_barang.value === "") {
        alert("Tidak ada barang yang dimasukan");
        return;
    } else if (
        jenis_brg.selectedIndex === -1 ||
        jenis_brg.selectedIndex === 0
    ) {
        alert("Pilih jenis barang!");
        jenis_brg.focus();
        return;
    } else if (total_cost.value <= 0) {
        alert("Berat standard harap diisi!");
        berat_karung.focus();
        return;
    } else if (qty_pesan.value <= 0) {
        alert("Quantity pesan harap diisi!");
        qty_pesan.focus();
        return;
    } else if (harga_satuan.value <= 0) {
        alert("Harga satuan harap diisi");
        harga_satuan.focus();
        return;
    }
    const arraydata = [
        nama_barang.options[nama_barang.selectedIndex].text,
        kode_barang.value,
        parseInt(harga_satuan.value),
        parseInt(qty_pesan.value),
        satuan_jual.options[satuan_jual.selectedIndex].text,
        rencana_kirim.value,
        ppn.value,
        parseFloat(berat_karung.value),
        parseFloat(index_karung.value),
        parseFloat(berat_indexKarung.value),
        parseFloat(berat_inner.value),
        parseFloat(index_inner.value),
        parseFloat(berat_indexInner.value),
        parseFloat(berat_lami.value),
        parseFloat(index_lami.value),
        parseFloat(berat_indexLami.value),
        parseFloat(berat_kertas.value),
        parseFloat(index_kertas.value),
        parseFloat(berat_indexKertas.value),
        parseInt(biaya_lain.value),
        parseFloat(berat_standardTotal.value),
        parseInt(total_cost.value),
        parseFloat(berat_karungMeter.value),
        parseFloat(berat_innerMeter.value),
        parseFloat(berat_lamiMeter.value),
        parseFloat(berat_kertasMeter.value),
        parseFloat(berat_standardTotalMeter.value),
        jenis_brg.value,
        "",
    ];
    // Insert array into a new row
    funcInsertRow(arraydata);
    funcClearInputBarang();
    jenis_brg.selectedIndex = 0;
    kategori_utama.selectedIndex = 0;
    kategori.innerHTML = "";
    kategori.disabled = false;
    sub_kategori.innerHTML = "";
    sub_kategori.disabled = false;
    nama_barang.innerHTML = "";
    nama_barang.disabled = false;
    enter_kodeBarang.style.display = "none";
    qty_pesan.value = "";
    harga_satuan.value = "";
    // jenisBarang.focus();
    let confirmation = confirm("Apakah ingin menambah barang?");

    if (confirmation) {
        jenis_brg.focus();
    } else {
        isi_button.focus();
    }
});

update_button.addEventListener("click", function (event) {
    event.preventDefault();
    // Get the selected row
    var selectedRow = $("#list_view tbody tr.selected");

    // Find the cells within the selected row
    var cells = selectedRow.find("td");

    // Edit the desired cell(s)
    // For example, let's edit the second cell (index 1)
    var secondCell = cells.eq(1); // Get the second cell
    secondCell.text("New Value"); // Set the new value

    // You can repeat the above steps to edit other cells in the row

    // Update the table display
    $("#list_view").DataTable().draw();

    const inputs = highlightedRow.querySelectorAll("input");
    // console.log(highlightedRow.cells.length);
    if (highlightedRow) {
        // update data in selected row
        inputs[3].value = parseInt(qtyPesan.value);
        inputs[4].value = satuanJual.options[satuanJual.selectedIndex].text;
        inputs[5].value = parseInt(hargaSatuan.value);
        inputs[6].value = rencanaKirim.value;
        inputs[9].value = parseFloat(beratKarung.value);
        inputs[10].value = parseFloat(indexKarung.value);
        inputs[11].value = parseFloat(beratIndexKarung.value);
        inputs[12].value = parseFloat(beratInner.value);
        inputs[13].value = parseFloat(indexInner.value);
        inputs[14].value = parseFloat(beratIndexInner.value);
        inputs[15].value = parseFloat(beratLami.value);
        inputs[16].value = parseFloat(indexLami.value);
        inputs[17].value = parseFloat(beratIndexLami.value);
        inputs[18].value = parseFloat(beratKertas.value);
        inputs[19].value = parseFloat(indexKertas.value);
        inputs[20].value = parseFloat(beratIndexKertas.value);
        inputs[21].value = parseInt(biayaLain.value);
        inputs[22].value = parseFloat(beratStandardTotal.value);
        inputs[23].value = parseInt(totalCost.value);
        inputs[24].value = !isNaN(parseFloat(beratKarungMeter.value))
            ? parseFloat(beratKarungMeter.value)
            : 0;
        inputs[25].value = !isNaN(parseFloat(beratInnerMeter.value))
            ? parseFloat(beratInnerMeter.value)
            : 0;
        inputs[26].value = !isNaN(parseFloat(beratLamiMeter.value))
            ? parseFloat(beratLamiMeter.value)
            : 0;
        inputs[27].value = !isNaN(parseFloat(beratKertasMeter.value))
            ? parseFloat(beratKertasMeter.value)
            : 0;
        inputs[28].value = !isNaN(parseFloat(beratStandardTotalMeter.value))
            ? parseFloat(beratStandardTotalMeter.value)
            : 0;
        // remove highlight from selected row
        highlightedRow.classList.remove("highlighted");
        // clear input fields
        funcClearInputBarang();
        jenisBarang.selectedIndex = 0;
        kategoriUtama.selectedIndex = 0;
        kategori.innerHTML = "";
        kategori.disabled = false;
        subKategori.innerHTML = "";
        subKategori.disabled = false;
        namaBarang.innerHTML = "";
        namaBarang.disabled = false;
        enterKodeBarang.style.display = "none";
        qtyPesan.value = "";
        hargaSatuan.value = "";
        jenisBarang.focus();
    }
});

delete_button.addEventListener("click", function () {
    event.preventDefault();
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
    let isDataInTable = false;
    const table = $("#list_view").DataTable();
    // console.log(table.rows.length);
    if (table.data().length > 0) {
        table.rows().every(function () {
            const rowData = this.data();
            const columnValue = rowData[1]; // Assuming you want to compare the second column

            // Compare the column value with your desired value
            if (columnValue === kode_barang.value) {
                // Perform your desired action here
                isDataInTable = true;
            }
        });
    }
    // table.clear();
    if (isDataInTable) {
        alert("Data barang sudah ada");
        list_view.focus();
    }
    else{
        table.row.add(array);
        table.draw();
        $("#list_view tbody").off("click", "tr");
        $("#list_view tbody").on("click", "tr", function () {
            $(this).toggleClass("selected");
            selectedRows = table.rows(".selected").data().toArray();
            // console.log(selectedRows);
            qty_pesan.value = selectedRows[0][3];
            harga_satuan.value = selectedRows[0][2];
            ppn.value = selectedRows[0][6];
            satuan_jual.selectedIndex = 0;
            for (let i = 0; i < satuan_jual.length; i++) {
                // console.log(satuanJual.selectedIndex);
                satuan_jual.selectedIndex += 1;
                if (
                    satuan_jual.options[satuan_jual.selectedIndex].text ===
                    selectedRows[0][4].trim()
                ) {
                    break;
                }
            }
            jenis_brg.value = selectedRows[0][27];
            rencana_kirim.value = selectedRows[0][5];
            let optionNamaBarang = document.createElement("option");
            optionNamaBarang.value = selectedRows[0][1];
            optionNamaBarang.text = selectedRows[0][0];
            nama_barang.appendChild(optionNamaBarang);
            kode_barang.value = selectedRows[0][1];
            berat_karung.readOnly = false;
            berat_inner.readOnly = false;
            berat_lami.readOnly = false;
            berat_kertas.readOnly = false;
            index_karung.readOnly = false;
            index_inner.readOnly = false;
            index_lami.readOnly = false;
            index_kertas.readOnly = false;
            biaya_lain.readOnly = false;
            berat_karung.value = selectedRows[0][7];
            index_karung.value = selectedRows[0][8];
            berat_indexKarung.value = selectedRows[0][9];
            berat_inner.value = selectedRows[0][10];
            index_inner.value = selectedRows[0][11];
            berat_indexInner.value = selectedRows[0][12];
            berat_lami.value = selectedRows[0][13];
            index_lami.value = selectedRows[0][14];
            berat_indexLami.value = selectedRows[0][15];
            berat_kertas.value = selectedRows[0][16];
            index_kertas.value = selectedRows[0][17];
            berat_indexKertas.value = selectedRows[0][18];
            biaya_lain.value = selectedRows[0][19];
            berat_standardTotal.value = selectedRows[0][20];
            total_cost.value = selectedRows[0][21];
            funcDisplayDataBrg(selectedRows[0][1]);
        });
    }
}

function funcDisplayDataBrg(kodeBarangParameter) {
    // console.log(kodeBarangParameter);
    fetch("/displaybarang/" + kodeBarangParameter)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            let optionTagKategori = document.createElement("option");
            let optionTagSubKategori = document.createElement("option");
            const optionKategoriUtama = kategori_utama.options;

            for (let i = 0; i < optionKategoriUtama.length; i++) {
                const option = optionKategoriUtama[i];
                if (option.value === data[0].IdKelompokUtama) {
                    option.selected = true;
                    break;
                }
            }
            //disable dulu karena ndak ada isi optionnya hehe
            // kategori.disabled = true;
            // sub_kategori.disabled = true;
            // nama_barang.disabled = true;
            //ngisi optionnya hehe
            optionTagKategori.value = data[0].IdKelompok;
            optionTagKategori.text = data[0].NamaKelompok;
            optionTagSubKategori.value = data[0].IdCorak;
            optionTagSubKategori.text = data[0].Corak;
            kategori.appendChild(optionTagKategori);
            sub_kategori.appendChild(optionTagSubKategori);
            //ngisi sisanya hehe
            satuan_primer.value = data[0].SatuanPrimer;
            satuan_sekunder.value = data[0].SatuanSekunder;
            satuan_tritier.value = data[0].SatuanTritier;
        });
}

function funcBeratStandard(namaBarang) {
    // console.log("kategori utama: " + kategoriUtama.value);
    // console.log('kode barang: ' + namaBarang);
    fetch("/beratstandard/" + namaBarang)
        .then((response) => response.json())
        .then((data) => {
            div_beratStandard.style.display = "block";
            console.log(data[0]);
            //ambil data dari database masuk ke input text
            berat_karung.value = data[0].BERAT_KARUNG3;
            berat_inner.value = data[0].BERAT_INNER3;
            berat_lami.value = data[0].BERAT_LAMI3;
            berat_karungMeter.value = data[0].BERAT_KARUNG;
            berat_innerMeter.value = data[0].BERAT_INNER;
            berat_lamiMeter.value = data[0].BERAT_LAMI;
            berat_kertasMeter.value = data[0].BERAT_CONDUCTIVE;
            berat_standardTotalMeter.value = data[0].BERAT_TOTAL3;
            berat_kertas.value = data[0].BERAT_KERTAS3;
            berat_standardTotal.value = data[0].BERAT_TOTAL;
            berat_karung.readOnly = false;
            berat_inner.readOnly = false;
            berat_lami.readOnly = false;
            berat_kertas.readOnly = false;
            index_karung.readOnly = false;
            index_inner.readOnly = false;
            index_lami.readOnly = false;
            index_kertas.readOnly = false;
            biaya_lain.readOnly = false;
            index_karung.value = 0;
            index_inner.value = 0;
            index_lami.value = 0;
            index_kertas.value = 0;
            biaya_lain.value = 0;
            berat_indexInner.value = 0;
            berat_indexKarung.value = 0;
            berat_indexLami.value = 0;
            berat_indexKertas.value = 0;
            total_cost.value = 0;
        });
    [
        berat_karung,
        berat_inner,
        berat_kertas,
        berat_lami,
        index_karung,
        index_inner,
        index_kertas,
        index_lami,
        biaya_lain,
    ].forEach(function (element) {
        element.addEventListener("input", function () {
            // console.log(trigger == 0);
            berat_indexKarung.value =
                parseFloat(berat_karung.value) * parseFloat(index_karung.value);
            berat_indexInner.value =
                parseFloat(berat_inner.value) * parseFloat(index_inner.value);
            berat_indexLami.value =
                parseFloat(berat_lami.value) * parseFloat(index_lami.value);
            berat_indexKertas.value =
                parseFloat(berat_kertas.value) * parseFloat(index_kertas.value);
            berat_standardTotal.value =
                parseFloat(berat_karung.value) +
                parseFloat(berat_inner.value) +
                parseFloat(berat_lami.value) +
                parseFloat(berat_kertas.value);
            total_cost.value =
                parseFloat(biaya_lain.value) +
                parseFloat(berat_indexKarung.value) +
                parseFloat(berat_indexInner.value) +
                parseFloat(berat_indexKertas.value) +
                parseFloat(berat_indexLami.value);

            if (trigger == 0) {
                berat_karungMeter.value = parseFloat(berat_karung.value);
                berat_innerMeter.value = parseFloat(berat_inner.value);
                berat_lamiMeter.value = parseFloat(berat_lami.value);
                berat_kertasMeter.value = parseFloat(berat_kertas.value);
                berat_standardTotalMeter.value =
                    berat_karungMeter.value +
                    berat_innerMeter.value +
                    berat_lamiMeter.value +
                    berat_kertasMeter.value;
            }
        });
    });
}

function funcTampilInv(kodeBarang) {
    fetch("/saldoinventory/" + kodeBarang)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const rows = data.map((item) => {
                return [
                    item.NamaDivisi.trim(),
                    item.SaldoTritier.trim(),
                    item.satTertier.trim(),
                    item.SaldoSekunder.trim(),
                    item.satSekunder.trim(),
                    item.SaldoPrimer.trim(),
                    item.satPrimer.trim(),
                    item.NamaObjek.trim(),
                    item.NamaKelompokUtama.trim(),
                    item.NamaKelompok.trim(),
                    item.NamaSubKelompok.trim(),
                ];
            });
            const table = $("#table_saldoInventory").DataTable();
            table.clear();
            table.rows.add(rows);
            table.draw();
        });
}
//#endregion
