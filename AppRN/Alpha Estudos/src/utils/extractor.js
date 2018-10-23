_questionExtractor = (el) => {
    let obj = [];
    for(let a in el){
        obj.push({title: a, marked: el[a].marked, correct: el[a].correct, _id: el[a]._id});
    }
    return obj;
};

export default _questionExtractor;