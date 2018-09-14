import actions from './actions';

function TEST() {
  return {
    type: actions.TEST
  };
}

function TEST_SUCCESS() {
  return {
    type: actions.TEST_SUCCESS
  };
}

function TEST_FAILURE() {
  return {
    type: actions.TEST_FAILURE
  };
}

export default (cameraActions = {
  TEST,
  TEST_SUCCESS,
  TEST_FAILURE
});
