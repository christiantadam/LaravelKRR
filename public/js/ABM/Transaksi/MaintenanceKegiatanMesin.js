jQuery(function ($) {
    //#region Variables
    let button_tambahKegiatanMesin = document.getElementById('button_tambahKegiatanMesin'); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let tambahKegiatanMesinModal = document.getElementById("tambahKegiatanMesinModal"); // prettier-ignore
    let tambahKegiatanMesinLabel = document.getElementById("tambahKegiatanMesinLabel"); // prettier-ignore
    let tanggalLogMesin = document.getElementById("tanggalLogMesin");
    const select_statusLog = $("#select_statusLog");
    const typeMesin = $("#typeMesin");
    const namaMesin = $("#namaMesin");
    let orderAktif = document.getElementById("orderAktif");
    let shift = document.getElementById("shift");
    let kecepatan = document.getElementById("kecepatan");
    let hasil = document.getElementById("hasil");
    let jamKerjaAwal = document.getElementById("jamKerjaAwal");
    let jamKerjaAkhir = document.getElementById("jamKerjaAkhir");
    let button_modalProses = document.getElementById("button_modalProses");

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
            { data: "Status_Log" },
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
            {
                data: "Awal_Jam",
                render: function (data, type, full, meta) {
                    return moment.utc(data).format("HH:mm"); // Force UTC parsing
                },
            },
            {
                data: "Akhir_Jam",
                render: function (data, type, full, meta) {
                    return moment.utc(data).format("HH:mm");
                },
            },
            { data: "Kecepatan" },
            { data: "Hasil" },
            {
                data: "Id_Log",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-primary btn-edit" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="#tambahKegiatanMesinModal" id="button_editLogMesin">Edit</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
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
        typeMesin.select2({
            dropdownParent: $("#tambahKegiatanMesinModal"),
            allowClear: true,
            placeholder: "Pilih Type Mesin",
        });
        namaMesin.select2({
            dropdownParent: $("#tambahKegiatanMesinModal"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });
        select_statusLog.select2({
            dropdownParent: $("#tambahKegiatanMesinModal"),
            allowClear: true,
            placeholder: "Pilih Status Log",
        });
        $("#typeMesin, #namaMesin, #select_statusLog").each(function () {
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

    function defaultShift() {
        const currentTime = moment();
        const hour = currentTime.hour();
        // Determine shift based on current time
        if (hour >= 7 && hour < 15) {
            shift.value = "P"; // 07.00 - 15.00
        } else if (hour >= 15 && hour < 23) {
            shift.value = "S"; // 15.00 - 23.00
        } else {
            shift.value = "M"; // 23.00 - 07.00
        }
    }
    //#endregion

    //#region Event Handlers
    button_tambahKegiatanMesin.addEventListener("click", function (e) {
        e.preventDefault();
        $("#button_modalProses").data("id", null);
    });

    $("#tambahKegiatanMesinModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProses").data("id");
        if (idLog == null) {
            tanggalLogMesin.value = moment().format("YYYY-MM-DD");
            jamKerjaAwal.value = moment().format("HH:mm");
            jamKerjaAkhir.value = moment().format("HH:mm");
            kecepatan.value = "";
            hasil.value = "";
            orderAktif.innerHTML = "";
            defaultShift();
            typeMesin.val(null).trigger("change");
            namaMesin.empty();
            namaMesin.val(null).trigger("change");
            select_statusLog.val(null).trigger("change");
            setTimeout(() => {
                select_statusLog.select2("open");
            }, 200); // delay in milliseconds (adjust as needed)
        }
    });

    select_statusLog.on("select2:select", function () {
        setTimeout(() => {
            typeMesin.select2("open");
        }, 200); // delay in milliseconds (adjust as needed)
    });

    typeMesin.on("select2:select", function () {
        const selectedTypeMesin = $(this).val(); // Get selected Type Mesin
        namaMesin.empty(); // Clear previous options
        // Fetch mesin based on selected type mesin
        $.ajax({
            url: "/KegiatanMesinPerHariABM/getMesinByType",
            method: "GET",
            data: { idTypeMesin: selectedTypeMesin },
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text:
                            "Tidak ada Mesin untuk Type Mesin: " +
                            $("#typeMesin option:selected").text(), // prettier-ignore
                    }).then(() => {
                        setTimeout(() => {
                            typeMesin.select2("open");
                        }, 200);
                    });
                } else {
                    data.forEach(function (listMesin) {
                        namaMesin.append(
                            new Option(listMesin.NamaMesin, listMesin.IdMesin)
                        );
                    });
                    namaMesin.val(null).trigger("change");
                    setTimeout(() => {
                        namaMesin.select2("open");
                    }, 200);
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

    namaMesin.on("select2:select", function () {
        const selectedMesin = $(this).val(); // Get selected Type Mesin
        orderAktif.innerHTML = ""; // Clear value
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
                            $("#namaMesin option:selected").text(), // prettier-ignore
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
                        orderAktif.innerHTML =
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
                                "Tidak ada Order yang dikerjakan oleh Mesin: " +
                                $("#namaMesin option:selected").text(),
                            didOpen: () => {
                                Swal.getConfirmButton()?.focus();
                            },
                            returnFocus: false,
                        }).then(() => {
                            restoreFocusTrap();
                            setTimeout(() => {
                                namaMesin.select2("open");
                            }, 200);
                        });
                        orderAktif.innerHTML = "";
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
            shift.select();
        });
    });

    shift.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["P", "M", "S"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Silahkan pilih [P]agi, [S]iang, atau [M]alam"
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shift.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            kecepatan.select();
        }
    });

    kecepatan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasil.select();
        }
    });

    hasil.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamKerjaAwal.select();
        }
    });

    jamKerjaAwal.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jamKerjaAkhir.select();
        }
    });

    jamKerjaAkhir.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProses.focus();
        }
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        $.ajax({
            url: "/KegiatanMesinPerHariABM/getLogMesinByIdLog",
            data: {
                idLog: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalLogMesin.value = moment(response.log[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                select_statusLog
                    .val(response.log[0].Status_Log)
                    .trigger("change");
                namaMesin.empty();
                response.mesin.forEach(function (listMesin) {
                    namaMesin.append(
                        new Option(listMesin.NamaMesin, listMesin.IdMesin)
                    );
                });
                typeMesin.val(response.log[0].TypeMesin).trigger("change");
                namaMesin.val(response.log[0].Id_Mesin).trigger("change");
                let nomorOK = response.log[0].No_OK ?? "";
                let namaBarang = response.log[0].NAMA_BRG ?? "";
                if (
                    nomorOK !== null &&
                    nomorOK !== "" &&
                    namaBarang !== null &&
                    namaBarang !== ""
                ) {
                    orderAktif.innerHTML =
                        '<span style="color: red;">' +
                        nomorOK +
                        '</span> <span style="color: blue;">' +
                        namaBarang +
                        "</span>";
                } else {
                    orderAktif.innerHTML = "";
                }
                shift.value = response.log[0].Shift;
                kecepatan.value = response.log[0].Kecepatan;
                hasil.value = response.log[0].Hasil;
                jamKerjaAwal.value = moment
                    .utc(response.log[0].Awal_Jam)
                    .format("HH:mm"); // Force UTC parsing
                jamKerjaAkhir.value = moment
                    .utc(response.log[0].Akhir_Jam)
                    .format("HH:mm"); // Force UTC parsing
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
                namaMesin +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {});
    });

    button_modalProses.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");
        let idLog = $(this).data("id");
        // Disable the button
        button_modalProses.disabled = true;

        // Re-enable after 5 seconds (5000 ms)
        setTimeout(function () {
            button_modalProses.disabled = false;
        }, 5000);
        if (select_statusLog.val() === "" || select_statusLog.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Status Log tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                setTimeout(() => {
                    select_statusLog.select2("open");
                }, 200);
            });
            return;
        }

        if (typeMesin.val() === "" || typeMesin.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Type Mesin tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                setTimeout(() => {
                    typeMesin.select2("open");
                }, 200);
            });
            return;
        }

        if (namaMesin.val() === "" || namaMesin.val() == null) {
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
                    namaMesin.select2("open");
                }, 200);
            });
            return;
        }

        if (shift.value == "" || shift.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                defaultShift();
                shift.select();
            });
            return;
        }

        if (kecepatan <= 0 || kecepatan.value == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Kecepatan tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                kecepatan.select();
            });
            return;
        }

        if (hasil <= 0 || hasil.value == "") {
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
                hasil.select();
            });
            return;
        }

        if (orderAktif.innerHTML == "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Belum ada Order yang aktif untuk Mesin: " +
                    $("#namaMesin option:selected").text(), // prettier-ignore
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                setTimeout(() => {
                    namaMesin.select2("open");
                }, 200);
            });
            return;
        }
        console.log(orderAktif.innerHTML);

        const awal = jamKerjaAwal.value;
        const akhir = jamKerjaAkhir.value;

        // Parse HH:mm to minutes
        function parseTimeToMinutes(timeStr) {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return hours * 60 + minutes;
        }

        const awalMinutes = parseTimeToMinutes(awal);
        const akhirMinutes = parseTimeToMinutes(akhir);
        const selisihMenit = akhirMinutes - awalMinutes;

        // Validation
        if (awal === akhir || awal > akhir || selisihMenit > 480) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    awal === akhir || awal > akhir
                        ? "Jam kerja awal dan akhir kurang tepat"
                        : "Durasi kerja melebihi 8 jam",
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                jamKerjaAwal.select();
            });
            return;
        }

        $.ajax({
            url: "/KegiatanMesinPerHariABM",
            type: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                namaMesin: namaMesin.val(),
                Tgl_Log: tanggalLogMesin.value,
                kecepatan: kecepatan.value,
                hasil: hasil.value,
                statusLog: select_statusLog.val(),
                shift: shift.value,
                jamKerjaAwal: jamKerjaAwal.value,
                jamKerjaAkhir: jamKerjaAkhir.value,
                idLog: idLog,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
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
});
