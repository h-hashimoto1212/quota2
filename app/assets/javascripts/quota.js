let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

let app = new PIXI.Application({
  width: 600, 
  height: 600,
  transparent: true,
  antialias: true,
});
document.querySelector("#canvas").appendChild(app.view);

let floor = app.screen.height/2;
let vertBlur = new PIXI.filters.BlurFilter();
  vertBlur.blurX = 0;
  vertBlur.blurY = 0;
  vertBlur.resolution = 2;

let quota = new PIXI.Container();
  quota.x = app.screen.width/2;
  quota.y = floor;
  quota.fall = 0;
  quota.jump = 0;
  quota.snap = false;
  quota.wobble = 0;
  quota.filters = [vertBlur];

function talk(){
  let hopTime = 0;
  let talkTime = 0;
  let g = 0;
  app.ticker.add(function(){
    hopTime += 0.3;
    g += hopTime;
    if(hopTime <= 2){
      quota.y -= 3 - g;
    }else{
      quota.y = floor;
      talkTime += 1;
      if(talkTime > 5 && talkTime < 25){
        quota.scale.x = 1 + Math.sin((talkTime-5)/2)/20;
        quota.scale.y = 1 + Math.sin((talkTime-5)/2)/20;
      }
      if(talkTime == 1){
        blink(2);
      }
      if(talkTime == 25){

      }
    }
  });
}


app.stage.addChild(quota);

let face = new PIXI.Graphics();
  face.rad = 30;
  face.lineStyle(1,0x6bc3d3);
  face.beginFill(0x6bc3d3, 1);
  face.drawEllipse(0,0,face.rad,face.rad)

let eyes = new PIXI.Container();
  eyes.vy = 0;
  eyes.pivot.x = 0;
  eyes.pivot.y = 0;
  eyes.y = -12;
let eye = new PIXI.Graphics();
  eye.lineStyle(0);
  eye.beginFill(0x111111);
  eye.drawEllipse(-15,0,5,5);
  eye.drawEllipse(15,0,5,5);
  eye.beginFill(0xeeeeee);
  eye.drawEllipse(-13,-2,1.9,1.9);
  eye.drawEllipse(17,-2,1.9,1.9);

eyes.addChild(eye);


function blink(speed){
  let blinkTime = 0;
  app.ticker.add(function (){
    blinkTime += (1 * speed/1.5);
    if(blinkTime <= 5){
      eyes.scale.y = blinkTime % 1;
    }else if(blinkTime > 5){
      eyes.scale.y = 1
      app.ticker.remove()
    }
  })

}


quota.addChild(face);
quota.addChild(eyes);


let count = 0;
let squish = 0;
let hitFloor = 0;
let wait = 0;

app.ticker.add(intro);
  
function intro(){
  count += 0.5;
  quota.scale.y = 1/quota.scale.x;
  if(count < 70){
    quota.y = 0;
    eyes.y = 12;
  }else if(count < 120){
    if(quota.y - 10 < floor && squish < 1){
      quota.fall += 1;
      quota.y += quota.fall;
      eyes.vy += 1.5;
      eyes.y = 12 - eyes.vy;
      vertBlur.blurY = quota.fall/5;
      if(eyes.y < -12 || eyes.y > 12){
        eyes.vy -= 1.5;
      }
    }else if(quota.fall > 0){
      squish += 1;
      quota.fall -= 2;
      quota.scale.x += quota.fall/100;
      vertBlur.blurY = 0;
    }else if(quota.scale.x > 0.9){
      quota.fall -= 4;
      quota.scale.x += quota.fall/100;
      quota.y += quota.scale.y;

    }else if(quota.y > 270){
      quota.fall *= 1.3;
      quota.y += quota.fall/10;
      vertBlur.blurY = quota.fall/5;
    }else if(count < 150){
      quota.fall *=0.8;
      quota.y += quota.fall/5;
      vertBlur.blurY = quota.fall/5;
    }
  }else if(count < 100){
    quota.fall = 0;
  }else if(quota.y < floor){
    quota.fall += 4.5;
    quota.y += quota.fall;
    vertBlur.blurY = quota.fall/5;
  }else if(count < 130 || quota.scale.x >= 1){
    quota.fall -= 2;
    quota.scale.x += quota.fall/100;
    quota.y += quota.scale.y*0.5;
    vertBlur.blurY = 0;
  }else{
    quota.fall = 0;
    quota.scale.x = 1;
    quota.y = floor;
  }

  if(count == 160){
    app.ticker.add(talk());
  }
  if(count >= 170){
    app.ticker.add(habit);
    quota.buttonMode = true;
    quota.interactive = true;
    app.ticker.remove(intro);
  }

};
function resetWobble(){
  quota.wobble = 0;
  app.ticker.add(function wobble(){
    quota.wobble += 1;
    if(quota.wobble < 50){
      quota.scale.y = 1 - Math.sin(quota.wobble/2)/(quota.wobble*4);
      quota.scale.x = 1/quota.scale.y;
    }else{
      app.ticker.remove(wobble);
    }
  })
}

let habitTime = 0;

function habit(){
  habitTime += 0.5;
  if (habitTime % 100 == 50){
    blink(1);
  }
  if (habitTime % 150 == 0 || habitTime % 150 == 7.5){
    blink(2);
  }
  if (habitTime % 300 == 250){
    resetRoll(7);
  }
}



function resetRoll(force){
  let rollTime = 0;
  let rollv = 0;
  app.ticker.add(function roll(){
    rollTime +=1;
    quota.rotation += rollv/100;
    quota.x = app.screen.width/2 + face.rad * quota.rotation;
    if(rollTime < force){
      rollv -= 2;
    }
    if(rollTime > force*6 && Math.abs(quota.rotation) <= 0.1){
        quota.rotation *= 0;
        quota.x = app.screen.width/2
        app.ticker.remove(roll);
    }else{
      if(quota.rotation <= 0.2){
        rollv += 1;
      }else if(quota.rotation >= -0.2){
        rollv -= 1;
      }
    }
  })
}


quota.on('click', talk);
quota.on('mouseover', function(){
  quota.scale.y = 1;
  quota.scale.x = 1;
  resetWobble();
})
quota.on('mousedown', function(){
  quota.scale.y = 0.9;
  quota.scale.x = 0.9;
});
quota.on('mouseup', function(){
  quota.scale.y = 1;
  quota.scale.x = 1;
});
