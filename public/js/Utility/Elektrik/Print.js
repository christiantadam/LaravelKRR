let tanggal = document.getElementById("tanggal");
let sampaiDengan = document.getElementById("sampaiDengan");
let refreshButton = document.getElementById("refreshButton");

if (tanggal && sampaiDengan) {
    var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
    tanggal.value = tanggal_akhirOutput;
    sampaiDengan.value = tanggal_akhirOutput;

    var currentDateTime = new Date();
    var hours = currentDateTime.getHours().toString().padStart(2, "0");
    var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes;
}

$(document).ready(function () {
    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_print").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        //scrollX: true,
        ajax: {
            url: "/getData",
            type: "GET",
            data: function (d) {
                d.tanggal1 = $("#tanggal").val();
                d.tanggal2 = $("#sampaiDengan").val();
                d.divisi = $("#divisi_pelapor").val();
            },
        },

        columns: [
            {
                data: null,
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_elektrik" value="' +
                        full.id +
                        '">'
                    );
                },
            },

            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var localDate = moment.utc(data).local();

                    return localDate.format("MM/DD/YYYY");
                },
            },

            { data: "L_div_pelapor" },
            { data: "Nama_pelapor" },
            { data: "Penerima_laporan" },
            { data: "Jam_lapor", render: timeRenderer },
            { data: "jam_pelaksanan", render: timeRenderer },
            { data: "Jam_selesai", render: timeRenderer },
            { data: "Type_gangguan" },
            { data: "Penyebab" },
            { data: "Penyelesaian" },
            { data: "Keterangan" },
            { data: "Teknisi" },
        ],
        order: [[1, "asc"]],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        console.log(dataTable);
    });

    $("tbody").on("click", ".checkbox_elektrik", function () {
        if ($(this).prop("checked")) {
            var id = $(this).val();

            $.ajax({
                url: "/getData",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    // $("#previewData").empty();
                    $("#previewData").append(
                        "<style>" +
                            "@media print {" +
                            "  body * {" +
                            "    visibility: hidden;" +
                            "  }" +
                            "  #previewData, #previewData * {" +
                            "    visibility: visible;" +
                            "  }" +
                            "  #previewData {" +
                            "    position: absolute;" +
                            "    left: 0;" +
                            "    top: 0;" +
                            "  }" +
                            "}" +
                            "</style>" +
                            '<div class="preview-item border p-10 mb-4 rounded">' +
                            '<h1 class="mb-4 text-center">Serah Terima Permintaan Jasa Teknik</h1>' +
                            '<h1 class="mb-4 text-center">PT. KERTARAJASA RAYA</h1>' +
                            '<h3 class="mb-5 text-center">JL. Raya Tropodo No.1 Waru - SIDOARJO</h3>' +
                            '<div class="row">' +
                            '<div class="col-md-6 mt-3">' +
                            '<p class="mb-2"><strong>Divisi Pelapor:</strong> ' +
                            data.L_div_pelapor +
                            "</p>" +
                            '<p class="mb-2"><strong>Nama Pelapor:</strong> ' +
                            data.Nama_pelapor +
                            "</p>" +
                            '<p class="mb-2"><strong>Lokasi Mesin:</strong> ' +
                            data.LokasiMesin +
                            "</p>" +
                            "<p><strong>Tahun Pembuatan:</strong> " +
                            data.TahunPembuatan +
                            "</p>" +
                            "</div>" +
                            "</div>"
                    );
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            $("#previewData").empty();
        }
    });
});
