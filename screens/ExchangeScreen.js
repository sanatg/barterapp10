import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'


export default class ExchangeScreen extends React.Component{
constructor(props) {
  super(props);
  this.state = {
    userId:firebase.auth().currentUser.email,
    ItemName: '',
    ItemDescription: '',
  };
};
createUniqueId=()=>{
  return Math.random().toString(36).substring(7)
}
addItem = ()=>{
  var uniqueId = this.createUniqueId();
  var userId = this.state.userId;
    db.collection("requests").add({
        "userId":userId,
        item : this.state.ItemName,
        description : this.state.ItemDescription,
        "Exchange_Id":uniqueId
    });
    return(alert("item added"));
}

    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader/>
              <TextInput style={styles.formTextInput} placeholder="Add Item name..."
                onChangeText= {(text)=>{
                   this.setState({
                            ItemName: text
                   })
               }}
               value={this.state.ItemName}/>
             <TextInput style={styles.formTextInput2} placeholder="Add Item Description..."
               multiline = {true}
               onChangeText= {(text)=>{
               this.setState({
                 ItemDescription: text
                })
                }}
                value={this.state.ItemDescription}/>
              <TouchableOpacity style={styles.button}

                 onPress={()=>{
                        this.addItem();
                        this.setState({
                            ItemName: "",
                            ItemDescription:"",
                        })
                    }}><Text style = {{color:'#fff'}}>Add Item</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"50%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:50,
      padding:10,
    },
    formTextInput2:{
      width:"50%",
      height:205,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"15%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      alignSelf:'center',
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
