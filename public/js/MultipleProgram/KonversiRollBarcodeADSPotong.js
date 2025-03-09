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
    let select_divisiAsal = document.getElementById("select_divisiAsal"); // prettier-ignore
    let select_objekAsal = document.getElementById("select_objekAsal"); // prettier-ignore
    let select_kelompokUtamaAsal = document.getElementById("select_kelompokUtamaAsal"); // prettier-ignore
    let select_kelompokAsal = document.getElementById("select_kelompokAsal"); // prettier-ignore
    let select_subKelompokAsal = document.getElementById("select_subKelompokAsal"); // prettier-ignore
    let div_PIBAsal = document.getElementById("div_PIBAsal"); // prettier-ignore
    let PIB_asal = document.getElementById("PIB_asal"); // prettier-ignore
    let select_typeAsal = document.getElementById("select_typeAsal"); // prettier-ignore
    let saldo_terakhirAsalPrimer = document.getElementById("saldo_terakhirAsalPrimer"); // prettier-ignore
    let satuan_saldoTerakhirAsalPrimer = document.getElementById("satuan_saldoTerakhirAsalPrimer"); // prettier-ignore
    let saldo_terakhirAsalSekunder = document.getElementById("saldo_terakhirAsalSekunder"); // prettier-ignore
    let satuan_saldoTerakhirAsalSekunder = document.getElementById("satuan_saldoTerakhirAsalSekunder"); // prettier-ignore
    let saldo_terakhirAsalTritier = document.getElementById("saldo_terakhirAsalTritier"); // prettier-ignore
    let satuan_saldoTerakhirAsalTritier = document.getElementById("satuan_saldoTerakhirAsalTritier"); // prettier-ignore
    let asal_konversiPrimer = document.getElementById("asal_konversiPrimer"); // prettier-ignore
    let satuan_primerAsal = document.getElementById("satuan_primerAsal"); // prettier-ignore
    let asal_konversiSekunder = document.getElementById("asal_konversiSekunder"); // prettier-ignore
    let satuan_sekunderAsal = document.getElementById("satuan_sekunderAsal"); // prettier-ignore
    let asal_konversiTritier = document.getElementById("asal_konversiTritier"); // prettier-ignore
    let satuan_tritierAsal = document.getElementById("satuan_tritierAsal"); // prettier-ignore
    let button_timbangAsalKonversi = document.getElementById("button_timbangAsalKonversi"); // prettier-ignore
    let button_tambahAsalKonversi = document.getElementById("button_tambahAsalKonversi"); // prettier-ignore
    let button_updateAsalKonversi = document.getElementById("button_updateAsalKonversi"); // prettier-ignore
    let button_hapusAsalKonversi = document.getElementById("button_hapusAsalKonversi"); // prettier-ignore
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

    const selectIdsAsal = [
        "#select_divisiAsal",
        "#select_objekAsal",
        "#select_kelompokUtamaAsal",
        "#select_kelompokAsal",
        "#select_subKelompokAsal",
        "#select_typeAsal",
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

    const inputTextIdsAsal = [
        "#saldo_terakhirAsalPrimer",
        "#satuan_saldoTerakhirAsalPrimer",
        "#saldo_terakhirAsalSekunder",
        "#satuan_saldoTerakhirAsalSekunder",
        "#saldo_terakhirAsalTritier",
        "#satuan_saldoTerakhirAsalTritier",
        "#asal_konversiPrimer",
        "#satuan_primerAsal",
        "#asal_konversiSekunder",
        "#satuan_sekunderAsal",
        "#hasil_konversiTritierAsal",
        "#asal_konversiTritier",
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
        } else if (type == "divisiAsal") {
            select_objekAsal.disabled = true;
            select_objekAsal.selectedIndex = 0;
            select_kelompokUtamaAsal.disabled = true;
            select_kelompokUtamaAsal.selectedIndex = 0;
            select_kelompokAsal.disabled = true;
            select_kelompokAsal.selectedIndex = 0;
            select_subKelompokAsal.disabled = true;
            select_subKelompokAsal.selectedIndex = 0;
            select_typeAsal.disabled = true;
            select_typeAsal.selectedIndex = 0;
            saldo_terakhirAsalPrimer.value = "";
            saldo_terakhirAsalSekunder.value = "";
            saldo_terakhirAsalTritier.value = "";
            satuan_saldoTerakhirAsalPrimer.value = "";
            satuan_saldoTerakhirAsalSekunder.value = "";
            satuan_saldoTerakhirAsalTritier.value = "";
        } else if (type == "objekAsal") {
            select_kelompokUtamaAsal.disabled = true;
            select_kelompokUtamaAsal.selectedIndex = 0;
            select_kelompokAsal.disabled = true;
            select_kelompokAsal.selectedIndex = 0;
            select_subKelompokAsal.disabled = true;
            select_subKelompokAsal.selectedIndex = 0;
            select_typeAsal.disabled = true;
            select_typeAsal.selectedIndex = 0;
            saldo_terakhirAsalPrimer.value = "";
            saldo_terakhirAsalSekunder.value = "";
            saldo_terakhirAsalTritier.value = "";
            satuan_saldoTerakhirAsalPrimer.value = "";
            satuan_saldoTerakhirAsalSekunder.value = "";
            satuan_saldoTerakhirAsalTritier.value = "";
        } else if (type == "kelompokutamaAsal") {
            select_kelompokAsal.disabled = true;
            select_kelompokAsal.selectedIndex = 0;
            select_subKelompokAsal.disabled = true;
            select_subKelompokAsal.selectedIndex = 0;
            select_typeAsal.disabled = true;
            select_typeAsal.selectedIndex = 0;
            saldo_terakhirAsalPrimer.value = "";
            saldo_terakhirAsalSekunder.value = "";
            saldo_terakhirAsalTritier.value = "";
            satuan_saldoTerakhirAsalPrimer.value = "";
            satuan_saldoTerakhirAsalSekunder.value = "";
            satuan_saldoTerakhirAsalTritier.value = "";
        } else if (type == "kelompokAsal") {
            select_subKelompokAsal.disabled = true;
            select_subKelompokAsal.selectedIndex = 0;
            select_typeAsal.disabled = true;
            select_typeAsal.selectedIndex = 0;
            saldo_terakhirAsalPrimer.value = "";
            saldo_terakhirAsalSekunder.value = "";
            saldo_terakhirAsalTritier.value = "";
            satuan_saldoTerakhirAsalPrimer.value = "";
            satuan_saldoTerakhirAsalSekunder.value = "";
            satuan_saldoTerakhirAsalTritier.value = "";
        } else if (type == "subkelompokAsal") {
            select_typeAsal.disabled = true;
            select_typeAsal.selectedIndex = 0;
            saldo_terakhirAsalPrimer.value = "";
            saldo_terakhirAsalSekunder.value = "";
            saldo_terakhirAsalTritier.value = "";
            satuan_saldoTerakhirAsalPrimer.value = "";
            satuan_saldoTerakhirAsalSekunder.value = "";
            satuan_saldoTerakhirAsalTritier.value = "";
        } else if (type == "typeAsal") {
            saldo_terakhirAsalPrimer.value = "";
            saldo_terakhirAsalSekunder.value = "";
            saldo_terakhirAsalTritier.value = "";
            satuan_saldoTerakhirAsalPrimer.value = "";
            satuan_saldoTerakhirAsalSekunder.value = "";
            satuan_saldoTerakhirAsalTritier.value = "";
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
        input_barcodeAsal.readOnly = true;
        saldo_terakhirPrimerBarcodeAsal.readOnly = true;
        satuan_saldoTerakhirPrimerBarcodeAsal.readOnly = true;
        saldo_terakhirSekunderBarcodeAsal.readOnly = true;
        satuan_saldoTerakhirSekunderBarcodeAsal.readOnly = true;
        saldo_terakhirTritierBarcodeAsal.readOnly = true;
        satuan_saldoTerakhirTritierBarcodeAsal.readOnly = true;
        input_tanggalKonversi.valueAsDate = new Date();
        input_tanggalKonversi.focus();
        // set up kolom tujuan konversi
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
        // set up kolom asal konversi
        satuan_primerAsal.readOnly = true;
        satuan_sekunderAsal.readOnly = true;
        satuan_tritierAsal.readOnly = true;
        satuan_saldoTerakhirAsalPrimer.readOnly = true;
        satuan_saldoTerakhirAsalSekunder.readOnly = true;
        satuan_saldoTerakhirAsalTritier.readOnly = true;
        saldo_terakhirAsalPrimer.readOnly = true;
        saldo_terakhirAsalSekunder.readOnly = true;
        saldo_terakhirAsalTritier.readOnly = true;
        select_objekAsal.disabled = true;
        select_kelompokUtamaAsal.disabled = true;
        select_kelompokAsal.disabled = true;
        select_subKelompokAsal.disabled = true;
        select_typeAsal.disabled = true;
        PIB_asal.readOnly = true;
        button_updateAsalKonversi.disabled = true;
        button_hapusAsalKonversi.disabled = true;
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
            "asal_konversiPrimer",
            "asal_konversiSekunder",
            "asal_konversiTritier",
        ];

        function getNextFocusableElement(currentElement) {
            // Find the next focusable element in the form


            if (currentElement.id == "hasil_konversiTritierTujuan") {
                return button_tambahTujuanKonversi.disabled
                    ? document.getElementById("button_updateTujuanKonversi")
                    : document.getElementById("button_tambahTujuanKonversi");
            }
            if (currentElement.id == "asal_konversiTritier") {
                return button_tambahAsalKonversi.disabled
                    ? document.getElementById("button_updateAsalKonversi")
                    : document.getElementById("button_tambahAsalKonversi");
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
                select_divisiAsal.focus();
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

        // Check if any row in table_daftarTujuanKonversi has the same IdType as select_typeAsal
        table_daftarAsalKonversi
            .rows()
            .every(function (rowIdx, tableLoop, rowLoop) {
                let rowData = this.data();
                if (rowData[0] == select_typeTujuan.value) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text: "Id Type Asal dan Tujuan tidak boleh sama!",
                    });
                    checkIdType = false;
                    return false; // Stop iteration if a match is found
                }
            });

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

        // Check if any row in table_daftarTujuanKonversi has the same IdType as select_typeAsal
        table_daftarAsalKonversi
            .rows()
            .every(function (rowIdx, tableLoop, rowLoop) {
                let rowData = this.data();
                if (rowData[0] == select_typeTujuan.value) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text: "Id Type Asal dan Tujuan tidak boleh sama!",
                    });
                    checkIdType = false;
                    return false; // Stop iteration if a match is found
                }
            });

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

    $("#table_daftarTujuanKonversi tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_daftarTujuanKonversi tbody tr").removeClass("selected");

        if (table_daftarTujuanKonversi.data().length > 0) {
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
        }
    });

    select_divisiAsal.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("divisiAsal");
    });

    select_divisiAsal.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_divisiAsal.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getObjek",
                data: {
                    _token: csrfToken,
                    idDivisi: select_divisiAsal.value,
                },
                success: function (response) {
                    select_objekAsal.disabled = false;
                    response.forEach((item) => {
                        // Create a new option element
                        const option = document.createElement("option");
                        // Set the value and text of the option
                        option.value = item.IdObjek;
                        option.textContent = item.NamaObjek;
                        // Append the option to the select element
                        select_objekAsal.appendChild(option);
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_objekAsal.focus();
            });
        }
    });

    select_objekAsal.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("objekAsal");
    });

    select_objekAsal.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_objekAsal.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getKelompokUtama",
                data: {
                    _token: csrfToken,
                    idObjek: select_objekAsal.value,
                },
                success: function (response) {
                    select_kelompokUtamaAsal.disabled = false;
                    // Clear only non-disabled options
                    Array.from(select_kelompokUtamaAsal.options).forEach(
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
                        select_kelompokUtamaAsal.appendChild(option);
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_kelompokUtamaAsal.focus();
            });
        }
    });

    select_kelompokUtamaAsal.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("kelompokutamaAsal");
    });

    select_kelompokUtamaAsal.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_kelompokUtamaAsal.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getKelompok",
                data: {
                    _token: csrfToken,
                    idKelompokUtama: select_kelompokUtamaAsal.value,
                },
                success: function (response) {
                    select_kelompokAsal.disabled = false;
                    // Clear only non-disabled options
                    Array.from(select_kelompokAsal.options).forEach(
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
                        select_kelompokAsal.appendChild(option);
                        select_kelompokAsal.focus();
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        }
    });

    select_kelompokAsal.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("kelompokAsal");
    });

    select_kelompokAsal.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_kelompokAsal.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getSubKelompok",
                data: {
                    _token: csrfToken,
                    idKelompok: select_kelompokAsal.value,
                },
                success: function (response) {
                    select_subKelompokAsal.disabled = false;
                    // Clear only non-disabled options
                    Array.from(select_subKelompokAsal.options).forEach(
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
                        select_subKelompokAsal.appendChild(option);
                    });
                    select_subKelompokAsal.focus();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        }
    });

    select_subKelompokAsal.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("subkelompokAsal");
    });

    select_subKelompokAsal.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_subKelompokAsal.selectedIndex !== 0) {
            e.preventDefault();
            this.blur();
            // Clear only non-disabled options
            Array.from(select_typeAsal.options).forEach((option) => {
                if (!option.disabled) {
                    option.remove();
                }
            });

            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getType",
                data: {
                    _token: csrfToken,
                    idSubKelompok: select_subKelompokAsal.value,
                },
                success: function (response) {
                    select_typeAsal.disabled = false;
                    if (select_kelompokUtamaAsal.value == 1029) {
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
                                select_typeAsal.appendChild(matchedOption);
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
                                    select_subKelompokAsal.options[
                                        select_subKelompokAsal.selectedIndex
                                    ].text,
                            }).then(() => {
                                select_subKelompokAsal.focus();
                                select_typeAsal.disabled = true;
                            });
                        } else {
                            select_subKelompokAsal.focus();
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
                            select_typeAsal.appendChild(option);
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                select_typeAsal.focus();
            });
        }
    });

    select_typeAsal.addEventListener("change", function (e) {
        this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
        this.reportValidity(); // Display the validity message
        clearTujuan("typeAsal");
    });

    select_typeAsal.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && select_typeAsal.selectedIndex !== 0) {
            e.preventDefault();
            asal_konversiPrimer.focus();
            $.ajax({
                type: "GET",
                url: "/KonversiRollBarcode/getDataType",
                data: {
                    _token: csrfToken,
                    IdType: select_typeAsal.value,
                },
                success: function (data) {
                    console.log(data);

                    if (parseFloat(data[0].SaldoTritier) == 0) {
                        Swal.fire({
                            icon: "info",
                            title: "Pemberitahuan",
                            text: "Type barang tidak memiliki saldo!",
                        });
                        return; // Exit the function if SaldoTritier is 0
                    }
                    satuan_saldoTerakhirAsalPrimer.value = data[0].satPrimer.trim(); // prettier-ignore
                    satuan_saldoTerakhirAsalSekunder.value = data[0].satSekunder.trim(); // prettier-ignore
                    satuan_saldoTerakhirAsalTritier.value = data[0].satTritier.trim(); // prettier-ignore
                    saldo_terakhirAsalPrimer.value = parseFloat(data[0].SaldoPrimer); // prettier-ignore
                    saldo_terakhirAsalSekunder.value = parseFloat(data[0].SaldoSekunder); // prettier-ignore
                    saldo_terakhirAsalTritier.value = parseFloat(data[0].SaldoTritier); // prettier-ignore
                    satuan_primerAsal.value = data[0].satPrimer.trim();
                    satuan_sekunderAsal.value = data[0].satSekunder.trim();
                    satuan_tritierAsal.value = data[0].satTritier.trim();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            }).then(() => {
                // check satuan_sekunderAsal if null then hasil = 0
                if (satuan_sekunderAsal.value !== "NULL") {
                    asal_konversiSekunder.readOnly = false;
                    asal_konversiSekunder.focus();
                } else {
                    asal_konversiSekunder.value = numeral(0).format("0.00"); // prettier-ignore
                    asal_konversiSekunder.readOnly = true;
                    asal_konversiTritier.focus();
                }

                // check satuan_primerAsal if null then hasil = 0
                if (satuan_primerAsal.value !== "NULL") {
                    asal_konversiPrimer.readOnly = false;
                    asal_konversiPrimer.focus();
                } else {
                    asal_konversiPrimer.value = numeral(0).format("0.00"); // prettier-ignore
                    asal_konversiPrimer.readOnly = true;
                }
            });
        }
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

    button_tambahAsalKonversi.addEventListener("click", function (e) {
        e.preventDefault();
        // Id type Asal dan Tujuan tidak boleh sama
        let checkIdType = true;
        let checkHasilKonversi = true;
        let checkSelectInput = true;

        // Check if any row in table_daftarTujuanKonversi has the same IdType as select_typeAsal
        table_daftarTujuanKonversi
            .rows()
            .every(function (rowIdx, tableLoop, rowLoop) {
                let rowData = this.data();
                if (rowData[0] == select_typeAsal.value) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text: "Id Type Asal dan Tujuan tidak boleh sama!",
                    });
                    checkIdType = false;
                    return false; // Stop iteration if a match is found
                }
            });

        // check quantity hasil konversi, apakah sesuai ketentuan
        if (
            (asal_konversiPrimer.value == 0 &&
                asal_konversiSekunder.value == 0 &&
                asal_konversiTritier.value == 0) ||
            (asal_konversiTritier.value == 0 &&
                satuan_tritierAsal.value.trim() ==
                    satuan_saldoTerakhirTritierBarcodeAsal.value.trim())
        ) {
            asal_konversiTritier.focus();
            asal_konversiTritier.select();
            checkHasilKonversi = false;
        }

        if (select_typeAsal.selectedIndex == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Asal Konversi tidak boleh kosong!",
            }).then(() => {
                select_divisiAsal.focus();
            });
            checkSelectInput = false;
        }

        // Check if all inputs are filled
        if (checkIdType && checkHasilKonversi && checkSelectInput) {
            // Array to store the input values
            let inputData = [
                select_typeAsal.value,
                select_typeAsal.options[select_typeAsal.selectedIndex].textContent.split(" | ")[0].trim(),
                asal_konversiPrimer.value,
                asal_konversiSekunder.value,
                asal_konversiTritier.value,
                '',
                select_subKelompokAsal.value,
            ]; // prettier-ignore
            let isDuplicate = false;

            table_daftarAsalKonversi
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
                table_daftarAsalKonversi.row.add(inputData).draw();
                // Loop through each select element
                selectIdsAsal.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());
                    if (id !== "#select_divisiAsal") {
                        $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                        $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                    }
                });

                // Clear all input text fields
                inputTextIdsAsal.forEach((id) => {
                    $(id).val("");
                });
                select_divisiAsal.focus();
            }
        } else {
            Swal.fire("Pemberitahuan", "Ada kolom yang belum terisi", "info");
        }
    });

    button_updateAsalKonversi.addEventListener("click", function (e) {
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
            asal_konversiPrimer.value == 0 &&
            asal_konversiSekunder.value == 0 &&
            asal_konversiTritier.value == 0
        ) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Asal Konversi tidak boleh kosong!",
            }).then(() => {
                asal_konversiTritier.focus();
                asal_konversiTritier.select();
            });
            checkHasilKonversi = false;
        }

        if (select_typeAsal.selectedIndex == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Asal Konversi tidak boleh kosong!",
            }).then(() => {
                select_divisiAsal.focus();
            });
            checkSelectInput = false;
        }

        // Check if all inputs are filled
        if (checkIdType && checkHasilKonversi && checkSelectInput) {
            // Array to store the input values
            let inputData = [
                select_typeAsal.value,
                select_typeAsal.options[select_typeAsal.selectedIndex].textContent.split(" | ")[0].trim(),
                asal_konversiPrimer.value,
                asal_konversiSekunder.value,
                asal_konversiTritier.value,
                '',
                select_subKelompokAsal.value,
            ]; // prettier-ignore

            const selectedRow = table_daftarAsalKonversi.row(".selected");

            if (selectedRow.any()) {
                // Update the selected row with the new data
                selectedRow.data(inputData).draw();

                // Remove the 'selected' class from any previously selected row
                $("#table_daftarAsalKonversi tbody tr").removeClass("selected"); // prettier-ignore
                select_divisiAsal.focus();
            } else {
                Swal.fire(
                    "Pemberitahuan",
                    "Pilih baris yang ingin diubah",
                    "info"
                );
            }

            // Remove the 'selected' class from any previously selected row
            $("#table_daftarAsalKonversi tbody tr").removeClass("selected");

            // Loop through each select element
            selectIdsAsal.forEach((id) => {
                const $select = $(id);
                // Select the disabled option
                $select.val($select.find("option[disabled]").val());

                if (id !== "#select_divisiAsal") {
                    $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                }
            });

            // Clear all input text fields
            inputTextIdsAsal.forEach((id) => {
                $(id).val("");
            });
            select_divisiAsal.focus();
            button_tambahAsalKonversi.disabled = false;
            button_hapusAsalKonversi.disabled = true;
            button_updateAsalKonversi.disabled = true;
            button_modalProses.disabled = false;
        } else {
            Swal.fire("Pemberitahuan", "Harap isi semua kolom", "info");
        }
    });

    button_hapusAsalKonversi.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the selected row index
        const selectedRow = table_daftarAsalKonversi.row(".selected");

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

                    selectIdsAsal.forEach((id) => {
                        const $select = $(id);
                        // Select the disabled option
                        $select.val($select.find("option[disabled]").val());

                        if (id !== "#select_divisiTujuan") {
                            $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
                            $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                        }
                    });

                    // Clear all input text fields
                    inputTextIdsAsal.forEach((id) => {
                        $(id).val("");
                    });
                    select_divisiAsal.focus();

                    // Remove the 'selected' class from any previously selected row
                    $("#table_daftarAsalKonversi tbody tr").removeClass(
                        "selected"
                    );

                    button_tambahAsalKonversi.disabled = false;
                    button_hapusAsalKonversi.disabled = true;
                    button_updateAsalKonversi.disabled = true;
                    if (table_daftarAsalKonversi.data().length < 1) {
                        button_modalProses.disabled = true;
                    }
                    // Force the table to refresh its internal data
                    table_daftarAsalKonversi.rows().invalidate().draw();

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

    $("#table_daftarAsalKonversi tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_daftarAsalKonversi tbody tr").removeClass("selected");
        console.log(table_daftarAsalKonversi.data());

        if (
            table_daftarAsalKonversi.data().length > 0 &&
            table_daftarAsalKonversi.row(this).data()[5] !=
                input_barcodeAsal.value
        ) {
            // Add the 'selected' class to the clicked row
            $(this).addClass("selected");

            // Get data from the clicked row
            var data = table_daftarAsalKonversi.row(this).data();
            console.log(data);

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

                            asal_konversiPrimer.value = data[2];
                            asal_konversiSekunder.value = data[3];
                            asal_konversiTritier.value = data[4];

                            button_tambahAsalKonversi.disabled = true;
                            button_hapusAsalKonversi.disabled = false;
                            button_updateAsalKonversi.disabled = false;
                            asal_konversiPrimer.readOnly = false;
                            asal_konversiSekunder.readOnly = false;
                            asal_konversiTritier.readOnly = false;
                            asal_konversiPrimer.select();
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
});
