// Form Input
let tanggal = document.getElementById("tanggal");
let mesin = document.getElementById("select_mesin");
let jam = document.getElementById("jam_operasi");
let part = document.getElementById("select_sparepart");
let keterangan = document.getElementById("select_keterangan");
let teknisi = document.getElementById("select_teknisi");
let id = document.getElementById("hiddenNomorPerawatan");

function date(data, type, full, meta) {
    var date = moment.utc(data).local();
    return date.format("MM/DD/YYYY");
}

// tanggal form
let tanggal_Input = document.getElementById("tanggal");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// tanggal awal search
let tanggal_awalInput = document.getElementById("tanggal-awal");
var tanggal_awalOutput = new Date().toISOString().split("T")[0];
tanggal_awalInput.value = tanggal_awalOutput;

// tanggal akhir search
let tanggal_akhirInput = document.getElementById("tanggal-akhir");
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

// Checkbox
let checkboxperawatan = document.getElementsByClassName("checkboxperawatan");

function clearForm() {
    mesin.value = "";
    jam.value = "";
    part.value = "";
    keterangan.value = "";
    teknisi.value = "";
    id.value = "";
}

saveButton.disabled = true;
tanggal.disabled = true;
mesin.disabled = true;
jam.disabled = true;
part.disabled = true;
keterangan.disabled = true;
teknisi.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;

// Function to check if all fields are filled
function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        mesin.value.trim() !== "" &&
        jam.value.trim() !== "" &&
        part.value.trim() !== "" &&
        keterangan.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

// Add event listeners to enable/disable saveButton based on input field values
[tanggal, mesin, jam, part, keterangan, teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    // Disable input fields and disable Update and Delete buttons
    inputButton.disabled = true;
    tanggal.disabled = false;
    tanggal.value = tanggal_Output;
    mesin.disabled = false;
    jam.disabled = false;
    part.disabled = false;
    keterangan.disabled = false;
    teknisi.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    clearForm();
    var selectKeterangan = $("#select_keterangan");
    selectKeterangan
        .empty()
        .append("<option selected disabled>Pilih keterangan...</option>");
    selectKeterangan.prop("disabled", false);
    $(".checkboxperawatan").prop("checked", false);
});

// UpdateButton click
updateButton.addEventListener("click", function () {
    var checkboxValues = $(".checkboxperawatan:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data perawatan untuk diperbarui.",
        });
        deleteButton.disabled = false;
        inputButton.disabled = false;
    } else {
        // Disable input fields and disable Update and Delete buttons
        tanggal.disabled = false;
        mesin.disabled = true;
        jam.disabled = false;
        part.disabled = true;
        keterangan.disabled = false;
        teknisi.disabled = false;
        deleteButton.disabled = true;
        inputButton.disabled = true;
        saveButton.disabled = false;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    inputButton.disabled = false;
    mesin.disabled = true;
    jam.disabled = true;
    part.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;
    var selectKeterangan = $("#select_keterangan");
    selectKeterangan
        .empty()
        .append("<option selected disabled>Pilih keterangan...</option>");
    selectKeterangan.prop("disabled", true);
    $(".checkboxperawatan").prop("checked", false);
    // Clear Form
    clearForm();
    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearForm();
    $(".checkboxperawatan").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

// Show Keterangan Input Perawatan
$(document).ready(function () {
    $("#select_sparepart").change(function () {
        var idPart = $(this).val();

        $.ajax({
            url: "/get-keterangan",
            method: "GET",
            data: { idPart: idPart },
            success: function (data) {
                // console.log(data);
                var selectKeterangan = $("#select_keterangan");
                selectKeterangan
                    .empty()
                    .append(
                        "<option selected disabled>Pilih keterangan...</option>"
                    );

                $.each(data, function (index, item) {
                    selectKeterangan.append(
                        '<option value="' +
                            item.NoKeteranganPart +
                            '">' +
                            item.Keterangan +
                            "</option>"
                    );
                });

                selectKeterangan.prop("disabled", false);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
});

$(document).ready(function () {
    var dataTable = $("#table-perawatan").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-perawatan",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMesin = $("#NoMesinSearch").val();
            },
        },
        columns: [
            {
                data: "NoPerawatan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxperawatan" value="' +
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
            { data: "JamOperasi" },
            { data: "NamaPart" },
            { data: "Keterangan" },
            {
                data: "Teknisi",
            },
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxperawatan", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedNomorPerawatan = $(this).val();

            $("#hiddenNomorPerawatan").val(selectedNomorPerawatan);

            $.ajax({
                url: "/get-perawatan-compressor",
                type: "GET",
                data: { id: selectedNomorPerawatan },
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                success: function (data) {
                    // console.log(data);

                    var date = new Date(data.Tanggal + "Z");
                    tanggal.value = date.toISOString().split("T")[0];
                    mesin.value = data.NoMesin;
                    jam.value = data.JamOperasi;
                    part.value = data.IdPart;
                    keterangan.value = data.NoKeteranganPart;
                    teknisi.value = data.Teknisi;

                    getKeteranganData(data.IdPart);
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

    // Save Data Perawatan
    $("#saveButton").click(function () {
        var tanggalValue = $("#tanggal").val();
        var noMesinValue = $("#select_mesin").val();
        var jamOperasiValue = $("#jam_operasi").val();
        var PartValue = $("#select_sparepart").val();
        var keteranganValue = $("#select_keterangan").val();
        var teknisiValue = $("#select_teknisi").val();
        var idValue = id.value;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            NoMesin: noMesinValue,
            JamOperasi: jamOperasiValue,
            IdPart: PartValue,
            Keterangan: keteranganValue,
            Teknisi: teknisiValue,
        };
        if (idValue) {
            requestData.id = idValue;
        }

        $.ajax({
            url: idValue ? "/update-perawatan" : "/save-perawatan",
            method: idValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                if (response.Error) {
                    Swal.fire({
                        icon: "error",
                        title: response.Error,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    if (idValue) {
                        Swal.fire({
                            icon: "success",
                            title: "Data Berhasil Diperbarui!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Data Berhasil Disimpan!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }
                    clearForm();
                    dataTable.ajax.reload();
                    inputButton.disabled = false;
                    updateButton.disabled = false;
                    deleteButton.disabled = false;
                    saveButton.disabled = true;
                    tanggal.disabled = true;
                    inputButton.disabled = false;
                    mesin.disabled = true;
                    jam.disabled = true;
                    part.disabled = true;
                    keterangan.disabled = true;
                    teknisi.disabled = true;
                    tanggal.value = tanggal_Output;
                }
            },
            error: function (error) {
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    function getKeteranganData(idPart) {
        $.ajax({
            url: "/get-keterangan",
            method: "GET",
            data: { idPart: idPart },
            success: function (data) {
                // console.log(data);
                var selectKeterangan = $("#select_keterangan");
                selectKeterangan;
                // .empty()
                // .append(
                //     "<option selected disabled>Pilih keterangan...</option>"
                // );

                $.each(data, function (index, item) {
                    selectKeterangan.append(
                        '<option value="' +
                            item.NoKeteranganPart +
                            '">' +
                            item.Keterangan +
                            "</option>"
                    );
                    // Di sini, saya menambahkan item.NoKeteranganPart di dalam opsi juga
                });

                selectKeterangan.prop("disabled", true);
            },
            error: function (error) {
                console.log(error);
            },
        });
    }

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxperawatan:checked")
            .map(function () {
                return this.value;
            })
            .get();

        // Check if there are selected checkboxes
        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu perawatan untuk dihapus.",
            });
            return; // Abort further processing
        }
        // Use SweetAlert for confirmation
        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus perawatan yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    NoPerawatan: checkboxValues,
                };
                $.ajax({
                    url: "/delete-perawatan",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        dataTable.ajax.reload();
                        clearForm();
                        $("#tanggal").val(tanggal_Output);
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
