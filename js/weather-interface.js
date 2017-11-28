var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});

//using curl and promises .then .fail
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//     $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }).fail(function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
//     });
//   });
// });

// Javascript Method
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//
//     let request = new XMLHttpRequest();
//     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//
//     request.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         let response = JSON.parse(this.responseText);
//         getElements(response);
//       }
//     }
//
//     request.open("GET", url, true);
//     request.send();
//
//     const getElements = function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }
//   });
// });

//jQuery option

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//     $.ajax({
//       url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
//       type: 'GET',
//       data: {
//         format: 'json'
//       },
//       success: function(response) {
//         $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//         $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp}.`);
//       },
//       error: function() {
//         $('#errors').text("There was an error processing your request. Please try again.")
//       }
//     });
//   });
// });
