import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet
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
                duration: 300
            }
        ).start();
        Animated.timing(
            this.state.appearAnim.opacity,{
                toValue: 0,
                duration: 300
            }
        ).start(cb)
    }


    render(){
        return(
            <Modal transparent {...this.props}>
                <Animated.View style={[
                    {
                        opacity: this.state.appearAnim.opacity
                    },
                    styles.BG
                ]}>
                    <Animated.View style={[
                        {
                        transform: [{translateY: this.state.appearAnim.pos}],
                        opacity: this.state.appearAnim.opacity,
                        },
                        styles.Box
                    ]} >
                            <Content>
                                {this.props.content?this.props.content:'Aparentemente ainda não foi adicionada uma solução para esse problema!'}
                            </Content>

                            <Button onPress={() => this.leave(this.props.onRequestClose)}>
                                <Ok>
                                    Ok
                                </Ok>    
                            </Button>                
                    </Animated.View>
                </Animated.View>
            </Modal>              
        )
    }
}

const styles = StyleSheet.create({
    Box: {
        backgroundColor: '#2b2b2b',
        borderWidth: 1,
        borderColor: '#4b4b4b',
        borderRadius: 20,
        width: '90%',
        minHeight: '10%',
        flexDirection: 'column'
    },
    BG: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#0008'
    }
});

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
    line-height: 24;
    color: ${colors.lightText};
    text-align: center;
    padding-horizontal: 20;
    padding-vertical: 20;
`;