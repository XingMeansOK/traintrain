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

  render() {
    const cardStyle = this.state.expanded? 'bigcard':'card';
    const iconName = this.state.selected? 'md-checkmark':'md-expand';
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles[cardStyle]}>
          <TouchableOpacity onPress={this.handleSelect}>
            <Icon name={iconName} style={styles.actionButtonIcon} />
            <Text>{`x坐标${this.planInfo.x}, y坐标${this.planInfo.y}`}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    height: 150,
    padding: 15,
  },
  bigcard: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    height: 250,
    padding: 15,
  },
  actionButtonIcon: {
    fontSize: 40,
    color: 'green',
  },
});
