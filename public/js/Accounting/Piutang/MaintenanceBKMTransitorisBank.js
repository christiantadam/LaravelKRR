var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// BKK Card Variables
var bln = document.getElementById('bln');
var thn = document.getElementById('thn');
var tanggalInput = document.getElementById('tanggalInput');
var idBKK = document.getElementById('idBKK');
var listBiaya = document.getElementById('listBiaya');
var idUang1 = document.getElementById('idUang1');
var symbol1 = document.getElementById('symbol1');
var mataUang1 = document.getElementById('mataUang1');
var btnMataUang1 = document.getElementById('btnMataUang1');
var jenisBank1 = document.getElementById('jenisBank1');
var uang1 = document.getElementById('uang1');
var idBank1 = document.getElementById('idBank1');
var bank1 = document.getElementById('bank1');
var btnBank1 = document.getElementById('btnBank1');
var btnBiaya = document.getElementById('btnBiaya');
var idJenisBayar1 = document.getElementById('idJenisBayar1');
var jenisBayar1 = document.getElementById('jenisBayar1');
var btnJenisBayar1 = document.getElementById('btnJenisBayar1');
var btnBG = document.getElementById('btnBG');
var idPerkiraan1 = document.getElementById('idPerkiraan1');
var perkiraan1 = document.getElementById('perkiraan1');
var btnPerkiraan1 = document.getElementById('btnPerkiraan1');
var uraian1 = document.getElementById('uraian1');

// BKM Card Variables
var tgl = document.getElementById('tgl');
var idBKM = document.getElementById('idBKM');
var listBiaya1 = document.getElementById('listBiaya1');
var idUang = document.getElementById('idUang');
var symbol = document.getElementById('symbol');
var mataUang = document.getElementById('mataUang');
var btnMataUang = document.getElementById('btnMataUang');
var kurs = document.getElementById('kurs');
var uang = document.getElementById('uang');
var idBank = document.getElementById('idBank');
var bank = document.getElementById('bank');
var btnBank = document.getElementById('btnBank');
var idJenisBayar = document.getElementById('idJenisBayar');
var jenisBayar = document.getElementById('jenisBayar');
var btnJenisBayar = document.getElementById('btnJenisBayar');
var btnBiaya1 = document.getElementById('btnBiaya1');
var idKodePerkiraan = document.getElementById('idKodePerkiraan');
var perkiraan = document.getElementById('perkiraan');
var btnPerkiraan = document.getElementById('btnPerkiraan');
var uraian2 = document.getElementById('uraian1');

var dateNow = document.getElementById('tanggal');
var today = new Date().toISOString().slice(0, 10);
tgl.value = today;
tanggalInput.value = today;

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

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return '';
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

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

btnMataUang1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Mata Uang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
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
                            url: "MaintenanceBKMTransistorisBank/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Nama_MataUang" },
                            { data: "Id_MataUang" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idUang1.value = decodeHtmlEntities(result.value.Id_MataUang.trim());
                mataUang1.value = decodeHtmlEntities(result.value.Nama_MataUang.trim());
                uang1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$('#uang1').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        // console.log(uang1.value);

        const uang1Value = parseFloat(uang1.value) || 0;

        if (uang1Value === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Jumlah Uang TIDAK BOLEH = 0!',
            }).then(() => {
                uang1.focus();
            });
            return;
        } else {
            btnBank1.focus();
        }
    }
});

btnBank1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
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
                            url: "MaintenanceBKMTransistorisBank/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Bank" },
                            { data: "Nama_Bank" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idBank1.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank1.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank1.value !== '') {
                    $.ajax({
                        type: 'GET',
                        url: 'MaintenanceBKMTransistorisBank/getAccBank',
                        data: {
                            _token: csrfToken,
                            idBank: idBank1.value
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank1.value = result[0].jenis ? decodeHtmlEntities(result[0].jenis) : '';
                                btnJenisBayar1.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$('#tanggalInput').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (tanggalInput.value > today) {
            Swal.fire({
                icon: 'error',
                text: 'Tanggal SALAH!',
            }).then(() => {
                tanggalInput.focus();
            });
            return;
        } else {
            btnMataUang1.focus();
        }
    }
});

btnJenisBayar1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Jenis Bayar',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
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
                            url: "MaintenanceBKMTransistorisBank/getJenisBayar",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idJenisBayar1.value = decodeHtmlEntities(result.value.Id_Jenis_Bayar.trim());
                jenisBayar1.value = decodeHtmlEntities(result.value.Jenis_Pembayaran.trim());

                if (parseInt(idJenisBayar1.value) === 2 || parseInt(idJenisBayar1.value) === 3
                    || parseInt(idJenisBayar1.value) === 5 || parseInt(idJenisBayar1.value) === 4) {
                    btnBG.disabled = false;
                    btnBG.focus();
                }
                else {
                    btnBG.disabled = true;
                    btnPerkiraan1.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Perkiraan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
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
                            url: "MaintenanceBKMTransistorisBank/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                idPerkiraan1.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
                perkiraan1.value = decodeHtmlEntities(result.value.Keterangan.trim());

                uraian1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var bankBg = document.getElementById('bankBg');
var jenisBg = document.getElementById('jenisBg');
var noBg = document.getElementById('noBg');
var jatuhTempo = document.getElementById('jatuhTempo');
var cetak = document.getElementById('cetak');
var btnProsesBg = document.getElementById('btnProsesBg');

var btnKoreksi = document.getElementById("btnKoreksi");
var btnHapus = document.getElementById("btnHapus");
var tableDetailBiayaBKK = document.getElementById("tableDetailBiayaBKK");

// Detail BG/CEK/TRANSFER BKK Section
var btnKoreksiBg = document.getElementById("btnKoreksiBg");
var btnHapusBg = document.getElementById("btnHapusBg");
var tableBg = document.getElementById("tableBg");

// Detail Biaya BKM Section
var btnKoreksi2 = document.getElementById("btnKoreksi2");
var btnHapus2 = document.getElementById("btnHapus2");
var tableDetailBiayaBKM = document.getElementById("tableDetailBiayaBKM");

var proses;

btnBG.addEventListener("click", function (e) {
    proses = 1;
    $('#modalBg').modal('show');
    $('#modalBg').on('shown.bs.modal', function () {
        bankBg.value = bank1.value;
        jenisBg.value = jenisBayar1.value;
        jatuhTempo.value = today;
        noBg.value = '';
        cetak.value = '';
        noBg.focus();
    });

});

$('#jatuhTempo').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        cetak.focus();
    }
});

$('#noBg').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        jatuhTempo.focus();
    }
});

$('#cetak').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        cetak.value = cetak.value.toUpperCase();
        if (cetak.value.toUpperCase() === 'T' || cetak.value.toUpperCase() === 'S' || cetak.value.toUpperCase() === 'O') {
            btnProsesBg.focus();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Hanya bisa diisi dengan status T,O,S !!..',
                returnFocus: false
            }).then(() => {
                cetak.focus();
            });
        }
    }
});

function updateDataTable(data, angka) {
    var table = $('#tableDetailBiayaBKK').DataTable();
    var tableAsal = $('#tableBg').DataTable();
    var tableTujuan = $('#tableDetailBiayaBKM').DataTable();

    if (angka === 1) {
        // table.clear();
        // data.forEach(function (item) {

        // });
        table.row.add([
            escapeHtml(data[0]),
            escapeHtml(data[1]),
            escapeHtml(data[2]),
        ]);
        table.draw();
    }
    else if (angka === 2) {
        // tableAsal.clear();
        data.forEach(function (item) {
            tableAsal.row.add([
                escapeHtml(item.IdKonversi),
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.NamaType),
                escapeHtml(item.NamaObjek),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdPenerima),
                escapeHtml(item.IdType),
            ]);
        });
        tableAsal.draw();
    }
    else if (angka === 3) {
        // tableTujuan.clear();
        data.forEach(function (item) {
            tableTujuan.row.add([
                escapeHtml(item.IdKonversi),
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.NamaType),
                escapeHtml(item.NamaObjek),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdPenerima),
                escapeHtml(item.IdType),
            ]);
        });
        tableTujuan.draw();
    }

}

btnProsesBg.addEventListener("click", function (e) {

    if (proses === 1) {
        if (jatuhTempo.value !== '' && cetak.value !== '') {
            tmpArr = [noBg.value, jatuhTempo.value, cetak.value];
            updateDataTable(tmpArr, 1);
            $('#modalBg').modal('hide');
            btnBG.disabled = true;
            btnPerkiraan1.focus();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                noBg.focus();
            });
        }
    }
});

btnKoreksiBg.addEventListener("click", function (e) {
    tmpArr = [noBg.value, jatuhTempo.value, cetak.value];

    if (proses === 1) {
        if (jatuhTempo.value !== '' && cetak.value !== '') {
            tmpArr = [noBg.value, jatuhTempo.value, cetak.value];
            updateDataTable(tmpArr, 1);
            $('#modalBg').modal('hide');
            btnBG.disabled = true;
            btnPerkiraan1.focus();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                noBg.focus();
            });
        }
    }
});

$(document).ready(function () {
    $('#tableDetailBiayaBKK').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Biaya' },
            { title: 'Kode Perkiraan' },
        ],
        scrollY: '125px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2], width: '33%', className: 'fixed-width' },
        ]
    });

    $('#tableBg').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Biaya' },
            { title: 'Kode Perkiraan' },
        ],
        scrollY: '75px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2], width: '33%', className: 'fixed-width' },
        ]
    });

    $('#tableDetailBiayaBKM').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Biaya' },
            { title: 'Kode Perkiraan' },
        ],
        scrollY: '125px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2], width: '33%', className: 'fixed-width' },
        ]
    });
});
