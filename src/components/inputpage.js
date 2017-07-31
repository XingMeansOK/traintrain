import {
  Text,
  View,
  Button,
  TextInput,
  ListView
} from 'react-native';
import React, {Component} from 'react';
import { RESULTPAGE } from './constant'; // 导入常量，避免耦合
import PropTypes from 'prop-types';// 用于检测传入到这个组件的props的类型
import {observer} from 'mobx-react';

@observer
export default class Inputpage extends Component {
  constructor(props) {
    super(props);
    this.store = props.screenProps;// 将appStore的引用作为当前对象的成员保存下来，方便使用
    this.state = {
      isLoading: true
    }

    this.listComponent = () => {
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

  }
  static navigationOptions = {
    title: 'type in',
  };

  componentDidMount() {//组件加载之后，向服务器请求火车站站名信息
    return fetch('http://10.5.201.202/:3000/json/name.json')
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.setState({
        //   isLoading: false,
        //   dataSource: ds.cloneWithRows(responseJson.movies),
        // }, function() {
        //   // do something with new state
        // });
        this.store.stations = ds.cloneWithRows(responseJson.trainData);
        this.setState({isLoading: false});

      })
      .catch((error) => {
        console.error(error);
      });
  }



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

Inputpage.propTypes = {
  screenProps: PropTypes.object.isRequired,// screenProps传进来的就是appStore ，这里做一下检测，要求screenProps是一个object
}
