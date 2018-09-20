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
import CONSTANTS from '@config/constants';

class SimpleQuestionsScreen extends Component{
    constructor(){
        super();

        this.state={
            quit: false
        }
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
                    rightPress={() => console.log('Cato')}
                />

                <Question answers={CONSTANTS.answers}/>
                
            </Background>
        );
    }
}

let TestText = styled.Text`
    ${TYPOGRAPHY.largeText}
    color: red;
    align-self: center;
    text-align-vertical: center;
    text-align: center;
    flex-grow: 1;
`;
let Test = styled.View`
    align-content: center;
`;




export default SimpleQuestionsScreen;