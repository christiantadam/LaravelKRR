document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button_customer");
    let btn_kodebarang = document.getElementById("button_kodebarang");
    let btn_nopesanan = document.getElementById("button_nopesanan");
    let btn_customers = document.getElementById("button_customers");
    let btn_kodebarang2 = document.getElementById("button_kodebarang2");
    let btn_pesanan = document.getElementById("button_pesanan");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    // let tanggal = document.getElementById("tanggal");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let no_pesanan = document.getElementById("no_pesanan");
    let time_deliv = document.getElementById("time_deliv");
    let jumlah_order = document.getElementById("jumlah_order");
    let tanggal_dikerjakan = document.getElementById("tanggal_dikerjakan");
    let tanggal_selesai = document.getElementById("tanggal_selesai");
    let alasan = document.getElementById("alasan");
    let id_customers = document.getElementById("id_customers");
    let customers = document.getElementById("customers");
    let kodebarangs = document.getElementById("kodebarangs");
    let kodeBarangs = document.getElementById("kodeBarangs");
    let idsuratpesanan = document.getElementById("idsuratpesanan");
    let idpesanan = document.getElementById("idpesanan");
    let jenis_barang = document.getElementById("jenis_barang");
    let tanggal_j = document.getElementById("tanggal_j");
    let qty_sp = document.getElementById("qty_sp");
    let qty_sisa = document.getElementById("qty_sisa");
    let qty_produksi = document.getElementById("qty_produksi");
    let rencana = document.getElementById("rencana");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_stop_order = document.getElementById("btn_stop_order");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let tmb = 1;
    let proses;

    time_deliv.valueAsDate = new Date();
    tanggal_dikerjakan.valueAsDate = new Date();
    tanggal_selesai.valueAsDate = new Date();
    tanggal_j.valueAsDate = new Date();
    aktif_tombol(tmb);
    btn_isi.focus();
    id_customer.readOnly = true;
    customer.readOnly = true;
    kodeBarangAsal.readOnly = true;
    // tanggal.readOnly = true;
    time_deliv.readOnly = true;
    btn_nopesanan.readOnly = true;
    btn_customers.readOnly = true;
    btn_kodebarang2.readOnly = true;
    no_pesanan.readOnly = true;
    jumlah_order.readOnly = true;
    tanggal_dikerjakan.readOnly = true;
    tanggal_selesai.readOnly = true;
    alasan.readOnly = true;
    id_customers.readOnly = true;
    customers.readOnly = true;
    kodebarangs.readOnly = true;
    kodeBarangs.readOnly = true;
    idsuratpesanan.readOnly = true;
    idpesanan.readOnly = true;
    jenis_barang.readOnly = true;
    tanggal_j.readOnly = false;
    qty_sp.readOnly = false;
    qty_sisa.readOnly = false;
    qty_produksi.readOnly = false;
    rencana.readOnly = true;

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

    //#region Function
    function aktif_tombol(tmb) {
        console.log(tmb);
        if (tmb == 1) {
            btn_isi.disabled = false;
            btn_koreksi.disabled = false;
            btn_hapus.disabled = false;
            btn_stop_order.disabled = false;
            btn_proses.disabled = true;
            btn_batal.disabled = true;
            btn_customer.disabled = true;
            btn_nopesanan.disabled = true;
            btn_customers.disabled = true;
            btn_kodebarang2.disabled = true;
            btn_kodebarang.disabled = true;
            btn_pesanan.disabled = true;
            btn_isi.focus();
        } else if (tmb == 2) {
            btn_isi.disabled = true;
            btn_koreksi.disabled = true;
            btn_hapus.disabled = true;
            btn_stop_order.disabled = true;
            btn_proses.disabled = false;
            btn_batal.disabled = false;
            btn_customer.disabled = false;
            btn_nopesanan.disabled = false;
            btn_customers.disabled = false;
            btn_kodebarang2.disabled = false;
            btn_kodebarang.disabled = false;
            btn_pesanan.disabled = false;
            btn_customer.focus();
        }
    }

    function cleardata() {
        time_deliv.valueAsDate = new Date();
        tanggal_dikerjakan.valueAsDate = new Date();
        tanggal_selesai.valueAsDate = new Date();
        tanggal_j.valueAsDate = new Date();
        id_customer.value = "";
        id_customer.readOnly = true;
        customer.value = "";
        customer.readOnly = true;
        // tanggal.value = "";
        // tanggal.readOnly = true;
        kodeBarangAsal.value = "";
        kodeBarangAsal.readOnly = true;
        no_pesanan.value = "";
        no_pesanan.readOnly = true;
        // time_deliv.value = "";
        time_deliv.readOnly = true;
        jumlah_order.value = "";
        jumlah_order.readOnly = true;
        // tanggal_dikerjakan.value = "";
        tanggal_dikerjakan.readOnly = true;
        // tanggal_selesai.value = "";
        tanggal_selesai.readOnly = true;
        alasan.value = "";
        alasan.readOnly = true;
        id_customers.value = "";
        id_customers.readOnly = true;
        customers.value = "";
        customers.readOnly = true;
        kodebarangs.value = "";
        kodebarangs.readOnly = true;
        kodeBarangs.value = "";
        kodeBarangs.readOnly = true;
        idsuratpesanan.value = "";
        idsuratpesanan.readOnly = true;
        idpesanan.value = "";
        idpesanan.readOnly = true;
        jenis_barang.value = "";
        jenis_barang.readOnly = true;
        // tanggal_j.value = "";
        tanggal_j.readOnly = false;
        qty_sp.value = "";
        qty_sp.readOnly = false;
        qty_sisa.value = "";
        qty_sisa.readOnly = false;
        qty_produksi.value = "";
        qty_produksi.readOnly = false;
        rencana.value = "";
        rencana.readOnly = true;
    }

    //#region Event Listener
    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        tmb = 2;
        proses = 1;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        tmb = 2;
        proses = 2;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        tmb = 2;
        proses = 3;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_stop_order.addEventListener("click", function (event) {
        event.preventDefault();
        tmb = 2;
        proses = 4;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        tmb = 1;
        proses = 0;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (no_suratpesanan.value.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Isi data terlebih dahulu",
                showConfirmButton: true,
            });
            return; // Prevent the form submission
        }
        $.ajax({
            url: "/PermohonanRetur",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: proses,
                time_deliv: time_deliv.value,
                no_suratpesanan: no_suratpesanan.value,
                kodeBarangAsal: kodeBarangAsal.value,
                jumlah_retur: jumlah_retur.value,
                no_referensi: no_referensi.value,
            },
            success: function (data) {
                console.log(data);
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: data.success,
                        showConfirmButton: false,
                    });
                } else if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                }
                // sisa.value = data.data[0].Buffer.trim();
            },
            error: function (xhr, status, error) {
                // Menampilkan pesan kesalahan
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
                    text: error,
                    showConfirmButton: false,
                });
            },
        });
        tmb = 1;
        aktif_tombol(tmb);
        cleardata();
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
                    $(document).ready(function () {
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceTabelOrder/getListCustomer",
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
                    $(document).ready(function () {
                        const table = $("#barangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceTabelOrder/create",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodeCustomer: id_customer.value,
                                    proses: proses,
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

                    if (proses === 1) {
                        console.log(proses);
                        btn_nopesanan.disabled = true;
                        btn_customers.focus();
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_customers.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customersTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#customersTable")
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
                        const table = $("#customersTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceTabelOrder/getCustomerDetails",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,

                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "KodeCust",
                                },
                            ],
                        });
                        $("#customersTable tbody").on(
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
                    customers.value = selectedRow.NamaCust.trim();
                    id_customers.value = selectedRow.KodeCust.trim();
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
                title: "Select a Customer",
                html: '<table id="barang2Table" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#barang2Table")
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
                        const table = $("#barang2Table").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceTabelOrder/getBarangDetails",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_customers: id_customers.value,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaType",
                                },
                                {
                                    data: "IdBarang",
                                },
                            ],
                        });
                        $("#barang2Table tbody").on(
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
                    kodeBarangs.value = selectedRow.NamaType.trim();
                    kodebarangs.value = selectedRow.IdBarang.trim().replace(/\D/g, '');
                    jenis_barang.value = selectedRow.IdBarang.trim().replace(/[^a-zA-Z]/g, '');
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
                title: "Select a Customer",
                html: '<table id="pesananTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
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
                    $(document).ready(function () {
                        const table = $("#pesananTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceTabelOrder/getSuratPesananDetails",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodebarangs: kodebarangs.value,
                                    jenis_barang: jenis_barang.value,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaType",
                                },
                                {
                                    data: "IdBarang",
                                },
                            ],
                        });
                        $("#pesananTable tbody").on(
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
                    kodeBarangs.value = selectedRow.NamaType.trim();
                    kodebarangs.value = selectedRow.IdBarang.trim().slice(0, -3);
                    jenis_barang.value = selectedRow.IdBarang.trim().slice(-3);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_nopesanan.addEventListener("click", async function (event) {
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
                                url: "MaintenanceTabelOrder/getPesanan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodeBarangAsal: kodeBarangAsal.value,
                                    proses: proses,
                                },
                            },
                            columns: [
                                {
                                    data: "No_SuratPesanan",
                                },
                                {
                                    data: "Waktu_Delivery",
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
                    no_pesanan.value = selectedRow.No_SuratPesanan.trim();
                    // time_deliv.value = selectedRow.Delivery.trim();

                    if (proses === 1) {
                        btn_nopesanan.readOnly = true;
                        $.ajax({
                            url: "MaintenanceTabelOrder/getJumlahOrder",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                No_SuratPesanan: selectedRow.No_SuratPesanan.trim(),
                                kodeBarangAsal: kodeBarangAsal.value,
                                proses: proses,
                            },
                            success: function (data) {
                                console.log(data.data[0]);
                                // jumlah_order.value =
                                //     data.data[0].jumlah_order.trim();
                                btn_customers.focus();
                            },
                            error: function (xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    }

                    if (proses === 2) {
                        $.ajax({
                            url: "MaintenanceTabelOrder/getJumlahOrder",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                No_SuratPesanan: selectedRow.No_SuratPesanan.trim(),
                                Waktu_Delivery: selectedRow.Delivery.trim(),
                                kodeBarangAsal: kodeBarangAsal.value,
                                proses: proses,
                            },
                            success: function (data) {
                                console.log(data.data[0]);
                                jumlah_retur.value =
                                    data.data[0].jumlah_retur.trim();
                                no_referensi.value = data.data[0].referensi;
                                jumlah_retur.focus();
                            },
                            error: function (xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    }

                    if (proses === 3) {
                        jumlah_retur.readOnly = false;
                        $.ajax({
                            url: "PermohonanRetur/processNoSP",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                No_SuratPesanan: selectedRow.No_SuratPesanan.trim(),
                                Waktu_Delivery: selectedRow.Delivery.trim(),
                                kodeBarangAsal: kodeBarangAsal.value,
                                proses: proses,
                            },
                            success: function (data) {
                                console.log(data.data[0]);
                                jumlah_retur.value =
                                    data.data[0].jumlah_retur.trim();
                                no_referensi.value = data.data[0].referensi;
                                jumlah_retur.focus();
                            },
                            error: function (xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
