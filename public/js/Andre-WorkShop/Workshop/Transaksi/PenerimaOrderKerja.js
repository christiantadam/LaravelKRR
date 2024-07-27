let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let table_data = $("#tablePenerimaOrderKerja").DataTable();
let refresh = document.getElementById("refresh");
let cek = false;
let iduser = document.getElementById("iduser");
// let user = 4384;
iduser.value = user;
var panjangdata;
let arraycheckbox = [];

let acc_order = document.getElementById("acc_order");
let batal_acc = document.getElementById("batal_acc");
let tunda = document.getElementById("tunda");
let order_tolak = document.getElementById("order_tolak");

let ket = [];
let radiobox = document.getElementById("radiobox");
let semuacentang = document.getElementById("semuacentang");
let formPemerimaOrderKerja = document.getElementById("formPemerimaOrderKerja");
let methodForm = document.getElementById("methodForm");
let KetTdkS = document.getElementById("KetTdkS");
let openmodaltunda = false;
let btnproses = document.getElementById("btnproses");
let prosesmodaltunda = document.getElementById("prosesmodaltunda");
let FormTundaModal = document.getElementById("FormTundaModal");
let methodFormModalTunda = document.getElementById("methodFormModalTunda");
let btnkoreksi = document.getElementById("btnkoreksi");
let order_kerja = document.getElementById("order_kerja");
let order_selesai = document.getElementById("order_selesai");
let order_batal = document.getElementById("order_batal");
var trselect;

let ModalKoreksi = document.getElementById("ModalKoreksi");
let FormKoreksiModal = document.getElementById("FormKoreksiModal");
let tglOrder = document.getElementById("tglOrder");
let NoOrder = document.getElementById("NoOrder");
let NoGambar = document.getElementById("NoGambar");
let KdBarang = document.getElementById("KdBarang");
let Divisi = document.getElementById("Divisi");
let NamaBarang = document.getElementById("NamaBarang");
let KeteranganOrder = document.getElementById("KeteranganOrder");
let JumlahOrder = document.getElementById("JumlahOrder");
let JumlahOrderSelesai = document.getElementById("JumlahOrderSelesai");
let TanggalStart = document.getElementById("TanggalStart");
let TanggalFinish = document.getElementById("TanggalFinish");
let Usermodalkoreksi = document.getElementById("Usermodalkoreksi");
let LblNamaUser = document.getElementById("LblNamaUser");
let LabelStatus = document.getElementById("LabelStatus");
var index;
let Tsts = document.getElementById("Tsts");
let no_orderkoreksi = document.getElementById("no_orderkoreksi");
let ketbatal = document.getElementById("ketbatal");
let methodFormModalKoreksi = document.getElementById("methodFormModalKoreksi");

let primermodal = document.getElementById("primermodal");
let sekundermodal = document.getElementById("sekundermodal");
let tertiermodal = document.getElementById("tertiermodal");
let primer = document.getElementById("primer");
let sekunder = document.getElementById("sekunder");
let tertier = document.getElementById("tertier");

let idorderModalTunda = document.getElementById("idorderModalTunda");
let pembeda = document.getElementById("pembeda");

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
TanggalStart.value = formattedCurrentDate;
TanggalFinish.value = formattedCurrentDate;
//#endregion

//#region tgl2 di klik

tgl_akhir.addEventListener("keypress", function (event) {
    // Mengecek apakah tombol yang ditekan adalah tombol 'Enter'
    if (event.key === "Enter") {
        // Tambahkan kode yang ingin Anda jalankan saat tombol 'Enter' ditekan di sini
        AllData(tgl_awal.value, tgl_akhir.value);
        //console.log('Tombol Enter ditekan!');
    }
});

//#endregion

//#region alldata

function AllData(tglAwal, tglAkhir) {
    fetch("/getalldataPenerimaOrderKerja/" + tglAwal + "/" + tglAkhir)
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
                table_data = $("#tablePenerimaOrderKerja").DataTable({
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
                        { title: "Kd.Barang", data: "Kd_Brg" },
                        { title: "No.Gambar", data: "No_Gbr" },
                        {
                            title: "Jumlah",
                            data: function (row) {
                                return `${row.Jml_Brg} ${row.Nama_satuan}`;
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

//#region set warna

table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        if (data.Acc_Mng !== null && data.User_Rcv == null) {
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
        if (data.Tgl_Pending !== null) {
            if (data.Acc_Mng !== null && data.User_Rcv === null) {
                $(this.node()).removeClass();
                $(this.node()).addClass("red-color");
            } else if (
                data.Acc_Mng !== null &&
                data.User_Rcv !== null &&
                data.Tgl_Finish == null
            ) {
                $(this.node()).removeClass();
                $(this.node()).addClass("blue-color");
            } else {
                $(this.node()).removeClass();
                $(this.node()).addClass("Magenta-color");
            }
        }
        if (
            data.Acc_Mng == null &&
            data.User_Rcv == null &&
            data.Tgl_Finish == null &&
            data.Tgl_Tolak_Mng == null &&
            data.Tgl_Pending == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});

//#endregion

//#region pindah row table

// let table1 = $("#" + tableId).DataTable();

// table1.clear().rows.add(listData).draw();
table_data.on("blur", function () {
    removeNavigation_DataTable([table_data]);
});

const tableContainer = table_data.table().container();
const elements = tableContainer.querySelectorAll(".odd, .even");
elements.forEach((ele, i) => {
    ele.addEventListener("click", () => {
        removeNavigation_DataTable([table_data]);
        // rowFun(i, table1.row(i).data());
        arrowNavigation_DataTable(table_data, i, (index, data) => {
            rowFun(index, data, true);
        });
    });
});

function arrowNavigation_DataTable(d_table, s_index, e_handler = null) {
    /**
     * d_table, Objek DataTable yang akan digunakan.
     * s_index, Index row yang terpilih; "remove" untuk menghapus fungsi navigasi.
     * e_handler, Fungsi yang akan dijalankan terhadap row yang terpilih.
     */

    const tableContainer = d_table.table().container();
    let selectedRow = s_index == "remove" ? 0 : s_index;
    let elements = tableContainer.querySelectorAll(".odd, .even");

    // Penanganan untuk beberapa datatables di halaman yang sama
    if (s_index == "remove") {
        $(document).off("keydown");
        elements.forEach((ele) => {
            ele.classList.remove("selected");
            ele.onclick = null;
        });

        return;
    } else elements[selectedRow].classList.add("selected");

    // Implementasi navigasi arrow keys & home / end
    $(document).on("keydown", (e) => {
        if (e.key === "ArrowDown" && selectedRow < elements.length - 1) {
            elements[selectedRow].classList.remove("selected");
            selectedRow += 1;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "ArrowUp" && selectedRow > 0) {
            elements[selectedRow].classList.remove("selected");
            selectedRow -= 1;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "Home") {
            elements[selectedRow].classList.remove("selected");
            selectedRow = 0;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "End") {
            elements[selectedRow].classList.remove("selected");
            selectedRow = elements.length - 1;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "Enter") {
            let row_index = selectedRow;
            let row_data = d_table.row(selectedRow).data();
            if (e_handler != null) e_handler(row_index, row_data);
        }
    });
}

//#endregion

//#region klik proses

function klikproses() {
    //console.log(table_data.rows().count());
    if (table_data.rows().count() != 0) {
        fetch("/cekuserPenerimaOrderKerja/" + iduser.value)
            .then((response) => response.json())
            .then((datas) => {
                // console.log(datas);
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
                    if (
                        isChecked &&
                        (closestTd.hasClass("black-color") ||
                            closestTd.hasClass("Magenta-color"))
                    ) {
                        arraycheckbox.push(value);
                    }
                } else if (batal_acc.checked == true) {
                    if (isChecked && closestTd.hasClass("red-color")) {
                        arraycheckbox.push(value);
                    }
                } else if (order_tolak.checked == true) {
                    if (
                        isChecked &&
                        (closestTd.hasClass("black-color") ||
                            closestTd.hasClass("Magenta-color"))
                    ) {
                        Ket_tolak = prompt(
                            "Alasan Ditolak Order" + value + " :"
                        );
                        ket.push(Ket_tolak);
                        arraycheckbox.push(value);
                    }
                } else if (tunda.checked == true) {
                    // console.log("tunda " + tunda.checked);
                    if (isChecked && closestTd.hasClass("black-color")) {
                        // console.log("masuk");
                        openmodaltunda = true;
                        arraycheckbox.push(value);
                        console.log(openmodaltunda);
                    }
                }
            });
            //console.log(acc_order.value , batal_acc.value , order_tolak.value);
            if (
                acc_order.checked == false &&
                batal_acc.checked == false &&
                order_tolak.checked == false &&
                tunda.checked == false
            ) {
                //console.log("masuk");
                alert(
                    "Pilih 'Order Diterima', 'Order Dibatalkan', 'Order Ditolak', atau 'Pending'"
                );
            } else {
                // console.log("panjang" + arraycheckbox.length);
                // console.log("openmodal" + openmodaltunda);
                if (arraycheckbox.length > 0 || openmodaltunda == true) {
                    if (acc_order.checked == true) {
                        var arrayString = arraycheckbox.join(",");
                        radiobox.value = "acc";
                        semuacentang.value = arrayString;
                        methodForm.value = "PUT";
                        formPemerimaOrderKerja.action =
                            "/PenerimaOrderKerja/" + semuacentang.value;
                        formPemerimaOrderKerja.submit();
                    } else if (batal_acc.checked == true) {
                        var arrayString = arraycheckbox.join(",");
                        radiobox.value = "batal_acc";
                        semuacentang.value = arrayString;
                        methodForm.value = "PUT";
                        formPemerimaOrderKerja.action =
                            "/PenerimaOrderKerja/" + semuacentang.value;
                        formPemerimaOrderKerja.submit();
                    } else if (order_tolak.checked == true) {
                        var arrayString = arraycheckbox.join(",");
                        var arrayString1 = ket.join(",");
                        radiobox.value = "tolak_setuju";
                        KetTdkS.value = arrayString1;
                        semuacentang.value = arrayString;
                        methodForm.value = "PUT";
                        formPemerimaOrderKerja.action =
                            "/PenerimaOrderKerja/" + semuacentang.value;
                        formPemerimaOrderKerja.submit();
                    } else if (tunda.checked == true) {
                        //open modal
                        var arrayString = arraycheckbox.join(",");
                        idorderModalTunda.value = arrayString;
                        //console.log(arrayString);
                        //console.log(idorderModalTunda.value);
                        btnproses.setAttribute("data-toggle", "modal");
                        btnproses.setAttribute("data-target", "#modaltunda");
                    }
                }
                if (openmodaltunda == false) {
                    if (arraycheckbox.length == 0) {
                        alert("Pilih Nomer Order Yang Akan DiPROSES.");
                    }
                }
            }
        }
    }
}

//#endregion

//#region proses modal tunda

prosesmodaltunda.addEventListener("click", function (event) {
    event.preventDefault();
    var arrayString = arraycheckbox.join(",");
});

//#endregion

//#region koreksi di klik
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
        var arrayindex = [];
        var no_order;
        var trselect;
        var index;

        $("input[name='penerimaCheckbox']:checked").each(function () {
            var tr = $(this).closest('tr')[0];
            var row = table_data.row(tr);

            no_order = this.value;
            index = row.index();
            trselect = tr;
            arrayindex.push(index);

            console.log("Row Index:", index);
            console.log("Row Node:", tr);
            console.log("Order Value:", no_order);
            console.log("Array Indexes:", arrayindex);
        });

        // $("input[name='penerimaCheckbox']:checked").each(function () {
        // let rowIndex = $(this).closest("tr").index();
        // let closestTr = $(this).closest("tr");
        // console.log(rowIndex);
        // no_order = this.value;
        // trselect = closestTr;
        // index = rowIndex;
        // arrayindex.push(index);
        // console.log(trselect);
        // let value = this.value;
        // console.log(rowIndexArray);
        // });

        // $('input[name="penerimaCheckbox"]:checked').each(function() {
        //     var rowIndex = $(this).closest('tr').index();
        //     var tr = window.table.row(rowIndex).node();
        //     no_order = this.value;
        //     index = rowIndex;
        //     arrayindex.push(index);

        //     console.log('Row Index:', rowIndex);
        //     console.log('Row Node:', tr);
        //     console.log('Order Value:', no_order);
        //     console.log('Array Indexes:', arrayindex);
        // });

        if (arrayindex.length === 0 || arrayindex.length > 1) {
            alert("Pilih 1 Data Untuk DiPROSES");
            return;
        } else {
            if (trselect && $(trselect).hasClass("red-color") && order_batal.checked == true) {
                alert("Proses Order Untuk Dikerjakan Dulu Atau Batal ACC");
                return;
            }
            if (trselect && $(trselect).hasClass("black-color")) {
                alert("Proses Order Untuk Diterima Dulu, baru Koreksi");
                return;
            }
            if (
                trselect && $(trselect).hasClass("red-color") &&
                order_selesai.checked == true
            ) {
                alert("Proses Order Untuk Dikerjakan Dulu");
                return;
            }
            if (trselect && $(trselect).hasClass("Fuchsia-color")) {
                alert("Order Gambar Finished");
                return;
            } else if (
                order_kerja.checked == true ||
                order_selesai.checked == true
            ) {
            } else {
                btnkoreksi.setAttribute("data-toggle", "");
                btnkoreksi.setAttribute("data-target", "");
            }
            if (
                trselect && $(trselect).hasClass("red-color") ||
                (trselect && $(trselect).hasClass("blue-color") && order_kerja.checked == true)
            ) {
                fetch("/namauserPenerimaOrderKerja/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        console.log(datas[0]);
                        LblNamaUser.value = datas[0].NamaUser;
                    });
                // TanggalStart.focus();
                JumlahOrderSelesai.disabled = true;
                TanggalFinish.disabled = true;
                console.log(table_data.cell(index, 0).data());
                tglOrder.value = table_data.cell(index, 1).data();
                NoOrder.value = table_data.cell(index, 0).data();
                NoGambar.value = table_data.cell(index, 5).data();
                KdBarang.value = table_data.cell(index, 4).data();
                Divisi.value = table_data.cell(index, 8).data();
                NamaBarang.value = table_data.cell(index, 3).data();
                KeteranganOrder.value = table_data.cell(index, 10).data();
                JumlahOrder.value = table_data.cell(index, 6).data();
                LabelStatus.textContent = table_data.cell(index, 7).data();
                Usermodalkoreksi.value = user;
                Tsts.value = 1;
                console.log(KdBarang.value);
                if (KdBarang.value != "") {
                    fetch("/LoadStokPenerimaOrderKerja/" + KdBarang.value)
                        .then((response) => response.json())
                        .then((datas) => {
                            console.log(datas);
                            if (datas.length > 0) {
                                primermodal.value =
                                    datas[0].SaldoPrimer +
                                    " " +
                                    datas[0].SPrimer;
                                sekundermodal.value =
                                    datas[0].SaldoSekunder +
                                    " " +
                                    datas[0].SSekunder;
                                tertiermodal.value =
                                    datas[0].SaldoTritier +
                                    " " +
                                    datas[0].STritier;
                            }
                        });
                }
                btnkoreksi.setAttribute("data-toggle", "modal");
                btnkoreksi.setAttribute("data-target", "#ModalKoreksi");
                $("#ModalKoreksi").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        $("#TanggalStart").focus();
                    }, 500);
                    // // Check if the modal is visible before focusing
                    // if ($(this).css("display") === "block") {
                    //     $("#JumlahOrderSelesai").focus();
                    // }
                });
            }
            if (
                trselect && $(trselect).hasClass("blue-color") &&
                order_selesai.checked == true
            ) {
                fetch("/namauserPenerimaOrderKerja/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        console.log(datas[0]);
                        LblNamaUser.value = datas[0].NamaUser;
                    });

                JumlahOrderSelesai.disabled = false;
                TanggalFinish.disabled = false;
                tglOrder.value = table_data.cell(index, 1).data();
                NoOrder.value = table_data.cell(index, 0).data();
                NoGambar.value = table_data.cell(index, 5).data();
                KdBarang.value = table_data.cell(index, 4).data();
                Divisi.value = table_data.cell(index, 8).data();
                NamaBarang.value = table_data.cell(index, 3).data();
                KeteranganOrder.value = table_data.cell(index, 10).data();
                JumlahOrder.value = table_data.cell(index, 6).data();
                LabelStatus.textContent = table_data.cell(index, 7).data();
                Usermodalkoreksi.value = user;
                Tsts.value = 2;
                console.log(KdBarang.value);
                if (KdBarang.value != "") {
                    fetch("/LoadStokPenerimaOrderKerja/" + KdBarang.value)
                        .then((response) => response.json())
                        .then((datas) => {
                            console.log(datas);
                            if (datas.length > 0) {
                                primermodal.value =
                                    datas[0].SaldoPrimer +
                                    " " +
                                    datas[0].SPrimer;
                                sekundermodal.value =
                                    datas[0].SaldoSekunder +
                                    " " +
                                    datas[0].SSekunder;
                                tertiermodal.value =
                                    datas[0].SaldoTritier +
                                    " " +
                                    datas[0].STritier;
                            }
                        });
                }
                btnkoreksi.setAttribute("data-toggle", "modal");
                btnkoreksi.setAttribute("data-target", "#ModalKoreksi");
                $("#ModalKoreksi").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        $("#JumlahOrderSelesai").focus();
                    }, 500);
                    // // Check if the modal is visible before focusing
                    // if ($(this).css("display") === "block") {
                    //     $("#JumlahOrderSelesai").focus();
                    // }
                });
            }
            if (
                trselect && $(trselect).hasClass("blue-color") &&
                order_batal.checked == true
            ) {
                let ada;
                fetch("/cekuserkoreksiOrderKerja/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        console.log(datas[0].ada);
                        ada = datas[0].ada;
                    });
                if (ada == 0) {
                    alert("Login " + user + " Tidak berHak utk memproses.");
                } else {
                    let Ket_batal = prompt("Alasan Dibatalkan : ");
                    if (Ket_batal !== null) {
                        ketbatal.value = Ket_batal;
                        no_orderkoreksi.value = no_order;
                        methodForm.value = "PUT";
                        radiobox.value = "order_batal";
                        formPemerimaOrderKerja.action =
                            "/PenerimaOrderKerja/" + no_orderkoreksi.value;
                        formPemerimaOrderKerja.submit();
                    }
                }
            }
        }
    }
}

//#endregion

//#region proses modal

function prosesmodalklik() {
    let ada;
    fetch("/cekuserkoreksiOrderKerja/" + user)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas[0].ada);
            ada = datas[0].ada;
        });
    if (ada == 0) {
        alert("Login " + user + " Tidak berHak utk memproses.");
    } else {
        if (Tsts.value == 1) {
            methodFormModalKoreksi.value = "PUT";
            FormKoreksiModal.action = "/PenerimaOrderKerja/" + NoOrder.value;
            FormKoreksiModal.submit();
        }
        if (Tsts.value == 2) {
            if (JumlahOrderSelesai.value == "") {
                alert("Isi Jumlah Order Selesai");
                return;
            } else {
                methodFormModalKoreksi.value = "PUT";
                FormKoreksiModal.action =
                    "/PenerimaOrderKerja/" + NoOrder.value;
                FormKoreksiModal.submit();
            }
        }
    }
}

//#endregion

//#region  table on click

$("#tablePenerimaOrderKerja tbody").off("click", "tr");
$("#tablePenerimaOrderKerja tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tablePenerimaOrderKerja tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tablePenerimaOrderKerja").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    let kode = selectedRows[0].Kd_Brg;
    console.log(kode);
    primer.value = "";
    sekunder.value = "";
    tertier.value = "";
    fetch("/LoadStokPenerimaOrderKerja/" + kode)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length > 0) {
                primer.value = datas[0].SaldoPrimer + " " + datas[0].SPrimer;
                sekunder.value =
                    datas[0].SaldoSekunder + " " + datas[0].SSekunder;
                tertier.value = datas[0].SaldoTritier + " " + datas[0].STritier;
            }
        });
});

//#endregion

//#region proses modal tunda

function klikprosestunda() {
    pembeda.value = "tunda";
    // console.log(idorderModalTunda.value);
    methodFormModalTunda.value = "PUT";
    FormTundaModal.action = "/PenerimaOrderKerja/" + idorderModalTunda.value;
    FormTundaModal.submit();
}

//#endregion

//#region waktu checked nanti button mana yang aktif

acc_order.addEventListener("change", function () {
    btnproses.disabled = !acc_order.checked;
    btnkoreksi.disabled = true;
});
batal_acc.addEventListener("change", function () {
    btnproses.disabled = !batal_acc.checked;
    btnkoreksi.disabled = true;
});
tunda.addEventListener("change", function () {
    btnproses.disabled = !tunda.checked;
    btnkoreksi.disabled = true;
});
order_tolak.addEventListener("change", function () {
    btnproses.disabled = !order_tolak.checked;
    btnkoreksi.disabled = true;
});

order_kerja.addEventListener("change", function () {
    btnkoreksi.disabled = !order_kerja.checked;
    btnproses.disabled = true;
});
order_selesai.addEventListener("change", function () {
    btnkoreksi.disabled = !order_selesai.checked;
    btnproses.disabled = true;
});
order_batal.addEventListener("change", function () {
    btnkoreksi.disabled = !order_batal.checked;
    btnproses.disabled = true;
});

//#endregion
