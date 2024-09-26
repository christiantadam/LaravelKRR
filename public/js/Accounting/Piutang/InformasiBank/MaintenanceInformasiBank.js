$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_bank = document.getElementById("btn_bank");
    let tanggal = document.getElementById("tanggal");
    let idReferensi = document.getElementById("idReferensi");
    let nama_bank = document.getElementById("nama_bank");
    let mata_uang = document.getElementById("mata_uang");
    let totalNilai = document.getElementById("totalNilai");
    let keterangan = document.getElementById("keterangan");
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let noBukti = document.getElementById("noBukti");
    let idBank = document.getElementById("idBank");
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });

    tanggal.valueAsDate = new Date();

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            autoWidth: false,
            ajax: {
                url: "MaintenanceInformasiBank/displayData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                    });
                },
            },
            columns: [
                {
                    data: "IdReferensi",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Nama_Bank" },
                { data: "Nama_MataUang" },
                { data: "Nilai" },
                { data: "Keterangan" },
                { data: "NamaCust" },
                { data: "Id_Bank" },
                { data: "Id_MataUang" },
                { data: "TypeTransaksi" },
                { data: "Id_Jenis_Bayar" },
                { data: "Jenis_Pembayaran" },
                { data: "No_Bukti" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();

        idReferensi.value = data.IdReferensi;
        nama_bank.value = data.Nama_Bank;
        mata_uang.value = data.Nama_MataUang;
        totalNilai.value = data.Nilai;
        keterangan.value = data.Keterangan;
        jenis_pembayaran.value = data.Jenis_Pembayaran;
        noBukti.value = data.No_Bukti;
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Nama Bank</th><th>ID. Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableBank")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#tableBank").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceInformasiBank/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_Bank" },
                                { data: "Id_Bank" },
                            ],
                        });
                        $("#tableBank tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBank")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_bank.value = escapeHTML(
                        selectedRow.Nama_Bank.trim()
                    );
                    idBank.value = escapeHTML(
                        selectedRow.Id_Bank.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
