import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

/* Screen imports */
import AppIntroScreen from '@screens/AppIntroScreen';
import MenusScreen from '@screens/MenusScreen';
import SelectionScreen from '@screens/SelectionScreen';
import SimpleQuestionsScreen from '@screens/SimpleQuestionsScreen'

/* Config imports */
import COLORS from '@config/colors';

const StackIntroRoute = {
    AppIntro: { screen: AppIntroScreen },
    MenusScreen: { screen: MenusScreen },
    SelectionScreen: { screen: SelectionScreen },
    SimpleQuestionsScreen: {screen: SimpleQuestionsScreen}
};

export default StackIntroRoute;