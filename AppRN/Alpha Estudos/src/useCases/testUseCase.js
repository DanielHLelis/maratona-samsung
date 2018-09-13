/* Config */
import CONSTANTS from '../config/constants';
import STRINGS from '../config/strings';

/* Actions */
import testActions from '../actions/testActions';

const testRedux = (permissions, successCallback) => {
  return dispatch => {
    dispatch(testActions.TEST());

    setTimeout(() => {
      if (true) {
        dispatch(testActions.TEST_SUCCESS());
      } else {
        dispatch(testActions.TEST_FAILURE('[ERROR - UseCase]: ResponseJson - else'));
      }
    }, 2000);
  };
};

module.exports = {
  testRedux
};
