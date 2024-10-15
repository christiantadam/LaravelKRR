var btnOK = document.getElementById("btnOK");
var btnPilih = document.getElementById("btnPilih");
var btnGroup = document.getElementById("btnGroup");
var thn = document.getElementById('thn');
var bln = document.getElementById('bln');
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var idPelunasanPilih = document.getElementById('idPelunasanPilih');
var tglInputPilih = document.getElementById('tglInputPilih');
var blnPilih = document.getElementById('blnPilih');
var thnPilih = document.getElementById('thnPilih');
var jenisBayarPilih = document.getElementById('jenisBayarPilih');
var bankPilih = document.getElementById('bankPilih');
var namaBankPilih = document.getElementById('namaBankPilih');
var btnBankPilih = document.getElementById('btnBankPilih');
var mataUangPilih = document.getElementById('mataUangPilih');
var pelunasanPilih = document.getElementById('pelunasanPilih');
var buktiPilih = document.getElementById('buktiPilih');
var jenisBankPilih = document.getElementById('jenisBankPilih');
var keAPilih = document.getElementById('keAPilih');
var btnProsesPilih = document.getElementById('btnProsesPilih');

var today = new Date().toISOString().slice(0, 10);

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Tgl. Pelunasan' },
            { title: 'Id. Pelunasan' },
            { title: 'Id. Bank' },
            { title: 'Jenis Pembayaran' },
            { title: 'Mata Uang' },
            { title: 'Total Pelunasan' },
            { title: 'No. Bukti' },
            { title: 'Tgl. Pembulatan' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5, 6, 7], width: '20%', className: 'fixed-width' },]
    });

    $('#tableKurangLebih').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Jumlah Biaya' },
            { title: 'Kode Perkiraan' },
            { title: 'Id. Detail' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3], width: '20%', className: 'fixed-width' },]
    });

    $('#tablePelunasan').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Id. Penagihan' },
            { title: 'Nilai Pelunasan' },
            { title: 'Pelunasan Rupiah' },
            { title: 'Kode Perkiraan' },
            { title: 'Customer' },
            { title: 'Id. Detail' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5], width: '20%', className: 'fixed-width' },]
    });

    $('#tableBiaya').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Jumlah Biaya' },
            { title: 'Kode Perkiraan' },
            { title: 'Id. Detail' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3], width: '20%', className: 'fixed-width' },]
    });
});

$('#bln').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        thn.focus();
    }
});

$('#thn').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btnOK.focus();
    }
});

btnOK.addEventListener("click", function (e) {
    if (bln.value === '' || thn.value === '') {
        Swal.fire({
            icon: 'error',
            text: 'Isi Dulu Bulan & Tahun!!',
            returnFocus: false
        }).then(() => {
            bln.focus();
        });
    }
    else {
        tampilPelunasan();
    }
});

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

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

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

function updateDataTable(data, angka) {

    if (angka === 1) {
        var tableData = $('#tableData').DataTable();
        tableData.clear();
        data.forEach(function (item) {
            tableData.row.add([
                formatDateToMMDDYYYY(item.Tgl_Pelunasan),
                escapeHtml(item.Id_Pelunasan),
                item.Id_bank ? escapeHtml(item.Id_bank) : '',
                escapeHtml(item.Jenis_Pembayaran),
                escapeHtml(item.Nama_MataUang),
                numeral(parseFloat(item.nilai)).format("0,0.00"),
                item.No_Bukti ? escapeHtml(item.No_Bukti) : '',
                ''
            ]);
        });
        tableData.draw();
    }

}

function tampilPelunasan() {
    $.ajax({
        type: 'GET',
        url: 'BKMLC/tampilPelunasan',
        data: {
            _token: csrfToken,
            bln: bln.value,
            thn: thn.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 1);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Tidak Ada Pelunasan',
                    returnFocus: false
                }).then(() => {
                    var tableData = $('#tableData').DataTable();
                    tableData.clear().draw();
                    bln.focus();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    bln.focus(); // Set focus on the tglInput element
    // $('#modalPilihBank').modal('show');
});

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    data = table.row(this).data();
    var rowIndex = table.row(this).index();

    idPelunasanPilih.value = data[1] ? decodeHtmlEntities(data[1]) : '';
    jenisBayarPilih.value = data[3] ? decodeHtmlEntities(data[3]) : '';
    bankPilih.value = data[2] ? decodeHtmlEntities(data[2]) : '';
    mataUangPilih.value = data[4] ? decodeHtmlEntities(data[4]) : '';
    pelunasanPilih.value = data[5] ? numeral(data[5]).format("0,0.00") : '';
    buktiPilih.value = data[6] ? decodeHtmlEntities(data[6]) : '';
    keAPilih.value = rowIndex;
    tglInputPilih.value = today;
});

btnPilih.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();
    var selectedRow = table.$('tr.selected');

    if (selectedRow.length > 0) {
        $('#modalPilihBank').modal('show');
    } 
    else{
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Data Pelunasan',
            returnFocus: false
        });
    }
});
