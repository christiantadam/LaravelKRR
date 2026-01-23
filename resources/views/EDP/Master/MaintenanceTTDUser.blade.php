@extends('layouts.appEDP')
@section('title', 'Maintenance TTD User')
@section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/EDP/MaintenanceUserWeb.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance TTD User</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_userWeb" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor User</th>
                                    <th>Nama User</th>
                                    <th>Actions</th>
                                    <th>ttd</th>
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
    <div class="modal fade" id="modalTambahTTD" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelTambahTTD">Tambah TTD</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span>x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-2">
                        <label for="mmu_gambarTTD">Upload Gambar TTD</label>
                        <div class="input-group">
                            <input type="file" class="form-control-file" id="mmu_gambarTTD" name="mmu_gambarTTD"
                                accept="image/*" readonly>
                        </div>
                    </div>
                    <div class="py-2">
                        <label>Preview Gambar TTD</label>
                        <div id="imagePreview" style="padding: 10px;">
                            <img id="previewImg" src="#" alt="Preview Image"
                                style="width: 100%; border: 1px solid black;display:none;">
                        </div>
                        <br>
                        <button type="button" class="btn btn-secondary" id="clearImage" style="width:100px">Clear</button>
                    </div>
                    <div class="d-flex" style="justify-content: end;width: 100%">
                        <button class="btn btn-info" id="mmu_buttonSave">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- @include('EDP/Master/modalTambahTTD') --}}
    <script type="text/javascript" src="{{ asset('js/EDP/MaintenanceTTDUser.js') }}"></script>
@endsection
