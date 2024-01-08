let tgl = document.getElementById("tgl");
let btnok = document.getElementById("btnok");
let table_data = $("#tableEditEstimasiTanggal").DataTable();
let WorkStation = document.getElementById("WorkStation");
let btnbatal = document.getElementById("batal");
let refresh = document.getElementById("refresh");
let keterangan;
let MaterialNotReady = document.getElementById("MaterialNotReady");
let MesinRusak = document.getElementById("MesinRusak");
let SpekMesinTerbatas = document.getElementById("SpekMesinTerbatas");
let Instruksi = document.getElementById("Instruksi");
let Lain = document.getElementById("Lain");
let alasanLain = document.getElementById("alasanLain");
var estJam = [];
var newTgl = "";
var estMenit = [];
let btnokmodal = document.getElementById("btnokmodal");
var trigger = 0;
var idk = 0;
var indeks = [];
let pilihAlasan = 1;
let jml = 0;
var move_idBagian = [];
var move_noAntri = [];
var move_estJam = [];
var move_estMenit = [];

var sts_jadwal;
var total_menit;
var jam_kerja;
var menit_jam_kerja;
//#region set color

table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        if (data.Status == 1) {
            $(this.node()).removeClass();
            $(this.node()).addClass("red-color");
        }
    });
});

//#endregion

//#region set tanggal

const currentDate = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);
console.log(Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

// Format the date to be in 'YYYY-MM-DD' format for setting the input value
const formattedFirstDay = firstDayOfMonth.toISOString().slice(0, 10);

// Format the current date to be in 'YYYY-MM-DD' format for setting the input value
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

tgl.value = formattedCurrentDate;

//#endregion

//#region tgl on enter

tgl.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        btnok.disabled = false;
        btnok.focus();
    }
});

//#endregion

//#region clear text

function cleartext() {
    table_data.clear().draw();
    WorkStation.value = "Pilih Work Station";
}

//#endregion

//#region load data

function LoadData() {
    // let idk = 0;
    table_data.clear().draw();
    fetch("/NOFINISHEditEstimasiJadwal/" + WorkStation.value + "/" + tgl.value)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length > 0) {
                // console.log(datas);
                if (datas.length > 0) {
                    datas.forEach((data_table) => {
                        const tglOrder = data_table.EstDate;

                        const [tanggal, waktu] = tglOrder.split(" ");

                        data_table.EstDate = tanggal;
                        estJam.push(data_table.EstTimeHour);
                        estMenit.push(data_table.EstTimeMinute);
                    });
                    table_data = $("#tableEditEstimasiTanggal").DataTable({
                        destroy: true, // Destroy any existing DataTable before reinitializing
                        data: datas,
                        columns: [
                            {
                                title: "Nomor Antrian",
                                data: "NoAntrian",
                                render: function (data) {
                                    return `<input type="checkbox" name="EditEstimasiTanggalCheck" value="${data}" /> ${data}`;
                                },
                            },
                            {
                                title: "No Order",
                                data: "NoOrder",
                            },
                            // { title: "No. Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                            {
                                title: "Tanggal Start",
                                data: "EstDate",
                            }, // Sesuaikan 'age' dengan properti kolom di data
                            {
                                title: "Divisi",
                                data: "NamaDivisi",
                            }, // Sesuaikan 'country' dengan properti kolom di data
                            {
                                title: "Nama Barang",
                                data: "Nama_Brg",
                            },
                            {
                                title: "Nama Bagian",
                                data: "NamaBagian",
                            },
                            {
                                title: "Est. Time",
                                data: function (row) {
                                    return `${row.EstTimeHour} jam ${row.EstTimeMinute} menit`;
                                },
                            },
                            {
                                title: "Hari ke-",
                                data: "HariKe",
                            },
                            {
                                title: "IdBagian",
                                data: "IdBagian",
                            },
                        ],
                    });
                }

                // no_Antri[idk] = datas[0].NoAntrian;
                // idk = idk + 1;

                table_data.draw();
            } else {
                alert("Tidak ada jadwal pada tgl: " + tgl.value);
            }
        });
}

//#endregion

//#region btn ok on click

btnok.addEventListener("click", function () {
    if (
        WorkStation.value != "Pilih Work Station" ||
        WorkStation.value != null
    ) {
        LoadData();
        btnbatal.style.display = "";
    }
});

//#endregion

//#region refresh

refresh.addEventListener("click", function () {
    // cleartext();
    LoadData();
});

//#endregion

//#region Proses Onclick

function prosesklik() {
    console.log(trigger);

    if (trigger == 0) {
        $("input[name='EditEstimasiTanggalCheck']:checked").each(function () {
            // Ambil nilai 'value' dan status 'checked' dari checkbox
            let value = $(this).val();
            // let isChecked = $(this).prop("checked");
            // let closestTd = $(this).closest("tr");
            let rowindex = $(this).closest("tr").index();
            jml += 1;
            indeks.push(rowindex);
        });

        if (jml == 0) {
            alert("Pilih data yg akan di edit estimasi tanggalnya.");
            return;
        } else {
            $("#modalalasan").modal("show");

            let j = 0;
            $("input[name='EditEstimasiTanggalCheck']:checked").each(
                function () {
                    let rowindex = $(this).closest("tr").index();
                    move_noAntri.push(table_data.cell(indeks[j], 0).data());
                    move_idBagian.push(table_data.cell(indeks[j], 8).data());
                    move_estJam.push(estJam[idk]);
                    move_estMenit.push(estMenit[idk]);
                    idk = idk + 1;
                    j += 1;
                }
            );
            var i = 0;
            // console.log(idk);
        }
    }
    if (trigger == 1) {
        $("input[name='EditEstimasiTanggalCheck']:checked").each(function () {
            // Ambil nilai 'value' dan status 'checked' dari checkbox

            let rowindex = $(this).closest("tr").index();
            // let status = Proses_cek_estimasi(
            //     table_data.cell(rowindex, 1).data(),
            //     newTgl
            // );
            // let status;
            // Proses_cek_estimasi(table_data.cell(rowindex, 1).data(), newTgl)
            //     .then((result) => {
            //         // console.log(result);
            //         status = result; // ini akan mencetak hasil dari Proses_cek_estimasi
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
            // Cara menggunakan
            // let status;
            // Proses_cek_estimasi("noOrder", "tanggal", (result) => {
            //     console.log(result);
            //     status = result;
            // });
            // console.log(status);
            console.log(table_data.cell(rowindex, 1).data());
            console.log(newTgl);
            i += 1;
            // if (status == false) {
            //     //buat menjadi status true
            //     //dicoba kalau status == false
            //     alert(
            //         "Untuk nomer order: " +
            //             table_data.cell(rowindex, 1).data() +
            //             ", tdk bisa diproses."
            //     );
            //     trigger = 0;
            //     alert("Tidak terProses...");
            //     return;
            //  } else if (status == true) {
                fetch(
                    "/cekestimasikonstruksiEditEstimasiTanggal/" +
                        table_data.cell(rowindex, 1).data() + "/" + newTgl
                )
                    .then((response) => response.json())
                    .then((datas) => {
                        console.log(datas);
                        if (datas[0].ada > 0) {
                            sts_jadwal = true;
                        } else {
                            sts_jadwal = false;
                        }
                        total_menit = 0;
                        // console.log(sts_jadwal);
                        // console.log(estJam);
                        // console.log(estMenit);
                        // console.log(indeks);
                        for (let i = 0; i <= idk - 1; i++) {
                            total_menit =
                                estJam[indeks[i]] * 60 +
                                estMenit[indeks[i]] +
                                total_menit;
                        }

                        if (sts_jadwal == false) {
                            jam_kerja = prompt(
                                "Tentukan jam kerja optimal u/ tgl: " + newTgl
                            );
                            menit_jam_kerja = jam_kerja * 60;
                            while (total_menit > menit_jam_kerja) {
                                alert(
                                    "Jam kerja optimal tdk boleh lebih kecil dari estimasi waktu."
                                );
                                jam_kerja = prompt(
                                    "Tentukan jam kerja optimal u/ tgl: " +
                                        newTgl
                                );
                                menit_jam_kerja = jam_kerja * 60;
                            }
                            var csrfToken = $('meta[name="csrf-token"]').attr(
                                "content"
                            );
                            // console.log(idk);
                            for (let i = 0; i <= idk - 1; i++) {
                                // console.log(idk);
                                $.ajax({
                                    url:
                                        "EditEstimasiTanggal/" +
                                        move_noAntri[i],
                                    type: "POST",
                                    data: {
                                        _token: csrfToken,
                                        _method: "PUT",
                                        estDate: newTgl,
                                        noAntri: move_noAntri[i],
                                        idBag: move_idBagian[i],
                                        estHour: move_estJam[i],
                                        estMinute: move_estMenit[i],
                                        worksts: WorkStation.value,
                                        oldDate: tgl.value,
                                        jamKrj: jam_kerja,
                                        keterangan:
                                            "Edit estimasi tgl, " +
                                            keterangan +
                                            ". Ke tgl: " +
                                            newTgl,
                                    },
                                    success: function (response) {
                                        console.log(response);
                                        // console.log(response.data);
                                    },
                                    error: function (xhr, status, error) {
                                        console.error(error);
                                    },
                                });
                            }
                        }
                        if (sts_jadwal == true) {
                            var TotalMenitKrj,
                                TotalMenitPk,
                                sisa_no_input,
                                idx_sisa;
                            var sisaNo_Input = [];
                            var tglEst_sisa = [];
                            var status_simpan_geser2 = false;
                            idx_sisa = 0;
                            TotalMenitKrj = 0;
                            fetch(
                                "/cekestimasikonstruksiEditEstimasiTanggal/" +
                                    newTgl +
                                    "/" +
                                    WorkStation.value
                            )
                                .then((response) => response.json())
                                .then((datas) => {
                                    console.log(datas);
                                });
                        }
                    });
            // }
        });
    }
}

//#endregion

//#region oke modal on click

function okemodal() {
    // if (pilihAlasan == 0) {
    // }
    if (MaterialNotReady.checked) {
        keterangan = MaterialNotReady.value;
    } else if (MesinRusak.checked) {
        keterangan = MesinRusak.value;
    } else if (SpekMesinTerbatas.checked) {
        keterangan = SpekMesinTerbatas.value;
    } else if (Instruksi.checked) {
        keterangan = Instruksi.value;
    } else if (Lain.checked) {
        alert("Masukkan alasannya...");
        alasanLain.focus();
        keterangan = alasanLain.value;
    }
    newTgl = prompt(
        "Inputkan estimasi tanggal yg baru (Format: YYYY-MM-DD)",
        "YYYY-MM-DD"
    );
    trigger = 1;
    if (newTgl !== "") {
        prosesklik();
    }
}

//#endregion

//#region Proses_cek_estimasi

// async function Proses_cek_estimasi(noOrder, tanggal) {
//     let tglS, tglF;

//     try {
//         const response = await fetch(
//             "/cekestimasiEditEstimasiTanggal/" + noOrder
//         );
//         const datas = await response.json();

//         console.log(datas);

//         if (datas.length > 0) {
//             tglS = datas[0].TglS;
//             tglF = datas[0].TglF;
//         }

//         if (tanggal < tglS || tanggal > tglF) {
//             if (tanggal < tglS) {
//                 alert(
//                     "Tidak boleh. Karena tgl yg diinput < estimasi tgl start(" +
//                         tglS +
//                         ") yg dijadwalkan oleh PPIC."
//                 );
//                 return false;
//             } else if (tanggal > tglF) {
//                 alert(
//                     "Tidak boleh. Karena tgl yg diinput > estimasi tgl finish(" +
//                         tglF +
//                         ") yg dijadwalkan oleh PPIC."
//                 );
//                 return false;
//             }
//         } else {
//             console.log("masuk");
//             return true;
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

function Proses_cek_estimasi(noOrder, tanggal) {
    let tglS, tglF;
    fetch("/cekestimasiEditEstimasiTanggal/" + noOrder)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length > 0) {
                tglS = datas[0].TglS;
                tglF = datas[0].TglF;
            }
            if (tanggal < tglS || tanggal > tglF) {
                if (tanggal < tglS) {
                    alert(
                        "Tidak boleh. Karena tgl yg diinput < estimasi tgl start(" +
                            tglS +
                            ") yg dijadwalkan oleh PPIC."
                    );
                    return false;
                } else if (tanggal > tglF) {
                    alert(
                        "Tidak boleh. Karena tgl yg diinput > estimasi tgl finish(" +
                            tglF +
                            ") yg dijadwalkan oleh PPIC."
                    );
                    return false;
                }
                // Proses_cek_estimasi = false;
            } else {
                console.log("masuk");
                return true;
            }
        });
}

// async function Proses_cek_estimasi(noOrder, tanggal) {
//     let tglS, tglF;

//     try {
//         const response = await fetch("/cekestimasiEditEstimasiTanggal/" + noOrder);
//         const datas = await response.json();

//         console.log(datas);

//         if (datas.length > 0) {
//             tglS = datas[0].TglS;
//             tglF = datas[0].TglF;
//         }

//         if (tanggal < tglS || tanggal > tglF) {
//             if (tanggal < tglS) {
//                 alert(
//                     "Tidak boleh. Karena tgl yg diinput < estimasi tgl start(" +
//                     tglS +
//                     ") yg dijadwalkan oleh PPIC."
//                 );
//                 return false;
//             } else if (tanggal > tglF) {
//                 alert(
//                     "Tidak boleh. Karena tgl yg diinput > estimasi tgl finish(" +
//                     tglF +
//                     ") yg dijadwalkan oleh PPIC."
//                 );
//                 return false;
//             }
//         } else {
//             console.log("masuk");
//             return true;
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return false;
//     }
// }

//#endregion
