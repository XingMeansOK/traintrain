import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import { MAPPAGE } from './constant';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import PlanCard from './plancard';


export default class Resultpage extends Component {
  static navigationOptions = {
    header: null
  }

  render() {

    return (
        <ScrollableTabView
        style={{marginTop: 20, }}
        initialPage={1}
        renderTabBar={() => <DefaultTabBar activeTextColor='#4389f2' />}
        >
          <ScrollView tabLabel="最快" style={styles.tabView}>
          </ScrollView>
          <ScrollView tabLabel="省事" style={styles.tabView}>
            <PlanCard/>
            <PlanCard/>
            <PlanCard/>
            <PlanCard/>
            <PlanCard/>
          </ScrollView>
          <ScrollView tabLabel="省钱" style={styles.tabView}>
          </ScrollView>
      </ScrollableTabView>
    )
  }
}




const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  }
});
