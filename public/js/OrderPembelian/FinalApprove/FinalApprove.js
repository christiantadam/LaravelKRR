jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let namaUser = document.getElementById("namaUser");
    let kdDivisiDoubleACC = [
        "BKL",
        "BKR",
        "BRD",
        "CL ",
        "CLD",
        "CLM",
        "NDL",
        "RBL",
    ];
    let kdDivisiOnlyTjahyo = ["BHM", "BHN"];
    let userDirektur = ["RUDY", "TJAHYO", "YUDI"];
    let table = $("#table_Approve").DataTable({
        processing: true,
        responsive: true,
        serverSide: false,
        order: [[2, "desc"]], // index 2 = kolom Tanggal
        ajax: {
            url: "/FinalApprove/getAllSPPB",
            type: "GET",
            data: function (d) {

                let filters = [];

                $("#modalAdvancedSearch .advanced-filter-group").each(function (i, el) {

                    let column = $(this).find(".column-select").val();
                    let operator = $(this).find(".filter-type").val();
                    let isBetween = operator === "isbetween" || operator === "notbetween";
                    let value = null;

                    if (column && operator) {

                        let colType = columnTypeMap[column];

                        if (colType === "date") {
                            if (isBetween) {
                                value =
                                    $(el).find(".search-date1").val().trim() +
                                    "," +
                                    $(el).find(".search-date2").val().trim();
                            } else {
                                value = $(el).find(".search-date").val().trim();
                            }
                        } else if (colType === "number") {
                            if (isBetween) {
                                value =
                                    $(el).find(".search-number1").val().trim() +
                                    "," +
                                    $(el).find(".search-number2").val().trim();
                            } else {
                                value = $(el).find(".search-number").val().trim();
                            }
                        }
                        else if (colType === "acc") {
                            return;
                            // value = $(el).find(".search-acc-status").val();
                        }
                        else if (colType === "statusbeli") {
                            value = $(el).find(".search-status-beli").val();
                        }
                        else {
                            value = $(el).find(".search-value").val().trim();
                        }


                        filters.push({
                            column,
                            operator,
                            value
                        });
                    }
                });

                d.custom_filters = filters;
            }
        },


        columns: [
            {
                data: null,
                render: function (data, type, full, meta) {
                    if (
                        namaUser.value == "RUDY" ||
                        namaUser.value == "TJAHYO" ||
                        namaUser.value == "YUDI"
                    ) {
                        return `
                            <input
                                type="checkbox"
                                class="checkboxNoTrans"
                                value="${full.No_trans}"
                                data-status-pembelian="${full.StatusBeli}"
                                data-kode-divisi="${full.Kd_div}"
                                style="width:20px;height:20px;"
                            />
                        `;
                    }

                    if (full.StatusBeli == 0 && full.is_manager === true) {
                        return `
                            <input
                                type="checkbox"
                                class="checkboxNoTrans"
                                value="${full.No_trans}"
                                data-status-pembelian="${full.StatusBeli}"
                                data-kode-divisi="${full.Kd_div}"
                                style="width:20px;height:20px;"
                            />
                        `;
                    }
                    return "";
                },
            },
            {
                data: "No_trans",
                render: function (data, type, full, meta) {
                    return (
                        `
                        <a class="link_detail"
                           data-bs-toggle="modal" data-bs-target="#modalFinalApprove" data-id="` +
                        data +
                        `">
                            ` +
                        data +
                        `
                        </a>`
                    );
                },
            },
            {
                data: "Tgl_order",
                render: function (data, type, full, meta) {
                    return moment(data).format("MM-DD-YYYY");
                },
            },
            { data: "NAMA_BRG" },
            {
                data: "Qty",
                render: function (data, type, full, meta) {
                    return (
                        numeral(data).format("0,0.00") +
                        " " +
                        full.Nama_satuan.trim()
                    );
                },
            },
            {
                data: "PriceUnit",
                render: function (data, type, full, meta) {
                    return (
                        full.Id_MataUang_BC.trim() +
                        " " +
                        numeral(data).format("0,0.0000")
                    );
                },
            },
            {
                data: "PriceExt",
                render: function (data, type, full, meta) {
                    return (
                        full.Id_MataUang_BC.trim() +
                        " " +
                        numeral(data).format("0,0.0000")
                    );
                },
            },
            { data: "Kd_div" },
            { data: "Nama" },
            {
                data: "StatusBeli",
                render: function (data, type, full, meta) {
                    if (type === "filter" || type === "sort") {
                        return data;
                    }
                    return data == "0"
                        ? "Beli Sendiri"
                        : "Pengadaan Pembelian";
                }
            },
            {
                data: "Direktur",
                render: function (data, type, full, meta) {
                    if (data == null && full.StatusBeli == 0) {
                        return '<span class="badge bg-danger">Belum ACC</span>';
                    } else if (data && full.StatusBeli == 0) {
                        return '<span class="badge bg-success">Sudah ACC</span>';
                    } else if (full.StatusBeli == 1) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
                    }
                },
            },
            {
                data: "Direktur", // pak rudy atau pak yudi
                render: function (data, type, full, meta) {
                    if (data == null && full.StatusBeli == 0) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
                    } else if (
                        data == null &&
                        full.StatusBeli == 1 &&
                        kdDivisiOnlyTjahyo.includes(full.Kd_div)
                    ) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
                    } else if (data == null && full.StatusBeli == 1) {
                        return '<span class="badge bg-danger">Belum ACC</span>';
                    } else if (data && full.StatusBeli == 1) {
                        return '<span class="badge bg-success">Sudah ACC</span>';
                    }
                },
            },
            {
                data: "Direktur2", // pak tjahyo
                render: function (data, type, full, meta) {
                    if (data == null && full.StatusBeli == 0) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
                    } else if (
                        data == null &&
                        full.StatusBeli == 1 &&
                        kdDivisiDoubleACC.includes(full.Kd_div)
                    ) {
                        return '<span class="badge bg-danger">Belum ACC</span>';
                    } else if (
                        data == null &&
                        full.StatusBeli == 1 &&
                        !kdDivisiOnlyTjahyo.includes(full.Kd_div)
                    ) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
                    } else if (
                        data == null &&
                        full.StatusBeli == 1 &&
                        kdDivisiOnlyTjahyo.includes(full.Kd_div)
                    ) {
                        return '<span class="badge bg-danger">Belum ACC</span>';
                    } else if (data && full.StatusBeli == 1) {
                        return '<span class="badge bg-success">Sudah ACC</span>';
                    }
                },
            },
        ],

        columnDefs: [
            {
                orderable: false,
                targets: 0,
            },
            {
                targets: [4, 5, 6],
                className: "no-wrap",
            },
            {
                targets: [9, 10],
                visible: !userDirektur.includes(namaUser.value),
            },
        ],
        rowCallback: function (row, data) {
            let checked = listChecked.some((x) => x.No_trans === data.No_trans);

            if (checked) {
                $(row).find(".checkboxNoTrans").prop("checked", true);
            }
        },
    });


    let listChecked = [];
    let customAccFilters = [];
    let isCheckAll = false;
    let selectedNoTrans = null;
    let modalLabelFinalApprove = document.getElementById("modalLabelFinalApprove"); //prettier-ignore
    let final_namaBarang = document.getElementById("final_namaBarang");
    let final_detailBarang = document.getElementById("final_detailBarang");
    let final_btnShowDetail = document.getElementById("final_btnShowDetail");
    let btnDownload = document.getElementById("btnDownload");
    const btnShowBarang = document.getElementById("btnShowBarang");
    const dokPreview = document.getElementById("dok_preview");
    const dokKeterangan = document.getElementById("dok_keterangan");
    let final_kategoriUtama = document.getElementById("final_kategoriUtama");
    let final_kategori = document.getElementById("final_kategori");
    let final_subKategori = document.getElementById("final_subKategori");
    let final_qtyOrder = document.getElementById("final_qtyOrder");
    let final_divisi = document.getElementById("final_divisi");
    let final_user = document.getElementById("final_user");
    let final_status = document.getElementById("final_status");
    let final_ketOrder = document.getElementById("final_ketOrder");
    let final_ketInternal = document.getElementById("final_ketInternal");
    let final_pembelianTerakhir = document.getElementById("final_pembelianTerakhir"); //prettier-ignore
    let final_supplier = document.getElementById("final_supplier");
    let final_hargaUnit = document.getElementById("final_hargaUnit");
    let final_diskon = document.getElementById("final_diskon");
    let final_ppn = document.getElementById("final_ppn");
    let final_total = document.getElementById("final_total");
    const filterFinalApprove = $("#filterFinalApprove");
    const btnDownloadAttachment = document.getElementById("btnDownloadAttachment");
    let maxFilteredRows = null;
    let filteredCounter = 0;


    let columnTypeMap = {
        No_trans: "string",
        Tgl_order: "date",
        NAMA_BRG: "string",
        Qty: "number",
        PriceUnit: "number",
        PriceExt: "number",
        Kd_div: "string",
        Nama: "string",
        StatusBeli: "statusbeli",
        Direktur: "acc",
        Direktur2: "acc",
        acc: ["="]
    };

    const filterOptions = {
        string: ["=", "!=", "like", "in", "notin", "isnull", "isnotnull"],
        number: ['=', '!=', 'like', 'in', 'notin', 'isbetween', 'notbetween', 'isnull', 'isnotnull'], // prettier-ignore
        date: ["=", "!=", "isbetween", "notbetween", "isnull", "isnotnull"],
        boolean: ["=", "!=", "isnull", "isnotnull"],
        acc: ["="],
        statusbeli: ["="],
    };

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

    //#region Load Form
    populateColumn();
    initializeSelect2();
    handleFilterTypeVisibility();
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

    function initializeSelect2() {
        filterFinalApprove.select2({
            dropdownParent: $("#parentFilterFinalApproveSelect2"),
            placeholder: "Pilih JenisPembelian",
        });

        $("#filterFinalApprove").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

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
            let group = $(this);
            let columnSelect = group.find(".column-select");
            let filterType = group.find(".filter-type");

            columnSelect.on("change", function () {
                const selectedCol = $(this).val();

                const colType = columnTypeMap[selectedCol] || "string"; // fallback to string

                // AUTO SET EQUAL UNTUK STATUS & ACC
                if (colType === "statusbeli" || colType === "acc") {
                    filterType.empty();
                    filterType.append(new Option("Equal", "="));
                    filterType.val("=");
                    filterType.prop("disabled", true); // disable supaya tidak bisa diganti
                } else {
                    filterType.prop("disabled", false);

                    filterType.empty();
                    const allowed = filterOptions[colType] || [];

                    allowed.forEach((opt) => {
                        const label = getFilterLabel(opt);
                        filterType.append(new Option(label, opt));
                    });
                }


                const allowed = filterOptions[colType] || [];

                // Save current value to try reselecting it later
                const prevVal = filterType.val();
                // console.log("Selected Column:", selectedCol);
                // console.log("Column Type:", colType);
                // console.log("Allowed Filter Types:", allowed);
                // console.log("Previous Value:", prevVal);

                // Clear and rebuild options
                filterType.empty();
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

                let filter = filterType.val();
                let isBetween = filter === "isbetween" || filter === "notbetween"; //prettier-ignore

                group.find(".search-value").hide();
                group.find(".search-date").hide();
                group.find(".search-number").hide();
                group.find(".div-date-between").hide();
                group.find(".div-number-between").hide();
                group.find(".search-acc-status").hide();
                group.find(".search-status-beli").hide();


                if (colType === "acc") {
                    group.find(".search-acc-status").show();
                    return;
                }

                if (colType === "statusbeli") {
                    group.find(".search-status-beli").show();
                    return;
                }

                if (colType === "date") {
                    if (isBetween) {
                        group.find(".div-date-between").show();
                    } else {
                        group.find(".search-date").show();
                    }
                } else if (colType === "number") {
                    if (isBetween) {
                        group.find(".div-number-between").show();
                    } else {
                        group.find(".search-number").show();
                    }
                } else if (colType === "statusbeli") {
                    group.find(".search-status-beli").show();
                }
                else {
                    group.find(".search-value").show();
                }
            });

            filterType.on("change", function () {

                const selectedCol = columnSelect.val();
                const colType = columnTypeMap[selectedCol] || "string";
                const filter = filterType.val();
                const isBetween = filter === "isbetween" || filter === "notbetween";

                group.find(".search-value").hide();
                group.find(".search-date").hide();
                group.find(".search-number").hide();
                group.find(".div-date-between").hide();
                group.find(".div-number-between").hide();
                group.find(".search-acc-status").hide();
                group.find(".search-status-beli").hide();

                if (colType === "acc") {
                    group.find(".search-acc-status").show();
                    return;
                }

                if (colType === "statusbeli") {
                    group.find(".search-status-beli").show();
                    return;
                }

                if (colType === "date") {
                    if (isBetween) {
                        group.find(".div-date-between").show();
                    } else {
                        group.find(".search-date").show();
                    }
                }
                else if (colType === "number") {
                    if (isBetween) {
                        group.find(".div-number-between").show();
                    } else {
                        group.find(".search-number").show();
                    }
                }
                else {
                    group.find(".search-value").show();
                }
            });

            // Trigger change to initialize the correct options
            columnSelect.trigger("change");
        });
    }

    function populateColumn() {
        let select = $(".column-select"); // or loop over each if you have multiple

        // Get visible columns from DataTable
        table.columns().every(function () {
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
        $(".advanced-filter-group").each(function () {
            const group = $(this);
            const columnSelect = group.find(".column-select");
            const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

            // Reset each select to first option
            columnSelect.val("").trigger("change");
            group.find(".filter-type").val("").trigger("change");
            group.find(".search-value").val("");
            group.find(".search-date1").val(today);
            group.find(".search-date2").val(today);
            group.find(".search-date").val(today);
        });
    }

    // function getAccManagerStatus(row) {

    //     if (row.StatusBeli == 1) {
    //         return "Tidak Perlu ACC";
    //     }

    //     if (row.Direktur === "RUDY") {
    //         return "Tidak Perlu ACC";
    //     }

    //     if (row.Direktur == null) {
    //         return "Belum ACC";
    //     }
    //     return "Sudah ACC";
    // }

    // function getAccRudyStatus(row) {

    //     if (row.StatusBeli == 0)
    //         return "Tidak Perlu ACC";

    //    if (
    //         kdDivisiDoubleACC.includes(row.Kd_div)
    //     )
    //     {
    //         if (!row.Direktur)
    //             return "Belum ACC";

    //         if (row.Direktur === "RUDY")
    //             return "Sudah ACC";

    //         return "Belum ACC";
    //     }

    //     return "Tidak Perlu ACC";
    // }


    // function getAccTjahyoStatus(row) {

    //     if (row.StatusBeli == 0)
    //         return "Tidak Perlu ACC";

    //     if (
    //         kdDivisiDoubleACC.includes(row.Kd_div) ||
    //         kdDivisiOnlyTjahyo.includes(row.Kd_div)
    //     ) {

    //         if (!row.Direktur2)
    //             return "Belum ACC";

    //         if (row.Direktur2 === "TJAHYO")
    //             return "Sudah ACC";

    //         return "Belum ACC";
    //     }

    //     return "Tidak Perlu ACC";
    // }




    //#endregion

    //#region Event Listener

    filterFinalApprove.on("select2:select", function () {
        selectedFilter = $(this).val(); // Get selected Filter

        if (selectedFilter === "ALL") {
            // reset filter
            table.column(9).search("").draw();
        } else {
            // filter berdasarkan StatusBeli
            table
                .column(9)
                .search("^" + selectedFilter + "$", true, false)
                .draw();
        }
    });


    $("#btnAdvancedSearch").on("click", function () {
        $("#modalAdvancedSearch").modal("show");
    });

    $("#closeModalButton").on("click", function () {
        $("#modalAdvancedSearch").modal("hide");
    });

    $("#applySearch").on("click", function () {

        let isValid = true;
        let errorMsg = "";
        let firstInvalidInput;
        let maxRecords = parseInt($("#maximumRecords").val());

        $(".advanced-filter-group").each(function (i, el) {

            const $group = $(el);
            const index = i + 1;
            const column = $group.find(".column-select").val();
            const filter = $group.find(".filter-type").val();
            const isBetween = filter === "isbetween" || filter === "notbetween";

            if (column && filter) {

                const colType = columnTypeMap[column];

                if (colType === "date") {

                    if (isBetween) {

                        let value1 = $group.find(".search-date1").val().trim();
                        let value2 = $group.find(".search-date2").val().trim();

                        if (!value1 || !value2) {
                            isValid = false;
                            errorMsg = `Tanggal awal dan akhir pada filter baris ${index} belum lengkap.`;
                            firstInvalidInput = !value1
                                ? $group.find(".search-date1")[0]
                                : $group.find(".search-date2")[0];
                            return false;
                        }

                        if (value1 > value2) {
                            isValid = false;
                            errorMsg = `Tanggal awal lebih besar daripada tanggal akhir pada filter baris ${index}.`;
                            firstInvalidInput = $group.find(".search-date1")[0];
                            return false;
                        }

                    } else {

                        let value = $group.find(".search-date").val().trim();

                        if (!value) {
                            isValid = false;
                            errorMsg = `Tanggal pada filter baris ${index} belum diisi.`;
                            firstInvalidInput = $group.find(".search-date")[0];
                            return false;
                        }
                    }
                }

                else if (colType === "number") {

                    if (isBetween) {

                        let value1 = $group.find(".search-number1").val().trim();
                        let value2 = $group.find(".search-number2").val().trim();

                        if (!value1 || !value2) {
                            isValid = false;
                            errorMsg = `Nilai angka antara pada filter baris ${index} belum lengkap.`;
                            firstInvalidInput = !value1
                                ? $group.find(".search-number1")[0]
                                : $group.find(".search-number2")[0];
                            return false;
                        }

                        if (parseFloat(value1) > parseFloat(value2)) {
                            isValid = false;
                            errorMsg = `Nilai angka awal lebih besar daripada angka akhir pada filter baris ${index}.`;
                            firstInvalidInput = $group.find(".search-number1")[0];
                            return false;
                        }

                    } else {

                        let value = $group.find(".search-number").val().trim();

                        if (!value) {
                            isValid = false;
                            errorMsg = `Nilai angka pada filter baris ${index} belum diisi.`;
                            firstInvalidInput = $group.find(".search-number")[0];
                            return false;
                        }
                    }
                }

                else if (colType === "acc") {
                    let value = $group.find(".search-acc-status").val();

                    if (!value) {
                        isValid = false;
                        errorMsg = `Status ACC pada filter baris ${index} belum dipilih.`;
                        firstInvalidInput = $group.find(".search-acc-status")[0];
                        return false;
                    }
                }

                else if (colType === "statusbeli") {

                    let value = $group.find(".search-status-beli").val();

                    if (!value) {
                        isValid = false;
                        errorMsg = `Status Beli pada filter baris ${index} belum dipilih.`;
                        firstInvalidInput = $group.find(".search-status-beli")[0];
                        return false;
                    }
                }

                else {
                    let value = $group.find(".search-value").val().trim();

                    if (!value) {
                        isValid = false;
                        errorMsg = `Nilai pencarian pada filter baris ${index} belum diisi.`;
                        firstInvalidInput = $group.find(".search-value")[0];
                        return false;
                    }
                }
            }
        });

        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Input",
                text: errorMsg,
            }).then(() => {
                if (firstInvalidInput) firstInvalidInput.focus();
            });
            return;
        }

        // ===== TAMBAHAN FILTER ACC (FRONTEND ONLY) =====
        customAccFilters = [];

        $(".advanced-filter-group").each(function () {

            const column = $(this).find(".column-select").val();
            const colType = columnTypeMap[column];

            if (colType === "acc") {

                const value = $(this).find(".search-acc-status").val();
                //const headerText = $(this).find(".column-select option:selected").text();

                if (column && value) {
                    const label = $(this)
                    .find(".column-select option:selected")
                    .text()
                    .trim();

                    customAccFilters.push({
                        label: label,
                        value: value
                    });

                }
            }
        });

        if (!isNaN(maxRecords) && maxRecords > 0) {
            maxFilteredRows = maxRecords;
        } else {
            maxFilteredRows = null;
        }


        $("#modalAdvancedSearch").modal("hide");
        filteredCounter = 0;
        table.ajax.reload(null, false);
        // table.draw();
    });


    $(document).on("click", ".checkboxNoTrans", function (e) {
        let noTrans = $(this).val();
        let statusPembelian = $(this).data("status-pembelian");
        let kodeDivisi = $(this).data("kode-divisi");

        if ($(this).is(":checked")) {
            // prevent duplicate No_trans
            let exists = listChecked.some((item) => item.No_trans === noTrans);

            if (!exists) {
                listChecked.push({
                    No_trans: noTrans,
                    StatusBeli: statusPembelian,
                    Kd_div: kodeDivisi,
                });
            }
        } else {
            listChecked = listChecked.filter(
                (item) => item.No_trans !== noTrans,
            );
        }
        console.log(listChecked);
    });

    $(document).on("click", ".checkedAll", function (e) {
        e.preventDefault();

        if (!isCheckAll) {
            // === CHECK ALL ===
            $.ajax({
                url: "/FinalApprove/getAllNoTrans",
                type: "GET",
                data: table.ajax.params(),
                success: function (res) {
                    listChecked = res;

                    // check semua checkbox di page aktif
                    table.rows({ page: "current" }).every(function () {
                        let data = this.data();
                        let checked = listChecked.some(
                            (x) => x.No_trans === data.No_trans,
                        );

                        if (checked) {
                            $(this.node())
                                .find(".checkboxNoTrans")
                                .prop("checked", true);
                        }
                    });
                },
            });
        }
    });
    $(document).on("click", "#btn_cancel", function (e) {
        e.preventDefault();
        if (listChecked.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Tidak ada data dipilih",
                text: "Silakan pilih data yang ingin di-batalkan terlebih dahulu.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi Cancel",
            text: "Data ini akan diproses Cancel Order. Lanjutkan?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Cancel",
            cancelButtonText: "Batal",
            confirmButtonColor: "#C3031C",
            cancelButtonColor: "#6c757d",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/FinalApprove",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        action: "Cancel",
                        checkedBOX: listChecked,
                    },
                    dataType: "json",
                    success: function (response) {
                        if (!response) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Cancel Order failed ",
                                returnFocus: false,
                            });
                        } else {
                            table.ajax.reload();
                            console.log(response);
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: response.success,
                                    returnFocus: false,
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    showConfirmButton: false,
                                    text: response.error,
                                    returnFocus: false,
                                });
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to Cancel Order.",
                        });
                    },
                });
            }
        });
    });

    $(document).on("click", "#btn_approve", function (e) {
        e.preventDefault();

        if (listChecked.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Tidak ada data dipilih",
                text: "Silakan pilih data yang ingin di-approve terlebih dahulu.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi Approve",
            text: "Data ini akan diproses Final Approve. Lanjutkan?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Approve",
            cancelButtonText: "Batal",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#6c757d",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/FinalApprove",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        action: "Approve",
                        checkedBOX: listChecked,
                    },
                    dataType: "json",
                    success: function (response) {
                        if (!response) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Approve Order failed ",
                                returnFocus: false,
                            });
                        } else {
                            table.ajax.reload();
                            console.log(response);
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                showConfirmButton: false,
                                timer: 1000,
                                text: response.success,
                                returnFocus: false,
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to Approve Order.",
                        });
                    },
                });
            }
        });
    });

    $(document).on("click", ".link_detail", function (e) {
        selectedNoTrans = $(this).data("id");
        let noTrans = selectedNoTrans;
        $.ajax({
            url: "/FinalApprove/getDetailNoTrans",
            type: "GET",
            data: { noTrans: noTrans },
            success: function (res) {

                console.log("FULL RESPONSE:", res);
                console.log("Gambar Dokumentasi:", window.dokumentasiBase64);
                console.log("Dokumentasi: ", res[0].Dokumentasi);

                modalLabelFinalApprove.innerHTML =
                    "Detail No. Trans " + noTrans;
                final_namaBarang.value = res[0].NAMA_BRG;
                final_kategoriUtama.innerHTML =
                    "Kategori Utama: " + res[0].nama;
                final_kategori.innerHTML = "Kategori: " + res[0].nama_kategori;
                final_subKategori.innerHTML =
                    "Sub Kategori: " + res[0].nama_sub_kategori;
                final_qtyOrder.value = numeral(res[0].Qty).format("0,0.00");
                final_divisi.value = res[0].NM_DIV.trim();
                final_user.value = res[0].NamaUser;
                final_status.value =
                    res[0].StatusBeli == 0
                        ? "Beli Sendiri "
                        : "Pengadaan Pembelian";
                final_ketOrder.value = res[0].keterangan;
                final_ketInternal.value = res[0].Ket_Internal;
                final_pembelianTerakhir.value = moment(res[0].Tgl_order).format(
                    "MM/DD/YYYY",
                );
                final_supplier.value = res[0].NM_SUP;
                final_hargaUnit.value = numeral(res[0].PriceUnit).format(
                    "0,0.0000",
                );
                final_diskon.value = numeral(res[0].harga_disc).format(
                    "0,0.0000",
                );
                final_ppn.value = numeral(res[0].PPN).format("0,0.0000");
                final_total.value = numeral(res[0].PriceExt).format("0,0.0000");
                window.dokumentasiBase64 = res[0].Dokumentasi;
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to get detail trans.",
                });
            },
        });
    });


    final_btnShowDetail.addEventListener("click", function (e) {
        if (this.innerHTML == "Show Kategori Barang") {
            this.innerHTML = "Hide Kategori Barang";
            final_detailBarang.style.display = "block";
        } else if (this.innerHTML == "Hide Kategori Barang") {
            this.innerHTML = "Show Kategori Barang";
            final_detailBarang.style.display = "none";
        }
    });


    $("#btnExportExcel").on("click", function () {
        let requestData = {
            _token: csrfToken,
            jenisStore: "exportToExcel",
            maximumRecords: parseInt($("#maximumRecords").val()) || 1000,
            custom_filters: [],
        };

        $("#modalAdvancedSearch .advanced-filter-group").each(function (i, el) {
            let column = $(this).find(".column-select").val();
            let operator = $(this).find(".filter-type").val();
            let sort = $(this).find(".sort-order").val();
            let isBetween = operator === "isbetween" || operator === "notbetween";
            let value = null;

            if (column && operator) {
                let colType = columnTypeMap[column];

                if (colType == "date") {
                    if (isBetween) {
                        value =
                            $(el).find(".search-date1").val().trim() +
                            ", " +
                            $(el).find(".search-date2").val().trim();
                    } else {
                        value = $(el).find(".search-date").val().trim();
                    }
                } else if (colType == "number") {
                    if (isBetween) {
                        value =
                            $(el).find(".search-number1").val().trim() +
                            ", " +
                            $(el).find(".search-number2").val().trim();
                    } else {
                        value = $(el).find(".search-number").val().trim();
                    }
                } else {
                    value = $(el).find(".search-value").val().trim();
                }
            }

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
            url: "FinalApprove",
            method: "POST",
            data: requestData,
            success: function (response) {

            console.log("TYPE:", typeof response);
            console.log("RESPONSE:", response);

            let rows = response.data ?? response;

            if (!Array.isArray(rows)) {
                alert("Format response tidak valid");
                console.error("Response bukan array:", rows);
                return;
            }

            let dataToExport = rows.map((row) => {

            // =========================
            // STATUS BELI
            // =========================
            let statusBeliText =
                row.StatusBeli == 0
                    ? "Beli Sendiri"
                    : "Pengadaan Pembelian";

            // =========================
            // ACC MANAGER
            // =========================
            let accManager = "";

           if (row.StatusBeli == 0) {
                if (row.Direktur == null) {
                    accManager = "Belum ACC";
                } else {
                    accManager = "Sudah ACC";
                }
            } else if (row.StatusBeli == 1) {
                accManager = "Tidak Perlu ACC";
            }

            // =========================
            // ACC RUDY / YUDI (Direktur)
            // =========================
            let accRudy = "";

            if (row.StatusBeli == 0) {
                accRudy = "Tidak Perlu ACC";
            } else {
                accRudy = row.Direktur
                    ? "Sudah ACC"
                    : "Belum ACC";
            }

            // =========================
            // ACC TJAHYO (Direktur2)
            // =========================
            let accTjahyo = "";

            if (row.StatusBeli == 0) {
                accTjahyo = "Tidak Perlu ACC";
            } else {
                accTjahyo = row.Direktur2
                    ? "Sudah ACC"
                    : "Belum ACC";
            }

            return {
                "No Transaksi": row.No_trans ?? "",
                "Tanggal": row.Tgl_order
                    ? moment(row.Tgl_order).format("DD-MM-YYYY")
                    : "",
                "Nama Barang": row.NAMA_BRG ?? "",
                "Quantity": row.Qty ?? "",
                "Harga Satuan": row.PriceUnit ?? "",
                "Harga Total": row.PriceExt ?? "",
                "Divisi": row.Kd_div ?? "",
                "User": row.Nama ?? "",
                "Status Beli": statusBeliText,
                "ACC Manager": accManager,
                "ACC Rudy": accRudy,
                "ACC Tjahyo": accTjahyo,
            };
        });

            let ws = XLSX.utils.json_to_sheet(dataToExport);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "FinalApprove");
            XLSX.writeFile(wb, "FinalApprove.xlsx");
        },
        });
    });



    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
        if (customAccFilters.length === 0) {
            return true;
        }

        let row = table.row(dataIndex).data();

            if (customAccFilters.length > 0) {
            let match = false;

            for (let filter of customAccFilters) {
                if (filter.label === "ACC Manager") {
                    let cell = table.cell(dataIndex, 10).node();
                    let text = $(cell).text().trim();
                    if (text === filter.value) match = true;
                }

                if (filter.label === "ACC Rudy") {
                    let cell = table.cell(dataIndex, 11).node();
                    let text = $(cell).text().trim();
                    if (text === filter.value) match = true;
                }

                if (filter.label === "ACC Tjahyo") {
                    let cell = table.cell(dataIndex, 12).node();
                    let text = $(cell).text().trim();
                    if (text === filter.value) match = true;
                }
            }

            if (!match) return false;
        }

        if (maxFilteredRows !== null) {
            if (filteredCounter >= maxFilteredRows) {
                return false;
            }
            filteredCounter++;
        }

        return true;
    });


    if (btnShowBarang) {
        btnShowBarang.addEventListener("click", function () {

            let noTrans = selectedNoTrans;

            if (!noTrans) {
                Swal.fire({
                    icon: "warning",
                    title: "No Trans belum dipilih"
                });
                return;
            }

            dokPreview.style.display = "none";
            dokKeterangan.style.display = "none";
            dokPreview.src = "";

            let url = `/FinalApprove/getDokumentasi/${noTrans}`;
            let downloadUrl = `/FinalApprove/downloadDokumentasi/${noTrans}`;

            btnDownload.href = downloadUrl;

            fetch(url)
                .then(response => {

                    if (response.status === 204) {
                        dokKeterangan.innerHTML = "Tidak ada Dokumentasi";
                        dokKeterangan.style.display = "block";
                        btnDownload.style.display = "none";
                    }
                    else if (response.ok) {
                        dokPreview.src = url;
                        dokPreview.style.display = "block";
                        btnDownload.style.display = "inline-block";
                    }
                    else {
                        dokKeterangan.innerHTML = "Tidak ada Dokumentasi";
                        dokKeterangan.style.display = "block";
                        btnDownload.style.display = "none";
                    }
                })
                .catch(() => {
                    dokKeterangan.innerHTML = "Tidak ada Dokumentasi";
                    dokKeterangan.style.display = "block";
                    btnDownload.style.display = "none";
                });

            let modal = new bootstrap.Modal(document.getElementById("modalDokumentasi"));
            modal.show();
        });
    }

     if (btnDownloadAttachment) {

        btnDownloadAttachment.addEventListener("click", function () {

            if (!selectedNoTrans) {
                Swal.fire({
                    icon: "warning",
                    title: "No Trans belum dipilih"
                });
                return;
            }

            let checkUrl = `/FinalApprove/getDokumentasi/${selectedNoTrans}`;
            let downloadUrl = `/FinalApprove/downloadDokumentasi/${selectedNoTrans}`;

            // Cek dulu apakah file ada
            fetch(checkUrl)
                .then(response => {

                    if (response.status === 204 || !response.ok) {

                        Swal.fire({
                            icon: "warning",
                            title: "Dokumentasi tidak ada"
                        });

                        return;
                    }

                    // Kalau ada → langsung download
                    window.location.href = downloadUrl;
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal mengecek dokumentasi"
                    });
                });
        });
    }


    // Event ESC
    document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        var modalEl = document.getElementById('modalFinalApprove');
        var modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
        modal.hide();
        }
    }
    });

    // Event klik di luar modal
    document.addEventListener('click', function(event) {
    var modalEl = document.getElementById('modalFinalApprove');
    var modalDialog = modalEl.querySelector('.modal-dialog');

    if (modalEl.classList.contains('show') && !modalDialog.contains(event.target)) {
        var modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
        modal.hide();
        }
    }
    });




    //#endregion
});
