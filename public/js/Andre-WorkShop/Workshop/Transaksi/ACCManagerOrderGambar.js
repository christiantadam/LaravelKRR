//#region variabel
let divisi = document.getElementById("kddivisi");
let table_data = $("#table_manager").DataTable();
// let user = 4384;
//data di kanan
let userinput = document.getElementById("userinput");
let no_order = document.getElementById("no_order");
let no_gambar_rev = document.getElementById("no_gambar_rev");
let jmlh2 = document.getElementById("jmlh2");
let keterangan_order = document.getElementById("keterangan_order");
let pengorder = document.getElementById("pengorder");
let acc_direktur = document.getElementById("acc_direktur");
let tgl_direktur = document.getElementById("tgl_direktur");
let ket_direktur = document.getElementById("ket_direktur");
let tgl_teknik = document.getElementById("tgl_teknik");
let ket_teknik = document.getElementById("ket_teknik");
let acc = document.getElementById("acc");
let iduser = document.getElementById("iduser");
iduser.value = user;
let semuacentang = document.getElementById("semuacentang");
let arraycheckbox = [];
let batal_acc = document.getElementById("batal_acc");
let radiobox = document.getElementById("radiobox");
let tdk_setuju = document.getElementById("tdk_setuju");
let Ket_batal;
let ket = [];
let KetTdkS = document.getElementById("KetTdkS");
//button
let refresh = document.getElementById("refresh");

//buat if check
let cek = false;
let red = false;
//form
let methodForm = document.getElementById("methodForm");
let formAccManager = document.getElementById("formAccManager");

//#endregion

userinput.value = user;

//#region warna isi tabel
//Css ACCManagerGambar
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
        }  if (data.User_Apv_2 == "Y" && data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");

        } if(data.Tgl_TdStjMg == null && data.User_Apv_1 == null && data.Tgl_Tolak_Mng == null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});
//#endregion

//#region get all data into table
function AllData(idDivisi) {
    fetch("/getalldatamanager/" + idDivisi)
        .then((response) => response.json())
        .then((datas) => {
            //console.log(datas);
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
            console.log(datas); // Optional: Check the data in the console
            table_data = $("#table_manager").DataTable({
                destroy: true, // Destroy any existing DataTable before reinitializing
                data: datas,
                columns: [
                    {
                        title: "No. Order",
                        data: "Id_Order",
                        render: function (data) {
                            return `<input type="checkbox" name="ManagerCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    //{ title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                    { title: "Tgl. Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                    { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                    { title: "Status Order", data: "Status" },
                    { title: "No_Gbr_Revisi", data: "No_Gbr_Rev" },
                    { title: "Mesin", data: "Mesin" },
                    {
                        title: "Tgl. tdk disetujui Manager",
                        data: "Tgl_TdStjMg",
                    },
                    {
                        title: "Ket. tdk disetujui Manager",
                        data: "Ref_TdStjMg",
                    },
                ],
            });
            table_data.draw();
            if (datas.length == 0 ) {
                alert("Tidak ada Order Untuk Divisi "+ divisi.value);
            }
        });
}
divisi.addEventListener("change", function () {
    //pilih = 1;
    //cleardata();
    table_data.clear().draw();
    AllData(divisi.value);
});
//#endregion

//#region on click table
$("#table_manager tbody").off("click", "tr");
$("#table_manager tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#table_manager tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#table_manager").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    // let tglteknikT = selectedRows[0].Tgl_Tolak_Mng.split(" ");

    no_order.value = selectedRows[0].Id_Order;
    no_gambar_rev.value = selectedRows[0].No_Gbr_Rev;
    //jmlh1.value = selectedRows[0].
    jmlh2.value = selectedRows[0].Nama_satuan;
    keterangan_order.value = selectedRows[0].Ket_Order;
    pengorder.value = selectedRows[0].NmUserOd;
    acc_direktur.value = selectedRows[0].Tgl_Apv_2?.split(" ")[0] ?? "";
    tgl_direktur.value = selectedRows[0].Tgl_TdStjDir?.split(" ")[0] ?? "";
    ket_direktur.value = selectedRows[0].Ref_TdStjDir;
    tgl_teknik.value = selectedRows[0].Tgl_Tolak_Mng?.split(" ")[0] ?? "";
    ket_teknik.value = selectedRows[0].Ref_Tolak_Mng;
});

//#endregion

//#region refresh

refresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(divisi.value);
});
//#endregion

//#region button pilih semua
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

//#region button proses
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
                    Ket_batal = prompt(
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
            if (divisi.value == "KRR") {
                if (user != "tjahyo") {
                    alert("Anda Tidak BerHAK memProses.");
                    return;
                }
                else{
                    alert("Lanjutkan ke ACC sebagai Direktur..");
                    window.location.href = "ACCDirekturGambar";
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
                    formAccManager.action =
                        "/ACCManagerGambar/" + no_order.value;
                    formAccManager.submit();
                } else if (batal_acc.checked == true) {
                    //console.log("berhasil");
                    var arrayString = arraycheckbox.join(",");
                    //console.log(arrayString);
                    radiobox.value = "batal_acc";
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManager.action =
                        "/ACCManagerGambar/" + no_order.value;
                    formAccManager.submit();
                } else if (tdk_setuju.checked == true) {
                    var arrayString = arraycheckbox.join(",");
                    var arrayString1 = ket.join(",");
                    //console.log(arrayString);
                    radiobox.value = "tidak_setuju";
                    KetTdkS.value = arrayString1;
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManager.action =
                        "/ACCManagerGambar/" + no_order.value;
                    formAccManager.submit();
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
