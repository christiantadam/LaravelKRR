$(document).ready(function () {
    let button_tambahOrderKerja = document.getElementById("button_tambahOrderKerja"); // prettier-ignore
    let input_tanggalRencanaMulaiKerja = document.getElementById("input_tanggalRencanaMulaiKerja"); // prettier-ignore
    let input_tanggalRencanaSelesaiKerja = document.getElementById("input_tanggalRencanaSelesaiKerja"); // prettier-ignore
    let NomorOrderKerja = document.getElementById("NomorOrderKerja"); // prettier-ignore
    const select_suratPesananTujuan = $('#select_suratPesananTujuan'); // prettier-ignore

    let table_orderKerja = $("#table_orderKerja").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        ordering: false,
        autoWidth: false,
        // data: [], // This will be populated with client-side data
        // columns: [
        //     { data: "Barcode" },
        //     { data: "NamaType" },
        //     { data: "JumlahPengeluaranPrimer" },
        //     { data: "JumlahPengeluaranSekunder" },
        //     { data: "JumlahPengeluaranTritier" },
        //     { data: "idkonversi" },
        //     {
        //         data: "idkonversi",
        //         render: function (data, type, full, meta) {
        //             return (
        //                 '<button class="btn btn-success btn-acc" data-id="' +
        //                 data +
        //                 '">ACC</button> ' +
        //                 '<button class="btn btn-primary btn-detail" data-id="' +
        //                 data +
        //                 '" data-bs-toggle="modal" data-bs-target="#detailKonversiModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
        //                 '<button class="btn btn-danger btn-delete" data-id="' +
        //                 data +
        //                 '">Hapus</button>'
        //             );
        //         },
        //     },
        // ],
        // columnDefs: [{ width: "12%", targets: 0 },{ width: "25%", targets: 1 },{ width: "25%", targets: 6 }],
    }); // prettier-ignore

    button_tambahOrderKerja.addEventListener("click", function () {
        $("#tambahPermohonanOrderKerjaModal").modal("show");
    });

    $("#tambahPermohonanOrderKerjaModal").on(
        "shown.bs.modal",
        function (event) {
            input_tanggalRencanaMulaiKerja.valueAsDate = new Date();
            input_tanggalRencanaSelesaiKerja.valueAsDate = new Date();
            $.ajax({
                url: "/MaintenanceOrderKerjaABM/getNomorOrderKerja",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        console.log(data);
                    } else {
                        NomorOrderKerja.value = "";
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load Kelompok Utama data.",
                    });
                },
            });

            select_suratPesananTujuan.select2({
                dropdownParent: $("#tambahPermohonanOrderKerjaModal"),
                placeholder: "Pilih Surat Pesanan",
            });
        }
    );
});
