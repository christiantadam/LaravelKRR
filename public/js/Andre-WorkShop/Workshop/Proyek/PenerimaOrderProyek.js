let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let selectedRowIndex = null; // Track the index of the selected row
let allChecked = false;
let TablePenerimaOrderProyek = $("#TablePenerimaOrderProyek").DataTable({
    destroy: true, // Destroy any existing DataTable before reinitializing
    data: [],
    columns: [
        {
            title: "No.Order",
            data: "Id_Order",
            render: function (data) {
                return `<input type="checkbox" name="cbOrder${data}" id="cbOrder${data}" value="${data}" /> ${data}`;
            },
        },
        // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
        { title: "Tgl.Order", data: "Tgl_Order" },
        { title: "Tgl.ACC Direktur", data: "Tgl_Apv_2" },
        { title: "Nama Proyek", data: "Nama_Proyek" },
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
    paging: false,
    scrollY: "500px",
    scrollCollapse: true,
});
let refresh = document.getElementById("refresh");
let cek = false;
let iduser = document.getElementById("iduser");
// let user = 4384;
iduser.value = user;
var panjangdata;
var arraycheckbox = [];
var ket = [];
let openmodaltunda = false;
let acc_order = document.getElementById("acc_order");
let batal_acc = document.getElementById("batal_acc");
let pending = document.getElementById("pending");
let order_tolak = document.getElementById("order_tolak");
let radiobox = document.getElementById("radiobox");
let semuacentang = document.getElementById("semuacentang");
let FormPenerimaOrderProyek = document.getElementById(
    "FormPenerimaOrderProyek"
);
let methodForm = document.getElementById("methodForm");

let KetTdkS = document.getElementById("KetTdkS");
let idorderModalTunda = document.getElementById("idorderModalTunda");
let btnproses = document.getElementById("btnproses");
let pembeda = document.getElementById("pembeda");
let FormTundaModal = document.getElementById("FormTundaModal");
let methodFormModalTunda = document.getElementById("methodFormModalTunda");

let order_kerja = document.getElementById("order_kerja");
let order_selesai = document.getElementById("order_selesai");
let order_batal = document.getElementById("order_batal");
var trselect;
let btnkoreksi = document.getElementById("btnkoreksi");
let LblNamaUser = document.getElementById("LblNamaUser");
let JumlahOrderSelesai = document.getElementById("JumlahOrderSelesai");
let TanggalFinish = document.getElementById("TanggalFinish");
let tglOrder = document.getElementById("tglOrder");
let NoOrder = document.getElementById("NoOrder");
let Divisi = document.getElementById("Divisi");
let NamaProyek = document.getElementById("NamaProyek");
let KeteranganOrder = document.getElementById("KeteranganOrder");
let JumlahOrder = document.getElementById("JumlahOrder");
let LabelStatus = document.getElementById("LabelStatus");
let Usermodalkoreksi = document.getElementById("Usermodalkoreksi");
let Tsts = document.getElementById("Tsts");
let ketbatal = document.getElementById("ketbatal");
let no_orderkoreksi = document.getElementById("no_orderkoreksi");
let TanggalStart = document.getElementById("TanggalStart");
let FormKoreksiModal = document.getElementById("FormKoreksiModal");
let methodFormModalKoreksi = document.getElementById("methodFormModalKoreksi");
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
TanggalStart.value = formattedCurrentDate;
TanggalFinish.value = formattedCurrentDate;
//#endregion

//#region set warna

TablePenerimaOrderProyek.on("draw", function () {
    TablePenerimaOrderProyek.rows().every(function () {
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
        if (data.Tgl_Pending !== null) {
            if (data.Acc_Mng !== null && data.User_Rcv == null) {
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
        if (data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");
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

//#region tgl akhir on enter

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
    fetch("/GetDataAllPenerimaOrderProyek/" + tglAwal + "/" + tglAkhir)
        .then((response) => response.json())
        .then((datas) => {
            TablePenerimaOrderProyek.clear().draw();
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
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Belum Ada Order Proyek yang masuk",
                });
            } else {
                TablePenerimaOrderProyek.rows.add(datas).draw();
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

$("#TablePenerimaOrderProyek tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#TablePenerimaOrderProyek tbody tr.selected");
    selectedRowIndex = TablePenerimaOrderProyek.row(this).index();
    let selectedRow = TablePenerimaOrderProyek.row(this).data();

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
    const rowCount = TablePenerimaOrderProyek.rows().count();

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
                const rowNode =
                    TablePenerimaOrderProyek.row(selectedRowIndex).node();
                const checkbox = $(rowNode).find('input[type="checkbox"]');

                if (checkbox.length) {
                    checkbox.prop("checked", !checkbox.prop("checked"));
                }
            }
        }
    }
});

function updateRowSelection() {
    $("#TablePenerimaOrderProyek tbody tr").removeClass("selected");

    const rowNode = TablePenerimaOrderProyek.row(selectedRowIndex).node();
    $(rowNode).addClass("selected");

    // Optional: scroll into view
    rowNode.scrollIntoView({ behavior: "instant", block: "nearest" });

    // Optional: get data from the newly selected row
    // const rowData = TablePenerimaOrderProyek.row(selectedRowIndex).data();
    // console.log("Selected row data:", rowData);
}

//#endregion

//#region pilih semua

$("#btnTogglePilih").on("click", function () {
    if (!TablePenerimaOrderProyek.rows().count()) {
        Swal.fire({
            icon: "info",
            title: "Pemberitahuan",
            text: "Tidak ada data yang tersedia untuk dipilih.",
        });
        return;
    }
    // Toggle the checked state of all checkboxes
    allChecked = !allChecked;

    TablePenerimaOrderProyek.rows().every(function () {
        let rowNode = this.node();
        $(rowNode).find('input[type="checkbox"]').prop("checked", allChecked);
    });

    $(this).text(allChecked ? "Batal Pilih Semua" : "Pilih Semua");
});
//#endregion

//#region proses modal tunda

function klikprosestunda() {
    pembeda.value = "tunda";
    // console.log(idorderModalTunda.value);
    methodFormModalTunda.value = "PUT";
    FormTundaModal.action = "/PenerimaOrderProyek/" + idorderModalTunda.value;
    FormTundaModal.submit();
}

//#endregion

//#region button koreksi

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
            console.log(arrayindex.length);
            return;
        } else {
            console.log(arrayindex.length);
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
            }
            if (trselect.hasClass("Fuchsia-color")) {
                alert("Order Gambar Finished");
                return;
            }
            if (
                trselect.hasClass("red-color") ||
                (trselect.hasClass("blue-color") && order_kerja.checked == true)
            ) {
                fetch("/namauserPenerimaOrderProyek/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        // console.log(datas[0]);
                        LblNamaUser.value = datas[0].NamaUser;
                    });
                JumlahOrderSelesai.disabled = true;
                TanggalFinish.disabled = true;
                NoOrder.value = TablePenerimaOrderProyek.cell(index, 0).data();
                tglOrder.value = TablePenerimaOrderProyek.cell(index, 1).data();
                NamaProyek.value = TablePenerimaOrderProyek.cell(index, 3).data(); // prettier-ignore
                JumlahOrder.value = TablePenerimaOrderProyek.cell(index, 4).data(); // prettier-ignore
                LabelStatus.textContent = TablePenerimaOrderProyek.cell(index, 5).data(); // prettier-ignore
                Divisi.value = TablePenerimaOrderProyek.cell(index, 6).data();
                KeteranganOrder.value = TablePenerimaOrderProyek.cell(index, 8).data(); // prettier-ignore
                Usermodalkoreksi.value = TablePenerimaOrderProyek.cell(index, 10).data(); // prettier-ignore
                Tsts.value = 1;
                btnkoreksi.setAttribute("data-toggle", "modal");
                btnkoreksi.setAttribute("data-target", "#ModalKoreksi");
                $("#ModalKoreksi").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        $("#TanggalStart").focus();
                    }, 500);
                });
            }
            if (
                trselect.hasClass("blue-color") &&
                order_selesai.checked == true
            ) {
                fetch("/namauserPenerimaOrderProyek/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        // console.log(datas[0]);
                        LblNamaUser.value = datas[0].NamaUser;
                    });

                JumlahOrderSelesai.disabled = false;
                TanggalFinish.disabled = false;
                NoOrder.value = TablePenerimaOrderProyek.cell(index, 0).data();
                tglOrder.value = TablePenerimaOrderProyek.cell(index, 1).data();
                NamaProyek.value = TablePenerimaOrderProyek.cell(index, 3).data(); // prettier-ignore
                JumlahOrder.value = TablePenerimaOrderProyek.cell(index, 4).data(); // prettier-ignore
                LabelStatus.textContent = TablePenerimaOrderProyek.cell(index, 5).data(); // prettier-ignore
                Divisi.value = TablePenerimaOrderProyek.cell(index, 6).data();
                KeteranganOrder.value = TablePenerimaOrderProyek.cell(index, 8).data(); // prettier-ignore
                Usermodalkoreksi.value = TablePenerimaOrderProyek.cell(index, 10).data(); // prettier-ignore
                Tsts.value = 2;
                // console.log(KdBarang.value);
                btnkoreksi.setAttribute("data-toggle", "modal");
                btnkoreksi.setAttribute("data-target", "#ModalKoreksi");
                $("#ModalKoreksi").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        $("#JumlahOrderSelesai").focus();
                    }, 500);
                });
            }
            if (
                trselect.hasClass("blue-color") &&
                order_batal.checked == true
            ) {
                let ada;
                fetch("/cekuserkoreksiPenerimaOrderProyek/" + user)
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
                        FormPenerimaOrderProyek.action =
                            "/PenerimaOrderProyek/" + no_orderkoreksi.value;
                        FormPenerimaOrderProyek.submit();
                    }
                }
            }
        }
    }
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
pending.addEventListener("change", function () {
    btnproses.disabled = !pending.checked;
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
            FormKoreksiModal.action = "/PenerimaOrderProyek/" + NoOrder.value;
            FormKoreksiModal.submit();
        }
        if (Tsts.value == 2) {
            if (JumlahOrderSelesai.value == "") {
                alert("Isi Jumlah Order Selesai");
                return;
            } else {
                methodFormModalKoreksi.value = "PUT";
                FormKoreksiModal.action =
                    "/PenerimaOrderProyek/" + NoOrder.value;
                FormKoreksiModal.submit();
            }
        }
    }
}

async function checkUserAccess(userId) {
    try {
        const response = await fetch(`/cekuserPenerimaOrderGambar/${userId}`);
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
        '#TablePenerimaOrderProyek input[type="checkbox"]:checked'
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
    if (tunda.checked) return "tunda";
    return "";
}

async function processOrder(radiobox, arraycheckbox, ket) {
    let alasan = document.querySelector('input[name="Alasan"]:checked')?.value || ""; // prettier-ignore
    $.ajax({
        url: "/PenerimaOrderProyek/" + radiobox,
        type: "PUT",
        data: {
            _token: csrfToken,
            semuacentang: arraycheckbox.join(","),
            KetTdkS: ket.join(","),
            tgl_awal: tgl_awal.value,
            tgl_akhir: tgl_akhir.value,
            alasanlainlain: alasanlainlain.value,
            Alasan: alasan,
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
    if (
        $('#TablePenerimaOrderProyek input[type="checkbox"]:checked').length < 1
    )
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

    if (radiobox === "tunda") {
        return $("#modaltunda").modal("show");
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

prosesmodaltunda.addEventListener("click", async function (e) {
    e.preventDefault();
    $("#modaltunda").modal("hide");
    const { arraycheckbox, ket } = await collectCheckedOrders();
    if (arraycheckbox.length === 0) {
        return Swal.fire({
            icon: "warning",
            title: "Perhatian",
            text: "Pilih Nomer Order yang ingin diproses.",
        });
    }
    await processOrder("tunda", arraycheckbox, ket);
});

btnkoreksi.addEventListener("click", function (e) {
    e.preventDefault();
    const kerjaChecked = order_kerja.checked;
    const selesaiChecked = order_selesai.checked;
    const batalChecked = order_batal.checked;
    if (!kerjaChecked && !selesaiChecked && !batalChecked) {
        Swal.fire({
            icon: "info",
            title: "Status Order Belum Dipilih",
            text: "Pilih 'Order DiKerjakan' atau 'Order Selesai' atau 'Order Dibatalkan",
        });
    } else {
        let arrayindex = [];
        let no_order;
        let trselect;
        let index;

        $('#TablePenerimaOrderProyek input[type="checkbox"]:checked').each(
            function () {
                let rowIndex = $(this).closest("tr").index();
                let closestTr = $(this).closest("tr");
                no_order = this.value;
                trselect = closestTr;
                index = rowIndex;
                arrayindex.push(index);
            }
        );
        if (arrayindex.length === 0 || arrayindex.length > 1) {
            Swal.fire({
                icon: "warning",
                title: "Perhatian",
                text: "Pilih data yang ingin diproses.",
            });
            return;
        } else {
            function showAlert(title, text) {
                Swal.fire({ icon: "info", title, text });
            }

            function fillOrderData(index) {
                NoOrder.value = TablePenerimaOrderProyek.cell(index, 0).data();
                tglOrder.value = TablePenerimaOrderProyek.cell(index, 1).data();
                NamaProyek.value = TablePenerimaOrderProyek.cell(index, 3).data(); // prettier-ignore
                JumlahOrder.value = TablePenerimaOrderProyek.cell(index, 4).data(); // prettier-ignore
                LabelStatus.textContent = TablePenerimaOrderProyek.cell(index, 5).data(); // prettier-ignore
                Divisi.value = TablePenerimaOrderProyek.cell(index, 6).data();
                KeteranganOrder.value = TablePenerimaOrderProyek.cell(index, 8).data(); // prettier-ignore
                Usermodalkoreksi.value = TablePenerimaOrderProyek.cell(index, 10).data(); // prettier-ignore
            }

            function showModalKoreksi(focusSelector) {
                $("#ModalKoreksi").modal("show");
                $("#ModalKoreksi").on("shown.bs.modal", function () {
                    setTimeout(() => $(focusSelector).focus(), 500);
                });
            }

            if (!trselect) return;

            // Access variables once
            const isRed = $(trselect).hasClass("red-color");
            const isBlack = $(trselect).hasClass("black-color");
            const isBlue = $(trselect).hasClass("blue-color");
            const isFuchsia = $(trselect).hasClass("Fuchsia-color");

            if (isRed && batalChecked) {
                showAlert(
                    "Pemberitahuan",
                    "Proses Order Untuk Dikerjakan Dulu Atau Batal ACC"
                );
                return;
            }

            if (isBlack) {
                showAlert(
                    "Pemberitahuan",
                    "Proses Order Untuk Diterima Dulu, baru Koreksi"
                );
                return;
            }

            if (isRed && selesaiChecked) {
                showAlert(
                    "Pemberitahuan",
                    "Proses Order Untuk Dikerjakan Dulu"
                );
                return;
            }

            if (isFuchsia) {
                showAlert("Pemberitahuan", "Order Proyek Finished");
                return;
            }

            // === Order kerja (red or blue) ===
            if ((isRed || isBlue) && kerjaChecked) {
                fetch("/namauserPenerimaOrderProyek/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        LblNamaUser.value = datas[0].NamaUser;
                    });

                JumlahOrderSelesai.disabled = true;
                TanggalFinish.disabled = true;

                fillOrderData(index);
                Usermodalkoreksi.value = user;

                showModalKoreksi("#TanggalStart");
            }

            // === Order selesai (blue only) ===
            else if (isBlue && selesaiChecked) {
                fetch("/namauserPenerimaOrderProyek/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        LblNamaUser.value = datas[0].NamaUser;
                    });

                JumlahOrderSelesai.disabled = false;
                TanggalFinish.disabled = false;

                fillOrderData(index);
                Usermodalkoreksi.value = user;

                showModalKoreksi("#JumlahOrderSelesai");
            }

            // === Order batal (blue only) ===
            else if (isBlue && batalChecked) {
                fetch("/cekuserkoreksiOrderKerja/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        const ada = datas[0].ada;

                        if (ada == 0) {
                            Swal.fire({
                                icon: "warning",
                                title: "Akses Ditolak",
                                text:
                                    "Login " +
                                    user +
                                    " tidak berhak untuk memproses.",
                            });
                            return;
                        }
                        Swal.fire({
                            title: "Alasan Dibatalkan",
                            input: "text",
                            inputPlaceholder: "Tulis alasan di sini...",
                            inputAttributes: {
                                autocapitalize: "off",
                            },
                            showCancelButton: true,
                            confirmButtonText: "Kirim",
                            cancelButtonText: "Batal",
                            showLoaderOnConfirm: true,
                            preConfirm: (alasan) => {
                                if (!alasan) {
                                    Swal.showValidationMessage(
                                        "Alasan tidak boleh kosong"
                                    );
                                }
                                return alasan;
                            },
                            allowOutsideClick: () => !Swal.isLoading(),
                        }).then((result) => {
                            if (result.isConfirmed && result.value) {
                                $.ajax({
                                    url: "/PenerimaOrderProyek/order_batal",
                                    type: "PUT",
                                    data: {
                                        _token: csrfToken,
                                        ketbatal: result.value,
                                        no_order: no_orderkoreksi.value,
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
                                            AllData(
                                                tgl_awal.value,
                                                tgl_akhir.value
                                            );
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error(
                                            "Error btnproses: ",
                                            error
                                        );
                                    },
                                });
                            }
                        });
                    });
            }
        }
    }
});

prosesmodalkoreksi.addEventListener("click", function (e) {
    e.preventDefault();
    let ada;
    fetch("/cekuserkoreksiOrderKerja/" + user)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas[0].ada);
            ada = datas[0].ada;
        });
    if (ada == 0) {
        Swal.fire({
            icon: "warning",
            title: "Akses Ditolak",
            text: "Login " + user + " tidak berhak untuk memproses.",
        });
    } else {
        if (order_selesai.checked && JumlahOrderSelesai.value < 1) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Isi Jumlah Order Selesai",
            });
            return;
        }

        $.ajax({
            url: order_kerja.checked
                ? "/PenerimaOrderProyek/order_kerja"
                : "/PenerimaOrderProyek/order_selesai",
            type: "PUT",
            data: {
                _token: csrfToken,
                no_order: NoOrder.value,
                TanggalStart: TanggalStart.value,
                TanggalFinish: TanggalFinish.value,
                JumlahOrderSelesai: JumlahOrderSelesai.value,
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
});
//#endregion
