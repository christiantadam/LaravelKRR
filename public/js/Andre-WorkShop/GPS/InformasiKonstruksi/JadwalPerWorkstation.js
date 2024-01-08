let tglawal = document.getElementById("tglawal");
let tglakhir = document.getElementById("tglakhir");
let table_data = $("#TableDatas").DataTable();
let WorkStation = document.getElementById("WorkStation");

let btnok = document.getElementById("btnok");

//#region set Tanggal

const currentDate = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);
// console.log(Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

// Format the date to be in 'YYYY-MM-DD' format for setting the input value
const formattedFirstDay = firstDayOfMonth.toISOString().slice(0, 10);
const tanggalTerakhirBulanIni = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
);
// Mendapatkan nilai hari terakhir dari bulan ini

var hariTerakhir = tanggalTerakhirBulanIni.getDate();
var tglakhirnilai = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    hariTerakhir + 1
);
// console.log(hariTerakhir);
// Mengatur variabel tglakhir ke tanggal terakhir bulan ini
// console.log("Tanggal terakhir bulan ini: " + tglakhirnilai.toISOString().slice(0, 10));

tglawal.value = formattedFirstDay;
tglakhir.value = tglakhirnilai.toISOString().slice(0, 10);

//#endregion

//#region workstation blm pilih

WorkStation.addEventListener("change", function () {
    if (WorkStation.value != "Pilih Work Station") {
        tglawal.focus();
    }
});

//#endregion

//#region focus

tglawal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        tglakhir.focus();
    }
});

WorkStation.focus();

tglakhir.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
    btnok.focus();
    }
});

//#endregion

//#region load data

function loadData() {
    fetch(
        "/LoaddataJadwalPerWorkStation/" +
            WorkStation.value +
            "/" +
            tglawal.value +
            "/" +
            tglakhir.value
    )
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length > 0) {
                table_data = $("#TableDatas").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "Nomor",
                            data: null,
                            render: function (data, type, row, meta) {
                                // Menghasilkan nomor berdasarkan indeks baris + 1
                                return meta.row + 1;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "No Order", data: "NoOrder" }, // Sesuaikan 'age' dengan properti kolom di data
                        { title: "Tanggal Start", data: "EstDate" }, // Sesuaikan 'country' dengan properti kolom di data
                        { title: "Divisi", data: "NamaDivisi" },
                        { title: "Nama Barang", data: "Nama_Brg" },
                        { title: "Nama Bagian", data: "NamaBagian" },
                        { title: "Status Order", data: "OdSts" },
                        {
                            title: "Est. Time",
                            data: function (row) {
                                return `${row.EstTimeHour} jam ${row.EstTimeMinute} menit`;
                            },
                        },
                        { title: "Hari ke-", data: "HariKe" },
                        { title: "Jadwal Proses Finish", data: "TglFinish" },
                        {
                            title: "Realtime",
                            data: function (row) {
                                return `${row.RealTimeHour} jam ${row.RealTimeMinute} menit`;
                            },
                        },
                        { title: "Keterangan", data: "KetCancel" },
                        { title: "Tanggal disetujui", data: "SetujuKR" },
                        {
                            title: "Keterangan tidak disetujui",
                            data: "RefTdkSetujuKR",
                        },
                        {
                            title: "Tanggal tidak disetujui",
                            data: "TdkSetujuKR",
                        },
                    ],
                });
                table_data.draw();
            }
        });
}

//#endregion

//#region btn ok on click

btnok.addEventListener('click', function(){
    if (WorkStation.value != "Pilih Work Station") {
        loadData();
    }
});

//#endregion

//#region refresh btn



//#endregion
