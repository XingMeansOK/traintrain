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

//   arriveDay(planInfo){
//     var timeleft=parseInt(planInfo.time-(1440-(parseInt(planInfo.stations[0][0].startTime.split(":")[0])*60+parseInt(planInfo.stations[0][0].startTime.split(":")[1]))
//                  ));
//     var arrive='';
//     if(timeleft<0){
//       arrive=planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;
//     }else{
//       switch(parseInt(timeleft/1440)){
// <<<<<<< Updated upstream
//         case 0: arrive='次日'+planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;break;
//         case 1: arrive='第三天'+planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;break;
//         case 2: arrive='第四天'+planInfo.stations[1][planInfo.stations[1].length-1].arriveTime;break;
//         default:arrive='a longlong';break;
// =======
//         case 0: arrive='次日'+once[0].stations[1][once[0].stations[1].length-1].arriveTime;break;
//         case 1: arrive='第三天'+once[0].stations[1][once[0].stations[1].length-1].arriveTime;break;
//         case 2: arrive='第四天'+once[0].stations[1][once[0].stations[1].length-1].arriveTime;break;
//         default:arrive='第N天';break;
// >>>>>>> Stashed changes
//       }
//     }
//     return (arrive);
//   }
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

  getTime(time){
    let hour=time.split(':')[0];
    let minu=time.split(':')[1];
    return {hour,minu};

  }

  convertTime(totalminu){
    let hour=parseInt(totalminu/60);
    let minu=Math.round(totalminu%60);
    return {hour,minu};
  }

  iconCityOrSta(isCity){
    let iconname=isCity ? 'md-bus' : 'md-walk';
    let iconsize=isCity ? 29 : 28 ;
    return(
      <Icon
        name={iconname}
        size={iconsize}
        color={TRANSFCOLOR}
        style={{marginTop:0}}
      />
    )
  }

  tipCityOrSta(isCity){
    let tip=isCity ? '市内换乘' : '站内换乘';
    return(
      <Text style={styles.othertxt}>{tip}</Text>
    )
  }


  renderStrat(totaltime,trainnum,station,starttime,stationnum){
    let starthour=this.getTime(starttime).hour;
    let startminu=this.getTime(starttime).minu;
    let totalhour=this.convertTime(totaltime).hour;
    let totalminu=this.convertTime(totaltime).minu;
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='ios-train'
          color={ICONCOLOR}
          size={30}/>
        <Text style={{color:ICONCOLOR}}>{totalhour}小时</Text>
        <Text style={{color:ICONCOLOR}}>{totalminu}分钟</Text>
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
              <Text style={styles.trainnumtxt}>{trainnum}</Text>
              <Text style={styles.starttxt}>{station}</Text>

            </View>
            <Text style={styles.trftimetxt}>发:{starthour}:{startminu}</Text>
            <TouchableOpacity
              onPress={() => {this.setState({ collapsedstart: !this.state.collapsedstart });}}
            >
              <View style={styles.stanumcont}>
                <Text style={styles.stanumtxt}>{stationnum}站</Text>
                <Icon
                  style={styles.downbtn}
                  name="ios-arrow-down"
                  size={15}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-40}}/>
            <Collapsible collapsed={this.state.collapsedstart}>
              <ScrollView

              >
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北  京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
              </ScrollView>
            </Collapsible>
          </View>
        </View>
      </View>
      </View>
    )
  }

  renderTransInCityOrSta(isCity,totaltime,station,arrvtime){
    let arrvhour=this.getTime(arrvtime).hour;
    let arrvminu=this.getTime(arrvtime).minu;
    let totalhour=this.convertTime(totaltime).hour;
    let totalminu=this.convertTime(totaltime).minu;
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        {this.iconCityOrSta(isCity)}
        <Text style={{color:TRANSFCOLOR}}>{totalhour}小时</Text>
        <Text style={{color:TRANSFCOLOR}}>{totalminu}分钟</Text>
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
              <Text style={styles.transftxt}>{station}</Text>
              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                <Icon
                  name='md-sync'
                  size={22}
                  style={{marginLeft:10,marginRight:3,color:'#b3b3b3'}}
                />
                {this.tipCityOrSta(isCity)}
              </View>
            </View>
            <Text style={styles.trftimetxt}>到:{arrvhour}:{arrvminu}</Text>
          </View>
          <View>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-90,height:39}}/>
          </View>
          <View>
            <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-39,height:39}}/>
          </View>
        </View>
      </View>
        </View>
    )
  }



  // renderTransInSta(totaltime,station,arrvtime){
  //   return(
  //     <View style={styles.allcontainer}>
  //     <View style={styles.icontimecont}>
  //       <Icon
  //         name='md-walk'
  //         size={29}
  //         color={TRANSFCOLOR}
  //         style={{marginTop:0}}
  //       />
  //       <Text style={{color:TRANSFCOLOR}}>{1}小时</Text>
  //     </View>
  //     <View style={styles.stationhidecont}>
  //
  //       <View style={styles.stationlistcont}>
  //         <View style={styles.icontxtcont}>
  //           <Icon
  //             name='md-arrow-dropdown-circle'
  //             style={ {marginRight:5,marginTop:1.5}}
  //             color={TRANSFCOLOR}
  //             size={15}/>
  //           <View style={{flexDirection:'column',alignItems:'flex-start'}}>
  //             <Text style={styles.transftxt}>武汉站</Text>
  //             <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
  //               <Icon
  //                 name='md-sync'
  //                 size={22}
  //                 style={{marginLeft:10,marginRight:3,color:'#b3b3b3'}}
  //               />
  //               <Text style={styles.othertxt}>站内换乘</Text>
  //             </View>
  //           </View>
  //           <Text style={styles.trftimetxt}>到:{13}:{35}</Text>
  //         </View>
  //         <View>
  //           <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-80,height:39}}/>
  //         </View>
  //         <View>
  //           <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-28,height:28}}/>
  //         </View>
  //       </View>
  //     </View>
  //       </View>
  //   )
  // }
  //
  // renderTransInCity(totaltime,station,arrvtime){
  //   let arrvhour=this.getTime(arrvtime).hour;
  //   let arrvminu=this.getTime(arrvtime).minu;
  //   let totalhour=this.convertTime(totaltime).hour;
  //   let totalminu=this.convertTime(totaltime).minu;
  //   return(
  //     <View style={styles.allcontainer}>
  //     <View style={styles.icontimecont}>
  //       <Icon
  //         name='md-bus'
  //         size={28}
  //         color={TRANSFCOLOR}
  //       />
  //       <Text style={{color:TRANSFCOLOR}}>{totalhour}小时</Text>
  //       <Text style={{color:TRANSFCOLOR}}>{totalminu}分钟</Text>
  //     </View>
  //     <View style={styles.stationhidecont}>
  //
  //       <View style={styles.stationlistcont}>
  //         <View style={styles.icontxtcont}>
  //           <Icon
  //             name='md-arrow-dropdown-circle'
  //             style={ {marginRight:5,marginTop:1.5}}
  //             color={TRANSFCOLOR}
  //             size={15}/>
  //           <View style={{flexDirection:'column',alignItems:'flex-start'}}>
  //             <Text style={styles.transftxt}>{station}</Text>
  //             <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
  //               <Icon
  //                 name='md-sync'
  //                 size={22}
  //                 style={{marginLeft:10,marginRight:3,color:'#b3b3b3'}}
  //               />
  //               <Text style={styles.othertxt}>市内换乘</Text>
  //             </View>
  //           </View>
  //           <Text style={styles.trftimetxt}>到:{arrvhour}:{arrvminu}</Text>
  //         </View>
  //         <View>
  //           <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-80,height:39}}/>
  //         </View>
  //         <View>
  //           <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-28,height:28}}/>
  //         </View>
  //       </View>
  //     </View>
  //       </View>
  //   )
  // }


  renderTransf1(totaltime,trainnum,station,starttime,stationnum){
    // var passstation=[{'qq','2:10','23:00'},{'qwq','21:10',"23:30"},{'qee','21:30',"23:30"}];

    let starthour=this.getTime(starttime).hour;
    let startminu=this.getTime(starttime).minu;
    let totalhour=this.convertTime(totaltime).hour;
    let totalminu=this.convertTime(totaltime).minu;
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='ios-train'
          size={30}
          color={ICONCOLOR}
        />
        <Text style={{color:ICONCOLOR}}>{totalhour}小时</Text>
        <Text style={{color:ICONCOLOR}}>{totalminu}分钟</Text>
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
              <Text style={styles.trainnumtxt}>{trainnum}</Text>
              <Text style={styles.starttxt}>{station}</Text>
            </View>
            <Text style={styles.trftimetxt}>发:{starthour}:{startminu}</Text>

            <TouchableOpacity
            onPress={() => {this.setState({ collapsedtransf1: !this.state.collapsedtransf1 });}}
          >
            <View style={styles.stanumcont}>
              <Text style={styles.stanumtxt}>{stationnum}站</Text>
              <Icon
                style={styles.downbtn}
                name="ios-arrow-down"
                size={15}
              />
            </View>
          </TouchableOpacity>


          </View>
          <View>
            <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-90,height:45}}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-38.5}}/>
            <Collapsible collapsed={this.state.collapsedtransf1}>
              <ScrollView>
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}

              </ScrollView>
            </Collapsible>
          </View>
        </View>
      </View>
    </View>
    )
  }
  renderTransf2(totaltime,trainnum,station,starttime,stationnum){
    // var passstation=[{'qq','2:10','23:00'},{'qwq','21:10',"23:30"},{'qee','21:30',"23:30"}];

    let starthour=this.getTime(starttime).hour;
    let startminu=this.getTime(starttime).minu;
    let totalhour=this.convertTime(totaltime).hour;
    let totalminu=this.convertTime(totaltime).minu;
    return(
      <View style={styles.allcontainer}>
      <View style={styles.icontimecont}>
        <Icon
          name='ios-train'
          size={30}
          color={ICONCOLOR}
        />
        <Text style={{color:ICONCOLOR}}>{totalhour}小时</Text>
        <Text style={{color:ICONCOLOR}}>{totalminu}分钟</Text>
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
              <Text style={styles.trainnumtxt}>{trainnum}</Text>
              <Text style={styles.starttxt}>{station}</Text>
            </View>
            <Text style={styles.trftimetxt}>发:{starthour}:{startminu}</Text>

            <TouchableOpacity
            onPress={() => {this.setState({ collapsedtransf2: !this.state.collapsedtransf2 });}}
          >
            <View style={styles.stanumcont}>
              <Text style={styles.stanumtxt}>{stationnum}站</Text>
              <Icon
                style={styles.downbtn}
                name="ios-arrow-down"
                size={15}
              />
            </View>
          </TouchableOpacity>


          </View>
          <View>
            <View style={{width:3,backgroundColor:TRANSFCOLOR,marginLeft:4.5,marginTop:-90,height:45}}/>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-38.5}}/>
            <Collapsible collapsed={this.state.collapsedtransf2}>
              <ScrollView>
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}
                {this.renderPassSta('北京站','2:10','23:00')}

              </ScrollView>
            </Collapsible>
          </View>
        </View>
      </View>
    </View>
    )
  }
  // {this.transfTouch(transfnum,stationnum)}
  // {passstation.map((station,arrvtime,starttime) => this.renderPassSta(station,arrvtime,starttime))}

  renderArrv(station,arrvtime){
    let arrvhour=this.getTime(arrvtime).hour;
    let arrvminu=this.getTime(arrvtime).minu;
    return(
<View style={styles.allcontainer}>
<View style={styles.icontimecont}></View>
      <View style={styles.stationhidecont}>

        <View style={styles.stationlistcont}>
        <View style={styles.icontimecont} />
        <View style={styles.stationlistcont}>
        <View style={styles.icontxtcont}>
          <Icon
            name='ios-radio-button-on'
            style={styles.lefticon}
            color={ICONCOLOR}
            size={15}/>
          <Text style={styles.starttxt}>{station}</Text>
          <Text>到:{arrvhour}:{arrvminu}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{width:3,backgroundColor:ICONCOLOR,marginLeft:4.5,marginTop:-90,height:50}}/>
        </View>
          </View>
          </View>
        </View>
        </View>
    )


  }

  renderPassSta(station,arrvtime,starttime){
    let arrvhour=this.getTime(arrvtime).hour;
    let arrvminu=this.getTime(arrvtime).minu;
    let starthour=this.getTime(starttime).hour;
    let startminu=this.getTime(starttime).minu;
    return(
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.point}>·</Text>
        <Text style={styles.passtxt}>{station}</Text>
        <Text style={styles.passtxt}>到:{arrvhour}:{arrvminu}</Text>
        <Text style={{    fontSize:15,
            padding:2,
            marginLeft:5,marginRight:5}}>发:{starthour}:{startminu}</Text>
      </View>
    )
  }

  render() { // (observable的数据类型不能给viewpager直接用？？？不清楚。。。)
    return (

      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.label}>可以划</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <ViewPager
            ref={(viewpager) => {this.viewpager = viewpager}}
            dataSource={this.dataSource.cloneWithPages(this.props.store.cabinet)}
            renderPage={this.renderViewPagerPage}
            onChangePage={(page) => {this.props.store.currentRenderIndex = page}}
          />

        </View>
        <View style={styles.bottomSheetContent}>
            {this.renderStrat(2490,'G23','常州站','8:09',5)}
            {this.renderTransInCityOrSta(false,130,'南京站','12:00')}
            {this.renderTransf1(3409,'K102','南京站','20:22',8)}

            {this.renderArrv('三明站','23:19')}


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
////////////////////////new
  allcontainer:{
    flexDirection:'row',
    alignItems:'flex-end',
    backgroundColor:'#e5f9ff'
  },
  icontimecont:{
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'#ffffb3',

    // backgroundColor:'#fff',
    width:50,
    marginTop:20
    // paddingTop:50
  },
  icontxtcont:{
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:'#ccc',
    // backgroundColor:'#fff',
    height:90,
    width:getWidthPercent(80)
  },
  stationlistcont:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor:'#ffcccc',
    // backgroundColor:'#fff',

    // marginBottom:50
    // width:300,
    // borderLeftWidth:2,
    // borderLeftColor:'red'
  },
  stationhidecont:{
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'#fff',
    backgroundColor:'#999999',
    // width:getWidthPercent(90),
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
  point:{
    fontSize:25,
    color:ICONCOLOR,
    marginLeft:5

  },



/////////////////////////////
  bottomSheet: {
    // height,
    flexDirection:'column',
    backgroundColor: '#d6d6f5'
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
    borderWidth: 3,
    backgroundColor: 'red',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 10,
    borderRadius: 10,
  },
  bottomSheetContent: {
    // height:height-ANCHORPOINT-10,
    // height:height-ANCHORPOINT+10,
    // margin:12,
    // padding: 12,
    alignItems: 'center',
    // backgroundColor: '#ccc',
    backgroundColor: '#ff80ff',
    borderWidth:4,
    borderColor:'#ccc',
    borderRadius:5,
    flexDirection:'column'

  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
});
