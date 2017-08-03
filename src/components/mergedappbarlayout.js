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

  render() {
    return (
        <MergedAppBarLayout
          translucent
          mergedColor={this.state.color}
          toolbarColor={this.state.color}
          statusBarColor={this.state.color}
          style={styles.appBarMerged}>
          <Icon.ToolbarAndroid
            navIconName='md-arrow-back'
            overflowIconName='md-more'
            title='方案'
            titleColor="#000"
            style={{elevation: 6}}
            actions={[
              {title: 'Search', show: 'always', iconName: 'md-search' },
              {title: 'More'}
            ]}
            onIconClicked={() => this.bottomSheetCollapsed()}>
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
