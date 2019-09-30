import axios from 'axios';
import { USER_LOGIN, BASE_URL, USER_AUTH, APP_TOKEN, MOVIE_DATA } from './types';
import { AsyncStorage } from 'react-native';

import store from '../reducers/index';

export function UserLogin(user_params){
  axios.defaults.headers.common['API-Auth'] = APP_TOKEN;
  const response = axios.post(`${BASE_URL}/users/sign_in`, {user: user_params})
  console.log(response)
  return {
    type: USER_LOGIN,
    payload: response
  }
}

export function MovieData(token){
  axios.defaults.headers.common['API-Auth'] = token;
  response = axios.get(`https://facebook.github.io/react-native/movies.json`)
  return {
    type: MOVIE_DATA,
    payload: response
  }
}

export async function CurrentUser(){
  try {
    const userToken = await AsyncStorage.getItem('userToken')
    console.log(userToken)
    console.log("userToken.....................")
    return userToken
  } catch (error) {
    return error
  }
}

export function StoreUserToken(authToken){
  try {
    const userToken = AsyncStorage.setItem('userToken', authToken);
    return userToken
  } catch (error) {
    return error
  }
}