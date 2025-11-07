jQuery(function ($) {
    //#region Get element by ID
    const changeEvent = new Event("change");
    const select_orderKerjaPrinting = $("#select_orderKerjaPrinting"); // prettier-ignore
    const select_suratPesananTujuan = $('#select_suratPesananTujuan'); // prettier-ignore
    const select_tabelHitungan = $('#select_tabelHitungan'); // prettier-ignore
    const twoDigitYear = new Date().getFullYear().toString().slice(-2); // prettier-ignore
    let base64Image;
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahOrderKerja = document.getElementById("button_tambahOrderKerja"); // prettier-ignore
    let cekNomorOrderKerja = document.getElementById("cekNomorOrderKerja"); // prettier-ignore
    let checkbox_patchIsEqual = document.getElementById("checkbox_patchIsEqual"); //prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let customerSuratPesanan = document.getElementById("customerSuratPesanan"); // prettier-ignore
    let dataNomorOrderKerjaTemp;
    let dataSuratPesananTemp;
    let dataTabelHitunganTemp;
    let div_kodeBarangProduksi = document.getElementById('div_kodeBarangProduksi'); // prettier-ignore
    let gambar_holePuncher = document.getElementById("gambar_holePuncher"); // prettier-ignore
    let input_denier = document.getElementById("input_denier"); // prettier-ignore
    let input_inner = document.getElementById("input_inner"); // prettier-ignore
    let input_lebarPotonganPatchAtas = document.getElementById('input_lebarPotonganPatchAtas'); //prettier-ignore
    let input_lebarPotonganPatchBawah = document.getElementById('input_lebarPotonganPatchBawah'); //prettier-ignore
    let input_panjangPotonganPatchAtas = document.getElementById('input_panjangPotonganPatchAtas'); //prettier-ignore
    let input_panjangPotonganPatchBawah = document.getElementById('input_panjangPotonganPatchBawah'); //prettier-ignore
    let input_rajutan = document.getElementById("input_rajutan"); // prettier-ignore
    let input_ukuran = document.getElementById("input_ukuran"); // prettier-ignore
    let jumlahPesanan = document.getElementById("jumlahPesanan"); // prettier-ignore
    let kodeBarangBody = document.getElementById('kodeBarangBody'); // prettier-ignore
    let kodeBarangJadi = document.getElementById("kodeBarangJadi"); // prettier-ignore
    let kodeBarangPatchAtas = document.getElementById('kodeBarangPatchAtas'); // prettier-ignore
    let kodeBarangPatchBawah = document.getElementById('kodeBarangPatchBawah'); // prettier-ignore
    let kodeBarangValve = document.getElementById('kodeBarangValve'); // prettier-ignore
    let label_kodeBarang = document.getElementById("label_kodeBarang"); // prettier-ignore
    let namaBarang = document.getElementById("namaBarang"); // prettier-ignore
    let namaBarangBody = document.getElementById('namaBarangBody'); // prettier-ignore
    let namaBarangPatchAtas = document.getElementById('namaBarangPatchAtas'); // prettier-ignore
    let namaBarangPatchBawah = document.getElementById('namaBarangPatchBawah'); // prettier-ignore
    let namaBarangValve = document.getElementById('namaBarangValve'); // prettier-ignore
    let NomorOrderKerja = document.getElementById("NomorOrderKerja"); // prettier-ignore
    let orderKerjaPrinting;
    let packingSuratPesanan = document.getElementById("packingSuratPesanan"); // prettier-ignore
    let sisaSaldo = document.getElementById("sisaSaldo"); // prettier-ignore
    let tambahPermohonanOrderKerjaLabel = document.getElementById("tambahPermohonanOrderKerjaLabel"); // prettier-ignore
    let title_Body = document.getElementById("title_Body"); // prettier-ignore
    let title_PatchAtas = document.getElementById("title_PatchAtas"); // prettier-ignore
    let title_PatchBawah = document.getElementById("title_PatchBawah"); // prettier-ignore
    let title_Valve = document.getElementById("title_Valve"); // prettier-ignore

    let table_orderKerja = $("#table_orderKerja").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        serverSide: true,
        ajax: {
            url: "/MaintenanceOrderKerjaADS/getDataPermohonanOrderKerja",
            type: "GET",
        },
        columns: [
            { data: "NomorOrderKerja" },
            { data: "NomorSP" },
            { data: "KodeBarang" },
            {
                data: "IdOrder",
                render: function (data, type, full, meta) {
                    let buttonLabel =
                        full.Aktif == 1 ? "Deactivate" : "Activate";
                    let toggleClass =
                        full.Aktif == 1 ? "btn-danger" : "btn-success";
                    let buttonEditLabel = (full.KBTopPatch != null && full.KBTopPatch !== "") ? "Edit" : "Isi KB";

                    return (
                        '<button class="btn btn-success btn-print" data-id="' +
                        data +
                        '">Cetak</button>' +
                        '<button class="btn btn-info btn-edit" data-id="' +
                        data +
                        " | " +
                        full.NomorOrderKerja +
                        '" data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">' +
                        buttonEditLabel +
                        "</button>" +
                        '<button class="btn ' +
                        toggleClass +
                        ' btn-delete" data-id="' +
                        data +
                        " | " +
                        full.NomorOrderKerja +
                        '">' +
                        buttonLabel +
                        "</button>" +
                        '<button class="btn btn-secondary btn-copy" data-id="' +
                        data +
                        " | " +
                        full.NomorOrderKerja +
                        '" data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">Copy</button>'
                    );
                },
            },
            {
                data: "Aktif", // hidden column
                visible: false, // make it invisible
                searchable: false, // optional, if you don't want it in search
            },
        ],
        orderFixed: {
            pre: [4, "desc"], // Always sort by Aktif first
        },
        columnDefs: [{ width: "23%", targets: [0, 1, 2] }],
    }); //prettier-ignore

    //#endregion

    //#region Load Form
    initModal();
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

    function initModal() {
        select_orderKerjaPrinting.select2({
            dropdownParent: $("#div_select_orderKerjaPrinting"),
            placeholder: "Pilih Order Kerja Printing",
            allowClear: true,
        });
        $("#select_orderKerjaPrinting").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
        select_suratPesananTujuan.select2({
            dropdownParent: $("#div_select_suratPesananTujuan"),
            placeholder: "Pilih Surat Pesanan",
            allowClear: true,
        });
        $("#select_suratPesananTujuan").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
        select_tabelHitungan.select2({
            dropdownParent: $("#div_select_tabelHitungan"),
            placeholder: "Pilih Kode Barang Tabel Hitungan",
            allowClear: true,
        });
        $("#select_tabelHitungan").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function clearAll() {
        cekNomorOrderKerja.innerHTML = "";
        customerSuratPesanan.value = "";
        jumlahPesanan.value = "";
        kodeBarangJadi.value = "";
        sisaSaldo.value = "";
        packingSuratPesanan.value = "";
        namaBarang.innerHTML = "";
        checkbox_patchIsEqual.checked = false;
        checkbox_patchIsEqual.dispatchEvent(changeEvent);
        kodeBarangBody.value = "";
        namaBarangBody.value = "";
        kodeBarangValve.value = "";
        namaBarangValve.value = "";
        kodeBarangPatchAtas.value = "";
        namaBarangPatchAtas.value = "";
        kodeBarangPatchBawah.value = "";
        namaBarangPatchBawah.value = "";
        input_ukuran.value = "";
        input_rajutan.value = "";
        input_denier.value = "";
        input_airPermeability.value = "";
        input_warnaKarung.value = "";
        input_lebarBB.value = "";
        input_kertas.value = "";
        input_inner.value = "";
        input_spoonBond.value = "";
        input_lami.value = "";
        input_opp.value = "";
        input_roll.value = "";
        input_corakBody.value = "";
        input_drumKliseBody.value = "";
        input_rollPatchAtas.value = "";
        input_corakPatchAtas.value = "";
        input_panjangPotonganPatchAtas.value = "";
        input_lebarPotonganPatchAtas.value = "";
        input_rollPatchBawah.value = "";
        input_corakPatchBawah.value = "";
        input_panjangPotonganPatchBawah.value = "";
        input_lebarPotonganPatchBawah.value = "";
        input_rollValve.value = "";
        input_lebarValve.value = "";
        input_panjangValve.value = "";
        input_keterangan.value = "";
        gambar_holePuncher.value = "";
        previewImg.src = "#";
        previewImg.style.display = "none";
    }

    function loadDataSelect2() {
        $.ajax({
            url: "/MaintenanceOrderKerjaADS/getDataOrderKerja",
            method: "GET",
            dataType: "json",
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    let foundOrder = data.NomorOrderKerja.find(function (item) {
                        return item.No_OK.substring(0, 2) == twoDigitYear;
                    });

                    if (foundOrder) {
                        NomorOrderKerja.value = parseInt(foundOrder.No_OK) + 1;
                    } else {
                        NomorOrderKerja.value = twoDigitYear + "0001";
                    }

                    dataNomorOrderKerjaTemp = data.NomorOrderKerja;
                    dataSuratPesananTemp = data.dataSuratPesanan;
                    dataTabelHitunganTemp = data.dataTabelHitungan;
                    // Populate select2 elements
                    select_orderKerjaPrinting.empty(); // Clear existing options
                    select_suratPesananTujuan.empty();
                    select_tabelHitungan.empty();

                    data.NomorOrderKerja.forEach(function (item) {
                        select_orderKerjaPrinting.append(
                            new Option(item.No_OK + ' | ' + item.NamaCust, item.IdOrder) // prettier-ignore
                        );
                    });
                    select_orderKerjaPrinting.val(null).trigger("change");
                    select_orderKerjaPrinting.prop("disabled", false);

                    data.dataSuratPesanan.forEach(function (item) {
                        select_suratPesananTujuan.append(
                            new Option(item.IDSuratPesanan + ' | ' + item.NamaCust, item.IDPesanan) // prettier-ignore
                        );
                    });
                    select_suratPesananTujuan.val(null).trigger("change");
                    select_suratPesananTujuan.prop("disabled", false);

                    data.dataTabelHitungan.forEach(function (item) {
                        select_tabelHitungan.append(
                            new Option(item.Nama_brg, item.id) // prettier-ignore
                        );
                    });
                    select_tabelHitungan.val(null).trigger("change");
                    select_tabelHitungan.prop("disabled", false);
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
    }

    function checkPattern(input) {
        let value = input.trim();
        // Supports:
        // 100 x 200
        // 50 x 57 + 16
        // 50 x 57 - 10
        // 10 + 10 x 10
        // 10 - 5 x 20
        let pattern =
            /^\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?$/;
        // Breakdown of Regex:
        // \d+\s*[xX]\s*\d+     → base format (PANJANG X LEBAR)
        // (?:\s*[\+\-]\s*\d+)? → optional part with + or - and a number
        return pattern.test(value);
    }

    setInputFilter(
        NomorOrderKerja,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangBody,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangPatchAtas,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangPatchBawah,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );

    setInputFilter(
        kodeBarangValve,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );
    // setInputFilter(
    //     stdWaktu,
    //     function (value) {
    //         return /^-?\d*[.]?\d*$/.test(value); // Allow only digits
    //     },
    //     "Only digits are allowed"
    // );
    //#endregion

    //#region Event Listener
    document.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const target = e.target;
            if (target.tagName === "INPUT" && target.type === "number") {
                e.preventDefault(); // prevent form submission if inside a form
                if (target.value == "") {
                    target.value = 0;
                }
            }
        }
    });

    button_tambahOrderKerja.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahPermohonanOrderKerjaLabel.textContent = "Tambah Order Kerja";
        div_kodeBarangProduksi.classList.remove("show-important-block");
        div_kodeBarangProduksi.classList.add("hide-important");
        label_kodeBarang.classList.remove("show-important");
        label_kodeBarang.classList.add("hide-important");
        loadDataSelect2();
        clearAll();
    });

    $("#tambahPermohonanOrderKerjaModal").on(
        "shown.bs.modal",
        function (event) {
            setTimeout(() => {
                select_orderKerjaPrinting.select2("open");
            }, 250); // delay in milliseconds (adjust as needed)
        }
    );

    select_orderKerjaPrinting.on("select2:select", function () {
        orderKerjaPrinting = select_orderKerjaPrinting.val();

        let foundOrder = dataNomorOrderKerjaTemp.find(function (item) {
            return item.IdOrder == orderKerjaPrinting;
        });

        if (foundOrder) {
            NomorOrderKerja.value = foundOrder.No_OK;
            kodeBarangBody.value = foundOrder.KBPrintingStarpak ?? ""; // prettier-ignore
            namaBarangBody.value = foundOrder.NamaBarangPrintingStarpak ?? ""; // prettier-ignore
            input_roll.value = foundOrder.RollStarpak ?? ""; // prettier-ignore
            input_corakBody.value = foundOrder.CorakPrinting ?? ""; // prettier-ignore
            input_drumKliseBody.value = numeral(foundOrder.DrumKliseStarpak).value() ?? ""; // prettier-ignore
            input_rollPatchAtas.value = foundOrder.RollPatchAtas ?? ""; // prettier-ignore
            input_corakPatchAtas.value = foundOrder.CorakPrintingPatchAtas ?? ""; // prettier-ignore
            input_rollPatchBawah.value = foundOrder.RollPatchBawah ?? ""; // prettier-ignore
            input_corakPatchBawah.value = foundOrder.CorakPrintingPatchBawah ?? ""; // prettier-ignore

            if (
                foundOrder.KBPrintingStarpakPatchAtas ==
                foundOrder.KBPrintingStarpakPatchBawah
            ) {
                checkbox_patchIsEqual.checked = true;
                checkbox_patchIsEqual.dispatchEvent(changeEvent);
            } else {
                checkbox_patchIsEqual.checked = false;
                checkbox_patchIsEqual.dispatchEvent(changeEvent);
            }
        }

        let foundSuratPesanan = dataSuratPesananTemp.find(function (item) {
            return item.IDPesanan == foundOrder.IdPesanan;
        });

        select_suratPesananTujuan
            .val(foundSuratPesanan.IDPesanan)
            .trigger("change")
            .trigger("select2:select");
        $("#select_suratPesananTujuan").prop("disabled", true);
        NomorOrderKerja.focus();
    });

    select_orderKerjaPrinting.on("select2:clear", function () {
        orderKerjaPrinting = null; // reset variable
        NomorOrderKerja.value = twoDigitYear + "0001";
        select_suratPesananTujuan.val(null).trigger("change");
        $("#select_suratPesananTujuan").prop("disabled", false);
        namaBarang.textContent = "";
        customerSuratPesanan.value = "";
        jumlahPesanan.value = "";
        kodeBarangJadi.value = "";
        packingSuratPesanan.value = "";

        NomorOrderKerja.focus(); // optionally refocus
    });

    NomorOrderKerja.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            // Clear existing options
            if (NomorOrderKerja.value == "") {
                this.setCustomValidity("Nomor Order Kerja tidak boleh kosong"); // prettier-ignore
                NomorOrderKerja.classList.add("input-error");
                this.reportValidity();
                return;
            }

            // check apakah nomor order kerja sudah ada, kalau sudah ada filter surat pesanan berdasarkan kode barang yang sama
            $.ajax({
                url: "/MaintenanceOrderKerjaADS/checkNomorOrderKerja",
                method: "GET",
                data: {
                    NomorOrderKerja: NomorOrderKerja.value,
                    _token: csrfToken,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    if (data.success) {
                        if (
                            parseInt(
                                data.cekNomorOrderKerja[0].JumlahNomorOrderKerja
                            ) == 0
                        ) {
                            cekNomorOrderKerja.innerHTML = "Order Kerja Baru"; // prettier-ignore
                            cekNomorOrderKerja.style.color = "green";
                            cekNomorOrderKerja.style.fontSize = "";
                            sisaSaldo.focus();
                        } else {
                            cekNomorOrderKerja.innerHTML = "Order Kerja Sudah ada"; // prettier-ignore
                            cekNomorOrderKerja.style.color = "red";
                            cekNomorOrderKerja.style.fontSize = "14px";
                        }
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
        if (dataSuratPesananTemp) {
            let selectedItem = dataSuratPesananTemp.find(
                (item) => item.IDPesanan == selectedId
            );
            if (selectedItem) {
                namaBarang.textContent = selectedItem.NAMA_BRG;
                customerSuratPesanan.value = selectedItem.NamaCust;
                jumlahPesanan.value = numeral(selectedItem.Qty).format(
                    "0,0.00"
                );
                kodeBarangJadi.value = selectedItem.KodeBarang;
                packingSuratPesanan.value = selectedItem.Ket;
            }
        }
        if (dataTabelHitunganTemp) {
            let namaBarangPesananSesuaiTabelHitungan = namaBarang.textContent.split("/")[0]; //prettier-ignore
            let selectedTabelHitungan = dataTabelHitunganTemp.find(
                (item) => item.Nama_brg == namaBarangPesananSesuaiTabelHitungan
            );
            if (selectedTabelHitungan) {
                select_tabelHitungan
                    .val(selectedTabelHitungan.id)
                    .trigger("change")
                    .trigger("select2:select");
            }
        }
    });

    sisaSaldo.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            packingSuratPesanan.focus();
        }
    });

    packingSuratPesanan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            kodeBarangBody.focus();
        }
    });

    checkbox_patchIsEqual.addEventListener("change", function () {
        if (this.checked) {
            kodeBarangPatchBawah.style.display = "none";
            namaBarangPatchBawah.style.display = "none";
            kodeBarangPatchAtas.placeholder = "KB Patch"; //prettier-ignore
            namaBarangPatchAtas.placeholder = "Nama Barang Patch"; //prettier-ignore
            title_PatchAtas.innerHTML = "Patch";
            [div_rollPatchBawah].forEach((el) => {
                el.classList.remove("show-important");
                el.classList.add("hide-important");
            });
            [title_PatchBawah].forEach((el) => {
                el.classList.remove("show-important-block");
                el.classList.add("hide-important");
            });
            label_rollPatchAtas.innerHTML = "Roll Patch";
            label_corakPatchAtas.innerHTML = "Corak Printing Patch";
            label_panjangPotonganPatchAtas.innerHTML = "Panjang Potongan Patch";
            label_lebarPotonganPatchAtas.innerHTML = "Lebar Potongan Patch";
        } else {
            kodeBarangPatchBawah.style.display = "block";
            namaBarangPatchBawah.style.display = "block";
            kodeBarangPatchAtas.placeholder = "KB Patch Atas"; // prettier-ignore
            namaBarangPatchAtas.placeholder = "Nama Barang Patch Atas"; // prettier-ignore
            title_PatchAtas.innerHTML = "Patch Atas";
            [div_rollPatchBawah].forEach((el) => {
                el.classList.add("show-important");
                el.classList.remove("hide-important");
            });
            [title_PatchBawah].forEach((el) => {
                el.classList.add("show-important-block");
                el.classList.remove("hide-important");
            });
            label_rollPatchAtas.innerHTML = "Roll Patch Atas";
            label_corakPatchAtas.innerHTML = "Corak Printing Patch Atas";
            label_panjangPotonganPatchAtas.innerHTML = "Panjang Potongan Patch Atas"; // prettier-ignore
            label_lebarPotonganPatchAtas.innerHTML = "Lebar Potongan Patch Atas"; // prettier-ignore
        }
    });

    kodeBarangBody.addEventListener("keypress", function (e) {
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
                    url: "/MaintenanceOrderKerjaADS/getDataBarangByKodeBarang",
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
                                namaBarangBody.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                kodeBarangValve.focus();
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

    kodeBarangValve.addEventListener("keypress", function (e) {
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
                    url: "/MaintenanceOrderKerjaADS/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "HASIL SLITTEC",
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
                                    text: "Barang tidak masuk sub kategori HASIL SLITTEC.",
                                });
                            } else {
                                namaBarangValve.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                kodeBarangPatchAtas.focus();
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

    kodeBarangPatchAtas.addEventListener("keypress", function (e) {
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
                    url: "/MaintenanceOrderKerjaADS/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "HASIL SLITTEC",
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
                                    text: "Barang tidak masuk sub kategori HASIL SLITTEC.",
                                });
                            } else {
                                namaBarangPatchAtas.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                if (checkbox_patchIsEqual.checked) {
                                    if (select_orderKerjaPrinting.val()) {
                                        input_ukuran.focus();
                                    } else {
                                        select_tabelHitungan.select2("open");
                                    }
                                } else {
                                    kodeBarangPatchBawah.focus();
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
    });

    kodeBarangPatchBawah.addEventListener("keypress", function (e) {
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
                    url: "/MaintenanceOrderKerjaADS/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "HASIL SLITTEC",
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
                                    text: "Barang tidak masuk sub kategori HASIL SLITTEC.",
                                });
                            } else {
                                namaBarangPatchBawah.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                if (select_orderKerjaPrinting.val()) {
                                    input_ukuran.focus();
                                } else {
                                    select_tabelHitungan.select2("open");
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
    });

    select_tabelHitungan.on("select2:select", function () {
        let selectedId = $(this).val();
        if (dataTabelHitunganTemp) {
            let selectedItem = dataTabelHitunganTemp.find(
                (item) => item.id == selectedId
            );
            if (selectedItem) {
                input_ukuran.value =
                    numeral(selectedItem.Width).value() +
                    " X " +
                    numeral(selectedItem.Height).value();
                input_rajutan.value =
                    numeral(selectedItem.Warp).value() +
                    " X " +
                    numeral(selectedItem.Weft).value();
                input_denier.value = numeral(selectedItem.Denier).value();
                input_airPermeability.value = numeral(selectedItem.AirPermeability).value(); // prettier-ignore
                input_warnaKarung.value = selectedItem.WarnaKarung.trim();
                input_lebarBB.value = numeral(selectedItem.LebarBlockBottom).value(); // prettier-ignore
                input_kertas.value = numeral(selectedItem.Kertas).value();
                input_inner.value = numeral(selectedItem.Inner).value();
                input_spoonBond.value = numeral(selectedItem.SpoonBond).value();
                input_lami.value = numeral(selectedItem.Lami).value();
                input_opp.value = numeral(selectedItem.OPP).value();
                input_panjangPotonganPatchAtas.value = numeral(selectedItem.TopLength).value(); // prettier-ignore
                input_lebarPotonganPatchAtas.value = numeral(selectedItem.TopWidth).value(); // prettier-ignore
                input_panjangPotonganPatchBawah.value = numeral(selectedItem.BotLength).value(); // prettier-ignore
                input_lebarPotonganPatchBawah.value = numeral(selectedItem.BotWidth).value(); // prettier-ignore
                input_lebarValve.value = numeral(selectedItem.ValveWidth).value(); // prettier-ignore
                input_panjangValve.value = numeral(selectedItem.ValveHeight).value(); // prettier-ignore
            }
        }
        input_ukuran.focus();
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
            input_airPermeability.focus();
        }
    });

    input_airPermeability.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_warnaKarung.focus();
        }
    });

    input_warnaKarung.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_lebarBB.focus();
        }
    });

    input_lebarBB.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_kertas.focus();
        }
    });

    input_kertas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_inner.focus();
        }
    });

    input_inner.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_spoonBond.focus();
        }
    });

    input_spoonBond.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_lami.focus();
        }
    });

    input_lami.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_opp.focus();
        }
    });

    input_opp.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_roll.focus();
        }
    });

    input_roll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_corakBody.focus();
        }
    });

    input_corakBody.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_drumKliseBody.focus();
        }
    });

    input_drumKliseBody.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_rollPatchAtas.focus();
        }
    });

    input_rollPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_corakPatchAtas.focus();
        }
    });

    input_corakPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_panjangPotonganPatchAtas.focus();
        }
    });

    input_panjangPotonganPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_lebarPotonganPatchAtas.focus();
        }
    });

    input_lebarPotonganPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (checkbox_patchIsEqual.checked) {
                input_rollValve.focus();
            } else {
                input_rollPatchBawah.focus();
            }
        }
    });

    input_rollPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_corakPatchBawah.focus();
        }
    });

    input_corakPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_panjangPotonganPatchBawah.focus();
        }
    });

    input_panjangPotonganPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_lebarPotonganPatchBawah.focus();
        }
    });

    input_lebarPotonganPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_rollValve.focus();
        }
    });

    input_rollValve.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_lebarValve.focus();
        }
    });

    input_lebarValve.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_panjangValve.focus();
        }
    });

    input_panjangValve.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_keterangan.focus();
        }
    });

    gambar_holePuncher.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
                previewImg.dataset.base64 = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    clearImage.addEventListener("click", function () {
        gambar_holePuncher.value = "";
        previewImg.src = "#";
        previewImg.style.display = "none";
    });

    button_modalProses.addEventListener("click", function () {
        // get data-id button_modalProses
        let idOrder = $("#button_modalProses").data("id");

        // === VALIDASI INPUTAN ===
        if (!NomorOrderKerja.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Nomor Order Kerja harus diisi.",
                returnFocus: false,
            }).then(() => {
                NomorOrderKerja.focus();
            });
            return;
        }

        if (select_suratPesananTujuan.val() == null) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Surat Pesanan harus diisi.",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    select_suratPesananTujuan.select2("open");
                }, 250); // delay in milliseconds (adjust as needed)
            });
            return;
        }

        if (checkbox_patchIsEqual.checked) {
            kodeBarangPatchBawah.value = kodeBarangPatchAtas.value; //prettier-ignore
            input_rollPatchBawah.value = input_rollPatchAtas.value;
            input_corakPatchBawah.value = input_corakPatchAtas.value;
            input_panjangPotonganPatchBawah.value = input_panjangPotonganPatchAtas.value; //prettier-ignore
            input_lebarPotonganPatchBawah.value = input_lebarPotonganPatchAtas.value; //prettier-ignore
        }

        if (!kodeBarangBody.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Kode Barang Body harus diisi.",
                returnFocus: false,
            }).then(() => {
                kodeBarangBody.focus();
            });
            return;
        }
        if (idOrder) {
            if (!kodeBarangValve.value.trim()) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Kode Barang Valve harus diisi.",
                    returnFocus: false,
                }).then(() => {
                    kodeBarangValve.focus();
                });
                return;
            }

            if (!kodeBarangPatchAtas.value.trim()) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Kode Barang Patch Atas harus diisi.",
                    returnFocus: false,
                }).then(() => {
                    kodeBarangValve.focus();
                });
                return;
            }

            if (!kodeBarangPatchBawah.value.trim()) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Kode Barang Patch Bawah harus diisi.",
                    returnFocus: false,
                }).then(() => {
                    kodeBarangPatchBawah.focus();
                });
                return;
            }
        }

        if (!input_ukuran.value) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ukuran harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_ukuran.focus();
            });
            return;
        } else {
            if (!checkPattern(input_ukuran.value)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ukuran harus diisi sesuai format. Format harus PANJANG X LEBAR, contoh: 100 X 200.",
                    returnFocus: false,
                }).then(() => {
                    input_ukuran.focus();
                });
                return;
            }
        }

        if (!input_rajutan.value) {
            Swal.fire("Error", "Rajutan tidak boleh kosong.", "error");
            input_rajutan.focus();
            return;
        } else {
            if (!checkPattern(input_rajutan.value)) {
                Swal.fire(
                    "Error",
                    "Rajutan harus diisi sesuai format. Format harus WA X WE, contoh: 10 X 10.",
                    "error"
                );
                input_rajutan.focus();
                return;
            }
        }

        if (!input_denier.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Denier harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_denier.focus();
            });
            return;
        }

        if (!input_airPermeability.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Air Permeability harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_airPermeability.focus();
            });
            return;
        }

        if (!input_warnaKarung.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Warna Karung harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_warnaKarung.focus();
            });
            return;
        }

        if (!input_lebarBB.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Lebar Block Bottom harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_lebarBB.focus();
            });
            return;
        }

        if (!input_kertas.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Komponen Kertas harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_kertas.focus();
            });
            return;
        }

        if (!input_inner.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Komponen Inner harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_inner.focus();
            });
            return;
        }

        if (!input_spoonBond.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Komponen Spoon Bond harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_spoonBond.focus();
            });
            return;
        }

        if (!input_lami.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Komponen Lami harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_lami.focus();
            });
            return;
        }

        if (!input_opp.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Komponen OPP harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_opp.focus();
            });
            return;
        }

        if (!input_roll.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Roll Body harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_roll.focus();
            });
            return;
        }

        if (!input_corakBody.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Corak Body harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_corakBody.focus();
            });
            return;
        }

        if (!input_drumKliseBody.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Drum Klise Body harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_drumKliseBody.focus();
            });
            return;
        }

        if (!input_rollPatchAtas.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Roll Patch Atas harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_rollPatchAtas.focus();
            });
            return;
        }

        if (!input_corakPatchAtas.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Corak Patch Atas harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_corakPatchAtas.focus();
            });
            return;
        }

        if (!input_panjangPotonganPatchAtas.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Panjang Potongan Patch Atas harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_panjangPotonganPatchAtas.focus();
            });
            return;
        }

        if (!input_lebarPotonganPatchAtas.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Lebar Potongan Patch Atas harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_lebarPotonganPatchAtas.focus();
            });
            return;
        }

        if (!input_rollPatchBawah.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Roll Patch Bawah harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_rollPatchBawah.focus();
            });
            return;
        }

        if (!input_corakPatchBawah.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Corak Patch Bawah harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_corakPatchBawah.focus();
            });
            return;
        }

        if (!input_panjangPotonganPatchBawah.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Panjang Potongan Patch Bawah harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_panjangPotonganPatchBawah.focus();
            });
            return;
        }

        if (!input_lebarPotonganPatchBawah.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Lebar Potongan Patch Bawah harus diisi.",
                returnFocus: false,
            }).then(() => {
                input_lebarPotonganPatchBawah.focus();
            });
            return;
        }

        if (
            (kodeBarangPatchAtas.value.trim() &&
                !kodeBarangPatchBawah.value.trim()) ||
            (!kodeBarangPatchAtas.value.trim() &&
                kodeBarangPatchBawah.value.trim())
        ) {
            Swal.fire(
                "Error",
                "Kode Barang Patch Atas dan Bawah harus diisi keduanya.",
                "error"
            );
            return;
        }

        // get data order kerja printing
        const selectedOrderKerjaPrinting = select_orderKerjaPrinting.select2("data")[0]; // prettier-ignore

        //proses input
        let formData = new FormData();
        formData.append("jenisStore", idOrder ? "editOrderKerja" : "storeOrderKerja"); // prettier-ignore
        formData.append("IdOrder", idOrder); // prettier-ignore
        formData.append("No_Ok", NomorOrderKerja.value); // prettier-ignore
        formData.append("IdOrderPrinting", select_orderKerjaPrinting.val()); // prettier-ignore
        formData.append("No_OkPrinting", selectedOrderKerjaPrinting.text.split(" | ")[0]); // prettier-ignore
        formData.append("KBTabelHitungan", select_tabelHitungan.select2('data')[0].text); // prettier-ignore
        formData.append("IdTabelHitungan", select_tabelHitungan.val()); // prettier-ignore
        formData.append("Ukuran", input_ukuran.value); // prettier-ignore
        formData.append("Rajutan", input_rajutan.value); // prettier-ignore
        formData.append("Denier", input_denier.value); // prettier-ignore
        formData.append("WarnaKarung", input_warnaKarung.value); // prettier-ignore
        formData.append("InnerStarpak", input_inner.value); // prettier-ignore
        formData.append("Lami", input_lami.value); // prettier-ignore
        formData.append("Kertas", input_kertas.value); // prettier-ignore
        formData.append("SpoonBond", input_spoonBond.value); // prettier-ignore
        formData.append("OPP", input_opp.value); // prettier-ignore
        formData.append("LebarBlockBottom", input_lebarBB.value); // prettier-ignore
        formData.append("AirPermeability", input_airPermeability.value); // prettier-ignore
        formData.append("IdPesanan", select_suratPesananTujuan.val()); // prettier-ignore
        formData.append("SisaSaldoInventory", sisaSaldo.value); // prettier-ignore
        formData.append("KBBody", kodeBarangBody.value); // prettier-ignore
        formData.append("RollBody", input_roll.value); // prettier-ignore
        formData.append("CorakBody", input_corakBody.value); // prettier-ignore
        formData.append("DrumKliseBody", input_drumKliseBody.value); // prettier-ignore
        formData.append("KBTopPatch", kodeBarangPatchAtas.value); // prettier-ignore
        formData.append("RollTopPatch", input_rollPatchAtas.value); // prettier-ignore
        formData.append("CorakTopPatch", input_corakPatchAtas.value); // prettier-ignore
        formData.append("LebarTopPatch", input_lebarPotonganPatchAtas.value); // prettier-ignore
        formData.append("PanjangTopPatch", input_panjangPotonganPatchAtas.value); // prettier-ignore
        formData.append("KBBottomPatch", kodeBarangPatchBawah.value); // prettier-ignore
        formData.append("RollBottomPatch", input_rollPatchBawah.value); // prettier-ignore
        formData.append("CorakBottomPatch", input_corakPatchBawah.value); // prettier-ignore
        formData.append("LebarBottomPatch", input_lebarPotonganPatchBawah.value); // prettier-ignore
        formData.append("PanjangBottomPatch", input_panjangPotonganPatchBawah.value); // prettier-ignore
        formData.append("KBValve", kodeBarangValve.value); // prettier-ignore
        formData.append("RollValve", input_rollValve.value); // prettier-ignore
        formData.append("LebarValve", input_lebarValve.value); // prettier-ignore
        formData.append("PanjangValve", input_panjangValve.value); // prettier-ignore
        formData.append("Packing", packingSuratPesanan.value); // prettier-ignore
        formData.append("Keterangan", input_keterangan.value); // prettier-ignore
        if (gambar_holePuncher.files.length > 0) {
            // User selected a new file, append it
            formData.append("GambarHolePuncher", gambar_holePuncher.files[0]);
        } else {
            // No new file selected, send existing Base64 (if available)
            formData.append("GambarHolePuncher_existing", base64Image || "");
        }
        formData.append("_token", csrfToken); // prettier-ignore

        $.ajax({
            url: "/MaintenanceOrderKerjaADS",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                    });
                } else {
                    table_orderKerja.ajax.reload();
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

    $(document).on("click", ".btn-print", function (e) {
        var rowID = $(this).data("id");
        idOrder = rowID;
        console.log(rowID);

        //  new tab directly
        window.open(
            `/MaintenanceOrderKerjaADS/printOrderKerja?idOrder=${idOrder}`,
            "_blank"
        );
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        tambahPermohonanOrderKerjaLabel.textContent = "Edit Order Kerja " + rowID.split(" | ")[1]; // prettier-ignore
        idOrder = rowID.split(" | ")[0];
        label_kodeBarang.classList.add("show-important");
        label_kodeBarang.classList.remove("hide-important");
        div_kodeBarangProduksi.classList.add("show-important-block");
        div_kodeBarangProduksi.classList.remove("hide-important");
        $("#button_modalProses").data("id", idOrder);
        clearAll();
        // $.ajax({
        //     url: "/MaintenanceOrderKerjaADS/getDetailOrderKerja",
        //     data: {
        //         IdOrderKerja: idOrder,
        //         _token: csrfToken,
        //     },
        //     type: "GET",
        //     success: function (response) {
        //         console.log(response);
        //         console.log(response.dataDetailOrderKerja);
        //         if (response.dataDetailOrderKerja) {
        //             NomorOrderKerja.disabled = true;
        //             select_suratPesananTujuan.prop("disabled", true);
        //             select_orderKerjaPrinting.prop("disabled", true);
        //         } else {
        //             Swal.fire({
        //                 icon: "error",
        //                 title: "Terjadi Kesalahan!",
        //                 text: response.error,
        //             });
        //         }
        //     },
        //     error: function (xhr, status, error) {
        //         console.error("Error fetching data: ", error);
        //     },
        // });
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
                    NomorOrderKerja.disabled = false;
                    select_suratPesananTujuan.prop("disabled", false);
                    select_orderKerjaPrinting.prop("disabled", true);
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
                rowID.split(" | ")[1] +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceOrderKerjaADS/" + rowID.split(" | ")[0],
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
                            table_orderKerja.ajax.reload();
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
