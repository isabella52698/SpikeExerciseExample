import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage} from "react-native";
import { TextInput } from 'react-native';
import { db } from '../config';
import firebase from 'firebase';

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

export default class Signup extends React.Component{
    state = {
      showModal: false,
      password: "",
      confirm:"",
      message:"",
      messageColor:"#F0856B",
      email: "",
      errorMessage: "",
      emailBorder: "",
      passwordBorder: "",
      loading: "",
      token: "",
    }
    async signUp() {
        try{
            console.log("intial signup");
            var result = 0;
            let resp = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            if(resp){ // this means successfully sign in
                result = 200;
                console.log("success signup");
            }
        } catch(error){
            if(error.code === "auth/user-not-found"){
                this.setState({errorMessage:"Invalid. Please try again.", emailBorder:"red"})
            }
            else if(error.code === "auth/invalid-email"){
                this.setState({errorMessage:"Please enter a valid email!",emailBorder:"red"})
            }else{
                this.setState({errorMessage:"Error creating account"})
                console.log("here:"); 
            }
            //this.setState({loading: false})

        }
        if(result == 200){ // log in successfully 
            console.log("SUcces!?")
            var userId = firebase.auth().currentUser;

            let userInfo = {
                email: userId.email,
                token: userId.uid
            };

            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)).then(() => {if (userId) {
                console.log("UID:" + userId);
                this.setState({
                    token: userInfo.token,
                    email: userInfo.email,
                });
                this.props.navigation.navigate("Main")
            }
        });
            this.props.navigation.navigate("Main")
        } 
    }

        checkSignUp() {
            if (this.state.confirm !== this.state.password)
            {
                this.setState({errorMessage: "Passwords do not match! Please try again."})
            }
            else {
                this.signUp();
            }
        }

    render(){
        return(
        <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"}>
             <Text style={styles.title}>Create New Account</Text>

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
                 <TextInput style={styles.textinput}
                    onChangeText={(text) => this.setState({confirm: text})}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={this.state.confirm}
                />
                
                <Text style={{color:this.state.messageColor}}>{this.state.errorMessage}</Text>

                <TouchableOpacity style={styles.button} onPress= {() => this.checkSignUp()}>
                    <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                        Sign Up
                    </Text>

                </TouchableOpacity>
            </View> 
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({

    title: {
        fontSize: 32,
        fontWeight: "100",
        paddingTop: 20,
        alignSelf: "center",
        color: "#4b5842",
        //fontFamily: "Optima",
    },

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