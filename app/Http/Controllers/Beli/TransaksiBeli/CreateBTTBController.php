<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Log;


class CreateBTTBController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Create BTTB');
        if ($result > 0) {
            $nosup = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
            $po = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
            $ppn = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
            return view('Beli.TransaksiBeli.CreateBTTB', compact('nosup', 'po', 'ppn', 'access'));
        } else {
            abort(403);
        }
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

    public function createbttb(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 16;

        $createbttb = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd=?, @noPO=?', [$kd, $noPO]);

        return response()->json($createbttb);
    }

    public function drop1(Request $request)
    {
        $idSup = $request->input('idSup');
        $kd = 15;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd =?, @idSup =?', [$kd, $idSup]);

        return response()->json($purchaseorder);
    }


    public function dropdown(Request $request)
    {
        $NM_SUP = $request->input('NM_SUP');
        $kd = 1;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd =?, @NM_SUP =?', [$kd, $NM_SUP]);
        return response()->json($purchaseorder);
    }
    public function createNoBTTB()
    {
        $kd = 7;
        try {
            $tahun = date('y');
            $value = DB::connection('ConnPurchase')->table('YCounter')->value('NO_BTTB');
            $NoBTTB = '0000000000000' . $value;
            $NoBTTB = 'BTTB-' . $tahun . substr($NoBTTB, -6);
            $update = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?', [$kd]);
            return Response()->json(['data' => $NoBTTB, 'status' => $update]);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }

    public function setStatusPO(Request $request)
    {
        $kd = 9;
        $NoPO = $request->input('NoPO');
        try {
            $data = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ? , @NoPO = ?', [$kd, $NoPO]);
            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }

    // public function post(Request $request)
    // {
    //     set_time_limit(300); // Increase execution time limit to 300 seconds
    //     // Record the start time
    //     $startTime = microtime(true);
    //     $data = $request->input('data');
    //     foreach ($data as $item) {
    //         $tglDatang = Carbon::parse($item['tglDatang']);
    //         $Qty = $item['Qty'];
    //         $qtyShip = $item['qtyShip'];
    //         $qtyRcv = $item['qtyRcv'];
    //         $qtyremain = $item['qtyremain'];
    //         $NoSatuan = $item['NoSatuan'];
    //         $SJ = $item['SJ'];
    //         $idSup = $item['idSup'];
    //         $pUnit = $item['pUnit'];
    //         $pPPN = $item['pPPN'];
    //         $noTrans = $item['noTrans'];
    //         $Kd_div = 'PBL';
    //         $kurs = $item['kurs'];
    //         $Operator = trim(Auth::user()->NomorUser);
    //         $pIDRUnit = $item['pIDRUnit'];
    //         $pIDRPPN = $item['pIDRPPN'];
    //         $NoPIB = $item['NoPIB'];
    //         $NoPO = $item['NoPO'];
    //         $BTTB = $item['BTTB'];
    //         $pSub = $item['pSub'];
    //         $pIDRSub = $item['pIDRSub'];
    //         $pTot = $item['pTot'];
    //         $pIDRTot = $item['pIDRTot'];
    //         $NoPIBExt = $item['NoPIBExt'];
    //         $TglPIB = Carbon::parse($item['TglPIB']);
    //         $NoSPPBBC = $item['NoSPPBBC'];
    //         $TglSPPBBC = Carbon::parse($item['TglSPPBBC']);
    //         $NoSKBM = $item['NoSKBM'];
    //         $TglSKBM = Carbon::parse($item['TglSKBM']);
    //         $NoReg = $item['NoReg'];
    //         $TglReg = Carbon::parse($item['TglReg']);
    //         $idPPN = $item['idPPN'];
    //         $jumPPN = $item['jumPPN'];
    //         $persen = $item['persen'];
    //         $disc = $item['disc'] ?? 0;
    //         $discIDR = $item['discIDR'];
    //         $mtUang = $item['mtUang'];
    //         $KodeHS = $item['KodeHS'];
    //         $noTrTmp = $item['noTrTmp'];

    //         if ($BTTB !== null) {
    //             try {
    //                 DB::connection('ConnPurchase')->transaction(function () use ($tglDatang, $Qty, $qtyShip, $qtyRcv, $qtyremain, $NoSatuan, $SJ, $idSup, $pUnit, $pPPN, $noTrans, $Kd_div, $kurs, $Operator, $pIDRUnit, $pIDRPPN, $NoPIB, $NoPO, $BTTB, $pSub, $pIDRSub, $pTot, $pIDRTot, $NoPIBExt, $TglPIB, $NoSPPBBC, $TglSPPBBC, $NoSKBM, $TglSKBM, $NoReg, $TglReg, $idPPN, $jumPPN, $persen, $disc, $discIDR, $mtUang, $KodeHS, $noTrTmp) {
    //                     // Get the current year in two digits
    //                     $tahun = Carbon::now()->format('y');

    //                     // Retrieve and increment YTERIMA value
    //                     $mValue = DB::connection('ConnPurchase')->table('YCounter')->value('YTERIMA');
    //                     $mValue++;

    //                     // Format NoTerima value
    //                     $NoTerima = str_pad($mValue, 10, '0', STR_PAD_LEFT);
    //                     $NoTerima = $tahun . substr($NoTerima, -8);

    //                     // Update YCOUNTER with new YTERIMA value
    //                     DB::connection('ConnPurchase')->table('YCounter')->update(['YTERIMA' => $mValue]);

    //                     // Insert into YTERIMA table
    //                     $insertYTerima = DB::connection('ConnPurchase')->table('YTERIMA')->insert([
    //                         'No_terima' => $NoTerima,
    //                         'Datang' => $tglDatang,
    //                         'Qty' => $Qty,
    //                         'Qty_Terima' => $qtyRcv,
    //                         'Satuan_Terima' => $NoSatuan,
    //                         'No_SuratJalan' => $SJ,
    //                         'No_sup' => $idSup,
    //                         'Min_ord' => 1,
    //                         'Hrg_trm' => $pUnit,
    //                         'No_trans' => $noTrans,
    //                         'Kd_div' => $Kd_div,
    //                         'Kurs_Rp' => $kurs,
    //                         'Cek_BTTB' => Carbon::now()->format('m/d/Y'),
    //                         'User_CekBTTB' => $Operator,
    //                         'hrg_murni_rp' => $pIDRUnit,
    //                         'hrg_ppn' => $pPPN,
    //                         'kurs_ppn' => 1,
    //                         'hrg_ppn_rp' => $pIDRPPN,
    //                         'No_PIB' => $NoPIB,
    //                         'No_PO' => $NoPO,
    //                         'No_BTTB' => $BTTB,
    //                         'Hrg_sub_bttb' => $pSub,
    //                         'Hrg_idr_sub_bttb' => $pIDRSub,
    //                         'Hrg_tot_bttb' => $pTot,
    //                         'Hrg_idr_tot_bttb' => $pIDRTot,
    //                         'NoPIBExt' => $NoPIBExt,
    //                         'TglPIB' => $TglPIB,
    //                         'NoSPPBBC' => $NoSPPBBC,
    //                         'TglSPPBBC' => $TglSPPBBC,
    //                         'NoSKBM' => $NoSKBM,
    //                         'TglSKBM' => $TglSKBM,
    //                         'NoReg' => $NoReg,
    //                         'TglReg' => $TglReg,
    //                         'IdPPN' => $idPPN,
    //                         'No_ket' => '004',
    //                         'PersetujuanBayar' => Carbon::now(),
    //                         'IdMataUang' => $mtUang,
    //                         'Disc_trm' => $persen,
    //                         'Ppn_trm' => $jumPPN,
    //                         'hrg_disc' => $disc,
    //                         'hrg_disc_rp' => $discIDR,
    //                         'NoTransaksiTmp' => $noTrTmp,
    //                         'AvailableQty' => $qtyRcv,
    //                         'KodeHS' => $KodeHS
    //                     ]);

    //                     Log::info($insertYTerima);

    //                     // Determine the status of the order
    //                     if ((int) $qtyremain > 0 || (int) $qtyShip == 0) {
    //                         $stOrder = 9;
    //                     } else if ((int) $qtyremain == 0 && (int) $qtyShip > 0) {
    //                         $stOrder = 10;
    //                     }

    //                     // Update YTRANSBL table
    //                     DB::connection('ConnPurchase')->table('YTRANSBL')
    //                         ->where('No_trans', $noTrans)
    //                         ->update([
    //                             'QtyShipped' => $qtyShip,
    //                             'QtyRemain' => $qtyremain,
    //                             'StatusOrder' => $stOrder
    //                         ]);

    //                     // Transaction and balance update logic
    //                     $div = DB::connection('ConnPurchase')->table('Purchase.dbo.Vw_prg_Accounting')->where('No_Terima', $NoTerima)->value('Kd_Div');
    //                     if ($div !== 'KRR') {
    //                         $ada = DB::connection('ConnPurchase')->table('Accounting.dbo.T_TRANSAKSI_SUPPLIER')->where('Id_Supplier', $idSup)->count();

    //                         if ($ada == 0) {
    //                             DB::connection('ConnPurchase')->table('ACCOUNTING.DBO.T_TRANSAKSI_SUPPLIER')->insert([
    //                                 'Id_Transaksi' => (string) $idSup . '.00000',
    //                                 'Id_TypeTransaksi' => 5,
    //                                 'tanggal' => Carbon::parse($tglDatang)->subDay(),
    //                                 'Id_Supplier' => $idSup,
    //                                 'nilai_debet' => 0,
    //                                 'nilai_kredit' => 0,
    //                                 'kurs' => 0,
    //                                 'saldo' => 0,
    //                                 'user_input' => $idSup,
    //                                 'waktu_input' => Carbon::now(),
    //                                 'nilai_debet_Rp' => 0,
    //                                 'nilai_kredit_Rp' => 0,
    //                                 'Saldo_Rp' => 0,
    //                             ]);
    //                         }

    //                         $idTrans = DB::connection('ConnPurchase')->table('ACCOUNTING.DBO.vw_prg_IdTransCounter_Supplier')->where('Id_Supplier', $idSup)->value('IdTransMax');
    //                         $mValue = $idTrans + 1;
    //                         $mCode = $idSup . '.' . str_pad($mValue, 5, '0', STR_PAD_LEFT);

    //                         DB::connection('ConnPurchase')->table('ACCOUNTING.DBO.T_TRANSAKSI_SUPPLIER')->insert([
    //                             'Id_Transaksi' => $mCode,
    //                             'Id_TypeTransaksi' => 1,
    //                             'tanggal' => $tglDatang,
    //                             'Id_Supplier' => $idSup,
    //                             'nilai_debet' => $pTot,
    //                             'nilai_kredit' => 0,
    //                             'kurs' => $kurs,
    //                             'saldo' => $pTot,
    //                             'user_input' => $Operator,
    //                             'waktu_input' => Carbon::now(),
    //                             'nilai_debet_Rp' => $pIDRTot,
    //                             'nilai_kredit_Rp' => 0,
    //                             'Saldo_Rp' => $pIDRTot
    //                         ]);

    //                         $dataTrans = DB::connection('ConnPurchase')->table('ACCOUNTING.DBO.T_TRANSAKSI_SUPPLIER')
    //                             ->select('Id_Transaksi', 'nilai_debet', 'nilai_kredit', 'saldo', 'nilai_debet_Rp', 'nilai_kredit_Rp', 'Saldo_Rp')
    //                             ->where('Id_Supplier', $idSup)
    //                             ->orderBy('Id_Transaksi', 'asc')
    //                             ->get();

    //                         $tsaldo = 0;
    //                         $tsaldoRP = 0;
    //                         foreach ($dataTrans as $trans) {
    //                             $tsaldo += floatval($trans->nilai_debet) - floatval($trans->nilai_kredit);
    //                             $tsaldoRP += floatval($trans->nilai_debet_Rp) - floatval($trans->nilai_kredit_Rp);
    //                             DB::connection('ConnPurchase')->table('ACCOUNTING.DBO.T_TRANSAKSI_SUPPLIER')
    //                                 ->where('Id_Transaksi', $trans->Id_Transaksi)
    //                                 ->update([
    //                                     'Saldo' => number_format($tsaldo, 2, '.', ''),
    //                                     'Saldo_Rp' => number_format($tsaldoRP, 2, '.', '')
    //                                 ]);
    //                         }
    //                     }
    //                 });
    //                 // Calculate the elapsed time
    //                 $endTime = microtime(true);
    //                 $elapsedTime = $endTime - $startTime;
    //                 Log::info('Elapsed Time for post BTTB: ' . $elapsedTime . ' | NoTrans: ' . $noTrans);
    //             } catch (\Exception $e) {
    //                 Log::info($e);
    //                 return response()->json(['error' => $e->getMessage()], 500);
    //             }
    //         }
    //     }
    //     return response()->json(['success' => 'Data processed successfully']);
    // }

    public function post(Request $request)
    {
        // $tglDatang = Carbon::parse($request->input('tglDatang'));
        // $Qty = $request->input('Qty');
        // $qtyShip = $request->input('qtyShip');
        // $qtyRcv = $request->input('qtyRcv');
        // $qtyremain = $request->input('qtyremain');
        // $NoSatuan = $request->input('NoSatuan');
        // $SJ = $request->input('SJ');
        // $idSup = $request->input('idSup');
        // $pUnit = $request->input('pUnit');
        // $pPPN = $request->input('pPPN');
        // $noTrans = $request->input('noTrans');
        // $Kd_div = 'PBL';
        // $kurs = $request->input('kurs');
        // $Operator = trim(Auth::user()->NomorUser);
        // $pIDRUnit = $request->input('pIDRUnit');
        // $pIDRPPN = $request->input('pIDRPPN');
        // $NoPIB = $request->input('NoPIB');
        // $NoPO = $request->input('NoPO');
        // $BTTB = $request->input('BTTB');
        // $pSub = $request->input('pSub');
        // $pIDRSub = $request->input('pIDRSub');
        // $pTot = $request->input('pTot');
        // $pIDRTot = $request->input('pIDRTot');
        // $NoPIBExt = $request->input('NoPIBExt');
        // $TglPIB = Carbon::parse($request->input('TglPIB'));
        // $NoSPPBBC = $request->input('NoSPPBBC');
        // $TglSPPBBC = Carbon::parse($request->input('TglSPPBBC'));
        // $NoSKBM = $request->input('NoSKBM');
        // $TglSKBM = Carbon::parse($request->input('TglSKBM'));
        // $NoReg = $request->input('NoReg');
        // $TglReg = Carbon::parse($request->input('TglReg'));
        // $idPPN = $request->input('idPPN');
        // $jumPPN = $request->input('jumPPN');
        // $persen = $request->input('persen');
        // $disc = $request->input('disc');
        // $discIDR = $request->input('discIDR');
        // $mtUang = $request->input('mtUang');
        // $KodeHS = $request->input('KodeHS');
        // $noTrTmp = $request->input('noTrTmp');

        // Record the start time
        $startTime = microtime(true);

        set_time_limit(300); // Increase execution time limit to 300 seconds

        $data = $request->input('data');
        $kd = 8;
        try {
            foreach ($data as $item) {
                $tglDatang = Carbon::parse($item['tglDatang']);
                $Qty = $item['Qty'];
                $qtyShip = $item['qtyShip'];
                $qtyRcv = $item['qtyRcv'];
                $qtyremain = $item['qtyremain'];
                $NoSatuan = $item['NoSatuan'];
                $SJ = $item['SJ'];
                $idSup = $item['idSup'];
                $pUnit = $item['pUnit'];
                $pPPN = $item['pPPN'];
                $noTrans = $item['noTrans'];
                $Kd_div = 'PBL';
                $kurs = $item['kurs'];
                $Operator = trim(Auth::user()->NomorUser);
                $pIDRUnit = $item['pIDRUnit'];
                $pIDRPPN = $item['pIDRPPN'];
                $NoPIB = $item['NoPIB'];
                $NoPO = $item['NoPO'];
                $BTTB = $item['BTTB'];
                $pSub = $item['pSub'];
                $pIDRSub = $item['pIDRSub'];
                $pTot = $item['pTot'];
                $pIDRTot = $item['pIDRTot'];
                $NoPIBExt = $item['NoPIBExt'];
                $TglPIB = Carbon::parse($item['TglPIB']);
                $NoSPPBBC = $item['NoSPPBBC'];
                $TglSPPBBC = Carbon::parse($item['TglSPPBBC']);
                $NoSKBM = $item['NoSKBM'];
                $TglSKBM = Carbon::parse($item['TglSKBM']);
                $NoReg = $item['NoReg'];
                $TglReg = Carbon::parse($item['TglReg']);
                $idPPN = $item['idPPN'];
                $jumPPN = $item['jumPPN'];
                $persen = $item['persen'];
                $disc = $item['disc'] ?? 0;
                $discIDR = $item['discIDR'];
                $mtUang = $item['mtUang'];
                $KodeHS = $item['KodeHS'];
                $noTrTmp = $item['noTrTmp'];
                if (($BTTB !== null)) {
                    $post = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO
                @kd = ?,@tglDatang = ?,@Qty = ?,@qtyShip = ?,@qtyRcv = ?,
                @qtyremain = ?,@NoSatuan = ?,@SJ = ?,@idSup = ?,@pUnit = ?,
                @pPPN = ?,@noTrans = ?,@Kd_div = ?,@kurs = ?,@Operator = ?,
                @pIDRUnit = ?,@pIDRPPN = ?,@NoPIB = ?,@NoPO = ?,@BTTB = ?,
                @pSub = ?,@pIDRSub = ?,@pTot = ?,@pIDRTot = ?,@NoPIBExt = ?,
                @TglPIB = ?,@NoSPPBBC = ?,@TglSPPBBC = ?,@NoSKBM = ?,@TglSKBM = ?,
                @NoReg = ?,@TglReg = ?,@idPPN = ?,@jumPPN = ?,@persen = ?,@disc = ?,
                @discIDR = ?,@mtUang = ?,@KodeHS = ?,@noTrTmp = ?',
                        [
                            $kd,
                            $tglDatang,
                            $Qty,
                            $qtyShip,
                            $qtyRcv,
                            $qtyremain,
                            $NoSatuan,
                            $SJ,
                            $idSup,
                            $pUnit,
                            $pPPN,
                            $noTrans,
                            $Kd_div,
                            $kurs,
                            $Operator,
                            $pIDRUnit,
                            $pIDRPPN,
                            $NoPIB,
                            $NoPO,
                            $BTTB,
                            $pSub,
                            $pIDRSub,
                            $pTot,
                            $pIDRTot,
                            $NoPIBExt,
                            $TglPIB,
                            $NoSPPBBC,
                            $TglSPPBBC,
                            $NoSKBM,
                            $TglSKBM,
                            $NoReg,
                            $TglReg,
                            $idPPN,
                            $jumPPN,
                            $persen,
                            $disc,
                            $discIDR,
                            $mtUang,
                            $KodeHS,
                            $noTrTmp
                        ]
                    );
                    // Calculate the elapsed time
                    $endTime = microtime(true);
                    $elapsedTime = $endTime - $startTime;
                    Log::info((string) 'Elapsed Time for post BTTB: ' . $elapsedTime . ' | NoTrans: ' . $noTrans);
                } else {
                    return response()->json(['error' => 'Parameter BTTB harus di isi'], 400);
                }
            }
            return Response()->json(['message' => 'Data Berhasil Post', 'Status' => $post]);
        } catch (\Exception $e) {
            Log::info($e);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function print(Request $request)
    {
        $No_BTTB = $request->input('No_BTTB');
        if (($No_BTTB !== null)) {
            try {
                $print = DB::connection('ConnPurchase')
                    ->table('VW_5409_PRINT_BTTB')
                    ->where('VW_5409_PRINT_BTTB.No_BTTB', $No_BTTB)
                    ->whereNull('VW_5409_PRINT_BTTB.TglRetur')
                    ->get();
                $printHeader = DB::connection('ConnPurchase')->table('VW_5409_PRINT_HEADER_BTTB')->where('VW_5409_PRINT_HEADER_BTTB.No_BTTB', $No_BTTB)->get();

                return Response()->json(["print" => $print, "printHeader" => $printHeader]);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function show(Request $request, $id)
    {
        if ($id == 'setToleransi') {
            $kodeBarang = $request->input('kode_barang');
            $input = $request->input('inputValue');

            // Validate the input to ensure it is numeric
            if (!is_numeric($input)) {
                return response()->json(['error' => 'Invalid input'], 400);
            }

            // Convert input to a float and format it to two decimal places
            $formattedInput = number_format((float) $input, 2, '.', '');

            // Ensure the formatted input does not exceed the decimal(4,2) limit
            if ($formattedInput > 9999.99) {
                return response()->json(['error' => 'Input exceeds allowed range for decimal(4,2)'], 400);
            }

            // Update the 'Toleransi' column in the 'Y_BARANG' table
            try {
                DB::connection('ConnPurchase')->table('Y_BARANG')
                    ->where('KD_BRG', (string) $kodeBarang) // Ensure this matches the column name in your table
                    ->update(['Toleransi' => (float) $formattedInput]);

                // Retrieve the updated 'Toleransi' value
                $updatedToleransi = DB::connection('ConnPurchase')->table('Y_BARANG')
                    ->where('KD_BRG', (string) $kodeBarang)
                    ->value('Toleransi');

                // Return a success response with the updated value
                return response()->json([
                    'success' => 'Toleransi updated successfully',
                    'toleransi' => $updatedToleransi,
                ]);
            } catch (\Exception $e) {
                // Return error response in case of a database error
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getToleransi') {
            $kodeBarang = $request->input('kode_barang');
            $updatedToleransi = DB::connection('ConnPurchase')->table('Y_BARANG')
                ->where('KD_BRG', (string) $kodeBarang)
                ->value('Toleransi');
            return response()->json([
                'success' => 'Toleransi updated successfully',
                'toleransi' => $updatedToleransi,
            ]);
        }

        // Return an error response if the id does not match 'setToleransi'
        return response()->json(['error' => 'Invalid request'], 400);
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
