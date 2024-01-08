let NoOrder = document.getElementById("NoOrder");
let NamaBagian = document.getElementById("NamaBagian");
let btnisi = document.getElementById("Isi");
let btnkoreksi = document.getElementById("Koreksi");
let btnhapus = document.getElementById("Hapus");
let btnbatal = document.getElementById("Batal");
let btnProses = document.getElementById("Proses");
let divisi = document.getElementById("divisi");
let Kode_Barang = document.getElementById("Kode_Barang");
let NoGambarRev = document.getElementById("NoGambarRev");
let NamaBarang = document.getElementById("NamaBarang");
let Mesin = document.getElementById("Mesin");
let Pengorder = document.getElementById("Pengorder");
let KetOrder = document.getElementById("KetOrder");
let OdSts = document.getElementById("OdSts");
let NamaBagiantext = document.getElementById("NamaBagiantext");
let FormMaintenanceGambar = document.getElementById("FormMaintenanceGambar");
let proses;
let methodForm = document.getElementById("methodForm");
let ubah = document.getElementById('ubah');
let terubah = false;
//#region btn isi on click
function isi() {
    proses = 1;
    NoOrder.disabled = false;
    NamaBagian.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnhapus.disabled = true;
    btnbatal.style.display = "";
    NoOrder.focus();
}
//#endregion

//#region koreksi

function koreksiklik() {
    proses = 2;
    NoOrder.disabled = false;
    NamaBagian.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnhapus.disabled = true;
    btnbatal.style.display = "";
    ubah.style.display = "";
    NoOrder.focus();
}
//#endregion

//#region hapus

function hapusdiklik() {
    proses = 3;
    NoOrder.disabled = false;
    NamaBagian.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnhapus.disabled = true;
    btnbatal.style.display = "";
    NoOrder.focus();
}

//#endregion

//#region batal

function Bataldiklik() {
    btnbatal.style.display = "none";
    btnProses.disabled = true;
    NoOrder.disabled = true;
    NamaBagian.disabled = true;
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
    NamaBagian.value = "Pilih Bagian";
    NamaBagiantext.value = "";
    NamaBagiantext.style.display = "none";
    NamaBagian.style.display = "";
}

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
    fetch("/LoadDataMaintenanceGambar/" + NomorOrder)
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
                OdSts.textContent = datas[0].OdSts;
                divisi.value = datas[0].NamaDivisi;
                Kode_Barang.value = datas[0].Kd_Brg;
                NoGambarRev.value = datas[0].No_Gbr_Rev;
                NamaBarang.value = datas[0].Nama_Brg;
                Mesin.value = datas[0].Mesin;
                Pengorder.value = datas[0].Pengorder;
                KetOrder.value = datas[0].Ket_Order;
                // NamaBagian.focus();
                fetch("/cekdataestimasiMaintenanceGambar/" + NomorOrder)
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
                            if (proses == 1) {
                                NamaBagiantext.style.display = "";
                                NamaBagian.style.display = "none";
                                NamaBagiantext.focus();
                            } else {
                                loadnamabagian(NoOrder.value);
                                NamaBagiantext.style.display = "none";
                                NamaBagian.style.display = "";
                                NamaBagian.focus();
                            }
                        }
                    });
            }
        });
}

//#endregion

//#region Text bagian on enter

NamaBagiantext.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if (event.key == "Enter") {
        if (NamaBagiantext.value != "") {
            btnProses.disabled = false;
            btnProses.focus();
        } else {
            alert("Nama Bagian tdk boleh kosong");
            // return;
        }
    }
});

//#endregion

//#region select bagian on enter

NamaBagian.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (proses == 2) {
            // console.log(NamaBagian.textContent.split('--')[0]);
            NamaBagiantext.value = NamaBagian.options[NamaBagian.selectedIndex].text.split("--")[0];;
            NamaBagian.style.display = "none";
            NamaBagiantext.style.display = "";
        }
        btnProses.disabled = false;
        btnProses.focus();
    }
});

//#endregion

//#region loadnamabagian

function loadnamabagian(NomorOrder) {
    fetch("/GetdatabagianMaintenanceGambar/" + NomorOrder)
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

//#region ubah on click

ubah.addEventListener('click', function(){
    if (terubah == false) {
        NamaBagian.style.display = "none";
        NamaBagiantext.style.display = "";
        terubah = true;
    }
    else{
        NamaBagian.style.display = "";
        NamaBagiantext.style.display = "none";
        terubah = false;
    }
})

//#endregion

//#region Proses

function prosesdiklik() {
    console.log(proses);
    // console.log(NoOrder.value);
    if (proses == 1) {
        fetch(
            "/cekdataMaintenanceGambar/" +
                NoOrder.value +
                "/" +
                NamaBagiantext.value
        )
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas[0].ada > 0) {
                    alert(
                        "Nama Bagian yg akan diinputkan, sudah ada. Tlg dicek datanya."
                    );
                    return;
                } else {
                    $.ajax({
                        url: "MaintenanceGambar",
                        method: "POST",
                        data: new FormData(FormMaintenanceGambar),
                        dataType: "JSON",
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (response) {
                            // console.log(response);
                        },
                    });
                    alert("Data telah diSimpan.");
                    var userConfirmed = confirm(
                        "Apakah Anda yakin ingin melanjutkan?"
                    );
                    if (userConfirmed) {
                        NamaBagiantext.value = "";
                        NamaBagiantext.focus();
                    } else {
                        Bataldiklik();
                    }
                    // FormMaintenanceGambar.submit();
                }
            });
    }
    if (proses == 2) {
        methodForm.value = "PUT";
        FormMaintenanceGambar.action = "/MaintenanceGambar/" + NoOrder.value;
        FormMaintenanceGambar.submit();
    }
    if (proses == 3) {
        fetch("/cekdatabagianMaintenanceGambar/" + NoOrder.value + "/" +NamaBagian.value)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                if (datas[0].ada > 0) {
                    alert("Nama Bagian tdk bisa diHapus, karena sudah terjadwal.");
                    return;
                } else {
                    methodForm.value = "DELETE";
                    FormMaintenanceGambar.action = "/MaintenanceGambar/" + NamaBagian.value;
                    FormMaintenanceGambar.submit();
                }
            });
    }
}

//#endregion
