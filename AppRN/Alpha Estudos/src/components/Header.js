import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import PropTypes from 'prop-types'
import styled from "styled-components"

import ImageButton from "@components/core/ImageButton"
import LogoText from "@components/core/AppLogoText"

import constants from "@config/constants"
import images from "@config/images"

import COLORS from "@config/colors"
import TYPOGRAPHY from "@config/typography"

class Header extends Component {
  render() {
    return (
      <ViewStyled>
        <ImageButton
          imageHeight={40}
          imageWidth={32}
          source={this.props.leftImage}
          onPress={this.props.leftPress}
        />

        
          {
            (this.props.logged)?
            (
              <UserView>
                <ImageButton
                  borderRadius={50}
                  imageHeight={54}
                  imageWidth={54}
                  marginRight={4}
                  source={this.props.avatar}
                />
                <UserInfo>
                  <NickName>{this.props.nick}</NickName>
                  <Level>Nível: {this.props.level}</Level>
                </UserInfo>
              </UserView>
            ):(
              <UserView>
                {/* <Logo source={images.LOGO}/> */}
                <LogoText marginLeft={5}/>
              </UserView>
            )
          }

        <ImageButton
          imageHeight={40}
          imageWidth={40}
          source={this.props.rightImage}
          onPress={this.props.rightPress}
        />
      </ViewStyled>
    );
  }
}

Header.defaultProps = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
};

Header.propTypes = {
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  rightPress: PropTypes.func,
  leftPress: PropTypes.func
};

let Logo = styled.Image`
  height: 54;
  width: 54;
  border-radius: 27;
`;

let ViewStyled = styled.View`
  background-color: ${COLORS.blueBackground};
  height: 72;
  padding-right: 10;
  padding-left: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

let TextStyled = styled.Text`
  font-size: ${constants.FONT_SIZE.medium};
  color: ${COLORS.defaultText};
`;

let UserView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 72;
`;

let UserIco = styled.Image`
  border-radius: 50;
  height: 54;
  width: 54;
  margin-right: 4;
`;

let UserInfo = styled.View`
  justify-content: flex-start;
  align-content: center;
`;

let NickName = styled.Text`
  font-size: 18;
  color: ${COLORS.lightText};
`;

let Level = styled.Text`
  font-size: 12;
  color: ${COLORS.lightText};
`;

export default Header;
