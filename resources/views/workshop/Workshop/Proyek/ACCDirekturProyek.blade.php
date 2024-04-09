@extends('layouts.appWorkshop')
@section('content')
@section('title', 'ACC Direktur Proyek')
<style>
    #TableACCDirekturProyek td{
        padding: 1px;
        white-space: nowrap;
        text-align-last: center;
    }

</style>
  <link href="{{ asset('css/Workshop/Transaksi/ACCDirekturGambar.css') }}" rel="stylesheet">
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
    ACC Direktur -- Order Proyek
  </div>

  <div class="card-body">
    <form id="formAccDirekturProyek" action="{{ url('ACCDirekturProyek') }}" method="post">
      {{ csrf_field() }}
      <input type="hidden" name="_method" id="methodForm">
      <input type="hidden" name="radiobox" id="radiobox">
      <input type="hidden" name="semuacentang" id="semuacentang">
      <input type="hidden" name="KetTdkS" id="KetTdkS">
      <div class="row">
        <div class="col-lg-7 row">

          <div class="col-lg-3">
            <span class="custom-alignment">Tgl. Order:</span>
          </div>

          <div class="col-lg-7">
            <div class="row">
              <div class="col-lg-5">
                <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal">
              </div>
              <div class="col-lg-1 d-flex justify-content-center">
                <span style="margin-top: 5px;">s/d</span>
              </div>
              <div class="col-lg-5">
                <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir">
              </div>
            </div>
          </div>

          <div class="col-lg-2">
            <button type="button" class="btn btn-primary" id="ok"><b><u>O</u>K</b></button>
          </div>

        </div>

        <div class="col-lg-5 row d-flex justify-content-center mt-1">

          <div class="col-lg-3 content-center">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radio-acc-manager-gambar" id="acc" checked>
              <label class="form-check-label" for="radio-acc-manager-gambar">
                ACC
              </label>
            </div>
          </div>

          <div class="col-lg-3 content-center">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radio-acc-manager-gambar" id="batal_acc">
              <label class="form-check-label" for="radio-acc-manager-gambar">
                Batal ACC
              </label>
            </div>
          </div>

          <div class="col-lg-4 content-center">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radio-acc-manager-gambar" id="tdk_setuju">
              <label class="form-check-label" for="radio-acc-manager-gambar">
                Tdk disetujui
              </label>
            </div>
          </div>

        </div>
      </div>
      <div class="table-responsive">
        <table class="table mt-3" style="width:max-content;" id="TableACCDirekturProyek">
          <thead class="table-dark">
            <tr>
              <th>No.Order</th>
              <th>Tgl.Order</th>
              <th>Nama Proyek</th>
              <th>Jumlah</th>
              <th>Status Order</th>
              <th>Divisi</th>
              <th>Mesin</th>
              <th>Keterangan Order</th>
              <th>PengOrder</th>
              <th>Ket. Ditolak</th>
              <th>Ket. Ditunda</th>
              <th>Ket. tdk disetujui</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>

      <div class="row mt-3">
        <div class="col-lg-6">
          <div class="keterangan keterangan-padding">
            <div class="row">
              <div class="col-lg-6">
                <span style="color: red;">xxxxx -></span>
                <span>Sudah di-ACC</span><br>

                <span style="color: green;">xxxxx -></span>
                <span>Ditolak Div. Teknik</span><br>
              </div>

              <div class="col-lg-6">
                <span style="color: deeppink;">xxxxx -></span>
                <span>Ditunda Div. Teknik</span><br>

                <span style="color: grey;">xxxxx -></span>
                <span>Tdk disetujui Direktur</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-3">
          <div class="float-start">
            <button type="button" class="btn btn-light" id="refresh">Refresh</button>
            <button type="button" class="btn btn-info" id="pilihsemua">Pilih Semua</button>
          </div>

          <div class="float-end">
            <button type="button" class="btn btn-primary" style="width: 10em;" onclick="klikproses()"><b>PROSES</b></button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/Workshop/Proyek/ACCDirekturProyek.js') }}"></script>
@endsection
