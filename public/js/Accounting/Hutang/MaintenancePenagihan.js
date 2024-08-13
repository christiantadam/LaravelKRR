$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let supplier_1 = document.getElementById("supplier_1");
    let supplier_2 = document.getElementById("supplier_2");
    let subtotal = document.getElementById("subtotal");
    let ppn_price = document.getElementById("ppn_price");
    let total_price = document.getElementById("total_price");
    let tanggal_penagihan = document.getElementById("tanggal_penagihan");
    let idjenis_pph = document.getElementById("idjenis_pph");
    let jenis_pph = document.getElementById("jenis_pph");
    let idpph_percent = document.getElementById("idpph_percent");
    let pph_percent = document.getElementById("pph_percent");
    let no_bttb = document.getElementById("no_bttb");
    let no_suratjalan = document.getElementById("no_suratjalan");
    let no_po = document.getElementById("no_po");
    let sub_total = document.getElementById("sub_total");
    let ppn_1 = document.getElementById("ppn_1");
    let ppn_2 = document.getElementById("ppn_2");
    let total_price_bottom = document.getElementById("total_price_bottom");
    let kurs = document.getElementById("kurs");
    let no_faktur_pajak = document.getElementById("no_faktur_pajak");
    let btn_supplier = document.getElementById("btn_supplier");
    let btn_display = document.getElementById("btn_display");
    let btn_input = document.getElementById("btn_input");
    let btn_jnspph = document.getElementById("btn_jnspph");
    let btn_pphpersen = document.getElementById("btn_pphpersen");
    let btn_update = document.getElementById("btn_update");
    let btn_remove = document.getElementById("btn_remove");
    let table_bttb = $("#table_bttb").DataTable();
    let table_detail = $("#table_detail").DataTable();
    let table_penagihan = $("#table_penagihan").DataTable();

    tanggal_penagihan.valueAsDate = new Date();

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
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_display.addEventListener("click", async function (event) {
        event.preventDefault();
        table_bttb = $("#table_bttb").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenancePenagihan/getDisplay",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        supplier_1: supplier_1.value,
                    });
                },
            },
            columns: [
                {
                    data: "No_BTTB",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxkanan" value="${data}" /> ${data}`;
                    },
                },
                { data: "No_SuratJalan" },
                { data: "No_PO" },
                { data: "SubTotal" },
                { data: "JumPPN" },
                { data: "PPN_Price" },
                { data: "TotalPrice" },
                { data: "IdMataUang" },
                { data: "Nama_MataUang" },
                { data: "Kurs_Rp" },
            ],
            // columnDefs: [{ targets: [7], visible: false }],
        });
    });

    // $("#table_bttb tbody").off("click", "tr");
    // $("#table_bttb tbody").on("click", "tr", function () {
    //     $(this).toggleClass("selected");
    //     const table_bttb = $("#table_bttb").DataTable();
    //     let selectedRows = table_bttb.rows(".selected").data().toArray();
    //     let selectedNoBTTB = selectedRows.map(function (row) {
    //         return row.No_BTTB;
    //     });

    $("#table_bttb tbody").off("click", "tr");
    $("#table_bttb tbody").on("click", "tr", function () {
        const table_bttb = $("#table_bttb").DataTable();
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $("#table_bttb tbody tr.selected").removeClass("selected");
            $(this).addClass("selected");
        }

        let selectedRows = table_bttb.rows(".selected").data().toArray();
        console.log(selectedRows);

        if (selectedRows.length === 0) {
            $("#table_detail").DataTable().clear().destroy();
            $("#table_detail").DataTable();
        } else {
            table_detail = $("#table_detail").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "MaintenancePenagihan/getBTTB",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            No_BTTB: selectedRows[0].No_BTTB ?? "",
                        });
                    },
                },
                columns: [
                    { data: "No_BTTB" },
                    { data: "No_terima" },
                    { data: "Kd_brg" },
                    { data: "nama_brg" },
                    { data: "Qty_Terima" },
                    { data: "hrg_trm" },
                    { data: "Hrg_sub_bttb" },
                    { data: "JumPPN" },
                    { data: "hrg_ppn" },
                    { data: "Harga_Terbayar" },
                    { data: "IdMataUang" },
                    { data: "Nama_MataUang" },
                    { data: "Kurs_Rp" },
                ],
            });
        }
    });

    btn_input.addEventListener("click", async function (event) {
        event.preventDefault();
        let checkedRows = [];
        $("#table_bttb tbody input[type='checkbox']:checked").each(function () {
            let rowData = table_bttb.row($(this).closest("tr")).data();
            checkedRows.push(rowData);
        });

        console.log("Checked Rows:", checkedRows);

        if (checkedRows.length > 0) {
            let firstRowKeys = Object.keys(checkedRows[0]);
            console.log("Keys in the first row of checkedRows:", firstRowKeys);
        }

        // Calculate the sum of SubTotal values
        let totalSubTotal = checkedRows.reduce((sum, row) => {
            let subTotalValue = parseFloat(row.SubTotal.replace(/,/g, ""));
            return sum + subTotalValue;
        }, 0);

        let totalPPNprice = checkedRows.reduce((sum, row) => {
            let PPNpriceValue = parseFloat(row.PPN_Price.replace(/,/g, ""));
            return sum + PPNpriceValue;
        }, 0);

        let TotalPriceprice = checkedRows.reduce((sum, row) => {
            let TotalPriceValue = parseFloat(row.TotalPrice.replace(/,/g, ""));
            return sum + TotalPriceValue;
        }, 0);

        // Assign the sum to the subtotal input field
        subtotal.value = totalSubTotal
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        ppn_price.value = totalPPNprice
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        total_price.value = TotalPriceprice.toFixed(2).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );

        // Initialize or destroy and reinitialize table_penagihan with the checked rows
        table_penagihan = $("#table_penagihan").DataTable({
            responsive: true,
            processing: true,
            destroy: true,
            data: checkedRows,
            columns: [
                { data: "No_BTTB" },
                { data: "No_SuratJalan" },
                { data: "No_PO" },
                { data: "SubTotal" },
                { data: "JumPPN" },
                { data: "PPN_Price" },
                { data: "TotalPrice" },
                { data: "IdMataUang" },
                { data: "Nama_MataUang" },
                { data: "Kurs_Rp" },
                {
                    data: "No_Faktur_Pajak",
                    defaultContent: "",
                },
            ],
        });
    });

    $("#table_penagihan tbody").off("click", "tr");
    $("#table_penagihan tbody").on("click", "tr", function () {
        const table_penagihan = $("#table_penagihan").DataTable();
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $("#table_penagihan tbody tr.selected").removeClass("selected");
            $(this).addClass("selected");
        }

        let selectedRowsbawah = table_penagihan
            .rows(".selected")
            .data()
            .toArray();
        console.log(selectedRowsbawah);

        if (selectedRowsbawah.length === 0) {
            no_bttb.value = "";
            no_suratjalan.value = "";
            no_po.value = "";
            sub_total.value = "";
            ppn_1.value = "";
            ppn_2.value = "";
            total_price_bottom.value = "";
            kurs.value = "";
            no_faktur_pajak.value = "";
        } else {
            no_bttb.value = selectedRowsbawah[0].No_BTTB;
            no_suratjalan.value = selectedRowsbawah[0].No_SuratJalan;
            no_po.value = selectedRowsbawah[0].No_PO;
            sub_total.value = selectedRowsbawah[0].SubTotal;
            ppn_1.value = selectedRowsbawah[0].JumPPN;
            ppn_2.value = selectedRowsbawah[0].PPN_Price;
            total_price_bottom.value = selectedRowsbawah[0].TotalPrice;
            kurs.value = selectedRowsbawah[0].Kurs_Rp;
            no_faktur_pajak.value = selectedRowsbawah[0].No_Faktur_Pajak ?? "";
        }
    });

    btn_jnspph.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis PPH",
                html: '<table id="jenispphTable" class="display" style="width:100%"><thead><tr><th>ID</th><th>Jenis PPH</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#jenispphTable")
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
                        const table = $("#jenispphTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenancePenagihan/getJenisPPH",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "IdPPH" }, { data: "JenisPPH" }],
                        });
                        $("#jenispphTable tbody").on(
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
                    idjenis_pph.value = escapeHTML(selectedRow.IdPPH.trim());
                    jenis_pph.value = escapeHTML(selectedRow.JenisPPH.trim());
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_pphpersen.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a PPH %",
                html: '<table id="pphpersenTable" class="display" style="width:100%"><thead><tr><th>ID</th><th>Jenis PPH</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#pphpersenTable")
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
                        const table = $("#pphpersenTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenancePenagihan/getPPH",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "IdPersen" }, { data: "Persen" }],
                        });
                        $("#pphpersenTable tbody").on(
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
                    idpph_percent.value = escapeHTML(
                        selectedRow.IdPersen.trim()
                    );
                    pph_percent.value = escapeHTML(selectedRow.Persen.trim());
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_update.addEventListener("click", async function (event) {
        event.preventDefault();
        const table_penagihan = $("#table_penagihan").DataTable();
        let selectedRowIndex = table_penagihan.row(".selected").index();

        if (selectedRowIndex !== undefined && selectedRowIndex !== -1) {
            // Update the data in the selected row
            let updatedData = {
                No_BTTB: no_bttb.value,
                No_SuratJalan: no_suratjalan.value,
                No_PO: no_po.value,
                SubTotal: sub_total.value,
                JumPPN: ppn_1.value,
                PPN_Price: ppn_2.value,
                TotalPrice: total_price_bottom.value,
                Kurs_Rp: kurs.value,
                IdMataUang: table_penagihan.row(selectedRowIndex).data()
                    .IdMataUang, // Preserve original IdMataUang
                Nama_MataUang: table_penagihan.row(selectedRowIndex).data()
                    .Nama_MataUang, // Preserve original Nama_MataUang
                No_Faktur_Pajak: no_faktur_pajak.value,
            };
            console.log(updatedData);

            // Update the row data
            table_penagihan.row(selectedRowIndex).data(updatedData).draw();

            // Optionally, remove the selection
            $("#table_penagihan tbody tr.selected").removeClass("selected");

            // Clear the input fields after update
            no_bttb.value = "";
            no_suratjalan.value = "";
            no_po.value = "";
            sub_total.value = "";
            ppn_1.value = "";
            ppn_2.value = "";
            total_price_bottom.value = "";
            kurs.value = "";
            no_faktur_pajak.value = "";
        } else {
            alert("Please select a row to update.");
        }

        // Calculate the sum of SubTotal, PPN_Price, and TotalPrice for all rows
        let totalSubTotal = 0;
        let totalPPNprice = 0;
        let totalPriceValue = 0;

        table_penagihan.rows().every(function () {
            let rowData = this.data();

            totalSubTotal +=
                parseFloat(rowData.SubTotal.replace(/,/g, "")) || 0;
            totalPPNprice +=
                parseFloat(rowData.PPN_Price.replace(/,/g, "")) || 0;
            totalPriceValue +=
                parseFloat(rowData.TotalPrice.replace(/,/g, "")) || 0;
        });

        // Assign the calculated sums to the input fields
        subtotal.value = totalSubTotal
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        ppn_price.value = totalPPNprice
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        total_price.value = totalPriceValue
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    btn_remove.addEventListener("click", async function (event) {
        event.preventDefault();

        const table_penagihan = $("#table_penagihan").DataTable();

        // Get the index of the selected row
        let selectedRowIndex = table_penagihan.row(".selected").index();

        if (selectedRowIndex !== undefined && selectedRowIndex !== -1) {
            // Remove the selected row
            table_penagihan.row(selectedRowIndex).remove().draw();

            // Clear input fields
            no_bttb.value = "";
            no_suratjalan.value = "";
            no_po.value = "";
            sub_total.value = "";
            ppn_1.value = "";
            ppn_2.value = "";
            total_price_bottom.value = "";
            kurs.value = "";
            no_faktur_pajak.value = "";

            // Optionally, show a success message or perform other actions
            alert("Selected row has been removed.");

            // Calculate the sum of SubTotal, PPN_Price, and TotalPrice for all rows after removal
            let totalSubTotal = 0;
            let totalPPNprice = 0;
            let totalPriceValue = 0;

            table_penagihan.rows().every(function () {
                let rowData = this.data();

                totalSubTotal +=
                    parseFloat(rowData.SubTotal.replace(/,/g, "")) || 0;
                totalPPNprice +=
                    parseFloat(rowData.PPN_Price.replace(/,/g, "")) || 0;
                totalPriceValue +=
                    parseFloat(rowData.TotalPrice.replace(/,/g, "")) || 0;
            });

            // Assign the calculated sums to the input fields
            subtotal.value = totalSubTotal
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            ppn_price.value = totalPPNprice
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            total_price.value = totalPriceValue
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            alert("Please select a row to remove.");
        }
    });
});
