import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ViewPager from 'react-native-viewpager';
import { ANCHORPOINT, PEEKHEIGHT, BLUESTYLECOLOR,getWidthPercent,getHeightPercent,ICONCOLOR,TRANSFCOLOR } from './constant';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
// import {Icon as Iconaf} from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');
const secondIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

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
      currentPage:0,
    }
  }
  /*
    渲染viewpager每一页的方法
  */
  renderViewPagerPage = (planInfo) => {
    if( typeof planInfo == 'string' ) {
      return(
        <View style={styles.page}>
          <Text>{planInfo}</Text>
        </View>)
    }
    let stationLine = '';
    let count = 0; //总车站个数
    planInfo.stations.forEach(train => {
      stationLine+=` ${train[0].name}→${train[train.length-1].name} `;
      count+=train.length;
    })

    return(
      <View style={styles.page}>
        <View style={styles.text}>
          <Text>{typeof planInfo.trainNumber == 'string'? planInfo.trainNumber: planInfo.trainNumber.join('→')}</Text>
        </View>
        <View style={styles.text}>
          <Text>{stationLine}</Text>
        </View>
        <View style={styles.text}>
          <Text>{`${planInfo.stations[0][0].startTime}出发，历时${parseInt(planInfo.time/60)}小时${parseInt(planInfo.time%60)}分钟，共${count}站`}</Text>
        </View>
      </View>)

  }

  renderBottomPage = (station) => {
    return (
        <View style={styles.bottomPage}>
        <View style={styles.bottomText}>
          <Text style={styles.font}>{station.name}</Text>
          {station.additional&&<Text style={styles.font}>{`${station.additional}`}</Text>}
        </View>
        <View style={styles.bottomText}>
          <Text style={styles.font}>{`到站时间 ${station.arriveTime}`}</Text>
          <Text style={styles.font}>{`出站时间 ${station.startTime}`}</Text>
        </View>
        </View>
      )
  }

  setCurrentPage = (pageIndex) => {
    Array.prototype.contains = function (obj) {
      var i = this.length;
      while (i--) {
          if (this[i] === obj) {
              return true;
          }
      }
      return false;
    }
    if(this.props.store.expandedInfo.mainStationIndex.contains(pageIndex)) {
      this.setState({currentPage:this.props.store.expandedInfo.mainStationIndex.indexOf(pageIndex)})
    }

  }

  renderIndicator = () => {
    if(this.props.store.expandedInfo) {
      return (
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={secondIndicatorStyles}
              stepCount={this.props.store.expandedInfo.mainStations.length}
              currentPosition={this.state.currentPage}
              labels={this.props.store.expandedInfo.mainStations}
              />
          </View>
      )
    } else {
      return null
    }
  }
  renderBottom = () => {
    if(this.props.store.expandedInfo) {
      return (
        <ViewPager
          dataSource={this.dataSource.cloneWithPages(this.props.store.expandedInfo.allStations)}
          renderPage={this.renderBottomPage}
          onChangePage={(page) => {this.setCurrentPage(page)}}
        />
      )
    } else {
      return null
    }
  }


  render() { // (observable的数据类型不能给viewpager直接用？？？不清楚。。。)
    return (

      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>

          <Icon
            name='md-remove'
            color='#fff'
            size={55}
            style={{elevation:8,opacity:0.4}}

          />

        </View>
        <ViewPager
          ref={(viewpager) => {this.viewpager = viewpager}}
          dataSource={this.dataSource.cloneWithPages(this.props.store.cabinet)}
          renderPage={this.renderViewPagerPage}
          onChangePage={(page) => {this.props.store.currentRenderIndex = page}}
        />
        <View style={{height:height-ANCHORPOINT+88}}>
        {this.renderIndicator()}
        {this.renderBottom()}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  bottomSheet: {
    height,
    flexDirection:'column',
    backgroundColor: '#fff'
  },
  stepIndicator: {
    marginTop:30,
  },
  bottomSheetHeader: {
    backgroundColor: BLUESTYLECOLOR,
    // padding: 20,
    // marginBottom:20,
    height:PEEKHEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  page: {
    height:ANCHORPOINT-PEEKHEIGHT-100,
    // height:ANCHORPOINT-PEEKHEIGHT-20,
    width: width-20,
    padding: 10,
    alignItems: 'center',
    // justifyContent:'center',
    borderWidth: 3,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    borderRadius: 10,
  },
  bottomPage: {
    height:ANCHORPOINT-PEEKHEIGHT+100,
    width: width,
    padding: 60,
    justifyContent:'space-between',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  bottomSheetContent: {
    height:height-ANCHORPOINT+70,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  font: {
    fontSize: 16,
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom:50
  }
});
