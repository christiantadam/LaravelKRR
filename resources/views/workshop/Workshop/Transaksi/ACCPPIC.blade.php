@extends('layouts.appWorkshop')
@section('content')
@section('title', 'ACC PPIC')
@if (Session::has('success'))
  <div class="alert alert-success">
    {{ Session::get('success') }}
  </div>
@elseif (Session::has('error'))
  <div class="alert alert-danger">
    {{ Session::get('error') }}
  </div>
@endif
<div class="card-header">ACC PPIC</div>
<div class="card-body RDZOverflow RDZMobilePaddingLR0">
  <div class="container">
    <form method="post" id="FormACCPPIC" action="{{ url('ACCPPIC') }}">
      {{ csrf_field() }}
      <input type="hidden" name="_method" id="methodForm">
      <div class="row" style="align-items: center;margin-top: 1%;">
        <div class="col-3">
          <span>Nama Pemberi</span>
        </div>
        <div class="col-9">
          <select class="form-select" name="user" style="width: 36vh;
                height: 6vh;" id="Pemberi">
            <option disabled selected>Pilih Pemberi Order</option>
            @foreach ($PPIC as $P)
              <option value="{{ $P->IdUser }}">{{ $P->Name }} -- </option>
            @endforeach
          </select>
        </div>
      </div>
      <div class="row" style="align-items: center;margin-top: 1%;">
        <div class="col-3">
          <span>Order Kerja</span>
        </div>
        <div class="col-9">
          <select class="form-select" name="nomorOrder" style="width: 36vh;
                height: 6vh;"
            id="OrderKerja">
            <option disabled selected>Pilih Order Kerja</option>
            @foreach ($List as $l)
              <option value="{{ $l->Id_Order }}">{{ $l->Nama_Brg }} -- </option>
            @endforeach
          </select>
        </div>
      </div>
      <div class="row" style="padding-top: 1%">
        <div class="col-3">
        </div>
        <div class="col-3" style="text-align-last: right;">
          <button type="button" class="btn btn-primary" id="btnproses">Proses</button>
        </div>
        <div class="col-6">

        </div>
      </div>
    </form>
  </div>
</div>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/ACCPPIC.js') }}"></script>
@endsection
