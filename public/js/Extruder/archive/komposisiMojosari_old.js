const selectIdKomposisi = document.getElementById("select_id_komposisi");
const selectMesin = document.getElementById("select_mesin");
const selectHp = document.getElementById("select_hp");
const selectHpNg = document.getElementById("select_hp_ng");
const selectAfalan = document.getElementById("select_afalan");

const selectObjek = document.getElementById("select_objek");
const selectKelompokUtama = document.getElementById("select_kelompok_utama");
const selectKelompok = document.getElementById("select_kelompok");
const selectSubKelompok = document.getElementById("select_sub_kelompok");
const selectType = document.getElementById("select_type");

const formName = document.getElementById("form_name").value;
var idDivisi = "";
if (formName == "formKomposisiMojosari") {
    idDivisi = "MEX";
} else {
    idDivisi = "DEX";
}

selectIdKomposisi.addEventListener("change", function () {
    selectMesin.disabled = false;
    clearOptions(selectMesin.id);

    selectHp.disabled = true;
    selectHpNg.disabled = true;
    selectAfalan.disabled = true;
    selectObjek.disabled = true;
    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectMesin.addEventListener("click", function () {
    fetchData(
        "ExtruderNet/getIdKomposisi/" +
            idDivisi +
            "/" +
            selectIdKomposisi.value,
        this.id
    );
});

selectMesin.addEventListener("change", function () {
    selectHp.disabled = false;
    clearOptions(selectHp.id);

    selectHpNg.disabled = true;
    selectAfalan.disabled = true;
    selectObjek.disabled = true;
    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectHp.addEventListener("click", function () {
    fetchData(
        "ExtruderNet/getBarang/5/null/" +
            selectIdKomposisi.value +
            "/null/" +
            idDivisi +
            "/null",
        this.id
    );
});

selectHp.addEventListener("change", function () {
    selectHpNg.disabled = false;
    clearOptions(selectHpNg.id);

    selectAfalan.disabled = true;
    selectObjek.disabled = true;
    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectHpNg.addEventListener("click", function () {
    fetchData(
        "ExtruderNet/getBarang/6/null/" +
            selectIdKomposisi.value +
            "/null/" +
            idDivisi +
            "/null",
        this.id
    );
});

selectAfalan.addEventListener("change", function () {
    selectAfalan.disabled = false;
    clearOptions(selectAfalan.id);

    selectObjek.disabled = true;
    selectKelompok.disabled = true;
    selectSubKelompok.disabled = true;
    selectType.disabled = true;
});

selectAfalan.addEventListener("click", function () {
    fetchData(
        "ExtruderNet/getBarang/7/null/" +
            selectIdKomposisi.value +
            "/7227/" +
            idDivisi,
        this.id
    );
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
            case selectMesin.id:
                newOption.value = optionData[i].IdMesin;
                newOption.text = optionData[i].TypeMesin;
                break;
            case selectHp.id || selectHpNg.id || selectAfalan.id:
                newOption.value = optionData[i].KodeBarang;
                newOption.text = optionData[i].NamaType;
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
