import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Animated,
    PanResponder
} from 'react-native'

import colors from '@config/colors'
import TYPOGRAPHY from '@config/typography'

import styled from 'styled-components'

export default class Solve extends Component{

    constructor(props){
        super(props);

        this.state = {
            appearAnim: {
                pos: new Animated.Value(-120),
                opacity: new Animated.Value(0)
            }
        }

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, et) => true,
            onStartShouldSetPanResponderCapture: (e, et) => true,
            onMoveShouldSetPanResponder: (e, et) => true,
            onMoveShouldSetPanResponderCapture: (e, et) => true,

            onPanResponderMove: (e, et) => {
                let abs = Math.abs(et.dx);
                Animated.timing(
                    this.state.appearAnim.pos,
                    {
                        toValue: et.dx,
                        duration: 0
                    }
                ).start();
                Animated.timing(
                    this.state.appearAnim.opacity,
                    {
                        toValue: (abs > 120) ? 0 : Math.abs(abs - 120) / 120,
                        duration: 0
                    }
                ).start();
            },

            onPanResponderRelease: (e, et) => {
                if(et.dx < -80)
                    this.quit();
                else if(et.dx > 80)
                    this.quitReverse()
                else {
                    Animated.timing(
                        this.state.appearAnim.pos,
                        {
                            toValue: 0,
                            duration: 100
                        }
                    ).start();
                    Animated.timing(
                        this.state.appearAnim.opacity,
                        {
                            toValue: 1,
                            duration: 100
                        }
                    ).start();
                }
            }
        })

    }

    componentDidUpdate(){
        if(this.props.visible){
            Animated.timing(
                this.state.appearAnim.pos,{
                    toValue: 0,
                    duration: 300
                }
            ).start();
            Animated.timing(
                this.state.appearAnim.opacity,{
                    toValue: 1,
                    duration: 300
                }
            ).start()
        }
    }

    leave = (cb = () => null) => {
        Animated.timing(
            this.state.appearAnim.pos,
            {
                toValue: -120,
                duration: 200
            }
        ).start();
        Animated.timing(
            this.state.appearAnim.opacity,{
                toValue: 0,
                duration: 200
            }
        ).start(cb)
    }

    leaveReverse = (cb = () => null) => {
        Animated.timing(
            this.state.appearAnim.pos,
            {
                toValue: 120,
                duration: 200
            }
        ).start();
        Animated.timing(
            this.state.appearAnim.opacity,{
                toValue: 0,
                duration: 200
            }
        ).start(cb)
    }

    quitReverse = () => this.leaveReverse(this.props.onRequestClose)
    quit = () => this.leave(this.props.onRequestClose)

    AnimatedBox = Animated.createAnimatedComponent(Box)
    AHnimated = Animated.createAnimatedComponent(AH)

    render(){
        return(
            <Modal transparent {...this.props}>
                <Center>
                    <this.AHnimated activeOpacity={1} style={{opacity: this.state.appearAnim.opacity}} onPress={this.quit} />
                    <this.AnimatedBox {...this._panResponder.panHandlers} style={{ transform: [{translateX: this.state.appearAnim.pos}], opacity: this.state.appearAnim.opacity }} >
                        <Title>
                            Aceita uma ajudinha?
                        </Title>

                        <Content>
                            {this.props.content?this.props.content:'Aparentemente ainda não foi adicionada uma solução para esse problema!'}
                        </Content>

                    </this.AnimatedBox>
                </Center>
            </Modal>              
        )
    }
}


const AH = styled.TouchableOpacity`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0008;
`;

const Title = styled.Text`
    color: ${colors.blueBackground};
    ${TYPOGRAPHY.largeTextBold}
    text-align: center;
    padding-vertical: 15;
    padding-horizontal: 10;
`;

const Center = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const Box = styled.View`
    background-color: #fff;
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
    border-radius: 10;
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
    line-height: 30;
    color: ${colors.defaultText};
    text-align: center;
    padding-horizontal: 10;
    padding-vertical: 10;
`;