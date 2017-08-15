import React, { Component } from 'react';
import  {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  StatusBar
 } from 'react-native';
import { MAPPAGE,getHeightPercent } from './constant';
import {inject, observer} from 'mobx-react';


@inject("store") @observer
export default class Welcomepage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;// 将appStore的引用作为当前对象的成员保存下来，方便使用
    const { navigate } = props.navigation;
    props.store.navigate = props.store.navigate? props.store.navigate:navigate;
  }
  static navigationOptions = {
    tabBarVisible: false
  };

  render(){
    return(
      <View style={styles.allcontainer}>
          <StatusBar backgroundColor='#fff'/>
        <View style={styles.wordscont}>
          <TouchableOpacity
            onPress={()=>this.props.store.navigate(MAPPAGE)}
          >
          <Text>skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.picturecont}>
          <Image
            source={require('../img/cover.png')}
            style
          />
        </View>
        <View style={styles.appnamecont}>
        </View>
      </View>

    )
  }
}
const styles=StyleSheet.create({
  allcontainer:{
    flexDirection:'column',
    flex:1,
    marginTop:24
  },
  wordscont:{
    height:getHeightPercent(20),
    backgroundColor:'#ccc',
  },
  picturecont:{
    height:getHeightPercent(60),
  },
  appnamecont:{
    height:getHeightPercent(20),
    backgroundColor:'#ccc',
  }
});
