function searchFrom() {
  setButtonState("From", "LOADING")
  loadStops("From")
}

function searchTo() {
  setButtonState("To", "LOADING")
  loadStops("To")
}

function loadStops(field) {
  fetch(`https://www.delijn.be/rise-api-search/search/haltes/${document.getElementById(field).value}/1`)
  .then(res => res.json())
  .then((out) => callback(field, out))
  .catch(err => callback(field, err, true));
}

function callback(field, out, isError = false) {
  if(!isError) {
    setButtonState(field, "SEARCH")
    document.getElementById("StopsList"+field).innerHTML = ""
    for (var i = 0; i < Math.min(out.haltes.length,5); i++) {
      document.getElementById("StopsList"+field).innerHTML += `<li>${out.haltes[i].omschrijvingLang}</li>`
    }
  } else {
    setButtonState(field, "ERROR")
    document.getElementById("StopsList"+field).innerHTML = `<li class="Error">An error occured</li>`
  }
}

function setButtonState(field, state) {
  switch (state) {
    case "LOADING":
    document.getElementById("BtnValue"+field).innerHTML = "&#x21bb;"
    document.getElementById("BtnValue"+field).className += " Loading"
    document.getElementById("BtnValue"+field).disabled = true;
    break;
    case "SEARCH":
    document.getElementById("BtnValue"+field).innerHTML = "&#128269;"
    document.getElementById("BtnValue"+field).className = document.getElementById("BtnValue"+field).className.replace(" Loading", "")
    break;
    case "ERROR":
    document.getElementById("BtnValue"+field).innerHTML = "&#x2716;"
    document.getElementById("BtnValue"+field).className = document.getElementById("BtnValue"+field).className.replace(" Loading", "")
    break;
    default:

  }
}
