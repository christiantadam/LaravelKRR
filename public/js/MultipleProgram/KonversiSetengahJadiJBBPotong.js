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
                targets: 4, // Targeting the 5th column (0-based index for "Id Type Inventory")
                render: function (data, type, row, meta) {
                    if (type === "display") {
                        // Add a unique identifier for each select
                        return `<select class="inventory-type-select" data-row="${meta.row}" style="width: 100%"></select>`;
                    }
                    return data;
                },
            },
        ],
    });
    let inventoryTypes = [];
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); // prettier-ignore
    let divisiUser = document.getElementById("divisiUser"); // prettier-ignore
    let nomorUser = document.getElementById("nomorUser"); // prettier-ignore
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi"); // prettier-ignore
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
    //#endregion

    //#region Setup Form
    $("#machineGrouping").select2();
    //#endregion

    //#region add event listener
    button_tambahKonversi.addEventListener("click", function () {
        $("#tambahTujuanModal").modal("show");
    });

    // Load customer options and initialize Select2 when modal is shown
    $("#tambahTujuanModal").on("shown.bs.modal", function (event) {
        const kodeBarangSelect = $("#kodeBarangSelect");
        const select_divisiAsal = $("#select_divisiAsal");
        const select_divisiTujuan = $("#select_divisiTujuan");
        const customerSelect = $("#customerSelect");

        // Clear existing options and add placeholder
        table_daftarAsalKonversi.clear().draw();
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
        select_divisiAsal.val(null).trigger("change");
        select_divisiTujuan.val(null).trigger("change");

        // Initializing select element
        kodeBarangSelect.select2({
            dropdownParent: $("#tambahTujuanModal"),
            placeholder: "Pilih Kode Barang",
        });
        select_divisiAsal.select2({
            dropdownParent: $("#tambahTujuanModal"),
            placeholder: "Pilih Divisi Asal",
        });
        select_divisiTujuan.select2({
            dropdownParent: $("#tambahTujuanModal"),
            placeholder: "Pilih Divisi Tujuan",
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
                    dropdownParent: $("#tambahTujuanModal"),
                    placeholder: "Pilih Customer",
                });
            },
            error: function () {
                Swal.showValidationMessage("Failed to load customer data.");
            },
        });

        // Handle customer selection to populate kodeBarangSelect
        customerSelect.on("select2:select", function () {
            // Check if 'Divisi Asal' is selected
            if (select_divisiAsal.prop("selectedIndex") <= 0) {
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
                                new Option(
                                    barang.kode_barang,
                                    barang.kode_barang
                                )
                            );
                        });
                        kodeBarangSelect.select2({
                            dropdownParent: $("#tambahTujuanModal"),
                            placeholder: "Pilih Kode Barang",
                        });
                    }
                },
                error: function () {
                    Swal.showValidationMessage(
                        "Failed to load Kode Barang data."
                    );
                },
            });
        });

        // Handle kodeBarang selection to load Komponen Barang data
        $("#kodeBarangSelect").on("select2:select", function () {
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
                            item.Panjang_Potongan + " X " + item.Lebar_Potongan,
                            item.Quantity,
                            "", // Placeholder for the select dropdown
                            "",
                            "",
                            "",
                            "",
                        ]);

                        // Fetch specific options for this row's dropdown
                        $.ajax({
                            url: "/KonversiSetengahJadi/getInventoryTypes",
                            method: "GET",
                            data: {
                                panjangLebar:
                                    item.Panjang_Potongan +
                                    "X" +
                                    item.Lebar_Potongan,
                                kodeBarang: selectedKodeBarang,
                                kodeKomponen: item.Kode_Komponen,
                                divisi: select_divisiAsal.val(),
                            },
                            dataType: "json",
                            success: function (optionsData) {
                                // Populate the select element with the options
                                let select = $(
                                    `#table_daftarAsalKonversi .inventory-type-select[data-row="${rowIndex}"]`
                                );
                                optionsData.forEach((option) => {
                                    select.append(
                                        new Option(option.name, option.id)
                                    );
                                });

                                // Initialize Select2 on the populated dropdown
                                select.select2({
                                    placeholder: "Select an option",
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
    });
    //#endregion
});
