function init(){
    paddleStyles = window.getComputedStyle(document.querySelector("#pad1"));
    paddle2Styles = window.getComputedStyle(document.querySelector("#pad2"));
    containerStyles = window.getComputedStyle(document.querySelector("#containter"));
    ballStyles = window.getComputedStyle(document.querySelector("#ball"));

    paddleHeight = parseInt(paddleStyles.getPropertyValue('height'));
    paddleWidth = parseInt(paddleStyles.getPropertyValue('width'));
    paddleMargin = parseInt(paddleStyles.getPropertyValue('margin-left'));
    paddle2MarginTop = parseInt(paddle2Styles.getPropertyValue('margin-top'));

    halfContHeigth = parseInt(containerStyles.getPropertyValue('height')) / 2;
    contWidth = parseInt(containerStyles.getPropertyValue('width'));

    topBallPos = parseInt(ballStyles.getPropertyValue('margin-top'));
    leftBallPos = parseInt(ballStyles.getPropertyValue('margin-left'));
    ballHeight = parseInt(ballStyles.getPropertyValue('height'));

    p1score = 0;
    p2score = 0;
    playersMovement();
    ballMovement();
    computersMovement();
}

function playersMovement(){
    let pad1Margin = 0;
    document.addEventListener('keydown', function (e) {
        //W key pressed
        if (e.keyCode == 87 || e.which == 87) { 
            if(pad1Margin >= -halfContHeigth){
                pad1Margin -= 10;
                document.getElementById("pad1").style.marginTop = (pad1Margin) + "px" 
            }
        }
        //S key pressed
        if (e.keyCode == 83 || e.which == 83) {
            if(pad1Margin <= halfContHeigth){
                pad1Margin += 10;
                document.getElementById("pad1").style.marginTop = (pad1Margin) + "px";
            }
        }
    }, false);
}
function addScore(player){
    document.getElementById("ball").style.marginLeft = "0px";
    document.getElementById("ball").style.marginTop = "0px";
    document.getElementById("pad1").style.marginTop = "0px";
    if(player === 1){
        document.getElementById("player1score").innerHTML = ++p1score;
    }
    else{
        document.getElementById("player2score").innerHTML = ++p2score;
    }
    ballMovement();

}
function ballMovement(){
    const speed = 5;
    const bottomBouncePosition = halfContHeigth * 2 - ballHeight;
    const topBouncePosition = bottomBouncePosition * -1;
    const rightBouncePosition = contWidth - paddleMargin - paddleWidth*2 - ballHeight*2;
    const leftBouncePosition = rightBouncePosition * -1;
    let topDirection = 1;
    let leftDirection = 1;
    window.setInterval(function show(){
        if(topBallPos > bottomBouncePosition){
            topDirection *= -1;
        }
        else if(topBallPos < topBouncePosition){
            topDirection *= -1;
        }
        if (leftBallPos >= rightBouncePosition){
            let padStl = window.getComputedStyle(document.querySelector("#pad2"));
            let marginTop = parseInt(padStl.getPropertyValue('margin-top'));
            let paddlePos = Math.abs(marginTop) + paddleHeight;

            if(Math.abs(topBallPos) <= paddlePos){
                leftDirection *= -1;
            }
            else{
                topDirection = 0;
                leftDirection = 0;
                topBallPos = 0;
                leftBallPos = 0;
                addScore(1);
            }
        }
        else if (leftBallPos <= leftBouncePosition){
            let padStl = window.getComputedStyle(document.querySelector("#pad1"));
            let marginTop = parseInt(padStl.getPropertyValue('margin-top'));
            let paddlePos = Math.abs(marginTop) + paddleHeight;

            if(Math.abs(topBallPos) <= paddlePos){
                leftDirection *= -1;
            }
            else{
                topDirection = 0;
                leftDirection = 0;
                topBallPos = 0;
                leftBallPos = 0;
                addScore(2);
            }
        }
        topBallPos += speed * topDirection;
        leftBallPos += speed * leftDirection;
        document.getElementById("ball").style.marginTop = (topBallPos) + "px";
        document.getElementById("ball").style.marginLeft = (leftBallPos) + "px";
        
    }, 1000/60);
}
function computersMovement(){
    window.setInterval(function show(){
        let padStl = window.getComputedStyle(document.querySelector("#pad2"));
        let marginTop = parseInt(padStl.getPropertyValue('margin-top'));
        let middleOfPaddle = (marginTop + paddleHeight) / 2;
        let currentTopBallPos = parseInt(ballStyles.getPropertyValue('margin-top'));

        if(middleOfPaddle < currentTopBallPos){
            marginTop += 10;
        }
        else if(middleOfPaddle > currentTopBallPos){
            marginTop -= 10;
        }
        document.getElementById("pad2").style.marginTop = String(marginTop) + "px";
    }, 500);
}