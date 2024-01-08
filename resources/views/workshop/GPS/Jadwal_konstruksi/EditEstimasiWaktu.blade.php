@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Edit Estimasi Waktu</div>
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
                  <label for="tgl" class="form-label" style="padding-top: 10px">Tanggal</label>
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
              <div class="table-responsive" style="padding-top: 20px">
                <table class="table" id="TableEditEstimasiWaktu">
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
                      <th>Id Bagian</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
              <div class="mb-3">
                <label for="estimasi">Estimasi Time</label>
                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-6">
                        <input type="number" class="form-control" name="jam" placeholder="jam" id="jam">
                      </div>
                      <div class="col-6">
                        <input type="number" class="form-control" name="menit" placeholder="menit" id="menit">
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                <button type="button" class="btn btn-primary" id="btnEdit">Edit</button>
                <button type="button" class="btn btn-primary" id="btnBatal">Batal</button>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <button type="button" class="btn btn-light" id="refresh">Refresh</button>
                <input type="submit" name="proses" value="Proses" class="btn btn-primary" disabled>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- Button trigger modal -->
{{-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalEditJamKerja">
    Launch demo modal
  </button> --}}

  <!-- Modal -->
  <div class="modal fade" id="ModalEditJamKerja" tabindex="-1" role="dialog" aria-labelledby="ModalEditJamKerjaLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalEditJamKerjaLabel">Edit Jam Kerja Optimal</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="container">
                <h5>Konstruksi</h5>
                <div class="row" style="align-items: center;margin-top: 10px;">
                    <div class="col-3">
                        <span>Tanggal</span>
                    </div>
                    <div class="col-6">
                        <input type="date" class="form-control" name="TanggalModal"id="TanggalModal">
                    </div>
                </div>

                <div class="row" style="align-items: center;margin-top: 10px;">
                    <div class="col-3">
                        <span>Work Station</span>
                    </div>
                    <div class="col-6">
                        <select class="custom-select" name="WorkStationModal" style="width: 36vh;
                        height: 5vh;"
                          id="WorkStationModal">
                          <option disabled selected>Pilih Work Station</option>
                          @foreach ($data as $d)
                            <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} -- {{ $d->NamaWorkStation }}</option>
                          @endforeach
                        </select>
                    </div>
                </div>
                <div class="row" style="align-items: center;margin-top: 10px;">
                    <div class="col-3">
                        <span>Jml Jam Kerja</span>
                    </div>
                    <div class="col-6">
                        <input type="number" class="form-control" name="Jammodal" placeholder="Jam" id="Jammodal">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="btnprosesmodal">Proses</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Keluar</button>
        </div>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/GPS/JadwalKonstruksi/EditEstimasiWaktu.js') }}"></script>


@endsection
