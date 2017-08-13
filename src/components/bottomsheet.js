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
import { ANCHORPOINT, PEEKHEIGHT, BLUESTYLECOLOR,getWidthPercent,getHeightPercent,ICONCOLOR } from './constant';
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
      collapseddestination: true,
    }
  }
  /*
    渲染viewpager每一页的方法
  */
  arriveDay(){
    var timeleft=parseInt(once[0].time-(1440-(parseInt(once[0].stations[0][0].startTime.split(":")[0])*60+parseInt(once[0].stations[0][0].startTime.split(":")[1]))
                 ));
    var arrive='';
    if(timeleft<0){
      arrive=once[0].stations[1][once[0].stations[1].length-1].arriveTime;
    }else{
      switch(parseInt(timeleft/1440)){
        case 0: arrive='次日'+once[0].stations[1][once[0].stations[1].length-1].arriveTime;break;
        case 1: arrive='第三天'+once[0].stations[1][once[0].stations[1].length-1].arriveTime;break;
        case 2: arrive='第四天'+once[0].stations[1][once[0].stations[1].length-1].arriveTime;break;
        default:arrive='a longlong';break;
      }
    }
    return (arrive);
  }

  transstation(){
    var trans=[];
    trans.push(once[0].stations[0][0].name);
    trans.push(once[0].stations[0][once[0].stations[0].length-1].name);
    trans.push(once[0].stations[1][once[0].stations[1].length-1].name);
    console.log(trans);
    return trans;
  }


  getPassStation(ways){
    var passstation=[];
    var passtime=[];
    for(var a in result.once[ways]){

    }
  }



  renderViewPagerPage = (data) => {
    // const content = typeof data == "string"? data: data.index;
    // return(
    //   <View style={styles.page}>
    //     <Text>{content}</Text>
    //   </View>)

    return(
      <View style={styles.page}>
        <Text>{once[0].trainNumber.join('→')}</Text>
        <Text>{once[0].stations[0][0].name+'→'+once[0].stations[0][(once[0].stations[0]).length-1].name+'→'+once[0].stations[1][(once[0].stations[1]).length-1].name}
        </Text>
        <Text>
          {parseInt(once[0].time/60)}小时{parseInt(once[0].time%60)}分钟
        </Text>
        <Text>
          {
            once[0].stations[0][0].startTime+'至'+this.arriveDay()
          }
        </Text>
        <Text>
          {once[0].stations[0].length+once[0].stations[1].length-1}站
        </Text>
      </View>)

  }
  // <View style={styles.stationhidecont}>
  //   <Icon
  //     name='ios-walk'
  //     size={36}/>
  //   <View style={styles.stationlistcont}>
  //     <View style={styles.icontxtcont}>
  //       <Icon
  //         name='md-arrow-dropdown-circle'
  //         style={styles.lefticon}
  //         color={ICONCOLOR}
  //         size={15}/>
  //       <Text style={styles.transftxt}>站内换乘站</Text>
  //     </View>
  //     <Collapsible collapsed={this.state.collapsedtranf1}>
  //     <ScrollView>
  //       <Text style={styles.passtxt}>途径站点</Text>
  //       <Text style={styles.passtxt}>途径站点</Text>
  //       <Text style={styles.passtxt}>途径站点</Text>
  //       <Text style={styles.passtxt}>途径站点</Text>
  //     </ScrollView>
  //     </Collapsible>
  //   </View>
  //   <TouchableOpacity
  //     onPress={() => {this.setState({ collapsedtranf1: !this.state.collapsedtranf1 });}}
  //   >
  //     <View style={styles.stanumcont}>
  //       <Text style={styles.stanumtxt}>{5}站</Text>
  //       <Icon
  //         style={styles.downbtn}
  //         name="ios-arrow-down"
  //         size={15}
  //       />
  //     </View>
  //   </TouchableOpacity>
  // </View>



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
            onChangePage={(page) => {this.setState({currentPage:page})}}
          />



          <View style={styles.bottomSheetContent}>
            <ScrollView>
            <View style={styles.stationhidecont}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
                <Icon
                  name='ios-train'
                  size={30}/>
                <Text>{18}小时</Text>
              </View>
              <View style={styles.stationlistcont}>
                <View style={styles.icontxtcont}>
                  <Icon
                    name='md-arrow-dropdown-circle'
                    style={styles.lefticon}
                    color={ICONCOLOR}
                    size={15}/>
                  <View style={{flexDirection:'column'}}>
                    <Text style={styles.starttxt}>始发站          </Text>
                    <Text style={styles.starttxt}>G101</Text>
                  </View>
                  <Text>发:{9}:{35}</Text>
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
                  <View style={{width:3,backgroundColor:'blue',marginLeft:4.5,marginTop:-35}}/>
                  <Collapsible collapsed={this.state.collapsedstart}>
                  <ScrollView>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text style={styles.passtxt}>途径站点</Text>
                      <Text>到:{10}:{35}</Text>
                      <Text>  </Text>
                      <Text>发:{10}:{37}</Text>
                    </View>
                    <Text style={styles.passtxt}>途径站点</Text>
                    <Text style={styles.passtxt}>途径站点</Text>
                    <Text style={styles.passtxt}>途径站点</Text>
                  </ScrollView>
                  </Collapsible>
                </View>
              </View>
            </View>



            <View style={styles.stationhidecont}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
                <Icon
                  name='ios-walk'
                  size={36}/>
                <Text>{10}小时</Text>
              </View>
              <View style={styles.stationlistcont}>
                <View style={styles.icontxtcont}>
                  <Icon
                    name='md-arrow-dropdown-circle'
                    style={styles.lefticon}
                    color={ICONCOLOR}
                    size={15}/>
                    <Text style={styles.starttxt}>换乘站1     </Text>
                  <Text>到:{13}:{35}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:3,backgroundColor:'green',marginLeft:4.5,marginTop:-90}}/>
                </View>

                <View style={styles.icontxtcont}>
                  <Icon
                    name='md-arrow-dropdown-circle'
                    style={styles.lefticon}
                    color={ICONCOLOR}
                    size={15}/>
                    <View style={{flexDirection:'column'}}>
                      <Text style={styles.starttxt}>换乘站2         </Text>
                      <Text style={styles.starttxt}>G102</Text>
                    </View>

                  <Text>发:{14}:{35}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:3,backgroundColor:'red',marginLeft:4.5,marginTop:-90}}/>
                </View>
              </View>
            </View>






            <View style={styles.stationhidecont}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
                <Icon
                  name='ios-train'
                  size={30}/>
                <Text>{18}小时</Text>
              </View>
              <View style={styles.stationlistcont}>
                <View style={styles.icontxtcont}>
                  <Icon
                    name='md-arrow-dropdown-circle'
                    style={styles.lefticon}
                    color={ICONCOLOR}
                    size={15}/>
                    <Text style={styles.starttxt}>终点站          </Text>
                  <Text>到:{21}:{35}</Text>
                  <TouchableOpacity
                    onPress={() => {this.setState({ collapseddetination: !this.state.collapseddetination });}}
                  >
                    <View style={styles.stanumcont}>
                      <Text style={styles.stanumtxt}>{5}站</Text>
                      <Icon
                        style={styles.downbtn}
                        name="ios-arrow-down"
                        size={15}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{width:3,backgroundColor:'blue',marginLeft:4.5,marginTop:-90}}/>
                  <Collapsible collapsed={this.state.collapseddetination}>
                  <ScrollView>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text style={styles.passtxt}>途径站点</Text>
                      <Text>到:{10}:{35}</Text>
                      <Text>  </Text>
                      <Text>发:{10}:{37}</Text>
                    </View>
                    <Text style={styles.passtxt}>途径站点</Text>
                    <Text style={styles.passtxt}>途径站点</Text>
                    <Text style={styles.passtxt}>途径站点</Text>
                  </ScrollView>
                  </Collapsible>
                </View>
              </View>
            </View>







            </ScrollView>
          </View>


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
////////////////////////new
  icontxtcont:{
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:'#fff',
    height:80
  },
  stationlistcont:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor:'#ffcccc',
    // marginBottom:50
    // width:300,
    // borderLeftWidth:2,
    // borderLeftColor:'red'
  },
  stationhidecont:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#999999'
  },
  stanumcont:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:100,
    backgroundColor:"#ffffb3",
    borderWidth:1,
    borderColor:"red",


  },
  starttxt:{
    fontSize:17,

  },

  transftxt:{
    fontSize:17,


  },
  passtxt:{
    fontSize:15,
    padding:2
  },
  stanumtxt:{
    // marginRight:50,
    fontSize:15,
  },
  downbtn:{
    // marginLeft:5,
    marginRight:5
  },
  lefticon:{
    marginRight:5
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
    backgroundColor: '#ccc',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});
