import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  Button,
  StatusBar,
  ViewPagerAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  MergedAppBarLayout,
  ScrollingAppBarLayout,
  CoordinatorLayout,
  BackdropBottomSheet,
  BottomSheetBehavior,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'
import SMap from './map'

const { height, width } = Dimensions.get('window')


export default class Mappage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    };
  }
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  static navigationOptions = {
    header: null
  };

  handleState = (state) => {
    this.bottomSheet.setBottomSheetState(state)
  }

  handleColor = () => {
    this.setState({
      color: this.state.color === 'red' ? 'blue' : 'red'
    })
  }

  handleSlide(e) {
    this.offset = e.nativeEvent.offset
  }

  handleBottomSheetChange(e) {
    this.lastState = e.nativeEvent.state
  }

  renderImage(source) {
    return (
      <View>
        <Image
          resizeMode="cover"
          style={{width, height: 300}}
          source={source}
        />
      </View>
    )
  }

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#205cb2' />
        <ScrollingAppBarLayout
          translucent
          style={styles.scrollAppBar}
          statusBarColor='#205cb2'>
          <Icon.ToolbarAndroid
            navIconName={'md-menu'}
            style={styles.toolbar}
            titleColor="#fff"
            title="休坡卖坡"
            onIconClicked={() => this.context.openDrawer()}
            />
        </ScrollingAppBarLayout>
        <View style={styles.content}>
          <View style={styles.containerMap}>
            <SMap/>
          </View>
        </View>
        <BottomSheetBehavior
          anchorEnabled
          peekHeight={80}
          hideable={false}
          ref={ref => {this.bottomSheet = ref}}
          onSlide={this.handleSlide}
          onStateChange={this.handleBottomSheetChange}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>可以划上去</Text>
            </View>
            <View style={styles.bottomSheetContent}>
              <Button title='Change Color' onPress={this.handleColor} />
            </View>
          </View>
        </BottomSheetBehavior>
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
            titleColor="#fff"
            style={{elevation: 6}}
            actions={[
              {title: 'Search', show: 'always', iconName: 'md-search' },
              {title: 'More'}
            ]}
            onIconClicked={() => this.handleState(BottomSheetBehavior.STATE_COLLAPSED)}>
          </Icon.ToolbarAndroid>
        </MergedAppBarLayout>
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  containerMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollAppBar: {
    zIndex: 1,
  },
  toolbar: {
    backgroundColor: '#4389f2',
  },
  appBarMerged: {
    backgroundColor: 'transparent',
  },
  bottomSheet: {
    height,
    backgroundColor: '#4389f2',
  },
  bottomSheetHeader: {
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})
