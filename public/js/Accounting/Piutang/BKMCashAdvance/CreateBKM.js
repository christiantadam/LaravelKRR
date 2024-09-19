$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_tanggalbkm = document.getElementById("btn_tanggalbkm");
    let btn_perkiraanTB = document.getElementById("btn_perkiraanTB");
    let btn_bankTB = document.getElementById("btn_bankTB");
    let btn_prosesTB = document.getElementById("btn_prosesTB");
    let btn_tampilbkm = document.getElementById("btn_tampilbkm");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let btn_group = document.getElementById("btn_group");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let idPelunasan_TB = document.getElementById("idPelunasan_TB");
    let tanggalInputTB = document.getElementById("tanggalInputTB");
    let jenisBayarTB = document.getElementById("jenisBayarTB");
    let idBank_TB = document.getElementById("idBank_TB");
    let nama_bankTB = document.getElementById("nama_bankTB");
    let mataUangTB = document.getElementById("mataUangTB");
    let nilaiPelunasanTB = document.getElementById("nilaiPelunasanTB");
    let noBuktiTB = document.getElementById("noBuktiTB");
    let id_perkiraanTB = document.getElementById("id_perkiraanTB");
    let ket_perkiraanTB = document.getElementById("ket_perkiraanTB");
    let jenis_bankTB = document.getElementById("jenis_bankTB");
    let tgl_awalbkm = document.getElementById("tgl_awalbkm");
    let tgl_akhirbkm = document.getElementById("tgl_akhirbkm");
    let bkm = document.getElementById("bkm");
    let table_pelunasan = $("#table_pelunasan").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let rowDataPertama;
    let rowDataKelima;

    bulan.focus();
    tgl_awalbkm.valueAsDate = new Date();
    tgl_akhirbkm.valueAsDate = new Date();

    btn_group.addEventListener("click", async function (event) {
        event.preventDefault();

        rowDataArray.forEach(function (row) {
            // Remove commas from Nilai_Pelunasan and convert it to a float
            let total = parseFloat(row.Nilai_Pelunasan.replace(/,/g, ""));

            // Determine the currency
            let uang = row.Nama_MataUang;

            // Format the total to 2 decimal places
            let totalFormatted = total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            // Initialize the terbilang variable
            let terbilang = "";

            // Check if the currency is RUPIAH or other
            if (uang === "RUPIAH") {
                // Call the Rupiah conversion function
                terbilang = convertNumberToWordsRupiah(total);
            } else {
                // Call the Dollar conversion function
                terbilang = convertNumberToWordsDollar(total);
            }

            // Add terbilang as a new property to the current row
            row.terbilang = terbilang;

            // Optionally, log the formatted result and terbilang
            console.log("Total Formatted: ", totalFormatted);
            console.log("Terbilang: ", row.terbilang);
        });

        console.log(rowDataArray);
        $.ajax({
            url: "CreateBKM/getGroup",
            type: "GET",
            data: {
                _token: csrfToken,
                rowDataArray: rowDataArray,
                // checkedRows: checkedRows,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
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
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "CreateBKM/getPelunasan", // URL untuk mengambil data dari server
            type: "GET",
            data: {
                _token: csrfToken,
                bulan: bulan.value,
                tahun: tahun.value,
            },
            dataType: "json",
            success: function (response) {
                console.log(response.data);

                table_pelunasan = $("#table_pelunasan").DataTable({
                    data: response.data, // Masukkan data ke DataTable
                    responsive: true,
                    processing: true,
                    destroy: true,
                    columns: [
                        {
                            data: "Tgl_Pelunasan",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "Id_Pelunasan" },
                        { data: "Id_bank" },
                        { data: "Jenis_Pembayaran" },
                        { data: "Nama_MataUang" },
                        { data: "Nilai_Pelunasan" },
                        { data: "No_Bukti" },
                        { data: "TglInput" },
                        { data: "KodePerkiraan" },
                        { data: "Uraian" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data:", error);
            },
        });
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_pelunasan tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_pelunasan tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_pelunasan
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_pelunasan);
            } else {
                // Remove the unchecked row data from the array
                // rowDataPertama = null;

                rowDataPertama = table_pelunasan
                    .row($(this).closest("tr"))
                    .data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_pelunasan);
            }
        }
    );

    btn_prosesTB.addEventListener("click", async function (event) {
        event.preventDefault();
        if (rowDataPertama) {
            rowDataPertama.Id_bank = idBank_TB.value;
            rowDataPertama.KodePerkiraan = id_perkiraanTB.value;
            let dateValue = tanggalInputTB.value;

            let [year, month, day] = dateValue.split("-");

            let formattedDate = `${month}/${day}/${year}`;

            rowDataPertama.TglInput = formattedDate;

            if ($.fn.DataTable.isDataTable("#table_pelunasan")) {
                let selectedRow = table_pelunasan.row(
                    $('input[name="penerimaCheckbox"]:checked').closest("tr")
                );

                selectedRow.data(rowDataPertama).draw();

                rowDataArray = [];
            }
        }
    });

    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "CreateBKM/getOkBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalbkm: tgl_awalbkm.value,
                        tgl_akhirbkm: tgl_akhirbkm.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    btn_tampilbkm.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );

        let = tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "CreateBKM/getListBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        // tes: "tes",
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });

        myModal.show();
    });

    let rowDataArrayKelima = [];

    $("#tabletampilBKM tbody").off("change", 'input[name="penerimaCheckboxM"]');
    $("#tabletampilBKM tbody").on(
        "change",
        'input[name="penerimaCheckboxM"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxM"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKelima = tabletampilBKM
                    .row($(this).closest("tr"))
                    .data();
                rowDataArray.push(rowDataKelima);
                bkm.value = rowDataKelima.Id_BKM;
                console.log(rowDataArrayKelima);
                console.log(rowDataKelima, this, tabletampilBKM);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKelima = null;
                bkm.value = "";
                console.log(rowDataArrayKelima);
                console.log(rowDataKelima, this, tabletampilBKM);
            }
        }
    );

    btn_tanggalbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        if (rowDataArray.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih Data Dahulu",
                showConfirmButton: true,
            });
        } else if (rowDataArray.length > 1) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Data Tidak Boleh Lebih Dari 1 (Satu)",
                showConfirmButton: true,
            });
        } else {
            idPelunasan_TB.value = rowDataArray[0].Id_Pelunasan;
            // let tglInput = rowDataArray[0].TglInput; // "06/09/2008"

            // // Split the date string by "/"
            // let parts = tglInput.split("/");

            // // Rearrange to "YYYY-MM-DD"
            // let formattedDate = `${parts[2]}-${parts[0].padStart(
            //     2,
            //     "0"
            // )}-${parts[1].padStart(2, "0")}`;

            // Set the value of the input
            // tanggalInputTB.value = formattedDate;
            tanggalInputTB.valueAsDate = new Date();
            id_perkiraanTB.value = "";
            ket_perkiraanTB.value = "";
            jenisBayarTB.value = rowDataArray[0].Jenis_Pembayaran;
            idBank_TB.value = rowDataArray[0].Id_bank;
            mataUangTB.value = rowDataArray[0].Nama_MataUang;
            nilaiPelunasanTB.value = rowDataArray[0].Nilai_Pelunasan;
            noBuktiTB.value = rowDataArray[0].No_Bukti;
            // id_perkiraanTB.value = rowDataArray[0].KodePerkiraan;
            $.ajax({
                url: "CreateBKM/getBankDetails",
                type: "GET",
                data: {
                    _token: csrfToken,
                    idBank: rowDataArray[0].Id_bank,
                    // checkedRows: checkedRows,
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        nama_bankTB.value = response.Nama;
                        jenis_bankTB.value = response.Jenis;
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.message);
                },
            });

            // $.ajax({
            //     url: "CreateBKM/getPerkiraan",
            //     type: "GET",
            //     data: {
            //         _token: csrfToken,
            //         IdPerkiraan: rowDataArray[0].KodePerkiraan,
            //         // checkedRows: checkedRows,
            //     },
            //     success: function (response) {
            //         if (response.error) {
            //             Swal.fire({
            //                 icon: "info",
            //                 title: "Info!",
            //                 text: response.error,
            //                 showConfirmButton: false,
            //             });
            //         } else {
            //             ket_perkiraanTB.value = response.Keterangan;
            //         }
            //     },
            //     error: function (xhr) {
            //         alert(xhr.responseJSON.message);
            //     },
            // });
            var myModal = new bootstrap.Modal(
                document.getElementById("modalInputTanggal"),
                {
                    keyboard: false,
                }
            );
            myModal.show();
        }
    });

    btn_bankTB.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableBank")
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
                        const table = $("#tableBank").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "CreateBKM/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Id_Bank" },
                                { data: "Nama_Bank" },
                            ],
                        });
                        $("#tableBank tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBank")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idBank_TB.value = escapeHTML(selectedRow.Id_Bank.trim());
                    nama_bankTB.value = escapeHTML(
                        selectedRow.Nama_Bank.trim()
                    );

                    $.ajax({
                        url: "CreateBKM/getBankDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idBank: idBank_TB.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenis_bankTB.value = data.Jenis;
                            console.log(jenis_bankTB.value);
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_perkiraanTB.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
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
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "CreateBKM/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanTB.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanTB.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    $("#table_bkm").on("xhr.dt", function (e, settings, json, xhr) {
        rowDataArray = [];
    });
});
