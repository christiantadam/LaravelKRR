jQuery(function ($) {
    //#region Variables
    let button_tambahKegiatanMesin = document.getElementById("button_tambahKegiatanMesin"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let closeTambahKegiatanMesinMPJModal = document.getElementById("closeTambahKegiatanMesinMPJModal"); // prettier-ignore
    let tambahKegiatanMesinMPJModal = document.getElementById('tambahKegiatanMesinMPJModal'); // prettier-ignore
    let tambahKegiatanMesinMPJLabel = document.getElementById('tambahKegiatanMesinMPJLabel'); // prettier-ignore
    let tanggalLogMesinMPJ = document.getElementById('tanggalLogMesinMPJ'); // prettier-ignore
    let shiftMPJ = document.getElementById('shiftMPJ'); // prettier-ignore
    let stdWaktu = document.getElementById('stdWaktu'); // prettier-ignore
    const namaMesinMPJ = $("#namaMesinMPJ");
    let orderAktifMPJ = document.getElementById("orderAktifMPJ"); // prettier-ignore
    let orderKerja = document.getElementById("orderKerja"); // prettier-ignore
    let bahanBakuKgMPJ = document.getElementById("bahanBakuKgMPJ"); // prettier-ignore
    let hasilLBRMPJ = document.getElementById("hasilLBRMPJ"); // prettier-ignore
    let afalanWAKG = document.getElementById("afalanWAKG"); // prettier-ignore
    let afalanWALBR = document.getElementById("afalanWALBR"); // prettier-ignore
    let afalanWEKG = document.getElementById("afalanWEKG"); // prettier-ignore
    let afalanWELBR = document.getElementById("afalanWELBR"); // prettier-ignore
    let afalanPotongKG = document.getElementById("afalanPotongKG"); // prettier-ignore
    let afalanPotongLBR = document.getElementById("afalanPotongLBR"); // prettier-ignore
    let totalAfalan = document.getElementById("totalAfalan"); // prettier-ignore
    let hasilKotor = document.getElementById("hasilKotor"); // prettier-ignore
    let jamKerja = document.getElementById("jamKerja"); // prettier-ignore
    let jamIstirahat = document.getElementById("jamIstirahat"); // prettier-ignore
    let jamGangguanMesin = document.getElementById("jamGangguanMesin"); // prettier-ignore
    let jamGangguanLain = document.getElementById("jamGangguanLain"); // prettier-ignore
    let div_alasanEditMPJ = document.getElementById("div_alasanEditMPJ"); // prettier-ignore
    let alasanEdit = document.getElementById("alasanEdit"); // prettier-ignore
    let button_modalProsesMPJ = document.getElementById("button_modalProsesMPJ"); // prettier-ignore
    let tambahKegiatanMesinMPJTanpaOKModal = document.getElementById('tambahKegiatanMesinMPJTanpaOKModal'); // prettier-ignore
    let closeTambahKegiatanMesinMPJTanpaOKModal = document.getElementById('closeTambahKegiatanMesinMPJTanpaOKModal'); // prettier-ignore
    let tanggalLogMesinMPJTanpaOK = document.getElementById('tanggalLogMesinMPJTanpaOK'); // prettier-ignore
    const namaMesinMPJTanpaOK = $("#namaMesinMPJTanpaOK");
    let shiftMPJTanpaOK = document.getElementById('shiftMPJTanpaOK'); // prettier-ignore
    let kodeBarangHasilTanpaOK = document.getElementById('kodeBarangHasilTanpaOK'); // prettier-ignore
    let stdWaktuTanpaOK = document.getElementById('stdWaktuTanpaOK'); // prettier-ignore
    let bahanBakuKgMPJTanpaOK = document.getElementById('bahanBakuKgMPJTanpaOK'); // prettier-ignore
    let hasilLBRMPJTanpaOK = document.getElementById('hasilLBRMPJTanpaOK'); // prettier-ignore
    let namaBarangHasilTanpaOK = document.getElementById('namaBarangHasilTanpaOK'); // prettier-ignore
    let afalanWAKGTanpaOK = document.getElementById('afalanWAKGTanpaOK'); // prettier-ignore
    let afalanWALBRTanpaOK = document.getElementById('afalanWALBRTanpaOK'); // prettier-ignore
    let afalanWEKGTanpaOK = document.getElementById('afalanWEKGTanpaOK'); // prettier-ignore
    let afalanWELBRTanpaOK = document.getElementById('afalanWELBRTanpaOK'); // prettier-ignore
    let afalanPotongKGTanpaOK = document.getElementById('afalanPotongKGTanpaOK'); // prettier-ignore
    let afalanPotongLBRTanpaOK = document.getElementById('afalanPotongLBRTanpaOK'); // prettier-ignore
    let totalAfalanTanpaOK = document.getElementById('totalAfalanTanpaOK'); // prettier-ignore
    let hasilKotorTanpaOK = document.getElementById('hasilKotorTanpaOK'); // prettier-ignore
    let jamKerjaTanpaOK = document.getElementById('jamKerjaTanpaOK'); // prettier-ignore
    let jamIstirahatTanpaOK = document.getElementById('jamIstirahatTanpaOK'); // prettier-ignore
    let jamGangguanMesinTanpaOK = document.getElementById('jamGangguanMesinTanpaOK'); // prettier-ignore
    let jamGangguanLainTanpaOK = document.getElementById('jamGangguanLainTanpaOK'); // prettier-ignore
    let div_alasanEditMPJTanpaOK = document.getElementById('div_alasanEditMPJTanpaOK'); // prettier-ignore
    let alasanEditTanpaOK = document.getElementById('alasanEditTanpaOK'); // prettier-ignore
    let button_modalProsesMPJTanpaOK = document.getElementById('button_modalProsesMPJTanpaOK'); // prettier-ignore
    let table_logMesin = $("#table_logMesin").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        autoWidth: false,
        lengthMenu: [
            [10, 25, 100, -1],
            ["10", "25", "100", "Show all"],
        ],
        order: [[0, "desc"]],
        ajax: {
            url: "/KegiatanMesinMPJPerHariABM/getLogMesin",
            type: "GET",
        },
        columns: [
            {
                data: "Tgl_Log",
                render: function (data, type, full, meta) {
                    return moment(data).format("YYYY-MM-DD");
                },
                width: "10%",
            },
            {
                data: "NamaBarangHasil",
                width: "31%",
            },
            {
                data: "NamaMesin",
                width: "8%",
            },
            {
                data: "Shift",
                width: "5%",
            },
            {
                data: "No_OK",
                width: "8%",
            },
            {
                data: "Hasil_Lembar",
                width: "9%",
            },
            {
                data: "BahanBaku_Kg",
                width: "9%",
            },
            {
                data: "Id_Log",
                render: function (data, type, full) {
                    let idModalEdit, idModalDetail;
                    idModalEdit = "tambahKegiatanMesinMPJModal";
                    idModalDetail = "detailKegiatanMesinMPJModal";
                    idModalEditTanpaOK = "tambahKegiatanMesinMPJTanpaOKModal";

                    if (full.No_OK) {
                        return `
                        <button class="btn btn-primary btn-edit" data-id="${data}" data-bs-toggle="modal" data-bs-target="#${idModalEdit}" id="button_editLogMesin">Edit</button>
                        <button class="btn btn-danger btn-delete" data-id="${data}">Hapus</button>
                        `;
                    } else {
                        return `
                        <button class="btn btn-primary btn-edit" data-id="${data}" data-bs-toggle="modal" data-bs-target="#${idModalEditTanpaOK}" id="button_editLogMesin">Edit</button>
                        <button class="btn btn-danger btn-delete" data-id="${data}">Hapus</button>
                        `;
                    }
                },
                width: "12.5%",
            },
        ],
    });
    let shiftAllowedCharacters = ["A", "B", "C"];
    //#endregion

    //#region Load Form
    initializeSelect2();
    //#endregion

    //#region Function
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

    function initializeSelect2() {
        namaMesinMPJ.select2({
            dropdownParent: $("#tambahKegiatanMesinMPJModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        namaMesinMPJTanpaOK.select2({
            dropdownParent: $("#tambahKegiatanMesinMPJTanpaOKModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        $("#namaMesinMPJ").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#namaMesinMPJTanpaOK").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function clearAll() {
        shiftMPJ.value = "";
        orderKerja.value = "";
        orderAktifMPJ.innerHTML = "";
        stdWaktu.value = 0;
        hasilLBRMPJ.value = 0;
        bahanBakuKgMPJ.value = 0;
        afalanWAKG.value = 0;
        afalanWALBR.value = 0;
        afalanWEKG.value = 0;
        afalanWELBR.value = 0;
        afalanPotongKG.value = 0;
        afalanPotongLBR.value = 0;
        totalAfalan.value = 0;
        hasilKotor.value = 0;
        jamKerja.value = 0;
        jamIstirahat.value = 0;
        jamGangguanMesin.value = 0;
        jamGangguanLain.value = 0;
        alasanEdit.value = "";
    }

    function clearAllTanpaOK() {
        shiftMPJTanpaOK.value = "";
        stdWaktuTanpaOK.value = 0;
        hasilLBRMPJTanpaOK.value = 0;
        bahanBakuKgMPJTanpaOK.value = 0;
        afalanWAKGTanpaOK.value = 0;
        afalanWALBRTanpaOK.value = 0;
        afalanWEKGTanpaOK.value = 0;
        afalanWELBRTanpaOK.value = 0;
        afalanPotongKGTanpaOK.value = 0;
        afalanPotongLBRTanpaOK.value = 0;
        totalAfalanTanpaOK.value = 0;
        hasilKotorTanpaOK.value = 0;
        jamKerjaTanpaOK.value = 0;
        jamIstirahatTanpaOK.value = 0;
        jamGangguanMesinTanpaOK.value = 0;
        jamGangguanLainTanpaOK.value = 0;
        alasanEditTanpaOK.value = "";
    }

    function sumTotalAfalanXHasilKotor() {
        const getValue = (el) => parseFloat(el.value || 0);

        const total =
            getValue(afalanWAKG) +
            getValue(afalanWALBR) +
            getValue(afalanWEKG) +
            getValue(afalanWELBR) +
            getValue(afalanPotongKG) +
            getValue(afalanPotongLBR);

        totalAfalan.value = total;
        hasilKotor.value = getValue(hasilLBRMPJ) + total;
    }

    function sumTotalAfalanXHasilKotorTanpaOK() {
        const getValue = (el) => parseFloat(el.value || 0);

        const total =
            getValue(afalanWAKGTanpaOK) +
            getValue(afalanWALBRTanafalanWAKGTanpaOK) +
            getValue(afalanWEKGTanafalanWAKGTanpaOK) +
            getValue(afalanWELBRTanafalanWAKGTanpaOK) +
            getValue(afalanPotongKGTanafalanWAKGTanpaOK) +
            getValue(afalanPotongLBRTanafalanWAKGTanpaOK);

        totalAfalanTanpaOK.value = total;
        hasilKotorTanpaOK.value = getValue(hasilLBRMPJTanpaOK) + total;
    }
    //#endregion

    //#region Main Page Event Listener
    button_tambahKegiatanMesin.addEventListener("click", function () {
        Swal.fire({
            title: "Pilih Jenis Kegiatan Mesin MPJ",
            text: "Apakah kegiatan mesin berdasarkan Order Kerja?",
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
                $.ajax({
                    url: "/KegiatanMesinMPJPerHariABM/getMesin",
                    method: "GET",
                    data: { idTypeMesin: 9 }, // id type mesin 9 = potong jahit
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000, // Auto-close after 1.5 seconds (optional)
                                text: "fetching data machine failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (result.isConfirmed) {
                                namaMesinMPJ.empty();
                                data.forEach(function (item) {
                                    namaMesinMPJ.append(
                                        new Option(item.NamaMesin, item.IdMesin) // prettier-ignore
                                    );
                                });
                                namaMesinMPJ.val(null).trigger("change");
                            } else if (
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                namaMesinMPJTanpaOK.empty();
                                data.forEach(function (item) {
                                    namaMesinMPJTanpaOK.append(
                                        new Option(item.NamaMesin, item.IdMesin) // prettier-ignore
                                    );
                                });
                                namaMesinMPJTanpaOK.val(null).trigger("change");
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
                // Show modal or perform action
                if (result.isConfirmed) {
                    $("#button_modalProsesMPJ").data("id", null);
                    tambahKegiatanMesinMPJLabel.innerHTML = "Tambah Kegiatan Mesin Potong Jahit"; // prettier-ignore
                    $("#tambahKegiatanMesinMPJModal").modal("show");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    $("#button_modalProsesMPJTanpaOK").data("id", null);
                    tambahKegiatanMesinMPJTanpaOKLabel.innerHTML = "Tambah Kegiatan Mesin Potong Jahit Tanpa OK"; // prettier-ignore
                    $("#tambahKegiatanMesinMPJTanpaOKModal").modal("show");
                }
            }
        });
    });
    //#endregion

    //#region Modal MPJ Order Kerja Event Listener
    $("#tambahKegiatanMesinMPJModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesMPJ").data("id");
        if (idLog == null) {
            tanggalLogMesinMPJ.value = moment().format("YYYY-MM-DD");
            clearAll();
            setTimeout(() => {
                tanggalLogMesinMPJ.focus();
            }, 200); // delay in milliseconds (adjust as needed)
            div_alasanEditMPJ.style.display = "none";
        } else {
            alasanEdit.value = "";
            div_alasanEditMPJ.style.display = "block";
        }
    });

    closeTambahKegiatanMesinMPJModal.addEventListener("click", function () {
        $("#tambahKegiatanMesinMPJModal").modal("hide");
    });

    tanggalLogMesinMPJ.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            namaMesinMPJ.select2("open");
        }
    });

    namaMesinMPJ.on("select2:select", function () {
        const selectedMesin = $(this).val(); // Get selected Type Mesin
        orderKerja.value = ""; // Clear value
        $.ajax({
            url: "/KegiatanMesinMPJPerHariABM/getOrderByMesin",
            method: "GET",
            data: {
                idMesin: selectedMesin,
                Tgl_LogMPJ: tanggalLogMesinMPJ.value,
            },
            dataType: "json",
            success: function (data) {
                shiftAllowedCharacters = ["A", "B", "C"];
                clearAll();
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "fetching data failed for machine: " +
                            $("#namaMesinMPJ option:selected").text(), // prettier-ignore
                        returnFocus: false,
                    });
                } else {
                    let jenisOK = data.mesin[0].JenisOK ?? "";
                    if (jenisOK == 2) {
                        //STARPACK tidak bisa masuk mesin MPJ
                        namaMesinMPJ.val(null).trigger("change");
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Order Kerja Starpak tidak bisa masuk MPJ.",
                        });
                        return;
                    }

                    //WOVEN
                    let nomorOK = data.mesin[0].No_OK ?? "";
                    let namaBarang = data.mesin[0].NAMA_BRG ?? "";

                    if (nomorOK == "" || namaBarang == "") {
                        //Order Kerja kosong
                        namaMesinMPJ.val(null).trigger("change");
                        Swal.fire({
                            icon: "warning",
                            title: "Peringatan",
                            text:
                                "Tidak ada Order yang dikerjakan oleh Mesin " +
                                $("#namaMesinMPJ option:selected").text(),
                            returnFocus: false,
                        }).then(() => {
                            setTimeout(() => {
                                namaMesinMPJ.select2("open");
                            }, 200);
                        });
                        orderAktifMPJ.innerHTML = "";
                        return;
                    }
                    //Jika ada OK
                    orderKerja.value = nomorOK;
                    orderAktifMPJ.innerHTML =
                        '<span style="color: red;">' +
                        nomorOK +
                        '</span> <span class="namaBarang" style="color: blue;">' +
                        namaBarang +
                        "</span>";

                    if (
                        data.log.length > 0 &&
                        data.log[0].No_OK == data.mesin[0].No_OK
                    ) {
                        let allShifts = ["A", "B", "C"];
                        let usedShifts = data.log.map((log) => log.Shift);
                        shiftAllowedCharacters = allShifts.filter(
                            (s) => !usedShifts.includes(s)
                        );
                        if (shiftAllowedCharacters.length > 0) {
                            jamIstirahat.readOnly = true;
                            jamKerja.readOnly = true;
                            stdWaktu.readOnly = true;
                            jamIstirahat.value = data.log[0].Jam_Istirahat;
                            jamKerja.value = data.log[0].Jam_Kerja;
                            stdWaktu.value = data.log[0].Standard_Waktu;
                        } else {
                            namaMesinMPJ.val(null).trigger("change");
                            shiftAllowedCharacters = ["A", "B", "C"];
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text:
                                    "Shift A, B, C untuk Order Kerja " +
                                    data.log[0].No_OK +
                                    " sudah diinput.",
                            });
                            clearAll();
                            return;
                        }
                    } else {
                        jamIstirahat.readOnly = false;
                        jamKerja.readOnly = false;
                        stdWaktu.readOnly = false;
                    }
                    shiftMPJ.focus();
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

    shiftMPJ.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !shiftAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!shiftAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            if (shiftAllowedCharacters.length == 3) {
                this.setCustomValidity(
                    "Hanya karakter " +
                        shiftAllowedCharacters.join(", ") +
                        " yang diperbolehkan"
                );
            } else {
                this.setCustomValidity(
                    "Hanya shift " +
                        shiftAllowedCharacters.join(", ") +
                        " yang belum diinput"
                );
            }
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shiftMPJ.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (stdWaktu.readOnly) {
                bahanBakuKgMPJ.select();
            } else {
                stdWaktu.select();
            }
        }
    });

    stdWaktu.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bahanBakuKgMPJ.select();
        }
    });

    bahanBakuKgMPJ.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilLBRMPJ.select();
        }
    });

    hasilLBRMPJ.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWAKG.select();
        }
    });

    hasilLBRMPJ.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanWAKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWALBR.select();
        }
    });

    afalanWAKG.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanWALBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWEKG.select();
        }
    });

    afalanWALBR.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanWEKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWELBR.select();
        }
    });

    afalanWEKG.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanWELBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanPotongKG.select();
        }
    });

    afalanWELBR.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanPotongKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanPotongLBR.select();
        }
    });

    afalanPotongKG.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanPotongLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamKerja.select();
        }
    });

    afalanPotongLBR.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    jamKerja.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamIstirahat.select();
        }
    });

    jamIstirahat.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamGangguanMesin.select();
        }
    });

    jamGangguanMesin.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamGangguanLain.select();
        }
    });

    jamGangguanLain.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesMPJ.focus();
        }
    });

    button_modalProsesMPJ.addEventListener("click", function (e) {
        let idLog = $(this).data("id");
        const getValue = (el) => parseFloat(el?.value || 0);

        const stdWaktuValue = getValue(stdWaktu);
        const bahanBakuKgMPJValue = getValue(bahanBakuKgMPJ);
        const hasilLBRMPJValue = getValue(hasilLBRMPJ);
        const afalanWAKGValue = getValue(afalanWAKG);
        const afalanWALBRValue = getValue(afalanWALBR);
        const afalanWEKGValue = getValue(afalanWEKG);
        const afalanWELBRValue = getValue(afalanWELBR);
        const afalanPotongKGValue = getValue(afalanPotongKG);
        const afalanPotongLBRValue = getValue(afalanPotongLBR);
        const jamKerjaValue = getValue(jamKerja);
        const jamIstirahatValue = getValue(jamIstirahat);
        const jamGangguanMesinValue = getValue(jamGangguanMesin);
        const jamGangguanLainValue = getValue(jamGangguanLain);
        const totalAfalanValue = getValue(totalAfalan);
        const hasilKotorValue = getValue(hasilKotor);

        // Disable the button
        button_modalProsesMPJ.disabled = true;

        // Re-enable after 5 seconds (5000 ms)
        setTimeout(function () {
            button_modalProsesMPJ.disabled = false;
        }, 300);

        // Check if date is larger than today
        let selectedDate = tanggalLogMesinMPJ.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLogMesinMPJ.select();
            });
            return;
        }

        if (shiftMPJ.value == "" || shiftMPJ.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftMPJ.select();
            });
            return;
        }

        if (namaMesinMPJ.val() === "" || namaMesinMPJ.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinMPJ.select2("open");
                }, 200);
            });
            return;
        }

        if (idLog) {
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
            url: "/KegiatanMesinMPJPerHariABM",
            type: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                jenisLog: 1,
                Tgl_LogMPJ: tanggalLogMesinMPJ.value,
                shiftMPJ: shiftMPJ.value,
                namaMesinMPJ: namaMesinMPJ.val(),
                stdWaktu: stdWaktuValue,
                bahanBakuKgMPJ: bahanBakuKgMPJValue,
                hasilLBRMPJ: hasilLBRMPJValue,
                afalanWAKG: afalanWAKGValue,
                afalanWALBR: afalanWALBRValue,
                afalanWEKG: afalanWEKGValue,
                afalanWELBR: afalanWELBRValue,
                afalanPotongKG: afalanPotongKGValue,
                afalanPotongLBR: afalanPotongLBRValue,
                totalAfalan: totalAfalanValue,
                hasilKotor: hasilKotorValue,
                jamKerja: jamKerjaValue,
                jamIstirahat: jamIstirahatValue,
                jamGangguanMesin: jamGangguanMesinValue,
                jamGangguanLain: jamGangguanLainValue,
                idLog: idLog,
                alasanEdit: alasanEdit.value,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idLog
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        table_logMesin.ajax.reload();
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

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/KegiatanMesinMPJPerHariABM/getLogMesinByIdLog",
            data: {
                idLog: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                if (response.log[0].Jenis_Log == 1) {
                    // dengan OK
                    tambahKegiatanMesinMPJLabel.innerHTML = "Edit Data Id Log: " + rowID; // prettier-ignore
                    $("#button_modalProsesMPJ").data("id", rowID);
                    tanggalLogMesinMPJ.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                    namaMesinMPJ.empty();
                    response.mesin.forEach(function (listMesin) {
                        namaMesinMPJ.append(
                            new Option(listMesin.NamaMesin, listMesin.IdMesin)
                        );
                    });
                    namaMesinMPJ
                        .val(response.log[0].Id_Mesin)
                        .trigger("change");
                    alasanEdit.value = "";
                    orderAktifMPJ.innerHTML =
                        '<span style="color: red;">' +
                        response.log[0].No_OK +
                        '</span> <span class="namaBarang" style="color: blue;">' +
                        (response.log[0].NAMA_BRG ??
                            "Kode Barang Hasil belum terdaftar, lakukan edit dan pastikan kolom kode barang printing sudah terisi untuk mendaftarkan") +
                        "</span>";
                    shiftMPJ.value = response.log[0].Shift;
                    orderKerja.value = response.log[0].No_OK ?? "";
                    stdWaktu.value = numeral(response.log[0].Standard_Waktu).format('0.00') ?? 0; // prettier-ignore
                    bahanBakuKgMPJ.value = response.log[0].BahanBaku_Kg ?? 0; // prettier-ignore
                    hasilLBRMPJ.value = response.log[0].Hasil_Lembar ?? 0; // prettier-ignore
                    afalanWAKG.value = numeral(response.log[0].AfalanWA_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanWALBR.value = numeral(response.log[0].AfalanWA_LBR).format('0.00') ?? 0; // prettier-ignore
                    afalanWEKG.value = numeral(response.log[0].AfalanWE_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanWELBR.value = numeral(response.log[0].AfalanWE_LBR).format('0.00') ?? 0; // prettier-ignore
                    afalanPotongKG.value = numeral(response.log[0].AfalanPotong_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanPotongLBR.value = numeral(response.log[0].AfalanPotong_LBR).format('0.00') ?? 0; // prettier-ignore
                    totalAfalan.value = numeral(response.log[0].Total_Afalan).format('0.00') ?? 0; // prettier-ignore
                    hasilKotor.value = numeral(response.log[0].Hasil_Kotor).format('0.00') ?? 0; // prettier-ignore
                    jamKerja.value = numeral(response.log[0].Jam_Kerja).format('0.00') ?? 0; // prettier-ignore
                    jamIstirahat.value = numeral(response.log[0].Jam_Istirahat).format('0.00') ?? 0; // prettier-ignore
                    jamGangguanMesin.value = numeral(response.log[0].Jam_Gangguan_Mesin).format('0.00') ?? 0; // prettier-ignore
                    jamGangguanLain.value = numeral(response.log[0].Jam_Gangguan_Lain).format('0.00') ?? 0; // prettier-ignore
                } else if (response.log[0].Jenis_Log == 2) {
                    // tanpa OK
                    tambahKegiatanMesinMPJTanpaOKLabel.innerHTML = "Edit Data Id Log: " + rowID; // prettier-ignore
                    $("#button_modalProsesMPJTanpaOK").data("id", rowID);
                    tanggalLogMesinMPJTanpaOK.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                    namaMesinMPJTanpaOK.empty();
                    response.mesin.forEach(function (listMesin) {
                        namaMesinMPJTanpaOK.append(
                            new Option(listMesin.NamaMesin, listMesin.IdMesin)
                        );
                    });
                    namaMesinMPJTanpaOK
                        .val(response.log[0].Id_Mesin)
                        .trigger("change");
                    kodeBarangPrintingTanpaOK.value = response.log[0].KodeBarangHasil ?? ""; // prettier-ignore
                    alasanEditTanpaOK.value = "";
                    namaBarangMPJTanpaOK.innerHTML =
                        response.log[0].NAMA_BRG ??
                        "Kode Barang Hasil belum terdaftar, lakukan edit dan pastikan kolom kode barang printing sudah terisi untuk mendaftarkan";
                    shiftMPJTanpaOK.value = response.log[0].Shift;
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Tuliskan alasan penghapusan",
            input: "text",
            inputPlaceholder: "Alasan penghapusan...",
            inputAttributes: {
                autocapitalize: "off",
            },
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            inputValidator: (value) => {
                if (!value) {
                    return "Alasan harus diisi!";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = result.value;
                $.ajax({
                    url: "/KegiatanMesinMPJPerHariABM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        alasanHapus: reason,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            table_logMesin.ajax.reload();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            }
            if (result.isConfirmed) {
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Kegiatan mesin tidak dihapus :)",
                    "info"
                );
            }
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProsesMPJ").data("id", rowID);
        Swal.fire({
            icon: "info",
            title: "Coming Soon",
            text: "Fitur ini akan tersedia pada update berikutnya.",
            confirmButtonText: "OK",
        });
    });
    //#endregion

    //#region Modal MPJ Tanpa Order Kerja Event Listener
    $("#tambahKegiatanMesinMPJTanpaOKModal").on(
        "shown.bs.modal",
        function (event) {
            let idLog = $("#button_modalProsesMPJTanpaOK").data("id");
            if (idLog == null) {
                tanggalLogMesinMPJTanpaOK.value = moment().format("YYYY-MM-DD");
                clearAllTanpaOK();
                setTimeout(() => {
                    tanggalLogMesinMPJTanpaOK.focus();
                }, 200); // delay in milliseconds (adjust as needed)
                div_alasanEditMPJTanpaOK.style.display = "none";
            } else {
                alasanEdit.value = "";
                div_alasanEditMPJTanpaOK.style.display = "block";
            }
        }
    );

    closeTambahKegiatanMesinMPJTanpaOKModal.addEventListener(
        "click",
        function () {
            $("#tambahKegiatanMesinMPJTanpaOKModal").modal("hide");
        }
    );

    tanggalLogMesinMPJTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            kodeBarangHasilTanpaOK.select();
        }
    });

    kodeBarangHasilTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            clearAllTanpaOK();
            namaMesinMPJTanpaOK.val(null).trigger("change");
            let kodeBarang9digit;
            kodeBarang9digit = this;
            if (kodeBarang9digit.value.length < 9) {
                kodeBarang9digit.value = this.value.padStart(9, "0");
            }
            this.value = kodeBarang9digit.value;
            $.ajax({
                url: "/KegiatanMesinMPJPerHariABM/getKodeBarangHasilTanpaOK",
                method: "GET",
                data: { kodeBarangHasilTanpaOK: this.value },
                dataType: "json",
                success: function (data) {
                    if (data.length < 1) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000, // Auto-close after 1.5 seconds (optional)
                            text: "Data Barang tidak ditemukan! ",
                            returnFocus: false,
                        });
                    } else {
                        namaBarangHasilTanpaOK.innerHTML = data[0].NAMA_BRG;
                        namaMesinMPJTanpaOK.select2("open");
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
        }
    });

    namaMesinMPJTanpaOK.on("select2:select", function () {
        const selectedMesin = $(this).val(); // Get selected Type Mesin
        orderKerja.value = ""; // Clear value
        $.ajax({
            url: "/KegiatanMesinMPJPerHariABM/getDataLogMesinTanpaOK",
            method: "GET",
            data: {
                idMesin: selectedMesin,
                kodeBarangHasilTanpaOK: kodeBarangHasilTanpaOK.value,
                Tgl_LogMPJ: tanggalLogMesinMPJ.value,
            },
            dataType: "json",
            success: function (data) {
                shiftAllowedCharacters = ["A", "B", "C"];
                clearAll();
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "fetching data failed for machine: " +
                            $("#namaMesinMPJ option:selected").text(), // prettier-ignore
                        returnFocus: false,
                    });
                } else {
                    if (data.length > 0) {
                        let allShifts = ["A", "B", "C"];
                        let usedShifts = data.log.map((log) => log.Shift);
                        shiftAllowedCharacters = allShifts.filter(
                            (s) => !usedShifts.includes(s)
                        );
                        if (shiftAllowedCharacters.length > 0) {
                            jamIstirahatTanpaOK.readOnly = true;
                            jamKerjaTanpaOK.readOnly = true;
                            stdWaktuTanpaOK.readOnly = true;
                            jamIstirahatTanpaOK.value = data[0].Jam_Istirahat;
                            jamKerjaTanpaOK.value = data[0].Jam_Kerja;
                            stdWaktuTanpaOK.value = data[0].Standard_Waktu;
                        } else {
                            namaMesinMPJTanpaOK.val(null).trigger("change");
                            shiftAllowedCharacters = ["A", "B", "C"];
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text:
                                    "Shift A, B, C untuk Kode Barang " +
                                    kodeBarangHasilTanpaOK.value +
                                    " sudah diinput.",
                            });
                            clearAllTanpaOK();
                            return;
                        }
                    } else {
                        jamIstirahatTanpaOK.readOnly = false;
                        jamKerjaTanpaOK.readOnly = false;
                        stdWaktuTanpaOK.readOnly = false;
                    }
                    shiftMPJTanpaOK.focus();
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

    shiftMPJTanpaOK.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !shiftAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!shiftAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            if (shiftAllowedCharacters.length == 3) {
                this.setCustomValidity(
                    "Hanya karakter " +
                        shiftAllowedCharacters.join(", ") +
                        " yang diperbolehkan"
                );
            } else {
                this.setCustomValidity(
                    "Hanya shift " +
                        shiftAllowedCharacters.join(", ") +
                        " yang belum diinput"
                );
            }
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shiftMPJTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (stdWaktuTanpaOK.readOnly) {
                bahanBakuKgMPJTanpaOK.select();
            } else {
                stdWaktuTanpaOK.select();
            }
        }
    });

    bahanBakuKgMPJTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilLBRMPJTanpaOK.select();
        }
    });

    hasilLBRMPJTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWAKGTanpaOK.select();
        }
    });

    hasilLBRMPJTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanWAKGTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWALBRTanpaOK.select();
        }
    });

    afalanWAKGTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanWALBRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWEKGTanpaOK.select();
        }
    });

    afalanWALBRTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanWEKGTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanWELBRTanpaOK.select();
        }
    });

    afalanWEKGTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanWELBRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanPotongKGTanpaOK.select();
        }
    });

    afalanWELBRTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanPotongKGTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanPotongLBRTanpaOK.select();
        }
    });

    afalanPotongKGTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanPotongLBRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamKerjaTanpaOK.select();
        }
    });

    jamKerjaTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamIstirahatTanpaOK.select();
        }
    });

    jamIstirahatTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamGangguanMesinTanpaOK.select();
        }
    });

    jamGangguanMesinTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamGangguanLainTanpaOK.select();
        }
    });

    jamGangguanLainTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesMPJTanpaOK.focus();
        }
    });

    button_modalProsesMPJTanpaOK.addEventListener("click", function (e) {
        let idLog = $(this).data("id");
        const getValue = (el) => parseFloat(el?.value || 0);

        const stdWaktuValue = getValue(stdWaktuTanpaOK);
        const bahanBakuKgMPJValue = getValue(bahanBakuKgMPJTanpaOK);
        const hasilLBRMPJValue = getValue(hasilLBRMPJTanpaOK);
        const afalanWAKGValue = getValue(afalanWAKGTanpaOK);
        const afalanWALBRValue = getValue(afalanWALBRTanpaOK);
        const afalanWEKGValue = getValue(afalanWEKGTanpaOK);
        const afalanWELBRValue = getValue(afalanWELBRTanpaOK);
        const afalanPotongKGValue = getValue(afalanPotongKGTanpaOK);
        const afalanPotongLBRValue = getValue(afalanPotongLBRTanpaOK);
        const jamKerjaValue = getValue(jamKerjaTanpaOK);
        const jamIstirahatValue = getValue(jamIstirahatTanpaOK);
        const jamGangguanMesinValue = getValue(jamGangguanMesinTanpaOK);
        const jamGangguanLainValue = getValue(jamGangguanLainTanpaOK);
        const totalAfalanValue = getValue(totalAfalanTanpaOK);
        const hasilKotorValue = getValue(hasilKotorTanpaOK);

        // Disable the button
        button_modalProsesMPJTanpaOK.disabled = true;

        // Re-enable after 5 seconds (5000 ms)
        setTimeout(function () {
            button_modalProsesMPJTanpaOK.disabled = false;
        }, 300);

        // Check if date is larger than today
        let selectedDate = tanggalLogMesinMPJTanpaOK.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLogMesinMPJTanpaOK.select();
            });
            return;
        }

        if (shiftMPJTanpaOK.value == "" || shiftMPJTanpaOK.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftMPJTanpaOK.select();
            });
            return;
        }

        if (
            namaMesinMPJTanpaOK.val() === "" ||
            namaMesinMPJTanpaOK.val() == null
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinMPJTanpaOK.select2("open");
                }, 200);
            });
            return;
        }

        if (
            kodeBarangHasilTanpaOK.value == "" ||
            kodeBarangHasilTanpaOK.value == null
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Kode Barang Hasil tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                kodeBarangHasilTanpaOK.focus();
            });
            return;
        }

        if (idLog) {
            if (
                alasanEditTanpaOK.value == "" ||
                alasanEditTanpaOK.value == null
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Alasan Edit harus diisi",
                    returnFocus: false,
                }).then(() => {
                    alasanEditTanpaOK.focus();
                });
                return;
            }
        }

        $.ajax({
            url: "/KegiatanMesinMPJPerHariABM",
            type: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                jenisLog: 2,
                Tgl_LogMPJ: tanggalLogMesinMPJTanpaOK.value,
                shiftMPJ: shiftMPJTanpaOK.value,
                namaMesinMPJ: namaMesinMPJTanpaOK.val(),
                kodeBarangHasilTanpaOK: kodeBarangHasilTanpaOK.value,
                stdWaktu: stdWaktuValue,
                bahanBakuKgMPJ: bahanBakuKgMPJValue,
                hasilLBRMPJ: hasilLBRMPJValue,
                afalanWAKG: afalanWAKGValue,
                afalanWALBR: afalanWALBRValue,
                afalanWEKG: afalanWEKGValue,
                afalanWELBR: afalanWELBRValue,
                afalanPotongKG: afalanPotongKGValue,
                afalanPotongLBR: afalanPotongLBRValue,
                totalAfalan: totalAfalanValue,
                hasilKotor: hasilKotorValue,
                jamKerja: jamKerjaValue,
                jamIstirahat: jamIstirahatValue,
                jamGangguanMesin: jamGangguanMesinValue,
                jamGangguanLain: jamGangguanLainValue,
                idLog: idLog,
                alasanEdit: alasanEditTanpaOK.value,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idLog
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        table_logMesin.ajax.reload();
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
