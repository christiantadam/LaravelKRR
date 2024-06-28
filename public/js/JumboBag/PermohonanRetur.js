document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_customer = document.getElementById("button_customer");
    let btn_kodebarang = document.getElementById("button_kodebarang");
    let btn_pesanan = document.getElementById("button_pesanan");
    let id_customer = document.getElementById("id_customer");
    let customer = document.getElementById("customer");
    let kodeBarangAsal = document.getElementById("kodeBarangAsal");
    let tanggal = document.getElementById("tanggal");
    let no_suratpesanan = document.getElementById("no_suratpesanan");
    let time_deliv = document.getElementById("time_deliv");
    let jumlah_order = document.getElementById("jumlah_order");
    let jumlah_retur = document.getElementById("jumlah_retur");
    let no_referensi = document.getElementById("no_referensi");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let tmb = 1;
    let proses;

    time_deliv.valueAsDate = new Date();
    aktif_tombol(tmb);
    btn_isi.focus();

    if (successMessage) {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: successMessage,
            showConfirmButton: false,
        });
    } else if (errorMessage) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            showConfirmButton: false,
        });
    }

    //#region Function
    function aktif_tombol(tmb) {
        console.log(tmb);
        if (tmb == 1) {
            btn_isi.disabled = false;
            btn_koreksi.disabled = false;
            btn_hapus.disabled = false;
            btn_proses.disabled = true;
            // btn_hapus.innerHTML = "Hapus";
            btn_customer.disabled = true;
            btn_isi.focus();
        } else if (tmb == 2) {
            btn_isi.disabled = true;
            btn_koreksi.disabled = true;
            btn_proses.disabled = false;
            // btn_hapus.innerHTML = "Batal";
            btn_customer.disabled = false;
            btn_customer.focus();
        }
    }

    //#region Event Listener
    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        tmb = 2;
        proses = 1;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        tambah_komponen.disabled = false;
        koreksi_komponen.disabled = false;
        hapus_komponen.disabled = false;
        tmb = 2;
        proses = 2;
        aktif_tombol(tmb);
        cleardata();
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        if (tmb == 2) {
            btn_batal.addEventListener("click", function (event) {
                event.preventDefault();
                tmb = 1;
                proses = 0;
                aktif_tombol(tmb);
                cleardata();
                formEnabler(true);
            });
        } else {
            //proses hapus
            tmb = 2;
            proses = 3;
            aktif_tombol(tmb);
            cleardata();
        }
    });

});
