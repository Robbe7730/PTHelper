lines = []
stops = []
selectedStops = []

function loadLines()
{
  lines = document.getElementById('lines')

  if (!lines.files[0]) {
    alert("Please select a line file before submitting")
    return
  } else {
    fr = new FileReader()
    fr.onload = parseLines
    fr.readAsText(lines.files[0])
  }

  document.getElementById("linesP").style = "display:none"
}

function loadStops()
{
  stops = document.getElementById('stops')

  if (!stops.files[0]) {
    alert("Please select a stop file before submitting")
    return
  } else {
    fr = new FileReader()
    fr.onload = parseStops
    fr.readAsText(stops.files[0])
  }

    document.getElementById("stopsP").style = "display:none"
}

function parseLines(e)
{
  lines = JSON.parse(e.target.result)
  // console.log(lines)
  for (var i in lines)
  {
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
}

function displayStops()
{
  document.getElementById("stopsText").innerHTML = ""
  lineStops = lines[document.getElementById("linesList").value].stops
  for (stopID in lineStops)
  {
    stop = stops[lineStops[stopID]]
    selectedStops.push(stop)
    document.getElementById("stopsText").innerHTML += stop.name + "(" + stop.lat + "," + stop.long + ")->"
  }
  document.getElementById("nearestStop").style=""
}

function findNearestStop()
{
  currLat = document.getElementById("searchX").value
  currLong = document.getElementById("searchY").value
  minStop = {}
  minDistance = 99999
  console.log(selectedStops)
  for (stopID in selectedStops)
  {
    stop = selectedStops[stopID]
    distance = dist(currLat, currLong, stop.lat, stop.long)
    console.log(stop, stop.name, distance)
    if (distance < minDistance)
    {
      console.log("Setting " + stop.name)
      minStop = stop
      minDistance = distance
    }
  }
  document.getElementById("nearestStopName").innerHTML = minStop.name
}

function dist(x1, y1, x2, y2)
{
  return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}
