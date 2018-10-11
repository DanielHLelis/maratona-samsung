const data = require('@assets/questions.json').themes;

export default {

    themes: () => {
        return data.map((el, indx) => {
            return {
                _id: indx,
                name: el.name,
                image: imageData[el.image.uri],
                length: el.matters.length
            }
    });
    },

    matters: (name) => {
        for(let i = 0; i < data.length; i++)
            if(data[i].name === name)return data[i].matters;
    },

    mattersByID: (id) => {
        return data[id].matters.map((el, indx) => ({
            _id: indx,
            _parentId: id,
            name: el.name,
            image: imageData[el.image.uri],
            difficulty: el.difficulty,
            disbled: (el.disbled)?true:false
        }));
    },

    questionsByID: (parentId, id) => {

        return data[parentId].matters[id].questions.map((el, indx) => {
            let imgs = [];
            el.images?el.images.forEach((val) => {
                imgs.push({...val, image: imageData[val.image.uri]});
            }):null;
            return {...el, _themeId: parentId, _matterId: id, _id: indx, images: imgs }
        });
    }

}

const imageData = {
    "relacoesEcologicas_Thm.jpg": require('@assets/qstImg/relacoesEcologicas_Thm.jpg'),
    "agrotoxico.jpg": require('@assets/qstImg/agrotoxico.jpg'),
    "comunidadesEPopulacoes_Mttr.jpg": require('@assets/qstImg/comunidadesEPopulacoes_Mttr.jpg'),
    "ecossistemaAquatico_Qst.png": require('@assets/qstImg/ecossistemaAquatico_Qst.png'),
    "energia1a4_Qst.png": require('@assets/qstImg/energia1a4_Qst.png'),
    "fluxoDeEnergia_Mttr.jpg": require('@assets/qstImg/fluxoDeEnergia_Mttr.jpg'),
    "graficoGambaGalinha_Qst.png": require('@assets/qstImg/graficoGambaGalinha_Qst.png'),
    "insetos_Qst.png": require('@assets/qstImg/insetos_Qst.png'),
    "mercurio_Qst.png": require('@assets/qstImg/mercurio_Qst.png'),
    "niveisTroficos_Mttr.jpg": require('@assets/qstImg/niveisTroficos_Mttr.jpg'),
    "peixeLeão_Qst.jpg": require('@assets/qstImg/peixeLeao_Qst.jpg'),
    "relacoesEcologicas_Thm.jpg": require('@assets/qstImg/relacoesEcologicas_Thm.jpg'),
    "teiaConsumidor3_Qst.png": require('@assets/qstImg/teiaConsumidor3_Qst.png'),
    "teiaGalinha_Qst.png": require('@assets/qstImg/teiaGalinha_Qst.png'),
    "teiasECadeias_Mttr.jpg": require('@assets/qstImg/teiasECadeias_Mttr.jpg'),
    "ratoPassaroEsquilo_Qst.png": require('@assets/qstImg/ratoPassaroEsquilo_Qst.png')
}

// class api{
//     constructor(){
//         this.data = JSON.parse(Test).themes;
//     }


//     get themes(){
//         return this.data.map((el, indx) => ({
//             _id: indx,
//             name: el.name,
//             image: el.image
//         }));
//     }

//     get matters(name){
//         for(let i = 0; i < this.data.length; i++)
//             if(this.data[i].name === name)return this.data[i].matters;
//     }

//     get mattersByID(id){
//         return this.data[id].matters.map((el, indx) => ({
//             _id: indx,
//             _parentId: id,
//             name: el.name,
//             image: el.image,
//             difficulty: el.difficulty,
//             disbled: (el.disbled)?true:false
//         }));
//     }

//     get questionsByID(parentId, id){
//         return ({_id: `${parentId}/${id}` ,themeId: parentId, matterId: id, questions: this.data[parentId].matters[id].questions});
//     }

// }