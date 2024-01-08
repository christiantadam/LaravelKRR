@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  @if (Session::has('success'))
    <div class="alert alert-success">
      {{ Session::get('success') }}
    </div>
  @elseif (Session::has('error'))
    <div class="alert alert-danger">
      {{ Session::get('error') }}
    </div>
  @endif
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Maintenance Bagian Gambar</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form id="FormMaintenanceGambar" action="{{ url('MaintenanceGambar') }}" method="post">
              {{ csrf_field() }}
              <input type="hidden" name="_method" id="methodForm">
              <div class="row">
                <div class="col-6">

                  {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
                  <div class="mb-3">
                    <label for="NoOrder" class="form-label">Nomor Order</label>
                    <div class="row">
                      <div class="col">
                        <input type="text" class="form-control" name="NoOrder" id="NoOrder" disabled>
                      </div>
                      <div class="col" style="align-self: center;">
                        <span id="OdSts"></span>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="divisi" class="form-label">Divisi</label>
                    <input type="text" class="form-control" name="divisi" id="divisi" readonly>
                  </div>
                  <div class="mb-3">
                    <div class="row">
                      <div class="col-6">
                        <p for="Kode_Barang" class="form-label">Kode Barang</p>
                        <input type="text" class="form-control" name="Kode_Barang" id="Kode_Barang" readonly>
                      </div>
                      <div class="col-6">
                        <p for="NoGambarRev" class="form-label">Nomor Gambar Revisi</p>
                        <input type="text" class="form-control" name="NoGambarRev" id="NoGambarRev" readonly>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="NamaBarang" class="form-label">Nama Barang</label>
                    <input type="text" class="form-control" name="NamaBarang" id="NamaBarang" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="Mesin" class="form-label">Mesin</label>
                    <input type="text" class="form-control" name="Mesin" id="Mesin" readonly>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="Pengorder" class="form-label">Pengorder</label>
                    <input type="text" class="form-control" name="Pengorder" id="Pengorder" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="KetOrder" class="form-label">Keterangan Order</label>
                    <input type="text" class="form-control" name="KetOrder" id="KetOrder" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="NamaBagian" class="form-label">Nama Bagian</label><br>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" name="NamaBagiantext" id="NamaBagiantext"
                              style="display: none">
                            <select class="custom-select" name="NamaBagian" id="NamaBagian"
                              style="width: 36vh;
                                height: 5vh;" disabled>
                            </select>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary" id="ubah" type="button" style="display: none">Ganti</button>
                        </div>
                    </div>
                  </div>
            </form>
            <div class="mb-3">
              <button class="btn btn-primary" id="Isi" onclick="isi()" type="button">Isi</button>
              <button id="Koreksi" class="btn btn-warning" type="button" onclick="koreksiklik()">Koreksi</button>
              <button id="Hapus" class="btn btn-danger" type="button" onclick="hapusdiklik()">Hapus</button>
              <button type="button" id="Proses" class="btn btn-success" onclick="prosesdiklik()"
                disabled>Proses</button>
              <button type="button" id="Batal" class="btn btn-danger" style="display: none"
                onclick="Bataldiklik()">Batal</button>
            </div>


          </div>
        </div>


      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/GPS/JadwalKonstruksi/MaintenanceGambar.js') }}"></script>
@endsection
