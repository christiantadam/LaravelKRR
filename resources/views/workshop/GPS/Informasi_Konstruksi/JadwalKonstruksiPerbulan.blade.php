@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Jadwal Konstruksi Per Bulan</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <div class="row">
              <div class="col-6">
                <label for="tgl" class="form-label">Tanggal</label>
                <div class="row">
                  <div class="col-3">
                    <input type="date" class="form-control" id="start-date">
                  </div>
                  <p style="padding-top: 8px">s/d</p>
                  <div class="col-3">
                    <input type="date" class="form-control" id="end-date">
                  </div>
                  <div class="col-3">
                    <a href="#" class="btn btn-primary" onclick="generateTableHeaders()">OK</a>
                  </div>
                </div>
              </div>
              <div class="col-6 keterangan">
                <div class="row">
                  <p style="color:rgb(49, 76, 255)">xxxxx -> : Finish Total</p>
                  <p style="padding-left: 10vh"># ->: Edit EstimasiDate / DiDelete</p>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table" style="padding-top: 15px; width:max-content;">
                  <thead class="table-dark" id="table-header">
                    <tr>
                      <th>Nomor Order</th>
                      <th>Nama Barang</th>
                      <th>Nama Bagian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mb-3">
                <input type="submit" name="refresh" value="Refresh" class="btn btn-primary">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
@endsection

<script>
  function generateTableHeaders() {
    var startDateInput = document.getElementById('start-date');
    var endDateInput = document.getElementById('end-date');
    var tableHeader = document.getElementById('table-header');

    var startDate = new Date(startDateInput.value);
    var endDate = new Date(endDateInput.value);

    var current = new Date(startDate);
    var tableHTML = '';

    while (current <= endDate) {
      var date = current.getDate();
      var month = current.getMonth() + 1;
      var year = current.getFullYear();

      var formattedDate = (date);
      tableHTML += '<th>' + formattedDate + '</th>';

      current.setDate(current.getDate() + 1);
    }

    tableHeader.innerHTML = '<tr><th>Nomor Order</th><th>Nama Barang</th><th>Nama Bagian</th>' + tableHTML + '</tr>';
  }
</script>
