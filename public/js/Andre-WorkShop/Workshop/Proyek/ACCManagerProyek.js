let table_data = $("#TableACCManagerProyek").DataTable();
let kddivisi = document.getElementById('kddivisi');
let refresh = document.getElementById('refresh');
let cek = false;
let UserACC = document.getElementById('UserACC');
// let user = 4384;
// UserACC.value = user;

let no_order = document.getElementById('no_order');
let jmlh1 = document.getElementById('jmlh1');
let jmlh2 = document.getElementById('jmlh2');
let keterangan_order = document.getElementById('keterangan_order');
let pengorder = document.getElementById('pengorder');
let acc_direktur = document.getElementById('acc_direktur');
let tgl_direktur = document.getElementById('tgl_direktur');
let ket_direktur = document.getElementById('ket_direktur');
let tgl_teknik = document.getElementById('tgl_teknik');
let ket_teknik_tolak = document.getElementById('ket_teknik_tolak');
let ket_teknik_tunda = document.getElementById('ket_teknik_tunda');
let arraycheckbox = [];
let red = false;
let ket = [];
let acc = document.getElementById('acc');
let batal_acc = document.getElementById('batal_acc');
let tdk_setuju = document.getElementById('tdk_setuju');
let radiobox = document.getElementById('radiobox');
let semuacentang = document.getElementById('semuacentang');
let KetTdkS = document.getElementById('KetTdkS');
let methodForm = document.getElementById('methodForm');
let formAccManagerProyek = document.getElementById('formAccManagerProyek');
let iduser = document.getElementById('iduser');
iduser.value = UserACC.value;
//#region Warna

table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        console.log(data.Tgl_TdStjMg == null, data.User_Apv_1 == null,data.User_Apv_2 == null,data.Tgl_Tolak_Mng == null);
        if (data.Tgl_TdStjMg !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("acs-empty-cell");
        }
         if (data.User_Apv_1 !== null && data.User_Apv_2 == "N") {
            $(this.node()).removeClass();
            $(this.node()).addClass("blue-color");

        } if (data.Tgl_TdStjDir !== null && data.User_Apv_1 !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("gray-color");
        }  if (data.User_Apv_2 == "Y" && data.Tgl_Tolak_Mng === null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("red-color");
        }  if (data.User_Apv_2 == "Y" && data.Tgl_Pending !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("Fuchsia-color");
        }
        if (data.User_Apv_2 == "N" && data.Tgl_Pending !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("Fuchsia-color");
        }
        if (data.User_Apv_2 == "Y" && data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");
        }
        if(data.Tgl_TdStjMg == null && data.User_Apv_1 == null && data.Tgl_Tolak_Mng == null && data.Tgl_Pending == null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});

//#endregion

//#region divisi di ubah

kddivisi.addEventListener("change", function () {
    table_data.clear().draw();
    AllData(kddivisi.value);
});

//#endregion

//#region all data

function AllData(idDivisi) {
    fetch("/GetDataAllACCManagerProyek/" + idDivisi)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0 ) {
                alert("Tidak ada Order Untuk Divisi "+ idDivisi);
                return;
            }
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                const [tanggal, waktu] = tglOrder.split(" ");

                data.Tgl_Order = tanggal;
                if (data.Tgl_TdStjMg != null) {
                    const tglmanager = data.Tgl_TdStjMg;
                    const [tanggal1, waktu1] = tglmanager.split(" ");
                    data.Tgl_TdStjMg = tanggal1;
                }
            });
            // console.log(datas); // Optional: Check the data in the console
            table_data = $("#TableACCManagerProyek").DataTable({
                destroy: true, // Destroy any existing DataTable before reinitializing
                data: datas,
                columns: [
                    {
                        title: "No.Order",
                        data: "Id_Order",
                        render: function (data) {
                            return `<input type="checkbox" name="ManagerCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    //{ title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                    { title: "Tgl.Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                    { title: "Nama Proyek", data: "Nama_Proyek" }, // Sesuaikan 'country' dengan properti kolom di data
                    { title: "Status Order", data: "Status" },
                    { title: "Mesin", data: "Mesin" },
                    {
                        title: "Tgl.tdk disetujui Manager",
                        data: "Tgl_TdStjMg",
                    },
                    {
                        title: "Ket.tdk disetujui Manager",
                        data: "Ref_TdStjMg",
                    },
                ],
            });
            table_data.draw();

        });
}

//#endregion

//#region table onclick

$("#TableACCManagerProyek tbody").off("click", "tr");
$("#TableACCManagerProyek tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#TableACCManagerProyek tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#TableACCManagerProyek").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);

    fetch("/GetDataTableACCManagerProyek/" + selectedRows[0].Id_Order)
    .then((response) => response.json())
    .then((datas) => {
        console.log(datas);
        no_order.value = datas[0].Id_Order;
        jmlh1.value = datas[0].Jml_Brg;
        jmlh2.value = datas[0].Nama_satuan;
        keterangan_order.value = datas[0].Ket_Order;
        pengorder.value = datas[0].NmUserOd;
        acc_direktur.value = datas[0].Tgl_Apv_2;
        tgl_direktur.value = datas[0].Tgl_TdStjDir;
        ket_direktur.value = datas[0].Ref_TdStjDir;
        ket_teknik_tolak.value = datas[0].Ref_Tolak_Mng;
        ket_teknik_tunda.value = datas[0].Ref_Pending;
    });
});

//#endregion

//#region refresh

refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(kddivisi.value);
});

//#endregion

//#region pilih semua

$("#pilihsemua").on("click", function () {
    // Get all the checkboxes within the DataTable
    const checkboxes = $(
        "input[name='ManagerCheckbox']",
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

//#region Proses button

function klikproses() {
    //console.log(table_data.rows().count());
    if (table_data.rows().count() != 0) {
        $("input[name='ManagerCheckbox']").each(function () {
            // Ambil nilai 'value' dan status 'checked' dari checkbox
            let value = $(this).val();
            let isChecked = $(this).prop("checked");
            let closestTd = $(this).closest("tr");

            // Lakukan sesuatu berdasarkan status 'checked'
            if (acc.checked == true) {
                if (
                    isChecked &&
                    (closestTd.hasClass("acs-empty-cell") ||
                        closestTd.hasClass("black-color"))
                ) {
                    arraycheckbox.push(value);
                }
            } else if (batal_acc.checked == true) {
                if (
                    isChecked &&
                    (closestTd.hasClass("blue-color") ||
                        closestTd.hasClass("gray-color"))
                ) {
                    arraycheckbox.push(value);
                } else if (isChecked && closestTd.hasClass("red-color")) {
                    alert(
                        "Nomer Order " +
                            value +
                            ", tidak bisa diBatalkan, sdh diACC Direktur"
                    );
                    red = true;
                    return;
                } else if (isChecked && closestTd.hasClass("green-color")) {
                    alert(
                        "Nomer Order " +
                            value +
                            ", tidak bisa diBatalkan. Order ditolak oleh Div. Teknik."
                    );
                    red = true;
                    return;
                }
            } else if (tdk_setuju.checked == true) {
                if (
                    isChecked &&
                    (closestTd.hasClass("black-color") ||
                        closestTd.hasClass("gray-color"))
                ) {
                    let Ket_batal = prompt(
                        "Alasan tdk disetujui Order " + value + " :"
                    );
                    if (Ket_batal !== null) {
                        arraycheckbox.push(value);
                        ket.push(Ket_batal);
                    }
                } else if (isChecked && closestTd.hasClass("red-color")) {
                    alert(
                        "Nomer Order " +
                            value +
                            ", tidak bisa diproses, sdh diACC Direktur"
                    );
                    red = true;
                    return;
                } else if (isChecked && closestTd.hasClass("green-color")) {
                    alert(
                        "Nomer Order " +
                            value +
                            ", tidak bisa diproses. Order ditolak oleh Div. Teknik."
                    );
                    red = true;
                    return;
                } else if (isChecked && closestTd.hasClass("blue-color")) {
                    alert(
                        "Nomer Order " +
                            value +
                            ", tidak bisa diproses. Order sdh diACC, batalkan dulu ACC-nya."
                    );
                    red = true;
                    return;
                }
            }
        });
        console.log(arraycheckbox.length);
        if (arraycheckbox.length > 0) {
            //console.log("sudah di check");
            if (kddivisi.value == "KRR") {
                if (user != "tjahyo") {
                    alert("Anda Tidak BerHAK memProses.");
                    return;
                }
                else{
                    alert("Lanjutkan ke ACC sebagai Direktur..");
                    window.location.href = "ACCDirekturProyek";
                }
            } else {
                //console.log("setelah");
                //console.log(closestTd.hasClass("acs-empty-cell"));
                if (acc.checked == true) {
                    //console.log("berhasil");
                    var arrayString = arraycheckbox.join(",");
                    //console.log(arrayString);
                    radiobox.value = "acc";
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManagerProyek.action =
                        "/ACCManagerProyek/" + no_order.value;
                    formAccManagerProyek.submit();
                } else if (batal_acc.checked == true) {
                    //console.log("berhasil");
                    var arrayString = arraycheckbox.join(",");
                    //console.log(arrayString);
                    radiobox.value = "batal_acc";
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManagerProyek.action =
                        "/ACCManagerProyek/" + no_order.value;
                    formAccManagerProyek.submit();
                } else if (tdk_setuju.checked == true) {
                    var arrayString = arraycheckbox.join(",");
                    var arrayString1 = ket.join(",");
                    //console.log(arrayString);
                    radiobox.value = "tidak_setuju";
                    KetTdkS.value = arrayString1;
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManagerProyek.action =
                        "/ACCManagerProyek/" + no_order.value;
                    formAccManagerProyek.submit();
                }
            }
            // console.log(isChecked);
            // console.log(`Checkbox dengan nilai ${value} tercentang.`);
        }
        if (arraycheckbox.length == 0 && red == false) {
            alert("Pilih Nomer Order Yang Akan DiPROSES.");
        }
    }
}

//#endregion
