let tgl_awal = document.getElementById('tgl_awal');
let tgl_akhir = document.getElementById('tgl_akhir');

let table_data = $("#TableStatusOrderProyek").DataTable();
let kddivisi = document.getElementById('kddivisi');
let refresh = document.getElementById('refresh');

//#region warna

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

//#region divisi change

kddivisi.addEventListener("change", function () {
    AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
});

//#endregion

//#region refresh

refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
});

//#endregion

//#region Alldata

function AllData(tglAwal, tglAkhir, divisi) {
    fetch(
        "/GetAllDataStatusOrderProyek/" +
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
                    if(data.Tgl_Acc_Mng !== null){
                        const tglfinish = data.Tgl_Acc_Mng;
                        const [tanggalfinish, waktufinish] = tglfinish.split(" ");
                        data.Tgl_Acc_Mng = tanggalfinish;
                    }
                });
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#TableStatusOrderProyek").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No.Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="StatusCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        { title: "Tanggal Order", data: "Tgl_Order" },
                        { title: "Nama Proyek", data: "Nama_Proyek" },
                        {
                            title: "JmlOrder",
                            data: null,
                            render: function (data, type, row) {
                                return `${row.Jml_Brg} ${row.Nama_satuan}`;
                            },
                        },
                        { title: "Mesin", data: "Mesin" },
                        { title: "Status Order", data: "Status" },
                        { title: "Keterangan Order", data: "Ket_Order" },
                        { title: "PengOrder", data: "NmUserOd" },
                        { title: "Acc Bpk. Peter", data: "Tgl_Acc_Mng" },
                        { title: "Tanggal Finish", data: "Tgl_Finish" },
                    ],
                });
                table_data.draw();
            }
        });
}

//#endregion
