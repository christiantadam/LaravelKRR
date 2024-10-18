$(document).ready(function () {
    //#region Get element by ID
    let table_daftarKonversi = $("#table_daftarKonversi").DataTable({
        processing: true,
        responsive: true,
        ordering: false,
        autoWidth: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "KodeBarangJBB" },
            { data: "IdTypeTujuan" },
            { data: "NamaTypeTujuan" },
            { data: "HasilPrimer" },
            { data: "HasilSekunder" },
            { data: "HasilTritier" },
            { data: "idkonversi" },
            {
                data: "idkonversi",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-success btn-acc" data-id="' +
                        data +
                        '">ACC</button> ' +
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="#detailKonversiModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
                    );
                },
            },
        ],
        columnDefs: [
            { width: "12%", targets: 0 },
            { width: "25%", targets: 1 },
            { width: "25%", targets: 6 },
        ],
    });
    let button_tambahKonversi = document.getElementById("button_tambahKonversi");
    let divisiUser = document.getElementById("divisiUser");
    let nomorUser = document.getElementById("nomorUser");
    let div_tabelDaftarKonversi = document.getElementById("div_tabelDaftarKonversi");
    //#endregion

    //#region Function Mantap-mantap

    //#endregion

    //#region Setup Form
    $('#machineGrouping').select2();
    //#endregion

    //#region add event listener
    button_tambahKonversi.addEventListener("click", function () {
        // Show SweetAlert2 with input field
        Swal.fire({
            title: 'Select Customers and Options',
            html:
                '<select id="customer-select" class="swal2-select" style="width: 100%;"></select>' +
                '<br><br>' +
                '<select id="other-select" class="swal2-select" style="width: 100%;">' +
                    '<option value="option1">Option 1</option>' +
                    '<option value="option2">Option 2</option>' +
                '</select>',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            didOpen: () => {
                // Initialize the first select2 with AJAX data
                $('#customer-select').select2({
                    placeholder: 'Select a customer',
                    ajax: {
                        url: '/your/api/endpoint', // Replace with your actual AJAX endpoint
                        dataType: 'json',
                        delay: 250,
                        processResults: function (data) {
                            return {
                                results: data.map(function (customer) {
                                    return { id: customer.id, text: customer.name };
                                })
                            };
                        }
                    }
                });

                // Initialize the second select2
                $('#other-select').select2({
                    placeholder: 'Select an option'
                });
            },
            preConfirm: () => {
                const customer = $('#customer-select').val();
                const option = $('#other-select').val();
                if (!customer || !option) {
                    Swal.showValidationMessage('Please select both fields');
                }
                return { customer, option };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result.value); // You can use the selected values here
            }
        });
    });
    //#endregion
});
