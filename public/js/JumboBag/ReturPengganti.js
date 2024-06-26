document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button-customer");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let btn_pesanan = document.getElementById("button-pesanan");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let tanggal = document.getElementById("tanggal");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let no_suratpesanan = document.getElementById("no_suratpesanan");
    let delivery = document.getElementById("delivery");
    let jumlah_retur = document.getElementById("jumlah_retur");
    let jumlah_press = document.getElementById("jumlah_press");
    let no_referensi = document.getElementById("no_referensi");
    let jumlah = document.getElementById("jumlah");

    id_customer.readOnly = true;
    customer.readOnly = true;
    tanggal.readOnly = true;
    kodeBarangAsal.readOnly = true;
    no_suratpesanan.readOnly = true;
    delivery.readOnly = true;
    jumlah_retur.readOnly = true;
    jumlah_press.readOnly = true;
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
                                url: "ReturPengganti/getListCustomer",
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
                                url: "ReturPengganti/create",
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
                                url: "ReturPengganti/getnoSP",
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
                    no_suratpesanan.value = selectedRow.No_SuratPesanan.trim();
                    delivery.value = selectedRow.Waktu_Delivery.trim();
                    $.ajax({
                        url: "ReturPengganti/getRetur",
                        type: 'GET',
                        data: {
                            _token: csrfToken,
                            No_SuratPesanan: selectedRow.No_SuratPesanan.trim(),
                            Waktu_Delivery: selectedRow.Waktu_Delivery.trim(),
                            kodeBarangAsal: kodeBarangAsal.value,
                        },
                        success: function( data ){
                            console.log(data.data[0]);
                            jumlah_retur.value = data.data[0].jumlah_retur.trim();
                            jumlah_press.value = data.data[0].Jumlah_Produksi.trim();
                            no_referensi.value = data.data[0].referensi.trim();
                        },
                        error: function(xhr, status, error){
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

});
