@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Penerima Order Kerja')
<style>
    #tablePenerimaOrderKerja td{
        padding: 1px;
        white-space: nowrap;
        text-align-last: center;
    }
</style>
  <link href="{{ asset('css/Workshop/Transaksi/PenerimaGambar.css') }}" rel="stylesheet">
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
    Penerima Order Kerja
  </div>

  <div class="card-body">
    <form action="{{ url('PenerimaOrderKerja') }}" method="post" id="formPemerimaOrderKerja">
      {{ csrf_field() }}
      <input type="hidden" name="_method" id="methodForm">
      {{-- <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo"> --}}
      <label for="tgl_acc_direktur" style="margin: 10px 0px 0px 10px;">Tgl. ACC Direktur:</label>
      <div class="row" style="margin-bottom:10px">
        <div class="col-lg-5 row">

          <div class="col-lg-5">
            <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal">
          </div>
          <div class="col-lg-2 d-flex justify-content-center">
            <span style="margin-top: 5px;">s/d</span>
          </div>
          <div class="col-lg-5">
            <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir">
          </div>
        </div>

        <div class="col-lg-7">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-terima-kerja" id="acc_order">
                <label class="form-check-label" for="radio-terima-kerja">
                  ACC Order
                </label>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-terima-kerja" id="batal_acc">
                <label class="form-check-label" for="radio-terima-kerja">
                  Batal ACC
                </label>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-terima-kerja" id="tunda">
                <label class="form-check-label" for="radio-terima-kerja">
                  Ditunda
                </label>
              </div>
            </div>

            <div class="col-lg-3">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="radio-terima-kerja" id="order_tolak">
                  <label class="form-check-label" for="radio-terima-kerja">
                    Order Ditolak
                  </label>
                </div>
              </div>
          </div>

          <div class="row d-flex mt-1">
            <div class="col-lg-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-terima-kerja" id="order_kerja">
                <label class="form-check-label" for="radio-terima-kerja" style="width: max-content">
                  Order Dikerjakan
                </label>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-terima-kerja" id="order_selesai">
                <label class="form-check-label" for="radio-terima-kerja">
                  Order Selesai
                </label>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="radio-terima-kerja" id="order_batal">
                <label class="form-check-label" for="radio-terima-kerja" style="width: max-content">
                  Order Dibatalkan
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table mt-3" style="width: max-content" id="tablePenerimaOrderKerja">
          <thead class="table-dark" style="white-space:nowrap">
            <tr>
              <th>No. Order</th>
              <th>Tgl. Order</th>
              <th>Tgl. ACC Direktur</th>
              <th>Nama Barang</th>
              <th>Kd.Barang</th>
              <th>No.Gambar</th>
              <th>Jumlah</th>
              <th>Status Order</th>
              <th>Divisi</th>
              <th>Mesin</th>
              <th>Keterangan Order</th>
              <th>PengOrder</th>
              <th>UserOd</th>
            </tr>
          </thead>
        </table>
      </div>

      <div class="row mt-3">
        <div class="col-5">
          <div class="row">
            <div class="col-lg-12">
              <button type="button" class="btn btn-light" id="refresh">Refresh</button>
              <button type="button" class="btn btn-info" id="pilihsemua">Pilih Semua</button>
            </div>
          </div>

          <div class="row mt-4">
            <div class="keterangan keterangan-padding">
              <div class="row">
                <div class="col-lg-6">
                  <span style="color: red;">xxxxx -></span>
                  <span>Sudah diterima</span><br>

                  <span style="color: blue;">xxxxx -></span>
                  <span>Sedang dikerjakan</span><br>

                  <span style="color: hotpink;">xxxxx -></span>
                  <span>Ditunda</span><br>
                </div>

                <div class="col-lg-6">

                  <span style="color: grey;">xxxxx -></span>
                  <span>Belum Diterima</span><br>

                  <span style="color: green;">xxxxx -></span>
                  <span>DiTolak</span><br>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3">
          <div class="row mt-5">
            <div class="col-lg-6">
              <button type="button" class="btn btn-primary w-100" onclick="klikproses()"
                id="btnproses" disabled><b>PROSES</b></button>
            </div>
            <div class="col-lg-6">
              <button type="button" class="btn btn-warning w-100" id="btnkoreksi"
                onclick="koreksiklik()" disabled>KOREKSI</button>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="saldo saldo-padding mt-3">
            <div class="row">
              <div class="col-lg-5">
                <span class="custom-alignment">Saldo Primer:</span>
              </div>
              <div class="col-lg-7">
                <input type="text" name="saldo_primer" class="form-control" id="primer">
              </div>
            </div>

            <div class="row mt-1">
              <div class="col-lg-5">
                <span class="custom-alignment">Saldo Sekunder:</span>
              </div>
              <div class="col-lg-7">
                <input type="text" name="saldo_sekunder" class="form-control" id="sekunder">
              </div>
            </div>

            <div class="row mt-1">
              <div class="col-lg-5">
                <span class="custom-alignment">Saldo Tritier:</span>
              </div>
              <div class="col-lg-7">
                <input type="text" name="saldo_tritier" class="form-control" id="tertier">
              </div>
            </div>
          </div>
        </div>
        <div>
          <input type="hidden" name="iduser" id="iduser">
          <input type="hidden" name="radiobox" id="radiobox">
          <input type="hidden" name="semuacentang" id="semuacentang">
          <input type="hidden" name="KetTdkS" id="KetTdkS">
          <input type="hidden" name="ketbatal" id="ketbatal">
          <input type="hidden" name="no_order" id="no_orderkoreksi">

        </div>
      </div>
    </form>
  </div>

  <div class="modal fade" id="modaltunda" tabindex="-1" role="dialog" aria-labelledby="modaltundaLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modaltundaLabel">Pilih Alasan Order Ditunda</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="{{ url('PenerimaOrderKerja') }}" method="post" id="FormTundaModal">
            {{ csrf_field() }}
            <input type="hidden" name="_method" id="methodFormModalTunda">
            <input type="hidden" name="idorderModalTunda" id="idorderModalTunda">
            <input type="hidden" name="pembeda" id="pembeda">
            <div class="container">
              <div>
                <h3>Pilih salah satu alasan di bawah</h3>
              </div>
              <div>
                <input type="radio" id="Alasan1" name="Alasan" value="Gambar_Belum_Diterima">
                <label for="Alasan1">Gambar Belum Diterima</label><br>
                <input type="radio" id="Alasan2" name="Alasan" value="Tunggu_Antrian">
                <label for="Alasan2">Tunggu Antrian</label><br>
                <input type="radio" id="Alasan3" name="Alasan" value="Tunggu_Matras">
                <label for="Alasan3">Tunggu Matras</label><br>
                <div class="row">
                  <div class="col-3">
                    <input type="radio" id="Alasan4" name="Alasan" value="Lain_Lain">
                    <label for="Alasan4">Lain - lain</label><br>
                  </div>
                  <div class="col-6">
                    <input type="text" class="form-control" aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm" id="alasanlainlain" name="alasanlainlain">
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="prosesmodaltunda" onclick="klikprosestunda()"><u>P</u>roses</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal"
            id="batalmodaltunda"><u>B</u>atal</button>
        </div>
      </div>
    </div>
  </div>



  <div class="modal fade bd-example-modal-lg" id="ModalKoreksi" tabindex="-1" role="dialog"
    aria-labelledby="ModalKoreksiLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="container">
            <div class="row">
              <div class="col-7" style="text-align: -webkit-right;">
                <h5 class="modal-title" id="ModalKoreksiLabel">Workshop</h5>
              </div>
              <div class="col-4">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <form action="{{ url('PenerimaOrderKerja') }}" method="post" id="FormKoreksiModal">
          {{ csrf_field() }}
          <input type="hidden" name="_method" id="methodFormModalKoreksi">
          <div class="modal-body">
            <div class="container">
              <div class="row" style="align-items: center;">
                <div class="col-3">
                  <span>Tanggal Order</span>
                </div>
                <div class="col-4">
                  <input type="date" name="tglOrder" class="form-control" id="tglOrder">
                </div>
                <div class="col-5" style="text-align-last: center;">
                  <span id="LabelStatus" style="color: hotpink"></span>
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>No. Order</span>
                </div>
                <div class="col-4">
                  <input type="text" name="NoOrder" class="form-control" id="NoOrder">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>No. Gambar</span>
                </div>
                <div class="col-3">
                  <input type="text" name="NoGambar" class="form-control" id="NoGambar">
                </div>
                <div class="col-3">
                  <span>Kd. Barang</span>
                </div>
                <div class="col-3">
                  <input type="text" name="KdBarang" class="form-control" id="KdBarang">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>Divisi</span>
                </div>
                <div class="col-6">
                  <input type="text" name="Divisi" class="form-control" id="Divisi">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>Nama Barang</span>
                </div>
                <div class="col-8">
                  <input type="text" name="NamaBarang" class="form-control" id="NamaBarang">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>Keterangan Order</span>
                </div>
                <div class="col-8">
                  <input type="text" name="KeteranganOrder" class="form-control" id="KeteranganOrder">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>Jumlah Order</span>
                </div>
                <div class="col-3">
                  <input type="text" name="JumlahOrder" class="form-control" id="JumlahOrder">
                </div>
                <div class="col-3">
                  <span>Jumlah Odr. Selesai</span>
                </div>
                <div class="col-3">
                  <input type="text" name="JumlahOrderSelesai" class="form-control" id="JumlahOrderSelesai">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>Tgl. Start</span>
                </div>
                <div class="col-3">
                  <input type="date" name="TanggalStart" class="form-control" id="TanggalStart">
                </div>
                <div class="col-3">
                  <span>Tgl. Finish</span>
                </div>
                <div class="col-3">
                  <input type="date" name="TanggalFinish" class="form-control" id="TanggalFinish">
                </div>
              </div>

              <div class="row" style="align-items: center; margin-top:10px">
                <div class="col-3">
                  <span>Operator</span>
                </div>
                <div class="col-2">
                  <input type="text" name="Usermodalkoreksi" class="form-control" id="Usermodalkoreksi"
                    style="color: blue; font-weight:bold;" readonly>
                </div>
                <div class="col-3">
                  <input type="text" name="LblNamaUser" class="form-control" id="LblNamaUser" readonly>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-6">
                  <div class="saldo saldo-padding mt-3">
                    <div class="row">
                      <div class="col-lg-5">
                        <span class="custom-alignment">Saldo Primer:</span>
                      </div>
                      <div class="col-lg-7">
                        <input type="text" name="saldo_primer" class="form-control" id="primermodal">
                      </div>
                    </div>

                    <div class="row mt-1">
                      <div class="col-lg-5">
                        <span class="custom-alignment">Saldo Sekunder:</span>
                      </div>
                      <div class="col-lg-7">
                        <input type="text" name="saldo_sekunder" class="form-control" id="sekundermodal">
                      </div>
                    </div>

                    <div class="row mt-1">
                      <div class="col-lg-5">
                        <span class="custom-alignment">Saldo Tritier:</span>
                      </div>
                      <div class="col-lg-7">
                        <input type="text" name="saldo_tritier" class="form-control" id="tertiermodal">
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <input type="hidden" name="Tsts" id="Tsts">
                </div>
                <div class="col-6" style="text-align: -webkit-right;">
                  <button type="button" class="btn btn-primary" id="prosesmodalkoreksi"
                    onclick="prosesmodalklik()"><u>P</u>roses</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal"
                    id="batalmodalkoreksi"><u>B</u>atal</button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/PenerimaOrderKerja.js') }}"></script>
@endsection
