let filter_radioButton1 = document.getElementById("filter_radioButton1");
let divisi_select = document.getElementById("divisi_select");
let filter_divisiRadioButton1 = document.getElementById("filter_divisiRadioButton1");
let filter_divisiRadioButton2 = document.getElementById("filter_divisiRadioButton2");
let filter_radioButton2 = document.getElementById("filter_radioButton2");
let filter_radioButtonUserInput = document.getElementById("filter_radioButtonUserInput");
let filter_radioButton3 = document.getElementById("filter_radioButton3");
let filter_radioButtonOrderInput = document.getElementById("filter_radioButtonOrderInput");
let redisplay = document.getElementById("redisplay");
let div_tablePO = document.getElementById("div_tablePO");
let table_PurchaseOrder = document.getElementById("table_PurchaseOrder");
let checkbox_centangSemuaBaris = document.getElementById("checkbox_centangSemuaBaris");
let create_po = document.getElementById("create_po");
let proses = 0;
let jnsBeli = 0;

redisplay.addEventListener("click",function(event){
    event.preventDefault();

    if (filter_radioButton1.checked == true) {
        proses = 1;
        if (filter_divisiRadioButton1.checked == true) {
            jnsBeli = 1;
        } else if(filter_divisiRadioButton2.checked == true) {
            jnsBeli = 0;
        }
        LoadPermohonan(proses,jnsBeli);
    }
    else if(filter_radioButton2.checked == true){
        proses = 2;
        LoadPermohonan(proses,2);
    }
    else if(filter_radioButton3.checked == true){
        proses = 3
        LoadPermohonan(proses,3);
    }
});

create_po.addEventListener("click",function(event){
    event.preventDefault();

})

function LoadPermohonan(proses,stbeli){
    if (proses == 1) {
        fetch("/get/dataPermohonanDivisi/" + stbeli + "/"+ divisi_select.options[divisi_select.selectedIndex].value)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }
    else if(proses == 2){
        fetch("/get/dataPermohonanUser/" + filter_radioButtonUserInput.value)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }
    else if(proses == 3){
        fetch("/get/dataPermohonanOrder/" + filter_radioButtonOrderInput.value)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }

}
