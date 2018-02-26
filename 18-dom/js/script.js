console.log(document.getElementById("title"));
// console.log(document instanceof HTMLDocument);


/*

document
  .getElementById("content")
  .textContent = "Click the button!"
*/


/*
document
  .addEventListener("DOMContentLoaded",
    function(event){
      console.log("DOM loaded!")
      document
        .querySelector("button")
        .onclick = handleButtonClick

      document
        .querySelector("body")
        .onmousemove = function(evt){
          if (evt.shiftKey){
            console.log("("+evt.clientX+ ", " + evt.clientY+") " +
              evt.buttons)
          }
        }
    })
*/

/*
function handleButtonClick () {

  console.log(event)
  // get the value of the input box
  var name =
   document.getElementById("name").value;

  if (name === ""){
    document.getElementById("content")
      .textContent = "Click the button!"
  }else{
    var message = "<h2>Hello " + name + "!</h2>";

    // document
    //   .getElementById("content")
    //   .textContent = message;

    document
      .getElementById("content")
      .innerHTML = message;
  }


*/
/*
  if (name === "student") {

    // querySelector uses a CSS selector!
    // returns the first matching element
    var title =
      document
        .querySelector("#title")
        .textContent;
    title += " & query selector";
    document
        .querySelector("h1")
        .textContent = title;
  }
  */
}
