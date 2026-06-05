jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let ukuran_asal = document.getElementById("ukuran_asal");
    let ukuran_baru = document.getElementById("ukuran_baru");
    let corak = document.getElementById("corak");
    let berat_standart = document.getElementById("berat_standart");
    let berat_realita = document.getElementById("berat_realita");
    let rpm = document.getElementById("rpm");
    let jumlah_warp = document.getElementById("jumlah_warp");
    let awal_ganti = document.getElementById("awal_ganti");
    let akhir_ganti = document.getElementById("akhir_ganti");
    let perawatan_gu = document.getElementById("perawatan_gu");
    let keterangan = document.getElementById("keterangan");
    let ukuranGr_benar = document.getElementById("ukuranGr_benar");
    let ukuranGr_salah = document.getElementById("ukuranGr_salah");
    let posisi_gr = document.getElementById("posisi_gr");
    let posisi_sa = document.getElementById("posisi_sa");
    let tension_bs = document.getElementById("tension_bs");
    let kondisi_pr = document.getElementById("kondisi_pr");
    let kondisi_em = document.getElementById("kondisi_em");
    let kondisi_ulr = document.getElementById("kondisi_ulr");
    let kondisi_dl = document.getElementById("kondisi_dl");
    let kondisi_sb = document.getElementById("kondisi_sb");
    let kondisi_ot = document.getElementById("kondisi_ot");
    let sensor_warp = document.getElementById("sensor_warp");
    let sensor_weft = document.getElementById("sensor_weft");
    let sensor_weft_end = document.getElementById("sensor_weft_end");
    let posisi_expander = document.getElementById("posisi_expander");
    let roda_expander = document.getElementById("roda_expander");
    let settingWeft_benar = document.getElementById("settingWeft_benar");
    let settingWeft_salah = document.getElementById("settingWeft_salah");
    let hasil_belahan = document.getElementById("hasil_belahan");
    let kondisi_jog = document.getElementById("kondisi_jog");
    let tension_winder = document.getElementById("tension_winder");
    let jalurBenang_rak = document.getElementById("jalurBenang_rak");
    let jalurBenang_dl = document.getElementById("jalurBenang_dl");
    let jalurBenang_wh = document.getElementById("jalurBenang_wh");
    let kondisi_dropper = document.getElementById("kondisi_dropper");
    let corak_js = document.getElementById("corak_js");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let labelRedisplay = document.getElementById("labelRedisplay");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");

    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        headerCallback: function (thead, data, start, end, display) {
            $(thead).find("th")
                .css("font-family", "Arial")
                .css("font-size", "14px")
                .css("text-align", "center");
        },
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

    const slcTypeMesin = document.getElementById("type_mesin");
    const slcBenangWa = document.getElementById("benang_wa");
    const slcBenangWe = document.getElementById("benang_we");

    tanggal.valueAsDate = new Date();
    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();

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

    //#region Enter

    let rawValue = "";

    // ENTER → pindah ke TEK berikutnya
    ukuran_baru.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            rawValue += "|";
            render();

            // hitung hanya jika sudah 4 bagian (3 separator)
            let jumlahSeparator = (rawValue.match(/\|/g) || []).length;

            if (jumlahSeparator === 4) {
                hitungBerat();
            }
        }
    });

    // INPUT ANGKA
    ukuran_baru.addEventListener("input", function (e) {

        // ambil hanya input baru (tanpa format lama)
        let val = e.data;

        // jika hapus (backspace dll)
        if (val === null) {
            rawValue = rawValue.slice(0, -1);
        } else {
            // hanya angka & titik
            val = val.replace(/[^0-9.]/g, "");
            rawValue += val;
        }

        render();
    });

    function hitungBerat() {
        const parts = rawValue.split("|");

        const ukuran = parseFloat(parts[0]) || 0;
        const wa = parseFloat(parts[1]) || 0;
        const we = parseFloat(parts[2]) || 0;
        const denier = parseFloat(parts[3]) || 0;

        const kain = dtek7 ?? ""; // keterangan (BELAH / FLAT dll)
        const lReinf = ukuranRein || 0;
        const jReinf = jumlahRein || 0;

        let dwa = 0;
        let dwe = 0;

        // mapping denier
        switch (denier) {
            case 1800:
                dwa = 2000;
                dwe = 1600;
                break;
            case 1750:
                dwa = 2000;
                dwe = 1500;
                break;
            case 1500:
                dwa = 1500;
                dwe = 1500;
                break;
            case 950:
                dwa = 1000;
                dwe = 900;
                break;
            case 850:
                dwa = 900;
                dwe = 800;
                break;
            default:
                dwa = denier;
                dwe = denier;
        }

        // hitung berat utama
        let berat = (ukuran * 100 * ((wa * dwa) + (we * dwe))) / 1143000;

        // hitung reinforcement
        let reinforc = (lReinf * 100 * (wa * dwa) / 1143000 / jReinf) || 0;

        let berat_std = 0;

        // kondisi kain
        if (
            kain.toUpperCase().includes("BELAH") ||
            kain.toUpperCase().includes("FLAT")
        ) {
            berat_std = (berat / 2) + reinforc;
        } else {
            berat_std = berat + reinforc;
        }

        berat_standart.value = numeral(berat_std).format('0.00') || 0;
    }

    // fungsi render format (tanpa function terpisah sebelumnya, sekarang wajib biar stabil)
    function render() {

        let parts = rawValue.split("|");

        let tek1 = parts[0] ? parts[0].replace(/\./g, "") : "";

        let tek2 = "";
        if (parts[1]) {
            let m = parts[1].match(/^\d+(\.\d{0,2})?/);
            tek2 = m ? m[0] : "";
        }

        let tek3 = "";
        if (parts[2]) {
            let m = parts[2].match(/^\d+(\.\d{0,2})?/);
            tek3 = m ? m[0] : "";
        }

        let tek4 = parts[3] ? parts[3].replace(/\./g, "") : "";

        ukuran_baru.value =
            (tek1 ? tek1 : "") +
            (tek2 ? " ( " + tek2 : "") +
            (tek3 ? " x " + tek3 + " )" : "") +
            (tek4 ? " " + tek4 : "");
    }

    //#region Checkbox

    posisi_gr.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    posisi_sa.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    tension_bs.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_pr.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_em.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_ulr.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_dl.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_sb.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_ot.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    sensor_warp.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    sensor_weft.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    sensor_weft_end.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    posisi_expander.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    roda_expander.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    hasil_belahan.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_jog.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    tension_winder.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    jalurBenang_rak.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    jalurBenang_dl.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    jalurBenang_wh.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    kondisi_dropper.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    corak_js.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });
    setting_roll_wtc.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    //#region Select2

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
            fetchDataMesin("/getMesinSelectCir/" + $("#" + slcTypeMesin.id).val());
        }, 300);

    });

    // $("#" + slcBenangWa.id).prop("disabled", true);
    // $("#" + slcBenangWe.id).prop("disabled", true);

    const $benangWa = $("#" + slcBenangWa.id);

    $benangWa.select2({
        placeholder: "-- Pilih Benang WA --"
    });

    $benangWa.on("change", function () {
        const val = $benangWa.val(); // ambil value

        console.log(val);

        $("#" + slcMesin.id)
            .empty()
            .append(new Option())
            .trigger("change");

        // $benangWa.prop("disabled", true).trigger("change.select2");
    });

    const $benangWe = $("#" + slcBenangWe.id);

    $benangWe.select2({
        placeholder: "-- Pilih Benang WE --"
    });

    $benangWe.on("change", function () {
        const val = $benangWe.val(); // ambil value

        console.log(val);

        $("#" + slcMesin.id)
            .empty()
            .append(new Option())
            .trigger("change");

        // $benangWe.prop("disabled", true).trigger("change.select2");
    });

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
                    if (labelProses.textContent == "Input Data") {
                        slcMesin.select2("open");
                    } else {
                        slcMesin.val(idNama_mesin).trigger("change");
                        slcMesin.prop("disabled", true);
                        $("#" + slcTypeMesin.id).prop("disabled", true);
                    }
                });
            });
    }

    let idOrder = null;
    let dtek7 = null;
    let ukuranRein = null;
    let jumlahRein = null;
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
                    $("#" + slcBenangWa.id).prop("disabled", false);
                    $("#" + slcBenangWe.id).prop("disabled", false);
                    // slcBenangWa.prop("disabled", true);
                    // slcBenangWe.prop("disabled", true);
                    $.ajax({
                        url: "MaintenancePGU/getDataTypeBarang",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idNama_mesin: slcMesin.val(),
                        },
                        success: function (response) {
                            console.log(response);
                            ukuran_asal.value = response[0].D_TEK1.trim() + " ( " + response[0].D_TEK2.trim() + " x " + response[0].D_TEK3.trim() + " ) " + response[0].D_TEK4.trim() ?? "";
                            corak.value = response[0].D_TEK5.trim() ?? '';

                            $("#" + slcBenangWa.id).val(response[1][0].A_kodebarang_warp).trigger("change");
                            $("#" + slcBenangWe.id).val(response[1][0].A_kodebarang_weft).trigger("change");
                            idOrder = response[2];
                            rpm.value = response[3];
                            dtek7 = response[0].D_TEK7.trim() ?? '';
                            ukuranRein = response[0].D_TEK8.trim() ?? 0;
                            jumlahRein = response[0].D_TEK9.trim() ?? 0;

                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
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

    function handleInputUkuranGR() {
        if (ukuranGr_benar.value) {
            ukuranGr_salah.value = "";
            ukuranGr_salah.disabled = true;
        } else if (ukuranGr_salah.value) {
            ukuranGr_benar.value = "";
            ukuranGr_benar.disabled = true;
        } else {
            ukuranGr_benar.disabled = false;
            ukuranGr_salah.disabled = false;
        }
    }

    function handleInputSettingWE() {
        if (settingWeft_benar.value) {
            settingWeft_salah.value = "";
            settingWeft_salah.disabled = true;
        } else if (settingWeft_salah.value) {
            settingWeft_benar.value = "";
            settingWeft_benar.disabled = true;
        } else {
            settingWeft_benar.disabled = false;
            settingWeft_salah.disabled = false;
        }
    }

    // trigger saat input berubah
    ukuranGr_benar.addEventListener("input", handleInputUkuranGR);
    ukuranGr_salah.addEventListener("input", handleInputUkuranGR);
    settingWeft_benar.addEventListener("input", handleInputSettingWE);
    settingWeft_salah.addEventListener("input", handleInputSettingWE);

    //#region Event Listener

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        // let awal_gantiConvert = null;
        // if (awal_ganti.value.trim() !== "") {
        //     awal_gantiConvert = convertToSQLDatetime(tanggal, awal_ganti.value);
        //     if (awal_gantiConvert === null) return;
        // }
        // let akhir_gantiConvert = null;
        // if (akhir_ganti.value.trim() !== "") {
        //     akhir_gantiConvert = convertToSQLDatetime(tanggal, akhir_ganti.value);
        //     if (akhir_gantiConvert === null) return;
        // }

        // if (shift.value === "" || $("#" + slcTypeMesin.id).val() === "" || slcMesin.val() === "" || slcMesin.val() === null) {
        //     Swal.fire({
        //         icon: "info",
        //         title: "Info!",
        //         text: "Shift dan mesin tidak boleh kosong!",
        //         showConfirmButton: true,
        //         // timer: 2000 
        //     });
        //     btn_proses.disabled = false;
        //     return;
        // }
        $.ajax({
            url: "MaintenancePGU",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (labelProses.textContent == "Koreksi Data") ? 2 : 1,
                id_pemeriksaan: id_pemeriksaan,
                tanggal: tanggal.value,
                type_mesin: $("#" + slcTypeMesin.id).val(),
                mesin: slcMesin.val(),
                benang_wa: $("#" + slcBenangWa.id).val(),
                benang_we: $("#" + slcBenangWe.id).val(),
                order: idOrder,
                ukuran_asal: ukuran_asal.value,
                ukuran_baru: ukuran_baru.value,
                corak: corak.value,
                berat_standart: berat_standart.value,
                berat_realita: berat_realita.value,
                rpm: rpm.value,
                jumlah_warp: jumlah_warp.value,
                awal_ganti: awal_ganti.value?.trim()
                    ? awal_ganti.value.replace('T', ' ') + ':00'
                    : null,

                akhir_ganti: akhir_ganti.value?.trim()
                    ? akhir_ganti.value.replace('T', ' ') + ':00'
                    : null,
                perawatan_gu: perawatan_gu.value,
                keterangan: keterangan.value,
                ukuranGr_benar:
                    (ukuranGr_benar.value === "Benar" || ukuranGr_benar.value === "Salah" || ukuranGr_benar.value === "")
                        ? ''
                        : ukuranGr_benar.value,

                ukuranGr_salah:
                    (ukuranGr_salah.value === "Benar" || ukuranGr_salah.value === "Salah" || ukuranGr_salah.value === "")
                        ? ''
                        : ukuranGr_salah.value,

                settingWeft_benar:
                    (settingWeft_benar.value === "Benar" || settingWeft_benar.value === "Salah" || settingWeft_benar.value === "")
                        ? ''
                        : settingWeft_benar.value,

                settingWeft_salah:
                    (settingWeft_salah.value === "Benar" || settingWeft_salah.value === "Salah" || settingWeft_salah.value === "")
                        ? ''
                        : settingWeft_salah.value,
                posisi_gr: posisi_gr.checked ? 'Benar' : 'Salah',
                posisi_sa: posisi_sa.checked ? 'Benar' : 'Salah',
                tension_bs: tension_bs.checked ? 'Benar' : 'Salah',
                kondisi_pr: kondisi_pr.checked ? 'Benar' : 'Salah',
                kondisi_em: kondisi_em.checked ? 'Benar' : 'Salah',
                kondisi_ulr: kondisi_ulr.checked ? 'Benar' : 'Salah',
                kondisi_dl: kondisi_dl.checked ? 'Benar' : 'Salah',
                kondisi_sb: kondisi_sb.checked ? 'Benar' : 'Salah',
                kondisi_ot: kondisi_ot.checked ? 'Benar' : 'Salah',
                sensor_warp: sensor_warp.checked ? 'Benar' : 'Salah',
                sensor_weft: sensor_weft.checked ? 'Benar' : 'Salah',
                sensor_weft_end: sensor_weft_end.checked ? 'Benar' : 'Salah',
                posisi_expander: posisi_expander.checked ? 'Benar' : 'Salah',
                roda_expander: roda_expander.checked ? 'Benar' : 'Salah',
                hasil_belahan: hasil_belahan.checked ? 'Benar' : 'Salah',
                kondisi_jog: kondisi_jog.checked ? 'Benar' : 'Salah',
                tension_winder: tension_winder.checked ? 'Benar' : 'Salah',
                jalurBenang_rak: jalurBenang_rak.checked ? 'Benar' : 'Salah',
                jalurBenang_dl: jalurBenang_dl.checked ? 'Benar' : 'Salah',
                jalurBenang_wh: jalurBenang_wh.checked ? 'Benar' : 'Salah',
                kondisi_dropper: kondisi_dropper.checked ? 'Benar' : 'Salah',
                corak_js: corak_js.checked ? 'Benar' : 'Salah',
                setting_roll_wtc: setting_roll_wtc.checked ? 'Sudah' : 'Belum',
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
                        // $("#table_atas").DataTable().ajax.reload();
                        btn_redisplay.click();
                        btn_batal.click();
                        btn_proses.disabled = false;
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
                url: "MaintenancePGU/getDataTable",
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
                    <button class="btn btn-sm btn-warning btn-koreksi" style="width: 60px;"data-id="${row.id_pemeriksaan}">
                        <i class="fa fa-edit"></i> Koreksi
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" style="width: 60px;" data-id="${row.id_pemeriksaan}">
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
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    let id_pemeriksaan = null;
    $('#table_atas').on('click', '.btn-koreksi', function () {
        const id = $(this).data('id');
        console.log(id);
        id_pemeriksaan = id;
        $.ajax({
            url: "MaintenancePGU/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                id_pemeriksaan: id,
            },
            success: function (data) {
                console.log(data);
                $("#labelProses").text("Koreksi Data");
                $("#btn_proses").text("Proses Update");
                slcMesin.prop("disabled", false);
                $("#" + slcBenangWa.id).prop("disabled", false);
                $("#" + slcBenangWe.id).prop("disabled", false);
                tanggal.value = data.data[0].tanggal;
                $("#" + slcTypeMesin.id).val(data.data[0].type_mesin).trigger("change");
                fetchDataMesin("/getMesinSelectCir/" + $("#" + slcTypeMesin.id).val(), data.data[0].mesin);
                ukuran_asal.value = data.data[0].ukuran_asal;
                ukuran_baru.value = data.data[0].ukuran_baru;
                corak.value = data.data[0].corak;
                berat_standart.value = data.data[0].berat_standart;
                berat_realita.value = data.data[0].berat_realita;
                rpm.value = data.data[0].rpm;
                $("#" + slcBenangWa.id).val(data.data[0].benang_wa).trigger("change");
                $("#" + slcBenangWe.id).val(data.data[0].benang_we).trigger("change");
                jumlah_warp.value = data.data[0].jumlah_warp;
                awal_ganti.value = data.data[0].awal_ganti;
                akhir_ganti.value = data.data[0].akhir_ganti;
                perawatan_gu.value = data.data[0].perawatan_gu;
                keterangan.value = data.data[0].keterangan;

                const ukuranGrBenar = data.data[0].ukuranGr_benar ?? '';
                const ukuranGrSalah = data.data[0].ukuranGr_salah ?? '';
                if (
                    ukuranGrBenar.trim() === '' &&
                    ukuranGrSalah.trim() === ''
                ) {
                    ukuranGr_benar.disabled = false;
                    ukuranGr_salah.disabled = false;
                } else if (ukuranGrBenar.trim() === '') {
                    ukuranGr_benar.value = '';
                    ukuranGr_benar.disabled = true;

                    ukuranGr_salah.disabled = false;
                } else {
                    ukuranGr_salah.value = '';
                    ukuranGr_salah.disabled = true;

                    ukuranGr_benar.disabled = false;
                }
                const settingWeftBenar = data.data[0].settingWeft_benar ?? '';
                const settingWeftSalah = data.data[0].settingWeft_salah ?? '';
                if (
                    settingWeftBenar.trim() === '' &&
                    settingWeftSalah.trim() === ''
                ) {
                    settingWeft_benar.disabled = false;
                    settingWeft_salah.disabled = false;
                } else if (settingWeftBenar.trim() === '') {
                    settingWeft_benar.value = '';
                    settingWeft_benar.disabled = true;

                    settingWeft_salah.disabled = false;
                } else {
                    settingWeft_salah.value = '';
                    settingWeft_salah.disabled = true;

                    settingWeft_benar.disabled = false;
                }

                ukuranGr_benar.value = data.data[0].ukuranGr_benar;
                ukuranGr_salah.value = data.data[0].ukuranGr_salah;
                settingWeft_benar.value = data.data[0].settingWeft_benar;
                settingWeft_salah.value = data.data[0].settingWeft_salah;
                posisi_gr.checked = (data.data[0].posisi_gr === 'Benar' || data.data[0].posisi_gr === 'Benar');
                posisi_gr.dispatchEvent(new Event('change', { bubbles: true }));
                posisi_sa.checked = (data.data[0].posisi_sa === 'Benar' || data.data[0].posisi_sa === 'Benar');
                posisi_sa.dispatchEvent(new Event('change', { bubbles: true }));
                tension_bs.checked = (data.data[0].tension_bs === 'Benar' || data.data[0].tension_bs === 'Benar');
                tension_bs.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_pr.checked = (data.data[0].kondisi_pr === 'Benar' || data.data[0].kondisi_pr === 'Benar');
                kondisi_pr.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_em.checked = (data.data[0].kondisi_em === 'Benar' || data.data[0].kondisi_em === 'Benar');
                kondisi_em.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_ulr.checked = (data.data[0].kondisi_ulr === 'Benar' || data.data[0].kondisi_ulr === 'Benar');
                kondisi_ulr.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_dl.checked = (data.data[0].kondisi_dl === 'Benar' || data.data[0].kondisi_dl === 'Benar');
                kondisi_dl.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_sb.checked = (data.data[0].kondisi_sb === 'Benar' || data.data[0].kondisi_sb === 'Benar');
                kondisi_sb.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_ot.checked = (data.data[0].kondisi_ot === 'Benar' || data.data[0].kondisi_ot === 'Benar');
                kondisi_ot.dispatchEvent(new Event('change', { bubbles: true }));
                sensor_warp.checked = (data.data[0].sensor_warp === 'Benar' || data.data[0].sensor_warp === 'Benar');
                sensor_warp.dispatchEvent(new Event('change', { bubbles: true }));
                sensor_weft.checked = (data.data[0].sensor_weft === 'Benar' || data.data[0].sensor_weft === 'Benar');
                sensor_weft.dispatchEvent(new Event('change', { bubbles: true }));
                sensor_weft_end.checked = (data.data[0].sensor_weft_end === 'Benar' || data.data[0].sensor_weft_end === 'Benar');
                sensor_weft_end.dispatchEvent(new Event('change', { bubbles: true }));
                posisi_expander.checked = (data.data[0].posisi_expander === 'Benar' || data.data[0].posisi_expander === 'Benar');
                posisi_expander.dispatchEvent(new Event('change', { bubbles: true }));
                roda_expander.checked = (data.data[0].roda_expander === 'Benar' || data.data[0].roda_expander === 'Benar');
                roda_expander.dispatchEvent(new Event('change', { bubbles: true }));
                hasil_belahan.checked = (data.data[0].hasil_belahan === 'Benar' || data.data[0].hasil_belahan === 'Benar');
                hasil_belahan.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_jog.checked = (data.data[0].kondisi_jog === 'Benar' || data.data[0].kondisi_jog === 'Benar');
                kondisi_jog.dispatchEvent(new Event('change', { bubbles: true }));
                tension_winder.checked = (data.data[0].tension_winder === 'Benar' || data.data[0].tension_winder === 'Benar');
                tension_winder.dispatchEvent(new Event('change', { bubbles: true }));
                jalurBenang_rak.checked = (data.data[0].jalurBenang_rak === 'Benar' || data.data[0].jalurBenang_rak === 'Benar');
                jalurBenang_rak.dispatchEvent(new Event('change', { bubbles: true }));
                jalurBenang_dl.checked = (data.data[0].jalurBenang_dl === 'Benar' || data.data[0].jalurBenang_dl === 'Benar');
                jalurBenang_dl.dispatchEvent(new Event('change', { bubbles: true }));
                jalurBenang_wh.checked = (data.data[0].jalurBenang_wh === 'Benar' || data.data[0].jalurBenang_wh === 'Benar');
                jalurBenang_wh.dispatchEvent(new Event('change', { bubbles: true }));
                kondisi_dropper.checked = (data.data[0].kondisi_dropper === 'Benar' || data.data[0].kondisi_dropper === 'Benar');
                kondisi_dropper.dispatchEvent(new Event('change', { bubbles: true }));
                corak_js.checked = (data.data[0].corak_js === 'Benar' || data.data[0].corak_js === 'Benar');
                corak_js.dispatchEvent(new Event('change', { bubbles: true }));
                setting_roll_wtc.checked = (data.data[0].setting_roll_wtc === 'Sudah' || data.data[0].setting_roll_wtc === 'Sudah');
                setting_roll_wtc.dispatchEvent(new Event('change', { bubbles: true }));
                setTimeout(() => {
                    ukuran_baru.focus();
                }, 300);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    $('#table_atas').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        console.log(id);
        id_pemeriksaan = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                btn_batal.click();
                $.ajax({
                    url: "MaintenancePGU",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        id_pemeriksaan: id_pemeriksaan,
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
                                $("#table_atas").DataTable().ajax.reload();
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
        $("#labelProses").text("Input Data");
        $("#btn_proses").text("PROSES");
        $("#" + slcTypeMesin.id).prop("disabled", false);
        slcMesin.prop("disabled", true);
        $("#" + slcBenangWa.id).prop("disabled", false);
        $("#" + slcBenangWe.id).prop("disabled", false);
        idDetail = null;
        tanggal.valueAsDate = new Date();
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        ukuran_asal.value = '';
        ukuran_baru.value = '';
        corak.value = '';
        berat_standart.value = '';
        berat_realita.value = '';
        rpm.value = '';
        $("#" + slcBenangWa.id).val(null).trigger("change");
        $("#" + slcBenangWe.id).val(null).trigger("change");
        jumlah_warp.value = '';
        awal_ganti.value = null;
        akhir_ganti.value = null;
        perawatan_gu.value = '';
        keterangan.value = '';
        ukuranGr_benar.value = '';
        ukuranGr_salah.value = '';
        settingWeft_benar.value = '';
        settingWeft_salah.value = '';
        ukuranGr_benar.disabled = false;
        ukuranGr_salah.disabled = false;
        settingWeft_benar.disabled = false;
        settingWeft_salah.disabled = false;
        posisi_gr.checked = false;
        posisi_gr.dispatchEvent(new Event('change', { bubbles: true }));
        posisi_sa.checked = false;
        posisi_sa.dispatchEvent(new Event('change', { bubbles: true }));
        tension_bs.checked = false;
        tension_bs.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_pr.checked = false;
        kondisi_pr.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_em.checked = false;
        kondisi_em.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_ulr.checked = false;
        kondisi_ulr.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_dl.checked = false;
        kondisi_dl.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_sb.checked = false;
        kondisi_sb.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_ot.checked = false;
        kondisi_ot.dispatchEvent(new Event('change', { bubbles: true }));
        sensor_warp.checked = false;
        sensor_warp.dispatchEvent(new Event('change', { bubbles: true }));
        sensor_weft.checked = false;
        sensor_weft.dispatchEvent(new Event('change', { bubbles: true }));
        sensor_weft_end.checked = false;
        sensor_weft_end.dispatchEvent(new Event('change', { bubbles: true }));
        posisi_expander.checked = false;
        posisi_expander.dispatchEvent(new Event('change', { bubbles: true }));
        roda_expander.checked = false;
        roda_expander.dispatchEvent(new Event('change', { bubbles: true }));
        hasil_belahan.checked = false;
        hasil_belahan.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_jog.checked = false;
        kondisi_jog.dispatchEvent(new Event('change', { bubbles: true }));
        tension_winder.checked = false;
        tension_winder.dispatchEvent(new Event('change', { bubbles: true }));
        jalurBenang_rak.checked = false;
        jalurBenang_rak.dispatchEvent(new Event('change', { bubbles: true }));
        jalurBenang_dl.checked = false;
        jalurBenang_dl.dispatchEvent(new Event('change', { bubbles: true }));
        jalurBenang_wh.checked = false;
        jalurBenang_wh.dispatchEvent(new Event('change', { bubbles: true }));
        kondisi_dropper.checked = false;
        kondisi_dropper.dispatchEvent(new Event('change', { bubbles: true }));
        corak_js.checked = false;
        corak_js.dispatchEvent(new Event('change', { bubbles: true }));
        setting_roll_wtc.checked = false;
        setting_roll_wtc.dispatchEvent(new Event('change', { bubbles: true }));
    });
});

