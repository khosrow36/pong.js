function init(){
    paddleStyles = window.getComputedStyle(document.querySelector("#pad1"));
    containerStyles = window.getComputedStyle(document.querySelector("#containter"));
    ballStyles = window.getComputedStyle(document.querySelector("#ball"));

    paddleHeight = paddleStyles.getPropertyValue('height');
    paddleWidth = parseInt(paddleStyles.getPropertyValue('width'));
    paddleMargin = parseInt(paddleStyles.getPropertyValue('margin-left'));

    halfContHeigth = parseInt(containerStyles.getPropertyValue('height')) / 2;
    contWidth = parseInt(containerStyles.getPropertyValue('width'));

    topBallPos = parseInt(ballStyles.getPropertyValue('margin-top'));
    leftBallPos = parseInt(ballStyles.getPropertyValue('margin-left'));
    ballHeight = parseInt(ballStyles.getPropertyValue('height'));

    playersMovement();
    ballMovement();
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
function ballMovement(){
    const speed = Math.random() * 7 + 4;
    const bottomBouncePosition = halfContHeigth * 2 - ballHeight;
    const topBouncePosition = bottomBouncePosition * -1;
    const rightBouncePosition = contWidth - paddleMargin - paddleWidth*2 - ballHeight*2;
    const leftBouncePosition = rightBouncePosition * -1;
    console.log(rightBouncePosition);
    console.log(leftBouncePosition);
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
            leftDirection *= -1;
        }
        else if (leftBallPos <= leftBouncePosition){
            leftDirection *= -1;
        }
        topBallPos += speed * topDirection;
        leftBallPos += speed * leftDirection;
        document.getElementById("ball").style.marginTop = (topBallPos) + "px";
        document.getElementById("ball").style.marginLeft = (leftBallPos) + "px";
        
    }, 1000/30);
}