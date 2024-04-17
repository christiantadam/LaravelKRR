<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceOrderKerjaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $satuan = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_SATUAN]');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        return view('WORKSHOP.Workshop.Transaksi.MaintenanceOrderKerja', compact(['divisi', 'satuan'], 'access'));
    }
    public function LoadData1($noGambar)
    {
        $data1 = DB::connection('ConnPurchase')->select('[SP_5298_WRK_LOAD-BARANG-2] @noGbr = ?', [$noGambar]);
        return response()->json($data1);
    }
    public function LoadData2($kdbarang)
    {
        $data2 = DB::connection('Connworkshop')->select('[SP_5298_WRK_SALDO-BARANG] @kdBarang = ?', [$kdbarang]);
        return response()->json($data2);
    }
    public function LoadData($kdBarang)
    {
        $data = DB::connection('ConnPurchase')->select('[SP_5298_WRK_LOAD-BARANG-1] @kdBarang = ?', [$kdBarang]);
        return response()->json($data);
    }
    public function GetDataAll($tgl_awal, $tgl_akhir, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [1, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);
    }
    public function GatDataForUserOrder($tgl_awal, $tgl_akhir, $iduserOrder, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?, @user = ?, @div = ?', [2, $tgl_awal, $tgl_akhir, $iduserOrder, $divisi]);
        return response()->json($all);
    }
    public function mesin($idDivisi)
    {
        $mesin = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-MESIN] @Id_divisi = ?', [$idDivisi]);
        return response()->json($mesin);
    }


    public function create()
    {
        //
    }

    public function inputfile(Request $request)
    {
        // dd($request->all(), $request->file('inputpdfmodal'));
        $request->validate([
            'inputpdfmodal' => 'required|mimes:pdf|max:2048', // Adjust the max file size as needed
        ]);
        $kdBarang = $request->kode;
        $pdf = $request->file('inputpdfmodal');
        $binaryReader = fopen($pdf, 'rb');
        $pdfBinary = fread($binaryReader, $pdf->getSize());
        fclose($binaryReader);
        // dd($pdf, $binaryReader, $pdfBinary);
        DB::connection('ConnPurchase')->table('Y_FOTO')->insert([
            'KD_BARANG' => $kdBarang,
            'PDF' => DB::raw('0x' . bin2hex($pdfBinary)) // Assuming PDF column is binary data type
        ]);
        return response()->json(['success' => 'mantap']);
    }

    public function updatepdf(Request $request)
    {
        $request->validate([
            'updatepdfmodal' => 'required|mimes:pdf|max:2048', // Adjust the max file size as needed
        ]);
        $kdBarang = $request->kode;
        $pdf = $request->file('updatepdfmodal');
        $binaryReader = fopen($pdf, 'rb');
        $pdfBinary = fread($binaryReader, $pdf->getSize());
        fclose($binaryReader);
        // dd($pdf, $binaryReader, $pdfBinary);
        DB::connection('ConnPurchase')->table('Y_FOTO')->where('KD_BARANG', $kdBarang)->update([
            'PDF' => DB::raw('0x' . bin2hex($pdfBinary))
        ]);
    }
    public function selectpdf($kdBarang)
    {
        $pdf = DB::connection('ConnPurchase')
            ->table('Y_FOTO')
            ->select('PDF')
            ->where('KD_BARANG', '=', $kdBarang)
            ->first();
        //dd($pdf);
        if ($pdf) {
            $pdfContent = $pdf->PDF;

            return Response::make($pdfContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="document.pdf"'
            ]);
        }
        // return response()->json($pdf);
    }
    public function store(Request $request)
    {
        //dd($request->all());
        $tgl = $request->tanggalmodal;
        $IdDiv = $request->iddivisiOrder;
        $kdBrg = $request->Kdbarangmodal;
        $noGbr = $request->NomorGambarModal;
        $namaBrg = $request->NamaBarangModal;
        $jml = $request->JumlahModal;
        $userOd = $request->UserModal;
        $ketOd = $request->KeteranganModal;
        $noSat = $request->SatuanModal;
        $noMesin = $request->MesinModal;
        $radio = $request->inlineRadioOptions;
        if ($radio == "Baru") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-KRJ] @tgl = ?, @IdDiv = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$tgl, $IdDiv, $kdBrg, $noGbr, $namaBrg, $jml, $userOd, $ketOd, $noSat, $noMesin, 1]);
        }
        if ($radio == "Perbaikan") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-KRJ] @tgl = ?, @IdDiv = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$tgl, $IdDiv, $kdBrg, $noGbr, $namaBrg, $jml, $userOd, $ketOd, $noSat, $noMesin, 3]);
        }
        return redirect()->back()->with('success', 'Data TerSIMPAN');
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //dd($request->all());
        $kdBrg = $request->Kdbarangmodal;
        $noGbr = $request->NomorGambarModal;
        $namaBrg = $request->NamaBarangModal;
        $jml = $request->JumlahModal;
        $ketOd = $request->KeteranganModal;
        $noSat = $request->SatuanModal;
        $noMesin = $request->MesinModal;
        $radio = $request->inlineRadioOptions;
        if ($radio == "Baru") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-KRJ] @noOrder = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?,  @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$id, $kdBrg, $noGbr, $namaBrg, $jml, $ketOd, $noSat, $noMesin, 1]);
        }
        if ($radio == "Perbaikan") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-KRJ] @noOrder = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?,  @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$id, $kdBrg, $noGbr, $namaBrg, $jml, $ketOd, $noSat, $noMesin, 3]);
        }
        return redirect()->back()->with('success', 'Data TerKOREKSI');
    }


    public function destroy($id)
    {
        //dd($id);
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_DELETE-ORDER-KRJ] @noOrder = ?', [$id]);
        return redirect()->back()->with('success', 'Data TerHAPUS');
    }
}
