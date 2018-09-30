import { AsyncStorage } from 'react-native';

const setStoreItem = async (key, value, onSuccessCallback = () => null, onFailureCallback = () => null) => {
  try {
    await AsyncStorage.setItem(key, value);
    onSuccessCallback(key, value);
  } catch (error) {
    console.error(`[AsyncStorage] Error saving on [${key}], value: ${value}. [ERROR]: ${error}`);
    onFailureCallback(key, value);
  }
};

const getStoreItem = async (key, callback = () => null) => {
  var value = undefined;
  try {
    value = await AsyncStorage.getItem(key);
    callback(key, value);
  } catch (error) {
    console.error(`[AsyncStorage] Error retrieving value from [${key}]. Error: ${error}`);
  }

  return value;
};

const resetStoreItem = async (key, callback = () => null) => {
  var value = undefined;
  try {
    await AsyncStorage.removeItem(key);
    value = await AsyncStorage.getItem(key);
    callback(key, value);
  } catch (error) {
    console.error(`[AsyncStorage] Error resetting value from [${key}]. Error: ${error}`);
  }

  return value;
};

const debug = async (callback = () => null) => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      console.log('[DEBUG AsyncStorage - All keys]');
      console.table(stores);
      callback();
      // stores.map((result, i, store) => {
      //   // get at each store's key/value so you can work with it
      //   let key = store[i][0];
      //   let value = store[i][1];
      // });
    });
  });
};

const cleanAll = async (callback = () => null) => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiRemove(keys, (err) => {
      console.log('CLEANED');
      callback();
    })
  });
}

export default { debug, setStoreItem, getStoreItem, resetStoreItem, cleanAll };
