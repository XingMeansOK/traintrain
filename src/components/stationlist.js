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
   FLETTER,
   itemheight,
   sectionsperatorheight,
   itemsperatorheight,
   getWidthPercent,
   getHeightPercent,
   screenwidth,
   screenheights,
   BORDERCOLOR,
   ICONCOLOR,
   BTNCOLOR,
   INPUTCOLOR,
   BACKGRDCOLOR,
   GRAY,
   ITEMSPRTCOLOR,
   SECSPRTCOLOR
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
    // const disposersta = autorun(() => {
    //   let sectionIndexSta = this.props.store.sectionListIndexSta.seci<0?0:this.props.store.sectionListIndexSta.seci;
    //   let itemIndexSta = this.props.store.sectionListIndexSta.iti-1;
    //   this.sectionListRef.scrollToLocation({
    //     itemIndex:itemIndexSta,
    //     sectionIndex:sectionIndexSta,
    //     viewPosition:0,
    //     animated: false
    //   });
    // })

    const disposersta = autorun(() => {
      let sectionIndexSta = this.props.store.sectionListIndexSta.sectionindex<0?0:this.props.store.sectionListIndexSta.sectionindex;
      let itemIndexSta = this.props.store.sectionListIndexSta.itemindex-1;
      this.sectionListRef.scrollToLocation({
        itemIndex:itemIndexSta,
        sectionIndex:sectionIndexSta,
        viewPosition:0,
        animated: false
      });
    })
    const disposerdes = autorun(() => {
      let sectionIndexDes = this.props.store.sectionListIndexDes.sectionindex<0?0:this.props.store.sectionListIndexDes.sectionindex;
      let itemIndexDes = this.props.store.sectionListIndexDes.sectionindex<1 ?
        this.props.store.sectionListIndexDes.itemindex-1
        : this.props.store.sectionListIndexDes.itemindex-1;
      this.sectionListRef.scrollToLocation({
        itemIndex:itemIndexDes,
        sectionIndex:sectionIndexDes,
        viewPosition:0,
        animated: false
      });
    })
  }

  getStationsData(){
      var sourcedata=require('../store/station.json');
      var traindata=sourcedata.trainData;
      var  sections=[],
           key = [],
           data=[],
           stationpinyin=[],
           stationshort=[];
      for (let i in traindata){
        if(key.indexOf(traindata[i].title)==-1){
          key.push(traindata[i].title);
          data.push(traindata[i].name);
        }
      }
      for (let k in key){sections[k]={key:key[k],data:data[k]};}
      sections.push({key:'#',data:[" "," "," "," ", " "," "," "," "," "," "," "," "]});
      for (let x in data){
        stationpinyin[x]=[];
        stationshort[x]=[];
        for (let y in data[x]){
          stationpinyin[x][y]=pinyin.getFullChars(data[x][y]);
          stationshort[x][y]=stationpinyin[x][y].match(/[A-Z]+/g).join('');
        }}
      for (let z in key){
        this.props.store.stations[z]={
          title:key[z],
          station:{name:data[z],pinyin:stationpinyin[z],short:stationshort[z]}};
      }
      this.props.store.allstations=data.reduce(function(a,b){return a.concat(b)});
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
    var sectionindex=FLETTER.indexOf(firstletter);
    var itemindex=sectionindex<1? -1:-2.5
    this.sectionListRef.scrollToLocation({
      itemIndex:itemindex,
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
              keyExtractor={(item,index)=>item.index=index}
              keyboardShouldPersistTaps="always"
              ref={sectionList => this.sectionListRef=sectionList}
              sections={this.getStationsData()}
              renderItem={({item}) => this.renderStation(item)}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.key}</Text>}
              stickySectionHeadersEnabled={true}
              ItemSeparatorComponent={({item}) => <View style={styles.itemsperator}>{item}</View>}
              getItemLayout={(data,index) => (
                {length:(itemheight+itemsperatorheight),offset:(itemheight+itemsperatorheight)*index,index}
              )}
            />
            <ScrollView

              centerContent={true}
            >
              {FLETTER.map((letter,index) => this.renderFirstLetter(letter,index))}
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
     backgroundColor: '#fff',
     marginTop:1
    },
    sectionHeader: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: SECSPRTCOLOR,
    },
    item: {
      padding: 10,
      fontSize: 15,
      height: itemheight,
      width:getWidthPercent(94),
    },
    sectionsperator:{
      backgroundColor:SECSPRTCOLOR,
      height:sectionsperatorheight,
    },
    itemsperator:{
      backgroundColor:ITEMSPRTCOLOR,
      height:itemsperatorheight,
    },
    firstletter:{
      fontSize:14,
      paddingLeft: getWidthPercent(3),
      paddingTop: 1,
            flex:1
    },
    scrollletter:{
      width:20,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  })
