import React, { Component } from 'react'
import {
    BackHandler,
    Dimensions,
    Alert
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel'

import IconSet from '@components/core/IconSet'

import {
    Background
} from '@components/ComponentsList'

import Header from '@components/Header'
import Question from '@components/Question'

import COLORS from '@config/colors'

import storage from '@utils/storage'

class SimpleQuestionsScreen extends Component{
    _didFocus;
    _willBlur;

    constructor(props){
        super(props);

        this.state={
            width: Dimensions.get('screen').width,
            carIndx: 0,
            startTime: 0,
            questions: {},
            name: props.navigation.getParam('name', 'null'),
            info: props.navigation.getParam('info', 'Error'),
            section: props.navigation.getParam('section', 'null')
        }
        this._didFocus = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this._backPress)
        );  
    }

    _backPress = () =>{
        Alert.alert('Cuidado!', 'Se você sair perderá seu progresso atual, deseja mesmo sair?', [
            {
                text: 'Sair',
                onPress: () => {this.props.navigation.goBack()}
            },
            {
                text: 'Cancelar',
                style: 'cancel'
        }],
        {cancelable: true}
        );
        return true;
    }

    get pagination(){
        return(
            <Pagination
                dotsLength={this.state.info.length}
                activeDotIndex={this.state.carIndx}
                containerStyle={{backgroundColor: COLORS.blueBackground, paddingTop: 0, paddingBottom: 12}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#ffffff'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _setQuestions = (orig, name, val, whitch) => {
        let obj = orig;
        obj[name].correct = val;
        obj[name].marked = whitch;
        return obj;
    }
    _defineQuestions = (options) => {
        let obj = {}
        options.forEach((el) => {
            obj[el.title] = {
                correct: false,
                marked: null
            }
        });
        return obj;
    }
    _count = (obj, test) => {
        let count = 0;
        for(let a in obj){
            if(test(obj[a]))count++;
        }
        return count;
    }

    _addHistory = (callBack = () => null) => {
        storage.getStoreItem('historyItems' , (key, val) => {
            if(!val)
                val = [];
            else
                val = JSON.parse(val);
            let date = new Date();
            val.unshift({
                time: {
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    endTime: date.getTime()
                },
                startTime: this.state.startTime,
                name: this.state.name,
                done: this._count(this.state.questions, x=>x.correct),
                total: this.state.info.length,
                questions: this.state.questions
            });
            
            val.splice(49, 1);

            storage.setStoreItem('historyItems', JSON.stringify(val), callBack, callBack);
        });
    }

    _submit = (callBack) => {
        storage.getStoreItem('done' + this.state.section, (key, val) => {
            if(!val)
                val = {};
            else
                val = JSON.parse(val);
            val[this.state.name] = (this.state.info.length === this._count(this.state.questions, x=>x.correct))?true:((val[this.state.name])?(true):(false));

            storage.setStoreItem('done' + this.state.section, JSON.stringify(val), callBack, callBack);
        });
    }

    _send = () => Alert.alert('Alerta!', `Uma vez enviado não terá como voltar atrás, deseja mesmo enviar?`, [
        {
            text: 'Enviar',
            onPress: () => {
                this._submit(() => {
                    this._addHistory();
                    this.props.navigation.getParam('onSubmit', () => {})();
                    this.props.navigation.goBack();
                });
            }
        },
        {
            text: 'Cancelar',
            style: 'cancel'
    }],
    {cancelable: true}
    )

    _updateDimension = (val) => {this.setState({width: val.screen.width}); console.log('change')}

    componentWillMount(){
        this.setState({questions: this._defineQuestions(this.state.info)});
    }

    componentDidMount(){
        this._willBlur = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this._backPress)
        );
        this._dimension = Dimensions.addEventListener('change', this._updateDimension);
        this.setState({startTime: new Date().getTime()});
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this._updateDimension);
        this._didFocus && this._didFocus.remove();
        this._willBlur && this._willBlur.remove();
    }

    render(){
        return(
            <Background>
                <Header 
                    logged={this.props.logged}
                    leftPress={this._backPress}
                    leftComponent={IconSet.back}
                    rightComponent={IconSet.send}
                    rightPress={this._send}
                />
                {this.pagination}
                <Carousel 
                    data={this.state.info}
                    renderItem={({ item, index }) => 
                        <Question
                            title={item.title}
                            enunciado={item.text}
                            answers={item.options}
                            imageList={item.images}
                            correct={item.correct}
                            isCorrect={(val, whitch) => this.setState(this._setQuestions(this.state.questions, item.title, val, whitch))}
                        />  
                    }
                    sliderWidth={this.state.width}
                    itemWidth={this.state.width}
                    layout='default'
                    onSnapToItem={(index) => this.setState({carIndx: index})}
                />
            </Background>
        );
    }
}

export default SimpleQuestionsScreen;