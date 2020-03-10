import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, TextInput} from "react-native";
import firebase from 'firebase';
import { db } from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import MyClassesCard from "../components/MyClassesCard";
import FutureGoalsCard from "../components/FutureGoalsCard";
import InterestingCard from "../components/InterestingCard";

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

export default class MyClasses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: "",
            errorMessage: "",
            infoMessage: "",  
            token: "",
            myClassesText: "",
            futureGoalsText: "",
            otherInfoText: "",
        };
  }

    componentDidMount() {
        this.props.navigation.addListener("didFocus", payload => {
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
            db.ref('/users/' + userId + '/myclasses').once('value').then((snapshot) => {
                var n = snapshot.val().myClassesText;
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
                console.log("here: " + n);
                this.setState({
                    otherInfoText: n,
                })
            });
        })
    }
    
        // async getInfo() {
        //                 var userId = firebase.auth().currentUser.uid;
        //     db.ref('/users/' + userId + '/aboutme').once('value').then((snapshot) => {
        //         var n = snapshot.val().AboutMeText;
        //         this.setState({
        //             aboutMeText: n,
        //         })
        //     });
        // }

        
  render() {
    return (
        <ScrollView>

        <View style={styles.cards}>
            <MyClassesCard myClasses = {this.state.myClassesText}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditClasses")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit My Courses
                </Text>
        </TouchableOpacity>


        <View style={styles.cards}>
            <FutureGoalsCard futureGoals = {this.state.futureGoalsText}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditClasses")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit Future Goals
                </Text>
        </TouchableOpacity>

        <View style={styles.cards}>
            <InterestingCard interestingFacts = {this.state.otherInfoText}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditClasses")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit Other Info
                </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    title:{
          fontSize: 30,
          fontWeight: "600",
          paddingTop: 70,
          alignSelf: "center",
          color: "#169ddf",
      },
      button:{
        width:"50%",
        backgroundColor: '#f0856b',
        justifyContent:"center",
        alignItems: 'center',
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 15,
    },
    cards:{
        alignItems: "center",
        marginHorizontal: 15,
    },

})