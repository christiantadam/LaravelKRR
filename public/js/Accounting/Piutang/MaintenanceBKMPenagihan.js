$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_prosesMB = document.getElementById("btn_prosesMB");
    let btn_bankM = document.getElementById("btn_bankM");
    let btn_koreksiDetail = document.getElementById("btn_koreksiDetail");
    let radioDetailPelunasan = document.getElementById("radioDetailPelunasan");
    let radioDetailBiaya = document.getElementById("radioDetailBiaya");
    let radioDetailKurangLebih = document.getElementById(
        "radioDetailKurangLebih"
    );
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let idPelunasanM = document.getElementById("idPelunasanM");
    let tanggalInputM = document.getElementById("tanggalInputM");
    let tanggalTagihM = document.getElementById("tanggalTagihM");
    let jenisBayarM = document.getElementById("jenisBayarM");
    let idBankM = document.getElementById("idBankM");
    let namaBankM = document.getElementById("namaBankM");
    let jenisMB = document.getElementById("jenisMB");
    let mataUangM = document.getElementById("mataUangM");
    let nilaiPeluansanM = document.getElementById("nilaiPeluansanM");
    let noBuktiM = document.getElementById("noBuktiM");
    let tutupModalB = document.getElementById("tutupModalB");
    let id_penagihanMP = document.getElementById("id_penagihanMP");
    let id_pelunasanMP = document.getElementById("id_pelunasanMP");
    let namaCustomer_MP = document.getElementById("namaCustomer_MP");
    let nilai_pelunasanMP = document.getElementById("nilai_pelunasanMP");
    let pelunasanRupiah_MP = document.getElementById("pelunasanRupiah_MP");
    let id_perkiraanMP = document.getElementById("id_perkiraanMP");
    let ket_perkiraanMP = document.getElementById("ket_perkiraanMP");
    let btn_perkiraanMP = document.getElementById("btn_perkiraanMP");
    let btn_prosesMP = document.getElementById("btn_prosesMP");
    let tutup_modalMP = document.getElementById("tutup_modalMP");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
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
    let radio;

    bulan.focus();
    tanggalInputM.valueAsDate = new Date();

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

    radioDetailPelunasan.addEventListener("click", function (event) {
        radio = 1;
    });

    radioDetailBiaya.addEventListener("click", function (event) {
        radio = 2;
    });

    radioDetailKurangLebih.addEventListener("click", function (event) {
        radio = 3;
    });

    btn_koreksiDetail.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(radio);

        if (radio == 1) {
            if (rowDataPelunasan !== null && rowDataPelunasan !== undefined) {
                console.log(rowDataPelunasan);

                id_penagihanMP.value = rowDataPelunasan.ID_Penagihan;
                id_pelunasanMP.value = rowDataArray[0][1];
                namaCustomer_MP.value = rowDataPelunasan.NamaCust;
                nilai_pelunasanMP.value = rowDataPelunasan.Nilai_Pelunasan;
                pelunasanRupiah_MP.value = rowDataPelunasan.Pelunasan_Rupiah;
                id_perkiraanMP.value = rowDataPelunasan.Kode_Perkiraan;

                if (id_perkiraanMP.value !== "") {
                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getPerkiraanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_perkiraanMP: id_perkiraanMP.value,
                        },
                        success: function (data) {
                            console.log(data);
                            ket_perkiraanMP.value = data.Keterangan;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailPelunasan"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailPelunasan")
                    .addEventListener("shown.bs.modal", function () {
                        btn_perkiraanMP.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail pelunasan !",
                    showConfirmButton: false,
                });
            }
        } else if (radio == 2) {
            if (rowDataBiaya !== null && rowDataBiaya !== undefined) {
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail biaya !",
                    showConfirmButton: false,
                });
            }
        } else if (radio == 3) {
            if (rowDataKrgLbh !== null && rowDataKrgLbh !== undefined) {
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail kurang/lebih !",
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih detail dahulu !",
                showConfirmButton: false,
            });
        }
    });

    btn_prosesMP.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceBKMPenagihan/updateDetailPelunasan",
            type: "GET",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: rowDataPelunasan.ID_Detail_Pelunasan,
                id_perkiraanMP: id_perkiraanMP.value,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        tutup_modalMP.click();
                        rowDataPelunasan = null;
                        $("#table_detailPelunasan").DataTable().ajax.reload();
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMB.addEventListener("click", async function (event) {
        event.preventDefault();
        rowDataPertama[2] = idBankM.value;
        // Function to convert Y-m-d to m/d/Y
        function formatDateToMDY(dateString) {
            const [year, month, day] = dateString.split("-");
            return `${month}/${day}/${year}`;
        }

        // When assigning the formatted date to rowDataPertama
        rowDataPertama[7] = formatDateToMDY(tanggalInputM.value);
        // table_kiri.draw(false);
        if ($.fn.DataTable.isDataTable("#table_atas")) {
            var table_atas = $("#table_atas").DataTable();
            let selectedRow = table_atas.row(
                $('input[name="penerimaCheckbox"]:checked').closest("tr")
            );
            selectedRow.data(rowDataPertama).draw();
            rowDataArray = [];
        }
        tutupModalB.click();
        // document.activeElement.blur();
    });

    btn_pilihBank.addEventListener("click", async function (event) {
        event.preventDefault();
        let tglTgh = [];
        let tglMax = null;

        if (rowDataArray !== null && rowDataArray.length == 1) {
            for (let i = 0; i < rowDataArray.length; i++) {
                let tanggalStr = rowDataArray[i][0];
                let match = tanggalStr.match(/value="([^"]+)"/);

                if (match) {
                    // Misalnya kita asumsikan format adalah "mm/dd/yyyy"
                    let [month, day, year] = match[1].split("/").map(Number);
                    tglTgh.push(new Date(year, month - 1, day)); // Bulan di JavaScript dimulai dari 0
                }
            }

            // Mendapatkan tanggal maksimum dari array tglTgh
            tglMax = tglTgh.reduce(
                (max, date) => (date > max ? date : max),
                tglTgh[0]
            );

            // Mengatur nilai ke elemen-elemen input HTML dengan format yang sama dengan VB
            tanggalTagihM.value = tglMax.toLocaleDateString("en-CA");
            // tanggalTagihM.value = tglMax.toLocaleDateString("en-CA"); // format yyyy-mm-dd
            idPelunasanM.value = rowDataArray[0][1];
            jenisBayarM.value = rowDataArray[0][3];
            idBankM.value = rowDataArray[0][2];
            mataUangM.value = rowDataArray[0][4];
            nilaiPeluansanM.value = numeral(rowDataArray[0][5]).format(
                "0,0.00"
            );
            noBuktiM.value = rowDataArray[0][6];

            if (idBankM.value !== "") {
                $.ajax({
                    url: "MaintenanceBKMPenagihan/getBankAda",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idBankM: idBankM.value,
                    },
                    success: function (data) {
                        console.log(data);
                        namaBankM.value = data.Nama;
                        jenisMB.value = data.jenis;
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            }

            var myModal = new bootstrap.Modal(
                document.getElementById("modalPilihBank"),
                {
                    keyboard: false,
                }
            );

            document
                .getElementById("modalPilihBank")
                .addEventListener("shown.bs.modal", function () {
                    btn_bankM.focus(); // Fokuskan input
                });

            myModal.show();
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih satu data pelunasan !",
                showConfirmButton: false,
            });
        }
    });

    btn_perkiraanMP.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="KodePerkiraanTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#KodePerkiraanTable")
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
                        const table = $("#KodePerkiraanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceBKMPenagihan/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NoKodePerkiraan",
                                },
                                {
                                    data: "Keterangan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#KodePerkiraanTable_filter input").focus();
                        }, 300);
                        // $("#KodePerkiraanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#KodePerkiraanTable tbody").on(
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
                            handleTableKeydownInSwal(e, "KodePerkiraanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanMP.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMP.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );

                    // setTimeout(() => {
                    //     btn_prosesMB.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_bankM.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="BankTable" class="display" style="width:100%"><thead><tr><th>ID. Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#BankTable")
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
                        const table = $("#BankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceBKMPenagihan/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Bank",
                                },
                                {
                                    data: "Nama_Bank",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#BankTable_filter input").focus();
                        }, 300);
                        // $("#BankTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Bank)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#BankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "BankTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idBankM.value = escapeHTML(selectedRow.Id_Bank.trim());
                    namaBankM.value = escapeHTML(selectedRow.Nama_Bank.trim());

                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getBankDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idBankM: idBankM.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenisMB.value = data[0].Id_Bank;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        btn_prosesMB.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
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

    //#region Checkbox

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
                // rowDataArrayPelunasan.push(rowDataPelunasan);
                rowDataArrayPelunasan = [rowDataPelunasan];

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            } else {
                rowDataPelunasan = null;
                // Remove the unchecked row data from the array
                // rowDataPelunasan = table_detailPelunasan
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayPelunasan = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayPelunasan = rowDataArrayPelunasan.filter(
                //     (row) => row.Id_Penagihan !== rowDataPelunasan.Id_Penagihan
                // );

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
                // rowDataArrayBiaya.push(rowDataBiaya);
                rowDataArrayBiaya = [rowDataBiaya];

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            } else {
                rowDataBiaya = null;
                // Remove the unchecked row data from the array
                // rowDataBiaya = table_detailBiaya
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayBiaya = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayBiaya = rowDataArrayBiaya.filter(
                //     (row) => row.Id_Penagihan !== rowDataBiaya.Id_Penagihan
                // );

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
                // rowDataArrayKrgLbh.push(rowDataKrgLbh);
                rowDataArrayKrgLbh = [rowDataKrgLbh];

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            } else {
                rowDataKrgLbh = null;
                // Remove the unchecked row data from the array
                // rowDataKrgLbh = table_kurangLebih
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayKrgLbh = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayKrgLbh = rowDataArrayKrgLbh.filter(
                //     (row) => row.Id_Penagihan !== rowDataKrgLbh.Id_Penagihan
                // );

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            }
        }
    );

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

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
                        idPelunasan: data[1],
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
                        idPelunasan: data[1],
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
                        idPelunasan: data[1],
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
    });
});
