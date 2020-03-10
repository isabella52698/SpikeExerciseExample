import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage} from "react-native";
import { TextInput } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

export default class Login extends React.Component {
        state = {
            email: "",
            password: "",
            errorMessage: "",
            emailBorder: "",
            passwordBorder: "",
            loading: "",
            messageColor: "red",
            token: "",
         }

    async login() {
        try{
            console.log("intial login");
            var result = 0;
            var resp = await firebase.auth().signInWithEmailAndPassword(this.state.email.toLocaleLowerCase(), 
                this.state.password);
            if(resp){ // this means successfully sign in
                result = 200;
            }
        }catch(error) {
            if(error.code === "auth/user-not-found"){
                this.setState({errorMessage:"User not found. Please sign up first.", emailBorder:"red"})
            }
            else if(error.code === "auth/invalid-email"){
                console.log("here");
                this.setState({errorMessage:"Invalid Email. Please try again.",emailBorder:"red"})

            }
            else if(error.code === "auth/wrong-password"){
                this.setState({errorMessage:"Invalid Password",passwordBorder:"red"})

            }else{
                this.setState({errorMessage:"Error logging into your account. Please try again"})
            }
            this.setState({loading: false})

        }
        if(result == 200){ // log in successfully 
            var userId = firebase.auth().currentUser;

            let userInfo = {
                email: userId.email,
                token: userId.uid
            };

            console.log(userInfo.token);
            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)).then(() => {if (userInfo.token) {
                console.log("UID:" + userInfo.token);
                this.setState({
                    token: userInfo.token,
                    email: userInfo.email,
                });
                this.props.navigation.navigate("Main")
            }
        });
        } 
    }

    navToSignup() 
    {
        this.setState({errorMessage: "", user: "", pass: ""});
        this.props.navigation.navigate("Signup");
    }

  render() {
    return(
    <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>

        <View style={{justifyContent:"center", alignItems:"center", flex: 1}}>
            <Image 
            style={{width: 225, height: 250}} 
            source={require("../assets/images/logo.png")} 
            />
        </View>

        <View style={{flex: 1, alignItems:"center"}}>
            <TextInput style={styles.textinput}
                onChangeText={(text) => this.setState({email: text})}
                placeholder="Email"
                value={this.state.email}
                />
            <TextInput style={styles.textinput}
                onChangeText={(text) => this.setState({password: text})}
                placeholder="Password"
                secureTextEntry
                value={this.state.password}
            />

            <Text style={{color:this.state.messageColor, margin: 10} }>{this.state.errorMessage}</Text>

            <TouchableOpacity style={styles.button} onPress= {() => this.login()}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Log In
                </Text>

            </TouchableOpacity>
            
            <View>
                <Text> Don't have an account? </Text>
                <Button color="#279AF1" title={"Sign up here"} onPress={() => this.navToSignup()} />
            </View>
        </View>
    </KeyboardAvoidingView>)
    }
}

const styles = StyleSheet.create({

    textinput:{
        height: 50,
        borderBottomColor:"gray",
        borderBottomWidth: 2,
        width:"90%",
    },

    button:{
        width:"30%",
        backgroundColor:"#A9CBDF",
        justifyContent:"center",
        alignItems:"center",
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
    }
})

