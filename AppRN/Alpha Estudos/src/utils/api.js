const data = require('@assets/questions.json').themes;

export default {

    themes: async () => {
        return data.map((el, indx) => {
            return {
                _id: el._id,
                name: el.name,
                image: imageData[el.image.uri],
                length: el.matters.length
            }
    });
    },
    mattersByID: async (id) => {
        for(let i = 0; i < data.length; i++){
            if(data[i]._id === id)
                return data[i].matters.map((el, indx) => ({
                    _id: el._id,
                    _parentId: id,
                    name: el.name,
                    image: imageData[el.image.uri],
                    difficulty: el.difficulty,
                    disbled: (el.disbled)?true:false
                }));
        }
    },

    questionsByID: async (id, parentId) => {

        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].matters.length; j++){
                if(data[i].matters[j]._id === id){
                    return data[i].matters[j].questions.map(el => {
                        let imgs = [];
                        el.images?el.images.forEach((val) => {
                            imgs.push({...val, image: imageData[val.image.uri]});
                        }):null;
                        return {...el, _themeId: parentId, _matterId: id, images: imgs } 
                    })
                }
            }
        }
    },

    question: (id, cb = () => null) => {
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].matters.length; j++){
                for(let k = 0; k < data[i].matters[j].questions.length; k++){
                    if(data[i].matters[j].questions[k]._id === id){
                        let el = data[i].matters[j].questions[k];
                        let imgs = [];
                        el.images?el.images.forEach((val) => {
                            imgs.push({...val, image: imageData[val.image.uri]});
                        }):null;
                        cb({...el, images: imgs });
                        return {...el, images: imgs } 
                    }
                        
                }
            }
        }
    }

}

    

const imageData = {
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
    "ratoPassaroEsquilo_Qst.png": require('@assets/qstImg/ratoPassaroEsquilo_Qst.png'),

    "adaptacoesVegetais_Mttr.jpg": require('@assets/qstImg/adaptacoesVegetais_Mttr.jpg'),
    "araucarias_Qst.png": require('@assets/qstImg/araucarias_Qst.png'),
    "biomas_Thm.jpg": require('@assets/qstImg/biomas_Thm.jpg'),
    "biomasBrasileiros_Mttr.jpg": require('@assets/qstImg/biomasBrasileiros_Mttr.jpg'),
    "cactus_Qst.png": require('@assets/qstImg/cactus_Qst.png'),
    "cerrado_Qst.jpg": require('@assets/qstImg/cerrado_Qst.jpg'),
    "desastreNatural_Mttr.jpg": require('@assets/qstImg/desastreNatural_Mttr.jpg'),
    "desmatamento_Qst.png": require('@assets/qstImg/desmatamento_Qst.png'),
    "interferenciaHumana_Mttr.jpg": require('@assets/qstImg/interferenciaHumana_Mttr.jpg'),
}