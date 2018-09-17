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

let listaTop = [
  {
    id: "1",
    name: "Cadeias Alimentares",
    image: images.LOGO,
    done: 0.5, next: { list: [{name: 'Você veio do 1', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '1', done: true}]}
  },
  { id: "2", name: "Tectonismo", image: images.LOGO, done: 0.5, next: { list: [{name: 'Você veio do 2', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '2', done: true}]} },
  { id: "3", name: "Origem do Universo", image: images.LOGO, done: 0.324, next: { list: [{name: 'Você veio do 3', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '3', done: true}]} },
  { id: "4", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 4', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '4', done: true}]}},
  { id: "5", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 5', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '5', done: true}]}},
  { id: "6", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 6', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '6', done: true}]}},
  { id: "7", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 7', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '7', done: true}]}},
  { id: "8", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 8', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '8', done: true}]}},
  { id: "9", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 9', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '9', done: true}]}},
  { id: "10", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: { list: [{name: 'Você veio do 10', difficulty: 'Quem tá Lendo é Viado', ico: images.LOGO, id: '10', done: true}]}}
];
      

export default class MenusScreen extends React.Component {

  render() {
    return (
      <Background>
        <Header
          leftPress={() => this.props.navigation.navigate("AppIntro")}
          leftImage={images.SETA}
          rightImage={images.OPTIONS}
        />
        <ScrollView>
          <FlatList
            style={{marginBottom: 15}}
            data={listaTop}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem onPress={() => this.props.navigation.navigate('SelectionScreen', item.next)}>
                <ThemeIcon source={item.image} />
                <ThemeTitle>{item.name}</ThemeTitle>
                <Percentage>{Math.floor(item.done*100) +'%'}</Percentage>
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