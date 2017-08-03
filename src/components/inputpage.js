import {
  Text,
  View,
  Button,
  TextInput,
  ListView
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject("store") @observer
export default class Inputpage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;// 将appStore的引用作为当前对象的成员保存下来，方便使用
    this.state = {
      isLoading: true
    }

    this.listComponent.bind(this);

  }
  static navigationOptions = {
    title: 'type in',
  };

  listComponent() {
    if(this.state.isLoading) {
      return (<Text>loading</Text>)
    } else {
      return (
        <ListView
          dataSource={this.store.stations}
          renderRow={(rowData) => <Text>{rowData.pinyin}, {rowData.name}</Text>}
        />
      )
    }
  }
  //
  // componentDidMount() {//组件加载之后，向服务器请求火车站站名信息
  //   return fetch('http://10.5.201.202:3000/json/name.json')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //       this.store.stations = ds.cloneWithRows(responseJson.trainData);
  //       this.setState({isLoading: false});
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }



  render() {
    const { navigate } = this.props.navigation;
    const store = this.store;
    return (
      <View>
        <TextInput onChangeText={(text) => store.start = text}/>
        <Text>{store.start}</Text>
        {this.listComponent()}
      </View>
    );
  }
}
