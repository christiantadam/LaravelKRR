let idCustomer = document.getElementById('idCustomer');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');

let idPenagihan = document.getElementById('idPenagihan');
let statusLama = document.getElementById('statusLama');
let statusBaruSelect = document.getElementById('statusBaruSelect');
let idStatus = document.getElementById('idStatus');
let id_Penagihan = document.getElementById('id_Penagihan');

let btnProses = document.getElementById('btnProses');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

fetch("/getCustomerr/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaCustomerSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Cust";
        namaCustomerSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IDCust; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IDCust + "|" + entry.NAMACUST; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            namaCustomerSelect.appendChild(option);
        });
});

namaCustomerSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        const idcust = bagiansatu[1];
        namacust = bagiansatu[2];
        idCustomer.value = idcust;
        // idJenisCustomer.value  = jenis;

        fetch("/getTabelStatusDokumen/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            tabelStatusDokumen = $("#tabelStatusDokumen").DataTable({
                data: options,
                columns: [
                    { title: "Penagihan", data: "ID_Penagihan" },
                    { title: "Tgl. Penagihan", data: "tgl_penagihan" },
                    { title: "Id. Status", data: "idstatus" },
                    { title: "Status", data: "status" }
                ],
            });
        });

        $("#tabelStatusDokumen tbody").off("click", "tr");
        $("#tabelStatusDokumen tbody").on("click", "tr", function () {
            let checkSelectedRows = $("#tabelStatusDokumen tbody tr.selected");

            if (checkSelectedRows.length > 0) {
                // Remove "selected" class from previously selected rows
                checkSelectedRows.removeClass("selected");
            }
            $(this).toggleClass("selected");
            const table = $("#tabelStatusDokumen").DataTable();
            let selectedRows = table.rows(".selected").data().toArray();
            console.log(selectedRows[0]);

            idPenagihan.value = selectedRows[0].ID_Penagihan;
            statusLama.value = selectedRows[0].status;

            id_Penagihan.value = idPenagihan.value.replace(/\//g, '.');
        });
    };
});

fetch("/getDataStatusDokumen/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        statusBaruSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Pajak";
        statusBaruSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IdStatus; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IdStatus + "|" + entry.Status; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            statusBaruSelect.appendChild(option);
    });
});

statusBaruSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = statusBaruSelect.options[statusBaruSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        idStatus.value  = jenis;
    }
    btnProses.disabled = false;
    btnProses.focus();
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    if(statusBaruSelect.selectedIndex == 0) {
        alert('Isi Statusnya dulu');
    }

    methodkoreksi.value="PUT";
    formkoreksi.action = "/StatusDokumenTagihan/" + id_Penagihan.value;
    formkoreksi.submit();
})
