$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    // let table_atas = $("#table_atas").DataTable();
    // let table_bawah = $("#table_bawah").DataTable();
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let bkk = document.getElementById("bkk");
    let nilaiBkk = document.getElementById("nilaiBkk");
    let nilaiPembulatan = document.getElementById("nilaiPembulatan");
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");

    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;

    let = table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceBKKKRR1/getDataAwalAtas",
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
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Rincian" },
            { data: "Id_Supplier" },
        ],
        columnDefs: [{ targets: [5], visible: false }],
    });

    let = table_bawah = $("#table_bawah").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceBKKKRR1/getDataAwalBawah",
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
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Rincian" },
            { data: "Id_Supplier" },
        ],
        columnDefs: [{ targets: [1, 2], visible: false }],
    });

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        myModal.show();
    });

    btn_kodeperkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
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
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR1/getKira",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NoKodePerkiraan" }, { data: "Keterangan" }],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_kira.value = escapeHTML(selectedRow.NoKodePerkiraan.trim());
                    keterangan_kira.value = escapeHTML(selectedRow.Keterangan.trim());
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
