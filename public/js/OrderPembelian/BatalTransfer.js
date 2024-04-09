let no_terima = document.getElementById("no_terima");
let btn_proses = document.getElementById("btn_proses");

let csrfToken = $('meta[name="csrf-token"]').attr("content");

btn_proses.addEventListener("click", function (event) {
    $.ajax({
        url: "/BatalTransfer/Proses",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            No_Terima: no_terima.value,
        },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error("Error Send Data:", error);
        },
    });
});
