import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

/* Screen imports */
import AppIntroScreen from '@screens/AppIntroScreen';
import MenusScreen from '@screens/MenusScreen';

/* Config imports */
import COLORS from '@config/colors';

const StackIntroRoute = {
    AppIntro: { screen: AppIntroScreen },
    Main: { screen: MenusScreen }
};

export default StackIntroRoute;