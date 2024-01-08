let Tanggal = document.getElementById("Tanggal");
let WorkStation = document.getElementById("WorkStation");
let JlmJamKerja = document.getElementById("JlmJamKerja");
let btnproses = document.getElementById("btnproses");
let btnbatal = document.getElementById("btnbatal");
let FormEditJam = document.getElementById("FormEditJam");
let methodForm = document.getElementById("methodForm");
//#region tanggal on enter

Tanggal.addEventListener("keypress", function (event) {
    let TotalMenitKrj, TotalMenitPk, TotalMenit_Max;
    let hasil_bagi, hasil_bagi_car, jam_pk, menit_pk;
    if (event.key == "Enter") {
        fetch(
            "/HitungSisaJamEditJam/" + Tanggal.value + "/" + WorkStation.value
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
                    menit_pk = TotalMenitPk - 60 * hasil_bagi;
                    if (JlmJamKerja.value * 60 < TotalMenitPk) {
                        alert(
                            "Jml jam kerja harus lebih besar dari jml jam yg sdh terpakai (" +
                                jam_pk +
                                " jam " +
                                menit_pk +
                                " menit)."
                        );
                        return;
                    } else {
                        btnproses.disabled = false;
                        btnproses.focus();
                    }
                }
            });
    }
});

//#endregion

//#region workshop on change

WorkStation.addEventListener("change", function () {
    fetch("/GetJamKerjaEditJam/" + WorkStation.value + "/" + Tanggal.value)
        .then((response) => response.json())
        .then((datas) => {
            // console.log(datas);
            if (datas.length > 0) {
                JlmJamKerja.value = datas[0].JmlJamKerja;
                jam = datas[0].JmlJamKerja;
                btnbatal.style.display = "";
                btnproses.disabled = false;
                JlmJamKerja.focus();
            } else {
                alert(
                    "Tidak ada jadwal konstruksi u/ WorkStation: " +
                        WorkStation.value +
                        ", pada tanggal: " +
                        Tanggal.value
                );
                return;
            }
        });
});

//#endregion

//#region JlmJamKerja on enter

JlmJamKerja.addEventListener("keypress", function (event) {
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
                WorkStation.value
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
                    menit_pk = TotalMenitPk - 60 * hasil_bagi;
                    if (JlmJamKerja.value * 60 < TotalMenitPk) {
                        alert(
                            "Jml jam kerja harus lebih besar dari jml jam yg sdh terpakai (" +
                                jam_pk +
                                " jam " +
                                menit_pk +
                                " menit)."
                        );
                        return;
                    } else {
                        btnproses.disabled = false;
                        btnproses.focus();
                    }
                }
            });
    }
});

//#endregion

//#region clear text

function clearText() {
    WorkStation.value = "Pilih Work Station";
    JlmJamKerja.value = "0";
    btnproses.disabled = true;
    btnbatal.style.display = "none";
}

//#endregion

//#region btn batal on click

btnbatal.addEventListener("click", function () {
    clearText();
});

//#endregion

//#region btn proses

btnproses.addEventListener('click', function(){
    methodForm.value = "PUT";
    FormEditJam.action = "/EditJam/" + WorkStation.value;
    FormEditJam.submit();
});

//#endregion
