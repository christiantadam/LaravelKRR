// Form Input
let tanggal = document.getElementById("tanggal");
let jam = document.getElementById("jam");
let nometer = document.getElementById("nometer");
let nometersearch = document.getElementById("nometersearch");
let counter = document.getElementById("counter");
let teknisi = document.getElementById("teknisi");
let id = document.getElementById("hiddenNomorpdam");

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

var currentDateTime = new Date();
var hours = currentDateTime.getHours().toString().padStart(2, "0");
var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
var timeString = hours + ":" + minutes;

jam.value = timeString;

// Form Button
let inputButton = document.getElementById("inputButton");
let cancelButton = document.getElementById("cancelButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let saveButton = document.getElementById("saveButton");
let refreshButton = document.getElementById("refreshButton");

function clearForm() {
    nometer.value = "";
    counter.value = "";
    teknisi.value = "";
    id.value = "";
}

saveButton.disabled = true;
tanggal.disabled = true;
jam.disabled = true;
nometer.disabled = true;
counter.disabled = true;
teknisi.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        jam.value.trim() !== "" &&
        nometer.value.trim() !== "" &&
        counter.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

// Add event listeners to enable/disable saveButton based on input field values
[tanggal, jam, nometer, counter, teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    jam.disabled = false;
    nometer.disabled = false;
    counter.disabled = false;
    teknisi.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    $(".checkboxpdam").prop("checked", false);
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    jam.disabled = true;
    nometer.disabled = true;
    counter.disabled = true;
    teknisi.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;
    inputButton.disabled = false;
    clearForm();
    $(".checkboxpdam").prop("checked", false);
    saveButton.disabled = true;
});

updateButton.addEventListener("click", function () {
    var checkboxValues = $(".checkboxpdam:checked")
        .map(function () {
            return this.value;
        })
        .get();

    // Check if there are selected checkboxes
    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data PDAM untuk diperbarui.",
        });
        deleteButton.disabled = false;
        inputButton.disabled = false;
    } else {
        tanggal.disabled = false;
        jam.disabled = false;
        nometer.disabled = false;
        counter.disabled = false;
        teknisi.disabled = false;
        inputButton.disabled = true;
        deleteButton.disabled = true;
        saveButton.disabled = false;
    }
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearForm();
    $(".checkboxpdam").prop("checked", false);
    nometersearch.value = "";
    saveButton.disabled = true;
});

$(document).ready(function () {
    $("#saveButton").click(function () {
        var tanggalValue = $("#tanggal").val();
        var jamValue = $("#jam").val();
        var meterValue = $("#nometer").val();
        var counterValue = $("#counter").val();
        var teknisiValue = $("#teknisi").val();
        var nomorpdamValue = $("#hiddenNomorpdam").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            Jam: jamValue,
            Meter: meterValue,
            Counter: counterValue,
            Teknisi: teknisiValue,
        };
        if (nomorpdamValue) {
            requestData.Nomorpdam = nomorpdamValue;
        }

        $.ajax({
            url: nomorpdamValue ? "/update-pdam" : "/save-pdam",
            method: nomorpdamValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                nomorpdamValue
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
                updateButton.disabled = false;
                deleteButton.disabled = false;
                tanggal.disabled = true;
                jam.disabled = true;
                nometer.disabled = true;
                counter.disabled = true;
                teknisi.disabled = true;
                clearForm();
                dataTable.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
                clearForm();
            },
        });
    });

    var dataTable = $("#table-pdam").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-pdam",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMeter = $("#nometersearch").val();
            },
        },
        columns: [
            {
                data: "nomor",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxpdam" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var date = moment.utc(data).local();
                    return date.format("MM/DD/YYYY");
                },
            },
            {
                data: "jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "nometer" },
            { data: "counter" },
            { data: "teknisi" },
        ],
    });

    $("#refreshButton").click(function () {
        tanggal.disabled = true;
        jam.disabled = true;
        nometer.disabled = true;
        counter.disabled = true;
        teknisi.disabled = true;
        clearForm();
        dataTable.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpdam", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;
            var selectedRow = $(this).closest("tr");
            var selectedDate = selectedRow.find("td:eq(1)").text();
            var formattanggal = moment(selectedDate, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
            );
            var selectedJam = selectedRow.find("td:eq(2)").text();
            var selectedNoMeter = selectedRow.find("td:eq(3)").text();
            var selectedCounter = selectedRow.find("td:eq(4)").text();
            var selectedTeknisi = selectedRow.find("td:eq(5)").text();

            var selectedNomorpdam = $(this).val();

            $("#hiddenNomorpdam").val(selectedNomorpdam);
            $("#tanggal").val(formattanggal);
            $("#jam").val(selectedJam);
            $("#nometer").val(selectedNoMeter);
            $("#counter").val(selectedCounter);
            $("#teknisi").val(selectedTeknisi);
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxpdam:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data PDAM untuk dihapus.",
            });
            return;
        }
        // Use SweetAlert for confirmation
        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data PDAM terpilih?",
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
                    url: "/delete-pdam",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data PDAM Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        tanggal.disabled = true;
                        jam.disabled = true;
                        nometer.disabled = true;
                        counter.disabled = true;
                        teknisi.disabled = true;
                        dataTable.ajax.reload();
                        clearForm();
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
