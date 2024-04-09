@extends('layouts.appOrderPembelian')
@section('content')
@include('Beli/Transaksi/ListOrder/modalDetailListOrder')
<script src="{{ asset('js/OrderPembelian/ListOrder.js') }}"></script>
<script>
    $(document).ready( function () {
    $('#table_ListOrder').DataTable({
        searching: false,
        order: [[1, 'desc']],

    });


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    // today1 = mm + '/' + dd + '/' + yyyy;
    today1 = yyyy + '-' + mm + '-' + dd;
    console.log(today1);
    document.getElementById("tglAwal").value=today1;
    document.getElementById("tglAkhir").value=today1;
} );
</script>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                @if(Auth::user()->status==1)
                <div class="card-header" >List Order</div>
                @else
                <div class="card-header" >Home</div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="border-bottom:1px solid;padding-bottom: 10px;">
                        <div class="form-row align-items-center RDZFilter">
                          <div class="col-auto">
                            <label class="col-form-label">Divisi</label>
                          </div>
                          <div class="col-auto">
                            <select class="form-control Filter" id="divisi">
                                @foreach($dataDiv as $item1)
                                <option>{{$item1->Kd_div}}</option>
                                @endforeach
                            </select>
                          </div>
                          <div class="col-auto">
                            <label class="col-form-label">Tgl. Awal</label>
                          </div>
                          <div class="col-auto">
                            <input type="date" class="form-control Filter" id="tglAwal" name="tglAwal">
                          </div>
                          <div class="col-auto">
                            <label class="col-form-label">Tgl. Akhir</label>
                          </div>
                          <div class="col-auto">
                            <input type="date" class="form-control Filter" id="tglAkhir" name="tglAkhir">
                          </div>
                          <br>
                          <div class="col-auto">
                            <div class="form-check form-switch">
                              <input class="form-check-input Filter" type="checkbox" value="" id="Me">
                              <label class="form-check-label" for="flexCheckDefault">
                                Tampilkan Hanya Saya
                              </label>
                            </div>
                          </div>
                        </div>

                    </div>
                    <br>
                    <table id="table_ListOrder" class="table table-bordered table-striped"  style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>No. Trans</th>
                                <th class="RDZCenterTable">Tanggal<br><label style="font-size: 10px; margin-bottom: 0px;">(MM-DD-YYYY)</label></th>
                                <th>Nama Barang</th>
                                <th>Status</th>
                                <th>User</th>
                                <th>Divisi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($data as $item)
                            <tr>
                                <td><a data-id="{{$item->No_trans}}" class="Detail_ListOrder" id="NoTrans" href="">{{$item['No_trans']}}</a></td>
                                <td>{{date('m-d-Y', strtotime($item->Tgl_order))}}</td>
                                <td>{{$item['NAMA_BRG']}} <label style="background-color:#00ff00;">{{$item['Qty']}} {{$item['Nama_satuan']}}</label></td>
                                <td>{{$item['Status']}}</td>
                                <td>{{$item['Nama']}}</td>
                                <td>{{$item['Kd_div']}}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
