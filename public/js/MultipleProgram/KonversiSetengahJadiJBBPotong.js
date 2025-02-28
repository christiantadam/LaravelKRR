$(document).ready(function () {
    //#region Get element by ID
    let table_daftarKonversi = $("#table_daftarKonversi").DataTable({
        processing: true,
        responsive: true,
        ordering: false,
        autoWidth: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "IdTypeTujuan" },
            { data: "NamaTypeTujuan" },
            { data: "HasilPrimer" },
            { data: "HasilSekunder" },
            { data: "HasilTritier" },
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
        columnDefs: [
            { width: "12%", targets: 0 },
            { width: "25%", targets: 1 },
            { width: "25%", targets: 6 },
        ],
    });
    let table_daftarAsalKonversi = $("#table_daftarAsalKonversi").DataTable({
        columnDefs: [
            {
                targets: 4, // Targeting the 5th column for "Id Type Inventory"
                render: function (data, type, row, meta) {
                    if (type === "display") {
                        return `<select class="inventory-type-select" data-row="${meta.row}" style="width: 100%"></select>`;
                    }
                    return data;
                },
            },
            {
                targets: [6, 8, 10], // Targeting columns 7, 9, and 11 (0-indexed)
                className: "editable-cell",
            },
            {
                targets: 12,
                visible: false,
                searchable: false,
            },
        ],
        drawCallback: function () {
            populateSelectElements();
            setupDropdownChangeListener();
            setupInlineEditing();
        },
    });
    const kodeKomponenMap = {
        BB: "BODY BESAR",
        BS: "BODY SAMPING",
        TA: "TUTUP ATAS",
        TB: "TUTUP BAWAH",
        CA: "CEROBONG ATAS",
        CB: "CEROBONG BAWAH",
        HR: "HANGING ROPE",
        HB: "LIFTING BELT",
        RB: "REINFORCED BELT",
        RC: "REINFORCED CLOTH",
        CR: "CHARGING ROPE",
        DR: "DISCHARGING ROPE",
        RR: "BOTTOM REINFORCE ROPE",
        TR: "RING TALI",
        ST: "SELANG TUTUP",
        PC: "PITA COVER ATAS",
        PH: "PITA HOOK",
        PP: "PITA PENGIKAT",
        RP: "REINFORCED PITA",
        TT: "TEMTION TAPE",
        CV: "COVER ATAS",
        LM: "LAMINATING",
        IL: "INNER LINER",
        PO: "POCKET",
        EV: "SPON(EVA)",
        BJ: "BENANG JAHIT",
        OJ: "ONGKOS JAHIT",
        PA: "PACKING/LBR",
        OB: "OBRAS",
        SB: "SIDE BELT",
        FP: "FLAP",
        AB: "AUXILIARY BELT",
        AR: "AUXILIARY ROPE",
        BD: "BENANG DUST PROOF",
        MT: "MAGIC TAPE",
        KG: "KARUNG JUMBO",
        KT: "KATUN",
        BA: "BENANG ANTISTATIC",
        KR: "KERTAS",
        KK: "KAIN KAPAS",
        KW: "KAIN NON WOVEN",
        BK: "BENANG KATUN",
        KA: "KARET",
        CC: "CARBON CONDUCTIVE",
    };
    const customerSelect = $("#customerSelect");
    const kodeBarangSelect = $("#kodeBarangSelect");
    const select_divisi = $("#select_divisi");
    const select_kelompokAsal = $("#select_kelompokAsal");
    const select_kelompokTujuan = $("#select_kelompokTujuan");
    const select_kelompokUtamaAsal = $("#select_kelompokUtamaAsal");
    const select_kelompokUtamaTujuan = $("#select_kelompokUtamaTujuan");
    const select_objekAsal = $("#select_objekAsal");
    const select_objekTujuan = $("#select_objekTujuan");
    const select_subKelompokAsal = $("#select_subKelompokAsal");
    const select_subKelompokTujuan = $("#select_subKelompokTujuan");
    const select_typeAsal = $("#select_typeAsal");
    const select_typeTujuan = $("#select_typeTujuan");
    let button_hapusAsalKonversi = document.getElementById("button_hapusAsalKonversi"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahAsalKonversi = document.getElementById("button_tambahAsalKonversi"); // prettier-ignore
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let button_updateAsalKonversi = document.getElementById("button_updateAsalKonversi"); // prettier-ignore
    let cekSaldo;
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let detail_konversiModalTableDaftarAsalKonversi = $("#detail_konversiModalTableDaftarAsalKonversi").DataTable(); // prettier-ignore
    let detail_konversiModalTableDaftarTujuanKonversi = $("#detail_konversiModalTableDaftarTujuanKonversi").DataTable(); // prettier-ignore
    let div_PIBAsal = document.getElementById("div_PIBAsal"); // prettier-ignore
    let div_PIBTujuan = document.getElementById("div_PIBTujuan"); // prettier-ignore
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi"); // prettier-ignore
    let divisiUser = document.getElementById("divisiUser"); // prettier-ignore
    let id_shift = document.getElementById("id_shift"); // prettier-ignore
    let input_tanggalKonversi = document.getElementById("input_tanggalKonversi"); // prettier-ignore
    let inventoryTypes = [];
    let jumlah_pemakaianPrimer = document.getElementById("jumlah_pemakaianPrimer"); // prettier-ignore
    let jumlah_pemakaianSekunder = document.getElementById("jumlah_pemakaianSekunder"); // prettier-ignore
    let jumlah_pemakaianTritier = document.getElementById("jumlah_pemakaianTritier"); // prettier-ignore
    let jumlah_pemasukanPrimer = document.getElementById("jumlah_pemasukanPrimer"); // prettier-ignore
    let jumlah_pemasukanSekunder = document.getElementById("jumlah_pemasukanSekunder"); // prettier-ignore
    let jumlah_pemasukanTritier = document.getElementById("jumlah_pemasukanTritier"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser"); // prettier-ignore
    let PIB_asal = document.getElementById("PIB_asal"); // prettier-ignore
    let PIB_tujuan = document.getElementById("PIB_tujuan"); // prettier-ignore
    let proses = 0;
    let saldo_terakhirPrimerAsal = document.getElementById("saldo_terakhirPrimerAsal"); // prettier-ignore
    let saldo_terakhirSekunderAsal = document.getElementById("saldo_terakhirSekunderAsal"); // prettier-ignore
    let saldo_terakhirTritierAsal = document.getElementById("saldo_terakhirTritierAsal"); // prettier-ignore
    let saldo_terakhirTujuanPrimer = document.getElementById("saldo_terakhirTujuanPrimer"); // prettier-ignore
    let saldo_terakhirTujuanSekunder = document.getElementById("saldo_terakhirTujuanSekunder"); // prettier-ignore
    let saldo_terakhirTujuanTritier = document.getElementById("saldo_terakhirTujuanTritier"); // prettier-ignore
    let satuan_primerJumlahPemakaian = document.getElementById("satuan_primerJumlahPemakaian"); // prettier-ignore
    let satuan_primerJumlahPemasukan = document.getElementById("satuan_primerJumlahPemasukan"); // prettier-ignore
    let satuan_saldoTerakhirPrimerAsal = document.getElementById("satuan_saldoTerakhirPrimerAsal"); // prettier-ignore
    let satuan_saldoTerakhirSekunderAsal = document.getElementById("satuan_saldoTerakhirSekunderAsal"); // prettier-ignore
    let satuan_saldoTerakhirTritierAsal = document.getElementById("satuan_saldoTerakhirTritierAsal"); // prettier-ignore
    let satuan_saldoTerakhirTujuanPrimer = document.getElementById("satuan_saldoTerakhirTujuanPrimer"); // prettier-ignore
    let satuan_saldoTerakhirTujuanSekunder = document.getElementById("satuan_saldoTerakhirTujuanSekunder"); // prettier-ignore
    let satuan_saldoTerakhirTujuanTritier = document.getElementById("satuan_saldoTerakhirTujuanTritier"); // prettier-ignore
    let satuan_sekunderJumlahPemakaian = document.getElementById("satuan_sekunderJumlahPemakaian"); // prettier-ignore
    let satuan_sekunderJumlahPemasukan = document.getElementById("satuan_sekunderJumlahPemasukan"); // prettier-ignore
    let satuan_tritierJumlahPemakaian = document.getElementById("satuan_tritierJumlahPemakaian"); // prettier-ignore
    let satuan_tritierJumlahPemasukan = document.getElementById("satuan_tritierJumlahPemasukan"); // prettier-ignore
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore

    //#endregion

    //#region Function Mantap-mantap
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

    // Function to populate select elements with options
    function populateSelectElements() {
        $("#table_daftarAsalKonversi .inventory-type-select").each(function () {
            let rowIndex = $(this).data("row");
            let rowData = table_daftarAsalKonversi.row(rowIndex).data();
            let select = $(
                `#table_daftarAsalKonversi .inventory-type-select[data-row="${rowIndex}"]`
            );

            if (select.find("option").length > 1) {
                return;
            }

            if (rowData[5] && rowData[0]) {
                // Skip populating this select element if there's already a value in the next column
                return;
            }
            // if (rowData[3] < 1 && rowData[0]) {
            //     select.append(new Option("No Item Needed", ""));
            //     select.select2({
            //         placeholder: "No Item Needed",
            //         width: "100%",
            //         dropdownParent: $(".modal-body"),
            //     });
            //     select.prop("disabled", true);
            //     return;
            // }
            if (rowData[0] && rowData[1] && rowData[2]) {
                // Calculate panjangLebar and namaKomponen from rowData
                let panjangLebar =
                    parseFloat(rowData[2].split(" X ")[0]) +
                    "X" +
                    parseFloat(rowData[2].split(" X ")[1]);
                let namaKomponen =
                    kodeKomponenMap[rowData[0].substring(2, 4)] || rowData[0];

                if (namaKomponen == "BENANG JAHIT") {
                    namaKomponen = "PP Multifilamen";
                }

                $.ajax({
                    url: "/KonversiSetengahJadi/getInventoryTypes",
                    method: "GET",
                    data: {
                        panjangLebar: panjangLebar,
                        kodeBarang: $("#kodeBarangSelect").val(),
                        namaKomponen: namaKomponen,
                        divisi: $("#select_divisi").val(),
                    },
                    dataType: "json",
                    success: function (optionsData) {
                        select
                            .empty()
                            .append(
                                '<option value="" disabled selected>Pilih Barang</option>'
                            );

                        // Populate select element with options
                        if (optionsData.length > 0) {
                            optionsData.forEach((option) => {
                                select.append(
                                    new Option(
                                        option.NamaType,
                                        option.IdType +
                                            " | " +
                                            option.satPrimer +
                                            " | " +
                                            option.satSekunder +
                                            " | " +
                                            option.satTritier +
                                            " | " +
                                            option.SaldoPrimer +
                                            " | " +
                                            option.SaldoSekunder +
                                            " | " +
                                            option.SaldoTritier +
                                            " | " +
                                            option.IdSubkelompok
                                    )
                                );
                            });
                            select.prop("disabled", false); // Enable if there are options
                        } else {
                            select.append(new Option("No items available", ""));
                            select.prop("disabled", true); // Disable if no options
                        }

                        // Initialize Select2
                        select.select2({
                            placeholder:
                                optionsData.length > 0
                                    ? "Choose item"
                                    : "There is no suitable item",
                            width: "100%",
                            dropdownParent: $(".modal-body"),
                        });
                    },
                    error: function () {
                        console.error(
                            "Failed to load inventory types for row:",
                            rowIndex
                        );
                    },
                });
            } else {
                select.empty();
                select.append(
                    new Option(
                        rowData[4],
                        rowData[5] +
                            " | " +
                            rowData[7] +
                            " | " +
                            rowData[9] +
                            " | " +
                            rowData[11] +
                            " | " +
                            rowData[6] +
                            " | " +
                            rowData[8] +
                            " | " +
                            rowData[10]
                    )
                );
                // Initialize Select2
                select.select2({
                    placeholder: "Choose item",
                    width: "100%",
                    dropdownParent: $(".modal-body"),
                });
            }
        });
    }

    // Function to handle select change and update next column
    function setupDropdownChangeListener() {
        $("#table_daftarAsalKonversi").off("change", ".inventory-type-select"); // Remove previous event handlers to avoid duplicates
        $("#table_daftarAsalKonversi").on(
            "change",
            ".inventory-type-select",
            function () {
                let currentRow = $(this).closest("tr");
                let currentRowIndex = table_daftarAsalKonversi
                    .row(currentRow)
                    .index();
                let currentValue = $(this).val();
                let duplicateRowIndex = 0;
                let isDuplicate = false;

                // Ensure that `currentValue` has a value before proceeding
                if (!currentValue) {
                    return;
                }

                // Iterate through all rows to check for duplicate in the 5th column
                table_daftarAsalKonversi
                    .rows()
                    .every(function (rowIdx, tableLoop, rowLoop) {
                        if (rowIdx === currentRowIndex) {
                            // Skip the current row being changed
                            return true;
                        }

                        let rowNode = $(this.node());
                        let selectValue = rowNode
                            .find(".inventory-type-select")
                            .val();

                        if (selectValue === currentValue) {
                            isDuplicate = true;
                            duplicateRowIndex = rowIdx + 1;
                            return false; // Exit iteration early if duplicate is found
                        }
                    });

                if (isDuplicate) {
                    // Use selectElement for setCustomValidity
                    this.setCustomValidity(
                        "Duplicate value detected for row: " +
                            duplicateRowIndex +
                            "."
                    );
                    this.reportValidity();
                    // Clear custom validity after 3 seconds
                    setTimeout(() => {
                        this.setCustomValidity("");
                    }, 3000);
                    // Reset the dropdown to its previous value
                    $(this).val(null).trigger("change");
                    // Clear relevant cells in the table
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 5)
                        .data("")
                        .draw();
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 6)
                        .data("")
                        .draw();
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 7)
                        .data("")
                        .draw();
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 8)
                        .data("")
                        .draw();
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 9)
                        .data("")
                        .draw();
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 10)
                        .data("")
                        .draw();
                    table_daftarAsalKonversi
                        .cell(currentRowIndex, 11)
                        .data("")
                        .draw();
                    currentRow.css("background-color", "#ffcccc"); // Highlight row with duplicate
                    return;
                } else {
                    currentRow.css("background-color", "#ffffff"); // Reset background for valid selection
                }

                // Parse the selected value
                let [
                    idType,
                    satPrimer,
                    satSekunder,
                    satTritier,
                    SaldoPrimer,
                    SaldoSekunder,
                    SaldoTritier,
                    SubKelompok,
                ] = currentValue.split(" | ");

                // Call your custom function
                hitungPerkiraanPemakaian(
                    idType,
                    satPrimer,
                    satSekunder,
                    satTritier,
                    SaldoPrimer,
                    SaldoSekunder,
                    SaldoTritier,
                    currentRowIndex,
                    this,
                    SubKelompok
                );
            }
        );
    }

    // Function to handle inline editing
    function setupInlineEditing() {
        $("#table_daftarAsalKonversi")
            .off("click", ".editable-cell")
            .on("click", ".editable-cell", function () {
                let cell = table_daftarAsalKonversi.cell(this); // Get the clicked cell
                let oldValue = cell.data(); // Retrieve the current value
                let $this = $(this); // Reference to the cell DOM element

                // Replace cell content with an input for editing
                if (!$this.hasClass("editing")) {
                    $this.addClass("editing");
                    let input = $(
                        `<input type="text" style="width: 100%;" value="${oldValue}">`
                    );
                    $this.html(input);

                    // Focus and select the input for user convenience
                    input.focus().select();

                    // Handle input blur or Enter key
                    input.on("blur keypress", function (e) {
                        if (
                            e.type === "blur" ||
                            (e.type === "keypress" && e.key === "Enter")
                        ) {
                            let newValue = input.val(); // Get new value
                            $this.removeClass("editing").text(newValue); // Replace input with new value

                            // Update the DataTable's data model if the value has changed
                            if (newValue !== oldValue) {
                                cell.data(newValue).draw(false);
                                console.log(
                                    `Cell updated from "${oldValue}" to "${newValue}"`
                                );
                            }
                        }
                    });
                }
            });
    }

    function hitungPerkiraanPemakaian(
        idType,
        satPrimer,
        satSekunder,
        satTritier,
        SaldoPrimer,
        SaldoSekunder,
        SaldoTritier,
        rowIndex,
        selectElement,
        SubKelompok
    ) {
        let row = $(selectElement).closest("tr");
        let quantityDibutuhkan = parseFloat(
            table_daftarAsalKonversi.cell(rowIndex, 3).data()
        );
        let cell5 = table_daftarAsalKonversi.cell(rowIndex, 5);
        let cell6 = table_daftarAsalKonversi.cell(rowIndex, 6);
        let cell7 = table_daftarAsalKonversi.cell(rowIndex, 7);
        let cell8 = table_daftarAsalKonversi.cell(rowIndex, 8);
        let cell9 = table_daftarAsalKonversi.cell(rowIndex, 9);
        let cell10 = table_daftarAsalKonversi.cell(rowIndex, 10);
        let cell11 = table_daftarAsalKonversi.cell(rowIndex, 11);
        let cell12 = table_daftarAsalKonversi.cell(rowIndex, 12);

        let jumlahPengeluaranSekunderHasilHitungan = numeral(
            parseFloat(jumlah_pemasukanSekunder.value ?? 0) * quantityDibutuhkan
        ).format("0.00");

        let jumlahPengeluaranPrimerHasilHitungan = numeral(
            Math.round(
                jumlahPengeluaranSekunderHasilHitungan *
                    (SaldoPrimer / SaldoSekunder)
            )
        ).format("0.00");

        let jumlahPengeluaranTritierHasilHitungan = numeral(
            jumlahPengeluaranSekunderHasilHitungan *
                (SaldoSekunder / SaldoTritier)
        ).format("0.00");

        // Check if SaldoTritier is sufficient
        if (
            parseFloat(SaldoTritier) <=
            parseFloat(jumlahPengeluaranTritierHasilHitungan)
        ) {
            console.warn(
                "Untuk konversi membutuhkan " +
                    jumlahPengeluaranTritierHasilHitungan +
                    " " +
                    satuan_tritierJumlahPemasukan.value +
                    ". Saldo Tritier untuk Id Type " +
                    idType +
                    " hanya tersedia: " +
                    parseFloat(SaldoTritier) +
                    " " +
                    satTritier +
                    ". Saldo Tritier Tidak cukup!"
            );

            // Use selectElement for setCustomValidity
            selectElement.setCustomValidity(
                "Saldo Tritier tidak cukup untuk Id Type " + idType + "."
            );
            selectElement.reportValidity();

            // Reset the select element to the first option (index 0)
            $(selectElement).val(null).trigger("change");

            // Clear custom validity after 3 seconds
            setTimeout(() => {
                selectElement.setCustomValidity("");
            }, 3000);

            // Clear relevant cells in the table
            cell5.data("").draw();
            cell6.data("").draw();
            cell7.data("").draw();
            cell8.data("").draw();
            cell9.data("").draw();
            cell10.data("").draw();
            cell11.data("").draw();
            cell12.data("").draw();
            row.css("background-color", "#ffcccc");
            return;
        }

        // If SaldoTritier is sufficient, populate cells
        cell5.data(idType).draw();
        cell6.data(jumlahPengeluaranPrimerHasilHitungan).draw();
        cell7.data(satPrimer).draw();
        cell8.data(jumlahPengeluaranSekunderHasilHitungan).draw();
        cell9.data(satSekunder).draw();
        cell10.data(jumlahPengeluaranTritierHasilHitungan).draw();
        cell11.data(satTritier).draw();
        cell12.data(SubKelompok).draw();
    }

    function initializeSelectElement(tipeInitialisasi) {
        // Define an array of select elements and their placeholders based on tipeInitialisasi
        let selectElements = getSelectElementsByType(tipeInitialisasi);

        // Initialize each select element with Select2 and set the placeholder
        selectElements.forEach(({ element, placeholder }) => {
            element.select2({
                dropdownParent: $(".modal-body"),
                placeholder: placeholder,
            });
        });

        // Special case for select_divisi initialization in "showModal"
        if (tipeInitialisasi === "showModal") {
            select_divisi.select2({
                dropdownParent: $(".modal-body"),
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

    // Helper function to get select elements based on tipeInitialisasi
    function getSelectElementsByType(tipeInitialisasi) {
        const elementSets = {
            showModal: [
                { element: customerSelect, placeholder: "Pilih Customer" },
                { element: kodeBarangSelect, placeholder: "Pilih Kode Barang" },
                { element: select_objekAsal, placeholder: "Pilih Objek Asal" },
                {
                    element: select_kelompokUtamaAsal,
                    placeholder: "Pilih Kelompok Utama Asal",
                },
                {
                    element: select_kelompokAsal,
                    placeholder: "Pilih Kelompok Asal",
                },
                {
                    element: select_subKelompokAsal,
                    placeholder: "Pilih Sub Kelompok Asal",
                },
                { element: select_typeAsal, placeholder: "Pilih Type Asal" },
                {
                    element: select_typeTujuan,
                    placeholder: "Pilih Type Tujuan",
                },
                {
                    element: select_objekTujuan,
                    placeholder: "Pilih Objek Tujuan",
                },
                {
                    element: select_kelompokUtamaTujuan,
                    placeholder: "Pilih Kelompok Utama Tujuan",
                },
                {
                    element: select_kelompokTujuan,
                    placeholder: "Pilih Kelompok Tujuan",
                },
                {
                    element: select_subKelompokTujuan,
                    placeholder: "Pilih Sub Kelompok Tujuan",
                },
            ],
            pilihDivisi: [
                { element: select_objekAsal, placeholder: "Pilih Objek Asal" },
                {
                    element: select_kelompokUtamaAsal,
                    placeholder: "Pilih Kelompok Utama Asal",
                },
                {
                    element: select_kelompokAsal,
                    placeholder: "Pilih Kelompok Asal",
                },
                {
                    element: select_subKelompokAsal,
                    placeholder: "Pilih Sub Kelompok Asal",
                },
                { element: select_typeAsal, placeholder: "Pilih Type Asal" },
                {
                    element: select_typeTujuan,
                    placeholder: "Pilih Type Tujuan",
                },
                {
                    element: select_objekTujuan,
                    placeholder: "Pilih Objek Tujuan",
                },
                {
                    element: select_kelompokUtamaTujuan,
                    placeholder: "Pilih Kelompok Utama Tujuan",
                },
                {
                    element: select_kelompokTujuan,
                    placeholder: "Pilih Kelompok Tujuan",
                },
                {
                    element: select_subKelompokTujuan,
                    placeholder: "Pilih Sub Kelompok Tujuan",
                },
            ],
            pilihObjekAsal: [
                {
                    element: select_kelompokUtamaAsal,
                    placeholder: "Pilih Kelompok Utama Asal",
                },
                {
                    element: select_kelompokAsal,
                    placeholder: "Pilih Kelompok Asal",
                },
                {
                    element: select_subKelompokAsal,
                    placeholder: "Pilih Sub Kelompok Asal",
                },
                { element: select_typeAsal, placeholder: "Pilih Type Asal" },
            ],
            pilihKelompokUtamaAsal: [
                {
                    element: select_kelompokAsal,
                    placeholder: "Pilih Kelompok Asal",
                },
                {
                    element: select_subKelompokAsal,
                    placeholder: "Pilih Sub Kelompok Asal",
                },
                { element: select_typeAsal, placeholder: "Pilih Type Asal" },
            ],
            pilihKelompokAsal: [
                {
                    element: select_subKelompokAsal,
                    placeholder: "Pilih Sub Kelompok Asal",
                },
                { element: select_typeAsal, placeholder: "Pilih Type Asal" },
            ],
            pilihSubKelompokAsal: [
                { element: select_typeAsal, placeholder: "Pilih Type Asal" },
            ],
            pilihObjekTujuan: [
                {
                    element: select_kelompokUtamaTujuan,
                    placeholder: "Pilih Kelompok Utama Tujuan",
                },
                {
                    element: select_kelompokTujuan,
                    placeholder: "Pilih Kelompok Tujuan",
                },
                {
                    element: select_subKelompokTujuan,
                    placeholder: "Pilih Sub Kelompok Tujuan",
                },
                {
                    element: select_typeTujuan,
                    placeholder: "Pilih Type Tujuan",
                },
            ],
            pilihKelompokUtamaTujuan: [
                {
                    element: select_kelompokTujuan,
                    placeholder: "Pilih Kelompok Tujuan",
                },
                {
                    element: select_subKelompokTujuan,
                    placeholder: "Pilih Sub Kelompok Tujuan",
                },
                {
                    element: select_typeTujuan,
                    placeholder: "Pilih Type Tujuan",
                },
            ],
            pilihKelompokTujuan: [
                {
                    element: select_subKelompokTujuan,
                    placeholder: "Pilih Sub Kelompok Tujuan",
                },
                {
                    element: select_typeTujuan,
                    placeholder: "Pilih Type Tujuan",
                },
            ],
            pilihSubKelompokTujuan: [
                {
                    element: select_typeTujuan,
                    placeholder: "Pilih Type Tujuan",
                },
            ],
        };

        return elementSets[tipeInitialisasi] || [];
    }

    function clearInputTextElements(tipeClearInput) {
        let inputTextIds = [];
        if (tipeClearInput == "pilihIdTypeAsal") {
            inputTextIds = [
                "saldo_terakhirPrimerAsal",
                "satuan_saldoTerakhirPrimerAsal",
                "saldo_terakhirSekunderAsal",
                "satuan_saldoTerakhirSekunderAsal",
                "saldo_terakhirTritierAsal",
                "satuan_saldoTerakhirTritierAsal",
                "jumlah_pemakaianPrimer",
                "satuan_primerJumlahPemakaian",
                "jumlah_pemakaianSekunder",
                "satuan_sekunderJumlahPemakaian",
                "jumlah_pemakaianTritier",
                "satuan_tritierJumlahPemakaian",
            ];
        } else {
            inputTextIds = [
                "saldo_terakhirTujuanPrimer",
                "satuan_saldoTerakhirTujuanPrimer",
                "saldo_terakhirTujuanSekunder",
                "satuan_saldoTerakhirTujuanSekunder",
                "saldo_terakhirTujuanTritier",
                "satuan_saldoTerakhirTujuanTritier",
                "jumlah_pemasukanPrimer",
                "satuan_primerJumlahPemasukan",
                "jumlah_pemasukanSekunder",
                "satuan_sekunderJumlahPemasukan",
                "jumlah_pemasukanTritier",
                "satuan_tritierJumlahPemasukan",
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
                "jumlah_pemakaianPrimer",
                "jumlah_pemakaianSekunder",
            ];
        } else {
            inputTextIds = [
                "jumlah_pemasukanPrimer",
                "jumlah_pemasukanSekunder",
            ];
        }

        inputTextIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.readOnly = true; // set text input to readonly
            }
        });
    }

    function submitPermohonan() {
        let filteredRows = table_daftarAsalKonversi
            .rows()
            .data()
            .toArray()
            .filter((row) => {
                return row[5] !== ""; // Check if the value in column 3 (index 3) is greater than 0
            });

        $.ajax({
            type: "POST",
            url: "/KonversiSetengahJadi",
            data: {
                _token: csrfToken,
                table_daftarAsalKonversi: filteredRows,
                idTypeTujuan: select_typeTujuan.val(),
                jumlah_pemasukanPrimer: jumlah_pemasukanPrimer.value,
                jumlah_pemasukanSekunder: jumlah_pemasukanSekunder.value,
                jumlah_pemasukanTritier: jumlah_pemasukanTritier.value,
                idSubkelompokTujuan: select_subKelompokTujuan.val(),
                proses: proses,
                divisi: "JBB",
                jenisStore: "permohonan",
                shift: id_shift.value,
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

    function getDataPermohonan() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/KonversiSetengahJadi/getDataPermohonan/JBBPotong",
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
    //#endregion

    //#region Setup Form

    getDataPermohonan();

    //#endregion

    //#region add event listener

    button_tambahKonversi.addEventListener("click", function () {
        $("#tambahTujuanModal").modal("show");
        proses = 1; // proses insert
    });

    // Load customer options and init//ialize Select2 when modal is shown
    $("#tambahTujuanModal").on("shown.bs.modal", function (event) {
        table_daftarAsalKonversi.clear().draw(); //Clear Table
        button_updateAsalKonversi.disabled = true;
        button_hapusAsalKonversi.disabled = true;
        button_modalProses.disabled = true;
        jumlah_pemasukanPrimer.readOnly = true;
        jumlah_pemasukanSekunder.readOnly = true;
        jumlah_pemasukanTritier.readOnly = true;
        jumlah_pemakaianPrimer.readOnly = true;
        jumlah_pemakaianSekunder.readOnly = true;
        jumlah_pemakaianTritier.readOnly = true;

        document
            .querySelectorAll("#tambahTujuanModal input")
            .forEach((input) => {
                input.value = "";
            });

        initializeSelectElement("showModal"); //Initialize all select element inside modal
        clearSelectElement("showModal");
        select_divisi.val(null).trigger("change"); // Clear selected index for select_divisi
        input_tanggalKonversi.valueAsDate = new Date(); // Set the default date to today
        input_tanggalKonversi.focus(); // Set focus to input_tanggalKonversi
        // Fetch customers for customerSelect
        $.ajax({
            url: "/KonversiSetengahJadi/selectCustomerTH", // Replace with your actual endpoint
            dataType: "json",
            success: function (data) {
                data.forEach(function (customer) {
                    customerSelect.append(
                        new Option(
                            customer.Nama_Customer,
                            customer.Kode_Customer
                        )
                    );
                });
                customerSelect.select2({
                    dropdownParent: $(".modal-body"),
                    placeholder: "Pilih Customer",
                });
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load customer data.",
                });
            },
        }).then(() => {
            const InputIds = [
                "jumlah_pemasukanTritier",
                "jumlah_pemasukanSekunder",
                "jumlah_pemasukanPrimer",
                "jumlah_pemakaianPrimer",
                "jumlah_pemakaianSekunder",
                "jumlah_pemakaianTritier",
            ];

            function getNextFocusableElement(currentElement) {
                // Find the next focusable element in the form
                if (currentElement.id === "jumlah_pemasukanTritier") {
                    // Locate the select2 element within the table by class and row
                    let row = table_daftarAsalKonversi.row(0).node(); // Adjust the row index if necessary
                    let selectElement = $(row)
                        .find(".inventory-type-select")
                        .eq(0);
                    button_modalProses.disabled = false;
                    if (selectElement.length) {
                        selectElement.select2("open");
                        return selectElement[0]; // Return the select2 element to keep focus on it
                    }
                }

                if (currentElement.id === "jumlah_pemakaianTritier") {
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

    select_divisi.on("select2:select", function () {
        const selectedDivisiAsal = $(this).val(); // Get selected Divisi Asal
        // initializeSelectElement("pilihDivisi");
        customerSelect.val(null).trigger("change");
        kodeBarangSelect.val(null).trigger("change");
        clearSelectElement("pilihDivisi");

        table_daftarAsalKonversi.clear().draw();

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getObjek",
            method: "GET",
            data: { divisi: selectedDivisiAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Objek untuk divisi: " +
                            $("#select_divisi option:selected").text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_objekAsal.append(
                            new Option(objek.NamaObjek, objek.IdObjek)
                        );
                        select_objekTujuan.append(
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
                customerSelect.select2("open");
            }, 200);
        });
    });

    // Handle customer selection to populate kodeBarangSelect
    customerSelect.on("select2:select", function () {
        // Check if 'Divisi Asal' is selected
        if (select_divisi.prop("selectedIndex") <= 0) {
            Swal.fire(
                "Warning",
                "Please select a value for 'Divisi Asal' first.",
                "warning"
            );
            // Reset customerSelect to its default unselected state
            customerSelect.val(null).trigger("change");
            return; // Exit if 'Divisi Asal' is not selected
        }

        const selectedCustomer = $(this).val(); // Get selected Kode_Customer

        // Clear and reset kodeBarangSelect options
        kodeBarangSelect
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kode Barang</option>'
            );

        table_daftarAsalKonversi.clear().draw();

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/selectKodeBarangTH",
            method: "GET",
            data: { Kode_Customer: selectedCustomer }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada kode barang untuk customer: " +
                            $("#customerSelect option:selected").text()
                    );
                } else {
                    data.forEach(function (barang) {
                        kodeBarangSelect.append(
                            new Option(barang.kode_barang, barang.kode_barang)
                        );
                    });
                    kodeBarangSelect.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Kode Barang",
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                kodeBarangSelect.select2("open");
            }, 200);
        });
    });

    // Trigger data load on kodeBarangSelect change
    kodeBarangSelect.on("select2:select", function () {
        const selectedCustomer = customerSelect.val();
        const selectedKodeBarang = kodeBarangSelect.val();

        $.ajax({
            url: "/KonversiSetengahJadi/selectKomponenBarangTH",
            method: "GET",
            data: {
                Kode_Customer: selectedCustomer,
                Kode_Barang: selectedKodeBarang,
            },
            dataType: "json",
            success: function (data) {
                table_daftarAsalKonversi.clear();
                data.forEach((item, rowIndex) => {
                    table_daftarAsalKonversi.row.add([
                        item.Kode_Komponen,
                        item.Nama_Komponen,
                        parseFloat(item.Panjang_Potongan) +
                            " X " +
                            parseFloat(item.Lebar_Potongan),
                        parseFloat(item.Quantity),
                        "", // Placeholder for the select dropdown
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                    ]);
                });

                // Draw the table with populated rows
                table_daftarAsalKonversi.draw();
            },
            error: function () {
                Swal.fire(
                    "Error",
                    "Failed to load Komponen Barang data.",
                    "error"
                );
            },
        }).then(() => {
            setTimeout(() => {
                select_objekTujuan.select2("open");
            }, 200);
        });
    });

    select_objekAsal.on("select2:select", function () {
        if (kodeBarangSelect.prop("selectedIndex") <= 0) {
            Swal.fire(
                "Warning",
                "Please select a value for 'Kode Barang' first.",
                "warning"
            );
            // Reset customerSelect to its default unselected state
            select_objekAsal.val(null).trigger("change");
            return; // Exit if 'Kode Barang' is not selected
        }

        const selectedObjekAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihObjekAsal");
        clearSelectElement("pilihObjekAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompokUtama",
            method: "GET",
            data: { objek: selectedObjekAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekAsal option:selected").text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokUtamaAsal.append(
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
                select_kelompokUtamaAsal.select2("open");
            }, 200);
        });
    });

    select_objekTujuan.on("select2:select", function () {
        if (kodeBarangSelect.prop("selectedIndex") <= 0) {
            Swal.fire(
                "Warning",
                "Please select a value for 'Kode Barang' first.",
                "warning"
            );
            // Reset customerSelect to its default unselected state
            select_objekTujuan.val(null).trigger("change");
            return; // Exit if 'Kode Barang' is not selected
        }

        const selectedObjekTujuan = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihObjekTujuan");
        clearSelectElement("pilihObjekTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompokUtama",
            method: "GET",
            data: { objek: selectedObjekTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekAsal option:selected").text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokUtamaTujuan.append(
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
                select_kelompokUtamaTujuan.select2("open");
            }, 200);
        });
    });

    select_kelompokUtamaAsal.on("select2:select", function () {
        const selectedKelompokUtamaAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihKelompokUtamaAsal");
        clearSelectElement("pilihKelompokUtamaAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompok",
            method: "GET",
            data: { kelompokUtama: selectedKelompokUtamaAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $(
                                "#select_kelompokUtamaAsal option:selected"
                            ).text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokAsal.append(
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
                select_kelompokAsal.select2("open");
            }, 200);
        });
    });

    select_kelompokUtamaTujuan.on("select2:select", function () {
        const selectedKelompokUtamaTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihKelompokUtamaTujuan");
        clearSelectElement("pilihKelompokUtamaTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompok",
            method: "GET",
            data: { kelompokUtama: selectedKelompokUtamaTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $(
                                "#select_kelompokUtamaTujuan option:selected"
                            ).text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokTujuan.append(
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
                select_kelompokTujuan.select2("open");
            }, 200);
        });
    });

    select_kelompokAsal.on("select2:select", function () {
        const selectedKelompokAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihKelompokAsal");
        clearSelectElement("pilihKelompokAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getSubKelompok",
            method: "GET",
            data: { kelompok: selectedKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokAsal option:selected").text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_subKelompokAsal.append(
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
                select_subKelompokAsal.select2("open");
            }, 200);
        });
    });

    select_kelompokTujuan.on("select2:select", function () {
        const selectedKelompokTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihKelompokTujuan");
        clearSelectElement("pilihKelompokTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getSubKelompok",
            method: "GET",
            data: { kelompok: selectedKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokTujuan option:selected").text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_subKelompokTujuan.append(
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
                select_subKelompokTujuan.select2("open");
            }, 200);
        });
    });

    select_subKelompokAsal.on("select2:select", function () {
        const selectedSubKelompokAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihSubKelompokAsal");
        clearSelectElement("pilihSubKelompokAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getType",
            method: "GET",
            data: { subKelompok: selectedSubKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Type untuk Sub Kelompok: " +
                            $("#select_subKelompokAsal option:selected").text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_typeAsal.append(
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
                select_typeAsal.select2("open");
            }, 200);
        });
    });

    select_subKelompokTujuan.on("select2:select", function () {
        const selectedSubKelompokTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihSubKelompokTujuan");
        clearSelectElement("pilihSubKelompokTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getType",
            method: "GET",
            data: { subKelompok: selectedSubKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Type untuk Sub Kelompok: " +
                            $(
                                "#select_subKelompokTujuan option:selected"
                            ).text(),
                    });
                } else {
                    data.forEach(function (objek) {
                        select_typeTujuan.append(
                            new Option(objek.NamaType, objek.IdType)
                        );
                    });
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
                select_typeTujuan.select2("open");
            }, 200);
        });
    });

    select_typeAsal.on("select2:select", function () {
        const selectedIdType = $(this).val(); // Get selected Id Type
        // Clear Input Text
        clearInputTextElements("pilihIdTypeAsal");
        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getTypeSaldo",
            method: "GET",
            data: { idType: selectedIdType }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Data Type untuk Id Type: " +
                            $("#select_typeAsal option:selected").val(),
                    });
                } else {
                    if (
                        parseFloat(data[0].SaldoPrimer) > 0 ||
                        parseFloat(data[0].SaldoSekunder) > 0 ||
                        parseFloat(data[0].SaldoTritier) > 0
                    ) {
                        cekSaldo = true;
                        saldo_terakhirPrimerAsal.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirPrimerAsal.value = data[0].satPrimer.trim(); // prettier-ignore
                        saldo_terakhirSekunderAsal.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirSekunderAsal.value = data[0].satSekunder.trim(); // prettier-ignore
                        saldo_terakhirTritierAsal.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirTritierAsal.value =data[0].satTritier.trim(); // prettier-ignore
                        satuan_primerJumlahPemakaian.value = data[0].satPrimer.trim(); // prettier-ignore
                        satuan_sekunderJumlahPemakaian.value = data[0].satSekunder.trim(); // prettier-ignore
                        satuan_tritierJumlahPemakaian.value = data[0].satTritier.trim(); // prettier-ignore
                    } else {
                        cekSaldo = false;
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Tidak ada saldo untuk Type ini",
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
            if (!cekSaldo) {
                select_typeAsal.val(null).trigger("change");
                select_typeAsal.select2("open");
                jumlah_pemakaianPrimer.value = "";
                jumlah_pemakaianSekunder.value = "";
                jumlah_pemakaianTritier.value = "";
            } else {
                // Handle jumlah_pemakaianPrimer read-only and value setting
                if (
                    satuan_primerJumlahPemakaian.value &&
                    satuan_primerJumlahPemakaian.value !== "NULL"
                ) {
                    jumlah_pemakaianPrimer.readOnly = false;
                } else {
                    jumlah_pemakaianPrimer.value = numeral(0).format("0.00");
                    jumlah_pemakaianPrimer.readOnly = true;
                }
                // Handle jumlah_pemakaianSekunder read-only and value setting
                if (
                    satuan_sekunderJumlahPemakaian.value &&
                    satuan_sekunderJumlahPemakaian.value !== "NULL"
                ) {
                    jumlah_pemakaianSekunder.readOnly = false;
                } else {
                    jumlah_pemakaianSekunder.value = numeral(0).format("0.00");
                    jumlah_pemakaianSekunder.readOnly = true;
                }
                jumlah_pemakaianTritier.readOnly = false;

                // Set focus based on read-only status
                jumlah_pemakaianPrimer.readOnly
                    ? jumlah_pemakaianSekunder.readOnly
                        ? jumlah_pemakaianTritier.focus()
                        : jumlah_pemakaianSekunder.focus()
                    : jumlah_pemakaianPrimer.focus();
            }
        });
    });

    select_typeTujuan.on("select2:select", function () {
        const selectedIdType = $(this).val(); // Get selected Id Type
        // Clear Input Text
        clearInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getTypeSaldo",
            method: "GET",
            data: { idType: selectedIdType }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Data Type untuk Id Type: " +
                            $("#select_typeTujuan option:selected").val(),
                    });
                } else {
                    saldo_terakhirTujuanPrimer.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirTujuanPrimer.value = data[0].satPrimer.trim(); // prettier-ignore
                    saldo_terakhirTujuanSekunder.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirTujuanSekunder.value = data[0].satSekunder.trim(); // prettier-ignore
                    saldo_terakhirTujuanTritier.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirTujuanTritier.value =data[0].satTritier.trim(); // prettier-ignore
                    satuan_primerJumlahPemasukan.value = data[0].satPrimer.trim(); // prettier-ignore
                    satuan_sekunderJumlahPemasukan.value = data[0].satSekunder.trim(); // prettier-ignore
                    satuan_tritierJumlahPemasukan.value = data[0].satTritier.trim(); // prettier-ignore

                    // Handle jumlah_pemakaianPrimer read-only and value setting
                    if (
                        satuan_primerJumlahPemasukan.value &&
                        satuan_primerJumlahPemasukan.value !== "NULL"
                    ) {
                        jumlah_pemasukanPrimer.readOnly = false;
                    } else {
                        jumlah_pemasukanPrimer.value =
                            numeral(0).format("0.00");
                        jumlah_pemasukanPrimer.readOnly = true;
                    }
                    // Handle jumlah_pemakaianSekunder read-only and value setting
                    if (
                        satuan_sekunderJumlahPemasukan.value &&
                        satuan_sekunderJumlahPemasukan.value !== "NULL"
                    ) {
                        jumlah_pemasukanSekunder.readOnly = false;
                    } else {
                        jumlah_pemasukanSekunder.value =
                            numeral(0).format("0.00");
                        jumlah_pemasukanSekunder.readOnly = true;
                    }
                    jumlah_pemasukanTritier.readOnly = false;

                    // Set focus based on read-only status
                    jumlah_pemasukanPrimer.readOnly
                        ? jumlah_pemasukanSekunder.readOnly
                            ? jumlah_pemasukanTritier.focus()
                            : jumlah_pemasukanSekunder.focus()
                        : jumlah_pemasukanPrimer.focus();
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

    jumlah_pemasukanSekunder.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            // get semua row yang sudah ada id typenya, foreach semua row dan jalankan function hitungPerkiraanPemakaian
            $("#table_daftarAsalKonversi tbody tr").each(function (index, row) {
                // Get the value of the select element in the fifth column
                let idType = table_daftarAsalKonversi.cell(index, 5).data();
                let kodeKomponen = table_daftarAsalKonversi
                    .cell(index, 0)
                    .data();

                if (idType && kodeKomponen) {
                    // Check if there is a value in the fifth column
                    // Define additional variables needed for hitungPerkiraanPemakaian
                    let selectElement = $(row)
                        .find(".inventory-type-select")
                        .get(0);
                    let value = $(selectElement).val();
                    let [
                        idType,
                        satPrimer,
                        satSekunder,
                        satTritier,
                        SaldoPrimer,
                        SaldoSekunder,
                        SaldoTritier,
                        SubKelompok,
                    ] = value.split(" | ");
                    // Call hitungPerkiraanPemakaian for the current row
                    hitungPerkiraanPemakaian(
                        idType,
                        satPrimer,
                        satSekunder,
                        satTritier,
                        SaldoPrimer,
                        SaldoSekunder,
                        SaldoTritier,
                        index,
                        selectElement,
                        SubKelompok
                    );
                }
            });
        }
    });

    $("#table_daftarAsalKonversi tbody").on("click", "tr", function () {
        // Get data from the clicked row
        var data = table_daftarAsalKonversi.row(this).data();

        // Check if the first three columns are empty
        if (
            (data[0] == null || data[0] == "") &&
            (data[1] == null || data[1] == "") &&
            (data[2] == null || data[2] == "") &&
            (data[3] == null || data[3] == "")
        ) {
            // Remove the 'selected' class from any previously selected row
            $("#table_daftarAsalKonversi tbody tr").removeClass("selected");

            // Add the 'selected' class to the clicked row
            $(this).addClass("selected");

            // Proceed with the rest of the logic
            if (Array.isArray(data) && data.length > 0) {
                $.ajax({
                    type: "GET",
                    url: "/KonversiSetengahJadi/getDataTypeAsalKonversiKoreksi",
                    data: {
                        _token: csrfToken,
                        IdType: data[5],
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
                            // Clear existing options
                            select_objekAsal.empty(); // Clear options
                            select_kelompokUtamaAsal.empty();
                            select_kelompokAsal.empty();
                            select_subKelompokAsal.empty();
                            select_typeAsal.empty();

                            // Append Objek
                            response[1].forEach((item) => {
                                select_objekAsal.append(
                                    new Option(item.NamaObjek, item.IdObjek)
                                );
                            });

                            // Append Kelompok Utama
                            response[2].forEach((item) => {
                                select_kelompokUtamaAsal.append(
                                    new Option(
                                        item.NamaKelompokUtama,
                                        item.IdKelompokUtama
                                    )
                                );
                            });

                            // Append Kelompok
                            response[3].forEach((item) => {
                                select_kelompokAsal.append(
                                    new Option(
                                        item.namakelompok,
                                        item.idkelompok
                                    )
                                );
                            });

                            // Append SubKelompok
                            response[4].forEach((item) => {
                                select_subKelompokAsal.append(
                                    new Option(
                                        item.NamaSubKelompok,
                                        item.IdSubkelompok
                                    )
                                );
                            });

                            // Append Type
                            response[5].forEach((item) => {
                                select_typeAsal.append(
                                    new Option(item.NamaType, item.IdType)
                                );
                            });

                            select_objekAsal
                                .val(response[0][0].IdObjek)
                                .trigger("change");
                            select_kelompokUtamaAsal
                                .val(response[0][0].IdKelompokUtama)
                                .trigger("change");
                            select_kelompokAsal
                                .val(response[0][0].IdKelompok)
                                .trigger("change");
                            select_subKelompokAsal
                                .val(response[0][0].IdSubkelompok)
                                .trigger("change");
                            select_typeAsal.val(data[5]).trigger("change");
                            jumlah_pemakaianPrimer.value = data[6];
                            satuan_primerJumlahPemakaian.value = data[7];
                            jumlah_pemakaianSekunder.value = data[8];
                            satuan_sekunderJumlahPemakaian.value = data[9];
                            jumlah_pemakaianTritier.value = data[10];
                            satuan_tritierJumlahPemakaian.value = data[11];
                            satuan_saldoTerakhirPrimerAsal.value = data[7];
                            satuan_saldoTerakhirSekunderAsal.value = data[9];
                            satuan_saldoTerakhirTritierAsal.value = data[11];

                            saldo_terakhirPrimerAsal.value = numeral(response[0][0].SaldoPrimer).format("0.00") // prettier-ignore
                            saldo_terakhirSekunderAsal.value = numeral(response[0][0].SaldoSekunder).format("0.00") // prettier-ignore
                            saldo_terakhirTritierAsal.value = numeral(response[0][0].SaldoTritier).format("0.00") // prettier-ignore

                            button_tambahAsalKonversi.disabled = true;
                            button_hapusAsalKonversi.disabled = false;
                            button_updateAsalKonversi.disabled = false;
                            jumlah_pemakaianPrimer.readOnly = false;
                            jumlah_pemakaianSekunder.readOnly = false;
                            jumlah_pemakaianTritier.readOnly = false;

                            jumlah_pemakaianPrimer.readOnly
                                ? jumlah_pemakaianSekunder.readOnly
                                    ? jumlah_pemakaianTritier.focus()
                                    : jumlah_pemakaianSekunder.focus()
                                : jumlah_pemakaianPrimer.focus();

                            if (
                                satuan_primerJumlahPemakaian.value &&
                                satuan_primerJumlahPemakaian.value !== "NULL"
                            ) {
                                jumlah_pemakaianPrimer.readOnly = false;
                                jumlah_pemakaianPrimer.select();
                            } else if (
                                satuan_sekunderJumlahPemakaian.value &&
                                satuan_sekunderJumlahPemakaian.value !== "NULL"
                            ) {
                                jumlah_pemakaianPrimer.value =
                                    numeral(0).format("0.00");
                                jumlah_pemakaianPrimer.readOnly = true;
                                jumlah_pemakaianSekunder.readOnly = false;
                                jumlah_pemakaianSekunder.select();
                            } else {
                                jumlah_pemakaianPrimer.value =
                                    numeral(0).format("0.00");
                                jumlah_pemakaianPrimer.readOnly = true;
                                jumlah_pemakaianSekunder.value =
                                    numeral(0).format("0.00");
                                jumlah_pemakaianSekunder.readOnly = true;
                                jumlah_pemakaianTritier.select();
                            }
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
                    "Terjadi kesalahan saat pilih row table asal konversi, hubungi EDP!"
                );
            }
        }
    });

    jumlah_pemakaianPrimer.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0.00");
            }
            jumlah_pemakaianSekunder.focus();
        }
    });

    jumlah_pemakaianSekunder.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0.00");
            }
            jumlah_pemakaianTritier.focus();
        }
    });

    jumlah_pemakaianTritier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0.00");
            }
            if (button_tambahAsalKonversi.disabled !== false) {
                button_tambahAsalKonversi.focus();
            } else {
                button_updateAsalKonversi.focus();
            }
        }
    });

    button_tambahAsalKonversi.addEventListener("click", function (e) {
        e.preventDefault();
        // Id type Asal dan Tujuan tidak boleh sama
        let checkIdType = true;
        let checkHasilKonversi = true;
        let checkSelectInput = true;

        if (select_typeAsal.val() == select_typeTujuan.val()) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Id Type Asal dan Tujuan tidak boleh sama!",
            });
            checkIdType = false;
        }

        // check quantity asal konversi, apakah sesuai ketentuan
        if (
            (jumlah_pemakaianPrimer.value == 0 &&
                jumlah_pemakaianSekunder.value == 0 &&
                jumlah_pemakaianTritier.value == 0) ||
            (jumlah_pemakaianTritier.value == 0 &&
                satuan_tritierJumlahPemakaian.value.trim() ==
                    satuan_saldoTerakhirTritierAsal.value.trim())
        ) {
            jumlah_pemakaianTritier.select();
            checkHasilKonversi = false;
        }

        if (select_typeTujuan.selectedIndex == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Hasil Konversi tidak boleh kosong!",
            }).then(() => {
                select_objekAsal.select2("open");
            });
            checkSelectInput = false;
        }

        // Check if all inputs are filled
        if (checkIdType && checkHasilKonversi && checkSelectInput) {
            // Array to store the input values

            let inputData = [
                "",
                "",
                "",
                "",
                select_typeAsal.select2("data")[0].text.trim(),
                select_typeAsal.val(),
                jumlah_pemakaianPrimer.value,
                satuan_primerJumlahPemakaian.value,
                jumlah_pemakaianSekunder.value,
                satuan_sekunderJumlahPemakaian.value,
                jumlah_pemakaianTritier.value,
                satuan_tritierJumlahPemakaian.value,
                select_subKelompokAsal.val(),
            ];
            let isDuplicate = false;

            table_daftarAsalKonversi
                .rows()
                .every(function (rowIdx, tableLoop, rowLoop) {
                    let rowData = this.data();

                    // Only check the first and second columns
                    if (rowData[5] == inputData[5]) {
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
                table_daftarAsalKonversi.row.add(inputData);

                const selectIds = [
                    "#select_kelompokUtamaAsal",
                    "#select_kelompokAsal",
                    "#select_subKelompokAsal",
                    "#select_typeAsal",
                ];
                const inputTextIds = [
                    "#saldo_terakhirPrimerAsal",
                    "#satuan_saldoTerakhirPrimerAsal",
                    "#saldo_terakhirSekunderAsal",
                    "#satuan_saldoTerakhirSekunderAsal",
                    "#saldo_terakhirTritierAsal",
                    "#satuan_saldoTerakhirTritierAsal",
                    "#jumlah_pemakaianPrimer",
                    "#satuan_primerJumlahPemakaian",
                    "#jumlah_pemakaianSekunder",
                    "#satuan_sekunderJumlahPemakaian",
                    "#jumlah_pemakaianTritier",
                    "#satuan_tritierJumlahPemakaian",
                ];
                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());

                    if (id !== "#select_divisiTujuan") {
                        $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                    }
                });

                select_objekAsal.val(null).trigger("change");
                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                table_daftarAsalKonversi.draw();
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

        if (select_typeAsal.val() == select_typeTujuan.val()) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Id Type Asal dan Tujuan tidak boleh sama!",
            });
            checkIdType = false;
        }

        // check quantity asal konversi, apakah sesuai ketentuan
        if (
            (jumlah_pemakaianPrimer.value == 0 &&
                jumlah_pemakaianSekunder.value == 0 &&
                jumlah_pemakaianTritier.value == 0) ||
            (jumlah_pemakaianTritier.value == 0 &&
                satuan_tritierJumlahPemakaian.value.trim() ==
                    satuan_saldoTerakhirTritierAsal.value.trim())
        ) {
            jumlah_pemakaianTritier.select();
            checkHasilKonversi = false;
        }

        if (select_typeTujuan.selectedIndex == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Hasil Konversi tidak boleh kosong!",
            }).then(() => {
                select_objekAsal.select2("open");
            });
            checkSelectInput = false;
        }

        // Check if all inputs are filled
        if (checkIdType && checkHasilKonversi && checkSelectInput) {
            // Array to store the input values
            let inputData = [
                "",
                "",
                "",
                "",
                select_typeAsal.select2("data")[0].text.trim(),
                select_typeAsal.val(),
                jumlah_pemakaianPrimer.value,
                satuan_primerJumlahPemakaian.value,
                jumlah_pemakaianSekunder.value,
                satuan_sekunderJumlahPemakaian.value,
                jumlah_pemakaianTritier.value,
                satuan_tritierJumlahPemakaian.value,
                select_subKelompokAsal.val(),
            ];
            let isDuplicate = false;

            table_daftarAsalKonversi
                .rows(":not(.selected)") // Select rows that do not have the 'selected' class
                .every(function (rowIdx, tableLoop, rowLoop) {
                    let rowData = this.data();

                    // Only check the first and second columns
                    if (rowData[5] == inputData[5]) {
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
                const selectedRow = table_daftarAsalKonversi.row(".selected");

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
                    "#select_kelompokUtamaAsal",
                    "#select_kelompokAsal",
                    "#select_subKelompokAsal",
                    "#select_typeAsal",
                ];
                const inputTextIds = [
                    "#saldo_terakhirPrimerAsal",
                    "#satuan_saldoTerakhirPrimerAsal",
                    "#saldo_terakhirSekunderAsal",
                    "#satuan_saldoTerakhirSekunderAsal",
                    "#saldo_terakhirTritierAsal",
                    "#satuan_saldoTerakhirTritierAsal",
                    "#jumlah_pemakaianPrimer",
                    "#satuan_primerJumlahPemakaian",
                    "#jumlah_pemakaianSekunder",
                    "#satuan_sekunderJumlahPemakaian",
                    "#jumlah_pemakaianTritier",
                    "#satuan_tritierJumlahPemakaian",
                ];
                // Loop through each select element
                selectIds.forEach((id) => {
                    const $select = $(id);
                    // Select the disabled option
                    $select.val($select.find("option[disabled]").val());
                    $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                });

                select_objekAsal.val(null).trigger("change");
                // Clear all input text fields
                inputTextIds.forEach((id) => {
                    $(id).val("");
                });
                table_daftarAsalKonversi.draw();
            }

            // Remove the 'selected' class from any previously selected row
            $("#table_daftarAsalKonversi tbody tr").removeClass("selected");
            button_tambahAsalKonversi.disabled = false;
            button_updateAsalKonversi.disabled = true;
            button_hapusAsalKonversi.disabled = true;
        } else {
            Swal.fire("Pemberitahuan", "Ada kolom yang belum terisi", "info");
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
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        // If user confirms, delete the selected row
                        selectedRow.remove().draw(false);
                        const selectIds = [
                            "#select_kelompokUtamaAsal",
                            "#select_kelompokAsal",
                            "#select_subKelompokAsal",
                            "#select_typeAsal",
                        ];
                        const inputTextIds = [
                            "#saldo_terakhirPrimerAsal",
                            "#satuan_saldoTerakhirPrimerAsal",
                            "#saldo_terakhirSekunderAsal",
                            "#satuan_saldoTerakhirSekunderAsal",
                            "#saldo_terakhirTritierAsal",
                            "#satuan_saldoTerakhirTritierAsal",
                            "#jumlah_pemakaianPrimer",
                            "#satuan_primerJumlahPemakaian",
                            "#jumlah_pemakaianSekunder",
                            "#satuan_sekunderJumlahPemakaian",
                            "#jumlah_pemakaianTritier",
                            "#satuan_tritierJumlahPemakaian",
                        ];
                        selectIds.forEach((id) => {
                            const $select = $(id);
                            // Select the disabled option
                            $select.val($select.find("option[disabled]").val());
                            // $select.prop("disabled", true);
                            $select.find("option:not(:disabled)").remove(); // Remove all options except the disabled one
                        });

                        // Clear all input text fields
                        inputTextIds.forEach((id) => {
                            $(id).val("");
                        });

                        // Remove the 'selected' class from any previously selected row
                        $("#table_daftarAsalKonversi tbody tr").removeClass(
                            "selected"
                        );

                        if (table_daftarAsalKonversi.data().length < 1) {
                            button_modalProses.disabled = true;
                        }
                        // Force the table to refresh its internal data
                        table_daftarAsalKonversi.rows().draw();

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
                    button_tambahAsalKonversi.disabled = false;
                    button_updateAsalKonversi.disabled = true;
                    button_hapusAsalKonversi.disabled = true;
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
        e.preventDefault();
        let rowKosong = false;
        let barisKe = 0;

        table_daftarAsalKonversi
            .rows()
            .every(function (rowIdx, tableLoop, rowLoop) {
                let rowData = this.data();
                if (rowData[3] > 0 && rowData[5] == "") {
                    rowKosong = true; // Check for empty column
                    barisKe = rowIdx;
                    return false; // Stop iteration if a match is found
                }
            });

        if (
            (select_typeTujuan.val() &&
                (jumlah_pemasukanPrimer.value < 1 ||
                    jumlah_pemasukanSekunder.value < 1 ||
                    jumlah_pemasukanTritier < 1)) ||
            rowKosong
        ) {
            Swal.fire(
                "Pemberitahuan",
                "Harap isi form sesuai ketentuan.",
                "info"
            );
            return;
        } else {
            submitPermohonan();
        }
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalACC").data("id", rowID);
        document.getElementById("detailKonversiModalLabel").innerHTML =
            "Detail Permohonan Konversi " + rowID;
        $.ajax({
            url: "/KonversiSetengahJadi/getDetailKonversi",
            type: "GET",
            data: {
                idKonversi: rowID,
                idDivisi: "JBB",
            },
            success: function (response) {
                // Assuming your server returns an array of objects for the table data

                if (response && Array.isArray(response)) {
                    // Filter data for Asal Konversi Potong JBB
                    var asalData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Asal Konversi Setengah Jadi JBB"
                        );
                    });

                    // Filter data for Tujuan Konversi Potong JBB
                    var tujuanData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Tujuan Konversi Setengah Jadi JBB"
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
                    url: "/KonversiSetengahJadi/BatalACCDataKonversi",
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

    $(document).on("click", ".btn-acc", function (e) {
        //lakukan print barcode di sini
        e.preventDefault();
        let idkonversi = $(this).data("id");
        $.ajax({
            type: "POST",
            url: "/KonversiSetengahJadi",
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
                    // Extract values from the response
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
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (
                                    mutation.type === "attributes" &&
                                    mutation.attributeName === "data-rendered"
                                ) {
                                    // Trigger window.print() when rendering is complete
                                    window.print();
                                    // Stop observing after print is triggered
                                    observer.disconnect();
                                }
                            });
                        });

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
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        }).then(() => {
            getDataPermohonan();
        });
    });
    //#endregion
});
