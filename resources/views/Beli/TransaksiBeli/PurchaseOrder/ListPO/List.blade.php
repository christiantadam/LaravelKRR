@extends('layouts.appOrderPembelian')
@section('title', 'List PO')

@section('content')
    <link href="{{ asset('css/ListPurchaseOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
<style>
    .modal_email_supplier {
        margin-top: 15vh;
    }

    .btn-action {
        min-height: 50px;
        font-size: 15px;
    }

</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">

            @if (Session::has('success'))
                <div class="alert alert-success">{{ Session::get('success') }}</div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">{{ Session::get('error') }}</div>
            @endif

            <div class="card font-weight-bold">
                <div class="card-header">List Purchase Order</div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="row align-items-end g-3">

                        <!--Filter berdasarkan Tanggal-->
                        <div class="col-md-5">
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="radiobutton" value="between_date" checked>
                                <label class="form-check-label">Between Date</label>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <input type="date" class="form-control font-weight-bold" id="betwendate1">
                                <span>s/d</span>
                                <input type="date" class="form-control font-weight-bold" id="betwendate2">
                            </div>
                        </div>

                        <!--Filter berdasarkan No PO-->
                        <div class="col-md-5">
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="radiobutton" value="nomor_po">
                                <label class="form-check-label">Nomor PO</label>
                            </div>
                            <input type="text" class="form-control font-weight-bold" id="no_po">
                        </div>


                        <div class="col-md-2">
                            <button class="btn btn-info w-100" id="redisplayButton">
                                Redisplay
                            </button>
                        </div>
                    </div>


                   <div class="d-flex justify-content-end gap-2 mt-4 flex-wrap">

                        <button id="downloadPdf" class="btn btn-warning btn-sm btn-action">
                            Export To Pdf
                        </button>

                        <button id="btn_email_supplier" class="btn btn-success btn-sm btn-action">
                            Email Supplier
                        </button>

                        <button id="lihat_BTTB" class="btn btn-primary btn-sm btn-action">
                            Lihat BTTB
                        </button>

                    </div>


                    <div class="table-responsive mt-4">
                        <table class="table table-bordered" id="tabelchelsy" style="width:100%">
                            <thead class="table-primary">
                                <tr>
                                    <th>No. PO</th>
                                    <th>Status</th>
                                    <th>Tanggal PO<br>(DD-MM-YYYY)</th>
                                    <th>Divisi</th>
                                    <th>User</th>
                                    <th>No. BTTB</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>


{{-- MOdal Kirim Email --}}
<div class="modal fade" id="modalEmailSupplier" tabindex="-1">
    <div class="modal-dialog modal-md modal_email_supplier">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Kirim Email ke Supplier (Hanya melihat data email)</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <input type="hidden" id="email_no_po">

                <div class="mb-3">
                    <label>Email Supplier</label>
                    <input type="email" id="email_supplier" class="form-control" readonly>
                </div>

            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button class="btn btn-primary" id="btn_kirim_email">Kirim Email</button>
            </div>

        </div>
    </div>
</div>


<script src="{{ asset('js/OrderPembelian/ListPO/List.js') }}"></script>
@endsection
