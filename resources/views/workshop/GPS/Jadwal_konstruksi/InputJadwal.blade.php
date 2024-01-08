@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    @if (Session::has('success'))
      <div class="alert alert-success">
        {{ Session::get('success') }}
      </div>
    @elseif (Session::has('error'))
      <div class="alert alert-danger">
        {{ Session::get('error') }}
      </div>
    @endif
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <form id="ForminputJadwal" action="{{ url('InputJadwalKonstruksi') }}" method="post">
            {{ csrf_field() }}
            <input type="hidden" name="_method" id="methodForm">
            <input type="hidden" name="jam_kerja" id="jam_kerja">
            <input type="hidden" name="status" id="status">
            <div class="card-header">Input Jadwal Produksi</div>
            <div class="card-body RDZOverflow RDZMobilePaddingLR0">
              <div class="row">
                <div class="col-6">
                  {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
                  <div class="mb-3">
                    <label for="NoOrder" class="form-label">Nomor Order</label>
                    <div class="row">
                      <div class="col">
                        <input type="text" class="form-control" name="NoOrder" id="NoOrder">
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
                  <div class="mb-3">
                    <label for="Pengorder" class="form-label">Pengorder</label>
                    <input type="text" class="form-control" name="Pengorder" id="Pengorder" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="KetOrder" class="form-label">Keterangan Order</label>
                    <input type="text" class="form-control" name="KetOrder" id="KetOrder" readonly>
                  </div>

                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-6">
                      <label for="estStart" class="form-label" style="color: red">est. Start <span id="estStart"
                          style="color: red"></span></label>
                    </div>
                    <div class="col-6">
                      <label for="estFinish" class="form-label" style="color: red">est. Finish <span id="estFinish"
                          style="color: red"></span></label>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="NamaBagian" class="form-label">Nama Bagian</label><br>
                    <select class="custom-select" name="NamaBagian"
                      style="width: 36vh;
                    height: 5vh;" id="NamaBagian" disabled>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="WorkStation" class="form-label">Work Station</label><br>
                    <select class="custom-select" name="WorkStation"
                      style="width: 36vh;
                    height: 5vh;" id="WorkStation" disabled>
                      <option disabled selected>Pilih Work Station</option>
                      @foreach ($data as $d)
                        <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} -- {{ $d->NamaWorkStation }}</option>
                      @endforeach
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="tglStart" class="form-label">Tanggal Start</label>
                    <div class="row">
                      <div class="col">
                        <input type="Date" class="form-control" name="tglStart" id="tglStart" disabled>
                      </div>
                      <div class="col">
                        <span style="color: red; display:none" id="tulisanjamkerja">Jam Kerja <span id="JamKerja"
                            style="color: red"></span></span>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="hariKe" class="form-label">Hari Ke</label>
                    <input type="number" class="form-control" name="hariKe" id="hariKe" disabled>
                  </div>
                  <div class="mb-3">
                    <label for="estWaktu" class="form-label">Estimasi Waktu</label>
                    <div class="row">
                      <div class="col-6">
                        <input type="number" class="form-control" name="jam" placeholder="jam" id="jam"
                          disabled>
                      </div>
                      <div class="col-6">
                        <input type="number" class="form-control" name="menit" placeholder="menit" id="menit"
                          disabled>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-danger" id="batal" type="button" disabled>Batal</button>
                    <button class="btn btn-primary" id="proses" type="button" disabled
                      onclick="prosesdiklik()">Proses</button>
                  </div>

                </div>
              </div>



            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalEdit">
    Launch demo modal
  </button>

  {{-- //modal form_edit --}}
  <div class="modal fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="ModalEditLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalEditLabel">Edit Jam Kerja Optimal - Konstruksi</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="ForminputJadwalModalEdit" action="{{ url('InputJadwalKonstruksi') }}" method="post">
            {{ csrf_field() }}
            <input type="hidden" name="_method" id="methodFormModalEdit">
            <div class="container">
              <h5>Konstruksi</h5>
              <div class="row" style="align-items: center;padding: 2%;">
                <div class="col-5">
                  <span>Tanggal</span>
                </div>
                <div class="col-5">
                  <input type="Date" class="form-control" name="Tanggal" id="Tanggal">
                </div>
                <div class="col-2">
                  <input type="text" class="form-control" name="TNoWorkSts" id="TNoWorkSts" style="display: none">
                </div>
              </div>
              <div class="row" style="align-items: center;padding: 2%;">
                <div class="col-5">
                  <span>Work Station</span>
                </div>
                <div class="col-7">
                  <select class="custom-select" name="WorkStationModalEdit"
                    style="width: 36vh;
                  height: 5vh;" id="WorkStationModalEdit" disabled>
                    <option disabled selected>Pilih Work Station</option>
                    @foreach ($data as $d)
                      <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} -- {{ $d->NamaWorkStation }}</option>
                    @endforeach
                  </select>
                </div>
              </div>
              <div class="row" style="align-items: center;padding: 2%;">
                <div class="col-5">
                  <span>Jml Jam Kerja</span>
                </div>
                <div class="col-3">
                  <input type="number" class="form-control" name="TJam" id="TJam">
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnprosesmodaledit"
            onclick="ProsesModalEdit()">Proses</button>
          <button type="button" class="btn btn-danger" id="batalmodaledit">Batal</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="keluarmodaledit">Keluar</button>
        </div>
      </div>
    </div>
  </div>


  {{-- modal form list  --}}
  <div class="modal fade" id="ModalList" tabindex="-1" role="dialog" aria-labelledby="ModalListLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalListLabel">Jadwal Pengerjaan Konstruksi</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div class="row">
                  <div class="col-4">
                    <span>WORK STATION</span>
                  </div>
                  <div class="col-6">
                    <span id="WorkStsModalList"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <span>TANGGAL</span>
                  </div>
                  <div class="col-4">
                    <span id="TanggalModalList"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <span>JAM KERJA OPTIMAL</span>
                  </div>
                  <div class="col-4">
                    <span id="JmlJamModalList"></span>
                  </div>
                  <div class="col-2">
                    <span>TERPAKAI</span>
                  </div>
                  <div class="col-2">
                    <span id="PakaiModalList"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <span>SISA JAM KERJA</span>
                  </div>
                  <div class="col-4">
                    <span id="SisaJamModalList"></span>
                  </div>
                </div>

              </div>
              <div class="col-4">
                <input type="hidden" name="TNoOdModalList" id="TNoOdModalList">
                <input type="hidden" name="TIdBagianModalList" id="TIdBagianModalList">
                <input type="hidden" name="THariModalList" id="THariModalList">
                <div class="keterangan " style="padding-left: 12%;">
                  <div class="row">
                    <span style="color: blue">xxxxx-></span>
                    <span style="color: blue">:Finish</span>
                  </div>
                  <div class="row">
                    <span style="color:red">xxxxx-></span>
                    <span style="color: red">:Finish</span>
                  </div>
                  <div class="row">
                    <span style="color: pink">xxxxx-></span>
                    <span style="color: pink">Edit EstDate/DiDelete</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="table-responsive" style="margin-top: 36px;">
              <table class="table mt-3" style="width: max-content" id="TableModalList">
                <thead class="table-dark">
                  <tr>
                    <th>No.Antrian</th>
                    <th>No.Order</th>
                    <th>Divisi</th>
                    <th>Nama Barang</th>
                    <th>Nama Bagian</th>
                    <th>Est.Time</th>
                    <th>Hari Ke-</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
            <input type="hidden" name="TNoWorkStsModalList" id="TNoWorkStsModalList">
            <input type="hidden" name="TEstTimeModalList" id="TEstTimeModalList">
            <input type="hidden" name="TEstTime1ModalList" id="TEstTime1ModalList">

          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-8">
              <span style="color: maroon">Pilih dimana pengerjaan akan disisipkan, dengan memberi cek diantara nomor antrian. Jika ingin
                diletakan di posisi teratas, cek nomor antrian yang pertama saja.</span>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-primary" id="btnprosesModalList">Proses</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/GPS/JadwalKonstruksi/InputJadwal.js') }}"></script>
@endsection
