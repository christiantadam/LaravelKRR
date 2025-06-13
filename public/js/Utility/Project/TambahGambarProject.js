var bulan = document.getElementById("bulan");
var tahun = document.getElementById("tahun");

//button
let inputButton = document.getElementById("inputButton");
let koreksiButton = document.getElementById("koreksiButton");
let hapusinputButton = document.getElementById("hapusButton");
let prosesButton = document.getElementById("prosesButton");
let batalButton = document.getElementById("batalButton");
let refreshButton = document.getElementById("refreshButton");

let gambar3 = document.getElementById("gambar3");
let ketgambar3 = document.getElementById("ketgambar3");
let hasilgambar3 = document.getElementById("imagePreview3");
let gambar4 = document.getElementById("gambar4");
let ketgambar4 = document.getElementById("ketgambar4");
let hasilgambar4 = document.getElementById("imagePreview4");
let gambar5 = document.getElementById("gambar5");
let ketgambar5 = document.getElementById("ketgambar5");
let hasilgambar5 = document.getElementById("imagePreview5");
let gambar6 = document.getElementById("gambar6");
let ketgambar6 = document.getElementById("ketgambar6");
let hasilgambar6 = document.getElementById("imagePreview6");
let gambar7 = document.getElementById("gambar7");
let ketgambar7 = document.getElementById("ketgambar7");
let hasilgambar7 = document.getElementById("imagePreview7");
let gambar8 = document.getElementById("gambar8");
let ketgambar8 = document.getElementById("ketgambar8");
let hasilgambar8 = document.getElementById("imagePreview8");
let gambar9 = document.getElementById("gambar9");
let ketgambar9 = document.getElementById("ketgambar9");
let hasilgambar9 = document.getElementById("imagePreview9");
let gambar10 = document.getElementById("gambar10");
let ketgambar10 = document.getElementById("ketgambar10");
let hasilgambar10 = document.getElementById("imagePreview10");
let Id_Gambar = document.getElementById("idTambahGambar");

//awal
disabledForm();

function clearForm() {
    gambar3.value = "";
    ketgambar3.value = "";
    $("#imagePreview3").removeAttr("src").hide();
    $("#namagambar3").text("Pilih Gambar 3");
    gambar4.value = "";
    ketgambar4.value = "";
    $("#imagePreview4").removeAttr("src").hide();
    $("#namagambar4").text("Pilih Gambar 4");
    gambar5.value = "";
    ketgambar5.value = "";
    $("#namagambar5").text("Pilih Gambar 5");
    $("#imagePreview5").removeAttr("src").hide();
    gambar6.value = "";
    ketgambar6.value = "";
    imagePreview6.value = "";
    $("#namagambar6").text("Pilih Gambar 6");
    $("#imagePreview6").removeAttr("src").hide();
    gambar7.value = "";
    ketgambar7.value = "";
    $("#namagambar7").text("Pilih Gambar 7");
    $("#imagePreview7").removeAttr("src").hide();
    gambar8.value = "";
    ketgambar8.value = "";
    $("#namagambar8").text("Pilih Gambar 8");
    $("#imagePreview8").removeAttr("src").hide();
    gambar9.value = "";
    ketgambar9.value = "";
    $("#namagambar9").text("Pilih Gambar 9");
    $("#imagePreview9").removeAttr("src").hide();
    gambar10.value = "";
    ketgambar10.value = "";
    $("#namagambar10").text("Pilih Gambar 10");
    $("#imagePreview10").removeAttr("src").hide();
}

function disabledForm() {
    gambar3.disabled = true;
    ketgambar3.disabled = true;
    gambar4.disabled = true;
    ketgambar4.disabled = true;
    gambar5.disabled = true;
    ketgambar5.disabled = true;
    gambar6.disabled = true;
    ketgambar6.disabled = true;
    gambar7.disabled = true;
    ketgambar7.disabled = true;
    gambar8.disabled = true;
    ketgambar8.disabled = true;
    gambar9.disabled = true;
    ketgambar9.disabled = true;
    gambar10.disabled = true;
    ketgambar10.disabled = true;
}

function enabledForm() {
    gambar3.disabled = false;
    ketgambar3.disabled = false;
    gambar4.disabled = false;
    ketgambar4.disabled = false;
    gambar5.disabled = false;
    ketgambar5.disabled = false;
    gambar6.disabled = false;
    ketgambar6.disabled = false;
    gambar7.disabled = false;
    ketgambar7.disabled = false;
    gambar8.disabled = false;
    ketgambar8.disabled = false;
    gambar9.disabled = false;
    ketgambar9.disabled = false;
    gambar10.disabled = false;
    ketgambar10.disabled = false;
    Id_Gambar.value = "";
}

for (var i = 3; i <= 10; i++) {
    // Mendapatkan ID gambar dan button sesuai dengan iterasi
    var imageId = "gambar" + i;
    var buttonClass = ".btn-" + i;

    // Menambahkan event listener untuk gambar ke-i
    (function (currentImageId, currentButtonClass) {
        document
            .getElementById(currentImageId)
            .addEventListener("change", function () {
                var fileInput = this;
                var fileName = fileInput.value.split("\\").pop();

                // Menampilkan nama file yang dipilih di label
                document.querySelector(currentButtonClass).textContent =
                    fileName;

                // Membaca file gambar yang dipilih
                var reader = new FileReader();
                reader.onload = function (e) {
                    var imagePreview = document.getElementById(
                        "imagePreview" + currentImageId.split("gambar")[1]
                    );
                    // Menetapkan sumber gambar saat file berhasil dibaca
                    imagePreview.src = e.target.result;
                    imagePreview.style.width = "200px";
                    imagePreview.style.height = "100px";
                    imagePreview.style.objectFit = "cover";
                    imagePreview.style.display = "block"; // Menampilkan elemen gambar
                };
                reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
            });
    })(imageId, buttonClass);
}

batalButton.addEventListener("click", function () {
    disabledForm();
    clearForm();
    koreksiButton.disabled = false;
    $(".checkbox_project:checked").prop("checked", false);
});

inputButton.addEventListener("click", function () {
    var checkedCheckboxes = $(".checkbox_project:checked");

    if (checkedCheckboxes.length === 0) {
        disabledForm();
        Swal.fire(
            "Pilih data yang akan diinput terlebih dahulu",
            "",
            "warning"
        );
        return;
    } else {
        enabledForm();
        //requestMethod = "UPDATE";
    }

    koreksiButton.disabled = false;
    //disabledForm();
    clearForm();
});
var requestMethod = "POST";

koreksiButton.addEventListener("click", function () {
    var checkedCheckboxes = $(".checkbox_project:checked");

    if (checkedCheckboxes.length === 0) {
        disabledForm();
        Swal.fire(
            "Pilih data yang akan dikoreksi terlebih dahulu",
            "",
            "warning"
        );
        return;
    } else {
        enabledForm();
        requestMethod = "UPDATE";
    }
});

imeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_gambar_project").DataTable({
        //var Token = $('meta[name="csrf-Token"]').attr("content"),
        processing: true,
        serverSide: true,
        responsive: true,
        //scrollX: true,

        ajax: {
            url: "/getDataProject",
            type: "GET",
            data: function (d) {
                // d.kode = ;
                d.bulan = $("#bulan").val();
                d.tahun = $("#tahun").val();
            },
        },

        columns: [
            {
                data: "Id",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_project" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "NamaProject" },
            { data: "NamaMesin" },
            {
                data: "TglMulai",
                render: function (data, type, full, meta) {
                    // Assuming data is in UTC format, adjust it to the local timezone
                    var date = new Date(data + "Z").toLocaleDateString();
                    return date;
                },
            },
            {
                data: "TglSelesai",
                render: function (data, type, full, meta) {
                    // Assuming data is in UTC format, adjust it to the local timezone
                    var localDate = moment.utc(data).local();

                    // Check if Keterangan is "Progress"
                    if (full.Keterangan === "Progress") {
                        return ""; // Jika "Progress", kembalikan string kosong
                    } else {
                        return localDate.format("MM/DD/YYYY"); // Jika bukan "Progress", kembalikan tanggal yang diformat
                    }
                },
            },
            { data: "Keterangan" },
            {
                data: "Nama",
                render: function (data, type, full, meta) {
                    return data ? data : "-";
                },
            },
        ],
    });
    $("#filter").on("change", function () {
        var filterValue = $(this).val();
        dataTable.column(6).search(filterValue).draw();
    });
    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        console.log(dataTable);
    });

    var id;

    $("tbody").on("click", ".checkbox_project", function () {
        if ($(this).prop("checked")) {
            koreksiButton.disabled = false;
            id = {
                idTambahGambar: $(this).val(),
            };
            var id_tambahGambar = $(this).val();
            console.log(id_tambahGambar);

            var imageNames = [
                "Gambar3",
                "Gambar4",
                "Gambar5",
                "Gambar6",
                "Gambar7",
                "Gambar8",
                "Gambar9",
                "Gambar10",
            ];

            $.ajax({
                type: "GET",
                url: "/checkDataProject",
                data: { Id: id.idTambahGambar },
                success: function (response) {
                    console.log(response);
                    if (response.status === 404) {
                        clearForm();
                        Swal.fire({
                            icon: "warning",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        disabledForm();
                        Id_Gambar.value = "";
                        $(".checkbox_project:checked").prop("checked", false);
                    } else {
                        $(".checkbox_project:checked").prop("checked", true);
                    }
                },
            });

            imageNames.forEach(function (imageName, index) {
                $.ajax({
                    url: `/SelectImagesProject/${id.idTambahGambar}/${imageName}`,
                    method: "GET",
                    xhrFields: {
                        responseType: "blob",
                    },
                    success: function (data, status, xhr) {
                        displayImage(data, `imagePreview${index + 3}`);
                        updateFileInput(gambar3, data["Gambar3"]);
                        updateFileInput(gambar4, data["Gambar4"]);
                        updateFileInput(gambar5, data["Gambar5"]);
                        updateFileInput(gambar6, data["Gambar6"]);
                        updateFileInput(gambar7, data["Gambar7"]);
                        updateFileInput(gambar8, data["Gambar8"]);
                        updateFileInput(gambar9, data["Gambar9"]);
                        updateFileInput(gambar10, data["Gambar10"]);

                        var keterangan =
                            xhr.getResponseHeader("Image-Description");

                        if (index === 0) {
                            ketgambar3.value = keterangan;
                        } else if (index === 1) {
                            ketgambar4.value = keterangan;
                        } else if (index === 2) {
                            ketgambar5.value = keterangan;
                        } else if (index === 3) {
                            ketgambar6.value = keterangan;
                        } else if (index === 4) {
                            ketgambar7.value = keterangan;
                        } else if (index === 5) {
                            ketgambar8.value = keterangan;
                        } else if (index === 6) {
                            ketgambar9.value = keterangan;
                        } else if (index === 7) {
                            ketgambar10.value = keterangan;
                        }
                    },
                    error: function (xhr, status, error) {
                        // console.error("Error:", status, error);
                    },
                });
            });

            $.ajax({
                url: "/GetNamaUser",
                type: "GET",
                data: "data",
                dataType: "dataType",
                success: function (response) {},
            });

            function displayImage(data, containerId) {
                var blob = new Blob([data], { type: "image/*" });
                var objectURL = URL.createObjectURL(blob);

                $("#" + containerId).html(
                    `<img src="${objectURL}" alt="Image">`
                );

                $("#" + containerId)
                    .attr("src", objectURL)
                    .show();
            }

            function updateFileInput(_fileInput, imageData) {
                var blob = new Blob([imageData], { type: "image/*" });
                var fileName = "image.jpg";
                var file = new File([blob], fileName);

                _fileInput = [file];
            }
        } else {
            clearForm();
        }
    });

    $("#prosesButton").click(function (e) {
        e.preventDefault();

        // Ambil nilai-nilai form
        var idValue = id.idTambahGambar;
        var ketgambar3Value = $("#ketgambar3").val();
        var ketgambar4Value = $("#ketgambar4").val();
        var ketgambar5Value = $("#ketgambar5").val();
        var ketgambar6Value = $("#ketgambar6").val();
        var ketgambar7Value = $("#ketgambar7").val();
        var ketgambar8Value = $("#ketgambar8").val();
        var ketgambar9Value = $("#ketgambar9").val();
        var ketgambar10Value = $("#ketgambar10").val();

        // Ambil file gambar
        var gambar3data = document.getElementById("gambar3").files[0];
        var gambar4data = document.getElementById("gambar4").files[0];
        var gambar5data = document.getElementById("gambar5").files[0];
        var gambar6data = document.getElementById("gambar6").files[0];
        var gambar7data = document.getElementById("gambar7").files[0];
        var gambar8data = document.getElementById("gambar8").files[0];
        var gambar9data = document.getElementById("gambar9").files[0];
        var gambar10data = document.getElementById("gambar10").files[0];

        // Buat objek FormData
        var formData = new FormData();
        formData.append("gambar3data", gambar3data);
        formData.append("ketgambar3", ketgambar3Value);
        formData.append("gambar4data", gambar4data);
        formData.append("ketgambar4", ketgambar4Value);
        formData.append("gambar5data", gambar5data);
        formData.append("ketgambar5", ketgambar5Value);
        formData.append("gambar6data", gambar6data);
        formData.append("ketgambar6", ketgambar6Value);
        formData.append("gambar7data", gambar7data);
        formData.append("ketgambar7", ketgambar7Value);
        formData.append("gambar8data", gambar8data);
        formData.append("ketgambar8", ketgambar8Value);
        formData.append("gambar9data", gambar9data);
        formData.append("ketgambar9", ketgambar9Value);
        formData.append("gambar10data", gambar10data);
        formData.append("ketgambar10", ketgambar10Value);

        if (idValue) {
            formData.append("Id", idValue);
        }
        console.log("FormData:", formData);

        // Membuat permintaan AJAX
        $.ajax({
            url:
                requestMethod === "UPDATE"
                    ? "/updateTambahGambarProject"
                    : "/postTambahGambarProject",
            type: requestMethod === "UPDATE" ? "POST" : "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // console.log(response);
                clearForm();
                dataTable.ajax.reload();
                // console.log("Gambar berhasil disimpan.");
                requestMethod === "UPDATE"
                    ? Swal.fire({
                          icon: "success",
                          title: response.message,
                          showConfirmButton: false,
                          timer: 1500,
                      })
                    : Swal.fire({
                          icon: "success",
                          title: response.message,
                          showConfirmButton: false,
                          timer: 1500,
                      });
            },
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    console.log("Sesi tidak valid. Silakan login kembali.");
                } else {
                    console.log("Terjadi kesalahan saat menyimpan gambar.");
                }
            },
        });
    });
});
