import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject("store") @observer
export default class PlanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }
  handlePress = () => {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const cardStyle = this.state.expanded? 'bigcard':'card';
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles[cardStyle]}>
          <Text>方案2</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  bigcard: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 250,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  }
});
