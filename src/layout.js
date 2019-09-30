import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from './app/index'
import Dashboard from './app/Dashboard'

const Navigation = createStackNavigator({

  Login: {
    screen: Login
  },

  Dashboard: {
  	screen: Dashboard
  }

});

export default createAppContainer(Navigation);

