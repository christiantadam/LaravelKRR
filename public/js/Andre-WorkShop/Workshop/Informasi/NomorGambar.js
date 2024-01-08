let kd_barang = document.getElementById('kd_barang');
let nama_barang = document.getElementById('nama_barang');
let no_barang = document.getElementById('no_barang');
//#region kode barang enter

kd_barang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let kodeBarang9digit;
        kodeBarang9digit = document.getElementById("kd_barang");
        if (kodeBarang9digit.value.length < 9) {
            // alert("kode barang tidak sesuai");
            kodeBarang9digit.value = kd_barang.value.padStart(9, "0");
            // console.log(kodeBarang9digit.value);
        }
        kd_barang.value = kodeBarang9digit.value;
        //console.log(kd_barang.value);
        fetch("/getdataNomorGambar/" + kd_barang.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                if (options.length == 0) {
                    alert("Kode Barang Tidak Ada");
                    return;
                }
                else{
                    if (options[0].NO_GAMBAR == null) {
                        alert("Kode Barang " + kd_barang.value + " Blm Ada Nomer Gambarnya");
                        nama_barang.value = options[0].NAMA_BRG;
                        return;
                    }
                    else{
                        nama_barang.value = options[0].NAMA_BRG;
                        no_barang.value = options[0].NO_GAMBAR;
                    }
                }
            });
    }
});

//#endregion
