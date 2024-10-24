$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
        let btn_proses = document.getElementById("btn_proses");
        let btn_isi = document.getElementById("btn_isi");
        let btn_koreksi = document.getElementById("btn_koreksi");
        let btn_hapus = document.getElementById("btn_hapus");
        let btn_batal = document.getElementById("btn_batal");
        let btn_customer = document.getElementById("btn_customer");
        let btn_penagihan = document.getElementById("btn_penagihan");
        let btn_barang = document.getElementById("btn_barang");
        let btn_tambahItem = document.getElementById("btn_tambahItem");
        let btn_hapusItem = document.getElementById("btn_hapusItem");
        let btn_simpanM = document.getElementById("btn_simpanM");
        let btn_notaKredit = document.getElementById("btn_notaKredit");
        let tanggalInput = document.getElementById("tanggalInput");
        let nama_customer = document.getElementById("nama_customer");
        let idCustomer = document.getElementById("idCustomer");
        let idJenisCustomer = document.getElementById("idJenisCustomer");
        let no_penagihan = document.getElementById("no_penagihan");
        let namaBarang = document.getElementById("namaBarang");
        let kodeBarang = document.getElementById("kodeBarang");
        let hargaStlPotong = document.getElementById("hargaStlPotong");
        let totalPot = document.getElementById("totalPot");
        let totalPotongan = document.getElementById("totalPotongan");
        let mataUang = document.getElementById("mataUang");
        let idMataUang = document.getElementById("idMataUang");
        let statusPPN = document.getElementById("statusPPN");
        let jnsPPN = document.getElementById("jnsPPN");
        let statusPelunasan = document.getElementById("statusPelunasan");
        let statusPelunasan2 = document.getElementById("statusPelunasan2");
        let no_notaKredit = document.getElementById("no_notaKredit");
        let terbilang = document.getElementById("terbilang");
        let tutup_modal = document.getElementById("tutup_modal");
        let table_atas = $("#table_atas").DataTable({
            columnDefs: [{ targets: [6], visible: false }],
        });
        let table_tampilModal = $("#table_tampilModal").DataTable({
            // columnDefs: [{ targets: [4], visible: false }],
        });
        let table_hapus = $("#table_hapus").DataTable({
            // columnDefs: [{ targets: [4], visible: false }],
        });
    let proses = 1;
    tanggalInput.valueAsDate = new Date();

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#customerTable")
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
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "Free/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    proses: proses,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "idCust",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        // $("#customerTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );
                    idJenisCustomer.value = escapeHTML(
                        selectedRow.TIdJnsCust.trim()
                    );
                    idCustomer.value = escapeHTML(
                        selectedRow.TIdCustomer.trim()
                    );
                    console.log(idCustomer.value);
                    console.log(idJenisCustomer.value);

                    // idJenisCustomer.value = selectedRow.IDCust.trim().substring(
                    //     0,
                    //     3
                    // );
                    // idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    if (proses == 1) {
                        setTimeout(() => {
                            btn_penagihan.focus();
                        }, 300);
                    } else {
                        setTimeout(() => {
                            btn_notaKredit.focus();
                        }, 300);
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
