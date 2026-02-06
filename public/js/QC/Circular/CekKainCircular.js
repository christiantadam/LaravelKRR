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
                    btn_redisplay.click();
                    // btn_batal.click();
                    lbr_st.type = "number";
                    $("#labelRedisplay").text("Tanggal Cek Kain Layar/Flat");
                    btn_laporan.style.display = "none"
                    jarak_stripLabel.style.display = "block";
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
                    btn_redisplay.click();
                    // btn_batal.click();
                    lbr_st.type = "text";
                    $("#labelRedisplay").text("Tanggal Cek Kain Gusset");
                    btn_laporan.style.display = "none"
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
                    counter_mesin.focus();
                }, 300);
            }

            // if (StKonversi === 1 || StKonversi === 4) {
            //     fetchDataKelompok(
            //         "/getKelompokSelect/" + slcMesin.val()
            //     );
            // }
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
                lbr_reinf: lbr_reinf.value,
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
                    tanggal.focus();

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
                    tanggal.focus();

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
                    lbr_reinf.value = '';
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
                    tanggal.focus();
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