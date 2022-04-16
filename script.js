var debrief_block = {
  type: "html-keyboard-response",
  stimulus: function() {

    var trials = jsPsych.data.get().filter({task: 'response'});
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());

    var data = {
      "trails": trials,
      "correct_trials":correct_trials,
      "accuracy":accuracy,
      "rt":rt
      }

    return ` <p>Press any key to complete the experiment. Thank you!</p>`;

  }
};


// variable data, defined above which is a homogenous collection of objects

// get keys
//var keys = _.keys(data[0]);

// convert to csv string
//var csv = keys.join(",");
//_(data).each(function(row) {
 // csv += "\n";
 // csv += _(keys).map(function(k) {
 //   return row[k];
 // }).join(",");
//});

// trick browser into downloading file
//var uriContent = "data:application/octet-stream," + encodeURIComponent(csv);
//var myWindow = window.open(uriContent, "Nutrient CSV");
//myWindow.focus();

//postFile('http://example.com/api/v1/users', uriContent)
  //.then(data => console.log(data))
  //.catch(error => console.error(error))
//<script src="https://gist.github.com/justsml/529d0b1ddc5249095ff4b890aad5e801.js"></script>



function postFile(url, fileSelector) {
  const formData = new FormData()
  const fileField = document.querySelector(fileSelector)
  
  formData.append('username', 'abc123')
  formData.append('avatar', fileField.files[0])

  return fetch(url, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: formData  // Coordinate the body type with 'Content-Type'
  })
  .then(response => response.json())
}