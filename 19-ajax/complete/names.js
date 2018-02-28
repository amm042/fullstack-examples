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
    .then(resp => {
      console.log("got response")
      console.log(resp)
      return resp.json()
    })
    .then( json => {
      console.log("got json")
      console.log(json)
      if (json.success){
        document.getElementById("name_container")
          .innerHTML = "<ol>" +
            json.names.sort(lastNameCmp)
              .map(name => "<li>"+name+"</li>")
              .reduce((accum,current) => accum + current) + "</ol>"
      }else{
        document.getElementById("name_container")
          .textContent = "Error loading names, try again later."
      }
    })
    .catch(err => {
      console.log("failed to get "+url)
      console.log(err)
    })

}


document
  .addEventListener("DOMContentLoaded", loadAjax)
