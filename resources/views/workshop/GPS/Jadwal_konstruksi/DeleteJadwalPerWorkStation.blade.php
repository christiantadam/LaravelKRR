@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Delete Jadwal Per WorkStation</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form action="" method="POST">
              @csrf
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="row">
                <div class="col-6">
                  {{-- width: 110vh;
                        height: 7vh; --}}
                  <label for="WorkStation" class="form-label">Work Station</label><br>
                  <select class="form-select" name="WorkStation" style="width: 36vh;
                  height: 5vh;">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <br>
                  <label for="tgl" class="form-label" style="padding-top: 10px">Tanggal</label>
                  <div class="row">
                    <div class="col-3">
                      <input type="Date" class="form-control" name="tgl">
                    </div>
                    <p style="padding-top: 8px">s/d</p>
                    <div class="col-3">
                      <input type="Date" class="form-control" name="tgl">
                    </div>
                    <div class="col-3">
                      <a href="" class="btn btn-primary">OK</a>
                    </div>
                  </div>


                </div>
                <div class="col-6 keterangan">
                  <p style="color:red">xxxxx -> : Emergency</p>
                  <p style="color:rgb(198, 53, 198)">xxxxx -> : Ditolak</p>
                </div>
              </div>
              <table class="table" style="padding-top: 15px">
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox">
                      John
                    </td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                    <td>wdwadw</td>
                    <td>wdawdawd</td>
                    <td>wdawdawd</td>
                    <td>wdawd</td>
                    <td>wadawdaw</td>
                  </tr>
                </tbody>
              </table>
              <div class="mb-3">
                <p style="color: red">Untuk lebih dari 1 jadwal yang akan diHapus. dengan alasan yang sama, maka dapat
                  diproses bersamaan</p>
              </div>
              <div class="mb-3">
                <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                <input type="submit" name="PilihSemua" value="Pilih Semua" class="btn btn-primary">
                <input type="submit" name="proses" value="Proses" class="btn btn-primary" disabled>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
@endsection
