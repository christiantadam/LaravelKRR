jQuery(function ($) {
    //#region Variables
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser").value;
    let konversiPotongJahitModal = document.getElementById("konversiPotongJahitModal"); // prettier-ignore
    let konversiPotongJahitModalLabel = document.getElementById("konversiPotongJahitModalLabel"); // prettier-ignore
    let input_barcodeAsal = document.getElementById("input_barcodeAsal");
    let nama_barangAsal = document.getElementById("nama_barangAsal");
    let saldo_typePrimerAsal = document.getElementById("saldo_typePrimerAsal");
    let satuan_saldoTypePrimerAsal = document.getElementById("satuan_saldoTypePrimerAsal"); // prettier-ignore
    let saldo_typeSekunderAsal = document.getElementById("saldo_typeSekunderAsal"); // prettier-ignore
    let satuan_saldoTypeSekunderAsal = document.getElementById("satuan_saldoTypeSekunderAsal"); // prettier-ignore
    let saldo_typeTritierAsal = document.getElementById("saldo_typeTritierAsal"); // prettier-ignore
    let satuan_saldoTypetritierAsal = document.getElementById("satuan_saldoTypetritierAsal"); // prettier-ignore
    let input_tanggalKonversi = document.getElementById("input_tanggalKonversi"); // prettier-ignore
    let shiftMPJ = document.getElementById("shiftMPJ");
    const select_mesin = $("#select_mesin");
    const select_kodeBarangHasil = $("#select_kodeBarangHasil");
    let idOrderKerja = document.getElementById("idOrderKerja");
    let nomor_ok = document.getElementById("nomor_ok");
    let kode_barangHasil = document.getElementById("kode_barangHasil");
    let nama_barangHasil = document.getElementById("nama_barangHasil");
    let hasil_pcs = document.getElementById("hasil_pcs");
    let hasil_kg = document.getElementById("hasil_kg");
    let btn_timbang = document.getElementById("btn_timbang");
    let pemakaian_typePrimerAsal = document.getElementById("pemakaian_typePrimerAsal"); // prettier-ignore
    let satuan_pemakaianTypePrimerAsal = document.getElementById("satuan_pemakaianTypePrimerAsal"); // prettier-ignore
    let pemakaian_typeSekunderAsal = document.getElementById("pemakaian_typeSekunderAsal"); // prettier-ignore
    let satuan_pemakaianTypeSekunderAsal = document.getElementById("satuan_pemakaianTypeSekunderAsal"); // prettier-ignore
    let pemakaian_TritierAsal = document.getElementById("pemakaian_TritierAsal"); // prettier-ignore
    let satuan_pemakaianTritierAsal = document.getElementById("satuan_pemakaianTritierAsal"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses");
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi"); // prettier-ignore
    let table_daftarKonversi = $("#table_daftarKonversi").DataTable({});
    let checkIdType;
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
            dropdownParent: $("#konversiPotongJahitModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });
        $("#select_mesin").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
        select_kodeBarangHasil.select2({
            dropdownParent: $("#konversiPotongJahitModal"),
            allowClear: true,
            placeholder: "Pilih KB Hasil",
        });
        $("#select_kodeBarangHasil").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
        $("#select_kodeBarangHasil").next(".select2-container").hide();
    }

    function InitModal() {
        input_tanggalKonversi.valueAsDate = new Date();
        shiftMPJ.value = "";
        select_mesin.val(null).trigger("change");
        idOrderKerja.value = "";
        nomor_ok.value = "";
        kode_barangHasil.value = "";
        nama_barangHasil.value = "";
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

    function fillSelect2(data) {
        const select = $("#select_kodeBarangHasil"); // change this
        select.empty(); // Clear previous options

        // Always push KodeBarangJadi
        const options = [
            {
                id: data.NamaBarangJadiWoven,
                text: data.KodeBarangJadi,
                idtype: data.IdTypeJadiWoven,
            },
        ];

        // jumlah setengah jadi
        const jumlah = parseInt(data.JumlahKBStghJadi || "0");

        if (jumlah >= 1 && data.KBSetengahJadiWoven) {
            options.push({
                id: data.NamaBarangSetengahJadiWoven,
                text: data.KBSetengahJadiWoven,
                idtype: data.IdTypeSetengahJadiWoven,
            });
        }

        if (jumlah >= 2 && data.KBSetengahJadiWoven1) {
            options.push({
                id: data.NamaBarangSetengahJadiWoven1,
                text: data.KBSetengahJadiWoven1,
                idtype: data.IdTypeSetengahJadiWoven1,
            });
        }

        if (jumlah >= 3 && data.KBSetengahJadiWoven2) {
            options.push({
                id: data.NamaBarangSetengahJadiWoven2,
                text: data.KBSetengahJadiWoven2,
                idtype: data.IdTypeSetengahJadiWoven2,
            });
        }

        // Insert options to Select2
        options.forEach((opt) => {
            let o = new Option(opt.text, opt.id, false, false);
            $(o).data("idtype", opt.idtype);
            select.append(o);
        });

        // Reinitialize Select2
        select.val(null).trigger("change");
    }

    //#endregion

    //#region Load Form
    initializeSelect2();
    //#endregion

    //#region Event Listeners
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
                    url: "/KonversiPotongJahitABM/getDataKonversiPotongJahit",
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
                            $("#konversiPotongJahitModal").modal("show");
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.error(err.Message);
                    },
                });
            }
        });
        console.log(nomorUser);

        if (
            nomorUser !== "4384" && //adam
            nomorUser !== "4199" && //kelvin
            nomorUser !== "4428" && //aulia
            nomorUser !== "4045" && //achi
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

    $("#konversiPotongJahitModal").on("shown.bs.modal", function (event) {
        input_tanggalKonversi.focus();
        if (
            nomorUser !== "4384" && //adam
            nomorUser !== "4199" && //kelvin
            nomorUser !== "4428" && //aulia
            nomorUser !== "4045" && //achi
            nomorUser !== "2244" //ika
        ) {
            hasil_kg.readOnly = true;
        }
    });

    input_tanggalKonversi.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            shiftMPJ.focus();
            shiftMPJ.select();
        }
    });

    shiftMPJ.addEventListener("input", function (e) {
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

    shiftMPJ.addEventListener("keypress", function (e) {
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
        console.log(selectedData);
        idOrderKerja.value = selectedData.IdOrder;
        nomor_ok.value = selectedData.No_OK;

        if (selectedData.JenisOK == 1) {
            checkIdType = true;
            if (selectedData.JumlahKBStghJadi > 0) {
                kode_barangHasil.value = "";
                nama_barangHasil.value = "";
                fillSelect2(selectedData);
                kode_barangHasil.classList.add("hide-important"); // prettier-ignore
                kode_barangHasil.classList.remove("show-important-block");
                $("#select_kodeBarangHasil").next(".select2-container").show();
                select_kodeBarangHasil.select2("open");
            } else {
                kode_barangHasil.value = selectedData.KodeBarangJadi;
                nama_barangHasil.value = selectedData.NamaBarangJadiWoven;
                kode_barangHasil.classList.remove("hide-important"); // prettier-ignore
                kode_barangHasil.classList.add("show-important-block");
                $("#select_kodeBarangHasil").next(".select2-container").hide();
                if (!selectedData.IdTypeJadiWoven) {
                    checkIdType = false;
                    Swal.fire({
                        icon: "error",
                        title: "Proses tidak bisa dilanjutkan!",
                        text:
                            "Kode Barang " +
                            selectedData.KodeBarangJadi +
                            " belum dimaintenance type!",
                        showConfirmButton: false,
                    });
                } else {
                    hasil_pcs.focus();
                    hasil_pcs.select();
                }
            }
        } else if (selectedData.JenisOK == 2) {
            Swal.fire({
                icon: "error",
                title: "Proses tidak bisa dilanjutkan!",
                text: "Order Kerja yang terdaftar pada mesin merupakan order kerja starpak ",
                showConfirmButton: false,
            });
        }
    });

    select_kodeBarangHasil.on("select2:select", function (e) {
        checkIdType = true;
        let selected = e.params.data;
        let namaBarangHasil = select_kodeBarangHasil.val();
        let selectedKodeBarangHasil = select_kodeBarangHasil
            .find(":selected")
            .text();
        kode_barangHasil.value = selectedKodeBarangHasil;
        nama_barangHasil.value = namaBarangHasil;

        // --- CHECK IdType dynamically ---
        if (!selected.idtype) {
            checkIdType = false;
            Swal.fire({
                icon: "error",
                title: "Proses tidak bisa dilanjutkan!",
                text:
                    "Kode Barang " +
                    selectedKodeBarangHasil +
                    " belum dimaintenance type!",
                showConfirmButton: false,
            });
        } else {
            hasil_pcs.focus();
            hasil_pcs.select();
        }
    });

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

        if (!checkIdType) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Kode Barang " +
                    kode_barangHasil.value +
                    " belum dimaintenance type!",
                returnFocus: false,
            }).then(() => {
                shiftRTR.focus();
            });
            return;
        }

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

        if (shiftMPJ.value == "" || shiftMPJ.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftMPJ.focus();
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
                Tgl_konversiMPJ: input_tanggalKonversi.value,
                shiftMPJ: shiftMPJ.value,
                idMesinMPJ: select_mesin.val(),
                nomorOrderKerja: nomor_ok.value,
                idOrderKerja: idOrderKerja.value,
                hasilPCSMPJ: hasil_pcs.value,
                hasilKgMPJ: hasil_kg.value,
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

                            let tglMutasi = moment(item.Tgl_mutasi).format(
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
                                width: 2,
                                height: 70,
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
