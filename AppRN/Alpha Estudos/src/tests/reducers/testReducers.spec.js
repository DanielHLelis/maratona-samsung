import { expect } from 'chai';
import testReducer from '../../reducers/testReducer';

describe('Test Reducer', () => {
  it('Should handle DEFAULT action', () => {
    expect(testReducer(undefined, {})).to.deep.equal({
      isLoading: false,
      list: []
    });
  });

  it('Should handle TEST action', () => {
    expect(testReducer(undefined, { type: 'TEST' })).to.deep.equal({
      isLoading: true,
      list: []
    });
  });

  it('Should handle TEST_SUCCESS action', () => {
    expect(testReducer(undefined, { type: 'TEST_SUCCESS' })).to.deep.equal({
      isLoading: false,
      list: [1, 2, 3, 4, 5]
    });
  });

  it('Should handle TEST_FAILURE action', () => {
    expect(testReducer(undefined, { type: 'TEST_FAILURE' })).to.deep.equal({
      isLoading: false,
      list: []
    });
  });
});
