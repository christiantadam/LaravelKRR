jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let namaUser = document.getElementById("namaUser");
    let kd_divPengadaanPembelian = [
        "BKL",
        "CL ",
        "CLD",
        "CLM",
        "BKR",
        "BRD",
        "NDL",
        "RBL",
    ];
    let table = $("#table_Approve").DataTable({
        processing: true,
        responsive: true,
        serverSide: true,
        order: [[2, "desc"]], // index 2 = kolom Tanggal
        ajax: {
            url: "/FinalApprove/getAllSPPB",
            type: "GET",
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
            { data: "No_trans" },
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
                    if (data == "0") {
                        return "Beli Sendiri";
                    } else {
                        return "Pengadaan Pembelian";
                    }
                },
            },
            {
                data: "Direktur",
                render: function (data, type, full, meta) {
                    if (data == null) {
                        return '<span class="badge bg-danger">Belum ACC</span>';
                    } else if (data) {
                        return '<span class="badge bg-success">Sudah ACC</span>';
                    }
                },
            },
            {
                data: "Direktur2",
                render: function (data, type, full, meta) {
                    if (data == null && full.StatusBeli == 0) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
                    } else if (
                        data == null &&
                        full.StatusBeli == 1 &&
                        kd_divPengadaanPembelian.includes(full.Kd_div)
                    ) {
                        return '<span class="badge bg-danger">Belum ACC</span>';
                    } else if (
                        data == null &&
                        full.StatusBeli == 1 &&
                        !kd_divPengadaanPembelian.includes(full.Kd_div)
                    ) {
                        return '<span class="badge bg-warning">Tidak Perlu ACC</span>';
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
        ],
        rowCallback: function (row, data) {
            let checked = listChecked.some((x) => x.No_trans === data.No_trans);

            if (checked) {
                $(row).find(".checkboxNoTrans").prop("checked", true);
            }
        },
    });

    let listChecked = [];
    let isCheckAll = false;
    const filterFinalApprove = $("#filterFinalApprove");
    //#endregion

    //#region Load Form
    initializeSelect2();
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
    }
    //#endregion

    //#region Event Listener

    filterFinalApprove.on("select2:select", function () {
        selectedFilter = $(this).val(); // Get selected Filter

        if (selectedFilter === "ALL") {
            // reset filter
            table.column(6).search("").draw();
        } else {
            // filter berdasarkan StatusBeli
            table
                .column(6)
                .search("^" + selectedFilter + "$", true, false)
                .draw();
        }
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

    $(document).on("click", ".btn_approve", function (e) {
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
            text: "Data ini akan diproses sebagai Final Approve. Lanjutkan?",
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
    //#endregion
});
