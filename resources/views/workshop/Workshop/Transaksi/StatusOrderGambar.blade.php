@extends('layouts.WORKSHOP.Workshop.appWorkshop')
@section('content')
@section('title', 'Status Order Gambar')
<style>
    #tablestatus td{
        padding: 1px;
        white-space: nowrap;
        text-align-last: center;
    }

</style>
  <link href="{{ asset('css/Workshop/Transaksi/PenerimaGambar.css') }}" rel="stylesheet">
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
    Status Order Gambar
  </div>

  <div class="card-body">
    <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">

    <div class="row">
      <div class="col-lg-7">

        <div class="row">
          <div class="col-lg-4">
            <span class="custom-alignment">Tgl. Order:</span>
          </div>

          <div class="col-lg-8">
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

        <div class="row mt-3">
          <div class="col-lg-4">
            <span class="custom-alignment">Divisi:</span>
          </div>

          <div class="col-lg-8">
            <select class="form-select" name="KodeDivisi" style="width: 36vh;
                        height: 6vh;"
              id="kddivisi">
              <option disabled selected>Pilih Divisi</option>
              @foreach ($divisi as $d)
                <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} -- {{ $d->NamaDivisi }}</option>
              @endforeach
            </select>
          </div>
        </div>

      </div>

      <div class="col-lg-5">

        <div class="keterangan keterangan-padding mt-3">
          <div class="row">
            <div class="col-lg-6">
              <span style="color: blue;">xxxxx -></span>
              <span>Sudah Selesai</span>
            </div>

            <div class="col-lg-6">
              <span>xxxxx -></span>
              <span>Belum Selesai</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="table-responsive">
      <table class="table mt-3" style="width:max-content;" id="tablestatus">
        <thead class="table-dark">
          <tr>
            <th>No. Order</th>
            <th>Tgl. Order</th>
            <th>Nama Barang</th>
            <th>Kode Barang</th>
            <th>Jumlah</th>
            <th>Mesin</th>
            <th>Status order</th>
            <th>Keterangan Order</th>
            <th>Peng-order</th>
            <th>No. Gambar</th>
            <th>Kd. Brg</th>
            <th>Nm. Brg</th>
            <th>Acc Bpk. Peter</th>
            <th>UserOD</th>
            <th>Tgl. Finish</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
    <form action="{{ url('StatusOrderGambar') }}" method="post" id="formterima">
        {{ csrf_field() }}
        <input type="hidden" name="_method" id="methodForm">
        <input type="hidden" name="nomorOrderForm" id="nomorOrder">
        <input type="hidden" name="noGambarForm" id="noGambarForm">
    </form>

    <div class="mt-3">
      <div class="float-start" style="margin-left: 12.5px;">
        <button type="button" class="btn btn-primary" style="width: 12.5em;" onclick="klikterima()"><b>Terima Gambar</b></button>
        <button type="button" class="btn btn-light custom-btn" id="refresh">Refresh</button>
      </div>


    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/StatusOrderGambar.js') }}"></script>
@endsection
