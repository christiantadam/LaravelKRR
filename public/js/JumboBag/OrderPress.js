document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button-customer");
    let btn_kodebarang = document.getElementById("button-kode-barang");
    let btn_pesanan = document.getElementById("button-pesanan");
    let btn_warna = document.getElementById("button-warna");
    let btn_print = document.getElementById("btn_print");
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
    let id_barang = document.getElementById("id_barang");

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
    id_barang.readOnly = true;
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

    const imageUpload = document.getElementById("imageUpload");
    const previewImg = document.getElementById("previewImg");
    const gambar_print = document.getElementById("gambar_print");
    const imagePreviewContainer = document.getElementById(
        "imagePreviewContainer"
    );
    const clearImage = document.getElementById("clearImage");

    imageUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
                imagePreviewContainer.style.display = "block";
                previewImg.dataset.base64 = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    clearImage.addEventListener("click", function () {
        imageUpload.value = "";
        previewImg.src = "#";
        previewImg.style.display = "none";
        imagePreviewContainer.style.display = "none";
    });

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

        const formData = new FormData();

        // Append other form data
        formData.append("_token", csrfToken);
        formData.append("no_suratpesanan", no_suratpesanan.value);
        formData.append("kodeBarangAsal", kodeBarangAsal.value);
        formData.append("delivery", delivery.value);
        formData.append("no_referensi", no_referensi.value);
        formData.append("warna", warna.value);
        formData.append("packing", packing.value);
        formData.append("cat", halaman.value);
        formData.append("iner", iner.value);
        formData.append("typeForm", "printReport");

        // Append the base64 encoded image, if available
        if (previewImg.src && previewImg.src.startsWith("data:image/")) {
            const base64Data = previewImg.src.split(",")[1];
            formData.append("foto", base64Data); // Send base64 encoded data directly
        } else {
            formData.delete("foto"); // Clear the image data if there is no image
        }

        $.ajax({
            url: "OrderPress",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data);
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

                document.getElementById("tanggal2_print").textContent =
                    formattedDate;

                document.getElementById("no_referensi_print").innerHTML =
                    no_referensi.value;

                document.getElementById("no_referensi2_print").innerHTML =
                    no_referensi.value;

                var currentPage = 1;
                var totalPages = 1;
                // document.getElementById("halaman_print").textContent =
                //     currentPage + " dari " + totalPages;
                document.getElementById("halaman_print").textContent =
                    data.data[0].IdBarang;

                document.getElementById("halaman2_print").textContent =
                    data.data[0].IdBarang;

                // Uncomment and handle DOM updates with response data
                document.getElementById("kode_tabel").innerHTML =
                    data.data[0].Kode_Barang;
                document.getElementById("type_tabel").innerHTML =
                    data.data[0].ModelBB +
                    "&nbsp;TOP&nbsp;" +
                    data.data[0].ModelCA +
                    "&nbsp;BOTTOM&nbsp;" +
                    data.data[0].ModelCB;
                document.getElementById("ukuran_tabel").innerHTML =
                    parseFloat(data.data[0].Panjang_BB) +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    parseFloat(data.data[0].Lebar_BB) +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    parseFloat(data.data[0].Tinggi_BB);
                document.getElementById("nosp_tabel").innerHTML =
                    data.data[0].No_SuratPesanan;
                document.getElementById("rajutan_tabel").innerHTML =
                    data.data[0].WA_Rajutan +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    data.data[0].WE_Rajutan;
                document.getElementById("qty_tabel").innerHTML = parseFloat(
                    data.data[0].Jumlah_Order
                ).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
                document.getElementById("denier_tabel").innerHTML = parseFloat(
                    data.data[0].Denier
                ).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
                document.getElementById("delivery_tabel").innerHTML =
                    data.data[0].Waktu_Delivery;
                document.getElementById("warna_tabel").innerHTML =
                    "&nbsp;" + data.data[0].Warna;
                document.getElementById("packing_tabel").innerHTML =
                    data.data[0].Packing;
                var inerValue = data.data[0].Iner;
                var innerHTMLValue =
                    inerValue === "N"
                        ? "&nbsp;-"
                        : "&nbsp;" +
                          data.data[0].Panjang_Potongan +
                          "&nbsp;X&nbsp;" +
                          data.data[0].Lebar_Potongan +
                          "&nbsp;X&nbsp;" +
                          data.data[0].Tebal_Iner +
                          "&nbsp;Mikron&nbsp;" +
                          data.data[0].Seal;
                document.getElementById("inner_tabel").innerHTML =
                    innerHTMLValue;
                // let keterangan = data.data[0].Catatan.replace(/\r\n/g, "<br>");s
                // keterangan = "&nbsp;" + keterangan;
                document.getElementById("catatan_tabel").innerHTML = data
                    .data[0].Catatan
                    ? "&nbsp;" +
                      data.data[0].Catatan.replace(/\r\n/g, "<br>&nbsp;")
                    : "";
                // let keterangan2 = data.data[0].StdWaktu.replace(/\r\n/g, "<br>");
                // keterangan2 = "&nbsp;" + keterangan2;
                document.getElementById("stdW_tabel").innerHTML =
                    "&nbsp;" + data.data[0].StdWaktu;
                if (data.data[0].Foto) {
                    gambar_print.src = data.data[0].Foto;
                    gambar_print.style.display = "block";
                } else {
                    gambar_print.src = null;
                    gambar_print.style.display = "none";
                }
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

        setTimeout(() => {
            btn_customer.focus();
        }, 300);
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
                            // paging: false,
                            // scrollY: "400px",
                            // scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        $("#customerTable_filter input").on(
                            "keyup",
                            function () {
                                table.columns(1).search(this.value).draw();
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
                            // paging: false,
                            // scrollY: "400px",
                            // scrollCollapse: true,
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
                            // paging: false,
                            // scrollY: "400px",
                            // scrollCollapse: true,
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
                            id_barang.value = data.data[0].idBarang.trim();
                            // Display the photo
                            if (data.data[0].foto) {
                                previewImg.src = data.data[0].foto;
                                previewImg.style.display = "block";
                                imagePreviewContainer.style.display = "block";
                            } else {
                                previewImg.src = null;
                                previewImg.style.display = "none";
                                imagePreviewContainer.style.display = "none";
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        btn_warna.focus();
                    }, 300);
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
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#warnaTable_filter input").focus();
                        }, 300);
                        $("#warnaTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "warnaTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    warna.value = selectedRow.Nama_Warna.trim();
                    // id_customer.value = selectedRow.Kode_Customer.trim();
                    setTimeout(() => {
                        packing.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    packing.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            no_referensi.focus();
        }
    });

    no_referensi.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            halaman.focus();
        }
    });

    halaman.addEventListener("keydown", function (event) {
        if (event.key === "Tab") {
            event.preventDefault();
            btn_print.focus();
        }
    });
});
