import React from 'react'
import { Text } from 'react-native'
import TYPOGRAPHY from '@config/typography'
import COLORS from '@config/colors'
import styled from 'styled-components'

export default (AppLogoText = props => {return <LogoText {...props}>Alpha{'\n'}Estudos</LogoText>});

let LogoText = styled.Text`
    color: ${props => props.color?props.color:COLORS.lightText};
    ${props => (props.fontFamily && props.fontSize)?(`font-family: ${props.fontFamily};\nfont-size: ${props.fontSize};`):(TYPOGRAPHY.mediumText)};
    background-color: ${props => props.backgroundColor};
    display: flex;
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    border-width: ${props => props.borderWidth};
    border-color: ${props => props.borderColor};
    border-radius: ${props => props.borderRadius};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
    position: ${props => props.position};
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    right: ${props => props.right};
    font-weight: ${props => props.fontWeight};
    text-align: ${props => props.textAlign};
    color: ${props => props.textColor};
`;

AppLogoText.defaultProps = {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    textColor: COLORS.white,
    fontWeight: '200',
    textAlign: 'left',
    borderRadius: 6,
    borderWidth: 0,
    borderColor: COLORS.defaultText,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };