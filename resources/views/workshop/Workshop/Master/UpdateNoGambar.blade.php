@extends('layouts.WORKSHOP.Workshop.appWorkshop')
@section('content')
@section('title', 'Update Nomor Gambar')
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
    Update Nomor Gambar
</div>
<div class="card-body">
    {{-- isi url ke web --}}
    <form id="formUpdateGambar" action="{{ url('UpdateNoGambar') }}" method="POST">
        {{ csrf_field() }}
        <input type="hidden" name="_method" id="Methodform">
        <div class="row">
            <div class="col-lg-2">
                <span class="custom-alignment">Kode Barang:</span>
            </div>
            <div class="col-lg-3">
                <input type="text" name="kd_barang" class="form-control" id="kd_barang">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="custom-alignment">Nama Barang:</span>
            </div>
            <div class="col-lg-8">
                <input type="text" name="nama_barang" class="form-control" id="nama_barang">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="custom-alignment">No. Gambar:</span>
            </div>
            <div class="col-lg-3">
                <input type="text" name="no_gambar" class="form-control" id="no_gambar">
            </div>
        </div>

        <div class="float-end">
            <button type="button" class="btn btn-primary custom-btn" onclick="klikproses()" id="proses" disabled><u>P</u>ROSES</button>
            <button type="button" class="btn btn-danger custom-btn" onclick="klikbatal()" disabled id="batal"><u>B</u>atal</button>
        </div>
    </form>
</div>

<script src="{{ asset('js/Andre-WorkShop/Workshop/UpdateNoGambar.js') }}"></script>
@endsection
