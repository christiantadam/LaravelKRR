@extends('layouts.appEDP') @section('content')
@section('title', 'Add Computer')
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
                    <div class="card-header">Add Computer</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div>
                            <form method="POST" action="{{ url('Computer') }}">
                                {{ csrf_field() }}
                                <div class="permohonan-do-form">
                                    <div class="acs-form">
                                        <div class="acs-form1">
                                            <div class="acs-div-filter">
                                                <label for="NamaBill">Kode Computer</label>
                                                <input type="text" name="NamaBill" id="NamaBill"
                                                    placeholder="Nama Billing" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="ContactPerson">Nama User</label>
                                                <input type="text" name="ContactPerson" id="ContactPerson"
                                                    placeholder="Contact Person" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Alamat">IP Address</label>
                                                <div class="acs-div-filter1">
                                                    <input type="text" name="Alamat" id="Alamat"
                                                        placeholder="Alamat Kantor" class="input" style="width: 65%;">
                                                </div>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Processor">Processor</label>
                                                <select name="Processor" id="Processor" class="input">
                                                    <option selected disabled>-- Pilih Jenis Processor--</option>
                                                    @foreach ($processor as $data)
                                                        <option value="{{ $data->IDJnsCust }}">
                                                            {{ $data->IDJnsCust . ' - ' . $data->NamaJnsCust }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Provinsi">Memory</label>
                                                <input type="text" name="Provinsi" id="Provinsi" placeholder="Provinsi"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Negara">Hard Disk</label>
                                                <input type="text" name="Negara" id="Negara" placeholder="Negara"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Negara">Operating System</label>
                                                <input type="text" name="Negara" id="Negara" placeholder="Negara"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Negara">Graphic Card</label>
                                                <input type="text" name="Negara" id="Negara" placeholder="Negara"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Negara">Monitor</label>
                                                <input type="text" name="Negara" id="Negara" placeholder="Negara"
                                                    class="input">
                                            </div>
                                        </div>
                                        <div class="acs-form1">
                                            <div class="acs-div-filter">
                                                <label for="NoTelp1">No. Telpon 1</label>
                                                <input type="text" name="NoTelp1" id="NoTelp1"
                                                    placeholder="No. Telpon 1" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoTelp2">No. Telpon 2</label>
                                                <input type="text" name="NoTelp2" id="NoTelp2"
                                                    placeholder="No. Telpon 2" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoTelex">No. Telex</label>
                                                <input type="text" name="NoTelex" id="NoTelex" placeholder="No. Telex"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoFax1">No. Fax 1</label>
                                                <input type="text" name="NoFax1" id="NoFax1" placeholder="No. Fax 1"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoFax2">No. Fax 2</label>
                                                <input type="text" name="NoFax2" id="NoFax2"
                                                    placeholder="No. Fax 2" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoHp1">No. HP 1</label>
                                                <input type="text" name="NoHp1" id="NoHp1"
                                                    placeholder="No. HP 1" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="NoHp2">No. HP 2</label>
                                                <input type="text" name="NoHp2" id="NoHp2"
                                                    placeholder="No. HP 2" class="input">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="Email">Email</label>
                                                <input type="text" name="Email" id="Email" placeholder="Email"
                                                    class="input">
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
