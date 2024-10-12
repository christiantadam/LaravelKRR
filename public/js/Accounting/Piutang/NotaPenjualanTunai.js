$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_customer = document.getElementById("btn_customer");
    let btn_penagihan = document.getElementById("btn_penagihan");
    let btn_noSP = document.getElementById("btn_noSP");
    let btn_penagih = document.getElementById("btn_penagih");
    let btn_dokumen = document.getElementById("btn_dokumen");
    let btn_pajak = document.getElementById("btn_pajak");
    let btn_penagihanUM = document.getElementById("btn_penagihanUM");
    let btn_hapusItem = document.getElementById("btn_hapusItem");
    let id_cust = document.getElementById("id_cust");
    let idCustomer = document.getElementById("idCustomer");
    let jenisCustomer = document.getElementById("jenisCustomer");
    let alamat = document.getElementById("alamat");
    let tanggalInput = document.getElementById("tanggalInput");
    let penagihanPajak = document.getElementById("penagihanPajak");
    let mata_uang = document.getElementById("mata_uang");
    let idMataUang = document.getElementById("idMataUang");
    let nomorPO = document.getElementById("nomorPO");
    let syaratPembayaran = document.getElementById("syaratPembayaran");
    let nilaiKurs = document.getElementById("nilaiKurs");
    let user_penagih = document.getElementById("user_penagih");
    let idUserPenagih = document.getElementById("idUserPenagih");
    let nama_customer = document.getElementById("nama_customer");
    let dokumen = document.getElementById("dokumen");
    let idJenisDokumen = document.getElementById("idJenisDokumen");
    let nama_pajak = document.getElementById("nama_pajak");
    let jenis_pajak = document.getElementById("jenis_pajak");
    let no_penagihanUM = document.getElementById("no_penagihanUM");
    let nilaiSP = document.getElementById("nilaiSP");
    let nilaiUM = document.getElementById("nilaiUM");
    let discount = document.getElementById("discount");
    let nilaiSdhBayar = document.getElementById("nilaiSdhBayar");
    let totalPenagihan = document.getElementById("totalPenagihan");
    let terbilang = document.getElementById("terbilang");
    let potongUM = document.getElementById("potongUM");
    let no_penagihan = document.getElementById("no_penagihan");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [0], visible: false }],
    });

    tanggalInput.valueAsDate = new Date();
    penagihanPajak.valueAsDate = new Date();
    user_penagih.value = "Tanpa Penagih";
    idUserPenagih.value = "6";

    btn_customer.disabled = true;
    btn_penagihan.disabled = true;
    btn_noSP.disabled = true;
    btn_penagih.disabled = true;
    btn_dokumen.disabled = true;
    btn_pajak.disabled = true;
    btn_penagihanUM.disabled = true;
    btn_hapusItem.disabled = true;
    nama_customer.readOnly = true;
    no_penagihan.readOnly = true;

    // potongUM.addEventListener("click", async function (event) {
    //     event.preventDefault();

    // });

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
                                url: "PenagihanPenjualanLokal/getCustomer",
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
                    user_penagih.value = "Tanpa Penagih";
                    idUserPenagih.value = "6";
                    nama_customer.value = escapeHTML(
                        selectedRow.NAMACUST.trim()
                    );
                    id_cust.value = selectedRow.IDCust.trim().substring(0, 3);
                    idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    if (id_cust.value == "NPX") {
                        btn_pajak.disabled = true;
                    } else {
                        btn_pajak.disabled = false;
                    }

                    $.ajax({
                        url: "PenagihanPenjualanLokal/getJenisCustomer",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idCustomer: idCustomer.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenisCustomer.value = data.TJenisCust;
                            alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

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

    btn_noSP.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Surat Pesanan",
                html: '<table id="PesananTable" class="display" style="width:100%"><thead><tr><th>Surat Pesanan</th><th>ID. Pesanan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PesananTable")
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
                        const table = $("#PesananTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceNotaPenjualanTunai/getPesanan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "IDSuratPesanan",
                                },
                                {
                                    data: "Tgl_Pesan",
                                },
                            ],
                            order: [[0, "desc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PesananTable_filter input").focus();
                        }, 300);
                        // $("#PesananTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Pesanan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PesananTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PesananTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_sp.value = escapeHTML(selectedRow.IDSuratPesanan.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    $.ajax({
                        url: "MaintenanceNotaPenjualanTunai/getPesananDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_sp: no_sp.value,
                        },
                        success: function (data) {
                            console.log(data);
                            mata_uang.value = data.TMataUang;
                            idMataUang.value = data.TIdMataUang;
                            nomorPO.value = data.TPO;
                            syaratPembayaran.value = data.TsyaratPembayaran;
                            nilaiKurs.value = 0;
                            // alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    $.ajax({
                        url: "MaintenanceNotaPenjualanTunai/hitungPesanan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_sp: no_sp.value,
                            potongUM: potongUM.checked ? 1 : 0,
                            nilaiSP: nilaiSP.value,
                            nilaiUM: nilaiUM.value,
                        },
                        success: function (data) {
                            console.log(data);
                            var table_atas = $("#table_atas").DataTable();

                            const newRow = {
                                Id_Detail: table_atas.rows().count() + 1,
                                surat_pesanan: data.sNoSP,
                                total: data.total,
                            };

                            table_atas.row
                                .add([
                                    newRow.Id_Detail,
                                    newRow.surat_pesanan,
                                    newRow.total,
                                ])
                                .draw();
                            // mata_uang.value = data.TMataUang;
                            // idMataUang.value = data.TIdMataUang;
                            // nomorPO.value = data.TPO;
                            // syaratPembayaran.value = data.TsyaratPembayaran;
                            // nilaiKurs.value = 0;
                            // alamat.value = data.TAlamat;
                            nilaiSP.value = data.TNilai_Penagihan;
                            totalPenagihan.value = data.txtTotalPenagihan;

                            nilaiUM.value = 0;
                            nilaiSdhBayar.value = 0;
                            discount.value = "0.00";
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    // setTimeout(() => {
                    //     btn_userPenagih.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_penagih.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagih",
                html: '<table id="PenagihTable" class="display" style="width:100%"><thead><tr><th>Penagih</th><th>ID. Penagih</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihTable")
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
                        const table = $("#PenagihTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceNotaPenjualanTunai/getPenagih",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama",
                                },
                                {
                                    data: "IdUser",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihTable_filter input").focus();
                        }, 300);
                        // $("#PenagihTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagih)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    user_penagih.value = escapeHTML(selectedRow.Nama.trim());
                    idUserPenagih.value = escapeHTML(selectedRow.IdUser.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    // setTimeout(() => {
                    //     btn_pajak.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_dokumen.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Dokumen",
                html: '<table id="DokumenTable" class="display" style="width:100%"><thead><tr><th>Dokumen</th><th>ID. Dokumen</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#DokumenTable")
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
                        const table = $("#DokumenTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceNotaPenjualanTunai/getDokumen",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_cust: id_cust.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Dokumen",
                                },
                                {
                                    data: "Id_Jenis_Dokumen",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#DokumenTable_filter input").focus();
                        }, 300);
                        // $("#DokumenTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Dokumen)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#DokumenTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "DokumenTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    dokumen.value = escapeHTML(selectedRow.Nama_Dokumen.trim());
                    idJenisDokumen.value = escapeHTML(
                        selectedRow.Id_Jenis_Dokumen.trim()
                    );
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    // setTimeout(() => {
                    //     uangMasuk.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_pajak.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pajak",
                html: '<table id="PajakTable" class="display" style="width:100%"><thead><tr><th>Nama Pajak</th><th>Jenis Pajak</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PajakTable")
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
                        const table = $("#PajakTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceNotaPenjualanTunai/getPajak",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Jns_PPN",
                                },
                                {
                                    data: "Jns_PPN",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PajakTable_filter input").focus();
                        }, 300);
                        // $("#PajakTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Pajak)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PajakTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PajakTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_pajak.value = escapeHTML(
                        selectedRow.Nama_Jns_PPN.trim()
                    );
                    jenis_pajak.value = escapeHTML(selectedRow.Jns_PPN.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    // setTimeout(() => {
                    //     btn_penagihanUM.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_penagihanUM.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagihan UM",
                html: '<table id="PenagihanUMTable" class="display" style="width:100%"><thead><tr><th>ID. Penagihan</th><th>Jumlah</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihanUMTable")
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
                        const table = $("#PenagihanUMTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceNotaPenjualanTunai/getTagihanDP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    no_sp: no_sp.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Penagihan",
                                },
                                {
                                    data: "nilai_BLM_PAJAK",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihanUMTable_filter input").focus();
                        }, 300);
                        // $("#PenagihanUMTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_PenagihanUM)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihanUMTable tbody").on(
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
                            handleTableKeydownInSwal(e, "PenagihanUMTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // nama_pajak.value = escapeHTML(
                    //     selectedRow.Nama_Jns_PPN.trim()
                    // );
                    // jenis_pajak.value = escapeHTML(selectedRow.Jns_PPN.trim());
                    no_penagihanUM.value = escapeHTML(
                        selectedRow.Id_Penagihan.trim()
                    );
                    // setTimeout(() => {
                    //     btn_dokumen.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);
    });

    let tableData = [];

    btn_hapusItem.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_atas = $("#table_atas").DataTable();

            // Get data of the selected row
            var rowData = table_atas.row(selectedRow).data();

            // Remove the row from DataTable
            table_atas.row(selectedRow).remove().draw();

            // Remove the row from tableData array
            tableData = tableData.filter((row) => row.Id_Detail !== rowData[0]);
            console.log(tableData);

            const totalPelunasan = table_atas
                .rows()
                .data()
                .toArray()
                .reduce((sum, row) => {
                    let jumlahUang = row[2];
                    return sum + parseInt(jumlahUang);
                }, 0);
            console.log(totalPelunasan);

            nilaiSP.value = totalPelunasan.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });
});
