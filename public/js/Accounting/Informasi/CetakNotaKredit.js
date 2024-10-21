var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let tanggal = document.getElementById('tanggal');
let namaCustomer = document.getElementById('namaCustomer');
let notaKredit = document.getElementById('notaKredit');
let statusPPN = document.getElementById('statusPPN');
let jnsNotaKredit = document.getElementById('jnsNotaKredit');
let btnCetak = document.getElementById('btnCetak');
let btn_cust = document.getElementById('btn_cust');

let id_penagihan = '';
let xnomor = '';

tanggal.valueAsDate = new Date();
btn_cust.focus();

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

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

btn_cust.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'Customer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Nota</th>
                            <th scope="col">Nama Customer</th>
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
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: '400px',
                    scrollCollapse: true,
                    order: [0, "asc"],
                    ajax: {
                        url: "CetakNotaKredit/getCustomer",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            tanggal: tanggal.value
                        }
                    },
                    columns: [
                        { data: "Id_NotaKredit" },
                        { data: "NamaCust" }
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
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result);

                id_penagihan = result.value.Id_NotaKredit.trim();
                namaCustomer.value = result.value.NamaCust.trim();

                if (id_penagihan !== '') {
                    btnCetak.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function DisplaySuratJalan(idtagih) {
    $.ajax({
        type: 'GET',
        url: 'CetakNotaKredit/getSuratJalan',
        data: {
            _token: csrfToken,
            id_penagihan: idtagih
        },
        success: function (result) {
            console.log(result);
            result.forEach(function (item, index) {
                if (xnomor !== '') {
                    xnomor += ', ';
                }
                xnomor += item.SuratJalan;
            });

            console.log('xnomor: ', xnomor);

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function DisplayDetail(idtagih) {
    $.ajax({
        type: 'GET',
        url: 'CetakNotaKredit/getDetil',
        data: {
            _token: csrfToken,
            id_penagihan: idtagih
        },
        success: function (result) {
            console.log(result);
            if (result.length > 0) {
                statusPPN.value = result[0].Status_PPN.trim();
                jnsNotaKredit.value = result[0].JnsNotaKredit.trim();
            } else {
                statusPPN.value = '';
                jnsNotaKredit.value = '';
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}


btnCetak.addEventListener('click', function (event) {
    event.preventDefault();

    DisplaySuratJalan(id_penagihan);
    DisplayDetail(id_penagihan);

    if (jnsNotaKredit.value === '1') {
        if (statusPPN.value === 'Y') {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaKreditPPN',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        } else {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaKredit',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

    } else if (jnsNotaKredit.value === '2') {
        if (statusPPN.value === 'Y') {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaPotHargaPPN',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        } else {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaPotHarga',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

    } else if (jnsNotaKredit.value === '3') {
        if (statusPPN.value === 'Y') {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaFreePPN',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        } else {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaFree',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

    } else if (jnsNotaKredit.value === '5') {
        if (statusPPN.value === 'Y') {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaSelisihPPN',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        } else {
            $.ajax({
                type: 'PUT',
                url: 'CetakNotaKredit/notaSelisih',
                data: {
                    _token: csrfToken,
                    id_penagihan: id_penagihan
                },
                success: function (result) {
                    console.log(result);


                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

    }


})

let suratJalanArray = [];
function DisplaySuratJalan() {
    fetch("/getIdSuratJalanNotaKredit/" + notaKredit.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            xnomor = "";
            if (xnomor !== "") {
                xnomor = xnomor + ", ";
            }
            xnomor = xnomor + options[0].SuratJalan;

            console.log(xnomor);
        })
};

function DisplayDetail() {
    fetch("/getDisplayDetailNotaKredit/" + notaKredit.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            statusPPN.value = options[0].Status_PPN;
            jnsNotaKredit.value = options[0].JnsNotaKredit;
        })
}
