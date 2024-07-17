<?php

namespace App\Http\Controllers\Utility\PanelInduk;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class InputGangguanPanelController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_GENZET');
        $keterangan = DB::connection('ConnUtility')->select('exec SP_LIST_KET_GANGGUANG_PANEL_INDUK');
        $IDUser = auth::user()->IDUser;
        $teknisi = DB::connection('ConnUtility')
            ->select("exec SP_LIST_UTILITY_TEKNISI @IdUserMaster = ?", [$IDUser]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.PanelInduk.InputGangguanPanel', compact('mesin', 'keterangan', 'teknisi', 'access'));
    }

    public function createPANEL(Request $request)
    {
        try {
            $tanggal = $request->input('Tanggal');
            $feeder = $request->input('Feeder');
            $start = $request->input('JamMulai');
            $end = $request->input('JamSelesai');
            $gangguan = $request->input('Gangguan');
            $keterangan = $request->input('Keterangan');
            $UserLog = Auth::user()->NomorUser;
            $UserInput = Auth::user()->IDUser;
            // $Teknisi = $request->input('Teknisi');
            // dd($UserInput);

            $idTeknisi = DB::connection('ConnUtility')->table('Utility_Teknisi')->select('Utility_Teknisi.Id_Teknisi')
                ->join('EDP.dbo.UserMaster', 'Utility_Teknisi.IdUserMaster', 'EDP.dbo.UserMaster.IDUser')
                ->where('EDP.dbo.UserMaster.IDUser', $UserInput)->get();

            // dd($idTeknisi[0]->Id_Teknisi);
            // dd($idTeknisi);
            $datetimeNow = now();
            $datetimeStart = $datetimeNow->toDateString() . ' ' . $start;
            $datetimeEnd = $datetimeNow->toDateString() . ' ' . $end;

            // $dataTeknisi = DB::connection('ConnUtility')->table('E_Panel_induk')->insert([
            //     'Teknisi_Utility'=>$Teknisi,
            // ]);


            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_PANEL_INDUK ? , ? , ? , ? , ? , ? , ? , ?', [$tanggal, $feeder, $datetimeStart, $datetimeEnd, $gangguan, $keterangan, $UserLog, $idTeknisi[0]->Id_Teknisi]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function reloadKeterangan()
    {
        $keterangan = DB::connection('ConnUtility')->select('exec SP_LIST_KET_GANGGUANG_PANEL_INDUK');
        return response()->json($keterangan);
    }

    public function updatePANEL(Request $request)
    {
        try {
            $id = $request->input('NomorPanel');
            $tanggal = $request->input('Tanggal');
            $feeder = $request->input('Feeder');
            $start = $request->input('JamMulai');
            $end = $request->input('JamSelesai');
            $gangguan = $request->input('Gangguan');
            $keterangan = $request->input('Keterangan');
            $UserLog = Auth::user()->NomorUser;
            $UserInput = Auth::user()->IDUser;
            // $Teknisi = $request->input('Teknisi');
            $idTeknisi = DB::connection('ConnUtility')->table('Utility_Teknisi')->select('Utility_Teknisi.Id_Teknisi')
                ->join('EDP.dbo.UserMaster', 'Utility_Teknisi.IdUserMaster', 'EDP.dbo.UserMaster.IDUser')
                ->where('EDP.dbo.UserMaster.IDUser', $UserInput)->get();
            // dd($UserLog, $idTeknisi);
            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_PANEL_INDUK ?, ? , ? , ? , ? , ? , ? , ? , ? ', [$tanggal, $feeder, $start, $end, $gangguan, $keterangan, $UserLog, $idTeknisi[0]->Id_Teknisi , $id]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getPANELById(Request $request)
    {
        $id = $request->input('id');
        // dd($id);
        $listPerawatan =
            DB::connection('ConnUtility')->select('exec SP_DT_LIST_PANEL_INDUK_BLN_THN2 @kode = ?, @id=?', [2, $id]);
            // dd($tes);
        return datatables($listPerawatan)->make(true);
    }

    public function getPANEL(Request $request)
    {
        $date1 = $request->input('date1');
        $date2 = $request->input('date2');

        $listPerawatan =
            DB::connection('ConnUtility')->select('exec SP_DT_LIST_PANEL_INDUK_BLN_THN2 @kode = ?, @date1 = ?, @date2 = ?', [1, $date1, $date2]);
        return datatables($listPerawatan)->make(true);
    }

    public function deletePANEL(Request $request)
    {
        try {
            $Id_Transaksi = $request->input('id');

            foreach ($Id_Transaksi as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_PANEL_INDUK  @id_transaksi = ?', [$id]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
