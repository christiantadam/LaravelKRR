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
    let time_delivold = document.getElementById("time_delivold");
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
    let satuan = document.getElementById("satuan");
    let qty_sisa = document.getElementById("qty_sisa");
    let qty_produksi = document.getElementById("qty_produksi");
    let rencana = document.getElementById("rencana");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_stop_order = document.getElementById("btn_stop_order");
    let btn_transfer = document.getElementById("btn_transfer");
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
    satuan.readOnly = true;
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
            btn_transfer.hidden = true;
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
        satuan.value = "";
        satuan.readOnly = true;
        qty_sisa.value = "";
        qty_sisa.readOnly = false;
        qty_produksi.value = "";
        qty_produksi.readOnly = false;
        rencana.value = "";
        rencana.readOnly = true;
    }

    function formatTanggal(tanggal) {
        const [bulan, hari, tahun] = tanggal.split('/');
        return `${tahun}-${bulan.padStart(2, '0')}-${hari.padStart(2, '0')}`;
    }

    //#region Event Listener
    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_stop_order.disabled = true;
        btn_proses.disabled = true;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_nopesanan.disabled = true;
        btn_customers.disabled = false;
        btn_kodebarang2.disabled = false;
        btn_kodebarang.disabled = false;
        btn_pesanan.disabled = false;
        btn_customers.focus();
        proses = 1;
        cleardata();
        btn_transfer.hidden = false;
    });

    btn_transfer.addEventListener("click", function (event) {
        event.preventDefault();
        if (idsuratpesanan.value.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Isi data sales dahulu",
                showConfirmButton: true,
            });
            return; // Prevent the form submission
        } else {
            if (rencana.value == "") {
                time_deliv.valueAsDate = new Date();
                jumlah_order.value = qty_produksi.value;
                no_pesanan.value = idsuratpesanan.value;
                tanggal_dikerjakan.readOnly = false;
                tanggal_selesai.readOnly = false;
            } else {
                time_deliv.value = formatTanggal(rencana.value);
                jumlah_order.value = qty_produksi.value;
                no_pesanan.value = idsuratpesanan.value;
                tanggal_dikerjakan.readOnly = false;
                tanggal_selesai.readOnly = false;
            }
        }
        // $.ajax({
        //     url: "MaintenanceTabelOrder/getTransfer",
        //     type: "GET",
        //     data: {
        //         _token: csrfToken,
        //         kodebarangs: kodebarangs.value,
        //         jenis_barang: jenis_barang.value,
        //         IDSuratPesanan: idsuratpesanan.value,
        //     },
        //     success: function (data) {
        //         console.log(data);
        //         no_pesanan.value = data.IDSuratPesanan.trim();
        //         time_deliv.value = data.TglRencanaKirim ?? "";
        //         let originalQty = data.Qty.trim();
        //         let formattedQty = parseInt(originalQty, 10);
        //         jumlah_order.value = formattedQty;
        //         tanggal_dikerjakan.readOnly = false;
        //         tanggal_selesai.readOnly = false;
        //     },
        //     error: function (xhr, status, error) {
        //         var err = eval("(" + xhr.responseText + ")");
        //         alert(err.Message);
        //     },
        // });
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
        // btn_customer.focus();
        proses = 1;
        setTimeout(() => {
            btn_customer.focus();
        }, 300);
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
        // if (alasan.value.trim() === "") {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Warning!",
        //         text: "Isi alasan stop dahulu",
        //         showConfirmButton: true,
        //     });
        //     return;
        // }
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
        if (proses === 4) {
            if (alasan.value.trim() === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Warning!",
                    text: "Isi alasan stop dahulu",
                    showConfirmButton: true,
                });
                return;
            }
        }

        $.ajax({
            url: "/MaintenanceTabelOrder",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: proses,
                kodeBarangAsal: kodeBarangAsal.value,
                kodebarangs: kodebarangs.value,
                id_customer: id_customer.value,
                no_pesanan: no_pesanan.value,
                time_deliv: time_deliv.value,
                jumlah_order: jumlah_order.value,
                idpesanan: idpesanan.value,
                tanggal_dikerjakan: tanggal_dikerjakan.value,
                tanggal_selesai: tanggal_selesai.value,
                tanggal_j: tanggal_j.value,
                alasan: alasan.value,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data);
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: data.success,
                        showConfirmButton: false,
                        timer: 1500
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
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
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
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        $("#customerTable_filter input").on(
                            "keyup",
                            function () {
                                table
                                    .columns(1)
                                    .search(this.value)
                                    .draw();
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

                    if (proses === 1) {
                        console.log(proses);
                        btn_nopesanan.disabled = true;
                        setTimeout(() => {
                            tanggal_dikerjakan.focus();
                        }, 300);
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
                        setTimeout(() => {
                            $("#customersTable_filter input").focus();
                        }, 300);
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
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customersTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    customers.value = selectedRow.NamaCust.trim();
                    id_customers.value = selectedRow.KodeCust.trim();
                    setTimeout(() => {
                        btn_kodebarang2.focus();
                    }, 300);
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
                html: '<table id="barang2Table" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "90%",
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
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#barang2Table_filter input").focus();
                        }, 300);
                        $("#barang2Table tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "barang2Table")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kodeBarangs.value = selectedRow.NamaType.trim();
                    kodebarangs.value = selectedRow.IdBarang.trim().replace(
                        /\D/g,
                        ""
                    );
                    jenis_barang.value = selectedRow.IdBarang.trim().replace(
                        /[^a-zA-Z]/g,
                        ""
                    );
                    setTimeout(() => {
                        btn_pesanan.focus();
                    }, 300);
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
                title: "Select a No Surat Pesanan",
                html: '<table id="pesananTable" class="display" style="width:100%"><thead><tr><th>No Surat Pesanan</th><th>Qty</th></tr></thead><tbody></tbody></table>',
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
                                    data: "IDSuratPesanan",
                                },
                                {
                                    data: "Qty",
                                },
                            ],
                        });
                        setTimeout(() => {
                            $("#pesananTable_filter input").focus();
                        }, 300);
                        $("#pesananTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "pesananTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idsuratpesanan.value = selectedRow.IDSuratPesanan.trim();
                    idpesanan.value = selectedRow.IDPesanan ?? "";
                    let originalQty = selectedRow.Qty.trim();
                    let formattedQty = parseInt(originalQty, 10);
                    qty_sp.value = formattedQty;
                    qty_produksi.value = formattedQty;
                    $.ajax({
                        url: "MaintenanceTabelOrder/getSuratPesananDetailsExtra",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kodebarangs: kodebarangs.value,
                            jenis_barang: jenis_barang.value,
                            IDSuratPesanan: selectedRow.IDSuratPesanan.trim(),
                        },
                        success: function (data) {
                            console.log(data);
                            satuan.value = data.Satuan ?? "";
                            let originalDate = data.TglRencanaKirim ?? "";
                            if (originalDate == "") {
                                rencana.value = "";
                            } else {
                                let date = new Date(originalDate);
                                let formattedDate =
                                    date.toLocaleDateString("en-US");
                                rencana.value = formattedDate;
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    $.ajax({
                        url: "MaintenanceTabelOrder/checkSisaOrder",
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
                            // qty_sisa.focus();
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    Swal.fire({
                        icon: "question",
                        title: "Question!",
                        text: "Merubah Quantity",
                        // showConfirmButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Tidak",
                        showCancelButton: true,
                        focusConfirm: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setTimeout(() => {
                                qty_produksi.focus();
                                qty_produksi.select();
                            }, 300);
                        } else {
                            setTimeout(() => {
                                btn_transfer.focus();
                            }, 300);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    qty_produksi.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_transfer.focus();
        }
    });

    tanggal_dikerjakan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tanggal_selesai.focus();
        }
    });

    tanggal_selesai.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
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
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_pesanan.value = selectedRow.No_SuratPesanan.trim();
                    // time_deliv.value = selectedRow.Waktu_Delivery;

                    // if (proses === 1) {
                    //     btn_nopesanan.readOnly = true;
                    //     $.ajax({
                    //         url: "MaintenanceTabelOrder/getJumlahOrder",
                    //         type: "GET",
                    //         data: {
                    //             _token: csrfToken,
                    //             No_SuratPesanan:
                    //                 selectedRow.No_SuratPesanan.trim(),
                    //             kodeBarangAsal: kodeBarangAsal.value,
                    //             proses: proses,
                    //         },
                    //         success: function (data) {
                    //             console.log(data.data[0]);
                    //             // jumlah_order.value =
                    //             //     data.data[0].jumlah_order.trim();
                    //             btn_customers.focus();
                    //         },
                    //         error: function (xhr, status, error) {
                    //             var err = eval("(" + xhr.responseText + ")");
                    //             alert(err.Message);
                    //         },
                    //     });
                    // }

                    if (proses === 2) {
                        $.ajax({
                            url: "MaintenanceTabelOrder/getOrder",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kodeBarangAsal: kodeBarangAsal.value,
                                no_pesanan: selectedRow.No_SuratPesanan.trim(),
                            },
                            success: function (data) {
                                console.log(data);
                                jumlah_order.value = data.Jumlah_Order;
                                time_deliv.value = data.Waktu_Delivery;
                                jumlah_order.readOnly = false;
                                jumlah_order.focus();
                            },
                            error: function (xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    }

                    if (proses === 3) {
                        $.ajax({
                            url: "MaintenanceTabelOrder/getOrder",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kodeBarangAsal: kodeBarangAsal.value,
                                no_pesanan: selectedRow.No_SuratPesanan.trim(),
                            },
                            success: function (data) {
                                console.log(data);
                                jumlah_order.value = data.Jumlah_Order;
                                time_deliv.value = data.Waktu_Delivery;
                                jumlah_order.readOnly = false;
                                jumlah_order.focus();
                            },
                            error: function (xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    }

                    if (proses === 4) {
                        $.ajax({
                            url: "MaintenanceTabelOrder/getOrder",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kodeBarangAsal: kodeBarangAsal.value,
                                no_pesanan: selectedRow.No_SuratPesanan.trim(),
                            },
                            success: function (data) {
                                console.log(data);
                                jumlah_order.value = data.Jumlah_Order;
                                time_deliv.value = data.Waktu_Delivery;
                                alasan.readOnly = false;
                                alasan.focus();
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
