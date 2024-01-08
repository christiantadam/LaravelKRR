@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  @if (Session::has('success'))
    <div class="alert alert-success">
      {{ Session::get('success') }}
    </div>
  @elseif (Session::has('error'))
    <div class="alert alert-danger">
      {{ Session::get('error') }}
    </div>
  @endif
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Edit Jam Kerja Optimal</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form id="FormEditJam" action="{{ url('EditJam') }}" method="post">
              {{ csrf_field() }}
              <input type="hidden" name="_method" id="methodForm">
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="mb-3">
                <div class="row">
                  <div class="col-4">
                    <label for="Tanggal" class="form-label">Tanggal</label>
                  </div>
                  <div class="col">
                    <input type="Date" class="form-control" name="Tanggal" id="Tanggal">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-4">
                    <label for="WorkStation" class="form-label">Work Station</label><br>
                  </div>
                  <div class="col">
                    <select class="custom-select" name="WorkStation"
                      style="width: 36vh;
                                      height: 5vh;" id="WorkStation">
                      <option disabled selected>Pilih Work Station</option>
                      @foreach ($data as $d)
                        <option value="{{ $d->NoWrkSts }}">{{ $d->NoWrkSts }} -- {{ $d->NamaWorkStation }}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-4">
                    <label for="JlmJamKerja" class="form-label">Jumlah Jam Kerja</label>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" name="JlmJamKerja" id="JlmJamKerja">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <button type="button" class="btn btn-primary" id="btnproses" disabled>Proses</button>
                <button type="button" class="btn btn-danger" id="btnbatal" style="display: none">Batal</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <script src="{{ asset('js/Andre-WorkShop/GPS/JadwalKonstruksi/EditJadwal.js') }}"></script>
@endsection
