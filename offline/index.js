function loadLines()
{
  lines = document.getElementById('lines')

  if (!lines.files[0]) {
    alert("Please select a line file before submitting")
  } else {
    fr = new FileReader()
    fr.onload = parseLines
    fr.readAsText(lines.files[0])
  }
}

function loadStops()
{
  stops = document.getElementById('stops')

  if (!stops.files[0]) {
    alert("Please select a stop file before submitting")
  } else {
    fr = new FileReader()
    fr.onload = parseStops
    fr.readAsText(stops.files[0])
  }
}

function parseLines(e)
{
  lines = JSON.parse(e.target.result)
  // console.log(lines)
  for (var i in lines) {
    line = lines[i]
    // console.log(line)
    var option = document.createElement("option")
    option.text = line.name
    option.value = line.number
    if(i == 0)
    {
      option.selected = "selected"
    }
    var linesList = document.getElementById("linesList")
    linesList.appendChild(option)
  }

  document.getElementById("loadStops").disabled = false
}

function parseStops(e)
{
  stops = JSON.parse(e.target.result)
  // console.log(stops)
  for (var i in stops) {
    stop = stops[i]
    // console.log(stop)
    if(i != 0)
    {
      document.getElementById("stopsText").innerHTML += "&rarr;"
    }
    document.getElementById("stopsText").innerHTML += stop.name + "(" + stop.lat + "," + stop.long + ")"
  }
}
