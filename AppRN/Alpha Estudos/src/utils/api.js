import Test from '@tests/test.json'

class api{
    constructor(){
        this.data = JSON.parse(Test).themes;
    }


    get themes(){
        return this.data.map((el, indx) => ({
            _id: indx,
            name: el.name,
            image: el.image
        }));
    }

    get matters(name){
        for(let i = 0; i < this.data.length; i++)
            if(this.data[i].name === name)return this.data[i].matters;
    }

    get mattersByID(id){
        return this.data[id].matters.map((el, indx) => ({
            _id: indx,
            _parentId: id,
            name: el.name,
            image: el.image,
            difficulty: el.difficulty,
            disbled: (el.disbled)?true:false
        }));
    }

    get questionsByID(parentId, id){
        return ({_id: `${parentId}/${id}` ,themeId: parentId, matterId: id, questions: this.data[parentId].matters[id].questions});
    }

}