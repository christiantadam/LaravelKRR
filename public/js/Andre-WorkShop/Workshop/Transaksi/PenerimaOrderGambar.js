//#region variabel
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let selectedRowIndex = null; // Track the index of the selected row
let allChecked = false;
let tablepenerimagambar = $("#tablepenerimagambar").DataTable({
    data: [],
    columns: [
        {
            title: "No. Order",
            data: "Id_Order",
            render: function (data) {
                return `<input type="checkbox" name="cbOrder${data}" id="cbOrder${data}" value="${data}" /> ${data}`;
            },
        },
        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
        {
            title: "Tgl. Order",
            data: "Tgl_Order",
            render: function (data) {
                return data.split(" ")[0];
            },
        },
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
    paging: false,
    scrollY: "500px",
    scrollCollapse: true,
});
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

let ModalProsesPembeliGambar = document.getElementById("ModalProsesPembeliGambar"); // prettier-ignore
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
tablepenerimagambar.on("draw", function () {
    tablepenerimagambar.rows().every(function () {
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

//#region all data

function AllData(tglAwal, tglAkhir) {
    $("#btnTogglePilih").text("Pilih Semua");
    allChecked = false; // Reset the allChecked state
    fetch("/getalldataPenerimaGambar/" + tglAwal + "/" + tglAkhir)
        .then((response) => response.json())
        .then((datas) => {
            tablepenerimagambar.clear().draw();
            if (datas.length == 0) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Belum Ada Order Gambar yang masuk",
                });
            } else {
                tablepenerimagambar.rows.add(datas).draw();
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

//#region table on click

$("#tablepenerimagambar tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tablepenerimagambar tbody tr.selected");
    selectedRowIndex = tablepenerimagambar.row(this).index();
    let selectedRow = tablepenerimagambar.row(this).data();

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    if (selectedRow) {
        $(this).addClass("selected");
    } else {
        return;
    }
});

//#endregion

//#region Keyboard navigation on whole page

$(document).on("keydown", function (e) {
    const rowCount = tablepenerimagambar.rows().count();

    if (selectedRowIndex !== null) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (selectedRowIndex < rowCount - 1) {
                selectedRowIndex++;
                updateRowSelection();
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (selectedRowIndex > 0) {
                selectedRowIndex--;
                updateRowSelection();
            }
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();

            if (selectedRowIndex !== null) {
                const rowNode = tablepenerimagambar
                    .row(selectedRowIndex)
                    .node();
                const checkbox = $(rowNode).find('input[type="checkbox"]');

                if (checkbox.length) {
                    checkbox.prop("checked", !checkbox.prop("checked"));
                }
            }
        }
    }
});

function updateRowSelection() {
    $("#tablepenerimagambar tbody tr").removeClass("selected");

    const rowNode = tablepenerimagambar.row(selectedRowIndex).node();
    $(rowNode).addClass("selected");

    // Optional: scroll into view
    rowNode.scrollIntoView({ behavior: "instant", block: "nearest" });

    // Optional: get data from the newly selected row
    // const rowData = tablepenerimagambar.row(selectedRowIndex).data();
    // console.log("Selected row data:", rowData);
}

//#endregion

//#region pilih semua

$("#btnTogglePilih").on("click", function () {
    if (!tablepenerimagambar.rows().count()) {
        Swal.fire({
            icon: "info",
            title: "Pemberitahuan",
            text: "Tidak ada data yang tersedia untuk dipilih.",
        });
        return;
    }
    // Toggle the checked state of all checkboxes
    allChecked = !allChecked;

    tablepenerimagambar.rows().every(function () {
        let rowNode = this.node();
        $(rowNode).find('input[type="checkbox"]').prop("checked", allChecked);
    });

    $(this).text(allChecked ? "Batal Pilih Semua" : "Pilih Semua");
});

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
        $('#tablepenerimagambar input[type="checkbox"]:checked').each(
            function () {
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
            }
        );
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
                console.log(tablepenerimagambar.cell(index, 0).data());
                tglOrder.value = tablepenerimagambar.cell(index, 1).data();
                noOrder.value = tablepenerimagambar.cell(index, 0).data();
                Divisimodal.value = tablepenerimagambar.cell(index, 7).data();
                NamaBarangModal.value = tablepenerimagambar.cell(index, 3).data(); // prettier-ignore
                noGambar.value = tablepenerimagambar.cell(index, 4).data();
                KeteranganModal.value = tablepenerimagambar.cell(index, 9).data(); // prettier-ignore
                JumlahModal.value = tablepenerimagambar.cell(index, 5).data();
                lblstatus.textContent = tablepenerimagambar.cell(index, 6).data(); // prettier-ignore
                TuserOd.value = tablepenerimagambar.cell(index, 11).data();
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
                tglOrder.value = tablepenerimagambar.cell(index, 1).data();
                noOrder.value = tablepenerimagambar.cell(index, 0).data();
                Divisimodal.value = tablepenerimagambar.cell(index, 7).data();
                NamaBarangModal.value = tablepenerimagambar.cell(index, 3).data(); // prettier-ignore
                noGambar.value = tablepenerimagambar.cell(index, 4).data();
                KeteranganModal.value = tablepenerimagambar.cell(index, 9).data(); // prettier-ignore
                JumlahModal.value = tablepenerimagambar.cell(index, 5).data();
                lblstatus.textContent = tablepenerimagambar.cell(index, 6).data(); // prettier-ignore
                TuserOd.value = tablepenerimagambar.cell(index, 11).data();
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
tgl_awal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        tgl_akhir.focus();
    }
});

//#endregion

async function checkUserAccess(userId) {
    try {
        const response = await fetch(`/cekuser/${userId}`);
        const datas = await response.json();
        return datas[0].ada !== 0;
    } catch (err) {
        console.error("Error checking access", err);
        return false;
    }
}

async function collectCheckedOrders() {
    let arraycheckbox = [];
    let ket = [];

    const checkedItems = $(
        '#tablepenerimagambar input[type="checkbox"]:checked'
    );

    for (const checkbox of checkedItems) {
        const $checkbox = $(checkbox);
        const value = $checkbox.val();
        const tr = $checkbox.closest("tr");

        if (
            acc_order.checked &&
            (tr.hasClass("black-color") || tr.hasClass("Magenta-color"))
        ) {
            arraycheckbox.push(value);
        } else if (batal_acc.checked && tr.hasClass("red-color")) {
            arraycheckbox.push(value);
        } else if (
            order_tolak.checked &&
            (tr.hasClass("black-color") || tr.hasClass("Magenta-color"))
        ) {
            const { isConfirmed, value: alasan } = await Swal.fire({
                title: "Alasan Ditolak",
                input: "text",
                inputLabel: `Order: ${value}`,
                inputPlaceholder: "Tulis alasan di sini...",
                showCancelButton: true,
                inputValidator: (val) => !val && "Alasan tidak boleh kosong!",
            });

            if (isConfirmed) {
                arraycheckbox.push(value);
                ket.push(alasan);
            }
        } else if (tunda.checked && tr.hasClass("black-color")) {
            arraycheckbox.push(value);
        }
    }

    return { arraycheckbox, ket };
}

function getSelectedStatus() {
    if (acc_order.checked) return "acc";
    if (batal_acc.checked) return "batal_acc";
    if (order_tolak.checked) return "tolak_setuju";
    return "";
}

async function processOrder(radiobox, arraycheckbox, ket) {
    $.ajax({
        url: "/PenerimaOrderKerja/" + radiobox,
        type: "PUT",
        data: {
            _token: csrfToken,
            semuacentang: arraycheckbox.join(","),
            KetTdkS: ket.join(","),
            tgl_awal: tgl_awal.value,
            tgl_akhir: tgl_akhir.value,
        },
        success: function (response) {
            if (response.error) {
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan!",
                    text: response.error,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: response.success,
                });
                AllData(tgl_awal.value, tgl_akhir.value);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error btnproses: ", error);
        },
    });
}

btnproses.addEventListener("click", async function (e) {
    e.preventDefault();
    if ($('#tablepenerimagambar input[type="checkbox"]:checked').length < 1)
        return;

    const accessGranted = await checkUserAccess(iduser.value);
    if (!accessGranted) {
        return Swal.fire({
            icon: "warning",
            title: "Akses Ditolak",
            text: `Login ${user} tidak berhak untuk memproses.`,
        });
    }

    const radiobox = getSelectedStatus();
    if (!radiobox) {
        return Swal.fire({
            icon: "info",
            title: "Status Order Belum Dipilih",
            text: "Pilih 'Order Diterima', 'Order Dibatalkan', 'Order Ditolak', atau 'Pending'",
        });
    }

    const { arraycheckbox, ket } = await collectCheckedOrders();
    if (arraycheckbox.length === 0) {
        return Swal.fire({
            icon: "warning",
            title: "Perhatian",
            text: "Pilih Nomer Order yang ingin diproses.",
        });
    }

    await processOrder(radiobox, arraycheckbox, ket);
});

btnkoreksi.addEventListener("click", function (e) {
    e.preventDefault();
    if (
        !order_kerja.checked &&
        !order_selesai.checked &&
        !order_batal.checked
    ) {
        return alert(
            "Pilih 'Order DiKerjakan' atau 'Order Selesai' atau 'Order Dibatalkan'"
        );
    }

    let arrayindex = [];
    let selectedCheckbox = null;

    $('#tablepenerimagambar input[type="checkbox"]:checked').each(function () {
        arrayindex.push($(this).closest("tr").index());
        selectedCheckbox = this;
    });

    if (arrayindex.length !== 1) {
        return alert("Pilih 1 Data Untuk DiPROSES");
    }

    const index = arrayindex[0];
    const trselect = $(selectedCheckbox).closest("tr");
    const no_order = selectedCheckbox.value;

    const isRed = trselect.hasClass("red-color");
    const isBlack = trselect.hasClass("black-color");
    const isBlue = trselect.hasClass("blue-color");

    if ((isRed && order_batal.checked) || (isRed && order_selesai.checked)) {
        return alert("Proses Order Untuk Dikerjakan Dulu Atau Batal ACC");
    }

    if (isBlack) {
        return alert("Proses Order Untuk Diterima Dulu, baru Koreksi");
    }

    const data = (col) => tablepenerimagambar.cell(index, col).data();

    if (order_kerja.checked || order_selesai.checked) {
        btnkoreksi.setAttribute("data-toggle", "modal");
        btnkoreksi.setAttribute("data-target", "#modalkoreksi");
    } else {
        btnkoreksi.removeAttribute("data-toggle");
        btnkoreksi.removeAttribute("data-target");
    }

    // Red or Blue + Kerja
    if ((isRed || isBlue) && order_kerja.checked) {
        fillModalForOrderKerja();
    }

    // Blue + Selesai
    if (isBlue && order_selesai.checked) {
        fillModalForOrderSelesai();
    }

    // Blue + Batal
    if (isBlue && order_batal.checked) {
        processOrderBatal();
    }

    // ========== Subfunctions ==========

    function fillModalCommonFields() {
        tglOrder.value = data(1);
        noOrder.value = data(0);
        Divisimodal.value = data(7);
        NamaBarangModal.value = data(3);
        noGambar.value = data(4);
        KeteranganModal.value = data(9);
        JumlahModal.value = data(5);
        lblstatus.textContent = data(6);
        TuserOd.value = data(11);
    }

    function fillModalForOrderKerja() {
        fillModalCommonFields();
        Tsts.value = 1;
        fetch("/GetUserDrafterPenerimaOrderGambar/" + noOrder.value)
            .then((res) => res.json())
            .then((datas) => {
                DrafterModal.value = datas[0].User_Pembuat;
                tgl_finish.focus();
            });
    }

    function fillModalForOrderSelesai() {
        fillModalCommonFields();
        Tsts.value = 2;
        tgl_finish.disabled = false;
        NoGambarModal.disabled = false;
        NamaGambarModal.disabled = false;
        Approvemodal.disabled = false;
        btnplus.disabled = false;
        btnmin.disabled = false;

        fetch("/GetUserDrafterPenerimaOrderGambar/" + noOrder.value)
            .then((res) => res.json())
            .then((datas) => {
                DrafterModal.value = datas[0].User_Pembuat;
                tgl_finish.focus();
            });
    }

    function processOrderBatal() {
        fetch("/cekuserkoreksi/" + user)
            .then((res) => res.json())
            .then((datas) => {
                if (datas[0].ada == 0) {
                    alert("Login " + user + " Tidak berHak utk memproses.");
                    return;
                }

                const Ket_batal = prompt("Alasan Dibatalkan : ");
                if (Ket_batal !== null) {
                    ketbatal.value = Ket_batal;
                    no_orderkoreksi.value = no_order;
                    methodForm.value = "PUT";
                    radiobox.value = "order_batal";
                    formPemerimaGambar.action =
                        "/PenerimaOrderGambar/" + no_order;
                    formPemerimaGambar.submit();
                }
            });
    }
});
