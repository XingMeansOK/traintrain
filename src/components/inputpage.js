import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import React, {Component} from 'react';
import { RESULTPAGE } from './constant'; // 导入常量，避免耦合
import PropTypes from 'prop-types';// 用于检测传入到这个组件的props的类型
import {observer} from 'mobx-react';

@observer
export default class Inputpage extends Component {
  static navigationOptions = {
    title: 'type in',
  };
  render() {
    const { navigate } = this.props.navigation;
    const store = this.props.screenProps;
    return (
      <View>
        <TextInput onChangeText={(text) => store.start = text}/>
        <Text>{store.start}</Text>
      </View>
    );
  }
}

Inputpage.propTypes = {
  screenProps: PropTypes.object.isRequired,// screenProps传进来的就是appStore ，这里做一下检测，要求screenProps是一个object
}
