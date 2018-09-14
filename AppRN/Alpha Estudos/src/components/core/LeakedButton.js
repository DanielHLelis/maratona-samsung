import React from 'react';
import PropTypes from 'prop-types';
import COLORS from '@config/colors';

import Button from '@components/core/Button';

class LeakedButton extends React.Component {
  render() {
    return (
      <Button backgroundColor="transparent" borderWidth={1} borderColor={COLORS.lightText} {...this.props}>
        {this.props.children}
      </Button>
    );
  }
}

LeakedButton.defaultProps = {
  width: '100%',
  height: '50',
  textColor: COLORS.defaultText,
  borderColor: COLORS.lightText,
  marginTop: 0,
  onClick: () => {}
};

LeakedButton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  onClick: PropTypes.func
};

export default LeakedButton;
