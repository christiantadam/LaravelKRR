@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKM Penagihan')

@include('Accounting.Piutang.ModalMaintenanceBKMPenagihanPilihBank')
<style>
    @media print {
        .card {
            display: none;
        }

        .print {
            visibility: visible !important;
        }

        .modal {
            display: none !important;
        }

        .fade {
            opacity: 0 !important;
        }
    }
</style>

<div class="container-fluid inti">
    <div class="row justify-content-center">
        <div class="col-md-11 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM Penagihan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">

                        {{ csrf_field() }}
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <!-- Form fields go here -->
                        <div style="display: flex; flex-direction: row">
                            <div style="display: flex; flex-direction: row; width:50%">
                                <div style="align-self: end;">
                                    <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                                </div>
                                <div style="width: 15%;margin-right: 1%">
                                    <input type="text" id="bulan" name="bulan" placeholder="Bulan"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div style="width: 20%;margin-right: 2%">
                                    <input type="text" id="tahun" name="tahun" placeholder="Tahun"
                                        class="form-control" style="width: 100%">
                                </div>
                                <div>
                                    <input type="submit" id="btnOK" value="OK" class="form-control">
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row;width:50%">
                                <input type="submit" id="btnPilihBank" name="btnPilihBank" value="Pilih Bank"
                                    class="form-control">
                                <input type="submit" id="btnGroupBKM" name="btnGroupBKM" value="Group BKM"
                                    class="form-control">
                            </div>
                        </div>
                        <input type="hidden" id="tglInputNew" name="tglInputNew" class="form-control">
                        <input type="hidden" id="idBKMNew" name="idBKMNew" class="form-control">
                        <br>
                        <div>
                            <h5 style="font-weight: bold">Data Pelunasan</h5>
                            <div style="overflow-y: auto;">
                                <table id="tabelDataPelunasan">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Tgl Pelunasan</th>
                                            <th>Id. Pelunasan</th>
                                            <th>Id. Bank</th>
                                            <th>Jenis Pembayaran</th>
                                            <th>Mata Uang</th>
                                            <th>Total Pelunasan</th>
                                            <th>No. Bukti</th>
                                            <th>Tgl Pembuatan</th>
                                            <th>IdCust</th>
                                            <th>Jenis Bayar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                <input type="hidden" id="jenisBank" name="jenisBank" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="total" name="total" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="uang" name="uang" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="konversi" name="konversi" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="sisa" name="sisa" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="idbkm" name="idbkm" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>

                        <!--CARD 1-->
                        <br>
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 40%;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <input type="radio" name="radiogrupDetail" value="Detail Pelunasan"
                                            id="radioDetailPelunasan" disabled>
                                        <label for="radioDetailPelunasan">Detail Pelunasan</label>
                                    </div>
                                    <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                        <table style="width: 280%; table-layout: fixed;"id="tabelDetailPelunasan">
                                            <colgroup>
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                                <col style="width: 40%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. Penagihan</th>
                                                    <th>Nilai Pelunasan</th>
                                                    <th>Pelunasan Rupiah</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Customer</th>
                                                    <th>Id. Detail</th>
                                                    <th>Tgl. Penagihan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!--CARD 2-->
                            <div class="card" style="width: 30%; overflow-y: auto; max-height: 250px;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <input type="radio" name="radiogrupDetail" value="Detail Biaya"
                                            id="radioDetailBiaya" disabled>
                                        <label for="radioDetailBiaya">Detail Biaya</label>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 200%; table-layout: fixed;" id="tabelDetailBiaya">
                                            <colgroup>
                                                <col style="width: 50%;">
                                                <col style="width: 50%;">
                                                <col style="width: 50%;">
                                                <col style="width: 50%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Keterangan</th>
                                                    <th>Jumlah Biaya</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Id. Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!--CARD 3-->
                            <div class="card" style="width: 30%; overflow-y: auto; max-height: 250px;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <input type="radio" name="radiogrupDetail" value="Detail Kurang/Lebih"
                                            id="radioDetailKurangLebih" disabled>
                                        <label for="radioDetailKurangLebih">Detail Kurang/Lebih</label>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 240%; table-layout: fixed;" id="tabelDetailKurangLebih">
                                            <colgroup>
                                                <col style="width: 60%;">
                                                <col style="width: 60%;">
                                                <col style="width: 60%;">
                                                <col style="width: 60%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Keterangan</th>
                                                    <th>Jumlah Biaya</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Id. Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-5">
                                    <input type="submit" id="btnKoreksiDetail" name="koreksidetail"
                                        value="Koreksi Detail" class="btn btn-warning d-flex ml-auto"
                                        onclick="validateTabel()">
                                </div>
                                <div class="col-3">
                                    <input type="submit" id="btnTampilBKM" name="btnTampilBKM" value="Tampil BKM"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-4">
                                    <input type="submit" id="btnTutup" name="tutup" value="TUTUP"
                                        class="btn btn-dark d-flex ml-auto" disabled>
                                </div>
                            </div>
                        </div>

                        <!--MODAL MAINTENANCE DETAIL PELUNASAN-->
                        <div class="modal fade" id="modalDetailPelunasan" tabindex="-1" role="dialog"
                            aria-labelledby="modalDetailPelunasan" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>



                                    <input type="hidden" name="_method" id="methoddetail">
                                    <div class="modal-body">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idPenagihan" style="margin-right: 10px;">Id.
                                                    Penagihan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="idPenagihan" name="idPenagihan"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <label for="iddetail" style="margin-right: 10px;">Id.
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="iddetail" name="iddetail"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaCustomer" style="margin-right: 10px;">Nama
                                                    Customer</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="namaCustomer" name="namaCustomer"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="nilaiPelunasan" style="margin-right: 10px;">Nilai
                                                    Pelunasan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="nilaiPelunasanDetail"
                                                    name="nilaiPelunasanDetail" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="pelunasanRupiah" style="margin-right: 10px;">Pelunasan
                                                    Rupiah</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="pelunasanRupiah" name="pelunasanRupiah"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idKodePerkiraan" name="idKodePerkiraan"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-7">
                                                <select name="kodePerkiraanSelect" id="kodePerkiraanSelect"
                                                    class="form-control">

                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                <input type="submit" id="btnProsesDetail" name="btnProsesDetail"
                                                    value="Proses" class="btn btn-primary">
                                            </div>
                                            <div class="col-3">
                                            </div>
                                            <div class="col-4">
                                                <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                    value="Tutup" class="btn btn-primary">
                                            </div>
                                        </div>
                                        <input type="hidden" name="detpelunasan" id="detpelunasan"
                                            value="detpelunasan">
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!--MODAL DETAIL BIAYA-->
                        <div class="modal fade" id="modalDetailBiaya" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Biaya BKM
                                            Penagihan</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methodbiaya">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahBiaya" style="margin-right: 10px;">Jumlah
                                                Biaya</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jumlahBiaya" name="jumlahBiaya"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <label for="idDetailBiaya" style="margin-right: 10px;">Id.
                                                Detail</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idDetailBiaya"
                                                name="idDetailBiaya"class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idKodePerkiraanBiaya"
                                                name="idKodePerkiraanBiaya" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-7">
                                            <select name="kodePerkiraanBiayaSelect" id="kodePerkiraanBiayaSelect"
                                                class="form-control">

                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="keterangan" style="margin-right: 10px;">Keterangan</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="keteranganBiaya" name="keteranganBiaya"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5">
                                            <input type="submit" id="btnProsesBiaya" name="btnProsesBiaya"
                                                value="Proses" class="btn btn-primary">
                                        </div>
                                        <div class="col-3">
                                        </div>
                                        <div class="col-4">
                                            <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                value="Tutup" class="btn btn-primary">
                                        </div>
                                    </div>
                                    <input type="hidden" name="detpelunasan" id="detpelunasan" value="detbiaya">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{--  --}}
        <div class="print" style="visibility: hidden;">
            <div class="container">
                <div class="row">
                    <div class="col-5" style="padding-right: 25px;">
                        <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                            <h4 style="font-weight: bold">P.T. KERTA RAJASA RAYA</h4>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                            <h4 style="font-weight: bold">BUKTI PENERIMAAN KAS</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5" style="padding-right: 25px;">
                        <div class="row" style="border: solid 1px; text-align-last: center;">
                            <div class="col-12" style="height: 3vh; ">
                                <span style="font-weight: bold; font-size: 22px;">Jl. Raya Tropodo No. 1</span><br>
                            </div>
                            <div class="col-12">
                                <span style="font-weight: bold; font-size: 22px;">WARU - SIDOARJO</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row" style="border: solid 1px; text-align-last: center;">
                            <div id="id_BKM" class="col-12" style="height: 3vh;">
                                <span style="display: inline; font-size: 22px; font-weight: bold">NOMER: </span> <span
                                    id="nomer"
                                    style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                            </div>
                            <div id="tanggal" class="col-12">
                                <span style="display: inline; font-size: 22px; font-weight: bold">TANGGAL: </span><span
                                    id="tglCetak"
                                    style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <br>
                <div class="row">
                    <div class="col-12" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 2.5vh;">
                                <span style="display: inline; font-size: 18px; padding-left: 50px">Jumlah Diterima:
                                </span><span id="symbol"
                                    style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span><span
                                    id="jumlahDiterima" name="jumlahDiterima"
                                    style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span>
                            </div>
                            <div class="col-12">
                                <span style="display: inline; font-size: 18px; padding-left: 50px">Terbilang: </span>
                            </div>
                            <div class="col-12">
                                <span id="terbilangCetak"
                                    style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 50px"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                                <span style="font-size: 18px; ">RINCIAN PENERIMAAN</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                                <span style="font-size: 18px;">KODE PERKIRAAN</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                                <span style="font-size: 18px;">JUMLAH</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 4vh;">
                                <div class="row">
                                    <div class="col-7" style="text-align-last: left;">
                                        <span id="rincianPenerimaan" style="font-size: 18px;">BB</span>
                                    </div>
                                    <div class="col-2" style="text-align-last: right;">
                                        <span id="keterangan2" style="font-size: 18px;">AA</span>
                                    </div>
                                    <div class="col-3" style="text-align-last: right;">
                                        <span id="biaya" style="font-size: 18px;">CC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 4vh; text-align-last: center;">
                                <span id="kodePerkiraanCetak" style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="jum1" style="font-size: 18px;">jum1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row" style="border: solid 1px; border-bottom: 0px; border-right: 0px;">
                            <div class="col-12" style="height: 4vh; text-align-last: left;">
                                <span id="ket" style="font-size: 18px; "></span><br> <!--KET-->
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: left;"><!--KET1-->
                                <span id="ket1" style="font-size: 18px; "></span><br>
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: left;"><!--KET5-->
                                <span id="ket5" style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 12vh; text-align-last: center;">
                                <span id="kodePerkiraanCetak" style="font-size: 18px;"></span> <!--KD-->
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="totalK" style="font-size: 18px;">totalK</span>
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="ket3" style="font-size: 18px;">ket3</span><span id="jum"
                                    style="font-size: 18px;">jum</span>
                            </div>
                            <div class="col-12" style="height: 4vh; text-align-last: right;">
                                <span id="ket6" style="font-size: 18px;">ket6<span id="jum2"
                                        style="font-size: 18px;">jum2</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10" style="padding-right: 25px;">
                        <div
                            class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                                <span style="font-size: 18px; font-weight: bold; padding-left: 45px">GRAND TOTAL:
                                </span><span id="symbol2" style="font-size: 18px; padding-right: 20px"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-2" style="padding-right: 25px;">
                        <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                            <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                                <span id="grandTotal" style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <br><br>
                <div class="row">
                    <div class="col-3" style="margin-right: 25px;">
                        <div class="row"
                            style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                            <div class="col-12" style="height: 10vh; ">
                                <span id="disetujui" style="font-size: 18px;">Disetujui,</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="margin-left: 50px">
                        <div class="row"
                            style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                            <div class="col-12" style="height: 10vh; ">
                                <span id="kasir" style="font-size: 18px;">Kasir,</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-4" style="margin-right: 25px;">
                        <div class="row" style="text-align-last: right;">
                            <div class="col-12" style="height: 10vh; ">
                                <span style="font-size: 18px;">Sidoarjo, </span><span id="tglCetakForm"
                                    style="font-size: 18px;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="{{ asset('js/Accounting/Piutang/MaintenanceBKMPenagihan.js') }}"></script>
    @endsection
