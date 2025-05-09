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
            {
                data: "IdKebutuhanKomponen",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-target="#detailKebutuhanModal">Lihat Komponen</button> ' +
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
            { title: "Total Kebutuhan" },
            { title: "Lokasi" }
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
        $("#customerJBB").append(
            new Option("Pilih Kode Barang", "", true, true)
        );

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
        $("#tambahKebutuhanKomponenModal").modal("show");
    });

    $("#tambahKebutuhanKomponenModal").on("shown.bs.modal", function (event) {
        $("#customerJBB").val(null).trigger("change"); // Clear selected index for customerJBB
        $("#kodeBarangJBB").val(null).trigger("change"); // Clear selected index for kodeBarangJBB
        kodeBarangJBB
            .empty()
            .append(
                `<option value = "" disabled selected> Pilih Kode Barang </option>`
            );
        jumlahKebutuhan.value = 0;
        tanggalKebutuhanAwal.valueAsDate = new Date();
        tanggalKebutuhanAkhir.valueAsDate = new Date();
    });

    modal_ok.addEventListener("click", function () {
        const kodeBarang = kodeBarangJBB.value;
        const jumlah = parseInt(jumlahKebutuhan.value);
        const tanggalAwal = tanggalKebutuhanAwal.value;
        const tanggalAkhir = tanggalKebutuhanAkhir.value;

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

        $.ajax({
            url: "/KebutuhanKomponen",
            type: "POST",
            data: {
                jenis: "tambahKebutuhanKomponen",
                kodeBarang: kodeBarang,
                jumlahKebutuhan: jumlah,
                tanggalKebutuhanAwal: tanggalAwal,
                tanggalKebutuhanAkhir: tanggalAkhir,
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
            modal_ok.focus();
        }
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
        // Swal.fire({
        //     title: "Pilih Tanggal Kebutuhan",
        //     width: "40%", // You can adjust this value
        //     html: `
        //       <div style="display: flex; flex-direction: row; gap: 10px; max-width: 100%;">
        //         <div style="width: 50%;">
        //           <label for="start-date">Start Date</label><br>
        //           <input type="date" id="start-date" class="swal2-input" style="width: 100%;margin: 0">
        //         </div>
        //         <div style="width: 50%;">
        //           <label for="end-date">End Date</label><br>
        //           <input type="date" id="end-date" class="swal2-input" style="width: 100%;margin: 0">
        //         </div>
        //       </div>
        //     `,
        //     showCancelButton: true,
        //     confirmButtonText: "Cetak",
        //     showLoaderOnConfirm: true,
        //     didOpen: () => {
        //         document.getElementById("start-date").value = today;
        //         document.getElementById("end-date").value = today;
        //     },
        //     allowOutsideClick: () => !Swal.isLoading(),
        // }).then((result) => {
        //     if (result.isConfirmed && result.value) {
        //         const startDate = document.getElementById("start-date").value;
        //         const endDate = document.getElementById("end-date").value;

        //         $.ajax({
        //             url: "/KebutuhanKomponen/getDataCetakKebutuhanDetail",
        //             type: "GET",
        //             data: {
        //                 TanggalKebutuhanAwal: startDate,
        //                 TanggalKebutuhanAkhir: endDate,
        //                 _token: csrf,
        //             },
        //         })
        //             .then((response) => {
        //                 console.log(response);
        //                 if (response.length > 0) {
        //                     let tanggal = new Date(result.value);
        //                     tanggal.setDate(tanggal.getDate() - 6);

        //                     let tanggalSenin =
        //                         tanggal.getDate().toString().padStart(2, "0") +
        //                         "-" +
        //                         (tanggal.getMonth() + 1)
        //                             .toString()
        //                             .padStart(2, "0") +
        //                         "-" +
        //                         tanggal.getFullYear();
        //                     header_cetakKebutuhanKomponen.innerHTML =
        //                         "Kebutuhan Komponen Periode " +
        //                         tanggalSenin +
        //                         " / " +
        //                         result.value.split("-").reverse().join("-");
        //                     //const filteredData = response.filter(item => item.Kode_Komponen?.trim() === "02BS4O"); // prettier-ignore
        //                     const grouped = {};

        //                     response.forEach((item) => {
        //                         const kode = item.Kode_Komponen?.trim();
        //                         const nama = item.Nama_Komponen?.trim();
        //                         const warna = item.WarnaKebutuhan?.trim();
        //                         const panjang = parseFloat(item.Panjang_Potongan || 0); // prettier-ignore
        //                         const lebar = parseFloat(item.Lebar_Potongan || 0); // prettier-ignore
        //                         const qty = parseFloat(item.Quantity || 0);
        //                         const kebutuhan = parseFloat(item.JumlahKebutuhan || 0); // prettier-ignore

        //                         const key = `${kode}|${nama}|${warna}`;
        //                         const nilai = (panjang * lebar * qty * kebutuhan) / 100; // prettier-ignore

        //                         if (!grouped[key]) {
        //                             grouped[key] = {
        //                                 Nama_Komponen: nama,
        //                                 Kode_Komponen: kode,
        //                                 WarnaKebutuhan: warna,
        //                                 TotalKebutuhan: 0,
        //                             };
        //                         }

        //                         grouped[key].TotalKebutuhan += nilai;
        //                     });
        //                     table_cetakRingkasanKebutuhan.clear();
        //                     Object.values(grouped)
        //                         .sort((a, b) =>
        //                             a.Nama_Komponen.localeCompare(
        //                                 b.Nama_Komponen
        //                             )
        //                         )
        //                         .forEach((row) => {
        //                             table_cetakRingkasanKebutuhan.row.add([
        //                                 row.Nama_Komponen,
        //                                 row.Kode_Komponen,
        //                                 row.WarnaKebutuhan,
        //                                 numeral(row.TotalKebutuhan).format(
        //                                     "0,0.00"
        //                                 ) + " m²",
        //                             ]);
        //                         });
        //                     table_cetakRingkasanKebutuhan.draw();
        //                     window.print();
        //                 } else {
        //                     Swal.fire({
        //                         icon: "warning",
        //                         title: "Tidak ada data",
        //                         text: "Tidak ada data Kebutuhan Komponen untuk tanggal yang dipilih",
        //                     });
        //                 }
        //             })
        //             .catch((error) => {
        //                 Swal.showValidationMessage(
        //                     `Gagal memuat data: ${error.statusText}`
        //                 );
        //             });
        //     }
        // });
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
            console.log(result);

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
                            const grouped = {};

                            response.forEach((item) => {
                                const kode = item.Kode_Komponen?.trim();
                                const nama = item.Nama_Komponen?.trim();
                                const warna = item.WarnaKebutuhan?.trim();
                                const lokasi = item.Lokasi?.trim();
                                const panjang = parseFloat(item.Panjang_Potongan || 0); // prettier-ignore
                                const lebar = parseFloat(item.Lebar_Potongan || 0); // prettier-ignore
                                const qty = parseFloat(item.Quantity || 0);
                                const kebutuhan = parseFloat(item.JumlahKebutuhan || 0); // prettier-ignore

                                const key = `${kode}|${nama}|${warna}|${lokasi}`;
                                const nilai = (panjang * lebar * qty * kebutuhan) / 100; // prettier-ignore

                                if (!grouped[key]) {
                                    grouped[key] = {
                                        Nama_Komponen: nama,
                                        Kode_Komponen: kode,
                                        WarnaKebutuhan: warna,
                                        Lokasi: lokasi,
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
                                        row.TotalKebutuhan.toFixed(2) + " m²",
                                        row.Lokasi,
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
