let numClick = -1;

let userPattern = [];

let systemPattern= [];

let possibleColor= ["red", "green", "yellow", "blue"]

let level = 0;
let highscore =0;

$(".btn").click(function(buttonClicked){
    numClick++;
    let color = buttonClicked.target.id;
    Animation("#"+ color);
    playAudio(color);
    checkAnswer(color);

    
});

function checkAnswer(color){
    userPattern.push(color);
    if(color== systemPattern[numClick]){
        if(userPattern.length==systemPattern.length){
            setTimeout(function(){

                userPattern = [];
                numClick= -1;
                nextSequence();
            },1000
            );
        }
        
    }else{
        $("body").addClass("game-over")
        $("h2").text("Opps Game Over! Hit another key to try Again")
        userPattern= [];
        systemPattern= [];
        if(level > highscore){
            highscore = level;
            $("#highscore").text(level)
            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 200);
            
        }
        
        
        level= 0;
        numClick =-1;
    }
}


function nextSequence(){
    $("body").removeClass("game-over");
    level++;
    $("#level").text(level);
    let rand = Math.floor(Math.random()*4);
    let color=  possibleColor[rand];
    systemPattern.push(color);
    playAudio(color);
    Animation("#" + color);
}

function playAudio(color){
     let relPath = '/' + color +".mp3";
     let audio = new Audio(relPath);
     audio.play();

 }
 function Animation(id){
     $(id).fadeOut(100).fadeIn(100);
 }


$(document).keydown(function(){
    if(level <=0){
        $("h2").text("The Game Begins")
        nextSequence();
    }
})
