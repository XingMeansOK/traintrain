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
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
const { height, width } = Dimensions.get('window');

@inject("store") @observer
export default class Resultpage extends Component {
  static navigationOptions = {
    // header: null
    tabBarVisible: false
  }
  constructor(props) {
    super(props);
    const { navigate } = props.navigation;
    props.store.navigate = props.store.navigate? props.store.navigate:navigate;

    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.viewpager = null;
    this.state = {
      dataSource: null,
      currentPage:0
    }
    /*
      首先哈，缩一下这个操蛋的问题哈
      viewpager他的这个dataSource.cloneWithPages(pages)方法哈，尼玛只能在构造函数利用？？？然后哈，尼玛mobx的observable数据穿进去用不了？？？
      然后哈，尼玛这还怎么自动render了，尼玛还必须得dataSource.cloneWithPages(pages)放state里？？？

      尼玛幸好机制啊，构造函数里放个autorun。好滴下面开始解释代码
      首先autorun写出来就会马上执行一次，所以在第一次render的时候还是有数据源的，虽然没有数据
      之后哈，当我从服务器中抓出来乘车方案之后哈，存到store里了么，store这不变了么，autorun里面不用到了store的数据了么，然后autorun就会执行了
      然后给这个viewpager更新数据源，然后抓过来的方案就渲染上了
    */
    const disposer = autorun(() => {
    // 先对数据进行预处理(observable的数据类型不能直接用)
      let pages = this.props.store.planInfo?
        CLASSIFYTYPES.map( TYPE => this.props.store.planInfo[TYPE] )
        : [];// 每种分类下都是一个数组(元素是每一个方案)

      this.state.dataSource?
        this.setState({dataSource: this.dataSource.cloneWithPages(pages)})
        : this.state.dataSource = this.dataSource.cloneWithPages(pages);
    })
  }

  renderViewPagerPage = (data) => {
    return(
      <ScrollView style={styles.page}>
        <PlanCard/>
        <PlanCard/>
      </ScrollView>
    )
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#ccc'}}>
        <ViewPager
          ref={(viewpager) => {this.viewpager = viewpager}}
          dataSource={this.state.dataSource}
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
