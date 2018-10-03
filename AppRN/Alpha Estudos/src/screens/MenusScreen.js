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

/*
  TODO:
    -Desanexar o código da lista
*/

export default class MenusScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.props.navigation.getParam('data', 'Error')
    }
  }

  _updateState = () => {
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

  componentWillMount(){
    this._updateState();
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
              <ListItem style={(item.disabled)?({opacity: 0.8}):null} onPress={(item.matters)?(() => this.props.navigation.navigate('SelectionScreen', {name: item.name, info: item, onReturn: this._updateState})):(() => null)}>
                {item.image?(<ThemeIcon source={item.image} />):null}
                <ThemeTitle style={(item.disabled)?({textAlign: 'center'}):null} >{item.name}</ThemeTitle>
                <Percentage
                style={(item.matters)?({color:(this.state[item.name]/item.matters.length === 1)?('#00aa00'):((this.state[item.name]/item.matters.length >= 0.4)?('#ffca35'):('#ff5500'))}):null}
                >
                  {(item.matters)?Math.floor(this.state[item.name]/item.matters.length*100) +'%':null}
                </Percentage>
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