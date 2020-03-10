import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage} from "react-native";
import { TextInput } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
import { ScrollView } from "react-native-gesture-handler";

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

export default class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passord: "",
            token: "",
            firstName: "",
            lastName: "",
            errorMessage: "",
            infoMessage: "",  
            token: "",
        };
  }

  componentDidMount() {
    AsyncStorage.getItem("userInfo").then(infoObject => {
        if (infoObject)
        {
              infoObject = JSON.parse(infoObject);
              if (infoObject.token)
              {
                    this.setState({
                          email: infoObject.email,
                          token: infoObject.token
                    });
              }
        }
        // console.log("beginning:" + infoObject);
        // this.setState({token: infoObject.token});
        // console.log("HERE unique token:" + this.state.token);
        });
    }

    _logout = () => {
        let resp = firebase.auth().signOut().then(function() {
          }).catch(function(error) {
            console.log("error when logging out")
          });
          
        if (resp)
        {
            this.props.navigation.navigate("Auth")
        }
      }  

  render(){
      return (
          <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
          <ScrollView>
          {/* <View style={{paddingLeft:15}}>
          <Text style={styles.title}>My Profile</Text>
          </View> */}
            
            <TouchableOpacity style={styles.buttonProfile} onPress={() => this.props.navigation.navigate("EditProfile")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit Profile
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress= {() => this._logout()}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Log Out
                </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.buttonDelete} onPress= {() => this._logout()}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Delete Account
                </Text>
            </TouchableOpacity> */}

          {/* <Button buttonStyle={{backgroundColor: '#5e7695', alignItems: 'center', justifyContent: 'center', padding: 10, width: 200,
                    borderRadius: 10, flex: 1, marginTop: 395, alignSelf: 'center'}} textStyle={{color: '#ffffff', fontWeight: 500}} 
                    title='Log Out' onPress={this._logout}/> */}

          </ScrollView>
          </KeyboardAvoidingView>
      )
  }
} 

const styles = StyleSheet.create({
    title:{
          fontSize: 32,
          fontWeight: "600",
          paddingTop: 50,
          //fontFamily: "Optima",
          alignSelf: "center",
          color: "#4b5842",
      },
      button:{
        width:"55%",
        backgroundColor: '#5e7695',
        justifyContent:"center",
        alignItems: 'center',
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 385,
    },
    buttonProfile:{
        width:"55%",
        backgroundColor: '#4b5842',
        justifyContent:"center",
        alignItems: 'center',
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 45,
    },
    buttonDelete:{
        width:"55%",
        backgroundColor: '#f0856b',
        justifyContent:"center",
        alignItems: 'center',
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 30,
    }

})