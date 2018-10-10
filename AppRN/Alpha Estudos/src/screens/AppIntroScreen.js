import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styled from 'styled-components'

import storage from '@utils/storage'
import COLORS from '@config/colors'
import constants from '@config/constants'
import IMAGES from '@config/images'
import TYPOGRAPHY from '@config/typography'

import Button from '@components/core/Button'

let data = require('@tests/test.json');

export default class AppIntroScreen extends Component {

  componentWillMount(){
    // storage.cleanAll();
    storage.debug();
  }

  render() {
    return (
      <Background>
        <BackgroundImage source={IMAGES.BG} blurRadius={4} />

        <StyledText>
          Alpha{'\n'}Estudos
        </StyledText>

        <View style={{ width: '80%' }}>
          <Button typography={TYPOGRAPHY.mediumText} marginTop={30} onPress={() => this.props.navigation.navigate('MenusScreen', {data: data})}>
            Entrar
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
  height: 100%;
  align-items: center;
  justify-content: center;
`;

let BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;