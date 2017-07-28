import {
  Text,
  View,
  Button
} from 'react-native';
import React, {Component} from 'react';
import { MAPPAGE } from './constant';

export default class Resultpage extends Component {
  static navigationOptions = {
    title: 'result',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>这里显示结果</Text>
        <Button
          onPress={() => navigate(MAPPAGE)}
          title="展示"
        />
      </View>
    );
  }
}
