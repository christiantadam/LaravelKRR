let tahun = document.getElementById("tahun");
let bulan = document.getElementById("bulan");
let tabelDataPelunasan = document.getElementById("tabelDataPelunasan");
// let tabelDataPelunasan = $('#tabelDataPelunasan').DataTable();
let btnInputTanggalBKM = document.getElementById("btnInputTanggalBKM");
let tanggalInput = document.getElementById("tanggalInput");
let btnProsesss = document.getElementById("btnProsesss");
let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
let idKodePerkiraan = document.getElementById("idKodePerkiraan");
let tabelTampilBKM = document.getElementById("tabelTampilBKM");
// let dataTable3 = $("#tabelDataPelunasan").DataTable();
let idBankNew;
let tglInputNew = document.getElementById("tglInputNew");
let idBKMNew = document.getElementById("idBKMNew");
let totalPelunasan = document.getElementById("total1");
let konversi = document.getElementById("konversi");
let jenisBank = document.getElementById("jenisBank");
let uang = document.getElementById("uang");
let tanggal = document.getElementById("tanggal");
let idbkm = document.getElementById("idbkm");
let idBank2 = document.getElementById("idBank2");

let selectedRows = [];
let totalNilaiPelunasan = 0;

let btnOK = document.getElementById("btnOK");
let btnTampilBkm = document.getElementById("btnTampilBkm");
let btnGroupBKM = document.getElementById("btnGroupBKM");
let btnTutupModal = document.getElementById("btnTutupModal");

let formkoreksi = document.getElementById("formkoreksi");
let methodkoreksi = document.getElementById("methodkoreksi");
let modalTampilBKM = document.getElementById("modalTampilBKM");
let methodTampilBKM = document.getElementById("methodTampilBKM");
let formTampilBKM = document.getElementById("formTampilBKM");
let btnCetakBKM = document.getElementById("btnCetakBKM");
let nomer = document.getElementById("nomer");
let tglCetak = document.getElementById("tglCetak");
let symbol = document.getElementById("symbol");
let terbilangCetak = document.getElementById("terbilangCetak");
let jumlahDiterima = document.getElementById("jumlahDiterima");
let kodePerkiraanCetak = document.getElementById("kodePerkiraanCetak");
let jumlah = document.getElementById("jumlah");
let rincianPenerimaan = document.getElementById("rincianPenerimaan");
let tglCetakForm = document.getElementById("tglCetakForm");
let grandTotal = document.getElementById("grandTotal");
let symbol2 = document.getElementById("symbol2");

let checkboxesToRestore = [];

const tglInput = new Date();
const formattedDate2 = tglInput.toISOString().substring(0, 10);
tanggalInput.value = formattedDate2;

const tglCtk = new Date();
const formattedDate3 = tglCtk.toISOString().substring(0, 10);
console.log(formattedDate3);
let tgl2 = ubahFormatTanggal(formattedDate3);
tglCetakForm.textContent = tgl2;

btnTampilBkm.addEventListener("click", function (event) {
    event.preventDefault();
    modalTampilBKM = $("#modalTampilBKM");
    modalTampilBKM.modal("show");

    const tglTampilBKM = new Date();
    const formattedDate3 = tglTampilBKM.toISOString().substring(0, 10);
    tanggalInputTampil.value = formattedDate3;

    const tglTampilBKM2 = new Date();
    const formattedDate4 = tglTampilBKM2.toISOString().substring(0, 10);
    tanggalInputTampil2.value = formattedDate4;
});

btnTutupModal.addEventListener("click", function (event) {
    event.preventDefault();
    $("#pilihInputTanggal").modal("hide");
});

let idBKMInput = document.getElementById("idBKM");

btnOkTampil.addEventListener("click", function (event) {
    event.preventDefault();
    fetch(
        "/tabeltampilbkm/" +
            tanggalInputTampil.value +
            "/" +
            tanggalInputTampil2.value
    )
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            tabelTampilBKM = $("#tabelTampilBKM").DataTable({
                data: options,
                columns: [
                    {
                        title: "Tgl. Input",
                        data: "Tgl_Input",
                        render: function (data) {
                            var date = new Date(data);
                            var formattedDate = date.toLocaleDateString();

                            return `<div>
                                        <input type="checkbox" name="dataCheckbox" value="${formattedDate}" />
                                        <span>${formattedDate}</span>
                                    </div>`;
                        },
                    },
                    { title: "Id. BKM", data: "Id_BKM" },
                    {
                        title: "Nilai Pelunasan",
                        data: "Nilai_Pelunasan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
                    { title: "Terjemahan", data: "Terjemahan" },
                ],
            });

            let lastCheckedCheckbox = null;

            tabelTampilBKM.on(
                "change",
                'input[name="dataCheckbox"]',
                function () {
                    if (lastCheckedCheckbox && lastCheckedCheckbox !== this) {
                        lastCheckedCheckbox.checked = false;
                    }
                    lastCheckedCheckbox = this;

                    const checkedCheckbox = tabelTampilBKM
                        .row($(this).closest("tr"))
                        .data();
                    idBKMInput = document.getElementById("idBKM");

                    if ($(this).prop("checked")) {
                        idBKMInput.value = checkedCheckbox.Id_BKM;
                    } else {
                        idBKMInput.value = "";
                    }
                }
            );
        });
});

// Deklarasikan array untuk menyimpan data yang dicentang
let bankArray = []; // Array untuk menyimpan data bank
let tanggalArray = [];
let nilaipelunasan = [];
let mataUang = [];
let selectedDataArray = [];

btnGroupBKM.addEventListener("click", function (event) {
    event.preventDefault();
    let idBKMGenerated = false;
    bankArray = [];
    tanggalArray = [];
    nilaipelunasan = [];
    let count = 0;
    var arrayindex = [];
    $("input[name='dataPelunasanCheckbox']:checked").each(function () {
        // const isChecked = $(this).prop("checked");
        let rowIndex = $(this).closest("tr").index();
        arrayindex.push(rowIndex);
        count += 1;
    });

    if (count > 1) {
        // console.log("mmmmmmmmmmmmm");
        console.log(arrayindex);
        for (let i = 0; i < arrayindex.length; i++) {
            bankArray.push(dataTable3.cell(arrayindex[i], 2).data());
            tanggalArray.push(dataTable3.cell(arrayindex[i], 7).data());
            nilaipelunasan.push(
                parseFloat(dataTable3.cell(arrayindex[i], 5).data())
            );
            mataUang.push(dataTable3.cell(arrayindex[i], 4).data());
            if (
                dataTable3.cell(arrayindex[i], 8).data() == null &&
                dataTable3.cell(arrayindex[i], 7).data() == null &&
                dataTable3.cell(arrayindex[i], 2).data() == null
            ) {
                alert(
                    "Input Tgl Pembuatan BKM & Id.Bank, Klik Tombol Pilih Bank"
                );
                return;
            }
            idBKMGenerated = true;

            rowData = dataTable3.row(arrayindex[i]).data();
            rowData.idBKM = ""; // Menambahkan placeholder untuk idBKM pada setiap data
            selectedDataArray.push(rowData);
        }
        console.log(bankArray);
        // console.log(tanggalArray);
        let cek = Check();
        if (cek == true) {
            return;
        }
    }
    if (count == 1) {
        for (let i = 0; i < arrayindex.length; i++) {
            bankArray.push(dataTable3.cell(arrayindex[i], 2).data());
            tanggalArray.push(dataTable3.cell(arrayindex[i], 7).data());
            nilaipelunasan.push(
                parseFloat(dataTable3.cell(arrayindex[i], 5).data())
            );
            mataUang.push(dataTable3.cell(arrayindex[i], 4).data());
            if (
                dataTable3.cell(arrayindex[i], 8).data() == null &&
                dataTable3.cell(arrayindex[i], 7).data() == null &&
                dataTable3.cell(arrayindex[i], 2).data() == null
            ) {
                alert(
                    "Input Tgl Pembuatan BKM & Id.Bank, Klik Tombol Pilih Bank"
                );
                return;
            }
            idBKMGenerated = true;

            rowData = dataTable3.row(arrayindex[i]).data();
            rowData.idBKM = ""; // Menambahkan placeholder untuk idBKM pada setiap data
            selectedDataArray.push(rowData);
        }

        if (idBKM.value === "") {
            console.log(idBank.value);
            if (idBank.value === "KRR1") {
                console.log("masuk krr1");
                idBank.value = "KI";
                idBank2.value = "KRR1";
            } else if (idBank.value === "KRR2") {
                idBank.value = "KKM";
                idBank2.value = "KRR2";
            }
        } else {
            idBank.value = bankArray[0];
            idBank2.value = bankArray[0];
        }

        // console.log("nnnnnnnnnnnnnnnnn");
        fetch("/getJenisBankCreateBKM/" + bankArray[0])
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                jenisBank.value = options[0].jenis;
            });

        let tanggalSajaArray = tanggalArray.map((dateTimeString) => {
            const tanggalSaja = dateTimeString.split(" ")[0];
            return tanggalSaja;
        });

        // tanggal.value = selectedDataArray[0].TglInput;
        const tglInput = selectedDataArray[0].TglInput;
        const [tanggal1, waktu] = tglInput.split(" ");
        selectedDataArray[0].TglInput = tanggal1;
        tanggal.value = tanggal1;

        uang.value = mataUang[mataUang.length - 1];
        console.log(nilaipelunasan);
        let totalPembayaran = nilaipelunasan[0];
        const formattedCurrency = formatToCurrency(totalPembayaran);
        totalPelunasan.value = formattedCurrency;
        const words = numberToWords(nilaipelunasan[0]);
        konversi.value = words;

        console.log(idBank.value, tglInputNew.value);
        if (idBKMGenerated) {
            fetch("/getidbkm/" + idBank.value + "/" + tglInputNew.value)
                .then((response) => response.json())
                .then((options) => {
                    idBKMNew.value = options;

                    // Tambahkan ID BKM ke setiap data yang dicentang
                    selectedDataArray.forEach((data) => {
                        data.Id_BKM = options;
                    });

                    alert("Id. BKM nya: " + idBKMNew.value);
                    console.log(options);

                    const id1 = idBKMNew.value.slice(0, 3);
                    console.log(id1); // Mengambil tiga karakter pertama

                    const parsedId1 = parseInt(id1);

                    let idbkm2;
                    // Mengonversi ke bilangan jika mungkin
                    if (isNaN(parsedId1)) {
                        idbkm2 = 0; // Set idbkm to 0 when id1 is NaN
                    } else {
                        idbkm2 = parsedId1; // Assign the parsed value when it's a valid number
                    }

                    idbkm.value = idbkm2;

                    console.log(idbkm2);

                    // formkoreksi.action = "/insertUpdateCreateBKM/";
                    // formkoreksi.submit();

                    $.ajax({
                        url: "insertUpdateCreateBKM",
                        method: "POST",
                        data: new FormData(formkoreksi),
                        dataType: "JSON",
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (response) {
                            alert(response);
                        },
                    });
                    btnOK.click();
                });
            console.log(selectedDataArray);
        }
    }
});

function Check() {
    let k = 1; // variabel untuk menyimpan nilai k
    let l = 1;
    idBKMGenerated = true;

    let tanggalSajaArray = tanggalArray.map((dateTimeString) => {
        const tanggalSaja = dateTimeString.split(" ")[0];
        return tanggalSaja;
    });

    for (let i = 1; i < bankArray.length; i++) {
        // const element = array[i];
        if (bankArray[0] == bankArray[i]) {
            k += 1;
        }
        if (tanggalSajaArray[0] == tanggalSajaArray[i]) {
            l += 1;
            console.log(tanggalSajaArray[0]);
        }
    }

    if (k !== bankArray.length || l !== bankArray.length) {
        console.log(k);
        console.log(l);
        console.log(bankArray);
        alert("Nama Bank & Tgl Pembuatan Harus SAMA!");
        return true;
    } else if (k == bankArray.length && l == bankArray.length) {
        if (bankArray[1] == "KRR2") {
            idBank.value = "KI";
        } else if (bankArray[1] == "KRR1") {
            idBank.value = "KKM";
        } else {
            idBank.value = bankArray[0];
        }
        console.log(bankArray);
    }

    console.log(k);
    console.log(l);
    console.log(bankArray);
    console.log(tanggalArray);
    console.log(nilaipelunasan);

    fetch("/getJenisBankCreateBKM/" + idBank.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            jenisBank.value = options[0].jenis;
        });

    // tanggal.value = selectedDataArray[0].TglInput;
    const tglInput = selectedDataArray[0].TglInput;
    const [tanggal1, waktu] = tglInput.split(" ");
    selectedDataArray[0].TglInput = tanggal1;
    tanggal.value = tanggal1;

    uang.value = mataUang[mataUang.length - 1];
    console.log(nilaipelunasan);
    let totalPembayaran = nilaipelunasan[0];
    const formattedCurrency = formatToCurrency(totalPembayaran);
    totalPelunasan.value = formattedCurrency;
    const words = numberToWords(nilaipelunasan[0]);
    konversi.value = words;

    if (idBKMGenerated) {
        fetch("/getidbkm/" + idBank.value + "/" + tglInputNew.value)
            .then((response) => response.json())
            .then((options) => {
                idBKMNew.value = options;

                // Tambahkan ID BKM ke setiap data yang dicentang
                selectedDataArray.forEach((data) => {
                    data.Id_BKM = options;
                });

                alert("Id. BKM nya: " + idBKMNew.value);
                console.log(options);

                console.log(selectedDataArray);

                const id1 = idBKMNew.value.slice(0, 3);
                console.log(id1); // Mengambil tiga karakter pertama

                // Mengonversi ke bilangan jika mungkin
                const idbkm = parseInt(id1);
                idbkm.value = idbkm;

                console.log(idbkm);

                // formkoreksi.action = "/insertUpdateCreateBKM/";
                // formkoreksi.submit();

                $.ajax({
                    url: "insertUpdateCreateBKM2",
                    method: "POST",
                    data: new FormData(formkoreksi),
                    dataType: "JSON",
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (response) {
                        alert(response);
                    },
                });
                btnOK.click();
            });
    }
}
let optionss;
btnOK.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("masuk OK");
    fetch("/detailtabelpelunasan2/" + bulan.value + "/" + tahun.value)
        .then((response) => response.json())
        .then((data) => {
            optionss = data;
            optionss.forEach((option) => (option.isChecked = false));
            console.log(optionss);
            dataTable3 = $("#tabelDataPelunasan").DataTable({
                destroy: true,
                data: optionss,

                columns: [
                    {
                        title: "Tgl. Pelunasan",
                        data: "Tgl_Pelunasan",
                        render: function (data, type, row) {
                            var date = new Date(data);
                            var formattedDate = date.toLocaleDateString();
                            var isChecked = row.isChecked ? "checked" : "";

                            return `<div>
                                        <input type="checkbox" name="dataPelunasanCheckbox" value="${formattedDate}" ${isChecked} />
                                        <span>${formattedDate}</span>
                                    </div>`;
                        },
                    },
                    { title: "Id. Pelunasan", data: "Id_Pelunasan" },
                    { title: "Id. Bank", data: "Id_bank" },
                    { title: "Jenis Pembayaran", data: "Jenis_Pembayaran" },
                    { title: "Mata Uang", data: "Nama_MataUang" },
                    {
                        title: "Total Pelunasan",
                        data: "Nilai_Pelunasan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
                    { title: "No. Bukti", data: "No_Bukti" },
                    { title: "Tgl. Input", data: "TglInput" },
                    { title: "Kode Perkiraan", data: "KodePerkiraan" },
                ],
            });

            if (idBank.value == "KRR1") {
                idBankNew = "KKM";
            } else if (idBank.value == "KKR2") {
                idBankNew = "KI";
            } else {
                idBankNew = idBank.value;
            }
        });
});

function clickOK() {
    let bulanValue = bulan.value;
    let tahunValue = tahun.value;
    if (bulanValue.trim() === "" || tahunValue.trim() === "") {
        alert("Harap isi bulan dan tahun terlebih dahulu!");
        return;
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const selectedMonth = parseInt(bulanValue, 10);
    const selectedYear = parseInt(tahunValue, 10);

    if (
        selectedYear > currentYear ||
        (selectedYear === currentYear && selectedMonth >= currentMonth)
    ) {
        alert("TIDAK BOLEH CREATE BKM U/ BLN INI!!!");
        bulan.value = "";
        tahun.value = "";
        return;
    }
}

kodePerkiraanSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption =
        kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
    if (selectedOption) {
        const idKodeInput = document.getElementById("idKodePerkiraan");
        const selectedValue = selectedOption.value;
        const idKode = selectedValue.split(" | ")[0];
        idKodeInput.value = idKode;
    }
});

namaBankSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = namaBankSelect.options[namaBankSelect.selectedIndex];
    if (selectedOption) {
        const idNamaBank = document.getElementById("idBank");
        const selectedValue = selectedOption.value;
        const idbank = selectedValue.split(" | ")[0];
        idNamaBank.value = idbank;
    }
});

btnInputTanggalBKM.addEventListener("click", function (event) {
    event.preventDefault();
    validatePilihBank();
    fetch("/detailbank/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            namaBankSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih Bank";
            namaBankSelect.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Id_Bank;
                option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
                namaBankSelect.appendChild(option);
            });
        });

    fetch("/detailkodeperkiraan/" + 1)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            kodePerkiraanSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Kode Perkiraan";
            kodePerkiraanSelect.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.NoKodePerkiraan;
                option.innerText =
                    entry.NoKodePerkiraan + "|" + entry.Keterangan;
                kodePerkiraanSelect.appendChild(option);
            });
        });
    // Menyimpan data dari baris yang dicentang
    let rows = tabelDataPelunasan.getElementsByTagName("tr");
    selectedRows = [];
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].cells;
        let checkbox = cells[0].getElementsByTagName("input")[0];

        let tglInputFull = cells[7].innerText; // Nilai datetime lengkap dari kolom "Tgl. Input"
        let tglInputDate = new Date(tglInputFull);
        let tgl = tglInputDate.getDate();
        let bulan = tglInputDate.getMonth() + 1; // Ingat, bulan dimulai dari 0
        let tahun = tglInputDate.getFullYear();

        // Format tanggal, bulan, dan tahun menjadi bentuk "YYYY-MM-DD"
        tglInputNew.value = `${tahun}-${bulan < 10 ? "0" : ""}${bulan}-${
            tgl < 10 ? "0" : ""
        }${tgl}`;
        // console.log(tglInputNew);

        let rowData = {
            Tgl_Pelunasan: cells[0].innerText,
            Id_Pelunasan: cells[1].innerText,
            Id_bank: cells[2].innerText,
            Jenis_Pembayaran: cells[3].innerText,
            Nama_MataUang: cells[4].innerText,
            Nilai_Pelunasan: cells[5].innerText,
            No_Bukti: cells[6].innerText,
            TglInput: cells[7].innerText,
            KodePerkiraan: cells[8].innerText,
            // checked: checkbox.checked
        };
        selectedRows.push(rowData);
        console.log(selectedRows);
    }
});

$("#btnInputTanggalBKM").on("click", function (event) {
    event.preventDefault();

    // Ambil modal dan elemen-elemennya berdasarkan ID
    const tglPelunasan = $("#tglPelunasan");
    const idPelunasan = $("#idPelunasan");
    const jenisBayar = $("#jenisBayar");
    // const idBank = $("#idBank");
    const mataUang = $("#mataUang");
    const nilaiPelunasan = $("#nilaiPelunasan");
    const noBukti = $("#noBukti");

    const selectedData = selectedRows[0];
    console.log(selectedRows[0]);

    // Isi nilai pada elemen-elemen modal berdasarkan data yang diambil
    tglPelunasan.val(selectedData.Tgl_Pelunasan);
    idPelunasan.val(selectedData.Id_Pelunasan);
    console.log(idPelunasan.val());
    jenisBayar.val(selectedData.Jenis_Pembayaran);
    // idBank.val(selectedData.Id_bank);
    mataUang.val(selectedData.Nama_MataUang);
    nilaiPelunasan.val(selectedData.Nilai_Pelunasan);
    noBukti.val(selectedData.No_Bukti);
});

tanggalInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Menghentikan perilaku bawaan tombol Enter

        let tanggal = tanggalInput.value;
        let today = new Date();
        let inputDate = new Date(tanggal);

        if (
            inputDate > today ||
            inputDate.getFullYear() > today.getFullYear()
        ) {
            alert("Tanggal SALAH!");
            tanggalInput.focus();
        }
    }
});

$("#btnProsesss").on("click", function (event) {
    event.preventDefault();

    const selectedRowsIndices = [];

    // dataTable3.rows().every(function() {
    //     var data = this.data();
    //     var isChecked = selectedRowsIndices.includes(this.index());
    //     if (isChecked) {
    //         // Ganti checkbox menjadi dicentang
    //         var cell = this.cell(':eq(0)').node();
    //         $(cell).find('input[type="checkbox"]').prop('checked', true);
    //     }
    // });

    $("#tabelDataPelunasan tbody input[type='checkbox']:checked").each(
        function () {
            const row = $(this).closest("tr");
            const rowIndex = dataTable3.row(row).index();
            optionss[rowIndex].isChecked = true;
            selectedRowsIndices.push(rowIndex);
        }
    );
    console.log(idKodePerkiraan);
    updateKpColumn2(idKodePerkiraan, selectedRowsIndices);
    updateBank(idBank, selectedRowsIndices);
    updateTglPembulatan(tanggalInput, selectedRowsIndices);

    $("#pilihInputTanggal").modal("hide");
});

btnCetakBKM.addEventListener("click", function (event) {
    event.preventDefault();

    console.log(idBKMInput.value);

    fetch("/getCetak/" + idBKMInput.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            nomer.textContent = options[0].Id_BKM;

            const tglInput = options[0].Tgl_Input;
            const [tanggal1, waktu] = tglInput.split(" ");
            options[0].TglInput = tanggal1;
            let tgl = ubahFormatTanggal(tanggal1);
            tglCetak.textContent = tgl;
            symbol.textContent = options[0].Symbol;
            jumlahDiterima.textContent = options[0].Nilai_Pelunasan;
            terbilangCetak.textContent = options[0].Terjemahan;
            kodePerkiraanCetak.textContent = options[0].KodePerkiraan;
            jumlah.textContent = options[0].Nilai_Rincian;
            rincianPenerimaan.textContent =
                options[0].NamaCust + " - " + options[0].Uraian;
            symbol2.textContent = options[0].Symbol;
            grandTotal.textContent = options[0].Nilai_Pelunasan;

            window.print();
        });

    // methodTampilBKM.value = "PUT";
    // formTampilBKM.action = "/CreateBKM/" + idBKM.value;
    // console.log(idBKM.value);
    // formTampilBKM.submit();
});

function updateKpColumn2(kodePerkiraanSelect, selectedRows) {
    // Loop through each selected row index and update the data for the specific column
    selectedRows.forEach((rowIdx) => {
        // Get the DataTable row object for the selected row index
        const row = dataTable3.row(rowIdx);
        if (row) {
            // Get the current data for the row
            const rowData = row.data();

            // Update the "Kode Perkiraan" data in the rowData
            rowData["KodePerkiraan"] = idKodePerkiraan.value; // Pastikan nama properti sesuai dengan properti dalam data
            row.data(rowData).draw(); // Terapkan perubahan ke tampilan DataTable
            console.log(rowData);
        }
    });
}

function updateBank(namaBankSelect, selectedRows) {
    // Loop through each selected row index and update the data for the specific column
    selectedRows.forEach((rowIdx) => {
        // Get the DataTable row object for the selected row index
        const row = dataTable3.row(rowIdx);
        if (row) {
            // Get the current data for the row
            const rowData = row.data();

            // Update the "Kode Perkiraan" data in the rowData
            rowData["Id_bank"] = idBank.value; // Pastikan nama properti sesuai dengan properti dalam data
            row.data(rowData).draw(); // Terapkan perubahan ke tampilan DataTable
        }
    });
}

function updateTglPembulatan(tanggalInput, selectedRows) {
    // Loop through each selected row index and update the data for the specific column
    selectedRows.forEach((rowIdx) => {
        // Get the DataTable row object for the selected row index
        const row = dataTable3.row(rowIdx);
        if (row) {
            // Get the current data for the row
            const rowData = row.data();

            // Update the "Kode Perkiraan" data in the rowData
            rowData["TglInput"] = tanggalInput.value; // Pastikan nama properti sesuai dengan properti dalam data
            row.data(rowData).draw(); // Terapkan perubahan ke tampilan DataTable

            // console.log(rowData["TglInput"]);
        }
    });
}

function validatePilihBank() {
    const checkedRows = document.querySelectorAll(
        'input[name="dataPelunasanCheckbox"]:checked'
    );
    if (checkedRows.length === 0) {
        alert("Pilih 1 Data Pelunasan!");
        return;
    } else {
        $("#pilihInputTanggal").modal("show");
    }
    const modal = document.getElementById("pilihBankModal");
    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function formatToCurrency(number) {
    const formattedNumber = new Intl.NumberFormat("en-US").format(number);
    return formattedNumber;
}

const ones = [
    "",
    "Satu ",
    "Dua ",
    "Tiga ",
    "Empat ",
    "Lima ",
    "Enam ",
    "Tujuh ",
    "Delapan ",
    "Sembilan ",
];
const teens = [
    "Sepuluh",
    "Sebelas",
    "Dua Belas",
    "Tiga Belas",
    "Empat Belas",
    "Lima Belas",
    "Enam Belas",
    "Tujuh Belas",
    "Delapan Belas",
    "Sembilan Belas",
];
const tens = [
    "",
    "Sepuluh",
    "Dua Puluh",
    "Tiga Puluh",
    "Empat Puluh",
    "Lima Puluh",
    "Enam Puluh",
    "Tujuh Puluh",
    "Delapan Puluh",
    "Sembilan Puluh",
];
const thousands = ["", "Seribu", "Juta", "Miliar", "Triliun"];

function numberToWords(number) {
    if (number === 0) {
        return "Nol";
    }

    let result = "";
    let isThousands = false;

    if (number === 1000) {
        result = "Seribu";
        return result.trim();
    }

    for (let i = 0; number > 0; i++) {
        const currentGroup = number % 1000;
        if (currentGroup !== 0) {
            result =
                convertThreeDigitsToWords(currentGroup, isThousands) +
                thousands[i] +
                " " +
                result;
        }
        number = Math.floor(number / 1000);
        isThousands = true;
    }

    return result.trim();
}

function convertThreeDigitsToWords(num, isThousands) {
    let result = "";

    // Convert hundreds place
    const hundredsPlace = Math.floor(num / 100);
    if (hundredsPlace > 0) {
        if (hundredsPlace === 1) {
            result += "Seratus ";
        } else {
            result += ones[hundredsPlace] + " Ratus ";
        }
    }

    // Calculate the remainder for further conversion
    const remainder = num % 100;

    // Check if the remainder is zero (e.g., 200, 300, etc.)
    if (remainder === 0) {
        return result.trim();
    }

    // Check if the remainder is less than 10 or greater than or equal to 10
    if (remainder < 10) {
        result += ones[remainder];
    } else if (remainder < 20) {
        result += teens[remainder - 10];
    } else {
        const tensPlace = Math.floor(remainder / 10);
        const onesPlace = remainder % 10;
        result += tens[tensPlace];
        if (onesPlace > 0) {
            result += " " + ones[onesPlace];
        }
    }

    // Handle "Seribu" for thousands if applicable
    if (isThousands && num === 1) {
        result = "Seribu ";
    } else if (isThousands) {
        const thousandsPlace = Math.floor(num / 1000);
        result = ones[thousandsPlace] + " Ribu ";
    }

    return result.trim();
}
