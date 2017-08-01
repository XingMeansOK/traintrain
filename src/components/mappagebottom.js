/*

用于测试mobx-react的provider和inject的组件，仅仅用于测试

*/





import {
  Button,
  StyleSheet
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject("store") @observer
export default class MapPageBottom extends Component {
  render() {
    let store = this.props.store;
    if(store.searched) {
      return (
        <Button
          onPress={() => {store.searched=!store.searched;}}
          title="已输入"
        />
      )
    } else {
      return (
        <Button
          onPress={() => {store.searched=!store.searched;}}
          title="未输入"
        />
      )
    }

  }
}
