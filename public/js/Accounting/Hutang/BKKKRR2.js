$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radio_1 = document.getElementById("radio_1");
    let radio_2 = document.getElementById("radio_2");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_okbkk = document.getElementById("btn_okbkk");
    let btn_cetakbkk = document.getElementById("btn_cetakbkk");
    let btn_kodePerkiraan = document.getElementById("btn_kodePerkiraan");
    let btn_noBg = document.getElementById("btn_noBg");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let bkk = document.getElementById("bkk");
    let nilaiBkk = document.getElementById("nilaiBkk");
    let nilaiPembulatan = document.getElementById("nilaiPembulatan");
    let jatuhTempo = document.getElementById("jatuhTempo");
    let bank = document.getElementById("bank");
    let jnsByr = document.getElementById("jnsByr");
    let id_jnsByr = document.getElementById("id_jnsByr");
    let noJnsByr = document.getElementById("noJnsByr");
    let jumlahJnsByr = document.getElementById("jumlahJnsByr");
    let statusCetak = document.getElementById("statusCetak");
    let bank_pembayaran = document.getElementById("bank_pembayaran");
    let jnsByr_pembayaran = document.getElementById("jnsByr_pembayaran");
    let noBg = document.getElementById("noBg");
    let rincian = document.getElementById("rincian");
    let nilaiBayar = document.getElementById("nilaiBayar");
    let nilaiRincian = document.getElementById("nilaiRincian");
    let kdPerkiraan1 = document.getElementById("kdPerkiraan1");
    let kdPerkiraan2 = document.getElementById("kdPerkiraan2");
    let tablekanan = $("#tablekanan").DataTable();
    let tablekiri = $("#tablekiri").DataTable();
    let tabletampilBKK = $("#tabletampilBKK").DataTable();
    let bg;
    let rowData;
    let rowDataBKK;

    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;
    btn_proses.disabled = true;
    jatuhTempo.valueAsDate = new Date();

    radio_1.addEventListener("click", function (event) {
        bg = true;
    });

    radio_2.addEventListener("click", function (event) {
        bg = false;
    });

    let tableatas = $("#tableatas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceBKKKRR2/getPengajuan",
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
            { data: "Id_Bank" },
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
            { data: "IdMataUang_PO" },
            { data: "Id_Jenis_Bayar" },
            { data: "Id_MataUang" },
            { data: "Id_Supplier" },
            { data: "Jenis_Bank" },
        ],
        columnDefs: [{ targets: [10, 11, 12, 13], visible: false }],
    });

    $("#tablepertama tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tableatas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowData = tableatas.row($(this).closest("tr")).data();
                console.log(rowData, this, tableatas);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        }
    );

    $("#tableatas tbody").off("click", "tr");
    $("#tableatas tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tableatas tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const tableatas = $("#tableatas").DataTable();
        let selectedRows = tableatas.rows(".selected").data().toArray();
        id_pembayaran.value = selectedRows[0].Id_Pembayaran;

        tablekiri = $("#tablekiri").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getBGCek",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_BGCek",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "No_BGCek" },
                { data: "Jatuh_Tempo" },
                { data: "Status_Cetak" },
                { data: "Id_Pembayaran" },
                { data: "Nilai_BGCek" },
            ],
            // columnDefs: [{ targets: [5, 6], visible: false }],
        });

        tablekanan = $("#tablekanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getPembayaran",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
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
                { data: "Id_Detail_BGCek" },
                { data: "Id_Pembayaran" },
                { data: "Keterangan" },
            ],
            columnDefs: [{ targets: [5, 6], visible: false }],
        });
    });

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

    btn_refresh.addEventListener("click", function (event) {
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
                url: "MaintenanceBKKKRR2/getBKK",
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
                { data: "Id_MataUang" },
                { data: "Id_Jenis_Bayar" },
            ],
            columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    $("#tabletampilBKK tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tabletampilBKK tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataBKK = tabletampilBKK.row($(this).closest("tr")).data();
                console.log(rowDataBKK, this, tabletampilBKK);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        }
    );

    btn_cetakbkk.addEventListener("click", function (event) {
        event.preventDefault();
        bkk.value = rowDataBKK.Id_BKK;
        nilaiBkk.value = rowDataBKK.NilaiBKK;
        nilaiPembulatan.value = rowDataBKK.NilaiBKK;
        Swal.fire({
            title: "Merubah Nilai Pembulatannya ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    nilaiPembulatan.focus();
                }, 300);
            } else {
            }
        });
    });

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        if (bg == true) {
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            jumlahJnsByr.value = 0;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (bg == false) {
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    btn_kodePerkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="kiraTable" class="display" style="width:100%"><thead><tr><th>Keterangan</th><th>Kode Perkiraan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#kiraTable")
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
                        const table = $("#kiraTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR2/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Keterangan" },
                                { data: "NoKodePerkiraan" },
                            ],
                        });
                        $("#kiraTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kdPerkiraan1.value = selectedRow.NoKodePerkiraan.trim();
                    kdPerkiraan2.value = selectedRow.Keterangan.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_noBg.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a No BG",
                html: '<table id="btnBGTable" class="display" style="width:100%"><thead><tr><th>No BG</th><th>ID Detail BG</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#btnBGTable")
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
                        const table = $("#btnBGTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR2/getDetailBG",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_pembayaran: id_pembayaran.value,
                                },
                                success: function (response) {
                                    if (response.message) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Success!",
                                            text: response.message,
                                            showConfirmButton: true,
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                            }
                                        });
                                    } else if (response.error) {
                                        Swal.fire({
                                            icon: "info",
                                            title: "Info!",
                                            text: response.error,
                                            showConfirmButton: false,
                                        });
                                    }
                                },
                            },
                            columns: [
                                { data: "No_BGCek" },
                                { data: "Id_Detail_BGCek" },
                            ],
                        });
                        $("#btnBGTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // kdPerkiraan1.value = selectedRow.NoKodePerkiraan.trim();
                    // kdPerkiraan2.value = selectedRow.Keterangan.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
