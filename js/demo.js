$(document).ready(function(){

  $('#userInput').focus();

  $('#goBtn').click(function() {
      const val = $('#userInput').val();
      let html;
      if (isValid(val)) {
        html = '<h3><font color="green"><b>This IBAN is VALID!</b></font></h3>';
      } else {
        html = '<h3><font color="red"><b>This IBAN is INVALID!</b></font></h3>';
      }
      $('#results').html(html);
      $('#results').show();
  });
});
