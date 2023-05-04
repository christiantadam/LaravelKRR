@extends('layouts.appEDP')
@section('content')
@include('EDP/Master/Cartridge/modalAddCartridge')
@include('EDP/Master/Cartridge/modalEditCartridge')
<script src="{{ asset('js/EDP/Cartridge.js') }}"></script>
<script>
    $(document).ready( function () {
    $('#table_Cartridge').DataTable({
        order: [[0, 'desc']],
    });
} );
</script>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header" >List Cartridge
                <a class="AddCartridge btn btn-primary btn-sm" href="" style="float:right;margin-right: 1px">ADD</a>
                </div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    @if (\Session::has('danger'))
                    <div class="alert alert-danger">
                        {!! \Session::get('danger') !!}
                    </div>
                    @endif
                    <table id="table_Cartridge" class="table table-bordered table-striped" style="width:100%;">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nomor</th>
                                <th>User</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($data as $index=>$item)
                            <tr>
                                <td class="RDZPaddingTable">{{$item['id']}}</td>
                                <td class="RDZPaddingTable">{{$item['User']}}</td>
                                <td class="RDZPaddingTable">{{$item['Type']}}</td>
                                <td>
                                    <a class="EditCartridge btn btn-warning btn-xs RDZEditDelTBL" style="border: 1px solid #212529;border-radius: 5px;" data-number="{{$item->id}}" data-user="{{$item->User}}" data-type="{{$item->Type}}" href="{{route('cartridge.update',$item->id)}}">Edit</a>
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
<script type="text/javascript">
function x(No_trans)
{
    var item=document.getElementById(No_trans);
    var add=document.getElementById("DataCheckbox");
    console.log(add);
    if(item.checked == true)
    {
        //add.innerHTML+="<input type='text' name='checkedBOX[]' value='"+No_trans+"' style='Display: none;'>";
        add.innerHTML+="<input type='text' id='ID"+No_trans+"' name='checkedBOX[]' value='"+No_trans+"' style='Display: none;'>";
    }
     if(item.checked == false)
    {
        var Input=document.getElementById("ID"+No_trans);
        Input.remove();
        //add.innerHTML+="<input type='text' name='checkedBOX[]' value='"+No_trans+"' style='Display: none;'>";
    }
}

function ALL()
{
    var item=document.getElementById("CheckedAll");
    var add=document.getElementById("DataCheckbox");
    if(item.checked == true)
    {
        var Data = {!! json_encode($data->toArray(), JSON_HEX_TAG) !!};
        for (var i = 0; i <= Data.length-1; i++) {
            console.log(Data[i].No_trans);
            document.getElementById(Data[i].No_trans).checked=true;
            add.innerHTML+="<input type='text' id='ID"+Data[i].No_trans+"' name='checkedBOX[]' value='"+Data[i].No_trans+"' style='Display: none;'>";
         }
        // console.log(Data.length);
    }
    console.log(add);
    if(item.checked == false)
    {
        console.log("hapus");
    }
}

$('#CheckedAll').on('click', function(){
      var table = $('#table_Approve').DataTable();
      var rows = table.rows({ 'search': 'applied' }).nodes();
      // Check/uncheck checkboxes for all rows in the table
      $('input[type="checkbox"]', rows).prop('checked', this.checked);
      var item=document.getElementById("CheckedAll");
      var add=document.getElementById("DataCheckbox");
      var Data = {!! json_encode($data->toArray(), JSON_HEX_TAG) !!};
      if(item.checked == true)
      {

        for (var i = 0; i <= Data.length-1; i++) {
            add.innerHTML+="<input type='text' id='ID"+Data[i].No_trans+"' name='checkedBOX[]' value='"+Data[i].No_trans+"' style='Display: none;'>";
            console.log("test");
        }
        console.log(add);
      }
      if(item.checked == false)
      {
        for (var i = 0; i <= Data.length-1; i++) {
            var Input=document.getElementById("ID"+Data[i].No_trans);
            Input.remove();
        }
        console.log("hapus");
      }
   });
</script>
@endsection
