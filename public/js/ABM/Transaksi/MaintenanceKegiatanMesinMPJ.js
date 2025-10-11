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
    let afalanCutterKG = document.getElementById("afalanCutterKG"); // prettier-ignore
    let afalanCutterLBR = document.getElementById("afalanCutterLBR"); // prettier-ignore
    let ukuranKain = document.getElementById('ukuranKain'); // prettier-ignore
    let rajutanKain = document.getElementById('rajutanKain'); // prettier-ignore
    let denierKain = document.getElementById('denierKain'); // prettier-ignore
    let totalAfalan = document.getElementById("totalAfalan"); // prettier-ignore
    let hasilKotor = document.getElementById("hasilKotor"); // prettier-ignore
    let jamKerja = document.getElementById("jamKerja"); // prettier-ignore
    let jenisShift = document.getElementById("jenisShift"); // prettier-ignore
    let inputJamKerjaAwal = document.getElementById("jamKerjaAwal"); // prettier-ignore
    let inputJamKerjaAkhir = document.getElementById("jamKerjaAkhir"); // prettier-ignore
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
    let afalanCutterKGTanpaOK = document.getElementById('afalanCutterKGTanpaOK'); //prettier-ignore
    let afalanCutterLBRTanpaOK = document.getElementById('afalanCutterLBRTanpaOK'); //prettier-ignore
    let ukuranKainTanpaOK = document.getElementById('ukuranKainTanpaOK'); // prettier-ignore
    let rajutanKainTanpaOK = document.getElementById('rajutanKainTanpaOK'); // prettier-ignore
    let denierKainTanpaOK = document.getElementById('denierKainTanpaOK'); // prettier-ignore
    let totalAfalanTanpaOK = document.getElementById('totalAfalanTanpaOK'); // prettier-ignore
    let hasilKotorTanpaOK = document.getElementById('hasilKotorTanpaOK'); // prettier-ignore
    let jamKerjaTanpaOK = document.getElementById('jamKerjaTanpaOK'); // prettier-ignore
    let jenisShiftTanpaOK = document.getElementById("jenisShiftTanpaOK"); // prettier-ignore
    let inputJamKerjaAwalTanpaOK = document.getElementById("jamKerjaAwalTanpaOK"); // prettier-ignore
    let inputJamKerjaAkhirTanpaOK = document.getElementById("jamKerjaAkhirTanpaOK"); // prettier-ignore
    let jamIstirahatTanpaOK = document.getElementById('jamIstirahatTanpaOK'); // prettier-ignore
    let jamGangguanMesinTanpaOK = document.getElementById('jamGangguanMesinTanpaOK'); // prettier-ignore
    let jamGangguanLainTanpaOK = document.getElementById('jamGangguanLainTanpaOK'); // prettier-ignore
    let div_alasanEditMPJTanpaOK = document.getElementById('div_alasanEditMPJTanpaOK'); // prettier-ignore
    let alasanEditTanpaOK = document.getElementById('alasanEditTanpaOK'); // prettier-ignore
    let button_modalProsesMPJTanpaOK = document.getElementById('button_modalProsesMPJTanpaOK'); // prettier-ignore
    let panjangKain, lebarKain;
    let jamKerjaAwal = flatpickr("#jamKerjaAwal", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // 24-hour format (HH:mm)
        time_24hr: true, // Force 24-hour mode
        allowInput: true, // ✅ lets you type directly
        onClose: function (selectedDates, dateStr, instance, e) {
            inputJamKerjaAkhir.focus(); // ✅ works reliably
            inputJamKerjaAkhir.select();
            console.log("Jam Kerja: " + jamKerja.value);
            console.log("Jam Istirahat: " + jamIstirahat.value);
        },
    });
    let jamKerjaAkhir = flatpickr("#jamKerjaAkhir", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // 24-hour format (HH:mm)
        time_24hr: true, // Force 24-hour mode
        allowInput: true, // ✅ lets you type directly
        onClose: function (selectedDates, dateStr, instance, e) {
            jamGangguanMesin.focus(); // ✅ works reliably
            jamGangguanMesin.select();
            console.log("Jam Kerja: " + jamKerja.value);
            console.log("Jam Istirahat: " + jamIstirahat.value);
        },
    });
    let jamKerjaAwalTanpaOK = flatpickr("#jamKerjaAwalTanpaOK", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // 24-hour format (HH:mm)
        time_24hr: true, // Force 24-hour mode
        allowInput: true, // ✅ lets you type directly
        onClose: function (selectedDates, dateStr, instance, e) {
            inputJamKerjaAkhirTanpaOK.focus(); // ✅ works reliably
            inputJamKerjaAkhirTanpaOK.select();
            console.log("Jam Kerja Tanpa OK: " + jamKerjaTanpaOK.value);
            console.log("Jam Istirahat Tanpa OK: " + jamIstirahatTanpaOK.value);
        },
    });
    let jamKerjaAkhirTanpaOK = flatpickr("#jamKerjaAkhirTanpaOK", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // 24-hour format (HH:mm)
        time_24hr: true, // Force 24-hour mode
        allowInput: true, // ✅ lets you type directly
        onClose: function (selectedDates, dateStr, instance, e) {
            jamGangguanMesinTanpaOK.select();
            jamGangguanMesinTanpaOK.focus(); // ✅ works reliably
            console.log("Jam Kerja Tanpa OK: " + jamKerjaTanpaOK.value);
            console.log("Jam Istirahat Tanpa OK: " + jamIstirahatTanpaOK.value);
        },
    });
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
        ukuranKain.value = "";
        rajutanKain.value = "";
        denierKain.value = 0;
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
        afalanCutterKG.value = 0;
        afalanCutterLBR.value = 0;
        totalAfalan.value = 0;
        hasilKotor.value = 0;
        jamKerja.value = 0;
        jamKerjaAwal.setDate("00:00");
        jamKerjaAkhir.setDate("00:00");
        jamIstirahat.value = 0;
        jamGangguanMesin.value = 0;
        jamGangguanLain.value = 0;
        alasanEdit.value = "";
    }

    function clearAllTanpaOK() {
        shiftMPJTanpaOK.value = "";
        ukuranKainTanpaOK.value = "";
        rajutanKainTanpaOK.value = "";
        denierKainTanpaOK.value = 0;
        stdWaktuTanpaOK.value = 0;
        hasilLBRMPJTanpaOK.value = 0;
        bahanBakuKgMPJTanpaOK.value = 0;
        afalanWAKGTanpaOK.value = 0;
        afalanWALBRTanpaOK.value = 0;
        afalanWEKGTanpaOK.value = 0;
        afalanWELBRTanpaOK.value = 0;
        afalanPotongKGTanpaOK.value = 0;
        afalanPotongLBRTanpaOK.value = 0;
        afalanCutterKGTanpaOK.value = 0;
        afalanCutterLBRTanpaOK.value = 0;
        totalAfalanTanpaOK.value = 0;
        hasilKotorTanpaOK.value = 0;
        jamKerjaTanpaOK.value = 0;
        jamKerjaAwalTanpaOK.setDate("00:00");
        jamKerjaAkhirTanpaOK.setDate("00:00");
        jamIstirahatTanpaOK.value = 0;
        jamGangguanMesinTanpaOK.value = 0;
        jamGangguanLainTanpaOK.value = 0;
        alasanEditTanpaOK.value = "";
    }

    function sumTotalAfalanXHasilKotor() {
        const getValue = (el) => parseFloat(el.value || 0);

        const total =
            getValue(afalanWALBR) +
            getValue(afalanWELBR) +
            getValue(afalanPotongLBR) +
            getValue(afalanCutterLBR);

        totalAfalan.value = total;
        hasilKotor.value = getValue(hasilLBRMPJ) + total;
    }

    function sumTotalAfalanXHasilKotorTanpaOK() {
        const getValue = (el) => parseFloat(el.value || 0);

        const total =
            getValue(afalanWALBRTanpaOK) +
            getValue(afalanWELBRTanpaOK) +
            getValue(afalanPotongLBRTanpaOK) +
            getValue(afalanCutterLBRTanpaOK);

        totalAfalanTanpaOK.value = total;
        hasilKotorTanpaOK.value = getValue(hasilLBRMPJTanpaOK) + total;
    }

    function hitungLBRAfalan(afalanLBR, afalanKG) {
        let a = parseFloat(afalanKG) || 0;
        let b = parseFloat(panjangKain) || 0;
        let c = parseFloat(rajutanKain.value.split(" X ")[0].trim() / 10) || 0;
        let d = parseFloat(denierKain.value / 1000) || 0;
        let e = parseFloat(lebarKain) || 0;

        let part1 = (((a / b / c / d / 0.0175) * 10) / (e + 4)) * 100;
        let part2 = (((0 / 51 / 1.1 / 0.85 / 0.0175) * 10) / (76 + 7)) * 100;
        let part3 = (((0 / 48 / 1.2 / 0.9 / 0.0175) * 10) / (65 + 4)) * 100;

        afalanLBR.value = Math.floor(part1 + part2 + part3);
    }

    function getShiftCycleWeek() {
        const currentDate = new Date();
        const oneJan = new Date(currentDate.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(
            ((currentDate - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
        );
        return ((weekNumber - 1) % 3) + 1; // cycle through 1, 2, 3
    }

    function hitungJamKerjaJamIstirahat() {
        const startStr = inputJamKerjaAwal.value;
        const endStr = inputJamKerjaAkhir.value;

        if (!startStr || !endStr) {
            jamKerja.value = 0;
            jamIstirahat.value = 0;
            return;
        }

        const today = new Date();
        let start = new Date(today);
        let end = new Date(today);

        const [sh, sm] = startStr.split(":").map(Number);
        const [eh, em] = endStr.split(":").map(Number);
        start.setHours(sh, sm, 0, 0);
        end.setHours(eh, em, 0, 0);

        // Handle overnight shift (e.g. 23:00–07:00)
        if (end <= start) {
            end.setDate(end.getDate() + 1);
        }

        // Define break times (base)
        const baseBreaks = [
            ["11:30", "12:30"],
            ["17:30", "18:30"],
            ["03:00", "04:00"],
        ];

        // Duplicate breaks for today and tomorrow
        const breaks = [];
        for (const [bStart, bEnd] of baseBreaks) {
            const [bh1, bm1] = bStart.split(":").map(Number);
            const [bh2, bm2] = bEnd.split(":").map(Number);
            for (let offset = 0; offset <= 1; offset++) {
                const s = new Date(today);
                const e = new Date(today);
                s.setDate(today.getDate() + offset);
                e.setDate(today.getDate() + offset);
                s.setHours(bh1, bm1, 0, 0);
                e.setHours(bh2, bm2, 0, 0);
                breaks.push([s, e]);
            }
        }

        // Calculate total break time overlapping with working range
        let totalBreakMinutes = 0;
        for (const [bStart, bEnd] of breaks) {
            const overlapStart = new Date(Math.max(start, bStart));
            const overlapEnd = new Date(Math.min(end, bEnd));
            if (overlapEnd > overlapStart) {
                totalBreakMinutes += (overlapEnd - overlapStart) / 60000;
            }
        }

        // Total gross working minutes (without subtracting break)
        const grossWorkMinutes = (end - start) / 60000;

        // If jenisShift is checked → no breaks at all
        if (jenisShift.checked) {
            jamKerja.value = grossWorkMinutes;
            jamIstirahat.value = 0;
            return;
        }

        // Assign values
        jamKerja.value = grossWorkMinutes; // full duration
        jamIstirahat.value = totalBreakMinutes; // only break duration
    }

    function hitungJamKerjaJamIstirahatTanpaOK() {
        const startStr = inputJamKerjaAwalTanpaOK.value;
        const endStr = inputJamKerjaAkhirTanpaOK.value;

        if (!startStr || !endStr) {
            jamKerja.value = 0;
            jamIstirahat.value = 0;
            return;
        }

        const today = new Date();
        let start = new Date(today);
        let end = new Date(today);

        const [sh, sm] = startStr.split(":").map(Number);
        const [eh, em] = endStr.split(":").map(Number);
        start.setHours(sh, sm, 0, 0);
        end.setHours(eh, em, 0, 0);

        // Handle overnight shift (e.g. 23:00–07:00)
        if (end <= start) {
            end.setDate(end.getDate() + 1);
        }

        // Define break times (base)
        const baseBreaks = [
            ["11:30", "12:30"],
            ["17:30", "18:30"],
            ["03:00", "04:00"],
        ];

        // Duplicate breaks for today and tomorrow
        const breaks = [];
        for (const [bStart, bEnd] of baseBreaks) {
            const [bh1, bm1] = bStart.split(":").map(Number);
            const [bh2, bm2] = bEnd.split(":").map(Number);
            for (let offset = 0; offset <= 1; offset++) {
                const s = new Date(today);
                const e = new Date(today);
                s.setDate(today.getDate() + offset);
                e.setDate(today.getDate() + offset);
                s.setHours(bh1, bm1, 0, 0);
                e.setHours(bh2, bm2, 0, 0);
                breaks.push([s, e]);
            }
        }

        // Calculate total break time overlapping with working range
        let totalBreakMinutes = 0;
        for (const [bStart, bEnd] of breaks) {
            const overlapStart = new Date(Math.max(start, bStart));
            const overlapEnd = new Date(Math.min(end, bEnd));
            if (overlapEnd > overlapStart) {
                totalBreakMinutes += (overlapEnd - overlapStart) / 60000;
            }
        }

        // Total gross working minutes (without subtracting break)
        const grossWorkMinutes = (end - start) / 60000;

        // If jenisShift is checked → no breaks at all
        if (jenisShiftTanpaOK.checked) {
            jamKerjaTanpaOK.value = grossWorkMinutes;
            jamIstirahatTanpaOK.value = 0;
            return;
        }

        // Assign values
        jamKerjaTanpaOK.value = grossWorkMinutes; // full duration
        jamIstirahatTanpaOK.value = totalBreakMinutes; // only break duration
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
                    afalanCutterKG.value = numeral(response.log[0].AfalanCutter_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanCutterLBR.value = numeral(response.log[0].AfalanCutter_LBR).format('0.00') ?? 0; // prettier-ignore
                    ukuranKain.value = response.log[0].Ukuran ?? "0 X 0";
                    rajutanKain.value = response.log[0].Rajutan ?? "0 X 0";
                    denierKain.value = response.log[0].Denier ?? 0;
                    if (ukuranKain.value) {
                        let parts = ukuranKain.value.split(" X ");
                        if (parts.length === 2) {
                            // panjang bisa berupa ekspresi penjumlahan
                            let panjangExpr = parts[0].trim();
                            let panjangVal = panjangExpr
                                .split("+")
                                .map((x) => parseFloat(x.trim()))
                                .reduce((sum, num) => sum + num, 0);

                            panjangKain = panjangVal;
                            lebarKain = parseFloat(parts[1].trim());
                        }
                    }
                    ukuranKain.readOnly = true;
                    rajutanKain.readOnly = true;
                    denierKain.readOnly = true;
                    totalAfalan.value = numeral(response.log[0].Total_Afalan).format('0.00') ?? 0; // prettier-ignore
                    hasilKotor.value = numeral(response.log[0].Hasil_Kotor).format('0.00') ?? 0; // prettier-ignore
                    jamKerja.value = numeral(response.log[0].Jam_Kerja).format('0.00') ?? 0; // prettier-ignore
                    jamKerjaAwal.setDate(
                        response.log[0].Jam_KerjaAwal ?? "00:00"
                    );
                    jamKerjaAkhir.setDate(
                        response.log[0].Jam_KerjaAkhir ?? "00:00"
                    );
                    jamIstirahat.value = numeral(response.log[0].Jam_Istirahat).format('0.00') ?? 0; // prettier-ignore
                    jamGangguanMesin.value = numeral(response.log[0].Jam_Gangguan_Mesin).format('0.00') ?? 0; // prettier-ignore
                    jamGangguanLain.value = numeral(response.log[0].Jam_Gangguan_Lain).format('0.00') ?? 0; // prettier-ignore
                } else if (response.log[0].Jenis_Log == 2) {
                    // tanpa OK
                    tambahKegiatanMesinMPJTanpaOKLabel.innerHTML = "Edit Data Id Log: " + rowID; // prettier-ignore
                    $("#button_modalProsesMPJTanpaOK").data("id", rowID);
                    tanggalLogMesinMPJTanpaOK.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                    kodeBarangHasilTanpaOK.value =
                        response.log[0].Kode_Barang_Hasil ?? "";
                    namaMesinMPJTanpaOK.empty();
                    response.mesin.forEach(function (listMesin) {
                        namaMesinMPJTanpaOK.append(
                            new Option(listMesin.NamaMesin, listMesin.IdMesin)
                        );
                    });
                    namaMesinMPJTanpaOK
                        .val(response.log[0].Id_Mesin)
                        .trigger("change");
                    shiftMPJTanpaOK.value = response.log[0].Shift;
                    ukuranKainTanpaOK.value = response.log[0].Ukuran ?? "";
                    rajutanKainTanpaOK.value = response.log[0].Rajutan ?? "";
                    denierKainTanpaOK.value = response.log[0].Denier ?? 0;
                    alasanEditTanpaOK.value = "";
                    namaBarangMPJTanpaOK.innerHTML =
                        response.log[0].NAMA_BRG ??
                        "Kode Barang Hasil belum terdaftar, lakukan edit dan pastikan kolom kode barang printing sudah terisi untuk mendaftarkan";
                    stdWaktuTanpaOK.value = numeral(response.log[0].Standard_Waktu).format('0.00') ?? 0; // prettier-ignore
                    bahanBakuKgMPJTanpaOK.value = response.log[0].BahanBaku_Kg ?? 0; // prettier-ignore
                    hasilLBRMPJTanpaOK.value = response.log[0].Hasil_Lembar ?? 0; // prettier-ignore
                    afalanWAKGTanpaOK.value = numeral(response.log[0].AfalanWA_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanWALBRTanpaOK.value = numeral(response.log[0].AfalanWA_LBR).format('0.00') ?? 0; // prettier-ignore
                    afalanWEKGTanpaOK.value = numeral(response.log[0].AfalanWE_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanWELBRTanpaOK.value = numeral(response.log[0].AfalanWE_LBR).format('0.00') ?? 0; // prettier-ignore
                    afalanPotongKGTanpaOK.value = numeral(response.log[0].AfalanPotong_KG).format('0.00') ?? 0; // prettier-ignore
                    afalanPotongLBRTanpaOK.value = numeral(response.log[0].AfalanPotong_LBR).format('0.00') ?? 0; // prettier-ignore
                    afalanCutterKGTanpaOK.value = numeral(response.log[0].AfalanCutter_KG).format('0.00') ?? 0; //prettier-ignore
                    afalanCutterLBRTanpaOK.value = numeral(response.log[0].AfalanCutter_LBR).format('0.00') ?? 0; //prettier-ignore
                    if (ukuranKainTanpaOK.value) {
                        let parts = ukuranKainTanpaOK.value.split(" X ");
                        if (parts.length === 2) {
                            // panjang bisa berupa ekspresi penjumlahan
                            let panjangExpr = parts[0].trim();
                            let panjangVal = panjangExpr
                                .split("+")
                                .map((x) => parseFloat(x.trim()))
                                .reduce((sum, num) => sum + num, 0);
                            panjangKain = panjangVal;
                            lebarKain = parseFloat(parts[1].trim());
                        }
                    }
                    ukuranKainTanpaOK.readOnly = true;
                    rajutanKainTanpaOK.readOnly = true;
                    denierKainTanpaOK.readOnly = true;
                    totalAfalanTanpaOK.value = numeral(response.log[0].Total_Afalan).format('0.00') ?? 0; // prettier-ignore
                    hasilKotorTanpaOK.value = numeral(response.log[0].Hasil_Kotor).format('0.00') ?? 0; // prettier-ignore
                    jamKerjaTanpaOK.value = numeral(response.log[0].Jam_Kerja).format('0.00') ?? 0; // prettier-ignore
                    jamIstirahatTanpaOK.value = numeral(response.log[0].Jam_Istirahat).format('0.00') ?? 0; // prettier-ignore
                    jamGangguanMesinTanpaOK.value = numeral(response.log[0].Jam_Gangguan_Mesin).format('0.00') ?? 0; // prettier-ignore
                    jamGangguanLainTanpaOK.value = numeral(response.log[0].Jam_Gangguan_Lain).format('0.00') ?? 0; // prettier-ignore
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
                console.log(data);

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
                        ukuranKain.value = "";
                        rajutanKain.value = "";
                        denierKain.value = "";
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
                    ukuranKain.value = data.mesin[0].Ukuran ?? "0 X 0";
                    rajutanKain.value = data.mesin[0].Rajutan ?? "0 X 0";
                    denierKain.value = data.mesin[0].Denier ?? 0;
                    if (ukuranKain.value) {
                        let parts = ukuranKain.value.split(" X ");
                        if (parts.length === 2) {
                            // panjang bisa berupa ekspresi penjumlahan
                            let panjangExpr = parts[0].trim();
                            let panjangVal = panjangExpr
                                .split("+")
                                .map((x) => parseFloat(x.trim()))
                                .reduce((sum, num) => sum + num, 0);

                            panjangKain = panjangVal;
                            lebarKain = parseFloat(parts[1].trim());
                        }
                    }
                    ukuranKain.readOnly = true;
                    rajutanKain.readOnly = true;
                    denierKain.readOnly = true;
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
            const cycleWeek = getShiftCycleWeek(); // 1, 2, or 3
            let start = "",
                end = "";

            // Define schedules for each rotation week
            if (cycleWeek === 1) {
                // Week 1
                if (this.value === "A") {
                    start = "07:00";
                    end = "15:00";
                } else if (this.value === "B") {
                    start = "15:00";
                    end = "23:00";
                } else if (this.value === "C") {
                    start = "23:00";
                    end = "07:00";
                }
            } else if (cycleWeek === 2) {
                // Week 2
                if (this.value === "A") {
                    start = "23:00";
                    end = "07:00";
                } else if (this.value === "B") {
                    start = "07:00";
                    end = "15:00";
                } else if (this.value === "C") {
                    start = "15:00";
                    end = "23:00";
                }
            } else if (cycleWeek === 3) {
                // Week 3
                if (this.value === "A") {
                    start = "15:00";
                    end = "23:00";
                } else if (this.value === "B") {
                    start = "23:00";
                    end = "07:00";
                } else if (this.value === "C") {
                    start = "07:00";
                    end = "15:00";
                }
            }

            // Apply to Flatpickr time pickers
            jamKerjaAwal.setDate(start);
            jamKerjaAkhir.setDate(end);
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
            hitungLBRAfalan(afalanPotongLBR, afalanPotongKG.value);
            sumTotalAfalanXHasilKotor();
            afalanPotongLBR.select();
        }
    });

    afalanPotongLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanCutterKG.select();
        }
    });

    afalanPotongLBR.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    afalanCutterKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hitungLBRAfalan(afalanCutterLBR, afalanCutterKG.value);
            sumTotalAfalanXHasilKotor();
            afalanCutterLBR.select();
        }
    });

    afalanCutterLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            inputJamKerjaAwal.select();
        }
    });

    afalanCutterLBR.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotor();
    });

    inputJamKerjaAwal.addEventListener("input", function (e) {
        hitungJamKerjaJamIstirahat();
    });

    inputJamKerjaAkhir.addEventListener("input", function (e) {
        hitungJamKerjaJamIstirahat();
    });

    jenisShift.addEventListener("change", function (e) {
        hitungJamKerjaJamIstirahat();
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
        const afalanCutterKGValue = getValue(afalanCutterKG);
        const afalanCutterLBRValue = getValue(afalanCutterLBR);
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
                afalanCutterKG: afalanCutterKGValue,
                afalanCutterLBR: afalanCutterLBRValue,
                ukuranKain: ukuranKain.value,
                rajutanKain: rajutanKain.value,
                denierKain: denierKain.value,
                totalAfalan: totalAfalanValue,
                hasilKotor: hasilKotorValue,
                jamKerja: jamKerjaValue,
                jamIstirahat: jamIstirahatValue,
                jamKerjaAwal: inputJamKerjaAwal.value,
                jamKerjaAkhir: inputJamKerjaAkhir.value,
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
    //#endregion

    //#region Modal MPJ Tanpa Order Kerja Event Listener
    $("#tambahKegiatanMesinMPJTanpaOKModal").on(
        "shown.bs.modal",
        function (event) {
            let idLog = $("#button_modalProsesMPJTanpaOK").data("id");
            if (idLog == null) {
                tanggalLogMesinMPJTanpaOK.value = moment().format("YYYY-MM-DD");
                kodeBarangHasilTanpaOK.value = "";
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
                        ukuranKainTanpaOK.value =
                            parseFloat(data[0].Lebar) +
                                " + " +
                                parseFloat(data[0].Gaset) +
                                " X " +
                                parseFloat(data[0].Panjang) ?? "0 X 0";
                        rajutanKainTanpaOK.value =
                            parseFloat(data[0].Wapf) +
                                " X " +
                                parseFloat(data[0].Weft) ?? "0 X 0";
                        denierKainTanpaOK.value =
                            parseFloat(data[0].Denier) ?? 0;
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
            ukuranKainTanpaOK.select();
        }
    });

    ukuranKainTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let value = ukuranKainTanpaOK.value.trim();
            // Supports:
            // 100 x 200
            // 50 x 57 + 16
            // 50 x 57 - 10
            // 10 + 10 x 10
            // 10 - 5 x 20
            let ukuranPattern =
                /^\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?$/;
            // Breakdown of Regex:
            // \d+\s*[xX]\s*\d+     → base format (PANJANG X LEBAR)
            // (?:\s*[\+\-]\s*\d+)? → optional part with + or - and a number

            if (!ukuranPattern.test(value)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Ukuran harus diisi sesuai format. Format harus PANJANG X LEBAR, contoh: 100 X 200.",
                    returnFocus: false,
                }).then(() => {
                    ukuranKainTanpaOK.select();
                });
                return;
            }
            rajutanKainTanpaOK.select();
        }
    });

    rajutanKainTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let value = rajutanKainTanpaOK.value.trim();
            // Supports:
            // 100 x 200
            // 50 x 57 + 16
            // 50 x 57 - 10
            // 10 + 10 x 10
            // 10 - 5 x 20
            let ukuranPattern =
                /^\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?$/;
            // Breakdown of Regex:
            // \d+\s*[xX]\s*\d+     → base format (PANJANG X LEBAR)
            // (?:\s*[\+\-]\s*\d+)? → optional part with + or - and a number

            if (!ukuranPattern.test(value)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1000, // Auto-close after 1.5 seconds (optional)
                    text: "Ukuran harus diisi sesuai format. Format harus PANJANG X LEBAR, contoh: 100 X 200.",
                    returnFocus: false,
                }).then(() => {
                    rajutanKainTanpaOK.select();
                });
                return;
            }
            denierKainTanpaOK.select();
        }
    });

    denierKainTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (stdWaktuTanpaOK.readOnly) {
                bahanBakuKgMPJTanpaOK.select();
            } else {
                stdWaktuTanpaOK.select();
            }
        }
    });

    stdWaktuTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bahanBakuKgMPJTanpaOK.select();
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
            hitungLBRAfalan(
                afalanPotongLBRTanpaOK,
                afalanPotongKGTanpaOK.value
            );
            sumTotalAfalanXHasilKotorTanpaOK();
            afalanPotongLBRTanpaOK.select();
        }
    });

    afalanPotongLBRTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanPotongLBRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanCutterKGTanpaOK.select();
        }
    });

    afalanCutterKGTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hitungLBRAfalan(
                afalanCutterLBRTanpaOK,
                afalanCutterKGTanpaOK.value
            );
            sumTotalAfalanXHasilKotorTanpaOK;
            afalanCutterLBRTanpaOK.select();
        }
    });

    afalanCutterLBRTanpaOK.addEventListener("input", function (e) {
        sumTotalAfalanXHasilKotorTanpaOK();
    });

    afalanCutterLBRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            inputJamKerjaAwalTanpaOK.select();
        }
    });

    inputJamKerjaAwalTanpaOK.addEventListener("input", function (e) {
        hitungJamKerjaJamIstirahatTanpaOK();
    });

    inputJamKerjaAkhirTanpaOK.addEventListener("input", function (e) {
        hitungJamKerjaJamIstirahatTanpaOK();
    });

    jenisShiftTanpaOK.addEventListener("change", function (e) {
        hitungJamKerjaJamIstirahatTanpaOK();
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
        const afalanCutterKGValue = getValue(afalanCutterKGTanpaOK);
        const afalanCutterLBRValue = getValue(afalanCutterLBRTanpaOK);
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
                afalanCutterKG: afalanCutterKGValue,
                afalanCutterLBR: afalanCutterLBRValue,
                ukuranKain: ukuranKainTanpaOK.value,
                rajutanKain: rajutanKainTanpaOK.value,
                denierKain: denierKainTanpaOK.value,
                totalAfalan: totalAfalanValue,
                hasilKotor: hasilKotorValue,
                jamKerja: jamKerjaValue,
                jamKerjaAwal: inputJamKerjaAwalTanpaOK.value,
                jamKerjaAkhir: inputJamKerjaAkhirTanpaOK.value,
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
