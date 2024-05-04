@extends('layouts.appUtility')
@section('title', 'Print Project')
@section('content')
    <link href="{{ asset('css/printProject.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Print Project</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <label class="">Filter</label>
                        <div class=" d-flex gap-2 align-items-center">
                            <h6 class="mt-2">Bulan</h6>
                            <input type="number" name="tanggal_dibutuhkan" pattern="[0-9]" min="0" id="bulan"
                                class="input form-control">
                            <h6 class="mt-2">Tahun</h6>
                            <input type="number" pattern="[0-9]" name="tanggal_dibutuhkan" min="0" id="tahun"
                                class="input form-control ml-1">

                            <button id="refreshButton" class="btn btn-primary">Refresh</button>
                            <h6 class="mt-2">Keterangan</h6>
                            <select id="filter" class="form-select ml-1">
                                <option value="">Pilih Semua</option>
                                <option value="Progress">Progress</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                        </div>
                        <div id="div_tablePO" class="acs-form3 mt-3">
                            <table class="table" id="tabel_print_project">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            Aksi </th>
                                        <th scope="col">Nama Project</th>
                                        <th scope="col">Nama Mesin </th>
                                        <th scope="col">Tanggal Mulai</th>
                                        <th scope="col"> Tanggal Selesai</th>
                                        <th scope="col">Keterangan Kerja </th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="previewTitle mt-2 d-flex justify-content-between align-items-center">
                            <h3 class="text-center mb-0">Main Report</h3>
                            <!-- Add a print button -->
                            <button type="button" class="btn-print btn btn-secondary mt-3">Print
                                Preview</button>
                        </div>
                        <div id="previewSection" class="mt-4 d-flex justify-content-center">
                            <div id="previewData">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Project/PrintProject.js') }}"></script>
@endsection
