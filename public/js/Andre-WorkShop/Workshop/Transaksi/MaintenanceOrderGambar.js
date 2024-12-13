// document.addEventListener("DOMContentLoaded", function () {
//     const userDataElement = document.getElementById("user-data");
//     const user = userDataElement.getAttribute("data-nomoruser");
//     console.log("User number is:", user);

//     // Lanjutkan dengan kode JavaScript lainnya
// });

//tanggal
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");

//select
let Divisi = document.getElementById("kddivisi");
let bodytable = document.getElementById("datatable");

//array
let dataarray = [];
// let user = 4384;
//form
let formMaintenanceOrderGambar = document.getElementById(
    "formMaintenanceOrderGambar"
);
let no_order = document.getElementById("no_order");
let no_gambar_rev = document.getElementById("no_gambar_rev");
let jmlh1 = document.getElementById("jmlh1");
let jmlh2 = document.getElementById("jmlh2");
let keterangan_order = document.getElementById("keterangan_order");
let pengorder = document.getElementById("pengorder");
let acc_manager = document.getElementById("acc_manager");
let manager = document.getElementById("manager");
let acc_direktur = document.getElementById("acc_direktur");
let tgl_manager = document.getElementById("tgl_manager");
let ket_manager = document.getElementById("ket_manager");
let tgl_direktur = document.getElementById("tgl_direktur");
let ket_direktur = document.getElementById("ket_direktur");
let tgl_teknik = document.getElementById("tgl_teknik");
let ket_teknik = document.getElementById("ket_teknik");
let judulstatus = document.getElementById("status");
let pilih;
let userorder;

//buat data table
let table_data = $("#tableklik").DataTable();

let tglACCmanager = null;
let tglACCdirektur = null;
let tglTSmanager = null;
let tglTSdirektur = null;
let tglteknikT = null;

//modal
let modetrans;
// let isibaru = document.getElementById('isibaru');
let isibarutitle = document.getElementById("isibarutitle");
let pengordermodalbaru = document.getElementById("PengorderBaru");
let isimodifikasititle = document.getElementById("isimodifikasititle");
//btn proses
let prosesbaru = document.getElementById("prosesbaru");
let prosesmodifikasi = document.getElementById("prosesmodifikasi");
//form modal
let formbaru = document.getElementById("formbaru");
let formModifikasi = document.getElementById("formModifikasi");
let methodFormBaru = document.getElementById("methodFormBaru");
let methodFormModifikasi = document.getElementById("methodFormModifikasi");
//id div
let iddivisimodalmodif = document.getElementById("iddivisimodalmodif");
let iddivisimodalbaru = document.getElementById("iddivisimodalbaru");
//form modif
let PengorderModif = document.getElementById("PengorderModif");
//input modal baru
let TglMaintenanceGambarBaru = document.getElementById(
    "TglMaintenanceGambarBaru"
);
let TNoD = document.getElementById("TNoD");
let NamaBarang = document.getElementById("NamaBarang");
let Keterangan = document.getElementById("Keterangan");
let satuanB = document.getElementById("satuanB");
let mesin = document.getElementById("Mesin");
let tglmaintenance;
let itemname;
var selectmesin;

//modal modif
let TglMaintenanceGambarmodif = document.getElementById(
    "TglMaintenanceGambarmodif"
);
let TNoDModif = document.getElementById("TNoDModif");
let NamaBarangModif = document.getElementById("NamaBarangModif");
let GambarRev = document.getElementById("GambarRev");
let KodeBarang = document.getElementById("KodeBarang");
let KeteranganModif = document.getElementById("KeteranganModif");
let satuanmodif = document.getElementById("satuanmodif");
let MesinModif = document.getElementById("MesinModif");
let kodebarangsimpan;

//pembeda
let pembedaStore = document.getElementById("pembedaStore");
//form delete
let methodForm = document.getElementById("methodForm");
//btn
let isi = document.getElementById("isi");
let koreksi = document.getElementById("koreksi");
let hapus = document.getElementById("hapus");

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
TglMaintenanceGambarBaru.value = formattedCurrentDate;
TglMaintenanceGambarmodif.value = formattedCurrentDate;
//Css ACCManagerGambar
table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        if (data.Tgl_TdStjMg !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("acs-empty-cell");
        }
        if (data.User_Apv_1 !== null && data.User_Apv_2 == "N") {
            $(this.node()).removeClass();
            $(this.node()).addClass("blue-color");
        }
        if (data.Tgl_TdStjDir !== null && data.User_Apv_1 !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("gray-color");
        }
        if (data.User_Apv_2 == "Y" && data.Tgl_Tolak_Mng === null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("red-color");
        }
        if (data.User_Apv_2 == "Y" && data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");
        }
        if (
            data.Tgl_TdStjMg == null &&
            data.User_Apv_1 == null &&
            data.User_Apv_2 == null &&
            data.Tgl_Tolak_Mng == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});

//#region get All data
function AllData(tglAwal, tglAkhir, idDivisi) {
    fetch("/getalldata/" + tglAwal + "/" + tglAkhir + "/" + idDivisi)
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
                    "Tidak ada Order, tgl " + tglAwal + " s/d tgl " + tglAkhir
                );
            } else {
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#tableklik").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                        { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                        { title: "Status Order", data: "Status" },
                        { title: "No_Gbr_Revisi", data: "No_Gbr_Rev" },
                        { title: "Mesin", data: "Mesin" },
                        { title: "Kd. Brg", data: "Kd_Brg" },
                    ],
                });
                table_data.draw();
            }

            // initializeDataTable(datas);
            // datas.forEach((data) => {
            //     //console.log(data);
            //     dataarray.push(data.Id_Order, data.Tgl_Order);
            //     //console.log(dataarray);
            // });
            //console.log(dataarray);
        });
}
//#endregion
//#region get mesin
function Mesin(iddivisi) {
    fetch("/mesin/" + iddivisi)
        .then((response) => response.json())
        .then((options) => {
            //mesin buat form baru

            mesin.innerHTML = "";
            //
            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih Mesin";
            mesin.appendChild(defaultOption);
            //
            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Nomer;
                option.innerText = entry.Mesin + "--" + entry.Nomer;
                mesin.appendChild(option);
            });

            MesinModif.innerHTML = "";
            //
            const defaultOption1 = document.createElement("option");
            defaultOption1.disabled = true;
            defaultOption1.selected = true;
            defaultOption1.innerText = "Pilih Mesin";
            MesinModif.appendChild(defaultOption1);
            //
            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Nomer;
                option.innerText = entry.Mesin + "--" + entry.Nomer;
                MesinModif.appendChild(option);
            });

            // Optional: Check the data in the console
            //console.log(options);
        });
}
//#endregion
//panggil data berdasarkan user
//#region getdata by user
function AllDataUser(tglAwal, tglAkhir, idUser, idDivisi) {
    fetch(
        "/GatDataForUserOrder/" +
            tglAwal +
            "/" +
            tglAkhir +
            "/" +
            idUser +
            "/" +
            idDivisi
    )
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
            console.log(datas.length); // Optional: Check the data in the console
            if (datas.length == 0) {
                //console.log("masuk ke == 0");
                alert(
                    "Tidak ada Order, tgl " +
                        tglAwal +
                        " s/d tgl " +
                        tglAkhir +
                        " u/ User " +
                        idUser
                );
            } else {
                $("#tableklik").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                        { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                        { title: "Status Order", data: "Status" },
                        { title: "No_Gbr_Revisi", data: "No_Gbr_Rev" },
                        { title: "Mesin", data: "Mesin" },
                        { title: "Kd. Brg", data: "Kd_Brg" },
                    ],
                });
            }
            // initializeDataTable(datas);
            // datas.forEach((data) => {
            //     //console.log(data);
            //     dataarray.push(data.Id_Order, data.Tgl_Order);
            //     //console.log(dataarray);
            // });
            //console.log(dataarray);
        });
}
//#endregion
//#region cleardata

function cleardata() {
    judulstatus.textContent = "";
    no_order.value = "";
    no_gambar_rev.value = "";
    // jmlh1.value = selectedRows[0].
    jmlh2.value = "";
    keterangan_order.value = "";
    pengorder.value = "";
    acc_manager.value = ""; //tglACCmanager[0];
    manager.value = "";
    acc_direktur.value = "";
    tgl_manager.value = "";
    ket_manager.value = "";
    tgl_direktur.value = "";
    ket_direktur.value = "";
    tgl_teknik.value = "";
    ket_teknik.value = "";
}
//#endregion

Divisi.addEventListener("change", function () {
    const isConfirmed = confirm(`Tampilkan Semua Order??`);
    cleardata();
    table_data.clear().draw();

    if (isConfirmed) {
        pilih = 1;
        AllData(tgl_awal.value, tgl_akhir.value, Divisi.value);
    } else {
        pilih = 2;
        AllDataUser(tgl_awal.value, tgl_akhir.value, user, Divisi.value);
    }

    Mesin(Divisi.value);
});

function Refresh() {
    if (pilih == 1) {
        AllData(tgl_awal.value, tgl_akhir.value, Divisi.value);
        cleardata();
        // table_data.clear();
    } else if (pilih == 2) {
        AllDataUser(tgl_awal.value, tgl_akhir.value, user, Divisi.value);
        // table_data.clear();
        cleardata();
    }
}
function klikisi() {
    if (Divisi.value != "Pilih Divisi") {
        const isConfirmed = confirm(`Order Gambar Baru??`);
        modetrans = 1;
        if (isConfirmed) {
            isi.setAttribute("data-toggle", "modal");
            isi.setAttribute("data-target", "#isibaru");
            isibarutitle.textContent =
                Divisi.options[Divisi.selectedIndex].text.split("--")[1];
            iddivisimodalbaru.value = Divisi.value;
            pengordermodalbaru.value = user;
        } else {
            isi.setAttribute("data-toggle", "modal");
            isi.setAttribute("data-target", "#modifikasi");
            iddivisimodalmodif.value = Divisi.value;
            PengorderModif.value = user;
            isimodifikasititle.textContent =
                Divisi.options[Divisi.selectedIndex].text.split("--")[1];
        }
    } else {
        alert("Pilih Divisi Anda");
    }
}
//#region btn koreksi
function klikkoreksi() {
    if (Divisi.value != "Pilih Divisi") {
        if (tgl_teknik.value != "") {
            alert(
                "Order Tidak Boleh Di-KOREKSI. Order ditolak oleh Div. Teknik."
            );
        } else if (acc_manager.value != "" || manager.value != "") {
            alert("Order Tidak Boleh Di-KOREKSI. Sudah di-ACC.");
        } else if (user !== userorder.trim()) {
            console.log(user, userorder);
            alert(
                "Anda Tidak Boleh Meng-KOREKSI Order Dari User " +
                    pengorder.value
            );
        } else {
            // const isConfirmed = confirm(`Order Gambar Baru??`);
            modetrans = 2;
            if (judulstatus.textContent == "BUAT BARU") {
                koreksi.setAttribute("data-toggle", "modal");
                koreksi.setAttribute("data-target", "#isibaru");
                isibarutitle.textContent =
                    Divisi.options[Divisi.selectedIndex].text.split("--")[1];
                iddivisimodalbaru.value = Divisi.value;
                pengordermodalbaru.value = user;
                TglMaintenanceGambarBaru.value = tglmaintenance;
                TNoD.value = no_order.value;
                NamaBarang.value = itemname;
                Keterangan.value = keterangan_order.value;
                satuanB.selectedIndex = 0;
                for (let i = 0; i < satuanB.length; i++) {
                    // console.log(satuanJual.selectedIndex);
                    satuanB.selectedIndex += 1;
                    if (
                        satuanB.options[satuanB.selectedIndex].text ===
                        jmlh2.value.trim()
                    ) {
                        break;
                    }
                }
                mesin.selectedIndex = 0;
                //console.log(mesin.length);
                for (let i = 0; i < mesin.length; i++) {
                    // console.log(satuanJual.selectedIndex);
                    mesin.selectedIndex += 1;
                    // console.log(mesin.option[mesin.selectedIndex].text.split("--"));
                    if (
                        mesin.options[mesin.selectedIndex].text.split(
                            "--"
                        )[0] === selectmesin.trim()
                    ) {
                        break;
                    }
                }
                // satuanB.value = jmlh2.value;
                // mesin.value = selectmesin;
            }
            if (judulstatus.textContent == "MODIFIKASI") {
                koreksi.setAttribute("data-toggle", "modal");
                koreksi.setAttribute("data-target", "#modifikasi");
                iddivisimodalmodif.value = Divisi.value;
                PengorderModif.value = user;
                isimodifikasititle.textContent =
                    Divisi.options[Divisi.selectedIndex].text.split("--")[1];
                TglMaintenanceGambarmodif.value = tglmaintenance;
                TNoDModif.value = no_order.value;
                GambarRev.value = no_gambar_rev.value;
                KodeBarang.value = kodebarangsimpan;
                NamaBarangModif.value = itemname;
                KeteranganModif.value = keterangan_order.value;

                satuanmodif.selectedIndex = 0;
                for (let i = 0; i < satuanmodif.length; i++) {
                    // console.log(satuanJual.selectedIndex);
                    satuanmodif.selectedIndex += 1;
                    if (
                        satuanmodif.options[satuanmodif.selectedIndex].text ===
                        jmlh2.value.trim()
                    ) {
                        break;
                    }
                }
                MesinModif.selectedIndex = 0;
                //console.log(MesinModif.length);
                for (let i = 0; i < MesinModif.length; i++) {
                    // console.log(satuanJual.selectedIndex);
                    MesinModif.selectedIndex += 1;
                    // console.log(MesinModif.option[MesinModif.selectedIndex].text.split("--"));
                    if (
                        MesinModif.options[MesinModif.selectedIndex].text.split(
                            "--"
                        )[0] === selectmesin.trim()
                    ) {
                        break;
                    }
                }

                // satuanmodif.value = jmlh2.value;
                // MesinModif.value = selectmesin;
                console.log(jmlh2.value);
                console.log(selectmesin);
            }
        }
    } else {
        alert("Pilih Divisi Anda");
    }
}
//#endregion
function Getbarang(KDbarang, iddiv) {
    fetch("/GetBarang/" + KDbarang + "/" + iddiv)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                alert("Kode Barang Tidak Ada");
                GambarRev.value = "";
                NamaBarangModif.value = "";
            } else {
                GambarRev.value = datas[0].NO_GAMBAR;
                NamaBarangModif.value = datas[0].NM_BRG;
            }
        });
}
KodeBarang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let kodeBarang9digit;
        kodeBarang9digit = document.getElementById("KodeBarang");
        // console.log(kodeBarang9digit.value);
        // alert('Kode barang dienter');
        if (kodeBarang9digit.value.length < 9) {
            // alert("kode barang tidak sesuai");
            kodeBarang9digit.value = KodeBarang.value.padStart(9, "0");
            // console.log(kodeBarang9digit.value);
        }
        KodeBarang.value = kodeBarang9digit.value;
        //console.log(KodeBarang.value);
        Getbarang(KodeBarang.value, Divisi.value);
    }
});
hapus.addEventListener("click", function (event) {
    event.preventDefault();
    if (manager.value != "") {
        alert("Order Tidak Boleh Di-HAPUS. Sudah di-ACC");
    } else if (user !== userorder.trim()) {
        alert("Anda Tidak Boleh Meng-HAPUS Order Dari User " + userorder);
    } else {
        methodForm.value = "DELETE";
        console.log("delete", no_order.value);
        formMaintenanceOrderGambar.action =
            "/MaintenanceOrderGambar/" + no_order.value;
        formMaintenanceOrderGambar.submit();
    }
});

prosesbaru.addEventListener("click", function () {
    if (modetrans == 1) {
        formbaru.submit();
    } else if (modetrans == 2) {
        methodFormBaru.value = "PUT";
        formbaru.action = "/MaintenanceOrderGambar/" + no_order.value;
        formbaru.submit();
    }
});
prosesmodifikasi.addEventListener("click", function () {
    pembedaStore.value = 1;
    if (modetrans == 1) {
        formModifikasi.submit();
    } else if (modetrans == 2) {
        methodFormModifikasi.value = "PUT";
        formModifikasi.action = "/MaintenanceOrderGambar/" + no_order.value;
        formModifikasi.submit();
    }
});

$("#tableklik tbody").off("click", "tr");
$("#tableklik tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tableklik tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tableklik").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    // let tglteknikT = selectedRows[0].Tgl_Tolak_Mng.split(" ");
    judulstatus.textContent = selectedRows[0].Status;
    no_order.value = selectedRows[0].Id_Order;
    no_gambar_rev.value = selectedRows[0].No_Gbr_Rev;
    //jmlh1.value = selectedRows[0].
    jmlh2.value = selectedRows[0].Nama_satuan;
    keterangan_order.value = selectedRows[0].Ket_Order;
    pengorder.value = selectedRows[0].NmUserOd;
    // pengorder.value = user;
    acc_manager.value = selectedRows[0].Tgl_Apv_1?.split(" ")[0] ?? ""; //tglACCmanager[0];
    manager.value = selectedRows[0].Manager;
    acc_direktur.value = selectedRows[0].Tgl_Apv_2?.split(" ")[0] ?? "";
    tgl_manager.value = selectedRows[0].Tgl_TdStjMg?.split(" ")[0] ?? "";
    ket_manager.value = selectedRows[0].Ref_TdStjMg;
    tgl_direktur.value = selectedRows[0].Tgl_TdStjDir?.split(" ")[0] ?? "";
    ket_direktur.value = selectedRows[0].Ref_TdStjDir;
    tgl_teknik.value = selectedRows[0].Tgl_Tolak_Mng?.split(" ")[0] ?? "";
    ket_teknik.value = selectedRows[0].Ref_Tolak_Mng;
    userorder = selectedRows[0].User_Order;
    tglmaintenance = selectedRows[0].Tgl_Order;
    itemname = selectedRows[0].Nama_Brg;
    selectmesin = selectedRows[0].Mesin;
    kodebarangsimpan = selectedRows[0].Kd_Brg;
});
