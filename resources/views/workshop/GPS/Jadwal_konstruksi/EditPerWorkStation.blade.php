@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
<link href="{{ asset('css/GPS/Color.css') }}" rel="stylesheet">


  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Edit Jadwal Per Workstation</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form action="" method="POST">
              @csrf
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="row">
                <div class="col-6">
                  {{-- width: 110vh;
                        height: 7vh; --}}
                  <div class="row">
                    <div class="col-4">
                      <label for="WorkStation" class="form-label">Work Station</label><br>
                    </div>
                    <div class="col-6">
                      <select class="custom-select" name="WorkStation"
                        style="width: 36vh;
                          height: 5vh;" id="WorkStation">
                        <option disabled selected>Pilih Work Station</option>
                        @foreach ($data as $d)
                          <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} -- {{ $d->NamaWorkStation }}</option>
                        @endforeach
                      </select>
                    </div>
                  </div>
                  <div class="row" style="padding-top: 1%">
                    <div class="col-4">
                      <label for="tgl" class="form-label" style="padding-top: 10px">Tanggal</label>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <div class="col-8">
                          <input type="Date" class="form-control" name="tgl" id="tgl">
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-primary" id="btnok" disabled>OK</button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
                <div class="col-6 keterangan">
                  <p style="color:red">xxxxx -> : Emergency</p>
                  <p style="color:#fa8599">xxxxx -> : Edit EstDate/ Didelete</p>
                </div>
              </div>
              <div class="table-responsive">
                  <table class="table" style="padding-top: 15px; white-space:nowrap" id="TableEditPerWorkstation">
                    <thead class="table-dark">
                      <tr>
                        <th>Nomor</th>
                        <th>No Order</th>
                        <th>Tanggal Start</th>
                        <th>Divisi</th>
                        <th>Nama Barang</th>
                        <th>Nama Bagian</th>
                        <th>Est. Time</th>
                        <th>Hari ke-</th>
                        <th>IdBagian</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
              <div class="mb-3">
                <p style="color: red">Cek nomor yang mau diedit posisinya, dan cek posisi barunya.</p>

              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-light" id="refresh">Refresh</button>
                  </div>
                  <div class="col-6" style="text-align-last: right;">
                    <button type="button" class="btn btn-primary" id="proses" onclick="prosesklik()">Proses</button>
                    <button type="button" class="btn btn-danger" id="batal" style="display: none">Batal</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/GPS/JadwalKonstruksi/EditJadwaLPerWorkStation.js') }}"></script>
@endsection
