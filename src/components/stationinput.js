import React, { Component } from 'react';
import  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image
 } from 'react-native';
 import {
   fletter,
   itemheight,
   sectionsperatorheight,
   itemsperatorheight,
   getWidthPercent,
   getHeightPercent,
   screenwidth,
   screenheight
 } from './constant';
 import { BLUESTYLECOLOR } from './constant';
import {inject, observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';

@inject("store") @observer
export default class StationInput extends Component{
  constructor(props){
    super(props);
    this.store = this.props.store;
  }
  exchange(){
    let start=this.props.store.start;
    let destination=this.props.store.destination;
    this.props.store.destination=start;
    this.props.store.start=destination;
  }
          // ref={textInput => this._textInputq=textInput}

          // <Button
          //   style={styles.exchangebutton}
          //   title="eeee"
          //   color='#0f5fd7'
          //   onPress={()=>{this.exchange()}}
          // >
          // </Button>
          // <TouchableOpacity
          //   onPress={()=>{this.exchange()}}
          //   activeOpacity={0.8}
          // >
          //   <Image
          //     source={require('./jt.jpg')}
          //     style={styles.exchangeimage}
          //   />
          // </TouchableOpacity>
  render(){
    return(
      <View style={styles.buttoncontainer}>
        <Icon.Button
          style={styles.exchangebutton}
          name="arrows-v"
          onPress={()=>{this.exchange()}}
        />





        <View style={styles.inputcontainer}>
          <View style={styles.tipinputcontainer}>
            <Text
              style={styles.tiptext}
            >从</Text>
            <TextInput
              style={styles.input}
              placeholder="输入起点"
              placeholderTextColor='#e7f0fd'
              underlineColorAndroid='transparent'
              selectionColor ='#0d54bf'
              onFocus={() =>{
                this.props.store.startInput=true;
              }}
              onBlur={() =>{this.props.store.startInput=false}}
              defaultValue={this.props.store.start}
              onChangeText={(text) => {this.props.store.start=text}}
            />
          </View>
          <View style={styles.tipinputcontainer}>
            <Text
              style={styles.tiptext}
            >到</Text>
            <TextInput
              style={styles.input}
              placeholder="输入终点"
              placeholderTextColor='#e7f0fd'
              underlineColorAndroid='transparent'
              selectionColor ='#0d54bf'
              onFocus={() =>{this.props.store.destinationInput=true}}
              onBlur={() =>{this.props.store.destinationInput=false}}
              defaultValue={this.props.store.destination}
              onChangeText={(text) => {this.props.store.destination=text}}
            />
          </View>
        </View>

        <Button
          style={styles.researchbutton}
          color='#0f5fd7'
          title="ssss"
          // onPress={() => {}}
        >
        </Button>
      </View>

    );
  }
}


const styles=StyleSheet.create({
  tipinputcontainer:{
    flexDirection: 'row',
    alignItems:'center',
    marginTop:10,
    width:getWidthPercent(70),
    height:getHeightPercent(5),
    backgroundColor:'#70a5f5',
    borderRadius: 4,
  },
  inputcontainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    // paddingTop: 10,
    paddingBottom: 8,
    width:getWidthPercent(70),
    height:getHeightPercent(18),

  },
  buttoncontainer:{
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#4389f2'
  },
  tiptext:{
    fontSize:14,
    // paddingTop: 8.5,
    // paddingBottom: 10,
    // paddingRight: 10,
    paddingLeft: 10,
    color:'#cfe1fc'
  },
  exchangebutton:{
    alignItems:'center',

    width:getWidthPercent(7),
    height:getWidthPercent(7),
    backgroundColor:BLUESTYLECOLOR,
    paddingLeft: 9,
    paddingRight: 1,
    // opacity: 0.1

  },
  searchbutton:{

    width:getWidthPercent(20)

  },
  input:{
    paddingTop: 5,
    paddingLeft: 10,
    // paddingRight: 10,
    paddingBottom: 7.5,
    // marginTop:10,
    width:getWidthPercent(60),
    height:getHeightPercent(5),
    // borderWidth: 1,
    // backgroundColor:'#70a5f5',
    fontSize:15,
    borderColor: '#000',
    // borderBottomWidth: 5
    // flex:1,
    color:'#fff'
  },


})
