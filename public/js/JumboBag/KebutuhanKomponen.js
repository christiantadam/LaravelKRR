$(document).ready(function () {
    //#region Get element by ID
    let button_tambahKebutuhan = document.getElementById("button_tambahKebutuhan"); // prettier-ignore
    let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    const customerJBB = $("#customerJBB"); // prettier-ignore
    const kodeBarangJBB = $("#kodeBarangJBB"); // prettier-ignore
    const lokasiJBB = $("#lokasiJBB"); // prettier-ignore
    let jumlahKebutuhan = document.getElementById("jumlahKebutuhan"); // prettier-ignore
    let modal_ok = document.getElementById("modal_ok"); // prettier-ignore
    let tanggalKebutuhanAwal = document.getElementById('tanggalKebutuhanAwal'); // prettier-ignore
    let tanggalKebutuhanAkhir = document.getElementById('tanggalKebutuhanAkhir'); // prettier-ignore
    let detailKebutuhanKomponenLabel = document.getElementById("detailKebutuhanKomponenLabel"); // prettier-ignore
    let button_cetakKebutuhanKomponen = document.getElementById("button_cetakKebutuhanKomponen"); // prettier-ignore
    let div_cetakKebutuhanKomponen = document.getElementById("div_cetakKebutuhanKomponen"); // prettier-ignore
    let header_cetakKebutuhanKomponen = document.getElementById("header_cetakKebutuhanKomponen"); // prettier-ignore
    let div_ringkasanKebutuhanKomponenTropodo = document.getElementById("div_ringkasanKebutuhanKomponenTropodo"); // prettier-ignore
    let div_ringkasanKebutuhanKomponenMojosari = document.getElementById("div_ringkasanKebutuhanKomponenMojosari"); // prettier-ignore
    let div_ringkasanKebutuhanKomponenNganjuk = document.getElementById("div_ringkasanKebutuhanKomponenNganjuk"); // prettier-ignore
    let div_ringkasanKebutuhanKomponenMlorah = document.getElementById("div_ringkasanKebutuhanKomponenMlorah"); // prettier-ignore
    let div_ringkasanKebutuhanKomponenParto = document.getElementById("div_ringkasanKebutuhanKomponenParto"); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanTropodoKain = document.getElementById('div_tableCetakRingkasanKebutuhanTropodoKain'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanTropodoAccessories = document.getElementById('div_tableCetakRingkasanKebutuhanTropodoAccessories'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanMojosariKain = document.getElementById('div_tableCetakRingkasanKebutuhanMojosariKain'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanMojosariAccessories = document.getElementById('div_tableCetakRingkasanKebutuhanMojosariAccessories'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanNganjukKain = document.getElementById('div_tableCetakRingkasanKebutuhanNganjukKain'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanNganjukAccessories = document.getElementById('div_tableCetakRingkasanKebutuhanNganjukAccessories'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanMlorahKain = document.getElementById('div_tableCetakRingkasanKebutuhanMlorahKain'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanMlorahAccessories = document.getElementById('div_tableCetakRingkasanKebutuhanMlorahAccessories'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanPartoKain = document.getElementById('div_tableCetakRingkasanKebutuhanPartoKain'); // prettier-ignore
    let div_tableCetakRingkasanKebutuhanPartoAccessories = document.getElementById('div_tableCetakRingkasanKebutuhanPartoAccessories'); // prettier-ignore
    let table_daftarKebutuhan = $("#table_daftarKebutuhan").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        ordering: true,
        order: [[2, "desc"]],
        autoWidth: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "Kode_Barang" },
            { data: "JumlahKebutuhan" },
            {
                data: "TanggalKebutuhanAwal",
                render: function (data, type, full, meta) {
                    return moment(data).format("MM/DD/YYYY");
                },
            },
            {
                data: "TanggalKebutuhanAkhir",
                render: function (data, type, full, meta) {
                    return moment(data).format("MM/DD/YYYY");
                },
            },
            { data: "Lokasi" },
            {
                data: "IdKebutuhanKomponen",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-target="#detailKebutuhanModal">Detail</button> ' +
                        '<button class="btn btn-success btn-edit" data-id="' +
                        data +
                        '" data-bs-target="#tambahKebutuhanKomponenModal">Edit</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
                    );
                },
            },
        ],
    });
    let table_daftarDetailKebutuhanKomponen = $("#table_daftarDetailKebutuhanKomponen").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        ordering: true,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: true,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "Nama_Komponen" },
            { data: "Kode_Komponen" },
            { data: "WarnaKebutuhan" },
            { data: "Panjang_Potongan",
                render: function (data, type, full, meta) {
                    return parseFloat(data).toFixed(2) + " cm";
                },
             },
            {
                data: "Lebar_Potongan",
                render: function (data, type, full, meta) {
                    return parseFloat(data).toFixed(2) + " cm";
                },
            },
            { data: "Denier" },
            {
                data: "WA_Rajutan",
                render: function (data, type, full, meta) {
                    return parseFloat(data).toFixed(2);
                },
            },
            {
                data: "WE_Rajutan",
                render: function (data, type, full, meta) {
                    return parseFloat(data).toFixed(2);
                },
            },
            { data: "Quantity",
                render: function (data, type, full, meta) {
                    return parseFloat(data).toFixed(2) + " pcs";
                },
             },
        ],
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanTropodoKain = $("#table_cetakRingkasanKebutuhanTropodoKain").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Jenis" },
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "WA" },
            { title: "WE" },
            { title: "Reinforced" },
            { title: "JmlReinforced" },
            { title: "Total Kebutuhan Mtr" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanTropodoAccessories = $("#table_cetakRingkasanKebutuhanTropodoAccessories").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "Total Kebutuhan Mtr" },
            { title: "Total Kebutuhan Kg" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanMojosariKain = $("#table_cetakRingkasanKebutuhanMojosariKain").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Jenis" },
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "WA" },
            { title: "WE" },
            { title: "Reinforced" },
            { title: "JmlReinforced" },
            { title: "Total Kebutuhan Mtr" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanMojosariAccessories = $("#table_cetakRingkasanKebutuhanMojosariAccessories").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "Total Kebutuhan Mtr" },
            { title: "Total Kebutuhan Kg" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanNganjukKain = $("#table_cetakRingkasanKebutuhanNganjukKain").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Jenis" },
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "WA" },
            { title: "WE" },
            { title: "Reinforced" },
            { title: "JmlReinforced" },
            { title: "Total Kebutuhan Mtr" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanNganjukAccessories = $("#table_cetakRingkasanKebutuhanNganjukAccessories").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "Total Kebutuhan Mtr" },
            { title: "Total Kebutuhan Kg" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanMlorahKain = $("#table_cetakRingkasanKebutuhanMlorahKain").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Jenis" },
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "WA" },
            { title: "WE" },
            { title: "Reinforced" },
            { title: "JmlReinforced" },
            { title: "Total Kebutuhan Mtr" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanMlorahAccessories = $("#table_cetakRingkasanKebutuhanMlorahAccessories").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "Total Kebutuhan Mtr" },
            { title: "Total Kebutuhan Kg" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanPartoKain = $("#table_cetakRingkasanKebutuhanPartoKain").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Jenis" },
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "WA" },
            { title: "WE" },
            { title: "Reinforced" },
            { title: "JmlReinforced" },
            { title: "Total Kebutuhan Mtr" },
        ]
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhanPartoAccessories = $("#table_cetakRingkasanKebutuhanPartoAccessories").DataTable({
        responsive: false,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Warna" },
            { title: "Lebar" },
            { title: "Denier" },
            { title: "Total Kebutuhan Mtr" },
            { title: "Total Kebutuhan Kg" },
        ]
    }); // prettier-ignore
    //#endregion

    //#region Load Form
    loadAllData();
    loadCustomerJBB();
    //#endregion

    //#region function

    // Setup global AJAX handlers
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function loadAllData() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/KebutuhanKomponen/getDataKebutuhan",
            type: "GET",
            success: function (response) {
                // console.log(response);

                // Check if response.data is empty
                if (response && response.length > 0) {
                    // Assuming your server returns an array of objects for the table
                    table_daftarKebutuhan.clear();
                    table_daftarKebutuhan.rows.add(response);
                    table_daftarKebutuhan.draw();
                } else {
                    // Clear the table if response.data is empty
                    table_daftarKebutuhan.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function loadCustomerJBB() {
        // Clear existing options
        $("#customerJBB").empty();

        // Add a placeholder option
        $("#customerJBB").append(new Option("Pilih Customer", "", true, true));

        // Populate the dropdown with options
        listCustomerJBB.forEach((item) => {
            const option = new Option(
                item.Nama_Customer.trim(),
                item.Kode_Customer.trim()
            );
            $("#customerJBB").append(option);
        });

        // Initialize select2
        $("#customerJBB").select2({
            placeholder: "Pilih Customer",
            allowClear: true,
            dropdownParent: $("#tambahKebutuhanKomponenModal"),
        });
        $("#kodeBarangJBB").select2({
            placeholder: "Pilih Kode Barang",
            allowClear: true,
            dropdownParent: $("#tambahKebutuhanKomponenModal"),
        });
        $("#lokasiJBB").select2({
            placeholder: "Pilih Lokasi Produksi",
            allowClear: true,
            dropdownParent: $("#tambahKebutuhanKomponenModal"),
        });
    }

    //#region Event listener

    button_tambahKebutuhan.addEventListener("click", function () {
        $("#modal_ok").data("id", null);
        $("#tambahKebutuhanKomponenModal").modal("show");
    });

    $("#tambahKebutuhanKomponenModal").on("shown.bs.modal", function (event) {
        if ($("#modal_ok").data("id") == null) {
            $("#customerJBB").val(null).trigger("change"); // Clear selected index for customerJBB
            $("#kodeBarangJBB").val(null).trigger("change"); // Clear selected index for kodeBarangJBB
            $("#lokasiJBB").val("TROPODO").trigger("change"); // Set default value for lokasiJBB
            kodeBarangJBB
                .empty()
                .append(
                    `<option value = "" disabled selected> Pilih Kode Barang </option>`
                );
            jumlahKebutuhan.value = 0;
            tanggalKebutuhanAwal.valueAsDate = new Date();
            tanggalKebutuhanAkhir.valueAsDate = new Date();
            customerJBB.select2("open");
        }
    });

    modal_ok.addEventListener("click", function () {
        const kodeBarang = kodeBarangJBB.val();
        const lokasi = lokasiJBB.val();
        const jumlah = parseInt(jumlahKebutuhan.value);
        const tanggalAwal = tanggalKebutuhanAwal.value;
        const tanggalAkhir = tanggalKebutuhanAkhir.value;
        let jenis = "tambahKebutuhanKomponen";
        if ($("#modal_ok").data("id") != null) {
            jenis = "editKebutuhanKomponen";
        }
        if (kodeBarang === "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Kode Barang tidak boleh kosong",
            });
            return;
        }
        if (jumlah <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Jumlah Kebutuhan tidak boleh kurang dari 1",
            });
            return;
        }
        if (tanggalAwal === "" && tanggalAkhir === "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal Kebutuhan tidak boleh kosong",
            });
            return;
        }
        if (lokasi === "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Lokasi tidak boleh kosong",
            });
            return;
        }

        $.ajax({
            url: "/KebutuhanKomponen",
            type: "POST",
            data: {
                jenis: jenis,
                kodeBarang: kodeBarang,
                jumlahKebutuhan: jumlah,
                tanggalKebutuhanAwal: tanggalAwal,
                tanggalKebutuhanAkhir: tanggalAkhir,
                lokasi: lokasi,
                idKebutuhanKomponen: $("#modal_ok").data("id"),
                _token: csrf,
            },
            success: function (response) {
                if (response.success) {
                    $("#tambahKebutuhanKomponenModal").modal("hide");
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
                    }).then(() => {
                        loadAllData();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    customerJBB.on("select2:select", function () {
        const selectedCustomerJBB = $(this).val(); // Get selected Customer JBB
        kodeBarangJBB
            .empty()
            .append(
                `<option value = "" disabled selected> Pilih Kode Barang </option>`
            ); // Clear existing options
        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KebutuhanKomponen/getKodeBarangJBB",
            method: "GET",
            data: { customer: selectedCustomerJBB }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kode Barang untuk Customer: " +
                            $("#selectedCustomerJBB option:selected").text(), // prettier-ignore
                    });
                } else if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.error, // prettier-ignore
                    });
                } else {
                    data.forEach(function (barang) {
                        kodeBarangJBB.append(
                            new Option(barang.Kode_Barang, barang.Kode_Barang)
                        );
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                kodeBarangJBB.select2("open");
            }, 200);
        });
    });

    kodeBarangJBB.on("select2:select", function () {
        jumlahKebutuhan.select();
    });

    jumlahKebutuhan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tanggalKebutuhanAwal.focus();
        }
    });

    tanggalKebutuhanAwal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tanggalKebutuhanAkhir.focus();
        }
    });

    tanggalKebutuhanAkhir.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            lokasiJBB.select2("open");
        }
    });

    lokasiJBB.on("select2:select", function () {
        modal_ok.focus();
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        // Get the row data from the DataTable
        var rowData = table_daftarKebutuhan.row($(this).closest("tr")).data();

        if (!rowData) {
            console.error("Row data not found");
            return;
        }

        var kodeBarang = rowData.Kode_Barang;
        $.ajax({
            url: "/KebutuhanKomponen/getDataKebutuhanDetail",
            type: "GET",
            data: {
                IdKebutuhanKomponen: rowID,
            },
            success: function (response) {
                // Assuming your server returns an array of objects for the table data
                console.log(response);
                if (response) {
                    let datatable_daftarDetailKebutuhanKomponen =
                        response.filter(function (item) {
                            return item.Quantity > 0;
                        });
                    table_daftarDetailKebutuhanKomponen
                        .clear()
                        .rows.add(datatable_daftarDetailKebutuhanKomponen)
                        // .rows.add(datatable_daftarDetailKebutuhanKomponen)
                        .draw();
                    detailKebutuhanKomponenLabel.innerHTML = "Komponen " + kodeBarang; // prettier-ignore
                    $("#detailKebutuhanKomponen").modal("show");
                } else {
                    console.error(
                        "Data is not in the expected format:",
                        response
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#modal_ok").data("id", rowID);
        // Get the row data from the DataTable
        var rowData = table_daftarKebutuhan.row($(this).closest("tr")).data();

        if (!rowData) {
            console.error("Row data not found");
            return;
        }
        console.log(rowData.JumlahKebutuhan);

        $.ajax({
            url: "/KebutuhanKomponen/getDataKodeBarangEditJBB",
            type: "GET",
            data: {
                IdKebutuhanKomponen: rowID,
            },
            success: function (response) {
                console.log(response);
                if (response) {
                    // Assuming your server returns an array of objects for the table data
                    customerJBB
                        .val(response[0].Kode_Customer)
                        .trigger("change");
                    kodeBarangJBB
                        .empty()
                        .append(
                            `<option value = "" disabled selected> Pilih Kode Barang </option>`
                        );
                    response.forEach(function (barang) {
                        kodeBarangJBB.append(
                            new Option(barang.Kode_Barang, barang.Kode_Barang)
                        );
                    });
                    kodeBarangJBB.val(rowData.Kode_Barang).trigger("change");
                    lokasiJBB.val(rowData.Lokasi).trigger("change");
                    jumlahKebutuhan.value = rowData.JumlahKebutuhan;
                    tanggalKebutuhanAwal.value = moment(
                        rowData.TanggalKebutuhanAwal
                    ).format("YYYY-MM-DD");
                    tanggalKebutuhanAkhir.value = moment(
                        rowData.TanggalKebutuhanAkhir
                    ).format("YYYY-MM-DD");
                    $("#tambahKebutuhanKomponenModal").modal("show");
                } else {
                    console.error(
                        "Data is not in the expected format:",
                        response
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        console.log(rowID);

        $.ajax({
            url: "/KebutuhanKomponen",
            type: "POST",
            data: {
                jenis: "hapusKebutuhanKomponen",
                idKebutuhanKomponen: rowID,
                _token: csrf,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil dinonaktifkan",
                    }).then(() => {
                        loadAllData();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    $("#detailKebutuhanKomponen").on("shown.bs.modal", function (event) {});

    button_cetakKebutuhanKomponen.addEventListener("click", function () {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
        Swal.fire({
            title: "Pilih Tanggal",
            input: "date",
            inputValue: today,
            showCancelButton: true,
            confirmButtonText: "Cetak",
            showLoaderOnConfirm: true,
            willOpen: () => {
                const input = Swal.getInput();
                input.style.display = "block"; // ✅ override default flex display
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                $.ajax({
                    url: "/KebutuhanKomponen/getDataCetakKebutuhanDetail",
                    type: "GET",
                    data: {
                        TanggalKebutuhan: result.value,
                        _token: csrf,
                    },
                })
                    .then((response) => {
                        console.log(response);
                        if (response.length > 0) {
                            let tanggal = new Date(result.value);
                            tanggal.setDate(tanggal.getDate() - 6);

                            let tanggalSenin =
                                tanggal.getDate().toString().padStart(2, "0") +
                                "-" +
                                (tanggal.getMonth() + 1)
                                    .toString()
                                    .padStart(2, "0") +
                                "-" +
                                tanggal.getFullYear();
                            // header_cetakKebutuhanKomponen.innerHTML =
                            //     "Kebutuhan Komponen Periode " +
                            //     tanggalSenin +
                            //     " / " +
                            //     result.value.split("-").reverse().join("-");

                            header_cetakKebutuhanKomponen.innerHTML =
                                "Kebutuhan Komponen Periode " +
                                result.value.split("-").reverse().join("-");
                            //const filteredData = response.filter(item => item.Kode_Komponen?.trim() === "02BS4O"); // prettier-ignore
                            const groupedTropodoKain = {};
                            const groupedTropodoAccessories = {};
                            const groupedMojosariKain = {};
                            const groupedMojosariAccessories = {};
                            const groupedNganjukKain = {};
                            const groupedNganjukAccessories = {};
                            const groupedMlorahKain = {};
                            const groupedMlorahAccessories = {};
                            const groupedPartoKain = {};
                            const groupedPartoAccessories = {};

                            response.forEach((item) => {
                                const lokasi = item.Lokasi?.trim().toUpperCase(); // prettier-ignore
                                const Nama_Komponen = item.Nama_Komponen?.trim(); // prettier-ignore
                                const Kode_Komponen = item.Kode_Komponen?.trim(); // prettier-ignore
                                const jenisKain = Kode_Komponen.substring(Kode_Komponen.length - 2) == 'TO' ? 'Tubular' : 'Flat'; // prettier-ignore
                                const warna = item.WarnaKebutuhan?.trim();
                                const panjang = parseFloat(item.Panjang_Potongan || 0); // prettier-ignore
                                const lebar = parseFloat(item.Lebar_Potongan || 0); // prettier-ignore
                                const qty = parseFloat(item.Quantity || 0);
                                const berat = parseFloat(item.Berat || 0);
                                const wa_rajutan = parseFloat(item.WA_Rajutan || 0); // prettier-ignore
                                const we_rajutan = parseFloat(item.WE_Rajutan || 0); // prettier-ignore
                                const denier = parseFloat(item.Denier || 0);
                                const kebutuhan = parseFloat(item.JumlahKebutuhan || 0); // prettier-ignore
                                const reinforced = parseFloat(item.Reinforced || 0); // prettier-ignore
                                const jmlReinforced = parseFloat(item.JmlRein || 0); // prettier-ignore

                                const keyKain = `${warna}|${lebar}|${lokasi}|${denier}|${wa_rajutan}|${we_rajutan}|${reinforced}|${jmlReinforced}`;
                                const keyAccessories = `${warna}|${lebar}|${lokasi}|${denier}`;
                                const nilaiMtr = (panjang * qty * kebutuhan) / 100; // prettier-ignore
                                const nilaiKg = (berat * qty * kebutuhan) / 1000; // prettier-ignore

                                if (lokasi == "TROPODO") {
                                    if (
                                        Nama_Komponen == "BODY BESAR" ||
                                        Nama_Komponen == "BODY SAMPING" ||
                                        Nama_Komponen == "CEROBONG ATAS" ||
                                        Nama_Komponen == "CEROBONG BAWAH" ||
                                        Nama_Komponen == "COVER ATAS" ||
                                        Nama_Komponen == "COVER BAWAH" ||
                                        Nama_Komponen == "REINFORCED CLOTH" ||
                                        Nama_Komponen == "TUTUP ATAS" ||
                                        Nama_Komponen == "TUTUP BAWAH"
                                    ) {
                                        if (!groupedTropodoKain[keyKain]) {
                                            groupedTropodoKain[keyKain] = {
                                                jenisKain: jenisKain,
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                JmlReinforced: jmlReinforced,
                                                TotalKebutuhanMtr: 0,
                                            };
                                        }
                                        groupedTropodoKain[keyKain].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                    } else if (
                                        Nama_Komponen == "AUXILIARY BELT" ||
                                        Nama_Komponen == "AUXILIARY ROPE" ||
                                        Nama_Komponen == "BOTTOM REINFORCE ROPE" ||
                                        Nama_Komponen == "CARBON CONDUCTIVE" ||
                                        Nama_Komponen == "CHARGING ROPE" ||
                                        Nama_Komponen == "DISCHARGING ROPE" ||
                                        Nama_Komponen == "HANGING ROPE" ||
                                        Nama_Komponen == "LIFTING BELT" ||
                                        Nama_Komponen == "PITA COVER ATAS" ||
                                        Nama_Komponen == "PITA HOOK" ||
                                        Nama_Komponen == "PITA PENGIKAT" ||
                                        Nama_Komponen == "POCKET" ||
                                        Nama_Komponen == "REINFORCED BELT" ||
                                        Nama_Komponen == "REINFORCED PITA" ||
                                        Nama_Komponen == "RING BELT" ||
                                        Nama_Komponen == "SIDE BELT" // prettier-ignore
                                    ) {
                                        if (
                                            !groupedTropodoAccessories[
                                                keyAccessories
                                            ]
                                        ) {
                                            groupedTropodoAccessories[
                                                keyAccessories
                                            ] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                TotalKebutuhanMtr: 0,
                                                TotalKebutuhanKg: 0,
                                            };
                                        }
                                        groupedTropodoAccessories[keyAccessories].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                        groupedTropodoAccessories[keyAccessories].TotalKebutuhanKg += nilaiKg; // prettier-ignore
                                    }
                                }
                                if (lokasi == "MOJOSARI") {
                                    if (
                                        Nama_Komponen == "BODY BESAR" ||
                                        Nama_Komponen == "BODY SAMPING" ||
                                        Nama_Komponen == "CEROBONG ATAS" ||
                                        Nama_Komponen == "CEROBONG BAWAH" ||
                                        Nama_Komponen == "COVER ATAS" ||
                                        Nama_Komponen == "COVER BAWAH" ||
                                        Nama_Komponen == "REINFORCED CLOTH" ||
                                        Nama_Komponen == "TUTUP ATAS" ||
                                        Nama_Komponen == "TUTUP BAWAH"
                                    ) {
                                        if (!groupedMojosariKain[keyKain]) {
                                            groupedMojosariKain[keyKain] = {
                                                jenisKain: jenisKain,
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                JmlReinforced: jmlReinforced,
                                                TotalKebutuhanMtr: 0,
                                            };
                                        }
                                        groupedMojosariKain[keyKain].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                    } else if (
                                        Nama_Komponen == "AUXILIARY BELT" ||
                                        Nama_Komponen == "AUXILIARY ROPE" ||
                                        Nama_Komponen == "BOTTOM REINFORCE ROPE" ||
                                        Nama_Komponen == "CARBON CONDUCTIVE" ||
                                        Nama_Komponen == "CHARGING ROPE" ||
                                        Nama_Komponen == "DISCHARGING ROPE" ||
                                        Nama_Komponen == "HANGING ROPE" ||
                                        Nama_Komponen == "LIFTING BELT" ||
                                        Nama_Komponen == "PITA COVER ATAS" ||
                                        Nama_Komponen == "PITA HOOK" ||
                                        Nama_Komponen == "PITA PENGIKAT" ||
                                        Nama_Komponen == "POCKET" ||
                                        Nama_Komponen == "REINFORCED BELT" ||
                                        Nama_Komponen == "REINFORCED PITA" ||
                                        Nama_Komponen == "RING BELT" ||
                                        Nama_Komponen == "SIDE BELT" // prettier-ignore
                                    ) {
                                        if (
                                            !groupedMojosariAccessories[
                                                keyAccessories
                                            ]
                                        ) {
                                            groupedMojosariAccessories[
                                                keyAccessories
                                            ] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                TotalKebutuhanMtr: 0,
                                                TotalKebutuhanKg: 0,
                                            };
                                        }
                                        groupedMojosariAccessories[keyAccessories].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                        groupedMojosariAccessories[keyAccessories].TotalKebutuhanKg += nilaiKg; // prettier-ignore
                                    }
                                }
                                if (lokasi == "NGANJUK") {
                                    if (
                                        Nama_Komponen == "BODY BESAR" ||
                                        Nama_Komponen == "BODY SAMPING" ||
                                        Nama_Komponen == "CEROBONG ATAS" ||
                                        Nama_Komponen == "CEROBONG BAWAH" ||
                                        Nama_Komponen == "COVER ATAS" ||
                                        Nama_Komponen == "COVER BAWAH" ||
                                        Nama_Komponen == "REINFORCED CLOTH" ||
                                        Nama_Komponen == "TUTUP ATAS" ||
                                        Nama_Komponen == "TUTUP BAWAH"
                                    ) {
                                        if (!groupedNganjukKain[keyKain]) {
                                            groupedNganjukKain[keyKain] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                TotalKebutuhanMtr: 0,
                                            };
                                        }
                                        groupedNganjukKain[keyKain].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                    } else if (
                                        Nama_Komponen == "AUXILIARY BELT" ||
                                        Nama_Komponen == "AUXILIARY ROPE" ||
                                        Nama_Komponen == "BOTTOM REINFORCE ROPE" ||
                                        Nama_Komponen == "CARBON CONDUCTIVE" ||
                                        Nama_Komponen == "CHARGING ROPE" ||
                                        Nama_Komponen == "DISCHARGING ROPE" ||
                                        Nama_Komponen == "HANGING ROPE" ||
                                        Nama_Komponen == "LIFTING BELT" ||
                                        Nama_Komponen == "PITA COVER ATAS" ||
                                        Nama_Komponen == "PITA HOOK" ||
                                        Nama_Komponen == "PITA PENGIKAT" ||
                                        Nama_Komponen == "POCKET" ||
                                        Nama_Komponen == "REINFORCED BELT" ||
                                        Nama_Komponen == "REINFORCED PITA" ||
                                        Nama_Komponen == "RING BELT" ||
                                        Nama_Komponen == "SIDE BELT" // prettier-ignore
                                    ) {
                                        if (
                                            !groupedNganjukAccessories[
                                                keyAccessories
                                            ]
                                        ) {
                                            groupedNganjukAccessories[
                                                keyAccessories
                                            ] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                TotalKebutuhanMtr: 0,
                                                TotalKebutuhanKg: 0,
                                            };
                                        }
                                        groupedNganjukAccessories[keyAccessories].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                        groupedNganjukAccessories[keyAccessories].TotalKebutuhanKg += nilaiKg; // prettier-ignore
                                    }
                                }
                                if (lokasi == "MLORAH") {
                                    if (
                                        Nama_Komponen == "BODY BESAR" ||
                                        Nama_Komponen == "BODY SAMPING" ||
                                        Nama_Komponen == "CEROBONG ATAS" ||
                                        Nama_Komponen == "CEROBONG BAWAH" ||
                                        Nama_Komponen == "COVER ATAS" ||
                                        Nama_Komponen == "COVER BAWAH" ||
                                        Nama_Komponen == "REINFORCED CLOTH" ||
                                        Nama_Komponen == "TUTUP ATAS" ||
                                        Nama_Komponen == "TUTUP BAWAH"
                                    ) {
                                        if (!groupedMlorahKain[keyKain]) {
                                            groupedMlorahKain[keyKain] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                TotalKebutuhanMtr: 0,
                                            };
                                        }
                                        groupedMlorahKain[keyKain].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                    } else if (
                                        Nama_Komponen == "AUXILIARY BELT" ||
                                        Nama_Komponen == "AUXILIARY ROPE" ||
                                        Nama_Komponen == "BOTTOM REINFORCE ROPE" ||
                                        Nama_Komponen == "CARBON CONDUCTIVE" ||
                                        Nama_Komponen == "CHARGING ROPE" ||
                                        Nama_Komponen == "DISCHARGING ROPE" ||
                                        Nama_Komponen == "HANGING ROPE" ||
                                        Nama_Komponen == "LIFTING BELT" ||
                                        Nama_Komponen == "PITA COVER ATAS" ||
                                        Nama_Komponen == "PITA HOOK" ||
                                        Nama_Komponen == "PITA PENGIKAT" ||
                                        Nama_Komponen == "POCKET" ||
                                        Nama_Komponen == "REINFORCED BELT" ||
                                        Nama_Komponen == "REINFORCED PITA" ||
                                        Nama_Komponen == "RING BELT" ||
                                        Nama_Komponen == "SIDE BELT" // prettier-ignore
                                    ) {
                                        if (
                                            !groupedMlorahAccessories[
                                                keyAccessories
                                            ]
                                        ) {
                                            groupedMlorahAccessories[
                                                keyAccessories
                                            ] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                TotalKebutuhanMtr: 0,
                                                TotalKebutuhanKg: 0,
                                            };
                                        }
                                        groupedMlorahAccessories[keyAccessories].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                        groupedMlorahAccessories[keyAccessories].TotalKebutuhanKg += nilaiKg; // prettier-ignore
                                    }
                                }
                                if (lokasi == "PARTO") {
                                    if (
                                        Nama_Komponen == "BODY BESAR" ||
                                        Nama_Komponen == "BODY SAMPING" ||
                                        Nama_Komponen == "CEROBONG ATAS" ||
                                        Nama_Komponen == "CEROBONG BAWAH" ||
                                        Nama_Komponen == "COVER ATAS" ||
                                        Nama_Komponen == "COVER BAWAH" ||
                                        Nama_Komponen == "REINFORCED CLOTH" ||
                                        Nama_Komponen == "TUTUP ATAS" ||
                                        Nama_Komponen == "TUTUP BAWAH"
                                    ) {
                                        if (!groupedPartoKain[keyKain]) {
                                            groupedPartoKain[keyKain] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                TotalKebutuhanMtr: 0,
                                            };
                                        }
                                        groupedPartoKain[keyKain].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                    } else if (
                                        Nama_Komponen == "AUXILIARY BELT" ||
                                        Nama_Komponen == "AUXILIARY ROPE" ||
                                        Nama_Komponen == "BOTTOM REINFORCE ROPE" ||
                                        Nama_Komponen == "CARBON CONDUCTIVE" ||
                                        Nama_Komponen == "CHARGING ROPE" ||
                                        Nama_Komponen == "DISCHARGING ROPE" ||
                                        Nama_Komponen == "HANGING ROPE" ||
                                        Nama_Komponen == "LIFTING BELT" ||
                                        Nama_Komponen == "PITA COVER ATAS" ||
                                        Nama_Komponen == "PITA HOOK" ||
                                        Nama_Komponen == "PITA PENGIKAT" ||
                                        Nama_Komponen == "POCKET" ||
                                        Nama_Komponen == "REINFORCED BELT" ||
                                        Nama_Komponen == "REINFORCED PITA" ||
                                        Nama_Komponen == "RING BELT" ||
                                        Nama_Komponen == "SIDE BELT" // prettier-ignore
                                    ) {
                                        if (
                                            !groupedPartoAccessories[
                                                keyAccessories
                                            ]
                                        ) {
                                            groupedPartoAccessories[
                                                keyAccessories
                                            ] = {
                                                WarnaKebutuhan: warna,
                                                Lebar: lebar,
                                                Lokasi: lokasi,
                                                Denier: denier,
                                                WA_Rajutan: wa_rajutan,
                                                WE_Rajutan: we_rajutan,
                                                Reinforced: reinforced,
                                                TotalKebutuhanMtr: 0,
                                                TotalKebutuhanKg: 0,
                                            };
                                        }
                                        groupedPartoAccessories[keyAccessories].TotalKebutuhanMtr += nilaiMtr; // prettier-ignore
                                        groupedPartoAccessories[keyAccessories].TotalKebutuhanKg += nilaiKg; // prettier-ignore
                                    }
                                }
                            });

                            // Display div_ringkasanKebutuhanKomponenTropodo based on data
                            if (
                                Object.keys(groupedTropodoKain).length > 0 ||
                                Object.keys(groupedTropodoAccessories).length >
                                    0
                            ) {
                                div_ringkasanKebutuhanKomponenTropodo.style.display = "block"; // prettier-ignore
                            } else {
                                div_ringkasanKebutuhanKomponenTropodo.style.display = "none"; // prettier-ignore
                            }

                            // Clear and populate Tropodo Kain table
                            table_cetakRingkasanKebutuhanTropodoKain.clear();
                            div_tableCetakRingkasanKebutuhanTropodoKain.style.display =
                                Object.keys(groupedTropodoKain).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedTropodoKain)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanTropodoKain.row.add(
                                        [
                                            row.jenisKain,
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.WA_Rajutan,
                                            row.WE_Rajutan,
                                            row.Reinforced,
                                            row.JmlReinforced,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanTropodoKain.draw();

                            // Clear and populate Tropodo Accessories table
                            table_cetakRingkasanKebutuhanTropodoAccessories.clear();
                            div_tableCetakRingkasanKebutuhanTropodoAccessories.style.display =
                                Object.keys(groupedTropodoAccessories).length >
                                0
                                    ? "block"
                                    : "none";
                            Object.values(groupedTropodoAccessories)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanTropodoAccessories.row.add(
                                        [
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                            row.TotalKebutuhanKg.toFixed(2) +
                                                " kg",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanTropodoAccessories.draw();

                            // Display div_ringkasanKebutuhanKomponenMojosari based on data
                            if (
                                Object.keys(groupedMojosariKain).length > 0 ||
                                Object.keys(groupedMojosariAccessories).length >
                                    0
                            ) {
                                div_ringkasanKebutuhanKomponenMojosari.style.display = "block"; // prettier-ignore
                            } else {
                                div_ringkasanKebutuhanKomponenMojosari.style.display = "none"; // prettier-ignore
                            }

                            // Clear and populate Mojosari Kain table
                            table_cetakRingkasanKebutuhanMojosariKain.clear();
                            div_tableCetakRingkasanKebutuhanMojosariKain.style.display =
                                Object.keys(groupedMojosariKain).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedMojosariKain)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanMojosariKain.row.add(
                                        [
                                            row.jenisKain,
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.WA_Rajutan,
                                            row.WE_Rajutan,
                                            row.Reinforced,
                                            row.JmlReinforced,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanMojosariKain.draw();

                            // Clear and populate Mojosari Accessories table
                            table_cetakRingkasanKebutuhanMojosariAccessories.clear();
                            div_tableCetakRingkasanKebutuhanMojosariAccessories.style.display =
                                Object.keys(groupedMojosariAccessories).length >
                                0
                                    ? "block"
                                    : "none";

                            Object.values(groupedMojosariAccessories)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanMojosariAccessories.row.add(
                                        [
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                            row.TotalKebutuhanKg.toFixed(2) +
                                                " kg",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanMojosariAccessories.draw();

                            // Display div_ringkasanKebutuhanKomponenNganjuk based on data
                            if (
                                Object.keys(groupedNganjukKain).length > 0 ||
                                Object.keys(groupedNganjukAccessories).length >
                                    0
                            ) {
                                div_ringkasanKebutuhanKomponenNganjuk.style.display = "block"; // prettier-ignore
                            } else {
                                div_ringkasanKebutuhanKomponenNganjuk.style.display = "none"; // prettier-ignore
                            }

                            // Clear and populate Nganjuk Kain table
                            table_cetakRingkasanKebutuhanNganjukKain.clear();
                            div_tableCetakRingkasanKebutuhanNganjukKain.style.display =
                                Object.keys(groupedNganjukKain).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedNganjukKain)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanNganjukKain.row.add(
                                        [
                                            row.jenisKain,
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.WA_Rajutan,
                                            row.WE_Rajutan,
                                            row.Reinforced,
                                            row.JmlReinforced,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanNganjukKain.draw();

                            // Clear and populate Nganjuk Accessories table
                            table_cetakRingkasanKebutuhanNganjukAccessories.clear();
                            div_tableCetakRingkasanKebutuhanNganjukAccessories.style.display =
                                Object.keys(groupedNganjukAccessories).length >
                                0
                                    ? "block"
                                    : "none";

                            Object.values(groupedNganjukAccessories)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanNganjukAccessories.row.add(
                                        [
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                            row.TotalKebutuhanKg.toFixed(2) +
                                                " kg",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanNganjukAccessories.draw();

                            // Display div_ringkasanKebutuhanKomponenMlorah based on data
                            if (
                                Object.keys(groupedMlorahKain).length > 0 ||
                                Object.keys(groupedMlorahAccessories).length > 0
                            ) {
                                div_ringkasanKebutuhanKomponenMlorah.style.display = "block"; // prettier-ignore
                            } else {
                                div_ringkasanKebutuhanKomponenMlorah.style.display = "none"; // prettier-ignore
                            }

                            // Clear and populate Mlorah Kain table
                            table_cetakRingkasanKebutuhanMlorahKain.clear();
                            div_tableCetakRingkasanKebutuhanMlorahKain.style.display =
                                Object.keys(groupedMlorahKain).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedMlorahKain)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanMlorahKain.row.add(
                                        [
                                            row.jenisKain,
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.WA_Rajutan,
                                            row.WE_Rajutan,
                                            row.Reinforced,
                                            row.JmlReinforced,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanMlorahKain.draw();

                            // Clear and populate Mlorah Accessories table
                            table_cetakRingkasanKebutuhanMlorahAccessories.clear();
                            div_tableCetakRingkasanKebutuhanMlorahAccessories.style.display =
                                Object.keys(groupedMlorahAccessories).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedMlorahAccessories)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanMlorahAccessories.row.add(
                                        [
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                            row.TotalKebutuhanKg.toFixed(2) +
                                                " kg",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanMlorahAccessories.draw();

                            // Display div_ringkasanKebutuhanKomponenParto based on data
                            if (
                                Object.keys(groupedPartoKain).length > 0 ||
                                Object.keys(groupedPartoAccessories).length > 0
                            ) {
                                div_ringkasanKebutuhanKomponenParto.style.display = "block"; // prettier-ignore
                            } else {
                                div_ringkasanKebutuhanKomponenParto.style.display = "none"; // prettier-ignore
                            }

                            // Clear and populate Parto Kain table
                            table_cetakRingkasanKebutuhanPartoKain.clear();
                            div_tableCetakRingkasanKebutuhanPartoKain.style.display =
                                Object.keys(groupedPartoKain).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedPartoKain)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanPartoKain.row.add(
                                        [
                                            row.jenisKain,
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.WA_Rajutan,
                                            row.WE_Rajutan,
                                            row.Reinforced,
                                            row.JmlReinforced,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanPartoKain.draw();

                            // Clear and populate Parto Accessories table
                            table_cetakRingkasanKebutuhanPartoAccessories.clear();
                            div_tableCetakRingkasanKebutuhanPartoAccessories.style.display =
                                Object.keys(groupedPartoAccessories).length > 0
                                    ? "block"
                                    : "none";

                            Object.values(groupedPartoAccessories)
                                .sort((a, b) =>
                                    a.WarnaKebutuhan.localeCompare(
                                        b.WarnaKebutuhan
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhanPartoAccessories.row.add(
                                        [
                                            row.WarnaKebutuhan,
                                            row.Lebar,
                                            row.Denier,
                                            row.TotalKebutuhanMtr.toFixed(2) +
                                                " m",
                                            row.TotalKebutuhanKg.toFixed(2) +
                                                " kg",
                                        ]
                                    );
                                });
                            table_cetakRingkasanKebutuhanPartoAccessories.draw();

                            const printStyle = document.createElement("style");
                            printStyle.innerHTML = `
                                @media print {
                                    @page {
                                        size: A4 landscape;
                                        margin: 1cm;
                                    }
                                    body {
                                        font-size: 12px;
                                    }
                                    table {
                                        width: 100% !important;
                                        border-collapse: collapse;
                                    }
                                    th, td {
                                        padding: 4px;
                                        border: 1px solid #000;
                                        font-size: 12px;
                                    }
                                    .dataTables_wrapper {
                                        width: 100% !important;
                                    }
                                    .dt-buttons {
                                        display: none;
                                    }
                                }`;
                            document.head.appendChild(printStyle);
                            window.print();
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "Tidak ada data",
                                text: "Tidak ada data Kebutuhan Komponen untuk tanggal yang dipilih",
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(
                            `Gagal memuat data: ${error.statusText}`
                        );
                    });
            }
        });
    });
    //#endregion
});
