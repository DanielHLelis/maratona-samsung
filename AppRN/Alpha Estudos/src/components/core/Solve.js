import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import colors from '@config/colors'
import TYPOGRAPHY from '@config/typography'

import styled from 'styled-components'

export default (Solve = props => (
    <Modal transparent {...props}>
        <BG>
            <Box>
                <Content>
                    {props.content?props.content:'Aparentemente ainda não foi adicionada uma solução para esse problema!'}
                </Content>

                <Button onPress={props.onRequestClose}>
                    <Ok>
                        Ok
                    </Ok>    
                </Button>                
            </Box>
        </BG>
    </Modal>       
))

const BG = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: transparent;
    flex: 1;
    background-color: #0008;
`;

const Box = styled.View`
    background-color: #fff;
    border-width: 1;
    border-color: #4b4b4b;
    border-radius: 20;
    width: 90%;
    min-height: 10%;
    flex-direction: column;
`;
const Button = styled.TouchableOpacity`
    margin-top: auto;
    width: 100%;
    height: 60;
    border-top-width: 1;
    border-color: #0003;
    border-radius: 20;
    border-bottom-left-radius: 20;
    border-bottom-right-radius: 20;
    align-items: center;
    justify-content: center;
`;
const Ok = styled.Text`
    ${TYPOGRAPHY.largeText};
    color: red;
    text-align: center;
`;

const Content = styled.Text`
    ${TYPOGRAPHY.mediumText};
    color: ${colors.defaultText};
    text-align: center;
    padding-horizontal: 20;
    padding-vertical: 20;
`;