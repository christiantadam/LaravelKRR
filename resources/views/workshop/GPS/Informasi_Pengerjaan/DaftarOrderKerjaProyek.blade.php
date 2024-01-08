@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Daftar Order Kerja & Proyek</div>
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
                <p style="color:rgb(49, 76, 255)">xxxxx -> : Not Ready</p>
              </div>
            </div>
            <div class="table-responsive">
                <table class="table " style="padding-top: 15px; width:max-content;">
                  <thead class="table-dark">
                    <tr>
                      <th>Nomor Order</th>
                      <th>DM</th>
                      <th>Nama Barang</th>
                      <th>Nama Bagian</th>
                      <th>Tanggal Start</th>
                      <th>Kode Barang</th>
                      <th>Divisi</th>
                      <th>Status Order</th>
                      <th>Jumlah Order</th>
                      <th>Tanggal Finish</th>
                      <th>Status Mtr</th>
                      <th>Total Biaya</th>
                      <th>Tanggal Bon</th>

                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
            </div>

            <div class="mb-3" style="padding-top: 18px">
              <div class="row">
                <div class="col-6">
                  <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                  <input type="submit" name="MaterialOK" value="Material OK" class="btn btn-primary">
                  <input type="submit" name="BonMaterial" value="Bon Material" class="btn btn-primary">
                </div>
                <div class="col-6">
                  <div class="row" style="justify-content:right">
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
