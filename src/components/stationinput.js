import React, { Component } from 'react';
import  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  TouchableHighlight
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
 import { BLUESTYLECOLOR,RESULTPAGE } from './constant';
import {inject, observer,autorun} from 'mobx-react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchList from '@unpourtous/react-native-search-list';

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

  render(){
    return(
      <View style={styles.buttoncontainer}>

        <Icon
          style={styles.exchangebutton}
          name="md-repeat"
          size={30}
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
              placeholderTextColor='#ccc'
              // placeholderTextColor='#e7f0fd'
              underlineColorAndroid='transparent'
              selectionColor ='#0d54bf'
              onFocus={() =>{
                this.props.store.startInput=true;
              }}
              onBlur={() =>{this.props.store.startInput=false}}
              defaultValue={this.props.store.start}
              onChangeText={(text) => {
                this.props.store.start=text;

              }}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.tipinputcontainer}>
            <Text
              style={styles.tiptext}
            >到</Text>
            <TextInput
              style={styles.input}
              placeholder="输入终点"
              // placeholderTextColor='#e7f0fd'
              placeholderTextColor='#ccc'
              underlineColorAndroid='transparent'
              selectionColor ='#0d54bf'
              onFocus={() =>{this.props.store.destinationInput=true}}
              onBlur={() =>{this.props.store.destinationInput=false}}
              defaultValue={this.props.store.destination}
              onChangeText={(text) => {this.props.store.destination=text}}
            />
          </View>
        </View>

        <View style={styles.searchbuttoncont}>

          <TouchableHighlight
            style={styles.searchbutton}
            onPress={() => this.props.store.navigate(RESULTPAGE)}

          >
            <Text
              style={styles.searchtext}
            >搜路线</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
// <Icon
//   style={styles.exchangebutton}
//   name="md-search"
//   size={30}
//   onPress={()=>{this.exchange()}}
// />


// //plan1
// const styles=StyleSheet.create({
//   tipinputcontainer:{
//     flexDirection: 'row',
//     alignItems:'center',
//     marginTop:10,
//     width:getWidthPercent(70),
//     height:getHeightPercent(5),
//     backgroundColor:'#70a5f5',
//     borderRadius: 4,
//   },
//   inputcontainer:{
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems:'center',
//     // paddingTop: 10,
//     paddingBottom: 8,
//     width:getWidthPercent(70),
//     height:getHeightPercent(18),
//   },
//   buttoncontainer:{
//     flexDirection: 'row',
//     justifyContent:'space-around',
//     alignItems:'center',
//     backgroundColor:'#4389f2'
//
//   },
//   // searchbuttoncont:{
//   //   alignItems:'center'
//   // },
//   tiptext:{
//     fontSize:14,
//     // paddingTop: 8.5,
//     // paddingBottom: 10,
//     // paddingRight: 10,
//     paddingLeft: 10,
//     color:'#cfe1fc'
//   },
//   exchangebutton:{
//     alignItems:'center',
//
//     // width:getWidthPercent(15),
//     // height:getWidthPercent(15),
//     color:"#fff",
//     // backgroundColor:"#000",
//     paddingLeft: 9,
//     // paddingRight: 1,
//     // opacity: 0.1
//   },
//   searchtext:{
//     color:"#e7f0fd",
//     //  color:"#79a6d2",
//     fontSize:17,
//     marginTop:getHeightPercent(3.5),
//     // marginLeft:getHeightPercent(1.6)
//   },
//   searchbutton:{
//     borderRadius: 6,
//     height:getHeightPercent(10)+10,
//     width:getWidthPercent(13),
//     // backgroundColor:'#d9e6f2',
//     backgroundColor:'#1069ef',
//     paddingBottom: 8,
//   },
//   input:{
//     paddingTop: 5,
//     paddingLeft: 10,
//     // paddingRight: 10,
//     paddingBottom: 7.5,
//     // marginTop:10,
//     width:getWidthPercent(60),
//     height:getHeightPercent(5),
//     // borderWidth: 1,
//     // backgroundColor:'#70a5f5',
//     fontSize:15,
//     borderColor: '#000',
//     // borderBottomWidth: 5
//     // flex:1,
//     color:'#fff'
//   },
// })

//plan2
const styles=StyleSheet.create({
  tipinputcontainer:{
    flexDirection: 'row',
    alignItems:'center',
    marginTop:10,
    width:getWidthPercent(70),
    height:getHeightPercent(5),
    backgroundColor:'#fff',
    borderRadius: 4,
    borderColor: '#4087f2',
    borderWidth:1
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
    // backgroundColor:'#4389f2'
    backgroundColor: '#e7f0fd'
  },
  // searchbuttoncont:{
  //   alignItems:'center'
  // },
  tiptext:{
    fontSize:14,
    // paddingTop: 8.5,
    // paddingBottom: 10,
    // paddingRight: 10,
    paddingLeft: 10,
    color:'#b3b3b3'
  },
  exchangebutton:{
    alignItems:'center',

    // width:getWidthPercent(15),
    // height:getWidthPercent(15),
    color:"#0d54bf",
    // backgroundColor:"#000",
    paddingLeft: 9,
    // paddingRight: 1,
    // opacity: 0.1
  },
  searchtext:{
    // color:"#e7f0fd",
     color:"#fff",
    fontSize:17,
    marginTop:getHeightPercent(3.5),
    // marginLeft:getHeightPercent(1.6)
  },
  searchbutton:{
    borderRadius: 6,
    height:getHeightPercent(10)+10,
    width:getWidthPercent(13),
    backgroundColor:'#4087f2',
    // backgroundColor:'#235dcc',
    paddingBottom: 8,
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
    color:'#000'
  },
})
