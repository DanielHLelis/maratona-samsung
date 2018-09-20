import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import styled from 'styled-components'

import COLORS from '@config/colors'
import constants from '@config/constants'
import IMAGES from '@config/images'

import Button from '@components/core/Button'

export default class AppIntroScreen extends React.Component {
  render() {
    return (
      <Background>
        <Logo source={IMAGES.Cato} blurRadius={4} />
        <StyledText>
          Alpha{'\n'}Estudos
        </StyledText>

        <View style={{ width: '80%' }}>
          <Button marginTop={30} onPress={() => this.props.navigation.navigate('MenusScreen')}>
            {/* Entrar */} {this.props.navigation.getParam('name', 'Entrar')}
          </Button>
        </View>
      </Background>
    );
  }
};

let StyledText = styled.Text`
  color: ${COLORS.lightText};
  font-size: 40;
  font-family: Nunito-Medium;
`;

let Background = styled.View`
  background-color: ${COLORS.blueBackground};
  height: ${Dimensions.get('screen').height};
  align-items: center;
  justify-content: center;
`;

let Logo = styled.Image`
  width: ${Dimensions.get('screen').width};
  height: ${Dimensions.get('screen').height};
  /* border-radius: ${Dimensions.get('screen').width * 0.4}; */
  position: absolute;
`;