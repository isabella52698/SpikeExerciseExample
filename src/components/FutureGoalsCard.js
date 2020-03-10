import React from "react"
import {Text, View, StyleSheet} from "react-native" 
 
const FutureGoalsCard = (props) => {
    return (
        <View style={styles.mainCard}>
            <View style={{flex:'row'}}>
                <Text style={styles.cardTitleText}>
                    {"Future Goals"}
                </Text>
        </View>
        <View style={{flex:1}}>
        <Text style={styles.cardNumText}>
            {props.futureGoals}
        </Text>
    </View>
    </View>
    )
}
const styles = {
    cardTitleText:{
        color:"white",
        fontSize: 32,
        //fontFamily: "Optima",
        fontWeight: "400",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    cardNumText:{
        color:"black",
        fontSize: 16,
        //fontFamily: "Optima",
        fontWeight: "300",
        paddingTop: 20,
        paddingRight: 15,
    }, 

    mainCard:{
        borderRadius: 10,
        backgroundColor:"#ff9696",
        justifyContent:"center",
        flexDirection:"column",
        height: 250,
        width:"100%",
        marginVertical: 20,
        paddingLeft:20,
        paddingTop: 20,
    },
}
export default FutureGoalsCard;