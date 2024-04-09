@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Order Kerja')
<style>
    #TableOrderKerja td{
        padding: 1px;
        white-space: nowrap;
        text-align-last: center;
    }
    #TableOrderKerja th{
        white-space: nowrap;
    }

</style>
  <div class="card-header">
    Informasi Order Kerja
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

      <div class="col-lg-5" style="padding: 17.5px;">

        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio-lacak-gambar" id="pengorder">
          <label class="form-check-label" for="radio-lacak-gambar">
            Sebagai Pengorder
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="radio-lacak-gambar" id="terima_order">
          <label class="form-check-label" for="radio-lacak-gambar">
            Sebagai Penerima Order
          </label>
        </div>

      </div>
    </div>
    <div class="table-responsive">
      <table class="table mt-3" style="width: max-content" id="TableOrderKerja">
        <thead class="table-dark">
          <tr>
            <th>No. Order</th>
            <th>Tgl. Order</th>
            <th>Divisi</th>
            <th>Nama Barang</th>
            <th>KodeBarang</th>
            <th>No.Gambar</th>
            <th>Mesin</th>
            <th>JmlOrder</th>
            <th>Status Order</th>
            <th>Ket. Order</th>
            <th>PengOrder</th>
            <th>ACC Mngr</th>
            <th>Tanggal ACC Dir</th>
            <th>ACC PPIC</th>
            <th>Ket. ACC PPIC</th>
            <th>ACC D.Teknik</th>
            <th>Tanggal Start</th>
            <th>Tanggal Finish</th>
            <th>JmlFinish</th>
            <th>TdkStj Mngr</th>
            <th>Ket. TdkStj Mngr</th>
            <th>Tanggal TdkStj Dir</th>
            <th>Ket. TdkStj Dir</th>
            <th>Ditunda D.Teknik</th>
            <th>Ket. Ditunda D.Teknik</th>
            <th>Ditolak D.Teknik</th>
            <th>Ket. Ditolak D.Teknik</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>

    <div class="mt-3">
      <div class="float-start" style="margin-left: 12.5px;">
        <button type="button" class="btn btn-light custom-btn" id="refresh">Refresh</button>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/Workshop/Informasi/OrderKerja.js') }}"></script>
@endsection
