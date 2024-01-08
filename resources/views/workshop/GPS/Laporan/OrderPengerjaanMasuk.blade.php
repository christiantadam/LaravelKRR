@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Order Pengerjaan yang Masuk
          </div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <div class="mb-3">
                <label for="bulan">Bulan</label>
                <input type="text">
                <label for="tahun">Tahun</label>
                <input type="text">
            </div>
            <table class="table" style="padding-top: 15px">
                <thead class="table-dark">
                  <tr>
                    <th>Bulan</th>
                    <th>Order Masuk</th>
                    <th>    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                  </tr>
                </tbody>
              </table>
        </div>
        </div>
      </div>
    </div>
  </div>
@endsection
