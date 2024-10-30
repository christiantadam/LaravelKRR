$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_prosesMB = document.getElementById("btn_prosesMB");
    let btn_bankM = document.getElementById("btn_bankM");
    let btn_koreksiDetail = document.getElementById("btn_koreksiDetail");
    let btn_tampilBKM = document.getElementById("btn_tampilBKM");
    let radioDetailPelunasan = document.getElementById("radioDetailPelunasan");
    let radioDetailBiaya = document.getElementById("radioDetailBiaya");
    let radioDetailKurangLebih = document.getElementById(
        "radioDetailKurangLebih"
    );
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let idPelunasanM = document.getElementById("idPelunasanM");
    let tanggalInputM = document.getElementById("tanggalInputM");
    let tanggalTagihM = document.getElementById("tanggalTagihM");
    let jenisBayarM = document.getElementById("jenisBayarM");
    let idBankM = document.getElementById("idBankM");
    let namaBankM = document.getElementById("namaBankM");
    let jenisMB = document.getElementById("jenisMB");
    let mataUangM = document.getElementById("mataUangM");
    let nilaiPeluansanM = document.getElementById("nilaiPeluansanM");
    let noBuktiM = document.getElementById("noBuktiM");
    let tutupModalB = document.getElementById("tutupModalB");
    let id_penagihanMP = document.getElementById("id_penagihanMP");
    let id_pelunasanMP = document.getElementById("id_pelunasanMP");
    let namaCustomer_MP = document.getElementById("namaCustomer_MP");
    let nilai_pelunasanMP = document.getElementById("nilai_pelunasanMP");
    let pelunasanRupiah_MP = document.getElementById("pelunasanRupiah_MP");
    let id_perkiraanMP = document.getElementById("id_perkiraanMP");
    let ket_perkiraanMP = document.getElementById("ket_perkiraanMP");
    let btn_perkiraanMP = document.getElementById("btn_perkiraanMP");
    let btn_prosesMP = document.getElementById("btn_prosesMP");
    let tutup_modalMP = document.getElementById("tutup_modalMP");
    let jumlahBiaya_MBia = document.getElementById("jumlahBiaya_MBia");
    let id_detailMBia = document.getElementById("id_detailMBia");
    let id_perkiraanMBia = document.getElementById("id_perkiraanMBia");
    let ket_perkiraanMBia = document.getElementById("ket_perkiraanMBia");
    let btn_perkiraanMBia = document.getElementById("btn_perkiraanMBia");
    let keterangan_MBia = document.getElementById("keterangan_MBia");
    let btn_prosesMBia = document.getElementById("btn_prosesMBia");
    let tutup_modalB = document.getElementById("tutup_modalB");
    let jumlahUang_MK = document.getElementById("jumlahUang_MK");
    let id_detailMK = document.getElementById("id_detailMK");
    let id_perkiraanMK = document.getElementById("id_perkiraanMK");
    let ket_perkiraanMK = document.getElementById("ket_perkiraanMK");
    let btn_perkiraanMK = document.getElementById("btn_perkiraanMK");
    let keterangan_MK = document.getElementById("keterangan_MK");
    let btn_prosesMK = document.getElementById("btn_prosesMK");
    let tutup_modalMK = document.getElementById("tutup_modalMK");
    let tgl_awalbkk = document.getElementById("tgl_awalbkk");
    let tgl_akhirbkk = document.getElementById("tgl_akhirbkk");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let bkm = document.getElementById("bkm");
    let terbilang = document.getElementById("terbilang");
    let id_matauang = document.getElementById("id_matauang");
    let btn_cetakbkm = document.getElementById("btn_cetakbkm");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
    });
    let table_detailPelunasan = $("#table_detailPelunasan").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_detailBiaya = $("#table_detailBiaya").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_kurangLebih = $("#table_kurangLebih").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_tampilBKM = $("#table_tampilBKM").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let radio;

    bulan.focus();
    tanggalInputM.valueAsDate = new Date();
    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();

    bulan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tahun.focus();
        }
    });

    tahun.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_ok.focus();
        }
    });

    btn_cetakbkm.addEventListener("click", async function (event) {
        event.preventDefault();

        $.ajax({
            url: "MaintenanceBKMPenagihan/cetakBKM",
            type: "GET",
            data: {
                _token: csrfToken,
                bkm: bkm.value,
                Nilai_Pelunasan: numeral(rowDataBKM.Nilai_Pelunasan).format(
                    "0.00"
                ),
            },
            success: function (data) {
                console.log(data);

                let totalBiaya = 0;
                let totalKurangLebih = 0;
                data.data.forEach(function (item) {
                    const biaya = parseFloat(item.Biaya);
                    const kurangLebih = parseFloat(item.KurangLebih);

                    // Accumulate totals
                    totalBiaya += biaya;
                    totalKurangLebih += kurangLebih;
                });

                let SymbolHTML = "";
                data.data.forEach(function (item) {
                    let resultSymbol = ""; // Default value

                    if (
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalBiaya) > 0) ||
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalKurangLebih) !== 0)
                    ) {
                        resultSymbol = "(+)";
                    } else if (
                        item.ID_Penagihan === null &&
                        parseFloat(item.Biaya) !== 0
                    ) {
                        resultSymbol = "(-)";
                    } else if (
                        item.ID_Penagihan === null &&
                        parseFloat(item.KurangLebih) > 0
                    ) {
                        resultSymbol = "(+)";
                    } else if (
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalBiaya) === 0) ||
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalKurangLebih) === 0)
                    ) {
                        resultSymbol = "";
                    }
                    SymbolHTML += resultSymbol + "<br>";
                    // console.log(
                    //     `Item ID_BKM: ${item.Id_BKM}, Symbol: ${resultSymbol}`
                    // );
                });

                document.getElementById("symbolP").innerHTML = SymbolHTML;
                // if (data[0] == 8) {
                //     document.getElementById("name_p").innerHTML =
                //         data.data[0].Id_Bank;
                //     document.getElementById("matauang_p").innerHTML =
                //         "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                //     let tanggalInput = data.data[0].Tgl_Input;
                //     let tanggal = new Date(tanggalInput);
                //     let options = {
                //         day: "2-digit",
                //         month: "short",
                //         year: "numeric",
                //     };
                //     let formattedDate = tanggal
                //         .toLocaleDateString("en-GB", options)
                //         .replace(" ", "-")
                //         .replace(" ", "-");
                //     document.getElementById("tanggal_p").innerHTML =
                //         formattedDate;
                //     document.getElementById("voucher_p").innerHTML =
                //         data.data[0].Id_BKK;
                //     document.getElementById("description_p").innerHTML =
                //         data.data[0].Nama_Bank;
                //     document.getElementById("paid_p").innerHTML =
                //         data.data[0].NM_SUP;
                //     //Tbody Array
                //     let kodePerkiraanHTML = "";
                //     data.data.forEach(function (item) {
                //         kodePerkiraanHTML += item.Kode_Perkiraan + "<br>";
                //     });
                //     document.getElementById("coa_p").innerHTML =
                //         kodePerkiraanHTML;

                //     let KeteranganHTML = "";
                //     data.data.forEach(function (item) {
                //         KeteranganHTML += item.Keterangan + "<br>";
                //     });
                //     document.getElementById("acc_p").innerHTML = KeteranganHTML;

                //     let Rincian_BayarHTML = "";
                //     data.data.forEach(function (item) {
                //         Rincian_BayarHTML += item.Rincian_Bayar + "<br>";
                //     });
                //     document.getElementById("desc_p").innerHTML =
                //         Rincian_BayarHTML;

                //     let No_BGCekHTML = "";
                //     data.data.forEach(function (item) {
                //         No_BGCekHTML +=
                //             item.Id_Penagihan + "<br>" ?? "" + "<br>";
                //     });
                //     document.getElementById("bgno_p").innerHTML = No_BGCekHTML;

                //     let Nilai_RincianHTML = "";
                //     let totalNilaiRincian = 0; // Variabel untuk menyimpan total nilai

                //     data.data.forEach(function (item) {
                //         let nilaiRincian = parseFloat(item.Nilai_Rincian);
                //         let formattedValue = nilaiRincian.toLocaleString(
                //             "en-US",
                //             {
                //                 minimumFractionDigits: 2,
                //                 maximumFractionDigits: 2,
                //             }
                //         );

                //         Nilai_RincianHTML += formattedValue + "<br>";
                //         totalNilaiRincian += nilaiRincian; // Tambahkan nilai ke total
                //     });

                //     document.getElementById("amount_p").innerHTML =
                //         Nilai_RincianHTML;

                //     // Format total dan tampilkan di element dengan id "total_p"
                //     document.getElementById("total_p").innerHTML =
                //         totalNilaiRincian.toLocaleString("en-US", {
                //             minimumFractionDigits: 2,
                //             maximumFractionDigits: 2,
                //         });

                //     document.getElementById("alasan_p").innerHTML =
                //         data.data[0].Alasan;

                //     document.getElementById("batal_p").innerHTML =
                //         data.data[0].Batal;

                //     window.print();
                // } else if (data[0] == 2) {
                //     document.getElementById("nobg_p").innerHTML = "Invoice No.";
                //     document.getElementById("matauang_p").innerHTML =
                //         "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                //     document.getElementById("name_p").innerHTML =
                //         data.data[0].Id_Bank;
                //     let tanggalInput = data.data[0].Tgl_Input;
                //     let tanggal = new Date(tanggalInput);
                //     let options = {
                //         day: "2-digit",
                //         month: "short",
                //         year: "numeric",
                //     };
                //     let formattedDate = tanggal
                //         .toLocaleDateString("en-GB", options)
                //         .replace(" ", "-")
                //         .replace(" ", "-");
                //     document.getElementById("tanggal_p").innerHTML =
                //         formattedDate;
                //     document.getElementById("voucher_p").innerHTML =
                //         data.data[0].Id_BKK;
                //     document.getElementById("description_p").innerHTML =
                //         data.data[0].Nama_Bank;
                //     document.getElementById("paid_p").innerHTML =
                //         data.data[0].NM_SUP;
                //     //Tbody Array
                //     let kodePerkiraanHTML = "";
                //     data.data.forEach(function (item) {
                //         kodePerkiraanHTML += item.Kode_Perkiraan + "<br>";
                //     });
                //     document.getElementById("coa_p").innerHTML =
                //         kodePerkiraanHTML;

                //     let KeteranganHTML = "";
                //     data.data.forEach(function (item) {
                //         KeteranganHTML += item.Keterangan + "<br>";
                //     });
                //     document.getElementById("acc_p").innerHTML = KeteranganHTML;

                //     let Rincian_BayarHTML = "";
                //     data.data.forEach(function (item) {
                //         Rincian_BayarHTML += item.Rincian_Bayar + "<br>";
                //     });
                //     document.getElementById("desc_p").innerHTML =
                //         Rincian_BayarHTML;

                //     let Id_PenagihanHTML = "";
                //     data.data.forEach(function (item) {
                //         Id_PenagihanHTML +=
                //             item.Id_Penagihan + "<br>" ?? "" + "<br>";
                //     });
                //     document.getElementById("bgno_p").innerHTML =
                //         Id_PenagihanHTML;

                //     let Nilai_RincianHTML = "";
                //     let totalNilaiRincian = 0;

                //     data.data.forEach(function (item) {
                //         let nilaiRincian = parseFloat(item.Nilai_Rincian);
                //         let formattedValue = nilaiRincian.toLocaleString(
                //             "en-US",
                //             {
                //                 minimumFractionDigits: 2,
                //                 maximumFractionDigits: 2,
                //             }
                //         );

                //         Nilai_RincianHTML += formattedValue + "<br>";
                //         totalNilaiRincian += nilaiRincian; // Tambahkan nilai ke total
                //     });

                //     document.getElementById("amount_p").innerHTML =
                //         Nilai_RincianHTML;

                //     // Format total dan tampilkan di element dengan id "total_p"
                //     document.getElementById("total_p").innerHTML =
                //         totalNilaiRincian.toLocaleString("en-US", {
                //             minimumFractionDigits: 2,
                //             maximumFractionDigits: 2,
                //         });

                //     document.getElementById("alasan_p").innerHTML =
                //         data.data[0].Alasan;

                //     document.getElementById("batal_p").innerHTML =
                //         data.data[0].Batal;

                // window.print();
                // } else {

                //#region 666

                // document.getElementById("nomerP").innerHTML =
                //     data.data[0].Id_BKM;
                // // Assume data.data[0].Tgl_Input is in the format "2012-01-02 00:00:00.000"
                // const rawDate = data.data[0].Tgl_Input.split(" ")[0]; // Extract the date part

                // // Create a Date object from the raw date
                // const dateObject = new Date(rawDate);

                // // Format the date using Flatpickr's formatDate utility
                // const formattedDate = flatpickr.formatDate(dateObject, "j/F/Y"); // "2/January/2012"

                // // Set the formatted date to the element
                // document.getElementById("tanggal_atasP").innerHTML =
                //     formattedDate;

                // // Get the current date
                // const currentDate = new Date();

                // // Format the current date using Flatpickr's formatDate function
                // const formattedDate1 = flatpickr.formatDate(
                //     currentDate,
                //     "d/F/Y"
                // ); // "13/September/2024"

                // // Set the formatted date to the element with the additional text "Sidoarjo, "
                // document.getElementById(
                //     "tanggal_bawahP"
                // ).innerHTML = `Sidoarjo, ${formattedDate1}`;

                // document.getElementById("rp_atasP").innerHTML =
                //     data.data[0].Symbol;

                // document.getElementById("rp_totalP").innerHTML =
                //     data.data[0].Symbol;

                // // Ensure the value is converted to a float first to remove extra zeros
                // const nilaiPelunasan = parseFloat(data.data[0].Nilai_Pelunasan);

                // // Format the number to two decimal places
                // document.getElementById("jumlah_diterimaP").innerHTML =
                //     nilaiPelunasan.toLocaleString("en-US", {
                //         minimumFractionDigits: 2,
                //         maximumFractionDigits: 2,
                //     });

                // document.getElementById("terbilangP").innerHTML =
                //     data.data[0].Terjemahan;

                // // document.getElementById("voucher_p").innerHTML =
                // //     data.data[0].Id_BKM;
                // // document.getElementById("description_p").innerHTML =
                // //     data.data[0].Nama_Bank;
                // // document.getElementById("received_p").innerHTML =
                // //     data.data[0].Keterangan || "";
                // //Tbody Array
                // let kodePerkiraanHTML = "";
                // data.data.forEach(function (item) {
                //     kodePerkiraanHTML += item.KodePerkiraan + "<br>";
                // });
                // document.getElementById("kode_perkiraanP").innerHTML =
                //     kodePerkiraanHTML;

                // let KeteranganHTML = "";
                // data.data.forEach(function (item) {
                //     KeteranganHTML += item.NamaCust + "<br>";
                // });
                // document.getElementById("rincianP").innerHTML = KeteranganHTML;

                // // let Rincian_BayarHTML = "";
                // // data.data.forEach(function (item) {
                // //     Rincian_BayarHTML += item.Keterangan + "<br>";
                // // });
                // // document.getElementById("desc_p").innerHTML = "";

                // // let No_BGCekHTML = "";
                // // data.data.forEach(function (item) {
                // //     No_BGCekHTML +=
                // //         item.Id_Penagihan + "<br>" ?? "" + "<br>";
                // // });
                // // document.getElementById("bgno_p").innerHTML = No_BGCekHTML;

                // let Nilai_RincianHTML = "";
                // let totalNilaiRincian = 0; // Variabel untuk menyimpan total nilai

                // data.data.forEach(function (item) {
                //     let nilaiRincian = parseFloat(item.Nilai_Rincian);
                //     let formattedValue = nilaiRincian.toLocaleString("en-US", {
                //         minimumFractionDigits: 2,
                //         maximumFractionDigits: 2,
                //     });

                //     Nilai_RincianHTML += formattedValue + "<br>";
                //     totalNilaiRincian += nilaiRincian; // Tambahkan nilai ke total
                // });

                // document.getElementById("jumlahP").innerHTML =
                //     Nilai_RincianHTML;

                // // Format total dan tampilkan di element dengan id "total_p"
                // document.getElementById("grandP").innerHTML =
                //     totalNilaiRincian.toLocaleString("en-US", {
                //         minimumFractionDigits: 2,
                //         maximumFractionDigits: 2,
                //     });

                // //#endregion Asli
                // // document.getElementById("alasan_p").innerHTML =
                // //     data.data[0].Alasan;

                // // document.getElementById("batal_p").innerHTML =
                // //     data.data[0].Batal;

                window.print();
                // // }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    radioDetailPelunasan.addEventListener("click", function (event) {
        radio = 1;
    });

    radioDetailBiaya.addEventListener("click", function (event) {
        radio = 2;
    });

    radioDetailKurangLebih.addEventListener("click", function (event) {
        radio = 3;
    });

    btn_koreksiDetail.addEventListener("click", async function (event) {
        event.preventDefault();

        if (radio == 1) {
            if (rowDataPelunasan !== null && rowDataPelunasan !== undefined) {
                console.log(rowDataPelunasan);

                id_penagihanMP.value = rowDataPelunasan.ID_Penagihan;
                id_pelunasanMP.value = rowDataArray[0][1];
                namaCustomer_MP.value = rowDataPelunasan.NamaCust;
                nilai_pelunasanMP.value = rowDataPelunasan.Nilai_Pelunasan;
                pelunasanRupiah_MP.value = rowDataPelunasan.Pelunasan_Rupiah;
                id_perkiraanMP.value = rowDataPelunasan.Kode_Perkiraan;

                if (id_perkiraanMP.value !== "") {
                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getPerkiraanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_perkiraanMP: id_perkiraanMP.value,
                        },
                        success: function (data) {
                            console.log(data);
                            ket_perkiraanMP.value = data.Keterangan;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailPelunasan"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailPelunasan")
                    .addEventListener("shown.bs.modal", function () {
                        btn_perkiraanMP.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail pelunasan !",
                    showConfirmButton: false,
                });
            }
        } else if (radio == 2) {
            if (rowDataBiaya !== null && rowDataBiaya !== undefined) {
                console.log(rowDataBiaya);

                jumlahBiaya_MBia.value = rowDataBiaya.Biaya;
                id_detailMBia.value = rowDataBiaya.Id_Detail_Pelunasan;
                id_perkiraanMBia.value = rowDataBiaya.Kode_Perkiraan;
                keterangan_MBia.value = rowDataBiaya.Keterangan;

                if (id_perkiraanMBia.value !== "") {
                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getPerkiraanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_perkiraanMP: id_perkiraanMBia.value,
                        },
                        success: function (data) {
                            console.log(data);
                            ket_perkiraanMBia.value = data.Keterangan;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailBiaya"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailBiaya")
                    .addEventListener("shown.bs.modal", function () {
                        btn_perkiraanMBia.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail biaya !",
                    showConfirmButton: false,
                });
            }
        } else if (radio == 3) {
            if (rowDataKrgLbh !== null && rowDataKrgLbh !== undefined) {
                console.log(rowDataKrgLbh);

                jumlahUang_MK.value = rowDataKrgLbh.KurangLebih;
                id_detailMK.value = rowDataKrgLbh.Id_Detail_Pelunasan;
                id_perkiraanMK.value = rowDataKrgLbh.Kode_Perkiraan;
                keterangan_MK.value = rowDataKrgLbh.Keterangan;

                if (id_perkiraanMK.value !== "") {
                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getPerkiraanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_perkiraanMP: id_perkiraanMK.value,
                        },
                        success: function (data) {
                            console.log(data);
                            ket_perkiraanMK.value = data.Keterangan;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailKurangLebih"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailKurangLebih")
                    .addEventListener("shown.bs.modal", function () {
                        btn_perkiraanMK.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail kurang/lebih !",
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih detail dahulu !",
                showConfirmButton: false,
            });
        }
    });
    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        table_tampilBKM = $("#table_tampilBKM").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            // scrollX: true,
            // width: "150%",
            ajax: {
                url: "MaintenanceBKMPenagihan/getBKMTagih",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalbkk: tgl_awalbkk.value,
                        tgl_akhirbkk: tgl_akhirbkk.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxBKM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            // paging: false,
            scrollY: "400px",
            // scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });

    btn_tampilBKM.addEventListener("click", async function (event) {
        event.preventDefault();

        table_tampilBKM = $("#table_tampilBKM").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            // scrollX: true,
            // width: "150%",
            ajax: {
                url: "MaintenanceBKMPenagihan/getBKMTagih",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxBKM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            // paging: false,
            scrollY: "400px",
            // scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });

        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKMModal"),
            {
                keyboard: false,
            }
        );

        // document
        //     .getElementById("dataBKMModal")
        //     .addEventListener("shown.bs.modal", function () {
        //         btn_perkiraanMK.focus();
        //     });

        myModal.show();
    });

    btn_prosesMP.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceBKMPenagihan/updateDetailPelunasan",
            type: "GET",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: rowDataPelunasan.ID_Detail_Pelunasan,
                id_perkiraanMP: id_perkiraanMP.value,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        tutup_modalMP.click();
                        rowDataPelunasan = null;
                        $("#table_detailPelunasan").DataTable().ajax.reload();
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMBia.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceBKMPenagihan/updateDetailBiaya",
            type: "GET",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: id_detailMBia.value,
                keterangan_MBia: keterangan_MBia.value,
                id_perkiraanMBia: id_perkiraanMBia.value,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        tutup_modalB.click();
                        rowDataBiaya = null;
                        $("#table_detailBiaya").DataTable().ajax.reload();
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMK.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceBKMPenagihan/updateDetailKrgLbh",
            type: "GET",
            data: {
                _token: csrfToken,
                id_detailMK: id_detailMK.value,
                keterangan_MK: keterangan_MK.value,
                id_perkiraanMK: id_perkiraanMK.value,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        tutup_modalMK.click();
                        rowDataKrgLbh = null;
                        $("#table_kurangLebih").DataTable().ajax.reload();
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMB.addEventListener("click", async function (event) {
        event.preventDefault();
        rowDataPertama[2] = idBankM.value;
        // Function to convert Y-m-d to m/d/Y
        function formatDateToMDY(dateString) {
            const [year, month, day] = dateString.split("-");
            return `${month}/${day}/${year}`;
        }

        // When assigning the formatted date to rowDataPertama
        rowDataPertama[7] = formatDateToMDY(tanggalInputM.value);
        // table_kiri.draw(false);
        if ($.fn.DataTable.isDataTable("#table_atas")) {
            var table_atas = $("#table_atas").DataTable();
            let selectedRow = table_atas.row(
                $('input[name="penerimaCheckbox"]:checked').closest("tr")
            );
            selectedRow.data(rowDataPertama).draw();
            rowDataArray = [];
        }
        tutupModalB.click();
        // document.activeElement.blur();
    });

    btn_pilihBank.addEventListener("click", async function (event) {
        event.preventDefault();
        let tglTgh = [];
        let tglMax = null;

        if (rowDataArray !== null && rowDataArray.length == 1) {
            for (let i = 0; i < rowDataArray.length; i++) {
                let tanggalStr = rowDataArray[i][0];
                let match = tanggalStr.match(/value="([^"]+)"/);

                if (match) {
                    // Misalnya kita asumsikan format adalah "mm/dd/yyyy"
                    let [month, day, year] = match[1].split("/").map(Number);
                    tglTgh.push(new Date(year, month - 1, day)); // Bulan di JavaScript dimulai dari 0
                }
            }

            // Mendapatkan tanggal maksimum dari array tglTgh
            tglMax = tglTgh.reduce(
                (max, date) => (date > max ? date : max),
                tglTgh[0]
            );

            // Mengatur nilai ke elemen-elemen input HTML dengan format yang sama dengan VB
            tanggalTagihM.value = tglMax.toLocaleDateString("en-CA");
            // tanggalTagihM.value = tglMax.toLocaleDateString("en-CA"); // format yyyy-mm-dd
            idPelunasanM.value = rowDataArray[0][1];
            jenisBayarM.value = rowDataArray[0][3];
            idBankM.value = rowDataArray[0][2];
            mataUangM.value = rowDataArray[0][4];
            nilaiPeluansanM.value = numeral(rowDataArray[0][5]).format(
                "0,0.00"
            );
            noBuktiM.value = rowDataArray[0][6];

            if (idBankM.value !== "") {
                $.ajax({
                    url: "MaintenanceBKMPenagihan/getBankAda",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idBankM: idBankM.value,
                    },
                    success: function (data) {
                        console.log(data);
                        namaBankM.value = data.Nama;
                        jenisMB.value = data.jenis;
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            }

            var myModal = new bootstrap.Modal(
                document.getElementById("modalPilihBank"),
                {
                    keyboard: false,
                }
            );

            document
                .getElementById("modalPilihBank")
                .addEventListener("shown.bs.modal", function () {
                    btn_bankM.focus(); // Fokuskan input
                });

            myModal.show();
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih satu data pelunasan !",
                showConfirmButton: false,
            });
        }
    });

    btn_perkiraanMP.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="KodePerkiraanMPTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#KodePerkiraanMPTable")
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
                        const table = $("#KodePerkiraanMPTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceBKMPenagihan/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NoKodePerkiraan",
                                },
                                {
                                    data: "Keterangan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#KodePerkiraanMPTable_filter input").focus();
                        }, 300);
                        // $("#KodePerkiraanMPTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#KodePerkiraanMPTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "KodePerkiraanMPTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanMP.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMP.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );

                    // setTimeout(() => {
                    //     btn_prosesMB.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_perkiraanMK.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="KodePerkiraanMKTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#KodePerkiraanMKTable")
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
                        const table = $("#KodePerkiraanMKTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceBKMPenagihan/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NoKodePerkiraan",
                                },
                                {
                                    data: "Keterangan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#KodePerkiraanMKTable_filter input").focus();
                        }, 300);
                        // $("#KodePerkiraanMKTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#KodePerkiraanMKTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "KodePerkiraanMKTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanMK.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMK.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );

                    setTimeout(() => {
                        keterangan_MK.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_perkiraanMBia.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="KodePerkiraanMBiaTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#KodePerkiraanMBiaTable")
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
                        const table = $("#KodePerkiraanMBiaTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceBKMPenagihan/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NoKodePerkiraan",
                                },
                                {
                                    data: "Keterangan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#KodePerkiraanMBiaTable_filter input").focus();
                        }, 300);
                        // $("#KodePerkiraanMBiaTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#KodePerkiraanMBiaTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(
                                e,
                                "KodePerkiraanMBiaTable"
                            )
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanMBia.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMBia.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );

                    setTimeout(() => {
                        keterangan_MBia.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_bankM.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="BankTable" class="display" style="width:100%"><thead><tr><th>ID. Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#BankTable")
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
                        const table = $("#BankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "MaintenanceBKMPenagihan/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Bank",
                                },
                                {
                                    data: "Nama_Bank",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#BankTable_filter input").focus();
                        }, 300);
                        // $("#BankTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Bank)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#BankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "BankTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idBankM.value = escapeHTML(selectedRow.Id_Bank.trim());
                    namaBankM.value = escapeHTML(selectedRow.Nama_Bank.trim());

                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getBankDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idBankM: idBankM.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenisMB.value = data[0].Id_Bank;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        btn_prosesMB.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceBKMPenagihan/cekPelunasan",
            type: "GET",
            data: {
                _token: csrfToken,
                bulan: bulan.value,
                tahun: tahun.value,
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else if (data.message) {
                    $.ajax({
                        url: "MaintenanceBKMPenagihan/getPelunasan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            bulan: bulan.value,
                            tahun: tahun.value,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                var table_atas = $("#table_atas").DataTable();

                                table_atas.clear().draw();
                                data.forEach(function (item, index) {
                                    // console.log(item);
                                    const newRow = {
                                        tglPelunasan: item.Tgl_Pelunasan,
                                        idPelunasan: item.Id_Pelunasan,
                                        idBank: item.Id_Bank,
                                        jenisPembayaran: item.Jenis_Pembayaran,
                                        mataUang: item.Nama_MataUang,
                                        totalPelunasan: item.Nilai,
                                        noBukti: item.No_Bukti,
                                        tglPembulatan: "",
                                        idCust: item.ID_Cust,
                                        idJenisBayar: item.Id_Jenis_Bayar,
                                    };

                                    table_atas.row
                                        .add([
                                            `<input type="checkbox" name="penerimaCheckbox" value="${newRow.tglPelunasan}" /> ${newRow.tglPelunasan}`,
                                            newRow.idPelunasan,
                                            newRow.idBank,
                                            newRow.jenisPembayaran,
                                            newRow.mataUang,
                                            newRow.totalPelunasan,
                                            newRow.noBukti,
                                            newRow.tglPembulatan,
                                            newRow.idCust,
                                            newRow.idJenisBayar,
                                        ])
                                        .draw();
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    //#region Checkbox

    let rowDataArray = [];
    let rowDataPertama;

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);
                // rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row[1] !== rowDataPertama[1]
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    let rowDataArrayPelunasan = [];
    let rowDataPelunasan;

    // Handle checkbox change events
    $("#table_detailPelunasan tbody").off(
        "change",
        'input[name="penerimaCheckboxPelunasan"]'
    );
    $("#table_detailPelunasan tbody").on(
        "change",
        'input[name="penerimaCheckboxPelunasan"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxPelunasan"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPelunasan = table_detailPelunasan
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                // rowDataArrayPelunasan.push(rowDataPelunasan);
                rowDataArrayPelunasan = [rowDataPelunasan];

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            } else {
                rowDataPelunasan = null;
                // Remove the unchecked row data from the array
                // rowDataPelunasan = table_detailPelunasan
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayPelunasan = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayPelunasan = rowDataArrayPelunasan.filter(
                //     (row) => row.Id_Penagihan !== rowDataPelunasan.Id_Penagihan
                // );

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            }
        }
    );

    let rowDataArrayBiaya = [];
    let rowDataBiaya;

    // Handle checkbox change events
    $("#table_detailBiaya tbody").off(
        "change",
        'input[name="penerimaCheckboxBiaya"]'
    );
    $("#table_detailBiaya tbody").on(
        "change",
        'input[name="penerimaCheckboxBiaya"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxBiaya"]');
                // .not(this)
                // .prop("checked", false);
                rowDataBiaya = table_detailBiaya
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                // rowDataArrayBiaya.push(rowDataBiaya);
                rowDataArrayBiaya = [rowDataBiaya];

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            } else {
                rowDataBiaya = null;
                // Remove the unchecked row data from the array
                // rowDataBiaya = table_detailBiaya
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayBiaya = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayBiaya = rowDataArrayBiaya.filter(
                //     (row) => row.Id_Penagihan !== rowDataBiaya.Id_Penagihan
                // );

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            }
        }
    );

    let rowDataArrayKrgLbh = [];
    let rowDataKrgLbh;

    // Handle checkbox change events
    $("#table_kurangLebih tbody").off(
        "change",
        'input[name="penerimaCheckboxKrgLbh"]'
    );
    $("#table_kurangLebih tbody").on(
        "change",
        'input[name="penerimaCheckboxKrgLbh"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxKrgLbh"]');
                // .not(this)
                // .prop("checked", false);
                rowDataKrgLbh = table_kurangLebih
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                // rowDataArrayKrgLbh.push(rowDataKrgLbh);
                rowDataArrayKrgLbh = [rowDataKrgLbh];

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            } else {
                rowDataKrgLbh = null;
                // Remove the unchecked row data from the array
                // rowDataKrgLbh = table_kurangLebih
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayKrgLbh = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayKrgLbh = rowDataArrayKrgLbh.filter(
                //     (row) => row.Id_Penagihan !== rowDataKrgLbh.Id_Penagihan
                // );

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            }
        }
    );

    let rowDataArrayBKM = [];
    let rowDataBKM;

    // Handle checkbox change events
    $("#table_tampilBKM tbody").off(
        "change",
        'input[name="penerimaCheckboxBKM"]'
    );
    $("#table_tampilBKM tbody").on(
        "change",
        'input[name="penerimaCheckboxBKM"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxBKM"]')
                    .not(this)
                    .prop("checked", false);
                rowDataBKM = table_tampilBKM.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                // rowDataArrayBKM.push(rowDataBKM);
                rowDataArrayBKM = [rowDataBKM];

                console.log(rowDataArrayBKM);
                console.log(rowDataBKM, this, table_tampilBKM);

                bkm.value = rowDataBKM.Id_BKM;
                terbilang.value = rowDataBKM.Terjemahan;
            } else {
                bkm.value = "";
                terbilang.value = "";
                rowDataBKM = null;
                // Remove the unchecked row data from the array
                // rowDataBKM = table_tampilBKM
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayBKM = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayBKM = rowDataArrayBKM.filter(
                //     (row) => row.Id_Penagihan !== rowDataBKM.Id_Penagihan
                // );

                console.log(rowDataArrayBKM);
                console.log(rowDataBKM, this, table_tampilBKM);
            }
        }
    );

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        table_detailPelunasan = $("#table_detailPelunasan").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "MaintenanceBKMPenagihan/getDetailPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data[1],
                    });
                },
            },
            columns: [
                {
                    data: "ID_Penagihan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxPelunasan" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_Pelunasan" },
                { data: "Pelunasan_Rupiah" },
                { data: "Kode_Perkiraan" },
                { data: "NamaCust" },
                { data: "ID_Detail_Pelunasan" },
                { data: "Tgl_Penagihan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });

        table_detailBiaya = $("#table_detailBiaya").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "MaintenanceBKMPenagihan/getDetailBiaya",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data[1],
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxBiaya" value="${data}" /> ${data}`;
                    },
                },
                { data: "Biaya" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });

        table_kurangLebih = $("#table_kurangLebih").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "MaintenanceBKMPenagihan/getDetailKrgLbh",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data[1],
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxKrgLbh" value="${data}" /> ${data}`;
                    },
                },
                { data: "KurangLebih" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });
});
