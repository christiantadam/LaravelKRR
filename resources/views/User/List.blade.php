@extends('layouts.appEDP')
@section('content')
@section('title', 'Maintenance User')
@include('User/modalEditUser')
@include('User/modalEditAdmin')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">List User</div>
                <div id="DataCheckbox"></div>
                <div class="card-body RDZOverflow">
                    @if (\Session::has('danger'))
                        <div class="alert alert-danger">
                            {!! \Session::get('danger') !!}
                        </div>
                    @endif

                    <table id="table_Approve" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data as $item)
                                <tr>
                                    <td>{{ $item['NomorUser'] }}</td>
                                    <td>{{ $item['NamaUser'] }}</td>
                                    @if ($item->IsAdmin == 1)
                                        <td>Administrator</td>
                                    @else
                                        <td>User</td>
                                    @endif
                                    <td>
                                        <a class="EditUser btn btn-warning RDZEditDelTBL"
                                            style="border: 1px solid #212529; border-radius: 5px;"
                                            href="{{ str_replace('%20', '', route('user.update', $item->NomorUser)) }}"
                                            data-nama="{{ $item->NamaUser }}" data-user="{{ $item->NomorUser }}">Ganti
                                            Password</a>

                                        @if ($item->NomorUser != Auth::user()->NomorUser)
                                            @if ($item->IsAdmin == 1)
                                                <a class="EditAdmin btn btn-primary btn-xs RDZEditDelTBL"
                                                    style="border: 1px solid #212529; border-radius: 5px;"
                                                    href="{{ str_replace('%20', '', route('user.EditAdmin', $item->NomorUser)) }}"
                                                    data-nama="{{ $item->NamaUser }}" data-user="{{ $item->NomorUser }}"
                                                    data-status="User">Jadikan User</a>
                                            @else
                                                <a class="EditAdmin btn btn-danger btn-xs RDZEditDelTBL"
                                                    style="border: 1px solid #212529; border-radius: 5px;"
                                                    href="{{ str_replace('%20', '', route('user.EditAdmin', $item->NomorUser)) }}"
                                                    data-nama="{{ $item->NamaUser }}"
                                                    data-user="{{ $item->NomorUser }}" data-status="Admin">Jadikan
                                                    Admin</a>
                                            @endif

                                            {{-- Tombol untuk Aktifkan/Nonaktifkan Akun --}}
                                            @if ($item->IsActive == 1)
                                                <a class="EditActive btn btn-danger btn-xs RDZEditDelTBL"
                                                    style="border: 1px solid #212529; border-radius: 5px;"
                                                    href="{{ str_replace('%20', '', route('user.EditActive', $item->NomorUser)) }}"
                                                    data-nama="{{ $item->NamaUser }}"
                                                    data-user="{{ $item->NomorUser }}"
                                                    data-status="Nonaktif">Nonaktifkan Akun</a>
                                            @else
                                                <a class="EditActive btn btn-success btn-xs RDZEditDelTBL"
                                                    style="border: 1px solid #212529; border-radius: 5px;"
                                                    href="{{ str_replace('%20', '', route('user.EditActive', $item->NomorUser)) }}"
                                                    data-nama="{{ $item->NamaUser }}"
                                                    data-user="{{ $item->NomorUser }}" data-status="Aktif">Aktifkan
                                                    Akun</a>
                                            @endif
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function ShowPassword(input, icon) {
        var input = document.getElementById(input);
        var icon = document.getElementById(icon);
        if (input.type === "password") {
            input.type = "text";
            icon.innerHTML = "visibility";
        } else {
            input.type = "password";
            icon.innerHTML = "visibility_off";
        }
    }
    $(document).ready(function() {
        $('#table_Approve').DataTable({});
    });
</script>
@endsection
