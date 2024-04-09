@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Drafter')
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
    Maintenance Drafter
  </div>

  <div class="card-body">
    <form id="maintenanceDrafter" action="{{ url('MaintenanceDrafter') }}" method="POST">
        {{ csrf_field() }}
        <input type="hidden" name="_method" id="methodForm">
      <div class="row">
        <div class="col-lg-2">
          <span class="custom-alignment">User Drafter:</span>
        </div>

        <div class="col-lg-4">
          <select class="form-select" name="UserDrafter" style="width: 36vh;
                height: 6vh;"
            id="UserDrafter">
            <option disabled selected>Pilih Drafter</option>
            @foreach ($drafter as $d)
              <option value="{{ $d->IdUser }}">{{ $d->IdUser }} -- {{ $d->NamaPembuat }}</option>
            @endforeach
          </select>
          <input type="text" name="UsrDraf" class="form-control" id="UsrDraf" style="display: none" maxlength="3">
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-lg-2">
          <span class="custom-alignment">Nama:</span>
        </div>

        <div class="col-lg-6">
          <input type="text" name="nama" class="form-control" id="NamaDrafter" readonly>
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

  <script src="{{ asset('js/Andre-WorkShop/Workshop/MaintenanceDrafter.js') }}"></script>
@endsection
