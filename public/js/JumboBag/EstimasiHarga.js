document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button_customer");
    let btn_kodebarang = document.getElementById("button_kodebarang");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let tanggal = document.getElementById("tanggal");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let btn_ok = document.getElementById("btn_ok");
    let btn_clear = document.getElementById("btn_clear");
    let keterangan = document.getElementById("keterangan");
    let tabel = document.getElementById("tabel");
    let berat_total = document.getElementById("berat_total");
    let btn_hitung = document.getElementById("btn_hitung");
    let harga_material = document.getElementById("harga_material");
    let ongkos1 = document.getElementById("ongkos1");
    let ongkos2 = document.getElementById("ongkos2");
    let ongkos3 = document.getElementById("ongkos3");
    let total_harga = document.getElementById("total_harga");
    let sudahAjaxDatatable = false;

    id_customer.readOnly = true;
    customer.readOnly = true;
    kodeBarangAsal.readOnly = true;
    tanggal.readOnly = true;

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

    // AJAX call to populate data into the DataTable
    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "EstimasiHarga/getHitungan",
            type: "GET",
            data: {
                _token: csrfToken,
                kode: $("#kodeBarangAsal").val(),
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data);
                table.clear().draw();
                $.ajax({
                    url: "EstimasiHarga/getKeterangan",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        kodeBarangAsal: kodeBarangAsal.value,
                    },
                    success: function (data) {
                        console.log(data.data[0]); // Log the first data item (optional)

                        // Extract keterangan text and replace '\r\n' with '<br>'
                        let keteranganText = data.data[0].keterangan.replace(
                            /\r\n/g,
                            "<br>"
                        );

                        // Set the HTML content of the element with id 'keterangan'
                        keterangan.innerHTML = keteranganText;
                    },

                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
                for (let index = 0; index < data.length; index++) {
                    let berat = data[index].Berat;
                    let indeks = data[index].Index;
                    let harga = data[index].Harga;

                    if (berat === ".00") {
                        berat = "0";
                    } else if (berat.endsWith(".00")) {
                        berat = berat.slice(0, -3);
                    }

                    if (indeks === ".00") {
                        indeks = "0";
                    } else if (indeks.endsWith(".00")) {
                        indeks = indeks.slice(0, -3);
                    }

                    if (harga === ".00") {
                        harga = "0";
                    } else if (harga.endsWith(".00")) {
                        harga = harga.slice(0, -3);
                    }

                    table.row
                        .add([
                            data[index].Kode_Komponen,
                            data[index].Nama_Komponen,
                            berat,
                            indeks,
                            harga,
                        ])
                        .draw(false);
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    // Clear table data
    btn_clear.addEventListener("click", function (event) {
        event.preventDefault();
        table.clear().draw();
        keterangan.textContent = "";
        berat_total.value = "";
        harga_material.value = "";
        ongkos1.value = "";
        ongkos2.value = "";
        ongkos3.value = "";
        total_harga.value = "";
        id_customer.value = "";
        customer.value = "";
        kodeBarangAsal.value = "";
        tanggal.value = "";
    });

    //#endregion

    //#region Event Listener

    btn_hitung.addEventListener("click", function (event) {
        event.preventDefault();

        // Ambil data terbaru dari tabel
        let rows = table.rows().data().toArray();

        let jml_hrg = 0;
        let brt = 0;

        for (let a = 0; a < rows.length; a++) {
            let berat = parseFloat(rows[a][2]) || 0;
            let kuantitas = parseFloat(rows[a][3]) || 0;
            let harga = parseFloat(rows[a][4]) || 0;

            if (kuantitas !== 0) {
                harga = berat * kuantitas;
                // Update harga di tabel
                table.cell(a, 4).data(harga).draw();
            }

            jml_hrg += harga;
            brt += berat;
        }

        // Tampilkan hasil perhitungan ke elemen-elemen yang sesuai
        document.getElementById("berat_total").value = brt;
        document.getElementById("harga_material").value = jml_hrg;

        // Perhitungan ongkos dan total harga tanpa PPN
        let ongkos1 = parseFloat(document.getElementById("ongkos1").value) || 0;
        let ongkos2 = parseFloat(document.getElementById("ongkos2").value) || 0;

        let ongkos3 = ongkos1 * ongkos2;
        document.getElementById("ongkos3").value = ongkos3;

        let total_harga = jml_hrg + ongkos3;
        document.getElementById("total_harga").value = total_harga;
    });

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
                    jQuery(function ($) {
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "EstimasiHarga/getListCustomer",
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
                    jQuery(function ($) {
                        const table = $("#barangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "EstimasiHarga/create",
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
