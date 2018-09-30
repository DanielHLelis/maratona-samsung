import React, { Component } from "react";
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

import storage from '@utils/storage'
import Header from "@components/Header";
import TYPOGRAPHY from "@config/typography";

export default class MenusScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.props.navigation.getParam('data', 'Error')
    }
  }

  _addState(whitch){
  }

  componentWillMount(){
    this.state.data.themes.forEach((el) => {
      storage.getStoreItem('done' + el.name, (key, val) => {
        let count = 0;
        val = JSON.parse(val);
        for(let key in val){
          if(val[key])count++;
        }
        this.setState({[el.name]: count});
      })
    })
  }

  render() {
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
            data={this.state.data.themes}
            keyExtractor={(item, index) => toString(index)}
            renderItem={({ item, index }) => (
              <ListItem onPress={() => this.props.navigation.navigate('SelectionScreen', {name: item.name, info: item})}>
                <ThemeIcon source={item.image} />
                <ThemeTitle>{item.name}</ThemeTitle>
                <Percentage>{Math.floor(this.state[item.name]/item.matters.length*100) +'%'}</Percentage>
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