<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceBKMKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceBKMKRR1', compact('access'));
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
    public function show(Request $request, $id)
    {
        if ($id == 'getKira') {
            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_KODEPERKIRAAN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                    'Keterangan' => trim($row->Keterangan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getMataUang') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_MATA_UANG @kode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_MataUang' => $row->Id_MataUang,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBank') {
            // Execute the stored procedure for 'SP_5298_ACC_LIST_BANK'
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Bank' => $row->Id_Bank,
                    'Nama_Bank' => $row->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetail') {
            // Execute the stored procedure for 'SP_5298_ACC_LIST_BANK_1'
            $bankId = $request->input('id_bank');
            $result = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [trim($bankId)]);
            // dd($result);
            if (!empty($result)) {
                $response = [
                    'JenisBank' => trim($result[0]->jenis),
                ];
                return response()->json($response);
            }
        } else if ($id == 'getJenisBayar') {
            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_JENIS_DOK');

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Jenis_Bayar' => trim($row->Id_Jenis_Bayar),
                    'Jenis_Pembayaran' => trim($row->Jenis_Pembayaran),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'processData') {
            $input = $request->all();
            // dd($input);
            $ModeKoreksi = false;
            $periode = date('Y');
            // dd($periode);
            $id_output = '';
            if (
                !empty($input['diterima_dari']) && !empty($input['jumlah_uang']) && !empty($input['nama_bank']) &&
                !empty($input['keterangan_kira']) && !empty($input['mata_uang']) && !empty($input['jenis_pembayaran'])
            ) {

                $response = [];
                if (empty($input['id_bkm'])) {
                    $results = DB::connection('ConnAccounting')
                        ->statement('exec SP_5409_ACC_COUNTER_BKM_BKK @bank = ?, @jenis = ?, @tgl = ?, @id = ?', [
                            trim($input['id_bank']),
                            'R',
                            $input['tanggal_input'],
                            &
                            $id_output,
                        ]);

                    if (!empty($results)) {
                        $tahun = date('Y', strtotime($input['tanggal_input'])); // Get the year from the date
                        $bank = trim($input['id_bank']); // Trim and set the bank
                        $noUrut = DB::connection('ConnAccounting')
                            ->table('T_Counter_BKM')
                            ->where('Periode', $periode)
                            ->value('Id_BKM_E_Rp');

                        // Create the '00000' + convert(varchar(5),@noUrut,0)
                        $idBKM = str_pad($noUrut, 5, '0', STR_PAD_LEFT); // Pad the number to 5 digits with leading zeros

                        // Concatenate the bank code, 'R', and the formatted year and number
                        $idBKM = $bank . '-R' . substr($tahun, -2) . substr($idBKM, -5);

                        // Prepare the response with the constructed @idBKM
                        $response['idBKM'] = $idBKM;
                    }
                }

                return response()->json($response);
            } else {
                return response()->json(['error' => 'Incomplete data!']);
            }
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
