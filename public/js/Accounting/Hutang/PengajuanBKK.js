document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let table = $("#tablepengajuanbkk").DataTable();
    let supplier1 = document.getElementById("supplier1");
    let supplier2 = document.getElementById("supplier2");
    let radiogrup_penagihan = document.getElementById("radiogrup_penagihan");
    let radiogrup_nopenagihan = document.getElementById(
        "radiogrup_nopenagihan"
    );
    let radiogrup_adadp = document.getElementById("radiogrup_adadp");
    let radiogrup_tidakdp = document.getElementById("radiogrup_tidakdp");
    let btn_bkkuangmuka = document.getElementById("btn_bkkuangmuka");
    let btn_supplier = document.getElementById("btn_supplier");
    let label_pajak = document.getElementById("label_pajak");
    let pajak = document.getElementById("pajak");

    btn_bkkuangmuka.disabled = true;
    radiogrup_adadp.disabled = true;
    radiogrup_tidakdp.disabled = true;

    radiogrup_adadp.addEventListener("click", async function (event) {
        proses = 1;
        Swal.fire({
            title: "Confirmation",
            text: "BKK Uang Muka (Yes) atau BKM Potongan (No)",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                // User clicked Yes
                console.log("User clicked Yes");
                btn_bkkuangmuka.disabled = false;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked No
                console.log("User clicked No");
                btn_bkkuangmuka.disabled = true;
            }
        });
    });

    radiogrup_tidakdp.addEventListener("click", async function (event) {
        proses = 2;
    });

    radiogrup_penagihan.addEventListener("click", async function (event) {
        // event.preventDefault();
        // $("#tablepengajuanbkk").css("visibility", "hidden");
        $("#tablepengajuanbkk")
            .parents("div.dataTables_wrapper")
            .first()
            .show();
        label_pajak.style.visibility = "hidden";
        pajak.style.visibility = "hidden";
        btn_supplier.focus();
    });

    radiogrup_nopenagihan.addEventListener("click", async function (event) {
        // event.preventDefault();
        $("#tablepengajuanbkk")
            .parents("div.dataTables_wrapper")
            .first()
            .hide();
        label_pajak.style.visibility = "visible";
        pajak.style.visibility = "visible";
        btn_supplier.focus();
    });

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
                            returnFocus: true,
                            ajax: {
                                url: "MaintenancePengajuanBKK/getSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NM_SUP",
                                },
                                {
                                    data: "NO_SUP",
                                },
                            ],
                        });
                        $("#supplierTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    supplier2.value = selectedRow.NM_SUP.trim();
                    supplier1.value = selectedRow.NO_SUP.trim();
                    radiogrup_adadp.disabled = false;
                    radiogrup_tidakdp.disabled = false;
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
