import React, { Component } from 'react';
import {
  BottomSheetBehavior
} from 'react-native-bottom-sheet-behavior';
import {Dimensions,View} from 'react-native';
import {inject, observer} from 'mobx-react';
import BottomSheet from './bottomsheet';
import { ANCHORPOINT, PEEKHEIGHT } from './constant';
const { height } = Dimensions.get('window');

@inject("store") @observer
export default class BottomSheetBehaviorWrapper extends Component {
  // handleSlide(e) {
  //   this.offset = e.nativeEvent.offset
  // }BottomSheetHeader

  // handleBottomSheetChange(e) {
  //   this.lastState = e.nativeEvent.state
  // }
  render() {

    return (

      <BottomSheetBehavior
        anchorEnabled
        // peekHeight={PEEKHEIGHT-20}
        peekHeight={PEEKHEIGHT}

        // anchorPoint={ANCHORPOINT}

        anchorPoint={parseInt(height-24-(ANCHORPOINT-PEEKHEIGHT-100)-PEEKHEIGHT)}
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
