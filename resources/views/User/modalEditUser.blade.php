<div class="modal" id="EditUser">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="judul"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="panel-body">
                <form class="formEditUser" method="POST" enctype="multipart/form-data" action="">
                    {{ csrf_field() }}
                    <div class="modal-body">
                        <div class="input-group">
                            <div class="input-group-addon RDZtextICON">
                                <a><span class="material-icons form-control RDZICON">key</span></a>
                            </div>
                            <input id="editPassword" type="password"
                                class="form-control @error('password') is-invalid @enderror" name="editPassword"
                                autocomplete="current-password" placeholder="Password">

                            <div class="input-group-addon">
                                <a><span class="material-icons form-control RDZIconPassword"
                                        onclick="ShowPassword('editPassword','showpassword')"
                                        id="showpassword">visibility_off</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-sm btn-primary" name="submit">Edit</button>
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Tutup</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
