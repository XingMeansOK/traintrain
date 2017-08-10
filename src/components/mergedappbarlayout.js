import React, { Component } from 'react'
import {
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  MergedAppBarLayout,
  BottomSheetBehavior
} from 'react-native-bottom-sheet-behavior';
import {inject, observer} from 'mobx-react';
import { RESULTPAGE, INPUTPAGE, URL, CLASSIFYTYPES } from './constant';

@inject("store") @observer
export default class MergedAppBarLayoutWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    };
  }

  bottomSheetCollapsed = () => {
    if(this.props.store.bottomSheetRef) {
      this.props.store.bottomSheetRef.setBottomSheetState(BottomSheetBehavior.STATE_COLLAPSED);
    }
  }

  handleActions = (actionIndex) => {
    switch (actionIndex) {
      case 0:
        this.props.store.navigate(INPUTPAGE);
        break;
      case 1:
        this.props.store.navigate(RESULTPAGE);
        break;
      case 2:
        this.sendRequest();
        break;
      default:
    }
  }

  async sendRequest() {
    let request = new Request(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `start=${this.props.store.start}&destination=${this.props.store.destination}`
    });
    try {
      let response = await fetch(request);
      if(response.ok){
          let responseJson = await response.json();
          var index = 0
          // 存入store前先对数据进行预处理
          CLASSIFYTYPES.forEach( TYPE => {
            // 每种分类下都是一个数组(元素是每一个方案)，便利数组，为每种方案添加一个是否选中的属性以及方案的编号属性
            responseJson[TYPE].forEach( plan => {
              plan.selected = false;
              plan.index = index++;
            });
          })
          this.props.store.planInfo = responseJson;
      }else{
          Alert.alert('提示','请求失败',[{text: '确定', onPress: () => console.log('OK Pressed!')},]);
      }

    } catch(error) {
      console.error(error);
    }

  }

  render() {
    return (
        <MergedAppBarLayout
          translucent
          mergedColor={this.state.color}
          toolbarColor={this.state.color}
          statusBarColor={this.state.color}
          style={styles.appBarMerged}>
          <Icon.ToolbarAndroid
            navIconName='md-arrow-round-down'
            overflowIconName='md-more'
            title='方案'
            titleColor="#000"
            style={{elevation: 6}}
            actions={[
              {title: 'Search', show: 'always', iconName: 'md-search'},
              {title: '重新选'},
              {title: '测试用发送请求'}
            ]}
            onActionSelected={this.handleActions}
            onIconClicked={this.bottomSheetCollapsed}>
          </Icon.ToolbarAndroid>
        </MergedAppBarLayout>
    )
  }
}

const styles = StyleSheet.create({
  appBarMerged: {
    backgroundColor: 'transparent',
  }
})
