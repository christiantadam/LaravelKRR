@extends('layouts.appSales')
@section('title', 'Expeditor')
@section('content')
    <style>
        .custom-modal-width {
            max-width: 90%;
        }
    </style>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                {{-- button untuk munculin modal --}}
                <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahExpeditor" data-toggle="modal" data-target="#modalExpeditor">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Expeditor</div>
                </button>
                <div class="card">
                    <div class="card-header">Expeditor</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_expeditor" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Nama Expeditor </th>
                                    <th>Contact Person</th>
                                    <th>Negara</th>
                                    <th>Action</th>
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
    @include('Sales.Master.Expeditor.ModalExpeditor')
@endsection
