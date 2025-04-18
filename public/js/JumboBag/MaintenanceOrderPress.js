document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_customer = document.getElementById("button-customer");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let btn_pesanan = document.getElementById("button-pesanan");
    let btn_simpan = document.getElementById("btn_simpan");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let tanggal = document.getElementById("tanggal");
    let tanggals = document.getElementById("tanggals");
    let tanggalf = document.getElementById("tanggalf");
    let no_suratpesanan = document.getElementById("no_suratpesanan");
    let delivery = document.getElementById("delivery");
    let jumlah_order = document.getElementById("jumlah_order");
    let jumlah_press = document.getElementById("jumlah_press");
    let stok1 = document.getElementById("stok1");
    let stok2 = document.getElementById("stok2");
    let button_stok = document.getElementById("button_stok");
    let sisa = document.getElementById("sisa");
    let jumlah = document.getElementById("jumlah");

    id_customer.readOnly = true;
    customer.readOnly = true;
    tanggal.readOnly = true;
    kodeBarangAsal.readOnly = true;
    tanggals.readOnly = false;
    no_suratpesanan.readOnly = true;
    delivery.readOnly = true;
    jumlah_order.readOnly = true;
    jumlah_press.readOnly = true;
    stok1.readOnly = true;
    stok2.readOnly = true;
    button_stok.readOnly = true;
    sisa.readOnly = true;

    tanggals.valueAsDate = new Date();
    tanggalf.valueAsDate = new Date();
    btn_customer.focus();

    if (successMessage) {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: successMessage,
            showConfirmButton: false,
        });
    } else if (errorMessage) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            showConfirmButton: false,
        });
    }

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
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
                                url: "MaintenanceOrderPress/getListCustomer",
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
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        $("#customerTable_filter input").on(
                            "keyup",
                            function () {
                                table
                                    .columns(1) // Kolom kedua (Kode_Customer)
                                    .search(this.value) // Cari berdasarkan input pencarian
                                    .draw(); // Perbarui hasil pencarian
                            }
                        );
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
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    customer.value = selectedRow.Nama_Customer.trim();
                    id_customer.value = selectedRow.Kode_Customer.trim();
                    setTimeout(() => {
                        btn_kodebarang.focus();
                    }, 300);
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
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#barangTable_filter input").focus();
                        }, 300);
                        $("#barangTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "barangTable")
                        );
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kodeBarangAsal.value = selectedRow.Kode_Barang.trim();
                    tanggal.value = selectedRow.tanggal.trim();
                    setTimeout(() => {
                        btn_pesanan.focus();
                    }, 300);

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

    btn_pesanan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a No Pesanan",
                html: '<table id="nopesananTable" class="display" style="width:100%"><thead><tr><th>No Surat Pesanan</th><th>Waktu Delivery</th><th>Finish</th></tr></thead><tbody></tbody></table>',
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
                                url: "MaintenanceOrderPress/getNoSP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodeBarangAsal: kodeBarangAsal.value,
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
                                {
                                    data: "finish",
                                    // render: function (data, type, row) {
                                    //     if (data) {
                                    //         // Buat objek Date dari data
                                    //         var date = new Date(data);
                                    //         // Ambil bulan, hari, dan tahun
                                    //         var month = ("0" + (date.getMonth() + 1)).slice(-2); // getMonth() dimulai dari 0 (Jan = 0)
                                    //         var day = ("0" + date.getDate()).slice(-2);
                                    //         var year = date.getFullYear();
                                    //         // Gabungkan dalam format m-d-Y
                                    //         var formattedDate = month + '-' + day + '-' + year;
                                    //         return formattedDate;
                                    //     }
                                    //     return "";
                                    // }
                                }
                            ],
                            columnDefs: [{ targets: [2], visible: false }],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#nopesananTable_filter input").focus();
                        }, 300);
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
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "nopesananTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    if (selectedRow.finish) {
                        // Buat objek Date dari selectedRow.finish
                        var date = new Date(selectedRow.finish.trim());

                        // Ambil tahun, bulan, dan hari dengan format yang benar (yyyy-MM-dd)
                        var year = date.getFullYear();
                        var month = ("0" + (date.getMonth() + 1)).slice(-2); // getMonth() dimulai dari 0
                        var day = ("0" + date.getDate()).slice(-2);

                        // Gabungkan menjadi format yyyy-MM-dd
                        var formattedDate = year + '-' + month + '-' + day;

                        // Set nilai ke tanggalf.value dengan format yyyy-MM-dd
                        tanggalf.value = formattedDate;
                    } else {
                        tanggalf.value = null; // Atur menjadi kosong jika tidak ada tanggal
                    }
                    console.log(selectedRow.finish);
                    no_suratpesanan.value = selectedRow.NoSP.trim();
                    delivery.value = selectedRow.Delivery.trim();
                    jumlah_order.value = selectedRow.JumlahOrder.trim();
                    jumlah_press.value = selectedRow.JumlahPress.trim();
                    tanggals.value = selectedRow.start.trim();
                    if (selectedRow.finish !== null) {
                        button_stok.disabled = true;
                        tanggals.readOnly = true;
                        tanggalf.readOnly = true;
                        jumlah.readOnly = true;
                        btn_simpan.disabled = true;
                    }else{
                        button_stok.disabled = false;
                        tanggals.readOnly = false;
                        tanggalf.readOnly = false;
                        jumlah.readOnly = false;
                        btn_simpan.disabled = false;
                        tanggalf.valueAsDate = new Date();
                    }
                    // tanggalf.value = selectedRow.finish.trim();

                    setTimeout(() => {
                        tanggals.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    button_stok.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a No Pesanan",
                html: '<table id="stokTable" class="display" style="width:100%"><thead><tr><th>No Surat Pesanan</th><th>Waktu Delivery</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#stokTable")
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
                        const table = $("#stokTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceOrderPress/getBuffer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodeBarangAsal: kodeBarangAsal.value,
                                },
                            },
                            columns: [
                                {
                                    data: "No_SuratPesanan",
                                },
                                {
                                    data: "Waktu_Delivery",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#stokTable_filter input").focus();
                        }, 300);
                        $("#stokTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "stokTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    stok2.value = selectedRow.No_SuratPesanan.trim();
                    stok1.value = selectedRow.Waktu_Delivery.trim();
                    $.ajax({
                        url: "MaintenanceOrderPress/getData",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            No_SuratPesanan: selectedRow.No_SuratPesanan.trim(),
                            Waktu_Delivery: selectedRow.Waktu_Delivery.trim(),
                            kodeBarangAsal: kodeBarangAsal.value,
                        },
                        success: function (data) {
                            console.log(data.data[0]);
                            sisa.value = data.data[0].Buffer.trim();
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
        // console.log(selectedRow);
    });
});
