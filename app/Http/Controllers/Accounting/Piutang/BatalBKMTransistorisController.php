<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables;

class BatalBKMTransistorisController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BatalBKMTransistoris', compact('access'));
    }


    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $kode = $request->input('kode');
        $bulanTahun = $request->input('bulanTahun');
        $BKK = $request->input('BKK');

        if ($id === 'getBKM') {
            $bln = substr($bulanTahun, 0, 2);
            $thn = substr($bulanTahun, -2);
            // $BlnThn = $bln . $thn;

            if ($kode === 3) {
                $query = DB::connection('ConnAccounting')->select('
                    SELECT P.Id_BKM
                    FROM T_PELUNASAN P
                    INNER JOIN dbo.T_PELUNASAN_TAGIHAN T ON P.Id_BKM = T.Id_BKM
                    WHERE (T.Id_Bank = ?) AND
                    ((RIGHT(P.Id_BKM, 4) = ?) OR (MONTH(P.Tgl_Input) = ? AND RIGHT(YEAR(P.Tgl_Input), 2) = ?))
                    GROUP BY P.Id_BKM
                    ORDER BY P.Id_BKM', ['KRR1', $bulanTahun, $bln, $thn]);
            } else {
                $query = DB::connection('ConnAccounting')->select('
                    SELECT P.Id_BKM
                    FROM T_PELUNASAN P
                    INNER JOIN dbo.T_PELUNASAN_TAGIHAN T ON P.Id_BKM = T.Id_BKM
                    WHERE (T.Id_Bank <> ?) AND
                    ((RIGHT(P.Id_BKM, 4) = ?) OR (MONTH(P.Tgl_Input) = ? AND RIGHT(YEAR(P.Tgl_Input), 2) = ?))
                    GROUP BY P.Id_BKM
                    ORDER BY P.Id_BKM', ['KRR1', $bulanTahun, $bln, $thn]);
            }

            // dd($query, $bln, $thn);

            return datatables($query)->make(true);

        } else if ($id === 'getDetailBKM') {
            $detilBKM = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK_BTLBKK ?,?', [$BKK, $kode]);
            // dd($request->all(), $detilBKM);

            $data_detilBKM = [];
            foreach ($detilBKM as $detail_detilBKM) {
                $data_detilBKM[] = [
                    'Status_Penagihan' => $detail_detilBKM->Status_Penagihan,
                    'Nama_MataUang' => $detail_detilBKM->Nama_MataUang,
                    'Nilai_Pelunasan' => $detail_detilBKM->Nilai_Pelunasan,
                    'Batal' => $detail_detilBKM->Batal,
                    'Uraian' => $detail_detilBKM->Uraian

                ];
            }

            // Check the Status_Penagihan
            if ($data_detilBKM[0]['Status_Penagihan'] === 'Y') {
                $notice = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_BTLBKK ?', [$BKK]);

                $ada = $notice[0]->Ada;
                // dd($ada);

                if ($ada > 0) {
                    return response()->json(['warning' => 'SUDAH Melunasi Kartu Hutang'], 200);
                } else {
                    return response()->json($data_detilBKM);
                }
            } else {
                return response()->json($data_detilBKM);
            }
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $BKK = $request->input('BKK');
        $alasan = $request->input('alasan');
        $user = Auth::user()->NomorUser;

        if ($id === 'batal') {
            try {
                // dd($request->all());
                // delete
                DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_BATAL_BKM ?,?,?', [$BKK, $alasan, $user]);

                return response()->json(['success' => 'Data BKK sudah diBATALkan!!'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data BKK Gagal diBATALkan!!' . $e->getMessage()], 500);
            }
        }
    }



    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
