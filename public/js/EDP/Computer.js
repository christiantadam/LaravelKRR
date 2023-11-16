function validateIpAddress() {
    var ipAddressInput = document.getElementById("ipAddress");
    var resultDiv = document.getElementById("result");
    var errorDiv = document.getElementById("error");

    if (ValidateIPaddress(ipAddressInput.value)) {
        resultDiv.innerHTML = "Format IP Address Valid";
        errorDiv.innerHTML = "";
    } else {
        resultDiv.innerHTML = "";
        errorDiv.innerHTML = "Format IP Address Invalid";
    }
}
function ValidateIPaddress(ipaddress) {
    if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        )
    ) {
        return true;
    } else {
        return false;
    }
}
