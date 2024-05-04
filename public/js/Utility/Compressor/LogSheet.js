// Form Input

let tanggal = document.getElementById("tanggal");
let mesin = document.getElementById("mesin");
let jam_operasi = document.getElementById("jam");
let temp = document.getElementById("temp");
let bar = document.getElementById("bar");
let rm_hours = document.getElementById("rm_hours");
let lm_hours = document.getElementById("lm_hours");
let r_hours = document.getElementById("r_hours");
let l_hours = document.getElementById("l_hours");
let efs = document.getElementById("efs");
let tech = document.getElementById("tech");
let keterangan = document.getElementById("keterangan");
let id = document.getElementById("hiddenNoLogSheet");

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

if (jam_operasi) {
    function updateCurrentTime() {
        var currentDateTime = new Date();
        var hours = currentDateTime.getHours().toString().padStart(2, "0");
        var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
        var timeString = hours + ":" + minutes;

        jam_operasi.value = timeString;
    }
    updateCurrentTime();

    // // Update time every second (1000 milliseconds)
    // setInterval(updateCurrentTime, 1000);
}
var currentDateTime = new Date();
var hours = currentDateTime.getHours().toString().padStart(2, "0");
var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
var timeString = hours + ":" + minutes;
jam_operasi.value = timeString;

// Form Button
let inputButton = document.getElementById("inputButton");
let cancelButton = document.getElementById("cancelButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let saveButton = document.getElementById("saveButton");
let refreshButton = document.getElementById("refreshButton");

saveButton.disabled = true;
tanggal.disabled = true;
mesin.disabled = true;
jam_operasi.disabled = true;
temp.disabled = true;
bar.disabled = true;
rm_hours.disabled = true;
lm_hours.disabled = true;
r_hours.disabled = true;
l_hours.disabled = true;
efs.disabled = true;
tech.disabled = true;
keterangan.disabled = true;

function clearForm() {
    // tanggal.value = "";
    mesin.value = "";
    temp.value = "";
    bar.value = "";
    rm_hours.value = "";
    lm_hours.value = "";
    r_hours.value = "";
    l_hours.value = "";
    efs.value = "";
    tech.value = "";
    keterangan.value = "";
    id.value = "";
}

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    inputButton.disabled = true;
    mesin.disabled = false;
    jam_operasi.disabled = false;
    temp.disabled = false;
    bar.disabled = false;
    rm_hours.disabled = false;
    lm_hours.disabled = false;
    r_hours.disabled = false;
    l_hours.disabled = false;
    efs.disabled = false;
    tech.disabled = false;
    keterangan.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    //saveButton.disabled = false;
    clearForm();
    $(".checkboxlogsheet").prop("checked", false);
});

// UpdateButton click
updateButton.addEventListener("click", function () {
    var checkboxValues = $(".checkboxlogsheet:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data LogSheet untuk diperbarui.",
        });
        deleteButton.disabled = false;
        inputButton.disabled = false;
    } else {
        // Disable input fields and disable Update and Delete buttons
        tanggal.disabled = false;
        mesin.disabled = false;
        jam_operasi.disabled = false;
        temp.disabled = false;
        bar.disabled = false;
        rm_hours.disabled = false;
        lm_hours.disabled = false;
        r_hours.disabled = false;
        l_hours.disabled = false;
        efs.disabled = false;
        tech.disabled = false;
        keterangan.disabled = false;
        updateButton.disabled = false;
        deleteButton.disabled = true;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    inputButton.disabled = false;
    mesin.disabled = true;
    jam_operasi.disabled = true;
    temp.disabled = true;
    bar.disabled = true;
    rm_hours.disabled = true;
    lm_hours.disabled = true;
    r_hours.disabled = true;
    l_hours.disabled = true;
    efs.disabled = true;
    tech.disabled = true;
    keterangan.disabled = true;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    // Clear Form
    clearForm();
    $(".checkboxlogsheet").prop("checked", false);

    // Disable saveButton
    saveButton.disabled = true;
});

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        mesin.value.trim() !== "" &&
        jam_operasi.value.trim() !== "" &&
        temp.value.trim() !== "" &&
        bar.value.trim() !== "" &&
        rm_hours.value.trim() !== "" &&
        lm_hours.value.trim() !== "" &&
        r_hours.value.trim() !== "" &&
        l_hours.value.trim() !== "" &&
        efs.value.trim() !== "" &&
        tech.value.trim() !== "" &&
        keterangan.value.trim() !== ""
    );
}

[
    tanggal,
    mesin,
    jam_operasi,
    temp,
    bar,
    rm_hours,
    lm_hours,
    r_hours,
    l_hours,
    efs,
    tech,
    keterangan,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// Save Data Log Sheet
$(document).ready(function () {
    $("#saveButton").click(function () {
        var TanggalValue = $("#tanggal").val();
        var MesinValue = $("#mesin").val();
        var JamValue = $("#jam").val();
        var TempValue = $("#temp").val();
        var BarValue = $("#bar").val();
        var RM_HoursValue = $("#rm_hours").val();
        var LM_HoursValue = $("#lm_hours").val();
        var R_HoursValue = $("#r_hours").val();
        var L_HoursValue = $("#l_hours").val();
        var EfsValue = $("#efs").val();
        var TechValue = $("#tech").val();
        var KeteranganValue = $("#keterangan").val();
        var idValue = id.value;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: TanggalValue,
            Mesin: MesinValue,
            Jam: JamValue,
            Temp: TempValue,
            Bar: BarValue,
            RM_Hours: RM_HoursValue,
            LM_Hours: LM_HoursValue,
            R_Hours: R_HoursValue,
            L_Hours: L_HoursValue,
            Efs: EfsValue,
            Tech: TechValue,
            Keterangan: KeteranganValue,
        };
        if (idValue) {
            requestData.id = idValue;
        }

        $.ajax({
            url: idValue ? "/update-logsheet" : "/save-logsheet",
            method: idValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log("Data saved successfully:", response);
                idValue
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
                inputButton.disabled = false;
                deleteButton.disabled = false;
                updateButton.disabled = false;
                saveButton.disabled = true;
                tanggal.disabled = true;
                inputButton.disabled = false;
                mesin.disabled = true;
                jam_operasi.disabled = true;
                temp.disabled = true;
                bar.disabled = true;
                rm_hours.disabled = true;
                lm_hours.disabled = true;
                r_hours.disabled = true;
                l_hours.disabled = true;
                efs.disabled = true;
                tech.disabled = true;
                keterangan.disabled = true;
                tanggal.value = tanggal_Output;
                jam_operasi.value = timeString;
            },
            error: function (error) {
                console.error("Error saving data:", error);
            },
        });
    });

    // Show Data Log Sheet
    var dataTable = $("#table-logsheet").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-logsheet",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMesin = $("#NoMesinSearch").val();
            },
        },
        columns: [
            {
                data: "NoLogSheet",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxlogsheet" value="' +
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
            {
                data: "NamaMesin",
                value: "NoMesin",
            },
            {
                data: "Jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "Temperatur" },
            { data: "Bar" },
            { data: "RMHours" },
            { data: "LMHours" },
            { data: "RHours" },
            { data: "LHours" },
            { data: "Efs" },
            { data: "Tech" },
            { data: "Keterangan" },
        ],
    });

    $("#refreshButton").click(function () {
        // Panggil metode reload dari DataTables
        dataTable.ajax.reload();
    });

    $("tbody").on("click", ".checkboxlogsheet", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;
            var selectedNoLogSheet = $(this).val();

            $("#hiddenNoLogSheet").val(selectedNoLogSheet);

            $.ajax({
                url: "/get-logsheet-compressor",
                type: "GET",
                data: { id: selectedNoLogSheet },
                success: function (data) {
                    // console.log(data);

                    // Set the values in your form inputs
                    var date = new Date(data.Tanggal + "Z");
                    tanggal.value = date.toISOString().split("T")[0];
                    mesin.value = data.NoMesin;
                    var endHours = new Date(data.Jam + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = new Date(data.Jam + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_operasi.value = endHours + ":" + endMinutes;
                    // jam_operasi.value = data.Jam;
                    temp.value = data.Temperatur;
                    bar.value = data.Bar;
                    rm_hours.value = data.RMHours;
                    lm_hours.value = data.LMHours;
                    r_hours.value = data.RHours;
                    l_hours.value = data.LHours;
                    efs.value = data.Efs;
                    tech.value = data.Tech;
                    keterangan.value = data.Keterangan;
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

        var checkboxValues = $(".checkboxlogsheet:checked")
            .map(function () {
                return this.value;
            })
            .get();

        // Check if there are selected checkboxes
        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data LogSheet untuk dihapus.",
            });
            return; // Abort further processing
        }

        // Use SweetAlert for confirmation
        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data LogSheet yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var dataDelete = {
                    NoLogSheet: checkboxValues,
                };
                $.ajax({
                    url: "/delete-logsheet",
                    method: "DELETE",
                    data: dataDelete,
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
                        tanggal.value = tanggal_Output;
                        jam_operasi.value = timeString;
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
