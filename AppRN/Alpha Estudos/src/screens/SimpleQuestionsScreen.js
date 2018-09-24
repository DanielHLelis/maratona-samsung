import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    Alert
} from 'react-native';
import {

} from 'react-navigation'
import styled from 'styled-components'

import {
    Background
} from '@components/ComponentsList'
import images from '@config/images'
import TYPOGRAPHY from '@config/typography'

import Question from '@components/Question'

import Header from '@components/Header'
import CONSTANTS from '@config/constants'

import Carousel from 'react-native-snap-carousel'

class SimpleQuestionsScreen extends Component{
    constructor(){
        super();

        this.state={
            questions:{}
        }
    }

    render(){
        let data = this.props.navigation.getParam('data', 'Error');
        let info = this.props.navigation.getParam('info', 'Error');
        let origIndex = this.props.navigation.getParam('index', 0);
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
                    rightPress={() => console.log('Cato')}
                />

                
                <Question title={info[0].title} enunciado={info[0].text} answers={info[0].options} imageList={info[0].images} correct={info[0].correct} isCorrect={(val) => this.setState({[info[0].title]: val})}/>
                {/*Fix examples, may be automatizated*/}
                

                {(this.state[info[0].title])?(alert('Você Acertou')):(null)}

            </Background>
        );
    }
}

let Test = styled.View`
    align-content: center;
`;




export default SimpleQuestionsScreen;