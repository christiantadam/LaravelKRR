jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let tgl_awalDetail = document.getElementById("tgl_awalDetail");
    let tgl_akhirDetail = document.getElementById("tgl_akhirDetail");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let btn_redisplayDetail = document.getElementById("btn_redisplayDetail");
    let jam_kerja_awal = document.getElementById("jam_kerja_awal");
    let jam_kerja_akhir = document.getElementById("jam_kerja_akhir");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let mrng = document.getElementById("mrng");
    let gbs = document.getElementById("gbs");
    let mlpt = document.getElementById("mlpt");
    let mlbr = document.getElementById("mlbr");
    let myst = document.getElementById("myst");
    let rajut_jelek = document.getElementById("rajut_jelek");
    let berbulu = document.getElementById("berbulu");
    let phi_besar = document.getElementById("phi_besar");
    let qc_pass = document.getElementById("qc_pass");
    let keterangan = document.getElementById("keterangan");
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

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    tgl_awalDetail.valueAsDate = new Date();
    tgl_akhirDetail.valueAsDate = new Date();
    // tgl_awalDetail.valueAsDate = new Date(2025, 11, 25);
    tanggal.valueAsDate = new Date();

    const slcShift = document.getElementById("shift");
    const slcTypeMesin = document.getElementById("type_mesin");
    const slcLokasi = document.getElementById("lokasi");
    btn_proses.disabled = true;

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
                    btn_redisplayDetail.click();
                    allowedType = ["1", "2"];
                    idDetail = null;
                    $("#labelProses").text("Input Data Gelondongan Circular");
                    $("#btn_proses").text("PROSES");
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    mrng.checked = false;
                    mrng.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    mlpt.checked = false;
                    mlpt.dispatchEvent(new Event('change', { bubbles: true }));
                    mlbr.checked = false;
                    mlbr.dispatchEvent(new Event('change', { bubbles: true }));
                    myst.checked = false;
                    myst.dispatchEvent(new Event('change', { bubbles: true }));
                    rajut_jelek.checked = false;
                    rajut_jelek.dispatchEvent(new Event('change', { bubbles: true }));
                    berbulu.checked = false;
                    berbulu.dispatchEvent(new Event('change', { bubbles: true }));
                    phi_besar.checked = false;
                    phi_besar.dispatchEvent(new Event('change', { bubbles: true }));
                    qc_pass.checked = false;
                    qc_pass.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    break;

                case "2":
                    // Lokasi 2 hanya type tertentu
                    btn_redisplay.click();
                    btn_redisplayDetail.click();
                    allowedType = ["3"];
                    idDetail = null;
                    $("#labelProses").text("Input Data Gelondongan Circular");
                    $("#btn_proses").text("PROSES");
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    mrng.checked = false;
                    mrng.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    mlpt.checked = false;
                    mlpt.dispatchEvent(new Event('change', { bubbles: true }));
                    mlbr.checked = false;
                    mlbr.dispatchEvent(new Event('change', { bubbles: true }));
                    myst.checked = false;
                    myst.dispatchEvent(new Event('change', { bubbles: true }));
                    rajut_jelek.checked = false;
                    rajut_jelek.dispatchEvent(new Event('change', { bubbles: true }));
                    berbulu.checked = false;
                    berbulu.dispatchEvent(new Event('change', { bubbles: true }));
                    phi_besar.checked = false;
                    phi_besar.dispatchEvent(new Event('change', { bubbles: true }));
                    qc_pass.checked = false;
                    qc_pass.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
                    break;

                case "3":
                    // Lokasi 3 hanya type tertentu
                    btn_redisplay.click();
                    btn_redisplayDetail.click();
                    allowedType = ["4", "5", "6"];
                    idDetail = null;
                    $("#labelProses").text("Input Data Gelondongan Circular");
                    $("#btn_proses").text("PROSES");
                    tanggal.valueAsDate = new Date();
                    $("#" + slcShift.id).val(null).trigger("change");
                    jam_kerja_awal.value = ambilJam(null);
                    jam_kerja_akhir.value = ambilJam(null);
                    $("#" + slcTypeMesin.id).val(null).trigger("change");
                    slcMesin.val(null).trigger("change");
                    mrng.checked = false;
                    mrng.dispatchEvent(new Event('change', { bubbles: true }));
                    gbs.checked = false;
                    gbs.dispatchEvent(new Event('change', { bubbles: true }));
                    mlpt.checked = false;
                    mlpt.dispatchEvent(new Event('change', { bubbles: true }));
                    mlbr.checked = false;
                    mlbr.dispatchEvent(new Event('change', { bubbles: true }));
                    myst.checked = false;
                    myst.dispatchEvent(new Event('change', { bubbles: true }));
                    rajut_jelek.checked = false;
                    rajut_jelek.dispatchEvent(new Event('change', { bubbles: true }));
                    berbulu.checked = false;
                    berbulu.dispatchEvent(new Event('change', { bubbles: true }));
                    phi_besar.checked = false;
                    phi_besar.dispatchEvent(new Event('change', { bubbles: true }));
                    qc_pass.checked = false;
                    qc_pass.dispatchEvent(new Event('change', { bubbles: true }));
                    keterangan.value = '';
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
                    if (labelProses.textContent == "Input Data Gelondongan Circular") {
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
            // if (labelProses.textContent == "Input Data") {
            //     setTimeout(() => {
            //         lbr_st.focus();
            //     }, 300);
            // }

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

    //#region Checkbox

    mrng.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    gbs.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    mlpt.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    mlbr.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    myst.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    rajut_jelek.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    berbulu.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    phi_besar.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    qc_pass.addEventListener('change', function () {
        const label = this.closest('.switch-lampu');
        label.querySelector('.text-on').classList.toggle('d-none', !this.checked);
        label.querySelector('.text-off').classList.toggle('d-none', this.checked);
    });

    //#region Event Button

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
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
        $.ajax({
            url: "GelondonganCircular",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (labelProses.textContent == "Input Data Gelondongan Circular") ? 1 : 2,
                tanggal: tanggal.value,
                shift: shift.value,
                jam_kerja_awal: jam_kerja_awalConvert,
                jam_kerja_akhir: jam_kerja_akhirConvert,
                idType_mesin: $("#" + slcTypeMesin.id).val(),
                idNama_mesin: slcMesin.val(),
                mrng: mrng.checked ? 'Y' : 'T',
                gbs: gbs.checked ? 'Y' : 'T',
                mlpt: mlpt.checked ? 'Y' : 'T',
                mlbr: mlbr.checked ? 'Y' : 'T',
                myst: myst.checked ? 'Y' : 'T',
                rajut_jelek: rajut_jelek.checked ? 'Y' : 'T',
                berbulu: berbulu.checked ? 'Y' : 'T',
                phi_besar: phi_besar.checked ? 'Y' : 'T',
                qc_pass: qc_pass.checked ? 'Y' : 'T',
                keterangan: keterangan.value,
                rowDataAtas: rowDataAtas,
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
                        console.log(result);
                        btn_redisplayDetail.click();
                        // $("#table_bawah").DataTable().ajax.reload();
                        // btn_batal.click();
                        if (rowDataAtas == null) {
                            btn_proses.disabled = true;
                        } else {
                            btn_proses.disabled = false;
                        }
                        $("#labelProses").text("Input Data Gelondongan Circular");
                        $("#btn_proses").text("PROSES");
                        tanggal.valueAsDate = new Date();
                        // $("#" + slcShift.id).val(null).trigger("change");
                        // jam_kerja_awal.value = ambilJam(null);
                        // jam_kerja_akhir.value = ambilJam(null);
                        // $("#" + slcTypeMesin.id).val(null).trigger("change");
                        slcMesin.val(null).trigger("change");
                        mrng.checked = false;
                        mrng.dispatchEvent(new Event('change', { bubbles: true }));
                        gbs.checked = false;
                        gbs.dispatchEvent(new Event('change', { bubbles: true }));
                        mlpt.checked = false;
                        mlpt.dispatchEvent(new Event('change', { bubbles: true }));
                        mlbr.checked = false;
                        mlbr.dispatchEvent(new Event('change', { bubbles: true }));
                        myst.checked = false;
                        myst.dispatchEvent(new Event('change', { bubbles: true }));
                        rajut_jelek.checked = false;
                        rajut_jelek.dispatchEvent(new Event('change', { bubbles: true }));
                        berbulu.checked = false;
                        berbulu.dispatchEvent(new Event('change', { bubbles: true }));
                        phi_besar.checked = false;
                        phi_besar.dispatchEvent(new Event('change', { bubbles: true }));
                        qc_pass.checked = false;
                        qc_pass.dispatchEvent(new Event('change', { bubbles: true }));
                        keterangan.value = '';
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

    btn_redisplayDetail.addEventListener("click", async function (event) {
        event.preventDefault();
        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "GelondonganCircular/getDataDetail",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalDetail: tgl_awalDetail.value,
                        tgl_akhirDetail: tgl_akhirDetail.value,
                        lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                { data: "idDetail" },
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
                { data: "qc_pass" },
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
            // createdRow: function (row, data, dataIndex) {
            //     $(row).css("font-family", "Arial");
            //     $(row).css("font-size", "14px");
            // },
            // headerCallback: function (thead, data, start, end, display) {
            //     $(thead).find("th")
            //         .css("font-family", "Arial")
            //         .css("font-size", "14px")
            //         .css("text-align", "center");
            // },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "550px",
            scrollCollapse: true,
        });
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "GelondonganCircular/getDataHeaderCKCL",
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
                    data: "idHeader",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
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
    rowDataAtas = null;
    $("#table_atas tbody").on("click", "tr", function () {
        // deselect
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            btn_batal.click();
            // tanggal.disabled = true;
            // jam_kerja_awal.disabled = true;
            // jam_kerja_akhir.disabled = true;
            // mrng.disabled = true;
            // gbs.disabled = true;
            // mlpt.disabled = true;
            // mlbr.disabled = true;
            // myst.disabled = true;
            // rajut_jelek.disabled = true;
            // berbulu.disabled = true;
            // phi_besar.disabled = true;
            // qc_pass.disabled = true;
            // $("#" + slcShift.id).prop("disabled", true);
            // $("#" + slcTypeMesin.id).prop("disabled", true);
            // slcMesin.prop("disabled", true);
            // keterangan.disabled = true;
            btn_proses.disabled = true;
            rowDataAtas = null;
            return;
        }

        // selected
        $("#table_atas tbody tr").removeClass("selected");
        $(this).addClass("selected");

        // Ambil data row
        var data = table_atas.row(this).data();
        rowDataAtas = data;
        console.log(data);
        // tanggal.disabled = false;
        // jam_kerja_awal.disabled = false;
        // jam_kerja_akhir.disabled = false;
        // mrng.disabled = false;
        // gbs.disabled = false;
        // mlpt.disabled = false;
        // mlbr.disabled = false;
        // myst.disabled = false;
        // rajut_jelek.disabled = false;
        // berbulu.disabled = false;
        // phi_besar.disabled = false;
        // qc_pass.disabled = false;
        // $("#" + slcShift.id).prop("disabled", false);
        // $("#" + slcTypeMesin.id).prop("disabled", false);
        // slcMesin.prop("disabled", false);
        // keterangan.disabled = false;
        btn_proses.disabled = false;
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(rowDataAtas);
        if (rowDataAtas == null) {
            btn_proses.disabled = true;
        } else {
            btn_proses.disabled = false;
        }
        idDetail = null;
        $("#labelProses").text("Input Data Gelondongan Circular");
        $("#btn_proses").text("PROSES");
        tanggal.valueAsDate = new Date();
        $("#" + slcShift.id).val(null).trigger("change");
        jam_kerja_awal.value = ambilJam(null);
        jam_kerja_akhir.value = ambilJam(null);
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        mrng.checked = false;
        mrng.dispatchEvent(new Event('change', { bubbles: true }));
        gbs.checked = false;
        gbs.dispatchEvent(new Event('change', { bubbles: true }));
        mlpt.checked = false;
        mlpt.dispatchEvent(new Event('change', { bubbles: true }));
        mlbr.checked = false;
        mlbr.dispatchEvent(new Event('change', { bubbles: true }));
        myst.checked = false;
        myst.dispatchEvent(new Event('change', { bubbles: true }));
        rajut_jelek.checked = false;
        rajut_jelek.dispatchEvent(new Event('change', { bubbles: true }));
        berbulu.checked = false;
        berbulu.dispatchEvent(new Event('change', { bubbles: true }));
        phi_besar.checked = false;
        phi_besar.dispatchEvent(new Event('change', { bubbles: true }));
        qc_pass.checked = false;
        qc_pass.dispatchEvent(new Event('change', { bubbles: true }));
        keterangan.value = '';
    });

    let idDetail = null;
    $('#table_bawah').on('click', '.btn-koreksi', function () {
        const id = $(this).data('id');
        console.log(id);
        idDetail = id;
        $.ajax({
            url: "GelondonganCircular/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                idDetail: id,
            },
            success: function (data) {
                console.log(data);
                $("#labelProses").text("Koreksi Data Gelondongan Circular");
                $("#btn_proses").text("Proses Update");
                tanggal.value = data.data[0].tanggal;
                $("#" + slcShift.id).val(data.data[0].shift).trigger("change");
                jam_kerja_awal.value = ambilJam(data.data[0].jam_kerja_awal);
                jam_kerja_akhir.value = ambilJam(data.data[0].jam_kerja_akhir);
                $("#" + slcTypeMesin.id).val(data.data[0].idType_mesin).trigger("change");
                fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), data.data[0].idNama_mesin);
                mrng.checked = (data.data[0].mrng === 'Y');
                mrng.dispatchEvent(new Event('change', { bubbles: true }));
                gbs.checked = (data.data[0].gbs === 'Y');
                gbs.dispatchEvent(new Event('change', { bubbles: true }));
                mlpt.checked = (data.data[0].mlpt === 'Y');
                mlpt.dispatchEvent(new Event('change', { bubbles: true }));
                mlbr.checked = (data.data[0].mlbr === 'Y');
                mlbr.dispatchEvent(new Event('change', { bubbles: true }));
                myst.checked = (data.data[0].myst === 'Y');
                myst.dispatchEvent(new Event('change', { bubbles: true }));
                rajut_jelek.checked = (data.data[0].rajut_jelek === 'Y');
                rajut_jelek.dispatchEvent(new Event('change', { bubbles: true }));
                berbulu.checked = (data.data[0].berbulu === 'Y');
                berbulu.dispatchEvent(new Event('change', { bubbles: true }));
                phi_besar.checked = (data.data[0].phi_besar === 'Y');
                phi_besar.dispatchEvent(new Event('change', { bubbles: true }));
                qc_pass.checked = (data.data[0].qc_pass === 'Y');
                qc_pass.dispatchEvent(new Event('change', { bubbles: true }));
                keterangan.value = data.data[0].keterangan;
                tanggal.focus();
                btn_proses.disabled = false;
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
                    url: "GelondonganCircular",
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
});