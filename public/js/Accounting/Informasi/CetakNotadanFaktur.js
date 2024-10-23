// Inisialisasi elemen-elemen ke dalam variabel
var optTunai = document.getElementById('optTunai');
var optPajakTunai = document.getElementById('optPajakTunai');
var optUM = document.getElementById('optUM');
var optNotaFaktur = document.getElementById('optNotaFaktur');
var optPajak = document.getElementById('optPajak');
var optPajakUM = document.getElementById('optPajakUM');

var tglPenagihan = document.getElementById('tgl_Penagihan');
var customer = document.getElementById('customer');
var btnBrowse = document.getElementById('btnBrowse');
var idPenagihan = document.getElementById('idPenagihan');

var btnPrev = document.getElementById('btnPrev');
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tglPenagihan.value = formattedDate2;

tglPenagihan.focus();

tglPenagihan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnBrowse.focus();
    }
});

btnBrowse.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnPrev.focus();
    }
});

function printPreview(previewClass) {
    document.querySelectorAll('.faktur, .fakturXC').forEach(function (preview) {
        preview.style.display = "none";
    });

    const previewToPrint = document.querySelector(`.${previewClass}`);
    previewToPrint.style.display = "block";

    window.print();

    previewToPrint.style.display = "none";
}

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return '';
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

let sfilter, sType;
btnPrev.addEventListener("click", function (e) {
    let sType = '';

    if (optNotaFaktur.checked) {
        sType = 'CetakNotaFaktur';
        getViewSJ(sType);
    } else if (optPajak.checked) {
        sType = 'CetakFakturPajak';
        getViewSJ(sType);
    } else if (optTunai.checked) {
        sType = 'Cetaknotatunai';
        getViewSP(sType);
    } else if (optPajakTunai.checked) {
        sType = 'CetakFakturPajakTunai';
        getViewSP(sType);
    } else if (optUM.checked) {
        sType = 'CetakFakturUM';
        getViewSP(sType);
    } else if (optPajakUM.checked) {
        sType = 'CetakFakturPajakUM';
        getViewSP(sType);
    }
});

function getViewSJ(sType) {
    $.ajax({
        type: 'GET',
        url: 'CetakNotaDanFaktur/getSJ',
        data: {
            _token: csrfToken,
            Id_Penagihan: idPenagihan.value.trim()
        },
        success: function (result) {
            if (sType === 'CetakNotaFaktur') {
                rpt_cetakNotaFaktur(result);
            }
            else if (sType === 'CetakFakturPajak') {
                rpt_cetakFakturPajak(result);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function getViewSP(sType) {
    $.ajax({
        type: 'GET',
        url: 'CetakNotaDanFaktur/getSP',
        data: {
            _token: csrfToken,
            Id_Penagihan: idPenagihan.value.trim()
        },
        success: function (result) {
            if (sType === 'Cetaknotatunai') {
                rpt_cetakNotaTunai(result);
            }
            else if (sType === 'CetakFakturPajakTunai') {
                rpt_CetakFakturPajakTunai(result);
            }
            else if (sType === 'CetakFakturUM') {
                rpt_CetakFakturUM(result);
            }
            else if (sType === 'CetakFakturPajakUM') {
                rpt_CetakFakturPajakUM(result);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function cekXC(idTagih) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: 'CetakNotaDanFaktur/cekXC',
            data: {
                _token: csrfToken,
                noInv: idTagih
            },
            success: function (result) {
                let cekXC = result[0].ada ? result[0].ada : 0;
                resolve(cekXC);
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
}

function rpt_cetakNotaFaktur(result) {
    let noInv = '';
    if (idPenagihan.value.length > 14) {
        noInv = idPenagihan.value;

        cekXC(noInv).then(function (XC) {
            if (XC > 0) {
                $.ajax({
                    type: 'GET',
                    url: 'CetakNotaDanFaktur/getBiayaTambahanFakturXC',
                    data: {
                        _token: csrfToken,
                        Id_Penagihan: idPenagihan.value.trim()
                    },
                    success: function (hello) {
                        var fakturXC_Dexlite = document.getElementById('fakturXC_Dexlite');
                        var fakturXC_Demurrage = document.getElementById('fakturXC_Demurrage');

                        fakturXC_Dexlite.textContent = numeral(hello[0].XCTranspor).format("0,0.00");
                        fakturXC_Demurrage.textContent = numeral(hello[0].Storage).format("0,0.00");

                        var fakturXC_IdPenagihan = document.getElementById('fakturXC_IdPenagihan');
                        var fakturXC_AreaPPNThnIdFakturPajak = document.getElementById('fakturXC_AreaPPNThnIdFakturPajak');
                        var fakturXC_NamaNPWP = document.getElementById('fakturXC_NamaNPWP');
                        var fakturXC_AlamatNPWP = document.getElementById('fakturXC_AlamatNPWP');
                        var fakturXC_NPWP = document.getElementById('fakturXC_NPWP');
                        var fakturXC_NamaKelompokUtama = document.getElementById('fakturXC_NamaKelompokUtama');
                        var fakturXC_Grand = document.getElementById('fakturXC_Grand');
                        var fakturXC_SymbolGrand = document.getElementById('fakturXC_SymbolGrand');
                        var fakturXC_UM = document.getElementById('fakturXC_UM');
                        var fakturXC_SymbolUM = document.getElementById('fakturXC_SymbolUM');
                        var fakturXC_DPP = document.getElementById('fakturXC_DPP');
                        var fakturXC_SymbolDPP = document.getElementById('fakturXC_SymbolDPP');
                        var fakturXC_Pajak = document.getElementById('fakturXC_Pajak');
                        var fakturXC_SymbolPajak = document.getElementById('fakturXC_SymbolPajak');
                        var fakturXC_Terbilang = document.getElementById('fakturXC_Terbilang');
                        var fakturXC_Terbayar = document.getElementById('fakturXC_Terbayar');
                        var fakturXC_SymbolTerbayar = document.getElementById('fakturXC_SymbolTerbayar');
                        var fakturXC_SyaratBayar = document.getElementById('fakturXC_SyaratBayar');
                        var fakturXC_TglBln = document.getElementById('fakturXC_TglBln');
                        var fakturXC_Thn = document.getElementById('fakturXC_Thn');
                        var fakturXC_Tempo = document.getElementById('fakturXC_Tempo');
                        var fakturXC_SuratJalan = document.getElementById('fakturXC_SuratJalan');
                        var fakturXC_SJ = document.getElementById('fakturXC_SJ');

                        fakturXC_IdPenagihan.textContent = decodeHtmlEntities(result[0].Id_Penagihan);

                        var date2 = new Date(result[0].Tgl_Penagihan);

                        var namaBulan = [
                            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                        ];

                        var tanggal = date2.getDate();
                        var bulan = namaBulan[date2.getMonth()];
                        var tahunLengkap = date2.getFullYear();
                        var duaDigitTahun = tahunLengkap.toString().slice(-2);
                        fakturXC_AreaPPNThnIdFakturPajak.textContent = decodeHtmlEntities(result[0].KdArea_Ppn)
                            + ' . 012 - ' + duaDigitTahun + '. ' + decodeHtmlEntities(result[0].IdFakturPajak);

                        fakturXC_NamaNPWP.textContent = decodeHtmlEntities(result[0].NamaNPWP);
                        fakturXC_AlamatNPWP.textContent = decodeHtmlEntities(result[0].AlamatNPWP);

                        let npwp = result[0].NPWP;
                        let formattedNPWP =
                            npwp.slice(0, 2) + ' . ' +
                            npwp.slice(2, 5) + ' . ' +
                            npwp.slice(5, 8) + ' . ' +
                            npwp.slice(8, 9) + ' - ' +
                            npwp.slice(9, 12) + ' . ' +
                            npwp.slice(12, 15);
                        fakturXC_NPWP.textContent = formattedNPWP;

                        fakturXC_NamaKelompokUtama.textContent = decodeHtmlEntities(result[0].NamaKelompokUtama);

                        let totalGrand = 0;
                        let count = 0;
                        var fakturXC_Detail = document.getElementById("fakturXC_Detail");

                        result.forEach(function (item, index) {
                            var row = document.createElement("div");
                            row.classList.add("row");
                            count += 1;

                            var coaCol = document.createElement("div");
                            coaCol.classList.add("col-sm-1", "text-right");
                            coaCol.textContent = count;
                            row.appendChild(coaCol);

                            var accountCol = document.createElement("div");
                            accountCol.classList.add("col-sm-5", "text-left");
                            accountCol.textContent = item.NamaType ? decodeHtmlEntities(item.NamaType) : '';
                            row.appendChild(accountCol);

                            var descriptionCol = document.createElement("div");
                            descriptionCol.classList.add("col-sm-2", "text-right");
                            descriptionCol.textContent = item.Jml ? numeral(item.Jml).format("0,0.00") + item.Satuan : '';
                            row.appendChild(descriptionCol);

                            var amountCol = document.createElement("div");
                            amountCol.classList.add("col-sm-2", "text-right");
                            amountCol.textContent = item.HargaSatuan ? decodeHtmlEntities(item.Symbol2) + numeral(item.HargaSatuan).format("0,0.00") : '0.00';
                            row.appendChild(amountCol);

                            var totalCol = document.createElement("div");
                            totalCol.classList.add("col-sm-2", "text-left");
                            let tempTotal = numeral(item.Jml).value() * numeral(item.HargaSatuan).value();
                            totalCol.textContent = item.HargaSatuan ? decodeHtmlEntities(item.Symbol2) + numeral(tempTotal).format("0,0.00") : '0.00';
                            row.appendChild(totalCol);

                            fakturXC_Detail.appendChild(row);

                            totalGrand += numeral(tempTotal).value();

                            var additionalRow = document.createElement("div");
                            additionalRow.classList.add("row");

                            var mantap = document.createElement("div");
                            mantap.classList.add("col-sm-1", "text-right");
                            additionalRow.appendChild(mantap);

                            var additionalCoaCol = document.createElement("div");
                            additionalCoaCol.classList.add("col-sm-1", "text-right");
                            additionalCoaCol.textContent = 'P O :';
                            additionalRow.appendChild(additionalCoaCol);

                            var additionalAccountCol = document.createElement("div");
                            additionalAccountCol.classList.add("col-sm-10", "text-left");
                            additionalAccountCol.textContent = item.NO_PO ? decodeHtmlEntities(item.NO_PO) : '';
                            additionalRow.appendChild(additionalAccountCol);

                            fakturXC_Detail.appendChild(additionalRow);
                        });

                        fakturXC_SymbolGrand.textContent = decodeHtmlEntities(result[0].Symbol2);
                        fakturXC_SymbolUM.textContent = decodeHtmlEntities(result[0].Symbol2);
                        fakturXC_SymbolDPP.textContent = decodeHtmlEntities(result[0].Symbol2);
                        fakturXC_SymbolPajak.textContent = decodeHtmlEntities(result[0].Symbol2);
                        fakturXC_SymbolTerbayar.textContent = decodeHtmlEntities(result[0].Symbol2);

                        totalGrand = numeral(totalGrand).value() + numeral(fakturXC_Dexlite.textContent).value() + numeral(fakturXC_Demurrage.textContent).value();
                        fakturXC_Grand.textContent = numeral(totalGrand).format("0,0.00");

                        fakturXC_UM.textContent = result[0].Nilai_UM ? numeral(result[0].Nilai_UM).format("0,0.00") : '0.00';

                        let dpp = numeral(fakturXC_Grand.textContent).value() - numeral(fakturXC_UM.textContent).value();
                        fakturXC_DPP.textContent = numeral(dpp).format("0,0.00");

                        let pajak = Math.round(numeral(dpp).value()) * numeral(result[0].PersenPPN).value() / 100;
                        fakturXC_Pajak.textContent = numeral(pajak).format("0,0.00");

                        let terbayar = numeral(dpp).value() + numeral(pajak).value();
                        fakturXC_Terbayar.textContent = numeral(terbayar).format("0,0.00");

                        fakturXC_Terbilang.textContent = decodeHtmlEntities(result[0].Terbilang);

                        fakturXC_SyaratBayar.innerHTML = 'Syarat Pembayaran: &emsp;&emsp;' + decodeHtmlEntities(result[0].SyaratBayar) + ' Hari';

                        fakturXC_TglBln.textContent = tanggal + ' ' + bulan;
                        fakturXC_Thn.textContent = duaDigitTahun;

                        let syaratBayar = result[0].SyaratBayar;
                        let tglTerimaBarang = result[0].Tgl_Terima_Barang;
                        let syaratBayarNumber = Number(syaratBayar);
                        let date3 = new Date(tglTerimaBarang);
                        let resultDate = new Date(date3);
                        resultDate.setDate(date3.getDate() + syaratBayarNumber);
                        fakturXC_Tempo.innerHTML = 'Jatuh Tempo: &emsp;&emsp; ' + formatDateToMMDDYYYY(resultDate);

                        if (sFormula0.length > 255) {
                            fakturXC_SuratJalan.innerHTML = 'Surat Jalan: &emsp;&emsp; ' + sFormula0.slice(0, 252);
                            fakturXC_SJ.textContent = sFormula0.slice(252);
                        }
                        else {
                            fakturXC_SuratJalan.innerHTML = 'Surat Jalan: &emsp;&emsp; ' + sFormula0;
                            fakturXC_SJ.textContent = '';
                        }

                        printPreview('fakturXC');
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            }
            else {
                // print faktur
                var faktur_IdPenagihan = document.getElementById('faktur_IdPenagihan');
                var faktur_AreaPPNThnIdFakturPajak = document.getElementById('faktur_AreaPPNThnIdFakturPajak');
                var faktur_NamaNPWP = document.getElementById('faktur_NamaNPWP');
                var faktur_AlamatNPWP = document.getElementById('faktur_AlamatNPWP');
                var faktur_NPWP = document.getElementById('faktur_NPWP');
                var faktur_NamaKelompokUtama = document.getElementById('faktur_NamaKelompokUtama');
                var faktur_SymbolGrand = document.getElementById('faktur_SymbolGrand');
                var faktur_Grand = document.getElementById('faktur_Grand');
                var faktur_SymbolUM = document.getElementById('faktur_SymbolUM');
                var faktur_UM = document.getElementById('faktur_UM');
                var faktur_SymbolDPP = document.getElementById('faktur_SymbolDPP');
                var faktur_DPP = document.getElementById('faktur_DPP');
                var faktur_SymbolPajak = document.getElementById('faktur_SymbolPajak');
                var faktur_Pajak = document.getElementById('faktur_Pajak');
                var faktur_Terbilang = document.getElementById('faktur_Terbilang');
                var faktur_SymbolTerbayar = document.getElementById('faktur_SymbolTerbayar');
                var faktur_Terbayar = document.getElementById('faktur_Terbayar');
                var faktur_SyaratBayar = document.getElementById('faktur_SyaratBayar');
                var faktur_TglBln = document.getElementById('faktur_TglBln');
                var faktur_Thn = document.getElementById('faktur_Thn');
                var faktur_Tempo = document.getElementById('faktur_Tempo');
                var faktur_SuratJalan = document.getElementById('faktur_SuratJalan');
                var faktur_SJ = document.getElementById('faktur_SJ');

                faktur_IdPenagihan.textContent = decodeHtmlEntities(result[0].Id_Penagihan);

                var date2 = new Date(result[0].Tgl_Penagihan);

                var namaBulan = [
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];

                var tanggal = date2.getDate();
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap.toString().slice(-2);
                faktur_AreaPPNThnIdFakturPajak.textContent = decodeHtmlEntities(result[0].KdArea_Ppn)
                    + ' . 012 - ' + duaDigitTahun + '. ' + decodeHtmlEntities(result[0].IdFakturPajak);

                faktur_NamaNPWP.textContent = decodeHtmlEntities(result[0].NamaNPWP);
                faktur_AlamatNPWP.textContent = decodeHtmlEntities(result[0].AlamatNPWP);

                let npwp = result[0].NPWP;
                let formattedNPWP =
                    npwp.slice(0, 2) + ' . ' +
                    npwp.slice(2, 5) + ' . ' +
                    npwp.slice(5, 8) + ' . ' +
                    npwp.slice(8, 9) + ' - ' +
                    npwp.slice(9, 12) + ' . ' +
                    npwp.slice(12, 15);
                faktur_NPWP.textContent = formattedNPWP;

                faktur_NamaKelompokUtama.textContent = decodeHtmlEntities(result[0].NamaKelompokUtama);

                let totalGrand = 0;
                let count = 0;
                var faktur_Detail = document.getElementById("faktur_Detail");

                result.forEach(function (item, index) {
                    var row = document.createElement("div");
                    row.classList.add("row");
                    count += 1;

                    var coaCol = document.createElement("div");
                    coaCol.classList.add("col-sm-1", "text-right");
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add("col-sm-5", "text-left");
                    accountCol.textContent = item.NamaType ? decodeHtmlEntities(item.NamaType) : '';
                    row.appendChild(accountCol);

                    var descriptionCol = document.createElement("div");
                    descriptionCol.classList.add("col-sm-2", "text-right");
                    descriptionCol.textContent = item.Jml ? numeral(item.Jml).format("0,0.00") + item.Satuan : '';
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add("col-sm-2", "text-right");
                    amountCol.textContent = item.HargaSatuan ? decodeHtmlEntities(item.Symbol2) + numeral(item.HargaSatuan).format("0,0.00") : '0.00';
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add("col-sm-2", "text-left");
                    let tempTotal = numeral(item.Jml).value() * numeral(item.HargaSatuan).value();
                    totalCol.textContent = item.HargaSatuan ? decodeHtmlEntities(item.Symbol2) + numeral(tempTotal).format("0,0.00") : '0.00';
                    row.appendChild(totalCol);

                    faktur_Detail.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow = document.createElement("div");
                    additionalRow.classList.add("row");

                    var mantap = document.createElement("div");
                    mantap.classList.add("col-sm-1", "text-right");
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol = document.createElement("div");
                    additionalCoaCol.classList.add("col-sm-1", "text-right");
                    additionalCoaCol.textContent = 'P O :';
                    additionalRow.appendChild(additionalCoaCol);

                    var additionalAccountCol = document.createElement("div");
                    additionalAccountCol.classList.add("col-sm-10", "text-left");
                    additionalAccountCol.textContent = item.NO_PO ? decodeHtmlEntities(item.NO_PO) : '';
                    additionalRow.appendChild(additionalAccountCol);

                    faktur_Detail.appendChild(additionalRow);
                });

                faktur_SymbolGrand.textContent = decodeHtmlEntities(result[0].Symbol2);
                faktur_SymbolUM.textContent = decodeHtmlEntities(result[0].Symbol2);
                faktur_SymbolDPP.textContent = decodeHtmlEntities(result[0].Symbol2);
                faktur_SymbolPajak.textContent = decodeHtmlEntities(result[0].Symbol2);
                faktur_SymbolTerbayar.textContent = decodeHtmlEntities(result[0].Symbol2);

                faktur_Grand.textContent = numeral(totalGrand).format("0,0.00");

                faktur_UM.textContent = result[0].Nilai_UM ? numeral(result[0].Nilai_UM).format("0,0.00") : '0.00';

                let dpp = numeral(faktur_Grand.textContent).value() - numeral(faktur_UM.textContent).value();
                faktur_DPP.textContent = numeral(dpp).format("0,0.00");

                let pajak = Math.round(numeral(dpp).value()) * numeral(result[0].PersenPPN).value() / 100;
                faktur_Pajak.textContent = numeral(pajak).format("0,0.00");

                let terbayar = numeral(dpp).value() + numeral(pajak).value();
                faktur_Terbayar.textContent = numeral(terbayar).format("0,0.00");

                faktur_Terbilang.textContent = decodeHtmlEntities(result[0].Terbilang);

                faktur_SyaratBayar.innerHTML = 'Syarat Pembayaran: &emsp;&emsp;' + decodeHtmlEntities(result[0].SyaratBayar) + ' Hari';

                faktur_TglBln.textContent = tanggal + ' ' + bulan;
                faktur_Thn.textContent = duaDigitTahun;

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Terima_Barang;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(date3.getDate() + syaratBayarNumber);
                faktur_Tempo.innerHTML = 'Jatuh Tempo: &emsp;&emsp; ' + formatDateToMMDDYYYY(resultDate);

                if (sFormula0.length > 255) {
                    faktur_SuratJalan.innerHTML = 'Surat Jalan: &emsp;&emsp; ' + sFormula0.slice(0, 252);
                    faktur_SJ.textContent = sFormula0.slice(252);
                }
                else {
                    faktur_SuratJalan.innerHTML = 'Surat Jalan: &emsp;&emsp; ' + sFormula0;
                    faktur_SJ.textContent = '';
                }

                printPreview('faktur');
            }
        }).catch(function (error) {
            console.error('Error:', error);
        });
    }
    else {
        console.log('ke nota');
    }
}

function rpt_cetakFakturPajak(result) {

}

function rpt_cetakNotaTunai(result) {

}

function rpt_CetakFakturPajakTunai(result) {

}

function rpt_CetakFakturUM(result) {

}

function rpt_CetakFakturPajakUM(result) {

}

btnBrowse.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Customer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "CetakNotaDanFaktur/getCust",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                Tgl_Penagihan: tglPenagihan.value
                            }
                        },
                        columns: [
                            { data: "NamaCust" },
                            { data: "Id_Penagihan" },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                customer.value = decodeHtmlEntities(result.value.NamaCust.trim());
                idPenagihan.value = decodeHtmlEntities(result.value.Id_Penagihan.trim());

                if (idPenagihan.value !== ''
                    && (optNotaFaktur.checked || optPajak.checked || optPajakTunai.checked || optTunai.checked || optPajakUM.checked)) {
                    Promise.all([DisplaySuratJalan(idPenagihan.value), DisplayPajak(idPenagihan.value)])
                        .then(() => {
                            btnPrev.click();
                        })
                        .catch(error => {
                            console.error('Ada error saat mengeksekusi:', error);
                        });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

let xnomor, sFormula0;
let sIdFakturPajak, sIdMataUang;

function DisplaySuratJalan(sid_Penagihan) {
    return new Promise((resolve, reject) => {
        xnomor = '';
        $.ajax({
            type: 'GET',
            url: 'CetakNotaDanFaktur/getSuratJalan',
            data: {
                _token: csrfToken,
                Id_Penagihan: sid_Penagihan.trim()
            },
            success: function (result) {
                if (result.length !== 0) {
                    result.forEach(function (item, index) {
                        if (xnomor !== '') {
                            xnomor += ', ';
                        }
                        xnomor += item.Surat_Jalan;
                    });
                    sFormula0 = xnomor;
                }
                resolve();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}

function DisplayPajak(sid_Penagihan) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'CetakNotaDanFaktur/getPajak',
            data: {
                _token: csrfToken,
                Id_Penagihan: sid_Penagihan.trim()
            },
            success: function (result) {
                if (result.length !== 0) {
                    sIdFakturPajak = result[0].IdFakturPajak ? decodeHtmlEntities(result[0].IdFakturPajak.trim()) : '';
                    sIdMataUang = result[0].Id_MataUang ? decodeHtmlEntities(result[0].Id_MataUang.trim()) : '';
                }
                else {
                    sIdFakturPajak = '';
                    sIdMataUang = '';
                }
                resolve();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

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
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
}