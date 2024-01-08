let PurchaseDate = document.getElementById("PurchaseDate");

PurchaseDate.valueAsDate = new Date();

function validateIpAddress() {
    var ipAddressInput = document.getElementById("ipAddress");
    var resultDiv = document.getElementById("result");
    var errorDiv = document.getElementById("error");

    if (ValidateIPaddress(ipAddressInput.value)) {
        resultDiv.innerHTML = "Valid Format IP Address ";
        errorDiv.innerHTML = "";
    } else {
        resultDiv.innerHTML = "";
        errorDiv.innerHTML = "Invalid Format IP Address ";
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
