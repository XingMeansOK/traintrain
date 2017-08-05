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
 } from './constant';
import {inject, observer} from 'mobx-react';


@inject("store") @observer
export default class StationList extends Component{
  constructor(props){
    super(props);
    this.store = this.props.store;
  }

  getStationsData(){
      var data=require('../store/station.json');
      var traindata=data.trainData;
      var  key = [],
        station=[];
      for (let i in traindata){
        if(key.indexOf(traindata[i].title)==-1){
          key.push(traindata[i].title);
        }
      }
      for (let k in key){
        station[k]={key:key[k],data:traindata[k].name};
      }
      return station;
  }

  renderFirstLetter(firstletter,index){
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

  renderStation(item) {
  return(
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>{
        if(this.props.store.startInput){
          this.props.store.start=item;
          // this.props.store.start=item;
        }
        else {
          if(this.props.store.destinationInput){
            this.props.store.destination=item;
            // this.props.store.destination=item;
          }
        }
      }}
    >
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
    );
  }

  // selectStation(){
  //   // this._textInput.defaulValue="121212";
  // }

  sectionListComponent(){
      return(
        <View style={styles.listcontainer}>
            <SectionList
              keyboardShouldPersistTaps="false"

              ref={sectionList => this._sectionList=sectionList}
              sections={this.getStationsData()}
              renderItem={({item}) => this.renderStation(item)}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.key}</Text>}
              stickySectionHeadersEnabled={true}
              ItemSeparatorComponent={({item}) => <View style={styles.itemsperator}>{item}</View>}
              SectionSeparatorComponent={({item}) => <View style={styles.sectionsperator}>{item}</View>}
              getItemLayout={(data,index) => (
                {length:(itemheight+itemsperatorheight),offset:(itemheight+itemsperatorheight)*index,index}
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
     paddingTop: 2,
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
