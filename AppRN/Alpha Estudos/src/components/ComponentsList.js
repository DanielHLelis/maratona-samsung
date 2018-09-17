import React, { Component } from 'react'
import {
    Dimensions,
    TouchableOpacity,
    View
} from 'react-native'
import styled from 'styled-components'

import constants from "@config/constants";
import images from "@config/images";
import colors from "@config/colors";

import TYPOGRAPHY from "@config/typography";

  const ItemHeight = 90;

export let ListItem = styled.TouchableOpacity`
  height: ${ItemHeight};
  border-bottom-width: 1;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export let Background = styled.View`
  background-color: ${colors.background};
  height: ${Dimensions.get('screen').height};
  flex: 1;
`;

export let ThemeIcon = styled.Image`
  margin-left: 10;
  margin-right: 10;
  height: 75;
  width: 75;
  border-radius: 50;
`;

export let ThemeTitle = styled.Text`
  color: ${colors.defaultText};
  font-size: 18;
  font-weight: 400;
  flex-grow: 1;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
`;