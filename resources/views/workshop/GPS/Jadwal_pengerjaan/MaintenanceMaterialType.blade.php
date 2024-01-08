@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Maintenance Material Type </div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <form action="" method="POST">
              @csrf
              {{-- harus sama name nya dengan nama colom tabel yang di isi --}}
              <div class="mb-3">
                <label for="MaterialType" class="form-label">Material Type</label><br>
                <select class="form-select" name="MaterialType" style="width: 36vh;
                height: 5vh;">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="mb-3">
                <input type="submit" name="isi" value="Isi" class="btn btn-primary">
                <input type="submit" name="koreksi" value="Koreksi" class="btn btn-primary">
                <input type="submit" name="hapus" value="Hapus" class="btn btn-primary">
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
