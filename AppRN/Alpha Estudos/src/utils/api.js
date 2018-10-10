const data = require('@tests/test.json').themes;

export default {

    themes: () => {
        return data.map((el, indx) => ({
            _id: indx,
            name: el.name,
            image: el.image
        }));
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
            image: el.image,
            difficulty: el.difficulty,
            disbled: (el.disbled)?true:false
        }));
    },

    questionsByID: (parentId, id) => {
        return data[parentId].matters[id].questions.map((el, indx) => {
            return {...el, _themeId: parentId, _matterId: id, _id: indx }
        });
    }

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