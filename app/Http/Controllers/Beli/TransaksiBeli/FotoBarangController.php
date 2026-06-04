<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FotoBarangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.FotoBarang', compact('access'));
    }

    public function show($id)
    {
        try {
            $result = DB::connection('ConnPurchase')
                ->select('EXEC spSelect_Foto_Barang_dotNet ?',[$id]);

            if (empty($result)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Barang tidak ditemukan'
                ]);
            }

            $barang = $result[0];

            return response()->json([
                'success' => true,
                'data' => [
                    'kd_brg' => $barang->KD_BRG ?? '',
                    'nama_brg' => $barang->NAMA_BRG ?? '',
                    'ket' => $barang->KET ?? '',
                    'foto' => !empty($barang->FOTO)
                        ? base64_encode($barang->FOTO)
                        : null
                ]
            ]);

        } catch (\Exception $e) {

            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data barang',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'Kd_Barang' => 'required|max:9',
            'Foto' => 'required|image|mimes:jpg,jpeg,png|max:1024'
        ]);

        $kdBarang = trim($request->Kd_Barang);

        $conn = DB::connection('ConnPurchase');
        $conn->beginTransaction();

        try {

            $existing = $conn->table('Y_FOTO')
                ->where('KD_BARANG', $kdBarang)
                ->lockForUpdate()
                ->first();

            $file = $request->file('Foto');

            $binary = $file->get();
            $hex = '0x' . bin2hex($binary);
            $base64 = base64_encode($binary);

            // jika sudah ada gambar (maka update dengan gambar baru)
           if ($existing) {
                $conn->rollBack();

                return response()->json([
                    'success' => false,
                    'message' => 'Kode Barang ini sudah memiliki gambar, hapus dahulu untuk memasukkan gambar baru!'
                ], 400);
            }

            // masukkan gambar baru
            else {
                $conn->statement("
                    INSERT INTO Y_FOTO(KD_BARANG, FOTO, URL)
                    VALUES(?, $hex, ?)",
                    [
                    $kdBarang,
                    $base64
                ]);
            }

            $conn->commit();

            return response()->json([
                'success' => true,
                'message' => 'Foto berhasil disimpan'
            ]);

        } catch (\Throwable $e) {

            $conn->rollBack();

            Log::error('Upload Foto Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan foto'
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {

            DB::connection('ConnPurchase')->statement(
                'EXEC spHapus_FotoBarang_dotNet ?',
                [$id]
            );

            return response()->json([
                'success' => true,
                'message' => 'Foto berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus foto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function create()
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }
}

