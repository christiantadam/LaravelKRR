// tanggal form
var tanggal_Input = document.getElementById("tanggal");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// tanggal awal search
var tanggal_awalInput = document.getElementById("tanggal-awal");
var tanggal_awalOutput = new Date().toISOString().split("T")[0];
tanggal_awalInput.value = tanggal_awalOutput;

// tanggal akhir search
var tanggal_akhirInput = document.getElementById("tanggal-akhir");
var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
tanggal_akhirInput.value = tanggal_akhirOutput;

tanggal_akhirInput.addEventListener("change", function () {
    // Ambil nilai tanggal awal dan tanggal akhir
    var tanggal_awal = new Date(tanggal_awalInput.value);
    var tanggal_akhir = new Date(tanggal_akhirInput.value);

    // Periksa apakah tanggal akhir kurang dari tanggal awal
    if (tanggal_akhir < tanggal_awal) {
        // Tampilkan pesan peringatan menggunakan SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tanggal akhir tidak boleh lebih kecil dari tanggal awal",
            confirmButtonText: "OK",
        }).then((result) => {
            // Set ulang nilai tanggal akhir ke nilai tanggal awal
            tanggal_akhirInput.value = tanggal_awalInput.value;
        });
    }
});
tanggal_awalInput.addEventListener("change", function () {
    // Ambil nilai tanggal awal dan tanggal akhir
    var tanggal_awal = new Date(tanggal_awalInput.value);
    var tanggal_akhir = new Date(tanggal_akhirInput.value);

    // Periksa apakah tanggal awal lebih besar dari tanggal akhir
    if (tanggal_awal > tanggal_akhir) {
        // Set ulang nilai tanggal akhir ke nilai tanggal awal
        tanggal_akhirInput.value = tanggal_awalInput.value;
    }
});

// Form Button
let inputButton = document.getElementById("inputButton");
let cancelButton = document.getElementById("cancelButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let saveButton = document.getElementById("saveButton");
let refreshButton = document.getElementById("refreshButton");

// Form Input
let tanggal = document.getElementById("tanggal");
let mesingenzet = document.getElementById("mesingenzet");
let jam_awal = document.getElementById("jam_awal");
let jam_akhir = document.getElementById("jam_akhir");
let operationhours = document.getElementById("operationhours");
let lubeoil = document.getElementById("lubeoil");
let coolwater = document.getElementById("coolwater");
let volt = document.getElementById("volt");
let hz = document.getElementById("hz");
let amp = document.getElementById("amp");
let tambahbbm = document.getElementById("tambahbbm");
let tambahoil = document.getElementById("tambahoil");
let statuslog = document.getElementById("statuslog");
let teknisi = document.getElementById("teknisi");
let keterangan = document.getElementById("keterangan");
let id = document.getElementById("hiddenNomorgenzet");

if (jam_awal) {
    function updateCurrentTime() {
        var currentDateTime = new Date();
        var hours = currentDateTime.getHours().toString().padStart(2, "0");
        var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
        var timeString = hours + ":" + minutes;

        jam_awal.value = timeString;
    }
    updateCurrentTime();

    // Update time every second (1000 milliseconds)
    //setInterval(updateCurrentTime, 1000);
}

var currentDateTime = new Date();
var hours = currentDateTime.getHours().toString().padStart(2, "0");
var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
var timeString = hours + ":" + minutes;

jam_awal.value = timeString;

tanggal.disabled = true;
mesingenzet.disabled = true;
jam_awal.disabled = true;
jam_akhir.disabled = true;
operationhours.disabled = true;
lubeoil.disabled = true;
coolwater.disabled = true;
volt.disabled = true;
hz.disabled = true;
amp.disabled = true;
tambahbbm.disabled = true;
tambahoil.disabled = true;
statuslog.disabled = true;
teknisi.disabled = true;
keterangan.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;
saveButton.disabled = true;

function clearForm() {
    // tanggal.value = "";
    mesingenzet.value = "";
    jam_akhir.value = "";
    operationhours.value = "";
    lubeoil.value = "";
    coolwater.value = "";
    volt.value = "";
    hz.value = "";
    amp.value = "";
    tambahbbm.value = "";
    tambahoil.value = "";
    statuslog.value = "";
    teknisi.value = "";
    keterangan.value = "";
    id.value = "";
}

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        mesingenzet.value.trim() !== "" &&
        jam_awal.value.trim() !== "" &&
        jam_akhir.value.trim() !== "" &&
        operationhours.value.trim() !== "" &&
        lubeoil.value.trim() !== "" &&
        coolwater.value.trim() !== "" &&
        volt.value.trim() !== "" &&
        hz.value.trim() !== "" &&
        amp.value.trim() !== "" &&
        tambahbbm.value.trim() !== "" &&
        tambahoil.value.trim() !== "" &&
        statuslog.value.trim() !== "" &&
        teknisi.value.trim() !== "" &&
        keterangan.value.trim() !== ""
    );
}

[
    tanggal,
    mesingenzet,
    jam_awal,
    jam_akhir,
    operationhours,
    lubeoil,
    coolwater,
    volt,
    hz,
    amp,
    tambahbbm,
    tambahoil,
    statuslog,
    teknisi,
    keterangan,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

function formatDecimal(value) {
    if (value === null || value === undefined || value === "") return "0.00";
    var num = parseFloat(value);
    if (isNaN(num)) return "0.00";
    return num.toFixed(2);
}

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    mesingenzet.disabled = false;
    jam_awal.disabled = false;
    jam_akhir.disabled = false;
    operationhours.disabled = false;
    lubeoil.disabled = false;
    coolwater.disabled = false;
    volt.disabled = false;
    hz.disabled = false;
    amp.disabled = false;
    tambahbbm.disabled = false;
    tambahoil.disabled = false;
    statuslog.disabled = false;
    teknisi.disabled = false;
    keterangan.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    inputButton.disabled = true;

    // Clear Form
    clearForm();

    $(".checkboxgenzet").prop("checked", false);
});

// InputButton click
updateButton.addEventListener("click", function () {
    var checkboxValues = $(".checkboxgenzet:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data Genzet untuk diperbarui.",
        });
        deleteButton.disabled = false;
        inputButton.disabled = false;
    } else {
        tanggal.disabled = false;
        mesingenzet.disabled = false;
        jam_awal.disabled = false;
        jam_akhir.disabled = false;
        operationhours.disabled = false;
        lubeoil.disabled = false;
        coolwater.disabled = false;
        volt.disabled = false;
        hz.disabled = false;
        amp.disabled = false;
        tambahbbm.disabled = false;
        tambahoil.disabled = false;
        statuslog.disabled = false;
        teknisi.disabled = false;
        keterangan.disabled = false;
        deleteButton.disabled = true;
        inputButton.disabled = true;
        saveButton.disabled = false;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    inputButton.disabled = false;
    mesingenzet.disabled = true;
    jam_awal.disabled = true;
    jam_akhir.disabled = true;
    operationhours.disabled = true;
    lubeoil.disabled = true;
    coolwater.disabled = true;
    volt.disabled = true;
    hz.disabled = true;
    amp.disabled = true;
    tambahbbm.disabled = true;
    tambahoil.disabled = true;
    statuslog.disabled = true;
    teknisi.disabled = true;
    keterangan.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;
    inputButton.disabled = false;
    // Clear Form
    clearForm();
    $(".checkboxgenzet").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

t Data
    var dataTable = $("#table-genzet").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-genzet",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMesin = $("#MesinSearch").val();
            },
        },
        columns: [
            {
                data: "NoTransaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxgenzet" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = moment.utc(data).local();
                    return date.format("MM/DD/YYYY");
                },
            },
            { data: "NamaMesin" },
            {
                data: "JamAwalProduksi",
                render: function (data, type, full, meta) {
                    var startDate = new Date(data);
                    var endDate = new Date(full.JamAkhirProduksi);

                    var startHours = startDate
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = startDate
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");

                    var endHours = endDate
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = endDate
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");

                    return (
                        startHours +
                        ":" +
                        startMinutes +
                        " - " +
                        endHours +
                        ":" +
                        endMinutes
                    );
                },
            },
            {
                data: "OperationHour",
                render: function (data) {
                    return formatDecimal(data);
                },
            },
            {
                data: "LubeOil",
                render: function (data) {
                    return formatDecimal(data);
                },
            },
            {
                data: "CoolWater",
                render: function (data) {
                    return formatDecimal(data);
                },
            },
            {
                data: "Volt380",
                render: function (data) {
                    return formatDecimal(data);
                },
            },
            {
                data: "HZ",
                render: function (data) {
                    return formatDecimal(data);
                },
            },
            {
                data: "Amp",
                render: function (data) {
                    return formatDecimal(data);
                },
            },
            { data: "StatusLog" },
            { data: "Teknisi" },
            { data: "Keterangan" },
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        $(".checkboxgenzet").prop("checked", false);
    });

    // Save Data
    $("#saveButton").click(function () {
        var tanggalValue = tanggal.value;
        var mesinGenzetValue = mesingenzet.value;
        var jamAwalValue = jam_awal.value;
        var jamAkhirValue = jam_akhir.value;
        var operationValue = operationhours.value;
        var lubeOilValue = lubeoil.value;
        var waterValue = coolwater.value;
        var voltValue = volt.value;
        var hzValue = hz.value;
        var ampValue = amp.value;
        var bbmValue = tambahbbm.value;
        var oilValue = tambahoil.value;
        var statusLogValue = statuslog.value;
        var teknisiValue = teknisi.value;
        var keteranganValue = keterangan.value;
        var nomorgenzetValue = id.value;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            MesinGenzet: mesinGenzetValue,
            JamAwal: jamAwalValue,
            JamAkhir: jamAkhirValue,
            OperationHours: operationValue,
            LubeOil: lubeOilValue,
            CoolWater: waterValue,
            Volt: voltValue,
            Hz: hzValue,
            Amp: ampValue,
            TambahBBM: bbmValue,
            TambahOil: oilValue,
            StatusLog: statusLogValue,
            Teknisi: teknisiValue,
            Keterangan: keteranganValue,
        };
        if (nomorgenzetValue) {
            requestData.NomorGenzet = nomorgenzetValue;
        }

        $.ajax({
            url: nomorgenzetValue ? "/update-genzet" : "/save-genzet",
            method: nomorgenzetValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                nomorgenzetValue
                    ? Swal.fire({
                          icon: "success",
                          title: "Data Berhasil Diperbarui!",
                          showConfirmButton: false,
                          timer: "2000",
                      })
                    : Swal.fire({
                          icon: "success",
                          title: "Data Berhasil Disimpan!",
                          showConfirmButton: false,
                          timer: "2000",
                      });
                clearForm();
                dataTable.ajax.reload();
                updateButton.disabled = false;
                deleteButton.disabled = false;
                inputButton.disabled = false;
                saveButton.disabled = true;
                tanggal.disabled = true;
                mesingenzet.disabled = true;
                jam_awal.disabled = true;
                jam_akhir.disabled = true;
                operationhours.disabled = true;
                lubeoil.disabled = true;
                coolwater.disabled = true;
                volt.disabled = true;
                hz.disabled = true;
                amp.disabled = true;
                tambahbbm.disabled = true;
                tambahoil.disabled = true;
                statuslog.disabled = true;
                teknisi.disabled = true;
                keterangan.disabled = true;
                tanggal_Input.value = tanggal_Output;
                jam_awal.value = timeString;
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    $("tbody").on("click", ".checkboxgenzet", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedNomorgenzet = $(this).val();

            $("#hiddenNomorgenzet").val(selectedNomorgenzet);

            $.ajax({
                url: "/get-operational-genzet",
                type: "GET",
                data: { nomorGenzet: selectedNomorgenzet },
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                success: function (data) {
                    var date = new Date(data.Tanggal + "Z");
                    tanggal.value = date.toISOString().split("T")[0];
                    mesingenzet.value = data.NoMesin;

                    var startHours = new Date(data.JamAwalProduksi + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.JamAwalProduksi + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_awal.value = startHours + ":" + startMinutes;

                    var endHours = new Date(data.JamAkhirProduksi + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = new Date(data.JamAkhirProduksi + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_akhir.value = endHours + ":" + endMinutes;

                    operationhours.value = parseFloat(data.OperationHour);
                    lubeoil.value = parseFloat(data.LubeOil);
                    coolwater.value = parseFloat(data.CoolWater);
                    volt.value = parseFloat(data.Volt380);
                    hz.value = parseFloat(data.HZ);
                    amp.value = parseFloat(data.Amp);
                    tambahbbm.value = parseFloat(data.TambahBBM);
                    tambahoil.value = parseFloat(data.TambahOil);
                    statuslog.value = data.StatusLog;
                    teknisi.value = data.Teknisi;
                    keterangan.value = data.Keterangan;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        } else {
            $("#tanggal").val(tanggal_Output);

            clearForm();
        }
    });

    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxgenzet:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data Genzet untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data Genzet terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    Nomor: checkboxValues,
                };

                $.ajax({
                    url: "/delete-genzet",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Genzet Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });

                        dataTable.ajax.reload();
                        clearForm();
                        tanggal_Input.value = tanggal_Output;
                        jam_awal.value = timeString;
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //

// Modal Status Log

let updateButtonStatusLog = document.getElementById("updateButtonStatusLog");
let deleteButtonStatusLog = document.getElementById("deleteButtonStatusLog");
let saveButtonStatusLog = document.getElementById("saveButtonStatusLog");
let refreshButtonStatusLog = document.getElementById("refreshButtonStatusLog");
let StatusLog = document.getElementById("statuslogmodalinput");

saveButtonStatusLog.disabled = true;
updateButtonStatusLog.disabled = false;
deleteButtonStatusLog.disabled = false;

function checkAllFieldsFilled1() {
    return StatusLog.value.trim() !== "";
}

// InputButton click
updateButtonStatusLog.addEventListener("click", function () {
    var checkboxValues = $(".checkboxstatuslog:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data Status Log untuk diperbarui.",
        });
        deleteButtonStatusLog.disabled = false;
    } else {
        StatusLog.disabled = false;
        deleteButtonStatusLog.disabled = true;
    }
});

[StatusLog].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonStatusLog.disabled = !checkAllFieldsFilled1();
    });
});

odalstatus").click(function (e) {
        e.preventDefault();
        StatusLog.value = "";
        $("#hiddenIdStatusLog").val("");
        dataTableStatusLog.ajax.reload();
    });

    $("#modalStatusLog").on("hidden.bs.modal", function (e) {
        // Lakukan AJAX request untuk memuat kembali data keterangan
        $.ajax({
            url: "/reloadStatus",
            method: "GET",
            success: function (response) {
                // Mengosongkan dan memuat ulang opsi pada elemen select untuk keterangan
                var statusLog = $("#statuslog");
                statusLog.empty();
                statusLog.append(
                    "<option selected disabled>" +
                        "Pilih Status Log..." +
                        "</option>"
                );
                response.forEach(function (data) {
                    statusLog.append(
                        '<option value="' +
                            data.NoStatusLog +
                            '">' +
                            data.NamaStatusLog +
                            "</option>"
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error(error); // Menangani kesalahan jika terjadi
            },
        });
    });
    var dataTableStatusLog = $("#table-statuslog").DataTable({
        serverSide: true,
        responsive: true,
        searching: false,
        ordering: false,
        scrollY: 200,
        ajax: {
            url: "/get-statuslog",
            type: "GET",
        },
        columns: [
            {
                data: "NoStatusLog",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxstatuslog" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "NamaStatusLog" },
        ],
    });

    $("#refreshButtonStatusLog").click(function () {
        $("#statuslogmodalinput").val("");
        $("#hiddenIdStatusLog").val("");
        dataTableStatusLog.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxstatuslog", function () {
        if ($(this).prop("checked")) {
            updateButtonStatusLog.disabled = false;
            deleteButtonStatusLog.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedStatusLog = selectedRow.find("td:eq(1)").text();

            var selectedId = $(this).val();

            $("#statuslogmodalinput").val(selectedStatusLog);
            $("#hiddenIdStatusLog").val(selectedId);
        } else {
            $("#statuslogmodalinput").val("");
            $("#hiddenIdStatusLog").val("");
            updateButtonStatusLog.disabled = true;
            deleteButtonStatusLog.disabled = true;
        }
    });

    // DeleteButton click
    $("#deleteButtonStatusLog").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxstatuslog:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Status Log untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus Status Log terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    Nomor: checkboxValues,
                };

                $.ajax({
                    url: "/delete-statuslog",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        console.log(response.message);
                        dataTableStatusLog.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: response.message,
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        $("#statuslogmodalinput").val("");
                        $("#hiddenIdStatusLog").val("");
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });

    $("#saveButtonStatusLog").click(function () {
        var StatusLogValue = $("#statuslogmodalinput").val();
        var nomorIdValue = $("#hiddenIdStatusLog").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            StatusLog: StatusLogValue,
        };
        if (nomorIdValue) {
            requestData.NomorId = nomorIdValue;
        }

        $.ajax({
            url: nomorIdValue ? "/update-statuslog" : "/save-statuslog",
            method: nomorIdValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                nomorIdValue
                    ? Swal.fire({
                          icon: "success",
                          title: "Data Berhasil Diperbarui!",
                          showConfirmButton: false,
                          timer: "2000",
                      })
                    : Swal.fire({
                          icon: "success",
                          title: "Data Berhasil Disimpan!",
                          showConfirmButton: false,
                          timer: "2000",
                      });

                $.ajax({
                    type: "GET",
                    url: "/getstatus",
                    success: function (data) {
                        var dropdown = $("#statuslog");
                        dropdown
                            .empty()
                            .append(
                                "<option selected disabled>Pilih Status Log...</option>"
                            );
                        $.each(data, function (index, item) {
                            dropdown.append(
                                '<option value="' +
                                    item.NoStatusLog +
                                    '">' +
                                    item.NamaStatusLog +
                                    "</option>"
                            );
                        });
                    },
                });
                // Clear Form
                $("#statuslogmodalinput").val("");
                $("#statuslog").empty();
                $("#statuslog").append();
                $("#hiddenIdStatusLog").val("");
                dataTableStatusLog.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });
});
