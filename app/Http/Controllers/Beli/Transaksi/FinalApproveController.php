<?php

namespace App\Http\Controllers\Beli\Transaksi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Beli\TransBL;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DateTime;
use DateTimeZone;
use DB;


class FinalApproveController extends Controller
{
    public function index(Request $request)
    {
        $kd = 4;
        $operator = strtoupper(trim(Auth::user()->NomorUser));
        $result = (new HakAksesController)->HakAksesFitur('Final Approve');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $isManager = $this->isManager($operator);
        if ($result > 0) {
            // $data = TransBL::select()->join('YUSER_ACC_DIR', 'YUSER_ACC_DIR.Kd_div', 'YTRANSBL.Kd_div')->leftjoin('Y_BARANG', 'Y_BARANG.KD_BRG', 'YTRANSBL.Kd_brg')->leftjoin('YUSER', 'YUSER.kd_user', 'YTRANSBL.Operator')->leftjoin('YSATUAN', 'YSATUAN.No_satuan', 'YTRANSBL.NoSatuan')->leftjoin('STATUS_ORDER', 'STATUS_ORDER.KdStatus', 'YTRANSBL.StatusOrder')->where('YUSER_ACC_DIR.Kd_user', strval(Auth::user()->kd_user))->where('StatusOrder', '3')->get();
            // $data = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @Operator=?', [$kd, $operator]);
            // dd($data);
            return view('Beli.Transaksi.FinalApprove.List', compact('access', 'operator', 'isManager'));
        } else {
            abort(403);
        }
    }

    public function store(Request $request)
    {

        DB::beginTransaction();

        try {
            $checkBox = $request->input('checkedBOX', []);
            if (empty($checkBox)) {
                DB::rollBack();
                return response()->json(['error' => 'Tidak ada data dipilih', 404]);
                // return back()->with('danger', 'Tidak ada data dipilih');
            }

            $now = now('Asia/Jakarta');
            $user = trim(Auth::user()->NomorUser);
            $kdDivisiPengadaanPembelian = [
                "BKL",
                "CL ",
                "CLD",
                "CLM",
                "BKR",
                "BRD",
                "NDL",
                "RBL",
            ];
            // dd($checked, $statusBeli, $kdDivisiChecked);

            switch ($request->input('action')) {

                /* =========================
                 * APPROVE
                 * ========================= */
                case 'Approve':

                    foreach ($checkBox as $row) {
                        $noTrans = trim($row['No_trans']);
                        $statusBeli = (int) $row['StatusBeli'];
                        $kdDivisiChecked = trim($row['Kd_div']);
                        $isDirektur = in_array($user, ['RUDY', 'TJAHYO', 'YUDI']);
                        $isManager = $this->isManager($user);
                        $user = trim(Auth::user()->NomorUser);
                        if (
                            $statusBeli === 1 &&
                            in_array($kdDivisiChecked, $kdDivisiPengadaanPembelian, true)

                        ) {
                            if ($user === 'TJAHYO') {
                                // Direktur2
                                TransBL::where('No_trans', '=', $noTrans)->update([
                                    'Tgl_Direktur2' => $now,
                                    'Direktur2' => $user,
                                    'Dir_Agree2' => 1,
                                ]);
                            } else {
                                // Direktur1
                                TransBL::where('No_trans', '=', $noTrans)->update([
                                    'Tgl_Direktur' => $now,
                                    'Direktur' => $user,
                                    'Dir_Agree' => 1
                                ]);
                            }
                            $data = TransBL::where('No_trans', $noTrans)
                                ->select('Direktur', 'Direktur2')
                                ->first();

                            if ($data && $data->Direktur && $data->Direktur2) {
                                TransBL::where('No_trans', $noTrans)->update([
                                    'StatusOrder' => 4,
                                ]);
                            }

                        } else if ($statusBeli === 0 && $isManager) {
                            // MANAGER FINAL APPROVE (Beli Sendiri)
                            TransBL::where('No_trans', $noTrans)->update([
                                'Tgl_Direktur' => $now,
                                'Direktur' => $user,
                                'Dir_Agree' => 1,
                                'StatusOrder' => 4,
                            ]);
                        } else {
                            // Direktur1
                            TransBL::where('No_trans', '=', $noTrans)->update([
                                'Tgl_Direktur' => $now,
                                'Direktur' => $user,
                                'Dir_Agree' => 1,
                                'StatusOrder' => 4,
                            ]);
                        }
                    }

                    DB::commit();
                    return response()->json(['success' => 'Data berhasil di-approve'], 200);
                default:
                    DB::rollBack();
                    return response()->json(['error' => 'Request invalid'], 405);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e], 405);

            // dd([
            //     'ERROR_MESSAGE' => $e->getMessage(),
            //     'ERROR_FILE' => $e->getFile(),
            //     'ERROR_LINE' => $e->getLine(),
            //     'TRACE' => collect($e->getTrace())->take(5),
            // ]);
        }
    }



    public function show($id, Request $request)
    {
        if ($id == 'getAllSPPB') {
            $kdUser = trim(Auth::user()->NomorUser);
            $isDirektur = in_array($kdUser, ['RUDY', 'TJAHYO', 'YUDI']);
            $isManager = $this->isManager($kdUser);
            $kdDivisiPengadaanPembelian = [
                "BKL",
                "CL ",
                "CLD",
                "CLM",
                "BKR",
                "BRD",
                "NDL",
                "RBL",
            ];
            $data = collect(DB::connection('ConnPurchase')->select(
                'EXEC dbo.SP_5409_LIST_ORDER @kd = ?, @Operator = ?',
                [4, $kdUser]
            ))
                ->filter(function ($row) use ($isDirektur, $kdUser, $kdDivisiPengadaanPembelian) {

                    // Direktur → ONLY StatusBeli = 1
                    if ($isDirektur) {
                        // TJAHYO → StatusBeli = 1 AND division must match
                        if ($kdUser === 'TJAHYO') {
                            return $row->StatusBeli == 1
                                && in_array(trim($row->Kd_div), $kdDivisiPengadaanPembelian);
                        }

                        // Other directors → only StatusBeli = 1
                        return $row->StatusBeli == 1;
                    }

                    // Non-direktur → return everything
                    return true;
                })->map(function ($row) use ($isManager) {
                    // inject flag manager
                    $row->is_manager = $isManager;
                    return $row;
                });
            return datatables($data)->make(true);
        } else if ($id == 'getAllNoTrans') {
            $kdUser = trim(Auth::user()->NomorUser);
            $isDirektur = in_array($kdUser, ['RUDY', 'TJAHYO', 'YUDI']);
            $isManager = $this->isManager($kdUser);

            // proteksi
            if (!$isDirektur && !$isManager) {
                return response()->json([], 200);
            }

            // $operator = $isDirektur ? $kdUser : null;

            $data = DB::connection('ConnPurchase')->select(
                'EXEC dbo.SP_5409_LIST_ORDER @kd = ?, @Operator = ?',
                [4, $kdUser]
            );
            // dd($isManager, $isDirektur);
            $collection = collect($data);

            // filter hak approve
            $collection = $collection->filter(function ($row) use ($isDirektur, $isManager, $kdUser) {

                // Direktur → semua sesuai SP
                if ($isDirektur) {
                    return $row->StatusBeli == 1;
                }

                // Manager → hanya Beli Sendiri & divisinya sendiri
                if ($isManager) {
                    if ($row->StatusBeli == 0) {
                        return true;
                    }
                }

                return false;
            });

            // search DataTables
            if ($request->filled('search.value')) {
                $search = strtoupper($request->input('search.value'));

                $collection = $collection->filter(function ($row) use ($search) {
                    return str_contains(
                        strtoupper(trim($row->NO_PO)),
                        $search
                    );
                });
            }

            return $collection->map(function ($row) {
                return [
                    'No_trans' => trim($row->No_trans),
                    'StatusBeli' => trim($row->StatusBeli),
                    'Kd_div' => trim($row->Kd_div),
                ];
            })->values();
        } else if ($id == 'getDetailNoTrans') {
            $noTrans = $request->noTrans;
            $data = DB::connection('ConnPurchase')->select('SELECT	YBR.NAMA_BRG, YTB.Qty, YSU.NM_SUP, YDI.NM_DIV, YTB.Operator, YTB.StatusBeli, YTB.keterangan, YTB.Ket_Internal, YTB.PriceUnit, TMT.Id_MataUang_BC,
                                                                            		YKU.nama, YKK.nama_kategori, YKS.nama_sub_kategori, YUS.Nama AS NamaUser, YTB.PriceExt, YTB.PPN, YTB.harga_disc
                                                                            FROM	YTRANSBL YTB INNER JOIN
                                                                            		Y_BARANG YBR ON YTB.Kd_brg = YBR.KD_BRG INNER JOIN
                                                                            		YSUPPLIER YSU ON YTB.Supplier = YSU.NO_SUP INNER JOIN
                                                                            		YDIVISI YDI ON YTB.Kd_div = YDI.KD_DIV INNER JOIN
                                                                            		ACCOUNTING.dbo.T_MATAUANG TMT ON YTB.Currency = TMT.Id_MataUang INNER JOIN
                                                                            		Y_KATEGORI_SUB YKS ON YBR.NO_SUB_KATEGORI = YKS.no_sub_kategori INNER JOIN
                                                                            		Y_KATEGORY YKK ON YKS.no_kategori = YKK.no_kategori INNER JOIN
                                                                            		Y_KATEGORI_UTAMA YKU ON YKK.no_kat_utama = YKU.no_kat_utama INNER JOIN
		                                                                            YUSER YUS ON YUS.kd_user = YTB.Operator
                                                                            WHERE	YTB.No_trans = ?', [$noTrans]);
            return response()->json($data, 200);
        } else {
            return response()->json('Invalid request', 405);
        }
    }

    public function update(Request $request, $id)
    {
        $date = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
        $date->format('Y-m-d H:i:s');
        TransBL::where('No_trans', $id)->update(['Tgl_Direktur' => $date, 'Direktur' => trim(Auth::user()->NomorUser), 'StatusOrder' => '4']);

        return back();
    }

    public function isManager(string $user): bool
    {
        return DB::table('YUSER_ACC_DIR')
            ->where('Kd_user', $user)
            ->exists();
    }


}
