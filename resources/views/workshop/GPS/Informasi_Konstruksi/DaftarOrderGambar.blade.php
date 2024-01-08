@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Daftar Order Gambar</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="row">
                <div class="col-6">
                  <label for="tgl" class="form-label">Tanggal</label>
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
                <div class="col-3 keterangan">
                  <p style="color:rgb(49, 76, 255)">xxxxx -> : Finish Total</p>
                </div>
              </div>

              <table class="table " style="padding-top: 15px; width:max-content;">
                <thead class="table-dark">
                  <tr>
                    <th>Nomor Order</th>
                    <th>Divisi</th>
                    <th>Nama Barang</th>
                    <th>Nama Bagian</th>
                    <th>Status Order</th>
                    <th>Tanggal Start</th>
                    <th>Tanggal Finish</th>
                    <th>Total Biaya</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                    <td>wdwadw</td>
                    <td>wdawdawd</td>
                    <td>wdawdawd</td>
                    <td>wdawd</td>
                    <td>wdawd</td>
                  </tr>
                </tbody>
              </table>

              <div class="mb-3" style="padding-top: 18px">
                <div class="row">
                    <div class="col-6">
                        <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-3">
                                <p>Total Biaya Rp.</p>
                            </div>
                            <div class="col-6">
                                <input type="text">
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
@endsection
