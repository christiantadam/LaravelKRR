jQuery(function ($) {
    //#region Get element by ID
    let select_lokasiSumberAirFilter = document.getElementById("select_lokasiSumberAirFilter"); //prettier-ignore
    let select_sumberAirFilter = document.getElementById("select_sumberAirFilter"); //prettier-ignore
    let button_clearFilter = document.getElementById("button_clearFilter");
    let button_tambahData = document.getElementById("button_tambahData");
    let tambahDataPDAMModal = document.getElementById("tambahDataPDAMModal");
    let tambahDataPDAMLabel = document.getElementById("tambahDataPDAMLabel");
    let tanggalDataPDAM = document.getElementById("tanggalDataPDAM");
    let select_sumberAir = document.getElementById("select_sumberAir");
    let counterSaatIni = document.getElementById("counterSaatIni");
    let counterSebelumnya = document.getElementById("counterSebelumnya");
    let counterPemakaian = document.getElementById("counterPemakaian");
    let keterangan = document.getElementById("keterangan");
    let button_modalProses = document.getElementById("button_modalProses");
    let detailDataPDAMModal = document.getElementById("detailDataPDAMModal");
    let detailDataPDAMLabel = document.getElementById("detailDataPDAMLabel");
    let tanggalDataPDAMDetail = document.getElementById("tanggalDataPDAMDetail"); //prettier-ignore
    let sumberAirDetail = document.getElementById("sumberAirDetail");
    let counterSaatIniDetail = document.getElementById("counterSaatIniDetail");
    let counterSebelumnyaDetail = document.getElementById("counterSebelumnyaDetail"); //prettier-ignore
    let counterPemakaianDetail = document.getElementById("counterPemakaianDetail"); //prettier-ignore
    let keteranganDetail = document.getElementById("keteranganDetail");
    let userInputDetail = document.getElementById("userInputDetail");
    let timestampInput = document.getElementById("timestampInput");
    let userKoreksiDetail = document.getElementById("userKoreksiDetail");
    let timestampKoreksi = document.getElementById("timestampKoreksi");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let minimalCounterSaatIni;

    let table_dataPDAM = $("#table_dataPDAM").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        order: [0, "desc"],
        data: [],
        columns: [
            {
                data: "Tanggal",
                width: "15%",
                render: function (data, type, full, meta) {
                    return moment(data).format("YYYY-MM-DD HH:mm");
                },
            },
            { data: "NamaSumberAir", width: "15%" },
            { data: "Lokasi", width: "15%" },
            {
                data: "Counter",
                width: "15%",
                render: function (data, type, full, meta) {
                    return numeral(data).value();
                },
            },
            {
                data: "Pemakaian",
                width: "15%",
                render: function (data, type, full, meta) {
                    return numeral(data).value();
                },
            },
            {
                data: "IdPdam",
                render: function (data, type, full, meta) {
                    let tanggalData = moment(full.Tanggal).format(
                        "YYYY-MM-DD HH:mm",
                    );
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#detailDataPDAMModal">Lihat Detail</button> ' +
                        '<button class="btn btn-secondary btn-edit" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#tambahDataPDAMModal">Edit</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '" data-namaSumberAir ="' +
                        full.NamaSumberAir +
                        '" data-tanggalData ="' +
                        tanggalData +
                        '"> Hapus </button>'
                    );
                },
            },
            // {
            //     data: "Aktif", // hidden column
            //     visible: false, // make it invisible
            //     searchable: false, // optional, if you don't want it in search
            // },
        ],
        // orderFixed: {
        //     pre: [0, "desc"], // Always sort by Aktif first
        // },
    });
    //#endregion

    //#region Load Form
    getDataPDAM();
    tanggalDataPDAM.value = moment().format("YYYY-MM-DDTHH:mm");
    counterSaatIni.value = 0;
    counterSebelumnya.value = 0;
    counterPemakaian.value = 0;
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

    function getDataPDAM() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/InputPDAM/getDataPDAM",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_dataPDAM.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_dataPDAM.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function getDataCounterSebelumnya(sumberAir, idDataPDAM, modal) {
        $.ajax({
            url: "/InputPDAM/getDataCounterSebelumnya",
            type: "GET",
            data: {
                idSumberAir: sumberAir,
                idDataPDAM: idDataPDAM,
                _token: csrfToken,
            },
            success: function (response) {
                console.log(numeral(response.data[0]?.Counter ?? 0).value());
                let getCounterSebelumnya = numeral(
                    response.data[0]?.Counter ?? 0,
                ).value();
                if (modal == "detail") {
                    counterSebelumnyaDetail.value = getCounterSebelumnya;
                } else {
                    counterSebelumnya.value = getCounterSebelumnya;
                    minimalCounterSaatIni = getCounterSebelumnya;
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }
    //#endregion

    //#region Event Listener
    button_tambahData.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahDataPDAMLabel.innerHTML = "Tambah Data PDAM";
    });

    $("#tambahDataPDAMModal").on("hidden.bs.modal", function (event) {
        tanggalDataPDAM.value = moment().format("YYYY-MM-DDTHH:mm");
        select_sumberAir.selectedIndex = 0;
        counterSaatIni.value = 0;
        counterSebelumnya.value = 0;
        counterPemakaian.value = 0;
        keterangan.value = "";
    });

    $("#tambahDataPDAMModal").on("shown.bs.modal", function (event) {
        tanggalDataPDAM.focus();
    });

    select_lokasiSumberAirFilter.addEventListener("change", function (e) {
        // filter datatables table_dataPDAM on third column = this.selectedIndex.text
        const selectedText = this.options[this.selectedIndex].text;

        table_dataPDAM
            .column(1)
            .search("")
            .column(2) // third column (0-based index)
            .search(selectedText)
            .draw();

        $.ajax({
            url: "/InputPDAM/getDataSumberAir",
            type: "GET",
            data: {
                idLokasi: this.value,
                _token: csrfToken,
            },
            success: function (response) {
                console.log(response); // Clear existing options
                select_sumberAirFilter.innerHTML = "";
                const defaultOption = new Option("-- Pilih Sumber Air --", "");
                defaultOption.disabled = true;

                // Optional default option
                select_sumberAirFilter.appendChild(defaultOption);

                // Populate options
                response.forEach(function (item) {
                    select_sumberAirFilter.appendChild(
                        new Option(item.NamaSumberAir, item.IdSumberAir),
                    );
                });
                select_sumberAirFilter.disabled = false;
                if (response.length > 1) {
                    select_sumberAirFilter.selectedIndex = 0;
                } else {
                    const selectedText =
                        select_sumberAirFilter.options[
                            select_sumberAirFilter.selectedIndex
                        ].text;
                    table_dataPDAM
                        .column(1) // third column (0-based index)
                        .search(selectedText)
                        .draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    select_sumberAirFilter.addEventListener("change", function (e) {
        const selectedText = this.options[this.selectedIndex].text;

        table_dataPDAM
            .column(1) // third column (0-based index)
            .search(selectedText)
            .draw();
    });

    button_clearFilter.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(select_lokasiSumberAirFilter.options.length);

        if (select_lokasiSumberAirFilter.options.length > 1) {
            select_lokasiSumberAirFilter.selectedIndex = 0;
        }

        if (select_sumberAirFilter.options.length > 1) {
            select_sumberAirFilter.selectedIndex = 0;
        }
        table_dataPDAM.column(1).search("").column(2).search("").draw();
    });

    tanggalDataPDAM.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            select_sumberAir.focus(); // Move focus to the next input
        }
    });

    select_sumberAir.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            counterSaatIni.focus(); // Move focus to the next input
        }
    });

    select_sumberAir.addEventListener("change", function (e) {
        getDataCounterSebelumnya(this.value, null);
    });

    counterSaatIni.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            if (parseInt(this.value) < minimalCounterSaatIni) {
                this.setCustomValidity(
                    "Counter saat ini tidak boleh lebih kecil dari " +
                        minimalCounterSaatIni,
                );

                this.reportValidity();
                this.focus();
                this.select();
                return;
            }

            // Clear previous validation message
            this.setCustomValidity("");

            counterPemakaian.value = this.value - counterSebelumnya.value;
            keterangan.focus();
        }
    });

    counterSaatIni.addEventListener("input", function (e) {
        if (select_sumberAir.selectedIndex < 1) {
            this.setCustomValidity("Pilih Sumber Air dulu!");

            this.reportValidity();
            this.value = 0;
            select_sumberAir.focus();
            return;
        } else {
            this.value = parseInt(this.value);
            if (this.value < minimalCounterSaatIni) {
                this.setCustomValidity(
                    "Counter saat ini tidak boleh lebih kecil dari " +
                        minimalCounterSaatIni,
                );

                this.reportValidity();
                this.focus();
                return;
            }

            // Clear previous validation message
            this.setCustomValidity("");
            counterPemakaian.value = this.value - counterSebelumnya.value;
        }
    });

    keterangan.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            button_modalProses.focus(); // Move focus to the next input
        }
    });

    button_modalProses.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");

        let idDataPDAM = $(this).data("id");
        const sumberAir = select_sumberAir.selectedIndex;

        if (parseInt(counterSaatIni.value) < minimalCounterSaatIni) {
            counterSaatIni.setCustomValidity(
                "Counter saat ini tidak boleh lebih kecil dari " +
                    minimalCounterSaatIni,
            );

            counterSaatIni.reportValidity();
            counterSaatIni.focus();
            counterSaatIni.select();
            return;
        }
        if (sumberAir <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih sumber air terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                select_lokasiSumberAir.focus();
            });
            return;
        }
        counterPemakaian.value = counterSaatIni.value - counterSebelumnya.value;

        $.ajax({
            url: "/InputPDAM",
            type: "POST",
            data: {
                jenisStore: idDataPDAM ? "update" : "store",
                tanggalDataPDAM: moment(tanggalDataPDAM.value).format(
                    "YYYY-MM-DD HH:mm:ss",
                ),
                sumberAir: select_sumberAir.value,
                counterSaatIni: counterSaatIni.value,
                counterPemakaian: counterPemakaian.value,
                keterangan: keterangan.value,
                idDataPDAM: idDataPDAM,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
                    }).then(() => {
                        $("#tambahDataPDAMModal").modal("hide");
                        getDataPDAM();
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

    table_dataPDAM.on("click", "tbody tr", function () {
        let data = table_dataPDAM.row(this).data();
        console.log(data);

        // alert("You clicked on " + data.IdMesin + "'s row");
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        tambahDataPDAMLabel.innerHTML = "Edit Data PDAM";
        $.ajax({
            url: "/InputPDAM/getDetailDataPDAM",
            data: {
                idDataPDAM: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalDataPDAM.value = moment(response.data[0].Tanggal).format('YYYY-MM-DDTHH:mm'); //prettier-ignore
                select_sumberAir.value = response.data[0].IdSumberAir;
                counterSaatIni.value = numeral(response.data[0].Counter).value(); //prettier-ignore
                counterPemakaian.value = numeral(response.data[0].Pemakaian).value(); //prettier-ignore
                keterangan.value = response.data[0].Keterangan;
                getDataCounterSebelumnya(select_sumberAir.value, rowID);
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        tambahDataPDAMLabel.innerHTML = "Edit Data PDAM";
        $.ajax({
            url: "/InputPDAM/getDetailDataPDAM",
            data: {
                idDataPDAM: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalDataPDAMDetail.value = moment(response.data[0].Tanggal).format('YYYY-MM-DDTHH:mm'); //prettier-ignore
                sumberAirDetail.value = response.data[0].NamaSumberAir ?? "Data sumber air tidak ditemukan"; //prettier-ignore
                counterSaatIniDetail.value = numeral(response.data[0].Counter).value(); //prettier-ignore
                counterPemakaianDetail.value = numeral(response.data[0].Pemakaian).value(); //prettier-ignore
                keteranganDetail.value = response.data[0].Keterangan;
                userInputDetail.value = response.data[0].UserInput;
                timestampInput.value = response.data[0].TanggalInput;
                userKoreksiDetail.value = response.data[0].UserKoreksi;
                timestampKoreksi.value = response.data[0].TanggalKoreksi;
                getDataCounterSebelumnya(
                    response.data[0].IdSumberAir,
                    rowID,
                    "detail",
                );
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        var namaSumberAir = $(this).data("namasumberair");
        var tanggalData = $(this).data("tanggaldata");

        Swal.fire({
            title: "Yakin untuk mengubah status sumber air?",
            text:
                "Apakah anda yakin untuk menghapus data pada " +
                tanggalData +
                " di sumber air " +
                namaSumberAir +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/InputPDAM/" + rowID,
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
                            getDataPDAM();
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
                    "Data PDAM tidak jadi dihapus :)",
                    "info",
                );
            }
        });
    });
});
