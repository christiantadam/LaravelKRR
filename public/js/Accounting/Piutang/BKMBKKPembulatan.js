$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let btn_perkiraan = document.getElementById("btn_perkiraan");
    let btn_tampilbkk = document.getElementById("btn_tampilbkk");
    let btnBatal = document.getElementById("btnBatal");
    let btnProses = document.getElementById("btnProses");
    let btnPilihBKM = document.getElementById("btnPilihBKM");

    let idBKK = document.getElementById("idBKK");
    let bkk = document.getElementById("bkk");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let tanggal = document.getElementById("tanggal");
    let idKodePerkiraan = document.getElementById("idKodePerkiraan");
    let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
    let jumlahUang = document.getElementById("jumlahUang");
    let uraian = document.getElementById("uraian");
    let tgl_awalbkk = document.getElementById("tgl_awalbkk");
    let tgl_akhirbkk = document.getElementById("tgl_akhirbkk");
    let id_bank, id_bank1, idbkm, jenis_bank, idMtUang;


    let table_DataBKM = $("#table_DataBKM").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_RincianData = $("#table_RincianData").DataTable({
        columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let rowDataPertama;

    tanggal.valueAsDate = new Date();
    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();
    jumlahUang.value = "0";

    uraian.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            if (id_bank === "KRR1" || id_bank === "KRR2") {
                if (id_bank === "KRR2") {
                    id_bank1 = "KI";
                } else if (id_bank === "KRR1") {
                    id_bank1 = "KKK";
                }
            } else {
                id_bank1 = id_bank;
            }
        }

        $.ajax({
            type: 'GET',
            url: 'MaintenanceBKMxBKKPembulatan/getUraian',
            data: {
                _token: csrfToken,
                id_bank1: id_bank1,
                tanggal: tanggal.value
            },
            success: function (response) {
                idBKK.value = response.IdBKK.trim();
                btnProses.focus();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            btn_perkiraan.focus();
        }
    });


    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        table_DataBKM = $("#table_DataBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKMxBKKPembulatan/getBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Total" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_DataBKM tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_DataBKM tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_DataBKM
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_DataBKM);

                table_RincianData = $("#table_RincianData").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "MaintenanceBKMxBKKPembulatan/getBKMDetails",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                idBKM: rowDataPertama.Id_BKM,
                            });
                        },
                    },
                    columns: [
                        {
                            data: "NamaCust",
                            // render: function (data) {
                            //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            // },
                        },
                        { data: "No_Bukti" },
                        { data: "ID_Penagihan" },
                        { data: "MataUang" },
                        { data: "Rincian" },
                        { data: "Id_bank" },
                        { data: "Jenis_Bank" },
                        { data: "Id_MataUang" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    columnDefs: [{ targets: [5, 6, 7], visible: false }],
                });


            } else {
                // Remove the unchecked row data from the array
                rowDataPertama = null;

                // rowDataPertama = table_DataBKM
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_DataBKM);
            }
        }
    );

    $("#table_RincianData tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_RincianData tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_RincianData.row(this).data();
        console.log(data);

        btnPilihBKM.addEventListener("click", async function (event) {
            id_bank = data.Id_bank.trim();
            jenis_bank = data.Jenis_Bank.trim();
            idMtUang = data.Id_MataUang.trim();
            idbkm = rowDataArray[0].Id_BKM.trim();
            jumlahUang.value = rowDataArray[0].Total.trim();
            tanggal.focus();
        });
    });


    btn_perkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                returnFocus: false,
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
                console.log(result);

                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idKodePerkiraan.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ketKodePerkiraan.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    uraian.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });


    btn_cetakbkm.addEventListener("click", async function (event) {
        event.preventDefault();

    });

    //#region Modal Tampil BKK

    btn_cetakbkm.addEventListener("click", async function (event) {
        event.preventDefault();

        $.ajax({
            url: "MaintenanceBKMxBKKPembulatan/cetakBKM",
            type: "GET",
            data: {
                _token: csrfToken,
                bkm: bkm.value,
            },
            success: function (data) {
                console.log(data);

                document.getElementById("name_p").innerHTML =
                    data.data[0].Id_bank;
                let tanggalInput = data.data[0].Tgl_Input;
                let tanggal = new Date(tanggalInput);
                let options = {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                };
                let formattedDate = tanggal
                    .toLocaleDateString("en-GB", options)
                    .replace(" ", "-")
                    .replace(" ", "-");
                document.getElementById("tanggal_p").innerHTML = formattedDate;
                document.getElementById("voucher_p").innerHTML =
                    data.data[0].Id_BKM;
                document.getElementById("description_p").innerHTML =
                    data.data[0].Nama_Bank;
                document.getElementById("received_p").innerHTML =
                    data.data[0].Keterangan || "";
                //Tbody Array
                let kodePerkiraanHTML = "";
                data.data.forEach(function (item) {
                    kodePerkiraanHTML += item.KodePerkiraan + "<br>";
                });
                document.getElementById("coa_p").innerHTML = kodePerkiraanHTML;

                let KeteranganHTML = "";
                data.data.forEach(function (item) {
                    KeteranganHTML += item.DetailKdPerkiraan + "<br>";
                });
                document.getElementById("acc_p").innerHTML = KeteranganHTML;

                let Rincian_BayarHTML = "";
                data.data.forEach(function (item) {
                    Rincian_BayarHTML += item.Keterangan + "<br>";
                });
                document.getElementById("desc_p").innerHTML = "";

                // let No_BGCekHTML = "";
                // data.data.forEach(function (item) {
                //     No_BGCekHTML +=
                //         item.Id_Penagihan + "<br>" ?? "" + "<br>";
                // });
                // document.getElementById("bgno_p").innerHTML = No_BGCekHTML;

                let Nilai_RincianHTML = "";
                let totalNilaiRincian = 0; // Variabel untuk menyimpan total nilai

                data.data.forEach(function (item) {
                    let nilaiRincian = parseFloat(item.Nilai_Rincian);
                    let formattedValue = nilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });

                    Nilai_RincianHTML += formattedValue + "<br>";
                    totalNilaiRincian += nilaiRincian; // Tambahkan nilai ke total
                });

                document.getElementById("amount_p").innerHTML =
                    Nilai_RincianHTML;

                // Format total dan tampilkan di element dengan id "total_p"
                document.getElementById("total_p").innerHTML =
                    totalNilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });

                // document.getElementById("alasan_p").innerHTML =
                //     data.data[0].Alasan;

                // document.getElementById("batal_p").innerHTML =
                //     data.data[0].Batal;

                window.print();
                // }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_tampilbkk.addEventListener("click", async function (event) {
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
                url: "MaintenanceBKMxBKKPembulatan/getPembulatan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKK" },
                { data: "Nilai_Pembulatan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });

        myModal.show();
    });

    $('#dataBKKModal').on('hidden.bs.modal', function () {
        let today = new Date().toISOString().split("T")[0]; /
        tgl_awalbkk.value = today;
        tgl_akhirbkk.value = today;
    });

    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKMxBKKPembulatan/getOkBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalbkk: tgl_awalbkk.value,
                        tgl_akhirbkk: tgl_akhirbkk.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKK" },
                { data: "Nilai_Pembulatan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    let rowDataArrayKetiga = [];

    $("#tabletampilBKM tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tabletampilBKM tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKetiga = tabletampilBKM
                    .row($(this).closest("tr"))
                    .data();
                rowDataArray.push(rowDataKetiga);
                bkm.value = rowDataKetiga.Id_BKK;
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, tabletampilBKM);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKetiga = null;
                bkm.value = "";
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, tabletampilBKM);
            }
        }
    );

    btnBatal.addEventListener("click", async function (event) {
        tanggal.valueAsDate = new Date();
        idBKK.value = '';
        idKodePerkiraan = '';
        ketKodePerkiraan = '';
        jumlahUang = '0';
        uraian = '';
        id_bank = '';
        id_bank1 = '';
        jenis_bank = '';
    });

    btnProses.addEventListener("click", async function (event) {
        event.preventDefault();


    });


});
