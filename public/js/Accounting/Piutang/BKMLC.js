let btnOK = document.getElementById("btnOK");
let btnPilihBank = document.getElementById("btnPilihBank");
let tahun = document.getElementById('tahun');
let bulan = document.getElementById('bulan');
let tabelDataPelunasan = document.getElementById('tabelDataPelunasan');
let tabelDetailPelunasan = document.getElementById('tabelDetailPelunasan');
let tabelDetailKurangLebih = document.getElementById('tabelDetailKurangLebih');
let tabelDetailBiaya = document.getElementById('tabelDetailBiaya');
let dataTable;


btnOK.addEventListener('click', function (event) {
    event.preventDefault();
    // clickOK();
        fetch("/getListPelunasanDollar/" + bulan.value +"/"+ tahun.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                // dataTable = $("#tabelDataPelunasan").DataTable({
                //     data: options,
                //     columns: [
                //         {
                //             title: "Tgl Pelunasan", data: "Tgl_Pelunasan",
                //             render: function (data) {
                //                 return `<input type="checkbox" name="divisiCheckbox" value="${data}" /> ${data}`;
                //             },
                //         },
                //         { title: "Id. Pelunasan", data: "Id_Pelunasan" },
                //         { title: "Id. Bank", data: "Id_bank" },
                //         { title: "Jenis Pembayaran", data: "Jenis_Pembayaran" },
                //         { title: "Mata Uang", data: "Nama_MataUang" },
                //         { title: "Total Pelunasan", data: "Nilai_Pelunasan" },
                //         { title: "No. Bukti", data: "No_Bukti" },
                //         { title: "Tgl Pembuatan", data: "Tgl_Pembuatan" },
                //     ],
                // });
            });
})
