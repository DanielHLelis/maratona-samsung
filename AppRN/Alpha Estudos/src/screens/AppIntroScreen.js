import React, { Component } from 'react'
import { Text, View, Image, Modal, Animated, ActivityIndicator } from 'react-native'
import styled from 'styled-components'

import COLORS from '@config/colors'
import IMAGES from '@config/images'
import TYPOGRAPHY from '@config/typography'

import Button from '@components/core/Button'

export default class AppIntroScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      BG: IMAGES.BG
    }
  }

  loaded = (loaded = true) => {
    setTimeout(
      () => this.setState({loaded}),
      500
    )
  }

  render() {
    return (
      <View>
        <Intro {...this.props} BG={this.state.BG} loaded={this.loaded} />
        <LoadingScreen visible={!this.state.loaded} />
      </View>
    );
  }
};

const Intro = props => (
  <Background>
    <BackgroundImage onLoadStart={() => props.loaded(false)} onLoadEnd={() => props.loaded()} source={props.BG} blurRadius={4} />

    <StyledText>
      Alpha{'\n'}Estudos
    </StyledText>

    <View style={{ width: '80%' }}>
      <Button typography={TYPOGRAPHY.mediumText} marginTop={30} onPress={() => props.navigation.navigate('MenusScreen')}>
        Entrar
      </Button>
    </View>
  </Background>
)

class LoadingScreen extends Component{

  constructor(props){
    super(props);

    this.state = {
      alpha: new Animated.Value(1),
      opacity: new Animated.Value(1),
      visible: true,
      none: false
    }
  }

  componentDidUpdate(){
    if(this.props.visible === false && this.state.visible){
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 500
        }
      ).start(() => this.setState({visible: false}))
    }
  }

  fadeIn = (who, cb = () => null, dur = 650) => {
    Animated.timing(
      who,
      {
        toValue: 1,
        duration: dur  
      }
    ).start(cb);
  }
  fadeOut = (who, cb = () => null, dur = 650, limit = 0.6) => {
    Animated.timing(
      who,
      {
        toValue: limit,
        duration: dur  
      }
    ).start(cb);
  }
  pulse = (who) => {
    if(this.state.visible)
      this.fadeOut(who, ()=>this.fadeIn(who, () => this.pulse(who)));
  }
  componentDidMount(){
    this.pulse(this.state.alpha)
  }

  render(){
    let AnimatedText = Animated.createAnimatedComponent(StyledText);
    return(
    <Animated.View 
      style={[this.state.visible?{position: "absolute", height: "100%", width: "100%"}:{display: "none"}, {opacity: this.state.opacity}]} 
    >
      <Background>
        <AnimatedText style={{opacity: this.state.alpha}} >
          Alpha{'\n'}Estudos
        </AnimatedText>
        <ActivityIndicator size="large" color="#fff" />
      </Background>         
    </Animated.View>
    );
  }
}

let StyledText = styled.Text`
  color: ${COLORS.lightText};
  font-size: 40;
  font-family: Nunito-Medium;
`;

let Background = styled.View`
  background-color: ${COLORS.blueBackground};
  height: 100%;
  align-items: center;
  justify-content: center;
`;

let BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;