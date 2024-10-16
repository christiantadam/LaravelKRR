$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_customer = document.getElementById("btn_customer");
    let tanggal = document.getElementById("tanggal");
    let tanggalPEB = document.getElementById("tanggalPEB");
    let tanggalBL = document.getElementById("tanggalBL");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let idJenisCustomer = document.getElementById("idJenisCustomer");
    let fakturPajak = document.getElementById("fakturPajak");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });

    tanggal.valueAsDate = new Date();
    tanggalPEB.valueAsDate = new Date();
    tanggalBL.valueAsDate = new Date();

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
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
                                url: "PenagihanPenjualanEksport/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "Kode",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        // $("#customerTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
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
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );
                    // id_cust.value = selectedRow.IDCust.trim().substring(0, 3);
                    idCustomer.value = selectedRow.TIdCustomer.trim();
                    idJenisCustomer.value = selectedRow.TIdJnsCust.trim();

                    console.log(idCustomer.value);
                    console.log(idJenisCustomer.value);


                    // if (id_cust.value == "NPX") {
                    //     btn_pajak.disabled = true;
                    // } else {
                    //     btn_pajak.disabled = false;
                    // }

                    // $.ajax({
                    //     url: "MaintenanceNotaPenjualanTunai/getJenisCustomer",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         idCustomer: idCustomer.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         jenisCustomer.value = data.TJenisCust;
                    //         alamat.value = data.TAlamat;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });

                    // setTimeout(() => {
                    //     btn_noSP.focus();
                    // }, 300);

                    // if (proses == 1) {
                    //     setTimeout(() => {
                    //         btn_noSP.focus();
                    //     }, 300);
                    // } else if (proses == 2 || proses == 3) {
                    //     setTimeout(() => {
                    //         btn_penagihan.focus();
                    //     }, 300);
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
