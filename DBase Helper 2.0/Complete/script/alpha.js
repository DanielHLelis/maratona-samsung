let themesEl = document.querySelector('#theme');
let matterEl = document.querySelector('#matter');
let questionEl = document.querySelector('#question');
let jsonOutEl = document.querySelector('#jsonOut');

let saveEl = document.querySelector('#save')

let nextStepEl = document.querySelector('#nextStep');
let previousStepEl = document.querySelector('#previousStep');

let jsonInEl = document.querySelector('#jsonIn');
let jsonEl = document.querySelector('#dbaseJson');

let themeStartEl = document.querySelector('#themeStart');
let themeSelectEl = document.querySelector('#themeSelect');
let themeOpts = document.querySelector('#themeOpts');
let themeNameEl = document.querySelector('#themeName');
let themeImageEl = document.querySelector('#themeImage');

let matterStartEl = document.querySelector('#matterStart');    
let matterSelectEl = document.querySelector('#matterSelect');

//////////////
//NAVIGATION//
//////////////

let cont = 0;

previousStepEl.style.display = 'none';

hide(saveEl);
hide(themesEl);
hide(matterEl);
hide(questionEl);
hide(jsonOutEl);

nextStepEl.addEventListener('click', next);
previousStepEl.addEventListener('click', previous);
themeStartEl.addEventListener('change', themeSel);
matterStartEl,addEventListener('change', matterSel);

function matterSel(){
    if(matterStartEl.value == '0'){
        hide(matterSelectEl)
    }
    else if(matterStartEl.value == '1'){
        show(matterSelectEl)
    }
}

function themeSel(){
    if(themeStartEl.value == '0'){
        hide(themeSelectEl)
    }
    else if(themeStartEl.value == '1'){
        show(themeSelectEl)
    }    
}


function previous(){
    if(cont == 1){
        show(jsonInEl);
        hide(saveEl);
        hide(themesEl);
        hide(previousStepEl)
        cont--;
    }
    else if(cont == 2){
        show(themesEl);
        show(saveEl);
        hide(matterEl);
        cont--;
    }
    else if(cont == 3){
        show(matterEl);
        show(nextStepEl);
        hide(questionEl);
        cont--;
    }
    else if(cont == 4){
        hide(jsonOutEl);
        show(saveEl);
        show(nextStepEl);
        show(questionEl);
        cont--;
    }
}

function next(){
    if(cont == 0){
        if(jsonEl.value != ''){
            hide(jsonInEl);
            show(saveEl);
            show(previousStepEl);
            show(themesEl);
            cont++;
        }
        else
            alert('Por favor, insira um JSON');
    }
    else if(cont == 1){
        hide(themesEl);
        show(matterEl);
        cont++;
    }
    else if(cont == 2){
        hide(matterEl);
        show(questionEl);
        cont++;
    }
    else if(cont == 3){
        hide(saveEl);
        hide(questionEl);
        hide(nextStepEl);
        show(jsonOutEl);
        cont++;
    }
} 

function hide(element){
    element.style.display = 'none';
}

function show(element){
    if(element == nextStepEl || element == previousStepEl){
        element.style.display = 'inline';
    }
    else{
        element.style.display = 'block';
    }
}


//////////////
//NAVIGATION//
//////////////

///////////////////
//JSON OPERATIONS//
///////////////////

var jsonAlpha;

jsonEl.addEventListener('change', jsonCrt)

function jsonCrt(){//Parses JSON
    jsonAlpha = JSON.parse(jsonEl.value);
}



///////////////////
//JSON OPERATIONS//
///////////////////