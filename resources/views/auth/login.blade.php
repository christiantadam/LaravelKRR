@extends('layouts.app')

@section('content')
<script type="text/javascript">
    setInterval(function() {
        window.location.reload();
    }, 300000);
</script>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">

                    @if(session()->has('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                    @endif
                    @error('error')
                    <div class="alert alert-danger">
                        {{ $message }}
                    </div>
                    @enderror

                    <form method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group">
                            <!-- <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label> -->

                            <div >
                                <div class="input-group">
                                    <div class="input-group-addon RDZtextICON">
                                        <a><span class="material-icons form-control RDZICON">person</span></a>
                                    </div>
                                    <input id="username" type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" autocomplete="username" autofocus placeholder="Username">

                                    @error('username')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- <label for="password" class="col-md-4 col-form-label text-md-right RDZTextToICON">{{ __('Password') }}</label> -->

                            <div>
                                <div class="input-group">
                                    <div class="input-group-addon RDZtextICON">
                                        <a><span class="material-icons form-control RDZICON">key</span></a>
                                    </div>
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" autocomplete="current-password" placeholder="Password">
                                    
                                    <div class="input-group-addon">
                                        <a><span class="material-icons form-control RDZIconPassword" onclick="ShowPassword('password','showpassword')" id="showpassword">visibility_off</span></a>
                                    </div>
                                    <br>
                                    
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <p id="text" style="display:none;color:red">WARNING! Caps lock is ON.</p>

                            </div>
                        </div>
                        <br>
                        <div class="mb-0">
                            <!-- <div style="width:50%;text-align: center;"> -->
                                <button type="submit" class="btn btn-primary" style="width: 100%;text-align: center;">
                                    {{ __('Login') }}
                                </button>
                            <!-- </div> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var input = document.getElementById("password");
    var text = document.getElementById("text");
    input.addEventListener("keyup", function(event) {

    if (event.getModifierState("CapsLock")) {
        text.style.display = "block";
      } else {
        text.style.display = "none"
      }
    });
</script>
@endsection
