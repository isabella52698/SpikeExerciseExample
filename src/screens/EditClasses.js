import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, TextInput} from "react-native";
import firebase from 'firebase';
import { db } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

function editCourses(me, token) {
    db.ref('users/' + token + '/myclasses/').set({
        myClassesText: me,
    });
}

function editGoals(me, token) {
    db.ref('users/' + token + '/futuregoals/').set({
        futureGoalsText: me,
    });
}

function editOther(me, token) {
    db.ref('users/' + token + '/otherfacts/').set({
        otherFactsText: me,
    });
}

export default class EditClasses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: "",
            errorMessage: "",
            infoMessage: "",  
            token: "",
            myClassesText: "Course History",
            futureGoalsText: "Dreams",
            otherFactsText: "More facts!",
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
            db.ref('/users/' + userId + '/myclasses/').once('value').then((snapshot) => {
                var n = snapshot.val().myClassesText;
                console.log(n);
                this.setState({
                    myClassesText: n,
                })
            });

            db.ref('/users/' + userId + '/futuregoals/').once('value').then((snapshot) => {
                var n = snapshot.val().futureGoalsText;
                console.log(n);
                this.setState({
                    futureGoalsText: n,
                })
            });

            db.ref('/users/' + userId + '/otherfacts/').once('value').then((snapshot) => {
                var n = snapshot.val().otherFactsText;
                console.log(n);
                this.setState({
                    otherFactsText: n,
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
            onChangeText={(text) => this.setState({myClassesText: text})}
            placeholder={this.state.myClassesText}
            value={this.state.myClassesText}
        />

        <TouchableOpacity style={styles.button} onPress= {() => editCourses(this.state.myClassesText, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save My Courses!
                </Text>
        </TouchableOpacity>

        <TextInput
            style={{ height: 50, width: 370, borderColor: 'gray', borderWidth: 1, marginTop: 100, 
            marginLeft: 20, marginRight: 30, textAlignVertical: 'top', justifyContent: "flex-start"}}
            onChangeText={(text) => this.setState({futureGoalsText: text})}
            placeholder={this.state.futureGoalsText}
            value={this.state.futureGoalsText}
        />

        <TouchableOpacity style={styles.button} onPress= {() => editGoals(this.state.futureGoalsText, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save Fun Facts!
                </Text>
        </TouchableOpacity>

        <TextInput
            style={{ height: 50, width: 370, borderColor: 'gray', borderWidth: 1, marginTop: 100, 
            marginLeft: 20, marginRight: 30, textAlignVertical: 'top', justifyContent: "flex-start"}}
            onChangeText={(text) => this.setState({otherFactsText: text})}
            placeholder={this.state.otherFactsText}
            value={this.state.otherFactsText}
        />

        <TouchableOpacity style={styles.button} onPress= {() => editOther(this.state.otherFactsText, this.state.token)}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Save Other Facts!
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