let namaSupplierSelect = document.getElementById('namaSupplierSelect');
let idSupplier = document.getElementById('idSupplier');
let tabelListDetailBrg = $("#tabelListDetailBrg").DataTable();

let btnProses = document.getElementById('btnProses');

fetch("/getSupplierTTKRR1/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaSupplierSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Supplier";
        namaSupplierSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NM_SUP + "|" + entry.NO_SUP;
            namaSupplierSelect.appendChild(option);
        });
});
namaSupplierSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = namaSupplierSelect.options[namaSupplierSelect.selectedIndex];
    if (selectedOption) {

        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[1];
        idSupplier.value = idJenis;
    }

    fetch("/getTabelListDetailBrg/" + idSupplier.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        tabelListDetailBrg = $("#tabelListDetailBrg").DataTable({
            destroy: true,
            data: options,
            columns: [
                { title: "Divisi", data: "Kd_div" },
                { title: "PO", data: "NO_PO" },
                { title: "No. BTTB", data: "No_BTTB" },
                { title: "Nilai Tagih", data: "Harga_terbayar" },
                { title: "Kd. Barang", data: "Kd_brg" },
                { title: "Nama Barang", data: "NAMA_BRG" },
                { title: "Qty", data: "Qty_Terima" },
                { title: "Satuan", data: "SatTerima" },
                { title: "No. Terima", data: "No_terima" },
                { title: "Hrg. Satuan", data: "Hrg_trm" },
                { title: "Kurs", data: "Kurs_Rp" },
                { title: "Disc", data: "Disc_trm" },
                { title: "PPN", data: "Ppn_trm" },
                { title: "Hrg. Disc", data: "Harga_disc" },
                { title: "Hrg. PPN", data: "Harga_Ppn" },
                { title: "Sat. Terima", data: "Sat_Terima" },
                { title: "Hrg. Murni", data: "Harga_murni" }
            ]
        });
    })
    btnProses.disabled = false;
});


