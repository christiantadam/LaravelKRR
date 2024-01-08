//#region variabel
let table_data = $("#tableDirektur").DataTable();
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let ok = document.getElementById("ok");
let refresh = document.getElementById("refresh");
let cek = false;

//checkbox
let acc = document.getElementById("acc");
let batal_acc = document.getElementById("batal_acc");
let tdk_setuju = document.getElementById("tdk_setuju");

let Ket_batal;
let ket = [];
let KetTdkS = document.getElementById("KetTdkS");
let arraycheckbox = [];
let red = false;
let semuacentang = document.getElementById("semuacentang");
let divisicek;
let idorder = document.getElementById("idorder");

let methodForm = document.getElementById("methodForm");
let formAccDirektur = document.getElementById("formAccDirektur");
let radiobox = document.getElementById('radiobox');
//#endregion

//#region warna isi tabel
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
        if (data.Tgl_TdStjDir !== null) {
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
            data.Tgl_TdStjDir == null &&
            data.User_Apv_2 == "N" &&
            data.Tgl_Tolak_Mng == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});
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

//#endregion

//#region ambil semua data
function AllData(tglAwal, tglAkhir) {
    fetch("/getalldataDirektur/" + tglAwal + "/" + tglAkhir)
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
                table_data = $("#tableDirektur").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "No. Order",
                            data: "Id_Order",
                            render: function (data) {
                                return `<input type="checkbox" name="DirekturCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tgl. Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                        { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                        { title: "Kd. Brg", data: "Kd_Brg" },
                        {
                            title: "Jumlah",
                            data: "Nama_satuan",
                            render: function (data) {
                                return `1 ${data}`;
                            }
                        },
                        { title: "Status Order", data: "Status" },
                        { title: "Divisi", data: "NamaDivisi" },
                        { title: "Mesin", data: "Mesin" },
                        { title: "Keterangan Order", data: "Ket_Order" },
                        { title: "Peng-Order", data: "NmUserOd" },
                        { title: "Ket. Ditolak", data: "Ref_Tolak_Mng" },
                        { title: "Ket. tdk disetujui", data: "Ref_TdStjDir" },
                    ],
                });
                table_data.draw();
            }
        });
}

//#endregion

//#region ok on click

ok.addEventListener("click", function () {
    AllData(tgl_awal.value, tgl_akhir.value);
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
        "input[name='DirekturCheckbox']",
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

$("#tableDirektur tbody").on("click", "tr", function () {
    var data = table_data.row(this).data(); // Mendapatkan data dari baris yang diklik
    divisicek = data.NamaDivisi; // Mengambil data dari kolom "Divisi"

    // Lakukan apa pun yang Anda ingin lakukan dengan data divisi
    console.log("Divisi:", divisicek);
});

function klikproses() {
    if (table_data.rows().count() != 0) {
        $("input[name='DirekturCheckbox']").each(function () {
            // Ambil nilai 'value' dan status 'checked' dari checkbox
            let value = $(this).val();
            let isChecked = $(this).prop("checked");
            let closestTd = $(this).closest("tr");

            // Lakukan sesuatu berdasarkan status 'checked'
            if (acc.checked == true) {
                if (
                    isChecked &&
                    (closestTd.hasClass("gray-color") ||
                        closestTd.hasClass("black-color"))
                ) {
                    arraycheckbox.push(value);
                }
                else if (isChecked && closestTd.hasClass("green-color")) {
                    alert(
                        "Nomer Order " +
                            value +
                            ", tidak bisa diproses. Order ditolak oleh Div. Teknik."
                    );
                    red = true;
                    return;
                }

            } else if (batal_acc.checked == true) {
                if (isChecked && closestTd.hasClass("red-color")) {
                    arraycheckbox.push(value);
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
                if (isChecked && closestTd.hasClass("black-color")) {
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
                            ",  tidak bisa diproses. Sdh diACC, batalkan dulu ACC-nya."
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
                }
            }
        });
        if (arraycheckbox.length > 0) {
            if (acc.checked == true) {
                //console.log("berhasil");
                var arrayString = arraycheckbox.join(",");
                //console.log(arrayString);
                radiobox.value = "acc";
                semuacentang.value = arrayString;
                methodForm.value = "PUT";
                formAccDirektur.action = "/ACCDirekturGambar/" + semuacentang.value;
                formAccDirektur.submit();
            } else if (batal_acc.checked == true) {
                if (divisicek == "KENCANA") {
                    alert("Lanjutkan ke Batal ACC sebagai Manager..");
                    window.location.href = "ACCManagerGambar";
                    return;
                }
                else{
                    var arrayString = arraycheckbox.join(",");
                    //console.log(arrayString);

                    radiobox.value = "batal_acc";
                    semuacentang.value = arrayString;
                    methodForm.value = "PUT";
                    formAccDirektur.action = "/ACCDirekturGambar/" + semuacentang.value;
                    formAccDirektur.submit();
                }
                //console.log("berhasil");

            } else if (tdk_setuju.checked == true) {

                var arrayString = arraycheckbox.join(",");
                var arrayString1 = ket.join(",");
                //console.log(arrayString);
                radiobox.value = "tidak_setuju";
                KetTdkS.value = arrayString1;
                semuacentang.value = arrayString;
                methodForm.value = "PUT";
                formAccDirektur.action = "/ACCDirekturGambar/" + semuacentang.value;
                formAccDirektur.submit();
            }
        }
    }
}

//#endregion
