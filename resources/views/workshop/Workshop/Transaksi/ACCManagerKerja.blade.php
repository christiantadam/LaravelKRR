@extends('layouts.WORKSHOP.Workshop.appWorkshop')
@section('content')
@section('title', 'ACC Manager Kerja')
  <link href="{{ asset('css/Workshop/Transaksi/ACCManagerGambar.css') }}" rel="stylesheet">
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
    ACC Manager Kerja
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <div class="row" style="align-items: center;">
            <div class="col-2">
              <label for="divisi">Divisi :</label>
            </div>
            <div class="col">
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
      </div>
      <div class="col-6">
        <input type="radio" name="pilihan" value="ACC" checked id="acc">
        <label for="ACC">ACC</label>
        <input type="radio" name="pilihan" value="BatalACC" id="batal_acc">
        <label for="batal">Batal ACC</label>
        <input type="radio" name="pilihan" value="TdkSetuju" id="tdk_setuju">
        <label for="Tidak">Tidak Disetujui</label>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="table-responsive">
          <table class="table table-hover mt-3" style="width: max-content" id="ACCManagerKerjatable">
            <thead>
              <tr>
                <th>No. Order</th>
                <th>Tgl. Order</th>
                <th>Nama Barang</th>
                <th>Status Order</th>
                <th>No. Gambar</th>
                <th>Mesin</th>
                <th>Tgl. Tdk Disetujui Manager</th>
                <th>Ket. Tdk Disetujui Manager</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="mb-3">
          <button class="btn btn-light custom-btn" id="btnrefresh">Refresh</button>
          <button class="btn btn-primary custom-btn" id="btnpilihsemua">Pilih Semua</button>

        </div>
        <div class="saldo">
          <div class="row" style="padding-left: 4vh">
            <div class="col-3">
              <label for="Primer">Saldo Primer</label>
            </div>
            <div class="col-6">
              <input type="text" id="primer">
            </div>
          </div>
          <div class="row" style="padding-left: 4vh">
            <div class="col-3">
              <label for="Sekunder">Saldo Sekunder</label>
            </div>
            <div class="col-6">
              <input type="text" id="sekunder">
            </div>
          </div>
          <div class="row" style="padding-left: 4vh">
            <div class="col-3">
              <label for="Tertier">Saldo Tertier</label>
            </div>
            <div class="col-6">
              <input type="text" id="tertier">
            </div>
          </div><br>
        </div>
      </div>
      <div class="col-lg-6">
        <form method="post" id="formAccManagerkerja" action="{{ url('ACCManagerKerja') }}">
          {{ csrf_field() }}
          <input type="hidden" name="_method" id="methodForm">
          <div class="row">
            <div class="col-lg-5">
              <span class="custom-alignment">User ACC</span>
            </div>

            <div class="col-lg-5">
              <input type="text" name="UserACC" class="form-control" id="UserACC">
            </div>
          </div>
          <div class="row">
            <div class="col-lg-5">
              <span class="custom-alignment">No. Order:</span>
            </div>

            <div class="col-lg-5">
              <input type="text" name="no_order" class="form-control" id="no_order">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Kode Barang:</span>
            </div>

            <div class="col-lg-5">
              <input type="text" name="Kode_Barang" class="form-control" id="Kode_Barang">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Nomor Gambar:</span>
            </div>

            <div class="col-lg-5">
              <input type="text" name="Nomor_Gambar" class="form-control" id="Nomor_Gambar">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Jumlah:</span>
            </div>

            <div class="col-lg-5">
              <div class="input-group">
                <input type="number" name="jmlh1" class="form-control" id="jmlh1">
                <input type="text" name="jmlh2" class="form-control" style="width: 7.5vw;" id="jmlh2">
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Keterangan Order:</span>
            </div>

            <div class="col-lg-7">
              <input type="text" name="keterangan_order" class="form-control" id="keterangan_order">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Peng-Order:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="pengorder" class="form-control" id="pengorder">
            </div>
          </div>


          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">ACC Direktur:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="acc_direktur" class="form-control" id="acc_direktur">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Tgl. tdk disetujui Direktur:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="tgl_direktur" class="form-control" id="tgl_direktur">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Ket. tdk disetujui Direktur:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="ket_direktur" class="form-control" id="ket_direktur">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Tgl. Ditolak Div. Teknik:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="tgl_teknik" class="form-control" id="tgl_teknik">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Ket. Ditolak Div. Teknik:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="ket_teknik" class="form-control" id="ket_teknik">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Ket. Ditunda Div. Teknik:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="tunda_teknik" class="form-control" id="tunda_teknik">
            </div>
          </div>

          <div class="row mt-3 d-flex justify-content-center">
            <div class="col-lg-8 content-center">
              <div>
                <button type="button" class="btn btn-primary custom-btn" onclick="klikproses()" style="padding: 6% 56%;">Proses</button>
                <input type="hidden" name="radiobox" id="radiobox">
                <input type="hidden" name="semuacentang" id="semuacentang">
                <input type="hidden" name="KetTdkS" id="KetTdkS">
              </div>
            </div>
          </div>
          <br>
          <div class="keterangan">
            <div class="row">
              <div class="col-lg-6">
                <span style="color: red;">xxxxx -></span>
                <span>ACC Direktur</span><br>

                <span style="color: magenta;">xxxxx -></span>
                <span>Ditunda Div. Teknik</span><br>

                <span style="color: green;">xxxxx -></span>
                <span>Ditolak Div. Teknik</span><br>

              </div>

              <div class="col-lg-6">
                <span style="color: blue;">xxxxx -></span>
                <span>Sudah diACC</span><br>

                <span style="color: grey;">xxxxx -></span>
                <span>Tdk disetujui Direktur</span><br>

                <span style="color: brown;">xxxxx -></span>
                <span>Tdk disetujui Manager</span><br>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/ACCManagerKerja.js') }}"></script>
@endsection
