let NoOrder = document.getElementById("NoOrder");
let OdSts = document.getElementById("OdSts");
let divisi = document.getElementById("divisi");
let Kode_Barang = document.getElementById("Kode_Barang");
let NoGambarRev = document.getElementById("NoGambarRev");
let NamaBarang = document.getElementById("NamaBarang");
let Mesin = document.getElementById("Mesin");
let Pengorder = document.getElementById("Pengorder");
let KetOrder = document.getElementById("KetOrder");
let estStart = document.getElementById("estStart");
let estFinish = document.getElementById("estFinish");
let NamaBagian = document.getElementById("NamaBagian");
let WorkStation = document.getElementById("WorkStation");
let tglStart = document.getElementById("tglStart");
let hariKe = document.getElementById("hariKe");
let jam = document.getElementById("jam");
let menit = document.getElementById("menit");
let btnbatal = document.getElementById("batal");
let JamKerja = document.getElementById("JamKerja");
let tulisanjamkerja = document.getElementById("tulisanjamkerja");
let btnproses = document.getElementById("proses");
const currentDate = new Date();
// Format the current date to be in 'YYYY-MM-DD' format for setting the input value
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
tglStart.value = formattedCurrentDate;
let ForminputJadwal = document.getElementById("ForminputJadwal");
let jam_kerja = document.getElementById("jam_kerja");
let statuskerja = document.getElementById("status");
let ModalEdit = document.getElementById("ModalEdit");
let Tanggalmodaledit = document.getElementById("Tanggal");
let WorkStationModalEdit = document.getElementById("WorkStationModalEdit");
let TNoWorkSts = document.getElementById("TNoWorkSts");
let ForminputJadwalModalEdit = document.getElementById(
    "ForminputJadwalModalEdit"
);
let methodFormModalEdit = document.getElementById("methodFormModalEdit");
let Tanggal = document.getElementById("Tanggal");
let TJam = document.getElementById("TJam");
let btnprosesmodaledit = document.getElementById('btnprosesmodaledit');
let keluarmodaledit = document.getElementById('keluarmodaledit');
let batalmodaledit = document.getElementById('batalmodaledit');
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
        loadnamabagian(NoOrder.value);
        btnbatal.disabled = false;
        NamaBagian.focus();
    }
});

//#endregion

//#region Load Data

function loaddata(NomorOrder) {
    fetch("/LoadDataInputJadwal/" + NomorOrder)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                alert(
                    "Nomer order gambar: " +
                        NomorOrder +
                        ", tidak ada, blm di-ACC, ditolak, atau sudah finish."
                );
                cleartext();
                NoOrder.focus();
                return;
            } else {
                OdSts.textContent = datas[0].OdSts;
                divisi.value = datas[0].NamaDivisi;
                Kode_Barang.value = datas[0].Kd_Brg;
                NoGambarRev.value = datas[0].No_Gbr_Rev;
                NamaBarang.value = datas[0].Nama_Brg;
                Mesin.value = datas[0].Mesin;
                Pengorder.value = datas[0].Pengorder;
                KetOrder.value = datas[0].Ket_Order;
                NamaBagian.disabled = false;
                WorkStation.disabled = false;
                tglStart.disabled = false;
                hariKe.disabled = false;
                jam.disabled = false;
                menit.disabled = false;
                // NamaBagian.focus();
                fetch("/cekdataestimasiInputJadwal/" + NomorOrder)
                    .then((response) => response.json())
                    .then((datas) => {
                        console.log(datas);
                        if (datas[0].ada == 0) {
                            alert(
                                "No. Order " +
                                    NomorOrder +
                                    ", belum ada estimasi jadwalnya. Hubungi PPIC."
                            );
                            return;
                        } else {
                            estStart.textContent = ubahtanggal(datas[0].TglS);
                            estFinish.textContent = ubahtanggal(datas[0].TglF);
                        }
                    });
            }
        });
}

//#endregion

//#region ubah tgl

function ubahtanggal(inputTanggal) {
    var tanggal = new Date(inputTanggal);
    var dd = String(tanggal.getDate()).padStart(2, "0");
    var mm = String(tanggal.getMonth() + 1).padStart(2, "0"); // Perhatikan bahwa bulan dimulai dari 0 (Januari) hingga 11 (Desember)
    var yyyy = tanggal.getFullYear();

    return dd + "-" + mm + "-" + yyyy;
}

//#endregion

//#region LOAD NAMA BAGIAN

function loadnamabagian(NomorOrder) {
    fetch("/GetdatabagianInputJadwal/" + NomorOrder)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            NamaBagian.innerHTML = "";
            //
            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih Bagian";
            NamaBagian.appendChild(defaultOption);
            //
            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.IdBagian;
                option.innerText = entry.NamaBagian + "--" + entry.IdBagian;
                NamaBagian.appendChild(option);
            });
        });
}

//#endregion

//#region batal

btnbatal.addEventListener("click", function () {
    cleartext();
    NoOrder.focus();
});

//#endregion

//#region clear text

function cleartext() {
    NoOrder.value = "";
    OdSts.textContent = "";
    divisi.value = "";
    Kode_Barang.value = "";
    NoGambarRev.value = "";
    NamaBarang.value = "";
    Mesin.value = "";
    Pengorder.value = "";
    KetOrder.value = "";
    estStart.textContent = "";
    estFinish.textContent = "";
    NamaBagian.value = "Pilih Bagian";
    NamaBagian.disabled = true;
    WorkStation.value = "Pilih Work Station";
    WorkStation.disabled = true;
    tglStart.value = formattedCurrentDate;
    tglStart.disabled = true;
    hariKe.value = "";
    hariKe.disabled = true;
    jam.value = "";
    jam.disabled = true;
    menit.value = "";
    menit.disabled = true;
}

//#endregion

//#region tanggal start on enter

tglStart.addEventListener("keypress", function (event) {
    let tglS;
    let tglF;
    if (event.key == "Enter") {
        fetch("/cekdataestimasiInputJadwal/" + NoOrder.value)
            .then((response) => response.json())
            .then((datas) => {
                // console.log(datas);
                if (datas[0].ada > 0) {
                    tglS = datas[0].TglS;
                    tglF = datas[0].TglF;
                }
                if (tglStart.value < tglS || tglStart.value > tglF) {
                    // console.log(tglStart.value);
                    // console.log(tglS);
                    if (tglStart.value < tglS) {
                        alert(
                            "Tidak boleh. Karena tgl yg diinput < estimasi tgl start(" +
                                tglS +
                                ") yg dijadwalkan oleh PPIC."
                        );
                    }
                    if (tglStart.value > tglF) {
                        alert(
                            "Tidak boleh. Karena tgl yg diinput > estimasi tgl finish(" +
                                tglF +
                                ") yg dijadwalkan oleh PPIC."
                        );
                    }
                    tglStart.focus();
                    return;
                } else {
                    hariKe.focus();
                }
            });
    }
});

//#endregion

//#region Thari on enter

hariKe.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        jam.focus();
    }
});

//#endregion

//#region nama bagian on change

NamaBagian.addEventListener("change", function (event) {
    if (NamaBagian.value != "Pilih Bagian") {
        WorkStation.focus();
    }
});

//#endregion

//#region workstation on change

WorkStation.addEventListener("change", function () {
    if (WorkStation.value != "Pilih Work Station") {
        tglStart.focus();
    }
});

//#endregion

//#region Jam on enter

jam.addEventListener("keypress", function (event) {
    let jumlahjam;
    if (event.key == "Enter") {
        fetch(
            "/GetJamKerjaInputJadwal/" +
                WorkStation.value +
                "/" +
                tglStart.value
        )
            .then((response) => response.json())
            .then((datas) => {
                // console.log(datas);
                if (datas.length > 0) {
                    JamKerja.textContent = datas[0].JmlJamKerja + " Jam";
                    tulisanjamkerja.style.display = "";
                    jumlahjam = datas[0].JmlJamKerja;
                } else {
                    tulisanjamkerja.style.display = "none";
                }
            });
        if (jam.value == "") {
            jam.value = 0;
        }
        menit.focus();
    }
});

//#endregion

//#region menin on enter

menit.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnproses.disabled = false;
        btnproses.focus();
        if (menit.value == "") {
            menit.value = 0;
        }
    }
});

//#endregion

//#region btn proses

function prosesdiklik() {
    // let Status1;
    let status_kerja;
    let pilih_que;
    let sisa_jam;
    let sisa_menit;
    let total_menit;
    let jumlah_jam;
    let hasil_msg;
    let sisa_no_input;
    let hasil;
    let sisa_jam_no_input;
    let sisa_menit_no_input;
    let Status;
    let input_sebagian;
    if (jam.value == 0 && menit.value == 0) {
        alert("Estimate waktu harus lebih besar dari NOL...");
        return;
    }
    fetch(
        "/CekdatasudahadaInputJadwal/" +
            NamaBagian.value +
            "/" +
            tglStart.value +
            "/" +
            WorkStation.value
    )
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas[0].ada > 0) {
                var userConfirmed = confirm(
                    "Jadwal konstruksi yg akan diinputkan, sudah ada. Mau diinput lagi ??"
                );
                if (userConfirmed == false) {
                    NamaBagian.focus();
                    // Status1 = false;
                    return;
                }
            }
            var jawab_antrian = confirm("Tambahkan antrian baru ... ??");
            let tglSrv = formattedCurrentDate;
            let tglEst = tglStart.value;
            if (jawab_antrian) {
                pilih_que = 1;
                if (tglEst < tglSrv) {
                    status_kerja = 1;
                } else {
                    if (confirm("Tidak emergency.... ??")) {
                        status_kerja = 0;
                    } else {
                        status_kerja = 1;
                    }
                }
            } else {
                if (
                    (tulisanjamkerja.style.display =
                        "none" && JamKerja.textContent == "")
                ) {
                    alert(
                        "Tidak ada jadwal konstruksi. Tidak bisa disisipkan."
                    );
                    if (confirm("Disimpan ??")) {
                        pilih_que = 1;
                        if (tglEst < tglSrv) {
                            status_kerja = 1;
                        } else {
                            if (confirm("Tidak emergency.... ??")) {
                                status_kerja = 0;
                            } else {
                                status_kerja = 1;
                            }
                        }
                    } else {
                        Bataldiklik();
                    }
                } else {
                    pilih_que = 2;
                }
            }
            if (pilih_que == 1) {
                fetch(
                    "/Cekestimasidatekonstruksi/" +
                        tglStart.value +
                        "/" +
                        WorkStation.value
                )
                    .then((response) => response.json())
                    .then((datas) => {
                        // console.log(datas);
                        if (datas[0].Ada < 1) {
                            let total_menit_input =
                                jam.value * 60 + menit.value;
                            let jam_kerja_prompt = prompt(
                                "Tentukan jam kerja optimal u/ tanggal: " +
                                    tglStart.value +
                                    " = "
                            );
                            let menit_jam_kerja = jam_kerja_prompt * 60;
                            if (total_menit_input > menit_jam_kerja) {
                                alert(
                                    "Jam kerja optimal tdk boleh lebih kecil dari estimasi waktu."
                                );
                                jam.focus();
                                return;
                            }
                            if (
                                jam_kerja_prompt !== null &&
                                !isNaN(jam_kerja_prompt)
                            ) {
                                jam_kerja.value = jam_kerja_prompt;
                                // console.log(jam_kerja_prompt);
                                // console.log(jam_kerja.value);
                            }
                            statuskerja.value = status_kerja;

                            ForminputJadwal.submit();

                            // console.log(total_menit_input);
                        } else {
                            fetch(
                                "/HitungSisaJamInputJadwalKons/" +
                                    tglStart.value +
                                    "/" +
                                    WorkStation.value
                            )
                                .then((response) => response.json())
                                .then((datas) => {
                                    console.log(datas);
                                    if (datas.length > 0) {
                                        sisa_jam = datas[0].SisaJamKrj;
                                        sisa_menit = datas[0].SisaMenitKrj;
                                        total_menit =
                                            datas[0].SisaMenitKrj_bantu;
                                        jumlah_jam = datas[0].JamKrj;

                                        let total_menit_input =
                                            jam.value * 60 + menit.value;

                                        if (total_menit_input <= total_menit) {
                                            ForminputJadwal.submit();
                                        } else {
                                            if (
                                                sisa_jam == 0 &&
                                                sisa_menit == 0
                                            ) {
                                                alert("Jadwal FULL....");
                                                hasil_msg = confirm(
                                                    "Edit jam kerja optimal (OK), atau diinputkan di hari berikutnya (Cancel) ??"
                                                );
                                            } else {
                                                sisa_no_input =
                                                    total_menit_input -
                                                    total_menit;
                                                hasil = Math.floor(
                                                    sisa_no_input / 60
                                                );
                                                sisa_jam_no_input = hasil;
                                                sisa_menit_no_input =
                                                    sisa_no_input - 60 * hasil;
                                                alert(
                                                    "Karena jam kerja yg bisa masuk: " +
                                                        sisa_jam +
                                                        " jam " +
                                                        sisa_menit +
                                                        " menit."
                                                );
                                                hasil_msg = confirm(
                                                    "Sisa jam kerjanya (" +
                                                        sisa_jam_no_input +
                                                        " jam " +
                                                        sisa_menit_no_input +
                                                        " menit ), diinputkan hari berikutnya (Yes), atau edit jam kerja optimal (No) ??"
                                                );
                                            }
                                            console.log(hasil_msg);
                                            if (hasil_msg) {
                                                ForminputJadwal.submit();
                                                Status = true;
                                                input_sebagian = true;
                                            } else if (hasil_msg == false) {
                                                //open modal
                                                ModalEdit.style.display =
                                                    "block";
                                                Tanggalmodaledit.value =
                                                    tglStart.value;
                                                WorkStationModalEdit.value =
                                                    WorkStation.value;
                                                TNoWorkSts.value =
                                                    WorkStation.value;
                                            } else {
                                                tglStart.focus();
                                            }
                                        }
                                    }
                                });
                        }
                        if (input_sebagian == true) {
                            alert("Data TerSIMPAN");
                            jam.value = sisa_jam_no_input;
                            menit.value = sisa_menit_no_input;
                            tglStart.focus();
                        }
                        if (Status == true) {
                            alert("Data TerSIMPAN");
                            var msg = confirm(
                                "Input lagi jadwal konstruksi lain u/ no. order: " +
                                    NoOrder.value +
                                    " ??"
                            );
                            if (msg) {
                                clearText1();
                                NamaBagian.focus();
                            } else {
                                clearText();
                                NoOrder.focus();
                            }
                        } else {
                            Bataldiklik();
                        }
                    });
            }
            if (pilih_que == 2) {
                //modal open

            }
        });
}

//#endregion

//#region clear text  1

function clearText1() {
    WorkStation.value = "Pilih Work Station";
    jam.value = "0";
    menit.value = "0";
    hariKe.value = 0;
    NamaBagian.value = "Pilih Bagian";
    tulisanjamkerja.style.display = "none";
    // JamKerja.style.display = "none";
    JamKerja.textContent = "";
    btnproses.disabled = true;
}

//#endregion

//#region clear textx

function clearText() {
    Bataldiklik();
}

//#endregion

//#region proses modal edit

function ProsesModalEdit() {
    methodFormModalEdit.value = "PUT";
    ForminputJadwalModalEdit.action = "/InputJadwalKonstruksi/" + NoOrder.value;
    ForminputJadwalModalEdit.submit();
}

//#endregion

//#region tanggal modal edit on enter

Tanggal.addEventListener('keypress', function(event){
    let tglSrv;
    let tglEst;
    if (event.key == "Enter") {
        tglSrv = formattedCurrentDate;
        tglEst = Tanggal.value;
        WorkStationModalEdit.disabled = false;
        WorkStationModalEdit.focus();
    }
});

//#endregion

//#region WorkStationModalEdit on change

WorkStationModalEdit.addEventListener('keypress', function(event){
    if (event.key == "Enter") {
        let jam;
        fetch(
            "/GetJamKerjaInputJadwal/" +
                WorkStationModalEdit.value +
                "/" +
                Tanggal.value
        )
            .then((response) => response.json())
            .then((datas) => {
                // console.log(datas);
                if (datas.length > 0) {
                    TJam.value = datas[0].JmlJamKerja;
                    jam = datas[0].JmlJamKerja;
                    batalmodaledit.style.display = "";
                    keluarmodaledit.style.display = "none";
                    TJam.focus();
                }
                else{
                    alert("Tidak ada jadwal konstruksi u/ WorkStation: " + WorkStationModalEdit.value + ", pada tanggal: " + Tanggal.value);
                    return;
                }
            });
    }

});

//#endregion

//#region clear text modal edit

function clearTextEdit() {
    WorkStationModalEdit.value = "Pilih Work Station";
    TJam.value = "0";
    btnprosesmodaledit.disabled = true;
    keluarmodaledit.style.display = "";
    batalmodaledit.style.display = "none";
    Tanggal.focus();
}

//#endregion

//#region batal on click

batalmodaledit.addEventListener('click', function(){
    clearTextEdit();
});

//#endregion

//#region Tjam On Enter

TJam.addEventListener('keypress', function(event){
    if (event.key == "Enter") {
        let hasil_bagi;
        let hasil_bagi_car;
        let jam_pk;
        let menit_pk;
        let TotalMenitKrj;
        let TotalMenitPk;
        fetch(
            "/HitungSisaJamInputJadwalKons/" +
                Tanggal.value +
                "/" +
                WorkStationModalEdit.value
        )
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas.length > 0) {
                    TotalMenitKrj = datas[0].TotalMenitKrj;
                    TotalMenitPk = datas[0].TotalMenitPk;

                    hasil_bagi = TotalMenitPk / 60;
                    hasil_bagi_car = hasil_bagi.toString();
                    hasil_bagi = parseFloat(hasil_bagi_car);
                    jam_pk = hasil_bagi;
                    menit_pk = TotalMenitPk - (60 * hasil_bagi);
                    if (TJam.value * 60 < TotalMenitPk) {
                        alert("Jml jam kerja harus lebih besar dari jml jam yg sdh terpakai (" + jam_pk + " jam " + menit_pk + " menit).");
                        return;
                    }
                    else{
                        btnproses.disabled = false;
                        btnproses.focus();
                    }
                }
            });
    }
});

//#endregion


