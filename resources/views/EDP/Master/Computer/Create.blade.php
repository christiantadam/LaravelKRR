@extends('layouts.appEDP') @section('content')
@section('title', 'Add Computer')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/computer.css') }}" rel="stylesheet">
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
                                            <label for="KodeComputer">Kode Computer</label>
                                            <input type="text" name="KodeComputer" id="KodeComputer"
                                                placeholder="Kode Computer" class="input">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="NamaUser">Nama User</label>
                                            <input type="text" name="NamaUser" id="NamaUser"
                                                placeholder="Nama User" class="input">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="ipAddress">IP Address</label>
                                            <div class="acs-div-filter1">
                                                <input type="text" name="ipAddress" id="ipAddress"
                                                    placeholder="IP Address" class="input" style="width: 65%;"
                                                    oninput="validateIpAddress()">
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
                                            <label for="HardDisk">Hard Disk</label>
                                            <select name="HardDisk" id="HardDisk" class="input">
                                                <option selected disabled>-- Pilih Jenis Hard Disk--</option>
                                                @foreach ($harddisk as $data)
                                                    <option value="{{ $data->Id_HDD }}">
                                                        {{ $data->Id_HDD . ' - ' . $data->Kapasitas }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="OperatingSystem">Operating System</label>
                                            <select name="OperatingSystem" id="OperatingSystem" class="input">
                                                <option selected disabled>-- Pilih Jenis Operating System--</option>
                                                @foreach ($typeos as $data)
                                                    <option value="{{ $data->Is_OS }}">
                                                        {{ $data->Is_OS . ' - ' . $data->Sistem_Operas }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="GraphicCard">Graphic Card</label>
                                            <select name="GraphicCard" id="GraphicCard" class="input">
                                                <option selected disabled>-- Pilih Jenis Graphic Card--</option>
                                                @foreach ($vga as $data)
                                                    <option value="{{ $data->Id_VGA }}">
                                                        {{ $data->Id_VGA . ' - ' . $data->Kapasitas_VGA }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Monitor">Monitor</label>
                                            <select name="Monitor" id="Monitor" class="input">
                                                <option selected disabled>-- Pilih Jenis Monitor--</option>
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
@endsection
