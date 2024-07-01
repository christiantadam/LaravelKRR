document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button_customer");
    let btn_kodebarang = document.getElementById("button_kodebarang");
    let btn_pesanan = document.getElementById("button_pesanan");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let tanggal = document.getElementById("tanggal");
    let no_suratpesanan = document.getElementById("no_suratpesanan");
    let time_deliv = document.getElementById("time_deliv");
    let jumlah_order = document.getElementById("jumlah_order");
    let jumlah_retur = document.getElementById("jumlah_retur");
    let no_referensi = document.getElementById("no_referensi");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let tmb = 1;
    let proses;

    time_deliv.valueAsDate = new Date();
    aktif_tombol(tmb);
    btn_isi.focus();
    id_customer.readOnly = true;
    customer.readOnly = true;
    kodeBarangAsal.readOnly = true;
    tanggal.readOnly = true;
    no_suratpesanan.readOnly = true;
    time_deliv.readOnly = true;
    jumlah_order.readOnly = true;
    jumlah_retur.readOnly = true;
    no_referensi.readOnly = true;

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
            btn_proses.disabled = true;
            btn_batal.disabled = true;
            btn_customer.disabled = true;
            btn_kodebarang.disabled = true;
            btn_pesanan.disabled = true;
            btn_isi.focus();
        } else if (tmb == 2) {
            btn_isi.disabled = true;
            btn_koreksi.disabled = true;
            btn_hapus.disabled = true;
            btn_proses.disabled = false;
            btn_batal.disabled = false;
            btn_customer.disabled = false;
            btn_kodebarang.disabled = false;
            btn_pesanan.disabled = false;
            btn_customer.focus();
        }
    }

    function cleardata() {
        time_deliv.valueAsDate = new Date();
        customer.value = "";
        customer.readOnly = true;
        id_customer.value = "";
        id_customer.readOnly = true;
        kodeBarangAsal.value = "";
        kodeBarangAsal.readOnly = true;
        tanggal.value = "";
        tanggal.readOnly = true;
        no_suratpesanan.value = "";
        no_suratpesanan.readOnly = true;
        time_deliv.readOnly = true;
        jumlah_order.value = "";
        jumlah_order.readOnly = true;
        jumlah_retur.value = "";
        jumlah_retur.readOnly = true;
        no_referensi.value = "";
        no_referensi.readOnly = true;
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
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: data.success,
                    showConfirmButton: false,
                });
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
                                url: "PermohonanRetur/getListCustomer",
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
                                url: "PermohonanRetur/create",
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

    btn_pesanan.addEventListener("click", async function (event) {
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
                                url: "PermohonanRetur/getNoSP",
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
                    no_suratpesanan.value = selectedRow.NoSP.trim();
                    time_deliv.value = selectedRow.Delivery.trim();

                    if (proses === 1) {
                        jumlah_retur.readOnly = false;
                        $.ajax({
                            url: "PermohonanRetur/processNoSP",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                No_SuratPesanan: selectedRow.NoSP.trim(),
                                kodeBarangAsal: kodeBarangAsal.value,
                                proses: proses,
                            },
                            success: function (data) {
                                console.log(data.data[0]);
                                jumlah_order.value = data.data[0].jumlah_order.trim();
                                jumlah_retur.focus();
                            },
                            error: function (xhr, status, error) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    }

                    if (proses === 2) {
                        jumlah_retur.readOnly = false;
                        $.ajax({
                            url: "PermohonanRetur/processNoSP",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                No_SuratPesanan: selectedRow.NoSP.trim(),
                                Waktu_Delivery: selectedRow.Delivery.trim(),
                                kodeBarangAsal: kodeBarangAsal.value,
                                proses: proses,
                            },
                            success: function (data) {
                                console.log(data.data[0]);
                                jumlah_retur.value = data.data[0].jumlah_retur.trim();
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
                                No_SuratPesanan: selectedRow.NoSP.trim(),
                                Waktu_Delivery: selectedRow.Delivery.trim(),
                                kodeBarangAsal: kodeBarangAsal.value,
                                proses: proses,
                            },
                            success: function (data) {
                                console.log(data.data[0]);
                                jumlah_retur.value = data.data[0].jumlah_retur.trim();
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
