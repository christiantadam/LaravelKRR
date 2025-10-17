jQuery(function ($) {
    //#region Get element by ID
    const barcodeContainer = document.getElementById("barcodeContainer");
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser").value;
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi"); // prettier-ignore
    let input_barcodeAsal = document.getElementById("input_barcodeAsal");
    let nama_barangAsal = document.getElementById("nama_barangAsal");
    let saldo_typePrimerAsal = document.getElementById('saldo_typePrimerAsal'); // prettier-ignore
    let satuan_saldoTypePrimerAsal = document.getElementById('satuan_saldoTypePrimerAsal'); // prettier-ignore
    let saldo_typeSekunderAsal = document.getElementById('saldo_typeSekunderAsal'); // prettier-ignore
    let satuan_saldoTypeSekunderAsal = document.getElementById('satuan_saldoTypeSekunderAsal'); // prettier-ignore
    let saldo_typeTritierAsal = document.getElementById('saldo_typeTritierAsal'); // prettier-ignore
    let satuan_saldoTypetritierAsal = document.getElementById('satuan_saldoTypetritierAsal'); // prettier-ignore
    let input_tanggalKonversi = document.getElementById("input_tanggalKonversi"); // prettier-ignore
    let shiftRTR = document.getElementById("shiftRTR");
    const select_mesin = $("#select_mesin");
    let div_bagianStarpak = document.getElementById("div_bagianStarpak");
    const select_bagianStarpak = $("#select_bagianStarpak");
    let idOrderKerja = document.getElementById("idOrderKerja");
    let nomor_ok = document.getElementById("nomor_ok");
    let kode_barangHasil = document.getElementById("kode_barangHasil");
    let nama_barangHasil = document.getElementById("nama_barangHasil");
    // const select_jenisBobbin = $("#select_jenisBobbin");
    // let tebal_rollAwal = document.getElementById("tebal_rollAwal");
    // let tebal_rollAkhir = document.getElementById("tebal_rollAkhir");
    let hasil_pcs = document.getElementById("hasil_pcs");
    let hasil_kg = document.getElementById("hasil_kg");
    let btn_timbang = document.getElementById("btn_timbang");
    let pemakaian_typePrimerAsal = document.getElementById('pemakaian_typePrimerAsal'); // prettier-ignore
    let satuan_pemakaianTypePrimerAsal = document.getElementById('satuan_pemakaianTypePrimerAsal'); // prettier-ignore
    let pemakaian_typeSekunderAsal = document.getElementById('pemakaian_typeSekunderAsal'); // prettier-ignore
    let satuan_pemakaianTypeSekunderAsal = document.getElementById('satuan_pemakaianTypeSekunderAsal'); // prettier-ignore
    let pemakaian_TritierAsal = document.getElementById('pemakaian_TritierAsal'); // prettier-ignore
    let satuan_pemakaianTritierAsal = document.getElementById('satuan_pemakaianTritierAsal'); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses");
    let kodeBarangAsal,
        nomorIndeksBarangAsal,
        dataMesinTemp,
        panjangRoll,
        checkIdType,
        selisihKonversiPersen;
    let table_daftarBarcode = $("#table_daftarBarcode").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        autoWidth: false,
        ajax: {
            url: "/BarcodeRTR/getBarcodeAktif",
            type: "GET",
        },
        columns: [
            {
                data: "Barcode",
                width: "10%",
            },
            {
                data: "NAMA_BRG",
                width: "20%",
            },
            {
                data: "JumlahPrimer",
                width: "5%",
            },
            {
                data: "JumlahSekunder",
                width: "8%",
            },
            {
                data: "JumlahTritier",
                width: "9%",
            },
            {
                data: "IdTransaksi",
                render: function (data, type, full) {
                    return `<button class="btn btn-success btn-cetakUlang" data-id="${data}" id="button_cetakBarcode">Cetak Ulang</button>`;
                },
                width: "5%",
            },
        ],
    });
    //#endregion

    //#region Functions
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

    function initializeSelect2() {
        select_mesin.select2({
            dropdownParent: $("#barcodePrintingModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        select_bagianStarpak.select2({
            dropdownParent: $("#barcodePrintingModal"),
            allowClear: true,
            placeholder: "Pilih Bagian Starpak",
        });

        // select_jenisBobbin.select2({
        //     dropdownParent: $("#barcodePrintingModal"),
        //     allowClear: true,
        //     placeholder: "Pilih Jenis Bobbin",
        // });

        $("#select_mesin").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#select_bagianStarpak").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        // $("#select_jenisBobbin").each(function () {
        //     $(this).next(".select2-container").css({
        //         flex: "1 1 auto",
        //         width: "100%",
        //     });
        // });
    }

    function InitModal() {
        input_tanggalKonversi.valueAsDate = new Date();
        shiftRTR.value = "";
        select_mesin.val(null).trigger("change");
        select_bagianStarpak.empty();
        idOrderKerja.value = "";
        nomor_ok.value = "";
        kode_barangHasil.value = "";
        nama_barangHasil.value = "";
        // select_jenisBobbin.val(null).trigger("change");
        // tebal_rollAwal.value = 0;
        // tebal_rollAkhir.value = 0;
        hasil_pcs.value = 0;
        hasil_kg.value = 0;
    }

    function hitungPemakaianRoll() {
        let hasil_kgValue = parseFloat(hasil_kg.value);
        let saldo_typeTritierAsalValue = parseFloat(saldo_typeTritierAsal.value); // prettier-ignore
        let saldo_typeSekunderAsalValue = parseFloat(saldo_typeSekunderAsal.value); // prettier-ignore
        pemakaian_TritierAsal.value = hasil_kgValue.toFixed(2);
        pemakaian_typeSekunderAsal.value = (
            (hasil_kgValue / saldo_typeTritierAsalValue) *
            saldo_typeSekunderAsalValue
        ).toFixed(2);
    }

    // function hitungPemakaianRoll() {
    //     // ρ = m/V
    //     // V = π (R²-r²) h
    //     if (tebal_rollAkhir.value == 0) {
    //         pemakaian_typeSekunderAsal.value = saldo_typeSekunderAsal.value;
    //         pemakaian_TritierAsal.value = saldo_typeTritierAsal.value;
    //         return;
    //     }

    //     let π = Math.PI;
    //     // console.log(π);

    //     let r = parseFloat(select_jenisBobbin.val()) / 100;
    //     let h = parseFloat(panjangRoll) / 100;
    //     let t1 = parseFloat(tebal_rollAwal.value) / 100;
    //     let t2 = parseFloat(tebal_rollAkhir.value) / 100;
    //     let m1 = parseFloat(saldo_typeTritierAsal.value);
    //     let m2 = 0;
    //     let s2 = saldo_typeSekunderAsal.value;
    //     console.log(r, h, t1, t2, m1);

    //     if (!r || !h || !t1 || !t2 || !m1 || !s2) {
    //         pemakaian_typeSekunderAsal.value = 0;
    //         pemakaian_TritierAsal.value = 0;
    //         return;
    //     }

    //     let V1 = π * h * (2 * r * t1 + t1 * t1);
    //     let V2 = π * h * (2 * r * t2 + t2 * t2);
    //     // console.log("Volume 1: " + V1);
    //     // console.log("Volume 2: " + V2);

    //     if (!V1) {
    //         pemakaian_typeSekunderAsal.value = 0;
    //         pemakaian_TritierAsal.value = 0;
    //         return;
    //     }

    //     let ρ = m1 / V1;
    //     // console.log(m1);
    //     // console.log((V1 / 1000000).toFixed(2));
    //     // console.log("massa jenis: " + ρ);

    //     m2 = ρ * V2;
    //     // console.log("massa 2: " + m2);

    //     let panjangRollSisa = (m2 / m1) * s2;
    //     // console.log("Panjang Roll Sisa 2: " + panjangRollSisa);

    //     pemakaian_typeSekunderAsal.value = (saldo_typeSekunderAsal.value - panjangRollSisa).toFixed(2); // prettier-ignore
    //     pemakaian_TritierAsal.value = (m1 - m2).toFixed(2);
    // }

    //#endregion

    //#region Load Form
    initializeSelect2();
    //#endregion

    //#region Event Listener
    button_tambahKonversi.addEventListener("click", function () {
        let inputBuffer = ""; // Buffer to store the input from the scanner
        let inputTimer; // Timer to check the speed of input
        const scannerThreshold = 50; // Time in milliseconds; adjust based on your scanner speed

        // Show SweetAlert2 with input field
        Swal.fire({
            title: "Scan Barcode",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                autocomplete: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                const parts = inputValue.split("-");
                if (parts.length !== 2) {
                    Swal.showValidationMessage("Barcode Tidak Valid!");
                    return false;
                }

                let part1 = parts[0].padStart(9, "0");
                let part2 = parts[1].padStart(9, "0");

                const formattedBarcode = `${part1}-${part2}`;

                if (formattedBarcode.length !== 19) {
                    Swal.showValidationMessage("Barcode Tidak Valid!");
                    return false;
                }

                return formattedBarcode;
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                // Handle the submitted value here
                nomorIndeksBarangAsal = result.value.split("-")[0].trim();
                kodeBarangAsal = result.value.split("-")[1].trim();

                $.ajax({
                    url: "/BarcodeRTR/getDataKonversiRTR",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        nomorIndeksBarangAsal: nomorIndeksBarangAsal,
                        kodeBarangAsal: kodeBarangAsal,
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: data.error,
                                showConfirmButton: false,
                            });
                        } else if (data.dataBarcode.length < 1) {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "Barcode tidak ditemukan!",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        } else {
                            dataMesinTemp = data.dataMesin;
                            // panjangRoll = data.dataBarcode[0].panjangRoll;
                            input_barcodeAsal.value = result.value;
                            input_barcodeAsal.readOnly = true;
                            nama_barangAsal.value = data.dataBarcode[0].NamaType; //prettier-ignore
                            nama_barangAsal.readOnly = true;
                            saldo_typePrimerAsal.value = numeral(data.dataBarcode[0].Qty_Primer).format('0.00'); // prettier-ignore
                            satuan_saldoTypePrimerAsal.value = data.dataBarcode[0].satPrimer.trim(); // prettier-ignore
                            saldo_typeSekunderAsal.value = numeral(data.dataBarcode[0].Qty_sekunder).format('0.00'); // prettier-ignore
                            satuan_saldoTypeSekunderAsal.value = data.dataBarcode[0].satSekunder.trim(); // prettier-ignore
                            saldo_typeTritierAsal.value = numeral(data.dataBarcode[0].Qty).format('0.00'); // prettier-ignore
                            satuan_saldoTypetritierAsal.value = data.dataBarcode[0].satTritier.trim(); // prettier-ignore
                            pemakaian_typePrimerAsal.value = 1;
                            satuan_pemakaianTypePrimerAsal.value = data.dataBarcode[0].satPrimer.trim(); // prettier-ignore
                            pemakaian_typeSekunderAsal.value = 0;
                            satuan_pemakaianTypeSekunderAsal.value = data.dataBarcode[0].satSekunder.trim(); // prettier-ignore
                            pemakaian_TritierAsal.value = 0;
                            satuan_pemakaianTritierAsal.value = data.dataBarcode[0].satTritier.trim(); // prettier-ignore
                            select_mesin.empty();
                            data.dataMesin.forEach(function (item) {
                                select_mesin.append(
                                    new Option(item.NamaMesin, item.IdMesin) // prettier-ignore
                                );
                            });
                            select_mesin.val(null).trigger("change");
                            InitModal();
                            $("#barcodePrintingModal").modal("show");
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.error(err.Message);
                    },
                });
            }
        });

        if (
            nomorUser !== "4384" && //adam
            nomorUser !== "4199" && //kelvin
            nomorUser !== "4428" && //aulia
            nomorUser !== "2244" //ika
        ) {
            const inputElement = Swal.getInput();

            inputElement.addEventListener("keydown", function (e) {
                // Filter out non-character keys
                const invalidKeys = [
                    "Shift",
                    "Control",
                    "Alt",
                    "Enter",
                    "Meta",
                    "Tab",
                    "Backspace",
                    "CapsLock",
                ];
                if (invalidKeys.includes(e.key)) {
                    e.preventDefault(); // Prevent default action for these keys
                    if (e.key === "Enter") {
                        // If 'Enter' key is detected, assume input is complete
                        if (inputBuffer.length > 0) {
                            inputElement.value = inputBuffer; // Set the accumulated input value
                            Swal.clickConfirm(); // Confirm input
                            inputBuffer = ""; // Clear buffer
                        }
                    }
                    return;
                }

                // Accumulate input into the buffer if it's a valid character
                inputBuffer += e.key; // Append the current key to buffer

                // Reset the timer on every valid keydown event
                clearTimeout(inputTimer);

                // Set a timer to clear the buffer if no input is detected within a threshold
                inputTimer = setTimeout(() => {
                    inputBuffer = ""; // Clear buffer
                }, scannerThreshold);

                e.preventDefault(); // Prevent manual keyboard input
            });
        }
    });

    $("#barcodePrintingModal").on("shown.bs.modal", function (event) {
        input_tanggalKonversi.focus();
        div_bagianStarpak.style.display = "none";
        if (
            nomorUser !== "4384" && //adam
            nomorUser !== "4199" && //kelvin
            nomorUser !== "4428" && //aulia
            nomorUser !== "2244" //ika
        ) {
            hasil_kg.readOnly = true;
        }
    });

    input_tanggalKonversi.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            shiftRTR.focus();
            shiftRTR.select();
        }
    });

    shiftRTR.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["A", "B", "C"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Silahkan pilih [A], [B], atau [C] untuk shift"
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shiftRTR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            select_mesin.select2("open");
        }
    });

    select_mesin.on("select2:select", function () {
        let selectedIdMesin = select_mesin.val();

        let selectedData = dataMesinTemp.find(
            (item) => item.IdMesin == selectedIdMesin
        );
        select_bagianStarpak.empty();
        idOrderKerja.value = selectedData.IdOrder;
        nomor_ok.value = selectedData.No_OK;
        if (selectedData.JenisOK == 1) {
            div_bagianStarpak.style.display = "none";
            kode_barangHasil.value = selectedData.KBPrintingWoven;
            nama_barangHasil.value = selectedData.NamaBarangPrintingWoven;
            if (!selectedData.IdTypePrintingWoven) {
                checkIdType = false;
                Swal.fire({
                    icon: "error",
                    title: "Proses tidak bisa dilanjutkan!",
                    text:
                        "Kode Barang " +
                        selectedData.KBPrintingWoven +
                        " belum dimaintenance type!",
                    showConfirmButton: false,
                });
            }
        } else if (selectedData.JenisOK == 2) {
            kode_barangHasil.value = "";
            nama_barangHasil.value = "";
            if (selectedData.KBPrintingStarpak !== null) {
                select_bagianStarpak.append(
                    new Option(
                        "Body Starpak",
                        selectedData.KBPrintingStarpak +
                            " | " +
                            selectedData.NamaBarangPrintingStarpak +
                            " | " +
                            selectedData.IdTypePrintingStarpak
                    )
                );
            }
            if (
                selectedData.KBPrintingStarpakPatchAtas ==
                selectedData.KBPrintingStarpakPatchBawah
            ) {
                select_bagianStarpak.append(
                    new Option(
                        "Patch Starpak",
                        selectedData.KBPrintingStarpakPatchAtas +
                            " | " +
                            selectedData.NamaBarangPrintingStarpakPatchAtas +
                            " | " +
                            selectedData.IdTypePrintingStarpakPatchAtas
                    )
                );
            } else {
                if (selectedData.KBPrintingStarpakPatchAtas !== null) {
                    select_bagianStarpak.append(
                        new Option(
                            "Patch Atas Starpak",
                            selectedData.KBPrintingStarpakPatchAtas +
                                " | " +
                                selectedData.NamaBarangPrintingStarpakPatchAtas +
                                " | " +
                                selectedData.IdTypePrintingStarpakPatchAtas
                        )
                    );
                }
                if (selectedData.KBPrintingStarpakPatchBawah !== null) {
                    select_bagianStarpak.append(
                        new Option(
                            "Patch Bawah Starpak",
                            selectedData.KBPrintingStarpakPatchBawah +
                                " | " +
                                selectedData.NamaBarangPrintingStarpakPatchBawah +
                                " | " +
                                selectedData.IdTypePrintingStarpakPatchBawah
                        )
                    );
                }
            }

            select_bagianStarpak.val(null).trigger("change");
            div_bagianStarpak.style.display = "block";
            select_bagianStarpak.select2("open");
        }
    });

    select_bagianStarpak.on("select2:select", function () {
        let selectedBagianStarpak = select_bagianStarpak.val();
        let kodeBarangHasilPrintingStarpak = selectedBagianStarpak.split(" | ")[0]; //prettier-ignore
        let namaBarangHasilPrintingStarpak = selectedBagianStarpak.split(" | ")[1]; //prettier-ignore

        kode_barangHasil.value = kodeBarangHasilPrintingStarpak;
        nama_barangHasil.value = namaBarangHasilPrintingStarpak;

        let selectedIdMesin = select_mesin.val();
        let selectedData = dataMesinTemp.find(
            (item) => item.IdMesin == selectedIdMesin
        );

        const starpakChecks = [
            {
                kode: selectedData.KBPrintingStarpak,
                idType: selectedData.IdTypePrintingStarpak,
            },
            {
                kode: selectedData.KBPrintingStarpakPatchAtas,
                idType: selectedData.IdTypePrintingStarpakPatchAtas,
            },
            {
                kode: selectedData.KBPrintingStarpakPatchBawah,
                idType: selectedData.IdTypePrintingStarpakPatchBawah,
            },
        ];

        for (const { kode, idType } of starpakChecks) {
            if (kodeBarangHasilPrintingStarpak == kode && !idType) {
                checkIdType = false;
                Swal.fire({
                    icon: "error",
                    title: "Proses tidak bisa dilanjutkan!",
                    text: `Kode Barang ${kode_barangHasil.value} belum dimaintenance type!`,
                    showConfirmButton: false,
                });
                break;
            }
        }

        hasil_pcs.focus();
        hasil_pcs.select();
        // select_jenisBobbin.select2("open");
    });

    // select_jenisBobbin.on("select2:select", function () {
    //     tebal_rollAwal.focus();
    //     tebal_rollAwal.select();
    // });

    // tebal_rollAwal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         e.preventDefault();
    //         tebal_rollAkhir.focus();
    //         tebal_rollAkhir.select();
    //     }
    // });

    // tebal_rollAwal.addEventListener("input", function (e) {
    //     hitungPemakaianRoll();
    // });

    // tebal_rollAkhir.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         e.preventDefault();
    //         hasil_pcs.focus();
    //         hasil_pcs.select();
    //     }
    // });

    // tebal_rollAkhir.addEventListener("input", function (e) {
    //     hitungPemakaianRoll();
    // });

    hasil_pcs.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (hasil_kg.readOnly == false) {
                hasil_kg.focus();
                hasil_kg.select();
            } else {
                btn_timbang.focus();
            }
        }
    });

    hasil_kg.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProses.focus();
        }
    });

    hasil_kg.addEventListener("input", function (e) {
        hitungPemakaianRoll();
    });

    btn_timbang.addEventListener("click", function () {
        $.ajax({
            url: "http://localhost:8080/",
            method: "GET",
            dataType: "text",
            success: function (weight) {
                hasil_kg.value = weight;
                hitungPemakaianRoll();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "info",
                    title: "Timbangan tidak ditemukan!",
                    text: error,
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        }).then(() => {
            button_modalProses.focus();
        });
    });

    button_modalProses.addEventListener("click", function () {
        button_modalProses.disabled = true;
        setTimeout(function () {
            button_modalProses.disabled = false;
        }, 300);

        // Check if date is larger than today
        let selectedDate = input_tanggalKonversi.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                input_tanggalKonversi.focus();
            });
            return;
        }

        if (shiftRTR.value == "" || shiftRTR.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftRTR.focus();
            });
            return;
        }

        if (select_mesin.val() === "" || select_mesin.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    select_mesin.select2("open");
                }, 200);
            });
            return;
        }

        // if (
        //     select_jenisBobbin.val() === "" ||
        //     select_jenisBobbin.val() == null
        // ) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Peringatan",
        //         text: "Jenis Bobbin harus dipilih",
        //         returnFocus: false,
        //     }).then(() => {
        //         setTimeout(() => {
        //             select_jenisBobbin.select2("open");
        //         }, 200);
        //     });
        //     return;
        // }

        // if (
        //     tebal_rollAwal.value == "" ||
        //     tebal_rollAwal.value == null ||
        //     tebal_rollAwal.value <= 0
        // ) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Peringatan",
        //         text: "Tebal Roll Awal tidak boleh kosong",
        //         returnFocus: false,
        //     }).then(() => {
        //         tebal_rollAwal.focus();
        //     });
        //     return;
        // }

        // if (
        //     tebal_rollAkhir.value == "" ||
        //     tebal_rollAkhir.value == null ||
        //     tebal_rollAkhir.value <= 0
        // ) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Peringatan",
        //         text: "Tebal Roll Akhir tidak boleh kosong",
        //         returnFocus: false,
        //     }).then(() => {
        //         tebal_rollAkhir.focus();
        //     });
        //     return;
        // }

        if (
            hasil_pcs.value == "" ||
            hasil_pcs.value == null ||
            hasil_pcs.value <= 0
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil Lembar tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasil_pcs.focus();
            });
            return;
        }

        if (
            hasil_kg.value == "" ||
            hasil_kg.value == null ||
            hasil_kg.value <= 0
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil Kg tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasil_kg.focus();
            });
            return;
        }

        $.ajax({
            url: "/BarcodeRTR",
            type: "POST",
            data: {
                Tgl_konversiRTR: input_tanggalKonversi.value,
                shiftRTR: shiftRTR.value,
                idMesinRTR: select_mesin.val(),
                nomorOrderKerja: nomor_ok.value,
                idOrderKerja: idOrderKerja.value,
                hasilPCSRTR: hasil_pcs.value,
                hasilKgRTR: hasil_kg.value,
                pemakaian_TritierAsal: pemakaian_TritierAsal.value,
                pemakaian_typeSekunderAsal: pemakaian_typeSekunderAsal.value,
                kodeBarangHasil: kode_barangHasil.value,
                nomorIndeksBarangAsal: nomorIndeksBarangAsal,
                kodeBarangAsal: kodeBarangAsal,
                _token: csrfToken,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: response.success,
                    }).then(() => {
                        barcodeContainer.innerHTML = ""; // clear old ones if any

                        response.barcode.forEach((item, index) => {
                            // A5 container
                            const card = document.createElement("div");
                            card.classList.add("barcode-card");

                            // Barcode canvas
                            const canvas = document.createElement("canvas");
                            canvas.id = `barcode-${index}`;

                            let tglMutasi = moment(item.tglMutasi).format(
                                "DD/MM/YYYY"
                            );

                            // Text under barcode
                            const textDiv = document.createElement("div");
                            textDiv.classList.add("barcode-text");
                            textDiv.innerHTML = `
                                <div class="barcode-code">${item.code}</div>
                                <div class="barcode-name">${item.NAMA_BRG}</div>
                                <div class="barcode-name">${tglMutasi} | ${item.Qty_Primer} ${item.Satuan_Primer} | ${item.Qty_sekunder} ${item.Satuan_sekunder} | ${item.Qty} ${item.Satuan}</div>
                            `;

                            // Assemble
                            card.appendChild(canvas);
                            card.appendChild(textDiv);
                            barcodeContainer.appendChild(card);

                            // Generate barcode (value only)
                            JsBarcode(canvas, item.code, {
                                format: "CODE128",
                                displayValue: false,
                                margin: 15,
                                width: 3,
                                height: 200,
                            });
                        });

                        setTimeout(() => window.print(), 800);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });
    $(document).on("click", ".btn-cetakUlang", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/BarcodeRTR/getDataBarcodeKonversiRTR",
            type: "GET",
            data: {
                idTransaksi: rowID,
                _token: csrfToken,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: response.success,
                    }).then(() => {
                        barcodeContainer.innerHTML = ""; // clear old ones if any

                        response.barcode.forEach((item, index) => {
                            // A5 container
                            const card = document.createElement("div");
                            card.classList.add("barcode-card");

                            // Barcode canvas
                            const canvas = document.createElement("canvas");
                            canvas.id = `barcode-${index}`;

                            let tglMutasi = moment(item.tglMutasi).format(
                                "DD/MM/YYYY"
                            );

                            // Text under barcode
                            const textDiv = document.createElement("div");
                            textDiv.classList.add("barcode-text");
                            textDiv.innerHTML = `
                                <div class="barcode-code">${item.code}</div>
                                <div class="barcode-name">${item.NAMA_BRG}</div>
                                <div class="barcode-name">${tglMutasi} | ${item.Qty_Primer} ${item.Satuan_Primer} | ${item.Qty_sekunder} ${item.Satuan_sekunder} | ${item.Qty} ${item.Satuan}</div>
                            `;

                            // Assemble
                            card.appendChild(canvas);
                            card.appendChild(textDiv);
                            barcodeContainer.appendChild(card);

                            // Generate barcode (value only)
                            JsBarcode(canvas, item.code, {
                                format: "CODE128",
                                displayValue: false,
                                margin: 15,
                                width: 3,
                                height: 200,
                            });
                        });

                        setTimeout(() => window.print(), 800);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });
    //#endregion
});
