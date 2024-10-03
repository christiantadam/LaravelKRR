//#region Variables

// Form elements
const slcTypeMesin = document.getElementById("type_mesin");
const slcMesinAktif = document.getElementById("mesin_aktif");
const slcOrderBaru = document.getElementById("order_baru");
const txtIdOrderLama = document.getElementById("id_order_lama");
const txtNamaOrderLama = document.getElementById("nama_order_lama");
const txtMeterPanen = document.getElementById("meter_panen");
const hidData = document.getElementById("form_data");

// Buttons
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

// DataTables
var tableMesin = null;

//#endregion

//#region Listeners

$("#" + slcMesinAktif.id).on("select2:select", function () {
    fetchSelect(
        "/sp-order/Sp_List_Mesin~4/" + slcMesinAktif.value,
        (data) => {
            txtIdOrderLama.value = data[0]["Id_Order"];
            txtNamaOrderLama.value = data[0]["nama_order"];
            txtMeterPanen.value = data[0]["MeterPanen"];

            slcOrderBaru.disabled = false;
            slcOrderBaru.focus();
        },
        () => {
            slcOrderBaru.disabled = false;
            slcOrderBaru.focus();
        }
    );
});

$("#" + slcOrderBaru.id).on("select2:select", function () {
    fetchSelect("/sp-order/Sp_List_Order~13/" + slcOrderBaru.value, (data) => {
        txtMeterPanen.value = data[0]["MeterPanen"];
        txtMeterPanen.disabled = false;
        btnProses.disabled = false;
        txtMeterPanen.focus();
    });
});

$("#" + slcTypeMesin.id).on("select2:select", function () {
    tableMesin.ajax.reload();
    slcMesinAktif.disabled = false;
    slcMesinAktif.focus();

    $("#" + slcMesinAktif.id).val("");
    $("#" + slcMesinAktif.id).trigger("change");

    $("#" + slcOrderBaru.id).val("");
    $("#" + slcOrderBaru.id).trigger("change");
    slcOrderBaru.disabled = true;

    txtIdOrderLama.value = "";
    txtNamaOrderLama.value = "";
    txtMeterPanen.value = "";
    txtMeterPanen.disabled = true;
});

$("#" + slcTypeMesin.id).on("select2:unselect", function () {
    slcMesinAktif.disabled = true;
    slcOrderBaru.disabled = true;
    txtMeterPanen.disabled = true;
    clearForm();
});

btnProses.addEventListener("click", function () {
    if (txtMeterPanen.value === "") txtMeterPanen.value = 0;

    hidData.value =
        slcMesinAktif.value +
        "~" +
        slcOrderBaru.value +
        "~" +
        txtMeterPanen.value;
});

btnProses.addEventListener("submit", function (event) {
    if (
        $("#" + slcMesinAktif.id).val() === null ||
        $("#" + slcOrderBaru.id).val() === null
    ) {
        showToast("Data belum lengkap. Mohon periksa kembali!");
        event.preventDefault();
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});

//#endregion

//#region Functions
function initDataTable() {
    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: "400px",
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ total data",
            infoFiltered: "(disaring dari _MAX_ total data)",
            infoEmpty: "Menampilkan 0 data",
            zeroRecords: "Data tidak ditemukan",
            lengthMenu: "Menampilkan _MENU_ data per halaman",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: url_OrderBarang,
            dataType: "json",
            type: "POST",
            timeout: 60000,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: function (d) {
                d.idTypeMesin = $("#" + slcTypeMesin.id).val();
            },
        },
        columns: [
            { data: "IdMesin", width: "75px" },
            { data: "NamaMesin", width: "100px" },
            { data: "IdOrder", width: "75px" },
            { data: "NamaBarang", width: "600px" },
            { data: "MeterPanen", width: "100px" },
        ],
        columnDefs: [
            {
                targets: 3,
                render: DataTable.render.ellipsis(75, true),
            },
        ],
    };

    if (tableMesin) {
        tableMesin.destroy();
    }

    tableMesin = new DataTable("#table_mesin", dtOptions);
}

function init() {
    addTxtListener(txtMeterPanen, btnProses);
    initDataTable();

    $("#" + slcTypeMesin.id).select2({
        placeholder: "-- Pilih Type Mesin --",
        allowClear: true,
    });

    $("#" + slcMesinAktif.id).select2({
        placeholder: "",
        allowClear: true,
        ajax: {
            url: url_MesinAktif,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                    idTypeMesin: $("#" + slcTypeMesin.id).val(),
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.Id_mesin;

                    if (d.Id_mesin && d.Nama_mesin) {
                        d.text = d.Id_mesin + " | " + d.Nama_mesin;
                    }
                });

                return {
                    results: data.data,
                    pagination: {
                        more: data.current_page < data.last_page,
                    },
                };
            },
        },

        templateResult: function (data) {
            if (data.loading) {
                return data.text;
            } else {
                return data.Id_mesin + " | " + data.Nama_mesin;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Mesin --";
        },
    });

    $("#" + slcOrderBaru.id).select2({
        placeholder: "",
        allowClear: true,
        ajax: {
            url: url_OrderBaru,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.Id_order;

                    if (d.Id_order && d.Nama_Barang) {
                        d.text = d.Id_order + " | " + d.Nama_Barang;
                    }
                });

                return {
                    results: data.data,
                    pagination: {
                        more: data.current_page < data.last_page,
                    },
                };
            },
        },

        templateResult: function (data) {
            if (data.loading) {
                return data.text;
            } else {
                return data.Id_order + " | " + data.Nama_Barang;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Order Baru --";
        },
    });
}

$(document).ready(function () {
    init();
});
//#endregion
