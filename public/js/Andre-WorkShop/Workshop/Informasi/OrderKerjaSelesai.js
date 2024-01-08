let tgl_awal = document.getElementById('tgl_awal');
let tgl_akhir = document.getElementById('tgl_akhir');
let kddivisi = document.getElementById("kddivisi");
let table_data = $("#TableOrderKerjaSelesai").DataTable();
let pengorder = document.getElementById('pengorder');
let terima_order = document.getElementById('terima_order');
let refresh = document.getElementById('refresh');

//#region  set tanggal

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

//#region divisi di ubah
kddivisi.addEventListener("change", function () {
    table_data.clear().draw();
    AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
});
//#endregion

//#region tgl 2 on enter

tgl_akhir.addEventListener("keypress", function (event) {
    // Mengecek apakah tombol yang ditekan adalah tombol 'Enter'
    if (event.key === "Enter") {
        if (pengorder.checked == true) {
            kddivisi.focus();
        }
        else if (terima_order.checked == true) {
            AllData(tgl_awal.value, tgl_akhir.value , kddivisi.value);
        }
        else if (pengorder.checked == false && terima_order.checked == false) {
            alert("Pilih 'Sebagai Pengorder' Atau 'Sebagai Penerima Order'");
            return;
        }
    }
});

//#endregion

//#region all data

function AllData(tglawal,tglakhir,idDivisi) {
    table_data = $("#TableOrderKerjaSelesai").DataTable({
        destroy: true, // Destroy any existing DataTable before reinitializing
        data: [],
        columns: [
            {
                title: "No. Order",
                data: "Id_Order",
                render: function (data) {
                    return `${data}`;
                },
            },
            //{ title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
            { title: "Tanggal Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
            { title: "Nama Barang", data: "Nama_Brg" },
            { title: "KodeBarang", data: "Kd_Brg"},
            { title: "No.Gambar", data: "No_Gbr"},
            {
                title: "JmlOrder",
                data: function (row) {
                    return `${row.Jml_Brg} ${row.Nama_satuan}`;
                },
            },
            { title: "Status Order", data: "Status" },
            { title: "Divisi", data: "NamaDivisi" },
            { title: "Mesin", data: "Mesin" },
            { title: "Keterangan Order", data: "Ket_Order" },
            { title: "PengOrder", data: "UserOd" },
            {
                title: "JmlOderFinish",
                data: function (row) {
                    return `${row.Jml_Finish} ${row.Nama_satuan}`;
                },
            },
            { title: "Tanggal Finish", data: "Finish"},
        ],
    });


    if (pengorder.checked == true) {
        fetch("/GetAllDataPengorderKerja/" +tglawal+"/"+tglakhir+ "/"+ idDivisi)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                alert("Belum Ada Order Yg Selesai U/ tgl " + tglawal + " s/d tgl " + tglakhir);
                return;
            }
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                const [tanggal, waktu] = tglOrder.split(" ");

                data.Tgl_Order = tanggal;
                if (data.Tgl_Finish != null) {
                    const tglmanager = data.Tgl_Finish;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Finish = tanggal1;
                }
                if (data.Finish != null) {
                    const tglmanager = data.Finish;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Finish = tanggal1;
                }
            });
            table_data.clear(); // Bersihkan data saat ini (jika ada)
            $('#TableOrderKerjaSelesai').css('width', 'max-content');
            table_data.rows.add(datas).draw();
            // datatable = datas;
        });
    }
    else if (terima_order.checked == true) {
        fetch("/GetAllDataPenerimaKerja/" + tglawal + "/" + tglakhir)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                alert("Belum Ada Order Yg Selesai U/ tgl " + tglawal + " s/d tgl " + tglakhir);
                return;
            }
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                const [tanggal, waktu] = tglOrder.split(" ");

                data.Tgl_Order = tanggal;
                if (data.Tgl_Finish != null) {
                    const tglmanager = data.Tgl_Finish;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Finish = tanggal1;
                }
                if (data.Finish != null) {
                    const tglmanager = data.Finish;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Finish = tanggal1;
                }
            });
            table_data.clear(); // Bersihkan data saat ini (jika ada)
            $('#TableOrderKerjaSelesai').css('width', 'max-content');
            table_data.rows.add(datas).draw();
            // datatable = datas;
        });
    }
    else if (pengorder.checked == false && terima_order.checked == false) {
        alert("Pilih 'Sebagai Pengorder' Atau 'Sebagai Penerima Order'");
        return;
    }

}

//#endregion

//#region button refresh
refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
});

//#endregion

//#region on click terima_order

terima_order.addEventListener('click', function(){
    if (terima_order.checked) {
        table_data.clear().draw();
        kddivisi.value = "Pilih Divisi";
        AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
    }
});

//#endregion
