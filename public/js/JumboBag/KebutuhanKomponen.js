$(document).ready(function () {
    //#region Get element by ID
    let button_tambahKebutuhan = document.getElementById("button_tambahKebutuhan"); // prettier-ignore
    let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let kodeBarangJBB = document.getElementById("kodeBarangJBB"); // prettier-ignore
    let jumlahKebutuhan = document.getElementById("jumlahKebutuhan"); // prettier-ignore
    let modal_ok = document.getElementById("modal_ok"); // prettier-ignore
    let tanggalKebutuhan = document.getElementById("tanggalKebutuhan"); // prettier-ignore
    let tanggalDeadlineKebutuhan = document.getElementById("tanggalDeadlineKebutuhan"); // prettier-ignore
    let detailKebutuhanKomponenLabel = document.getElementById("detailKebutuhanKomponenLabel"); // prettier-ignore
    let button_cetakKebutuhanKomponen = document.getElementById("button_cetakKebutuhanKomponen"); // prettier-ignore
    let div_cetakKebutuhanKomponen = document.getElementById("div_cetakKebutuhanKomponen"); // prettier-ignore
    let header_cetakKebutuhanKomponen = document.getElementById("header_cetakKebutuhanKomponen"); // prettier-ignore
    let div_ringkasanKebutuhanKomponen = document.getElementById("div_ringkasanKebutuhanKomponen"); // prettier-ignore
    let div_detailKebutuhanKomponen = document.getElementById("div_detailKebutuhanKomponen"); // prettier-ignore
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
                data: "TanggalKebutuhan",
                render: function (data, type, full, meta) {
                    return moment(data).format("MM/DD/YYYY");
                },
            },
            {
                data: "IdKebutuhanKomponen",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-target="#detailKebutuhanModal">Lihat Komponen</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Nonaktifkan</button>'
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
        autoWidth: false,
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
            { data: "Quantity",
                render: function (data, type, full, meta) {
                    return parseFloat(data).toFixed(2) + " pcs";
                },
             },
        ],
    }); // prettier-ignore
    let table_cetakRingkasanKebutuhan = $("#table_cetakRingkasanKebutuhan").DataTable({
        responsive: true,
        ordering: false,
        order: [[0, "asc"]],
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        data: [], // This will be populated with client-side data
        columns: [
            { title: "Nama Komponen" },
            { title: "Kode Komponen" },
            { title: "Warna" },
            { title: "Total Kebutuhan" }
        ]
    }); // prettier-ignore
    //#endregion

    //#region Load Form
    loadAllData();
    loadKodeBarangJBB();
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

    function loadKodeBarangJBB() {
        // Clear existing options
        $("#kodeBarangJBB").empty();

        // Add a placeholder option
        $("#kodeBarangJBB").append(
            new Option("Pilih Kode Barang", "", true, true)
        );

        // Populate the dropdown with options
        listKodeBarangJBB.forEach((item) => {
            const option = new Option(
                item.Kode_Barang.trim(),
                item.Kode_Barang.trim()
            );
            $("#kodeBarangJBB").append(option);
        });

        // Initialize select2
        $("#kodeBarangJBB").select2({
            placeholder: "Pilih Kode Barang",
            allowClear: true,
            dropdownParent: $("#tambahKebutuhanKomponenModal"), // Optional: Attach dropdown to modal
        });
    }

    // Optional: set min to the next upcoming Saturday if needed
    function getNextSaturday() {
        const today = new Date();
        const day = today.getDay();
        const diff = (6 - day + 7) % 7; // days to next Saturday
        today.setDate(today.getDate() + diff);
        return today.toISOString().split("T")[0];
    }
    //#endregion

    //#region Event listener

    button_tambahKebutuhan.addEventListener("click", function () {
        $("#tambahKebutuhanKomponenModal").modal("show");
    });

    $("#tambahKebutuhanKomponenModal").on("shown.bs.modal", function (event) {
        $("#kodeBarangJBB").val(null).trigger("change"); // Clear selected index for kodeBarangJBB
        jumlahKebutuhan.value = 0;
        tanggalKebutuhan.valueAsDate = new Date();
        tanggalDeadlineKebutuhan.value = getNextSaturday();
    });

    tanggalKebutuhan.addEventListener("change", function () {
        const selected = new Date(this.value);
        if (selected.getDay() !== 6) {
            const daysUntilSaturday = (6 - selected.getDay() + 7) % 7;
            selected.setDate(selected.getDate() + daysUntilSaturday);
            const nextSaturday = selected.toISOString().split("T")[0];
            tanggalDeadlineKebutuhan.value = nextSaturday;
        }
    });

    modal_ok.addEventListener("click", function () {
        const kodeBarang = kodeBarangJBB.value;
        const jumlah = parseInt(jumlahKebutuhan.value);
        const tanggal = tanggalKebutuhan.value;
        const deadline = tanggalDeadlineKebutuhan.value;

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
        if (tanggal === "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal Kebutuhan tidak boleh kosong",
            });
            return;
        }

        $.ajax({
            url: "/KebutuhanKomponen",
            type: "POST",
            data: {
                jenis: "tambahKebutuhanKomponen",
                kodeBarang: kodeBarang,
                jumlahKebutuhan: jumlah,
                tanggalKebutuhan: tanggal,
                tanggalDeadlineKebutuhan: deadline,
                _token: csrf,
            },
            success: function (response) {
                console.log(response);
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

                if (response) {
                    let datatable_daftarDetailKebutuhanKomponen =
                        response.filter(function (item) {
                            return item.Quantity > 0;
                        });
                    table_daftarDetailKebutuhanKomponen
                        .clear()
                        .rows.add(response)
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
        const nextSaturday = getNextSaturday();

        Swal.fire({
            title: "Pilih Tanggal Deadline",
            input: "date",
            inputLabel: "Hanya Sabtu yang bisa dipilih",
            inputAttributes: {
                min: "2025-01-04",
                step: 7,
            },
            inputValue: nextSaturday,
            showCancelButton: true,
            confirmButtonText: "Cetak",
            showLoaderOnConfirm: true,
            willOpen: () => {
                const input = Swal.getInput();
                input.style.display = "block"; // ✅ override default flex display
            },
            didOpen: () => {
                const input = Swal.getInput();
                input.addEventListener("change", function (e) {
                    console.log(e.target.value, e.target.input);

                    const selectedDate = new Date(input.value);
                    if (selectedDate.getDay() !== 6) {
                        Swal.showValidationMessage(
                            "Tanggal awal bukan hari Sabtu"
                        );
                    }
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                $.ajax({
                    url: "/KebutuhanKomponen/getDataCetakKebutuhanDetail",
                    type: "GET",
                    data: {
                        TanggalDeadlineKebutuhan: result.value,
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
                            header_cetakKebutuhanKomponen.innerHTML =
                                "Kebutuhan Komponen Periode " +
                                tanggalSenin +
                                " / " +
                                result.value.split("-").reverse().join("-");
                            //const filteredData = response.filter(item => item.Kode_Komponen?.trim() === "02BS4O"); // prettier-ignore
                            const grouped = {};

                            response.forEach((item) => {
                                const kode = item.Kode_Komponen?.trim();
                                const nama = item.Nama_Komponen?.trim();
                                const warna = item.WarnaKebutuhan?.trim();
                                const panjang = parseFloat(item.Panjang_Potongan || 0); // prettier-ignore
                                const lebar = parseFloat(item.Lebar_Potongan || 0); // prettier-ignore
                                const qty = parseFloat(item.Quantity || 0);
                                const kebutuhan = parseFloat(item.JumlahKebutuhan || 0); // prettier-ignore

                                const key = `${kode}|${nama}|${warna}`;
                                const nilai = (panjang * lebar * qty * kebutuhan) / 100; // prettier-ignore

                                if (!grouped[key]) {
                                    grouped[key] = {
                                        Nama_Komponen: nama,
                                        Kode_Komponen: kode,
                                        WarnaKebutuhan: warna,
                                        TotalKebutuhan: 0,
                                    };
                                }

                                grouped[key].TotalKebutuhan += nilai;
                            });
                            table_cetakRingkasanKebutuhan.clear();
                            Object.values(grouped)
                                .sort((a, b) =>
                                    a.Nama_Komponen.localeCompare(
                                        b.Nama_Komponen
                                    )
                                )
                                .forEach((row) => {
                                    table_cetakRingkasanKebutuhan.row.add([
                                        row.Nama_Komponen,
                                        row.Kode_Komponen,
                                        row.WarnaKebutuhan,
                                        row.TotalKebutuhan.toFixed(2) + ' m²',
                                    ]);
                                });
                            table_cetakRingkasanKebutuhan.draw();
                            window.print();
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
