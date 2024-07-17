document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button-customer");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let btn_pesanan = document.getElementById("button-pesanan");
    let btn_warna = document.getElementById("button-warna");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let tanggal = document.getElementById("tanggal");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let no_suratpesanan = document.getElementById("no_suratpesanan");
    let delivery = document.getElementById("delivery");
    let jumlah_order = document.getElementById("jumlah_order");
    let ukuran = document.getElementById("ukuran");
    let rajutan = document.getElementById("rajutan");
    let denier = document.getElementById("denier");
    let type = document.getElementById("type");
    let iner = document.getElementById("iner");
    let warna = document.getElementById("warna");
    let packing = document.getElementById("packing");
    let no_referensi = document.getElementById("no_referensi");
    let halaman = document.getElementById("halaman");

    id_customer.readOnly = true;
    customer.readOnly = true;
    tanggal.readOnly = true;
    kodeBarangAsal.readOnly = true;
    no_suratpesanan.readOnly = true;
    jumlah_order.readOnly = true;
    ukuran.readOnly = true;
    rajutan.readOnly = true;
    denier.readOnly = true;
    type.readOnly = true;
    delivery.readOnly = true;
    warna.readOnly = true;

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

    btn_print.addEventListener("click", function (event) {
        event.preventDefault();
        if (no_suratpesanan.value.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Isi kode barang terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        $.ajax({
            url: "OrderPress/printReport",
            type: "GET",
            data: {
                _token: csrfToken,
                no_suratpesanan: no_suratpesanan.value,
                kodeBarangAsal: kodeBarangAsal.value,
                delivery: delivery.value,
                no_referensi: no_referensi.value,
                warna: warna.value,
                packing: packing.value,
                halaman: halaman.value,
                iner: iner.value,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data.data[0]);
                var currentDate = new Date();
                var formattedDate =
                    currentDate.getMonth() +
                    1 +
                    "/" +
                    currentDate.getDate() +
                    "/" +
                    currentDate.getFullYear();

                document.getElementById("tanggal_print").textContent =
                    formattedDate;

                document.getElementById("no_referensi_print").innerHTML =
                    no_referensi.value;

                var currentPage = 1;
                var totalPages = 1;
                document.getElementById("halaman_print").textContent =
                    currentPage + " dari " + totalPages;

                document.getElementById("kode_tabel").innerHTML =
                    data.data[0].Kode_Barang;
                document.getElementById("type_tabel").innerHTML =
                    data.data[0].ModelBB +
                    "&nbsp;TOP&nbsp;" +
                    data.data[0].ModelCA +
                    "&nbsp;BOTTOM&nbsp;" +
                    data.data[0].ModelCB;
                document.getElementById("ukuran_tabel").innerHTML =
                    data.data[0].Lebar_BB +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    data.data[0].Panjang_BB +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    data.data[0].Tinggi_BB;
                document.getElementById("nosp_tabel").innerHTML =
                    data.data[0].No_SuratPesanan;
                document.getElementById("rajutan_tabel").innerHTML =
                    data.data[0].WA_Rajutan +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    data.data[0].WE_Rajutan;
                // var jumlahOrder = data.data[0].Jumlah_Order;
                // var formattedJumlahOrder = jumlahOrder.toLocaleString("en-US");
                // document.getElementById("qty_tabel").innerHTML =
                //     "&nbsp;" + formattedJumlahOrder;
                document.getElementById("qty_tabel").innerHTML =
                    parseFloat(data.data[0].Jumlah_Order).toFixed(2) === ".00"
                        ? "0.00"
                        : parseFloat(data.data[0].Jumlah_Order).toLocaleString(
                              undefined,
                              {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                              }
                          );
                document.getElementById("denier_tabel").innerHTML =
                    "&nbsp;" + parseFloat(data.data[0].Denier).toFixed(2) ===
                    ".00"
                        ? "0.00"
                        : parseFloat(data.data[0].Denier).toLocaleString(
                              undefined,
                              {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                              }
                          );
                document.getElementById("delivery_tabel").innerHTML =
                    data.data[0].Waktu_Delivery;
                document.getElementById("warna_tabel").innerHTML =
                    "&nbsp;" + data.data[0].Warna;
                document.getElementById("packing_tabel").innerHTML =
                    data.data[0].Packing;
                var inerValue = data.data[0].Iner;

                // Ubah nilai menjadi strip ("-") jika nilai adalah "N"
                var innerHTMLValue =
                    inerValue === "N" ? "&nbsp;-" : "&nbsp;" + inerValue;

                // Masukkan nilai yang sudah diformat ke dalam elemen HTML
                document.getElementById("inner_tabel").innerHTML =
                    innerHTMLValue;

                //Catatan
                // Ambil teks Keterangan dari data
                let keterangan = data.data[0].Keterangan;

                // Ganti \r\n dengan <br> di depannya
                keterangan = keterangan.replace(/\r\n/g, "<br>");

                // Tambahkan non-breaking space di depan teks
                keterangan = "&nbsp;" + keterangan;

                // Tampilkan hasilnya dalam elemen HTML
                document.getElementById("catatan_tabel").innerHTML = keterangan;

                // document.getElementById("tanggal_tabel").innerHTML =
                //     "&nbsp;" + formattedDate;

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
                window.print();
            },
        });
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
                                url: "OrderPress/getListCustomer",
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
                                url: "OrderPress/create",
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
                                url: "OrderPress/getDeliveryList",
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
                        url: "OrderPress/getData",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            No_SuratPesanan: selectedRow.No_SuratPesanan.trim(),
                            Waktu_Delivery: selectedRow.Waktu_Delivery.trim(),
                            kodeBarangAsal: kodeBarangAsal.value,
                        },
                        success: function (data) {
                            console.log(data.data[0]);
                            jumlah_order.value =
                                data.data[0].jumlah_order.trim();
                            ukuran.value = data.data[0].ukuran.trim();
                            rajutan.value = data.data[0].rajutan.trim();
                            denier.value = data.data[0].denier.trim();
                            type.value = data.data[0].type.trim();
                            iner.value = data.data[0].iner.trim();
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

    btn_warna.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Warna",
                html: '<table id="warnaTable" class="display" style="width:100%"><thead><tr><th>Nama Warna</th><th>Kode</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#warnaTable")
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
                        const table = $("#warnaTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "OrderPress/getWarna",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Warna",
                                },
                                {
                                    data: "Kode_Warna",
                                },
                            ],
                        });
                        $("#warnaTable tbody").on("click", "tr", function () {
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
                    warna.value = selectedRow.Nama_Warna.trim();
                    // id_customer.value = selectedRow.Kode_Customer.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
