//button
let inputButton = document.getElementById("inputButton");
let koreksiButton = document.getElementById("koreksiButton");
let hapusinputButton = document.getElementById("hapusButton");
let prosesButton = document.getElementById("prosesButton");
let batalButton = document.getElementById("batalButton");
let refreshButton = document.getElementById("refreshButton");

//form
let tanggal = document.getElementById("tanggal");
let divisi_pelapor1 = document.getElementById("divisi_pelapor1");
let nama_pelapor = document.getElementById("nama_pelapor");
let penerima_laporan = document.getElementById("penerima_laporan");
let jam_lapor = document.getElementById("jam_lapor");
let jam_perbaikan = document.getElementById("jam_perbaikan");
let jam_selesai = document.getElementById("jam_selesai");
let tipe_gangguan = document.getElementById("tipe_gangguan");
let penyebab = document.getElementById("penyebab");
let penyelesaian = document.getElementById("penyelesaian");
let keterangan = document.getElementById("keterangan");
let teknisi = document.getElementById("teknisi");
let gambar1 = document.getElementById("gambar1");
let ket_gambar1 = document.getElementById("ket_gambar1");
let hasil_gambar1 = document.getElementById("hasil_gambar1");
let gambar2 = document.getElementById("gambar2");
let ket_gambar2 = document.getElementById("ket_gambar2");
let hasil_gambar2 = document.getElementById("hasil_gambar2");
let divisi_pelapor2 = document.getElementById("divisi_pelapor2");
let imagePreviewContainer1 = document.getElementById("imagePreviewContainer1");
let imagePreviewContainer2 = document.getElementById("imagePreviewContainer2");
let checkbox_tabel = document.getElementById("checkbox_tabel");
let tabel_input_gangguan = document.getElementById("tabel_input_gangguan");
let id_laporan = document.getElementById("id_laporan");
let agree = document.getElementById("agree");

var bulanInput = document.getElementById("bulan");
var sampaiDenganInput = document.getElementById("sampaiDengan");
var tanggalInput = document.getElementById("tanggal");
let JamLapor = document.getElementById("jam_lapor");

var currentTime = moment().format("HH:mm");

sampaiDenganInput.addEventListener("change", function () {
    // Ambil nilai tanggal awal dan tanggal akhir
    var tanggal_awal = new Date(bulanInput.value);
    var tanggal_akhir = new Date(sampaiDenganInput.value);

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
            sampaiDenganInput.value = bulanInput.value;
        });
    }
});
bulanInput.addEventListener("change", function () {
    // Ambil nilai tanggal awal dan tanggal akhir
    var tanggal_awal = new Date(bulanInput.value);
    var tanggal_akhir = new Date(sampaiDenganInput.value);

    // Periksa apakah tanggal awal lebih besar dari tanggal akhir
    if (tanggal_awal > tanggal_akhir) {
        // Set ulang nilai tanggal akhir ke nilai tanggal awal
        sampaiDenganInput.value = bulanInput.value;
    }
});

if (tanggal && bulanInput && tanggalInput && JamLapor && sampaiDenganInput) {
    function updateCurrentTime() {
        var currentDateTime = new Date();
        var hours = currentDateTime.getHours().toString().padStart(2, "0");
        var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
        var timeString = hours + ":" + minutes;

        JamLapor.value = timeString;
    }
    updateCurrentTime();

    // Update date values
    var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
    bulanInput.value = tanggal_akhirOutput;
    tanggalInput.value = tanggal_akhirOutput;
    sampaiDenganInput.value = tanggal_akhirOutput;
    tanggal.value = tanggal_akhirOutput;
}

var currentDateTime = new Date();
var hours = currentDateTime.getHours().toString().padStart(2, "0");
var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
var timeString = hours + ":" + minutes;

JamLapor.value = timeString;

function clearForm() {
    $("#id_laporan").val("");
    $("#divisi_pelapor1").val("");
    $("#nama_pelapor").val("");
    $("#penerima_laporan").val("");
    $("#jam_perbaikan").val("");
    $("#jam_selesai").val("");
    $("#tipe_gangguan").val("");
    $("#penyebab").val("");
    $("#penyelesaian").val("");
    $("#keterangan").val("");
    $("#teknisi").val("");
    $("#ket_gambar1").val("");
    $("#gambar1").val("");
    $("#namagambar1").text("Pilih Gambar 1");
    $("#hasil_gambar1").removeAttr("src").hide();
    $("#ket_gambar2").val("");
    $("#gambar2").val("");
    $("#namagambar2").text("Pilih Gambar 2");
    $("#hasil_gambar2").removeAttr("src").hide();
}

function disableForm() {
    tanggal.disabled = true;
    divisi_pelapor1.disabled = true;
    nama_pelapor.disabled = true;
    penerima_laporan.disabled = true;
    jam_lapor.disabled = true;
    jam_perbaikan.disabled = true;
    jam_selesai.disabled = true;
    tipe_gangguan.disabled = true;
    penyebab.disabled = true;
    penyelesaian.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    gambar1.disabled = true;
    ket_gambar1.disabled = true;
    hasil_gambar1.disabled = true;
    gambar2.disabled = true;
    ket_gambar2.disabled = true;
    hasil_gambar2.disabled = true;
    prosesButton.disabled = true;
}

// Initially disable all form elements
tanggal.disabled = true;
divisi_pelapor1.disabled = true;
nama_pelapor.disabled = true;
penerima_laporan.disabled = true;
jam_lapor.disabled = true;
jam_perbaikan.disabled = true;
jam_selesai.disabled = true;
tipe_gangguan.disabled = true;
penyebab.disabled = true;
penyelesaian.disabled = true;
keterangan.disabled = true;
teknisi.disabled = true;
gambar1.disabled = true;
ket_gambar1.disabled = true;
hasil_gambar1.disabled = true;
gambar2.disabled = true;
ket_gambar2.disabled = true;
hasil_gambar2.disabled = true;
prosesButton.disabled = true;

// Event listener for Input Button
inputButton.addEventListener("click", function () {
    inputButton.disabled = true;
    id_laporan.value = "";
    koreksiButton.disabled = true;
    hapusinputButton.disabled = true;
    tanggal.value = tanggal_akhirOutput;
    tanggal.disabled = false;
    divisi_pelapor1.disabled = false;
    nama_pelapor.disabled = false;
    penerima_laporan.disabled = false;
    jam_lapor.disabled = false;
    jam_perbaikan.disabled = false;
    jam_selesai.disabled = false;
    tipe_gangguan.disabled = false;
    penyebab.disabled = false;
    penyelesaian.disabled = false;
    keterangan.disabled = false;
    teknisi.disabled = false;
    gambar1.disabled = false;
    ket_gambar1.disabled = false;
    hasil_gambar1.disabled = false;
    gambar2.disabled = false;
    ket_gambar2.disabled = false;
    hasil_gambar2.disabled = false;
    checkbox_tabel.disabled = true;
    tabel_input_gangguan.disabled = true;
    $(".checkbox_elektrik:checked").prop("checked", false);

    clearForm();
});

batalButton.addEventListener("click", function () {
    // Disable all input fields and buttons
    prosesButton.disabled = true;
    inputButton.disabled = false;
    koreksiButton.disabled = false;
    hapusinputButton.disabled = false;
    tanggal.disabled = true;
    tanggal.value = tanggal_akhirOutput;
    divisi_pelapor1.disabled = true;
    nama_pelapor.disabled = true;
    penerima_laporan.disabled = true;
    jam_lapor.disabled = true;
    jam_perbaikan.disabled = true;
    jam_selesai.disabled = true;
    tipe_gangguan.disabled = true;
    penyebab.disabled = true;
    penyelesaian.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    gambar1.disabled = true;
    ket_gambar1.disabled = true;
    gambar2.disabled = true;
    ket_gambar2.disabled = true;
    checkbox_tabel.checked = false;
    $(".checkbox_elektrik:checked").prop("checked", false);
    $("#gambar1").val("");
    $("#namagambar1").text("Pilih Gambar 1");
    $("#hasil_gambar1").removeAttr("src").hide();
    $("#ket_gambar2").val("");
    $("#gambar2").val("");
    $("#namagambar2").text("Pilih Gambar 2");
    $("#hasil_gambar2").removeAttr("src").hide();
    clearForm();
});

koreksiButton.addEventListener("click", function () {
    var checkedCheckboxes = $(".checkbox_elektrik:checked");

    if (checkedCheckboxes.length === 0) {
        tanggal.disabled = true;
        divisi_pelapor1.disabled = true;
        nama_pelapor.disabled = true;
        penerima_laporan.disabled = true;
        jam_lapor.disabled = true;
        jam_perbaikan.disabled = true;
        jam_selesai.disabled = true;
        tipe_gangguan.disabled = true;
        penyebab.disabled = true;
        penyelesaian.disabled = true;
        keterangan.disabled = true;
        teknisi.disabled = true;
        gambar1.disabled = true;
        ket_gambar1.disabled = true;
        hasil_gambar1.disabled = true;
        gambar2.disabled = true;
        ket_gambar2.disabled = true;
        hasil_gambar2.disabled = true;
        Swal.fire({
            icon: "warning",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data untuk dikoreksi.",
        });
        return; // Stop the function execution
    } else {
        Swal.fire({
            icon: "question",
            title: "Pilih Tindakan",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Penyelesaian Gangguan",
            denyButtonText: "Koreksi Data",
        }).then((result) => {
            if (result.isConfirmed) {
                keterangan.disabled = false;
                inputButton.disabled = true;
                prosesButton.disabled = false;
                hapusButton.disabled = true;
                tanggal.disabled = true;
                divisi_pelapor1.disabled = true;
                nama_pelapor.disabled = true;
                penerima_laporan.disabled = true;
                jam_lapor.disabled = true;
                jam_perbaikan.disabled = true;
                jam_selesai.disabled = true;
                tipe_gangguan.disabled = true;
                penyebab.disabled = true;
                penyelesaian.disabled = true;
                teknisi.disabled = true;
                gambar1.disabled = true;
                ket_gambar1.disabled = true;
                hasil_gambar1.disabled = true;
                gambar2.disabled = true;
                ket_gambar2.disabled = true;
                hasil_gambar2.disabled = true;
            } else if (result.isDenied) {
                inputButton.disabled = true;
                prosesButton.disabled = false;
                hapusButton.disabled = true;
                tanggal.disabled = false;
                divisi_pelapor1.disabled = false;
                nama_pelapor.disabled = false;
                penerima_laporan.disabled = false;
                jam_lapor.disabled = false;
                jam_perbaikan.disabled = false;
                jam_selesai.disabled = false;
                tipe_gangguan.disabled = false;
                penyebab.disabled = false;
                penyelesaian.disabled = false;
                keterangan.disabled = true;
                teknisi.disabled = false;
                gambar1.disabled = false;
                ket_gambar1.disabled = false;
                hasil_gambar1.disabled = false;
                gambar2.disabled = false;
                ket_gambar2.disabled = false;
                hasil_gambar2.disabled = false;
            }
        });
    }
});

// Function to check if all fields are filled

// Event listener untuk Gambar 1
document.getElementById("gambar1").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-1").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("hasil_gambar1");
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
        var imagePreview2 = document.getElementById("hasil_gambar2");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview2.src = e.target.result;
        imagePreview2.style.width = "200px";
        imagePreview2.style.height = "100px";
        imagePreview2.style.objectFit = "cover";
        imagePreview2.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        divisi_pelapor1.value.trim() !== "" &&
        nama_pelapor.value.trim() !== "" &&
        penerima_laporan.value.trim() !== "" &&
        jam_lapor.value.trim() !== "" &&
        jam_perbaikan.value.trim() !== "" &&
        jam_selesai.value.trim() !== "" &&
        tipe_gangguan.value.trim() !== "" &&
        penyebab.value.trim() !== "" &&
        penyelesaian.value.trim() !== "" &&
        keterangan.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

// Add event listeners to enable/disable prosesButton based on input field values
[
    tanggal,
    divisi_pelapor1,
    nama_pelapor,
    penerima_laporan,
    jam_lapor,
    jam_perbaikan,
    jam_selesai,
    tipe_gangguan,
    penyebab,
    penyelesaian,
    keterangan,
    teknisi,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        prosesButton.disabled = !checkAllFieldsFilled();
    });
});

$(document).ready(function () {
    $("#prosesButton").click(function (e) {
        e.preventDefault();
        checkAllFieldsFilled();

        // Ambil nilai-nilai form
        var tanggalValue = $("#tanggal").val();
        var divisi_pelapor1Value = $("#divisi_pelapor1").val();
        var nama_pelaporValue = $("#nama_pelapor").val();
        var penerima_laporanValue = $("#penerima_laporan").val();
        var jam_laporValue = $("#jam_lapor").val();
        var jam_perbaikanValue = $("#jam_perbaikan").val();
        var jam_selesaiValue = $("#jam_selesai").val();
        var tipe_gangguanValue = $("#tipe_gangguan").val();
        var penyebabValue = $("#penyebab").val();
        var penyelesaianValue = $("#penyelesaian").val();
        var keteranganValue = $("#keterangan").val();
        var teknisiValue = $("#teknisi").val();
        var ketgambar1Value = $("#ket_gambar1").val();
        var ketgambar2Value = $("#ket_gambar2").val();
        var agreeValue = $("#agree").prop("checked") ? 1 : 0;
        var id_laporanValue = $("#id_laporan").val();

        // Ambil file gambar
        var gambar1data = document.getElementById("gambar1").files[0];
        var gambar2data = document.getElementById("gambar2").files[0];

        // Buat objek FormData
        var formData = new FormData();
        formData.append("tanggal", tanggalValue);
        formData.append("divisi_pelapor1", divisi_pelapor1Value);
        formData.append("nama_pelapor", nama_pelaporValue);
        formData.append("penerima_laporan", penerima_laporanValue);
        formData.append("jam_lapor", jam_laporValue);
        formData.append("jam_perbaikan", jam_perbaikanValue);
        formData.append("jam_selesai", jam_selesaiValue);
        formData.append("tipe_gangguan", tipe_gangguanValue);
        formData.append("penyebab", penyebabValue);
        formData.append("penyelesaian", penyelesaianValue);
        formData.append("keterangan", keteranganValue);
        formData.append("teknisi", teknisiValue);
        formData.append("agree", agreeValue);
        formData.append("gambar1data", gambar1data);
        formData.append("ketgambar1", ketgambar1Value);
        formData.append("gambar2data", gambar2data);
        formData.append("ketgambar2", ketgambar2Value);

        if (id_laporanValue) {
            formData.append("ID", id_laporanValue);
        }

        console.log("FormData:", formData);

        if ($(".checkbox_keterangan").prop("checked")) {
            $("#id_laporan").val("");
            // Membuat permintaan AJAX POST
            $.ajax({
                url: "/postData",
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    // Respons sukses
                    Swal.fire({
                        icon: "success",
                        title: "Data Berhasil Disimpan!",
                        showConfirmButton: false,
                        timer: "2000",
                    });

                    dataTable.ajax.reload();
                    disableForm();
                    clearForm();
                    koreksiButton.disabled = false;
                    hapusButton.disabled = false;
                    inputButton.disabled = false;
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 419) {
                        console.log("Sesi tidak valid. Silakan login kembali.");
                    } else {
                        // Penanganan kesalahan lainnya
                        console.log("Terjadi kesalahan saat menyimpan data.");
                    }
                },
            });
        } else {
            $.ajax({
                url: id_laporanValue ? "/updateDataElektrik" : "/postData",
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response);
                    // Respons sukses
                    $(".checkbox_elektrik").prop("disabled", false);

                    $("#id").val("");
                    if (id_laporanValue) {
                        // PUT request
                        Swal.fire({
                            icon: "success",
                            title: "Data Berhasil Diperbarui!",
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        dataTable.ajax.reload();
                        disableForm();
                        clearForm();
                        // jamLapor.value = timeString;
                        koreksiButton.disabled = false;
                        hapusButton.disabled = false;
                        inputButton.disabled = false;
                    } else {
                        // POST request
                        Swal.fire({
                            icon: "success",
                            title: "Data Berhasil Disimpan!",
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        dataTable.ajax.reload();
                        disableForm();
                        clearForm();
                        koreksiButton.disabled = false;
                        hapusButton.disabled = false;
                        inputButton.disabled = false;
                    }
                    clearForm();
                    dataTable.ajax.reload();
                    console.log("Data berhasil disimpan.");
                    tanggal.value = tanggal_akhirOutput;
                    JamLapor.value = timeString;
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 419) {
                        console.log("Sesi tidak valid. Silakan login kembali.");
                    } else {
                        // Penanganan kesalahan lainnya
                        console.log("Terjadi kesalahan saat menyimpan gambar.");
                    }
                },
            });
        }
    });

    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_input_gangguan").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        // scrollX: true,
        ajax: {
            url: "/getData",
            type: "GET",
            data: function (d) {
                d.tanggal1 = $("#bulan").val();
                d.tanggal2 = $("#sampaiDengan").val();
                d.divisi = $("#divisi_pelapor2").val();
            },
        },
        columns: [
            {
                data: "Id_Laporan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_elektrik" value="' +
                        data +
                        '">'
                    );
                },
                orderable: false,
                searchable: false,
            },

            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var localDate = moment.utc(data).local();

                    return localDate.format("MM/DD/YYYY");
                },
            },
            { data: "L_div_pelapor" },
            { data: "Nama_pelapor" },
            { data: "Penerima_laporan" },
            { data: "Jam_lapor", render: timeRenderer },
            { data: "jam_pelaksanan", render: timeRenderer },
            { data: "Jam_selesai", render: timeRenderer },
            { data: "Type_gangguan" },
            { data: "Penyebab" },
            { data: "Penyelesaian" },
            {
                data: "Keterangan",
                render: function (data, type, full, meta) {
                    if (data === "Lanjut") {
                        return (
                            '<input type="checkbox" class="checkbox_keterangan" value="' +
                            data +
                            '">' +
                            data
                        );
                    } else {
                        return data;
                    }
                },
            },
            { data: "Teknisi" },
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        // console.log(dataTable);
    });

    // Event listener untuk tombol cetak
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
        var printContent = '<h2>Data Gangguan Elektrik</h2><table border="1">';
        printContent += "<thead><tr>";
        printContent += "<th>No</th>";
        printContent += "<th>Tanggal</th>";
        printContent += "<th>Div. Pelapor</th>";
        printContent += "<th>Pelapor</th>";
        printContent += "<th>Penerima Laporan</th>";
        printContent += "<th>Jam Lapor</th>";
        printContent += "<th>Jam Perbaikan</th>";
        printContent += "<th>Jam Selesai</th>";
        printContent += "<th>Type Gangguan</th>";
        printContent += "<th>Penyebab</th>";
        printContent += "<th>Penyelesaian</th>";
        printContent += "<th>Keterangan</th>";
        printContent += "<th>Teknisi</th>";
        // Tambahkan header lainnya sesuai kebutuhan
        printContent += "</tr></thead><tbody>";

        // Menambahkan data ke dalam format cetakan
        var rowCount = 0;
        $("#tabel_input_gangguan tbody tr").each(function () {
            var rowData = $(this).find("td");
            rowCount++;
            printContent += "<tr>";
            printContent +=
                "<td style='text-align: center; page-break-inside: avoid;'>" +
                rowCount +
                "</td>"; // Nomor urut

            for (var i = 1; i <= 12; i++) {
                printContent += "<td>" + rowData.eq(i).text() + "</td>";
            }
            printContent += "</tr>";
        });
        printContent += "</tbody></table>";

        // Membuka jendela baru dan mencetak konten
        var printWindow = window.open("", "_blank");
        printWindow.document.write(
            "<html><head><title>DataTables Print</title></head><body>"
        );
        printWindow.document.write(printContent);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    });

    var selectedId;
    var selectedUser;

    $("tbody").on("click", ".checkbox_elektrik", function () {
        $(".checkbox_keterangan").prop("checked", false);
        $(".checkbox_elektrik").not(this).prop("checked", false);
        if ($(this).prop("checked")) {
            $("#keterangan option[value='Selesai']").show();
            hapusButton.disabled = false;
            koreksiButton.disabled = false;
            tanggal.disabled = true;
            tanggal.value = tanggal_akhirOutput;
            divisi_pelapor1.disabled = true;
            nama_pelapor.disabled = true;
            penerima_laporan.disabled = true;
            jam_lapor.disabled = true;
            jam_perbaikan.disabled = true;
            jam_selesai.disabled = true;
            tipe_gangguan.disabled = true;
            penyebab.disabled = true;
            penyelesaian.disabled = true;
            keterangan.disabled = true;
            teknisi.disabled = true;
            gambar1.disabled = true;
            ket_gambar1.disabled = true;
            gambar2.disabled = true;
            ket_gambar2.disabled = true;
            checkbox_tabel.checked = false;

            var selectedRow = $(this).closest("tr");

            selectedId = {
                id: $(this).val(),
            };
            var selectedid_laporan = $(this).val();

            id_laporan.value = selectedId.id;

            console.log(selectedId.id);

            var imageNames = ["Gambar1", "Gambar2"];

            imageNames.forEach(function (imageName, index) {
                $.ajax({
                    url: `/selectImage/${selectedId.id}/${imageName}`,
                    method: "GET",
                    xhrFields: {
                        responseType: "blob",
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
                        console.error("Error:", status, error);
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
            var selectedData = {
                Id_Laporan: selectedid_laporan,
                tanggal: selectedRow.find("td:eq(1)").text(),
                L_div_pelapor: selectedRow.find("td:eq(2)").text(),
                Nama_pelapor: selectedRow.find("td:eq(3)").text(),
                Penerima_laporan: selectedRow.find("td:eq(4)").text(),
                Jam_lapor: selectedRow.find("td:eq(5)").text(),
                jam_pelaksanan: selectedRow.find("td:eq(6)").text(),
                Jam_selesai: selectedRow.find("td:eq(7)").text(),
                Type_gangguan: selectedRow.find("td:eq(8)").text(),
                Penyebab: selectedRow.find("td:eq(9)").text(),
                Penyelesaian: selectedRow.find("td:eq(10)").text(),
                Keterangan: selectedRow.find("td:eq(11)").text(),
                Teknisi: selectedRow.find("td:eq(12)").text(),
            };

            var parsedDate = new Date(selectedData.tanggal);

            // Format the date as "yyyy-MM-dd"
            var formattedDate =
                parsedDate.getFullYear() +
                "-" +
                ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + parsedDate.getDate()).slice(-2);

            // Update the form fields with the selectedData
            $("#id_laporan").val(selectedData.Id_Laporan);
            $("#tanggal").val(formattedDate);
            $("#divisi_pelapor1").val(selectedData.L_div_pelapor);
            $("#nama_pelapor").val(selectedData.Nama_pelapor);
            $("#penerima_laporan").val(selectedData.Penerima_laporan);
            $("#jam_lapor").val(selectedData.Jam_lapor);
            $("#jam_perbaikan").val(selectedData.jam_pelaksanan);
            $("#jam_selesai").val(selectedData.Jam_selesai);
            $("#tipe_gangguan").val(selectedData.Type_gangguan);
            $("#penyebab").val(selectedData.Penyebab);
            $("#penyelesaian").val(selectedData.Penyelesaian);
            $("#keterangan").val(selectedData.Keterangan);
            $("#teknisi").val(selectedData.Teknisi);

            console.log(
                "Selected id_laporan: ",
                selectedData.Id_Laporan,
                selectedData.tanggal,
                selectedData.L_div_pelapor,
                selectedData.Nama_pelapor,
                selectedData.Penerima_laporan,
                selectedData.Jam_lapor,
                selectedData.jam_pelaksanan,
                selectedData.Jam_selesai,
                selectedData.Type_gangguan,
                selectedData.Penyebab,
                selectedData.Penyelesaian,
                selectedData.Keterangan,
                selectedData.Teknisi
            );
            $.ajax({
                url: "/getDataElektrikId",
                type: "GET",
                data: { UP: selectedData.Id_Laporan },
                success: function (data) {
                    console.log("Data received:", data);
                    console.log(
                        "Selected user pelapor: ",

                        data.User_pelapor
                    );
                    selectedUser = {
                        user_pelapor: data.User_pelapor,
                    };
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            clearForm();
            inputButton.disabled = false;
            hapusButton.disabled = false;

            var currentDate = moment().format("YYYY-MM-DD");
            var currentTime = moment().format("HH:mm");

            // Update the date and time input fields
            $("#tanggal").val(currentDate);
            $("#jam_lapor").val(currentTime);

            console.log("Checkbox is unchecked. Form cleared.");
        }
    });

    $("tbody").on("click", ".checkbox_keterangan", function () {
        $("#keterangan option[value='Selesai']").hide();
        $(".checkbox_elektrik").prop("checked", false);
        $(".checkbox_keterangan").not(this).prop("checked", false);

        if ($(this).prop("checked")) {
            var currentTime = moment().format("HH:mm");

            inputButton.disabled = true;
            hapusButton.disabled = true;
            koreksiButton.disabled = true;
            tanggal.disabled = false;
            tanggal.value = tanggal_akhirOutput;
            divisi_pelapor1.disabled = true;
            nama_pelapor.disabled = true;
            penerima_laporan.disabled = true;
            $("#jam_lapor").val(currentTime);
            jam_lapor.disabled = false;
            jam_perbaikan.disabled = false;
            jam_selesai.disabled = false;
            tipe_gangguan.disabled = true;

            penyelesaian.disabled = false;
            keterangan.disabled = false;
            penyebab.disabled = false;
            teknisi.disabled = false;
            prosesButton.disabled = false;
            var selectedRow = $(this).closest("tr");

            selectedId = {
                id: $(".checkbox_elektrik").val(),
            };
            var selectedid_laporan = $(this).val();

            id_laporan.value = selectedId.id;

            console.log(selectedId);

            var imageNames = ["Gambar1", "Gambar2"];

            imageNames.forEach(function (imageName, index) {
                $.ajax({
                    url: `/selectImage/${selectedId.id}/${imageName}`,
                    method: "GET",
                    xhrFields: {
                        responseType: "blob",
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
                        console.error("Error:", status, error);
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
            var selectedData = {
                Id_Laporan: selectedid_laporan,
                //tanggal: selectedRow.find("td:eq(1)").text(),
                L_div_pelapor: selectedRow.find("td:eq(2)").text(),
                Nama_pelapor: selectedRow.find("td:eq(3)").text(),
                Penerima_laporan: selectedRow.find("td:eq(4)").text(),
                //Jam_lapor: selectedRow.find("td:eq(5)").text(),
                jam_pelaksanan: selectedRow.find("td:eq(6)").text(),
                Jam_selesai: selectedRow.find("td:eq(7)").text(),
                Type_gangguan: selectedRow.find("td:eq(8)").text(),
                Penyebab: selectedRow.find("td:eq(9)").text(),
                Penyelesaian: selectedRow.find("td:eq(10)").text(),
                Keterangan: selectedRow.find("td:eq(11)").text(),
                Teknisi: selectedRow.find("td:eq(12)").text(),
            };

            var parsedDate = new Date(selectedData.tanggal);

            // Format the date as "yyyy-MM-dd"
            var formattedDate =
                parsedDate.getFullYear() +
                "-" +
                ("0" + (parsedDate.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + parsedDate.getDate()).slice(-2);

            var currentDate = moment().format("YYYY-MM-DD");
            var currentTime = moment().format("HH:mm");

            // Update the form fields with the selectedData
            $("#id_laporan").val("");
            $("#tanggal").val(currentDate);
            $("#divisi_pelapor1").val(selectedData.L_div_pelapor);
            $("#nama_pelapor").val(selectedData.Nama_pelapor);
            $("#penerima_laporan").val(selectedData.Penerima_laporan);
            //$("#jam_lapor").val(selectedData.Jam_lapor);
            $("#jam_perbaikan").val(selectedData.jam_pelaksanan);
            $("#jam_selesai").val(selectedData.Jam_selesai);
            $("#tipe_gangguan").val(selectedData.Type_gangguan);
            $("#penyebab").val(selectedData.Penyebab);
            $("#penyelesaian").val(selectedData.Penyelesaian);
            $("#keterangan").val(selectedData.Keterangan);
            $("#teknisi").val(selectedData.Teknisi);

            console.log(
                "Selected id_laporan: ",
                selectedData.Id_Laporan,
                selectedData.tanggal,
                selectedData.L_div_pelapor,
                selectedData.Nama_pelapor,
                selectedData.Penerima_laporan,
                selectedData.Jam_lapor,
                selectedData.jam_pelaksanan,
                selectedData.Jam_selesai,
                selectedData.Type_gangguan,
                selectedData.Penyebab,
                selectedData.Penyelesaian,
                selectedData.Keterangan,
                selectedData.Teknisi
            );
            $.ajax({
                url: "/getDataElektrikId",
                type: "GET",
                data: { UP: selectedId },
                success: function (data) {
                    console.log("Data received:", data);
                    console.log(
                        "Selected user pelapor: ",

                        data.User_pelapor
                    );
                    selectedUser = {
                        user_pelapor: data.User_pelapor,
                    };
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            $("#keterangan option[value='Selesai']").show();
            clearForm();
            inputButton.disabled = false;
            hapusButton.disabled = false;
            koreksiButton.disabled = false;
            penyelesaian.disabled = true;
            keterangan.disabled = true;
            penyebab.disabled = true;
            teknisi.disabled = true;
            tanggal.disabled = true;
            jam_lapor.disabled = true;
            jam_perbaikan.disabled = true;
            jam_selesai.disabled = true;

            var currentDate = moment().format("YYYY-MM-DD");
            var currentTime = moment().format("HH:mm");

            // Update the date and time input fields
            $("#tanggal").val(currentDate);
            $("#jam_lapor").val(currentTime);

            console.log("Checkbox is unchecked. Form cleared.");
        }
    });

    // Menangani klik pada checkbox di setiap baris

    // Menangani klik pada tombol hapus
    $("#hapusButton").click(function (e) {
        var Token = $('meta[name="csrf-Token"]').attr("content");
        // Dapatkan checkbox tercentang di dalam baris yang dipilih
        var checkedCheckboxes = $(".checkbox_elektrik:checked");

        if (checkedCheckboxes.length > 0) {
            if (selectedUser) {
                $.ajax({
                    url: "/getUserId", // Gantilah dengan endpoint yang sesuai
                    method: "GET",
                    success: function (response) {
                        let nomorUserFromAPI = response.NomorUser.trim();
                        //var nomorUserFromAPI = "4384";

                        // Ambil UserId dari selectedData
                        var userIdFromSelectedData = selectedUser.user_pelapor;
                        console.log(userIdFromSelectedData);
                        console.log(nomorUserFromAPI, ",");

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
                                        id: selectedId.id,
                                    };
                                    $.ajax({
                                        url: "/deleteData",
                                        method: "DELETE",
                                        data: requestData,
                                        headers: {
                                            "X-CSRF-TOKEN": $(
                                                'meta[name="csrf-token"]'
                                            ).attr("content"),
                                        },
                                        success: function (response) {
                                            console.log(response);
                                            dataTable.ajax.reload();
                                            Swal.fire({
                                                title: "Data berhasil dihapus!",
                                                icon: "success",
                                                showConfirmButton: false,
                                                showCancelButton: false,
                                                timer: 1500, // Durasi dalam milidetik sebelum swal otomatis menutup
                                            });
                                            clearForm();

                                            var currentTime =
                                                moment().format("HH:mm");

                                            $("#jam_lapor").val(currentTime);
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
                            console.log(
                                "nomerUser dan user_pelapor tidak sama"
                            );
                            Swal.fire(
                                "Anda tidak memiliki izin untuk menghapus data ini",
                                "",
                                "warning"
                            );
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    },
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih data untuk dihapus.",
            });
        }
    });
});

//modal tipe gangguan

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
    $("#openmodaltipe").click(function (e) {
        e.preventDefault();
        $("#keterangan_gangguan").val("");
        $("#hiddenIdKeterangan").val("");
        dataTableKeterangan.ajax.reload();
    });

    // Menangkap event ketika modal ditutup
    $("#TipeGangguanModal").on("hidden.bs.modal", function (e) {
        $.ajax({
            url: "/reload-tipegangguan",
            method: "GET",
            success: function (response) {
                var selectKeterangan = $("#tipe_gangguan");
                selectKeterangan.empty(); // Mengosongkan opsi yang ada
                selectKeterangan.append(
                    "<option selected disabled>" +
                        "Pilih Keterangan Gangguan..." +
                        "</option>"
                );
                response.forEach(function (data) {
                    selectKeterangan.append(
                        '<option value="' +
                            data.nama_type_gangguan +
                            '">' +
                            data.nama_type_gangguan +
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
            url: "/get-tipegangguan",
            type: "GET",
        },
        columns: [
            {
                data: "id_type",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxketgangguan" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "nama_type_gangguan" },
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
                    url: "/delete-tipegangguan",
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
            url: nomorIdValue ? "/update-tipegangguan" : "/save-tipegangguan",
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
        });
    });
});
