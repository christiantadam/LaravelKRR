$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_matauang = document.getElementById("btn_matauang");
    let btn_bank = document.getElementById("btn_bank");
    let btn_tambahbiaya = document.getElementById("btn_tambahbiaya");
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");
    let mata_uang = document.getElementById("mata_uang");
    let kode_matauang = document.getElementById("kode_matauang");
    let nama_bank = document.getElementById("nama_bank");
    let id_bank = document.getElementById("id_bank");
    let jenis_bank = document.getElementById("jenis_bank");
    let tanggal_input = document.getElementById("tanggal_input");
    let id_bkm = document.getElementById("id_bkm");
    let diterima_dari = document.getElementById("diterima_dari");
    let kurs_rupiah = document.getElementById("kurs_rupiah");
    let jumlah_uang = document.getElementById("jumlah_uang");
    let no_bukti = document.getElementById("no_bukti");
    let uraian = document.getElementById("uraian");

    tanggal_input.valueAsDate = new Date();

    btn_kodeperkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
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
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getKira",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_kira.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    keterangan_kira.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_matauang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mata Uang",
                html: '<table id="tablematauang" class="display" style="width:100%"><thead><tr><th>Mata Uang</th><th>ID. Mata Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tablematauang")
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
                        const table = $("#tablematauang").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getMataUang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_MataUang" },
                                { data: "Id_MataUang" },
                            ],
                        });
                        $("#tablematauang tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tablematauang")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_matauang.value = selectedRow.Id_MataUang;
                    mata_uang.value = selectedRow.Nama_MataUang;
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Nama Bank</th><th>ID. Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
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
                                url: "MaintenanceBKMKRR1/getBank",
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
                        $("#tableBank tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBank")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_bank.value = selectedRow.Nama_Bank;
                    id_bank.value = selectedRow.Id_Bank;

                    $.ajax({
                        url: "MaintenanceBKMKRR1/getBankDetail",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_bank: id_bank.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenis_bank.value = data.JenisBank;
                            console.log(jenis_bank.value);

                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
