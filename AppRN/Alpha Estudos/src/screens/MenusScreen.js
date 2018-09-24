import React from "react";
import { View, ScrollView, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import styled from 'styled-components';

import {
  Background,
  ListItem,
  ThemeIcon,
  ThemeTitle
} from '@components/ComponentsList';

import constants from "@config/constants";
import images from "@config/images";
import colors from "@config/colors";

import Header from "@components/Header";
import TYPOGRAPHY from "@config/typography";

export default class MenusScreen extends React.Component {

  render() {

    let data = this.props.navigation.getParam('data', 'Error');

    return (
      <Background>
        <Header
          leftPress={() => this.props.navigation.goBack()}
          leftImage={images.SETA}
          rightImage={images.OPTIONS}
        />
        <ScrollView>
          <FlatList
            style={{marginBottom: 15}}
            data={data.themes}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <ListItem onPress={() => this.props.navigation.navigate('SelectionScreen', {data: data, info: item, index: index})}>
                <ThemeIcon source={item.image} />
                <ThemeTitle>{item.name}</ThemeTitle>
                <Percentage>{Math.floor(item.done/item.matters.length*100) +'%'}</Percentage>
              </ListItem>
            )}
          />
        </ScrollView>
      </Background>
    );
  }
}

let Percentage = styled.Text`
  color: ${colors.defaultText};
  font-size: 18;
  font-weight: 400;
  margin-right: 10;
`;