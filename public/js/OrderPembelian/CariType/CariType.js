let search = document.getElementById("search");
let formCari = document.getElementById("formCari");
let inputText = document.getElementById("search_nama_barang");
let tabelData = document.getElementById("tabelData");

tabelData.style.display = "none";
search.disabled = true;

formCari.addEventListener("input", function (event) {
    search.disabled = !getInputValue();
});

formCari.addEventListener("change", function (event) {
    search.focus();
});

search.addEventListener("click", function (event) {
    if (getInputValue()) {
        let value = getInputValue();
        $("#tabelData").DataTable().clear().destroy();
        searchData(value);
    }
});

function getInputValue() {
    let value = inputText.value.trim();
    return value !== "" ? value : false;
}

function searchData(nm_brg) {
    tabelData.style.display = "table";

    $("#tabelData").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/CariTypeSearch",
            type: "GET",
            data: function (data) {
                data.nm_brg = nm_brg;
            },
        },
        columns: [
            { data: "NAMA_BRG" },
            { data: "KD_BRG" },
            { data: "nama" },
            { data: "nama_kategori" },
            { data: "nama_sub_kategori" },
            { data: "KET" },
        ],
    });
}
