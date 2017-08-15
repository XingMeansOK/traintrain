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
  TouchableHighlight,
  StatusBar,
  Alert
 } from 'react-native';
 import {
   URL,
   FLETTER,
   itemheight,
   sectionsperatorheight,
   itemsperatorheight,
   getWidthPercent,
   getHeightPercent,
   screenwidth,
   screenheight,
   BORDERCOLOR,
   ICONCOLOR,
   BTNCOLOR,
   INPUTCOLOR,
   BACKGRDCOLOR,
   GRAY,
   DOWNBACKGRDCOLOR,
   THUMBCOLOR,
   ONPRESSCOLOR,
   SECSPRTCOLOR,
   LEFTTRACCOLOR,
   RIGHTTRACCOLOR,
   TIMETIPCOLOR
 } from './constant';
 import Slider from "react-native-slider";
 import { BLUESTYLECOLOR,RESULTPAGE } from './constant';
 import {inject, observer,autorun} from 'mobx-react';
 import Icon from 'react-native-vector-icons/Ionicons';
 import Collapsible from 'react-native-collapsible';
 import Loading from 'react-native-loading-w';


@inject("store") @observer
export default class StationInput extends Component{
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.state={
      collapsed: true,
    };
  }

  exchange = () => {
    let start=this.props.store.start;
    let destination=this.props.store.destination;
    this.props.store.destination=start;
    this.props.store.start=destination;
  }

  inputcheck = () => {
    if(this.props.store.start==''){

      Alert.alert('提示','请输入起点!')
    }
    else if (this.props.store.allstations.indexOf(this.props.store.start)==-1) {
      Alert.alert('提示','车站不存在！')
    }
    else if(this.props.store.destination==''){
      Alert.alert('提示','请输入终点！')
    }
    else if (this.props.store.allstations.indexOf(this.props.store.destination)==-1) {
      Alert.alert('提示','车站不存在！')
    }
    else if(this.props.store.start===this.props.store.destination){
      Alert.alert('提示','起点与终点不能为同一车站！')
    }

    else{
      this.props.store.loadingRef.show(true);
      this.sendRequest();

    }
  }

  async sendRequest() {
    let request = new Request(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Cache-Control': 'no-cache'
      },
      body: `start=${this.props.store.start}&destination=${this.props.store.destination}&t1=${this.props.store.timeinstation}&t2=${this.props.store.timeincity}`
    });
    try {
      let response = await fetch(request);
      this.props.store.loadingRef.dismiss();
      if(response.ok){
          let responseJson = await response.json();
          this.props.store.planInfo = responseJson;
          this.props.store.navigate(RESULTPAGE);
      }else{
          Alert.alert('提示','请求失败',[{text: '确定', onPress: () => console.log('OK Pressed!')},]);
      }

    } catch(error) {
      console.error(error);
    }

  }


  render(){
    return(
      <View style={styles.allcontainer}>


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
              />
            </View>
            <View style={styles.tipinputcontainer}>
              <Text
                style={styles.tiptext}
              >到</Text>
              <TextInput
                style={styles.input}
                placeholder="输入终点"
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
              onPress={this.inputcheck}
            >
              <Text style={styles.searchtext}>搜路线</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View>
          <View style={styles.settimecontainer}>
            <TouchableHighlight
              onPress={() => {this.setState({ collapsed: !this.state.collapsed });}}
              style={styles.settimebtn}
              underlayColor={ONPRESSCOLOR}
            >
              <Text style={styles.settimetxt}>设置换乘预估时间</Text>
            </TouchableHighlight>
          </View>

          <Collapsible collapsed={this.state.collapsed}>
            <View style={styles.timecontainer}>
              <View style={styles.timetipslicont}>
                <View style={styles.timeicontipcont}>
                  <Icon
                    style={styles.exchangebutton}
                    name="md-bus"
                    size={25}
                    color={ICONCOLOR}
                  />
                  <Text style={styles.timetiptxt}>市内换乘预估时间：{parseInt(this.props.store.timeincity/60)}小时{this.props.store.timeincity%60}分钟</Text>
                </View>
                <Slider
                  minimumTrackTintColor={LEFTTRACCOLOR}
                  maximumTrackTintColor={RIGHTTRACCOLOR}
                  thumbImage={require('../img/thumb.png')}
                  thumbStyle={styles.thumb}
                  thumbTintColor={THUMBCOLOR}
                  step={1}
                  minimumValue={0}
                  maximumValue={240}
                  value={120}
                  onValueChange={(value)=>{this.props.store.timeincity=value}}
                />
              </View>
              <View style={styles.timetipslicont}>
                <View style={styles.timeicontipcont}>
                  <Icon
                    style={styles.exchangebutton}
                    name="ios-walk-outline"
                    size={30}
                    color={ICONCOLOR}
                  />
                  <Text style={styles.timetiptxt}>站内换乘预估时间：{parseInt(this.props.store.timeinstation/60)}小时{this.props.store.timeinstation%60}分钟</Text>
                </View>
                <Slider
                    minimumTrackTintColor={LEFTTRACCOLOR}
                    maximumTrackTintColor={RIGHTTRACCOLOR}
                    thumbImage={require('../img/thumb.png')}
                    thumbStyle={styles.thumb}
                    thumbTintColor={THUMBCOLOR}
                    step={1}
                    minimumValue={0}
                    maximumValue={120}
                    value={60}
                    onValueChange={(value)=>{this.props.store.timeinstation=value}}
                />
              </View>
           </View>
          </Collapsible>
      </View>

    </View>
    );
  }
}


/////updownbutton
// <View style={styles.timecontainer}>
//   <View style={styles.timetranscontainer}>
//     <Text style={styles.timetiptxt}>市内换乘预估时间：</Text>
//     <View style={styles.timedwiptcontainer}>
//       <View style={styles.timeiptbtncontainer}>
//         <TextInput
//         style={styles.timeinput}
//         ref={textInput => this.citytextInputRef=textInput}
//         onChangeText={(text) => {
//           text=text.replace(/[^\d]/g,'0');
//           this.props.store.timeincity=text;
//         }}
//         multiline={false}
//         maxLength={4}
//         defaultValue={this.props.store.timeincity}
//         underlineColorAndroid='transparent'
//
//         />
//         <View style={styles.updownbtncontainer}>
//           <Icon
//             style={styles.updownbutton}
//             name="ios-arrow-up"
//             size={15}
//             onPress={()=>{this.props.store.timeincity=
//               (parseInt(this.props.store.timeincity)+5).toString();
//             }}
//
//
//           ></Icon>
//           <Icon
//           style={styles.updownbutton}
//           name="ios-arrow-down"
//           size={15}
//           onPress={()=>{this.props.store.timeincity=
//             (parseInt(this.props.store.timeincity)-5).toString();
//           }}
//           ></Icon>
//         </View>
//       </View>
//       <Text style={styles.timedanweitxt}>分钟</Text>
//
//     </View>
//   </View>
//   <View style={styles.timetranscontainer}>
//     <Text style={styles.timetiptxt}>站内换乘预估时间：</Text>
//     <View style={styles.timedwiptcontainer}>
//       <View style={styles.timeiptbtncontainer}>
//         <TextInput
//           style={styles.timeinput}
//           underlineColorAndroid='transparent'
//
//           onChangeText={(text) => {
//
//             time=text.replace(/[^\d]/g,'');
//             this.props.store.timeinstation=time;
//           }}
//           defaultValue={this.props.store.timeinstation}
//           multiline={false}
//           maxLength={4}
//
//         />
//         <View style={styles.updownbtncontainer}>
//           <Icon
//             style={styles.updownbutton}
//             name="ios-arrow-up"
//             size={15}
//             onPress={()=>{this.props.store.timeinstation=
//               (parseInt(this.props.store.timeinstation)+5).toString();
//             }}
//           ></Icon>
//           <Icon
//           style={styles.updownbutton}
//           name="ios-arrow-down"
//           size={15}
//           onPress={()=>{this.props.store.timeinstation=
//             (parseInt(this.props.store.timeinstation)-5).toString();
//           }}
//           ></Icon>
//         </View>
//       </View>
//       <Text style={styles.timedanweitxt}>分钟</Text>
//     </View>
//   </View>
//
// </View>


//plan2
const styles=StyleSheet.create({
//////////////////////////////newslider
  timeicontipcont:{
    flexDirection: 'row',
    alignItems:'center',
  },
  settimecontainer:{
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:BACKGRDCOLOR,
  },
  timetipslicont:{
    flexDirection: 'column',
  },
  timecontainer:{
    flexDirection: 'column',
    backgroundColor:DOWNBACKGRDCOLOR ,
    borderWidth:1,
    borderColor:BORDERCOLOR,
    marginLeft:1,
    marginRight:1,
    borderRadius:5
  },
  timetiptxt:{
    fontSize:17,
    paddingLeft:5,
    color:TIMETIPCOLOR,
  },
  settimebtn:{
    width:getWidthPercent(99),
    height:getHeightPercent(6),
    borderWidth:1,
    borderColor:BORDERCOLOR,
    borderRadius:5,
    backgroundColor:'#fff',
    backgroundColor:BTNCOLOR,
    alignItems:'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom:3
  },
  settimetxt:{
    fontSize:17,
    alignItems:'center',
    color:'#fff'
  },
  /////////////////////////////////////addnew udown
  // updownbutton:{
  //   color: '#ccc',
  // },
  // timetiptxt:{
  //   fontSize:16,
  // },
  // timeinput:{
  //   width:getWidthPercent(15),
  //   height:getHeightPercent(6),
  //   borderWidth: 2,
  //   borderColor: '#ccc',
  //   marginRight: 3.5,
  //   // marginTop:-4
  //   // borderRadius: 6
  // },
  // timedanweitxt:{
  //   fontSize:15,
  // },
  //
  // allcontainer:{
  //   flexDirection: 'column',
  //   backgroundColor: '#e7f0fd'
  // },
  //
  // updownbtncontainer:{
  //   flexDirection: 'column',
  //   alignItems:'center',
  //
  // },
  // timeiptbtncontainer:{
  //   flexDirection: 'row',
  //   alignItems:'center',
  //   width:getWidthPercent(20),
  //   height:getHeightPercent(5),
  //   backgroundColor:"#fff",
  //   borderRadius: 6,
  //   borderWidth: 2,
  //   borderColor: GRAY,
  //
  // },
  // timedwiptcontainer:{
  //   flexDirection: 'row',
  //   alignItems:'center',
  // },
  // timetranscontainer:{
  //   flexDirection: 'row',
  //   width:getWidthPercent(90),
  //   height:getHeightPercent(10),
  //   backgroundColor:"#ccc",
  //   alignItems:'center',
  // },
  // timecontainer:{
  //   flexDirection: 'column',
  //   justifyContent: 'space-around'
  // },
  /////////////////////////////////////////////////old
  tipinputcontainer:{
    flexDirection: 'row',
    alignItems:'center',
    marginTop:10,
    width:getWidthPercent(70),
    height:getHeightPercent(5),
    backgroundColor:INPUTCOLOR,
    borderRadius: 4,
    borderColor: BORDERCOLOR,
    borderWidth:1.5,
    elevation: 3,
  },
  inputcontainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    paddingBottom: 8,
    width:getWidthPercent(70),
    height:getHeightPercent(18),
  },
  buttoncontainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: BACKGRDCOLOR,
    height:getHeightPercent(15),
  },
  searchbuttoncont:{
    alignItems:'center',
    justifyContent: 'center',
    paddingRight: 9,
  },
  tiptext:{
    fontSize:14,
    paddingLeft: 10,
    color:'#b3b3b3'
  },
  exchangebutton:{
    alignItems:'center',
    color: ICONCOLOR,
    paddingLeft: 9,
  },
  searchtext:{
    color:"#fff",
    fontSize:17,
  },
  searchbutton:{
    borderRadius: 6,
    height:getHeightPercent(10)+10,
    width:getWidthPercent(13),
    backgroundColor:BTNCOLOR,
    alignItems:'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:BORDERCOLOR,
    elevation: 5,
  },
  input:{
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 7.5,
    width:getWidthPercent(60),
    height:getHeightPercent(5),
    fontSize:15,
    borderColor: '#000',
    color:'#000'
  },
  thumb: {
    width: 30,
    height: 30,
    elevation: 5,
  },

})


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
