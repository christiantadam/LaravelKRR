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
    }); // prettier-ignore
    let table_daftarKonversi = $("#table_daftarKonversi").DataTable(); // prettier-ignore
    let table_daftarTujuanKonversi = $("#table_daftarTujuanKonversi").DataTable(
        { paging: false, searching: false, info: false }
    ); // prettier-ignore
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore
    let kodeBarangAsal;
    let nomorIndeksBarangAsal;
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
                // console.log("Submitted value:", result.value.split("-"));
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
                        console.log(data);
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: data.error,
                                showConfirmButton: false,
                            });
                        } else {
                            var dataAsalKonversi = data.success;
                            var dataAsalKonversiInput = [];
                            dataAsalKonversi.forEach((element) => {
                                dataAsalKonversiInput = [
                                    element.IdType,
                                    element.NamaType,
                                    element.Qty_Primer,
                                    element.Qty_sekunder,
                                    element.Qty,
                                ];
                            });
                            table_daftarAsalKonversi.row
                                .add(dataAsalKonversiInput)
                                .draw();
                            // Show Bootstrap modal after confirming SweetAlert2
                            var myModal = new bootstrap.Modal(
                                tambahTujuanModal
                            );
                            myModal.show();
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
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getKelompokUtama",
                data: {
                    _token: csrfToken,
                    idObjek: select_objekTujuan.value,
                },
                success: function (response) {
                    select_kelompokUtamaTujuan.disabled = false;
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
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getKelompok",
                data: {
                    _token: csrfToken,
                    idKelompokUtama: select_kelompokUtamaTujuan.value,
                },
                success: function (response) {
                    select_kelompokTujuan.disabled = false;
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
            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getSubKelompok",
                data: {
                    _token: csrfToken,
                    idKelompok: select_kelompokTujuan.value,
                },
                success: function (response) {
                    select_subKelompokTujuan.disabled = false;
                    console.log(response);

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
            console.log(select_subKelompokTujuan.value);

            $.ajax({
                type: "GET",
                url: "/PermohonanKonversiBarcodePotong/getType",
                data: {
                    _token: csrfToken,
                    idSubKelompok: select_subKelompokTujuan.value,
                },
                success: function (response) {
                    console.log(response);
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
                    console.log(data);
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
                hasil_konversiPrimerTujuan.focus();
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
            ];
            // Check for duplicate entry in the first and second columns
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
                        isDuplicate = true;
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

                // Remove the 'selected' class from any previously selected row
                $("#table_daftarTujuanKonversi tbody tr").removeClass(
                    "selected"
                );
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

                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);

                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());

                    // Remove all options except the disabled one
                    $select.find("option:not(:disabled)").remove();

                    // Disable all selects except '#select_divisiTujuan'
                    if (id !== "#select_divisiTujuan") {
                        $select.prop("disabled", true);
                    }
                });

                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                button_divisiTujuan.focus();
            }
        } else {
            Swal.fire("Pemberitahuan", "Harap isi semua kolom", "info");
        }
    });

    button_updateTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();

        // Array to store the updated input values
        let updatedData = [];

        // Boolean flag to check if all inputs are filled
        let allInputsFilled = true;

        // Iterate over inputIds to get the updated values
        inputIds.forEach(function (id) {
            const value = document.getElementById(id).value.trim();

            // Check if the input is empty
            if (value === "") {
                allInputsFilled = false;
            }

            // Push the value to updatedData array
            updatedData.push(value);
        });

        // Append an empty value to the end of the updatedData array
        updatedData.push("");

        // Check if all inputs are filled
        if (allInputsFilled) {
            // Get the selected row index
            const selectedRow = table_daftarTujuanKonversi.row(".selected");

            if (selectedRow.any()) {
                // Update the selected row with the new data
                selectedRow.data(updatedData).draw();

                // Remove the 'selected' class from any previously selected row
                $("#table_daftarTujuanKonversi tbody tr").removeClass(
                    "selected"
                );

                // Clear the input fields after updating data
                clearAll("div_tujuanKonversi");
                activateAll();
                button_divisiTujuan.focus();
            } else {
                Swal.fire(
                    "Pemberitahuan",
                    "Pilih baris yang ingin diubah",
                    "info"
                );
            }
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
                    selectedRow.remove().draw();

                    // Clear the input fields after deleting data
                    clearAll("div_tujuanKonversi");
                    activateAll();

                    button_divisiTujuan.focus();

                    // Remove the 'selected' class from any previously selected row
                    $("#table_daftarTujuanKonversi tbody tr").removeClass(
                        "selected"
                    );

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
            id_typeTujuan.value = data[0];
            nama_typeTujuan.value = data[1];
            hasil_konversiPrimerTujuan.value = data[2];
            hasil_konversiSekunderTujuan.value = data[3];
            hasil_konversiTritierTujuan.value = data[4];
            id_divisiTujuan.value = data[5];
            id_objekTujuan.value = data[6];
            id_kelompokUtamaTujuan.value = data[7];
            id_kelompokTujuan.value = data[8];
            id_subKelompokTujuan.value = data[9];
            nama_divisiTujuan.value = data[10];
            nama_objekTujuan.value = data[11];
            nama_kelompokUtamaTujuan.value = data[12];
            nama_kelompokTujuan.value = data[13];
            nama_subKelompokTujuan.value = data[14];
            saldo_terakhirTujuanPrimer.value = data[15];
            saldo_terakhirTujuanSekunder.value = data[16];
            saldo_terakhirTujuanTritier.value = data[17];
            satuan_primerTujuan.value = data[18];
            satuan_sekunderTujuan.value = data[19];
            satuan_tritierTujuan.value = data[20];
            satuan_saldoTerakhirTujuanPrimer.value = data[21];
            satuan_saldoTerakhirTujuanSekunder.value = data[22];
            satuan_saldoTerakhirTujuanTritier.value = data[23];
            id_tmpTransaksi.value = data[24];
        } else {
            Swal.fire(
                "Pemberitahuan",
                "Terjadi Kesalahan.",
                "Terjadi kesalahan saat load table tujuan konversi, hubungi EDP!"
            );
        }

        button_tambahTujuanKonversi.disabled = true;
        button_hapusTujuanKonversi.disabled = false;
        button_updateTujuanKonversi.disabled = false;
        hasil_konversiPrimerTujuan.readOnly = false;
        hasil_konversiSekunderTujuan.readOnly = false;
        hasil_konversiTritierTujuan.readOnly = false;
        hasil_konversiPrimerTujuan.focus();
        hasil_konversiPrimerTujuan.select();
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
