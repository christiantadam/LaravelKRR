let button_submitAll = document.getElementById("button_submitAll");
let form_submitAll = document.getElementById("form_submitAll");
let button_submitSelected = document.getElementById("button_submitSelected");
let form_submitSelected = document.getElementById("form_submitSelected");
let array_nomorSP = [];

button_submitAll.addEventListener("click", function (event) {
    event.preventDefault();
    let table = document.getElementById("table_SP"); // select the table element by its ID
    let rows = table.getElementsByTagName("tr"); // get all table rows

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].innerText; // get all table cells (columns) in each row
        let nomorSP = cells.split("\t")[0]; // get the value of the "Nomor SP" column
        // array_nomorSP.push(nomorSP);
        let input = document.createElement("input"); // create a new input element
        input.type = "hidden"; // set the input type to 'hidden'
        input.name = "nomorSPs[]"; // set the input name to 'nomorSPs[]'
        input.value = nomorSP; // set the input value to the current nomorSP value
        form_submitAll.appendChild(input); // append the input element to the form
    }
    // console.log(form_submitAll);
    form_submitAll.submit();
});

button_submitSelected.addEventListener("click", function (event) {
    event.preventDefault();

    // create a new form element to submit the selected surat pesanan
    // form_submitSelected.method = "POST";
    // form_submitSelected.action = "{{ url('/SuratPesananManager/upall') }}";
    // form_submitSelected.enctype = "multipart/form-data";
    // form_submitSelected.append("_token","{{ csrf_token() }}");
    // form_submitSelected.style.display = "none"; // hide the form from the user

    // loop through all the rows of the table
    let table = document.getElementById("table_SP");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].cells;
        let checkbox = cells[0].getElementsByTagName("input")[0]; // get the checkbox in the current row
        // console.log(checkbox);
        if (checkbox.checked) { // check if the checkbox is checked
            let nomorSP = cells[0].getElementsByClassName("DetailSP")[0].innerHTML; // get the value of the "Nomor SP" column
            // console.log(nomorSP);
            let input = document.createElement("input"); // create a new input element
            input.type = "hidden"; // set the input type to 'hidden'
            input.name = "nomorSPs[]"; // set the input name to 'nomorSPs[]'
            input.value = nomorSP; // set the input value to the current nomorSP value
            form_submitSelected.appendChild(input); // append the input element to the form
            // console.log(form_submitSelected);
        }
    }

    // append the form to the document and submit it
    // document.body.appendChild(form_submitSelected);
    form_submitSelected.submit();
});
