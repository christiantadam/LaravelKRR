$(function () {
  $("body").on("click", "#NoTrans", function (e) {
    e.preventDefault();
    document.getElementById("judul_ListOrder").innerHTML="No Trans "+$(this).data('id');
    $.ajax({
        url: window.location.origin+"/ListOrder/"+$(this).data('id')+"/show",
        type: 'get',
        //data: '_token = <?php echo csrf_token() ?>', // Remember that you need to have your csrf token included
        success: function( data ){
          // MENAMPILKAN DATA------------------------------------------------------------------------------------------------
          document.getElementById("KategoriUtama_ListOrder").innerHTML="Kategori Utama: "+data.data.KatUtama;
          document.getElementById("Kategori_ListOrder").innerHTML="Kategori: "+data.data.kategori;
          document.getElementById("SubKategori_ListOrder").innerHTML="Sub Kategori: "+data.data.SubKat;
          document.getElementById("NamaBarang_ListOrder").innerHTML="Barang: "+data.data.NamaBarang+"<text class='material-symbols-outlined' style='font-size:20px' id='iconKategoriBarang'>expand_more</text>";
          document.getElementById("Qty_ListOrder").innerHTML="Qty Order: "+data.data.Qty+" "+data.data.Nama_satuan;
          // KET ORDER---------------------------------------------------------------------------------------------------------
          if(data.data.keterangan==null||data.data.keterangan.length==0||data.data.keterangan=='-')
          {
            $("#ketOrder_ListOrder").hide();
          }
          else
          {
            $("#ketOrder_ListOrder").show();
            document.getElementById("ketOrder_ListOrder").innerHTML="Ket. Order: "+data.data.keterangan;
          }
          // KET INTERNAL------------------------------------------------------------------------------------------------------
          if(data.data.Ket_Internal==null||data.data.Ket_Internal.length==0||data.data.Ket_Internal=='-')
          {
            $("#ketInternal_ListOrder").hide();
          }
          else
          {
            $("#ketInternal_ListOrder").show();
            document.getElementById("ketInternal_ListOrder").innerHTML="Ket. Internal: "+data.data.Ket_Internal;
          }
          document.getElementById("Divisi_ListOrder").innerHTML="Divisi: "+data.data.Kd_div;
          // PEMESAN-------------------------------------------------------------------------------------------------------
          if(data.data.Pemesan==null||data.data.Pemesan.length==0)
          {
            $("#Pemesan_ListOrder").hide();
          }
          else
          {
            $("#Pemesan_ListOrder").show();
            document.getElementById("Pemesan_ListOrder").innerHTML="Pemesan: "+data.data.Pemesan;
          }
          // STATUS--------------------------------------------------------------------------------------------------
          if(data.data.StatusBeli==1)
          {
            document.getElementById("Status_ListOrder").innerHTML="Status: Pengadaan Pembelian";
          }
          else
          {
            document.getElementById("Status_ListOrder").innerHTML="Status: Beli Sendiri";
          }
          // TANGGAL BUTUH--------------------------------------------------------------------------------------------------
          let date= ("0" + new Date(data.data.Tgl_Dibutuhkan).getDate()).slice(-2);
          let month = ("0" + (new Date(data.data.Tgl_Dibutuhkan).getMonth()+1)).slice(-2);
          let year = new Date(data.data.Tgl_Dibutuhkan).getFullYear();
          document.getElementById("TglButuh_ListOrder").innerHTML="Tgl. Dibutuhkan: "+month+"/"+date+"/"+year;
          // ACC MANAGER------------------------------------------------------------------------------------------------------------
          let date2 = ("0" + new Date(data.data.Tgl_acc).getDate()).slice(-2);
          let month2 = ("0" + (new Date(data.data.Tgl_acc).getMonth()+1)).slice(-2);
          let year2 = new Date(data.data.Tgl_acc).getFullYear();
          let hour2 = ("0" + new Date(data.data.Tgl_acc).getHours()).slice(-2);
          let minute2 = ("0" + new Date(data.data.Tgl_acc).getMinutes()).slice(-2);
          let second2 = ("0" + new Date(data.data.Tgl_acc).getSeconds()).slice(-2);
          let format2=month2+"/"+date2+"/"+year2+" "+hour2+":"+minute2+":"+second2;

          if(data.data.Manager==null||data.data.Manager.length==0||data.data.Manager=='')
          {
            $("#AccManager_ListOrder").hide();
          }
          else
          {
            $("#AccManager_ListOrder").show();
            document.getElementById("AccManager_ListOrder").innerHTML="Approved: "+format2+" BY:"+ data.data.Manager;
          }
          // SUPPLIER
          if(data.data.supplier==null)
          {
            $("#Supplier_ListOrder").hide();
          }
          else
          {
            $("#Harga_ListOrder").show();
            document.getElementById("Harga_ListOrder").innerHTML="Harga: "+rupiah(data.data.PriceUnit);
          }
          document.getElementById("Supplier_ListOrder").innerHTML="Supplier: " + data.data.supplier;
          // HARGA-------------------------------------------------------------------------------------------------------
          if(data.data.PriceUnit==null||data.data.PriceUnit.length==0||data.data.PriceUnit==0)
          {
            $("#Harga_ListOrder").hide();
          }
          else
          {
            $("#Harga_ListOrder").show();
            if(data.data.Currency=='1')
            {
              document.getElementById("Harga_ListOrder").innerHTML="Harga: "+rupiah(data.data.PriceUnit);
            }
            else if(data.data.Currency=='2')
            {
              document.getElementById("Harga_ListOrder").innerHTML="Harga: "+dolar(data.data.PriceUnit);
            }
          }
          // SUB TOTAL---------------------------------------------------------------------------------------------------------
          if(data.data.PriceSub==null||data.data.PriceSub.length==0||data.data.PriceSub==0)
          {
            $("#Subtotal_ListOrder").hide();
          }
          else
          {
            $("#Subtotal_ListOrder").show();
            if(data.data.Currency=='1')
            {
              document.getElementById("Subtotal_ListOrder").innerHTML="Subtotal: "+rupiah(data.data.PriceSub);
            }
            else if(data.data.Currency=='2')
            {
              document.getElementById("Subtotal_ListOrder").innerHTML="Subtotal: "+dolar(data.data.PriceSub);
            }
          }
          // PPN---------------------------------------------------------------------------------------------------------
          if(data.data.PPN==null||data.data.PPN.length==0||data.data.PPN==0)
          {
            $("#PPN_ListOrder").hide();
          }
          else
          {
            if(data.data.Currency=='1')
            {
              $("#PPN_ListOrder").show();
              document.getElementById("PPN_ListOrder").innerHTML="PPN: "+rupiah(data.data.PPN);
            }

          }
          // -------------------------------------------------------------------------------------------------------------
          if(data.data.PriceExt==null||data.data.PriceExt.length==0||data.data.PriceExt==0)
          {
            $("#Total_ListOrder").hide();
          }
          else
          {
            $("#Total_ListOrder").show();
            if(data.data.Currency=='1')
            {
              document.getElementById("Total_ListOrder").innerHTML="Total: "+rupiah(data.data.PriceExt)+"<text class='material-symbols-outlined' style='font-size:20px' id='iconHarga'>expand_more</text>";
            }
            else if(data.data.Currency=='2')
            {
              document.getElementById("Total_ListOrder").innerHTML="Total: "+dolar(data.data.PriceExt)+"<text class='material-symbols-outlined' style='font-size:20px' id='iconHarga'>expand_more</text>";
            }
          }

        // -------------------------------------------------------------------------------------------------------------
          let date3 = ("0" + new Date(data.data.Tgl_PBL_Acc).getDate()).slice(-2);
          let month3 = ("0" + (new Date(data.data.Tgl_PBL_Acc).getMonth()+1)).slice(-2);
          let year3 = new Date(data.data.Tgl_PBL_Acc).getFullYear();
          let hour3 = ("0" + new Date(data.data.Tgl_PBL_Acc).getHours()).slice(-2);
          let minute3 = ("0" + new Date(data.data.Tgl_PBL_Acc).getMinutes()).slice(-2);
          let second3 = ("0" + new Date(data.data.Tgl_PBL_Acc).getSeconds()).slice(-2);
          let format3=month3+"/"+date3+"/"+year3+" "+hour3+":"+minute3+":"+second3;

          if(data.data.Offered==null||data.data.Offered.length==0)
          {
            $("#Offered_ListOrder").hide();
          }
          else
          {
            $("#Offered_ListOrder").show();
            document.getElementById("Offered_ListOrder").innerHTML="Offered: "+format3+" BY:"+data.data.Offered;
          }
          // ----------------------------------------------------------------------------------------------------------------
        //   console.log('yay');
        },
        error: function(xhr, status, error){
            ;
        }
    });

    $("#loading_ListOrder").show();
    $("#DivDetailData_ListOrder").hide();
    $('#modalDetail_ListOrder').modal({ backdrop: 'static', keyboard: false })
    $("body.modal-open").removeAttr("style");
      setTimeout(function() {
        $('#DivDetailData_ListOrder').show();
        $("#loading_ListOrder").hide();
      }, 1000);
  });
});

$(function () {
  $('.Filter').change(function () {
    var ValDivisi=document.getElementById("divisi").value;
    var ValTglAwal=document.getElementById("tglAwal").value;
    var ValTglAkhir=document.getElementById("tglAkhir").value;
    var ValMe=document.getElementById("Me").checked;
    // console.log(ValDivisi+'|'+ValTglAwal+'|'+ValTglAkhir+'|'+ValMe);

    $.ajax({
        url: window.location.origin+"/ListOrder/"+ValDivisi+'/'+ValTglAwal+'/'+ValTglAkhir+'/'+ValMe+"/Filter",
        type: 'get',
        data: '_token = <?php echo csrf_token() ?>', // Remember that you need to have your csrf token included
        success: function( data ){
          var table = $('#table_ListOrder').DataTable();
          table.clear().draw();
        //   console.log(data.data.length);
          for(let i=0;i<data.data.length;i++)
          {
            table.row.add( [
                "<a class='Detail_ListOrder' id='NoTrans' data-id='"+data.data[i].No_trans+"' href=''>"+data.data[i].No_trans+"</a>",
                $.format.date(data.data[i].Tgl_order, "MM-dd-yyyy"),
                data.data[i].NAMA_BRG+"<label style='background-color:#00ff00;''> "+data.data[i].Qty+data.data[i].Nama_satuan+"</label>",
                data.data[i].Status,
                data.data[i].Nama,
                data.data[i].Kd_div
            ] ).draw();
          }
        //   console.log('yay');
        },
        error: function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
  });
});
