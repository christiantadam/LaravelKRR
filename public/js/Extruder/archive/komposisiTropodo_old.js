const selectIdKomposisi = document.getElementById("select_id_komposisi");
const selectMesin = document.getElementById("select_mesin");

const selectObjek = document.getElementById("select_objek");
const selectKelompokUtama = document.getElementById("select_kelompok_utama");
const selectKelompok = document.getElementById("select_kelompok");
const selectSubKelompok = document.getElementById("select_sub_kelompok");
const selectType = document.getElementById("select_type");

selectIdKomposisi.addEventListener("change", function () {
    selectMesin.disabled = false;
    clearOptions(selectMesin.id, true);

    selectObjek.disabled = true;
    selectKelompokUtama.disabled = true;
    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectMesin.addEventListener("change", function () {
    selectObjek.disabled = false;
    clearOptions(selectObjek.id, true);

    selectKelompokUtama.disabled = true;
    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectObjek.addEventListener("change", function () {
    selectKelompokUtama.disabled = false;
    clearOptions(selectKelompokUtama.id);

    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectKelompokUtama.addEventListener("click", function () {
    fetchData("/ExtruderNet/getKelompokUtama/" + selectObjek.value, this.id);
});

selectKelompokUtama.addEventListener("change", function () {
    if (selectKelompokUtama.value == "0117") {
        /*
            Beri pesan konfirmasi berisi
            "Anda akan memasukkan data bahan pembantu \n
            Apakah Anda sudah memasukkan SEMUA BAHAN BAKU ??"
            Jika "YA", enable selectKelompok
            Jika "TIDAK", clear selectKelompokUtama
        */
    } else {
        selectKelompok.disabled = false;
        clearOptions(selectKelompok.id);

        selectSubKelompok.disabled = true;
        selectType.disabled = true;
    }
});

selectKelompok.addEventListener("click", function () {
    fetchData("/ExtruderNet/getKelompok/" + selectKelompokUtama.value, this.id);
});

selectKelompok.addEventListener("change", function () {
    if (
        selectKelompokUtama.value == "0057" ||
        selectKelompokUtama.value == "0121" ||
        selectKelompokUtama.value == "0009"
    ) {
        /*
            SP_5298_EXT_CEK_KELOMPOK_MESIN
            DB          Extruder
            Parameter	@idkel = txtIdKelompok.Text
            Untuk membandingkan mesin yang di DB INV dgn db EXT
            Jika "TIDAK SAMA" maka beri pesan "Mesin tidak sama"
        */
    } else {
        selectSubKelompok.disabled = false;
        clearOptions(selectSubKelompok.id);

        selectType.disabled = true;
    }
});

selectSubKelompok.addEventListener("click", function () {
    fetchData("/ExtruderNet/getSubKelompok/" + selectKelompok.value, this.id);
});

selectSubKelompok.addEventListener("change", function () {
    selectType.disabled = false;
    clearOptions(selectType.id);
});

selectType.addEventListener("click", function () {
    fetchData("/ExtruderNet/getType/" + selectSubKelompok.value, this.id);
});

//#region Functions

function fetchData(urlString, idTarget) {
    const eleTarget = document.getElementById(idTarget);
    const loadingOption = eleTarget.querySelector('[value="loading"]');

    if (eleTarget.options.length <= 3) {
        loadingOption.style.display = "block";

        fetch(urlString)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                // console.log(urlString);
                // console.log(data);

                addOptions(idTarget, data);
                loadingOption.style.display = "none";
            })
            .catch((error) => {
                console.error("Error:", error);
                loadingOption.style.display = "none";
            });
    }
}

function addOptions(idSelect, optionData) {
    const selectEle = document.getElementById(idSelect);
    optionData = JSON.parse(optionData);

    for (let i = 0; i < optionData.length; i++) {
        const newOption = document.createElement("option");

        switch (idSelect) {
            case selectKelompokUtama.id:
                newOption.value = optionData[i].IdKelompokUtama;
                newOption.text = optionData[i].NamaKelompokUtama;
                break;
            case selectKelompok.id:
                newOption.value = optionData[i].IdKelompok;
                newOption.text = optionData[i].NamaKelompok;
                break;
            case selectSubKelompok.id:
                newOption.value = optionData[i].IdSubKelompok;
                newOption.text = optionData[i].NamaSubKelompok;
                break;
            default:
                break;
        }

        selectEle.appendChild(newOption);
    }
}

function clearOptions(idSelect, onlySelection) {
    const selectEle = document.getElementById(idSelect);
    const labelEle = document.querySelector(`label[for="${idSelect}"]`);
    selectEle.selectedIndex = 0;

    if (!onlySelection) {
        selectEle.innerHTML = `
            <option selected disabled>-- Pilih ${labelEle.textContent} --</option>
            <option value="loading" style="display: none" disabled>Loading...</option>
            <option value="temp">haloDunia</option>
        `;
    }
}

//#endregion
