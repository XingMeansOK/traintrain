import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import {
  Workspace,
  SMMapView,
  Point2D,
  GeoStyle,
  Size2D,
  GeoPoint,
  SMLegendView,
  SMScaleView,
  SMLayerListView
} from 'imobile_for_reactnative';
 import {inject, observer} from 'mobx-react';
 import { autorun } from 'mobx';

var Point2DFac = new Point2D();
const { height, width } = Dimensions.get('window')

@inject("store") @observer
export default class SMap extends Component {
  constructor(props) {
    super(props);
    this.transferpoint = require("../img/transferpoint.png");
    this.point = require("../img/point.png");
    this.startpoint = require("../img/startpoint.png");
    this.destpoint = require("../img/destpoint.png");
    this.state = {
      mapId:false,
    }
  }


  //Required funtion for obtaining the MapView object.
  _onGetInstance = (mapView) => {
    this.mapView = mapView;
    this._addMap();
  }

  /**
   * 初始化地图  Function for initiating the Map
   * @private
   */
  _addMap = () => {
    try {
      //创建workspace模块对象
      //Create workspace object
      var workspaceModule = new Workspace();

      //加载工作空间等一系列打开地图的操作
      //Operations for loading workspace and opening map
      (async function () {
        try {
          // this.workspace = await workspaceModule.createObj();
          //
          // var datasource = await this.workspace.openDatasource({engineType:224,server:"http://supermapcloud.com"});
          // // var datasource = await this.workspace.openDatasource({engineType:224,server:"http://192.168.0.126:8090/iserver/services/map-test0802/rest"});
          // var dataset = await datasource.getDataset(0);
          //
          // this.mapControl = await this.mapView.getMapControl();
          // console.log("mapControl"+this.mapControl.mapControlId);
          // this.map = await this.mapControl.getMap();
          //
          // await this.map.setWorkspace(this.workspace);
          // // var mapName = await this.workspace.getMapName(0);
          //
          // // await this.map.open(mapName);
          // this.map.addLayer(dataset,true);
          // await this.map.zoom(5000);
          // var point2D = await Point2DFac.createObj(12953693.6950684, 4858067.04711915);
          // // await this.map.setCenter(point2D);
          // await this.map.refresh();

          this.workspace = await workspaceModule.createObj();

          await this.workspace.open("/SuperMap/China.smwu");

          this.mapControl = await this.mapView.getMapControl();
          this.map = await this.mapControl.getMap();

          await this.map.setWorkspace(this.workspace);
          var mapName = await this.workspace.getMapName(0);

          await this.map.open(mapName);
          var point2D = await Point2DFac.createObj(12953693.6950684, 4858067.04711915);
          await this.map.setCenter(point2D);
          await this.map.zoom(1.5);

          await this.map.refresh();

          this.setState({
            bindMapId:this.map.mapId,
          });

        } catch (e) {
          console.error(e);
        }
      }).bind(this)();
    } catch (e) {
      console.error(e);
    }

    /*
      自动绘制坐标点
    */
    const disposer = autorun(() => {
      var geoStyleFac = new GeoStyle();
      var size2DFac = new Size2D();
      var geoPointFac = new GeoPoint();
      var point2DFac = new Point2D();
      const data = this.props.store.plan2Render;
      if(data) {
        var arr = [];
        const stations = data.stations;

        stations.forEach((train, trainIndex) => {
          train.forEach((station, stationIndex) => {
            let mercator = this.latLng2WebMercator(station.y,station.x);
            arr.push({uri:this.point,isTransfer:station.isTransferStation,mapX:mercator[0],mapY:mercator[1]});


          })
        })
        arr[0].uri = this.startpoint;
        arr[arr.length - 1].uri = this.destpoint;
        arr.forEach(tip => {if(tip.isTransfer) {tip.uri = this.transferpoint}});
        this.refs['mapView'].setState({
            callouts:arr,
        });
      } else {
        return
      }
    })




  }
/*
  经纬度转墨卡托投影
*/
  latLng2WebMercator = (lng, lat) => {//[114.32894, 30.585748]
      var earthRad = 6378137.0;
      var x = lng * Math.PI / 180 * earthRad;
      var a = lat * Math.PI / 180;
      var y = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
      return [x, y]; //[12727039.383734727, 3579066.6894065146]
  }



  // { this.state.bindMapId && <SMLegendView style={styles.legend} mapId={this.state.bindMapId}/> }
  // { this.state.bindMapId && <SMLayerListView  style={styles.legend} mapId={this.state.bindMapId}/> }
  render() {
    return (
      <View style={styles.content}>
        <View style={styles.containerMap}>
          <SMMapView ref="mapView" style={styles.map} onGetInstance={this._onGetInstance}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  containerMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
