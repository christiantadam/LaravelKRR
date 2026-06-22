jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore

    let table_SJ = $("#table_SJ").DataTable({
        processing: true,
        responsive: true,
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        order: [],
        columnDefs: [{ targets: 5, orderable: false }],
        ajax: {
            url: "/KirimSJ/getDataSJ",
            type: "GET",
            beforeSend: function () {
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                $("#loading-screen").css("display", "none");
            },
        },
        columns: [
            {
                data: "Tanggal",
                render: function (data, type, row) {
                    return moment(data).format("MM/DD/YYYY");
                },
            },
            { data: "IDPengiriman" },
            { data: "NamaCust" },
            { data: "IDSuratPesanan" },
            { data: "NO_PO" },
            { data: "NamaType" },
            {
                data: "QuantityDisplay",
                render: function (data) {
                    if (!data || data === "-") {
                        return "-";
                    }

                    let parts = data.split(" ");

                    let qty = parts[0];
                    let satuan = parts.slice(1).join(" ");

                    return `${qty} ${formatSatuan(satuan)}`;
                },
            },
            { data: "AlamatKirim" },
            { data: "NamaExpeditor" },
            { data: "TrukNopol" },
            {
                data: "Status",
                render: function (data) {
                    if (data === "Pasca Kirim") {
                        return `<span class="badge bg-warning">Pasca Kirim</span>`;
                    }
                    if (data === "Belum Approve") {
                        return `<span class="badge bg-info">Belum Approve</span>`;
                    }
                    return `<span class="badge bg-danger text-white">Belum Kirim</span>`;
                },
            },
            {
                data: "IDPengiriman",
                render: function (data, type, row) {
                    if (row.Status === "Pasca Kirim") {
                        return `
                            <button class="btn btn-verifikasi"
                                style="background:#fd7e14;color:white;border-color:#fd7e14;"
                                data-idpengiriman="${data}"
                                data-qtyjual="${row.QuantityDisplay}">
                                Verifikasi
                            </button>
                            <button class="btn btn-primary btn-unduh" data-idpengiriman="${data}">
                                Unduh File
                            </button>
                        `;
                    }

                    if (row.Status === "Belum Approve") {
                        return `
                            <button class="btn btn-warning btn-resendSJ"
                                    data-idpengiriman="${data}">
                                Resend Email
                            </button>
                        `;
                    }

                    if (row.IsTTDComplete == 0) {
                        return `
                            <button class="btn btn-secondary" disabled
                                    title="TTD Supir & Satpam belum lengkap">
                                Kirim SJ
                            </button>
                        `;
                    }

                    return `
                        <button class="btn btn-success btn-kirimSJ"
                                data-idpengiriman="${data}">
                            Kirim SJ
                        </button>
                    `;
                },
            },
        ],
    });
    //#endregion

    //#region Functions

    // loading screen for ajax request
    $.ajaxSetup({
        beforeSend: function () {
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            $("#loading-screen").css("display", "none");
        },
    });

    function formatSatuan(satuan) {
        let mapping = {
            TABUNG: "TABUNG",
            SET: "SET",
            KGM: "KILOGRAM",
            RP: "RP",
            BALL: "BALL",
            LBR: "LEMBAR",
            PC: "POTONG",
            YARDS: "YARD",
            "MTR²": "METER PERSEGI",
            ROLL: "ROLL",
            DRUM: "DRUM",
            LJR: "LONJOR",
            MTR: "METER",
            UNIT: "UNIT",
        };

        return mapping[satuan] || satuan;
    }

    //#endregion

    //#region Event Listeners
    $("#table_SJ").on("click", ".btn-kirimSJ", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");

        // CEGAH DOUBLE CLICK
        if ($btn.data("clicked")) return;
        $btn.data("clicked", true);

        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengirim SJ ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

            // lock UI swal
            allowOutsideClick: false,
            allowEscapeKey: false,

            showLoaderOnConfirm: true,

            preConfirm: () => {
                return $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "kirimSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                })
                    .then((response) => {
                        if (response.error) {
                            throw new Error(response.error);
                        }

                        return response;
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(
                            error.responseJSON?.error ||
                                error.message ||
                                "Terjadi kesalahan",
                        );

                        // reset klik kalau gagal
                        $btn.data("clicked", false);
                    });
            },
        }).then((result) => {
            if (!result.isConfirmed) {
                // kalau batal → reset
                $btn.data("clicked", false);
                return;
            }

            let response = result.value;

            Swal.fire("Berhasil!", response.success, "success").then(() => {
                table_SJ.ajax.reload();
            });
        });
    });

    $("#table_SJ").on("click", ".btn-resendSJ", function () {
        let idPengiriman = $(this).data("idpengiriman");

        Swal.fire({
            title: "Konfirmasi",
            text: "Kirim ulang email ke customer?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim ulang!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "resendSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire("Info", response.error, "info");
                        } else {
                            Swal.fire("Berhasil", response.success, "success");
                        }
                    },
                });
            }
        });
    });

    $("#table_SJ").on("click", ".btn-warningTTD", function () {
        Swal.fire({
            icon: "warning",
            title: "TTD Belum Lengkap",
            text: "Tanda tangan Supir dan Satpam belum lengkap.\nSilakan lakukan Pemeriksaan Barang terlebih dahulu.",
        });
    });

    $("#table_SJ").on("click", ".btn-verifikasi", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");
        let qtyjual = numeral($btn.data("qtyjual")).value();
        let maxQty = qtyjual * 2;
        let qtyTemp = 0;
        let dataSuratJalanTerkirim;
        let idDetailKirim;
        let idHeaderKirim;
        let satJual;
        let satPrimer;
        let satSekunder;
        let satTritier;
        let satuanTerpakai;
        let QtyPrimer;
        let QtySekunder;
        let QtyTritier;

        // CEGAH DOUBLE CLICK
        $btn.prop("disabled", true);
        setTimeout(() => {
            $btn.prop("disabled", false);
        }, 1000);

        $.ajax({
            url: "/KirimSJ/preparePasca",
            type: "GET",
            data: {
                idPengiriman: idPengiriman,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire("Info", response.error, "info");
                } else {
                    console.log(response);
                    dataSuratJalanTerkirim = response.dataSuratJalanTerkirim;
                    qtyTemp = numeral(dataSuratJalanTerkirim[0].QtyTemp).value(); //prettier-ignore
                    satJual = dataSuratJalanTerkirim[0].satJual.trim(); //prettier-ignore
                    satPrimer = dataSuratJalanTerkirim[0].satPrimer.trim(); //prettier-ignore
                    satSekunder = dataSuratJalanTerkirim[0].satSekunder.trim(); //prettier-ignore
                    satTritier = dataSuratJalanTerkirim[0].satTritier.trim(); //prettier-ignore
                    QtyPrimer = numeral(dataSuratJalanTerkirim[0].QtyPrimer).value(); //prettier-ignore
                    QtySekunder = numeral(dataSuratJalanTerkirim[0].QtySekunder).value(); //prettier-ignore
                    QtyTritier = numeral(dataSuratJalanTerkirim[0].QtyTritier).value(); //prettier-ignore
                    if (satJual == satPrimer) {
                        QtyPrimer = qtyTemp;
                        satuanTerpakai = "primer";
                    } else if (satJual == satSekunder) {
                        QtySekunder = qtyTemp;
                        satuanTerpakai = "sekunder";
                    } else {
                        QtyTritier = qtyTemp;
                        satuanTerpakai = "tritier";
                    }
                    idDetailKirim = response.idDetailKirim[0].IDDetailKirim;
                    idHeaderKirim = response.idDetailKirim[0].IDHeaderKirim;
                }
            },
        }).then((response) => {
            if (response.error) {
                Swal.fire("Info", response.error, "info");
            } else {
                Swal.fire({
                    title: "Silahkan input jumlah barang yang diterima customer",
                    html: `
                    <div class="row g-2 text-start w-100 pb-2 pl-2 m-0">
                        <div class="col-3 pl-2 pr-2">
                            <label class="form-label fw-bold">Primer</label>
                            <input id="qty1" type="number" class="form-control" value="${QtyPrimer}">
                        </div>

                        <div class="col-3 pl-2 pr-2">
                            <label class="form-label fw-bold">Sekunder</label>
                            <input id="qty2" type="number" class="form-control" value="${QtySekunder}">
                        </div>

                        <div class="col-3 pl-2 pr-2">
                            <label class="form-label fw-bold">Tritier</label>
                            <input id="qty3" type="number" class="form-control" value="${QtyTritier}">
                        </div>
                        <div class="col-3 pl-2 pr-2">
                            <label class="form-label fw-bold">Konversi</label>
                            <input id="qty4" type="number" class="form-control" value="${qtyTemp}">
                        </div>
                    </div>
                    <div class="row g-2 text-start w-100 pb-2 pl-2 m-0">
                        <div class="col-4 pl-2 pr-2">
                            <label class="form-label fw-bold">No. BTTB</label>
                            <input id="nobttb" type="text" class="form-control">
                        </div>
                        <div class="col-8 pl-2 pr-2">
                            <label class="form-label fw-bold">Alasan</label>
                            <input id="alasan" type="text" class="form-control">
                        </div>
                    </div>`,
                    showCancelButton: true,
                    confirmButtonText: "Submit",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    preConfirm: () => {
                        const qty1 =
                            numeral(
                                document.getElementById("qty1").value,
                            ).value() || 0;
                        const qty2 =
                            numeral(
                                document.getElementById("qty2").value,
                            ).value() || 0;
                        const qty3 =
                            numeral(
                                document.getElementById("qty3").value,
                            ).value() || 0;
                        const qty4 =
                            numeral(
                                document.getElementById("qty4").value,
                            ).value() || 0;
                        let nobttb = document
                            .getElementById("nobttb")
                            .value.trim();
                        let alasan = document
                            .getElementById("alasan")
                            .value.trim();

                        if (nobttb === "") {
                            Swal.showValidationMessage("No. BTTB harus diisi");
                            return false;
                        }

                        if (alasan === "") {
                            Swal.showValidationMessage("Alasan harus diisi");
                            return false;
                        }

                        if (qty4 > maxQty) {
                            Swal.showValidationMessage(
                                `Qty jual tidak boleh lebih dari ${maxQty}`,
                            );
                            return false;
                        }

                        if (satuanTerpakai == "primer") {
                            if (qty1 > maxQty) {
                                Swal.showValidationMessage(
                                    `Qty jual tidak boleh lebih dari ${maxQty}`,
                                );
                                return false;
                            }
                        } else if (satuanTerpakai == "sekunder") {
                            if (qty2 > maxQty) {
                                Swal.showValidationMessage(
                                    `Qty jual tidak boleh lebih dari ${maxQty}`,
                                );
                                return false;
                            }
                        } else {
                            if (qty3 > maxQty) {
                                Swal.showValidationMessage(
                                    `Qty jual tidak boleh lebih dari ${maxQty}`,
                                );
                                return false;
                            }
                        }

                        return {
                            qty1,
                            qty2,
                            qty3,
                            qty4,
                            nobttb,
                            alasan,
                        };
                    },
                }).then((result) => {
                    console.log(result, satuanTerpakai);
                    if (satuanTerpakai == "primer") {
                        qtyTemp = result.value.qty1;
                    } else if (satuanTerpakai == "sekunder") {
                        qtyTemp = result.value.qty2;
                    } else {
                        qtyTemp = result.value.qty3;
                    }
                    if (result.isConfirmed) {
                        console.log(qtyTemp, qtyjual);

                        if (qtyTemp > qtyjual) {
                            Swal.fire({
                                title: "Konfirmasi",
                                text: "Silahkan pilih proses pasca",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Pengembalian",
                                cancelButtonText: "Kekurangan/Kelebihan",
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "rgba(44, 192, 76, 0.87)",
                                // lock UI swal
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                            }).then((result) => {
                                $.ajax({
                                    url: "KirimSJ",
                                    type: "POST",
                                    data: {
                                        jenisProses: "pascaKirim",
                                        jenis_pasca: result.isConfirmed
                                            ? "Pengembalian"
                                            : "Kurang/Lebih",
                                        surat_jalan: idPengiriman,
                                        idDetailKirim: idDetailKirim,
                                        idHeaderKirim: idHeaderKirim,
                                        qty_primerDiterimaCustomer:
                                            result.value.qty1,
                                        qty_sekunderDiterimaCustomer:
                                            result.value.qty2,
                                        qty_tritierDiterimaCustomer:
                                            result.value.qty3,
                                        qty_konversiDiterimaCustomer:
                                            result.value.qty4,
                                        nobttb: result.value.nobttb,
                                        alasan: result.value.alasan,
                                        _token: csrfToken,
                                    },
                                })
                                    .then((response) => {
                                        if (response.error) {
                                            throw new Error(response.error);
                                        }
                                    })
                                    .catch((error) => {
                                        Swal.showValidationMessage(
                                            error.responseJSON?.error ||
                                                error.message ||
                                                "Terjadi kesalahan",
                                        );
                                    });
                            });
                        } else {
                            $.ajax({
                                url: "KirimSJ",
                                type: "POST",
                                data: {
                                    jenisProses: "pascaKirim",
                                    jenis_pasca: "Kurang/Lebih",
                                    surat_jalan: idPengiriman,
                                    idDetailKirim: idDetailKirim,
                                    idHeaderKirim: idHeaderKirim,
                                    qty_primerDiterimaCustomer:
                                        result.value.qty1,
                                    qty_sekunderDiterimaCustomer:
                                        result.value.qty2,
                                    qty_tritierDiterimaCustomer:
                                        result.value.qty3,
                                    qty_konversiDiterimaCustomer:
                                        result.value.qty4,
                                    nobttb: result.value.nobttb,
                                    alasan: result.value.alasan,
                                    _token: csrfToken,
                                },
                            })
                                .then((response) => {
                                    if (response.error) {
                                        throw new Error(response.error);
                                    }
                                })
                                .catch((error) => {
                                    Swal.showValidationMessage(
                                        error.responseJSON?.error ||
                                            error.message ||
                                            "Terjadi kesalahan",
                                    );
                                });
                        }
                    }
                });
            }
        });
    });

    $("#table_SJ").on("click", ".btn-unduh", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");

        // CEGAH DOUBLE CLICK
        $btn.prop("disabled", true);
        setTimeout(() => {
            $btn.prop("disabled", false);
        }, 1000);

        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengunduh file attachment untuk SJ ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, unduh!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

            // lock UI swal
            allowOutsideClick: false,
            allowEscapeKey: false,

            showLoaderOnConfirm: true,

            preConfirm: () => {
                return $.ajax({
                    url: "KirimSJ/UnduhAttachment",
                    type: "GET",
                    data: {
                        idPengiriman: idPengiriman,
                    },
                    xhrFields: {
                        responseType: "blob",
                    },
                }).then((blob, status, xhr) => {
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "Attachment SJ " + idPengiriman + ".zip";

                    document.body.appendChild(a);
                    a.click();

                    a.remove();
                    window.URL.revokeObjectURL(url);

                    return {
                        success: "File berhasil diunduh",
                    };
                });
            },
        }).then((result) => {
            if (!result.isConfirmed) {
                // kalau batal → reset
                $btn.data("clicked", false);
                return;
            }

            let response = result.value;

            Swal.fire("Berhasil!", response.success, "success").then(() => {
                table_SJ.ajax.reload();
            });
        });
    });
    //#endregion
});
