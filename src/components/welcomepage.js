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
import { MAPPAGE,getHeightPercent,getWidthPercent } from './constant';
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

  componentDidMount(){
    setTimeout(()=>this.props.store.navigate(MAPPAGE),3000)
  }

  render(){
    return(
      <View style={styles.allcontainer}>
        <View style={styles.wordscont}>
          <Text style={styles.words}>让出更方便</Text>
        </View>
        <View style={styles.picturecont}>
          <Image
            source={require('../img/cover.png')}
            resizeMode='cover'
            resizeMethod='resize'
            style={{width:350,height:205}}
          />
        </View>
        <View style={styles.appnamecont}>
          <Text style={styles.appname}>Traintrain</Text>
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
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  picturecont:{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    height:getHeightPercent(60),
    flex:1,
    backgroundColor:'#fff'
  },
  appnamecont:{
    height:getHeightPercent(20),
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  appname:{
    fontSize:50,
  },
  words:{
    fontSize:30,
  }
});
