jQuery(function ($) {
    //#region Get element by ID
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let productSandwich = document.getElementById("productSandwich");
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
    let bag_jadiLami = document.getElementById("bag_jadiLami");
    let bag_jadiKertas = document.getElementById("bag_jadiKertas");
    let bag_jadiClothBawah1 = document.getElementById("bag_jadiClothBawah1");
    let bag_jadiClothBawah2 = document.getElementById("bag_jadiClothBawah2");
    let bag_jadiLamiBawah = document.getElementById("bag_jadiLamiBawah");
    let bag_jadiKertasBawah1 = document.getElementById("bag_jadiKertasBawah1");
    let bag_jadiKertasBawah2 = document.getElementById("bag_jadiKertasBawah2");
    let bag_jadiInner1 = document.getElementById("bag_jadiInner1");
    let bag_jadiInner2 = document.getElementById("bag_jadiInner2");
    let bag_jadiTebal = document.getElementById("bag_jadiTebal");
    let bag_jadiBenangJahit = document.getElementById("bag_jadiBenangJahit");
    let pemakaian_kainLami = document.getElementById("pemakaian_kainLami");
    let pemakaian_kainKertas = document.getElementById("pemakaian_kainKertas");
    let pemakaian_kainClothBawah1 = document.getElementById("pemakaian_kainClothBawah1"); //prettier-ignore
    let pemakaian_kainClothBawah2 = document.getElementById("pemakaian_kainClothBawah2"); //prettier-ignore
    let pemakaian_kainLamiBawah = document.getElementById("pemakaian_kainLamiBawah"); //prettier-ignore
    let pemakaian_kainKertasBawah1 = document.getElementById("pemakaian_kainKertasBawah1"); //prettier-ignore
    let pemakaian_kainKertasBawah2 = document.getElementById("pemakaian_kainKertasBawah2"); //prettier-ignore
    let pemakaian_kainInner1 = document.getElementById("pemakaian_kainInner1");
    let pemakaian_kainInner2 = document.getElementById("pemakaian_kainInner2");
    let pemakaian_kainTebal = document.getElementById("pemakaian_kainTebal");
    let pemakaian_kainBenangJahit = document.getElementById("pemakaian_kainBenangJahit"); //prettier-ignore
    let btnAdd = document.getElementById("btnAdd");
    let btnKoreksi = document.getElementById("btnKoreksi");
    let btnDelete = document.getElementById("btnDelete");
    let btnClear = document.getElementById("btnClear");
    let btnProses = document.getElementById("btnProses");
    let mode;
    //#endregion

    //#region Load Form
    productType1.value = "SW";
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
                    el.value = "SW";
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
            url: "TabelHitunganSandwich/getDataTabelHitungan",
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
                    size2.value = numeral(data.Gusset).format("0,0.00");
                    size3.value = numeral(data.Panjang).format("0,0.00");
                    meshWA.value = numeral(data.Warp).format("0,0.00");
                    meshWE.value = numeral(data.Weft).format("0,0.00");
                    denier.value = numeral(data.Denier).format("0,0.00");
                    colour.value = data.Colour;
                    sisi1.value = data.PrintingSisi1;
                    sisi2.value = data.PrintingSisi2;
                    eva.value = data.LemEVA;
                    overlap.value = data.LemOverlap;
                    bag_jadiLami.value = numeral(data.LamiJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiKertas.value = numeral(data.KertasJadiGSM).format("0,0.00"); //prettier-ignore
                    bag_jadiClothBawah1.value = numeral(data.LebarClothBawahJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiClothBawah2.value = numeral(data.PanjangClothBawahJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiLamiBawah.value = numeral(data.LamiBawahJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiKertasBawah1.value = numeral(data.LebarKertasBawahJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiKertasBawah2.value = numeral(data.PanjangKertasBawahJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiInner1.value = numeral(data.LebarInnerJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiInner2.value = numeral(data.PanjangInnerJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiTebal.value = numeral(data.TebalInnerJadi).format("0,0.00"); //prettier-ignore
                    bag_jadiBenangJahit.value = numeral(data.BenangJahitJadi).format("0,0.00"); //prettier-ignore
                    pemakaian_kainLami.value = numeral(data.LamiPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainKertas.value = numeral(data.KertasPakaiGSM).format("0,0.00"); //prettier-ignore
                    pemakaian_kainClothBawah1.value = numeral(data.LebarClothBawahPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainClothBawah2.value = numeral(data.PanjangClothBawahPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainLamiBawah.value = numeral(data.LamiBawahPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainKertasBawah1.value = numeral(data.LebarKertasBawahPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainKertasBawah2.value = numeral(data.PanjangKertasBawahPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainInner1.value = numeral(data.LebarInnerPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainInner2.value = numeral(data.PanjangInnerPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainTebal.value = numeral(data.TebalInnerPakai).format("0,0.00"); //prettier-ignore
                    pemakaian_kainBenangJahit.value = numeral(data.BenangJahitPakai).format("0,0.00"); //prettier-ignore
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
        let LebarClothJadi, PanjangClothJadi, BeratClothJadi, LebarClothPakai, PanjangClothPakai,
            BeratClothPakai, BeratLamiJadi, BeratLamiPakai, BeratLamiBawahJadi, BeratLamiBawahPakai,
            KertasJadi, BeratKertasJadi, KertasPakai, BeratKertasPakai, BeratClothBawahJadi,
            BeratClothBawahPakai, BeratKertasBawahJadi, BeratKertasBawahPakai, BeratBenangJahitJadi, BeratBenangJahitPakai,
            BeratLemEVA, BeratLemOverlap, BeratTotalJadi, BeratTotalPakai, BeratInnerJadi,
            BeratInnerPakai; // prettier-ignore
        let lebar = numeral(size1.value).value();
        let gusset = numeral(size2.value).value();
        let panjang = numeral(size3.value).value();
        let warp = numeral(meshWA.value).value();
        let weft = numeral(meshWE.value).value();
        let denierValue = numeral(denier.value).value();
        let lamiJadi = numeral(bag_jadiLami.value).value();
        let lamiPakai = numeral(pemakaian_kainLami.value).value();
        let kertasJadiGSM = numeral(bag_jadiKertas.value).value();
        let kertasPakaiGSM = numeral(pemakaian_kainKertas.value).value();
        let lebarClothBawahJadi = numeral(bag_jadiClothBawah1.value).value();
        let panjangClothBawahJadi = numeral(bag_jadiClothBawah2.value).value();
        let lebarClothBawahPakai = numeral(pemakaian_kainClothBawah1.value).value(); //prettier-ignore
        let panjangClothBawahPakai = numeral(pemakaian_kainClothBawah2.value).value(); //prettier-ignore
        let lamiBawahJadi = numeral(bag_jadiLamiBawah.value).value();
        let lamiBawahPakai = numeral(pemakaian_kainLamiBawah.value).value();
        let lebarKertasBawahJadi = numeral(bag_jadiKertasBawah1.value).value();
        let panjangKertasBawahJadi = numeral(bag_jadiKertasBawah2.value,).value(); //prettier-ignore
        let lebarKertasBawahPakai = numeral(pemakaian_kainKertasBawah1.value).value(); //prettier-ignore
        let panjangKertasBawahPakai = numeral(pemakaian_kainKertasBawah2.value).value(); //prettier-ignore
        let lebarInnerJadi = numeral(bag_jadiInner1.value).value();
        let panjangInnerJadi = numeral(bag_jadiInner2.value,).value(); //prettier-ignore
        let lebarInnerPakai = numeral(pemakaian_kainInner1.value).value(); //prettier-ignore
        let panjangInnerPakai = numeral(pemakaian_kainInner2.value).value(); //prettier-ignore
        let tebalInnerJadi = numeral(bag_jadiTebal.value).value(); //prettier-ignore
        let tebalInnerPakai = numeral(pemakaian_kainTebal.value).value(); //prettier-ignore
        let benangJahitJadi = numeral(bag_jadiBenangJahit.value).value(); //prettier-ignore
        let benangJahitPakai = numeral(pemakaian_kainBenangJahit.value).value(); //prettier-ignore

        LebarClothPakai = (lebar + gusset) * 2 + 4 + 3;
        LebarClothJadi = LebarClothPakai - 2.5;
        PanjangClothJadi = panjang + 2;
        PanjangClothPakai = PanjangClothJadi;
        BeratClothJadi = (LebarClothJadi * PanjangClothJadi * (warp + weft) * denierValue) / 1143000 / 2; //prettier-ignore
        BeratClothPakai = (LebarClothPakai * PanjangClothPakai * (warp + weft) * denierValue) / 1143000 / 2; //prettier-ignore
        BeratLamiJadi = (LebarClothJadi * PanjangClothJadi * lamiJadi * 0.92) / 10000; //prettier-ignore
        BeratLamiPakai = ((LebarClothPakai + 2) * PanjangClothPakai * lamiPakai * 0.92) / 10000; //prettier-ignore
        KertasPakai = (lebar + gusset) * 2 + 2;
        KertasJadi = KertasPakai - 1.5;
        BeratKertasJadi = (KertasJadi / 100) * (PanjangClothJadi / 100) * kertasJadiGSM; //prettier-ignore
        BeratKertasPakai = (KertasPakai / 100) * (PanjangClothPakai / 100) * kertasPakaiGSM; //prettier-ignore
        BeratClothBawahJadi = (lebarClothBawahJadi * panjangClothBawahJadi * 14.2 * denierValue) / 1143000 / 2; //prettier-ignore
        BeratClothBawahPakai = (lebarClothBawahPakai * panjangClothBawahPakai * 14.2 * denierValue) / 1143000 / 2; //prettier-ignore
        BeratLamiBawahJadi = (lebarClothBawahJadi * panjangClothBawahJadi * 0.92 * lamiBawahJadi) / 10000; //prettier-ignore
        BeratLamiBawahPakai = lebarClothBawahPakai * panjangClothBawahPakai * 0.92 * lamiBawahPakai / 10000; //prettier-ignore
        // BeratKertasBawahJadi = (lebarKertasBawahJadi * panjangKertasBawahJadi) * denierValue / 2 * 1143000; //prettier-ignore
        BeratKertasBawahJadi = (lebarKertasBawahJadi / 100) * (panjangKertasBawahJadi / 100) * kertasJadiGSM; //prettier-ignore
        BeratKertasBawahPakai = (lebarKertasBawahPakai / 100) * (panjangKertasBawahPakai / 100) * kertasPakaiGSM; //prettier-ignore
        BeratInnerJadi = (panjangInnerJadi * lebarInnerJadi * tebalInnerJadi * 1.84) / 10000; //prettier-ignore
        BeratInnerPakai = panjangInnerPakai * lebarInnerPakai * tebalInnerPakai * 1.84 / 10000; //prettier-ignore
        BeratBenangJahitJadi = panjangKertasBawahJadi * 5 / 100 / 9000 * benangJahitJadi; //prettier-ignore
        BeratBenangJahitPakai = ((panjangKertasBawahPakai * 5) / 100 / 9000) * benangJahitPakai; //prettier-ignore
        if (
            eva.value !== "" &&
            eva.value.toUpperCase() !== "NONE" &&
            eva.value !== "-"
        ) {
            BeratLemEVA = 0.72 * (PanjangClothJadi / 100);
        } else {
            BeratLemEVA = 0;
        }
        if (
            overlap.value !== "" &&
            overlap.value.toUpperCase() !== "NONE" &&
            overlap.value !== "-"
        ) {
            BeratLemOverlap = 3 * (PanjangClothJadi / 100) * 2;
        } else {
            BeratLemOverlap = 0;
        }

        BeratTotalJadi = BeratClothJadi + BeratLamiJadi + BeratKertasJadi +
            BeratClothBawahJadi + BeratLamiBawahJadi + BeratKertasBawahJadi +
            BeratBenangJahitJadi + BeratLemEVA + BeratLemOverlap +
            BeratInnerJadi; //prettier-ignore
        BeratTotalPakai = BeratClothPakai + BeratLamiPakai + BeratKertasPakai +
            BeratClothBawahPakai + BeratLamiBawahPakai + BeratKertasBawahPakai +
            BeratBenangJahitPakai + BeratLemEVA + BeratLemOverlap +
            BeratInnerPakai; //prettier-ignore

        $.ajax({
            url: "TabelHitunganSandwich",
            type: "POST",
            dataType: "json",
            data: {
                _token: csrfToken,
                jenisStore: mode,
                idProduct: idProduct.value,
                idCustomer: idCustomer.value,
                namaCustomer: namaCustomer.value,
                typeProduct: productSandwich.checked ? 1 : 2,
                namaBarang: productType1.value + "-" + productType2.value,
                tanggalPembuatan: tanggalPembuatan.value,
                Lebar: lebar,
                Gusset: gusset,
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
                LamiJadi: lamiJadi,
                BeratLamiJadi: BeratLamiJadi,
                LamiPakai: lamiPakai,
                BeratLamiPakai: BeratLamiPakai,
                KertasJadiCM: KertasJadi,
                KertasJadiGSM: kertasJadiGSM,
                BeratKertasJadi: BeratKertasJadi,
                KertasPakaiCM: KertasPakai,
                KertasPakaiGSM: kertasPakaiGSM,
                BeratKertasPakai: BeratKertasPakai,
                LebarClothBawahJadi: lebarClothBawahJadi,
                PanjangClothBawahJadi: panjangClothBawahJadi,
                BeratClothBawahJadi: BeratClothBawahJadi,
                LebarClothBawahPakai: lebarClothBawahPakai,
                PanjangClothBawahPakai: panjangClothBawahPakai,
                BeratClothBawahPakai: BeratClothBawahPakai,
                LamiBawahJadi: lamiBawahJadi,
                BeratLamiBawahJadi: BeratLamiBawahJadi,
                LamiBawahPakai: lamiBawahPakai,
                BeratLamiBawahPakai: BeratLamiBawahPakai,
                LebarKertasBawahJadi: lebarKertasBawahJadi,
                PanjangKertasBawahJadi: panjangKertasBawahJadi,
                BeratKertasBawahJadi: BeratKertasBawahJadi,
                LebarKertasBawahPakai: lebarKertasBawahPakai,
                PanjangKertasBawahPakai: panjangKertasBawahPakai,
                BeratKertasBawahPakai: BeratKertasBawahPakai,
                PanjangInnerJadi: panjangInnerJadi,
                LebarInnerJadi: lebarInnerJadi,
                TebalInnerJadi: tebalInnerJadi,
                BeratInnerJadi: BeratInnerJadi,
                PanjangInnerPakai: panjangInnerPakai,
                LebarInnerPakai: lebarInnerPakai,
                TebalInnerPakai: tebalInnerPakai,
                BeratInnerPakai: BeratInnerPakai,
                BenangJahitJadi: benangJahitJadi,
                BeratBenangJahitJadi: BeratBenangJahitJadi,
                BenangJahitPakai: benangJahitPakai,
                BeratBenangJahitPakai: BeratBenangJahitPakai,
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
                                ? "TabelHitunganSandwich/getListCustomerAdd"
                                : "TabelHitunganSandwich/getListCustomerUpdate";
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
                                url: "TabelHitunganSandwich/getListProduct",
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
                    const jenisProduct = selectedRow.TypeBarang.substring(0, firstDashIndex); //prettier-ignore
                    const namaProduct = selectedRow.TypeBarang.substring(firstDashIndex + 1); //prettier-ignore

                    productType1.value = jenisProduct.trim();
                    productType2.value = namaProduct.trim();
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
            bag_jadiLami.disabled = false;
            pemakaian_kainLami.disabled = false;
            bag_jadiLami.select();
            bag_jadiLami.focus();
        }
    });

    bag_jadiLami.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainLami.value = this.value;
            bag_jadiKertas.disabled = false;
            pemakaian_kainKertas.disabled = false;
            bag_jadiKertas.select();
            bag_jadiKertas.focus();
        }
    });

    bag_jadiKertas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainKertas.value = this.value;
            bag_jadiClothBawah1.disabled = false;
            pemakaian_kainClothBawah1.disabled = false;
            bag_jadiClothBawah1.select();
            bag_jadiClothBawah1.focus();
        }
    });

    bag_jadiClothBawah1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainClothBawah1.value = this.value;
            bag_jadiClothBawah2.disabled = false;
            pemakaian_kainClothBawah2.disabled = false;
            bag_jadiClothBawah2.select();
            bag_jadiClothBawah2.focus();
        }
    });

    bag_jadiClothBawah2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainClothBawah2.value = this.value;
            bag_jadiLamiBawah.disabled = false;
            pemakaian_kainLamiBawah.disabled = false;
            bag_jadiLamiBawah.select();
            bag_jadiLamiBawah.focus();
        }
    });

    bag_jadiLamiBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainLamiBawah.value = this.value;
            bag_jadiKertasBawah1.disabled = false;
            pemakaian_kainKertasBawah1.disabled = false;
            bag_jadiKertasBawah1.select();
            bag_jadiKertasBawah1.focus();
        }
    });

    bag_jadiKertasBawah1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainKertasBawah1.value = this.value;
            bag_jadiKertasBawah2.disabled = false;
            pemakaian_kainKertasBawah2.disabled = false;
            bag_jadiKertasBawah2.select();
            bag_jadiKertasBawah2.focus();
        }
    });

    bag_jadiKertasBawah2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainKertasBawah2.value = this.value;
            bag_jadiInner1.disabled = false;
            pemakaian_kainInner1.disabled = false;
            bag_jadiInner1.select();
            bag_jadiInner1.focus();
        }
    });

    bag_jadiInner1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainInner1.value = this.value;
            bag_jadiInner2.disabled = false;
            pemakaian_kainInner2.disabled = false;
            bag_jadiInner2.select();
            bag_jadiInner2.focus();
        }
    });

    bag_jadiInner2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainInner2.value = this.value;
            bag_jadiTebal.disabled = false;
            pemakaian_kainTebal.disabled = false;
            bag_jadiTebal.select();
            bag_jadiTebal.focus();
        }
    });

    bag_jadiTebal.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainTebal.value = this.value;
            bag_jadiBenangJahit.disabled = false;
            pemakaian_kainBenangJahit.disabled = false;
            bag_jadiBenangJahit.select();
            bag_jadiBenangJahit.focus();
        }
    });

    bag_jadiBenangJahit.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            pemakaian_kainBenangJahit.value = this.value;
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
