import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  ScrollingAppBarLayout,
  CoordinatorLayout,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior';
import SMap from './map';
import BottomSheetBehaviorWrapper from './bottomsheetbehavior';
import MergedAppBarLayoutWrapper from './mergedappbarlayout';
import {inject, observer} from 'mobx-react';
import { INPUTPAGE } from './constant';

@inject("store") @observer
export default class Mappage extends Component {
  constructor(props) {
    super(props);
    const { navigate } = props.navigation;
    props.store.navigate = navigate;
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#205cb2' />
        <ScrollingAppBarLayout
          translucent
          style={styles.scrollAppBar}
          statusBarColor='#205cb2'>
          <Icon.ToolbarAndroid
            navIconName={'md-search'}
            style={styles.toolbar}
            titleColor="#fff"
            title="休坡卖坡"
            onIconClicked={() => this.props.store.navigate(INPUTPAGE)}
            />
        </ScrollingAppBarLayout>
          <SMap/>
        <BottomSheetBehaviorWrapper/>
        <MergedAppBarLayoutWrapper/>
        <FloatingActionButton
          autoAnchor
          elevation={18}
          backgroundColor={'#ffffff'}
          rippleColor="grey"
        />
      </CoordinatorLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollAppBar: {
    zIndex: 1,
  },
  toolbar: {
    backgroundColor: '#4389f2',
  }
})
