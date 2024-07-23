<div class="modal fade" id="modalMataUang" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelMataUang">Tambah Mata Uang</h5>
            </div>
            <div class="modal-body">
                <div class="form-container col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="idMataUang">Id Mata Uang </label>
                        </div>
                        <div class="col-md-7">
                            <select name="nama_select" id="idMataUang" name="idMataUang" class="form-control">
                                <option disabled selected>-- Pilih Id. Mata Uang --</option>
                                {{-- @foreach ($maintenanceMataUang as $mmu)
                                <option value="{{ $mmu->Id_MataUang }}">{{ $mmu->Id_MataUang }} | {{ $mmu->Nama_MataUang
                                    }}</option>
                                @endforeach --}}
                            </select>
                        </div>
                    </div>
                    <p>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="namaMataUang">Nama Mata Uang </label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" id="namaMataUang" name="namaMataUang" class="form-control">
                        </div>
                    </div>
                    <p>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="symbol">Symbol </label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" id="symbol" name="symbol" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
