// Stage 1
var inputFile
var lineObj

function onLoad()
{
  inputFile = document.getElementById("lineFile")
  inputFile.addEventListener('change', updateLineFile);
}

function updateLineFile()
{
  currFile = inputFile.files[0]
  if (currFile)
  {
    var reader = new FileReader()
    reader.onload = function(evt)
    {
      contents = evt.target.result
      lineObj = JSON.parse(contents)
      if(checkLineFile(lineObj))
      {
        startStage2()
      } else {
        alert("Invalid line file")
      }
    }
    reader.readAsText(currFile)
  }
}

function checkLineFile(obj)
{
  if(obj.name && obj.number >= 0 && obj.stops)
  {
    for(stopID in obj.stops)
    {
      stop = obj.stops[stopID]
      if(!(typeof(stop.name) == "string" && typeof(stop.id) == "number" && typeof(stop.lat) == "number" && typeof(stop.long) == "number"))
      {
        console.log("Invalid stop")
        console.log(stop)
        return false
      }
    }
    return true
  }
  console.log("Invalid object")
  console.log(obj)
  return false
}

// Stage 2
currentStop = undefined
targetStop = undefined

function startStage2()
{
  document.getElementById("stage1").style = "display:none"
  fromStop = document.getElementById("fromStop")
  toStop = document.getElementById("toStop")
  fromStop.innerHTML = ""
  toStop.innerHTML = ""
  for(stop in lineObj.stops)
  {
    fromStop.innerHTML += '<option value="' + stop + '">' + lineObj.stops[stop].name + '</option>'
    toStop.innerHTML += '<option value="' + stop + '">' + lineObj.stops[stop].name + '</option>'
  }
  toStop.lastChild.selected = "selected"
  document.getElementById("stage2").style = ""
}

function startRoute()
{
  fromStop = document.getElementById("fromStop").value
  toStop = document.getElementById("toStop").value
  if(fromStop >= toStop)
  {
    alert("Please select a valid stop order")
    return
  }
  currentStop = lineObj.stops[fromStop]
  targetStop = lineObj.stops[toStop]
  console.log(currentStop, targetStop)
}
