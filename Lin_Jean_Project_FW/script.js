var ltwords=[
    "a capella",
    "a piacere",
    "accelerando",
    "accento",
    "ad libitum",
    "adagietto",
    "adagio",
    "affabile",
    "affettuoso",
    "affrettando",
    "agitato",
    "alla breve",
    "allargando",
    "allegretto",
    "allegro",
    "alt",
    "amabile",
    "amore",
    "andante",
    "andantino",
    "anima",
    "animando",
    "animato",
    "appassionato",
    "arco",
    "arioso",
    "assai",
    "attacca",
    "ben",
    "bis",
    "bravura",
    "brio",
    "calando",
    "cantabile",
    "cantando",
    "capriccioso",
    "crescendo",
    "da capo",
    "dal segno",
    "deciso",
    "decrescendo",
    "delicato",
    "diminuendo",
    "dolce",
    "dolente",
    "dolore",
    "doloroso",
    "energico",
    "espressivo",
    "estinto",
    "facile",
    "felice",
    "fermata",
    "feroce",
    "fine",
    "flessibile",
    "forte",
    "fortepiano",
    "fortissimo",
    "forza",
    "fretta",
    "fuoco",
    "furioso",
    "giocoso",
    "giusto",
    "grandioso",
    "grave",
    "grazioso",
    "impetuoso",
    "incalzando",
    "inquieto",
    "in relievo",
    "lacrimoso",
    "largamente",
    "larghetto",
    "largo",
    "legato",
    "leggiero",
    "lento",
    "loco",
    "lugubre",
    "lunga",
    "lusigando",
    "maestoso",
    "mancando",
    "marcato",
    "marziale",
    "meno",
    "mesto",
    "mezzoforte",
    "mezzopiano",
    "misterioso",
    "misura",
    "moderato",
    "molto",
    "morendo",
    "mosso",
    "moto",
    "niente",
    "nobilmente",
    "nuovo",
    "obbligato",
    "ossia",
    "ostinato",
    "parlando",
    "patetico",
    "pausa",
    "perdendosi",
    "pesante",
    "piacevole",
    "piangevole",
    "pianissimo",
    "piano",
    "pizzicato",
    "placido",
    "pochettino",
    "poco",
    "precipitando",
    "presto",
    "prima",
    "quasi",
    "rallentando",
    "rigoroso",
    "rinforzando",
    "risoluto",
    "ritardando",
    "ritenuto",
    "ritmico",
    "rubato",
    "scherzando",
    "scherzo",
    "semplice",
    "sempre",
    "senza",
    "segue",
    "sforzando",
    "simile",
    "slargando",
    "slancio",
    "smorzando",
    "soave",
    "solenne",
    "sonoro",
    "sopra",
    "sospirando",
    "sostenuto",
    "sotto",
    "spirito",
    "spiritoso",
    "staccato",
    "strepitoso",
    "stretto",
    "stringendo",
    "subito",
    "tacet",
    "tento",
    "tempo",
    "tenuto",
    "tosto",
    "tranquillo",
    "trionfale",
    "troppo",
    "veloce",
    "vigoroso",
    "vivace",
    "vivo",
    "voce",
    "volante",
    "volta",
]


//all global variables in the game
var solfege=["do","re","mi","fa","sol","la","si"] 

let currentId = 0;
const playerWord = document.getElementById("player-word");
const timeText = document.getElementById("time-text");
const pointText = document.getElementById("point-number");
const menuBox = document.getElementById("menu-box");
var ambiantSound = new Audio("sounds/underwater-ambience.mp3");
var music = new Audio("sounds/music.mp3");
var correctSound = new Audio("sounds/correct-choice.mp3");
var time = 60;
var points = 0;
var noteY;
var noteNb=0;
var isMenuOpen = 2;
var tempNotePos = 0;
var noteImg = 0;
var noteSpeed;
var isMusic = 0;
var isSFX = 0;
var isHint = 1;
var noteFlagArr=[true,true,true,true,true,true,true,true,true,true,true];
var notesOnScreen = [];

//functions executed at the start of the game
function gameStartFunctions(){
    document.getElementById("start-box").style.display="none";
    document.getElementById("timer-box").style.width=time+2+"vw";
    document.getElementById("player-word").focus();
    timer();
    genNotes();
    music.play();
    ambiantSound.play();
    ambiantSound.loop=true;
    music.loop=true;
    ambiantSound.volume="1";
    music.volume="0.2";
    isMenuOpen=0;

}

//event listeners related to key presses
document.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        console.log("Enter!");
        verif();
        playerWord.value='';

    }
});

document.addEventListener('keydown', function(e){
    if(e.code == "Escape"){
        console.log("OWRKDW");
        toggleMenu();
    }
});

//menu amd functions related to the menu
function toggleMenu(){
    if(isMenuOpen==0){
        menuBox.style.display="block";
        clearInterval(TimerTimeout);
        const currentNotes = document.querySelectorAll(".notes");
        for(let i = 0; i < currentNotes.length; i++){
            currentNotes[i].style.animationPlayState="paused"
        }
        isMenuOpen=1;
    } else  if(isMenuOpen==1){
        menuBox.style.display="none";
        timer();
        const currentNotes = document.querySelectorAll(".notes");
        for(let i = 0; i < currentNotes.length; i++){
            currentNotes[i].style.animationPlayState="running"
        }
        isMenuOpen=0;
        document.getElementById("player-word").focus();

    }
}
function toggleMusic(){
    if(isMusic==0){
        document.getElementById("music-check").style.display="none";
        document.getElementById("music-x").style.display="block";
        isMusic=1;
        music.volume="0";
    } else {
        document.getElementById("music-check").style.display="block";
        document.getElementById("music-x").style.display="none";
        isMusic=0;
        music.volume="0.2";
    }
}

function toggleSFX(){
    if(isSFX==0){
        document.getElementById("sfx-check").style.display="none";
        document.getElementById("sfx-x").style.display="block";
        isSFX=1;
        ambiantSound.volume="0";
        correctSound.volume="0";
    } else {
        document.getElementById("sfx-check").style.display="block";
        document.getElementById("sfx-x").style.display="none";
        isSFX=0;
        ambiantSound.volume="1";
        correctSound.volume="1";
    }
}

function toggleHint(){
    noteHintToggleOn = setInterval(() => {
        const currentNotesText = document.querySelectorAll(".notes-text");
        for(let i = 0; i < currentNotesText.length; i++){
            currentNotesText[i].style.display="none";
        }
    }, 5);

    noteHintToggleOff = setInterval(() => {
        const currentNotesText = document.querySelectorAll(".notes-text");
        for(let i = 0; i < currentNotesText.length; i++){
            currentNotesText[i].style.display="block";
        }
    }, 5);

    clearInterval(noteHintToggleOff);
    clearInterval(noteHintToggleOn);


    if(isHint==0){
        document.getElementById("hint-check").style.display="none";
        document.getElementById("hint-x").style.display="block";
        noteHintToggleOn = setInterval(() => {
            const currentNotesText = document.querySelectorAll(".notes-text");
            for(let i = 0; i < currentNotesText.length; i++){
                if(isHint==0){
                    currentNotesText[i].style.display="block";

                }  else if(isHint==1) {
                    currentNotesText[i].style.display="none";

                }
            }
        }, 5);
        isHint=1;

    } else {
        document.getElementById("hint-check").style.display="block";
        document.getElementById("hint-x").style.display="none";
        noteHintToggleOff = setInterval(() => {
            const currentNotesText = document.querySelectorAll(".notes-text");
            for(let i = 0; i < currentNotesText.length; i++){
                if(isHint==0){
                    currentNotesText[i].style.display="block";

                } else if(isHint==1) {
                    currentNotesText[i].style.display="none";

                }
            }
        }, 5);
        isHint=0;

    }
}

function restart(){
    window.location.reload();
}
var isInfoOpen=0;

function info(){
    if(isInfoOpen==0){
        document.getElementById("info-box").style.display="block";
        document.getElementById("menu-box").style.display="none";
        isInfoOpen=1;
    } else if(isInfoOpen==1){
        document.getElementById("info-box").style.display="none";
        document.getElementById("menu-box").style.display="block";
        isInfoOpen=0;
    }
}

//timer aka health in the game
function timer(){
    document.getElementById("timer-bar").style.width=time+"vw";
    timeText.innerHTML="Time: " + time;
    timeText.style.fontSize="2vh";    
    timeText.style.color="white";
    timeText.style.margin="0";
    TimerTimeout = setInterval(() => {
        if(time>=0){
        time=time-1,
        timeText.innerHTML="Time: " + time, 
        timeText.style.fontSize="2vh",
        timeText.style.color="white",
        timeText.style.margin="0",
        console.log("time left:"+ time),
        document.getElementById("timer-bar").style.width=time+"vw",
        end();
        }
    }, 1000); 
}

//to always check if the note has reached the end of the staff
async function failCheck(image, tempNotePos){
    await waitForNote(image);
    time=time-5;
    document.getElementById("timer-bar").style.width=time+"vw";
    document.getElementById("timer-bar").style.backgroundImage="linear-gradient(270deg,tomato,red)";
    timeText.innerHTML="Time: " + time;
    timeText.style.fontSize="2vh";    
    timeText.style.color="tomato";
    timeText.style.margin="0";
    setTimeout(() => {
        timeText.innerHTML="Time: " + time;
        timeText.style.fontSize="2vh";    
        timeText.style.color="white";
        timeText.style.margin="0";
        document.getElementById("timer-bar").style.backgroundImage="linear-gradient(280deg, #C6C8EE, white )";
    }, 400);
        noteFlagArr[tempNotePos] = true;
        image.remove();
        noteNb=noteNb-1;
        end();
        console.log(notesOnScreen);
        notesOnScreen.shift();

}


function point(){
    pointText.innerHTML=points;
    pointText.style.color="white";
    pointText.style.fontSize="2vh"
    pointText.style.margin="0"
}

//function when the game ends
function end(){
    if(time<=0) {
        clearInterval(TimerTimeout);
        console.log("end!");
        time=0
        timeText.innerHTML="Time: "+time;
        timeText.style.fontSize="2vh";    
        timeText.style.color="tomato";
        timeText.style.margin="0";
        document.getElementById("end-box").style.display="block";
        document.getElementById("end-point").innerHTML="Your final amount of points is "+points;
        document.getElementById("end-point").style.color="white";
        document.getElementById("end-point").style.fontSize="5vh";
        document.getElementById("end-point").style.textAlign="center";

        music.pause();
        ambiantSound.pause();
        document.getElementById("timer-bar").style.display="none";
        const currentNotes = document.querySelectorAll(".notes");
        for(let i = 0; i < currentNotes.length; i++){
            currentNotes[i].style.display="none";
        }
    }
}

//function to check the word entered and the note's value
function verif(input){
    if(notesOnScreen[0].querySelector("p").innerHTML.toLowerCase()==playerWord.value.toLowerCase()){
        correct();
        notesOnScreen[0].remove();
        notesOnScreen.shift();
        noteNb = noteNb-1;
        noteFlagArr[tempNotePos] = true;
    }
}

//list of events when correct
function correct(){
    correctSound.load();
    correctSound.play();
    points = points + 500;
    
    document.getElementById("point-number").innerHTML=points;
    document.getElementById("point-number").style.fontSize="2vh";
    document.getElementById("point-number").style.color="white";
    document.getElementById("point-number").style.margin="0";

    time=time+1;
    timeText.innerHTML="Time: " + time;
    timeText.style.fontSize="2vh";
    timeText.style.color="white";
    timeText.style.margin="0";
    document.getElementById("timer-bar").style.width=time+"vw";
    if(time>=60){
        time=60;
        timeText.innerHTML="Time: " + time;
        timeText.style.fontSize="2vh";
        timeText.style.color="white";
        timeText.style.margin="0";
        document.getElementById("timer-bar").style.width=time+"vw";
    }
}

//to generate notes, assign their style properties and positions
function genNotes() {
    if (noteFlagArr.every(element => element === false)){
        return;
    }

    let tempArr = Object.keys(solfege);
    let randomChoice = Math.floor(Math.random() * tempArr.length);
    randomChoice = tempArr[randomChoice];

    noteGen = setInterval(() => {
        if (noteNb <= 2 && time>=1 && isMenuOpen!=1) {
            for (let i = 0; i < 1; i++) {
                tempNotePos = Math.floor(Math.random() * 11);
                if (!noteFlagArr[tempNotePos]) {
                    continue;
                }

                noteFlagArr[tempNotePos] = false;
                const image = document.createElement("div");
                const realImage = document.createElement("img");
                const imageText = document.createElement("p");
                image.classList.add("notes");
                imageText.classList.add("notes-text");
                image.style.width = "16.8vmin";
                image.style.height = "16.8vmin";
                image.style.zIndex = "10";
                imageText.style.fontSize = "2vh";
                imageText.style.margin = "0";
                imageText.style.position = "absolute";
                imageText.style.transform = "translate(-50%,-50%)";
                imageText.style.left = "50%";
                imageText.style.top = "85%";
                noteSpeed= Math.ceil(Math.random()*20)*450+1500;
                image.style.animationDuration=noteSpeed+"ms";

                document.getElementById("staff-box").appendChild(image);
                failCheck(image, tempNotePos);
                realImage.classList.add("realImage");

                noteY = tempNotePos *7.5;
                noteImg = Math.floor(Math.random() * 2);
                image.style.top = noteY+"%"

                if (noteImg == 0) {
                    realImage.src = "./images/quarter_note.png";
                } else {
                    realImage.src = "./images/eighth_note.png";
                }

                if (tempNotePos <= 5) {
                    realImage.style.transform = "rotate(180deg) translateY(-64%)";
                }

                //to assign a value and id to each generated note
                if (tempNotePos==0 || tempNotePos==7){
                    imageText.innerHTML="Sol";
                    image.id = "Sol"+"_"+currentId;
                }
                if (tempNotePos==1 || tempNotePos==8){
                    imageText.innerHTML="Fa";
                    image.id = "Fa"+"_"+currentId;
                }
                if (tempNotePos==2 || tempNotePos==9){
                    imageText.innerHTML="Mi";
                    image.id = "Mi"+"_"+currentId;
                }
                if (tempNotePos==3 || tempNotePos==10){
                    imageText.innerHTML="Re";
                    image.id = "Re"+"_"+currentId;
                }
                if (tempNotePos==4){
                    imageText.innerHTML="Do";
                    image.id = "Do"+"_"+currentId;
                }
                if (tempNotePos==5){
                    imageText.innerHTML="Si";
                    image.id = "Si"+"_"+currentId;
                }
                if (tempNotePos==6){
                    imageText.innerHTML="La";
                    image.id = "La"+"_"+currentId;
                }

                currentId++;
                noteNb = noteNb + 1;
                image.appendChild(realImage);
                image.appendChild(imageText);

                notesOnScreen.push(image);
            }
        } else {
            return;
        }
    }, 750);
}

//to reset lanes occupation status
async function waitForNote(note) {
    return new Promise(resolve => {
        note.addEventListener('animationend', () => {
            getElementFromCoord();
            resolve(); 
        });
    });
}

//to assign an id to each note to identify them
let mainContainer = document.getElementById("staff-box")
function getElementFromCoord(){
    let a = mainContainer.querySelectorAll(".notes")
    let leftmostElem = null;
    let minDist = Infinity;
    for (let elem of a){
        const { x } = elem.getBoundingClientRect();
        if (x < minDist) {
            minDist = x;
            leftmostElem = elem;
        }
    }
    return leftmostElem;
}
