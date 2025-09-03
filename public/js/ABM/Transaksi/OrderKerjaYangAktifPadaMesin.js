jQuery(function ($) {
    //#region Variables
    const typeMesin = $("#typeMesin");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    const namaMesin = $("#namaMesin");
    let orderLama = document.getElementById("orderLama");
    const orderBaru = $("#orderBaru");
    let button_koreksi = document.getElementById("button_koreksi");
    let button_proses = document.getElementById("button_proses");
    let table_mesinOrderKerja = $("#table_mesinOrderKerja").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        data: [],
        columns: [
            { data: "NamaMesin" },
            { data: "No_OK" },
            { data: "NAMA_BRG" },
            // {
            //     data: "IdMesin",
            //     render: function (data, type, full, meta) {
            //         return (
            //             '<button class="btn btn-primary btn-detail" data-id="' +
            //             data +
            //             '" data-bs-toggle="modal" data-bs-target="#detailOrderKerjaModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
            //             '<button class="btn btn-danger btn-delete" data-id="' +
            //             data +
            //             '">Hapus</button>'
            //         );
            //     },
            // },
        ],
    });
    let idTypeMesin;
    let idMesin;
    //#endregion

    //#region Load Form
    button_koreksi.focus();
    initializeSelect2();
    getDataMesinAktif();
    //#endregion

    //#region Functions

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

    function initializeSelect2() {
        // Initialize select2
        $("#typeMesin").select2({
            placeholder: "Pilih Type Mesin",
            allowClear: true,
            dropdownParent: $("#app"),
        });
        $("#namaMesin").select2({
            placeholder: "Pilih Mesin",
            allowClear: true,
            dropdownParent: $("#app"),
        });
        $("#orderBaru").select2({
            placeholder: "Pilih Order Baru",
            allowClear: true,
            dropdownParent: $("#app"),
        });
    }

    function getDataMesinAktif() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/OrderKerjaYangAktifPadaMesin/getDataMesinAktif",
            type: "GET",
            success: function (response) {
                console.log(response);

                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_mesinOrderKerja
                        .clear()
                        .rows.add(response.data)
                        .draw();
                } else {
                    // Clear the table if response.data is empty
                    table_mesinOrderKerja.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }
    //#endregion

    //#region Event Handlers
    button_koreksi.addEventListener("click", function () {
        if (button_koreksi.innerHTML.trim().toLowerCase() === "koreksi") {
            button_koreksi.innerHTML = "Batal";
            button_koreksi.classList.remove("btn-primary");
            button_koreksi.classList.add("btn-danger");
            typeMesin.prop("disabled", false);
            namaMesin.prop("disabled", false);
            orderBaru.prop("disabled", false);
            setTimeout(() => {
                typeMesin.select2("open");
            }, 200);
        } else {
            button_koreksi.innerHTML = "Koreksi";
            button_koreksi.classList.remove("btn-danger");
            button_koreksi.classList.add("btn-primary");
            orderLama.value = "";
            $("#typeMesin").val(null).trigger("change");
            $("#namaMesin").val(null).trigger("change");
            $("#orderBaru").val(null).trigger("change");
            typeMesin.prop("disabled", true);
            namaMesin.prop("disabled", true);
            orderBaru.prop("disabled", true);
        }
    });

    typeMesin.on("select2:select", function () {
        const selectedTypeMesin = $(this).val(); // Get selected Type Mesin
        namaMesin
            .empty()
            .append(
                `<option value = "" disabled selected> Pilih Kode Barang </option>`
            ); // Clear existing options
        // Fetch Mesin based on selected Type Mesin
        $.ajax({
            url: "/OrderKerjaYangAktifPadaMesin/getMesinByType",
            method: "GET",
            data: { typeMesin: selectedTypeMesin }, // Pass Id_Type_Mesin to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Mesin untuk Type: " +
                            $("#typeMesin option:selected").text(), // prettier-ignore
                    });
                } else if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.error, // prettier-ignore
                    });
                } else {
                    data.forEach(function (mesin) {
                        namaMesin.append(
                            new Option(mesin.NamaMesin, mesin.IdMesin)
                        );
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load data Machine.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                namaMesin.select2("open");
            }, 200);
        });
    });

    namaMesin.on("select2:select", function () {
        const selectedNamaMesin = $(this).val(); // Get selected Type Mesin
        orderLama.value = "";
        // Fetch Mesin based on selected Type Mesin
        $.ajax({
            url: "/OrderKerjaYangAktifPadaMesin/getDataOrderKerjaByMesin",
            method: "GET",
            data: { idMesin: selectedNamaMesin }, // Pass Id_Type_Mesin to the server
            dataType: "json",
            success: function (data) {
                console.log(data);

                if (
                    data.length === 0 ||
                    (data[0].No_OK === null && data[0].NAMA_BRG === null)
                ) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        returnFocus: false,
                        text:
                            "Tidak ada Order yang terdaftar untuk Mesin: " +
                            $("#namaMesin option:selected").text(), // prettier-ignore
                    }).then(() => {
                        setTimeout(() => {
                            orderBaru.select2("open");
                        }, 200);
                    });
                } else if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.error, // prettier-ignore
                    });
                } else {
                    orderLama.value = data[0].No_OK + " | " + data[0].NAMA_BRG; // Assuming the first item is the one you want
                    setTimeout(() => {
                        orderBaru.select2("open");
                    }, 200);
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load data Machine.",
                });
            },
        });
    });

    orderBaru.on("select2:select", function () {
        button_proses.disabled = false;
        button_proses.focus();
    });

    button_proses.addEventListener("click", function () {
        if (namaMesin.val() === null) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Harus Pilih Mesin!",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesin.select2("open");
                }, 200);
            });
            return;
        }
        if (orderBaru.val() === null) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Harus Pilih Order Baru!",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    orderBaru.select2("open");
                }, 200);
            });
            return;
        }

        const selectedNamaMesin = namaMesin.val();
        const selectedOrderBaru = orderBaru.val();
        $.ajax({
            url: "/OrderKerjaYangAktifPadaMesin/",
            type: "POST",
            data: {
                idMesin: selectedNamaMesin,
                idOrder: selectedOrderBaru,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: data.success,
                        showConfirmButton: false,
                    }).then(() => {
                        getDataMesinAktif();
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
