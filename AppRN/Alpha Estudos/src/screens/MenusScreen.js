import React from "react";
import { View, ScrollView, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import styled from 'styled-components';


import constants from "@config/constants";
import images from "@config/images";
import colors from "@config/colors";

import StyleMain from "@styles/StyleMain";
import Header from "@components/Header";
import TYPOGRAPHY from "@config/typography";

let listaTop = [
  {
    id: "1",
    name: "Cadeias Alimentares",
    image: images.LOGO,
    done: 0.5
  },
  { id: "2", name: "Tectonismo", image: images.LOGO, done: 0.5 },
  { id: "3", name: "Geobiologia", image: images.LOGO, done: 0.324 },
  { id: "4", name: "Lorem Ipsum", image: images.LOGO, done: 1},
  { id: "5", name: "Lorem Ipsum", image: images.LOGO, done: 1},
  { id: "6", name: "Lorem Ipsum", image: images.LOGO, done: 1},
  { id: "7", name: "Lorem Ipsum", image: images.LOGO, done: 1},
  { id: "8", name: "Lorem Ipsum", image: images.LOGO, done: 1},
  { id: "9", name: "Lorem Ipsum", image: images.LOGO, done: 1},
  { id: "10", name: "Lorem Ipsum", image: images.LOGO, done: 1, next: {name: 'Oi'}}
];

export default class MenusScreen extends React.Component {

  render() {
    return (
      <StyledView>
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
              <ListItem onPress={() => this.props.navigation.navigate('AppIntro')}>
                <ThemeIcon source={item.image} />
                <ThemeTitle>{item.name}</ThemeTitle>
                <Percentage>{Math.floor(item.done*100) +'%'}</Percentage>
              </ListItem>
            )}
          />
        </ScrollView>
        
      </StyledView>
    );
  }
}

let StyledView = styled.View`
  background-color: ${colors.background};
  height: ${Dimensions.get('screen').height};
`;

let ListItem = styled.TouchableOpacity`
  height: 90;
  border-bottom-width: 1;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

let ThemeIcon = styled.Image`
  margin-left: 10;
  margin-right: 10;
  height: 75;
  width: 75;
  border-radius: 50;
`;
let ThemeTitle = styled.Text`
  color: ${colors.defaultText};
  font-size: 18;
  font-weight: 400;
  flex-grow: 1;
  text-align: left;
`;
let Percentage = styled.Text`
  color: ${colors.defaultText};
  font-size: 18;
  font-weight: 400;
  margin-right: 10;
`;