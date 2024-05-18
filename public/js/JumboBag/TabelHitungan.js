
let csrfToken = document
.querySelector('meta[name="csrf-token"]')
.getAttribute("content");
let customer = document.getElementById("customer");
let btn_customer = document.getElementById("btn_customer");
let kode_barang = document.getElementById("kode_barang");
let btn_kode_barang = document.getElementById("btn_kode_barang");
let tanggal = document.getElementById("tanggal");
let tanggal_update = document.getElementById("tanggal_update");
let body_bentuk = document.getElementById("body_bentuk");
let body_model = document.getElementById("body_model");
let body_panjang = document.getElementById("body_panjang");
let body_lebar = document.getElementById("body_lebar");
let body_diameter = document.getElementById("body_diameter");
let body_tinggi = document.getElementById("body_tinggi");
let cerobongAtas_bentuk = document.getElementById("cerobongAtas_bentuk");
let cerobongAtas_model = document.getElementById("cerobongAtas_model");
let cerobongAtas_panjang = document.getElementById("cerobongAtas_panjang");
let cerobongAtas_lebar = document.getElementById("cerobongAtas_lebar");
let cerobongAtas_diameter = document.getElementById("cerobongAtas_diameter");
let cerobongAtas_tinggi = document.getElementById("cerobongAtas_tinggi");
let cerobongBawah_bentuk = document.getElementById("cerobongBawah_bentuk");
let cerobongBawah_model = document.getElementById("cerobongBawah_model");
let cerobongBawah_panjang = document.getElementById("cerobongBawah_panjang");
let cerobongBawah_lebar = document.getElementById("cerobongBawah_lebar");
let cerobongBawah_diameter = document.getElementById("cerobongBawah_diameter");
let cerobongBawah_tinggi = document.getElementById("cerobongBawah_tinggi");
let reinforced_lebar = document.getElementById("reinforced_lebar");
let reinforced_beltrope = document.getElementById("reinforced_beltrope");
let reinforced_loop = document.getElementById("reinforced_loop");
let reinforced_SWL = document.getElementById("reinforced_SWL");
let reinforced_stdwaktu = document.getElementById("reinforced_stdwaktu");
let reinforced_lami = document.getElementById("reinforced_lami");
let reinforced_warna = document.getElementById("reinforced_warna");
let reinforced_inner = document.getElementById("reinforced_inner");
let reinforced_seal = document.getElementById("reinforced_seal");
let reinforced_jumlah = document.getElementById("reinforced_jumlah");
let reinforced_jarak = document.getElementById("reinforced_jarak");
let reinforced_warnaBelt = document.getElementById("reinforced_warnaBelt");
let reinforced_tinggiloop = document.getElementById("reinforced_tinggiloop");
let reinforced_SF = document.getElementById("reinforced_SF");
let reinforced_printing = document.getElementById("reinforced_printing");
let reinforced_tebal = document.getElementById("reinforced_tebal");
let reinforced_keterangan = document.getElementById("reinforced_keterangan");
let jenis_barang = document.getElementById("jenis_barang");
let tabelData = new DataTable(document.getElementById("tabelData")); //initialize datatables
let tambah_komponen = document.getElementById("tambah_komponen");
let koreksi_komponen = document.getElementById("koreksi_komponen");
let hapus_komponen = document.getElementById("hapus_komponen");
let total1 = document.getElementById("total1");
let total2 = document.getElementById("total2");
let total3 = document.getElementById("total3");
let btn_isi = document.getElementById("btn_isi");
let btn_koreksi = document.getElementById("btn_koreksi");
let btn_hapus = document.getElementById("btn_hapus");
let btn_proses = document.getElementById("btn_proses");
let tmb = 1;

//#region Load Form

btn_isi.focus();
tanggal.valueAsDate = new Date();
tanggal_update.valueAsDate = new Date();
aktif_tombol(tmb);

//#endregion

//#region Functions

function aktif_tombol(tmb) {
    if (tmb == 1) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = false;
        btn_hapus.disabled = false;
        btn_proses.disabled = true;
        btn_customer.disabled = true;
        btn_kode_barang.disabled = true;
        btn_isi.focus();
    } else if (tmb == 2) {
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.innerHTML = "Batal";
        btn_proses.disabled = false;
        btn_customer.disabled = false;
        btn_kode_barang.disabled = false;
        btn_customer.focus();
    }
}

function cleardata() {
    customer.value = "";
    kode_barang.value = "";
    body_bentuk.value = "";
    body_model.value = "";
    body_panjang.value = "";
    body_lebar.value = "";
    body_diameter.value = "";
    body_tinggi.value = "";
    cerobongAtas_bentuk.value = "";
    cerobongAtas_model.value = "";
    cerobongAtas_panjang.value = "";
    cerobongAtas_lebar.value = "";
    cerobongAtas_diameter.value = "";
    cerobongAtas_tinggi.value = "";
    cerobongBawah_bentuk.value = "";
    cerobongBawah_model.value = "";
    cerobongBawah_panjang.value = "";
    cerobongBawah_lebar.value = "";
    cerobongBawah_diameter.value = "";
    cerobongBawah_tinggi.value = "";
    reinforced_lebar.value = "";
    reinforced_beltrope.value = "";
    reinforced_loop.value = "";
    reinforced_SWL.value = "";
    reinforced_stdwaktu.value = "";
    reinforced_lami.value = "";
    reinforced_warna.value = "";
    reinforced_inner.value = "";
    reinforced_seal.checked = false;
    reinforced_jumlah.value = "";
    reinforced_jarak.value = "";
    reinforced_warnaBelt.value = "";
    reinforced_tinggiloop.value = "";
    reinforced_SF.value = "";
    reinforced_printing.value = "";
    reinforced_tebal.value = "";
    reinforced_keterangan.value = "";
    jenis_barang.value = "";
    tabelData.clear().draw();
    total1.value = "";
    total2.value = "";
    total3.value = "";
}

//#endregion

//#region Add Event Listener

btn_isi.addEventListener("click", function (event) {
    event.preventDefault();
    tmb = 2;
    aktif_tombol(tmb);
    cleardata();
});

btn_hapus.addEventListener("click", function (event) {
    event.preventDefault();
    if (tmb == 2) {
        //batal
        tmb = 1;
        aktif_tombol(tmb);
        cleardata();
    } else {
        //proses hapus
        tmb = 2;
        aktif_tombol(tmb);
        cleardata();
    }
});

btn_customer.addEventListener("click", async function (event) {
    event.preventDefault();
    const { value: selectedRow } = await Swal.fire({
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
            $(document).ready(function() {
                $("#customerTable").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    ajax: {
                        url: "getDataCustomerJBB",
                        dataType: "json",
                        type: "POST",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [{
                        data: "Nama_Customer"
                    }, {
                        data: "Kode_Customer"
                    }],
                });
            });
            const table = document.getElementById('customerTable')

            $("#customerTable tbody").on("click", "tr", function () {
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                } else {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                }
            });
        },
    });

    if (selectedRow) {
        customer.value = selectedRow.name;
    }
});
//#endregion
