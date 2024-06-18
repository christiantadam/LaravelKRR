let csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
let customer = document.getElementById("customer");
let id_customer = document.getElementById("id_customer");
let btn_customer = document.getElementById("btn_customer");
let nama_barang = document.getElementById("nama_barang");
let komponen = document.getElementById("komponen");
let btn_nama_barang = document.getElementById("btn_nama_barang");
let tanggal = document.getElementById("tanggal");
let tanggal_update = document.getElementById("tanggal_update");
let body_bentuk = document.getElementById("body_bentuk");
let btn_body_model = document.getElementById("btn_body_model");
let body_model = document.getElementById("body_model");
let id_body_model = document.getElementById("id_body_model");
let body_panjang = document.getElementById("body_panjang");
let body_lebar = document.getElementById("body_lebar");
let body_diameter = document.getElementById("body_diameter");
let body_tinggi = document.getElementById("body_tinggi");
let cerobongAtas_bentuk = document.getElementById("cerobongAtas_bentuk");
let cerobongAtas_model = document.getElementById("cerobongAtas_model");
let id_cerobongAtas_model = document.getElementById("id_cerobongAtas_model");
let btn_cerobongAtas_model = document.getElementById("btn_cerobongAtas_model");
let cerobongAtas_panjang = document.getElementById("cerobongAtas_panjang");
let cerobongAtas_lebar = document.getElementById("cerobongAtas_lebar");
let cerobongAtas_diameter = document.getElementById("cerobongAtas_diameter");
let cerobongAtas_tinggi = document.getElementById("cerobongAtas_tinggi");
let cerobongBawah_bentuk = document.getElementById("cerobongBawah_bentuk");
let cerobongBawah_model = document.getElementById("cerobongBawah_model");
let id_cerobongBawah_model = document.getElementById("id_cerobongBawah_model");
let btn_cerobongBawah_model = document.getElementById(
    "btn_cerobongBawah_model"
);
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
let btn_reinforced_lami = document.getElementById("btn_reinforced_lami");
let id_reinforced_lami = document.getElementById("id_reinforced_lami");
let reinforced_warna = document.getElementById("reinforced_warna");
let btn_reinforced_warna = document.getElementById("btn_reinforced_warna");
let id_reinforced_warna = document.getElementById("id_reinforced_warna");
let reinforced_inner = document.getElementById("reinforced_inner");
let reinforced_seal = document.getElementById("reinforced_seal");
let reinforced_jumlah = document.getElementById("reinforced_jumlah");
let reinforced_jarak = document.getElementById("reinforced_jarak");
let reinforced_warnaBelt = document.getElementById("reinforced_warnaBelt");
let btn_reinforced_warnaBelt = document.getElementById(
    "btn_reinforced_warnaBelt"
);
let id_reinforced_warnaBelt = document.getElementById(
    "id_reinforced_warnaBelt"
);
let reinforced_tinggiloop = document.getElementById("reinforced_tinggiloop");
let reinforced_SF1 = document.getElementById("reinforced_SF1");
let reinforced_SF2 = document.getElementById("reinforced_SF2");
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
let proses;
let warna = "";
let standarwaktu = "0";
let kounter = 1;
let statusBS = false;
let PanjangPot;
let LebarPot;
let WARajutan;
let WERajutan;
let Denier;
let Qty;
let Berat;
let Harga;
let SubTotal;
//#region Load Form

btn_isi.focus();
tanggal.valueAsDate = new Date();
tanggal_update.valueAsDate = new Date();
aktif_tombol(tmb);

//#endregion

//#region SetInputFilter

const inputIds = [
    "body_panjang",
    "body_lebar",
    "body_diameter",
    "body_tinggi",
    "cerobongAtas_panjang",
    "cerobongAtas_lebar",
    "cerobongAtas_diameter",
    "cerobongAtas_tinggi",
    "cerobongBawah_panjang",
    "cerobongBawah_lebar",
    "cerobongBawah_diameter",
    "cerobongBawah_tinggi",
    "reinforced_lebar",
    "reinforced_loop",
    "reinforced_SWL",
    "reinforced_stdwaktu",
    "reinforced_inner",
    "reinforced_jumlah",
    "reinforced_jarak",
    "reinforced_tinggiloop",
    "reinforced_SF1",
    "reinforced_SF2",
    "reinforced_tebal",
];

// Loop through each input ID and apply the filter
inputIds.forEach(function (id) {
    const inputElement = document.getElementById(id);
    if (inputElement) {
        setInputFilter(
            inputElement,
            function (value) {
                return /^-?\d*[.,]?\d*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    } else {
        console.warn("Input element with ID '" + id + "' not found.");
    }
});
//#endregion

//#region Functions

function aktif_tombol(tmb) {
    if (tmb == 1) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = false;
        btn_hapus.disabled = false;
        btn_proses.disabled = true;
        btn_hapus.innerHTML = "Hapus";
        btn_customer.disabled = true;
        btn_isi.focus();
    } else if (tmb == 2) {
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_proses.disabled = false;
        btn_hapus.innerHTML = "Batal";
        btn_customer.disabled = false;
        btn_customer.focus();
    }
}

function cleardata() {
    tanggal.valueAsDate = new Date();
    tanggal_update.valueAsDate = new Date();
    customer.value = "";
    customer.disabled = true;
    id_customer.value = "";
    nama_barang.value = "";
    nama_barang.disabled = true;
    komponen.value = "";
    komponen.disabled = true;
    body_bentuk.value = "";
    body_bentuk.disabled = true;
    id_body_model.value = "";
    body_model.value = "";
    body_model.disabled = true;
    body_panjang.value = "";
    body_panjang.disabled = true;
    body_lebar.value = "";
    body_lebar.disabled = true;
    body_diameter.value = "";
    body_diameter.disabled = true;
    body_tinggi.value = "";
    body_tinggi.disabled = true;
    cerobongAtas_bentuk.value = "";
    cerobongAtas_bentuk.disabled = true;
    id_cerobongAtas_model.value = "";
    cerobongAtas_model.value = "";
    cerobongAtas_model.disabled = true;
    cerobongAtas_panjang.value = "";
    cerobongAtas_panjang.disabled = true;
    cerobongAtas_lebar.value = "";
    cerobongAtas_lebar.disabled = true;
    cerobongAtas_diameter.value = "";
    cerobongAtas_diameter.disabled = true;
    cerobongAtas_tinggi.value = "";
    cerobongAtas_tinggi.disabled = true;
    cerobongBawah_bentuk.value = "";
    cerobongBawah_bentuk.disabled = true;
    id_cerobongBawah_model.value = "";
    cerobongBawah_model.value = "";
    cerobongBawah_model.disabled = true;
    cerobongBawah_panjang.value = "";
    cerobongBawah_panjang.disabled = true;
    cerobongBawah_lebar.value = "";
    cerobongBawah_lebar.disabled = true;
    cerobongBawah_diameter.value = "";
    cerobongBawah_diameter.disabled = true;
    cerobongBawah_tinggi.value = "";
    cerobongBawah_tinggi.disabled = true;
    reinforced_lebar.value = "";
    reinforced_lebar.disabled = true;
    reinforced_beltrope.value = "";
    reinforced_beltrope.disabled = true;
    reinforced_loop.value = "";
    reinforced_loop.disabled = true;
    reinforced_SWL.value = "";
    reinforced_SWL.disabled = true;
    reinforced_stdwaktu.value = "";
    reinforced_stdwaktu.disabled = true;
    reinforced_lami.value = "";
    reinforced_lami.disabled = true;
    reinforced_warna.value = "";
    reinforced_warna.disabled = true;
    reinforced_inner.value = "";
    reinforced_inner.disabled = true;
    reinforced_seal.checked = false;
    reinforced_seal.disabled = true;
    reinforced_jumlah.value = "";
    reinforced_jumlah.disabled = true;
    reinforced_jarak.value = "";
    reinforced_jarak.disabled = true;
    reinforced_warnaBelt.value = "";
    reinforced_warnaBelt.disabled = true;
    reinforced_tinggiloop.value = "";
    reinforced_tinggiloop.disabled = true;
    reinforced_SF1.value = "";
    reinforced_SF1.disabled = true;
    reinforced_SF2.value = "";
    reinforced_SF2.disabled = true;
    reinforced_printing.value = "";
    reinforced_printing.disabled = true;
    reinforced_tebal.value = "";
    reinforced_tebal.disabled = true;
    reinforced_keterangan.value = "";
    reinforced_keterangan.disabled = true;
    jenis_barang.value = "";
    jenis_barang.disabled = true;
    tabelData.clear().draw();
    total1.disabled = true;
    total1.value = "";
    total2.disabled = true;
    total2.value = "";
    total3.disabled = true;
    total3.value = "";
    btn_body_model.disabled = true;
    btn_cerobongAtas_model.disabled = true;
    btn_cerobongBawah_model.disabled = true;
    btn_reinforced_warna.disabled = true;
    btn_reinforced_warnaBelt.disabled = true;
    btn_reinforced_lami.disabled = true;
    btn_nama_barang.disabled = true;
}

function formEnabler(status) {
    body_bentuk.disabled = status;
    body_panjang.disabled = status;
    body_lebar.disabled = status;
    body_diameter.disabled = status;
    body_tinggi.disabled = status;
    btn_body_model.disabled = status;
    cerobongAtas_bentuk.disabled = status;
    cerobongAtas_panjang.disabled = status;
    cerobongAtas_lebar.disabled = status;
    cerobongAtas_diameter.disabled = status;
    cerobongAtas_tinggi.disabled = status;
    btn_cerobongAtas_model.disabled = status;
    cerobongBawah_bentuk.disabled = status;
    cerobongBawah_panjang.disabled = status;
    cerobongBawah_lebar.disabled = status;
    cerobongBawah_diameter.disabled = status;
    cerobongBawah_tinggi.disabled = status;
    btn_cerobongBawah_model.disabled = status;
    reinforced_lebar.disabled = status;
    reinforced_beltrope.disabled = status;
    reinforced_jarak.disabled = status;
    reinforced_inner.disabled = status;
    reinforced_jumlah.disabled = status;
    reinforced_keterangan.disabled = status;
    reinforced_loop.disabled = status;
    reinforced_printing.disabled = status;
    reinforced_seal.disabled = status;
    reinforced_stdwaktu.disabled = status;
    reinforced_tebal.disabled = status;
    reinforced_tinggiloop.disabled = status;
    reinforced_SWL.disabled = status;
    reinforced_SF1.disabled = status;
    reinforced_SF2.disabled = status;
    btn_reinforced_lami.disabled = status;
    btn_reinforced_warna.disabled = status;
    btn_reinforced_warnaBelt.disabled = status;
    jenis_barang.disabled = status;
    tambah_komponen.disabled = status;
    koreksi_komponen.disabled = status;
    hapus_komponen.disabled = status;
}

function loadDataKoreksi(kode_barang, nama_customer) {
    return new Promise((resolve, reject) => {
        //loadDataKoreksi ini adalah function loadDataHeader dan loadDataRincian dijadikan 1
        fetch("/GetDataKoreksi/" + kode_barang + "/" + nama_customer)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas);
                let parts = datas[0][0]["Tgl_Update"].split(" ")[0].split("-");
                let tgl = parts[0] + "-" + parts[1] + "-" + parts[2];
                tanggal_update.value = tgl;
                if (proses == 2) {
                    formEnabler(false);
                }

                //Bagian Body
                body_bentuk.value = datas[1][0]["Bentuk_BB"];
                body_panjang.value = parseFloat(
                    datas[1][0]["Panjang_BB"]
                ).toFixed(2);
                body_lebar.value = parseFloat(datas[1][0]["Lebar_BB"]).toFixed(
                    2
                );
                body_tinggi.value = parseFloat(
                    datas[1][0]["Tinggi_BB"]
                ).toFixed(2);
                body_diameter.value = parseFloat(
                    datas[1][0]["Diameter_BB"]
                ).toFixed(2);
                body_model.value = datas[1][0]["Nama_ModelBB"];
                id_body_model.value = datas[1][0]["Model_BB"];

                //Bagian Cerobong Atas
                cerobongAtas_bentuk.value = datas[1][0]["Bentuk_CA"];
                cerobongAtas_panjang.value = parseFloat(
                    datas[1][0]["Panjang_CA"]
                ).toFixed(2);
                cerobongAtas_lebar.value = parseFloat(
                    datas[1][0]["Lebar_CA"]
                ).toFixed(2);
                cerobongAtas_tinggi.value = parseFloat(
                    datas[1][0]["Tinggi_CA"]
                ).toFixed(2);
                cerobongAtas_diameter.value = parseFloat(
                    datas[1][0]["Diameter_CA"]
                ).toFixed(2);
                cerobongAtas_model.value = datas[1][0]["Nama_ModelCA"];
                id_cerobongAtas_model.value = datas[1][0]["Model_CA"];

                //Bagian Cerobong Bawah
                cerobongBawah_bentuk.value = datas[1][0]["Bentuk_CB"];
                cerobongBawah_panjang.value = parseFloat(
                    datas[1][0]["Panjang_CB"]
                ).toFixed(2);
                cerobongBawah_lebar.value = parseFloat(
                    datas[1][0]["Lebar_CB"]
                ).toFixed(2);
                cerobongBawah_tinggi.value = parseFloat(
                    datas[1][0]["Tinggi_CB"]
                ).toFixed(2);
                cerobongBawah_diameter.value = parseFloat(
                    datas[1][0]["Diameter_CB"]
                ).toFixed(2);
                cerobongBawah_model.value = datas[1][0]["Nama_ModelCB"];
                id_cerobongBawah_model.value = datas[1][0]["Model_CB"];

                //Bagian Reinforced
                reinforced_lebar.value = datas[1][0]["Reinforced"];
                reinforced_jumlah.value = datas[1][0]["jmlrein"] ?? 0;
                reinforced_jarak.value = datas[1][0]["jarakrein"] ?? 0;
                reinforced_beltrope.value = datas[1][0]["Belt_Rope"];
                reinforced_warna.value = datas[1][0]["Warna"];
                reinforced_loop.value = datas[1][0]["Jumlah_Loop"];
                reinforced_tinggiloop.value = datas[1][0]["Tinggi_Loop"];
                reinforced_SWL.value = datas[1][0]["SWL"];
                reinforced_SF1.value = datas[1][0]["SF1"];
                reinforced_SF2.value = datas[1][0]["SF2"];
                reinforced_stdwaktu.value = datas[1][0]["std_waktu"] ?? 0;
                reinforced_printing.value = datas[1][0]["Status_Printing"] ?? 0;
                if (datas[1][0]["Lami"] == "N") {
                    reinforced_lami.value = "No Lami";
                    reinforced_tebal.value = 0;
                } else {
                    reinforced_lami.value = datas[1][0]["Status_Lami"];
                    reinforced_tebal.value = datas[1][0]["Tebal_lami"];
                }
                if (datas[1][0]["Iner"] == "N") {
                    reinforced_inner.value = 0;
                } else {
                    reinforced_inner.value = datas[1][0]["Tebal_Iner"];
                }
                reinforced_keterangan.value = datas[1][0]["Keterangan"];
                jenis_barang.value = datas[1][0]["Usage_type"] ?? "-";
                warna = "";
                standarwaktu = reinforced_stdwaktu.value;

                let dataToInsert = datas[2];
                let index = 0;

                $(document).ready(function () {
                    if (tabelData.data().any()) {
                        tabelData.clear().draw();
                    }
                    dataToInsert.forEach(function (obj) {
                        // index += 1;
                        tabelData.row
                            .add([
                                obj.Kode_Komponen,
                                obj.Nama_Komponen,
                                parseFloat(obj.Panjang_Potongan).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                parseFloat(obj.Lebar_Potongan).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                parseFloat(obj.WA_Rajutan).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                parseFloat(obj.WE_Rajutan).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                parseFloat(obj.Denier).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }),
                                parseFloat(obj.Quantity).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                parseFloat(obj.Berat).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }),
                                parseFloat(obj.Harga).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }),
                                parseFloat(obj.SubTotal).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                parseFloat(obj.Kounter_Komponen).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                ),
                                // index,
                            ])
                            .draw();
                    });
                    if (proses == 2) {
                        $("#tabelData tbody").on("click", "tr", function () {
                            console.log("masuk #tabelData tbody click", this);
                            // Remove 'selected' class from all rows
                            tabelData.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                    }
                });
            });
    });
}

function insertMasterDanKodeBarang() {
    return new Promise((resolve, reject) => {
        let lamiValue;
        let statusLamiValue;
        let tebalLamiValue;
        let innerValue;
        let tebalInnerValue;
        let sealValue;
        let dateNowValue;

        if (reinforced_lami.value == "No Lami") {
            lamiValue = "N";
            statusLamiValue = "";
            tebalLamiValue = 0;
        } else {
            lamiValue = "Y";
            statusLamiValue = reinforced_lami.value;
            tebalLamiValue = reinforced_tebal.value;
        }

        if (reinforced_inner.value > 0) {
            innerValue = "Y";
            tebalInnerValue = reinforced_inner.value;
            if (reinforced_seal.checked == true) {
                sealValue = "Y";
            } else {
                sealValue = "N";
            }
        } else {
            innerValue = "N";
            tebalInnerValue = 0;
        }
        dateNowValue = new Date();
        let formattedDateNow =
            dateNowValue.getFullYear() +
            "-" +
            ("0" + (dateNowValue.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + dateNowValue.getDate()).slice(-2) +
            " " +
            ("0" + dateNowValue.getHours()).slice(-2) +
            ":" +
            ("0" + dateNowValue.getMinutes()).slice(-2) +
            ":" +
            ("0" + dateNowValue.getSeconds()).slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                BentukBB: body_bentuk.value,
                ModelBB: id_body_model.value,
                KodeModelBB: body_bentuk.value + id_body_model.value,
                PanjangBB: body_panjang.value,
                LebarBB: body_lebar.value,
                TinggiBB: body_tinggi.value,
                DiameterBB: body_diameter.value,
                BentukCA: cerobongAtas_bentuk.value,
                ModelCA: id_cerobongAtas_model.value,
                KodeModelCA:
                    cerobongAtas_bentuk.value + id_cerobongAtas_model.value,
                PanjangCA: cerobongAtas_panjang.value,
                LebarCA: cerobongAtas_lebar.value,
                TinggiCA: cerobongAtas_tinggi.value,
                DiameterCA: cerobongAtas_diameter.value,
                BentukCB: cerobongBawah_bentuk.value,
                ModelCB: id_cerobongBawah_model.value,
                KodeModelCB:
                    cerobongBawah_bentuk.value + id_cerobongBawah_model.value,
                PanjangCB: cerobongBawah_panjang.value,
                LebarCB: cerobongBawah_lebar.value,
                TinggiCB: cerobongBawah_tinggi.value,
                DiameterCB: cerobongBawah_diameter.value,
                Reinforced: reinforced_lebar.value,
                Warna: reinforced_warna.value,
                BeltRope: reinforced_beltrope.value,
                Loop: reinforced_loop.value,
                TinggiLoop: reinforced_tinggiloop.value,
                Swl: reinforced_SWL.value,
                Sf1: reinforced_SF1.value,
                Sf2: reinforced_SF2.value,
                Lami: lamiValue,
                StatusLami: statusLamiValue,
                TebalLami: tebalLamiValue,
                Inner: innerValue,
                Tebalinner: tebalInnerValue,
                Seal: sealValue,
                Keterangan: reinforced_keterangan.value,
                StdWaktu: reinforced_stdwaktu.value,
                JmlReinf: reinforced_jumlah.value,
                JarakReinf: reinforced_jarak.value,
                StatusPrinting: reinforced_printing.value,
                Usage_type: jenis_barang.value,
                KodeCustomer: id_customer.value,
                Tanggal: tanggal.value,
                Tgl_Update: formattedDateNow,
                mode_insert: "Master",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                if (response.success) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text:
                            "Head Data Tabel Hitungan Kode : " +
                            nama_barang.value +
                            " sudah disimpan !",
                    });
                }
                console.log(response);
                resolve(); // Resolve the promise when the request is successful
            },
            error: function (xhr, status, error) {
                console.error(error); // Handle errors
                reject(error); // Reject the promise if an error occurs
            },
        });
    });
}

function updateDataHead() {
    return new Promise((resolve, reject) => {
        let lamiValue;
        let statusLamiValue;
        let tebalLamiValue;
        let innerValue;
        let tebalInnerValue;
        let sealValue;
        let dateNowValue;

        if (reinforced_lami.value == "No Lami") {
            lamiValue = "N";
            statusLamiValue = "";
            tebalLamiValue = 0;
        } else {
            lamiValue = "Y";
            statusLamiValue = reinforced_lami.value;
            tebalLamiValue = reinforced_tebal.value;
        }

        if (reinforced_inner.value > 0) {
            innerValue = "Y";
            tebalInnerValue = reinforced_inner.value;
            if (reinforced_seal.checked == true) {
                sealValue = "Y";
            } else {
                sealValue = "N";
            }
        } else {
            innerValue = "N";
            tebalInnerValue = 0;
        }
        dateNowValue = new Date();
        let formattedDateNow =
            dateNowValue.getFullYear() +
            "-" +
            ("0" + (dateNowValue.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + dateNowValue.getDate()).slice(-2) +
            " " +
            ("0" + dateNowValue.getHours()).slice(-2) +
            ":" +
            ("0" + dateNowValue.getMinutes()).slice(-2) +
            ":" +
            ("0" + dateNowValue.getSeconds()).slice(-2);

        $.ajax({
            type: "PUT", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB/" + nama_barang.value, // Specify the URL of your controller
            data: {
                _token: csrfToken,
                BentukBB: body_bentuk.value,
                ModelBB: id_body_model.value,
                KodeModelBB: body_bentuk.value + id_body_model.value,
                PanjangBB: body_panjang.value,
                LebarBB: body_lebar.value,
                TinggiBB: body_tinggi.value,
                DiameterBB: body_diameter.value,
                BentukCA: cerobongAtas_bentuk.value,
                ModelCA: id_cerobongAtas_model.value,
                KodeModelCA:
                    cerobongAtas_bentuk.value + id_cerobongAtas_model.value,
                PanjangCA: cerobongAtas_panjang.value,
                LebarCA: cerobongAtas_lebar.value,
                TinggiCA: cerobongAtas_tinggi.value,
                DiameterCA: cerobongAtas_diameter.value,
                BentukCB: cerobongBawah_bentuk.value,
                ModelCB: id_cerobongBawah_model.value,
                KodeModelCB:
                    cerobongBawah_bentuk.value + id_cerobongBawah_model.value,
                PanjangCB: cerobongBawah_panjang.value,
                LebarCB: cerobongBawah_lebar.value,
                TinggiCB: cerobongBawah_tinggi.value,
                DiameterCB: cerobongBawah_diameter.value,
                Reinforced: reinforced_lebar.value,
                Warna: reinforced_warna.value,
                BeltRope: reinforced_beltrope.value,
                Loop: reinforced_loop.value,
                TinggiLoop: reinforced_tinggiloop.value,
                Swl: reinforced_SWL.value,
                Sf1: reinforced_SF1.value,
                Sf2: reinforced_SF2.value,
                Lami: lamiValue,
                StatusLami: statusLamiValue,
                TebalLami: tebalLamiValue,
                Inner: innerValue,
                Tebalinner: tebalInnerValue,
                Seal: sealValue,
                Keterangan: reinforced_keterangan.value,
                StdWaktu: reinforced_stdwaktu.value,
                JmlReinf: reinforced_jumlah.value,
                JarakReinf: reinforced_jarak.value,
                StatusPrinting: reinforced_printing.value,
                Usage_type: jenis_barang.value,
                KodeCustomer: id_customer.value,
                Tanggal: tanggal.value,
                Tgl_Update: formattedDateNow,
                mode_update: "HeadUpdate",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                if (response.success) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text:
                            "Head Data Tabel Hitungan Kode : " +
                            nama_barang.value +
                            " sudah dikoreksi !",
                    });
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text: "Anda telah melakukan perubahan pada Head Data Tabel Hitungan! Koreksi kembali komponen-komponen yang sudah ada!",
                    });
                }
                console.log(response);
                resolve(); // Resolve the promise when the request is successful
            },
            error: function (xhr, status, error) {
                console.error(error); // Handle errors
                reject(error); // Reject the promise if an error occurs
            },
        });
    });
}

function deleteDataTableHitungan() {
    return new Promise((resolve, reject) => {
        let lamiValue;
        let statusLamiValue;
        let tebalLamiValue;
        let innerValue;
        let tebalInnerValue;
        let sealValue;
        let dateNowValue;

        if (reinforced_lami.value == "No Lami") {
            lamiValue = "N";
            statusLamiValue = "";
            tebalLamiValue = 0;
        } else {
            lamiValue = "Y";
            statusLamiValue = reinforced_lami.value;
            tebalLamiValue = reinforced_tebal.value;
        }

        if (reinforced_inner.value > 0) {
            innerValue = "Y";
            tebalInnerValue = reinforced_inner.value;
            if (reinforced_seal.checked == true) {
                sealValue = "Y";
            } else {
                sealValue = "N";
            }
        } else {
            innerValue = "N";
            tebalInnerValue = 0;
        }
        dateNowValue = new Date();
        let formattedDateNow =
            dateNowValue.getFullYear() +
            "-" +
            ("0" + (dateNowValue.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + dateNowValue.getDate()).slice(-2) +
            " " +
            ("0" + dateNowValue.getHours()).slice(-2) +
            ":" +
            ("0" + dateNowValue.getMinutes()).slice(-2) +
            ":" +
            ("0" + dateNowValue.getSeconds()).slice(-2);

        $.ajax({
            type: "DELETE", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB/" + nama_barang.value, // Specify the URL of your controller
            data: {
                _token: csrfToken,
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                if (response.success) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text:
                            "Head Data Tabel Hitungan Kode : " +
                            nama_barang.value +
                            " sudah dihapus !",
                    });
                }
                console.log(response);
                resolve(); // Resolve the promise when the request is successful
            },
            error: function (xhr, status, error) {
                console.error(error); // Handle errors
                reject(error); // Reject the promise if an error occurs
            },
        });
    });
}

function SetVariabel() {
    PanjangPot = 0;
    LebarPot = 0;
    WARajutan = 0;
    WERajutan = 0;
    Denier = 0;
    Qty = 0;
    Berat = 0;
    Harga = 0;
    SubTotal = 0;
}

function Rumus_PanjangBB(bentukRumus_PanjangBB, modelRumus_PanjangBB) {
    let hasil = 0;

    // const txtTinggiBB = document.getElementById("txtTinggiBB").value;
    // const txtPanjangBB = document.getElementById("txtPanjangBB").value;
    // const txtLebarBB = document.getElementById("txtLebarBB").value;
    // const txtDiaBB = document.getElementById("txtDiaBB").value;

    const tinggiBB = parseFloat(body_tinggi.value ?? 0);
    const panjangBB = parseFloat(body_panjang.value ?? 0);
    const lebarBB = parseFloat(body_lebar.value ?? 0);
    const diaBB = parseFloat(body_diameter.value ?? 0);

    if (bentukRumus_PanjangBB === "S") {
        switch (Model) {
            case "01BBTM":
                hasil = tinggiBB + 12;
                break;
            case "01BBTO":
                hasil = tinggiBB + 10;
                break;
            case "01BBIM":
                hasil = panjangBB * 2 + lebarBB * 2 + 14;
                break;
            case "01BBIO":
                hasil = panjangBB * 2 + lebarBB * 2 + 10;
                break;
            case "01BBUO":
                hasil = tinggiBB * 2 + lebarBB + 17;
                break;
            case "01BBUM":
                hasil = tinggiBB * 2 + panjangBB + 17;
                break;
            case "01BB2M":
                hasil = 2 * (panjangBB + lebarBB) + 2 * 14;
                break;
            case "01BB2O":
                hasil = 2 * (panjangBB + lebarBB) + 2 * 10;
                break;
            case "01BBTS":
                hasil = tinggiBB + 6;
                break;
        }
    } else {
        switch (modelRumus_PanjangBB) {
            case "01BBTM":
                hasil = tinggiBB + 12;
                break;
            case "01BBTO":
                hasil = tinggiBB + 10;
                break;
            case "01BBIM":
                hasil = diaBB * 3.14 + 14;
                break;
            case "01BBIO":
                hasil = diaBB * 3.14 + 10;
                break;
            case "01BB2M":
                hasil = 2 * (panjangBB + lebarBB) + 2 * 14;
                break;
            case "01BB2O":
                hasil = 2 * (panjangBB + lebarBB) + 2 * 10;
                break;
            case "01BBTS":
                hasil = tinggiBB + 6;
                break;
        }
    }
    return hasil;
}

function Rumus_LebarBB(bentukRumus_LebarBB, modelRumus_LebarBB) {
    let hasil = 0;

    const tinggiBB = parseFloat(body_tinggi.value ?? 0);
    const panjangBB = parseFloat(body_panjang.value ?? 0);
    const lebarBB = parseFloat(body_lebar.value ?? 0);
    const diaBB = parseFloat(body_diameter.value ?? 0);

    if (bentukRumus_LebarBB === "S") {
        switch (modelRumus_LebarBB) {
            case "01BBTM":
            case "01BBTO":
            case "01BBTS":
                hasil = panjangBB + lebarBB;
                break;
            case "01BBIM":
                hasil = tinggiBB + 12;
                break;
            case "01BBIO":
                hasil = tinggiBB + 10;
                break;
            case "01BBUO":
                hasil = panjangBB + 10;
                break;
            case "01BBUM":
                hasil = panjangBB + 14;
                break;
            case "01BB2M":
                hasil = tinggiBB + 12;
                break;
            case "01BB2O":
                hasil = tinggiBB + 10;
                break;
        }
    } else {
        switch (modelRumus_LebarBB) {
            case "01BBTM":
            case "01BBTO":
            case "01BBTS":
                hasil = (diaBB * 3.14) / 2;
                break;
            case "01BBIM":
                hasil = tinggiBB + 12;
                break;
            case "01BBIO":
                hasil = tinggiBB + 10;
                break;
            case "01BB2M":
                hasil = tinggiBB + 12;
                break;
            case "01BB2O":
                hasil = tinggiBB + 10;
                break;
        }
    }

    return hasil;
}

function Rumus_PanjangBSI(bentukRumus_PanjangBSI, modelRumus_PanjangBSI) {
    let hasil = 0;
    if (bentukRumus_PanjangBSI == "S") {
        hasil = parseFloat(body_tinggi.value ?? 0) + 14;
    }
    return hasil;
}

function Rumus_LebarBSI(bentukRumus_LebarBSI, modelRumus_LebarBSI) {
    let hasil = 0;
    if (bentukRumus_LebarBSI == "S") {
        const panjangBB = parseFloat(body_panjang.value ?? 0);
        const lebarBB = parseFloat(body_lebar.value ?? 0);

        switch (modelRumus_LebarBSI) {
            case "01BBUO":
                hasil = lebarBB + 10;
                break;
            case "01BBUM":
                hasil = panjangBB + 14;
                break;
            case "01BB4O":
                hasil = panjangBB + 10;
                break;
        }
    }
    return hasil;
}

function Rumus_PanjangBSII(bentukRumus_PanjangBSII, modelRumus_PanjangBSII) {
    let hasil = 0;
    if (bentukRumus_PanjangBSII == "S") {
        hasil = parseFloat(body_tinggi.value ?? 0) + 14;
    }
    return hasil;
}

function Rumus_LebarBSII(bentukRumus_LebarBSII, modelRumus_LebarBSII) {
    let hasil = 0;
    if (bentukRumus_LebarBSII == "S") {
        hasil = parseFloat(body_tinggi.value ?? 0) + 14;
    }
    return hasil;
}

function Rumus_PanjangTA(bentukRumus_PanjangTA, modelRumus_PanjangTA) {
    let hasil = 0;
    if (bentukRumus_PanjangTA == "S") {
        switch (modelRumus_PanjangTA.slice(-1)) {
            case "O":
                hasil = parseFloat(body_panjang.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_panjang.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_panjang.value ?? 0) + 6;
                break;
        }
    } else {
        switch (modelRumus_PanjangTA.slice(-1)) {
            case "O":
                hasil = parseFloat(body_diameter.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_diameter.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_diameter.value ?? 0) + 6;
                break;
        }
    }
    return hasil;
}

function Rumus_LebarTA(bentukRumus_LebarTA, modelRumus_LebarTA) {
    let hasil = 0;
    if (bentukRumus_LebarTA == "S") {
        switch (modelRumus_LebarTA.slice(-1)) {
            case "O":
                hasil = parseFloat(body_lebar.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_lebar.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_lebar.value ?? 0) + 6;
                break;
        }
    } else {
        switch (modelRumus_LebarTA.slice(-1)) {
            case "O":
                hasil = parseFloat(body_diameter.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_diameter.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_diameter.value ?? 0) + 6;
                break;
        }
    }
    return hasil;
}

function Rumus_PanjangTB(bentukRumus_PanjangTB, modelRumus_PanjangTB) {
    let hasil = 0;
    if (bentukRumus_PanjangTB == "S") {
        switch (modelRumus_PanjangTB.slice(-1)) {
            case "O":
                hasil = parseFloat(body_panjang.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_panjang.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_panjang.value ?? 0) + 6;
                break;
        }
    } else {
        switch (modelRumus_PanjangTB.slice(-1)) {
            case "O":
                hasil = parseFloat(body_diameter.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_diameter.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_diameter.value ?? 0) + 6;
                break;
        }
    }
    return hasil;
}

function Rumus_LebarTB(bentukRumus_LebarTB, modelRumus_LebarTB) {
    let hasil = 0;
    if (bentukRumus_LebarTB == "S") {
        switch (modelRumus_LebarTB.slice(-1)) {
            case "O":
                hasil = parseFloat(body_lebar.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_lebar.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_lebar.value ?? 0) + 6;
                break;
        }
    } else {
        switch (modelRumus_LebarTB.slice(-1)) {
            case "O":
                hasil = parseFloat(body_diameter.value ?? 0) + 10;
                break;
            case "M":
                hasil = parseFloat(body_diameter.value ?? 0) + 12;
                break;
            case "S":
                hasil = parseFloat(body_diameter.value ?? 0) + 6;
                break;
        }
    }
    return hasil;
}

function Rumus_PanjangCA(bentukRumus_PanjangCA, modelRumus_PanjangCA) {
    let hasil = 0;
    if (bentukRumus_PanjangCA === "S") {
        if (
            modelRumus_PanjangCA.trim().substring(0, 5) === "05CAD" ||
            modelRumus_PanjangCA.trim().substring(0, 5) === "05CAP" ||
            modelRumus_PanjangCA.trim().substring(0, 5) === "05CAS"
        ) {
            hasil =
                parseFloat(cerobongAtas_panjang.value ?? 0) * 2 +
                parseFloat(cerobongAtas_lebar.value ?? 0) * 2 +
                5;
        }
    } else {
        if (
            modelRumus_PanjangCA.trim().substring(0, 5) === "05CAD" ||
            modelRumus_PanjangCA.trim().substring(0, 5) === "05CAP" ||
            modelRumus_PanjangCA.trim().substring(0, 5) === "05CAS"
        ) {
            hasil = parseFloat(cerobongAtas_diameter.value ?? 0) * 3.14 + 6;
        }
    }
    return hasil;
}

function Rumus_LebarCA(bentukRumus_LebarCA, modelRumus_LebarCA) {
    let hasil = 0;
    if (
        modelRumus_LebarCA.trim().substring(0, 5) == "05CAD" ||
        modelRumus_LebarCA.trim().substring(0, 5) == "05CAS"
    ) {
        hasil = parseFloat(cerobongAtas_tinggi.value ?? 0) + 5;
    } else if (modelRumus_LebarCA.trim().substring(0, 5) == "05CAP") {
        hasil = parseFloat(cerobongAtas_tinggi.value ?? 0) + 10;
    }
    return hasil;
}

function Rumus_PanjangCB(bentukRumus_PanjangCB, modelRumus_PanjangCB) {
    let hasil = 0;
    if (modelRumus_PanjangCB === "S") {
        if (
            bentukRumus_PanjangCB.trim().substring(0, 5) === "06CBD" ||
            bentukRumus_PanjangCB.trim().substring(0, 5) === "06CBP" ||
            bentukRumus_PanjangCB.trim().substring(0, 5) === "06CBS"
        ) {
            hasil =
                parseFloat(cerobongBawah_panjang.value ?? 0) * 2 +
                parseFloat(cerobongBawah_lebar.value ?? 0) * 2 +
                5;
        }
    } else {
        if (
            bentukRumus_PanjangCB.trim().substring(0, 5) === "06CBD" ||
            bentukRumus_PanjangCB.trim().substring(0, 5) === "06CBP" ||
            bentukRumus_PanjangCB.trim().substring(0, 5) === "06CBS"
        ) {
            hasil = parseFloat(cerobongBawah_diameter.value ?? 0) * 3.14 + 6;
        }
    }
    return hasil;
}

function Rumus_LebarCB(bentukRumus_LebarCB, modelRumus_LebarCB) {
    let hasil = 0;
    if (
        modelRumus_LebarCB.trim().substring(0, 5) == "06CBD" ||
        modelRumus_LebarCB.trim().substring(0, 5) == "06CBS"
    ) {
        hasil = parseFloat(cerobongBawah_tinggi.value ?? 0) + 5;
    } else if (modelRumus_LebarCB.trim().substring(0, 5) == "06CBP") {
        hasil = parseFloat(cerobongBawah_tinggi.value ?? 0) + 10;
    }
    return hasil;
}

function bodyBesar() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        let PanjangPot = Rumus_PanjangBB(
            body_bentuk.value,
            id_body_model.value
        );
        let LebarPot = Rumus_LebarBB(body_bentuk.value, id_body_model.value);

        let Qty = 0;
        if (
            id_body_model.value == "01BB2M" ||
            id_body_model.value == "01BB2O"
        ) {
            Qty = 2;
        }

        $.ajax({
            type: "POST",
            url: "TabelHitunganJBB",
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_body_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "BodyBesar",
            },
            success: function (response) {
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error(error);
                reject(error);
            },
        });
    });
}

function BodySampingI() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        PanjangPot = Rumus_PanjangBSI(body_bentuk.value, id_body_model.value);
        LebarPot = Rumus_LebarBSI(body_bentuk.value, id_body_model.value);

        id_body_model.value = "";
        id_body_model.value = "02BS" + id_body_model.value.slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_body_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "BodySampingI",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
                reject(error);
            },
        });
    });
}

function BodySampingII() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        PanjangPot = Rumus_PanjangBSII(body_bentuk.value, id_body_model.value);
        LebarPot = Rumus_LebarBSII(body_bentuk.value, id_body_model.value);

        id_body_model.value = "";
        id_body_model.value = "02BS" + id_body_model.value.slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_body_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "BodySampingII",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
                reject(error);
            },
        });
    });
}

function TutupAtas() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        PanjangPot = Rumus_PanjangTA(body_bentuk.value, id_body_model.value);
        LebarPot = Rumus_LebarTA(body_bentuk.value, id_body_model.value);

        id_body_model.value = "";
        id_body_model.value = "03TA" + id_body_model.value.slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_body_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "TutupAtas",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
                reject(error);
            },
        });
    });
}

function TutupBawah() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        PanjangPot = Rumus_PanjangTB(body_bentuk.value, id_body_model.value);
        LebarPot = Rumus_LebarTB(body_bentuk.value, id_body_model.value);

        id_body_model.value = "";
        id_body_model.value = "04TB" + id_body_model.value.slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_body_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "TutupBawah",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
                reject(error);
            },
        });
    });
}

function CerobongAtas() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        PanjangPot = Rumus_PanjangCA(
            cerobongAtas_bentuk.value,
            id_cerobongAtas_model.value
        );
        LebarPot = Rumus_LebarCA(
            cerobongAtas_bentuk.value,
            id_cerobongAtas_model.value
        );

        id_cerobongAtas_model.value = "";
        id_cerobongAtas_model.value =
            "04TB" + id_cerobongAtas_model.value.slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_cerobongAtas_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "CerobongAtas",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
                reject(error);
            },
        });
    });
}

function CerobongBawah() {
    return new Promise((resolve, reject) => {
        SetVariabel();
        PanjangPot = Rumus_PanjangCB(
            cerobongBawah_bentuk.value,
            id_cerobongBawah_model.value
        );
        LebarPot = Rumus_LebarCB(
            cerobongBawah_bentuk.value,
            id_cerobongBawah_model.value
        );

        id_cerobongBawah_model.value = "";
        id_cerobongBawah_model.value =
            "04TB" + id_cerobongBawah_model.value.slice(-2);

        $.ajax({
            type: "POST", // or 'GET' depending on your server setup
            url: "TabelHitunganJBB", // Specify the URL of your controller
            data: {
                _token: csrfToken,
                KodeBarang: nama_barang.value,
                KodeKomponen: id_cerobongBawah_model.value,
                Panjang: PanjangPot,
                Lebar: LebarPot,
                Kounter: kounter,
                mode_insert: "CerobongBawah",
            }, // Pass the data with csrf_tokern
            success: function (response) {
                // Handle the successful response from the controller
                console.log(response);
                resolve(response);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
                reject(error);
            },
        });
    });
}

//#endregion

//#region Add Event Listener

btn_isi.addEventListener("click", function (event) {
    event.preventDefault();
    tmb = 2;
    proses = 1;
    aktif_tombol(tmb);
    cleardata();
});

btn_koreksi.addEventListener("click", function (event) {
    event.preventDefault();
    tmb = 2;
    proses = 2;
    aktif_tombol(tmb);
    cleardata();
});

btn_hapus.addEventListener("click", function (event) {
    event.preventDefault();
    if (tmb == 2) {
        //batal
        tmb = 1;
        proses = 0;
        aktif_tombol(tmb);
        cleardata();
        formEnabler(true);
    } else {
        //proses hapus
        tmb = 2;
        proses = 3;
        aktif_tombol(tmb);
        cleardata();
    }
});

btn_customer.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
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
                $(document).ready(function () {
                    const table = $("#customerTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: true,
                        ajax: {
                            url: "getDataCustomerJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Customer",
                            },
                            {
                                data: "Kode_Customer",
                            },
                        ],
                    });
                    $("#customerTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                customer.value = selectedRow.Nama_Customer.trim();
                id_customer.value = selectedRow.Kode_Customer.trim();
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
    // console.log(selectedRow);
});

btn_customer.addEventListener("focus", function () {
    console.log(proses);
    if (customer.value != "") {
        this.blur();
        if (proses == 1) {
            nama_barang.value = "O-" + id_customer.value.trim() + "-";
            nama_barang.disabled = false;
            nama_barang.focus();
        } else {
            btn_nama_barang.disabled = false;
            btn_nama_barang.focus();
        }
    }
});

btn_nama_barang.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select Barang",
            html: '<table id="barangTable" class="display" style="width:100%"><thead><tr><th>Kode Barang</th><th>Tanggal</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#barangTable")
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
                console.log(id_customer.value);
                $(document).ready(function () {
                    const table = $("#barangTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: true,
                        ajax: {
                            url: "getDataNamaBarangJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                id_customer: id_customer.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "kode_barang",
                            },
                            {
                                data: "tanggal",
                                render: function (data, type, row) {
                                    let parts = data.split(" ")[0].split("-");
                                    let time = data.split(" ")[1].split(".");
                                    // console.log(parts);

                                    let tgl =
                                        parts[2] +
                                        "-" +
                                        parts[1] +
                                        "-" +
                                        parts[0];
                                    return tgl;
                                },
                            },
                        ],
                    });
                    $("#barangTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            const selectedRow = result.value;
            nama_barang.value = "";
            tanggal.valueAsDate = new Date();
            if (selectedRow) {
                nama_barang.value = selectedRow.kode_barang.trim();
                let formattedDate = selectedRow.tanggal.trim().split(" ")[0];
                tanggal.value = formattedDate;

                if (nama_barang.value != "") {
                    loadDataKoreksi(nama_barang.value, customer.value);
                }
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

nama_barang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        this.value = this.value.toUpperCase();
        tanggal.disabled = false;
        tanggal.focus();
    }
});

tanggal.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        body_bentuk.disabled = false;
        body_bentuk.focus();
    }
});

body_bentuk.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (body_bentuk && body_bentuk.value.trim() !== "") {
            body_bentuk.value = body_bentuk.value.toUpperCase();
            if (body_bentuk.value == "C" || body_bentuk.value == "S") {
                if (proses == 1) {
                    body_panjang.value = 0;
                    body_lebar.value = 0;
                    body_diameter.value = 0;
                    body_diameter.value = 0;
                    body_tinggi.value = 0;
                }
                if (body_bentuk.value == "S") {
                    body_diameter.disabled = true;
                    body_lebar.disabled = true;
                    body_tinggi.disabled = true;
                    body_panjang.disabled = false;
                    body_panjang.focus();
                } else {
                    body_panjang.disabled = true;
                    body_tinggi.disabled = true;
                    body_lebar.disabled = true;
                    body_diameter.disabled = false;
                    body_diameter.focus();
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Bentuk Body Besar Harus [C]ircular / [S]quare!",
                });
                body_bentuk.value = "";
                body_bentuk.focus();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Bentuk Body Besar Harus [C]ircular / [S]quare!",
            });
        }
    }
});

body_panjang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        body_lebar.disabled = false;
        body_lebar.focus();
    }
});

body_diameter.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        body_tinggi.disabled = false;
        body_tinggi.focus();
    }
});

body_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        body_tinggi.disabled = false;
        body_tinggi.focus();
    }
});

body_tinggi.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        btn_body_model.disabled = false;
        btn_body_model.focus();
    }
});

btn_body_model.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Body Model",
            html: '<table id="ModelTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#ModelTable")
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
                $(document).ready(function () {
                    const table = $("#ModelTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "getDataModelBodyJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                body_bentuk: body_bentuk.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Model",
                            },
                            {
                                data: "Kode_Model",
                            },
                        ],
                    });
                    $("#ModelTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                body_model.value = selectedRow.Nama_Model.trim();
                // console.log(id_body_model.value, selectedRow.Kode_Model);
                id_body_model.value = selectedRow.Kode_Model.trim();
                // if (proses == 1) {
                //     nama_barang.value = "O-" + id_Model.value.trim() + "-";
                //     nama_barang.disabled = false;
                //     nama_barang.focus();
                // } else {
                //     btn_nama_barang.disabled = false;
                //     btn_nama_barang.focus();
                // }
                cerobongAtas_bentuk.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_body_model.addEventListener("focus", function () {
    if (body_model.value != "" && id_body_model.value != "") {
        btn_body_model.blur();
        cerobongAtas_bentuk.focus();
    }
});

cerobongAtas_bentuk.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (cerobongAtas_bentuk && cerobongAtas_bentuk.value.trim() !== "") {
            cerobongAtas_bentuk.value = cerobongAtas_bentuk.value.toUpperCase();
            if (
                cerobongAtas_bentuk.value == "C" ||
                cerobongAtas_bentuk.value == "S"
            ) {
                if (proses == 1) {
                    cerobongAtas_panjang.value = 0;
                    cerobongAtas_lebar.value = 0;
                    cerobongAtas_diameter.value = 0;
                    cerobongAtas_diameter.value = 0;
                    cerobongAtas_tinggi.value = 0;
                }
                if (cerobongAtas_bentuk.value == "S") {
                    cerobongAtas_lebar.disabled = true;
                    cerobongAtas_tinggi.disabled = true;
                    cerobongAtas_diameter.disabled = true;
                    cerobongAtas_panjang.disabled = false;
                    cerobongAtas_panjang.focus();
                } else {
                    cerobongAtas_lebar.disabled = true;
                    cerobongAtas_tinggi.disabled = true;
                    cerobongAtas_panjang.disabled = true;
                    cerobongAtas_diameter.disabled = false;
                    cerobongAtas_diameter.focus();
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
                });
                cerobongAtas_bentuk.value = "";
                cerobongAtas_bentuk.focus();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
            });
        }
    }
});

cerobongAtas_panjang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        cerobongAtas_lebar.disabled = false;
        cerobongAtas_lebar.focus();
    }
});

cerobongAtas_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        cerobongAtas_tinggi.disabled = false;
        cerobongAtas_tinggi.focus();
    }
});

cerobongAtas_diameter.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        cerobongAtas_tinggi.disabled = false;
        cerobongAtas_tinggi.focus();
    }
});

cerobongAtas_tinggi.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        btn_cerobongAtas_model.disabled = false;
        btn_cerobongAtas_model.focus();
    }
});

btn_cerobongAtas_model.addEventListener("click", async function (e) {
    //harusnya beda dengan body_bentuk
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Cerobong Atas Model",
            html: '<table id="ModelTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#ModelTable")
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
                $(document).ready(function () {
                    const table = $("#ModelTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "getDataModelCerobongAtasJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                cerobongAtas_bentuk: cerobongAtas_bentuk.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Model",
                            },
                            {
                                data: "Kode_Model",
                            },
                        ],
                    });
                    $("#ModelTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                cerobongAtas_model.value = selectedRow.Nama_Model.trim();
                // console.log(id_cerobongAtas_model.value, selectedRow.Kode_Model);
                id_cerobongAtas_model.value = selectedRow.Kode_Model.trim();
                // if (proses == 1) {
                //     nama_barang.value = "O-" + id_Model.value.trim() + "-";
                //     nama_barang.disabled = false;
                //     nama_barang.focus();
                // } else {
                //     btn_nama_barang.disabled = false;
                //     btn_nama_barang.focus();
                // }
                cerobongBawah_bentuk.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_cerobongAtas_model.addEventListener("focus", function () {
    if (cerobongAtas_model.value != "" && id_cerobongAtas_model.value != "") {
        btn_cerobongAtas_model.blur();
        cerobongBawah_bentuk.focus();
    }
});

cerobongBawah_bentuk.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (cerobongBawah_bentuk && cerobongBawah_bentuk.value.trim() !== "") {
            cerobongBawah_bentuk.value =
                cerobongBawah_bentuk.value.toUpperCase();
            if (
                cerobongBawah_bentuk.value == "C" ||
                cerobongBawah_bentuk.value == "S"
            ) {
                if (proses == 1) {
                    cerobongBawah_panjang.value = 0;
                    cerobongBawah_lebar.value = 0;
                    cerobongBawah_diameter.value = 0;
                    cerobongBawah_diameter.value = 0;
                    cerobongBawah_tinggi.value = 0;
                }
                if (cerobongBawah_bentuk.value == "S") {
                    cerobongBawah_lebar.disabled = true;
                    cerobongBawah_tinggi.disabled = true;
                    cerobongBawah_diameter.disabled = true;
                    cerobongBawah_panjang.disabled = false;
                    cerobongBawah_panjang.focus();
                } else {
                    cerobongBawah_lebar.disabled = true;
                    cerobongBawah_tinggi.disabled = true;
                    cerobongBawah_panjang.disabled = true;
                    cerobongBawah_diameter.disabled = false;
                    cerobongBawah_diameter.focus();
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
                });
                cerobongBawah_bentuk.value = "";
                cerobongBawah_bentuk.focus();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
            });
        }
    }
});

cerobongBawah_panjang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        cerobongBawah_lebar.disabled = false;
        cerobongBawah_lebar.focus();
    }
});

cerobongBawah_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        cerobongBawah_tinggi.disabled = false;
        cerobongBawah_tinggi.focus();
    }
});

cerobongBawah_diameter.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        cerobongBawah_tinggi.disabled = false;
        cerobongBawah_tinggi.focus();
    }
});

cerobongBawah_tinggi.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        } else {
            this.value = parseFloat(this.value);
        }
        btn_cerobongBawah_model.disabled = false;
        btn_cerobongBawah_model.focus();
    }
});

btn_cerobongBawah_model.addEventListener("click", async function (e) {
    //harusnya beda dengan body_bentuk
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Cerobong Bawah Model",
            html: '<table id="ModelTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#ModelTable")
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
                $(document).ready(function () {
                    const table = $("#ModelTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "getDataModelCerobongBawahJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                cerobongBawah_bentuk:
                                    cerobongBawah_bentuk.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Model",
                            },
                            {
                                data: "Kode_Model",
                            },
                        ],
                    });
                    $("#ModelTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                cerobongBawah_model.value = selectedRow.Nama_Model.trim();
                // console.log(id_cerobongBawah_model.value, selectedRow.Kode_Model);
                id_cerobongBawah_model.value = selectedRow.Kode_Model.trim();
                // if (proses == 1) {
                //     nama_barang.value = "O-" + id_Model.value.trim() + "-";
                //     nama_barang.disabled = false;
                //     nama_barang.focus();
                // } else {
                //     btn_nama_barang.disabled = false;
                //     btn_nama_barang.focus();
                // }
                reinforced_lebar.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_cerobongBawah_model.addEventListener("focus", function () {
    if (cerobongBawah_model.value != "" && id_cerobongBawah_model.value != "") {
        btn_cerobongBawah_model.blur();
        reinforced_lebar.focus();
    }
});

reinforced_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (proses == 2) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Anda telah merubah nilai Reinforced! Koreksi lagi semua Komponen yang sudah ada!",
            });
        }
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_jumlah.disabled = false;
        reinforced_jumlah.focus();
    }
});

reinforced_jumlah.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_jarak.disabled = false;
        reinforced_jarak.focus();
    }
});

reinforced_jarak.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_beltrope.disabled = false;
        reinforced_beltrope.focus();
    }
});

reinforced_beltrope.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = "N";
        } else {
            this.value = this.value.toUpperCase();
        }
        if (this.value == "N" || this.value == "R") {
            reinforced_warnaBelt.value = "";
            reinforced_keterangan.value = reinforced_keterangan.value.replace(
                "Warna Belt : " + warna.trim(),
                ""
            );
            warna = "";
            reinforced_warnaBelt.value = "";
            btn_reinforced_warnaBelt.disabled = true;
            reinforced_loop.disabled = false;
            reinforced_loop.focus();
        } else if (this.value == "B") {
            btn_reinforced_warnaBelt.disabled = false;
            btn_reinforced_warnaBelt.focus();
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Harus [B]elt/[R]ope/[N]o Belt,Rope !",
            });
            this.value = "";
        }
    }
});

btn_reinforced_warnaBelt.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Warna",
            html: '<table id="WarnaTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#WarnaTable")
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
                $(document).ready(function () {
                    const table = $("#WarnaTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "getDataWarnaBeltReinforcedJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Warna",
                            },
                            {
                                data: "Kode_Warna",
                            },
                        ],
                    });
                    $("#WarnaTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                reinforced_warnaBelt.value = selectedRow.Nama_Warna.trim();
                id_reinforced_warnaBelt.value = selectedRow.Kode_Warna.trim();
                if (warna.trim() == "") {
                    reinforced_keterangan.value +=
                        "Warna Belt : " + reinforced_warnaBelt.value.trim();
                } else {
                    if (
                        reinforced_keterangan.value.indexOf(
                            "Warna Belt : " + warna.trim()
                        ) !== -1
                    ) {
                        reinforced_keterangan.value =
                            reinforced_keterangan.value.replace(
                                "Warna Belt : " + warna.trim(),
                                "Warna Belt : " + reinforced_warnaBelt.value
                            );
                    } else {
                        reinforced_keterangan.value +=
                            "Warna Belt : " + reinforced_warnaBelt.value;
                    }
                }
                warna = reinforced_warnaBelt.value;
                reinforced_loop.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_reinforced_warnaBelt.addEventListener("focus", function () {
    if (
        reinforced_warnaBelt.value != "" &&
        id_reinforced_warnaBelt.value != ""
    ) {
        btn_reinforced_warnaBelt.blur();
        reinforced_loop.focus();
    }
});

reinforced_loop.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_tinggiloop.disabled = false;
        reinforced_tinggiloop.focus();
    }
});

reinforced_tinggiloop.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_SWL.disabled = false;
        reinforced_SWL.focus();
    }
});

reinforced_SWL.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_SF1.disabled = false;
        reinforced_SF1.focus();
    }
});

reinforced_SF1.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_SF2.disabled = false;
        reinforced_SF2.focus();
    }
});

reinforced_SF2.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value == "") {
            this.value = 0;
        }
        reinforced_stdwaktu.disabled = false;
        reinforced_stdwaktu.focus();
    }
});

reinforced_stdwaktu.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        if (this.value === "") {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Isi dulu standar waktunya!",
            });
        } else if (parseFloat(this.value) > 0) {
            if (standarwaktu.trim() === "") {
                reinforced_keterangan.value =
                    "Std = " + this.value + "'\n" + reinforced_keterangan.value;
            } else {
                if (
                    reinforced_keterangan.value.indexOf(
                        "Std = " + standarwaktu.trim()
                    ) !== -1
                ) {
                    reinforced_keterangan.value =
                        reinforced_keterangan.value.replace(
                            "Std = " + standarwaktu.trim(),
                            "Std = " + this.value
                        );
                } else {
                    reinforced_keterangan.value =
                        "Std = " +
                        this.value +
                        "'\n" +
                        reinforced_keterangan.value;
                }
            }
            reinforced_keterangan.disabled = false;
            reinforced_printing.disabled = false;
            reinforced_printing.focus();
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Standar Waktu HARUS lebih besar dari 0!",
            });
            this.value = "";
        }
        standarwaktu = this.value;
    }
});

reinforced_printing.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value != "") {
            this.value = this.value.trim().toUpperCase();
        } else {
            this.value = "N";
        }

        if (this.value == "Y" || this.value == "N") {
            btn_reinforced_lami.disabled = false;
            btn_reinforced_lami.focus();
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Ketik [Y] jika diprinting atau [N] jika tidak diprinting!",
            });
            this.value = "";
        }
    }
});

btn_reinforced_lami.addEventListener("click", async function (e) {
    e.preventDefault();
    jenis_barang.disabled = true;
    reinforced_tebal.disabled = true;
    reinforced_tebal.value = "";
    reinforced_warna.value = "";
    reinforced_lami.value = "";
    reinforced_inner.disabled = true;
    reinforced_inner.value = "";
    reinforced_seal.checked = false;
    this.focus();
    try {
        const result = await Swal.fire({
            title: "Select a Lami",
            html: '<table id="LamiTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#LamiTable")
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
                $(document).ready(function () {
                    const table = $("#LamiTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: false,
                        ajax: {
                            url: "getDataLamiReinforcedJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Lami",
                            },
                            {
                                data: "Kode_Lami",
                            },
                        ],
                    });
                    $("#LamiTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                reinforced_lami.value = selectedRow.Nama_Lami.trim();
                id_reinforced_lami.value = selectedRow.Kode_Lami.trim();
                jenis_barang.disabled = false;

                if (reinforced_lami.value.trim() == "No Lami") {
                    btn_reinforced_warna.disabled = false;
                    btn_reinforced_warna.focus();
                } else {
                    reinforced_tebal.disabled = false;
                    reinforced_tebal.focus();
                }
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_reinforced_lami.addEventListener("focus", function (e) {
    if (reinforced_lami.value != "") {
        this.blur();
        // console.log(
        //     reinforced_lami.value.trim() === "No Lami",
        //     reinforced_lami.value.trim(),
        //     reinforced_lami.value,
        //     reinforced_lami.value.trim().toUpperCase() === "NO LAMI"
        // );
        if (reinforced_lami.value.trim() == "No Lami") {
            btn_reinforced_warna.disabled = false;
            btn_reinforced_warna.focus();
            console.log("masuk no lami");
        } else {
            reinforced_tebal.disabled = false;
            reinforced_tebal.focus();
            console.log("masuk else");
        }
    }
});

btn_reinforced_warna.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Warna",
            html: '<table id="WarnaTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#WarnaTable")
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
                $(document).ready(function () {
                    const table = $("#WarnaTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "getDataWarnaBeltReinforcedJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Warna",
                            },
                            {
                                data: "Kode_Warna",
                            },
                        ],
                    });
                    $("#WarnaTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                reinforced_warna.value = selectedRow.Nama_Warna.trim();
                id_reinforced_warna.value = selectedRow.Kode_Warna.trim();
                reinforced_inner.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_reinforced_warna.addEventListener("focus", function () {
    if (reinforced_warna.value != "" && id_reinforced_warna.value != "") {
        btn_reinforced_warna.blur();
        reinforced_inner.disabled = false;
        reinforced_inner.focus();
    }
});

reinforced_tebal.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        if (this.value.trim() == "") {
            this.value = 0;
        } else {
            if (!isNaN(this.value)) {
                btn_reinforced_warna.disabled = false;
                btn_reinforced_warna.focus();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Harus Diisi Angka!",
                });
                this.value = "";
            }
        }
    }
});

reinforced_inner.addEventListener("keypress", function (e) {
    if (this.value > 0) {
        reinforced_seal.disabled = false;
    } else {
        reinforced_seal.disabled = true;
    }
    if (e.key == "Enter") {
        if (this.value.trim() == "") {
            this.value = 0;
        }
        if (this.value > 0) {
            reinforced_seal.focus();
        } else {
            reinforced_keterangan.disabled = false;
            reinforced_keterangan.focus();
        }
    }
});

btn_proses.addEventListener("click", async function (e) {
    if (proses == 1) {
        tambah_komponen.disabled == false;
        koreksi_komponen.disabled == false;
        hapus_komponen.disabled == false;
        await insertMasterDanKodeBarang();
        // insertKodeBarang();

        //Pengecekan untuk function Body
        if (id_body_model.value !== "01BB4O") {
            kounter = 1;
            await bodyBesar();
        }
        if (
            id_body_model.value == "01BBUO" ||
            id_body_model.value == "01BB4O" ||
            id_body_model.value == "01BBUM"
        ) {
            statusBS = True;
            kounter = 1;
            await BodySampingI();
        }
        if (id_body_model.value == "01BB4O") {
            if (statusBS == True) {
                statusBS = False;
                kounter = 2;
            } else {
                kounter = 1;
            }
            await BodySampingII();
        }

        //Pengecekan untuk Function Tutup Atas
        if (
            id_cerobongAtas_model.value.substring(0, 5) !== "05CAD" &&
            id_cerobongAtas_model.value !== "05CAOX" &&
            id_cerobongAtas_model.value !== "05CA1X" &&
            id_cerobongAtas_model.value !== "05CA2X" &&
            id_cerobongAtas_model.value !== "05CA3X" &&
            id_cerobongAtas_model.value !== "05CA4X"
        ) {
            kounter = 1;
            await TutupAtas();
        }

        //Pengecekan untuk Function Tutup Bawah
        if (
            id_cerobongBawah_model.value.substring(0, 5) !== "06CBD" &&
            id_cerobongBawah_model.value !== "06CBOX" &&
            id_cerobongBawah_model.value !== "06CB1X" &&
            id_cerobongBawah_model.value !== "06CB2X" &&
            id_cerobongBawah_model.value !== "06CB3X" &&
            id_cerobongBawah_model.value !== "06CB4X" &&
            id_body_model.value !== "01BBUO" &&
            id_body_model.value !== "01BBUM"
        ) {
            kounter = 1;
            await TutupBawah();
        }

        //Pengecekan untuk Function Cerobong Atas
        if (
            id_cerobongAtas_model.value.substring(0, 5) === "05CAP" ||
            id_cerobongAtas_model.value.substring(0, 5) === "05CAD" ||
            (id_cerobongAtas_model.value === "05CASO" &&
                id_cerobongAtas_model.value !== "05CA1X" &&
                id_cerobongAtas_model.value !== "05CA2X" &&
                id_cerobongAtas_model.value !== "05CA3X" &&
                id_cerobongAtas_model.value !== "05CA4X")
        ) {
            kounter = 1;
            await CerobongAtas();
        }

        //Pengecekan untuk Function Cerobong Bawah
        if (
            id_cerobongBawah_model.value.substring(0, 5) === "06CBD" ||
            (id_cerobongBawah_model.value === "06CBSO" &&
                id_cerobongBawah_model.value !== "06CBST" &&
                id_cerobongBawah_model.value !== "06CBCX") ||
            id_cerobongBawah_model.value.substring(0, 5) === "06CBP"
        ) {
            kounter = 1;
            await CerobongBawah();
        }

        nama_barang.disabled == true;
    } else if (proses == 2) {
        await updateDataHead();
    } else if (proses == 3) {
        await deleteDataTableHitungan();
    }

    if (proses != 3) {
        await loadDataKoreksi(nama_barang.value, customer.value);
    }

    if (proses !== 1) {
        this.disabled = true;
    } else if (proses == 1) {
        proses = 2;
    }
});

//#endregion
