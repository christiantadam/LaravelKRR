@extends('layouts.appOrderPembelian')
@section('title', 'Final Approve Pembelian')
@section('content')

    <script src="{{ asset('js/OrderPembelian/FinalApprove/FinalApprove.js') }}"></script>

    <style>
        .no-wrap {
            white-space: nowrap;
        }

        .link_detail {
            cursor: pointer;
            color: #3490dc !important;
        }

        .advanced-filter-container1::before {
            content: "Search Definition 1";
            position: relative;
            top: -15px;
            background-color: white;
        }

        .advanced-filter-container2::before {
            content: "Search Definition 2";
            position: relative;
            top: -15px;
            background-color: white;
        }

        .advanced-filter-container3::before {
            content: "Search Definition 3";
            position: relative;
            top: -15px;
            background-color: white;
        }

        .advanced-filter-option-container::before {
            content: "Search Options";
            position: relative;
            top: -15px;
            background-color: white;
        }
    </style>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-11 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">List Final Approve</div>

                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        @php
                            $disallowed = in_array($operator, ['RUDY', 'TJAHYO', 'YUDI']);
                        @endphp

                        <div class="d-flex justify-content-between align-items-end mb-2">

                            {{-- Filter Jenis Pembelian --}}
                            <div style="display: {{ $disallowed ? 'none' : 'flex' }};
                                    flex-direction: column;
                                    width: 20%;"
                                id="parentFilterFinalApproveSelect2">
                                <label>Filter Jenis Pembelian</label>
                                <select name="filterFinalApprove" id="filterFinalApprove">
                                    <option value="ALL">Tampilkan Semua</option>
                                    <option value="0">Beli Sendiri</option>
                                    <option value="1">Pengadaan Pembelian</option>
                                </select>
                            </div>

                            {{-- Button Group --}}
                            <div class="d-flex gap-2">
                                <button class="btn btn-success" id="btnExportExcel">
                                    Export to Excel
                                </button>
                                <button type="button" class="btn btn-info" id="btnAdvancedSearch">
                                    Advanced Search
                                </button>
                            </div>
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
                                        <th>ACC Manager</th>
                                        <th>ACC Rudy</th>
                                        <th>ACC Tjahyo</th>
                                        <th>Keterangan Internal</th>
                                        <th>Keterangan Order</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>

                    @php
                        $allowed = in_array($operator, ['RUDY', 'TJAHYO', 'YUDI', '4384']) || $isManager;
                    @endphp

                    <div
                        style="display: {{ $allowed ? 'flex' : 'none' }};
                            flex-direction: row;
                            width: 100%;">
                        <div style="flex: 0.5">
                            <button type="button" class="btn btn-md btn-success checkedAll">
                                Check All
                            </button>
                        </div>
                        <div class="d-flex justify-content-end mt-2" style="flex: 0.5">
                            <button type="submit" class="btn btn-md btn-danger" name="action" id="btn_cancel"
                                value="Cancel">
                                Cancel Order
                            </button>
                            <button type="submit" class="btn btn-md btn-primary" name="action" id="btn_approve"
                                value="Approve">
                                Final Approve
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    {{-- Modal Detail --}}
    @include('Beli/Transaksi/FinalApprove/modalDetailFinal')

    <div class="modal fade" id="modalAdvancedSearch" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Advanced Search</h5>
                    <button type="button" class="close" id="closeModalButton">
                        <span>×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="border border-dark advanced-filter-group advanced-filter-container1 mb-3" data-index="1">
                        <div class="d-flex w-100 px-2 pb-2" style="gap: 0.5%">
                            <div style="flex: 0.2">
                                <select class="form-select column-select">
                                    <option value="">No Column</option>
                                </select>
                            </div>
                            <div style="flex: 0.25">
                                <select class="form-select filter-type">
                                    <option value="">No Filter</option>
                                    <option value="=">Equal</option>
                                    <option value="!=">Not Equal</option>
                                    <option value="like">Contains</option>
                                    <option value="isbetween">Is Between</option>
                                    <option value="notbetween">Is Not Between</option>
                                    <option value="in">In</option>
                                    <option value="notin">Not In</option>
                                    <option value="isnull">Is Null</option>
                                    <option value="isnotnull">Is Not Null</option>
                                </select>
                            </div>
                            <div style="flex: 0.2">
                                <select class="form-select sort-order">
                                    <option value="">No Sort</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div style="flex: 0.35">
                                <input type="text" class="form-control search-value" placeholder="Enter value...">
                                <input type="number" class="form-control search-number" placeholder="Enter value...">
                                <input type="date" class="form-control search-date">
                                <select class="form-select search-acc-status" style="display:none;">
                                    <option value="" disabled selected hidden>Select Status ACC</option>
                                    <option value="Sudah ACC">Sudah ACC</option>
                                    <option value="Belum ACC">Belum ACC</option>
                                    <option value="Tidak Perlu ACC">Tidak Perlu ACC</option>
                                </select>
                                <select class="form-select search-status-beli" style="display:none;">
                                    <option value="" disabled selected hidden>Select Status</option>
                                    <option value="0">Beli Sendiri</option>
                                    <option value="1">Pengadaan Pembelian</option>
                                </select>
                                <div style="display: flex; gap: 0.5%" class="div-date-between">
                                    <input type="date" class="form-control search-date1" style="flex: 1">
                                    <input type="date" class="form-control search-date2" style="flex: 1">
                                </div>
                                <div style="display: flex; gap: 0.5%" class="div-number-between">
                                    <input type="number" class="form-control search-number1" style="flex: 1">
                                    <input type="number" class="form-control search-number2" style="flex: 1">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border border-dark advanced-filter-group advanced-filter-container2 mb-3" data-index="2">
                        <div class="d-flex w-100 px-2 pb-2" style="gap: 0.5%">
                            <div style="flex: 0.2">
                                <select class="form-select column-select">
                                    <option value="">No Column</option>
                                </select>
                            </div>
                            <div style="flex: 0.25">
                                <select class="form-select filter-type">
                                    <option value="">No Filter</option>
                                    <option value="=">Equal</option>
                                    <option value="!=">Not Equal</option>
                                    <option value="like">Contains</option>
                                    <option value="isbetween">Is Between</option>
                                    <option value="notbetween">Is Not Between</option>
                                    <option value="in">In</option>
                                    <option value="notin">Not In</option>
                                    <option value="isnull">Is Null</option>
                                    <option value="isnotnull">Is Not Null</option>
                                </select>
                            </div>
                            <div style="flex: 0.2">
                                <select class="form-select sort-order">
                                    <option value="">No Sort</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div style="flex: 0.35">
                                <input type="text" class="form-control search-value" placeholder="Enter value...">
                                <input type="number" class="form-control search-number" placeholder="Enter value...">
                                <input type="date" class="form-control search-date">
                                <select class="form-select search-acc-status" style="display:none;">
                                    <option value="" disabled selected hidden>Select Status ACC</option>
                                    <option value="Sudah ACC">Sudah ACC</option>
                                    <option value="Belum ACC">Belum ACC</option>
                                    <option value="Tidak Perlu ACC">Tidak Perlu ACC</option>
                                </select>
                                <select class="form-select search-status-beli" style="display:none;">
                                    <option value="" disabled selected hidden>Select Status</option>
                                    <option value="0">Beli Sendiri</option>
                                    <option value="1">Pengadaan Pembelian</option>
                                </select>

                                <div style="display: flex; gap: 0.5%" class="div-date-between">
                                    <input type="date" class="form-control search-date1" style="flex: 1">
                                    <input type="date" class="form-control search-date2" style="flex: 1">
                                </div>
                                <div style="display: flex; gap: 0.5%" class="div-number-between">
                                    <input type="number" class="form-control search-number1" style="flex: 1">
                                    <input type="number" class="form-control search-number2" style="flex: 1">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border border-dark advanced-filter-group advanced-filter-container3 mb-3" data-index="3">
                        <div class="d-flex w-100 px-2 pb-2" style="gap: 0.5%">
                            <div style="flex: 0.2">
                                <select class="form-select column-select">
                                    <option value="">No Column</option>
                                </select>
                            </div>
                            <div style="flex: 0.25">
                                <select class="form-select filter-type">
                                    <option value="">No Filter</option>
                                    <option value="=">Equal</option>
                                    <option value="!=">Not Equal</option>
                                    <option value="like">Contains</option>
                                    <option value="isbetween">Is Between</option>
                                    <option value="notbetween">Is Not Between</option>
                                    <option value="in">In</option>
                                    <option value="notin">Not In</option>
                                    <option value="isnull">Is Null</option>
                                    <option value="isnotnull">Is Not Null</option>
                                </select>
                            </div>
                            <div style="flex: 0.2">
                                <select class="form-select sort-order">
                                    <option value="">No Sort</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div style="flex: 0.35">
                                <input type="text" class="form-control search-value" placeholder="Enter value...">
                                <input type="number" class="form-control search-number" placeholder="Enter value...">
                                <input type="date" class="form-control search-date">

                                <select class="form-select search-acc-status" style="display:none;">
                                    <option value="" disabled selected hidden>Select Status ACC</option>
                                    <option value="Sudah ACC">Sudah ACC</option>
                                    <option value="Belum ACC">Belum ACC</option>
                                    <option value="Tidak Perlu ACC">Tidak Perlu ACC</option>
                                </select>
                                <select class="form-select search-status-beli" style="display:none;">
                                    <option value="" disabled selected hidden>Select Status</option>
                                    <option value="0">Beli Sendiri</option>
                                    <option value="1">Pengadaan Pembelian</option>
                                </select>

                                <div style="display: flex; gap: 0.5%" class="div-date-between">
                                    <input type="date" class="form-control search-date1" style="flex: 1">
                                    <input type="date" class="form-control search-date2" style="flex: 1">
                                </div>
                                <div style="display: flex; gap: 0.5%" class="div-number-between">
                                    <input type="number" class="form-control search-number1" style="flex: 1">
                                    <input type="number" class="form-control search-number2" style="flex: 1">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border border-dark advanced-filter-options advanced-filter-option-container"
                        data-index="3">
                        <div class="d-flex w-100 px-2 pb-2" style="gap: 0.5%">
                            <div style="flex: 0.3">
                                <input id="maximumRecords" type="number" class="form-control search-value"
                                    placeholder="Maximum Records (1000)">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="applySearch" class="btn btn-success">Apply Search</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

@endsection
