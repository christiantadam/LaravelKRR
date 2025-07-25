jQuery(function ($) {
    //#region Get element by ID
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahMesin = document.getElementById("button_tambahMesin"); // prettier-ignore
    let closeDetailMesinModal = document.getElementById("closeDetailMesinModal"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let detailMesinLokasi = document.getElementById("detailMesinLokasi"); // prettier-ignore
    let detailMesinModal = document.getElementById("detailMesinModal"); // prettier-ignore
    let detailMesinModalLabel = document.getElementById("detailMesinModalLabel"); // prettier-ignore
    let detailMesinSpeed = document.getElementById("detailMesinSpeed"); // prettier-ignore
    let detailMesinStatusAktif = document.getElementById("detailMesinStatusAktif"); // prettier-ignore
    let namaMesin = document.getElementById("namaMesin"); // prettier-ignore
    let select_lokasiMesin = document.getElementById("select_lokasiMesin"); // prettier-ignore
    let speedMesin = document.getElementById("speedMesin"); // prettier-ignore
    let tambahMesinABMLabel = document.getElementById("tambahMesinABMLabel"); // prettier-ignore
    let tambahMesinABMModal = document.getElementById("tambahMesinABMModal"); // prettier-ignore
    let table_mesinABM = $("#table_mesinABM").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        data: [],
        columns: [
            { data: "NamaMesin", width: "25%" },
            { data: "Speed", width: "15%" },
            { data: "Lokasi", width: "20%" },
            {
                data: "IdMesin",
                width: "40%",
                render: function (data, type, full, meta) {
                    let buttonLabel =
                        full.Aktif == 1 ? "Deactivate" : "Activate";
                    let toggleClass = full.Aktif == 1 ? "btn-danger" : "btn-success";
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#detailMesinModal" id="button_modalDetailMesin">Lihat Detail</button> ' +
                        '<button class="btn btn-secondary btn-edit" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#tambahMesinABMModal" id="button_aktifMesin">Edit</button> ' +
                        '<button class="btn ' + toggleClass + ' btn-delete" data-id="' +
                        data +
                        '" data-aktif="' + full.Aktif + '" data-namaMesin ="'+ full.NamaMesin + '">' + buttonLabel + "</button>"
                    );
                },
            },
        ],
    }); // prettier-ignore

    //#endregion

    //#region Load Form

    getDataMesin();

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

    function getDataMesin() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/MaintenanceMesinABM/getDataMesin",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_mesinABM.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_mesinABM.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    //#endregion

    //#region Event Listener

    button_tambahMesin.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
    });

    $("#tambahMesinABMModal").on("hidden.bs.modal", function (event) {
        namaMesin.value = "";
        speedMesin.value = "";
        select_lokasiMesin.selectedIndex = 0;
    });

    $("#tambahMesinABMModal").on("shown.bs.modal", function (event) {
        namaMesin.select();
    });

    namaMesin.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            speedMesin.select(); // Move focus to the next input
        }
    });

    speedMesin.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            select_lokasiMesin.focus(); // Move focus to the next input
        }
    });

    select_lokasiMesin.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            button_modalProses.focus(); // Move focus to the next input
        }
    });

    button_modalProses.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");

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

        let idMesin = $(this).data("id");
        const lokasi = select_lokasiMesin.selectedIndex;

        if (namaMesin.value === "" || namaMesin.value == null) {
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
                namaMesin.focus();
            });
            return;
        }
        if (speedMesin.value == "" || speedMesin.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Kecepatan mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                speedMesin.value = 0;
                speedMesin.select();
            });
            return;
        }
        if (lokasi <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih lokasi mesin terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                select_lokasiMesin.focus();
            });
            return;
        }

        $.ajax({
            url: "/MaintenanceMesinABM",
            type: "POST",
            data: {
                namaMesin: namaMesin.value,
                select_lokasiMesin: lokasi,
                speedMesin: speedMesin.value,
                idMesin: idMesin,
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
                        $("#tambahMesinABMModal").modal("hide");
                        getDataMesin();
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

    table_mesinABM.on("click", "tbody tr", function () {
        let data = table_mesinABM.row(this).data();
        console.log(data);

        // alert("You clicked on " + data.IdMesin + "'s row");
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/MaintenanceMesinABM/getDetailMesin",
            data: {
                idMesin: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                detailMesinModalLabel.innerHTML =
                    "Detail Mesin " + response[0].NamaMesin;
                detailMesinSpeed.innerHTML = response[0].Speed;
                detailMesinLokasi.innerHTML = response[0].Lokasi;
                if (response[0].Aktif == 1) {
                    detailMesinStatusAktif.innerHTML = "Aktif";
                    detailMesinStatusAktif.classList.remove("text-danger");
                    detailMesinStatusAktif.classList.add("text-success");
                } else {
                    detailMesinStatusAktif.innerHTML = "Tidak Aktif";
                    detailMesinStatusAktif.classList.remove("text-success");
                    detailMesinStatusAktif.classList.add("text-danger");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        $.ajax({
            url: "/MaintenanceMesinABM/getDetailMesin",
            data: {
                idMesin: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                namaMesin.value = response[0].NamaMesin;
                speedMesin.value = response[0].Speed;
                select_lokasiMesin.value = response[0].IdLokasi;
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        var namaMesin = $(this).data("namamesin");
        var isActive = $(this).data("aktif");
        let buttonLabel = isActive ? "Nonaktifkan" : "Aktifkan";

        Swal.fire({
            title: "Yakin untuk mengubah status mesin?",
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
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceMesinABM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        aktif: isActive ? 0 : 1,
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
                            getDataMesin();
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
                    "Status mesin tidak jadi dirubah :)",
                    "info"
                );
            }
        });
    });
    //#endregion
});
