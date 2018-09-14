import React, { Component } from 'react';
import { StyledSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TYPOGRAPHY from '@config/typography';
import COLORS from '@config/colors';

// TODO: Still needs to allow the usage of a different set of font-family
const Label = props => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
};

const StyledLabel = styled.Text`
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  font-weight: ${props => props.fontWeight};
  text-align: ${props => props.textAlign};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  border-bottom-width: ${props => props.borderBottomWidth};
  border-bottom-color: ${props => props.borderBottomColor};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  min-height: ${props => props.minHeight};
  ${props => props.typography};
`;

Label.defaultProps = {
  width: 'auto',
  height: 'auto',
  color: COLORS.defaultText,
  backgroundColor: 'transparent',
  fontWeight: '200',
  textAlign: 'left',
  typography: TYPOGRAPHY.regularText,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  borderBottomWidth: 0,
  borderBottomColor: 'transparent',
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  minHeight: 0
};

Label.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  typography: PropTypes.array,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderBottomColor: PropTypes.string,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  minHeight: PropTypes.number
};

export default Label;
