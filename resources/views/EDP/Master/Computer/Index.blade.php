@extends('layouts.appEDP')
@section('content')
    @include('User/modalEditUser')
    @include('User/modalEditAdmin')
    <script>
        $(document).ready(function() {
            $('#table_Computer').DataTable({});
        });
    </script>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Computer/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Computer</div>
                </button>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">List Computer</div>
                    <div id="DataCheckbox"></div>
                    <div class="card-body RDZOverflow">
                        <table id="table_Computer" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Kode PC</th>
                                    <th>Nama User</th>
                                    <th>IP Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        <td>{{ $item->Kode_Comp }}</td>
                                        <td>{{ $item->Keterangan }}</td>
                                        <td>{{ $item->IPAddress }}</td>
                                        <td style="display: flex;"><button class="btn btn-sm btn-primary"
                                                onclick="openNewWindow('{{ url('Computer/' . $item->Kode_Comp . '/edit') }}')"
                                                href=""><span>&#x270E;</span>Edit</button>
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ route('computer.destroy', $item->Kode_Comp) }}" method="POST"
                                                enctype="multipart/form-data">
                                                {{ csrf_field() }}
                                                <button type="submit"
                                                    class="btn btn-sm btn-danger"><span>&#x1F5D1;</span>Hapus</button>
                                            </form>
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
