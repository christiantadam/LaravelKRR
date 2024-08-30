$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_matauang = document.getElementById("btn_matauang");
    let btn_bank = document.getElementById("btn_bank");
    let btn_jenispembayaran = document.getElementById("btn_jenispembayaran");
    let btn_tambahbiaya = document.getElementById("btn_tambahbiaya");
    let btn_tambahdata = document.getElementById("btn_tambahdata");
    let btn_kodeperkiraanMBiaya = document.getElementById(
        "btn_kodeperkiraanMBiaya"
    );
    let btn_prosesMBiaya = document.getElementById("btn_prosesMBiaya");
    let btn_batal = document.getElementById("btn_batal");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");
    let mata_uang = document.getElementById("mata_uang");
    let kode_matauang = document.getElementById("kode_matauang");
    let nama_bank = document.getElementById("nama_bank");
    let id_bank = document.getElementById("id_bank");
    let jenis_bank = document.getElementById("jenis_bank");
    let tanggal_input = document.getElementById("tanggal_input");
    let id_bkm = document.getElementById("id_bkm");
    let diterima_dari = document.getElementById("diterima_dari");
    let kurs_rupiah = document.getElementById("kurs_rupiah");
    let jumlah_uang = document.getElementById("jumlah_uang");
    let no_bukti = document.getElementById("no_bukti");
    let uraian = document.getElementById("uraian");
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let id_jnsPem = document.getElementById("id_jnsPem");
    let idDetail_MBiaya = document.getElementById("idDetail_MBiaya");
    let kodePerkiraan1 = document.getElementById("kodePerkiraan1");
    let kodePerkiraan2 = document.getElementById("kodePerkiraan2");
    let jumlah_biayaMBiaya = document.getElementById("jumlah_biayaMBiaya");
    let keterangan_MBiaya = document.getElementById("keterangan_MBiaya");
    let tutup_modal = document.getElementById("tutup_modal");
    let close_modal = document.getElementById("close_modal");
    let table_kiri = $("#table_kiri").DataTable({
        columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_kanan = $("#table_kanan").DataTable({});
    let rowDataPertama;
    let rowDataKedua;
    let koreksi;

    koreksi = 0;
    id_bkm.readOnly = true;
    tanggal_input.valueAsDate = new Date();
    tanggal_input.focus();
    btn_tambahdata.disabled = true;
    kurs_rupiah.value = 0;

    //#region Function

    function clearValMB() {
        jumlah_biayaMBiaya.value = "";
        kodePerkiraan1.value = "";
        kodePerkiraan2.value = "";
        keterangan_MBiaya.value = "";
    }

    //#region Enter

    tanggal_input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            diterima_dari.focus();
        }
    });

    diterima_dari.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (btn_matauang.disabled) {
                jumlah_uang.focus();
            } else {
                btn_matauang.focus();
            }
        }
    });

    jumlah_uang.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(jumlah_uang.value.replace(/,/g, ""));

            // Cek jika jumlah_uang kosong atau bukan angka yang valid
            if (isNaN(value) || jumlah_uang.value.trim() === "") {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Jumlah Uang Tidak Boleh Kosong",
                    showConfirmButton: true,
                });
            } else {
                // Format jumlah uang jika valid
                jumlah_uang.value = value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                if (btn_bank.disabled) {
                    btn_jenispembayaran.focus();
                } else {
                    btn_bank.focus();
                }
            }
        }
    });

    no_bukti.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            uraian.focus();
        }
    });

    let tableData = [];
    let isAjaxProcessed = false; // Flag to check if AJAX has already been processed

    uraian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            // Check if all required fields are filled
            if (
                diterima_dari.value !== "" &&
                jumlah_uang.value !== "" &&
                nama_bank.value !== "" &&
                keterangan_kira.value !== "" &&
                mata_uang.value !== "" &&
                jenis_pembayaran.value !== ""
            ) {
                btn_tambahdata.disabled = false;

                // Check if AJAX request has not been processed
                if (!isAjaxProcessed) {
                    $.ajax({
                        url: "MaintenanceBKMKRR1/processData",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            diterima_dari: diterima_dari.value,
                            jumlah_uang: jumlah_uang.value,
                            nama_bank: nama_bank.value,
                            keterangan_kira: keterangan_kira.value,
                            mata_uang: mata_uang.value,
                            jenis_pembayaran: jenis_pembayaran.value,
                            id_bank: id_bank.value,
                            tanggal_input: tanggal_input.value,
                            id_bkm: id_bkm.value,
                        },
                        success: function (data) {
                            console.log(data);

                            // Set the value of id_bkm only once
                            id_bkm.value = data.idBKM;

                            // Mark AJAX as processed
                            isAjaxProcessed = true;

                            // Optional: Handle any errors from the AJAX response
                            if (data.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }

                if (koreksi == 1) {
                    rowDataPertama[1] = diterima_dari.value;
                    rowDataPertama[2] = jumlah_uang.value;
                    rowDataPertama[3] = kode_kira.value;
                    rowDataPertama[4] = uraian.value;
                    rowDataPertama[5] = id_jnsPem.value;
                    rowDataPertama[6] = no_bukti.value;
                    rowDataPertama[7] = jenis_pembayaran.value;
                    rowDataPertama[8] = keterangan_kira.value;
                    rowDataPertama[9] = kurs_rupiah.value;
                    // table_kiri.draw(false);
                    if ($.fn.DataTable.isDataTable("#table_kiri")) {
                        var table_kiri = $("#table_kiri").DataTable();
                        let selectedRow = table_kiri.row(
                            $('input[name="penerimaCheckbox"]:checked').closest(
                                "tr"
                            )
                        );
                        selectedRow.data(rowDataPertama).draw();
                    }
                    btn_matauang.disabled = true;
                    btn_bank.disabled = true;
                    document.activeElement.blur();
                    koreksi = 0;
                } else {
                    const newRow = {
                        Id_Detail: tableData.length + 1,
                        diterima_dari: diterima_dari.value,
                        jumlah_uang: jumlah_uang.value,
                        kode_kira: kode_kira.value,
                        uraian: uraian.value,
                        id_jnsPem: id_jnsPem.value,
                        no_bukti: no_bukti.value,
                        jenis_pembayaran: jenis_pembayaran.value,
                        keterangan_kira: keterangan_kira.value,
                        kurs_rupiah: kurs_rupiah.value,
                    };

                    tableData.push(newRow);
                    console.log(tableData);

                    if ($.fn.DataTable.isDataTable("#table_kiri")) {
                        var table_kiri = $("#table_kiri").DataTable();

                        table_kiri.row
                            .add([
                                `<input type="checkbox" name="penerimaCheckbox" value="${newRow.Id_Detail}" /> ${newRow.Id_Detail}`,
                                newRow.diterima_dari,
                                newRow.jumlah_uang,
                                newRow.kode_kira,
                                newRow.uraian,
                                newRow.id_jnsPem,
                                newRow.no_bukti,
                                newRow.jenis_pembayaran,
                                newRow.keterangan_kira,
                                newRow.kurs_rupiah,
                            ])
                            .draw();
                        diterima_dari.value = "";
                        jumlah_uang.value = "";
                        jenis_pembayaran.value = "";
                        id_jnsPem.value = "";
                        kode_kira.value = "";
                        keterangan_kira.value = "";
                        no_bukti.value = "";
                        uraian.value = "";
                        btn_matauang.disabled = true;
                        btn_bank.disabled = true;
                        document.activeElement.blur();
                    } else {
                        var table_kiri = $("#table_kiri").DataTable();
                    }
                }
            } else {
                alert("Please fill in all required fields!");
                jumlah_uang.focus();
            }
        }
    });

    //#region Event Listener

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih detail terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            koreksi = 1;
            diterima_dari.value = rowDataPertama[1];
            jumlah_uang.value = rowDataPertama[2];
            jenis_pembayaran.value = rowDataPertama[7];
            id_jnsPem.value = rowDataPertama[5];
            kode_kira.value = rowDataPertama[3];
            keterangan_kira.value = rowDataPertama[8];
            no_bukti.value = rowDataPertama[6];
            uraian.value = rowDataPertama[4];
            kurs_rupiah.value = rowDataPertama[9];
            btn_matauang.disabled = false;
            btn_bank.disabled = false;
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_tambahdata.addEventListener("click", async function (event) {
        event.preventDefault();
        diterima_dari.focus();
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
                                url: "MaintenanceBKMKRR1/getKira",
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
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
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
                    setTimeout(() => {
                        no_bukti.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_matauang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mata Uang",
                html: '<table id="tablematauang" class="display" style="width:100%"><thead><tr><th>Mata Uang</th><th>ID. Mata Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tablematauang")
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
                        const table = $("#tablematauang").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getMataUang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_MataUang" },
                                { data: "Id_MataUang" },
                            ],
                            order: [[1, "asc"]],
                        });
                        $("#tablematauang tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tablematauang")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_matauang.value = selectedRow.Id_MataUang;
                    mata_uang.value = selectedRow.Nama_MataUang;

                    if (mata_uang.value !== "RUPIAH") {
                        Swal.fire({
                            title: "Apakah Dibayar dengan Rupiah?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                            focusConfirm: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setTimeout(() => {
                                    kurs_rupiah.focus();
                                    kurs_rupiah.select();
                                }, 300);
                            } else {
                                // Tambahkan aksi lain jika perlu
                            }
                        });
                    }
                    setTimeout(() => {
                        jumlah_uang.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_jenispembayaran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pembayaran",
                html: '<table id="tableJenisPem" class="display" style="width:100%"><thead><tr><th>Jenis Pembayaran</th><th>ID. Pembayaran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableJenisPem")
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
                        const table = $("#tableJenisPem").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getJenisBayar",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Jenis_Pembayaran" },
                                { data: "Id_Jenis_Bayar" },
                            ],
                        });
                        $("#tableJenisPem tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableJenisPem")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    jenis_pembayaran.value = selectedRow.Jenis_Pembayaran;
                    id_jnsPem.value = selectedRow.Id_Jenis_Bayar;
                    setTimeout(() => {
                        btn_kodeperkiraan.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Nama Bank</th><th>ID. Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableBank")
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
                        const table = $("#tableBank").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_Bank" },
                                { data: "Id_Bank" },
                            ],
                        });
                        $("#tableBank tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBank")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_bank.value = selectedRow.Nama_Bank;
                    id_bank.value = selectedRow.Id_Bank;
                    setTimeout(() => {
                        btn_jenispembayaran.focus();
                    }, 300);

                    $.ajax({
                        url: "MaintenanceBKMKRR1/getBankDetail",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_bank: id_bank.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenis_bank.value = data.JenisBank;
                            console.log(jenis_bank.value);
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#region Modal Tambah Biaya

    jumlah_biayaMBiaya.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(jumlah_biayaMBiaya.value.replace(/,/g, ""));

            // Cek jika jumlah_uang kosong atau bukan angka yang valid
            if (isNaN(value) || jumlah_biayaMBiaya.value.trim() === "") {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Jumlah Uang Tidak Boleh Kosong",
                    showConfirmButton: true,
                });
            } else {
                // Format jumlah uang jika valid
                jumlah_biayaMBiaya.value = value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                btn_kodeperkiraanMBiaya.focus();
                // if (btn_bank.disabled) {
                //     btn_jenispembayaran.focus();
                // } else {
                //     btn_bank.focus();
                // }
            }
        }
    });

    keterangan_MBiaya.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_prosesMBiaya.focus();
        }
    });

    btn_tambahbiaya.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih detail terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            idDetail_MBiaya.value = rowDataPertama[0].match(/value="(\d+)"/)[1];
            var myModal = new bootstrap.Modal(
                document.getElementById("ModalTambah"),
                {
                    keyboard: false,
                }
            );
            myModal.show();
            jumlah_biayaMBiaya.focus();
        }
    });

    btn_kodeperkiraanMBiaya.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKiraMB" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKiraMB")
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
                        const table = $("#tableKiraMB").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getKira",
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
                        $("#tableKiraMB tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKiraMB")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kodePerkiraan1.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    kodePerkiraan2.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    setTimeout(() => {
                        keterangan_MBiaya.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    let tableDataKanan = [];

    btn_prosesMBiaya.addEventListener("click", async function (event) {
        event.preventDefault();
        const newRow = {
            id_biaya: tableDataKanan.length + 1,
            jumlah_biayaMBiaya: jumlah_biayaMBiaya.value,
            kodePerkiraan1: kodePerkiraan1.value,
            keterangan_MBiaya: keterangan_MBiaya.value,
            idDetail_MBiaya: idDetail_MBiaya.value,
        };

        tableDataKanan.push(newRow);
        console.log(tableDataKanan);

        if ($.fn.DataTable.isDataTable("#table_kanan")) {
            var table_kanan = $("#table_kanan").DataTable();

            table_kanan.row
                .add([
                    `<input type="checkbox" name="penerimaCheckbox" value="${newRow.keterangan_MBiaya}" /> ${newRow.keterangan_MBiaya}`,
                    // newRow.keterangan_MBiaya,
                    newRow.jumlah_biayaMBiaya,
                    newRow.kodePerkiraan1,
                    newRow.idDetail_MBiaya,
                ])
                .draw();

            Swal.fire({
                title: "Tambah Biaya Lagi ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                focusConfirm: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    clearValMB();
                    setTimeout(() => {
                        jumlah_biayaMBiaya.focus();
                    }, 300);
                } else {
                    tutup_modal.click();
                }
            });
        }
    });

    tutup_modal.addEventListener("click", function (event) {
        event.preventDefault();
        clearValMB();
    });

    close_modal.addEventListener("click", function (event) {
        event.preventDefault();
        clearValMB();
    });

    let rowDataArray = [];

    $("#table_kiri tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_kiri tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_kiri.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_kiri);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_kiri);
            }
        }
    );

    let rowDataArrayKedua = [];

    $("#table_kanan tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_kanan tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_kanan.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataKedua);
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_kanan);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKedua = null;
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_kanan);
            }
        }
    );
});
