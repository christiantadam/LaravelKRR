@extends('layouts.appOrderPembelian')
@section('title', 'Final Approve Pembelian')
@section('content')
    @include('Beli/Transaksi/FinalApprove/modalDetailFinal')
    <script src="{{ asset('js/OrderPembelian/FinalApprove/FinalApprove.js') }}"></script>
    <style>
        .no-wrap {
            white-space: nowrap;
        }
    </style>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">List Final Approve</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        @php
                            $disallowed = in_array($operator, ['RUDY', 'TJAHYO', 'YUDI']);
                        @endphp
                        <div style="display: {{ $disallowed ? 'none' : 'flex' }};
                                flex-direction: column;
                                width: 20%;
                                "
                            id="parentFilterFinalApproveSelect2" class="mb-2">
                            <label>Filter Jenis Pembelian</label>
                            <select name="filterFinalApprove" id="filterFinalApprove">
                                <option value="ALL">Tampilkan Semua</option>
                                <option value="0">Beli Sendiri</option>
                                <option value="1">Pengadaan Pembelian</option>
                            </select>
                        </div>
                        <input type="hidden" name="namaUser" id="namaUser" value="{{ $operator }}">
                        <input type="hidden" id="isManager" value="{{ $isManager ? 1 : 0 }}">
                        <div style="width: 100%; overflow: auto;">
                            <table id="table_Approve" class="table table-bordered" style="width:100%;">
                                <thead class="thead-dark no-wrap">
                                    <tr>
                                        <th></th>
                                        <th>No. Trans</th>
                                        <th class="text-center">
                                            Tanggal<br>
                                            <small>(MM-DD-YYYY)</small>
                                        </th>
                                        <th>Nama Barang</th>
                                        <th>Quantity</th>
                                        <th>Harga Satuan</th>
                                        <th>Harga Total</th>
                                        <th>Divisi</th>
                                        <th>User</th>
                                        <th>Status Beli</th>
                                        <th>ACC Dir1</th>
                                        <th>ACC Dir2</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>

                    </div>
                    @php
                        $allowed = in_array($operator, ['RUDY', 'TJAHYO', 'YUDI']) || $isManager;
                    @endphp

                    <div
                        style="display: {{ $allowed ? 'flex' : 'none' }};
                        flex-direction: row;
                        width: 100%;
                    ">
                        <div style="flex: 0.5">
                            <button type="button" class="btn btn-md btn-success checkedAll">
                                Check All
                            </button>
                        </div>

                        <div class="d-flex justify-content-end mt-2" style="flex: 0.5">
                            <button type="submit" class="btn btn-md btn-primary btn_approve" name="action"
                                value="Approve">
                                Final Approve
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
