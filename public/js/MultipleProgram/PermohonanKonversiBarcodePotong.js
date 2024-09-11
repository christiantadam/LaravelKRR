$(document).ready(function () {
    //#region Get element by ID
    let button_hapusTujuanKonversi = document.getElementById("button_hapusTujuanKonversi"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let button_tambahTujuanKonversi = document.getElementById("button_tambahTujuanKonversi"); // prettier-ignore
    let button_updateTujuanKonversi = document.getElementById("button_updateTujuanKonversi"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let detailKonversiModal = document.getElementById("detailKonversiModal"); // prettier-ignore
    let div_PIBTujuan = document.getElementById("div_PIBTujuan"); // prettier-ignore
    let id_divisiTujuan = document.getElementById("id_divisiTujuan"); // prettier-ignore
    let id_kelompokTujuan = document.getElementById("id_kelompokTujuan"); // prettier-ignore
    let id_kelompokUtamaTujuan = document.getElementById("id_kelompokUtamaTujuan"); // prettier-ignore
    let id_objekTujuan = document.getElementById("id_objekTujuan"); // prettier-ignore
    let id_shift = document.getElementById("id_shift"); // prettier-ignore
    let id_subKelompokTujuan = document.getElementById("id_subKelompokTujuan"); // prettier-ignore
    let id_typeTujuan = document.getElementById("id_typeTujuan"); // prettier-ignore
    let input_barcodeAsal = document.getElementById("input_barcodeAsal"); // prettier-ignore
    let nama_divisiTujuan = document.getElementById("nama_divisiTujuan"); // prettier-ignore
    let nama_kelompokTujuan = document.getElementById("nama_kelompokTujuan"); // prettier-ignore
    let nama_kelompokUtamaTujuan = document.getElementById("nama_kelompokUtamaTujuan"); // prettier-ignore
    let nama_objekTujuan = document.getElementById("nama_objekTujuan"); // prettier-ignore
    let nama_subKelompokTujuan = document.getElementById("nama_subKelompokTujuan"); // prettier-ignore
    let nama_typeTujuan = document.getElementById("nama_typeTujuan"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser").value; // prettier-ignore
    let hasil_konversiPrimerTujuan = document.getElementById("hasil_konversiPrimerTujuan"); // prettier-ignore
    let hasil_konversiSekunderTujuan = document.getElementById("hasil_konversiSekunderTujuan"); // prettier-ignore
    let hasil_konversiTritierTujuan = document.getElementById("hasil_konversiTritierTujuan"); // prettier-ignore
    let PIB_tujuan = document.getElementById("PIB_tujuan"); // prettier-ignore
    let proses = 0;
    let saldo_terakhirPrimerAsal = document.getElementById("saldo_terakhirPrimerAsal"); // prettier-ignore
    let saldo_terakhirSekunderAsal = document.getElementById("saldo_terakhirSekunderAsal"); // prettier-ignore
    let saldo_terakhirTritierAsal = document.getElementById("saldo_terakhirTritierAsal"); // prettier-ignore
    let saldo_terakhirTujuanPrimer = document.getElementById("saldo_terakhirTujuanPrimer"); // prettier-ignore
    let saldo_terakhirTujuanSekunder = document.getElementById("saldo_terakhirTujuanSekunder"); // prettier-ignore
    let saldo_terakhirTujuanTritier = document.getElementById("saldo_terakhirTujuanTritier"); // prettier-ignore
    let satuan_primerTujuan = document.getElementById("satuan_primerTujuan"); // prettier-ignore
    let satuan_saldoTerakhirPrimerAsal = document.getElementById("satuan_saldoTerakhirPrimerAsal"); // prettier-ignore
    let satuan_saldoTerakhirSekunderAsal = document.getElementById("satuan_saldoTerakhirSekunderAsal"); // prettier-ignore
    let satuan_saldoTerakhirTritierAsal = document.getElementById("satuan_saldoTerakhirTritierAsal"); // prettier-ignore
    let satuan_saldoTerakhirTujuanPrimer = document.getElementById("satuan_saldoTerakhirTujuanPrimer"); // prettier-ignore
    let satuan_saldoTerakhirTujuanSekunder = document.getElementById("satuan_saldoTerakhirTujuanSekunder"); // prettier-ignore
    let satuan_saldoTerakhirTujuanTritier = document.getElementById("satuan_saldoTerakhirTujuanTritier"); // prettier-ignore
    let satuan_sekunderTujuan = document.getElementById("satuan_sekunderTujuan"); // prettier-ignore
    let satuan_tritierTujuan = document.getElementById("satuan_tritierTujuan"); // prettier-ignore
    let select_divisiTujuan = document.getElementById("select_divisiTujuan"); // prettier-ignore
    let select_kelompokTujuan = document.getElementById("select_kelompokTujuan"); // prettier-ignore
    let select_kelompokUtamaTujuan = document.getElementById("select_kelompokUtamaTujuan"); // prettier-ignore
    let select_objekTujuan = document.getElementById("select_objekTujuan"); // prettier-ignore
    let select_subKelompokTujuan = document.getElementById("select_subKelompokTujuan"); // prettier-ignore
    let select_typeTujuan = document.getElementById("select_typeTujuan"); // prettier-ignore
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
                        '"id="button_accPermohonan">ACC</button> ' +
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
    let detail_konversiModalTableDaftarAsalKonversi = $("#detail_konversiModalTableDaftarAsalKonversi").DataTable(); // prettier-ignore
    let detail_konversiModalTableDaftarTujuanKonversi = $("#detail_konversiModalTableDaftarTujuanKonversi").DataTable(); // prettier-ignore
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore
    let kodeBarangAsal;
    let nomorIndeksBarangAsal;
    // Array of select element IDs
    const selectIds = [
        "#select_divisiTujuan",
        "#select_objekTujuan",
        "#select_kelompokUtamaTujuan",
        "#select_kelompokTujuan",
        "#select_subKelompokTujuan",
        "#select_typeTujuan",
    ];
    // Array of input text element IDs to clear
    const inputTextIds = [
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

    //#region Function

    function getDataPermohonan() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/PermohonanKonversiBarcodePotong/create",
            type: "GET",
            success: function (response) {
                // Assuming your server returns an array of objects for the table data

                table_daftarKonversi.clear().rows.add(response.data).draw();
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    getDataPermohonan();

    //#endregion

    //#region Add Event Listener
    button_tambahKonversi.addEventListener("click", function () {
        let inputBuffer = ""; // Buffer to store the input from the scanner
        let inputTimer; // Timer to check the speed of input
        const scannerThreshold = 50; // Time in milliseconds; adjust based on your scanner speed

        // Show SweetAlert2 with input field
        Swal.fire({
            title: "Enter Barcode",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                autocomplete: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                // Custom validation or handling logic
                if (inputValue.length < 19) {
                    Swal.showValidationMessage(
                        "Scan Barcode Tidak Boleh Kosong"
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                // Handle the submitted value here
                nomorIndeksBarangAsal = result.value.split("-")[0].trim();
                kodeBarangAsal = result.value.split("-")[1].trim();

                $.ajax({
                    url: "/PermohonanKonversiBarcodePotong/getDataAsalKonversi",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        nomorIndeksBarangAsal: nomorIndeksBarangAsal,
                        kodeBarangAsal: kodeBarangAsal,
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
                            table_daftarAsalKonversi.row
                                .add(dataAsalKonversiInput)
                                .draw();
                            // Show Bootstrap modal after confirming SweetAlert2
                            // let modalTambahTujuanModal = new bootstrap.Modal(tambahTujuanModal); // prettier-ignore
                            // modalTambahTujuanModal.show();
                            $("#tambahTujuanModal").modal("show");
                            input_barcodeAsal.value = result.value;
                            saldo_terakhirPrimerAsal.value = dataAsalKonversi[0].SaldoPrimer // prettier-ignore
                            saldo_terakhirSekunderAsal.value = dataAsalKonversi[0].SaldoSekunder // prettier-ignore
                            saldo_terakhirTritierAsal.value = dataAsalKonversi[0].SaldoTritier // prettier-ignore
                            satuan_saldoTerakhirPrimerAsal.value = dataAsalKonversi[0].satPrimer // prettier-ignore
                            satuan_saldoTerakhirSekunderAsal.value = dataAsalKonversi[0].satSekunder // prettier-ignore
                            satuan_saldoTerakhirTritierAsal.value = dataAsalKonversi[0].satTritier // prettier-ignore
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.error(err.Message);
                    },
                });
            }
        });
        if (nomorUser !== "4384") {
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

    tambahTujuanModal.addEventListener("hidden.bs.modal", function (event) {
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

    tambahTujuanModal.addEventListener("shown.bs.modal", function (event) {
        id_shift.focus();
        input_barcodeAsal.readOnly = true;
        satuan_primerTujuan.readOnly = true;
        satuan_sekunderTujuan.readOnly = true;
        satuan_tritierTujuan.readOnly = true;
        saldo_terakhirPrimerAsal.readOnly = true;
        saldo_terakhirSekunderAsal.readOnly = true;
        saldo_terakhirTritierAsal.readOnly = true;
        satuan_saldoTerakhirPrimerAsal.readOnly = true;
        satuan_saldoTerakhirSekunderAsal.readOnly = true;
        satuan_saldoTerakhirTritierAsal.readOnly = true;
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

        const buttonTypeTujuanInputIds = [
            "hasil_konversiPrimerTujuan",
            "hasil_konversiSekunderTujuan",
            "hasil_konversiTritierTujuan",
        ];

        function getNextFocusableElement(currentElement) {
            // Find the next focusable element in the form
            if (currentElement.id === "hasil_konversiTritierTujuan") {
                if (button_tambahTujuanKonversi.disabled) {
                    return document.getElementById(
                        "button_updateTujuanKonversi"
                    );
                } else {
                    return document.getElementById(
                        "button_tambahTujuanKonversi"
                    );
                }
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

        buttonTypeTujuanInputIds.forEach(function (id) {
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

    button_modalProses.addEventListener("click", function (e) {
        // e.preventDefault();
        if (id_shift.value !== "") {
            $.ajax({
                type: "POST",
                url: "/PermohonanKonversiBarcodePotong",
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
                    jenisStore: "permohonan",
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

    select_divisiTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        select_objekTujuan.disabled = true;
        select_kelompokUtamaTujuan.disabled = true;
        select_kelompokTujuan.disabled = true;
        select_subKelompokTujuan.disabled = true;
        select_typeTujuan.disabled = true;
    });

    select_divisiTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_divisiTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getObjek",
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
        select_kelompokUtamaTujuan.disabled = true;
        select_kelompokTujuan.disabled = true;
        select_subKelompokTujuan.disabled = true;
        select_typeTujuan.disabled = true;
    });

    select_objekTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_objekTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getKelompokUtama",
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
        select_kelompokTujuan.disabled = true;
        select_subKelompokTujuan.disabled = true;
        select_typeTujuan.disabled = true;
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
                url: "/PermohonanKonversiBarcodePotong/getKelompok",
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
                    response.forEach((item) => {
                        // Create a new option element
                        const option = document.createElement("option");
                        // Set the value and text of the option
                        option.value = item.idkelompok;
                        option.textContent = item.namakelompok;
                        // Append the option to the select element
                        select_kelompokTujuan.appendChild(option);
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_kelompokTujuan.focus();
            });
        }
    });

    select_kelompokTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        select_subKelompokTujuan.disabled = true;
        select_typeTujuan.disabled = true;
    });

    select_kelompokTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_kelompokTujuan.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getSubKelompok",
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
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_subKelompokTujuan.focus();
            });
        }
    });

    select_subKelompokTujuan.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        select_typeTujuan.disabled = true;
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
                url: "/PermohonanKonversiBarcodePotong/getType",
                data: {
                    _token: csrfToken,
                    idSubKelompok: select_subKelompokTujuan.value,
                },
                success: function (response) {
                    select_typeTujuan.disabled = false;
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
    });

    select_typeTujuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_typeTujuan.selectedIndex !== 0) {
            e.preventDefault();
            hasil_konversiPrimerTujuan.focus();
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getDataType",
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

                // let totalTritierHasilKonversi = 0.0;
                let maxHasilKonversiTritier = 0;

                // table_daftarTujuanKonversi
                //     .rows()
                //     .every(function (rowIdx, tableLoop, rowLoop) {
                //         let rowData = this.data();

                //         // Satuan hasil konversi dibandingkan dengan asal konversi
                //         if (
                //             satuan_tritierTujuan.value.trim() ==
                //             satuan_saldoTerakhirTritierAsal.value.trim()
                //         ) {
                //             totalTritierHasilKonversi += parseFloat(rowData[4]);
                //         }
                //     });

                if (table_daftarTujuanKonversi.column(4).data().sum() > 0) {
                    maxHasilKonversiTritier =
                        table_daftarAsalKonversi.data()[0][4] -
                        table_daftarTujuanKonversi.column(4).data().sum();
                } else {
                    maxHasilKonversiTritier =
                        table_daftarAsalKonversi.data()[0][4];
                }

                console.log(table_daftarTujuanKonversi.column(4).data().sum());
                console.log(table_daftarAsalKonversi.data()[0][4]);
                console.log(maxHasilKonversiTritier);

                hasil_konversiTritierTujuan.addEventListener(
                    "input",
                    function (e) {
                        let inputValue = parseFloat(e.target.value);

                        // Check if the value exceeds the maximum allowed value
                        if (inputValue > maxHasilKonversiTritier) {
                            // Set the value to the maximum allowed
                            e.target.value = maxHasilKonversiTritier;
                            this.setCustomValidity(
                                "Input exceeds the maximum allowed value."
                            );
                        } else {
                            this.setCustomValidity("");
                        }
                        this.reportValidity();
                    }
                );
            });
        }
    });

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
                    satuan_saldoTerakhirTritierAsal.value.trim())
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
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());

                    if (id !== "#select_divisiTujuan") {
                        $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                        $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                    }
                });

                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                select_divisiTujuan.focus();
                button_modalProses.disabled = false;
            }
        } else {
            Swal.fire("Pemberitahuan", "Harap isi sesuai ketentuan", "info");
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
            selectIds.forEach((id) => {
                const $select = $(id);
                // Select the disabled option
                $select.val($select.find("option[disabled]").val());

                if (id !== "#select_divisiTujuan") {
                    $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                }
            });

            // Clear all input text fields
            inputTextIds.forEach((id) => {
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

                    selectIds.forEach((id) => {
                        const $select = $(id);
                        // Select the disabled option
                        $select.val($select.find("option[disabled]").val());

                        if (id !== "#select_divisiTujuan") {
                            $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                            $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                        }
                    });

                    // Clear all input text fields
                    inputTextIds.forEach((id) => {
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
                url: "/PermohonanKonversiBarcodePotong/getDataType",
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
                "Terjadi kesalahan saat load table tujuan konversi, hubungi EDP!"
            );
        }
    });

    $(document).on("click", ".btn-acc", function (e) {
        e.preventDefault();
        let idkonversi = $(this).data("id");
        $.ajax({
            type: "POST",
            url: "/PermohonanKonversiBarcodePotong",
            data: {
                _token: csrfToken,
                idkonversi: idkonversi,
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
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: response.success,
                        showConfirmButton: false,
                    });
                    getDataPermohonan();
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalACC").data("id", rowID);
        document.getElementById("detailKonversiModalLabel").innerHTML =
            "Detail Permohonan Konversi " + rowID;
        $.ajax({
            url: "/PermohonanKonversiBarcodePotong/getDetailKonversi",
            type: "GET",
            data: {
                idKonversi: rowID,
            },
            success: function (response) {
                // Assuming your server returns an array of objects for the table data

                if (response && Array.isArray(response)) {
                    // Filter data for Asal Konversi Potong JBB
                    var asalData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Asal Konversi Potongan JBB"
                        );
                    });

                    // Filter data for Tujuan Konversi Potong JBB
                    var tujuanData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Tujuan Konversi Potongan JBB"
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
                    url: "/PermohonanKonversiBarcodePotong/BatalACCDataKonversi",
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

    //#region Lain-lain
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
    //#endregion
});
