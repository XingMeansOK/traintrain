import React, { Component } from 'react';
import {
  BottomSheetBehavior
} from 'react-native-bottom-sheet-behavior';
import {inject, observer} from 'mobx-react';
import BottomSheet from './bottomsheet';
import { ANCHORPOINT, PEEKHEIGHT } from './constant';

@inject("store") @observer
export default class BottomSheetBehaviorWrapper extends Component {
  // handleSlide(e) {
  //   this.offset = e.nativeEvent.offset
  // }

  // handleBottomSheetChange(e) {
  //   this.lastState = e.nativeEvent.state
  // }
  render() {

    return (
      <BottomSheetBehavior
        anchorEnabled
        peekHeight={PEEKHEIGHT}
        anchorPoint={ANCHORPOINT}
        hideable={false}
        ref={ref => {this.props.store.bottomSheetRef = ref}}
        onSlide={this.handleSlide}
        onStateChange={this.handleBottomSheetChange}
      >
        <BottomSheet/>
      </BottomSheetBehavior>
    )
  }
}
