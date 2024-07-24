document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_supplier = document.getElementById("btn_supplier");
    let btn_penagihan = document.getElementById("btn_penagihan");
    let sp1 = document.getElementById("sp1");
    let sp2 = document.getElementById("sp2");
    let idpenagihan = document.getElementById("idpenagihan");
    let tanggal = document.getElementById("tanggal");
    let btn_update = document.getElementById("btn_update");
    let no_pengajuan = document.getElementById("no_pengajuan");
    let id_penagihan = document.getElementById("id_penagihan");
    let nilai = document.getElementById("nilai");
    let id_pib = document.getElementById("id_pib");
    let no_pajak = document.getElementById("no_pajak");
    let tgl_pib = document.getElementById("tgl_pib");
    let no_kontrak = document.getElementById("no_kontrak");
    let tgl_kontrak = document.getElementById("tgl_kontrak");
    let no_invoice = document.getElementById("no_invoice");
    let tgl_invoice = document.getElementById("tgl_invoice");
    let no_skbm = document.getElementById("no_skbm");
    let tgl_skbm = document.getElementById("tgl_skbm");
    let no_skpph = document.getElementById("no_skpph");
    let tgl_skpph = document.getElementById("tgl_skpph");
    let no_spppb_bc = document.getElementById("no_spppb_bc");
    let tgl_spppb_bc = document.getElementById("tgl_spppb_bc");

    tanggal.valueAsDate = new Date();
    tgl_pib.valueAsDate = new Date();
    tgl_kontrak.valueAsDate = new Date();
    tgl_invoice.valueAsDate = new Date();
    tgl_skbm.valueAsDate = new Date();
    tgl_skpph.valueAsDate = new Date();
    tgl_spppb_bc.valueAsDate = new Date();
    sp1.readOnly = true;
    sp2.readOnly = true;
    idpenagihan.readOnly = true;
    tanggal.readOnly = true;
    // btn_update.disabled = true;

    //#region Function
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    $("#btn_update").on("click", function () {
        $("#importModal").modal("show");

        // Initialize DataTable
        let table = $("#tableupdate").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            returnFocus: true,
            ajax: {
                url: "UpdatePIB/getListPIB",
                dataType: "json",
                type: "GET",
                data: {
                    _token: csrfToken,
                    idpenagihan: idpenagihan.value,
                },
            },
            columns: [
                {
                    data: "No_Pengajuan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_PIB" },
                { data: "No_Pajak" },
                { data: "Id_PIB" },
                { data: "Tgl_PIB" },
                { data: "No_Kontrak" },
                { data: "Tgl_Kontrak" },
                { data: "No_Invoice" },
                { data: "Tgl_Invoice" },
                { data: "No_SKBM" },
                { data: "Tgl_SKBM" },
                { data: "No_SKPPH" },
                { data: "Tgl_SKPPH" },
                { data: "No_SPPB_BC" },
                { data: "Tgl_SPPB_BC" },
            ],
        });

        // Add event listener for checkboxes
        $("#tableupdate tbody").on(
            "change",
            'input[name="penerimaCheckbox"]',
            function () {
                if (this.checked) {

                    const rowData = table.row($(this).closest("tr")).data();
                    const sanitizedNilaiPIB = rowData.Nilai_PIB.replace(
                        /,/g,
                        ""
                    );
                    const currentDate = new Date().toISOString().split("T")[0];
                    // Set the values of the input fields
                    no_pengajuan.value = rowData.No_Pengajuan;
                    id_penagihan.value = idpenagihan.value;
                    nilai.value = sanitizedNilaiPIB;
                    id_pib.value = rowData.Id_PIB;
                    no_pajak.value = rowData.No_Pajak;
                    tgl_pib.value = rowData.Tgl_PIB || currentDate;
                    no_kontrak.value = rowData.No_Kontrak;
                    tgl_kontrak.value = rowData.Tgl_Kontrak || currentDate;
                    no_invoice.value = rowData.No_Invoice;
                    tgl_invoice.value = rowData.Tgl_Invoice || currentDate;
                    no_skbm.value = rowData.No_SKBM;
                    tgl_skbm.value = rowData.Tgl_SKBM || currentDate;
                    no_skpph.value = rowData.No_SKPPH;
                    tgl_skpph.value = rowData.Tgl_SKPPH || currentDate;
                    no_spppb_bc.value = rowData.No_SPPB_BC;
                    tgl_spppb_bc.value = rowData.Tgl_SPPB_BC || currentDate;
                }
            }
        );
    });

    // $.ajax({
    //     url: "UpdatePIB/getListPIB",
    //     type: "GET",
    //     data: {
    //         _token: csrfToken,
    //         idpenagihan: idpenagihan.value,
    //         // jenis_barang: jenis_barang.value,
    //         // IDSuratPesanan: selectedRow.IDSuratPesanan.trim(),
    //     },
    //     success: function (data) {
    //         console.log(data.data[0]);
    //         no_pengajuan.value = data.data[0].No_Pengajuan;
    //         id_penagihan.value = idpenagihan.value;
    //         nilai.value = parseFloat(data.data[0].Nilai_PIB.replace(/,/g, '')).toFixed(4);
    //         id_pib.value = data.data[0].Id_PIB;
    //         no_pajak.value = data.data[0].No_Pajak;
    //         tgl_pib.value = data.data[0].Tgl_PIB;
    //         no_kontrak.value = data.data[0].No_Kontrak;
    //         tgl_kontrak.value = data.data[0].Tgl_Kontrak;
    //         no_invoice.value = data.data[0].No_Invoice;
    //         tgl_invoice.value = data.data[0].Tgl_Invoice;
    //         no_skbm.value = data.data[0].No_SKBM;
    //         tgl_skbm.value = data.data[0].Tgl_SKBM;
    //         no_skpph.value = data.data[0].No_SKPPH;
    //         tgl_skpph.value = data.data[0].Tgl_SKPPH;
    //         no_spppb_bc.value = data.data[0].No_SPPB_BC;
    //         tgl_spppb_bc.value = data.data[0].Tgl_SPPB_BC;

    //         // satuan.value = data.Satuan.trim();
    //         // // let originalDate = data.TglRencanaKirim.trim();
    //         // let date = new Date(originalDate);
    //         // let formattedDate =
    //         //     date.toLocaleDateString("en-US");
    //         // rencana.value = formattedDate;
    //     },
    //     error: function (xhr, status, error) {
    //         var err = eval("(" + xhr.responseText + ")");
    //         alert(err.Message);
    //     },
    // });

    //#region Event Listener
    btn_supplier.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_penagihan.focus();
        try {
            const result = await Swal.fire({
                title: "Select a Supplier",
                html: '<table id="supplierTable" class="display" style="width:100%"><thead><tr><th>Nama Supplier</th><th>ID Supplier</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "80%",
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
                                url: "UpdatePIB/getListSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Supplier",
                                },
                                {
                                    data: "No_Supplier",
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
                    sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    sp2.value = selectedRow.No_Supplier.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_penagihan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagihan",
                html: '<table id="penagihanTable" class="display" style="width:100%"><thead><tr><th>ID Penagihan</th><th>Waktu Penagihan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "80%",
                preConfirm: () => {
                    const selectedData = $("#penagihanTable")
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
                        const table = $("#penagihanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "UpdatePIB/getPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    sp2: sp2.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Penagihan",
                                },
                                {
                                    data: "Waktu_Penagihan",
                                },
                            ],
                        });
                        $("#penagihanTable tbody").on(
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
                    idpenagihan.value = decodeHtml(
                        selectedRow.Id_Penagihan
                    ).trim();
                    tanggal.value = selectedRow.Waktu_Penagihan.trim();
                    btn_update.disabled = false;
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
