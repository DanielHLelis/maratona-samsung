var selectEl = document.getElementById('selecao');

let themeEl = document.querySelector('#theme');
let themeImgEl = document.querySelector('#themeImg');
let mattersEl = document.querySelector('#matters');
let mattersImgEl = document.querySelector('#mattersImg');
let difficultyEl = document.querySelector('#difficulty');
let titleEl = document.querySelector('#title');
let textEl = document.querySelector('#text');
let questionImgEl = document.querySelector('#questionImg');
let questionImgSubtitleEl = document.querySelector('#questionImgSubtitle');
let aEl = document.querySelector('#a');
let bEl = document.querySelector('#b');
let cEl = document.querySelector('#c');
let dEl = document.querySelector('#d');
let correctEl = document.querySelector('#correct');
let saveEl = document.querySelector('#save');

theme = [themeEl, themeImgEl];
matters = [mattersEl, mattersImgEl, difficultyEl];
question = [titleEl, textEl, questionImgEl, questionImgSubtitleEl, aEl, bEl, cEl, dEl, correctEl, saveEl];

selectEl.onchange = function()  {
    switch(selectEl.value){
        case "1": 
            show(theme);
            show(matters);
            show(question);
            break;
        case "2":
            hide(theme);
            show(matters);
            show(question);
            break;
        case "3":
            hide(theme);
            hide(matters);
            show(question);
            break;
        default:
            hide(theme);
            hide(matters);
            hide(question);
    }
}

function show(aux){
    for(let i = 0; i < aux.length; i++){
        aux[i].style.display = 'block';
    }
}

function hide(aux){
    for(let i = 0; i < aux.length; i++){
        aux[i].style.display = 'none';
    }
}


