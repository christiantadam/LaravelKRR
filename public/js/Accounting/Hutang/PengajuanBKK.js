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
    let BKM_Pot;

    mata_uang_kanan.style.visibility = "hidden";
    nilai_pembayaran_kanan.style.visibility = "hidden";
    btn_bkkuangmuka.disabled = true;
    radiogrup_adadp.disabled = true;
    radiogrup_tidakdp.disabled = true;
    btn_proses.disabled = true;

    let tablekedua = $("#tablebkkpenagihan").DataTable({});
    $("#tablebkkpenagihan").parents("div.dataTables_wrapper").first().hide();

    radiogrup_adadp.addEventListener("click", async function (event) {
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
            if (result.isConfirmed) {
                BKM_Pot = true;
            } else {
                BKM_Pot = false;
            }
            console.log(BKM_Pot);
        });
    });

    radiogrup_tidakdp.addEventListener("click", function (event) {
        // Additional logic can be added here if necessary
    });

    radiogrup_penagihan.addEventListener("click", function (event) {
        $("#tablebkkpertama").parents("div.dataTables_wrapper").first().hide();
        $("#tablebkkpenagihan")
            .parents("div.dataTables_wrapper")
            .first()
            .show();
        label_pajak.style.visibility = "visible";
        pajak.style.visibility = "visible";
        btn_supplier.focus();
    });

    radiogrup_nopenagihan.addEventListener("click", function (event) {
        $("#tablebkkpertama").parents("div.dataTables_wrapper").first().hide();
        $("#tablebkkpenagihan")
            .parents("div.dataTables_wrapper")
            .first()
            .hide();
        label_pajak.style.visibility = "hidden";
        pajak.style.visibility = "hidden";
        btn_supplier.focus();
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
                const rowData = tablekedua.row($(this).closest("tr")).data();
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

                btn_isi.addEventListener("click", function (event) {
                    event.preventDefault();
                    radiogrup_adadp.disabled = false;
                    radiogrup_tidakdp.disabled = false;
                    pajak.value = rowData.Status_PPN;
                    rincian.value = rowData.Id_Penagihan;
                    mata_uang.value = rowData.UangTT;
                    document.getElementById("nilai_pembayaran").style.color =
                        "green";
                    nilai_pembayaran.value = rowData.Nilai_Penagihan;
                    id_pembayaran.value = rowData.Id_Pembayaran;
                    btn_koreksi.disabled = true;
                    btn_hapus.disabled = true;
                    btn_proses.disabled = false;
                });
            }
        }
    );

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
                                    BKM_Pot: BKM_Pot,
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
                html: '<table id="bkkTable" class="display" style="width:100%"><thead><tr><th>ID Bank</th><th>ID Supplier</th></tr></thead><tbody></tbody></table>',
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
                                    BKM_Pot: BKM_Pot,
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
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    // sp2.value = selectedRow.No_Supplier.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
