var proses;
let Isi = document.getElementById("Isi");
let NoOrder = document.getElementById("NoOrder");
let FormEstimasiJadwal = document.getElementById("FormEstimasiJadwal");
let divisi = document.getElementById("divisi");
let Kode_Barang = document.getElementById("Kode_Barang");
let NamaBarang = document.getElementById("NamaBarang");
let NoGambarRev = document.getElementById("NoGambarRev");
let OdSts = document.getElementById("OdSts");
let KetOrder = document.getElementById("KetOrder");
let Mesin = document.getElementById("Mesin");
let Pengorder = document.getElementById("Pengorder");
let TglStart = document.getElementById("TglStart");
let TglFinish = document.getElementById("TglFinish");
let btnisi = document.getElementById("Isi");
let btnkoreksi = document.getElementById("Koreksi");
let btnhapus = document.getElementById("Hapus");
let btnProses = document.getElementById("Proses");
let btnbatal = document.getElementById("Batal");
//#region btn isi on click
function isi() {
    proses = 1;
    NoOrder.disabled = false;
    TglStart.disabled = false;
    TglFinish.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnhapus.disabled = true;
    btnbatal.style.display = "";
}
//#endregion

//#region batal

function Bataldiklik() {
    btnbatal.style.display = "none";
    btnProses.disabled = true;
    NoOrder.disabled = true;
    TglStart.disabled = true;
    TglFinish.disabled = true;
    btnisi.disabled = false;
    btnkoreksi.disabled = false;
    btnhapus.disabled = false;
    NoOrder.value = "";
    OdSts.textContent = "";
    divisi.value = "";
    Kode_Barang.value = "";
    NoGambarRev.value = "";
    NamaBarang.value = "";
    Mesin.value = "";
    Pengorder.value = "";
    KetOrder.value = "";
    TglStart.value = "";
    TglFinish.value = "";
}

//#endregion

//#region tgl start dan tgl finish on enter

TglStart.addEventListener("keypress", function (event) {
    if ((event.key = "Enter")) {
        event.preventDefault();
        TglFinish.focus();
    }
});

TglFinish.addEventListener("keypress", function (event) {
    if ((event.key = "Enter")) {
        event.preventDefault();
        if (TglFinish.value < TglStart.value) {
            alert("Tidak boleh.. Tgl finish < tgl start.");
            return;
        } else {
            btnProses.disabled = false;
            btnProses.focus();
        }
    }
});
//#endregion

//#region no order on enter

NoOrder.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        let NoOrder6digit;
        NoOrder6digit = document.getElementById("NoOrder");
        if (NoOrder6digit.value.length < 6) {
            NoOrder6digit.value = NoOrder.value.padStart(6, "0");
        }
        NoOrder.value = NoOrder6digit.value;
        loaddata(NoOrder.value);
    }
});

//#endregion

//#region Load Data

function loaddata(NomorOrder) {
    // let ada = false;
    fetch("/LoadDataEstimasiJadwal/" + NomorOrder)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                alert(
                    "Nomer order gambar: " +
                        NomorOrder +
                        ", tidak ada, blm di-ACC, ditolak, atau sudah finish."
                );
                NoOrder.focus();
                return;
            } else {
                divisi.value = datas[0].NamaDivisi;
                Kode_Barang.value = datas[0].Kd_Brg;
                NamaBarang.value = datas[0].Nama_Brg;
                NoGambarRev.value = datas[0].No_Gbr_Rev;
                OdSts.textContent = datas[0].OdSts;
                KetOrder.value = datas[0].Ket_Order;
                Mesin.value = datas[0].Mesin;
                Pengorder.value = datas[0].Pengorder;
                TglStart.focus();
                // ada = true;
                console.log(proses);
                if (proses == 2 || proses == 3) {
                    fetch("/cektanggalEstimasiJadwal/" + NomorOrder)
                        .then((response) => response.json())
                        .then((datas) => {
                            console.log(datas);
                            if (datas.length == 0) {
                                alert(
                                    "No. order " +
                                        NomorOrder +
                                        ", belum pernah diinputkan estimasinya."
                                );
                                NoOrder.focus();
                                return;
                            } else {
                                var tanggalAwal = new Date(datas[0].TglS);

                                // Mengambil tahun, bulan, dan tanggal
                                var tahun = tanggalAwal.getFullYear();
                                var bulan = String(
                                    tanggalAwal.getMonth() + 1
                                ).padStart(2, "0"); // Ditambah 1 karena Januari dimulai dari 0
                                var tanggal = String(
                                    tanggalAwal.getDate()
                                ).padStart(2, "0");

                                // Membuat string dengan format yang diinginkan
                                var tanggalstart =
                                    tahun + "-" + bulan + "-" + tanggal;

                                var tanggalakhir = new Date(datas[0].TglF);

                                // Mengambil tahun, bulan, dan tanggal
                                var tahun1 = tanggalakhir.getFullYear();
                                var bulan1 = String(
                                    tanggalakhir.getMonth() + 1
                                ).padStart(2, "0"); // Ditambah 1 karena Januari dimulai dari 0
                                var tanggal1 = String(
                                    tanggalakhir.getDate()
                                ).padStart(2, "0");

                                // Membuat string dengan format yang diinginkan
                                var tanggalfinish =
                                    tahun1 + "-" + bulan1 + "-" + tanggal1;

                                TglStart.value = tanggalstart;
                                TglFinish.value = tanggalfinish;
                            }
                        });
                }
            }
        });
    // console.log(ada);
}

//#endregion

//#region koreksi

function koreksiklik() {
    proses = 2;
    NoOrder.disabled = false;
    TglStart.disabled = false;
    TglFinish.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnhapus.disabled = true;
    btnbatal.style.display = "";
}

//#endregion

//#region hapus

function hapusdiklik() {
    proses = 3;
    NoOrder.disabled = false;
    TglStart.disabled = false;
    TglFinish.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnhapus.disabled = true;
    btnbatal.style.display = "";
}

//#endregion

//#region Proses

function Prosesdiklik() {
    // this.preventDefault();
    console.log(proses);
    // console.log(NoOrder.value);
    if (proses == 1) {
        fetch("/CekEstimasiKonstruksi/" + NoOrder.value)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas[0].ada > 0) {
                    alert("No. Order " + NoOrder.value + ", sudah ada.");
                    return;
                } else {
                    FormEstimasiJadwal.submit();
                }
            });
    }
    if (proses == 2) {
        let tglmulai;
        let sampaitgl;
        let ada = false;
        fetch("/GetTanggalEstimasiJadwal/" + NoOrder.value)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas.length > 0) {
                    tglmulai = datas[0].TglMulai;
                    sampaitgl = datas[0].SampaiTgl;
                    ada = true;
                }
            });
        if (ada == true) {
            if (TglStart.value > tglmulai || TglFinish.value < sampaitgl) {
                if (TglStart.value > tglmulai) {
                    alert(
                        "Tidak dapat dikoreksi, krn sdh terjadwal mulai tgl " +
                            tglmulai +
                            ", dan estimasi tgl start > jadwal mulai."
                    );
                    return;
                }
                if (TglFinish.value < sampaitgl) {
                    alert(
                        "Tidak dapat dikoreksi, krn sdh terjadwal sampai tgl " +
                            sampaitgl +
                            ", dan tgl finish < tgl terjadwal."
                    );
                    return;
                }
            }
        }
        // console.log(NoOrder.value);
        methodForm.value = "PUT";
        FormEstimasiJadwal.action = "/estimasiJadwal/" + NoOrder.value;
        FormEstimasiJadwal.submit();
    }
    if (proses == 3) {
        fetch("/CekEstimasiKonstruksi/" + NoOrder.value)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas[0].ada > 0) {
                    alert("Tdk bisa diHapus, karena sudah terjadwal.");
                    return;
                } else {
                    methodForm.value = "DELETE";
                    FormEstimasiJadwal.action =
                        "/estimasiJadwal/" + NoOrder.value;
                    FormEstimasiJadwal.submit();
                }
            });
    }
}

//#endregion
