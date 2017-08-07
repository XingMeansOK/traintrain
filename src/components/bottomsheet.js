import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ViewPager from 'react-native-viewpager';
import { ANCHORPOINT, PEEKHEIGHT, BLUESTYLECOLOR } from './constant';
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
    backgroundColor: '#fff'
  },
  bottomSheetHeader: {
    backgroundColor: BLUESTYLECOLOR,
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  page: {
    height:ANCHORPOINT-PEEKHEIGHT-20,
    width: width-20,
    padding: 10,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    borderRadius: 10,
  },
  bottomSheetContent: {
    height:height-ANCHORPOINT+10,
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
