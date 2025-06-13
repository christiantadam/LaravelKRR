// Form Input
let tanggal = document.getElementById("tanggal");
let feeder = document.getElementById("feeder");
let jam_gangguan = document.getElementById("jam_gangguan");
let jam_selesai = document.getElementById("jam_selesai");
let ket_gangguan = document.getElementById("ket_gangguan");
let teknisi = document.getElementById("teknisi");
let keterangan = document.getElementById("keterangan");
let id_transaksi = document.getElementById("hiddenNomorpanel");

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
if (jam_gangguan) {
    function updateCurrentTime() {
        var currentDateTime = new Date();
        var hours = currentDateTime.getHours().toString().padStart(2, "0");
        var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
        var timeString = hours + ":" + minutes;

        jam_gangguan.value = timeString;
    }
    updateCurrentTime();

    // Update time every second (1000 milliseconds)
    //setInterval(updateCurrentTime, 1000);
}

var currentDateTime = new Date();
var hours = currentDateTime.getHours().toString().padStart(2, "0");
var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
var timeString = hours + ":" + minutes;

jam_gangguan.value = timeString;

// Form Button
let inputButton = document.getElementById("inputButton");
let cancelButton = document.getElementById("cancelButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let saveButton = document.getElementById("saveButton");
let refreshButton = document.getElementById("refreshButton");

function clearForm() {
    feeder.value = "";
    jam_selesai.value = "";
    ket_gangguan.value = "";
    keterangan.value = "";
    teknisi.value = "";
    id_transaksi.value = "";
    jam_gangguan.value = timeString;
}

saveButton.disabled = true;
tanggal.disabled = true;
feeder.disabled = true;
jam_gangguan.disabled = true;
jam_selesai.disabled = true;
ket_gangguan.disabled = true;
keterangan.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;
teknisi.disabled = true;

// Function to check if all fields are filled
function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        feeder.value.trim() !== "" &&
        jam_gangguan.value !== "" &&
        jam_selesai.value.trim() !== "" &&
        ket_gangguan.value.trim() !== ""
    );
}

// Add event listeners to enable/disable saveButton based on input field values
[tanggal, feeder, jam_gangguan, jam_selesai, ket_gangguan].forEach(function (
    inputField
) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    // Disable input fields and disable Update and Delete buttons
    tanggal.disabled = false;
    feeder.disabled = false;
    jam_gangguan.disabled = false;
    jam_selesai.disabled = false;
    ket_gangguan.disabled = false;
    keterangan.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    inputButton.disabled = true;
    teknisi.disabled = false;
    $(".checkboxpanel").prop("checked", false);
    console.log(jam_gangguan);
});

// UpdateButton click
updateButton.addEventListener("click", function () {
    saveButton.disabled = false;
    var checkboxValues = $(".checkboxpanel:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data Gangguan Panel untuk diperbarui.",
        });
        deleteButton.disabled = false;
        inputButton.disabled = false;
    } else {
        tanggal.disabled = false;
        feeder.disabled = false;
        jam_gangguan.disabled = false;
        jam_selesai.disabled = false;
        ket_gangguan.disabled = false;
        keterangan.disabled = false;
        teknisi.disabled = false;
        inputButton.disabled = true;
        deleteButton.disabled = true;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    inputButton.disabled = false;
    feeder.disabled = true;
    jam_gangguan.disabled = true;
    jam_selesai.disabled = true;
    ket_gangguan.disabled = true;
    keterangan.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;
    teknisi.disabled = true;
    clearForm();
    saveButton.disabled = true;

    $(".checkboxpanel").prop("checked", false);
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearForm();
    $(".checkboxpanel").prop("checked", false);
    saveButton.disabled = true;
});

$(document).ready(function () {
    $("#saveButton").click(function () {
        var tanggalValue = tanggal.value;
        var feederValue = feeder.value;
        var startValue = jam_gangguan.value;
        var endValue = jam_selesai.value;
        var ket_ganggguanValue = ket_gangguan.value;
        var teknisiValue = teknisi.value;
        var keteranganValue = keterangan.value;
        var nomorpanelValue = $("#hiddenNomorpanel").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            Feeder: feederValue,
            JamMulai: startValue,
            JamSelesai: endValue,
            Gangguan: ket_ganggguanValue,
            Teknisi: teknisiValue,
            Keterangan: keteranganValue,
        };
        if (nomorpanelValue) {
            requestData.NomorPanel = nomorpanelValue;
        }

        console.log(requestData);

        $.ajax({
            url: nomorpanelValue ? "/update-panel" : "/save-panel",
            method: nomorpanelValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                nomorpanelValue
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
                tanggal.disabled = true;
                feeder.disabled = true;
                jam_gangguan.disabled = true;
                jam_selesai.disabled = true;
                ket_gangguan.disabled = true;
                jam_gangguan.value = timeString;
                keterangan.disabled = true;
                updateButton.disabled = false;
                deleteButton.disabled = false;
                updateButton.disabled = false;
                deleteButton.disabled = false;
                inputButton.disabled = false;
                saveButton.disabled = true;
                tanggal_Input.value = tanggal_Output;
                jam_gangguan.value = timeString;

                teknisi.disabled = true;

                clearForm();
                dataTable.ajax.reload();
                console.log(response);
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
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    var dataTable = $("#table-panelinduk").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-panel",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
            },
        },
        columns: [
            {
                data: "Id_transaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxpanel" value="' +
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
            { data: "Feeder_line" },
            {
                data: "Start_time",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "Finish_time",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "L_Gangguan_panel_induk",
                render: function (data, type, full, meta) {
                    return full.Ket_gangguan;
                },
            },
            { data: "Keterangan" },
            {
                data: null,
            defaultContent: "",
            render: function (data, type, full, meta) {
                return full.NamaUser ? full.NamaUser : full.User_log;
                },
            },
        ],
    });

    $("#refreshButton").click(function () {
        tanggal.disabled = true;
        feeder.disabled = true;
        jam_gangguan.disabled = true;
        jam_selesai.disabled = true;
        ket_gangguan.disabled = true;
        keterangan.disabled = true;
        clearForm();
        dataTable.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpanel", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedNomorpanel = $(this).val();

            $("#hiddenNomorpanel").val(selectedNomorpanel);

            $.ajax({
                url: "/get-panel-id",
                type: "GET",
                data: { id: selectedNomorpanel },
                success: function (data) {
                    console.log(data);

                    var date = new Date(data.data[0].tanggal + "Z");
                    tanggal.value = date.toISOString().split("T")[0];

                    feeder.value = data.data[0].Feeder_line.trim()

                    var startHours = new Date(data.data[0].Start_time + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.data[0].Start_time + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_gangguan.value = startHours + ":" + startMinutes;

                    var endHours = new Date(data.data[0].Finish_time + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = new Date(data.data[0].Finish_time + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_selesai.value = endHours + ":" + endMinutes;

                    ket_gangguan.value = data.data[0].L_Gangguan_panel_induk;
                    teknisi.value = data.data[0].NamaUser;
                    keterangan.value = data.data[0].Keterangan;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            $("#tanggal").val(tanggal_Output);
            clearForm();
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxpanel:checked")
            .map(function () {
                return this.value;
            })
            .get();

        // Check if there are selected checkboxes
        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data Panel untuk dihapus.",
            });
            return; // Abort further processing
        }

        // Use SweetAlert for confirmation
        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data Panel yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    id: checkboxValues,
                };

                $.ajax({
                    url: "/delete-panel",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    beforeSend: function () {
                        // Show loading screen
                        $("#loading-screen").css("display", "flex");
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Panel Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        clearForm();
                        jam_gangguan.value = timeString;
                        tanggal_Input.value = tanggal_Output;
                        dataTable.ajax.reload();
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                    complete: function () {
                        // Hide loading screen
                        $("#loading-screen").css("display", "none");
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------ //

//Modal Keterangan Gangguan

let updateButtonKeterangan = document.getElementById("updateButtongangguan");
let deleteButtonKeterangan = document.getElementById("deleteButtongangguan");
let saveButtonKeterangan = document.getElementById("saveButtongangguan");
let refreshButtonKeterangan = document.getElementById("refreshButtongangguan");
let keterangan_gangguan = document.getElementById("keterangan_gangguan");

saveButtonKeterangan.disabled = true;
updateButtonKeterangan.disabled = false;
deleteButtonKeterangan.disabled = false;

updateButtonKeterangan.addEventListener("click", function () {
    var checkboxValues = $(".checkboxketgangguan:checked")
        .map(function () {
            return this.value;
        })
        .get();

    // Check if there are selected checkboxes
    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu Keterangan Gangguan untuk diperbarui.",
        });
        deleteButtonKeterangan.disabled = false;
    } else {
        saveButtonKeterangan.disabled = true;
        deleteButtonKeterangan.disabled = false;
    }
});

// Function to check if all fields are filled
function checkAllFieldsFilled1() {
    return keterangan_gangguan.value.trim() !== "";
}

// Add event listeners to enable/disable saveButton based on input field values
[keterangan_gangguan].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonKeterangan.disabled = !checkAllFieldsFilled1();
    });
});

$(document).ready(function () {
    $("#openmodal").click(function (e) {
        e.preventDefault();
        $("#keterangan_gangguan").val("");
        $("#hiddenIdKeterangan").val("");
        dataTableKeterangan.ajax.reload();
    });

    // Menangkap event ketika modal ditutup
    $("#KetGangguanModal").on("hidden.bs.modal", function (e) {
        // Lakukan AJAX request untuk memuat kembali data keterangan
        $.ajax({
            url: "/reloadKeterangan",
            method: "GET",
            success: function (response) {
                // Mengosongkan dan memuat ulang opsi pada elemen select untuk keterangan
                var selectKeterangan = $("#ket_gangguan");
                selectKeterangan.empty(); // Mengosongkan opsi yang ada
                // Memuat opsi baru dari data yang diperoleh melalui AJAX
                selectKeterangan.append(
                    "<option selected disabled>" +
                        "Pilih Keterangan Gangguan..." +
                        "</option>"
                );
                response.forEach(function (data) {
                    selectKeterangan.append(
                        '<option value="' +
                            data.Id_gangguan +
                            '">' +
                            data.Ket_gangguan +
                            "</option>"
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error(error); // Menangani kesalahan jika terjadi
            },
        });
    });

    var dataTableKeterangan = $("#table-ketgangguan").DataTable({
        serverSide: true,
        responsive: true,
        searching: false,
        ordering: false,
        scrollY: 200,
        ajax: {
            url: "/get-keterangangangguan",
            type: "GET",
        },
        columns: [
            {
                data: "Id_gangguan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxketgangguan" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "Ket_gangguan" },
        ],
    });

    $("#refreshButtongangguan").click(function () {
        $("#keterangan_gangguan").val("");
        $("#hiddenIdKeterangan").val("");
        dataTableKeterangan.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxketgangguan", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");

            var selectedKeterangan = selectedRow.find("td:eq(1)").text();

            var selectedId = $(this).val();

            $("#hiddenIdKeterangan").val(selectedId);
            $("#keterangan_gangguan").val(selectedKeterangan);
        } else {
            $("#keterangan_gangguan").val("");
            $("#hiddenIdKeterangan").val("");
        }
    });

    $("#deleteButtongangguan").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxketgangguan:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data Keterangan Gangguan untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data Keterangan Gangguan terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    id: checkboxValues,
                };

                $.ajax({
                    url: "/delete-keterangangangguan",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        dataTableKeterangan.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Keterangan Gangguan Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        $("#keterangan_gangguan").val("");
                        $("#hiddenIdKeterangan").val("");
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

    $("#saveButtongangguan").click(function () {
        var keteranganValue = $("#keterangan_gangguan").val();
        var nomorIdValue = $("#hiddenIdKeterangan").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Keterangan: keteranganValue,
        };
        if (nomorIdValue) {
            requestData.NomorId = nomorIdValue;
        }

        $.ajax({
            url: nomorIdValue
                ? "/update-keterangangangguan"
                : "/save-keterangangangguan",
            method: nomorIdValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
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

                // Clear Form
                $("#keterangan_gangguan").val("");
                $("#hiddenIdKeterangan").val("");
                dataTableKeterangan.ajax.reload();
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
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });
});
