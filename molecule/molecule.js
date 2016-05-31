window.onload = function(){

  var draw_nucleus = function(){

    var canvas = document.getElementById('molecule');
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;;
    
    for(i = 0; i < 100; i++){
      var x = 150;
      var y = 150;

      while( x*x + y*y > 150*150){
        y = Math.random() * 150 + 1;
        x = Math.random() * 150 + 1;
      }

      var chanceX = Math.random();
      var chanceY = Math.random();

      if(chanceX < 0.5){
        x = -x;
      }
      if(chanceY < 0.5){
        y = -y;
      }

      context.beginPath();
      context.fillStyle = "#40E0D0";
      context.arc(canvas.width/2 + x,canvas.height/2 + y,50,0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();

      var x = 150;
      var y = 150;

      while( x*x + y*y > 150*150){
        y = Math.random() * 150 + 1;
        x = Math.random() * 150 + 1;
      }

      var chanceX = Math.random();
      var chanceY = Math.random();

      if(chanceX < 0.5){
        x = -x;
      }
      if(chanceY < 0.5){
        y = -y;
      }

      context.beginPath();
      context.lineWidth = 5;
      context.fillStyle = "#F04923";
      context.arc(canvas.width/2 + x,canvas.height/2 + y,50,0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();

      var container = document.getElementById('molecule_container');
      container.setAttribute("width",window.innerWidth);
      container.setAttribute("height", window.innerHeight +"px;");

    }};

    var draw_orbit = function(){

      time = (new Date()).getTime() - startTime;
      angle = time * 2 * Math.PI / 3000;

      nextX = 300 * Math.sin(angle - 2*Math.PI/3) + centerX;

      nextX_2 = 300 * Math.cos(angle) + centerX;
      nextY_2 = 250 * Math.cos(angle) + centerY;

      nextX_3 = 300 * Math.sin(angle + Math.PI) + centerX;
      nextY_3 = 250 * Math.sin(angle) + centerY;

      context_o.clearRect(0, 0, canvas_o.width, 800);
      context_1.clearRect(0, 0, canvas_1.width, 800);
      context_2.clearRect(0, 0, canvas_2.width, 800);

      

      if(Math.sin(angle - 2*Math.PI/3) < -0.8){
        document.getElementById("orbits").style.zIndex = -1;
        document.getElementById("orbits_2").style.zIndex = 1;
        if(radius > 10 && radius_2 < 20){
          radius -= 0.75;
          radius_2 += 0.75;
        }
      }else if(Math.sin(angle - 2*Math.PI/3) > 0.8){
        document.getElementById("orbits").style.zIndex = 1;
        document.getElementById("orbits_2").style.zIndex = -1;
        if(radius < 20 && radius_2 > 10){
          radius += 0.75;
          radius_2 -= 0.75;
        }
      }

      if(Math.sin(angle + Math.PI) < -0.8){
        document.getElementById("orbits_3").style.zIndex = 1;
        if(radius_3 < 20){
          radius_3 += 0.75;
        }

      }else if(Math.sin(angle + Math.PI) > 0.8){
        document.getElementById("orbits_3").style.zIndex = -1;
        if(radius_3 > 10){
          radius_3 -= 0.75;
        }
      }

      context_o.beginPath();
      context_o.arc(nextX,centerY,radius,0, Math.PI * 2);
      context_o.closePath();
      context_o.fill();
      context_o.stroke();

      context_1.beginPath();
      context_1.arc(nextX_2,nextY_2,radius_2,0, Math.PI * 2);
      context_1.closePath();
      context_1.fill();
      context_1.stroke();
      
      context_2.beginPath();
      context_2.arc(nextX_3,nextY_3,radius_3,0, Math.PI * 2);
      context_2.closePath();
      context_2.fill();
      context_2.stroke();

    }
    
    var startTime = (new Date()).getTime();

    canvas_o = document.getElementById('orbits');
    canvas_1 = document.getElementById('orbits_2');
    canvas_2 = document.getElementById('orbits_3');

    canvas_o.width = window.innerWidth;
    canvas_o.height = window.innerHeight;
    canvas_1.width = window.innerWidth;
    canvas_1.height = window.innerHeight;;
    canvas_2.width = window.innerWidth;
    canvas_2.height = window.innerHeight;;

    var context_o = canvas_o.getContext("2d");
    var context_1 = canvas_1.getContext("2d");
    var context_2 = canvas_2.getContext("2d");

    var centerX = canvas_o.width / 2;
    var centerY = canvas_o.height / 2;

    context_o.lineWidth = 5;
    context_o.strokeStyle = '#003300';
    context_o.fillStyle = "#7CDE09";
    context_1.lineWidth = 5;
    context_1.strokeStyle = '#003300';
    context_1.fillStyle = "#7CDE09";
    context_2.lineWidth = 5;
    context_2.strokeStyle = '#003300';
    context_2.fillStyle = "#7CDE09";

    var nextX;
    var nextY_2;
    var nextX_2 ;
    var nextX_3;
    var nextY_3; 
    var time;
    var angle; 
    var radius = 15;
    var radius_2 = 15;
    var radius_3 = 15;


    function draw() {
      requestAnimationFrame(draw);
      draw_orbit();
    }

    draw_nucleus();
    draw();


  };