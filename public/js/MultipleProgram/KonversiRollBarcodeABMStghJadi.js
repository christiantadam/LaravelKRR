$(document).ready(function () {
    //#region Get element by ID
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore

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
    //#endregion

    //#region Load Form

    getDataPermohonan();

    //#endregion

    //#region Event listener

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
                // Custom validation or handling logic
                if (inputValue.length !== 19) {
                    Swal.showValidationMessage("Barcode Tidak Valid!");
                }
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
                        idDivisi: "ABM",
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
                            input_warnaDominanAsal.value = dataAsalKonversi[0].warnaDominan // prettier-ignore
                            d_tek1PanjangRoll = dataAsalKonversi[0].panjangRoll // prettier-ignore
                            if (dataAsalKonversi[0].warnaDominan) {
                                // Diambil dari d_tek5 database purchase
                                switch (
                                    dataAsalKonversi[0].warnaDominan
                                        .trim()
                                        .charAt(0)
                                ) {
                                    case "G":
                                        input_warnaDominanAsal.value = "Gading";
                                        break;
                                    case "H":
                                        input_warnaDominanAsal.value = "Hitam";
                                        break;
                                    case "P":
                                        input_warnaDominanAsal.value = "Putih";
                                        break;
                                    default:
                                        input_warnaDominanAsal.value = "";
                                }
                            } else {
                                input_warnaDominanAsal.value = "";
                            }
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
            nomorUser !== "4384" &&
            nomorUser !== "4199" &&
            nomorUser !== "1516"
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
            url: "/KonversiRollBarcode/create",
            type: "GET",
            success: function (response) {
                console.log(response.data);

                // Assuming your server returns an array of objects for the table data
                table_daftarKonversi.clear().rows.add(response.data).draw();
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }
    //#endregion
});
