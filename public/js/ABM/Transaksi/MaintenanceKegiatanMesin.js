jQuery(function ($) {
    //#region Variables
    let afalanSettingLembar = document.getElementById("afalanSettingLembar"); // prettier-ignore
    let button_tambahKegiatanMesin = document.getElementById('button_tambahKegiatanMesin'); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let closeTambahKegiatanMesinRTRModal = document.getElementById("closeTambahKegiatanMesinRTRModal"); // prettier-ignore
    let tambahKegiatanMesinRTRModal = document.getElementById("tambahKegiatanMesinRTRModal"); // prettier-ignore
    let tambahKegiatanMesinRTRLabel = document.getElementById("tambahKegiatanMesinRTRLabel"); // prettier-ignore
    let tanggalLogMesinRTR = document.getElementById("tanggalLogMesinRTR");
    const namaMesinRTR = $("#namaMesinRTR");
    let orderAktifRTR = document.getElementById("orderAktifRTR");
    let shiftRTR = document.getElementById("shiftRTR");
    let hasilLBRRTR = document.getElementById("hasilLBRRTR");
    let hasilKgRTR = document.getElementById("hasilKgRTR");
    let button_modalProsesRTR = document.getElementById("button_modalProsesRTR"); // prettier-ignore

    let table_logMesin = $("#table_logMesin").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        data: [],
        columns: [
            { data: "Id_Log" },
            {
                data: "Tgl_Log",
                render: function (data, type, full, meta) {
                    return moment(data).format("YYYY-MM-DD"); // Only show date
                },
            },
            { data: "Jenis_Log" },
            { data: "NamaMesin" },
            {
                data: "Shift",
                render: function (data, type, full, meta) {
                    switch (data) {
                        case "P":
                            return "Pagi";
                        case "S":
                            return "Sore";
                        case "M":
                            return "Malam";
                        default:
                            return data;
                    }
                },
            },
            { data: "No_OK" },
            { data: "Hasil_Lembar" },
            {
                data: "Id_Log",
                render: function (data, type, full, meta) {
                    let idModalEdit;
                    if (full.Jenis_Log == 2) {
                        idModalEdit = "tambahKegiatanMesinMPJModal";
                    } else if (full.Jenis_Log == 2) {
                        idModalEdit = "tambahKegiatanMesinRTRModal";
                    }
                    return (
                        '<button class="btn btn-primary btn-edit" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="' +
                        "#" +
                        idModalEdit +
                        '" id="button_editLogMesin">Edit</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>' +
                        '<button class="btn btn-secondary btn-detail" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="' +
                        "#" +
                        idModalDetail +
                        '" id="button_detailLogMesin">Detail</button> '
                    );
                },
            },
        ],
    });
    //#endregion

    //#region Load Form
    initializeTable();
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

    function initializeTable() {
        $.ajax({
            url: "/KegiatanMesinPerHariABM/getLogMesin",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                console.log(response);
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_logMesin.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_logMesin.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function initializeSelect2() {
        namaMesinRTR.select2({
            dropdownParent: $("#tambahKegiatanMesinRTRModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        $("#namaMesinRTR").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function restoreFocusTrap() {
        // Restore Bootstrap 4 modal focus trap after alert
        $(document).on("focusin.modal", function (e) {
            if (
                $(e.target).closest(".modal").length === 0 &&
                $(".modal:visible").length > 0
            ) {
                e.stopPropagation();
                $(".modal:visible").focus();
            }
        });
    }

    //#endregion

    //#region Event Handlers
    button_tambahKegiatanMesin.addEventListener("click", function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Pilih Jenis Kegiatan Mesin",
            text: "Apakah Anda ingin menginput kegiatan mesin Printing atau Potong Jahit?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Printing",
            cancelButtonText: "Potong Jahit",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/KegiatanMesinPerHariABM/getMesin",
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
                            data.forEach(function (item) {
                                namaMesinRTR.append(
                                    new Option(item.NamaMesin, item.IdMesin) // prettier-ignore
                                );
                            });
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
                // User chose Printing
                $("#button_modalProsesRTRRTR").data("id", null);
                // Show modal or perform action
                tambahKegiatanMesinRTRLabel.innerHTML = "Tambah Kegiatan Mesin Printing"; // prettier-ignore
                $("#tambahKegiatanMesinRTRModal").modal("show");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User chose Potong Jahit
                $("#button_modalProsesRTR").data("id", null);
                $("#tambahKegiatanMesinMPJModal").modal("show");
            }
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        tambahKegiatanMesinRTRLabel.innerHTML = "Edit Kegiatan Mesin Printing Log " + rowID; // prettier-ignore
        $("#button_modalProsesRTR").data("id", rowID);
        $.ajax({
            url: "/KegiatanMesinPerHariABM/getLogMesinByIdLog",
            data: {
                idLog: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalLogMesinRTR.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                namaMesinRTR.empty();
                response.mesin.forEach(function (listMesin) {
                    namaMesinRTR.append(
                        new Option(listMesin.NamaMesin, listMesin.IdMesin)
                    );
                });
                namaMesinRTR.val(response.log[0].Id_Mesin).trigger("change");
                let nomorOK = response.log[0].No_OK ?? "";
                let namaBarang = response.log[0].NAMA_BRG ?? "";
                if (
                    nomorOK !== null &&
                    nomorOK !== "" &&
                    namaBarang !== null &&
                    namaBarang !== ""
                ) {
                    orderAktifRTR.innerHTML =
                        '<span style="color: red;">' +
                        nomorOK +
                        '</span> <span style="color: blue;">' +
                        namaBarang +
                        "</span>";
                } else {
                    orderAktifRTR.innerHTML = "";
                }
                shiftRTR.value = response.log[0].Shift;
                hasilLBRRTR.value = response.log[0].Hasil_Lembar ?? 0;
                hasilKgRTR.value = response.log[0].Hasil_Kg ?? 0;
                afalanSettingLembar.value = numeral(response.log[0].Afalan_Setting_Lembar).format('0.00') ?? 0; // prettier-ignore
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
                    url: "/KegiatanMesinPerHariABM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        alasan: reason,
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
                            initializeTable();
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
                    "Status mesin tidak jadi dirubah :)",
                    "info"
                );
            }
        });

        Swal.fire({
            title: "Tuliskan alasan penghapusan",
            text:
                "Apakah anda yakin untuk " +
                buttonLabel +
                " mesin " +
                namaMesinRTR +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {});
    });

    //#region Modal RTR
    $("#tambahKegiatanMesinRTRModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesRTR").data("id");
        if (idLog == null) {
            tanggalLogMesinRTR.value = moment().format("YYYY-MM-DD");
            shiftRTR.value = "";
            orderAktifRTR.innerHTML = "";
            namaMesinRTR.val(null).trigger("change");
            hasilLBRRTR.value = 0;
            hasilKgRTR.value = 0;
            afalanSettingLembar.value = 0;
            setTimeout(() => {
                tanggalLogMesinRTR.focus();
            }, 200); // delay in milliseconds (adjust as needed)
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
        $(document).off("focusin.modal");
        // Fetch mesin based on selected type mesin
        $.ajax({
            url: "/KegiatanMesinPerHariABM/getOrderByMesin",
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
                            '</span> <span style="color: blue;">' +
                            namaBarang +
                            "</span>";
                        restoreFocusTrap();
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Peringatan",
                            text:
                                "Tidak ada Order yang dikerjakan oleh Mesin " +
                                $("#namaMesinRTR option:selected").text(),
                            didOpen: () => {
                                Swal.getConfirmButton()?.focus();
                            },
                            returnFocus: false,
                        }).then(() => {
                            restoreFocusTrap();
                            setTimeout(() => {
                                namaMesinRTR.select2("open");
                            }, 200);
                        });
                        orderAktifRTR.innerHTML = "";
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
        }).then(() => {
            hasilKgRTR.select();
        });
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
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");
        let idLog = $(this).data("id");
        // Disable the button
        button_modalProsesRTR.disabled = true;

        // Re-enable after 5 seconds (5000 ms)
        setTimeout(function () {
            button_modalProsesRTR.disabled = false;
        }, 5000);

        if (namaMesinRTR.val() === "" || namaMesinRTR.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                setTimeout(() => {
                    namaMesinRTR.select2("open");
                }, 200);
            });
            return;
        }

        if (shiftRTR.value == "" || shiftRTR.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "shiftRTR tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                shiftRTR.select();
            });
            return;
        }

        if (hasilLBRRTR.value <= 0 || hasilLBRRTR.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                hasilLBRRTR.select();
            });
            return;
        }

        if (hasilKgRTR.value <= 0 || hasilKgRTR.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                hasilKgRTR.select();
            });
            return;
        }

        if (orderAktifRTR.innerHTML == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Belum ada Order yang aktif untuk Mesin: " +
                    $("#namaMesinRTR option:selected").text(), // prettier-ignore
                returnFocus: false,
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
            }).then(() => {
                restoreFocusTrap();
                setTimeout(() => {
                    namaMesinRTR.select2("open");
                }, 200);
            });
            return;
        }

        $.ajax({
            url: "/KegiatanMesinPerHariABM",
            type: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                jenisLog: 1,
                Tgl_LogRTR: tanggalLogMesinRTR.value,
                shiftRTR: shiftRTR.value,
                namaMesinRTR: namaMesinRTR.val(),
                hasilLBRRTR: hasilLBRRTR.value,
                hasilKgRTR: hasilKgRTR.value,
                afalanSettingLembar: afalanSettingLembar.value,
                idLog: idLog,
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
                        restoreFocusTrap();
                        initializeTable();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                    restoreFocusTrap();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    //#endregion

    //#region Modal MPJ

    //#endregion

    //#endregion
});
