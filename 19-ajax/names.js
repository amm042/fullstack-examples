function lastNameCmp(a,b){
  var lastA = a.split(" ").pop().toUpperCase()
  var lastB = b.split(" ").pop().toUpperCase()
  if (lastA > lastB)
    return 1
  if (lastA < lastB)
    return -1
  return 0
}
function loadAjax(){
  //var url = "http://localhost:8888/names_err"
  //var url = "http://localhost:8888/names_slow"
  var url = "http://localhost:8888/names"

  console.log("making fetch to", url)

  fetch(url)
    .then(resp=>{
      return resp.json()
    })
    .then(json=>{
      console.log(json.names)

      document.getElementById("name_container")
        .innerHTML = "<ol>" +
          json.names.sort(lastNameCmp)
            .map( item => "<li>" + item + "</li>")
            .reduce( (accum, value) => accum + value)+
          "</ol>"
    })
}


document
  .addEventListener("DOMContentLoaded", loadAjax)
