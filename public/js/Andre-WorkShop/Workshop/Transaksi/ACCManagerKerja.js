let table_data = $("#ACCManagerKerjatable").DataTable();
let divisi = document.getElementById('kddivisi');
let idorder;
let user = 4384;
let UserACC = document.getElementById('UserACC');
UserACC.value = user;

let no_order = document.getElementById('no_order');
let Kode_Barang = document.getElementById('Kode_Barang');
let Nomor_Gambar = document.getElementById('Nomor_Gambar');
let jmlh1 = document.getElementById('jmlh1');
let jmlh2 = document.getElementById('jmlh2');
let keterangan_order = document.getElementById('keterangan_order');
let pengorder = document.getElementById('pengorder');
let acc_direktur = document.getElementById('acc_direktur');
let tgl_direktur  = document.getElementById('tgl_direktur');
let ket_direktur = document.getElementById('ket_direktur');
let tgl_teknik = document.getElementById('tgl_teknik');
let ket_teknik = document.getElementById('ket_teknik');
let tunda_teknik = document.getElementById('tunda_teknik');
let btnrefresh = document.getElementById('btnrefresh');
let cek = false;
let primer = document.getElementById('primer');
let sekunder = document.getElementById('sekunder');
let tertier = document.getElementById('tertier');
let arraycheckbox = [];
let ket = [];
let red = false;
let radiobox = document.getElementById('radiobox');
let semuacentang = document.getElementById('semuacentang');
let KetTdkS = document.getElementById('KetTdkS');
let formAccManagerkerja = document.getElementById('formAccManagerkerja');
let methodForm = document.getElementById('methodForm');
let acc = document.getElementById('acc');
let batal_acc = document.getElementById('batal_acc');
let tdk_setuju = document.getElementById('tdk_setuju');
//#region warna
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

//#region on divisi
divisi.addEventListener("change", function () {
    //pilih = 1;
    //cleardata();
    table_data.clear().draw();
    AllData(divisi.value);
});

//#endregion

//#region get all data

function AllData(idDivisi) {
    fetch("/getalldataACCManagerKerja/" + idDivisi)
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
        table_data = $("#ACCManagerKerjatable").DataTable({
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
                { title: "Tgl. Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                { title: "Status Order", data: "Status" },
                { title: "No. Gambar", data: "No_Gbr" },
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

//#endregion

//#region load data

function loaddata(id){
    fetch("/LoaddataACCManagerKerja/" + id)
    .then((response) => response.json())
    .then((datas) => {
        datas.forEach((data) => {
            if (data.Tgl_Apv_2 !== null ) {
                const tglOrder = data.Tgl_Apv_2;
                const [tanggal, waktu] = tglOrder.split(" ");
                data.Tgl_Apv_2 = tanggal;
            }
        });
        console.log(datas);
        no_order.value = datas[0].Id_Order;
        Kode_Barang.value = datas[0].Kd_Brg;
        Nomor_Gambar.value = datas[0].No_Gbr;
        jmlh1.value = datas[0].Jml_Brg;
        jmlh2.value = datas[0].Nama_satuan;
        keterangan_order.value = datas[0].Ket_Order;
        pengorder.value = datas[0].NmUserOd;
        acc_direktur.value = datas[0].Tgl_Apv_2;
        tgl_direktur.value = datas[0].Tgl_TdStjDir;
        ket_direktur.value = datas[0].Ref_TdStjDir;
        tgl_teknik.value = datas[0].Tgl_Tolak_Mng;
        ket_teknik.value = datas[0].Ref_Tolak_Mng;
        tunda_teknik.value = datas[0].Ref_Pending;
        if (Kode_Barang.value !== "" || Kode_Barang.value !== null) {
            callsaldo(Kode_Barang.value)
        }
    });
}

//#endregion

//#region table on click

$("#ACCManagerKerjatable tbody").off("click", "tr");
$("#ACCManagerKerjatable tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#ACCManagerKerjatable tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#ACCManagerKerjatable").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    idorder = selectedRows[0].Id_Order;
    console.log(idorder);
    loaddata(idorder);
});

//#endregion

//#region refresh
btnrefresh.addEventListener("click", function (event) {
    event.preventDefault();
    AllData(divisi.value);
});
//#endregion

//#region piih semua
$("#btnpilihsemua").on("click", function () {
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

//#region saldo primer dkk
function callsaldo(kode) {
    fetch("/getsaldoACCManagerKerja/" + kode)
    .then((response) => response.json())
    .then((datas) => {
        console.log(datas);
        primer.value = datas[0].SaldoPrimer + " " + datas[0].SPrimer;
        sekunder.value =
            datas[0].SaldoSekunder + " " + datas[0].SSekunder;
        tertier.value =
            datas[0].SaldoTritier + " " + datas[0].STritier;
    });
}
//#endregion

//#region button proses
function klikproses() {
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
                } else if (isChecked && (closestTd.hasClass("red-color")||closestTd.hasClass("Fuchsia-color") )) {
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
                    ket.push(Ket_batal);
                    arraycheckbox.push(value);
                } else if (isChecked && (closestTd.hasClass("red-color")||closestTd.hasClass("Fuchsia-color"))) {
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
                    window.location.href = "ACCDirekturKerja";
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
                    formAccManagerkerja.action =
                        "/ACCManagerKerja/" + no_order.value;
                    formAccManagerkerja.submit();
                } else if (batal_acc.checked == true) {
                    //console.log("berhasil");
                    var arrayString = arraycheckbox.join(",");
                    //console.log(arrayString);
                    radiobox.value = "batal_acc";
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManagerkerja.action =
                        "/ACCManagerKerja/" + no_order.value;
                    formAccManagerkerja.submit();
                } else if (tdk_setuju.checked == true) {
                    var arrayString = arraycheckbox.join(",");
                    var arrayString1 = ket.join(",");
                    //console.log(arrayString);
                    radiobox.value = "tidak_setuju";
                    KetTdkS.value = arrayString1;
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccManagerkerja.action =
                        "/ACCManagerKerja/" + no_order.value;
                    formAccManagerkerja.submit();
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
