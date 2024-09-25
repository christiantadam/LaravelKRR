$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_bank = document.getElementById("btn_bank");
    let btn_perkiraan = document.getElementById("btn_perkiraan");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let tanggal = document.getElementById("tanggal");
    let id_bank = document.getElementById("id_bank");
    let nama_bank = document.getElementById("nama_bank");
    let jenis_bank = document.getElementById("jenis_bank");
    let table_DataBKM = $("#table_DataBKM").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_RincianData = $("#table_RincianData").DataTable({
        columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let rowDataPertama;

    tanggal.valueAsDate = new Date();

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        table_DataBKM = $("#table_DataBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKMxBKKPembulatan/getBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Total" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_DataBKM tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_DataBKM tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_DataBKM
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_DataBKM);

                table_RincianData = $("#table_RincianData").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "MaintenanceBKMxBKKPembulatan/getBKMDetails",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                idBKM: rowDataPertama.Id_BKM,
                            });
                        },
                    },
                    columns: [
                        {
                            data: "NamaCust",
                            // render: function (data) {
                            //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            // },
                        },
                        { data: "No_Bukti" },
                        { data: "ID_Penagihan" },
                        { data: "MataUang" },
                        { data: "Rincian" },
                        { data: "Id_bank" },
                        { data: "Jenis_Bank" },
                        { data: "Id_MataUang" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    columnDefs: [{ targets: [5, 6, 7], visible: false }],
                });
            } else {
                // Remove the unchecked row data from the array
                rowDataPertama = null;

                // rowDataPertama = table_DataBKM
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_DataBKM);
            }
        }
    );

    $("#table_RincianData tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_RincianData tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_RincianData.row(this).data();

    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
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
                                url: "MaintenanceBKMxBKKPembulatan/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Id_Bank" },
                                { data: "Nama_Bank" },
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
                    id_bank.value = escapeHTML(selectedRow.Id_Bank.trim());
                    nama_bank.value = escapeHTML(selectedRow.Nama_Bank.trim());

                    $.ajax({
                        url: "MaintenanceBKMxBKKPembulatan/getBankDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idBank: id_bank.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenis_bank.value = data.Jenis;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_perkiraan.addEventListener("click", async function (event) {
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
                                url: "CreateBKM/getKodePerkiraan",
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
                    id_perkiraanTB.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanTB.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
