let csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
let btn_customer = document.getElementById("button-customer");

btn_customer.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Customer",
            html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#customerTable")
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
                    const table = $("#customerTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: true,
                        ajax: {
                            url: "MaintenanceCustomer/create",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Customer",
                            },
                            {
                                data: "Kode_Customer",
                            },
                        ],
                    });
                    $("#customerTable tbody").on("click", "tr", function () {
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
                customer.value = selectedRow.Nama_Customer.trim();
                id_customer.value = selectedRow.Kode_Customer.trim();
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
    // console.log(selectedRow);
});
