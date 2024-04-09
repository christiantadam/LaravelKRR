$(function () {
    $("body").on("click", "#NoTrans", function (e) {
        e.preventDefault();
        document.getElementById("judul_ListOrder").innerHTML =
            "No Trans " + $(this).data("id");
        $.ajax({
            url:
                window.location.origin +
                "/ListOrder/" +
                $(this).data("id") +
                "/show",
            type: "get",
            success: function (data) {
                console.log(data)
                document.getElementById("KategoriUtama_ListOrder").innerHTML =
                    "Kategori Utama: " + (data[0].nama || "");
                document.getElementById("Kategori_ListOrder").innerHTML =
                    "Kategori: " + (data[0].nama_kategori || "");
                document.getElementById("SubKategori_ListOrder").innerHTML =
                    "Sub Kategori: " + (data[0].nama_sub_kategori || "");
                document.getElementById("NamaBarang_ListOrder").innerHTML =
                    "Kategori: " +
                    "<text class='material-symbols-outlined' style='font-size:20px' id='iconKategoriBarang'>expand_more</text>";
                document.getElementById("Pemesan_ListOrder").innerHTML =
                    "Pemesan: " + (data[0].Pemesan || "-");
                document.getElementById("Status_ListOrder").innerHTML =
                    "Status: " + (data[0].StatusBeli || "-");
                document.getElementById("TglButuh_ListOrder").innerHTML =
                    "Tgl. Dibutuhkan: " + (data[0].Tgl_Dibutuhkan || "-");
                document.getElementById("KetBarang_ListOrder").innerHTML =
                    "Ket. Barang: " + (data[0].ket || "-");
                document.getElementById("KetOrder_ListOrder").innerHTML =
                    "Ket. Order: " + (data[0].keterangan || "-");
                document.getElementById("KetInternal_ListOrder").innerHTML =
                    "Ket. Internal: " + (data[0].Ket_Internal || "-");
                document.getElementById("AccManager_ListOrder").innerHTML =
                    "Acc Manager: " +
                    (data[0].tgl_acc || "-") +
                    " ; by : " +
                    (data[0].MgrBy || "-");
                document.getElementById("Offered_ListOrder").innerHTML =
                    "Offered: " +
                    (data[0].Tgl_PBL_Acc || "-") +
                    " ; by : " +
                    (data[0].OfferBy || "-");
                document.getElementById("AccDireksi_ListOrder").innerHTML =
                    "Acc Direksi: " +
                    (data[0].tgl_direktur || "-") +
                    " ; by : " +
                    (data[0].FinalBy || "-");
                document.getElementById("CreatePO_ListOrder").innerHTML =
                    "Create PO: " +
                    (data[0].Tgl_sppb || "-") +
                    " ; by : " +
                    (data[0].CreatePOBy || "-") +
                    " ; No. PO : " +
                    (data[0].NO_PO || "-");
                document.getElementById("Currency_ListOrder").innerHTML =
                    "Currency: " + (data[0].Mt_Uang || "-");
                document.getElementById("UnitPrice_ListOrder").innerHTML =
                    "Unit Price: " + (data[0].Harga_unit || "-");
                document.getElementById("Discount_ListOrder").innerHTML =
                    "Discount: " + (data[0].harga_disc || "-");
                document.getElementById("PPN_ListOrder").innerHTML =
                    "PPN: " + (data[0].PPN || "-");
                document.getElementById("TotalPrice_ListOrder").innerHTML =
                    "Total Price: " +
                    (data[0].PriceExt || "-") +
                    "<text class='material-symbols-outlined' style='font-size:20px' id='iconHarga'>expand_more</text>";
                document.getElementById("ReceiveBTTB_ListOrder").innerHTML =
                    "Receive BTTB: " +
                    (data[0].Cek_BTTB || "-") +
                    " ; by : " +
                    (data[0].BTTBBy || "-") +
                    " ; No. BTTB : " +
                    (data[0].No_BTTB || "-");
                document.getElementById(
                    "TransferInventory_ListOrder"
                ).innerHTML =
                    "Transfer Inventory: " +
                    (data[0].TglTransfer || "-") +
                    " ; No. Transfer : " +
                    (data[0].NoTransfer || "-");
                if (data[0].StatusOrder == 6) {
                    document.getElementById("StatusOrder_ListOrder").innerHTML =
                        "Order dibatalkan oleh divisi Pembelian : " +
                        (data[0].RejectBy || "-").trim() +
                        "; Tanggal :" +
                        (data[0].Tgl_batal_Acc || "-") +
                        " ; Alasan batal : " +
                        (data[0].Ket_Reject || "-");
                } else if (data[0].StatusOrder == 12) {
                    document.getElementById("StatusOrder_ListOrder").innerHTML =
                        "Order dibatalkan oleh divisi Pembelian : " +
                        (data[0].CancelBy || "-").trim() +
                        "; Tanggal :" +
                        (data[0].Tgl_batal_sppb || "-") +
                        " ; Alasan batal : " +
                        (data[0].Ket_Reject || "-");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
            complete: function () {
                $("#loading_ListOrder").hide();
                $("#DivDetailData_ListOrder").show();
            },
        });

        $("#loading_ListOrder").show();
        $("#DivDetailData_ListOrder").hide();
        $("#modalDetail_ListOrder").modal({
            backdrop: "static",
            keyboard: false,
        });
        $("body.modal-open").removeAttr("style");
    });
});

$(function () {
    let datas;
    $(".Filter").change(function () {
        let ValDivisi = document.getElementById("divisi").value;
        let ValTglAwal = document.getElementById("tglAwal").value;
        let ValTglAkhir = document.getElementById("tglAkhir").value;
        let ValMe = document.getElementById("Me").checked;
        // console.log(ValDivisi+'|'+ValTglAwal+'|'+ValTglAkhir+'|'+ValMe);

        $.ajax({
            url:
                window.location.origin +
                "/ListOrder/" +
                ValDivisi +
                "/" +
                ValTglAwal +
                "/" +
                ValTglAkhir +
                "/" +
                ValMe +
                "/Filter",
            type: "get",
            data: "_token = <?php echo csrf_token() ?>", // Remember that you need to have your csrf token included
            success: function (data) {
                console.log(data);
                datas = data.data;
                let table = $("#table_ListOrder").DataTable();
                table.clear().draw();
                //   console.log(data.data.length);
                for (let i = 0; i < data.data.length; i++) {
                    table.row
                        .add([
                            "<a class='Detail_ListOrder' id='NoTrans' data-id='" +
                                data.data[i].No_trans +
                                "' href=''>" +
                                data.data[i].No_trans +
                                "</a>",
                            $.format.date(data.data[i].Tgl_order, "MM-dd-yyyy"),
                            data.data[i].NAMA_BRG +
                                "<label style='background-color:#00ff00;''> " +
                                data.data[i].Qty +
                                data.data[i].Nama_satuan +
                                "</label>",
                            data.data[i].Status,
                            data.data[i].Nama,
                            data.data[i].Kd_div,
                        ])
                        .draw();
                }
                //   console.log('yay');
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
        });
        $("#table_ListOrder")
            .DataTable()
            .on("click", "tbody tr", (e) => {
                const classList = e.currentTarget.classList;

                if (classList.contains("selected")) {
                    console.log(datas);
                    const NoTrans = $(e.currentTarget)
                        .find(".Detail_ListOrder")
                        .data("id");
                    const cariData = datas.filter(
                        (data) => data.No_trans.trim() === NoTrans.trim()
                    );
                    if (cariData[0].StatusOrder == 0) {
                        let status = "r";
                        if (cariData[0].kd_user == 1001) {
                            status = "u";
                        }
                        const url =
                            "/MaintenanceOrderPembelian" +
                            "?d=" +
                            NoTrans +
                            "&s=" +
                            status;
                        window.location.href = url;
                    }
                } else {
                    $("#table_ListOrder")
                        .DataTable()
                        .rows(".selected")
                        .nodes()
                        .each((row) => row.classList.remove("selected"));
                    classList.add("selected");
                }
            });
    });
});
