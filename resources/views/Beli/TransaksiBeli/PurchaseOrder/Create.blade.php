@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/CreatePurchaseOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <script>
        $(document).ready(function() {
            $('#table_PurchaseOrder').DataTable({
                order: [
                    [1, 'desc']
                ],

            });


            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // var yyyy = today.getFullYear();

            // // today1 = mm + '/' + dd + '/' + yyyy;
            // today1 = yyyy + '-' + mm + '-' + dd;
            // console.log(today1);
            // document.getElementById("tglAwal").value=today1;
            // document.getElementById("tglAkhir").value=today1;
        });
    </script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Daftar Order</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-form">
                            <div class="acs-form1">
                                <div class="acs-form">
                                    <input type="radio" name="filter_radioButton" id="filter_radioButton1" value="Divisi"
                                        class="radio-button" checked>Divisi
                                </div>
                                <div class="acs-form" style="border: 0.5px solid grey" id="filter_radioButtonDivisiDiv">
                                    <select name="divisi_select" id="divisi_select" class="input">
                                        <option disabled selected>-- Pilih Divisi --</option>
                                        <option value="ALL">ALL</option>
                                        @foreach ($divisi as $data)
                                            <option value="{{ $data->KD_DIV }}">{{ trim($data->NM_DIV) }}</option>
                                        @endforeach
                                    </select>
                                    <input type="radio" name="filter_divisiRadioButton" id="filter_divisiRadioButton1"
                                        value="PengadaanPembelian" class="radio-button" checked> Pengadaan Pembelian
                                    <input type="radio" name="filter_divisiRadioButton" id="filter_divisiRadioButton2"
                                        value="Beli Sendiri" class="radio-button"> Beli Sendiri
                                </div>
                            </div>
                            <div class="acs-form2">
                                <div class="acs-form">
                                    <input type="radio" name="filter_radioButton" id="filter_radioButton2" value="User"
                                        class="radio-button">User
                                </div>
                                <input type="text" name="filter_radioButtonUserInput" id="filter_radioButtonUserInput">
                            </div>
                            <div class="acs-form2">
                                <div class="acs-form">
                                    <input type="radio" name="filter_radioButton" id="filter_radioButton3" value="Order"
                                        class="radio-button"> Order
                                </div>
                                <input type="text" name="filter_radioButtonOrderInput" id="filter_radioButtonOrderInput">
                            </div>
                            <div class="acs-form2">
                                <button class="btn btn-success" id="redisplay">Redisplay</button>
                            </div>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table id="table_PurchaseOrder" class="table table-bordered table-striped" style="width:100%">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Supplier</th>
                                        <th>Id_Div</th>
                                        <th>User</th>
                                        <th>Status Beli</th>
                                        <th>Nomor Order</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Sub Kategori</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>Harga Unit</th>
                                        <th>Sub Total</th>
                                        <th>PPN</th>
                                        <th>Harga Total</th>
                                        <th>Currency</th>
                                        <th>Tgl. Dibutuhkan</th>
                                        <th>Ket. Order</th>
                                        <th>Ket. Internal</th>
                                        <th>AppManager</th>
                                        <th>AppPBL</th>
                                        <th>AppDireksi</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="button-align-right">
                            <div>
                                <input type="checkbox" name="checkbox_centangSemuaBaris"
                                    id="checkbox_centangSemuaBaris">Centang Semua
                            </div>

                            <form action="{{ url('openFormCreateSPPB/create') }}" id="form_createSPPB" method="GET">
                                <button class="btn btn-success" id="create_po">Create PO</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/CreatePurchaseOrder.js') }}"></script>
    @endsection
