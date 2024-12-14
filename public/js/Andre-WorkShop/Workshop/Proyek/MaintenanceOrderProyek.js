let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let table_data = $("#tableMaintenanceOrderProyek").DataTable();

let kddivisi = document.getElementById("kddivisi");
let pilih;
// let user = 4384;

let refresh = document.getElementById("refresh");
let isi = document.getElementById("isi");
let modetrans;
let MesinModal = document.getElementById("MesinModal");
let Tanggalmodal = document.getElementById("Tanggalmodal");
let namadivisimodal = document.getElementById("namadivisimodal");
let FormModal = document.getElementById("FormModal");
let methodForm = document.getElementById("methodForm");
let BuatModal = document.getElementById("BuatModal");
let PerbaikanModal = document.getElementById("PerbaikanModal");
let PengOrderModal = document.getElementById("PengOrderModal");
let iddivmodal = document.getElementById("iddivmodal");
let no_order = document.getElementById("no_order");
let jmlh1 = document.getElementById("jmlh1");
let jmlh2 = document.getElementById("jmlh2");
let keterangan_order = document.getElementById("keterangan_order");
let pengorder = document.getElementById("pengorder");
let acc_manager = document.getElementById("acc_manager");
let manager = document.getElementById("manager");
let acc_direktur = document.getElementById("acc_direktur");
let lblstatus = document.getElementById("lblstatus");
let tgl_manager = document.getElementById("tgl_manager");
let ket_manager = document.getElementById("ket_manager");
let tgl_direktur = document.getElementById("tgl_direktur");
let ket_direktur = document.getElementById("ket_direktur");
let tgl_teknik = document.getElementById("tgl_teknik");
let ket_teknik_tolak = document.getElementById("ket_teknik_tolak");
let ket_teknik_tunda = document.getElementById("ket_teknik_tunda");
var userorder;
let koreksi = document.getElementById("koreksi");
var tglordersimpan;
let NamaProyekModal = document.getElementById("NamaProyekModal");
var namasimpan;
let KeteranganModal = document.getElementById("KeteranganModal");
let Jumlah = document.getElementById("Jumlah");
let SatuanModal = document.getElementById("SatuanModal");
var selectmesin;
let hapus = document.getElementById("hapus");
let isFirstEnter = true;

//#region set warna

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
        if (data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");
        }
        if (data.Tgl_Pending !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("magenta-color");
        }
        if (
            data.Tgl_TdStjMg == null &&
            data.User_Apv_1 == null &&
            data.User_Apv_2 == null &&
            data.Tgl_Tolak_Mng == null &&
            data.Tgl_Pending == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});

//#endregion

//#region set up form

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
Tanggalmodal.value = formattedCurrentDate;
koreksi.disabled = true;
hapus.disabled = true;
//#endregion

//#region divisi di ubah
kddivisi.focus();
kddivisi.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (isFirstEnter) {
            // event.preventDefault(); // Mencegah aksi bawaan dari tombol Enter
            kddivisi.click();
            isFirstEnter = false;
        } else {
            isFirstEnter = true;
            const isConfirmed = confirm(`Tampilkan Semua Order??`);
            if (isConfirmed) {
                pilih = 1;
                // cleardata();
                // const table = $("#tableklik").DataTable();
                table_data.clear().draw();
                AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
            } else {
                console.log("masuk");
                pilih = 2;
                table_data.clear().draw();
                AllDataUser(
                    tgl_awal.value,
                    tgl_akhir.value,
                    user,
                    kddivisi.value
                );
            }
        }
    }
});
//#endregion

//#region alldata

function AllData(tglAwal, tglAkhir, idDivisi) {
    fetch(
        "/GetDataAllMaintenanceOrderProyek/" +
            tglAwal +
            "/" +
            tglAkhir +
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
            if (datas.length == 0) {
                console.log("masuk ke == 0");

                alert(
                    "Tidak ada Order, tgl " + tglAwal + " s/d tgl " + tglAkhir
                );
                return;
            } else {
                console.log(datas);
                table_data = $("#tableMaintenanceOrderProyek").DataTable({
                    destroy: true,
                    data: datas,
                    columns: [
                        { title: "No.Order", data: "Id_Order" },
                        { title: "Tgl.Order", data: "Tgl_Order" },
                        { title: "Nama Proyek", data: "Nama_Proyek" },
                        { title: "Status Order", data: "Status" },
                        { title: "Mesin", data: "Mesin" },
                    ],
                });
                table_data.draw();
                tableOnClick();
            }
        });
}

//#endregion

//#region tampil order
function AllDataUser(tglAwal, tglAkhir, idUser, idDivisi) {
    fetch(
        "/GatDataForUserOrderMaintenanceOrderKerja/" +
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
                const tglOrder = data.Tgl_Order;
                const [tanggal, waktu] = tglOrder.split(" ");
                data.Tgl_Order = tanggal;
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
                return;
            } else {
                table_data = $("#tableMaintenanceOrderProyek").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        { title: "No.Order", data: "Id_Order" },
                        { title: "Tgl.Order", data: "Tgl_Order" },
                        { title: "Nama Proyek", data: "Nama_Proyek" },
                        { title: "Status Order", data: "Status" },
                        { title: "Mesin", data: "Mesin" },
                    ],
                });
                table_data.draw();
                tableOnClick();
            }
        });
}
//#endregion

//#region refresh

refresh.addEventListener("click", function () {
    const isConfirmed = confirm(`Tampilkan Semua Order??`);
    no_order.value = "";
    jmlh1.value = "";
    jmlh2.value = "";
    keterangan_order.value = "";
    pengorder.value = "";
    acc_manager.value = "";
    manager.value = "";
    acc_direktur.value = "";
    lblstatus.textContent = "";
    tgl_manager.value = "";
    ket_manager.value = "";
    tgl_direktur.value = "";
    ket_direktur.value = "";
    tgl_teknik.value = "";
    ket_teknik_tolak.value = "";
    ket_teknik_tunda.value = "";
    koreksi.disabled = true;
    hapus.disabled = true;
    userorder = null;
    tglordersimpan = null;
    namasimpan = null;
    selectmesin = null;
    $("#tableMaintenanceOrderProyek tbody").off("click", "tr");
    if (isConfirmed) {
        pilih = 1;
        table_data.clear().draw();
        AllData(tgl_awal.value, tgl_akhir.value, kddivisi.value);
    } else {
        // console.log("masuk");
        pilih = 2;
        table_data.clear().draw();
        AllDataUser(tgl_awal.value, tgl_akhir.value, user, kddivisi.value);
    }
});

//#endregion

//#region isi on click

function isiklik() {
    if (kddivisi.value != "Pilih Divisi") {
        modetrans = 1;
        isi.setAttribute("data-toggle", "modal");
        isi.setAttribute("data-target", "#ModalForm");
        Mesin(kddivisi.value);

        PengOrderModal.value = user;
        iddivmodal.value = kddivisi.value;
        // console.log(
        //     kddivisi.options[kddivisi.selectedIndex].text.split("--")[1]
        // );
        namadivisimodal.textContent =
            kddivisi.options[kddivisi.selectedIndex].text.split("--")[1];
    } else {
        alert("Pilih Divisi Anda");
        kddivisi.focus();
    }
}
//#endregion

//#region mesin

function Mesin(idDivisi) {
    fetch("/GetMesinMaintenanceOrderProyek/" + idDivisi)
        .then((response) => response.json())
        .then((options) => {
            //mesin buat form baru
            console.log(options);

            MesinModal.innerHTML = "";
            //
            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih Mesin";
            MesinModal.appendChild(defaultOption);
            //
            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Nomer;
                option.innerText = entry.Mesin + "--" + entry.Nomer;
                MesinModal.appendChild(option);
            });
        });
}

//#endregion

//#region Proses on click

function ProsesKlik() {
    if (modetrans == 1) {
        if (BuatModal.checked == false && PerbaikanModal.checked == false) {
            alert("Pilih Order Kerja Utk 'Buat Baru' Atau 'Perbaikan'");
            return;
        } else {
            FormModal.submit();
        }
    }
    if (modetrans == 2) {
        methodForm.value = "PUT";
        FormModal.action = "/MaintenanceOrderProyek/" + no_order.value;
        FormModal.submit();
    }
}

//#endregion

//#region table on click

function tableOnClick() {
    $("#tableMaintenanceOrderProyek tbody").on("click", "tr", function () {
        let checkSelectedRows = $(
            "#tableMaintenanceOrderProyek tbody tr.selected"
        );

        if (checkSelectedRows.length > 0) {
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tableMaintenanceOrderProyek").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);
        fetch("/GetDataTableMaintenanceOrderProyek/" + selectedRows[0].Id_Order)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                no_order.value = datas[0].Id_Order;
                jmlh1.value = datas[0].Jml_Brg;
                jmlh2.value = datas[0].Nama_satuan;
                keterangan_order.value = datas[0].Ket_Order;
                pengorder.value = datas[0].NmUserOd;
                acc_manager.value = datas[0].Manager;
                manager.value = datas[0].Tgl_Apv_1;
                acc_direktur.value = datas[0].Tgl_Apv_2;
                lblstatus.textContent = datas[0].Status;
                tgl_manager.value = datas[0].Tgl_TdStjMg;
                ket_manager.value = datas[0].Ref_TdStjMg;
                tgl_direktur.value = datas[0].Tgl_TdStjDir;
                ket_direktur.value = datas[0].Ref_TdStjDir;
                tgl_teknik.value = datas[0].Tgl_Tolak_Mng;
                ket_teknik_tolak.value = datas[0].Ref_Tolak_Mng;
                ket_teknik_tunda.value = datas[0].Ref_Pending;
                userorder = selectedRows[0].User_Order;
                tglordersimpan = selectedRows[0].Tgl_Order;
                namasimpan = selectedRows[0].Nama_Proyek;
                selectmesin = selectedRows[0].Mesin;
                koreksi.disabled = false;
                hapus.disabled = false;
            });
    });
}

//#endregion

//#region koreksi

function klikkoreksi() {
    if (kddivisi.value != "Pilih Divisi") {
        if (tgl_teknik.value != "") {
            alert("Order Tidak Boleh Di-KOREKSI. Order ditolak.");
            return;
        } else if (acc_manager.value != "" || manager.value != "") {
            alert("Order Tidak Boleh Di-KOREKSI. Sudah di-ACC.");
            return;
        } else if (user != userorder) {
            // console.log(user, userorder);
            alert(
                "Anda Tidak Boleh Meng-KOREKSI Order Dari User " +
                    pengorder.value
            );
            return;
        } else {
            modetrans = 2;
            if (lblstatus.textContent == "BUAT BARU") {
                BuatModal.checked = true;
                PerbaikanModal.checked = false;
            }
            if (lblstatus.textContent == "PERBAIKAN") {
                BuatModal.checked = false;
                PerbaikanModal.checked = true;
            }
            koreksi.setAttribute("data-toggle", "modal");
            koreksi.setAttribute("data-target", "#ModalForm");
            namadivisimodal.textContent =
                kddivisi.options[kddivisi.selectedIndex].text.split("--")[1];
            // iddivisimodalbaru.value = Divisi.value;
            Tanggalmodal.value = tglordersimpan;
            NamaProyekModal.value = namasimpan;
            KeteranganModal.value = keterangan_order.value;
            Jumlah.value = jmlh1.value;
            PengOrderModal.value = user;
            SatuanModal.selectedIndex = 0;
            for (let i = 0; i < SatuanModal.length; i++) {
                // console.log(satuanJual.selectedIndex);
                SatuanModal.selectedIndex += 1;
                if (
                    SatuanModal.options[SatuanModal.selectedIndex].text ===
                    jmlh2.value.trim()
                ) {
                    break;
                }
            }
            MesinModal.selectedIndex = 0;
            //console.log(MesinModal.length);
            for (let i = 0; i < MesinModal.length; i++) {
                // console.log(satuanJual.selectedIndex);
                MesinModal.selectedIndex += 1;
                // console.log(MesinModal.option[MesinModal.selectedIndex].text.split("--"));
                if (
                    MesinModal.options[MesinModal.selectedIndex].text.split(
                        "--"
                    )[0] === selectmesin.trim()
                ) {
                    break;
                }
            }
        }
    } else {
        alert("Pilih Divisi Anda");
    }
}

//#endregion

//#region delete

hapus.addEventListener("click", function (event) {
    event.preventDefault();
    if (manager.value != "") {
        alert("Order Tidak Boleh Di-HAPUS. Sudah di-ACC");
    } else if (user != userorder) {
        alert("Anda Tidak Boleh Meng-HAPUS Order Dari User " + userorder);
    } else {
        const isConfirmed = confirm(`Ingin Menghapus Order ` + no_order.value);
        if (isConfirmed) {
            methodForm.value = "DELETE";
            //console.log("delete", no_order.value);
            FormModal.action = "/MaintenanceOrderProyek/" + no_order.value;
            FormModal.submit();
        }
    }
});

//#endregion

//#region uppercase

NamaProyekModal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        NamaProyekModal.value = NamaProyekModal.value.toUpperCase();
        KeteranganModal.focus();
    }
});

KeteranganModal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        KeteranganModal.value = KeteranganModal.value.toUpperCase();
        Jumlah.focus();
    }
});

Jumlah.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        SatuanModal.focus();
    }
});
// let isFirstEnterStatuanmodal = true;
// SatuanModal.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         if (isFirstEnterStatuanmodal) {
//             SatuanModal.click();
//             isFirstEnterStatuanmodal = false;
//             // console.log("gak masuk nih");
//         } else {
//             // console.log("masuk nih");
//             MesinModal.focus();
//             isFirstEnterStatuanmodal = true;
//         }
//     }
// });
// let isFirstEnterMesinModal = true;
// let ProsesModal = document.getElementById("ProsesModal");
// MesinModal.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         if (isFirstEnterMesinModal) {
//             MesinModal.click();
//             isFirstEnterMesinModal = false;
//         } else {
//             isFirstEnterMesinModal = true;
//             ProsesModal.focus();
//         }
//     }
// });

//#endregion
