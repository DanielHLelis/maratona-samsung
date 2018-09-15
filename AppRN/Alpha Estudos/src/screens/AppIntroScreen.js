import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import constants from '@config/constants';
import IMAGES from '@config/images';

/* Componentes - Core - Imports */
import Label from '@components/core/Label';
import Button from '@components/core/Button';

import StyleMain from '@styles/StyleMain';

export default class AppIntroScreen extends React.Component {
  render() {
    return (
      <View style={StyleMain.backgroundView}>
        <Image source= {IMAGES.LOGO} style= {StyleMain.startLogo} />
        <View style={{ width: '80%' }}>
          <Button marginTop={30} onPress={() => this.props.navigation.navigate('Main')}>
            Entrar
          </Button>
        </View>
      </View>
    );
  }
};

