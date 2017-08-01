/*

@deprecated  原始版本的mappage,已经弃用，但是可以和mappagebottom一起测试mobx-react的provider和inject

*/

import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import React, {Component} from 'react';
import { INPUTPAGE } from './constant';
import Map from './map';
import MapPageBottom from './mappagebottom';

export default class Mappage extends Component {
  static navigationOptions = {
    title: 'map',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Map/>
        <MapPageBottom/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
