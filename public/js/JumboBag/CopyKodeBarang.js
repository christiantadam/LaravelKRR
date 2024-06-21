document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button-customer");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let id_customer = document.getElementById("id_customer");
    let id_customers = document.getElementById("id_customers");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let kodeBarangDirubah = document.getElementById("kodeBarangDirubah");
    let tanggal = document.getElementById("tanggal");
    let tanggals = document.getElementById("tanggals");
    let tabel_hitungan = document.getElementById("table-hitungan");

    function formatDateToUS(dateStr) {
        const [month, day, year] = dateStr.split('/');
        const date = new Date(`${year}-${month}-${day}`);
        return date.toISOString().split('T')[0];
        // return date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    }

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
                                url: "MaintenanceCustomer/create",
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

                    // if (id_customer.value !== "") {
                    //     id_customers.value = id_customer.value;
                    //     customers.value = customer.value;
                    // }
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
                        $("#barangTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
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

                    if (tanggal.value !== "") {
                        tanggals.value = formatDateToUS(selectedRow.tanggal.trim());
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
