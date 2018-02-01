var selectedStops = {
  "From": undefined,
  "To": undefined
}

function loadStops(field) {
  setButtonState(field, "LOADING")
  searchValue = document.getElementById(field).value
  if(searchValue != "") {
    try {
      fetch(`https://www.delijn.be/rise-api-search/search/haltes/${searchValue}/1`)
        .then(res => res.json())
        .then((out) => callbackSearch(field, out))
        .catch(err => { callbackSearch(field, err, true); })
    } catch(err) {
      callbackSearch(field, err, true);
    }
  } else {
    callbackSearch(field, undefined)
  }
}

function callbackSearch(field, out, isError = false) {
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
      document.getElementById("StopsList"+field).innerHTML += "<li><a onClick=\"setStop('" + field + "','" + out.haltes[i].halteNummer + "','" + out.haltes[i].omschrijvingLang + "')\">" + out.haltes[i].omschrijvingLang + "</a></li>"
    }
  } else {
    document.getElementById("StopsList"+field).innerHTML = `<div class="Error">An error occured</div>`
  }
}

function setStop(field, stopUrl, stopName) {
  document.getElementById(field).placeholder = stopName
  document.getElementById(field).value = ""
  document.getElementById("StopsList"+field).innerHTML = ""
  selectedStops[field] = stopUrl
  updatePlanFields()
}

function updatePlanFields() {
  console.log(selectedStops)
  document.getElementById("Plan").className = document.getElementById("Plan").className.replace(" Hidden", "")
  if(!(selectedStops["From"] != undefined && selectedStops["To"] != undefined)) {
    document.getElementById("Plan").className += " Hidden"
  }
}

function planRoute() {
  timeValue = document.getElementById("DepartTime").value
  if(timeValue == "") {
    document.getElementById("TxtPlan").innerHTML = "Please fill in a valid time/date."
    return
  } else {
    console.log(getStop(selectedStops["From"]), getStop(selectedStops["To"]))
    // TODO: routeplanner (X,Y ophalen via halteId (waarde in selectedStops), route plannen, all is well)
  }
}

function getStop(stopNr) {
  if(searchValue != "") {
    try {
      fetch(`https://www.delijn.be/rise-api-search/search/haltes/${searchValue}/1`)
        .then(res => res.json())
        .then((out) => callbackSearch(field, out))
        .catch(err => { callbackSearch(field, err, true); })
    } catch(err) {
      callbackSearch(field, err, true);
    }
  } else {
    callbackSearch(field, undefined)
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
