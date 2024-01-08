//#region variabel
let btnisi = document.getElementById('btnisi');
let btnkoreksi = document.getElementById('btnkoreksi');
let btnproses = document.getElementById('btnproses');
let btnbatal = document.getElementById('btnbatal');

let KodeBarang = document.getElementById('NoOrder');
let tglorder = document.getElementById('tglorder');
let divisi = document.getElementById('divisi');
let lblstatus = document.getElementById('lblstatus');
let UserOd = document.getElementById('UserOd');
let Ketorder = document.getElementById('Ketorder');
let satuan = document.getElementById('satuan');
let kd_barang = document.getElementById('kd_barang');
let nama_barang = document.getElementById('nama_barang');
let noGambar = document.getElementById('noGambar');

let modetrans;

//#endregion

//#region style button
function Isidiklik() {
    // btnbatal.style.display = "block";
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnproses.disabled = false;
    btnbatal.disabled = false;

    KodeBarang.disabled = false;
    tglorder.disabled = false;
    divisi.disabled = false;
    Ketorder.disabled = false;
    kd_barang.disabled = false;
    nama_barang.disabled = false;
    noGambar.disabled = false;
    modetrans = 1;
}
function bataldiklik() {
    // btnbatal.style.display = "none";
    btnisi.disabled = false;
    btnkoreksi.disabled = false;
    btnproses.disabled = true;
    btnbatal.disabled = true;
    modetrans = "";
}

function koreksidiklik() {
    // btnbatal.style.display = "block";
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnproses.disabled = false;
    btnbatal.disabled = false;
    modetrans = 2
}
//#endregion

//#region get barang

function getbarang(Kdbarang) {
    fetch("/getbarangkodeGambar/" + Kdbarang)
    .then((response) => response.json())
    .then((datas) => {
        console.log(datas);
        if (datas.length !== 0) {
            tglorder.value = datas[0].Tgl_Order;
            divisi.value = datas[0].NamaDivisi;
            Ketorder.value = datas[0].Ket_Order;
            satuan.value = datas[0].Nama_satuan;
            lblstatus.textContent = datas[0].Status;
            UserOd.value = datas[0].User_Order;
        }
        else{
            alert("Order Blm Selesai Atau Nomer Order Tidak Ada");
        }
    });
}

//#endregion

//#region get select

function getselect(noOd, kode) {
    fetch("/selectnoGambar/" + noOd + "/" + kode)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        // noGambar.innerHTML = "";
        // //
        // const defaultOption = document.createElement("option");
        // defaultOption.disabled = true;
        // defaultOption.selected = true;
        // defaultOption.innerText = "Pilih Mesin";
        // noGambar.appendChild(defaultOption);
        // //
        // options.forEach((entry) => {
        //     const option = document.createElement("option");
        //     option.value = entry.Nomer;
        //     option.innerText = entry.Mesin + "--" + entry.Nomer;
        //     noGambar.appendChild(option);
        // });
    });
}

//#endregion

//#region TnoOd di enter

KodeBarang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let kodeBarang6digit;
        kodeBarang6digit = document.getElementById("NoOrder");
        if (kodeBarang6digit.value.length < 6) {
            kodeBarang6digit.value = KodeBarang.value.padStart(6, "0");
        }
        KodeBarang.value = kodeBarang6digit.value;
        getbarang(KodeBarang.value);
        getselect(KodeBarang.value, 1);
    }
});

//#endregion
