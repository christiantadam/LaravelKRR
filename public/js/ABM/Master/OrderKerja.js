$(document).ready(function () {
    //#region Get element by ID

    let button_tambahOrderKerja = document.getElementById("button_tambahOrderKerja"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_modalDetailPermohonan = document.getElementById("button_modalDetailPermohonan"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let cekNomorOrderKerja = document.getElementById("cekNomorOrderKerja"); // prettier-ignore
    let dataSuratPesananTemp;
    let input_tanggalRencanaMulaiKerja = document.getElementById("input_tanggalRencanaMulaiKerja"); // prettier-ignore
    let input_tanggalRencanaSelesaiKerja = document.getElementById("input_tanggalRencanaSelesaiKerja"); // prettier-ignore
    let NomorOrderKerja = document.getElementById("NomorOrderKerja"); // prettier-ignore
    let closeDetailOrderKerjaModal = document.getElementById("closeDetailOrderKerjaModal"); // prettier-ignore
    let closeModalButton = document.getElementById("closeModalButton"); // prettier-ignore
    const select_suratPesananTujuan = $('#select_suratPesananTujuan'); // prettier-ignore
    let namaBarang = document.getElementById("namaBarang"); // prettier-ignore
    let detailOrderKerjaModalLabel = document.getElementById("detailOrderKerjaModalLabel"); // prettier-ignore
    let detailOrderKerjaNomorSuratPesanan = document.getElementById("detailOrderKerjaNomorSuratPesanan"); // prettier-ignore
    let detailOrderKerjaCustomer = document.getElementById("detailOrderKerjaCustomer"); // prettier-ignore
    let detailOrderKerjaNamaBarang = document.getElementById("detailOrderKerjaNamaBarang"); // prettier-ignore
    let detailOrderKerjaTanggalRencanaMulaiKerja = document.getElementById("detailOrderKerjaTanggalRencanaMulaiKerja"); // prettier-ignore
    let detailOrderKerjaTanggalRencanaSelesaiKerja = document.getElementById("detailOrderKerjaTanggalRencanaSelesaiKerja"); // prettier-ignore

    let table_orderKerja = $("#table_orderKerja").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        data: [],
        columns: [
            { data: "NomorOrderKerja" },
            { data: "TanggalRencanaMulai" },
            { data: "NomorSP" },
            {
                data: "NomorOrderKerja",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="#detailOrderKerjaModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
                    );
                },
            },
        ],
    }); // prettier-ignore

    //#endregion

    //#region Load Form

    getDataOrderKerja();

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

    function getDataOrderKerja() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDataPermohonanOrderKerja",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_orderKerja.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_orderKerja.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    //#endregion

    //#region Event Listener

    button_tambahOrderKerja.addEventListener("click", function () {
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDataInputPermohonanOrderKerja",
            method: "GET",
            dataType: "json",
            success: function (data) {
                const twoDigitYear = new Date().getFullYear().toString().slice(-2); // prettier-ignore
                console.log(data);

                if (data.success) {
                    if (
                        data.NomorOrderKerja.length > 0 &&
                        data.NomorOrderKerja[0].No_OK.substring(0, 2) ==
                            twoDigitYear
                    ) {
                        NomorOrderKerja.value = parseInt(data.NomorOrderKerja[0].No_OK) + 1; // prettier-ignore
                    } else {
                        NomorOrderKerja.value = twoDigitYear + "0001";
                    }
                    console.log(data.dataSuratPesanan);
                    dataSuratPesananTemp = data.dataSuratPesanan;
                    // Populate select_suratPesananTujuan with data.dataSuratPesanan
                    select_suratPesananTujuan.empty(); // Clear existing options
                    data.dataSuratPesanan.forEach(function (item) {
                        select_suratPesananTujuan.append(
                            new Option(item.IdSuratPesanan + ' | ' + item.KodeBarang, item.IDPesanan) // prettier-ignore
                        );
                    });
                    select_suratPesananTujuan.val(null).trigger("change");

                    // Show the modal only if the AJAX request is successful
                    $("#tambahPermohonanOrderKerjaModal").modal("show");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load Nomor Order Kerja data.",
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to request data Nomor Order Kerja.",
                });
            },
        });
    });

    $("#tambahPermohonanOrderKerjaModal").on(
        "shown.bs.modal",
        function (event) {
            input_tanggalRencanaMulaiKerja.valueAsDate = new Date();
            input_tanggalRencanaSelesaiKerja.valueAsDate = new Date();
            NomorOrderKerja.focus();
            select_suratPesananTujuan.select2({
                dropdownParent: $("#tambahPermohonanOrderKerjaModal"),
                placeholder: "Pilih Surat Pesanan",
            });
        }
    );

    closeModalButton.addEventListener("click", function () {
        $("#tambahPermohonanOrderKerjaModal").modal("hide");
    });

    closeDetailOrderKerjaModal.addEventListener("click", function () {
        $("#detailOrderKerjaModal").modal("hide");
    });

    NomorOrderKerja.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (NomorOrderKerja.value == "") {
                this.setCustomValidity("Nomor Order Kerja tidak boleh kosong"); // prettier-ignore
                NomorOrderKerja.classList.add("input-error");
            } else {
                // check apakah nomor order kerja sudah ada, kalau sudah ada filter surat pesanan berdasarkan kode barang yang sama
                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataSPBerdasarkanNomorOrderKerja",
                    method: "GET",
                    data: {
                        NomorOrderKerja: NomorOrderKerja.value,
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            // Populate select_suratPesananTujuan with data.dataSuratPesanan
                            select_suratPesananTujuan.empty(); // Clear existing options
                            if (
                                parseInt(
                                    data.cekNomorOrderKerja[0]
                                        .JumlahNomorOrderKerja
                                ) == 0
                            ) {
                                cekNomorOrderKerja.innerHTML = "Order Kerja Baru"; // prettier-ignore
                                cekNomorOrderKerja.style.color = "green";
                                cekNomorOrderKerja.style.fontSize = "";
                            } else {
                                cekNomorOrderKerja.innerHTML = "Order Kerja Sudah ada, pilihan SP ditampilkan berdasarkan data order kerja"; // prettier-ignore
                                cekNomorOrderKerja.style.color = "red";
                                cekNomorOrderKerja.style.fontSize = "14px";
                            }
                            if (data.dataSuratPesanan.length > 0) {
                                dataSuratPesananTemp = data.dataSuratPesanan;
                                data.dataSuratPesanan.forEach(function (item) {
                                    select_suratPesananTujuan.append(
                                        new Option(item.IdSuratPesanan + ' | ' + item.KodeBarang, item.IDPesanan) // prettier-ignore
                                    );
                                });
                            }
                            select_suratPesananTujuan
                                .val(null)
                                .trigger("change");
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load Nomor Surat Pesanan.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Nomor Order Kerja.",
                        });
                    },
                });
                this.setCustomValidity("");
                select_suratPesananTujuan.focus();
            }
            this.reportValidity();
        }
    });

    select_suratPesananTujuan.on("select2:select", function () {
        let selectedId = $(this).val();
        let selectedItem = dataSuratPesananTemp.find(
            (item) => item.IDPesanan == selectedId
        );
        if (selectedItem) {
            namaBarang.textContent = selectedItem.NAMA_BRG;
        } else {
            namaBarang.textContent = "";
        }
    });

    button_modalProses.addEventListener("click", function () {
        $.ajax({
            url: "/MaintenanceOrderKerjaABM",
            method: "POST",
            data: {
                NomorOrderKerja: NomorOrderKerja.value,
                TanggalRencanaMulaiKerja: input_tanggalRencanaMulaiKerja.value,
                TanggalRencanaSelesaiKerja: input_tanggalRencanaSelesaiKerja.value, // prettier-ignore
                IDPesanan: select_suratPesananTujuan.val(),
                _token: csrfToken,
            },
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else {
                    getDataOrderKerja();
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: data.success,
                        showConfirmButton: false,
                    });
                    $("#tambahPermohonanOrderKerjaModal").modal("hide");
                }
            },
            error: function () {},
        });
    });

    // table_orderKerja.on("click", "tbody tr", function () {
    //     let data = table_orderKerja.row(this).data();
    //     console.log(data);

    //     alert("You clicked on " + data.NomorOrderKerja + "'s row");
    // });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDetailOrderKerja",
            data: {
                NomorOrderKerja: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                detailOrderKerjaModalLabel.innerHTML =
                    "Detail Order Kerja " + rowID;
                detailOrderKerjaNomorSuratPesanan.innerHTML =
                    response.dataDetailOrderKerja[0].IDSuratPesanan;
                detailOrderKerjaCustomer.innerHTML =
                    response.dataDetailOrderKerja[0].NamaCust;
                detailOrderKerjaNamaBarang.innerHTML =
                    response.dataDetailOrderKerja[0].NAMA_BRG;
                detailOrderKerjaTanggalRencanaMulaiKerja.innerHTML =
                    response.dataDetailOrderKerja[0].TanggalRencanaMulaiKerja.substring(
                        0,
                        10
                    );
                detailOrderKerjaTanggalRencanaSelesaiKerja.innerHTML =
                    response.dataDetailOrderKerja[0].TanggalRencanaSelesaiKerja.substring(
                        0,
                        10
                    );
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        }).then(() => {
            $("#detailOrderKerjaModal").modal("show");
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text:
                "Apakah anda yakin untuk menghapus data nomor order kerja " +
                rowID +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
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
                            getDataOrderKerja();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Data permohonan tidak jadi dihapus :)",
                    "info"
                );
            }
        });
    });
    //#endregion
});
