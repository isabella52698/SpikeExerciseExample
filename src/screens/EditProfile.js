import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, TextInput, ScrollView} from "react-native";
import firebase from 'firebase';
import { db } from '../config';

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

function editInfo(name, token) {
    db.ref('users/' + token).set({
        name: name,
    });
}


export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passord: "",
            token: "",
            name: "Name",
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
                            token: infoObject.token,
                        });
                }
            }
        });
        var userId = firebase.auth().currentUser.uid;
        db.ref('/users/' + userId).once('value').then((snapshot) => {
            var n = snapshot.val().name;
            this.setState({
                name: n,
            })
        });
    }

        render(){
            return (
                <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
                <ScrollView>
                <View style={{paddingLeft:30, paddingRight: 20}}>
                <Text style={{flex:1, paddingTop: 50, paddingLeft: 10, fontWeight: "bold"}}>Name: </Text>
                <TextInput style={styles.textinput}
                      onChangeText={(text) => this.setState({name: text})}
                      placeholder={this.state.name}
                      value={this.state.name}
                />
                <Text style={{flex:1, paddingTop: 30, paddingLeft: 10, fontWeight: "bold"}}>Email: </Text>
                <TextInput style={styles.textinput}
                      onChangeText={(text) => this.setState({email: text})}
                      placeholder={this.state.email}
                      value={this.state.email}
                />
    
                <Text style={{flex:1, paddingTop: 15, fontWeight: "bold", color: "red", alignSelf:'center', marginTop:10}}>{this.state.infoMessage}</Text>
        
                <TouchableOpacity style={styles.button} onPress= {() => editInfo(this.state.name, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save Changes!
                </Text>
                 </TouchableOpacity>

                {/* <Button buttonStyle={{backgroundColor: '#8fb339', alignItems: 'center', justifyContent: 'center', padding: 10, width: 200,
                        borderRadius: 10, flex: 1, alignSelf: 'center', marginTop:10}} textStyle={{color: '#ffffff', fontWeight: 600}} 
                        text={'Save Changes'} onPress={() => this.editInfo()}/> */}
    
                </View>
    
                </ScrollView>
                </KeyboardAvoidingView>
            )
        }
    } 
    
    const styles = StyleSheet.create({
        title:{
            fontSize: 32,
            fontWeight: "600",
            paddingTop: 10,
            alignSelf: "center",
            color: "#4b5842",
          },
    
          textinput:{
            height: 50,
            borderBottomColor:"gray",
            borderBottomWidth: 1,
            width:"90%",
            alignItems: "center",
        },
        button:{
            width:"55%",
            backgroundColor: '#8fb339',
            justifyContent:"center",
            alignItems: 'center',
            marginVertical: 15,
            height: 40,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 30,
        },
    })
    
    