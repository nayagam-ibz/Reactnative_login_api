import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput, 
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  ScrollView, 
  Alert,
  FlatList
} from 'react-native';

import {
  Title,
  Caption,
  Paragraph,
  Card,
  Button,
  withTheme,Divider,List
} from 'react-native-paper';

import { Provider as PaperProvider } from 'react-native-paper';
import {connect} from 'react-redux';
import { CurrentUser, MovieData } from "../redux/actions/users";
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';



class Dashboard extends Component {

  render() {
    return (
      <PaperProvider>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

          <Card style={styles.card}>
            <Card.Cover source={require('../images/wrecked-ship.jpg')} />
            <Card.Content>
              <Title>Abandoned Ship</Title>
              <Paragraph>
                The Abandoned Ship is a wrecked ship located on Route 108 in
                Hoenn, originally being a ship named the S.S. Cactus. The second
                part of the ship can only be accessed by using Dive and contains
                the Scanner.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Cover source={require('../images/forest.jpg')} />
            <Card.Actions>
              <Button onPress={() => {}}>Share</Button>
              <Button onPress={() => {}}>Explore</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Berries</Title>
              <Caption>Omega Ruby</Caption>
              <Paragraph>
                Dotted around the Hoenn region, you will find loamy soil, many of
                which are housing berries. Once you have picked the berries, then
                you have the ability to use that loamy soil to grow your own
                berries. These can be any berry and will require attention to get
                the best crop.
              </Paragraph>
            </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Title>Just Strawberries</Title>
          <Card.Cover source={require('../images/strawberries.jpg')} />
        </Card>
        <Card
          style={styles.card}
          onPress={() => {
            Alert.alert('The Chameleon is Pressed');
          }}
        >
          <Card.Cover source={require('../images/chameleon.jpg')} />
          <Card.Content>
            <Title>Pressable Chameleon</Title>
            <Paragraph>
              This is a pressable chameleon. If you press me, I will alert.
            </Paragraph>
          </Card.Content>
        </Card>
        <Card
          style={styles.card}
          onLongPress={() => {
            Alert.alert('The City is Long Pressed');
          }}>
          <Card.Cover source={require('../images/city.jpg')} />
          <Card.Content>
            <Title>Long Pressable City</Title>
            <Paragraph>
              This is a long press only city. If you long press me, I will
              alert.
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      </PaperProvider>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
      },
      content: {
        padding: 4,
      },
      card: {
        margin: 4,
      },
});


const mapStateToProps = state => {
  return { movies: state.auth.movies }
}

export default connect(mapStateToProps, { MovieData})(Dashboard);

