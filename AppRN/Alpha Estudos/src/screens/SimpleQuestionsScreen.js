import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import styled from 'styled-components'
import Carousel from 'react-native-snap-carousel'

import {
    Background
} from '@components/ComponentsList'
import Question from '@components/Question'
import Header from '@components/Header'

import images from '@config/images'
import COLORS from '@config/colors'//
import TYPOGRAPHY from '@config/typography'//
import CONSTANTS from '@config/constants' //

class SimpleQuestionsScreen extends Component{
    constructor(props){
        super(props);

        this.state={
            questions: {},
            data: props.navigation.getParam('data', 'Error'),
            info: props.navigation.getParam('info', 'Error'),
            origIndex: props.navigation.getParam('index', 0)
        }
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

    componentWillMount(){
        this.setState({questions: this._defineQuestions(this.state.info)});
    }

    render(){
        return(
            <Background>
                <Header logged={this.props.logged}
                    leftPress={() => Alert.alert('Cuidado!', 'Se você sair perderá seu progresso atual, deseja mesmo sair?', [
                        {
                            text: 'Sair',
                            onPress: () => {this.props.navigation.goBack()}
                        },
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                    }],
                    {cancelable: true}
                    )}
                    leftImage={images.SETA}
                    rightImage={images.Cato}
                    rightPress={() => Alert.alert('Alerta!', `Uma vez enviado não terá como voltar atrás, deseja mesmo enviar? #TurnOnDebug`, [
                        {
                            text: 'Enviar',
                            onPress: () => this.setState({debug: true})
                        },
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                    }],
                    {cancelable: true}
                    )}
                />
                {this.state.debug?(<Text style={{backgroundColor: COLORS.blueBackground, color: '#fff', textAlign: 'center', justifyContent: 'center'}}>Certas: {this._count(this.state.questions, x=>x.correct)}</Text>):null}
                
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
                    layout='tinder'
                />
            </Background>
        );
    }
}

let Test = styled.View`
    align-content: center;
`;




export default SimpleQuestionsScreen;