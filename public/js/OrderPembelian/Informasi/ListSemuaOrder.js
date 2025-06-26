jQuery(function ($) {
    //#region
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let tableListOrder = $("#tabelData").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        searching: false,
        ordering: false,
        ajax: {
            url: "ListSemuaOrder/create",
            dataType: "json",
            type: "GET",
            data: function (d) {
                d._token = csrfToken;

                // collect custom filters
                let filters = [];
                $("#modalAdvancedSearch .advanced-filter-group").each(
                    function () {
                        const column = $(this).find(".column-select").val();
                        const operator = $(this).find(".filter-type").val();
                        const value = $(this).find(".search-value").val();
                        const sort = $(this).find(".sort-order").val();

                        if ((column && operator && value) || (column && sort)) {
                            filters.push({ column, operator, value, sort });
                        }
                    }
                );

                d.custom_filters = filters;
                d.maximumRecords = parseInt($("#maximumRecords").val()); // send to Laravel
            },
        },
        columns: [
            {
                data: "NO_ORDER", // No. Order {{-- 0 --}}
                title: "No. Order",
            },
            {
                data: "STATUS_PO", // Status Order  {{-- 1 --}}
                title: "Status Order",
            },
            {
                data: "TglAprMGR", // Tgl. Approve Mgr. {{-- 2 --}}
                title: "Tgl. Approve Mgr.",
                render: function (data, type, row) {
                    if (data != null) {
                        // console.log(data);
                        let parts = data.split(" ")[0].split("-");
                        let time = data.split(" ")[1].split(".");
                        // console.log(parts);

                        let tgl =
                            parts[2] +
                            "-" +
                            parts[1] +
                            "-" +
                            parts[0] +
                            " " +
                            time[0];
                        return tgl;
                    } else {
                        return "";
                    }
                },
            },
            {
                data: "STATUS_BELI", // Status Beli {{-- 3 --}}
                title: "Status Beli",
            },
            {
                data: "NO_PO", // No. PO {{-- 4 --}}
                title: "No. PO",
            },
            {
                data: "TGL_PO", // Tgl. PO {{-- 5 --}}
                title: "Tgl. PO",
                render: function (data, type, row) {
                    if (data != null) {
                        let parts = data.split(" ")[0].split("-");
                        let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                        return tgl;
                    } else {
                        return "";
                    }
                },
            },
            {
                data: "KODE_BARANG", // Kode Barang {{-- 6 --}}
                title: "Kode Barang",
            },
            {
                data: "NM_BARANG", // Nama Barang {{-- 7 --}}
                title: "Nama Barang",
            },
            {
                data: "SUB_KATEGORI", // Sub Kategori {{-- 8 --}}
                title: "Sub Kategori",
            },
            {
                data: "SUPPLIER", // Supplier {{-- 9 --}}
                title: "Supplier",
            },
            {
                data: "PriceUnit", // Price Unit {{-- 10 --}}
                title: "Price Unit",
                render: function (data, type, row) {
                    return numeral(data).format("0,0.00");
                },
            },
            {
                data: "PPN", // PPN (%) {{-- 11 --}}
                title: "PPN (%)",
                render: function (data) {
                    if (data != null) {
                        return parseFloat(data).toFixed(2);
                    } else {
                        return "";
                    }
                },
            },
            {
                data: "QTY_PO", // Qty. PO {{-- 12 --}}
                title: "Qty. PO",
                render: function (data) {
                    if (data != null) {
                        return parseFloat(data).toFixed(2);
                    } else {
                        return "";
                    }
                },
            },
            {
                data: "SATUAN", // Satuan {{-- 13 --}}
                title: "Satuan",
            },
            {
                data: "PAY_TERM", // Payment Term {{-- 14 --}}
                title: "Payment Term",
            },
            {
                data: "NM_USER", // Nama User {{-- 15 --}}
                title: "Nama User",
            },
            {
                data: "NM_DIVISI", // Nama Divisi {{-- 16 --}}
                title: "Nama Divisi",
            },
            {
                data: "No_BTTB", // No. BTTB {{-- 17 --}}
                title: "No. BTTB",
            },
            {
                data: "TGL_DATANG", // Tgl. Datang {{-- 18 --}}
                title: "Tgl. Datang",
                render: function (data, type, row) {
                    if (data != null) {
                        let parts = data.split(" ")[0].split("-");

                        let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                        return tgl;
                    } else {
                        return "";
                    }
                },
            },
            {
                data: "NOTELINE", // Keterangan Order {{-- 19 --}}
                title: "Keterangan Order",
            },
            {
                data: "Ket_Internal", // Keterangan Internal {{-- 20 --}}
                title: "Keterangan Internal",
            },
        ],
    });

    const columnTypeMap = {
        NO_ORDER: "number",
        STATUS_PO: "number",
        TglAprMGR: "date",
        STATUS_BELI: "string",
        NO_PO: "string",
        TGL_PO: "date",
        KODE_BARANG: "number",
        NM_BARANG: "string",
        SUB_KATEGORI: "string",
        SUPPLIER: "string",
        PriceUnit: "number",
        PPN: "number",
        QTY_PO: "number",
        SATUAN: "string",
        PAY_TERM: "string",
        NM_USER: "string",
        NM_DIVISI: "string",
        No_BTTB: "string",
        TGL_DATANG: "date",
        NOTELINE: "string",
        Ket_Internal: "string",
    };

    const filterOptions = {
        string: ["=", "!=", "like", "in", "notin", "isnull", "isnotnull"],
        number: ['=', '!=', 'like', 'in', 'notin', 'isbetween', 'notbetween', 'isnull', 'isnotnull'], // prettier-ignore
        date: ["=", "!=", "isbetween", "notbetween", "isnull", "isnotnull"],
        boolean: ["=", "!=", "isnull", "isnotnull"],
    };

    //#region functions


    // Setup global AJAX handlers
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

    function populateColumnSelect() {
        let select = $(".column-select"); // or loop over each if you have multiple

        // Get visible columns from DataTable
        tableListOrder.columns().every(function () {
            let colData = this.dataSrc(); // column 'data'
            let colTitle = this.header().textContent; // column header text

            // Only include if column has a defined 'data' property
            if (colData) {
                select.append(
                    $("<option>", {
                        value: colData,
                        text: colTitle,
                    })
                );
            }
        });
        select.prop("selectedIndex", 0); // Reset to first option
    }

    function initializeSelect2() {
        $(".column-select").select2({
            placeholder: "Select column name",
            allowClear: true,
            dropdownParent: $("#modalAdvancedSearch"), // important if inside a modal
        });
        $(".filter-type").select2({
            placeholder: "Select Filter Type",
            allowClear: true,
            dropdownParent: $("#modalAdvancedSearch"), // important if inside a modal
        });
        $(".sort-order").select2({
            placeholder: "Select Sort Type",
            allowClear: true,
            dropdownParent: $("#modalAdvancedSearch"), // important if inside a modal
        });
    }

    function handleFilterTypeVisibility() {
        $(".advanced-filter-group").each(function () {
            const group = $(this);
            const columnSelect = group.find(".column-select");
            const filterType = group.find(".filter-type");

            columnSelect.on("change", function () {
                const selectedCol = $(this).val();

                const colType = columnTypeMap[selectedCol] || "string"; // fallback to string

                const allowed = filterOptions[colType] || [];

                // Save current value to try reselecting it later
                const prevVal = filterType.val();
                // console.log("Selected Column:", selectedCol);
                // console.log("Column Type:", colType);
                // console.log("Allowed Filter Types:", allowed);
                // console.log("Previous Value:", prevVal);

                // Clear and rebuild options
                filterType.empty();
                filterType.append(new Option("No Filter", ""));
                allowed.forEach((opt) => {
                    const label = getFilterLabel(opt); // Optional: prettier labels
                    // console.log("Adding Option:", label, opt);

                    filterType.append(new Option(label, opt));
                });

                if (allowed.includes(prevVal)) {
                    filterType.val(prevVal);
                } else {
                    filterType.val("");
                }
            });

            // Trigger change to initialize the correct options
            columnSelect.trigger("change");
        });
    }

    function getFilterLabel(op) {
        switch (op) {
            case "=":
                return "Equal";
            case "!=":
                return "Not Equal";
            case "like":
                return "Contains";
            case "in":
                return "In";
            case "notin":
                return "Not In";
            case "isbetween":
                return "Is Between";
            case "notbetween":
                return "Is Not Between";
            case "isnull":
                return "Is Null";
            case "isnotnull":
                return "Is Not Null";
            default:
                return op;
        }
    }

    //#endregion

    //#region Form Load

    populateColumnSelect();
    initializeSelect2();
    handleFilterTypeVisibility();

    //#endregion

    //#region Event Listener

    $("#btnAdvancedSearch").on("click", function () {
        $("#modalAdvancedSearch").modal("show");
    });

    $("#closeModalButton").on("click", function () {
        $("#modalAdvancedSearch").modal("hide");
    });

    $("#applySearch").on("click", function () {
        let isValid = true;
        let errorMsg = "";

        $(".advanced-filter-group").each(function (i, el) {
            const index = i + 1;
            const column = $(el).find(".column-select").val();
            const filter = $(el).find(".filter-type").val();
            const value = $(el).find(".search-value").val().trim();

            // If user selected "isbetween" or "notbetween"
            if (
                (filter === "isbetween" || filter === "notbetween") &&
                value !== ""
            ) {
                // Check if it contains at least one comma and two parts
                const parts = value.split(",");
                if (
                    parts.length < 2 ||
                    parts[0].trim() === "" ||
                    parts[1].trim() === ""
                ) {
                    isValid = false;
                    errorMsg = `Baris filter ${index}: Format untuk "${filter}" harus seperti "value1, value2"`;
                    return false; // break loop
                }
            }
        });

        if ($("#maximumRecords").val() == "") {
            $("#maximumRecords").val(1000);
        }

        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Input",
                text: errorMsg,
            });
            return;
        }

        // ✅ Passed validation, proceed with building filter logic or Ajax reload
        console.log("All filters valid. Proceed...");
        $("#modalAdvancedSearch").modal("hide");
        tableListOrder.ajax.reload(); // trigger reload with custom filters
    });

    $("#btnExportExcel").on("click", function () {
        let requestData = {
            _token: csrfToken,
            jenisStore: "exportToExcel",
            maximumRecords: parseInt($("#maximumRecords").val()) || 10,
            custom_filters: [],
        };

        $("#modalAdvancedSearch .advanced-filter-group").each(function () {
            const column = $(this).find(".column-select").val();
            const operator = $(this).find(".filter-type").val();
            const value = $(this).find(".search-value").val();
            const sort = $(this).find(".sort-order").val();

            if ((column && operator && value) || (column && sort)) {
                requestData.custom_filters.push({
                    column,
                    operator,
                    value,
                    sort,
                });
            }
        });

        $.ajax({
            url: "ListSemuaOrder", // create this route/controller
            method: "POST",
            data: requestData,
            success: function (response) {
                // Convert response (JSON array) to Excel
                const dataToExport = response.data.map((row) => ({
                    NO_ORDER: row.NO_ORDER?.trim(),
                    STATUS_PO: row.STATUS_PO?.trim(),
                    TglAprMGR: row.TglAprMGR,
                    STATUS_BELI: row.STATUS_BELI,
                    NO_PO: row.NO_PO,
                    TGL_PO: row.TGL_PO,
                    KODE_BARANG: row.KODE_BARANG,
                    NM_BARANG: row.NM_BARANG,
                    SUB_KATEGORI: row.SUB_KATEGORI?.trim(),
                    SUPPLIER: row.SUPPLIER,
                    PriceUnit: parseFloat(row.PriceUnit ?? 0),
                    PPN: parseFloat(row.PPN ?? 0),
                    QTY_PO: parseFloat(row.QTY_PO ?? 0),
                    SATUAN: row.SATUAN?.trim(),
                    PAY_TERM: row.PAY_TERM?.trim(),
                    NM_USER: row.NM_USER?.trim(),
                    NM_DIVISI: row.NM_DIVISI?.trim(),
                    No_BTTB: row.No_BTTB,
                    TGL_DATANG: moment(row.TGL_DATANG).format("DD-MM-YYYY"),
                    NOTELINE: row.NOTELINE,
                    Ket_Internal: row.Ket_Internal,
                }));

                let ws = XLSX.utils.json_to_sheet(dataToExport);
                let wb = XLSX.utils.book_new();
                const sheetName = moment().format("YYYY-MM-DD_HH-mm-ss");
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
                XLSX.writeFile(wb, "ListSemuaOrder.xlsx");
            },
        });
    });
    //#endregion
});
