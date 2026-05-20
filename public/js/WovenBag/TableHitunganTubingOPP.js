jQuery(function ($) {
    //#region Get element by ID
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let idProduct = document.getElementById("idProduct");
    let idCustomer = document.getElementById("idCustomer");
    let namaCustomer = document.getElementById("namaCustomer");
    let btnBrowseCustomer = document.getElementById("btnBrowseCustomer");
    let productType1 = document.getElementById("productType1");
    let productType2 = document.getElementById("productType2");
    let btnBrowseProduct = document.getElementById("btnBrowseProduct");
    let tanggalPembuatan = document.getElementById("tanggalPembuatan");
    let size1 = document.getElementById("size1");
    let size2 = document.getElementById("size2");
    let size3 = document.getElementById("size3");
    let meshWA = document.getElementById("meshWA");
    let meshWE = document.getElementById("meshWE");
    let denier = document.getElementById("denier");
    let colour = document.getElementById("colour");
    let sisi1 = document.getElementById("sisi1");
    let sisi2 = document.getElementById("sisi2");
    let eva = document.getElementById("eva");
    let overlap = document.getElementById("overlap");
    let bag_jadiLamiBody = document.getElementById("bag_jadiLamiBody");
    let bag_jadiOPPBody = document.getElementById("bag_jadiOPPBody");
    let bag_jadiOPPPatch = document.getElementById("bag_jadiOPPPatch");
    let bag_jadiLamiPatch = document.getElementById("bag_jadiLamiPatch");
    let bag_jadiKertas1 = document.getElementById("bag_jadiKertas1");
    let bag_jadiKertas2 = document.getElementById("bag_jadiKertas2");
    let bag_jadiValve = document.getElementById("bag_jadiValve");
    let bag_jadiLamiValve = document.getElementById("bag_jadiLamiValve");
    let pemakaian_kainLamiBody = document.getElementById("pemakaian_kainLamiBody"); //prettier-ignore
    let pemakaian_kainOPPBody = document.getElementById("pemakaian_kainOPPBody"); //prettier-ignore
    let pemakaian_kainOPPPatch = document.getElementById("pemakaian_kainOPPPatch"); //prettier-ignore
    let pemakaian_kainLamiPatch = document.getElementById("pemakaian_kainLamiPatch"); //prettier-ignore
    let pemakaian_kainKertas1 = document.getElementById("pemakaian_kainKertas1"); //prettier-ignore
    let pemakaian_kainKertas2 = document.getElementById("pemakaian_kainKertas2"); //prettier-ignore
    let pemakaian_kainValve = document.getElementById("pemakaian_kainValve");
    let pemakaian_kainLamiValve = document.getElementById("pemakaian_kainLamiValve"); //prettier-ignore
    let btnAdd = document.getElementById("btnAdd");
    let btnKoreksi = document.getElementById("btnKoreksi");
    let btnDelete = document.getElementById("btnDelete");
    let btnClear = document.getElementById("btnClear");
    let btnProses = document.getElementById("btnProses");
    let mode;
    //#endregion

    //#region Load Form
    productType1.value = "TBO";
    productTubingOPP.checked = true;
    tanggalPembuatan.valueAsDate = new Date();
    btnAdd.focus();
    //#endregion

    //#region Functions
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null || currentIndex >= rowCount - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null || currentIndex <= 0) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex--;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table
                    .page("next")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected",
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table
                    .page("previous")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected",
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        }
    }

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: "nearest" });
    }

    function clearAllInputs() {
        const container = document.querySelector(".card-body");

        // Clear all text inputs & textarea
        container.querySelectorAll("input, textarea").forEach((el) => {
            if (el.type === "date") {
                el.valueAsDate = new Date();
            } else if (el.type !== "button" && el.type !== "submit") {
                if (el.id == "productType1") {
                    el.value = "TBO";
                } else {
                    el.value = "";
                }
            }
        });

        // Clear all table text (td that contains numbers like "0")
        container.querySelectorAll("td").forEach((td) => {
            if (!td.querySelector("input") && td.id) {
                td.textContent = "0";
            }
        });
    }

    function setInputsState(container, enabled) {
        container.querySelectorAll("input, textarea, button").forEach((el) => {
            // Skip buttons that control mode
            if (
                el.id === "btnAdd" ||
                el.id === "btnKoreksi" ||
                el.id === "btnDelete" ||
                el.id === "btnClear" ||
                el.id === "btnProses"
            ) {
                return;
            }

            if (el.classList.contains("readonly-field")) {
                el.disabled = !enabled;
                el.readOnly = true;
                return;
            }
            el.disabled = !enabled;
        });
    }

    function setButtonVisibility(config) {
        document.getElementById("btnAdd").style.display = config.add
            ? "inline-block"
            : "none";
        document.getElementById("btnKoreksi").style.display = config.update
            ? "inline-block"
            : "none";
        document.getElementById("btnDelete").style.display = config.delete
            ? "inline-block"
            : "none";
        document.getElementById("btnClear").style.display = config.cancel
            ? "inline-block"
            : "none";
        document.getElementById("btnProses").style.display = config.process
            ? "inline-block"
            : "none";
    }

    function enableInputs(jenisInput) {
        const container = document.querySelector(".card-body");
        if (jenisInput === "Add") {
            productTubing.disabled = false;
            productTubingOPP.disabled = false;
            btnBrowseCustomer.disabled = false;
            setButtonVisibility({
                add: false,
                update: false,
                delete: false,
                process: true,
                cancel: true,
            });
        } else if (jenisInput === "Update") {
            setInputsState(container, true);

            setButtonVisibility({
                add: false,
                update: false,
                delete: false,
                process: true,
                cancel: true,
            });
        } else if (jenisInput === "Delete") {
            // Usually delete = no input editing
            setInputsState(container, true);

            setButtonVisibility({
                add: false,
                update: false,
                delete: false,
                process: true,
                cancel: true,
            });
        } else if (jenisInput === "Cancel") {
            setInputsState(container, false);

            setButtonVisibility({
                add: true,
                update: true,
                delete: true,
                process: false,
                cancel: false,
            });
        }
        return Promise.resolve();
    }

    function displayData(idp) {
        $.ajax({
            url: "TabelHitunganTubingOPP/getDataTabelHitungan",
            type: "GET",
            dataType: "json",
            data: {
                _token: csrfToken,
                idProduct: idp,
            },
            success: function (response) {
                console.log(response);
                if (response.data) {
                    const data = response.data[0];
                    tanggalPembuatan.value = moment(data.Tanggal).format("YYYY-MM-DD"); //prettier-ignore
                    size1.value = numeral(data.Lebar).format("0,0.00");
                    size2.value = numeral(data.Panjang).format("0,0.00");
                    size3.value = numeral(data.Tinggi).format("0,0.00");
                    meshWA.value = numeral(data.Warp).format("0,0.00");
                    meshWE.value = numeral(data.Weft).format("0,0.00");
                    denier.value = numeral(data.Denier).format("0,0.00");
                    colour.value = data.Colour;
                    sisi1.value = data.PrintingSisi1;
                    sisi2.value = data.PrintingSisi2;
                    eva.value = data.LemEVA;
                    overlap.value = data.LemOverLap;
                    bag_jadiLamiBody.value = numeral(data.LamiJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiOPPBody.value = numeral(data.OPPBodyJadiMIK).format("0,0.00"); //prettier-ignore
                    bag_jadiOPPPatch.value = numeral(data.OPPPatchJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiLamiPatch.value = numeral(data.LamiPatchJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiKertas1.value = numeral(data.KertasJadicm).format("0,0.00"); //prettier-ignore
                    bag_jadiKertas2.value = numeral(data.KertasJadiGSM).format("0,0.00"); //prettier-ignore
                    bag_jadiValve.value = numeral(data.LebarValveJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiLamiValve.value = numeral(data.LamiValveJadi).format("0,0.00"); //prettier-ignore
                    pemakaian_kainLamiBody.value = numeral(data.LamiPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainOPPBody.value = numeral(data.OPPBodyPakaiMIK).format("0,0.00"); //prettier-ignore
                    pemakaian_kainOPPPatch.value = numeral(data.OPPPatchPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainLamiPatch.value = numeral(data.LamiPatchPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainKertas1.value = numeral(data.KertasPakaicm).format("0,0.00"); //prettier-ignore
                    pemakaian_kainKertas2.value = numeral(data.KertasPakaiGSM).format("0,0.00"); //prettier-ignore
                    pemakaian_kainValve.value = numeral(data.LebarValvePakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainLamiValve.value = numeral(data.LamiValvePakai).format("0,0.00"); //prettier-ignore
                    console.log(
                        response.data[0].Tanggal,
                        moment(data.Tanggal).format("YYYY-MM-DD"),
                    );
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            response.error ||
                            "An error occurred while fetching data to show.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data.",
                });
            },
        });
    }

    function saveData() {
        let LebarClothJadi, PanjangClothJadi, BeratClothJadi,
            LebarClothPakai, PanjangClothPakai, BeratClothPakai,
            BeratLamiJadi, BeratLamiPakai, BeratLamiPatchJadi, BeratLamiPatchPakai, BeratLamiValveJadi, BeratLamiValvePakai,
            OPPBodyJadi, OPPBodyPakai, BeratOPPBodyJadi, BeratOPPBodyPakai,
            LebarPatch, PanjangPatch, BeratPatch, BeratOPPPatchJadi, BeratOPPPatchPakai,
            BeratKertasJadi, BeratKertasPakai,
            BeratLemEVA, BeratLemOverlap,
            Valve, BeratValveJadi, BeratValvePakai,
            BeratTotalJadi, BeratTotalPakai; //prettier-ignore

        let lebar = numeral(size1.value).value();
        let panjang = numeral(size2.value).value();
        let tinggi = numeral(size3.value).value();
        let warp = numeral(meshWA.value).value();
        let weft = numeral(meshWE.value).value();
        let denierValue = numeral(denier.value).value();
        let LamiBodyJadi = numeral(bag_jadiLamiBody.value).value();
        let OPPBodyJadiCM = numeral(bag_jadiOPPBody.value).value();
        let OPPPatchJadi = numeral(bag_jadiOPPPatch.value).value();
        let LamiPatchJadi = numeral(bag_jadiLamiPatch.value).value();
        let Kertas1Jadi = numeral(bag_jadiKertas1.value).value();
        let Kertas2Jadi = numeral(bag_jadiKertas2.value).value();
        let ValveJadi = numeral(bag_jadiValve.value).value();
        let LamiValveJadi = numeral(bag_jadiLamiValve.value).value();
        let LamiBodyPakai = numeral(pemakaian_kainLamiBody.value).value();
        let OPPBodyPakaiCM = numeral(pemakaian_kainOPPBody.value).value();
        let OPPPatchPakai = numeral(pemakaian_kainOPPPatch.value).value();
        let LamiPatchPakai = numeral(pemakaian_kainLamiPatch.value).value();
        let Kertas1Pakai = numeral(pemakaian_kainKertas1.value).value();
        let Kertas2Pakai = numeral(pemakaian_kainKertas2.value).value();
        let ValvePakai = numeral(pemakaian_kainValve.value).value();
        let LamiValvePakai = numeral(pemakaian_kainLamiValve.value).value();

        LebarClothPakai = lebar * 2 + 4 + 4;
        LebarClothJadi = LebarClothPakai - 3.5;
        PanjangClothJadi = panjang + tinggi + 2;
        PanjangClothPakai = PanjangClothJadi;
        BeratClothJadi = (LebarClothJadi * PanjangClothJadi * (warp + weft) * denierValue) / 1143000 / 2; //prettier-ignore
        BeratClothPakai = (LebarClothPakai * PanjangClothPakai * (warp + weft) * denierValue) / 1143000 / 2; //prettier-ignore

        BeratLamiJadi = (LebarClothJadi * PanjangClothJadi * LamiBodyJadi * 0.92) / 10000; //prettier-ignore
        BeratLamiPakai = ((LebarClothPakai + 2) * PanjangClothPakai * LamiBodyPakai * 0.92) / 10000; //prettier-ignore

        LebarPatch = tinggi - 0.5;
        PanjangPatch = lebar - tinggi - 0.5;
        BeratPatch = (LebarPatch * PanjangPatch * 14.2 * denierValue * 2) / 1143000 / 2; //prettier-ignore

        if (productTubingOPP.checked) {
            OPPBodyPakai = lebar * 2 + 2;
            OPPBodyJadi = OPPBodyPakai - 1.5;
            BeratOPPBodyJadi = (OPPBodyJadi * PanjangClothJadi * 0.92 * OPPBodyJadiCM) / 10000; //prettier-ignore
            BeratOPPBodyPakai = (OPPBodyPakai * PanjangClothPakai * 0.92 * OPPBodyPakaiCM) / 10000; //prettier-ignore

            BeratOPPPatchJadi = (LebarPatch * PanjangPatch * 0.92 * OPPPatchJadi * 2 * 2) / 10000; //prettier-ignore
            BeratOPPPatchPakai = (LebarPatch * PanjangPatch * 0.92 * OPPPatchPakai * 2 * 2) / 10000; //prettier-ignore
        } else {
            OPPBodyPakai = 0;
            OPPBodyJadi = 0;
            BeratOPPBodyJadi = 0;
            BeratOPPBodyPakai = 0;

            BeratOPPPatchJadi = 0;
            BeratOPPPatchPakai = 0;
        }

        BeratLamiPatchJadi = (LebarPatch * PanjangPatch * 0.92 * LamiPatchJadi * 2 * 2) / 10000; //prettier-ignore
        BeratLamiPatchPakai = (LebarPatch * PanjangPatch * 0.92 * LamiPatchPakai * 2 * 2) / 10000; //prettier-ignore

        BeratKertasJadi =
            (Kertas1Jadi / 100) * (PanjangClothJadi / 100) * Kertas2Jadi;
        BeratKertasPakai =
            (Kertas1Pakai / 100) * (PanjangClothPakai / 100) * Kertas2Pakai;

        Valve = tinggi * 2 + 1.5;
        BeratValveJadi = (Valve * ValveJadi * 14.2 * denierValue) / 1143000 / 2;
        BeratValvePakai =
            (Valve * ValvePakai * 14.2 * denierValue) / 1143000 / 2;

        BeratLamiValveJadi =
            (Valve * ValveJadi * LamiValveJadi * 0.92 * 2) / 10000;
        BeratLamiValvePakai =
            (Valve * ValvePakai * LamiValvePakai * 0.92 * 2) / 10000;

        if (
            overlap.value !== "" &&
            overlap.value.toUpperCase() !== "NONE" &&
            overlap.value !== "-"
        ) {
            BeratLemOverlap = 3 * (PanjangClothJadi / 100) * 2;
        } else {
            BeratLemOverlap = 0;
        }
        if (
            eva.value !== "" &&
            eva.value.toUpperCase() !== "NONE" &&
            eva.value !== "-"
        ) {
            BeratLemEVA = 0.72 * (PanjangClothJadi / 100);
        } else {
            BeratLemEVA = 0;
        }

        BeratTotalJadi = BeratClothJadi + BeratLamiJadi + BeratOPPBodyJadi +
            BeratPatch + BeratOPPPatchJadi + BeratLamiPatchJadi +
            BeratKertasJadi + BeratValveJadi + BeratLamiValveJadi +
            BeratLemEVA + BeratLemOverlap; //prettier-ignore
        BeratTotalPakai = BeratClothPakai + BeratLamiPakai + BeratOPPBodyPakai +
            BeratPatch + BeratOPPPatchPakai + BeratLamiPatchPakai +
            BeratKertasPakai + BeratValvePakai + BeratLamiValvePakai +
            BeratLemEVA + BeratLemOverlap; //prettier-ignore
        console.log(
            BeratClothJadi,
            BeratLamiJadi,
            BeratOPPBodyJadi,
            BeratPatch,
            BeratOPPPatchJadi,
            BeratLamiPatchJadi,
            BeratKertasJadi,
            BeratValveJadi,
            BeratLamiValveJadi,
            BeratLemEVA,
            BeratLemOverlap,
            BeratTotalJadi,
        );

        $.ajax({
            url: "TabelHitunganTubingOPP",
            type: "POST",
            dataType: "json",
            data: {
                _token: csrfToken,
                jenisStore: mode,
                idProduct: idProduct.value,
                idCustomer: idCustomer.value,
                namaCustomer: namaCustomer.value,
                typeProduct: productTubingOPP.checked ? 2 : 3,
                namaBarang: productType1.value + "-" + productType2.value,
                tanggalPembuatan: tanggalPembuatan.value,
                Lebar: lebar,
                Tinggi: tinggi,
                Panjang: panjang,
                meshWA: numeral(meshWA.value).value(), //prettier-ignore
                meshWE: numeral(meshWE.value).value(), //prettier-ignore
                denier: numeral(denier.value).value(), //prettier-ignore
                colour: colour.value,
                PrintingSisi1: sisi1.value,
                PrintingSisi2: sisi2.value,
                LemEVA: eva.value,
                BeratLemEVA: BeratLemEVA,
                LemOverlap: overlap.value,
                BeratLemOverlap: BeratLemOverlap,
                LebarClothJadi: LebarClothJadi,
                PanjangClothJadi: PanjangClothJadi,
                BeratClothJadi: BeratClothJadi,
                LebarClothPakai: LebarClothPakai,
                PanjangClothPakai: PanjangClothPakai,
                BeratClothPakai: BeratClothPakai,
                LamiJadi: LamiBodyJadi,
                BeratLamiJadi: BeratLamiJadi,
                LamiPakai: LamiBodyPakai,
                BeratLamiPakai: BeratLamiPakai,
                KertasJadiCM: Kertas1Jadi,
                KertasJadiGSM: Kertas2Jadi,
                BeratKertasJadi: BeratKertasJadi,
                KertasPakaiCM: Kertas1Pakai,
                KertasPakaiGSM: Kertas2Pakai,
                BeratKertasPakai: BeratKertasPakai,
                OPPBodyJadiCM: OPPBodyJadi,
                OPPBodyJadiMIK: OPPBodyJadiCM,
                BeratOPPBodyJadi: BeratOPPBodyJadi,
                OPPBodyPakaiCM: OPPBodyPakai,
                OPPBodyPakaiMIK: OPPBodyPakaiCM,
                BeratOPPBodyPakai: BeratOPPBodyPakai,
                LebarPatchJadi: LebarPatch,
                PanjangPatchJadi: PanjangPatch,
                BeratPatchJadi: BeratPatch,
                OPPPatchJadi: OPPPatchJadi,
                OPPPatchPakai: OPPPatchPakai,
                BeratOPPPatchJadi: BeratOPPPatchJadi,
                BeratOPPPatchPakai: BeratOPPPatchPakai,
                LamiPatchJadi: LamiPatchJadi,
                LamiPatchPakai: LamiPatchPakai,
                BeratLamiPatchJadi: BeratLamiPatchJadi,
                BeratLamiPatchPakai: BeratLamiPatchPakai,
                PanjangValve: Valve,
                LebarValveJadi: ValveJadi,
                LebarValvePakai: ValvePakai,
                BeratValveJadi: BeratValveJadi,
                BeratValvePakai: BeratValvePakai,
                LamiValveJadi: LamiValveJadi,
                LamiValvePakai: LamiValvePakai,
                BeratLamiValveJadi: BeratLamiValveJadi,
                BeratLamiValvePakai: BeratLamiValvePakai,
                TotalJadi: BeratTotalJadi,
                TotalPakai: BeratTotalPakai,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.success,
                    }).then(() => {
                        mode = "";
                        enableInputs("Cancel").then(() => {
                            btnAdd.focus();
                        });
                        clearAllInputs();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            response.error ||
                            response.message ||
                            "An error occurred while saving data.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data.",
                });
            },
        });
    }
    //#endregion

    //#region Event Listeners
    $('input[name="jenisProduct"]').on("change", function () {
        const map = {
            Tubing: "TB",
            TubingOPP: "TBO",
        };

        if ($(this).is(":checked")) {
            $("#productType1").val(map[$(this).val()]);
        }
    });

    btnBrowseCustomer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>IDCust</th></tr></thead><tbody></tbody></table>',
                returnFocus: false,
                showCancelButton: true,
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
                        let url =
                            mode == "Add"
                                ? "TabelHitunganTubingOPP/getListCustomerAdd"
                                : "TabelHitunganTubingOPP/getListCustomerUpdate";
                        let dataNamaCust =
                            mode == "Add" ? "NAMACUST" : "NamaCust";
                        let dataIdCust = mode == "Add" ? "IDCust" : "KodeCust";
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: url,
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: dataNamaCust,
                                },
                                {
                                    data: dataIdCust,
                                },
                            ],
                        });
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                                scrollRowIntoView(this);
                            },
                        );
                        const searchInput = $("#customerTable_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "customerTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    let dataNamaCust = mode == "Add" ? "NAMACUST" : "NamaCust";
                    let dataIdCust = mode == "Add" ? "IDCust" : "KodeCust";

                    namaCustomer.value = decodeHtmlEntities(selectedRow[dataNamaCust]).trim(); //prettier-ignore
                    if (dataNamaCust == "NAMACUST") {
                        idCustomer.value = selectedRow.IDCust.trim().split(" -")[1]; //prettier-ignore
                    } else if (dataNamaCust == "NamaCust") {
                        idCustomer.value = selectedRow.KodeCust;
                    }
                    console.log(mode);

                    if (mode == "Add" && namaCustomer.value != "") {
                        productType2.disabled = false;
                        productType2.readOnly = false;
                        productType2.focus();
                        productType2.select();
                    } else {
                        btnBrowseProduct.disabled = false;
                        btnBrowseProduct.focus();
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    productType2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            tanggalPembuatan.disabled = false;
            tanggalPembuatan.focus();
            tanggalPembuatan.select();
        }
    });

    btnBrowseProduct.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Product",
                html: '<table id="productTable" class="display" style="width:100%"><thead><tr><th>Nama Product</th><th>Kode</th></tr></thead><tbody></tbody></table>',
                returnFocus: false,
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#productTable")
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
                        const table = $("#productTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "TabelHitunganTubingOPP/getListProduct",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "TypeBarang",
                                },
                                {
                                    data: "id",
                                },
                            ],
                        });
                        $("#productTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });
                        const searchInput = $("#productTable_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "productTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    const firstDashIndex = selectedRow.TypeBarang.indexOf("-");
                    const jenisProduct = selectedRow.TypeBarang.substring(0, firstDashIndex).trim(); //prettier-ignore
                    const namaProduct = selectedRow.TypeBarang.substring(firstDashIndex + 1).trim(); //prettier-ignore
                    if (jenisProduct == "TBO") {
                        productTubingOPP.checked = true;
                    } else {
                        productTubing.checked = true;
                    }
                    productType1.value = jenisProduct;
                    productType2.value = namaProduct;
                    productType2.readOnly = true;
                    idProduct.value = selectedRow.id;
                    displayData(idProduct.value);
                    if (mode == "Add" || mode == "Update") {
                        tanggalPembuatan.focus();
                    } else if (mode == "Delete") {
                        saveButton.focus();
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    tanggalPembuatan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            size1.disabled = false;
            size1.select();
            size1.focus();
        }
    });

    size1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            size2.disabled = false;
            size2.select();
            size2.focus();
        }
    });

    size2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            size3.disabled = false;
            size3.select();
            size3.focus();
        }
    });

    size3.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            meshWA.disabled = false;
            meshWA.select();
            meshWA.focus();
        }
    });

    meshWA.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            meshWE.disabled = false;
            meshWE.select();
            meshWE.focus();
        }
    });

    meshWE.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            denier.disabled = false;
            denier.select();
            denier.focus();
        }
    });

    denier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            colour.disabled = false;
            colour.select();
            colour.focus();
        }
    });

    colour.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "NONE";
            } else {
                this.value = this.value.toUpperCase();
            }
            sisi1.disabled = false;
            sisi1.select();
            sisi1.focus();
        }
    });

    sisi1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "NONE";
            } else {
                this.value = this.value.toUpperCase();
            }
            sisi2.disabled = false;
            sisi2.select();
            sisi2.focus();
        }
    });

    sisi2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "NONE";
            } else {
                this.value = this.value.toUpperCase();
            }
            eva.disabled = false;
            eva.select();
            eva.focus();
        }
    });

    eva.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "NONE";
            } else {
                this.value = this.value.toUpperCase();
            }
            overlap.disabled = false;
            overlap.select();
            overlap.focus();
        }
    });

    overlap.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "NONE";
            } else {
                this.value = this.value.toUpperCase();
            }
            bag_jadiLamiBody.disabled = false;
            pemakaian_kainLamiBody.disabled = false;
            bag_jadiLamiBody.select();
            bag_jadiLamiBody.focus();
        }
    });

    bag_jadiLamiBody.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainLamiBody.value = this.value;
            bag_jadiOPPBody.disabled = false;
            pemakaian_kainOPPBody.disabled = false;
            bag_jadiOPPBody.select();
            bag_jadiOPPBody.focus();
        }
    });

    bag_jadiOPPBody.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainOPPBody.value = this.value;
            bag_jadiOPPPatch.disabled = false;
            pemakaian_kainOPPPatch.disabled = false;
            bag_jadiOPPPatch.select();
            bag_jadiOPPPatch.focus();
        }
    });

    bag_jadiOPPPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainOPPPatch.value = this.value;
            bag_jadiLamiPatch.disabled = false;
            pemakaian_kainLamiPatch.disabled = false;
            bag_jadiLamiPatch.select();
            bag_jadiLamiPatch.focus();
        }
    });

    bag_jadiLamiPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainLamiPatch.value = this.value;
            bag_jadiKertas1.disabled = false;
            pemakaian_kainKertas1.disabled = false;
            bag_jadiKertas1.select();
            bag_jadiKertas1.focus();
        }
    });

    bag_jadiKertas1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainKertas1.value = this.value;
            bag_jadiKertas2.disabled = false;
            pemakaian_kainKertas2.disabled = false;
            bag_jadiKertas2.select();
            bag_jadiKertas2.focus();
        }
    });

    bag_jadiKertas2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainKertas2.value = this.value;
            bag_jadiValve.disabled = false;
            pemakaian_kainValve.disabled = false;
            bag_jadiValve.select();
            bag_jadiValve.focus();
        }
    });

    bag_jadiValve.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainValve.value = this.value;
            bag_jadiLamiValve.disabled = false;
            pemakaian_kainLamiValve.disabled = false;
            bag_jadiLamiValve.select();
            bag_jadiLamiValve.focus();
        }
    });

    bag_jadiLamiValve.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainLamiValve.value = this.value;
            btnProses.focus();
        }
    });

    btnAdd.addEventListener("click", () => {
        mode = "Add";
        enableInputs("Add").then(() => {
            btnBrowseCustomer.focus();
        });
    });

    btnKoreksi.addEventListener("click", () => {
        mode = "Update";
        enableInputs("Update").then(() => {
            btnBrowseCustomer.focus();
        });
    });

    btnDelete.addEventListener("click", () => {
        mode = "Delete";
        enableInputs("Delete").then(() => {
            btnBrowseCustomer.focus();
        });
    });

    btnClear.addEventListener("click", () => {
        mode = "";
        enableInputs("Cancel").then(() => {
            btnAdd.focus();
        });
        clearAllInputs();
    });

    btnProses.addEventListener("click", () => {
        if (mode == "Add") {
            swal.fire({
                icon: "question",
                title: "Apakah yakin data akan ditambahkan?",
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((response) => {
                if (response.isConfirmed) {
                    saveData();
                } else {
                    return;
                }
            });
        } else if (mode == "Update") {
            swal.fire({
                icon: "question",
                title: "Apakah yakin data akan diubah?",
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((response) => {
                if (response.isConfirmed) {
                    saveData();
                } else {
                    return;
                }
            });
        } else if (mode == "Delete") {
            swal.fire({
                icon: "question",
                title: "Apakah yakin data akan dihapus?",
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((response) => {
                if (response.isConfirmed) {
                    saveData();
                } else {
                    return;
                }
            });
        }
    });
    //#endregion
});
