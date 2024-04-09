@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Order Gambar')
<link href="{{ asset('css/Workshop/Transaksi/MaintenanceOrderGambar.css') }}" rel="stylesheet">
  @if (Session::has('success'))
    <div class="alert alert-success">
      {{ Session::get('success') }}
    </div>
  @elseif (Session::has('error'))
    <div class="alert alert-danger">
      {{ Session::get('error') }}
    </div>
  @endif
  <div class="card-header">
    Maintenance Order Gambar
  </div>

  <div class="card-body">
    <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">

    <div class="row">
      <div class="col-lg-6">

        <div class="row">
          <div class="col-lg-3">
            <span class="custom-alignment">Tgl. Order:</span>
          </div>

          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-5">
                <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal" style="width: 106%">
              </div>
              <div class="col-lg-2 d-flex justify-content-center">
                <span style="margin-top: 5px;">s/d</span>
              </div>
              <div class="col-lg-5">
                <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir" style="width: ">
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-3">
            <span class="custom-alignment">Divisi:</span>
          </div>

          <div class="col-lg-9">
            <select class="form-select" name="KodeDivisi" style="width: 36vh;
                        height: 6vh;"
              id="kddivisi">
              <option disabled selected>Pilih Divisi</option>
              @foreach ($divisi as $d)
                <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} -- {{ $d->NamaDivisi }}</option>
              @endforeach
            </select>
          </div>
        </div>

        <div class="table-responsive" style="margin-top: 5vh">
          <table class="table mt-3" style="width: max-content;" id="tableklik">
            <thead class="table-dark">
              <tr>
                <th>No. Order</th>
                <th>Tgl. Order</th>
                <th>Nama Barang</th>
                <th>Status Order</th>
                <th>No_Gbr_Revisi</th>
                <th>Mesin</th>
                <th>Kd. Brg</th>
              </tr>
            </thead>
            <tbody id="datatable" style="width: max-content">

            </tbody>
          </table>
        </div>
        <div class="div" style="margin-top: 12px">
          <button class="btn btn-light custom-btn" type="button" onclick="Refresh()">Refresh</button>
        </div>

      </div>
      <div class="col-lg-6">
        <div class="div" style="text-align: -webkit-center; ">
          <h5 id="status" style="text-align: -webkit-center;"></h5>
        </div>
        <form id="formMaintenanceOrderGambar" method="POST">
          {{ csrf_field() }}
          <input type="hidden" name="_method" id="methodForm">

          <div class="row">
            <div class="col-lg-5">
              <span class="custom-alignment">No. Order:</span>
            </div>

            <div class="col-lg-5">
              <input type="text" name="no_order" class="form-control" id="no_order" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">No. Gambar Rev:</span>
            </div>

            <div class="col-lg-5">
              <input type="text" name="no_gambar_rev" class="form-control" id="no_gambar_rev">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Jumlah:</span>
            </div>

            <div class="col-lg-5">
              <div class="input-group">
                <input type="number" name="jmlh1" class="form-control" value="1" id="jmlh1">
                <input type="text" name="jmlh2" class="form-control" style="width: 7.5vw;" id="jmlh2">
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Keterangan Order:</span>
            </div>

            <div class="col-lg-7">
              <input type="text" name="keterangan_order" class="form-control" id="keterangan_order">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Peng-Order:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="pengorder" class="form-control" id="pengorder">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">ACC Manager:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="acc_manager" class="form-control" id="acc_manager" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Manager:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="manager" class="form-control" id="manager" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">ACC Direktur:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="acc_direktur" class="form-control" id="acc_direktur" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment" style="white-space: nowrap">Tgl. tdk disetujui Manager:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="tgl_manager" class="form-control" id="tgl_manager" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment" style="white-space: nowrap">Ket. tdk disetujui Manager:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="ket_manager" class="form-control" id="ket_manager">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment" style="white-space: nowrap">Tgl. tdk disetujui Direktur:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="tgl_direktur" class="form-control" id="tgl_direktur" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment" style="white-space: nowrap">Ket. tdk disetujui Direktur:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="ket_direktur" class="form-control" id="ket_direktur">
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Tgl. Ditolak Div. Teknik:</span>
            </div>

            <div class="col-lg-6">
              <input type="date" name="tgl_teknik" class="form-control" id="tgl_teknik" readonly>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-5">
              <span class="custom-alignment">Ket. Ditolak Div. Teknik:</span>
            </div>

            <div class="col-lg-6">
              <input type="text" name="ket_teknik" class="form-control" id="ket_teknik">
            </div>
          </div>

          <div class="row mt-3 d-flex justify-content-center">
            <div class="col-lg-12 content-center">
              <div>
                <button type="button" class="btn btn-success custom-btn" onclick="klikisi()"
                  id="isi">ISI</button>
                <button type="button" class="btn btn-warning custom-btn" onclick="klikkoreksi()"
                  id="koreksi">KOREKSI</button>
                <button class="btn btn-danger custom-btn" id="hapus">HAPUS</button>
              </div>
            </div>
            {{--
            <div class="col-lg-2 content-center">
              <button type="button" class="btn btn-secondary custom-btn">KELUAR</button>
            </div> --}}
          </div>

          <div class="keterangan keterangan-padding mt-3">
            <div class="row">
              <div class="col-lg-6">
                <span style="color: red;">xxxxx -></span>
                <span> : ACC Direktur</span><br>

                <span style="color: green;">xxxxx -></span>
                <span> : Ditolak Div. Teknik</span><br>

                <span style="color: brown;">xxxxx -></span>
                <span> : Tdk disetujui Manager</span><br>
              </div>

              <div class="col-lg-6">
                <span style="color: blue;">xxxxx -></span>
                <span> : ACC Manager</span><br>

                <span style="color: grey;">xxxxx -></span>
                <span> : Tdk disetujui Direktur</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>


  <!-- Modal isi baru -->
  <div class="modal fade" id="isibaru" tabindex="-1" role="dialog" aria-labelledby="isibarulabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style=" display: flex;justify-content: space-between;align-items: center;">
          <div class="modal-title-container" style="flex: 1;text-align: center;">
            <h5 class="modal-title" id="isibarutitle">Judul Modal</h5>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form method="post" id="formbaru" action="{{ url('MaintenanceOrderGambar') }}">
          {{ csrf_field() }}
          <input type="hidden" name="_method" id="methodFormBaru">
          <input type="hidden" name="iddivisibaru" id="iddivisimodalbaru">
          <div class="modal-body">


            <span><b>Buat Gambar Baru</b></span>

            <div class="row">
              <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                <span class="custom-alignment">Tanggal</span>
              </div>

              <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                <input type="date" name="TglMaintenanceGambarBaru" class="form-control"
                  id="TglMaintenanceGambarBaru">
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                <span class="custom-alignment">Nama Barang</span>
              </div>

              <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                <input type="text" name="NamaBarang" class="form-control" id="NamaBarang">
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                <span class="custom-alignment">Keterangan</span>
              </div>

              <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                <input type="text" name="Keterangan" class="form-control" id="Keterangan">
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                <span class="custom-alignment">Jumlah</span>
              </div>

              <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                <div class="input-group">
                  <input type="number" name="jumlahbaru" class="form-control" value="1" id="jumlahbaru">
                  <select class="form-select" name="Satuan" style="width: 36vh;" id="satuanB">
                    <option disabled selected>Pilih Satuan</option>
                    @foreach ($satuan as $s)
                      <option value="{{ $s->No_Satuan }}">{{ $s->Nama_Satuan }}</option>
                    @endforeach
                  </select>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                <span class="custom-alignment">Mesin</span>
              </div>

              <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                <div class="input-group">
                  <select class="form-select" name="Mesin" style="width: 36vh; height: 6.6vh;" id="Mesin">
                  </select>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                <span class="custom-alignment">Peng-Order</span>
              </div>

              <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                <input type="text" name="PengorderBaru" class="form-control" id="PengorderBaru" readonly style="color: blue;font-weight: bold;">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <input type="hidden" name="TNoD" id="TNoD">
            <button type="button" class="btn btn-primary" id="prosesbaru">Proses</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          </div>
        </form>


      </div>
    </div>
  </div>

  <!-- Modal modifikasi-->
  <div class="modal fade" id="modifikasi" tabindex="-1" role="dialog" aria-labelledby="modifikasiLabel"
    aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title-container" style="flex: 1;text-align: center;">
            <h5 class="modal-title" id="isimodifikasititle">Judul Modal</h5>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="" method="post" id="formModifikasi" action="{{ url('MaintenanceOrderGambar') }}">
          {{ csrf_field() }}
          <input type="hidden" name="_method" id="methodFormModifikasi">
          <input type="hidden" name="iddivisimodif" id="iddivisimodalmodif">

          <div class="modal-body">
            <div class="container">
              <span><b>Modifikasi Gambar</b></span>

              <div class="row">
                <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                  <span class="custom-alignment">Tanggal</span>
                </div>

                <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                  <input type="date" name="TglMaintenanceGambarBaru" class="form-control"
                    id="TglMaintenanceGambarmodif">
                </div>
              </div>

              <div class="row" style="margin-left: 12.5vh;margin-top: 3vh;">
                <div class="col">
                  <div class="row">
                    <div class="col-6"> <!-- Updated class: col-lg-4 -->
                      <span class="custom-alignment">Kd. Barang</span>
                    </div>

                    <div class="col-6"> <!-- Updated class: col-lg-8 -->
                      <input type="text" name="KodeBarang" class="form-control" id="KodeBarang">
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="row">
                    <div class="col-6"> <!-- Updated class: col-lg-4 -->
                      <span class="custom-alignment">No. Gambar Rev</span>
                    </div>

                    <div class="col-6"> <!-- Updated class: col-lg-8 -->
                      <input type="text" name="GambarRev" class="form-control" id="GambarRev">
                    </div>
                  </div>
                </div>
              </div>


              <div class="row mt-3">
                <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                  <span class="custom-alignment">Nama Barang</span>
                </div>

                <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                  <input type="text" name="NamaBarang" class="form-control" id="NamaBarangModif">
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                  <span class="custom-alignment">Keterangan Modifikasi</span>
                </div>

                <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                  <input type="text" name="KeteranganModif" class="form-control" id="KeteranganModif">
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                  <span class="custom-alignment">Jumlah</span>
                </div>

                <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                  <div class="input-group">
                    <input type="number" name="jumlahbaru" class="form-control" value="1" id="jumlahbaru">
                    <select class="form-select" name="Satuan" style="width: 36vh;" id="satuanmodif">
                      <option disabled selected>Pilih Satuan</option>
                      @foreach ($satuan as $s)
                        <option value="{{ $s->No_Satuan }}">{{ $s->Nama_Satuan }}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                  <span class="custom-alignment">Mesin</span>
                </div>

                <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                  <div class="input-group">
                    <select class="form-select" name="Mesin" style="width: 36vh; height: 6.6vh;" id="MesinModif">
                    </select>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-lg-4"> <!-- Updated class: col-lg-4 -->
                  <span class="custom-alignment">Peng-Order</span>
                </div>

                <div class="col-lg-8"> <!-- Updated class: col-lg-8 -->
                  <input type="text" name="PengorderBaru" class="form-control" id="PengorderModif" readonly style="color: blue;font-weight: bold;">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col" style="padding-left: 37vh" hidden>
                  <div class="row">
                    <div class="col-4"> <!-- Updated class: col-lg-4 -->
                      <span class="custom-alignment">lblKdDivisi</span>
                    </div>

                    <div class="col-8"> <!-- Updated class: col-lg-8 -->
                      <input type="text" name="lblKdDivisi" class="form-control" id="pembedaStore">
                    </div>
                  </div>
                </div>
                <div class="col" style="text-align-last: right;">
                  <input type="hidden" name="TNoDModif" id="TNoDModif">
                  <button type="button" class="btn btn-primary" id="prosesmodifikasi">Proses</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/MaintenanceOrderGambar.js') }}"></script>
@endsection
