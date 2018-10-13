import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

/* Screen imports */
import AppIntroScreen from '@screens/AppIntroScreen';
import MenusScreen from '@screens/MenusScreen';
import SelectionScreen from '@screens/SelectionScreen';
import SimpleQuestionsScreen from '@screens/SimpleQuestionsScreen'
import HistoryScreen from '@screens/HistoryScreen'
import RevisionScreen from '@screens/RevisionScreen'

/* Config imports */
import COLORS from '@config/colors';

const StackIntroRoute = {
    AppIntro: { screen: AppIntroScreen },
    MenusScreen: { screen: MenusScreen },
    SelectionScreen: { screen: SelectionScreen },
    SimpleQuestionsScreen: { screen: SimpleQuestionsScreen, navigationOptions:{ gesturesEnabled: false } },
    HistoryScreen: { screen: HistoryScreen },
    RevisionScreen: { screen: RevisionScreen }
};

export default StackIntroRoute;