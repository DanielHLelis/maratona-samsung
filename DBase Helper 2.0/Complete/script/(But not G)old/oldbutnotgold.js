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