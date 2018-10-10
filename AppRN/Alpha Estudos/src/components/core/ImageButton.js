import React from 'react';
import { 
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator
 } from 'react-native';

import styled from 'styled-components';

import COLORS from '@config/colors';
import TYPOGRAPHY from '@config/typography';

 export default (ImageButton = props => {
    return(
        <View>
                <StyledTouchableOpacity onPress={props.onPress} {...props}>
                    {
                        (props.isLoading)?
                        (<ActivityIndicator size='small' color={COLORS.lightText}/>):
                        (<StyledImage source={props.source} {...props} ></StyledImage>)
                    }
                </StyledTouchableOpacity>
        </View>
    );
 });



 const StyledTouchableOpacity = styled.TouchableOpacity`
    width: ${props => props.width};
    height: ${props => props.height};
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
    overflow: ${props => props.overflow};
`;

const StyledImage = styled.Image`
    height: ${props => props.imageHeight};
    width: ${props => props.imageWidth};
    opacity: ${props => props.opacity};
`;

ImageButton.defaultProps = {
    imageWidth: '50',
    imageHeight: '50',
    width: '100%',
    height: '72',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    textColor: COLORS.white,
    fontWeight: '200',
    fontSize: 10,
    textAlign: 'center',
    borderRadius: 6,
    borderWidth: 0,
    borderColor: COLORS.defaultText,
    typography: TYPOGRAPHY.regularText,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
    overflow: 'hidden',
  };
