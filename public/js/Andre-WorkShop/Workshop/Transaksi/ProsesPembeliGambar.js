//#region variabel
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");

let table_data = $("#tableProsesPembeli").DataTable();
let refresh = document.getElementById("refresh");
//let user_id = 4384;
let user_id = user;

let nogam = document.getElementById("nogam");
let idorder = document.getElementById("idorder");
let formproses = document.getElementById("formproses");
let methodForm = document.getElementById("methodForm");
var arraycheckbox = [];
var rowIndexArray = [];

var arrayket = [];
var arraycheckboxmodal = []
let gambar = document.getElementById("gambar");

let Tglawalmodal = document.getElementById('Tglawalmodal');
let Tglakhirmodal = document.getElementById('Tglakhirmodal');
let table_modal = $("#TableCetakModal").DataTable();
// $("#TableOrderProyek").css("width", "max-content");
let refreshModal = document.getElementById('refreshModal');
let idOrderPrint = document.getElementById('idOrderPrint');
let TglOrderPrint = document.getElementById('TglOrderPrint');
let KeteranganPrint = document.getElementById('KeteranganPrint');
let userPrint = document.getElementById('userPrint');
let NamaDivisiPrint = document.getElementById('NamaDivisiPrint');
let MesinPrint = document.getElementById('MesinPrint');
let NamaSatuanPrint = document.getElementById('NamaSatuanPrint');
let NamaBarangPrint = document.getElementById('NamaBarangPrint');
let KeteranganOrderPrint = document.getElementById('KeteranganOrderPrint');
let PrintDate = document.getElementById('PrintDate');
let noOd = document.getElementById('noOd');
let formPembeliGambar = document.getElementById('formPembeliGambar');
//#endregion

//#region set tanggal
// Get the current date
const currentDate = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);
console.log(Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

// Format the date to be in 'YYYY-MM-DD' format for setting the input value
const formattedFirstDay = firstDayOfMonth.toISOString().slice(0, 10);

// Format the current date to be in 'YYYY-MM-DD' format for setting the input value
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

// Set the values of the input fields to the calculated dates
tgl_awal.value = formattedFirstDay;
tgl_akhir.value = formattedCurrentDate;
Tglawalmodal.value = formattedFirstDay;
Tglakhirmodal.value = formattedCurrentDate;
//#endregion

//#region tambil all order
function AllData(tglAwal, tglAkhir) {
    // console.log(tglAwal , tglAkhir);
    fetch("/getalldataPembeliGambar/" + tglAwal + "/" + tglAkhir)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                // const tglTSmanager = data.Tgl_TdStjMg;

                // Split tanggal dan waktu dengan separator spasi
                const [tanggal, waktu] = tglOrder.split(" ");
                // const [tanggalTsM, waktuTsM] = tglTSmanager.split(" ");

                // Update properti Tgl_Order pada setiap objek data dengan format tanggal saja
                data.Tgl_Order = tanggal;
                // data.Tgl_TdStjMg = tanggalTsM;
            });
            if (datas.length == 0) {
                console.log("masuk ke == 0");

                alert(
                    "Belum Ada Order Yg Sudah DiTerima U/ tgl " +
                        tglAwal +
                        " s/d tgl " +
                        tglAkhir
                );
            } else {
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#tableProsesPembeli").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No. Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="PembeliCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" },
                        { title: "Nama Barang", data: "Nama_Brg" },
                        {
                            title: "Jumlah",
                            data: "Nama_satuan",
                            render: function (data) {
                                return `1 ${data}`;
                            },
                        },
                        { title: "Divisi", data: "NamaDivisi" },
                        { title: "Status Order", data: "Status" },
                        { title: "Keterangan Order", data: "Ket_Order" },
                        { title: "Peng-Order", data: "NmUserOd" },
                        { title: "No.Gambar", data: "No_Gbr_Rev" },
                        { title: "Nm.Brg", data: "Nm_Brg" },
                    ],
                });
                table_data.draw();
            }
        });
}
//#endregion

//#region tgl2 on click
tgl_akhir.addEventListener("keypress", function (event) {
    // Mengecek apakah tombol yang ditekan adalah tombol 'Enter'
    event.preventDefault();
    if (event.key == "Enter") {
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
        // console.log(tgl_akhir.value);
        AllData(tgl_awal.value, tgl_akhir.value);
        //console.log('Tombol Enter ditekan!');
    }
});
//#endregion

//#region refresh
refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(tgl_awal.value, tgl_akhir.value);
});
//#endregion

//#region proses klik
$("#tableProsesPembeli tbody").on("click", "tr", function () {
    var data = table_data.row(this).data(); // Mendapatkan data dari baris yang diklik
    console.log(data);
    console.log(table_data.data());
    Nogambar = data.No_Gambar; // Mengambil data dari kolom "Divisi"

    // Lakukan apa pun yang Anda ingin lakukan dengan data divisi
    // console.log("Divisi:", divisicek);
});
function klikproses() {
    rowIndexArray = [];
    //console.log(table_data.rows().count());
    if (table_data.rows().count() != 0) {
        $("input[name='PembeliCheckbox']:checked").each(function () {
            let rowIndex = $(this).closest("tr").index();
            // console.log(rowIndex);
            let value = this.value;
            // console.log(rowIndexArray);

            // Do something with the row index, such as logging it
            if (user_id != 2697) {
                alert("Login " + user_id + " Tidak BerHak MemProses");
                return;
            } else {
                arraycheckbox.push(value);
                rowIndexArray.push(rowIndex);
            }
        });
        if (rowIndexArray.length > 0) {
            for (let i = 0; i < rowIndexArray.length; i++) {
                arrayket.push(table_data.cell(rowIndexArray[i], 8).data());
                console.log(arrayket);
            }
        }
        if (arraycheckbox.length > 0) {
            var arrayString = arraycheckbox.join(",");
            var arrayketstring = arrayket.join(",");
            idorder.value = arrayString;
            gambar.value = arrayketstring;
            methodForm.value = "PUT";
            formproses.action = "/ProsesPembeliGambar/" + idorder.value;
            formproses.submit();
        }
        //console.log(acc_order.value , batal_acc.value , order_tolak.value);
    }
}
//#endregion

//#region tgl2 modal on enter

Tglakhirmodal.addEventListener("keypress", function (event) {
    // Mengecek apakah tombol yang ditekan adalah tombol 'Enter'
    event.preventDefault();
    if (event.key == "Enter") {
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
        // console.log(tgl_akhir.value);
        AllDataModal(Tglawalmodal.value, Tglakhirmodal.value);
        //console.log('Tombol Enter ditekan!');
    }
});

//#endregion

//#region all data modal

function AllDataModal(tglAwal,tglAkhir) {
    fetch("/GetDataModalPembeliGambar/" + tglAwal + "/" + tglAkhir)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                // const tglTSmanager = data.Tgl_TdStjMg;

                // Split tanggal dan waktu dengan separator spasi
                const [tanggal, waktu] = tglOrder.split(" ");
                // const [tanggalTsM, waktuTsM] = tglTSmanager.split(" ");

                // Update properti Tgl_Order pada setiap objek data dengan format tanggal saja
                data.Tgl_Order = tanggal;
                // data.Tgl_TdStjMg = tanggalTsM;
            });
            if (datas.length == 0) {
                console.log("masuk ke == 0");

                alert(
                    "Belum Ada Order Yg Sudah DiTerima U/ tgl " +
                        tglAwal +
                        " s/d tgl " +
                        tglAkhir
                );
            } else {
                console.log(datas); // Optional: Check the data in the console
                table_modal = $("#TableCetakModal").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No. Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="PembeliCheckboxModal" value="${data}" /> ${data}`;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" },
                        { title: "Nama Barang", data: "Nama_Brg" },
                        { title: "Status Order", data: "Status" },
                        { title: "Divisi", data: "NamaDivisi" },
                        { title: "Keterangan Order", data: "Ket_Order" },
                    ],
                });
                table_modal.draw();
            }
        });
}

//#endregion

//#region btn refresh modal

refreshModal.addEventListener("click", function (event) {
    event.preventDefault();
    AllDataModal(Tglawalmodal.value, Tglakhirmodal.value);
});

//#endregion

//#region cetak modal

function cetak() {
    arraycheckboxmodal.length = 0;
    if (table_modal.rows().count() != 0) {
        $("input[name='PembeliCheckboxModal']").each(function () {
            // Ambil nilai 'value' dan status 'checked' dari checkbox
            let value = $(this).val();
            let isChecked = $(this).prop("checked");
            let closestTd = $(this).closest("tr");
            if (isChecked) {
                console.log(value);
                arraycheckboxmodal.push(value);
                // console.log(arraycheckboxmodal);
            }
            console.log("cek:" + arraycheckboxmodal);
            // Lakukan sesuatu berdasarkan status 'checked'
        });
        if (arraycheckboxmodal.length == 0 || arraycheckboxmodal.length > 1) {
            alert("Pilih 1 No. Order Yg Akan DiCETAK");
            return;
        } else {
            console.log(arraycheckboxmodal);
            noOd.value = arraycheckboxmodal[0];
            fetch("/getdataprintGambar/" + noOd.value)
                .then((response) => response.json())
                .then((datas) => {
                    datas.forEach((data) => {
                        // Ambil nilai Tgl_Order dari setiap objek data
                        const tglOrder = data.Tgl_Order;
                        // const tglTSmanager = data.Tgl_TdStjMg;

                        // Split tanggal dan waktu dengan separator spasi
                        const [tanggal, waktu] = tglOrder.split(" ");
                        // const [tanggalTsM, waktuTsM] = tglTSmanager.split(" ");

                        // Update properti Tgl_Order pada setiap objek data dengan format tanggal saja
                        var parts = tanggal.split("-");
                        var tahun = parts[0];
                        var bulan = parts[1];
                        var hari = parts[2];
                        var tanggalBaru = `${hari}/${bulan}/${tahun}`;
                        data.Tgl_Order = tanggalBaru;
                        // data.Tgl_TdStjMg = tanggalTsM;
                    });

                    console.log(datas);
                    idOrderPrint.textContent = datas[0].Id_Order;
                    TglOrderPrint.textContent = datas[0].Tgl_Order;
                    KeteranganPrint.textContent = datas[0].Keterangan + " /";
                    userPrint.textContent = datas[0].NamaUser;
                    NamaDivisiPrint.textContent = datas[0].NamaDivisi;
                    MesinPrint.textContent = datas[0].Mesin;
                    NamaSatuanPrint.textContent = datas[0].Nama_satuan;
                    NamaBarangPrint.textContent = datas[0].Nama_Brg;
                    KeteranganOrderPrint.textContent = datas[0].Ket_Order;
                    const today = new Date();
                    const formattedDate = formatDate(today);
                    PrintDate.textContent = formattedDate;
                    window.print();
                });
            methodForm.value = "POST";
            $.ajax({
                url: "UpdateCetakpembeligambar",
                method: "POST",
                data: new FormData(formPembeliGambar),
                dataType: "JSON",
                contentType: false,
                cache: false,
                processData: false,
                success: function (response) {
                    alert(response);
                },
            });
        }
    }
}

//#endregion

//#region function format date (nama bulan)

function formatDate(date) {
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
//#endregion

//#region set focus

tgl_awal.focus();
tgl_awal.addEventListener("keypress", function(event){
    if (event.key == "Enter") {
        tgl_akhir.focus();
    }
});

//#endregion
