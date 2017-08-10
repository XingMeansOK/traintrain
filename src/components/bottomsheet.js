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
/*
  地图页下方的活动页的内容
  主要包括三部分bottomSheetHeader，一个ViewPager，bottomSheetContent
  viewpager的作用是展示在resultpage选中的乘车方案，bottomsheetcontent中展示当前viewpager显示方案的详细信息
  同时，viewpager在切换到一个方案的时候，地图上渲染的就是对应的方案
*/
@inject("store") @observer
export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    // 创建viewpager的数据源
    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      currentPage:0
    }
  }
  /*
    渲染viewpager每一页的方法
  */
  renderViewPagerPage = (data) => {
    return(<View style={styles.page}>
      <Text>{data.index||data}</Text>
    </View>)
  }

  render() { // (observable的数据类型不能给viewpager直接用？？？不清楚。。。)
    return (
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.label}>可以划</Text>
        </View>
        <ViewPager
          ref={(viewpager) => {this.viewpager = viewpager}}
          dataSource={this.dataSource.cloneWithPages(this.props.store.cabinet)}
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
