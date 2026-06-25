@extends('layouts.appPDAM')
@section('title', 'Input PDAM')
@section('content')
    <style>
        .camera-modal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, .7);
            z-index: 99999;

            justify-content: center;
            align-items: center;
        }

        #imagePreviewModal {
            z-index: 1060 !important;
        }

        #imagePreviewModal+.modal-backdrop {
            z-index: 1055 !important;
        }

        .camera-box {
            background: white;
            padding: 20px;
            border-radius: 12px;

            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #cameraVideo {
            width: 700px;
            max-width: 90vw;

            border-radius: 10px;
            border: 1px solid #ddd;
        }

        .camera-action {
            margin-top: 15px;

            display: flex;
            gap: 10px;
        }

        .preview-image {
            cursor: pointer;
        }

        .preview-item {
            position: relative;
            width: 90px;
            height: 90px;
        }

        .preview-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 1px solid #ddd;
            border-radius: 6px;
        }

        .delete-btn-foto {
            position: absolute;
            top: -6px;
            right: -6px;
            width: 22px;
            height: 22px;
            border: none;
            border-radius: 50%;
            background: red;
            color: white;
            font-size: 12px;
            cursor: pointer;
            font-weight: bold;
        }
    </style>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahData" type="button" data-toggle="modal"
                    data-target="#tambahDataPDAMModal">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Data</div>
                </button>
                <div class="card">
                    <div class="card-header">Input PDAM</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div style="display: flex;flex-direction: row;gap: 5px;">
                            <div class="form-group">
                                <label for="select_lokasiSumberAirFilter">Lokasi Sumber Air</label>
                                <div class="input-group">
                                    <select name="select_lokasiSumberAirFilter" id="select_lokasiSumberAirFilter"
                                        class="form-control">
                                        @if (count($lokasi) > 1)
                                            <option disabled selected>-- Pilih Lokasi --</option>
                                            @foreach ($lokasi as $l)
                                                <option value="{{ $l->Id_Lokasi }}">{{ $l->Lokasi }}</option>
                                            @endforeach
                                        @else
                                            @foreach ($lokasi as $l)
                                                <option value="{{ $l->Id_Lokasi }}">{{ $l->Lokasi }} |
                                                    {{ $l->Id_Lokasi }}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="select_sumberAirFilter">Nama Sumber Air</label>
                                <div class="input-group">
                                    @if (count($lokasi) > 1)
                                        <select name="select_sumberAirFilter" id="select_sumberAirFilter"
                                            class="form-control" disabled>
                                            <option disabled selected>-- Pilih Sumber Air --</option>
                                        </select>
                                    @else
                                        <select name="select_sumberAirFilter" id="select_sumberAirFilter"
                                            class="form-control">
                                            <option disabled selected>-- Pilih Sumber Air --</option>
                                            @foreach ($sumberModal as $s)
                                                <option value="{{ $s->IdSumberAir }}">{{ $s->NamaSumberAir }}</option>
                                            @endforeach
                                        </select>
                                    @endif
                                </div>
                            </div>
                            <button class="btn btn-secondary" style="align-self: center" id="button_clearFilter">Clear
                                Filter</button>
                        </div>
                        <table id="table_dataPDAM" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Lokasi</th>
                                    <th>Sumber Air</th>
                                    <th>Counter</th>
                                    <th>Pemakaian</th>
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
    <div id="cameraModal" class="camera-modal">
        <div class="camera-box">
            <video id="cameraVideo" autoplay playsinline>
            </video>

            <div class="camera-action">
                <button id="btnTakePhoto" type="button" class="btn btn-success">
                    Ambil Foto
                </button>

                <button id="btnCloseCamera" type="button" class="btn btn-danger">
                    Tutup
                </button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="imagePreviewModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Preview Foto</h5>

                    <button type="button" class="close" data-dismiss="modal">
                    <span>×</span>
                </button>
                </div>

                <div class="modal-body text-center">

                    <img id="previewModalImage" src=""
                        style="
                        max-width:100%;
                        max-height:75vh;
                        object-fit:contain;
                    ">
                </div>
            </div>
        </div>
    </div>

    <canvas id="cameraCanvas" hidden></canvas>
    @include('PDAM.Master.InputPDAM.ModalInputPDAM')
    @include('PDAM.Master.InputPDAM.DetailDataPDAM')
    <script src="{{ asset('js/PDAM/InputPDAM.js') }}"></script>
@endsection
