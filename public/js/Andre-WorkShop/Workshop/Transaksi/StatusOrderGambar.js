//#region variabel
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let table_data = $("#tablestatus").DataTable();

let kddivisi = document.getElementById("kddivisi");

let user = 4384;
let refresh = document.getElementById("refresh");

let formterima = document.getElementById('formterima');
let methodForm = document.getElementById('methodForm');
let nomorOrder = document.getElementById('nomorOrder');
let noGambarForm = document.getElementById('noGambarForm');
//#endregion

// kddivisi.focus();


//#region warna text
table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        if (data.Tgl_Finish !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("blue-color");
        }

        if (data.Tgl_Finish == null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});
//#endregion

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

//#region tampil all order
function AllData(tglAwal, tglAkhir, divisi) {
    fetch(
        "/getalldataStatusOrderGambar/" +
            tglAwal +
            "/" +
            tglAkhir +
            "/" +
            divisi
    )
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                console.log("masuk ke == 0");

                alert(
                    "Tidak Ada Order U/ Divisi " +
                        divisi +
                        ", untuk tgl " +
                        tglAwal +
                        " s/d tgl " +
                        tglAkhir
                );
                table_data.clear().draw();
            } else {
                datas.forEach((data) => {
                    if (data.Tgl_Order !== null) {
                        const tglOrder = data.Tgl_Order;
                        const [tanggal, waktu] = tglOrder.split(" ");
                        data.Tgl_Order = tanggal;
                    }
                    if(data.Tgl_Finish !== null){
                        const tglfinish = data.Tgl_Finish;
                        const [tanggalfinish, waktufinish] = tglfinish.split(" ");
                        data.Tgl_Finish = tanggalfinish;
                    }
                });
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#tablestatus").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No. Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="StatusCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" },
                        { title: "Nama Barang", data: "Nama_Brg" },
                        { title: "Kode Barang", data: "Kd_Brg" },
                        {
                            title: "Jumlah",
                            data: "Nama_satuan",
                            render: function (data) {
                                return `1 ${data}`;
                            },
                        },
                        { title: "Mesin", data: "Mesin" },
                        { title: "Status Order", data: "Status" },
                        { title: "Keterangan Order", data: "Ket_Order" },
                        { title: "Peng-Order", data: "NmUserOd" },
                        { title: "No. Gambar", data: "No_Gambar" },
                        { title: "Kd. Brg", data: "KdBrg" },
                        { title: "Nm. Brg", data: "Nm_Brg" },
                        { title: "Acc Bpk. Peter", data: "Tgl_Acc_Mng" },
                        { title: "UserOD", data: "User_Order" },
                        { title: "Tgl. Finish", data: "Tgl_Finish" },
                    ],
                });
                table_data.draw();
            }
        });
}
//#endregion

//#region select
kddivisi.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
    }
});
//#endregion

//#region refresh
refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
});
//#endregion

//#region button terima
function klikterima() {
    // let arrayindex = [];
    var arraynomorOD = [];
    var arraynomorGambar = [];
    $("input[name='StatusCheckbox']:checked").each(function () {
        let rowIndex = $(this).closest("tr").index();
        let closestTr = $(this).closest("tr");
        if (closestTr.hasClass('blue-color')) {
            if (user == table_data.cell(rowIndex, 13).data()) {
                // console.log("masuk");
                arraynomorOD.push(table_data.cell(rowIndex, 0).data());
                arraynomorGambar.push(table_data.cell(rowIndex, 9).data());
            } else {
                alert("Login " + user + " Tidak BerHak MemProses Data Milik ");
            }
        }

    });
    console.log(arraynomorOD);
    if (arraynomorGambar.length !== 0 || arraynomorOD.length !== 0) {
        console.log("masuk");
        var arrayNoOrderString = arraynomorOD.join(",");
        var arrayNoGambarstring = arraynomorGambar.join(",");
        nomorOrder.value = arrayNoOrderString;
        noGambarForm.value = arrayNoGambarstring;
        methodForm.value = "PUT";
        formterima.action = "/StatusOrderGambar/" + nomorOrder.value;
        formterima.submit();
    }


}

//#endregion

