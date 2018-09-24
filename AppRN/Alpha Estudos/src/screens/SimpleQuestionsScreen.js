import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    Dimensions,
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
                    rightPress={() => Alert.alert('Alerta!', `Uma vez enviado não terá como voltar atrás, deseja mesmo enviar?`, [
                        {
                            text: 'Enviar',
                            onPress: () => null
                        },
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                    }],
                    {cancelable: true}
                    )}
                />

                
                <Carousel 
                    data={info}
                    renderItem={({ item, index }) => 
                        <Question title={item.title} enunciado={item.text} answers={item.options} imageList={item.images} correct={item.correct} isCorrect={(val) => this.setState({[item.title]: val})}/>  
                    }
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={Dimensions.get('screen').width}
                    layout='tinder'
                />
                {/*Fix examples, may be automatizated*/}
                
                {info.map((item) => {(this.state[item.title])?(alert('Você Acertou')):(null)})}

            </Background>
        );
    }
}

let Test = styled.View`
    align-content: center;
`;




export default SimpleQuestionsScreen;