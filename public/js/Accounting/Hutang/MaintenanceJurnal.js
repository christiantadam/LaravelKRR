$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_supllier = document.getElementById("btn_supllier");
    let btn_bulantahun = document.getElementById("btn_bulantahun");
    let btn_bkk = document.getElementById("btn_bkk");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_matauang = document.getElementById("btn_matauang");
    let kode_supp = document.getElementById("kode_supp");
    let nama_supp = document.getElementById("nama_supp");
    let uang_supp = document.getElementById("uang_supp");
    let bulantahun = document.getElementById("bulantahun");
    let tanggal = document.getElementById("tanggal");
    let bkk = document.getElementById("bkk");
    let matauangbayar = document.getElementById("matauangbayar");
    let kode_perkiraan = document.getElementById("kode_perkiraan");
    let ketKode_perkiraan = document.getElementById("ketKode_perkiraan");
    let id_uang = document.getElementById("id_uang");
    let mata_uang = document.getElementById("mata_uang");
    let hutang = document.getElementById("hutang");
    let pelunasan = document.getElementById("pelunasan");
    let keterangan = document.getElementById("keterangan");
    let id_jurnal = document.getElementById("id_jurnal");
    let table_jurnal = $("#table_jurnal").DataTable({
        columnDefs: [{ targets: [6], visible: false }],
    });
    let rowDataPertama;

    tanggal.valueAsDate = new Date();
    hutang.style.fontWeight = "bold";
    pelunasan.style.fontWeight = "bold";
    mata_uang.value = "RUPIAH";
    id_uang.value = 1;

    //#region Enter-enter

    hutang.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(hutang.value.replace(/,/g, ""));

            hutang.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
            });
        }
    });

    pelunasan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(pelunasan.value.replace(/,/g, ""));

            pelunasan.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
            });
        }
    });

    //#region Event Listener

    btn_supllier.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Supplier",
                html: '<table id="tableSupplier" class="display" style="width:100%"><thead><tr><th>Nama Supplier</th><th>ID. Supplier</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableSupplier")
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
                        const table = $("#tableSupplier").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceJurnal/getSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "Supplier" }, { data: "NO_SUP" }],
                        });
                        $("#tableSupplier tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableSupplier")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    const supplier = selectedRow.Supplier
                        ? selectedRow.Supplier.trim()
                        : "";
                    const TNmSupp =
                        supplier.length > 2 ? supplier.slice(0, -2) : "";
                    const TIDSupp = selectedRow.No_Sup ?? "";
                    const TUangsupp =
                        supplier.length > 0 ? supplier.slice(-1) : "";
                    kode_supp.value = selectedRow.NO_SUP;
                    nama_supp.value = escapeHTML(selectedRow.Supplier.trim());
                    uang_supp.value = TUangsupp;

                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_bulantahun.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bulan/Tahun",
                html: '<table id="tableBulanTahun" class="display" style="width:100%"><thead><tr><th>Bulan Tahun</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableBulanTahun")
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
                        const table = $("#tableBulanTahun").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceJurnal/getPeriodeJurnal",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kode_supp: kode_supp.value,
                                },
                            },
                            columns: [{ data: "BlnThn" }],
                        });

                        $("#tableBulanTahun tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBulanTahun")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // Handle the selected row as needed
                    bulantahun.value = selectedRow.BlnThn;
                    // nama_supp.value = escapeHTML(selectedRow.NM_SUP.trim());
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_kodeperkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>ID. Perkiraan</th><th>Nama Perkiraan</th></tr></thead><tbody></tbody></table>',
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
                                url: "MaintenanceJurnal/getKira",
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
                    kode_perkiraan.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ketKode_perkiraan.value = escapeHTML(
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

    btn_matauang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mata Uang",
                html: '<table id="tableMataUang" class="display" style="width:100%"><thead><tr><th>Nama Mata Uang</th><th>ID. Mata Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableMataUang")
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
                        const table = $("#tableMataUang").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceJurnal/getMataUang",
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
                        $("#tableMataUang tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableMataUang")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    mata_uang.value = selectedRow.Nama_MataUang.trim();
                    id_uang.value = selectedRow.Id_MataUang.trim();

                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_bkk.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a BKK",
                html: '<table id="tableBKK" class="display" style="width:100%"><thead><tr><th>Referensi</th><th>Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableBKK")
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
                        const table = $("#tableBKK").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceJurnal/getBKK",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kode_supp: kode_supp.value,
                                    bulantahun: bulantahun.value,
                                },
                            },
                            columns: [{ data: "Referensi" }, { data: "Uang" }],
                        });

                        $("#tableBKK tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBKK")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    bkk.value = selectedRow.Referensi;
                    matauangbayar.value =
                        selectedRow.Uang.split("//")[0].trim();
                    // nama_supp.value = escapeHTML(selectedRow.NM_SUP.trim());
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                    $.ajax({
                        url: "MaintenanceJurnal/checkBKK",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            bkk: bkk.value,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then(() => {
                                    // document
                                    //     .querySelectorAll("input")
                                    //     .forEach((input) => (input.value = ""));
                                    // $("#table_atas").DataTable().ajax.reload();
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: response.error,
                                    showConfirmButton: true,
                                }).then(() => {
                                    table_jurnal = $("#table_jurnal").DataTable(
                                        {
                                            responsive: true,
                                            processing: true,
                                            serverSide: true,
                                            destroy: true,
                                            ajax: {
                                                url: "MaintenanceJurnal/DataJurnal",
                                                dataType: "json",
                                                type: "GET",
                                                data: function (d) {
                                                    return $.extend({}, d, {
                                                        _token: csrfToken,
                                                        bkk: bkk.value,
                                                    });
                                                },
                                            },
                                            columns: [
                                                {
                                                    data: "BKK",
                                                    render: function (data) {
                                                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                                    },
                                                },
                                                { data: "KodePerkiraan" },
                                                { data: "KetKira" },
                                                { data: "Nilai_Debet" },
                                                { data: "Nilai_Kredit" },
                                                { data: "Keterangan" },
                                                { data: "ID_Jurnal" },
                                            ],
                                            columnDefs: [
                                                {
                                                    targets: [6],
                                                    visible: false,
                                                },
                                            ],
                                        }
                                    );
                                });
                            }
                        },
                        error: function (xhr) {
                            alert(xhr.responseJSON.message);
                        },
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    let rowDataArray = [];

    $("#table_jurnal tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_jurnal tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_jurnal.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);

                id_jurnal.value = rowDataPertama.ID_Jurnal;
                kode_perkiraan.value = rowDataPertama.KodePerkiraan;
                ketKode_perkiraan.value = rowDataPertama.KetKira;
                hutang.value = rowDataPertama.Nilai_Debet;
                pelunasan.value = rowDataPertama.Nilai_Kredit;
                keterangan.value = rowDataPertama.Keterangan;

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_jurnal);
            } else {
                id_jurnal.value = "";
                kode_perkiraan.value = "";
                ketKode_perkiraan.value = "";
                hutang.value = "";
                pelunasan.value = "";
                keterangan.value = "";

                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_jurnal);
            }
        }
    );
});
