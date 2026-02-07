jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [1, 5], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial")
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        paging: false,
        scrollY: "150px",
        scrollX: "150px",
        scrollCollapse: true,
    });
    tgl_awal.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    tgl_akhir.valueAsDate = new Date();

    // checkbox_all.addEventListener("change", function () {
    //     const checkboxes = document.querySelectorAll(
    //         '#table_atas input[type="checkbox"][name="penerimaCheckbox"]'
    //     );
    //     checkedRows = [];

    //     checkboxes.forEach(function (checkbox) {
    //         checkbox.checked = checkbox_all.checked;

    //         if (checkbox_all.checked) {
    //             let row = table_atas.row($(checkbox).closest("tr")).data();
    //             checkedRows.push(row);
    //         }
    //     });

    //     console.log(checkedRows);
    // });
    let btn_print = document.getElementById("btn_print");
    btn_print.style.display = "none";

    //#region Function

    function convertToSQLDatetime(dateInput, timeElement) {
        let tgl = dateInput.value;
        if (!tgl) {
            alert("Tanggal belum diisi!");
            return null;
        }

        let jamStr = timeElement.trim();
        if (!jamStr) {
            alert(`${timeElement.id} belum diisi!`);
            return null;
        }

        // Ubah titik jadi titik dua
        jamStr = jamStr.replace('.', ':');

        // Jika belum ada menit, tambahkan :00
        if (!jamStr.includes(':')) {
            jamStr += ':00';
        }

        // Format SQL Server
        let datetimeSQL = `${tgl} ${jamStr}:00`;

        // Validasi tanggal
        let d = new Date(datetimeSQL);
        if (isNaN(d.getTime())) {
            // alert(`Format jam pada ${timeElement.id} tidak valid!`);
            alert(`Format jam tidak valid! Contoh 10.30 atau 10:30`);
            return null;
        }

        // Simpan hasilnya ke value elemen
        timeElement.value = datetimeSQL;

        return datetimeSQL;
    }

    function ambilJam(datetime) {
        if (!datetime) return '';
        return datetime.substring(11, 16); // HH:mm
    }

    function formatAngka(val) {
        if (val === '' || val === null || isNaN(val)) return '';

        let num = parseFloat(val);

        // 10.00 → 10
        if (Number.isInteger(num)) return numeral(num).format('0');

        // **Jika angka punya lebih dari 1 decimal yang bukan .x0 atau .75 → tampilkan apa adanya**
        let decimal = (num.toString().split('.')[1] || '');
        if (decimal.length > 1 && decimal !== '75' && decimal !== '70') {
            return numeral(num).format('0.00');  // contoh: 10.23 → 10.23
        }

        // 10.75 → 10.75
        if (decimal === '75') return numeral(num).format('0.00');

        // 10.70 → 10.7
        return numeral(num).format('0.[0]');
    }

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ACCGudangPB/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                    });
                },
            },
            columns: [
                {
                    data: "idHeader",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                {
                    data: 'tanggal_raw', // Data asli untuk sorting
                    render: function (data, type, row) {
                        // type === 'display' digunakan saat menampilkan di tabel
                        if (type === 'display') {
                            return row.tanggal; // tampilkan versi m/d/Y
                        }
                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                    }
                },
                { data: "jam_muat" },
                { data: "nopol" },
                { data: "instansi" },
                { data: "tujuan_kirim" },
                { data: "sopir" },
                { data: "NamaUser" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        return `
                    <button class="btn btn-sm btn-primary btn-view" style="width: 60px;"data-id="${row.idHeader}">
                        <i class="fa fa-edit"></i> View
                    </button>
                    `;
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).css("font-family", "Arial");
                $(row).css("font-size", "14px");
            },
            headerCallback: function (thead, data, start, end, display) {
                $(thead).find("th")
                    .css("font-family", "Arial")
                    .css("font-size", "14px")
                    .css("text-align", "center");
            },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;

        $.ajax({
            url: "ACCGudangPB",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                checkedRows: checkedRows,
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
                        $("#table_atas").DataTable().ajax.reload();
                        // btn_batal.click();
                        // btn_redisplay.click();
                        btn_proses.disabled = false;
                        // $("#labelProses").text("Input Data");
                        // $("#btn_proses").text("PROSES");
                        // idDetail = null;
                        // tanggal.valueAsDate = new Date();
                        // $("#" + slcTypeMesin.id).val(null).trigger("change");
                        // slcMesin.val(null).trigger("change");
                        // jam_mati.value = ambilJam(null);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                btn_proses.disabled = false;
            },
        });
    });

    let checkedRows = [];
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            rowData = table_atas.row($(this).closest("tr")).data();

            if (this.checked) {
                checkedRows.push(rowData); // Add checked row data to the array
            } else {
                checkedRows = checkedRows.filter(
                    (row) => row.idHeader !== rowData.idHeader
                ); // Remove unchecked row data
            }
            console.log(checkedRows); // Debugging output
        }
    );

    let idHeader = null;
    $('#table_atas').on('click', '.btn-view', function () {
        const idHeaderLink = $(this).data("id");

        console.log("ID Header:", idHeaderLink);

        // simpan idHeaderLink (jika diperlukan di modal)
        $("#modalLaporan").data("idheader", idHeaderLink);
        $.ajax({
            url: "PemeriksaanBarang/getPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                idHeaderLink: idHeaderLink,
            },
            success: function (data) {
                console.log(data);

                document.getElementById("tujuanKirimP").innerHTML =
                    data.header.tujuan_kirim;
                document.getElementById("tanggalMuatP").innerHTML =
                    data.header.tanggal;
                document.getElementById("nopolP").innerHTML =
                    data.header.nopol;
                document.getElementById("jamMuatP").innerHTML =
                    data.header.jam_muat;
                document.getElementById("instansiP").innerHTML =
                    data.header.instansi;

                // ==============================
                // HITUNG TOTAL BERDASARKAN SATUAN
                // ==============================
                let totalPerGroup = {};
                let lastIndexPerGroup = {};

                // ===============================
                // HITUNG TOTAL PER GROUP
                // ===============================
                data.detail.forEach((item, index) => {
                    let type = item.nama_typeBarang ?? "";
                    let satuan = item.Nama_satuan ?? "";

                    let key = `${type}__${satuan}`;

                    // total per group
                    if (!totalPerGroup[key]) {
                        totalPerGroup[key] = 0;
                    }
                    totalPerGroup[key] += Number(item.item) || 0;

                    // simpan index terakhir group
                    lastIndexPerGroup[key] = index;
                });

                // ===============================
                // RENDER TABLE
                // ===============================
                let tbodyHTML = "";

                data.detail.forEach((item, index) => {
                    let type = item.nama_typeBarang ?? "";
                    let satuan = item.Nama_satuan ?? "";
                    let key = `${type}__${satuan}`;

                    let totalGroup = totalPerGroup[key] ?? 0;

                    // tampilkan total hanya di row terakhir group
                    let totalHTML = "";
                    if (lastIndexPerGroup[key] === index) {
                        totalHTML = `<strong>${formatAngka(totalGroup)}&nbsp;${satuan}</strong>`;
                    }

                    tbodyHTML += `
                        <tr>
                            <td class="center" style="width:20px;">
                                ${index + 1}
                            </td>
                            <td class="center" style="width:120px;">
                                ${type}
                            </td>
                            <td class="center" style="width:50px;">
                                ${ambilJam(item.jam) ?? ""}
                            </td>
                            <td class="center" style="width:120px;">
                                ${formatAngka(item.item) ?? ""}&nbsp;${satuan}
                            </td>
                            <td class="center" style="width:50px;">
                                ${totalHTML}
                            </td>
                        </tr>
                    `;
                });

                // ===============================
                // INJECT KE TABLE
                // ===============================
                document.querySelector("#modalItemTable tbody").innerHTML = tbodyHTML;
                // window.print();

                if (data.header.ttd_base64 && data.header.ttd_base64 !== "") {

                    let ttd = data.header.ttd_base64;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_sopir")
                        .attr("src", ttd)
                        .show();
                } else {
                    $("#ttd_sopir")
                        .attr("src", "")
                        .show();
                }
                if (data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {

                    let ttd = data.ttd.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_satpam")
                        .attr("src", ttd)
                        .show();
                } else {
                    $("#ttd_satpam")
                        .attr("src", "")
                        .show();
                }

                document.getElementById("namaSatpamP").innerHTML =
                    data.ttd.NamaUser;
                document.getElementById("namaSopirP").innerHTML =
                    data.header.sopir;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        // buka modal Bootstrap 5
        let modal = new bootstrap.Modal(
            document.getElementById("modalLaporan")
        );
        modal.show();
    });
});