$(document).ready(function () {
    //#region Get element by ID
    let button_hapusTujuanKonversi = document.getElementById("button_hapusTujuanKonversi"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let button_tambahTujuanKonversi = document.getElementById("button_tambahTujuanKonversi"); // prettier-ignore
    let button_updateTujuanKonversi = document.getElementById("button_updateTujuanKonversi"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let closeModalButton = document.getElementById("closeModalButton"); // prettier-ignore
    let closeModalButtonDetail = document.getElementById("closeModalButtonDetail"); // prettier-ignore
    let detail_konversiModalTableDaftarAsalKonversi = $("#detail_konversiModalTableDaftarAsalKonversi").DataTable(); // prettier-ignore
    let detail_konversiModalTableDaftarTujuanKonversi = $("#detail_konversiModalTableDaftarTujuanKonversi").DataTable(); // prettier-ignore
    let hasil_konversiPrimerTujuan = document.getElementById("hasil_konversiPrimerTujuan"); // prettier-ignore
    let hasil_konversiSekunderTujuan = document.getElementById("hasil_konversiSekunderTujuan"); // prettier-ignore
    let hasil_konversiTritierTujuan = document.getElementById("hasil_konversiTritierTujuan"); // prettier-ignore
    let id_shift = document.getElementById("id_shift"); // prettier-ignore
    let input_barcodeAsal = document.getElementById("input_barcodeAsal"); // prettier-ignore
    let input_tanggalKonversi = document.getElementById("input_tanggalKonversi"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser").value; // prettier-ignore
    let saldo_terakhirPrimerBarcodeAsal = document.getElementById("saldo_terakhirPrimerBarcodeAsal"); // prettier-ignore
    let satuan_saldoTerakhirPrimerBarcodeAsal = document.getElementById("satuan_saldoTerakhirPrimerBarcodeAsal"); // prettier-ignore
    let saldo_terakhirSekunderBarcodeAsal = document.getElementById("saldo_terakhirSekunderBarcodeAsal"); // prettier-ignore
    let saldo_terakhirTujuanPrimer = document.getElementById("saldo_terakhirTujuanPrimer"); // prettier-ignore
    let saldo_terakhirTujuanSekunder = document.getElementById("saldo_terakhirTujuanSekunder"); // prettier-ignore
    let saldo_terakhirTujuanTritier = document.getElementById("saldo_terakhirTujuanTritier"); // prettier-ignore
    let satuan_primerTujuan = document.getElementById("satuan_primerTujuan"); // prettier-ignore
    let satuan_saldoTerakhirSekunderBarcodeAsal = document.getElementById("satuan_saldoTerakhirSekunderBarcodeAsal"); // prettier-ignore
    let saldo_terakhirTritierBarcodeAsal = document.getElementById("saldo_terakhirTritierBarcodeAsal"); // prettier-ignore
    let satuan_saldoTerakhirTritierBarcodeAsal = document.getElementById("satuan_saldoTerakhirTritierBarcodeAsal"); // prettier-ignore
    let satuan_saldoTerakhirTujuanPrimer = document.getElementById("satuan_saldoTerakhirTujuanPrimer"); // prettier-ignore
    let satuan_saldoTerakhirTujuanSekunder = document.getElementById("satuan_saldoTerakhirTujuanSekunder"); // prettier-ignore
    let satuan_saldoTerakhirTujuanTritier = document.getElementById("satuan_saldoTerakhirTujuanTritier"); // prettier-ignore
    let satuan_sekunderTujuan = document.getElementById("satuan_sekunderTujuan"); // prettier-ignore
    let satuan_tritierTujuan = document.getElementById("satuan_tritierTujuan"); // prettier-ignore
    let select_kelompokTujuan = document.getElementById("select_kelompokTujuan"); // prettier-ignore
    let select_kelompokUtamaTujuan = document.getElementById("select_kelompokUtamaTujuan"); // prettier-ignore
    let select_divisiTujuan = document.getElementById('select_divisiTujuan'); // prettier-ignore
    let select_objekTujuan = document.getElementById("select_objekTujuan"); // prettier-ignore
    let select_subKelompokTujuan = document.getElementById("select_subKelompokTujuan"); // prettier-ignore
    let select_typeTujuan = document.getElementById("select_typeTujuan"); // prettier-ignore
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore

    let table_daftarKonversi = $("#table_daftarKonversi").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        ordering: false,
        autoWidth: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "Barcode" },
            { data: "NamaType" },
            { data: "JumlahPengeluaranPrimer" },
            { data: "JumlahPengeluaranSekunder" },
            { data: "JumlahPengeluaranTritier" },
            { data: "idkonversi" },
            {
                data: "idkonversi",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-success btn-acc" data-id="' +
                        data +
                        '">ACC</button> ' +
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="#detailKonversiModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
                    );
                },
            },
        ],
        columnDefs: [{ width: "12%", targets: 0 },{ width: "25%", targets: 1 },{ width: "25%", targets: 6 }],
    }); // prettier-ignore
    let table_daftarAsalKonversi = $("#table_daftarAsalKonversi").DataTable({
        paging: false,
        searching: false,
        info: false,
        autoWidth: false,
        columnDefs: [
            {
                target: 5,
                visible: false,
            },
            {
                target: 6,
                visible: false,
            },
        ],
    }); // prettier-ignore
    let table_daftarTujuanKonversi = $("#table_daftarTujuanKonversi").DataTable(
        {
            paging: false,
            searching: false,
            info: false,
            autoWidth: false,
            columnDefs: [
                {
                    target: 5,
                    visible: false,
                },
            ],
        }
    ); // prettier-ignore

    // Array of select element IDs
    const selectIdsTujuan = [
        "#select_divisiTujuan",
        "#select_objekTujuan",
        "#select_kelompokUtamaTujuan",
        "#select_kelompokTujuan",
        "#select_subKelompokTujuan",
        "#select_typeTujuan",
    ];

    const inputTextIdsTujuan = [
        "#saldo_terakhirTujuanPrimer",
        "#satuan_saldoTerakhirTujuanPrimer",
        "#saldo_terakhirTujuanSekunder",
        "#satuan_saldoTerakhirTujuanSekunder",
        "#saldo_terakhirTujuanTritier",
        "#satuan_saldoTerakhirTujuanTritier",
        "#hasil_konversiPrimerTujuan",
        "#satuan_primerTujuan",
        "#hasil_konversiSekunderTujuan",
        "#satuan_sekunderTujuan",
        "#hasil_konversiTritierTujuan",
        "#satuan_tritierTujuan",
    ];

    //#endregion

    //#region Load Form

    getDataPermohonan();

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

    function getDataPermohonan() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/KonversiRollBarcode/getDataPermohonan/ADSStghJadi",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_daftarKonversi.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_daftarKonversi.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function clearTujuan(type) {
        if (type == "divisiTujuan") {
            select_objekTujuan.disabled = true;
            select_objekTujuan.selectedIndex = 0;
            select_kelompokUtamaTujuan.disabled = true;
            select_kelompokUtamaTujuan.selectedIndex = 0;
            select_kelompokTujuan.disabled = true;
            select_kelompokTujuan.selectedIndex = 0;
            select_subKelompokTujuan.disabled = true;
            select_subKelompokTujuan.selectedIndex = 0;
            select_typeTujuan.disabled = true;
            select_typeTujuan.selectedIndex = 0;
            saldo_terakhirTujuanPrimer.value = "";
            saldo_terakhirTujuanSekunder.value = "";
            saldo_terakhirTujuanTritier.value = "";
            satuan_saldoTerakhirTujuanPrimer.value = "";
            satuan_saldoTerakhirTujuanSekunder.value = "";
            satuan_saldoTerakhirTujuanTritier.value = "";
        } else if (type == "objekTujuan") {
            select_kelompokUtamaTujuan.disabled = true;
            select_kelompokUtamaTujuan.selectedIndex = 0;
            select_kelompokTujuan.disabled = true;
            select_kelompokTujuan.selectedIndex = 0;
            select_subKelompokTujuan.disabled = true;
            select_subKelompokTujuan.selectedIndex = 0;
            select_typeTujuan.disabled = true;
            select_typeTujuan.selectedIndex = 0;
            saldo_terakhirTujuanPrimer.value = "";
            saldo_terakhirTujuanSekunder.value = "";
            saldo_terakhirTujuanTritier.value = "";
            satuan_saldoTerakhirTujuanPrimer.value = "";
            satuan_saldoTerakhirTujuanSekunder.value = "";
            satuan_saldoTerakhirTujuanTritier.value = "";
        } else if (type == "kelompokutamaTujuan") {
            select_kelompokTujuan.disabled = true;
            select_kelompokTujuan.selectedIndex = 0;
            select_subKelompokTujuan.disabled = true;
            select_subKelompokTujuan.selectedIndex = 0;
            select_typeTujuan.disabled = true;
            select_typeTujuan.selectedIndex = 0;
            saldo_terakhirTujuanPrimer.value = "";
            saldo_terakhirTujuanSekunder.value = "";
            saldo_terakhirTujuanTritier.value = "";
            satuan_saldoTerakhirTujuanPrimer.value = "";
            satuan_saldoTerakhirTujuanSekunder.value = "";
            satuan_saldoTerakhirTujuanTritier.value = "";
        } else if (type == "kelompokTujuan") {
            select_subKelompokTujuan.disabled = true;
            select_subKelompokTujuan.selectedIndex = 0;
            select_typeTujuan.disabled = true;
            select_typeTujuan.selectedIndex = 0;
            saldo_terakhirTujuanPrimer.value = "";
            saldo_terakhirTujuanSekunder.value = "";
            saldo_terakhirTujuanTritier.value = "";
            satuan_saldoTerakhirTujuanPrimer.value = "";
            satuan_saldoTerakhirTujuanSekunder.value = "";
            satuan_saldoTerakhirTujuanTritier.value = "";
        } else if (type == "subkelompokTujuan") {
            select_typeTujuan.disabled = true;
            select_typeTujuan.selectedIndex = 0;
            saldo_terakhirTujuanPrimer.value = "";
            saldo_terakhirTujuanSekunder.value = "";
            saldo_terakhirTujuanTritier.value = "";
            satuan_saldoTerakhirTujuanPrimer.value = "";
            satuan_saldoTerakhirTujuanSekunder.value = "";
            satuan_saldoTerakhirTujuanTritier.value = "";
        } else if (type == "typeTujuan") {
            saldo_terakhirTujuanPrimer.value = "";
            saldo_terakhirTujuanSekunder.value = "";
            saldo_terakhirTujuanTritier.value = "";
            satuan_saldoTerakhirTujuanPrimer.value = "";
            satuan_saldoTerakhirTujuanSekunder.value = "";
            satuan_saldoTerakhirTujuanTritier.value = "";
        }
    }

    function submitPermohonan() {
        $.ajax({
            type: "POST",
            url: "/KonversiRollBarcode",
            data: {
                _token: csrfToken,
                table_daftarTujuanKonversi: table_daftarTujuanKonversi
                    .rows()
                    .data()
                    .toArray(),
                asalKonversiInputValues: table_daftarAsalKonversi
                    .rows()
                    .data()
                    .toArray(),
                proses: proses,
                shift: id_shift.value,
                divisi: "ADS",
                jenisStore: "permohonan",
                tanggalKonversi: input_tanggalKonversi.value,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                } else {
                    getDataPermohonan();
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: response.success,
                        showConfirmButton: false,
                    });
                    $("#tambahTujuanModal").modal("hide");
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        });
    }
    //#endregion

    //#region Event listener

    button_tambahKonversi.addEventListener("click", function () {
        Swal.fire({
            title: "Pilih Metode Konversi",
            showCancelButton: true,
            confirmButtonText: "Dengan Barcode",
            cancelButtonText: "Tanpa Barcode",
        }).then((result) => {
            if (result.isConfirmed) {
                // User chose "Dengan Barcode"
                showBarcodeInputModal();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User chose "Tanpa Barcode"
                showManualInputModal();
            }
        });

        function showBarcodeInputModal() {
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
                        url: "/KonversiRollBarcode/getDataAsalKonversi",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            nomorIndeksBarangAsal: nomorIndeksBarangAsal,
                            kodeBarangAsal: kodeBarangAsal,
                            idDivisi: "ADS",
                        },
                        success: function (data) {
                            if (data.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                if (data.success.length == 0) {
                                    Swal.fire({
                                        icon: "info",
                                        title: "Pemberitahuan",
                                        text: "Barcode tidak ditemukan!",
                                    });
                                    return;
                                }
                                proses = 1;
                                var dataAsalKonversi = data.success;
                                var dataAsalKonversiInput = [];
                                dataAsalKonversi.forEach((element) => {
                                    dataAsalKonversiInput = [
                                        element.IdType,
                                        element.NamaType,
                                        element.Qty_Primer,
                                        element.Qty_sekunder,
                                        element.Qty,
                                        result.value,
                                        element.IdSubkelompok,
                                    ];
                                });
                                let namaKelompok = dataAsalKonversi[0].NamaKelompok.toLowerCase(); // prettier-ignore

                                table_daftarAsalKonversi.row
                                    .add(dataAsalKonversiInput)
                                    .draw();
                                // Show Bootstrap modal after confirming SweetAlert2
                                // let modalTambahTujuanModal = new bootstrap.Modal(tambahTujuanModal); // prettier-ignore
                                // modalTambahTujuanModal.show();
                                $("#tambahTujuanModal").modal("show");
                                input_barcodeAsal.value = result.value;
                                saldo_terakhirPrimerBarcodeAsal.value = dataAsalKonversi[0].SaldoPrimer // prettier-ignore
                                saldo_terakhirSekunderBarcodeAsal.value = dataAsalKonversi[0].SaldoSekunder // prettier-ignore
                                saldo_terakhirTritierBarcodeAsal.value = dataAsalKonversi[0].SaldoTritier // prettier-ignore
                                satuan_saldoTerakhirPrimerBarcodeAsal.value = dataAsalKonversi[0].satPrimer // prettier-ignore
                                satuan_saldoTerakhirSekunderBarcodeAsal.value = dataAsalKonversi[0].satSekunder // prettier-ignore
                                satuan_saldoTerakhirTritierBarcodeAsal.value = dataAsalKonversi[0].satTritier // prettier-ignore
                                d_tek1PanjangRoll = dataAsalKonversi[0].panjangRoll // prettier-ignore
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
                nomorUser !== "6978" //rosita
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
        }

        function showManualInputModal() {
            $("#tambahTujuanModalTanpaBarcode").modal("show");
        }
    });

    $("#tambahTujuanModal").on("hidden.bs.modal", function (event) {
        // Clear input fields inside the modal
        tambahTujuanModal.querySelectorAll("input").forEach((input) => {
            input.value = "";
        });
        tambahTujuanModal.querySelectorAll("select").forEach((select) => {
            select.selectedIndex = 0;
        });
        table_daftarAsalKonversi.clear().draw();
        table_daftarTujuanKonversi.clear().draw();
    });

    $("#tambahTujuanModal").on("shown.bs.modal", function (event) {
        checkSisaRoll = false;
        input_tanggalKonversi.valueAsDate = new Date();
        input_tanggalKonversi.focus();
        satuan_primerTujuan.readOnly = true;
        satuan_sekunderTujuan.readOnly = true;
        satuan_tritierTujuan.readOnly = true;
        satuan_saldoTerakhirTujuanPrimer.readOnly = true;
        satuan_saldoTerakhirTujuanSekunder.readOnly = true;
        satuan_saldoTerakhirTujuanTritier.readOnly = true;
        saldo_terakhirTujuanPrimer.readOnly = true;
        saldo_terakhirTujuanSekunder.readOnly = true;
        saldo_terakhirTujuanTritier.readOnly = true;
        select_objekTujuan.disabled = true;
        select_kelompokUtamaTujuan.disabled = true;
        select_kelompokTujuan.disabled = true;
        select_subKelompokTujuan.disabled = true;
        select_typeTujuan.disabled = true;
        PIB_tujuan.readOnly = true;
        button_updateTujuanKonversi.disabled = true;
        button_hapusTujuanKonversi.disabled = true;
        button_modalProses.disabled = true;
        if (
            nomorUser !== "4384" && //adam
            nomorUser !== "4199" && //kelvin
            nomorUser !== "6978" //rosita
        ) {
            hasil_konversiTritierTujuan.readOnly = true;
            button_timbangTujuanKonversi.disabled = false;
        }

        const buttonInputIds = [
            "hasil_konversiPrimerTujuan",
            "hasil_konversiSekunderTujuan",
            "hasil_konversiTritierTujuan",
        ];

        function getNextFocusableElement(currentElement) {
            // Find the next focusable element in the form
            if (currentElement.id === "hasil_konversiTritierTujuan") {
                return button_tambahTujuanKonversi.disabled
                    ? document.getElementById("button_updateTujuanKonversi")
                    : document.getElementById("button_tambahTujuanKonversi");
            }

            let elements = document.querySelectorAll(
                "input, select, textarea, button"
            );
            let currentIndex = Array.prototype.indexOf.call(
                elements,
                currentElement
            );

            for (let i = currentIndex + 1; i < elements.length; i++) {
                if (!elements[i].readOnly && !elements[i].disabled) {
                    return elements[i];
                }
            }
            return null;
        }

        buttonInputIds.forEach(function (id) {
            const inputElement = document.getElementById(id);
            let element = document.getElementById(id);
            if (inputElement) {
                setInputFilter(
                    inputElement,
                    function (value) {
                        // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
                        return /^\d*[.]?\d*$/.test(value);
                    },
                    "Tidak boleh karakter atau koma, harus angka dengan titik desimal"
                );
                element.addEventListener("keypress", function (e) {
                    if (e.key == "Enter") {
                        e.preventDefault(); // Prevent the default action of the Enter key

                        if (this.value == "") {
                            this.value = 0;
                        }

                        var value = parseFloat(this.value);
                        if (!isNaN(value)) {
                            this.value = parseFloat(value).toFixed(2);
                        }

                        // Find the next input element that is not readonly or disabled
                        let nextElement = getNextFocusableElement(this);
                        if (nextElement) {
                            nextElement.focus();
                            if (nextElement.type == "text") {
                                nextElement.select();
                            }
                        }
                    }
                });
            }
        });
    });

    closeModalButton.addEventListener("click", function () {
        $("#tambahTujuanModal").modal("hide");
    });

    closeModalButtonDetail.addEventListener("click", function () {
        $("#detailKonversiModal").modal("hide");
    });

    id_shift.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["P", "M", "S"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Silahkan pilih [P]agi, [S]iang, atau [M]alam"
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    id_shift.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (id_shift.value == "") {
                id_shift.classList.add("input-error");
            } else {
                select_divisiTujuan.focus();
            }
        }
    });

    input_tanggalKonversi.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            id_shift.focus();
        }
    });

    select_divisiTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("divisiTujuan");
    });

    select_divisiTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_divisiTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getObjek",
                data: {
                    _token: csrfToken,
                    idDivisi: select_divisiTujuan.value,
                },
                success: function (response) {
                    select_objekTujuan.disabled = false;
                    response.forEach((item) => {
                        // Create a new option element
                        const option = document.createElement("option");
                        // Set the value and text of the option
                        option.value = item.IdObjek;
                        option.textContent = item.NamaObjek;
                        // Append the option to the select element
                        select_objekTujuan.appendChild(option);
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_objekTujuan.focus();
            });
        }
    });

    select_objekTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("objekTujuan");
    });

    select_objekTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_objekTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getKelompokUtama",
                data: {
                    _token: csrfToken,
                    idObjek: select_objekTujuan.value,
                },
                success: function (response) {
                    select_kelompokUtamaTujuan.disabled = false;
                    // Clear only non-disabled options
                    Array.from(select_kelompokUtamaTujuan.options).forEach(
                        (option) => {
                            if (!option.disabled) {
                                option.remove();
                            }
                        }
                    );
                    response.forEach((item) => {
                        // Create a new option element
                        const option = document.createElement("option");
                        // Set the value and text of the option
                        option.value = item.IdKelompokUtama;
                        option.textContent = item.NamaKelompokUtama;
                        // Append the option to the select element
                        select_kelompokUtamaTujuan.appendChild(option);
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_kelompokUtamaTujuan.focus();
            });
        }
    });

    select_kelompokUtamaTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("kelompokutamaTujuan");
    });

    select_kelompokUtamaTujuan.addEventListener("keypress", function (e) {
        if (
            e.key == "Enter" &&
            select_kelompokUtamaTujuan.selectedIndex !== 0
        ) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getKelompok",
                data: {
                    _token: csrfToken,
                    idKelompokUtama: select_kelompokUtamaTujuan.value,
                },
                success: function (response) {
                    select_kelompokTujuan.disabled = false;
                    // Clear only non-disabled options
                    Array.from(select_kelompokTujuan.options).forEach(
                        (option) => {
                            if (!option.disabled) {
                                option.remove();
                            }
                        }
                    );

                    if (select_objekTujuan.value == 128) {
                        let itemsAdded = false; // Track if any item is added

                        response.forEach((item) => {
                            // If input_warnaDominanAsal is not empty and matches item.NamaSubKelompok
                            if (
                                jenisKonversi == "Printing" &&
                                !item.NamaKelompok.toLowerCase().includes(
                                    "printing"
                                )
                            ) {
                                const matchedOption = document.createElement("option"); // prettier-ignore
                                matchedOption.value = item.IdKelompok;
                                matchedOption.textContent = item.NamaKelompok;
                                select_kelompokTujuan.appendChild(
                                    matchedOption
                                );
                                itemsAdded = true;
                            }
                        });

                        if (!itemsAdded) {
                            Swal.fire({
                                icon: "warning",
                                title: "Perhatian",
                                text:
                                    "Tidak ada kelompok Printing pada kelompok " +
                                    select_kelompokUtamaTujuan.options[
                                        select_kelompokUtamaTujuan.selectedIndex
                                    ].text,
                            }).then(() => {
                                select_kelompokUtamaTujuan.focus();
                                select_kelompokTujuan.disabled = true;
                            });
                        } else {
                            select_kelompokTujuan.focus();
                        }
                    } else {
                        response.forEach((item) => {
                            // Create a new option element
                            const option = document.createElement("option");
                            // Set the value and text of the option
                            option.value = item.idkelompok;
                            option.textContent = item.namakelompok;
                            // Append the option to the select element
                            select_kelompokTujuan.appendChild(option);
                            select_kelompokTujuan.focus();
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        }
    });

    select_kelompokTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("kelompokTujuan");
    });

    select_kelompokTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_kelompokTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getSubKelompok",
                data: {
                    _token: csrfToken,
                    idKelompok: select_kelompokTujuan.value,
                },
                success: function (response) {
                    select_subKelompokTujuan.disabled = false;
                    // Clear only non-disabled options
                    Array.from(select_subKelompokTujuan.options).forEach(
                        (option) => {
                            if (!option.disabled) {
                                option.remove();
                            }
                        }
                    );
                    response.forEach((item) => {
                        // Create a new option element
                        const option = document.createElement("option");
                        // Set the value and text of the option
                        option.value = item.IdSubkelompok;
                        option.textContent = item.NamaSubKelompok;
                        // Append the option to the select element
                        select_subKelompokTujuan.appendChild(option);
                    });
                    select_subKelompokTujuan.focus();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        }
    });

    select_subKelompokTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("subkelompokTujuan");
    });

    select_subKelompokTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_subKelompokTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            // Clear only non-disabled options
            Array.from(select_typeTujuan.options).forEach((option) => {
                if (!option.disabled) {
                    option.remove();
                }
            });

            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getType",
                data: {
                    _token: csrfToken,
                    idSubKelompok: select_subKelompokTujuan.value,
                },
                success: function (response) {
                    select_typeTujuan.disabled = false;
                    if (select_kelompokUtamaTujuan.value == 1029) {
                        let itemsAdded = false; // Track if any item is added
                        // console.log(d_tek1PanjangRoll);

                        response.forEach((item) => {
                            // console.log(item.PanjangPotongan);
                            // console.log(item.LebarPotongan);
                            // If
                            if (
                                parseFloat(d_tek1PanjangRoll) !== "" &&
                                (parseFloat(d_tek1PanjangRoll) >
                                    parseFloat(item.PanjangPotongan) ||
                                    parseFloat(d_tek1PanjangRoll) >
                                        parseFloat(item.LebarPotongan))
                            ) {
                                const matchedOption =
                                    document.createElement("option");
                                matchedOption.value = item.IdType;
                                matchedOption.textContent =
                                    item.NamaType + " | " + item.IdType;
                                select_typeTujuan.appendChild(matchedOption);
                                itemsAdded = true;
                            }
                        });

                        if (!itemsAdded) {
                            Swal.fire({
                                icon: "warning",
                                title: "Perhatian",
                                text:
                                    "Tidak ukuran " +
                                    d_tek1PanjangRoll +
                                    " pada sub kelompok " +
                                    select_subKelompokTujuan.options[
                                        select_subKelompokTujuan.selectedIndex
                                    ].text,
                            }).then(() => {
                                select_subKelompokTujuan.focus();
                                select_typeTujuan.disabled = true;
                            });
                        } else {
                            select_subKelompokTujuan.focus();
                        }
                    } else {
                        response.forEach((item) => {
                            // Create a new option element
                            const option = document.createElement("option");
                            // Set the value and text of the option
                            option.value = item.IdType;
                            option.textContent =
                                item.NamaType + " | " + item.IdType;
                            // Append the option to the select element
                            select_typeTujuan.appendChild(option);
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_typeTujuan.focus();
            });
        }
    });

    select_typeTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("typeTujuan");
    });

    select_typeTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_typeTujuan.selectedIndex !== 0) {
            e.preventDefault();
            hasil_konversiPrimerTujuan.focus();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getDataType",
                data: {
                    _token: csrfToken,
                    IdType: select_typeTujuan.value,
                },
                success: function (data) {
                    satuan_saldoTerakhirTujuanPrimer.value =
                        data[0].satPrimer.trim();
                    satuan_saldoTerakhirTujuanSekunder.value =
                        data[0].satSekunder.trim();
                    satuan_saldoTerakhirTujuanTritier.value =
                        data[0].satTritier.trim();
                    saldo_terakhirTujuanPrimer.value = parseFloat(
                        data[0].SaldoPrimer
                    );
                    satuan_saldoTerakhirTujuanSekunder.value =
                        data[0].satSekunder.trim();
                    saldo_terakhirTujuanSekunder.value = parseFloat(
                        data[0].SaldoSekunder
                    );
                    saldo_terakhirTujuanTritier.value = parseFloat(
                        data[0].SaldoTritier
                    );
                    satuan_primerTujuan.value = data[0].satPrimer.trim();
                    satuan_sekunderTujuan.value = data[0].satSekunder.trim();
                    satuan_tritierTujuan.value = data[0].satTritier.trim();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                // check satuan_sekunderTujuan if null then hasil = 0
                if (satuan_sekunderTujuan.value !== "NULL") {
                    hasil_konversiSekunderTujuan.readOnly = false;
                    hasil_konversiSekunderTujuan.focus();
                } else {
                    hasil_konversiSekunderTujuan.value = numeral(0).format("0.00"); // prettier-ignore
                    hasil_konversiSekunderTujuan.readOnly = true;
                    hasil_konversiTritierTujuan.focus();
                }

                // check satuan_primerTujuan if null then hasil = 0
                if (satuan_primerTujuan.value !== "NULL") {
                    hasil_konversiPrimerTujuan.readOnly = false;
                    hasil_konversiPrimerTujuan.focus();
                } else {
                    hasil_konversiPrimerTujuan.value = numeral(0).format("0.00"); // prettier-ignore
                    hasil_konversiPrimerTujuan.readOnly = true;
                }

                if (table_daftarTujuanKonversi.column(4).data().sum() > 0) {
                    maxHasilKonversiTritier =
                        parseFloat(table_daftarAsalKonversi.data()[0][4]) *
                            1.03 -
                        table_daftarTujuanKonversi.column(4).data().sum();
                } else {
                    maxHasilKonversiTritier = table_daftarAsalKonversi.data()[0][4] * 1.03; // prettier-ignore
                }
            });
        }
    });

    hasil_konversiTritierTujuan.addEventListener("input", function (e) {
        let inputValue = parseFloat(e.target.value);
        // Check if the value exceeds the maximum allowed value
        if (inputValue > maxHasilKonversiTritier) {
            // Set the value to the maximum allowed
            e.target.value = maxHasilKonversiTritier;
            this.setCustomValidity("Input exceeds the maximum allowed value.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // button_timbangTujuanKonversi.addEventListener("click", function (e) {
    //     $.ajax({
    //         url: "http://127.0.0.1:8011/get-rs232-data",
    //         method: "GET",
    //         success: function (response) {
    //             // console.log(response);
    //             if (response.data) {
    //                 $("#hasil_konversiTritierTujuan").val(response.data);
    //             } else {
    //                 alert("Error: " + response.error);
    //             }
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             console.log("Error Status: " + textStatus);
    //             console.log("Error Thrown: " + errorThrown);
    //             alert("Failed to fetch RS232 data");
    //         },
    //     });
    // });

    button_tambahTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();
        // Id type Asal dan Tujuan tidak boleh sama
        let checkIdType = true;
        let checkHasilKonversi = true;
        let checkSelectInput = true;

        if (table_daftarAsalKonversi.data()[0][0] == select_typeTujuan.value) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Id Type Asal dan Tujuan tidak boleh sama!",
            });
            checkIdType = false;
        }

        // check quantity hasil konversi, apakah sesuai ketentuan
        if (
            (hasil_konversiPrimerTujuan.value == 0 &&
                hasil_konversiSekunderTujuan.value == 0 &&
                hasil_konversiTritierTujuan.value == 0) ||
            (hasil_konversiTritierTujuan.value == 0 &&
                satuan_tritierTujuan.value.trim() ==
                    satuan_saldoTerakhirTritierBarcodeAsal.value.trim())
        ) {
            hasil_konversiTritierTujuan.focus();
            hasil_konversiTritierTujuan.select();
            checkHasilKonversi = false;
        }

        if (select_typeTujuan.selectedIndex == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Hasil Konversi tidak boleh kosong!",
            }).then(() => {
                select_divisiTujuan.focus();
            });
            checkSelectInput = false;
        }

        // Check if all inputs are filled
        if (checkIdType && checkHasilKonversi && checkSelectInput) {
            // Array to store the input values
            let inputData = [
                select_typeTujuan.value,
                select_typeTujuan.options[
                    select_typeTujuan.selectedIndex
                ].textContent
                    .split(" | ")[0]
                    .trim(),
                hasil_konversiPrimerTujuan.value,
                hasil_konversiSekunderTujuan.value,
                hasil_konversiTritierTujuan.value,
                select_subKelompokTujuan.value,
            ];
            let isDuplicate = false;

            table_daftarTujuanKonversi
                .rows()
                .every(function (rowIdx, tableLoop, rowLoop) {
                    let rowData = this.data();

                    // Only check the first and second columns
                    if (
                        rowData[0] == inputData[0] ||
                        rowData[1] == inputData[1]
                    ) {
                        isDuplicate = true; // Check for duplicate entry in the first and second columns
                        return false; // Stop iteration if a match is found
                    }
                });

            if (isDuplicate) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Barang sudah pernah diinput ke tabel!",
                });
            } else {
                // Add a new row with all input data to the DataTable
                table_daftarTujuanKonversi.row.add(inputData).draw();

                // Loop through each select element
                selectIdsTujuan.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());

                    if (id !== "#select_divisiTujuan") {
                        $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                        $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                    }
                });

                // Clear all input text fields
                inputTextIdsTujuan.forEach((id) => {
                    $(id).val("");
                });
                select_divisiTujuan.focus();
                button_modalProses.disabled = false;
            }
        } else {
            Swal.fire("Pemberitahuan", "Ada kolom yang belum terisi", "info");
        }
    });

    button_updateTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();
        // Id type Asal dan Tujuan tidak boleh sama
        let checkIdType = true;
        let checkHasilKonversi = true;
        let checkSelectInput = true;

        if (table_daftarAsalKonversi.data()[0][0] == select_typeTujuan.value) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Id Type Asal dan Tujuan tidak boleh sama!",
            });
            checkIdType = false;
        }

        if (
            hasil_konversiPrimerTujuan.value == 0 &&
            hasil_konversiSekunderTujuan.value == 0 &&
            hasil_konversiTritierTujuan.value == 0
        ) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Hasil Konversi tidak boleh kosong!",
            }).then(() => {
                hasil_konversiTritierTujuan.focus();
                hasil_konversiTritierTujuan.select();
            });
            checkHasilKonversi = false;
        }

        if (select_typeTujuan.selectedIndex == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Hasil Konversi tidak boleh kosong!",
            }).then(() => {
                select_divisiTujuan.focus();
            });
            checkSelectInput = false;
        }

        // Check if all inputs are filled
        if (checkIdType && checkHasilKonversi && checkSelectInput) {
            // Array to store the input values
            let inputData = [
                select_typeTujuan.value,
                select_typeTujuan.options[
                    select_typeTujuan.selectedIndex
                ].textContent
                    .split(" | ")[0]
                    .trim(),
                hasil_konversiPrimerTujuan.value,
                hasil_konversiSekunderTujuan.value,
                hasil_konversiTritierTujuan.value,
                select_subKelompokTujuan.value,
            ];

            const selectedRow = table_daftarTujuanKonversi.row(".selected");

            if (selectedRow.any()) {
                // Update the selected row with the new data
                selectedRow.data(inputData).draw();

                // Remove the 'selected' class from any previously selected row
                $("#table_daftarTujuanKonversi tbody tr").removeClass(
                    "selected"
                );

                select_divisiTujuan.focus();
            } else {
                Swal.fire(
                    "Pemberitahuan",
                    "Pilih baris yang ingin diubah",
                    "info"
                );
            }

            // Remove the 'selected' class from any previously selected row
            $("#table_daftarTujuanKonversi tbody tr").removeClass("selected");

            // Loop through each select element
            selectIdsTujuan.forEach((id) => {
                const $select = $(id);
                // Select the disabled option
                $select.val($select.find("option[disabled]").val());

                if (id !== "#select_divisiTujuan") {
                    $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                }
            });

            // Clear all input text fields
            inputTextIdsTujuan.forEach((id) => {
                $(id).val("");
            });
            select_divisiTujuan.focus();
            button_tambahTujuanKonversi.disabled = false;
            button_hapusTujuanKonversi.disabled = true;
            button_updateTujuanKonversi.disabled = true;
            button_modalProses.disabled = false;
        } else {
            Swal.fire("Pemberitahuan", "Harap isi semua kolom", "info");
        }
    });

    button_hapusTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the selected row index
        const selectedRow = table_daftarTujuanKonversi.row(".selected");

        if (selectedRow.any()) {
            // Use Swal.fire for confirmation
            Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to delete the selected row?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            }).then((result) => {
                if (result.isConfirmed) {
                    // If user confirms, delete the selected row
                    selectedRow.remove().draw(false);

                    selectIdsTujuan.forEach((id) => {
                        const $select = $(id);
                        // Select the disabled option
                        $select.val($select.find("option[disabled]").val());

                        if (id !== "#select_divisiTujuan") {
                            $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                            $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                        }
                    });

                    // Clear all input text fields
                    inputTextIdsTujuan.forEach((id) => {
                        $(id).val("");
                    });
                    select_divisiTujuan.focus();

                    // Remove the 'selected' class from any previously selected row
                    $("#table_daftarTujuanKonversi tbody tr").removeClass(
                        "selected"
                    );

                    button_tambahTujuanKonversi.disabled = false;
                    button_hapusTujuanKonversi.disabled = true;
                    button_updateTujuanKonversi.disabled = true;
                    if (table_daftarTujuanKonversi.data().length < 1) {
                        button_modalProses.disabled = true;
                    }
                    // Force the table to refresh its internal data
                    table_daftarTujuanKonversi.rows().invalidate().draw();

                    // Show success message
                    Swal.fire("Berhasil!", "Baris sudah dihapus.", "success");
                } else if (result.isDismissed) {
                    // If user cancels, show a message or do nothing
                    Swal.fire(
                        "Pemberitahuan",
                        "Baris tidak jadi dihapus :)",
                        "info"
                    );
                }
            });
        } else {
            Swal.fire(
                "Pemberitahuan",
                "Pilih baris yang ingin dihapus.",
                "info"
            );
        }
    });

    button_modalProses.addEventListener("click", function (e) {
        // e.preventDefault();
        let sisaRoll = 0;
        sisaRoll =
            table_daftarAsalKonversi.data()[0][4] -
            table_daftarTujuanKonversi.column(4).data().sum();
        let lembarPerKilo =
            table_daftarAsalKonversi.data()[0][3] /
            table_daftarAsalKonversi.data()[0][4];
        if (id_shift.value !== "") {
            //0.03 = 3% toleransi konversi
            if (
                sisaRoll > table_daftarAsalKonversi.data()[0][4] * 0.03 &&
                checkSisaRoll == false
            ) {
                Swal.fire({
                    title: "Ada sisa roll!",
                    text: "Ingin membuat barcode baru untuk sisa roll?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        let totalPemakaianKg = table_daftarTujuanKonversi
                            .column(4) // column index for 'Hasil Konversi Tritier'
                            .data()
                            .reduce(function (a, b) {
                                return parseFloat(a) + parseFloat(b); // Ensure the values are treated as numbers
                            }, 0);
                        let sisaBarcodeKG =
                            table_daftarAsalKonversi.data()[0][4] -
                            totalPemakaianKg;
                        let perbandinganKgPerMeter = (
                            table_daftarAsalKonversi.data()[0][3] /
                            table_daftarAsalKonversi.data()[0][4]
                        ).toFixed(2);
                        let sisaBarcodeMtr = (
                            sisaBarcodeKG * perbandinganKgPerMeter
                        ).toFixed(2);
                        // tambah barang roll asal konversi ke dalam tabel tujuan konversi
                        let sisaBarcodeData = [
                            table_daftarAsalKonversi.data()[0][0],
                            table_daftarAsalKonversi.data()[0][1].trim(),
                            table_daftarAsalKonversi.data()[0][2],
                            sisaBarcodeMtr,
                            sisaBarcodeKG,
                            table_daftarAsalKonversi.data()[0][5],
                        ];
                        table_daftarTujuanKonversi.row
                            .add(sisaBarcodeData)
                            .draw();

                        Swal.fire({
                            icon: "info",
                            title: "Perhatian!",
                            text: "Tujuan Konversi ditambahkan sisa roll karena tidak memenuhi kuota pemakaian!",
                            showConfirmButton: false,
                        });
                        checkSisaRoll = true;
                    } else if (result.isDismissed) {
                        checkSisaRoll = true;
                    }
                });
            } else {
                submitPermohonan();
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Kolom shift harus diisi!",
                showConfirmButton: false,
            });
            id_shift.focus();
        }
    });

    $("#table_daftarTujuanKonversi tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_daftarTujuanKonversi tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_daftarTujuanKonversi.row(this).data();

        // If data exists, populate input fields
        if (Array.isArray(data) && data.length > 0) {
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getDataType",
                data: {
                    _token: csrfToken,
                    IdType: data[0],
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        select_divisiTujuan.value = response[0].IdDivisi;
                        let optionKoreksiObjekTujuan = document.createElement("option"); // prettier-ignore
                        let optionKoreksiKelompokUtamaTujuan = document.createElement("option"); // prettier-ignore
                        let optionKoreksiKelompokTujuan = document.createElement("option"); // prettier-ignore
                        let optionKoreksiSubKelompokTujuan = document.createElement("option"); // prettier-ignore
                        let optionKoreksiTypeTujuan = document.createElement("option"); // prettier-ignore

                        //Set up select objek
                        optionKoreksiObjekTujuan.value = response[0].IdObjek; // prettier-ignore
                        optionKoreksiObjekTujuan.textContent = response[0].NamaObjek; // prettier-ignore
                        select_objekTujuan.appendChild(optionKoreksiObjekTujuan); // prettier-ignore
                        select_objekTujuan.selectedIndex = 1; // prettier-ignore

                        //Set up select kelompok utama
                        optionKoreksiKelompokUtamaTujuan.value = response[0].IdKelompokUtama; // prettier-ignore
                        optionKoreksiKelompokUtamaTujuan.textContent = response[0].NamaKelompokUtama; // prettier-ignore
                        select_kelompokUtamaTujuan.appendChild(optionKoreksiKelompokUtamaTujuan); // prettier-ignore
                        select_kelompokUtamaTujuan.selectedIndex = 1; // prettier-ignore

                        //Set up select kelompok
                        optionKoreksiKelompokTujuan.value = response[0].IdKelompok; // prettier-ignore
                        optionKoreksiKelompokTujuan.textContent = response[0].NamaKelompok; // prettier-ignore
                        select_kelompokTujuan.appendChild(optionKoreksiKelompokTujuan); // prettier-ignore
                        select_kelompokTujuan.selectedIndex = 1; // prettier-ignore

                        //Set up select sub kelompok
                        optionKoreksiSubKelompokTujuan.value = response[0].IdSubkelompok; // prettier-ignore
                        optionKoreksiSubKelompokTujuan.textContent = response[0].NamaSubKelompok; // prettier-ignore
                        select_subKelompokTujuan.appendChild(optionKoreksiSubKelompokTujuan); // prettier-ignore
                        select_subKelompokTujuan.selectedIndex = 1; // prettier-ignore

                        //Set up select Id Type
                        optionKoreksiTypeTujuan.value = data[0]; // prettier-ignore
                        optionKoreksiTypeTujuan.textContent = data[1]; // prettier-ignore
                        select_typeTujuan.appendChild(optionKoreksiTypeTujuan); // prettier-ignore
                        select_typeTujuan.selectedIndex = 1; // prettier-ignore

                        hasil_konversiPrimerTujuan.value = data[2];
                        hasil_konversiSekunderTujuan.value = data[3];
                        hasil_konversiTritierTujuan.value = data[4];

                        button_tambahTujuanKonversi.disabled = true;
                        button_hapusTujuanKonversi.disabled = false;
                        button_updateTujuanKonversi.disabled = false;
                        hasil_konversiPrimerTujuan.readOnly = false;
                        hasil_konversiSekunderTujuan.readOnly = false;
                        hasil_konversiTritierTujuan.readOnly = false;
                        hasil_konversiPrimerTujuan.select();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        } else {
            Swal.fire(
                "Pemberitahuan",
                "Terjadi Kesalahan.",
                "Terjadi kesalahan saat click table tujuan konversi, hubungi EDP!"
            );
        }
    });

    $("#table_daftarAsalKonversi tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_daftarAsalKonversi tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_daftarAsalKonversi.row(this).data();

        // If data exists, populate input fields
        if (Array.isArray(data) && data.length > 0) {
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getDataType",
                data: {
                    _token: csrfToken,
                    IdType: data[0],
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        select_divisiAsal.value = response[0].IdDivisi;
                        let optionKoreksiObjekAsal = document.createElement("option"); // prettier-ignore
                        let optionKoreksiKelompokUtamaAsal = document.createElement("option"); // prettier-ignore
                        let optionKoreksiKelompokAsal = document.createElement("option"); // prettier-ignore
                        let optionKoreksiSubKelompokAsal = document.createElement("option"); // prettier-ignore
                        let optionKoreksiTypeAsal = document.createElement("option"); // prettier-ignore

                        //Set up select objek
                        optionKoreksiObjekAsal.value = response[0].IdObjek; // prettier-ignore
                        optionKoreksiObjekAsal.textContent = response[0].NamaObjek; // prettier-ignore
                        select_objekAsal.appendChild(optionKoreksiObjekAsal); // prettier-ignore
                        select_objekAsal.selectedIndex = 1; // prettier-ignore

                        //Set up select kelompok utama
                        optionKoreksiKelompokUtamaAsal.value = response[0].IdKelompokUtama; // prettier-ignore
                        optionKoreksiKelompokUtamaAsal.textContent = response[0].NamaKelompokUtama; // prettier-ignore
                        select_kelompokUtamaAsal.appendChild(optionKoreksiKelompokUtamaAsal); // prettier-ignore
                        select_kelompokUtamaAsal.selectedIndex = 1; // prettier-ignore

                        //Set up select kelompok
                        optionKoreksiKelompokAsal.value = response[0].IdKelompok; // prettier-ignore
                        optionKoreksiKelompokAsal.textContent = response[0].NamaKelompok; // prettier-ignore
                        select_kelompokAsal.appendChild(optionKoreksiKelompokAsal); // prettier-ignore
                        select_kelompokAsal.selectedIndex = 1; // prettier-ignore

                        //Set up select sub kelompok
                        optionKoreksiSubKelompokAsal.value = response[0].IdSubkelompok; // prettier-ignore
                        optionKoreksiSubKelompokAsal.textContent = response[0].NamaSubKelompok; // prettier-ignore
                        select_subKelompokAsal.appendChild(optionKoreksiSubKelompokAsal); // prettier-ignore
                        select_subKelompokAsal.selectedIndex = 1; // prettier-ignore

                        //Set up select Id Type
                        optionKoreksiTypeAsal.value = data[0]; // prettier-ignore
                        optionKoreksiTypeAsal.textContent = data[1]; // prettier-ignore
                        select_typeAsal.appendChild(optionKoreksiTypeAsal); // prettier-ignore
                        select_typeAsal.selectedIndex = 1; // prettier-ignore

                        asal_konversiPrimerAsal.value = data[2];
                        asal_konversiSekunderAsal.value = data[3];
                        asal_konversiTritierAsal.value = data[4];

                        button_tambahAsalKonversi.disabled = true;
                        button_hapusAsalKonversi.disabled = false;
                        button_updateAsalKonversi.disabled = false;
                        hasil_konversiPrimerAsal.readOnly = false;
                        hasil_konversiSekunderAsal.readOnly = false;
                        hasil_konversiTritierAsal.readOnly = false;
                        hasil_konversiPrimerAsal.select();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        } else {
            Swal.fire(
                "Pemberitahuan",
                "Terjadi Kesalahan.",
                "Terjadi kesalahan saat click table asal konversi, hubungi EDP!"
            );
        }
    });

    $(document).on("click", ".btn-acc", function (e) {
        //lakukan print barcode di sini
        e.preventDefault();
        let idkonversi = $(this).data("id");
        let responseSuccess;
        $.ajax({
            type: "POST",
            url: "/KonversiRollBarcode",
            data: {
                _token: csrfToken,
                idkonversi: idkonversi,
                divisi: "ADS",
                jenisStore: "accPermohonan",
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                } else {
                    // Extract values from the response
                    responseSuccess = response.success;
                    if (response.barcode && response.barcode !== "") {
                        let Kode_barang = response.barcode[0].Kode_barang;
                        let NoIndeks = response.barcode[0].NoIndeks;

                        // Pad NoIndeks to 9 digits
                        let paddedNoIndeks = NoIndeks.padStart(9, "0");

                        // Concatenate NoIndeks and Kode_barang
                        let barcodeValue = `${paddedNoIndeks}-${Kode_barang}`;

                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
                            text: responseSuccess,
                            showConfirmButton: false,
                        }).then(() => {
                            const barcodeCanvas = document.getElementById("div_printBarcode"); // prettier-ignore

                            // Set up a MutationObserver to detect changes to the canvas
                            const observer = new MutationObserver(
                                (mutations) => {
                                    mutations.forEach((mutation) => {
                                        if (
                                            mutation.type === "attributes" &&
                                            mutation.attributeName ===
                                                "data-rendered"
                                        ) {
                                            // Trigger window.print() when rendering is complete
                                            window.print();
                                            // Stop observing after print is triggered
                                            observer.disconnect();
                                        }
                                    });
                                }
                            );

                            // Start observing the canvas element
                            observer.observe(barcodeCanvas, {
                                attributes: true,
                            });

                            // Generate the barcode with JsBarcode
                            JsBarcode("#div_printBarcode", barcodeValue, {
                                format: "CODE128", // The format of the barcode (e.g., CODE128, EAN13, UPC, etc.)
                                width: 4, // Width of a single barcode unit
                                height: 200, // Height of the barcode
                                displayValue: true, // Display the value below the barcode
                            });

                            // Add a custom attribute after the barcode is rendered
                            barcodeCanvas.setAttribute("data-rendered", "true");
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
                            text: responseSuccess,
                            showConfirmButton: false,
                        });
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        }).then(() => {
            getDataPermohonan();
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalACC").data("id", rowID);
        document.getElementById("detailKonversiModalLabel").innerHTML =
            "Detail Permohonan Konversi " + rowID;
        $.ajax({
            url: "/KonversiRollBarcode/getDetailKonversi",
            type: "GET",
            data: {
                idKonversi: rowID,
            },
            success: function (response) {
                // Assuming your server returns an array of objects for the table data

                if (response && Array.isArray(response)) {
                    // Filter data for Asal Konversi Potong ADS
                    var asalData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Asal Konversi Setengah Jadi ADS"
                        );
                    });

                    // Filter data for Tujuan Konversi Potong ADS
                    var tujuanData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Tujuan Konversi Setengah Jadi ADS"
                        );
                    });

                    // Convert the data to match table column structure
                    var asalDataFormatted = asalData.map(function (item) {
                        return [
                            item.IdType, // Id Type Asal
                            item.NamaType, // Nama Type Asal
                            parseFloat(item.JumlahPengeluaranPrimer) +
                                " " +
                                (item.satPrimer.trim() ?? ""), // Pengeluaran Primer
                            parseFloat(item.JumlahPengeluaranSekunder) +
                                " " +
                                item.satSekunder.trim(), // Pengeluaran Sekunder
                            parseFloat(item.JumlahPengeluaranTritier) +
                                " " +
                                item.satTritier.trim(), // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    var tujuanDataFormatted = tujuanData.map(function (item) {
                        return [
                            item.IdType, // Id Type Tujuan
                            item.NamaType, // Nama Type Tujuan
                            parseFloat(item.JumlahPemasukanPrimer) +
                                " " +
                                (item.satPrimer.trim() ?? ""), // Pengeluaran Primer
                            parseFloat(item.JumlahPemasukanSekunder) +
                                " " +
                                item.satSekunder.trim(), // Pengeluaran Sekunder
                            parseFloat(item.JumlahPemasukanTritier) +
                                " " +
                                item.satTritier.trim(), // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    // Insert filtered data into table_daftarAsalKonversi
                    detail_konversiModalTableDaftarAsalKonversi
                        .clear()
                        .rows.add(asalDataFormatted)
                        .draw();

                    // Insert filtered data into table_daftarTujuanKonversi
                    detail_konversiModalTableDaftarTujuanKonversi
                        .clear()
                        .rows.add(tujuanDataFormatted)
                        .draw();
                    $("#detailKonversiModal").modal("show");
                } else {
                    console.error(
                        "Data is not in the expected format:",
                        response
                    );
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
                "Apakah anda yakin untuk menghapus data permohonan dengan id konversi " +
                rowID +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/KonversiRollBarcode/BatalACCDataKonversi",
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        idKonversi: rowID,
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
                            getDataPermohonan();
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

    //#region Get Element By ID Modal Tanpa Barcode

    const select_divisiTanpaBarcode = $('#select_divisiTanpaBarcode'); // prettier-ignore
    const select_kelompokAsalTanpaBarcode = $('#select_kelompokAsalTanpaBarcode'); // prettier-ignore
    const select_kelompokTujuanTanpaBarcode = $('#select_kelompokTujuanTanpaBarcode'); // prettier-ignore
    const select_kelompokUtamaAsalTanpaBarcode = $('#select_kelompokUtamaAsalTanpaBarcode'); // prettier-ignore
    const select_kelompokUtamaTujuanTanpaBarcode = $('#select_kelompokUtamaTujuanTanpaBarcode'); // prettier-ignore
    const select_objekAsalTanpaBarcode = $('#select_objekAsalTanpaBarcode'); // prettier-ignore
    const select_objekTujuanTanpaBarcode = $('#select_objekTujuanTanpaBarcode'); // prettier-ignore
    const select_subKelompokAsalTanpaBarcode = $('#select_subKelompokAsalTanpaBarcode'); // prettier-ignore
    const select_subKelompokTujuanTanpaBarcode = $('#select_subKelompokTujuanTanpaBarcode'); // prettier-ignore
    const select_typeAsalTanpaBarcode = $('#select_typeAsalTanpaBarcode'); // prettier-ignore
    const select_typeTujuanTanpaBarcode = $('#select_typeTujuanTanpaBarcode'); // prettier-ignore
    let button_hapusTujuanKonversiTanpaBarcode = document.getElementById('button_hapusTujuanKonversiTanpaBarcode'); // prettier-ignore
    let button_modalProsesTanpaBarcode = document.getElementById('button_modalProsesTanpaBarcode'); // prettier-ignore
    let button_tambahTujuanKonversiTanpaBarcode = document.getElementById('button_tambahTujuanKonversiTanpaBarcode'); // prettier-ignore
    let button_updateTujuanKonversiTanpaBarcode = document.getElementById('button_updateTujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_asalKonversiTanpaBarcode = document.getElementById('div_asalKonversiTanpaBarcode'); // prettier-ignore
    let div_PIBAsalTanpaBarcode = document.getElementById('div_PIBAsalTanpaBarcode'); // prettier-ignore
    let div_PIBTujuanTanpaBarcode = document.getElementById('div_PIBTujuanTanpaBarcode'); // prettier-ignore
    let div_tabelTujuanKonversiTanpaBarcode = document.getElementById('div_tabelTujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_tujuanKonversiTanpaBarcode = document.getElementById('div_tujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_headerFormTambahTujuanKonversiTanpaBarcode = document.getElementById('div_headerFormTambahTujuanKonversiTanpaBarcode'); // prettier-ignore
    let id_shiftTanpaBarcode = document.getElementById("id_shiftTanpaBarcode"); // prettier-ignore
    let input_tanggalKonversiTanpaBarcode = document.getElementById('input_tanggalKonversiTanpaBarcode'); // prettier-ignore
    let jumlah_pemakaianPrimerTanpaBarcode = document.getElementById('jumlah_pemakaianPrimerTanpaBarcode'); // prettier-ignore
    let jumlah_pemakaianSekunderTanpaBarcode = document.getElementById('jumlah_pemakaianSekunderTanpaBarcode'); // prettier-ignore
    let jumlah_pemakaianTritierTanpaBarcode = document.getElementById('jumlah_pemakaianTritierTanpaBarcode'); // prettier-ignore
    let jumlah_pemasukanPrimerTanpaBarcode = document.getElementById('jumlah_pemasukanPrimerTanpaBarcode'); // prettier-ignore
    let jumlah_pemasukanSekunderTanpaBarcode = document.getElementById('jumlah_pemasukanSekunderTanpaBarcode'); // prettier-ignore
    let jumlah_pemasukanTritierTanpaBarcode = document.getElementById('jumlah_pemasukanTritierTanpaBarcode'); // prettier-ignore
    let PIB_asalTanpaBarcode = document.getElementById('PIB_asalTanpaBarcode'); // prettier-ignore
    let PIB_tujuanTanpaBarcode = document.getElementById('PIB_tujuanTanpaBarcode'); // prettier-ignore
    let saldo_terakhirPrimerAsalTanpaBarcode = document.getElementById('saldo_terakhirPrimerAsalTanpaBarcode'); // prettier-ignore
    let saldo_terakhirPrimerTujuanTanpaBarcode = document.getElementById('saldo_terakhirPrimerTujuanTanpaBarcode'); // prettier-ignore
    let saldo_terakhirSekunderAsalTanpaBarcode = document.getElementById('saldo_terakhirSekunderAsalTanpaBarcode'); // prettier-ignore
    let saldo_terakhirSekunderTujuanTanpaBarcode = document.getElementById('saldo_terakhirSekunderTujuanTanpaBarcode'); // prettier-ignore
    let saldo_terakhirTritierAsalTanpaBarcode = document.getElementById('saldo_terakhirTritierAsalTanpaBarcode'); // prettier-ignore
    let saldo_terakhirTritierTujuanTanpaBarcode = document.getElementById('saldo_terakhirTritierTujuanTanpaBarcode'); // prettier-ignore
    let satuan_primerJumlahPemakaianTanpaBarcode = document.getElementById('satuan_primerJumlahPemakaianTanpaBarcode'); // prettier-ignore
    let satuan_primerJumlahPemasukanTanpaBarcode = document.getElementById('satuan_primerJumlahPemasukanTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirPrimerAsalTanpaBarcode = document.getElementById('satuan_saldoTerakhirPrimerAsalTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirPrimerTujuanTanpaBarcode = document.getElementById('satuan_saldoTerakhirPrimerTujuanTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirSekunderAsalTanpaBarcode = document.getElementById('satuan_saldoTerakhirSekunderAsalTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirSekunderTujuanTanpaBarcode = document.getElementById('satuan_saldoTerakhirSekunderTujuanTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirTritierAsalTanpaBarcode = document.getElementById('satuan_saldoTerakhirTritierAsalTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirTritierTujuanTanpaBarcode = document.getElementById('satuan_saldoTerakhirTritierTujuanTanpaBarcode'); // prettier-ignore
    let satuan_sekunderJumlahPemakaianTanpaBarcode = document.getElementById('satuan_sekunderJumlahPemakaianTanpaBarcode'); // prettier-ignore
    let satuan_sekunderJumlahPemasukanTanpaBarcode = document.getElementById('satuan_sekunderJumlahPemasukanTanpaBarcode'); // prettier-ignore
    let satuan_tritierJumlahPemakaianTanpaBarcode = document.getElementById('satuan_tritierJumlahPemakaianTanpaBarcode'); // prettier-ignore
    let satuan_tritierJumlahPemasukanTanpaBarcode = document.getElementById('satuan_tritierJumlahPemasukanTanpaBarcode'); // prettier-ignore
    let tambahTujuanModalLabelTanpaBarcode = document.getElementById('tambahTujuanModalLabelTanpaBarcode'); // prettier-ignore
    let tambahTujuanModalTanpaBarcode = document.getElementById('tambahTujuanModalTanpaBarcode'); // prettier-ignore

    let table_daftarAsalKonversiTanpaBarcode = $(
        "#table_daftarAsalKonversiTanpaBarcode"
    ).DataTable({
        paging: false,
        searching: false,
        info: false,
        autoWidth: false,
    });
    //#endregion

    //#region Function Modal Tanpa Barcode

    function getSelectElementsByType(tipeInitialisasi) {
        const elementSets = {
            showModal: [
                { element: select_objekAsalTanpaBarcode, placeholder: "Pilih Objek Asal" }, // prettier-ignore
                { element: select_kelompokUtamaAsalTanpaBarcode, placeholder: "Pilih Kelompok Utama Asal"}, // prettier-ignore
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
                { element: select_objekTujuanTanpaBarcode,placeholder: "Pilih Objek Tujuan"}, // prettier-ignore
                { element: select_kelompokUtamaTujuanTanpaBarcode,placeholder: "Pilih Kelompok Utama Tujuan"}, // prettier-ignore
                { element: select_kelompokTujuanTanpaBarcode,placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
            ],
            pilihDivisi: [
                { element: select_objekAsalTanpaBarcode, placeholder: "Pilih Objek Asal" }, // prettier-ignore
                { element: select_kelompokUtamaAsalTanpaBarcode, placeholder: "Pilih Kelompok Utama Asal"}, // prettier-ignore
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
                { element: select_objekTujuanTanpaBarcode, placeholder: "Pilih Objek Tujuan"}, // prettier-ignore
                { element: select_kelompokUtamaTujuanTanpaBarcode, placeholder: "Pilih Kelompok Utama Tujuan"}, // prettier-ignore
                { element: select_kelompokTujuanTanpaBarcode, placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
            ],
            pilihObjekAsal: [
                { element: select_kelompokUtamaAsalTanpaBarcode, placeholder: "Pilih Kelompok Utama Asal"}, // prettier-ignore
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihKelompokUtamaAsal: [
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihKelompokAsal: [
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihSubKelompokAsal: [
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihObjekTujuan: [
                { element: select_kelompokUtamaTujuanTanpaBarcode, placeholder: "Pilih Kelompok Utama Tujuan"}, // prettier-ignore
                { element: select_kelompokTujuanTanpaBarcode, placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
            pilihKelompokUtamaTujuan: [
                { element: select_kelompokTujuanTanpaBarcode, placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
            pilihKelompokTujuan: [
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
            pilihSubKelompokTujuan: [
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
        };

        return elementSets[tipeInitialisasi] || [];
    }

    function initializeSelectElement(tipeInitialisasi) {
        // Define an array of select elements and their placeholders based on tipeInitialisasi
        let selectElements = getSelectElementsByType(tipeInitialisasi);

        // Initialize each select element with Select2 and set the placeholder
        selectElements.forEach(({ element, placeholder }) => {
            element.select2({
                dropdownParent: $("#modalBodyTambahTujuanKonversiTanpaBarcode"),
                placeholder: placeholder,
            });
        });

        // Special case for select_divisi initialization in "showModal"
        if (tipeInitialisasi === "showModal") {
            select_divisiTanpaBarcode.select2({
                dropdownParent: $("#modalBodyTambahTujuanKonversiTanpaBarcode"),
                placeholder: "Pilih Divisi",
            });
        }
    }

    function clearSelectElement(tipeInitialisasi) {
        // Get the array of select elements based on tipeInitialisasi
        let selectElements = getSelectElementsByType(tipeInitialisasi);

        // Clear each select element and set placeholder
        selectElements.forEach(({ element, placeholder }) => {
            element
                .empty()
                .append(
                    `<option value="" disabled selected>${placeholder}</option>`
                );
        });
    }

    function clearInputTextElements(tipeClearInput) {
        let inputTextIds = [];
        if (tipeClearInput == "pilihIdTypeAsal") {
            inputTextIds = [
                "saldo_terakhirPrimerAsalTanpaBarcode",
                "satuan_saldoTerakhirPrimerAsalTanpaBarcode",
                "saldo_terakhirSekunderAsalTanpaBarcode",
                "satuan_saldoTerakhirSekunderAsalTanpaBarcode",
                "saldo_terakhirTritierAsalTanpaBarcode",
                "satuan_saldoTerakhirTritierAsalTanpaBarcode",
                "jumlah_pemakaianPrimerTanpaBarcode",
                "satuan_primerJumlahPemakaianTanpaBarcode",
                "jumlah_pemakaianSekunderTanpaBarcode",
                "satuan_sekunderJumlahPemakaianTanpaBarcode",
                "jumlah_pemakaianTritierTanpaBarcode",
                "satuan_tritierJumlahPemakaianTanpaBarcode",
            ];
        } else {
            inputTextIds = [
                "saldo_terakhirPrimerTujuanTanpaBarcode",
                "satuan_saldoTerakhirPrimerTujuanTanpaBarcode",
                "saldo_terakhirSekunderTujuanTanpaBarcode",
                "satuan_saldoTerakhirSekunderTujuanTanpaBarcode",
                "saldo_terakhirTritierTujuanTanpaBarcode",
                "satuan_saldoTerakhirTritierTujuanTanpaBarcode",
                "jumlah_pemasukanPrimerTanpaBarcode",
                "satuan_primerJumlahPemasukanTanpaBarcode",
                "jumlah_pemasukanSekunderTanpaBarcode",
                "satuan_sekunderJumlahPemasukanTanpaBarcode",
                "jumlah_pemasukanTritierTanpaBarcode",
                "satuan_tritierJumlahPemasukanTanpaBarcode",
            ];
        }

        inputTextIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = ""; // Clear the text
            }
        });
    }

    function readOnlyInputTextElements(tipeReadOnlyInput) {
        let inputTextIds = [];
        if (tipeReadOnlyInput == "pilihIdTypeAsal") {
            inputTextIds = [
                "jumlah_pemakaianPrimerTanpaBarcode",
                "jumlah_pemakaianSekunderTanpaBarcode",
            ];
        } else {
            inputTextIds = [
                "jumlah_pemasukanPrimerTanpaBarcode",
                "jumlah_pemasukanSekunderTanpaBarcode",
            ];
        }

        inputTextIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.readOnly = true; // set text input to readonly
            }
        });
    }

    //#endregion

    //#region Event Listener Modal Tanpa Barcode

    closeModalButtonTanpaBarcode.addEventListener("click", function () {
        $("#tambahTujuanModalTanpaBarcode").modal("hide");
    });

    $("#tambahTujuanModalTanpaBarcode").on("shown.bs.modal", function (event) {
        table_daftarAsalKonversiTanpaBarcode.clear().draw(); //Clear Table
        button_updateAsalKonversiTanpaBarcode.disabled = true;
        button_hapusAsalKonversiTanpaBarcode.disabled = true;
        button_modalProsesTanpaBarcode.disabled = true;
        jumlah_pemasukanPrimerTanpaBarcode.readOnly = true;
        jumlah_pemasukanSekunderTanpaBarcode.readOnly = true;
        jumlah_pemasukanTritierTanpaBarcode.readOnly = true;

        document
            .querySelectorAll("#tambahTujuanModalTanpaBarcode input")
            .forEach((input) => {
                input.value = "";
            });
        input_tanggalKonversiTanpaBarcode.valueAsDate = new Date();
        initializeSelectElement("showModal"); //Initialize all select element inside modal
        clearSelectElement("showModal");
        select_divisiTanpaBarcode.val(null).trigger("change"); // Clear selected index for select_divisi

        setTimeout(() => {
            input_tanggalKonversiTanpaBarcode.focus();
        }, 150);

        const InputIds = [
            "jumlah_pemasukanTritierTanpaBarcode",
            "jumlah_pemasukanSekunderTanpaBarcode",
            "jumlah_pemasukanPrimerTanpaBarcode",
            "jumlah_pemakaianPrimerTanpaBarcode",
            "jumlah_pemakaianSekunderTanpaBarcode",
            "jumlah_pemakaianTritierTanpaBarcode",
        ];

        function getNextFocusableElement(currentElement) {
            if (currentElement.id === "jumlah_pemasukanTritierTanpaBarcode") {
                return button_tambahTujuanKonversiTanpaBarcode.disabled
                    ? document.getElementById("button_updateTujuanKonversiTanpaBarcode") // prettier-ignore
                    : document.getElementById("button_tambahTujuanKonversiTanpaBarcode"); // prettier-ignore
            }

            let elements = document.querySelectorAll(
                "input, select, textarea, button"
            );
            let currentIndex = Array.prototype.indexOf.call(
                elements,
                currentElement
            );

            for (let i = currentIndex + 1; i < elements.length; i++) {
                if (!elements[i].readOnly && !elements[i].disabled) {
                    return elements[i];
                }
            }
            return null;
        }

        InputIds.forEach(function (id) {
            const inputElement = document.getElementById(id);
            let element = document.getElementById(id);
            if (inputElement) {
                setInputFilter(
                    inputElement,
                    function (value) {
                        // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
                        return /^\d*[.]?\d*$/.test(value);
                    },
                    "Tidak boleh karakter atau koma, harus angka dengan titik desimal"
                );
                element.addEventListener("keypress", function (e) {
                    if (e.key == "Enter") {
                        e.preventDefault(); // Prevent the default action of the Enter key

                        if (this.value == "") {
                            this.value = 0;
                        }

                        var value = parseFloat(this.value);
                        if (!isNaN(value)) {
                            this.value = parseFloat(value).toFixed(2);
                        }

                        // Find the next input element that is not readonly or disabled
                        let nextElement = getNextFocusableElement(this);
                        if (nextElement) {
                            nextElement.focus();
                            if (nextElement.type == "text") {
                                nextElement.select();
                            }
                        }
                    }
                });
            }
        });
    });
    // $("#tambahTujuanModalTanpaBarcode").on("shown.bs.modal", function (event) {
    //     checkSisaRoll = false;
    //     input_tanggalKonversiTanpaBarcode.valueAsDate = new Date();
    //     input_tanggalKonversiTanpaBarcode.focus();
    //     satuan_primerTujuan.readOnly = true;
    //     satuan_sekunderTujuan.readOnly = true;
    //     satuan_tritierTujuan.readOnly = true;
    //     satuan_saldoTerakhirTujuanPrimer.readOnly = true;
    //     satuan_saldoTerakhirTujuanSekunder.readOnly = true;
    //     satuan_saldoTerakhirTujuanTritier.readOnly = true;
    //     saldo_terakhirTujuanPrimer.readOnly = true;
    //     saldo_terakhirTujuanSekunder.readOnly = true;
    //     saldo_terakhirTujuanTritier.readOnly = true;
    //     select_objekTujuan.disabled = true;
    //     select_kelompokUtamaTujuan.disabled = true;
    //     select_kelompokTujuan.disabled = true;
    //     select_subKelompokTujuan.disabled = true;
    //     select_typeTujuan.disabled = true;
    //     PIB_tujuan.readOnly = true;
    //     button_updateTujuanKonversi.disabled = true;
    //     button_hapusTujuanKonversi.disabled = true;
    //     button_modalProses.disabled = true;
    //     if (
    //         nomorUser !== "4384" && //adam
    //         nomorUser !== "4199" && //kelvin
    //         nomorUser !== "6978" //rosita
    //     ) {
    //         hasil_konversiTritierTujuan.readOnly = true;
    //         button_timbangTujuanKonversi.disabled = false;
    //     }

    //     const buttonInputIds = [
    //         "hasil_konversiPrimerTujuan",
    //         "hasil_konversiSekunderTujuan",
    //         "hasil_konversiTritierTujuan",
    //     ];

    //     function getNextFocusableElement(currentElement) {
    //         // Find the next focusable element in the form
    //         if (currentElement.id === "hasil_konversiTritierTujuan") {
    //             return button_tambahTujuanKonversi.disabled
    //                 ? document.getElementById("button_updateTujuanKonversi")
    //                 : document.getElementById("button_tambahTujuanKonversi");
    //         }

    //         let elements = document.querySelectorAll(
    //             "input, select, textarea, button"
    //         );
    //         let currentIndex = Array.prototype.indexOf.call(
    //             elements,
    //             currentElement
    //         );

    //         for (let i = currentIndex + 1; i < elements.length; i++) {
    //             if (!elements[i].readOnly && !elements[i].disabled) {
    //                 return elements[i];
    //             }
    //         }
    //         return null;
    //     }

    //     buttonInputIds.forEach(function (id) {
    //         const inputElement = document.getElementById(id);
    //         let element = document.getElementById(id);
    //         if (inputElement) {
    //             setInputFilter(
    //                 inputElement,
    //                 function (value) {
    //                     // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
    //                     return /^\d*[.]?\d*$/.test(value);
    //                 },
    //                 "Tidak boleh karakter atau koma, harus angka dengan titik desimal"
    //             );
    //             element.addEventListener("keypress", function (e) {
    //                 if (e.key == "Enter") {
    //                     e.preventDefault(); // Prevent the default action of the Enter key

    //                     if (this.value == "") {
    //                         this.value = 0;
    //                     }

    //                     var value = parseFloat(this.value);
    //                     if (!isNaN(value)) {
    //                         this.value = parseFloat(value).toFixed(2);
    //                     }

    //                     // Find the next input element that is not readonly or disabled
    //                     let nextElement = getNextFocusableElement(this);
    //                     if (nextElement) {
    //                         nextElement.focus();
    //                         if (nextElement.type == "text") {
    //                             nextElement.select();
    //                         }
    //                     }
    //                 }
    //             });
    //         }
    //     });
    // });

    //#endregion
});
