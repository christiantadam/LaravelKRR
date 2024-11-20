let nama_barang = document.getElementById("nama_barang");
let kode_barang = document.getElementById("kode_barang");
let jumlah_tritier = document.getElementById("jumlah_tritier");
let keterangan = document.getElementById("keterangan");
let status_lanjut = document.getElementById("status_lanjut");
let button_tambahLogMaintenance = document.getElementById("button_tambahLogMaintenance"); // prettier-ignore
let jenis_maintenance_penggantian = document.getElementById("jenis_maintenance_penggantian") // prettier-ignore
const mesin = $("#mesin");
const nama_sparepart = $("#nama_sparepart");
const jenis_maintenance = $("#jenis_maintenance");

function initializeDatatable() {}

function initializeSelectElement(tipeInitialisasi) {
    let selectElements = getSelectElementsByType(tipeInitialisasi);
    selectElements.forEach(({ element, placeholder }) => {
        element.select2({
            dropdownParent: $("#form_tambahLogMaintenanceMesin"),
            placeholder: placeholder,
        });
    });
    if (tipeInitialisasi === "initializeModal") {
        mesin.select2({
            dropdownParent: $("#form_tambahLogMaintenanceMesin"),
            placeholder: "Pilih Mesin",
        });
        jenis_maintenance.select2({
            dropdownParent: $("#form_tambahLogMaintenanceMesin"),
            placeholder: "Pilih Jenis Maintenance",
        });
        mesin.val(null).trigger("change");
        jenis_maintenance.val(null).trigger("change");
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
        initializeModal: [
            { element: nama_sparepart, placeholder: "Pilih Sparepart" },
        ],
    };

    return elementSets[tipeInitialisasi] || [];
}

$(document).ready(function () {
    // Initialize DataTable
    $.ajax({
        url: "/SparepartMesin/StatusPartMesinOverall",
        type: "GET",
        success: function (response) {
            // Clear the DataTable and add the new data
            table_mesin.clear().rows.add(response.data).draw();
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", error);
        },
    });

    var table_mesin = $("#table_mesin").DataTable({
        processing: true,
        responsive: true,
        autoWidth: false,
        data: [], // The data will be populated via AJAX
        columns: [
            { data: "Nama_mesin" }, // Machine Name
            { data: "SparepartCount" }, // Spare Part Count
            {
                data: "DurabilityPercentage",
                render: function (data, type, row) {
                    return parseFloat(data).toFixed(2); // Format to two decimal places
                },
            },
        ],
        columnDefs: [
            {
                targets: 2,
                createdCell: function (td, cellData, rowData, row, col) {
                    // Append a canvas element only once per cell
                    if (rowData) {
                        if (parseFloat(cellData) > 0) {
                            $(td).html(
                                '<canvas class="performance-chart" width="200" height="30"></canvas>'
                            );
                        }
                    }
                },
                width: "200px",
            },
        ],
        drawCallback: function (settings) {
            // After the table is drawn, initialize Chart.js for each row
            $("#table_mesin tbody tr").each(function (index) {
                var $tr = $(this);

                // Check if a canvas element exists in the row
                var $canvas = $tr.find("canvas");
                if ($canvas.length > 0) {
                    // Access the row's data from DataTables' settings object
                    var rowData = settings.aoData[$tr.index()]._aData;
                    var durability = parseFloat(rowData.DurabilityPercentage); // Get DurabilityPercentage directly from row data

                    var ctx = $canvas[0].getContext("2d");

                    // Initialize Chart.js for each canvas
                    new Chart(ctx, {
                        type: "bar",
                        data: {
                            labels: ["Durability"],
                            datasets: [
                                {
                                    data: [durability],
                                    backgroundColor: ["#00FF00"],
                                },
                            ],
                        },
                        options: {
                            responsive: false,
                            indexAxis: "y", // Horizontal bar
                            elements: {
                                bar: {
                                    borderSkipped: false, // Avoid edges being cut off
                                },
                            },
                            scales: {
                                x: {
                                    max: 100, // Set the maximum to 100%
                                    display: false,
                                },
                                y: {
                                    display: false,
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: false,
                                },
                            },
                        },
                        plugins: [ChartDataLabels],
                    });
                }
            });
        },
    });

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

    button_tambahLogMaintenance.addEventListener("click", function (event) {
        event.preventDefault();
        $("#staticBackdrop").modal("show");
    });

    $("#staticBackdrop").on("shown.bs.modal", function (event) {
        clearSelectElement("initializeModal");
        initializeSelectElement("initializeModal"); //Initialize Form
        setTimeout(() => {
            mesin.select2("open");
        }, 200);
    });

    mesin.on("select2:select", function () {
        setTimeout(() => {
            jenis_maintenance.select2("open");
        }, 200);
    });

    jenis_maintenance.on("select2:select", function () {
        if (mesin.prop("selectedIndex") <= 0) {
            Swal.fire("Warning", "Please select 'Mesin' first.", "warning");
            jenis_maintenance.val(null).trigger("change");
            return; // Exit if 'Mesin' is not selected
        }
        const selectedJenisMaintenance = $(this).val(); // Get selected Jenis Maintenance
        const selectedMesin = mesin.val(); // Get selected Mesin

        if (selectedJenisMaintenance === "Ganti Sparepart") {
            jenis_maintenance_penggantian.style.display = "block";
            nama_sparepart
                .empty()
                .append(
                    '<option value="" disabled selected>Pilih Sparepart</option>'
                );
            $.ajax({
                url: "/SparepartMesin/selectNamaSparepart",
                method: "GET",
                data: { Id_Mesin: selectedMesin }, // Pass Kode_Customer to the server
                dataType: "json",
                success: function (data) {
                    if (data.length === 0) {
                        Swal.showValidationMessage(
                            "Tidak ada Sparepart untuk mesin: " +
                                $("#mesin option:selected").text()
                        );
                    } else {
                        // data.forEach(function (barang) {
                        //     kodeBarangSelect.append(
                        //         new Option(
                        //             barang.kode_barang,
                        //             barang.kode_barang
                        //         )
                        //     );
                        // });
                        nama_sparepart.select2({
                            dropdownParent: $("#form_tambahLogMaintenanceMesin"),
                            placeholder: "Pilih Sparepart",
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load data Sparepart.",
                    });
                },
            }).then(() => {
                setTimeout(() => {
                    nama_sparepart.select2("open");
                }, 200);
            });
        } else {
            jenis_maintenance_penggantian.style.display = "none";
            keterangan.focus();
        }
    });

    nama_sparepart.on("select2:select", function () {
        const selectedNamaSparepart = $(this).val(); // Get selected Jenis Maintenance
        setTimeout(() => {
            jenis_maintenance.select2("open");
        }, 200);
    });
});
