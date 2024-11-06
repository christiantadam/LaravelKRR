$(document).ready(function () {
    //#region Get element by ID
    let table_daftarKonversi = $("#table_daftarKonversi").DataTable({
        processing: true,
        responsive: true,
        ordering: false,
        autoWidth: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "KodeBarangJBB" },
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
        ],
        // Redraw the select elements on each page change
        drawCallback: function () {
            populateSelectElements();
            setupDropdownChangeListener();
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
    let inventoryTypes = [];
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let divisiUser = document.getElementById("divisiUser"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser"); // prettier-ignore
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi"); // prettier-ignore
    let div_PIBAsal = document.getElementById("div_PIBAsal"); // prettier-ignore
    let PIB_asal = document.getElementById("PIB_asal"); // prettier-ignore
    let div_PIBTujuan = document.getElementById("div_PIBTujuan"); // prettier-ignore
    let PIB_tujuan = document.getElementById("PIB_tujuan"); // prettier-ignore
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore
    let saldo_terakhirPrimerAsal = document.getElementById("saldo_terakhirPrimerAsal"); // prettier-ignore
    let satuan_saldoTerakhirPrimerAsal = document.getElementById("satuan_saldoTerakhirPrimerAsal"); // prettier-ignore
    let saldo_terakhirSekunderAsal = document.getElementById("saldo_terakhirSekunderAsal"); // prettier-ignore
    let satuan_saldoTerakhirSekunderAsal = document.getElementById("satuan_saldoTerakhirSekunderAsal"); // prettier-ignore
    let saldo_terakhirTritierAsal = document.getElementById("saldo_terakhirTritierAsal"); // prettier-ignore
    let satuan_saldoTerakhirTritierAsal = document.getElementById("satuan_saldoTerakhirTritierAsal"); // prettier-ignore
    let jumlah_pemakaianPrimer = document.getElementById("jumlah_pemakaianPrimer"); // prettier-ignore
    let satuan_primerJumlahPemakaian = document.getElementById("satuan_primerJumlahPemakaian"); // prettier-ignore
    let jumlah_pemakaianSekunder = document.getElementById("jumlah_pemakaianSekunder"); // prettier-ignore
    let satuan_sekunderJumlahPemakaian = document.getElementById("satuan_sekunderJumlahPemakaian"); // prettier-ignore
    let jumlah_pemakaianTritier = document.getElementById("jumlah_pemakaianTritier"); // prettier-ignore
    let satuan_tritierJumlahPemakaian = document.getElementById("satuan_tritierJumlahPemakaian"); // prettier-ignore
    let saldo_terakhirTujuanPrimer = document.getElementById("saldo_terakhirTujuanPrimer"); // prettier-ignore
    let satuan_saldoTerakhirTujuanPrimer = document.getElementById("satuan_saldoTerakhirTujuanPrimer"); // prettier-ignore
    let saldo_terakhirTujuanSekunder = document.getElementById("saldo_terakhirTujuanSekunder"); // prettier-ignore
    let satuan_saldoTerakhirTujuanSekunder = document.getElementById("satuan_saldoTerakhirTujuanSekunder"); // prettier-ignore
    let saldo_terakhirTujuanTritier = document.getElementById("saldo_terakhirTujuanTritier"); // prettier-ignore
    let satuan_saldoTerakhirTujuanTritier = document.getElementById("satuan_saldoTerakhirTujuanTritier"); // prettier-ignore
    let jumlah_pemasukanPrimer = document.getElementById("jumlah_pemasukanPrimer"); // prettier-ignore
    let satuan_primerJumlahPemasukan = document.getElementById("satuan_primerJumlahPemasukan"); // prettier-ignore
    let jumlah_pemasukanSekunder = document.getElementById("jumlah_pemasukanSekunder"); // prettier-ignore
    let satuan_sekunderJumlahPemasukan = document.getElementById("satuan_sekunderJumlahPemasukan"); // prettier-ignore
    let jumlah_pemasukanTritier = document.getElementById("jumlah_pemasukanTritier"); // prettier-ignore
    let satuan_tritierJumlahPemasukan = document.getElementById("satuan_tritierJumlahPemasukan"); // prettier-ignore
    let button_tambahTujuanKonversi = document.getElementById(
        "button_tambahTujuanKonversi"
    );
    let button_updateTujuanKonversi = document.getElementById(
        "button_updateTujuanKonversi"
    );
    let button_hapusTujuanKonversi = document.getElementById(
        "button_hapusTujuanKonversi"
    );
    const customerSelect = $("#customerSelect");
    const kodeBarangSelect = $("#kodeBarangSelect");
    const select_divisi = $("#select_divisi");
    const select_objekAsal = $("#select_objekAsal");
    const select_objekTujuan = $("#select_objekTujuan");
    const select_kelompokUtamaAsal = $("#select_kelompokUtamaAsal");
    const select_kelompokUtamaTujuan = $("#select_kelompokUtamaTujuan");
    const select_kelompokAsal = $("#select_kelompokAsal");
    const select_kelompokTujuan = $("#select_kelompokTujuan");
    const select_subKelompokAsal = $("#select_subKelompokAsal");
    const select_subKelompokTujuan = $("#select_subKelompokTujuan");
    const select_typeAsal = $("#select_typeAsal");
    const select_typeTujuan = $("#select_typeTujuan");
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

            if (rowData[5]) {
                // Assuming column index 5 is the column next to the select
                // Skip populating this select element if there's already a value in the next column
                return;
            }
            // Calculate panjangLebar and namaKomponen from rowData
            let panjangLebar =
                parseFloat(rowData[2].split(" X ")[0]) +
                "X" +
                parseFloat(rowData[2].split(" X ")[1]);
            let namaKomponen =
                kodeKomponenMap[rowData[0].substring(2, 4)] || rowData[0];

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
                    let select = $(
                        `#table_daftarAsalKonversi .inventory-type-select[data-row="${rowIndex}"]`
                    );
                    select
                        .empty()
                        .append(
                            '<option value="" disabled selected>Pilih Barang</option>'
                        );

                    // Populate select element with options
                    optionsData.forEach((option) => {
                        select.append(
                            new Option(option.NamaType, option.IdType)
                        );
                    });

                    // Initialize Select2
                    select.select2({
                        placeholder:
                            optionsData.length > 0
                                ? "Pilih barang"
                                : "Tidak ada barang",
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
        });
    }

    // Function to handle select change and update next column
    // function setupDropdownChangeListener() {
    //     $("#table_daftarAsalKonversi").off("change", ".inventory-type-select"); // Remove previous event handlers to avoid duplicates
    //     $("#table_daftarAsalKonversi").on(
    //         "change",
    //         ".inventory-type-select",
    //         function () {
    //             let selectedValue = $(this).val();
    //             let rowIndex = $(this).data("row");

    //             // Update the cell in the next column with the selected value
    //             let cell = table_daftarAsalKonversi.cell(rowIndex, 5); // Assuming 5 is the column index next to dropdown
    //             cell.data(selectedValue).draw();
    //         }
    //     );

    // }
    function setupDropdownChangeListener() {
        $("#table_daftarAsalKonversi").off("change", ".inventory-type-select"); // Remove previous event handlers to avoid duplicates
        $("#table_daftarAsalKonversi").on(
            "change",
            ".inventory-type-select",
            function () {
                let selectedValue = $(this).val();
                let rowIndex = $(this).data("row");

                // Update the cell in the next column with the selected value
                let cell = table_daftarAsalKonversi.cell(rowIndex, 5); // Assuming 5 is the column index next to dropdown
                // cell.data(selectedValue).draw();

                // Update the cell in the next column with the selected value
                let nextRowIndex = rowIndex + 1;
                let totalRows = table_daftarAsalKonversi.rows().count();
                let rowsPerPage = table_daftarAsalKonversi.page.info().length;
                let currentPage = table_daftarAsalKonversi.page.info().page;
                let lastRowOnPage = (currentPage + 1) * rowsPerPage - 1;

                if (nextRowIndex < totalRows) {
                    let isNextRowOnCurrentPage = nextRowIndex <= lastRowOnPage;

                    if (isNextRowOnCurrentPage) {
                        // Focus the next row's select element after a short delay
                        setTimeout(() => {
                            let rowNode = table_daftarAsalKonversi
                                .row(nextRowIndex)
                                .node();
                            let nextSelectElement = $(rowNode)
                                .find(".inventory-type-select")
                                .eq(0);

                            if (nextSelectElement.length) {
                                nextSelectElement.select2("open");
                            }
                        }, 200); // Adjust delay as needed
                    } else {
                        // Move to the next page and open the first select on that page after a delay
                        table_daftarAsalKonversi.page("next").draw("page");

                        table_daftarAsalKonversi.one("draw", function () {
                            setTimeout(() => {
                                let firstRowOnNextPage =
                                    table_daftarAsalKonversi.row(0).node();
                                let firstSelectOnNextPage = $(
                                    firstRowOnNextPage
                                )
                                    .find(".inventory-type-select")
                                    .eq(0);

                                if (firstSelectOnNextPage.length) {
                                    firstSelectOnNextPage.select2("open");
                                }
                            }, 200); // Adjust delay as needed
                        });
                    }
                }
            }
        );
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

    //#endregion

    //#region Setup Form

    //#endregion

    //#region add event listener
    button_tambahKonversi.addEventListener("click", function () {
        $("#tambahTujuanModal").modal("show");
    });

    // Load customer options and initialize Select2 when modal is shown
    $("#tambahTujuanModal").on("shown.bs.modal", function (event) {
        table_daftarAsalKonversi.clear().draw(); //Clear Table
        document
            .querySelectorAll("#tambahTujuanModal input")
            .forEach((input) => {
                input.value = "";
            });

        initializeSelectElement("showModal"); //Initialize all select element inside modal
        clearSelectElement("showModal");
        select_divisi.val(null).trigger("change"); // Clear selected index for select_divisi

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
                Swal.showValidationMessage("Failed to load customer data.");
            },
        }).then(() => {
            setTimeout(() => {
                select_divisi.select2("open");
            }, 200);

            const InputIds = [
                "jumlah_pemasukanTritier",
                "jumlah_pemasukanSekunder",
                "jumlah_pemasukanPrimer",
            ];

            function getNextFocusableElement(currentElement) {
                // Find the next focusable element in the form
                if (currentElement.id === "jumlah_pemasukanTritier") {
                    // Locate the select2 element within the table by class and row
                    let row = table_daftarAsalKonversi.row(0).node(); // Adjust the row index if necessary
                    let selectElement = $(row)
                        .find(".inventory-type-select")
                        .eq(0);

                    if (selectElement.length) {
                        selectElement.select2("open");
                        return selectElement[0]; // Return the select2 element to keep focus on it
                    }
                }

                if (currentElement.id === "jumlah_pemakaianTritier") {
                    return button_tambahTujuanKonversi.disabled
                        ? document.getElementById("button_updateTujuanKonversi")
                        : document.getElementById(
                              "button_tambahTujuanKonversi"
                          );
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

    select_divisi.on("select2:select", function () {
        const selectedDivisiAsal = $(this).val(); // Get selected Divisi Asal
        // initializeSelectElement("pilihDivisi");
        customerSelect.val(null).trigger("change");
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
                    Swal.showValidationMessage(
                        "Tidak ada Objek untuk divisi: " +
                            $("#select_divisi option:selected").text()
                    );
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
                Swal.showValidationMessage("Failed to load Objek data.");
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
                Swal.showValidationMessage("Failed to load Kode Barang data.");
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

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompokUtama",
            method: "GET",
            data: { objek: selectedObjekAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekAsal option:selected").text()
                    );
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
                Swal.showValidationMessage(
                    "Failed to load Kelompok Utama data."
                );
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

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompokUtama",
            method: "GET",
            data: { objek: selectedObjekTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekAsal option:selected").text()
                    );
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
                Swal.showValidationMessage(
                    "Failed to load Kelompok Utama data."
                );
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
        // Clear and reset kodeBarangSelect options
        clearSelectElement("pilihKelompokUtamaAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompok",
            method: "GET",
            data: { kelompokUtama: selectedKelompokUtamaAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $(
                                "#select_kelompokUtamaAsal option:selected"
                            ).text()
                    );
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
                Swal.showValidationMessage("Failed to load Kelompok data.");
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
        clearSelectElement("pilihKelompokUtamaAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompok",
            method: "GET",
            data: { kelompokUtama: selectedKelompokUtamaTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $(
                                "#select_kelompokUtamaTujuan option:selected"
                            ).text()
                    );
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
                Swal.showValidationMessage("Failed to load Kelompok data.");
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

        // Clear and reset kodeBarangSelect options
        clearSelectElement("pilihKelompokAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getSubKelompok",
            method: "GET",
            data: { kelompok: selectedKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokAsal option:selected").text()
                    );
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
                Swal.showValidationMessage("Failed to load Sub Kelompok data.");
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

        // Clear and reset kodeBarangSelect options
        clearSelectElement("pilihKelompokTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getSubKelompok",
            method: "GET",
            data: { kelompok: selectedKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokTujuan option:selected").text()
                    );
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
                Swal.showValidationMessage("Failed to load Sub Kelompok data.");
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

        // Clear and reset kodeBarangSelect options
        clearSelectElement("pilihSubKelompokAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getType",
            method: "GET",
            data: { subKelompok: selectedSubKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Type untuk Sub Kelompok: " +
                            $("#select_subKelompokAsal option:selected").text()
                    );
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
                Swal.showValidationMessage("Failed to load Type data.");
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

        // Clear and reset kodeBarangSelect options
        clearSelectElement("pilihSubKelompokTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getType",
            method: "GET",
            data: { subKelompok: selectedSubKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Type untuk Sub Kelompok: " +
                            $(
                                "#select_subKelompokTujuan option:selected"
                            ).text()
                    );
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
                Swal.showValidationMessage("Failed to load Type data.");
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
                console.log(data, selectedIdType);

                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Data Type untuk Id Type: " +
                            $("#select_typeAsal option:selected").val()
                    );
                } else {
                    saldo_terakhirPrimerAsal.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirPrimerAsal.value = data[0].satPrimer.trim(); // prettier-ignore
                    saldo_terakhirSekunderAsal.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirSekunderAsal.value = data[0].satSekunder.trim(); // prettier-ignore
                    saldo_terakhirTritierAsal.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirTritierAsal.value =data[0].satTritier.trim(); // prettier-ignore
                    satuan_primerJumlahPemakaian.value = data[0].satPrimer.trim(); // prettier-ignore
                    satuan_sekunderJumlahPemakaian.value = data[0].satSekunder.trim(); // prettier-ignore
                    satuan_tritierJumlahPemakaian.value = data[0].satTritier.trim(); // prettier-ignore
                }
            },
            error: function () {
                Swal.showValidationMessage("Failed to load Type data.");
            },
        }).then(() => {
            // check satuan_sekunderAsal if null then hasil = 0
            // jumlah_pemasukanPrimer
            // jumlah_pemasukanSekunder
            // jumlah_pemasukanTritier
            if (satuan_sekunderJumlahPemakaian.value !== "NULL") {
                jumlah_pemakaianSekunder.readOnly = false;
                jumlah_pemakaianSekunder.focus();
            } else {
                jumlah_pemakaianSekunder.value = numeral(0).format("0.00"); // prettier-ignore
                jumlah_pemakaianSekunder.readOnly = true;
                jumlah_pemakaianTritier.focus();
            }
            // check satuan_primerTujuan if null then hasil = 0
            if (satuan_primerJumlahPemakaian.value !== "NULL") {
                jumlah_pemakaianPrimer.readOnly = false;
                jumlah_pemakaianPrimer.focus();
            } else {
                jumlah_pemakaianPrimer.value = numeral(0).format("0.00"); // prettier-ignore
                jumlah_pemakaianPrimer.readOnly = true;
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
                console.log(data, selectedIdType);

                if (data.length === 0) {
                    Swal.showValidationMessage(
                        "Tidak ada Data Type untuk Id Type: " +
                            $("#select_typeTujuan option:selected").val()
                    );
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
                }
            },
            error: function () {
                Swal.showValidationMessage("Failed to load Type data.");
            },
        }).then(() => {
            // check satuan_sekunderTujuan if null then hasil = 0
            // jumlah_pemasukanPrimer
            // jumlah_pemasukanSekunder
            // jumlah_pemasukanTritier
            if (satuan_sekunderJumlahPemasukan.value !== "NULL") {
                jumlah_pemasukanSekunder.readOnly = false;
                jumlah_pemasukanSekunder.focus();
            } else {
                jumlah_pemasukanSekunder.value = numeral(0).format("0.00"); // prettier-ignore
                jumlah_pemasukanSekunder.readOnly = true;
                jumlah_pemasukanTritier.focus();
            }
            // check satuan_primerTujuan if null then hasil = 0
            if (satuan_primerJumlahPemasukan.value !== "NULL") {
                jumlah_pemasukanPrimer.readOnly = false;
                jumlah_pemasukanPrimer.focus();
            } else {
                jumlah_pemasukanPrimer.value = numeral(0).format("0.00"); // prettier-ignore
                jumlah_pemasukanPrimer.readOnly = true;
            }
        });
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
            Swal.fire("Pemberitahuan", "Ada kolom yang belum terisi", "info");
        }
    });
    button_updateTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();
    });
    button_hapusTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();
    });
    //#endregion
});
