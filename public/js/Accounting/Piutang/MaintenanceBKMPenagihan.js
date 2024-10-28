$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let radioDetailPelunasan = document.getElementById("radioDetailPelunasan");
    let radioDetailBiaya = document.getElementById("radioDetailBiaya");
    let radioDetailKurangLebih = document.getElementById(
        "radioDetailKurangLebih"
    );
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_detailPelunasan = $("#table_detailPelunasan").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_detailBiaya = $("#table_detailBiaya").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_kurangLebih = $("#table_kurangLebih").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });

    bulan.focus();

    bulan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tahun.focus();
        }
    });

    tahun.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_ok.focus();
        }
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceBKMPenagihan/cekPelunasan",
            type: "GET",
            data: {
                _token: csrfToken,
                bulan: bulan.value,
                tahun: tahun.value,
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else if (data.message) {
                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getPelunasan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            bulan: bulan.value,
                            tahun: tahun.value,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                var table_atas = $("#table_atas").DataTable();

                                table_atas.clear().draw();
                                data.forEach(function (item, index) {
                                    // console.log(item);
                                    const newRow = {
                                        tglPelunasan: item.Tgl_Pelunasan,
                                        idPelunasan: item.Id_Pelunasan,
                                        idBank: item.Id_Bank,
                                        jenisPembayaran: item.Jenis_Pembayaran,
                                        mataUang: item.Nama_MataUang,
                                        totalPelunasan: item.Nilai,
                                        noBukti: item.No_Bukti,
                                        tglPembulatan: "",
                                        idCust: item.ID_Cust,
                                        idJenisBayar: item.Id_Jenis_Bayar,
                                    };

                                    table_atas.row
                                        .add([
                                            `<input type="checkbox" name="penerimaCheckbox" value="${newRow.tglPelunasan}" /> ${newRow.tglPelunasan}`,
                                            newRow.idPelunasan,
                                            newRow.idBank,
                                            newRow.jenisPembayaran,
                                            newRow.mataUang,
                                            newRow.totalPelunasan,
                                            newRow.noBukti,
                                            newRow.tglPembulatan,
                                            newRow.idCust,
                                            newRow.idJenisBayar,
                                        ])
                                        .draw();
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    let rowDataArray = [];
    let rowDataPertama;

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);
                // rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);

                table_detailPelunasan = $("#table_detailPelunasan").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    scrollX: true,
                    // width: "150%",
                    ajax: {
                        url: "MaintenanceBKMPenagihan/getDetailPelunasan",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                idPelunasan: rowDataPertama[1],
                            });
                        },
                    },
                    columns: [
                        {
                            data: "ID_Penagihan",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckboxPelunasan" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "Nilai_Pelunasan" },
                        { data: "Pelunasan_Rupiah" },
                        { data: "Kode_Perkiraan" },
                        { data: "NamaCust" },
                        { data: "ID_Detail_Pelunasan" },
                        { data: "Tgl_Penagihan" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
                });

                table_detailBiaya = $("#table_detailBiaya").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    scrollX: true,
                    // width: "150%",
                    ajax: {
                        url: "MaintenanceBKMPenagihan/getDetailBiaya",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                idPelunasan: rowDataPertama[1],
                            });
                        },
                    },
                    columns: [
                        {
                            data: "Keterangan",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckboxBiaya" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "Biaya" },
                        { data: "Kode_Perkiraan" },
                        { data: "Id_Detail_Pelunasan" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
                });

                table_kurangLebih = $("#table_kurangLebih").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    scrollX: true,
                    // width: "150%",
                    ajax: {
                        url: "MaintenanceBKMPenagihan/getDetailKrgLbh",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                idPelunasan: rowDataPertama[1],
                            });
                        },
                    },
                    columns: [
                        {
                            data: "Keterangan",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckboxKrgLbh" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "KurangLebih" },
                        { data: "Kode_Perkiraan" },
                        { data: "Id_Detail_Pelunasan" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
                });
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row[1] !== rowDataPertama[1]
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    let rowDataArrayPelunasan = [];
    let rowDataPelunasan;

    // Handle checkbox change events
    $("#table_detailPelunasan tbody").off(
        "change",
        'input[name="penerimaCheckboxPelunasan"]'
    );
    $("#table_detailPelunasan tbody").on(
        "change",
        'input[name="penerimaCheckboxPelunasan"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxPelunasan"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPelunasan = table_detailPelunasan
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArrayPelunasan.push(rowDataPelunasan);
                // rowDataArrayPelunasan = [rowDataPelunasan];

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            } else {
                // rowDataPelunasan = null;
                // Remove the unchecked row data from the array
                rowDataPelunasan = table_detailPelunasan
                    .row($(this).closest("tr"))
                    .data();

                // Filter out the row with matching Id_Penagihan
                rowDataArrayPelunasan = rowDataArrayPelunasan.filter(
                    (row) => row.Id_Penagihan !== rowDataPelunasan.Id_Penagihan
                );

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            }
        }
    );

    let rowDataArrayBiaya = [];
    let rowDataBiaya;

    // Handle checkbox change events
    $("#table_detailBiaya tbody").off(
        "change",
        'input[name="penerimaCheckboxBiaya"]'
    );
    $("#table_detailBiaya tbody").on(
        "change",
        'input[name="penerimaCheckboxBiaya"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxBiaya"]');
                // .not(this)
                // .prop("checked", false);
                rowDataBiaya = table_detailBiaya
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArrayBiaya.push(rowDataBiaya);
                // rowDataArrayBiaya = [rowDataBiaya];

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            } else {
                // rowDataBiaya = null;
                // Remove the unchecked row data from the array
                rowDataBiaya = table_detailBiaya
                    .row($(this).closest("tr"))
                    .data();

                // Filter out the row with matching Id_Penagihan
                rowDataArrayBiaya = rowDataArrayBiaya.filter(
                    (row) => row.Id_Penagihan !== rowDataBiaya.Id_Penagihan
                );

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            }
        }
    );

    let rowDataArrayKrgLbh = [];
    let rowDataKrgLbh;

    // Handle checkbox change events
    $("#table_kurangLebih tbody").off(
        "change",
        'input[name="penerimaCheckboxKrgLbh"]'
    );
    $("#table_kurangLebih tbody").on(
        "change",
        'input[name="penerimaCheckboxKrgLbh"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxKrgLbh"]');
                // .not(this)
                // .prop("checked", false);
                rowDataKrgLbh = table_kurangLebih
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArrayKrgLbh.push(rowDataKrgLbh);
                // rowDataArrayKrgLbh = [rowDataKrgLbh];

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            } else {
                // rowDataKrgLbh = null;
                // Remove the unchecked row data from the array
                rowDataKrgLbh = table_kurangLebih
                    .row($(this).closest("tr"))
                    .data();

                // Filter out the row with matching Id_Penagihan
                rowDataArrayKrgLbh = rowDataArrayKrgLbh.filter(
                    (row) => row.Id_Penagihan !== rowDataKrgLbh.Id_Penagihan
                );

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            }
        }
    );
});
