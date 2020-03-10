import React, { Component } from 'react';
import {View ,Text, StyleSheet, Button, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, TextInput} from "react-native";
import firebase from 'firebase';
import { db } from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import AboutMeCard from "../components/AboutMeCard";
import FunStuffCard from "../components/FunStuffCard";
import LinksCard from "../components/LinksCard";

if (!firebase.apps.length)
{
    firebase.initializeApp(db);
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: "",
            errorMessage: "",
            infoMessage: "",  
            token: "",
            aboutMeText: "",
            funFacts: "",
            linksText: "",
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
            db.ref('/users/' + userId + '/aboutme').once('value').then((snapshot) => {
                var n = snapshot.val().AboutMeText;
                this.setState({
                    aboutMeText: n,
                })
            });

            db.ref('/users/' + userId + '/funfacts/').once('value').then((snapshot) => {
                var n = snapshot.val().funFactsText;
                console.log(n);
                this.setState({
                    funFacts: n,
                })
            });

            db.ref('/users/' + userId + '/links/').once('value').then((snapshot) => {
                var n = snapshot.val().linksText;
                console.log(n);
                this.setState({
                    linksText: n,
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
            <AboutMeCard aboutMe = {this.state.aboutMeText}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditHome")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit About Me
                </Text>
        </TouchableOpacity>


        <View style={styles.cards}>
            <FunStuffCard funFacts = {this.state.funFacts}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditHome")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit Fun Facts
                </Text>
        </TouchableOpacity>

        <View style={styles.cards}>
            <LinksCard links = {this.state.linksText}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("EditHome")}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Edit Links
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