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
    let pemakaian_primerTujuan = document.getElementById("pemakaian_primerTujuan"); // prettier-ignore
    let pemakaian_sekunderTujuan = document.getElementById("pemakaian_sekunderTujuan"); // prettier-ignore
    let pemakaian_tritierTujuan = document.getElementById("pemakaian_tritierTujuan"); // prettier-ignore
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

    //#region Function

    function handleTableKeydownInSwal1(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        if (!table) return; // Ensure table is initialized

        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (rowCount === 0) return; // No rows to navigate

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = 0;
            } else {
                currentIndex = (currentIndex + 1) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex = (currentIndex - 1 + rowCount) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table.page("next").draw("page");
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table.page("previous").draw("page");
            }
        }
    }

    function showSelectionModal(
        entityName,
        tableId,
        ajaxUrl,
        ajaxData = {},
        onConfirmCallback
    ) {
        return new Promise((resolve, reject) => {
            // Return a new promise
            try {
                Swal.fire({
                    title: `Pilih ${entityName}`,
                    html: `<table id="${tableId}" class="display" style="width:100%; white-space: nowrap;">
                            <thead>
                                <tr>
                                    <th>ID ${entityName}</th>
                                    <th>Nama ${entityName}</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                    showCancelButton: true,
                    confirmButtonText: "Pilih",
                    cancelButtonText: "Tutup",
                    returnFocus: false,
                    customClass: {
                        popup: "swal-wide", // Apply the custom width class
                    },
                    preConfirm: () => {
                        const table = $(`#${tableId}`).DataTable();
                        const selectedData = table.row(".selected").data();
                        if (!selectedData) {
                            Swal.showValidationMessage("Please select a row");
                            return false;
                        }
                        return selectedData;
                    },
                    didOpen: () => {
                        const table = $(`#${tableId}`).DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: ajaxUrl,
                                data: ajaxData,
                                dataType: "json",
                                type: "GET",
                                error: function (xhr, error, thrown) {
                                    console.error(
                                        "Error fetching data: ",
                                        thrown
                                    );
                                },
                            },
                            columns: [
                                { data: `Id${entityName}` },
                                { data: `Nama${entityName}` },
                            ],
                        });

                        $(`#${tableId} tbody`).on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        // Reset currentIndex when modal opens
                        currentIndex = null;
                        Swal.getPopup().addEventListener(
                            "keydown",
                            function (e) {
                                console.log(tableId, e);
                                handleTableKeydownInSwal1(e, tableId);
                            }
                        );

                        // Set initial focus on table or first focusable element
                        $(`#${tableId}`).focus();
                    },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            onConfirmCallback(result.value);
                            resolve(); // Resolve the promise after modal is confirmed
                        } else if (
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            resolve(); // Also resolve the promise if the user cancels
                        }
                    })
                    .catch((error) => {
                        console.error("An error occurred:", error);
                        reject(error); // Reject the promise in case of an error
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                reject(error); // Reject the promise if there's an error
            }
        });
    }
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
        id_typeTujuan.readOnly = true;
        nama_typeTujuan.readOnly = true;
        id_divisiTujuan.readOnly = true;
        nama_divisiTujuan.readOnly = true;
        id_objekTujuan.readOnly = true;
        nama_objekTujuan.readOnly = true;
        id_kelompokUtamaTujuan.readOnly = true;
        nama_kelompokUtamaTujuan.readOnly = true;
        id_kelompokTujuan.readOnly = true;
        nama_kelompokTujuan.readOnly = true;
        id_subKelompokTujuan.readOnly = true;
        nama_subKelompokTujuan.readOnly = true;
        PIB_tujuan.readOnly = true;
        button_updateTujuanKonversi.disabled = true;
        button_hapusTujuanKonversi.disabled = true;
        button_modalProses.disabled = true;

        // $("#tambahTujuanModal").on(
        //     "keydown",
        //     "input, button, select, textarea",
        //     function (event) {
        //         if (event.key === "Enter" || event.keyCode === 13) {
        //             const idsToValidate = [
        //                 "pemakaian_primerTujuan",
        //                 "pemakaian_sekunderTujuan",
        //                 "pemakaian_tritierTujuan",
        //             ];

        //             // Check if the current element's ID is one of the IDs that require setting the value to 0
        //             if (idsToValidate.includes(this.id)) {
        //                 $(this).val(0); // Set the value to 0
        //             }

        //             // Validate non-empty value only if not one of the specific IDs
        //             if (
        //                 !idsToValidate.includes(this.id) &&
        //                 $(this).is("input, select, textarea") &&
        //                 $(this).val().trim() === ""
        //             ) {
        //                 $(this).addClass("input-error"); // Optional: add a class to indicate an error
        //                 this.setCustomValidity("Kolom tidak boleh kosong!"); // Set custom validity message
        //                 this.reportValidity(); // Display the validity message
        //                 return; // Stop here if the current input is empty
        //             } else {
        //                 $(this).removeClass("input-error"); // Remove error class if not empty
        //                 this.setCustomValidity(""); // Clear any existing validity message
        //             }

        //             // Find the current element index among all focusable elements
        //             var focusable = $("#tambahTujuanModal").find(
        //                 "input:visible:enabled:not([readonly]), button:visible:enabled, select:visible:enabled:not([readonly]), textarea:visible:enabled:not([readonly])"
        //             );
        //             var currentIndex = focusable.index(this);

        //             // Focus on the next focusable element if it exists
        //             if (
        //                 currentIndex > -1 &&
        //                 currentIndex + 1 < focusable.length
        //             ) {
        //                 focusable.eq(currentIndex + 1).focus();
        //             }
        //         }
        //     }
        // );

        select_divisiTujuan.addEventListener("change", function (e) {
            // when change show validity telling the use to press 'ENTER' just like on program EDP feature hak akses
        });

        select_divisiTujuan.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
            }
        });

        select_kelompokTujuan.addEventListener("change", function (e) {
            // when change show validity telling the use to press 'ENTER' just like on program EDP feature hak akses
        });

        select_kelompokTujuan.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
            }
        });

        select_kelompokUtamaTujuan.addEventListener("change", function (e) {
            // when change show validity telling the use to press 'ENTER' just like on program EDP feature hak akses
        });

        select_kelompokUtamaTujuan.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
            }
        });

        select_objekTujuan.addEventListener("change", function (e) {
            // when change show validity telling the use to press 'ENTER' just like on program EDP feature hak akses
        });

        select_objekTujuan.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
            }
        });

        select_subKelompokTujuan.addEventListener("change", function (e) {
            // when change show validity telling the use to press 'ENTER' just like on program EDP feature hak akses
        });

        select_subKelompokTujuan.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
            }
        });

        button_tambahTujuanKonversi.addEventListener("click", function (e) {
            e.preventDefault();

            // Id type Asal dan Tujuan tidak boleh sama
            if (id_typeAsal.value == id_typeTujuan.value) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Id Type Asal dan Tujuan tidak boleh sama!",
                });
            }

            // Array to store the input values
            let inputData = [];

            // Boolean flag to check if all inputs are filled
            let allInputsFilled = true;

            // Iterate over inputIds to get values
            inputIds.forEach(function (id) {
                const value = document.getElementById(id).value.trim();

                // Check if the input is empty
                if (value === "") {
                    allInputsFilled = false;
                }

                // Push the value to inputData array
                inputData.push(value);
            });

            // Append an empty value to the end of the inputData array
            inputData.push("");

            // Check if all inputs are filled
            if (allInputsFilled) {
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
                    // Clear the input fields after adding data
                    clearAll("div_tujuanKonversi");
                    activateAll();
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
                        Swal.fire(
                            "Berhasil!",
                            "Baris sudah dihapus.",
                            "success"
                        );
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
                pemakaian_primerTujuan.value = data[2];
                pemakaian_sekunderTujuan.value = data[3];
                pemakaian_tritierTujuan.value = data[4];
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
            pemakaian_primerTujuan.readOnly = false;
            pemakaian_sekunderTujuan.readOnly = false;
            pemakaian_tritierTujuan.readOnly = false;
            pemakaian_primerTujuan.focus();
            pemakaian_primerTujuan.select();

            const buttonTypeTujuanInputIds = [
                "pemakaian_primerTujuan",
                "pemakaian_sekunderTujuan",
                "pemakaian_tritierTujuan",
            ];

            // Function to get corresponding saldo_terakhir values
            function getSaldoTerakhirValue(id) {
                switch (id) {
                    case "pemakaian_primerTujuan":
                        return (
                            parseFloat(
                                document.getElementById(
                                    "saldo_terakhirTujuanPrimer"
                                ).value
                            ) || 0
                        );
                    case "pemakaian_sekunderTujuan":
                        return (
                            parseFloat(
                                document.getElementById(
                                    "saldo_terakhirTujuanSekunder"
                                ).value
                            ) || 0
                        );
                    case "pemakaian_tritierTujuan":
                        return (
                            parseFloat(
                                document.getElementById(
                                    "saldo_terakhirTujuanTritier"
                                ).value
                            ) || 0
                        );
                    default:
                        return 0;
                }
            }

            // Loop through each input ID and apply the filter
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
                        "Tidak boleh karakter atau koma, harus angka dengan titik desimal dan tidak boleh lebih besar dari saldo terakhir"
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

            function getNextFocusableElement(currentElement) {
                // Find the next focusable element in the form
                if (currentElement.id === "pemakaian_tritierTujuan") {
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
