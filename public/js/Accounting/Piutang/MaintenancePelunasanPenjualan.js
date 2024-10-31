var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let noPelunasanSelect = document.getElementById('noPelunasanSelect');
let jenisPembayaranSelect = document.getElementById('jenisPembayaranSelect');
let mataUangSelect = document.getElementById('mataUangSelect');
let informasiBankSelect = document.getElementById('informasiBankSelect');
let nilaiMasukKas = document.getElementById('nilaiMasukKas');
let buktiPelunasan = document.getElementById('buktiPelunasan');
// let tabelPelunasanPenjualan = document.getElementById('tabelPelunasanPenjualan');
let totalPelunasan = document.getElementById('totalPelunasan');
let nilaiPiutang = document.getElementById('nilaiPiutang');
let totalBiaya = document.getElementById('totalBiaya');
let kurangLebih = document.getElementById('kurangLebih');
let tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
let IdPelunasan = document.getElementById('IdPelunasan');;
let Id_Pelunasan = document.getElementById('Id_Pelunasan');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

let btnAddItem = document.getElementById('btnAddItem');
let btnEditItem = document.getElementById('btnEditItem');
let btnDeleteItem = document.getElementById('btnDeleteItem');
let modalLihatPenagihan = document.getElementById('modalLihatPenagihan');
// let methodLihatPenagihan = document.getElementById('methodLihatPenagihan');
// let formLihatPenagihan = document.getElementById('formLihatPenagihan');
let btnSimpanModal = document.getElementById('btnSimpanModal');
// let statusBayar = document.getElementById('statusBayar');

let btn_cust = document.getElementById('btn_cust');
let btn_pelunasan = document.getElementById('btn_pelunasan');
let btn_jenisPmb = document.getElementById('btn_jenisPmb');
let btn_bank = document.getElementById('btn_bank');
let btn_mtUang = document.getElementById('btn_mtUang');
let btnSimpan = document.getElementById('btnSimpan');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnHapus = document.getElementById('btnHapus');
let btnIsi = document.getElementById('btnIsi');
let btnBatal = document.getElementById('btnBatal');

//HIDDEN
let idCustomer = document.getElementById('idCustomer');
let idJenisCustomer = document.getElementById('idJenisCustomer');
let idJenisPembayaran = document.getElementById('idJenisPembayaran');
let idMataUang = document.getElementById('idMataUang');
let idReferensi = document.getElementById('idReferensi');
let cust;
let proses;
let prosesmodal;
// let noPen = document.getElementById('noPen');
// let no_Pen = document.getElementById('no_Pen');
// let noPen1 = document.getElementById('noPen1');
// let no_Pen1 = document.getElementById('no_Pen1');
let arrayDetail = document.getElementById('arrayDetail');
let arrayPenagihan = document.getElementById('arrayPenagihan');
let hAtauB = document.getElementById('hAtauB');

//HIDDEN (TABEL)
let tabelIdDetailPelunasan = document.getElementById('tabelIdDetailPelunasan');
let tabelIdPenagihan = document.getElementById('tabelIdPenagihan');
let tabelNilaiPelunasan = document.getElementById('tabelNilaiPelunasan');
let tabelPelunasanRupiah = document.getElementById('tabelPelunasanRupiah');
let tabelBiaya = document.getElementById('tabelBiaya');
let tabelLunas = document.getElementById('tabelLunas');
let tabelPelunasanCurrency = document.getElementById('tabelPelunasanCurrency');
let tabelKurangLebih = document.getElementById('tabelKurangLebih');
let tabelKodePerkiraan = document.getElementById('tabelKodePerkiraan');
let tabelIdDetail = document.getElementById('tabelIdDetail');

//MODAL
let totalKembalian = 0;
let noPenagihan = document.getElementById('noPenagihan');
let nilaiPenagihan = document.getElementById('nilaiPenagihan');
let mataUangPenagihan = document.getElementById('mataUangPenagihan');
let nilaiKurs = document.getElementById('nilaiKurs');
let terbayar = document.getElementById('terbayar');
let terbayarRupiah = document.getElementById('terbayarRupiah');
let pelunasanCurrency = document.getElementById('pelunasanCurrency');
let pelunasanRupiah = document.getElementById('pelunasanRupiah');
let jumlahYangDibayar = document.getElementById('jumlahYangDibayar');
let sisa = document.getElementById('sisa');
let sisaRupiah = document.getElementById('sisaRupiah');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let nilaiBiaya = document.getElementById('nilaiBiaya');
let nilaiKurangLebih = document.getElementById('nilaiKurangLebih');
let noPenagihan1 = document.getElementById('noPenagihan1');
let lunas = document.getElementById('lunas');
let btn_noPenagihan = document.getElementById('btn_noPenagihan');
let btn_noPenagihan1 = document.getElementById('btn_noPenagihan1');
let btn_kodePerkiraan = document.getElementById('btn_kodePerkiraan');

let matauang;
let Z = 0;
let sNilai_Pelunasan = 0;
let sBiaya = 0;
let sKurangLebih = 0;
let sPelunasan_Rupiah = 0;
let sPelunasan_curency = 0;
let listHapus = [];
let listHapusPenagihan = [];
let sUser, user_id;
let sMasukKas;

nilaiMasukKas.value = 0;

const formattedDate2 = new Date().toISOString().substring(0, 10);
tanggalInput.value = formattedDate2;

btnIsi.focus();

tanggalInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btn_cust.focus();
    }
});

// fungsi dapetin user id
function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'MaintenancePelunasanPenjualan/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            user_id = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggalInput.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    jenisPembayaranSelect.removeAttribute("readonly");
    buktiPelunasan.removeAttribute("readonly");
    totalPelunasan.removeAttribute("readonly");
    totalBiaya.removeAttribute("readonly");
    nilaiPiutang.removeAttribute("readonly");
    kurangLebih.removeAttribute("readonly");
    mataUangSelect.removeAttribute("readonly");
    nilaiMasukKas.removeAttribute("readonly");
    // jenisCustomer.removeAttribute("readonly");
    // alamat.removeAttribute("readonly");
    // nomorSPSelect.removeAttribute("readonly");
    // nomorPO.removeAttribute("readonly");
    // nilaiKurs.removeAttribute("readonly");
    // syaratPembayaran.removeAttribute("readonly");
    // userPenagihSelect.removeAttribute("readonly");
    // dokumenSelect.removeAttribute("readonly");
    // jenisPajakSelect.removeAttribute("readonly");
    // Ppn.removeAttribute("readonly");

    proses = 1;
    cust = 1;
    btn_cust.focus();

    totalPelunasan.value = parseFloat(0).toFixed(2);
    totalBiaya.value = parseFloat(0).toFixed(2);
    nilaiPiutang.value = parseFloat(0).toFixed(2);
    kurangLebih.value = parseFloat(0).toFixed(2);
    // TampilCust();
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();

    tanggalInput.value = "";
    namaCustomerSelect.selectedIndex = 0;
    idCustomer.value = "";
    idJenisCustomer.value = "";
    noPelunasanSelect.selectedIndex = 0;
    jenisPembayaranSelect.selectedIndex = 0;
    idJenisPembayaran.value = "";
    informasiBankSelect.selectedIndex = 0;
    idReferensi.value = "";
    mataUangSelect.selectedIndex = 0;
    idMataUang.value = "";
    nilaiMasukKas.value = "";
    buktiPelunasan.value = "";
    tabelPelunasanPenjualan.clear().draw();
    totalPelunasan.value = "";
    totalBiaya.value = "";
    nilaiPiutang.value = "";
    kurangLebih.value = "";
});

// Function to handle keydown events for table navigation
function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
}
// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

// button customer
btn_cust.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Customer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Customer</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: cust === 1 ? "/getCustIsi/" : "/getCustKoreksi/",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IDCust" },
                            { data: "NAMACUST" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                namaCustomerSelect.value = decodeHtmlEntities(result.value.NAMACUST.trim());
                const selectedValue = result.value.IDCust.trim();
                const bagiansatu = selectedValue.split(/[-|]/);
                const jenis = bagiansatu[0];
                const idcust = bagiansatu[1];
                idCustomer.value = idcust;
                idJenisCustomer.value = jenis;

                btn_jenisPmb.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button pelunasan
btn_pelunasan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Pelunasan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Customer</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/getListPelunasan/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "ID_Pelunasan" },
                            { data: "Nilai_Pelunasan" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                noPelunasanSelect.value = result.value.Nilai_Pelunasan.trim();
                IdPelunasan.value = result.value.ID_Pelunasan.trim();

                if (noPelunasanSelect.value !== '') {
                    LihatHeaderPelunasan(noPelunasanSelect.value);

                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function LihatHeaderPelunasan(idPelunasan) {
    $.ajax({
        type: 'GET',
        url: "/getDataPelunasanTagihan/" + idPelunasan,
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            console.log(result);
            totalKembalian = result.value.TotalKembalian ? parseFloat(result.value.TotalKembalian.trim()) : 0;

            tanggalInput.value = result.value.Tgl_Pelunasan.trim();
            idJenisPembayaran.value = result.value.Id_Jenis_Bayar.trim();
            jenisPembayaranSelect.value = result.value.Jenis_Pembayaran.trim();
            idMataUang.value = result.value.Id_MataUang.trim();
            mataUangSelect.value = result.value.Nama_MataUang.trim();
            nilaiPiutang.value = result.value.Nilai_Pelunasan.trim();
            buktiPelunasan.value = result.value.No_Bukti ? result.value.TotalKembalian.trim() : '';
            sUser = result.value.UserInput.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function LihatDetailPelunasan(idPelunasan) {
    fetch("/LihatDetailPelunasan/" + idPelunasan)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            if ($.fn.DataTable.isDataTable("#tabelPelunasanPenjualan")) {
                tabelPelunasanPenjualan.destroy();
            }
            tabelPelunasanPenjualan = $("#tabelPelunasanPenjualan").DataTable({
                data: options,
                columns: [
                    { title: "Id. Penagihan", data: "ID_Penagihan" },
                    { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" },
                    { title: "Biaya", data: "Biaya" },
                    { title: "Lunas", data: "Lunas", defaultContent: "" },
                    { title: "Id. Detail Pelunasan", data: "ID_Detail_Pelunasan" },
                    { title: "Pelunasan Rupiah", data: "Pelunasan_Rupiah" },
                    { title: "Mata Uang", data: "Id_MataUang" },
                    { title: "Pelunasan Currency", data: "Pelunasan_Curency" },
                    { title: "Kurang Lebih", data: "KurangLebih" },
                    { title: "Perkiraan", data: "Kode_Perkiraan", defaultContent: "" },
                    { title: "ID_Tagihan_Pembulatan", data: "ID_Penagihan_Pembulatan", defaultContent: "" }
                ]
            });

            totalPelunasan.value = parseFloat(totalPelunasan.value) + parseFloat(options[0].Nilai_Pelunasan);
            totalBiaya.value = parseFloat(totalBiaya.value) + parseFloat(options[0].Biaya);
            kurangLebih.value = parseFloat(kurangLebih.value) + parseFloat(options[0].KurangLebih);
            nilaiMasukKas.value = parseFloat(nilaiPiutang.value) - parseFloat(nilaiBiaya.value) + parseFloat(kurangLebih.value);
        });

    // CekReferensi
    fetch("/getCekReferensiPelunasan/" + idPelunasan)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            idReferensi.value = options[0].IdReferensi;
        })
}

function Perkiraan(idPelunasan) {
    $.ajax({
        type: 'GET',
        url: "MaintenancePelunasanPenjualan/getPerkiraan",
        data: {
            _token: csrfToken,
            idPelunasan: idPelunasan
        },
        success: function (result) {
            // console.log(result);
            kodePerkiraanSelect.value = decodeHtmlEntities(result[0].Keterangan.trim());
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// button jenis pembayaran
btn_jenisPmb.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Pembayaran',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Jenis Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/getJenisPembayaran/",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                jenisPembayaranSelect.value = result.value.Jenis_Pembayaran.trim();
                idJenisPembayaran.value = result.value.Id_Jenis_Bayar.trim();

                btn_mtUang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_bank.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenancePelunasanPenjualan/getCekReferensiPelunasan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                IdPelunasan: IdPelunasan.value
                            }
                        },
                        columns: [
                            { data: "IdReferensi" },
                            { data: "Ket" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                informasiBankSelect.value = result[0].value.Ket.trim();
                idReferensi.value = result[0].value.idReferensi.trim();

                if (idReferensi.value !== '') {
                    LihatReferensi();
                    buktiPelunasan.focus();
                } else {
                    btn_bank.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button mata uang
btn_mtUang.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Mata Uang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Mata Uang</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenancePelunasanPenjualan/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_MataUang" },
                            { data: "Nama_MataUang" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                mataUangSelect.value = result.value.Nama_MataUang.trim();
                idMataUang.value = result.value.Id_MataUang.trim();

                nilaiMasukKas.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

nilaiMasukKas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nilaiMasukKas.value = parseFloat(0).toFixed(2);
        buktiPelunasan.focus();
    }
});

buktiPelunasan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnAddItem.focus();
    }
});

// button no penagihan
btn_noPenagihan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Penagihan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tgl Penagihan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenancePelunasanPenjualan/getListPenagihanSJ",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idCustomer: idCustomer.value
                            }
                        },
                        columns: [
                            { data: "Id_Penagihan" },
                            {
                                data: "Tgl_Penagihan",
                                render: function (data) {
                                    if (data) {
                                        const date = new Date(data);
                                        const month = date.getMonth() + 1;
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${month}/${day}/${year}`;
                                    }
                                    return ''; // Return empty string if date is not available
                                }
                            }
                        ],
                        columnDefs: [
                            {
                                targets: 1,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                noPenagihan.value = result.value.Id_Penagihan.trim();

                if (noPenagihan.value !== '') {
                    // Lihat_Penagihan
                    lihatPenagihan(noPenagihan.value);
                }

            }
        });
    } catch (error) {
        console.error(error);
    }
});

function lihatPenagihan(idPenagihan) {
    $.ajax({
        type: 'GET',
        url: "MaintenancePelunasanPenjualan/getListPelunasanTagihan",
        data: {
            _token: csrfToken,
            noPenagihan: idPenagihan
        },
        success: function (result) {
            // console.log(result);
            totalKembalian = result[0].TotalKembalian ? parseFloat(result[0].TotalKembalian.trim()) : 0;

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
    $.ajax({
        type: 'GET',
        url: "MaintenancePelunasanPenjualan/getLihatDetailPelunasan",
        data: {
            _token: csrfToken,
            noPenagihan: idPenagihan
        },
        success: function (result) {
            // console.log(result);

            if (result[0]) {
                nilaiPenagihan.value = numeral((parseFloat(result[0].Nilai_Penagihan.trim()) - parseFloat(totalKembalian))).format("0,0.00");
                mataUangPenagihan.value = result[0].Nama_MataUang.trim();
                nilaiKurs.value = parseFloat(result[0].NilaiKurs.trim()).toFixed(2);

                if (result[0].Tot_Pelunasan_Rupiah === null) {
                    terbayarRupiah.value = 0;
                    terbayar.value = 0;
                } else {
                    var rows = tabelPelunasanPenjualan.getElementsByTagName('tr');
                    console.log(rows.length);

                    let TotPelunasan = result[0].Tot_Pelunasan_Rupiah ? result[0].Tot_Pelunasan_Rupiah.trim() : 0;
                    let TotNilai = result[0].Tot_Nilai_Pelunasan ? result[0].Tot_Nilai_Pelunasan.trim() : 0;

                    if (rows.length >= 1) {
                        var rowCount = rows.length;

                        if (tabelIdDetailPelunasan.value === '') {
                            terbayarRupiah.value = TotPelunasan;
                            terbayar.value = TotNilai;
                        } else {
                            terbayarRupiah.value = numeral(TotPelunasan).value() - numeral(pelunasanRupiah.value.value());
                            terbayar.value = numeral(TotNilai).value() - numeral(pelunasanCurrency.value.value());
                        }
                    } else {
                        terbayarRupiah.value = TotPelunasan;
                        terbayar.value = TotNilai;
                    }
                }

                if (jumlahYangDibayar.value === '0') {
                    jumlahYangDibayar.value = numeral((numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value())).format("0,0.00");
                }
                sisa.value = numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value();
                sisaRupiah.value = (numeral(nilaiPenagihan.value).value() * numeral(nilaiKurs.value).value()) - (numeral(terbayar.value).value() * numeral(nilaiKurs.value).value());
                sisa.value = numeral(numeral(sisa.value).value()).format("0,0.00");
                sisaRupiah.value = numeral(numeral(sisaRupiah.value).value()).format("0,0.00")

                jumlahYangDibayar.focus();
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

jumlahYangDibayar.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        matauang = mataUangPenagihan.value.trim().toUpperCase();
        if (matauang !== "RUPIAH" && idMataUang.value == 1) {
            pelunasanCurrency.value = numeral((numeral(jumlahYangDibayar.value).value() / numeral(nilaiKurs.value).value())).format("0,0.00");
            pelunasanRupiah.value = numeral(numeral(jumlahYangDibayar.value).value()).format("0,0.00");
        } else {
            pelunasanCurrency.value = numeral((numeral(jumlahYangDibayar.value).value() * numeral(nilaiKurs.value).value())).format("0,0.00");
            pelunasanRupiah.value = numeral(numeral(pelunasanCurrency.value).value()).format("0,0.00");
        }
    } else {
        if (idMataUang != 1) {
            pelunasanRupiah.value = numeral(jumlahYangDibayar.value).value() * numeral(nilaiKurs.value).value();
        } else {
            pelunasanRupiah.value = numeral(jumlahYangDibayar.value).value();
        }
        pelunasanCurrency.value = numeral(numeral(jumlahYangDibayar.value).value()).format("0,0.00");
    }
    pelunasanCurrency.focus();
});

pelunasanCurrency.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btn_kodePerkiraan.focus();
    }
});

function LihatReferensi() {
    fetch("/getDataRefBank/" + idReferensi.value)
        .then((response) => response.json())
        .then((options) => {
            // console.log(options);

            options.forEach((option) => {
                //Ambil nilai Tgl_Order dari setiap objek data
                const tglInput = option.Tanggal;
                const [tanggal, waktu] = tglInput.split(" ");
                option.Tanggal = tanggal;
                tanggalInput.value = tanggal;
            });
            mataUangSelect.value = options[0].Nama_MataUang;
            idMataUang.value = options[0].Id_MataUang;
            nilaiMasukKas.value = options[0].Nilai;
            buktiPelunasan.value = options[0].No_Bukti;
            tanggalInput.value = options[0].Tanggal;

            let MU = idMataUang.value;
            let opt = mataUangSelect.options;
            for (let i = 0; i < opt.length; i++) {
                if (opt[i].value == MU) {
                    mataUangSelect.selectedIndex = i;
                    break;
                }
            };
        })
}

nilaiKurangLebih.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btn_noPenagihan1.focus();
    }
});


btn_noPenagihan1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Penagihan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tgl Penagihan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenancePelunasanPenjualan/getListPenagihanSJ",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idCustomer: idCustomer.value
                            }
                        },
                        columns: [
                            { data: "Id_Penagihan" },
                            {
                                data: "Tgl_Penagihan",
                                render: function (data) {
                                    if (data) {
                                        const date = new Date(data);
                                        const month = date.getMonth() + 1;
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${month}/${day}/${year}`;
                                    }
                                    return ''; // Return empty string if date is not available
                                }
                            }
                        ],
                        columnDefs: [
                            {
                                targets: 1,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);
                noPenagihan1.value = result.value.Id_Penagihan.trim();
                btn_kodePerkiraan.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button kode perkiraan
btn_kodePerkiraan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kode Perkiraan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Kode</th>
                            <th scope="col">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/getKdPerkiraan/",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                idKodePerkiraan.value = result.value.NoKodePerkiraan.trim();
                kodePerkiraanSelect.value = decodeHtmlEntities(result.value.Keterangan.trim());

                btnSimpanModal.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

jenisPembayaranSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = jenisPembayaranSelect.options[jenisPembayaranSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        idJenisPembayaran.value = jenis;
    }

    if (idJenisPembayaran.value == 1 || idJenisPembayaran.value == 2 || idJenisPembayaran.value == 3) {
        if (idJenisPembayaran.value == 2 || idJenisPembayaran.value == 3) {
            statusBayar.value = "B";
        } else {
            statusBayar.value = "";
        }
        informasiBankSelect.setAttribute("readonly", true);
        mataUangSelect.removeAttribute("readonly");
        nilaiMasukKas.removeAttribute("readonly");
        mataUangSelect.focus();
    } else {
        informasiBankSelect.removeAttribute("readonly");
        mataUangSelect.setAttribute("readonly", true);
        nilaiMasukKas.setAttribute("readonly", true);
        informasiBankSelect.focus();
    }
});

var selectedValue;

btnAddItem.addEventListener('click', function (event) {
    event.preventDefault();
    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    prosesmodal = 1;

    noPenagihan.value = '';
    nilaiPenagihan.value = '';
    mataUangPenagihan.value = '';
    nilaiKurs.value = '';
    terbayar.value = 0;
    terbayarRupiah.value = 0;
    sisa.value = 0;
    sisaRupiah.value = 0;
    jumlahYangDibayar.value = 0;
    pelunasanCurrency.value = 0;
    pelunasanRupiah.value = 0;
    lunas.value = 'N';
    nilaiBiaya.value = 0;
    nilaiKurangLebih.value = 0;
    idKodePerkiraan.value = '';
    kodePerkiraanSelect.value = '';
});

function handleRadioChange() {
    selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;

    // Cek nilai yang terpilih dan lakukan sesuatu berdasarkan nilai tersebut
    if (selectedValue === "1") {
        console.log("Anda memilih Pelunasan");

        kodePerkiraanSelect.removeAttribute("readonly", true);
        noPenagihan.removeAttribute("readonly", true);
        // nilaiPenagihan.removeAttribute("readonly", true);
        // nilaiKurs.removeAttribute("readonly", true);
        jumlahYangDibayar.removeAttribute("readonly", true);
        pelunasanCurrency.removeAttribute("readonly", true);
        // pelunasanRupiah.removeAttribute("readonly", true);
        // nilaiPenagihan.removeAttribute("readonly", true);
        // terbayar.removeAttribute("readonly", true);
        // terbayarRupiah.removeAttribute("readonly", true);
        // lunas.removeAttribute("readonly", true);
        nilaiBiaya.removeAttribute("readonly", true);
        nilaiKurangLebih.removeAttribute("readonly", true);
        noPenagihan1.removeAttribute("readonly", true);
        idKodePerkiraan.removeAttribute("readonly", true);
        btn_noPenagihan.removeAttribute("disabled", true);

        btn_noPenagihan.focus();
        lihatPenagihan(noPenagihan.value);

    } else if (selectedValue === "2") {
        console.log("Anda memilih Biaya Ditanggung");
        if (idJenisPembayaran.value !== 2 && idJenisPembayaran !== 3) {
            noPenagihan.setAttribute("readonly", true);
            noPen.setAttribute("readonly", true);
            no_Pen.setAttribute("readonly", true);
            nilaiPenagihan.setAttribute("readonly", true);
            nilaiKurs.setAttribute("readonly", true);
            terbayar.setAttribute("readonly", true);
            terbayarRupiah.setAttribute("readonly", true);
            mataUangPenagihan.setAttribute("readonly", true);
            jumlahYangDibayar.setAttribute("readonly", true);
            pelunasanCurrency.setAttribute("readonly", true);
            pelunasanRupiah.setAttribute("readonly", true);
            lunas.setAttribute("readonly", true);
            btn_noPenagihan.removeAttribute("disabled", true);


            nilaiBiaya.removeAttribute("readonly", true);
            nilaiKurangLebih.value = 0;
            nilaiBiaya.focus();
        } else {

        }
    } else if (selectedValue === "3") {
        console.log("Anda memilih Kurang/Lebih");
        btn_noPenagihan.setAttribute("disabled", true);
        noPenagihan.setAttribute("readonly", true);
        nilaiBiaya.setAttribute("readonly", true);
        jumlahYangDibayar.setAttribute("readonly", true);
        pelunasanCurrency.setAttribute("readonly", true);

        nilaiKurangLebih.removeAttribute("readonly", true);
        noPenagihan1.removeAttribute("readonly", true);
        nilaiKurangLebih.focus();
        nilaiBiaya.value = 0;
    }
};

// Tambahkan event listener untuk setiap tombol radio
var radioButtons = document.querySelectorAll('input[name="radiogrup1"]');
handleRadioChange();
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', handleRadioChange);
});


btnSimpanModal.addEventListener('click', function (event) {
    event.preventDefault();
    // var selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;
    // console.log("Harusnya jalan memilih Pelunasan", selectedValue);
    if (selectedValue !== "1" && selectedValue !== "2" && selectedValue !== "3") {
        alert("Tidak Ada Yang DiSimpan !!");
    }

    if (selectedValue === "1" && jumlahYangDibayar.value <= 0) {
        alert("Nilai Pelunasan Harus Diisi");
        jumlahYangDibayar.focus();
    } else if (selectedValue === "2" && nilaiBiaya.value <= 0) {
        alert("Nilai Biaya Harus Diisi");
    } else if (selectedValue === "3" && nilaiKurangLebih.value === 0) {
        alert("Nilai Kurang/Lebih Harus Diisi");
    } else if (selectedValue === "3" && nilaiKurangLebih.value < 0 && noPenagihan1.value === '') {
        alert("Nilai Kurang, Nomor Tagihan Harus Diisi");
    };

    //Jika ada bayar pakai bg/cek tidak boleh lunas
    if ((lunas.value === "" || lunas.value === " " || (lunas.value.toUpperCase() !== "Y" && lunas.value.toUpperCase() !== "N"))
        && selectedValue === 1 || (idJenisPembayaran.value === 2 || idJenisPembayaran.value === 3) || lunas.value.toUpperCase() === "Y") {
        alert("Salah Input Kolom Lunas");
        lunas.focus();
    };

    const rowCount = tabelPelunasanPenjualan.rows().count();
    // console.log("Length of tabelPelunasanPenjualan:", rowCount);
    // tabelPelunasanPenjualan.rows().every(function (index, element) {
    //     // Mendapatkan data pada kolom yang sesuai (misalnya, kolom dengan indeks 0)
    //     var rowData = this.data();
    //     console.log("masuk");
    //     // Lakukan pengecekan
    //     if (rowData[0] !== "" && rowData[0] === noPen.value && Z === 0) {
    //         alert("Data sudah diinputkan");
    //         // Fokus ke elemen yang diinginkan (misalnya, tombol CmdPenagihan)
    //         noPenagihan.focus();
    //         return false; // Keluar dari iterasi
    //     }
    // });

    if (prosesmodal === 1) {
        let totLunas = numeral(totalPelunasan.value).value() + numeral(jumlahYangDibayar.value).value();
        // console.log(totLunas);

        totalPelunasan.value = numeral(totLunas).format("0,0.00");
        totalBiaya.value = numeral(numeral(totalBiaya.value).value() + numeral(nilaiBiaya.value).value()).format("0,0.00");
        kurangLebih.value = numeral(numeral(kurangLebih.value).value() + numeral(nilaiKurangLebih.value).value()).format("0,0.00");

        tabelPelunasanPenjualan.row.add([
            noPenagihan.value,
            jumlahYangDibayar.value,
            nilaiBiaya.value,
            lunas.value.toUpperCase(),
            "",
            pelunasanRupiah.value,
            // idMataUang.value,
            pelunasanCurrency.value,
            nilaiKurangLebih.value,
            idKodePerkiraan.value,
            noPenagihan1.value
        ]).draw().node();

    } else if (prosesmodal === 2) {
        sNilai_Pelunasan = data[1];
        sPelunasan_Rupiah = data[5];
        sPelunasan_curency = data[6];

        let totLunas = numeral(totalPelunasan.value).value() - numeral(sNilai_Pelunasan).value() + numeral(jumlahYangDibayar.value).value();
        console.log(totalPelunasan.value, sNilai_Pelunasan, jumlahYangDibayar.value);

        totalPelunasan.value = numeral(totLunas).format("0.0,00");
        totalBiaya.value = numeral(numeral(totalBiaya.value).value() - numeral(sBiaya).value() + numeral(nilaiBiaya.value).value()).format("0,0.00")
        kurangLebih.value = numeral(numeral(kurangLebih.value).value() - numeral(sKurangLebih).value() + numeral(nilaiKurangLebih.value).value()).format("0,0.00")

        selectedIndex = tabelPelunasanPenjualan.$('tr.selected').index();

        updatedData.ID_Penagihan = noPenagihan.value;
        updatedData.Lunas = lunas.value;
        updatedData.Nilai_Pelunasan = jumlahYangDibayar.value;
        updatedData.Pelunasan_Rupiah = pelunasanRupiah.value;
        updatedData.Pelunasan_Curency = pelunasanCurrency.value;
        updatedData.idKode_Perkiraan = idKodePerkiraan.value;

        console.log(updatedData);
        if (selectedIndex >= 0) { // Pastikan ada baris yang dicentang
            if (data[1] === 0) {
                if (data[2] !== '0') {
                    data[2] = updatedData.Biaya;
                    sBiaya = updatedData.Biaya;
                } else {
                    data[7] = updatedData.KurangLebih;
                    sKurangLebih = updatedData.KurangLebih;
                }
            } else {
                // Perbarui data pada indeks baris yang dicentang
                data[0] = updatedData.ID_Penagihan;
                data[1] = updatedData.Nilai_Pelunasan;
                data[3] = updatedData.Lunas;
                data[5] = updatedData.Pelunasan_Rupiah;
                data[6] = updatedData.Pelunasan_Curency;
                data[8] = updatedData.idKode_Perkiraan;
            }
            tabelPelunasanPenjualan.row(selectedIndex).data(data).draw();
        }
    }
    $('#modalLihatPenagihan').find('input').val('');
    $('#modalLihatPenagihan').modal('hide');
});

// var selectedRows = [];
var data;

// $("#tabelPelunasanPenjualan tbody").off("click", "tr");
$("#tabelPelunasanPenjualan tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelPelunasanPenjualan tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelPelunasanPenjualan").DataTable();
    data = table.row(this).data();
    // selectedRows = table.rows(".selected").data().toArray();
    // console.log(selectedRows[0], data);
    console.log(data);
    // suratPesanan.value = selectedRows[0].Keterangan;

    if (proses == 1) {
        tabelIdDetailPelunasan.value = data[4];
        tabelIdPenagihan.value = data[0];
        tabelNilaiPelunasan.value = data[1];
        tabelPelunasanRupiah.value = data[5];
        tabelBiaya.value = data[2];
        tabelLunas.value = data[3];
        tabelPelunasanCurrency.value = data[6];
        tabelKurangLebih.value = data[7];
        tabelKodePerkiraan.value = data[8];
        tabelIdDetail.value = data[9];
    } else if (proses == 2 || proses == 3) {
        tabelIdDetailPelunasan.value = data[4];
        tabelIdPenagihan.value = data[0];
        tabelNilaiPelunasan.value = data[1];
        tabelPelunasanRupiah.value = data[5];
        tabelBiaya.value = data[2];
        tabelLunas.value = data[3];
        tabelPelunasanCurrency.value = data[6];
        tabelKurangLebih.value = data[7];
        tabelKodePerkiraan.value = data[8];
        tabelIdDetail.value = data[9];
    }
});

var selectedIndex;
var updatedData = {};

btnEditItem.addEventListener('click', function (event) {
    event.preventDefault();
    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    prosesmodal = 2;

    nilaiBiaya.value = 0;
    nilaiKurangLebih.value = 0;

    idKodePerkiraan.value = data[8];
    if (idKodePerkiraan.value !== '') {
        Perkiraan(idKodePerkiraan.value);
    }

    if (proses === 1) {
        if (data[1] === 0) {
            if (data[2] !== '0') {
                var radiobutton = document.querySelector('input[type="radio"][value="2"]');

                nilaiBiaya.value = numeral(numeral(data[2]).value()).format("0,0.00");
                sBiaya = nilaiBiaya.value;

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiBiaya.focus();
            } else {
                console.log("masuk value 3");
                var radiobutton = document.querySelector('input[type="radio"][value="3"]');
                nilaiKurangLebih.value = numeral(numeral(data[7]).value()).format("0,0.00");
                sKurangLebih = nilaiKurangLebih.value;

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiKurangLebih.focus();
            }
        } else {
            // noPenagihan.setAttribute("readonly", true);
            nilaiPenagihan.setAttribute("readonly", true);
            idKodePerkiraan.setAttribute("readonly", true);
            kodePerkiraanSelect.setAttribute("readonly", true);

            noPenagihan.value = data[0];
            lunas.value = data[3];
            jumlahYangDibayar.value = numeral(numeral(data[1]).value()).format("0,0.00");
            pelunasanRupiah.value = numeral(numeral(data[5]).value()).format("0,0.00");
            pelunasanCurrency.value = numeral(numeral(data[6]).value()).format("0,0.00");

            var radiobutton = document.querySelector('input[type="radio"][value="1"]');
            if (radiobutton) {
                radiobutton.checked = true;
            }

            sNilai_Pelunasan = jumlahYangDibayar.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            lihatPenagihan(noPenagihan.value);
            jumlahYangDibayar.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        }
    } else if (proses === 2) {
        if (numeral(data[1]).value() === 0) {
            if (numeral(data[2]).value() !== 0) {
                nilaiBiaya.value = numeral(numeral(data[2]).value()).format("0,0.00");
                sBiaya = nilaiBiaya.value;
                var radiobutton = document.querySelector('input[type="radio"][value="2"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiBiaya.focus();
            } else {
                nilaiKurangLebih.value = numeral(numeral(data[7]).value()).format("0,0.00");
                sKurangLebih = nilaiKurangLebih.value;
                console.log("masuk value 3");
                var radiobutton = document.querySelector('input[type="radio"][value="3"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiKurangLebih.focus();
            }
        } else {
            noPenagihan.value = data[0];
            lunas.value = data[3];
            nilaiBiaya.value = numeral(numeral(data[2]).value()).format("0,0.00");
            nilaiKurangLebih.value = numeral(numeral(data[7]).value()).format("0,0.00");
            jumlahYangDibayar.value = numeral(numeral(data[1]).value()).format("0,0.00");
            pelunasanRupiah.value = numeral(numeral(data[5]).value()).format("0,0.00");
            pelunasanCurrency.value = numeral(numeral(data[6]).value()).format("0,0.00");

            var radiobutton = document.querySelector('input[type="radio"][value="1"]');
            if (radiobutton) {
                radiobutton.checked = true;
            }

            sNilai_Pelunasan = jumlahYangDibayar.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            jumlahYangDibayar.focus();
        }
    }
});

btnDeleteItem.addEventListener('click', function (event) {
    event.preventDefault();
    var rowCount = tabelPelunasanPenjualan.rows().count();

    if (rowCount > 1) {
        totLunas = numeral(totalPelunasan.value).value() - numeral(data[1]).value();
        totalPelunasan.value = numeral(totLunas).format("0,0.00");
        totalBiaya.value = numeral(numeral(totalBiaya.value).value() - data.Biaya).format("0,0.00");
        nilaiMasukKas.value = numeral(numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value()).format("0,0.00");

        if (data[4] !== "") {
            listHapus.push(data[4]);
            listHapusPenagihan.push(data[0]);
            // console.log("List hapus: ",listHapus);
        }

        tabelPelunasanPenjualan.rows('.selected').remove().draw();
    }
});

btnSimpan.addEventListener('click', function (event) {
    event.preventDefault();

    var tanggalHariIni = new Date().toISOString().substring(0, 10);

    if (tanggalInput.value > tanggalHariIni) {
        alert("Tanggal input melebihi tanggal sekarang");
    }

    console.log(sUser, user_id, proses);
    if ((sUser !== user_id) && proses === 2) {
        alert("Anda Tidak Berhak Mengoreksi Data milik User")
    }

    console.log(nilaiMasukKas.value, totalPelunasan.value, totalBiaya.value, kurangLebih.value);
    if (parseFloat(nilaiMasukKas.value) < (parseFloat(totalPelunasan.value) - parseFloat(totalBiaya.value) + parseFloat(kurangLebih.value))) {
        alert("Uang Yang Masuk Tidak Balance dg Pelunasan dan biaya");
    }

    if (tabelPelunasanPenjualan.rows().count() === 0) {
        alert("Data Yang Anda Masukan Belum Lengkap. Harap di cek lagi");
    }

    if (idMataUang.value !== (selectedRows[0].Id_MataUang || selectedRows[0][6])) {
        alert("Mata Uang Tidak Boleh DiGanti");
        // console.log("MASUK IF ELSE TIDAK JELAS");
    }

    if (idJenisPembayaran.value === 2 || idJenisPembayaran.value === 3) {
        statusBayar.value = "B";
    } else {
        statusBayar.value = "";
    }

    nilaiPiutang.value = totalPelunasan.value;
    sisa.value = numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value();
    sisa.value = numeral(nilaiMasukKas.value).value() - numeral(sisa.value).value();
    // sMasukKas = 0;
    sMasukKas = numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value();
    if (sMasukKas !== numeral(nilaiMasukKas.value).value()) {
        nilaiPiutang.value = nilaiMasukKas.value;
        Swal.fire({
            icon: 'question',
            text: 'Akan muncul uang muka hasil dari sisa uang masuk.' < br > 'Anda Setuju ?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            returnFocus: false,
        }).then((confirmResult) => {
            if (confirmResult.isConfirmed) {

            } else {

            }
        });
    }
    var HapusDet = listHapus.join(", ");
    arrayDetail.value = HapusDet;

    var HapusPen = listHapusPenagihan.join(", ");
    arrayPenagihan.value = HapusPen;

    if (proses === 1) {
        formkoreksi.submit();
    } else if (proses === 2) {
        methodkoreksi.value = "PUT";
        formkoreksi.action = "/MaintenancePelunasanPenjualan/" + Id_Pelunasan.value;
        formkoreksi.submit();
    } else if (proses === 3) {
        var userInput = prompt("Menghapus Pelunasan [H] Atau Batal Giro [B]");
        //userInput = hAtauB.value;
        console.log(hAtauB.value);
        if (userInput === 'H' || userInput === 'B') {
            console.log("masuk hAtauB");
            methodkoreksi.value = "DELETE";
            formkoreksi.action = "/MaintenancePelunasanPenjualan/" + Id_Pelunasan.value;
            formkoreksi.submit();
        }
    }
});

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    namaCustomerSelect.removeAttribute("readonly", true);
    mataUangSelect.removeAttribute("readonly", true);
    informasiBankSelect.removeAttribute("readonly", true);
    nilaiPiutang.removeAttribute("readonly", true);
    jenisPembayaranSelect.removeAttribute("readonly", true);

    noPelunasanSelect.removeAttribute("readonly", true);
    namaCustomerSelect.focus();

    cust = 2;
    proses = 2;
    koreksi();
});

function koreksi() {
    fetch("/getCustIsi/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            namaCustomerSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih Cust";
            namaCustomerSelect.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.IDCust; // Gunakan entry.IdCust sebagai nilai opsi
                option.innerText = entry.IDCust + "|" + entry.NAMACUST; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                namaCustomerSelect.appendChild(option);
            });
        });
    namaCustomerSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
        if (selectedOption) {
            const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
            const bagiansatu = selectedValue.split(/[-|]/);
            const jenis = bagiansatu[0];
            const idcust = bagiansatu[1];
            namacust = bagiansatu[2];
            idCustomer.value = idcust;
            idJenisCustomer.value = jenis;

            fetch("/getListPelunasan/" + idCustomer.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);
                    noPelunasanSelect.innerHTML = "";

                    const defaultOption = document.createElement("option");
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    defaultOption.innerText = "Pilih Cust";
                    noPelunasanSelect.appendChild(defaultOption);

                    options.forEach((entry) => {
                        const option = document.createElement("option");
                        option.value = entry.Id_Pelunasan; // Gunakan entry.IdCust sebagai nilai opsi
                        option.innerText = entry.Id_Pelunasan + "|" + entry.Nilai_Pelunasan; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                        noPelunasanSelect.appendChild(option);
                    });
                });
            noPelunasanSelect.addEventListener("change", function (event) {
                event.preventDefault();
                const selectedOption = noPelunasanSelect.options[noPelunasanSelect.selectedIndex];
                if (selectedOption) {
                    const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
                    const bagiansatu = selectedValue.split(/[-|]/);
                    const jenis = bagiansatu[0];
                    IdPelunasan.value = jenis;

                    Id_Pelunasan.value = IdPelunasan.value.replace(/\//g, '.');
                };

                fetch("/getDataPelunasanTagihan/" + Id_Pelunasan.value)
                    .then((response) => response.json())
                    .then((options) => {
                        console.log(options);

                        options.forEach((option) => {
                            //Ambil nilai Tgl_Order dari setiap objek data
                            const tglInput = option.Tgl_Pelunasan;
                            const [tanggal, waktu] = tglInput.split(" ");
                            option.Tgl_Pelunasan = tanggal;
                            tanggalInput.value = tanggal;
                        });

                        idJenisPembayaran.value = options[0].Id_Jenis_Bayar.trim();

                        let UM = idJenisPembayaran.value;
                        let opt = jenisPembayaranSelect.options;
                        for (let i = 0; i < opt.length; i++) {
                            if (opt[i].value == UM) {
                                jenisPembayaranSelect.selectedIndex = i;
                                break;
                            }
                        };

                        idMataUang.value = options[0].Id_MataUang.trim();

                        let MU = idMataUang.value;
                        let opt2 = mataUangSelect.options;
                        for (let i = 0; i < opt2.length; i++) {
                            if (opt2[i].value == MU) {
                                mataUangSelect.selectedIndex = i;
                                break;
                            }
                        };
                        nilaiPiutang.value = options[0].Nilai_Pelunasan.trim();
                        buktiPelunasan.value = options[0].No_Bukti.trim();
                        sUser = options[0].UserInput.trim();

                    });

                fetch("/LihatDetailPelunasan/" + Id_Pelunasan.value)
                    .then((response) => response.json())
                    .then((options) => {
                        console.log(options);
                        if ($.fn.DataTable.isDataTable("#tabelPelunasanPenjualan")) {
                            tabelPelunasanPenjualan.destroy();
                        }
                        tabelPelunasanPenjualan = $("#tabelPelunasanPenjualan").DataTable({
                            data: options,
                            columns: [
                                { title: "Id. Penagihan", data: "ID_Penagihan" },
                                { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" },
                                { title: "Biaya", data: "Biaya" },
                                { title: "Lunas", data: "Lunas" },
                                { title: "Id. Detail Pelunasan", data: "ID_Detail_Pelunasan" },
                                { title: "Pelunasan Rupiah", data: "Pelunasan_Rupiah" },
                                { title: "Mata Uang", data: "Id_MataUang" },
                                { title: "Pelunasan Currency", data: "Pelunasan_Curency" },
                                { title: "Kurang Lebih", data: "KurangLebih" },
                                { title: "Perkiraan", data: "Kode_Perkiraan" },
                                { title: "ID_Tagihan_Pembulatan", data: "ID_Penagihan_Pembulatan" }
                            ]
                        });

                        totalPelunasan.value = totalPelunasan.value + parseFloat(options[0].Nilai_Pelunasan);
                        totalBiaya.value = totalBiaya.value + parseFloat(options[0].Biaya);
                        kurangLebih.value = kurangLebih.value + parseFloat(options[0].KurangLebih);
                        nilaiMasukKas.value = nilaiPiutang.value - nilaiBiaya.value + parseFloat(kurangLebih.value);
                    });

                // fetch("/getCekReferensiPelunasan/" + Id_Pelunasan.value)
                // .then((response) => response.json())
                // .then((options) => {
                //     console.log(options);

                //     idReferensi.value = options[0].IdReferensi;
                // })
            });
        }
    })
};

btnHapus.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    namaCustomerSelect.removeAttribute("readonly", true);
    mataUangSelect.removeAttribute("readonly", true);
    informasiBankSelect.removeAttribute("readonly", true);
    nilaiPiutang.removeAttribute("readonly", true);
    jenisPembayaranSelect.removeAttribute("readonly", true);

    noPelunasanSelect.removeAttribute("readonly", true);
    namaCustomerSelect.focus();

    koreksi();
    proses = 3;
    cust = 3;
})




