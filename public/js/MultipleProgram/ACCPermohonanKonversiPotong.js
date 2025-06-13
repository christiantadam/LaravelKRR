jQuery(function ($) {
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    let selectedIds = []; // Array to store selected row ids

    let table_daftarAsalKonversi = $("#table_daftarAsalKonversi").DataTable({});
    let table_daftarTujuanKonversi = $("#table_daftarTujuanKonversi").DataTable({}); // prettier-ignore

    function formatDateDDMMYYYY(dateString) {
        // Create a new Date object from the input date string
        const date = new Date(dateString.split(" ")[0]);

        // Extract day, month, and year from the date
        const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
        const year = date.getFullYear(); // Get the full year

        // Format the date as DD-MM-YYYY
        return `${day}-${month}-${year}`;
    }

    let table_permohonanKonversiPotong = $(
        "#table_permohonanKonversiPotong"
    ).DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        ordering: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "idkonversi" },
            { data: "NamaUser" },
            {
                data: "TimeInput",
                render: function (data, type, full, meta) {
                    return formatDateDDMMYYYY(data);
                },
            },
            {
                data: "idkonversi",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-success btn-acc" data-id="' +
                        data +
                        '"id="button_accPermohonan">ACC</button> ' +
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="#detailPermohonanModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
                    );
                },
            },
        ],
        columnDefs: [{ width: "25%", targets: "_all" }],
    });

    function getDataPermohonan() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/ACCPermohonanKonversiPotong/create",
            type: "GET",
            success: function (response) {
                // Assuming your server returns an array of objects for the table data
                table_permohonanKonversiPotong
                    .clear()
                    .rows.add(response.data)
                    .draw();
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    getDataPermohonan();

    // Make table rows clickable
    $("#table_permohonanKonversiPotong tbody").on(
        "click",
        "tr td",
        function () {
            // Get the column index of the clicked cell
            const colIndex = $(this).index();

            // Check if the clicked column is within the first to the second-to-last column
            if (
                colIndex >= 0 &&
                colIndex < $(this).closest("tr").children("td").length - 1
            ) {
                let data = table_permohonanKonversiPotong
                    .row($(this).closest("tr"))
                    .data(); // Get data for the clicked row

                if ($(this).closest("tr").hasClass("selected")) {
                    $(this).closest("tr").removeClass("selected"); // Remove .selected class
                    // Remove the id from the selectedIds array
                    const index = selectedIds.indexOf(data.idkonversi);
                    if (index > -1) {
                        selectedIds.splice(index, 1);
                    }
                } else {
                    $(this).closest("tr").addClass("selected"); // Add .selected class
                    // Add the id to the selectedIds array
                    selectedIds.push(data.idkonversi);
                }

                console.log("Selected IDs: ", selectedIds); // Log the selected IDs
            }
        }
    );

    $("#button_pilihSemuaPermohonan").on("click", function () {
        let allRows = table_permohonanKonversiPotong.rows().nodes(); // Get all row nodes
        let allData = table_permohonanKonversiPotong.rows().data(); // Get all row data

        if ($(this).hasClass("all-selected")) {
            // If already selected, deselect all
            $(allRows).removeClass("selected");
            selectedIds = []; // Clear the array
            $(this).removeClass("all-selected");
            $(this).html("Pilih Semua Permohonan");
        } else {
            // Select all rows
            $(allRows).addClass("selected");
            selectedIds = []; // Clear the array to reset
            allData.each(function (value, index) {
                selectedIds.push(value.idkonversi); // Add each idkonversi to the array
            });
            $(this).addClass("all-selected");
            $(this).html("Batalkan Semua Permohonan yang Dipilih");
        }

        console.log("Selected IDs after button click: ", selectedIds); // Log the selected IDs
    });

    $(document).on("click", ".btn-detail", function (e) {
        e.preventDefault();
        var rowID = $(this).data("id");
        $("#button_modalACC").data("id", rowID);
        document.getElementById("detailPermohonanModalLabel").innerHTML =
            "Detail Permohonan Konversi " + rowID;
        $.ajax({
            url: "/ACCPermohonanKonversiPotong/getDataKonversi",
            type: "GET",
            data: {
                idKonversi: rowID,
            },
            success: function (response) {
                // Assuming your server returns an array of objects for the table data
                if (response && Array.isArray(response)) {
                    // Filter data for Asal Konversi Potong JBB
                    var asalData = response.filter(function (item) {
                        return (
                            item.UraianDetailTransaksi ===
                            "Asal Konversi Potongan JBB"
                        );
                    });

                    // Filter data for Tujuan Konversi Potong JBB
                    var tujuanData = response.filter(function (item) {
                        return (
                            item.UraianDetailTransaksi ===
                            "Tujuan Konversi Potongan JBB"
                        );
                    });

                    // Convert the data to match table column structure
                    var asalDataFormatted = asalData.map(function (item) {
                        return [
                            item.IdType, // Id Type Asal
                            item.NamaType, // Nama Type Asal
                            parseFloat(item.JumlahPengeluaranPrimer) +
                                " " +
                                (item.satPrimer.trim() ?? ""), // Pengeluaran Primer
                            parseFloat(item.JumlahPengeluaranSekunder) +
                                " " +
                                item.satSekunder.trim(), // Pengeluaran Sekunder
                            parseFloat(item.JumlahPengeluaranTritier) +
                                " " +
                                item.satTritier.trim(), // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    var tujuanDataFormatted = tujuanData.map(function (item) {
                        return [
                            item.IdType, // Id Type Tujuan
                            item.NamaType, // Nama Type Tujuan
                            parseFloat(item.JumlahPemasukanPrimer) +
                                " " +
                                (item.satPrimer.trim() ?? ""), // Pengeluaran Primer
                            parseFloat(item.JumlahPemasukanSekunder) +
                                " " +
                                item.satSekunder.trim(), // Pengeluaran Sekunder
                            parseFloat(item.JumlahPemasukanTritier) +
                                " " +
                                item.satTritier.trim(), // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    // Insert filtered data into table_daftarAsalKonversi
                    table_daftarAsalKonversi
                        .clear()
                        .rows.add(asalDataFormatted)
                        .draw();

                    // Insert filtered data into table_daftarTujuanKonversi
                    table_daftarTujuanKonversi
                        .clear()
                        .rows.add(tujuanDataFormatted)
                        .draw();
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

    $("#button_accPermohonanYangDipilih").on("click", function () {
        $.ajax({
            url: "/ACCPermohonanKonversiPotong/ACCDataKonversi",
            type: "PUT",
            data: {
                _token: csrfToken,
                idKonversi: selectedIds,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: response.success,
                    });
                    getDataPermohonan();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-acc", function (e) {
        e.preventDefault();

        var rowID = $(this).data("id");
        $.ajax({
            url: "/ACCPermohonanKonversiPotong/ACCDataKonversi",
            type: "PUT",
            data: {
                _token: csrfToken,
                idKonversi: [rowID],
            },
            success: function (response) {
                console.log(response);
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: response.success,
                    });
                    getDataPermohonan();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        e.preventDefault();

        var rowID = $(this).data("id");
        $.ajax({
            url: "/ACCPermohonanKonversiPotong/BatalACCDataKonversi",
            type: "DELETE",
            data: {
                _token: csrfToken,
                idKonversi: rowID,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: response.success,
                    });
                    getDataPermohonan();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });
});
