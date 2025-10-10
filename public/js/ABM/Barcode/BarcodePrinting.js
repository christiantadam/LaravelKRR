jQuery(function ($) {
    //#region Get element by ID
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser").value;
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi"); // prettier-ignore
    let table_daftarPermohonan = $("#table_daftarBarcode").DataTable({});
    let input_barcodeAsal = document.getElementById("input_barcodeAsal");
    let nama_barangAsal = document.getElementById("nama_barangAsal");
    let saldo_typePrimerAsal = document.getElementById('saldo_typePrimerAsal'); // prettier-ignore
    let satuan_saldoTypePrimerAsal = document.getElementById('satuan_saldoTypePrimerAsal'); // prettier-ignore
    let saldo_typeSekunderAsal = document.getElementById('saldo_typeSekunderAsal'); // prettier-ignore
    let satuan_saldoTypeSekunderAsal = document.getElementById('satuan_saldoTypeSekunderAsal'); // prettier-ignore
    let saldo_terakhirTritierAsal = document.getElementById('saldo_terakhirTritierAsal'); // prettier-ignore
    let satuan_saldoTerakhirTritierAsal = document.getElementById('satuan_saldoTerakhirTritierAsal'); // prettier-ignore
    let input_tanggalKonversi = document.getElementById("input_tanggalKonversi"); // prettier-ignore
    let shiftRTR = document.getElementById("shiftRTR");
    const select_mesin = $("#select_mesin");
    let div_bagianStarpak = document.getElementById("div_bagianStarpak");
    const select_bagianStarpak = $("#select_bagianStarpak");
    let nomor_ok = document.getElementById("nomor_ok");
    let kode_barangHasil = document.getElementById("kode_barangHasil");
    let nama_barangHasil = document.getElementById("nama_barangHasil");
    const select_jenisBobbin = $("#select_jenisBobbin");
    let tebal_rollAwal = document.getElementById("tebal_rollAwal");
    let tebal_rollAkhir = document.getElementById("tebal_rollAkhir");
    let hasil_lembar = document.getElementById("hasil_lembar");
    let hasil_kg = document.getElementById("hasil_kg");
    let btn_timbang = document.getElementById("btn_timbang");
    let kodeBarangAsal, nomorIndeksBarangAsal, dataMesinTemp;
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

        select_jenisBobbin.select2({
            dropdownParent: $("#barcodePrintingModal"),
            allowClear: true,
            placeholder: "Pilih Jenis Bobbin",
        });

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

        $("#select_jenisBobbin").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function InitModal() {
        input_tanggalKonversi.valueAsDate = new Date();
        shiftRTR.value = "";
        select_mesin.val(null).trigger("change");
        select_bagianStarpak.empty();
        nomor_ok.value = "";
        kode_barangHasil.value = "";
        nama_barangHasil.value = "";
        select_jenisBobbin.val(null).trigger("change");
        tebal_rollAwal.value = "";
        tebal_rollAkhir.value = "";
        hasil_lembar.value = "";
        hasil_kg.value = "";
    }
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
                        dataMesinTemp = data.dataMesin;
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
                            input_barcodeAsal.value = result.value;
                            input_barcodeAsal.readOnly = true;
                            nama_barangAsal.value = data.dataBarcode[0].NamaType; //prettier-ignore
                            nama_barangAsal.readOnly = true;
                            saldo_typePrimerAsal.value = numeral(data.dataBarcode[0].Qty_Primer).format('0.00'); // prettier-ignore
                            satuan_saldoTypePrimerAsal.value = data.dataBarcode[0].satPrimer.trim(); // prettier-ignore
                            saldo_typeSekunderAsal.value = numeral(data.dataBarcode[0].Qty_sekunder).format('0.00'); // prettier-ignore
                            satuan_saldoTypeSekunderAsal.value = data.dataBarcode[0].satSekunder.trim(); // prettier-ignore
                            saldo_terakhirTritierAsal.value = numeral(data.dataBarcode[0].Qty).format('0.00'); // prettier-ignore
                            satuan_saldoTerakhirTritierAsal.value = data.dataBarcode[0].satTritier.trim(); // prettier-ignore
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

        nomor_ok.value = selectedData.No_OK;
        if (selectedData.JenisOK == 1) {
            kode_barangHasil.value = selectedData.KBPrintingWoven;
            nama_barangHasil.value = selectedData.NamaBarangPrintingWoven;
        } else if (selectedData.JenisOK == 2) {
            select_bagianStarpak.empty();
            kode_barangHasil.value = "";
            nama_barangHasil.value = "";
            if (selectedData.KBPrintingStarpak !== null) {
                select_bagianStarpak.append(
                    new Option(
                        "Body Starpak",
                        selectedData.KBPrintingStarpak +
                            " | " +
                            selectedData.NamaBarangPrintingStarpak
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
                            selectedData.NamaBarangPrintingStarpakPatchAtas
                    )
                );
            } else {
                if (selectedData.KBPrintingStarpakPatchAtas !== null) {
                    select_bagianStarpak.append(
                        new Option(
                            "Patch Atas Starpak",
                            selectedData.KBPrintingStarpakPatchAtas +
                                " | " +
                                selectedData.NamaBarangPrintingStarpakPatchAtas
                        )
                    );
                }
                if (selectedData.KBPrintingStarpakPatchBawah !== null) {
                    select_bagianStarpak.append(
                        new Option(
                            "Patch Bawah Starpak",
                            selectedData.KBPrintingStarpakPatchBawah +
                                " | " +
                                selectedData.NamaBarangPrintingStarpakPatchBawah
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

        select_jenisBobbin.select2("open");
    });

    select_jenisBobbin.on("select2:select", function () {
        tebal_rollAwal.focus();
        tebal_rollAwal.select();
    });

    tebal_rollAwal.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            tebal_rollAkhir.focus();
            tebal_rollAkhir.select();
        }
    });

    tebal_rollAkhir.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasil_lembar.focus();
            hasil_lembar.select();
        }
    });

    hasil_lembar.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            btn_timbang.focus();
        }
    });

    btn_timbang.addEventListener("click", function () {
        fetch("http://localhost:8080/")
            .then((r) => r.text())
            .then((weight) => console.log(weight))
            .catch((err) => console.error(err));
    });
    //#endregion
});
