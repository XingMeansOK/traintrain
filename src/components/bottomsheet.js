import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ViewPager from 'react-native-viewpager';
import { ANCHORPOINT, PEEKHEIGHT } from './constant';
const { height, width } = Dimensions.get('window');

@inject("store") @observer
export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    const PAGES = ['Page 1','Page 2','Page 3','Page 4','Page 5'];
    this.state = {
      dataSource: dataSource.cloneWithPages(PAGES),
      currentPage:0
    }
  }


  // <ViewPager
  //   dataSource={this.state.dataSource}
  //   renderPage={this.renderViewPagerPage}
  //   onChangePage={(page) => {this.setState({currentPage:page})}}
  // />

  // <View style={styles.bottomSheetContent}>
  // </View>

  renderViewPagerPage = (data) => {
    return(<View style={styles.page}>
      <Text>{data}</Text>
    </View>)
  }

  render() {
    return (
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.label}>可以划</Text>
        </View>
        <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderViewPagerPage}
          onChangePage={(page) => {this.setState({currentPage:page})}}
        />
        <View style={styles.bottomSheetContent}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomSheet: {
    height,
    backgroundColor: '#fff',
  },
  bottomSheetHeader: {
    backgroundColor: '#4389f2',
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  page: {
    height:ANCHORPOINT-PEEKHEIGHT-20,
    width: width-20,
    padding: 12,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#ccc',
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
  }
});
