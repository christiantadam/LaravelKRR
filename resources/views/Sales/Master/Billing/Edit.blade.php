@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/billing.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Create Billing</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div>
                            <form method="POST" action="{{ route('billing.update', $model->IDBill) }}" id="">
                                {{ csrf_field() }}
                                <div class="permohonan-do-form">
                                    <div class="acs-form">
                                        <div class="acs-form1">
                                            <div class="acs-div-filter">
                                                <label for="NamaBill">Nama Billing</label>
                                                <input type="text" name="NamaBill" id="NamaBill"
                                                    placeholder="Nama Billing" class="input"
                                                    value="{{ $model->NamaBill }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="ContactPerson">Contact Person</label>
                                                <input type="text" name="ContactPerson" id="ContactPerson"
                                                    placeholder="Contact Person" class="input"
                                                    value="{{ $model->ContactPerson }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Alamat">Alamat Kantor</label>
                                                <div class="acs-div-filter1">
                                                    <input type="text" name="Alamat" id="Alamat"
                                                        placeholder="Alamat Kantor" class="input" style="width: 65%;"
                                                        value="{{ $model->Alamat }}">
                                                    <span>Kode Pos: </span>
                                                    <input type="text" name="KodePos" id="KodePos"
                                                        placeholder="Kode Pos" class="input" style="width: 20%;"
                                                        value="{{ $model->KodePos }}">
                                                </div>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Kota">Kota</label>
                                                <input type="text" name="Kota" id="Kota" placeholder="Kota"
                                                    class="input" value="{{ $model->Kota }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Provinsi">Provinsi</label>
                                                <input type="text" name="Provinsi" id="Provinsi" placeholder="Provinsi"
                                                    class="input" value="{{ $model->Propinsi }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Negara">Negara</label>
                                                <input type="text" name="Negara" id="Negara" placeholder="Negara"
                                                    class="input" value="{{ $model->Negara }}">
                                            </div>
                                        </div>
                                        <div class="acs-form1">
                                            <div class="acs-div-filter">
                                                <label for="NoTelp1">No. Telpon 1</label>
                                                <input type="text" name="NoTelp1" id="NoTelp1"
                                                    placeholder="No. Telpon 1" class="input"
                                                    value="{{ $model->NoTelp1 }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoTelp2">No. Telpon 2</label>
                                                <input type="text" name="NoTelp2" id="NoTelp2"
                                                    placeholder="No. Telpon 2" class="input"
                                                    value="{{ $model->NoTelp2 }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoTelex">No. Telex</label>
                                                <input type="text" name="NoTelex" id="NoTelex" placeholder="No. Telex"
                                                    class="input" value="{{ $model->NoTelex }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoFax1">No. Fax 1</label>
                                                <input type="text" name="NoFax1" id="NoFax1"
                                                    placeholder="No. Fax 1" class="input" value="{{ $model->NoFax1 }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoFax2">No. Fax 2</label>
                                                <input type="text" name="NoFax2" id="NoFax2"
                                                    placeholder="No. Fax 2" class="input" value="{{ $model->NoFax2 }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoHp1">No. HP 1</label>
                                                <input type="text" name="NoHp1" id="NoHp1"
                                                    placeholder="No. HP 1" class="input" value="{{ $model->NoHp1 }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoHp2">No. HP 2</label>
                                                <input type="text" name="NoHp2" id="NoHp2"
                                                    placeholder="No. HP 2" class="input" value="{{ $model->NoHp2 }}">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Email">Email</label>
                                                <input type="text" name="Email" id="Email" placeholder="Email"
                                                    class="input" value="{{ $model->Email }}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="acs-div-btn">
                                    <button id="submit_btn" class="btn btn-primary">
                                        <span>Submit</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/Billing.js') }}"></script>
@endsection
