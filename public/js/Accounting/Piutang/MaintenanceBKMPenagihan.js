// $(document).ready(function () {
//     var csrfToken = $('meta[name="csrf-token"]').attr("content");
//     let tahun = document.getElementById("tahun");
//     let bulan = document.getElementById("bulan");
//     let tabelDetailPelunasan = document.getElementById("tabelDetailPelunasan");
//     let tabelDetailKurangLebih = document.getElementById(
//         "tabelDetailKurangLebih"
//     );
//     let tabelDetailBiaya = document.getElementById("tabelDetailBiaya");
//     let detpelunasan = document.getElementById("detpelunasan");
//     let idbkm = document.getElementById("idbkm");
//     let radioDetailPelunasan = document.getElementById("radioDetailPelunasan");
//     let radioDetailBiaya = document.getElementById("radioDetailBiaya");
//     let radioDetailKurangLebih = document.getElementById(
//         "radioDetailKurangLebih"
//     );
//     let pilihBank = document.getElementById("pilihBank");
//     let tabelDataPelunasan = $("#tabelDataPelunasan").DataTable();
//     let selectedRows = [];
//     let selectedRowsDetail = [];
//     let selectedRowsDetailKrgLbh = [];
//     let selectedRowsDetailBiaya = [];
//     let selectedIdPelunasan, selectedIdDetail;
//     let dataTable;
//     let dataTable2;
//     let dataTable3;
//     let dataTable4;
//     let tabelTampilBKM;

//     //HIDDEN
//     let total = document.getElementById("total");
//     let uang = document.getElementById("uang");
//     let konversi = document.getElementById("konversi");
//     let sisa = document.getElementById("sisa");
//     let jenisBank = document.getElementById("jenisBank");

//     let idPelunasan = document.getElementById("idPelunasan");
//     let tanggalInput = document.getElementById("tanggalInput");
//     let tanggalTagih = document.getElementById("tanggalTagih");
//     let jenisBayar = document.getElementById("jenisBayar");
//     let namaBankSelect = document.getElementById("namaBankSelect");
//     let mataUang = document.getElementById("mataUang");
//     let noBukti = document.getElementById("noBukti");

//     //modal detail kurang/lebih
//     let jumlahUang = document.getElementById("jumlahUang");
//     let idKodePerkiraanKrgLbh = document.getElementById(
//         "idKodePerkiraanKrgLbh"
//     );
//     let kodePerkiraanKrgLbhSelect = document.getElementById(
//         "kodePerkiraanKrgLbhSelect"
//     );
//     let keterangan = document.getElementById("keterangan");

//     let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");

//     let btnOK = document.getElementById("btnOK");
//     let btnPilihBank = document.getElementById("btnPilihBank");
//     let btnProses = document.getElementById("btnProses");
//     let btnTutup = document.getElementById("btnTutup");
//     let btnTutupModal = document.getElementById("btnTutupModal");
//     let btnKoreksiDetail = document.getElementById("btnKoreksiDetail");
//     let btnProsesKurangLebih = document.getElementById("btnProsesKurangLebih");
//     let btnTampilBKM = document.getElementById("btnTampilBKM");
//     let btnGroupBKM = document.getElementById("btnGroupBKM");
//     let btnCETAK = document.getElementById("btnCETAK");
//     //let btnKoreksiDetail = document.getElementById("btnKoreksiDetail");

//     let formkoreksi = document.getElementById("formkoreksi");
//     let methodform = document.getElementById("methodkoreksi");

//     let formDetailPelunasan = document.getElementById("formDetailPelunasan");
//     let methoddetail = document.getElementById("methoddetail");

//     let formDetailKurangLebih = document.getElementById(
//         "formDetailKurangLebih"
//     );
//     let methodkuranglebih = document.getElementById("methodkuranglebih");

//     let methodbiaya = document.getElementById("methodbiaya");
//     let formDetailBiaya = document.getElementById("formDetailBiaya");

//     let tanggalInputTampil = document.getElementById("tanggalInputTampil");
//     let tanggalInputTampil2 = document.getElementById("tanggalInputTampil2");
//     let formTampilBKM = document.getElementById("formTampilBKM");
//     let methodTampilBKM = document.getElementById("methodTampilBKM");
//     let modalTampilBKM = document.getElementById("modalTampilBKM");

//     //BTNCETAK
//     // let nomer = document.getElementById('nomer');
//     // let tglCetak = document.getElementById('tglCetak');
//     let symbol = document.getElementById("symbol");
//     let terbilangCetak = document.getElementById("terbilangCetak");
//     let jumlahDiterima = document.getElementById("jumlahDiterima");
//     let kodePerkiraanCetak = document.getElementById("kodePerkiraanCetak");
//     let jum1 = document.getElementById("jum1");
//     let rincianPenerimaan = document.getElementById("rincianPenerimaan");
//     let tglCetakForm = document.getElementById("tglCetakForm");
//     let grandTotal = document.getElementById("grandTotal");
//     let symbol2 = document.getElementById("symbol2");
//     let keterangan2 = document.getElementById("keterangan2");
//     let biaya = document.getElementById("biaya");
//     let ket = document.getElementById("ket");
//     let ket1 = document.getElementById("ket1");
//     let ket5 = document.getElementById("ket5");
//     let totalK = document.getElementById("totalK");
//     let jum = document.getElementById("jum");
//     let jum2 = document.getElementById("jum2");
//     let ket6 = document.getElementById("ket6");
//     let ket3 = document.getElementById("ket3");

//     //BTNCETAK
//     let nomer = document.getElementById("nomer");
//     let tglCetak = new Date();
//     const formattedDate2 = tglCetak.toISOString().substring(0, 10);
//     tanggalInput.value = formattedDate2;

//     const tglTagihan = new Date();
//     const formattedDate = tglTagihan.toISOString().substring(0, 10);
//     tanggalTagih.value = formattedDate;

//     const tglCtk = new Date();
//     const formattedDate3 = tglCtk.toISOString().substring(0, 10);
//     console.log(formattedDate3);
//     let tgl2 = ubahFormatTanggal(formattedDate3);
//     tglCetakForm.textContent = tgl2;

//     btnTutupModal.addEventListener("click", function (event) {
//         event.preventDefault();
//         $("#pilihBank").modal("hide");
//     });

//     btnOK.addEventListener("click", function (event) {
//         event.preventDefault();
//         $.ajax({
//             //Get data Mata Uang menurut ID
//             url: "/MaintenanceBKMPenagihan/getTabelPelunasan",
//             method: "GET",
//             data: {
//                 bulan: bulan.value,
//                 tahun: tahun.value,
//             },
//             headers: {
//                 "X-CSRF-TOKEN": csrfToken,
//             },
//             beforeSend: function () {
//                 // Show loading screen
//                 $("#loading-screen").css("display", "flex");
//             },
//             success: function (options) {
//                 dataTable = $("#tabelDataPelunasan").DataTable({
//                     destroy: true,
//                     data: options,
//                     columns: [
//                         {
//                             title: "Tgl. Pelunasan",
//                             data: "Tgl_Pelunasan",
//                             render: function (data) {
//                                 var date = new Date(data);
//                                 var formattedDate = date.toLocaleDateString();

//                                 return `<div>
//                                             <input type="checkbox" name="divisiCheckbox" value="${formattedDate}" />
//                                             <span>${formattedDate}</span>
//                                         </div>`;
//                             },
//                         },
//                         { title: "Id. Pelunasan", data: "Id_Pelunasan" },
//                         { title: "Id. Bank", data: "Id_bank" },
//                         { title: "Jenis Pembayaran", data: "Jenis_Pembayaran" },
//                         { title: "Mata Uang", data: "Nama_MataUang" },
//                         {
//                             title: "Total Pelunasan",
//                             data: "Nilai_Pelunasan",
//                             render: function (data) {
//                                 // Mengubah format angka ke format dengan koma
//                                 return parseFloat(data).toLocaleString();
//                             },
//                         },
//                         { title: "No. Bukti", data: "No_Bukti" },
//                         { title: "Tgl Pembuatan", defaultContent: "" },
//                         { title: "IdCust", data: "ID_Cust", visible: false },
//                         {
//                             title: "Jenis Bayar",
//                             data: "Id_Jenis_Bayar",
//                             visible: false,
//                         },
//                     ],
//                     columnDefs: [
//                         {
//                             targets: "_all", // Apply to all columns
//                             className: "nowrap", // Prevent text wrapping
//                         },
//                     ],
//                 });
//             },
//             error: function (error) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Data Tidak Berhasil Diload!",
//                 });
//                 console.error("Error saving data:", error);
//             },
//             complete: function () {
//                 // Hide loading screen
//                 $("#loading-screen").css("display", "none");
//             },
//         });
//     });

//     btnPilihBank.addEventListener("click", function (event) {
//         event.preventDefault();

//         // Get all rows (across all pages)
//         var rows = dataTable.rows().nodes();

//         // Initialize an empty array to store checked rows
//         var checkedRows = [];

//         // Iterate through all rows and find checked checkboxes
//         Array.from(rows).forEach(function (row) {
//             var checked = $(row).find('input[name="divisiCheckbox"]:checked');
//             if (checked.length > 0) {
//                 // Push the row data to the checkedRows array
//                 checkedRows.push(row);
//             }
//         });

//         // Now, get the data associated with each checked row
//         var checkedData = checkedRows.map(function (row) {
//             return dataTable.row(row).data();
//         });

//         console.log(checkedData);

//         if (checkedRows.length == 1) {
//             $("#pilihBank").modal("show");
//             // $.ajax({
//             //     //Get data Mata Uang menurut ID
//             //     url: "/MaintenanceBKMPenagihan/getDataBank",
//             //     method: "GET",
//             //     headers: {
//             //         "X-CSRF-TOKEN": csrfToken,
//             //     },
//             //     beforeSend: function () {
//             //         // Show loading screen
//             //         $("#loading-screen").css("display", "flex");
//             //     },
//             //     success: function (options) {
//             //         dataTable = $("#tabelDataPelunasan").DataTable({
//             //             destroy: true,
//             //             data: options,
//             //             columns: [
//             //                 {
//             //                     title: "Tgl. Pelunasan",
//             //                     data: "Tgl_Pelunasan",
//             //                     render: function (data) {
//             //                         var date = new Date(data);
//             //                         var formattedDate =
//             //                             date.toLocaleDateString();

//             //                         return `<div>
//             //                                     <input type="checkbox" name="divisiCheckbox" value="${formattedDate}" />
//             //                                     <span>${formattedDate}</span>
//             //                                 </div>`;
//             //                     },
//             //                 },
//             //                 { title: "Id. Pelunasan", data: "Id_Pelunasan" },
//             //                 { title: "Id. Bank", data: "Id_bank" },
//             //                 {
//             //                     title: "Jenis Pembayaran",
//             //                     data: "Jenis_Pembayaran",
//             //                 },
//             //                 { title: "Mata Uang", data: "Nama_MataUang" },
//             //                 {
//             //                     title: "Total Pelunasan",
//             //                     data: "Nilai_Pelunasan",
//             //                     render: function (data) {
//             //                         // Mengubah format angka ke format dengan koma
//             //                         return parseFloat(data).toLocaleString();
//             //                     },
//             //                 },
//             //                 { title: "No. Bukti", data: "No_Bukti" },
//             //                 { title: "Tgl Pembuatan", defaultContent: "" },
//             //                 {
//             //                     title: "IdCust",
//             //                     data: "ID_Cust",
//             //                     visible: false,
//             //                 },
//             //                 {
//             //                     title: "Jenis Bayar",
//             //                     data: "Id_Jenis_Bayar",
//             //                     visible: false,
//             //                 },
//             //             ],
//             //         });
//             //     },
//             //     error: function (error) {
//             //         Swal.fire({
//             //             icon: "error",
//             //             title: "Data Tidak Berhasil Diload!",
//             //         });
//             //         console.error("Error saving data:", error);
//             //     },
//             //     complete: function () {
//             //         // Hide loading screen
//             //         $("#loading-screen").css("display", "none");
//             //     },
//             // });
//             // fetch("/detailbank/")
//             //     .then((response) => response.json())
//             //     .then((options) => {
//             //         console.log(options);
//             //         namaBankSelect.innerHTML = "";

//             //         const defaultOption = document.createElement("option");
//             //         defaultOption.disabled = true;
//             //         defaultOption.selected = true;
//             //         defaultOption.innerText = "Pilih Bank";
//             //         namaBankSelect.appendChild(defaultOption);

//             //         options.forEach((entry) => {
//             //             const option = document.createElement("option");
//             //             option.value = entry.Id_Bank;
//             //             option.innerText =
//             //                 entry.Id_Bank + "|" + entry.Nama_Bank;
//             //             namaBankSelect.appendChild(option);
//             //         });
//             //     });

//             // Menyimpan data dari baris yang dicentang
//             // let rows = tabelDataPelunasan.getElementsByTagName("tr");
//             // for (let i = 1; i < rows.length; i++) {
//             //     let cells = rows[i].cells;
//             //     let checkbox = cells[0].getElementsByTagName("input")[0];
//             //     if (checkbox.checked) {
//             //         let rowData = {
//             //             Tgl_Pelunasan: cells[0].innerText,
//             //             Id_Pelunasan: cells[1].innerText,
//             //             Id_bank: cells[2].innerText,
//             //             Jenis_Pembayaran: cells[3].innerText,
//             //             Nama_MataUang: cells[4].innerText,
//             //             Nilai_Pelunasan: cells[5].innerText,
//             //             No_Bukti: cells[6].innerText,
//             //         };
//             //         console.log(rowData);
//             //         selectedRows.push(rowData);

//             //         fetch("/tabeldetailpelunasan/" + cells[1].innerText)
//             //             .then((response) => response.json())
//             //             .then((options) => {
//             //                 dataTable2 = $("#tabelDetailPelunasan").DataTable({
//             //                     destroy: true,
//             //                     data: options,
//             //                     columns: [
//             //                         {
//             //                             title: "Id. Penagihan",
//             //                             data: "ID_Penagihan",
//             //                             render: function (data) {
//             //                                 return `<input type="checkbox" name="dataCheckbox" value="${data}" /> ${data}`;
//             //                             },
//             //                         },
//             //                         {
//             //                             title: "Nilai Pelunasan",
//             //                             data: "Nilai_Pelunasan",
//             //                             render: function (data) {
//             //                                 // Mengubah format angka ke format dengan koma
//             //                                 return parseFloat(
//             //                                     data
//             //                                 ).toLocaleString();
//             //                             },
//             //                         },
//             //                         {
//             //                             title: "Pelunasan Rupiah",
//             //                             data: "Pelunasan_Rupiah",
//             //                             render: function (data) {
//             //                                 // Mengubah format angka ke format dengan koma
//             //                                 return parseFloat(
//             //                                     data
//             //                                 ).toLocaleString();
//             //                             },
//             //                         },
//             //                         {
//             //                             title: "Kode Perkiraan",
//             //                             data: "Kode_Perkiraan",
//             //                         },
//             //                         { title: "Customer", data: "NamaCust" },
//             //                         {
//             //                             title: "Id. Detail",
//             //                             data: "ID_Detail_Pelunasan",
//             //                         },
//             //                         {
//             //                             title: "Tgl Penagihan",
//             //                             data: "Tgl_Penagihan",
//             //                         },
//             //                     ],
//             //                 });
//             //                 // Setelah fetch selesai, masukkan data detail pelunasan ke dalam tabelDetailPelunasan
//             //                 dataTable2.clear().rows.add(options).draw();
//             //             });

//             //         fetch("/tabelkuranglebih/" + cells[1].innerText)
//             //             .then((response) => response.json())
//             //             .then((options) => {
//             //                 //console.log(cells[1].innerText);
//             //                 dataTable3 = $("#tabelDetailKurangLebih").DataTable(
//             //                     {
//             //                         data: options,
//             //                         destroy: true,
//             //                         columns: [
//             //                             {
//             //                                 title: "Keterangan",
//             //                                 data: "Keterangan",
//             //                                 render: function (data) {
//             //                                     return `<input type="checkbox" name="dataCheckbox" value="${data}" /> ${data}`;
//             //                                 },
//             //                             },
//             //                             {
//             //                                 title: "Jumlah Biaya",
//             //                                 data: "KurangLebih",
//             //                                 render: function (data) {
//             //                                     // Mengubah format angka ke format dengan koma
//             //                                     return parseFloat(
//             //                                         data
//             //                                     ).toLocaleString();
//             //                                 },
//             //                             },
//             //                             {
//             //                                 title: "Kode Perkiraan",
//             //                                 data: "Kode_Perkiraan",
//             //                             },
//             //                             {
//             //                                 title: "Id. Detail",
//             //                                 data: "Id_Detail_Pelunasan",
//             //                             },
//             //                         ],
//             //                     }
//             //                 );
//             //                 // Setelah fetch selesai, masukkan data detail pelunasan ke dalam tabelDetailPelunasan
//             //                 dataTable3.clear().rows.add(options).draw();
//             //             });

//             //         fetch("/tabelbiaya/" + cells[1].innerText)
//             //             .then((response) => response.json())
//             //             .then((options) => {
//             //                 //console.log(cells[1].innerText);
//             //                 dataTable4 = $("#tabelDetailBiaya").DataTable({
//             //                     destroy: true,
//             //                     data: options,
//             //                     columns: [
//             //                         {
//             //                             title: "Keterangan",
//             //                             data: "Keterangan",
//             //                             render: function (data) {
//             //                                 return `<input type="checkbox" name="dataCheckbox" value="${data}" /> ${data}`;
//             //                             },
//             //                         },
//             //                         {
//             //                             title: "Jumlah Biaya",
//             //                             data: "Biaya",
//             //                             render: function (data) {
//             //                                 // Mengubah format angka ke format dengan koma
//             //                                 return parseFloat(
//             //                                     data
//             //                                 ).toLocaleString();
//             //                             },
//             //                         },
//             //                         {
//             //                             title: "Kode Perkiraan",
//             //                             data: "Kode_Perkiraan",
//             //                         },
//             //                         {
//             //                             title: "Id. Detail",
//             //                             data: "Id_Detail_Pelunasan",
//             //                         },
//             //                     ],
//             //                 });
//             //                 // Setelah fetch selesai, masukkan data detail pelunasan ke dalam tabelDetailPelunasan
//             //                 dataTable4.clear().rows.add(options).draw();
//             //             });
//             //     }
//             // console.log(dataTable2.data());
//             // console.log(dataTable3.data());
//             // console.log(dataTable4.data());
//             // }
//         } else {
//             Swal.fire({
//                 icon: "error",
//                 title:
//                     checkedRows.length > 1
//                         ? "More than one checkbox is checked"
//                         : "No checkboxes are checked",
//             });
//         }
//         // console.log(selectedRows);
//         // Ambil modal dan elemen-elemennya berdasarkan ID
//         // const tglPelunasan = $("#tglPelunasan");
//         // const idPelunasan = $("#idPelunasan");
//         // const jenisBayar = $("#jenisBayar");
//         // const idBank = $("#idBank");
//         // const mataUang = $("#mataUang");
//         // const nilaiPelunasan = $("#nilaiPelunasan");
//         // const noBukti = $("#noBukti");

//         // const selectedData = selectedRows[0];

//         // Isi nilai pada elemen-elemen modal berdasarkan data yang diambil
//         // tglPelunasan.val(selectedData.Tgl_Pelunasan);
//         // idPelunasan.val(selectedData.Id_Pelunasan);
//         // jenisBayar.val(selectedData.Jenis_Pembayaran);
//         // idBank.val(selectedData.Id_bank);
//         // mataUang.val(selectedData.Nama_MataUang);
//         // nilaiPelunasan.val(selectedData.Nilai_Pelunasan);
//         // noBukti.val(selectedData.No_Bukti);
//     });

//     namaBankSelect.addEventListener("change", function (event) {
//         event.preventDefault();
//         // console.log(idBank.value);
//         const selectedOption =
//             namaBankSelect.options[namaBankSelect.selectedIndex];
//         if (selectedOption) {
//             const idBankInput = document.getElementById("idBank");
//             const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
//             const idBank = selectedValue.split(" | ")[0];
//             idBankInput.value = idBank;
//         }
//     });

//     $("#tabelDataPelunasan tbody").off("click", "input[type='checkbox'");
//     $("#tabelDataPelunasan tbody").off("change", "input[type='checkbox']");
//     $("#tabelDataPelunasan tbody").on(
//         "change",
//         "input[type='checkbox']",
//         function () {}
//     );
//     $("#tabelDataPelunasan tbody").on(
//         "click",
//         "input[type='checkbox']",
//         function () {}
//     );

//     $("#btnProses").on("click", function (event) {
//         event.preventDefault();

//         const currentDate = new Date();
//         const day = currentDate.getDate();
//         const month = currentDate.getMonth() + 1;
//         const year = currentDate.getFullYear();
//         const formattedDate = `${month}/${day}/${year}`;

//         tglInputNew.value = `${year}-${month < 10 ? "0" : ""}${month}-${
//             day < 10 ? "0" : ""
//         }${day}`;

//         const idBank = $("#idBank").val();
//         const selectedRowsIndices = [];
//         $("#tabelDataPelunasan tbody input[type='checkbox']:checked").each(
//             function () {
//                 const row = $(this).closest("tr");
//                 const rowIndex = dataTable.row(row).index();
//                 selectedRowsIndices.push(rowIndex);
//             }
//         );
//         // Update the "Id. Bank" column with the selected value for the selected rows
//         updateIdBankColumn(idBank, selectedRowsIndices);

//         selectedRowsIndices.forEach((rowIdx) => {
//             const row = dataTable.row(rowIdx);
//             if (row) {
//                 const rowData = row.data();
//                 rowData["Tgl_Pembuatan"] = formattedDate;
//                 row.data(rowData).draw();
//             }
//         });
//         $("#pilihBank").modal("hide");
//     });

//     kodePerkiraanSelect.addEventListener("change", function (event) {
//         event.preventDefault();
//         const selectedOption =
//             kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
//         if (selectedOption) {
//             const idKodeInput = document.getElementById("idKodePerkiraan");
//             const selectedValue = selectedOption.value;
//             const idKode = selectedValue.split(" | ")[0];
//             idKodeInput.value = idKode;
//         }
//     });

//     kodePerkiraanKrgLbhSelect.addEventListener("change", function (event) {
//         event.preventDefault();
//         const selectedOption =
//             kodePerkiraanKrgLbhSelect.options[
//                 kodePerkiraanKrgLbhSelect.selectedIndex
//             ];
//         if (selectedOption) {
//             const idKodeInput = document.getElementById(
//                 "idKodePerkiraanKrgLbh"
//             );
//             const selectedValue = selectedOption.value;
//             const idKode = selectedValue.split(" | ")[0];
//             idKodeInput.value = idKode;
//         }
//     });

//     let bankArray = []; // Array untuk menyimpan data bank
//     let tanggalArray = [];
//     let nilaipelunasan = [];
//     let idcustArray = [];
//     let jenisBayarArray = [];
//     let idPelunasanArray = [];
//     let mataUangArray = [];

//     btnGroupBKM.addEventListener("click", function (event) {
//         const selectedDataArray = [];
//         event.preventDefault();
//         let idBKMGenerated = false;
//         bankArray = [];
//         tanggalArray = [];
//         jenisBayarArray = [];
//         idPelunasanArray = [];
//         nilaipelunasan = [];
//         let count = 0;
//         var arrayindex = [];
//         $("input[name='divisiCheckbox']:checked").each(function () {
//             // const isChecked = $(this).prop("checked");
//             let rowIndex = $(this).closest("tr").index();
//             arrayindex.push(rowIndex);
//             count += 1;
//         });

//         if (count > 1) {
//             // console.log("mmmmmmmmmmmmm");
//             console.log(arrayindex);
//             for (let i = 0; i < arrayindex.length; i++) {
//                 bankArray.push(dataTable.cell(arrayindex[i], 2).data());
//                 tanggalArray.push(dataTable.cell(arrayindex[i], 7).data());
//                 nilaipelunasan.push(
//                     parseFloat(dataTable.cell(arrayindex[i], 5).data())
//                 );
//                 idcustArray.push(dataTable.cell(arrayindex[i], 8).data());
//                 if (
//                     dataTable.cell(arrayindex[i], 7).data() == null &&
//                     dataTable.cell(arrayindex[i], 2).data() == null
//                 ) {
//                     alert(
//                         "Input Tgl Pembuatan BKM & Id.Bank, Klik Tombol Pilih Bank"
//                     );
//                     return;
//                 }
//                 idBKMGenerated = true;

//                 rowData = dataTable.row(arrayindex[i]).data();
//                 rowData.idBKM = ""; // Menambahkan placeholder untuk idBKM pada setiap data
//                 selectedDataArray.push(rowData);
//             }
//             console.log(bankArray);
//             // console.log(tanggalArray);
//             let cek = Check();
//             if (cek == true) {
//                 return;
//             }

//             console.log(selectedDataArray);
//         } else if (count == 1) {
//             for (let i = 0; i < arrayindex.length; i++) {
//                 idPelunasanArray.push(dataTable.cell(arrayindex[i], 1).data());
//                 bankArray.push(dataTable.cell(arrayindex[i], 2).data());
//                 mataUangArray.push(dataTable.cell(arrayindex[i], 4).data());
//                 nilaipelunasan.push(
//                     parseFloat(dataTable.cell(arrayindex[i], 5).data())
//                 );
//                 tanggalArray.push(dataTable.cell(arrayindex[i], 7).data());
//                 idcustArray.push(dataTable.cell(arrayindex[i], 8).data());
//                 jenisBayarArray.push(dataTable.cell(arrayindex[i], 9).data());
//                 if (
//                     dataTable.cell(arrayindex[i], 9).data() == 1 ||
//                     dataTable.cell(arrayindex[i], 9).data() == 4
//                 ) {
//                     fetch(
//                         "/cekNoPelunasanBKMPenagihan/" +
//                             idPelunasanArray[0] +
//                             "/" +
//                             idcustArray[0]
//                     )
//                         .then((response) => response.json())
//                         .then((options) => {
//                             console.log(options);

//                             if (options[0].ada > 0) {
//                                 alert(
//                                     "Buat BKM utk Id.Pelunasan yg lebih kecil dulu."
//                                 );
//                                 return;
//                             }

//                             if (
//                                 dataTable.cell(arrayindex[i], 7).data() != "" ||
//                                 dataTable.cell(arrayindex[i], 2).data() != ""
//                             ) {
//                                 if (idBank.value === "KRR1") {
//                                     idBank.value = "KI";
//                                 } else if (idBank.value === "KRR2") {
//                                     idBank.value = "KKM";
//                                 } else {
//                                     idBank.value = bankArray[0];
//                                 }

//                                 uang.value = mataUangArray[0];
//                                 let totalPembayaran = nilaipelunasan[0];
//                                 const formattedCurrency =
//                                     formatToCurrency(totalPembayaran);
//                                 total.value = formattedCurrency;
//                                 if (
//                                     mataUangArray[0].toUpperCase() == "RUPIAH"
//                                 ) {
//                                     const words = convertNumberToWordsRupiah(
//                                         nilaipelunasan[0]
//                                     );
//                                     konversi.value = words;
//                                 } else {
//                                 }

//                                 fetch(
//                                     "/cekJumlahRincianBKMPenagihan/" +
//                                         idPelunasan.value
//                                 )
//                                     .then((response) => response.json())
//                                     .then((options) => {
//                                         console.log(options);

//                                         if (
//                                             options[0].Pelunasan <
//                                             totalPembayaran
//                                         ) {
//                                             sisa.value = parseFloat(
//                                                 totalPembayaran -
//                                                     options[0].Pelunasan
//                                             );
//                                         }
//                                     });

//                                 fetch("/getJenisBankCreateBKM/" + bankArray[0])
//                                     .then((response) => response.json())
//                                     .then((options) => {
//                                         console.log(options);

//                                         jenisBank.value = options[0].jenis;
//                                     });
//                             }
//                         });
//                 }
//                 idBKMGenerated = true;

//                 rowData = dataTable.row(arrayindex[i]).data();
//                 rowData.idBKM = ""; // Menambahkan placeholder untuk idBKM pada setiap data
//                 selectedDataArray.push(rowData);
//             }

//             if (idBKM.value === "") {
//                 console.log(idBank.value);
//                 if (idBank.value === "KRR1") {
//                     console.log("masuk krr1");
//                     idBank.value = "KI";
//                 } else if (idBank.value === "KRR2") {
//                     idBank.value = "KKM";
//                 }
//             } else {
//                 idBank.value = bankArray[0];
//             }

//             // console.log("nnnnnnnnnnnnnnnnn");
//             // fetch("/getJenisBankCreateBKM/" + bankArray[0])
//             // .then((response) => response.json())
//             // .then((options) => {
//             //     console.log(options);

//             //     jenisBank.value = options[0].jenis;
//             // });

//             // let tanggalSajaArray = tanggalArray.map(dateTimeString => {
//             //     const tanggalSaja = dateTimeString.split(' ')[0];
//             //     return tanggalSaja;
//             // });

//             // // tanggal.value = selectedDataArray[0].TglInput;
//             // const tglInput = selectedDataArray[0].TglInput;
//             // const [tanggal1, waktu] = tglInput.split(" ");
//             // selectedDataArray[0].TglInput = tanggal1;
//             // tanggal.value = tanggal1;

//             // uang.value = mataUangArr[mataUangArr.length -1];
//             // console.log(nilaipelunasan);
//             // let totalPembayaran = nilaipelunasan[0];
//             // const formattedCurrency = formatToCurrency(totalPembayaran);
//             // totalPelunasan.value = formattedCurrency;
//             // const words = numberToWords(nilaipelunasan[0]);
//             // konversi.value = words;

//             if (idBKMGenerated) {
//                 fetch("/getidbkm/" + idBank.value + "/" + tglInputNew.value)
//                     .then((response) => response.json())
//                     .then((options) => {
//                         idBKMNew.value = options;

//                         // Tambahkan ID BKM ke setiap data yang dicentang
//                         selectedDataArray.forEach((data) => {
//                             data.idBKM = options;
//                         });

//                         alert("Id. BKM nya: " + idBKMNew.value);
//                         console.log(options);

//                         const id1 = idBKMNew.value.substring(0, 3);
//                         console.log(id1); // Mengambil tiga karakter pertama
//                         idbkm.value = id1;

//                         console.log(idbkm);
//                         // methodform.value = "POST";
//                         // fetch("/prosesSisaPiutang/" + idPelunasan.value)
//                         //     .then((response) => response.json())
//                         //     .then((options) => {
//                         //         console.log(options);
//                         // });
//                         $.ajax({
//                             url: "insertUpdateBKMPenagihan/groupbkm",
//                             method: "post",
//                             data: new FormData(formkoreksi),
//                             dataType: "JSON",
//                             contentType: false,
//                             cache: false,
//                             processData: false,
//                             success: function (response) {
//                                 alert(response);
//                             },
//                         });
//                         // btnOK.click();
//                     });
//                 console.log(selectedDataArray);
//             }
//         }
//     });

//     function Check() {
//         //     let k = 1; // variabel untuk menyimpan nilai k
//         //     let l = 1;
//         //     let tanggalSajaArray = tanggalArray.map(dateTimeString => {
//         //         const tanggalSaja = dateTimeString.split(' ')[0];
//         //         return tanggalSaja;
//         //     });
//         //     for (let i = 1; i < bankArray.length; i++) {
//         //         // const element = array[i];
//         //         if (bankArray[0] == bankArray[i]) {
//         //                 k += 1;
//         //         }
//         //         if (tanggalSajaArray[0] == tanggalSajaArray[i]) {
//         //             l += 1;
//         //             console.log(tanggalSajaArray[0]);
//         //         }
//         //     }
//         //     if (k !== bankArray.length || l !== bankArray.length) {
//         //         console.log(k);
//         //         console.log(l);
//         //         console.log(bankArray);
//         //         alert('Nama Bank & Tgl Pembuatan Harus SAMA!');
//         //         return true;
//         //     } else if (k == bankArray.length && l == bankArray.length) {
//         //         if (bankArray[1] == "KRR2") {
//         //             idBank.value = "KI";
//         //         } else if (bankArray[1] == "KRR1") {
//         //             idBank.value = "KKM";
//         //         } else {
//         //             idBank.value = bankArray[0];
//         //         }
//         //         console.log(bankArray);;
//         //     }
//         //     console.log(k);
//         //     console.log(l);
//         //     console.log(bankArray);
//         //     console.log(tanggalArray);
//         //     console.log(nilaipelunasan);
//         //     fetch("/getJenisBankCreateBKM/" + idBank.value)
//         //         .then((response) => response.json())
//         //         .then((options) => {
//         //             console.log(options);
//         //             jenisBank.value = options[0].jenis;
//         //         });
//     }

//     btnCETAK.addEventListener("click", function (event) {
//         event.preventDefault();
//         console.log(idBKMInput.value);

//         // fetch("/getCetakBKMJumlahPelunasan/" + idBKMInput.value)
//         //     .then((response) => response.json())
//         //     .then((options) => {
//         //         console.log(options);
//         //     })

//         fetch("/getCetakBKMNoPenagihan/" + idBKMInput.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);

//                 nomer.textContent = options[0].Id_BKM;
//                 const tglInput = options[0].Tgl_Input;
//                 const [tanggal1, waktu] = tglInput.split(" ");
//                 options[0].TglInput = tanggal1;
//                 let tgl = ubahFormatTanggal(tanggal1);
//                 tglCetak.textContent = tgl;

//                 symbol.textContent = options[0].Symbol;
//                 jumlahDiterima.textContent = options[0].Nilai_Pelunasan;
//                 terbilangCetak.textContent = options[0].Terjemahan;
//                 kodePerkiraanCetak.textContent = options[0].Kode_Perkiraan;
//                 // symbol2.textContent = options[0].Symbol;
//                 // grandTotal.textContent = options[0].Nilai_Pelunasan;
//                 rincianPenerimaan.textContent =
//                     options[0].NamaCust + " - " + options[0].ID_Penagihan;

//                 let totalBiaya = options.reduce(
//                     (total, option) => total + option.Biaya,
//                     ""
//                 );
//                 let totalKurangLebih = options.reduce(
//                     (total, option) => total + option.KurangLebih,
//                     ""
//                 );

//                 if (
//                     (options[0].ID_Penagihan != null && totalBiaya > 0) ||
//                     (options[0].ID_Penagihan != null && totalKurangLebih != 0)
//                 ) {
//                     keterangan2.textContent = "(+)";
//                 } else if (
//                     options[0].ID_Penagihan == null &&
//                     options[0].Biaya != 0
//                 ) {
//                     keterangan2.textContent = "(-)";
//                 } else if (
//                     options[0].ID_Penagihan == null &&
//                     options[0].KurangLebih > 0
//                 ) {
//                     keterangan2.textContent = "(+)";
//                 } else if (
//                     (options[0].ID_Penagihan != null && totalBiaya == 0) ||
//                     (options[0].ID_Penagihan != null && totalKurangLebih == 0)
//                 ) {
//                     keterangan2.textContent = "";
//                 }

//                 if (totalBiaya == 0 && totalKurangLebih == 0) {
//                     biaya.textContent = null;
//                 } else if (
//                     (options[0].ID_Penagihan != null && totalBiaya != 0) ||
//                     (options[0].ID_Penagihan != null && totalKurangLebih != 0)
//                 ) {
//                     biaya.textContent = options[0].Nilai_Rincian;
//                 } else if (
//                     (options[0].ID_Penagihan == null && totalBiaya != 0) ||
//                     (options[0].ID_Penagihan == null && totalKurangLebih != 0)
//                 ) {
//                     if (options[0].Biaya != 0 && options[0].KurangLebih == 0) {
//                         biaya.textContent = options[0].Biaya;
//                     } else if (
//                         options[0].KurangLebih != 0 &&
//                         options[0].Biaya == 0
//                     ) {
//                         biaya.textContent = options[0].KurangLebih;
//                     }
//                 } else if (
//                     options[0].ID_Penagihan == null &&
//                     options[0].Keterangan != 0
//                 ) {
//                     biaya.textContent = options[0].Nilai_Rincian;
//                 }

//                 if (totalBiaya == 0 && totalKurangLebih == 0) {
//                     jum1.textContent = options[0].Nilai_Rincian;
//                 } else {
//                     jum1.textContent = "";
//                 }

//                 if (jum.textContent == 0 && jum2.textContent == 0) {
//                     ket.textContent = "Jumlah Tagihan: ";
//                 }

//                 if (jum.textContent > 0 || jum2.textContent != 0) {
//                     totalK.textContent = options.reduce(
//                         (total, option) => total + option.Nilai_Rincian,
//                         ""
//                     );
//                 } else {
//                     totalK.textContent = 0;
//                 }

//                 if (jum.textContent == 0) {
//                     ket1.textContent = "";
//                 } else {
//                     ket1.textContent = "Lain-lain: ";
//                 }

//                 if (jum.textContent == 0) {
//                     ket3.textContent = "(-)";
//                 } else {
//                     ket3.textContent = "";
//                 }

//                 jum.textContent = totalBiaya;

//                 if (jum2.textContent == 0) {
//                     ket5.textContent = "";
//                 } else if (jum2.textContent < 0) {
//                     ket5.textContent = "Kekurangan: ";
//                 } else if (jum2.textContent > 0) {
//                     ket5.textContent = "Kelebihan";
//                 }

//                 if (jum2.textContent > 0) {
//                     ket6.textContent = "(+)";
//                 } else if (jum2.textContent < 0) {
//                     ket6.textContent = "";
//                 } else {
//                     ket6.textContent = "";
//                 }
//                 jum2.textContent = totalKurangLebih;
//                 console.log(options);
//                 if (totalBiaya == 0 || totalKurangLebih == 0) {
//                     symbol2.textContent = "";
//                 } else if (totalBiaya > 0 || totalKurangLebih != 0) {
//                     symbol2.textContent = options[0].Symbol;
//                 }

//                 if (jum1.textContent == 0) {
//                     grandTotal.textContent =
//                         totalK.textContent - jum.textContent + jum2.textContent;
//                 } else {
//                     grandTotal.textContent = options.reduce(
//                         (total, option) => total + option.Nilai_Rincian,
//                         ""
//                     );
//                 }

//                 window.print();
//             });
//     });

//     $("#btnProsesDetail").on("click", function (event) {
//         event.preventDefault();
//         const idKodePerkiraan = $("#idKodePerkiraan").val();
//         const selectedRowsIndices = [];
//         $("#tabelDetailPelunasan tbody input[type='checkbox']:checked").each(
//             function () {
//                 const row = $(this).closest("tr");
//                 const rowIndex = dataTable2.row(row).index();
//                 selectedRowsIndices.push(rowIndex);
//             }
//         );

//         updateKpColumn(idKodePerkiraan, selectedRowsIndices);

//         methoddetail.value = "PUT";
//         formDetailPelunasan.action =
//             "/MaintenanceBKMPenagihan/" + iddetail.value;
//         console.log("formDetailPelunasan:", formDetailPelunasan);

//         //formDetailPelunasan.submit();
//         $("#modalDetailPelunasan").modal("hide");
//     });

//     $("#btnProsesBiaya").on("click", function (event) {
//         event.preventDefault();
//         const idKodePerkiraanBiaya = $("#idKodePerkiraanBiaya").val();
//         const selectedRowsIndices = [];
//         $("#tabelDetailBiaya tbody input[type='checkbox']:checked").each(
//             function () {
//                 const row = $(this).closest("tr");
//                 const rowIndex = dataTable4.row(row).index();
//                 selectedRowsIndices.push(rowIndex);
//             }
//         );

//         updateKpColumn3(idKodePerkiraanBiaya, selectedRowsIndices);

//         methodbiaya.value = "PUT";
//         formDetailBiaya.action =
//             "/MaintenanceBKMPenagihan/" + idDetailBiaya.value;
//         formDetailBiaya.submit();

//         //$('#modalDetailKurangLebih').modal('hide');
//     });

//     $("#btnProsesKurangLebih").on("click", function (event) {
//         event.preventDefault();
//         const idKodePerkiraanKrgLbh = $("#idKodePerkiraanKrgLbh").val();
//         const selectedRowsIndices = [];
//         $("#tabelDetailKurangLebih tbody input[type='checkbox']:checked").each(
//             function () {
//                 const row = $(this).closest("tr");
//                 const rowIndex = dataTable3.row(row).index();
//                 selectedRowsIndices.push(rowIndex);
//             }
//         );

//         updateKpColumn2(idKodePerkiraanKrgLbh, selectedRowsIndices);

//         methodkuranglebih.value = "PUT";
//         formDetailKurangLebih.action =
//             "/MaintenanceBKMPenagihan/" + idcoba.value;
//         formDetailKurangLebih.submit();

//         //$('#modalDetailKurangLebih').modal('hide');
//     });

//     btnKoreksiDetail.addEventListener("click", function (event) {
//         event.preventDefault();
//     });

//     btnTampilBKM.addEventListener("click", function (event) {
//         event.preventDefault();
//         modalTampilBKM = $("#modalTampilBKM");
//         modalTampilBKM.modal("show");

//         const tglTampilBKM = new Date();
//         const formattedDate3 = tglTampilBKM.toISOString().substring(0, 10);
//         tanggalInputTampil.value = formattedDate3;

//         const tglTampilBKM2 = new Date();
//         const formattedDate4 = tglTampilBKM2.toISOString().substring(0, 10);
//         tanggalInputTampil2.value = formattedDate4;
//     });

//     btnOkTampil.addEventListener("click", function (event) {
//         event.preventDefault();
//         fetch(
//             "/getTabelTampilBKMPenagihan/" +
//                 tanggalInputTampil.value +
//                 "/" +
//                 tanggalInputTampil2.value
//         )
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 tabelTampilBKM = $("#tabelTampilBKM").DataTable({
//                     data: options,
//                     columns: [
//                         {
//                             title: "Tgl. Input",
//                             data: "Tgl_Input",
//                             render: function (data) {
//                                 return `<input type="checkbox" name="dataCheckbox" value="${data}" /> ${data}`;
//                             },
//                         },
//                         { title: "Id. BKM", data: "Id_BKM" },
//                         { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" },
//                         { title: "Terjemahan", data: "Terjemahan" },
//                     ],
//                 });

//                 let lastCheckedCheckbox = null;

//                 tabelTampilBKM.on(
//                     "change",
//                     'input[name="dataCheckbox"]',
//                     function () {
//                         if (
//                             lastCheckedCheckbox &&
//                             lastCheckedCheckbox !== this
//                         ) {
//                             lastCheckedCheckbox.checked = false;
//                         }
//                         lastCheckedCheckbox = this;

//                         const checkedCheckbox = tabelTampilBKM
//                             .row($(this).closest("tr"))
//                             .data();
//                         idBKMInput = document.getElementById("idBKM");

//                         if ($(this).prop("checked")) {
//                             idBKMInput.value = checkedCheckbox.Id_BKM;
//                         } else {
//                             idBKMInput.value = "";
//                         }
//                     }
//                 );
//             });
//     });

//     function clickOK() {
//         let bulanValue = bulan.value;
//         let tahunValue = tahun.value;
//         if (bulanValue.trim() === "" || tahunValue.trim() === "") {
//             alert("Harap isi bulan dan tahun terlebih dahulu!");
//             return;
//         }
//         const currentDate = new Date();
//         const currentMonth = currentDate.getMonth() + 1;
//         const currentYear = currentDate.getFullYear();

//         const selectedMonth = parseInt(bulanValue, 10);
//         const selectedYear = parseInt(tahunValue, 10);

//         // if (selectedYear > currentYear || (selectedYear === currentYear && selectedMonth >= currentMonth)) {
//         //     alert('TIDAK BOLEH CREATE BKM U/ BLN INI!!!');
//         //     bulan.value = "";
//         //     tahun.value = "";
//         //     return;
//         // }
//     }

//     function validatePilihBank() {
//         const checkedRows = document.querySelectorAll(
//             'input[name="divisiCheckbox"]:checked'
//         );
//         if (checkedRows.length === 0) {
//             alert("Pilih 1 Data Pelunasan!");
//             return false;
//         } else {
//             $("#pilihBank").modal("show");
//         }
//         const modal = document.getElementById("pilihBankModal");
//         modal.style.display = "block";

//         window.onclick = function (event) {
//             if (event.target === modal) {
//                 modal.style.display = "none";
//             }
//         };
//         return true;
//     }

//     function updateIdBankColumn(namaBankSelect, selectedRows) {
//         // Loop through each selected row index and update the data for the specific column
//         selectedRows.forEach((rowIdx) => {
//             // Get the DataTable row object for the selected row index
//             const row = dataTable.row(rowIdx);
//             if (row) {
//                 // Get the current data for the row
//                 const rowData = row.data();
//                 const selectedValue = namaBankSelect.split("|");
//                 const idBankValue = selectedValue[0];

//                 // Update the "Id. Bank" column in the selected row with the id value
//                 rowData["Id_bank"] = idBankValue;
//                 row.data(rowData).draw();
//             }
//         });
//     }

//     function updateKpColumn(kodePerkiraanSelect, selectedRows) {
//         // Loop through each selected row index and update the data for the specific column
//         selectedRows.forEach((rowIdx) => {
//             // Get the DataTable row object for the selected row index
//             const row = dataTable2.row(rowIdx);
//             if (row) {
//                 // Get the current data for the row
//                 const rowData = row.data();
//                 const selectedValue = kodePerkiraanSelect.split("|");
//                 const idKpValue = selectedValue[0];

//                 rowData["Kode_Perkiraan"] = idKpValue;
//                 row.data(rowData).draw();
//             }
//         });
//     }

//     function updateKpColumn2(kodePerkiraanKrgLbhSelect, selectedRows) {
//         // Loop through each selected row index and update the data for the specific column
//         selectedRows.forEach((rowIdx) => {
//             // Get the DataTable row object for the selected row index
//             const row = dataTable3.row(rowIdx);
//             if (row) {
//                 // Get the current data for the row
//                 const rowData = row.data();
//                 const selectedValue = kodePerkiraanKrgLbhSelect.split("|");
//                 const idKpValue = selectedValue[0];

//                 rowData["Kode_Perkiraan"] = idKpValue;
//                 row.data(rowData).draw();
//             }
//         });
//     }

//     function updateKpColumn3(kodePerkiraanBiayaSelect, selectedRows) {
//         // Loop through each selected row index and update the data for the specific column
//         selectedRows.forEach((rowIdx) => {
//             // Get the DataTable row object for the selected row index
//             const row = dataTable4.row(rowIdx);
//             if (row) {
//                 // Get the current data for the row
//                 const rowData = row.data();
//                 const selectedValue = kodePerkiraanBiayaSelect.split("|");
//                 const idKpValue = selectedValue[0];

//                 rowData["Kode_Perkiraan"] = idKpValue;
//                 row.data(rowData).draw();
//             }
//         });
//     }

//     //Untuk ngecek radiobutton mana yang dipilih, karena akan menampilkan modal yang berbeda
//     function validateTabel() {
//         let radiogrupDetail = document.getElementsByName("radiogrupDetail");
//         let isSelected = false;
//         for (let radio of radiogrupDetail) {
//             if (radio.checked) {
//                 isSelected = true;
//                 break;
//             }
//         }
//         if (isSelected) {
//             let selectedValue = document.querySelector(
//                 'input[name="radiogrupDetail"]:checked'
//             ).value;
//             if (selectedValue === "1") {
//                 DetailPelunasan();
//             } else if (selectedValue === "2") {
//                 DetailBiaya();
//             } else if (selectedValue === "3") {
//                 DetailKurangLebih();
//             }
//         } else {
//             alert("Pilih Detail Yang Akan DiKoreksi!");
//         }
//     }

//     kodePerkiraanBiayaSelect.addEventListener("change", function (event) {
//         event.preventDefault();
//         const selectedOption =
//             kodePerkiraanBiayaSelect.options[
//                 kodePerkiraanBiayaSelect.selectedIndex
//             ];
//         if (selectedOption) {
//             const idKodeInput = document.getElementById("idKodePerkiraanBiaya");
//             const selectedValue = selectedOption.value;
//             const idKode = selectedValue.split(" | ")[0];
//             idKodeInput.value = idKode;
//         }
//     });

//     //function buat modal Detail Biaya
//     function DetailPelunasan() {
//         let rows = tabelDetailPelunasan.getElementsByTagName("tr");
//         for (let i = 1; i < rows.length; i++) {
//             let cells = rows[i].cells;
//             let checkbox = cells[0].getElementsByTagName("input")[0];
//             if (checkbox.checked) {
//                 let rowData = {
//                     ID_Penagihan: cells[0].innerText,
//                     Nilai_Pelunasan: cells[1].innerText,
//                     Pelunasan_Rupiah: cells[2].innerText,
//                     Kode_Perkiraan: cells[3].innerText,
//                     NamaCust: cells[4].innerText,
//                     ID_Detail_Pelunasan: cells[5].innerText,
//                     Tgl_Penagihan: cells[6].innerText,
//                 };
//                 selectedRowsDetail.push(rowData);
//             }
//         }
//         const idPenagihan = $("#idPenagihan");
//         const iddetail = $("#iddetail");
//         const nilaiPelunasanDetail = $("#nilaiPelunasanDetail");
//         const pelunasanRupiah = $("#pelunasanRupiah");
//         const kodePerkiraan = $("#kodePerkiraan");
//         const namaCustomer = $("#namaCustomer");

//         const selectedData = selectedRowsDetail[0];

//         // Isi nilai pada elemen-elemen modal berdasarkan data yang diambil
//         idPenagihan.val(selectedData.ID_Penagihan);
//         iddetail.val(selectedData.ID_Detail_Pelunasan);
//         nilaiPelunasanDetail.val(selectedData.Nilai_Pelunasan);
//         pelunasanRupiah.val(selectedData.Pelunasan_Rupiah);
//         namaCustomer.val(selectedData.NamaCust);
//         kodePerkiraan.val(selectedData.Kode_Perkiraan);

//         const modal = $("#modalDetailPelunasan");
//         modal.modal("show");
//         //untuk ambil list kode perkiraan
//         fetch("/detailkodeperkiraan/" + 1)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 kodePerkiraanSelect.innerHTML = "";

//                 const defaultOption = document.createElement("option");
//                 defaultOption.disabled = true;
//                 defaultOption.selected = true;
//                 defaultOption.innerText = "Kode Perkiraan";
//                 kodePerkiraanSelect.appendChild(defaultOption);

//                 options.forEach((entry) => {
//                     const option = document.createElement("option");
//                     option.value = entry.NoKodePerkiraan;
//                     option.innerText =
//                         entry.NoKodePerkiraan + "|" + entry.Keterangan;
//                     kodePerkiraanSelect.appendChild(option);
//                 });
//             });
//     }

//     function DetailBiaya() {
//         let rows = tabelDetailBiaya.getElementsByTagName("tr");
//         for (let i = 1; i < rows.length; i++) {
//             let cells = rows[i].cells;
//             let checkbox = cells[0].getElementsByTagName("input")[0];
//             if (checkbox.checked) {
//                 let rowData = {
//                     Keterangan: cells[0].innerText,
//                     Biaya: cells[1].innerText,
//                     Kode_Perkiraan: cells[2].innerText,
//                     Id_Detail_Pelunasan: cells[3].innerText,
//                 };
//                 selectedRowsDetailBiaya.push(rowData);
//             }
//         }
//         const keteranganBiaya = $("#keteranganBiaya");
//         const biaya = $("#jumlahBiaya");
//         const kodePerkiraan = $("#kodePerkiraanBiayaSelect");
//         const idDetailBiaya = $("#idDetailBiaya");

//         const selectedData = selectedRowsDetailBiaya[0];

//         // Isi nilai pada elemen-elemen modal berdasarkan data yang diambil
//         keteranganBiaya.val(selectedData.Keterangan);
//         biaya.val(selectedData.Biaya);
//         idDetailBiaya.val(selectedData.Id_Detail_Pelunasan);
//         kodePerkiraan.val(selectedData.Kode_Perkiraan);
//         console.log(idDetailBiaya);
//         const modal = $("#modalDetailBiaya");
//         modal.modal("show");
//         //untuk ambil list kode perkiraan
//         fetch("/detailkodeperkiraan/" + 1)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 kodePerkiraanBiayaSelect.innerHTML = "";

//                 const defaultOption = document.createElement("option");
//                 defaultOption.disabled = true;
//                 defaultOption.selected = true;
//                 defaultOption.innerText = "Kode Perkiraan";
//                 kodePerkiraanBiayaSelect.appendChild(defaultOption);

//                 options.forEach((entry) => {
//                     const option = document.createElement("option");
//                     option.value = entry.NoKodePerkiraan;
//                     option.innerText =
//                         entry.NoKodePerkiraan + "|" + entry.Keterangan;
//                     kodePerkiraanBiayaSelect.appendChild(option);
//                 });
//             });
//     }

//     function DetailKurangLebih() {
//         let rows = tabelDetailKurangLebih.getElementsByTagName("tr");
//         for (let i = 1; i < rows.length; i++) {
//             let cells = rows[i].cells;
//             let checkbox = cells[0].getElementsByTagName("input")[0];
//             if (checkbox.checked) {
//                 let rowData = {
//                     Keterangan: cells[0].innerText,
//                     KurangLebih: cells[1].innerText,
//                     Kode_Perkiraan: cells[2].innerText,
//                     Id_Detail_Pelunasan: cells[3].innerText,
//                 };
//                 selectedRowsDetailKrgLbh.push(rowData);
//             }
//         }
//         const keterangan = $("#keterangan");
//         const kurangLebih = $("#jumlahUang");
//         const kodePerkiraan = $("#kodePerkiraanKrgLbhSelect");
//         const idcoba = $("#idcoba");

//         const selectedData = selectedRowsDetailKrgLbh[0];

//         // Isi nilai pada elemen-elemen modal berdasarkan data yang diambil
//         keterangan.val(selectedData.Keterangan);
//         kurangLebih.val(selectedData.KurangLebih);
//         idcoba.val(selectedData.Id_Detail_Pelunasan);
//         kodePerkiraan.val(selectedData.Kode_Perkiraan);
//         console.log(idcoba);
//         const modal = $("#modalDetailKurangLebih");
//         modal.modal("show");
//         //untuk ambil list kode perkiraan
//         fetch("/detailkodeperkiraan/" + 1)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 kodePerkiraanKrgLbhSelect.innerHTML = "";

//                 const defaultOption = document.createElement("option");
//                 defaultOption.disabled = true;
//                 defaultOption.selected = true;
//                 defaultOption.innerText = "Kode Perkiraan";
//                 kodePerkiraanKrgLbhSelect.appendChild(defaultOption);

//                 options.forEach((entry) => {
//                     const option = document.createElement("option");
//                     option.value = entry.NoKodePerkiraan;
//                     option.innerText =
//                         entry.NoKodePerkiraan + "|" + entry.Keterangan;
//                     kodePerkiraanKrgLbhSelect.appendChild(option);
//                 });
//             });
//     }
// });

$(document).ready(function () {

})
