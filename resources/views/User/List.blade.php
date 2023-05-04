@extends('layouts.appEDP')
@section('content')
    @include('User/modalEditUser')
    @include('User/modalEditAdmin')
    <script>
        $(document).ready(function() {
            $('#table_Approve').DataTable({});
        });
    </script>

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
                                        <td><a class="EditUser btn btn-warning RDZEditDelTBL"
                                                style="border: 1px solid #212529;border-radius: 5px;"
                                                href="{{ str_replace('%20', '', route('user.update', $item->NomorUser)) }}"
                                                data-nama="{{ $item->NamaUser }}" data-user="{{ $item->NomorUser }}">Ganti
                                                Password</a>
                                            @if ($item->NomorUser != Auth::user()->NomorUser)
                                                @if ($item->IsAdmin == 1)
                                                    <a class="EditAdmin btn btn-primary btn-xs RDZEditDelTBL"
                                                        style="border: 1px solid #212529;border-radius: 5px;"
                                                        href="{{ str_replace('%20', '', route('user.EditAdmin', $item->NomorUser)) }}"
                                                        data-nama="{{ $item->NamaUser }}" data-user="{{ $item->NomorUser }}"
                                                        data-status="User">Jadikan User</a>
                                                @else
                                                    <a class="EditAdmin btn btn-danger btn-xs RDZEditDelTBL"
                                                        style="border: 1px solid #212529;border-radius: 5px;"
                                                        href="{{ str_replace('%20', '', route('user.EditAdmin', $item->NomorUser)) }}"
                                                        data-nama="{{ $item->NamaUser }}" data-user="{{ $item->NomorUser }}"
                                                        data-status="Admin">Jadikan Admin</a>
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
@endsection
