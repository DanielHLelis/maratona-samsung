import React, { Component } from 'react';
import { StyledSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TYPOGRAPHY from '@config/typography';
import COLORS from '@config/colors';

export default (Button = props => {
  return (
    <StyledTouchableOpacity onPress={props.onPress} {...props}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <StyledText {...props}>{props.children}</StyledText>
      )}
    </StyledTouchableOpacity>
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
`;

const StyledText = styled.Text`
  font-weight: ${props => props.fontWeight};
  text-align: ${props => props.textAlign};
  color: ${props => props.textColor};
  ${props => props.typography};
`;

Button.defaultProps = {
  width: '100%',
  height: '50',
  backgroundColor: COLORS.grayBackground,
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
  bottom: 0
};

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  typography: PropTypes.array,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginRight: PropTypes.number,
  marginLeft: PropTypes.number,
  position: PropTypes.string,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number
};
