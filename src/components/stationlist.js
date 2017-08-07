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
   screenheights
 } from './constant';
import {inject, observer} from 'mobx-react';
import { autorun } from 'mobx';
import pinyin from 'js-pinyin';

@inject("store") @observer
export default class StationList extends Component{
  constructor(props){
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    const disposer = autorun(() => {
      let sectionIndex = this.props.store.sectionListIndex<0?0:this.props.store.sectionListIndex;
      let itemIndex = sectionIndex<1?-1:-2.5;
      this.sectionListRef.scrollToLocation({
        itemIndex:itemIndex,
        // itemIndex:index.itemindex-2.5,
        sectionIndex:sectionIndex,
        viewPosition:0,
        animated: true
      });
    })
  }

  getStationsData(){
      var sourcedata=require('../store/station.json');
      var traindata=sourcedata.trainData;
      var  key = [],
           data=[],
           sections=[];
      for (let i in traindata){
        if(key.indexOf(traindata[i].title)==-1){
          key.push(traindata[i].title);
          data.push(traindata[i].name);
        }
      }
      for (let k in key){
        sections[k]={key:key[k],data:data[k]};
      }
      var stationpinyin=[];
      for (let x in data){
        stationpinyin[x]=[];
        for (let y in data[x]){
          stationpinyin[x][y]=pinyin.getFullChars(data[x][y]);
        }}
      for (let z in key){
        this.props.store.stations[z]={title:key[z],station:{name:data[z],pinyin:stationpinyin[z]}};
      }
      return sections;
  }

  renderFirstLetter(firstletter,index){
    return(
      <View key={index}>
        <TouchableOpacity
          key={index}
          onPress={() => this.scrollToLetter(firstletter)}
          activeOpacity={0.6}
        >
          <Text style={styles.firstletter}>{firstletter}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  scrollToLetter(firstletter){
    var sectionindex=fletter.indexOf(firstletter);
    this.sectionListRef.scrollToLocation({
      itemIndex:-2.5,
      viewPosition:0,
      sectionIndex:sectionindex,
      animated: true
    });
  }

  renderStation(item) {
  return(
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>{
        if(this.props.store.startInput){
          this.props.store.start=item;
        }
        else {
          if(this.props.store.destinationInput){
            this.props.store.destination=item;
      }}}}
    >
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
    );
  }

// SectionSeparatorComponent={({item}) => <View style={styles.sectionsperator}>{item}</View>}
  sectionListComponent(){
      return(
        <View style={styles.listcontainer}>
            <SectionList
              keyboardShouldPersistTaps="always"

              ref={sectionList => this.sectionListRef=sectionList}
              sections={this.getStationsData()}
              renderItem={({item}) => this.renderStation(item)}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.key}</Text>}
              stickySectionHeadersEnabled={true}
              ItemSeparatorComponent={({item}) => <View style={styles.itemsperator}>{item}</View>}

              getItemLayout={(data,index) => (
                {length:(itemheight+itemsperatorheight),offset:(itemheight+itemsperatorheight)*index,index}
                // {length:46,offset:46*index,index}
              )}
            />
              <ScrollView
                centerContent={true}
              >
                {fletter.map((letter,index) => this.renderFirstLetter(letter,index))}
              </ScrollView>
          </View>
      );
    }



  render(){
    return (
      <View  style={styles.listcontainer}>
        {this.sectionListComponent()}
      </View>
      );
    }
  }


  const styles = StyleSheet.create({
    listcontainer: {
     flex: 1,
    //  paddingTop: 2,
     flexDirection: 'row',
     justifyContent: 'center',
     backgroundColor: 'white',
    },
    // container2: {
    //  flex: 1,
    //  flexDirection: 'row',
    //  backgroundColor: '#f90',
    //  justifyContent: 'space-between',
    // },
    sectionHeader: {
      // paddingTop: 2,
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
      width:getWidthPercent(94),
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
      fontSize:14,
      paddingLeft: getWidthPercent(3),
      paddingTop: 1,
      // paddingRight: 1,
      // paddingLeft: 1,
      // paddingBottom: 1,
      // justifyContent: 'space-between'
    },
    scrollletter:{
      width:20,
      alignItems: 'center',
      justifyContent: 'flex-end',


    }
  })
