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
    let tambahTujuanModal = document.getElementById("tambahTujuanModal"); // prettier-ignore
    const customerSelect = $("#customerSelect");
    const kodeBarangSelect = $("#kodeBarangSelect");
    const select_divisi = $("#select_divisi");
    const select_objekAsal = $("#select_objekAsal");
    const select_kelompokUtamaAsal = $("#select_kelompokUtamaAsal");
    const select_kelompokAsal = $("#select_kelompokAsal");
    const select_subKelompokAsal = $("#select_subKelompokAsal");
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
                cell.data(selectedValue).draw();
            }
        );
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
        // Clear existing options and add placeholder
        table_daftarAsalKonversi.clear().draw();
        select_divisi.val(null).trigger("change");
        customerSelect
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Customer</option>'
            );
        kodeBarangSelect
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kode Barang</option>'
            );
        select_objekAsal
            .empty()
            .append('<option value="" disabled selected>Pilih Objek</option>');
        select_kelompokUtamaAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok Utama</option>'
            );
        select_kelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok</option>'
            );
        select_subKelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Sub Kelompok</option>'
            );
        select_typeAsal
            .empty()
            .append('<option value="" disabled selected>Pilih Type</option>');
        select_typeTujuan
            .empty()
            .append('<option value="" disabled selected>Pilih Type</option>');

        // Initializing select element
        kodeBarangSelect.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Kode Barang",
        });
        select_divisi.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Divisi Asal",
        });
        select_objekAsal.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Objek Asal",
        });
        select_kelompokUtamaAsal.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Kelompok Utama",
        });
        select_kelompokAsal.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Kelompok",
        });
        select_subKelompokAsal.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Sub Kelompok",
        });
        select_typeAsal.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Type",
        });
        select_typeTujuan.select2({
            dropdownParent: $(".modal-body"),
            placeholder: "Pilih Type",
        });

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
        });
    });

    select_divisi.on("select2:select", function () {
        const selectedDivisiAsal = $(this).val(); // Get selected Divisi Asal

        customerSelect.val(null).trigger("change");
        select_objekAsal
            .empty()
            .append('<option value="" disabled selected>Pilih Objek</option>');
        kodeBarangSelect
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kode Barang</option>'
            );
        select_kelompokUtamaAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok Utama</option>'
            );
        select_kelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok</option>'
            );
        select_subKelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Sub Kelompok</option>'
            );

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
                    });
                    select_objekAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Objek",
                    });
                }
            },
            error: function () {
                Swal.showValidationMessage("Failed to load Objek data.");
            },
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

        // Clear and reset kodeBarangSelect options
        select_kelompokUtamaAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok Utama</option>'
            );
        select_kelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok</option>'
            );
        select_subKelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Sub Kelompok</option>'
            );

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
                    select_kelompokUtamaAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Kelompok Utama",
                    });
                    select_kelompokAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Kelompok",
                    });
                    select_subKelompokAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Sub Kelompok",
                    });
                }
            },
            error: function () {
                Swal.showValidationMessage(
                    "Failed to load Kelompok Utama data."
                );
            },
        });
    });

    select_kelompokUtamaAsal.on("select2:select", function () {
        const selectedKelompokUtamaAsal = $(this).val(); // Get selected Divisi Asal

        // Clear and reset kodeBarangSelect options
        select_kelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Kelompok</option>'
            );
        select_subKelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Sub Kelompok</option>'
            );

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
                    select_kelompokAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Kelompok",
                    });
                    select_subKelompokAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Sub Kelompok",
                    });
                }
            },
            error: function () {
                Swal.showValidationMessage("Failed to load Kelompok data.");
            },
        });
    });

    select_kelompokAsal.on("select2:select", function () {
        const selectedKelompokAsal = $(this).val(); // Get selected Divisi Asal

        // Clear and reset kodeBarangSelect options
        select_subKelompokAsal
            .empty()
            .append(
                '<option value="" disabled selected>Pilih Sub Kelompok</option>'
            );

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
                    select_subKelompokAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Sub Kelompok",
                    });
                }
            },
            error: function () {
                Swal.showValidationMessage("Failed to load Sub Kelompok data.");
            },
        });
    });

    select_subKelompokAsal.on("select2:select", function () {
        const selectedSubKelompokAsal = $(this).val(); // Get selected Divisi Asal

        // Clear and reset kodeBarangSelect options
        select_typeAsal
            .empty()
            .append('<option value="" disabled selected>Pilih Type</option>');

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
                    select_typeAsal.select2({
                        dropdownParent: $(".modal-body"),
                        placeholder: "Pilih Type",
                    });
                }
            },
            error: function () {
                Swal.showValidationMessage("Failed to load Type data.");
            },
        });
    });
    //#endregion
});
