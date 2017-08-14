import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ViewPager from 'react-native-viewpager';
import { ANCHORPOINT, PEEKHEIGHT, BLUESTYLECOLOR,getWidthPercent,getHeightPercent,ICONCOLOR,TRANSFCOLOR } from './constant';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
// import {Icon as Iconaf} from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');

/*
  地图页下方的活动页的内容
  主要包括三部分bottomSheetHeader，一个ViewPager，bottomSheetContent
  viewpager的作用是展示在resultpage选中的乘车方案，bottomsheetcontent中展示当前viewpager显示方案的详细信息
  同时，viewpager在切换到一个方案的时候，地图上渲染的就是对应的方案
*/
var result=require('./record.json');
var direct=result.zero;
var once=result.once;
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
      collapsedstart: true,
      collapsedtransf1: true,
      collapsedtransf2: true,
    }
  }

  arriveDay(planInfo){
    var timeleft=parseInt(planInfo.time-(1440-(parseInt(planInfo.stations[0][0].startTime.split(":")[0])*60+parseInt(planInfo.stations[0][0].startTime.split(":")[1]))
                 ));
    var arrive='';
    if(timeleft<0){
      arrive=planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;
    }else{
      switch(parseInt(timeleft/1440)){
        case 0: arrive='次日'+planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;break;
        case 1: arrive='第三天'+planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;break;
        case 2: arrive='第四天'+planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;break;
        default:arrive='a longlong';break;
      }
    }
    return (arrive);
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
        <Text>{typeof planInfo.trainNumber == 'string'? planInfo.trainNumber: planInfo.trainNumber.join('→')}</Text>
        <Text>{stationLine}</Text>
        <Text>
          {parseInt(planInfo.time/60)}小时{parseInt(planInfo.time%60)}分钟
        </Text>
        <Text>
          {planInfo.stations[0][0].startTime+'至'}
        </Text>
        <Text>
          {`共${count}站`}
        </Text>
      </View>)

  }
  renderStrat(){
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='ios-train'
          color={ICONCOLOR}
          size={30}/>
        <Text style={{color:ICONCOLOR}}>{18}小时</Text>
      </View>
      <View style={styles.stationhidecont}>

        <View style={styles.stationlistcont}>
          <View style={styles.icontxtcont}>
            <Icon
              name='md-arrow-dropdown-circle'
              style={styles.lefticon}
              color={ICONCOLOR}
              size={15}/>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Text style={styles.starttxt}>北京站</Text>
              <Text style={styles.trainnumtxt}>G101</Text>
            </View>
            <Text style={styles.trftimetxt}>发:{9}:{35}</Text>
            <TouchableOpacity
              onPress={() => {this.setState({ collapsedstart: !this.state.collapsedstart });}}
            >
              <View style={styles.stanumcont}>
                <Text style={styles.stanumtxt}>{17}站</Text>
                <Icon
                  style={styles.downbtn}
                  name="ios-arrow-down"
                  size={15}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-30}}/>
            <Collapsible collapsed={this.state.collapsedstart}>
              <ScrollView>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.passtxt}> ·途径站点</Text>
                  <Text>到:{10}:{35}</Text>
                  <Text>  </Text>
                  <Text>发:{10}:{37}</Text>
                </View>
                <Text style={styles.passtxt}> · 途径站点</Text>
                <Text style={styles.passtxt}> ·途径站点</Text>
                <Text style={styles.passtxt}> ·途径站点</Text>
              </ScrollView>
            </Collapsible>
          </View>
        </View>
      </View>
      </View>
    )
  }
  renderTransInSta(){
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='md-walk'
          size={29}
          color={TRANSFCOLOR}
          style={{marginTop:0}}
        />
        <Text style={{color:TRANSFCOLOR}}>{1}小时</Text>
      </View>
      <View style={styles.stationhidecont}>

        <View style={styles.stationlistcont}>
          <View style={styles.icontxtcont}>
            <Icon
              name='md-arrow-dropdown-circle'
              style={ {marginRight:5,marginTop:1.5}}
              color={TRANSFCOLOR}
              size={15}/>
            <View style={{flexDirection:'column',alignItems:'flex-start'}}>
              <Text style={styles.transftxt}>武汉站</Text>
              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                <Icon
                  name='md-sync'
                  size={22}
                  style={{marginLeft:10,marginRight:3,color:'#b3b3b3'}}
                />
                <Text style={styles.othertxt}>站内换乘</Text>
              </View>
            </View>
            <Text style={styles.trftimetxt}>到:{13}:{35}</Text>
          </View>
          <View>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-80,height:39}}/>
          </View>
          <View>
            <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-28,height:28}}/>
          </View>
        </View>
      </View>
        </View>
    )
  }

  renderTransInCity(){
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='md-bus'
          size={28}
          color={TRANSFCOLOR}
        />
        <Text style={{color:TRANSFCOLOR}}>{1}小时</Text>
      </View>
      <View style={styles.stationhidecont}>

        <View style={styles.stationlistcont}>
          <View style={styles.icontxtcont}>
            <Icon
              name='md-arrow-dropdown-circle'
              style={ {marginRight:5,marginTop:1.5}}
              color={TRANSFCOLOR}
              size={15}/>
            <View style={{flexDirection:'column',alignItems:'flex-start'}}>
              <Text style={styles.transftxt}>汉口站</Text>
              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                <Icon
                  name='md-sync'
                  size={22}
                  style={{marginLeft:10,marginRight:3,color:'#b3b3b3'}}
                />
                <Text style={styles.othertxt}>市内换乘</Text>
              </View>
            </View>
            <Text style={styles.trftimetxt}>到:{13}:{35}</Text>
          </View>
          <View>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-80,height:39}}/>
          </View>
          <View>
            <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-28,height:28}}/>
          </View>
        </View>
      </View>
        </View>
    )
  }
  // <View style={{width:3,backgroundColor:'red',marginTop:-90}}/>
  renderTransf(){
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='ios-train'
          size={30}
          color={ICONCOLOR}
        />
        <Text style={{color:ICONCOLOR}}>{18}小时</Text>
      </View>
      <View style={styles.stationhidecont}>

        <View style={styles.stationlistcont}>
          <View style={styles.icontxtcont}>
            <Icon
              name='md-arrow-dropdown-circle'
              style={styles.lefticon}
              color={TRANSFCOLOR}
              size={15}/>
            <View style={{flexDirection:'column',alignItems:'center'}}>
              <Text style={styles.starttxt}>武汉站</Text>
              <Text style={styles.trainnumtxt}>G102</Text>
            </View>
            <Text style={styles.trftimetxt}>发:{14}:{35}</Text>

            <TouchableOpacity
              onPress={() => {this.setState({ collapsedtransf1: !this.state.collapsedtransf1 });}}
            >
              <View style={styles.stanumcont}>
                <Text style={styles.stanumtxt}>{17}站</Text>
                <Icon
                  style={styles.downbtn}
                  name="ios-arrow-down"
                  size={15}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-80,height:45}}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-29}}/>
            <Collapsible collapsed={this.state.collapsedtransf1}>
              <ScrollView>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.passtxt}>·途径站点</Text>
                  <Text style={styles.passtxt}>到:{10}:{35}</Text>
                  <Text>  </Text>
                  <Text>发:{10}:{37}</Text>
                </View>
                <Text style={styles.passtxt}>·途径站点</Text>
                <Text style={styles.passtxt}>·途径站点</Text>
                <Text style={styles.passtxt}>·途径站点</Text>
              </ScrollView>
            </Collapsible>
          </View>
        </View>
      </View>
    </View>
    )
  }

  renderArrv(){
    return(
      <View style={styles.stationhidecont}>
        <View style={styles.icontimecont} />

        <View style={styles.stationlistcont}>
        <View style={styles.icontxtcont}>

          <Icon
            name='ios-radio-button-on'
            style={styles.lefticon}
            color={ICONCOLOR}
            size={15}/>
          <Text style={styles.starttxt}>厦门站</Text>
          <Text>到:{22}:{35}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-70,height:30}}/>
        </View>
          </View>
        </View>
    )


  }

  render() { // (observable的数据类型不能给viewpager直接用？？？不清楚。。。)
    return (
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.label}>可以划</Text>
        </View>
        <View style={{flexDirection: 'column',flex:1}}>
          <ViewPager
            ref={(viewpager) => {this.viewpager = viewpager}}
            dataSource={this.dataSource.cloneWithPages(this.props.store.cabinet)}
            renderPage={this.renderViewPagerPage}
            onChangePage={(page) => {this.props.store.currentRenderIndex = page}}
          />
          <View style={styles.bottomSheetContent}>
            <ScrollView
              overScrollMode='always'
            >

              {this.renderStrat()}
              {this.renderTransInSta()}
              {this.renderTransf()}
              {this.renderArrv()}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
////////////////////////new
  allcontainer:{
    flexDirection:'row',
    alignItems:'flex-end'},
  icontimecont:{
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'#fff',
    width:50,
    marginTop:20
    // paddingTop:50
  },
  icontxtcont:{
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'#ff4d4d',
    backgroundColor:'#fff',
    height:70,
    width:getWidthPercent(80)
  },
  stationlistcont:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    // backgroundColor:'#ffcccc',
    backgroundColor:'#fff',

    // marginBottom:50
    // width:300,
    // borderLeftWidth:2,
    // borderLeftColor:'red'
  },
  stationhidecont:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#fff',
    // backgroundColor:'#999999',
    width:getWidthPercent(90),
    // justifyContent:'space-between'
  },
  stanumcont:{
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft:120,
    // paddingRight:10,
    // marginRight:20,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"red",
    position:'relative',
    right:1


  },
  othertxt:{
    fontSize:16,
    color:'#b3b3b3'
  },
  starttxt:{
    fontSize:18,
    marginLeft:8,
    color:ICONCOLOR,
    // backgroundColor:"#ccc"
  },
  trainnumtxt:{
    fontSize:17,
    marginTop:3,
    marginLeft:8,
    backgroundColor:'#e7f0fd',
    borderWidth:1,
    borderColor:ICONCOLOR,
    borderRadius:5,
    color:ICONCOLOR,
    paddingLeft:2,
    paddingRight:2
  },

  transftxt:{
    fontSize:18,
    marginLeft:8,
    color:TRANSFCOLOR

  },
  passtxt:{
    fontSize:15,
    padding:2,
    marginLeft:5
  },
  stanumtxt:{

    fontSize:15,
  },
  downbtn:{
    paddingLeft:3,
    // marginRight:5
  },
  lefticon:{
    marginRight:5
  },
  trftimetxt:{
    marginRight:50
  },




/////////////////////////////
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
    height:ANCHORPOINT-PEEKHEIGHT-100,
    // height:ANCHORPOINT-PEEKHEIGHT-20,
    width: width-20,
    padding: 10,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    borderRadius: 10,
  },
  bottomSheetContent: {
    height:height-ANCHORPOINT-10,
    // height:height-ANCHORPOINT+10,
    margin:12,
    padding: 12,
    alignItems: 'center',
    // backgroundColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth:2,
    borderColor:'#ccc',
    borderRadius:5

  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});
