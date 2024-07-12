let idBKM = document.getElementById('idBKM');
let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let mataUangSelect = document.getElementById('mataUangSelect');
let idMataUang = document.getElementById('idMataUang');
let namaBankSelect = document.getElementById('namaBankSelect');
let idBank = document.getElementById('idBank');
let jenisPembayaranSelect = document.getElementById('jenisPembayaranSelect');
let idJenisPembayaran = document.getElementById('idJenisPembayaran');
let kursRupiah = document.getElementById('kursRupiah');
let nilaiPelunasan = document.getElementById('nilaiPelunasan');
let uraian = document.getElementById('uraian');
let jenisBank = document.getElementById('jenisBank');
let btnTambahData = document.getElementById('btnTambahData');
let idCustomer = document.getElementById('idCustomer');
let jenisCustomer = document.getElementById('jenisCustomer');
let totalPelunasan = document.getElementById('totalPelunasan');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let tanggalInputTampil = document.getElementById("tanggalInputTampil");
let tanggalInputTampil2 = document.getElementById("tanggalInputTampil2");
let tabelTampilBKM;

let btnProses = document.getElementById('btnProses');
let btnBatal = document.getElementById('btnBatal');

let modalTambahBiaya = document.getElementById("modalTambahBiaya")

let btnTambahBiaya = document.getElementById('btnTambahBiaya');
let tabelDetailData;
let total;
let selectedRowDetailData = [];
let namacust;
let bank;
let matauang;

const namaJenisPembayaranData = {};

let btnKoreksi = document.getElementById('btnKoreksi');
let btnOkTampil = document.getElementById('btnOkTampil');
let jenis;

const tanggal = new Date();
const formattedDate = tanggal.toISOString().substring(0, 10);
tanggalInput.value = formattedDate;


btnProses.addEventListener('click', function (event) {
    event.preventDefault();

    // Memeriksa apakah salah satu radio button telah dipilih
    var radioButtons = document.getElementsByName("radiogrup1");
    var isChecked = false;

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        alert("Pilih salah satu opsi sebelum melanjutkan.");
    } else {

    }
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();

    kursRupiah.value = "";
    noBukti.value = "";
    idBKM = "";
    idCustomer.value = "";
    namaCustomerSelect.selectedIndex = 0;
    nilaiPelunasan.value = "";
    idJenisPembayaran = "";
    jenisPembayaranSelect.selectedIndex = 0;
    namaBankSelect.selectedIndex = 0;
    idBank.value = "";
    jenisBank.value = "";
    idKodePerkiraan.value = "";
    kodePerkiraanSelect.selectedIndex = 0;
    uraian.value = "";
    mataUangSelect.selectedIndex = 0;
    idMataUang.value = "";s
    totalPelunasan.value = "";
    kursRupiah.enabled = false;
    jenisPembayaranSelect.enabled = true;
    namaBankSelect.enabled = true;
    namaCustomerSelect.disabled = false;
    mataUangSelect.enabled = true;
    btnTambahData.enabled = false;
});

btnTambahData.addEventListener('click', function (event) {
    event.preventDefault();

    idCustomer.value = "";
    namaCustomerSelect.selectedIndex = 0;
    nilaiPelunasan.value = "";
    jenisPembayaranSelect.selectedIndex = 0;
    idKodePerkiraan.value = "";
    kodePerkiraanSelect.selectedIndex = 0;
    noBukti.value = "";
    uraian.value = "";
    jenisCustomer.value = "";

    kursRupiah.disabled = true;
    kodePerkiraanSelect.disabled = false;
    idKodePerkiraan.disabled = false;
    jenisPembayaranSelect.disabled = false;
    tanggalInput.disabled = false;
    namaCustomerSelect.disabled = false;
    namaBankSelect.disabled = true;
    mataUangSelect.disabled = true;
    idMataUang.disabled = true;
    kursRupiah.disabled = false;
});


btnTampilBKM.addEventListener('click', function(event) {
    event.preventDefault();
    modalTampilBKM = $("#modalTampilBKM");
    modalTampilBKM.modal('show');
})

btnOkTampil.addEventListener('click', function(event) {
    event.preventDefault();
    fetch("/tabeltampilbkm/" + tanggalInputTampil.value + "/" + tanggalInputTampil2.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            tabelTampilBKM = $("#tabelTampilBKM").DataTable({
                data: options,
                columns: [
                    {
                        title: "Tgl. Input", data: "Tgl_Input",
                        render: function (data) {
                            return `<input type="checkbox" name="dataCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    { title: "Id. BKM", data: "Id_BKM" },
                    { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" },
                    { title: "Terjemahan", data: "Terjemahan" },
                ]
            });

            tabelTampilBKM.on('change', 'input[name="dataCheckbox"]', function() {
                const checkedCheckbox = tabelTampilBKM.row($(this).closest('tr')).data();
                const idBKMModal = document.getElementById("idBKMModal");
                console.log(idBKMModal);

                if ($(this).prop("checked")) {
                    idBKMModal.value = checkedCheckbox.Id_BKM;
                    console.log(idBKMModal.value);
                } else {
                    idBKMModal.value = "";
                }
            });
        });
})


btnTambahBiaya.addEventListener("click", function (event) {
    event.preventDefault();

    var checkedCount = 0;
    var checkboxes = document.querySelectorAll(".row-checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedCount++;
        }
    }

    if (checkedCount === 0) {
        alert("Pilih 1 Detail Saja!");
    } else if (checkedCount > 1) {
        alert("Pilih hanya satu data saja.");
    } else {
        modalTambahBiaya = $("#modalTambahBiaya");
        modalTambahBiaya.modal('show');
    }
});
fetch("/detailcustomer/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaCustomerSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Cust";
        namaCustomerSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IdCust; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IdCust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            namaCustomerSelect.appendChild(option);
        });
    });

namaCustomerSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const idcust = bagiansatu[0];
        const jnscust = bagiansatu[1];
        namacust = bagiansatu[2];
        idCustomer.value = idcust;
        jenisCustomer.value = jnscust;
    }
});

jenisPembayaranSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = jenisPembayaranSelect.options[jenisPembayaranSelect.selectedIndex];
    if (selectedOption) {
        const idJenisInput = document.getElementById('idJenisPembayaran');
        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idJenisInput.value = idJenis;
    }
});

fetch("/detailmatauang/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        mataUangSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih MataUang";
        mataUangSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_MataUang;
            option.innerText = entry.Id_MataUang + "|" + entry.Nama_MataUang;
            mataUangSelect.appendChild(option);
        });
    })

mataUangSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = mataUangSelect.options[mataUangSelect.selectedIndex];
    if (selectedOption) {
        const idKodeInput = document.getElementById('idMataUang');
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        idKodeInput.value = idMU;
    }

    const selectedValue = selectedOption.textContent;
    const selectedCurrency = selectedValue.split("|")[1];
    if (selectedCurrency === "Rupiah") {
        kursRupiah.disabled = true;
        kursRupiah.value = '1';
    } else {
        const confirmMessage = "Apakah Anda ingin membayar dengan Rupiah?";
        const userConfirmed = confirm(confirmMessage);
        if (userConfirmed) {
            kursRupiah.disabled = false;
        } else {
            kursRupiah.disabled = true;
            kursRupiah.value = '1';
        }
    }
});


kursRupiah.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (parseFloat(kursRupiah.value) > 0) {
            // Nilai kurs Rupiah lebih besar dari 0, tidak perlu alert
        } else {
            alert('Nilai kurs Rupiah harus lebih besar dari 0!');
        }
    }
});

nilaiPelunasan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let jumlah = parseFloat(nilaiPelunasan.value).toFixed(2);
        let kurs = parseFloat(kursRupiah.value);

        if (jumlah === '0.00') {
            alert('Jumlah Uang TIDAK BOLEH = 0 !');
            nilaiPelunasan.focus();
        } else {
            let total = 0;
            if (kurs === 0) {
                nilaiPelunasan.value = formatNumberWithCommas(parseFloat(nilaiPelunasan.value).toFixed(2));
            } else {
                let jum = parseFloat(jumlah) * kurs;
                nilaiPelunasan.value = jum.toFixed(2);
            }
        }
    }
});

fetch("/jenispembayaran/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisPembayaranSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Pembayaran";
        jenisPembayaranSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Jenis_Bayar;
            option.innerText = entry.Id_Jenis_Bayar + "|" + entry.Jenis_Pembayaran;
            jenisPembayaranSelect.appendChild(option);
        });
    });

jenisPembayaranSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = jenisPembayaranSelect.options[jenisPembayaranSelect.selectedIndex];
    if (selectedOption) {
        const idJenisInput = document.getElementById('idJenisPembayaran');
        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idJenisInput.value = idJenis;
    }
});

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

namaBankSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = namaBankSelect.options[namaBankSelect.selectedIndex];
    if (selectedOption) {
        //const idJenisInput = document.getElementById('idBank');
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idBank.value = idJenis;
        //console.log(idBank.value);
        fetch("/detailjenisbank/" + idBank.value)
            .then((response) => response.json())
            .then((options) => {
                jenisBank.value = options[0].jenis;
                console.log(options);
            });
    }
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
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanSelect.appendChild(option);
        });
    });

kodePerkiraanSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
    if (selectedOption) {

        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idKodePerkiraan.value = idJenis;
    }
});

uraian.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'R';
        if (namaCustomerSelect.value !== '' && parseFloat(nilaiPelunasan.value) !== 0 &&
            jenisPembayaranSelect.value !== '' && namaBankSelect.value !== '' &&
            idMataUang.value !== '' && uraian.value !== '' && mataUangSelect.value !== '') {
            btnTambahData.disabled = false;
        } else {
            alert('Isi semua data');
        }

        if (idBKM.value === "") {
            if (idBank.value == "KRR1") {
                idBank.value = "KI";
            }
            else if (idBank.value == "KRR2") {
                idBank.value = "KKM";
            }
        } else {
            idBank = idBank.value;
        }

        tabelDetailData = $('#tabelDetailData').DataTable({
            // Opsi kolom yang ditampilkan
            columns: [
                {
                    title: "Id. Detail",
                    render: function () {
                        return `<input type="checkbox" class="row-checkbox"/>`;
                    },
                },
                // { title: 'Id. Detail' },
                { title: 'Customer' },
                { title: 'Nilai Rincian' },
                { title: 'Jenis Pembayaran' },
                { title: 'Kode Perkiraan' },
                { title: 'Uraian' },
                { title: 'No. Bukti' },
                { title: 'Nama Customer' },
            ],
        });

        matauang = idMataUang.value;
        bank = idBank.value;
        const customerColumn = idCustomer.value;
        const nilaiRincianColumn = nilaiPelunasan.value;
        const jenisPembayaranColumn = idJenisPembayaran.value;
        const kodePerkiraanColumn = idKodePerkiraan.value;
        const uraianColumn = uraian.value;
        const noBuktiColumn = noBukti.value;
        const namaCustomerColumn = namacust;

        // Tambahkan data ke dalam DataTable
        tabelDetailData.row.add([
            '',
            customerColumn,
            nilaiRincianColumn,
            jenisPembayaranColumn,
            kodePerkiraanColumn,
            uraianColumn,
            noBuktiColumn,
            namaCustomerColumn, // Menggunakan nilai dari inputan uraian
        ]).draw();

        let total = 0;
        for (let index = 0; index < tabelDetailData.rows().count(); index++) {
            // const element =[index];
            let uang = parseFloat(tabelDetailData.cell(index, 2).data());
            total += uang;
        }

        fetch("/getidbkm/" + idBank.value + "/" + tanggalInput.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKM.value = options;
            });

        totalPelunasan.value = total;

        idCustomer.value = "";
        namaCustomerSelect.selectedIndex = 0;
        mataUangSelect.selectedIndex = 0;
        idMataUang.value = "";
        kursRupiah.value = "";
        nilaiPelunasan.value = "";
        namaBankSelect.selectedIndex = 0;
        idBank.value = "";
        jenisBank.value = "";
        jenisPembayaranSelect.selectedIndex = 0;
        idKodePerkiraan.value = "";
        kodePerkiraanSelect.selectedIndex = 0;
        noBukti.value = "";
        uraian.value = "";
        jenisCustomer.value = "";
    }
});

$("#tabelDetailData tbody").off("click", "input[type='checkbox'");
$("#tabelDetailData tbody").off("change", "input[type='checkbox']");
$("#tabelDetailData tbody").on("change", "input[type='checkbox']", function () {
});
$("#tabelDetailData").on('change', '.row-checkbox', function () {
    const isChecked = $(this).is(':checked');
    const row = $(this).closest('tr');
    const rowData = [];

    // Ambil data dari setiap sel dalam baris kecuali kolom checkbox
    row.find('td:not(:last-child)').each(function () {
        rowData.push($(this).text());
    });

    if (isChecked) {
        // Checkbox dicentang
        console.log('Checkbox dicentang pada baris:', rowData);
        selectedRowDetailData.push(rowData);
    } else {
        // Checkbox tidak dicentang
        console.log('Checkbox tidak dicentang pada baris:', rowData);
        selectedRowDetailData = selectedRowDetailData.filter(data => data[0] !== rowData[0]);
    }
});

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();

    tanggalInput.disabled = true;
    namaCustomerSelect.disabled = true;
    jenisPembayaranSelect.disabled = true;
    idKodePerkiraan.disabled = true;
    kodePerkiraanSelect.disabled = true;
    namaBankSelect.disabled = true;
    mataUangSelect.disabled = true;
    idMataUang.disabled = true;
    kursRupiah.disabled = false;
    // Gunakan data yang telah dicentang untuk mengisi inputan
    if (selectedRowDetailData.length > 0) {
        const lastSelectedRow = selectedRowDetailData[selectedRowDetailData.length - 1];
        //$('#idCustomer').val(lastSelectedRow[1]);
        $('#nilaiPelunasan').val(lastSelectedRow[2]);
        //const idJenisPembayaran = lastSelectedRow[3];
        $('#idJenisPembayaran').val(idJenisPembayaran);
        //$('#idKodePerkiraan').val(lastSelectedRow[4]);
        $('#uraian').val(lastSelectedRow[5]);
        $('#noBukti').val(lastSelectedRow[6]);

        // Ambil nama jenis pembayaran setelah split
        const kodePerkiraan = lastSelectedRow[4];
        const namaJenisPembayaran = lastSelectedRow[3];
        const namaCustomer = lastSelectedRow[1];
        console.log(namaJenisPembayaran, namaCustomer, namaJenisPembayaran);

        const options = jenisPembayaranSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === namaJenisPembayaran) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                jenisPembayaranSelect.selectedIndex = i;
                //console.log(options[i].value);
                break;
            }
        }
        const options2 = kodePerkiraanSelect.options;
        for (let i = 0; i < options2.length; i++) {
            if (options2[i].value === kodePerkiraan) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                kodePerkiraanSelect.selectedIndex = i;
                break;
            }
        }
        const options3 = namaCustomerSelect.options;
        console.log(options3[1].value);
        for (i = 0; i < options3.length; i++) {
            let nama = options3[i].value.split("-");
            if (nama[0] === namaCustomer) {
                namaCustomerSelect.selectedIndex = i;
                break;
            }
        }

        idMataUang.value = matauang;
        const options4 = mataUangSelect.options;
        console.log(options4[1].value);
        for (let i = 0; i < options4.length; i++) {
            if (options4[i].value === matauang) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                mataUangSelect.selectedIndex = i;
                break;
            }
        }

        idBank.value = bank;
        const options5 = namaBankSelect.options;
        //console.log(options5[1].value);
        for (let i = 0; i < options5.length; i++) {
            if (options5[i].value === bank) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                namaBankSelect.selectedIndex = i;
                break;
            }
        }

    } else {
        alert('Tidak ada data yang dicentang.');
    }
});

