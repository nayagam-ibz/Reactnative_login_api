import { USER_LOGIN, USER_AUTH, MOVIE_DATA} from '../actions/types';

const initialState = {

  loggedIn: false,
}

export default function handleUsers(state=initialState, action){
  switch(action.type){
    case USER_LOGIN:

     if(action.payload.data.result == true){
        console.log(action.payload.data.data.login_user.email)
        return {...state, loggedIn: true, success: action.payload.data.data.login_user, authToken: action.payload.data.data.auth_token };
      }else{
        console.log('Unsucess message')
        return {...state, ...action.payload.data};
      }

    case MOVIE_DATA:
      return {...state, movies: action.payload.data.movies}
          
    case USER_AUTH:
      return {...state, userToken: action.payload};
  
    default:
    return state;
  }
}