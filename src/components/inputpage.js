import {
  Text,
  View,
  Button,
  TextInput,
  ListView
} from 'react-native';
import React, {Component} from 'react';
import { RESULTPAGE } from './constant'; // 导入常量，避免耦合
import PropTypes from 'prop-types';// 用于检测传入到这个组件的props的类型
import {inject, observer} from 'mobx-react';
import StationList from './stationlist';


@inject("store") @observer
export default class Inputpage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;// 将appStore的引用作为当前对象的成员保存下来，方便使用
    this.state = {

    }
  static navigationOptions = {
    title: 'type in',
  };

  render() {
    const { navigate } = this.props.navigation;
    const store = this.store;
    return (
      <View>
        <StationList />
      </View>
    );
  }
}

Inputpage.propTypes = {
  screenProps: PropTypes.object.isRequired,// screenProps传进来的就是appStore ，这里做一下检测，要求screenProps是一个object
}
