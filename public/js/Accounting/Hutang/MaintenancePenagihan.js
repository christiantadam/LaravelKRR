jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const enterEvent = new KeyboardEvent("keypress", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
    });
    const changeEvent = new Event("change", {
        bubbles: true,
    });
    let tanggal_penagihan = document.getElementById("tanggal_penagihan");
    let div_idPenagihan = document.getElementById("div_idPenagihan");
    let id_penagihan = document.getElementById("id_penagihan");
    let id_penagihanSupplier = document.getElementById("id_penagihanSupplier");
    let button_browseIdPenagihan = document.getElementById("button_browseIdPenagihan"); //prettier-ignore
    let nama_supplier = document.getElementById("nama_supplier");
    let id_supplier = document.getElementById("id_supplier");
    let button_browseSupplier = document.getElementById("button_browseSupplier"); //prettier-ignore
    let nama_mataUang = document.getElementById("nama_mataUang");
    let id_mataUang = document.getElementById("id_mataUang");
    let nilai_tagihan = document.getElementById("nilai_tagihan");
    let button_pembulatanBawahTagihan = document.getElementById("button_pembulatanBawahTagihan"); //prettier-ignore
    let button_pembulatanAtasTagihan = document.getElementById("button_pembulatanAtasTagihan"); //prettier-ignore
    let button_rupiahkanTagihan = document.getElementById("button_rupiahkanTagihan"); //prettier-ignore
    let nilai_akhir = document.getElementById("nilai_akhir");
    let button_nilaiAkhir = document.getElementById("button_nilaiAkhir");
    let button_keterangan = document.getElementById("button_keterangan");
    let table_detailSPPB = $("#table_detailSPPB").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        columnDefs: [
            {
                targets: 1,
                createdCell: function (td) {
                    $(td).css("white-space", "nowrap");
                },
            },
            // { targets: [6, 7, 8], visible: false },
        ],
    });
    let total_detailPenagihan = document.getElementById("total_detailPenagihan"); //prettier-ignore
    let button_isiDetailSPPB = document.getElementById("button_isiDetailSPPB");
    let button_koreksiDetailSPPB = document.getElementById("button_koreksiDetailSPPB"); //prettier-ignore
    let button_hapusDetailSPPB = document.getElementById("button_hapusDetailSPPB"); //prettier-ignore
    let table_detailFakturPajak = $("#table_detailFakturPajak").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        columnDefs: [{ targets: [5, 6], visible: false }],
    });
    let total_detailFakturPajak = document.getElementById("total_detailFakturPajak"); //prettier-ignore
    let button_isiDetailFakturPajak = document.getElementById("button_isiDetailFakturPajak"); //prettier-ignore
    let button_koreksiDetailFakturPajak = document.getElementById("button_koreksiDetailFakturPajak"); //prettier-ignore
    let button_hapusDetailFakturPajak = document.getElementById("button_hapusDetailFakturPajak"); //prettier-ignore
    let table_detailPIB = $("#table_detailPIB").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        // columnDefs: [[{ targets: [14], visible: false }]],
    });
    let button_isiDetailPIB = document.getElementById("button_isiDetailPIB");
    let button_koreksiDetailPIB = document.getElementById("button_koreksiDetailPIB",); //prettier-ignore
    let button_hapusDetailPIB = document.getElementById("button_hapusDetailPIB",); //prettier-ignore
    let button_isiPenagihan = document.getElementById("button_isiPenagihan");
    let button_koreksiPenagihan = document.getElementById("button_koreksiPenagihan"); //prettier-ignore
    let button_cancelPenagihan = document.getElementById("button_cancelPenagihan"); //prettier-ignore
    let button_cetakPenagihan = document.getElementById("button_cetakPenagihan"); //prettier-ignore
    let sppb_tableDataPenagihan = $("#sppb_tableDataPenagihan").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        // columnDefs: [{ targets: [20, 19, 18, 17, 16, 15, 14], visible: false }],
    });
    let sppb_tableDataSPPB = $("#sppb_tableDataSPPB").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        // columnDefs: [{ targets: [17, 18, 19], visible: false }],
    });
    let sppb_divisi = document.getElementById("sppb_divisi");
    let sppb_nomorSPPB = document.getElementById("sppb_nomorSPPB");
    let sppb_idPenagihan = document.getElementById("sppb_idPenagihan");
    let sppb_noBTTB = document.getElementById("sppb_noBTTB");
    let sppb_kodeBarang = document.getElementById("sppb_kodeBarang");
    let sppb_namaBarang = document.getElementById("sppb_namaBarang");
    let sppb_qtyTagihan = document.getElementById("sppb_qtyTagihan");
    let sppb_satuanQtyTagihan = $("#sppb_satuanQtyTagihan"); //prettier-ignore
    let sppb_mataUang = document.getElementById("sppb_mataUang");
    let sppb_kurs = document.getElementById("sppb_kurs");
    let sppb_idMataUang = document.getElementById("sppb_idMataUang");
    let sppb_discTagihan = document.getElementById("sppb_discTagihan");
    let sppb_ppnTagihan = document.getElementById("sppb_ppnTagihan");
    let sppb_hargaSatuan = document.getElementById("sppb_hargaSatuan");
    let sppb_hargaSatuanRupiah = document.getElementById("sppb_hargaSatuanRupiah"); //prettier-ignore
    let sppb_hargaMurni = document.getElementById("sppb_hargaMurni");
    let sppb_hargaMurniRupiah = document.getElementById("sppb_hargaMurniRupiah"); //prettier-ignore
    let sppb_hargaDisc = document.getElementById("sppb_hargaDisc");
    let sppb_hargaDiscRupiah = document.getElementById("sppb_hargaDiscRupiah");
    let sppb_hargaPPN = document.getElementById("sppb_hargaPPN");
    let sppb_hargaPPNRupiah = document.getElementById("sppb_hargaPPNRupiah");
    let sppb_hargaSubtotal = document.getElementById("sppb_hargaSubtotal");
    let sppb_hargaSubtotalRupiah = document.getElementById("sppb_hargaSubtotalRupiah"); //prettier-ignore
    let sppb_buttonIsi = document.getElementById("sppb_buttonIsi");
    let sppb_buttonKoreksi = document.getElementById("sppb_buttonKoreksi");
    let sppb_buttonHapus = document.getElementById("sppb_buttonHapus");
    let sppb_buttonSimpan = document.getElementById("sppb_buttonSimpan");
    let pajak_idDetail = document.getElementById("pajak_idDetail");
    let pajak_tanggalFaktur = document.getElementById("pajak_tanggalFaktur");
    let pajak_nomorFaktur = document.getElementById("pajak_nomorFaktur");
    let pajak_hargaMurni = document.getElementById("pajak_hargaMurni");
    let pajak_nilaiPajak = document.getElementById("pajak_nilaiPajak");
    let pajak_hargaPPN = document.getElementById("pajak_hargaPPN");
    let pajak_kursPajak = document.getElementById("pajak_kursPajak");
    let pajak_buttonSimpan = document.getElementById("pajak_buttonSimpan");
    let keterangan_id = document.getElementById("keterangan_id");
    let keterangan_text = document.getElementById("keterangan_text");
    let keterangan_nilai = document.getElementById("keterangan_nilai");
    let keterangan_buttonSimpan = document.getElementById("keterangan_buttonSimpan"); // prettier-ignore
    let pib_noPengajuan = document.getElementById("pib_noPengajuan");
    let pib_nilai = document.getElementById("pib_nilai");
    let pib_nomorPajak = document.getElementById("pib_nomorPajak");
    let pib_nomorKontrak = document.getElementById("pib_nomorKontrak");
    let pib_nomorInvoice = document.getElementById("pib_nomorInvoice");
    let pib_nomorSKBM = document.getElementById("pib_nomorSKBM");
    let pib_nomorSKPPH = document.getElementById("pib_nomorSKPPH");
    let pib_nomorSPPBBC = document.getElementById("pib_nomorSPPBBC");
    let pib_idDetail = document.getElementById("pib_idDetail");
    let pib_tanggalPIB = document.getElementById("pib_tanggalPIB");
    let pib_tanggalKontrak = document.getElementById("pib_tanggalKontrak");
    let pib_tanggalInvoice = document.getElementById("pib_tanggalInvoice");
    let pib_tanggalSKBM = document.getElementById("pib_tanggalSKBM");
    let pib_tanggalSKPPH = document.getElementById("pib_tanggalSKPPH");
    let pib_tanggalSPPBBC = document.getElementById("pib_tanggalSPPBBC");
    let pib_buttonSimpan = document.getElementById("pib_buttonSimpan");
    let modeForm;
    let modeModalTTSPPB;
    let selectedRowDataDetailSPPB;
    let selectedRowDataDetailFakturPajak;
    let selectedRowDataDetailPIB;
    let selectedRowDataSPPB;
    let selectedRowDataPenagihan;
    //#endregion

    //#region Load Form
    init("loadForm");
    initializeSelect2();
    getDataSatuan();
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

    function init(jenisInit) {
        if (jenisInit == "loadForm") {
            tanggal_penagihan.valueAsDate = new Date();
            tanggal_penagihan.readOnly = true;
            id_penagihanSupplier.readOnly = true;
            button_browseIdPenagihan.disabled = true;
            button_browseSupplier.disabled = true;
            button_pembulatanBawahTagihan.disabled = true;
            button_pembulatanAtasTagihan.disabled = true;
            button_rupiahkanTagihan.disabled = true;
            button_nilaiAkhir.disabled = true;
            button_keterangan.disabled = true;
            button_isiDetailSPPB.disabled = true;
            button_koreksiDetailSPPB.disabled = true;
            button_hapusDetailSPPB.disabled = true;
            button_isiDetailFakturPajak.disabled = true;
            button_koreksiDetailFakturPajak.disabled = true;
            button_hapusDetailFakturPajak.disabled = true;
            button_isiDetailPIB.disabled = true;
            button_koreksiDetailPIB.disabled = true;
            button_hapusDetailPIB.disabled = true;
            button_cancelPenagihan.style.display = "none";
            button_cetakPenagihan.style.display = "none";
            div_idPenagihan.style.display = "flex";
            button_browseIdPenagihan.style.display = "block";
            button_koreksiPenagihan.style.display = "block";
            button_koreksiPenagihan.disabled = false;
            button_isiPenagihan.style.display = "block";
            button_isiPenagihan.disabled = false;
            button_isiPenagihan.focus();
        } else if (jenisInit == "isiPenagihan") {
            tanggal_penagihan.readOnly = false;
            id_penagihanSupplier.readOnly = false;
            button_browseIdPenagihan.style.display = "none";
            button_koreksiPenagihan.style.display = "none";
            button_isiPenagihan.disabled = true;
            button_cancelPenagihan.style.display = "block";
            button_cetakPenagihan.style.display = "block";
            button_browseSupplier.disabled = false;
            button_browseIdPenagihan.disabled = true;
            button_pembulatanBawahTagihan.disabled = false;
            button_pembulatanAtasTagihan.disabled = false;
            button_rupiahkanTagihan.disabled = false;
            button_nilaiAkhir.disabled = false;
            button_keterangan.disabled = false;
            button_isiDetailSPPB.disabled = false;
            button_isiDetailFakturPajak.disabled = false;
            button_isiDetailPIB.disabled = false;
        } else if (jenisInit == "koreksiPenagihan") {
            tanggal_penagihan.readOnly = false;
            id_penagihanSupplier.readOnly = false;
            div_idPenagihan.style.display = "flex";
            button_browseIdPenagihan.style.display = "block";
            button_isiPenagihan.style.display = "none";
            button_koreksiPenagihan.disabled = true;
            button_cancelPenagihan.style.display = "block";
            button_cetakPenagihan.style.display = "block";
            button_browseSupplier.disabled = false;
            button_browseIdPenagihan.disabled = false;
            button_pembulatanBawahTagihan.disabled = false;
            button_pembulatanAtasTagihan.disabled = false;
            button_rupiahkanTagihan.disabled = false;
            button_nilaiAkhir.disabled = false;
            button_keterangan.disabled = false;
            button_isiDetailSPPB.disabled = false;
            button_isiDetailFakturPajak.disabled = false;
            button_isiDetailPIB.disabled = false;
        }
    }

    function clearAll() {
        tanggal_penagihan.valueAsDate = new Date();
        nama_supplier.value = "";
        id_supplier.value = "";
        id_penagihan.value = "";
        id_penagihanSupplier.value = "";
        nama_mataUang.value = "";
        id_mataUang.value = "";
        nilai_tagihan.value = "";
        nilai_akhir.value = "";
        table_detailSPPB.clear().draw();
        table_detailFakturPajak.clear().draw();
        table_detailPIB.clear().draw();
        total_detailPenagihan.value = "";
        total_detailFakturPajak.value = "";
        total_detailPIB.value = "";
    }

    function initializeSelect2() {
        sppb_satuanQtyTagihan.select2({
            dropdownParent: $("#sppb_select2ParentQtyTagihan"),
            placeholder: "Pilih Satuan",
        });
    }

    function getDataSatuan() {
        sppb_satuanQtyTagihan
            .data("select2")
            .options.set("placeholder", "Loading Satuan...");
        sppb_satuanQtyTagihan.empty().prop("disabled", true).trigger("change");

        $.ajax({
            url: "/MaintenancePenagihan/getSatuan",
            method: "GET",
            data: {
                _token: csrfToken,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Satuan failed ",
                        returnFocus: false,
                    });
                } else {
                    data.forEach(function (item) {
                        sppb_satuanQtyTagihan.append(
                            new Option( item.Nama_satuan.trim(), item.No_satuan.trim()), // prettier-ignore
                        );
                    });

                    sppb_satuanQtyTagihan
                        .data("select2")
                        .options.set("placeholder", "Pilih Satuan");
                    sppb_satuanQtyTagihan
                        .prop("disabled", false)
                        .val(null)
                        .trigger("change");

                    $("#sppb_satuanQtyTagihan").each(function () {
                        $(this).next(".select2-container").css({
                            flex: 0.1,
                        });
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Satuan.",
                });
            },
        });
    }

    function clearHeaderModalSPPB() {
        sppb_idPenagihan.value = "";
        sppb_divisi.value = "";
        sppb_nomorSPPB.value = "";
    }

    function clearBagianSPPBModalSPPB(jenisProses) {
        sppb_noBTTB.value = "";
        sppb_kodeBarang.value = "";
        sppb_namaBarang.value = "";
        if (jenisProses == "reloadTabelSPPB") {
            sppb_tableDataSPPB.clear().draw();
        }
    }

    function clearBagianPenagihanModalSPPB(jenisProses) {
        sppb_qtyTagihan.value = "";
        sppb_satuanQtyTagihan.val(null).trigger("change");
        sppb_mataUang.value = "";
        sppb_idMataUang.value = "";
        sppb_kurs.value = "";
        sppb_discTagihan.value = "";
        sppb_ppnTagihan.value = "";
        sppb_hargaSatuan.value = "";
        sppb_hargaSatuanRupiah.value = "";
        sppb_hargaMurni.value = "";
        sppb_hargaMurniRupiah.value = "";
        sppb_hargaDisc.value = "";
        sppb_hargaDiscRupiah.value = "";
        sppb_hargaPPN.value = "";
        sppb_hargaPPNRupiah.value = "";
        sppb_hargaSubtotal.value = "";
        sppb_hargaSubtotalRupiah.value = "";
        if (jenisProses == "reloadTabelSPPB") {
            sppb_tableDataPenagihan.clear().draw();
        }
    }

    function clearModalFakturPajak() {
        pajak_tanggalFaktur.valueAsDate = new Date();
        pajak_nomorFaktur.value = "";
        pajak_hargaMurni.value = "";
        pajak_nilaiPajak.value = "";
        pajak_hargaPPN.value = "";
        pajak_kursPajak.value = "";
    }

    function tampilHeader() {
        $.ajax({
            url: "/MaintenancePenagihan/getHeader",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data header penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    tanggal_penagihan.value = moment(
                        data[0].Waktu_Penagihan,
                    ).format("YYYY-MM-DD");
                    id_penagihanSupplier.value = data[0].id_inv_supp ?? "";
                    if (data[0].Status_PPN == "Y") {
                        tampilDetailPajak();
                    }
                    id_mataUang.value = data[0].Id_MataUang;
                    tampilDetailPIB();
                    nama_mataUang.value = data[0].Nama_MataUang;
                    nilai_tagihan.value = numeral(data[0].NilaiTagihan).format(
                        "0,0.00",
                    );
                    nilai_akhir.value = numeral(data[0].Nilai_Penagihan).format(
                        "0,0.00",
                    );
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load header penagihan.",
                });
            },
        });
    }

    function tampilDetailPO() {
        $.ajax({
            url: "/MaintenancePenagihan/getDetailPO",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data detail po failed ",
                        returnFocus: false,
                    });
                } else {
                    console.log(data);
                    table_detailSPPB.clear().draw();
                    let totalDetailPenagihan = 0;
                    data.forEach((item) => {
                        table_detailSPPB.row.add([
                            item.Id_Divisi,
                            item.No_PO ?? "",
                            item.Tgl_Faktur
                                ? moment(item.Tgl_Faktur).format("MM-DD-YYYY")
                                : "",
                            item.Faktur ?? "",
                            numeral(item.Hrg_Terbayar).format("0,0.0000"),
                            // item.No_SuratJalan ?? "",
                            // item.No_Terima,
                            // item.IdTerima,
                            // item.Id_Detail_PO,
                        ]);
                        totalDetailPenagihan += numeral(
                            item.Hrg_Terbayar,
                        ).value();
                    });
                    table_detailSPPB.draw();
                    total_detailPenagihan.value =
                        numeral(totalDetailPenagihan).format("0,0.0000");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load detail po.",
                });
            },
        });
    }

    function tampilDataPenagihan() {
        $.ajax({
            url: "/MaintenancePenagihan/getDataKoreksiSPPB",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: sppb_idPenagihan.value,
                noSPPB: sppb_nomorSPPB.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    console.log(data);
                    data.dataSPPB.forEach((item) => {
                        sppb_tableDataPenagihan.row.add([
                            item.No_Terima,
                            numeral(item.Hrg_Satuan_Tagih).format("0,0.00"),
                            numeral(item.Kurs_Tagih).format("0,0.0000"),
                            numeral(item.Disc_tagih).format("0,0.0000"),
                            numeral(item.Ppn_Tagih).format("0,0.0000"),
                            numeral(item.Hrg_Disc).format("0,0.0000"),
                            numeral(item.Hrg_Ppn).format("0,0.0000"),
                            numeral(item.Qty_Tagih).format("0,0.0000"),
                            item.Nama_satuan.trim(),
                            numeral(item.Hrg_Murni).format("0,0.0000"),
                            numeral(item.Hrg_Satuan_Rp).format("0,0.0000"),
                            numeral(item.Hrg_Murni_Rp).format("0,0.0000"),
                            numeral(item.Hrg_Disc_Rp).format("0,0.0000"),
                            numeral(item.Hrg_Ppn_Rp).format("0,0.0000"),
                            item.Kd_brg,
                            item.NAMA_BRG,
                            item.Nama_MataUang,
                            item.Id_MataUang,
                            item.Satuan_Tagih,
                            item.IdTerima,
                            sppb_nomorSPPB.value,
                            item.Id_Detail_PO,
                        ]);
                    });
                    sppb_tableDataPenagihan.draw();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Penagihan.",
                });
            },
        });
    }

    function tampilDetailPajak() {
        $.ajax({
            url: "/MaintenancePenagihan/getDetailPajak",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data detail pajak failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.length > 0) {
                        table_detailFakturPajak.clear().draw();
                        data.forEach((item) => {
                            table_detailFakturPajak.row.add([
                                item.Id_Detail_Faktur,
                                item.No_Faktur,
                                numeral(item.Nilai_Faktur).format("0,0.0000"),
                                numeral(item.Nilai_Pajak).format("0,0.00"),
                                numeral(item.Hrg_Ppn).format("0,0.0000"),
                                numeral(item.Kurs_Rupiah).format("0,0.0000"),
                                moment(item.TglPajak).format("MM-DD-YYYY"),
                            ]);
                        });
                        table_detailFakturPajak.draw();
                        total_detailFakturPajak.value = numeral(
                            data[0].TotalPajak,
                        ).format("0,0.0000");
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load detail pajak.",
                });
            },
        });
    }

    function tampilDetailPIB() {
        $.ajax({
            url: "/MaintenancePenagihan/getDetailPIB",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data detail PIB failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.length > 0) {
                        table_detailPIB.clear().draw();
                        console.log(data);
                        let totalNilaiPIB = 0;

                        data.forEach((item) => {
                            table_detailPIB.row.add([
                                item.No_Pengajuan,
                                numeral(item.Nilai_PIB).format("0,0.0000"),
                                item.No_Pajak,
                                moment(item.Tgl_PIB).format("YYYY-MM-DD"),
                                item.No_Kontrak,
                                moment(item.Tgl_Kontrak).format("YYYY-MM-DD"),
                                item.No_Invoice,
                                moment(item.Tgl_Invoice).format("YYYY-MM-DD"),
                                item.No_SKBM,
                                moment(item.Tgl_SKBM ?? new Date()).format(
                                    "YYYY-MM-DD",
                                ),
                                item.No_SKPPH,
                                moment(item.Tgl_SKPPH ?? new Date()).format(
                                    "YYYY-MM-DD",
                                ),
                                item.No_SPPB_BC,
                                moment(item.Tgl_SPPB_BC ?? new Date()).format(
                                    "YYYY-MM-DD",
                                ),
                                item.Id_PIB,
                            ]);
                            totalNilaiPIB += Number(item.Nilai_PIB || 0);
                        });
                        table_detailPIB.draw();
                        total_detailPIB.value =
                            numeral(totalNilaiPIB).format("0,0.0000");
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load detail PIB.",
                });
            },
        });
    }

    function hitungHargaPPN() {
        let pajak_hargaMurniValue = numeral(pajak_hargaMurni.value).value();
        pajak_hargaMurni.value = numeral(pajak_hargaMurniValue).format(
            "0,0.0000",
        );
        let pajak_nilaiPajakValue = numeral(pajak_nilaiPajak.value).value();
        if (pajak_nilaiPajakValue > 100) {
            pajak_nilaiPajakValue = 100;
        }
        pajak_nilaiPajak.value = numeral(pajak_nilaiPajakValue).format(
            "0,0.00",
        );
        pajak_hargaPPN.value = numeral(
            (pajak_hargaMurniValue * pajak_nilaiPajakValue) / 100,
        ).format("0,0.0000");
    }

    function hitungHargaSPPB() {
        //validate kurs and harga satuan
        sppb_kurs.value = numeral(numeral(sppb_kurs.value).value()).format(
            "0,0.0000",
        );
        sppb_hargaSatuan.value = numeral(
            numeral(sppb_hargaSatuan.value).value(),
        ).format("0,0.0000");

        let nilaiDiscount = numeral(sppb_discTagihan.value).value();
        let nilaiPPN = numeral(sppb_ppnTagihan.value).value();
        let qtyTagihan = numeral(sppb_qtyTagihan.value).value();
        let kurs = numeral(sppb_kurs.value).value();
        let hargaSatuan = numeral(sppb_hargaSatuan.value).value();
        let hargaMurni = hargaSatuan * qtyTagihan;
        let hargaDisc = (hargaMurni * nilaiDiscount) / 100;
        let hargaPPN = 0;
        if (nilaiPPN == 12) {
            hargaPPN =
                ((((hargaMurni - hargaDisc) * 11) / 12) * nilaiPPN) / 100;
        } else {
            hargaPPN = ((hargaMurni - hargaDisc) * nilaiPPN) / 100;
        }
        let hargaSubTotal = hargaMurni - hargaDisc + hargaPPN;

        sppb_hargaSatuanRupiah.value = numeral(hargaSatuan * kurs).format(
            "0,0.0000",
        );
        sppb_hargaMurni.value = numeral(hargaMurni).format("0,0.0000");
        sppb_hargaMurniRupiah.value = numeral(hargaMurni * kurs).format(
            "0,0.0000",
        );
        sppb_hargaDisc.value = numeral(hargaDisc).format("0,0.0000");
        sppb_hargaDiscRupiah.value = numeral(hargaDisc * kurs).format(
            "0,0.0000",
        );
        sppb_hargaPPN.value = numeral(hargaPPN).format("0,0.0000");
        sppb_hargaPPNRupiah.value = numeral(hargaPPN * kurs).format("0,0.0000");
        sppb_hargaSubtotal.value = numeral(hargaSubTotal).format("0,0.0000");
        sppb_hargaSubtotalRupiah.value = numeral(hargaSubTotal * kurs).format(
            "0,0.0000",
        );
    }

    function clearModalPIB() {
        pib_noPengajuan.value = "";
        pib_nilai.value = "";
        pib_nomorPajak.value = "";
        pib_nomorKontrak.value = "";
        pib_nomorInvoice.value = "";
        pib_nomorSKBM.value = "";
        pib_nomorSKPPH.value = "";
        pib_nomorSPPBBC.value = "";
        pib_tanggalPIB.valueAsDate = new Date();
        pib_tanggalKontrak.valueAsDate = new Date();
        pib_tanggalInvoice.valueAsDate = new Date();
        pib_tanggalSKBM.valueAsDate = new Date();
        pib_tanggalSKPPH.valueAsDate = new Date();
        pib_tanggalSPPBBC.valueAsDate = new Date();
    }

    // fungsi swal select pake arrow
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
    //#endregion

    //#region Event Listener
    tanggal_penagihan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_browseSupplier.focus();
        }
    });

    button_browseSupplier.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Supplier",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nama Supplier</th>
                            <th scope="col">Id Supplier</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "50%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [0, "asc"],
                            ajax: {
                                url: "MaintenancePenagihan/getDataSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NM_SUP" }, { data: "NO_SUP" }],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "70%",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    nama_supplier.value = result.value.NM_SUP.trim();
                    id_supplier.value = result.value.NO_SUP.trim();
                    if (modeForm == "isiPenagihan") {
                        id_penagihanSupplier.focus();
                    } else if (modeForm == "koreksiPenagihan") {
                        button_browseIdPenagihan.focus();
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    button_browseIdPenagihan.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Penagihan",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id Penagihan</th>
                            <th scope="col">Tgl. Penagihan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "50%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "desc"],
                            ajax: {
                                url: "MaintenancePenagihan/getDataPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idSupplier: id_supplier.value,
                                },
                            },
                            columns: [
                                { data: "Id_Penagihan" },
                                {
                                    data: "Waktu_Penagihan",
                                    render: function (data, type, full, meta) {
                                        return moment(data).format(
                                            "MM/DD/YYYY",
                                        );
                                    },
                                },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "70%",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    id_penagihan.value = result.value.Id_Penagihan;

                    $.ajax({
                        url: "/MaintenancePenagihan/cekReturDanDetail",
                        method: "GET",
                        data: {
                            _token: csrfToken,
                            idPenagihan: id_penagihan.value,
                        },
                        dataType: "json",
                        success: function (data) {
                            if (!data) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: "fetching data SPPB failed ",
                                    returnFocus: false,
                                });
                            } else {
                                if (data.error) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        showConfirmButton: false,
                                        html: data.error,
                                        returnFocus: false,
                                    });
                                    return;
                                }
                                tampilHeader();
                                tampilDetailPO();
                            }
                        },
                        error: function () {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data SPPB.",
                            });
                        },
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    id_penagihanSupplier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            button_isiDetailSPPB.focus();
        }
    });

    button_pembulatanBawahTagihan.addEventListener("click", function (e) {
        e.preventDefault();

        const nilai = parseFloat(numeral(nilai_tagihan.value).value());
        if (isNaN(nilai)) return;

        nilai_akhir.value = numeral(Math.floor(nilai)).format("0,0.00");
        button_nilaiAkhir.focus();
    });

    button_pembulatanAtasTagihan.addEventListener("click", function (e) {
        e.preventDefault();

        const nilai = parseFloat(numeral(nilai_tagihan.value).value());
        if (isNaN(nilai)) return;

        nilai_akhir.value = numeral(Math.ceil(nilai)).format("0,0.00");
        button_nilaiAkhir.focus();
    });

    button_rupiahkanTagihan.addEventListener("click", function (e) {
        Swal.fire({
            title: "Apakah yakin tagihan akan dirupiahkan?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: `Tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenancePenagihan",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        jenisProses: "rupiahkanTagihan",
                        idPenagihan: id_penagihan.value,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Rupiahkan tagihan failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (data.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: data.success,
                                    returnFocus: false,
                                });
                                nilai_akhir.value = numeral(
                                    data.rupiah[0].Harga_TerbayarRp,
                                ).format("0,0.00");
                            } else {
                                console.error(data);
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to rupiahkan tagihan.",
                        });
                    },
                });
            }
        });
    });

    button_nilaiAkhir.addEventListener("click", function (e) {
        // Disable immediately
        button_nilaiAkhir.disabled = true;

        // Re-enable after 5 seconds
        setTimeout(function () {
            button_nilaiAkhir.disabled = false;
        }, 3000);
        if (nilai_akhir.value == "" || nilai_akhir.value <= 0) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai akhir tidak sesuai format",
                returnFocus: false,
            });
            button_pembulatanBawahTagihan.focus();
            return;
        }
        $.ajax({
            url: "/MaintenancePenagihan",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: "inputPembulatanNilaiAkhir",
                nilaiPenagihan: numeral(nilai_akhir.value).value(),
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data Nilai Pembulatan failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        });
                        button_cetakPenagihan.focus();
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post Nilai Pembulatan.",
                });
            },
        });
    });

    button_keterangan.addEventListener("click", function (e) {
        if (id_penagihan.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input Detail Penagihan dulu",
                returnFocus: false,
            });
            button_browseIdPenagihan.focus();
            return;
        }

        $.ajax({
            url: "/MaintenancePenagihan/getDataKeteranganPenagihan",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Keterangan Penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.error) {
                        keterangan_text.value = "";
                        keterangan_nilai.value = "";
                        keterangan_id.value = "";
                    } else {
                        keterangan_id.value = data.dataKeterangan[0].Id_Detail;
                        keterangan_text.value =
                            data.dataKeterangan[0].Keterangan;
                        keterangan_nilai.value = numeral(
                            data.dataKeterangan[0].Nilai,
                        ).format("0,0.0000");
                    }
                    $("#modalTTKeterangan").modal("show");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load data Keterangan Penagihan.",
                });
            },
        });
    });

    $("#table_detailSPPB tbody").on("click", "tr", function () {
        selectedRowDataDetailSPPB = table_detailSPPB.row(this).data();
        if (!selectedRowDataDetailSPPB) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#table_detailSPPB tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        console.log(selectedRowDataDetailSPPB);
        button_koreksiDetailSPPB.disabled = false;
        button_hapusDetailSPPB.disabled = false;
    });

    button_isiDetailSPPB.addEventListener("click", function (e) {
        if (nama_supplier.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Supplier harus dipilih",
                returnFocus: false,
            });
            button_browseSupplier.focus();
            return;
        }
        $("#table_detailSPPB tbody tr").removeClass("selected");
        clearHeaderModalSPPB();
        selectedRowDataDetailSPPB = null;
        sppb_idPenagihan.value = id_penagihan.value ?? "";
        button_koreksiDetailSPPB.disabled = true;
        button_hapusDetailSPPB.disabled = true;
        modalLabelTTSPPB.innerHTML = "Tambah SPPB";
        modeModalTTSPPB = "tambahSPPB";
        $("#modalTTSPPB").modal("show");
    });

    button_koreksiDetailSPPB.addEventListener("click", function (e) {
        sppb_idPenagihan.value = id_penagihan.value;
        sppb_divisi.value = selectedRowDataDetailSPPB[0];
        sppb_nomorSPPB.value = selectedRowDataDetailSPPB[1];
        $("#table_detailSPPB tbody tr").removeClass("selected");
        selectedRowDataDetailSPPB = null;
        button_koreksiDetailSPPB.disabled = true;
        button_hapusDetailSPPB.disabled = true;
        modalLabelTTSPPB.innerHTML = "Koreksi SPPB";
        modeModalTTSPPB = "koreksiSPPB";
        $("#modalTTSPPB").modal("show");
    });

    button_hapusDetailSPPB.addEventListener("click", function (e) {
        sppb_idPenagihan.value = id_penagihan.value;
        sppb_divisi.value = selectedRowDataDetailSPPB[0];
        sppb_nomorSPPB.value = selectedRowDataDetailSPPB[1];
        $("#table_detailSPPB tbody tr").removeClass("selected");
        selectedRowDataDetailSPPB = null;
        button_koreksiDetailSPPB.disabled = true;
        button_hapusDetailSPPB.disabled = true;
        modalLabelTTSPPB.innerHTML = "Hapus SPPB";
        modeModalTTSPPB = "hapusSPPB";
        $("#modalTTSPPB").modal("show");
        // Swal.fire({
        //     title: "Apakah yakin menghapus data detail penagihan?",
        //     showDenyButton: true,
        //     confirmButtonText: "Ya",
        //     denyButtonText: `Tidak`,
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         $.ajax({
        //             url: "/MaintenancePenagihan",
        //             method: "POST",
        //             data: {
        //                 _token: csrfToken,
        //                 jenisProses: "deleteDataPenagihan",
        //                 idPenagihan: id_penagihan.value,
        //                 noBTTB: selectedRowDataDetailSPPB[6],
        //                 noTerima: selectedRowDataDetailSPPB[7],
        //                 idDetailPO: selectedRowDataDetailSPPB[8],
        //             },
        //             dataType: "json",
        //             success: function (data) {
        //                 if (!data) {
        //                     Swal.fire({
        //                         icon: "error",
        //                         title: "Error",
        //                         showConfirmButton: false,
        //                         timer: 1000,
        //                         text: "Delete data Penagihan failed ",
        //                         returnFocus: false,
        //                     });
        //                 } else {
        //                     if (data.success) {
        //                         Swal.fire({
        //                             icon: "success",
        //                             title: "Success",
        //                             showConfirmButton: false,
        //                             timer: 1000,
        //                             text: data.success,
        //                             returnFocus: false,
        //                         });
        //                         $("#table_detailSPPB tbody tr").removeClass(
        //                             "selected",
        //                         );
        //                         selectedRowDataDetailSPPB = null;
        //                         button_koreksiDetailSPPB.disabled = true;
        //                         button_hapusDetailSPPB.disabled = true;
        //                         tampilDetailPO();
        //                     } else {
        //                         console.error(data);
        //                     }
        //                 }
        //             },
        //             error: function () {
        //                 Swal.fire({
        //                     icon: "error",
        //                     title: "Error",
        //                     text: "Failed to Delete Penagihan.",
        //                 });
        //             },
        //         });
        //     }
        // });
    });

    $("#modalTTSPPB").on("shown.bs.modal", function (event) {
        clearBagianSPPBModalSPPB("reloadTabelSPPB");
        clearBagianPenagihanModalSPPB("reloadTabelSPPB");
        console.log(modeModalTTSPPB);
        if (modeModalTTSPPB == "koreksiSPPB") {
            sppb_nomorSPPB.readOnly = true;
            sppb_buttonSimpan.style.display = "none";
            sppb_buttonIsi.style.display = "none";
            sppb_buttonKoreksi.style.display = "inline-block";
            sppb_buttonHapus.style.display = "none";
            tampilDataPenagihan();
        } else if (modeModalTTSPPB == "tambahSPPB") {
            sppb_nomorSPPB.readOnly = false;
            sppb_buttonSimpan.style.display = "inline-block";
            sppb_buttonIsi.style.display = "inline-block";
            sppb_buttonKoreksi.style.display = "none";
            sppb_buttonHapus.style.display = "inline-block";
            sppb_nomorSPPB.focus();
        } else if ((modeModalTTSPPB = "hapusSPPB")) {
            sppb_buttonSimpan.style.display = "none";
            sppb_buttonIsi.style.display = "none";
            sppb_buttonKoreksi.style.display = "none";
            sppb_buttonHapus.style.display = "inline-block";
            sppb_nomorSPPB.readOnly = true;
            tampilDataPenagihan();
        }
    });

    $("#table_detailFakturPajak tbody").on("click", "tr", function () {
        selectedRowDataDetailFakturPajak = table_detailFakturPajak
            .row(this)
            .data();
        if (!selectedRowDataDetailFakturPajak) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#table_detailFakturPajak tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        button_koreksiDetailFakturPajak.disabled = false;
        button_hapusDetailFakturPajak.disabled = false;
        console.log(selectedRowDataDetailFakturPajak);
    });

    button_isiDetailFakturPajak.addEventListener("click", function (e) {
        if (id_penagihan.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input Detail Penagihan dulu",
                returnFocus: false,
            });
            button_isiDetailSPPB.focus();
            return;
        }
        pajak_idDetail.value = "";
        $("#table_detailFakturPajak tbody tr").removeClass("selected");
        selectedRowDataDetailFakturPajak = null;
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        $("#modalTTPajak").modal("show");
    });

    button_koreksiDetailFakturPajak.addEventListener("click", function (e) {
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        $("#table_detailFakturPajak tbody tr").removeClass("selected");
        $("#modalTTPajak").modal("show");
        pajak_idDetail.value = selectedRowDataDetailFakturPajak[0];
        pajak_tanggalFaktur.value = moment(
            selectedRowDataDetailFakturPajak[6],
        ).format("YYYY-MM-DD");
        pajak_nomorFaktur.value = selectedRowDataDetailFakturPajak[1];
        pajak_hargaMurni.value = numeral(
            selectedRowDataDetailFakturPajak[2],
        ).value();
        pajak_nilaiPajak.value = selectedRowDataDetailFakturPajak[3];
        pajak_hargaPPN.value = selectedRowDataDetailFakturPajak[4];
    });

    button_hapusDetailFakturPajak.addEventListener("click", function (e) {
        pajak_idDetail.value = selectedRowDataDetailFakturPajak[0];
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        // $("#modalTTPajak").modal("show");
        Swal.fire({
            title: "Apakah yakin menghapus data faktur pajak?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: `Tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenancePenagihan",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        jenisProses: "deleteDataPajak",
                        idDetailFakturPajak: pajak_idDetail.value,
                        idPenagihan: id_penagihan.value,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Delete data Faktur Pajak failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (data.success) {
                                $(
                                    "#table_detailFakturPajak tbody tr",
                                ).removeClass("selected");
                                selectedRowDataDetailFakturPajak = null;
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: data.success,
                                    returnFocus: false,
                                });
                                tampilDetailPajak();
                            } else {
                                console.error(data);
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to Delete Faktur Pajak.",
                        });
                    },
                });
            }
        });
    });

    $("#modalTTPajak").on("shown.bs.modal", function (event) {
        if (!pajak_idDetail.value) {
            clearModalFakturPajak();
        }
        pajak_tanggalFaktur.focus();
    });

    $("#table_detailPIB tbody").on("click", "tr", function () {
        selectedRowDataDetailPIB = table_detailPIB.row(this).data();
        if (!selectedRowDataDetailPIB) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#table_detailPIB tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        button_koreksiDetailPIB.disabled = false;
        button_hapusDetailPIB.disabled = false;
        console.log(selectedRowDataDetailPIB);
    });

    button_isiDetailPIB.addEventListener("click", function (e) {
        // if (id_penagihan.value == "") {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Error",
        //         showConfirmButton: false,
        //         timer: 1000,
        //         text: "Harus input Detail Penagihan dulu",
        //         returnFocus: false,
        //     });
        //     button_isiDetailSPPB.focus();
        //     return;
        // }
        // $("#table_detailPIB tbody tr").removeClass("selected");
        // selectedRowDataDetailPIB = null;
        pib_idDetail.value = "";
        button_koreksiDetailPIB.disabled = true;
        button_hapusDetailPIB.disabled = true;
        $("#modalTTPIB").modal("show");
    });

    button_koreksiDetailPIB.addEventListener("click", function (e) {
        button_koreksiDetailPIB.disabled = true;
        button_hapusDetailPIB.disabled = true;
        $("#table_detailPIB tbody tr").removeClass("selected");
        $("#modalTTPIB").modal("show");
        pib_noPengajuan.value = selectedRowDataDetailPIB[0];
        pib_nilai.value = numeral(selectedRowDataDetailPIB[1]).format("0,0.0000"); // prettier-ignore
        pib_nomorPajak.value = selectedRowDataDetailPIB[2];
        pib_nomorKontrak.value = selectedRowDataDetailPIB[4];
        pib_nomorInvoice.value = selectedRowDataDetailPIB[6];
        pib_nomorSKBM.value = selectedRowDataDetailPIB[8];
        pib_nomorSKPPH.value = selectedRowDataDetailPIB[10];
        pib_nomorSPPBBC.value = selectedRowDataDetailPIB[12];
        pib_idDetail.value = selectedRowDataDetailPIB[14];
        pib_tanggalPIB.value = moment(selectedRowDataDetailPIB[3]).format("YYYY-MM-DD"); //prettier-ignore
        pib_tanggalKontrak.value = moment(selectedRowDataDetailPIB[5]).format("YYYY-MM-DD"); //prettier-ignore
        pib_tanggalInvoice.value = moment(selectedRowDataDetailPIB[7]).format("YYYY-MM-DD"); //prettier-ignore
        pib_tanggalSKBM.value = moment(selectedRowDataDetailPIB[9]).format("YYYY-MM-DD"); //prettier-ignore
        pib_tanggalSKPPH.value = moment(selectedRowDataDetailPIB[11]).format("YYYY-MM-DD"); //prettier-ignore
        pib_tanggalSPPBBC.value = moment(selectedRowDataDetailPIB[13]).format("YYYY-MM-DD"); //prettier-ignore
    });

    button_hapusDetailPIB.addEventListener("click", function (e) {
        pib_idDetail.value = selectedRowDataDetailPIB[14];
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        Swal.fire({
            title: "Apakah yakin menghapus data PIB?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: `Tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenancePenagihan",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        jenisProses: "deleteDataPIB",
                        idDetailPIB: pib_idDetail.value,
                        idPenagihan: id_penagihan.value,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Delete data PIB failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (data.success) {
                                $("#table_detailPIB tbody tr").removeClass(
                                    "selected",
                                );
                                selectedRowDataDetailPIB = null;
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: data.success,
                                    returnFocus: false,
                                });
                                tampilDetailPIB();
                            } else {
                                console.error(data);
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to Delete PIB.",
                        });
                    },
                });
            }
        });
    });

    $("#modalTTPIB").on("shown.bs.modal", function (event) {
        if (!pib_idDetail.value) {
            clearModalPIB();
        }
        pajak_tanggalFaktur.focus();
    });

    button_isiPenagihan.addEventListener("click", function (e) {
        init("isiPenagihan");
        tanggal_penagihan.focus();
        modeForm = "isiPenagihan";
    });

    button_koreksiPenagihan.addEventListener("click", function (e) {
        init("koreksiPenagihan");
        button_browseSupplier.focus();
        modeForm = "koreksiPenagihan";
    });

    button_cancelPenagihan.addEventListener("click", function (e) {
        init("loadForm");
        clearAll();
        modeForm = "";
    });

    button_cetakPenagihan.addEventListener("click", function (e) {
        if (!id_penagihan.value) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Id Penagihan tidak boleh kosong",
                returnFocus: false,
            });
            return;
        }
        if (!nilai_akhir.value) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai Akhir tidak boleh kosong",
                returnFocus: false,
            });
            return;
        }
        let urlEncodedidPenagihan = encodeURIComponent(id_penagihan.value);
        let terbilang = convertNumberToWordsRupiah(
            numeral(nilai_akhir.value).value(),
        );

        window.open(
            `/MaintenancePenagihan/printTT?idPenagihan=` +
                urlEncodedidPenagihan +
                `&terbilang=` +
                terbilang,
            "Cetak TT " + id_penagihan.value,
        );
    });

    keterangan_text.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            keterangan_nilai.focus();
        }
    });

    keterangan_nilai.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = numeral(this.value).format("0,0.0000");
            keterangan_buttonSimpan.focus();
        }
    });

    keterangan_buttonSimpan.addEventListener("click", function (e) {
        if (keterangan_text.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input keterangan dulu",
                returnFocus: false,
            });
            keterangan_text.focus();
            return;
        }

        if (keterangan_nilai.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input nilai dulu",
                returnFocus: false,
            });
            keterangan_nilai.focus();
            return;
        }

        $.ajax({
            url: "/MaintenancePenagihan",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses:
                    keterangan_id.value == ""
                        ? "simpanKeteranganPenagihan"
                        : "updateKeteranganPenagihan",
                idPenagihan: id_penagihan.value,
                keteranganText: keterangan_text.value,
                keteranganNilai: numeral(keterangan_nilai.value).value(),
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data Keterangan Penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        });
                        $("#modalTTKeterangan").modal("hide");
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post Keterangan Penagihan.",
                });
            },
        });
    });

    sppb_nomorSPPB.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1000,
                    text: "Nomor SPPB harus diisi",
                    returnFocus: false,
                });
                return;
            }
            this.value = this.value.toUpperCase();
            const pattern = /^PO-\d{8}$/;

            if (!pattern.test(this.value)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Format Nomor SPPB harus PO-XXXXXXXX (8 digit angka)",
                    showConfirmButton: false,
                    timer: 1500,
                    returnFocus: false,
                });
                return;
            }
            clearBagianSPPBModalSPPB("reloadTabelSPPB");
            clearBagianPenagihanModalSPPB();

            $.ajax({
                url: "/MaintenancePenagihan/getDataSPPB",
                method: "GET",
                data: {
                    _token: csrfToken,
                    nomorSPPB: this.value,
                    idSupplier: id_supplier.value,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (!data || !data.dataSPPB) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: "fetching data SPPB failed ",
                            returnFocus: false,
                        });
                    } else {
                        if (data.info) {
                            Swal.fire({
                                icon: "info",
                                title: "Informasi",
                                showConfirmButton: false,
                                html: data.info,
                                returnFocus: false,
                            });
                            if (data.dataSPPB.length < 1) {
                                return;
                            }
                        }
                        sppb_divisi.value = data.dataDivisi;
                        sppb_mataUang.value = data.dataSPPB[0].Nama_MataUang.trim(); //prettier-ignore
                        sppb_idMataUang.value = data.dataSPPB[0].IdMataUang;

                        data.dataSPPB.forEach((item) => {
                            sppb_tableDataSPPB.row.add([
                                item.No_BTTB,
                                // "<" + item.Kd_brg + "> " + item.NAMA_BRG,
                                item.NAMA_BRG,
                                item.No_SuratJalan,
                                numeral(item.Qty_Terima).format("0,0.00"),
                                item.Nama_satuan.trim(),
                                item.Nama_MataUang.trim(),
                                numeral(item.Hrg_trm).format("0,0.0000"),
                                numeral(
                                    parseFloat(item.Hrg_trm) *
                                        parseFloat(item.Qty_Terima),
                                ).format("0,0.00"),
                                numeral(item.Kurs_Rp).format("0,0.00"),
                                numeral(item.hrg_disc).format("0,0.00"),
                                numeral(item.hrg_ppn).format("0,0.00"),
                                numeral(item.Harga_Terbayar).format("0,0.00"),
                                numeral(
                                    parseFloat(item.Harga_Terbayar) *
                                        parseFloat(item.Kurs_Rp),
                                ).format("0,0.00"),
                                moment(item.Datang).format("MM/DD/YYYY"),
                                item.Tgl_Faktur
                                    ? moment(item.Tgl_Faktur).format(
                                          "MM-DD-YYYY",
                                      )
                                    : "",
                                numeral(item.Disc_trm).format("0,0.00"),
                                numeral(item.Ppn_trm).format("0,0.00"),
                                item.Flag ?? "",
                                item.Kd_brg,
                                item.Sat_Terima,
                                item.No_terima,
                            ]);
                        });
                        sppb_tableDataSPPB.draw();
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load data SPPB.",
                    });
                },
            });
        }
    });

    $("#sppb_tableDataSPPB tbody").on("click", "tr", function () {
        // Get data from the clicked row
        if (modalLabelTTSPPB.innerHTML !== "Tambah SPPB") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Hanya bisa untuk Prose ISI DETAIL!",
                returnFocus: false,
            });
            return;
        }
        if (selectedRowDataPenagihan) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Selesaikan proses koreksi data penagihannya",
                returnFocus: false,
            });
        }
        selectedRowDataSPPB = sppb_tableDataSPPB.row(this).data();
        if (!selectedRowDataSPPB) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#sppb_tableDataSPPB tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        console.log(selectedRowDataSPPB);

        let rowIndex = -1;

        sppb_tableDataPenagihan
            .column(19)
            .data()
            .each(function (value, i) {
                if (value == selectedRowDataSPPB[20]) {
                    rowIndex = i + 1;
                }
            });

        if (rowIndex !== -1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                text:
                    "Data SPPB sudah ada di tabel tagihan baris ke " + rowIndex,
                returnFocus: false,
            }).then(() => {
                // Remove the 'selected' class from any previously selected row
                $("#sppb_tableDataSPPB tbody tr").removeClass("selected");
            });
            return;
        }

        sppb_noBTTB.value = selectedRowDataSPPB[0];
        sppb_kodeBarang.value = selectedRowDataSPPB[18];
        sppb_namaBarang.value = selectedRowDataSPPB[1];
        sppb_qtyTagihan.value = selectedRowDataSPPB[3];
        sppb_satuanQtyTagihan.val(selectedRowDataSPPB[19]).trigger("change");
        sppb_satuanQtyTagihan.prop("disabled", true).trigger("change");
        sppb_kurs.value = selectedRowDataSPPB[8];
        sppb_discTagihan.value = selectedRowDataSPPB[15];
        sppb_ppnTagihan.value = selectedRowDataSPPB[16];
        sppb_hargaSatuan.value = numeral(selectedRowDataSPPB[6]).format(
            "0,0.0000",
        );
        sppb_hargaMurni.value = numeral(selectedRowDataSPPB[7]).format(
            "0,0.0000",
        );

        sppb_hargaSatuanRupiah.value =
            numeral(sppb_kurs.value).value() == 0
                ? sppb_hargaSatuan.value
                : numeral(
                      numeral(sppb_hargaSatuan.value).value() *
                          numeral(sppb_kurs.value).value(),
                  ).format("0,0.0000");
        sppb_hargaMurniRupiah.value =
            numeral(sppb_kurs.value).value() == 0
                ? sppb_hargaMurni.value
                : numeral(
                      numeral(sppb_hargaMurni.value).value() *
                          numeral(sppb_kurs.value).value(),
                  ).format("0,0.0000");
        sppb_hargaDisc.value =
            numeral(sppb_discTagihan.value).value() == 0
                ? "0.0000"
                : numeral(selectedRowDataSPPB[9]).format("0,0.0000");

        sppb_hargaDiscRupiah.value =
            numeral(sppb_kurs.value).value() == 0
                ? sppb_hargaDisc.value
                : numeral(
                      numeral(sppb_hargaDisc.value).value() *
                          numeral(sppb_kurs.value).value(),
                  ).format("0,0.0000");
        sppb_hargaPPN.value =
            numeral(sppb_ppnTagihan.value).value() == 0
                ? "0.0000"
                : numeral(selectedRowDataSPPB[10]).format("0,0.0000");
        sppb_hargaPPNRupiah.value =
            numeral(sppb_kurs.value).value() == 0
                ? sppb_hargaPPN.value
                : numeral(
                      numeral(sppb_hargaPPN.value).value() *
                          numeral(sppb_kurs.value).value(),
                  ).format("0,0.0000");
        sppb_hargaSubtotal.value = numeral(
            numeral(sppb_hargaMurni.value).value() -
                numeral(sppb_hargaDisc.value).value() +
                numeral(sppb_hargaPPN.value).value(),
        ).format("0,0.0000");
        sppb_hargaSubtotalRupiah.value =
            numeral(sppb_kurs.value).value() == 0
                ? sppb_hargaSubtotal.value
                : numeral(
                      numeral(sppb_hargaSubtotal.value).value() *
                          numeral(sppb_kurs.value).value(),
                  ).format("0,0.0000");
        sppb_kurs.focus();
    });

    sppb_kurs.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungHargaSPPB();
            sppb_hargaSatuan.select();
        }
    });

    sppb_hargaSatuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungHargaSPPB();
            if (sppb_idPenagihan.value) {
                sppb_buttonKoreksi.focus();
            } else {
                sppb_buttonIsi.focus();
            }
        }
    });

    sppb_buttonIsi.addEventListener("click", function (e) {
        if (!selectedRowDataSPPB) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                text: "Pilih data pada tabel SPPB yang ingin dimasukan ke tabel Penagihan",
                returnFocus: false,
            });
            return;
        }
        sppb_tableDataPenagihan.row
            .add([
                sppb_noBTTB.value,
                sppb_hargaSatuan.value,
                sppb_kurs.value,
                sppb_discTagihan.value,
                sppb_ppnTagihan.value,
                sppb_hargaDisc.value,
                sppb_hargaPPN.value,
                sppb_qtyTagihan.value,
                sppb_satuanQtyTagihan.select2("data")[0].text,
                sppb_hargaMurni.value,
                sppb_hargaSatuanRupiah.value,
                sppb_hargaMurniRupiah.value,
                sppb_hargaDiscRupiah.value,
                sppb_hargaPPNRupiah.value,
                sppb_kodeBarang.value,
                sppb_namaBarang.value,
                sppb_mataUang.value,
                sppb_idMataUang.value,
                sppb_satuanQtyTagihan.val(),
                selectedRowDataSPPB[20],
                sppb_nomorSPPB.value,
                "",
            ])
            .draw();
        // Remove the 'selected' class from any previously selected row
        $("#sppb_tableDataSPPB tbody tr.selected")
            .removeClass("selected")
            .addClass("inserted");
        clearBagianSPPBModalSPPB("isiTabelDataPenagihan");
        clearBagianPenagihanModalSPPB("isiTabelDataPenagihan");
        selectedRowDataSPPB = null;
    });

    sppb_buttonKoreksi.addEventListener("click", function (e) {
        if (!selectedRowDataPenagihan) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Pilih data pada tabel Penagihan yang ingin dihapus dari tabel Penagihan",
                returnFocus: false,
            });
        }
        $.ajax({
            url: "/MaintenancePenagihan",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: "updateDataSPPB",
                idPenagihan: sppb_idPenagihan.value,
                NoBTTB: sppb_noBTTB.value,
                HrgSat: numeral(sppb_hargaSatuan.value).value(),
                Kurs: numeral(sppb_kurs.value).value(),
                Disc: numeral(sppb_discTagihan.value).value(),
                Ppn: numeral(sppb_ppnTagihan.value).value(),
                HrgDisc: numeral(sppb_hargaDisc.value).value(),
                HrgPpn: numeral(sppb_hargaPPN.value).value(),
                QtyTagih: numeral(sppb_qtyTagihan.value).value(),
                SatTagih: sppb_satuanQtyTagihan.val(),
                HrgMurni: numeral(sppb_hargaMurni.value).value(),
                HrgSatRp: numeral(sppb_hargaSatuanRupiah.value).value(),
                HrgMurniRp: numeral(sppb_hargaMurniRupiah.value).value(),
                HrgDiscRp: numeral(sppb_hargaDiscRupiah.value).value(),
                HrgPpnRp: numeral(sppb_hargaPPNRupiah.value).value(),
                NoTerima: selectedRowDataPenagihan[19],
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Koreksi data SPPB failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.error,
                            returnFocus: false,
                        });
                    } else if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        }).then(() => {
                            sppb_tableDataPenagihan
                                .row(".selected")
                                .data([
                                    sppb_noBTTB.value,
                                    sppb_hargaSatuan.value,
                                    sppb_kurs.value,
                                    sppb_discTagihan.value,
                                    sppb_ppnTagihan.value,
                                    sppb_hargaDisc.value,
                                    sppb_hargaPPN.value,
                                    sppb_qtyTagihan.value,
                                    sppb_satuanQtyTagihan.select2("data")[0]
                                        .text,
                                    sppb_hargaMurni.value,
                                    sppb_hargaSatuanRupiah.value,
                                    sppb_hargaMurniRupiah.value,
                                    sppb_hargaDiscRupiah.value,
                                    sppb_hargaPPNRupiah.value,
                                    sppb_kodeBarang.value,
                                    sppb_namaBarang.value,
                                    sppb_mataUang.value,
                                    sppb_idMataUang.value,
                                    sppb_satuanQtyTagihan.val(),
                                    selectedRowDataPenagihan[19],
                                    sppb_nomorSPPB.value,
                                    selectedRowDataPenagihan[21],
                                ])
                                .draw(false);

                            clearBagianSPPBModalSPPB("isiTabelDataPenagihan");
                            clearBagianPenagihanModalSPPB(
                                "isiTabelDataPenagihan",
                            );
                            tampilHeader();
                            tampilDetailPO();
                            $("#sppb_tableDataPenagihan tbody tr").removeClass(
                                "selected",
                            );
                            selectedRowDataPenagihan = null;
                        });
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to koreksi SPPB.",
                });
            },
        });
    });

    sppb_buttonHapus.addEventListener("click", function (e) {
        if (!selectedRowDataPenagihan) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Pilih data pada tabel Penagihan yang ingin dihapus dari tabel Penagihan",
                returnFocus: false,
            });
        }

        if (modeModalTTSPPB == "hapusSPPB") {
            $.ajax({
                url: "/MaintenancePenagihan",
                method: "POST",
                data: {
                    _token: csrfToken,
                    jenisProses: "deleteDataPenagihan",
                    idPenagihan: sppb_idPenagihan.value,
                    noBTTB: selectedRowDataPenagihan[0],
                    noTerima: selectedRowDataPenagihan[19],
                    idDetailPO: selectedRowDataPenagihan[21],
                },
                dataType: "json",
                success: function (data) {
                    if (!data) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: "Hapus data SPPB failed ",
                            returnFocus: false,
                        });
                    } else {
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: data.error,
                                returnFocus: false,
                            });
                        } else if (data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                showConfirmButton: false,
                                timer: 1000,
                                text: data.success,
                                returnFocus: false,
                            }).then(() => {
                                sppb_tableDataPenagihan
                                    .row(".selected")
                                    .remove()
                                    .draw(false);

                                clearBagianSPPBModalSPPB(
                                    "isiTabelDataPenagihan",
                                );
                                clearBagianPenagihanModalSPPB(
                                    "isiTabelDataPenagihan",
                                );
                                selectedRowDataPenagihan = null;
                                tampilHeader();
                                tampilDetailPO();
                                if (sppb_tableDataPenagihan.data().length < 1) {
                                    $("#modalTTSPPB").modal("hide");
                                }
                            });
                        }
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to Hapus SPPB.",
                    });
                },
            });
        }
    });

    $("#sppb_tableDataPenagihan tbody").on("click", "tr", function () {
        // Get data from the clicked row
        selectedRowDataPenagihan = sppb_tableDataPenagihan.row(this).data();
        if (!selectedRowDataPenagihan) {
            return;
        }
        if (selectedRowDataSPPB) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                text: "Selesaikan proses input data ke tabel penagihan",
                returnFocus: false,
            });
            selectedRowDataPenagihan = null;
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#sppb_tableDataPenagihan tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        console.log(selectedRowDataPenagihan);
        sppb_nomorSPPB.value = selectedRowDataPenagihan[20];
        sppb_noBTTB.value = selectedRowDataPenagihan[0];
        sppb_kodeBarang.value = selectedRowDataPenagihan[14];
        sppb_namaBarang.value = selectedRowDataPenagihan[15];
        sppb_qtyTagihan.value = selectedRowDataPenagihan[7];
        sppb_satuanQtyTagihan
            .val(selectedRowDataPenagihan[18])
            .trigger("change");
        sppb_mataUang.value = selectedRowDataPenagihan[16];
        sppb_kurs.value = selectedRowDataPenagihan[2];
        sppb_discTagihan.value = selectedRowDataPenagihan[3];
        sppb_ppnTagihan.value = selectedRowDataPenagihan[4];
        sppb_hargaSatuan.value = selectedRowDataPenagihan[1];
        sppb_hargaSatuanRupiah.value = selectedRowDataPenagihan[10];
        sppb_hargaMurni.value = selectedRowDataPenagihan[9];
        sppb_hargaMurniRupiah.value = selectedRowDataPenagihan[11];
        sppb_hargaDisc.value = selectedRowDataPenagihan[5];
        sppb_hargaDiscRupiah.value = selectedRowDataPenagihan[12];
        sppb_hargaPPN.value = selectedRowDataPenagihan[6];
        sppb_hargaPPNRupiah.value = selectedRowDataPenagihan[13];
        sppb_hargaSubtotal.value = numeral(
            numeral(selectedRowDataPenagihan[9]).value() -
                numeral(selectedRowDataPenagihan[5]).value() +
                numeral(selectedRowDataPenagihan[6]).value(),
        ).format("0,0.0000");
        sppb_hargaSubtotalRupiah.value = numeral(
            numeral(sppb_hargaSubtotal.value).value() *
                numeral(selectedRowDataPenagihan[2]).value(),
        ).format("0,0.0000");
        sppb_satuanQtyTagihan.prop("disabled", true).trigger("change");
    });

    sppb_buttonSimpan.addEventListener("click", function (e) {
        e.preventDefault();
        if (sppb_tableDataPenagihan.rows().data().toArray().length < 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Tidak ada data pada tabel penagihan",
                returnFocus: false,
            });
            button_browseSupplier.focus();
            return;
        }

        $.ajax({
            url: "/MaintenancePenagihan",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: "insertDataSPPB",
                idPenagihan: sppb_idPenagihan.value,
                idSupplier: id_supplier.value,
                idInvSupp: id_penagihanSupplier.value,
                tabelDataPenagihan: sppb_tableDataPenagihan
                    .rows()
                    .data()
                    .toArray(),
                idDivisi: sppb_divisi.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data SPPB failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.error,
                            returnFocus: false,
                        });
                    } else if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        }).then(() => {
                            $("#modalTTSPPB").modal("hide");
                            id_penagihan.value = data.idPenagihan;
                            tampilHeader();
                            tampilDetailPO();
                        });
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post SPPB.",
                });
            },
        });
    });

    pajak_tanggalFaktur.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pajak_nomorFaktur.focus();
        }
    });

    pajak_nomorFaktur.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pajak_hargaMurni.focus();
        }
    });

    pajak_hargaMurni.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hitungHargaPPN();
            pajak_nilaiPajak.select();
        }
    });

    pajak_nilaiPajak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hitungHargaPPN();
            pajak_hargaPPN.focus();
        }
    });

    pajak_hargaPPN.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            // pajak_kursPajak.focus();
            pajak_buttonSimpan.focus();
        }
    });

    pajak_kursPajak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = numeral(pajak_kursPajak.value).format("0,0.0000");
            pajak_buttonSimpan.focus();
        }
    });

    pajak_buttonSimpan.addEventListener("click", function (e) {
        if (pajak_hargaMurni.value < 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai faktur tidak boleh 0",
                returnFocus: false,
            });
            pajak_hargaMurni.focus();
            return;
        }
        $.ajax({
            url: "/MaintenancePenagihan",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: pajak_idDetail.value
                    ? "updateDataPajak"
                    : "insertDataPajak",
                idDetailFakturPajak: pajak_idDetail.value,
                tanggalFaktur: pajak_tanggalFaktur.value,
                nomorFaktur: pajak_nomorFaktur.value,
                hargaMurni: numeral(pajak_hargaMurni.value).value(),
                nilaiPajak: numeral(pajak_nilaiPajak.value).value(),
                hargaPPN: numeral(pajak_hargaPPN.value).value(),
                kursPajak: numeral(pajak_kursPajak.value).value(),
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data Faktur Pajak failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        }).then(() => {
                            $("#modalTTPajak").modal("hide");
                        });
                        tampilDetailPajak();
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post Faktur Pajak.",
                });
            },
        });
    });

    pib_noPengajuan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nilai.focus();
        }
    });

    pib_nilai.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nilai.value = numeral(this.value).format("0,0.0000");
            pib_nomorPajak.focus();
        }
    });

    pib_nomorPajak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_tanggalPIB.focus();
        }
    });

    pib_tanggalPIB.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nomorKontrak.focus();
        }
    });

    pib_nomorKontrak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_tanggalKontrak.focus();
        }
    });

    pib_tanggalKontrak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nomorInvoice.focus();
        }
    });

    pib_nomorInvoice.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_tanggalInvoice.focus();
        }
    });

    pib_tanggalInvoice.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nomorSKBM.focus();
        }
    });

    pib_nomorSKBM.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_tanggalSKBM.focus();
        }
    });

    pib_tanggalSKBM.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nomorSKPPH.focus();
        }
    });

    pib_nomorSKPPH.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_tanggalSKPPH.focus();
        }
    });

    pib_tanggalSKPPH.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_nomorSPPBBC.focus();
        }
    });

    pib_nomorSPPBBC.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_tanggalSPPBBC.focus();
        }
    });

    pib_tanggalSPPBBC.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            pib_buttonSimpan.focus();
        }
    });

    pib_buttonSimpan.addEventListener("click", function (e) {
        if (pib_nilai.value < 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai PIB tidak boleh 0",
                returnFocus: false,
            });
            pib_nilai.focus();
            return;
        }
        $.ajax({
            url: "/MaintenancePenagihan",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: pib_idDetail.value
                    ? "updateDataPIB"
                    : "insertDataPIB",
                idDetailPIB: pib_idDetail.value,
                nilaiPIB: numeral(pib_nilai.value).value(),
                noPengajuan: pib_noPengajuan.value,
                nomorPajak: pib_nomorPajak.value,
                tanggalPIB: pib_tanggalPIB.value,
                nomorKontrak: pib_nomorKontrak.value,
                tanggalKontrak: pib_tanggalKontrak.value,
                nomorInvoice: pib_nomorInvoice.value,
                tanggalInvoice: pib_tanggalInvoice.value,
                nomorSKBM: pib_nomorSKBM.value,
                tanggalSKBM: pib_tanggalSKBM.value,
                nomorSKPPH: pib_nomorSKPPH.value,
                tanggalSKPPH: pib_tanggalSKPPH.value,
                nomorSPPBBC: pib_nomorSPPBBC.value,
                tanggalSPPBBC: pib_tanggalSPPBBC.value,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data PIB failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        }).then(() => {
                            $("#modalTTPIB").modal("hide");
                        });
                        tampilDetailPIB();
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post PIB.",
                });
            },
        });
    });
    //#endregion
});
