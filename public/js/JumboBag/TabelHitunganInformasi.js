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

    const tableHitung = $('#tableHitung').DataTable({
        "paging": false,
        "ordering": false,
        "searching": false,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "orderable": false, "targets": [0, 1, 2, 3, 4] } // Disable ordering on certain columns
        ],
        "footerCallback": function (row, data, start, end, display) {
            // Calculate the total in the footer
            var api = this.api();

            // Function to sum a column's data
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Calculate totals for specific columns
            var beratTotal = api.column(7).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            var hargakgTotal = api.column(8).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            var hargaTotal = api.column(9).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            beratTotal = formatNumber(beratTotal);
            hargakgTotal = formatNumber(hargakgTotal);
            hargaTotal = formatNumber(hargaTotal);

            // Update footer
            $(api.column(7).footer()).html(beratTotal);
            $(api.column(8).footer()).html(hargakgTotal);
            $(api.column(9).footer()).html(hargaTotal);
        }
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
                        komponenDisplay = item.Nama_Komponen + " " + item.Tebal_Lami.trim() + " Mikron";
                    } else if (item.Nama_Komponen === "INNER LINER") {
                        komponenDisplay = item.Nama_Komponen + " " + item.Tebal_Iner.trim() + " Mikron" + " (" + item.SEAL + ")";
                    } else if (item.Nama_Komponen === "CEROBONG ATAS" && item.Bentuk_CA === "C") {
                        if (item.Model_CA === '05CADM' || item.Model_CA === '05CADX') {
                            komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_CA.trim();
                        } else {
                            komponenDisplay = item.Nama_Komponen + " " + item.Diameter_CA.trim() + " X " + item.Tinggi_CA.trim();
                        }
                    } else if (item.Nama_Komponen === "CEROBONG BAWAH" && item.Bentuk_CB === "C") {
                        if (item.Model_CB === '06CBDM') {
                            komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_CB.trim();
                        } else {
                            komponenDisplay = item.Nama_Komponen + " " + item.Diameter_CB.trim() + " X " + item.Tinggi_CB.trim();
                        }
                    } else if (item.Nama_Komponen === "LIFTING BELT") {
                        komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_Loop + " Tinggi Loop";
                    } else if (item.Nama_Komponen === "SELANG TUTUP") {
                        komponenDisplay = item.Nama_Komponen + " Diameter= " + item.Lebar_Potongan.trim() + " mm";
                    } else if (["07HR00", "11CR00", "12DR00", "13RR00", "28AR00"].includes(item.Standart_Komponen)) {
                        komponenDisplay = item.Nama_Komponen + " Diameter= " + item.Lebar_Potongan.trim() + " mm";
                    } else if (item.Nama_Komponen === "CEROBONG ATAS" && item.Bentuk_CA === "S") {
                        if (item.Model_CA === '05CADM' || item.Model_CA === '05CADX') {
                            komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_CA.trim();
                        } else {
                            komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_CA.trim();
                        }
                    } else if (item.Nama_Komponen === "CEROBONG BAWAH" && item.Bentuk_CB === "S") {
                        if (item.Model_CB === '06CBDM') {
                            komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_CB.trim();
                        } else {
                            komponenDisplay = item.Nama_Komponen + " " + item.Tinggi_CB.trim();
                        }
                    } else {
                        komponenDisplay = item.Nama_Komponen;
                    }

                    if (item.Nama_Komponen === "SELANG TUTUP") {
                        lebarPotonganDisplay = formatNumber(item.Lebar_Potongan.trim()) + " mm";
                    } else if (["07HR00", "11CR00", "12DR00", "13RR00", "28AR00"].includes(item.Standart_Komponen)) {
                        lebarPotonganDisplay = formatNumber(item.Lebar_Potongan.trim());
                    } else {
                        lebarPotonganDisplay = formatNumber(item.Lebar_Potongan.trim());
                    }

                    tableHitung.row.add([
                        komponenDisplay,
                        formatNumber(item.Panjang_Potongan),
                        lebarPotonganDisplay,
                        formatNumber(item.WA_Rajutan),
                        formatNumber(item.WE_Rajutan),
                        formatNumber(item.Denier),
                        formatNumber(item.Quantity),
                        formatNumber(item.Berat),
                        formatNumber(item.Harga),
                        formatNumber(item.SubTotal)
                    ]).draw(false);
                });



                // //Total
                // // Inisialisasi total berat
                // let totalBerat = 0;

                // // Loop untuk menjumlahkan Berat dari indeks 0 hingga 14
                // for (let i = 0; i <= 14; i++) {
                //     totalBerat += parseFloat(dataAll[i].Berat);
                // }

                // // Format total berat dengan separator ribuan dan tiga desimal
                // let formattedTotalBerat = totalBerat.toLocaleString("en-US", {
                //     minimumFractionDigits: 3,
                //     maximumFractionDigits: 3,
                // });

                // // Hilangkan 4 karakter dari belakang nilai
                // formattedTotalBerat = formattedTotalBerat.slice(0, -4);

                // // Tampilkan hasil total berat
                // document.getElementById("berat_total").innerHTML =
                //     formattedTotalBerat;

                // // Inisialisasi total harga
                // let totalHarga = 0;

                // // Loop untuk menjumlahkan Harga dari indeks 0 hingga 14
                // for (let i = 0; i <= 14; i++) {
                //     // Konversi nilai Harga ke float untuk menjumlahkan
                //     totalHarga += parseFloat(dataAll[i].Harga);
                // }

                // // Format total harga dengan dua desimal menggunakan toFixed(2)
                // let formattedTotalHarga = totalHarga.toFixed(2);

                // // Ubah ".00" menjadi "0.00" jika formattedTotalHarga sama dengan "0.00"
                // formattedTotalHarga =
                //     formattedTotalHarga === ".00"
                //         ? "0.00"
                //         : parseFloat(formattedTotalHarga)
                //             .toLocaleString("en-US", {
                //                 minimumFractionDigits: 2,
                //                 maximumFractionDigits: 2,
                //             })
                //             // Menghilangkan 3 karakter dari belakang nilai
                //             .slice(0, -3);

                // // Tampilkan hasil total harga
                // document.getElementById("hargakg_total").innerHTML =
                //     formattedTotalHarga;

                // // Inisialisasi total SubTotal
                // let totalSubTotal = 0;

                // // Loop untuk menjumlahkan SubTotal dari indeks 0 hingga 14
                // for (let i = 0; i <= 14; i++) {
                //     // Konversi nilai SubTotal ke float untuk menjumlahkan
                //     totalSubTotal += parseFloat(dataAll[i].SubTotal);
                // }

                // // Format total SubTotal dengan dua desimal menggunakan toFixed(2)
                // let formattedTotalSubTotal = totalSubTotal.toFixed(2);

                // // Tampilkan hasil total SubTotal
                // document.getElementById("harga_total").innerHTML =
                //     formattedTotalSubTotal === ".00"
                //         ? "0.00"
                //         : formattedTotalSubTotal;

                //Catatan
                // Ambil teks Keterangan dari data
                let keterangan = dataAll[0].Keterangan;

                // Ganti \r\n dengan <br> di depannya
                keterangan = keterangan.replace(/\r\n/g, "<br>");

                // Tambahkan non-breaking space di depan teks
                keterangan = "&nbsp;" + keterangan;

                // Tampilkan hasilnya dalam elemen HTML
                document.getElementById("catatan_tabel").innerHTML = keterangan;

                // ----------------------------------------------------------------------------------------------------
                // ----------------------------------------------------------------------------------------------------
                // ----------------------------------------------------------------------------------------------------
                // ----------------------------------------------------------------------------------------------------
                // document.getElementById("ca_x").innerHTML =
                //     ca_x.textContent +
                //     "&nbsp;" +
                //     dataAll[0].Diameter_CA +
                //     "&nbsp;X&nbsp;" +
                //     dataAll[0].Tinggi_CA;
                // document.getElementById("cb_x").innerHTML =
                //     cb_x.textContent +
                //     "&nbsp;" +
                //     dataAll[0].Diameter_CB +
                //     "&nbsp;X&nbsp;" +
                //     dataAll[0].Tinggi_CB;
                // document.getElementById("lb_x").innerHTML =
                //     lb_x.textContent +
                //     "&nbsp;" +
                //     dataAll[0].Tinggi_Loop +
                //     "&nbsp;Tinggi Loop";

                // let tebalLami = dataAll[0].Tebal_Lami;

                // if (parseFloat(tebalLami) === 0) {
                //     tebalLami = "0.00";
                // } else {
                //     tebalLami = parseFloat(tebalLami).toFixed(2);
                // }

                // document.getElementById("lami_x").innerHTML =
                //     lami_x.textContent + "&nbsp;" + tebalLami + "&nbsp;Mikron";

                // //Body Besar
                // document.getElementById("potonganP_bb").innerHTML =
                //     data.data[0].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[0].Panjang_Potongan;
                // document.getElementById("potonganL_bb").innerHTML =
                //     data.data[0].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[0].Lebar_Potongan;
                // document.getElementById("warp_bb").innerHTML =
                //     data.data[0].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[0].WA_Rajutan;
                // document.getElementById("weft_bb").innerHTML =
                //     data.data[0].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[0].WE_Rajutan;
                // document.getElementById("denier_bb").innerHTML =
                //     parseFloat(data.data[0].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[0].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_bb").innerHTML =
                //     parseFloat(data.data[0].Quantity) ===
                //         parseInt(data.data[0].Quantity)
                //         ? parseInt(data.data[0].Quantity)
                //         : parseFloat(data.data[0].Quantity).toFixed(2);
                // document.getElementById("berat_bb").innerHTML =
                //     parseFloat(data.data[0].Berat) ===
                //         parseInt(data.data[0].Berat)
                //         ? parseInt(data.data[0].Berat)
                //         : parseFloat(data.data[0].Berat).toFixed(2);
                // document.getElementById("hargakg_bb").innerHTML =
                //     data.data[0].Harga === ".00" ? "0.00" : data.data[0].Harga;
                // document.getElementById("harga_bb").innerHTML =
                //     data.data[0].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[0].SubTotal;

                // //Tutup Atas
                // document.getElementById("potonganP_ta").innerHTML =
                //     data.data[1].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[1].Panjang_Potongan;
                // document.getElementById("potonganL_ta").innerHTML =
                //     data.data[1].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[1].Lebar_Potongan;
                // document.getElementById("warp_ta").innerHTML =
                //     data.data[1].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[1].WA_Rajutan;
                // document.getElementById("weft_ta").innerHTML =
                //     data.data[1].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[1].WE_Rajutan;
                // document.getElementById("denier_ta").innerHTML =
                //     parseFloat(data.data[1].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[1].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_ta").innerHTML =
                //     parseFloat(data.data[1].Quantity) ===
                //         parseInt(data.data[1].Quantity)
                //         ? parseInt(data.data[1].Quantity)
                //         : parseFloat(data.data[1].Quantity).toFixed(2);
                // document.getElementById("berat_ta").innerHTML =
                //     parseFloat(data.data[1].Berat) ===
                //         parseInt(data.data[1].Berat)
                //         ? parseInt(data.data[1].Berat)
                //         : parseFloat(data.data[1].Berat).toFixed(2);
                // document.getElementById("hargakg_ta").innerHTML =
                //     data.data[1].Harga === ".00" ? "0.00" : data.data[1].Harga;
                // document.getElementById("harga_ta").innerHTML =
                //     data.data[1].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[1].SubTotal;

                // //Tutup Bawah
                // document.getElementById("potonganP_tb").innerHTML =
                //     data.data[2].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[2].Panjang_Potongan;
                // document.getElementById("potonganL_tb").innerHTML =
                //     data.data[2].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[2].Lebar_Potongan;
                // document.getElementById("warp_tb").innerHTML =
                //     data.data[2].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[2].WA_Rajutan;
                // document.getElementById("weft_tb").innerHTML =
                //     data.data[2].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[2].WE_Rajutan;
                // document.getElementById("denier_tb").innerHTML =
                //     parseFloat(data.data[2].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[2].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_tb").innerHTML =
                //     parseFloat(data.data[2].Quantity) ===
                //         parseInt(data.data[2].Quantity)
                //         ? parseInt(data.data[2].Quantity)
                //         : parseFloat(data.data[2].Quantity).toFixed(2);
                // document.getElementById("berat_tb").innerHTML =
                //     parseFloat(data.data[2].Berat) ===
                //         parseInt(data.data[2].Berat)
                //         ? parseInt(data.data[2].Berat)
                //         : parseFloat(data.data[2].Berat).toFixed(2);
                // document.getElementById("hargakg_tb").innerHTML =
                //     data.data[2].Harga === ".00" ? "0.00" : data.data[2].Harga;
                // document.getElementById("harga_tb").innerHTML =
                //     data.data[2].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[2].SubTotal;

                // //Cerobong Atas
                // document.getElementById("potonganP_ca").innerHTML =
                //     data.data[3].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[3].Panjang_Potongan;
                // document.getElementById("potonganL_ca").innerHTML =
                //     data.data[3].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[3].Lebar_Potongan;
                // document.getElementById("warp_ca").innerHTML =
                //     data.data[3].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[3].WA_Rajutan;
                // document.getElementById("weft_ca").innerHTML =
                //     data.data[3].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[3].WE_Rajutan;
                // document.getElementById("denier_ca").innerHTML =
                //     parseFloat(data.data[3].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[3].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_ca").innerHTML =
                //     parseFloat(data.data[3].Quantity) ===
                //         parseInt(data.data[3].Quantity)
                //         ? parseInt(data.data[3].Quantity)
                //         : parseFloat(data.data[3].Quantity).toFixed(2);
                // document.getElementById("berat_ca").innerHTML =
                //     parseFloat(data.data[3].Berat) ===
                //         parseInt(data.data[3].Berat)
                //         ? parseInt(data.data[3].Berat)
                //         : parseFloat(data.data[3].Berat).toFixed(2);
                // document.getElementById("hargakg_ca").innerHTML =
                //     data.data[3].Harga === ".00" ? "0.00" : data.data[3].Harga;
                // document.getElementById("harga_ca").innerHTML =
                //     data.data[3].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[3].SubTotal;

                // //Cerobong Bawah
                // document.getElementById("potonganP_cb").innerHTML =
                //     data.data[4].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[4].Panjang_Potongan;
                // document.getElementById("potonganL_cb").innerHTML =
                //     data.data[4].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[4].Lebar_Potongan;
                // document.getElementById("warp_cb").innerHTML =
                //     data.data[4].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[4].WA_Rajutan;
                // document.getElementById("weft_cb").innerHTML =
                //     data.data[4].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[4].WE_Rajutan;
                // document.getElementById("denier_cb").innerHTML =
                //     parseFloat(data.data[4].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[4].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_cb").innerHTML =
                //     parseFloat(data.data[4].Quantity) ===
                //         parseInt(data.data[4].Quantity)
                //         ? parseInt(data.data[4].Quantity)
                //         : parseFloat(data.data[4].Quantity).toFixed(2);
                // document.getElementById("berat_cb").innerHTML =
                //     parseFloat(data.data[4].Berat) ===
                //         parseInt(data.data[4].Berat)
                //         ? parseInt(data.data[4].Berat)
                //         : parseFloat(data.data[4].Berat).toFixed(2);
                // document.getElementById("hargakg_cb").innerHTML =
                //     data.data[4].Harga === ".00" ? "0.00" : data.data[4].Harga;
                // document.getElementById("harga_cb").innerHTML =
                //     data.data[4].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[4].SubTotal;

                // //Lifting Belt
                // document.getElementById("potonganP_lb").innerHTML =
                //     data.data[10].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[10].Panjang_Potongan;
                // document.getElementById("potonganL_lb").innerHTML =
                //     data.data[10].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[10].Lebar_Potongan;
                // document.getElementById("warp_lb").innerHTML =
                //     data.data[10].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[10].WA_Rajutan;
                // document.getElementById("weft_lb").innerHTML =
                //     data.data[10].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[10].WE_Rajutan;
                // document.getElementById("denier_lb").innerHTML =
                //     parseFloat(data.data[10].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[10].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_lb").innerHTML =
                //     parseFloat(data.data[10].Quantity) ===
                //         parseInt(data.data[10].Quantity)
                //         ? parseInt(data.data[10].Quantity)
                //         : parseFloat(data.data[10].Quantity).toFixed(2);
                // document.getElementById("berat_lb").innerHTML =
                //     parseFloat(data.data[10].Berat) ===
                //         parseInt(data.data[10].Berat)
                //         ? parseInt(data.data[10].Berat)
                //         : parseFloat(data.data[10].Berat).toFixed(2);
                // document.getElementById("hargakg_lb").innerHTML =
                //     data.data[10].Harga === ".00"
                //         ? "0.00"
                //         : data.data[10].Harga;
                // document.getElementById("harga_lb").innerHTML =
                //     data.data[10].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[10].SubTotal;

                // //Discharging
                // document.getElementById("potonganP_dr").innerHTML =
                //     data.data[7].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[7].Panjang_Potongan;
                // let lebarPotongan = parseFloat(data.data[7].Lebar_Potongan);

                // // Cek nilai Standart_Komponen dan terapkan logika
                // if (
                //     data.data[7].Standart_Komponen === "07HR00" ||
                //     data.data[7].Standart_Komponen === "11CR00" ||
                //     data.data[7].Standart_Komponen === "12DR00" ||
                //     data.data[7].Standart_Komponen === "13RR00" ||
                //     data.data[7].Standart_Komponen === "28AR00"
                // ) {
                //     lebarPotongan = lebarPotongan - lebarPotongan; // Menghasilkan 0
                // }

                // // Tampilkan hasil dengan .00 menjadi 0.00
                // document.getElementById("potonganL_dr").innerHTML =
                //     lebarPotongan.toFixed(2) === ".00"
                //         ? "0.00"
                //         : lebarPotongan.toFixed(2);
                // document.getElementById("warp_dr").innerHTML =
                //     data.data[7].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[7].WA_Rajutan;
                // document.getElementById("weft_dr").innerHTML =
                //     data.data[7].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[7].WE_Rajutan;
                // document.getElementById("denier_dr").innerHTML =
                //     parseFloat(data.data[7].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[7].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_dr").innerHTML =
                //     parseFloat(data.data[7].Quantity) ===
                //         parseInt(data.data[7].Quantity)
                //         ? parseInt(data.data[7].Quantity)
                //         : parseFloat(data.data[7].Quantity).toFixed(2);
                // document.getElementById("berat_dr").innerHTML =
                //     parseFloat(data.data[7].Berat) ===
                //         parseInt(data.data[7].Berat)
                //         ? parseInt(data.data[7].Berat)
                //         : parseFloat(data.data[7].Berat).toFixed(2);
                // document.getElementById("hargakg_dr").innerHTML =
                //     data.data[7].Harga === ".00" ? "0.00" : data.data[7].Harga;
                // document.getElementById("harga_dr").innerHTML =
                //     data.data[7].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[7].SubTotal;

                // //Ring Tali
                // document.getElementById("potonganP_rt").innerHTML =
                //     data.data[6].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[6].Panjang_Potongan;
                // document.getElementById("potonganL_rt").innerHTML =
                //     data.data[6].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[6].Lebar_Potongan;
                // document.getElementById("warp_rt").innerHTML =
                //     data.data[6].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[6].WA_Rajutan;
                // document.getElementById("weft_rt").innerHTML =
                //     data.data[6].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[6].WE_Rajutan;
                // document.getElementById("denier_rt").innerHTML =
                //     parseFloat(data.data[6].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[6].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_rt").innerHTML =
                //     parseFloat(data.data[6].Quantity) ===
                //         parseInt(data.data[6].Quantity)
                //         ? parseInt(data.data[6].Quantity)
                //         : parseFloat(data.data[6].Quantity).toFixed(2);
                // document.getElementById("berat_rt").innerHTML =
                //     parseFloat(data.data[6].Berat) ===
                //         parseInt(data.data[6].Berat)
                //         ? parseInt(data.data[6].Berat)
                //         : parseFloat(data.data[6].Berat).toFixed(2);
                // document.getElementById("hargakg_rt").innerHTML =
                //     data.data[6].Harga === ".00" ? "0.00" : data.data[6].Harga;
                // document.getElementById("harga_rt").innerHTML =
                //     data.data[6].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[6].SubTotal;

                // //Selang Tutup
                // document.getElementById("potonganP_st").innerHTML =
                //     data.data[8].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[8].Panjang_Potongan;
                // let lebarPotonganST = parseFloat(data.data[8].Lebar_Potongan);

                // // Mengurangi Lebar_Potongan dengan dirinya sendiri
                // lebarPotonganST = lebarPotonganST - lebarPotonganST;

                // // Tampilkan hasil dengan .00 menjadi 0.00
                // document.getElementById("potonganL_st").innerHTML =
                //     lebarPotongan.toFixed(2) === ".00"
                //         ? "0.00"
                //         : lebarPotongan.toFixed(2);

                // document.getElementById("warp_st").innerHTML =
                //     data.data[8].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[8].WA_Rajutan;
                // document.getElementById("weft_st").innerHTML =
                //     data.data[8].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[8].WE_Rajutan;
                // document.getElementById("denier_st").innerHTML =
                //     parseFloat(data.data[8].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[8].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_st").innerHTML =
                //     parseFloat(data.data[8].Quantity) ===
                //         parseInt(data.data[8].Quantity)
                //         ? parseInt(data.data[8].Quantity)
                //         : parseFloat(data.data[8].Quantity).toFixed(2);
                // document.getElementById("berat_st").innerHTML =
                //     parseFloat(data.data[8].Berat) ===
                //         parseInt(data.data[8].Berat)
                //         ? parseInt(data.data[8].Berat)
                //         : parseFloat(data.data[8].Berat).toFixed(2);
                // document.getElementById("hargakg_st").innerHTML =
                //     data.data[8].Harga === ".00" ? "0.00" : data.data[8].Harga;
                // document.getElementById("harga_st").innerHTML =
                //     data.data[8].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[8].SubTotal;

                // //Pita Pengikat
                // document.getElementById("potonganP_pp").innerHTML =
                //     data.data[5].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[5].Panjang_Potongan;
                // document.getElementById("potonganL_pp").innerHTML =
                //     data.data[5].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[5].Lebar_Potongan;
                // document.getElementById("warp_pp").innerHTML =
                //     data.data[5].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[5].WA_Rajutan;
                // document.getElementById("weft_pp").innerHTML =
                //     data.data[5].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[5].WE_Rajutan;
                // document.getElementById("denier_pp").innerHTML =
                //     parseFloat(data.data[5].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[5].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_pp").innerHTML =
                //     parseFloat(data.data[5].Quantity) ===
                //         parseInt(data.data[5].Quantity)
                //         ? parseInt(data.data[5].Quantity)
                //         : parseFloat(data.data[5].Quantity).toFixed(2);
                // document.getElementById("berat_pp").innerHTML =
                //     parseFloat(data.data[5].Berat) ===
                //         parseInt(data.data[5].Berat)
                //         ? parseInt(data.data[5].Berat)
                //         : parseFloat(data.data[5].Berat).toFixed(2);
                // document.getElementById("hargakg_pp").innerHTML =
                //     data.data[5].Harga === ".00" ? "0.00" : data.data[5].Harga;
                // document.getElementById("harga_pp").innerHTML =
                //     data.data[5].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[5].SubTotal;

                // //Cover Bawah
                // document.getElementById("potonganP_cvb").innerHTML =
                //     data.data[9].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[9].Panjang_Potongan;
                // document.getElementById("potonganL_cvb").innerHTML =
                //     data.data[9].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[9].Lebar_Potongan;
                // document.getElementById("warp_cvb").innerHTML =
                //     data.data[9].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[9].WA_Rajutan;
                // document.getElementById("weft_cvb").innerHTML =
                //     data.data[9].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[9].WE_Rajutan;
                // document.getElementById("denier_cvb").innerHTML =
                //     parseFloat(data.data[9].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[9].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_cvb").innerHTML =
                //     parseFloat(data.data[9].Quantity) ===
                //         parseInt(data.data[9].Quantity)
                //         ? parseInt(data.data[9].Quantity)
                //         : parseFloat(data.data[9].Quantity).toFixed(2);
                // document.getElementById("berat_cvb").innerHTML =
                //     parseFloat(data.data[9].Berat) ===
                //         parseInt(data.data[9].Berat)
                //         ? parseInt(data.data[9].Berat)
                //         : parseFloat(data.data[9].Berat).toFixed(2);
                // document.getElementById("hargakg_cvb").innerHTML =
                //     data.data[9].Harga === ".00" ? "0.00" : data.data[9].Harga;
                // document.getElementById("harga_cvb").innerHTML =
                //     data.data[9].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[9].SubTotal;

                // //Laminating 1
                // document.getElementById("potonganP_lami").innerHTML =
                //     data.data[11].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[11].Panjang_Potongan;
                // document.getElementById("potonganL_lami").innerHTML =
                //     data.data[11].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[11].Lebar_Potongan;
                // document.getElementById("warp_lami").innerHTML =
                //     data.data[11].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[11].WA_Rajutan;
                // document.getElementById("weft_lami").innerHTML =
                //     data.data[11].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[11].WE_Rajutan;
                // document.getElementById("denier_lami").innerHTML =
                //     parseFloat(data.data[11].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[11].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_lami").innerHTML =
                //     parseFloat(data.data[11].Quantity) ===
                //         parseInt(data.data[11].Quantity)
                //         ? parseInt(data.data[11].Quantity)
                //         : parseFloat(data.data[11].Quantity).toFixed(2);
                // document.getElementById("berat_lami").innerHTML =
                //     parseFloat(data.data[11].Berat) ===
                //         parseInt(data.data[11].Berat)
                //         ? parseInt(data.data[11].Berat)
                //         : parseFloat(data.data[11].Berat).toFixed(2);
                // document.getElementById("hargakg_lami").innerHTML =
                //     data.data[11].Harga === ".00"
                //         ? "0.00"
                //         : data.data[11].Harga;
                // document.getElementById("harga_lami").innerHTML =
                //     data.data[11].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[11].SubTotal;

                // //Laminating 2
                // document.getElementById("potonganP_lami2").innerHTML =
                //     data.data[12].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[12].Panjang_Potongan;
                // document.getElementById("potonganL_lami2").innerHTML =
                //     data.data[12].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[12].Lebar_Potongan;
                // document.getElementById("warp_lami2").innerHTML =
                //     data.data[12].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[12].WA_Rajutan;
                // document.getElementById("weft_lami2").innerHTML =
                //     data.data[12].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[12].WE_Rajutan;
                // document.getElementById("denier_lami2").innerHTML =
                //     parseFloat(data.data[12].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[12].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_lami2").innerHTML =
                //     parseFloat(data.data[12].Quantity) ===
                //         parseInt(data.data[12].Quantity)
                //         ? parseInt(data.data[12].Quantity)
                //         : parseFloat(data.data[12].Quantity).toFixed(2);
                // document.getElementById("berat_lami2").innerHTML =
                //     parseFloat(data.data[12].Berat) ===
                //         parseInt(data.data[12].Berat)
                //         ? parseInt(data.data[12].Berat)
                //         : parseFloat(data.data[12].Berat).toFixed(2);
                // document.getElementById("hargakg_lami2").innerHTML =
                //     data.data[12].Harga === ".00"
                //         ? "0.00"
                //         : data.data[12].Harga;
                // document.getElementById("harga_lami2").innerHTML =
                //     data.data[12].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[12].SubTotal;

                // //Benang Jahit
                // document.getElementById("potonganP_bj").innerHTML =
                //     data.data[13].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[13].Panjang_Potongan;
                // document.getElementById("potonganL_bj").innerHTML =
                //     data.data[13].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[13].Lebar_Potongan;
                // document.getElementById("warp_bj").innerHTML =
                //     data.data[13].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[13].WA_Rajutan;
                // document.getElementById("weft_bj").innerHTML =
                //     data.data[13].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[13].WE_Rajutan;
                // document.getElementById("denier_bj").innerHTML =
                //     parseFloat(data.data[13].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[13].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_bj").innerHTML =
                //     parseFloat(data.data[13].Quantity) ===
                //         parseInt(data.data[13].Quantity)
                //         ? parseInt(data.data[13].Quantity)
                //         : parseFloat(data.data[13].Quantity).toFixed(2);
                // document.getElementById("berat_bj").innerHTML =
                //     parseFloat(data.data[13].Berat) ===
                //         parseInt(data.data[13].Berat)
                //         ? parseInt(data.data[13].Berat)
                //         : parseFloat(data.data[13].Berat).toFixed(2);
                // document.getElementById("hargakg_bj").innerHTML =
                //     data.data[13].Harga === ".00"
                //         ? "0.00"
                //         : data.data[13].Harga;
                // document.getElementById("harga_bj").innerHTML =
                //     data.data[13].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[13].SubTotal;

                // //Ongkos Jahit
                // console.log(data.data[14]);

                // document.getElementById("potonganP_oj").innerHTML =
                //     data.data[14].Panjang_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[14].Panjang_Potongan;
                // document.getElementById("potonganL_oj").innerHTML =
                //     data.data[14].Lebar_Potongan === ".00"
                //         ? "0.00"
                //         : data.data[14].Lebar_Potongan;
                // document.getElementById("warp_oj").innerHTML =
                //     data.data[14].WA_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[14].WA_Rajutan;
                // document.getElementById("weft_oj").innerHTML =
                //     data.data[14].WE_Rajutan === ".00"
                //         ? "0.00"
                //         : data.data[14].WE_Rajutan;
                // document.getElementById("denier_oj").innerHTML =
                //     parseFloat(data.data[14].Denier).toFixed(2) === ".00"
                //         ? "0.00"
                //         : parseFloat(data.data[14].Denier).toLocaleString(
                //             undefined,
                //             {
                //                 minimumFractionDigits: 0,
                //                 maximumFractionDigits: 0,
                //             }
                //         );
                // document.getElementById("qty_oj").innerHTML =
                //     parseFloat(data.data[14].Quantity) ===
                //         parseInt(data.data[14].Quantity)
                //         ? parseInt(data.data[14].Quantity)
                //         : parseFloat(data.data[14].Quantity).toFixed(2);
                // document.getElementById("berat_oj").innerHTML =
                //     parseFloat(data.data[14].Berat) ===
                //         parseInt(data.data[14].Berat)
                //         ? parseInt(data.data[14].Berat)
                //         : parseFloat(data.data[14].Berat).toFixed(2);
                // document.getElementById("hargakg_oj").innerHTML =
                //     data.data[14].Harga === ".00"
                //         ? "0.00"
                //         : data.data[14].Harga;
                // document.getElementById("harga_oj").innerHTML =
                //     data.data[14].SubTotal === ".00"
                //         ? "0.00"
                //         : data.data[14].SubTotal;




            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
                window.print();
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
    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = 0;
            } else {
                currentIndex = (currentIndex + 1) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex = (currentIndex - 1 + rowCount) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table.page('next').draw('page');
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table.page('previous').draw('page');
            }
        }
    }

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
                        });
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
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'customerTable'));
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
                        });
                        $("#ukuranTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'ukuranTable'));
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
                                { data: "Tanggal" },
                            ],
                        });
                        $("#barangTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'barangTable'));
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
