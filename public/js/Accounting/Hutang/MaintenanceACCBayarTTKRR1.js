$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    // let table_atas = $("#table_atas").DataTable();
    let checkbox_all = document.getElementById("checkbox_all");
    let btn_refresh = document.getElementById("btn_refresh");
    let btn_ttditunai = document.getElementById("btn_ttditunai");
    let btn_proses = document.getElementById("btn_proses");
    let tt_modal = document.getElementById("tt_modal");
    let supplier_modal = document.getElementById("supplier_modal");
    let nilai_tt = document.getElementById("nilai_tt");
    let btn_batal_modal = document.getElementById("btn_batal_modal");
    let close_modal = document.getElementById("close_modal");
    let checkedRows = [];

    let = table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceACCBayarTTKRR1/getPengajuan",
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
                data: "Waktu_Penagihan",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NM_SUP" },
            { data: "Nama_MataUang" },
            { data: "Nilai_Penagihan" },
            { data: "Lunas" },
        ],
    });

    checkbox_all.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(
            '#table_atas input[type="checkbox"][name="penerimaCheckbox"]'
        );
        checkedRows = []; // Reset checkedRows when selecting/deselecting all

        checkboxes.forEach(function (checkbox) {
            checkbox.checked = checkbox_all.checked;

            if (checkbox_all.checked) {
                let row = table_atas.row($(checkbox).closest("tr")).data();
                checkedRows.push(row);
            }
        });
    });

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            rowData = table_atas.row($(this).closest("tr")).data();

            if (this.checked) {
                checkedRows.push(rowData); // Add checked row data to the array
            } else {
                checkedRows = checkedRows.filter(
                    (row) => row.Waktu_Penagihan !== rowData.Waktu_Penagihan
                ); // Remove unchecked row data
            }
            console.log(checkedRows); // Debugging output
        }
    );

    btn_refresh.addEventListener("click", async function (event) {
        event.preventDefault();
        $("#table_atas").DataTable().ajax.reload();
    });

    btn_ttditunai.addEventListener("click", async function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(document.getElementById("TTModal"), {
            keyboard: false,
        });
        myModal.show();
    });

    tt_modal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            $("#table_atas").DataTable().ajax.reload();
            $.ajax({
                url: "MaintenanceACCBayarTTKRR1/getTT",
                type: "GET",
                data: {
                    _token: csrfToken,
                    tt_modal: tt_modal.value,
                },
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                success: function (response) {
                    if (response.length == 0) {
                        alert("Data Tidak Ada");
                    } else {
                        supplier_modal.value = response.NM_SUP;
                        nilai_tt.value = response.Nilai_Pembayaran;
                    }
                    console.log(response);
                },
                error: function (error) {
                    console.error("Error Fetch Data:", error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        }
    });

    btn_batal_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        tt_modal.value = "";
        supplier_modal.value = "";
        nilai_tt.value = "";
    });

    close_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        tt_modal.value = "";
        supplier_modal.value = "";
        nilai_tt.value = "";
    });
});
