import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React, {Component} from 'react';
import PlanCard from './plancard';
import ViewPager from 'react-native-viewpager';
import { ANCHORPOINT, PEEKHEIGHT, BLUESTYLECOLOR, MAPPAGE, INPUTPAGE, CLASSIFYTYPES } from './constant';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { autorun } from 'mobx';
import { inject, observer, computed } from 'mobx-react';
const { height, width } = Dimensions.get('window');
/*
  用于展示所有查询结果的页面，按照规定的分类方式，将推荐的乘车方案分别展示于几页当中
*/
@inject("store") @observer
export default class Resultpage extends Component {
  static navigationOptions = {
    // header: null
    tabBarVisible: false
  }
  constructor(props) {
    super(props);
    // 将tab页之间的导航函数保存到store中，方便全局在任何地方都能调用
    const { navigate } = props.navigation;
    props.store.navigate = props.store.navigate? props.store.navigate:navigate;
    // 创建viewpager的数据源
    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    // 持有viewpager的ref，用于viewpager页面间的跳转
    this.viewpager = null;
    // state中保存当前页面的索引
    this.state = {
      currentPage:0
    }
  }
  /*
    渲染viewpager每一页的内容，每一页中使用PlanCard来表示一个具体方案
  */
  renderViewPagerPage = (data) => {
    return(
      <ScrollView style={styles.page}>
        {data.map( (planInfo, index) => <PlanCard key={index} planInfo={planInfo}/> )}
      </ScrollView>
    )
  }

  /*
    因为render方法中使用了store中@computed的数据pages，所以，当pages改变的时候，render就会自动调用
    ps： pages会因为从服务器中取得数据就自动改变
  */
  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#ccc'}}>
        <ViewPager
          ref={(viewpager) => {this.viewpager = viewpager}}
          dataSource={this.dataSource.cloneWithPages(this.props.store.pages)}
          renderPage={this.renderViewPagerPage}
          onChangePage={(page) => {this.setState({currentPage:page})}}
        />
      </View>
    )
  }
}




const styles = StyleSheet.create({
  page: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});
