@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <link href="{{ asset('css/GPS/Color.css') }}" rel="stylesheet">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Edit Estimasi Tanggal</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form action="" method="POST">
              @csrf
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="row">
                <div class="col-6">
                  {{-- width: 110vh;
                        height: 7vh; --}}
                  <label for="WorkStation" class="form-label">Work Station</label><br>
                  <select class="custom-select" name="WorkStation" style="width: 36vh;
                    height: 5vh;"
                    id="WorkStation">
                    <option disabled selected>Pilih Work Station</option>
                    @foreach ($data as $d)
                      <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} -- {{ $d->NamaWorkStation }}</option>
                    @endforeach
                  </select>
                  <br>
                  <label for="tgl" class="form-label" style="padding-top:10px;">Tanggal</label>
                  <div class="row">
                    <div class="col-6">
                      <input type="Date" class="form-control" name="tgl" id="tgl">
                    </div>
                    <div class="col-6">
                      <button type="button" class="btn btn-primary" id="btnok" disabled>OK</button>
                    </div>
                  </div>


                </div>
                <div class="col-6 keterangan">
                  <p style="color:red">xxxxx -> : Emergency</p>
                </div>
              </div>
              <div class="table-responsive" style="padding-top: 15px">
                <table class="table" id="tableEditEstimasiTanggal">
                  <thead class="table-dark" style="white-space: nowrap">
                    <tr>
                      <th>Nomor Antrian</th>
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
                <p style="color: red">Untuk lebih dari 1 jadwal yang akan diEdit. dengan alasan yang sama, maka dapat
                  diproses bersamaan</p>
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

  <div class="modal fade" id="modalalasan" tabindex="-1" role="dialog" aria-labelledby="modalalasanLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <h5>Pilih salah satu alasan di bawah ini :</h5>
            </div>
            {{-- <div class="row"> --}}
            <input type="radio" id="MaterialNotReady" name="alasan" value="MaterialNotReady">
            <label for="MaterialNotReady">Material not ready</label><br>
            <input type="radio" id="MesinRusak" name="alasan" value="MesinRusak">
            <label for="MesinRusak">Mesin rusak</label><br>
            <input type="radio" id="SpekMesinTerbatas" name="alasan" value="SpekMesinTerbatas">
            <label for="SpekMesinTerbatas">Spek Mesin Terbatas</label><br>
            <input type="radio" id="Instruksi" name="alasan" value="Instruksi">
            <label for="Instruksi">Instruksi</label><br>
            <div class="row">
              <div class="col-3">
                <input type="radio" id="Lain" name="alasan" value="Lain">
                <label for="Lain">Lain - lain</label>
              </div>
              <div class="col-6">
                <input type="text" class="form-control" name="alasanLain" id="alasanLain">
              </div>
            </div>
            {{-- </div> --}}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnokmodal" onclick="okemodal()" data-dismiss="modal">OK</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Batal</button>
        </div>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/GPS/JadwalKonstruksi/EditEstimasiTanggal.js') }}"></script>
@endsection
