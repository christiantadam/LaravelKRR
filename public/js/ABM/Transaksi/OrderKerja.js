jQuery(function ($) {
    //#region Get element by ID
    // let button_tambahjenisOrderKerja = document.getElementById("button_tambahjenisOrderKerja"); // prettier-ignore
    // let jenisOrderAdstar = document.getElementById('jenisOrderAdstar'); // prettier-ignore
    // let jenisOrderKerjaPrintingStarpak = document.getElementById('jenisOrderKerjaPrintingStarpak'); // prettier-ignore
    // let jenisOrderKerjaPrintingWoven = document.getElementById('jenisOrderKerjaPrintingWoven'); // prettier-ignore
    // let jenisOrderWoven = document.getElementById('jenisOrderWoven'); // prettier-ignore
    const select_jenisOrderKerja = $("#select_jenisOrderKerja"); // prettier-ignore
    const select_suratPesananTujuan = $('#select_suratPesananTujuan'); // prettier-ignore
    let additionalInputs = document.getElementById("additionalInputs");
    let additionalInputsKBWoven = document.getElementById("additionalInputsKBWoven"); // prettier-ignore
    let additionalInputsPatch = document.getElementById("additionalInputsPatch"); //prettier-ignore
    let button_modalDetailPermohonan = document.getElementById("button_modalDetailPermohonan"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahOrderKerja = document.getElementById("button_tambahOrderKerja"); // prettier-ignore
    let cekNomorOrderKerja = document.getElementById("cekNomorOrderKerja"); // prettier-ignore
    let corakPrintingPatch = document.getElementById("corakPrintingPatch"); //prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let customerSuratPesanan = document.getElementById("customerSuratPesanan"); // prettier-ignore
    let dataSuratPesananTemp;
    let detailOrderKerjaCustomer = document.getElementById("detailOrderKerjaCustomer"); // prettier-ignore
    let detailOrderKerjaModalLabel = document.getElementById("detailOrderKerjaModalLabel"); // prettier-ignore
    let detailOrderKerjaNamaBarang = document.getElementById("detailOrderKerjaNamaBarang"); // prettier-ignore
    let detailOrderKerjaNomorSuratPesanan = document.getElementById("detailOrderKerjaNomorSuratPesanan"); // prettier-ignore
    let detailOrderKerjaTanggalRencanaMulaiKerja = document.getElementById("detailOrderKerjaTanggalRencanaMulaiKerja"); // prettier-ignore
    let detailOrderKerjaTanggalRencanaSelesaiKerja = document.getElementById("detailOrderKerjaTanggalRencanaSelesaiKerja"); // prettier-ignore
    let div_keteranganWoven = document.getElementById("div_keteranganWoven"); // prettier-ignore
    let div_kodeBarangHasilProduksiStarpak = document.getElementById('div_kodeBarangHasilProduksiStarpak'); // prettier-ignore
    let div_kodeBarangHasilProduksiWoven = document.getElementById('div_kodeBarangHasilProduksiWoven'); // prettier-ignore
    let div_printingStarpak1 = document.getElementById("div_printingStarpak1"); // prettier-ignore
    let div_printingStarpak2 = document.getElementById("div_printingStarpak2"); // prettier-ignore
    let div_printingWoven = document.getElementById("div_printingWoven"); // prettier-ignore
    let div_rollPatchStarpak = document.getElementById("div_rollPatchStarpak"); //prettier-ignore
    let div_rollPatchStarpak2 = document.getElementById("div_rollPatchStarpak2"); // prettier-ignore
    let div_tanggalRencanaMulaiKerjaWoven = document.getElementById('div_tanggalRencanaMulaiKerjaWoven'); //prettier-ignore
    let div_tanggalRencanaSelesaiKerjaWoven = document.getElementById('div_tanggalRencanaSelesaiKerjaWoven'); //prettier-ignore
    let div_warnaKarungWoven = document.getElementById("div_warnaKarungWoven");
    let input_airPermeabilityStarpak = document.getElementById("input_airPermeabilityStarpak"); // prettier-ignore
    let input_coronaStarpak = document.getElementById("input_coronaStarpak"); // prettier-ignore
    let input_coronaStarpakPatch = document.getElementById("input_coronaStarpakPatch"); //prettier-ignore
    let input_denier = document.getElementById("input_denier"); // prettier-ignore
    let input_drumKliseStarpak = document.getElementById("input_drumKliseStarpak"); // prettier-ignore
    let input_drumKliseStarpakPatch = document.getElementById("input_drumKliseStarpakPatch"); //prettier-ignore
    let input_innerStarpak = document.getElementById("input_innerStarpak"); // prettier-ignore
    let input_innerWoven = document.getElementById('input_innerWoven'); //prettier-ignore
    let input_jahitAtasWoven = document.getElementById("input_jahitAtasWoven"); // prettier-ignore
    let input_jahitBawahWoven = document.getElementById("input_jahitBawahWoven"); // prettier-ignore
    let input_jumlahPatch = document.getElementById("input_jumlahPatch"); //prettier-ignore
    let input_jumlahWarna = document.getElementById("input_jumlahWarna"); // prettier-ignore
    let input_jumlahWarnaPatch = document.getElementById("input_jumlahWarnaPatch"); //prettier-ignore
    let input_kertasStarpak = document.getElementById("input_kertasStarpak"); // prettier-ignore
    let input_keterangan = document.getElementById("input_keterangan"); // prettier-ignore
    let input_jumlahKodeBarangSetengahJadiWoven = document.getElementById("input_jumlahKodeBarangSetengahJadiWoven"); // prettier-ignore
    let input_panjangPotonganStarpak = document.getElementById("input_panjangPotonganStarpak"); // prettier-ignore
    let input_potongWoven = document.getElementById("input_potongWoven"); // prettier-ignore
    let input_printMaxStarpak = document.getElementById("input_printMaxStarpak"); // prettier-ignore
    let input_rajutan = document.getElementById("input_rajutan"); // prettier-ignore
    let input_rollStarpak = document.getElementById("input_rollStarpak"); // prettier-ignore
    let input_rollStarpakPatch = document.getElementById("input_rollStarpakPatch"); //prettier-ignore
    let input_spoonBondStarpak = document.getElementById("input_spoonBondStarpak"); // prettier-ignore
    let input_tanggalRencanaMulaiKerjaWoven = document.getElementById("input_tanggalRencanaMulaiKerjaWoven"); // prettier-ignore
    let input_tanggalRencanaSelesaiKerjaWoven = document.getElementById("input_tanggalRencanaSelesaiKerjaWoven"); // prettier-ignore
    let input_ukuran = document.getElementById("input_ukuran"); // prettier-ignore
    let input_warnaKarungWoven = document.getElementById('input_warnaKarungWoven'); // prettier-ignore
    let jenisOrderKerja = 0;
    let jumlahPesanan = document.getElementById("jumlahPesanan"); // prettier-ignore
    let kodeBarangJadi = document.getElementById("kodeBarangJadi"); // prettier-ignore
    let kodeBarangPrintingStarpak = document.getElementById('kodeBarangPrintingStarpak'); // prettier-ignore
    let kodeBarangPrintingStarpakPatch = document.getElementById("kodeBarangPrintingStarpakPatch"); // prettier-ignore
    let kodeBarangPrintingWoven = document.getElementById('kodeBarangPrintingWoven'); // prettier-ignore
    // let kodeBarangSetengahJadiWoven = document.getElementById('kodeBarangSetengahJadiWoven'); // prettier-ignore
    let labelCorakPrinting = document.querySelector('label[for="corakPrinting"]'); // prettier-ignore
    let labelInput_jumlahWarna = document.querySelector('label[for="input_jumlahWarna"]'); // prettier-ignore
    let label_kodeBarang = document.getElementById('label_kodeBarang'); // prettier-ignore
    let namaBarang = document.getElementById("namaBarang"); // prettier-ignore
    let namaBarangPrintingStarpak = document.getElementById('namaBarangPrintingStarpak'); // prettier-ignore
    let namaBarangPrintingStarpakPatch = document.getElementById("namaBarangPrintingStarpakPatch"); // prettier-ignore
    let namaBarangPrintingWoven = document.getElementById('namaBarangPrintingWoven'); // prettier-ignore
    // let namaBarangSetengahJadiWoven = document.getElementById('namaBarangSetengahJadiWoven'); // prettier-ignore
    let NomorOrderKerja = document.getElementById("NomorOrderKerja"); // prettier-ignore
    let packingSuratPesanan = document.getElementById("packingSuratPesanan"); // prettier-ignore
    let tambahPermohonanOrderKerjaLabel = document.getElementById("tambahPermohonanOrderKerjaLabel"); // prettier-ignore

    let table_orderKerja = $("#table_orderKerja").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        data: [],
        columns: [
            { data: "NomorOrderKerja" },
            { data: "NomorSP" },
            { data: "KodeBarang" },
            {
                data: "IdOrder",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-success btn-print" data-id="' +
                        data + ' | ' + full.JenisOK +
                        '">Cetak</button>' +
                        '<button class="btn btn-info btn-edit" data-id="' +
                        data + ' | ' + full.JenisOK + ' | ' + full.NomorOrderKerja +
                        '" data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">Edit</button>' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data + ' | ' + full.JenisOK + ' | ' + full.NomorOrderKerja +
                        '">Hapus</button>' +
                        '<button class="btn btn-secondary btn-copy" data-id="' +
                        data + ' | ' + full.JenisOK + ' | ' + full.NomorOrderKerja +
                        '" data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">Copy</button>'
                    );
                },
            },
        ],
        columnDefs: [{ width: "23%", targets: [0, 1, 2] }],
    }); // prettier-ignore

    //#endregion

    //#region Load Form

    getDataOrderKerja();

    //#endregion

    //#region function
    // Setup global AJAX handlers
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function getDataOrderKerja() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDataPermohonanOrderKerja",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_orderKerja.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_orderKerja.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function clearAll() {
        cekNomorOrderKerja.innerHTML = "";
        customerSuratPesanan.value = "";
        jumlahPesanan.value = "";
        kodeBarangJadi.value = "";
        packingSuratPesanan.value = "";
        namaBarang.innerHTML = "";
        kodeBarangPrintingWoven.value = "";
        namaBarangPrintingWoven.value = "";
        input_jumlahKodeBarangSetengahJadiWoven.value = "";
        input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
            new Event("input")
        );
        kodeBarangPrintingStarpak.value = "";
        namaBarangPrintingStarpak.value = "";
        kodeBarangPrintingStarpakPatch.value = "";
        namaBarangPrintingStarpakPatch.value = "";
        input_ukuran.value = "";
        input_rajutan.value = "";
        input_denier.value = "";
        input_innerWoven.value = "";
        input_potongWoven.value = "";
        input_jahitAtasWoven.value = "";
        input_jahitBawahWoven.value = "";
        input_jumlahWarna.value = "";
        input_jumlahWarna.dispatchEvent(new Event("input"));
        input_keterangan.value = "";
        corakPrinting.value = "";
        input_warnaKarungWoven.value = "";
        input_rollStarpakPatch.value = "";
        input_drumKliseStarpakPatch.value = "";
        input_coronaStarpakPatch.value = "";
        input_jumlahPatch.value = "";
        input_jumlahWarnaPatch.value = "";
        input_jumlahWarnaPatch.dispatchEvent(new Event("input"));
        corakPrintingPatch.value = "";
    }

    setInputFilter(
        NomorOrderKerja,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangPrintingStarpak,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangPrintingStarpakPatch,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangPrintingWoven,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );
    //#endregion

    //#region Event Listener

    button_tambahOrderKerja.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahPermohonanOrderKerjaLabel.textContent = "Tambah Order Kerja";
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDataInputPermohonanOrderKerja",
            method: "GET",
            dataType: "json",
            success: function (data) {
                const twoDigitYear = new Date().getFullYear().toString().slice(-2); // prettier-ignore
                console.log(data);

                if (data.success) {
                    if (
                        data.NomorOrderKerja.length > 0 &&
                        data.NomorOrderKerja[0].No_OK.substring(0, 2) ==
                            twoDigitYear
                    ) {
                        NomorOrderKerja.value = parseInt(data.NomorOrderKerja[0].No_OK) + 1; // prettier-ignore
                    } else {
                        NomorOrderKerja.value = twoDigitYear + "0001";
                    }
                    dataSuratPesananTemp = data.dataSuratPesanan;
                    // Populate select_suratPesananTujuan with data.dataSuratPesanan
                    select_suratPesananTujuan.empty(); // Clear existing options
                    data.dataSuratPesanan.forEach(function (item) {
                        select_suratPesananTujuan.append(
                            new Option(item.IDSuratPesanan + ' | ' + item.KodeBarang, item.IDPesanan) // prettier-ignore
                        );
                    });
                    select_suratPesananTujuan.val(null).trigger("change");
                    select_suratPesananTujuan.prop("disabled", false);
                    select_jenisOrderKerja
                        .val(null)
                        .trigger("change")
                        .trigger("select2:select");
                    select_jenisOrderKerja.prop("disabled", false);
                    NomorOrderKerja.disabled = false;

                    // Hide
                    [
                        div_printingStarpak1,
                        div_printingStarpak2,
                        div_kodeBarangHasilProduksiStarpak,
                        div_printingWoven,
                        div_kodeBarangHasilProduksiWoven,
                        div_keteranganWoven,
                        div_rollPatchStarpak,
                        div_rollPatchStarpak2,
                    ].forEach((el) => {
                        el.classList.remove("show-important");
                        el.classList.add("hide-important");
                    });
                    // Hide but removing class show-important-block
                    [
                        div_warnaKarungWoven,
                        div_tanggalRencanaMulaiKerjaWoven,
                        div_tanggalRencanaSelesaiKerjaWoven,
                    ].forEach((el) => {
                        el.classList.remove("show-important-block");
                        el.classList.add("hide-important");
                    });
                    clearAll();
                    input_tanggalRencanaMulaiKerjaWoven.value = "";
                    input_tanggalRencanaSelesaiKerjaWoven.value = "";
                    setTimeout(() => {
                        select_jenisOrderKerja.select2("open");
                    }, 200); // delay in milliseconds (adjust as needed)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load Nomor Order Kerja data.",
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to request data Nomor Order Kerja.",
                });
            },
        });
    });

    $("#tambahPermohonanOrderKerjaModal").on(
        "shown.bs.modal",
        function (event) {
            select_suratPesananTujuan.select2({
                dropdownParent: $("#tambahPermohonanOrderKerjaModal"),
                placeholder: "Pilih Surat Pesanan",
            });
            select_jenisOrderKerja.select2({
                dropdownParent: $("#tambahPermohonanOrderKerjaModal"),
                placeholder: "Pilih Jenis Order Kerja",
            });
        }
    );

    select_jenisOrderKerja.on("select2:select", function () {
        jenisOrderKerja = select_jenisOrderKerja.val();

        cekNomorOrderKerja.innerHTML = "";
        if (jenisOrderKerja == 1) {
            // Enable these
            [
                kodeBarangPrintingWoven,
                input_jumlahKodeBarangSetengahJadiWoven,
            ].forEach((el) => (el.readOnly = false));

            // Disable & clear these
            [kodeBarangPrintingStarpak, kodeBarangPrintingStarpakPatch].forEach(
                (el) => {
                    el.readOnly = true;
                    el.value = "";
                }
            );
            [namaBarangPrintingStarpak].forEach((el) => (el.value = ""));

            // Show
            [
                div_printingWoven,
                div_kodeBarangHasilProduksiWoven,
                div_keteranganWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.add("show-important");
                el.classList.remove("hide-important");
            });

            // Show but adding class show-important-block
            [
                div_warnaKarungWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.add("show-important-block");
                el.classList.remove("hide-important");
            });

            // Hide
            [
                div_printingStarpak1,
                div_printingStarpak2,
                div_kodeBarangHasilProduksiStarpak,
                div_rollPatchStarpak,
                div_rollPatchStarpak2,
            ].forEach((el) => {
                el.classList.remove("show-important");
                el.classList.add("hide-important");
            });

            labelInput_jumlahWarna.textContent = "Jumlah Warna";
            labelCorakPrinting.textContent = "Corak Printing";
            label_kodeBarang.textContent = "Kode Barang Printing / Set. Jadi";
        } else if (jenisOrderKerja == 2) {
            // Enable these
            [kodeBarangPrintingStarpak, kodeBarangPrintingStarpakPatch].forEach(
                (el) => (el.readOnly = false)
            );

            // Disable & clear these
            [
                kodeBarangPrintingWoven,
                input_jumlahKodeBarangSetengahJadiWoven,
            ].forEach((el) => {
                el.readOnly = true;
                el.value = "";
            });
            input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
                new Event("input")
            );
            [namaBarangPrintingWoven].forEach((el) => (el.value = ""));

            // Show
            [
                div_printingStarpak1,
                div_printingStarpak2,
                div_kodeBarangHasilProduksiStarpak,
                div_rollPatchStarpak,
                div_rollPatchStarpak2,
            ].forEach((el) => {
                el.classList.add("show-important");
                el.classList.remove("hide-important");
            });

            // Hide
            [
                div_printingWoven,
                div_kodeBarangHasilProduksiWoven,
                div_warnaKarungWoven,
                div_keteranganWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.remove("show-important");
                el.classList.add("hide-important");
            });

            // Hide but removing class show-important-block
            [
                div_warnaKarungWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.remove("show-important-block");
                el.classList.add("hide-important");
            });

            labelInput_jumlahWarna.textContent = "Jumlah Warna Body";
            labelCorakPrinting.textContent = "Corak Printing Body";
            label_kodeBarang.textContent = "Kode Barang Printing Starpak";
        }
        NomorOrderKerja.focus();
    });

    NomorOrderKerja.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            // Clear existing options
            select_suratPesananTujuan.empty();
            namaBarang.textContent = "";
            customerSuratPesanan.value = "";
            jumlahPesanan.value = "";
            kodeBarangJadi.value = "";
            packingSuratPesanan.value = "";
            if (NomorOrderKerja.value == "") {
                this.setCustomValidity("Nomor Order Kerja tidak boleh kosong"); // prettier-ignore
                NomorOrderKerja.classList.add("input-error");
                this.reportValidity();
                return;
            }
            console.log(select_jenisOrderKerja.val());

            if (select_jenisOrderKerja.val() == null) {
                this.setCustomValidity("Pilih Jenis Order Kerja dulu!"); // prettier-ignore
                NomorOrderKerja.classList.add("input-error");
                this.reportValidity();
                return;
            }

            // check apakah nomor order kerja sudah ada, kalau sudah ada filter surat pesanan berdasarkan kode barang yang sama
            $.ajax({
                url: "/MaintenanceOrderKerjaABM/getDataSPBerdasarkanNomorOrderKerja",
                method: "GET",
                data: {
                    NomorOrderKerja: NomorOrderKerja.value,
                    JenisOK: select_jenisOrderKerja.val(), // prettier-ignore
                    _token: csrfToken,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    if (data.success) {
                        // Populate select_suratPesananTujuan with data.dataSuratPesanan

                        if (
                            parseInt(
                                data.cekNomorOrderKerja[0].JumlahNomorOrderKerja
                            ) == 0
                        ) {
                            cekNomorOrderKerja.innerHTML = "Order Kerja Baru"; // prettier-ignore
                            cekNomorOrderKerja.style.color = "green";
                            cekNomorOrderKerja.style.fontSize = "";
                        } else {
                            cekNomorOrderKerja.innerHTML = "Order Kerja Sudah ada, pilihan SP ditampilkan berdasarkan data order kerja"; // prettier-ignore
                            cekNomorOrderKerja.style.color = "red";
                            cekNomorOrderKerja.style.fontSize = "14px";
                        }
                        if (data.dataSuratPesanan.length > 0) {
                            dataSuratPesananTemp = data.dataSuratPesanan;
                            data.dataSuratPesanan.forEach(function (item) {
                                select_suratPesananTujuan.append(
                                    new Option(item.IDSuratPesanan + ' | ' + item.KodeBarang, item.IDPesanan) // prettier-ignore
                                );
                            });
                            setTimeout(() => {
                                select_suratPesananTujuan.select2("open");
                            }, 200); // delay in milliseconds (adjust as needed)
                        }
                        select_suratPesananTujuan.val(null).trigger("change");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to load Nomor Surat Pesanan.",
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to request data Nomor Order Kerja.",
                    });
                },
            });
            this.setCustomValidity("");
            this.reportValidity();
        }
    });

    select_suratPesananTujuan.on("select2:select", function () {
        let selectedId = $(this).val();
        let selectedItem = dataSuratPesananTemp.find(
            (item) => item.IDPesanan == selectedId
        );
        if (selectedItem) {
            namaBarang.textContent = selectedItem.NAMA_BRG;
            customerSuratPesanan.value = selectedItem.NamaCust;
            jumlahPesanan.value = numeral(selectedItem.Qty).format("0,0.00");
            kodeBarangJadi.value = selectedItem.KodeBarang;
            packingSuratPesanan.value = selectedItem.Ket;
            packingSuratPesanan.focus();
        } else {
            namaBarang.textContent = "";
            customerSuratPesanan.value = "";
            jumlahPesanan.value = "";
            kodeBarangJadi.value = "";
            packingSuratPesanan.value = "";
        }
    });

    packingSuratPesanan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (jenisOrderKerja == "1") {
                kodeBarangPrintingWoven.focus();
            } else if (jenisOrderKerja == "2") {
                kodeBarangPrintingStarpak.focus();
            }
        }
    });

    kodeBarangPrintingWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                // this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                // this.classList.add("input-error");
                input_jumlahKodeBarangSetengahJadiWoven.focus();
            } else {
                // set kode barang supaya 9 digit
                let kodeBarang9digit;
                kodeBarang9digit = this;
                if (kodeBarang9digit.value.length < 9) {
                    kodeBarang9digit.value = this.value.padStart(9, "0");
                }
                this.value = kodeBarang9digit.value;

                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "PRINTING WOVEN",
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            if (data.dataBarang.length < 1) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Barang tidak masuk sub kategori PRINTING WOVEN.",
                                });
                            } else {
                                namaBarangPrintingWoven.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                input_jumlahKodeBarangSetengahJadiWoven.focus();
                            }
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data Barang.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Barang.",
                        });
                    },
                });
                this.setCustomValidity("");
            }
            this.reportValidity();
        }
    });

    input_jumlahKodeBarangSetengahJadiWoven.addEventListener(
        "input",
        function () {
            const max = 3;
            const min = 0;
            let value = parseInt(this.value);
            const container = additionalInputsKBWoven;

            // Clamp the value between 0 and 8
            if (isNaN(value)) value = 0;
            value = Math.min(Math.max(value, min), max);
            this.value = value;

            // Clear existing inputs
            container.innerHTML = "";
            const colKBWoven = document.createElement("div");
            colKBWoven.className = "list-group mb-2";
            colKBWoven.style.flex = "0.3";
            colKBWoven.style.gap = "5px";
            const colNamaBarangWoven = document.createElement("div");
            colNamaBarangWoven.className = "list-group mb-2";
            colNamaBarangWoven.style.flex = "0.6";
            colNamaBarangWoven.style.gap = "5px";
            // Generate inputs in two columns
            for (let i = 1; i <= value; i++) {
                const inputKodeBarangSetengahJadi = document.createElement("input"); //prettier-ignore
                inputKodeBarangSetengahJadi.type = "text";
                inputKodeBarangSetengahJadi.className = "form-control";
                inputKodeBarangSetengahJadi.placeholder = `KB Setengah Jadi ${i}`;
                inputKodeBarangSetengahJadi.name = `kodeBarangSetengahJadiWoven_${i}`;
                inputKodeBarangSetengahJadi.id = `kodeBarangSetengahJadiWoven_${i}`;

                const inputNamaBarangSetengahJadi = document.createElement("input"); //prettier-ignore
                inputNamaBarangSetengahJadi.type = "text";
                inputNamaBarangSetengahJadi.className = "form-control";
                inputNamaBarangSetengahJadi.placeholder = `Nama Barang Setengah Jadi Woven ${i}`;
                inputNamaBarangSetengahJadi.readOnly = true;
                inputNamaBarangSetengahJadi.name = `namaBarangSetengahJadiWoven_${i}`;
                inputNamaBarangSetengahJadi.id = `namaBarangSetengahJadiWoven_${i}`;

                // If this is the last input, add keypress event for Enter
                inputKodeBarangSetengahJadi.addEventListener(
                    "keypress",
                    function (e) {
                        if (e.key === "Enter") {
                            e.preventDefault(); // Prevent form submission if inside a form
                            if (this.value == "") {
                                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                                this.classList.add("input-error");
                            } else {
                                // set kode barang supaya 9 digit
                                let kodeBarang9digit;
                                kodeBarang9digit = this;
                                if (kodeBarang9digit.value.length < 9) {
                                    kodeBarang9digit.value =
                                        this.value.padStart(9, "0");
                                }
                                this.value = kodeBarang9digit.value;

                                $.ajax({
                                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                                    method: "GET",
                                    data: {
                                        kodeBarang: this.value,
                                        namaSubKategori: "WOVEN KRR2",
                                        _token: csrfToken,
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        console.log(data);

                                        if (data.success) {
                                            if (data.dataBarang.length < 1) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Error",
                                                    text: "Barang tidak masuk sub kategori WOVEN KRR2.",
                                                });
                                            } else {
                                                document.getElementById(`namaBarangSetengahJadiWoven_${i}`).value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                                if (i === value) {
                                                    input_ukuran.focus();
                                                } else {
                                                    const nextInput = document.getElementById(`kodeBarangSetengahJadiWoven_${i + 1}`); //prettier-ignore
                                                    if (nextInput) {
                                                        nextInput.focus();
                                                    }
                                                }
                                            }
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Error",
                                                text: "Failed to load data Barang.",
                                            });
                                        }
                                    },
                                    error: function () {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error",
                                            text: "Failed to request data Barang.",
                                        });
                                    },
                                });
                                this.setCustomValidity("");
                            }
                            this.reportValidity();
                        }
                    }
                );

                colKBWoven.appendChild(inputKodeBarangSetengahJadi);
                colNamaBarangWoven.appendChild(inputNamaBarangSetengahJadi);
                container.appendChild(colKBWoven);
                container.appendChild(colNamaBarangWoven);

                setInputFilter(
                    document.getElementById(`kodeBarangSetengahJadiWoven_${i}`),
                    function (value) {
                        return /^\d*$/.test(value); // Allow only digits
                    },
                    "Only digits are allowed"
                );
            }
        }
    );

    input_jumlahKodeBarangSetengahJadiWoven.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                if (this.value > 0) {
                    document
                        .getElementById("kodeBarangSetengahJadiWoven_1")
                        .focus();
                } else {
                    input_ukuran.focus();
                }
            }
        }
    );

    // kodeBarangSetengahJadiWoven.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         if (this.value == "") {
    //             // this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
    //             // this.classList.add("input-error");
    //             input_ukuran.focus();
    //         } else {
    //             // set kode barang supaya 9 digit
    //             let kodeBarang9digit;
    //             kodeBarang9digit = this;
    //             if (kodeBarang9digit.value.length < 9) {
    //                 kodeBarang9digit.value = this.value.padStart(9, "0");
    //             }
    //             this.value = kodeBarang9digit.value;

    //             $.ajax({
    //                 url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
    //                 method: "GET",
    //                 data: {
    //                     kodeBarang: this.value,
    //                     namaSubKategori: "SETENGAH JADI WOVEN",
    //                     _token: csrfToken,
    //                 },
    //                 dataType: "json",
    //                 success: function (data) {
    //                     console.log(data);

    //                     if (data.success) {
    //                         if (data.dataBarang.length < 1) {
    //                             Swal.fire({
    //                                 icon: "error",
    //                                 title: "Error",
    //                                 text: "Barang tidak masuk sub kategori POTONG JAHIT WOVEN.",
    //                             });
    //                         } else {
    //                             namaBarangSetengahJadiWoven.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
    //                             input_ukuran.focus();
    //                         }
    //                     } else {
    //                         Swal.fire({
    //                             icon: "error",
    //                             title: "Error",
    //                             text: "Failed to load data Barang.",
    //                         });
    //                     }
    //                 },
    //                 error: function () {
    //                     Swal.fire({
    //                         icon: "error",
    //                         title: "Error",
    //                         text: "Failed to request data Barang.",
    //                     });
    //                 },
    //             });
    //             this.setCustomValidity("");
    //         }
    //         this.reportValidity();
    //     }
    // });

    kodeBarangPrintingStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                this.classList.add("input-error");
            } else {
                // set kode barang supaya 9 digit
                let kodeBarang9digit;
                kodeBarang9digit = this;
                if (kodeBarang9digit.value.length < 9) {
                    kodeBarang9digit.value = this.value.padStart(9, "0");
                }
                this.value = kodeBarang9digit.value;

                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "PRINTING STARPAK BODY",
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            if (data.dataBarang.length < 1) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Barang tidak masuk sub kategori PRINTING STARPAK BODY.",
                                });
                            } else {
                                namaBarangPrintingStarpak.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                kodeBarangPrintingStarpakPatch.focus();
                            }
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data Barang.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Barang.",
                        });
                    },
                });
                this.setCustomValidity("");
            }
            this.reportValidity();
        }
    });

    kodeBarangPrintingStarpakPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                this.classList.add("input-error");
            } else {
                // set kode barang supaya 9 digit
                let kodeBarang9digit;
                kodeBarang9digit = this;
                if (kodeBarang9digit.value.length < 9) {
                    kodeBarang9digit.value = this.value.padStart(9, "0");
                }
                this.value = kodeBarang9digit.value;

                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "PRINTING STARPAK PATCH",
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            if (data.dataBarang.length < 1) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Barang tidak masuk sub kategori PRINTING STARPAK PATCH.",
                                });
                            } else {
                                namaBarangPrintingStarpakPatch.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                input_ukuran.focus();
                            }
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data Barang.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Barang.",
                        });
                    },
                });
                this.setCustomValidity("");
            }
            this.reportValidity();
        }
    });

    input_ukuran.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_rajutan.focus();
        }
    });

    input_rajutan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_denier.focus();
        }
    });

    input_denier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            //check jenis order kerja untuk menentukan mau fokus ke input mana
            if (jenisOrderKerja == "1") {
                input_innerWoven.focus();
            } else if (jenisOrderKerja == "2") {
                input_drumKliseStarpak.focus();
            }
        }
    });

    input_innerWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_potongWoven.focus();
        }
    });

    input_potongWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jahitAtasWoven.focus();
        }
    });

    input_jahitAtasWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jahitBawahWoven.focus();
        }
    });

    input_jahitBawahWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarna.focus();
        }
    });

    input_drumKliseStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_panjangPotonganStarpak.focus();
        }
    });

    input_panjangPotonganStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_coronaStarpak.value = 2000;
            input_coronaStarpak.select();
        }
    });

    input_coronaStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_printMaxStarpak.value = parseInt(
                numeral(jumlahPesanan.value).value() / 0.95
            );
            input_printMaxStarpak.select();
        }
    });

    input_printMaxStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_airPermeabilityStarpak.focus();
        }
    });

    input_airPermeabilityStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_rollStarpak.focus();
        }
    });

    input_rollStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_kertasStarpak.focus();
        }
    });

    input_kertasStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_innerStarpak.focus();
        }
    });

    input_innerStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_spoonBondStarpak.focus();
        }
    });

    input_spoonBondStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarna.focus();
        }
    });

    input_tanggalRencanaMulaiKerjaWoven.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                input_tanggalRencanaSelesaiKerjaWoven.value =
                    "SESUAI SCHEDULE PPIC";
                input_tanggalRencanaSelesaiKerjaWoven.select();
            }
        }
    );

    input_tanggalRencanaSelesaiKerjaWoven.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                input_warnaKarungWoven.focus();
            }
        }
    );

    input_warnaKarungWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (input_jumlahWarna.value > 0) {
                document.getElementById("warna_1").focus();
            } else {
                input_keterangan.focus();
            }
        }
    });

    input_jumlahWarna.addEventListener("input", function () {
        const max = 8;
        const min = 0;
        let value = parseInt(this.value);
        const container = additionalInputs;

        // Clamp the value between 0 and 8
        if (isNaN(value)) value = 0;
        value = Math.min(Math.max(value, min), max);
        this.value = value;

        // Clear existing inputs
        container.innerHTML = "";

        // Generate inputs in two columns
        for (let i = 1; i <= value; i++) {
            const col = document.createElement("div");
            col.className = "col-md-6 mb-2";

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.placeholder = `Warna ${i}`;
            input.name = `warna_${i}`;
            input.id = `warna_${i}`;

            // If this is the last input, add keypress event for Enter
            if (i === value) {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const txtArea =
                            document.getElementById("input_keterangan");
                        if (jenisOrderKerja == 1) {
                            txtArea.focus();
                        } else if (jenisOrderKerja == 2) {
                            input_rollStarpakPatch.focus();
                        }
                    }
                });
            } else {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const nextInput = document.getElementById(
                            `warna_${i + 1}`
                        );
                        if (nextInput) nextInput.focus();
                    }
                });
            }

            col.appendChild(input);
            container.appendChild(col);
        }
    });

    input_jumlahWarna.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            corakPrinting.focus();
        }
    });

    corakPrinting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (jenisOrderKerja == 1) {
                input_tanggalRencanaMulaiKerjaWoven.value =
                    "LIHAT SCHEDULE HARIAN";
                input_tanggalRencanaMulaiKerjaWoven.select();
            } else if (jenisOrderKerja == 2) {
                if (input_jumlahWarna.value > 0) {
                    document.getElementById("warna_1").focus();
                } else {
                    input_rollStarpakPatch.focus();
                }
            }
        }
    });

    input_rollStarpakPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_drumKliseStarpakPatch.focus();
        }
    });

    input_drumKliseStarpakPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_coronaStarpakPatch.value = 2000;
            input_coronaStarpakPatch.select();
        }
    });

    input_coronaStarpakPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahPatch.focus();
        }
    });

    input_jumlahPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarnaPatch.select();
        }
    });

    input_jumlahWarnaPatch.addEventListener("input", function () {
        const max = 8;
        const min = 0;
        let value = parseInt(this.value);
        const container = additionalInputsPatch;

        // Clamp the value between 0 and 8
        if (isNaN(value)) value = 0;
        value = Math.min(Math.max(value, min), max);
        this.value = value;

        // Clear existing inputs
        container.innerHTML = "";

        // Generate inputs in two columns
        for (let i = 1; i <= value; i++) {
            const col = document.createElement("div");
            col.className = "col-md-6 mb-2";

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.placeholder = `Warna Patch ${i}`;
            input.name = `warna_patch${i}`;
            input.id = `warna_patch${i}`;

            // If this is the last input, add keypress event for Enter
            if (i === value) {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        button_modalProses.focus();
                    }
                });
            } else {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const nextInput = document.getElementById(
                            `warna_patch${i + 1}`
                        );
                        if (nextInput) nextInput.focus();
                    }
                });
            }

            col.appendChild(input);
            container.appendChild(col);
        }
    });

    input_jumlahWarnaPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            corakPrintingPatch.focus();
        }
    });

    corakPrintingPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (input_jumlahWarnaPatch.value > 0) {
                document.getElementById("warna_patch1").focus();
            } else {
                button_modalProses.focus();
            }
        }
    });

    button_modalProses.addEventListener("click", function () {
        let warnaPrintingPatch;
        let kodeBarangSetengahJadiWoven;
        // === VALIDASI INPUTAN ===
        if (!NomorOrderKerja.value.trim()) {
            Swal.fire("Error", "Nomor Order Kerja harus diisi.", "error");
            return;
        }

        if (select_suratPesananTujuan.val() == null) {
            Swal.fire("Error", "Surat Pesanan harus dipilih.", "error");
            return;
        }

        if (!jenisOrderKerja) {
            Swal.fire("Error", "Jenis Order Kerja harus dipilih.", "error");
            return;
        }

        if (!packingSuratPesanan.value.trim()) {
            Swal.fire("Error", "Packing Surat Pesanan harus diisi.", "error");
            return;
        }

        if (!input_jumlahWarna.value) {
            Swal.fire(
                "Error",
                "Jumlah Warna harus diisi, kalau tidak ada warna diisi 0.",
                "error"
            );
            return;
        }

        if (input_jumlahWarna.value > 0 && !corakPrinting.value.trim()) {
            Swal.fire("Error", "Corak Printing harus diisi.", "error");
            return;
        }

        // Validasi jenisOrderKerja khusus
        if (jenisOrderKerja == 1) {
            if (!input_potongWoven.value.trim()) {
                Swal.fire("Error", "Potong Woven harus diisi.", "error");
                return;
            }
            if (!input_jahitAtasWoven.value.trim()) {
                Swal.fire("Error", "Jahit Atas Woven harus diisi.", "error");
                return;
            }
            if (!input_jahitBawahWoven.value.trim()) {
                Swal.fire("Error", "Jahit Bawah Woven harus diisi.", "error");
                return;
            }
            if (!input_warnaKarungWoven.value.trim()) {
                Swal.fire("Error", "Warna Karung Woven harus diisi.", "error");
                return;
            }

            const containerKBWoven = document.getElementById(
                "additionalInputsKBWoven"
            );
            if (input_jumlahKodeBarangSetengahJadiWoven.value > 0) {
                const kbInputsPatch = containerKBWoven.querySelectorAll(
                    "input[id^='kodeBarangSetengahJadiWoven_']"
                );
                for (let i = 0; i < kbInputsPatch.length; i++) {
                    if (!kbInputsPatch[i].value.trim()) {
                        Swal.fire(
                            "Error",
                            `Kode Barang Setengah Jadi ${i + 1} harus diisi.`,
                            "error"
                        );
                        return;
                    }
                }
            }
            // === BANGUN DATA KODE BARANG SETENGAH JADI ===
            if (input_jumlahKodeBarangSetengahJadiWoven.value > 0) {
                const kbInputsPatch = containerKBWoven.querySelectorAll("input[id^='kodeBarangSetengahJadiWoven_']"); //prettier-ignore
                var kodeBarangSetengahJadiWovenArray = [];
                kbInputsPatch.forEach((input) => {
                    kodeBarangSetengahJadiWovenArray.push(input.value.trim());
                });
            }
        } else if (jenisOrderKerja == 2) {
            if (!input_rollStarpak.value.trim()) {
                Swal.fire("Error", "Roll Body Starpak harus diisi.", "error");
                return;
            }
            if (!input_drumKliseStarpak.value.trim()) {
                Swal.fire("Error", "Drum Klise Starpak harus diisi.", "error");
                return;
            }
            if (!input_panjangPotonganStarpak.value.trim()) {
                Swal.fire(
                    "Error",
                    "Panjang Potongan Starpak harus diisi.",
                    "error"
                );
                return;
            }
            if (!input_coronaStarpak.value.trim()) {
                Swal.fire("Error", "Corona Starpak harus diisi.", "error");
                return;
            }
            if (!input_printMaxStarpak.value.trim()) {
                Swal.fire("Error", "Print Max Starpak harus diisi.", "error");
                return;
            }
            if (!input_airPermeabilityStarpak.value.trim()) {
                Swal.fire(
                    "Error",
                    "Air Permeability Starpak harus diisi.",
                    "error"
                );
                return;
            }
            if (!input_rollStarpakPatch.value.trim()) {
                Swal.fire("Error", "Roll Patch Starpak harus diisi.", "error");
                return;
            }
            if (
                input_jumlahWarnaPatch.value > 0 &&
                !corakPrintingPatch.value.trim()
            ) {
                Swal.fire(
                    "Error",
                    "Corak Printing Patch harus diisi.",
                    "error"
                );
                return;
            }
            if (!input_coronaStarpakPatch.value.trim()) {
                Swal.fire(
                    "Error",
                    "Corona Patch Starpak harus diisi.",
                    "error"
                );
                return;
            }
            if (
                input_jumlahWarnaPatch.value > 0 &&
                !input_jumlahPatch.value.trim()
            ) {
                Swal.fire("Error", "Jumlah Patch harus diisi.", "error");
                return;
            }

            warnaPrintingPatch = input_jumlahWarnaPatch.value;
            const containerPatch = document.getElementById(
                "additionalInputsPatch"
            );
            if (warnaPrintingPatch > 0) {
                const warnaInputsPatch = containerPatch.querySelectorAll(
                    "input[id^='warna_patch']"
                );
                for (let i = 0; i < warnaInputsPatch.length; i++) {
                    if (!warnaInputsPatch[i].value.trim()) {
                        Swal.fire(
                            "Error",
                            `Warna ${i + 1} harus diisi.`,
                            "error"
                        );
                        return;
                    }
                }
            }
            // === BANGUN DATA WARNA ===
            if (warnaPrintingPatch > 0) {
                const warnaInputsPatch = containerPatch.querySelectorAll("input[id^='warna_patch']"); //prettier-ignore
                warnaInputsPatch.forEach((input) => {
                    warnaPrintingPatch += " | " + input.value.trim();
                });
            }
        }

        // Validasi warna jika jumlah > 0
        let warnaPrinting = input_jumlahWarna.value;
        const container = document.getElementById("additionalInputs");
        if (warnaPrinting > 0) {
            const warnaInputs = container.querySelectorAll(
                "input[id^='warna_']"
            );
            for (let i = 0; i < warnaInputs.length; i++) {
                if (!warnaInputs[i].value.trim()) {
                    Swal.fire("Error", `Warna ${i + 1} harus diisi.`, "error");
                    return;
                }
            }
        }

        // === BANGUN DATA WARNA ===
        if (warnaPrinting > 0) {
            const warnaInputs = container.querySelectorAll("input[id^='warna_']"); //prettier-ignore
            warnaInputs.forEach((input) => {
                warnaPrinting += " | " + input.value.trim();
            });
        }

        // get data-id button_modalProses
        let idOrder = $("#button_modalProses").data("id");

        //proses input
        $.ajax({
            url: "/MaintenanceOrderKerjaABM",
            method: "POST",
            data: {
                jenisStore: idOrder ? "editOrderKerja" : "storeOrderKerja",
                idOrder: idOrder,
                NomorOrderKerja: NomorOrderKerja.value,
                TanggalRencanaMulaiKerja:
                    input_tanggalRencanaMulaiKerjaWoven.value,
                TanggalRencanaSelesaiKerja: input_tanggalRencanaSelesaiKerjaWoven.value, // prettier-ignore
                IDPesanan: select_suratPesananTujuan.val(),
                JenisOK: jenisOrderKerja, // prettier-ignore
                KBPrintingWoven: kodeBarangPrintingWoven.value,
                JumlahKBStghJadi: input_jumlahKodeBarangSetengahJadiWoven.value, // jumlah input
                KBSetengahJadiWovenArray: kodeBarangSetengahJadiWovenArray,
                WarnaPrinting: warnaPrinting,
                CorakPrinting: corakPrinting.value,
                KBPrintingStarpak: kodeBarangPrintingStarpak.value,
                Ukuran: input_ukuran.value,
                Rajutan: input_rajutan.value,
                Denier: input_denier.value,
                Packing: packingSuratPesanan.value,
                WarnaKarungWoven: input_warnaKarungWoven.value,
                PotongWoven: input_potongWoven.value,
                InnerWoven: input_innerWoven.value,
                JahitAtasWoven: input_jahitAtasWoven.value,
                JahitBawahWoven: input_jahitBawahWoven.value,
                DrumKliseStarpak: input_drumKliseStarpak.value,
                PanjangPotongStarpak: input_panjangPotonganStarpak.value,
                CoronaStarpak: input_coronaStarpak.value,
                AirPermeabilityStarpak: input_airPermeabilityStarpak.value,
                PrintMaxStarpak: input_printMaxStarpak.value,
                RollStarpak: input_rollStarpak.value,
                KertasStarpak: input_kertasStarpak.value,
                InnerStarpak: input_innerStarpak.value,
                SpoonBondStarpak: input_spoonBondStarpak.value,
                Keterangan: input_keterangan.value,
                RollPatch: input_rollStarpakPatch.value,
                DrumKliseStarpakPatch: input_drumKliseStarpakPatch.value,
                CorakPrintingPatch: corakPrintingPatch.value,
                WarnaPrintingPatch: warnaPrintingPatch,
                JumlahPatch: input_jumlahPatch.value,
                CoronaPatch: input_coronaStarpakPatch.value,
                _token: csrfToken,
            },
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                    });
                } else {
                    getDataOrderKerja();
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: data.success,
                    });
                    $("#tambahPermohonanOrderKerjaModal").modal("hide");
                }
            },
            error: function (xhr, status, error) {
                let errorMessage = "Terjadi kesalahan saat memproses data.";
                if (xhr.responseText) {
                    try {
                        const json = JSON.parse(xhr.responseText);
                        if (json.message) {
                            errorMessage = json.message;
                        } else {
                            errorMessage = xhr.responseText;
                        }
                    } catch (e) {
                        errorMessage = xhr.responseText;
                    }
                }

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage,
                });

                console.error("AJAX Error:", {
                    status: status,
                    error: error,
                    response: xhr.responseText,
                });
            },
        });
    });

    // table_orderKerja.on("click", "tbody tr", function () {
    //     let data = table_orderKerja.row(this).data();
    //     console.log(data);

    //     alert("You clicked on " + data.NomorOrderKerja + "'s row");
    // });

    $(document).on("click", ".btn-print", function (e) {
        var rowID = $(this).data("id");
        idOrder = rowID.split(" | ")[0];
        jenisOK = rowID.split(" | ")[1];
        console.log(rowID);

        // Open new tab directly
        window.open(
            `/MaintenanceOrderKerjaABM/printOrderKerja?idOrder=${idOrder}&jenisOK=${jenisOK}`,
            "_blank"
        );
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        tambahPermohonanOrderKerjaLabel.textContent =
            "Edit Order Kerja " + rowID.split(" | ")[2];
        idOrder = rowID.split(" | ")[0];
        jenisOK = rowID.split(" | ")[1];
        $("#button_modalProses").data("id", idOrder);
        clearAll();
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDetailOrderKerja",
            data: {
                IdOrderKerja: idOrder,
                JenisOK: jenisOK,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                if (response.dataDetailOrderKerja) {
                    select_jenisOrderKerja
                        .val(response.dataDetailOrderKerja[0].JenisOK)
                        .trigger("change")
                        .trigger("select2:select");
                    NomorOrderKerja.value = response.dataDetailOrderKerja[0].No_OK; //prettier-ignore
                    select_suratPesananTujuan.append(
                        new Option(response.dataDetailOrderKerja[0].IDSuratPesanan + ' | ' + response.dataDetailOrderKerja[0].KodeBarang, response.dataDetailOrderKerja[0].IdPesanan) // prettier-ignore
                    );
                    select_suratPesananTujuan
                        .val(response.dataDetailOrderKerja[0].IdPesanan)
                        .trigger("change");
                    customerSuratPesanan.value = response.dataDetailOrderKerja[0].NamaCust; //prettier-ignore
                    jumlahPesanan.value = response.dataDetailOrderKerja[0].Qty;
                    kodeBarangJadi.value = response.dataDetailOrderKerja[0].KodeBarang; //prettier-ignore
                    packingSuratPesanan.value = response.dataDetailOrderKerja[0].Packing; //prettier-ignore
                    namaBarang.textContent = response.dataDetailOrderKerja[0].NAMA_BRG; //prettier-ignore
                    input_ukuran.value = response.dataDetailOrderKerja[0].Ukuran; //prettier-ignore
                    input_rajutan.value = response.dataDetailOrderKerja[0].Rajutan; //prettier-ignore
                    input_denier.value = response.dataDetailOrderKerja[0].Denier; //prettier-ignore

                    if (jenisOrderKerja == 1) {
                        kodeBarangPrintingWoven.readOnly = true;
                        kodeBarangPrintingWoven.value = response.dataDetailOrderKerja[0].KBPrintingWoven; //prettier-ignore
                        namaBarangPrintingWoven.value = response.dataDetailOrderKerja[0].NamaBarangWovenPrinting; //prettier-ignore
                        let jumlahKBSetJadi = response.dataDetailOrderKerja[0].JumlahKBStghJadi || 0; //prettier-ignore
                        input_jumlahKodeBarangSetengahJadiWoven.readOnly = true;

                        input_jumlahKodeBarangSetengahJadiWoven.value = jumlahKBSetJadi; // prettier-ignore
                        input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
                            new Event("input")
                        );
                        if (jumlahKBSetJadi > 0) {
                            for (let i = 0; i <= jumlahKBSetJadi; i++) {
                                let kbInput = document.getElementById(
                                    `kodeBarangSetengahJadiWoven_${i + 1}`
                                );
                                let namabrgInput = document.getElementById(
                                    `namaBarangSetengahJadiWoven_${i + 1}`
                                );
                                if (kbInput) {
                                    // Construct the property name dynamically
                                    let propName =
                                        i === 0
                                            ? "KBSetengahJadiWoven"
                                            : `KBSetengahJadiWoven${i}`;
                                    kbInput.value =
                                        response.dataDetailOrderKerja[0][
                                            propName
                                        ] || "";
                                }
                                if (namabrgInput) {
                                    // Construct the property name dynamically
                                    let propName =
                                        i === 0
                                            ? "NamaBarangWovenSetengahJadi"
                                            : `NamaBarangWovenSetengahJadi${i}`;
                                    namabrgInput.value =
                                        response.dataDetailOrderKerja[0][
                                            propName
                                        ] || "";
                                }
                            }
                        }

                        input_potongWoven.value = response.dataDetailOrderKerja[0].PotongWoven; //prettier-ignore
                        input_innerWoven.value = response.dataDetailOrderKerja[0].InnerWoven // prettier-ignore
                        input_jahitAtasWoven.value = response.dataDetailOrderKerja[0].JahitAtasWoven; //prettier-ignore
                        input_jahitBawahWoven.value = response.dataDetailOrderKerja[0].JahitBawahWoven; //prettier-ignore
                        input_warnaKarungWoven.value = response.dataDetailOrderKerja[0].WarnaKarungWoven; //prettier-ignore
                        input_tanggalRencanaMulaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaMulaiKerja; //prettier-ignore
                        input_tanggalRencanaSelesaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaSelesaiKerja; //prettier-ignore
                    } else if (jenisOrderKerja == 2) {
                        kodeBarangPrintingStarpak.readOnly = true;
                        kodeBarangPrintingStarpakPatch.readOnly = true;
                        kodeBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].KBPrintingStarpak; //prettier-ignore
                        namaBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrinting; //prettier-ignore
                        kodeBarangPrintingStarpakPatch.value = response.dataDetailOrderKerja[0].KBPrintingStarpakPatch; //prettier-ignore
                        namaBarangPrintingStarpakPatch.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrintingPatch; //prettier-ignore
                        input_drumKliseStarpak.value = response.dataDetailOrderKerja[0].DrumKliseStarpak; //prettier-ignore
                        input_panjangPotonganStarpak.value = response.dataDetailOrderKerja[0].PanjangPotongStarpak; //prettier-ignore
                        input_coronaStarpak.value = response.dataDetailOrderKerja[0].CoronaStarpak; //prettier-ignore
                        input_printMaxStarpak.value = response.dataDetailOrderKerja[0].PrintMaxStarpak; //prettier-ignore
                        input_airPermeabilityStarpak.value = response.dataDetailOrderKerja[0].AirPermeabilityStarpak; //prettier-ignore
                        input_rollStarpak.value = response.dataDetailOrderKerja[0].RollStarpak; //prettier-ignore
                        input_kertasStarpak.value = response.dataDetailOrderKerja[0].KertasStarpak //prettier-ignore
                        input_innerStarpak.value = response.dataDetailOrderKerja[0].InnerStarpak //prettier-ignore
                        input_spoonBondStarpak.value = response.dataDetailOrderKerja[0].SpoonBondStarpak //prettier-ignore
                        input_rollStarpakPatch.value =response.dataDetailOrderKerja[0].RollPatch //prettier-ignore
                        input_drumKliseStarpakPatch.value = response.dataDetailOrderKerja[0].DrumKliseStarpakPatch //prettier-ignore
                        input_coronaStarpakPatch.value = response.dataDetailOrderKerja[0].CoronaPatch //prettier-ignore
                        input_jumlahPatch.value = response.dataDetailOrderKerja[0].JumlahPatch //prettier-ignore
                        let dataWarnaPatch = response.dataDetailOrderKerja?.[0]?.WarnaPrintingPatch?.split(" | ") || []; //prettier-ignore
                        input_jumlahWarnaPatch.value = dataWarnaPatch[0] ?? 0;
                        input_jumlahWarnaPatch.dispatchEvent(
                            new Event("input")
                        );
                        if (input_jumlahWarnaPatch.value > 0) {
                            for (let i = 1; i <= dataWarnaPatch[0]; i++) {
                                let warnaInput = document.getElementById(
                                    `warna_patch${i}`
                                );
                                if (warnaInput) {
                                    // Data warna starts from index 1 in dataWarnaPatch array
                                    warnaInput.value = dataWarnaPatch[i] || "";
                                }
                            }
                        }
                        corakPrintingPatch.value =response.dataDetailOrderKerja[0].CorakPrintingPatch //prettier-ignore
                    }

                    let dataWarna = response.dataDetailOrderKerja?.[0]?.WarnaPrinting?.split(" | ") || []; //prettier-ignore
                    input_jumlahWarna.value = dataWarna[0] ?? 0;
                    input_jumlahWarna.dispatchEvent(new Event("input"));
                    if (input_jumlahWarna.value > 0) {
                        for (let i = 1; i <= dataWarna[0]; i++) {
                            let warnaInput = document.getElementById(
                                `warna_${i}`
                            );
                            if (warnaInput) {
                                // Data warna starts from index 1 in dataWarna array
                                warnaInput.value = dataWarna[i] || "";
                            }
                        }
                    }
                    corakPrinting.value = response.dataDetailOrderKerja[0].CorakPrinting; //prettier-ignore
                    input_keterangan.value = response.dataDetailOrderKerja[0].Keterangan; //prettier-ignore

                    NomorOrderKerja.disabled = true;
                    select_suratPesananTujuan.prop("disabled", true);
                    select_jenisOrderKerja.prop("disabled", true);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-copy", function (e) {
        var rowID = $(this).data("id");
        tambahPermohonanOrderKerjaLabel.textContent =
            "Copy Order Kerja " + rowID.split(" | ")[2];
        idOrder = rowID.split(" | ")[0];
        jenisOK = rowID.split(" | ")[1];
        $("#button_modalProses").data("id", null);
        clearAll();
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDetailOrderKerja",
            data: {
                IdOrderKerja: idOrder,
                JenisOK: jenisOK,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                if (response.dataDetailOrderKerja) {
                    select_jenisOrderKerja
                        .val(response.dataDetailOrderKerja[0].JenisOK)
                        .trigger("change")
                        .trigger("select2:select");
                    select_suratPesananTujuan.empty();
                    select_suratPesananTujuan.val(null).trigger("change");
                    packingSuratPesanan.value = response.dataDetailOrderKerja[0].Packing; //prettier-ignore
                    input_ukuran.value = response.dataDetailOrderKerja[0].Ukuran; //prettier-ignore
                    input_rajutan.value = response.dataDetailOrderKerja[0].Rajutan; //prettier-ignore
                    input_denier.value = response.dataDetailOrderKerja[0].Denier; //prettier-ignore

                    if (jenisOrderKerja == 1) {
                        kodeBarangPrintingWoven.readOnly = false;
                        kodeBarangSetengahJadiWoven.readOnly = false;
                        kodeBarangPrintingWoven.value = response.dataDetailOrderKerja[0].KBPrintingWoven; //prettier-ignore
                        namaBarangPrintingWoven.value = response.dataDetailOrderKerja[0].NamaBarangWovenPrinting; //prettier-ignore
                        // kodeBarangSetengahJadiWoven.value = response.dataDetailOrderKerja[0].KBSetengahJadiWoven; //prettier-ignore
                        // namaBarangSetengahJadiWoven.value = response.dataDetailOrderKerja[0].NamaBarangWovenSetengahJadi; //prettier-ignore
                        input_potongWoven.value = response.dataDetailOrderKerja[0].PotongWoven; //prettier-ignore
                        input_innerWoven.value = response.dataDetailOrderKerja[0].InnerWoven // prettier-ignore
                        input_jahitAtasWoven.value = response.dataDetailOrderKerja[0].JahitAtasWoven; //prettier-ignore
                        input_jahitBawahWoven.value = response.dataDetailOrderKerja[0].JahitBawahWoven; //prettier-ignore
                        input_warnaKarungWoven.value = response.dataDetailOrderKerja[0].WarnaKarungWoven; //prettier-ignore
                        input_tanggalRencanaMulaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaMulaiKerja; //prettier-ignore
                        input_tanggalRencanaSelesaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaSelesaiKerja; //prettier-ignore
                    } else if (jenisOrderKerja == 2) {
                        kodeBarangPrintingStarpak.readOnly = false;
                        kodeBarangPrintingStarpakPatch.readOnly = false;
                        kodeBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].KBPrintingStarpak; //prettier-ignore
                        namaBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrinting; //prettier-ignore
                        kodeBarangPrintingStarpakPatch.value = response.dataDetailOrderKerja[0].KBPrintingStarpakPatch; //prettier-ignore
                        namaBarangPrintingStarpakPatch.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrintingPatch; //prettier-ignore
                        input_drumKliseStarpak.value = response.dataDetailOrderKerja[0].DrumKliseStarpak; //prettier-ignore
                        input_panjangPotonganStarpak.value = response.dataDetailOrderKerja[0].PanjangPotongStarpak; //prettier-ignore
                        input_coronaStarpak.value = response.dataDetailOrderKerja[0].CoronaStarpak; //prettier-ignore
                        input_printMaxStarpak.value = response.dataDetailOrderKerja[0].PrintMaxStarpak; //prettier-ignore
                        input_airPermeabilityStarpak.value = response.dataDetailOrderKerja[0].AirPermeabilityStarpak; //prettier-ignore
                        input_rollStarpak.value = response.dataDetailOrderKerja[0].RollStarpak; //prettier-ignore
                        input_kertasStarpak.value = response.dataDetailOrderKerja[0].KertasStarpak //prettier-ignore
                        input_innerStarpak.value = response.dataDetailOrderKerja[0].InnerStarpak //prettier-ignore
                        input_spoonBondStarpak.value = response.dataDetailOrderKerja[0].SpoonBondStarpak //prettier-ignore
                        input_rollStarpakPatch.value =response.dataDetailOrderKerja[0].RollPatch //prettier-ignore
                        input_drumKliseStarpakPatch.value = response.dataDetailOrderKerja[0].DrumKliseStarpakPatch //prettier-ignore
                        input_coronaStarpakPatch.value = response.dataDetailOrderKerja[0].CoronaPatch //prettier-ignore
                        input_jumlahPatch.value = response.dataDetailOrderKerja[0].JumlahPatch //prettier-ignore
                        let dataWarnaPatch = response.dataDetailOrderKerja?.[0]?.WarnaPrintingPatch?.split(" | ") || []; //prettier-ignore
                        input_jumlahWarnaPatch.value = dataWarnaPatch[0] ?? 0;
                        input_jumlahWarnaPatch.dispatchEvent(
                            new Event("input")
                        );
                        if (input_jumlahWarnaPatch.value > 0) {
                            for (let i = 1; i <= dataWarnaPatch[0]; i++) {
                                let warnaInput = document.getElementById(
                                    `warna_patch${i}`
                                );
                                if (warnaInput) {
                                    // Data warna starts from index 1 in dataWarnaPatch array
                                    warnaInput.value = dataWarnaPatch[i] || "";
                                }
                            }
                        }
                        corakPrintingPatch.value =response.dataDetailOrderKerja[0].CorakPrintingPatch //prettier-ignore
                    }

                    let dataWarna = response.dataDetailOrderKerja?.[0]?.WarnaPrinting?.split(" | ") || []; //prettier-ignore
                    input_jumlahWarna.value = dataWarna[0] ?? 0;
                    input_jumlahWarna.dispatchEvent(new Event("input"));
                    if (input_jumlahWarna.value > 0) {
                        for (let i = 1; i <= dataWarna[0]; i++) {
                            let warnaInput = document.getElementById(
                                `warna_${i}`
                            );
                            if (warnaInput) {
                                // Data warna starts from index 1 in dataWarna array
                                warnaInput.value = dataWarna[i] || "";
                            }
                        }
                    }
                    corakPrinting.value = response.dataDetailOrderKerja[0].CorakPrinting; //prettier-ignore
                    input_keterangan.value = response.dataDetailOrderKerja[0].Keterangan; //prettier-ignore

                    NomorOrderKerja.disabled = false;
                    select_suratPesananTujuan.prop("disabled", false);
                    select_jenisOrderKerja.prop("disabled", true);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text:
                "Apakah anda yakin untuk menghapus data nomor order kerja " +
                rowID.split(" | ")[2] +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/" + rowID.split(" | ")[0],
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            getDataOrderKerja();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Data permohonan tidak jadi dihapus :)",
                    "info"
                );
            }
        });
    });
    //#endregion
});
