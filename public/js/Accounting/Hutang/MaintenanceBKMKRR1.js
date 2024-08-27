$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_matauang = document.getElementById("btn_matauang");
    let btn_bank = document.getElementById("btn_bank");
    let btn_jenispembayaran = document.getElementById("btn_jenispembayaran");
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
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let id_jnsPem = document.getElementById("id_jnsPem");

    id_bkm.readOnly = true;
    tanggal_input.valueAsDate = new Date();
    tanggal_input.focus();

    tanggal_input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            diterima_dari.focus();
        }
    });

    diterima_dari.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_matauang.focus();
        }
    });

    jumlah_uang.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(jumlah_uang.value.replace(/,/g, ""));
            if (!isNaN(value)) {
                jumlah_uang.value = value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            }
            btn_bank.focus();
        }
    });

    no_bukti.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            uraian.focus();
        }
    });

    uraian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (
                diterima_dari !== "" &&
                jumlah_uang !== "" &&
                nama_bank !== "" &&
                keterangan_kira !== "" &&
                mata_uang !== "" &&
                jenis_pembayaran !== ""
            ) {
                $.ajax({
                    url: "MaintenanceBKMKRR1/processData",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        diterima_dari: diterima_dari.value,
                        jumlah_uang: jumlah_uang.value,
                        nama_bank: nama_bank.value,
                        keterangan_kira: keterangan_kira.value,
                        mata_uang: mata_uang.value,
                        jenis_pembayaran: jenis_pembayaran.value,
                        id_bank: id_bank.value,
                        tanggal_input: tanggal_input.value,
                        id_bkm: id_bkm.value,
                    },
                    success: function (data) {
                        console.log(data);
                        id_bkm.value = data.idBKM;
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: response.error,
                                showConfirmButton: false,
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            } else {
                alert("Please fill in all required fields!");
                jumlah_uang.focus();
            }
        }
    });

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
                    setTimeout(() => {
                        no_bukti.focus();
                    }, 300);
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
                    setTimeout(() => {
                        jumlah_uang.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_jenispembayaran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pembayaran",
                html: '<table id="tableJenisPem" class="display" style="width:100%"><thead><tr><th>Jenis Pembayaran</th><th>ID. Pembayaran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableJenisPem")
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
                        const table = $("#tableJenisPem").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getJenisBayar",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Jenis_Pembayaran" },
                                { data: "Id_Jenis_Bayar" },
                            ],
                        });
                        $("#tableJenisPem tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableJenisPem")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    jenis_pembayaran.value = selectedRow.Jenis_Pembayaran;
                    id_jnsPem.value = selectedRow.Id_Jenis_Bayar;
                    setTimeout(() => {
                        btn_kodeperkiraan.focus();
                    }, 300);
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
                    nama_bank.value = selectedRow.Nama_Bank;
                    id_bank.value = selectedRow.Id_Bank;
                    setTimeout(() => {
                        btn_jenispembayaran.focus();
                    }, 300);

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
