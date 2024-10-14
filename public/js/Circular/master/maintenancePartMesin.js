let mesin = document.getElementById("mesin");
let nama_sparepart = document.getElementById("nama_sparepart");
let nama_barang = document.getElementById("nama_barang");
let kode_barang = document.getElementById("kode_barang");
let jumlah_tritier = document.getElementById("jumlah_tritier");
let keterangan = document.getElementById("keterangan");
let status_lanjut = document.getElementById("status_lanjut");
let button_tambahLogMaintenance = document.getElementById("button_tambahLogMaintenance"); // prettier-ignore

function init() {
    // addTxtListener(mesin,
    //     nama_sparepart,
    //     nama_barang,
    //     kode_barang,
    //     jumlah_tritier,
    //     keterangan,
    //     status_lanjut);
    // prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);
    // btnIsi.focus();
    $("#mesin").select2({
        templateSelection: function (selectedOption) {
            if (selectedOption.text) {
                return selectedOption.text.split(" | ")[0];
            }
            return selectedOption.text;
        },
    });
}

$(document).ready(function () {
    init(); //Initialize Form
    // Initialize DataTable
    $("#mesin").on("select2:select", function () {
        kode_barang.value = this.value[1];

        btnProses.disabled = false;
        if (hidProses.value == 2) {
            kode_barang.disabled = false;
            kode_barang.select();
        } else btnProses.focus();
    });

    $("#mesin").on("select2:open", function () {
        this.selectedIndex = 0;
    });

    $.ajax({
        url: "/SparepartMesin/StatusPartMesinOverall",
        type: "GET",
        success: function (response) {
            // Clear the DataTable and add the new data
            table_mesin.clear().rows.add(response.data).draw();
            console.log(response);

        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", error);
        },
    });

    var table_mesin = $("#table_mesin").DataTable({
        processing: true,
        responsive: true,
        ordering: false,
        autoWidth: false,
        data: [], // The data will be populated via AJAX
        columns: [
            { data: "Nama_mesin" }, // Machine Name
            { data: "SparepartCount" }, // Spare Part Count
            { data: "DurabilityPercentage" }, // Durability Percentage
            { data: null }, // Column for the Chart.js canvas
        ],
        columnDefs: [
            {
                targets: 3, // Target the last column for the chart
                orderable: false,
                render: function (data, type, row, meta) {
                    // Create a canvas element for Chart.js in the last column
                    return '<canvas class="performance-chart" width="100" height="30"></canvas>';
                },
            },
        ],
        drawCallback: function (settings) {
            // After the table is drawn, initialize Chart.js for each row
            $("#table_mesin tbody tr").each(function () {
                var $tr = $(this);

                // Check if a canvas element exists in the row
                var $canvas = $tr.find("canvas");
                if ($canvas.length > 0) {
                    var durability = parseFloat($tr.find("td").eq(2).text()); // Get DurabilityPercentage from column 2
                    var ctx = $canvas[0].getContext("2d");

                    // Initialize Chart.js for each canvas
                    new Chart(ctx, {
                        type: "bar",
                        data: {
                            labels: ["Durability"],
                            datasets: [
                                {
                                    label: "Spare Parts",
                                    data: [durability],
                                    backgroundColor: ["#00FF00"],
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            indexAxis: "y", // Horizontal bar
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    display: false,
                                    beginAtZero: true,
                                    max: 100, // Customize as needed
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
                    });
                }
            });
        },
    });

    button_tambahLogMaintenance.addEventListener("click", function (event) {
        event.preventDefault();
        $("#staticBackdrop").modal("show");
    });
});
