'use strict';
const myCanvas = document.getElementById("canvas");
const ctxt = myCanvas.getContext("2d");

function showChoice() {
    const newpage = document.querySelector("#second");
    const oldpage = document.querySelector("#first");
    const endbox = document.querySelector("#endbox");
    const welcomebox = document.querySelector("#welcomebox");
    const stButton = document.querySelector("#start");
    const obj = document.querySelector("#obj");
    endbox.style.display = "none";
    stButton.style.display = "none";
    welcomebox.style.display = "grid";
    newpage.style.display = "grid";
    oldpage.style.display = "none";
    obj.style.display = "none";
};

function setLevel(level) {
    const minute = document.querySelector("#minute");
    const seconds = document.querySelector("#seconds");
    const dvd = document.querySelector("#d");
    dvd.style.display = "inline";
    minute.style.color = "white";
    seconds.style.color = "white";
   if (level === 'easy') {
     minute.innerHTML = "08";
     seconds.innerHTML = "00";
   } else if (level === 'medium') {
    minute.innerHTML = "05";
    seconds.innerHTML = "00";
   } else if (level === 'hard') {
    minute.innerHTML = "02";
    seconds.innerHTML = "00";
   };
   const newpage = document.querySelector("#start");
   const obj = document.querySelector("#obj");
   const oldpage = document.querySelector("#second");
   newpage.style.display = "block";
   oldpage.style.display = "none";
   obj.style.display = "block";
};

function startGame() {
    ball.x = myCanvas.width/2;
    ball.y=375;
    ball.speedX=1;
    ball.speedY=2.5;
    pad.x=(myCanvas.width/2)-29;
    pad.y=385;
    displayAllBlocks();
    update();
    const oldpage = document.querySelector("#welcomebox");
    oldpage.style.display = "none";
    const timer = setInterval(function() {
        if (Number(seconds.innerText) === 0) {
           let  sdecrease = 60; 
           let mdecrease = Number(minute.innerText)-1;
           minute.innerHTML = String(mdecrease);
           seconds.innerHTML = String(sdecrease);
        }
        if (seconds.innerText === ' out' || seconds.innerText === ' win') {
            clearInterval(timer);
        } else {
            let sdecrease = Number(seconds.innerText) - 1;
            seconds.innerHTML = String(sdecrease);
        }
    }, 1000);
};



const ball = {
    x:myCanvas.width/2,
    y:375,
    r:10,
    speedX:1,
    speedY:1.5,
};

const pad = {
    x:(myCanvas.width/2)-29,
    y:385,
    speed:23,
    height:394,
    width:58,
};
const block = {
    b1:[4,51, 'on', 9, 30],
    b2:[54.5, 96, 'on', 9, 30],
    b3:[99.5,141, 'on', 9, 30],
    b4:[144.5,186, 'on', 9, 30],
    b5:[189.5,231, 'on', 9, 30],
    b6:[234.5, 276, 'on', 9, 30],
    b7:[279.5,321, 'on', 9, 30],
    b8:[324.5,364, 'on', 9, 30],
    b11:[4,51, 'on', 35, 60],
    b22:[54.5, 96, 'on', 35, 60],
    b33:[99.5,141, 'on', 35, 60],
    b44:[144.5,186, 'on', 35, 60],
    b55:[189.5,231, 'on', 35, 60],
    b66:[234.5, 276, 'on', 35, 60],
    b77:[279.5,321, 'on', 35, 60],
    b88:[324.5,364, 'on', 35, 60],
    b111:[4,51, 'on', 65,90],
    b222:[54.5, 96, 'on', 65,90],
    b333:[99.5,141, 'on', 65,90],
    b444:[144.5,186, 'on', 65,90],
    b555:[189.5,231, 'on', 65,90],
    b666:[234.5, 276, 'on', 65,90],
    b777:[279.5,321, 'on', 65,90],
    b888:[324.5,364, 'on', 65,90],
    b110:[4,51, 'on',95,120],
    b220:[54.5, 96, 'on',95,120],
    b330:[99.5,141, 'on',95,120],
    b440:[144.5,186, 'on',95,120],
    b550:[189.5,231, 'on',95,120],
    b660:[234.5, 276, 'on',95,120],
    b770:[279.5,321, 'on',95,120],
    b880:[324.5,364, 'on',95,120],
};
function displayBlocks([sx, x, cd, sy, y]) {
    if (cd === 'on') {
        ctxt.beginPath();
        ctxt.moveTo(sx, sy);
        ctxt.lineTo(x, sy);
        ctxt.lineTo(x, y);
        ctxt.lineTo(sx, y);
        ctxt.closePath();
        ctxt.fillStyle = 'orange';
        ctxt.fill();
        // ctxt.stroke();
    } else if (cd ==='off') {
        ctxt.clearRect(sx, sy, x, 30)
    };
        
};

function checkScore() {
    const endbox = document.querySelector("#endbox");
    const loseS = document.querySelector("#lose");
    const winS = document.querySelector("#win");
    let win = 0;
    let lose = 0;
    for (let [,,cd] of Object.values(block)) {
        if (cd === 'off') {
            win = win+1;
        } else if (cd === 'on') {
            lose = lose+1;
        };
    };
    if (win!==32) {

        endbox.style.display = 'grid';
        loseS.style.display = 'block';
        winS.style.display = 'none';
    } else if (win===32) {
        endbox.style.display = 'grid';
        loseS.style.display = 'none';
        winS.style.display = 'block';
    };
};

//the ball
function displayBall() {
    ctxt.beginPath();
    ctxt.arc(ball.x, ball.y, ball.r, 0, 360);
    ctxt.fillStyle = 'orange';
    ctxt.fill();
    // ctxt.stroke();
};
function displayPad() {
    ctxt.beginPath();
    ctxt.moveTo(pad.x, pad.y);
    ctxt.lineTo(pad.x+pad.width, pad.y);
    ctxt.lineTo(pad.x+pad.width, pad.height);
    ctxt.lineTo(pad.x, pad.height);
    ctxt.closePath();
    ctxt.fillStyle = 'orange';
    ctxt.fill();
    // ctxt.stroke();
}
 
function moveRight() {
    console.log(pad.x+pad.width);
    if (pad.x+pad.width < myCanvas.width) {
        pad.x = pad.x + pad.speed;
    }
};
function moveLeft() {
    console.log(pad.x);
    if (pad.x > 0) {
        pad.x = pad.x - pad.speed;
    }
};
function hitBlocks(val) {
    if (ball.y-ball.r === val) {
        
        for (let [key,  [sx, bw, cd]]  of Object.entries(block)) {
            if (bw-ball.x <=54 && bw-ball.x >=0) {
                hideBlock(bw, val);

            };
            
        };
    };
}
function update() {
    ctxt.clearRect(0, 0, myCanvas.width, myCanvas.height);    const endbox = document.querySelector("#endbox");
    const loseS = document.querySelector("#lose");
    const winS = document.querySelector("#win");
    const minute = document.querySelector("#minute");
    const seconds = document.querySelector("#seconds");
    const dvd = document.querySelector("#d");
    displayBlocks(block.b1);
    displayBlocks(block.b2);
    displayBlocks(block.b3);
    displayBlocks(block.b4);
    displayBlocks(block.b5);
    displayBlocks(block.b6);
    displayBlocks(block.b7);
    displayBlocks(block.b8);
    displayBlocks(block.b11);
    displayBlocks(block.b22);
    displayBlocks(block.b33);
    displayBlocks(block.b44);
    displayBlocks(block.b55);
    displayBlocks(block.b66);
    displayBlocks(block.b77);
    displayBlocks(block.b88);
    displayBlocks(block.b111);
    displayBlocks(block.b222);
    displayBlocks(block.b333);
    displayBlocks(block.b444);
    displayBlocks(block.b555);
    displayBlocks(block.b666);
    displayBlocks(block.b777);
    displayBlocks(block.b888);
    displayBlocks(block.b110);
    displayBlocks(block.b220);
    displayBlocks(block.b330);
    displayBlocks(block.b440);
    displayBlocks(block.b550);
    displayBlocks(block.b660);
    displayBlocks(block.b770);
    displayBlocks(block.b880);
    displayBall();
    displayPad();
    ball.y = ball.y-ball.speedY;
    ball.x = ball.x+ball.speedX;
    if (ball.x+ball.r === myCanvas.width) {
        ball.speedX = ball.speedX *(-1);
    };
    if (ball.y === 0) {
        ball.speedY = ball.speedY *(-1);
    };
    if (ball.x === ball.r) {
        ball.speedX = ball.speedX *(-1);
    };
    if (ball.y+ball.r === pad.y) {
      bouncePad();
    } else if (ball.y+ball.r === myCanvas.height) {
        ball.speedY = ball.speedY *(-1); 
        displayAllBlocks();
    };
    hitBlocks(120);
    hitBlocks(90);
    hitBlocks(60);
    hitBlocks(30);
    let win = 0;
    let lose = 0;
    for (let [,,cd] of Object.values(block)) {
        if (cd === 'off') {
            win = win+1;
        } else if (cd === 'on') {
            lose = lose+1;
        };
    }; 
    if (win===32) {
        endbox.style.display = 'grid';
        loseS.style.display = 'none';
        winS.style.display = 'block';
        minute.innerHTML = "Time";
        seconds.innerHTML = " win";
        dvd.style.display = "none";
        cancelAnimationFrame(update);
    } ;

    if (Number(seconds.innerText)===0 && Number(minute.innerText)===0) {
        minute.innerHTML = "Time";
        seconds.innerHTML = " out";
        minute.style.color = "red";
        seconds.style.color = "red";
        dvd.style.display = "none";
        checkScore();
        cancelAnimationFrame(update);
    } else {
    requestAnimationFrame(update)};
};
function displayAllBlocks() {
    block.b1[2] = 'on'; 
    block.b2[2] = 'on'; 
    block.b3[2] = 'on'; 
    block.b4[2] = 'on'; 
    block.b5[2] = 'on'; 
    block.b6[2] = 'on'; 
    block.b7[2] = 'on'; 
    block.b8[2] = 'on'; 
    block.b11[2] = 'on'; 
    block.b22[2] = 'on'; 
    block.b33[2] = 'on'; 
    block.b44[2] = 'on'; 
    block.b55[2] = 'on'; 
    block.b66[2] = 'on'; 
    block.b77[2] = 'on'; 
    block.b88[2] = 'on'; 
    block.b111[2] = 'on'; 
    block.b222[2] = 'on'; 
    block.b333[2] = 'on'; 
    block.b444[2] = 'on'; 
    block.b555[2] = 'on'; 
    block.b666[2] = 'on'; 
    block.b777[2] = 'on'; 
    block.b888[2] = 'on'; 
    block.b110[2] = 'on'; 
    block.b220[2] = 'on'; 
    block.b330[2] = 'on'; 
    block.b440[2] = 'on'; 
    block.b550[2] = 'on'; 
    block.b660[2] = 'on'; 
    block.b770[2] = 'on'; 
    block.b880[2] = 'on';
};

function bouncePad() {
    for (let i=0;i<=pad.width + 1;i++) {
        if (ball.x === pad.x +i) {
            ball.speedY = ball.speedY *(-1);
        } else if (ball.x === pad.x ){
            ball.speedY = ball.speedY *(-1);
        } else if (ball.x === (pad.x+pad.width+1) ){
            ball.speedY = ball.speedY *(-1);
        } else if (ball.x === (pad.x+pad.width+2) ){
            ball.speedY = ball.speedY *(-1);
        } else if (ball.x === (pad.x+pad.width+3) ){
            ball.speedY = ball.speedY *(-1);
        }  else if (ball.x === (pad.x+pad.width+4) ){
            ball.speedY = ball.speedY *(-1);
        }  else if (ball.x === (pad.x+pad.width+5) ){
            ball.speedY = ball.speedY *(-1);
        }  else if (ball.x === pad.x-1 ){
            ball.speedY = ball.speedY *(-1);
        } else if (ball.x === pad.x-2 ){
            ball.speedY = ball.speedY *(-1);
        }else if (ball.x === pad.x-3 ){
            ball.speedY = ball.speedY *(-1);
        } else if (ball.x === pad.x-4 ){
            ball.speedY = ball.speedY *(-1);
        }else if (ball.x === pad.x-5){
            ball.speedY = ball.speedY *(-1);
        }

}
}

document.addEventListener('keydown', function(k) {
    if (k.key == "ArrowRight") {
        moveRight();
    } else if (k.key == "ArrowLeft") {
        moveLeft();
    };
    console.log(k.key);
})
function hideBlock(val, chk) {
    if (chk === 30) {
        if  (val === block.b1[1]) {
            if (block.b1[2] === 'on') {
                block.b1[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
            
        }
        if  (val === block.b2[1]) {
            if (block.b2[2] === 'on') {
                block.b2[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b3[1]) {
            if (block.b3[2] === 'on') {
                block.b3[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b4[1]) {
            if (block.b4[2] === 'on') {
                block.b4[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b5[1]) {
            if (block.b5[2] === 'on') {
                block.b5[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b6[1]) {
            if (block.b6[2] === 'on') {
                block.b6[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b7[1]) {
            if (block.b7[2] === 'on') {
                block.b7[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b8[1]) {
            if (block.b8[2] === 'on') {
                block.b8[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        };
    } else if (chk===60) {
            if  (val === block.b11[1]) {
        if (block.b11[2] === 'on') {
            block.b11[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
        
    }
    if  (val === block.b22[1]) {
        if (block.b22[2] === 'on') {
            block.b22[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b33[1]) {
        if (block.b33[2] === 'on') {
            block.b33[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b44[1]) {
        if (block.b44[2] === 'on') {
            block.b44[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b55[1]) {
        if (block.b55[2] === 'on') {
            block.b55[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b66[1]) {
        if (block.b66[2] === 'on') {
            block.b66[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b77[1]) {
        if (block.b77[2] === 'on') {
            block.b77[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b88[1]) {
        if (block.b88[2] === 'on') {
            block.b88[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    };
    } else if (chk === 90) {
        if  (val === block.b111[1]) {
            if (block.b111[2] === 'on') {
                block.b111[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
            
        }
        if  (val === block.b222[1]) {
            if (block.b222[2] === 'on') {
                block.b222[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b333[1]) {
            if (block.b333[2] === 'on') {
                block.b333[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b444[1]) {
            if (block.b444[2] === 'on') {
                block.b444[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b555[1]) {
            if (block.b555[2] === 'on') {
                block.b555[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b666[1]) {
            if (block.b666[2] === 'on') {
                block.b666[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b777[1]) {
            if (block.b777[2] === 'on') {
                block.b777[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        }
        if  (val === block.b888[1]) {
            if (block.b888[2] === 'on') {
                block.b888[2] = 'off';
                ball.speedY = ball.speedY *(-1);           
            } else {
    
            };
        };
    } else if (chk===120) {
    if  (val === block.b110[1]) {
        if (block.b110[2] === 'on') {
            block.b110[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
        
    }
    if  (val === block.b220[1]) {
        if (block.b220[2] === 'on') {
            block.b220[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b330[1]) {
        if (block.b330[2] === 'on') {
            block.b330[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b440[1]) {
        if (block.b440[2] === 'on') {
            block.b440[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b550[1]) {
        if (block.b550[2] === 'on') {
            block.b550[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b660[1]) {
        if (block.b660[2] === 'on') {
            block.b660[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b770[1]) {
        if (block.b770[2] === 'on') {
            block.b770[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    }
    if  (val === block.b880[1]) {
        if (block.b880[2] === 'on') {
            block.b880[2] = 'off';
            ball.speedY = ball.speedY *(-1);           
        } else {

        };
    };
    }
};