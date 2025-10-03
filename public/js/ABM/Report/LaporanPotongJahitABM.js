jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let tanggalLaporan = document.getElementById("tanggalLaporan"); // prettier-ignore
    let button_cetakLaporan = document.getElementById("button_cetakLaporan"); // prettier-ignore
    //#endregion

    //#region Form Load
    tanggalLaporan.valueAsDate = new Date();
    tanggalLaporan.focus();
    //#endregion

    //#region Functions
    //#endregion

    //#region Event Listener
    tanggalLaporan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            button_cetakLaporan.focus();
        }
    });

    button_cetakLaporan.addEventListener("click", function () {
        let selectedDate = tanggalLaporan.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLaporan.valueAsDate = new Date();
                tanggalLaporan.focus();
            });
            return;
        }

        // cek apakah ada data log di tanggal tersebut
        $.ajax({
            url: "/LaporanPotongJahitABM/cekDataLogMPJ",
            method: "GET",
            data: { tanggalLaporan: tanggalLaporan.value },
            dataType: "json",
            success: function (data) {
                console.log(data);

                if (data[0].JumlahDataLogMPJ < 1) {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada data ditemukan",
                        showConfirmButton: false,
                        timer: 2500,
                        text: "Tidak ada data Log MPJ ditemukan, silahkan pilih tanggal lain",
                        returnFocus: false,
                    }).then(() => {
                        tanggalLaporan.valueAsDate = new Date();
                        tanggalLaporan.focus();
                    });
                } else {
                    let url = `/LaporanPotongJahitABM/printLaporan?tanggal=${tanggalLaporan.value}`;
                    window.open(url, "_blank");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to check data Log MPJ.",
                });
            },
        });
    });
    //#endregion
});
