@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Histori Proses Konstruksi
          </div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <div class="mb-3">
                    <input type="radio" name="pilihan" value="harian">
                    <label for="harian">Harian</label>
                    <input type="radio" name="pilihan" value="Proyek">
                    <label for="Proyek">Proyek</label>
            </div>
           <div class="mb-3">
               <label for="NamaBarang">Nama Barang</label>
               <input type="text" name="namaBarang">
           </div>
           <div class="mb-3">
            <label for="KodeBarang">Kode Barang</label>
            <input type="text" name="KodeBarang">
        </div>
           <div class="mb-3">
            <div class="row">
                <div class="col-4">
                    <label for="NoOrder">Nomor Order</label>
                    <input type="text" name="NoOrder">
                </div>
                <div class="col-6">
                    <label for="NamaBagian" class="form-label">Nama Bagian</label>
                    <select class="form-select" name="NamaBagian" style="width: 36vh;
                    height: 5vh;">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                </div>
            </div>
           </div>
           <div class="mb-3">
            <p style="color: red">Tekan "Enter" pada no. order, untuk menampilkan seluruh bagian. Atau tekan "Spasi", untuk memilih 1 bagian.</p>
          </div>
          <div class="mb-3">
            <table class="table" style="padding-top: 15px">
                <thead class="table-dark">
                  <tr>
                    <th>Nomor Order</th>
                    <th>Divisi</th>
                    <th>Nama Barang</th>
                    <th>kode Barang</th>
                    <th>Nomor Gambar</th>
                    <th>Nama Bagian</th>
                    <th>Jumlah Order</th>
                    <th>Total biaya</th>
                    <th>Finish KR</th>
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
                    <td>wdwadw</td>
                    <td>wdawdawd</td>
                    <td>wdawdawd</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="mb-3">
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-primary">Refresh</button>
                    <button class="btn btn-primary">Harga Material</button>
                    <button class="btn btn-primary">Harga S/Part</button>
                    <button class="btn btn-primary">Makloon</button>
                </div>
                <div class="col-6">
                    <label for="Total">Total Biaya Rp.</label>
                    <input type="text">
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
