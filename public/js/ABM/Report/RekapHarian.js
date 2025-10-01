jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let tanggalRekapan = document.getElementById('tanggalRekapan'); // prettier-ignore
    let button_cetakRekapan = document.getElementById('button_cetakRekapan'); // prettier-ignore
    let cetakRekapHarianModal = document.getElementById('cetakRekapHarianModal'); //prettier-ignore
    let cetakRekapHarianLabel = document.getElementById('cetakRekapHarianLabel'); //prettier-ignore
    let closeCetakRekapHarianModal = document.getElementById('closeCetakRekapHarianModal'); //prettier-ignore
    let hasilJahitMulut = document.getElementById('hasilJahitMulut'); // prettier-ignore
    let pasangInner = document.getElementById('pasangInner'); // prettier-ignore
    let barangRepair = document.getElementById('barangRepair'); // prettier-ignore
    let hasilPressStarpakKG = document.getElementById('hasilPressStarpakKG'); // prettier-ignore
    let hasilPressStarpakLBR = document.getElementById('hasilPressStarpakLBR'); // prettier-ignore
    let hasilPressWovenKG = document.getElementById('hasilPressWovenKG'); // prettier-ignore
    let hasilPressWovenLBR = document.getElementById('hasilPressWovenLBR'); // prettier-ignore
    let hasilPressNganjukKG = document.getElementById('hasilPressNganjukKG'); // prettier-ignore
    let hasilPressNganjukLBR = document.getElementById('hasilPressNganjukLBR'); // prettier-ignore
    let div_alasanEditCetakRekapHarian = document.getElementById('div_alasanEditCetakRekapHarian'); //prettier-ignore
    let alasanEdit = document.getElementById('alasanEdit'); // prettier-ignore
    let button_modalProsesCetakRekapHarian = document.getElementById('button_modalProsesCetakRekapHarian'); // prettier-ignore
    //#endregion

    //#region Form Load
    tanggalRekapan.valueAsDate = new Date();
    tanggalRekapan.focus();
    //#endregion

    //#region Function
    function clearAll() {
        hasilJahitMulut.value = 0;
        pasangInner.value = 0;
        barangRepair.value = 0;
        hasilPressStarpakKG.value = 0;
        hasilPressStarpakLBR.value = 0;
        hasilPressWovenKG.value = 0;
        hasilPressWovenLBR.value = 0;
        hasilPressNganjukKG.value = 0;
        hasilPressNganjukLBR.value = 0;
        alasanEdit.value = "";
    }

    function prosesCetak() {
        let url = `/RekapHarianABM/printRekapan?tanggal=${tanggalRekapan.value}`;
        window.open(url, "_blank");
    }
    //#endregion

    //#region Event Listener
    tanggalRekapan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            button_cetakRekapan.focus();
        }
    });

    button_cetakRekapan.addEventListener("click", function () {
        let selectedDate = tanggalRekapan.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalRekapan.valueAsDate = new Date();
                tanggalRekapan.select();
            });
            return;
        }

        // cek apakah ada cetak di tanggal tersebut
        $.ajax({
            url: "/RekapHarianABM/cekRekapHarian",
            method: "GET",
            data: { tanggalRekapan: tanggalRekapan.value }, // id type mesin 9 = potong jahit
            dataType: "json",
            success: function (data) {
                console.log(data);

                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "Cek Rekap Harian failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.length < 1) {
                        $("#button_modalProsesCetakRekapHarian").data("id",null); //prettier-ignore
                        cetakRekapHarianLabel.innerHTML = "Tambah Data Cetak Rekap Harian"; // prettier-ignore
                        $("#cetakRekapHarianModal").modal("show");
                    } else {
                        Swal.fire({
                            title: "Ubah data Cetak Rekap Harian",
                            text: "Apakah anda ingin mengubah data Cetak Rekap Harian?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                            reverseButtons: true,
                        }).then((result) => {
                            if (
                                result.isConfirmed ||
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                // Show modal or perform action
                                if (result.isConfirmed) {
                                    console.log(data);

                                    $("#button_modalProsesCetakRekapHarian").data("id",data[0].TanggalRekapan); // prettier-ignore
                                    cetakRekapHarianLabel.innerHTML = "Edit Data Cetak Rekap Harian"; // prettier-ignore
                                    hasilJahitMulut.value = data[0].HasilJahitMulut;
                                    pasangInner.value = data[0].PasangInner;
                                    barangRepair.value = data[0].BarangRepair;
                                    hasilPressStarpakKG.value = data[0].HasilPressStarpak_KG;
                                    hasilPressStarpakLBR.value = data[0].HasilPressStarpak_LBR;
                                    hasilPressWovenKG.value = data[0].HasilPressWoven_KG;
                                    hasilPressWovenLBR.value = data[0].HasilPressWoven_LBR;
                                    hasilPressNganjukKG.value = data[0].HasilPressNganjuk_KG;
                                    hasilPressNganjukLBR.value = data[0].HasilPressNganjuk_LBR;
                                    $("#cetakRekapHarianModal").modal("show");
                                } else if (
                                    result.dismiss === Swal.DismissReason.cancel
                                ) {
                                    prosesCetak();
                                }
                            }
                        });
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        });
    });

    $("#cetakRekapHarianModal").on("shown.bs.modal", function (event) {
        let idCetak = $("#button_modalProsesCetakRekapHarian").data("id");
        if (idCetak == null) {
            clearAll();
            setTimeout(() => {
                hasilJahitMulut.select();
            }, 200); // delay in milliseconds (adjust as needed)
            div_alasanEditCetakRekapHarian.style.display = "none";
        } else {
            alasanEdit.value = "";
            div_alasanEditCetakRekapHarian.style.display = "block";
        }
    });

    closeCetakRekapHarianModal.addEventListener("click", function () {
        $("#cetakRekapHarianModal").modal("hide");
    });

    hasilJahitMulut.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pasangInner.select();
        }
    });

    pasangInner.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            barangRepair.select();
        }
    });

    barangRepair.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPressStarpakKG.select();
        }
    });

    hasilPressStarpakKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPressStarpakLBR.select();
        }
    });

    hasilPressStarpakLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPressWovenKG.select();
        }
    });

    hasilPressWovenKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPressWovenLBR.select();
        }
    });

    hasilPressWovenLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPressNganjukKG.select();
        }
    });

    hasilPressNganjukKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPressNganjukLBR.select();
        }
    });

    hasilPressNganjukLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesCetakRekapHarian.focus();
        }
    });

    button_modalProsesCetakRekapHarian.addEventListener("click", function () {
        let idCetak = $(this).data("id");
        const getValue = (el) => parseFloat(el?.value || 0);

        const hasilJahitMulutValue = getValue(hasilJahitMulut);
        const pasangInnerValue = getValue(pasangInner);
        const barangRepairValue = getValue(barangRepair);
        const hasilPressStarpakKGValue = getValue(hasilPressStarpakKG);
        const hasilPressStarpakLBRValue = getValue(hasilPressStarpakLBR);
        const hasilPressWovenKGValue = getValue(hasilPressWovenKG);
        const hasilPressWovenLBRValue = getValue(hasilPressWovenLBR);
        const hasilPressNganjukKGValue = getValue(hasilPressNganjukKG);
        const hasilPressNganjukLBRValue = getValue(hasilPressNganjukLBR);

        // Disable the button
        button_modalProsesCetakRekapHarian.disabled = true;

        // Re-enable the button
        setTimeout(function () {
            button_modalProsesCetakRekapHarian.disabled = false;
        }, 300);

        if (idCetak) {
            if (alasanEdit.value == "" || alasanEdit.value == null) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Alasan Edit harus diisi",
                    returnFocus: false,
                }).then(() => {
                    alasanEdit.focus();
                });
                return;
            }
        }
        $.ajax({
            url: "/RekapHarianABM",
            type: "POST",
            data: {
                jenisStore: idCetak ? "update" : "store",
                tanggalRekapan: tanggalRekapan.value, //idCetak = tanggalRekapan
                hasilJahitMulut: hasilJahitMulutValue,
                pasangInner: pasangInnerValue,
                barangRepair: barangRepairValue,
                hasilPressStarpakKG: hasilPressStarpakKGValue,
                hasilPressStarpakLBR: hasilPressStarpakLBRValue,
                hasilPressWovenKG: hasilPressWovenKGValue,
                hasilPressWovenLBR: hasilPressWovenLBRValue,
                hasilPressNganjukKG: hasilPressNganjukKGValue,
                hasilPressNganjukLBR: hasilPressNganjukLBRValue,
                alasanEdit: alasanEdit.value,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idCetak
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        prosesCetak();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });
    //#endregion
});
