function cmpLastName(a,b){
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
    //TODO: get names and put in "name_container"
}


document
  .addEventListener("DOMContentLoaded", loadAjax)
