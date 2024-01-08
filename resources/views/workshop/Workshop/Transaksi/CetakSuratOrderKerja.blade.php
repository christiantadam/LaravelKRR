@extends('layouts.WORKSHOP.Workshop.appWorkshop')
@section('content')
@section('title', 'Cetak Surat Order Kerja')
<style>
  #tableCetakOrderKerja td {
    padding: 1px;
    white-space: nowrap;
    text-align-last: center;
  }

  @media print {
    .card {
      border: none !important;
    }

    .card-body {
      display: none;
    }

    #print {
      display: block !important;
    }

    .card-header {
      display: none;
    }
  }
</style>
<div class="card-header">
  Cetak Surat Order Kerja
</div>

<div class="card-body">
  <div class="row">
    <div class="col-lg-3">
      <span class="custom-alignment">Tgl. Order:</span>
    </div>
    <div class="col-lg-6">
      <div class="row">
        <div class="col-lg-5">
          <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal">
        </div>
        <div class="col-lg-2 d-flex justify-content-center">
          <span style="margin-top: 5px;">s/d</span>
        </div>
        <div class="col-lg-5">
          <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir">
        </div>
      </div>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table mt-3" id="tableCetakOrderKerja">
      <thead class="table-dark">
        <tr>
          <th>No.Order</th>
          <th>Tgl. Order</th>
          <th>Nama Barang</th>
          <th>Kd.Brg</th>
          <th>JmlOrder</th>
          <th>Status Order</th>
          <th>Divisi</th>
          <th>Keterangan Order</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>

  <div class="row">
    <div class="col-lg-6">
      <div class="float-start">
        <button type="button" class="btn btn-info custom-btn" id="refresh">Refresh</button>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="float-end">
        <button type="button" class="btn btn-dark custom-btn" onclick="cetak()"><u>C</u>ETAK</button>
      </div>
    </div>
  </div>
</div>
<form action="{{ url('CetakSuratOrderKerja') }}" method="post" id="formCetakOrderKerja">
  {{ csrf_field() }}
  <input type="hidden" name="_method" id="methodForm">
  <input type="hidden" name="noOd" id="noOd">
</form>

<div id="print" style="display:none">
  <div class="container">
    <div class="divtable">
      <div class="row" style="border: solid 1px; place-items: center; border-bottom:0">
        <div class="col-6">
          <h5 style="font-weight: bolder; margin-top:8px;">P.T. KERTA RAJASA RAYA</h5>
        </div>
        <div class="col-6">
          <span style="font-weight: bold">Kode Barang <span style="margin-left: 21px">:</span> </span>
          <span id="KodeBarangPrint"></span>
        </div>
      </div>
      <div class="row" style="place-items: center; border:solid 1px; border-bottom:0">
        <div class="col-6" style="border-right: solid 1px">
          <span style="font-weight: bold">DIVISI</span>
          <span style="font-weight: bold">Teknik</span>
        </div>
        <div class="col-6">
          <span style="font-weight: bold">Nomer <span style="margin-left: 61px">:</span></span>
          <span id="idOrderPrint"></span>
        </div>
      </div>
      <div class="row" style="place-items: center; border:solid 1px; border-bottom:0">
        <div class="col-6" style="border-right: solid 1px">
          <span style="font-weight: bold">Jl. Raya Tropodo No. 1</span>
        </div>
        <div class="col-6">
          <span style="font-weight: bold">Tanggal Pesan <span style="margin-left: 10px">:</span></span>
          <span id="TglOrderPrint"></span>
        </div>
      </div>
      <div class="row" style="border: solid 1px; border-bottom:0; place-items:center">
        <div class="col-6" style="border-right: solid 1px">
          <span style="font-weight: bold">WARU - SIDOARJO</span>
        </div>
        <div class="col-6">
          <span style="font-weight:bold">Keterangan <span style="margin-left: 31px">:</span></span>
          <span id="statusPrint" style="font-weight: bold"></span>
          <span id="userPrint"></span>
        </div>
      </div>
      <div class="row" style="border: solid 1px; border-bottom:0">
        <div class="col-12" style="text-align-last: center;padding-top: 8px;">
          <h5 style="font-weight: bolder;">SURAT PESANAN KE DIVISI <span>Teknik</span></h5>
        </div>
      </div>
      <div class="row" style="border: solid 1px; padding-bottom:1%">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <span>Divisi : <span id="NamaDivisiPrint"></span></span>
            </div>
            <div class="col-6">
              <span> <span id="MesinPrint"></span></span>
            </div>
          </div>
          <div class="row" style="text-align: center; border:solid 1px; margin:5px;">
            <div class="container">
              <div class="row" style="width: 98.9%;">
                <div class="col-2" style="border-right: solid 1px">
                  <span>JUMLAH</span>
                </div>
                <div class="col-5" style="border-right: solid 1px">
                  <span>NAMA BARANG</span>
                </div>
                <div class="col-2" style="border-right: solid 1px">
                  <span>NO.GAMBAR</span>
                </div>
                <div class="col-3">
                  <span>KETERANGAN</span>
                </div>
              </div>
              {{-- <hr style="margin: 0;width: 98.9%;margin-left: -1.5%;border: 1px solid black;"> --}}
              <div class="row" style="border-top:1px solid; width: 98.9%;">
                <div class="col-2" style="border-right: solid 1px">
                  <span id="JumlahBarangPrint"></span>
                  <span id="NamaSatuanPrint"></span>
                </div>
                <div class="col-5" style="border-right: solid 1px">
                  <span id="NamaBarangPrint"></span>
                </div>
                <div class="col-2" style="border-right: solid 1px">
                  <span id="NoGambarPrint"></span>
                </div>
                <div class="col-3">
                  <span id="KeteranganOrderPrint"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
      </div>
      <div class="col-3">

      </div>
      <div class="col-3" style="text-align-last: center;">
        <span>PPIC Teknik,</span>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <span>Sidoarjo, <span id="PrintDate"></span></span>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-6">
      </div>
      <div class="col-3">

      </div>
      <div class="col-3" style="text-align-last: center;">
        <span style="margin-left:20px;margin-right:125px">(</span>
        <span style="margin-left:20px;margin-right:20px">)</span>
      </div>
    </div>
  </div>
</div>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/CetakOrderKerja.js') }}"></script>
@endsection
