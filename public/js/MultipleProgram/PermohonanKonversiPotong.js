jQuery(function ($) {
    //#region Get element by ID
    // Initialize DataTable with additional hidden columns
    let table_daftarTujuanKonversi = $("#table_daftarTujuanKonversi").DataTable(
        {
            columns: [
                { title: "Id Type Tujuan" }, // Column 0
                { title: "Nama Type Tujuan" }, // Column 1
                { title: "Saldo Primer" }, // Column 2
                { title: "Saldo Sekunder" }, // Column 3
                { title: "Saldo Tritier" }, // Column 4
                { title: "Id Divisi" }, // Column 5
                { title: "Id Objek" }, // Column 6
                { title: "Id Kelompok Utama" }, // Column 7
                { title: "Id Kelompok" }, // Column 8
                { title: "Id Sub Kelompok" }, // Column 9
                { title: "Nama Divisi Tujuan" }, // Hidden Column 10
                { title: "Nama Objek Tujuan" }, // Hidden Column 11
                { title: "Nama Kelompok Utama Tujuan" }, // Hidden Column 12
                { title: "Nama Kelompok Tujuan" }, // Hidden Column 13
                { title: "Nama Sub Kelompok Tujuan" }, // Hidden Column 14
                { title: "Saldo Terakhir Tujuan Primer" }, // Hidden Column 15
                { title: "Saldo Terakhir Tujuan Sekunder" }, // Hidden Column 16
                { title: "Saldo Terakhir Tujuan Tritier" }, // Hidden Column 17
                { title: "Satuan Primer Tujuan" }, // Hidden Column 18
                { title: "Satuan Sekunder Tujuan" }, // Hidden Column 19
                { title: "Satuan Tritier Tujuan" }, // Hidden Column 20
                { title: "Satuan Saldo Terakhir Tujuan Primer" } /* Hidden Column 21*/, // prettier-ignore
                { title: "Satuan Saldo Terakhir Tujuan Sekunder" } /* Hidden Column 22 */, //prettier-ignore
                { title: "Satuan Saldo Terakhir Tujuan Tritier", visibility: false } /* Hidden Column 23 */, // prettier-ignore
                { title: "Id Tmp Transaksi" }, // Column 24 // prettier-ignore
            ],
            columnDefs: [
                {
                    target: 23,
                    visible: false
                }
            ]
        }
    );
    let button_divisiAsal = document.getElementById("button_divisiAsal"); // prettier-ignore
    let button_divisiTujuan = document.getElementById("button_divisiTujuan"); // prettier-ignore
    let button_hapus = document.getElementById("button_hapus"); // prettier-ignore
    let button_hapusTujuanKonversi = document.getElementById("button_hapusTujuanKonversi"); // prettier-ignore
    let button_isi = document.getElementById("button_isi"); // prettier-ignore
    let button_kelompokAsal = document.getElementById("button_kelompokAsal"); // prettier-ignore
    let button_kelompokTujuan = document.getElementById("button_kelompokTujuan"); // prettier-ignore
    let button_kelompokUtamaAsal = document.getElementById("button_kelompokUtamaAsal"); // prettier-ignore
    let button_kelompokUtamaTujuan = document.getElementById("button_kelompokUtamaTujuan"); // prettier-ignore
    let button_koreksi = document.getElementById("button_koreksi"); // prettier-ignore
    let button_objekAsal = document.getElementById("button_objekAsal"); // prettier-ignore
    let button_objekTujuan = document.getElementById("button_objekTujuan"); // prettier-ignore
    let button_subKelompokAsal = document.getElementById("button_subKelompokAsal"); // prettier-ignore
    let button_subKelompokTujuan = document.getElementById("button_subKelompokTujuan"); // prettier-ignore
    let button_tambahTujuanKonversi = document.getElementById("button_tambahTujuanKonversi"); // prettier-ignore
    let button_typeAsal = document.getElementById("button_typeAsal"); // prettier-ignore
    let button_typeTujuan = document.getElementById("button_typeTujuan"); // prettier-ignore
    let button_updateTujuanKonversi = document.getElementById("button_updateTujuanKonversi"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let div_asalKonversi = document.getElementById("div_asalKonversi"); // prettier-ignore
    let div_PIBAsal = document.getElementById("div_PIBAsal"); // prettier-ignore
    let div_PIBTujuan = document.getElementById("div_PIBTujuan"); // prettier-ignore
    let div_tabelTujuanKonversi = document.getElementById("div_tabelTujuanKonversi"); // prettier-ignore
    let div_tujuanKonversi = document.getElementById("div_tujuanKonversi"); // prettier-ignore
    let divisiPotong = document.getElementById("divisiPotong");
    let id_divisiAsal = document.getElementById("id_divisiAsal"); // prettier-ignore
    let id_divisiTujuan = document.getElementById("id_divisiTujuan"); // prettier-ignore
    let id_kelompokAsal = document.getElementById("id_kelompokAsal"); // prettier-ignore
    let id_kelompokTujuan = document.getElementById("id_kelompokTujuan"); // prettier-ignore
    let id_kelompokUtamaAsal = document.getElementById("id_kelompokUtamaAsal"); // prettier-ignore
    let id_kelompokUtamaTujuan = document.getElementById("id_kelompokUtamaTujuan"); // prettier-ignore
    let id_objekAsal = document.getElementById("id_objekAsal"); // prettier-ignore
    let id_objekTujuan = document.getElementById("id_objekTujuan"); // prettier-ignore
    let id_subKelompokAsal = document.getElementById("id_subKelompokAsal"); // prettier-ignore
    let id_subKelompokTujuan = document.getElementById("id_subKelompokTujuan"); // prettier-ignore
    let id_typeAsal = document.getElementById("id_typeAsal"); // prettier-ignore
    let id_typeTujuan = document.getElementById("id_typeTujuan"); // prettier-ignore
    let id_tmpTransaksi = document.getElementById("id_tmpTransaksi"); // prettier-ignore
    // Array of input field IDs
    const inputIds = [
        "id_typeTujuan",
        "nama_typeTujuan",
        "pemakaian_primerTujuan",
        "pemakaian_sekunderTujuan",
        "pemakaian_tritierTujuan",
        "id_divisiTujuan",
        "id_objekTujuan",
        "id_kelompokUtamaTujuan",
        "id_kelompokTujuan",
        "id_subKelompokTujuan",
        "nama_divisiTujuan",
        "nama_objekTujuan",
        "nama_kelompokUtamaTujuan",
        "nama_kelompokTujuan",
        "nama_subKelompokTujuan",
        "saldo_terakhirTujuanPrimer",
        "saldo_terakhirTujuanSekunder",
        "saldo_terakhirTujuanTritier",
        "satuan_primerTujuan",
        "satuan_sekunderTujuan",
        "satuan_tritierTujuan",
        "satuan_saldoTerakhirTujuanPrimer",
        "satuan_saldoTerakhirTujuanSekunder",
        "satuan_saldoTerakhirTujuanTritier",
        "id_tmpTransaksi",
    ];
    let nama_divisiAsal = document.getElementById("nama_divisiAsal"); // prettier-ignore
    let nama_divisiTujuan = document.getElementById("nama_divisiTujuan"); // prettier-ignore
    let nama_kelompokAsal = document.getElementById("nama_kelompokAsal"); // prettier-ignore
    let nama_kelompokTujuan = document.getElementById("nama_kelompokTujuan"); // prettier-ignore
    let nama_kelompokUtamaAsal = document.getElementById("nama_kelompokUtamaAsal"); // prettier-ignore
    let nama_kelompokUtamaTujuan = document.getElementById("nama_kelompokUtamaTujuan"); // prettier-ignore
    let nama_objekAsal = document.getElementById("nama_objekAsal"); // prettier-ignore
    let nama_objekTujuan = document.getElementById("nama_objekTujuan"); // prettier-ignore
    let nama_subKelompokAsal = document.getElementById("nama_subKelompokAsal"); // prettier-ignore
    let nama_subKelompokTujuan = document.getElementById("nama_subKelompokTujuan"); // prettier-ignore
    let nama_typeAsal = document.getElementById("nama_typeAsal"); // prettier-ignore
    let nama_typeTujuan = document.getElementById("nama_typeTujuan"); // prettier-ignore
    let pemakaian_primerAsal = document.getElementById("pemakaian_primerAsal"); // prettier-ignore
    let pemakaian_primerTujuan = document.getElementById("pemakaian_primerTujuan"); // prettier-ignore
    let pemakaian_sekunderAsal = document.getElementById("pemakaian_sekunderAsal"); // prettier-ignore
    let pemakaian_sekunderTujuan = document.getElementById("pemakaian_sekunderTujuan"); // prettier-ignore
    let pemakaian_tritierAsal = document.getElementById("pemakaian_tritierAsal"); // prettier-ignore
    let pemakaian_tritierTujuan = document.getElementById("pemakaian_tritierTujuan"); // prettier-ignore
    let PIB_asal = document.getElementById("PIB_asal"); // prettier-ignore
    let PIB_tujuan = document.getElementById("PIB_tujuan"); // prettier-ignore
    let saldo_terakhirAsalPrimer = document.getElementById("saldo_terakhirAsalPrimer"); // prettier-ignore
    let saldo_terakhirAsalSekunder = document.getElementById("saldo_terakhirAsalSekunder"); // prettier-ignore
    let saldo_terakhirAsalTritier = document.getElementById("saldo_terakhirAsalTritier"); // prettier-ignore
    let saldo_terakhirTujuanPrimer = document.getElementById("saldo_terakhirTujuanPrimer"); // prettier-ignore
    let saldo_terakhirTujuanSekunder = document.getElementById("saldo_terakhirTujuanSekunder"); // prettier-ignore
    let saldo_terakhirTujuanTritier = document.getElementById("saldo_terakhirTujuanTritier"); // prettier-ignore
    let satuan_primerAsal = document.getElementById("satuan_primerAsal"); // prettier-ignore
    let satuan_primerTujuan = document.getElementById("satuan_primerTujuan"); // prettier-ignore
    let satuan_saldoTerakhirAsalPrimer = document.getElementById("satuan_saldoTerakhirAsalPrimer"); // prettier-ignore
    let satuan_saldoTerakhirAsalSekunder = document.getElementById("satuan_saldoTerakhirAsalSekunder"); // prettier-ignore
    let satuan_saldoTerakhirAsalTritier = document.getElementById("satuan_saldoTerakhirAsalTritier"); // prettier-ignore
    let satuan_saldoTerakhirTujuanPrimer = document.getElementById("satuan_saldoTerakhirTujuanPrimer"); // prettier-ignore
    let satuan_saldoTerakhirTujuanSekunder = document.getElementById("satuan_saldoTerakhirTujuanSekunder"); // prettier-ignore
    let satuan_saldoTerakhirTujuanTritier = document.getElementById("satuan_saldoTerakhirTujuanTritier"); // prettier-ignore
    let satuan_sekunderAsal = document.getElementById("satuan_sekunderAsal"); // prettier-ignore
    let satuan_sekunderTujuan = document.getElementById("satuan_sekunderTujuan"); // prettier-ignore
    let satuan_tritierAsal = document.getElementById("satuan_tritierAsal"); // prettier-ignore
    let satuan_tritierTujuan = document.getElementById("satuan_tritierTujuan"); // prettier-ignore
    let proses;
    //#endregion

    //#region Function Mantap-mantap
    function clearAll(divTarget) {
        // Get the target div element
        const targetDiv = document.getElementById(divTarget);

        if (!targetDiv) {
            console.error(`Element with id ${divTarget} not found.`);
            return;
        }

        // Clear all input fields and textareas within the target div
        targetDiv.querySelectorAll("input, textarea").forEach((element) => {
            element.value = "";
            element.disabled = true; // Disable after clearing
        });

        // Clear all DataTables data within the target div
        $(targetDiv).find(".dataTable").DataTable().clear().draw();

        // Disable all buttons within the target div
        targetDiv.querySelectorAll("button").forEach((button) => {
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
            if (
                !button.closest("#div_terakhir") &&
                !(button.id == "button_updateTujuanKonversi") &&
                !(button.id == "button_hapusTujuanKonversi")
            ) {
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
            confirmButtonText: "Proses",
            showLoaderOnConfirm: true,
            preConfirm: async (input) => {
                try {
                    // Use fetch to make an AJAX request to your Laravel controller
                    const response = await fetch(
                        `getDataKonversi?idKonversi=${input}`,
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
                    $.ajax({
                        url: "/PermohonanKonversiPotong/getDataKoreksi",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_konversi: result.value,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                nama_divisiAsal.value = data[0].NamaDivisi;
                                id_divisiAsal.value = data[0].IdDivisi;
                                nama_objekAsal.value = data[0].NamaObjek;
                                id_objekAsal.value = data[0].IdObjek;
                                nama_typeAsal.value = data[0].NamaType;
                                id_typeAsal.value = data[0].IdType;
                                id_kelompokUtamaAsal.value =
                                    data[0].IdKelompokUtama;
                                nama_kelompokUtamaAsal.value =
                                    data[0].NamaKelompokUtama;
                                id_kelompokAsal.value = data[0].IdKelompok;
                                nama_kelompokAsal.value = data[0].NamaKelompok;
                                id_subKelompokAsal.value =
                                    data[0].IdSubkelompok;
                                nama_subKelompokAsal.value =
                                    data[0].NamaSubKelompok;
                                saldo_terakhirAsalPrimer.value = parseFloat(
                                    data[0].SaldoPrimer
                                ).toFixed(2);
                                satuan_saldoTerakhirAsalPrimer.value =
                                    data[0].satPrimer;
                                saldo_terakhirAsalSekunder.value = parseFloat(
                                    data[0].SaldoSekunder
                                ).toFixed(2);
                                data[0].SaldoSekunder;
                                satuan_saldoTerakhirAsalSekunder.value =
                                    data[0].satSekunder;
                                saldo_terakhirAsalTritier.value = parseFloat(
                                    data[0].SaldoTritier
                                ).toFixed(2);
                                data[0].SaldoTritier;
                                satuan_saldoTerakhirAsalTritier.value =
                                    data[0].nama_satuan;
                                pemakaian_primerAsal.value = parseFloat(
                                    data[0].JumlahPengeluaranPrimer
                                ).toFixed(2);
                                satuan_primerAsal.value = data[0].satPrimer;
                                pemakaian_sekunderAsal.value = parseFloat(
                                    data[0].JumlahPengeluaranSekunder
                                ).toFixed(2);
                                satuan_sekunderAsal.value = data[0].satSekunder;
                                pemakaian_tritierAsal.value = parseFloat(
                                    data[0].JumlahPengeluaranTritier
                                ).toFixed(2);
                                satuan_tritierAsal.value = data[0].nama_satuan;

                                // Filter data untuk DataTable, mulai dari indeks 1
                                var dataForTable = data.slice(1);

                                console.log(dataForTable);

                                if (
                                    $.fn.DataTable.isDataTable(
                                        "#table_daftarTujuanKonversi"
                                    )
                                ) {
                                    var table = $(
                                        "#table_daftarTujuanKonversi"
                                    ).DataTable();

                                    // Tambahkan setiap data pada `dataForTable` sebagai baris baru
                                    dataForTable.forEach(function (item) {
                                        // Menyusun data sesuai dengan struktur kolom DataTable
                                        var inputData = [
                                            item.IdType,
                                            item.NamaType,
                                            parseFloat(
                                                item.JumlahPemasukanPrimer
                                            ).toFixed(2),
                                            parseFloat(
                                                item.JumlahPemasukanSekunder
                                            ).toFixed(2),
                                            parseFloat(
                                                item.JumlahPemasukanTritier
                                            ).toFixed(2),
                                            item.IdDivisi,
                                            item.IdObjek,
                                            item.IdKelompokUtama,
                                            item.IdKelompok,
                                            item.IdSubkelompok,
                                            item.NamaDivisi,
                                            item.NamaObjek,
                                            item.NamaKelompokUtama,
                                            item.NamaKelompok,
                                            item.NamaSubKelompok,
                                            parseFloat(
                                                item.SaldoPrimer
                                            ).toFixed(2),
                                            parseFloat(
                                                item.SaldoSekunder
                                            ).toFixed(2),
                                            parseFloat(
                                                item.SaldoTritier
                                            ).toFixed(2),
                                            item.satPrimer,
                                            item.satSekunder,
                                            item.nama_satuan,
                                            item.satPrimer,
                                            item.satSekunder,
                                            item.nama_satuan,
                                            item.IdTransaksi,
                                        ];

                                        table.row.add(inputData).draw();
                                    });
                                } else {
                                    console.error(
                                        "DataTable belum diinisialisasi!"
                                    );
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
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
            clearAll("div_asalKonversi");
            clearAll("div_tabelTujuanKonversi");
            clearAll("div_tujuanKonversi");
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
        return new Promise((resolve, reject) => {
            // Return a new promise
            try {
                Swal.fire({
                    title: `Pilih ${entityName}`,
                    html: `<table id="${tableId}" class="display" style="width:100%; white-space: nowrap;">
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
                    customClass: {
                        popup: "swal-wide", // Apply the custom width class
                    },
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
                        jQuery(function ($) {
                            const table = $(`#${tableId}`).DataTable({
                                responsive: true,
                                processing: true,
                                serverSide: true,
                                order: [[1, "asc"]],
                                ajax: {
                                    url: ajaxUrl,
                                    data: ajaxData,
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

                            $(`#${tableId} tbody`).on(
                                "click",
                                "tr",
                                function () {
                                    table
                                        .$("tr.selected")
                                        .removeClass("selected");
                                    $(this).addClass("selected");
                                }
                            );

                            currentIndex = null;
                            Swal.getPopup().addEventListener("keydown", (e) =>
                                handleTableKeydownInSwal(e, tableId)
                            );
                        });
                    },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            onConfirmCallback(result.value);
                            resolve(); // Resolve the promise after modal is confirmed
                        } else if (
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            resolve(); // Also resolve the promise if the user cancels
                        }
                    })
                    .catch((error) => {
                        console.error("An error occurred:", error);
                        reject(error); // Reject the promise in case of an error
                    });
            } catch (error) {
                console.error("An error occurred:", error);
                reject(error); // Reject the promise if there's an error
            }
        });
    }

    // function setUpDataType(jenisData, dataTypeHasilAjax = {}) {
    //     if (jenisData == "DataTypeAsal") {
    //     } else {
    //     }
    // }

    //#endregion

    //#region Setup Form
    let kegiatanForm = "awal";
    clearAll("div_asalKonversi");
    clearAll("div_tabelTujuanKonversi");
    clearAll("div_tujuanKonversi");
    setButton(kegiatanForm);
    button_isi.focus();
    //#endregion

    //#region add event listener
    button_isi.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.innerHTML != "Proses") {
            kegiatanForm = "isi";
            proses = 1;
            setButton(kegiatanForm);
            activateAll();
            button_divisiAsal.focus();
        } else {
            kegiatanForm = "awal";

            // Create an object to store all input values
            let asalKonversiInputValues = {};

            // Select all input elements within the div with id 'div_asalKonversi'
            $("#div_asalKonversi input").each(function () {
                // Get the name attribute of the input element
                let inputName = $(this).attr("name");

                // Get the value of the input element
                let inputValue = $(this).val();

                // Store the input value in the object with the input name as the key
                asalKonversiInputValues[inputName] = inputValue;
            });
            $.ajax({
                type: "POST",
                url: "/PermohonanKonversiPotong",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    table_daftarTujuanKonversi: table_daftarTujuanKonversi
                        .rows()
                        .data()
                        .toArray(),
                    asalKonversiInputValues: asalKonversiInputValues,
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
            // setButton(kegiatanForm);
        }
    });

    button_koreksi.addEventListener("click", function (e) {
        e.preventDefault();
        if (kegiatanForm != "koreksi") {
            kegiatanForm = "koreksi";
            proses = 2;
            getDataKonversi(kegiatanForm);
        }
    });

    button_hapus.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.innerHTML != "Cancel") {
            kegiatanForm = "hapus";
            proses = 3;
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
            "getDivisi",
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
            "getObjek",
            { idDivisi: id_divisiAsal.value },
            (selectedRow) => {
                nama_objekAsal.value = selectedRow.Namaobjek
                    ? escapeHTML(selectedRow.Namaobjek.trim())
                    : "";
                id_objekAsal.value = selectedRow.Idobjek
                    ? selectedRow.Idobjek.trim()
                    : "";
                button_kelompokUtamaAsal.focus();
            }
        );
    });

    button_kelompokUtamaAsal.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "KelompokUtama",
            "table_kelompokUtamaAsal",
            "getKelompokUtama",
            { idObjek: id_objekAsal.value },
            (selectedRow) => {
                nama_kelompokUtamaAsal.value = selectedRow.NamaKelompokUtama
                    ? escapeHTML(selectedRow.NamaKelompokUtama.trim())
                    : "";
                id_kelompokUtamaAsal.value = selectedRow.IdKelompokUtama
                    ? selectedRow.IdKelompokUtama.trim()
                    : "";
                button_kelompokAsal.focus();
            }
        );
    });

    button_kelompokAsal.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Kelompok",
            "table_kelompokAsal",
            "getKelompok",
            { idKelompokUtama: id_kelompokUtamaAsal.value },
            (selectedRow) => {
                nama_kelompokAsal.value = selectedRow.NamaKelompok
                    ? escapeHTML(selectedRow.NamaKelompok.trim())
                    : "";
                id_kelompokAsal.value = selectedRow.IdKelompok
                    ? selectedRow.IdKelompok.trim()
                    : "";
                button_subKelompokAsal.focus();
            }
        );
    });

    button_subKelompokAsal.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "SubKelompok",
            "table_subKelompokAsal",
            "getSubKelompok",
            { idKelompok: id_kelompokAsal.value },
            (selectedRow) => {
                nama_subKelompokAsal.value = selectedRow.NamaSubKelompok
                    ? escapeHTML(selectedRow.NamaSubKelompok.trim())
                    : "";
                id_subKelompokAsal.value = selectedRow.IdSubKelompok
                    ? selectedRow.IdSubKelompok.trim()
                    : "";
                button_typeAsal.focus();
            }
        );
    });

    button_typeAsal.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Type",
            "table_typeAsal",
            "getType",
            { IdSubKelompok: id_subKelompokAsal.value },
            (selectedRow) => {
                nama_typeAsal.value = selectedRow.NamaType
                    ? escapeHTML(selectedRow.NamaType.trim())
                    : "";
                id_typeAsal.value = selectedRow.IdType
                    ? selectedRow.IdType.trim()
                    : "";
            }
        )
            .then(() => {
                $.ajax({
                    url: "getDataType",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        IdType: id_typeAsal.value,
                    },
                    success: function (data) {
                        satuan_saldoTerakhirAsalPrimer.value =
                            data[0].satPrimer.trim();
                        satuan_saldoTerakhirAsalSekunder.value =
                            data[0].satSekunder.trim();
                        satuan_saldoTerakhirAsalTritier.value =
                            data[0].satTritier.trim();
                        saldo_terakhirAsalPrimer.value = parseFloat(
                            data[0].SaldoPrimer
                        );
                        satuan_saldoTerakhirAsalSekunder.value =
                            data[0].satSekunder.trim();
                        saldo_terakhirAsalSekunder.value = parseFloat(
                            data[0].SaldoSekunder
                        );
                        saldo_terakhirAsalTritier.value = parseFloat(
                            data[0].SaldoTritier
                        );
                        satuan_primerAsal.value = data[0].satPrimer.trim();
                        satuan_sekunderAsal.value = data[0].satSekunder.trim();
                        satuan_tritierAsal.value = data[0].satTritier.trim();
                        pemakaian_primerAsal.readOnly = false;
                        pemakaian_sekunderAsal.readOnly = false;
                        pemakaian_tritierAsal.readOnly = false;
                        pemakaian_primerAsal.value = 0;
                        pemakaian_sekunderAsal.value = 0;
                        pemakaian_tritierAsal.value = 0;
                        pemakaian_primerAsal.focus();
                        pemakaian_primerAsal.select();

                        const buttonTypeAsalInputIds = [
                            "pemakaian_primerAsal",
                            "pemakaian_sekunderAsal",
                            "pemakaian_tritierAsal",
                        ];

                        // Function to get corresponding saldo_terakhir values
                        function getSaldoTerakhirValue(id) {
                            switch (id) {
                                case "pemakaian_primerAsal":
                                    return (
                                        parseFloat(
                                            document.getElementById(
                                                "saldo_terakhirAsalPrimer"
                                            ).value
                                        ) || 0
                                    );
                                case "pemakaian_sekunderAsal":
                                    return (
                                        parseFloat(
                                            document.getElementById(
                                                "saldo_terakhirAsalSekunder"
                                            ).value
                                        ) || 0
                                    );
                                case "pemakaian_tritierAsal":
                                    return (
                                        parseFloat(
                                            document.getElementById(
                                                "saldo_terakhirAsalTritier"
                                            ).value
                                        ) || 0
                                    );
                                default:
                                    return 0;
                            }
                        }

                        // Loop through each input ID and apply the filter
                        buttonTypeAsalInputIds.forEach(function (id) {
                            const inputElement = document.getElementById(id);
                            let element = document.getElementById(id);
                            if (inputElement) {
                                setInputFilter(
                                    inputElement,
                                    function (value) {
                                        const saldoTerakhir =
                                            getSaldoTerakhirValue(id);
                                        const numericValue = parseFloat(value); // Convert to number
                                        // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
                                        return (
                                            /^\d*[.]?\d*$/.test(value) &&
                                            (isNaN(numericValue) ||
                                                numericValue <= saldoTerakhir)
                                        );
                                    },
                                    "Tidak boleh karakter atau koma, harus angka dengan titik desimal dan tidak boleh lebih besar dari saldo terakhir"
                                );
                                element.addEventListener(
                                    "keypress",
                                    function (e) {
                                        if (e.key == "Enter") {
                                            e.preventDefault(); // Prevent the default action of the Enter key

                                            if (this.value == "") {
                                                this.value = 0;
                                            }

                                            var value = parseFloat(this.value);
                                            if (!isNaN(value)) {
                                                this.value =
                                                    parseFloat(value).toFixed(
                                                        2
                                                    );
                                            }

                                            // Find the next input element that is not readonly or disabled
                                            let nextElement =
                                                getNextFocusableElement(this);
                                            if (nextElement) {
                                                nextElement.focus();
                                                if (
                                                    nextElement.type == "text"
                                                ) {
                                                    nextElement.select();
                                                }
                                            }
                                        }
                                    }
                                );
                            }
                        });

                        function getNextFocusableElement(currentElement) {
                            // Check if the current element is pemakaian_tritierAsal
                            if (currentElement.id === "pemakaian_tritierAsal") {
                                activateAll();
                                return document.getElementById(
                                    "button_divisiTujuan"
                                );
                            }

                            // Find the next focusable element in the form
                            let elements = document.querySelectorAll(
                                "input, select, textarea, button"
                            );
                            let currentIndex = Array.prototype.indexOf.call(
                                elements,
                                currentElement
                            );

                            for (
                                let i = currentIndex + 1;
                                i < elements.length;
                                i++
                            ) {
                                if (
                                    !elements[i].readOnly &&
                                    !elements[i].disabled
                                ) {
                                    return elements[i];
                                }
                            }
                            return null;
                        }
                    },
                    error: function (xhr, status, error) {
                        // var err = eval("(" + xhr.responseText + ")");
                        // alert(err.Message);
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan!",
                            text: error.Message,
                        });
                    },
                });
            })
            .catch((error) => {
                console.error("Error after showSelectionModal:", error);
            });
    });

    button_divisiTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Divisi",
            "table_divisiTujuan",
            "getDivisi",
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
            "getObjek",
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

    button_kelompokUtamaTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "KelompokUtama",
            "table_kelompokUtamaTujuan",
            "getKelompokUtama",
            { idObjek: id_objekTujuan.value },
            (selectedRow) => {
                nama_kelompokUtamaTujuan.value = selectedRow.NamaKelompokUtama
                    ? escapeHTML(selectedRow.NamaKelompokUtama).trim()
                    : "";
                id_kelompokUtamaTujuan.value = selectedRow.IdKelompokUtama
                    ? selectedRow.IdKelompokUtama.trim()
                    : "";
                button_kelompokTujuan.focus();
            }
        );
    });

    button_kelompokTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Kelompok",
            "table_kelompokTujuan",
            "getKelompok",
            { idKelompokUtama: id_kelompokUtamaTujuan.value },
            (selectedRow) => {
                nama_kelompokTujuan.value = selectedRow.NamaKelompok
                    ? selectedRow.NamaKelompok.trim()
                    : "";
                id_kelompokTujuan.value = selectedRow.IdKelompok
                    ? selectedRow.IdKelompok.trim()
                    : "";
                button_subKelompokTujuan.focus();
            }
        );
    });

    button_subKelompokTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "SubKelompok",
            "table_subKelompokTujuan",
            "getSubKelompok",
            { idKelompok: id_kelompokTujuan.value },
            (selectedRow) => {
                nama_subKelompokTujuan.value = selectedRow.NamaSubKelompok
                    ? escapeHTML(selectedRow.NamaSubKelompok.trim())
                    : "";
                id_subKelompokTujuan.value = selectedRow.IdSubKelompok
                    ? selectedRow.IdSubKelompok.trim()
                    : "";
                button_typeTujuan.focus();
            }
        );
    });

    button_typeTujuan.addEventListener("click", function (e) {
        e.preventDefault();
        showSelectionModal(
            "Type",
            "table_typeTujuan",
            "getType",
            { IdSubKelompok: id_subKelompokTujuan.value },
            (selectedRow) => {
                nama_typeTujuan.value = selectedRow.NamaType
                    ? escapeHTML(selectedRow.NamaType.trim())
                    : "";
                id_typeTujuan.value = selectedRow.IdType
                    ? selectedRow.IdType.trim()
                    : "";
            }
        )
            .then(() => {
                $.ajax({
                    url: "getDataType",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        IdType: id_typeTujuan.value,
                    },
                    success: function (data) {
                        satuan_saldoTerakhirTujuanPrimer.value =
                            data[0].satPrimer.trim();
                        satuan_saldoTerakhirTujuanSekunder.value =
                            data[0].satSekunder.trim();
                        satuan_saldoTerakhirTujuanTritier.value =
                            data[0].satTritier.trim();
                        saldo_terakhirTujuanPrimer.value = parseFloat(
                            data[0].SaldoPrimer
                        );
                        satuan_saldoTerakhirTujuanSekunder.value =
                            data[0].satSekunder.trim();
                        saldo_terakhirTujuanSekunder.value = parseFloat(
                            data[0].SaldoSekunder
                        );
                        saldo_terakhirTujuanTritier.value = parseFloat(
                            data[0].SaldoTritier
                        );
                        satuan_primerTujuan.value = data[0].satPrimer.trim();
                        satuan_sekunderTujuan.value =
                            data[0].satSekunder.trim();
                        satuan_tritierTujuan.value = data[0].satTritier.trim();
                        pemakaian_primerTujuan.readOnly = false;
                        pemakaian_sekunderTujuan.readOnly = false;
                        pemakaian_tritierTujuan.readOnly = false;
                        pemakaian_primerTujuan.value = 0;
                        pemakaian_sekunderTujuan.value = 0;
                        pemakaian_tritierTujuan.value = 0;
                        pemakaian_primerTujuan.focus();
                        pemakaian_primerTujuan.select();

                        const buttonTypeTujuanInputIds = [
                            "pemakaian_primerTujuan",
                            "pemakaian_sekunderTujuan",
                            "pemakaian_tritierTujuan",
                        ];

                        // Function to get corresponding saldo_terakhir values
                        function getSaldoTerakhirValue(id) {
                            switch (id) {
                                case "pemakaian_primerTujuan":
                                    return (
                                        parseFloat(
                                            document.getElementById(
                                                "saldo_terakhirTujuanPrimer"
                                            ).value
                                        ) || 0
                                    );
                                case "pemakaian_sekunderTujuan":
                                    return (
                                        parseFloat(
                                            document.getElementById(
                                                "saldo_terakhirTujuanSekunder"
                                            ).value
                                        ) || 0
                                    );
                                case "pemakaian_tritierTujuan":
                                    return (
                                        parseFloat(
                                            document.getElementById(
                                                "saldo_terakhirTujuanTritier"
                                            ).value
                                        ) || 0
                                    );
                                default:
                                    return 0;
                            }
                        }

                        // Loop through each input ID and apply the filter
                        buttonTypeTujuanInputIds.forEach(function (id) {
                            const inputElement = document.getElementById(id);
                            let element = document.getElementById(id);
                            if (inputElement) {
                                setInputFilter(
                                    inputElement,
                                    function (value) {
                                        // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
                                        return /^\d*[.]?\d*$/.test(value);
                                    },
                                    "Tidak boleh karakter atau koma, harus angka dengan titik desimal dan tidak boleh lebih besar dari saldo terakhir"
                                );
                                element.addEventListener(
                                    "keypress",
                                    function (e) {
                                        if (e.key == "Enter") {
                                            e.preventDefault(); // Prevent the default action of the Enter key

                                            if (this.value == "") {
                                                this.value = 0;
                                            }

                                            var value = parseFloat(this.value);
                                            if (!isNaN(value)) {
                                                this.value =
                                                    parseFloat(value).toFixed(
                                                        2
                                                    );
                                            }

                                            // Find the next input element that is not readonly or disabled
                                            let nextElement =
                                                getNextFocusableElement(this);
                                            if (nextElement) {
                                                nextElement.focus();
                                                if (
                                                    nextElement.type == "text"
                                                ) {
                                                    nextElement.select();
                                                }
                                            }
                                        }
                                    }
                                );
                            }
                        });

                        function getNextFocusableElement(currentElement) {
                            // Find the next focusable element in the form
                            if (
                                currentElement.id === "pemakaian_tritierTujuan"
                            ) {
                                if (button_tambahTujuanKonversi.disabled) {
                                    return document.getElementById(
                                        "button_updateTujuanKonversi"
                                    );
                                } else {
                                    return document.getElementById(
                                        "button_tambahTujuanKonversi"
                                    );
                                }
                            }

                            let elements = document.querySelectorAll(
                                "input, select, textarea, button"
                            );
                            let currentIndex = Array.prototype.indexOf.call(
                                elements,
                                currentElement
                            );

                            for (
                                let i = currentIndex + 1;
                                i < elements.length;
                                i++
                            ) {
                                if (
                                    !elements[i].readOnly &&
                                    !elements[i].disabled
                                ) {
                                    return elements[i];
                                }
                            }
                            return null;
                        }
                    },
                    error: function (xhr, status, error) {
                        // var err = eval("(" + xhr.responseText + ")");
                        // alert(err.Message);
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan!",
                            text: error.Message,
                        });
                    },
                });
            })
            .catch((error) => {
                console.error("Error after showSelectionModal:", error);
            });
    });

    button_tambahTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();

        // Id type Asal dan Tujuan tidak boleh sama
        if (id_typeAsal.value == id_typeTujuan.value) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Id Type Asal dan Tujuan tidak boleh sama!",
            });
        }

        // Array to store the input values
        let inputData = [];

        // Boolean flag to check if all inputs are filled
        let allInputsFilled = true;

        // Iterate over inputIds to get values
        inputIds.forEach(function (id) {
            const value = document.getElementById(id).value.trim();

            // Check if the input is empty
            if (value === "") {
                allInputsFilled = false;
            }

            // Push the value to inputData array
            inputData.push(value);
        });

        // Append an empty value to the end of the inputData array
        inputData.push("");

        // Check if all inputs are filled
        if (allInputsFilled) {
            // Check for duplicate entry in the first and second columns
            let isDuplicate = false;

            table_daftarTujuanKonversi
                .rows()
                .every(function (rowIdx, tableLoop, rowLoop) {
                    let rowData = this.data();

                    // Only check the first and second columns
                    if (
                        rowData[0] == inputData[0] ||
                        rowData[1] == inputData[1]
                    ) {
                        isDuplicate = true;
                        return false; // Stop iteration if a match is found
                    }
                });

            if (isDuplicate) {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Barang sudah pernah diinput ke tabel!",
                });
            } else {
                // Add a new row with all input data to the DataTable
                table_daftarTujuanKonversi.row.add(inputData).draw();

                // Remove the 'selected' class from any previously selected row
                $("#table_daftarTujuanKonversi tbody tr").removeClass(
                    "selected"
                );
                // Clear the input fields after adding data
                clearAll("div_tujuanKonversi");
                activateAll();
                button_divisiTujuan.focus();
            }
        } else {
            Swal.fire("Pemberitahuan", "Harap isi semua kolom", "info");
        }
    });

    button_updateTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();

        // Array to store the updated input values
        let updatedData = [];

        // Boolean flag to check if all inputs are filled
        let allInputsFilled = true;

        // Iterate over inputIds to get the updated values
        inputIds.forEach(function (id) {
            const value = document.getElementById(id).value.trim();

            // Check if the input is empty
            if (value === "") {
                allInputsFilled = false;
            }

            // Push the value to updatedData array
            updatedData.push(value);
        });

        // Append an empty value to the end of the updatedData array
        updatedData.push("");

        // Check if all inputs are filled
        if (allInputsFilled) {
            // Get the selected row index
            const selectedRow = table_daftarTujuanKonversi.row(".selected");

            if (selectedRow.any()) {
                // Update the selected row with the new data
                selectedRow.data(updatedData).draw();

                // Remove the 'selected' class from any previously selected row
                $("#table_daftarTujuanKonversi tbody tr").removeClass(
                    "selected"
                );

                // Clear the input fields after updating data
                clearAll("div_tujuanKonversi");
                activateAll();
                button_divisiTujuan.focus();
            } else {
                Swal.fire(
                    "Pemberitahuan",
                    "Pilih baris yang ingin diubah",
                    "info"
                );
            }
        } else {
            Swal.fire("Pemberitahuan", "Harap isi semua kolom", "info");
        }
    });

    button_hapusTujuanKonversi.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the selected row index
        const selectedRow = table_daftarTujuanKonversi.row(".selected");

        if (selectedRow.any()) {
            // Use Swal.fire for confirmation
            Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to delete the selected row?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            }).then((result) => {
                if (result.isConfirmed) {
                    // If user confirms, delete the selected row
                    selectedRow.remove().draw();

                    // Clear the input fields after deleting data
                    clearAll("div_tujuanKonversi");
                    activateAll();

                    button_divisiTujuan.focus();

                    // Remove the 'selected' class from any previously selected row
                    $("#table_daftarTujuanKonversi tbody tr").removeClass(
                        "selected"
                    );

                    // Show success message
                    Swal.fire("Berhasil!", "Baris sudah dihapus.", "success");
                } else if (result.isDismissed) {
                    // If user cancels, show a message or do nothing
                    Swal.fire(
                        "Pemberitahuan",
                        "Baris tidak jadi dihapus :)",
                        "info"
                    );
                }
            });
        } else {
            Swal.fire(
                "Pemberitahuan",
                "Pilih baris yang ingin dihapus.",
                "info"
            );
        }
    });

    $("#table_daftarTujuanKonversi tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_daftarTujuanKonversi tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_daftarTujuanKonversi.row(this).data();

        // If data exists, populate input fields
        if (Array.isArray(data) && data.length > 0) {
            id_typeTujuan.value = data[0];
            nama_typeTujuan.value = data[1];
            pemakaian_primerTujuan.value = data[2];
            pemakaian_sekunderTujuan.value = data[3];
            pemakaian_tritierTujuan.value = data[4];
            id_divisiTujuan.value = data[5];
            id_objekTujuan.value = data[6];
            id_kelompokUtamaTujuan.value = data[7];
            id_kelompokTujuan.value = data[8];
            id_subKelompokTujuan.value = data[9];
            nama_divisiTujuan.value = data[10];
            nama_objekTujuan.value = data[11];
            nama_kelompokUtamaTujuan.value = data[12];
            nama_kelompokTujuan.value = data[13];
            nama_subKelompokTujuan.value = data[14];
            saldo_terakhirTujuanPrimer.value = data[15];
            saldo_terakhirTujuanSekunder.value = data[16];
            saldo_terakhirTujuanTritier.value = data[17];
            satuan_primerTujuan.value = data[18];
            satuan_sekunderTujuan.value = data[19];
            satuan_tritierTujuan.value = data[20];
            satuan_saldoTerakhirTujuanPrimer.value = data[21];
            satuan_saldoTerakhirTujuanSekunder.value = data[22];
            satuan_saldoTerakhirTujuanTritier.value = data[23];
            id_tmpTransaksi.value = data[24];
        } else {
            Swal.fire(
                "Pemberitahuan",
                "Terjadi Kesalahan.",
                "Terjadi kesalahan saat load table tujuan konversi, hubungi EDP!"
            );
        }

        button_tambahTujuanKonversi.disabled = true;
        button_hapusTujuanKonversi.disabled = false;
        button_updateTujuanKonversi.disabled = false;
        pemakaian_primerTujuan.readOnly = false;
        pemakaian_sekunderTujuan.readOnly = false;
        pemakaian_tritierTujuan.readOnly = false;
        pemakaian_primerTujuan.focus();
        pemakaian_primerTujuan.select();

        const buttonTypeTujuanInputIds = [
            "pemakaian_primerTujuan",
            "pemakaian_sekunderTujuan",
            "pemakaian_tritierTujuan",
        ];

        // Function to get corresponding saldo_terakhir values
        function getSaldoTerakhirValue(id) {
            switch (id) {
                case "pemakaian_primerTujuan":
                    return (
                        parseFloat(
                            document.getElementById(
                                "saldo_terakhirTujuanPrimer"
                            ).value
                        ) || 0
                    );
                case "pemakaian_sekunderTujuan":
                    return (
                        parseFloat(
                            document.getElementById(
                                "saldo_terakhirTujuanSekunder"
                            ).value
                        ) || 0
                    );
                case "pemakaian_tritierTujuan":
                    return (
                        parseFloat(
                            document.getElementById(
                                "saldo_terakhirTujuanTritier"
                            ).value
                        ) || 0
                    );
                default:
                    return 0;
            }
        }

        // Loop through each input ID and apply the filter
        buttonTypeTujuanInputIds.forEach(function (id) {
            const inputElement = document.getElementById(id);
            let element = document.getElementById(id);
            if (inputElement) {
                setInputFilter(
                    inputElement,
                    function (value) {
                        // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
                        return /^\d*[.]?\d*$/.test(value);
                    },
                    "Tidak boleh karakter atau koma, harus angka dengan titik desimal dan tidak boleh lebih besar dari saldo terakhir"
                );
                element.addEventListener("keypress", function (e) {
                    if (e.key == "Enter") {
                        e.preventDefault(); // Prevent the default action of the Enter key

                        if (this.value == "") {
                            this.value = 0;
                        }

                        var value = parseFloat(this.value);
                        if (!isNaN(value)) {
                            this.value = parseFloat(value).toFixed(2);
                        }

                        // Find the next input element that is not readonly or disabled
                        let nextElement = getNextFocusableElement(this);
                        if (nextElement) {
                            nextElement.focus();
                            if (nextElement.type == "text") {
                                nextElement.select();
                            }
                        }
                    }
                });
            }
        });

        function getNextFocusableElement(currentElement) {
            // Find the next focusable element in the form
            if (currentElement.id === "pemakaian_tritierTujuan") {
                if (button_tambahTujuanKonversi.disabled) {
                    return document.getElementById(
                        "button_updateTujuanKonversi"
                    );
                } else {
                    return document.getElementById(
                        "button_tambahTujuanKonversi"
                    );
                }
            }

            let elements = document.querySelectorAll(
                "input, select, textarea, button"
            );
            let currentIndex = Array.prototype.indexOf.call(
                elements,
                currentElement
            );

            for (let i = currentIndex + 1; i < elements.length; i++) {
                if (!elements[i].readOnly && !elements[i].disabled) {
                    return elements[i];
                }
            }
            return null;
        }
    });
    //#endregion
});
