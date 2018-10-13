import React, { Component } from "react";
import { View, ScrollView, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import styled from 'styled-components';
import IconSet from '@components/core/IconSet'

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

import api from '@utils/api'

export default (MenusScreen = (props) => 
      <Background>
        <Header
          leftPress={() => props.navigation.goBack()}
          leftComponent={IconSet.back}
          rightComponent={IconSet.history}
          rightPress={() => props.navigation.navigate('HistoryScreen')}
        />
        <ThemesBox navigation={props.navigation}/>
      </Background>
);

class ThemesBox extends Component{
  constructor(props){
    super(props);

    this.state = {
      data: api.themes()
    }
  }
  _updateState = () => {
    this.state.data.forEach((el) => {
      storage.getStoreItem('done' + el._id, (key, val) => {
        let count = 0;
        val = JSON.parse(val);
        for(let key in val){
          if(val[key])count++;
        }
        this.setState({[el.name]: count});
      })
    })
  }
  _onPress = (item) => 
    this.props.navigation.navigate('SelectionScreen',{
      id: item._id,
      onReturn: this._updateState
    });

  componentWillMount(){
    this._updateState();
  }

  render(){
    return(
      <ScrollView>
          <FlatList
            style={{marginBottom: 15}}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Theme 
                center={(item.name==="...Em Breve")?(true):false}
                disabled={item.disabled} 
                ico={item.image} 
                onPress={() => this._onPress(item)} 
                title={item.name} 
                count={this.state[item.name] || 0}
                length={item.length}
              />
            )}
          />
        </ScrollView>
    );
  }


}

const Theme = (props) => (
  <ListItem style={(props.disabled)?({opacity: 0.8}):null} onPress={(!props.disabled)?props.onPress:(() => null)}>
    {(props.ico)?(<ThemeIcon source={props.ico}/>):null}
    <ThemeTitle style={(props.center)?({textAlign: 'center'}):(null)} >{props.title}</ThemeTitle>
    
    { (!props.center)?
      <Percentage  style={{color:(props.count/props.length === 1)?('#00aa00'):((props.count/props.length >= 0.4)?('#ffca35'):('#ff5500'))}}>
        {Math.floor(props.count/props.length*100) + '%'}
      </Percentage>
      :null
    }
  </ListItem>
);

let Percentage = styled.Text`
  color: ${colors.defaultText};
  font-size: 18;
  font-weight: 400;
`;