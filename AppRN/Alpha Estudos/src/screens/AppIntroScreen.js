import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import styled from 'styled-components';

import COLORS from '@config/colors';
import constants from '@config/constants';
import IMAGES from '@config/images';

/* Componentes - Core - Imports */
import Label from '@components/core/Label';
import Button from '@components/core/Button';

import StyleMain from '@styles/StyleMain';

export default class AppIntroScreen extends React.Component {
  render() {
    return (
      <Background>
        {/* <Logo source= {IMAGES.LOGO} /> */}
        <StyledText>
          Alpha{'\n'}Estudos
        </StyledText>
        <View style={{ width: '80%' }}>
          <Button marginTop={30} onPress={() => this.props.navigation.navigate('Main')}>
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
  background-color: #00d8ff;
  height: ${Dimensions.get('screen').height};
  align-items: center;
  justify-content: center;
`;

// let Logo = styled.Image`
//   width: ${Dimensions.get('screen').width * 0.8};
//   height: ${Dimensions.get('screen').width * 0.8};
//   border-radius: 50;
// `;