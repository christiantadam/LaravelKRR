document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button-customer");
    let btn_customers = document.getElementById("button-customers");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let id_customer = document.getElementById("id_customer");
    let id_customers = document.getElementById("id_customers");
    let customers = document.getElementById("customers");
    let customer = document.getElementById("customer");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let kodeBarangDirubah = document.getElementById("kodeBarangDirubah");
    let tanggal = document.getElementById("tanggal");
    let tanggals = document.getElementById("tanggals");
    let tabel_hitunganDatatable = new DataTable(
        document.getElementById("table-hitungan")
    );
    let tabel_hitungan = document.getElementById("table-hitungan");

    id_customer.disabled = true;
    customer.disabled = true;
    tanggal.disabled = true;
    kodeBarangAsal.disabled = true;
    tanggals.valueAsDate = new Date();

    if (successMessage) {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: successMessage,
            showConfirmButton: false,
            timer: 1500,
        });
    } else if (errorMessage) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    //#region Function
    function formatDateToUS(dateStr) {
        const [month, day, year] = dateStr.split("/");
        const date = new Date(`${year}-${month}-${day}`);
        return date.toISOString().split("T")[0];
    }

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
                                url: "CopyKodeBarang/getListCustomer",
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

    btn_customers.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable2" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#customerTable2")
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
                        const table = $("#customerTable2").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "CopyKodeBarang/getListCustomer",
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
                        $("#customerTable2 tbody").on(
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
                    customers.value = selectedRow.Nama_Customer.trim();
                    id_customers.value = selectedRow.Kode_Customer.trim();

                    if (id_customers.value !== "") {
                        kodeBarangDirubah.value =
                            "O-" + id_customers.value + "-";
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_kodebarang.addEventListener("click", async function (event) {
        event.preventDefault();
        if (id_customer.value == "") {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih Customer Dahulu",
                showConfirmButton: false,
            });
        } else {
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
                                    url: "CopyKodeBarang/create",
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
                            $("#barangTable tbody").on(
                                "click",
                                "tr",
                                function () {
                                    table
                                        .$("tr.selected")
                                        .removeClass("selected");
                                    $(this).addClass("selected");
                                }
                            );
                        });
                    },
                }).then(async (result) => {
                    if (result.isConfirmed && result.value) {
                        const selectedRow = result.value;
                        kodeBarangAsal.value = selectedRow.Kode_Barang.trim();
                        tanggal.value = selectedRow.tanggal.trim();

                        // Mengisi kodeBarangDirubah dengan 6 karakter pertama dari kodeBarangAsal
                        if (kodeBarangAsal.value !== "") {
                            kodeBarangDirubah.value =
                                kodeBarangAsal.value.substring(0, 6);
                        }

                        if (id_customer.value !== "") {
                            id_customers.value = id_customer.value;
                            customers.value = customer.value;
                        }

                        // if (tanggal.value !== "") {
                        //     tanggals.value = formatDateToUS(
                        //         selectedRow.tanggal.trim()
                        //     );
                        // }

                        // Check if DataTable is already initialized
                        if ($.fn.DataTable.isDataTable("#table-hitungan")) {
                            // If DataTable is already initialized, destroy it
                            $("#table-hitungan").DataTable().destroy();
                        }

                        // Configure the DataTable
                        $("#table-hitungan").DataTable({
                            responsive: true, // Enable responsiveness
                            processing: true, // Show a processing indicator while loading data
                            serverSide: true, // Enable server-side processing
                            returnFocus: true, // Return focus to the table after operations

                            // AJAX configuration to fetch data from the server
                            ajax: {
                                url: "CopyKodeBarang/getTableHitungan", // URL to fetch data from
                                dataType: "json", // Expect JSON data
                                type: "GET", // HTTP request type
                                data: {
                                    _token: csrfToken, // CSRF token for security
                                    KodeBarang: kodeBarangAsal.value, // Data to send with the request
                                    NamaCustomer: customer.value, // Data to send with the request
                                },
                            },

                            // Define the columns to be displayed in the table
                            columns: [
                                { data: "Kode_Komponen" }, // Component code
                                { data: "Nama_Komponen" }, // Component name
                                { data: "Panjang_Potongan" }, // Cut length
                                { data: "Lebar_Potongan" }, // Cut width
                                { data: "WA_Rajutan" }, // WA knitting
                                { data: "WE_Rajutan" }, // WE knitting
                                { data: "Denier" }, // Denier
                                { data: "Quantity" }, // Quantity
                                { data: "Berat" }, // Weight
                                { data: "Harga" }, // Price
                                { data: "SubTotal" }, // Subtotal
                                { data: "Kounter_Komponen" }, // Component counter
                            ],
                        });
                    }
                });
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    });
});
