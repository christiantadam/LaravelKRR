@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Finish Jadwal Pengerjaan</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form action="" method="POST">
              @csrf
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="row">
                <div class="col-6">
                    <div class="mb-3">
                        <label for="NoOrder" class="form-label">Nomor Order</label>
                        <div class="row">
                            <div class="col-6">
                                <input type="text" class="form-control" name="NoOrder">
                            </div>
                            <div class="col-6">
                                <input type="radio" name="pilihan" value="harian">
                                <label for="harian">Harian</label>
                                <input type="radio" name="pilihan" value="Proyek">
                                <label for="Proyek">Proyek</label>
                            </div>
                        </div>
                      </div>
                    <div class="mb-3">
                      <label for="divisi" class="form-label">Divisi</label>
                      <input type="text" class="form-control" name="divisi">
                    </div>
                    <div class="mb-3">
                      <div class="row">
                        <div class="col-6">
                          <p for="Kode_Barang" class="form-label">Kode Barang</p>
                          <input type="text" class="form-control" name="Kode_Barang">
                        </div>
                        <div class="col-6">
                          <p for="NoGambarRev" class="form-label">Nomor Gambar</p>
                          <input type="text" class="form-control" name="NoGambarRev">
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="NamaBarang" class="form-label">Nama Barang</label>
                      <input type="text" class="form-control" name="NamaBarang">
                    </div>
                    <div class="mb-3">
                      <label for="Mesin" class="form-label">Mesin</label>
                      <input type="text" class="form-control" name="Mesin">
                    </div>
                    <div class="mb-3">
                      <label for="Pengorder" class="form-label">Pengorder</label>
                      <input type="text" class="form-control" name="Pengorder">
                    </div>
                    <div class="mb-3">
                      <label for="KetOrder" class="form-label">Keterangan Order</label>
                      <input type="text" class="form-control" name="KetOrder">
                    </div>
                    <div class="mb-3">
                      {{-- width: 110vh;
          height: 7vh; --}}
                      <label for="NamaBagian" class="form-label">Nama Bagian</label><br>
                      <select class="form-select" name="NamaBagian" style="width: 36vh;
                      height: 5vh;">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                </div>
                <div class="col-6 keterangan">
                    <p style="color:rgb(55, 190, 244)">xxxxx -> : Sudah diproses Operator</p>
                    <p style="color:rgb(0, 148, 32)">xxxxx -> : Disetujui KR</p>
                    <p style="color:rgb(216, 180, 0)">xxxxx -> : Tidak disetujui KR, dijadwalkan ulang</p>
                  </div>
              </div>
              <div class="mb-3">
                <table class="table" style="padding-top: 15px">
                  <thead class="table-dark">
                    <tr>
                      <th>Nomor</th>
                      <th>Tanggal Start</th>
                      <th>Mesin</th>
                      <th>Type Mesin</th>
                      <th>Est. Time</th>
                      <th>Jumlah dikerjakan</th>
                      <th>RealTime</th>
                      <th>Jumlah Finish</th>
                      <th>Tanggal Proses OPT</th>
                      <th>Tanggal disetujui KR</th>
                      <th>Keterangan Tidak Disetujui</th>
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
                      <td>wdawd</td>
                      <td>wadawdaw</td>
                      <td>wadawdaw</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mb-3" style="display: flex;">
                <div class="col-4">
                    <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
                    <input type="submit" name="accSupervisor" value="ACC Supervisor" class="btn btn-primary">
                    <input type="submit" name="accPPIC" value="ACC PPIC" class="btn btn-primary">
                </div>
                <div class="col-4" style="justify-content: end; display:flex;">
                    <input type="submit" name="disetujui" value="Disetujui KR" class="btn btn-primary">
                    <input type="submit" name="tidakdisetujui" value="Tidak disetujui KR" class="btn btn-primary">
                </div>
                <div class="col-4" style="justify-content: end; display:flex;">
                    <input type="submit" name="Proses" value="Proses Operator" class="btn btn-primary">
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
@endsection
