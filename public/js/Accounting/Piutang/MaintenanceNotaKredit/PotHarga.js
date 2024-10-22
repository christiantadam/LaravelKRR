$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_batal = document.getElementById("btn_batal");
    let btn_customer = document.getElementById("btn_customer");
    let tanggalInput = document.getElementById("tanggalInput");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let idJenisCustomer = document.getElementById("idJenisCustomer");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let proses = 1;

    tanggalInput.valueAsDate = new Date();

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
                                url: "PotHarga/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    proses: proses,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "idCust",
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
                    idJenisCustomer.value = escapeHTML(
                        selectedRow.TIdJnsCust.trim()
                    );
                    idCustomer.value = escapeHTML(
                        selectedRow.TIdCustomer.trim()
                    );
                    console.log(idCustomer.value);
                    console.log(idJenisCustomer.value);

                    // idJenisCustomer.value = selectedRow.IDCust.trim().substring(
                    //     0,
                    //     3
                    // );
                    // idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    // setTimeout(() => {
                    //     btn_suratJalan.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_penagihan.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(idCustomer.value);

        try {
            const result = await Swal.fire({
                title: "Select a Penagihan",
                html: '<table id="PenagihanTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Penagihan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihanTable")
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
                        const table = $("#PenagihanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "PotHarga/getPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "Id_Penagihan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihanTable_filter input").focus();
                        }, 300);
                        // $("#PenagihanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagihan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihanTable tbody").on(
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
                            handleTableKeydownInSwal(e, "PenagihanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_penagihan.value = escapeHTML(
                        selectedRow.Id_Penagihan.trim()
                    );
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );

                    // $.ajax({
                    //     url: "PenagihanPenjualanEksport/getPenagihanDetails",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         no_penagihan: no_penagihan.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);

                    //         if (data.listSJ && data.listSJ.length > 0) {
                    //             var table_atas = $("#table_atas").DataTable();

                    //             table_atas.clear().draw();
                    //             data.listSJ.forEach(function (item, index) {
                    //                 console.log(item);
                    //                 const newRow = {
                    //                     // Id_Detail:
                    //                     //     table_atas.rows().count() + 1,
                    //                     suratJalan: item.Surat_Jalan,
                    //                     tanggal: item.Tgl_Surat_Jalan,
                    //                     nilaiPenagihan: item.Total,
                    //                     nilaiFOB: "",
                    //                     idDetailPesanan:
                    //                         item.ID_Detail_Penagihan,
                    //                 };

                    //                 table_atas.row
                    //                     .add([
                    //                         newRow.suratJalan,
                    //                         newRow.tanggal,
                    //                         newRow.nilaiPenagihan,
                    //                         newRow.nilaiFOB,
                    //                         newRow.idDetailPesanan,
                    //                     ])
                    //                     .draw();
                    //             });
                    //         }

                    //         idCustomer.value = data.penagihanData.Id_Customer;
                    //         mataUang.value = data.penagihanData.Nama_MataUang;
                    //         idMataUang.value = data.penagihanData.Id_MataUang;
                    //         nilaiKurs.value = numeral(
                    //             data.penagihanData.NilaiKurs
                    //         ).format("0");
                    //         dokumen.value = data.penagihanData.Dokumen;
                    //         idJenisDokumen.value = data.penagihanData.IdJnsDok;
                    //         user_penagih.value = data.penagihanData.NamaPenagih;
                    //         idUserPenagih.value = data.penagihanData.IdPenagih;
                    //         nilaiDitagihkan.value =
                    //             data.penagihanData.Nilai_Penagihan;
                    //         terbilang.value = data.penagihanData.Terbilang;
                    //         tanggal.value = data.penagihanData.Tgl_Penagihan;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });

                    // setTimeout(() => {
                    //     btn_penagih.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
