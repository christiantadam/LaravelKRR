document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("btn_customer");
    let btn_kodebarang = document.getElementById("btn_kodebarang");
    let btn_ukuran = document.getElementById("btn_ukuran");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let ukuran = document.getElementById("ukuran");
    let tanggal = document.getElementById("tanggal");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let tanggalu = document.getElementById("tanggalu");
    let user = document.getElementById("user");
    let bentuk_body = document.getElementById("bentuk_body");
    let model_body = document.getElementById("model_body");
    let dimensi_body = document.getElementById("dimensi_body");
    let bentuk_ca = document.getElementById("bentuk_ca");
    let model_ca = document.getElementById("model_ca");
    let dimensi_ca = document.getElementById("dimensi_ca");
    let bentuk_cb = document.getElementById("bentuk_cb");
    let model_cb = document.getElementById("model_cb");
    let dimensi_cb = document.getElementById("dimensi_cb");
    let swl = document.getElementById("swl");
    let sf1 = document.getElementById("sf1");
    let sf2 = document.getElementById("sf2");
    let panjang_body = document.getElementById("panjang_body");
    let diameter_body = document.getElementById("diameter_body");
    let lebar_body = document.getElementById("lebar_body");
    let tinggi_body = document.getElementById("tinggi_body");
    let panjang_ca = document.getElementById("panjang_ca");
    let diameter_ca = document.getElementById("diameter_ca");
    let lebar_ca = document.getElementById("lebar_ca");
    let tinggi_ca = document.getElementById("tinggi_ca");
    let panjang_cb = document.getElementById("panjang_cb");
    let diameter_cb = document.getElementById("diameter_cb");
    let lebar_cb = document.getElementById("lebar_cb");
    let tinggi_cb = document.getElementById("tinggi_cb");
    let btn_body = document.getElementById("btn_body");
    let btn_ca = document.getElementById("btn_ca");
    let btn_cb = document.getElementById("btn_cb");
    let tabel = document.getElementById("tabel");
    let btn_cari = document.getElementById("btn_cari");
    let btn_clear = document.getElementById("btn_clear");
    let btn_print = document.getElementById("btn_print");
    let ca_x = document.getElementById("ca_x");
    let cb_x = document.getElementById("cb_x");
    let lb_x = document.getElementById("lb_x");
    let lami_x = document.getElementById("lami_x");

    btn_body.disabled = true;
    btn_ca.disabled = true;
    btn_cb.disabled = true;
    tanggalu.valueAsDate = new Date();
    id_customer.readOnly = true;
    customer.readOnly = true;
    ukuran.readOnly = true;
    tanggal.readOnly = true;
    kodeBarangAsal.readOnly = true;
    tanggalu.readOnly = true;
    user.readOnly = true;
    bentuk_body.readOnly = false;
    model_body.readOnly = true;
    dimensi_body.readOnly = true;
    bentuk_ca.readOnly = false;
    model_ca.readOnly = true;
    dimensi_ca.readOnly = true;
    bentuk_cb.readOnly = false;
    model_cb.readOnly = true;
    dimensi_cb.readOnly = true;
    swl.readOnly = false;
    sf1.readOnly = false;
    sf2.readOnly = false;
    panjang_body.readOnly = true;
    diameter_body.readOnly = true;
    lebar_body.readOnly = true;
    tinggi_body.readOnly = true;
    panjang_ca.readOnly = true;
    diameter_ca.readOnly = true;
    lebar_ca.readOnly = true;
    tinggi_ca.readOnly = true;
    panjang_cb.readOnly = true;
    diameter_cb.readOnly = true;
    lebar_cb.readOnly = true;
    tinggi_cb.readOnly = true;

    //#region Tabel

    const createdCell = function (cell, cellData, rowData, rowIndex, colIndex) {
        let original;
        cell.setAttribute("contenteditable", true);
        cell.setAttribute("spellcheck", false);

        cell.addEventListener("focus", function (e) {
            original = e.target.textContent;
        });

        cell.addEventListener("blur", function (e) {
            if (original !== e.target.textContent) {
                const row = table.row(e.target.parentElement);
                row.data()[colIndex] = e.target.textContent; // Update the cell data
                row.invalidate();
                console.log("Cell changed: ", e.target); // Logging the cell
                console.log("New content: ", e.target.textContent); // Logging the new content
                console.log("Column index: ", colIndex); // Logging the column index
                console.log(
                    "Column name: ",
                    table.column(colIndex).header().textContent
                ); // Logging the column name
                console.log("Row data: ", row.data()); // Logging the row data
                console.log(cell, cellData, rowData, rowIndex, colIndex); // Logging all parameters
            }
        });
    };

    // Initialize DataTable
    const table = $("#tabel").DataTable({
        columnDefs: [
            {
                targets: "_all",
                createdCell: createdCell,
            },
        ],
    });

    // #region Event Listener
    // document.getElementById('form_tabelhitunganinformasi').addEventListener('keydown', function(e) {
    //     if (e.key === 'Enter') {
    //         let inputs = Array.from(this.querySelectorAll('input:not([disabled]):not([readonly]), select:not([disabled]):not([readonly]), textarea:not([disabled]):not([readonly])'));
    //         let currentIndex = inputs.indexOf(document.activeElement);

    //         if (currentIndex > -1 && currentIndex < inputs.length - 1) {
    //             // Temukan indeks elemen berikutnya yang tidak ter-disable atau ter-readonly
    //             let nextIndex = currentIndex + 1;
    //             while (nextIndex < inputs.length && (inputs[nextIndex].disabled || inputs[nextIndex].readOnly)) {
    //                 nextIndex++;
    //             }
    //             // Pindahkan fokus ke elemen berikutnya yang valid
    //             if (nextIndex < inputs.length) {
    //                 inputs[nextIndex].focus();
    //             }
    //         } else {
    //             this.submit(); // Misalnya, melakukan submit formulir jika sudah di akhir
    //         }

    //         e.preventDefault();
    //     }
    // });

    // tanggal_input.addEventListener("keydown", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         btn_customer.focus();
    //     }
    // });

    btn_cari.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(
            csrfToken,
            kodeBarangAsal.value,
            bentuk_ca.value,
            bentuk_cb.value,
            swl.value,
            sf1.value,
            sf2.value
        );
        $.ajax({
            url: "TabelHitunganInformasi/getDetailTabel",
            type: "GET",
            data: {
                _token: csrfToken,
                kodeBarangAsal: kodeBarangAsal.value,
                bentuk_ca: bentuk_ca.value,
                bentuk_cb: bentuk_cb.value,
                swl: swl.value,
                sf1: sf1.value,
                sf2: sf2.value,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data); // Ensure data structure in console
                table.clear().draw();
                // Assuming data is an object with numeric keys like '2521'
                Object.keys(data).forEach((key) => {
                    let rowData = data[key];

                    // Function to format values
                    function formatValue(value) {
                        return value === ".00" ? "0.00" : value;
                    }

                    table.row
                        .add([
                            rowData.Nama_Customer,
                            rowData.Kode_Barang.trim(),
                            formatValue(rowData.Panjang_BB),
                            formatValue(rowData.Lebar_BB),
                            formatValue(rowData.Tinggi_BB),
                            formatValue(rowData.Diameter_BB),
                            rowData.ModelBB,
                            rowData.ModelCA,
                            rowData.ModelCB,
                            rowData.Warna,
                            formatValue(rowData.SWL),
                            formatValue(rowData.SF1),
                            formatValue(rowData.SF2),
                        ])
                        .draw(false);
                });

                setTimeout(() => {
                    btn_print.focus();
                }, 300);
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    const tableHitung = $("#tableHitung").DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        autoWidth: false,
        columnDefs: [
            { orderable: false, targets: [0, 1, 2, 3, 4] }, // Disable ordering on certain columns
        ],
        footerCallback: function (row, data, start, end, display) {
            // Calculate the total in the footer
            var api = this.api();

            // Function to sum a column's data
            var intVal = function (i) {
                return typeof i === "string"
                    ? i.replace(/[\$,]/g, "") * 1
                    : typeof i === "number"
                    ? i
                    : 0;
            };

            // Calculate totals for specific columns
            var beratTotal = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var hargakgTotal = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var hargaTotal = api
                .column(9)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            beratTotal = formatNumber(beratTotal);
            hargakgTotal = formatNumber(hargakgTotal);
            hargaTotal = formatNumber(hargaTotal);

            // Update footer
            $(api.column(7).footer()).html(beratTotal);
            $(api.column(8).footer()).html(hargakgTotal);
            $(api.column(9).footer()).html(hargaTotal);
        },
    });

    // format angka
    function formatNumber(value) {
        if (value === ".00" || value === 0) {
            return "0.00";
        }

        // koma unk ribuan
        let num = parseFloat(value).toFixed(2);
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    btn_print.addEventListener("click", function (event) {
        event.preventDefault();
        if (kodeBarangAsal.value.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Isi kode barang terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        $.ajax({
            url: "TabelHitunganInformasi/printReport",
            type: "GET",
            data: {
                _token: csrfToken,
                kodeBarangAsal: kodeBarangAsal.value,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (result) {
                tableHitung.clear().draw();

                const dataAll = result.data;
                console.log(dataAll);

                var currentDate = new Date();
                var formattedDate =
                    currentDate.getMonth() +
                    1 +
                    "/" +
                    currentDate.getDate() +
                    "/" +
                    currentDate.getFullYear();

                document.getElementById("tanggal_print").textContent =
                    formattedDate;

                var currentPage = 1;
                var totalPages = 1;
                document.getElementById("halaman_print").textContent =
                    currentPage + " dari " + totalPages;
                document.getElementById("tanggal_tabel").innerHTML =
                    "&nbsp;" + formattedDate;
                document.getElementById("customer_tabel").innerHTML =
                    "&nbsp;" +
                    dataAll[0].Nama_Customer +
                    "&nbsp;" +
                    "(" +
                    dataAll[0].Kode_Barang +
                    ")";
                // Mendapatkan data dalam sentimeter
                let lebarCm = dataAll[0].Lebar_BB;
                let panjangCm = dataAll[0].Panjang_BB;
                let tinggiCm = dataAll[0].Tinggi_BB;

                // Konversi ke inch
                let lebarInch = lebarCm / 2.54;
                let panjangInch = panjangCm / 2.54;
                let tinggiInch = tinggiCm / 2.54;

                // Memperbarui nilai HTML
                document.getElementById("ukuran_tabel").innerHTML =
                    "&nbsp;" +
                    dataAll[0].Lebar_BB +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    dataAll[0].Panjang_BB +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    dataAll[0].Tinggi_BB +
                    "&nbsp;" +
                    "(" +
                    lebarInch.toFixed(2) +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    panjangInch.toFixed(2) +
                    "&nbsp;" +
                    "X" +
                    "&nbsp;" +
                    tinggiInch.toFixed(2) +
                    ")";

                document.getElementById("model_tabel").innerHTML =
                    "&nbsp;" + dataAll[0].Model;
                document.getElementById("reinforced_tabel").innerHTML =
                    "&nbsp;" +
                    dataAll[0].Reinforced +
                    "&nbsp;CM,&nbsp;&nbsp;" +
                    "JUMLAH REINFORCED =&nbsp;" +
                    dataAll[0].JmlRein +
                    ".00," +
                    "&nbsp;&nbsp;JARAK REINFORCED&nbsp;" +
                    dataAll[0].JarakRein +
                    ".00&nbsp;CM";
                document.getElementById("swl_tabel").innerHTML =
                    "&nbsp;" + dataAll[0].SWL + "&nbsp;KG";
                document.getElementById("sf_tabel").innerHTML =
                    "&nbsp;" +
                    dataAll[0].SF1 +
                    "&nbsp;:&nbsp;" +
                    dataAll[0].SF2;

                let Wa = parseFloat(dataAll[0].Wa);
                let We = parseFloat(dataAll[0].We);
                let Dnr = parseFloat(dataAll[0].Dnr);

                let berat = (100 * 100 * (Wa + We) * Dnr) / (1143000 * 2);
                let hasilAkhir = berat / (28.35 / 0.9144 / 0.9144);

                document.getElementById("berat_tabel").innerHTML =
                    "&nbsp;" +
                    berat.toFixed(2) +
                    "&nbsp;=&nbsp;" +
                    hasilAkhir.toFixed(2) +
                    "&nbsp;OZ";
                document.getElementById("type_tabel").innerHTML =
                    "&nbsp;" + dataAll[0].Usage_type;

                // untuk tbody
                dataAll.forEach(function (item) {
                    var komponenDisplay;
                    var lebarPotonganDisplay;

                    if (item.Nama_Komponen === "LAMINATING") {
                        komponenDisplay =
                            item.Nama_Komponen +
                            " " +
                            item.Tebal_Lami.trim() +
                            " Mikron";
                    } else if (item.Nama_Komponen === "INNER LINER") {
                        komponenDisplay =
                            item.Nama_Komponen +
                            " " +
                            item.Tebal_Iner.trim() +
                            " Mikron" +
                            " (" +
                            item.SEAL +
                            ")";
                    } else if (
                        item.Nama_Komponen === "CEROBONG ATAS" &&
                        item.Bentuk_CA === "C"
                    ) {
                        if (
                            item.Model_CA === "05CADM" ||
                            item.Model_CA === "05CADX"
                        ) {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Tinggi_CA.trim();
                        } else {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Diameter_CA.trim() +
                                " X " +
                                item.Tinggi_CA.trim();
                        }
                    } else if (
                        item.Nama_Komponen === "CEROBONG BAWAH" &&
                        item.Bentuk_CB === "C"
                    ) {
                        if (item.Model_CB === "06CBDM") {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Tinggi_CB.trim();
                        } else {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Diameter_CB.trim() +
                                " X " +
                                item.Tinggi_CB.trim();
                        }
                    } else if (item.Nama_Komponen === "LIFTING BELT") {
                        komponenDisplay =
                            item.Nama_Komponen +
                            " " +
                            item.Tinggi_Loop +
                            " Tinggi Loop";
                    } else if (item.Nama_Komponen === "SELANG TUTUP") {
                        komponenDisplay =
                            item.Nama_Komponen +
                            " Diameter= " +
                            item.Lebar_Potongan.trim() +
                            " mm";
                    } else if (
                        [
                            "07HR00",
                            "11CR00",
                            "12DR00",
                            "13RR00",
                            "28AR00",
                        ].includes(item.Standart_Komponen)
                    ) {
                        komponenDisplay =
                            item.Nama_Komponen +
                            " Diameter= " +
                            item.Lebar_Potongan.trim() +
                            " mm";
                    } else if (
                        item.Nama_Komponen === "CEROBONG ATAS" &&
                        item.Bentuk_CA === "S"
                    ) {
                        if (
                            item.Model_CA === "05CADM" ||
                            item.Model_CA === "05CADX"
                        ) {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Tinggi_CA.trim();
                        } else {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Tinggi_CA.trim();
                        }
                    } else if (
                        item.Nama_Komponen === "CEROBONG BAWAH" &&
                        item.Bentuk_CB === "S"
                    ) {
                        if (item.Model_CB === "06CBDM") {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Tinggi_CB.trim();
                        } else {
                            komponenDisplay =
                                item.Nama_Komponen +
                                " " +
                                item.Tinggi_CB.trim();
                        }
                    } else {
                        komponenDisplay = item.Nama_Komponen;
                    }

                    if (item.Nama_Komponen === "SELANG TUTUP") {
                        // lebarPotonganDisplay =
                        //     formatNumber(item.Lebar_Potongan.trim()) + " mm";
                        lebarPotonganDisplay = formatNumber(
                            parseFloat(item.Lebar_Potongan) -
                                parseFloat(item.Lebar_Potongan)
                        );
                    } else if (
                        [
                            "07HR00",
                            "11CR00",
                            "12DR00",
                            "13RR00",
                            "28AR00",
                        ].includes(item.Standart_Komponen)
                    ) {
                        // lebarPotonganDisplay = formatNumber(
                        //     item.Lebar_Potongan.trim()
                        // );
                        lebarPotonganDisplay = formatNumber(
                            parseFloat(item.Lebar_Potongan) -
                                parseFloat(item.Lebar_Potongan)
                        );
                    } else {
                        lebarPotonganDisplay = formatNumber(
                            item.Lebar_Potongan.trim()
                        );
                    }
                    tableHitung.row
                        .add([
                            komponenDisplay,
                            formatNumber(item.Panjang_Potongan),
                            lebarPotonganDisplay,
                            formatNumber(item.WA_Rajutan),
                            formatNumber(item.WE_Rajutan),
                            formatNumber(Math.round(item.Denier)),
                            formatNumber(Math.round(item.Quantity)),
                            formatNumber(Math.round(item.Berat)),
                            formatNumber(item.Harga),
                            formatNumber(item.SubTotal),
                        ])
                        .draw(false);
                });

                //Catatan
                // Ambil teks Keterangan dari data
                let keterangan = dataAll[0].Keterangan;

                // Ganti \r\n dengan <br> di depannya
                keterangan = keterangan.replace(/\r\n/g, "<br>");

                // Tambahkan non-breaking space di depan teks
                keterangan = "&nbsp;" + keterangan;

                // Tampilkan hasilnya dalam elemen HTML
                document.getElementById("catatan_tabel").innerHTML = keterangan;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
                // if (nomorUser != "2098") {
                //     window.print();
                // } else {
                // Clone the content you want to print
                const printContent = document
                    .getElementById("contoh_printDiv")
                    .cloneNode(true);

                // Open a new tab
                const printWindow = window.open("", "_blank");

                // Write the content with basic styles
                printWindow.document.open();
                printWindow.document.write(`
                    <html>
                        <head>
                        <link href="${printCssUrl}" rel="stylesheet"></link>
                        <link href="${printCssUrl1}" rel="stylesheet"></link>
                        <link href="${printCssUrl2}" rel="stylesheet"></link>
                        <style>
                            .acs-div-container{
                                display: block;
                            }
                        </style>
                            <title>Print Preview ${kodeBarangAsal.value}</title>
                        </head>
                        <body>
                            ${printContent.outerHTML}
                            <script>
                                window.onload = function() {
                                    //window.print();
                                };
                            </script>
                        </body>
                    </html>`);
                printWindow.document.close();
                // }
            },
        });
    });

    btn_clear.addEventListener("click", function (event) {
        event.preventDefault();
        table.clear().draw();
        bentuk_body.value = "";
        bentuk_ca.value = "";
        bentuk_cb.value = "";
        swl.value = "";
        sf1.value = "";
        sf2.value = "";
        id_customer.value = "";
        customer.value = "";
        kodeBarangAsal.value = "";
        tanggal.value = "";
        ukuran.value = "";
        tanggalu.valueAsDate = new Date();
        user.value = "";
        panjang_body.value = "";
        diameter_body.value = "";
        lebar_body.value = "";
        tinggi_body.value = "";
    });

    // function unk memilih swal dengan arrow keyboard

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_ukuran.focus();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
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
                                url: "TabelHitunganInformasi/getListCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Customer",
                                },
                                {
                                    data: "Kode_Customer",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);

                        const allowedUsers = [
                            "4259",
                            "4405",
                            "4221",
                            "1154",
                            "4290",
                            "6934",
                            "1516",
                            "1055",
                            "4049",
                            "1704",
                            "1715",
                            "1354",
                            "8982",
                        ]; // user jumbo bag mau cari customer by id customer bukan by name or customer id

                        if (allowedUsers.includes(nomorUser.toString())) {
                            $("#customerTable_filter input").on(
                                "keyup",
                                function () {
                                    table
                                        .columns(1) // Kolom kedua (Kode_Customer)
                                        .search(this.value) // Cari berdasarkan input pencarian
                                        .draw(); // Perbarui hasil pencarian
                                }
                            );
                        }
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
                    customer.value = selectedRow.Nama_Customer.trim();
                    id_customer.value = selectedRow.Kode_Customer.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_ukuran.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_kodebarang.focus();
        try {
            const result = await Swal.fire({
                title: "Select a Ukuran",
                html: '<table id="ukuranTable" class="display" style="width:100%"><thead><tr><th>Ukuran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#ukuranTable")
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
                        const table = $("#ukuranTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "TabelHitunganInformasi/getUkuran",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_customer: id_customer.value,
                                },
                            },
                            columns: [{ data: "Ukuran" }],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#ukuranTable_filter input").focus();
                        }, 300);
                        $("#ukuranTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "ukuranTable")
                        );
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    ukuran.value = selectedRow.Ukuran.trim();
                    // tanggal.value = selectedRow.tanggal.trim();

                    // if (proses === 1) {
                    //     console.log(proses);
                    //     btn_nopesanan.disabled = true;
                    //     btn_customers.focus();
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_kodebarang.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_cari.focus();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Barang",
                html: '<table id="barangTable" class="display" style="width:100%"><thead><tr><th>Kode Barang</th><th>Tanggal</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#barangTable")
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
                        const table = $("#barangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "TabelHitunganInformasi/create",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kodeCustomer: id_customer.value,
                                    ukuran: ukuran.value,
                                },
                            },
                            columns: [
                                { data: "Kode_Barang" },
                                {
                                    data: "Tanggal",
                                    render: function (data, type, full, meta) {
                                        return moment(data).format(
                                            "MM/DD/YYYY"
                                        );
                                    },
                                },
                            ],
                            columnDefs: [
                                {
                                    targets: 1,
                                    createdCell: function (td) {
                                        $(td).css({
                                            "white-space": "nowrap",
                                        });
                                    },
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#barangTable_filter input").focus();
                        }, 300);
                        $("#barangTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "barangTable")
                        );
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kodeBarangAsal.value = selectedRow.Kode_Barang.trim();
                    tanggal.value = selectedRow.Tanggal.trim();

                    $.ajax({
                        url: "TabelHitunganInformasi/updateUser",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kodeBarangAsal: kodeBarangAsal.value,
                        },
                        success: function (data) {
                            console.log(data.data[0]);
                            tanggalu.value = data.data[0].Tgl_Update;
                            user.value = data.data[0].Nama_User;

                            // Handle numeric values and format them
                            panjang_body.value = parseFloat(
                                data.data[0].Panjang_BB
                            ).toFixed(2);
                            diameter_body.value = parseFloat(
                                data.data[0].Diameter_BB
                            ).toFixed(2);
                            lebar_body.value = parseFloat(
                                data.data[0].Lebar_BB
                            ).toFixed(2);
                            tinggi_body.value = parseFloat(
                                data.data[0].Tinggi_BB
                            ).toFixed(2);
                            bentuk_body.value = data.data[0].Bentuk_BB;
                            bentuk_body.readOnly = true;

                            // qty_sisa.value = data.ada ? data.ada : 0;
                            // qty_sisa.focus();
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
