import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, TextInput} from "react-native";
import firebase from 'firebase';
import { db } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

function editAboutMe(me, token) {
    db.ref('users/' + token + '/aboutme/').set({
        AboutMeText: me,
    });
}

function editFunFacts(me, token) {
    db.ref('users/' + token + '/funfacts/').set({
        funFactsText: me,
    });
}

function editLinks(me, token) {
    db.ref('users/' + token + '/links/').set({
        linksText: me,
    });
}

export default class EditHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: "",
            errorMessage: "",
            infoMessage: "",  
            token: "",
            aboutMeText: "Hello!",
            funFactsText: "Fun Facts",
            linksText: "Some interesting links"
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
            });
            var userId = firebase.auth().currentUser.uid;
            db.ref('/users/' + userId + '/aboutme/').once('value').then((snapshot) => {
                var n = snapshot.val().AboutMeText;
                console.log(n);
                this.setState({
                    aboutMeText: n,
                })
            });

            db.ref('/users/' + userId + '/funfacts/').once('value').then((snapshot) => {
                var n = snapshot.val().funFactsText;
                console.log(n);
                this.setState({
                    funFactsText: n,
                })
            });

            db.ref('/users/' + userId + '/links/').once('value').then((snapshot) => {
                var n = snapshot.val().linksText;
                console.log(n);
                this.setState({
                    linksText: n,
                })
            });
        }

        
  render() {
    return (
        <ScrollView>
        {/* <View style={{paddingLeft:15, headerMode: 'none'}}>
        <Text style={styles.title}>About Me</Text>
        </View> */}

        <TextInput
            style={{ height: 50, width: 370, borderColor: 'gray', borderWidth: 1, marginTop: 50, 
            marginLeft: 20, marginRight: 30, textAlignVertical: 'top', justifyContent: "flex-start"}}
            onChangeText={(text) => this.setState({aboutMeText: text})}
            placeholder={this.state.aboutMeText}
            value={this.state.aboutMeText}
        />

        <TouchableOpacity style={styles.button} onPress= {() => editAboutMe(this.state.aboutMeText, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save About Me!
                </Text>
        </TouchableOpacity>

        <TextInput
            style={{ height: 50, width: 370, borderColor: 'gray', borderWidth: 1, marginTop: 100, 
            marginLeft: 20, marginRight: 30, textAlignVertical: 'top', justifyContent: "flex-start"}}
            onChangeText={(text) => this.setState({funFactsText: text})}
            placeholder={this.state.funFactsText}
            value={this.state.funFactsText}
        />

        <TouchableOpacity style={styles.button} onPress= {() => editFunFacts(this.state.funFactsText, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save Fun Facts!
                </Text>
        </TouchableOpacity>

        <TextInput
            style={{ height: 50, width: 370, borderColor: 'gray', borderWidth: 1, marginTop: 100, 
            marginLeft: 20, marginRight: 30, textAlignVertical: 'top', justifyContent: "flex-start"}}
            onChangeText={(text) => this.setState({linksText: text})}
            placeholder={this.state.linksText}
            value={this.state.linksText}
        />

        <TouchableOpacity style={styles.button} onPress= {() => editLinks(this.state.linksText, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save Links!
                </Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    title:{
          fontSize: 40,
          fontWeight: "600",
          paddingTop: 70,
          //fontFamily: 'lucida grande',
          alignSelf: "center",
          color: "#169ddf",
      },
      button:{
        width:"50%",
        backgroundColor: '#8fb339',
        justifyContent:"center",
        alignItems: 'center',
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 55,
    },

})