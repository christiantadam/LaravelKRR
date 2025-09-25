jQuery(function ($) {
    //#region Variables
    let afalanSettingLembar = document.getElementById("afalanSettingLembar"); // prettier-ignore
    let alasanEdit = document.getElementById("alasanEdit"); // prettier-ignore
    let button_tambahKegiatanMesin = document.getElementById('button_tambahKegiatanMesin'); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let closeTambahKegiatanMesinRTRModal = document.getElementById("closeTambahKegiatanMesinRTRModal"); // prettier-ignore
    let div_alasanEditRTR = document.getElementById("div_alasanEditRTR"); // prettier-ignore
    let div_bagianStarpak = document.getElementById("div_bagianStarpak"); // prettier-ignore
    let tambahKegiatanMesinRTRModal = document.getElementById("tambahKegiatanMesinRTRModal"); // prettier-ignore
    let tambahKegiatanMesinRTRLabel = document.getElementById("tambahKegiatanMesinRTRLabel"); // prettier-ignore
    let tanggalLogMesinRTR = document.getElementById("tanggalLogMesinRTR");
    const namaMesinRTR = $("#namaMesinRTR");
    let orderAktifRTR = document.getElementById("orderAktifRTR");
    let shiftRTR = document.getElementById("shiftRTR");
    let hasilLBRRTR = document.getElementById("hasilLBRRTR");
    let hasilKgRTR = document.getElementById("hasilKgRTR");
    let kodeBarangPrinting = document.getElementById("kodeBarangPrinting") //prettier-ignore
    const bagianStarpak = $("#bagianStarpak");
    let namaBarangPrinting = document.getElementById("namaBarangPrinting") //prettier-ignore
    let button_modalProsesRTR = document.getElementById("button_modalProsesRTR"); // prettier-ignore
    let tambahKegiatanMesinRTRTanpaOKLabel = document.getElementById('tambahKegiatanMesinRTRTanpaOKLabel'); // prettier-ignore
    let closetambahKegiatanMesinRTRTanpaOKModal = document.getElementById("closetambahKegiatanMesinRTRTanpaOKModal"); // prettier-ignore
    let tanggalLogMesinRTRTanpaOK = document.getElementById('tanggalLogMesinRTRTanpaOK'); // prettier-ignore
    let shiftRTRTanpaOK = document.getElementById('shiftRTRTanpaOK'); // prettier-ignore
    const namaMesinRTRTanpaOK = $('#namaMesinRTRTanpaOK'); // prettier-ignore
    let kodeBarangPrintingTanpaOK = document.getElementById('kodeBarangPrintingTanpaOK'); // prettier-ignore
    let namaBarangRTRTanpaOK = document.getElementById('namaBarangRTRTanpaOK'); // prettier-ignore
    let hasilKgRTRTanpaOK = document.getElementById("hasilKgRTRTanpaOK"); // prettier-ignore
    let hasilLBRRTRTanpaOK = document.getElementById("hasilLBRRTRTanpaOK"); // prettier-ignore
    let afalanSettingLembarTanpaOK = document.getElementById("afalanSettingLembarTanpaOK"); // prettier-ignore
    let keteranganKegiatanMesinTanpaOK = document.getElementById("keteranganKegiatanMesinTanpaOK"); // prettier-ignore
    let div_alasanEditRTRTanpaOK = document.getElementById('div_alasanEditRTRTanpaOK'); // prettier-ignore
    let alasanEditTanpaOK = document.getElementById("alasanEditTanpaOK"); // prettier-ignore
    let button_modalProsesRTRTanpaOK = document.getElementById("button_modalProsesRTRTanpaOK"); // prettier-ignore

    let table_logMesin = $("#table_logMesin").DataTable({
        processing: true,
        responsive: true,
        serverSide: true,
        lengthMenu: [
            [10, 25, 100, -1],
            ["10", "25", "100", "Show all"],
        ],
        order: [[0, "desc"]],
        ajax: {
            url: "/KegiatanMesinRTRPerHariABM/getLogMesin",
            type: "GET",
            dataSrc: function (json) {
                table_logMesin.grandTotals = {
                    totalLembar: json.totalLembar,
                    totalKg: json.totalKg,
                };
                return json.data;
            },
        },
        columns: [
            {
                data: "Tgl_Log",
                render: function (data, type, full, meta) {
                    return moment(data).format("YYYY-MM-DD");
                },
                width: "10%",
            },
            {
                data: "NamaBarangHasil",
                width: "31%",
            },
            {
                data: "NamaMesin",
                width: "8%",
            },
            {
                data: "Shift",
                width: "5%",
            },
            {
                data: "No_OK",
                width: "8%",
            },
            {
                data: "Hasil_Lembar",
                width: "9%",
            },
            {
                data: "Hasil_Kg",
                width: "9%",
            },
            {
                data: "Id_Log",
                render: function (data, type, full) {
                    let idModalEdit, idModalDetail;
                    idModalEdit = "tambahKegiatanMesinRTRModal";
                    idModalDetail = "detailKegiatanMesinRTRModal";
                    idModalEditTanpaOK = "tambahKegiatanMesinRTRTanpaOKModal";

                    if (full.No_OK) {
                        return `
                        <button class="btn btn-primary btn-edit" data-id="${data}" data-bs-toggle="modal" data-bs-target="#${idModalEdit}" id="button_editLogMesin">Edit</button>
                        <button class="btn btn-danger btn-delete" data-id="${data}">Hapus</button>
                        `;
                    } else {
                        return `
                        <button class="btn btn-primary btn-edit" data-id="${data}" data-bs-toggle="modal" data-bs-target="#${idModalEditTanpaOK}" id="button_editLogMesin">Edit</button>
                        <button class="btn btn-danger btn-delete" data-id="${data}">Hapus</button>
                        `;
                    }
                },
                width: "12.5%",
            },
        ],
        footerCallback: function (row, data, start, end, display) {
            let api = this.api();

            let intVal = (i) =>
                typeof i === "string"
                    ? i.replace(/[\$,]/g, "") * 1
                    : typeof i === "number"
                    ? i
                    : 0;

            let pageLembar = api
                .column(5, { page: "current" })
                .data()
                .reduce((a, b) => intVal(a) + intVal(b), 0);

            let pageKg = api
                .column(6, { page: "current" })
                .data()
                .reduce((a, b) => intVal(a) + intVal(b), 0);

            let grandLembar = table_logMesin.grandTotals?.totalLembar || 0;
            let grandKg = table_logMesin.grandTotals?.totalKg || 0;

            $(api.column(5).footer()).html(`${pageLembar}`);
            $(api.column(6).footer()).html(`${pageKg.toFixed(2)}`);
        },
    });

    //#endregion

    //#region Load Form
    initializeSelect2();
    //#endregion

    //#region Functions
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

    function initializeSelect2() {
        namaMesinRTR.select2({
            dropdownParent: $("#tambahKegiatanMesinRTRModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        bagianStarpak.select2({
            dropdownParent: $("#tambahKegiatanMesinRTRModal"),
            allowClear: true,
            placeholder: "Pilih Bagian Starpak",
        });

        namaMesinRTRTanpaOK.select2({
            dropdownParent: $("#tambahKegiatanMesinRTRTanpaOKModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        $("#namaMesinRTR").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#namaMesinRTRTanpaOK").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    setInputFilter(
        kodeBarangPrintingTanpaOK,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed"
    );
    //#endregion

    //#region Event Handlers
    button_tambahKegiatanMesin.addEventListener("click", function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Pilih Jenis Kegiatan Mesin RTR",
            text: "Apakah kegiatan mesin berdasarkan Order Kerja?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {
            if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.cancel
            ) {
                $.ajax({
                    url: "/KegiatanMesinRTRPerHariABM/getMesin",
                    method: "GET",
                    data: { idTypeMesin: 1 },
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000, // Auto-close after 1.5 seconds (optional)
                                text: "fetching data machine failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (result.isConfirmed) {
                                namaMesinRTR.empty();
                                data.forEach(function (item) {
                                    namaMesinRTR.append(
                                        new Option(item.NamaMesin, item.IdMesin) // prettier-ignore
                                    );
                                });
                                namaMesinRTR.val(null).trigger("change");
                            } else if (
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                namaMesinRTRTanpaOK.empty();
                                data.forEach(function (item) {
                                    namaMesinRTRTanpaOK.append(
                                        new Option(item.NamaMesin, item.IdMesin) // prettier-ignore
                                    );
                                });
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to load Mesin.",
                        });
                    },
                });
                // Show modal or perform action
                if (result.isConfirmed) {
                    $("#button_modalProsesRTR").data("id", null);
                    tambahKegiatanMesinRTRLabel.innerHTML = "Tambah Kegiatan Mesin Printing"; // prettier-ignore
                    $("#tambahKegiatanMesinRTRModal").modal("show");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    $("#button_modalProsesRTRTanpaOK").data("id", null);
                    tambahKegiatanMesinRTRTanpaOKLabel.innerHTML = "Tambah Kegiatan Mesin Printing Tanpa OK"; // prettier-ignore
                    $("#tambahKegiatanMesinRTRTanpaOKModal").modal("show");
                }
            }
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/KegiatanMesinRTRPerHariABM/getLogMesinByIdLog",
            data: {
                idLog: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                if (response.log[0].Jenis_Log == 1) {
                    // dengan OK
                    tambahKegiatanMesinRTRLabel.innerHTML = "Edit Data Id Log: " + rowID; // prettier-ignore
                    $("#button_modalProsesRTR").data("id", rowID);
                    tanggalLogMesinRTR.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                    namaMesinRTR.empty();
                    response.mesin.forEach(function (listMesin) {
                        namaMesinRTR.append(
                            new Option(listMesin.NamaMesin, listMesin.IdMesin)
                        );
                    });
                    namaMesinRTR
                        .val(response.log[0].Id_Mesin)
                        .trigger("change");
                    kodeBarangPrinting.value = response.log[0].KodeBarangHasil ?? ""; // prettier-ignore
                    bagianStarpak.empty();
                    alasanEdit.value = "";
                    orderAktifRTR.innerHTML =
                        '<span style="color: red;">' +
                        response.log[0].No_OK +
                        '</span> <span class="namaBarang" style="color: blue;">' +
                        (response.log[0].NamaBarangHasil ??
                            "Kode Barang Hasil belum terdaftar, lakukan edit dan pastikan kolom kode barang printing sudah terisi untuk mendaftarkan") +
                        "</span>";
                    if (response.log[0].JenisOK == 2) {
                        let valueStarpak =
                            response.log[0].KBPrintingStarpak +
                            " | " +
                            response.log[0].NamaBarangPrintingStarpak;
                        let valueStarpakPatchAtas =
                            response.log[0].KBPrintingStarpakPatchAtas +
                            " | " +
                            response.log[0].NamaBarangPrintingStarpakPatchAtas;
                        let valueStarpakPatchBawah =
                            response.log[0].KBPrintingStarpakPatchBawah +
                            " | " +
                            response.log[0].NamaBarangPrintingStarpakPatchBawah;

                        if (response.log[0].KBPrintingStarpak !== null) {
                            bagianStarpak.append(
                                new Option("Body Starpak", valueStarpak)
                            );
                        }
                        if (
                            response.log[0].KBPrintingStarpakPatchAtas !== null
                        ) {
                            bagianStarpak.append(
                                new Option(
                                    "Patch Atas Starpak",
                                    valueStarpakPatchAtas
                                )
                            );
                        }
                        if (
                            response.log[0].KBPrintingStarpakPatchBawah !== null
                        ) {
                            bagianStarpak.append(
                                new Option(
                                    "Patch Bawah Starpak",
                                    valueStarpakPatchBawah
                                )
                            );
                        }

                        bagianStarpak.val(null).trigger("change");

                        if (response.log[0].KodeBarangHasil !== null) {
                            if (
                                response.log[0].KodeBarangHasil ==
                                valueStarpak.split(" | ")[0]
                            ) {
                                bagianStarpak
                                    .val(valueStarpak)
                                    .trigger("change")
                                    .trigger("select2:select");
                            } else if (
                                response.log[0].KodeBarangHasil ==
                                valueStarpakPatchAtas.split(" | ")[0]
                            ) {
                                bagianStarpak
                                    .val(valueStarpakPatchAtas)
                                    .trigger("change")
                                    .trigger("select2:select");
                            } else if (
                                response.log[0].KodeBarangHasil ==
                                valueStarpakPatchBawah.split(" | ")[0]
                            ) {
                                bagianStarpak
                                    .val(valueStarpakPatchBawah)
                                    .trigger("change")
                                    .trigger("select2:select");
                            }
                        }
                        div_bagianStarpak.classList.remove("hide-important"); // prettier-ignore
                        div_bagianStarpak.classList.add("show-important-block");
                    } else if (response.log[0].JenisOK == 1) {
                        kodeBarangPrinting.value = response.log[0].KodeBarangHasil ?? response.log[0].KBPrintingWoven; // prettier-ignore
                        div_bagianStarpak.classList.remove("show-important-block"); // prettier-ignore
                        div_bagianStarpak.classList.add("hide-important");
                    }
                    shiftRTR.value = response.log[0].Shift;
                    hasilLBRRTR.value = response.log[0].Hasil_Lembar ?? 0;
                    hasilKgRTR.value = response.log[0].Hasil_Kg ?? 0;
                    afalanSettingLembar.value = numeral(response.log[0].Afalan_Setting_Lembar).format('0.00') ?? 0; // prettier-ignore
                } else if (response.log[0].Jenis_Log == 2) {
                    // tanpa OK
                    tambahKegiatanMesinRTRTanpaOKLabel.innerHTML = "Edit Data Id Log: " + rowID; // prettier-ignore
                    $("#button_modalProsesRTRTanpaOK").data("id", rowID);
                    tanggalLogMesinRTRTanpaOK.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                    namaMesinRTRTanpaOK.empty();
                    response.mesin.forEach(function (listMesin) {
                        namaMesinRTRTanpaOK.append(
                            new Option(listMesin.NamaMesin, listMesin.IdMesin)
                        );
                    });
                    namaMesinRTRTanpaOK
                        .val(response.log[0].Id_Mesin)
                        .trigger("change");
                    kodeBarangPrintingTanpaOK.value = response.log[0].KodeBarangHasil ?? ""; // prettier-ignore
                    alasanEditTanpaOK.value = "";
                    namaBarangRTRTanpaOK.innerHTML =
                        response.log[0].NamaBarangHasil ??
                        "Kode Barang Hasil belum terdaftar, lakukan edit dan pastikan kolom kode barang printing sudah terisi untuk mendaftarkan";
                    shiftRTRTanpaOK.value = response.log[0].Shift;
                    hasilLBRRTRTanpaOK.value = response.log[0].Hasil_Lembar ?? 0; // prettier-ignore
                    hasilKgRTRTanpaOK.value = response.log[0].Hasil_Kg ?? 0;
                    afalanSettingLembarTanpaOK.value = numeral(response.log[0].Afalan_Setting_Lembar).format('0.00') ?? 0; // prettier-ignore
                    keteranganKegiatanMesinTanpaOK.value = response.log[0].KeteranganLog ?? "" // prettier-ignore
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Tuliskan alasan penghapusan",
            input: "text",
            inputPlaceholder: "Alasan penghapusan...",
            inputAttributes: {
                autocapitalize: "off",
            },
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            inputValidator: (value) => {
                if (!value) {
                    return "Alasan harus diisi!";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = result.value;
                $.ajax({
                    url: "/KegiatanMesinRTRPerHariABM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        alasanHapus: reason,
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
                            table_logMesin.ajax.reload();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            }
            if (result.isConfirmed) {
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Kegiatan mesin tidak dihapus :)",
                    "info"
                );
            }
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProsesRTR").data("id", rowID);
        Swal.fire({
            icon: "info",
            title: "Coming Soon",
            text: "Fitur ini akan tersedia pada update berikutnya.",
            confirmButtonText: "OK",
        });
    });

    //#region Modal RTR pakai OK
    $("#tambahKegiatanMesinRTRModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesRTR").data("id");
        if (idLog == null) {
            div_bagianStarpak.classList.remove("show-important-block"); // prettier-ignore
            div_bagianStarpak.classList.add("hide-important");
            tanggalLogMesinRTR.value = moment().format("YYYY-MM-DD");
            shiftRTR.value = "";
            orderAktifRTR.innerHTML = "";
            bagianStarpak.empty();
            kodeBarangPrinting.value = "";
            hasilLBRRTR.value = 0;
            hasilKgRTR.value = 0;
            afalanSettingLembar.value = 0;
            setTimeout(() => {
                tanggalLogMesinRTR.focus();
            }, 200); // delay in milliseconds (adjust as needed)
            alasanEdit.value = "";
            div_alasanEditRTR.style.display = "none";
        } else {
            div_alasanEditRTR.style.display = "block";
        }
    });

    closeTambahKegiatanMesinRTRModal.addEventListener("click", function () {
        $("#tambahKegiatanMesinRTRModal").modal("hide");
    });

    tanggalLogMesinRTR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            shiftRTR.select();
        }
    });

    shiftRTR.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["A", "B", "C"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Silahkan pilih [A], [B], atau [C] untuk shift"
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shiftRTR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            namaMesinRTR.select2("open");
        }
    });

    namaMesinRTR.on("select2:select", function () {
        const selectedMesin = $(this).val(); // Get selected Type Mesin
        orderAktifRTR.innerHTML = ""; // Clear value
        kodeBarangPrinting.value = "";
        bagianStarpak.empty();
        // Fetch mesin based on selected type mesin
        $.ajax({
            url: "/KegiatanMesinRTRPerHariABM/getOrderByMesin",
            method: "GET",
            data: { idMesin: selectedMesin },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "fetching data failed for machine: " +
                            $("#namaMesinRTR option:selected").text(), // prettier-ignore
                        returnFocus: false,
                    });
                } else {
                    console.log(data);

                    let jenisOK = data[0].JenisOK ?? "";
                    if (jenisOK == 1) {
                        //WOVEN
                        kodeBarangPrinting.value =
                            data[0].KBPrintingWoven ?? "";
                        div_bagianStarpak.classList.remove("show-important-block"); // prettier-ignore
                        div_bagianStarpak.classList.add("hide-important");
                        let nomorOK = data[0].No_OK ?? "";
                        let namaBarang = data[0].NAMA_BRG ?? "";
                        if (
                            nomorOK !== null &&
                            nomorOK !== "" &&
                            namaBarang !== null &&
                            namaBarang !== ""
                        ) {
                            orderAktifRTR.innerHTML =
                                '<span style="color: red;">' +
                                nomorOK +
                                '</span> <span class="namaBarang" style="color: blue;">' +
                                namaBarang +
                                "</span>";
                            hasilKgRTR.select();
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "Peringatan",
                                text:
                                    "Tidak ada Order yang dikerjakan oleh Mesin " +
                                    $("#namaMesinRTR option:selected").text(),
                                returnFocus: false,
                            }).then(() => {
                                setTimeout(() => {
                                    namaMesinRTR.select2("open");
                                }, 200);
                            });
                            orderAktifRTR.innerHTML = "";
                        }
                    } else if (jenisOK == 2) {
                        //STARPACK
                        if (data[0].KBPrintingStarpak !== null) {
                            bagianStarpak.append(
                                new Option(
                                    "Body Starpak",
                                    data[0].KBPrintingStarpak +
                                        " | " +
                                        data[0].NamaBarangPrintingStarpak
                                )
                            );
                        }
                        if (data[0].KBPrintingStarpakPatchAtas !== null) {
                            bagianStarpak.append(
                                new Option(
                                    "Patch Atas Starpak",
                                    data[0].KBPrintingStarpakPatchAtas +
                                        " | " +
                                        data[0]
                                            .NamaBarangPrintingStarpakPatchAtas
                                )
                            );
                        }
                        if (data[0].KBPrintingStarpakPatchBawah !== null) {
                            bagianStarpak.append(
                                new Option(
                                    "Patch Bawah Starpak",
                                    data[0].KBPrintingStarpakPatchBawah +
                                        " | " +
                                        data[0]
                                            .NamaBarangPrintingStarpakPatchBawah
                                )
                            );
                        }
                        bagianStarpak.val(null).trigger("change");
                        div_bagianStarpak.classList.remove("hide-important");
                        div_bagianStarpak.classList.add("show-important-block");
                        let nomorOK = data[0].No_OK ?? "";
                        if (nomorOK !== null && nomorOK !== "") {
                            orderAktifRTR.innerHTML =
                                '<span style="color: red;">' +
                                nomorOK +
                                "</span>";
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "Peringatan",
                                text:
                                    "Tidak ada Order yang dikerjakan oleh Mesin " +
                                    $("#namaMesinRTR option:selected").text(),
                                returnFocus: false,
                            }).then(() => {
                                setTimeout(() => {
                                    namaMesinRTR.select2("open");
                                }, 200);
                            });
                            orderAktifRTR.innerHTML = "";
                        }
                        bagianStarpak.select2("open");
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        });
    });

    bagianStarpak.on("select2:select", function () {
        $("#orderAktifRTR").find(".namaBarang").remove();

        kodeBarangPrinting.value = bagianStarpak.val().split(" | ")[0];
        orderAktifRTR.innerHTML +=
            ' <span class="namaBarang" style="color: blue;">' +
            bagianStarpak.val().split(" | ")[1] +
            "</span>";
        hasilKgRTR.select();
    });

    hasilKgRTR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilLBRRTR.select();
        }
    });

    hasilLBRRTR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanSettingLembar.select();
        }
    });

    afalanSettingLembar.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesRTR.focus();
        }
    });

    button_modalProsesRTR.addEventListener("click", function () {
        let idLog = $(this).data("id");
        // Disable the button
        button_modalProsesRTR.disabled = true;

        // Re-enable after 5 seconds (5000 ms)
        setTimeout(function () {
            button_modalProsesRTR.disabled = false;
        }, 300);

        // Check if date is larger than today
        let selectedDate = tanggalLogMesinRTR.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLogMesinRTR.select();
            });
            return;
        }

        if (shiftRTR.value == "" || shiftRTR.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftRTR.select();
            });
            return;
        }

        if (namaMesinRTR.val() === "" || namaMesinRTR.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinRTR.select2("open");
                }, 200);
            });
            return;
        }

        if (hasilKgRTR.value <= 0 || hasilKgRTR.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasilKgRTR.select();
            });
            return;
        }

        if (hasilLBRRTR.value <= 0 || hasilLBRRTR.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasilLBRRTR.select();
            });
            return;
        }

        if (
            orderAktifRTR.innerHTML == "" ||
            kodeBarangPrinting.value == "" ||
            kodeBarangPrinting.value == null
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Belum ada Order yang aktif untuk Mesin: " +
                    $("#namaMesinRTR option:selected").text(), // prettier-ignore
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinRTR.select2("open");
                }, 200);
            });
            return;
        }

        if (idLog) {
            if (alasanEdit.value == "" || alasanEdit.value == null) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Alasan Edit harus diisi",
                    returnFocus: false,
                }).then(() => {
                    alasanEdit.focus();
                });
                return;
            }
        }

        $.ajax({
            url: "/KegiatanMesinRTRPerHariABM",
            type: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                jenisLog: 1,
                Tgl_LogRTR: tanggalLogMesinRTR.value,
                shiftRTR: shiftRTR.value,
                namaMesinRTR: namaMesinRTR.val(),
                hasilLBRRTR: hasilLBRRTR.value,
                hasilKgRTR: hasilKgRTR.value,
                afalanSettingLembar: afalanSettingLembar.value ?? 0,
                kodeBarangPrinting: kodeBarangPrinting.value,
                idLog: idLog,
                alasanEdit: alasanEdit.value,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idLog
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        table_logMesin.ajax.reload();
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

    //#endregion

    //#region modal RTR tanpa OK

    $("#tambahKegiatanMesinRTRTanpaOKModal").on(
        "shown.bs.modal",
        function (event) {
            let idLog = $("#button_modalProsesRTRTanpaOK").data("id");
            if (idLog == null) {
                tanggalLogMesinRTRTanpaOK.value = moment().format("YYYY-MM-DD");
                shiftRTRTanpaOK.value = "";
                namaBarangRTRTanpaOK.innerHTML = "";
                namaMesinRTRTanpaOK.val(null).trigger("change");
                kodeBarangPrintingTanpaOK.value = "";
                hasilKgRTRTanpaOK.value = 0;
                hasilLBRRTRTanpaOK.value = 0;
                afalanSettingLembarTanpaOK.value = 0;
                keteranganKegiatanMesinTanpaOK.value = "";
                setTimeout(() => {
                    tanggalLogMesinRTRTanpaOK.focus();
                }, 200); // delay in milliseconds (adjust as needed)
                alasanEditTanpaOK.value = "";
                div_alasanEditRTRTanpaOK.style.display = "none";
            } else {
                div_alasanEditRTRTanpaOK.style.display = "block";
            }
        }
    );

    closetambahKegiatanMesinRTRTanpaOKModal.addEventListener(
        "click",
        function () {
            $("#tambahKegiatanMesinRTRTanpaOKModal").modal("hide");
        }
    );

    tanggalLogMesinRTRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            shiftRTRTanpaOK.select();
        }
    });

    shiftRTRTanpaOK.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["A", "B", "C"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Silahkan pilih [A], [B], atau [C] untuk shift"
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shiftRTRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            namaMesinRTRTanpaOK.select2("open");
        }
    });

    namaMesinRTRTanpaOK.on("select2:select", function () {
        kodeBarangPrintingTanpaOK.focus();
    });

    kodeBarangPrintingTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            let kodeBarang9digit;
            kodeBarang9digit = this;
            if (kodeBarang9digit.value.length < 9) {
                kodeBarang9digit.value = this.value.padStart(9, "0");
            }
            this.value = kodeBarang9digit.value;
            $.ajax({
                url: "/KegiatanMesinRTRPerHariABM/getKodeBarangPrintingTanpaOK",
                method: "GET",
                data: { kodeBarangPrintingTanpaOK: this.value },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.length < 1) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000, // Auto-close after 1.5 seconds (optional)
                            text: "Data Barang Printing tidak ditemukan! ",
                            returnFocus: false,
                        });
                    } else {
                        namaBarangRTRTanpaOK.innerHTML = data[0].NAMA_BRG;
                        keteranganKegiatanMesinTanpaOK.value = data[0].KET;
                        hasilKgRTRTanpaOK.select();
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load Mesin.",
                    });
                },
            });
        }
    });

    hasilKgRTRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilLBRRTRTanpaOK.select();
        }
    });

    hasilLBRRTRTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanSettingLembarTanpaOK.select();
        }
    });

    afalanSettingLembarTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            keteranganKegiatanMesinTanpaOK.select();
        }
    });

    keteranganKegiatanMesinTanpaOK.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesRTRTanpaOK.focus();
        }
    });

    button_modalProsesRTRTanpaOK.addEventListener("click", function (e) {
        console.log("hehe");
        let idLogTanpaOK = $(this).data("id");
        // Disable the button
        button_modalProsesRTRTanpaOK.disabled = true;

        // Re-enable after 5 seconds (5000 ms)
        setTimeout(function () {
            button_modalProsesRTRTanpaOK.disabled = false;
        }, 300);

        // Check if date is larger than today
        let selectedDate = tanggalLogMesinRTRTanpaOK.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLogMesinRTRTanpaOK.select();
            });
            return;
        }

        if (shiftRTRTanpaOK.value == "" || shiftRTRTanpaOK.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftRTRTanpaOK.select();
            });
            return;
        }

        if (
            namaMesinRTRTanpaOK.val() === "" ||
            namaMesinRTRTanpaOK.val() == null
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinRTRTanpaOK.select2("open");
                }, 200);
            });
            return;
        }

        if (hasilKgRTRTanpaOK.value <= 0 || hasilKgRTRTanpaOK.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasilKgRTRTanpaOK.select();
            });
            return;
        }

        if (hasilLBRRTRTanpaOK.value <= 0 || hasilLBRRTRTanpaOK.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasilLBRRTRTanpaOK.select();
            });
            return;
        }

        if (
            namaBarangRTRTanpaOK.innerHTML == "" ||
            kodeBarangPrintingTanpaOK.value == "" ||
            kodeBarangPrintingTanpaOK.value == null
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Belum ada Order yang aktif untuk Mesin: " +
                    $("#namaMesinRTR option:selected").text(), // prettier-ignore
                returnFocus: false,
            }).then(() => {
                kodeBarangPrintingTanpaOK.select();
            });
            return;
        }

        if (idLogTanpaOK) {
            if (
                alasanEditTanpaOK.value == "" ||
                alasanEditTanpaOK.value == null
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Alasan Edit harus diisi",
                    returnFocus: false,
                }).then(() => {
                    alasanEditTanpaOK.focus();
                });
                return;
            }
        }

        $.ajax({
            url: "/KegiatanMesinRTRPerHariABM",
            type: "POST",
            data: {
                jenisStore: idLogTanpaOK ? "update" : "store",
                jenisLog: 2,
                Tgl_LogRTR: tanggalLogMesinRTRTanpaOK.value,
                shiftRTR: shiftRTRTanpaOK.value,
                namaMesinRTR: namaMesinRTRTanpaOK.val(),
                hasilLBRRTR: hasilLBRRTRTanpaOK.value,
                hasilKgRTR: hasilKgRTRTanpaOK.value,
                afalanSettingLembar: afalanSettingLembarTanpaOK.value ?? 0,
                kodeBarangPrinting: kodeBarangPrintingTanpaOK.value,
                idLog: idLogTanpaOK,
                alasanEdit: alasanEditTanpaOK.value,
                keteranganTanpaOK: keteranganKegiatanMesinTanpaOK.value,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idLogTanpaOK
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        table_logMesin.ajax.reload();
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
    //#endregion
});
