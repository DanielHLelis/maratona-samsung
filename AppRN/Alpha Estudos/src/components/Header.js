import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import styled from 'styled-components';

import ImageButton from '@components/core/ImageButton';

import constants from '@config/constants';
import images from '@config/images';

import COLORS from '@config/colors';
import TYPOGRAPHY from '@config/typography';

class Header extends Component {
    render() {
        return(
            <ViewStyled>
                <ImageButton imageHeight={40} imageWidth={32} source={this.props.leftImage} onPress={this.props.leftPress} />

                <UserView>
                    <ImageButton borderRadius={50} imageHeight={54} imageWidth={54} marginRight={4} source={images.LOGO}/>
                    {/* <UserIco source={images.LOGO}/> */}
                    <UserInfo>
                        <NickName>
                            Beta
                        </NickName>

                        <Level>
                            Nível: {23}
                        </Level>
                    </UserInfo>
                </UserView>

                <ImageButton imageHeight={40} imageWidth={40} source={this.props.rightImage} opPress={this.props.rightPress} />
            </ViewStyled>
        );
    }
};

let ViewStyled = styled.View`
    background-color: ${COLORS.blueBackground};
    height: 72;
    padding-right: 10;
    padding-left: 10;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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