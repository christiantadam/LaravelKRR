//#region Variables
const spnLoading = document.getElementById("loading_lbl");
const spnTitle = document.getElementById("ld_title");
const divTable = document.getElementById("tempat_tabel");
const TD_btnConfirm = document.getElementById("ld_confirm");
const TD_btnCancel = document.getElementById("ld_cancel");

var [TD_tableId, TD_tableName, TD_formTitle] = [
    "default_table",
    "Tabel default...",
    "Lihat Default",
];

var TD_strTable = `
    <table id="${TD_tableId}" class="hover cell-border">
        <thead>
            <tr>
                <th>Tes123</th>
                <th>Tes123</th>
                <th>Tes123</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`;

const TD_listTable = [];
var [TD_colTable, TD_pilTable] = [-1, -1];
var TD_keyStr = "";
var [selectedData, confirmedData] = [null, null];
//#endregion

//#region Events
TD_btnConfirm.addEventListener("click", function () {
    if (selectedData != null) {
        confirmedData = selectedData;
        selectedData = null;
        fetchModalResult(confirmedData);
    } else {
        alert("Belum ada data yang dipilih!");
        divTable.focus();
    }
});

TD_btnCancel.addEventListener("click", function () {
    selectedData = null;
});
//#endregion

//#region Functions
function TD_rowClicked(row, data, _) {
    if (
        TD_pilTable ==
        findClickedRowInList(TD_listTable, TD_keyStr, data[TD_keyStr])
    ) {
        row.style.background = "white";
        TD_pilTable = -1;
    } else {
        clearSelection_DataTable(TD_tableId);
        row.style.background = "aliceblue";
        TD_pilTable = findClickedRowInList(
            TD_listTable,
            TD_keyStr,
            data[TD_keyStr]
        );

        selectedData = data;
        console.log(selectedData);
    }
}
//#endregion

function init_dt() {
    spnLoading.classList.add("hidden");
    divTable.classList.remove("hidden");
    spnTitle.textContent = TD_formTitle;

    divTable.innerHTML = TD_strTable;
    if (!$.fn.DataTable.isDataTable("#" + TD_tableId)) {
        $("#" + TD_tableId).DataTable({
            responsive: true,
            paging: true,
            scrollY: "250px",
            scrollX: "",
            dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
            language: {
                searchPlaceholder: " " + TD_tableName,
                search: "",
            },

            initComplete: () => {
                var searchInput = $('input[type="search"]:last').addClass(
                    "form-control"
                );

                searchInput.wrap('<div class="input-group"></div>');
                searchInput.before(
                    '<span class="input-group-text">Cari:</span>'
                );
            },
        });

        if (TD_listTable.length > 0) {
            addTable_DataTable(TD_tableId, TD_listTable, null, TD_rowClicked);
        } else
            clearTable_DataTable(
                TD_tableId,
                TD_colTable,
                "Data tidak ditemukan."
            );
    }
}

$("#form_lihat_data").on("shown.bs.modal", function () {
    init_dt();
});

$("#form_lihat_data").on("hidden.bs.modal", function () {
    clearTable_DataTable(TD_tableId, TD_colTable);
    [TD_tableId, TD_tableName, TD_formTitle] = ["", "", ""];
    TD_listTable.length = 0;
    [TD_strTable, TD_colTable] = [``, -1];
    divTable.innerHTML = TD_strTable;
    divTable.classList.add("hidden");
    spnLoading.classList.remove("hidden");
});

$(document).keypress(function (e) {
    if ($("#form_lihat_data").is(":visible")) {
        if (e.which === 13) {
            if (selectedData != null) {
                confirmedData = selectedData;
                selectedData = null;
                fetchModalResult(confirmedData);
            } else {
                alert("Belum ada data yang dipilih!");
                divTable.focus();
            }
        } else if (e.which === 27) {
            selectedData = null;
        }
    }
});
