@extends('layouts.appAccounting')
@section('content')
@section('title', 'Update PIB')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-7 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Update PIB</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                <div class="container fluid">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Supplier</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                <option value=""></option>
                                                <option value="Supplier 1">Supplier 1</option>
                                                <option value="Supplier 2">Supplier 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    </p>
                                    <div class="row align-items-center">
                                        <div class="col-md-2" style="padding-left: 15px; white-space: nowrap;">
                                            <label for="id">ID Penagihan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" id="idpenagihan" name="idtagihan" class="form-control">
                                        </div>
                                        <div class="col-md-1">
                                            <label for="id">Tanggal</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="date" id="tanggal" name="pembulatan" class="form-control">
                                        </div>
                                </div>

                            <p>
                            <div class="mb-3">
                                <input type="submit" name="update" value="Update" class="btn btn-primary" disabled>
                                <input type="submit" name="keluar" value="Keluar" class="btn btn-primary">
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
