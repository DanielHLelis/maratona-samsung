import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';

/* Navigation */
import { createStackNavigator } from 'react-navigation';

/* Componentes - Core - Imports */
import Label from '@components/core/Label';
import Button from '@components/core/Button';
import LeakedButton from '@components/core/LeakedButton';

/* Config - Imports */
import SPACING from '@config/spacing';
import StackIntroRoute from '@config/routes';


export default class App extends React.Component {
  render() {
    const MainNavigation = createStackNavigator(StackIntroRoute, {
      initialRouteName: 'AppIntro',
      mode: Platform.OS === 'ios' ? 'modal' : 'card',
      headerMode: 'none'
    });

    return (
        <ViewStyled>
          <MainNavigation/>
        </ViewStyled>
    );
  }
}

const ViewStyled = styled.View`
  flex: 1;
  justify-content: center;
`;
