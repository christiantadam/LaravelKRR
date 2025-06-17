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
    let group = document.getElementById("group"); // prettier-ignore
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
    // let select_divisiAsal = document.getElementById("select_divisiAsal"); // prettier-ignore
    // let select_objekAsal = document.getElementById("select_objekAsal"); // prettier-ignore
    // let select_kelompokUtamaAsal = document.getElementById("select_kelompokUtamaAsal"); // prettier-ignore
    // let select_kelompokAsal = document.getElementById("select_kelompokAsal"); // prettier-ignore
    // let select_subKelompokAsal = document.getElementById("select_subKelompokAsal"); // prettier-ignore
    // let div_PIBAsal = document.getElementById("div_PIBAsal"); // prettier-ignore
    // let PIB_asal = document.getElementById("PIB_asal"); // prettier-ignore
    // let select_typeAsal = document.getElementById("select_typeAsal"); // prettier-ignore
    // let saldo_terakhirAsalPrimer = document.getElementById("saldo_terakhirAsalPrimer"); // prettier-ignore
    // let satuan_saldoTerakhirAsalPrimer = document.getElementById("satuan_saldoTerakhirAsalPrimer"); // prettier-ignore
    // let saldo_terakhirAsalSekunder = document.getElementById("saldo_terakhirAsalSekunder"); // prettier-ignore
    // let satuan_saldoTerakhirAsalSekunder = document.getElementById("satuan_saldoTerakhirAsalSekunder"); // prettier-ignore
    // let saldo_terakhirAsalTritier = document.getElementById("saldo_terakhirAsalTritier"); // prettier-ignore
    // let satuan_saldoTerakhirAsalTritier = document.getElementById("satuan_saldoTerakhirAsalTritier"); // prettier-ignore
    // let asal_konversiPrimer = document.getElementById("asal_konversiPrimer"); // prettier-ignore
    // let satuan_primerAsal = document.getElementById("satuan_primerAsal"); // prettier-ignore
    // let asal_konversiSekunder = document.getElementById("asal_konversiSekunder"); // prettier-ignore
    // let satuan_sekunderAsal = document.getElementById("satuan_sekunderAsal"); // prettier-ignore
    // let asal_konversiTritier = document.getElementById("asal_konversiTritier"); // prettier-ignore
    // let satuan_tritierAsal = document.getElementById("satuan_tritierAsal"); // prettier-ignore
    // let button_timbangAsalKonversi = document.getElementById("button_timbangAsalKonversi"); // prettier-ignore
    // let button_tambahAsalKonversi = document.getElementById("button_tambahAsalKonversi"); // prettier-ignore
    // let button_updateAsalKonversi = document.getElementById("button_updateAsalKonversi"); // prettier-ignore
    // let button_hapusAsalKonversi = document.getElementById("button_hapusAsalKonversi"); // prettier-ignore
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore
    let maxHasilKonversiTritier = 0;
    let sumHasilKonversiTritier = 0;

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

    // const selectIdsAsal = [
    //     "#select_divisiAsal",
    //     "#select_objekAsal",
    //     "#select_kelompokUtamaAsal",
    //     "#select_kelompokAsal",
    //     "#select_subKelompokAsal",
    //     "#select_typeAsal",
    // ];

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

    // const inputTextIdsAsal = [
    //     "#saldo_terakhirAsalPrimer",
    //     "#satuan_saldoTerakhirAsalPrimer",
    //     "#saldo_terakhirAsalSekunder",
    //     "#satuan_saldoTerakhirAsalSekunder",
    //     "#saldo_terakhirAsalTritier",
    //     "#satuan_saldoTerakhirAsalTritier",
    //     "#asal_konversiPrimer",
    //     "#satuan_primerAsal",
    //     "#asal_konversiSekunder",
    //     "#satuan_sekunderAsal",
    //     "#hasil_konversiTritierAsal",
    //     "#asal_konversiTritier",
    // ];

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
        // else if (type == "divisiAsal") {
        //     select_objekAsal.disabled = true;
        //     select_objekAsal.selectedIndex = 0;
        //     select_kelompokUtamaAsal.disabled = true;
        //     select_kelompokUtamaAsal.selectedIndex = 0;
        //     select_kelompokAsal.disabled = true;
        //     select_kelompokAsal.selectedIndex = 0;
        //     select_subKelompokAsal.disabled = true;
        //     select_subKelompokAsal.selectedIndex = 0;
        //     select_typeAsal.disabled = true;
        //     select_typeAsal.selectedIndex = 0;
        //     saldo_terakhirAsalPrimer.value = "";
        //     saldo_terakhirAsalSekunder.value = "";
        //     saldo_terakhirAsalTritier.value = "";
        //     satuan_saldoTerakhirAsalPrimer.value = "";
        //     satuan_saldoTerakhirAsalSekunder.value = "";
        //     satuan_saldoTerakhirAsalTritier.value = "";
        // } else if (type == "objekAsal") {
        //     select_kelompokUtamaAsal.disabled = true;
        //     select_kelompokUtamaAsal.selectedIndex = 0;
        //     select_kelompokAsal.disabled = true;
        //     select_kelompokAsal.selectedIndex = 0;
        //     select_subKelompokAsal.disabled = true;
        //     select_subKelompokAsal.selectedIndex = 0;
        //     select_typeAsal.disabled = true;
        //     select_typeAsal.selectedIndex = 0;
        //     saldo_terakhirAsalPrimer.value = "";
        //     saldo_terakhirAsalSekunder.value = "";
        //     saldo_terakhirAsalTritier.value = "";
        //     satuan_saldoTerakhirAsalPrimer.value = "";
        //     satuan_saldoTerakhirAsalSekunder.value = "";
        //     satuan_saldoTerakhirAsalTritier.value = "";
        // } else if (type == "kelompokutamaAsal") {
        //     select_kelompokAsal.disabled = true;
        //     select_kelompokAsal.selectedIndex = 0;
        //     select_subKelompokAsal.disabled = true;
        //     select_subKelompokAsal.selectedIndex = 0;
        //     select_typeAsal.disabled = true;
        //     select_typeAsal.selectedIndex = 0;
        //     saldo_terakhirAsalPrimer.value = "";
        //     saldo_terakhirAsalSekunder.value = "";
        //     saldo_terakhirAsalTritier.value = "";
        //     satuan_saldoTerakhirAsalPrimer.value = "";
        //     satuan_saldoTerakhirAsalSekunder.value = "";
        //     satuan_saldoTerakhirAsalTritier.value = "";
        // } else if (type == "kelompokAsal") {
        //     select_subKelompokAsal.disabled = true;
        //     select_subKelompokAsal.selectedIndex = 0;
        //     select_typeAsal.disabled = true;
        //     select_typeAsal.selectedIndex = 0;
        //     saldo_terakhirAsalPrimer.value = "";
        //     saldo_terakhirAsalSekunder.value = "";
        //     saldo_terakhirAsalTritier.value = "";
        //     satuan_saldoTerakhirAsalPrimer.value = "";
        //     satuan_saldoTerakhirAsalSekunder.value = "";
        //     satuan_saldoTerakhirAsalTritier.value = "";
        // } else if (type == "subkelompokAsal") {
        //     select_typeAsal.disabled = true;
        //     select_typeAsal.selectedIndex = 0;
        //     saldo_terakhirAsalPrimer.value = "";
        //     saldo_terakhirAsalSekunder.value = "";
        //     saldo_terakhirAsalTritier.value = "";
        //     satuan_saldoTerakhirAsalPrimer.value = "";
        //     satuan_saldoTerakhirAsalSekunder.value = "";
        //     satuan_saldoTerakhirAsalTritier.value = "";
        // } else if (type == "typeAsal") {
        //     saldo_terakhirAsalPrimer.value = "";
        //     saldo_terakhirAsalSekunder.value = "";
        //     saldo_terakhirAsalTritier.value = "";
        //     satuan_saldoTerakhirAsalPrimer.value = "";
        //     satuan_saldoTerakhirAsalSekunder.value = "";
        //     satuan_saldoTerakhirAsalTritier.value = "";
        // }
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
                grup: group.value,
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
        button_tambahTujuanKonversi.disabled = false;
        button_updateTujuanKonversi.disabled = true;
        button_hapusTujuanKonversi.disabled = true;
        // set up kolom asal konversi
        // satuan_primerAsal.readOnly = true;
        // satuan_sekunderAsal.readOnly = true;
        // satuan_tritierAsal.readOnly = true;
        // satuan_saldoTerakhirAsalPrimer.readOnly = true;
        // satuan_saldoTerakhirAsalSekunder.readOnly = true;
        // satuan_saldoTerakhirAsalTritier.readOnly = true;
        // saldo_terakhirAsalPrimer.readOnly = true;
        // saldo_terakhirAsalSekunder.readOnly = true;
        // saldo_terakhirAsalTritier.readOnly = true;
        // select_objekAsal.disabled = true;
        // select_kelompokUtamaAsal.disabled = true;
        // select_kelompokAsal.disabled = true;
        // select_subKelompokAsal.disabled = true;
        // select_typeAsal.disabled = true;
        // PIB_asal.readOnly = true;
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
            // if (currentElement.id == "asal_konversiTritier") {
            //     return button_tambahAsalKonversi.disabled
            //         ? document.getElementById("button_updateAsalKonversi")
            //         : document.getElementById("button_tambahAsalKonversi");
            // }

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
                // select_divisiAsal.focus();
                group.focus();
            }
        }
    });

    group.addEventListener("input", function (e) {
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
            this.setCustomValidity("Silahkan input group [A], [B], atau [C]"); // prettier-ignore
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    group.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (group.value == "") {
                group.classList.add("input-error");
            } else {
                this.classList.remove("input-error");
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
                    // Loop through table rows and sum only those without the .selected class
                    table_daftarTujuanKonversi.rows().every(function () {
                        let rowNode = this.node();
                        if (!rowNode.classList.contains("selected")) {
                            sumHasilKonversiTritier = 0;
                            sumHasilKonversiTritier += parseFloat(this.data()[4]) || 0; // prettier-ignore
                        }
                    });
                    maxHasilKonversiTritier = (parseFloat(table_daftarAsalKonversi.data()[0][4]) * 1.03) - sumHasilKonversiTritier; // prettier-ignore
                    console.log(
                        maxHasilKonversiTritier,
                        sumHasilKonversiTritier
                    );
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
            e.target.value = maxHasilKonversiTritier.toFixed(2);
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
                        showConfirmButton: false,
                        timer: 1000,
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
                showConfirmButton: false,
                timer: 1000,
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
                    showConfirmButton: false,
                    timer: 1000,
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
                        showConfirmButton: false,
                        timer: 1000,
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
                showConfirmButton: false,
                timer: 1000,
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
                showConfirmButton: false,
                timer: 1000,
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
            if (table_daftarTujuanKonversi.column(4).data().sum() > 0) {
                // Loop through table rows and sum only those without the .selected class
                table_daftarTujuanKonversi.rows().every(function () {
                    let rowNode = this.node();
                    if (!rowNode.classList.contains("selected")) {
                        sumHasilKonversiTritier = 0;
                        sumHasilKonversiTritier += parseFloat(this.data()[4]) || 0; // prettier-ignore
                    }
                });
                maxHasilKonversiTritier = (parseFloat(table_daftarAsalKonversi.data()[0][4]) * 1.03) - sumHasilKonversiTritier; // prettier-ignore
                console.log(maxHasilKonversiTritier, sumHasilKonversiTritier);
            } else {
                maxHasilKonversiTritier = table_daftarAsalKonversi.data()[0][4] * 1.03; // prettier-ignore
            }

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
                            console.log(response);

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

                            saldo_terakhirTujuanPrimer.value = parseFloat(response[0].SaldoPrimer).toFixed(2); // prettier-ignore
                            satuan_saldoTerakhirTujuanPrimer.value = response[0].satPrimer.trim(); // prettier-ignore
                            saldo_terakhirTujuanSekunder.value = parseFloat(response[0].SaldoSekunder).toFixed(2); // prettier-ignore
                            satuan_saldoTerakhirTujuanSekunder.value = response[0].satSekunder.trim(); // prettier-ignore
                            saldo_terakhirTujuanTritier.value = parseFloat(response[0].SaldoTritier).toFixed(2); // prettier-ignore
                            satuan_saldoTerakhirTujuanTritier.value = response[0].satTritier.trim(); // prettier-ignore
                            satuan_primerTujuan.value = response[0].satPrimer.trim(); // prettier-ignore
                            satuan_sekunderTujuan.value = response[0].satSekunder.trim(); // prettier-ignore
                            satuan_tritierTujuan.value = response[0].satTritier.trim(); // prettier-ignore

                            if (
                                (parseFloat(data[4]) > 0 ||
                                    response[0].satTritier) &&
                                (parseFloat(data[3]) > 0 ||
                                    response[0].satSekunder) &&
                                (parseFloat(data[2]) > 0 ||
                                    response[0].satPrimer)
                            ) {
                                hasil_konversiPrimerTujuan.value = data[2];
                                hasil_konversiPrimerTujuan.readOnly = false;
                                hasil_konversiSekunderTujuan.value = data[3];
                                hasil_konversiSekunderTujuan.readOnly = false;
                                hasil_konversiTritierTujuan.value = data[4];
                                hasil_konversiTritierTujuan.readOnly = false;
                                hasil_konversiPrimerTujuan.select();
                            } else if (
                                (parseFloat(data[3]) > 0 ||
                                    response[0].satSekunder) &&
                                (parseFloat(data[2]) > 0 ||
                                    response[0].satPrimer)
                            ) {
                                hasil_konversiPrimerTujuan.value = data[2];
                                hasil_konversiPrimerTujuan.readOnly = true;
                                hasil_konversiSekunderTujuan.value = data[3];
                                hasil_konversiSekunderTujuan.readOnly = false;
                                hasil_konversiTritierTujuan.value = data[4];
                                hasil_konversiTritierTujuan.readOnly = false;
                                hasil_konversiSekunderTujuan.select();
                            } else {
                                hasil_konversiPrimerTujuan.value = data[2];
                                hasil_konversiPrimerTujuan.readOnly = true;
                                hasil_konversiSekunderTujuan.value = data[3];
                                hasil_konversiSekunderTujuan.readOnly = true;
                                hasil_konversiTritierTujuan.value = data[4];
                                hasil_konversiTritierTujuan.readOnly = false;
                                hasil_konversiTritierTujuan.select();
                            }

                            button_tambahTujuanKonversi.disabled = true;
                            button_hapusTujuanKonversi.disabled = false;
                            button_updateTujuanKonversi.disabled = false;
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

    // select_divisiAsal.addEventListener("change", function (e) {
    //     this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
    //     this.reportValidity(); // Display the validity message
    //     clearTujuan("divisiAsal");
    // });

    // select_divisiAsal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter" && select_divisiAsal.selectedIndex !== 0) {
    //         e.preventDefault();
    //         this.blur();
    //         $.ajax({
    //             type: "GET",
    //             url: "/KonversiRollBarcode/getObjek",
    //             data: {
    //                 _token: csrfToken,
    //                 idDivisi: select_divisiAsal.value,
    //             },
    //             success: function (response) {
    //                 select_objekAsal.disabled = false;
    //                 response.forEach((item) => {
    //                     // Create a new option element
    //                     const option = document.createElement("option");
    //                     // Set the value and text of the option
    //                     option.value = item.IdObjek;
    //                     option.textContent = item.NamaObjek;
    //                     // Append the option to the select element
    //                     select_objekAsal.appendChild(option);
    //                 });
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error(error);
    //             },
    //         }).then(() => {
    //             select_objekAsal.focus();
    //         });
    //     }
    // });

    // select_objekAsal.addEventListener("change", function (e) {
    //     this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
    //     this.reportValidity(); // Display the validity message
    //     clearTujuan("objekAsal");
    // });

    // select_objekAsal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter" && select_objekAsal.selectedIndex !== 0) {
    //         e.preventDefault();
    //         this.blur();
    //         $.ajax({
    //             type: "GET",
    //             url: "/KonversiRollBarcode/getKelompokUtama",
    //             data: {
    //                 _token: csrfToken,
    //                 idObjek: select_objekAsal.value,
    //             },
    //             success: function (response) {
    //                 select_kelompokUtamaAsal.disabled = false;
    //                 // Clear only non-disabled options
    //                 Array.from(select_kelompokUtamaAsal.options).forEach(
    //                     (option) => {
    //                         if (!option.disabled) {
    //                             option.remove();
    //                         }
    //                     }
    //                 );
    //                 response.forEach((item) => {
    //                     // Create a new option element
    //                     const option = document.createElement("option");
    //                     // Set the value and text of the option
    //                     option.value = item.IdKelompokUtama;
    //                     option.textContent = item.NamaKelompokUtama;
    //                     // Append the option to the select element
    //                     select_kelompokUtamaAsal.appendChild(option);
    //                 });
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error(error);
    //             },
    //         }).then(() => {
    //             select_kelompokUtamaAsal.focus();
    //         });
    //     }
    // });

    // select_kelompokUtamaAsal.addEventListener("change", function (e) {
    //     this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
    //     this.reportValidity(); // Display the validity message
    //     clearTujuan("kelompokutamaAsal");
    // });

    // select_kelompokUtamaAsal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter" && select_kelompokUtamaAsal.selectedIndex !== 0) {
    //         e.preventDefault();
    //         this.blur();
    //         $.ajax({
    //             type: "GET",
    //             url: "/KonversiRollBarcode/getKelompok",
    //             data: {
    //                 _token: csrfToken,
    //                 idKelompokUtama: select_kelompokUtamaAsal.value,
    //             },
    //             success: function (response) {
    //                 select_kelompokAsal.disabled = false;
    //                 // Clear only non-disabled options
    //                 Array.from(select_kelompokAsal.options).forEach(
    //                     (option) => {
    //                         if (!option.disabled) {
    //                             option.remove();
    //                         }
    //                     }
    //                 );
    //                 response.forEach((item) => {
    //                     // Create a new option element
    //                     const option = document.createElement("option");
    //                     // Set the value and text of the option
    //                     option.value = item.idkelompok;
    //                     option.textContent = item.namakelompok;
    //                     // Append the option to the select element
    //                     select_kelompokAsal.appendChild(option);
    //                     select_kelompokAsal.focus();
    //                 });
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error(error);
    //             },
    //         });
    //     }
    // });

    // select_kelompokAsal.addEventListener("change", function (e) {
    //     this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
    //     this.reportValidity(); // Display the validity message
    //     clearTujuan("kelompokAsal");
    // });

    // select_kelompokAsal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter" && select_kelompokAsal.selectedIndex !== 0) {
    //         e.preventDefault();
    //         this.blur();
    //         $.ajax({
    //             type: "GET",
    //             url: "/KonversiRollBarcode/getSubKelompok",
    //             data: {
    //                 _token: csrfToken,
    //                 idKelompok: select_kelompokAsal.value,
    //             },
    //             success: function (response) {
    //                 select_subKelompokAsal.disabled = false;
    //                 // Clear only non-disabled options
    //                 Array.from(select_subKelompokAsal.options).forEach(
    //                     (option) => {
    //                         if (!option.disabled) {
    //                             option.remove();
    //                         }
    //                     }
    //                 );
    //                 response.forEach((item) => {
    //                     // Create a new option element
    //                     const option = document.createElement("option");
    //                     // Set the value and text of the option
    //                     option.value = item.IdSubkelompok;
    //                     option.textContent = item.NamaSubKelompok;
    //                     // Append the option to the select element
    //                     select_subKelompokAsal.appendChild(option);
    //                 });
    //                 select_subKelompokAsal.focus();
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error(error);
    //             },
    //         });
    //     }
    // });

    // select_subKelompokAsal.addEventListener("change", function (e) {
    //     this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
    //     this.reportValidity(); // Display the validity message
    //     clearTujuan("subkelompokAsal");
    // });

    // select_subKelompokAsal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter" && select_subKelompokAsal.selectedIndex !== 0) {
    //         e.preventDefault();
    //         this.blur();
    //         // Clear only non-disabled options
    //         Array.from(select_typeAsal.options).forEach((option) => {
    //             if (!option.disabled) {
    //                 option.remove();
    //             }
    //         });

    //         $.ajax({
    //             type: "GET",
    //             url: "/KonversiRollBarcode/getType",
    //             data: {
    //                 _token: csrfToken,
    //                 idSubKelompok: select_subKelompokAsal.value,
    //             },
    //             success: function (response) {
    //                 select_typeAsal.disabled = false;
    //                 if (select_kelompokUtamaAsal.value == 1029) {
    //                     let itemsAdded = false; // Track if any item is added
    //                     // console.log(d_tek1PanjangRoll);

    //                     response.forEach((item) => {
    //                         // console.log(item.PanjangPotongan);
    //                         // console.log(item.LebarPotongan);
    //                         // If
    //                         if (
    //                             parseFloat(d_tek1PanjangRoll) !== "" &&
    //                             (parseFloat(d_tek1PanjangRoll) >
    //                                 parseFloat(item.PanjangPotongan) ||
    //                                 parseFloat(d_tek1PanjangRoll) >
    //                                     parseFloat(item.LebarPotongan))
    //                         ) {
    //                             const matchedOption =
    //                                 document.createElement("option");
    //                             matchedOption.value = item.IdType;
    //                             matchedOption.textContent =
    //                                 item.NamaType + " | " + item.IdType;
    //                             select_typeAsal.appendChild(matchedOption);
    //                             itemsAdded = true;
    //                         }
    //                     });

    //                     if (!itemsAdded) {
    //                         Swal.fire({
    //                             icon: "warning",
    //                             title: "Perhatian",
    //                             text:
    //                                 "Tidak ukuran " +
    //                                 d_tek1PanjangRoll +
    //                                 " pada sub kelompok " +
    //                                 select_subKelompokAsal.options[
    //                                     select_subKelompokAsal.selectedIndex
    //                                 ].text,
    //                         }).then(() => {
    //                             select_subKelompokAsal.focus();
    //                             select_typeAsal.disabled = true;
    //                         });
    //                     } else {
    //                         select_subKelompokAsal.focus();
    //                     }
    //                 } else {
    //                     response.forEach((item) => {
    //                         // Create a new option element
    //                         const option = document.createElement("option");
    //                         // Set the value and text of the option
    //                         option.value = item.IdType;
    //                         option.textContent =
    //                             item.NamaType + " | " + item.IdType;
    //                         // Append the option to the select element
    //                         select_typeAsal.appendChild(option);
    //                     });
    //                 }
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error(error);
    //             },
    //         }).then(() => {
    //             select_typeAsal.focus();
    //         });
    //     }
    // });

    // select_typeAsal.addEventListener("change", function (e) {
    //     this.setCustomValidity("Silahkan tekan Enter!"); // Set custom validity message
    //     this.reportValidity(); // Display the validity message
    //     clearTujuan("typeAsal");
    // });

    // select_typeAsal.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter" && select_typeAsal.selectedIndex !== 0) {
    //         e.preventDefault();
    //         asal_konversiPrimer.focus();
    //         $.ajax({
    //             type: "GET",
    //             url: "/KonversiRollBarcode/getDataType",
    //             data: {
    //                 _token: csrfToken,
    //                 IdType: select_typeAsal.value,
    //             },
    //             success: function (data) {
    //                 console.log(data);

    //                 if (parseFloat(data[0].SaldoTritier) == 0) {
    //                     Swal.fire({
    //                         icon: "info",
    //                         title: "Pemberitahuan",
    //                         text: "Type barang tidak memiliki saldo!",
    //                     });
    //                     return; // Exit the function if SaldoTritier is 0
    //                 }
    //                 satuan_saldoTerakhirAsalPrimer.value = data[0].satPrimer.trim(); // prettier-ignore
    //                 satuan_saldoTerakhirAsalSekunder.value = data[0].satSekunder.trim(); // prettier-ignore
    //                 satuan_saldoTerakhirAsalTritier.value = data[0].satTritier.trim(); // prettier-ignore
    //                 saldo_terakhirAsalPrimer.value = parseFloat(data[0].SaldoPrimer); // prettier-ignore
    //                 saldo_terakhirAsalSekunder.value = parseFloat(data[0].SaldoSekunder); // prettier-ignore
    //                 saldo_terakhirAsalTritier.value = parseFloat(data[0].SaldoTritier); // prettier-ignore
    //                 satuan_primerAsal.value = data[0].satPrimer.trim();
    //                 satuan_sekunderAsal.value = data[0].satSekunder.trim();
    //                 satuan_tritierAsal.value = data[0].satTritier.trim();
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error(error);
    //             },
    //         }).then(() => {
    //             // check satuan_sekunderAsal if null then hasil = 0
    //             if (satuan_sekunderAsal.value !== "NULL") {
    //                 asal_konversiSekunder.readOnly = false;
    //                 asal_konversiSekunder.focus();
    //             } else {
    //                 asal_konversiSekunder.value = numeral(0).format("0.00"); // prettier-ignore
    //                 asal_konversiSekunder.readOnly = true;
    //                 asal_konversiTritier.focus();
    //             }

    //             // check satuan_primerAsal if null then hasil = 0
    //             if (satuan_primerAsal.value !== "NULL") {
    //                 asal_konversiPrimer.readOnly = false;
    //                 asal_konversiPrimer.focus();
    //             } else {
    //                 asal_konversiPrimer.value = numeral(0).format("0.00"); // prettier-ignore
    //                 asal_konversiPrimer.readOnly = true;
    //             }
    //         });
    //     }
    // });

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

    // button_tambahAsalKonversi.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     // Id type Asal dan Tujuan tidak boleh sama
    //     let checkIdType = true;
    //     let checkHasilKonversi = true;
    //     let checkSelectInput = true;

    //     // Check if any row in table_daftarTujuanKonversi has the same IdType as select_typeAsal
    //     table_daftarTujuanKonversi
    //         .rows()
    //         .every(function (rowIdx, tableLoop, rowLoop) {
    //             let rowData = this.data();
    //             if (rowData[0] == select_typeAsal.value) {
    //                 Swal.fire({
    //                     icon: "info",
    //                     title: "Pemberitahuan",
    //                     text: "Id Type Asal dan Tujuan tidak boleh sama!",
    //                 });
    //                 checkIdType = false;
    //                 return false; // Stop iteration if a match is found
    //             }
    //         });

    //     // check quantity hasil konversi, apakah sesuai ketentuan
    //     if (
    //         (asal_konversiPrimer.value == 0 &&
    //             asal_konversiSekunder.value == 0 &&
    //             asal_konversiTritier.value == 0) ||
    //         (asal_konversiTritier.value == 0 &&
    //             satuan_tritierAsal.value.trim() ==
    //                 satuan_saldoTerakhirTritierBarcodeAsal.value.trim())
    //     ) {
    //         asal_konversiTritier.focus();
    //         asal_konversiTritier.select();
    //         checkHasilKonversi = false;
    //     }

    //     if (select_typeAsal.selectedIndex == 0) {
    //         Swal.fire({
    //             icon: "info",
    //             title: "Pemberitahuan",
    //             text: "Asal Konversi tidak boleh kosong!",
    //         }).then(() => {
    //             select_divisiAsal.focus();
    //         });
    //         checkSelectInput = false;
    //     }

    //     // Check if all inputs are filled
    //     if (checkIdType && checkHasilKonversi && checkSelectInput) {
    //         // Array to store the input values
    //         let inputData = [
    //             select_typeAsal.value,
    //             select_typeAsal.options[select_typeAsal.selectedIndex].textContent.split(" | ")[0].trim(),
    //             asal_konversiPrimer.value,
    //             asal_konversiSekunder.value,
    //             asal_konversiTritier.value,
    //             '',
    //             select_subKelompokAsal.value,
    //         ]; // prettier-ignore
    //         let isDuplicate = false;

    //         table_daftarAsalKonversi
    //             .rows()
    //             .every(function (rowIdx, tableLoop, rowLoop) {
    //                 let rowData = this.data();

    //                 // Only check the first and second columns
    //                 if (
    //                     rowData[0] == inputData[0] ||
    //                     rowData[1] == inputData[1]
    //                 ) {
    //                     isDuplicate = true; // Check for duplicate entry in the first and second columns
    //                     return false; // Stop iteration if a match is found
    //                 }
    //             });

    //         if (isDuplicate) {
    //             Swal.fire({
    //                 icon: "info",
    //                 title: "Pemberitahuan",
    //                 text: "Barang sudah pernah diinput ke tabel!",
    //             });
    //         } else {
    //             // Add a new row with all input data to the DataTable
    //             table_daftarAsalKonversi.row.add(inputData).draw();
    //             // Loop through each select element
    //             selectIdsAsal.forEach((id) => {
    //                 const $select = $(id);
    //                 // Select the disabled option
    //                 $select.val($select.find("option[disabled]").val());
    //                 if (id !== "#select_divisiAsal") {
    //                     $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
    //                     $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
    //                 }
    //             });

    //             // Clear all input text fields
    //             inputTextIdsAsal.forEach((id) => {
    //                 $(id).val("");
    //             });
    //             select_divisiAsal.focus();
    //         }
    //     } else {
    //         Swal.fire("Pemberitahuan", "Ada kolom yang belum terisi", "info");
    //     }
    // });

    // button_updateAsalKonversi.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     // Id type Asal dan Tujuan tidak boleh sama
    //     let checkIdType = true;
    //     let checkHasilKonversi = true;
    //     let checkSelectInput = true;

    //     if (table_daftarAsalKonversi.data()[0][0] == select_typeTujuan.value) {
    //         Swal.fire({
    //             icon: "info",
    //             title: "Pemberitahuan",
    //             text: "Id Type Asal dan Tujuan tidak boleh sama!",
    //         });
    //         checkIdType = false;
    //     }

    //     if (
    //         asal_konversiPrimer.value == 0 &&
    //         asal_konversiSekunder.value == 0 &&
    //         asal_konversiTritier.value == 0
    //     ) {
    //         Swal.fire({
    //             icon: "info",
    //             title: "Pemberitahuan",
    //             text: "Asal Konversi tidak boleh kosong!",
    //         }).then(() => {
    //             asal_konversiTritier.focus();
    //             asal_konversiTritier.select();
    //         });
    //         checkHasilKonversi = false;
    //     }

    //     if (select_typeAsal.selectedIndex == 0) {
    //         Swal.fire({
    //             icon: "info",
    //             title: "Pemberitahuan",
    //             text: "Asal Konversi tidak boleh kosong!",
    //         }).then(() => {
    //             select_divisiAsal.focus();
    //         });
    //         checkSelectInput = false;
    //     }

    //     // Check if all inputs are filled
    //     if (checkIdType && checkHasilKonversi && checkSelectInput) {
    //         // Array to store the input values
    //         let inputData = [
    //             select_typeAsal.value,
    //             select_typeAsal.options[select_typeAsal.selectedIndex].textContent.split(" | ")[0].trim(),
    //             asal_konversiPrimer.value,
    //             asal_konversiSekunder.value,
    //             asal_konversiTritier.value,
    //             '',
    //             select_subKelompokAsal.value,
    //         ]; // prettier-ignore

    //         const selectedRow = table_daftarAsalKonversi.row(".selected");

    //         if (selectedRow.any()) {
    //             // Update the selected row with the new data
    //             selectedRow.data(inputData).draw();

    //             // Remove the 'selected' class from any previously selected row
    //             $("#table_daftarAsalKonversi tbody tr").removeClass("selected"); // prettier-ignore
    //             select_divisiAsal.focus();
    //         } else {
    //             Swal.fire(
    //                 "Pemberitahuan",
    //                 "Pilih baris yang ingin diubah",
    //                 "info"
    //             );
    //         }

    //         // Remove the 'selected' class from any previously selected row
    //         $("#table_daftarAsalKonversi tbody tr").removeClass("selected");

    //         // Loop through each select element
    //         selectIdsAsal.forEach((id) => {
    //             const $select = $(id);
    //             // Select the disabled option
    //             $select.val($select.find("option[disabled]").val());

    //             if (id !== "#select_divisiAsal") {
    //                 $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
    //                 $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
    //             }
    //         });

    //         // Clear all input text fields
    //         inputTextIdsAsal.forEach((id) => {
    //             $(id).val("");
    //         });
    //         select_divisiAsal.focus();
    //         button_tambahAsalKonversi.disabled = false;
    //         button_hapusAsalKonversi.disabled = true;
    //         button_updateAsalKonversi.disabled = true;
    //         button_modalProses.disabled = false;
    //     } else {
    //         Swal.fire("Pemberitahuan", "Harap isi semua kolom", "info");
    //     }
    // });

    // button_hapusAsalKonversi.addEventListener("click", function (e) {
    //     e.preventDefault();

    //     // Get the selected row index
    //     const selectedRow = table_daftarAsalKonversi.row(".selected");

    //     if (selectedRow.any()) {
    //         // Use Swal.fire for confirmation
    //         Swal.fire({
    //             title: "Are you sure?",
    //             text: "Do you really want to delete the selected row?",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonText: "Yes, delete it!",
    //             cancelButtonText: "No, keep it",
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 // If user confirms, delete the selected row
    //                 selectedRow.remove().draw(false);

    //                 selectIdsAsal.forEach((id) => {
    //                     const $select = $(id);
    //                     // Select the disabled option
    //                     $select.val($select.find("option[disabled]").val());

    //                     if (id !== "#select_divisiTujuan") {
    //                         $select.prop("disabled", true); // Disable all selects except '#select_divisiTujuan'
    //                         $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
    //                     }
    //                 });

    //                 // Clear all input text fields
    //                 inputTextIdsAsal.forEach((id) => {
    //                     $(id).val("");
    //                 });
    //                 select_divisiAsal.focus();

    //                 // Remove the 'selected' class from any previously selected row
    //                 $("#table_daftarAsalKonversi tbody tr").removeClass(
    //                     "selected"
    //                 );

    //                 button_tambahAsalKonversi.disabled = false;
    //                 button_hapusAsalKonversi.disabled = true;
    //                 button_updateAsalKonversi.disabled = true;
    //                 if (table_daftarAsalKonversi.data().length < 1) {
    //                     button_modalProses.disabled = true;
    //                 }
    //                 // Force the table to refresh its internal data
    //                 table_daftarAsalKonversi.rows().invalidate().draw();

    //                 // Show success message
    //                 Swal.fire("Berhasil!", "Baris sudah dihapus.", "success");
    //             } else if (result.isDismissed) {
    //                 // If user cancels, show a message or do nothing
    //                 Swal.fire(
    //                     "Pemberitahuan",
    //                     "Baris tidak jadi dihapus :)",
    //                     "info"
    //                 );
    //             }
    //         });
    //     } else {
    //         Swal.fire(
    //             "Pemberitahuan",
    //             "Pilih baris yang ingin dihapus.",
    //             "info"
    //         );
    //     }
    // });

    // $("#table_daftarAsalKonversi tbody").on("click", "tr", function () {
    //     // Remove the 'selected' class from any previously selected row
    //     $("#table_daftarAsalKonversi tbody tr").removeClass("selected");
    //     console.log(table_daftarAsalKonversi.data());

    //     if (
    //         table_daftarAsalKonversi.data().length > 0 &&
    //         table_daftarAsalKonversi.row(this).data()[5] !=
    //             input_barcodeAsal.value
    //     ) {
    //         // Add the 'selected' class to the clicked row
    //         $(this).addClass("selected");

    //         // Get data from the clicked row
    //         var data = table_daftarAsalKonversi.row(this).data();
    //         console.log(data);

    //         // If data exists, populate input fields
    //         if (Array.isArray(data) && data.length > 0) {
    //             $.ajax({
    //                 type: "GET",
    //                 url: "/KonversiRollBarcode/getDataType",
    //                 data: {
    //                     _token: csrfToken,
    //                     IdType: data[0],
    //                 },
    //                 success: function (response) {
    //                     if (response.error) {
    //                         Swal.fire({
    //                             icon: "error",
    //                             title: "Error!",
    //                             text: response.error,
    //                             showConfirmButton: false,
    //                         });
    //                     } else {
    //                         select_divisiAsal.value = response[0].IdDivisi;
    //                         let optionKoreksiObjekAsal = document.createElement("option"); // prettier-ignore
    //                         let optionKoreksiKelompokUtamaAsal = document.createElement("option"); // prettier-ignore
    //                         let optionKoreksiKelompokAsal = document.createElement("option"); // prettier-ignore
    //                         let optionKoreksiSubKelompokAsal = document.createElement("option"); // prettier-ignore
    //                         let optionKoreksiTypeAsal = document.createElement("option"); // prettier-ignore

    //                         //Set up select objek
    //                         optionKoreksiObjekAsal.value = response[0].IdObjek; // prettier-ignore
    //                         optionKoreksiObjekAsal.textContent = response[0].NamaObjek; // prettier-ignore
    //                         select_objekAsal.appendChild(optionKoreksiObjekAsal); // prettier-ignore
    //                         select_objekAsal.selectedIndex = 1; // prettier-ignore

    //                         //Set up select kelompok utama
    //                         optionKoreksiKelompokUtamaAsal.value = response[0].IdKelompokUtama; // prettier-ignore
    //                         optionKoreksiKelompokUtamaAsal.textContent = response[0].NamaKelompokUtama; // prettier-ignore
    //                         select_kelompokUtamaAsal.appendChild(optionKoreksiKelompokUtamaAsal); // prettier-ignore
    //                         select_kelompokUtamaAsal.selectedIndex = 1; // prettier-ignore

    //                         //Set up select kelompok
    //                         optionKoreksiKelompokAsal.value = response[0].IdKelompok; // prettier-ignore
    //                         optionKoreksiKelompokAsal.textContent = response[0].NamaKelompok; // prettier-ignore
    //                         select_kelompokAsal.appendChild(optionKoreksiKelompokAsal); // prettier-ignore
    //                         select_kelompokAsal.selectedIndex = 1; // prettier-ignore

    //                         //Set up select sub kelompok
    //                         optionKoreksiSubKelompokAsal.value = response[0].IdSubkelompok; // prettier-ignore
    //                         optionKoreksiSubKelompokAsal.textContent = response[0].NamaSubKelompok; // prettier-ignore
    //                         select_subKelompokAsal.appendChild(optionKoreksiSubKelompokAsal); // prettier-ignore
    //                         select_subKelompokAsal.selectedIndex = 1; // prettier-ignore

    //                         //Set up select Id Type
    //                         optionKoreksiTypeAsal.value = data[0]; // prettier-ignore
    //                         optionKoreksiTypeAsal.textContent = data[1]; // prettier-ignore
    //                         select_typeAsal.appendChild(optionKoreksiTypeAsal); // prettier-ignore
    //                         select_typeAsal.selectedIndex = 1; // prettier-ignore

    //                         asal_konversiPrimer.value = data[2];
    //                         asal_konversiSekunder.value = data[3];
    //                         asal_konversiTritier.value = data[4];

    //                         button_tambahAsalKonversi.disabled = true;
    //                         button_hapusAsalKonversi.disabled = false;
    //                         button_updateAsalKonversi.disabled = false;
    //                         asal_konversiPrimer.readOnly = false;
    //                         asal_konversiSekunder.readOnly = false;
    //                         asal_konversiTritier.readOnly = false;
    //                         asal_konversiPrimer.select();
    //                     }
    //                 },
    //                 error: function (xhr, status, error) {
    //                     console.error(error);
    //                 },
    //             });
    //         } else {
    //             Swal.fire(
    //                 "Pemberitahuan",
    //                 "Terjadi Kesalahan.",
    //                 "Terjadi kesalahan saat click table asal konversi, hubungi EDP!"
    //             );
    //         }
    //     }
    // });

    button_modalProses.addEventListener("click", function (e) {
        // e.preventDefault();
        let sisaRoll = 0;
        sisaRoll =
            table_daftarAsalKonversi.data()[0][4] -
            table_daftarTujuanKonversi.column(4).data().sum();
        let lembarPerKilo =
            table_daftarAsalKonversi.data()[0][3] /
            table_daftarAsalKonversi.data()[0][4];
        if (id_shift.value !== "" && group.value) {
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
                timer: 100,
                text: "Kolom shift dan group harus diisi!",
                showConfirmButton: false,
            }).then(() => {
                id_shift.focus();
            });
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
                            html: `<svg id="swalBarcode"></svg>`,
                            customClass: {
                                popup: "wide-swal", // Custom class to widen the modal
                            },
                            didOpen: () => {
                                JsBarcode("#swalBarcode", barcodeValue, {
                                    format: "CODE128",
                                    width: 2, // Reduce the width of barcode units
                                    height: 100, // Adjust height for better fit
                                    displayValue: true,
                                });
                                // Generate the barcode with JsBarcode
                                JsBarcode("#div_printBarcode", barcodeValue, {
                                    format: "CODE128", // The format of the barcode (e.g., CODE128, EAN13, UPC, etc.)
                                    width: 4, // Width of a single barcode unit
                                    height: 200, // Height of the barcode
                                    displayValue: true, // Display the value below the barcode
                                });
                            },
                        }).then(() => {
                            getDataPermohonan();
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
                            text: responseSuccess,
                            showConfirmButton: false,
                        }).then(() => {
                            getDataPermohonan();
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
                        return (
                            item.UraianDetailTransaksi.includes(
                                "Asal Konversi Potongan ADS"
                            ) ||
                            item.UraianDetailTransaksi.includes(
                                "Asal Konversi Potongan Tanpa Barcode ADS"
                            )
                        );
                    });

                    // Filter data for Tujuan Konversi Potong ADS
                    var tujuanData = response.filter(function (item) {
                        return (
                            item.UraianDetailTransaksi.includes(
                                "Tujuan Konversi Potongan ADS"
                            ) ||
                            item.UraianDetailTransaksi.includes(
                                "Tujuan Konversi Potongan Tanpa Barcode ADS"
                            )
                        );
                    });

                    // Convert the data to match table column structure
                    var asalDataFormatted = asalData.map(function (item) {
                        const satPrimer =
                            item.satPrimer &&
                            item.satPrimer.trim().toUpperCase() !== "NULL"
                                ? item.satPrimer.trim()
                                : "";

                        const satSekunder =
                            item.satSekunder &&
                            item.satSekunder.trim().toUpperCase() !== "NULL"
                                ? item.satSekunder.trim()
                                : "";

                        const satTritier =
                            item.satTritier &&
                            item.satTritier.trim().toUpperCase() !== "NULL"
                                ? item.satTritier.trim()
                                : "";

                        return [
                            item.IdType, // Id Type Asal
                            item.NamaType, // Nama Type Asal
                            satPrimer
                                ? numeral(
                                      parseFloat(item.JumlahPengeluaranPrimer)
                                  ).format("0,0.00") +
                                  " " +
                                  satPrimer
                                : "-", // Pengeluaran Primer
                            satSekunder
                                ? numeral(
                                      parseFloat(item.JumlahPengeluaranSekunder)
                                  ).format("0,0.00") +
                                  " " +
                                  satSekunder
                                : "-", // Pengeluaran Sekunder
                            satTritier
                                ? numeral(
                                      parseFloat(item.JumlahPengeluaranTritier)
                                  ).format("0,0.00") +
                                  " " +
                                  satTritier
                                : "-", // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    var tujuanDataFormatted = tujuanData.map(function (item) {
                        const satPrimer =
                            item.satPrimer &&
                            item.satPrimer.trim().toUpperCase() !== "NULL"
                                ? item.satPrimer.trim()
                                : "";

                        const satSekunder =
                            item.satSekunder &&
                            item.satSekunder.trim().toUpperCase() !== "NULL"
                                ? item.satSekunder.trim()
                                : "";

                        const satTritier =
                            item.satTritier &&
                            item.satTritier.trim().toUpperCase() !== "NULL"
                                ? item.satTritier.trim()
                                : "";
                        return [
                            item.IdType, // Id Type Tujuan
                            item.NamaType, // Nama Type Tujuan
                            satPrimer
                                ? numeral(
                                      parseFloat(item.JumlahPemasukanPrimer)
                                  ).format("0,0.00") +
                                  " " +
                                  satPrimer
                                : "-",
                            satSekunder
                                ? numeral(
                                      parseFloat(item.JumlahPemasukanSekunder)
                                  ).format("0,0.00") +
                                  " " +
                                  satSekunder
                                : "-",
                            satTritier
                                ? numeral(
                                      parseFloat(item.JumlahPemasukanTritier)
                                  ).format("0,0.00") +
                                  " " +
                                  satTritier
                                : "-",
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

    //#region Get Element By ID Modal Tanpa Barcode
    const select_divisiTanpaBarcode = $('#select_divisiTanpaBarcode'); // prettier-ignore
    const select_customerTanpaBarcode = $('#select_customerTanpaBarcode'); // prettier-ignore
    const select_kodeBarangTanpaBarcode = $('#select_kodeBarangTanpaBarcode'); // prettier-ignore
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
    let button_modalProsesTanpaBarcode = document.getElementById('button_modalProsesTanpaBarcode'); // prettier-ignore
    let button_tambahAsalKonversiTanpaBarcode = document.getElementById("button_tambahAsalKonversiTanpaBarcode"); // prettier-ignore
    let button_updateAsalKonversiTanpaBarcode = document.getElementById("button_updateAsalKonversiTanpaBarcode"); // prettier-ignore
    let button_hapusAsalKonversiTanpaBarcode = document.getElementById("button_hapusAsalKonversiTanpaBarcode"); // prettier-ignore
    let button_tambahTujuanKonversiTanpaBarcode = document.getElementById("button_tambahTujuanKonversiTanpaBarcode"); // prettier-ignore
    let button_updateTujuanKonversiTanpaBarcode = document.getElementById("button_updateTujuanKonversiTanpaBarcode"); // prettier-ignore
    let button_hapusTujuanKonversiTanpaBarcode = document.getElementById("button_hapusTujuanKonversiTanpaBarcode"); // prettier-ignore
    let div_PIBAsalTanpaBarcode = document.getElementById('div_PIBAsalTanpaBarcode'); // prettier-ignore
    let div_PIBTujuanTanpaBarcode = document.getElementById('div_PIBTujuanTanpaBarcode'); // prettier-ignore
    let div_tabelTujuanKonversiTanpaBarcode = document.getElementById('div_tabelTujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_asalKonversiTanpaBarcode = document.getElementById('div_asalKonversiTanpaBarcode'); // prettier-ignore
    let div_tujuanKonversiTanpaBarcode = document.getElementById('div_tujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_headerFormTambahTujuanKonversiTanpaBarcode = document.getElementById('div_headerFormTambahTujuanKonversiTanpaBarcode'); // prettier-ignore
    let id_shiftTanpaBarcode = document.getElementById("id_shiftTanpaBarcode"); // prettier-ignore
    let group_TanpaBarcode = document.getElementById("group_TanpaBarcode"); // prettier-ignore
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
    let dataPanjangFlat;
    let totalSekunderHasil;

    let table_daftarAsalKonversiTanpaBarcode = $("#table_daftarAsalKonversiTanpaBarcode").DataTable({
        paging: false,
        searching: false,
        info: false,
        autoWidth: false,
    }); // prettier-ignore

    let table_daftarTujuanKonversiTanpaBarcode = $("#table_daftarTujuanKonversiTanpaBarcode").DataTable({
        paging: false,
        searching: false,
        info: false,
        autoWidth: false,
        columnDefs: [
            {
                target: 8,
                visible: false,
            },
        ],
    }); // prettier-ignore

    //#endregion

    function cekRowTable() {
        const hasAsalRows = table_daftarAsalKonversiTanpaBarcode.rows().count() > 0; // prettier-ignore
        const hasTujuanRows = table_daftarTujuanKonversiTanpaBarcode.rows().count() > 0; // prettier-ignore

        // Enable or disable selects based on asal table rows
        $("#select_customerTanpaBarcode, #select_kodeBarangTanpaBarcode").prop("disabled",hasAsalRows); // prettier-ignore

        // Enable or disable the process button
        button_modalProsesTanpaBarcode.disabled = !(hasAsalRows && hasTujuanRows); // prettier-ignore
        button_tambahTujuanKonversiTanpaBarcode.disabled = hasAsalRows;
    }

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
            pilihCustomer: [
                { element: select_kodeBarangTanpaBarcode, placeholder: "Pilih Kode Barang Tabel Hitungan" }, // prettier-ignore
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
            select_customerTanpaBarcode.select2({
                dropdownParent: $("#modalBodyTambahTujuanKonversiTanpaBarcode"),
                placeholder: "Pilih Customer",
            });
            select_kodeBarangTanpaBarcode.select2({
                dropdownParent: $("#modalBodyTambahTujuanKonversiTanpaBarcode"),
                placeholder: "Pilih KB Tabel Hitungan",
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
        } else if (tipeClearInput == "pilihIdTypeTujuan") {
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

    $("#tambahTujuanModalTanpaBarcode").on("shown.bs.modal", function (event) {
        table_daftarAsalKonversiTanpaBarcode.clear().draw(); //Clear Table
        table_daftarTujuanKonversiTanpaBarcode.clear().draw(); //Clear Table
        button_tambahTujuanKonversiTanpaBarcode.disabled = false;
        button_updateTujuanKonversiTanpaBarcode.disabled = true;
        button_hapusTujuanKonversiTanpaBarcode.disabled = true;
        button_tambahAsalKonversiTanpaBarcode.disabled = true;
        button_updateAsalKonversiTanpaBarcode.disabled = true;
        button_hapusAsalKonversiTanpaBarcode.disabled = true;
        button_modalProsesTanpaBarcode.disabled = true;

        document
            .querySelectorAll("#tambahTujuanModalTanpaBarcode input")
            .forEach((input) => {
                input.value = "";
                input.classList.remove("input-error");
                input.setCustomValidity("");
            });
        input_tanggalKonversiTanpaBarcode.valueAsDate = new Date();
        initializeSelectElement("showModal"); //Initialize all select element inside modal
        clearSelectElement("showModal");
        select_divisiTanpaBarcode.val(null).trigger("change"); // Clear selected index for select_divisi
        select_customerTanpaBarcode.val(null).trigger("change"); // Clear selected index for select_divisi
        select_kodeBarangTanpaBarcode.val(null).trigger("change"); // Clear selected index for select_divisi

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
            // if (currentElement.id === "jumlah_pemasukanTritierTanpaBarcode") {
            //     return button_tambahTujuanKonversiTanpaBarcode.disabled
            //         ? document.getElementById("button_updateTujuanKonversiTanpaBarcode") // prettier-ignore
            //         : document.getElementById("button_tambahTujuanKonversiTanpaBarcode"); // prettier-ignore
            // }
            // if (currentElement.id === "jumlah_pemakaianTritierTanpaBarcode") {
            //     return button_tambahAsalKonversiTanpaBarcode.disabled
            //         ? document.getElementById("button_updateAsalKonversiTanpaBarcode") // prettier-ignore
            //         : document.getElementById("button_tambahAsalKonversiTanpaBarcode"); // prettier-ignore
            // }

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
                element.readOnly = true;
            }
        });
    });

    closeModalButtonTanpaBarcode.addEventListener("click", function () {
        $("#tambahTujuanModalTanpaBarcode").modal("hide");
    });

    id_shiftTanpaBarcode.addEventListener("input", function (e) {
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
            this.setCustomValidity("Silahkan input [P]agi, [S]iang, atau [M]alam"); // prettier-ignore
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    group_TanpaBarcode.addEventListener("input", function (e) {
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
            this.setCustomValidity("Silahkan input group [A], [B], atau [C]"); // prettier-ignore
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    id_shiftTanpaBarcode.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (id_shiftTanpaBarcode.value == "") {
                id_shiftTanpaBarcode.classList.add("input-error");
            } else {
                this.classList.remove("input-error");
                group_TanpaBarcode.select();
            }
        }
    });

    group_TanpaBarcode.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (group_TanpaBarcode.value == "") {
                group_TanpaBarcode.classList.add("input-error");
            } else {
                this.classList.remove("input-error");
                select_divisiTanpaBarcode.select2("open");
            }
        }
    });

    input_tanggalKonversiTanpaBarcode.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                id_shiftTanpaBarcode.focus();
            }
        }
    );

    select_divisiTanpaBarcode.on("select2:select", function () {
        const selectedDivisiAsal = $(this).val(); // Get selected Divisi Asal
        clearSelectElement("pilihDivisi");

        // Fetch Objek based on selected Divisi
        $.ajax({
            url: "/KonversiRollBarcode/getObjek",
            method: "GET",
            data: { idDivisi: selectedDivisiAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Objek untuk divisi: " +
                            $("#select_divisiTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_objekAsalTanpaBarcode.append(
                            new Option(objek.NamaObjek, objek.IdObjek)
                        );
                        select_objekTujuanTanpaBarcode.append(
                            new Option(objek.NamaObjek, objek.IdObjek)
                        );
                    });
                    initializeSelectElement("pilihDivisi");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Objek data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_customerTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_customerTanpaBarcode.on("select2:select", function () {
        const selectedCustomer = $(this).val(); // Get selected Divisi Asal
        const idCust = selectedCustomer.split(" ")[1].trim();
        clearSelectElement("pilihCustomer");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getKodeBarangTabelHitungan",
            method: "GET",
            data: { idCust: idCust }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Kode Barang untuk Customer: " +
                            $("#select_customerTanpaBarcode option:selected").text(), // prettier-ignore
                    }).then(() => {
                        setTimeout(() => {
                            select_customerTanpaBarcode.select2("open");
                        }, 200);
                    });
                    return;
                } else {
                    data.forEach(function (kb) {
                        select_kodeBarangTanpaBarcode.append(
                            new Option(kb.Nama_brg, kb.id)
                        );
                    });
                    initializeSelectElement("pilihCustomer");
                    setTimeout(() => {
                        select_kodeBarangTanpaBarcode.select2("open");
                    }, 200);
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang data.",
                });
            },
        });
    });

    select_kodeBarangTanpaBarcode.on("select2:select", function () {
        const selectedKodeBarang = $(this).val(); // Get selected Divisi Asal

        // Fetch data detail Kode Barang based on selected Kode Barang
        $.ajax({
            url: "/KonversiRollBarcode/getDetailKodeBarangTabelHitunganADS",
            method: "GET",
            data: { idTabelHitungan: selectedKodeBarang }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Kode barang tidak ditemukan di tabel hitungan: " +
                            $("#select_kodeBarangTanpaBarcode option:selected").text(), // prettier-ignore
                    }).then(() => {
                        setTimeout(() => {
                            select_kodeBarangTanpaBarcode.select2("open");
                        }, 200);
                    });
                } else {
                    dataPanjangFlat = parseFloat(data[0].TopLength / 100);
                    setTimeout(() => {
                        select_objekTujuanTanpaBarcode.select2("open");
                    }, 200);
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Detail Kode Barang.",
                });
            },
        });
    });

    select_objekAsalTanpaBarcode.on("select2:select", function () {
        if (table_daftarTujuanKonversiTanpaBarcode.data().length < 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Silahkan tambah Tujuan konversi terlebih dahulu",
            });
            select_objekAsalTanpaBarcode.val(null).trigger("change");
            return;
        }
        const selectedObjekAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihObjekAsal");
        clearSelectElement("pilihObjekAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getKelompokUtama",
            method: "GET",
            data: { idObjek: selectedObjekAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokUtamaAsalTanpaBarcode.append(
                            new Option(
                                objek.NamaKelompokUtama,
                                objek.IdKelompokUtama
                            )
                        );
                    });
                    initializeSelectElement("pilihObjekAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokUtamaAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_objekTujuanTanpaBarcode.on("select2:select", function () {
        const selectedObjekTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihObjekTujuan");
        clearSelectElement("pilihObjekTujuan");
        clearSelectElement("pilihObjekAsal");
        clearInputTextElements("pilihIdTypeTujuan");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getKelompokUtama",
            method: "GET",
            data: { idObjek: selectedObjekTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekTujuanTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokUtamaTujuanTanpaBarcode.append(
                            new Option(
                                objek.NamaKelompokUtama,
                                objek.IdKelompokUtama
                            )
                        );
                    });
                    initializeSelectElement("pilihObjekTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokUtamaTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokUtamaAsalTanpaBarcode.on("select2:select", function () {
        const selectedKelompokUtamaAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihKelompokUtamaAsal");
        clearSelectElement("pilihKelompokUtamaAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getKelompok",
            method: "GET",
            data: { idKelompokUtama: selectedKelompokUtamaAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $("#select_kelompokUtamaAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokAsalTanpaBarcode.append(
                            new Option(objek.namakelompok, objek.idkelompok)
                        );
                    });
                    initializeSelectElement("pilihKelompokUtamaAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokUtamaTujuanTanpaBarcode.on("select2:select", function () {
        const selectedKelompokUtamaTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihKelompokUtamaTujuan");
        clearSelectElement("pilihKelompokUtamaTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getKelompok",
            method: "GET",
            data: { idKelompokUtama: selectedKelompokUtamaTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $("#select_kelompokUtamaTujuan option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokTujuanTanpaBarcode.append(
                            new Option(objek.namakelompok, objek.idkelompok)
                        );
                    });
                    initializeSelectElement("pilihKelompokUtamaTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokAsalTanpaBarcode.on("select2:select", function () {
        const selectedKelompokAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihKelompokAsal");
        clearSelectElement("pilihKelompokAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getSubKelompok",
            method: "GET",
            data: { idKelompok: selectedKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_subKelompokAsalTanpaBarcode.append(
                            new Option(
                                objek.NamaSubKelompok,
                                objek.IdSubkelompok
                            )
                        );
                    });
                    initializeSelectElement("pilihKelompokAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Sub Kelompok data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_subKelompokAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokTujuanTanpaBarcode.on("select2:select", function () {
        const selectedKelompokTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihKelompokTujuan");
        clearSelectElement("pilihKelompokTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getSubKelompok",
            method: "GET",
            data: { idKelompok: selectedKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokTujuanTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_subKelompokTujuanTanpaBarcode.append(
                            new Option(
                                objek.NamaSubKelompok,
                                objek.IdSubkelompok
                            )
                        );
                    });
                    initializeSelectElement("pilihKelompokTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Sub Kelompok data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_subKelompokTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_subKelompokAsalTanpaBarcode.on("select2:select", function () {
        const selectedSubKelompokAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihSubKelompokAsal");
        clearSelectElement("pilihSubKelompokAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getType",
            method: "GET",
            data: { idSubKelompok: selectedSubKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Type untuk Sub Kelompok: " +
                            $("#select_subKelompokAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_typeAsalTanpaBarcode.append(
                            new Option(objek.NamaType, objek.IdType)
                        );
                    });
                    initializeSelectElement("pilihSubKelompokAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_typeAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_subKelompokTujuanTanpaBarcode.on("select2:select", function () {
        const selectedSubKelompokTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihSubKelompokTujuan");
        clearSelectElement("pilihSubKelompokTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getType",
            method: "GET",
            data: { idSubKelompok: selectedSubKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Type untuk Sub Kelompok: " +
                            $("#select_subKelompokTujuanTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    if (select_kelompokUtamaTujuanTanpaBarcode.val() == 1029) {
                        let itemsAdded = false; // Track if any item is added
                        data.forEach(function (objek) {
                            luasTujuanBarangTanpaBarcode =
                                parseFloat(objek.LebarPotongan) *
                                parseFloat(objek.PanjangPotongan);

                            if (
                                luasAsalBarangTanpaBarcode >=
                                luasTujuanBarangTanpaBarcode
                            ) {
                                select_typeTujuanTanpaBarcode.append(
                                    new Option(objek.NamaType, objek.IdType)
                                );
                                itemsAdded = true;
                            }
                        });

                        if (!itemsAdded) {
                            Swal.fire({
                                icon: "warning",
                                title: "Perhatian",
                                text:
                                    "Tidak ukuran yang lebih kecil dari luas barang asal konversi: " +
                                    luasAsalBarangTanpaBarcode.toString() +
                                    " pada kelompok " +
                                    select_kelompokTujuan.options[
                                        select_kelompokTujuan.selectedIndex
                                    ].text,
                            }).then(() => {
                                select_kelompokTujuan.focus();
                                select_subKelompokTujuan.disabled = true;
                            });
                        } else {
                            select_subKelompokTujuan.focus();
                        }
                    } else {
                        data.forEach(function (objek) {
                            select_typeTujuanTanpaBarcode.append(
                                new Option(objek.NamaType, objek.IdType)
                            );
                        });
                    }
                    initializeSelectElement("pilihSubKelompokTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_typeTujuanTanpaBarcode.select2("open");
            }, 1000);
        });
    });

    select_typeAsalTanpaBarcode.on("select2:select", function () {
        const selectedIdType = $(this).val(); // Get selected Id Type
        cekSaldo = false;
        // Clear Input Text
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");
        table_daftarTujuanKonversiTanpaBarcode.rows().every(function () {
            const rowData = this.data();
            const firstColumnValue = rowData[0]; // Index starts from 0, so index 3 is the fourth column

            if (firstColumnValue == selectedIdType) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Id Type Asal dan Tujuan tidak boleh sama!",
                });
                return false; // Break the loop if a match is found
            }
        });
        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getDataType",
            method: "GET",
            data: { IdType: selectedIdType }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "Tidak ada Data Type untuk Id Type: " + $("#select_typeAsalTanpaBarcode option:selected").val(), // prettier-ignore
                    });
                } else {
                    luasAsalBarangTanpaBarcode = parseFloat(data[0].PanjangPotongan) * parseFloat(data[0].LebarPotongan); // prettier-ignore
                    if (
                        parseFloat(data[0].SaldoPrimer) > 0 ||
                        parseFloat(data[0].SaldoSekunder) > 0 ||
                        parseFloat(data[0].SaldoTritier) > 0
                    ) {
                        cekSaldo = true;
                        totalSekunderHasil = 0;
                        table_daftarTujuanKonversiTanpaBarcode
                            .rows()
                            .every(function () {
                                const data = this.data(); // array of row values

                                const idKelompok = data[8]; // 9th column (index 8) = Id Kelompok Utama
                                console.log(data);

                                if (idKelompok == "3252") {
                                    totalSekunderHasil +=
                                        parseFloat(data[4]) || 0; // Jumlah Pemasukan Sekunder
                                }
                            });
                        console.log("Total Sekunder Hasil: " + totalSekunderHasil); // prettier-ignore
                        console.log("Panjang Flat: " + dataPanjangFlat);
                        saldo_terakhirPrimerAsalTanpaBarcode.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirPrimerAsalTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                        saldo_terakhirSekunderAsalTanpaBarcode.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirSekunderAsalTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                        saldo_terakhirTritierAsalTanpaBarcode.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirTritierAsalTanpaBarcode.value =data[0].satTritier.trim(); // prettier-ignore
                        satuan_primerJumlahPemakaianTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                        jumlah_pemakaianPrimerTanpaBarcode.value = 0;
                        satuan_sekunderJumlahPemakaianTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                        jumlah_pemakaianSekunderTanpaBarcode.value = parseFloat(totalSekunderHasil / dataPanjangFlat).toFixed(2); // prettier-ignore
                        satuan_tritierJumlahPemakaianTanpaBarcode.value = data[0].satTritier.trim(); // prettier-ignore
                        jumlah_pemakaianTritierTanpaBarcode.value = 0;
                    } else {
                        cekSaldo = false;
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Tidak ada saldo untuk Type ini",
                            showConfirmButton: false,
                            timer: 1000, // Auto-close after 1.5 seconds (optional)
                        }).then(() => {
                            select_typeAsalTanpaBarcode.val(null).trigger("change"); // prettier-ignore
                            select_typeAsalTanpaBarcode.select2("open");
                            jumlah_pemakaianPrimerTanpaBarcode.value = "";
                            jumlah_pemakaianSekunderTanpaBarcode.value = "";
                            jumlah_pemakaianTritierTanpaBarcode.value = "";
                        });
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        }).then(() => {
            if (cekSaldo) {
                // Handle jumlah_pemakaianPrimer read-only and value setting
                if (
                    satuan_primerJumlahPemakaianTanpaBarcode.value &&
                    satuan_primerJumlahPemakaianTanpaBarcode.value !== "NULL"
                ) {
                    jumlah_pemakaianPrimerTanpaBarcode.readOnly = false;
                } else {
                    jumlah_pemakaianPrimerTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                    jumlah_pemakaianPrimerTanpaBarcode.readOnly = true;
                }
                // Handle jumlah_pemakaianSekunder read-only and value setting
                if (
                    satuan_sekunderJumlahPemakaianTanpaBarcode.value &&
                    satuan_sekunderJumlahPemakaianTanpaBarcode.value !== "NULL"
                ) {
                    jumlah_pemakaianSekunderTanpaBarcode.readOnly = false;
                } else {
                    jumlah_pemakaianSekunderTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                    jumlah_pemakaianSekunderTanpaBarcode.readOnly = true;
                }
                jumlah_pemakaianTritierTanpaBarcode.readOnly = false;

                // Set focus based on read-only status
                jumlah_pemakaianPrimerTanpaBarcode.readOnly
                    ? jumlah_pemakaianSekunderTanpaBarcode.readOnly
                        ? jumlah_pemakaianTritierTanpaBarcode.focus()
                        : jumlah_pemakaianSekunderTanpaBarcode.focus()
                    : jumlah_pemakaianPrimerTanpaBarcode.focus();
            } else {
                setTimeout(() => {
                    select_typeAsalTanpaBarcode.select2("open");
                }, 1000);
            }
        });
    });

    select_typeTujuanTanpaBarcode.on("select2:select", function () {
        const selectedIdType = $(this).val(); // Get selected Id Type
        // Clear Input Text
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");
        // if (table_daftarAsalKonversiTanpaBarcode.data().length < 1) {
        //     Swal.fire({
        //         icon: "info",
        //         title: "Pemberitahuan",
        //         showConfirmButton: false,
        //         timer: 1000, // Auto-close after 1.5 seconds (optional)
        //         text: "Asal konversi harus diisi dulu!",
        //     });
        //     return false;
        // } else {
        //     table_daftarAsalKonversiTanpaBarcode.rows().every(function () {
        //         const rowData = this.data();
        //         const firstColumnValue = rowData[0]; // Index starts from 0, so index 3 is the fourth column

        //         if (firstColumnValue == selectedIdType) {
        //             Swal.fire({
        //                 icon: "info",
        //                 title: "Pemberitahuan",
        //                 showConfirmButton: false,
        //                 timer: 1000, // Auto-close after 1.5 seconds (optional)
        //                 text: "Id Type Asal dan Tujuan tidak boleh sama!",
        //             });
        //             return false; // Break the loop if a match is found
        //         }
        //     });
        // }
        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiRollBarcode/getDataType",
            method: "GET",
            data: { IdType: selectedIdType }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "Tidak ada Data Type untuk Id Type: " + $("#select_typeTujuanTanpaBarcode option:selected").val(), // prettier-ignore
                    });
                } else {
                    saldo_terakhirPrimerTujuanTanpaBarcode.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirPrimerTujuanTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                    saldo_terakhirSekunderTujuanTanpaBarcode.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirSekunderTujuanTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                    saldo_terakhirTritierTujuanTanpaBarcode.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirTritierTujuanTanpaBarcode.value =data[0].satTritier.trim(); // prettier-ignore
                    satuan_primerJumlahPemasukanTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                    satuan_sekunderJumlahPemasukanTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                    satuan_tritierJumlahPemasukanTanpaBarcode.value = data[0].satTritier.trim(); // prettier-ignore

                    // Handle jumlah_pemakaianPrimer read-only and value setting
                    if (
                        satuan_primerJumlahPemasukanTanpaBarcode.value &&
                        satuan_primerJumlahPemasukanTanpaBarcode.value !== "NULL" // prettier-ignore
                    ) {
                        jumlah_pemasukanPrimerTanpaBarcode.readOnly = false;
                    } else {
                        jumlah_pemasukanPrimerTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                        jumlah_pemasukanPrimerTanpaBarcode.readOnly = true;
                    }
                    // Handle jumlah_pemakaianSekunder read-only and value setting
                    if (
                        satuan_sekunderJumlahPemasukanTanpaBarcode.value &&
                        satuan_sekunderJumlahPemasukanTanpaBarcode.value !== "NULL" // prettier-ignore
                    ) {
                        jumlah_pemasukanSekunderTanpaBarcode.readOnly = false;
                    } else {
                        jumlah_pemasukanSekunderTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                        jumlah_pemasukanSekunderTanpaBarcode.readOnly = true;
                    }
                    jumlah_pemasukanTritierTanpaBarcode.readOnly = false;

                    // Set focus based on read-only status
                    jumlah_pemasukanPrimerTanpaBarcode.readOnly
                        ? jumlah_pemasukanSekunderTanpaBarcode.readOnly
                            ? jumlah_pemasukanTritierTanpaBarcode.focus()
                            : jumlah_pemasukanSekunderTanpaBarcode.focus()
                        : jumlah_pemasukanPrimerTanpaBarcode.focus();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        });
    });

    button_tambahAsalKonversiTanpaBarcode.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            if (!select_typeAsalTanpaBarcode.val()) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Asal Konversi tidak boleh kosong!",
                }).then(() => {
                    select_objekAsalTanpaBarcode.select2("open");
                });
                return false;
            }

            // check quantity asal konversi, apakah sesuai ketentuan
            if (
                (jumlah_pemakaianPrimerTanpaBarcode.value == 0 && jumlah_pemakaianSekunderTanpaBarcode.value == 0 && jumlah_pemakaianTritierTanpaBarcode.value == 0) ||
                (jumlah_pemakaianTritierTanpaBarcode.value == 0 && satuan_tritierJumlahPemakaianTanpaBarcode.value.trim() == satuan_saldoTerakhirTritierAsalTanpaBarcode.value.trim())
            ) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Quantity Asal Konversi tidak boleh kosong!",
                }).then(() => {
                    jumlah_pemakaianTritierTanpaBarcode.select();
                });
                return false;
            } // prettier-ignore

            // Array to store the input values
            let inputData = [
                select_typeAsalTanpaBarcode.val(),
                select_typeAsalTanpaBarcode.select2("data")[0].text.trim(), // prettier-ignore
                jumlah_pemakaianPrimerTanpaBarcode.value,
                satuan_primerJumlahPemakaianTanpaBarcode.value,
                jumlah_pemakaianSekunderTanpaBarcode.value,
                satuan_sekunderJumlahPemakaianTanpaBarcode.value,
                jumlah_pemakaianTritierTanpaBarcode.value,
                satuan_tritierJumlahPemakaianTanpaBarcode.value,
                select_subKelompokAsalTanpaBarcode.val(),
            ];

            let existsTabelAsal = table_daftarAsalKonversiTanpaBarcode
                .column(0)
                .data()
                .toArray()
                .some((value) => value == select_typeAsalTanpaBarcode.val());

            let existsTabelTujuan = table_daftarTujuanKonversiTanpaBarcode
                .column(0)
                .data()
                .toArray()
                .some((value) => value == select_typeAsalTanpaBarcode.val());

            if (existsTabelAsal || existsTabelTujuan) {
                // Id type Asal dan Tujuan tidak boleh sama
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Id Type Asal dan Tujuan tidak boleh sama!",
                });
                return false;
            } else {
                // Add a new row with all input data to the DataTable
                table_daftarAsalKonversiTanpaBarcode.row.add(inputData);

                const selectIds = [
                    "#select_kelompokUtamaAsalTanpaBarcode",
                    "#select_kelompokAsalTanpaBarcode",
                    "#select_subKelompokAsalTanpaBarcode",
                    "#select_typeAsalTanpaBarcode",
                ];
                const inputTextIds = [
                    "#saldo_terakhirPrimerAsalTanpaBarcode",
                    "#satuan_saldoTerakhirPrimerAsalTanpaBarcode",
                    "#saldo_terakhirSekunderAsalTanpaBarcode",
                    "#satuan_saldoTerakhirSekunderAsalTanpaBarcode",
                    "#saldo_terakhirTritierAsalTanpaBarcode",
                    "#satuan_saldoTerakhirTritierAsalTanpaBarcode",
                    "#jumlah_pemakaianPrimerTanpaBarcode",
                    "#satuan_primerJumlahPemakaianTanpaBarcode",
                    "#jumlah_pemakaianSekunderTanpaBarcode",
                    "#satuan_sekunderJumlahPemakaianTanpaBarcode",
                    "#jumlah_pemakaianTritierTanpaBarcode",
                    "#satuan_tritierJumlahPemakaianTanpaBarcode",
                ];
                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());

                    if (id !== "#select_divisiAsalTanpaBarcode") {
                        $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                    }
                });

                select_objekAsalTanpaBarcode.val(null).trigger("change");
                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                table_daftarAsalKonversiTanpaBarcode.draw();
                cekRowTable(); // untuk disable dan enable button proses
            }
        }
    );

    button_updateAsalKonversiTanpaBarcode.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            if (!select_typeAsalTanpaBarcode.val()) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Asal Konversi tidak boleh kosong!",
                }).then(() => {
                    select_objekAsalTanpaBarcode.select2("open");
                });
                return false;
            }

            // check quantity Asal konversi, apakah sesuai ketentuan
            if (
                (jumlah_pemakaianPrimerTanpaBarcode.value == 0 &&
                    jumlah_pemakaianSekunderTanpaBarcode.value == 0 &&
                    jumlah_pemakaianTritierTanpaBarcode.value == 0) ||
                (jumlah_pemakaianTritierTanpaBarcode.value == 0 &&
                    satuan_tritierJumlahPemakaianTanpaBarcode.value.trim() ==
                        satuan_saldoTerakhirTritierAsalTanpaBarcode.value.trim())
            ) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Quantity Asal Konversi tidak boleh kosong!",
                }).then(() => {
                    jumlah_pemakaianTritierTanpaBarcode.select();
                });
                return false;
            }

            const unselectedRowsTabelAsal = table_daftarAsalKonversiTanpaBarcode
                .rows(function (idx, data, node) {
                    return !$(node).hasClass("selected");
                })
                .data()
                .toArray();

            let existsInUnselectedTabelAsal = unselectedRowsTabelAsal.some(
                (row) => row[0] == select_typeAsalTanpaBarcode.val()
            );

            let existsTabelTujuan = table_daftarTujuanKonversiTanpaBarcode
                .column(0)
                .data()
                .toArray()
                .some((value) => value == select_typeAsalTanpaBarcode.val());

            if (existsTabelTujuan || existsInUnselectedTabelAsal) {
                // Id type Asal dan Tujuan tidak boleh sama
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Id Type sudah pernah diinput!",
                });
                return false;
            } else {
                let inputData = [
                    select_typeAsalTanpaBarcode.val(),
                    select_typeAsalTanpaBarcode.select2("data")[0].text.trim(), // prettier-ignore
                    jumlah_pemakaianPrimerTanpaBarcode.value,
                    satuan_primerJumlahPemakaianTanpaBarcode.value,
                    jumlah_pemakaianSekunderTanpaBarcode.value,
                    satuan_sekunderJumlahPemakaianTanpaBarcode.value,
                    jumlah_pemakaianTritierTanpaBarcode.value,
                    satuan_tritierJumlahPemakaianTanpaBarcode.value,
                    select_subKelompokAsalTanpaBarcode.val(),
                ];
                const selectedRow = table_daftarAsalKonversiTanpaBarcode.row(".selected"); // prettier-ignore

                if (selectedRow.any()) {
                    // Update the selected row with the new data
                    selectedRow.data(inputData).draw();
                } else {
                    Swal.fire(
                        "Pemberitahuan",
                        "Pilih baris yang ingin diubah",
                        "info"
                    );
                }
                const selectIds = [
                    "#select_kelompokUtamaAsalTanpaBarcode",
                    "#select_kelompokAsalTanpaBarcode",
                    "#select_subKelompokAsalTanpaBarcode",
                    "#select_typeAsalTanpaBarcode",
                ];
                const inputTextIds = [
                    "#saldo_terakhirPrimerAsalTanpaBarcode",
                    "#satuan_saldoTerakhirPrimerAsalTanpaBarcode",
                    "#saldo_terakhirSekunderAsalTanpaBarcode",
                    "#satuan_saldoTerakhirSekunderAsalTanpaBarcode",
                    "#saldo_terakhirTritierAsalTanpaBarcode",
                    "#satuan_saldoTerakhirTritierAsalTanpaBarcode",
                    "#jumlah_pemakaianPrimerTanpaBarcode",
                    "#satuan_primerJumlahPemakaianTanpaBarcode",
                    "#jumlah_pemakaianSekunderTanpaBarcode",
                    "#satuan_sekunderJumlahPemakaianTanpaBarcode",
                    "#jumlah_pemakaianTritierTanpaBarcode",
                    "#satuan_tritierJumlahPemakaianTanpaBarcode",
                ];
                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                });

                select_objekAsalTanpaBarcode.val(null).trigger("change");
                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                table_daftarAsalKonversiTanpaBarcode.draw();
            }

            // Remove the 'selected' class from any previously selected row
            $("#table_daftarAsalKonversiTanpaBarcode tbody tr").removeClass("selected"); // prettier-ignore
            button_updateAsalKonversiTanpaBarcode.disabled = true;
            button_hapusAsalKonversiTanpaBarcode.disabled = true;
            cekRowTable();
        }
    );

    button_hapusAsalKonversiTanpaBarcode.addEventListener(
        "click",
        function (e) {
            e.preventDefault();

            // Get the selected row index
            const selectedRow = table_daftarAsalKonversiTanpaBarcode.row(".selected"); // prettier-ignore

            if (selectedRow.any()) {
                // Use Swal.fire for confirmation
                Swal.fire({
                    title: "Are you sure?",
                    text: "Do you really want to delete the selected row?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, keep it",
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            // If user confirms, delete the selected row
                            selectedRow.remove().draw(false);
                            select_objekAsalTanpaBarcode.val(null).trigger("change"); // prettier-ignore
                            const selectIds = [
                                "#select_kelompokUtamaAsalTanpaBarcode",
                                "#select_kelompokAsalTanpaBarcode",
                                "#select_subKelompokAsalTanpaBarcode",
                                "#select_typeAsalTanpaBarcode",
                            ];
                            const inputTextIds = [
                                "#saldo_terakhirPrimerAsalTanpaBarcode",
                                "#satuan_saldoTerakhirPrimerAsalTanpaBarcode",
                                "#saldo_terakhirSekunderAsalTanpaBarcode",
                                "#satuan_saldoTerakhirSekunderAsalTanpaBarcode",
                                "#saldo_terakhirTritierAsalTanpaBarcode",
                                "#satuan_saldoTerakhirTritierAsalTanpaBarcode",
                                "#jumlah_pemakaianPrimerTanpaBarcode",
                                "#satuan_primerJumlahPemakaianTanpaBarcode",
                                "#jumlah_pemakaianSekunderTanpaBarcode",
                                "#satuan_sekunderJumlahPemakaianTanpaBarcode",
                                "#jumlah_pemakaianTritierTanpaBarcode",
                                "#satuan_tritierJumlahPemakaianTanpaBarcode",
                            ];
                            selectIds.forEach((id) => {
                                const $select = $(id);
                                // Select the disabled option
                                $select.val(
                                    $select.find("option[disabled]").val()
                                );
                                // $select.prop("disabled", true);
                                $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                            });

                            // Clear all input text fields
                            inputTextIds.forEach((id) => {
                                $(id).val("");
                            });

                            // Remove the 'selected' class from any previously selected row
                            $("#table_daftarAsalKonversiTanpaBarcode tbody tr").removeClass("selected"); // prettier-ignore

                            cekRowTable(); // untuk disable dan enable button proses

                            // Force the table to refresh its internal data
                            table_daftarAsalKonversiTanpaBarcode.rows().draw(); // prettier-ignore

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
                    })
                    .then(() => {
                        button_tambahAsalKonversiTanpaBarcode.disabled = false;
                        button_updateAsalKonversiTanpaBarcode.disabled = true;
                        button_hapusAsalKonversiTanpaBarcode.disabled = true;
                        cekRowTable();
                    });
            } else {
                Swal.fire(
                    "Pemberitahuan",
                    "Pilih baris yang ingin dihapus.",
                    "info"
                );
            }
        }
    );

    button_tambahTujuanKonversiTanpaBarcode.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            if (!select_typeTujuanTanpaBarcode.val()) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Tujuan Konversi tidak boleh kosong!",
                }).then(() => {
                    select_objekTujuanTanpaBarcode.select2("open");
                });
                return false;
            }

            // check quantity tujuan konversi, apakah sesuai ketentuan
            if (
                (jumlah_pemasukanPrimerTanpaBarcode.value == 0 &&
                    jumlah_pemasukanSekunderTanpaBarcode.value == 0 &&
                    jumlah_pemasukanTritierTanpaBarcode.value == 0) ||
                (jumlah_pemasukanTritierTanpaBarcode.value == 0 &&
                    satuan_tritierJumlahPemasukanTanpaBarcode.value.trim() ==
                        satuan_saldoTerakhirTritierTujuanTanpaBarcode.value.trim())
            ) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Quantity Tujuan Konversi tidak boleh kosong!",
                }).then(() => {
                    jumlah_pemasukanTritierTanpaBarcode.select();
                });
                return false;
            }

            // Array to store the input values
            let inputData = [
                select_typeTujuanTanpaBarcode.val(),
                select_typeTujuanTanpaBarcode.select2("data")[0].text.trim(), // prettier-ignore
                jumlah_pemasukanPrimerTanpaBarcode.value,
                satuan_primerJumlahPemasukanTanpaBarcode.value,
                jumlah_pemasukanSekunderTanpaBarcode.value,
                satuan_sekunderJumlahPemasukanTanpaBarcode.value,
                jumlah_pemasukanTritierTanpaBarcode.value,
                satuan_tritierJumlahPemasukanTanpaBarcode.value,
                select_kelompokUtamaTujuanTanpaBarcode.val(),
            ];

            let existsTabelAsal = table_daftarAsalKonversiTanpaBarcode
                .column(0)
                .data()
                .toArray()
                .some((value) => value == select_typeTujuanTanpaBarcode.val());

            let existsTabelTujuan = table_daftarTujuanKonversiTanpaBarcode
                .column(0)
                .data()
                .toArray()
                .some((value) => value == select_typeTujuanTanpaBarcode.val());

            if (existsTabelAsal || existsTabelTujuan) {
                // Id type Asal dan Tujuan tidak boleh sama
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Id Type sudah pernah diinput!",
                });
                return false;
            } else {
                // Add a new row with all input data to the DataTable
                table_daftarTujuanKonversiTanpaBarcode.row.add(inputData);

                const selectIds = [
                    "#select_kelompokUtamaTujuanTanpaBarcode",
                    "#select_kelompokTujuanTanpaBarcode",
                    "#select_subKelompokTujuanTanpaBarcode",
                    "#select_typeTujuanTanpaBarcode",
                ];
                const inputTextIds = [
                    "#saldo_terakhirPrimerTujuanTanpaBarcode",
                    "#satuan_saldoTerakhirPrimerTujuanTanpaBarcode",
                    "#saldo_terakhirSekunderTujuanTanpaBarcode",
                    "#satuan_saldoTerakhirSekunderTujuanTanpaBarcode",
                    "#saldo_terakhirTritierTujuanTanpaBarcode",
                    "#satuan_saldoTerakhirTritierTujuanTanpaBarcode",
                    "#jumlah_pemasukanPrimerTanpaBarcode",
                    "#satuan_primerJumlahPemasukanTanpaBarcode",
                    "#jumlah_pemasukanSekunderTanpaBarcode",
                    "#satuan_sekunderJumlahPemasukanTanpaBarcode",
                    "#jumlah_pemasukanTritierTanpaBarcode",
                    "#satuan_tritierJumlahPemasukanTanpaBarcode",
                ];
                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                });

                select_objekTujuanTanpaBarcode.val(null).trigger("change");
                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                table_daftarTujuanKonversiTanpaBarcode.draw();
                cekRowTable(); // untuk disable dan enable button proses
            }
        }
    );

    button_updateTujuanKonversiTanpaBarcode.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            if (!select_typeTujuanTanpaBarcode.val()) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Tujuan Konversi tidak boleh kosong!",
                }).then(() => {
                    select_objekTujuanTanpaBarcode.select2("open");
                });
                return false;
            }

            // check quantity Tujuan konversi, apakah sesuai ketentuan
            if (
                (jumlah_pemasukanPrimerTanpaBarcode.value == 0 &&
                    jumlah_pemasukanSekunderTanpaBarcode.value == 0 &&
                    jumlah_pemasukanTritierTanpaBarcode.value == 0) ||
                (jumlah_pemasukanTritierTanpaBarcode.value == 0 &&
                    satuan_tritierJumlahPemasukanTanpaBarcode.value.trim() ==
                        satuan_saldoTerakhirTritierTujuanTanpaBarcode.value.trim())
            ) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Quantity Tujuan Konversi tidak boleh kosong!",
                }).then(() => {
                    jumlah_pemasukanTritierTanpaBarcode.select();
                });
                return false;
            }

            const unselectedRowsTabelTujuan =
                table_daftarTujuanKonversiTanpaBarcode
                    .rows(function (idx, data, node) {
                        return !$(node).hasClass("selected");
                    })
                    .data()
                    .toArray();

            let existsInUnselectedTabelTujuan = unselectedRowsTabelTujuan.some(
                (row) => row[0] == select_typeTujuanTanpaBarcode.val()
            );

            let existsTabelAsal = table_daftarAsalKonversiTanpaBarcode
                .column(0)
                .data()
                .toArray()
                .some((value) => value == select_typeTujuanTanpaBarcode.val());

            if (existsTabelAsal || existsInUnselectedTabelTujuan) {
                // Id type Asal dan Tujuan tidak boleh sama
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Id Type sudah pernah diinput!",
                });
                return false;
            } else {
                let inputData = [
                    select_typeTujuanTanpaBarcode.val(),
                    select_typeTujuanTanpaBarcode.select2("data")[0].text.trim(), // prettier-ignore
                    jumlah_pemasukanPrimerTanpaBarcode.value,
                    satuan_primerJumlahPemasukanTanpaBarcode.value,
                    jumlah_pemasukanSekunderTanpaBarcode.value,
                    satuan_sekunderJumlahPemasukanTanpaBarcode.value,
                    jumlah_pemasukanTritierTanpaBarcode.value,
                    satuan_tritierJumlahPemasukanTanpaBarcode.value,
                    select_subKelompokTujuanTanpaBarcode.val(),
                ];
                const selectedRow = table_daftarTujuanKonversiTanpaBarcode.row(".selected"); // prettier-ignore

                if (selectedRow.any()) {
                    // Update the selected row with the new data
                    selectedRow.data(inputData).draw();
                } else {
                    Swal.fire(
                        "Pemberitahuan",
                        "Pilih baris yang ingin diubah",
                        "info"
                    );
                }
                const selectIds = [
                    "#select_kelompokUtamaTujuanTanpaBarcode",
                    "#select_kelompokTujuanTanpaBarcode",
                    "#select_subKelompokTujuanTanpaBarcode",
                    "#select_typeTujuanTanpaBarcode",
                ];
                const inputTextIds = [
                    "#saldo_terakhirPrimerTujuanTanpaBarcode",
                    "#satuan_saldoTerakhirPrimerTujuanTanpaBarcode",
                    "#saldo_terakhirSekunderTujuanTanpaBarcode",
                    "#satuan_saldoTerakhirSekunderTujuanTanpaBarcode",
                    "#saldo_terakhirTritierTujuanTanpaBarcode",
                    "#satuan_saldoTerakhirTritierTujuanTanpaBarcode",
                    "#jumlah_pemasukanPrimerTanpaBarcode",
                    "#satuan_primerJumlahPemasukanTanpaBarcode",
                    "#jumlah_pemasukanSekunderTanpaBarcode",
                    "#satuan_sekunderJumlahPemasukanTanpaBarcode",
                    "#jumlah_pemasukanTritierTanpaBarcode",
                    "#satuan_tritierJumlahPemasukanTanpaBarcode",
                ];
                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                });

                select_objekTujuanTanpaBarcode.val(null).trigger("change");
                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                table_daftarTujuanKonversiTanpaBarcode.draw();
            }

            // Remove the 'selected' class from any previously selected row
            $("#table_daftarTujuanKonversiTanpaBarcode tbody tr").removeClass("selected"); // prettier-ignore
            button_updateTujuanKonversiTanpaBarcode.disabled = true;
            button_hapusTujuanKonversiTanpaBarcode.disabled = true;
            cekRowTable();
        }
    );

    button_hapusTujuanKonversiTanpaBarcode.addEventListener(
        "click",
        function (e) {
            e.preventDefault();

            // Get the selected row index
            const selectedRow = table_daftarTujuanKonversiTanpaBarcode.row(".selected"); // prettier-ignore

            if (selectedRow.any()) {
                // Use Swal.fire for confirmation
                Swal.fire({
                    title: "Are you sure?",
                    text: "Do you really want to delete the selected row?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, keep it",
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            // If user confirms, delete the selected row
                            selectedRow.remove().draw(false);
                            select_objekTujuanTanpaBarcode.val(null).trigger("change"); // prettier-ignore
                            const selectIds = [
                                "#select_kelompokUtamaTujuanTanpaBarcode",
                                "#select_kelompokTujuanTanpaBarcode",
                                "#select_subKelompokTujuanTanpaBarcode",
                                "#select_typeTujuanTanpaBarcode",
                            ];
                            const inputTextIds = [
                                "#saldo_terakhirPrimerTujuanTanpaBarcode",
                                "#satuan_saldoTerakhirPrimerTujuanTanpaBarcode",
                                "#saldo_terakhirSekunderTujuanTanpaBarcode",
                                "#satuan_saldoTerakhirSekunderTujuanTanpaBarcode",
                                "#saldo_terakhirTritierTujuanTanpaBarcode",
                                "#satuan_saldoTerakhirTritierTujuanTanpaBarcode",
                                "#jumlah_pemasukanPrimerTanpaBarcode",
                                "#satuan_primerJumlahPemasukanTanpaBarcode",
                                "#jumlah_pemasukanSekunderTanpaBarcode",
                                "#satuan_sekunderJumlahPemasukanTanpaBarcode",
                                "#jumlah_pemasukanTritierTanpaBarcode",
                                "#satuan_tritierJumlahPemasukanTanpaBarcode",
                            ];
                            selectIds.forEach((id) => {
                                const $select = $(id);
                                // Select the disabled option
                                $select.val(
                                    $select.find("option[disabled]").val()
                                );
                                $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                            });

                            // Clear all input text fields
                            inputTextIds.forEach((id) => {
                                $(id).val("");
                            });

                            // Remove the 'selected' class from any previously selected row
                            $("#table_daftarTujuanKonversiTanpaBarcode tbody tr").removeClass("selected"); // prettier-ignore

                            cekRowTable(); // untuk disable dan enable button proses

                            // Force the table to refresh its internal data
                            table_daftarAsalKonversiTanpaBarcode.rows().draw(); // prettier-ignore

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
                    })
                    .then(() => {
                        button_updateTujuanKonversiTanpaBarcode.disabled = true;
                        button_hapusTujuanKonversiTanpaBarcode.disabled = true;
                        cekRowTable();
                    });
            } else {
                Swal.fire(
                    "Pemberitahuan",
                    "Pilih baris yang ingin dihapus.",
                    "info"
                );
            }
        }
    );

    // jumlah_pemasukanTritierTanpaBarcode.addEventListener("input", function (e) {
    //     let inputValue = parseFloat(e.target.value);

    // });

    $("#table_daftarAsalKonversiTanpaBarcode tbody").on(
        "click",
        "tr",
        function () {
            // Remove the 'selected' class from any previously selected row
            $("#table_daftarAsalKonversiTanpaBarcode tbody tr").removeClass("selected"); // prettier-ignore

            // Get data from the clicked row
            var data = table_daftarAsalKonversiTanpaBarcode.row(this).data();

            // Add the 'selected' class to the clicked row
            if (data) {
                $(this).addClass("selected");
            } else {
                return;
            }

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
                            console.log(response);

                            // Select the newly added option
                            select_objekAsalTanpaBarcode
                                .val(response[0].IdObjek)
                                .trigger("change");

                            select_kelompokUtamaAsalTanpaBarcode.append(
                                new Option(
                                    response[0].NamaKelompokUtama,
                                    response[0].IdKelompokUtama
                                )
                            );

                            select_kelompokUtamaAsalTanpaBarcode
                                .val(response[0].IdKelompokUtama)
                                .trigger("change");

                            select_kelompokAsalTanpaBarcode.append(
                                new Option(
                                    response[0].NamaKelompok,
                                    response[0].IdKelompok
                                )
                            );

                            select_kelompokAsalTanpaBarcode
                                .val(response[0].IdKelompok)
                                .trigger("change");

                            select_subKelompokAsalTanpaBarcode.append(
                                new Option(
                                    response[0].NamaSubKelompok,
                                    response[0].IdSubkelompok
                                )
                            );

                            select_subKelompokAsalTanpaBarcode
                                .val(response[0].IdSubkelompok)
                                .trigger("change");

                            select_typeAsalTanpaBarcode.append(
                                new Option(data[1], data[0])
                            );

                            select_typeAsalTanpaBarcode
                                .val(data[0])
                                .trigger("change");

                            jumlah_pemakaianPrimerTanpaBarcode.value = data[2];
                            satuan_primerJumlahPemakaianTanpaBarcode.value = data[3].trim(); // prettier-ignore
                            jumlah_pemakaianSekunderTanpaBarcode.value = data[4]; // prettier-ignore
                            satuan_sekunderJumlahPemakaianTanpaBarcode.value = data[5].trim(); // prettier-ignore
                            jumlah_pemakaianTritierTanpaBarcode.value = data[6];
                            satuan_tritierJumlahPemakaianTanpaBarcode.value = data[7].trim(); // prettier-ignore
                            saldo_terakhirPrimerAsalTanpaBarcode.value = numeral(response[0].SaldoPrimer).format("0.00"); // prettier-ignore
                            satuan_saldoTerakhirPrimerAsalTanpaBarcode.value = response[0].satPrimer.trim(); // prettier-ignore
                            saldo_terakhirSekunderAsalTanpaBarcode.value = numeral(response[0].SaldoSekunder).format("0.00"); // prettier-ignore
                            satuan_saldoTerakhirSekunderAsalTanpaBarcode.value = response[0].satSekunder.trim(); // prettier-ignore
                            saldo_terakhirTritierAsalTanpaBarcode.value = numeral(response[0].SaldoTritier).format("0.00"); // prettier-ignore
                            satuan_saldoTerakhirTritierAsalTanpaBarcode.value = response[0].satTritier.trim(); // prettier-ignore
                            button_tambahAsalKonversiTanpaBarcode.disabled = true;
                            button_hapusAsalKonversiTanpaBarcode.disabled = false;
                            button_updateAsalKonversiTanpaBarcode.disabled = false;
                            jumlah_pemakaianPrimerTanpaBarcode.readOnly = false;
                            jumlah_pemakaianSekunderTanpaBarcode.readOnly = false;
                            jumlah_pemakaianTritierTanpaBarcode.readOnly = false;
                            jumlah_pemakaianPrimerTanpaBarcode.select();
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
                    "Terjadi kesalahan saat load table asal konversi, hubungi EDP!"
                );
            }
        }
    );

    $("#table_daftarTujuanKonversiTanpaBarcode tbody").on(
        "click",
        "tr",
        function () {
            // Remove the 'selected' class from any previously selected row
            $("#table_daftarTujuanKonversiTanpaBarcode tbody tr").removeClass("selected"); // prettier-ignore

            // Get data from the clicked row
            var data = table_daftarTujuanKonversiTanpaBarcode.row(this).data();

            // Add the 'selected' class to the clicked row
            if (
                data &&
                table_daftarAsalKonversiTanpaBarcode.data().length < 1
            ) {
                $(this).addClass("selected");
            } else {
                return;
            }

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
                            console.log(response);

                            // Select the newly added option
                            select_objekTujuanTanpaBarcode
                                .val(response[0].IdObjek)
                                .trigger("change");

                            select_kelompokUtamaTujuanTanpaBarcode.append(
                                new Option(
                                    response[0].NamaKelompokUtama,
                                    response[0].IdKelompokUtama
                                )
                            );

                            select_kelompokUtamaTujuanTanpaBarcode
                                .val(response[0].IdKelompokUtama)
                                .trigger("change");

                            select_kelompokTujuanTanpaBarcode.append(
                                new Option(
                                    response[0].NamaKelompok,
                                    response[0].IdKelompok
                                )
                            );

                            select_kelompokTujuanTanpaBarcode
                                .val(response[0].IdKelompok)
                                .trigger("change");

                            select_subKelompokTujuanTanpaBarcode.append(
                                new Option(
                                    response[0].NamaSubKelompok,
                                    response[0].IdSubkelompok
                                )
                            );

                            select_subKelompokTujuanTanpaBarcode
                                .val(response[0].IdSubkelompok)
                                .trigger("change");

                            select_typeTujuanTanpaBarcode.append(
                                new Option(data[1], data[0])
                            );

                            select_typeTujuanTanpaBarcode
                                .val(data[0])
                                .trigger("change");

                            jumlah_pemasukanPrimerTanpaBarcode.value = data[2];
                            satuan_primerJumlahPemasukanTanpaBarcode.value = data[3].trim(); // prettier-ignore
                            jumlah_pemasukanSekunderTanpaBarcode.value = data[4]; // prettier-ignore
                            satuan_sekunderJumlahPemasukanTanpaBarcode.value = data[5].trim(); // prettier-ignore
                            jumlah_pemasukanTritierTanpaBarcode.value = data[6];
                            satuan_tritierJumlahPemasukanTanpaBarcode.value = data[7].trim(); // prettier-ignore
                            saldo_terakhirPrimerTujuanTanpaBarcode.value = numeral(response[0].SaldoPrimer).format("0.00"); // prettier-ignore
                            satuan_saldoTerakhirPrimerTujuanTanpaBarcode.value = response[0].satPrimer.trim(); // prettier-ignore
                            saldo_terakhirSekunderTujuanTanpaBarcode.value = numeral(response[0].SaldoSekunder).format("0.00"); // prettier-ignore
                            satuan_saldoTerakhirSekunderTujuanTanpaBarcode.value = response[0].satSekunder.trim(); // prettier-ignore
                            saldo_terakhirTritierTujuanTanpaBarcode.value = numeral(response[0].SaldoTritier).format("0.00"); // prettier-ignore
                            satuan_saldoTerakhirTritierTujuanTanpaBarcode.value = response[0].satTritier.trim(); // prettier-ignore
                            button_tambahTujuanKonversiTanpaBarcode.disabled = true;
                            button_hapusTujuanKonversiTanpaBarcode.disabled = false;
                            button_updateTujuanKonversiTanpaBarcode.disabled = false;
                            jumlah_pemasukanPrimerTanpaBarcode.readOnly = false;
                            jumlah_pemasukanSekunderTanpaBarcode.readOnly = false;
                            jumlah_pemasukanTritierTanpaBarcode.readOnly = false;
                            jumlah_pemasukanPrimerTanpaBarcode.select();
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
        }
    );

    button_modalProsesTanpaBarcode.addEventListener("click", function () {
        let sisaAsalKonversi = 0;
        let sumHasilKonversi = 0;

        sumHasilKonversi = parseFloat(table_daftarAsalKonversiTanpaBarcode.column(6).data().sum()); // prettier-ignore
        sisaAsalKonversi = parseFloat(jumlah_pemakaianTritierTanpaBarcode.value) - sumHasilKonversi; // prettier-ignore

        console.log("Hasil Konversi: " + sumHasilKonversi);
        console.log("Asal Konversi: " + sisaAsalKonversi);

        if (sisaAsalKonversi > sumHasilKonversi * 0.03) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                showConfirmButton: false,
                timer: 1000,
                text: "Jumlah sisa konversi tidak boleh lebih dari 3% dari jumlah pemakaian!",
            });
            return;
        }

        if (id_shiftTanpaBarcode.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                timer: 1000,
                text: "Kolom shift harus diisi!",
                showConfirmButton: false,
            }).then(() => {
                id_shiftTanpaBarcode.focus();
            });
            return;
        }

        if (group_TanpaBarcode.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                timer: 1000,
                text: "Kolom group harus diisi!",
                showConfirmButton: false,
            }).then(() => {
                group_TanpaBarcode.focus();
            });
            return;
        }

        if (table_daftarAsalKonversiTanpaBarcode.data().length == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                showConfirmButton: false,
                timer: 1000,
                text: "Tabel tujuan konversi masih kosong!",
            });
        } else {
            $.ajax({
                type: "POST",
                url: "/KonversiRollBarcode",
                data: {
                    _token: csrfToken,
                    shift: id_shiftTanpaBarcode.value,
                    grup: group_TanpaBarcode.value,
                    divisi: "ADS",
                    jenisStore: "permohonanTanpaBarcode",
                    table_daftarAsalKonversi:
                        table_daftarAsalKonversiTanpaBarcode
                            .rows()
                            .data()
                            .toArray(),
                    table_daftarTujuanKonversi:
                        table_daftarTujuanKonversiTanpaBarcode
                            .rows()
                            .data()
                            .toArray(),
                    tanggalKonversi: input_tanggalKonversiTanpaBarcode.value,
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            timer: 1000,
                            showConfirmButton: false,
                        });
                    } else {
                        getDataPermohonan();
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
                            text: response.success,
                            timer: 1000,
                            showConfirmButton: false,
                        });
                        $("#tambahTujuanModalTanpaBarcode").modal("hide");
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        }
    });

    jumlah_pemakaianPrimerTanpaBarcode.addEventListener("input", function (e) {
        let inputValue = parseFloat(e.target.value);
        if (inputValue > saldo_terakhirPrimerAsalTanpaBarcode.value) {
            jumlah_pemakaianPrimerTanpaBarcode.value = saldo_terakhirPrimerAsalTanpaBarcode.value; // prettier-ignore
        }
    });

    jumlah_pemakaianSekunderTanpaBarcode.addEventListener(
        "input",
        function (e) {
            let inputValue = parseFloat(e.target.value);
            if (inputValue > saldo_terakhirSekunderAsalTanpaBarcode.value) {
                jumlah_pemakaianSekunderTanpaBarcode.value = saldo_terakhirSekunderAsalTanpaBarcode.value; // prettier-ignore
            }
        }
    );

    jumlah_pemakaianTritierTanpaBarcode.addEventListener("input", function (e) {
        let inputValue = parseFloat(e.target.value) || 0;
        let maxSaldo = parseFloat(saldo_terakhirTritierAsalTanpaBarcode.value) || 0; // prettier-ignore
        console.log(inputValue);

        // Sum total from DataTable column 6 (Jumlah Pemasukan Tritier)
        let sumTritier = 0;
        table_daftarTujuanKonversiTanpaBarcode.rows().every(function () {
            sumTritier += parseFloat(this.data()[6]) || 0;
        });

        // Allow max 3% overhead
        let maxAllowed = +(sumTritier * 1.03).toFixed(2);
        let limit = Math.min(maxSaldo, maxAllowed); // 👈 use the stricter of the two

        if (inputValue > limit) {
            this.value = limit;
            this.setCustomValidity("Input exceeds the maximum allowed value.");
        } else {
            this.setCustomValidity("");
        }

        // Enable the add button if input is valid, greater than 0, and update button is disabled
        button_tambahAsalKonversiTanpaBarcode.disabled = !(
            inputValue > 0 &&
            inputValue <= limit &&
            button_updateTujuanKonversiTanpaBarcode.disabled
        );

        this.reportValidity();
    });
    //#endregion
});
