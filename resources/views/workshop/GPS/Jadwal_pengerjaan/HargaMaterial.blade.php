@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Harga Material</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form action="" method="POST">
              @csrf
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="row">
                <div class="col-6">
                    <div class="mb-3" >
                        <input type="radio" name="pilihan" value="harian">
                        <label for="harian">Harian</label>
                        <input type="radio" name="pilihan" value="Proyek">
                        <label for="Proyek">Proyek</label>
                    </div>
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
                <div class="col-6 keterangan">
                  <p style="color:rgb(0, 0, 0)">xxxxx -> : Baru</p>
                  <p style="color:rgb(49, 76, 255)">xxxxx -> : Bekas</p>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table " style="padding-top: 15px; width:max-content;" >
                    <thead class="table-dark">
                      <tr>
                        <th>Nomor Order</th>
                        <th>Divisi</th>
                        <th>Nama Barang</th>
                        <th>Kode Barang</th>
                        <th>Nomor Gambar</th>
                        <th>Jumlah Order</th>
                        <th>Tanggal Start</th>
                        <th>Nama Bagian</th>
                        <th>Type Material</th>
                        <th>Spek Material</th>
                        <th>Kode Barang Material</th>
                        <th>Jumlah Material</th>
                        <th>Harga Baru/satuan</th>
                        <th>Total Harga Baru</th>
                        <th>Harga Bekas/satuan</th>
                        <th>Total Harga Bekas</th>
                        <th>Acc Spv</th>
                        <th>Tanggal Bon</th>
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
                        <td>wadawdaw</td>
                        <td>wdawdawd</td>
                        <td>wdawd</td>
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
              </div>
              <div class="mb-3" style="padding-top: 18px">
                <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
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
