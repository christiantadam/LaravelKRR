jQuery(function ($) {
    //#region Get element by ID
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radioSandwich = document.getElementById("radioSandwich");
    let radioTubing = document.getElementById("radioTubing");
    let radioTubingOPP = document.getElementById("radioTubingOPP");
    let idCust = document.getElementById("idCust");
    let namaCust = document.getElementById("namaCust");
    let btnBrowseCust = document.getElementById("btnBrowseCust");
    let ukuranProd = document.getElementById("ukuranProd");
    let btnBrowseUkuran = document.getElementById("btnBrowseUkuran");
    let idProd = document.getElementById("idProd");
    let namaProd = document.getElementById("namaProd");
    let btnBrowseProd = document.getElementById("btnBrowseProd");
    let cetakButton = document.getElementById("cetakButton");
    let clearButton = document.getElementById("clearButton");
    let jenisProduct;
    //#endregion

    //#region Load Form
    initializeForm();
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

    function initializeForm() {
        radioSandwich.checked = true;
        jenisProduct = 1;
        idCust.value = "";
        namaCust.value = "";
        idProd.value = "";
        namaProd.value = "";
        ukuranProd.value = "";
        btnBrowseCust.focus();
    }
    //#endregion

    //#region Event Listeners
    $('input[name="radioProductName"]').on("change", function () {
        const productMap = {
            Sandwich: {
                code: "SW",
                jenis: 1,
            },
            Tubing: {
                code: "TB",
                jenis: 3,
            },
            "Tubing OPP": {
                code: "TBO",
                jenis: 2,
            },
        };

        const selected = productMap[this.value];

        // $("#idProd").val(selected?.code || "");
        jenisProduct = selected?.jenis || null;
        idCust.value = "";
        namaCust.value = "";
        idProd.value = "";
        namaProd.value = "";
        ukuranProd.value = "";
        btnBrowseCust.focus();
    });

    btnBrowseCust.addEventListener("click", async function (event) {
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
                                url: "CetakTabelHitunganWovenBag/getListCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    jenisProduct: jenisProduct,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "KodeCust",
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
                    idCust.value = selectedRow.KodeCust;
                    namaCust.value = selectedRow.NamaCust;
                    btnBrowseUkuran.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnBrowseUkuran.addEventListener("click", async function (event) {
        event.preventDefault();
        if (!idCust.value) {
            Swal.fire({
                title: "Error!",
                text: "Pilih customer dulu.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                btnBrowseCust.focus();
            });
            return;
        }
        try {
            const result = await Swal.fire({
                title: "Select Ukuran Product",
                width: "50%",
                html: '<table id="ukuranTable" class="display" style="width:100%"><thead><tr><th>Ukuran</th><th>ID</th></tr></thead><tbody></tbody></table>',
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
                                url: "CetakTabelHitunganWovenBag/getListUkuran",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCust: idCust.value,
                                    idJenis: jenisProduct,
                                },
                            },
                            columns: [
                                {
                                    data: "Ukuran",
                                },
                                {
                                    data: "id",
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
                    ukuranProd.value = selectedRow.Ukuran;
                    btnBrowseProd.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnBrowseProd.addEventListener("click", async function (event) {
        event.preventDefault();
        if (!idCust.value) {
            Swal.fire({
                title: "Error!",
                text: "Pilih customer dulu.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                btnBrowseCust.focus();
            });
            return;
        }
        try {
            const result = await Swal.fire({
                title: "Select a Product",
                width: "50%",
                html: '<table id="productTable" class="display" style="width:100%"><thead><tr><th>Nama Barang</th><th>ID</th></tr></thead><tbody></tbody></table>',
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
                                url: "CetakTabelHitunganWovenBag/getListProduct",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCust: idCust.value,
                                    idJenis: jenisProduct,
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
                    idProd.value = selectedRow.id;
                    namaProd.value = selectedRow.TypeBarang;
                    cetakButton.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    cetakButton.addEventListener("click", function () {
        if (!idProd.value) {
            Swal.fire({
                title: "Error!",
                text: "Pilih produk dulu.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                btnBrowseProd.focus();
            });
            return;
        }
        const url = `CetakTabelHitunganWovenBag/cetak?productId=${idProd.value}&productName=${encodeURIComponent(namaProd.value)}`;
        window.open(url, "Cetak Table Hit. AdStar " + namaProd.value);
    });
    x;

    clearButton.addEventListener("click", function () {
        initializeForm();
    });
    //#endregion
});
