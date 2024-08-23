$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    // let table_atas = $("#table_atas").DataTable();
    // let table_bawah = $("#table_bawah").DataTable();
    let table_bawah = $("#table_bawah").DataTable({});
    let radiogrup_penagihan = document.getElementById("radiogrup_penagihan");
    let radiogrup_nopenagihan = document.getElementById(
        "radiogrup_nopenagihan"
    );
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_batal = document.getElementById("btn_batal");
    let btn_okbkk = document.getElementById("btn_okbkk");
    let btn_group = document.getElementById("btn_group");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_koreksidetail = document.getElementById("btn_koreksidetail");
    let btn_hapusdetail = document.getElementById("btn_hapusdetail");
    let tutup_modal = document.getElementById("tutup_modal");
    let close_modal = document.getElementById("close_modal");
    let id_bayar = document.getElementById("id_bayar");
    let id_detail = document.getElementById("id_detail");
    let id_TT = document.getElementById("id_TT");
    let rincinan_bayar = document.getElementById("rincinan_bayar");
    let nilairincian_rp = document.getElementById("nilairincian_rp");
    let total = document.getElementById("total");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let bkk = document.getElementById("bkk");
    let nilaiBkk = document.getElementById("nilaiBkk");
    let nilaiPembulatan = document.getElementById("nilaiPembulatan");
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");
    let tabletampilBKK = $("#tabletampilBKK").DataTable();
    let rowDataPertama;
    let rowDataBawah;
    let rowDataKedua;
    let proses;

    btn_isi.disabled = true;
    btn_hapusdetail.style.display = "none";
    btn_proses.disabled = true;
    btn_koreksidetail.style.display = "none";
    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;
    total.style.fontWeight = "bold";

    let table_kedua = $("#table_kedua").DataTable({});
    $("#table_kedua").parents("div.dataTables_wrapper").first().hide();

    radiogrup_penagihan.addEventListener("click", function (event) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_group.style.display = "none";
        btn_tampil.style.display = "none";
        TT = true;
        document.getElementById("judul_tabel").innerText = "Data Penagihan";
        $("#table_atas").parents("div.dataTables_wrapper").first().hide();
        table_kedua = $("#table_kedua").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR1/getPenagihan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                    });
                },
            },
            columns: [
                {
                    data: "Waktu_Penagihan",
                    render: function (data, type, row) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_Penagihan" },
                { data: "NM_SUP" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Penagihan" },
                { data: "Lunas" },
                { data: "Status_PPN" },
            ],
            // columnDefs: [{ targets: [6], visible: false }],
        });
        $("#table_kedua").parents("div.dataTables_wrapper").first().show();
        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Menampilkan data penagihan!",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
            } else {
            }
        });
    });

    radiogrup_nopenagihan.addEventListener("click", function (event) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        TT = false;
    });

    let = table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceBKKKRR1/getDataAwalAtas",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Rincian" },
            { data: "Id_Supplier" },
        ],
        columnDefs: [{ targets: [5], visible: false }],
    });

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();
                console.log(rowDataPertama, this, table_atas);
            } else {
                rowDataPertama = null;
            }
        }
    );

    $("#table_kedua tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_kedua tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_kedua.row($(this).closest("tr")).data();
                console.log(rowDataKedua, this, table_kedua);
            } else {
                rowDataKedua = null;
            }
        }
    );

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataKedua == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            id_TT.value = rowDataKedua.Id_Penagihan;
            rincinan_bayar.value = rowDataKedua.Id_Penagihan;
            nilairincian_rp.value = rowDataKedua.Nilai_Penagihan;
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_koreksi.disabled = true;
            btn_hapus.disabled = true;
            btn_koreksi.style.display = "none";
            btn_koreksidetail.style.display = "block";
            proses = 2;
            id_bayar.value = rowDataPertama.Id_Pembayaran;
            id_TT.value = rowDataPertama.Id_Penagihan;
            total.value = rowDataPertama.Nilai_Rincian;

            if ($.fn.DataTable.isDataTable("#table_bawah")) {
                $("#table_bawah").DataTable().destroy();
            }

            table_bawah = $("#table_bawah").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: "MaintenanceBKKKRR1/getDetailPembayaran",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            id_bayar: id_bayar.value,
                        });
                    },
                },
                columns: [
                    {
                        data: "Id_Detail_Bayar",
                        render: function (data) {
                            return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    { data: "Rincian_Bayar" },
                    { data: "Nilai_Rincian" },
                    { data: "Kode_Perkiraan" },
                ],
                // columnDefs: [{ targets: [1, 2], visible: false }],
            });
        }
    });

    btn_koreksidetail.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataBawah == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data detail terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_koreksidetail.disabled = true;
            btn_proses.disabled = false;
            proses = 2;
            id_detail.value = rowDataBawah.Id_Detail_Bayar;
            rincinan_bayar.value = rowDataBawah.Rincian_Bayar;
            nilairincian_rp.value = rowDataBawah.Nilai_Rincian;
            kode_kira.value = rowDataBawah.Kode_Perkiraan;
        }
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_koreksi.disabled = true;
            btn_hapus.disabled = true;
            btn_hapus.style.display = "none";
            btn_hapusdetail.style.display = "block";
            proses = 3;
            id_bayar.value = rowDataPertama.Id_Pembayaran;
            id_TT.value = rowDataPertama.Id_Penagihan;
            total.value = rowDataPertama.Nilai_Rincian;

            if ($.fn.DataTable.isDataTable("#table_bawah")) {
                $("#table_bawah").DataTable().destroy();
            }

            table_bawah = $("#table_bawah").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: "MaintenanceBKKKRR1/getDetailPembayaran",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            id_bayar: id_bayar.value,
                        });
                    },
                },
                columns: [
                    {
                        data: "Id_Detail_Bayar",
                        render: function (data) {
                            return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    { data: "Rincian_Bayar" },
                    { data: "Nilai_Rincian" },
                    { data: "Kode_Perkiraan" },
                ],
                // columnDefs: [{ targets: [1, 2], visible: false }],
            });
        }
    });

    btn_hapusdetail.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataBawah == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data detail terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_hapusdetail.disabled = true;
            btn_proses.disabled = false;
            proses = 3;
            id_detail.value = rowDataBawah.Id_Detail_Bayar;
            rincinan_bayar.value = rowDataBawah.Rincian_Bayar;
            nilairincian_rp.value = rowDataBawah.Nilai_Rincian;
            kode_kira.value = rowDataBawah.Kode_Perkiraan;
        }
    });

    $("#table_bawah tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_bawah tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataBawah = table_bawah.row($(this).closest("tr")).data();
                console.log(rowDataBawah, this, table_bawah);
            } else {
                rowDataBawah = null;
            }
        }
    );

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        myModal.show();
    });

    close_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        if ($.fn.DataTable.isDataTable("#tabletampilBKK")) {
            $("#tabletampilBKK").DataTable().destroy();
        }
        bkk.value = "";
        nilaiBkk.value = "";
        nilaiPembulatan.value = "";
    });

    tutup_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        if ($.fn.DataTable.isDataTable("#tabletampilBKK")) {
            $("#tabletampilBKK").DataTable().destroy();
        }
        bkk.value = "";
        nilaiBkk.value = "";
        nilaiPembulatan.value = "";
    });

    btn_kodeperkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR1/getKira",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_kira.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    keterangan_kira.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_okbkk.addEventListener("click", function (event) {
        event.preventDefault();
        tabletampilBKK = $("#tabletampilBKK").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR1/getTampilBKK",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        month: month.value,
                        year: year.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_BKK",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "NilaiBKK" },
                { data: "NM_SUP" },
                // { data: "Id_MataUang" },
                // { data: "Id_Jenis_Bayar" },
            ],
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });
});
