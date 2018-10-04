import React, { Component } from 'react'
import {
    Text,
    BackHandler,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';

import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Carousel, {
    Pagination
} from 'react-native-snap-carousel'

import {
    Background
} from '@components/ComponentsList'
import Question from '@components/Question'
import Header from '@components/Header'

import images from '@config/images'
import storage from '@utils/storage'
import COLORS from '@config/colors'//
import TYPOGRAPHY from '@config/typography'//
import CONSTANTS from '@config/constants' //

class SimpleQuestionsScreen extends Component{
    _didFocus;
    _willBlur;

    constructor(props){
        super(props);

        this.state={
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
        const { info, carIndx } = this.state;
        return(
            <Pagination
                dotsLength={info.length}
                activeDotIndex={carIndx}
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
            val.push({
                time: {
                    day: date.getDay(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    hour: date.getHours(),
                    minute: date.getMinutes()
                },
                startTime: this.state.startTime,
                name: this.state.name,
                done: this._count(this.state.questions, x=>x.correct),
                total: this.state.info.length,
                questions: this.state.questions
            });

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

    componentWillMount(){
        this.setState({questions: this._defineQuestions(this.state.info)});
    }
    componentDidMount(){
        this._willBlur = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this._backPress)
        );
        this.setState({startTime: new Date()});
    }
    componentWillUnmount() {
        this._didFocus && this._didFocus.remove();
        this._willBlur && this._willBlur.remove();
    }

    render(){
        return(
            <Background>
                <Header logged={this.props.logged}
                    leftPress={this._backPress}
                    leftComponent={
                        <Icon
                        style={{
                          fontSize: 40,
                          color: COLORS.lightText
                        }} name="arrow-left" onPress={this.props.leftPress}/>
                    }
                    rightComponent={
                        <Icon 
                            size={40}
                            color={COLORS.lightText}
                            name="check-circle"
                        />
                    }
                    rightPress={() => Alert.alert('Alerta!', `Uma vez enviado não terá como voltar atrás, deseja mesmo enviar?`, [
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
                    )}
                />
                {this.state.debug?(<Text style={{backgroundColor: COLORS.blueBackground, color: '#fff', textAlign: 'center', justifyContent: 'center'}}>Certas: {this._count(this.state.questions, x=>x.correct)}</Text>):null}
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
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={Dimensions.get('screen').width}
                    layout='default'
                    onSnapToItem={(index) => this.setState({carIndx: index})}
                />
            </Background>
        );
    }
}

let Test = styled.View`
    align-content: center;
`;




export default SimpleQuestionsScreen;