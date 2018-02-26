
// 1 GET ELEMENTs
//console.log(document.getElementById("title"));

//console.log(document.querySelector(".clickable"))

//console.log(document.querySelectorAll(".clickable"))

//
// document
//   .getElementById("content")
//   .textContent = "Click the button!"



// 2 EVENTS
// function handleButtonClick (event) {
//
//   console.log(event)
//
//   // get the value of the input box
//   var name =
//    document.getElementById("name").value;
//
//   if (name === ""){
//     document.getElementById("content")
//       .textContent = "Click the button!"
//   }else{
//     var message = "<h2>Hello " + name + "!</h2>";
//
//     // document
//     //   .getElementById("content")
//     //   .textContent = message;
//     //
//     document
//       .getElementById("content")
//       .innerHTML = message;
//   }
// }


// 3 Unobtrusive JS
//
// function loaded(){
//   console.log("DOM loaded, adding event listeners")
//   document.getElementById("sayItButton")
//      .addEventListener('click', handleButtonClick)
// }
// document.getElementById("name")
//   .onkeyup = handleButtonClick



// 4 watch my mouse
// document.querySelector("body")
//   .addEventListener('mousemove', function(e){
//     console.log(e.clientX,e.clientY)
//   })


// 5 DOMContentLoaded
//
// document.addEventListener("DOMContentLoaded", loaded)

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

//}



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
