@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Mesin')
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
    Maintenance Mesin
  </div>

  <div class="card-body">
    <form id="maintenanceMesin" action="{{ url('MaintenanceMesin') }}" method="POST">
      {{ csrf_field() }}
      <input type="hidden" name="_method" id="methodForm">
      <div class="row">
        <div class="col-lg-2">
          <span class="custom-alignment">Divisi:</span>
        </div>

        <div class="col-lg-6">
          <select class="form-select" name="divisi" style="width: 36vh;
                height: 6vh;" id="divisi"
            disabled>
            <option disabled selected>Pilih Divisi</option>
            @foreach ($divisi as $d)
              <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} -- {{ $d->NamaDivisi }}</option>
            @endforeach
          </select>
          <input type="hidden" name="iddivisi" id="iddivisi">
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-lg-2">
          <span class="custom-alignment">Nama Mesin:</span>
        </div>

        <div class="col-lg-7">
          <div class="row">
            <div class="col-5">
              <select class="form-select" name="mesin" style="width: 36vh;
                      height: 6vh;"
                id="mesin" disabled>
                <option disabled selected>Pilih Mesin</option>
              </select>
              <input type="text" name="isiMesin" class="form-control" style="display: none" id="isiMesin">
            </div>
            <div class="col-5">
              <button class="btn btn-light" onclick="tukar(event)" id="ganti" disabled>ganti</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-lg-8" style="text-align-last: center;">
          <div class="justify-content-center">
            <button type="button" class="btn btn-success custom-btn" id="isi"
              onclick="Isidiklik()"><u>I</u>SI</button>
            <button type="button" class="btn btn-warning custom-btn" id="koreksi"
              onclick="koreksidiklik()"><u>K</u>OREKSI</button>
            <button type="button" class="btn btn-danger custom-btn" id="hapus"
              onclick="hapusdiklik()"><u>H</u>APUS</button>
            <button type="button" class="btn btn-danger custom-btn" id="batal" style="display: none"
              onclick="bataldiklik()"><u>B</u>atal</button>
            <button type="button" class="btn btn-primary custom-btn" id="proses" disabled
              onclick="prosesdiklik()"><u>P</u>ROSES</button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <script src="{{ asset('js/Andre-WorkShop/Workshop/MaintenanceMesin.js') }}"></script>
@endsection
