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
let KompVarReinf;
let KompVarKdBrg;
let KompVarJmlreinf;
let KompVarIdmodelBB;
let KompVarIdModelCA;
let KompVarBentukCA;
let KompVarIdModelCB;
let KompVarBentukCB;
let KompVarKomponen;
let KompVarPanjangCA;
let KompVarLebarCA;
let KompVarTinggiCA;
let KompVarPanjangCB;
let KompVarLebarCB;
let KompVarTinggiCB;
let KompVarBentukBB;
let KompVarPanjangBB;
let KompVarLebarBB;
let KompVarDiameterCB;
let KompVarDiameterBB;
let KompVarDiameterCA;
let KompVarTinggiBB;
let KompVarTebalInner;
let KompVarStatusBelt = false;
let karakterIdBodyModel;
let tampilSwalFireUntukInsertMasterDanKdBrg = 0;
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
        $.ajax({
            type: "GET", // or 'POST' depending on your server setup
            url: "/GetDataKoreksiJBB/" + kode_barang + "/" + nama_customer, // Specify the URL of your controller
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
                if (tampilSwalFireUntukInsertMasterDanKdBrg) {
                    Swal.fire({
                        icon: "info",
                        title: "Pemberitahuan",
                        text:
                            "Head Data Tabel Hitungan Kode : " +
                            nama_barang.value +
                            " sudah disimpan !",
                    });
                    tampilSwalFireUntukInsertMasterDanKdBrg = 0;
                }
            }, // Pass the data with csrf_tokern
            success: function (datas) {
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
                reinforced_jumlah.value = datas[1][0]["JmlRein"] ?? 0;
                reinforced_jarak.value = datas[1][0]["jarakrein"] ?? 0;
                reinforced_beltrope.value = datas[1][0]["Belt_Rope"];
                reinforced_warna.value = datas[1][0]["Warna"];
                reinforced_loop.value = datas[1][0]["Jumlah_Loop"];
                reinforced_tinggiloop.value = datas[1][0]["Tinggi_Loop"];
                reinforced_SWL.value = datas[1][0]["SWL"];
                reinforced_SF1.value = datas[1][0]["SF1"];
                reinforced_SF2.value = datas[1][0]["SF2"];
                reinforced_stdwaktu.value = datas[1][0]["Std_Waktu"] ?? 0;
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
                resolve(); // Resolve the promise when the request is successful
            },
            error: function (xhr, status, error) {
                console.error(error); // Handle errors
                reject(error); // Reject the promise if an error occurs
            },
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
                    tampilSwalFireUntukInsertMasterDanKdBrg = 1;
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
            url: "TabelHitunganJBB/" + HeadUpdate, // Specify the URL of your controller
            data: {
                _token: csrfToken,
                nama_barang: nama_barang.value,
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
        switch (modelRumus_PanjangBB) {
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
        karakterIdBodyModel = id_body_model.value.slice(-2);
        id_body_model.value = "";
        id_body_model.value = "02BS" + karakterIdBodyModel;

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
        karakterIdBodyModel = id_body_model.value.slice(-2);
        id_body_model.value = "";
        id_body_model.value = "02BS" + karakterIdBodyModel;

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

        karakterIdBodyModel = id_body_model.value.slice(-2);
        id_body_model.value = "";
        id_body_model.value = "03TA" + karakterIdBodyModel;

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

        karakterIdBodyModel = id_body_model.value.slice(-2);
        id_body_model.value = "";
        id_body_model.value = "04TB" + karakterIdBodyModel;

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
            "05CA" + id_cerobongAtas_model.value.slice(-2);

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
            "06CB" + id_cerobongBawah_model.value.slice(-2);

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

function setKompVar() {
    KompVarBentukBB = body_bentuk.value;
    KompVarBentukCA = cerobongAtas_bentuk.value;
    KompVarBentukCB = cerobongBawah_bentuk.value;
    KompVarDiameterBB = body_diameter.value;
    KompVarDiameterCA = cerobongAtas_diameter.value;
    KompVarDiameterCB = cerobongBawah_diameter.value;
    KompVarIdmodelBB = id_body_model.value;
    KompVarIdModelCA = id_cerobongAtas_model.value;
    KompVarIdModelCB = id_cerobongBawah_model.value;
    KompVarJmlreinf = reinforced_jumlah.value;
    KompVarKdBrg = nama_barang.value;
    KompVarLebarBB = body_lebar.value;
    KompVarLebarCA = cerobongAtas_lebar.value;
    KompVarLebarCB = cerobongAtas_lebar.value;
    KompVarPanjangBB = body_panjang.value;
    KompVarPanjangCA = cerobongAtas_panjang.value;
    KompVarPanjangCB = cerobongBawah_panjang.value;
    KompVarReinf = reinforced_lebar.value;
    KompVarTebalInner = reinforced_inner.value;
    KompVarTinggiBB = body_tinggi.value;
    KompVarTinggiCA = cerobongAtas_tinggi.value;
    KompVarTinggiCB = cerobongBawah_tinggi.value;
}

function pilihTypeFormKomposisi(
    selectedDataKode_Komponen,
    selectedDataNama_Komponen
) {
    let typeForm = "";
    if (selectedDataKode_Komponen.includes("01BB")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("02BS")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("03TA")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("04TB")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("05CA")) {
        if (cerobongAtas_bentuk.value == "C") {
            typeForm = "Form Komponen Circular";
        } else if (cerobongAtas_bentuk.value == "S") {
            typeForm = "Form Komponen Square";
        }
    } else if (selectedDataKode_Komponen.includes("06CB")) {
        if (cerobongAtas_bentuk.value == "C") {
            typeForm = "Form Komponen Circular";
        } else if (cerobongAtas_bentuk.value == "S") {
            typeForm = "Form Komponen Square";
        }
    } else if (selectedDataKode_Komponen.includes("07HR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("07RR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("08HB")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = false;
    } else if (selectedDataKode_Komponen.includes("09RB")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = false;
    } else if (selectedDataKode_Komponen.includes("10RC")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("11CR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("11RR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("12DR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("12RR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("13RR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("14TR")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("15ST")) {
        typeForm = "Form Komponen Selang";
    } else if (selectedDataKode_Komponen.includes("16PP")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = true;
    } else if (selectedDataKode_Komponen.includes("16PH")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = true;
    } else if (selectedDataKode_Komponen.includes("16PC")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = true;
    } else if (selectedDataKode_Komponen.includes("16TT")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = true;
    } else if (selectedDataKode_Komponen.includes("16RP")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = true;
    } else if (selectedDataKode_Komponen.includes("16ST")) {
        typeForm = "Form Block";
    } else if (selectedDataKode_Komponen.includes("17CR")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("17CV")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("18LM")) {
        typeForm = "Form Komponen Lami";
    } else if (selectedDataKode_Komponen.includes("19IL")) {
        typeForm = "Form Komponen Inner";
    } else if (selectedDataKode_Komponen.includes("20PO")) {
        typeForm = "Form Komponen Pocket";
    } else if (selectedDataKode_Komponen.includes("21EV")) {
        typeForm = "Form Komponen Eva";
    } else if (selectedDataKode_Komponen.includes("22BJ")) {
        typeForm = "Form Komponen Benang";
    } else if (selectedDataKode_Komponen.includes("23OJ")) {
        typeForm = "Form Komponen Ongkos";
    } else if (selectedDataKode_Komponen.includes("24PA")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("25OB")) {
        typeForm = "Form Komponen Ongkos";
    } else if (selectedDataKode_Komponen.includes("26SB")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = false;
    } else if (selectedDataKode_Komponen.includes("27FP")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("28AB")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = false;
    } else if (selectedDataKode_Komponen.includes("28AR")) {
        typeForm = "Form Komponen Rope";
    } else if (selectedDataKode_Komponen.includes("29RB")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = false;
    } else if (selectedDataKode_Komponen.includes("30BD")) {
        typeForm = "Form Komponen Dust";
    } else if (selectedDataKode_Komponen.includes("31MT")) {
        typeForm = "Form Komponen Belt";
        KompVarStatusBelt = true;
    } else if (selectedDataKode_Komponen.includes("32KG")) {
        typeForm = "Form Komponen General";
    } else if (selectedDataKode_Komponen.includes("33KT")) {
        typeForm = "Form Komponen Katun";
    } else if (selectedDataKode_Komponen.includes("34BA")) {
        typeForm = "Form Komponen Dust";
    } else if (selectedDataKode_Komponen.includes("35KR")) {
        typeForm = "Form Komponen Kertas";
    } else if (selectedDataKode_Komponen.includes("36KK")) {
        typeForm = "Form Komponen Kain";
    } else if (selectedDataKode_Komponen.includes("37KW")) {
        typeForm = "Form Komponen Kain";
    } else if (selectedDataKode_Komponen.includes("38BK")) {
        typeForm = "Form Komponen Benang Katun";
    } else if (selectedDataKode_Komponen.includes("39KA")) {
        typeForm = "Form Komponen Karet";
    } else if (selectedDataKode_Komponen.includes("40CC")) {
        typeForm = "Form Komponen Carbon";
    }
    tampilFormKomposisi(
        typeForm,
        selectedDataKode_Komponen,
        selectedDataNama_Komponen
    );
}

function tampilFormKomposisi(typeForm, Kode_Komponen, Nama_Komponen) {
    let htmlForm = "";
    if (typeForm == "Form Komponen General") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" placeholder="Kode Komponen" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenGeneral">Panjang</label>
                                    <input id="panjangKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenGeneral">Lebar</label>
                                    <input id="lebarKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="warpKomponenGeneral">Warp</label>
                                    <input id="warpKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="weftKomponenGeneral">Weft</label>
                                    <input id="weftKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denier_warpKomponenGeneral">Denier Warp</label>
                                    <input id="denier_warpKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denier_weftKomponenGeneral">Denier Weft</label>
                                    <input id="denier_weftKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denierKomponenGeneral">Denier</label>
                                    <input id="denierKomponenGeneral" class="input" readonly>
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenGeneral">Quantity</label>
                                    <input id="quantityKomponenGeneral" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="berat_warpKomponenGeneral">Berat Warp</label>
                                    <input id="berat_warpKomponenGeneral" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="berat_weftKomponenGeneral">Berat Weft</label>
                                    <input id="berat_weftKomponenGeneral" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratKomponenGeneral">Berat</label>
                                    <input id="beratKomponenGeneral" class="input">
                                </div>
                                <input type="hidden" id="kounterKomponenGeneral" class="input">
                                <input type="hidden" id="hargaKomponenGeneral" class="input">
                                <input type="hidden" id="subtotalKomponenGeneral" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Circular") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenCircular">Panjang</label>
                                    <input id="panjangKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenCircular">Lebar</label>
                                    <input id="lebarKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="warpKomponenCircular">Warp</label>
                                    <input id="warpKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="weftKomponenCircular">Weft</label>
                                    <input id="weftKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denier_warpKomponenCircular">Denier Warp</label>
                                    <input id="denier_warpKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denier_weftKomponenCircular">Denier Weft</label>
                                    <input id="denier_weftKomponenCircular" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denierKomponenCircular">Denier</label>
                                    <input id="denierKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenCircular">Quantity</label>
                                    <input id="quantityKomponenCircular" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="berat_warpKomponenCircular">Berat Warp</label>
                                    <input id="berat_warpKomponenCircular" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="berat_weftKomponenCircular">Berat Weft</label>
                                    <input id="berat_weftKomponenCircular" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratKomponenCircular">Berat</label>
                                    <input id="beratKomponenCircular" class="input">
                                </div>
                                    <input type="hidden" id="kounterKomponenCircular" class="input">
                                    <input type="hidden" id="hargaKomponenCircular" class="input">
                                    <input type="hidden" id="subtotalKomponenCircular" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Square") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenSquare">Panjang</label>
                                    <input id="panjangKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenSquare">Lebar</label>
                                    <input id="lebarKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="warpKomponenSquare">Warp</label>
                                    <input id="warpKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="weftKomponenSquare">Weft</label>
                                    <input id="weftKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denier_warpKomponenSquare">Denier Warp</label>
                                    <input id="denier_warpKomponenSquare" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denier_weftKomponenSquare">Denier Weft</label>
                                    <input id="denier_weftKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denierKomponenSquare">Denier</label>
                                    <input id="denierKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenSquare">Quantity</label>
                                    <input id="quantityKomponenSquare" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratKomponenSquare">Berat</label>
                                    <input id="beratKomponenSquare" class="input">
                                </div>
                                <input type="hidden" id="kounterKomponenSquare" class="input">
                                <input type="hidden" id="hargaKomponenSquare" class="input">
                                <input type="hidden" id="subtotalKomponenSquare" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Rope") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenRope">Panjang</label>
                                    <input id="panjangKomponenRope" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="diameterKomponenRope">Diameter</label>
                                    <select class="input" id="diameterKomponenRope">
                                        <option selected disabled>-- Pilih Diameter --</option>
                                    </select>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenRope">Quantity</label>
                                    <input id="quantityKomponenRope" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratPerMeterKomponenRope">Berat Per Meter</label>
                                    <input id="beratPerMeterKomponenRope" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenRope">Total Berat</label>
                                    <input id="totalBeratKomponenRope" class="input" readonly>
                                </div>
                                    <input type="hidden" id="kounterKomponenRope" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Belt") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenBelt">Panjang</label>
                                    <div style="width: 100%">
                                        <input id="panjangKomponenBelt" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenBelt">Lebar</label>
                                    <select class="input" id="lebarKomponenBelt">
                                        <option selected disabled>-- Pilih Lebar --</option>
                                    </select>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenBelt">Quantity</label>
                                    <input id="quantityKomponenBelt" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratPerMeterKomponenBelt">Berat Per Meter</label>
                                    <input id="beratPerMeterKomponenBelt" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenBelt">Total Berat</label>
                                    <input id="totalBeratKomponenBelt" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="denierKomponenBelt">Denier</label>
                                    <input id="denierKomponenBelt" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenBelt" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Selang") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenSelang">Panjang</label>
                                    <input id="panjangKomponenSelang" class="input" style="width: 90%">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="diameterKomponenSelang">Diameter</label>
                                    <div style="width: 100%">
                                        <input id="diameterKomponenSelang" class="input" style="width:80%">MM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenSelang">Quantity</label>
                                    <input id="quantityKomponenSelang" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratPer5cmKomponenSelang">Berat Per 5 cm</label>
                                    <input id="beratPer5cmKomponenSelang" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenSelang">Total Berat</label>
                                    <input id="totalBeratKomponenSelang" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenSelang" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Block") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratBlock">Berat</label>
                                    <div style="width: 100%">
                                        <input id="beratBlock" class="input">gram/pc
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratBlock">Total Berat</label>
                                    <input id="totalBeratBlock" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityBlock">Quantity</label>
                                    <input id="quantityBlock" class="input">
                                </div>
                                <input type="hidden" id="kounterBlock" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Lami") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <table id="tableKomponenLami" style="width:100%">
                            <thead style="white-space:nowrap">
                                <tr>
                                    <th>Komponen</th>
                                    <th>Nama Komponen</th>
                                    <th>Panjang</th>
                                    <th>Lebar</th>
                                    <th>Quantity</th>
                                    <th>Tebal</th>
                                    <th>Berat</th>
                                </tr>
                            </thead>
                        </table>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <input type="hidden" id="kounterKomponenLami" class="input">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenLami">Total Berat</label>
                                    <input id="totalBeratKomponenLami" class="input">
                                </div>
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Inner") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="tebalInnerKomponenInner">Tebal Inner</label>
                            <input id="tebalInnerKomponenInner" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenInner">Lebar</label>
                                    <input id="lebarKomponenInner" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenInner">Panjang</label>
                                    <input id="panjangKomponenInner" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenInner">Quantity</label>
                                    <input id="quantityKomponenInner" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenInner">Total Berat</label>
                                    <input id="totalBeratKomponenInner" class="input">
                                </div>
                                <input type="hidden" id="kounterKomponenInner" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Pocket") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenPocket">Panjang</label>
                                    <input id="panjangKomponenPocket" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenPocket">Lebar</label>
                                    <input id="lebarKomponenPocket" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenPocket">Quantity</label>
                                    <input id="quantityKomponenPocket" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="hargaPerMeterKomponenPocket">Harga/Meter</label>
                                    <input id="hargaPerMeterKomponenPocket" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalHargaKomponenPocket">Total Harga</label>
                                    <input id="totalHargaKomponenPocket" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenPocket" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Eva") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenEva">Panjang</label>
                                    <input id="panjangKomponenEva" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenEva">Lebar</label>
                                    <input id="lebarKomponenEva" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenEva">Quantity</label>
                                    <input id="quantityKomponenEva" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratKomponenEva">Berat</label>
                                    <input id="beratKomponenEva" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="hargaKomponenEva">Harga</label>
                                    <input id="hargaKomponenEva" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalHargaKomponenEva">Total Harga</label>
                                    <input id="totalHargaKomponenEva" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenEva" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Benang") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="hargaBenangPerKgKomponenBenang">Harga Benang/Kg</label>
                                    <input id="hargaBenangPerKgKomponenBenang" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalHargaKomponenBenang">Total Harga</label>
                                    <input id="totalHargaKomponenBenang" class="input" readonly>
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="kebutuhanKomponenBenang">Kebutuhan</label>
                                    <input id="kebutuhanKomponenBenang" class="input">
                                </div>
                                <input type="hidden" id="kounterKomponenBenang" class="input">
                            </div>
                        </div>
                        <div style="display: flex;align-items: center;gap: 10px;margin-bottom: 10px;">
                            <label for="denierKomponenBenang" style="margin-right: 15px;">Denier</label>
                            <label>
                                <input type="radio" name="denier" id="denier1KomponenBenang" value="2000" style="margin-right: 3px;"> 2000
                            </label>
                            <label>
                                <input type="radio" name="denier" id="denier2KomponenBenang" value="2600" style="margin-right: 3px;margin-left: 3px"> 2600
                            </label>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Ongkos") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenKomponenOngkos">Total Berat Komponen</label>
                                    <input id="totalBeratKomponenKomponenOngkos" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratInnerLinerKomponenOngkos">Berat Inner Liner</label>
                                    <input id="beratInnerLinerKomponenOngkos" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="hargaPerKgKomponenOngkos">Harga/Kg</label>
                                    <input id="hargaPerKgKomponenOngkos" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalHargaKomponenOngkos">Total Harga</label>
                                    <input id="totalHargaKomponenOngkos" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenOngkos" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Dust") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="beratKomponenDust">Berat</label>
                            <input id="beratKomponenDust" class="input">
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="hargaPerKgKomponenDust">Harga/Kg</label>
                            <input id="hargaPerKgKomponenDust" class="input">
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="totalHargaKomponenDust">Total Harga</label>
                            <input id="totalHargaKomponenDust" class="input" readonly>
                        </div>
                        <input type="hidden" id="kounterKomponenDust" class="input">
                    </div>`;
    } else if (typeForm == "Form Komponen Katun") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenKatun">Panjang</label>
                                    <input id="panjangKomponenKatun" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenKatun">Lebar</label>
                                    <select class="input" id="lebarKomponenKatun">
                                        <option selected disabled>-- Pilih Lebar --</option>
                                    </select>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratPerMeterKomponenKatun">Berat Per Meter</label>
                                    <input id="beratPerMeterKomponenKatun" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenKatun">Quantity</label>
                                    <input id="quantityKomponenKatun" class="input">
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="hargaPerKgKomponenKatun">Harga/Kg</label>
                                    <input id="hargaPerKgKomponenKatun" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenKatun">Total Berat</label>
                                    <input id="totalBeratKomponenKatun" class="input" readonly>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalHargaKomponenKatun">Total Harga</label>
                                    <input id="totalHargaKomponenKatun" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenKatun" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Kertas") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenKertas">Panjang</label>
                                    <div style="width: 100%">
                                        <input id="panjangKomponenKertas" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="GSMKomponenKertas">GSM</label>
                                    <div style="width: 100%">
                                        <input id="GSMKomponenKertas" class="input" style="width: 90%"> g/m²
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenKertas">Lebar</label>
                                    <div style="width: 100%">
                                        <input id="lebarKomponenKertas" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenKertas">Quantity</label>
                                    <input id="quantityKomponenKertas" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenKertas">Total Berat</label>
                                    <input id="totalBeratKomponenKertas" class="input">
                                </div>
                                <input type="hidden" id="kounterKomponenKertas" class="input" readonly>
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Kain") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="hargaKomponenKain">Harga</label>
                                    <div style="width: 100%">
                                        <input id="hargaKomponenKain" class="input" style="width: 90%"> Rupiah
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenKain">Panjang</label>
                                    <div style="width: 100%">
                                        <input id="panjangKomponenKain" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenKain">Lebar</label>
                                    <div style="width: 100%">
                                        <input id="lebarKomponenKain" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="GSMKomponenKain">GSM</label>
                                    <div style="width: 100%">
                                        <input id="GSMKomponenKain" class="input" style="width: 90%"> g/m²
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenKain">Quantity</label>
                                    <input id="quantityKomponenKain" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenKain">Total Berat</label>
                                    <input id="totalBeratKomponenKain" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenKain" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Benang Katun") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenBenangKatun">Panjang</label>
                                    <div style="width: 100%">
                                        <input id="panjangKomponenBenangKatun" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenBenangKatun">Lebar</label>
                                    <div style="width: 100%">
                                        <select class="input" id="lebarKomponenBenangKatun">
                                            <option selected disabled>-- Pilih Lebar --</option>
                                        </select> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratStdKomponenBenangKatun">Berat Std</label>
                                    <div style="width: 100%">
                                        <input id="beratStdKomponenBenangKatun" class="input" style="width: 90%" readonly> Gram/CM
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenBenangKatun">Quantity</label>
                                    <input id="quantityKomponenBenangKatun" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenBenangKatun">Total Berat</label>
                                    <input id="totalBeratKomponenBenangKatun" class="input" readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenBenangKatun" class="input">
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Karet") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenKaret">Panjang</label>
                                    <div style="width: 100%">
                                        <input id="panjangKomponenKaret" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenKaret">Lebar</label>
                                    <div style="width: 100%">
                                        <input id="lebarKomponenKaret" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="beratPerMeterKomponenKaret">Berat/Meter</label>
                                    <div style="width: 100%">
                                        <input id="beratPerMeterKomponenKaret" class="input" style="width: 90%"> Gram/M
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenKaret">Quantity</label>
                                    <input id="quantityKomponenKaret" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenKaret">Total Berat</label>
                                    <input id="totalBeratKomponenKaret" class="input"readonly>
                                </div>
                                <input type="hidden" id="kounterKomponenKaret" class="input" >
                            </div>
                        </div>
                    </div>`;
    } else if (typeForm == "Form Komponen Carbon") {
        htmlForm = `<div style="text-align: left;">
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="kode_komponen">Kode Komponen</label>
                            <input id="kode_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 75%;flex-direction: column;margin-bottom: 4px;">
                            <label for="nama_komponen">Nama Komponen</label>
                            <input id="nama_komponen" class="input" readonly>
                        </div>
                        <div style="display: flex;width: 100%;flex-direction: row;margin-bottom: 4px;gap: 2%">
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="lebarKomponenCarbon">Lebar</label>
                                    <div style="width: 100%">
                                        <input id="lebarKomponenCarbon" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="panjangKomponenCarbon">Panjang</label>
                                    <div style="width: 100%">
                                        <input id="panjangKomponenCarbon" class="input" style="width: 90%"> CM
                                    </div>
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="tebalKomponenCarbon">Tebal</label>
                                    <input id="tebalKomponenCarbon" class="input" style="width: 90%"> Gram/M
                                </div>
                            </div>
                            <div style="display: flex;width: 45%;flex-direction: column;margin-bottom: 4px;">
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="quantityKomponenCarbon">Quantity</label>
                                    <input id="quantityKomponenCarbon" class="input">
                                </div>
                                <div style="display: flex;width: 100%;flex-direction: column;margin-bottom: 4px;">
                                    <label for="totalBeratKomponenCarbon">Total Berat</label>
                                    <input id="totalBeratKomponenCarbon" class="input">
                                </div>
                                    <input type="hidden" id="kounterKomponenCarbon" class="input">
                            </div>
                        </div>
                    </div>`;
    }
    Swal.fire({
        title: typeForm,
        html: htmlForm,
        showCancelButton: true,
        width: typeForm == "Form Komponen Lami" ? "90%" : "auto",
        confirmButtonText:
            KompVarKomponen == 1
                ? "Simpan"
                : KompVarKomponen == 2
                ? "Koreksi"
                : KompVarKomponen == 3
                ? "Hapus"
                : "Proses",
        cancelButtonText: "Cancel",
        didOpen: () => {
            $(document).ready(function () {
                // Make the SweetAlert dialog draggable
                $(".swal2-popup").draggable({
                    handle: ".swal2-title",
                });
                // Change the cursor style
                $(".swal2-title").css("cursor", "grab");

                $("#kode_komponen").val(Kode_Komponen);
                $("#nama_komponen").val(Nama_Komponen);
                if (typeForm == "Form Komponen General") {
                    //Javascript khusus untuk Form Komponen General FormKomponenGeneral.js
                    let panjangKomponenGeneral = document.getElementById(
                        "panjangKomponenGeneral"
                    );
                    let warpKomponenGeneral = document.getElementById(
                        "warpKomponenGeneral"
                    );
                    let denier_warpKomponenGeneral = document.getElementById(
                        "denier_warpKomponenGeneral"
                    );
                    let denierKomponenGeneral = document.getElementById(
                        "denierKomponenGeneral"
                    );
                    let quantityKomponenGeneral = document.getElementById(
                        "quantityKomponenGeneral"
                    );
                    let berat_warpKomponenGeneral = document.getElementById(
                        "berat_warpKomponenGeneral"
                    );
                    let beratKomponenGeneral = document.getElementById(
                        "beratKomponenGeneral"
                    );
                    let lebarKomponenGeneral = document.getElementById(
                        "lebarKomponenGeneral"
                    );
                    let weftKomponenGeneral = document.getElementById(
                        "weftKomponenGeneral"
                    );
                    let denier_weftKomponenGeneral = document.getElementById(
                        "denier_weftKomponenGeneral"
                    );
                    let kounterKomponenGeneral = document.getElementById(
                        "kounterKomponenGeneral"
                    );
                    let hargaKomponenGeneral = document.getElementById(
                        "hargaKomponenGeneral"
                    );
                    let subtotalKomponenGeneral = document.getElementById(
                        "subtotalKomponenGeneral"
                    );
                    let berat_weftKomponenGeneral = document.getElementById(
                        "berat_weftKomponenGeneral"
                    );
                    var inputElements = [
                        "panjangKomponenGeneral",
                        "warpKomponenGeneral",
                        "denier_warpKomponenGeneral",
                        "denierKomponenGeneral",
                        "quantityKomponenGeneral",
                        "berat_warpKomponenGeneral",
                        "beratKomponenGeneral",
                        "lebarKomponenGeneral",
                        "weftKomponenGeneral",
                        "denier_weftKomponenGeneral",
                        "kounterKomponenGeneral",
                        "hargaKomponenGeneral",
                        "subtotalKomponenGeneral",
                        "berat_weftKomponenGeneral",
                    ];
                    warpKomponenGeneral.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (
                                    this.value == 10 ||
                                    this.value == 11 ||
                                    this.value == 12 ||
                                    this.value == 13
                                ) {
                                    denier_warpKomponenGeneral.value = 2000;
                                } else if (
                                    this.value == 14 ||
                                    this.value == 15 ||
                                    this.value == 22 ||
                                    this.value == 22.5
                                ) {
                                    denier_warpKomponenGeneral.value = 1500;
                                } else if (this.value == 8) {
                                    denier_warpKomponenGeneral.value = 800;
                                } else {
                                    denier_warpKomponenGeneral.value = 0;
                                }

                                if (
                                    !isNaN(
                                        parseFloat(
                                            denier_warpKomponenGeneral.value
                                        )
                                    )
                                ) {
                                    parseFloat(
                                        denier_warpKomponenGeneral.value
                                    ).toFixed(2);
                                }
                                hitungDenier();
                            }
                        }
                    );
                    weftKomponenGeneral.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (
                                    this.value == 11 ||
                                    this.value == 12 ||
                                    this.value == 13 ||
                                    this.value == 14 ||
                                    this.value == 15 ||
                                    this.value == 16
                                ) {
                                    denier_weftKomponenGeneral.value = 1500;
                                } else if (
                                    this.value == 10 &&
                                    warpKomponenGeneral.value == 10
                                ) {
                                    denier_weftKomponenGeneral.value = 900;
                                } else if (this.value == 8) {
                                    denier_weftKomponenGeneral.value = 800;
                                } else {
                                    denier_weftKomponenGeneral.value = 0;
                                }

                                if (
                                    !isNaN(
                                        parseFloat(
                                            denier_weftKomponenGeneral.value
                                        )
                                    )
                                ) {
                                    denier_weftKomponenGeneral.value =
                                        parseFloat(
                                            denier_weftKomponenGeneral.value
                                        ).toFixed(2);
                                }
                                if (KompVarKomponen == 2) {
                                    denier_warpKomponenGeneral.readOnly = false;
                                }
                                hitungDenier();
                            }
                        }
                    );

                    denier_warpKomponenGeneral.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    if (KompVarKomponen == 2) {
                                        denier_weftKomponenGeneral.readOnly = false;
                                    }
                                    denier_weftKomponenGeneral.focus();
                                    hitungDenier();
                                }
                            }
                        }
                    );
                    denier_weftKomponenGeneral.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungDenier();
                                }
                            }
                        }
                    );
                    quantityKomponenGeneral.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );
                    function hitungDenier() {
                        if (
                            denier_warpKomponenGeneral.value != "" &&
                            denier_weftKomponenGeneral.value != ""
                        ) {
                            denierKomponenGeneral.value =
                                (parseFloat(warpKomponenGeneral.value) *
                                    parseFloat(
                                        denier_warpKomponenGeneral.value
                                    ) +
                                    parseFloat(weftKomponenGeneral.value) *
                                        parseFloat(
                                            denier_weftKomponenGeneral.value
                                        )) /
                                (parseFloat(warpKomponenGeneral.value) +
                                    parseFloat(weftKomponenGeneral.value));
                            if (
                                !isNaN(parseFloat(denierKomponenGeneral.value))
                            ) {
                                denierKomponenGeneral.value = parseFloat(
                                    denierKomponenGeneral.value
                                ).toFixed(2);
                            }
                        }
                    }
                    function hitungBerat() {
                        let TBerat, ReInb, TBeratWA, TBeratWE;
                        let XDenier;
                        let XTemp;
                        let XGram;
                        console.log(Kode_Komponen);

                        if (
                            ["01BB", "02BS", "24PA", "27FP", "32KG"].includes(
                                Kode_Komponen.substring(0, 4)
                            )
                        ) {
                            XDenier =
                                parseFloat(warpKomponenGeneral.value) *
                                    parseInt(denier_warpKomponenGeneral.value) +
                                parseFloat(weftKomponenGeneral.value) *
                                    parseInt(denier_weftKomponenGeneral.value);
                            TBerat =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    XDenier *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (2.54 * 900000);
                            TBeratWA =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(warpKomponenGeneral.value) *
                                        parseInt(
                                            denier_warpKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (2.54 * 900000);
                            TBeratWE =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(weftKomponenGeneral.value) *
                                        parseInt(
                                            denier_weftKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (2.54 * 900000);

                            switch (
                                Kode_Komponen.substring(
                                    Kode_Komponen.length - 2,
                                    Kode_Komponen.length - 1
                                )
                            ) {
                                case "T":
                                    ReInb =
                                        (parseFloat(KompVarReinf) *
                                            parseFloat(
                                                panjangKomponenGeneral.value
                                            ) *
                                            parseFloat(
                                                warpKomponenGeneral.value
                                            ) *
                                            parseInt(
                                                denier_warpKomponenGeneral.value
                                            ) *
                                            parseFloat(KompVarJmlreinf) *
                                            parseFloat(
                                                quantityKomponenGeneral.value
                                            )) /
                                        (2.54 * 900000);
                                    TBerat = TBerat * 2 + ReInb;
                                    TBeratWA = TBeratWA * 2 + ReInb;
                                    TBeratWE = TBeratWE * 2;
                                    break;
                                case "U":
                                    ReInb =
                                        (parseFloat(KompVarReinf) *
                                            parseFloat(
                                                panjangKomponenGeneral.value
                                            ) *
                                            parseFloat(
                                                warpKomponenGeneral.value
                                            ) *
                                            parseInt(
                                                denier_warpKomponenGeneral.value
                                            ) *
                                            2 *
                                            parseFloat(
                                                quantityKomponenGeneral.value
                                            )) /
                                        (2.54 * 900000);
                                    TBerat = TBerat + ReInb;
                                    TBeratWA = TBeratWA + ReInb;
                                    TBeratWE = TBeratWE;
                                    break;
                                case "4":
                                    ReInb =
                                        (parseFloat(KompVarReinf) *
                                            parseFloat(
                                                panjangKomponenGeneral.value
                                            ) *
                                            parseFloat(
                                                warpKomponenGeneral.value
                                            ) *
                                            parseInt(
                                                denier_warpKomponenGeneral.value
                                            ) *
                                            2 *
                                            parseFloat(
                                                quantityKomponenGeneral.value
                                            )) /
                                        (2.54 * 900000);
                                    TBerat = TBerat + ReInb;
                                    TBeratWA = TBeratWA + ReInb;
                                    TBeratWE = TBeratWE;
                                    break;
                            }
                        }
                        // 03TA dan 04TB
                        if (
                            ["03TA", "04TB"].includes(
                                Kode_Komponen.substring(0, 4)
                            )
                        ) {
                            XDenier =
                                parseFloat(warpKomponenGeneral.value) *
                                    parseInt(denier_warpKomponenGeneral.value) +
                                parseFloat(weftKomponenGeneral.value) *
                                    parseInt(denier_weftKomponenGeneral.value);
                            TBerat =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    XDenier *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            TBeratWA =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(warpKomponenGeneral.value) *
                                        parseInt(
                                            denier_warpKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            TBeratWE =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(weftKomponenGeneral.value) *
                                        parseInt(
                                            denier_weftKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                        }

                        // 10RC
                        if (Kode_Komponen.substring(0, 4) === "10RC") {
                            XDenier =
                                parseFloat(warpKomponenGeneral.value) *
                                    parseInt(denier_warpKomponenGeneral.value) +
                                parseFloat(weftKomponenGeneral.value) *
                                    parseInt(denier_weftKomponenGeneral.value);
                            TBerat =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    XDenier *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            TBeratWA =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(warpKomponenGeneral.value) *
                                        parseInt(
                                            denier_warpKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            TBeratWE =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(weftKomponenGeneral.value) *
                                        parseInt(
                                            denier_weftKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                        }

                        // 14TR, 17CR, 17CV
                        if (
                            ["14TR", "17CR", "17CV"].includes(
                                Kode_Komponen.substring(0, 4)
                            )
                        ) {
                            XDenier =
                                parseFloat(warpKomponenGeneral.value) *
                                    parseInt(denier_warpKomponenGeneral.value) +
                                parseFloat(weftKomponenGeneral.value) *
                                    parseInt(denier_weftKomponenGeneral.value);
                            TBerat =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    XDenier *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            TBeratWA =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(warpKomponenGeneral.value) *
                                        parseInt(
                                            denier_warpKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            TBeratWE =
                                (parseFloat(panjangKomponenGeneral.value) *
                                    parseFloat(lebarKomponenGeneral.value) *
                                    (parseFloat(weftKomponenGeneral.value) *
                                        parseInt(
                                            denier_weftKomponenGeneral.value
                                        )) *
                                    parseFloat(quantityKomponenGeneral.value)) /
                                (1143000 * 2);
                            XTemp =
                                parseFloat(panjangKomponenGeneral.value) *
                                parseFloat(lebarKomponenGeneral.value);
                            ReInb = XTemp * 0.004 * 0.92;
                            TBerat = TBerat + ReInb;
                            TBeratWA = TBeratWA + ReInb;
                            TBeratWE = TBeratWE;
                        }
                        let XDes = (Math.round(TBerat * 10) / 10).toString();
                        let XWa = (Math.round(TBeratWA * 10) / 10).toString();
                        let XWe = (Math.round(TBeratWE * 10) / 10).toString();

                        let BeratWA, BeratWE;

                        if (parseInt(XDes.slice(-1)) === 0) {
                            beratKomponenGeneral.value = TBerat.toFixed(2);
                        } else {
                            if (parseInt(XDes.slice(-1)) > 5) {
                                beratKomponenGeneral.value =
                                    Math.round(TBerat).toFixed(2);
                            } else {
                                if (parseInt(XDes.slice(-1)) === 5) {
                                    TBerat = Math.ceil(TBerat * 10) / 10;
                                    beratKomponenGeneral.value =
                                        TBerat.toFixed(2);
                                } else {
                                    TBerat = Math.round(TBerat) + 1;
                                    beratKomponenGeneral.value =
                                        TBerat.toFixed(2);
                                }
                            }
                        }

                        if (parseInt(XWa.slice(-1)) === 0) {
                            berat_warpKomponenGeneral.value =
                                TBeratWA.toFixed(2);
                        } else {
                            if (parseInt(XWa.slice(-1)) > 5) {
                                berat_warpKomponenGeneral.value =
                                    Math.round(TBeratWA).toFixed(2);
                            } else {
                                if (parseInt(XWa.slice(-1)) === 5) {
                                    TBeratWA = Math.ceil(TBeratWA * 10) / 10;
                                    berat_warpKomponenGeneral.value =
                                        TBeratWA.toFixed(2);
                                } else {
                                    BeratWA = TBeratWA;
                                    berat_warpKomponenGeneral.value = (
                                        Math.round(TBeratWA) + 1
                                    ).toFixed(2);
                                }
                            }
                        }

                        if (parseInt(XWe.slice(-1)) === 0) {
                            berat_weftKomponenGeneral.value =
                                TBeratWE.toFixed(2);
                        } else {
                            if (parseInt(XWe.slice(-1)) > 5) {
                                berat_weftKomponenGeneral.value =
                                    Math.round(TBeratWE).toFixed(2);
                            } else {
                                if (parseInt(XWe.slice(-1)) === 5) {
                                    TBeratWE = Math.ceil(TBeratWE * 10) / 10;
                                    berat_weftKomponenGeneral.value =
                                        TBeratWE.toFixed(2);
                                } else {
                                    BeratWE = TBeratWE;
                                    berat_weftKomponenGeneral.value = (
                                        Math.round(TBeratWE) + 1
                                    ).toFixed(2);
                                }
                            }
                        }

                        let Total =
                            parseFloat(berat_warpKomponenGeneral.value) +
                            parseFloat(berat_weftKomponenGeneral.value);
                        if (Total !== parseFloat(beratKomponenGeneral.value)) {
                            if (BeratWA > 0) {
                                berat_warpKomponenGeneral.value -= 1;
                            } else {
                                berat_weftKomponenGeneral.value -= 1;
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenGeneral.value = selectedData[2];
                        lebarKomponenGeneral.value = selectedData[3];
                        warpKomponenGeneral.value = selectedData[4];
                        weftKomponenGeneral.value = selectedData[5];
                        denierKomponenGeneral.value = selectedData[6];
                        quantityKomponenGeneral.value = selectedData[7];
                        beratKomponenGeneral.value = selectedData[8];
                        hargaKomponenGeneral.value = selectedData[9];
                        subtotalKomponenGeneral.value = selectedData[10];
                        kounterKomponenGeneral.value = selectedData[11];

                        $.ajax({
                            url: "TabelHitunganJBB/getDataKoreksiKomponen", // URL to your PHP script that fetches data
                            method: "GET",
                            data: {
                                KodeBarang: KompVarKdBrg,
                                KodeKomponen: Kode_Komponen,
                                kounter: kounterKomponenGeneral.value,
                            },
                            dataType: "json",
                            success: function (data) {
                                // Get the select element
                                console.log(data);
                                denier_warpKomponenGeneral.value =
                                    data[0].Denier_WA ?? 0;
                                denier_weftKomponenGeneral.value =
                                    data[0].Denier_WE ?? 0;
                                berat_warpKomponenGeneral.value =
                                    data[0].Berat_WA ?? 0;
                                berat_weftKomponenGeneral.value =
                                    data[0].Berat_WE ?? 0;
                            },
                            error: function (xhr, status, error) {
                                console.error("Error fetching data:", error);
                            },
                        });
                        if (KompVarKomponen == 3) {
                            panjangKomponenGeneral.readOnly = true;
                            lebarKomponenGeneral.readOnly = true;
                            warpKomponenGeneral.readOnly = true;
                            weftKomponenGeneral.readOnly = true;
                            denierKomponenGeneral.readOnly = true;
                            quantityKomponenGeneral.readOnly = true;
                            beratKomponenGeneral.readOnly = true;
                            hargaKomponenGeneral.readOnly = true;
                            subtotalKomponenGeneral.readOnly = true;
                            denier_warpKomponenGeneral.readOnly = true;
                            denier_weftKomponenGeneral.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Circular") {
                    //O-ATX-002-KR01 ATEX INDONESIA, PT
                    //Javascript khusus untuk Form Komponen Circular FormKomponenCircular.js
                    let diameterKomponenCircular = document.getElementById(
                        "diameterKomponenCircular"
                    );
                    let tinggiKomponenCircular = document.getElementById(
                        "tinggiKomponenCircular"
                    );
                    let panjangKomponenCircular = document.getElementById(
                        "panjangKomponenCircular"
                    );
                    let lebarKomponenCircular = document.getElementById(
                        "lebarKomponenCircular"
                    );
                    let warpKomponenCircular = document.getElementById(
                        "warpKomponenCircular"
                    );
                    let weftKomponenCircular = document.getElementById(
                        "weftKomponenCircular"
                    );
                    let denier_warpKomponenCircular = document.getElementById(
                        "denier_warpKomponenCircular"
                    );
                    let denier_weftKomponenCircular = document.getElementById(
                        "denier_weftKomponenCircular"
                    );
                    let denierKomponenCircular = document.getElementById(
                        "denierKomponenCircular"
                    );
                    let quantityKomponenCircular = document.getElementById(
                        "quantityKomponenCircular"
                    );
                    let berat_warpKomponenCircular = document.getElementById(
                        "berat_warpKomponenCircular"
                    );
                    let berat_weftKomponenCircular = document.getElementById(
                        "berat_weftKomponenCircular"
                    );
                    let beratKomponenCircular = document.getElementById(
                        "beratKomponenCircular"
                    );
                    let hargaKomponenCircular = document.getElementById(
                        "hargaKomponenCircular"
                    );
                    let subtotalKomponenCircular = document.getElementById(
                        "subtotalKomponenCircular"
                    );
                    let kounterKomponenCircular = document.getElementById(
                        "kounterKomponenCircular"
                    );
                    var inputElements = [
                        "panjangKomponenCircular",
                        "lebarKomponenCircular",
                        "warpKomponenCircular",
                        "weftKomponenCircular",
                        "denier_warpKomponenCircular",
                        "denier_weftKomponenCircular",
                        "denierKomponenCircular",
                        "quantityKomponenCircular",
                        "berat_warpKomponenCircular",
                        "berat_weftKomponenCircular",
                        "beratKomponenCircular",
                        "kounterKomponenCircular",
                        "hargaKomponenCircular",
                        "subtotalKomponenCircular",
                    ];
                    warpKomponenCircular.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (
                                    this.value == 11 ||
                                    this.value == 12 ||
                                    this.value == 13
                                ) {
                                    denier_warpKomponenCircular.value = 2000;
                                } else if (
                                    this.value == 14 ||
                                    this.value == 15 ||
                                    this.value == 22.5
                                ) {
                                    denier_warpKomponenCircular.value = 1500;
                                } else if (this.value == 10) {
                                    denier_warpKomponenCircular.value = 900;
                                } else if (this.value == 8) {
                                    denier_warpKomponenCircular.value = 800;
                                } else {
                                    denier_warpKomponenCircular.value = 0;
                                }

                                if (
                                    !isNaN(
                                        parseFloat(
                                            denier_warpKomponenCircular.value
                                        )
                                    )
                                ) {
                                    parseFloat(
                                        denier_warpKomponenCircular.value
                                    ).toFixed(2);
                                }
                                hitungDenier();
                            }
                        }
                    );
                    weftKomponenCircular.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (
                                    this.value == 11 ||
                                    this.value == 12 ||
                                    this.value == 13 ||
                                    this.value == 14 ||
                                    this.value == 15 ||
                                    this.value == 16
                                ) {
                                    denier_weftKomponenCircular.value = 1500;
                                } else if (this.value == 10) {
                                    denier_weftKomponenCircular.value = 900;
                                    denier_warpKomponenCircular.value = 900;
                                } else {
                                    denier_weftKomponenCircular.value = 0;
                                }

                                if (
                                    !isNaN(
                                        parseFloat(
                                            denier_weftKomponenCircular.value
                                        )
                                    )
                                ) {
                                    denier_weftKomponenCircular.value =
                                        parseFloat(
                                            denier_weftKomponenCircular.value
                                        ).toFixed(2);
                                }
                                if (KompVarKomponen == 2) {
                                    denier_warpKomponenCircular.readOnly = false;
                                }
                                hitungDenier();
                            }
                        }
                    );
                    denier_warpKomponenCircular.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    if (KompVarKomponen == 2) {
                                        denier_weftKomponenCircular.readOnly = false;
                                    }
                                    denier_weftKomponenCircular.focus();
                                    hitungDenier();
                                }
                            }
                        }
                    );
                    denier_weftKomponenCircular.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungDenier();
                                }
                            }
                        }
                    );
                    quantityKomponenCircular.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );
                    function hitungDenier() {
                        if (
                            denier_warpKomponenCircular.value != "" &&
                            denier_weftKomponenCircular.value != ""
                        ) {
                            denierKomponenCircular.value =
                                (parseFloat(warpKomponenCircular.value) *
                                    parseFloat(
                                        denier_warpKomponenCircular.value
                                    ) +
                                    parseFloat(weftKomponenCircular.value) *
                                        parseFloat(
                                            denier_weftKomponenCircular.value
                                        )) /
                                (parseFloat(warpKomponenCircular.value) +
                                    parseFloat(weftKomponenCircular.value));
                            if (
                                !isNaN(parseFloat(denierKomponenCircular.value))
                            ) {
                                denierKomponenCircular.value = parseFloat(
                                    denierKomponenCircular.value
                                ).toFixed(2);
                            }
                        }
                    }
                    function hitungBerat() {
                        let TBerat, TBeratWA, TBeratWE;
                        let XDenier;
                        let XDes, XWa, XWe;

                        let BeratWA, BeratWE;

                        XDenier = parseInt(
                            parseFloat(warpKomponenCircular.value) *
                                parseInt(denier_warpKomponenCircular.value) +
                                parseFloat(weftKomponenCircular.value) *
                                    parseInt(denier_weftKomponenCircular.value)
                        );
                        TBerat = Math.round(
                            (parseFloat(panjangKomponenCircular.value) *
                                parseFloat(lebarKomponenCircular.value) *
                                XDenier *
                                parseFloat(quantityKomponenCircular.value)) /
                                (2 * 1143000)
                        );
                        TBeratWA = Math.round(
                            (parseFloat(panjangKomponenCircular.value) *
                                parseFloat(lebarKomponenCircular.value) *
                                (parseFloat(warpKomponenCircular.value) *
                                    parseInt(
                                        denier_warpKomponenCircular.value
                                    )) *
                                parseFloat(quantityKomponenCircular.value)) /
                                (2 * 1143000)
                        );
                        TBeratWE = Math.round(
                            (parseFloat(panjangKomponenCircular.value) *
                                parseFloat(lebarKomponenCircular.value) *
                                (parseFloat(weftKomponenCircular.value) *
                                    parseInt(
                                        denier_weftKomponenCircular.value
                                    )) *
                                parseFloat(quantityKomponenCircular.value)) /
                                (2 * 1143000)
                        );
                        // Pembulatan
                        XDes = TBerat.toFixed(1);
                        XWa = TBeratWA.toFixed(1);
                        XWe = TBeratWE.toFixed(1);

                        if (parseInt(XDes.slice(-1)) === 0) {
                            beratKomponenCircular.value = Math.round(TBerat);
                        } else if (parseInt(XDes.slice(-1)) > 5) {
                            beratKomponenCircular.value = Math.round(TBerat);
                        } else if (parseInt(XDes.slice(-1)) === 5) {
                            TBerat = Math.round(TBerat);
                            beratKomponenCircular.value = Math.round(TBerat);
                        } else {
                            TBerat = Math.round(TBerat) + 1;
                            beratKomponenCircular.value = Math.round(TBerat);
                        }

                        if (parseInt(XWa.slice(-1)) === 0) {
                            berat_warpKomponenCircular.value =
                                Math.round(TBeratWA);
                        } else if (parseInt(XWa.slice(-1)) > 5) {
                            berat_warpKomponenCircular.value =
                                Math.round(TBeratWA);
                        } else if (parseInt(XWa.slice(-1)) === 5) {
                            TBeratWA = Math.ceil(TBerat);
                            berat_warpKomponenCircular.value =
                                Math.round(TBeratWA);
                        } else {
                            BeratWA = TBeratWA;
                            TBeratWA = Math.round(TBerat) + 1;
                            berat_warpKomponenCircular.value =
                                Math.round(TBeratWA) + 1;
                        }

                        if (parseInt(XWe.slice(-1)) === 0) {
                            berat_weftKomponenCircular.value =
                                Math.round(TBeratWE);
                        } else if (parseInt(XWe.slice(-1)) > 5) {
                            berat_weftKomponenCircular.value =
                                Math.round(TBeratWE);
                        } else if (parseInt(XWe.slice(-1)) === 5) {
                            TBeratWE = Math.round(TBerat);
                            berat_weftKomponenCircular.value =
                                Math.round(TBeratWE);
                        } else {
                            BeratWE = TBeratWE;
                            berat_weftKomponenCircular.value =
                                Math.round(TBeratWE) + 1;
                        }

                        let Total =
                            parseFloat(berat_warpKomponenCircular.value) +
                            parseFloat(berat_weftKomponenCircular.value);
                        if (Total !== parseFloat(beratKomponenCircular.value)) {
                            if (BeratWA > 0) {
                                berat_warpKomponenCircular.value = (
                                    parseFloat(
                                        berat_warpKomponenCircular.value
                                    ) - 1
                                ).toFixed(2);
                            } else {
                                berat_weftKomponenCircular.value = (
                                    parseFloat(
                                        berat_weftKomponenCircular.value
                                    ) - 1
                                ).toFixed(2);
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenCircular.value = selectedData[2];
                        lebarKomponenCircular.value = selectedData[3];
                        warpKomponenCircular.value = selectedData[4];
                        weftKomponenCircular.value = selectedData[5];
                        denierKomponenCircular.value = selectedData[6];
                        quantityKomponenCircular.value = selectedData[7];
                        beratKomponenCircular.value = selectedData[8];
                        hargaKomponenCircular.value = selectedData[9];
                        subtotalKomponenCircular.value = selectedData[10];
                        kounterKomponenCircular.value = selectedData[11];
                        if (Kode_Komponen.substring(0, 4) === "05CA") {
                            diameterKomponenCircular.value =
                                cerobongAtas_diameter.value;
                            tinggiKomponenCircular.value =
                                cerobongAtas_tinggi.value;
                        } else if (Kode_Komponen.substring(0, 4) === "06CB") {
                            diameterKomponenCircular.value =
                                cerobongBawah_diameter.value;
                            tinggiKomponenCircular.value =
                                cerobongBawah_tinggi.value;
                        }

                        $.ajax({
                            url: "TabelHitunganJBB/getDataKoreksiKomponen", // URL to your PHP script that fetches data
                            method: "GET",
                            data: {
                                KodeBarang: KompVarKdBrg,
                                KodeKomponen: Kode_Komponen,
                                kounter: kounterKomponenCircular.value,
                            },
                            dataType: "json",
                            success: function (data) {
                                // Get the select element
                                console.log(data);
                                denier_warpKomponenCircular.value =
                                    data[0].Denier_WA ?? 0;
                                denier_weftKomponenCircular.value =
                                    data[0].Denier_WE ?? 0;
                                berat_warpKomponenCircular.value =
                                    data[0].Berat_WA ?? 0;
                                berat_weftKomponenCircular.value =
                                    data[0].Berat_WE ?? 0;
                            },
                            error: function (xhr, status, error) {
                                console.error("Error fetching data:", error);
                            },
                        });
                        if (KompVarKomponen == 3) {
                            panjangKomponenCircular.readOnly = true;
                            lebarKomponenCircular.readOnly = true;
                            warpKomponenCircular.readOnly = true;
                            weftKomponenCircular.readOnly = true;
                            denierKomponenCircular.readOnly = true;
                            quantityKomponenCircular.readOnly = true;
                            beratKomponenCircular.readOnly = true;
                            hargaKomponenCircular.readOnly = true;
                            subtotalKomponenCircular.readOnly = true;
                            kounterKomponenCircular.readOnly = true;
                            diameterKomponenCircular.readOnly = true;
                            tinggiKomponenCircular.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Square") {
                    //Javascript khusus untuk Form Komponen Square FormKomponenSquare.js
                    let panjangKomponenSquare = document.getElementById(
                        "panjangKomponenSquare"
                    );
                    let lebarKomponenSquare = document.getElementById(
                        "lebarKomponenSquare"
                    );
                    let warpKomponenSquare =
                        document.getElementById("warpKomponenSquare");
                    let weftKomponenSquare =
                        document.getElementById("weftKomponenSquare");
                    let denier_warpKomponenSquare = document.getElementById(
                        "denier_warpKomponenSquare"
                    );
                    let denier_weftKomponenSquare = document.getElementById(
                        "denier_weftKomponenSquare"
                    );
                    let denierKomponenSquare = document.getElementById(
                        "denierKomponenSquare"
                    );
                    let quantityKomponenSquare = document.getElementById(
                        "quantityKomponenSquare"
                    );
                    let berat_warpKomponenSquare = document.getElementById(
                        "berat_warpKomponenSquare"
                    );
                    let berat_weftKomponenSquare = document.getElementById(
                        "berat_weftKomponenSquare"
                    );
                    let beratKomponenSquare = document.getElementById(
                        "beratKomponenSquare"
                    );
                    let kounterKomponenSquare = document.getElementById(
                        "kounterKomponenSquare"
                    );
                    let hargaKomponenSquare = document.getElementById(
                        "hargaKomponenSquare"
                    );
                    let subtotalKomponenSquare = document.getElementById(
                        "subtotalKomponenSquare"
                    );
                    var inputElements = [
                        "panjangKomponenSquare",
                        "warpKomponenSquare",
                        "denier_warpKomponenSquare",
                        "denierKomponenSquare",
                        "quantityKomponenSquare",
                        "beratKomponenSquare",
                        "lebarKomponenSquare",
                        "weftKomponenSquare",
                        "denier_weftKomponenSquare",
                        "kounterKomponenSquare",
                        "hargaKomponenSquare",
                        "subtotalKomponenSquare",
                    ];
                    warpKomponenSquare.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (
                                    this.value == 11 ||
                                    this.value == 12 ||
                                    this.value == 13
                                ) {
                                    denier_warpKomponenSquare.value = 2000;
                                } else if (
                                    this.value == 14 ||
                                    this.value == 15
                                ) {
                                    denier_warpKomponenSquare.value = 1500;
                                } else if (this.value == 10) {
                                    denier_warpKomponenSquare.value = 900;
                                } else {
                                    denier_warpKomponenSquare.value = 0;
                                }

                                if (
                                    !isNaN(
                                        parseFloat(
                                            denier_warpKomponenSquare.value
                                        )
                                    )
                                ) {
                                    parseFloat(
                                        denier_warpKomponenSquare.value
                                    ).toFixed(2);
                                }
                                hitungDenier();
                            }
                        }
                    );
                    weftKomponenSquare.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (
                                    this.value == 11 ||
                                    this.value == 12 ||
                                    this.value == 13 ||
                                    this.value == 14 ||
                                    this.value == 15
                                ) {
                                    denier_weftKomponenSquare.value = 1500;
                                } else if (this.value == 10) {
                                    denier_weftKomponenSquare.value = 900;
                                } else {
                                    denier_weftKomponenSquare.value = 0;
                                }

                                if (
                                    !isNaN(
                                        parseFloat(
                                            denier_weftKomponenSquare.value
                                        )
                                    )
                                ) {
                                    denier_weftKomponenSquare.value =
                                        parseFloat(
                                            denier_weftKomponenSquare.value
                                        ).toFixed(2);
                                }
                                if (KompVarKomponen == 2) {
                                    denier_warpKomponenSquare.readOnly = false;
                                }
                                hitungDenier();
                            }
                        }
                    );
                    denier_warpKomponenSquare.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    if (KompVarKomponen == 2) {
                                        denier_weftKomponenSquare.readOnly = false;
                                    }
                                    denier_weftKomponenSquare.focus();
                                    hitungDenier();
                                }
                            }
                        }
                    );
                    denier_weftKomponenSquare.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Deniernya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungDenier();
                                }
                            }
                        }
                    );
                    quantityKomponenSquare.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );
                    function hitungDenier() {
                        if (
                            denier_warpKomponenSquare.value != "" &&
                            denier_weftKomponenSquare.value != ""
                        ) {
                            denierKomponenSquare.value =
                                (parseFloat(warpKomponenSquare.value) *
                                    parseFloat(
                                        denier_warpKomponenSquare.value
                                    ) +
                                    parseFloat(weftKomponenSquare.value) *
                                        parseFloat(
                                            denier_weftKomponenSquare.value
                                        )) /
                                (parseFloat(warpKomponenSquare.value) +
                                    parseFloat(weftKomponenSquare.value));
                            if (
                                !isNaN(parseFloat(denierKomponenSquare.value))
                            ) {
                                denierKomponenSquare.value = parseFloat(
                                    denierKomponenSquare.value
                                ).toFixed(2);
                            }
                        }
                    }
                    function hitungBerat() {
                        let TBerat;
                        let XDenier;
                        let XDes;

                        XDenier =
                            parseFloat(warpKomponenSquare.value) *
                                parseInt(denier_warpKomponenSquare.value) +
                            parseFloat(weftKomponenSquare.value) *
                                parseInt(denier_weftKomponenSquare.value);
                        TBerat =
                            (parseFloat(panjangKomponenSquare.value) *
                                parseFloat(lebarKomponenSquare.value) *
                                XDenier *
                                parseFloat(quantityKomponenSquare.value)) /
                            (2 * 1143000);

                        // Pembulatan
                        XDes = TBerat.toFixed(1);

                        if (parseInt(XDes.slice(-1)) === 0) {
                            beratKomponenSquare.value = Math.round(TBerat);
                        } else if (parseInt(XDes.slice(-1)) > 5) {
                            beratKomponenSquare.value = Math.round(TBerat);
                        } else if (parseInt(XDes.slice(-1)) === 5) {
                            TBerat = Math.round(TBerat);
                            beratKomponenSquare.value = Math.round(TBerat);
                        } else {
                            TBerat = Math.round(TBerat) + 1;
                            beratKomponenSquare.value = Math.round(TBerat);
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenSquare.value = selectedData[2];
                        lebarKomponenSquare.value = selectedData[3];
                        warpKomponenSquare.value = selectedData[4];
                        weftKomponenSquare.value = selectedData[5];
                        denierKomponenSquare.value = selectedData[6];
                        quantityKomponenSquare.value = selectedData[7];
                        beratKomponenSquare.value = selectedData[8];
                        hargaKomponenSquare.value = selectedData[9];
                        subtotalKomponenSquare.value = selectedData[10];
                        kounterKomponenSquare.value = selectedData[11];

                        $.ajax({
                            url: "TabelHitunganJBB/getDataKoreksiKomponen", // URL to your PHP script that fetches data
                            method: "GET",
                            data: {
                                KodeBarang: KompVarKdBrg,
                                KodeKomponen: Kode_Komponen,
                                kounter: kounterKomponenSquare.value,
                            },
                            dataType: "json",
                            success: function (data) {
                                // Get the select element
                                console.log(data);
                                denier_warpKomponenSquare.value =
                                    data[0].Denier_WA ?? 0;
                                denier_weftKomponenSquare.value =
                                    data[0].Denier_WE ?? 0;
                                berat_warpKomponenSquare.value =
                                    data[0].Berat_WA ?? 0;
                                berat_weftKomponenSquare.value =
                                    data[0].Berat_WE ?? 0;
                            },
                            error: function (xhr, status, error) {
                                console.error("Error fetching data:", error);
                            },
                        });
                        if (KompVarKomponen == 3) {
                            panjangKomponenSquare.readOnly = true;
                            lebarKomponenSquare.readOnly = true;
                            warpKomponenSquare.readOnly = true;
                            weftKomponenSquare.readOnly = true;
                            denierKomponenSquare.readOnly = true;
                            quantityKomponenSquare.readOnly = true;
                            beratKomponenSquare.readOnly = true;
                            hargaKomponenSquare.readOnly = true;
                            subtotalKomponenSquare.readOnly = true;
                            kounterKomponenSquare.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Rope") {
                    //Javascript khusus untuk Form Komponen Rope FormKomponenRope.js
                    let panjangKomponenRope = document.getElementById(
                        "panjangKomponenRope"
                    );
                    let quantityKomponenRope = document.getElementById(
                        "quantityKomponenRope"
                    );
                    let totalBeratKomponenRope = document.getElementById(
                        "totalBeratKomponenRope"
                    );
                    let diameterKomponenRope = document.getElementById(
                        "diameterKomponenRope"
                    );
                    let beratPerMeterKomponenRope = document.getElementById(
                        "beratPerMeterKomponenRope"
                    );
                    let kounterKomponenRope = document.getElementById(
                        "kounterKomponenRope"
                    );

                    var inputElements = [
                        "panjangKomponenRope",
                        "quantityKomponenRope",
                        "totalBeratKomponenRope",
                        "diameterKomponenRope",
                        "beratPerMeterKomponenRope",
                        "kounterKomponenRope",
                    ];

                    $.ajax({
                        url: "TabelHitunganJBB/getDiameterKomponenRope", // URL to your PHP script that fetches data
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            // Get the select element
                            const selectElement = $("#diameterKomponenRope");
                            console.log(data);

                            // Loop through the data and create an option element for each item
                            data.forEach((item) => {
                                // Create a new option element
                                const newOption = $("<option></option>")
                                    .val(item.Lebar) // Set the value of the option element
                                    .text(item.Lebar); // Set the text content of the option element

                                // Append the option element to the select element
                                selectElement.append(newOption);
                            });
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching data:", error);
                        },
                    });
                    quantityKomponenRope.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let TBerat, ReInb;
                        let berat;

                        switch (parseInt(diameterKomponenRope.value)) {
                            case 2:
                                berat = 9;
                                break;
                            case 3:
                                berat = 12;
                                break;
                            case 5:
                                berat = 20;
                                break;
                            case 6:
                                berat = 22;
                                break;
                            case 8:
                                berat = 23;
                                break;
                            case 12:
                                berat = 65;
                                break;
                            case 14:
                                berat = 99;
                                break;
                            case 16:
                                berat = 125;
                                break;
                            case 18:
                                berat = 153.4;
                                break;
                            case 20:
                                berat = 184;
                                break;
                            default:
                                berat = 0;
                                break;
                        }
                        beratPerMeterKomponenRope.value = berat;

                        TBerat =
                            (parseFloat(beratPerMeterKomponenRope.value) *
                                parseFloat(panjangKomponenRope.value) *
                                parseFloat(quantityKomponenRope.value)) /
                            100;

                        // Rounding
                        let XDes = TBerat.toFixed(1);
                        let lastDigit = parseInt(XDes[XDes.length - 1]);

                        if (lastDigit === 0) {
                            totalBeratKomponenRope.value = TBerat.toFixed(
                                2
                            ).replace(/\d(?=(\d{3})+\.)/g, "$&,");
                        } else {
                            if (lastDigit > 5) {
                                totalBeratKomponenRope.value = Math.round(
                                    TBerat
                                )
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
                            } else {
                                if (lastDigit === 5) {
                                    TBerat = Math.round(TBerat);
                                    totalBeratKomponenRope.value =
                                        TBerat.toFixed(2).replace(
                                            /\d(?=(\d{3})+\.)/g,
                                            "$&,"
                                        );
                                } else {
                                    TBerat = Math.round(TBerat) + 1;
                                    totalBeratKomponenRope.value =
                                        TBerat.toFixed(2).replace(
                                            /\d(?=(\d{3})+\.)/g,
                                            "$&,"
                                        );
                                }
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenRope.value = selectedData[2];
                        diameterKomponenRope.value = selectedData[3];
                        quantityKomponenRope.value = selectedData[7];
                        totalBeratKomponenRope.value = selectedData[8];
                        kounterKomponenRope.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenRope.readOnly = true;
                            diameterKomponenRope.readOnly = true;
                            quantityKomponenRope.readOnly = true;
                            totalBeratKomponenRope.readOnly = true;
                            kounterKomponenRope.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Belt") {
                    //Javascript khusus untuk Form Komponen Belt FormKomponenBelt.js
                    var inputElements = [
                        "panjangKomponenBelt",
                        "lebarKomponenBelt",
                        "quantityKomponenBelt",
                        "beratPerMeterKomponenBelt",
                        "totalBeratKomponenBelt",
                        "denierKomponenBelt",
                        "kounterKomponenBelt",
                    ];
                    let panjangKomponenBelt = document.getElementById(
                        "panjangKomponenBelt"
                    );
                    let lebarKomponenBelt =
                        document.getElementById("lebarKomponenBelt");
                    let quantityKomponenBelt = document.getElementById(
                        "quantityKomponenBelt"
                    );
                    let beratPerMeterKomponenBelt = document.getElementById(
                        "beratPerMeterKomponenBelt"
                    );
                    let totalBeratKomponenBelt = document.getElementById(
                        "totalBeratKomponenBelt"
                    );
                    let denierKomponenBelt =
                        document.getElementById("denierKomponenBelt");
                    let kounterKomponenBelt = document.getElementById(
                        "kounterKomponenBelt"
                    );
                    console.log(KompVarStatusBelt);
                    if (KompVarStatusBelt) {
                        $.ajax({
                            url: "TabelHitunganJBB/getLebarKomponenPita",
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                // Get the select element
                                const selectElement = $("#lebarKomponenBelt");
                                // Loop through the data and create an option element for each item
                                data.forEach((item) => {
                                    // Create a new option element
                                    const newOption = $("<option></option>")
                                        .val(item.Lebar) // Set the value of the option element
                                        .text(item.Lebar); // Set the text content of the option element

                                    // Append the option element to the select element
                                    selectElement.append(newOption);
                                });
                                lebarKomponenBelt.addEventListener(
                                    "change",
                                    function (e) {
                                        beratPerMeterKomponenBelt.value = 0;
                                        totalBeratKomponenBelt.readOnly = true;
                                        beratPerMeterKomponenBelt.readOnly = true;
                                        denierKomponenBelt.value = 0;
                                    }
                                );
                            },
                            error: function (xhr, status, error) {
                                console.error("Error fetching data:", error);
                            },
                        });
                    } else {
                        $.ajax({
                            url: "TabelHitunganJBB/getLebarKomponenBelt", // URL to your PHP script that fetches data
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                // Get the select element
                                console.log(data);
                                const selectElement = $("#lebarKomponenBelt");
                                // Loop through the data and create an option element for each item
                                data.forEach((item) => {
                                    // Create a new option element
                                    const newOption = $("<option></option>")
                                        .val(item.Lebar) // Set the value of the option element
                                        .text(
                                            item.Lebar + " | " + item.Brt08HB
                                        ); // Set the text content of the option element

                                    // Append the option element to the select element
                                    selectElement.append(newOption);
                                });
                                lebarKomponenBelt.addEventListener(
                                    "change",
                                    function (e) {
                                        totalBeratKomponenBelt.readOnly = true;
                                        beratPerMeterKomponenBelt.readOnly = true;
                                        beratPerMeterKomponenBelt.value =
                                            lebarKomponenBelt.options[
                                                lebarKomponenBelt.selectedIndex
                                            ].text
                                                .split("|")[1]
                                                .split("(")[0]
                                                .trim();
                                        denierKomponenBelt.value =
                                            lebarKomponenBelt.options[
                                                lebarKomponenBelt.selectedIndex
                                            ].text
                                                .split("|")[1]
                                                .split("(")[1]
                                                .trim()
                                                .substring(0, 4);
                                    }
                                );
                            },
                            error: function (xhr, status, error) {
                                console.error("Error fetching data:", error);
                            },
                        });
                    }

                    quantityKomponenBelt.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let TBerat;

                        if (!KompVarStatusBelt) {
                            TBerat =
                                (parseFloat(beratPerMeterKomponenBelt.value) *
                                    parseFloat(panjangKomponenBelt.value) *
                                    parseFloat(quantityKomponenBelt.value)) /
                                100;
                        } else {
                            let diameter = parseFloat(
                                lebarKomponenBelt.value.trim()
                            );

                            switch (diameter) {
                                case 2:
                                    beratPerMeterKomponenBelt.value =
                                        Kode_Komponen.startsWith("31MT")
                                            ? "20"
                                            : "8.24";
                                    break;
                                case 2.5:
                                    beratPerMeterKomponenBelt.value =
                                        Kode_Komponen.startsWith("31MT")
                                            ? "20"
                                            : "10.3";
                                    break;
                                case 3:
                                    beratPerMeterKomponenBelt.value =
                                        Kode_Komponen.startsWith("31MT")
                                            ? "10"
                                            : "12.4";
                                    break;
                                case 3.5:
                                    beratPerMeterKomponenBelt.value =
                                        Kode_Komponen.startsWith("31MT")
                                            ? "10"
                                            : "13";
                                    break;
                                case 4:
                                    beratPerMeterKomponenBelt.value =
                                        Kode_Komponen.startsWith("31MT")
                                            ? "40"
                                            : "16.48";
                                    break;
                                case 7:
                                    beratPerMeterKomponenBelt.value =
                                        Kode_Komponen.startsWith("31MT")
                                            ? "20"
                                            : "26";
                                    break;
                                default:
                                    beratPerMeterKomponenBelt.value = "0";
                                    break;
                            }

                            TBerat =
                                (parseFloat(beratPerMeterKomponenBelt.value) *
                                    parseFloat(panjangKomponenBelt.value) *
                                    parseFloat(quantityKomponenBelt.value)) /
                                100;
                        }

                        // Pembulatan
                        let XDes = TBerat.toFixed(1).toString();
                        if (parseInt(XDes.charAt(XDes.length - 1)) === 0) {
                            totalBeratKomponenBelt.value = TBerat.toFixed(2);
                        } else {
                            if (parseInt(XDes.charAt(XDes.length - 1)) > 5) {
                                totalBeratKomponenBelt.value =
                                    Math.round(TBerat).toFixed(2);
                            } else {
                                if (
                                    parseInt(XDes.charAt(XDes.length - 1)) === 5
                                ) {
                                    TBerat = Math.round(TBerat);
                                    totalBeratKomponenBelt.value =
                                        TBerat.toFixed(2);
                                } else {
                                    TBerat = Math.round(TBerat) + 1;
                                    totalBeratKomponenBelt.value =
                                        TBerat.toFixed(2);
                                }
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenBelt.value = selectedData[2];
                        lebarKomponenBelt.value = selectedData[3];
                        denierKomponenBelt.value = selectedData[6];
                        quantityKomponenBelt.value = selectedData[7];
                        totalBeratKomponenBelt.value = selectedData[8];
                        kounterKomponenBelt.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenBelt.readOnly = true;
                            lebarKomponenBelt.readOnly = true;
                            denierKomponenBelt.readOnly = true;
                            quantityKomponenBelt.readOnly = true;
                            totalBeratKomponenBelt.readOnly = true;
                            kounterKomponenBelt.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Selang") {
                    //Javascript khusus untuk Form Komponen Selang FormKomponenSelang.js
                    var inputElements = [
                        "panjangKomponenSelang",
                        "diameterKomponenSelang",
                        "quantityKomponenSelang",
                        "beratPer5cmKomponenSelang",
                        "totalBeratKomponenSelang",
                        "kounterKomponenSelang",
                    ];
                    let panjangKomponenSelang = document.getElementById(
                        "panjangKomponenSelang"
                    );
                    let diameterKomponenSelang = document.getElementById(
                        "diameterKomponenSelang"
                    );
                    let quantityKomponenSelang = document.getElementById(
                        "quantityKomponenSelang"
                    );
                    let beratPer5cmKomponenSelang = document.getElementById(
                        "beratPer5cmKomponenSelang"
                    );
                    let totalBeratKomponenSelang = document.getElementById(
                        "totalBeratKomponenSelang"
                    );
                    let kounterKomponenSelang = document.getElementById(
                        "kounterKomponenSelang"
                    );

                    quantityKomponenSelang.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );
                    function hitungBerat() {
                        let TBerat, XDes;

                        if (Kode_Komponen.substring(0, 4) === "15ST") {
                            beratPer5cmKomponenSelang.value = 10;
                            TBerat =
                                (parseFloat(panjangKomponenSelang.value) *
                                    parseFloat(quantityKomponenSelang.value)) /
                                5;
                            TBerat *= 10;
                        }

                        // Pembulatan
                        XDes = TBerat.toFixed(1).toString();

                        if (parseInt(XDes.slice(-1)) === 0) {
                            totalBeratKomponenSelang.value = TBerat.toFixed(2);
                        } else {
                            if (parseInt(XDes.slice(-1)) > 5) {
                                totalBeratKomponenSelang.value =
                                    Math.round(TBerat).toFixed(2);
                            } else {
                                if (parseInt(XDes.slice(-1)) === 5) {
                                    TBerat = Math.round(TBerat);
                                    totalBeratKomponenSelang.value =
                                        TBerat.toFixed(2);
                                } else {
                                    TBerat = Math.round(TBerat) + 1;
                                    totalBeratKomponenSelang.value =
                                        TBerat.toFixed(2);
                                }
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenSelang.value = selectedData[2];
                        diameterKomponenSelang.value = selectedData[3];
                        quantityKomponenSelang.value = selectedData[7];
                        totalBeratKomponenSelang.value = selectedData[8];
                        kounterKomponenSelang.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenSelang.readOnly = true;
                            diameterKomponenSelang.readOnly = true;
                            quantityKomponenSelang.readOnly = true;
                            totalBeratKomponenSelang.readOnly = true;
                            kounterKomponenSelang.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Block") {
                    //Javascript khusus untuk Form Block FormBlock.js
                    var inputElements = [
                        "beratBlock",
                        "totalBeratBlock",
                        "quantityBlock",
                        "kounterBlock",
                    ];
                    let beratBlock = document.getElementById("beratBlock");
                    let totalBeratBlock =
                        document.getElementById("totalBeratBlock");
                    let quantityBlock =
                        document.getElementById("quantityBlock");
                    let kounterBlock = document.getElementById("kounterBlock");

                    quantityBlock.addEventListener("keypress", function (e) {
                        if (e.key == "Enter") {
                            if (this.value == "") {
                                this.classList.add("input-error");
                                this.setCustomValidity("Isi dulu Quantitynya!");
                                this.reportValidity();
                            } else {
                                this.classList.remove("input-error");
                                this.setCustomValidity("");
                                hitungBerat();
                            }
                        }
                    });

                    function hitungBerat() {
                        // Calculate the total weight
                        let TBerat = beratBlock * quantityBlock;

                        // Round the result
                        let XDes = TBerat.toFixed(1);
                        let lastDigit = parseInt(XDes.slice(-1));

                        if (lastDigit === 0) {
                            totalBeratBlock.value = TBerat.toFixed(2);
                        } else {
                            if (lastDigit > 5) {
                                totalBeratBlock.value =
                                    Math.round(TBerat).toFixed(2);
                            } else if (lastDigit === 5) {
                                TBerat = Math.round(TBerat);
                                totalBeratBlock.value = TBerat.toFixed(2);
                            } else {
                                TBerat = Math.round(TBerat) + 1;
                                totalBeratBlock.value = TBerat.toFixed(2);
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        beratBlock.value =
                            parseFloat(selectedData[8]) /
                            parseFloat(selectedData[7]);
                        quantityBlock.value = selectedData[7];
                        totalBeratBlock.value = selectedData[8];
                        kounterBlock.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            beratBlock.readOnly = true;
                            quantityBlock.readOnly = true;
                            totalBeratBlock.readOnly = true;
                            kounterBlock.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Lami") {
                    //Javascript khusus untuk Form Komponen Lami FormKomponenLami.js
                    let kounterKomponenLami = document.getElementById(
                        "kounterKomponenLami"
                    );
                    let totalBeratKomponenLami = document.getElementById(
                        "totalBeratKomponenLami"
                    );
                    var inputElements = ["totalBeratKomponenLami"];

                    const createdCell = function (
                        cell,
                        cellData,
                        rowData,
                        rowIndex,
                        colIndex
                    ) {
                        //editable tableKomponenLami
                        let original;
                        cell.setAttribute("contenteditable", true);
                        cell.setAttribute("spellcheck", false);

                        cell.addEventListener("focus", function (e) {
                            original = e.target.textContent;
                        });

                        cell.addEventListener("blur", function (e) {
                            const newContent = e.target.textContent;

                            if (original !== e.target.textContent) {
                                const row = tableKomponenLami.row(
                                    e.target.parentElement
                                );
                                // Update the data in the DataTable's internal data store
                                row.data()[colIndex] = newContent;

                                // Invalidate and redraw the row to reflect the change
                                row.invalidate().draw();
                                console.log("Cell changed: ", e.target); // Logging the cell
                                console.log(
                                    "New content: ",
                                    e.target.textContent
                                ); // Logging the new content
                                console.log("Column index: ", colIndex); // Logging the column index
                                console.log(
                                    "Column name: ",
                                    tableKomponenLami.column(colIndex).header()
                                        .textContent
                                ); // Logging the column name
                                console.log("Row data: ", row.data()); // Logging the row data
                                console.log(
                                    cell,
                                    cellData,
                                    rowData,
                                    rowIndex,
                                    colIndex
                                ); // Logging all parameters
                                hitungBerat();
                            }
                        });
                    };

                    const tableKomponenLami = $("#tableKomponenLami").DataTable(
                        {
                            columnDefs: [
                                {
                                    targets: "_all",
                                    createdCell: createdCell,
                                },
                            ],
                        }
                    );

                    $.ajax({
                        url: "TabelHitunganJBB/getDataKomponenLami", // URL to your PHP script that fetches data
                        method: "GET",
                        dataType: "json",
                        data: { KodeBarang: nama_barang.value },
                        success: function (data) {
                            // Get the select element
                            console.log(data, KompVarKomponen);
                            $(document).ready(function () {
                                if (tableKomponenLami.data().any()) {
                                    tableKomponenLami.clear().draw();
                                }
                                data.forEach(function (obj) {
                                    tableKomponenLami.row
                                        .add([
                                            obj.Kode_Komponen,
                                            obj.Nama_Komponen,
                                            parseFloat(
                                                obj.Panjang_Potongan
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }),
                                            parseFloat(
                                                obj.Lebar_Potongan
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }),
                                            parseFloat(
                                                obj.Quantity ?? 0
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }),
                                            parseFloat(
                                                obj.Tebal ?? 0
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }),
                                            parseFloat(
                                                obj.Berat ?? 0
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }),
                                        ])
                                        .draw();
                                });
                            });
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching data:", error);
                        },
                    });

                    function hitungBerat() {
                        let totalBerat = 0;

                        tableKomponenLami
                            .rows()
                            .every(function (rowIdx, tableLoop, rowLoop) {
                                let data = this.data();
                                let panjang = parseFloat(data[2]);
                                let lebar = parseFloat(data[3]);
                                let beratSat = parseFloat(data[5]);
                                let qty = parseFloat(data[4]);
                                let kdKomponen = data[0];

                                let berat = 0;

                                if (kdKomponen !== "") {
                                    switch (kdKomponen.substring(0, 4)) {
                                        case "01BB":
                                            // Model U-panel, One side sewing
                                            if (
                                                kdKomponen.substring(0, 5) ===
                                                    "01BBU" ||
                                                kdKomponen.substring(0, 5) ===
                                                    "01BBI"
                                            ) {
                                                berat =
                                                    panjang *
                                                    lebar *
                                                    beratSat *
                                                    (0.92 / 10000) *
                                                    qty;
                                            } else {
                                                berat =
                                                    panjang *
                                                    (lebar + 4) *
                                                    beratSat *
                                                    (0.92 / 10000) *
                                                    qty;
                                            }
                                            // Model Tubular
                                            if (
                                                kdKomponen.substring(0, 5) ===
                                                "01BBT"
                                            ) {
                                                berat *= 2;
                                            }
                                            break;
                                        case "02BS":
                                            // Model U-panel, Four side sewing
                                            if (
                                                kdKomponen.substring(0, 5) ===
                                                    "01BBU" ||
                                                kdKomponen.substring(0, 5) ===
                                                    "01BB4" ||
                                                kdKomponen.substring(0, 5) ===
                                                    "01BBI"
                                            ) {
                                                berat =
                                                    panjang *
                                                    lebar *
                                                    beratSat *
                                                    (0.92 / 10000) *
                                                    qty;
                                            }
                                            break;
                                        default:
                                            berat =
                                                panjang *
                                                lebar *
                                                beratSat *
                                                (0.92 / 10000) *
                                                qty;
                                            break;
                                    }

                                    // Update the calculated weight in the table
                                    this.data()[6] =
                                        parseFloat(this.data()[6]) + berat;
                                    this.data()[6] = this.data()[6].toFixed(2);

                                    // Accumulate total weight
                                    totalBerat += parseFloat(this.data()[6]);
                                    // Update the total weight field
                                }
                            });
                        totalBeratKomponenLami.value = totalBerat.toFixed(2);
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        totalBeratKomponenLami.value = selectedData[8];
                        kounterKomponenLami.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            totalBeratKomponenLami.readOnly = true;
                            kounterKomponenLami.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Inner") {
                    //Javascript khusus untuk Form Komponen Inner FormKomponenInner.js
                    var inputElements = [
                        "tebalInnerKomponenInner",
                        "lebarKomponenInner",
                        "panjangKomponenInner",
                        "quantityKomponenInner",
                        "totalBeratKomponenInner",
                        "kounterKomponenInner",
                    ];
                    let tebalInnerKomponenInner = document.getElementById(
                        "tebalInnerKomponenInner"
                    );
                    let lebarKomponenInner =
                        document.getElementById("lebarKomponenInner");
                    let panjangKomponenInner = document.getElementById(
                        "panjangKomponenInner"
                    );
                    let quantityKomponenInner = document.getElementById(
                        "quantityKomponenInner"
                    );
                    let totalBeratKomponenInner = document.getElementById(
                        "totalBeratKomponenInner"
                    );
                    let kounterKomponenInner = document.getElementById(
                        "kounterKomponenInner"
                    );

                    tebalInnerKomponenInner.value = reinforced_inner.value;

                    if (tebalInnerKomponenInner.value > 0) {
                        if (
                            parseFloat(panjangKomponenInner.value) === 0 ||
                            parseFloat(lebarKomponenInner.value) === 0
                        ) {
                            let Diagonal,
                                Atas = 0,
                                Bawah = 0,
                                TempD = 0,
                                TempP = 0,
                                Keliling,
                                Jari;

                            // Calculate panjang
                            if (body_bentuk.value === "S") {
                                Diagonal = Math.sqrt(
                                    Math.pow(body_panjang.value, 2) +
                                        Math.pow(body_lebar.value, 2)
                                );
                                Diagonal = Math.round(Diagonal * 100) / 100;
                                if (cerobongAtas_bentuk.value === "C")
                                    Atas =
                                        (Diagonal -
                                            cerobongAtas_diameter.value) /
                                        2;
                                if (cerobongBawah_bentuk === "C")
                                    Bawah =
                                        (Diagonal -
                                            cerobongBawah_diameter.value) /
                                        2;
                            } else {
                                if (cerobongAtas_bentuk.value === "C")
                                    Atas =
                                        (body_diameter.value -
                                            cerobongAtas_diameter.value) /
                                        2;
                                if (cerobongBawah_bentuk.value === "C")
                                    Bawah =
                                        (body_diameter.value -
                                            cerobongBawah_diameter.value) /
                                        2;
                            }

                            if (cerobongBawah_model.value === "06CBCX") {
                                TempD = body_panjang.value;
                                TempP = Math.round((TempD / 2) * 100) / 100;
                                panjangKomponenInner.value =
                                    cerobongAtas_tinggi.value +
                                    Atas +
                                    body_tinggi.value +
                                    10 +
                                    TempP;
                            } else {
                                panjangKomponenInner.value =
                                    cerobongAtas_tinggi.value +
                                    Atas +
                                    body_tinggi.value +
                                    Bawah +
                                    20 +
                                    cerobongBawah_tinggi.value;
                            }

                            // Calculate lebar
                            if (body_bentuk.value === "S") {
                                lebarKomponenInner.value =
                                    body_panjang.value + body_lebar.value + 5;
                            } else {
                                Jari =
                                    Math.round(
                                        (body_diameter.value / 2) * 100
                                    ) / 100;
                                Keliling = 2 * 3.14 * Jari;
                                lebarKomponenInner.value = Keliling / 2 + 5;
                            }
                        }
                    }

                    quantityKomponenInner.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let TBerat, ReInb;

                        TBerat =
                            parseFloat(lebarKomponenInner.value) *
                            parseFloat(panjangKomponenInner.value) *
                            parseFloat(quantityKomponenInner.value) *
                            ((parseFloat(tebalInnerKomponenInner.value) /
                                10000) *
                                1.84);

                        // Pembulatan
                        let XDes = TBerat.toFixed(1);
                        if (parseInt(XDes[XDes.length - 1]) === 0) {
                            totalBeratKomponenInner.value = TBerat.toFixed(
                                2
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            if (parseInt(XDes[XDes.length - 1]) > 5) {
                                totalBeratKomponenInner.value = Math.round(
                                    TBerat
                                )
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else if (parseInt(XDes[XDes.length - 1]) === 5) {
                                TBerat = Math.round(TBerat);
                                totalBeratKomponenInner.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                TBerat = Math.round(TBerat) + 1;
                                totalBeratKomponenInner.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenInner.value = selectedData[2];
                        lebarKomponenInner.value = selectedData[3];
                        quantityKomponenInner.value = selectedData[7];
                        totalBeratKomponenInner.value = selectedData[8];
                        kounterKomponenInner.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenInner.readOnly = true;
                            lebarKomponenInner.readOnly = true;
                            quantityKomponenInner.readOnly = true;
                            totalBeratKomponenInner.readOnly = true;
                            kounterKomponenInner.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Pocket") {
                    //Javascript khusus untuk Form Komponen Pocket FormKomponenPocket.js
                    var inputElements = [
                        "panjangKomponenPocket",
                        "lebarKomponenPocket",
                        "quantityKomponenPocket",
                        "hargaPerMeterKomponenPocket",
                        "totalHargaKomponenPocket",
                        "kounterKomponenPocket",
                    ];
                    let panjangKomponenPocket = document.getElementById(
                        "panjangKomponenPocket"
                    );
                    let lebarKomponenPocket = document.getElementById(
                        "lebarKomponenPocket"
                    );
                    let quantityKomponenPocket = document.getElementById(
                        "quantityKomponenPocket"
                    );
                    let hargaPerMeterKomponenPocket = document.getElementById(
                        "hargaPerMeterKomponenPocket"
                    );
                    let totalHargaKomponenPocket = document.getElementById(
                        "totalHargaKomponenPocket"
                    );
                    let kounterKomponenPocket = document.getElementById(
                        "kounterKomponenPocket"
                    );

                    hargaPerMeterKomponenPocket.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Harga Per Meternya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let TBerat, ReInb;
                        ReInb = parseFloat(panjangKomponenPocket.value);
                        TBerat =
                            (ReInb / 100) *
                            (parseFloat(hargaPerMeterKomponenPocket.value) *
                                parseFloat(quantityKomponenPocket.value));

                        // Pembulatan
                        let XDes = TBerat.toFixed(1);
                        if (parseInt(XDes[XDes.length - 1]) === 0) {
                            totalHargaKomponenPocket.value = TBerat.toFixed(
                                2
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            if (parseInt(XDes[XDes.length - 1]) > 5) {
                                totalHargaKomponenPocket.value = Math.round(
                                    TBerat
                                )
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else if (parseInt(XDes[XDes.length - 1]) === 5) {
                                TBerat = Math.round(TBerat);
                                totalHargaKomponenPocket.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                TBerat = Math.round(TBerat) + 1;
                                totalHargaKomponenPocket.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenPocket.value = selectedData[2];
                        lebarKomponenPocket.value = selectedData[3];
                        quantityKomponenPocket.value = selectedData[7];
                        hargaPerMeterKomponenPocket.value = selectedData[9];
                        totalHargaKomponenPocket.value = selectedData[10];
                        kounterKomponenPocket.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenPocket.readOnly = true;
                            lebarKomponenPocket.readOnly = true;
                            quantityKomponenPocket.readOnly = true;
                            hargaPerMeterKomponenPocket.readOnly = true;
                            totalHargaKomponenPocket.readOnly = true;
                            kounterKomponenPocket.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Eva") {
                    //Javascript khusus untuk Form Komponen Eva FormKomponenEva.js
                    var inputElements = [
                        "panjangKomponenEva",
                        "lebarKomponenEva",
                        "quantityKomponenEva",
                        "hargaKomponenEva",
                        "kounterKomponenEva",
                        "beratKomponenEva",
                        "totalHargaKomponenEva",
                    ];
                    let panjangKomponenEva =
                        document.getElementById("panjangKomponenEva");
                    let lebarKomponenEva =
                        document.getElementById("lebarKomponenEva");
                    let quantityKomponenEva = document.getElementById(
                        "quantityKomponenEva"
                    );
                    let hargaKomponenEva =
                        document.getElementById("hargaKomponenEva");
                    let kounterKomponenEva =
                        document.getElementById("kounterKomponenEva");
                    let beratKomponenEva =
                        document.getElementById("beratKomponenEva");
                    let totalHargaKomponenEva = document.getElementById(
                        "totalHargaKomponenEva"
                    );

                    hargaKomponenEva.addEventListener("keypress", function (e) {
                        if (e.key == "Enter") {
                            if (this.value == "") {
                                this.classList.add("input-error");
                                this.setCustomValidity(
                                    "Isi dulu Harga Per Meternya!"
                                );
                                this.reportValidity();
                            } else {
                                this.classList.remove("input-error");
                                this.setCustomValidity("");
                                hitungBerat();
                            }
                        }
                    });

                    function hitungBerat() {
                        let TBerat =
                            (parseFloat(panjangKomponenEva.value) *
                                parseFloat(lebarKomponenEva.value) *
                                parseFloat(quantityKomponenEva.value) *
                                parseFloat(hargaKomponenEva.value)) /
                            (120 * 240);

                        // Pembulatan
                        let XDes = TBerat.toFixed(1);
                        if (parseInt(XDes[XDes.length - 1]) === 0) {
                            totalHargaKomponenEva.value = TBerat.toFixed(
                                2
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            if (parseInt(XDes[XDes.length - 1]) > 5) {
                                totalHargaKomponenEva.value = Math.round(TBerat)
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else if (parseInt(XDes[XDes.length - 1]) === 5) {
                                TBerat = Math.round(TBerat);
                                totalHargaKomponenEva.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                TBerat = Math.round(TBerat) + 1;
                                totalHargaKomponenEva.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenEva.value = selectedData[2];
                        lebarKomponenEva.value = selectedData[3];
                        quantityKomponenEva.value = selectedData[7];
                        beratKomponenEva.value = selectedData[8];
                        hargaKomponenEva.value = selectedData[9];
                        totalHargaKomponenEva.value = selectedData[10];
                        kounterKomponenEva.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenEva.readOnly = true;
                            lebarKomponenEva.readOnly = true;
                            quantityKomponenEva.readOnly = true;
                            beratKomponenEva.readOnly = true;
                            hargaKomponenEva.readOnly = true;
                            totalHargaKomponenEva.readOnly = true;
                            kounterKomponenEva.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Benang") {
                    var inputElements = [
                        "hargaBenangPerKgKomponenBenang",
                        "totalHargaKomponenBenang",
                        "kebutuhanKomponenBenang",
                    ];
                    let hargaBenangPerKgKomponenBenang =
                        document.getElementById(
                            "hargaBenangPerKgKomponenBenang"
                        );
                    let totalHargaKomponenBenang = document.getElementById(
                        "totalHargaKomponenBenang"
                    );
                    let kebutuhanKomponenBenang = document.getElementById(
                        "kebutuhanKomponenBenang"
                    );
                    let kounterKomponenBenang = document.getElementById(
                        "kounterKomponenBenang"
                    );
                    let denier1KomponenBenang = document.getElementById(
                        "denier1KomponenBenang"
                    );
                    let denier2KomponenBenang = document.getElementById(
                        "denier2KomponenBenang"
                    );
                    let denierKomponenBenang;

                    if (denier1KomponenBenang.checked) {
                        denierKomponenBenang = denier1KomponenBenang.value;
                    } else {
                        denierKomponenBenang = denier2KomponenBenang.value;
                    }

                    kebutuhanKomponenBenang.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Kebutuhannya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let TBerat, ReInb;
                        ReInb = parseFloat(
                            hargaBenangPerKgKomponenBenang.value
                        );
                        TBerat =
                            (ReInb / 1000) *
                            parseFloat(kebutuhanKomponenBenang.value);

                        // Pembulatan
                        let XDes = TBerat.toFixed(1);
                        if (parseInt(XDes[XDes.length - 1]) === 0) {
                            totalHargaKomponenBenang.value = TBerat.toFixed(
                                2
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            if (parseInt(XDes[XDes.length - 1]) > 5) {
                                totalHargaKomponenBenang.value = Math.round(
                                    TBerat
                                )
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else if (parseInt(XDes[XDes.length - 1]) === 5) {
                                TBerat = Math.round(TBerat);
                                totalHargaKomponenBenang.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                TBerat = Math.round(TBerat) + 1;
                                totalHargaKomponenBenang.value = TBerat.toFixed(
                                    2
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        hargaBenangPerKgKomponenBenang.value = selectedData[9];
                        totalHargaKomponenBenang.value = selectedData[10];
                        kebutuhanKomponenBenang.value = selectedData[8];
                        kounterKomponenBenang.value = selectedData[11];
                        if (selectedData[6] == 2600) {
                            denier2KomponenBenang.checked = true;
                        } else {
                            denier1KomponenBenang.checked = true;
                        }
                        if (KompVarKomponen == 3) {
                            hargaBenangPerKgKomponenBenang.readOnly = true;
                            totalHargaKomponenBenang.readOnly = true;
                            kebutuhanKomponenBenang.readOnly = true;
                            kounterKomponenBenang.readOnly = true;
                            denier2KomponenBenang.disabled = true;
                            denier1KomponenBenang.disabled = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Ongkos") {
                    //Javascript khusus untuk Form Komponen Ongkos FormKomponenOngkos.js
                    var inputElements = [
                        "totalBeratKomponenKomponenOngkos",
                        "beratInnerLinerKomponenOngkos",
                        "hargaPerKgKomponenOngkos",
                        "totalHargaKomponenOngkos",
                    ];
                    let totalBeratKomponenKomponenOngkos =
                        document.getElementById(
                            "totalBeratKomponenKomponenOngkos"
                        );
                    let beratInnerLinerKomponenOngkos = document.getElementById(
                        "beratInnerLinerKomponenOngkos"
                    );
                    let hargaPerKgKomponenOngkos = document.getElementById(
                        "hargaPerKgKomponenOngkos"
                    );
                    let totalHargaKomponenOngkos = document.getElementById(
                        "totalHargaKomponenOngkos"
                    );
                    let kounterKomponenOngkos = document.getElementById(
                        "kounterKomponenOngkos"
                    );

                    $.ajax({
                        url: "TabelHitunganJBB/getTotalBeratKomponenKomponenOngkos", // URL to your PHP script that fetches data
                        method: "GET",
                        dataType: "json",
                        data: { KodeBarang: nama_barang.value },
                        success: function (data) {
                            // Get the select element
                            console.log(data);
                            totalBeratKomponenKomponenOngkos.value =
                                data[0][0].total_berat;
                            beratInnerLinerKomponenOngkos.value =
                                data[1][0].Berat;
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching data:", error);
                        },
                    });

                    hargaPerKgKomponenOngkos.focus();

                    hargaPerKgKomponenOngkos.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Kebutuhannya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );
                    function hitungBerat() {
                        var TBerat, ReInb;
                        ReInb = parseFloat(hargaPerKgKomponenOngkos.value);
                        TBerat =
                            ((parseFloat(
                                totalBeratKomponenKomponenOngkos.value
                            ) -
                                parseFloat(
                                    beratInnerLinerKomponenOngkos.value
                                )) /
                                1000) *
                            parseFloat(hargaPerKgKomponenOngkos.value);

                        // Pembulatan
                        var XDes = TBerat.toFixed(1).toString();
                        if (parseInt(XDes.slice(-1)) === 0) {
                            totalHargaKomponenOngkos.value = TBerat.toFixed(
                                2
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            if (parseInt(XDes.slice(-1)) > 5) {
                                totalHargaKomponenOngkos.value = Math.round(
                                    TBerat
                                )
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                if (parseInt(XDes.slice(-1)) === 5) {
                                    TBerat = Math.round(TBerat);
                                    totalHargaKomponenOngkos.value =
                                        TBerat.toFixed(2).replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        );
                                } else {
                                    TBerat = Math.round(TBerat) + 1;
                                    totalHargaKomponenOngkos.value =
                                        TBerat.toFixed(2).replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        );
                                }
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        hargaPerKgKomponenOngkos.value = selectedData[9];
                        totalHargaKomponenOngkos.value = selectedData[10];
                        kounterKomponenOngkos.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            hargaPerKgKomponenOngkos.readOnly = true;
                            totalHargaKomponenOngkos.readOnly = true;
                            kounterKomponenOngkos.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Dust") {
                    //Javascript khusus untuk Form Komponen Dust FormKomponenDust.js
                    var inputElements = [
                        "beratKomponenDust",
                        "hargaPerKgKomponenDust",
                        "totalHargaKomponenDust",
                    ];
                    let beratKomponenDust =
                        document.getElementById("beratKomponenDust");
                    let hargaPerKgKomponenDust = document.getElementById(
                        "hargaPerKgKomponenDust"
                    );
                    let totalHargaKomponenDust = document.getElementById(
                        "totalHargaKomponenDust"
                    );
                    let kounterKomponenDust = document.getElementById(
                        "kounterKomponenDust"
                    );

                    hargaPerKgKomponenDust.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Kebutuhannya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        var TBerat, ReInb;
                        ReInb = parseFloat(hargaPerKgKomponenDust.value);
                        TBerat =
                            (ReInb / 1000) *
                            parseFloat(beratKomponenDust.value);

                        // Pembulatan
                        var XDes = TBerat.toFixed(1).toString();
                        if (parseInt(XDes.slice(-1)) === 0) {
                            totalHargaKomponenDust.value = TBerat.toFixed(
                                2
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            if (parseInt(XDes.slice(-1)) > 5) {
                                totalHargaKomponenDust.value = Math.round(
                                    TBerat
                                )
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                if (parseInt(XDes.slice(-1)) === 5) {
                                    TBerat = Math.round(TBerat);
                                    totalHargaKomponenDust.value =
                                        TBerat.toFixed(2).replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        );
                                } else {
                                    TBerat = Math.round(TBerat) + 1;
                                    totalHargaKomponenDust.value =
                                        TBerat.toFixed(2).replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        );
                                }
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        if (Kode_Komponen.includes("25OB")) {
                            //Form Komponen Obras
                            beratKomponenDust.value = selectedData[8];
                            kounterKomponenDust.value = selectedData[11];
                            hargaPerKgKomponenDust.value = 0;
                            totalHargaKomponenDust.value = 0;
                            hargaPerKgKomponenDust.style.visibility = "hidden";
                            totalHargaKomponenDust.style.visibility = "hidden";
                        } else {
                            //Form Komponen Dust
                            beratKomponenDust.value = selectedData[8];
                            hargaPerKgKomponenDust.value = selectedData[9];
                            totalHargaKomponenDust.value = selectedData[10];
                            kounterKomponenDust.value = selectedData[11];
                        }
                        if (KompVarKomponen == 3) {
                            beratKomponenDust.readOnly = true;
                            kounterKomponenDust.readOnly = true;
                            hargaPerKgKomponenDust.readOnly = true;
                            totalHargaKomponenDust.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Katun") {
                    //Javascript khusus untuk Form Komponen Katun FormKomponenKatun.js
                    var inputElements = [
                        "panjangKomponenKatun",
                        "lebarKomponenKatun",
                        "beratPerMeterKomponenKatun",
                        "quantityKomponenKatun",
                        "hargaPerKgKomponenKatun",
                        "totalBeratKomponenKatun",
                        "totalHargaKomponenKatun",
                    ];
                    let panjangKomponenKatun = document.getElementById(
                        "panjangKomponenKatun"
                    );
                    let lebarKomponenKatun =
                        document.getElementById("lebarKomponenKatun");
                    let beratPerMeterKomponenKatun = document.getElementById(
                        "beratPerMeterKomponenKatun"
                    );
                    let quantityKomponenKatun = document.getElementById(
                        "quantityKomponenKatun"
                    );
                    let hargaPerKgKomponenKatun = document.getElementById(
                        "hargaPerKgKomponenKatun"
                    );
                    let totalBeratKomponenKatun = document.getElementById(
                        "totalBeratKomponenKatun"
                    );
                    let totalHargaKomponenKatun = document.getElementById(
                        "totalHargaKomponenKatun"
                    );
                    let kounterKomponenKatun = document.getElementById(
                        "kounterKomponenKatun"
                    );

                    $.ajax({
                        url: "TabelHitunganJBB/getLebarKomponenKatun", // URL to your PHP script that fetches data
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            // Get the select element
                            const selectElement = $("#lebarKomponenKatun");

                            // Loop through the data and create an option element for each item
                            data.forEach((item) => {
                                // Create a new option element
                                const newOption = $("<option></option>")
                                    .val(item.Lebar) // Set the value of the option element
                                    .text(item.Lebar + " | " + item.Brt_Sat); // Set the text content of the option element

                                // Append the option element to the select element
                                selectElement.append(newOption);
                            });
                            lebarKomponenKatun.addEventListener(
                                "change",
                                function (e) {
                                    beratPerMeterKomponenKatun.value =
                                        lebarKomponenKatun.options[
                                            lebarKomponenKatun.selectedIndex
                                        ].text
                                            .split("|")[1]
                                            .trim();
                                }
                            );
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching data:", error);
                        },
                    });

                    quantityKomponenKatun.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    if (KompVarKomponen == 2) {
                                        hargaPerKgKomponenKatun.readOnly = false;
                                    }
                                    hargaPerKgKomponenKatun.focus();
                                }
                            }
                        }
                    );
                    quantityKomponenKatun.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let subtotal =
                            parseFloat(beratPerMeterKomponenKatun.value) *
                            parseFloat(panjangKomponenKatun.value) *
                            parseFloat(quantityKomponenKatun.value) *
                            10;
                        totalBeratKomponenKatun.value = subtotal;

                        let totalHarga =
                            (subtotal / 1000) *
                            parseFloat(hargaPerKgKomponenKatun.value);
                        totalHargaKomponenKatun.value =
                            parseFloat(totalHarga).toFixed(2);
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenKatun.value = selectedData[2];
                        lebarKomponenKatun.value = selectedData[3];
                        quantityKomponenKatun.value = selectedData[7];
                        hargaPerKgKomponenKatun.value = selectedData[9];
                        totalBeratKomponenKatun.value = selectedData[8];
                        totalHargaKomponenKatun.value = selectedData[10];
                        kounterKomponenKatun.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenKatun.readOnly = true;
                            lebarKomponenKatun.readOnly = true;
                            quantityKomponenKatun.readOnly = true;
                            hargaPerKgKomponenKatun.readOnly = true;
                            totalBeratKomponenKatun.readOnly = true;
                            totalHargaKomponenKatun.readOnly = true;
                            kounterKomponenKatun.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Kertas") {
                    //Javascript khusus untuk Form Komponen Kertas FormKomponenKertas.js
                    var inputElements = [
                        "panjangKomponenKertas",
                        "GSMKomponenKertas",
                        "lebarKomponenKertas",
                        "quantityKomponenKertas",
                        "totalBeratKomponenKertas",
                    ];
                    let panjangKomponenKertas = document.getElementById(
                        "panjangKomponenKertas"
                    );
                    let GSMKomponenKertas =
                        document.getElementById("GSMKomponenKertas");
                    let lebarKomponenKertas = document.getElementById(
                        "lebarKomponenKertas"
                    );
                    let quantityKomponenKertas = document.getElementById(
                        "quantityKomponenKertas"
                    );
                    let totalBeratKomponenKertas = document.getElementById(
                        "totalBeratKomponenKertas"
                    );
                    let kounterKomponenKertas = document.getElementById(
                        "kounterKomponenKertas"
                    );

                    quantityKomponenKertas.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        let TBerat =
                            ((panjangKomponenKertas.value *
                                lebarKomponenKertas.value) /
                                10000) *
                            GSMKomponenKertas.value *
                            quantityKomponenKertas;
                        totalBeratKomponenKertas.value = TBerat;
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenKertas.value = selectedData[2];
                        lebarKomponenKertas.value = selectedData[3];
                        GSMKomponenKertas.value = selectedData[6];
                        quantityKomponenKertas.value = selectedData[7];
                        totalBeratKomponenKertas.value = selectedData[8];
                        //hargaKomponenKertas tidak dipakai
                        kounterKomponenKertas.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenKertas.readOnly = true;
                            lebarKomponenKertas.readOnly = true;
                            GSMKomponenKertas.readOnly = true;
                            quantityKomponenKertas.readOnly = true;
                            totalBeratKomponenKertas.readOnly = true;
                            kounterKomponenKertas.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Kain") {
                    //Javascript khusus untuk Form Komponen Kain FormKomponenKain.js
                    var inputElements = [
                        "hargaKomponenKain",
                        "panjangKomponenKain",
                        "lebarKomponenKain",
                        "GSMKomponenKain",
                        "quantityKomponenKain",
                        "totalBeratKomponenKain",
                    ];
                    let hargaKomponenKain =
                        document.getElementById("hargaKomponenKain");
                    let panjangKomponenKain = document.getElementById(
                        "panjangKomponenKain"
                    );
                    let lebarKomponenKain =
                        document.getElementById("lebarKomponenKain");
                    let GSMKomponenKain =
                        document.getElementById("GSMKomponenKain");
                    let quantityKomponenKain = document.getElementById(
                        "quantityKomponenKain"
                    );
                    let totalBeratKomponenKain = document.getElementById(
                        "totalBeratKomponenKain"
                    );
                    let kounterKomponenKain = document.getElementById(
                        "kounterKomponenKain"
                    );

                    quantityKomponenKain.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    hitungBerat();
                                }
                            }
                        }
                    );

                    function hitungBerat() {
                        const panjang = parseFloat(panjangKomponenKain.value);
                        const lebar = parseFloat(lebarKomponenKain.value);
                        const gsm = parseFloat(GSMKomponenKain.value);
                        const quantity = parseFloat(quantityKomponenKain.value);

                        // Calculate total weight
                        let tBerat =
                            ((panjang * lebar) / 10000) * gsm * quantity;

                        // Rounding
                        const xDes = tBerat.toFixed(1);
                        const lastDigit = parseInt(
                            xDes.charAt(xDes.length - 1),
                            10
                        );

                        if (lastDigit === 0) {
                            totalBeratKomponenKain.value = tBerat.toFixed(2);
                        } else {
                            if (lastDigit > 5) {
                                totalBeratKomponenKain.value =
                                    Math.round(tBerat).toFixed(2);
                            } else if (lastDigit === 5) {
                                tBerat = Math.round(tBerat);
                                totalBeratKomponenKain.value =
                                    tBerat.toFixed(2);
                            } else {
                                tBerat = Math.round(tBerat) + 1;
                                totalBeratKomponenKain.value =
                                    tBerat.toFixed(2);
                            }
                        }
                    }
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenKain.value = selectedData[2];
                        lebarKomponenKain.value = selectedData[3];
                        GSMKomponenKain.value = selectedData[6];
                        quantityKomponenKain.value = selectedData[7];
                        totalBeratKomponenKain.value = selectedData[8];
                        //hargaKomponenKain tidak dipakai
                        kounterKomponenKain.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenKain.readOnly = true;
                            lebarKomponenKain.readOnly = true;
                            GSMKomponenKain.readOnly = true;
                            quantityKomponenKain.readOnly = true;
                            totalBeratKomponenKain.readOnly = true;
                            kounterKomponenKain.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Benang Katun") {
                    //Javascript khusus untuk Form Komponen Benang Katun FormKomponenBenangKatun.js
                    var inputElements = [
                        "panjangKomponenBenangKatun",
                        "lebarKomponenBenangKatun",
                        "beratStdKomponenBenangKatun",
                        "quantityKomponenBenangKatun",
                        "totalBeratKomponenBenangKatun",
                    ];
                    let panjangKomponenBenangKatun = document.getElementById(
                        "panjangKomponenBenangKatun"
                    );
                    let lebarKomponenBenangKatun = document.getElementById(
                        "lebarKomponenBenangKatun"
                    );
                    let beratStdKomponenBenangKatun = document.getElementById(
                        "beratStdKomponenBenangKatun"
                    );
                    let quantityKomponenBenangKatun = document.getElementById(
                        "quantityKomponenBenangKatun"
                    );
                    let totalBeratKomponenBenangKatun = document.getElementById(
                        "totalBeratKomponenBenangKatun"
                    );
                    let kounterKomponenBenangKatun = document.getElementById(
                        "kounterKomponenBenangKatun"
                    );

                    $.ajax({
                        url: "TabelHitunganJBB/getLebarKomponenBenangKatun", // URL to your PHP script that fetches data
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            // Get the select element
                            const selectElement = $(
                                "#lebarKomponenBenangKatun"
                            );

                            // Loop through the data and create an option element for each item
                            data.forEach((item) => {
                                // Create a new option element
                                const newOption = $("<option></option>")
                                    .val(item.Lebar) // Set the value of the option element
                                    .text(item.Lebar + " | " + item.Brt_Sat); // Set the text content of the option element

                                // Append the option element to the select element
                                selectElement.append(newOption);
                            });
                            lebarKomponenBenangKatun.addEventListener(
                                "change",
                                function (e) {
                                    beratStdKomponenBenangKatun.value =
                                        lebarKomponenBenangKatun.options[
                                            lebarKomponenBenangKatun
                                                .selectedIndex
                                        ].text
                                            .split("|")[1]
                                            .trim();
                                }
                            );
                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching data:", error);
                        },
                    });

                    quantityKomponenBenangKatun.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    totalBeratKomponenBenangKatun.value = (
                                        parseFloat(
                                            panjangKomponenBenangKatun.value
                                        ) *
                                        parseFloat(
                                            beratStdKomponenBenangKatun.value
                                        ) *
                                        parseFloat(
                                            quantityKomponenBenangKatun.value
                                        )
                                    ).toFixed(1);
                                }
                            }
                        }
                    );
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenBenangKatun.value = selectedData[2];
                        lebarKomponenBenangKatun.value = selectedData[3];
                        quantityKomponenBenangKatun.value = selectedData[7];
                        totalBeratKomponenBenangKatun.value = selectedData[8];
                        beratStdKomponenBenangKatun.value =
                            totalBeratKomponenBenangKatun.value /
                            (panjangKomponenBenangKatun.value *
                                quantityKomponenBenangKatun.value);
                        //hargaKomponenKain tidak dipakai
                        kounterKomponenBenangKatun.value = selectedData[11];
                        if (KompVarKomponen == 3) {
                            panjangKomponenBenangKatun.readOnly = true;
                            lebarKomponenBenangKatun.readOnly = true;
                            quantityKomponenBenangKatun.readOnly = true;
                            totalBeratKomponenBenangKatun.readOnly = true;
                            beratStdKomponenBenangKatun.readOnly = true;
                            kounterKomponenBenangKatun.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Karet") {
                    //Javascript khusus untuk Form Komponen Karet FormKomponenKaret.js
                    var inputElements = [
                        "panjangKomponenKaret",
                        "lebarKomponenKaret",
                        "beratPerMeterKomponenKaret",
                        "quantityKomponenKaret",
                        "totalBeratKomponenKaret",
                    ];
                    let panjangKomponenKaret = document.getElementById(
                        "panjangKomponenKaret"
                    );
                    let lebarKomponenKaret =
                        document.getElementById("lebarKomponenKaret");
                    let beratPerMeterKomponenKaret = document.getElementById(
                        "beratPerMeterKomponenKaret"
                    );
                    let quantityKomponenKaret = document.getElementById(
                        "quantityKomponenKaret"
                    );
                    let totalBeratKomponenKaret = document.getElementById(
                        "totalBeratKomponenKaret"
                    );
                    let kounterKomponenKaret = document.getElementById(
                        "kounterKomponenKaret"
                    );

                    quantityKomponenKaret.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    totalBeratKomponenKaret.value = (
                                        (parseFloat(
                                            panjangKomponenKaret.value
                                        ) /
                                            100) *
                                        parseFloat(
                                            beratPerMeterKomponenKaret.value
                                        ) *
                                        parseFloat(quantityKomponenKaret.value)
                                    ).toFixed(2);
                                }
                            }
                        }
                    );
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        panjangKomponenKaret.value = selectedData[2];
                        lebarKomponenKaret.value = selectedData[3];
                        quantityKomponenKaret.value = selectedData[7];
                        totalBeratKomponenKaret.value = selectedData[8];
                        kounterKomponenKaret.value = selectedData[11];
                        beratPerMeterKomponenKaret.value = parseFloat(
                            parseFloat(totalBeratKomponenKaret.value) /
                                (parseFloat(panjangKomponenKaret.value / 100) *
                                    parseFloat(quantityKomponenKaret.value))
                        ).toFixed(2);
                        if (KompVarKomponen == 3) {
                            panjangKomponenKaret.readOnly = true;
                            lebarKomponenKaret.readOnly = true;
                            quantityKomponenKaret.readOnly = true;
                            totalBeratKomponenKaret.readOnly = true;
                            kounterKomponenKaret.readOnly = true;
                            beratPerMeterKomponenKaret.readOnly = true;
                        }
                    }
                } else if (typeForm == "Form Komponen Carbon") {
                    //Javascript khusus untuk Form Komponen Carbon FormKomponenCarbon.js
                    var inputElements = [
                        "lebarKomponenCarbon",
                        "panjangKomponenCarbon",
                        "tebalKomponenCarbon",
                        "quantityKomponenCarbon",
                        "totalBeratKomponenCarbon",
                    ];
                    let lebarKomponenCarbon = document.getElementById(
                        "lebarKomponenCarbon"
                    );
                    let panjangKomponenCarbon = document.getElementById(
                        "panjangKomponenCarbon"
                    );
                    let tebalKomponenCarbon = document.getElementById(
                        "tebalKomponenCarbon"
                    );
                    let quantityKomponenCarbon = document.getElementById(
                        "quantityKomponenCarbon"
                    );
                    let totalBeratKomponenCarbon = document.getElementById(
                        "totalBeratKomponenCarbon"
                    );
                    let kounterKomponenCarbon = document.getElementById(
                        "kounterKomponenCarbon"
                    );

                    quantityKomponenCarbon.addEventListener(
                        "keypress",
                        function (e) {
                            if (e.key == "Enter") {
                                if (this.value == "") {
                                    this.classList.add("input-error");
                                    this.setCustomValidity(
                                        "Isi dulu Quantitynya!"
                                    );
                                    this.reportValidity();
                                } else {
                                    this.classList.remove("input-error");
                                    this.setCustomValidity("");
                                    const TBerat =
                                        Math.round(
                                            ((parseFloat(
                                                panjangKomponenCarbon.value
                                            ) *
                                                (parseFloat(
                                                    lebarKomponenCarbon.value
                                                ) *
                                                    0.92 *
                                                    parseFloat(
                                                        tebalKomponenCarbon.value
                                                    ) *
                                                    parseFloat(
                                                        quantityKomponenCarbon.value
                                                    ))) /
                                                10000) *
                                                100
                                        ) / 100;
                                    totalBeratKomponenCarbon.value = TBerat;
                                }
                            }
                        }
                    );
                    if (KompVarKomponen == 2 || KompVarKomponen == 3) {
                        const selectedData = $("#tabelData")
                            .DataTable()
                            .row(".selected")
                            .data();
                        lebarKomponenCarbon.value = selectedData[3];
                        panjangKomponenCarbon.value = selectedData[2];
                        quantityKomponenCarbon.value = selectedData[7];
                        totalBeratKomponenCarbon.value = selectedData[8];
                        kounterKomponenCarbon.value = selectedData[11];
                        tebalKomponenCarbon.value = (
                            Math.round(
                                ((parseFloat(totalBeratKomponenCarbon.value) *
                                    10000) /
                                    (parseFloat(panjangKomponenCarbon.value) *
                                        parseFloat(lebarKomponenCarbon.value) *
                                        0.92)) *
                                    100
                            ) / 100
                        ).toFixed(2);
                        if (KompVarKomponen == 3) {
                            lebarKomponenCarbon.readOnly = true;
                            panjangKomponenCarbon.readOnly = true;
                            quantityKomponenCarbon.readOnly = true;
                            totalBeratKomponenCarbon.readOnly = true;
                            kounterKomponenCarbon.readOnly = true;
                            tebalKomponenCarbon.readOnly = true;
                        }
                    }
                }

                inputElements.forEach(function (id) {
                    let element = document.getElementById(id);

                    element.addEventListener("keypress", function (e) {
                        if (e.key == "Enter") {
                            e.preventDefault(); // Prevent the default action of the Enter key

                            if (this.value == "") {
                                this.value = 0;
                            }

                            var value = parseFloat(this.value);
                            if (!isNaN(value)) {
                                this.value = parseFloat(value).toFixed(2);
                            }

                            // Find the next input element that is not readonly or disabled
                            let nextElement = getNextFocusableElement(this);
                            if (nextElement) {
                                nextElement.focus();
                            }
                        }
                    });
                });

                function getNextFocusableElement(currentElement) {
                    let elements = document.querySelectorAll(
                        "input, select, textarea"
                    );
                    let currentIndex = Array.prototype.indexOf.call(
                        elements,
                        currentElement
                    );

                    for (let i = currentIndex + 1; i < elements.length; i++) {
                        if (!elements[i].readOnly && !elements[i].disabled) {
                            return elements[i];
                        }
                    }
                    return null;
                }
            });
        },
        preConfirm: () => {
            return new Promise((resolve) => {
                // Perform some async operation, e.g., form validation
                setTimeout(() => {
                    // Re-enable the confirm button
                    resolve();
                }, 2000); // simulate a delay of 2 seconds
            });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            if (typeForm == "Form Komponen General") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenGeneral.value,
                            Lebar: lebarKomponenGeneral.value,
                            WA: warpKomponenGeneral.value,
                            WE: weftKomponenGeneral.value,
                            Denier: denierKomponenGeneral.value,
                            Quantity: quantityKomponenGeneral.value,
                            Berat: beratKomponenGeneral.value,
                            BeratWA: berat_warpKomponenGeneral.value,
                            BeratWE: berat_weftKomponenGeneral.value,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: denier_warpKomponenGeneral.value,
                            DenierWE: denier_weftKomponenGeneral.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenGeneral.value,
                            Lebar: lebarKomponenGeneral.value,
                            WA: warpKomponenGeneral.value,
                            WE: weftKomponenGeneral.value,
                            Denier: denierKomponenGeneral.value,
                            Quantity: quantityKomponenGeneral.value,
                            Berat: beratKomponenGeneral.value,
                            BeratWA: berat_warpKomponenGeneral.value,
                            BeratWE: berat_weftKomponenGeneral.value,
                            Harga: hargaKomponenGeneral.value,
                            SubTotal: subtotalKomponenGeneral.value,
                            Kounter: kounterKomponenGeneral.value,
                            DenierWA: denier_warpKomponenGeneral.value,
                            DenierWE: denier_weftKomponenGeneral.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenGeneral.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Circular") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenCircular.value,
                            Lebar: lebarKomponenCircular.value,
                            WA: warpKomponenCircular.value,
                            WE: weftKomponenCircular.value,
                            Denier: denierKomponenCircular.value,
                            Quantity: quantityKomponenCircular.value,
                            Berat: beratKomponenCircular.value,
                            BeratWA: berat_warpKomponenCircular.value,
                            BeratWE: berat_weftKomponenCircular.value,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: denier_warpKomponenCircular.value,
                            DenierWE: denier_weftKomponenCircular.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenCircular.value,
                            Lebar: lebarKomponenCircular.value,
                            WA: warpKomponenCircular.value,
                            WE: weftKomponenCircular.value,
                            Denier: denierKomponenCircular.value,
                            Quantity: quantityKomponenCircular.value,
                            Berat: beratKomponenCircular.value,
                            BeratWA: berat_warpKomponenCircular.value,
                            BeratWE: berat_weftKomponenCircular.value,
                            Harga: hargaKomponenCircular.value,
                            SubTotal: subtotalKomponenCircular.value,
                            Kounter: kounterKomponenCircular.value,
                            DenierWA: denier_warpKomponenCircular.value,
                            DenierWE: denier_weftKomponenCircular.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenCircular.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Square") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenSquare.value,
                            Lebar: lebarKomponenSquare.value,
                            WA: warpKomponenSquare.value,
                            WE: weftKomponenSquare.value,
                            Denier: denierKomponenSquare.value,
                            Quantity: quantityKomponenSquare.value,
                            Berat: beratKomponenSquare.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: denier_warpKomponenSquare.value,
                            DenierWE: denier_weftKomponenSquare.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenSquare.value,
                            Lebar: lebarKomponenSquare.value,
                            WA: warpKomponenSquare.value,
                            WE: weftKomponenSquare.value,
                            Denier: denierKomponenSquare.value,
                            Quantity: quantityKomponenSquare.value,
                            Berat: beratKomponenSquare.value,
                            BeratWA: berat_warpKomponenSquare.value,
                            BeratWE: berat_weftKomponenSquare.value,
                            Harga: hargaKomponenSquare.value,
                            SubTotal: subtotalKomponenSquare.value,
                            Kounter: kounterKomponenSquare.value,
                            DenierWA: denier_warpKomponenSquare.value,
                            DenierWE: denier_weftKomponenSquare.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenSquare.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Rope") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenRope.value,
                            Lebar: lebarKomponenRope.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenRope.value,
                            Berat: totalBeratKomponenRope.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenRope.value,
                            Lebar: diameterKomponenRope.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenRope.value,
                            Berat: totalBeratKomponenRope.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenRope.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenRope.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Belt") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenBelt.value,
                            Lebar: lebarKomponenBelt.value,
                            WA: 0,
                            WE: 0,
                            Denier: denierKomponenBelt.value,
                            Quantity: quantityKomponenBelt.value,
                            Berat: totalBeratKomponenBelt.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenBelt.value,
                            Lebar: lebarKomponenBelt.value,
                            WA: 0,
                            WE: 0,
                            Denier: denierKomponenBelt.value,
                            Quantity: quantityKomponenBelt.value,
                            Berat: totalBeratKomponenBelt.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: totalBeratKomponenBelt.value,
                            Kounter: kounterKomponenBelt.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenBelt.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Selang") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenSelang.value,
                            Lebar: diameterKomponenSelang.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenSelang.value,
                            Berat: totalBeratKomponenSelang.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenSelang.value,
                            Lebar: diameterKomponenSelang.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenSelang.value,
                            Berat: totalBeratKomponenSelang.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: totalBeratKomponenSelang.value,
                            Kounter: kounterKomponenSelang.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenSelang.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Block") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityBlock.value,
                            Berat: totalBeratBlock.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        beforeSend: function () {
                            // Show loading screen
                            $("#loading-screen").css("display", "flex");
                        },
                        complete: function () {
                            // Hide loading screen
                            $("#loading-screen").css("display", "none");
                        },
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityBlock.value,
                            Berat: beratBlock.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: totalBeratBlock.value,
                            Kounter: kounterBlock.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        beforeSend: function () {
                            // Show loading screen
                            $("#loading-screen").css("display", "flex");
                        },
                        complete: function () {
                            // Hide loading screen
                            $("#loading-screen").css("display", "none");
                        },
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterBlock.value,
                        }, // Pass the data with csrf_tokern
                        beforeSend: function () {
                            // Show loading screen
                            $("#loading-screen").css("display", "flex");
                        },
                        complete: function () {
                            // Hide loading screen
                            $("#loading-screen").css("display", "none");
                        },
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Lami") {
                let tableKomponenLami = $("#tableKomponenLami").DataTable();
                let totalBeratKomponenLami = document.getElementById("totalBeratKomponenLami")
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: 0,
                            Berat: totalBeratKomponenLami.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        beforeSend: function () {
                            // Show loading screen
                            $("#loading-screen").css("display", "flex");
                        },
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                let gridLamiData = [];
                                tableKomponenLami.rows().every(function () {
                                    let data = this.data();
                                    gridLamiData.push({
                                        KodeKomponen: data[0],
                                        Panjang: parseFloat(data[2]),
                                        Lebar: parseFloat(data[3]),
                                        Tebal: parseFloat(data[5]),
                                        Berat: parseFloat(data[6]),
                                    });
                                });
                                $.ajax({
                                    type: "POST", // or 'GET' depending on your server setup
                                    url: "TabelHitunganJBB", // Specify the URL of your controller
                                    data: {
                                        _token: csrfToken,
                                        mode_insert: "KomponenLami",
                                        KodeBarang: nama_barang.value,
                                        gridLamiData: gridLamiData,
                                    }, // Pass the data with csrf_tokern
                                    beforeSend: function () {
                                        // Show loading screen
                                        $("#loading-screen").css("display", "flex");
                                    },
                                    success: function (response) {
                                        // Handle the successful response from the controller
                                        $("#loading-screen").css("display", "none");
                                        if (response.success) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Pemberitahuan",
                                                text: "Komponen baru sudah disimpan !",
                                            }).then((result) => {
                                                loadDataKoreksi(
                                                    nama_barang.value,
                                                    customer.value
                                                );
                                            });
                                        }else if (response.error) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Pemberitahuan",
                                                text: "Komponen baru tidak berhasil disimpan !",
                                            }).then((result) => {
                                                loadDataKoreksi(
                                                    nama_barang.value,
                                                    customer.value
                                                );
                                            });
                                        }
                                        console.log(response);
                                    },
                                    error: function (xhr, status, error) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Pemberitahuan",
                                            text: error,
                                        })
                                        console.error(error); // Handle errors
                                    },
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                icon: "error",
                                title: "Pemberitahuan",
                                text: error,
                            })
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: 0,
                            Berat: totalBeratKomponenLami.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenLami.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        beforeSend: function () {
                            // Show loading screen
                            $("#loading-screen").css("display", "flex");
                        },
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                let gridLamiData = [];

                                tableKomponenLami.rows().every(function () {
                                    let datagridLamiData = this.data();
                                    gridLamiData.push({
                                        KodeKomponen: datagridLamiData[0],
                                        Panjang: parseFloat(
                                            datagridLamiData[2]
                                        ),
                                        Lebar: parseFloat(datagridLamiData[3]),
                                        Tebal: parseFloat(datagridLamiData[5]),
                                        Berat: parseFloat(datagridLamiData[6]),
                                    });
                                });
                                $.ajax({
                                    type: "PUT", // or 'GET' depending on your server setup
                                    url: "TabelHitunganJBB/EditKomponenLami", // Specify the URL of your controller
                                    data: {
                                        _token: csrfToken,
                                        KodeBarang: nama_barang.value,
                                        gridLamiData: gridLamiData,
                                    }, // Pass the data with csrf_tokern
                                    beforeSend: function () {
                                        // Show loading screen
                                        $("#loading-screen").css("display", "flex");
                                    },
                                    success: function (response) {
                                        // Handle the successful response from the controller
                                        $("#loading-screen").css("display", "none");
                                        if (response.success) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Pemberitahuan",
                                                text: "Komponen sudah diperbarui !",
                                            }).then((result) => {
                                                loadDataKoreksi(
                                                    nama_barang.value,
                                                    customer.value
                                                );
                                            });
                                        } else if (response.error) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Pemberitahuan",
                                                text: "Komponen tidak berhasil diperbarui !",
                                            }).then((result) => {
                                                loadDataKoreksi(
                                                    nama_barang.value,
                                                    customer.value
                                                );
                                            });
                                        }
                                        console.log(response);
                                    },
                                    error: function (xhr, status, error) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Pemberitahuan",
                                            text: error,
                                        })
                                        console.error(error); // Handle errors
                                    },
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                icon: "error",
                                title: "Pemberitahuan",
                                text: error,
                            })
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenLami.value,
                        }, // Pass the data with csrf_tokern
                        beforeSend: function () {
                            // Show loading screen
                            $("#loading-screen").css("display", "flex");
                        },
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                let gridLamiData = [];

                                tableKomponenLami.rows().every(function () {
                                    let datagridLamiData = this.data();
                                    gridLamiData.push({
                                        KodeKomponen: datagridLamiData[0],
                                    });
                                });
                                $.ajax({
                                    type: "DELETE", // or 'GET' depending on your server setup
                                    url: "TabelHitunganJBB/DeleteKomponenLami", // Specify the URL of your controller
                                    data: {
                                        _token: csrfToken,
                                        KodeBarang: nama_barang.value,
                                        gridLamiData: gridLamiData,
                                    }, // Pass the data with csrf_tokern
                                    beforeSend: function () {
                                        // Show loading screen
                                        $("#loading-screen").css("display", "flex");
                                    },
                                    success: function (response) {
                                        // Handle the successful response from the controller
                                        $("#loading-screen").css("display", "none");
                                        if (response.success) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Pemberitahuan",
                                                text: "Komponen sudah dihapus !",
                                            }).then((result) => {
                                                loadDataKoreksi(
                                                    nama_barang.value,
                                                    customer.value
                                                );
                                            });
                                        } else if (response.error) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Pemberitahuan",
                                                text: "Komponen tidak berhasil dihapus !",
                                            }).then((result) => {
                                                loadDataKoreksi(
                                                    nama_barang.value,
                                                    customer.value
                                                );
                                            });
                                        }
                                        console.log(response);
                                    },
                                    error: function (xhr, status, error) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Pemberitahuan",
                                            text: error,
                                        })
                                        console.error(error); // Handle errors
                                    },
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                icon: "error",
                                title: "Pemberitahuan",
                                text: error,
                            })
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Inner") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenInner.value,
                            Lebar: lebarKomponenInner.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenInner.value,
                            Berat: totalBeratKomponenInner.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenInner.value,
                            Lebar: lebarKomponenInner.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenInner.value,
                            Berat: totalBeratKomponenInner.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenInner.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenInner.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Pocket") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenPocket.value,
                            Lebar: lebarKomponenPocket.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenPocket.value,
                            Berat: 0,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerMeterKomponenPocket.value,
                            SubTotal: totalHargaKomponenPocket.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenPocket.value,
                            Lebar: lebarKomponenPocket.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenPocket.value,
                            Berat: hargaPerMeterKomponenPocket.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: totalHargaKomponenPocket.value,
                            Kounter: kounterKomponenPocket.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenPocket.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Eva") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenEva.value,
                            Lebar: lebarKomponenEva.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenEva.value,
                            Berat: beratKomponenEva.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaKomponenEva.value,
                            SubTotal: totalHargaKomponenEva.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenEva.value,
                            Lebar: lebarKomponenEva.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenEva.value,
                            Berat: beratKomponenEva.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: hargaKomponenEva.value,
                            Kounter: kounterKomponenEva.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenEva.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Benang") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: denierKomponenBenang.value,
                            Quantity: 0,
                            Berat: kebutuhanKomponenBenang.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaBenangPerKgKomponenBenang.value,
                            SubTotal: totalHargaKomponenBenang.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: denierKomponenBenang.value,
                            Quantity: 0,
                            Berat: kebutuhanKomponenBenang.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaBenangPerKgKomponenBenang.value,
                            SubTotal: totalHargaKomponenBenang.value,
                            Kounter: kounterKomponenBenang.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenBenang.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Ongkos") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: 0,
                            Berat: 0,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerKgKomponenOngkos.value,
                            SubTotal: totalHargaKomponenOngkos.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: 0,
                            Berat: 0,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerKgKomponenOngkos.value,
                            SubTotal: totalHargaKomponenOngkos.value,
                            Kounter: kounterKomponenOngkos.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenOngkos.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Dust") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: 0,
                            Berat: beratKomponenDust.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerKgKomponenDust.value,
                            SubTotal: totalHargaKomponenDust.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: 0,
                            Lebar: 0,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: 0,
                            Berat: beratKomponenDust.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerKgKomponenDust.value,
                            SubTotal: totalHargaKomponenDust.value,
                            Kounter: kounterKomponenDust.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenDust.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Katun") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKatun.value,
                            Lebar: lebarKomponenKatun.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenKatun.value,
                            Berat: totalBeratKomponenKatun.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerKgKomponenKatun.value,
                            SubTotal: totalHargaKomponenKatun.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKatun.value,
                            Lebar: lebarKomponenKatun.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenKatun.value,
                            Berat: totalBeratKomponenKatun.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaPerKgKomponenKatun.value,
                            SubTotal: totalHargaKomponenKatun.value,
                            Kounter: kounterKomponenKatun.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenBenangKatun.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Kertas") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKertas.value,
                            Lebar: lebarKomponenKertas.value,
                            WA: 0,
                            WE: 0,
                            Denier: GSMKomponenKertas.value,
                            Quantity: quantityKomponenKertas.value,
                            Berat: totalBeratKomponenKertas.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    //hargaKomponenKertas tidak dipakai!
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKertas.value,
                            Lebar: lebarKomponenKertas.value,
                            WA: 0,
                            WE: 0,
                            Denier: GSMKomponenKertas.value,
                            Quantity: quantityKomponenKertas.value,
                            Berat: totalBeratKomponenKertas.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenKertas.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenKertas.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Kain") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKain.value,
                            Lebar: lebarKomponenKain.value,
                            WA: 0,
                            WE: 0,
                            Denier: GSMKomponenKain.value,
                            Quantity: quantityKomponenKain.value,
                            Berat: totalBeratKomponenKain.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaKomponenKain.value ?? 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    //hargaKomponenKain tidak dipakai
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKain.value,
                            Lebar: lebarKomponenKain.value,
                            WA: 0,
                            WE: 0,
                            Denier: GSMKomponenKain.value,
                            Quantity: quantityKomponenKain.value,
                            Berat: totalBeratKomponenKain.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: hargaKomponenKain.value ?? 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenKain.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenKain.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Benang Katun") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenBenangKatun.value,
                            Lebar: lebarKomponenBenangKatun.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenBenangKatun.value,
                            Berat: totalBeratKomponenBenangKatun.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenBenangKatun.value,
                            Lebar: lebarKomponenBenangKatun.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenBenangKatun.value,
                            Berat: totalBeratKomponenBenangKatun.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenBenangKatun.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenBenangKatun.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Karet") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKaret.value,
                            Lebar: lebarKomponenKaret.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenKaret.value,
                            Berat: totalBeratKomponenKaret.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenKaret.value,
                            Lebar: lebarKomponenKaret.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenKaret.value,
                            Berat: totalBeratKomponenKaret.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenKaret.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenKaret.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            } else if (typeForm == "Form Komponen Carbon") {
                if (KompVarKomponen == 1) {
                    $.ajax({
                        type: "POST", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            mode_insert: "TambahKomponen",
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenCarbon.value,
                            Lebar: lebarKomponenCarbon.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenCarbon.value,
                            Berat: totalBeratKomponenCarbon.value,
                            BeratWA: 0,
                            BeratWE: 0,
                            Harga: 0,
                            SubTotal: 0,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen baru sudah disimpan !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 2) {
                    $.ajax({
                        type: "PUT", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/EditKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            StandartKomponen:
                                Kode_Komponen.substring(0, 4) + "00",
                            Panjang: panjangKomponenCarbon.value,
                            Lebar: lebarKomponenCarbon.value,
                            WA: 0,
                            WE: 0,
                            Denier: 0,
                            Quantity: quantityKomponenCarbon.value,
                            Berat: totalBeratKomponenCarbon.value,
                            Harga: 0,
                            SubTotal: 0,
                            Kounter: kounterKomponenCarbon.value,
                            DenierWA: 0,
                            DenierWE: 0,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah diperbarui !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                } else if (KompVarKomponen == 3) {
                    $.ajax({
                        type: "DELETE", // or 'GET' depending on your server setup
                        url: "TabelHitunganJBB/DeleteKomponen", // Specify the URL of your controller
                        data: {
                            _token: csrfToken,
                            KodeBarang: nama_barang.value,
                            KodeKomponen: Kode_Komponen,
                            Kounter: kounterKomponenCarbon.value,
                        }, // Pass the data with csrf_tokern
                        success: function (response) {
                            // Handle the successful response from the controller
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Pemberitahuan",
                                    text: "Komponen sudah dihapus !",
                                }).then((result) => {
                                    loadDataKoreksi(
                                        nama_barang.value,
                                        customer.value
                                    );
                                });
                            }
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            console.error(error); // Handle errors
                        },
                    });
                }
            }
        }
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
                            url: "MaintenanceCustomer/create",
                            dataType: "json",
                            type: "GET",
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
                id_cerobongBawah_model.value = selectedRow.Kode_Model.trim();
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
    $("#loading-screen").css("display", "flex");
    if (proses == 1) {
        tambah_komponen.disabled = false;
        koreksi_komponen.disabled = false;
        hapus_komponen.disabled = false;
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

    if (proses !== 1) {
        this.disabled = true;
    } else if (proses == 1) {
        proses = 2;
    }

    $("#loading-screen").css("display", "none");
    if (proses != 3) {
        await loadDataKoreksi(nama_barang.value, customer.value);
    }
});

tambah_komponen.addEventListener("click", function (event) {
    event.preventDefault();
    if (nama_barang.value == "") {
        Swal.fire({
            icon: "info",
            title: "Pemberitahuan",
            text: "Kolom Kode Barang harus diisi dulu!",
            didClose: () => {
                setTimeout(() => {
                    if (customer.value === "") {
                        btn_customer.focus();
                    } else {
                        btn_nama_barang.focus();
                    }
                }, 100); // Small timeout to ensure focus is set correctly
            },
        });
    } else {
        tanggal_update.value = new Date().toJSON().slice(0, 10);
        try {
            const result = Swal.fire({
                title: "Select a Komponen",
                html: '<table id="komponenTable" class="display" style="width:100%"><thead><tr><th>Nama Komponen</th><th>Kode Komponen</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#komponenTable")
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
                        setKompVar();
                        KompVarKomponen = 1;
                        const table = $("#komponenTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "getDataTambahKomponenJBB",
                                dataType: "json",
                                type: "POST",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Komponen",
                                },
                                {
                                    data: "Kode_Komponen",
                                },
                            ],
                            // Debugging step to check table structure after initialization
                        });

                        $("#komponenTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    console.log(result.value);
                    pilihTypeFormKomposisi(
                        result.value.Kode_Komponen,
                        result.value.Nama_Komponen
                    );
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
});

koreksi_komponen.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedData = $("#tabelData").DataTable().row(".selected").data();
    if (!selectedData) {
        Swal.fire({
            icon: "info",
            title: "Pemberitahuan",
            text: "Pilih Komponen yang ingin dikoreksi!",
        });
    } else {
        console.log(selectedData[0]);
        setKompVar();
        KompVarKomponen = 2;
        pilihTypeFormKomposisi(selectedData[0], selectedData[1]);
    }
});

hapus_komponen.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedData = $("#tabelData").DataTable().row(".selected").data();
    if (!selectedData) {
        Swal.fire({
            icon: "info",
            title: "Pemberitahuan",
            text: "Pilih Komponen yang ingin dihapus!",
        });
    } else {
        console.log(selectedData[0]);
        setKompVar();
        KompVarKomponen = 3;
        pilihTypeFormKomposisi(selectedData[0], selectedData[1]);
    }
});

//#endregion
