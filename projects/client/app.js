function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return i + 1;
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return i + 1;
    }
  }
  return -1;
}

async function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
      })
    });

    let data = await response.json();
    console.log(data.estimated_price);
    estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names";

  try {
    let response = await fetch(url);
    let data = await response.json();

    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      uiLocations.innerHTML = "";
      locations.forEach(function(loc) {
        var opt = new Option(loc);
        uiLocations.appendChild(opt);
      });
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
}

window.onload = onPageLoad;
