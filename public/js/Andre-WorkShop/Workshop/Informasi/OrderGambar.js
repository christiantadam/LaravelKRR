let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let kddivisi = document.getElementById("kddivisi");
let pengorder = document.getElementById("pengorder");
let terima_order = document.getElementById("terima_order");
let refresh = document.getElementById("refresh");
let TableOrderGambar = $("#TableOrderGambar").DataTable({
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
                return row.Manager !== null
                    ? `${row.Manager} , ${row.AccMng}`
                    : " ";
            },
        },
        { title: "Tanggal ACC Dir", data: "AccDir" },
        { title: "ACC D.Teknik", data: "AccTek" },
        { title: "Tanggal Start", data: "Start" },
        { title: "Tanggal Finish", data: "Finish" },
        {
            title: "TdkStj Mngr",
            data: function (row) {
                return row.UserMng !== null
                    ? `${row.UserMng} , ${row.TdStj1}`
                    : " ";
            },
        },
        {
            title: "Ket. TdkStj Mngr",
            data: "Ref1",
        },
        {
            title: "Tanggal TdkStj Dir",
            data: "TdStj2",
        },
        { title: "Ket. TdkStj Dir", data: "Ref2" },
        { title: "Ditolak D.Teknik", data: "Ditolak" },
        { title: "Ket.Ditolak D.Teknik", data: "RefDitolak" },
    ],
});
let selectedRowIndex = null; // Track the index of the selected row

//#region set tanggal

const currentDate = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);

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
    TableOrderGambar.clear().draw();
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
    if (pengorder.checked == true) {
        fetch(
            "/GetAllDataPengorderGambar/" +
                tglawal +
                "/" +
                tglakhir +
                "/" +
                idDivisi
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
                TableOrderGambar.clear(); // Bersihkan data saat ini (jika ada)
                $("#TableOrderGambar").css("width", "max-content");
                TableOrderGambar.rows.add(datas).draw();
                // datatable = datas;
            });
    } else if (terima_order.checked == true) {
        $.ajax({
            url: "/OrderGambar/GetAllDataPenerimaGambar",
            method: "GET",
            data: {
                _token: csrfToken,
                tglawal: tglawal,
                divisi: idDivisi,
                tglakhir: tglakhir,
            },
            dataType: "json",
            success: function (datas) {
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
                    const tglOrder = data.Tgl_Order;
                    const [tanggal, waktu] = tglOrder.split(" ");
                    data.Tgl_Order = tanggal;

                    if (data.AccMng != null) {
                        const [tanggal1] = data.AccMng.split(" ");
                        data.AccMng = tanggal1;
                    }
                    if (data.AccDir !== null) {
                        const [tanggal1] = data.AccDir.split(" ");
                        data.AccDir = tanggal1;
                    }
                    if (data.AccTek !== null) {
                        const [tanggal1] = data.AccTek.split(" ");
                        data.AccTek = tanggal1;
                    }
                    if (data.Start !== null) {
                        const [tanggal1] = data.Start.split(" ");
                        data.Start = tanggal1;
                    }
                    if (data.Finish !== null) {
                        const [tanggal1] = data.Finish.split(" ");
                        data.Finish = tanggal1;
                    }
                    if (data.TdStj1 !== null) {
                        const [tanggal1] = data.TdStj1.split(" ");
                        data.TdStj1 = tanggal1;
                    }
                    if (data.TdStj2 !== null) {
                        const [tanggal1] = data.TdStj2.split(" ");
                        data.TdStj2 = tanggal1;
                    }
                    if (data.Ditolak !== null) {
                        const [tanggal1] = data.Ditolak.split(" ");
                        data.Ditolak = tanggal1;
                    }
                });

                TableOrderGambar.clear().draw(); // Bersihkan data saat ini (jika ada)
                $("#TableOrderGambar").css("width", "max-content");
                TableOrderGambar.rows.add(datas).draw();
            },
            error: function (xhr, status, error) {
                console.error("AJAX error:", status, error);
                alert("Gagal mengambil data: " + error);
            },
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

terima_order.addEventListener("click", function () {
    if (terima_order.checked) {
        TableOrderGambar.clear().draw();
        AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
    }
});

//#endregion

//#region on click table_daftarTujuanKonversi

$("#TableOrderGambar tbody").on("click", "tr", function () {
    // Remove the 'selected' class from any previously selected row
    $("#TableOrderGambar tbody tr").removeClass("selected");

    // Add the 'selected' class to the clicked row
    $(this).addClass("selected");

    // Get data from the clicked row
    selectedRowIndex = TableOrderGambar.row(this).index();
});

//#endregion

//#region Keyboard navigation
$(document).on("keydown", function (e) {
    if (selectedRowIndex === null) return;

    const rowCount = TableOrderGambar.rows().count();
    const pageInfo = TableOrderGambar.page.info();

    if (e.key === "ArrowDown") {
        e.preventDefault();

        if (selectedRowIndex < rowCount - 1) {
            selectedRowIndex++;

            // If we're at the bottom of the current page, move to the next page
            if (selectedRowIndex >= (pageInfo.page + 1) * pageInfo.length) {
                TableOrderGambar.page("next").draw("page");
                setTimeout(() => updateRowSelection(), 50); // Wait for redraw
            } else {
                updateRowSelection();
            }
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();

        if (selectedRowIndex > 0) {
            selectedRowIndex--;

            // If we're above the top of the current page, move to the previous page
            if (selectedRowIndex < pageInfo.page * pageInfo.length) {
                TableOrderGambar.page("previous").draw("page");
                setTimeout(() => updateRowSelection(), 50); // Wait for redraw
            } else {
                updateRowSelection();
            }
        }
    }
});

function updateRowSelection() {
    $("#TableOrderGambar tbody tr").removeClass("selected");

    const rowNode = TableOrderGambar.row(selectedRowIndex).node();
    if (rowNode) {
        $(rowNode).addClass("selected");
        rowNode.scrollIntoView({ behavior: "smooth", block: "nearest" });

        const rowData = TableOrderGambar.row(selectedRowIndex).data();
        console.log("Selected row data:", rowData);
    }
}

//#endregion
