@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'List Semua Order')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/ListOrderPembelian.css') }}" rel="stylesheet">
<script>
    $(document).ready(function() {
        $("#tabelData").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            order: [
                [2, 'desc']
            ],
            ajax: {
                url: "{{ url('getAllOrder') }}",
                dataType: "json",
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}"
                }
            },
            columns: [{
                    data: "NO_ORDER", // No. Order {{-- 0 --}}
                },
                {
                    data: "STATUS_PO", // Status Order  {{-- 1 --}}
                },
                {
                    data: "TglAprMGR", // Tgl. Approve Mgr. {{-- 2 --}}
                    render: function(data, type, row) {
                        if (data != null) {
                            // console.log(data);
                            let parts = data.split(" ")[0].split("-");
                            let time = data.split(" ")[1].split(".");
                            // console.log(parts);

                            let tgl = parts[2] + "-" + parts[1] + "-" + parts[0] + " " + time[
                                0];
                            return tgl;
                        } else {
                            return '';
                        }
                    },
                },
                {
                    data: "STATUS_BELI", // Status Beli {{-- 3 --}}
                },
                {
                    data: "NO_PO", // No. PO {{-- 4 --}}
                },
                {
                    data: "TGL_PO", // Tgl. PO {{-- 5 --}}
                    render: function(data, type, row) {
                        if (data != null) {
                            let parts = data.split(" ")[0].split("-");
                            let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                            return tgl;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    data: "KODE_BARANG", // Kode Barang {{-- 6 --}}
                },
                {
                    data: "NM_BARANG", // Nama Barang {{-- 7 --}}
                },
                {
                    data: "SUB_KATEGORI", // Sub Kategori {{-- 8 --}}
                },
                {
                    data: "SUPPLIER", // Supplier {{-- 9 --}}
                },
                {
                    data: "PriceUnit", // Price Unit {{-- 10 --}}
                    render: function(data) {
                        if (data != null) {
                            return parseFloat(data).toFixed(2);
                        } else {
                            return ''
                        }
                    }
                },
                {
                    data: "PPN", // PPN (%) {{-- 11 --}}
                    render: function(data) {
                        if (data != null) {
                            return parseFloat(data).toFixed(2);
                        } else {
                            return ''
                        }
                    }
                },
                {
                    data: "QTY_PO", // Qty. PO {{-- 12 --}}
                    render: function(data) {
                        if (data != null) {
                            return parseFloat(data).toFixed(2);
                        } else {
                            return ''
                        }
                    }
                },
                {
                    data: "SATUAN", // Satuan {{-- 13 --}}
                },
                {
                    data: "PAY_TERM", // Payment Term {{-- 14 --}}
                },
                {
                    data: "NM_USER", // Nama User {{-- 15 --}}
                },
                {
                    data: "NM_DIVISI", // Nama Divisi {{-- 16 --}}
                },
                {
                    data: "No_BTTB", // No. BTTB {{-- 17 --}}
                },
                {
                    data: "TGL_DATANG", // Tgl. Datang {{-- 18 --}}
                    render: function(data, type, row) {
                        if (data != null) {
                            let parts = data.split(" ")[0].split("-");

                            let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                            return tgl;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    data: "NOTELINE", // Keterangan Order {{-- 19 --}}
                },
                {
                    data: "Ket_Internal", // Keterangan Internal {{-- 20 --}}
                },
            ],
        });
    });
</script>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Semua Order</div>
                <div class="card-body ">
                    <div class="scrollmenu">
                        <table id="tabelData" class="table table-bordered" style="width:100%;white-space:nowrap">
                            <thead class="table-primary">
                                <tr>
                                    <th>No. Order</th> {{-- 0 --}}
                                    <th>Status Order</th> {{-- 1 --}}
                                    <th>Tgl. Approve Mgr.</th> {{-- 2 --}}
                                    <th>Status Beli</th> {{-- 3 --}}
                                    <th>No. PO</th> {{-- 4 --}}
                                    <th>Tgl. PO</th> {{-- 5 --}}
                                    <th>Kode Barang</th> {{-- 6 --}}
                                    <th>Nama Barang</th> {{-- 7 --}}
                                    <th>Sub Kategori</th> {{-- 8 --}}
                                    <th>Supplier</th> {{-- 9 --}}
                                    <th>Price Unit</th> {{-- 10 --}}
                                    <th>PPN (%)</th> {{-- 11 --}}
                                    <th>Qty. PO</th> {{-- 12 --}}
                                    <th>Satuan</th> {{-- 13 --}}
                                    <th>Payment Term</th> {{-- 14 --}}
                                    <th>Nama User</th> {{-- 15 --}}
                                    <th>Nama Divisi</th> {{-- 16 --}}
                                    <th>No. BTTB</th> {{-- 17 --}}
                                    <th>Tgl. Datang</th> {{-- 18 --}}
                                    <th>Keterangan Order</th> {{-- 19 --}}
                                    <th>Keterangan Internal</th> {{-- 20 --}}
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
