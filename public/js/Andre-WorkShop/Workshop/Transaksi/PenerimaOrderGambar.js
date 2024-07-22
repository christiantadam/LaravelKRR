//#region variabel
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let table_data = $("#tablepenerimagambar").DataTable();
let cek = false;
let refresh = document.getElementById("refresh");

let Ket_tolak;
let ket = [];
let KetTdkS = document.getElementById("KetTdkS");
let arraycheckbox = [];
let red = false;
let semuacentang = document.getElementById("semuacentang");
var panjangdata;
let acc_order = document.getElementById("acc_order");
let batal_acc = document.getElementById("batal_acc");
let order_tolak = document.getElementById("order_tolak");
let order_kerja = document.getElementById("order_kerja");
let order_selesai = document.getElementById("order_selesai");
let order_batal = document.getElementById("order_batal");

let methodForm = document.getElementById("methodForm");
let formPemerimaGambar = document.getElementById("formPemerimaGambar");

// let user = 4384;
let iduser = document.getElementById("iduser");
iduser.value = user;

let ModalProsesPembeliGambar = document.getElementById(
    "ModalProsesPembeliGambar"
);
let methodFormProses = document.getElementById("methodFormProses");
let tglOrder = document.getElementById("tglOrder");
let noOrder = document.getElementById("noOrder");
let KodeBarang = document.getElementById("KodeBarang");
let noGambar = document.getElementById("noGambar");
let Divisimodal = document.getElementById("Divisimodal");
let NamaBarangModal = document.getElementById("NamaBarangModal");
let KeteranganModal = document.getElementById("KeteranganModal");
let JumlahModal = document.getElementById("JumlahModal");
let DrafterModal = document.getElementById("DrafterModal");
let tgl_start = document.getElementById("tgl_start");
let tgl_finish = document.getElementById("tgl_finish");
let IdUser = document.getElementById("IdUser");
let NamaUser = document.getElementById("NamaUser");
var trselect;
var index;
let lblstatus = document.getElementById("lblstatus");
let Tsts = document.getElementById("Tsts");
let TuserOd = document.getElementById("TuserOd");
let ketbatal = document.getElementById("ketbatal");
let btnkoreksi = document.getElementById("btnkoreksi");
let no_orderkoreksi = document.getElementById("no_order");

IdUser.value = user;
let tableModal = $("#tableModal").DataTable();
let NoGambarModal = document.getElementById("NoGambarModal");
let NamaGambarModal = document.getElementById("NamaGambarModal");
let Approvemodal = document.getElementById("Approvemodal");

let arraynomorgambar = document.getElementById("arraynomorgambar");
let arraynamagambar1 = document.getElementById("arraynamagambar");
let arraytglapprove = document.getElementById("arraytglapprove");
let radiobox = document.getElementById("radiobox");

let btnproses = document.getElementById("btnproses");
let btnplus = document.getElementById("btnplus");
let btnmin = document.getElementById("btnmin");
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
tgl_start.value = formattedCurrentDate;
tgl_finish.value = formattedCurrentDate;
//#endregion

//#region set warna
//Css ACCDirekturGambar
table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        // console.log(
        //     data.Tgl_TdStjMg == null,
        //     data.User_Apv_1 == null,
        //     data.User_Apv_2 == null,
        //     data.Tgl_Tolak_Mng == null
        // );
        if (
            data.Acc_Mng !== null &&
            data.User_Rcv == null &&
            data.Tgl_Finish == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("red-color");
        }
        if (
            data.Acc_Mng !== null &&
            data.User_Rcv !== null &&
            data.Tgl_Finish == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("blue-color");
        }
        if (data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");
        }
        if (
            data.Acc_Mng == null &&
            data.User_Rcv == null &&
            data.Tgl_Finish == null &&
            data.Tgl_Tolak_Mng == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});

//#endregion

//#region all data

function AllData(tglAwal, tglAkhir) {
    fetch("/getalldataPenerimaGambar/" + tglAwal + "/" + tglAkhir)
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

                alert("Belum Ada Order Gambar yang masuk.");
            } else {
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#tablepenerimagambar").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No. Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" },
                        { title: "Tgl. ACC Direktur", data: "Tgl_Apv_2" },
                        { title: "Nama Barang", data: "Nama_Brg" },
                        { title: "NoGbrRev", data: "No_Gbr_Rev" },
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
                        { title: "Peng-Order", data: "NmUserOd" },
                        { title: "UserOd", data: "User_Order" },
                    ],
                });
                table_data.draw();
            }
        });
}

//#endregion

//#region tgl2 press enter
tgl_akhir.addEventListener("keypress", function (event) {
    // Mengecek apakah tombol yang ditekan adalah tombol 'Enter'
    if (event.key === "Enter") {
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
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

//#region pilih semua
$("#pilihsemua").on("click", function () {
    // Get all the checkboxes within the DataTable
    const checkboxes = $(
        "input[name='penerimaCheckbox']",
        table_data.rows().nodes()
    );
    if (cek == false) {
        checkboxes.prop("checked", true);
        cek = true;
    } else if (cek == true) {
        checkboxes.prop("checked", false);
        cek = false;
    }
    // Check all the checkboxes
});

//#endregion

//#region button proses

function klikproses() {
    //console.log(table_data.rows().count());
    if (table_data.rows().count() != 0) {
        fetch("/cekuser/" + iduser.value)
            .then((response) => response.json())
            .then((datas) => {
                panjangdata = datas[0].ada;
            });
        if (panjangdata == 0) {
            alert("Login " + user + " Tidak berHak utk memproses.");
            return;
        } else {
            $("input[name='penerimaCheckbox']").each(function () {
                // Ambil nilai 'value' dan status 'checked' dari checkbox
                let value = $(this).val();
                let isChecked = $(this).prop("checked");
                let closestTd = $(this).closest("tr");
                console.log(closestTd);
                // Lakukan sesuatu berdasarkan status 'checked'
                if (acc_order.checked == true) {
                    if (isChecked && closestTd.hasClass("black-color")) {
                        arraycheckbox.push(value);
                    }
                } else if (batal_acc.checked == true) {
                    if (isChecked && closestTd.hasClass("red-color")) {
                        arraycheckbox.push(value);
                    }
                } else if (order_tolak.checked == true) {
                    if (isChecked && closestTd.hasClass("black-color")) {
                        Ket_tolak = prompt(
                            "Alasan Ditolak Order" + value + " :"
                        );
                        if (Ket_tolak !== null) {
                            ket.push(Ket_tolak);
                            arraycheckbox.push(value);
                        }
                    }
                }
            });
            //console.log(acc_order.value , batal_acc.value , order_tolak.value);
            if (
                acc_order.checked == false &&
                batal_acc.checked == false &&
                order_tolak.checked == false
            ) {
                //console.log("masuk");
                alert("Pilih 'Order Diterima' atau 'Order Dibatalkan'");
            } else {
                if (arraycheckbox.length > 0) {
                    if (acc_order.checked == true) {
                        var arrayString = arraycheckbox.join(",");
                        radiobox.value = "acc";
                        semuacentang.value = arrayString;
                        methodForm.value = "PUT";
                        formPemerimaGambar.action =
                            "/PenerimaOrderGambar/" + semuacentang.value;
                        formPemerimaGambar.submit();
                    } else if (batal_acc.checked == true) {
                        var arrayString = arraycheckbox.join(",");
                        radiobox.value = "batal_acc";
                        semuacentang.value = arrayString;
                        methodForm.value = "PUT";
                        formPemerimaGambar.action =
                            "/PenerimaOrderGambar/" + semuacentang.value;
                        formPemerimaGambar.submit();
                    } else if (order_tolak.checked == true) {
                        var arrayString = arraycheckbox.join(",");
                        var arrayString1 = ket.join(",");
                        radiobox.value = "tolak_setuju";
                        KetTdkS.value = arrayString1;
                        semuacentang.value = arrayString;
                        methodForm.value = "PUT";
                        formPemerimaGambar.action =
                            "/PenerimaOrderGambar/" + semuacentang.value;
                        formPemerimaGambar.submit();
                    }
                }
                if (arraycheckbox.length == 0) {
                    alert("Pilih Nomer Order Yang Akan DiPROSES.");
                }
            }
        }
    }
}

//#endregion

//#region butn koreksi
function koreksiklik() {
    if (
        order_kerja.checked == false &&
        order_selesai.checked == false &&
        order_batal.checked == false
    ) {
        alert(
            "Pilih 'Order DiKerjakan' atau 'Order Selesai' atau 'Order Dibatalkan"
        );
    } else {
        let no_order;
        var arrayindex = [];
        $("input[name='penerimaCheckbox']:checked").each(function () {
            let rowIndex = $(this).closest("tr").index();
            let closestTr = $(this).closest("tr");
            // console.log(rowIndex);
            no_order = this.value;
            trselect = closestTr;
            index = rowIndex;
            arrayindex.push(index);
            console.log(trselect);
            // let value = this.value;
            // console.log(rowIndexArray);
        });
        console.log(index);
        if (arrayindex.length === 0 || arrayindex.length > 1) {
            alert("Pilih 1 Data Untuk DiPROSES");
        } else {
            if (trselect.hasClass("red-color") && order_batal.checked == true) {
                alert("Proses Order Untuk Dikerjakan Dulu Atau Batal ACC");
                return;
            }
            if (trselect.hasClass("black-color")) {
                alert("Proses Order Untuk Diterima Dulu, baru Koreksi");
                return;
            }
            if (
                trselect.hasClass("red-color") &&
                order_selesai.checked == true
            ) {
                alert("Proses Order Untuk Dikerjakan Dulu");

                return;
            } else if (
                order_kerja.checked == true ||
                order_selesai.checked == true
            ) {
                btnkoreksi.setAttribute("data-toggle", "modal");
                btnkoreksi.setAttribute("data-target", "#modalkoreksi");
            } else {
                btnkoreksi.setAttribute("data-toggle", "");
                btnkoreksi.setAttribute("data-target", "");
            }
            if (
                trselect.hasClass("red-color") ||
                (trselect.hasClass("blue-color") && order_kerja.checked == true)
            ) {
                console.log(table_data.cell(index, 0).data());
                tglOrder.value = table_data.cell(index, 1).data();
                noOrder.value = table_data.cell(index, 0).data();
                Divisimodal.value = table_data.cell(index, 7).data();
                NamaBarangModal.value = table_data.cell(index, 3).data();
                noGambar.value = table_data.cell(index, 4).data();
                KeteranganModal.value = table_data.cell(index, 9).data();
                JumlahModal.value = table_data.cell(index, 5).data();
                lblstatus.textContent = table_data.cell(index, 6).data();
                TuserOd.value = table_data.cell(index, 11).data();
                fetch("/GetUserDrafterPenerimaOrderGambar/" + noOrder.value)
                    .then((response) => response.json())
                    .then((datas) => {
                        // panjangdata = datas[0].ada;
                        console.log(datas);
                        DrafterModal.value = datas[0].User_Pembuat;
                        tgl_finish.focus();
                    });
                Tsts.value = 1;
            }
            if (
                trselect.hasClass("blue-color") &&
                order_selesai.checked == true
            ) {
                tgl_finish.disabled = false;
                NoGambarModal.disabled = false;
                NamaGambarModal.disabled = false;
                Approvemodal.disabled = false;
                btnplus.disabled = false;
                btnmin.disabled = false;
                tglOrder.value = table_data.cell(index, 1).data();
                noOrder.value = table_data.cell(index, 0).data();
                Divisimodal.value = table_data.cell(index, 7).data();
                NamaBarangModal.value = table_data.cell(index, 3).data();
                noGambar.value = table_data.cell(index, 4).data();
                KeteranganModal.value = table_data.cell(index, 9).data();
                JumlahModal.value = table_data.cell(index, 5).data();
                lblstatus.textContent = table_data.cell(index, 6).data();
                TuserOd.value = table_data.cell(index, 11).data();
                Tsts.value = 2;
                fetch("/GetUserDrafterPenerimaOrderGambar/" + noOrder.value)
                    .then((response) => response.json())
                    .then((datas) => {
                        // panjangdata = datas[0].ada;
                        console.log(datas);
                        DrafterModal.value = datas[0].User_Pembuat;
                        tgl_finish.focus();
                    });
            }
            if (
                trselect.hasClass("blue-color") &&
                order_batal.checked == true
            ) {
                let ada;
                fetch("/cekuserkoreksi/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        console.log(datas[0].ada);
                        ada = datas[0].ada;
                    });
                if (ada == 0) {
                    alert("Login " + user + " Tidak berHak utk memproses.");
                } else {
                    Ket_batal = prompt("Alasan Dibatalkan : ");
                    if (Ket_batal !== null) {
                        ketbatal.value = Ket_batal;
                        no_orderkoreksi.value = no_order;
                        methodForm.value = "PUT";
                        radiobox.value = "order_batal";
                        formPemerimaGambar.action =
                            "/PenerimaOrderGambar/" + no_orderkoreksi.value;
                        formPemerimaGambar.submit();
                    }
                }
            }
        }
    }
}
//#endregion

//#region cek nomor gambar
NoGambarModal.addEventListener("keypress", function (event) {
    let ceknmorgmbar;
    if (event.key === "Enter") {
        fetch("/ceknomorGambar/" + NoGambarModal.value)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas[0].ada);
                ceknmorgmbar = datas[0].ada;
                if (ceknmorgmbar > 0) {
                    //console.log(ceknmorgmbar);
                    alert(
                        "Nomer Gambar Sudah DiPakai, Cek Lagi Nomer Gambarnya"
                    );
                }
            });
        //console.log(ceknmorgmbar);
    }
});
//#endregion

//#region button plus
function klikplus() {
    tableModal.row
        .add([NoGambarModal.value, NamaGambarModal.value, Approvemodal.value])
        .draw(false);
}
//#endregion

//#region klikmin
function klikmin() {
    var lastRowIndex = tableModal.rows().count() - 1;
    tableModal.row(lastRowIndex).remove().draw(false);
}

//#endregion

//#region proses modal
function prosesmodalklik() {
    if (Tsts.value == 1) {
        let ada;
        fetch("/cekuserprosesmodal/" + user + "/" + 3)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas[0].ada);
                ada = datas[0].ada;
            });
        if (ada == 0) {
            alert("Login " + user + " Tidak berHak utk memproses.");
        } else {
            methodFormProses.value = "PUT";
            ModalProsesPembeliGambar.action =
                "/PenerimaOrderGambar/" + noOrder.value;
            ModalProsesPembeliGambar.submit();
        }
    }
    if (Tsts.value == 2) {
        let ada;
        fetch("/cekuserprosesmodal/" + user + "/" + 2)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas[0].ada);
                ada = datas[0].ada;
            });
        if (ada == 0) {
            alert("Login " + user + " Tidak berHak utk memproses.");
        } else {
            var confirm = window.confirm("Order Sudah Selesai??");
            if (!confirm) {
                tgl_finish.value = "";
                var arraynogambar = [];
                var arraynamabarang = [];
                var arraytgl = [];
                var data = tableModal.rows().data().toArray();
                console.log(data[0]);
                for (let index = 0; index < data.length; index++) {
                    arraynogambar.push(data[index][0]);
                    arraynamabarang.push(data[index][1]);
                    arraytgl.push(data[index][2]);
                }
                var arrayStringnogambar = arraynogambar.join(",");
                var arrayStringnamabarang = arraynamabarang.join(",");
                var arrayStringapprove = arraytgl.join(",");
                arraynomorgambar.value = arrayStringnogambar;
                arraynamagambar1.value = arrayStringnamabarang;
                arraytglapprove.value = arrayStringapprove;
                methodFormProses.value = "PUT";
                ModalProsesPembeliGambar.action =
                    "/PenerimaOrderGambar/" + noOrder.value;
                ModalProsesPembeliGambar.submit();
            } else {
                var arraynogambar = [];
                var arraynamabarang = [];
                var arraytgl = [];
                var data = tableModal.rows().data().toArray();
                console.log(data[0]);
                for (let index = 0; index < data.length; index++) {
                    arraynogambar.push(data[index][0]);
                    arraynamabarang.push(data[index][1]);
                    arraytgl.push(data[index][2]);
                }
                var arrayStringnogambar = arraynogambar.join(",");
                var arrayStringnamabarang = arraynamabarang.join(",");
                var arrayStringapprove = arraytgl.join(",");
                arraynomorgambar.value = arrayStringnogambar;
                arraynamagambar1.value = arrayStringnamabarang;
                arraytglapprove.value = arrayStringapprove;

                methodFormProses.value = "PUT";
                ModalProsesPembeliGambar.action =
                    "/PenerimaOrderGambar/" + noOrder.value;
                ModalProsesPembeliGambar.submit();
            }
        }
    }
}
//#endregion

//#region set button

acc_order.addEventListener("click", function () {
    btnproses.disabled = false;
    btnkoreksi.disabled = true;
});

batal_acc.addEventListener("click", function () {
    btnproses.disabled = false;
    btnkoreksi.disabled = true;
});

order_tolak.addEventListener("click", function () {
    btnproses.disabled = false;
    btnkoreksi.disabled = true;
});

order_kerja.addEventListener("click", function () {
    btnproses.disabled = true;
    btnkoreksi.disabled = false;
});

order_selesai.addEventListener("click", function () {
    btnproses.disabled = true;
    btnkoreksi.disabled = false;
});
order_batal.addEventListener("click", function () {
    btnproses.disabled = true;
    btnkoreksi.disabled = false;
});
//#endregion

//#region set fokus

tgl_awal.focus();
tgl_awal.addEventListener("keypress", function(event){
    if (event.key == "Enter") {
        tgl_akhir.focus();
    }
});

//#endregion
