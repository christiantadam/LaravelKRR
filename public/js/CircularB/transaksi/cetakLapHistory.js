jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_proses = document.getElementById("btn_proses");
    let tanggal = document.getElementById("tanggal");
    let labelInfo = document.getElementById("labelInfo");
    let btn_prosesCetak = document.getElementById("btn_prosesCetak");
    let btn_keluar = document.getElementById("btn_keluar");
    let btn_excel = document.getElementById("btn_excel");
    tanggal.valueAsDate = new Date();

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

    function formatTanggalHariIni() {
        const bulan = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const t = new Date();
        const dd = String(t.getDate()).padStart(2, '0');
        const mmm = bulan[t.getMonth()];
        const yyyy = t.getFullYear();
        return `${dd}-${mmm}-${yyyy}`;
    }

    btn_excel.addEventListener("click", function (event) {
        event.preventDefault();

        $.ajax({
            url: "/orderB/show/getLaporanExcel",
            type: "GET",
            data: { _token: csrfToken },
            success: function (response) {

                if (!Array.isArray(response) || response.length === 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: "Tidak ada data untuk diexport!",
                        showConfirmButton: true,
                    });
                    return;
                }

                // === Header multi-baris ===
                let header1 = [
                    "NoOrder", "tglStart", "Ukuran", "Rjt", "", "Dn", "Warna", "Bahan", "Mesin", "JmlMesin",
                    "Order", "", "", "", "",
                    "PAGI", "", "",
                    "SORE", "", "",
                    "MALAM", "", "",
                    "TOTAL", "", "ActualPcPerHari",
                    "Rata", "Sisa", "TglFinish", "Afalan", ""
                ];

                let header2 = [
                    "", "", "", "WA", "WE", "", "", "", "", "",
                    "QtyOrder", "ActualOrder", "PanjangPotongan", "ActualPc", "",
                    "Mtr_P", "KG_P", "Eff_P",
                    "Mtr_S", "KG_S", "Eff_S",
                    "Mtr_M", "Kg_M", "Eff_M",
                    "Total_Mtr", "Total_kg", "ActualPcPerHari",
                    "Rata_Eff", "", "", "Afalan_WA", "Afalan_We"
                ];

                let columns = [
                    "NoOrder", "tglStart", "Ukuran", "WA", "WE", "Denier", "Warna", "Bahan", "Mesin", "JmlMesin",
                    "QtyOrder", "ActualOrder", "PanjangPotongan", "ActualPc", "",
                    "Mtr_P", "KG_P", "Eff_P",
                    "Mtr_S", "KG_S", "Eff_S",
                    "Mtr_M", "Kg_M", "Eff_M",
                    "Total_Mtr", "Total_kg", "ActualPcPerHari",
                    "Rata_Eff", "Sisa", "TglFinish", "Afalan_WA", "Afalan_We"
                ];

                let body = response.map(item => columns.map(key => item[key] ?? ""));

                // === Tambahkan header laporan di atas tabel ===
                const infoHeader = [
                    [
                        "PT. KERTA RAJASA RAYA", "", "", "", "", "", "", "", "", "", "", "",
                        "No. Referensi", ":", "000016", // kolom 0–14
                        "LAPORAN HISTORY PER-HARI" // kolom ke-15 (P)
                    ],
                    ["Woven bag - Jumbo bag Industrial", "", "", "", "", "", "", "", "", "", "", "", "Tgl. Berlaku", ":", formatTanggalHariIni()],
                    ["FM - 7.5 - 01 - CL - 01 - 02", "", "", "", "", "", "", "", "", "", "", "", "Halaman", ":", ""],
                    [],
                    header1,
                    header2,
                ];

                let worksheet = XLSX.utils.aoa_to_sheet([...infoHeader, ...body]);

                if (worksheet["P1"]) {
                    worksheet["P1"].s = {
                        font: { bold: true, sz: 32 },
                        alignment: { horizontal: "center", vertical: "center" }
                    };
                }

                // === Merge area header laporan ===
                worksheet["!merges"] = [
                    // === Header laporan ===
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } }, // PT. KERTA RAJASA RAYA
                    { s: { r: 0, c: 12 }, e: { r: 0, c: 13 } }, // "No. Referensi :"
                    { s: { r: 0, c: 14 }, e: { r: 0, c: 14 } }, // Nomor

                    // merge besar untuk "LAPORAN HISTORY PER-HARI"
                    { s: { r: 0, c: 15 }, e: { r: 2, c: 31 } }, // kolom P (15) s/d AF (31), baris 1–3

                    // Baris kedua
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 11 } },
                    { s: { r: 1, c: 12 }, e: { r: 1, c: 13 } },
                    { s: { r: 1, c: 14 }, e: { r: 1, c: 14 } },

                    // Baris ketiga
                    { s: { r: 2, c: 0 }, e: { r: 2, c: 11 } },
                    { s: { r: 2, c: 12 }, e: { r: 2, c: 13 } },
                    { s: { r: 2, c: 14 }, e: { r: 2, c: 14 } },

                    // === Header tabel ===
                    { s: { r: 4, c: 0 }, e: { r: 5, c: 0 } }, // NoOrder
                    { s: { r: 4, c: 1 }, e: { r: 5, c: 1 } }, // tglStart
                    { s: { r: 4, c: 2 }, e: { r: 5, c: 2 } }, // Ukuran
                    { s: { r: 4, c: 3 }, e: { r: 4, c: 4 } }, // Rjt WA/WE
                    { s: { r: 4, c: 5 }, e: { r: 5, c: 5 } }, // Dn
                    { s: { r: 4, c: 6 }, e: { r: 5, c: 6 } }, // Warna
                    { s: { r: 4, c: 7 }, e: { r: 5, c: 7 } }, // Bahan
                    { s: { r: 4, c: 8 }, e: { r: 5, c: 8 } }, // Mesin
                    { s: { r: 4, c: 9 }, e: { r: 5, c: 9 } }, // JmlMesin
                    { s: { r: 4, c: 10 }, e: { r: 4, c: 11 } }, // Order
                    { s: { r: 4, c: 15 }, e: { r: 4, c: 17 } }, // PAGI
                    { s: { r: 4, c: 18 }, e: { r: 4, c: 20 } }, // SORE
                    { s: { r: 4, c: 21 }, e: { r: 4, c: 23 } }, // MALAM
                    { s: { r: 4, c: 24 }, e: { r: 4, c: 25 } }, // TOTAL
                    { s: { r: 4, c: 26 }, e: { r: 5, c: 26 } }, // ActualPcPerHari
                    { s: { r: 4, c: 27 }, e: { r: 5, c: 27 } }, // Rata + Rata_Eff
                    { s: { r: 4, c: 28 }, e: { r: 5, c: 28 } }, // Sisa
                    { s: { r: 4, c: 29 }, e: { r: 5, c: 29 } }, // TglFinish
                    { s: { r: 4, c: 30 }, e: { r: 4, c: 31 } }, // Afalan
                ];

                // Format teks header
                // Object.keys(worksheet)
                //     .filter(cell => cell[0] !== "!")
                //     .forEach(cell => {
                //         let cellRef = XLSX.utils.decode_cell(cell);
                //         if (cellRef.r <= 5) {
                //             worksheet[cell].s = {
                //                 font: { bold: true },
                //                 alignment: { horizontal: "center", vertical: "center" },
                //             };
                //         }
                //     });
                Object.keys(worksheet)
                    .filter(cell => cell[0] !== "!")
                    .forEach(cell => {
                        let cellRef = XLSX.utils.decode_cell(cell);
                        // Baris 0–5 = infoHeader + header1 + header2
                        if (cellRef.r <= 5) {
                            worksheet[cell].s = {
                                font: { bold: true },
                                alignment: {
                                    horizontal: "right",
                                    vertical: "center",
                                    wrapText: true
                                },
                            };
                        }
                    });

                // === Simpan ke file Excel ===
                let workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "LaporanHistory");

                let filename = `LaporanHistory_${new Date().toISOString().slice(0, 10)}.xlsx`;
                XLSX.writeFile(workbook, filename, { cellStyles: true });
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Gagal mengambil data dari server",
                });
            },
        });
    });

    btn_prosesCetak.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderB/store",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
                kodeProses: "ProsesCetakHistoryCIR",
            },
            success: function (response) {
                console.log(response.message);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        labelInfo.style.display = "block";
                        btn_prosesCetak.style.display = "block";
                        btn_keluar.style.display = "block";
                        btn_proses.style.display = "none";
                        document.querySelector(".card-header").textContent =
                            "Proses Cetak History Circular";
                        tanggal.disabled = true;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderB/store",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
                kodeProses: "ProsesLapHistoryCIR",
            },
            success: function (response) {
                console.log(response.message);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        labelInfo.style.display = "block";
                        btn_prosesCetak.style.display = "block";
                        btn_keluar.style.display = "block";
                        btn_proses.style.display = "none";
                        document.querySelector(".card-header").textContent =
                            "Proses Cetak History Circular";
                        tanggal.disabled = true;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_keluar.addEventListener("click", function (event) {
        event.preventDefault();
        labelInfo.style.display = "none";
        btn_prosesCetak.style.display = "none";
        btn_keluar.style.display = "none";
        btn_proses.style.display = "block";
        document.querySelector(".card-header").textContent =
            "Proses Simpan Tanggal History";
        tanggal.disabled = false;
    });
});
