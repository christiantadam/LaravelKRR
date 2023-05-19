@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/Supplier.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Supplier</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <form class="form acs-form" method="POST" enctype="multipart/form-data" action="{{ url('/Approve') }}">
                            {{ csrf_field() }}
                            <div class="acs-div-container">
                                <div class="acs-div-filter">
                                    <label for="supplier">Supplier</label>
                                    <input type="text" name="supplier" id="supplier" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person1">Contact Person 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="phone">Phone 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Mobile Phone 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Email 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Fax 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Alamat 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Kota 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Negara 1</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter2">
                                    <label for="mata_uang">Mata Uang</label>
                                    <select name="mata_uang" id="mata_uang" class="input">
                                        <option selected disabled>-- Pilih Mata Uang--</option>
                                    </select>
                                </div>
                            </div>
                            <div class="acs-div-container">
                                <div class="acs-div-filter1">
                                    <label for="contact_person2">Contact Person 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="phone">Phone 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Mobile Phone 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Email 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Fax 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Alamat 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Kota 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="contact_person">Negara 2</label>
                                    <input type="text" name="contact_person" id="contact_person" class="input">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/Supplier.js') }}"></script>
    @endsection
