$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let supplier_1 = document.getElementById("supplier_1");
    let supplier_2 = document.getElementById("supplier_2");
    let btn_supplier = document.getElementById("btn_supplier");


    btn_supplier.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Supplier",
                html: '<table id="supplierTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#supplierTable")
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
                        const table = $("#supplierTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenancePenagihan/getSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NM_SUP" }, { data: "NO_SUP" }],
                        });
                        $("#supplierTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    supplier_2.value = escapeHTML(selectedRow.NM_SUP.trim());
                    supplier_1.value = escapeHTML(selectedRow.NO_SUP.trim());

                    // if (!TT) {
                    //     rincian.value =
                    //         "UANG MUKA - " + selectedRow.NM_SUP.trim();
                    // } else {
                    //     tablekedua = $("#tablebkkpenagihan").DataTable({
                    //         responsive: true,
                    //         processing: true,
                    //         serverSide: true,
                    //         destroy: true,
                    //         ajax: {
                    //             url: "MaintenancePengajuanBKK/getTT",
                    //             dataType: "json",
                    //             type: "GET",
                    //             data: function (d) {
                    //                 return $.extend({}, d, {
                    //                     _token: csrfToken,
                    //                     supplier1: supplier1.value,
                    //                 });
                    //             },
                    //         },
                    //         columns: [
                    //             {
                    //                 data: "Waktu_Penagihan",
                    //                 render: function (data, type, row) {
                    //                     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    //                 },
                    //             },
                    //             { data: "Id_Penagihan" },
                    //             { data: "Status_PPN" },
                    //             { data: "UangTT" },
                    //             { data: "Nilai_Penagihan" },
                    //             { data: "Lunas" },
                    //             { data: "IdUangTT" },
                    //             { data: "Id_Pembayaran" },
                    //             // { data: "TT_NoLunas" },
                    //             // { data: "isRed" },
                    //         ],
                    //         columnDefs: [{ targets: [6, 7], visible: false }],
                    //     });
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
