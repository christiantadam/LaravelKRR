let tabelStatusSupplier = document.getElementById("tabelStatusSupplier");
let idSupplier = document.getElementById("idSupplier");
let namaSupplier = document.getElementById("namaSupplier");
let idJenisSupplier = document.getElementById("idJenisSupplier");
let namaJenisSupplier = document.getElementById("namaJenisSupplier");

let btnIsi = document.getElementById("btnIsi");
let btnKoreksi = document.getElementById("btnKoreksi");
let btnProses = document.getElementById("btnProses");
let btnKeluar = document.getElementById("btnKeluar");
let btnBatal = document.getElementById("btnBatal");
let dataTable;

let formkoreksi = document.getElementById("formkoreksi");
let methodform = document.getElementById("methodkoreksi");

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();
    //namaBankselect.selectedIndex = 0;
    idSupplier.value = "";
    namaSupplier.value = "";
    idJenisSupplier.value = "";
    namaJenisSupplier.value = "";
});

function clickKoreksi() {
    btnIsi.disabled = true
    btnKoreksi.disabled = true;
    btnProses.style.display = "block";
    btnBatal.style.display = "block";
    proses = 2;
}

function clickBatal() {
    btnIsi.disabled = false;
    btnKoreksi.disabled = false;
    btnProses.style.display = "none";
    btnBatal.style.display = "none";
}

fetch("/getTabelStatusSupplier/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        tabelStatusSupplier = $("#tabelStatusSupplier").DataTable({
            data: options,
            columns: [
                { title: "id. Supp", data: "NO_SUP" },
                { title: "Nama Supplier", data: "NM_SUP" },
                { title: "Saldo", data: "SALDO_HUTANG" },
                { title: "Saldo Rp", data: "SALDO_HUTANG_Rp" },
                { title: "Jns Supp", data: "Nama_MataUang" },
                { title: "Jns Bayar", data: "STATUS" },
            ],
        });

        $("#tabelStatusSupplier tbody").off("click", "tr");
        $("#tabelStatusSupplier tbody").on("click", "tr", function () {
            let checkSelectedRows = $("#tabelStatusSupplier tbody tr.selected");

            if (checkSelectedRows.length > 0) {
                // Remove "selected" class from previously selected rows
                checkSelectedRows.removeClass("selected");
            }
            $(this).toggleClass("selected");
            const table = $("#tabelStatusSupplier").DataTable();
            let selectedRows = table.rows(".selected").data().toArray();
            console.log(selectedRows[0]);

            fetch("/detailStatusSupplier/" + selectedRows[0].NO_SUP)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                idSupplier.value = options[0].NO_SUP;
                namaSupplier.value = options[0].NM_SUP;
                idJenisSupplier.value = options[0].ID_MATAUANG;
                namaJenisSupplier.value = options[0].Nama_MataUang;

            })
        });


})


// btnProses.addEventListener("keypress", function (event) {
//     event.preventDefault();
//     fetch("/detailStatusSupplier/" + idSupplier.value)
//         .then((response) => response.json())
//         .then((options) => {
//             console.log(options);
//             idSupplier.value = options[0].NO_SUP;
//             namaSupplier.value = options[0].NM_SUP;
//         });

// });

btnProses.addEventListener ("click", function (event) {
    event.preventDefault();
    //console.log("masuk korek");
    methodform.value="PUT";
    formkoreksi.action = "/detailStatusSupplier/" + idSupplier.value;
    //formkoreksi.append(hiddenInput);
    formkoreksi.submit();

});

