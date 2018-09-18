import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components'

import COLORS from '@config/colors'
import TYPOGRAPHY from '@config/typography'
import constants from '@config/constants'

const containerWidth = Dimensions.get('screen').width * 0.8;

export default class QuitAlert extends Component{
    constructor(){
        super();

        this.state={
            active: false
        };
    }

    componentWillMount(){
        this.setState({active: this.props.active});
        this.props.options.forEach((item => {
            if(item.func === null)item.func = () => this.setState({active: false});
        }));
    }

    render(){
        this.props.options[0].first = true;
        return(this.state.active)?(
        <AlertContainer {...this.props}>
            <Title {...this.props}>{this.props.title}</Title>
            <AlertText {...this.props}>{this.props.alert}</AlertText>
            <ButtonsBox>
                {this.props.options.map((item) => <Clickable style={(item.first)?(null):({
                    borderLeftWidth: 1
                })} onPress={item.func} key={item.label}><Option {...this.props} key={item.label}>{item.label}</Option></Clickable>)}
            </ButtonsBox>
        </AlertContainer>
        ):(null);
    }
};

let AlertContainer = styled.View`
    background-color: ${COLORS.background};
    height: ${Dimensions.get('screen').width * 0.6};
    width: ${containerWidth};
    border-radius: 15;
    padding-top: 10;
    padding-right: 10;
    padding-bottom: 10;
    padding-left: 10;
    position: absolute;
    z-index: 5;
    overflow: hidden;
`;

let Title = styled.Text`
    color: ${props => props.titleColor};
    font-size: ${props => props.titleSize};
    font-family: ${props => props.titleFont};
    font-weight: ${props => props.titleWeight};
    text-align: center;
`;

let AlertText = styled.Text`
    text-align: center;
    width: 100%;
    color: ${props => props.contentColor};
    font-size: ${props => props.contentSize};
    font-family: ${props => props.contentFont};
    font-weight: ${props => props.contentWeight};
`;

let ButtonsBox = styled.View`
    height: ${Dimensions.get('screen').width * 0.13};
    border-top-width: 1;
    border-top-color: rgba(0,0,0,0.3);
    width: ${containerWidth};
    position: absolute;
    bottom: 0;
    left: 0;
    flex-direction: row;
`;

let Option = styled.Text`
    flex: 1;
    text-align: center;
     color: ${props => props.optionColor};
    font-size: ${props => props.optionSize};
    font-family: ${props => props.optionFont};
    font-weight: ${props => props.optionWeight};
`;

let Clickable = styled.TouchableOpacity`
    flex: 1;
    border-left-color: rgba(0,0,0,0.3);
`;

QuitAlert.defaultProps = {
    titleColor: 'red',
    titleSize: 28,
    titleFont: 'Nunito-Regular',
    titleWeight: '100',
    contentColor: 'red',
    contentSize: 18,
    contentFont: 'Nunito-Thin',
    contentWeight: '100',
    optionColor: COLORS.blueBackground,
    optionSize: 28,
    optionWeight: '300',
    optionFont: 'Nunito-Regular',
    options: [{
        label: 'OK',
        func: null,
    }],
    active: false,
    title: 'Alerta!',
    alert: 'Algo era para estar aqui...'
}