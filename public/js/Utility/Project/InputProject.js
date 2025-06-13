let inputButton = document.getElementById("inputButton");
let koreksiButton = document.getElementById("koreksiButton");
let hapusButton = document.getElementById("hapusButton");
let prosesButton = document.getElementById("prosesButton");
let batalButton = document.getElementById("batalButton");
let refreshButton = document.getElementById("refreshButton");

let tanggal_mulai = document.getElementById("tanggal_mulai");
let tanggal_selesai = document.getElementById("tanggal_selesai");
let nama_project = document.getElementById("nama_project");
let nama_mesin = document.getElementById("nama_mesin");
let merk_mesin = document.getElementById("merk_mesin");
let lokasi_mesin = document.getElementById("lokasi_mesin");
let tahun_pembuatan = document.getElementById("tahun_pembuatan");
let keterangan_kerusakan = document.getElementById("keterangan_kerusakan");
let perbaikan = document.getElementById("perbaikan");
let progress = document.getElementById("progress");
let selesai = document.getElementById("selesai");
let gambar1 = document.getElementById("gambar1");
let ket_gambar1 = document.getElementById("ket_gambar1");
let gambar2 = document.getElementById("gambar2");
let ket_gambar2 = document.getElementById("ket_gambar2");
let user_input = document.getElementById("user_input");
let keterangan_selesai = document.getElementById("keterangan_selesai");
let keterangan_progress = document.getElementById("keterangan_progress");
let imagePreviewContainer1 = document.getElementById("imagePreviewContainer1");
let imagePreviewContainer2 = document.getElementById("imagePreviewContainer2");
let id = document.getElementById("id");

tanggal_mulai.disabled = true;
tanggal_selesai.disabled = true;
nama_project.disabled = true;
nama_mesin.disabled = true;
merk_mesin.disabled = true;
lokasi_mesin.disabled = true;
tahun_pembuatan.disabled = true;
keterangan_kerusakan.disabled = true;
perbaikan.disabled = true;
gambar1.disabled = true;
ket_gambar1.disabled = true;
ket_gambar2.disabled = true;
gambar2.disabled = true;
keterangan_selesai.disabled = true;
keterangan_progress.disabled = true;
prosesButton.disabled = true;

function checkAllFieldsFilled() {
    return (
        tanggal_mulai.value.trim() !== "" &&
        tanggal_selesai.value.trim() !== "" &&
        nama_project.value.trim() !== "" &&
        nama_mesin.value.trim() !== "" &&
        merk_mesin.value.trim() !== "" &&
        lokasi_mesin.value.trim() !== "" &&
        tahun_pembuatan.value.trim() !== "" &&
        keterangan_kerusakan.value.trim() !== "" &&
        perbaikan.value.trim() !== ""
    );
}

function clearForm() {
    var currentDate = moment().format("YYYY-MM-DD");

    $("#id").val("");
    $("#nama_project").val("");
    $("#nama_mesin").val("");
    $("#merk_mesin").val("");
    $("#lokasi_mesin").val("");
    $("#tahun_pembuatan").val("");
    $("#tanggal_mulai").val(currentDate);
    $("#tanggal_selesai").val(currentDate);
    $("#keterangan_kerusakan").val("");
    $("#perbaikan").val("");
    $("#ket_gambar1").val("");
    $("#ket_gambar2").val("");
    $("#hasil_gambar1").removeAttr("src").hide();
    $("#hasil_gambar2").removeAttr("src").hide();
}

function disabled() {
    tanggal_mulai.disabled = true;
    tanggal_selesai.disabled = true;
    nama_project.disabled = true;
    nama_mesin.disabled = true;
    merk_mesin.disabled = true;
    lokasi_mesin.disabled = true;
    tahun_pembuatan.disabled = true;
    keterangan_kerusakan.disabled = true;
    perbaikan.disabled = true;
    gambar1.disabled = true;
    ket_gambar1.disabled = true;
    ket_gambar2.disabled = true;
    gambar2.disabled = true;
    keterangan_selesai.disabled = true;
    keterangan_progress.disabled = true;
    prosesButton.disabled = true;
}

function toggleFormAndCheckbox() {
    // Check if all forms are enabled
    const isAllFormsEnabled =
        !tanggal_mulai.disabled &&
        !tanggal_selesai.disabled &&
        !nama_project.disabled &&
        !nama_mesin.disabled &&
        !merk_mesin.disabled &&
        !lokasi_mesin.disabled &&
        !tahun_pembuatan.disabled &&
        !keterangan_kerusakan.disabled &&
        !perbaikan.disabled &&
        !gambar1.disabled &&
        !ket_gambar1.disabled &&
        !ket_gambar2.disabled &&
        !gambar2.disabled &&
        !keterangan1.disabled &&
        !keterangan2.disabled;

    // Toggle checkbox_project based on the status of all forms
    $(".checkbox_project").prop("disabled", isAllFormsEnabled);
}
toggleFormAndCheckbox();

// Add event listeners to enable/disable prosesButton based on input field values
[
    tanggal_mulai,
    tanggal_selesai,
    nama_project,
    nama_mesin,
    merk_mesin,
    lokasi_mesin,
    tahun_pembuatan,
    keterangan_kerusakan,
    perbaikan,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        prosesButton.disabled = !checkAllFieldsFilled();
    });
});

jQuery(function ($) {
    $("#koreksiButton").click(function (e) {
        console.log("koreksi Button Clicked");
        // inputButton.disabled = true;
        // hapusButton.disabled = true;
        tanggal_mulai.disabled = false;
        tanggal_selesai.disabled = false;
        nama_project.disabled = false;
        nama_mesin.disabled = false;
        merk_mesin.disabled = false;
        lokasi_mesin.disabled = false;
        tahun_pembuatan.disabled = false;
        keterangan_kerusakan.disabled = false;
        perbaikan.disabled = false;
        gambar1.disabled = false;
        gambar2.disabled = false;
        ket_gambar2.disabled = false;
        ket_gambar1.disabled = false;
        keterangan_selesai.disabled = false;
        keterangan_progress.disabled = false;

        var checkedCheckboxes = $(".checkbox_project:checked");

        if (checkedCheckboxes.length === 0) {
            // inputButton.disabled = true;
            // hapusButton.disabled = true;
            tanggal_mulai.disabled = true;
            tanggal_selesai.disabled = true;
            nama_project.disabled = true;
            nama_mesin.disabled = true;
            merk_mesin.disabled = true;
            lokasi_mesin.disabled = true;
            tahun_pembuatan.disabled = true;
            keterangan_kerusakan.disabled = true;
            perbaikan.disabled = true;
            gambar1.disabled = true;
            gambar2.disabled = true;
            ket_gambar2.disabled = true;
            ket_gambar1.disabled = true;
            keterangan_selesai.disabled = true;
            keterangan_progress.disabled = true;
            Swal.fire({
                icon: "warning",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih satu data untuk diperbarui.",
            });
            return; // Stop the function execution
        } else {
            hapusButton.disabled = true;
        }
    });
});

document.getElementById("gambar2").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-link").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("hasil_gambar2");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

// Event listener untuk Gambar 2
document.getElementById("gambar1").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-link").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("hasil_gambar1");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

if (tanggal_mulai && tanggal_selesai) {
    var tanggal_akhirOutput = new Date().toISOString().split("T")[0];

    tanggal_mulai.value = tanggal_akhirOutput;
    tanggal_selesai.value = tanggal_akhirOutput;

    var currentDateTime = new Date();
    var hours = currentDateTime.getHours().toString().padStart(2, "0");
    var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes;
}

jQuery(function ($) {
    var currentDate = moment().format("YYYY-MM-DD");

    $("#prosesButton").click(function (e) {
        e.preventDefault();
        //var Kode = Kode.value;
        var nama_projectValue = $("#nama_project").val();
        var nama_mesinValue = $("#nama_mesin").val();
        var tanggal_mulaiValue = $("#tanggal_mulai").val();
        var tanggal_selesaiValue = $("#tanggal_selesai").val();
        // var Keterangan = Keterangan.value;
        //var user_input = user_input.value;
        var keterangan_kerusakanValue = $("#keterangan_kerusakan").val();
        var merk_mesinValue = $("#merk_mesin").val();
        var lokasi_mesinValue = $("#lokasi_mesin").val();
        var tahun_pembuatanValue = $("#tahun_pembuatan").val();
        var perbaikanValue = $("#perbaikan").val();
        var idLaporanValue = $("#id").val();
        var keteranganValue = $("input[name='keterangan']:checked").val();
        var gambar1data = document.getElementById("gambar1").files[0];
        var gambar2data = document.getElementById("gambar2").files[0];
        var ketgambar1Value = $("#ket_gambar1").val();
        var ketgambar2Value = $("#ket_gambar2").val();

        keteranganValue =
            keteranganValue !== undefined ? keteranganValue : null;

        var formData = new FormData();

        formData.append("nama_project", nama_projectValue);
        formData.append("nama_mesin", nama_mesinValue);
        formData.append("tanggal_mulai", tanggal_mulaiValue);
        formData.append("tanggal_selesai", tanggal_selesaiValue);
        formData.append("keterangan_kerusakan", keterangan_kerusakanValue);
        formData.append("merk_mesin", merk_mesinValue);
        formData.append("lokasi_mesin", lokasi_mesinValue);
        formData.append("tahun_pembuatan", tahun_pembuatanValue);
        formData.append("perbaikan", perbaikanValue);
        formData.append("keterangan", keteranganValue);
        formData.append("gambar1data", gambar1data);
        formData.append("ketgambar1", ketgambar1Value);
        formData.append("gambar2data", gambar2data);
        formData.append("ketgambar2", ketgambar2Value);

        if (idLaporanValue) {
            formData.append("ID", idLaporanValue);
        }
        console.log("FormData:", formData);
        console.log(idLaporanValue);

        $.ajax({
            url: idLaporanValue ? "/updateDataProject" : "/postDataProject",
            type: idLaporanValue ? "POST" : "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            data: formData,
            processData: false,
            contentType: false,
            //data: requestData,
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    // Penanganan khusus untuk status 419 (sesi tidak valid)
                    console.log("Sesi tidak valid. Silakan login kembali.");
                    // Lakukan tindakan yang sesuai, seperti mengarahkan pengguna ke halaman login
                } else {
                    // Penanganan kesalahan lainnya
                    console.log("Terjadi kesalahan saat menyimpan data.");
                }
            },
            success: function (response) {
                console.log(response);
                // Respons sukses
                dataTable.ajax.reload();

                if (idLaporanValue) {
                    // PUT request
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Data updated successfully.",
                    });
                } else {
                    // POST request
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Data added successfully.",
                    });
                }
                clearForm();
                disabled();
                inputButton.disabled = false;
                hapusButton.disabled = false;
                koreksiButton.disabled = false;
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });
    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_input_project").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/getDataProject",
            type: "GET",
            data: function (d) {
                d.bulan = $("#bulan").val();
                d.tahun = $("#tahun").val();
            },
        },
        moment: {
            timezone: "Asia/Jakarta",
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
                    var localDate = moment.utc(data).local();
                    return localDate.format("MM/DD/YYYY");
                },
            },
            {
                data: "TglSelesai",
                render: function (data, type, full, meta) {
                    var localDate = moment.utc(data).local();

                    if (full.Keterangan === "Progress") {
                        return "";
                    } else {
                        return localDate.format("MM/DD/YYYY");
                    }
                },
            },
            { data: "KeteranganKerja" },
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

        // if (tahun.value === "" || bulan.value === "") {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Masukkan bulan dan tahun terlebih dahulu.",
        //     });
        // } else {
        //     dataTable.ajax.reload();
        // }
    });
    $("#PrintData").on("click", function () {
        // Mengambil data dari DataTables
        var tableData = dataTable.rows().data();
        if (tableData.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tidak ada data dalam tabel.",
            });
            return; // Stop execution if there's no data
        }

        // Membuat format cetakan
        var printContent =
            '<h2>Data Project</h2><table border="1" style="width: auto;">';
        printContent += "<thead><tr>";
        printContent +=
            "<th style='min-width: 50px;'style='min-width: 50px;'>No</th>";
        printContent += "<th style='min-width: 100px;'>Nama Project</th>";
        printContent += "<th style='min-width: 90px;'>Nama Mesin </th>";
        printContent += "<th style='min-width: 90px;'>Tanggal Mulai </th>";
        printContent += "<th style='min-width: 90px;'>Tanggal Selesai</th>";
        printContent +=
            "<th style='min-width: 100px;'>Keterangan Kerusakan</th>";
        printContent += "<th style='min-width: 90px;'>Keterangan</th>";
        printContent += "<th style='min-width: 90px;'>User</th>";

        // Tambahkan header lainnya sesuai kebutuhan
        printContent += "</tr></thead><tbody>";

        var rowCount = 0;
        // Menambahkan data ke dalam format cetakan
        $("#tabel_input_project tbody tr").each(function (index) {
            var rowData = $(this).find("td");
            rowCount++;
            printContent += "<tr>";
            printContent +=
                "<td style='text-align: center; page-break-inside: avoid;'>" +
                rowCount +
                "</td>"; // Nomor urut

            for (var i = 1; i <= 7; i++) {
                printContent += "<td >" + rowData.eq(i).text() + "</td>";
            }
            printContent += "</tr>";
        });

        printContent += "</tbody></table>";

        // Membuka jendela baru dan mencetak konten
        var printWindow = window.open("", "_blank");
        printWindow.document.write(
            "<html><head><title>DataTables Print</title>"
        );
        printWindow.document.write('<style type="text/css">');
        printWindow.document.write("@media print {");
        printWindow.document.write("body { display: block; margin: 0 auto; }");
        printWindow.document.write("table { margin: 0 auto;}");
        printWindow.document.write("}</style></head><body>");
        printWindow.document.write(printContent);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    });

    batalButton.addEventListener("click", function () {
        koreksiButton.disabled = false;
        inputButton.disabled = false;
        hapusButton.disabled = false;
        tanggal_mulai.disabled = true;
        tanggal_selesai.disabled = true;
        nama_project.disabled = true;
        nama_mesin.disabled = true;
        merk_mesin.disabled = true;
        lokasi_mesin.disabled = true;
        tahun_pembuatan.disabled = true;
        keterangan_kerusakan.disabled = true;
        perbaikan.disabled = true;
        gambar1.disabled = true;
        ket_gambar1.disabled = true;
        gambar2.disabled = true;
        ket_gambar2.disabled = true;
        keterangan_selesai.disabled = true;
        keterangan_progress.disabled = true;
        //document.getElementById("keterangan_progress").checked = false;
        //document.getElementById("keterangan_selesai").checked = false;

        dataTable.clear().draw();
        clearForm();
    });

    inputButton.addEventListener("click", function () {
        console.log("Input Button Clicked");
        koreksiButton.disabled = true;
        inputButton.disabled = true;
        hapusButton.disabled = true;
        tanggal_mulai.disabled = false;
        tanggal_selesai.disabled = false;
        nama_project.disabled = false;
        nama_mesin.disabled = false;
        merk_mesin.disabled = false;
        lokasi_mesin.disabled = false;
        tahun_pembuatan.disabled = false;
        keterangan_kerusakan.disabled = false;
        perbaikan.disabled = false;
        gambar1.disabled = false;
        gambar2.disabled = false;
        ket_gambar2.disabled = false;
        ket_gambar1.disabled = false;
        keterangan_selesai.disabled = false;
        keterangan_progress.disabled = false;
        //dataTable.clear().draw();
        $(".checkbox_project").prop("checked", false);
        $(".checkbox_project").prop("disabled", true);

        clearForm();
    });

    // Inisialisasi DataTable
    var selectedData;
    var selectedId;
    var selectedUser;
    var selectedIdProject;

    $("tbody").on("click", ".checkbox_project", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");
            var id = $(this).val();
            $("#id").val(id);
            selectedData = {
                UserId: selectedRow.find("td:eq(7)").text(),
                id_laporan: id,
            };
            selectedId = {
                id: $(this).val(),
            };

            hapusButton.disabled = false;
            koreksiButton.disabled = false;

            id.value = selectedId.id;

            console.log(selectedId.id);

            var imageNames = ["Gambar1", "Gambar2"];

            imageNames.forEach(function (imageName, index) {
                $.ajax({
                    url: `/selectImageProject/${selectedId.id}/${imageName}`,
                    method: "GET",
                    xhrFields: {
                        responseType: "blob",
                    },
                    beforeSend: function () {
                        // Show loading screen
                        $("#loading-screen").css("display", "flex");
                    },
                    success: function (data, status, xhr) {
                        displayImage(data, `hasil_gambar${index + 1}`);
                        updateFileInput(gambar1, data["Gambar1"]);
                        updateFileInput(gambar2, data["Gambar2"]);

                        var keterangan =
                            xhr.getResponseHeader("Image-Description");

                        if (index === 0) {
                            ket_gambar1.value = keterangan;
                        } else if (index === 1) {
                            ket_gambar2.value = keterangan;
                        }
                    },
                    error: function (xhr, status, error) {
                        //console.error("Error:", status, error);
                    },
                    complete: function () {
                        // Hide loading screen
                        $("#loading-screen").css("display", "none");
                    },
                });
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

            function updateFileInput(fileInput, imageData) {
                var blob = new Blob([imageData], { type: "image/*" });
                var fileName = "image.jpg";
                var file = new File([blob], fileName);

                fileInput = [file];
            }

            // selectedData = {
            //     Id_Laporan: data.UserId,
            // };

            $.ajax({
                url: "/getDataProjectId",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    var TglMulai = new Date(data.TglMulai);
                    var offset = TglMulai.getTimezoneOffset();
                    TglMulai.setMinutes(TglMulai.getMinutes() - offset);
                    var keteranganValue = data.Keterangan;
                    var TglSelesai = new Date(data.TglSelesai);
                    var offset = TglSelesai.getTimezoneOffset();
                    TglSelesai.setMinutes(TglSelesai.getMinutes() - offset);
                    var idUser = data.UserId;
                    $("#nama_project").val(data.NamaProject);
                    $("#nama_mesin").val(data.NamaMesin);
                    $("#merk_mesin").val(data.MerkMesin);
                    $("#lokasi_mesin").val(data.LokasiMesin);
                    $("#tahun_pembuatan").val(data.TahunPembuatan);
                    $("#tanggal_mulai").val(
                        TglMulai.toISOString().split("T")[0]
                    );
                    $("#tanggal_selesai").val(
                        TglSelesai.toISOString().split("T")[0]
                    );
                    $("#keterangan_kerusakan").val(data.KeteranganKerja);
                    $("#perbaikan").val(data.Perbaikan);

                    if (keteranganValue === "Selesai") {
                        $("#keterangan_selesai").prop("checked", true);
                    } else if (keteranganValue === "Progress") {
                        $("#keterangan_progress").prop("checked", true);
                    } else {
                        // Handle the case where data.Keterangan is neither 'selesai' nor 'progress'
                        console
                            .error
                            //"Invalid value for data.Keterangan:"
                            //keteranganValue
                            ();
                    }
                    $("input[name='keterangan']").change(function () {
                        // Update data.Keterangan based on the selected radio button
                        data.Keterangan = $(
                            "input[name='keterangan']:checked"
                        ).val();
                        console.log("Selected Keterangan: ", data.Keterangan);
                    });

                    selectedIdProject = {
                        id: idUser,
                    };
                    console.log(
                        "Selected id_laporan: ",
                        id,
                        data.NamaProject,
                        data.NamaMesin,
                        data.MerkMesin,
                        data.LokasiMesin,
                        data.TahunPembuatan,
                        data.TglMulai,
                        data.TglSelesai,
                        data.KeteranganKerja,
                        data.Perbaikan,
                        data.UserId
                    );
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            document.getElementById("keterangan_progress").checked = false;
            document.getElementById("keterangan_selesai").checked = false;

            clearForm();
        }
    });

    // Menangani klik pada checkbox di setiap baris

    // Menangani klik pada tombol hapus
    $("#hapusButton").click(function (e) {
        var Token = $('meta[name="csrf-Token"]').attr("content");
        // Dapatkan checkbox tercentang di dalam baris yang dipilih

        if (selectedData) {
            if ($(".checkbox_project").prop("checked") === true) {
                $.ajax({
                    url: "/getDataUserId",
                    method: "GET",
                    success: function (response) {
                        // console.log(response.NomorUser);
                        // console.log(selectedData.UserId);
                        // console.log(selectedData.id_laporan);
                        var nomorUserFromAPI = response.NomorUser.trim();
                        // var nomorUserFromAPI = "4378";
                        console.log(nomorUserFromAPI);

                        // Ambil UserId dari selectedData
                        var userIdFromSelectedData =
                            selectedIdProject.id.trim();
                        console.log("ini user id:", userIdFromSelectedData);
                        console.log("ini nomer user:", nomorUserFromAPI, "");

                        // Periksa apakah NomorUser dari API response sama dengan UserId dari selectedData
                        if (nomorUserFromAPI === userIdFromSelectedData) {
                            console.log("nomorUser dan userID sama");
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
                                        id: selectedData.id_laporan,
                                    };
                                    $.ajax({
                                        url: "/deleteDataProject",
                                        method: "DELETE",
                                        data: requestData,
                                        headers: {
                                            "X-CSRF-TOKEN": $(
                                                'meta[name="csrf-token"]'
                                            ).attr("content"),
                                        },
                                        beforeSend: function () {
                                            // Show loading screen
                                            $("#loading-screen").css("display", "flex");
                                        },
                                        success: function (response) {
                                            dataTable.ajax.reload();
                                            Swal.fire(
                                                "Data berhasil dihapus!",
                                                "",
                                                "success"
                                            );
                                        },
                                        error: function (error) {
                                            console.error(error);
                                        },
                                    });
                                    clearForm();
                                } else if (result.isDenied) {
                                    Swal.fire("Data tidak dihapus", "", "info");
                                }
                            });
                        } else {
                            console.log("nomerUser dan idUser tidak sama");
                            Swal.fire(
                                "Anda tidak memiliki izin untuk menghapus data ini",
                                "",
                                "warning"
                            );
                            //$(".checkbox_project").prop("checked", false);
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    },
                    complete: function () {
                        // Hide loading screen
                        $("#loading-screen").css("display", "none");
                    },
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Tidak Ada Data Terpilih",
                    text: "Pilih data untuk dihapus.",
                });
            }
        }
    });
});
