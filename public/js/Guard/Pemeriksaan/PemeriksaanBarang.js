jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let nopol = document.getElementById("nopol");
    let nopol_input = document.getElementById("nopol_input");
    let jam_muat_awal = document.getElementById("jam_muat_awal");
    let jam_muat_akhir = document.getElementById("jam_muat_akhir");
    let tujuan_kirim = document.getElementById("tujuan_kirim");
    let instansi = document.getElementById("instansi");
    let sopir = document.getElementById("sopir");
    let keterangan = document.getElementById("keterangan");
    let ttd_base64 = document.getElementById("ttd_base64");
    let ttd_preview = document.getElementById("ttd_preview");
    let type_barang = document.getElementById("type_barang");
    let jam_barang = document.getElementById("jam_barang");
    let item = document.getElementById("item");
    let satuan = document.getElementById("satuan");
    let btn_add = document.getElementById("btn_add");
    let btn_update = document.getElementById("btn_update");
    let btn_delete = document.getElementById("btn_delete");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let labelRedisplay = document.getElementById("labelRedisplay");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let ttdModal = document.getElementById("ttdModal");
    let ttdCanvas = document.getElementById("ttdCanvas");
    let btn_clearTTD = document.getElementById("btn_clearTTD");
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

    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

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

    const slcSatuan = document.getElementById("satuan");
    const slcNopol = document.getElementById("nopol");
    const slcTypeBarang = document.getElementById("type_barang");
    tanggal.valueAsDate = new Date();
    tgl_awal.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    tgl_akhir.valueAsDate = new Date();
    nopol_input.disabled = false;
    // btn_redisplay.focus();

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

    //#region Select2

    let nama_satuan = null;
    $("#" + slcSatuan.id).select2({ placeholder: "-- Pilih Satuan --", allowClear: true, });
    $("#" + slcSatuan.id).on("change", function () {
        let text = $(this).find(":selected").text();

        if (!text || text.indexOf("|") === -1) {
            nama_satuan = null;
            return;
        }

        nama_satuan = text.split("|")[1].trim();
    });

    let nama_typeBarang = null;
    $("#" + slcTypeBarang.id).select2({ placeholder: "-- Pilih Type Barang --", allowClear: true, });
    $("#" + slcTypeBarang.id).on("change", function () {
        let text = $(this).find(":selected").text();

        if (!text || text.indexOf("|") === -1) {
            nama_typeBarang = null;
            return;
        }

        nama_typeBarang = text.split("|")[1].trim();
    });

    $("#" + slcNopol.id).select2({
        placeholder: "-- Pilih Nopol --",
        allowClear: true,
        width: "100%"
    });
    // saat select2 dipilih
    $("#" + slcNopol.id).on("select2:select", function () {
        nopol_input.disabled = true;
        nopol_input.value = "";
    });
    // saat select2 di-clear (klik X)
    $("#" + slcNopol.id).on("select2:clear", function (e) {
        e.preventDefault();
        e.stopPropagation();

        setTimeout(() => {
            $("#" + slcNopol.id).select2("close");
            nopol_input.disabled = false;
            nopol_input.focus();
        }, 0);
    });

    //#region Event Listener

    nopol_input.addEventListener("input", function () {
        let value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

        let hurufDepan = value.match(/^[A-Z]{1,2}/);
        let sisa = value.replace(/^[A-Z]{1,2}/, "");

        let angka = sisa.match(/^\d{1,4}/);
        let hurufBelakang = sisa.replace(/^\d{1,4}/, "").match(/^[A-Z]{0,3}/);

        let result = [];

        if (hurufDepan) result.push(hurufDepan[0]);
        if (angka) result.push(angka[0]);
        if (hurufBelakang && hurufBelakang[0]) result.push(hurufBelakang[0]);

        this.value = result.join(" ");
    });

    sopir.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    });

    let tableData = [];

    btn_add.addEventListener("click", async function (event) {
        event.preventDefault();
        if ($("#" + slcTypeBarang.id).val() === "" || $("#" + slcTypeBarang.id).val() === null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih tipe barangnya terlebih dahulu!",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }
        const newRow = {
            id_detail: "",
            kode_tipeBarang: $("#" + slcTypeBarang.id).val(),
            nama_typeBarang: nama_typeBarang,
            jam_barang: jam_barang.value,
            item: item.value,
            kode_satuan: $("#" + slcSatuan.id).val(),
            nama_satuan: nama_satuan,
        };

        tableData.push(newRow);
        console.log(tableData);

        if ($.fn.DataTable.isDataTable("#table_atas")) {
            var table_atas = $("#table_atas").DataTable();

            table_atas.row
                .add([
                    newRow.id_detail,
                    newRow.kode_tipeBarang,
                    newRow.nama_typeBarang,
                    newRow.jam_barang,
                    newRow.item,
                    newRow.kode_satuan,
                    newRow.nama_satuan,
                ])
                .draw();
        }
    });

    btn_update.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin diedit terlebih dahulu!",
            });
            return;
        }

        // ambil data row lama
        const oldData = table_atas.row(selectedRow).data();

        if (labelProses.textContent == "Input Data") {

            const updatedRow = [
                "", // id_detail (BARU)
                $("#" + slcTypeBarang.id).val(),
                nama_typeBarang,
                jam_barang.value,
                item.value,
                $("#" + slcSatuan.id).val(),
                nama_satuan,
            ];

            table_atas
                .row(selectedRow)
                .data(updatedRow)
                .draw(false);

        } else {
            const updatedRow = [
                oldData[0], // id_detail lama
                $("#" + slcTypeBarang.id).val(),
                nama_typeBarang,
                jam_barang.value,
                item.value,
                $("#" + slcSatuan.id).val(),
                nama_satuan,
            ];

            table_atas
                .row(selectedRow)
                .data(updatedRow)
                .draw(false);
        }

        // reset selection
        $(selectedRow).removeClass("selected");
        selectedRow = null;
    });

    btn_delete.addEventListener("click", function (event) {
        event.preventDefault();
        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin dihapus terlebih dahulu!",
            });
            return;
        }
        console.log(labelProses.textContent);

        const oldData = table_atas.row(selectedRow).data();
        if (labelProses.textContent == "Input Data") {
            let table_atas = $("#table_atas").DataTable();

            table_atas
                .row(selectedRow)
                .remove()
                .draw();

            // Reset selectedRow setelah hapus
            selectedRow = null;
        } else {
            Swal.fire({
                title: 'Apakah anda yakin ingin menghapus data detail?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "PemeriksaanBarang",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: 4,
                            idDetail: oldData[0],
                        },
                        success: function (response) {
                            console.log(response);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    table_atas
                                        .row(selectedRow)
                                        .remove()
                                        .draw();

                                    // Reset selectedRow setelah hapus
                                    selectedRow = null;
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
                        },
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                }
            });
        }
    });

    let selectedRow = null;
    $("#table_atas tbody").on("click", "tr", function () {
        // Hapus highlight sebelumnya
        $("#table_atas tbody tr").removeClass("selected");

        // Tambah highlight ke row ini
        $(this).addClass("selected");

        // Simpan reference row DataTable
        selectedRow = this;

        // Ambil data (opsional)
        let table_atas = $("#table_atas").DataTable();
        let data = table_atas.row(this).data();
        console.log(data);

        $("#" + slcTypeBarang.id).val(data[1]).trigger("change");
        jam_barang.value = data[3];
        item.value = data[4];
        $("#" + slcSatuan.id).val(data[5]).trigger("change");
    });

    btn_clearTTD.addEventListener("click", function (event) {
        event.preventDefault();
        ttd_base64.value = "";
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        const allRowsDataAtas = table_atas.rows().data().toArray();
        let jam_muat_awalConvert = null;
        if (jam_muat_awal.value.trim() !== "") {
            jam_muat_awalConvert = convertToSQLDatetime(tanggal, jam_muat_awal.value);
            if (jam_muat_awalConvert === null) return;
        }
        let jam_muat_akhirConvert = null;
        if (jam_muat_akhir.value.trim() !== "") {
            jam_muat_akhirConvert = convertToSQLDatetime(tanggal, jam_muat_akhir.value);
            if (jam_muat_akhirConvert === null) return;
        }

        if (tanggal.value == "" || jam_muat_awal.value == "" || jam_muat_akhir.value == "" || $("#" + slcNopol.id).val() == "" && nopol_input.value == "" || $("#" + slcNopol.id).val() == null && nopol_input.value == "") {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Tanggal, Nopol dan jam muat tidak boleh kosong!",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }

        $.ajax({
            url: "PemeriksaanBarang",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (labelProses.textContent == "Koreksi Data") ? 2 : 1,
                tanggal: tanggal.value,
                nopol: ($("#" + slcNopol.id).val() == '' || $("#" + slcNopol.id).val() == null) ? nopol_input.value : $("#" + slcNopol.id).val(),
                jam_muat_awal: jam_muat_awalConvert,
                jam_muat_akhir: jam_muat_akhirConvert,
                tujuan_kirim: tujuan_kirim.value,
                instansi: instansi.value,
                sopir: sopir.value,
                keterangan: keterangan.value,
                allRowsDataAtas: allRowsDataAtas,
                idHeader: idHeader,
                ttd_base64: ttd_base64.value,
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
                        btn_batal.click();
                        btn_redisplay.click();
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
        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "PemeriksaanBarang/getDataDetail",
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
                    }
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
                { data: "sopir" },
                { data: "NamaUser_Input" },
                { data: "NamaUser_Acc" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {

                        // jika sudah ada user acc → sembunyikan tombol
                        if (row.NamaUser_Acc !== null && row.NamaUser_Acc !== "") {
                            return ""; // tidak tampil apa-apa
                        }

                        // jika belum acc → tampilkan tombol
                        return `
                            <button class="btn btn-sm btn-warning btn-koreksi" style="width: 60px;" data-id="${row.idHeader}">
                                <i class="fa fa-edit"></i> Koreksi
                            </button>
                            <button class="btn btn-sm btn-danger btn-delete" style="width: 60px;" data-id="${row.idHeader}">
                                <i class="fa fa-trash"></i> Delete
                            </button>
                        `;
                    }
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

    // btn_print.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     window.print();
    // });

    $("#table_bawah").on("click", ".link-idheader", function () {
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

                if (data.header.NamaUser && data.header.NamaUser.trim() !== "") {
                    if (data.header.fotoTtdAcc && data.header.fotoTtdAcc !== "") {

                        let ttd = data.header.fotoTtdAcc;

                        // pastikan ada prefix base64
                        if (!ttd.startsWith("data:image")) {
                            ttd = "data:image/png;base64," + ttd;
                        }

                        /* ====== TAMPIL KE IMG ====== */
                        $("#ttd_gudang")
                            .attr("src", ttd)
                            .show();
                    } else {
                        $("#ttd_gudang")
                            .attr("src", "")
                            .show();
                    }
                    document.getElementById("ttnGudang").innerHTML = "Tanda Tangan & Nama Jelas";
                    document.getElementById("gdg").innerHTML = "Gudang";
                    document.getElementById("namaGudangP").innerHTML =
                        data.header.NamaUser;

                } else {
                    // document.getElementById("ttnGudang").style.visibility = "hidden";
                    // document.getElementById("gdg").style.visibility = "hidden";
                    // document.getElementById("namaGudangP").style.visibility = "hidden";
                    document.getElementById("ttnGudang").innerHTML = "";
                    document.getElementById("gdg").innerHTML = "";
                    document.getElementById("namaGudangP").innerHTML = "";
                    $("#ttd_gudang")
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

    let idHeader = null;
    $('#table_bawah').on('click', '.btn-koreksi', function () {
        const id = $(this).data('id');
        console.log(id);
        idHeader = id;
        $.ajax({
            url: "PemeriksaanBarang/getDataKoreksiHeader",
            type: "GET",
            data: {
                _token: csrfToken,
                idHeader: id,
            },
            success: function (data) {
                console.log(data);
                $("#labelProses").text("Koreksi Data");
                $("#btn_proses").text("Proses Update");
                tanggal.value = data.data[0].tanggal_raw;
                const nopol = data.data[0].nopol;
                if ($("#" + slcNopol.id + " option[value='" + nopol + "']").length > 0) {
                    $("#" + slcNopol.id).val(nopol).trigger("change");
                    nopol_input.disabled = true;
                    nopol_input.value = "";
                } else {
                    $("#" + slcNopol.id).val(null).trigger("change");
                    nopol_input.value = nopol;
                }
                jam_muat_awal.value = ambilJam(data.data[0].jam_muat_awal);
                jam_muat_akhir.value = ambilJam(data.data[0].jam_muat_akhir);
                tujuan_kirim.value = data.data[0].tujuan_kirim;
                instansi.value = data.data[0].instansi;
                sopir.value = data.data[0].sopir;
                keterangan.value = data.data[0].keterangan;
                if (data.data[0].ttd_base64 && data.data[0].ttd_base64 !== "") {

                    let ttd = data.data[0].ttd_base64;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    // simpan ke hidden input (buat submit ulang)
                    ttd_base64.value = ttd;

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_preview")
                        .attr("src", ttd)
                        .show();

                    /* ====== TAMPIL KE CANVAS ====== */
                    const canvas = document.getElementById("ttdCanvas");
                    const ctx = canvas.getContext("2d");

                    // clear canvas dulu
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const img = new Image();
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    };
                    img.src = ttd;

                } else {
                    // tidak ada TTD
                    ttd_base64.value = "";
                    $("#ttd_preview").hide();

                    const canvas = document.getElementById("ttdCanvas");
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                tanggal.focus();
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        $.ajax({
            url: "PemeriksaanBarang/getDataKoreksiDetail",
            type: "GET",
            data: {
                _token: csrfToken,
                idHeader: id,
            },
            success: function (data) {
                console.log(data);
                if (!$.fn.DataTable.isDataTable("#table_atas")) {
                    return;
                }

                const table_atas = $("#table_atas").DataTable();

                // clear dulu kalau koreksi
                table_atas.clear();

                data.data.forEach(function (row) {

                    const newRow = {
                        id_detail: row.idDetail,
                        kode_tipeBarang: row.type_barang,
                        nama_typeBarang: row.nama_typeBarang,
                        jam_barang: ambilJam(row.jam),
                        item: formatAngka(row.item),
                        kode_satuan: row.satuan,
                        nama_satuan: row.Nama_satuan,
                    };

                    // simpan ke array lokal (kalau kamu pakai tableData)
                    tableData.push(newRow);

                    // add ke DataTable
                    table_atas.row.add([
                        newRow.id_detail,
                        newRow.kode_tipeBarang,
                        newRow.nama_typeBarang,
                        newRow.jam_barang,
                        newRow.item,
                        newRow.kode_satuan,
                        newRow.nama_satuan,
                    ]);
                });

                table_atas.draw();
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
        idHeader = id;
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
                    url: "PemeriksaanBarang",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        idHeader: idHeader,
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
        $("#labelProses").text("Input Data");
        $("#btn_proses").text("PROSES");
        idDetail = null;
        tanggal.valueAsDate = new Date();
        $("#" + slcNopol.id).val(null).trigger("change");
        nopol_input.value = "";
        jam_muat_awal.value = ambilJam(null);
        jam_muat_akhir.value = ambilJam(null);
        tujuan_kirim.value = "";
        instansi.value = "";
        sopir.value = "";
        keterangan.value = "";
        btn_clearTTD.click();
        $("#" + slcTypeBarang.id).val(null).trigger("change");
        jam_barang.value = ambilJam(null);
        item.value = "";
        $("#" + slcSatuan.id).val(null).trigger("change");
        if ($.fn.DataTable.isDataTable("#table_atas")) {
            $("#table_atas").DataTable().clear().draw();
        }
        // tidak ada TTD
        ttd_base64.value = "";
        $("#ttd_preview").hide();

        const canvas = document.getElementById("ttdCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
