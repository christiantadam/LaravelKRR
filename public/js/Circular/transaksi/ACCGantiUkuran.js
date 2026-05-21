jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [1, 5], visible: false }],
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

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        checkedRows = [];
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ACCGantiUkuran/getData",
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
                    data: "id_pemeriksaan",
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
                        return `
                    <button class="btn btn-sm btn-primary btn-view" style="width: 60px;"data-id="${row.id_pemeriksaan}">
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
                $(thead)
                    .find("th")
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

    $("#table_atas").on("click", ".btn-view", function () {
        const id_pemeriksaan = $(this).data("id");
        console.log("ID Header:", id_pemeriksaan);

        $.ajax({
            url: "ACCGantiUkuran/getPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                id_pemeriksaan: id_pemeriksaan,
            },
            success: function (data) {
                console.log(data);
                document.getElementById("tanggal_print").innerHTML =
                    data.data[0].tanggal;
                document.getElementById("ukuran_asalPrint").innerHTML =
                    data.data[0].ukuran_asal;
                document.getElementById("ukuran_baruPrint").innerHTML =
                    data.data[0].ukuran_baru;
                document.getElementById("kode_mesinPrint").innerHTML =
                    data.data[0].Nama_mesin;
                document.getElementById("benang_waPrint").innerHTML =
                    data.data[0].benang_wa;
                document.getElementById("perawatan_guPrint").innerHTML =
                    data.data[0].perawatan_gu;
                document.getElementById("corak_print").innerHTML =
                    data.data[0].corak;
                document.getElementById("benang_wePrint").innerHTML =
                    data.data[0].benang_we;
                document.getElementById("awal_gantiPrint").innerHTML =
                    data.data[0].awal_ganti + " Jam";
                document.getElementById("berat_standartPrint").innerHTML =
                    data.data[0].berat_standart + " gr";
                document.getElementById("jumlah_warpPrint").innerHTML =
                    data.data[0].jumlah_warp;
                document.getElementById("akhir_gantiPrint").innerHTML =
                    data.data[0].akhir_ganti + " Jam";
                document.getElementById("berat_realitaPrint").innerHTML =
                    data.data[0].berat_realita + " gr";
                document.getElementById("rpm_print").innerHTML =
                    data.data[0].rpm;
                document.getElementById("waktu_print").innerHTML =
                    data.data[0].awal_ganti + " - " + data.data[0].akhir_ganti + " Jam";
                document.getElementById("ukuran_gr_benar").innerHTML =
                    data.data[0].ukuranGr_benar;
                document.getElementById("ukuran_gr_salah").innerHTML =
                    data.data[0].ukuranGr_salah;
                document.getElementById("setting_weft_benar").innerHTML =
                    data.data[0].settingWeft_benar;
                document.getElementById("setting_weft_salah").innerHTML =
                    data.data[0].settingWeft_salah;
                document.getElementById("posisi_gr_benar").innerHTML = data.data[0].posisi_gr === "Benar" ? "✓" : "";
                document.getElementById("posisi_gr_salah").innerHTML = data.data[0].posisi_gr === "Salah" ? "✓" : "";
                document.getElementById("sensor_weftEnd_benar").innerHTML = data.data[0].sensor_weft_end === "Benar" ? "✓" : "";
                document.getElementById("sensor_weftEnd_salah").innerHTML = data.data[0].sensor_weft_end === "Salah" ? "✓" : "";
                document.getElementById("posisi_sa_benar").innerHTML = data.data[0].posisi_sa === "Benar" ? "✓" : "";
                document.getElementById("posisi_sa_salah").innerHTML = data.data[0].posisi_sa === "Salah" ? "✓" : "";
                document.getElementById("posisi_expander_benar").innerHTML = data.data[0].posisi_expander === "Benar" ? "✓" : "";
                document.getElementById("posisi_expander_salah").innerHTML = data.data[0].posisi_expander === "Salah" ? "✓" : "";
                document.getElementById("roda_expander_benar").innerHTML = data.data[0].roda_expander === "Benar" ? "✓" : "";
                document.getElementById("roda_expander_salah").innerHTML = data.data[0].roda_expander === "Salah" ? "✓" : "";
                document.getElementById("tension_bs_benar").innerHTML = data.data[0].tension_bs === "Benar" ? "✓" : "";
                document.getElementById("tension_bs_salah").innerHTML = data.data[0].tension_bs === "Salah" ? "✓" : "";
                document.getElementById("kondisi_em_benar").innerHTML = data.data[0].kondisi_em === "Benar" ? "✓" : "";
                document.getElementById("kondisi_em_salah").innerHTML = data.data[0].kondisi_em === "Salah" ? "✓" : "";
                document.getElementById("kondisi_jog_benar").innerHTML = data.data[0].kondisi_jog === "Benar" ? "✓" : "";
                document.getElementById("kondisi_jog_salah").innerHTML = data.data[0].kondisi_jog === "Salah" ? "✓" : "";
                document.getElementById("kondisi_ulr_benar").innerHTML = data.data[0].kondisi_ulr === "Benar" ? "✓" : "";
                document.getElementById("kondisi_ulr_salah").innerHTML = data.data[0].kondisi_ulr === "Salah" ? "✓" : "";
                document.getElementById("tension_winder_benar").innerHTML = data.data[0].tension_winder === "Benar" ? "✓" : "";
                document.getElementById("tension_winder_salah").innerHTML = data.data[0].tension_winder === "Salah" ? "✓" : "";
                document.getElementById("kondisi_dl_benar").innerHTML = data.data[0].kondisi_dl === "Benar" ? "✓" : "";
                document.getElementById("kondisi_dl_salah").innerHTML = data.data[0].kondisi_dl === "Salah" ? "✓" : "";
                document.getElementById("jalur_br_benar").innerHTML = data.data[0].jalurBenang_rak === "Benar" ? "✓" : "";
                document.getElementById("jalur_br_salah").innerHTML = data.data[0].jalurBenang_rak === "Salah" ? "✓" : "";
                document.getElementById("kondisi_sb_benar").innerHTML = data.data[0].kondisi_sb === "Benar" ? "✓" : "";
                document.getElementById("kondisi_sb_salah").innerHTML = data.data[0].kondisi_sb === "Salah" ? "✓" : "";
                document.getElementById("jalur_dl_benar").innerHTML = data.data[0].jalurBenang_dl === "Benar" ? "✓" : "";
                document.getElementById("jalur_dl_salah").innerHTML = data.data[0].jalurBenang_dl === "Salah" ? "✓" : "";
                document.getElementById("kondisi_ot_benar").innerHTML = data.data[0].kondisi_ot === "Benar" ? "✓" : "";
                document.getElementById("kondisi_ot_salah").innerHTML = data.data[0].kondisi_ot === "Salah" ? "✓" : "";
                document.getElementById("jalur_wh_benar").innerHTML = data.data[0].jalurBenang_wh === "Benar" ? "✓" : "";
                document.getElementById("jalur_wh_salah").innerHTML = data.data[0].jalurBenang_wh === "Salah" ? "✓" : "";
                document.getElementById("sensor_warp_benar").innerHTML = data.data[0].sensor_warp === "Benar" ? "✓" : "";
                document.getElementById("sensor_warp_salah").innerHTML = data.data[0].sensor_warp === "Salah" ? "✓" : "";
                document.getElementById("kondisi_dropper_benar").innerHTML = data.data[0].kondisi_dropper === "Benar" ? "✓" : "";
                document.getElementById("kondisi_dropper_salah").innerHTML = data.data[0].kondisi_dropper === "Salah" ? "✓" : "";
                document.getElementById("sensor_weft_benar").innerHTML = data.data[0].sensor_weft === "Benar" ? "✓" : "";
                document.getElementById("sensor_weft_salah").innerHTML = data.data[0].sensor_weft === "Salah" ? "✓" : "";
                document.getElementById("corak_js_benar").innerHTML = data.data[0].corak_js === "Benar" ? "✓" : "";
                document.getElementById("corak_js_salah").innerHTML = data.data[0].corak_js === "Salah" ? "✓" : "";
                document.getElementById("kondisi_pr_benar").innerHTML = data.data[0].kondisi_pr === "Benar" ? "✓" : "";
                document.getElementById("kondisi_pr_salah").innerHTML = data.data[0].kondisi_pr === "Salah" ? "✓" : "";
                document.getElementById("hasil_belahan_benar").innerHTML = data.data[0].hasil_belahan === "Benar" ? "✓" : "";
                document.getElementById("hasil_belahan_salah").innerHTML = data.data[0].hasil_belahan === "Salah" ? "✓" : "";
                document.getElementById("corak_js_benar").innerHTML = data.data[0].corak_js === "Benar" ? "✓" : "";
                document.getElementById("corak_js_salah").innerHTML = data.data[0].corak_js === "Salah" ? "✓" : "";
                document.getElementById("setting_roll_wtc_benar").innerHTML = data.data[0].setting_roll_wtc === "Sudah" ? "✓" : "";
                document.getElementById("setting_roll_wtc_salah").innerHTML = data.data[0].setting_roll_wtc === "Belum" ? "✓" : "";
                document.getElementById("keteranganPrint").innerHTML =
                    data.data[0].keterangan;
                document.getElementById("namaPemeriksa").innerHTML =
                    data.data[0].NamaUser;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        }).then(function () {
            let modal = new bootstrap.Modal(
                document.getElementById("modalGantiUkuran"),
                {
                    backdrop: false
                }
            );
            modal.show();
        });
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        $.ajax({
            url: "ACCGantiUkuran",
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
                    (row) => row.id_pemeriksaan !== rowData.id_pemeriksaan,
                ); // Remove unchecked row data
            }
            console.log(checkedRows);
        },
    );
});