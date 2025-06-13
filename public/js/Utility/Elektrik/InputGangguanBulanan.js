let bulan = document.getElementById("bulan");
let nama = document.getElementById("nama");
let pabrik = document.getElementById("pabrik");
let masalah = document.getElementById("masalah");
let gambarGangguan = document.getElementById("gambar1");
let gambarSelesai = document.getElementById("gambar2");
let RadioSelesai = document.getElementById("RadioSelesai");
let RadioBelumSelesai = document.getElementById("RadioBelumSelesai");
let solusi = document.getElementById("solusi");
let id = document.getElementById("id_bulanan");
let prosesButton = document.getElementById("ProsesButton");
let inputButton = document.getElementById("InputButton");
let changeButton = document.getElementById("ChangeButton");
let deleteButton = document.getElementById("DeleteButton");
let cancelButton = document.getElementById("CancelButton");

bulan.disabled = true;
nama.disabled = true;
pabrik.disabled = true;
masalah.disabled = true;
solusi.disabled = true;
document.getElementById("selesai").disabled = true;
document.getElementById("belum_selesai").disabled = true;

prosesButton.style.display = "none";

function emptyForm() {
    bulan.value = "";
    nama.value = "";
    pabrik.value = "";
    masalah.value = "";
    solusi.value = "";
    id.value = "";
    $("#gambar1").val("");
    $("#namagambar1").text("Pilih Gambar Gangguan");
    $("#imagePreview1").removeAttr("src").hide();
    $("#gambar2").val("");
    $("#namagambar2").text("Pilih Gambar Selesai");
    $("#imagePreview2").removeAttr("src").hide();
}
function disableForm() {
    bulan.disabled = true;
    nama.disabled = true;
    pabrik.disabled = true;
    masalah.disabled = true;
    solusi.disabled = true;
    gambarGangguan.disabled = true;
    gambarSelesai.disabled = true;
    document.getElementById("selesai").disabled = true;
    document.getElementById("belum_selesai").disabled = true;
}

function enabledForm() {
    bulan.disabled = false;
    nama.disabled = false;
    pabrik.disabled = false;
    masalah.disabled = false;
    gambarGangguan.disabled = false;
}

$(inputButton).click(function (e) {
    e.preventDefault();

    enabledForm();
    emptyForm();
    gambarSelesai.disabled = true;
    solusi.disabled = false;

    inputButton.style.display = "none";
    prosesButton.style.display = "block";
    document.getElementById("selesai").disabled = false;
    document.getElementById("belum_selesai").disabled = false;
    $(".checkbox_elektrik_bulanan:checked").prop("checked", false);
});

$(changeButton).click(function (e) {
    e.preventDefault();
    enabledForm();
    gambarSelesai.disabled = false;
    solusi.disabled = false;
    inputButton.style.display = "none";
    prosesButton.style.display = "block";
    var checkedCheckboxes = $(".checkbox_elektrik_bulanan:checked");

    if (checkedCheckboxes.length === 0) {
        disableForm();
        Swal.fire(
            "Pilih data yang akan dikoreksi terlebih dahulu",
            "",
            "warning"
        );
        return; // Stop the function execution
    } else {
        enabledForm();
    }
});

$(cancelButton).click(function (e) {
    e.preventDefault();
    emptyForm();
    disableForm();

    inputButton.style.display = "block";
    prosesButton.style.display = "none";
    $(".table-elektrik-bulanan").prop("checked", false);
    $(".checkbox_elektrik_bulanan:checked").prop("checked", false);
});

// Event listener untuk Gambar 1
document.getElementById("gambar1").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-1").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("imagePreview1");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.width = "200px";
        imagePreview.style.height = "100px";
        imagePreview.style.objectFit = "cover";
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

// Event listener untuk Gambar 2
document.getElementById("gambar2").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-2").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview1 = document.getElementById("imagePreview2");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview1.src = e.target.result;
        imagePreview1.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

ataTable = $("#table-elektrik-bulanan").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        // scrollX: true,
        ajax: {
            url: "/getDataBulanan",
            method: "GET",
        },
        columns: [
            {
                data: "No",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_elektrik_bulanan" value="' +
                        data +
                        '">'
                    );
                },
            },

            { data: "Bulan" },
            { data: "Nama" },
            { data: "Pabrik" },
            { data: "Masalah" },
            { data: "Solusi" },
            { data: "Status" },
        ],
        order: [
            [1, "asc"],
            [5, "asc"],
        ],
    });

    $(prosesButton).click(function (e) {
        e.preventDefault();

        var bulanValue = bulan.value;
        var namaValue = nama.value;
        var pabrikValue = pabrik.value;
        var masalahValue = masalah.value;
        var solusiValue = solusi.value;
        var gambar1Value = gambarGangguan.files[0];
        var gambar2Value = gambarSelesai.files[0];
        var selectedStatus = $("input[name='status']:checked").val();
        var idValue = id.value;

        var formData = new FormData();
        formData.append("bulan", bulanValue);
        formData.append("nama", namaValue);
        formData.append("pabrik", pabrikValue);
        formData.append("masalah", masalahValue);
        formData.append("gambar1", gambar1Value);
        formData.append("gambar2", gambar2Value);
        formData.append("status", selectedStatus);

        if (idValue) {
            formData.append("ID", idValue);
            formData.append("gambar2", gambar2Value);
            formData.append("solusi", solusiValue);
        }
        console.log(idValue);
        $.ajax({
            url: idValue ? "/updateDataBulanan" : "/postDataBulanan",
            method: idValue ? "POST" : "POST",
            data: formData,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(formData);
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Data berhasil disimpan",
                    showConfirmButton: false,
                    timer: 1500,
                });
                emptyForm();
                dataTable.ajax.reload();
                document.getElementById("selesai").checked = false;
                document.getElementById("belum_selesai").checked = false;
            },
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    // Penanganan khusus untuk status 419 (sesi tidak valid)
                    console.log("Sesi tidak valid. Silakan login kembali.");
                    // Lakukan tindakan yang sesuai, seperti mengarahkan pengguna ke halaman login
                } else {
                    // Penanganan kesalahan lainnya
                    console.log("Terjadi kesalahan saat menyimpan gambar.");
                }
            },
        });
    });

    $("tbody").on("click", ".checkbox_elektrik_bulanan", function () {
        if ($(this).prop("checked")) {
            var id = $(this).val();

            $("#id_bulanan").val(id);
            $.ajax({
                url: "/getDataBulananId",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    console.log(data);

                    var keteranganValue = data.Status.trim();

                    $("#bulan").val(data.Bulan);
                    $("#nama").val(data.Nama);
                    $("#pabrik").val(data.Pabrik.trim());
                    $("#masalah").val(data.Masalah);
                    $("#solusi").val(data.Solusi);
                    $(
                        "#" + keteranganValue.replace(/\s+/g, "_").toLowerCase()
                    ).prop("checked", true);
                    // $("input[name='status']").change(function () {
                    //     // Update data.Keterangan based on the selected radio button
                    //     data.Status = $("input[name='status']:checked").val();
                    //     console.log("Selected Keterangan: ", data.Status);
                    //     if (data.Status.trim() === "Selesai") {
                    //         $("#selesai").prop("checked", true);
                    //     } else {
                    //         $("#belum_selesai").prop("checked", true);
                    //     }
                    // });
                    console.log(keteranganValue.trim());

                    var imageNames = ["GambarGangguan", "GambarSelesai"];

                    imageNames.forEach(function (imageName, index) {
                        $.ajax({
                            url: `/selectImageBulanan/${id}/${imageName}`,
                            method: "GET",
                            xhrFields: {
                                responseType: "blob",
                            },
                            success: function (data, status, xhr) {
                                displayImage(data, `imagePreview${index + 1}`);
                                updateFileInput(
                                    gambarGangguan,
                                    data["GambarGangguan"]
                                );
                                updateFileInput(
                                    gambarSelesai,
                                    data["GambarSelesai"]
                                );
                            },
                            error: function (xhr, status, error) {
                                console.error("Error:", status, error);
                            },
                        });
                    });

                    function displayImage(data, containerId) {
                        var blob = new Blob([data], { type: "image/*" });
                        var objectURL = URL.createObjectURL(blob);

                        $("#" + containerId).html(
                            `<img src="${objectURL}" alt="${data}">`
                        );
                        $("#" + containerId)
                            .attr("src", objectURL)
                            .show();
                    }

                    function updateFileInput(fileInput, imageData) {
                        var blob = new Blob([imageData], { type: "image/*" });
                        var fileName = "image.jpg";
                        var file = new File([blob], fileName);

                        fileInput = [file];
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            // Handle unchecked checkbox if needed
            emptyForm();
        }
    });

    $(deleteButton).click(function (e) {
        var Token = $('meta[name="csrf-Token"]').attr("content");
        // Dapatkan checkbox tercentang di dalam baris yang dipilih
        var checkboxValues = $(".checkbox_elektrik_bulanan:checked")
            .map(function () {
                return this.value;
            })
            .get();
        if (checkboxValues.length > 0) {
            Swal.fire({
                title: "Anda yakin ingin menghapus data yang terpilih?",
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
                        url: "/deleteDataBulanan",
                        method: "DELETE",
                        data: requestData,
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        success: function (response) {
                            console.log(response);
                            dataTable.ajax.reload();
                            emptyForm();
                            Swal.fire("Data berhasil dihapus!", "", "success");
                        },
                        error: function (error) {
                            console.error(error);
                        },
                    });
                } else if (result.isDenied) {
                    Swal.fire("Data tidak dihapus", "", "info");
                }
            });
        } else {
            Swal.fire(
                "Pilih data yang akan dihapus terlebih dahulu",
                "",
                "warning"
            );
        }
    });
});
