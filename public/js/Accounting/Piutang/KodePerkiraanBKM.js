$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let radio_kecil = document.getElementById("radio_kecil");
    let radio_besar = document.getElementById("radio_besar");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let kode = 0;

    let tanggalSekarang = new Date();

    let bulanSekarang = String(tanggalSekarang.getMonth() + 1).padStart(2, "0");

    let tahunSekarang = tanggalSekarang.getFullYear();

    bulan.value = bulanSekarang;
    tahun.value = tahunSekarang;

    radio_kecil.addEventListener("click", function (event) {
        kode = 5;
    });

    radio_besar.addEventListener("click", function (event) {
        kode = 6;
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        if (kode == 5 || kode == 6) {
            table_atas = $("#table_atas").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "MaintenanceKodePerkiraanBKM/getPelunasan",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            tgl_awalbkm: tgl_awalbkm.value,
                            tgl_akhirbkm: tgl_akhirbkm.value,
                        });
                    },
                },
                columns: [
                    {
                        data: "",
                        render: function (data) {
                            return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                        },
                    },
                    { data: "" },
                    { data: "" },
                    { data: "" },
                    { data: "" },
                ],
                paging: false,
                scrollY: "400px",
                scrollCollapse: true,
                // columnDefs: [{ targets: [3, 4], visible: false }],
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih dulu kas kecil atau besar!",
                showConfirmButton: true,
            });
        }
    });
});
