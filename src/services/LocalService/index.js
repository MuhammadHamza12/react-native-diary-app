import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataAsStringKeyPairs = async (key,value) => {
  try {
    await AsyncStorage.setItem(key,value)
    console.log('saving value pair success');
  } catch (e) {
    console.log('saving value pair error',e)
    // saving error
  }
}

const storeDataAsObject = async (key,value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    console.log('saving object success');
  } catch (e) {
    console.log('saving object error',e)
    // saving error
  }
}

const getDataAsStringKeyPairs = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log('get value: ',value);
    if(value !== null) {
      console.log('value is not null: ',value);
      return value;
    }
  } catch(e) {
    console.log('getting value error',e)
  }
}


const getDataAsObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    console.log('get object value: ',JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log('getting object error',e)
  }
}
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@MyApp_key')
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}

export default {
  getDataAsObject,
  getDataAsStringKeyPairs,
  storeDataAsObject,
  storeDataAsStringKeyPairs,
  removeValue
}