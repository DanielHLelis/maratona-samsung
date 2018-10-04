import React from 'react';
import { Platform, StatusBar, Alert } from 'react-native';
import styled from 'styled-components';

/* Navigation */
import { createStackNavigator, NavigationActions } from 'react-navigation';

/* Componentes - Core - Imports */
import Label from '@components/core/Label';
import Button from '@components/core/Button';
import LeakedButton from '@components/core/LeakedButton';

/* Config - Imports */
import SPACING from '@config/spacing';
import StackIntroRoute from '@config/routes';
import COLORS from '@config/colors';

export default class App extends React.Component {
  render() {
    const MainNavigation = createStackNavigator(StackIntroRoute, {
      initialRouteName: 'AppIntro',
      mode: Platform.OS === 'ios' ? 'modal' : 'card',
      headerMode: 'none'
    });
    return (
        <ViewStyled>
          <StatusBar translucent barStyle='light-content' backgroundColor={'#00000022'}/>
          <MainNavigation/>
        </ViewStyled>
    );
  }
}

const ViewStyled = styled.View`
  flex: 1;
  justify-content: center;
`;
