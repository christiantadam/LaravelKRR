$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_bank = document.getElementById("btn_bank");
    let btn_isi = document.getElementById("btn_isi");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let bank = document.getElementById("bank");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let id_penagihan = document.getElementById("id_penagihan");
    let rincian = document.getElementById("rincian");
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let jumlah_pembayaran = document.getElementById("jumlah_pembayaran");
    let id_jenisbayar = document.getElementById("id_jenisbayar");
    let rowData;

    btn_proses.style.display = "none";

    let tablepertama = $("#tablepertama").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceACCBKK/getPengajuan",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "Id_Bank" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
            { data: "Kurs_Bayar" },
            { data: "NM_SUP" },
            { data: "Id_Jenis_Bayar" },
        ],
        columnDefs: [{ targets: [10], visible: false }],
    });

    $("#tablepertama tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#tablepertama tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowData = tablepertama.row($(this).closest("tr")).data();
                console.log(rowData, this, tablepertama);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        }
    );

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        btn_isi.style.display = "none";
        btn_proses.style.display = "block";
        id_pembayaran.value = rowData.Id_Pembayaran;
        id_penagihan.value = rowData.Id_Penagihan;
        rincian.value = rowData.Rincian_Bayar;
        bank.value = rowData.Id_Bank;
        jenis_pembayaran.value = rowData.Jenis_Pembayaran;
        jumlah_pembayaran.value = rowData.Jml_JenisBayar;
        id_jenisbayar.value = rowData.Id_Jenis_Bayar;

    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="bankTable" class="display" style="width:100%"><thead><tr><th>ID Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#bankTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#bankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceACCBKK/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Bank",
                                },
                                {
                                    data: "Nama_Bank",
                                },
                            ],
                        });
                        $("#bankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    bank.value = selectedRow.Id_Bank.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
