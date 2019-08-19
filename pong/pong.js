function test(){
    var paddleStyles = window.getComputedStyle(document.querySelector(".paddle"));
    var containerStyles = window.getComputedStyle(document.querySelector("#containter"));
    
    var paddleHeight = paddleStyles.getPropertyValue('height');
    var pad1Margin = 0;
    
    const halfContHeigth = parseInt(containerStyles.getPropertyValue('height'))/2;
    console.log(halfContHeigth);

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
