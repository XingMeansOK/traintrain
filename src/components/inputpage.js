import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar
} from 'react-native';
import React, {Component} from 'react';
import { RESULTPAGE } from './constant'; // 导入常量，避免耦合
import PropTypes from 'prop-types';// 用于检测传入到这个组件的props的类型
import {inject, observer} from 'mobx-react';
import StationList from './stationlist';
import StationInput from './stationinput';
import {
  getWidthPercent,
  getHeightPercent,
  HEADERCOLOR,
  MAPPAGE
} from './constant';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/Ionicons';

@inject("store") @observer
export default class Inputpage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;// 将appStore的引用作为当前对象的成员保存下来，方便使用
    const { navigate } = props.navigation;
    props.store.navigate = props.store.navigate? props.store.navigate:navigate;
  }
  static navigationOptions = {
    tabBarVisible: false

  };

  render() {
    const { navigate } = this.props.navigation;
    const store = this.store;
    return (
      <View style={styles.container}>

        <StatusBar backgroundColor= {HEADERCOLOR} />
        <View style={styles.headercont} >
          <Icon
            style={styles.backbutton}
            name="ios-arrow-back"
            size={30}
            color='#fff'
            onPress={()=>{this.props.store.navigate(MAPPAGE)}}
          />
          <Text style={styles.headertxt}>路线查询</Text>
          <Icon
            style={{paddingRight:10,color:HEADERCOLOR}}
            name="ios-arrow-back"
            size={30}

          />
        </View>
        <StationInput />
        <StationList />
        <DropdownAlert
          ref={ref => {this.props.store.alertRef = ref}}
          containerStyle={{
          backgroundColor:"#fff",
          }}
          startDelta={0}
          endDelta={0}
          showCancel={true}
          inactiveStatusBarBackgroundColor={HEADERCOLOR}
          // activeStatusBarBackgroundColor='red'
         />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    // marginTop:24,
    flexDirection: 'column',
    flex:1
  },
  headercont:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:getHeightPercent(7),
    width:getWidthPercent(100),
    backgroundColor:HEADERCOLOR,
  },
  headertxt:{
    fontSize:20,
    color:'#fff',
  },
  backbutton:{
    paddingLeft:10,
  },
})
// Inputpage.propTypes = {
//   screenProps: PropTypes.object.isRequired,// screenProps传进来的就是appStore ，这里做一下检测，要求screenProps是一个object
// }
