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
themeSelectEl.addEventListener('change', themeSel);

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


/*
let themeEl = document.querySelector('#themeData');
let themeNameEl = document.querySelector('#themeName');
let themeImgEl = document.querySelector('#themeImg');
let matterEl = document.querySelector('#matterData');
let matterNameEl = document.querySelector('#matterName');
let matterImageEl = document.querySelector('#matterImg');
let matterDifficultyEl = document.querySelector('#matterDifficulty');
let questionsEl = document.querySelector('#questions');
let qstNameEl = document.querySelector('#qstName');
let qstNumberEl = document.querySelector('#qstNumber'); 
let qstTextEl = document.querySelector('#qstText');
let qstCorrectEl = document.querySelector('#correct');
let qstAEl = document.querySelector('#a');
let qstBEl = document.querySelector('#b');
let qstCEl = document.querySelector('#c');
let qstDEl = document.querySelector('#d');
let qstEEl = document.querySelector('#e');
let qstImg = document.querySelector('#qstImg');
let qstImgSub = document.querySelector('#qstImgSub');
let nextImgEl = document.querySelector('#nextImg');
let previousImgEl = document.querySelector('#previousImg');
let nextQstEl = document.querySelector('#nextQst');
let matterConcludeEl = document.querySelector('#matterConclude');
let themeConcludeEl = document.querySelector('#thmConclude')

let qstData = [qstNameEl, qstTextEl, qstCorrectEl, qstAEl, qstBEl,qstCEl, qstDEl, qstEEl];
let mttrData = [matterNameEl, matterImageEl, matterDifficultyEl]
let thmData = [themeNameEl, themeImgEl]

let imagesTemp = [];
let questionsTemp = [];
let matters = [];
let themes = [];

matterConcludeEl.addEventListener('click', crtMttrObj);
nextImgEl.addEventListener('click', crtImgObj);
nextQstEl.addEventListener('click', crtQstObj);
themeConcludeEl.addEventListener('click', crtThmObj);

selectorEl.onchange = function(){
    switch(selectorEl.value){
        case "1":
            show(themeEl);
            show(matterEl);
            break;
        case "2":
            hide(themeEl);
            show(matterEl);
            break;
        case "3":   
            hide(themeEl);
            hide(matterEl);
            break;
    }
}

function hide(element){
    element.style.display = 'none';
}

function show(element){
    element.style.display = 'block';
}

function crtImgObj(){//Creates image array
    let auxImg = imagesTemp.length;
    if(qstImg.value != "" && qstImgSub.value != ""){
        imagesTemp[auxImg] ={ 
                        image: {uri: qstImg.value},
                        subtitle: qstImgSub.value
        };
        qstImg.value = "";
        qstImgSub.value = "";
        
    }
    else if(qstImg.value != "" && qstImgSub.value == ""){
        imagesTemp[auxImg] ={
            image: {uri: qstImg.value}
        };
        qstImg.value = "";
        qstImgSub.value = "";
        
    }
    else{
        alert('Por favor, insira os dados das imagens');
    }
}

function crtQstObj(){//Creates question object  
    let auxQst = questionsTemp.length;
    if(qstNameEl.value != "" && qstTextEl.value != "" && qstCorrectEl.value != "" && qstAEl.value != "" && qstBEl .value != "" && qstCEl.value != "" && qstDEl.value != "" && qstEEl.value != ""){
        questionsTemp[auxQst] = {
                            title: qstNameEl.value,
                            text: qstTextEl.value,
                            correct: qstCorrectEl.value,
                            images: imagesTemp,
                            options: {
                                a:qstAEl.value,
                                b:qstBEl.value,
                                c:qstCEl.value,
                                d:qstDEl.value,
                                e:qstEEl.value
                            }          
        }
        qstData.forEach(item => {
            item.value = "";
        });
        imagesTemp = [];
    }
    else if(qstNameEl.value != "" && qstTextEl.value != "" && qstCorrectEl.value != "" && qstAEl.value != "" && qstBEl .value != "" && qstCEl.value != "" && qstDEl.value != "" && qstEEl.value == ""){
        questionsTemp[auxQst] = {
                            title: qstNameEl.value,
                            text: qstTextEl.value,
                            correct: qstCorrectEl.value,
                            images: imagesTemp,
                            options: {
                                a:qstAEl.value,
                                b:qstBEl.value,
                                c:qstCEl.value,
                                d:qstDEl.value
                            }          
        }
        qstData.forEach(item => {
        });
        imagesTemp = [];
    }
    else{
        alert('Por favor, verifique os dados inseridos');
    }
}

function crtMttrObj(){//Creates matter object
item.value = "";
    let auxMttr = matters.length;
    if(matterNameEl.value != "" && matterDifficultyEl.value != "" && matterImageEl.value != "" && questionsTemp.length != 0){
        matters[auxMttr] = {
                        name: matterNameEl.value,
                        done: false,
                        image: {uri: matterImageEl.value},
                        difficulty: matterDifficultyEl.value,
                        questions: questionsTemp
                    };
        mttrData.forEach(item => {
            item.value = "";
        });
        questionsTemp = [];                
    }
    else{
        alert('Não é possivel criar um tópico sem questões');
    }
    
}

function crtThmObj(){
    let auxThm = themes.length;
    if(themeNameEl.value != "" && themeImgEl.value != "" && matters.length != 0){
        themes[auxThm] = {
                    name: themeNameEl.value,
                    done: 0,
                    image: {uri: themeImgEl.value},
                    matters: matters
                    }
        thmData.forEach(item => {
            item.value = "";
        });
        matters = [];
    }
}
*/