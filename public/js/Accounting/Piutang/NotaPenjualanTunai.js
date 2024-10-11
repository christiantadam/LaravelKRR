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
    let btn_noSP = document.getElementById("btn_noSP");
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
    let btn_penagih = document.getElementById("btn_penagih");
    // let table_atas = $("#table_atas").DataTable({
    //     columnDefs: [{ targets: [0, 7], visible: false }],
    // });

    tanggalInput.valueAsDate = new Date();
    penagihanPajak.valueAsDate = new Date();
    user_penagih.value = "Tanpa Penagih";
    idUserPenagih.value = "6";

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
});
