$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let table = $("#tablepengajuanbkk").DataTable();
    let supplier1 = document.getElementById("supplier1");
    let supplier2 = document.getElementById("supplier2");
    let radiogrup_penagihan = document.getElementById("radiogrup_penagihan");
    let radiogrup_nopenagihan = document.getElementById(
        "radiogrup_nopenagihan"
    );
    let radiogrup_adadp = document.getElementById("radiogrup_adadp");
    let radiogrup_tidakdp = document.getElementById("radiogrup_tidakdp");
    let btn_bkkuangmuka = document.getElementById("btn_bkkuangmuka");
    let btn_supplier = document.getElementById("btn_supplier");
    let label_pajak = document.getElementById("label_pajak");
    let pajak = document.getElementById("pajak");
    let rincian = document.getElementById("rincian");
    let mata_uang = document.getElementById("mata_uang");
    let mata_uang_kanan = document.getElementById("mata_uang_kanan");
    let nilai_pembayaran_kanan = document.getElementById(
        "nilai_pembayaran_kanan"
    );
    let nilai_pembayaran = document.getElementById("nilai_pembayaran");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let btn_bank = document.getElementById("btn_bank");
    let btn_jenispembayaran = document.getElementById("btn_jenispembayaran");
    let btn_matauang = document.getElementById("btn_matauang");
    let id_bank = document.getElementById("id_bank");
    let kurs = document.getElementById("kurs");
    let jns_pembayaran = document.getElementById("jns_pembayaran");
    let id_jnsbayar = document.getElementById("id_jnsbayar");
    let jumlah_bayar = document.getElementById("jumlah_bayar");
    let nilai_pembayaran2 = document.getElementById("nilai_pembayaran2");
    let belum_dibayar = document.getElementById("belum_dibayar");
    let saldo = document.getElementById("saldo");
    let rincian_dp = document.getElementById("rincian_dp");
    let bkk_uangmuka = document.getElementById("bkk_uangmuka");
    let id_bkk = document.getElementById("id_bkk");
    let id_bayardp = document.getElementById("id_bayardp");
    let ada_bkm = document.getElementById("ada_bkm");
    let bkm = document.getElementById("bkm");
    let rowDataPertama;
    let rowData;
    let proses;
    let BKM_Pot;
    let TT;
    let TdkDP;
    let AdaDP;
    let bayar;
    let dp;

    document.getElementById("nilai_pembayaran").style.color = "green";
    document.getElementById("nilai_pembayaran").style.fontWeight = "bold";
    id_jnsbayar.style.visibility = "hidden";
    mata_uang_kanan.style.visibility = "hidden";
    nilai_pembayaran_kanan.style.visibility = "hidden";
    ada_bkm.style.visibility = "hidden";
    bkm.style.visibility = "hidden";
    btn_bkkuangmuka.disabled = true;
    radiogrup_adadp.disabled = true;
    radiogrup_tidakdp.disabled = true;
    btn_proses.disabled = true;
    kurs.value = 1;
    jumlah_bayar.value = 0;
    nilai_pembayaran2.value = 0;
    belum_dibayar.value = 0;
    saldo.value = 0;
    btn_isi.disabled = true;

    let tablekedua = $("#tablebkkpenagihan").DataTable({});
    $("#tablebkkpenagihan").parents("div.dataTables_wrapper").first().hide();

    radiogrup_adadp.addEventListener("click", async function (event) {
        AdaDP = true;
        TdkDP = false;
        dp = true;
        Swal.fire({
            title: "Confirmation",
            text: "BKK Uang Muka (Yes) atau BKM Potongan (No)",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            console.log(result);
            btn_bkkuangmuka.disabled = !result.isConfirmed;
            if (!result.isConfirmed) {
                BKM_Pot = true;
            } else {
                BKM_Pot = false;
            }
            console.log(BKM_Pot);
        });
    });

    radiogrup_tidakdp.addEventListener("click", function (event) {
        AdaDP = false;
        TdkDP = true;
        bayar = true;
    });

    radiogrup_penagihan.addEventListener("click", function (event) {
        btn_supplier.focus();
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = false;
        TT = true;
        $("#tablebkkpertama").parents("div.dataTables_wrapper").first().hide();
        $("#tablebkkpenagihan")
            .parents("div.dataTables_wrapper")
            .first()
            .show();
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
        label_pajak.style.visibility = "visible";
        pajak.style.visibility = "visible";
    });

    radiogrup_nopenagihan.addEventListener("click", function (event) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = false;
        TT = false;
        $("#tablebkkpertama").parents("div.dataTables_wrapper").first().hide();
        $("#tablebkkpenagihan")
            .parents("div.dataTables_wrapper")
            .first()
            .hide();
        label_pajak.style.visibility = "hidden";
        pajak.style.visibility = "hidden";
        btn_supplier.focus();
        document.querySelector('label[for="radio_2"]').innerHTML =
            "&nbsp;DP&nbsp;&nbsp;";
        document.querySelector('label[for="radio_3"]').innerHTML =
            "&nbsp;Pembayaran&nbsp;&nbsp;";
        document.querySelector('label[for="penagihan"]').innerHTML =
            "NO PENAGIHAN&nbsp;&nbsp;";
    });

    let tablepertama = $("#tablebkkpertama").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenancePengajuanBKK/getPengajuan",
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
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
        ],
    });

    $("#tablebkkpertama tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#tablebkkpertama tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = tablepertama.row($(this).closest("tr")).data();
                console.log(rowData, this, tablepertama);
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

    btn_supplier.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Supplier",
                html: '<table id="supplierTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#supplierTable")
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
                        const table = $("#supplierTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/getSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NM_SUP" }, { data: "NO_SUP" }],
                        });
                        $("#supplierTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    supplier2.value = selectedRow.NM_SUP.trim();
                    supplier1.value = selectedRow.NO_SUP.trim();

                    if (!TT) {
                        rincian.value =
                            "UANG MUKA - " + selectedRow.NM_SUP.trim();
                    } else {
                        tablekedua = $("#tablebkkpenagihan").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/getTT",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
                                        supplier1: supplier1.value,
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
                                { data: "Status_PPN" },
                                { data: "UangTT" },
                                { data: "Nilai_Penagihan" },
                                { data: "Lunas" },
                                { data: "IdUangTT" },
                                { data: "Id_Pembayaran" },
                                // { data: "TT_NoLunas" },
                                // { data: "isRed" },
                            ],
                            columnDefs: [{ targets: [6, 7], visible: false }],
                        });
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    $("#tablebkkpenagihan tbody").off(
        "change",
        'input[name="penerimaCheckbox"]'
    );

    $("#tablebkkpenagihan tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowData = tablekedua.row($(this).closest("tr")).data();
                console.log(rowData, this, tablekedua);
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

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        proses = 1;
        // btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_matauang.disabled = true;

        if (!TT) {
            Swal.fire({
                title: "Confirmation",
                text: "Pengajuan untuk Pembayaran (YES) / Uang Muka (NO) ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((result) => {
                if (mata_uang.value.trim() == "") {
                    // Swal.fire({
                    //     icon: "warning",
                    //     title: "Warning!",
                    //     text: "Isi kode barang terlebih dahulu",
                    //     showConfirmButton: true,
                    // });
                    btn_matauang.disabled = false;
                }
                console.log(result);
                btn_bkkuangmuka.disabled = !result.isConfirmed;
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Confirmation",
                        text: "Pengajuan untuk Pembayaran berdasarkan BKM ?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                    }).then((result) => {
                        console.log(result);
                        if (result.isConfirmed) {
                            ada_bkm.style.visibility = "visible";
                            bkm.style.visibility = "visible";
                        } else {
                        }
                    });
                    radiogrup_adadp.disabled = true;
                    radiogrup_tidakdp.disabled = false;
                    radiogrup_tidakdp.click();
                } else {
                    radiogrup_adadp.disabled = false;
                    radiogrup_adadp.click();
                    radiogrup_tidakdp.disabled = true;
                }
                console.log(BKM_Pot);
            });
            return;
        } else {
            console.log(rowData !== null, rowData !== undefined);
            if (rowData == null && rowData == undefined) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih data terlebih dahulu",
                    showConfirmButton: true,
                });
                return;
            } else {
                radiogrup_adadp.disabled = false;
                radiogrup_tidakdp.disabled = false;
                pajak.value = rowData.Status_PPN;
                rincian.value = rowData.Id_Penagihan;
                nilai_pembayaran_kanan.value = rowData.Id_Penagihan;
                mata_uang.value = rowData.UangTT;
                nilai_pembayaran.value = rowData.Nilai_Penagihan;
                id_pembayaran.value = rowData.Id_Pembayaran;
                if (mata_uang.value.trim() == "") {
                    // Swal.fire({
                    //     icon: "warning",
                    //     title: "Warning!",
                    //     text: "Isi kode barang terlebih dahulu",
                    //     showConfirmButton: true,
                    // });
                    btn_matauang.disabled = false;
                }
                return;
            }
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses === 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "MaintenancePengajuanBKK",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            TT: TT ? 1 : 0,
                            TdkDP: TdkDP ? 1 : 0,
                            AdaDP: AdaDP ? 1 : 0,
                            id_pembayaran: id_pembayaran.value,
                            nilai_pembayaran_kanan:
                                nilai_pembayaran_kanan.value,
                            bayar: bayar ? 1 : 0,
                            dp: dp ? 1 : 0,
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
                                        console.log(TT);

                                        if (TT == undefined) {
                                            tablepertama.ajax.reload();
                                            btn_proses.disabled = true;
                                            btn_koreksi.disabled = false;
                                            btn_hapus.disabled = false;
                                        } else if (TT == true) {
                                            tablekedua.ajax.reload();
                                            btn_proses.disabled = true;
                                            btn_isi.disabled = false;
                                            btn_hapus.disabled = false;
                                        }
                                    }
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
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            $.ajax({
                url: "MaintenancePengajuanBKK",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    TT: TT ? 1 : 0,
                    TdkDP: TdkDP ? 1 : 0,
                    AdaDP: AdaDP ? 1 : 0,
                    pajak: pajak.value,
                    id_pembayaran: id_pembayaran.value,
                    rincian: rincian.value,
                    mata_uang_kanan: mata_uang_kanan.value,
                    id_bank: id_bank.value,
                    id_jnsbayar: id_jnsbayar.value,
                    jumlah_bayar: jumlah_bayar.value,
                    nilai_pembayaran: nilai_pembayaran.value,
                    nilai_pembayaran_kanan: nilai_pembayaran_kanan.value,
                    rincian_dp: rincian_dp.value,
                    nilai_pembayaran2: nilai_pembayaran2.value,
                    id_bkk: id_bkk.value,
                    bkk_uangmuka: bkk_uangmuka.value,
                    id_bayardp: id_bayardp.value,
                    belum_dibayar: belum_dibayar.value,
                    bayar: bayar ? 1 : 0,
                    dp: dp ? 1 : 0,
                    supplier1: supplier1.value,
                    kurs: kurs.value,
                    ada_bkm: ada_bkm.value,
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
                                if (TT == true || TT == false) {
                                    tablekedua.ajax.reload();
                                    btn_proses.disabled = true;
                                    btn_isi.disabled = false;
                                    btn_hapus.disabled = false;
                                }
                            }
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
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    } else if (xhr.responseText) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            errorMessage = response.error || errorMessage;
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        proses = 2;
        label_pajak.style.visibility = "hidden";
        pajak.style.visibility = "hidden";
        console.log(TT, rowDataPertama);
        if (TT == undefined) {
            rincian.value = rowDataPertama.Rincian_Bayar;
            id_bank.value = rowDataPertama.Id_Bank;
            id_jnsbayar.value = rowDataPertama.Id_Jenis_Bayar;
            jns_pembayaran.value = rowDataPertama.Jenis_Pembayaran;
            mata_uang.value = rowDataPertama.Nama_MataUang;
            kurs.value = parseFloat(rowDataPertama.Kurs_Bayar);
            nilai_pembayaran.value = rowDataPertama.Nilai_Pembayaran;
            id_pembayaran.value = rowDataPertama.Id_Pembayaran;
            jumlah_bayar.value = rowDataPertama.Jml_JenisBayar;
            mata_uang_kanan.value = rowDataPertama.Id_MataUang;
        }
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        proses = 3;
        console.log(TT);
        if (TT == true) {
            id_pembayaran.value = rowData.Id_Pembayaran;
        } else if (TT == undefined) {
            id_pembayaran.value = rowDataPertama.Id_Pembayaran;
            nilai_pembayaran_kanan.value = rowDataPertama.Id_Penagihan;
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_bkkuangmuka.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a BKK",
                html: '<table id="bkkTable" class="display" style="width:100%"><thead><tr><th>Nama Supplier</th><th>ID Supplier</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#bkkTable")
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
                        const table = $("#bkkTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/getBKK_DP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    supplier1: supplier1.value,
                                    BKM_Pot: BKM_Pot ? 1 : 0,
                                },
                            },
                            columns: [
                                {
                                    data: "Supplier",
                                },
                                {
                                    data: "No_Supplier",
                                },
                            ],
                        });
                        $("#bkkTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // rincian_dp.value =
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    // sp2.value = selectedRow.No_Supplier.trim();
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
                html: '<table id="bankTable" class="display" style="width:100%"><thead><tr><th>ID Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#bankTable")
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
                        const table = $("#bankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Bank",
                                },
                                {
                                    data: "Nama_Bank",
                                },
                            ],
                        });
                        $("#bankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    id_bank.value = selectedRow.Id_Bank.trim();
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
                html: '<table id="jnsbayarTable" class="display" style="width:100%"><thead><tr><th>Jenis Pembayaran</th><th>ID Pembayaran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#jnsbayarTable")
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
                        const table = $("#jnsbayarTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/getJnsByr",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_bank: id_bank.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Jenis_Pembayaran",
                                },
                                {
                                    data: "Id_Jenis_Bayar",
                                },
                            ],
                        });
                        $("#jnsbayarTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_jnsbayar.value = selectedRow.Id_Jenis_Bayar.trim();
                    jns_pembayaran.value = selectedRow.Jenis_Pembayaran.trim();
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
                html: '<table id="matauangTable" class="display" style="width:100%"><thead><tr><th>Nama Mata Uang</th><th>ID Mata Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#matauangTable")
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
                        const table = $("#matauangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/GetMataUang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    mata_uang: mata_uang.value,
                                    id_bank: id_bank.value,
                                },
                                error: function (xhr, errorType, exception) {
                                    console.log(xhr);
                                    alert(xhr.responseJSON.message);
                                },
                                // dataSrc: function (json) {
                                //     // Check for error status from the server
                                //     if (json.status && json.status === 'error') {
                                //         // Display an alert with the error message
                                //         alert('Error: ' + json.message);
                                //         return []; // Return an empty array to prevent DataTables from processing data
                                //     } else {
                                //         // Return the data array for DataTables to process
                                //         return json;
                                //     }
                                // },
                            },
                            columns: [
                                {
                                    data: "Nama_MataUang",
                                },
                                {
                                    data: "Id_MataUang",
                                },
                            ],
                        });
                        $("#matauangTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    mata_uang.value = selectedRow.Nama_MataUang.trim();
                    mata_uang_kanan.value = selectedRow.Id_MataUang.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
