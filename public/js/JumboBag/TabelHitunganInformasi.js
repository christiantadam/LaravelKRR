document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("btn_customer");
    let btn_kodebarang = document.getElementById("btn_kodebarang");
    let btn_ukuran = document.getElementById("btn_ukuran");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let ukuran = document.getElementById("ukuran");
    let tanggal = document.getElementById("tanggal");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let tanggalu = document.getElementById("tanggalu");
    let user = document.getElementById("user");
    let bentuk_body = document.getElementById("bentuk_body");
    let model_body = document.getElementById("model_body");
    let dimensi_body = document.getElementById("dimensi_body");
    let bentuk_ca = document.getElementById("bentuk_ca");
    let model_ca = document.getElementById("model_ca");
    let dimensi_ca = document.getElementById("dimensi_ca");
    let bentuk_cb = document.getElementById("bentuk_cb");
    let model_cb = document.getElementById("model_cb");
    let dimensi_cb = document.getElementById("dimensi_cb");
    let swl = document.getElementById("swl");
    let sf = document.getElementById("sf");
    let panjang_body = document.getElementById("panjang_body");
    let diameter_body = document.getElementById("diameter_body");
    let lebar_body = document.getElementById("lebar_body");
    let tinggi_body = document.getElementById("tinggi_body");
    let panjang_ca = document.getElementById("panjang_ca");
    let diameter_ca = document.getElementById("diameter_ca");
    let lebar_ca = document.getElementById("lebar_ca");
    let tinggi_ca = document.getElementById("tinggi_ca");
    let panjang_cb = document.getElementById("panjang_cb");
    let diameter_cb = document.getElementById("diameter_cb");
    let lebar_cb = document.getElementById("lebar_cb");
    let tinggi_cb = document.getElementById("tinggi_cb");
    let tabel = document.getElementById("tabel");
    let btn_cari = document.getElementById("btn_cari");
    let btn_clear = document.getElementById("btn_clear");
    let btn_print = document.getElementById("btn_print");

    tanggalu.valueAsDate = new Date();

    //#region Tabel

    const createdCell = function (cell, cellData, rowData, rowIndex, colIndex) {
        let original;
        cell.setAttribute("contenteditable", true);
        cell.setAttribute("spellcheck", false);

        cell.addEventListener("focus", function (e) {
            original = e.target.textContent;
        });

        cell.addEventListener("blur", function (e) {
            if (original !== e.target.textContent) {
                const row = table.row(e.target.parentElement);
                row.data()[colIndex] = e.target.textContent; // Update the cell data
                row.invalidate();
                console.log("Cell changed: ", e.target); // Logging the cell
                console.log("New content: ", e.target.textContent); // Logging the new content
                console.log("Column index: ", colIndex); // Logging the column index
                console.log(
                    "Column name: ",
                    table.column(colIndex).header().textContent
                ); // Logging the column name
                console.log("Row data: ", row.data()); // Logging the row data
                console.log(cell, cellData, rowData, rowIndex, colIndex); // Logging all parameters
            }
        });
    };

    // Initialize DataTable
    const table = $("#tabel").DataTable({
        columnDefs: [
            {
                targets: "_all",
                createdCell: createdCell,
            },
        ],
    });

    //#region Event Listener

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#customerTable")
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
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "TabelHitunganInformasi/getListCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Customer",
                                },
                                {
                                    data: "Kode_Customer",
                                },
                            ],
                        });
                        $("#customerTable tbody").on(
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
                    customer.value = selectedRow.Nama_Customer.trim();
                    id_customer.value = selectedRow.Kode_Customer.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_ukuran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Ukuran",
                html: '<table id="ukuranTable" class="display" style="width:100%"><thead><tr><th>Ukuran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#ukuranTable")
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
                        const table = $("#ukuranTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "TabelHitunganInformasi/getUkuran",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_customer: id_customer.value,
                                },
                            },
                            columns: [
                                { data: "Ukuran" },
                            ],
                        });
                        $("#ukuranTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    ukuran.value = selectedRow.Ukuran.trim();
                    // tanggal.value = selectedRow.tanggal.trim();

                    // if (proses === 1) {
                    //     console.log(proses);
                    //     btn_nopesanan.disabled = true;
                    //     btn_customers.focus();
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_kodebarang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Barang",
                html: '<table id="barangTable" class="display" style="width:100%"><thead><tr><th>Kode Barang</th><th>Tanggal</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#barangTable")
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
                        const table = $("#barangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "TabelHitunganInformasi/create",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodeCustomer: id_customer.value,
                                },
                            },
                            columns: [
                                { data: "Kode_Barang" },
                                { data: "tanggal" },
                            ],
                        });
                        $("#barangTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kodeBarangAsal.value = selectedRow.Kode_Barang.trim();
                    tanggal.value = selectedRow.tanggal.trim();

                    $.ajax({
                        url: "TabelHitunganInformasi/updateUser",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kodebarangs: kodebarangs.value,
                            IDSuratPesanan: selectedRow.IDSuratPesanan.trim(),
                        },
                        success: function (data) {
                            console.log(data);
                            qty_sisa.value = data.SisaOrder;
                            qty_sisa.value = data.ada ? data.ada : 0;
                            qty_sisa.focus();
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    // if (proses === 1) {
                    //     console.log(proses);
                    //     btn_nopesanan.disabled = true;
                    //     btn_customers.focus();
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
