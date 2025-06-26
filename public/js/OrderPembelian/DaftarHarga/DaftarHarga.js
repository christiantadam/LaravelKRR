jQuery(function ($) {
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let tabelData = $("#tabelData").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        searching: false,
        ordering: false,
        ajax: {
            url: "/DaftarHarga/create",
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
            { data: "Kd_div" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "Nama_satuan" },
            { data: "NM_SUP" },
            { data: "KOTA1" },
            { data: "NEGARA1" },
            {
                data: "Hrg_trm",
                render: function (data, type, row) {
                    return numeral(data).format("0,0.00");
                },
            },
            { data: "Id_MataUang_BC" },
            { data: "Nama" },
            // {
            //     data: "Tgl_order",
            //     render: function (data, type, row) {
            //         return moment(data).format("MM-DD-YYYY");
            //     },
            // },
            {
                data: "Datang",
                render: function (data, type, row) {
                    return moment(data).format("MM-DD-YYYY");
                },
            },
        ],
    });
    let clickEvent = new Event("click");

    let kdBarangAslinya;
    const columnTypeMap = {
        No_trans: "number",
        Status: "string",
        Tgl_order: "date",
        Kd_brg: "number",
        NAMA_BRG: "string",
        Hrg_trm: "number",
        Nama_satuan: "string",
        NM_SUP: "string",
        Nama: "string",
        NM_DIV: "string",
        nama_sub_kategori: "string",
        StatusBeli: "string",
        Qty: "number",
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
        tabelData.columns().every(function () {
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
        tabelData.ajax.reload(); // trigger reload with custom filters
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
            url: "HistoryPembelianMaster", // create this route/controller
            method: "POST",
            data: requestData,
            success: function (response) {
                // Convert response (JSON array) to Excel
                const dataToExport = response.data.map((row) => ({
                    No_trans: row.No_trans,
                    Status: row.Status,
                    Tgl_order: row.Tgl_order,
                    Kd_brg: row.Kd_brg,
                    NAMA_BRG: row.NAMA_BRG,
                    Hrg_trm: row.Hrg_trm,
                    Nama_satuan: row.Nama_satuan,
                    NM_SUP: row.NM_SUP,
                    Nama: row.Nama,
                    NM_DIV: row.NM_DIV,
                    nama_sub_kategori: row.nama_sub_kategori,
                    StatusBeli: row.StatusBeli,
                    Qty: row.Qty,
                }));

                let ws = XLSX.utils.json_to_sheet(dataToExport);
                let wb = XLSX.utils.book_new();
                const sheetName = moment().format("YYYY-MM-DD_HH-mm-ss");
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
                XLSX.writeFile(wb, "HistoryPembelian.xlsx");
            },
        });
    });
    //#endregion
});
