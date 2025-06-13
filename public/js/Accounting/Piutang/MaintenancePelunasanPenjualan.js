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
// let tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
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
let noPen = document.getElementById('noPen');
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
let kodePerkiraan = document.getElementById('kodePerkiraan');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let nilaiBiaya = document.getElementById('nilaiBiaya');
let nilaiKurangLebih = document.getElementById('nilaiKurangLebih');
let noPen1 = document.getElementById('noPen1');
let lunas = document.getElementById('lunas');
// let btn_noPenagihan = document.getElementById('btn_noPenagihan');
// let btn_noPenagihan1 = document.getElementById('btn_noPenagihan1');
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
let sUser, user_id, tsisa;
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

// dapetin user id
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

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function formatToMMDDYYYY(dateString) {
    const [month, day, year] = dateString.split('-'); // Assuming dateString is in 'yyyy-mm-dd'
    return `${parseInt(month)}/${day}/${year}`; // parseInt removes leading zero from month
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error("Invalid date format:", dateString);
        return "";
    }

    // Format date to yyyyMMdd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
    btnHapus.style.display = "none";

    btn_cust.disabled = false;
    btn_jenisPmb.disabled = false;
    btn_mtUang.disabled = false;
    btn_pelunasan.disabled = false;
    btn_bank.disabled = false;

    tanggalInput.removeAttribute("readonly");
    // namaCustomerSelect.removeAttribute("readonly");
    // jenisPembayaranSelect.removeAttribute("readonly");
    buktiPelunasan.removeAttribute("readonly");
    totalPelunasan.removeAttribute("readonly");
    totalBiaya.removeAttribute("readonly");
    nilaiPiutang.removeAttribute("readonly");
    kurangLebih.removeAttribute("readonly");
    btn_pelunasan.setAttribute("disabled", true);
    btn_mtUang.setAttribute("disabled", true);
    // mataUangSelect.removeAttribute("readonly");
    // nilaiMasukKas.removeAttribute("readonly");
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
    clear();

    btnIsi.style.display = "block";
    btnSimpan.style.display = "none";
    btnKoreksi.style.display = "block";
    btnBatal.style.display = "none";
    btnHapus.style.display = "block";

    btn_cust.disabled = true;
    btn_jenisPmb.disabled = true;
    btn_mtUang.disabled = true;
    btn_pelunasan.disabled = true;
    btn_bank.disabled = true;
});

function clear() {
    var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();

    tanggalInput.value = formattedDate2;
    namaCustomerSelect.value = '';
    idCustomer.value = '';
    idJenisCustomer.value = '';
    noPelunasanSelect.value = '';
    jenisPembayaranSelect.value = '';
    idJenisPembayaran.value = '';
    informasiBankSelect.value = '';
    idReferensi.value = '';
    mataUangSelect.value = '';
    idMataUang.value = '';
    nilaiMasukKas.value = 0;
    buktiPelunasan.value = '';
    tabelPelunasanPenjualan.clear().draw();
    totalPelunasan.value = 0;
    totalBiaya.value = 0;
    nilaiPiutang.value = 0;
    kurangLebih.value = 0;

    opt1.checked = false;
    opt2.checked = false;
    opt3.checked = false;

    // btn_noPenagihan.disabled = true;
    // btn_noPenagihan1.disabled = true;
    noPenagihan.prop("disabled", true);
    noPenagihan1.prop("disabled", true);

    pelunasanCurrency.readOnly = true;
    nilaiBiaya.readOnly = true;
    nilaiKurangLebih.readOnly = true;

    clearDropdowns();
}

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

abelPelunasanPenjualan').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Id. Penagihan' },
            { title: 'Nilai Pelunasan' },
            { title: 'Biaya' },
            { title: 'Lunas' },
            { title: 'Id. Detail Pelunasan' },
            { title: 'Pelunasan Rupiah' },
            { title: 'Mata Uang' },
            { title: 'Pelunasan Currency' },
            { title: 'Kurang Lebih' },
            { title: 'Perkiraan' },
            { title: 'ID_Tagihan_Pembulatan' }
        ],
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], width: '20%', className: 'fixed-width' },
        { targets: [6], visible: false }]
    });
});

// button customer
btn_cust.addEventListener("click", function (e) {
    const columnsConfig = cust === 1
        ? [
            { data: "IDCust" },
            { data: "NAMACUST" }
        ]
        : [
            { data: "idcust" },
            { data: "NamaCust" }
        ];

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
                        columns: columnsConfig,
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
                const namaCust = cust === 1 ? result.value.NAMACUST : result.value.NamaCust;
                const selectedValue = cust === 1 ? result.value.IDCust.trim() : result.value.idcust.trim();

                namaCustomerSelect.value = decodeHtmlEntities(namaCust.trim());

                const [jenis, idcust] = selectedValue.split(/[-|]/);
                idCustomer.value = idcust;
                idJenisCustomer.value = jenis;

                cust === 1 ? btn_jenisPmb.focus() : btn_pelunasan.focus();
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
                            <th scope="col">Nilai Pelunasan</th>
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
                           const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/getListPelunasan/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Pelunasan" },
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
                // IdPelunasan.value = result.value.Nilai_Pelunasan.trim();
                noPelunasanSelect.value = result.value.Id_Pelunasan.trim();

                if (noPelunasanSelect.value !== '') {
                    LihatHeaderPelunasan(noPelunasanSelect.value);
                }

                noPelunasanSelect.addEventListener('change', function () {
                    LihatHeaderPelunasan(noPelunasanSelect.value);
                });
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
            // totalKembalian = result.value.TotalKembalian ? parseFloat(result.value.TotalKembalian.trim()) : 0;

            tanggalInput.value = formatDate(result[0].Tgl_Pelunasan.trim());
            idJenisPembayaran.value = result[0].Id_Jenis_Bayar.trim();
            jenisPembayaranSelect.value = result[0].Jenis_Pembayaran.trim();
            idMataUang.value = result[0].Id_MataUang.trim();
            mataUangSelect.value = result[0].Nama_MataUang.trim();
            nilaiPiutang.value = numeral(numeral(result[0].Nilai_Pelunasan.trim()).value()).format("0,0.00");
            buktiPelunasan.value = result[0].No_Bukti ? result[0].No_Bukti.trim() : '';
            sUser = result[0].UserInput.trim();

            LihatDetailPelunasan();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function LihatDetailPelunasan() {
    fetch("/LihatDetailPelunasan/" + noPelunasanSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            if (options.length !== 0) {

                var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
                tabelPelunasanPenjualan.clear();

                options.forEach(function (item) {
                    tabelPelunasanPenjualan.row.add([
                        (item.ID_Penagihan) ?? '',
                        numeral(parseFloat(item.Nilai_Pelunasan ?? 0)).format("0,0.00"),
                        numeral(parseFloat(item.Biaya ?? 0)).format("0,0.00"),
                        (item.Lunas) ?? '',
                        (item.ID_Detail_Pelunasan) ?? '',
                        numeral(parseFloat(item.Pelunasan_Rupiah ?? 0)).format("0,0.00"),
                        (item.Id_MataUang) ?? '',
                        numeral(parseFloat(item.Pelunasan_Curency ?? 0)).format("0,0.00"),
                        numeral(parseFloat(item.KurangLebih ?? 0)).format("0,0.00"),
                        (item.Kode_Perkiraan) ?? '',
                        (item.ID_Penagihan_Pembulatan) ?? ''
                    ]);
                    totalPelunasan.value = numeral(totalPelunasan.value).value() + numeral(item.Nilai_Pelunasan).value();
                    totalPelunasan.value = numeral(numeral(totalPelunasan.value).value()).format("0,0.00");

                    totalBiaya.value = numeral(totalBiaya.value).value() + numeral(item.Biaya).value();
                    totalBiaya.value = numeral(numeral(totalBiaya.value).value()).format("0,0.00");

                    kurangLebih.value = numeral(kurangLebih.value).value() + numeral(item.KurangLebih).value();
                    kurangLebih.value = numeral(numeral(kurangLebih.value).value()).format("0,0.00");

                    nilaiMasukKas.value = numeral(nilaiPiutang.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value();
                    nilaiMasukKas.value = numeral(nilaiMasukKas.value).value() < 0
                        ? numeral(nilaiMasukKas.value).format('(0,0.00)')
                        : numeral(nilaiMasukKas.value).format('0,0.00');
                });
                tabelPelunasanPenjualan.draw();
            }
        });

    // CekReferensi
    fetch("/getCekReferensiPelunasan/" + noPelunasanSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options.length > 0) {
                informasiBankSelect.value = options[0].IdReferensi;
            } else {
                informasiBankSelect.value = '';
            }
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
            kodePerkiraan.value = decodeHtmlEntities(result[0].Keterangan.trim());
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
                // console.log('jenis: ',result);
                jenisPembayaranSelect.value = result.value.Jenis_Pembayaran.trim();
                idJenisPembayaran.value = result.value.Id_Jenis_Bayar.trim();

                mataUangSelect.value = '';
                idMataUang.value = '';
                nilaiMasukKas.value = 0;
                informasiBankSelect.value = '';

                if (idJenisPembayaran.value === '1' || idJenisPembayaran.value === '2' || idJenisPembayaran.value === '3') {
                    btn_bank.setAttribute('disabled', true);
                    btn_mtUang.focus();
                } else {
                    btn_bank.removeAttribute('disabled', true);
                    btn_mtUang.setAttribute('disabled', true);
                    nilaiMasukKas.removeAttribute('disabled', true);
                    btn_bank.focus();
                }
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
                           const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/getReferensiBank/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
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

                informasiBankSelect.value = result.value.IdReferensi.trim();
                idReferensi.value = result.value.Ket.trim();

                if (informasiBankSelect.value !== '') {
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
        nilaiMasukKas.value = numeral(nilaiMasukKas.value).format("0,0.00");
        buktiPelunasan.focus();
    }
});

buktiPelunasan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnAddItem.focus();
    }
});

// button no penagihan

// btn_noPenagihan.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Penagihan',
//             html: `
//                 <table id="table_list" class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">ID</th>
//                             <th scope="col">Tgl Penagihan</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list").DataTable().row(".selected").data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                               const table = $("#table_list").DataTable({
//                         responsive: true,
//                         processing: true,
//                         serverSide: true,
//                         paging: false,
//                         scrollY: '400px',
//                         scrollCollapse: true,
//                         order: [0, "asc"],
//                         ajax: {
//                             url: "MaintenancePelunasanPenjualan/getListPenagihanSJ",
//                             dataType: "json",
//                             type: "GET",
//                             data: {
//                                 _token: csrfToken,
//                                 idCustomer: idCustomer.value
//                             }
//                         },
//                         columns: [
//                             { data: "Id_Penagihan" },
//                             {
//                                 data: "Tgl_Penagihan",
//                                 render: function (data) {
//                                     if (data) {
//                                         const date = new Date(data);
//                                         const month = date.getMonth() + 1;
//                                         const day = String(date.getDate()).padStart(2, '0');
//                                         const year = date.getFullYear();
//                                         return `${month}/${day}/${year}`;
//                                     }
//                                     return ''; // Return empty string if date is not available
//                                 }
//                             }
//                         ],
//                         columnDefs: [
//                             {
//                                 targets: 1,
//                                 width: '100px',
//                             }
//                         ]
//                     });

//                     $("#table_list tbody").on("click", "tr", function () {
//                         table.$("tr.selected").removeClass("selected");
//                         $(this).addClass("selected");
//                         scrollRowIntoView(this);
//                     });

//                     const searchInput = $('#table_list_filter input');
//                     if (searchInput.length > 0) {
//                         searchInput.focus();
//                     }

//                     currentIndex = null;
//                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
//                 });
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // console.log(result);

//                 noPenagihan.value = result.value.Id_Penagihan.trim();

//                 if (noPenagihan.value !== '') {
//                     // Lihat_Penagihan
//                     lihatPenagihan(noPenagihan.value);
//                 }

//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

function fetchData(endpoint) {
    fetch(endpoint)
        .then((response) => response.json())
        .then((options) => {
            noPenagihan
                .empty()
                .append(`<option disabled selected>Pilih Penagihan</option>`);

            Promise.all(
                options.map((entry) => {
                    return new Promise((resolve) => {
                        const format = formatDate(entry.Tgl_Penagihan);
                        noPenagihan.append(
                            new Option(
                                `${entry.Id_Penagihan} | ${format}`,
                                entry.Id_Penagihan
                            )
                        );
                        resolve();
                    });
                })
            ).then(() => {
                noPenagihan.select2("open");
            });
        });
}

function formatDate(dateString) {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

var myModal = new bootstrap.Modal(
    document.getElementById("modalLihatPenagihan"),
    {
        keyboard: false,
    }
);

const noPenagihan = $("#noPenagihan");
noPenagihan.select2({
    dropdownParent: $(".modal-content"),
    placeholder: "Pilih Penagihan",
});

noPenagihan.on("select2:select", function () {
    const selectedPenagihan = $(this).val();
    if (selectedPenagihan) {
        fetch("/getListPenagihanSJ/" + idCustomer.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                noPen.value = selectedPenagihan;
                if (noPen.value !== '') {
                    lihatPenagihan(noPen.value);
                }
            })
            .catch((error) => {
                alert("An error occurred while fetching Penagihan data.");
            });
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
            totalKembalian = result[0]?.TotalKembalian ? parseFloat(result[0].TotalKembalian.trim()) : 0;
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
            if (result[0]) {
                nilaiPenagihan.value = numeral((parseFloat(result[0].Nilai_Penagihan.trim()) - parseFloat(totalKembalian))).format("0,0.00");
                mataUangPenagihan.value = result[0].Nama_MataUang.trim();
                nilaiKurs.value = parseFloat(result[0].NilaiKurs.trim()).toFixed(2);

                let totPelunasan = result[0]?.Tot_Pelunasan_Rupiah ? parseFloat(result[0].Tot_Pelunasan_Rupiah.trim()) : 0;
                let totNilai = result[0]?.Tot_Nilai_Pelunasan ? parseFloat(result[0].Tot_Nilai_Pelunasan.trim()) : 0;

                if (tabelIdDetailPelunasan.value === '') {
                    terbayarRupiah.value = numeral(numeral(totPelunasan).value()).format("0,0.00");
                    terbayar.value = numeral(numeral(totNilai).value()).format("0,0.00");
                } else {
                    terbayarRupiah.value = numeral(numeral(numeral(totPelunasan).value() - numeral(pelunasanRupiah.value).value()).value()).format("0,0.00");
                    terbayar.value = numeral(numeral(numeral(totNilai).value() - numeral(pelunasanCurrency.value).value()).value()).format("0,0.00");
                }

                jumlahYangDibayar.value = numeral(
                    numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value()
                ).format("0,0.00");

                sisa.value = numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value();
                sisaRupiah.value = (numeral(nilaiPenagihan.value).value() * numeral(nilaiKurs.value).value()) -
                    (numeral(terbayar.value).value() * numeral(nilaiKurs.value).value());

                sisa.value = numeral(sisa.value).format("0,0.00");
                sisaRupiah.value = numeral(sisaRupiah.value).format("0,0.00");

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
        kodePerkiraanSelect.focus();
    }
});

function LihatReferensi() {
    fetch("/getDataRefBank/" + informasiBankSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            options.forEach((option) => {
                //Ambil nilai Tgl_Order dari setiap objek data
                const tglInput = option.Tanggal;
                const [tanggal, waktu] = tglInput.split(" ");
                option.Tanggal = tanggal;
                tanggalInput.value = tanggal;
            });
            mataUangSelect.value = options[0].Nama_MataUang;
            idMataUang.value = options[0].Id_MataUang;
            nilaiMasukKas.value = numeral(numeral(options[0].Nilai).value()).format("0,0.00");
            buktiPelunasan.value = options[0].No_Bukti;
            tanggalInput.value = options[0].Tanggal;

            let MU = idMataUang.value;
            let opt = mataUangSelect.value;
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
        nilaiKurangLebih.value = numeral(numeral(nilaiKurangLebih.value).value()).format("0,0.00");
        fetchData1("/getListPenagihanSJ/" + idCustomer.value);
    }
});

nilaiBiaya.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nilaiBiaya.value = numeral(numeral(nilaiBiaya.value).value()).format("0,0.00");
        kodePerkiraanSelect.focus();
    }
});

// btn_noPenagihan1.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Penagihan',
//             html: `
//                 <table id="table_list" class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">ID</th>
//                             <th scope="col">Tgl Penagihan</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list").DataTable().row(".selected").data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
// let tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
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
let noPen = document.getElementById('noPen');
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
let kodePerkiraan = document.getElementById('kodePerkiraan');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let nilaiBiaya = document.getElementById('nilaiBiaya');
let nilaiKurangLebih = document.getElementById('nilaiKurangLebih');
let noPen1 = document.getElementById('noPen1');
let lunas = document.getElementById('lunas');
// let btn_noPenagihan = document.getElementById('btn_noPenagihan');
// let btn_noPenagihan1 = document.getElementById('btn_noPenagihan1');
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
let sUser, user_id, tsisa;
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

// dapetin user id
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

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function formatToMMDDYYYY(dateString) {
    const [month, day, year] = dateString.split('-'); // Assuming dateString is in 'yyyy-mm-dd'
    return `${parseInt(month)}/${day}/${year}`; // parseInt removes leading zero from month
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error("Invalid date format:", dateString);
        return "";
    }

    // Format date to yyyyMMdd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
    btnHapus.style.display = "none";

    btn_cust.disabled = false;
    btn_jenisPmb.disabled = false;
    btn_mtUang.disabled = false;
    btn_pelunasan.disabled = false;
    btn_bank.disabled = false;

    tanggalInput.removeAttribute("readonly");
    // namaCustomerSelect.removeAttribute("readonly");
    // jenisPembayaranSelect.removeAttribute("readonly");
    buktiPelunasan.removeAttribute("readonly");
    totalPelunasan.removeAttribute("readonly");
    totalBiaya.removeAttribute("readonly");
    nilaiPiutang.removeAttribute("readonly");
    kurangLebih.removeAttribute("readonly");
    btn_pelunasan.setAttribute("disabled", true);
    btn_mtUang.setAttribute("disabled", true);
    // mataUangSelect.removeAttribute("readonly");
    // nilaiMasukKas.removeAttribute("readonly");
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
    clear();

    btnIsi.style.display = "block";
    btnSimpan.style.display = "none";
    btnKoreksi.style.display = "block";
    btnBatal.style.display = "none";
    btnHapus.style.display = "block";

    btn_cust.disabled = true;
    btn_jenisPmb.disabled = true;
    btn_mtUang.disabled = true;
    btn_pelunasan.disabled = true;
    btn_bank.disabled = true;
});

function clear() {
    var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();

    tanggalInput.value = formattedDate2;
    namaCustomerSelect.value = '';
    idCustomer.value = '';
    idJenisCustomer.value = '';
    noPelunasanSelect.value = '';
    jenisPembayaranSelect.value = '';
    idJenisPembayaran.value = '';
    informasiBankSelect.value = '';
    idReferensi.value = '';
    mataUangSelect.value = '';
    idMataUang.value = '';
    nilaiMasukKas.value = 0;
    buktiPelunasan.value = '';
    tabelPelunasanPenjualan.clear().draw();
    totalPelunasan.value = 0;
    totalBiaya.value = 0;
    nilaiPiutang.value = 0;
    kurangLebih.value = 0;

    opt1.checked = false;
    opt2.checked = false;
    opt3.checked = false;

    // btn_noPenagihan.disabled = true;
    // btn_noPenagihan1.disabled = true;
    noPenagihan.prop("disabled", true);
    noPenagihan1.prop("disabled", true);

    pelunasanCurrency.readOnly = true;
    nilaiBiaya.readOnly = true;
    nilaiKurangLebih.readOnly = true;

    clearDropdowns();
}

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

jQuery(function ($) {
    $('#tabelPelunasanPenjualan').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Id. Penagihan' },
            { title: 'Nilai Pelunasan' },
            { title: 'Biaya' },
            { title: 'Lunas' },
            { title: 'Id. Detail Pelunasan' },
            { title: 'Pelunasan Rupiah' },
            { title: 'Mata Uang' },
            { title: 'Pelunasan Currency' },
            { title: 'Kurang Lebih' },
            { title: 'Perkiraan' },
            { title: 'ID_Tagihan_Pembulatan' }
        ],
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], width: '20%', className: 'fixed-width' },
        { targets: [6], visible: false }]
    });
});

// button customer
btn_cust.addEventListener("click", function (e) {
    const columnsConfig = cust === 1
        ? [
            { data: "IDCust" },
            { data: "NAMACUST" }
        ]
        : [
            { data: "idcust" },
            { data: "NamaCust" }
        ];

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
                jQuery(function ($) {
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
                        columns: columnsConfig,
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
                const namaCust = cust === 1 ? result.value.NAMACUST : result.value.NamaCust;
                const selectedValue = cust === 1 ? result.value.IDCust.trim() : result.value.idcust.trim();

                namaCustomerSelect.value = decodeHtmlEntities(namaCust.trim());

                const [jenis, idcust] = selectedValue.split(/[-|]/);
                idCustomer.value = idcust;
                idJenisCustomer.value = jenis;

                cust === 1 ? btn_jenisPmb.focus() : btn_pelunasan.focus();
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
                            <th scope="col">Nilai Pelunasan</th>
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
                jQuery(function ($) {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/getListPelunasan/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Pelunasan" },
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
                // IdPelunasan.value = result.value.Nilai_Pelunasan.trim();
                noPelunasanSelect.value = result.value.Id_Pelunasan.trim();

                if (noPelunasanSelect.value !== '') {
                    LihatHeaderPelunasan(noPelunasanSelect.value);
                }

                noPelunasanSelect.addEventListener('change', function () {
                    LihatHeaderPelunasan(noPelunasanSelect.value);
                });
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
            // totalKembalian = result.value.TotalKembalian ? parseFloat(result.value.TotalKembalian.trim()) : 0;

            tanggalInput.value = formatDate(result[0].Tgl_Pelunasan.trim());
            idJenisPembayaran.value = result[0].Id_Jenis_Bayar.trim();
            jenisPembayaranSelect.value = result[0].Jenis_Pembayaran.trim();
            idMataUang.value = result[0].Id_MataUang.trim();
            mataUangSelect.value = result[0].Nama_MataUang.trim();
            nilaiPiutang.value = numeral(numeral(result[0].Nilai_Pelunasan.trim()).value()).format("0,0.00");
            buktiPelunasan.value = result[0].No_Bukti ? result[0].No_Bukti.trim() : '';
            sUser = result[0].UserInput.trim();

            LihatDetailPelunasan();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function LihatDetailPelunasan() {
    fetch("/LihatDetailPelunasan/" + noPelunasanSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            if (options.length !== 0) {

                var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
                tabelPelunasanPenjualan.clear();

                options.forEach(function (item) {
                    tabelPelunasanPenjualan.row.add([
                        (item.ID_Penagihan) ?? '',
                        numeral(parseFloat(item.Nilai_Pelunasan ?? 0)).format("0,0.00"),
                        numeral(parseFloat(item.Biaya ?? 0)).format("0,0.00"),
                        (item.Lunas) ?? '',
                        (item.ID_Detail_Pelunasan) ?? '',
                        numeral(parseFloat(item.Pelunasan_Rupiah ?? 0)).format("0,0.00"),
                        (item.Id_MataUang) ?? '',
                        numeral(parseFloat(item.Pelunasan_Curency ?? 0)).format("0,0.00"),
                        numeral(parseFloat(item.KurangLebih ?? 0)).format("0,0.00"),
                        (item.Kode_Perkiraan) ?? '',
                        (item.ID_Penagihan_Pembulatan) ?? ''
                    ]);
                    totalPelunasan.value = numeral(totalPelunasan.value).value() + numeral(item.Nilai_Pelunasan).value();
                    totalPelunasan.value = numeral(numeral(totalPelunasan.value).value()).format("0,0.00");

                    totalBiaya.value = numeral(totalBiaya.value).value() + numeral(item.Biaya).value();
                    totalBiaya.value = numeral(numeral(totalBiaya.value).value()).format("0,0.00");

                    kurangLebih.value = numeral(kurangLebih.value).value() + numeral(item.KurangLebih).value();
                    kurangLebih.value = numeral(numeral(kurangLebih.value).value()).format("0,0.00");

                    nilaiMasukKas.value = numeral(nilaiPiutang.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value();
                    nilaiMasukKas.value = numeral(nilaiMasukKas.value).value() < 0
                        ? numeral(nilaiMasukKas.value).format('(0,0.00)')
                        : numeral(nilaiMasukKas.value).format('0,0.00');
                });
                tabelPelunasanPenjualan.draw();
            }
        });

    // CekReferensi
    fetch("/getCekReferensiPelunasan/" + noPelunasanSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options.length > 0) {
                informasiBankSelect.value = options[0].IdReferensi;
            } else {
                informasiBankSelect.value = '';
            }
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
            kodePerkiraan.value = decodeHtmlEntities(result[0].Keterangan.trim());
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
                jQuery(function ($) {
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
                // console.log('jenis: ',result);
                jenisPembayaranSelect.value = result.value.Jenis_Pembayaran.trim();
                idJenisPembayaran.value = result.value.Id_Jenis_Bayar.trim();

                mataUangSelect.value = '';
                idMataUang.value = '';
                nilaiMasukKas.value = 0;
                informasiBankSelect.value = '';

                if (idJenisPembayaran.value === '1' || idJenisPembayaran.value === '2' || idJenisPembayaran.value === '3') {
                    btn_bank.setAttribute('disabled', true);
                    btn_mtUang.focus();
                } else {
                    btn_bank.removeAttribute('disabled', true);
                    btn_mtUang.setAttribute('disabled', true);
                    nilaiMasukKas.removeAttribute('disabled', true);
                    btn_bank.focus();
                }
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
                jQuery(function ($) {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/getReferensiBank/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
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

                informasiBankSelect.value = result.value.IdReferensi.trim();
                idReferensi.value = result.value.Ket.trim();

                if (informasiBankSelect.value !== '') {
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
                jQuery(function ($) {
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
        nilaiMasukKas.value = numeral(nilaiMasukKas.value).format("0,0.00");
        buktiPelunasan.focus();
    }
});

buktiPelunasan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnAddItem.focus();
    }
});

// button no penagihan

// btn_noPenagihan.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Penagihan',
//             html: `
//                 <table id="table_list" class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">ID</th>
//                             <th scope="col">Tgl Penagihan</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list").DataTable().row(".selected").data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 jQuery(function ($) {
//                     const table = $("#table_list").DataTable({
//                         responsive: true,
//                         processing: true,
//                         serverSide: true,
//                         paging: false,
//                         scrollY: '400px',
//                         scrollCollapse: true,
//                         order: [0, "asc"],
//                         ajax: {
//                             url: "MaintenancePelunasanPenjualan/getListPenagihanSJ",
//                             dataType: "json",
//                             type: "GET",
//                             data: {
//                                 _token: csrfToken,
//                                 idCustomer: idCustomer.value
//                             }
//                         },
//                         columns: [
//                             { data: "Id_Penagihan" },
//                             {
//                                 data: "Tgl_Penagihan",
//                                 render: function (data) {
//                                     if (data) {
//                                         const date = new Date(data);
//                                         const month = date.getMonth() + 1;
//                                         const day = String(date.getDate()).padStart(2, '0');
//                                         const year = date.getFullYear();
//                                         return `${month}/${day}/${year}`;
//                                     }
//                                     return ''; // Return empty string if date is not available
//                                 }
//                             }
//                         ],
//                         columnDefs: [
//                             {
//                                 targets: 1,
//                                 width: '100px',
//                             }
//                         ]
//                     });

//                     $("#table_list tbody").on("click", "tr", function () {
//                         table.$("tr.selected").removeClass("selected");
//                         $(this).addClass("selected");
//                         scrollRowIntoView(this);
//                     });

//                     const searchInput = $('#table_list_filter input');
//                     if (searchInput.length > 0) {
//                         searchInput.focus();
//                     }

//                     currentIndex = null;
//                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
//                 });
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // console.log(result);

//                 noPenagihan.value = result.value.Id_Penagihan.trim();

//                 if (noPenagihan.value !== '') {
//                     // Lihat_Penagihan
//                     lihatPenagihan(noPenagihan.value);
//                 }

//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

function fetchData(endpoint) {
    fetch(endpoint)
        .then((response) => response.json())
        .then((options) => {
            noPenagihan
                .empty()
                .append(`<option disabled selected>Pilih Penagihan</option>`);

            Promise.all(
                options.map((entry) => {
                    return new Promise((resolve) => {
                        const format = formatDate(entry.Tgl_Penagihan);
                        noPenagihan.append(
                            new Option(
                                `${entry.Id_Penagihan} | ${format}`,
                                entry.Id_Penagihan
                            )
                        );
                        resolve();
                    });
                })
            ).then(() => {
                noPenagihan.select2("open");
            });
        });
}

function formatDate(dateString) {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

var myModal = new bootstrap.Modal(
    document.getElementById("modalLihatPenagihan"),
    {
        keyboard: false,
    }
);

const noPenagihan = $("#noPenagihan");
noPenagihan.select2({
    dropdownParent: $(".modal-content"),
    placeholder: "Pilih Penagihan",
});

noPenagihan.on("select2:select", function () {
    const selectedPenagihan = $(this).val();
    if (selectedPenagihan) {
        fetch("/getListPenagihanSJ/" + idCustomer.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                noPen.value = selectedPenagihan;
                if (noPen.value !== '') {
                    lihatPenagihan(noPen.value);
                }
            })
            .catch((error) => {
                alert("An error occurred while fetching Penagihan data.");
            });
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
            totalKembalian = result[0]?.TotalKembalian ? parseFloat(result[0].TotalKembalian.trim()) : 0;
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
            if (result[0]) {
                nilaiPenagihan.value = numeral((parseFloat(result[0].Nilai_Penagihan.trim()) - parseFloat(totalKembalian))).format("0,0.00");
                mataUangPenagihan.value = result[0].Nama_MataUang.trim();
                nilaiKurs.value = parseFloat(result[0].NilaiKurs.trim()).toFixed(2);

                let totPelunasan = result[0]?.Tot_Pelunasan_Rupiah ? parseFloat(result[0].Tot_Pelunasan_Rupiah.trim()) : 0;
                let totNilai = result[0]?.Tot_Nilai_Pelunasan ? parseFloat(result[0].Tot_Nilai_Pelunasan.trim()) : 0;

                if (tabelIdDetailPelunasan.value === '') {
                    terbayarRupiah.value = numeral(numeral(totPelunasan).value()).format("0,0.00");
                    terbayar.value = numeral(numeral(totNilai).value()).format("0,0.00");
                } else {
                    terbayarRupiah.value = numeral(numeral(numeral(totPelunasan).value() - numeral(pelunasanRupiah.value).value()).value()).format("0,0.00");
                    terbayar.value = numeral(numeral(numeral(totNilai).value() - numeral(pelunasanCurrency.value).value()).value()).format("0,0.00");
                }

                jumlahYangDibayar.value = numeral(
                    numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value()
                ).format("0,0.00");

                sisa.value = numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value();
                sisaRupiah.value = (numeral(nilaiPenagihan.value).value() * numeral(nilaiKurs.value).value()) -
                    (numeral(terbayar.value).value() * numeral(nilaiKurs.value).value());

                sisa.value = numeral(sisa.value).format("0,0.00");
                sisaRupiah.value = numeral(sisaRupiah.value).format("0,0.00");

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
        kodePerkiraanSelect.focus();
    }
});

function LihatReferensi() {
    fetch("/getDataRefBank/" + informasiBankSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            options.forEach((option) => {
                //Ambil nilai Tgl_Order dari setiap objek data
                const tglInput = option.Tanggal;
                const [tanggal, waktu] = tglInput.split(" ");
                option.Tanggal = tanggal;
                tanggalInput.value = tanggal;
            });
            mataUangSelect.value = options[0].Nama_MataUang;
            idMataUang.value = options[0].Id_MataUang;
            nilaiMasukKas.value = numeral(numeral(options[0].Nilai).value()).format("0,0.00");
            buktiPelunasan.value = options[0].No_Bukti;
            tanggalInput.value = options[0].Tanggal;

            let MU = idMataUang.value;
            let opt = mataUangSelect.value;
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
        nilaiKurangLebih.value = numeral(numeral(nilaiKurangLebih.value).value()).format("0,0.00");
        fetchData1("/getListPenagihanSJ/" + idCustomer.value);
    }
});

nilaiBiaya.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nilaiBiaya.value = numeral(numeral(nilaiBiaya.value).value()).format("0,0.00");
        kodePerkiraanSelect.focus();
    }
});

// btn_noPenagihan1.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Penagihan',
//             html: `
//                 <table id="table_list" class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">ID</th>
//                             <th scope="col">Tgl Penagihan</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list").DataTable().row(".selected").data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 jQuery(function ($) {