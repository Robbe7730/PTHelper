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
  return true
}

// Stage 2
function startStage2()
{
  document.getElementById("stage1").style = "display:none"
  fromStop = document.getElementById("fromStop")
  toStop = document.getElementById("toStop")
  fromStop.innerHTML = ""
  toStop.innerHTML = ""
  for(stop in lineObj.stops)
  {
    console.log(stop)
    fromStop.innerHTML += '<option value="' + stop + '">' + lineObj.stops[stop].name + '</option>'
    toStop.innerHTML += '<option value="' + stop + '">' + lineObj.stops[stop].name + '</option>'
  }
  document.getElementById("stage2").style = ""
}
