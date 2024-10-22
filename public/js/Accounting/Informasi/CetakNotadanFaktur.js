// Inisialisasi elemen-elemen ke dalam variabel
var optTunai = document.getElementById('optTunai');
var optPajakTunai = document.getElementById('optPajakTunai');
var optUM = document.getElementById('optUM');
var optNotaFaktur = document.getElementById('optNotaFaktur');
var optPajak = document.getElementById('optPajak');
var optPajakUM = document.getElementById('optPajakUM');

var tglPenagihan = document.getElementById('tgl_Penagihan');
var customer = document.getElementById('customer');
var btnBrowse = document.getElementById('btnBrowse');
var idPenagihan = document.getElementById('idPenagihan');

var btnPrev = document.getElementById('btnPrev');
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tglPenagihan.value = formattedDate2;

let sfilter, sType;
btnPrev.addEventListener("click", function (e) {
    let sfilter = '';
    let sType = '';
    let sFormula0 = xnomor;

    if (optNotaFaktur.checked) {
        sType = 'CetakNotaFaktur';
        rpt_cetakNotaFaktur();
    } else if (optPajak.checked) {
        sType = 'CetakFakturPajak';
        rpt_cetakFakturPajak();
    } else if (optTunai.checked) {
        sType = 'Cetaknotatunai';
        rpt_cetakNotaTunai();
    } else if (optPajakTunai.checked) {
        sType = 'CetakFakturPajakTunai';
        rpt_CetakFakturPajakTunai();
    } else if (optUM.checked) {
        sType = 'CetakFakturUM';
        rpt_CetakFakturUM();
    } else if (optPajakUM.checked) {
        sType = 'CetakFakturPajakUM';
        rpt_CetakFakturPajakUM();
    }
});

function rpt_cetakNotaFaktur(){

}

function rpt_cetakFakturPajak(){
    
}

function rpt_cetakNotaTunai(){
    
}

function rpt_CetakFakturPajakTunai(){
    
}

function rpt_CetakFakturUM(){
    
}

function rpt_CetakFakturPajakUM(){
    
}

btnBrowse.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Customer',
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
                            url: "CetakNotaDanFaktur/getCust",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                Tgl_Penagihan: tglPenagihan.value
                            }
                        },
                        columns: [
                            { data: "NamaCust" },
                            { data: "Id_Penagihan" },
                        ],
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
                customer.value = decodeHtmlEntities(result.value.NamaCust.trim());
                idPenagihan.value = decodeHtmlEntities(result.value.Id_Penagihan.trim());

                if (idPenagihan.value !== ''
                    && (optNotaFaktur.checked || optPajak.checked || optPajakTunai.checked || optTunai.checked || optPajakUM.checked)) {
                    Promise.all([DisplaySuratJalan(idPenagihan.value), DisplayPajak(idPenagihan.value)])
                        .then(() => {
                            btnPrev.click();
                        })
                        .catch(error => {
                            console.error('Ada error saat mengeksekusi:', error);
                        });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

let xnomor;
let sIdFakturPajak, sIdMataUang;

function DisplaySuratJalan(sid_Penagihan) {
    return new Promise((resolve, reject) => {
        xnomor = '';
        $.ajax({
            type: 'GET',
            url: 'CetakNotaDanFaktur/getSuratJalan',
            data: {
                _token: csrfToken,
                Id_Penagihan: sid_Penagihan.trim()
            },
            success: function (result) {
                if (result.length !== 0) {
                    if (xnomor !== '') {
                        xnomor += ', ';
                    }
                    xnomor += result[0].Surat_Jalan ? decodeHtmlEntities(result[0].Surat_Jalan) : '';
                }
                resolve();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}

function DisplayPajak(sid_Penagihan) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'CetakNotaDanFaktur/getPajak',
            data: {
                _token: csrfToken,
                Id_Penagihan: sid_Penagihan.trim()
            },
            success: function (result) {
                if (result.length !== 0) {
                    sIdFakturPajak = result[0].IdFakturPajak ? decodeHtmlEntities(result[0].IdFakturPajak.trim()) : '';
                    sIdMataUang = result[0].Id_MataUang ? decodeHtmlEntities(result[0].Id_MataUang.trim()) : '';
                }
                resolve();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
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