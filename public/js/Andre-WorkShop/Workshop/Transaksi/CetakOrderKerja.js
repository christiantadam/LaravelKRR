let table_data = $("#tableCetakOrderKerja").DataTable();
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let refresh = document.getElementById("refresh");
let formCetakOrderKerja = document.getElementById("formCetakOrderKerja");
let methodForm = document.getElementById("methodForm");
let noOd = document.getElementById("noOd");
var arraycheckbox = [];

let KodeBarangPrint = document.getElementById("KodeBarangPrint");
let idOrderPrint = document.getElementById("idOrderPrint");
let TglOrderPrint = document.getElementById("TglOrderPrint");
let userPrint = document.getElementById("userPrint");
let statusPrint = document.getElementById("statusPrint");
let NamaDivisiPrint = document.getElementById("NamaDivisiPrint");
let MesinPrint = document.getElementById("MesinPrint");
let JumlahBarangPrint = document.getElementById("JumlahBarangPrint");
let NamaSatuanPrint = document.getElementById("NamaSatuanPrint");
let NamaBarangPrint = document.getElementById("NamaBarangPrint");
let NoGambarPrint = document.getElementById("NoGambarPrint");
let KeteranganOrderPrint = document.getElementById("KeteranganOrderPrint");
let PrintDate = document.getElementById("PrintDate");
//#region set tanggal

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

//#endregion

//#region tgl_akhir on enter

tgl_akhir.addEventListener("keypress", function (event) {
    event.preventDefault();
    // Mengecek apakah tombol yang ditekan adalah tombol 'Enter'
    if (event.key === "Enter") {
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
        AllData(tgl_awal.value, tgl_akhir.value);
        //console.log('Tombol Enter ditekan!');
    }
});

//#endregion

//#region AllData

function AllData(tglAwal, tglAkhir) {
    fetch("/getalldataCetakSuratOrderKerja/" + tglAwal + "/" + tglAkhir)
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
                    "Belum Ada Order Yg Sdh DiACC U/ tgl " +
                        tglAwal +
                        " s/d tgl " +
                        tglAkhir
                );
                table_data.clear().draw();
                return;
            } else {
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#tableCetakOrderKerja").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No. Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="CetakOrderKerjaCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" },
                        { title: "Nama Barang", data: "Nama_Brg" },
                        { title: "Kd.Brg", data: "Kd_Brg" },
                        {
                            title: "Jumlah",
                            data: null,
                            render: function (data, type, row) {
                                return `${row.Jml_Brg} ${row.Nama_satuan}`;
                            },
                        },
                        { title: "Status Order", data: "Status" },
                        { title: "Divisi", data: "NamaDivisi" },
                        { title: "Keterangan Order", data: "Ket_Order" },
                    ],
                });
                table_data.draw();
            }
        });
}

//#endregion

//#region button refresh

refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(tgl_awal.value, tgl_akhir.value);
});

//#endregion

//#region button cetak

function cetak() {
    arraycheckbox.length = 0;
    if (table_data.rows().count() != 0) {
        $("input[name='CetakOrderKerjaCheckbox']").each(function () {
            // Ambil nilai 'value' dan status 'checked' dari checkbox
            let value = $(this).val();
            let isChecked = $(this).prop("checked");
            let closestTd = $(this).closest("tr");
            if (isChecked) {
                console.log(value);
                arraycheckbox.push(value);
                // console.log(arraycheckbox);
            }
            console.log("cek:" + arraycheckbox);
            // Lakukan sesuatu berdasarkan status 'checked'
        });
        if (arraycheckbox.length == 0 || arraycheckbox.length > 1) {
            alert("Pilih 1 No. Order Yg Akan DiCETAK");
            return;
        } else {
            console.log(arraycheckbox);
            noOd.value = arraycheckbox[0];
            fetch("/getdataprintCetakOrderKerja/" + noOd.value)
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
                    KodeBarangPrint.textContent = datas[0].Kd_Brg;
                    idOrderPrint.textContent = datas[0].Id_Order;
                    TglOrderPrint.textContent = datas[0].Tgl_Order;
                    statusPrint.textContent = datas[0].Status + " /";
                    userPrint.textContent = datas[0].NamaUser;
                    NamaDivisiPrint.textContent = datas[0].NamaDivisi;
                    MesinPrint.textContent = datas[0].Mesin;
                    JumlahBarangPrint.textContent = datas[0].Jml_Brg + " ";
                    NamaSatuanPrint.textContent = datas[0].Nama_satuan;
                    NamaBarangPrint.textContent = datas[0].Nama_Brg;
                    NoGambarPrint.textContent = datas[0].No_Gbr;
                    KeteranganOrderPrint.textContent = datas[0].Ket_Order;
                    const today = new Date();
                    const formattedDate = formatDate(today);
                    PrintDate.textContent = formattedDate;
                    window.print();
                });
            methodForm.value = "POST";
            $.ajax({
                url: "UpdateCetakSuratOrderKerja",
                method: "POST",
                data: new FormData(formCetakOrderKerja),
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
