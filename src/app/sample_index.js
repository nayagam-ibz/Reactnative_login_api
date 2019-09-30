import React,{Component} from 'react';
import {View,TouchableOpacity,Text,TextInput, Button, StyleSheet, Image}  from 'react-native';
import {connect} from 'react-redux';
// import * as actions from '../redux/actions/authActions'
import { UserLogin, StoreUserToken, CurrentUser } from "../redux/actions/users";
import { Field, reduxForm, reset } from 'redux-form'
import axios from 'axios';

class Login_1 extends Component{

  static navigationOptions = {
    header: null
  }

  onSubmit = (values, dispatch) => {
    dispatch(reset("ContactForm"));

    this.props.UserLogin(values).then((data)=>{
      if(data.payload.data.data.message){
        StoreUserToken(data.payload.data.data.auth_token).then(()=>{
          this.props.navigation.navigate('Dashboard')        
        })
      }else{
        alert("Login Failed")
      }
    })
  }

  navigation(){
     this.props.navigation.navigate('Dashboard')
  }
  render(){
   const { handleSubmit } = this.props;
    return(
     <View style={styles.container}> 
        <Image
          style={{width: 200, height: 200 }}
          source={require('../images/react-image.png')}  
        />  
        <View>
          <Field name="user[email]" label="Email" component={textInput} type="text" />
          <Field name="user[password]" label="Password" component={passwordInput} type="text"/>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonText}> Done </Text>
          </TouchableOpacity>  
        </View>
      </View>
    )
  }
}



const ContactForm = reduxForm({
  form: 'ContactForm',
  validate,
  onSubmitSuccess: () => {
    console.log('onSubmitSuccess called (yes, yes I do get called');
        
  },
})(Login)


const validate = values => {
  const errors = {};
  return errors;
}

const mapStateToProps = state => {
  return { users: state.auth.user }
}
  
export default connect(mapStateToProps, { UserLogin, StoreUserToken })(ContactForm);


const textInput = ({label, meta: {error, touched}, input: {onChange}}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput style={styles.inputbox}  onChangeText={onChange} />
      {touched && (error && (<Text style={{color: 'red'}}>{error}</Text>))}
    </View>
  )
}

const passwordInput = ({label, meta: {error, touched}, input: {onChange}}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput style={styles.inputbox}  onChangeText={onChange} secureTextEntry/>
      {touched && (error && (<Text style={{color: 'red'}}>{error}</Text>))}
    </View>
  )
}


const styles = StyleSheet.create({
  container : {
    backgroundColor: '#455a64',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: '#fff'
  },
  inputbox: {
    width: 300,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ffffff',
    marginVertical: 10
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#1c313a',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 15

  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
});


