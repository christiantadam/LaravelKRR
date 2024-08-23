let table_daftarTujuanKonversi = $("#table_daftarTujuanKonversi").DataTable();
$(document).ready(function () {
    //#region Get element by ID
    let id_divisiAsal = document.getElementById("id_divisiAsal");
    let nama_divisiAsal = document.getElementById("nama_divisiAsal");
    let button_divisiAsal = document.getElementById("button_divisiAsal");
    let id_objekAsal = document.getElementById("id_objekAsal");
    let nama_objekAsal = document.getElementById("nama_objekAsal");
    let button_objekAsal = document.getElementById("button_objekAsal");
    let id_kelompokUtamaAsal = document.getElementById("id_kelompokUtamaAsal");
    let nama_kelompokUtamaAsal = document.getElementById(
        "nama_kelompokUtamaAsal"
    );
    let button_kelompokUtamaAsal = document.getElementById(
        "button_kelompokUtamaAsal"
    );
    let id_kelompokAsal = document.getElementById("id_kelompokAsal");
    let nama_kelompokAsal = document.getElementById("nama_kelompokAsal");
    let button_kelompokAsal = document.getElementById("button_kelompokAsal");
    let id_subKelompokAsal = document.getElementById("id_subKelompokAsal");
    let nama_subKelompokAsal = document.getElementById("nama_subKelompokAsal");
    let button_subKelompokAsal = document.getElementById(
        "button_subKelompokAsal"
    );
    let div_PIBAsal = document.getElementById("div_PIBAsal");
    let PIB_asal = document.getElementById("PIB_asal");
    let id_typeAsal = document.getElementById("id_typeAsal");
    let nama_typeAsal = document.getElementById("nama_typeAsal");
    let button_typeAsal = document.getElementById("button_typeAsal");
    let saldo_terakhirAsalPrimer = document.getElementById(
        "saldo_terakhirAsalPrimer"
    );
    let satuan_saldoTerakhirAsalPrimer = document.getElementById(
        "satuan_saldoTerakhirAsalPrimer"
    );
    let saldo_terakhirAsalSekunder = document.getElementById(
        "saldo_terakhirAsalSekunder"
    );
    let satuan_saldoTerakhirAsalSekunder = document.getElementById(
        "satuan_saldoTerakhirAsalSekunder"
    );
    let saldo_terakhirAsalTritier = document.getElementById(
        "saldo_terakhirAsalTritier"
    );
    let satuan_saldoTerakhirAsalTritier = document.getElementById(
        "satuan_saldoTerakhirAsalTritier"
    );
    let pemakaian_primerAsal = document.getElementById("pemakaian_primerAsal");
    let satuan_primerAsal = document.getElementById("satuan_primerAsal");
    let pemakaian_sekunderAsal = document.getElementById(
        "pemakaian_sekunderAsal"
    );
    let satuan_sekunderAsal = document.getElementById("satuan_sekunderAsal");
    let pemakaian_tritierAsal = document.getElementById(
        "pemakaian_tritierAsal"
    );
    let satuan_tritierAsal = document.getElementById("satuan_tritierAsal");
    let id_divisiTujuan = document.getElementById("id_divisiTujuan");
    let nama_divisiTujuan = document.getElementById("nama_divisiTujuan");
    let button_divisiTujuan = document.getElementById("button_divisiTujuan");
    let id_objekTujuan = document.getElementById("id_objekTujuan");
    let nama_objekTujuan = document.getElementById("nama_objekTujuan");
    let button_objekTujuan = document.getElementById("button_objekTujuan");
    let id_kelompokUtamaTujuan = document.getElementById(
        "id_kelompokUtamaTujuan"
    );
    let nama_kelompokUtamaTujuan = document.getElementById(
        "nama_kelompokUtamaTujuan"
    );
    let button_kelompokUtamaTujuan = document.getElementById(
        "button_kelompokUtamaTujuan"
    );
    let id_kelompokTujuan = document.getElementById("id_kelompokTujuan");
    let nama_kelompokTujuan = document.getElementById("nama_kelompokTujuan");
    let button_kelompokTujuan = document.getElementById(
        "button_kelompokTujuan"
    );
    let id_subKelompokTujuan = document.getElementById("id_subKelompokTujuan");
    let nama_subKelompokTujuan = document.getElementById(
        "nama_subKelompokTujuan"
    );
    let button_subKelompokTujuan = document.getElementById(
        "button_subKelompokTujuan"
    );
    let div_PIBTujuan = document.getElementById("div_PIBTujuan");
    let PIB_tujuan = document.getElementById("PIB_tujuan");
    let id_typeTujuan = document.getElementById("id_typeTujuan");
    let nama_typeTujuan = document.getElementById("nama_typeTujuan");
    let button_typeTujuan = document.getElementById("button_typeTujuan");
    let saldo_terakhirTujuanPrimer = document.getElementById(
        "saldo_terakhirTujuanPrimer"
    );
    let satuan_saldoTerakhirTujuanPrimer = document.getElementById(
        "satuan_saldoTerakhirTujuanPrimer"
    );
    let saldo_terakhirTujuanSekunder = document.getElementById(
        "saldo_terakhirTujuanSekunder"
    );
    let satuan_saldoTerakhirTujuanSekunder = document.getElementById(
        "satuan_saldoTerakhirTujuanSekunder"
    );
    let saldo_terakhirTujuanTritier = document.getElementById(
        "saldo_terakhirTujuanTritier"
    );
    let satuan_saldoTerakhirTujuanTritier = document.getElementById(
        "satuan_saldoTerakhirTujuanTritier"
    );
    let pemakaian_primerTujuan = document.getElementById(
        "pemakaian_primerTujuan"
    );
    let satuan_primerTujuan = document.getElementById("satuan_primerTujuan");
    let pemakaian_sekunderTujuan = document.getElementById(
        "pemakaian_sekunderTujuan"
    );
    let satuan_sekunderTujuan = document.getElementById(
        "satuan_sekunderTujuan"
    );
    let pemakaian_tritierTujuan = document.getElementById(
        "pemakaian_tritierTujuan"
    );
    let satuan_tritierTujuan = document.getElementById("satuan_tritierTujuan");
    let uraian_transaksi = document.getElementById("uraian_transaksi");
    let button_isi = document.getElementById("button_isi");
    let button_koreksi = document.getElementById("button_koreksi");
    let button_hapus = document.getElementById("button_hapus");
    //#endregion

    //#region Function Mantap-mantap
    function clearAll() {
        // Clear all input fields
        document.querySelectorAll("input, textarea").forEach((element) => {
            element.value = "";
            element.disabled = true;
        });

        // Clear all DataTables data
        $(".dataTable").DataTable().clear().draw();

        // Disable all buttons
        document.querySelectorAll("button").forEach((button) => {
            if (!button.closest("#div_terakhir")) {
                button.disabled = true;
            }
        });
    }

    function activateAll() {
        // Enable all inputs
        document.querySelectorAll("input, textarea").forEach((element) => {
            element.disabled = false;
            element.readOnly = true;
        });
        // Enable all buttons
        document.querySelectorAll("button").forEach((button) => {
            if (!button.closest("#div_terakhir")) {
                button.disabled = false;
            }
        });
    }

    function getDataKonversi(jenisKegiatan) {
        Swal.fire({
            title: "Inputkan Id Konversi",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Look up",
            showLoaderOnConfirm: true,
            preConfirm: async (input) => {
                try {
                    // Use fetch to make an AJAX request to your Laravel controller
                    const response = await fetch(
                        `PermohonanKonversiJBBPotong/getDataKonversi?idKonversi=${input}`,
                        {
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        // Show error message if response is not ok
                        const errorData = await response.json();
                        return Swal.showValidationMessage(
                            `Request failed: ${JSON.stringify(errorData)}`
                        );
                    }

                    // Parse and return the JSON data from the response
                    return response.json();
                } catch (error) {
                    // Show validation message if there is a network or other error
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isDismissed) {
                kegiatanForm = "awal";
                return;
            } else if (result.isConfirmed) {
                // Handle the confirmed result data here
                setButton(jenisKegiatan);
                if (jenisKegiatan == "koreksi") {
                    activateAll();
                }
                console.log("Data retrieved successfully:", result.value);
                // You can add further processing of the data here if needed
            }
        });
    }

    function setButton(jenisKegiatan) {
        if (jenisKegiatan == "awal") {
            button_isi.innerHTML = "Isi";
            button_koreksi.innerHTML = "Koreksi";
            button_hapus.innerHTML = "Hapus";
            button_isi.disabled = false;
            button_koreksi.disabled = false;
            button_hapus.disabled = false;
            clearAll();
            button_isi.focus();
        } else {
            button_isi.innerHTML = "Proses";
            button_koreksi.innerHTML = "Koreksi";
            button_hapus.innerHTML = "Cancel";
            button_isi.disabled = false;
            button_koreksi.disabled = true;
            button_hapus.disabled = false;
        }
    }

    function showSelectionModal(
        entityName,
        tableId,
        ajaxUrl,
        ajaxData = {},
        onConfirmCallback
    ) {
        try {
            Swal.fire({
                title: `Pilih ${entityName}`,
                html: `<table id="${tableId}" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>ID ${entityName}</th>
                                    <th>Nama ${entityName}</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: "Pilih",
                cancelButtonText: "Tutup",
                returnFocus: false,
                preConfirm: () => {
                    const table = $(`#${tableId}`).DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $(`#${tableId}`).DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: ajaxUrl,
                                data: ajaxData, // Correctly use ajaxData parameter
                                dataType: "json",
                                type: "GET",
                                error: function (xhr, error, thrown) {
                                    console.error(
                                        "Error fetching data: ",
                                        thrown
                                    );
                                },
                            },
                            columns: [
                                { data: `Id${entityName}` },
                                { data: `Nama${entityName}` },
                            ],
                        });

                        $(`#${tableId} tbody`).on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, tableId)
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    onConfirmCallback(result.value);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    //#endregion

    //#region Setup Form
    let kegiatanForm = "awal";
    clearAll();
    setButton(kegiatanForm);
    button_isi.focus();
    //#endregion

    //#region add event listener
    button_isi.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.innerHTML != "Proses") {
            kegiatanForm = "isi";
            setButton(kegiatanForm);
            activateAll();
            button_divisiAsal.focus();
        } else {
            kegiatanForm = "awal";
            setButton(kegiatanForm);
            Swal.fire({
                icon: "info",
                title: "On Progress",
                text: "Button Proses masih belum dibuat",
                showConfirmButton: false,
            });
            console.log("hehe");
        }
    });

    button_koreksi.addEventListener("click", function (e) {
        e.preventDefault();
        if (kegiatanForm != "koreksi") {
            kegiatanForm = "koreksi";
            getDataKonversi(kegiatanForm);
        }
    });

    button_hapus.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.innerHTML != "Cancel") {
            kegiatanForm = "hapus";
            getDataKonversi(kegiatanForm);
        } else {
            kegiatanForm = "awal";
            setButton(kegiatanForm);
        }
    });

    button_divisiAsal.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Divisi",
            "table_divisiAsal",
            "PermohonanKonversiJBBPotong/getDivisi",
            {},
            (selectedRow) => {
                nama_divisiAsal.value = selectedRow.NamaDivisi
                    ? selectedRow.NamaDivisi.trim()
                    : "";
                id_divisiAsal.value = selectedRow.IdDivisi
                    ? selectedRow.IdDivisi.trim()
                    : "";
                button_objekAsal.focus();
            }
        );
    });

    button_objekAsal.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "objek",
            "table_objekAsal",
            "PermohonanKonversiJBBPotong/getObjek",
            { idDivisi: id_divisiAsal.value },
            (selectedRow) => {
                nama_objekAsal.value = selectedRow.Namaobjek
                    ? selectedRow.Namaobjek.trim()
                    : "";
                id_objekAsal.value = selectedRow.Idobjek
                    ? selectedRow.Idobjek.trim()
                    : "";
                button_kelompokUtamaAsal.focus();
            }
        );
    });

    button_divisiTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Divisi",
            "table_divisiTujuan",
            "PermohonanKonversiJBBPotong/getDivisi",
            {},
            (selectedRow) => {
                nama_divisiTujuan.value = selectedRow.NamaDivisi
                    ? selectedRow.NamaDivisi.trim()
                    : "";
                id_divisiTujuan.value = selectedRow.IdDivisi
                    ? selectedRow.IdDivisi.trim()
                    : "";
                button_objekTujuan.focus();
            }
        );
    });

    button_objekTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "objek",
            "table_objekTujuan",
            "PermohonanKonversiJBBPotong/getObjek",
            { idDivisi: id_divisiTujuan.value },
            (selectedRow) => {
                nama_objekTujuan.value = selectedRow.Namaobjek
                    ? selectedRow.Namaobjek.trim()
                    : "";
                id_objekTujuan.value = selectedRow.Idobjek
                    ? selectedRow.Idobjek.trim()
                    : "";
                button_kelompokUtamaTujuan.focus();
            }
        );
    });
    //#endregion
});
