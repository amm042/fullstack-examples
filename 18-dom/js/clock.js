(function(g){

  var clock = {}

  clock.startClock = function(event){
    console.log("starting clock")

    g.setInterval(clock.showTime, 1000)

    //clock.showTime
    var elements = document.querySelectorAll(".add_time")
    for (var i in elements){
      elements[i].onclick = clock.add_time
    }

    var elements = document.querySelectorAll(".modal_time")
    for (var i in elements){
      elements[i].onclick = clock.modalClock
    }

  }
  clock.add_time = function(element){
    //console.log('add time to', this)

    document.getElementById('time_container')
      .innerHTML += '<p class="col-2 current_time"></p>'

  }
  clock.modalClock = function(event){
    console.log("POPUP")

    $("#exampleModal").modal()
  }

  clock.showTime = function(){
    var now = new Date()

    var elements = document.querySelectorAll(".current_time")
    var count = 0
    for (var i = 0; i < elements.length; i++){
      //console.log(i,'==', elements[i])
      elements[i].innerHTML = now.toLocaleTimeString()
      count += 1
    }
    console.log("Update time to", now.toLocaleTimeString(),"on", elements.length, 'clocks')
  }

  g.addEventListener("DOMContentLoaded", clock.startClock)

})(window)
