//#region Variables
const dtAwal = document.getElementById("tanggal_awal");
const dtAkhir = document.getElementById("tanggal_akhir");
const btnOK = document.getElementById("btn_OK");
const btnKeluar = document.getElementById("btn_keluar");

var tableMesin = null;
//#endregion

//#region Events
dtAwal.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        dtAkhir.focus();
    }
});

dtAkhir.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        btnOK.focus();
    }
});

btnOK.addEventListener("click", function () {
    fetchSelect(
        "/sp-informasi/SP_1273_CIR_CEK_MesinTidakAktif/" +
            dtAwal.value +
            "/" +
            dtAkhir.value,
        (data) => {
            initDataTable(data);
        }
    );
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});
//#endregion

//#region Functions
function initDataTable(data) {
    let exportFormatter = {
        format: {
            body: function (data, row, column) {
                return column === 4 ? tableMesin.cell(row, 4).data() : data;
            },
        },
    };

    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: "400px",
        layout: {
            topStart: {
                info: true,
            },
            bottomStart: {
                buttons: [
                    {
                        extend: "excel",
                        exportOptions: exportFormatter,
                    },
                ],
            },
        },
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');

            $(".dt-buttons button")
                .removeClass("btn-secondary")
                .addClass("btn-success btn-sm ms-3");

            var infoText = $(".dt-info").text();
            if (infoText.includes("Showing 0 to 0 of 0 entries")) {
                $(".dt-info").text("Menampilkan 0 data");
            }
        },
    };

    if (data) {
        dtOptions.columnDefs = [
            {
                targets: 4,
                render: DataTable.render.ellipsis(50, true),
            },
        ];
        dtOptions.columns = [
            { data: "Tanggal", width: "75px" },
            { data: "Nama_mesin", width: "50px" },
            { data: "Id_Order", width: "75px" },
            { data: "Kode_barang", width: "75px" },
            { data: "NAMA_BRG", width: "350px" },
            { data: "R_jumlah_Order", width: "100px" },
            { data: "A_jumlah_Order", width: "100px" },
            { data: "Rpm", width: "0px" },
        ];
        dtOptions.data = data;
    } else {
        dtOptions.columns = [
            { width: "75px" }, // Tanggal
            { width: "50px" }, // Nama Mesin
            { width: "75px" }, // Id Order
            { width: "75px" }, // Kd. Barang
            { width: "350px" }, // Nama Order
            { width: "100px" }, // Rencana Order
            { width: "100px" }, // Jumlah Order
            { width: "0px" }, // RPM
        ];
    }

    if (tableMesin) {
        tableMesin.destroy();
    }

    tableMesin = new DataTable("#table_mesin", dtOptions);

    // Handle export data original saat menggunakan plugin ellipsis untuk render
    // https://datatables.net/extensions/buttons/examples/html5/outputFormat-function.html

    // Extension untuk melakukan export excel, pdf, csv, dan sebagainya
    // https://datatables.net/extensions/buttons/examples/initialisation/export.html
}

function init() {
    // Initialize DataTable
    initDataTable();

    // Initialize inputs
    dtAwal.value = getCurrentDate();
    dtAkhir.value = getCurrentDate();
}
//#endregion

$(document).ready(function () {
    init();
});
