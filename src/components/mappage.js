import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import React, {Component} from 'react';
import { INPUTPAGE } from './constant';
import Map from './map';

export default class Mappage extends Component {
  static navigationOptions = {
    title: 'map',
  };
  render() {
    const { navigate } = this.props.navigation;
    // <Button
    //   onPress={() => navigate(INPUTPAGE)}
    //   title="输入"
    // />
    return (
      <View style={styles.container}>
        <Map/>
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
