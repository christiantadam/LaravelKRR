jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let tanggal = document.getElementById("tanggal");
    let tanggalGU = document.getElementById("tanggalGU");
    let jam_kerja_awal = document.getElementById("jam_kerja_awal");
    let jam_kerja_akhir = document.getElementById("jam_kerja_akhir");
    let std_wa = document.getElementById("std_wa");
    let toleransi_wa = document.getElementById("toleransi_wa");
    let periksa_wa = document.getElementById("periksa_wa");
    let selisih_wa = document.getElementById("selisih_wa");
    let keterangan_wa = document.getElementById("keterangan_wa");
    let std_we = document.getElementById("std_we");
    let toleransi_we = document.getElementById("toleransi_we");
    let periksa_we = document.getElementById("periksa_we");
    let selisih_we = document.getElementById("selisih_we");
    let keterangan_we = document.getElementById("keterangan_we");
    let std_warna = document.getElementById("std_warna");
    let toleransi_warna = document.getElementById("toleransi_warna");
    let periksa_warna = document.getElementById("periksa_warna");
    let selisih_warna = document.getElementById("selisih_warna");
    let keterangan_warna = document.getElementById("keterangan_warna");
    let std_dropper = document.getElementById("std_dropper");
    let toleransi_dropper = document.getElementById("toleransi_dropper");
    let periksa_dropper = document.getElementById("periksa_dropper");
    let selisih_dropper = document.getElementById("selisih_dropper");
    let keterangan_dropper = document.getElementById("keterangan_dropper");
    let std_guadring = document.getElementById("std_guadring");
    let toleransi_guadring = document.getElementById("toleransi_guadring");
    let periksa_guadring = document.getElementById("periksa_guadring");
    let selisih_guadring = document.getElementById("selisih_guadring");
    let keterangan_guadring = document.getElementById("keterangan_guadring");
    let std_jmlWA = document.getElementById("std_jmlWA");
    let toleransi_jmlWA = document.getElementById("toleransi_jmlWA");
    let periksa_jmlWA = document.getElementById("periksa_jmlWA");
    let selisih_jmlWA = document.getElementById("selisih_jmlWA");
    let keterangan_jmlWA = document.getElementById("keterangan_jmlWA");
    let std_cg = document.getElementById("std_cg");
    let toleransi_cg = document.getElementById("toleransi_cg");
    let periksa_cg = document.getElementById("periksa_cg");
    let selisih_cg = document.getElementById("selisih_cg");
    let keterangan_cg = document.getElementById("keterangan_cg");
    let std_mr = document.getElementById("std_mr");
    let toleransi_mr = document.getElementById("toleransi_mr");
    let periksa_mr = document.getElementById("periksa_mr");
    let selisih_mr = document.getElementById("selisih_mr");
    let keterangan_mr = document.getElementById("keterangan_mr");
    let std_bk = document.getElementById("std_bk");
    let toleransi_bk = document.getElementById("toleransi_bk");
    let periksa_bk = document.getElementById("periksa_bk");
    let selisih_bk = document.getElementById("selisih_bk");
    let keterangan_bk = document.getElementById("keterangan_bk");
    let std_lk = document.getElementById("std_lk");
    let toleransi_lk = document.getElementById("toleransi_lk");
    let periksa_lk = document.getElementById("periksa_lk");
    let selisih_lk = document.getElementById("selisih_lk");
    let keterangan_lk = document.getElementById("keterangan_lk");
    let std_lk2 = document.getElementById("std_lk2");
    let toleransi_lk2 = document.getElementById("toleransi_lk2");
    let periksa_lk2 = document.getElementById("periksa_lk2");
    let selisih_lk2 = document.getElementById("selisih_lk2");
    let keterangan_lk2 = document.getElementById("keterangan_lk2");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let labelRedisplay = document.getElementById("labelRedisplay");
    let tgl_awalBawah = document.getElementById("tgl_awalBawah");
    let tgl_akhirBawah = document.getElementById("tgl_akhirBawah");
    let btn_redisplayBawah = document.getElementById("btn_redisplayBawah");
    let btn_laporan = document.getElementById("btn_laporan");

    tanggal.valueAsDate = new Date();
    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    tgl_awalBawah.valueAsDate = new Date();
    tgl_akhirBawah.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    // tgl_awalBawah.valueAsDate = new Date(2025, 11, 25);

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
    const slcShift = document.getElementById("shift");
    const slcTypeMesin = document.getElementById("type_mesin");
    const slcKeputusan_wa = document.getElementById("keputusan_wa");
    const slcKeputusan_we = document.getElementById("keputusan_we");
    const slcKeputusan_warna = document.getElementById("keputusan_warna");
    const slcKeputusan_dropper = document.getElementById("keputusan_dropper");
    const slcKeputusan_guadring = document.getElementById("keputusan_guadring");
    const slcKeputusan_jmlWA = document.getElementById("keputusan_jmlWA");
    const slcKeputusan_cg = document.getElementById("keputusan_cg");
    const slcKeputusan_mr = document.getElementById("keputusan_mr");
    const slcKeputusan_bk = document.getElementById("keputusan_bk");
    const slcKeputusan_lk = document.getElementById("keputusan_lk");
    const slcKeputusan_lk2 = document.getElementById("keputusan_lk2");

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

    let table_bawah = $("#table_bawah").DataTable({
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

    // #region Select2

    let keputusan_wa = $("#" + slcKeputusan_wa.id);
    keputusan_wa.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_we = $("#" + slcKeputusan_we.id);
    keputusan_we.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_warna = $("#" + slcKeputusan_warna.id);
    keputusan_warna.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_dropper = $("#" + slcKeputusan_dropper.id);
    keputusan_dropper.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_guadring = $("#" + slcKeputusan_guadring.id);
    keputusan_guadring.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_jmlWA = $("#" + slcKeputusan_jmlWA.id);
    keputusan_jmlWA.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_cg = $("#" + slcKeputusan_cg.id);
    keputusan_cg.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_mr = $("#" + slcKeputusan_mr.id);
    keputusan_mr.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_bk = $("#" + slcKeputusan_bk.id);
    keputusan_bk.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_lk = $("#" + slcKeputusan_lk.id);
    keputusan_lk.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    let keputusan_lk2 = $("#" + slcKeputusan_lk2.id);
    keputusan_lk2.select2({
        placeholder: "-- Pilih Keputusan --",
        minimumResultsForSearch: Infinity
    });

    keputusan_wa.val("Masuk").trigger("change");
    keputusan_we.val("Masuk").trigger("change");
    keputusan_warna.val("Masuk").trigger("change");
    keputusan_dropper.val("Masuk").trigger("change");
    keputusan_guadring.val("Masuk").trigger("change");
    keputusan_jmlWA.val("Masuk").trigger("change");
    keputusan_cg.val("Masuk").trigger("change");
    keputusan_mr.val("Masuk").trigger("change");
    keputusan_bk.val("Masuk").trigger("change");
    keputusan_lk.val("Masuk").trigger("change");
    keputusan_lk2.val("Masuk").trigger("change");

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
                    btn_redisplay.click();
                    allowedType = ["1", "2"];
                    // btn_batal.click();
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;

                case "2":
                    // Lokasi 2 hanya type tertentu
                    btn_redisplay.click();
                    allowedType = ["3"];
                    // btn_batal.click();
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;

                case "3":
                    // Lokasi 3 hanya type tertentu
                    btn_redisplay.click();
                    allowedType = ["4", "5", "6"];
                    // btn_batal.click();
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;
            }

            let $type = $("#" + slcTypeMesin.id);

            // reset pilihan
            $type.val(null).trigger("change");

            // filter option
            $type.find("option").each(function () {

                if (!this.value) return;

                if (allowedType.includes(this.value)) {
                    $(this).prop("disabled", false).show();
                } else {
                    $(this).prop("disabled", true).hide();
                }
            });

            // re-init select2 agar refresh
            $type.select2("destroy").select2({
                placeholder: "-- Pilih Type Mesin --"
            });

            // reset mesin
            $("#" + slcMesin.id)
                .empty()
                .append(new Option())
                .prop("disabled", true)
                .trigger("change");
        });

        // default lokasi = 1
        $("#" + slcLokasi.id).val("1").trigger("change");
    });

    $("#" + slcShift.id).select2({ placeholder: "-- Pilih Shift --" });
    $("#" + slcShift.id).on("select2:select", function () {
        switch (this.value) {
            case "B":
                jam_kerja_awal.value = "07:00";
                jam_kerja_akhir.value = "15:00";
                break;

            case "C":
                jam_kerja_awal.value = "15:00";
                jam_kerja_akhir.value = "23:00";
                break;

            case "A":
                jam_kerja_awal.value = "23:00";
                jam_kerja_akhir.value = "07:00";
                break;

            default:
                Swal.fire({
                    icon: "warning",
                    title: "Shift Tidak Dikenal",
                });
                break;
        }
        $("#" + slcTypeMesin.id).select2("open");
    });

    $("#" + slcTypeMesin.id).select2({ placeholder: "-- Pilih Type Mesin --" });
    $("#" + slcTypeMesin.id).on("select2:select", function () {
        $("#" + slcMesin.id)
            .empty()
            .append(new Option())
            .trigger("change");

        slcMesin.prop("disabled", false);
        slcMesin.focus();
        const val = $(this).val();

        setTimeout(() => {
            fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val());
        }, 300);
    });
    $("#" + slcTypeMesin.id).prop("disabled", true);

    const slcMesin = $("#nama_mesin");
    slcMesin.prop("disabled", true);
    function fetchDataMesin(endpoint, idNama_mesin) {
        fetch(endpoint)
            .then((response) => response.json())
            .then((options) => {
                slcMesin
                    .empty()
                    .append(
                        `<option disabled selected>-- Pilih Mesin --</option>`
                    );

                Promise.all(
                    options.map((entry) => {
                        return new Promise((resolve) => {
                            const displayText = `${entry.Id_mesin} | ${entry.Nama_mesin}`;
                            slcMesin.append(
                                new Option(displayText, entry.Id_mesin)
                            );
                            resolve(); // Resolve after appending
                        });
                    })
                ).then(() => {
                    // if (labelProses.textContent == "Input Data") {
                    //     slcMesin.select2("open");
                    // } else {
                    slcMesin.val(idNama_mesin).trigger("change");
                    slcMesin.prop("disabled", true);
                    // }
                });
            });
    }

    let namaMesin = null;
    slcMesin.select2({
        // dropdownParent: $("#modalAsalKonversi"),
        placeholder: "-- Pilih Mesin --",
    });
    slcMesin.on("change", function () {
        const selectedMesin = $(this).val();
        console.log(selectedMesin);
        if (selectedMesin) {
            if (labelProses.textContent == "Input Data") {
                setTimeout(() => {
                    const text = $(this).find(":selected").text();
                    namaMesin = text.split("|")[1].trim();
                    console.log(namaMesin);
                }, 300);
            }
        }
    });

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

    function getShiftLastDone() {
        const now = new Date();
        const jam = now.getHours();
        const menit = now.getMinutes();
        const timeNow = jam * 60 + menit;

        const endP = 15 * 60; // 15:00
        const endS = 23 * 60; // 23:00
        const endM = 7 * 60;  // 07:00

        let shift = "";

        if (timeNow >= endS) {
            // lewat 23:00
            shift = "S";
        } else if (timeNow >= endP) {
            // lewat 15:00
            shift = "P";
        } else if (timeNow >= endM) {
            // lewat 07:00
            shift = "M";
        } else {
            // sebelum 07:00 → ambil shift sebelum M selesai = S
            shift = "S";
        }

        return shift;
    }

    //#region Event Listener
    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        // btn_proses.disabled = true;
        let jam_kerja_awalConvert = null;
        if (jam_kerja_awal.value.trim() !== "") {
            jam_kerja_awalConvert = convertToSQLDatetime(tanggal, jam_kerja_awal.value);
            if (jam_kerja_awalConvert === null) return;
        }
        let jam_kerja_akhirConvert = null;
        if (jam_kerja_akhir.value.trim() !== "") {
            jam_kerja_akhirConvert = convertToSQLDatetime(tanggal, jam_kerja_akhir.value);
            if (jam_kerja_akhirConvert === null) return;
        }
        if (selectedRow === null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data ganti ukuran dahulu!",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }

        // if ($("#" + slcTypeMesin.id).val() === "" || slcMesin.val() === "" || slcMesin.val() === null || jam_berhentiConvert === null) {
        //     Swal.fire({
        //         icon: "info",
        //         title: "Info!",
        //         text: "Type mesin, mesin, dan jam berhenti tidak boleh kosong!",
        //         showConfirmButton: true,
        //         // timer: 2000 
        //     });
        //     btn_proses.disabled = false;
        //     return;
        // }
        $.ajax({
            url: "CekGantiUkuranCL",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (labelProses.textContent == "Koreksi Data") ? 2 : 1,
                tanggal: tanggal.value,
                id_cek: id_cek,
                id_pemeriksaan: id_pemeriksaan,
                shift: shift.value,
                type_mesin: $("#" + slcTypeMesin.id).val(),
                nama_mesin: slcMesin.val(),
                jam_kerja_awal: jam_kerja_awalConvert,
                jam_kerja_akhir: jam_kerja_akhirConvert,
                std_wa: std_wa.value,
                toleransi_wa: toleransi_wa.value,
                periksa_wa: periksa_wa.value,
                selisih_wa: selisih_wa.value,
                keterangan_wa: keterangan_wa.value,
                std_we: std_we.value,
                toleransi_we: toleransi_we.value,
                periksa_we: periksa_we.value,
                selisih_we: selisih_we.value,
                keterangan_we: keterangan_we.value,
                std_warna: std_warna.value,
                toleransi_warna: toleransi_warna.value,
                periksa_warna: periksa_warna.value,
                selisih_warna: selisih_warna.value,
                keterangan_warna: keterangan_warna.value,
                std_dropper: std_dropper.value,
                toleransi_dropper: toleransi_dropper.value,
                periksa_dropper: periksa_dropper.value,
                selisih_dropper: selisih_dropper.value,
                keterangan_dropper: keterangan_dropper.value,
                std_guadring: std_guadring.value,
                toleransi_guadring: toleransi_guadring.value,
                periksa_guadring: periksa_guadring.value,
                selisih_guadring: selisih_guadring.value,
                keterangan_guadring: keterangan_guadring.value,
                std_jmlWA: std_jmlWA.value,
                toleransi_jmlWA: toleransi_jmlWA.value,
                periksa_jmlWA: periksa_jmlWA.value,
                selisih_jmlWA: selisih_jmlWA.value,
                keterangan_jmlWA: keterangan_jmlWA.value,
                std_cg: std_cg.value,
                toleransi_cg: toleransi_cg.value,
                periksa_cg: periksa_cg.value,
                selisih_cg: selisih_cg.value,
                keterangan_cg: keterangan_cg.value,
                std_mr: std_mr.value,
                toleransi_mr: toleransi_mr.value,
                periksa_mr: periksa_mr.value,
                selisih_mr: selisih_mr.value,
                keterangan_mr: keterangan_mr.value,
                std_bk: std_bk.value,
                toleransi_bk: toleransi_bk.value,
                periksa_bk: periksa_bk.value,
                selisih_bk: selisih_bk.value,
                keterangan_bk: keterangan_bk.value,
                std_lk: std_lk.value,
                toleransi_lk: toleransi_lk.value,
                periksa_lk: periksa_lk.value,
                selisih_lk: selisih_lk.value,
                keterangan_lk: keterangan_lk.value,
                std_lk2: std_lk2.value,
                toleransi_lk2: toleransi_lk2.value,
                periksa_lk2: periksa_lk2.value,
                selisih_lk2: selisih_lk2.value,
                keterangan_lk2: keterangan_lk2.value,
                catatan: catatan.value,
                lokasi: $("#" + slcLokasi.id).val(),
                keputusan_wa: keputusan_wa.val(),
                keputusan_we: keputusan_we.val(),
                keputusan_warna: keputusan_warna.val(),
                keputusan_dropper: keputusan_dropper.val(),
                keputusan_guadring: keputusan_guadring.val(),
                keputusan_jmlWA: keputusan_jmlWA.val(),
                keputusan_cg: keputusan_cg.val(),
                keputusan_mr: keputusan_mr.val(),
                keputusan_bk: keputusan_bk.val(),
                keputusan_lk: keputusan_lk.val(),
                keputusan_lk2: keputusan_lk2.val(),
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
                        btn_batal.click();
                        btn_redisplay.click();
                        // $("#table_atas").DataTable().ajax.reload();
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
                url: "CekGantiUkuranCL/getDataTable",
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
                { data: "id_pemeriksaan" },
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
                { data: "Type_Mesin" },
                { data: "Nama_mesin" },
                { data: "ukuran_asal" },
                { data: "ukuran_baru" },
                { data: "berat_standart" },
                { data: "berat_realita" },
                { data: "benang_wa" },
                { data: "benang_we" },
                { data: "jumlah_warp" },
                { data: "user_input" },
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
            scrollY: "400px",
            scrollCollapse: true,
        });
    });

    let id_pemeriksaan = null;
    let selectedRow = null;
    $("#table_atas tbody").on("click", "tr", function () {
        if (!table_atas.row(this).data()) {
            return;
        }

        // Hapus highlight sebelumnya
        $("#table_atas tbody tr").removeClass("selected");
        // Tambah highlight ke row ini
        $(this).addClass("selected");
        // Simpan reference row DataTable
        selectedRow = this;
        // Ambil data (opsional)
        let data = table_atas.row(this).data();
        id_pemeriksaan = data.id_pemeriksaan;
        console.log(data);

        $.ajax({
            url: "CekGantiUkuranCL/getDataSelect",
            dataType: "json",
            type: "GET",
            data: {
                _token: csrfToken,
                id_pemeriksaan: data.id_pemeriksaan,
            },
            success: function (response) {
                console.log(response);
                slcMesin.prop("disabled", false);
                std_wa.value = response[0].benang_wa.trim(); ``
                std_we.value = response[0].benang_we.trim();
                std_warna.value = response[0].corak.trim();
                std_jmlWA.value = response[0].jumlah_warp ?? '';
                std_bk.value = response[0].berat_standart ?? '';
                tanggalGU.value = response[0].tanggal.split(' ')[0];
                std_dropper.value = response[0].kondisi_dropper ?? '';
                std_guadring.value = response[0].ukuranGr_benar ?? response[0].ukuranGr_salah ?? '';
                std_cg.value = response[0].settingWeft_benar ?? response[0].settingWeft_salah ?? '';
                std_mr.value = (response[0].ukuran_baru ?? '').match(/\((.*?)\)/)?.[1]?.trim() ?? '';
                std_lk.value = (response[0].ukuran_baru ?? '').split('(')[0].trim();
                $("#" + slcTypeMesin.id).val(response[0].IdType_mesin).trigger("change");
                fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), response[0].Id_mesin);
                setTimeout(() => {
                    $("#" + slcTypeMesin.id).prop("disabled", true);
                    // btn_batal.click();
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    id_pemeriksaan = null;
                    id_cek = null;
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    keputusan_wa.val("Masuk").trigger("change");
                    keputusan_we.val("Masuk").trigger("change");
                    keputusan_warna.val("Masuk").trigger("change");
                    keputusan_dropper.val("Masuk").trigger("change");
                    keputusan_guadring.val("Masuk").trigger("change");
                    keputusan_jmlWA.val("Masuk").trigger("change");
                    keputusan_cg.val("Masuk").trigger("change");
                    keputusan_mr.val("Masuk").trigger("change");
                    keputusan_bk.val("Masuk").trigger("change");
                    keputusan_lk.val("Masuk").trigger("change");
                    keputusan_lk2.val("Masuk").trigger("change");
                    toleransi_wa.value = '';
                    periksa_wa.value = '';
                    selisih_wa.value = '';
                    keterangan_wa.value = '';
                    toleransi_we.value = '';
                    periksa_we.value = '';
                    selisih_we.value = '';
                    keterangan_we.value = '';
                    toleransi_warna.value = '';
                    periksa_warna.value = '';
                    selisih_warna.value = '';
                    keterangan_warna.value = '';
                    toleransi_dropper.value = '';
                    periksa_dropper.value = '';
                    selisih_dropper.value = '';
                    keterangan_dropper.value = '';
                    toleransi_guadring.value = '± 1 cm';
                    periksa_guadring.value = '';
                    selisih_guadring.value = '';
                    keterangan_guadring.value = '';
                    toleransi_jmlWA.value = '± 3 %';
                    periksa_jmlWA.value = '';
                    selisih_jmlWA.value = '';
                    keterangan_jmlWA.value = '';
                    toleransi_cg.value = '';
                    periksa_cg.value = '';
                    selisih_cg.value = '';
                    keterangan_cg.value = '';
                    toleransi_mr.value = '± 0.5';
                    periksa_mr.value = '';
                    selisih_mr.value = '';
                    keterangan_mr.value = '';
                    toleransi_bk.value = '± 3 %';
                    periksa_bk.value = '';
                    selisih_bk.value = '';
                    keterangan_bk.value = '';
                    toleransi_lk.value = '-0 / + 1 cm';
                    periksa_lk.value = '';
                    selisih_lk.value = '';
                    keterangan_lk.value = '';
                    std_lk2.value = '';
                    toleransi_lk2.value = '-0 / + 1 cm';
                    periksa_lk2.value = '';
                    selisih_lk2.value = '';
                    keterangan_lk2.value = '';
                    catatan.value = '';
                }, 300);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_redisplayBawah.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "CekGantiUkuranCL/getDataTableBawah",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalBawah: tgl_awalBawah.value,
                        tgl_akhirBawah: tgl_akhirBawah.value,
                        lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "id_cek",
                    render: function (data, type, row) {
                        if (type === "display") {
                            return `
                    <a href="javascript:void(0)"
                       class="link-idheader text-primary"
                       data-id="${data}">
                        ${data}
                    </a>
                    `;
                        }
                        return data; // penting untuk sorting & searching
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
                        if (
                            row.user_acc !== null &&
                            row.user_acc !== ""
                        ) {
                            return `<span style="color: green; font-weight: 600;">
                                        Sudah di ACC ${row.user_acc}
                                    </span>`;
                        }
                        return `
                    <button class="btn btn-sm btn-warning btn-koreksi" style="width: 60px;"data-id="${row.id_cek}">
                        <i class="fa fa-edit"></i> Koreksi
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" style="width: 60px;" data-id="${row.id_cek}">
                        <i class="fa fa-trash"></i> Delete
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
            scrollY: "400px",
            scrollCollapse: true,
        });
    });

    $("#table_bawah").on("click", ".link-idheader", function () {
        const id_cekLink = $(this).data("id");
        console.log("ID Header:", id_cekLink);

        // simpan id_cekLink (jika diperlukan di modal)
        $("#modalLaporan").data("idheader", id_cekLink);
        $.ajax({
            url: "ACCCekGantiUkuranCL/getPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                id_cek: id_cekLink,
            },
            success: function (data) {
                console.log(data);
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

                if (data.data[0].ttd_acc !== "" && data.data[0].ttd_acc !== null) {
                    let ttd = data.data[0].ttd_acc;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_spqc").attr("src", ttd).show();
                    document.getElementById("nama_spqcP").innerHTML = data.data[0].nama_acc;
                } else {
                    $("#ttd_spqc").attr("src", "").show();

                    document.getElementById("nama_spqcP").innerHTML = 'Nama SP. QC';
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

    let id_cek = null;
    $('#table_bawah').on('click', '.btn-koreksi', function () {
        const id = $(this).data('id');
        console.log(id);
        id_cek = id;
        $.ajax({
            url: "CekGantiUkuranCL/getKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                id_cek: id,
            },
            success: function (data) {
                console.log(data);
                $("#table_atas tbody tr").removeClass("selected");
                selectedRow = null;
                $("#labelProses").text("Koreksi Data");
                $("#btn_proses").text("Proses Update");
                slcMesin.prop("disabled", false);
                $("#" + slcLokasi.id).val(data.data[0].lokasi).trigger("change");
                tanggal.value = data.data[0].tanggal_raw;
                tanggalGU.value = data.data[0].tanggal_ganti;
                $("#" + slcTypeMesin.id).val(data.data[0].type_mesin).trigger("change");
                fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), data.data[0].nama_mesin);
                $("#" + slcShift.id).val(data.data[0].shift).trigger("change");
                jam_kerja_awal.value = ambilJam(data.data[0].jam_kerja_awal);
                jam_kerja_akhir.value = ambilJam(data.data[0].jam_kerja_akhir);
                std_wa.value = data.data[0].std_wa;
                toleransi_wa.value = data.data[0].toleransi_wa;
                periksa_wa.value = data.data[0].periksa_wa;
                selisih_wa.value = data.data[0].selisih_wa;
                keterangan_wa.value = data.data[0].keterangan_wa;
                std_we.value = data.data[0].std_we;
                toleransi_we.value = data.data[0].toleransi_we;
                periksa_we.value = data.data[0].periksa_we;
                selisih_we.value = data.data[0].selisih_we;
                keterangan_we.value = data.data[0].keterangan_we;
                std_warna.value = data.data[0].std_warna;
                toleransi_warna.value = data.data[0].toleransi_warna;
                periksa_warna.value = data.data[0].periksa_warna;
                selisih_warna.value = data.data[0].selisih_warna;
                keterangan_warna.value = data.data[0].keterangan_warna;
                std_dropper.value = data.data[0].std_dropper;
                toleransi_dropper.value = data.data[0].toleransi_dropper;
                periksa_dropper.value = data.data[0].periksa_dropper;
                selisih_dropper.value = data.data[0].selisih_dropper;
                keterangan_dropper.value = data.data[0].keterangan_dropper;
                std_guadring.value = data.data[0].std_guadring;
                toleransi_guadring.value = data.data[0].toleransi_guadring;
                periksa_guadring.value = data.data[0].periksa_guadring;
                selisih_guadring.value = data.data[0].selisih_guadring;
                keterangan_guadring.value = data.data[0].keterangan_guadring;
                std_jmlWA.value = data.data[0].std_jmlWA;
                toleransi_jmlWA.value = data.data[0].toleransi_jmlWA;
                periksa_jmlWA.value = data.data[0].periksa_jmlWA;
                selisih_jmlWA.value = data.data[0].selisih_jmlWA;
                keterangan_jmlWA.value = data.data[0].keterangan_jmlWA;
                std_cg.value = data.data[0].std_cg;
                toleransi_cg.value = data.data[0].toleransi_cg;
                periksa_cg.value = data.data[0].periksa_cg;
                selisih_cg.value = data.data[0].selisih_cg;
                keterangan_cg.value = data.data[0].keterangan_cg;
                std_mr.value = data.data[0].std_mr;
                toleransi_mr.value = data.data[0].toleransi_mr;
                periksa_mr.value = data.data[0].periksa_mr;
                selisih_mr.value = data.data[0].selisih_mr;
                keterangan_mr.value = data.data[0].keterangan_mr;
                std_bk.value = data.data[0].std_bk;
                toleransi_bk.value = data.data[0].toleransi_bk;
                periksa_bk.value = data.data[0].periksa_bk;
                selisih_bk.value = data.data[0].selisih_bk;
                keterangan_bk.value = data.data[0].keterangan_bk;
                std_lk.value = data.data[0].std_lk;
                toleransi_lk.value = data.data[0].toleransi_lk;
                periksa_lk.value = data.data[0].periksa_lk;
                selisih_lk.value = data.data[0].selisih_lk;
                keterangan_lk.value = data.data[0].keterangan_lk;
                std_lk2.value = data.data[0].std_lk2;
                toleransi_lk2.value = data.data[0].toleransi_lk2;
                periksa_lk2.value = data.data[0].periksa_lk2;
                selisih_lk2.value = data.data[0].selisih_lk2;
                keterangan_lk2.value = data.data[0].keterangan_lk2;
                catatan.value = data.data[0].catatan;
                keputusan_wa.val(data.data[0].keputusan_wa).trigger("change");
                keputusan_we.val(data.data[0].keputusan_we).trigger("change");
                keputusan_warna.val(data.data[0].keputusan_warna).trigger("change");
                keputusan_dropper.val(data.data[0].keputusan_dropper).trigger("change");
                keputusan_guadring.val(data.data[0].keputusan_guadring).trigger("change");
                keputusan_jmlWA.val(data.data[0].keputusan_jmlWA).trigger("change");
                keputusan_cg.val(data.data[0].keputusan_cg).trigger("change");
                keputusan_mr.val(data.data[0].keputusan_mr).trigger("change");
                keputusan_bk.val(data.data[0].keputusan_bk).trigger("change");
                keputusan_lk.val(data.data[0].keputusan_lk).trigger("change");
                keputusan_lk2.val(data.data[0].keputusan_lk2).trigger("change");
                setTimeout(() => {
                    periksa_wa.focus();
                }, 300);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    $('#table_bawah').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        console.log(id);
        idDetail = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "CekGantiUkuranCL",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        id_cek: id_cek,
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
                                $("#table_bawah").DataTable().ajax.reload();
                                console.log(result);
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        $("#table_atas tbody tr").removeClass("selected");
        selectedRow = null;
        $("#labelProses").text("Input Data");
        $("#btn_proses").text("PROSES");
        id_pemeriksaan = null;
        id_cek = null;
        tanggal.valueAsDate = new Date();
        tanggalGU.value = null;
        $("#" + slcShift.id).val(null).trigger("change");
        jam_kerja_awal.value = ambilJam(null);
        jam_kerja_akhir.value = ambilJam(null);
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        keputusan_wa.val("Masuk").trigger("change");
        keputusan_we.val("Masuk").trigger("change");
        keputusan_warna.val("Masuk").trigger("change");
        keputusan_dropper.val("Masuk").trigger("change");
        keputusan_guadring.val("Masuk").trigger("change");
        keputusan_jmlWA.val("Masuk").trigger("change");
        keputusan_cg.val("Masuk").trigger("change");
        keputusan_mr.val("Masuk").trigger("change");
        keputusan_bk.val("Masuk").trigger("change");
        keputusan_lk.val("Masuk").trigger("change");
        keputusan_lk2.val("Masuk").trigger("change");
        std_wa.value = '';
        toleransi_wa.value = '';
        periksa_wa.value = '';
        selisih_wa.value = '';
        keterangan_wa.value = '';
        std_we.value = '';
        toleransi_we.value = '';
        periksa_we.value = '';
        selisih_we.value = '';
        keterangan_we.value = '';
        std_warna.value = '';
        toleransi_warna.value = '';
        periksa_warna.value = '';
        selisih_warna.value = '';
        keterangan_warna.value = '';
        std_dropper.value = '';
        toleransi_dropper.value = '';
        periksa_dropper.value = '';
        selisih_dropper.value = '';
        keterangan_dropper.value = '';
        std_guadring.value = '';
        toleransi_guadring.value = '± 1 cm';
        periksa_guadring.value = '';
        selisih_guadring.value = '';
        keterangan_guadring.value = '';
        std_jmlWA.value = '';
        toleransi_jmlWA.value = '± 3 %';
        periksa_jmlWA.value = '';
        selisih_jmlWA.value = '';
        keterangan_jmlWA.value = '';
        std_cg.value = '';
        toleransi_cg.value = '';
        periksa_cg.value = '';
        selisih_cg.value = '';
        keterangan_cg.value = '';
        std_mr.value = '';
        toleransi_mr.value = '± 0.5';
        periksa_mr.value = '';
        selisih_mr.value = '';
        keterangan_mr.value = '';
        std_bk.value = '';
        toleransi_bk.value = '± 3 %';
        periksa_bk.value = '';
        selisih_bk.value = '';
        keterangan_bk.value = '';
        std_lk.value = '';
        toleransi_lk.value = '-0 / + 1 cm';
        periksa_lk.value = '';
        selisih_lk.value = '';
        keterangan_lk.value = '';
        std_lk2.value = '';
        toleransi_lk2.value = '-0 / + 1 cm';
        periksa_lk2.value = '';
        selisih_lk2.value = '';
        keterangan_lk2.value = '';
        catatan.value = '';
    });
});