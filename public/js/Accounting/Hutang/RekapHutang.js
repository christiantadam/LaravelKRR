$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let tanggal_awal = document.getElementById("tanggal_awal");
    let tanggal_akhir = document.getElementById("tanggal_akhir");

    tanggal_awal.valueAsDate = new Date();
    tanggal_akhir.valueAsDate = new Date();
});
