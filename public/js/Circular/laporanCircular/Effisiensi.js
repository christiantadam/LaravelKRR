jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let btn_afalan = document.getElementById("btn_afalan");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let btn_excel = document.getElementById("btn_excel");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        columnDefs: [
            {
                targets: 3,
                width: "400px",
            }],
        paging: false,
        scrollY: "500px",
        // scrollX: "300px",
        scrollX: true,
        scrollCollapse: true,

    });

    $("#table_atas").css("width", "200%");
    table_atas.columns.adjust().draw();

    tanggal.valueAsDate = new Date();
    tanggal.focus();
    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_excel.addEventListener("click", function (event) {
        event.preventDefault();
        let dt = table_atas;

        let tgl = new Date(tanggal.value);
        let bulan = String(tgl.getMonth() + 1).padStart(2, '0');
        let hari = String(tgl.getDate()).padStart(2, '0');
        let tahun = tgl.getFullYear();
        let tglFormat = `${bulan}/${hari}/${tahun}`; // format m/d/y

        let headerTitle = ["LAPORAN KEGIATAN MESIN PER HARI"];
        let headerPeriode = [`PERIODE ${tglFormat}`];

        let header1 = [
            "NO", "NO MESIN", "RPM", "NAMA BARANG",
            "BENANG", "",         // WARP/WEFT merge
            "PAGI", "",           // Eff/Mtr
            "SORE", "",           // Eff/Mtr
            "MALAM", "",          // Eff/Mtr
            "RATA-RATA", "",      // Eff/Mtr
            "TTL METER", "", "", "", ""
        ];

        let header2 = [
            "", "", "", "",
            "WARP", "WEFT",
            "Eff", "Mtr",
            "Eff", "Mtr",
            "Eff", "Mtr",
            "Eff", "Mtr",
            "", "", "", "", ""
        ];

        let ws_data = [];
        ws_data.push(headerTitle);
        ws_data.push(headerPeriode);
        ws_data.push([]); // baris kosong sebelum header kolom
        ws_data.push(header1);
        ws_data.push(header2);

        let rows = dt.rows({ search: 'applied', order: 'applied' }).data().toArray();
        let prefixCount = {};

        let currentPrefix = null;
        let prefixStart = "";
        let prefixEnd = "";

        let prefixEff_P = [];
        let prefixEff_S = [];
        let prefixEff_M = [];
        let prefixRata_Eff = [];

        let totalSumMtr_P = 0;
        let totalSumMtr_S = 0;
        let totalSumMtr_M = 0;
        let totalSumTot_Mtr = 0;

        function avg(arr) {
            if (arr.length === 0) return 0;
            return arr.reduce((a, b) => a + parseFloat(b || 0), 0) / arr.length;
        }

        function pushSummaryRow(lastRow) {
            ws_data.push([
                "",
                `${prefixStart} sampai ${prefixEnd}`,
                "",
                "EFEKTIVITAS MESIN",
                lastRow.EfektivitasMesin,
                "",
                avg(prefixEff_P).toFixed(2),
                lastRow.SumMtr_P,
                avg(prefixEff_S).toFixed(2),
                lastRow.SumMtr_S,
                avg(prefixEff_M).toFixed(2),
                lastRow.SumMtr_M,
                avg(prefixRata_Eff).toFixed(2),
                "",
                lastRow.SumTot_Mtr,
                "", "", "", "", ""
            ]);

            totalSumMtr_P += parseFloat(lastRow.SumMtr_P) || 0;
            totalSumMtr_S += parseFloat(lastRow.SumMtr_S) || 0;
            totalSumMtr_M += parseFloat(lastRow.SumMtr_M) || 0;
            totalSumTot_Mtr += parseFloat(lastRow.SumTot_Mtr) || 0;
        }

        for (let i = 0; i < rows.length; i++) {
            let d = rows[i];
            let prefix = d.No_Mesin.split("-")[0];

            if (currentPrefix !== prefix) {
                if (currentPrefix !== null) {
                    pushSummaryRow(rows[i - 1]);
                }
                currentPrefix = prefix;
                prefixCount[prefix] = 0;
                prefixStart = d.No_Mesin;

                prefixEff_P = [];
                prefixEff_S = [];
                prefixEff_M = [];
                prefixRata_Eff = [];
            }

            prefixEnd = d.No_Mesin;
            prefixCount[prefix]++;

            prefixEff_P.push(parseFloat(d.Eff_P) || 0);
            prefixEff_S.push(parseFloat(d.Eff_S) || 0);
            prefixEff_M.push(parseFloat(d.Eff_M) || 0);
            prefixRata_Eff.push(parseFloat(d.Rata_Eff) || 0);

            ws_data.push([
                prefixCount[prefix],
                d.No_Mesin,
                d.Rpm,
                d.NAMA_BRG,
                d.Bng_Warp,
                d.Bng_Weft,
                d.Eff_P,
                d.Mtr_P,
                d.Eff_S,
                d.Mtr_S,
                d.Eff_M,
                d.Mtr_M,
                d.Rata_Eff,
                d.Rata_Mtr,
                d.Tot_Mtr,
                "", "", "", "", ""
            ]);
        }

        if (rows.length > 0) {
            pushSummaryRow(rows[rows.length - 1]);
        }

        // 🔹 Tambahkan TOTAL AKHIR di baris paling bawah
        ws_data.push([
            "", "", "", "",
            "", "",
            "TOTAL MTR",
            totalSumMtr_P.toFixed(2),
            "",
            totalSumMtr_S.toFixed(2),
            "",
            totalSumMtr_M.toFixed(2),
            "",
            totalSumTot_Mtr.toFixed(2),
            "", "", "", "", ""
        ]);

        let ws = XLSX.utils.aoa_to_sheet(ws_data);

        ws['!merges'] = [
            // 🔹 merge judul dan periode
            { s: { r: 0, c: 0 }, e: { r: 0, c: 14 } }, // "LAPORAN KEGIATAN MESIN PER HARI"
            { s: { r: 1, c: 0 }, e: { r: 1, c: 14 } }, // "PERIODE ..."
            // 🔹 merge header tabel
            { s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
            { s: { r: 3, c: 1 }, e: { r: 4, c: 1 } },
            { s: { r: 3, c: 2 }, e: { r: 4, c: 2 } },
            { s: { r: 3, c: 3 }, e: { r: 4, c: 3 } },
            { s: { r: 3, c: 4 }, e: { r: 3, c: 5 } },
            { s: { r: 3, c: 6 }, e: { r: 3, c: 7 } },
            { s: { r: 3, c: 8 }, e: { r: 3, c: 9 } },
            { s: { r: 3, c: 10 }, e: { r: 3, c: 11 } },
            { s: { r: 3, c: 12 }, e: { r: 3, c: 13 } },
            { s: { r: 3, c: 14 }, e: { r: 4, c: 14 } },
        ];

        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "LaporanEffisiensi");

        // nama file pakai format m-d-y agar tidak error di Windows
        let fileDate = `${bulan}-${hari}-${tahun}`;
        XLSX.writeFile(wb, `LaporanEffisiensi_${fileDate}.xlsx`);
    });



    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "Effisiensi/prosesLapEffisiensi",
            type: "GET",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
            },
            success: function (response) {
                console.log(response);

                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        // 🔹 Kelompokkan EfektivitasMesin dan Mtr per prefix No_Mesin
                        let groupedEff = {};
                        let groupedSum = {}; // untuk sum per prefix No_Mesin

                        response.data.forEach(item => {
                            const prefix = item.No_Mesin.split("-")[0]; // ambil "SO" dari "SO-01"
                            const effValue = parseFloat(item.EfektivitasMesin) || 0;

                            // --- Kelompokkan EfektivitasMesin untuk rata-rata
                            if (!groupedEff[prefix]) groupedEff[prefix] = [];
                            groupedEff[prefix].push(effValue);

                            // --- Kelompokkan nilai Mtr_* untuk SUM per prefix
                            if (!groupedSum[prefix]) {
                                groupedSum[prefix] = {
                                    Mtr_P: 0,
                                    Mtr_S: 0,
                                    Mtr_M: 0,
                                    Tot_Mtr: 0
                                };
                            }

                            groupedSum[prefix].Mtr_P += parseFloat(item.Mtr_P) || 0;
                            groupedSum[prefix].Mtr_S += parseFloat(item.Mtr_S) || 0;
                            groupedSum[prefix].Mtr_M += parseFloat(item.Mtr_M) || 0;
                            groupedSum[prefix].Tot_Mtr += parseFloat(item.Tot_Mtr) || 0;
                        });

                        // 🔹 Hitung rata-rata EfektivitasMesin per prefix
                        let avgEff = {};
                        for (const key in groupedEff) {
                            const total = groupedEff[key].reduce((a, b) => a + b, 0);
                            avgEff[key] = total / groupedEff[key].length;
                        }

                        // 🔹 Tambahkan hasil rata-rata & total per prefix ke setiap item
                        response.data.forEach(item => {
                            const prefix = item.No_Mesin.split("-")[0];
                            const sum = groupedSum[prefix];

                            item.AvgEfektivitas = avgEff[prefix]?.toFixed(2) || "0.00";
                            item.SumMtr_P = sum?.Mtr_P || 0;
                            item.SumMtr_S = sum?.Mtr_S || 0;
                            item.SumMtr_M = sum?.Mtr_M || 0;
                            item.SumTot_Mtr = sum?.Tot_Mtr || 0;
                        });

                        // 🔹 (opsional) variabel rata-rata & total global jika dibutuhkan
                        console.log("Rata-rata Efektivitas per prefix:", avgEff);
                        console.log("Total Mtr per prefix:", groupedSum);

                        // 🔹 Inisialisasi DataTable
                        table_atas = $("#table_atas").DataTable({
                            destroy: true,
                            data: response.data,
                            columns: [
                                { data: null }, // No urut (kosong dulu)
                                { data: "No_Mesin" },
                                { data: "Rpm" },
                                { data: "NAMA_BRG" },
                                { data: "Bng_Warp" },
                                { data: "Bng_Weft" },
                                {
                                    data: "Eff_P",
                                    render: data => numeral(data || 0).format('0.00')
                                },
                                { data: "Mtr_P" },
                                {
                                    data: "Eff_S",
                                    render: data => numeral(data || 0).format('0.00')
                                },
                                { data: "Mtr_S" },
                                {
                                    data: "Eff_M",
                                    render: data => numeral(data || 0).format('0.00')
                                },
                                { data: "Mtr_M" },
                                {
                                    data: "Rata_Eff",
                                    render: data => numeral(data || 0).format('0.00')
                                },
                                { data: "Rata_Mtr" },
                                { data: "Tot_Mtr" },
                                { data: "EfektivitasMesin" },
                                {
                                    data: "SumMtr_P",
                                    render: data => numeral(data || 0).format('0,0')
                                },
                                {
                                    data: "SumMtr_S",
                                    render: data => numeral(data || 0).format('0,0')
                                },
                                {
                                    data: "SumMtr_M",
                                    render: data => numeral(data || 0).format('0,0')
                                },
                                {
                                    data: "SumTot_Mtr",
                                    render: data => numeral(data || 0).format('0,0')
                                },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    render: function (data, type, row, meta) {
                                        return meta.row + 1;
                                    }
                                },
                                {
                                    targets: 3,
                                    width: "400px",
                                },
                            ],
                            paging: false,
                            scrollY: "500px",
                            scrollX: true,
                            scrollCollapse: true,
                            order: [[1, "asc"]],
                        });

                        // ✅ Numbering reset per prefix mesin
                        table_atas.on('order.dt search.dt', function () {
                            let rows = table_atas.rows({ search: 'applied', order: 'applied' }).data();
                            let prefixCount = {};
                            let index = 0;

                            table_atas.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell) {
                                let prefix = rows[index].No_Mesin.split("-")[0];

                                if (!prefixCount[prefix]) prefixCount[prefix] = 1;
                                else prefixCount[prefix]++;

                                cell.innerHTML = prefixCount[prefix];
                                index++;
                            });
                        }).draw();

                        $("#table_atas").css("width", "200%");
                        table_atas.columns.adjust().draw();
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
});