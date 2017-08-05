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
import { ANCHORPOINT, PEEKHEIGHT, BLUESTYLECOLOR, MAPPAGE, INPUTPAGE } from './constant';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {inject, observer} from 'mobx-react';
const { height, width } = Dimensions.get('window');

@inject("store") @observer
export default class Resultpage extends Component {
  static navigationOptions = {
    // header: null
    tabBarVisible: false
  }
  constructor(props) {
    super(props);
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    const PAGES = ['Page 1','Page 2','Page 3'];
    this.viewpager = null;
    this.state = {
      dataSource: dataSource.cloneWithPages(PAGES),
      currentPage:0
    }
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
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="时间最少" onPress={() => this.viewpager.goToPage(0)}>
            <Icon name="md-time" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="最省事" onPress={() => this.viewpager.goToPage(1)}>
            <Icon name="md-git-pull-request" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="花费最少" onPress={() => this.viewpager.goToPage(2)}>
            <Icon name="md-walk" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#f90' title="重新选择路线" onPress={() => this.props.store.navigate(INPUTPAGE)}>
            <Icon name="md-refresh" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#00CCFF' title="比较路线" onPress={() => this.props.store.navigate(MAPPAGE)}>
            <Icon name="md-train" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
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
