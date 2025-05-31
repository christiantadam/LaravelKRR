let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let selectedRowIndex = null; // Track the index of the selected row
let allChecked = false;
let tablePenerimaOrderKerja = $("#tablePenerimaOrderKerja").DataTable({
    destroy: true, // Destroy any existing DataTable before reinitializing
    data: [],
    columns: [
        {
            title: "No. Order",
            data: "Id_Order",
            render: function (data) {
                return `<input type="checkbox" name="cbOrder${data}" id="cbOrder${data}" value="${data}" /> ${data}`;
            },
        },
        {
            title: "Tgl. Order",
            data: function (data) {
                return data.Tgl_Order.split(" ")[0]; // Hanya ambil tanggal
            },
        },
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
    paging: false, // Nonaktifkan pagination
    scrollY: "500px", // Aktifkan scroll vertikal dengan tinggi 500px
    scrollCollapse: true, // Aktifkan collapse scroll agar tabel tidak terlalu besar jika data sedikit
});
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
let prosesmodalkoreksi = document.getElementById("prosesmodalkoreksi");
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
let batalmodalkoreksi = document.getElementById("batalmodalkoreksi");
var index;
let methodFormModalKoreksi = document.getElementById("methodFormModalKoreksi");

let primermodal = document.getElementById("primermodal");
let sekundermodal = document.getElementById("sekundermodal");
let tertiermodal = document.getElementById("tertiermodal");
let primer = document.getElementById("primer");
let sekunder = document.getElementById("sekunder");
let tertier = document.getElementById("tertier");

let idorderModalTunda = document.getElementById("idorderModalTunda");

//#region set tanggal
const currentDate = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);

// Format the date to be in 'YYYY-MM-DD' format for setting the input value
const formattedFirstDay = firstDayOfMonth.toISOString().slice(0, 10);

// Format the current date to be in 'YYYY-MM-DD' format for setting the input value
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

// Set the values of the input fields to the calculated dates
// tgl_awal.value = formattedFirstDay;
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
    $("#btnTogglePilih").text("Pilih Semua");
    allChecked = false; // Reset the allChecked state
    fetch("/getalldataPenerimaOrderKerja/" + tglAwal + "/" + tglAkhir)
        .then((response) => response.json())
        .then((datas) => {
            tablePenerimaOrderKerja.clear().draw();
            if (datas.length == 0) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Belum Ada Order Kerja yang masuk",
                });
            } else {
                tablePenerimaOrderKerja.rows.add(datas).draw();
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

$("#btnTogglePilih").on("click", function () {
    if (!tablePenerimaOrderKerja.rows().count()) {
        Swal.fire({
            icon: "info",
            title: "Pemberitahuan",
            text: "Tidak ada data yang tersedia untuk dipilih.",
        });
        return;
    }
    // Toggle the checked state of all checkboxes
    allChecked = !allChecked;

    tablePenerimaOrderKerja.rows().every(function () {
        let rowNode = this.node();
        $(rowNode).find('input[type="checkbox"]').prop("checked", allChecked);
    });

    $(this).text(allChecked ? "Batal Pilih Semua" : "Pilih Semua");
});

//#endregion

//#region set warna

tablePenerimaOrderKerja.on("draw", function () {
    tablePenerimaOrderKerja.rows().every(function () {
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

//#region table on click

$("#tablePenerimaOrderKerja tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tablePenerimaOrderKerja tbody tr.selected");
    selectedRowIndex = tablePenerimaOrderKerja.row(this).index();
    let selectedRow = tablePenerimaOrderKerja.row(this).data();

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    if (selectedRow) {
        $(this).addClass("selected");
    } else {
        return;
    }
    const table = $("#tablePenerimaOrderKerja").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    let kode = selectedRows[0].Kd_Brg;
    primer.value = "";
    sekunder.value = "";
    tertier.value = "";
    fetch("/LoadStokPenerimaOrderKerja/" + kode)
        .then((response) => response.json())
        .then((datas) => {
            if (datas.length > 0) {
                primer.value = numeral(datas[0].SaldoPrimer).format('0,00') + " " + datas[0].SPrimer; // prettier-ignore
                sekunder.value = numeral(datas[0].SaldoSekunder).format('0,00') + " " + datas[0].SSekunder; // prettier-ignore
                tertier.value = numeral(datas[0].SaldoTritier).format('0,00') + " " + datas[0].STritier; // prettier-ignore
            }
        });
});

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

//#region Keyboard navigation on whole page

$(document).on("keydown", function (e) {
    const rowCount = tablePenerimaOrderKerja.rows().count();

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
                const rowNode = tablePenerimaOrderKerja
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
    $("#tablePenerimaOrderKerja tbody tr").removeClass("selected");

    const rowNode = tablePenerimaOrderKerja.row(selectedRowIndex).node();
    $(rowNode).addClass("selected");

    // Optional: scroll into view
    rowNode.scrollIntoView({ behavior: "instant", block: "nearest" });

    // Optional: get data from the newly selected row
    // const rowData = tablePenerimaOrderKerja.row(selectedRowIndex).data();
    // console.log("Selected row data:", rowData);
}

//#endregion

async function checkUserAccess(userId) {
    try {
        const response = await fetch(`/cekuserPenerimaOrderKerja/${userId}`);
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
        '#tablePenerimaOrderKerja input[type="checkbox"]:checked'
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
        url: "/PenerimaOrderKerja/" + radiobox,
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
    if ($('#tablePenerimaOrderKerja input[type="checkbox"]:checked').length < 1)
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

prosesmodaltunda.addEventListener("click", async function (event) {
    event.preventDefault();
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

        $('#tablePenerimaOrderKerja input[type="checkbox"]:checked').each(
            function () {
                var tr = $(this).closest("tr")[0];
                var row = tablePenerimaOrderKerja.row(tr);

                no_order = this.value;
                index = row.index();
                trselect = tr;
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
                tglOrder.value = tablePenerimaOrderKerja.cell(index, 1).data();
                NoOrder.value = tablePenerimaOrderKerja.cell(index, 0).data();
                NoGambar.value = tablePenerimaOrderKerja.cell(index, 5).data();
                KdBarang.value = tablePenerimaOrderKerja.cell(index, 4).data();
                Divisi.value = tablePenerimaOrderKerja.cell(index, 8).data();
                NamaBarang.value = tablePenerimaOrderKerja
                    .cell(index, 3)
                    .data();
                KeteranganOrder.value = tablePenerimaOrderKerja
                    .cell(index, 10)
                    .data();
                JumlahOrder.value = tablePenerimaOrderKerja
                    .cell(index, 6)
                    .data();
                LabelStatus.textContent = tablePenerimaOrderKerja
                    .cell(index, 7)
                    .data();
            }

            function loadStok(kodeBarang) {
                if (!kodeBarang) return;
                fetch("/LoadStokPenerimaOrderKerja/" + kodeBarang)
                    .then((response) => response.json())
                    .then((datas) => {
                        if (datas.length > 0) {
                            primermodal.value =
                                datas[0].SaldoPrimer + " " + datas[0].SPrimer;
                            sekundermodal.value =
                                datas[0].SaldoSekunder +
                                " " +
                                datas[0].SSekunder;
                            tertiermodal.value =
                                datas[0].SaldoTritier + " " + datas[0].STritier;
                        }
                    });
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

            // === Early exits for blocking conditions ===
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
                showAlert("Pemberitahuan", "Order Kerja Finished");
                return;
            }

            // === Order kerja (red or blue) ===
            if ((isRed || isBlue) && kerjaChecked) {
                fetch("/namauserPenerimaOrderKerja/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        LblNamaUser.value = datas[0].NamaUser;
                    });

                JumlahOrderSelesai.disabled = true;
                TanggalFinish.disabled = true;

                fillOrderData(index);
                Usermodalkoreksi.value = user;

                loadStok(KdBarang.value);
                showModalKoreksi("#TanggalStart");
            }

            // === Order selesai (blue only) ===
            else if (isBlue && selesaiChecked) {
                fetch("/namauserPenerimaOrderKerja/" + user)
                    .then((response) => response.json())
                    .then((datas) => {
                        LblNamaUser.value = datas[0].NamaUser;
                    });

                JumlahOrderSelesai.disabled = false;
                TanggalFinish.disabled = false;

                fillOrderData(index);
                Usermodalkoreksi.value = user;

                loadStok(KdBarang.value);
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
                                    url: "/PenerimaOrderKerja/order_batal",
                                    type: "PUT",
                                    data: {
                                        _token: csrfToken,
                                        ketbatal: result.value,
                                        no_order: no_order,
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
                ? "/PenerimaOrderKerja/order_kerja"
                : "/PenerimaOrderKerja/order_selesai",
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

batalmodalkoreksi.addEventListener("click", function (e) {
    e.preventDefault();
    $("#ModalKoreksi").modal("hide");
});
