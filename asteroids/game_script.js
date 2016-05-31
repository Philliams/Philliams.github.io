//Script for 3d Asteroid game -- built with THREE.js

document.addEventListener('keydown', function(event) {
  event.preventDefault();
}, true);

var renderer  = new THREE.WebGLRenderer(); //initialize render
renderer.setSize( window.innerWidth, window.innerHeight );//set size to witdh and height of browser window
document.body.appendChild( renderer.domElement );//append renderer to body of webpage

var score = 0;//score counter
var r = 500;//length of a side of bouding cube / size of game space
var fireRate = 750;//milliseconds between bullet creation
var renderQueue  = [];//array of functions to run during render frame
var bullets = [];//array to store bullet mesh objects
var asteroids = [];//array to store asteroid mesh objects
var scene = new THREE.Scene();// create scene ( world that contains geometries)
var camera  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000 );// create camera to view scene
camera.lookAt(new THREE.Vector3(r,r,r));//set camera to look at opposite corner of game world
camera.position.x = r/2;
camera.position.y = r/2;
camera.position.z = r/2;

//////////////////////////////////////////////////////////////////////////////////
//    add an object and make it move                                            //
//////////////////////////////////////////////////////////////////////////////////
var geometry  = new THREE.BoxGeometry( r, r, r,3,3,3 );//create graphics to view edge of map
geometry.applyMatrix( new THREE.Matrix4().makeTranslation(r/2, r/2, r/2) );//translate box to line up with reference system
var material  = new THREE.MeshBasicMaterial({wireframe:true});//create material for bounding box
var mesh  = new THREE.Mesh( geometry, material );//create mesh to render
scene.add( mesh );//add mesh to be rendered

var createBullet = function(sc,cam,ax,az){//creates spherical geometry of bullet at camera position
  var geometry  = new THREE.SphereGeometry( 1, 4, 4);//create geometry for bullet
  var material  = new THREE.MeshNormalMaterial();//create material for bullet
  var mesh  = new THREE.Mesh( geometry, material );//create mesh to render
  mesh.applyMatrix( new THREE.Matrix4().makeTranslation(cam.position.x, cam.position.y, cam.position.z));//translates bullet to origin(camera position when fired)
  scene.add( mesh );//add mesh to be rendered
  mesh.aX = ax;//set angle theta of mesh to calculate path
  mesh.aZ = az;//set angle phi of mesh to calculate path
  return mesh;//return mesh to populate bullet array
}

var createAsteroid = function(length,sc,rad){
    var geometry = new THREE.SphereGeometry( rad, 7, 7);//create geometry for asteroid
    var material  = new THREE.MeshBasicMaterial({wireframe:true});//create material for asteroid
    var mesh = new THREE.Mesh( geometry, material );//create mesh to render
    var speed = 1;
    var theta = Math.random()*2*Math.PI;
    var psi = Math.random()*2*Math.PI;
    mesh.applyMatrix( new THREE.Matrix4().makeTranslation(Math.random()*length, Math.random()*length, Math.random()*length));
    mesh.mX = speed * Math.sin(theta) * Math.cos(psi);
    mesh.mY = speed * Math.sin(psi);
    mesh.mZ = speed * Math.cos(theta) * Math.cos(psi);
    mesh.r = rad;
    sc.add( mesh );//add mesh to be rendered
    return mesh;
}

var animateBullet = function(m){
  var speed = 10;
  m.applyMatrix( new THREE.Matrix4().makeTranslation(speed * Math.sin(m.aX) * Math.cos(m.aZ), speed * Math.sin(m.aZ), speed * Math.cos(m.aX) * Math.cos(m.aZ)));
  if(m.position.x > r || m.position.x < 0 || m.position.y > r || m.position.y < 0 || m.position.z > r || m.position.z < 0){
    scene.remove( m );
    return true;
  }else{
    return false;
  }
}


var animateAsteroid = function(m,l){
  if(m.position.x >= l || m.position.x <=0){
    m.mX = -m.mX;
  }
  if(m.position.z >= l || m.position.z <=0){
    m.mZ = -m.mZ;
  }
  if(m.position.y >= l || m.position.y <=0){
    m.mY = -m.mY;
  }

  m.applyMatrix( new THREE.Matrix4().makeTranslation(m.mX, m.mY, m.mZ));
}

var splitAsteroid = function(a,sc){
    var geometry = new THREE.SphereGeometry( a.r/2, 7, 7);//create geometry for asteroid
    var material  = new THREE.MeshBasicMaterial({wireframe:true});//create material for asteroid
    var mesh = new THREE.Mesh( geometry, material );//create mesh to render
    var speed = 1;
    mesh.applyMatrix( new THREE.Matrix4().makeTranslation(a.position.x, a.position.y, a.position.z));
    mesh.mX = a.mX * Math.random() * speed;
    mesh.mY = a.mY * Math.random() * speed;
    mesh.mZ = a.mZ * Math.random() * speed;
    mesh.r = a.r/2;
    sc.add( mesh );//add mesh to be rendered
    return mesh;
}



//////////////////////////////////////////////////////////////////////////////////
//    button pressed logic                                                      //
//////////////////////////////////////////////////////////////////////////////////
var keyboard  = new THREEx.KeyboardState(renderer.domElement);
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();
var angle = Math.PI/4;
var angleZ = Math.PI/4;
var x = 0
var y = 0;
var z = 0;
var momentumX = 0;
var momentumY = 0;
var momentumZ = 0;
var startTime = new Date().getTime();
var endTime;
  
renderQueue.push(function(){
  if( keyboard.pressed('left') ){
    angle += 0.025;
    z = Math.cos(angle) * Math.cos(angleZ);
    x = Math.sin(angle) * Math.cos(angleZ);
    y = Math.sin(angleZ);
    camera.lookAt(new THREE.Vector3(camera.position.x + x,camera.position.y + y,camera.position.z + z));
  }else if( keyboard.pressed('right') ){
    angle -= 0.025;
    z = Math.cos(angle) * Math.cos(angleZ);
    x = Math.sin(angle) * Math.cos(angleZ);
    y = Math.sin(angleZ);
    camera.lookAt(new THREE.Vector3(camera.position.x + x,camera.position.y + y,camera.position.z + z));
  }
  if( keyboard.pressed('up') ){
    if(Math.sin(angleZ) < 1 - 0.025){
      angleZ += 0.025;
    }
    z = Math.cos(angle) * Math.cos(angleZ);
    x = Math.sin(angle) * Math.cos(angleZ);
    y = Math.sin(angleZ);
    camera.lookAt(new THREE.Vector3(camera.position.x + x,camera.position.y + y,camera.position.z + z));
  }else if( keyboard.pressed('down') ){
    if(Math.sin(angleZ) > - 1 + 0.025){
      angleZ -= 0.025;
    }
    z = Math.cos(angle) * Math.cos(angleZ);
    x = Math.sin(angle) * Math.cos(angleZ);
    y = Math.sin(angleZ);
    camera.lookAt(new THREE.Vector3(camera.position.x + x,camera.position.y + y,camera.position.z + z));
  }
  if(keyboard.pressed('w')){
    if((momentumX < 1 && Math.sin(angle) * Math.cos(angleZ) > 0) || (momentumX > -1 && Math.sin(angle) * Math.cos(angleZ) < 0)){
      momentumX += 0.1 * Math.sin(angle) * Math.cos(angleZ);
    }
    if((momentumY < 1 && Math.sin(angleZ) > 0) || (momentumY > -1 && Math.sin(angleZ) < 0)){
      momentumY += 0.1 * Math.sin(angleZ);
    }
    if((momentumZ < 1 && Math.cos(angle) * Math.cos(angleZ) > 0) || (momentumZ > -1 && Math.cos(angle) * Math.cos(angleZ) < 0)){
      momentumZ += 0.1 * Math.cos(angle) * Math.cos(angleZ);
    }
  }else if(keyboard.pressed('shift')){
      momentumX = 20*momentumX/21;
      momentumY = 20*momentumY/21;
      momentumZ = 20*momentumZ/21;
  }
  if(keyboard.pressed('space')){
    endTime = new Date().getTime();
    if( endTime - startTime > fireRate){
      bullets.push(createBullet(scene,camera,angle,angleZ));
      startTime = new Date().getTime();
    }
  }

  if(camera.position.x <= 15 || camera.position.x >= r - 15){
    momentumX = -momentumX;
  }
  if(camera.position.y <= 15 || camera.position.y >= r - 15){
    momentumY = -momentumY;
  }
  if(camera.position.z <= 15 || camera.position.z >= r - 15){
    momentumZ = -momentumZ;
  }

  camera.position.x = (camera.position.x + momentumX);
  camera.position.y = (camera.position.y + momentumY);
  camera.position.z = (camera.position.z + momentumZ);
    
});

//////////////////////////////////////////////////////////////////////////////////
//    render the scene                                                          //
//////////////////////////////////////////////////////////////////////////////////
renderQueue.push(function(){
  renderer.render( scene, camera );   
})

//////////////////////////////////////////////////////////////////////////////////
//    loop runner                                                               //
//////////////////////////////////////////////////////////////////////////////////

var start = new Date().getTime();
var end;

requestAnimationFrame(function animate(){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  // call each update function
  end = new Date().getTime();
  if(end - start > 5000){
    start = new Date().getTime();
    asteroids.push(createAsteroid(r,scene,15));
  }
  for( i = 0; i < bullets.length; i++){
    for( j = 0; j < asteroids.length; j++){
      if(bullets[i]){
        if(bullets[i].position.x >= asteroids[j].position.x - asteroids[j].r && bullets[i].position.x <= asteroids[j].position.x + asteroids[j].r){
          if(bullets[i].position.y >= asteroids[j].position.y - asteroids[j].r && bullets[i].position.y <= asteroids[j].position.y + asteroids[j].r){
            if(bullets[i].position.z >= asteroids[j].position.z - asteroids[j].r && bullets[i].position.z <= asteroids[j].position.z + asteroids[j].r){
              if(asteroids[j].r > 5){
                asteroids.push(splitAsteroid(asteroids[j],scene));
                asteroids.push(splitAsteroid(asteroids[j],scene));
                score -= 150;
              }
              scene.remove(asteroids[j]);
              scene.remove(bullets[i]);
              asteroids.splice(j,1);
              bullets.splice(i,1);
              score += 250;
            }
          }
        }
      }
    }
  }

  for(j = 0; j < asteroids.length; j++){
    if(camera.position.x >= asteroids[j].position.x - asteroids[j].r && camera.position.x <= asteroids[j].position.x + asteroids[j].r){
      if(camera.position.y >= asteroids[j].position.y - asteroids[j].r && camera.position.y <= asteroids[j].position.y + asteroids[j].r){
        if(camera.position.z >= asteroids[j].position.z - asteroids[j].r && camera.position.z <= asteroids[j].position.z + asteroids[j].r){
          alert("You got hit by an asteroid! your score was " + score + ". Restart?");
          for(i = 0; i< asteroids.length; i++){
            scene.remove(asteroids[i]);
          }
          for(i = 0; i< bullets.length; i++){
            scene.remove(bullets[i]);
          }
          bullets = [];
          asteroids = [];
          score = 0;
          camera.position.x = r/2;
          camera.position.y = r/2;
          camera.position.z = r/2;
          momentumX = 0;
          momentumY = 0;
          momentumZ = 0;
        }
      }
    }
  }

  asteroids.forEach(function(a){
    animateAsteroid(a,r);
  });
  for(i = 0; i < bullets.length; i++){
    if(animateBullet(bullets[i])){
      bullets.splice(i,1);
    }
  }
  renderQueue.forEach(function(functionRequest){
    functionRequest();
  });
  
});

