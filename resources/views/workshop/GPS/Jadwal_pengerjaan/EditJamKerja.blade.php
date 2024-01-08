@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Edit Jam Kerja Optimal</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                            <form action="" method="POST">
                              @csrf
                              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
                              <div class="mb-3">
                                <label for="Tanggal" class="form-label">Tanggal</label>
                                <input type="Date" class="form-control" name="Tanggal">
                              </div>
                              <div class="mb-3">
                                <label for="NamaMesin" class="form-label">Nama Mesin</label><br>
                                <select class="form-select" name="NamaMesin" style="width: 36vh;
                                height: 5vh;">
                                  <option selected>Open this select menu</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                                <div class="mb-3">
                                    <label for="TypeMesin" class="form-label">Type Mesin</label><br>
                                    <select class="form-select" name="TypeMesin" style="width: 36vh;
                                    height: 5vh;">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    </select>
                                </div>
                              <div class="mb-3">
                                <label for="JlmJamKerja" class="form-label">Jumlah Jam Kerja</label>
                                <input type="text" class="form-control" name="JlmJamKerja">
                              </div>
                              <div class="mb-3">
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
