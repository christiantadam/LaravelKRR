jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let jam_kerja_awal = document.getElementById("jam_kerja_awal");
    let jam_kerja_akhir = document.getElementById("jam_kerja_akhir");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let lpt = document.getElementById("lpt");
    let gbs = document.getElementById("gbs");
    let wndr_gld = document.getElementById("wndr_gld");
    let bulu = document.getElementById("bulu");
    let jam_bulu = document.getElementById("jam_bulu");
    let tanda = document.getElementById("tanda");
    let ping_bergerigi = document.getElementById("ping_bergerigi");
    let sensor_wa = document.getElementById("sensor_wa");
    let sensor_we = document.getElementById("sensor_we");
    let stang_arm = document.getElementById("stang_arm");
    let lbr_st = document.getElementById("lbr_st");
    let rajutan_wa = document.getElementById("rajutan_wa");
    let rajutan_we = document.getElementById("rajutan_we");
    let denier = document.getElementById("denier");
    let jml_bng_wa_st = document.getElementById("jml_bng_wa_st");
    let jml_bng_wa_pm = document.getElementById("jml_bng_wa_pm");
    let wrn = document.getElementById("wrn");
    let lbr = document.getElementById("lbr");
    let keterangan = document.getElementById("keterangan");
    let btn_laporan = document.getElementById("btn_laporan");
    let tgl_awalModal = document.getElementById("tgl_awalModal");
    let tgl_akhirModal = document.getElementById("tgl_akhirModal");
    let btn_okModal = document.getElementById("btn_okModal");
    let btn_prosesPanen = document.getElementById("btn_prosesPanen");
    let counter_mesin = document.getElementById("counter_mesin");
    let status_mesin = document.getElementById("status_mesin");
    let jam_mati = document.getElementById("jam_mati");
    let jarak_stripLabel = document.getElementById("jarak_stripLabel");
    let lbr_reinf = document.getElementById("lbr_reinf");
    let lbr_reinfLabel = document.getElementById("lbr_reinfLabel");
    let jarak_strip1 = document.getElementById("jarak_strip1");
    let jarak_strip2 = document.getElementById("jarak_strip2");
    let jarak_strip3 = document.getElementById("jarak_strip3");
    let jarak_strip4 = document.getElementById("jarak_strip4");
    let jarak_strip5 = document.getElementById("jarak_strip5");
    let jarak_strip6 = document.getElementById("jarak_strip6");
    let jarak_strip7 = document.getElementById("jarak_strip7");
    let jarak_strip8 = document.getElementById("jarak_strip8");
    let jarak_strip9 = document.getElementById("jarak_strip9");
    let jarak_strip10 = document.getElementById("jarak_strip10");
    let jarak_strip11 = document.getElementById("jarak_strip11");
    let jarak_strip12 = document.getElementById("jarak_strip12");
    let jarak_strip13 = document.getElementById("jarak_strip13");
    let jarak_strip14 = document.getElementById("jarak_strip14");
    let jarak_strip15 = document.getElementById("jarak_strip15");
    let jarak_strip16 = document.getElementById("jarak_strip16");
    let jarak_strip17 = document.getElementById("jarak_strip17");
    let jarak_strip18 = document.getElementById("jarak_strip18");
    let jarak_strip19 = document.getElementById("jarak_strip19");
    let jarak_strip20 = document.getElementById("jarak_strip20");
    let jarak_strip21 = document.getElementById("jarak_strip21");
    let jarak_strip22 = document.getElementById("jarak_strip22");
    let jarak_strip23 = document.getElementById("jarak_strip23");
    let jarak_strip24 = document.getElementById("jarak_strip24");

    let jarak_strip1Label = document.getElementById("jarak_strip1Label");
    let jarak_strip2Label = document.getElementById("jarak_strip2Label");
    let jarak_strip3Label = document.getElementById("jarak_strip3Label");
    let jarak_strip4Label = document.getElementById("jarak_strip4Label");
    let jarak_strip5Label = document.getElementById("jarak_strip5Label");
    let jarak_strip6Label = document.getElementById("jarak_strip6Label");
    let jarak_strip7Label = document.getElementById("jarak_strip7Label");
    let jarak_strip8Label = document.getElementById("jarak_strip8Label");
    let jarak_strip9Label = document.getElementById("jarak_strip9Label");
    let jarak_strip10Label = document.getElementById("jarak_strip10Label");
    let jarak_strip11Label = document.getElementById("jarak_strip11Label");
    let jarak_strip12Label = document.getElementById("jarak_strip12Label");
    let jarak_strip13Label = document.getElementById("jarak_strip13Label");
    let jarak_strip14Label = document.getElementById("jarak_strip14Label");
    let jarak_strip15Label = document.getElementById("jarak_strip15Label");
    let jarak_strip16Label = document.getElementById("jarak_strip16Label");
    let jarak_strip17Label = document.getElementById("jarak_strip17Label");
    let jarak_strip18Label = document.getElementById("jarak_strip18Label");
    let jarak_strip19Label = document.getElementById("jarak_strip19Label");
    let jarak_strip20Label = document.getElementById("jarak_strip20Label");
    let jarak_strip21Label = document.getElementById("jarak_strip21Label");
    let jarak_strip22Label = document.getElementById("jarak_strip22Label");
    let jarak_strip23Label = document.getElementById("jarak_strip23Label");
    let jarak_strip24Label = document.getElementById("jarak_strip24Label");
    let sisi_rollLabel = document.getElementById("sisi_rollLabel");
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
    let table_laporan = $("#table_laporan").DataTable({});

    const slcShift = document.getElementById("shift");
    const slcSisiRoll = document.getElementById("sisi_roll");
    const slcTypeMesin = document.getElementById("type_mesin");
    const slcTypeKain = document.getElementById("type_kain");
    const slcLokasi = document.getElementById("lokasi");

    tanggal.valueAsDate = new Date();
    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    tgl_awalModal.valueAsDate = new Date();
    tgl_akhirModal.valueAsDate = new Date();
    // tgl_awalModal.valueAsDate = new Date(2025, 11, 25);
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

    lbr_st.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            rajutan_wa.focus();
        }
    });

    rajutan_wa.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            rajutan_we.focus();
        }
    });

    rajutan_we.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            denier.focus();
        }
    });

    denier.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jml_bng_wa_st.focus();
        }
    });

    jml_bng_wa_st.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jml_bng_wa_pm.focus();
        }
    });

    jml_bng_wa_pm.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            wrn.focus();
        }
    });

    wrn.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            lbr.focus();
        }
    });

    tgl_awal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tgl_akhir.focus();
        }
    });

    tgl_akhir.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_redisplay.focus();
        }
    });

    //#region Checkbox

    status_mesin.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');

        // toggle teks X / ✔
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);

        // jika checked → jam_mati disabled
        if (this.checked) {
            // checked → disable & NULL
            jam_mati.value = '';
            jam_mati.disabled = true;
            // counter_mesin.value = '';
            counter_mesin.disabled = false;
        } else {
            // unchecked → aktif kembali
            jam_mati.disabled = false;
            counter_mesin.disabled = true;
        }
    });

    status_mesin.checked = true;
    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));

    lpt.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    gbs.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    wndr_gld.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    bulu.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');

        // toggle teks X / ✔
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);

        // jika checked → jam_bulu disabled
        // if (this.checked) {
        //     // checked → disable & NULL
        //     jam_bulu.value = '';
        //     jam_bulu.disabled = true;
        // } else {
        //     // unchecked → aktif kembali
        //     jam_bulu.disabled = false;
        // }
    });

    tanda.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    ping_bergerigi.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    sensor_wa.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    sensor_we.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    stang_arm.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

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
                    btn_redisplay.click();
                    allowedType = ["1", "2"];
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    idDetail = null;
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    lbr_st.value = '';
                    rajutan_wa.value = '';
                    rajutan_we.value = '';
                    denier.value = '';
                    jml_bng_wa_st.value = '';
                    jml_bng_wa_pm.value = '';
                    wrn.value = '';
                    lbr.value = '';
                    counter_mesin.value = '';
                    status_mesin.checked = true;
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(null);
                    lpt.checked = false;
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = false;
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = false;
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(null);
                    tanda.checked = false;
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = false;
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = false;
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = false;
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = false;
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    lbr_reinf.value = '';
                    jarak_strip1.value = '';
                    jarak_strip2.value = '';
                    jarak_strip3.value = '';
                    jarak_strip4.value = '';
                    jarak_strip5.value = '';
                    jarak_strip6.value = '';
                    jarak_strip7.value = '';
                    jarak_strip8.value = '';
                    jarak_strip9.value = '';
                    jarak_strip10.value = '';
                    jarak_strip11.value = '';
                    break;

                case "2":
                    // Lokasi 2 hanya type tertentu
                    btn_redisplay.click();
                    allowedType = ["3"];
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    idDetail = null;
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    lbr_st.value = '';
                    rajutan_wa.value = '';
                    rajutan_we.value = '';
                    denier.value = '';
                    jml_bng_wa_st.value = '';
                    jml_bng_wa_pm.value = '';
                    wrn.value = '';
                    lbr.value = '';
                    counter_mesin.value = '';
                    status_mesin.checked = true;
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(null);
                    lpt.checked = false;
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = false;
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = false;
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(null);
                    tanda.checked = false;
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = false;
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = false;
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = false;
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = false;
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    lbr_reinf.value = '';
                    jarak_strip1.value = '';
                    jarak_strip2.value = '';
                    jarak_strip3.value = '';
                    jarak_strip4.value = '';
                    jarak_strip5.value = '';
                    jarak_strip6.value = '';
                    jarak_strip7.value = '';
                    jarak_strip8.value = '';
                    jarak_strip9.value = '';
                    jarak_strip10.value = '';
                    jarak_strip11.value = '';
                    break;

                case "3":
                    // Lokasi 3 hanya type tertentu
                    btn_redisplay.click();
                    allowedType = ["4", "5", "6"];
                    idDetail = null;
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    lbr_st.value = '';
                    rajutan_wa.value = '';
                    rajutan_we.value = '';
                    denier.value = '';
                    jml_bng_wa_st.value = '';
                    jml_bng_wa_pm.value = '';
                    wrn.value = '';
                    lbr.value = '';
                    counter_mesin.value = '';
                    status_mesin.checked = true;
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(null);
                    lpt.checked = false;
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = false;
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = false;
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(null);
                    tanda.checked = false;
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = false;
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = false;
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = false;
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = false;
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    lbr_reinf.value = '';
                    jarak_strip1.value = '';
                    jarak_strip2.value = '';
                    jarak_strip3.value = '';
                    jarak_strip4.value = '';
                    jarak_strip5.value = '';
                    jarak_strip6.value = '';
                    jarak_strip7.value = '';
                    jarak_strip8.value = '';
                    jarak_strip9.value = '';
                    jarak_strip10.value = '';
                    jarak_strip11.value = '';
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

    $("#" + slcSisiRoll.id).select2({ placeholder: "-- Pilih Sisi Roll --" });
    $("#" + slcSisiRoll.id).on("select2:select", function () {

    });

    $("#" + slcSisiRoll.id).val(null).trigger("change");
    $("#" + slcSisiRoll.id).next(".select2-container").hide();
    sisi_rollLabel.style.display = "none";

    $(document).ready(function () {

        $("#" + slcTypeKain.id).select2({
            placeholder: "-- Pilih Kain --"
        });

        // EVENT SELECT2
        // $("#" + slcTypeKain.id).on("select2:select", function (e) {
        //     const val = e.params.data.id; // WAJIB untuk select2
        $("#" + slcTypeKain.id).on("change", function () {
            const val = $(this).val();

            switch (val) {
                case "1":
                    btn_redisplay.click();
                    // btn_batal.click();
                    lbr_st.type = "number";
                    $("#labelRedisplay").text("Tanggal Cek Kain Tubular");
                    btn_laporan.style.display = "block"
                    jarak_stripLabel.style.display = "none";
                    lbr_reinfLabel.style.display = "none";
                    lbr_reinf.style.display = "none";
                    jarak_strip1.style.display = "none";
                    jarak_strip2.style.display = "none";
                    jarak_strip3.style.display = "none";
                    jarak_strip4.style.display = "none";
                    jarak_strip5.style.display = "none";
                    jarak_strip6.style.display = "none";
                    jarak_strip7.style.display = "none";
                    jarak_strip8.style.display = "none";
                    jarak_strip9.style.display = "none";
                    jarak_strip10.style.display = "none";
                    jarak_strip11.style.display = "none";
                    jarak_strip12.style.display = "none";
                    jarak_strip13.style.display = "none";
                    jarak_strip14.style.display = "none";
                    jarak_strip15.style.display = "none";
                    jarak_strip16.style.display = "none";
                    jarak_strip17.style.display = "none";
                    jarak_strip18.style.display = "none";
                    jarak_strip19.style.display = "none";
                    jarak_strip20.style.display = "none";
                    jarak_strip21.style.display = "none";
                    jarak_strip22.style.display = "none";
                    jarak_strip23.style.display = "none";
                    jarak_strip24.style.display = "none";

                    jarak_strip1Label.style.display = "none";
                    jarak_strip2Label.style.display = "none";
                    jarak_strip3Label.style.display = "none";
                    jarak_strip4Label.style.display = "none";
                    jarak_strip5Label.style.display = "none";
                    jarak_strip6Label.style.display = "none";
                    jarak_strip7Label.style.display = "none";
                    jarak_strip8Label.style.display = "none";
                    jarak_strip9Label.style.display = "none";
                    jarak_strip10Label.style.display = "none";
                    jarak_strip11Label.style.display = "none";
                    jarak_strip12Label.style.display = "none";
                    jarak_strip13Label.style.display = "none";
                    jarak_strip14Label.style.display = "none";
                    jarak_strip15Label.style.display = "none";
                    jarak_strip16Label.style.display = "none";
                    jarak_strip17Label.style.display = "none";
                    jarak_strip18Label.style.display = "none";
                    jarak_strip19Label.style.display = "none";
                    jarak_strip20Label.style.display = "none";
                    jarak_strip21Label.style.display = "none";
                    jarak_strip22Label.style.display = "none";
                    jarak_strip23Label.style.display = "none";
                    jarak_strip24Label.style.display = "none";
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    idDetail = null;
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    lbr_st.value = '';
                    rajutan_wa.value = '';
                    rajutan_we.value = '';
                    denier.value = '';
                    jml_bng_wa_st.value = '';
                    jml_bng_wa_pm.value = '';
                    wrn.value = '';
                    lbr.value = '';
                    counter_mesin.value = '';
                    status_mesin.checked = true;
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(null);
                    lpt.checked = false;
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = false;
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = false;
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(null);
                    tanda.checked = false;
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = false;
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = false;
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = false;
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = false;
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    lbr_reinf.value = '';
                    jarak_strip1.value = '';
                    jarak_strip2.value = '';
                    jarak_strip3.value = '';
                    jarak_strip4.value = '';
                    jarak_strip5.value = '';
                    jarak_strip6.value = '';
                    jarak_strip7.value = '';
                    jarak_strip8.value = '';
                    jarak_strip9.value = '';
                    jarak_strip10.value = '';
                    jarak_strip11.value = '';
                    jarak_strip12.value = '';
                    jarak_strip13.value = '';
                    jarak_strip14.value = '';
                    jarak_strip15.value = '';
                    jarak_strip16.value = '';
                    jarak_strip17.value = '';
                    jarak_strip18.value = '';
                    jarak_strip19.value = '';
                    jarak_strip20.value = '';
                    jarak_strip21.value = '';
                    jarak_strip22.value = '';
                    jarak_strip23.value = '';
                    jarak_strip24.value = '';
                    break;

                case "2":
                    btn_redisplay.click();
                    // btn_batal.click();
                    lbr_st.type = "number";
                    $("#labelRedisplay").text("Tanggal Cek Kain Layar/Flat");
                    btn_laporan.style.display = "none"
                    jarak_stripLabel.style.display = "block";
                    lbr_reinfLabel.textContent = "LBR Reinf";
                    lbr_reinfLabel.style.display = "block";
                    lbr_reinf.style.display = "block";

                    jarak_strip1.style.display = "block";
                    jarak_strip2.style.display = "block";
                    jarak_strip3.style.display = "block";
                    jarak_strip4.style.display = "block";
                    jarak_strip5.style.display = "block";
                    jarak_strip6.style.display = "block";
                    jarak_strip7.style.display = "block";
                    jarak_strip8.style.display = "block";
                    jarak_strip9.style.display = "block";
                    jarak_strip10.style.display = "block";
                    jarak_strip11.style.display = "block";
                    jarak_strip12.style.display = "none";
                    jarak_strip13.style.display = "none";
                    jarak_strip14.style.display = "none";
                    jarak_strip15.style.display = "none";
                    jarak_strip16.style.display = "none";
                    jarak_strip17.style.display = "none";
                    jarak_strip18.style.display = "none";
                    jarak_strip19.style.display = "none";
                    jarak_strip20.style.display = "none";
                    jarak_strip21.style.display = "none";
                    jarak_strip22.style.display = "none";
                    jarak_strip23.style.display = "none";
                    jarak_strip24.style.display = "none";

                    jarak_strip1Label.style.display = "block";
                    jarak_strip2Label.style.display = "block";
                    jarak_strip3Label.style.display = "block";
                    jarak_strip4Label.style.display = "block";
                    jarak_strip5Label.style.display = "block";
                    jarak_strip6Label.style.display = "block";
                    jarak_strip7Label.style.display = "block";
                    jarak_strip8Label.style.display = "block";
                    jarak_strip9Label.style.display = "block";
                    jarak_strip10Label.style.display = "block";
                    jarak_strip11Label.style.display = "block";
                    jarak_strip12Label.style.display = "none";
                    jarak_strip13Label.style.display = "none";
                    jarak_strip14Label.style.display = "none";
                    jarak_strip15Label.style.display = "none";
                    jarak_strip16Label.style.display = "none";
                    jarak_strip17Label.style.display = "none";
                    jarak_strip18Label.style.display = "none";
                    jarak_strip19Label.style.display = "none";
                    jarak_strip20Label.style.display = "none";
                    jarak_strip21Label.style.display = "none";
                    jarak_strip22Label.style.display = "none";
                    jarak_strip23Label.style.display = "none";
                    jarak_strip24Label.style.display = "none";
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    idDetail = null;
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    lbr_st.value = '';
                    rajutan_wa.value = '';
                    rajutan_we.value = '';
                    denier.value = '';
                    jml_bng_wa_st.value = '';
                    jml_bng_wa_pm.value = '';
                    wrn.value = '';
                    lbr.value = '';
                    counter_mesin.value = '';
                    status_mesin.checked = true;
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(null);
                    lpt.checked = false;
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = false;
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = false;
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(null);
                    tanda.checked = false;
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = false;
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = false;
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = false;
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = false;
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    lbr_reinf.value = '';
                    jarak_strip1.value = '';
                    jarak_strip2.value = '';
                    jarak_strip3.value = '';
                    jarak_strip4.value = '';
                    jarak_strip5.value = '';
                    jarak_strip6.value = '';
                    jarak_strip7.value = '';
                    jarak_strip8.value = '';
                    jarak_strip9.value = '';
                    jarak_strip10.value = '';
                    jarak_strip11.value = '';
                    jarak_strip12.value = '';
                    jarak_strip13.value = '';
                    jarak_strip14.value = '';
                    jarak_strip15.value = '';
                    jarak_strip16.value = '';
                    jarak_strip17.value = '';
                    jarak_strip18.value = '';
                    jarak_strip19.value = '';
                    jarak_strip20.value = '';
                    jarak_strip21.value = '';
                    jarak_strip22.value = '';
                    jarak_strip23.value = '';
                    jarak_strip24.value = '';
                    break;

                case "3":
                    btn_redisplay.click();
                    // btn_batal.click();
                    lbr_st.type = "text";
                    $("#labelRedisplay").text("Tanggal Cek Kain Gusset");
                    btn_laporan.style.display = "none"
                    jarak_stripLabel.style.display = "none";
                    lbr_reinfLabel.textContent = "LBR Gusset";
                    lbr_reinfLabel.style.display = "block";
                    lbr_reinf.style.display = "block";
                    jarak_strip1.style.display = "none";
                    jarak_strip2.style.display = "none";
                    jarak_strip3.style.display = "none";
                    jarak_strip4.style.display = "none";
                    jarak_strip5.style.display = "none";
                    jarak_strip6.style.display = "none";
                    jarak_strip7.style.display = "none";
                    jarak_strip8.style.display = "none";
                    jarak_strip9.style.display = "none";
                    jarak_strip10.style.display = "none";
                    jarak_strip11.style.display = "none";
                    jarak_strip12.style.display = "none";
                    jarak_strip13.style.display = "none";
                    jarak_strip14.style.display = "none";
                    jarak_strip15.style.display = "none";
                    jarak_strip16.style.display = "none";
                    jarak_strip17.style.display = "none";
                    jarak_strip18.style.display = "none";
                    jarak_strip19.style.display = "none";
                    jarak_strip20.style.display = "none";
                    jarak_strip21.style.display = "none";
                    jarak_strip22.style.display = "none";
                    jarak_strip23.style.display = "none";
                    jarak_strip24.style.display = "none";

                    jarak_strip1Label.style.display = "none";
                    jarak_strip2Label.style.display = "none";
                    jarak_strip3Label.style.display = "none";
                    jarak_strip4Label.style.display = "none";
                    jarak_strip5Label.style.display = "none";
                    jarak_strip6Label.style.display = "none";
                    jarak_strip7Label.style.display = "none";
                    jarak_strip8Label.style.display = "none";
                    jarak_strip9Label.style.display = "none";
                    jarak_strip10Label.style.display = "none";
                    jarak_strip11Label.style.display = "none";
                    jarak_strip12Label.style.display = "none";
                    jarak_strip13Label.style.display = "none";
                    jarak_strip14Label.style.display = "none";
                    jarak_strip15Label.style.display = "none";
                    jarak_strip16Label.style.display = "none";
                    jarak_strip17Label.style.display = "none";
                    jarak_strip18Label.style.display = "none";
                    jarak_strip19Label.style.display = "none";
                    jarak_strip20Label.style.display = "none";
                    jarak_strip21Label.style.display = "none";
                    jarak_strip22Label.style.display = "none";
                    jarak_strip23Label.style.display = "none";
                    jarak_strip24Label.style.display = "none";
                    $("#labelProses").text("Input Data");
                    $("#btn_proses").text("PROSES");
                    idDetail = null;
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    lbr_st.value = '';
                    rajutan_wa.value = '';
                    rajutan_we.value = '';
                    denier.value = '';
                    jml_bng_wa_st.value = '';
                    jml_bng_wa_pm.value = '';
                    wrn.value = '';
                    lbr.value = '';
                    counter_mesin.value = '';
                    status_mesin.checked = true;
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(null);
                    lpt.checked = false;
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = false;
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = false;
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(null);
                    tanda.checked = false;
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = false;
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = false;
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = false;
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = false;
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    lbr_reinf.value = '';
                    jarak_strip1.value = '';
                    jarak_strip2.value = '';
                    jarak_strip3.value = '';
                    jarak_strip4.value = '';
                    jarak_strip5.value = '';
                    jarak_strip6.value = '';
                    jarak_strip7.value = '';
                    jarak_strip8.value = '';
                    jarak_strip9.value = '';
                    jarak_strip10.value = '';
                    jarak_strip11.value = '';
                    jarak_strip12.value = '';
                    jarak_strip13.value = '';
                    jarak_strip14.value = '';
                    jarak_strip15.value = '';
                    jarak_strip16.value = '';
                    jarak_strip17.value = '';
                    jarak_strip18.value = '';
                    jarak_strip19.value = '';
                    jarak_strip20.value = '';
                    jarak_strip21.value = '';
                    jarak_strip22.value = '';
                    jarak_strip23.value = '';
                    jarak_strip24.value = '';
                    break;
            }
        });

        $("#" + slcTypeKain.id).val("1").trigger({
            type: "select2:select",
            params: {
                data: { id: "1" }
            }
        });
        $("#" + slcTypeKain.id).val(1).trigger("change");

    });

    $("#" + slcTypeMesin.id).select2({ placeholder: "-- Pilih Type Mesin --" });
    $("#" + slcTypeMesin.id).on("select2:select", function () {
        $("#" + slcMesin.id)
            .empty()
            .append(new Option())
            .trigger("change");

        slcMesin.disabled = false;
        slcMesin.focus();
        const val = $(this).val();

        if (val == 5) {
            $("#" + slcSisiRoll.id).val(null).trigger("change");
            $("#" + slcSisiRoll.id).next(".select2-container").show();
            sisi_rollLabel.style.display = "block";
        } else {
            $("#" + slcSisiRoll.id).val(null).trigger("change");
            $("#" + slcSisiRoll.id).next(".select2-container").hide();
            sisi_rollLabel.style.display = "none";
        }

        if ($("#" + slcLokasi.id).val() == 3 && $("#" + slcTypeKain.id).val() == 1) {
            if (val == 6) {
                jarak_strip1.style.display = "block";
                jarak_strip2.style.display = "block";
                jarak_strip3.style.display = "block";
                jarak_strip4.style.display = "block";
                jarak_strip5.style.display = "block";
                jarak_strip6.style.display = "block";
                jarak_strip7.style.display = "block";
                jarak_strip8.style.display = "block";
                jarak_strip9.style.display = "block";
                jarak_strip10.style.display = "block";
                jarak_strip11.style.display = "block";
                jarak_strip12.style.display = "block";
                jarak_strip13.style.display = "block";
                jarak_strip14.style.display = "block";
                jarak_strip15.style.display = "block";
                jarak_strip16.style.display = "block";
                jarak_strip17.style.display = "block";
                jarak_strip18.style.display = "block";
                jarak_strip19.style.display = "block";
                jarak_strip20.style.display = "block";
                jarak_strip21.style.display = "block";
                jarak_strip22.style.display = "block";
                jarak_strip23.style.display = "block";
                jarak_strip24.style.display = "block";

                jarak_strip1Label.style.display = "block";
                jarak_strip2Label.style.display = "block";
                jarak_strip3Label.style.display = "block";
                jarak_strip4Label.style.display = "block";
                jarak_strip5Label.style.display = "block";
                jarak_strip6Label.style.display = "block";
                jarak_strip7Label.style.display = "block";
                jarak_strip8Label.style.display = "block";
                jarak_strip9Label.style.display = "block";
                jarak_strip10Label.style.display = "block";
                jarak_strip11Label.style.display = "block";
                jarak_strip12Label.style.display = "block";
                jarak_strip13Label.style.display = "block";
                jarak_strip14Label.style.display = "block";
                jarak_strip15Label.style.display = "block";
                jarak_strip16Label.style.display = "block";
                jarak_strip17Label.style.display = "block";
                jarak_strip18Label.style.display = "block";
                jarak_strip19Label.style.display = "block";
                jarak_strip20Label.style.display = "block";
                jarak_strip21Label.style.display = "block";
                jarak_strip22Label.style.display = "block";
                jarak_strip23Label.style.display = "block";
                jarak_strip24Label.style.display = "block";

                jarak_stripLabel.style.display = "block";
                // lbr_reinfLabel.style.display = "block";
                // lbr_reinf.style.display = "block";

                lbr_reinf.value = '';
                jarak_strip1.value = '';
                jarak_strip2.value = '';
                jarak_strip3.value = '';
                jarak_strip4.value = '';
                jarak_strip5.value = '';
                jarak_strip6.value = '';
                jarak_strip7.value = '';
                jarak_strip8.value = '';
                jarak_strip9.value = '';
                jarak_strip10.value = '';
                jarak_strip11.value = '';
                jarak_strip12.value = '';
                jarak_strip13.value = '';
                jarak_strip14.value = '';
                jarak_strip15.value = '';
                jarak_strip16.value = '';
                jarak_strip17.value = '';
                jarak_strip18.value = '';
                jarak_strip19.value = '';
                jarak_strip20.value = '';
                jarak_strip21.value = '';
                jarak_strip22.value = '';
                jarak_strip23.value = '';
                jarak_strip24.value = '';

            } else {
                jarak_strip1.style.display = "none";
                jarak_strip2.style.display = "none";
                jarak_strip3.style.display = "none";
                jarak_strip4.style.display = "none";
                jarak_strip5.style.display = "none";
                jarak_strip6.style.display = "none";
                jarak_strip7.style.display = "none";
                jarak_strip8.style.display = "none";
                jarak_strip9.style.display = "none";
                jarak_strip10.style.display = "none";
                jarak_strip11.style.display = "none";

                jarak_strip12.style.display = "none";
                jarak_strip13.style.display = "none";
                jarak_strip14.style.display = "none";
                jarak_strip15.style.display = "none";
                jarak_strip16.style.display = "none";
                jarak_strip17.style.display = "none";
                jarak_strip18.style.display = "none";
                jarak_strip19.style.display = "none";
                jarak_strip20.style.display = "none";
                jarak_strip21.style.display = "none";
                jarak_strip22.style.display = "none";
                jarak_strip23.style.display = "none";
                jarak_strip24.style.display = "none";

                jarak_strip1Label.style.display = "none";
                jarak_strip2Label.style.display = "none";
                jarak_strip3Label.style.display = "none";
                jarak_strip4Label.style.display = "none";
                jarak_strip5Label.style.display = "none";
                jarak_strip6Label.style.display = "none";
                jarak_strip7Label.style.display = "none";
                jarak_strip8Label.style.display = "none";
                jarak_strip9Label.style.display = "none";
                jarak_strip10Label.style.display = "none";
                jarak_strip11Label.style.display = "none";

                jarak_strip12Label.style.display = "none";
                jarak_strip13Label.style.display = "none";
                jarak_strip14Label.style.display = "none";
                jarak_strip15Label.style.display = "none";
                jarak_strip16Label.style.display = "none";
                jarak_strip17Label.style.display = "none";
                jarak_strip18Label.style.display = "none";
                jarak_strip19Label.style.display = "none";
                jarak_strip20Label.style.display = "none";
                jarak_strip21Label.style.display = "none";
                jarak_strip22Label.style.display = "none";
                jarak_strip23Label.style.display = "none";
                jarak_strip24Label.style.display = "none";

                jarak_stripLabel.style.display = "none";
                // lbr_reinfLabel.style.display = "none";
                // lbr_reinf.style.display = "none";

                lbr_reinf.value = '';
                jarak_strip1.value = '';
                jarak_strip2.value = '';
                jarak_strip3.value = '';
                jarak_strip4.value = '';
                jarak_strip5.value = '';
                jarak_strip6.value = '';
                jarak_strip7.value = '';
                jarak_strip8.value = '';
                jarak_strip9.value = '';
                jarak_strip10.value = '';
                jarak_strip11.value = '';
                jarak_strip12.value = '';
                jarak_strip13.value = '';
                jarak_strip14.value = '';
                jarak_strip15.value = '';
                jarak_strip16.value = '';
                jarak_strip17.value = '';
                jarak_strip18.value = '';
                jarak_strip19.value = '';
                jarak_strip20.value = '';
                jarak_strip21.value = '';
                jarak_strip22.value = '';
                jarak_strip23.value = '';
                jarak_strip24.value = '';

            }
        } else if ($("#" + slcLokasi.id).val() == 3 && $("#" + slcTypeKain.id).val() == 2) {
            if (val == 6) {
                jarak_strip1.style.display = "block";
                jarak_strip2.style.display = "block";
                jarak_strip3.style.display = "block";
                jarak_strip4.style.display = "block";
                jarak_strip5.style.display = "block";
                jarak_strip6.style.display = "block";
                jarak_strip7.style.display = "block";
                jarak_strip8.style.display = "block";
                jarak_strip9.style.display = "block";
                jarak_strip10.style.display = "block";
                jarak_strip11.style.display = "block";
                jarak_strip12.style.display = "block";
                jarak_strip13.style.display = "block";
                jarak_strip14.style.display = "block";
                jarak_strip15.style.display = "block";
                jarak_strip16.style.display = "block";
                jarak_strip17.style.display = "block";
                jarak_strip18.style.display = "block";
                jarak_strip19.style.display = "block";
                jarak_strip20.style.display = "block";
                jarak_strip21.style.display = "block";
                jarak_strip22.style.display = "block";
                jarak_strip23.style.display = "block";
                jarak_strip24.style.display = "block";

                jarak_strip1Label.style.display = "block";
                jarak_strip2Label.style.display = "block";
                jarak_strip3Label.style.display = "block";
                jarak_strip4Label.style.display = "block";
                jarak_strip5Label.style.display = "block";
                jarak_strip6Label.style.display = "block";
                jarak_strip7Label.style.display = "block";
                jarak_strip8Label.style.display = "block";
                jarak_strip9Label.style.display = "block";
                jarak_strip10Label.style.display = "block";
                jarak_strip11Label.style.display = "block";
                jarak_strip12Label.style.display = "block";
                jarak_strip13Label.style.display = "block";
                jarak_strip14Label.style.display = "block";
                jarak_strip15Label.style.display = "block";
                jarak_strip16Label.style.display = "block";
                jarak_strip17Label.style.display = "block";
                jarak_strip18Label.style.display = "block";
                jarak_strip19Label.style.display = "block";
                jarak_strip20Label.style.display = "block";
                jarak_strip21Label.style.display = "block";
                jarak_strip22Label.style.display = "block";
                jarak_strip23Label.style.display = "block";
                jarak_strip24Label.style.display = "block";

                jarak_stripLabel.style.display = "block";
                // lbr_reinfLabel.style.display = "block";
                // lbr_reinf.style.display = "block";

                lbr_reinf.value = '';
                jarak_strip1.value = '';
                jarak_strip2.value = '';
                jarak_strip3.value = '';
                jarak_strip4.value = '';
                jarak_strip5.value = '';
                jarak_strip6.value = '';
                jarak_strip7.value = '';
                jarak_strip8.value = '';
                jarak_strip9.value = '';
                jarak_strip10.value = '';
                jarak_strip11.value = '';
                jarak_strip12.value = '';
                jarak_strip13.value = '';
                jarak_strip14.value = '';
                jarak_strip15.value = '';
                jarak_strip16.value = '';
                jarak_strip17.value = '';
                jarak_strip18.value = '';
                jarak_strip19.value = '';
                jarak_strip20.value = '';
                jarak_strip21.value = '';
                jarak_strip22.value = '';
                jarak_strip23.value = '';
                jarak_strip24.value = '';

            } else {
                jarak_strip1.style.display = "block";
                jarak_strip2.style.display = "block";
                jarak_strip3.style.display = "block";
                jarak_strip4.style.display = "block";
                jarak_strip5.style.display = "block";
                jarak_strip6.style.display = "block";
                jarak_strip7.style.display = "block";
                jarak_strip8.style.display = "block";
                jarak_strip9.style.display = "block";
                jarak_strip10.style.display = "block";
                jarak_strip11.style.display = "block";

                jarak_strip12.style.display = "none";
                jarak_strip13.style.display = "none";
                jarak_strip14.style.display = "none";
                jarak_strip15.style.display = "none";
                jarak_strip16.style.display = "none";
                jarak_strip17.style.display = "none";
                jarak_strip18.style.display = "none";
                jarak_strip19.style.display = "none";
                jarak_strip20.style.display = "none";
                jarak_strip21.style.display = "none";
                jarak_strip22.style.display = "none";
                jarak_strip23.style.display = "none";
                jarak_strip24.style.display = "none";

                jarak_strip1Label.style.display = "block";
                jarak_strip2Label.style.display = "block";
                jarak_strip3Label.style.display = "block";
                jarak_strip4Label.style.display = "block";
                jarak_strip5Label.style.display = "block";
                jarak_strip6Label.style.display = "block";
                jarak_strip7Label.style.display = "block";
                jarak_strip8Label.style.display = "block";
                jarak_strip9Label.style.display = "block";
                jarak_strip10Label.style.display = "block";
                jarak_strip11Label.style.display = "block";

                jarak_strip12Label.style.display = "none";
                jarak_strip13Label.style.display = "none";
                jarak_strip14Label.style.display = "none";
                jarak_strip15Label.style.display = "none";
                jarak_strip16Label.style.display = "none";
                jarak_strip17Label.style.display = "none";
                jarak_strip18Label.style.display = "none";
                jarak_strip19Label.style.display = "none";
                jarak_strip20Label.style.display = "none";
                jarak_strip21Label.style.display = "none";
                jarak_strip22Label.style.display = "none";
                jarak_strip23Label.style.display = "none";
                jarak_strip24Label.style.display = "none";

                jarak_stripLabel.style.display = "block";
                // lbr_reinfLabel.style.display = "none";
                // lbr_reinf.style.display = "none";

                lbr_reinf.value = '';
                jarak_strip1.value = '';
                jarak_strip2.value = '';
                jarak_strip3.value = '';
                jarak_strip4.value = '';
                jarak_strip5.value = '';
                jarak_strip6.value = '';
                jarak_strip7.value = '';
                jarak_strip8.value = '';
                jarak_strip9.value = '';
                jarak_strip10.value = '';
                jarak_strip11.value = '';
                jarak_strip12.value = '';
                jarak_strip13.value = '';
                jarak_strip14.value = '';
                jarak_strip15.value = '';
                jarak_strip16.value = '';
                jarak_strip17.value = '';
                jarak_strip18.value = '';
                jarak_strip19.value = '';
                jarak_strip20.value = '';
                jarak_strip21.value = '';
                jarak_strip22.value = '';
                jarak_strip23.value = '';
                jarak_strip24.value = '';

            }
        }

        setTimeout(() => {
            fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val());
        }, 300);
    });

    const slcMesin = $("#nama_mesin");
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
                    }
                });
            });
    }

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
                    if ($("#" + slcLokasi.id).val() == 2) {
                        const text = $(this).find(":selected").text();
                        if (text.includes("|")) {
                            const namaMesin = text.split("|")[1].trim();
                            console.log(namaMesin);
                            $.ajax({
                                url: "CekKainCircular/getDataTypeBarangMojo",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    nama_mesin: namaMesin,
                                },
                                success: function (response) {
                                    console.log(response);
                                    lbr_st.value = response[0].D_TEK1.trim() ?? '';
                                    rajutan_wa.value = response[0].D_TEK2.trim() ?? '';
                                    rajutan_we.value = response[0].D_TEK3.trim() ?? '';
                                    denier.value = response[0].D_TEK4.trim() ?? '';
                                    wrn.value = response[0].D_TEK5.trim() ?? '';

                                },
                                error: function (xhr, status, error) {
                                    var err = eval("(" + xhr.responseText + ")");
                                    alert(err.Message);
                                },
                            });
                        }
                    } else {
                        const text = $(this).find(":selected").text();
                        if (text.includes("|")) {
                            const namaMesin = text.split("|")[1].trim();
                            console.log(namaMesin);
                            $.ajax({
                                url: "CekKainCircular/getDataTypeBarang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    nama_mesin: namaMesin,
                                },
                                success: function (response) {
                                    console.log(response);
                                    lbr_st.value = response[0].D_TEK1.trim() ?? '';
                                    rajutan_wa.value = response[0].D_TEK2.trim() ?? '';
                                    rajutan_we.value = response[0].D_TEK3.trim() ?? '';
                                    denier.value = response[0].D_TEK4.trim() ?? '';
                                    wrn.value = response[0].D_TEK5.trim() ?? '';

                                },
                                error: function (xhr, status, error) {
                                    var err = eval("(" + xhr.responseText + ")");
                                    alert(err.Message);
                                },
                            });
                        }
                    }
                    counter_mesin.focus();
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

    //#region EventButton

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        // let nilaiLPT = lpt.checked ? 'Y' : 'T';
        // console.log(nilaiLPT);
        // console.log(shift.value);
        // console.log($("#" + slcTypeMesin.id).val());
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
        let jam_buluConvert = null;
        if (jam_bulu.value.trim() !== "") {
            jam_buluConvert = convertToSQLDatetime(tanggal, jam_bulu.value);
            if (jam_buluConvert === null) return;
        }
        let jam_matiConvert = null;
        if (jam_mati.value.trim() !== "") {
            jam_matiConvert = convertToSQLDatetime(tanggal, jam_mati.value);
            if (jam_matiConvert === null) return;
        }

        if (shift.value === "" || $("#" + slcTypeMesin.id).val() === "" || slcMesin.val() === "" || slcMesin.val() === null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Shift dan mesin tidak boleh kosong!",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }
        $.ajax({
            url: "CekKainCircular",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (labelProses.textContent == "Koreksi Data") ? 2 : 1,
                type_kain: $("#" + slcTypeKain.id).val(),
                lokasi: $("#" + slcLokasi.id).val(),
                tanggal: tanggal.value,
                shift: shift.value,
                jam_kerja_awal: jam_kerja_awalConvert,
                jam_kerja_akhir: jam_kerja_akhirConvert,
                idType_mesin: $("#" + slcTypeMesin.id).val(),
                idNama_mesin: slcMesin.val(),
                counter_mesin: counter_mesin.value,
                status_mesin: status_mesin.checked ? 'Y' : 'T',
                jam_mati: jam_matiConvert,
                lbr_st: lbr_st.value,
                rajutan_wa: rajutan_wa.value,
                rajutan_we: rajutan_we.value,
                denier: denier.value,
                jml_bng_wa_st: jml_bng_wa_st.value,
                jml_bng_wa_pm: jml_bng_wa_pm.value,
                wrn: wrn.value,
                lbr: lbr.value,
                lpt: lpt.checked ? 'Y' : 'T',
                gbs: gbs.checked ? 'Y' : 'T',
                wndr_gld: wndr_gld.checked ? 'Y' : 'T',
                bulu: bulu.checked ? 'Y' : 'T',
                jam_bulu: jam_buluConvert,
                tanda: tanda.checked ? 'Y' : 'T',
                ping_bergerigi: ping_bergerigi.checked ? 'Y' : 'T',
                sensor_wa: sensor_wa.checked ? 'OK' : 'NG',
                sensor_we: sensor_we.checked ? 'OK' : 'NG',
                stang_arm: stang_arm.checked ? 'OK' : 'NG',
                keterangan: keterangan.value,
                idDetail: idDetail,
                // lbr_reinf: lbr_reinf.value,
                lbr_reinf: $("#" + slcTypeKain.id).val() == 2 ? lbr_reinf.value : '',
                lbr_gusset: $("#" + slcTypeKain.id).val() == 3 ? lbr_reinf.value : '',
                jarak_strip1: jarak_strip1.value,
                jarak_strip2: jarak_strip2.value,
                jarak_strip3: jarak_strip3.value,
                jarak_strip4: jarak_strip4.value,
                jarak_strip5: jarak_strip5.value,
                jarak_strip6: jarak_strip6.value,
                jarak_strip7: jarak_strip7.value,
                jarak_strip8: jarak_strip8.value,
                jarak_strip9: jarak_strip9.value,
                jarak_strip10: jarak_strip10.value,
                jarak_strip11: jarak_strip11.value,
                jarak_strip12: jarak_strip12.value,
                jarak_strip13: jarak_strip13.value,
                jarak_strip14: jarak_strip14.value,
                jarak_strip15: jarak_strip15.value,
                jarak_strip16: jarak_strip16.value,
                jarak_strip17: jarak_strip17.value,
                jarak_strip18: jarak_strip18.value,
                jarak_strip19: jarak_strip19.value,
                jarak_strip20: jarak_strip20.value,
                jarak_strip21: jarak_strip21.value,
                jarak_strip22: jarak_strip22.value,
                jarak_strip23: jarak_strip23.value,
                jarak_strip24: jarak_strip24.value,
                sisi_roll: $("#" + slcSisiRoll.id).val(),
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
                        // btn_batal.click();
                        btn_proses.disabled = false;
                        $("#labelProses").text("Input Data");
                        $("#btn_proses").text("PROSES");
                        idDetail = null;
                        tanggal.valueAsDate = new Date();
                        // $("#" + slcShift.id).val(null).trigger("change");
                        // jam_kerja_awal.value = ambilJam(null);
                        // jam_kerja_akhir.value = ambilJam(null);
                        // $("#" + slcTypeMesin.id).val(null).trigger("change");
                        slcMesin.val(null).trigger("change");
                        lbr_st.value = '';
                        rajutan_wa.value = '';
                        rajutan_we.value = '';
                        denier.value = '';
                        jml_bng_wa_st.value = '';
                        jml_bng_wa_pm.value = '';
                        wrn.value = '';
                        lbr.value = '';
                        counter_mesin.value = '';
                        status_mesin.checked = true;
                        status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                        jam_mati.value = ambilJam(null);
                        lpt.checked = false;
                        lpt.dispatchEvent(new Event('change', { bubbles: true }));
                        gbs.checked = false;
                        gbs.dispatchEvent(new Event('change', { bubbles: true }));
                        wndr_gld.checked = false;
                        wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                        bulu.checked = false;
                        bulu.dispatchEvent(new Event('change', { bubbles: true }));
                        jam_bulu.value = ambilJam(null);
                        tanda.checked = false;
                        tanda.dispatchEvent(new Event('change', { bubbles: true }));
                        ping_bergerigi.checked = false;
                        ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                        sensor_wa.checked = false;
                        sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                        sensor_we.checked = false;
                        sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                        stang_arm.checked = false;
                        stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                        keterangan.value = '';
                        lbr_reinf.value = '';
                        jarak_strip1.value = '';
                        jarak_strip2.value = '';
                        jarak_strip3.value = '';
                        jarak_strip4.value = '';
                        jarak_strip5.value = '';
                        jarak_strip6.value = '';
                        jarak_strip7.value = '';
                        jarak_strip8.value = '';
                        jarak_strip9.value = '';
                        jarak_strip10.value = '';
                        jarak_strip11.value = '';
                        jarak_strip12.value = '';
                        jarak_strip13.value = '';
                        jarak_strip14.value = '';
                        jarak_strip15.value = '';
                        jarak_strip16.value = '';
                        jarak_strip17.value = '';
                        jarak_strip18.value = '';
                        jarak_strip19.value = '';
                        jarak_strip20.value = '';
                        jarak_strip21.value = '';
                        jarak_strip22.value = '';
                        jarak_strip23.value = '';
                        jarak_strip24.value = '';
                        $("#" + slcSisiRoll.id).val(null).trigger("change");
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

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        $("#labelProses").text("Input Data");
        $("#btn_proses").text("PROSES");
        idDetail = null;
        tanggal.valueAsDate = new Date();
        $("#" + slcShift.id).val(null).trigger("change");
        jam_kerja_awal.value = ambilJam(null);
        jam_kerja_akhir.value = ambilJam(null);
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        lbr_st.value = '';
        rajutan_wa.value = '';
        rajutan_we.value = '';
        denier.value = '';
        jml_bng_wa_st.value = '';
        jml_bng_wa_pm.value = '';
        wrn.value = '';
        lbr.value = '';
        counter_mesin.value = '';
        status_mesin.checked = true;
        status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
        jam_mati.value = ambilJam(null);
        lpt.checked = false;
        lpt.dispatchEvent(new Event('change', { bubbles: true }));
        gbs.checked = false;
        gbs.dispatchEvent(new Event('change', { bubbles: true }));
        wndr_gld.checked = false;
        wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
        bulu.checked = false;
        bulu.dispatchEvent(new Event('change', { bubbles: true }));
        jam_bulu.value = ambilJam(null);
        tanda.checked = false;
        tanda.dispatchEvent(new Event('change', { bubbles: true }));
        ping_bergerigi.checked = false;
        ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
        sensor_wa.checked = false;
        sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
        sensor_we.checked = false;
        sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
        stang_arm.checked = false;
        stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
        keterangan.value = '';
        lbr_reinf.value = '';
        jarak_strip1.value = '';
        jarak_strip2.value = '';
        jarak_strip3.value = '';
        jarak_strip4.value = '';
        jarak_strip5.value = '';
        jarak_strip6.value = '';
        jarak_strip7.value = '';
        jarak_strip8.value = '';
        jarak_strip9.value = '';
        jarak_strip10.value = '';
        jarak_strip11.value = '';
    });

    btn_laporan.addEventListener("click", async function (event) {
        event.preventDefault();
        $('#modalLaporan').modal('show');
    });

    btn_okModal.addEventListener("click", async function (event) {
        event.preventDefault();
        table_laporan = $("#table_laporan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "CekKainCircular/getDataLaporan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalModal: tgl_awalModal.value,
                        tgl_akhirModal: tgl_akhirModal.value,
                        type_kain: $("#" + slcTypeKain.id).val(),
                        lokasi: $("#" + slcLokasi.id).val(),
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
                { data: "shift" },
                { data: "status_panen" },
                { data: "user_panen" },
            ],
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "550px",
            scrollCollapse: true,
        });
    });
    let rowDataArray = [];
    let rowDataPertama = null;
    // Handle checkbox change events
    $("#table_laporan tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_laporan tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_laporan.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);
                // rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_laporan);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_laporan.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row.idHeader !== rowDataPertama.idHeader
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_laporan);
            }
        }
    );

    btn_prosesPanen.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "CekKainCircular/prosesStatusPanen",
            dataType: "json",
            type: "GET",
            data: {
                _token: csrfToken,
                rowDataArray: rowDataArray,
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
                        $("#table_laporan").DataTable().ajax.reload();
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

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "CekKainCircular/getDataDetail",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                        type_kain: $("#" + slcTypeKain.id).val(),
                        lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                { data: "idDetail" },
                { data: "nama_typeKain" },
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
                { data: "Nama_mesin" },
                { data: "counter_mesin" },
                { data: "status_mesin" },
                { data: "lbr_st" },
                { data: "rajutan_wa" },
                { data: "rajutan_we" },
                // { data: "denier" },
                { data: "wrn" },
                { data: "user_input" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        return `
                    <button class="btn btn-sm btn-warning btn-koreksi" style="width: 60px;"data-id="${row.idDetail}">
                        <i class="fa fa-edit"></i> Koreksi
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" style="width: 60px;" data-id="${row.idDetail}">
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
        // }
    });

    let idDetail = null;
    $('#table_atas').on('click', '.btn-koreksi', function () {
        const id = $(this).data('id');
        console.log(id);
        idDetail = id;
        $.ajax({
            url: "CekKainCircular/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                idDetail: id,
            },
            success: function (data) {
                console.log(data);
                if ($("#" + slcTypeKain.id).val() == 1) {
                    $("#labelProses").text("Koreksi Data");
                    $("#btn_proses").text("Proses Update");
                    tanggal.value = data.data[0].tanggal;
                    // $("#" + slcTypeKain.id).val(data.data[0].type_kain).trigger("change");
                    $("#" + slcShift.id).val(data.data[0].shift).trigger("change");
                    jam_kerja_awal.value = ambilJam(data.data[0].jam_kerja_awal);
                    jam_kerja_akhir.value = ambilJam(data.data[0].jam_kerja_akhir);
                    $("#" + slcTypeMesin.id).val(data.data[0].idType_mesin).trigger("change");
                    fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), data.data[0].idNama_mesin);
                    counter_mesin.value = data.data[0].counter_mesin;
                    status_mesin.checked = (data.data[0].status_mesin === 'Y');
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(data.data[0].jam_mati);
                    lbr_st.value = data.data[0].lbr_st;
                    rajutan_wa.value = data.data[0].rajutan_wa;
                    rajutan_we.value = data.data[0].rajutan_we;
                    denier.value = data.data[0].denier;
                    jml_bng_wa_st.value = data.data[0].jml_bng_wa_st;
                    jml_bng_wa_pm.value = data.data[0].jml_bng_wa_pm;
                    wrn.value = data.data[0].wrn;
                    lbr.value = data.data[0].lbr;
                    lpt.checked = (data.data[0].lpt === 'Y');
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = (data.data[0].gbs === 'Y');
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = (data.data[0].wndr_gld === 'Y');
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = (data.data[0].bulu === 'Y');
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(data.data[0].jam_temuan);
                    tanda.checked = (data.data[0].tanda === 'Y');
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = (data.data[0].ping_bergerigi === 'Y');
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = (data.data[0].sensor_wa === 'OK');
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = (data.data[0].sensor_we === 'OK');
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = (data.data[0].stang_arm === 'OK');
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = data.data[0].keterangan;
                    lbr_reinf.value = '';
                    // lbr_reinf.value = data.data[0].lbr_reinf;
                    // lbr_gusset.value = data.data[0].lbr_gusset;
                    jarak_strip1.value = data.data[0].strip1;
                    jarak_strip2.value = data.data[0].strip2;
                    jarak_strip3.value = data.data[0].strip3;
                    jarak_strip4.value = data.data[0].strip4;
                    jarak_strip5.value = data.data[0].strip5;
                    jarak_strip6.value = data.data[0].strip6;
                    jarak_strip7.value = data.data[0].strip7;
                    jarak_strip8.value = data.data[0].strip8;
                    jarak_strip9.value = data.data[0].strip9;
                    jarak_strip10.value = data.data[0].strip10;
                    jarak_strip11.value = data.data[0].strip11;
                    jarak_strip12.value = data.data[0].strip12;
                    jarak_strip13.value = data.data[0].strip13;
                    jarak_strip14.value = data.data[0].strip14;
                    jarak_strip15.value = data.data[0].strip15;
                    jarak_strip16.value = data.data[0].strip16;
                    jarak_strip17.value = data.data[0].strip17;
                    jarak_strip18.value = data.data[0].strip18;
                    jarak_strip19.value = data.data[0].strip19;
                    jarak_strip20.value = data.data[0].strip20;
                    jarak_strip21.value = data.data[0].strip21;
                    jarak_strip22.value = data.data[0].strip22;
                    jarak_strip23.value = data.data[0].strip23;
                    jarak_strip24.value = data.data[0].strip24;
                    tanggal.focus();

                    if (data.data[0].idType_mesin == 6) {
                        jarak_strip1.style.display = "block";
                        jarak_strip2.style.display = "block";
                        jarak_strip3.style.display = "block";
                        jarak_strip4.style.display = "block";
                        jarak_strip5.style.display = "block";
                        jarak_strip6.style.display = "block";
                        jarak_strip7.style.display = "block";
                        jarak_strip8.style.display = "block";
                        jarak_strip9.style.display = "block";
                        jarak_strip10.style.display = "block";
                        jarak_strip11.style.display = "block";
                        jarak_strip12.style.display = "block";
                        jarak_strip13.style.display = "block";
                        jarak_strip14.style.display = "block";
                        jarak_strip15.style.display = "block";
                        jarak_strip16.style.display = "block";
                        jarak_strip17.style.display = "block";
                        jarak_strip18.style.display = "block";
                        jarak_strip19.style.display = "block";
                        jarak_strip20.style.display = "block";
                        jarak_strip21.style.display = "block";
                        jarak_strip22.style.display = "block";
                        jarak_strip23.style.display = "block";
                        jarak_strip24.style.display = "block";

                        jarak_strip1Label.style.display = "block";
                        jarak_strip2Label.style.display = "block";
                        jarak_strip3Label.style.display = "block";
                        jarak_strip4Label.style.display = "block";
                        jarak_strip5Label.style.display = "block";
                        jarak_strip6Label.style.display = "block";
                        jarak_strip7Label.style.display = "block";
                        jarak_strip8Label.style.display = "block";
                        jarak_strip9Label.style.display = "block";
                        jarak_strip10Label.style.display = "block";
                        jarak_strip11Label.style.display = "block";
                        jarak_strip12Label.style.display = "block";
                        jarak_strip13Label.style.display = "block";
                        jarak_strip14Label.style.display = "block";
                        jarak_strip15Label.style.display = "block";
                        jarak_strip16Label.style.display = "block";
                        jarak_strip17Label.style.display = "block";
                        jarak_strip18Label.style.display = "block";
                        jarak_strip19Label.style.display = "block";
                        jarak_strip20Label.style.display = "block";
                        jarak_strip21Label.style.display = "block";
                        jarak_strip22Label.style.display = "block";
                        jarak_strip23Label.style.display = "block";
                        jarak_strip24Label.style.display = "block";

                        jarak_stripLabel.style.display = "block";
                    } else {
                        jarak_strip1.style.display = "none";
                        jarak_strip2.style.display = "none";
                        jarak_strip3.style.display = "none";
                        jarak_strip4.style.display = "none";
                        jarak_strip5.style.display = "none";
                        jarak_strip6.style.display = "none";
                        jarak_strip7.style.display = "none";
                        jarak_strip8.style.display = "none";
                        jarak_strip9.style.display = "none";
                        jarak_strip10.style.display = "none";
                        jarak_strip11.style.display = "none";

                        jarak_strip12.style.display = "none";
                        jarak_strip13.style.display = "none";
                        jarak_strip14.style.display = "none";
                        jarak_strip15.style.display = "none";
                        jarak_strip16.style.display = "none";
                        jarak_strip17.style.display = "none";
                        jarak_strip18.style.display = "none";
                        jarak_strip19.style.display = "none";
                        jarak_strip20.style.display = "none";
                        jarak_strip21.style.display = "none";
                        jarak_strip22.style.display = "none";
                        jarak_strip23.style.display = "none";
                        jarak_strip24.style.display = "none";

                        jarak_strip1Label.style.display = "none";
                        jarak_strip2Label.style.display = "none";
                        jarak_strip3Label.style.display = "none";
                        jarak_strip4Label.style.display = "none";
                        jarak_strip5Label.style.display = "none";
                        jarak_strip6Label.style.display = "none";
                        jarak_strip7Label.style.display = "none";
                        jarak_strip8Label.style.display = "none";
                        jarak_strip9Label.style.display = "none";
                        jarak_strip10Label.style.display = "none";
                        jarak_strip11Label.style.display = "none";

                        jarak_strip12Label.style.display = "none";
                        jarak_strip13Label.style.display = "none";
                        jarak_strip14Label.style.display = "none";
                        jarak_strip15Label.style.display = "none";
                        jarak_strip16Label.style.display = "none";
                        jarak_strip17Label.style.display = "none";
                        jarak_strip18Label.style.display = "none";
                        jarak_strip19Label.style.display = "none";
                        jarak_strip20Label.style.display = "none";
                        jarak_strip21Label.style.display = "none";
                        jarak_strip22Label.style.display = "none";
                        jarak_strip23Label.style.display = "none";
                        jarak_strip24Label.style.display = "none";

                        jarak_stripLabel.style.display = "none";
                    }

                    if (data.data[0].idType_mesin == 5) {
                        $("#" + slcSisiRoll.id).val(data.data[0].sisi_roll).trigger("change");
                        $("#" + slcSisiRoll.id).next(".select2-container").show();
                        sisi_rollLabel.style.display = "block";
                    } else {
                        $("#" + slcSisiRoll.id).val(null).trigger("change");
                        $("#" + slcSisiRoll.id).next(".select2-container").hide();
                        sisi_rollLabel.style.display = "none";
                    }
                } else if ($("#" + slcTypeKain.id).val() == 2) {
                    $("#labelProses").text("Koreksi Data");
                    $("#btn_proses").text("Proses Update");
                    tanggal.value = data.data[0].tanggal;
                    // $("#" + slcTypeKain.id).val(data.data[0].type_kain).trigger("change");
                    $("#" + slcShift.id).val(data.data[0].shift).trigger("change");
                    jam_kerja_awal.value = ambilJam(data.data[0].jam_kerja_awal);
                    jam_kerja_akhir.value = ambilJam(data.data[0].jam_kerja_akhir);
                    $("#" + slcTypeMesin.id).val(data.data[0].idType_mesin).trigger("change");
                    fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), data.data[0].idNama_mesin);
                    counter_mesin.value = data.data[0].counter_mesin;
                    status_mesin.checked = (data.data[0].status_mesin === 'Y');
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(data.data[0].jam_mati);
                    lbr_st.value = data.data[0].lbr_st;
                    rajutan_wa.value = data.data[0].rajutan_wa;
                    rajutan_we.value = data.data[0].rajutan_we;
                    denier.value = data.data[0].denier;
                    jml_bng_wa_st.value = data.data[0].jml_bng_wa_st;
                    jml_bng_wa_pm.value = data.data[0].jml_bng_wa_pm;
                    wrn.value = data.data[0].wrn;
                    lbr.value = data.data[0].lbr;
                    lpt.checked = (data.data[0].lpt === 'Y');
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = (data.data[0].gbs === 'Y');
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = (data.data[0].wndr_gld === 'Y');
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = (data.data[0].bulu === 'Y');
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(data.data[0].jam_temuan);
                    tanda.checked = (data.data[0].tanda === 'Y');
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = (data.data[0].ping_bergerigi === 'Y');
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = (data.data[0].sensor_wa === 'OK');
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = (data.data[0].sensor_we === 'OK');
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = (data.data[0].stang_arm === 'OK');
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = data.data[0].keterangan;
                    lbr_reinf.value = data.data[0].lbr_reinf;
                    jarak_strip1.value = data.data[0].strip1;
                    jarak_strip2.value = data.data[0].strip2;
                    jarak_strip3.value = data.data[0].strip3;
                    jarak_strip4.value = data.data[0].strip4;
                    jarak_strip5.value = data.data[0].strip5;
                    jarak_strip6.value = data.data[0].strip6;
                    jarak_strip7.value = data.data[0].strip7;
                    jarak_strip8.value = data.data[0].strip8;
                    jarak_strip9.value = data.data[0].strip9;
                    jarak_strip10.value = data.data[0].strip10;
                    jarak_strip11.value = data.data[0].strip11;
                    jarak_strip12.value = data.data[0].strip12;
                    jarak_strip13.value = data.data[0].strip13;
                    jarak_strip14.value = data.data[0].strip14;
                    jarak_strip15.value = data.data[0].strip15;
                    jarak_strip16.value = data.data[0].strip16;
                    jarak_strip17.value = data.data[0].strip17;
                    jarak_strip18.value = data.data[0].strip18;
                    jarak_strip19.value = data.data[0].strip19;
                    jarak_strip20.value = data.data[0].strip20;
                    jarak_strip21.value = data.data[0].strip21;
                    jarak_strip22.value = data.data[0].strip22;
                    jarak_strip23.value = data.data[0].strip23;
                    jarak_strip24.value = data.data[0].strip24;
                    tanggal.focus();

                    if (data.data[0].idType_mesin == 6) {
                        jarak_strip1.style.display = "block";
                        jarak_strip2.style.display = "block";
                        jarak_strip3.style.display = "block";
                        jarak_strip4.style.display = "block";
                        jarak_strip5.style.display = "block";
                        jarak_strip6.style.display = "block";
                        jarak_strip7.style.display = "block";
                        jarak_strip8.style.display = "block";
                        jarak_strip9.style.display = "block";
                        jarak_strip10.style.display = "block";
                        jarak_strip11.style.display = "block";
                        jarak_strip12.style.display = "block";
                        jarak_strip13.style.display = "block";
                        jarak_strip14.style.display = "block";
                        jarak_strip15.style.display = "block";
                        jarak_strip16.style.display = "block";
                        jarak_strip17.style.display = "block";
                        jarak_strip18.style.display = "block";
                        jarak_strip19.style.display = "block";
                        jarak_strip20.style.display = "block";
                        jarak_strip21.style.display = "block";
                        jarak_strip22.style.display = "block";
                        jarak_strip23.style.display = "block";
                        jarak_strip24.style.display = "block";

                        jarak_strip1Label.style.display = "block";
                        jarak_strip2Label.style.display = "block";
                        jarak_strip3Label.style.display = "block";
                        jarak_strip4Label.style.display = "block";
                        jarak_strip5Label.style.display = "block";
                        jarak_strip6Label.style.display = "block";
                        jarak_strip7Label.style.display = "block";
                        jarak_strip8Label.style.display = "block";
                        jarak_strip9Label.style.display = "block";
                        jarak_strip10Label.style.display = "block";
                        jarak_strip11Label.style.display = "block";
                        jarak_strip12Label.style.display = "block";
                        jarak_strip13Label.style.display = "block";
                        jarak_strip14Label.style.display = "block";
                        jarak_strip15Label.style.display = "block";
                        jarak_strip16Label.style.display = "block";
                        jarak_strip17Label.style.display = "block";
                        jarak_strip18Label.style.display = "block";
                        jarak_strip19Label.style.display = "block";
                        jarak_strip20Label.style.display = "block";
                        jarak_strip21Label.style.display = "block";
                        jarak_strip22Label.style.display = "block";
                        jarak_strip23Label.style.display = "block";
                        jarak_strip24Label.style.display = "block";

                        jarak_stripLabel.style.display = "block";
                    } else {
                        jarak_strip1.style.display = "block";
                        jarak_strip2.style.display = "block";
                        jarak_strip3.style.display = "block";
                        jarak_strip4.style.display = "block";
                        jarak_strip5.style.display = "block";
                        jarak_strip6.style.display = "block";
                        jarak_strip7.style.display = "block";
                        jarak_strip8.style.display = "block";
                        jarak_strip9.style.display = "block";
                        jarak_strip10.style.display = "block";
                        jarak_strip11.style.display = "block";

                        jarak_strip12.style.display = "none";
                        jarak_strip13.style.display = "none";
                        jarak_strip14.style.display = "none";
                        jarak_strip15.style.display = "none";
                        jarak_strip16.style.display = "none";
                        jarak_strip17.style.display = "none";
                        jarak_strip18.style.display = "none";
                        jarak_strip19.style.display = "none";
                        jarak_strip20.style.display = "none";
                        jarak_strip21.style.display = "none";
                        jarak_strip22.style.display = "none";
                        jarak_strip23.style.display = "none";
                        jarak_strip24.style.display = "none";

                        jarak_strip1Label.style.display = "block";
                        jarak_strip2Label.style.display = "block";
                        jarak_strip3Label.style.display = "block";
                        jarak_strip4Label.style.display = "block";
                        jarak_strip5Label.style.display = "block";
                        jarak_strip6Label.style.display = "block";
                        jarak_strip7Label.style.display = "block";
                        jarak_strip8Label.style.display = "block";
                        jarak_strip9Label.style.display = "block";
                        jarak_strip10Label.style.display = "block";
                        jarak_strip11Label.style.display = "block";

                        jarak_strip12Label.style.display = "none";
                        jarak_strip13Label.style.display = "none";
                        jarak_strip14Label.style.display = "none";
                        jarak_strip15Label.style.display = "none";
                        jarak_strip16Label.style.display = "none";
                        jarak_strip17Label.style.display = "none";
                        jarak_strip18Label.style.display = "none";
                        jarak_strip19Label.style.display = "none";
                        jarak_strip20Label.style.display = "none";
                        jarak_strip21Label.style.display = "none";
                        jarak_strip22Label.style.display = "none";
                        jarak_strip23Label.style.display = "none";
                        jarak_strip24Label.style.display = "none";

                        jarak_stripLabel.style.display = "block";
                    }

                    if (data.data[0].idType_mesin == 5) {
                        $("#" + slcSisiRoll.id).val(data.data[0].sisi_roll).trigger("change");
                        $("#" + slcSisiRoll.id).next(".select2-container").show();
                        sisi_rollLabel.style.display = "block";
                    } else {
                        $("#" + slcSisiRoll.id).val(null).trigger("change");
                        $("#" + slcSisiRoll.id).next(".select2-container").hide();
                        sisi_rollLabel.style.display = "none";
                    }
                } else {
                    $("#labelProses").text("Koreksi Data");
                    $("#btn_proses").text("Proses Update");
                    tanggal.value = data.data[0].tanggal;
                    // $("#" + slcTypeKain.id).val(data.data[0].type_kain).trigger("change");
                    $("#" + slcShift.id).val(data.data[0].shift).trigger("change");
                    jam_kerja_awal.value = ambilJam(data.data[0].jam_kerja_awal);
                    jam_kerja_akhir.value = ambilJam(data.data[0].jam_kerja_akhir);
                    $("#" + slcTypeMesin.id).val(data.data[0].idType_mesin).trigger("change");
                    fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), data.data[0].idNama_mesin);
                    counter_mesin.value = data.data[0].counter_mesin;
                    status_mesin.checked = (data.data[0].status_mesin === 'Y');
                    status_mesin.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_mati.value = ambilJam(data.data[0].jam_mati);
                    lbr_st.value = data.data[0].lbr_st;
                    rajutan_wa.value = data.data[0].rajutan_wa;
                    rajutan_we.value = data.data[0].rajutan_we;
                    denier.value = data.data[0].denier;
                    jml_bng_wa_st.value = data.data[0].jml_bng_wa_st;
                    jml_bng_wa_pm.value = data.data[0].jml_bng_wa_pm;
                    wrn.value = data.data[0].wrn;
                    lbr.value = data.data[0].lbr;
                    lpt.checked = (data.data[0].lpt === 'Y');
                    lpt.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = (data.data[0].gbs === 'Y');
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    wndr_gld.checked = (data.data[0].wndr_gld === 'Y');
                    wndr_gld.dispatchEvent(new Event('change', { bubbles: true }));
                    bulu.checked = (data.data[0].bulu === 'Y');
                    bulu.dispatchEvent(new Event('change', { bubbles: true }));
                    jam_bulu.value = ambilJam(data.data[0].jam_temuan);
                    tanda.checked = (data.data[0].tanda === 'Y');
                    tanda.dispatchEvent(new Event('change', { bubbles: true }));
                    ping_bergerigi.checked = (data.data[0].ping_bergerigi === 'Y');
                    ping_bergerigi.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_wa.checked = (data.data[0].sensor_wa === 'OK');
                    sensor_wa.dispatchEvent(new Event('change', { bubbles: true }));
                    sensor_we.checked = (data.data[0].sensor_we === 'OK');
                    sensor_we.dispatchEvent(new Event('change', { bubbles: true }));
                    stang_arm.checked = (data.data[0].stang_arm === 'OK');
                    stang_arm.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = data.data[0].keterangan;
                    lbr_reinf.value = data.data[0].lbr_gusset;
                    jarak_strip1.value = data.data[0].strip1;
                    jarak_strip2.value = data.data[0].strip2;
                    jarak_strip3.value = data.data[0].strip3;
                    jarak_strip4.value = data.data[0].strip4;
                    jarak_strip5.value = data.data[0].strip5;
                    jarak_strip6.value = data.data[0].strip6;
                    jarak_strip7.value = data.data[0].strip7;
                    jarak_strip8.value = data.data[0].strip8;
                    jarak_strip9.value = data.data[0].strip9;
                    jarak_strip10.value = data.data[0].strip10;
                    jarak_strip11.value = data.data[0].strip11;
                    jarak_strip12.value = data.data[0].strip12;
                    jarak_strip13.value = data.data[0].strip13;
                    jarak_strip14.value = data.data[0].strip14;
                    jarak_strip15.value = data.data[0].strip15;
                    jarak_strip16.value = data.data[0].strip16;
                    jarak_strip17.value = data.data[0].strip17;
                    jarak_strip18.value = data.data[0].strip18;
                    jarak_strip19.value = data.data[0].strip19;
                    jarak_strip20.value = data.data[0].strip20;
                    jarak_strip21.value = data.data[0].strip21;
                    jarak_strip22.value = data.data[0].strip22;
                    jarak_strip23.value = data.data[0].strip23;
                    jarak_strip24.value = data.data[0].strip24;
                    tanggal.focus();

                    if (data.data[0].idType_mesin == 5) {
                        $("#" + slcSisiRoll.id).val(data.data[0].sisi_roll).trigger("change");
                        $("#" + slcSisiRoll.id).next(".select2-container").show();
                        sisi_rollLabel.style.display = "block";
                    } else {
                        $("#" + slcSisiRoll.id).val(null).trigger("change");
                        $("#" + slcSisiRoll.id).next(".select2-container").hide();
                        sisi_rollLabel.style.display = "none";
                    }
                }

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
                    url: "CekKainCircular",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        idDetail: idDetail,
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
});