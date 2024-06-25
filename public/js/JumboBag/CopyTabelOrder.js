document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button-customer");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let id_customer = document.getElementById("id_customer");
    let id_customers = document.getElementById("id_customers");
    let customers = document.getElementById("customers");
    let customer = document.getElementById("customer");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let kodeBarangDirubah = document.getElementById("kodeBarangDirubah");
    let tanggal = document.getElementById("tanggal");
    let tanggals = document.getElementById("tanggals");
    let btn_nopsn = document.getElementById("button-no-pesanan");
    let no_pesanan = document.getElementById("no_pesanan");
    let time_deliv = document.getElementById("time_deliv");
    let jumlah_order = document.getElementById("jumlah_order");
    let jumlah_order2 = document.getElementById("jumlah_order2");
    let btn_kodebarang2 = document.getElementById("button-kode-barang2");
    let kodebarang = document.getElementById("kodebarang");
    let kodeBarangs = document.getElementById("kodeBarangs");
    let jenis_barang = document.getElementById("jenis_barang");
    let idsuratpesanan = document.getElementById("idsuratpesanan");
    let idpesanan = document.getElementById("idpesanan");
    let btn_pesanan = document.getElementById("button-pesanan");
    let satuan = document.getElementById("satuan");
    let tabel_hitunganDatatable = new DataTable(
        document.getElementById("table-hitungan")
    );
    let tabel_hitungan = document.getElementById("table-hitungan");

    id_customer.disabled = true;
    customer.disabled = true;
    tanggal.disabled = true;
    kodeBarangAsal.disabled = true;
    no_pesanan.disabled = true;
    time_deliv.disabled = true;
    jumlah_order.disabled = true;
    kodebarang.disabled = true;
    kodeBarangs.disabled = true;
    idpesanan.disabled = true;
    satuan.disabled = true;
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
                                url: "CopyTabelOrder/getListCustomer",
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

    btn_nopsn.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a No Pesanan",
                html: '<table id="nopesananTable" class="display" style="width:100%"><thead><tr><th>No Surat Pesanan</th><th>Waktu Delivery</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#nopesananTable")
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
                        const table = $("#nopesananTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "CopyTabelOrder/getNoSP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    KodeBrgAsal: kodeBarangAsal.value,
                                },
                            },
                            columns: [
                                {
                                    data: "NoSP",
                                },
                                {
                                    data: "Delivery",
                                    render: function (data) {
                                        if (data) {
                                            return data.substring(0, 10);
                                        } else {
                                            return "";
                                        }
                                    },
                                },
                            ],
                        });
                        $("#nopesananTable tbody").on(
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
                    no_pesanan.value = selectedRow.NoSP.trim();
                    time_deliv.value = selectedRow.Delivery.trim();
                    jumlah_order.value = selectedRow.Jumlah.trim();
                    // jumlah_order2.value = selectedRow.Jumlah.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_kodebarang2.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Barang",
                html: '<table id="kdBrgTable" class="display" style="width:100%;white-space: nowrap"><thead><tr><th>Nama Type</th><th>Kode Barang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "90%",
                preConfirm: () => {
                    const selectedData = $("#kdBrgTable")
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
                        const table = $("#kdBrgTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "CopyTabelOrder/btnKdBrg2",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    KodeBrgAsal: kodeBarangAsal.value,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaType",
                                },
                                {
                                    data: "KodeBarang",
                                },
                            ],
                        });
                        $("#kdBrgTable tbody").on("click", "tr", function () {
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
                    kodebarang.value = selectedRow.KodeBarang.trim();
                    kodeBarangs.value = selectedRow.NamaType.substring(
                        0,
                        selectedRow.NamaType.length - 4
                    );
                    jenis_barang.value = selectedRow.NamaType.slice(-3);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_pesanan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Surat Pesanan",
                html: '<table id="pesananTable" class="display" style="width:100%;white-space: nowrap"><thead><tr><th>No Surat Pesanan</th><th>Qty</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#pesananTable")
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
                    const table = $("#pesananTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "/CopyTabelOrder/btnNoSP2", // Pastikan URL benar
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                KodeBrgNew: kodebarang.value,
                                JenisBarang: jenis_barang.value,
                            },
                        },
                        columns: [{ data: "IdSuratPesanan" }, { data: "Qty" }],
                    });

                    $("#pesananTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idsuratpesanan.value = selectedRow.IdSuratPesanan.trim();
                    satuan.value = selectedRow.Satuan.trim();
                    idpesanan.value = selectedRow.IdPesanan.trim();
                    tanggals.value = selectedRow.TglRencanaKirim;
                    jumlah_order2.value = selectedRow.Qty.trim();
                    // jumlah_order2.value = parseInt(selectedRow.Qty, 10);
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
                                url: "CopyTabelOrder/create",
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

                    // Mengisi kodeBarangDirubah dengan 6 karakter pertama dari kodeBarangAsal
                    // if (kodeBarangAsal.value !== "") {
                    //     kodeBarangDirubah.value =
                    //         kodeBarangAsal.value.substring(0, 6);
                    // }

                    // if (id_customer.value !== "") {
                    //     id_customers.value = id_customer.value;
                    //     customers.value = customer.value;
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
