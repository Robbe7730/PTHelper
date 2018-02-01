var selectedStop

function searchLocation() {
  searchValue = document.getElementById("LocationSearch").value
  if(searchValue != "") {
    try {
      fetch(`https://www.delijn.be/rise-api-search/search/haltes/${searchValue}/1`)
        .then(res => res.json())
        .then((out) => callbackSearch(out))
        .catch(err => { callbackSearch(err, true) })
    } catch(err) {
      callbackSearch(err, true)
    }
  } else {
    callbackSearch(undefined)
  }
}

function callbackSearch(out, isError = false) {
  if((!isError) && (out != undefined)) {
    document.getElementById("StopsList").innerHTML = ""

    if(out.haltes.length == 0) {
      document.getElementById("StopsList").innerHTML = "No stops found"
      return
    }

    for (var i = 0; i < Math.min(out.haltes.length,5); i++) {
      document.getElementById("StopsList").innerHTML += "<li><a onClick=\"setStop('" + out.haltes[i].halteNummer + "')\">" + out.haltes[i].omschrijvingLang +  " (" + out.haltes[i].bestemmingen + ")</a></li>"
    }
  } else {
    document.getElementById("StopsList").innerHTML = `<div class="Error">An error occured</div>`
  }
}

function setStop(stopUrl) {
  document.getElementById("LocationSearch").placeholder = stopName
  document.getElementById("LocationSearch").value = ""
  document.getElementById("StopsList").innerHTML = ""
  selectedStop = stopUrl
}
