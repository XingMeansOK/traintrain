import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import { MAXSELECTEDPLAN } from './constant';
/*
  用于展示单独一个乘车方案的卡片组件，
  当一个卡片被选中，他所代表的信息将展示在第一个地图页中
*/
@inject('store') @observer
export default class PlanCard extends Component {
  constructor(props) {
    super(props);
    /*
      expanded为真的时候，卡片是大的，展示更加详细的信息
    */
    this.state = {expanded: false, selected: false};
    this.planInfo = this.props.planInfo;
  }
  /*
    点击卡片改变state：expand
  */
  handlePress = () => {
    this.setState({expanded: !this.state.expanded})
  }
  /*
    处理卡片上check的点击
  */
  handleSelect = () => {
    if(!this.state.selected) {// 要选择一个方案
      if(this.props.store.pickAbility) { // 判断已选方案是否已经足够多了，如果已经选满了发出提示
        this.props.store.selectedPlans.push(this.planInfo); // 将当前卡片所代表的信息加入到store中
        this.setState({selected: !this.state.selected});
      } else {
        Alert.alert('提示','满了',[{text: '确定', onPress: () => console.log('OK Pressed!')},]);
      }

    } else { // 取消选择一个方案
      for(let i = 0; i < this.props.store.selectedPlans.length; i++) {
        // 如果selectedPlans中方案的序号（方案本身的一个序号属性，不是在selectedPlans中的索引）和当前卡片的序号相同
        // 将当前卡片多代表的方案从selectedPlans中删除
        if(this.planInfo.index == this.props.store.selectedPlans[i].index) {
          this.props.store.selectedPlans.splice(i, 1);
          this.setState({selected: !this.state.selected});
          return;
        }
      }
    }

  }
  /*
    渲染主要的车站（各个车次的上车站和下车站）
  */
  renderMainStations = () => {
    return (
      <View style={styles.mainStations}>
        {this.planInfo.stations.map((train, index) => <Text key={index}>{`${train[0].name}→${train[train.length-1].name}`}</Text>)}
      </View>
    )
  }
  /*
    渲染车次
  */
  renderTrainNumber = () => {
    return (
      <View style={styles.mainStations}>
        {this.planInfo.trainNumber instanceof Array? (this.planInfo.trainNumber.map((trainNumber, index) => <Text key={index}>{trainNumber}</Text>)): (<Text>{this.planInfo.trainNumber}</Text>)}
      </View>
    )
  }
  /*
    渲染最上部 ，checkbox和总时间
  */
  renderHeader = () => {
    const iconName = this.state.selected? 'md-checkmark':'md-expand';
    return (
      <View style={styles.mainStations}>
        <TouchableOpacity style={{width:50}} onPress={this.handleSelect}>
          <Icon name={iconName} style={styles.actionButtonIcon} />
        </TouchableOpacity>
        <Text>{`总时长: ${this.planInfo.time}分钟`}</Text>
      </View>
    )
  }
  /*
    渲染换乘信息
  */
  renderTransferInfo = () => {
    // 是否是直达车
    const needTransfer = this.planInfo.trainNumber instanceof Array;
    var transInSameStation = 0;// 同车站换乘次数
    var transInCity = 0; // 市内换乘次数
    if(needTransfer) {
      this.planInfo.stations[0][this.planInfo.stations[0].length-1].name == this.planInfo.stations[1][0].name? transInSameStation++: transInCity++;
      if(this.planInfo.trainNumber.length == 3) {
        this.planInfo.stations[1][this.planInfo.stations[1].length-1].name == this.planInfo.stations[2][0].name? transInSameStation++: transInCity++;
      }
    }
    return (
      <View>
        <View style={styles.mainStations}>
          {needTransfer? (<Text>{`当前乘车方案需要换乘`}</Text>): (<Text>{`当前乘车方案是乘坐直达车，不需要换乘`}</Text>)}
        </View>
        <View style={styles.mainStations}>
          <Text>{`需要换乘${transInSameStation+transInCity}次`}</Text>
          <Text>{`${transInSameStation}次站内换乘，${transInCity}次市内换乘`}</Text>
        </View>
      </View>
    )
  }
  renderBottom = () => {
    var count = 0; //总车站个数
    this.planInfo.stations.forEach(train => {count = count + train.length});
    return (
      <View style={styles.mainStations}>
        <Text>{`共经过${count}个车站`}</Text>
        {this.planInfo.isFastest? (<Text>{`时间短`}</Text>): null}
      </View>
    )
  }
  // {this.planInfo.isFastest? (<Text>{'本页时间最短'}</Text>):null}

  render() {
    if(this.planInfo.hasOwnProperty('defaultInfo')) {
      return (
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.card}>
              <Text>{this.planInfo.defaultInfo}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.wrapper}>
        <View style={styles.card}>
          {this.renderHeader()}
          {this.renderMainStations()}
          {this.renderTrainNumber()}
          <View></View>
        </View>
        <Collapsible collapsed={!this.state.expanded}>
          <View style={styles.hiddenCard}>
            {this.renderTransferInfo()}
            {this.renderBottom()}
          </View>
        </Collapsible>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    height: 150,
    paddingHorizontal: 15,
    paddingTop:3
  },
  hiddenCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 150,
    padding: 15,
  },
  wrapper: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  mainStations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  actionButtonIcon: {
    fontSize: 40,
    color: 'green',
  },
});
