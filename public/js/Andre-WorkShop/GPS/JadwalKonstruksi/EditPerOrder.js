let NoOrder = document.getElementById("NoOrder");
let divisi = document.getElementById("divisi");
let Kode_Barang = document.getElementById("Kode_Barang");
let NamaBarang = document.getElementById("NamaBarang");
let NoGambarRev = document.getElementById("NoGambarRev");
let OdSts = document.getElementById("OdSts");
let KetOrder = document.getElementById("KetOrder");
let Mesin = document.getElementById("Mesin");
let Pengorder = document.getElementById("Pengorder");
let btnbatal = document.getElementById("batal");
let NamaBagian = document.getElementById("NamaBagian");

let table_data = $("#tableEditPerOrder").DataTable();
let refresh = document.getElementById("refresh");
let Tukarposisi = document.getElementById("Tukarposisi");
let Susunposisi = document.getElementById("Susunposisi");

//#region set warna

table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        if (data.Status == 1) {
            $(this.node()).removeClass();
            $(this.node()).addClass("red-color");
        }
        if (data.Cancel == 1) {
            $(this.node()).removeClass();
            $(this.node()).addClass("hotpink-color");
        }
    });
});

//#endregion

//#region NoOrder on enter

NoOrder.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        let NoOrder6digit;
        NoOrder6digit = document.getElementById("NoOrder");
        if (NoOrder6digit.value.length < 6) {
            NoOrder6digit.value = NoOrder.value.padStart(6, "0");
        }
        NoOrder.value = NoOrder6digit.value;
        loaddata();
        // loadnamabagian(NoOrder.value);
        // btnbatal.disabled = false;
        // NamaBagian.focus();
    }
});
//#endregion

//#region load data

function loaddata() {
    let status = true;
    fetch("/LoadDataEditPerOrderKonstruksi/" + NoOrder.value)
        .then((response) => response.json())
        .then((datas) => {
            // console.log(datas);
            if (datas.length > 0) {
                divisi.value = datas[0].NamaDivisi;
                Kode_Barang.value = datas[0].Kd_Brg;
                NamaBarang.value = datas[0].Nama_Brg;
                NoGambarRev.value = datas[0].No_Gbr_Rev;
                OdSts.textContent = datas[0].OdSts;
                KetOrder.value = datas[0].Ket_Order;
                Mesin.value = datas[0].Mesin;
                Pengorder.value = datas[0].Pengorder;
            } else {
                alert(
                    "Nomer order gambar: " +
                        NoOrder.value +
                        ", tidak ada, blm diACC, ditolak, atau sudah finish."
                );
                return;
            }
        });

    fetch("/cekEstimasiKonstruksiEditPerOrderKonstruksi/" + NoOrder.value)
        .then((response) => response.json())
        .then((datas) => {
            // console.log(datas);
            if (datas[0].ada == 0) {
                alert(
                    "Nomer order: " +
                        NoOrder.value +
                        ", belum ada estimasi jadwalnya. Hubungi PPIC."
                );
                status = false;
            } else {
                //muncul btn batal
                btnbatal.style.display = "";
                loadnamabagian(NoOrder.value);
                NamaBagian.focus();
                //select bagian focus
            }
            if (status == false) {
                //clear text
                //noorder focus
                cleartext();
                NoOrder.focus();
            }
        });
}

//#endregion

//#region isi bagian

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

//#region cleartext

function cleartext() {
    NoOrder.value = "";
    divisi.value = "";
    OdSts.textContent = "";
    Kode_Barang.value = "";
    NoGambarRev.value = "";
    NamaBarang.value = "";
    Mesin.value = "";
    Pengorder.value = "";
    KetOrder.value = "";
    NamaBagian.value = "";
    //ListOpr.Items.Clear() table clear??
}

//#endregion

//#region nama bagian on enter

NamaBagian.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (NamaBagian.value != "Pilih Bagian") {
            LoadOpr();
        }
    }
});

//#endregion

//#region LoadOpr func table

function LoadOpr() {
    table_data.clear().draw();
    fetch(
        "/getDataTableEditPerOrderKonstruksi/" +
            NoOrder.value +
            "/" +
            NamaBagian.value
    )
        .then((response) => response.json())
        .then((datas) => {
            // console.log(datas);
            if (datas.length > 0) {
                datas.forEach((data) => {
                    const tglOrder = data.EstDate;

                    const [tanggal, waktu] = tglOrder.split(" ");

                    data.EstDate = tanggal;
                });
                table_data = $("#tableEditPerOrder").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        {
                            title: "Nomor",
                            data: null,
                            render: function (data, type, row, meta) {
                                return `<input type="checkbox" name="EditJadwalPerOrderCheck" value="${
                                    meta.row + 1
                                }" /> ${meta.row + 1}`;
                            },
                        },
                        {
                            title: "Tanggal Start",
                            data: "EstDate",
                        },
                        {
                            title: "WorkStation",
                            data: "NamaWorkStation",
                        },
                        {
                            title: "Est. Time",
                            data: function (row) {
                                return `${row.EstTimeHour} jam ${row.EstTimeMinute} menit`;
                            },
                        },
                        { title: "Hari ke-", data: "HariKe" },

                        { title: "Keterangan", data: "KetCancel" },
                        {
                            title: "TimeInput",
                            data: "TimeInput",
                        },
                        {
                            title: "NoWorkSts",
                            data: "NoWrkSts",
                        },
                        { title: "NoAntri", data: "NoAntrian" },
                        { title: "IdTrans", data: "IdTrans" },
                    ],
                });
                table_data.draw();
            } else {
                alert(
                    "Tidak ada jadwal konstruksi u/ nomer order: " +
                        NoOrder.value +
                        ", dgn bagian: " +
                        NamaBagian.value +
                        "."
                );
                return;
            }
        });
}

//#endregion

//#region refresh

refresh.addEventListener("click", function (event) {
    if (NamaBagian.value != "Pilih Bagian") {
        LoadOpr();
    }
});

//#endregion

//#region proses

function prosesklik() {
    let jml = 0;
    var indexarray = [];
    let idkEst = 0;
    let tglEst = [];
    let idkInput= 0;
    var WktInput = [];
    var nomerUrut = [];
    let idkNoUrut = 0;
    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    $("input[name='EditJadwalPerOrderCheck']:checked").each(function () {
        // Ambil nilai 'value' dan status 'checked' dari checkbox
        let value = $(this).val();
        // let isChecked = $(this).prop("checked");
        // let closestTd = $(this).closest("tr");
        let rowindex = $(this).closest("tr").index();
        jml += 1;
        indexarray.push(rowindex);
    });
    if (Tukarposisi.checked == false && Susunposisi.checked == false) {
        alert("Pilih, Tukar Posisi atau Susun Posisi...");
        return;
    }
    if (jml == 2) {
        for (let i = 0; i < indexarray.length; i++) {
            idkEst += 1;
            tglEst.push(table_data.cell(indexarray[i],1).data());
        }
        if (tglEst[0] != tglEst[1]) {
            alert("Tanggal kerja tidak boleh berbeda.");
            return;
        }
        if (Tukarposisi.checked) {
            for (let i = 0; i < indexarray.length; i++) {
                idkInput += 1;
                WktInput.push(table_data.cell(indexarray[i],6).data());
            }
            console.log(WktInput);
            console.log(idkInput);
            for (let i = 0; i < WktInput.length; i++) {
                idkInput -= 1;
                $.ajax({
                    url: 'EditPerOrderkonstruksi/' +  table_data.cell(indexarray[i],8).data(),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        _token: csrfToken,
                        _method: "PUT",
                        noAntri : table_data.cell(indexarray[i],8).data(),
                        idTrans : table_data.cell(indexarray[i],9).data(),
                        estDate : table_data.cell(indexarray[i],1).data(),
                        worksts : table_data.cell(indexarray[i],7).data(),
                        idBag : NamaBagian.value,
                        Time : WktInput[idkInput]
                    },
                    success: function(response) {
                        console.log(response.message);
                        // alert(response.message)
                        // LoadOpr();
                        // console.log(response.data);
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                });
            }
        }
        if (Susunposisi.checked == true) {
            var jawab = confirm("Susun ke atas(OK) atau ke bawah(Cancel) ??");
            $("input[name='EditJadwalPerOrderCheck']:checked").each(function () {
                let rowindex = $(this).closest("tr").index();
                idkNoUrut += 1;
                nomerUrut.push(rowindex);
            });
            for (let i = 0; i < indexarray.length; i++) {
                idkInput += 1;
                WktInput.push(table_data.cell(indexarray[i],6).data());
            }
            if (jawab) {
                console.log(nomerUrut);
                for (var i = nomerUrut[0] + 1; i <= nomerUrut[1]; i++) {
                    console.log(table_data.cell(indexarray[i-1],6).data());
                    $.ajax({
                        url: 'EditPerOrderkonstruksi/' +  table_data.cell(indexarray[i],8).data(),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            _token: csrfToken,
                            _method: "PUT",
                            noAntri : table_data.cell(indexarray[i],8).data(),
                            idTrans : table_data.cell(indexarray[i],9).data(),
                            estDate : table_data.cell(indexarray[i],1).data(),
                            worksts : table_data.cell(indexarray[i],7).data(),
                            idBag : NamaBagian.value,
                            Time : table_data.cell(indexarray[i-1],6).data()
                        },
                        success: function(response) {
                            console.log(response.message);
                            // alert(response.message)
                            // LoadOpr();
                            // console.log(response.data);
                        },
                        error: function(xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            }
        }
    }
    else{
        alert("Pilih 2 data.");
        return;
    }
}

//#endregion

