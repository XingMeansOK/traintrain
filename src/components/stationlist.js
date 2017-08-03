import React, { Component } from 'react';
import  {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
 } from 'react-native';
 import {
   fletter,
   itemheight,
   sectionsperatorheight,
   itemsperatorheight,
   getWidthPercent,
   getHeightPercent,
   screenwidth,
   screenheight
 } from './constdata';
import {inject, observer} from 'mobx-react';


@inject("store") @observer
export default class StationList extends Component{
  constructor(props){
    super(props);
    this.store = this.props.store;
  }
  getStationsData(){
      var data=require('./station.json');
      var traindata=data.trainData;
      // console.log(responseJson.trainData);
      // console.log("133311");
      var  key = [],
      //待修改，数组定义
        data = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        station=[];
      for (let i in traindata){
        if(key.indexOf(traindata[i].title)==-1){
          key.push(traindata[i].title);
          // data[i].push(traindata[i].name);
        }
      }
      for (let k in key){
        station[k]={key:key[k],data:traindata[k].name};
      }
      console.log(station);
      return station;
  }

  sectionListComponent(){
      return(
        <View style={styles.container}>
            <SectionList
              ref={sectionList => this._sectionList=sectionList}
              sections={this.getStationsData()}
              renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.key}</Text>}
              stickySectionHeadersEnabled={true}
              ItemSeparatorComponent={({item}) => <View style={styles.itemsperator}>{item}</View>}
              SectionSeparatorComponent={({item}) => <View style={styles.sectionsperator}>{item}</View>}
              getItemLayout={(data,index) => (
                {length:(itemheight+itemsperatorheight),offset:(itemheight+itemsperatorheight)*index,index}
              )}
            />
            <TouchableOpacity>
              <ScrollView>
                {fletter.map((letter,index) => this.renderFirstLetter(letter,index))}
              </ScrollView>
            </TouchableOpacity>
          </View>
      );
    }

  // fletter.map((letter,index) => {
  //   return <Text style={styles.firstletter}>{item}</Text>
  // })
  renderFirstLetter(firstletter,index){
    //onPress={() => this._sectionList.scrollToLocation({itemIndex:5,animated: true})}
    return(
      <View>
        <TouchableOpacity
          key={index}
          onPress={() => this.scrollTo(firstletter)}
          activeOpacity={0.6}
        >
          <Text style={styles.firstletter}>{firstletter}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  scrollTo(firstletter){
    var sectionindex=fletter.indexOf(firstletter);
    var itemindex=0;
    this._sectionList.scrollToLocation({
      itemIndex:-1,
      viewPosition:0,
      sectionIndex:sectionindex,
      // sectionindex,
      // itemindex,
      animated: true
    });

  }

  render(){
    return (
      <View style={styles.container}>
        {this.sectionListComponent()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  //  paddingTop: 10,
   flexDirection: 'row',
   justifyContent: 'space-between',
   backgroundColor: 'white',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(240,240,240,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: itemheight,
    width:200,
  },
  sectionsperator:{
    backgroundColor:'rgba(235,235,235,1.0)',
    height:sectionsperatorheight,
  },
  itemsperator:{
    backgroundColor:'rgba(247,247,247,1.0)',
    height:itemsperatorheight,
  },
  firstletter:{
    fontSize:15,
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2

  },
})
