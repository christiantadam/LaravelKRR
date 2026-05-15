jQuery(function ($) {
    //#region Get element by ID
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radioStarpak = document.getElementById("radioStarpak");
    let radioAdstar = document.getElementById("radioAdstar");
    let checkCloseTop = document.getElementById("checkCloseTop");
    let checkOpenTop = document.getElementById("checkOpenTop");
    let idCust = document.getElementById("idCust");
    let namaCust = document.getElementById("namaCust");
    let btnBrowseCust1 = document.getElementById("btnBrowseCust1");
    let idProd1 = document.getElementById("idProd1");
    let namaProd1 = document.getElementById("namaProd1");
    let btnBrowseProd1 = document.getElementById("btnBrowseProd1");
    let idCust2 = document.getElementById("idCust2");
    let namaCust2 = document.getElementById("namaCust2");
    let btnBrowseCust2 = document.getElementById("btnBrowseCust2");
    let idProd2 = document.getElementById("idProd2");
    let namaProd2 = document.getElementById("namaProd2");
    let copyButton = document.getElementById("copyButton");
    let cancelButton = document.getElementById("cancelButton");
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
        radioStarpak.checked = true;
        checkCloseTop.checked = true;
        idCust.value = "";
        namaCust.value = "";
        idProd1.value = "";
        namaProd1.value = "";
        idCust2.value = "";
        namaCust2.value = "";
        idProd2.value = "STR";
        namaProd2.value = "";
        btnBrowseCust1.focus();
    }
    //#endregion

    //#region Event Listeners
    $('input[name="radioProductName"]').on("change", function () {
        const map = {
            Adstar: "ADS",
            Starpak: "STR",
        };

        if ($(this).is(":checked")) {
            $("#idProd2").val(map[$(this).val()]);
        }
    });

    btnBrowseCust1.addEventListener("click", async function (event) {
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
                        let url = checkCloseTop.checked
                            ? "CopyTableHitunganAdStar/getListCustomerCloseTop"
                            : "CopyTableHitunganAdStar/getListCustomerOpenTop";
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
                                    data: "NamaCust",
                                },
                                {
                                    data: "IDCust",
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
                    idCust.value = selectedRow.IDCust.split(" ")[1];
                    namaCust.value = selectedRow.NamaCust;
                    btnBrowseProd1.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnBrowseProd1.addEventListener("click", async function (event) {
        event.preventDefault();
        if (!idCust.value) {
            Swal.fire({
                title: "Error!",
                text: "Pilih customer dulu.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                btnBrowseCust1.focus();
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
                        let url = checkCloseTop.checked
                            ? "CopyTableHitunganAdStar/getListProductCloseTop"
                            : "CopyTableHitunganAdStar/getListProductOpenTop";
                        const table = $("#productTable").DataTable({
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
                                    idCust: idCust.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_brg",
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
                    idProd1.value = selectedRow.id;
                    namaProd1.value = selectedRow.Nama_brg;
                    btnBrowseCust2.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnBrowseCust2.addEventListener("click", async function (event) {
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
                                url: "CopyTableHitunganAdStar/getListCustomerTujuan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NAMACUST",
                                },
                                {
                                    data: "IDCust",
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
                    idCust2.value = selectedRow.IDCust.split(" -")[1];
                    namaCust2.value = selectedRow.NAMACUST;
                    namaProd2.readOnly = false;
                    namaProd2.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    cancelButton.addEventListener("click", function (e) {
        initializeForm();
    });

    copyButton.addEventListener("click", function (e) {
        if (!idCust2.value) {
            Swal.fire({
                title: "Error!",
                text: "Customer harus diisi.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                btnBrowseProd1.focus();
            });
            return;
        }

        if (!namaProd1.value) {
            Swal.fire({
                title: "Error!",
                text: "Produk yang akan dicopy harus diisi.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                btnBrowseCust1.focus();
            });
            return;
        }

        if (!idProd1.value) {
            Swal.fire({
                title: "Error!",
                text: "Nama produk hasil copy harus diisi.",
                icon: "error",
                returnFocus: false,
            }).then(() => {
                idProd1.focus();
            });
            return;
        }

        $.ajax({
            url: "CopyTableHitunganAdStar",
            type: "POST",
            dataType: "json",
            data: {
                _token: csrfToken,
                idProduct: idProd1.value,
                idCust: idCust2.value,
                namaBarang: idProd2.value + "-" + namaProd2.value,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.success,
                    }).then(() => {
                        initializeForm();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "An error occurred while saving data: " +
                            response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while posting data.",
                });
            },
        });
    });
    //#endregion
});
