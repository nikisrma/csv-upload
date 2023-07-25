/** To add extra row when click on add */

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  var actions = $("table td:last-child").html();
  // Append table with add row form on add new button click
  $(".add-new").click(function () {
    $(this).attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
    var row =
      "<tr>" +
      '<td class="input-cell">' +
      '<form id="uploadForm" enctype="multipart/form-data">' +
      '<input type="file" class="form-control-file" id="fileInput" name="file">' +
      "</form>" +
      "</td>" +
      "<td>" +
      '<a class="add" title="Add" data-toggle="tooltip" onclick="uploadFile()"><i class="material-icons">&#xE03B;</i></a>' +
      '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
      "</td>" +
      "</tr>";

    $("table").append(row);
    $("table tbody tr")
      .eq(index + 1)
      .find(".add, .edit")
      .toggle();
    $('[data-toggle="tooltip"]').tooltip();
  });
  // Add row on add button click
  $(document).on("click", ".add", function () {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function () {
        $(this).parent("td").html($(this).val());
      });
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  });
  // Edit row on edit button click
  $(document).on("click", ".edit", function () {
    $(this)
      .parents("tr")
      .find("td:not(:last-child)")
      .each(function () {
        $(this).html(
          '<input type="text" class="form-control" value=" accept="text/csv" required' +
            $(this).text() +
            '">'
        );
      });
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });
  // Delete row on delete button click
  $(document).on("click", ".delete", function () {
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  });
});

/**Function to Upload file  */
function uploadFile() {
  var fileInput = document.getElementById("fileInput");
  var formData = new FormData();
  formData.append("file", fileInput.files[0]);
  if (fileInput.files[0].type == "text/csv") {
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(data)
        if(data.status==1){
          window.location.reload()
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
/** To navigate to the detail page of the file */
function seeDetail(id){
  window.location.href = `detail?id=${id}`
}

