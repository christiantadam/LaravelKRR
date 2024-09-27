$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("btn_customer");
    let tanggal = document.getElementById("tanggal");
    let penagihanPajak = document.getElementById("penagihanPajak");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let id_cust = document.getElementById("id_cust");
    let jenisCustomer = document.getElementById("jenisCustomer");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });

    tanggal.valueAsDate = new Date();
    penagihanPajak.valueAsDate = new Date();

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
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
                                url: "FakturUangMuka/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NAMACUST",
                                },
                                {
                                    data: "IDCust",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        $("#customerTable_filter input").on(
                            "keyup",
                            function () {
                                table
                                    .columns(1) // Kolom kedua (Kode_Customer)
                                    .search(this.value) // Cari berdasarkan input pencarian
                                    .draw(); // Perbarui hasil pencarian
                            }
                        );
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(selectedRow.NAMACUST.trim());
                    id_cust.value = selectedRow.IDCust.trim().substring(0, 3);
                    idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    $.ajax({
                        url: "FakturUangMuka/getJenisCustomer",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idCustomer: idCustomer.value,
                        },
                        success: function (data) {
                            console.log(data);
                            // jenisCustomer.value = data.data[0].Buffer.trim();
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    // setTimeout(() => {
                    //     btn_kodebarang.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
