@extends('layouts.appEDP') @section('content')
@section('title', 'Add Computer')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/computer.css') }}" rel="stylesheet">
@php
    $computer_encode = json_encode($computer);
    $computer_array = json_decode($computer_encode, true);
    // print($computer_array[0]->Kode_Comp);
@endphp
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="card">
                <div class="card-header">Edit Computer</div>
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
                                                placeholder="Nama Billing" class="input"
                                                value="{{ $computer_array[0]['Kode_Comp'] }}">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="ContactPerson">Nama User</label>
                                            <input type="text" name="ContactPerson" id="ContactPerson"
                                                placeholder="Contact Person" class="input"
                                                value="{{ $computer_array[0]['Keterangan'] }}">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="ipAddress">IP Address</label>
                                            <div class="acs-div-filter1">
                                                <input type="text" name="ipAddress" id="ipAddress"
                                                    placeholder="IP Address" class="input" style="width: 65%;"
                                                    oninput="validateIpAddress()"
                                                    value="{{ $computer_array[0]['IPAddress'] }}">
                                                <div id="result"></div>
                                                <div id="error"></div>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Processor">Processor</label>
                                            <select name="Processor" id="Processor" class="input">
                                                <option selected disabled>-- Pilih Jenis Processor--</option>
                                                @foreach ($processor as $data)
                                                    <option value="{{ $data->Id_Proc }}">
                                                        {{ $data->Id_Proc . ' - ' . $data->Processor }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Memory">Memory</label>
                                            <select name="Memory" id="Memory" class="input">
                                                <option selected disabled>-- Pilih Jenis Memory--</option>
                                                @foreach ($memory as $data)
                                                    <option value="{{ $data->Id_Memory }}">
                                                        {{ $data->Id_Memory . ' - ' . $data->Kapasitas }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Negara">Hard Disk</label>
                                            <select name="Memory" id="Memory" class="input">
                                                <option selected disabled>-- Pilih Jenis Memory--</option>
                                                @foreach ($harddisk as $data)
                                                    <option value="{{ $data->Id_HDD }}">
                                                        {{ $data->Id_HDD . ' - ' . $data->Kapasitas }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Negara">Operating System</label>
                                            <select name="Memory" id="Memory" class="input">
                                                <option selected disabled>-- Pilih Jenis Memory--</option>
                                                @foreach ($typeos as $data)
                                                    <option value="{{ $data->Is_OS }}">
                                                        {{ $data->Is_OS . ' - ' . $data->Sistem_Operas }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Negara">Graphic Card</label>
                                            <select name="Memory" id="Memory" class="input">
                                                <option selected disabled>-- Pilih Jenis Memory--</option>
                                                @foreach ($vga as $data)
                                                    <option value="{{ $data->Id_VGA }}">
                                                        {{ $data->Id_VGA . ' - ' . $data->Kapasitas_VGA }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Negara">Monitor</label>
                                            <select name="Memory" id="Memory" class="input">
                                                <option selected disabled>-- Pilih Jenis Memory--</option>
                                                @foreach ($monitor as $data)
                                                    <option value="{{ $data->Id_Monitor }}">
                                                        {{ $data->Id_Monitor . ' - ' . $data->Monitor_Size }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    {{-- <div class="acs-form1">
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
                                            <input type="text" name="NoFax1" id="NoFax1"
                                                placeholder="No. Fax 1" class="input">
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
                                    </div> --}}
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
<script type="text/javascript" src="{{ asset('js/EDP/Computer.js') }}"></script>
<script>
    if (document.getElementById("ipAddress").value !== "") {
        if (ValidateIPaddress(document.getElementById("ipAddress").value)) {
            document.getElementById("result").innerHTML = "Format IP Address Valid";
            document.getElementById("error").innerHTML = "";
        } else {
            document.getElementById("result").innerHTML = "";
            document.getElementById("error").innerHTML = "Format IP Address Invalid";
        }
    }
</script>
@endsection
