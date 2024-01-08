let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let kddivisi = document.getElementById("kddivisi");
let table_data = $("#TableOrderGambar").DataTable();
let pengorder = document.getElementById("pengorder");
let terima_order = document.getElementById("terima_order");
let refresh = document.getElementById("refresh");

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
        } else if (terima_order.checked == true) {
            AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
        } else if (
            pengorder.checked == false &&
            terima_order.checked == false
        ) {
            alert("Pilih 'Sebagai Pengorder' Atau 'Sebagai Penerima Order'");
            return;
        }
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
        //console.log('Tombol Enter ditekan!');
    }
});

//#endregion

//#region all data

function AllData(tglawal, tglakhir, idDivisi) {
    table_data = $("#TableOrderGambar").DataTable({
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
            { title: "Tgl. Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
            { title: "Divisi", data: "NamaDivisi" },
            { title: "Nama Barang", data: "Nama_Brg" },
            { title: "Mesin", data: "Mesin" },
            {
                title: "Satuan",
                data: "Nama_satuan",
                render: function (data) {
                    return `1 ${data}`;
                },
            },
            { title: "Status Order", data: "Status" },
            { title: "Ket. Order", data: "Ket_Order" },
            { title: "PengOrder", data: "UserOd" },
            {
                title: "ACC Mngr",
                data: function (row) {
                    return row.Manager !== null ? `${row.Manager} , ${row.AccMng}` : " ";
                },
            },
            { title: "Tanggal ACC Dir", data : "AccDir"},
            { title: "ACC D.Teknik", data: "AccTek"},
            { title: "Tanggal Start", data: "Start"},
            { title: "Tanggal Finish", data: "Finish"},
            {
                title: "TdkStj Mngr",
                data: function (row) {
                    return row.UserMng !== null ? `${row.UserMng} , ${row.TdStj1}` : " ";
                },
            },
            {
                title: "Ket. TdkStj Mngr",
                data : "Ref1"
            },
            {
                title: "Tanggal TdkStj Dir",
                data: "TdStj2"
            },
            { title: "Ket. TdkStj Dir", data:"Ref2"},
            { title: "Ditolak D.Teknik", data: "Ditolak"},
            { title: "Ket.Ditolak D.Teknik", data:"RefDitolak"},
        ],
    });

    if (pengorder.checked == true) {
        fetch(
            "/GetAllDataPengorderGambar/" + tglawal + "/" + tglakhir + "/" + idDivisi
        )
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas.length == 0) {
                    alert(
                        "Tidak ada order gambar U/ tgl " +
                            tglawal +
                            " s/d tgl " +
                            tglakhir
                    );
                    return;
                }
                datas.forEach((data) => {
                    //Ambil nilai Tgl_Order dari setiap objek data
                    const tglOrder = data.Tgl_Order;
                    const [tanggal, waktu] = tglOrder.split(" ");

                    data.Tgl_Order = tanggal;
                    if (data.AccMng != null) {
                        const tglmanager = data.AccMng;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.AccMng = tanggal1;
                    }
                    if (data.AccDir !== null) {
                        const tglmanager = data.AccDir;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.AccDir = tanggal1;
                    }
                    if (data.AccTek !== null) {
                        const tglmanager = data.AccTek;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.AccTek = tanggal1;
                    }
                    if (data.Start !== null) {
                        const tglmanager = data.Start;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.Start = tanggal1;
                    }
                    if (data.Finish !== null) {
                        const tglmanager = data.Finish;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.Finish = tanggal1;
                    }
                    if (data.TdStj1 !== null) {
                        const tglmanager = data.TdStj1;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.TdStj1 = tanggal1;
                    }
                    if (data.TdStj2 !== null) {
                        const tglmanager = data.TdStj2;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.TdStj2 = tanggal1;
                    }
                    if (data.Ditolak !== null) {
                        const tglmanager = data.Ditolak;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.Ditolak = tanggal1;
                    }
                });
                table_data.clear(); // Bersihkan data saat ini (jika ada)
                $("#TableOrderGambar").css("width", "max-content");
                table_data.rows.add(datas).draw();
                // datatable = datas;
            });
    } else if (terima_order.checked == true) {
        fetch("/GetAllDataPenerimaGambar/" + tglawal + "/" + tglakhir)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas.length == 0) {
                    alert(
                        "Tidak ada order gambar U/ tgl " +
                            tglawal +
                            " s/d tgl " +
                            tglakhir
                    );
                    return;
                }
                datas.forEach((data) => {
                    // Ambil nilai Tgl_Order dari setiap objek data
                    const tglOrder = data.Tgl_Order;
                    const [tanggal, waktu] = tglOrder.split(" ");

                    data.Tgl_Order = tanggal;
                    if (data.AccMng != null) {
                        const tglmanager = data.AccMng;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.AccMng = tanggal1;
                    }
                    if (data.AccDir !== null) {
                        const tglmanager = data.AccDir;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.AccDir = tanggal1;
                    }
                    if (data.AccTek !== null) {
                        const tglmanager = data.AccTek;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.AccTek = tanggal1;
                    }
                    if (data.Start !== null) {
                        const tglmanager = data.Start;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.Start = tanggal1;
                    }
                    if (data.Finish !== null) {
                        const tglmanager = data.Finish;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.Finish = tanggal1;
                    }
                    if (data.TdStj1 !== null) {
                        const tglmanager = data.TdStj1;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.TdStj1 = tanggal1;
                    }
                    if (data.TdStj2 !== null) {
                        const tglmanager = data.TdStj2;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.TdStj2 = tanggal1;
                    }
                    if (data.Ditolak !== null) {
                        const tglmanager = data.Ditolak;
                        const [tanggal1, waktu1] = tglmanager.split(" ");
                        data.Ditolak = tanggal1;
                    }
                });
                table_data.clear().draw(); // Bersihkan data saat ini (jika ada)
                $("#TableOrderGambar").css("width", "max-content");
                table_data.rows.add(datas).draw();
                // datatable = datas;
            });
    } else if (pengorder.checked == false && terima_order.checked == false) {
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
        AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
    }
});

//#endregion
