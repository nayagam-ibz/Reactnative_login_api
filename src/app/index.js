import React,{Component} from 'react';
import { 
  View,
  TouchableOpacity,
  Text,TextInput, 
  Button, 
  StyleSheet, 
  Image, 
  TouchableWithoutFeedback, 
  Alert, 
  KeyboardAvoidingView, 
  Keyboard, Switch
}  from 'react-native';

import {connect} from 'react-redux';

import { UserLogin, StoreUserToken, CurrentUser } from "../redux/actions/users";
import { reduxForm, Field } from 'redux-form'
import axios from 'axios';

const textInput = ({label, meta: {error, touched}, input: {onChange}}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput style={styles.inputbox}  onChangeText={onChange} />
      {touched && (error && (<Text style={{color: '#fff'}}>{error}</Text>))}
    </View>
  )
}

const passwordInput = ({label, meta: {error, touched}, input: {onChange}}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput style={styles.inputbox}  onChangeText={onChange}  secureTextEntry/>
      {touched && (error && (<Text style={{color: '#fff'}}>{error}</Text>))}
    </View>
  )
}


class Login extends Component{

  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
    }
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  static navigationOptions = {
    header: null
  }

  onSubmit = (values) => {
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

  render(){
   const { handleSubmit } = this.props;
    return(
      <View style={styles.container}> 
        <Image
          style={{width: 200, height: 200 }}
          source={require('../images/react-image.png')}  
        />  
        <View>
          <Field name="email" label="Email" component={textInput} type="text" />
          <Field name="password" label="Password" component={passwordInput} type="text"/>
        
          <TouchableOpacity style={styles.button} onPress={handleSubmit(this.onSubmit)}>
            <Text style={styles.buttonText}> Done </Text>
          </TouchableOpacity>  
        </View>
      </View>
    )
  }
}



const validate = values => {

  const errors = {};
    if (!values.email) {
      errors.email = 'Please Enter Email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please Enter Validate  Email Address'
    }
    if(!values.password) {
      errors.password = "Please Enter password "
    }

  return errors;
}

const ContactForm = reduxForm({
  form: 'ContactForm',
  validate,
})(Login)


const mapStateToProps = state => {
  return { 
    users: state.auth.users 
  }
}
  
export default connect(mapStateToProps, { UserLogin, StoreUserToken })(ContactForm);


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
