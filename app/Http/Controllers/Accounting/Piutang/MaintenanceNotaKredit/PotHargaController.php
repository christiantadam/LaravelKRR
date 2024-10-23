<?php

namespace App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PotHargaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.MaintenanceNotaKredit.PotHarga', compact('access'));
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
        if ($id == 'getCustomer') {
            $kode = $request->input('proses') == 1 ? 2 : 3;
            // dd($kode);
            // Panggil stored procedure sesuai parameter kode
            $results = DB::connection('ConnAccounting')
                ->select('exec sp_list_customer ?', [$kode]);
            // dd($results);
            // Simpan hasil lookup
            $response = [];
            foreach ($results as $row) {
                $idCust = trim($row->IdCust);
                $TIdCustomer = substr($idCust, -5); // Last 5 characters
                $TIdJnsCust = substr($idCust, 0, 3); // First 3 characters

                $response[] = [
                    'NamaCust' => trim($row->NamaCust),
                    'idCust' => $idCust,
                    'TIdCustomer' => $TIdCustomer,
                    'TIdJnsCust' => $TIdJnsCust,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getPenagihan') {
            $kode = 5;
            $idCustomer = $request->input('idCustomer');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_LIST_PENAGIHAN_SJ @Kode = ?, @IdCustomer = ?', [$kode, $idCustomer]);
            // dd($results);
            // Hasil lookup untuk Id_Penagihan dan Tgl_Penagihan
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);

            // Jika Addmode aktif, jalankan logika penambahan
            // if ($request->input('addmode') === 'true') {
            //     $this->displayPenagihan($response[0]['Id_Penagihan']);
            // }

        } else if ($id == 'getBarang') {
            // dd($request->all());
            $results = DB::connection('ConnSales')
                ->select('exec SP_LIST_NOTA_KREDIT @Kode = ?, @IdPenagihan = ?', [1, $request->no_penagihan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NamaBarang' => $row->NamaBarang,
                    'KdBrg' => $row->KdBrg,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBarangDetails') {
            // Logika untuk migrasi kode VB yang diberikan
            $results = DB::connection('ConnSales')
                ->select(
                    'exec SP_LIST_NOTA_KREDIT @Kode = ?, @IdPenagihan = ?, @KodeBarang = ?',
                    [2, trim($request->no_penagihan), trim($request->kodeBarang)]
                );
            // dd($results);
            // Menginisialisasi response
            $response = [];
            $TotKirim = 0;

            // Loop melalui hasil query
            foreach ($results as $row) {
                $response[] = [
                    'IDPengiriman' => $row->IDPengiriman,
                    'JmlTerimaUmum' => $row->JmlTerimaUmum,
                    'HargaSatuan' => $row->HargaSatuan,
                ];

                // Menghitung total pengiriman
                $TotKirim += floatval($row->JmlTerimaUmum);
            }

            // Mengembalikan data dalam format JSON
            return response()->json([
                'data' => $response,
                'total_kirim' => $TotKirim
            ]);
        } else if ($id == 'getPenagihanDetails') {
            // Memanggil prosedur tersimpan untuk mendapatkan data penagihan
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_LIST_POT_HARGA @Id_Penagihan = ?', [$request->no_penagihan]);
            // dd($results);
            // Menginisialisasi variabel untuk response
            $response = [];
            if (!empty($results)) {
                $penagihan = $results[0];  // Asumsikan hanya satu hasil yang diambil

                // Menyiapkan data yang akan dikirim ke response
                $response = [
                    'Id_MataUang' => $penagihan->Id_MataUang,
                    'Nama_MataUang' => $penagihan->Nama_MataUang,
                    'Status_PPN' => $penagihan->Status_PPN,
                    'Jns_PPN' => $penagihan->Jns_PPN ?? '',
                    'Lunas' => $penagihan->Lunas == 'Y' ? 'Lunas' : 'Belum',
                    'Message' => $penagihan->Lunas == 'Y' ? 'Harap Dibuatkan BKK' : '',
                ];
            }

            // Mengembalikan response dalam format JSON
            return response()->json($response);
        } else if ($id == 'getNotaKredit') {
            $kode = 7;
            $idCust = $request->input('idCustomer');
            $jnsNotaKredit = "2";

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_LIST_NOTA_KREDIT @Kode = ?, @IdCust = ?, @JnsNotaKredit = ?', [$kode, $idCust, $jnsNotaKredit]);
            // dd($results);
            $response = [];

            foreach ($results as $row) {
                $response[] = [
                    'Id_NotaKRedit' => $row->Id_NotaKRedit,
                    'Tanggal' => \Carbon\Carbon::parse($row->Tanggal)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getNotaKreditDetails') {
            // Memanggil prosedur tersimpan untuk mendapatkan data Nota Kredit
            $results = DB::connection('ConnSales')
                ->select('exec SP_LIST_POT_HARGA1 @id_NotaKredit = ?', [$request->no_nota_kredit]);

            // Menginisialisasi variabel untuk response
            $response = [];
            if (!empty($results)) {
                $nota = $results[0];  // Asumsikan ada satu hasil yang diambil

                // Menyiapkan data yang akan dikirim ke response
                $response = [
                    'IDPenagihan' => $nota->Id_Penagihan,
                    'Terbilang' => $nota->Terbilang,
                    'IdMataUang' => $nota->Id_MataUang,
                    'Nama_MataUang' => $nota->Nama_MataUang,
                    'Status_PPN' => $nota->Status_PPN,
                    'Jns_PPN' => $nota->Jns_PPN ?? '',
                    'Lunas' => $nota->Lunas == 'Y' ? 'Lunas' : 'Belum',
                    'Message' => $nota->Lunas == 'Y' ? 'Harap Dibuatkan BKK' : '',
                ];
            }

            // Mengembalikan response dalam format JSON
            return response()->json($response);
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
