let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let kddivisi = document.getElementById("kddivisi");
let table_data = $("#TableOrderGambarSelesai").DataTable();
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

//#region tanggal 2 on enter

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
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
        //console.log('Tombol Enter ditekan!');
    }
});

//#endregion

//#region all data

function AllData(tglawal,tglakhir,idDivisi) {
    table_data = $("#TableOrderGambarSelesai").DataTable({
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
            {
                title: "Jumlah",
                data: "Nama_satuan",
                render: function (data) {
                    return `1 ${data}`;
                },
            },
            { title: "Status Order", data: "Status" },
            { title: "Divisi", data: "NamaDivisi" },
            { title: "Mesin", data: "Mesin" },
            { title: "Keterangan Order", data: "Ket_Order" },
            { title: "PengOrder", data: "NmUserOd" },
            { title: "Tanggal Diterima", data: "Tgl_Rcv_Gbr"},
            { title: "Tanggal Diserahkan", data: "Tgl_Beri_Gbr"},
            { title: "NoGambar", data: "No_Gambar"},
            { title: "NamaGambar", data: "Nm_Brg"},
            { title: "KdBrg", data: "KodeBrg"},
            { title: "Tanggal Finish", data: "Tgl_Finish"},
        ],
    });


    if (pengorder.checked == true) {
        fetch("/GetAllDataPengorder/" +tglawal+"/"+tglakhir+ "/"+ idDivisi)
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
                if (data.Tgl_Rcv_Gbr != null) {
                    const tglmanager = data.Tgl_Rcv_Gbr;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Rcv_Gbr = tanggal1;
                }
                if (data.Tgl_Beri_Gbr !== null) {
                    const tglmanager = data.Tgl_Beri_Gbr;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Beri_Gbr = tanggal1;
                }
                if (data.Tgl_Finish !== null) {
                    const tglmanager = data.Tgl_Finish;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Finish = tanggal1;
                }

            });
            table_data.clear(); // Bersihkan data saat ini (jika ada)
            $('#TableOrderGambarSelesai').css('width', 'max-content');
            table_data.rows.add(datas).draw();
            // datatable = datas;
        });
    }
    else if (terima_order.checked == true) {
        fetch("/GetAllDataPenerima/" + tglawal + "/" + tglakhir)
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
                if (data.Tgl_Rcv_Gbr != null) {
                    const tglmanager = data.Tgl_Rcv_Gbr;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Rcv_Gbr = tanggal1;
                }
                if (data.Tgl_Beri_Gbr !== null) {
                    const tglmanager = data.Tgl_Beri_Gbr;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Beri_Gbr = tanggal1;
                }
                if (data.Tgl_Finish !== null) {
                    const tglmanager = data.Tgl_Finish;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_Finish = tanggal1;
                }
            });
            table_data.clear(); // Bersihkan data saat ini (jika ada)
            $('#TableOrderGambarSelesai').css('width', 'max-content');
            table_data.rows.add(datas).draw();
            // datatable = datas;
        });
    }
    else if (pengorder.checked == false && terima_order.checked == false) {
        alert("Pilih 'Sebagai Pengorder' Atau 'Sebagai Penerima Order'");
        return;
    }

    // console.log(datatable); // Optional: Check the data in the console

}

//#endregion

//#region button refresh
refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
});


//#endregion

//#region on checked

terima_order.addEventListener('click', function(){
    if (terima_order.checked) {
        table_data.clear().draw();
        AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
    }
});

//#endregion
