@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Proses Pemberi Gambar')
<style>
  #tableProsesPembeli td {
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
      /* z-index: 2 !important; */
    }

    .card-header {
      display: none;
    }

    .modal {
      display: none !important;
      /* visibility: hidden !important; */
      /* z-index: -1 !important; */
      /* color: transparent; */
    }

    .fade {
      opacity: 0 !important;
    }
  }
</style>
@if (Session::has('success'))
  <div class="alert alert-success">
    {{ Session::get('success') }}
  </div>
@elseif (Session::has('error'))
  <div class="alert alert-danger">
    {{ Session::get('error') }}
  </div>
@endif

<div class="card-header">
  Proses Pemberi Gambar
</div>

<div class="card-body">
  <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">

  <div class="row">
    <div class="col-lg-2">
      <span class="custom-alignment">Tgl. Order:</span>
    </div>

    <div class="col-lg-5">
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
    <table class="table mt-3" style="width: max-content" id="tableProsesPembeli">
      <thead class="table-dark">
        <tr>
          <th>No. Order</th>
          <th>Tgl. Order</th>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Divisi</th>
          <th>Status Order</th>
          <th>Keterangan Order</th>
          <th>Peng-order</th>
          <th>No. Gambar</th>
          <th>Nm. Brg</th>
        </tr>
      </thead>
    </table>
  </div>


  <div class="mt-3">
    <form action="{{ url('ProsesPembeliGambar') }}" method="post" id="formproses">
      {{ csrf_field() }}
      <input type="hidden" name="_method" id="methodForm">
      <input type="hidden" name="nogam" id="nogam">
      <input type="hidden" name="idorder" id="idorder">
      <input type="hidden" name="gambar" id="gambar">
      <div class="float-start" style="margin-left: 12.5px;">
        <button type="button" class="btn btn-primary" style="width: 12.5em;"
          onclick="klikproses()"><b>PROSES</b></button>
        <button type="button" class="btn btn-light custom-btn" id="refresh">Refresh</button>
      </div>
    </form>

    <div class="float-end" style="margin-right: 12.5px;">
      <button type="button" class="btn btn-dark custom-btn" style="margin-right: 18vh" data-toggle="modal"
        data-target="#ModalCetak">CETAK</button>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="ModalCetak" tabindex="-1" role="dialog" aria-labelledby="ModalCetakLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalCetakLabel">Cetak Surat Order Gambar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container" style="text-align: center;">
          <div class="row" style="place-items: center">
            <div class="col-2">
              <span>Tgl. Order</span>
            </div>
            <div class="col-3">
              <input type="date" class="form-control" name="Tglawalmodal" id="Tglawalmodal">
            </div>
            <div class="col-1">
              <span>s/d</span>
            </div>
            <div class="col-3">
              <input type="date" class="form-control" name="Tglakhirmodal" id="Tglakhirmodal">
            </div>
          </div>

          <div class="table-responsive">
            <table class="table mt-3" id="TableCetakModal">
              <thead class="table-dark">
                <tr>
                  <th>No. Order</th>
                  <th>Tgl. Order</th>
                  <th>Nama Barang</th>
                  <th>Status Order</th>
                  <th>Divisi</th>
                  <th>Keterangan Order</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <button type="button" class="btn btn-success" id="refreshModal">Refresh</button>
            </div>
            <div class="col-6" style="text-align-last: right;">
              <button type="button" class="btn btn-dark" onclick="cetak()">Cetak</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="print" style="display:none">
  <div class="container">
    <div class="divtable">
      <div class="row" style="border: solid 1px; place-items: center; border-bottom:0">
        <div class="col-6">
          <h5 style="font-weight: bolder; margin-top:8px;">P.T. KERTA RAJASA RAYA</h5>
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
          <span id="KeteranganPrint" style="font-weight: bold"></span>
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
              <span>/ <span id="MesinPrint"></span></span>
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
                <div class="col-5">
                  <span>KETERANGAN</span>
                </div>
              </div>
              {{-- <hr style="margin: 0;width: 98.9%;margin-left: -1.5%;border: 1px solid black;"> --}}
              <div class="row" style="border-top:1px solid; width: 98.9%;">
                <div class="col-2" style="border-right: solid 1px">
                  <span>1</span>
                  <span id="NamaSatuanPrint"></span>
                </div>
                <div class="col-5" style="border-right: solid 1px">
                  <span id="NamaBarangPrint"></span>
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
        <span>Sidoarjo, <span id="PrintDate"></span></span>
      </div>
    </div>
  </div>
</div>
<form action="{{ url('ProsesPembeliGambar') }}" method="post" id="formPembeliGambar">
  {{ csrf_field() }}
  <input type="hidden" name="_method" id="methodForm">
  <input type="hidden" name="noOd" id="noOd">
</form>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/ProsesPembeliGambar.js') }}"></script>
@endsection
