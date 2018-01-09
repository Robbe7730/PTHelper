function loadStops(field) {
  setButtonState(field, "LOADING")
  searchValue = document.getElementById(field).value
  if(searchValue != "") {
    try {
      fetch(`https://www.delijn.be/rise-api-search/search/haltes/${searchValue}/1`)
        .then(res => res.json())
        .then((out) => callback(field, out))
        .catch(err => { callback(field, err, true); })
    } catch(err) {
      callback(field, err, true);
    }
  } else {
    callback(field, undefined)
  }
}

function callback(field, out, isError = false) {
  setButtonState(field, "SEARCH")
  if(!isError) {
    document.getElementById("StopsList"+field).innerHTML = ""

    if(out == undefined) {
      document.getElementById("StopsList"+field).innerHTML = ""
      return
    }

    if(out.haltes.length == 0) {
      document.getElementById("StopsList"+field).innerHTML = "No stops found"
      return
    }

    for (var i = 0; i < Math.min(out.haltes.length,5); i++) {
      document.getElementById("StopsList"+field).innerHTML += `<li>${out.haltes[i].omschrijvingLang}</li>`
    }
  } else {
    document.getElementById("StopsList"+field).innerHTML = `<div class="Error">An error occured</div>`
  }
}

function setButtonState(field, state) {
  switch (state) {
    case "LOADING":
      document.getElementById("BtnValue"+field).innerHTML = "&#x21bb;"
      document.getElementById("BtnValue"+field).className += " Loading"
      document.getElementById("Btn"+field).disabled = true;
    break;
    case "SEARCH":
      document.getElementById("BtnValue"+field).innerHTML = "&#128269;"
      document.getElementById("BtnValue"+field).className = document.getElementById("BtnValue"+field).className.replace(" Loading", "")
      document.getElementById("Btn"+field).disabled = false;
    break;
    case "ERROR":
      document.getElementById("BtnValue"+field).innerHTML = "&#x2716;"
      document.getElementById("BtnValue"+field).className = document.getElementById("BtnValue"+field).className.replace(" Loading", "")
      document.getElementById("Btn"+field).disabled = false;
    break;
    default:

  }
}
