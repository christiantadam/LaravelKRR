$(function () {
    $('.DetailCustomer').on('click', function (e) {
        e.preventDefault();
        $('#modalCustomer').modal({ backdrop: 'static', keyboard: false })
        document.getElementById("HeadDetailCustomer").innerHTML = "Detail Customer.  " + $(this).data('id');
        $.ajax({
            url: window.location.origin + "/Customer/" + $(this).data('id') + "/show",
            type: 'get',
            data: '_token = <?php echo csrf_token() ?>', // Remember that you need to have your csrf token included
            success: function (data) {
                document.getElementById("DetailCustomer").innerHTML = "ID Customer: " + data.data.IDCust
                + "</br>Jenis Customer: " + data.data.JnsCust + " - " + data.data.NamaJnsCust + "</br>Nama Customer: "
                + data.data.NamaCust + "</br>Initial Customer: " + data.data.KodeCust  + "</br>Contact Person: "
                + data.data.ContactPerson  + "</br>Limit Pembelian: " + data.data.LimitPembelian + "</br>Alamat: "
                + data.data.Alamat + "</br>Kode Pos: " + data.data.KodePos + "</br>Kota: " + data.data.Kota
                + "</br>Provinsi: " + data.data.Propinsi + "</br>Negara: " + data.data.Negara + "</br>No. Telpon 1: "
                + data.data.NoTelp1 + "</br>No. Telpon 2: " + data.data.NoTelp2 + "</br>No Telex: " + data.data.NoTelex
                + "</br>No. Fax 1: " + data.data.NoFax1 + "</br>No. Fax 2: " + data.data.NoFax2 + "</br>Email: "
                + data.data.Email + "</br>Alamat Kirim: " + data.data.AlamatKirim + "</br>Kota Kirim: "
                + data.data.KotaKirim + "</br><hr></br>No.NPWP: " + data.data.NPWP + "</br>Nama di NPWP: "
                + data.data.NamaNPWP + "</br>Alamat di NPWP: " + data.data.AlamatNPWP
                + "</br><hr></br>Tanggal data diinputkan: " + data.data.TimeInput;
                // console.log('yay');
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    });
});

function OpenWindows(url) {
    window.open(url, 'window name', "width=800, height=600");
}

// $(function () {
//   $('.Detail').on('click', function (e) {
//     e.preventDefault();
//     $('#modalDetail').modal({ backdrop: 'static', keyboard: false })
//   });
// });

// $('.DetailCustomer').on('click', function(e){
//     e.preventDefault();
//     var idcust = $(this).data('id');
//     $.ajax({
//         url: "{{ url('Sales/Master/Customer/getDetail') }}/" + idcust,
//         method: "GET",
//         dataType: "json",
//         success: function(data){
//             $('#NamaCustomer').text(data.NamaCust);
//         }
//     });
//     $('#modalCustomer').modal('show');
// });


// $('#modal-customer').on('show.bs.modal', function (e) {
//     var idcust = $(e.relatedTarget).data('id');
//     // fetch data based on idcust
// });

//#region get element

let JnsCust = document.getElementById("JnsCust");
let NamaCust = document.getElementById("NamaCust");
let KodeCust = document.getElementById("KodeCust");
let ContactPerson = document.getElementById("ContactPerson");
let LimitBeli = document.getElementById("LimitBeli");
let Alamat = document.getElementById("Alamat");
let Kota = document.getElementById("Kota");
let Propinsi = document.getElementById("Propinsi");
let Negara = document.getElementById("Negara");
let KodePos = document.getElementById("KodePos");
let NoTelp1 = document.getElementById("NoTelp1");
let NoTelp2 = document.getElementById("NoTelp2");
let NoTelex = document.getElementById("NoTelex");
let NoFax1 = document.getElementById("NoFax1");
let NoFax2 = document.getElementById("NoFax2");
let NoHp1 = document.getElementById("NoHp1");
let NoHp2 = document.getElementById("NoHp2");
let Email = document.getElementById("Email");
let AlamatKirim = document.getElementById("AlamatKirim");
let KotaKirim = document.getElementById("KotaKirim");
let NPWP = document.getElementById("NPWP");
let NamaNPWP = document.getElementById("NamaNPWP");
let AlamatNPWP = document.getElementById("AlamatNPWP");
let FormCustomer = document.getElementById("FormCustomer");

//#endregion

//#region enter-enter

JnsCust.focus();

JnsCust.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NamaCust.focus();
    }
});
NamaCust.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        KodeCust.focus();
    }
});
KodeCust.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        ContactPerson.focus();
    }
});
ContactPerson.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        LimitBeli.focus();
    }
});
LimitBeli.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Alamat.focus();
    }
});
Alamat.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Kota.focus();
    }
});
Kota.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Propinsi.focus();
    }
});
Propinsi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Negara.focus();
    }
});
Negara.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        KodePos.focus();
    }
});
KodePos.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoTelp1.focus();
    }
});
NoTelp1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoTelp2.focus();
    }
});
NoTelp2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoTelex.focus();
    }
});
NoTelex.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoFax1.focus();
    }
});
NoFax1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoFax2.focus();
    }
});
NoFax2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoHp1.focus();
    }
});
NoHp1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoHp2.focus();
    }
});
NoHp2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Email.focus();
    }
});
Email.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        AlamatKirim.focus();
    }
});
AlamatKirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        KotaKirim.focus();
    }
});
KotaKirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NPWP.focus();
    }
});
NPWP.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NamaNPWP.focus();
    }
});
NamaNPWP.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        AlamatNPWP.focus();
    }
});
//#endregion

//#region input filter
//Penjelasan setinputfilter function: https://jsfiddle.net/KarmaProd/tgn9d1uL/4/
function setInputFilter(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(
                    this.oldSelectionStart,
                    this.oldSelectionEnd
                );
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

setInputFilter(
    document.getElementById("LimitBeli"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("KodePos"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoTelp1"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoTelp2"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoTelex"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoFax1"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoFax2"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoHp1"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoHp2"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NPWP"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion
