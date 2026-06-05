jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");

    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial")
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);

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

    const slcLokasi = document.getElementById("lokasi");

    //#region Select2
    $(document).ready(function () {

        $("#" + slcLokasi.id).select2({
            placeholder: "-- Pilih Lokasi --"
        });

        $("#" + slcLokasi.id).on("change", function () {

            const val = $(this).val();
            let allowedType = [];
            switch (val) {
                case "1":
                    // Lokasi 1 boleh semua
                    // btn_redisplay.click();
                    allowedType = ["1", "2"];
                    // btn_batal.click();
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;

                case "2":
                    // Lokasi 2 hanya type tertentu
                    // btn_redisplay.click();
                    allowedType = ["3"];
                    // btn_batal.click();
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;

                case "3":
                    // Lokasi 3 hanya type tertentu
                    // btn_redisplay.click();
                    allowedType = ["4", "5", "6"];
                    // btn_batal.click();
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;
            }
        });

        // default lokasi = 1
        $("#" + slcLokasi.id).val("1").trigger("change");
    });

    //#region Event Listener
    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;

        $.ajax({
            url: "ACCCekGantiUkuranCL",
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
                        checkedRows = [];
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

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ACCCekGantiUkuranCL/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                        lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "id_cek",
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
                { data: "shift" },
                { data: "Type_Mesin" },
                { data: "Nama_mesin" },
                { data: "ukuran_baru" },
                { data: "benang_wa" },
                { data: "benang_we" },
                { data: "user_input" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        return `
                    <button class="btn btn-sm btn-primary btn-view" style="width: 60px;"data-id="${row.id_cek}">
                        <i class="fa fa-edit"></i> View
                    </button>
                    `;
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).css("font-family", "Arial");
                $(row).css("font-size", "14px");
                $(row).css("text-align", "center");
            },
            headerCallback: function (thead, data, start, end, display) {
                $(thead).find("th")
                    .css("font-family", "Arial")
                    .css("font-size", "14px")
                    .css("text-align", "center");
            },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
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
                    (row) => row.id_cek !== rowData.id_cek,
                ); // Remove unchecked row data
            }
            console.log(checkedRows); // Debugging output
        },
    );

    let id_cek = null;
    $("#table_atas").on("click", ".btn-view", function () {
        id_cek = $(this).data("id");
        console.log("ID Header:", id_cek);

        // simpan id_cek (jika diperlukan di modal)
        $("#modalLaporan").data("id_cek", id_cek);
        $.ajax({
            url: "ACCCekGantiUkuranCL/getPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                id_cek: id_cek,
            },
            success: function (data) {
                console.log(data);
                document.getElementById("btn_print").style.display = "none";
                document.getElementById("no_referensiP").innerHTML =
                    data.data[0].id_cek;

                const bulan = [
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];

                const today = new Date();
                const tanggal = today.getDate();
                const namaBulan = bulan[today.getMonth()];
                const tahun = today.getFullYear();

                document.getElementById("tanggalP").innerHTML = `${tanggal} ${namaBulan} ${tahun}`;
                document.getElementById("no_mesinP").innerHTML =
                    data.data[0].Nama_mesin;
                document.getElementById("shiftP").innerHTML =
                    data.data[0].shift;
                document.getElementById("ukuranP").innerHTML =
                    data.data[0].ukuran_baru;
                document.getElementById("jamP").innerHTML =
                    data.data[0].jam_kerja;
                document.getElementById("std_waP").innerHTML = data.data[0].std_wa;
                document.getElementById("toleransi_waP").innerHTML = data.data[0].toleransi_wa;
                document.getElementById("periksa_waP").innerHTML = data.data[0].periksa_wa;
                document.getElementById("selisih_waP").innerHTML = data.data[0].selisih_wa;
                if (data.data[0].keputusan_wa === "Masuk") {
                    document.getElementById("masuk_waP").innerHTML = "✓";
                    document.getElementById("tidak_waP").innerHTML = "";
                } else {
                    document.getElementById("masuk_waP").innerHTML = "";
                    document.getElementById("tidak_waP").innerHTML = "✓";
                }
                document.getElementById("keterangan_waP").innerHTML = data.data[0].keterangan_wa;
                document.getElementById("std_weP").innerHTML = data.data[0].std_we;
                document.getElementById("toleransi_weP").innerHTML = data.data[0].toleransi_we;
                document.getElementById("periksa_weP").innerHTML = data.data[0].periksa_we;
                document.getElementById("selisih_weP").innerHTML = data.data[0].selisih_we;
                if (data.data[0].keputusan_we === "Masuk") {
                    document.getElementById("masuk_weP").innerHTML = "✓";
                    document.getElementById("tidak_weP").innerHTML = "";
                } else {
                    document.getElementById("masuk_weP").innerHTML = "";
                    document.getElementById("tidak_weP").innerHTML = "✓";
                }
                document.getElementById("keterangan_weP").innerHTML = data.data[0].keterangan_we;
                document.getElementById("std_warnaP").innerHTML = data.data[0].std_warna;
                document.getElementById("toleransi_warnaP").innerHTML = data.data[0].toleransi_warna;
                document.getElementById("periksa_warnaP").innerHTML = data.data[0].periksa_warna;
                document.getElementById("selisih_warnaP").innerHTML = data.data[0].selisih_warna;
                if (data.data[0].keputusan_warna === "Masuk") {
                    document.getElementById("masuk_warnaP").innerHTML = "✓";
                    document.getElementById("tidak_warnaP").innerHTML = "";
                } else {
                    document.getElementById("masuk_warnaP").innerHTML = "";
                    document.getElementById("tidak_warnaP").innerHTML = "✓";
                }
                document.getElementById("keterangan_warnaP").innerHTML = data.data[0].keterangan_warna;
                document.getElementById("std_dropperP").innerHTML = data.data[0].std_dropper;
                document.getElementById("toleransi_dropperP").innerHTML = data.data[0].toleransi_dropper;
                document.getElementById("periksa_dropperP").innerHTML = data.data[0].periksa_dropper;
                document.getElementById("selisih_dropperP").innerHTML = data.data[0].selisih_dropper;
                if (data.data[0].keputusan_dropper === "Masuk") {
                    document.getElementById("masuk_dropperP").innerHTML = "✓";
                    document.getElementById("tidak_dropperP").innerHTML = "";
                } else {
                    document.getElementById("masuk_dropperP").innerHTML = "";
                    document.getElementById("tidak_dropperP").innerHTML = "✓";
                }
                document.getElementById("keterangan_dropperP").innerHTML = data.data[0].keterangan_dropper;
                document.getElementById("std_guadringP").innerHTML = data.data[0].std_guadring;
                document.getElementById("toleransi_guadringP").innerHTML = data.data[0].toleransi_guadring;
                document.getElementById("periksa_guadringP").innerHTML = data.data[0].periksa_guadring;
                document.getElementById("selisih_guadringP").innerHTML = data.data[0].selisih_guadring;
                if (data.data[0].keputusan_guadring === "Masuk") {
                    document.getElementById("masuk_guadringP").innerHTML = "✓";
                    document.getElementById("tidak_guadringP").innerHTML = "";
                } else {
                    document.getElementById("masuk_guadringP").innerHTML = "";
                    document.getElementById("tidak_guadringP").innerHTML = "✓";
                }
                document.getElementById("keterangan_guadringP").innerHTML = data.data[0].keterangan_guadring;
                document.getElementById("std_jmlWAP").innerHTML = data.data[0].std_jmlWA;
                document.getElementById("toleransi_jmlWAP").innerHTML = data.data[0].toleransi_jmlWA;
                document.getElementById("periksa_jmlWAP").innerHTML = data.data[0].periksa_jmlWA;
                document.getElementById("selisih_jmlWAP").innerHTML = data.data[0].selisih_jmlWA;
                if (data.data[0].keputusan_jmlWA === "Masuk") {
                    document.getElementById("masuk_jmlWAP").innerHTML = "✓";
                    document.getElementById("tidak_jmlWAP").innerHTML = "";
                } else {
                    document.getElementById("masuk_jmlWAP").innerHTML = "";
                    document.getElementById("tidak_jmlWAP").innerHTML = "✓";
                }
                document.getElementById("keterangan_jmlWAP").innerHTML = data.data[0].keterangan_jmlWA;
                document.getElementById("std_cgP").innerHTML = data.data[0].std_cg;
                document.getElementById("toleransi_cgP").innerHTML = data.data[0].toleransi_cg;
                document.getElementById("periksa_cgP").innerHTML = data.data[0].periksa_cg;
                document.getElementById("selisih_cgP").innerHTML = data.data[0].selisih_cg;
                if (data.data[0].keputusan_cg === "Masuk") {
                    document.getElementById("masuk_cgP").innerHTML = "✓";
                    document.getElementById("tidak_cgP").innerHTML = "";
                } else {
                    document.getElementById("masuk_cgP").innerHTML = "";
                    document.getElementById("tidak_cgP").innerHTML = "✓";
                }
                document.getElementById("keterangan_cgP").innerHTML = data.data[0].keterangan_cg;
                document.getElementById("std_mrP").innerHTML = data.data[0].std_mr;
                document.getElementById("toleransi_mrP").innerHTML = data.data[0].toleransi_mr;
                document.getElementById("periksa_mrP").innerHTML = data.data[0].periksa_mr;
                document.getElementById("selisih_mrP").innerHTML = data.data[0].selisih_mr;
                if (data.data[0].keputusan_mr === "Masuk") {
                    document.getElementById("masuk_mrP").innerHTML = "✓";
                    document.getElementById("tidak_mrP").innerHTML = "";
                } else {
                    document.getElementById("masuk_mrP").innerHTML = "";
                    document.getElementById("tidak_mrP").innerHTML = "✓";
                }
                document.getElementById("keterangan_mrP").innerHTML = data.data[0].keterangan_mr;
                document.getElementById("std_bkP").innerHTML = data.data[0].std_bk;
                document.getElementById("toleransi_bkP").innerHTML = data.data[0].toleransi_bk;
                document.getElementById("periksa_bkP").innerHTML = data.data[0].periksa_bk;
                document.getElementById("selisih_bkP").innerHTML = data.data[0].selisih_bk;
                if (data.data[0].keputusan_bk === "Masuk") {
                    document.getElementById("masuk_bkP").innerHTML = "✓";
                    document.getElementById("tidak_bkP").innerHTML = "";
                } else {
                    document.getElementById("masuk_bkP").innerHTML = "";
                    document.getElementById("tidak_bkP").innerHTML = "✓";
                }
                document.getElementById("keterangan_bkP").innerHTML = data.data[0].keterangan_bk;
                document.getElementById("std_lkP").innerHTML = data.data[0].std_lk;
                document.getElementById("toleransi_lkP").innerHTML = data.data[0].toleransi_lk;
                document.getElementById("periksa_lkP").innerHTML = data.data[0].periksa_lk;
                document.getElementById("selisih_lkP").innerHTML = data.data[0].selisih_lk;
                if (data.data[0].keputusan_lk === "Masuk") {
                    document.getElementById("masuk_lkP").innerHTML = "✓";
                    document.getElementById("tidak_lkP").innerHTML = "";
                } else {
                    document.getElementById("masuk_lkP").innerHTML = "";
                    document.getElementById("tidak_lkP").innerHTML = "✓";
                }
                document.getElementById("keterangan_lkP").innerHTML = data.data[0].keterangan_lk;
                document.getElementById("std_lk2P").innerHTML = data.data[0].std_lk2;
                document.getElementById("toleransi_lk2P").innerHTML = data.data[0].toleransi_lk2;
                document.getElementById("periksa_lk2P").innerHTML = data.data[0].periksa_lk2;
                document.getElementById("selisih_lk2P").innerHTML = data.data[0].selisih_lk2;
                if (data.data[0].keputusan_lk2 === "Masuk") {
                    document.getElementById("masuk_lk2P").innerHTML = "✓";
                    document.getElementById("tidak_lk2P").innerHTML = "";
                } else {
                    document.getElementById("masuk_lk2P").innerHTML = "";
                    document.getElementById("tidak_lk2P").innerHTML = "✓";
                }
                document.getElementById("keterangan_lk2P").innerHTML = data.data[0].keterangan_lk2;
                document.getElementById("catatanP").innerHTML = data.data[0].catatan;
                function formatTanggalIndonesia(tanggal) {
                    const bulan = [
                        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ];

                    const [tahun, bulanAngka, hari] = tanggal.split('-');

                    return `${parseInt(hari)} ${bulan[parseInt(bulanAngka) - 1]} ${tahun}`;
                }

                document.getElementById("tanggal_gantiUkuranP").innerHTML =
                    formatTanggalIndonesia(data.data[0].tanggal_ganti);
                document.getElementById("tanggal_cekP").innerHTML =
                    formatTanggalIndonesia(data.data[0].tanggal_raw);

                if (data.data[0].ttd_qc !== "" && data.data[0].ttd_qc !== null) {
                    let ttd = data.data[0].ttd_qc;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_qc").attr("src", ttd).show();
                    document.getElementById("nama_qcP").innerHTML = data.data[0].nama_qc;
                } else {
                    $("#ttd_qc").attr("src", "").show();

                    document.getElementById("nama_qcP").innerHTML = 'Nama QC';
                }

                if (data.data[0].ttd_cl !== "" && data.data[0].ttd_cl !== null) {
                    let ttd = data.data[0].ttd_cl;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_ksqc").attr("src", ttd).show();
                    document.getElementById("nama_ksqcP").innerHTML = data.data[0].nama_cl;
                } else {
                    $("#ttd_ksqc").attr("src", "").show();

                    document.getElementById("nama_ksqcP").innerHTML = 'Nama KS. CL';
                }

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        }).then(() => {
            // buka modal Bootstrap 5
            let modal = new bootstrap.Modal(
                document.getElementById("modalLaporan"),
            );
            modal.show();
        });
    });
});