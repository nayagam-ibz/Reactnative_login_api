import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput, 
  TouchableOpacity,AsyncStorage, ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';

import { CurrentUser, MovieData } from "../redux/actions/users";
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';


class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.props.MovieData()

    CurrentUser().then((token)=> {
      console.log('token is null....................')
      console.log(token)
      if(token===null){
        this.props.navigation.navigate('Login')
      }else{
        this.props.MovieData(token);
      }
    }).catch((error)=>{
       this.props.navigation.navigate('Login')
    })
  

    // console.log('userToken...................')
    // this.props.MovieData().then((data)=>{
   //   console.log(data.payload.data.movies);
   //   console.log('.....................Dashboard------------------------')
   //  })

  //   MovieData.then(function(response) {
    //   return response.json();
    // }).then(function (data) {
    //   console.log(data);
    // });


   // this.props.DataMovies
   //  .then(function (response) {
   //    console.log(response.data);
   //  })
   //  .catch(function (error) {
   //    console.log(error);
   //  });
  }

  clearUserToken() {
    AsyncStorage.removeItem('userToken').then(()=>{
      this.props.navigation.navigate('Login')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>
            {this.props.movies && this.props.movies.length ?
              this.props.movies.map(route => {
                return (
                  <Text key={route.title}>{route.title}</Text>
                );
              }) : null 
            }
          </Text>
        </View>
        <View>
          <TouchableOpacity  onPress={this.clearUserToken.bind(this)}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container : {
    backgroundColor: '#455a64',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: '#fff'
  }
});


const mapStateToProps = state => {
  return { movies: state.auth.movies }
}

export default connect(mapStateToProps, {MovieData})(Dashboard);
