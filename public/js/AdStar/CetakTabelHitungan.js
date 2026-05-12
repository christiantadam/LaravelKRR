jQuery(function ($) {
    //#region Get element by ID
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let productStarpak = document.getElementById("productStarpak");
    let productAdstar = document.getElementById("productAdstar");
    let idCustomer = document.getElementById("idCustomer");
    let namaCustomer = document.getElementById("namaCustomer");
    let btnBrowseCustomer = document.getElementById("btnBrowseCustomer");
    let ukuran = document.getElementById("ukuran");
    let btnBrowseUkuran = document.getElementById("btnBrowseUkuran");
    let productId = document.getElementById("productId");
    let productType = document.getElementById("productType");
    let btnBrowseProduct = document.getElementById("btnBrowseProduct");
    let frontPrinting = document.getElementById("frontPrinting");
    let btnCetak = document.getElementById("btnCetak");
    let model;
    //#endregion

    //#region Load Form
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

    function cekModel() {
        return $.ajax({
            url: "/CetakTabelHitunganAdStar/cekModel",
            method: "GET",
            data: { productId: productId.value }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Model check failed",
                    });
                } else {
                    model = data[0].Model;
                    frontPrinting.value = data[0].PrintFront;
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Model data.",
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
                width: "50%",
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
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "CetakTabelHitunganAdStar/getListCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    IdJenis: productStarpak.checked ? 1 : 2,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                    width: "70%",
                                },
                                {
                                    data: "IDCust",
                                    width: "30%",
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
                    console.log(result.value, selectedRow.IDCust);

                    idCustomer.value = selectedRow.IDCust.split(" ")[1].trim();
                    namaCustomer.value = decodeHtmlEntities(selectedRow.NamaCust).trim(); //prettier-ignore
                    btnBrowseUkuran.disabled = false;
                    btnBrowseUkuran.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnBrowseUkuran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select Ukuran",
                width: "50%",
                html: '<table id="ukuranTable" class="display" style="width:100%"><thead><tr><th>Ukuran</th><th>Print Front</th></tr></thead><tbody></tbody></table>',
                returnFocus: false,
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#ukuranTable")
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
                        const table = $("#ukuranTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "CetakTabelHitunganAdStar/getListUkuran",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idcust: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Ukuran",
                                    width: "40%",
                                },
                                {
                                    data: "PrintFront",
                                    width: "60%",
                                },
                            ],
                        });
                        $("#ukuranTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });
                        const searchInput = $("#ukuranTable_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "ukuranTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    console.log(result.value, selectedRow.IDCust);
                    ukuran.value = selectedRow.Ukuran.trim();
                    frontPrinting.value = selectedRow.PrintFront.trim();

                    btnBrowseProduct.disabled = false;
                    btnBrowseProduct.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btnBrowseProduct.addEventListener("click", async function (event) {
        event.preventDefault();
        if (idCustomer.value == "") {
            return;
        }
        try {
            const result = await Swal.fire({
                title: "Select Product",
                width: "50%",
                html: '<table id="productTable" class="display" style="width:100%"><thead><tr><th>Type</th><th>Id</th><th>Tanggal</th></tr></thead><tbody></tbody></table>',
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
                                url: "CetakTabelHitunganAdStar/getListProduct",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    IdJenis: productStarpak.checked ? 1 : 2,
                                    idcust: idCustomer.value,
                                    ukuran: ukuran.value ?? null,
                                    frontPrinting: frontPrinting.value ?? null,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_brg",
                                    width: "50%",
                                },
                                {
                                    data: "id",
                                    width: "20%",
                                },
                                {
                                    data: "tanggal",
                                    width: "30%",
                                    render: function (data, type, full, meta) {
                                        return moment(data).format("DD-MM-YYYY"); //prettier-ignore
                                    },
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
                    console.log(selectedRow);
                    productId.value = selectedRow.id;
                    productType.value = selectedRow.Nama_brg;
                    btnCetak.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btnCetak.addEventListener("click", function (event) {
        cekModel().then(() => {
            if (model == 1) {
                if (productType.value.includes("TBI")) {
                    window.open(
                        `/CetakTabelHitunganAdStar/printOpenTopTBI?productId=` +
                            productId.value,
                        // +
                        // `&productType=` +
                        // productType.value,
                        "Cetak Table Hit. AdStar " + productType.value,
                    );
                } else {
                    window.open(
                        `/CetakTabelHitunganAdStar/printOpenTop?productId=` +
                            productId.value,
                        // +`&productType=` +
                        // productType.value,
                        "Cetak Table Hit. AdStar " + productType.value,
                    );
                }
            } else if (model == 2) {
                window.open(
                    `/CetakTabelHitunganAdStar/printCloseTop?productId=` +
                        productId.value,
                    // +`&productType=` +
                    // productType.value,
                    "Cetak Table Hit. AdStar " + productType.value,
                );
            }
            console.log("cekmodel then");
        });
    });
    //#endregion
});
